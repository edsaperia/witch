// Slowed time's look (render/slowtime.ts): keyed to the rules' time scale, eased with it; the world's clock runs at its pace.
import { describe, expect, it } from "vitest";
import { slowAmount, SLOWEST, timeScaleOf, WorldClock } from "./slowtime";
import type { Game } from "../rules/game";

describe("slowed time in a legend's circle (Ed, 2026-10-06)", () => {
  it("looks as ever at full speed, fullest at the slowest, and eases between", () => {
    expect(slowAmount(1)).toBe(0);
    expect(slowAmount(SLOWEST)).toBe(1);
    expect(slowAmount(0.55)).toBeCloseTo(0.5);
    expect(slowAmount(0)).toBe(1);
  });
  it("reads the rules' time scale, 1 when they have none", () => {
    expect(timeScaleOf({} as Game)).toBe(1);
    expect(timeScaleOf({ timeScale: 0.1 } as unknown as Game)).toBeCloseTo(0.1);
    expect(timeScaleOf({ timeScale: NaN } as unknown as Game)).toBe(1);
  });
  it("runs the world's clock at the time scale: a tenth as fast at the slowest", () => {
    const c = new WorldClock();
    c.step(10, 1);
    for (let t = 10; t < 11; t += 1 / 60) c.step(t + 1 / 60, 1);
    const at = c.t;
    for (let t = 11; t < 12; t += 1 / 60) c.step(t + 1 / 60, 0.1);
    expect(at).toBeCloseTo(1, 1);
    expect(c.t - at).toBeCloseTo(0.1, 1);
  });
});
