// overBendAt (render/height.ts): the CPU twin of the shaders' overBend, for what's drawn over the picture (Ed, 2026-10-06:
// "I shouldn't see anything on the ground that's obscured when it goes past the bend").
import { afterEach, describe, expect, it } from "vitest";
import { HEIGHT_UNIFORMS, overBendAt } from "./height";

describe("nothing on the ground past the bend", () => {
  afterEach(() => { HEIGHT_UNIFORMS.uBend.value.set(0, 0, 0, 0); HEIGHT_UNIFORMS.uBendFwd.value.set(0, -1); });
  const cam = { x: 0, y: 135, z: 160 }; // (the treetop camera: 160 m behind its focus, 135 m up)
  it("shows everything without a bend", () => {
    expect(overBendAt(0, 0, -5000, cam)).toBe(true);
  });
  it("shows the ground before the horizon and hides it past, ahead of the focus only", () => {
    HEIGHT_UNIFORMS.uBend.value.set(0.0015, 0, 0, 0); HEIGHT_UNIFORMS.uBendFwd.value.set(0, -1);
    expect(overBendAt(0, 0, -100, cam)).toBe(true); // (100 m ahead: this side of the horizon, about 190 m out)
    expect(overBendAt(0, 0, -400, cam)).toBe(false); // (400 m ahead: behind the earth's curve)
    expect(overBendAt(0, 0, 100, cam)).toBe(true); // (behind the focus: never bent)
    expect(overBendAt(30, 0, -400, cam)).toBe(false);
  });
  it("still shows what stands tall enough to rise over the horizon", () => {
    HEIGHT_UNIFORMS.uBend.value.set(0.0015, 0, 0, 0);
    expect(overBendAt(0, 0, -260, cam)).toBe(false);
    expect(overBendAt(0, 120, -260, cam)).toBe(true);
  });
});
