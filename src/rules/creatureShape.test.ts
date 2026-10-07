// One shape for every creature, built as one object literal (rules/creatures.ts makeCreature): the required fields, then
// every optional one in CREATURE_OPTIONAL's order. Set one by one after the fact (keyed stores) they tipped V8 into
// dictionary mode, every field read a hash lookup; a literal keeps fast properties. This pins the order, so a field added
// to the type and to CREATURE_OPTIONAL but not to the literal (or out of order) is caught.
import { describe, expect, it } from "vitest";
import { CREATURE_OPTIONAL, spawnCreatures } from "./creatures";
import { generateMap } from "./map";
import { TUNING } from "./tuning";

const REQUIRED = ["id", "species", "level", "cell", "homeX", "homeZ", "range", "anchorX", "anchorZ", "x", "z", "tx", "tz", "rest", "speed", "facing", "away", "moving", "walk", "seen", "leashed", "rand"];

describe("a creature's shape", () => {
  it("has every field, required then optional in one order, for every creature (legends too)", () => {
    const all = spawnCreatures(generateMap(123, TUNING)), want = [...REQUIRED, ...CREATURE_OPTIONAL];
    for (const c of [all[0], all.find(c => c.boss)!, all.find(c => c.circle)!]) expect(Object.keys(c)).toEqual(want);
  });
});
