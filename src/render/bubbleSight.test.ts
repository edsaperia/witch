// Which creatures' bubbles she sees (render/bubbleSight.ts; Ed, 2026-10-28): near on the ground only, faded by distance and eased in
// time; never from the treetops or the treehouse.
import { describe, expect, it } from "vitest";
import { BubbleFader, seesGround, sightAt, sightOf } from "./bubbleSight";
import { TUNING } from "../rules/tuning";

const ground = { x: 0, z: 0, mode: "ground", lift: 0, perch: false };
const B = TUNING.bubbles;

describe("which creatures' bubbles she sees", () => {
  it("shows a near creature's whole, fades it out over the fade band, and none past its range", () => {
    expect(sightOf(ground, 5, 0, B.near, B.fade)).toBe(1);
    expect(sightOf(ground, B.near - B.fade, 0, B.near, B.fade)).toBe(1);
    const mid = sightOf(ground, B.near - B.fade / 2, 0, B.near, B.fade);
    expect(mid).toBeGreaterThan(0.4); expect(mid).toBeLessThan(0.6);
    expect(sightOf(ground, B.near, 0, B.near, B.fade)).toBe(0);
    expect(sightOf(ground, 0, B.near * 3, B.near, B.fade)).toBe(0);
  });

  it("shows none from the treetops, rising, or up in the treehouse, however near", () => {
    for (const w of [{ ...ground, mode: "treetop", lift: 1 }, { ...ground, lift: 0.8 }, { ...ground, perch: true }]) {
      expect(seesGround(w)).toBe(false);
      expect(sightOf(w, 1, 1, B.near, B.fade)).toBe(0);
    }
    expect(seesGround(ground)).toBe(true);
  });

  it("starts near enough that any creature she can throw a letter at answers whole, and fades within the screen", () => {
    expect(B.near - B.fade).toBeGreaterThanOrEqual(TUNING.invites.range - 10);
    expect(B.near).toBeLessThanOrEqual(TUNING.dreams.range);
    expect(B.ease).toBeGreaterThan(0);
  });

  it("keeps a dream's own range: a sleeping legend 50 m off still dreams for her on the ground, not in the treehouse", () => {
    expect(sightOf(ground, 50, 0, TUNING.dreams.range, B.fade)).toBe(1);
    expect(sightOf({ ...ground, perch: true }, 50, 0, TUNING.dreams.range, B.fade)).toBe(0);
  });

  it("eases in and out over `ease` seconds: rising fades a bubble out, landing back in, a new one from nothing", () => {
    const f = new BubbleFader(), e = 0.4;
    expect(f.step("a", 1, 10, e)).toBe(0); // (new: from nothing)
    expect(f.step("a", 1, 10.2, e)).toBeCloseTo(0.5);
    expect(f.step("a", 1, 10.4, e)).toBeCloseTo(1);
    expect(f.step("a", 1, 10.6, e)).toBe(1);
    const up = sightOf({ ...ground, lift: 1, mode: "treetop" }, 1, 1, B.near, B.fade);
    expect(f.step("a", up, 10.8, e)).toBeCloseTo(0.5);
    expect(f.step("a", up, 11.0, e)).toBeCloseTo(0);
    expect(f.step("a", 1, 11.2, e)).toBeCloseTo(0.5); // (landed: back in)
    expect(f.step("a", 1, 13, e)).toBe(0); // (not drawn a while: from nothing again)
    expect(sightAt(10, 0, 5)).toBe(0);
  });
});
