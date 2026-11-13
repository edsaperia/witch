// The kind table (src/rules/kinds.ts, one line a file: art/areas/<id>/kind.json and config/kinds/; Ed, 2026-10-11,
// docs/backlog/journey.md "Rosters"): every kind of today's area types, each with the phase it's introduced in and its island's
// bearing on the sea chart.
import { describe, expect, it } from "vitest";
import { BENCH, byPlace, CLASSIC_SLOTS, KIND_SLOTS, KINDS_TABLE as kinds, kindNow, PLACE_OF, RENAMED, seedName } from "./kinds";
import { islandSeed } from "./islandShape";
import { CREATURE_IDS } from "./creatureConfig";
import { AREA_TYPES, CLASSIC_TYPES } from "./map";

const real = Object.fromEntries(Object.entries(kinds).filter(([, k]) => !k.placeholder));

describe("the kind table", () => {
  it("gives every creature an island but those on the bench (Ed, 2026-11-12: \"marten is on the bench\"), and the bee the marten's place", () => {
    expect(CREATURE_IDS.filter(id => !kinds[id]).sort()).toEqual([...BENCH].sort());
    expect(BENCH).toEqual(["marten", "newt", "moth"]);
    expect(kinds.turtle).toMatchObject({ phase: 1, biome: "temperate" }); expect(KIND_SLOTS.turtle).toBe(14); // (the newt's place, in the Fen: Ed, 2026-11-12, "newt for turtle")
    expect(kinds.bee).toMatchObject({ phase: 0, biome: "temperate" }); expect(KIND_SLOTS.bee).toBe(4);
  });
  it("has the butterfly where it stood as the moth, and reads the moth's name as the butterfly's (Ed, 2026-11-13: \"can we actually rename it in the files and put the moth on the bench?\")", () => {
    expect(kinds.butterfly).toEqual({ phase: 1, bearing: 135, dir: "SE", biome: "temperate" }); expect(KIND_SLOTS.butterfly).toBe(16); // (the moth's line, as it was)
    expect(kinds.moth).toBeUndefined();
    expect([kindNow("moth"), kindNow("butterfly"), kindNow("fox"), kindNow("constructor")]).toEqual(["butterfly", "butterfly", "fox", "constructor"]);
    expect([seedName("butterfly"), seedName("fox")]).toEqual(["moth", "fox"]); // (what is drawn from its name is drawn from the old one)
    expect(seedName("moth")).not.toBe(seedName("butterfly")); // (the benched moth draws from a name of its own: art/creatures/renamed.js)
    expect(islandSeed("butterfly")).toBe(830014); // (the hash of "moth": its island is the shape it always was)
    expect(["mole", "butterfly", "newt", "boar", "cat"].sort(byPlace)).toEqual(["boar", "cat", "mole", "butterfly", "newt"]); // (it sorts where "moth" did, so the deals by name are as they were)
    for (const [old, now] of Object.entries(RENAMED)) { expect(BENCH.includes(old) || !CREATURE_IDS.includes(old), old).toBe(true); expect(kinds[now], now).toBeDefined(); expect(PLACE_OF[now]).toBe(old); }
  });
  it("has every area type's species once, and no other", () => {
    const species = AREA_TYPES.map(a => a.creature).sort();
    expect(Object.keys(real).sort()).toEqual(species);
  });
  it("introduces 10 at home, 6 in phase 1, then 16 in each of phases 2, 3 and 4 (the roster, Ed, 2026-10-23: layout B): 64, each with a bearing 0 to 360", () => {
    const by = [0, 1, 2, 3, 4, 5].map(p => Object.values(kinds).filter(k => k.phase === p).length);
    expect(by).toEqual([10, 6, 16, 16, 16, 0]);
    expect(Object.keys(kinds).length).toBe(64);
    for (const [id, k] of Object.entries(kinds)) if (k.phase < 4) expect(!!k.placeholder, id).toBe(false); // (every kind before phase 4 is designed; the last placeholders are the sphinx's and the feathered serpent's slots)
    for (const k of Object.values(kinds)) { expect(k.bearing).toBeGreaterThanOrEqual(0); expect(k.bearing).toBeLessThan(360); }
  });
  it("puts home and phase 1 in temperate, then 6 kinds in each compass biome, 2 a phase, near its point (Ed, 2026-10-23)", () => {
    const COMPASS = ["cold", "mountains and glaciers", "volcanic", "badlands", "hot", "mangrove swamp", "jungle", "cold rainforest"];
    for (const [id, k] of Object.entries(kinds)) if (k.phase < 2) expect(k.biome, id).toBe("temperate");
    expect(Object.values(kinds).filter(k => k.biome === "temperate").length).toBe(16);
    COMPASS.forEach((b, i) => {
      const its = Object.entries(kinds).filter(([, k]) => k.biome === b);
      expect(its.map(([id]) => id), b).toHaveLength(6);
      expect([2, 3, 4].map(p => its.filter(([, k]) => k.phase === p).length), b).toEqual([2, 2, 2]);
      for (const [id, k] of its) { const off = Math.abs(((k.bearing - i * 45 + 540) % 360) - 180); expect(off, id).toBeLessThan(22.5); }
    });
    expect(Object.values(kinds).every(k => k.biome === "temperate" || COMPASS.includes(k.biome ?? ""))).toBe(true);
  });
  it("deals only the first 32 slots' kinds on the classic map, so adding or moving a journey kind leaves today's maps as they were", () => {
    for (const t of CLASSIC_TYPES) expect(KIND_SLOTS[AREA_TYPES[t].creature], AREA_TYPES[t].id).toBeLessThan(CLASSIC_SLOTS);
    expect(CLASSIC_TYPES.length).toBe(CLASSIC_SLOTS);
  });
});
