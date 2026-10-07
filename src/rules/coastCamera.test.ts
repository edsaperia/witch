// The camera by the sea (Ed, 2026-10-06: "The transition to a lower angle and higher bend should be gradual as you approach the
// beach, over 200m until you're at stargazing at the edge of the sea"; lying down, the sky well over half the screen).
import { describe, expect, it } from "vitest";
import { cameraPose, coastView, newCamera, stepCamera, type CameraState } from "./camera";
import { TUNING } from "./tuning";

const T = TUNING, BC = T.beach!.camera!, STEP = 1 / 60;
const settle = (c: CameraState, near: number, gazing: boolean, lift = 0, secs = 8) => {
  for (let k = 0; k < secs / STEP; k++) c = stepCamera(c, 0, { x: 0, y: 0, z: 0 }, { x: 0, z: 0 }, lift, STEP, T, false, null, { near, gazing });
  return c;
};

describe("the camera by the sea", () => {
  const start: CameraState = { ...newCamera(T, 0, 0, 0), intro: 0 };
  const normal = cameraPose(start, 0, T).angle;

  it("lowers steadily from the normal view 200 m out to beach.camera.angle at the water's edge", () => {
    let last = Infinity;
    for (const near of [0, 0.25, 0.5, 0.75, 1]) {
      const a = cameraPose(settle(start, near, false), 0, T).angle;
      expect(a).toBeLessThanOrEqual(last + 1e-9);
      last = a;
    }
    expect(cameraPose(settle(start, 0, false), 0, T).angle).toBeCloseTo(normal, 3);
    expect(cameraPose(settle(start, 1, false), 0, T).angle).toBeCloseTo(BC.angle, 1);
  });

  it("lying down to stargaze, lower and closer still; getting up and walking off, back the same way", () => {
    const lying = settle(settle(start, 1, false), 1, true), p = cameraPose(lying, 0, T);
    expect(p.angle).toBeCloseTo(BC.gazeAngle, 1);
    expect(p.distance).toBeCloseTo(BC.gazeDistance, 1);
    expect(coastView(lying).gaze).toBeCloseTo(1, 3);
    const away = settle(settle(lying, 1, false), 0, false, 0, 12);
    expect(cameraPose(away, 0, T).angle).toBeCloseTo(normal, 2);
    expect(coastView(away)).toEqual({ coast: 0, gaze: 0 });
  });

  it("eases, never jumps: a step's change in angle stays small", () => {
    let c = start, prev = cameraPose(c, 0, T).angle, worst = 0;
    for (let k = 0; k < 6 / STEP; k++) { c = stepCamera(c, 0, { x: 0, y: 0, z: 0 }, { x: 0, z: 0 }, 0, STEP, T, false, null, { near: 1, gazing: k > 120 }); const a = cameraPose(c, 0, T).angle; worst = Math.max(worst, Math.abs(a - prev)); prev = a; }
    expect(worst).toBeLessThan(0.5);
  });

  it("over the treetops the coast leaves the camera alone", () => {
    const up = settle({ ...start, lift: 1 }, 1, false, 1), plain = settle({ ...start, lift: 1 }, 0, false, 1);
    expect(cameraPose(up, 1, T).angle).toBeCloseTo(cameraPose(plain, 1, T).angle, 6);
    expect(coastView(up).coast).toBe(0);
  });
});
