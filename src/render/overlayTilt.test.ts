// The overlays' tilt-shift (render/overlayTilt.ts) follows the post pass's own (render/post.ts TILT).
import { describe, expect, it } from "vitest";
import { stepTiltShare, tiltRadius, tiltShareShown } from "./overlayTilt";

const T = { on: true, strength: 3, band: 0.4, centre: 0.55, treetop: { strength: 6, band: 0.28 } };

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
  it("is off in the treehouse, easing out as she comes in and back as she leaves (Ed, 2026-10-26: \"No tilt shift while you're in the treehouse\")", () => {
    expect(tiltRadius(T, 0, 0, 0)).toBe(0);
    expect(tiltRadius(T, 0, 0, 0.5)).toBeCloseTo(1.5);
    expect(tiltRadius(T, 0, 0, 1)).toBeCloseTo(3);
    // Stepped a frame at a time on her clock: gone in the ease's 0.6 s, back in the same, never past 0 or 1.
    let k = 1; const seen: number[] = [];
    for (let i = 0; i < 40; i++) { k = stepTiltShare(k, 0, 1 / 60, 0.6); seen.push(tiltShareShown(k)); }
    expect(seen[0]).toBeGreaterThan(0.99);
    expect(seen[17]).toBeGreaterThan(0.4); expect(seen[17]).toBeLessThan(0.6);
    expect(k).toBe(0);
    expect(seen.every((v, i) => i === 0 || v <= seen[i - 1])).toBe(true);
    for (let i = 0; i < 40; i++) k = stepTiltShare(k, 1, 1 / 60, 0.6);
    expect(k).toBe(1);
    expect(stepTiltShare(1, 0, 1e9, 0.6)).toBe(0); // (a first frame on the house: straight to none)
  });
});
