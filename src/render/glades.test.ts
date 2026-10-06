// The legends' clearings' light (render/glades.ts): what happens to the light as she goes in, by mode.
import { describe, expect, it } from "vitest";
import { clearingDim, clearingGlow, easeInside } from "./glades";

const T = { dark: 0.6, glowOff: 1 };
const settle = (inCircle: boolean, ground: boolean, from = 0) => { let v = from; for (let i = 0; i < 120; i++) v = easeInside(v, inCircle, ground, 1 / 60, 1); return v; };

describe("legend clearings' light", () => {
  it("dims the forest and takes her glow inside a circle on the ground", () => {
    const v = settle(true, true);
    expect(v).toBe(1);
    expect(1 - clearingDim(T, v)).toBeGreaterThan(0);
    expect(clearingGlow(T, v)).toBe(0);
  });
  it("leaves the light as it is inside a circle over the treetops (Ed: ground mode only)", () => {
    const v = settle(true, false);
    expect(v).toBe(0);
    expect(1 - clearingDim(T, v)).toBe(0);
    expect(clearingGlow(T, v)).toBe(1);
  });
  it("eases both ways rather than snapping", () => {
    const half = easeInside(0, true, true, 0.5, 1);
    expect(half).toBeCloseTo(0.5);
    const rising = easeInside(1, true, false, 0.25, 1);
    expect(rising).toBeCloseTo(0.75);
    expect(clearingDim(T, 0.5)).toBeGreaterThan(clearingDim(T, 1));
    expect(clearingDim(T, 0.5)).toBeLessThan(1);
  });
  it("leaves the light alone outside every circle", () => {
    expect(settle(false, true, 1)).toBe(0);
  });
});
