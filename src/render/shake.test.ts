// Screen shake when the witch is hit (Ed, 2026-10-05): more the fewer hits she has left, most on
// the knockdown, quick to die away, smooth, whole pixels, and none when it's turned off.
import { describe, expect, it } from "vitest";
import { TUNING } from "../rules/tuning";
import { hitTrauma, noise1, Shake, SHAKE_MAX_SECS } from "./shake";

const S = TUNING.camera.shake, HITS = TUNING.witchHealth.hits, MAX = S.maxSecs ?? SHAKE_MAX_SECS;

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
  // Ed's playtest, 2026-10-29: "I replicated screen shake - it's from the witch being hit by an enemy creature, I guess the effect is
  // activated and then doesn't switch off properly." It ran on the world's clock, a tenth as fast in a sleeping legend's circle and on
  // the deck, while her hits are on hers: one hit there shook 2.5 s, a few in a row 5 s and more. Now on her clock, a bout capped.
  it("runs on her clock: a slowed world doesn't stretch it (a hit's over in half a second of hers)", () => {
    const sh = new Shake(S), h = { hp: HITS, hurtAt: -Infinity };
    let her = 100, last = 0;
    sh.watch(h, false, HITS, her);
    h.hp = HITS - 1; h.hurtAt = her; // (hit: her clock's moment, rules/game.ts hitWitch)
    for (let f = 0; f < 600; f++, her += 1 / 60) { sh.watch(h, false, HITS, her); if (sh.offset(her).amount > 0) last = her - 100; }
    expect(last).toBeLessThan(0.5);
  });

  it("a bout of hits back to back shakes for maxSecs at most; the knockdown a bout of its own, also short", () => {
    const sh = new Shake(S), h = { hp: 1e6, hurtAt: -Infinity };
    let shaking = 0, longest = 0;
    for (let f = 0; f < 60 * 20; f++) {
      const t = f / 60;
      if (f % 15 === 0) { h.hp--; h.hurtAt = t; } // (a hit every quarter second for 20 s, faster than her grace allows)
      sh.watch(h, false, HITS, t);
      shaking = sh.offset(t).amount > 0 ? shaking + 1 / 60 : 0;
      longest = Math.max(longest, shaking);
    }
    expect(longest).toBeLessThanOrEqual(MAX + 1 / 60 + 1e-9);
    expect(sh.offset(20).amount).toBe(0);
    // (hits a second apart, a steady fight: each still shakes, and each is over within half a second)
    const slow = new Shake(S), g = { hp: 1e6, hurtAt: -Infinity };
    for (let k = 1; k <= 20; k++) {
      g.hp--; g.hurtAt = k; slow.watch(g, false, HITS, k);
      expect(slow.offset(k + 0.05).amount).toBeGreaterThan(0);
      expect(slow.offset(k + 0.5).amount).toBe(0);
    }
    // (her knockdown after it: shakes at once, whatever went before, and is still within 0.6 s)
    h.hp = 0; h.hurtAt = 20.1; sh.watch(h, true, HITS, 20.1);
    expect(sh.offset(20.1).amount).toBeGreaterThan(0.9);
    expect(sh.offset(20.75).amount).toBe(0);
  });

  it("a new night (its clock back at the start) carries nothing over, and its hits still shake", () => {
    const sh = new Shake(S), h = { hp: HITS - 1, hurtAt: 900 };
    sh.watch(h, false, HITS, 900);
    expect(sh.offset(900).amount).toBeGreaterThan(0);
    // the next night: her clock from 0, her health whole
    const n = { hp: HITS, hurtAt: -Infinity };
    sh.watch(n, false, HITS, 0.1);
    expect(sh.offset(0.1).amount).toBe(0);
    n.hp = HITS - 1; n.hurtAt = 5; sh.watch(n, false, HITS, 5);
    expect(sh.offset(5).amount).toBeGreaterThan(0);
    expect(sh.offset(5.5).amount).toBe(0);
  });

  it("holds still on pause (her clock stands) and goes on from there", () => {
    const sh = new Shake(S);
    sh.add(0.8, 1);
    const a = sh.offset(1.1);
    for (let i = 0; i < 100; i++) expect(sh.offset(1.1)).toEqual(a);
    expect(sh.offset(1.6).amount).toBe(0);
  });
});
