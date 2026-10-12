import { describe, expect, it } from "vitest";
import { coverOf, mistShare } from "./mistCanopy";
import type { TypeArt } from "./assets";

// A type's art as coverOf reads it: its big objects (a crown or none) and their weights, and the frames' sizes.
const art = (big: { top: number | null; w: number }[], frames: { w: number; h: number }[]) =>
  ({ layout: { big: big.map(b => ({ bot: 0, top: b.top })), bigWeight: big.map(b => b.w) }, atlas: { frames } } as unknown as TypeArt);

describe("the open areas' canopy cover (render/mistCanopy.ts)", () => {
  const frames = [{ w: 10, h: 10 }, { w: 60, h: 50 }], mpp = 0.1; // a crown 6 m x 5 m: about 16.5 m² of it hides the ground
  it("is none where the big objects carry no crowns (standing stones, logs)", () => {
    expect(coverOf(art([{ top: null, w: 1 }], frames), mpp, 30, 3600)).toBe(0);
  });
  it("grows with how many crowned trees stand there, and stops at whole", () => {
    const crowned = art([{ top: 1, w: 1 }], frames);
    const few = coverOf(crowned, mpp, 10, 3600), many = coverOf(crowned, mpp, 100, 3600);
    expect(few).toBeGreaterThan(0);
    expect(many).toBeGreaterThan(few);
    expect(coverOf(crowned, mpp, 10000, 3600)).toBe(1);
  });
  it("counts only the crowned share of a mix (a shrine's stones among a few trees)", () => {
    const all = coverOf(art([{ top: 1, w: 1 }], frames), mpp, 40, 3600), half = coverOf(art([{ top: 1, w: 1 }, { top: null, w: 1 }], frames), mpp, 40, 3600);
    expect(half).toBeCloseTo(all / 2, 6);
  });
  it("gives no mist at the threshold's cover and over, and all at half of it and under", () => {
    expect(mistShare(0.45, 0.45)).toBe(0);
    expect(mistShare(0.9, 0.45)).toBe(0);
    expect(mistShare(0.2, 0.45)).toBe(1);
    expect(mistShare(0.34, 0.45)).toBeGreaterThan(0);
    expect(mistShare(0.34, 0.45)).toBeLessThan(1);
  });
});
