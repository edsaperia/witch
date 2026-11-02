// Hostile stone-idle contracts (Ed, 2026-10-08). C1 reports the original largest-world distributions.
import { describe, expect, it } from "vitest";
import { LEGEND, idlesAtStone, pointInArea, type Creature } from "./creatures";
import type { ForestMap } from "./map";
import { TUNING } from "./tuning";

const S = TUNING.stoneIdle!;
// Deliberately supplied dry area; target selection uses the public rule, without a generated game.
const fixture = (on = true, inside = true) => {
  const queries: [number, number][] = [];
  const cell = (x: number, z: number) => { queries.push([x, z]); return { cell: inside || (x === 200 && z === 0) ? [1, 1] : [2, 2] }; };
  const map = { seed: 123, bounds: {}, tuning: { ...TUNING, stoneIdle: { ...S, on } },
    soundsystemSpot: () => ({ x: 0, z: 0 }),
    areaAt: cell, cellSafe: cell
  } as unknown as ForestMap;
  const c = { id: 0, level: 1, cell: [1, 1], homeX: 200, homeZ: 0, anchorX: 200, anchorZ: 0, range: 20 } as Creature;
  return { map, c, queries };
};

describe("hostile creatures idle near the runestone (Ed, 2026-10-08)", () => {
  it("chooses valid hostile targets within the configured annulus, excluding babies, legends and circle babies", () => {
    const { map, c, queries } = fixture();
    expect(idlesAtStone(c)).toBe(true);
    for (const r of [0, 0.25, 0.5, 0.75, 1]) {
      const p = pointInArea(map, c, () => r), distance = Math.hypot(...p);
      expect(distance).toBeGreaterThanOrEqual(S.clear - 1e-9);
      expect(distance).toBeLessThanOrEqual(S.radius + 1e-9);
      expect(map.areaAt(...p).cell).toEqual(c.cell);
    }
    expect(queries.length).toBeGreaterThan(0);
    const excluded: Partial<Creature>[] = [{ level: 0 }, { level: LEGEND }, { boss: true }, { circle: { x: 0, z: 0, r: 10, legendX: 0, legendZ: 0 } }];
    for (const over of excluded) expect(idlesAtStone({ ...c, ...over })).toBe(false);
    const rejected = fixture(true, false);
    const fallback = pointInArea(rejected.map, rejected.c, () => 0.5);
    expect(fallback).toEqual([rejected.c.anchorX, rejected.c.anchorZ]);
    expect(rejected.map.areaAt(...fallback).cell).toEqual(rejected.c.cell);
    expect(rejected.queries.length).toBeGreaterThan(0);
  });

  it("uses whole-area targets for friendly creatures or with stoneIdle disabled", () => {
    for (const off of [false, true]) {
      const { map, c } = fixture(!off);
      if (!off) c.friendly = true;
      expect(off || !idlesAtStone(c)).toBe(true);
      const p = pointInArea(map, c, () => 0.25);
      expect(Math.hypot(p[0] - c.homeX, p[1] - c.homeZ)).toBeCloseTo(c.range * 0.5);
      expect(map.areaAt(...p).cell).toEqual(c.cell);
    }
    for (const over of [{ friendly: true }, { leashed: true }, { enraged: true }, { dancing: true }, { state: "happy" as const }]) expect(idlesAtStone({ level: 1, ...over })).toBe(false);
  });
});
