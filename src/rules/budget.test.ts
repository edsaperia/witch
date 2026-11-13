import { describe, expect, it } from "vitest";
import { newBudget, RADIUS_EASE, stepBudget, type SceneryBudget } from "./budget";
import { TUNING } from "./tuning";

const run = (b: SceneryBudget, fps: number, secs: number, t = TUNING, eased = true) => {
  for (let i = 0; i < secs * fps; i++) b = stepBudget(b, 1 / fps, t, eased);
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
  // Ed, 2026-11-13: "scenery should fade rather than pop" (render/edgeFade.ts)
  it("starts each move from rest: a slow moment barely moves it, a slow machine still gets the whole speed", () => {
    const S = t.scenery, b = newBudget(t);
    const moment = far - run(b, 30, S.sustain + 1.5).radius, before = far - run(b, 30, S.sustain + 1.5, t, false).radius;
    expect(before).toBeGreaterThan(S.shrink); // (as it was, ?edgefade=old: some 50 m in that moment)
    expect(moment).toBeGreaterThan(0);
    expect(moment).toBeLessThan(before / 4);
    // no step of it is ever more than the old one, and it never turns back while frames stay slow
    let c = b, last = far;
    for (let i = 0; i < 30 * (S.sustain + RADIUS_EASE + 2); i++) { c = stepBudget(c, 1 / 30, t); expect(last - c.radius).toBeGreaterThanOrEqual(0); expect(last - c.radius).toBeLessThanOrEqual(S.shrink / 30 + 1e-9); last = c.radius; }
    // once up to speed it comes in as fast as before (the frame rate's protection kept)
    const d = run(c, 30, 1);
    expect(c.radius - d.radius).toBeCloseTo(Math.min(S.shrink, c.radius - S.minRadius), 0);
    // and out again from rest too
    const low = run(newBudget(t), 20, 30), up = run(low, 60, S.sustain + 1.5), upBefore = run(low, 60, S.sustain + 1.5, t, false);
    expect(up.radius - low.radius).toBeGreaterThan(0);
    expect(up.radius - low.radius).toBeLessThan((upBefore.radius - low.radius) / 4);
  });
});
