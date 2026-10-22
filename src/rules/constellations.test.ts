import { describe, expect, it } from "vitest";
import { FINDABLE, type Trunk } from "./finds";
import { CONSTELLATION_UP, OUTLINES, constellationTonight } from "./constellations";

describe("the constellations (rules/constellations.ts)", () => {
  it("give every findable wearable an outline of 7 to 10 stars, within the sky's limits (render/sky.ts: 12 stars, 16 lines)", () => {
    for (const it of FINDABLE) {
      const O = OUTLINES[it.id];
      expect(O, it.id).toBeDefined();
      expect(O.stars.length, it.id).toBeGreaterThanOrEqual(7);
      expect(O.stars.length, it.id).toBeLessThanOrEqual(10);
      expect(O.lines.length, it.id).toBeLessThanOrEqual(16);
      for (const [a, b] of O.lines) { expect(O.stars[a], `${it.id} ${a}`).toBeDefined(); expect(O.stars[b], `${it.id} ${b}`).toBeDefined(); expect(a).not.toBe(b); }
      const xs = O.stars.map(s => s[0]), ys = O.stars.map(s => s[1]);
      expect(Math.max(...xs) - Math.min(...xs), it.id).toBeLessThanOrEqual(18);
      expect(Math.max(...ys) - Math.min(...ys), it.id).toBeLessThanOrEqual(18);
    }
  });
  it("stand at the trunk's bearing from the treehouse, about 35° up, and go once it's found", () => {
    const trunk: Trunk = { x: 100, z: 0, cell: [0, 0], item: "top-cape", found: false };
    const c = constellationTonight(trunk, 0, 0)!;
    expect(c.bearing).toBeCloseTo(90); // (due east: north is -z)
    expect(c.elevation).toBe(CONSTELLATION_UP);
    const mid = c.stars.reduce((a, s) => a + s.bearing, 0) / c.stars.length;
    expect(Math.abs(mid - 90)).toBeLessThan(2);
    expect(constellationTonight({ ...trunk, found: true }, 0, 0)).toBeNull();
    expect(constellationTonight({ ...trunk, item: null }, 0, 0)).toBeNull();
    expect(constellationTonight(null, 0, 0)).toBeNull();
  });
  it("wrap round north", () => {
    const c = constellationTonight({ x: -1, z: -100, cell: [0, 0], item: "shades", found: false }, 0, 0)!;
    for (const s of c.stars) { expect(s.bearing).toBeGreaterThanOrEqual(0); expect(s.bearing).toBeLessThan(360); }
  });
});
