// Her set at the decks (Ed, 2026-10-07: "before the first music starts, the dj witch can drop the needle and do a little
// scratching performance. Every time she respawns she could do a bit of scratching"): a short routine she plays behind the
// decks, one table for the picture (render/view/witch.ts, art/witch.js's dj gestures) and the sound (the music builder's,
// sfxCues.ts: its strokes), on the beat clock (rules/beat.ts), so both land on the same sixteenths. Agreed with the music
// builder: the needle lifted and dropped, a nod, a bar of baby scratches, a bar of chirps (each stroke cut by the fader) and a
// spin-back, then her hand thrown up; 13 beats, about 6.5 s at 120 bpm.
// When: from the first whole beat after the party spell's burst (party.spellAt + PARTY_CAST), once through; and through the
// wait behind her decks after a knockout (the hotel builder's knockout.respawn, rules/knockout.ts: from the first whole beat
// after she's back, ko.inAt, to ko.backAt, about 1.5 to 7 s): the needle's still down, so straight into the scratch and
// chirp bars, round again if it's long, cut short to throw her hand up on the beat before it ends. Only while she's at the
// decks (seated): if she steps off mid-routine it stops. After the party spell she's held at the decks till its end (Ed,
// 2026-10-07: "the first music starts straight after the needle-drop routine ... She IS held at the decks until it ends";
// heldByRoutine, rules/game.ts), the music dropping then (djIntroEnd: the music builder's); a knockdown's wait is the rules' own.
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

type Game = { beat: BeatClock; party: PartyState; witch: { seated?: boolean }; witches?: { ko: { inAt?: number; backAt: number } | null }[]; clock?: { time: number }; herTime?: number };
/** Her wait at the decks after a knockout (rules/knockout.ts: back at inAt, free at backAt), or null; in game time (the beat
 *  clock's: the knockout's times are on her own clock, g.herTime, which a legend's slowed circle sets apart from the world's). */
export function respawnOf(g: Game): { inAt: number; backAt: number } | null {
  const k = g.witches?.[0]?.ko;
  if (!k || typeof k.inAt !== "number" || !(k.backAt > k.inAt)) return null;
  const off = g.clock && typeof g.herTime === "number" ? g.clock.time - g.herTime : 0;
  return { inAt: k.inAt + off, backAt: k.backAt + off };
}
/** The respawn's loop: the table's scratch and chirp bars (its beats LOOP_FROM to LOOP_TO), round and round. */
const LOOP_FROM = 4, LOOP_TO = 12;
/** In a respawn run `beats` long, the beat her hand goes up: a whole beat to a beat and a bit before its end (after a beat of scratching at least). */
const hypeFrom = (beats: number) => Math.max(1, Math.floor(beats - 1));

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
/** When the routine after the party spell ends (a game time; the first music drops then), or null without the spell. */
export function djIntroEnd(g: Game): number | null {
  const r = runs(g).find(x => !x.loop);
  return r ? r.end : null;
}
/** Held at the decks from the party spell to its routine's end (the spell's own hold covers its burst: rules/party.ts). */
export function heldByRoutine(g: Game, time: number): boolean {
  const sp = g.party.spellAt, end = djIntroEnd(g);
  return typeof sp === "number" && end !== null && time >= sp && time < end;
}
/** The start of the routine she's in at `time` (a game time), or null: not at the decks, or not in one. */
export const djRoutineStart = (g: Game, time: number): number | null => runAt(g, time)?.start ?? null;
/** The table's cue at `beat` of a run `beats` long: a looping run (a respawn's) repeats the scratch and chirp bars past
 *  LOOP_FROM, and throws her hand up for its last beat. */
function cueAt(beat: number, beats: number, loop: boolean): DjCue & { at: number } {
  let b = beat;
  if (loop) {
    if (beat >= hypeFrom(beats)) return { at: beat, gesture: "hype", frame: (beat % 1) < 0.5 ? 0 : 1 };
    b = LOOP_FROM + (beat % (LOOP_TO - LOOP_FROM));
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
    // every cue time in the run: the table's once, or in a respawn its scratch and chirp bars from the run's start, round again
    const cues: { at: number; stroke?: DjStroke }[] = [];
    if (!r.loop) cues.push(...DJ_ROUTINE);
    else for (let k = 0; k * (LOOP_TO - LOOP_FROM) < beats; k++) for (const c of DJ_ROUTINE) if (c.at >= LOOP_FROM && c.at < LOOP_TO) cues.push({ at: c.at - LOOP_FROM + k * (LOOP_TO - LOOP_FROM), stroke: c.stroke });
    const stop = r.loop ? hypeFrom(beats) : DJ_ROUTINE_BEATS; // (the hype: nothing heard from the table)
    cues.forEach((c, i) => {
      if (!c.stroke || c.at >= stop) return;
      const at = timeAt(g.beat, b0 + c.at);
      if (at < a || at >= e) return;
      const next = Math.min(cues[i + 1]?.at ?? DJ_ROUTINE_BEATS, stop);
      out.push({ at, stroke: c.stroke, len: timeAt(g.beat, b0 + next) - at });
    });
  }
  return out.sort((x, y) => x.at - y.at);
}

