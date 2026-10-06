// The legend relics' places (Ed, 2026-10-06: "each one should appear on the map once. One appears
// near an edge of the home area, the rest are scattered across the map, none can be within 150m of
// another"), over many seeds: one of each kind, one just inside home's edge, every pair minGap
// apart, none in a cleared place, all in bounds; and the same map gives the same relics.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { generateMap } from "./map";
import { Forest } from "./forest";
import { LEGENDS, placeRelics } from "./legends";

const SEEDS = [1, 2, 3, 7, 42, 123, 999, 4242, 31337, 165272, 922199, 2026];

describe("legend relics on the map", () => {
  it("one of each kind, one just inside the home area's edge, the rest out in the map, every pair minGap apart", () => {
    const R = LEGENDS.relics;
    for (const seed of SEEDS) {
      const map = generateMap(seed, TUNING), relics = placeRelics(map, new Forest(map));
      expect(relics.length, `seed ${seed}`).toBe(R.kinds.length);
      expect([...relics.map(r => r.kind)].sort(), `seed ${seed}`).toEqual([...R.kinds].sort());
      const C = map.centreCell, home = map.siteOf(C[0], C[1]);
      const inHome = relics.filter(r => r.cell[0] === C[0] && r.cell[1] === C[1]);
      expect(inHome.length, `seed ${seed}: one in the home area`).toBe(1);
      // Near its edge: within homeInset (and a step) of leaving it, out past home's circle.
      const h = inHome[0], d = Math.hypot(h.x - home.x, h.z - home.z), dx = (h.x - home.x) / d, dz = (h.z - home.z) / d;
      const out = (k: number) => { const c = map.cellSafe(h.x + dx * k, h.z + dz * k).cell; return c[0] !== C[0] || c[1] !== C[1]; };
      expect(out(R.homeInset + 5), `seed ${seed}: near home's edge`).toBe(true);
      expect(d, `seed ${seed}: past home's circle`).toBeGreaterThan(map.homeRadius);
      for (const r of relics) {
        expect(map.hardClear(r.x, r.z), `seed ${seed}: ${r.kind} not in a cleared place`).toBe(false);
        expect(r.x > map.bounds.minX && r.x < map.bounds.maxX && r.z > map.bounds.minZ && r.z < map.bounds.maxZ).toBe(true);
        if (r !== h) expect(map.remoteness(r.cell[0], r.cell[1])).toBeGreaterThanOrEqual(R.minRemoteness);
      }
      for (let i = 0; i < relics.length; i++) for (let j = i + 1; j < relics.length; j++) {
        expect(Math.hypot(relics[i].x - relics[j].x, relics[i].z - relics[j].z), `seed ${seed}: ${relics[i].kind}–${relics[j].kind}`).toBeGreaterThanOrEqual(R.minGap);
      }
    }
  }, 240000);

  it("are the same for the same seed", () => {
    const a = generateMap(123, TUNING), b = generateMap(123, TUNING);
    expect(placeRelics(a, new Forest(a))).toEqual(placeRelics(b, new Forest(b)));
  }, 60000);
});
