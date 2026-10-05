// Home's area settled first (Ed, 2026-10-05: "Home area should be big enough that the whole
// circle, centre the dancefloor, edge the treehouse, is within it - should fix this before
// generating the rest of the areas on the map").
import { describe, expect, it } from "vitest";
import { generateMap, type ForestMap } from "./map";
import { TUNING } from "./tuning";

const SEEDS = [123, 293912, 7, 1000, 42, 31337];
const same = (a: readonly number[], b: readonly number[]) => a[0] === b[0] && a[1] === b[1];
const home = (m: ForestMap, x: number, z: number) => same(m.areaAt(x, z).cell, m.centreCell);

describe("home's area holds the whole circle from the dancefloor out past the treehouse", () => {
  for (const seed of SEEDS) it(`seed ${seed}`, () => {
    const m = generateMap(seed, TUNING), d = m.dancefloor, th = m.treehouse;
    expect(home(m, d.x, d.z)).toBe(true);
    for (const s of d.speakers) expect(home(m, s.x, s.z)).toBe(true);
    expect(home(m, th.x, th.z)).toBe(true);
    // The whole disc, out to the treehouse's far side (its footprint) and the margin.
    const R = Math.hypot(th.x - d.x, th.z - d.z) + TUNING.treehouse.clear + TUNING.home.margin;
    const out: string[] = [];
    for (let r = 0; r <= R; r += 4) for (let k = 0, steps = Math.max(1, Math.ceil((2 * Math.PI * r) / 4)); k < steps; k++) {
      const a = (k / steps) * Math.PI * 2, x = d.x + Math.cos(a) * r, z = d.z + Math.sin(a) * r;
      if (!home(m, x, z)) out.push(`${x.toFixed(0)},${z.toFixed(0)}`);
    }
    expect(out).toEqual([]);
    // cellSafe agrees with areaAt (it's what the walkers use).
    for (let k = 0; k < 64; k++) { const a = k * 0.7, r = (k / 64) * R, x = d.x + Math.cos(a) * r, z = d.z + Math.sin(a) * r; expect(same(m.cellSafe(x, z).cell, m.centreCell)).toBe(true); }
  });
});

describe("the areas round home keep a sensible size, and their own centres", () => {
  for (const seed of SEEDS.slice(0, 3)) it(`seed ${seed}`, () => {
    const m = generateMap(seed, TUNING), A = m.areaSize, [hx, hy] = m.centreCell, step = 8, count = new Map<string, number>();
    const d = m.dancefloor;
    for (let z = d.z - 3 * A; z <= d.z + 3 * A; z += step) for (let x = d.x - 3 * A; x <= d.x + 3 * A; x += step) {
      const c = m.areaAt(x, z).cell, k = `${c[0]},${c[1]}`;
      count.set(k, (count.get(k) ?? 0) + 1);
    }
    const area = (cx: number, cy: number) => ((count.get(`${cx},${cy}`) ?? 0) * step * step) / (A * A); // in areas
    const sizes: string[] = [];
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue;
      const cx = hx + dx, cy = hy + dy, s = m.siteOf(cx, cy);
      sizes.push(`${cx},${cy}: ${area(cx, cy).toFixed(2)}`);
      expect(area(cx, cy), `area ${cx},${cy}`).toBeGreaterThan(0.3);
      expect(home(m, s.x, s.z), `${cx},${cy}'s centre outside home`).toBe(false);
    }
    expect(area(hx, hy)).toBeLessThan(2.5); // home's not swallowed its neighbours
    expect(sizes.length).toBe(8);
  }, 30000);
});
