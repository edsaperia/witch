import { describe, expect, it } from "vitest";
import { crowdTime, throughput, type Buff } from "./throughput";

// 💌 throughput under legend buffs (Ed, 2026-10-05): the per-animal hit gap keeps any one animal from
// filling faster, however many letters she fires; crowds are where stacked buffs tell.
describe("💌 throughput (rules/throughput.ts, tools/balance/buffs.mjs)", () => {
  const worst: Buff[] = ["flutter", "fan", "echo", "howl", "quickFire", "pierce", "spawn"];

  it("with a per-animal gap (none in the game since 2026-10-06), fills one adult no faster than one letter a gap", () => {
    const gap = { gap: 0.5 };
    expect(crowdTime([12], throughput([], undefined, gap))).toBeCloseTo(6, 5); // 12 hits at 2 a second
    expect(crowdTime([12], throughput(worst, undefined, gap))).toBeGreaterThanOrEqual(5.5); // (12 − 1) × 0.5 s
    expect(crowdTime([12], throughput([], undefined, { gap: 1 }))).toBeGreaterThanOrEqual(11);
  });
  it("with no gap (the game since 2026-10-06), stacked buffs fill one animal faster too: her firing rate is the limit", () => {
    expect(crowdTime([12], throughput(worst))).toBeLessThan(crowdTime([12], throughput([])) / 2);
  });

  it("lets stacked buffs fill crowds faster, and a cap on animals at once holds it near 2×", () => {
    const crowd = [12, 12, 12, 12, 6, 6, 6, 3, 3, 3], base = crowdTime(crowd, throughput([]));
    expect(base / crowdTime(crowd, throughput(worst))).toBeGreaterThan(4);
    expect(base / crowdTime(crowd, throughput(worst, undefined, { maxTargets: 2, gap: 0.5 }))).toBeLessThanOrEqual(2); // (with the old gap)
    expect(crowdTime(crowd, throughput([]), 0.5)).toBeGreaterThan(base); // worse aim, slower
  });
});
