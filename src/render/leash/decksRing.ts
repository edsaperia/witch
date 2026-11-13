// The decks' analyser ring at the party start (Ed, 2026-11-12: "At the decks, when the party starts, there is a visual effect - I want
// to remove this. I think this was added as part of the creature magic effects. Instead I want something like the soundsystem spell
// (audio analyser ring)"). As she casts the party spell at her decks, the soundsystem spell's flat analyser (a wave's soundsystem
// appearing on a great stump, render/leash/stones.ts analyserBloom: every bar at once, the music's spectrum, the rainbow drifting round)
// lies on the Terrace's floor round her decks: it grows out over the cast's burst (PARTY_CAST), plays through her needle-drop routine
// and the drop (rules/djSet.ts djIntroEnd), holds a bar into the music and fades. The decks' replay (E at them once the party's on,
// "make some noise!!!": render/view/frame.ts replayPartyStart) plays it again. It replaces the party start's pieces (render/partyStart.ts:
// the sparkles, the pillar, the dome, the light, the shake, the floor glow and the heat ripple, from #1468's magic effects and #1721),
// which `?decksfx=old` brings back, without the ring, to compare. Drawing only: nothing here touches the game.
// Since Ed, 2026-11-13 ("fix the others": what the first clip of it showed, a smooth even rainbow band with no bars and no pulse,
// nothing live before the music, its front out over the drop):
// - separate bars: fewer of them and thinner (DECKS_RING), a gap between each all the way in, and each bar's whole length the
//   music's level (analyserBloom's `least`: a silent bar a stub, a loud one to the edge), so the kick pumps the bass bars at its
//   front;
// - before the drop, while the mix is silent (her needle-drop routine), a sweep on the beat's clock: two lobes of bars going round
//   once a bar, the whole ring ticking up on each beat (decksIdle); the music's own levels take over as it comes in;
// - on the Terrace's floor as it's drawn: each dot placed through the oak's art's own view of its floor (LeashView.floorAt, as her
//   feet and the furniture are; the first lay flat in the camera's view of the ground, a flatter ellipse than the floor's, so its
//   front hung past the rim), and each bar stopped short of the floor's rim (rules/houseRooms.ts floorDistance).
import { PARTY_CAST } from "../../rules/party";
import { djIntroEnd, djStrokeAgo } from "../../rules/djSet";
import { beatAt, timeAt } from "../../rules/beat";
import type { Game } from "../../rules/game";
import { deckOf } from "../../rules/treehouse";
import { floorDistance } from "../../rules/houseRooms";
import type * as THREE from "three";
import type { LeashView } from "../leash";
import { groundHeight } from "../height";
import { entDepth } from "../view/home";
import { analyserBloom, barLevel, type BarTip, type DotLayer, type FlatRing, type RingLayers } from "./stones";
import { rainbow } from "../indicator";

/** ?decksfx=old: the party start's pieces as they were and no ring, to compare (the tests set `old` themselves). Read once, from the link. */
export const DECKS_FX = { old: new URLSearchParams(globalThis.location?.search ?? "").get("decksfx") === "old" };

/** One showing of the ring: the decks' middle as drawn (y over the ground: the Terrace's floor) and their desk's width (m), and on the
 *  world's clock (the beat's and the music's) when it starts, when it's fully grown and when it starts to fade. */
export interface DecksRing { x: number; y: number; z: number; width: number; at: number; grown: number; until: number; /** how loud the mix has lately been (0 to 1, falling slowly): the idle sweep's fade */ live?: number; /** how far out each bar may reach (m): the floor's rim, found once */ rim?: number[]; /** its analyser begun: its bars from nothing */ heard?: boolean }

/** Its sizes, to the decks' desk (config/house/base.json terrace.decks: 5 m wide, its art about 3 m as drawn), in desk widths: its
 *  first dot past the desk's ends as drawn (`inner`), its bars reaching out to `edge` all round where the floor does. Bars to read
 *  as bars (Ed, 2026-11-13; the first had a stump's 72 of 0.36 m dots, 0.16 m apart at its inner edge: one smooth band): `bars` of
 *  them, of dots `cell` m, so even at the inner edge the gap between two is most of a dot wide; their glow kept under a stump's (its
 *  halo is 1.8 dots wide: brighter, it fills the gaps again). `least`: a silent bar's share of the way out (a stub; a stump's bloom
 *  0.55); `margin`: how far short of the floor's rim a bar stops (m). */
export const DECKS_RING = { inner: 0.4, edge: 0.84, cell: 0.26, fill: 1, glow: 0.5, bars: 28, least: 0.08, margin: 0.3 } as const;
/** How far in front of the Terrace's near half (render/view/home.ts entDepth: its art stood past the desk's front, in front of her)
 *  a dot is drawn, at most (m along its ray): over the floor that half draws, still behind the DJ table drawn over it (DJ_DEPTH.fore,
 *  0.25 m nearer). */
