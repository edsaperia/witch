import { describe, expect, it } from "vitest";
import { UNLOCK_KEY, ownedToChoose, partsToChoose, setUnlockAll, stockMushroomBaskets, unlockAll } from "./debugUnlock";
import { emptyBaskets } from "../rules/mushrooms";
import type { Game } from "../rules/game";
import { BROOM_KEY, fitBroom, loadBroom } from "./broomSave";
import { ITEMS } from "../rules/wardrobe";
import { PART_IDS, SLOTS, partById } from "../rules/broomParts";

// The pause page's Unlock everything (Ed, 2026-10-29): it widens what the pickers offer and never writes anything as found.
const memory = () => { const m = new Map<string, string>(); return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), removeItem: (k: string) => void m.delete(k), m }; };

describe("Unlock everything (the pause page's debug switch)", () => {
  it('stocks twenty of every mushroom without reducing an overflowing basket', () => {
    const baskets = emptyBaskets(); baskets.red = 27;
    stockMushroomBaskets({ mushrooms: { baskets } } as Pick<Game, 'mushrooms'>);
    expect(baskets.red).toBe(27);
    expect(Object.entries(baskets).filter(([type]) => type !== 'red').every(([, count]) => count === 20)).toBe(true);
  });
  it("is off by default, and on and off in its own key", () => {
    const s = memory();
    expect(unlockAll(s)).toBe(false);
    setUnlockAll(true, s); expect(unlockAll(s)).toBe(true); expect(s.m.get(UNLOCK_KEY)).toBe("1");
    setUnlockAll(false, s); expect(unlockAll(s)).toBe(false); expect(s.m.has(UNLOCK_KEY)).toBe(false);
  });

  it("offers every item on every shelf (bags too, read from the shelves) and every broom part, in new sets: hers untouched", () => {
    const owned = new Set(["satchel"]), found = new Set<string>();
    const all = ownedToChoose(owned, true), parts = partsToChoose(found, true);
    for (const it of ITEMS) expect(all.has(it.id), it.id).toBe(true);
    for (const id of PART_IDS) expect(parts.has(id), id).toBe(true);
    expect([...owned]).toEqual(["satchel"]); expect(found.size).toBe(0);
    expect([...ownedToChoose(owned, false)]).toEqual(["satchel"]); expect(partsToChoose(found, false).size).toBe(0);
  });

  it("never saves a part as found: one fitted under it is kept fitted only while it's on (globalThis's storage, as the page's)", () => {
    const s = memory(), g = globalThis as { localStorage?: unknown }, was = g.localStorage;
    g.localStorage = s;
    try {
      const slot = SLOTS.find(sl => PART_IDS.some(id => partById(id)?.slot === sl))!, id = PART_IDS.find(p => partById(p)?.slot === slot)!;
      setUnlockAll(true);
      const fitted = { ...loadBroom().fitted, [slot]: id };
      expect(fitBroom(fitted).fitted[slot]).toBe(id);
      expect(JSON.parse(s.m.get(BROOM_KEY)!).found).toEqual([]);
      setUnlockAll(false);
      expect(loadBroom().fitted[slot]).toBeNull(); // (off: the normal rules from the next load)
      expect(loadBroom().found).toEqual([]);
    } finally { g.localStorage = was; }
  });
});
