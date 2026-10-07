import { describe, expect, it } from "vitest";
import { hatFlight } from "./hatFlight";

describe("her knocked-off hat floats down (Ed, 2026-10-07)", () => {
  it("starts at her head and lies beside where she went down at the end", () => {
    expect(hatFlight(10, 20, 0, 3, 0.9)).toMatchObject({ x: 10, y: 3, z: 20 });
    const end = hatFlight(10, 20, 1, 3, 0.9);
    expect(end.x).toBeCloseTo(10.9); expect(end.y).toBeCloseTo(0); expect(end.flip).toBe(false);
  });
  it("only ever comes down, sways side to side on the way, and rocks as it swings", () => {
    let y = Infinity, left = 0, right = 0, flips = new Set<boolean>();
    for (let i = 0; i <= 100; i++) {
      const k = i / 100, p = hatFlight(0, 0, k, 3, 0.9), drift = 0.9 * k;
      expect(p.y).toBeLessThanOrEqual(y + 1e-9); y = p.y;
      if (p.x < drift - 0.2) left++; if (p.x > drift + 0.2) right++;
      flips.add(p.flip);
    }
    expect(left).toBeGreaterThan(0); expect(right).toBeGreaterThan(0); expect(flips.size).toBe(2);
  });
});
