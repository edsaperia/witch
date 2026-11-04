import { afterEach, expect, it, vi } from "vitest";
import type { Game } from "../rules/game";
import { FIND_KINDS } from "../rules/finds";
import { visitUnlocks } from "./visitUnlocks";
import { browserSaveSlots, slotStorage } from "./saveSlots";
import { emptySave, loadSave } from "./chartSave";
import { loadOwned } from "./owned";
import { loadBroom } from "./broomSave";
import { loadHats } from "./hatSave";
import { foundRecords } from "./recordSave";
afterEach(() => vi.unstubAllGlobals());
it("gives both distinct browser collections the valid find on a win and neither on loss/hang-up", () => {
  const [item, hostOwn, guestOwn] = FIND_KINDS.find(k => k.id === "wearable")!.items;
  for (const success of [false, true]) for (const [player, ownItem] of [[0, hostOwn], [1, guestOwn]] as const) {
    const bytes = new Map<string, string>(); vi.stubGlobal("localStorage", { getItem: (k: string) => bytes.get(k) ?? null, setItem: (k: string, v: string) => { bytes.set(k, v); }, removeItem: (k: string) => { bytes.delete(k); } });
    const slots = browserSaveSlots(); slotStorage.setItem("witch.owned", JSON.stringify([ownItem]));
    const game = { witches: [{ id: 0 }, { id: 1 }], tuning: { map: { island: "home", world: 0 } }, ...(success ? { win: { phase: "won", settled: true, found: [] } } : {}), trunk: { found: true, kind: "wearable", item } } as unknown as Game;
    const unlocks = visitUnlocks(game, player), release = slots.beginBorrowedVisit();
    expect(() => unlocks.apply(slots, { spells: {} as never, owned: () => loadOwned(null) })).toThrow("Return to own saves");
    release(); const before = [...bytes]; unlocks.apply(slots, { spells: {} as never, owned: () => loadOwned(null) });
    expect(loadOwned(null)).toContain(ownItem); expect(loadOwned(null).has(item)).toBe(success);
    if (!success) expect([...bytes]).toEqual(before);
  }
});
it("settles every registered find kind for each browser through its existing keeper after a win", () => {
  for (const kind of FIND_KINDS) for (const player of [0, 1]) {
    const bytes = new Map<string, string>(); vi.stubGlobal("localStorage", { getItem: (k: string) => bytes.get(k) ?? null, setItem: (k: string, v: string) => { bytes.set(k, v); }, removeItem: (k: string) => { bytes.delete(k); } });
    const game = { witches: [{ id: 0 }, { id: 1 }], tuning: { map: { island: "home", world: 0 } }, win: { phase: "won", settled: true, found: [] }, trunk: { found: true, kind: kind.id, item: kind.items[0] } } as unknown as Game;
    visitUnlocks(game, player).apply(browserSaveSlots(), { spells: { hats: [] } as never, owned: () => loadOwned(null) });
    const kept = kind.id === "part" ? loadBroom().found : kind.id === "hat" ? loadHats() : kind.id === "record" ? foundRecords() : [...loadOwned(null)];
    expect(kept).toContain(kind.items[0]);
  }
});
it("keeps no rewards from an unsuccessful night and rejects unknown identities", () => {
  const game = { witches: [{ id: 0 }, { id: 1 }], tuning: { map: { island: "home", world: 0 } }, trunk: { found: true, kind: "wearable", item: "invalid" } } as unknown as Game;
  const owned = vi.fn(() => new Set<string>());
  expect(visitUnlocks(game, 1).apply({ visiting: false }, { spells: {} as never, owned })).toBe(true);
  expect(owned).not.toHaveBeenCalled(); expect(() => visitUnlocks(game, 2)).toThrow("Unknown witch");
  const invalid = { ...game, win: { phase: "won", settled: false, found: [] } } as unknown as Game;
  visitUnlocks(invalid, 1).apply({ visiting: false }, { spells: {} as never, owned });
  expect(owned).not.toHaveBeenCalled(); // Even a won night cannot grant an unregistered item.
});
it("keeps successful shared unlocks once in own collections after dropping borrowed writes", () => {
  const bytes = new Map<string, string>(); vi.stubGlobal("localStorage", { getItem: (k: string) => bytes.get(k) ?? null, setItem: (k: string, v: string) => { bytes.set(k, v); }, removeItem: (k: string) => { bytes.delete(k); } });
  const [item, ownItem, hostItem] = FIND_KINDS.find(k => k.id === "wearable")!.items;
  const slots = browserSaveSlots(); slotStorage.setItem("witch.chart", JSON.stringify(emptySave(0))); slotStorage.setItem("witch.owned", JSON.stringify([ownItem]));
  // Reader-only fixture: result capture reads identity, finale, trunk and world, not world geometry.
  const game = { witches: [{ id: 0 }, { id: 1 }], tuning: { map: { island: "home", world: 0 } }, win: { phase: "won", settled: true, found: ["fox"] }, trunk: { found: true, kind: "wearable", item } } as unknown as Game;
  const unlocks = visitUnlocks(game, 1), hostUnlocks = visitUnlocks(game, 0), release = slots.beginBorrowedVisit();
  slotStorage.setItem("witch.owned", JSON.stringify([hostItem]));
  expect(() => unlocks.apply(slots, { spells: {} as never, owned: () => loadOwned(null) })).toThrow("Return to own saves");
  game.win!.found.length = 0; game.trunk!.item = "invalid later host item"; // Captured result is immutable.
  release(); const own = loadOwned(null), ctx = { spells: {} as never, owned: () => own };
  expect(unlocks.apply(slots, ctx)).toBe(true); const kept = [...bytes];
  expect(loadSave().found).toContain("fox"); expect(loadOwned(null)).toContain(item); expect(loadOwned(null)).toContain(ownItem); expect(loadOwned(null)).not.toContain(hostItem);
  expect(unlocks.apply(slots, ctx)).toBe(false); expect([...bytes]).toEqual(kept);
  expect(hostUnlocks.apply(slots, ctx)).toBe(true); expect([...bytes]).toEqual(kept); // Both identities receive the same eligible set, never duplicate items.
});
