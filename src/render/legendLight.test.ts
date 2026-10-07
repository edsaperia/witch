import { describe, expect, it } from "vitest";
import { legendFloor } from "./legendLight";

describe("dark-coated legends lit at night (Ed, 2026-10-07): a measured rule", () => {
  it("leaves a lighter legend's floor as it is", () => {
    expect(legendFloor(0.65, 0.6, 0.26, 1.6)).toBe(0.65); // (0.65 x 0.6 = 0.39, over 0.26)
  });
  it("raises a dark coat's floor until its floored look reaches dark, at most liftMax", () => {
    expect(0.32 * legendFloor(0.65, 0.32, 0.26, 1.6)).toBeCloseTo(0.26); // (a bear-dark coat)
    expect(legendFloor(0.65, 0.1, 0.26, 1.6)).toBe(1.6); // (very dark: capped)
  });
  it("does nothing with dark off", () => {
    expect(legendFloor(0.65, 0.2)).toBe(0.65);
  });
});
