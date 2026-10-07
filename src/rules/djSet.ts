// Her set at the decks (Ed, 2026-10-07: "before the first music starts, the dj witch can drop the needle and do a little
// scratching performance. Every time she respawns she could do a bit of scratching"): the routines she plays behind the decks,
// on the beat clock (rules/beat.ts), so the animation (render/view/witch.ts, art/witch.js's dj frames) and the sound (the music
// builder's, from scratchStrokes) land on the same sixteenths.
//   needle: the party spell cast, on the first beat after its burst (PARTY_CAST) she lifts the tonearm (a beat), puts it down
//           (a beat: the needle touches at its end, needleDownAt), then scratches dj.scratchBeats beats; she's held at the
//           decks till it ends (heldByNeedle), then free to step off. A game without the spell has none.
//   respawn: back behind her decks after a knockout (rules/knockout.ts), she scratches from the first beat after she's back
//           till her respawn wait ends (respawnUntil: the tuning's knockout.respawn, the hotel builder's), a hand thrown up
//           on its last beat.
// Pure: game time in, game time out.
import { beatAt, timeAt, type BeatClock } from "./beat";
import { PARTY_CAST, type PartyState } from "./party";
import type { Tuning } from "./tuning";

/** One bar of scratching, sixteenth by sixteenth: 0 rest, 1 the record pushed forward, -1 pulled back, 2 a crossfader cut
 *  (the sound cut, the hand on the record still). A baby scratch into a chirp, then a transform's cuts. */
export const SCRATCH_BAR: readonly number[] = [1, -1, 1, -1, 2, 1, -1, 0, 1, 0, -1, 2, 1, -1, 2, -1];
/** A stroke of the pattern: its game time, which way (1 forward, -1 back, 2 a cut) and how long it lasts (seconds, to the next sixteenth). */
export interface Stroke { at: number; dir: number; len: number }
export type DjStep = "lift" | "place" | "scratch" | "flourish";
export interface DjRoutine { kind: "needle" | "respawn"; step: DjStep; /** beats into the routine */ beat: number; /** game times it starts and ends */ start: number; end: number }

type Game = { beat: BeatClock; party: PartyState; tuning: Tuning };
const DJ = (t: Tuning) => ({ needleBeats: 2, scratchBeats: 8, ...t.dj });

/** The needle drop's window: its start (the first beat after the cast's burst), the needle down, and its end (game times). */
export function needleWindow(g: Game): { start: number; needleAt: number; end: number } | null {
  const sp = g.party.spellAt;
  if (typeof sp !== "number") return null;
  const D = DJ(g.tuning), b0 = Math.ceil(beatAt(g.beat, sp + PARTY_CAST) - 1e-6);
  return { start: timeAt(g.beat, b0), needleAt: timeAt(g.beat, b0 + D.needleBeats), end: timeAt(g.beat, b0 + D.needleBeats + D.scratchBeats) };
}
/** When the needle touches the record (game time), or null in a game without the party spell. */
export const needleDownAt = (g: Game): number | null => needleWindow(g)?.needleAt ?? null;
/** Held at the decks while she drops the needle and scratches (as the party spell holds her: rules/game.ts). */
export function heldByNeedle(g: Game, time: number): boolean {
  const w = needleWindow(g);
  return !!w && time >= g.party.spellAt! && time < w.end;
}

/** The respawn's window: from the first beat after she's back at the decks (`backAt`) to the end of her wait (`until`). */
export function respawnWindow(g: Game, backAt: number, until: number): { start: number; end: number } | null {
  if (!(until > backAt)) return null;
  const start = timeAt(g.beat, Math.ceil(beatAt(g.beat, backAt) - 1e-6));
  return start < until ? { start, end: until } : null;
}

/** What she's doing at the decks at `time`: the needle drop, or (given her respawn's back and until) the respawn scratching. */
export function djRoutine(g: Game, time: number, respawn?: { backAt: number; until: number } | null): DjRoutine | null {
  const w = needleWindow(g), D = DJ(g.tuning);
  if (w && time >= w.start && time < w.end) {
    const beat = beatAt(g.beat, time) - beatAt(g.beat, w.start);
    return { kind: "needle", step: beat < 1 ? "lift" : beat < D.needleBeats ? "place" : "scratch", beat, start: w.start, end: w.end };
  }
  const r = respawn ? respawnWindow(g, respawn.backAt, respawn.until) : null;
  if (r && time >= r.start && time < r.end) {
    const beat = beatAt(g.beat, time) - beatAt(g.beat, r.start), left = beatAt(g.beat, r.end) - beatAt(g.beat, time);
    return { kind: "respawn", step: left <= 1 && beat >= 1 ? "flourish" : "scratch", beat, start: r.start, end: r.end };
  }
  return null;
}

/** The scratch strokes falling in [from, to) (game times): in the needle drop's scratching and, given it, the respawn's
 *  (not on its last beat, the flourish). For the sound to schedule ahead; the animation reads scratchAt. */
export function scratchStrokes(g: Game, from: number, to: number, respawn?: { backAt: number; until: number } | null): Stroke[] {
  const out: Stroke[] = [], spans: [number, number][] = [];
  const w = needleWindow(g);
  if (w) spans.push([w.needleAt, w.end]);
  const r = respawn ? respawnWindow(g, respawn.backAt, respawn.until) : null;
  if (r) spans.push([r.start, timeAt(g.beat, Math.max(beatAt(g.beat, r.start), beatAt(g.beat, r.end) - 1))]);
  for (const [s, e] of spans) {
    const a = Math.max(s, from), b = Math.min(e, to);
    if (!(b > a)) continue;
    const s0 = beatAt(g.beat, s);
    for (let k = Math.ceil((beatAt(g.beat, a) - s0) * 4 - 1e-6); ; k++) {
      const at = timeAt(g.beat, s0 + k / 4);
      if (at >= b) break;
      const dir = SCRATCH_BAR[((k % 16) + 16) % 16];
      if (dir) out.push({ at, dir, len: timeAt(g.beat, s0 + (k + 1) / 4) - at });
    }
  }
  return out;
}

/** Her hands mid-scratch at `time`, from the beat its scratching began: the record's way (1 forward, -1 back: the last stroke's,
 *  a rest holding it) and the crossfader (open, or cut: each cut flips it). */
export function scratchAt(g: Game, from: number, time: number): { dir: number; open: boolean } {
  const k = Math.max(0, Math.floor((beatAt(g.beat, time) - beatAt(g.beat, from)) * 4)) % 16;
  let dir = -1, open = true;
  for (let i = 0; i <= k; i++) { const v = SCRATCH_BAR[i]; if (v === 2) open = !open; else if (v) dir = v; }
  return { dir, open };
}

/** Her respawn's window for djRoutine: when she was back at the decks and when her wait ends. None until the respawn wait
 *  is in the rules (the hotel builder's knockout.respawn). */
export function respawnOf(_g: Game): { backAt: number; until: number } | null { return null; }
