// Only the island's roster appears (Ed, 2026-10-14: "I'm on island=home and I see an owl, so something is broken"): every
// creature ever made on an island over a whole night (its first population, the growth each wave wakes, the legends and their
// circle babies, the besiegers marching on) is a kind of its roster (rules/rosters.ts). Home's roster is the kinds she knows:
// its ten at a campaign's start, and (Ed, 2026-10-10, journey.md "Home's size": one area per kind she knows) every kind whose
// island the campaign has found (the save's found: app/chartSave.ts, the map's found), so a found owl brings an owl area to home.
import { describe, expect, it } from "vitest";
import { TUNING, withTuning } from "./tuning";
import { newGame, stepGame, STEP, type Controls } from "./game";
import { homeKinds, islandOf, knownKinds } from "./rosters";
import { AREA_TYPES } from "./map";

// Keep authored campaign/island sizes: each whole-night assertion checks that roster and its growth, including home's ten-to-eleven transition.
const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };

/** A whole night headless on `island` (home with `found` islands, or a kind's): every wave brought on (so every area wakes and
 *  makes the creatures it grew), a minute played after the last; every species ever made, by count. */
function nightSpecies(seed: number, island: string, found: string[] = [], waves = 12): Map<string, number> {
  const T = withTuning({ map: { ...TUNING.map!, island, islandAreas: island === "home" ? 10 : 0, found } });
  const g = newGame(seed, T), seen = new Map<string, number>();
  const note = () => { for (const c of g.creatures) seen.set(c.species, (seen.get(c.species) ?? 0) + 1); };
  g.clock.paused = false; g.party.spellAt = undefined; g.party.paused = true;
  g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
  stepGame(g, idle, STEP); note();
  for (let w = 0; w < waves; w++) { stepGame(g, { ...idle, nextWave: true }, STEP); for (let i = 0; i < 2 / STEP; i++) stepGame(g, idle, STEP); note(); }
  for (let i = 0; i < 20 / STEP; i++) stepGame(g, idle, STEP);
  note();
  return seen;
}

describe("only the island's roster appears (rules/rosters.ts)", () => {
  it("home at a campaign's start: every creature made over a night is one of its ten kinds (no flyers, no insects)", () => {
    const home = new Set(homeKinds());
    expect([...home].sort()).toEqual(["badger", "dormouse", "fox", "hare", "hedgehog", "marten", "mole", "snail", "squirrel", "stoat"]);
    for (const seed of [123, 7]) {
      const seen = nightSpecies(seed, "home");
      expect([...seen.keys()].filter(k => !home.has(k)), `seed ${seed}: outside home's roster`).toEqual([]);
      expect(seen.size, `seed ${seed}: one area a kind`).toBe(home.size); // (every kind met: one area each)
      expect(seen.has("owl")).toBe(false);
    }
  }, 240000);

  it("a kind's island: every creature made over a night is in its roster", () => {
    for (const kind of ["fox", "bear"]) {
      const roster = new Set(islandOf(kind)!.roster.map(r => r.kind)), seen = nightSpecies(123, kind, [], kind === "bear" ? 24 : 12);
      expect([...seen.keys()].filter(k => !roster.has(k)), `${kind}'s island: outside its roster`).toEqual([]);
      expect(seen.has(kind)).toBe(true);
    }
  }, 240000);

  it("home grows with the kinds found (Ed, 2026-10-10): a campaign that found the owl's island has an owl area at home, and nothing else new", () => {
    const seen = nightSpecies(123, "home", ["owl"]), known = new Set(knownKinds(["owl"]));
    expect(known.has("owl")).toBe(true);
    expect([...seen.keys()].filter(k => !known.has(k))).toEqual([]);
    expect(seen.has("owl")).toBe(true);
    // (and every area type's creature is a real kind: a type with no kind would spawn something no roster holds)
    for (const a of AREA_TYPES) expect(typeof a.creature, a.id).toBe("string");
  }, 240000);
});