export const DECKS_RING_LIFT = 0.1;
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

/** A layer that draws each dot no deeper than `depth` (the camera's view depth, m): one farther is moved along its own ray to it,
 *  shrunk to cover the same pixels (render/view/home.ts alongRay, in the world's heights). The Terrace is drawn as the oak's art in
 *  two halves stood at depths either side of her (entDepth), not as a floor, so a dot lying behind the near half's depth was hidden
 *  by that half's floor: the ring's whole back half (seen in the game, 2026-11-12). */
export function noDeeper(into: DotLayer, camera: THREE.Camera, depth: number): DotLayer {
  const m = camera.matrixWorldInverse.elements, c = camera.position;
  return { add(x, y, z, size, uv, r, g, b, a, draw, glow) {
    const wy = y + groundHeight(x, z), d = -(m[2] * x + m[6] * wy + m[10] * z + m[14]);
    if (d > depth && d > 0) {
      const k = depth / d; x = c.x + (x - c.x) * k; z = c.z + (z - c.z) * k;
      y = c.y + (wy - c.y) * k - groundHeight(x, z); size *= k;
    }
    into.add(x, y, z, size, uv, r, g, b, a, draw, glow);
  } };
}

/** The view depth of the Terrace's near half (render/view/home.ts placeTreehouse: the deck's middle on its floor, moved along its
 *  ray by entDepth's near, slid with the house's drawing as the decks are, LeashView.seatSlide); null without the house's Terrace. */
export function nearHalfDepth(lv: LeashView, camera: THREE.Camera): number | null {
  const D = deckOf(lv.game.map, lv.game.tuning);
  if (!D?.house) return null;
  const c = camera.position, sl = lv.seatSlide, x = D.x, y = D.h + groundHeight(D.x, D.z), z = D.z, near = entDepth(D).near;
  const l = Math.hypot(x - c.x, y - c.y, z - c.z) || 1, k = (l - near) / l, m = camera.matrixWorldInverse.elements;
  const px = c.x + (x - c.x) * k + sl.x, py = c.y + (y - c.y) * k + sl.y, pz = c.z + (z - c.z) * k + sl.z;
  return -(m[2] * px + m[6] * py + m[10] * pz + m[14]);
}

/** A layer whose dots lie on the house's floor as it's drawn (LeashView.floorAt): each one's place in the world (x, z) taken to
 *  where the oak's art draws that spot of its floor, `lift` m over it; one `keep` turns down (off the floor) isn't drawn. */
export function onDrawnFloor(into: DotLayer, floorAt: (x: number, z: number) => { x: number; y: number; z: number }, lift: number, keep?: (x: number, z: number) => boolean): DotLayer {
  return { add(x, _y, z, size, uv, r, g, b, a, draw, glow) { if (keep && !keep(x, z)) return; const p = floorAt(x, z); into.add(p.x, p.y + lift, p.z, size, uv, r, g, b, a, draw, glow); } };
}

/** The idle sweep (Ed, 2026-11-13, of the 8.7 s before the drop: the mix silent, so nothing live to show; her needle-drop routine's
 *  scratches are the sounds', not the music's, platform/audio/sfx): bar at `f` (0 to 1 round) at `beats` on the beat's clock, the
 *  last stroke of her routine `stroke` beats ago (rules/djSet.ts djStrokeAgo; null: none). Two lobes of tall bars opposite each
 *  other going round once a bar (4 beats), and every bar jumping on each stroke she plays (the needle, each scratch and chirp, the
 *  spin-back: the same table as their sound) and settling. 0 to 1. */
export function decksIdle(f: number, beats: number, stroke: number | null = null): number {
  const lobe = Math.pow(0.5 + 0.5 * Math.cos(4 * Math.PI * (f - beats / 4)), 3), jump = stroke === null ? 0 : Math.exp(-5 * Math.max(0, stroke));
  return Math.min(1, 0.1 + 0.5 * lobe + 0.4 * jump);
}

/** The music's levels read for the bars, in decibels. A bin under `floor` is silent; a bar stands as tall as its bin is loud between
 *  `floor` and `top` (`low`: the share of the height the quietest heard bin still has), times how near the bin is to its own loudest
 *  lately (within `range` dB of it: a peak that falls `drop` dB a second), so every bar moves through its whole height with the
 *  music whatever its level: a kick lifts the bass bars to the top and they fall right back between two. (Measured in the game,
 *  2026-11-13: the first bars' low end sits at -28 to -36 dB the whole time, over the 0-255 read's top, -30 dB, so read that way the
 *  bass bars stood still at full height; nothing over 3 kHz there.) `fall`: how fast a bar falls back (its height a second). */
