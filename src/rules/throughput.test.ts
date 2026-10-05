import { describe, expect, it } from "vitest";
import { crowdTime, throughput, type Buff } from "./throughput";

// 💌 throughput under legend buffs (Ed, 2026-10-05): the per-animal hit gap keeps any one animal from
// filling faster, however many letters she fires; crowds are where stacked buffs tell.
describe("💌 throughput (rules/throughput.ts, tools/balance/buffs.mjs)", () => {
  const worst: Buff[] = ["flutter", "fan", "echo", "howl", "quickFire", "pierce", "spawn"];

  it("fills one adult no faster than one letter a gap, buffs or none", () => {
    expect(crowdTime([12], throughput([]))).toBeCloseTo(6, 5); // 12 hits at 2 a second
    expect(crowdTime([12], throughput(worst))).toBeGreaterThanOrEqual(5.5); // (12 − 1) × 0.5 s
    expect(crowdTime([12], throughput([], undefined, { gap: 1 }))).toBeGreaterThanOrEqual(11);
  });

  it("lets stacked buffs fill crowds faster, and a cap on animals at once holds it near 2×", () => {
    const crowd = [12, 12, 12, 12, 6, 6, 6, 3, 3, 3], base = crowdTime(crowd, throughput([]));
    expect(base / crowdTime(crowd, throughput(worst))).toBeGreaterThan(4);
    expect(base / crowdTime(crowd, throughput(worst, undefined, { maxTargets: 2 }))).toBeLessThanOrEqual(2);
    expect(crowdTime(crowd, throughput([]), 0.5)).toBeGreaterThan(base); // worse aim, slower
  });
});
