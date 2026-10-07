// Her set at the decks (Ed, 2026-10-07: "before the first music starts, the dj witch can drop the needle and do a little
// scratching performance. Every time she respawns she could do a bit of scratching"): a short routine she plays behind the
// decks, one table for the picture (render/view/witch.ts, art/witch.js's dj gestures) and the sound (the music builder's,
// sfxCues.ts: its strokes), on the beat clock (rules/beat.ts), so both land on the same sixteenths. Agreed with the music
// builder: the needle lifted and dropped, a nod, a bar of baby scratches, a bar of chirps (each stroke cut by the fader) and a
// spin-back, then her hand thrown up; 13 beats, about 6.5 s at 120 bpm.
// When: from the first whole beat after the party spell's burst (party.spellAt + PARTY_CAST), and from the first whole beat
// after she's back at the decks in a respawn wait (respawnOf: the hotel builder's knockout.respawn); only while she's still
// at the decks (seated): if she steps off mid-routine it stops. Nothing holds her there.
// Pure: game time in, game time out.
import { beatAt, timeAt, type BeatClock } from "./beat";
import { PARTY_CAST, type PartyState } from "./party";

/** What's heard: the tonearm lifted, the needle dropped, a stroke forward or back, a chirp (a stroke cut by the fader), a spin-back. */
export type DjStroke = "lift" | "drop" | "f" | "b" | "chirp" | "spin";
/** From beat `at` of the routine: her `gesture`'s `frame` (art/witch.js DJ_GESTURES, a pair) and, if any, the stroke heard. */
export interface DjCue { at: number; gesture: string; frame: 0 | 1; stroke?: DjStroke }
const groove = (at: number): DjCue[] => [{ at, gesture: "groove", frame: 0 }, { at: at + 0.5, gesture: "groove", frame: 1 }];
const sc = (at: number, s: "f" | "b"): DjCue => ({ at, gesture: "scratch", frame: s === "f" ? 1 : 0, stroke: s });
export const DJ_ROUTINE: readonly DjCue[] = [
  { at: 0, gesture: "needle", frame: 0, stroke: "lift" }, { at: 1, gesture: "needle", frame: 1, stroke: "drop" },
  ...groove(2), ...groove(3),
  sc(4, "f"), sc(4.5, "b"), sc(5, "f"), sc(5.25, "b"), sc(5.5, "f"), sc(6, "b"), sc(6.5, "f"), sc(6.75, "b"), sc(7, "f"),
  ...[8, 8.5, 9, 9.75, 10, 10.5].map((at, i): DjCue => ({ at, gesture: "chirp", frame: (i % 2) as 0 | 1, stroke: "chirp" })),
  { at: 11, gesture: "spin", frame: 0, stroke: "spin" }, { at: 11.75, gesture: "spin", frame: 1 },
  { at: 12, gesture: "hype", frame: 0 }, { at: 12.5, gesture: "hype", frame: 1 },
];
/** Its length in beats. */
export const DJ_ROUTINE_BEATS = 13;

type Game = { beat: BeatClock; party: PartyState; witch: { seated?: boolean } };
/** Her respawn at the decks, for the routine: when she was back. None until the respawn wait is in the rules (the hotel
 *  builder's knockout.respawn). */
export function respawnOf(_g: Game): { backAt: number } | null { return null; }

const nextBeat = (g: Game, t: number) => timeAt(g.beat, Math.ceil(beatAt(g.beat, t) - 1e-6));
/** The routine's starts (game times): after the party spell, and after her respawn (when there is one). */
function starts(g: Game): number[] {
  const out: number[] = [], sp = g.party.spellAt, r = respawnOf(g);
  if (typeof sp === "number") out.push(nextBeat(g, sp + PARTY_CAST));
  if (r) out.push(nextBeat(g, r.backAt));
  return out;
}
/** The start of the routine she's in at `time` (a game time), or null: not at the decks, or not in one. */
export function djRoutineStart(g: Game, time: number): number | null {
  if (!g.witch.seated) return null;
  let best: number | null = null;
  for (const s of starts(g)) if (time >= s && time < timeAt(g.beat, beatAt(g.beat, s) + DJ_ROUTINE_BEATS) && (best === null || s > best)) best = s;
  return best;
}
/** Where she is in the routine at `time`: its gesture and frame, the beats in and its start; null outside one. */
export function djRoutineAt(g: Game, time: number): { gesture: string; frame: 0 | 1; beat: number; start: number } | null {
  const s = djRoutineStart(g, time);
  if (s === null) return null;
  const beat = beatAt(g.beat, time) - beatAt(g.beat, s);
  let cue = DJ_ROUTINE[0];
  for (const c of DJ_ROUTINE) if (c.at <= beat + 1e-9) cue = c; else break;
  return { gesture: cue.gesture, frame: cue.frame, beat, start: s };
}
/** The strokes heard in [from, to) (game times), for the sound to schedule ahead: each its time, kind and length (to the next
 *  cue, in seconds). Only in a routine she's in at its start (seated), as the picture plays it. */
export function djStrokes(g: Game, from: number, to: number): { at: number; stroke: DjStroke; len: number }[] {
  const out: { at: number; stroke: DjStroke; len: number }[] = [];
  for (const s of starts(g)) {
    const b0 = beatAt(g.beat, s);
    DJ_ROUTINE.forEach((c, i) => {
      if (!c.stroke) return;
      const at = timeAt(g.beat, b0 + c.at);
      if (at < from || at >= to || djRoutineStart(g, at) !== s) return;
      const next = DJ_ROUTINE[i + 1]?.at ?? DJ_ROUTINE_BEATS;
      out.push({ at, stroke: c.stroke, len: timeAt(g.beat, b0 + next) - at });
    });
  }
  return out.sort((a, b) => a.at - b.at);
}
