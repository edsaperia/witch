import { describe, expect, it } from "vitest";
import { drew, holding, impactOf, IMPACT_DEFAULT, letterLanded, popScale, ringFilled } from "./impact";
import { comfort } from "./comfort";

describe("a 💌 landing, felt (Ed, 2026-10-29: render/impact.ts)", () => {
  it("flashes white an instant and squashes, springing back; with reduce-flashing on, no flash and a gentler squash", () => {
    const clock = { time: 0 };
    const out = { flash: 0, sx: 1, sy: 1 };
    letterLanded(clock, 7);
    clock.time = 0.01;
    impactOf(clock, 7, IMPACT_DEFAULT, out);
    expect(out.flash).toBeGreaterThan(0.8); expect(out.sy).toBeLessThan(1); expect(out.sx).toBeGreaterThan(1);
    const sq = 1 - out.sy;
    clock.time = IMPACT_DEFAULT.flash + 0.005;
    expect(impactOf(clock, 7, IMPACT_DEFAULT, out).flash).toBe(0); // (an instant)
    clock.time = IMPACT_DEFAULT.squashSecs + 0.005;
    impactOf(clock, 7, IMPACT_DEFAULT, out); expect([out.flash, out.sx, out.sy]).toEqual([0, 1, 1]); // (back to its shape)
    comfort.reduceFlashing = true;
    clock.time = 1; letterLanded(clock, 7); clock.time = 1.01;
    impactOf(clock, 7, IMPACT_DEFAULT, out);
    expect(out.flash).toBe(0); expect(1 - out.sy).toBeLessThan(sq);
    comfort.reduceFlashing = false;
    expect(impactOf(clock, 99, IMPACT_DEFAULT, out).flash).toBe(0); // (one never hit)
  });
  it("pops a slot in small, overshooting and settling at its size", () => {
    const S = Array.from({ length: 31 }, (_, i) => popScale((i / 30) * IMPACT_DEFAULT.popSecs, IMPACT_DEFAULT));
    expect(S[0]).toBeLessThan(1);
    expect(Math.max(...S)).toBeGreaterThan(1.3);
    expect(popScale(IMPACT_DEFAULT.popSecs, IMPACT_DEFAULT)).toBe(1);
    expect(popScale(5, IMPACT_DEFAULT)).toBe(1);
  });
  it("holds the picture once the frame after the filling 💌 has been drawn, for the hitstop's seconds", () => {
    ringFilled(0.07);
    drew(1000); expect(holding(1001)).toBe(false); // (the next frame shows the flash first)
    drew(1016); expect(holding(1020)).toBe(true); expect(holding(1016 + 69)).toBe(true); expect(holding(1016 + 71)).toBe(false);
    ringFilled(0); drew(2000); drew(2016); expect(holding(2017)).toBe(false); // (off: none)
  });
});
