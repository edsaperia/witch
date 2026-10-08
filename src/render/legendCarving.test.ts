import { describe, expect, it } from "vitest";
import { CARVING_SIZE, carvingMask } from "./legendCarving";

// The sigil carved into a legend circle's floor (Ed, 2026-10-06): the legend's legendary sigil (golf's, art/sigils.js), as grooves.
describe("the legend circle floor's carving", () => {
  it("is the legend's legendary sigil, ring-edged, its grooves a modest share of it, the same each time and different by kind", () => {
    const n = CARVING_SIZE, wolf = carvingMask("wolf"), elk = carvingMask("elk");
    expect(wolf.length).toBe(n * n);
    expect(carvingMask("wolf")).toBe(wolf); // (made once a kind)
    const share = (m: Uint8Array) => m.reduce((a, v) => a + (v > 128 ? 1 : 0), 0) / m.length;
    expect(share(wolf)).toBeGreaterThan(0.05);
    expect(share(wolf)).toBeLessThan(0.4); // (the legendary sigil is dense: rune bands, a cell track, medallions, the animal)
    // the outer ring at the edge: a groove within a few pixels of the middle of each side
    const near = (f: (d: number) => number) => Math.max(...[0, 1, 2, 3, 4, 5].map(f));
    expect(near(d => wolf[d * n + n / 2])).toBeGreaterThan(100);
    expect(near(d => wolf[(n - 1 - d) * n + n / 2])).toBeGreaterThan(100);
    expect(near(d => wolf[(n / 2) * n + d])).toBeGreaterThan(100);
    expect(near(d => wolf[(n / 2) * n + n - 1 - d])).toBeGreaterThan(100);
    let differ = 0;
    for (let i = 0; i < n * n; i++) if ((wolf[i] > 128) !== (elk[i] > 128)) differ++;
    expect(differ).toBeGreaterThan(n * 2);
  });
});
