import { describe, expect, it } from "vitest";
import { addHearts, addLetters, fillOf, fillsOf } from "./orbit";
import type { Creature } from "./creatures";

const M = { drain: 0.02, drainDelay: 4 };
const wild = () => ({ species: "boar", level: 1 }) as Creature;

describe("combat as orbit slots: hearts and 💌s in one fade queue (Ed, 2026-10-28)", () => {
  it("drain at the same rate and delay, newest first, whichever kind", () => {
    const c = wild();
    addLetters(c, 0.2, 0, M); addHearts(c, 0.3, 1, M); addLetters(c, 0.1, 2, M);
    expect(fillsOf(c, 2, M)).toEqual([0.2, -0.3, 0.1]);
    expect(fillOf(c, 6, M).fill).toBeCloseTo(0.6); // (held drainDelay after the last)
    // 5 s draining at 0.02: the newest 💌's 0.1 gone first, then the heart sheds
    expect(fillsOf(c, 11, M).map(v => +v.toFixed(3))).toEqual([0.2, -0.3]);
    expect(fillsOf(c, 16, M).map(v => +v.toFixed(3))).toEqual([0.2, -0.2]);
    expect(fillOf(c, 16, M).hearts).toBeCloseTo(0.2);
    // a heart's slots hold no longer than a 💌's
    const h = wild(); addHearts(h, 0.5, 0, M);
    expect(fillOf(h, 4, M).fill).toBeCloseTo(0.5); expect(fillOf(h, 14, M).fill).toBeCloseTo(0.3);
  });
  it("squares with an affection set straight on it: its newest shed, or the rest 💌s", () => {
    const c = wild(); addLetters(c, 0.2, 0, M); addHearts(c, 0.3, 0, M);
    c.affection = 0.4;
    expect(fillsOf(c, 0, M).map(v => +v.toFixed(3))).toEqual([0.2, -0.2]);
    c.affection = 0.7;
    expect(fillsOf(c, 0, M).map(v => +v.toFixed(3))).toEqual([0.2, -0.3, 0.2]);
  });
});
