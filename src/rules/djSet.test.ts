import { describe, expect, it } from "vitest";
import { newBeatClock, beatAt } from "./beat";
import { PARTY_CAST, type PartyState } from "./party";
import { DJ_ROUTINE, DJ_ROUTINE_BEATS, djIntroEnd, djRoutineAt, djRoutineStart, djStrokes, heldByRoutine, scratchRoutine } from "./djSet";
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
  it("fills a respawn wait: the needle on the new record as she's back, then her seeded scratching into the downbeat (Ed, 2026-10-09)", () => {
    const ko = { inAt: 100.2, backAt: 106 }, g = { ...game(undefined, true, ko), seed: 9, knockdowns: [{}] }, s = djRoutineStart(g, 101)!; // the wait ending on a bar line
    expect(s).toBeCloseTo(100.2, 6); // the needle drops as she's back
    expect(djRoutineAt(g, 100.21)).toMatchObject({ gesture: "needle", frame: 1 });
    const st = djStrokes(g, 0, 200);
    expect(st[0]).toMatchObject({ stroke: "drop" }); expect(st[0].at).toBeCloseTo(100.2, 6);
    expect(st.filter(k => k.stroke === "drop" || k.stroke === "lift").length).toBe(1); // one needle drop, no second one
    const scratching = st.slice(1);
    expect(scratching.length).toBeGreaterThan(6);
    expect(scratching[0].at).toBeGreaterThanOrEqual(100.2 + 0.75 * 0.5 - 1e-9); // (the crackle heard a moment first)
    for (const k of scratching) { expect(k.at % 0.125).toBeCloseTo(0, 6); expect(k.at + k.len).toBeLessThanOrEqual(106 + 1e-9); } // on the sixteenths, inside the wait
    expect(scratching[scratching.length - 1].at).toBeGreaterThan(106 - 0.5); // running into the downbeat
    expect(djRoutineAt(g, 106.01)).toBeNull(); // free, up and away
    // the shortest wait (1.5 s): the needle, then a beat or two of scratching
    const short = { ...game(undefined, true, { inAt: 50, backAt: 52 }), seed: 9, knockdowns: [{}] };
    expect(djStrokes(short, 0, 100).slice(1).length).toBeGreaterThan(0);
    expect(djRoutineStart(game(undefined, true, { inAt: 100, backAt: 100 }), 100.1)).toBeNull(); // no wait, no routine
  });
  it("makes its routine from the new music seed: the same for a seed, different between seeds, inside its beats", () => {
    for (const beats of [3, 6, 10]) {
      const a = scratchRoutine(1234, beats), b = scratchRoutine(1234, beats), c = scratchRoutine(98765, beats);
      expect(a.length).toBeGreaterThan(0);
      expect(b).toEqual(a);
      expect(c.map(x => `${x.at}${x.stroke}`)).not.toEqual(a.map(x => `${x.at}${x.stroke}`));
      for (const x of a) { expect(x.at).toBeGreaterThanOrEqual(0); expect(x.at).toBeLessThan(beats); expect((DJ_GESTURES as Record<string, number[]>)[x.gesture]?.[x.frame], x.gesture).toBeTypeOf("number"); }
      // phrases with breaths: a beat with no stroke between them (in a long enough wait), busier at the end
      const struck = new Set(a.filter(x => x.stroke).map(x => Math.floor(x.at)));
      if (beats >= 6) expect(struck.size).toBeLessThan(beats);
      const per = (b0: number) => a.filter(x => x.stroke && Math.floor(x.at) === b0).length;
      expect(per(beats - 1)).toBeGreaterThanOrEqual(3);
    }
    // the knockdown's seed: each knockdown its own (musicSeed by how many)
    const ko = { inAt: 0, backAt: 6 }, one = { ...game(undefined, true, ko), seed: 9, knockdowns: [{}] }, two = { ...one, knockdowns: [{}, {}] };
    expect(djStrokes(two, 0, 10).map(k => k.stroke)).not.toEqual(djStrokes(one, 0, 10).map(k => k.stroke));
  });
  it("reads the knockout's times on her own clock", () => {
    const g = { ...game(undefined, true, { inAt: 40, backAt: 46 }), clock: { time: 60 }, herTime: 50 }; // the world 10 s ahead (a slowed circle once)
    expect(djRoutineStart(g, 45)).toBeNull(); // in her time that's before she's back
    expect(djRoutineAt(g, 50.1)?.gesture).toBe("needle"); expect(djRoutineStart(g, 51)).toBeCloseTo(50, 6); // back at 50 in the world's time
  });
  it("holds her at the decks from the party spell to the routine's end, when the first music drops", () => {
    const g = game(10), end = djIntroEnd(g)!, s = djRoutineStart(g, 12)!;
    expect(end - s).toBeCloseTo(DJ_ROUTINE_BEATS * 0.5, 6); // 13 beats at 120 bpm
    expect(heldByRoutine(g, 9.9)).toBe(false); expect(heldByRoutine(g, 10.5)).toBe(true); expect(heldByRoutine(g, end - 0.01)).toBe(true); expect(heldByRoutine(g, end)).toBe(false);
    for (const sp of [undefined, null]) { expect(djIntroEnd(game(sp))).toBeNull(); expect(heldByRoutine(game(sp), 20)).toBe(false); }
  });
});
