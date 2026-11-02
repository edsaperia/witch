import { describe, expect, it } from "vitest";
import { advanceMotion, trajectoryAt } from "./locomotion";
describe("shared numerical locomotion", () => {
  it("uses one acceleration limit for steering and attack preparation", () => {
    const body = { x: 0, z: 0, vx: 0, vz: 0 };
    advanceMotion(body, { vx: 10, vz: 0, acceleration: 4 }, 0.5, 0.5);
    expect(body).toEqual({ x: 1, z: 0, vx: 2, vz: 0 });
    advanceMotion(body, { vx: -10, vz: 0, acceleration: 4 }, 1, 0.5);
    expect(body.vx).toBe(0); expect(body.x).toBe(1);
  });
  it("interpolates curved routes continuously and keeps their exact endpoints", () => {
    const route = { fx: 0, fz: 0, tx: 10, tz: 0, at: 0, lands: 2 };
    const line = trajectoryAt(route, 1), bow = trajectoryAt({ ...route, bend: 4 }, 1);
    expect(line.z).toBe(0); expect(bow.z).toBe(4);
    expect(trajectoryAt({ ...route, bend: 2 }, 1).z).toBe((line.z + bow.z) / 2);
    expect(trajectoryAt({ ...route, bend: 4 }, 0).x).toBe(0);
    expect(trajectoryAt({ ...route, bend: 4 }, 2)).toMatchObject({ x: 10, z: 0, progress: 1 });
  });
  it("a timed route is independent of sampling frequency and can carry momentum onward", () => {
    const route = { fx: 0, fz: 0, tx: 10, tz: 4, at: 0, lands: 1 };
    const a = { x: 0, z: 0, vx: 0, vz: 0 }, b = { ...a };
    for (let i = 1; i <= 60; i++) advanceMotion(a, { route, carry: 1 }, i / 60, 1 / 60);
    advanceMotion(b, { route, carry: 1 }, 1, 1);
    expect(a).toEqual(b); expect(a.vx).toBe(10); expect(a.vz).toBe(4);
  });
});
