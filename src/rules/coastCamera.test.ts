// The camera by the sea (Ed, 2026-10-06: "The transition to a lower angle and higher bend should be gradual as you approach the
// beach, over 200m until you're at stargazing at the edge of the sea"; lying down, the sky well over half the screen).
import { describe, expect, it } from "vitest";
import { cameraPose, coastView, gazeAt, newCamera, stepCamera, type CameraState } from "./camera";
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
    expect(p.angle).toBeCloseTo(BC.bearings.angle[0], 1);
    expect(p.distance).toBeCloseTo(BC.bearings.distance[0], 1);
    expect(coastView(lying).gaze).toBeCloseTo(1, 3);
    const away = settle(settle(lying, 1, false), 0, false, 0, 12);
    expect(cameraPose(away, 0, T).angle).toBeCloseTo(normal, 2);
    expect(coastView(away)).toEqual({ coast: 0, gaze: 0 });
  });

  it("keeps zero-time poses continuous and coast/gaze transitions bounded toward their targets", () => {
    const step = (c: CameraState, dt: number, near: number, gazing: boolean) => stepCamera(c, 0, { x: 0, y: 0, z: 0 }, { x: 0, z: 0 }, 0, dt, T, false, null, { near, gazing });
    expect(cameraPose(step(start, 0, 1, true), 0, T)).toEqual(cameraPose(start, 0, T));
    let previous = { coast: 0, gaze: 0 };
    for (const dt of [STEP / 2, STEP, STEP * 2]) {
      const c = step(start, dt, 1, true), state = coastView(c), pose = cameraPose(c, 0, T);
      for (const key of ["coast", "gaze"] as const) { expect(state[key]).toBeGreaterThan(previous[key]); expect(state[key]).toBeLessThan(1); }
      for (const key of ["angle", "distance", "x", "y", "z", "tx", "ty", "tz"] as const) expect(Number.isFinite(pose[key])).toBe(true);
      previous = state;
    }
    const mid = { ...start, coast: 0.4, gaze: 0.7 }, held = step(mid, 0, 0, false), leaving = step(mid, STEP, 0, false);
    expect(cameraPose(held, 0, T)).toEqual(cameraPose(mid, 0, T));
    expect(leaving.coast).toBeGreaterThan(0); expect(leaving.coast!).toBeLessThan(mid.coast);
    expect(leaving.gaze).toBeGreaterThan(0); expect(leaving.gaze!).toBeLessThan(mid.gaze);
    // U7 reports the original six-second maximum angle-change observation.
  });

  it("matches every authored coastal bearing, repeats around the circle and settles at the opposite bearing", () => {
    const B = BC.bearings, n = B.angle.length;
    expect(n).toBe(12);
    expect(B.distance.length).toBe(n); expect(B.look.length).toBe(n);
    for (let i = 0; i < n; i++) {
      const g = gazeAt(BC, (i / n) * 2 * Math.PI);
      expect(g.angle).toBeCloseTo(B.angle[i], 6); expect(g.distance).toBeCloseTo(B.distance[i], 6); expect(g.look).toBeCloseTo(B.look[i], 6);
    }
    // Direct periodic identity includes the north wrap; U7 reports the original720-sample comfort score.
    for (const bearing of [-Math.PI * 2, -0.01, 0, Math.PI / 12, Math.PI, Math.PI * 2 - 0.01]) {
      const g = gazeAt(BC, bearing), wrapped = gazeAt(BC, bearing + Math.PI * 2);
      for (const key of ["angle", "distance", "look", "side", "bend"] as const) { expect(Number.isFinite(g[key])).toBe(true); expect(g[key]).toBeCloseTo(wrapped[key], 9); }
    }
    const lying = settle(settle({ ...start, bearing: Math.PI }, 1, false), 1, true);
    expect(cameraPose(lying, 0, T).distance).toBeCloseTo(B.distance[6], 1);
  });

  it("over the treetops the coast leaves the camera alone", () => {
    const up = settle({ ...start, lift: 1 }, 1, false, 1), plain = settle({ ...start, lift: 1 }, 0, false, 1);
    expect(cameraPose(up, 1, T).angle).toBeCloseTo(cameraPose(plain, 1, T).angle, 6);
    expect(coastView(up).coast).toBe(0);
  });
});
