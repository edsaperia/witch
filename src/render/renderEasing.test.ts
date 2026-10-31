import { expect, it } from "vitest";
import { renderDelta, easeAt60, easeCameraLift, easeCanopyReach } from "./renderEasing";

it("holds repeated timestamps, starts with one legacy frame, and re-bases a rewind without advancing", () => {
  expect(renderDelta(NaN, 0)).toBe(1 / 60);
  expect(renderDelta(4, 4)).toBe(0); expect(renderDelta(4, 2)).toBe(0);
  expect(renderDelta(2, 2.01)).toBeCloseTo(0.01);
  expect(renderDelta(2, NaN)).toBe(0);
  for (const step of [easeCameraLift, easeCanopyReach]) expect(step(12, 0, renderDelta(4, 4))).toBe(12);
});
it("matches the legacy camera rise/fall and main canopy coefficients at 60fps", () => {
  expect(easeCameraLift(0, 10, 1 / 60)).toBeCloseTo(3.5, 12);
  expect(easeCameraLift(10, 0, 1 / 60)).toBeCloseTo(9.4, 12);
  expect(easeCanopyReach(0, 100, 1 / 60)).toBeCloseTo(8, 12);
  expect(easeCanopyReach(100, 0, 1 / 60)).toBeCloseTo(92, 12);
});
it("agrees for one versus four time steps, including canopy's terminal snap", () => {
  for (const step of [easeCameraLift, easeCanopyReach]) for (const [from, target, dt] of [[0, 100, .1], [100, 0, .2], [2, 0, .25], [0, 2, .25]]) {
    let split = from; for (let i = 0; i < 4; i++) split = step(split, target, dt / 4);
    expect(split).toBeCloseTo(step(from, target, dt), 10);
  }
  expect(easeCanopyReach(2, 0, .25)).toBe(0);
});
it("uses equal elapsed personal time at 60/144Hz and pauses regardless of wall time", () => {
  const run = (fps: number) => { let x = 0; for (let i = 0; i < fps; i++) x = easeAt60(x, 20, .06, 1 / fps); return x; };
  expect(run(144)).toBeCloseTo(run(60), 10);
  // In a slowed world, her interpolated clock still advances at her own rate; wall time is not an input.
  expect(easeCameraLift(0, 10, renderDelta(1, 1.02))).toBeGreaterThan(easeCameraLift(0, 10, .002));
  expect(easeCameraLift(3, 10, renderDelta(1.02, 1.02))).toBe(3);
});
