import { describe, expect, it } from "vitest";
import { CARVING_SIZE, carvingMask } from "./legendCarving";

// The sigil carved into a legend circle's floor (Ed, 2026-10-06): a stand-in magic circle until golf's legendary sigils land.
describe("the legend circle floor's carving", () => {
  it("is a ring-edged magic circle, its grooves a modest share of it, the same each time and different by kind", () => {
    const n = CARVING_SIZE, wolf = carvingMask("wolf"), elk = carvingMask("elk");
    expect(wolf.length).toBe(n * n);
    expect(carvingMask("wolf")).toBe(wolf); // (made once a kind)
    const share = (m: Uint8Array) => m.reduce((a, v) => a + (v > 128 ? 1 : 0), 0) / m.length;
    expect(share(wolf)).toBeGreaterThan(0.05);
    expect(share(wolf)).toBeLessThan(0.3);
    // the outer ring touches the edge: a groove near the middle of each side
    for (const [x, y] of [[n / 2, 1], [n / 2, n - 2], [1, n / 2], [n - 2, n / 2]]) expect(Math.max(...[-1, 0, 1].map(k => wolf[(y + (x === n / 2 ? 0 : k)) * n + x + (x === n / 2 ? k : 0)]))).toBeGreaterThan(100);
    let differ = 0;
    for (let i = 0; i < n * n; i++) if ((wolf[i] > 128) !== (elk[i] > 128)) differ++;
    expect(differ).toBeGreaterThan(n * 2);
  });
});
