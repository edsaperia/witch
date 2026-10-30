import { describe, expect, it } from "vitest";
import { slotStorage } from "./saveSlots";
import { UNLOCK_KEY, ownedToChoose, partsToChoose, setUnlockAll, syncHatUnlock, unlockAll } from "./debugUnlock";
import { BROOM_KEY, fitBroom, loadBroom } from "./broomSave";
import { ITEMS } from "../rules/wardrobe";
import { PART_IDS, SLOTS, partById } from "../rules/broomParts";
import { tuningFromLink } from "./linkParams";
import { newGame } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { floorHats, HOUSE_ROOMS } from "../rules/houseRooms";
import { HAT_SPELLS } from "../rules/spells";

// The pause page's Unlock everything (Ed, 2026-10-29): it widens what the pickers offer and never writes anything as found.
const memory = () => { const m = new Map<string, string>(); return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), removeItem: (k: string) => void m.delete(k), m }; };

describe("Unlock everything (the pause page's debug switch)", () => {
  it("refreshes an existing floor, preserves hats in play and finds, and restores earned hats when switched off", () => {
    const s = memory(), g = globalThis as { localStorage?: unknown }, was = g.localStorage;
    g.localStorage = s;
    try {
      s.setItem("witch.hats", JSON.stringify(["healing"]));
      const W = newGame(123, { ...TUNING, spells: { ...TUNING.spells, hat: "helmet", hats: "healing" } }).witches[0];
      W.hat.left.push({ x: 1, z: 1, at: 0, spell: "harvest" });
      const floor = floorHats(W);
      expect(floor.filter(Boolean)).toEqual(["healing"]);
      syncHatUnlock(W, true);
      expect(floorHats(W)).toBe(floor);
      expect(floor.filter(Boolean)).toEqual(HAT_SPELLS.filter(h => h.built && !["none", "helmet", "harvest"].includes(h.id)).map(h => h.id));
      syncHatUnlock(W, true); // Repeated grants never duplicate hats already out.
      expect(floor.filter(h => h === "harvest" || h === "helmet")).toEqual([]);
      expect(slotStorage.getItem("witch.hats")).toBe('["healing"]');
      slotStorage.setItem("witch.hats", JSON.stringify(["healing", "sentry"])); // A real find while debug is on stays hers.
      syncHatUnlock(W, false);
      expect(floor.filter(Boolean)).toEqual(["healing", "sentry"]);
      expect(W.spells.hat).toBe("helmet");
      syncHatUnlock(W, false, new URLSearchParams("hats=all"));
      expect(W.spells.hats).toBeUndefined();
    } finally { g.localStorage = was; }
  });
  it("loads every built spell hat onto the Cloakroom floor with the debug switch, link, or headless defaults", () => {
    const s = memory(), g = globalThis as { localStorage?: unknown }, was = g.localStorage;
    g.localStorage = s;
    try {
      const all = HAT_SPELLS.filter(h => h.built && h.id !== "none").map(h => h.id);
      expect(HOUSE_ROOMS.objects.find(o => o.use.kind === "hats")?.room).toBe("cloakroom");
      setUnlockAll(true);
      const debug = tuningFromLink(new URLSearchParams()).tuning;
      setUnlockAll(false);
      const link = tuningFromLink(new URLSearchParams("hats=all")).tuning;
      for (const tuning of [debug, link, TUNING]) {
        const W = newGame(123, { ...TUNING, ...tuning }).witches[0];
        expect(floorHats(W).filter(Boolean)).toEqual(all);
      }
      expect(floorHats(newGame(123, { ...TUNING, ...tuningFromLink(new URLSearchParams()).tuning }).witches[0]).filter(Boolean)).toEqual([]);
      expect(s.m.has("witch.hats")).toBe(false);
    } finally { g.localStorage = was; }
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
      expect(JSON.parse(slotStorage.getItem(BROOM_KEY)!).found).toEqual([]);
      setUnlockAll(false);
      expect(loadBroom().fitted[slot]).toBeNull(); // (off: the normal rules from the next load)
      expect(loadBroom().found).toEqual([]);
    } finally { g.localStorage = was; }
  });
});
