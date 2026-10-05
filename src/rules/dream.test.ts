import { describe, expect, it } from "vitest";
import { dreamStone } from "./dream";
import { AREA_TYPES, generateMap } from "./map";
import { TUNING } from "./tuning";

describe("a dream's direction", () => {
  it("points at the runestone of the nearest area of the dreamed creature's kind, explored or not", () => {
    const map = generateMap(123, TUNING);
    const species = AREA_TYPES[map.typeOf(2, 3)].creature, from = map.siteOf(7, 7);
    const s = dreamStone(map, species, from.x, from.z)!;
    expect(AREA_TYPES[map.typeOf(s.cell[0], s.cell[1])].creature).toBe(species);
    // none of its kind is nearer
    const d = Math.hypot(map.siteOf(s.cell[0], s.cell[1]).x - from.x, map.siteOf(s.cell[0], s.cell[1]).z - from.z);
    for (let i = 0; i < map.n; i++) for (let j = 0; j < map.n; j++) if (AREA_TYPES[map.typeOf(i, j)].creature === species) expect(Math.hypot(map.siteOf(i, j).x - from.x, map.siteOf(i, j).z - from.z)).toBeGreaterThanOrEqual(d);
    expect(dreamStone(map, "no-such-creature", from.x, from.z)).toBeNull();
  });
});
