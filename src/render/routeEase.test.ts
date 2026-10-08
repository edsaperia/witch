// The leash's drawn route eased between re-plans (render/routeEase.ts; Ed, 2026-10-06: "their travel paths (denoted by
// the leash dots) jump around as the path is updated").
import { describe, expect, it } from "vitest";
import { bendOf, easeRoute, ROUTE_SAMPLES } from "./routeEase";

const bulge = (side: number, a = { x: 0, z: 0 }, b = { x: 200, z: 0 }) => [a, { x: (a.x + b.x) / 2, z: (a.z + b.z) / 2 + side * 40 }, b];
const mid = (line: { x: number; z: number }[]) => line[ROUTE_SAMPLES / 2];

describe("a travelling animal's drawn route", () => {
  it("has no bend along a straight line, and samples a bent one evenly by arc length", () => {
    expect([...bendOf([{ x: 0, z: 0 }, { x: 50, z: 0 }, { x: 120, z: 0 }])].every(v => Math.abs(v) < 1e-4)).toBe(true);
    const b = bendOf(bulge(1));
    expect(b[0]).toBeCloseTo(0, 5); expect(b[ROUTE_SAMPLES * 2 + 1]).toBeCloseTo(0, 5); // (no bend at its ends)
    expect(b[(ROUTE_SAMPLES / 2) * 2 + 1]).toBeCloseTo(40, 3); // (the bulge's peak halfway along)
  });

  it("glides to a re-plan that bends the other way instead of jumping, its ends always exact", () => {
    let shape = easeRoute(undefined, bulge(1), 0, 0.3).shape;
    let last = mid(easeRoute(shape, bulge(1), 0, 0.3).line).z, biggest = 0;
    // Re-planned to bend the other way; drawn at 60 frames a second, her and the creature moving on meanwhile.
    for (let f = 1; f <= 90; f++) {
      const t = f / 60, a = { x: t * 2, z: 0 }, b = { x: 200 + t * 48, z: 0 }, r = easeRoute(shape, bulge(-1, a, b), t, 0.3);
      shape = r.shape;
      expect(r.line[0]).toEqual(a); // (the creature's end on the creature)
      expect(r.line[ROUTE_SAMPLES].x).toBeCloseTo(b.x, 5); expect(r.line[ROUTE_SAMPLES].z).toBeCloseTo(b.z, 5); // (and hers on her)
      const z = mid(r.line).z;
      biggest = Math.max(biggest, Math.abs(z - last)); last = z;
      if (f === 3) expect(z).toBeGreaterThan(25); // (a twentieth of a second on: still mostly the old bend)
    }
    expect(biggest).toBeLessThan(6); // (a frame's step at most: the old drawing jumped 80 m at once)
    expect(last).toBeLessThan(-38); // (a second and a half on: settled on the new bend)
  });
});
