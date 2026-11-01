import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Game } from '../rules/game';
import { FIND_KINDS } from '../rules/finds';
import { borrowedNightSaves } from './nightSave';
import { browserSaveSlots, SaveSlots, slotStorage } from './saveSlots';
import { visitSaves } from './visitSaves';
import { visitLifecycle } from './visitLifecycle';
import { visitUnlocks } from './visitUnlocks';
import { loadOwned } from './owned';
import { checkpointFixture, deferred, memoryVisitStorage, nightSentinel, visitAcceptanceCases as cases } from '../test/visitAcceptance';

afterEach(() => vi.unstubAllGlobals());
const host = (id = 1) => ({ seed: id }) as Game; // Lifecycle carries identity only; it does not execute game rules.
function fixture() {
  const memory = memoryVisitStorage(), checkpoint = checkpointFixture(), slots = new SaveSlots(memory.storage);
  const nights = borrowedNightSaves(checkpoint.store), saves = visitSaves(slots, nights);
  return { memory, checkpoint, slots, nights, saves };
}

describe('MP-A existing visit/save acceptance boundaries', () => {
  it(cases.rollback, async () => {
    const f = fixture(), own = { seed: 777 }, adoptOwn = vi.fn(async () => {});
    const lifecycle = visitLifecycle({ saves: f.saves, own: () => own,
      adoptBorrowed: async () => { throw Error('host preparation failed'); }, adoptOwn, playing: vi.fn() });
    await expect(lifecycle.prepare(host(), new AbortController().signal, () => {})).rejects.toThrow('host preparation failed');
    await lifecycle.end();
    expect(adoptOwn).toHaveBeenCalledWith(own, false);
    expect(f.checkpoint.current()).toEqual(f.checkpoint.own); expect(f.checkpoint.clears()).toBe(0);
    expect(f.nights.suspended).toBe(false); expect(f.slots.visiting).toBe(false);
  });

  it(cases.isolation, async () => {
    const f = fixture(); await f.saves.prepare(); await f.saves.confirm();
    await f.nights.store.write(nightSentinel('host-snapshot'));
    const adoption = deferred(), returning = f.saves.returnOwn(async fresh => { expect(fresh).toBe(true); await adoption.promise; });
    await f.nights.store.write(nightSentinel('host-late-during-own-preparation'));
    expect(f.nights.suspended).toBe(true); expect(f.checkpoint.writes).toEqual([]);
    adoption.resolve(); await returning;
    await f.nights.store.write(nightSentinel('new-own-night'));
    expect(f.checkpoint.writes.map(n => n.build)).toEqual(['new-own-night']);
  });

  it(cases.departure, async () => {
    const f = fixture(), own = { seed: 777 }, incoming = host(), freshOwn = { seed: 778 };
    let current: unknown = own;
    const adoptOwn = vi.fn(async (retained: typeof own, fresh: boolean) => {
      expect(retained).toBe(own); expect(fresh).toBe(true); current = freshOwn;
      await f.nights.store.write(nightSentinel('during-own-adoption')); // Still held until replacement finishes.
    });
    const lifecycle = visitLifecycle({ saves: f.saves, own: () => own, adoptBorrowed: async game => { current = game; }, adoptOwn, playing: vi.fn() });
    await lifecycle.prepare(incoming, new AbortController().signal, () => {}); await lifecycle.synchronized(incoming);
    expect(current).toBe(incoming); await lifecycle.end();
    expect(current).toBe(freshOwn); expect(current).not.toBe(own); expect(current).not.toBe(incoming);
    expect(adoptOwn).toHaveBeenCalledOnce(); expect(f.checkpoint.writes).toEqual([]); expect(f.nights.suspended).toBe(false);
  });

  it('a failed own-night return keeps checkpoints held until a successful fresh adoption', async () => {
    const f = fixture(); await f.saves.prepare(); await f.saves.confirm();
    await expect(f.saves.returnOwn(async fresh => { expect(fresh).toBe(true); throw Error('own replacement failed'); })).rejects.toThrow('own replacement failed');
    expect(f.saves.phase).toBe('returning'); expect(f.nights.suspended).toBe(true);
    await f.nights.store.write(nightSentinel('borrowed-after-failed-return'));
    expect(f.checkpoint.writes).toEqual([]);
    await f.saves.returnOwn(async fresh => { expect(fresh).toBe(true); });
    expect(f.saves.phase).toBe('solo'); expect(f.nights.suspended).toBe(false);
  });

  it(cases.persistence, async () => {
    const memory = memoryVisitStorage(); vi.stubGlobal('localStorage', memory.storage);
    const slots = browserSaveSlots(), other = slots.create(), otherStorage = slots.storage(other.id);
    const [ownItem, hostItem] = FIND_KINDS.find(k => k.id === 'wearable')!.items;
    otherStorage.setItem('witch.owned', JSON.stringify(['other-slot-unlock']));
    slotStorage.setItem('witch.owned', JSON.stringify([ownItem]));
    const checkpoint = checkpointFixture(), nights = borrowedNightSaves(checkpoint.store), saves = visitSaves(slots, nights);
    const before = memory.snapshot(); await saves.prepare(); await saves.confirm();
    slotStorage.setItem('witch.owned', JSON.stringify([hostItem]));
    otherStorage.setItem('witch.owned', JSON.stringify(['host-attempt-in-other-slot']));
    await saves.returnOwn(async () => {});
    expect(memory.snapshot()).toEqual(before);
    expect(loadOwned(null)).toContain(ownItem); expect(loadOwned(null)).not.toContain(hostItem);
    expect(otherStorage.getItem('witch.owned')).toBe(JSON.stringify(['other-slot-unlock']));
  });

  it('successful shared unlocks union once into own collection, never host inventory or another slot', async () => {
    const memory = memoryVisitStorage(); vi.stubGlobal('localStorage', memory.storage);
    const slots = browserSaveSlots(), other = slots.create(), otherStorage = slots.storage(other.id);
    const [earned, prior, hostItem] = FIND_KINDS.find(k => k.id === 'wearable')!.items;
    slotStorage.setItem('witch.owned', JSON.stringify([prior]));
    otherStorage.setItem('witch.owned', JSON.stringify(['other-slot-unlock']));
    const game = { witches: [{ id: 0 }, { id: 1 }], tuning: { map: { island: 'home', world: 0 } },
      win: { phase: 'won', settled: true, found: [] }, trunk: { found: true, kind: 'wearable', item: earned } } as unknown as Game;
    const unlocks = visitUnlocks(game, 1), release = slots.beginBorrowedVisit();
    slotStorage.setItem('witch.owned', JSON.stringify([hostItem]));
    expect(() => unlocks.apply(slots, { spells: {} as never, owned: () => loadOwned(null) })).toThrow('Return to own saves');
    release(); const ctx = { spells: {} as never, owned: () => loadOwned(null) };
    expect(unlocks.apply(slots, ctx)).toBe(true); expect(unlocks.apply(slots, ctx)).toBe(false);
    expect(loadOwned(null)).toContain(prior); expect(loadOwned(null)).toContain(earned); expect(loadOwned(null)).not.toContain(hostItem);
    expect(otherStorage.getItem('witch.owned')).toBe(JSON.stringify(['other-slot-unlock']));
  });

  it(cases.stale, async () => {
    const f = fixture(), preparing = deferred(), playing = vi.fn(), controller = new AbortController();
    const lifecycle = visitLifecycle({ saves: f.saves, own: () => 'own', adoptBorrowed: async () => preparing.promise,
      adoptOwn: vi.fn(async () => {}), playing });
    const prepare = lifecycle.prepare(host(), controller.signal, () => {}), rejected = expect(prepare).rejects.toThrow();
    await Promise.resolve(); controller.abort(); const end = lifecycle.end(); preparing.resolve(); await rejected; await end;
    await lifecycle.synchronized(host());
    expect(playing).not.toHaveBeenCalled(); expect(f.saves.phase).toBe('solo'); expect(f.slots.visiting).toBe(false);
  });

  it('a delayed synchronization from visit A cannot admit its old host during newly prepared visit B', async () => {
    const f = fixture(), a = host(1), b = host(2), playing = vi.fn();
    const lifecycle = visitLifecycle({ saves: f.saves, own: () => 'own', adoptBorrowed: async () => {}, adoptOwn: async () => {}, playing });
    await lifecycle.prepare(a, new AbortController().signal, () => {}); await lifecycle.end();
    await lifecycle.prepare(b, new AbortController().signal, () => {});
    // A delayed old session callback arrives after B has prepared, before B's own synchronization.
    await lifecycle.synchronized(a).catch(() => {});
    expect(playing).not.toHaveBeenCalledWith(a);
    expect(f.saves.phase).toBe('preparing'); expect(f.slots.visiting).toBe(false);
    await lifecycle.end();
  });
});
