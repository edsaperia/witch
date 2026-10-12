import { describe, expect, it } from "vitest";
import { generateMap, type ForestMap } from "./map";
import { TUNING, withTuning } from "./tuning";

// Ed (2026-10-06): "Legends should only appear in about half of areas (we can test this ratio); every area makes them too common."
/** The playable areas, home among them (the circular map's map.cells, #281; else the square's). */
const playable = (m: ForestMap) => (m as { cells?: readonly unknown[] }).cells?.length ?? m.n * m.n;
const clumps = (m: ForestMap) => {
  const seen = new Set<string>(), sizes: number[] = [];
  for (const k of m.legendCells) {
    if (seen.has(k)) continue;
    let n = 0; const todo = [k]; seen.add(k);
    while (todo.length) { const c = todo.pop()!; n++; for (const x of m.neighbours.get(c) ?? []) if (m.legendCells.has(x) && !seen.has(x)) { seen.add(x); todo.push(x); } }
    sizes.push(n);
  }
  return sizes;
};

describe("legends in a share of the areas (legends.share)", () => {
  it("puts one in legends.share of the areas (Ed, 2026-10-08: about a fifth), never home, seeded, spread so they don't clump", () => {
    const S = TUNING.legends.share, half = withTuning({ legends: { ...TUNING.legends, share: 0.5 } });
    expect(S).toBe(0.2);
    for (const seed of [1, 123, 4242, 90210]) {
      const m = generateMap(seed, TUNING), areas = playable(m) - 1, [hx, hy] = m.centreCell;
      expect(m.legendCells.size).toBe(Math.round(areas * S));
      expect(m.hasLegend(hx, hy)).toBe(false);
      expect([...generateMap(seed, TUNING).legendCells]).toEqual([...m.legendCells]);
      // at a third or less (the default too), never more than two neighbouring areas together
      expect(Math.max(...clumps(m))).toBeLessThanOrEqual(2);
      const thin = generateMap(seed, withTuning({ legends: { ...TUNING.legends, share: 0.3 } }));
      expect(Math.max(...clumps(thin))).toBeLessThanOrEqual(2);
      // and at half, spread: each legend area borders few others (at random, half of about 5.4 neighbours: 2.7)
      const h = generateMap(seed, half);
      expect(h.legendCells.size).toBe(Math.round(areas * 0.5));
      const deg = [...h.legendCells].map(k => [...(h.neighbours.get(k) ?? [])].filter(x => h.legendCells.has(x)).length);
      expect(Math.max(...deg)).toBeLessThanOrEqual(3);
      expect(deg.reduce((a, b) => a + b, 0) / deg.length).toBeLessThan(1.8);
    }
  }, 60000);
  it("puts one in every area but home at 1, and differs by seed", () => {
    const m = generateMap(7, withTuning({ legends: { ...TUNING.legends, share: 1 } }));
    expect(m.legendCells.size).toBe(playable(m) - 1);
    expect([...generateMap(8, TUNING).legendCells].sort()).not.toEqual([...generateMap(9, TUNING).legendCells].sort());
  }, 60000);
});
