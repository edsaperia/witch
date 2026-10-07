import { describe, expect, it } from "vitest";
import { FIREWORKS, fireworkShells, showEnds } from "./fireworks";

describe("fireworkShells (the celebration's schedule)", () => {
  it("is the same for the same event, and different elsewhere", () => {
    expect(fireworkShells(120, -40, 300)).toEqual(fireworkShells(120, -40, 300));
    expect(fireworkShells(120, -40, 300)).not.toEqual(fireworkShells(380, 95, 300));
  });
  it("keeps to its knobs: the count, the time, the heights, the drift, the finale last", () => {
    for (const [x, z] of [[0, 0], [120, -40], [-517, 233], [999, 999]]) {
      const S = fireworkShells(x, z, 50), F = FIREWORKS;
      expect(S.length).toBeGreaterThanOrEqual(F.shells[0]); expect(S.length).toBeLessThanOrEqual(F.shells[1]);
      for (const s of S) {
        expect(s.launch).toBeGreaterThanOrEqual(50); expect(s.launch).toBeLessThanOrEqual(50 + F.over);
        expect(s.burst - s.launch).toBeGreaterThanOrEqual(F.rise[0]); expect(s.burst - s.launch).toBeLessThanOrEqual(F.rise[1]);
        expect(s.height).toBeGreaterThanOrEqual(F.height[0]); expect(s.height).toBeLessThanOrEqual(F.height[1] + 6);
        expect(Math.hypot(s.x - x, s.z - z)).toBeLessThanOrEqual(F.drift + 1e-9);
        expect(Number.isFinite(s.radius) && s.radius > 0).toBe(true);
      }
      const last = S.slice(-F.finale);
      for (const s of last) expect(s.launch).toBeCloseTo(50 + F.over, 9);
      expect(last[last.length - 1].kind).toBe("crackle");
      expect(showEnds(S)).toBeGreaterThan(Math.max(...S.map(s => s.burst)));
    }
  });
  it("is off with fireworks.on false", () => {
    expect(fireworkShells(0, 0, 0, { fireworks: { ...FIREWORKS, on: false } } as never)).toEqual([]);
  });
});
