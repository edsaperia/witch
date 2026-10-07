import { describe, expect, it } from "vitest";
import { legendGlow, outlineIn, readLegendGlow, OUTLINE_STEPS } from "./legendOutline";

describe("a sleeping legend's outline only in its circle (Ed, 2026-10-07)", () => {
  it("shows fully inside the circle, none outside it, and fades smoothly across its edge", () => {
    expect(outlineIn(0, 20)).toBe(1);
    expect(outlineIn(18, 20)).toBe(1);
    expect(outlineIn(22, 20)).toBe(0);
    expect(outlineIn(60, 20)).toBe(0);
    expect(outlineIn(20, 20)).toBeCloseTo(0.5);
    let last = 1; for (let d = 17; d <= 23; d += 0.1) { const o = outlineIn(d, 20); expect(o).toBeLessThanOrEqual(last + 1e-9); expect(last - o).toBeLessThan(0.06); last = o; }
  });
  it("carries its moss and its outline in one glow the shader reads back (every glow a sleeping legend's, under -1.5)", () => {
    for (const moss of [0, 0.3, 0.7, 1]) for (const o of [0, 0.25, 0.5, 1]) {
      const g = legendGlow(moss, o), r = readLegendGlow(g);
      expect(g).toBeLessThan(-1.5);
      expect(r.moss).toBeCloseTo(Math.min(0.999, moss), 3);
      expect(Math.abs(r.outline - o)).toBeLessThanOrEqual(0.5 / OUTLINE_STEPS + 1e-9);
    }
    expect(legendGlow(0, 1)).toBe(-2); // (as before, full outline, no moss)
  });
});
