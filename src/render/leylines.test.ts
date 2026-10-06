// The wave's pulse on the ley line (render/leylines.ts; Ed, 2026-10-06): it runs by the party's own clock and by arc length.
import { describe, expect, it } from "vitest";
import { arcPoint, leyPulse } from "./leylines";

describe("the ley line's wave pulse", () => {
  it("goes from 0 at the last wave to 1 as the next arrives", () => {
    expect(leyPulse(60, 60, false)).toBe(0);
    expect(leyPulse(15, 60, false)).toBeCloseTo(0.75);
    expect(leyPulse(0, 60, false)).toBe(1);
    expect(leyPulse(-3, 60, false)).toBe(1); // (the wave due: it's arrived)
    expect(leyPulse(90, 60, false)).toBe(0); // (still booting: not set off yet)
  });
  it("is off with no wave clock", () => {
    expect(leyPulse(30, 60, true)).toBeNull();
    expect(leyPulse(30, 1e9, false)).toBeNull();
    expect(leyPulse(30, 0, false)).toBeNull();
  });
  it("lies on the route by arc length, so it follows a curve, and reaches the far stone at 1", () => {
    const route: [number, number][] = [[0, 0], [30, 0], [30, 10]]; // 40 m: 30 east, then 10 north
    expect(arcPoint(route, 0)).toEqual([0, 0]);
    expect(arcPoint(route, 0.5)).toEqual([20, 0]);
    const p = arcPoint(route, 0.875); // 35 m along: 5 m up the second leg
    expect(p[0]).toBeCloseTo(30); expect(p[1]).toBeCloseTo(5);
    expect(arcPoint(route, leyPulse(0, 60, false)!)).toEqual([30, 10]);
  });
});