export const DECKS_LEVELS = { floor: -95, top: -35, low: 0.35, range: 10, drop: 4, fall: 3 } as const;
/** A bin of the 0-255 read as decibels (an analyser's: -100 to -30 dB), for a page with only that read (and the tests). */
export const byteDb = (v: number): number => -100 + (70 * v) / 255;

/** The ring's analyser: each bin's loudest lately (dB), the bins' levels this frame (0-255, as barLevel takes them) and the bars' eased heights. */
const decksPeak = new Float32Array(128).fill(-200), decksBins = new Float32Array(128), decksLev = new Float32Array(128);
/** Which of the analyser's bars (0 its front, the bass; n/2 its back, the treble) the decks' bar i of n shows: the analyser's ring
 *  wrapped twice round, its front at the decks' two sides (bar n/4, due west, and 3n/4, due east: the bass pumps either side of
 *  her, like a stack each side), its back due south and due north, where the table, she and the rim take the bars. */
export const decksBar = (i: number, n: number): number => (2 * i + n / 2) % n;

/** The bars' levels this frame: the music's spectrum as the soundsystem spell's analyser spreads it over its bars (barLevel: the
 *  bass at its front, the treble at its back), from the unclipped read (StoneView.spectrumDb; without it the 0-255 one), each bin by
 *  DECKS_LEVELS, rising at once and falling back; and while the mix is silent, or no audio runs, the idle sweep (decksIdle), fading
 *  out as the music comes in (`R.live`, how loud the mix's loudest bin has lately been). */
export function decksLevels(lv: LeashView, R: DecksRing): (i: number, m: number) => number {
  const g = lv.game, V = lv.stoneView, db = V.spectrumDb, bytes = V.spectrum, K = DECKS_LEVELS, dt = Math.min(0.1, lv.frameDt), n = DECKS_RING.bars;
  const bins = db ? db.length : bytes ? bytes.length : 0;
  if (!R.heard) { R.heard = true; decksLev.fill(0); decksPeak.fill(-200); }
  let loud = 0;
  for (let b = 0; b < bins; b++) {
    const d = db ? db[b] : byteDb(bytes![b]), heard = d > K.floor;
    const peak = (decksPeak[b] = Math.max(d, decksPeak[b] - dt * K.drop, K.floor)), near = Math.max(0, Math.min(1, (d - (peak - K.range)) / K.range));
    const share = Math.max(0, Math.min(1, (d - K.floor) / (K.top - K.floor)));
    decksBins[b] = heard ? 255 * near * near * (K.low + (1 - K.low) * Math.sqrt(share)) : 0;
    loud = Math.max(loud, share);
  }
  const view = decksBins.subarray(0, bins);
  for (let j = 0; j < n; j++) decksLev[j] = Math.max(bins ? barLevel(view, j, n) : 0, decksLev[j] - dt * K.fall);
  R.live = Math.max(loud, (R.live ?? 0) - dt * 0.5);
  const idle = 1 - Math.min(1, R.live / DECKS_LIVE), beats = beatAt(g.beat, g.clock.time), stroke = idle > 0 ? djStrokeAgo(g, g.clock.time) : null;
  return (i: number, m: number) => Math.max(m === n ? decksLev[decksBar(i, n)] : 0, idle > 0 ? idle * decksIdle(i / m, beats, stroke) : 0);
}
/** How loud the mix must be (its loudest bin's share of the way from DECKS_LEVELS' floor to its top) for the idle sweep to be gone altogether. */
export const DECKS_LIVE = 0.3;

/** How far out from the decks' middle (x, z in the world) a bar at angle `a` may reach (m): to `edge`, or `margin` short of the
 *  house's floor's rim if that's nearer (its last step still on the floor). */
export function reachOnFloor(g: Game, x: number, z: number, a: number, edge: number, margin: number): number {
  const F = deckOf(g.map, g.tuning)?.house?.rooms;
  if (!F) return edge;
  const ux = Math.cos(a), uz = Math.sin(a);
  for (let r = 0; r <= edge + margin; r += 0.1) if (floorDistance(F, x + ux * r, z + uz * r) > 0) return Math.max(0, r - 0.1 - margin);
  return edge;
}

/** A frame (render/leash.ts, after the stones, whose analyser it shares: the music's spectrum and the bars' eased levels): the ring
 *  on the Terrace's floor round the decks, if it's showing; `time` her clock (the rainbow's drift). Drawn over the house's floors
 *  (render/leash.ts DECKS_RING_ORDER), depth-tested, each dot no deeper than just in front of the Terrace's near half (noDeeper), so
 *  the whole ring shows round the decks and the DJ table in front of it still covers it (tried in the game, 2026-11-12). With the
 *  house drawn (LeashView.floorAt), round the desk's own place on the floor, each dot where the art draws that spot (onDrawnFloor)
 *  and each bar kept on the floor (reachOnFloor); without it (the old studio), round the decks' middle as drawn, flat. */
