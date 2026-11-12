// The floor ⇄ head transition's drawing (Ed, 2026-11-12: "have a distinct flash with each transition in the sigil colour, and it burns
// into the ground with a glow and sparkles above the head"; render/leash/sigilFeel.ts): its path starts and ends where it should, eases
// in and out, and a placed sigil is hidden while it falls, then burns in hot and settles to its resting look. ?sigilfeel=old turns it off.
import { describe, expect, it } from "vitest";
import { TUNING } from "../../rules/tuning";
import { easeInOut, feelBurn, flightPoint, newSigilFeel, sigilFeelKnobs, sigilFeelOn } from "./sigilFeel";
import { tuningFromLink } from "../../app/linkParams";
import type { LeashView } from "../leash";

describe("the sigil's flight", () => {
  it("starts where it was and ends where it goes, eased in and out, lifted in the middle", () => {
    const o = { x: 0, y: 0, z: 0 };
    flightPoint(0, 1, 2, 3, 10, 0, -5, 2.5, 0.3, o); expect(o).toEqual({ x: 1, y: 2, z: 3 });
    flightPoint(1, 1, 2, 3, 10, 0, -5, 2.5, 0.3, o); expect(o.x).toBeCloseTo(10); expect(o.y).toBeCloseTo(0); expect(o.z).toBeCloseTo(-5);
    flightPoint(0.5, 0, 0, 0, 0, 0, 0, 2.5, 0.3, o); expect(o.y).toBeCloseTo(2.5);
    expect(easeInOut(0.1)).toBeLessThan(0.1); expect(easeInOut(0.9)).toBeGreaterThan(0.9); expect(easeInOut(0.5)).toBeCloseTo(0.5);
  });

  it("a placed sigil is hidden while it falls, then burns in hot and cools to rest", () => {
    const K = sigilFeelKnobs(TUNING);
    expect(K.fly).toBeGreaterThanOrEqual(0.3); expect(K.fly).toBeLessThanOrEqual(0.5); // (Ed's brief: an ease of about 0.3–0.5 s)
    const lv = { feel: newSigilFeel(), game: { tuning: TUNING } } as unknown as LeashView;
    expect(feelBurn(lv, 7, 0)).toBeNull();
    lv.feel.down.set(7, { at: 10, fx: 0, fy: 3, fz: 0, x: 4, z: 4, size0: 2, seed: 0.1, landed: false });
    expect(feelBurn(lv, 7, 10 + K.fly * 0.5)!.hidden).toBe(true);
    const hot = feelBurn(lv, 7, 10 + K.fly + 0.01)!;
    expect(hot.hidden).toBe(false); expect(hot.heat).toBeGreaterThan(0.9);
    const heat = hot.heat, cool = feelBurn(lv, 7, 10 + K.fly + K.burn * 0.7)!.heat;
    expect(cool).toBeLessThan(heat); expect(cool).toBeGreaterThan(0);
    expect(feelBurn(lv, 7, 10 + K.fly + K.burn)!.heat).toBeCloseTo(0);
  });

  it("?sigilfeel=old: the run on the press and the snap, as before", () => {
    expect(sigilFeelOn(TUNING)).toBe(true);
    expect(TUNING.leash.runAfter).toBeGreaterThan(0);
    const old = tuningFromLink(new URLSearchParams("sigilfeel=old")).tuning;
    expect(sigilFeelOn(old)).toBe(false);
    expect(old.leash.runAfter).toBe(0);
    const now = tuningFromLink(new URLSearchParams("")).tuning;
    expect(sigilFeelOn(now)).toBe(true); expect(now.leash.runAfter).toBe(TUNING.leash.runAfter);
  });
});
