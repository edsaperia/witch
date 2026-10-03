import { describe, expect, it } from "vitest";
import { newBudget, stepBudget, type SceneryBudget } from "./budget";
import { TUNING } from "./tuning";

const run = (b: SceneryBudget, fps: number, secs: number, t = TUNING) => {
  for (let i = 0; i < secs * fps; i++) b = stepBudget(b, 1 / fps, t);
  return b;
};

describe("scenery budget", () => {
  const t = TUNING, far = t.haze.far;
  it("starts with the whole view", () => expect(newBudget(t).radius).toBe(far));
  it("holds at a good frame rate, never past the haze's far edge", () => expect(run(newBudget(t), 60, 10).radius).toBe(far));
  it("shrinks slowly while frames stay slow, not at the first slow frame", () => {
    const b = newBudget(t), brief = run(b, 30, t.scenery.sustain * 0.8);
    expect(brief.radius).toBe(far);
    const long = run(b, 30, t.scenery.sustain + 2);
    expect(long.radius).toBeLessThan(far);
    expect(far - long.radius).toBeLessThanOrEqual(t.scenery.shrink * 2.5);
  });
  it("never goes below its minimum", () => expect(run(newBudget(t), 20, 120).radius).toBe(t.scenery.minRadius));
  it("holds in the hysteresis band between slow and fast", () => {
    const mid = t.scenery.fps - t.scenery.hysteresis / 2, settled = run(run(newBudget(t), 20, 6), mid, 1);
    expect(settled.radius).toBeLessThan(t.haze.far);
    expect(run(settled, mid, 20).radius).toBe(settled.radius);
  });
  it("grows back with headroom", () => {
    const low = run(newBudget(t), 20, 6);
    expect(run(low, 60, 10).radius).toBeGreaterThan(low.radius);
  });
  it("ignores long frames (a hidden tab, a hitch) and stays put when not adaptive", () => {
    expect(stepBudget(newBudget(t), 2, t).radius).toBe(far);
    const fixed = { ...t, scenery: { ...t.scenery, adaptive: false } };
    expect(run(newBudget(fixed), 10, 30, fixed).radius).toBe(far);
  });
});
