import { describe, expect, it } from "vitest";
import { FIND_KINDS, nightFind, type Trunk } from "./finds";
import { CONSTELLATION_UP, OUTLINES, constellationFor } from "./constellations";

describe("the constellations (rules/constellations.ts)", () => {
  it("give every item in the finds pool (the wearables and the 9 broom parts) an outline of 7 to 10 stars, within the sky's limits (render/sky.ts: 12 stars, 16 lines)", () => {
    expect(FIND_KINDS.find(k => k.id === "part")!.items.length).toBe(9);
    for (const it of FIND_KINDS.flatMap(k => k.items.map(id => ({ id })))) {
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
    const trunk: Trunk = { x: 100, z: 0, cell: [0, 0], kind: "wearable", item: "top-cape", found: false };
    const c = constellationFor(nightFind({ trunk }, 0, 0))!;
    expect(c.bearing).toBeCloseTo(90); // (due east: north is -z)
    expect(c.elevation).toBe(CONSTELLATION_UP);
    const mid = c.stars.reduce((a, s) => a + s.bearing, 0) / c.stars.length;
    expect(Math.abs(mid - 90)).toBeLessThan(2);
    expect(constellationFor(nightFind({ trunk: { ...trunk, found: true } }, 0, 0))).toBeNull();
    expect(constellationFor(nightFind({ trunk: { ...trunk, item: null } }, 0, 0))).toBeNull();
    expect(constellationFor(nightFind({ trunk: null }, 0, 0))).toBeNull();
  });
  it("take the night's one find from one source, any kind, an outline by its item id (Ed, 2026-10-22: one permanent upgrade a night)", () => {
    expect(nightFind({ trunk: { x: 0, z: 50, cell: [0, 0], kind: "wearable", item: "bumbag", found: false } }, 0, 0)).toEqual({ kind: "wearable", item: "bumbag", bearing: 180 });
    // a wreck's broom part (the Workshop, Ed 2026-10-23): the same hint, its own outline
    const wreck = nightFind({ trunk: { x: 50, z: 0, cell: [0, 0], kind: "part", item: "nozzles", found: false } }, 0, 0);
    expect(wreck).toEqual({ kind: "part", item: "nozzles", bearing: 90 });
    expect(constellationFor(wreck)!.stars.length).toBe(OUTLINES.nozzles.stars.length);
    expect(constellationFor({ kind: "wearable", item: "no-such-item", bearing: 0 })).toBeNull();
  });
  it("wrap round north", () => {
    const c = constellationFor(nightFind({ trunk: { x: -1, z: -100, cell: [0, 0], kind: "wearable", item: "shades", found: false } }, 0, 0))!;
    for (const s of c.stars) { expect(s.bearing).toBeGreaterThanOrEqual(0); expect(s.bearing).toBeLessThan(360); }
  });
});
