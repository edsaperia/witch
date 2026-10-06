// The overlays' tilt-shift (render/overlayTilt.ts) follows the post pass's own (render/post.ts TILT).
import { describe, expect, it } from "vitest";
import { tiltRadius } from "./overlayTilt";

const T = { on: true, where: "before" as const, strength: 3, band: 0.4, centre: 0.55, treetop: { strength: 6, band: 0.28 } };

describe("the overlays blurred as the world (Ed's playtest, round 14)", () => {
  it("is sharp in the band, blurs to the full strength at the top, and some way at the bottom (the band sits low)", () => {
    expect(tiltRadius(T, 0, 0.55)).toBe(0);
    expect(tiltRadius(T, 0, 0.55 + 0.19)).toBe(0);
    expect(tiltRadius(T, 0, 0)).toBeCloseTo(3);
    expect(tiltRadius(T, 0, 1)).toBeGreaterThan(1.5);
    expect(tiltRadius(T, 0, 1)).toBeLessThan(3);
    expect(tiltRadius(T, 0, 0.2)).toBeGreaterThan(0);
    expect(tiltRadius(T, 0, 0.2)).toBeLessThan(3);
  });
  it("blends to the treetops' by her lift, and is off with the tilt-shift", () => {
    expect(tiltRadius(T, 1, 0)).toBeCloseTo(6);
    expect(tiltRadius({ ...T, on: false }, 0, 0)).toBe(0);
    expect(tiltRadius({ ...T, strength: 0 }, 0, 0)).toBe(0);
  });
});
