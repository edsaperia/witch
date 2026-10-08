// Slowed time's look (render/slowtime.ts): keyed to the rules' time scale, eased with it.
import { describe, expect, it } from "vitest";
import { slowAmount } from "./slowtime";

describe("slowed time in a legend's circle (Ed, 2026-10-06)", () => {
  it("looks as ever at full speed, fullest at the slowest, and eases between", () => {
    expect(slowAmount(1)).toBe(0);
    expect(slowAmount(0.1)).toBe(1);
    expect(slowAmount(0.55)).toBeCloseTo(0.5);
    expect(slowAmount(0)).toBe(1);
    expect(slowAmount(NaN)).toBe(0);
  });
  it("is fullest at whatever the tuning slows to", () => {
    expect(slowAmount(0.25, 0.25)).toBe(1);
    expect(slowAmount(0.625, 0.25)).toBeCloseTo(0.5);
  });
});
