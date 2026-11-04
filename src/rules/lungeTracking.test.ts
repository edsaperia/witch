import { describe, expect, it } from "vitest";
import { turnHeading } from "./momentum";
import { SPACING, waitingProfile } from "./combatSpacing";

describe("tunable lunge heading", () => {
  it("provides finite nonnegative species tuning with a live zero override", () => {
    for (const species of Object.keys(SPACING.motion.species)) {
      const turn = waitingProfile({ species }).strikeTurn;
      expect(Number.isFinite(turn)).toBe(true);
      expect(turn).toBeGreaterThanOrEqual(0);
    }
    const data = { ...SPACING, motion: { ...SPACING.motion, default: { ...SPACING.motion.default, strikeTurn: 0 } } };
    expect(waitingProfile({ species: "wolf" }, data).strikeTurn).toBe(0);
  });
  it("allows a straight commitment and bounds tracking through the shortest angle", () => {
    expect(turnHeading(1, 0, 0, 1, 0, 1)).toEqual([1, 0]);
    const [x, z] = turnHeading(1, 0, 0, 1, 30, 0.5);
    expect(Math.atan2(z, x)).toBeCloseTo(Math.PI / 12);
    expect(Math.hypot(x, z)).toBeCloseTo(1);
    const start = 179 * Math.PI / 180, target = -179 * Math.PI / 180;
    const [sx, sz] = turnHeading(Math.cos(start), Math.sin(start), Math.cos(target), Math.sin(target), 10, 1);
    expect(Math.atan2(sz, sx)).toBeCloseTo(target);
  });
  it("does not overshoot or turn toward a coincident target", () => {
    expect(turnHeading(1, 0, 0, 0, 90, 1)).toEqual([1, 0]);
    const [x, z] = turnHeading(1, 0, 1, 1, 360, 1);
    expect(x).toBeCloseTo(Math.SQRT1_2);
    expect(z).toBeCloseTo(Math.SQRT1_2);
  });
});
