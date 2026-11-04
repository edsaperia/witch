import { expect, it, vi } from "vitest";
import type { Game } from "../rules/game";
import { borrowedNightSaves } from "./nightSave";
import { SaveSlots } from "./saveSlots";
import { visitSaves } from "./visitSaves";
import { visitLifecycle } from "./visitLifecycle";
import { checkpointFixture, memoryVisitStorage, nightSentinel, deferred } from "../test/visitAcceptance";

it("keeps one original private-save lease through night2 and leaves to a fresh solo night", async () => {
  const memory = memoryVisitStorage(), checkpoint = checkpointFixture(), slots = new SaveSlots(memory.storage);
  const lease = vi.spyOn(slots, "beginBorrowedVisit"), nights = borrowedNightSaves(checkpoint.store), saves = visitSaves(slots, nights);
  const own = { seed: 777 }, ownSnapshot = vi.fn(() => own), adoptOwn = vi.fn(async () => {}), playing = vi.fn();
  const life = visitLifecycle({ saves, own: ownSnapshot, adoptOwn, adoptBorrowed: async () => {}, playing });
  const a = { seed: 123 } as Game, b = { seed: 456 } as Game, signal = new AbortController().signal;
  await life.prepare(a, signal, () => {}); await life.synchronized(a);
  await life.nextNight(b, signal, () => {}); await life.synchronized(b);
  expect(ownSnapshot).toHaveBeenCalledTimes(1); expect(lease).toHaveBeenCalledTimes(1); expect(saves.phase).toBe("visiting");
  await nights.store.write(nightSentinel("host-night2")); expect(checkpoint.writes).toEqual([]);
  expect(playing.mock.calls.map(([g]) => g)).toEqual([a, b]);
  await life.end(); expect(adoptOwn).toHaveBeenCalledExactlyOnceWith(own, true); expect(saves.phase).toBe("solo");
});

it("returns safely after a cancelled night2 without playing it or resnapshotting private state", async () => {
  const memory = memoryVisitStorage(), checkpoint = checkpointFixture(), slots = new SaveSlots(memory.storage), nights = borrowedNightSaves(checkpoint.store);
  const saves = visitSaves(slots, nights), ready = deferred<void>(), own = vi.fn(() => ({ seed: 777 })), restored = vi.fn(async () => {}), playing = vi.fn();
  const a = { seed: 123 } as Game, b = { seed: 456 } as Game;
  const life = visitLifecycle({ saves, own, adoptOwn: restored, playing, adoptBorrowed: async game => { if (game === b) await ready.promise; } });
  await life.prepare(a, new AbortController().signal, () => {}); await life.synchronized(a);
  const controller = new AbortController(), next = life.nextNight(b, controller.signal, () => {});
  const rejection = expect(next).rejects.toThrow(); controller.abort(); const returned = life.end(); ready.resolve();
  await rejection; await returned;
  expect(own).toHaveBeenCalledTimes(1); expect(playing).toHaveBeenCalledExactlyOnceWith(a);
  expect(restored).toHaveBeenCalledWith({ seed: 777 }, true); expect(saves.phase).toBe("solo");
});
