// Her set at the decks (Ed, 2026-10-07: "before the first music starts, the dj witch can drop the needle and do a little
// scratching performance. Every time she respawns she could do a bit of scratching"): a short routine she plays behind the
// decks, one table for the picture (render/view/witch.ts, art/witch.js's dj gestures) and the sound (the music builder's,
// sfxCues.ts: its strokes), on the beat clock (rules/beat.ts), so both land on the same sixteenths. Agreed with the music
// builder: the needle lifted and dropped, a nod, a bar of baby scratches, a bar of chirps (each stroke cut by the fader) and a
// spin-back, then her hand thrown up; 13 beats, about 6.5 s at 120 bpm.
// When: from the first whole beat after the party spell's burst (party.spellAt + PARTY_CAST), once through; and through the
// wait behind her decks after a knockout (the hotel builder's knockout.respawn, rules/knockout.ts: from ko.inAt, when she's
// back, to ko.backAt, a bar line: rules/game.ts hitWitch): Ed, 2026-10-09, "the music stops when she gets knocked down, and
// she comes back to restart it by putting on a new record ... it drops, she scratches, then the music starts": the needle
// dropped on the new record as she's back, then a little scratch performance "generated from the new seed each time"
// (scratchRoutine: phrases of baby scratches, chirps, transformers, flares, tears and stabs, a breath between, busier as it
// runs into the new record's first downbeat, the music's re-seeded start: rules/musicPlan.ts formClock). Only while she's at the
// decks (seated): if she steps off mid-routine it stops. After the party spell she's held at the decks till its end (Ed,
// 2026-10-07: "the first music starts straight after the needle-drop routine ... She IS held at the decks until it ends";
// heldByRoutine, rules/game.ts), the music dropping then (djIntroEnd: the music builder's); a knockdown's wait is the rules' own.
// Pure: game time in, game time out.
import { beatAt, timeAt, type BeatClock } from "./beat";
import { PARTY_CAST, type PartyState } from "./party";
import { hash2 } from "./random";
import { musicSeed } from "./musicScore";

/** What's heard: the tonearm lifted, the needle dropped, a stroke forward or back, a chirp (a stroke cut by the fader), a
 *  spin-back; and the respawn routine's (Ed, 2026-10-09): a transformer (a stroke the fader chops into pulses), a flare (a
 *  stroke the fader clicks off once in its middle), a tear (a forward stroke in two pushes), a stab (a short, hard push). */
export type DjStroke = "lift" | "drop" | "f" | "b" | "chirp" | "spin" | "trans" | "flare" | "tear" | "stab";
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

type Game = { beat: BeatClock; party: PartyState; witch: { seated?: boolean }; witches?: { ko: { inAt?: number; backAt: number } | null }[]; clock?: { time: number }; herTime?: number; seed?: number; knockdowns?: readonly unknown[] };

/** Her scratch techniques, a beat each: [beat offset, stroke] (Ed, 2026-10-09: "a little scratch performance during the
 *  respawn wait period, generated from the new seed each time"). */
const TECHNIQUES: Record<string, [number, DjStroke][]> = {
  baby: [[0, "f"], [0.5, "b"]], babyFast: [[0, "f"], [0.25, "b"], [0.5, "f"], [0.75, "b"]],
  chirp: [[0, "chirp"], [0.5, "chirp"]], chirpFast: [[0, "chirp"], [0.25, "chirp"], [0.5, "chirp"], [0.75, "chirp"]],
  transformer: [[0, "trans"], [0.5, "trans"]], flare: [[0, "flare"], [0.5, "b"]], tear: [[0, "tear"], [0.5, "b"]],
  stab: [[0, "stab"], [0.5, "stab"], [0.75, "stab"]],
};
/** By how far into the routine (calm, building, the run into the downbeat). */
const TIERS = [["baby", "chirp", "tear"], ["babyFast", "flare", "transformer", "chirp"], ["chirpFast", "transformer", "stab", "babyFast"]];
/** The gesture the picture plays for a stroke: her hand on the record, or on the crossfader. */
const GESTURE: Record<DjStroke, string> = { lift: "needle", drop: "needle", f: "scratch", b: "scratch", tear: "scratch", chirp: "chirp", stab: "chirp", spin: "spin", trans: "fader", flare: "fader" };

/** Her scratch routine for `beats` whole beats, from a seed (the new record's: each knockdown its own): phrases of 2 to 4
 *  beats with a beat's breath between, the last running into the downbeat, busier as it goes; beats before the first
 *  phrase grooving. Cues at beats from its start. */
export function scratchRoutine(seed: number, beats: number): DjCue[] {
  const N = Math.max(0, Math.floor(beats + 1e-6)), phrases: [number, number][] = [];
  let end = N;
  while (end >= 1) {
    const len = Math.min(end, phrases.length === 0 ? 4 : 2 + Math.floor(hash2(seed, 601, phrases.length) * 3));
    phrases.unshift([end - len, len]);
    end = end - len - 1; // (a beat's breath)
  }
  const out: DjCue[] = [];
  const grooveTo = phrases.length ? phrases[0][0] : N;
  for (let b = 0; b < grooveTo; b++) out.push(...groove(b));
  phrases.forEach(([from, len], p) => {
    for (let b = from; b < from + len; b++) {
      const tier = TIERS[Math.min(2, Math.floor(((b + 0.5) / Math.max(1, N)) * 3))], last = p === phrases.length - 1 && b === N - 1;
      const tech = last ? (hash2(seed, 607, b) < 0.5 ? "chirpFast" : "stab") : tier[Math.floor(hash2(seed, 603, b) * tier.length)];
      TECHNIQUES[tech].forEach(([at, stroke], i) => out.push({ at: b + at, gesture: GESTURE[stroke], frame: (stroke === "b" ? 0 : stroke === "f" || stroke === "tear" ? 1 : i % 2) as 0 | 1, stroke }));
    }
    if (p < phrases.length - 1) out.push(...groove(from + len)); // (the breath)
  });
  return out.sort((a, b) => a.at - b.at);
}

