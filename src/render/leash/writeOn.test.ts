// A placed sigil's write-on and its light's fade-in (Bravo's dark-circle diagnosis, 2026-10-12): stamped on her clock, run on her
// clock, never below 0. On the world's clock, after slowed time (the treehouse deck, a legend's circle) her clock is ahead, the fade
// went negative and the sigil's own light subtracted light: a black ellipse round it.
import { describe, expect, it } from "vitest";
import { writeOn } from "./glyphs";
import { TUNING } from "../../rules/tuning";

describe("a placed sigil's write-on", () => {
  it("never goes below 0 or above 1", () => {
    expect(writeOn(10, 30)).toBe(0); // (a stamp ahead of the clock it's read on: nothing, never negative)
    expect(writeOn(30, 30)).toBe(0);
    expect(writeOn(30.4, 30)).toBeCloseTo(0.5, 5);
    expect(writeOn(99, 30)).toBe(1);
  });
  it("its light, as the view works it out, is never negative with her clock ahead of the world's", () => {
    const S = TUNING.sigilSpill!, herTime = 120, worldTime = 100, at = herTime - 0.1; // (put down just now, on her clock)
    expect(S.strength * writeOn(herTime, at)).toBeGreaterThanOrEqual(0);
    expect(S.strength * writeOn(worldTime, at)).toBe(0); // (even read on the world's clock, clamped)
  });
});
