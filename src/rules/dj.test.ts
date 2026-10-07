// Her DJ routine (Ed, 2026-10-07: "before the first music starts, the dj witch can drop the needle and do a little scratching
// performance"): the art's table read by the picture and the sound alike, and when it starts.
import { describe, expect, it } from "vitest";
import { DJ_GESTURES, DJ_ROUTINE, DJ_ROUTINE_BEATS, djFrame, djGesture, djRoutine } from "../../art/witch.js";
import { newGame, stepGame, STEP } from "./game";
import { PARTY_CAST } from "./party";
import { TUNING } from "./tuning";
import { djRoutineFrom } from "./dj";
import { beatAt } from "./beat";

describe("her routine at the decks", () => {
  it("is in time order, inside its length, its strokes the sound knows, the needle dropped before any scratching", () => {
    const strokes = new Set(["lift", "drop", "f", "b", "chirp", "spin", "hype"]);
    let last = -1;
    for (const e of DJ_ROUTINE) {
      expect(e.at).toBeGreaterThan(last); last = e.at;
      expect(e.at).toBeLessThan(DJ_ROUTINE_BEATS);
      if (e.stroke) expect(strokes.has(e.stroke)).toBe(true);
    }
    const drop = DJ_ROUTINE.find(e => e.stroke === "drop")!, first = DJ_ROUTINE.find(e => e.stroke === "f" || e.stroke === "chirp")!;
    expect(drop.at).toBeLessThan(first.at);
  });

  it("draws a real frame at every sixteenth of it (its own gestures standing in until they're drawn), and the set before and after", () => {
    const frames = new Set(Object.values(DJ_GESTURES).flat());
    for (let b = -2; b < DJ_ROUTINE_BEATS + 4; b += 0.25) {
      const f = djFrame(40 + b, { from: 40 });
      expect(frames.has(f)).toBe(true);
      if (b < 0 || b >= DJ_ROUTINE_BEATS) { expect(djRoutine(b)).toBeNull(); expect(f).toBe(djFrame(40 + b)); expect(djGesture(40 + b, { from: 40 })).toBe(djGesture(40 + b)); }
    }
    expect(djGesture(41, { from: 40 })).toBe("needle");
    expect(djFrame(40.6, { cast: true, from: 40 })).toBe(DJ_GESTURES.cast[1]); // (the spell's cast wins)
  });

  it("starts on the first whole beat after the party spell's burst, once, and only while she's at her decks", () => {
    const g = newGame(123, TUNING);
    g.party.spellAt = null; g.clock.paused = false;
    const run = (secs: number, c: object = {}) => { for (let i = 0; i < Math.round(secs / STEP); i++) stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...c } as Parameters<typeof stepGame>[1], STEP); };
    run(1);
    expect(djRoutineFrom(g)).toBeNull();
    run(STEP, { castParty: true });
    run(PARTY_CAST * 0.5);
    expect(djRoutineFrom(g)).toBeNull(); // (casting: not yet)
    run(PARTY_CAST);
    const from = djRoutineFrom(g)!;
    expect(from).not.toBeNull();
    expect(Number.isInteger(from)).toBe(true);
    expect(from).toBeGreaterThanOrEqual(beatAt(g.beat, g.party.spellAt! + PARTY_CAST) - 1e-6);
    run(2);
    expect(djRoutineFrom(g)).toBe(from); // (not set going again while she sits on)
    g.witch = { ...g.witch, seated: false };
    expect(djRoutineFrom(g)).toBeNull();
  });
});
