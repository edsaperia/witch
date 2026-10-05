// Screen shake when the witch is hit (Ed, 2026-10-05): more the fewer hits she has left, most on
// the knockdown, quick to die away, smooth, whole pixels, and none when it's turned off.
import { describe, expect, it } from "vitest";
import { TUNING } from "../rules/tuning";
import { hitTrauma, noise1, Shake } from "./shake";

const S = TUNING.camera.shake, HITS = TUNING.witchHealth.hits;

describe("screen shake when the witch is hit", () => {
  it("shakes more the fewer hits she has left, and most on the knockdown", () => {
    const by = [];
    for (let left = HITS - 1; left >= 0; left--) by.push(hitTrauma(left, HITS, S));
    for (let i = 1; i < by.length; i++) expect(by[i]).toBeGreaterThan(by[i - 1]);
    expect(by[by.length - 1]).toBe(S.knockdown);
  });

  it("starts on a hit, dies away in under half a second (the knockdown's within 0.6 s)", () => {
    const sh = new Shake(S), h = { hp: HITS, hurtAt: -Infinity };
    sh.watch(h, false, HITS, 10);
    expect(sh.offset(10).amount).toBe(0);
    h.hp = HITS - 1; h.hurtAt = 10.5;
    sh.watch(h, false, HITS, 10.5);
    expect(sh.offset(10.5).amount).toBeGreaterThan(0);
    expect(sh.offset(10.5 + 0.45).amount).toBe(0);
    h.hp = 0; h.hurtAt = 20;
    sh.watch(h, true, HITS, 20);
    expect(sh.offset(20).amount).toBeCloseTo(1, 6);
    expect(sh.offset(20.6).amount).toBe(0);
  });

  it("moves in whole pixels (snapped to the pixel size), smoothly, within its most", () => {
    const sh = new Shake(S);
    sh.add(1, 0);
    for (let t = 0; t < 0.4; t += 1 / 60) {
      const o = sh.offset(t, 3);
      expect(Math.abs(o.x) % 3).toBe(0);
      expect(Math.abs(o.x)).toBeLessThanOrEqual(S.maxOffsetPx + 1.5);
      expect(Math.abs(o.rot)).toBeLessThanOrEqual(S.maxRotDeg);
    }
    // The noise is smooth: a frame apart it moves a little, never jumps across its range.
    for (let x = 0; x < 20; x += 0.37) expect(Math.abs(noise1(x + S.speed / 60, 0) - noise1(x, 0))).toBeLessThan(1.2);
  });

  it("does nothing turned off (?shake=0)", () => {
    const sh = new Shake(S, false);
    sh.add(1, 0);
    expect(sh.offset(0.05)).toEqual({ x: 0, y: 0, rot: 0, amount: 0 });
  });
});
