// The decks' analyser ring at the party start (Ed, 2026-11-12: "At the decks, when the party starts, there is a visual effect - I want
// to remove this. I think this was added as part of the creature magic effects. Instead I want something like the soundsystem spell
// (audio analyser ring)"). As she casts the party spell at her decks, the soundsystem spell's flat analyser (a wave's soundsystem
// appearing on a great stump, render/leash/stones.ts analyserBloom: every bar at once, the music's spectrum, the rainbow drifting round)
// lies on the Terrace's floor round her decks: it grows out over the cast's burst (PARTY_CAST), plays through her needle-drop routine
// and the drop (rules/djSet.ts djIntroEnd), holds a bar into the music and fades. The decks' replay (E at them once the party's on,
// "make some noise!!!": render/view/frame.ts replayPartyStart) plays it again. It replaces the party start's pieces (render/partyStart.ts:
// the sparkles, the pillar, the dome, the light, the shake, the floor glow and the heat ripple, from #1468's magic effects and #1721),
// which `?decksfx=old` brings back, without the ring, to compare. Drawing only: nothing here touches the game.
import { PARTY_CAST } from "../../rules/party";
import { djIntroEnd } from "../../rules/djSet";
import { beatAt, timeAt } from "../../rules/beat";
import type { Game } from "../../rules/game";
import { deckOf } from "../../rules/treehouse";
import type { LeashView } from "../leash";
import { analyserBloom, analyserLevels, type FlatRing, type RingLayers } from "./stones";

/** ?decksfx=old: the party start's pieces as they were and no ring, to compare (the tests set `old` themselves). Read once, from the link. */
export const DECKS_FX = { old: new URLSearchParams(globalThis.location?.search ?? "").get("decksfx") === "old" };

/** One showing of the ring: the decks' middle as drawn (y over the ground: the Terrace's floor) and their desk's width (m), and on the
 *  world's clock (the beat's and the music's) when it starts, when it's fully grown and when it starts to fade. */
export interface DecksRing { x: number; y: number; z: number; width: number; at: number; grown: number; until: number }

/** Its sizes, to the decks' desk (config/house/base.json terrace.decks: 5 m wide), in desk widths: its first dot just past the desk's
 *  ends (`inner`), its bars reaching out to `edge` all round; the dots, their spacing and their glow a great stump's
 *  (runeMarkers.stump.ring), as many bars round as a stump's dial (twice cast.bars). */
export const DECKS_RING = { inner: 0.56, edge: 1.2, cell: 0.45, fill: 0.94, glow: 1.2, bars: 72 } as const;
/** The desk's width when the house has none to give (the old studio): the Terrace's. */
export const DECKS_WIDTH = 5;
/** Bars held a bar into the music (4 beats) after the drop, then a fade of 2 s (a wave's soundsystem's, runeMarkers.stump.ring.wave). */
export const DECKS_RING_HOLD_BEATS = 4, DECKS_RING_FADE = 2;
/** A replay's hold, in beats after its growth (it has no routine: four bars of the music playing). */
export const DECKS_RING_REPLAY_BEATS = 16;

/** The decks' middle as drawn, from her feet as drawn behind them (`feet`: render/view/witch.ts, the party start's anchor; y over the
 *  ground, the floor's), moved by the desk's offset from her seat on the house's plan (config/house/base.json terrace: 1.6 m nearer
 *  the camera), and the desk's width. */
export function decksMiddle(g: Game, feet: { x: number; y: number; z: number }): { x: number; y: number; z: number; width: number } {
  const D = deckOf(g.map, g.tuning), desk = D?.house?.desk;
  return desk ? { x: feet.x + desk.x - D!.seat.x, y: feet.y, z: feet.z + desk.z - D!.seat.z, width: desk.w || DECKS_WIDTH } : { ...feet, width: DECKS_WIDTH };
}

/** The ring for a show at the decks starting at `at` (the world's clock), at her feet as drawn (decksMiddle): the cast's (`replay`
 *  false: held through her routine to a bar past the drop) or a replay's (four bars). */
export function decksRingAt(g: Game, feet: { x: number; y: number; z: number }, at: number, replay: boolean): DecksRing {
  const grown = at + PARTY_CAST, drop = replay ? null : djIntroEnd(g);
  const until = drop !== null && drop > grown ? timeAt(g.beat, beatAt(g.beat, drop) + DECKS_RING_HOLD_BEATS) : timeAt(g.beat, beatAt(g.beat, grown) + (replay ? DECKS_RING_REPLAY_BEATS : DECKS_RING_HOLD_BEATS));
  return { ...decksMiddle(g, feet), at, grown, until: Math.max(grown, until) };
}

/** The ring's growth (0 to 1) and strength (0 to 1, its fade) at `now` (the world's clock); null: not showing. */
export function decksRingPhase(R: DecksRing, now: number): { fill: number; alpha: number } | null {
  if (now < R.at || now >= R.until + DECKS_RING_FADE) return null;
  const s = (k: number) => { const q = Math.max(0, Math.min(1, k)); return q * q * (3 - 2 * q); };
  return { fill: s((now - R.at) / Math.max(0.05, R.grown - R.at)), alpha: 1 - s((now - R.until) / DECKS_RING_FADE) };
}

/** A replay while the ring's still up (not yet fading) keeps it up from where it is, for the replay's hold; otherwise a new one. */
export function replayRing(was: DecksRing | null, next: DecksRing, now: number): DecksRing {
  return was && now >= was.at && now < was.until ? { ...was, until: Math.max(was.until, next.until) } : next;
}

/** A frame (render/leash.ts, after the stones, whose analyser it shares: the music's spectrum and the bars' eased levels): the ring
 *  over the house at the decks, if it's showing; `time` her clock (the rainbow's drift). */
export function drawDecksRing(lv: LeashView, time: number, dot: number[]): void {
  const R = DECKS_FX.old ? null : lv.decksRing, P = R ? decksRingPhase(R, lv.game.clock.time) : null;
  if (!R || !P || P.alpha <= 0.002) return;
  lv.stoneView.wantsSpectrum = true; // (the mix's spectrum for the bars, from the next frame: main.ts)
  const S: FlatRing = { inner: DECKS_RING.inner * R.width, cell: DECKS_RING.cell, fill: DECKS_RING.fill, glow: DECKS_RING.glow };
  const L: RingLayers = { ink: lv.decksInk, glow: lv.decksGlow, y: R.y + 0.06 };
  analyserBloom(L, dot, S, R.x, R.z, DECKS_RING.edge * R.width, DECKS_RING.bars, P.fill, P.alpha, analyserLevels(lv, time), time);
}