export function drawDecksRing(lv: LeashView, time: number, dot: number[], camera?: THREE.Camera): void {
  const R = DECKS_FX.old ? null : lv.decksRing, P = R ? decksRingPhase(R, lv.game.clock.time) : null;
  lv.stoneView.wantsDb = false;
  if (!R || !P || P.alpha <= 0.002) return;
  lv.stoneView.wantsSpectrum = lv.stoneView.wantsDb = true; // (the mix's spectrum for the bars, unclipped, from the next frame: app/pageFrame.ts)
  const K = DECKS_RING, g = lv.game, H = deckOf(g.map, g.tuning)?.house, desk = lv.decksOnFloor, F = desk ? lv.floorAt : null;
  const floor = H?.rooms, on = floor ? (x: number, z: number) => floorDistance(floor, x, z) <= 0 : undefined; // (a bar with no room at all, its first dot off the floor: not drawn)
  const S: FlatRing = { inner: K.inner * R.width, cell: K.cell, fill: K.fill, glow: K.glow }, edge = K.edge * R.width;
  const near = camera ? nearHalfDepth(lv, camera) : null, lift = F ? 0.06 : R.y + 0.06;
  const front = (l: DotLayer) => (near === null ? l : noDeeper(l, camera!, near - DECKS_RING_LIFT)), laid = (l: DotLayer) => (F ? onDrawnFloor(front(l), F, lift, on) : front(l));
  const L: RingLayers = { ink: laid(lv.decksInk), glow: laid(lv.decksGlow), y: lift };
  const x0 = F ? desk!.x : R.x, z0 = F ? desk!.z : R.z;
  if (F && R.rim?.length !== K.bars) R.rim = Array.from({ length: K.bars }, (_, i) => reachOnFloor(g, x0, z0, Math.PI / 2 + (i / K.bars) * Math.PI * 2, edge, K.margin));
  const rim = F ? R.rim! : null, reach = rim ? (a: number) => rim[Math.round(((a - Math.PI / 2) / (Math.PI * 2)) * K.bars) % K.bars] : edge;
  // Glowing (Ed, 2026-11-13, asked whether to extend the creatures' glow to her magic: "extend"; render/fx/spellGlow.ts): each
  // bar's tip a glowing core in the bar's colour with its dithered halo, its pool of light on the floor under it (both on the floor
  // as drawn, in the ring's own layers over the house: LeashView.decksHalo), and one real light over the decks in the rainbow's
  // drifting colour, as strong as the ring is grown and shown (steady: the bars move with the music, the light doesn't flicker).
  const magic = (lv.look as LeashView["look"] | undefined)?.magic, G = DECKS_GLOW, data = magic?.herData("party", true) ?? null; // (none in a view with no magic: the tests' stand-ins)
  const halo = data ? laid(lv.decksHalo.core) : null, pool = data ? laid(lv.decksHalo.pool) : null, span = magic?.batches.spellGlow.value.w ?? 1;
  const tipAt: BarTip | undefined = data ? (x, z, c, a, k) => {
    const s = a * (G.least + (1 - G.least) * k); // (a bar far out, a loud one, glows brighter: the kick's bass bars brightest)
    pool!.add(x, lift - 0.03, z, G.pool, data, c[0], c[1], c[2], s * G.poolAlpha);
    halo!.add(x, lift + G.lift, z, G.core * span, data, c[0], c[1], c[2], s);
  } : undefined;
  analyserBloom(L, dot, S, x0, z0, reach, K.bars, P.fill, P.alpha, decksLevels(lv, R), time, K.least, tipAt);
  if (data) magic!.lamp("decksRing", R.x, R.y + G.lightY, R.z, rainbow(time * 0.05), G.reach, G.light * P.fill * P.alpha, 2);
}
/** The ring's glow (her own magic's: render/fx/spellGlow.ts): each bar's tip's glowing core `core` m across, `lift` m over the
 *  floor, its pool on the floor `pool` m across and `poolAlpha` strong; a silent bar's tip `least` as bright as a full one's; its
 *  one light `lightY` m over the decks, reaching `reach` m, `light` strong (a creature's strongest spell's is 0.85). */
export const DECKS_GLOW = { core: 0.3, lift: 0.12, pool: 1.1, poolAlpha: 0.8, least: 0.45, lightY: 3, reach: 16, light: 0.7 } as const;
