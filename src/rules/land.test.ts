import { describe, expect, it } from "vitest";
import { makeLand } from "./land";

// A round island with a round lake in it: the land map's distances against the shapes' own.
const R = 500, LAKE = { x: 150, z: -60, r: 90 };
const isLand = (x: number, z: number) => Math.hypot(x, z) < R && Math.hypot(x - LAKE.x, z - LAKE.z) > LAKE.r;
const exact = (x: number, z: number) => Math.min(R - Math.hypot(x, z), Math.hypot(x - LAKE.x, z - LAKE.z) - LAKE.r);
const box = { minX: -R, maxX: R, minZ: -R, maxZ: R };

describe("the land map", () => {
  const land = makeLand(isLand, box, 4);

  it("traces the coast and the lake's shore as two loops, the sea's and the lake's", () => {
    expect(land.loops.length).toBe(2);
    const sea = land.loops.find(l => l.sea)!, lake = land.loops.find(l => !l.sea)!;
    expect(sea.length).toBeCloseTo(2 * Math.PI * R, -1);
    expect(lake.length).toBeCloseTo(2 * Math.PI * LAKE.r, -1);
  });

  it("knows how far from the water any point is, to well under a metre near the coast", () => {
    let worst = 0;
    for (let k = 0; k < 4000; k++) {
      const a = (k * 2.399) % (Math.PI * 2), r = ((k * 7919) % 997) / 997 * (R + 100), x = Math.cos(a) * r, z = Math.sin(a) * r, e = exact(x, z);
      if (Math.abs(e) > 60) { expect(Math.sign(land.distAt(x, z))).toBe(Math.sign(e)); continue; }
      worst = Math.max(worst, Math.abs(land.distAt(x, z) - e));
    }
    expect(worst).toBeLessThan(0.6);
  });

  it("finds the nearest point of the coast, and the way out to the water from it", () => {
    const s = land.shore(0, 460);
    expect(s.dist).toBeCloseTo(40, 0);
    expect(s.z).toBeCloseTo(R, 0);
    expect(s.nz).toBeCloseTo(1, 1); // (out: away from the middle)
    const l = land.shore(LAKE.x + LAKE.r + 10, LAKE.z);
    expect(l.dist).toBeCloseTo(10, 0);
    expect(l.nx).toBeCloseTo(-1, 1); // (out to the lake: back toward its middle)
    expect(land.loops[l.loop].sea).toBe(false);
    const w = land.inward(0, 460);
    expect(w.z).toBeCloseTo(-1, 1);
  });

  it("walks round a loop: `along` comes back to the start after its length", () => {
    const s = land.shore(0, 480), p = land.along(s.loop, s.s), q = land.along(s.loop, s.s + land.loops[s.loop].length);
    expect(p.x).toBeCloseTo(s.x, 3); expect(p.z).toBeCloseTo(s.z, 3);
    expect(q.x).toBeCloseTo(s.x, 3); expect(q.z).toBeCloseTo(s.z, 3);
  });

  it("is the sea off the grid, deeper the further off", () => {
    expect(land.distAt(2000, 0)).toBeLessThan(land.distAt(1000, 0));
    expect(land.distAt(1000, 0)).toBeLessThan(-400);
  });
});
