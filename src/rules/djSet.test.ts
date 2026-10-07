import { describe, expect, it } from "vitest";
import { newBeatClock, beatAt } from "./beat";
import { PARTY_CAST, type PartyState } from "./party";
import type { Tuning } from "./tuning";
import { djRoutine, heldByNeedle, needleDownAt, needleWindow, respawnWindow, scratchAt, scratchStrokes, SCRATCH_BAR } from "./djSet";

const game = (spellAt: number | null | undefined, dj = { needleBeats: 2, scratchBeats: 8 }) =>
  ({ beat: newBeatClock(120), party: { spellAt } as PartyState, tuning: { dj } as unknown as Tuning });

describe("her set at the decks (rules/djSet.ts)", () => {
  it("drops the needle on the beat after the cast's burst, two beats in, and scratches eight more", () => {
    const g = game(10.1), w = needleWindow(g)!;
    expect(w.start).toBeGreaterThanOrEqual(10.1 + PARTY_CAST);
    expect(beatAt(g.beat, w.start) % 1).toBeCloseTo(0, 6); // on a beat
    expect(beatAt(g.beat, w.needleAt) - beatAt(g.beat, w.start)).toBeCloseTo(2, 6);
    expect(beatAt(g.beat, w.end) - beatAt(g.beat, w.needleAt)).toBeCloseTo(8, 6);
    expect(needleDownAt(g)).toBe(w.needleAt);
  });
  it("holds her from the cast to the routine's end, and none without the spell", () => {
    const g = game(10), w = needleWindow(g)!;
    expect(heldByNeedle(g, 9.9)).toBe(false);
    expect(heldByNeedle(g, w.start + 0.1)).toBe(true);
    expect(heldByNeedle(g, w.end - 0.01)).toBe(true);
    expect(heldByNeedle(g, w.end)).toBe(false);
    for (const sp of [undefined, null]) { expect(needleWindow(game(sp))).toBeNull(); expect(heldByNeedle(game(sp), 20)).toBe(false); }
  });
  it("steps through lift, place and scratch", () => {
    const g = game(10), w = needleWindow(g)!, at = (b: number) => djRoutine(g, w.start + b * 0.5)?.step; // 120 bpm: half a second a beat
    expect([at(0.2), at(1.2), at(2.2), at(9.9)]).toEqual(["lift", "place", "scratch", "scratch"]);
    expect(djRoutine(g, w.end + 0.01)).toBeNull();
  });
  it("gives the sound its strokes on the sixteenths of the pattern, only while scratching", () => {
    const g = game(10), w = needleWindow(g)!, s = scratchStrokes(g, 0, 100);
    expect(s.length).toBe(2 * SCRATCH_BAR.filter(Boolean).length); // two bars
    expect(s[0].at).toBeCloseTo(w.needleAt, 6);
    for (const k of s) { expect(k.at).toBeGreaterThanOrEqual(w.needleAt - 1e-9); expect(k.at).toBeLessThan(w.end); expect(k.len).toBeCloseTo(0.125, 6); expect([1, -1, 2]).toContain(k.dir); }
    // a window in the middle sees only its own
    const mid = scratchStrokes(g, w.needleAt + 1, w.needleAt + 2);
    expect(mid.every(k => k.at >= w.needleAt + 1 && k.at < w.needleAt + 2)).toBe(true);
  });
  it("scratches through a respawn wait in bars from the next beat, a flourish on its last beat", () => {
    const g = game(undefined), r = respawnWindow(g, 30.2, 36)!;
    expect(beatAt(g.beat, r.start) % 1).toBeCloseTo(0, 6);
    expect(djRoutine(g, r.start + 0.1, { backAt: 30.2, until: 36 })?.step).toBe("scratch");
    expect(djRoutine(g, 35.8, { backAt: 30.2, until: 36 })?.step).toBe("flourish");
    expect(djRoutine(g, 36.1, { backAt: 30.2, until: 36 })).toBeNull();
    expect(respawnWindow(g, 30, 30)).toBeNull(); // no wait, no routine
    const s = scratchStrokes(g, 0, 100, { backAt: 30.2, until: 36 });
    expect(s.length).toBeGreaterThan(0); expect(s.every(k => k.at < 35.5)).toBe(true); // none in the flourish
  });
  it("follows the record's way and the fader's cuts", () => {
    const g = game(undefined), f = (k: number) => scratchAt(g, 0, k * 0.125 + 0.01);
    expect(f(0)).toEqual({ dir: 1, open: true });
    expect(f(1)).toEqual({ dir: -1, open: true });
    expect(f(4).open).toBe(false); // the first cut
    expect(f(7).dir).toBe(-1); // a rest holds the last stroke
  });
});
