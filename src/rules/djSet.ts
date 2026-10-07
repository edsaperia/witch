// Her set at the decks (Ed, 2026-10-07: "before the first music starts, the dj witch can drop the needle and do a little
// scratching performance. Every time she respawns she could do a bit of scratching"): a short routine she plays behind the
// decks, one table for the picture (render/view/witch.ts, art/witch.js's dj gestures) and the sound (the music builder's,
// sfxCues.ts: its strokes), on the beat clock (rules/beat.ts), so both land on the same sixteenths. Agreed with the music
// builder: the needle lifted and dropped, a nod, a bar of baby scratches, a bar of chirps (each stroke cut by the fader) and a
// spin-back, then her hand thrown up; 13 beats, about 6.5 s at 120 bpm.
// When: from the first whole beat after the party spell's burst (party.spellAt + PARTY_CAST), once through; and through the
// wait behind her decks after a knockout (the hotel builder's knockout.respawn, rules/knockout.ts: from the first whole beat
// after she's back, ko.inAt, to ko.backAt): the needle and the nod, then the scratch and chirp bars round and round, her
// hand thrown up on its last beat. Only while she's at the decks (seated): if she steps off mid-routine it stops. Nothing
// here holds her (the wait is the rules' own).
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

type Game = { beat: BeatClock; party: PartyState; witch: { seated?: boolean }; witches?: { ko: { inAt?: number; backAt: number } | null }[] };
/** Her wait at the decks after a knockout (rules/knockout.ts: back at inAt, free at backAt), or null. */
export function respawnOf(g: Game): { inAt: number; backAt: number } | null {
  const k = g.witches?.[0]?.ko;
  return k && typeof k.inAt === "number" && k.backAt > k.inAt ? { inAt: k.inAt, backAt: k.backAt } : null;
}
/** The respawn's loop: after the needle and the nod (its first LOOP_FROM beats) the scratch and chirp bars repeat. */
const LOOP_FROM = 4, LOOP_TO = 12;

const nextBeat = (g: Game, t: number) => timeAt(g.beat, Math.ceil(beatAt(g.beat, t) - 1e-6));
/** The routine's runs: each its start and end (game times), and whether it's a respawn's (looping to fill its wait). */
function runs(g: Game): { start: number; end: number; loop: boolean }[] {
  const out: { start: number; end: number; loop: boolean }[] = [], sp = g.party.spellAt, r = respawnOf(g);
  const span = (s: number, beats: number) => timeAt(g.beat, beatAt(g.beat, s) + beats);
  if (typeof sp === "number") { const s = nextBeat(g, sp + PARTY_CAST); out.push({ start: s, end: span(s, DJ_ROUTINE_BEATS), loop: false }); }
  if (r) { const s = nextBeat(g, r.inAt); if (s < r.backAt) out.push({ start: s, end: r.backAt, loop: true }); }
  return out;
}
/** The run she's in at `time`, or null: not at the decks, or not in one (a respawn's over the intro's). */
function runAt(g: Game, time: number): { start: number; end: number; loop: boolean } | null {
  if (!g.witch.seated) return null;
  let best: { start: number; end: number; loop: boolean } | null = null;
  for (const r of runs(g)) if (time >= r.start && time < r.end && (!best || r.start > best.start)) best = r;
  return best;
}
/** The start of the routine she's in at `time` (a game time), or null: not at the decks, or not in one. */
export const djRoutineStart = (g: Game, time: number): number | null => runAt(g, time)?.start ?? null;
/** The table's cue at `beat` of a run `beats` long: a looping run (a respawn's) repeats the scratch and chirp bars past
 *  LOOP_FROM, and throws her hand up for its last beat. */
function cueAt(beat: number, beats: number, loop: boolean): DjCue & { at: number } {
  let b = beat;
  if (loop) {
    if (beats >= LOOP_FROM + 2 && beat >= Math.floor(beats) - 1) return { at: beat, gesture: "hype", frame: (beat % 1) < 0.5 ? 0 : 1 };
    if (b >= LOOP_FROM) b = LOOP_FROM + ((b - LOOP_FROM) % (LOOP_TO - LOOP_FROM));
  }
  let cue = DJ_ROUTINE[0];
  for (const c of DJ_ROUTINE) if (c.at <= b + 1e-9) cue = c; else break;
  return cue;
}
/** Where she is in the routine at `time`: its gesture and frame, the beats in and its start; null outside one. */
export function djRoutineAt(g: Game, time: number): { gesture: string; frame: 0 | 1; beat: number; start: number } | null {
  const r = runAt(g, time);
  if (!r) return null;
  const b0 = beatAt(g.beat, r.start), beat = beatAt(g.beat, time) - b0, cue = cueAt(beat, beatAt(g.beat, r.end) - b0, r.loop);
  return { gesture: cue.gesture, frame: cue.frame, beat, start: r.start };
}
/** The strokes heard in [from, to) (game times), for the sound to schedule ahead: each its time, kind and length (to the next
 *  cue, in seconds). Only in a run she's in at the stroke (seated), as the picture plays it. */
export function djStrokes(g: Game, from: number, to: number): { at: number; stroke: DjStroke; len: number }[] {
  const out: { at: number; stroke: DjStroke; len: number }[] = [];
  for (const r of runs(g)) {
    const a = Math.max(from, r.start), e = Math.min(to, r.end);
    if (!(e > a) || !g.witch.seated) continue;
    const b0 = beatAt(g.beat, r.start), beats = beatAt(g.beat, r.end) - b0;
    // every cue time in the run: the table's, and in a loop its repeats
    const cues: { at: number; stroke?: DjStroke }[] = [];
    for (const c of DJ_ROUTINE) if (!r.loop || c.at < LOOP_TO) cues.push(c);
    if (r.loop) for (let k = 1; LOOP_FROM + k * (LOOP_TO - LOOP_FROM) < beats; k++) for (const c of DJ_ROUTINE) if (c.at >= LOOP_FROM && c.at < LOOP_TO) cues.push({ at: c.at + k * (LOOP_TO - LOOP_FROM), stroke: c.stroke });
    const lastBeat = r.loop && beats >= LOOP_FROM + 2 ? Math.floor(beats) - 1 : Infinity; // (the hype: nothing heard from the table)
    cues.forEach((c, i) => {
      if (!c.stroke || c.at >= lastBeat || c.at >= beats) return;
      const at = timeAt(g.beat, b0 + c.at);
      if (at < a || at >= e) return;
      const next = Math.min(cues[i + 1]?.at ?? DJ_ROUTINE_BEATS, lastBeat, beats);
      out.push({ at, stroke: c.stroke, len: timeAt(g.beat, b0 + next) - at });
    });
  }
  return out.sort((x, y) => x.at - y.at);
}
