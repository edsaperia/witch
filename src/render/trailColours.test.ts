// Her trail's colour presets (render/trailColours.ts; Ed, 2026-11-03): the sections take a preset's colours front to back, and more
// sections than colours spread over its gradient (Ed: "they spread out the gradient"), evenly, in crisp pixel colours.
import { describe, expect, it } from "vitest";
import { TRAIL_PRESETS, gradientAt, hexRgb, oklab, sectionColours, trailPreset } from "./trailColours";

const dist = (a: readonly number[], b: readonly number[]) => { const p = oklab(a), q = oklab(b); return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]); };

describe("the trail's colour presets", () => {
  it("has the six presets, the first Ed's 🟥🟧🟨⬜, its red apart from the warning red", () => {
    expect(TRAIL_PRESETS.map(p => p.id)).toEqual(["warm", "cool", "pastel", "party", "gold", "ice"]);
    expect(trailPreset("warm").emoji).toBe("🟥🟧🟨⬜");
    expect(trailPreset("cool").emoji).toBe("🟪🟦🟩🟨");
    expect(dist(hexRgb(trailPreset("warm").colours[0]), hexRgb("#e62828"))).toBeGreaterThan(0.05);
    expect(trailPreset("nonsense").id).toBe("warm");
  });
  it("gives the sections the preset's colours in order, front to back (as many sections as colours or fewer)", () => {
    for (const p of TRAIL_PRESETS) for (let n = 1; n <= p.colours.length; n++) expect(sectionColours(p.colours, n)).toEqual(p.colours.slice(0, n).map(hexRgb));
    expect(sectionColours(["#dd2255", "#ffffff"], 1)).toEqual([[221, 34, 85]]); // (a lone section: the first)
  });
  it("spreads more sections over the gradient: its ends the first and last colours, evenly stepped, crisp pixel colours", () => {
    for (const p of TRAIL_PRESETS) for (const n of [p.colours.length + 1, p.colours.length + 3, 12]) {
      const c = sectionColours(p.colours, n), stops = p.colours.map(hexRgb);
      expect(c).toHaveLength(n);
      expect(c[0]).toEqual(stops[0]); expect(c[n - 1]).toEqual(stops[stops.length - 1]);
      for (const x of c) for (const v of x) { expect(Number.isInteger(v)).toBe(true); expect(v).toBeGreaterThanOrEqual(0); expect(v).toBeLessThanOrEqual(255); }
      for (let i = 1; i < n; i++) expect(c[i]).not.toEqual(c[i - 1]); // (each section its own colour)
      // even: each section within a snap's width of its evenly spaced place on the gradient, in OKLab
      for (let i = 0; i < n; i++) {
        const f = (i / (n - 1)) * (stops.length - 1), k = Math.min(stops.length - 2, Math.floor(f)), u = f - k, A = oklab(stops[k]), B = oklab(stops[k + 1]), q = oklab(c[i]);
        expect(Math.hypot(q[0] - (A[0] + (B[0] - A[0]) * u), q[1] - (A[1] + (B[1] - A[1]) * u), q[2] - (A[2] + (B[2] - A[2]) * u))).toBeLessThan(0.01);
      }
    }
  });
  it("interpolates in OKLab, a stop exactly itself", () => {
    const s = [[255, 0, 0], [0, 0, 255]];
    expect(gradientAt(s, 0)).toEqual([255, 0, 0]); expect(gradientAt(s, 1)).toEqual([0, 0, 255]);
    const mid = gradientAt(s, 0.5); expect(Math.abs(dist(mid, s[0]) - dist(mid, s[1]))).toBeLessThan(0.03);
  });
});
