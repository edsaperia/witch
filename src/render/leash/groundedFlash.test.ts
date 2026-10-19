// A pulled-down take-off's flash (Ed's playtest, v3893): the counted leashes drawn whole for a moment, twice, then dotted again.
import { describe, expect, it } from "vitest";
import { GROUNDED_FLASH, groundedSolid } from "./stack";

describe("grounded leash flash", () => {
  it("flashes solid twice from the event, with a dotted gap between, and is dotted again after", () => {
    expect(GROUNDED_FLASH.length).toBe(2);
    expect(groundedSolid(0)).toBe(true);
    expect(groundedSolid(0.1)).toBe(true);
    expect(groundedSolid((GROUNDED_FLASH[0][1] + GROUNDED_FLASH[1][0]) / 2)).toBe(false);
    expect(groundedSolid(0.45)).toBe(true);
    expect(groundedSolid(GROUNDED_FLASH[1][1])).toBe(false);
    expect(groundedSolid(-0.01)).toBe(false);
    expect(groundedSolid(5)).toBe(false);
  });
  it("is over by the time she's back on the ground and settled (render/view/witch.ts groundedHop: down by 0.42 s, still by 0.6 s)", () => {
    expect(GROUNDED_FLASH[1][1]).toBeLessThanOrEqual(0.7);
  });
});