/** A respawn run's cues (beats from its start, `lead` the beats from it to the first whole beat a beat on): the needle
 *  dropped on the new record as she's back, a groove while it finds the groove, then her routine to the downbeat. */
function respawnCues(g: Game, lead: number, beats: number): DjCue[] {
  const seed = musicSeed(g.seed ?? 0, g.knockdowns?.length ?? 1);
  return [{ at: 0, gesture: "needle", frame: 1, stroke: "drop" }, ...(lead > 0.5 ? [{ at: Math.min(0.5, lead / 2), gesture: "groove", frame: 0 as const }] : []),
    ...scratchRoutine(seed, beats).map(c => ({ ...c, at: c.at + lead }))];
}
/** Her wait at the decks after a knockout (rules/knockout.ts: back at inAt, free at backAt), or null; in game time (the beat
 *  clock's: the knockout's times are on her own clock, g.herTime, which a legend's slowed circle sets apart from the world's). */
export function respawnOf(g: Game): { inAt: number; backAt: number } | null {
  const k = g.witches?.[0]?.ko;
  if (!k || typeof k.inAt !== "number" || !(k.backAt > k.inAt)) return null;
  const off = g.clock && typeof g.herTime === "number" ? g.clock.time - g.herTime : 0;
  return { inAt: k.inAt + off, backAt: k.backAt + off };
}
const nextBeat = (g: Game, t: number) => timeAt(g.beat, Math.ceil(beatAt(g.beat, t) - 1e-6));
/** The routine's runs: each its start and end (game times), and whether it's a respawn's (looping to fill its wait). */
function runs(g: Game): { start: number; end: number; loop: boolean }[] {
  const out: { start: number; end: number; loop: boolean }[] = [], sp = g.party.spellAt, r = respawnOf(g);
  const span = (s: number, beats: number) => timeAt(g.beat, beatAt(g.beat, s) + beats);
  if (typeof sp === "number") { const s = nextBeat(g, sp + PARTY_CAST); out.push({ start: s, end: span(s, DJ_ROUTINE_BEATS), loop: false }); }
  if (r && r.inAt < r.backAt) out.push({ start: r.inAt, end: r.backAt, loop: true }); // (the needle down on the new record as she's back: Ed, 2026-10-09)
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
/** A run's cues (beats from its start) and its length in beats: the table's once after the party spell; a respawn's, the
 *  needle and her seeded routine to the downbeat its wait ends on. */
function runCues(g: Game, r: { start: number; end: number; loop: boolean }): { cues: readonly DjCue[]; beats: number } {
  if (!r.loop) return { cues: DJ_ROUTINE, beats: DJ_ROUTINE_BEATS };
  const b0 = beatAt(g.beat, r.start), beats = beatAt(g.beat, r.end) - b0, lead = Math.min(beats, Math.ceil(b0 + 0.75 - 1e-9) - b0);
  return { cues: respawnCues(g, lead, beats - lead), beats };
}
/** Where she is in the routine at `time`: its gesture and frame, the beats in and its start; null outside one. */
export function djRoutineAt(g: Game, time: number): { gesture: string; frame: 0 | 1; beat: number; start: number } | null {
  const r = runAt(g, time);
  if (!r) return null;
  const beat = beatAt(g.beat, time) - beatAt(g.beat, r.start), { cues } = runCues(g, r);
  let cue = cues[0];
  for (const c of cues) if (c.at <= beat + 1e-9) cue = c; else break;
  return { gesture: cue.gesture, frame: cue.frame, beat, start: r.start };
}
/** The strokes heard in [from, to) (game times), for the sound to schedule ahead: each its time, kind and length (to the next
 *  cue, in seconds). Only in a run she's in at the stroke (seated), as the picture plays it. */
export function djStrokes(g: Game, from: number, to: number): { at: number; stroke: DjStroke; len: number }[] {
  const out: { at: number; stroke: DjStroke; len: number }[] = [];
  for (const r of runs(g)) {
    const a = Math.max(from, r.start), e = Math.min(to, r.end);
    if (!(e > a) || !g.witch.seated) continue;
    const b0 = beatAt(g.beat, r.start), { cues, beats } = runCues(g, r);
    cues.forEach((c, i) => {
      if (!c.stroke || c.at >= beats) return;
      const at = timeAt(g.beat, b0 + c.at);
      if (at < a || at >= e) return;
      const next = Math.min(cues[i + 1]?.at ?? beats, beats);
      out.push({ at, stroke: c.stroke, len: timeAt(g.beat, b0 + next) - at });
    });
  }
  return out.sort((x, y) => x.at - y.at);
}
