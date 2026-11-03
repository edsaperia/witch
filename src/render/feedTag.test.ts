import { describe, expect, it } from "vitest";
import { holdShare } from "./feedTag";

// The feed prompt's "put down" line (Ed, 2026-11-03: a tap feeds, holding puts the sigil down): lit as the hold fills.
describe("the feed prompt", () => {
  it("lights its \"put down\" line as the hold fills, from the press, to full at berries.feed.hold", () => {
    expect(holdShare(undefined, 5, 0.3), "no press waiting").toBe(0);
    expect(holdShare(5, 5, 0.3)).toBe(0);
    expect(holdShare(5, 5.15, 0.3)).toBeCloseTo(0.5, 6);
    expect(holdShare(5, 6, 0.3)).toBe(1);
    expect(holdShare(5, 5, 0), "no hold: at once").toBe(1);
  });
});
