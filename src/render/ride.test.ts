// Riding the hills (Ed, v289: "you jerk up and down with the roll of hills"): at speed the ride is
// smooth, never under the ground, and standing still it's exactly on the ground.
import { describe, expect, it } from "vitest";
import { Ride } from "./ride";

const T = { heightSmooth: 0.2, heightLookAhead: 0.4, heightClearance: 0.3 };
// Rolling ground as steep as the hills get (slopes to about 0.5), read as the game reads it: from
// samples 2 m apart, linearly between them, so its slope kinks at every sample (the jolts).
const hill = (x: number) => 9 * Math.sin(x / 120 * Math.PI * 2) + 0.6 * Math.sin(x / 13);
const ground = (x: number) => { const i = Math.floor(x / 2), f = x / 2 - i, at = (k: number) => hill(k * 2) + 0.15 * Math.sin(k * 12.9898); return at(i) * (1 - f) + at(i + 1) * f; };

describe("riding the hills", () => {
  for (const [v, lift] of [[19, 1], [42, 20]]) it(`at full speed (${v} m/s, ${lift} m up) it bobs far less than the ground under her, and her feet never go under it`, () => {
    const r = new Ride(), dt = 1 / 60;
    let x = 0, accRide = 0, accGround = 0;
    const hs: number[] = [], gs: number[] = [];
    for (let i = 0; i < 600; i++) {
      r.update(dt, x, 0, v, 0, v, gx => ground(gx), T, lift);
      hs.push(r.h); gs.push(ground(x));
      expect(r.h + lift).toBeGreaterThanOrEqual(ground(x) + T.heightClearance - 1e-6);
      x += v * dt;
    }
    for (let i = 61; i < hs.length - 1; i++) { // (after the first second)
      accRide += ((hs[i + 1] - 2 * hs[i] + hs[i - 1]) / (dt * dt)) ** 2;
      accGround += ((gs[i + 1] - 2 * gs[i] + gs[i - 1]) / (dt * dt)) ** 2;
    }
    // Its up-and-down acceleration, typically, well under the ground's: the bumps and kinks gone
    // (the hill itself, which the treetops follow too, she still rides over).
    expect(Math.sqrt(accRide)).toBeLessThan(Math.sqrt(accGround) * 0.7);
  });
  it("standing still it sits on the ground, and is left alone on a frame drawn twice", () => {
    const r = new Ride();
    r.update(1 / 60, 5, 0, 19, 0, 19, gx => ground(gx), T);
    r.update(1 / 60, 5.3, 0, 0, 0, 19, gx => ground(gx), T);
    expect(r.h).toBeCloseTo(ground(5.3), 9);
    const h = r.h;
    r.update(0, 5.3, 0, 0, 0, 19, () => 100, T);
    expect(r.h).toBe(h);
  });
  it("placed somewhere new, it starts on the ground there", () => {
    const r = new Ride();
    r.update(1 / 60, 0, 0, 19, 0, 19, () => 0, T);
    r.update(1 / 60, 500, 0, 19, 0, 19, () => 30, T);
    expect(r.h).toBe(30);
  });
});
