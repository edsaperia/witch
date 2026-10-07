import { describe, expect, it } from "vitest";
import { newBeatClock, beatAt } from "./beat";
import { PARTY_CAST, type PartyState } from "./party";
import { DJ_ROUTINE, DJ_ROUTINE_BEATS, djRoutineAt, djRoutineStart, djStrokes } from "./djSet";
import { DJ_GESTURES } from "../../art/witch.js";

const game = (spellAt: number | null | undefined, seated = true) => ({ beat: newBeatClock(120), party: { spellAt } as PartyState, witch: { seated } });

describe("her set at the decks (rules/djSet.ts)", () => {
  it("starts on the first whole beat after the cast's burst, only while she's at the decks", () => {
    const g = game(10.1), s = djRoutineStart(g, 12)!;
    expect(s).toBeGreaterThanOrEqual(10.1 + PARTY_CAST);
    expect(beatAt(g.beat, s) % 1).toBeCloseTo(0, 6);
    expect(djRoutineStart(g, s - 0.01)).toBeNull();
    expect(djRoutineStart(game(10.1, false), 12)).toBeNull(); // stepped off: it stops
    for (const sp of [undefined, null]) expect(djRoutineStart(game(sp), 12)).toBeNull();
  });
  it("runs its 13 beats through the needle, the scratches, the chirps, the spin and the hype", () => {
    const g = game(0), s = djRoutineStart(g, 2)!, at = (b: number) => djRoutineAt(g, s + b * 0.5); // 120 bpm: half a second a beat
    expect([at(0.1), at(1.1), at(2.1), at(4.1), at(8.1), at(11.1), at(12.6)].map(r => r && `${r.gesture}${r.frame}`))
      .toEqual(["needle0", "needle1", "groove0", "scratch1", "chirp0", "spin0", "hype1"]);
    expect(djRoutineAt(g, s + DJ_ROUTINE_BEATS * 0.5 + 0.01)).toBeNull();
  });
  it("names only gestures the art draws, in order, inside its length", () => {
    let last = -1;
    for (const c of DJ_ROUTINE) {
      expect((DJ_GESTURES as Record<string, number[]>)[c.gesture]?.[c.frame], c.gesture).toBeTypeOf("number");
      expect(c.at).toBeGreaterThan(last); expect(c.at).toBeLessThan(DJ_ROUTINE_BEATS); last = c.at;
    }
  });
  it("gives the sound its strokes, in the window asked, as the table says", () => {
    const g = game(0), s = djRoutineStart(g, 2)!, all = djStrokes(g, 0, 100);
    expect(all.map(k => k.stroke)).toEqual(DJ_ROUTINE.filter(c => c.stroke).map(c => c.stroke));
    expect(all[0].at).toBeCloseTo(s, 6); expect(all[1].at).toBeCloseTo(s + 0.5, 6); // lift, then the drop a beat on
    expect(all.find(k => k.stroke === "spin")!.len).toBeCloseTo(0.375, 6); // held three sixteenths
    const mid = djStrokes(g, s + 2, s + 3);
    expect(mid.every(k => k.at >= s + 2 && k.at < s + 3)).toBe(true);
    expect(djStrokes(game(0, false), 0, 100)).toEqual([]); // stepped off: nothing heard
  });
});
