import { describe, expect, it } from "vitest";
import { wispChance } from "./wisps";
import tuning from "../../config/tuning.json";
import type { WispTuning } from "../rules/tuning";

describe("will-o'-the-wisps (render/wisps.ts)", () => {
  const T = (tuning as unknown as { wisps: WispTuning }).wisps;
  it("none near the party, rarer the nearer it is, the full chance far from it", () => {
    expect(wispChance(T, 0)).toBe(0);
    expect(wispChance(T, T.partyNear)).toBe(0);
    expect(wispChance(T, T.partyFar)).toBeCloseTo(T.chance);
    expect(wispChance(T, Infinity)).toBeCloseTo(T.chance); // (no party yet)
    let prev = 0;
    for (let d = T.partyNear; d <= T.partyFar; d += 5) { const c = wispChance(T, d); expect(c).toBeGreaterThanOrEqual(prev); prev = c; }
  });
  it("a few, faint and slow: a sane tuning", () => {
    expect(T.chance).toBeGreaterThan(0); expect(T.chance).toBeLessThanOrEqual(0.6);
    expect(T.partyFar).toBeGreaterThan(T.partyNear);
    expect(T.period).toBeGreaterThanOrEqual(10); // (slow)
    expect(T.height[0]).toBeLessThan(T.height[1]);
  });
});
