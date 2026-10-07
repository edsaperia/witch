import { describe, expect, it } from "vitest";
import { newBeatClock, beatAt } from "./beat";
import { PARTY_CAST, type PartyState } from "./party";
import { DJ_ROUTINE, DJ_ROUTINE_BEATS, djRoutineAt, djRoutineStart, djStrokes } from "./djSet";
import { DJ_GESTURES } from "../../art/witch.js";

const game = (spellAt: number | null | undefined, seated = true, ko: { inAt: number; backAt: number } | null = null) =>
  ({ beat: newBeatClock(120), party: { spellAt } as PartyState, witch: { seated }, witches: [{ ko }] });

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
  it("fills a respawn wait: straight into the scratch and chirp bars, round again, the hype landing on its end", () => {
    const ko = { inAt: 100.2, backAt: 107.2 }, g = game(undefined, true, ko), s = djRoutineStart(g, 101)!; // a 7 s wait (the longest)
    expect(s).toBeCloseTo(100.5, 6); // the next whole beat
    const at = (b: number) => { const r = djRoutineAt(g, s + b * 0.5); return r && `${r.gesture}${r.frame}`; };
    expect([at(0.1), at(4.1), at(7.1), at(8.1), at(12.1), at(12.6)]).toEqual(["scratch1", "chirp0", "spin0", "scratch1", "hype0", "hype1"]); // 13.4 beats: hype from 12
    expect(djRoutineAt(g, 107.3)).toBeNull(); // free, up and away
    const st = djStrokes(g, 0, 200);
    expect(st[0].stroke).toBe("f"); expect(st.some(k => k.stroke === "lift" || k.stroke === "drop")).toBe(false); // the needle's down already
    expect(st.every(k => k.at + k.len <= s + 6 + 1e-9)).toBe(true); // nothing heard in the hype
    // the shortest wait (1.5 s): a beat or so of scratching, then the hype to its end
    const short = game(undefined, true, { inAt: 50, backAt: 51.5 }), s2 = djRoutineStart(short, 50.1)!;
    expect(djRoutineAt(short, s2 + 0.1)?.gesture).toBe("scratch"); expect(djRoutineAt(short, 51.4)?.gesture).toBe("hype");
    expect(djRoutineStart(game(undefined, true, { inAt: 100, backAt: 100 }), 100.1)).toBeNull(); // no wait, no routine
  });
  it("reads the knockout's times on her own clock", () => {
    const g = { ...game(undefined, true, { inAt: 40, backAt: 46 }), clock: { time: 60 }, herTime: 50 }; // the world 10 s ahead (a slowed circle once)
    expect(djRoutineStart(g, 45)).toBeNull(); // in her time that's before she's back
    expect(djRoutineAt(g, 51)?.gesture).toBe("scratch"); expect(djRoutineAt(g, 52)?.gesture).toBe("chirp"); // back at 50 in the world's time
  });
});
