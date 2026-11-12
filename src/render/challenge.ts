// The challenge area's look (rules/challenge.ts; Ed, 2026-11-03: "a large stone floor circle (like the legend circle) with the glowing
// sigil of the island carved into it, with a circle of stone columns around the edge (we already have art for this)"):
//   - the floor: a legend circle's (render/ground.ts, its flagstones, its area's stone and debris, render/legendFloor.ts), drawn in
//     the ground's last legend-circle slot with no carving of its own (view.ts legendRings: challengeRing); the island's sigil
//     (art/sigils.js islandSigil: home's the World Tree) carved into it by the ground's own pass (Ed, 2026-11-03, on #1725: "it
//     should look like it's carved into the circle", not a pixellated glyph over it): its legendary sigil's mask at 768 px across
//     the circle (render/legendCarving.ts bigCarvingMask), grooves with clean edges, shadowed walls and lit lips, a soft moonlit
//     glow in them following the fight (carvingLook; Ed, 2026-11-04, on #1804: asleep a little moonlight, waking red, fighting cold,
//     won warm, back to stone fading to dark; challengeCarving; render/ground.ts uChallengeCarve, uChallengeLook), and a little
//     moonlight on its stone floor so it reads as a circle (challenge.carving.floor);
//   - the columns: the classical ruins' standing column (art/landmarks.js "column"), drawn alone (a "find" art job, as tonight's find
//     is: render/view/finds.ts), round its edge (rules/challenge.ts columnSpots), one a kind of the island's roster;
//   - the columns are its sigil stack (Ed, 2026-11-03: "the sigils are on top of the columns, one type per column"): on each column's
//     top its kind's wild fighters still standing (rules/challenge.ts challengeColumns), adult below and youth above, drawn as a rune
//     stone's column draws its sigils (render/leash/stones.ts columnSigil: the rank's size, the wild colours, embers), and only
//     within the stones' columns' range of her (leash.ranks.stones.range, fading over `fade`), so they don't give the circle away
//     from far off (Ed removed the beam so finding it stays a task); one invited or run off, its sigil gone; a column with none
//     left, that kind won, its top lit steadily in the party's warm colour (the friends' adult's, leash.ranks.colours) where the
//     others glow faint and cold; every column lit, the spell's notes at its middle;
//   - no beam of light over it (Ed, 2026-11-03, on #1725: "remove the beam"): the telescope and the footpaths find it;
//   - its pack as statues (rules/challengeStatues.ts; Ed, 2026-11-04): their sigils on the columns grey while they're stone, glowing
//     from grey to their wild colours on the beat as they wake (render/statues.ts statueSigilColour); the statues themselves,
//     render/view/creatures.ts;
//   - ready to cast: the spell's music notes at its middle, as at a stone (render/leash/stones.ts); casting, the music spell's analyser
//     filling the whole circle (Ed, 2026-11-04: "should be larger, the audio analyser filling the whole stone circle"; challengeAnalyser:
//     its bars out from its middle to near its edge at the music's loudest, as the great stumps' dial, filling round as the cast fills),
//     held a moment as it's cleared;
//   - cleared: home's dancefloor fills the circle in place of its stone floor and sigil (Ed, 2026-11-03, on #1725: "it should fill
//     the circle, like the one at home does ... it can look the same as the home dancefloor, replacing the previous floor"): the
//     ground's dancefloor art, scaled from home's rim to the circle's radius (render/ground.ts uFloor2), coming in from the middle
//     out under the party's eruption and dome (render/fx, the stones' conversion's: not restyled), its tiles lit on the beat
//     (challengeFloor); the columns light on the beat; its pack dance on it (rules/challenge.ts clearChallenge); and at each bar's
//     downbeat one column fires a firework from its top, the next column round clockwise each bar, for the rest of the night (Ed,
//     2026-11-03: "fireworks start coming out of one column at the start of each bar, going around the circle clockwise"): the
//     wave's fireworks (render/fireworks.ts, one shell: a rising spark bursting in the party's neons, its flash lighting the ground),
//     scheduled by challengeShot from the beat clock and the map's seed alone, so every player sees the same column fire.
//   - closed (the night won or lost, uncleared): dark.
//   - hidden (Ed, 2026-11-12: "the challenge circle should be hidden before the party starts; there are just normal trees, no sign of it
//     - fades into existence and the trees fade away when the party starts. The same happens in reverse when the party is over if the
//     challenge circle has not been won yet."; rules/challenge.ts revealK): its floor, carving, columns, lights and statues drawn by its
//     reveal, the forest's own trees and bushes on its floor (rules/forest.ts Plant.veil) by 1 minus it, in batches of their own
//     (veilBatch), each a scenery batch's own fade (its appear uniform) so they fade whole as any set coming in does.
import type { Game } from "../rules/game";
import type { Tuning } from "../rules/tuning";
import { challengeColumns, challengeOf, challengeReady, columnKinds, columnSpots, revealK, rewardFall } from "../rules/challenge";
import * as THREE from "three";
import { castProgress } from "../rules/stoneStacks";
import { beatAt, timeAt } from "../rules/beat";
import type { Shell, ShellKind } from "../rules/fireworks";
import type { Fireworks } from "./fireworks";
import { islandSigilOf } from "../rules/dancefloor";
import { hash2 } from "../rules/random";
import { rainbow } from "./indicator";
import { SpriteBatch, type SpriteInstance } from "./sprites";
import type { LeashView } from "./leash";
import { barLevel, columnOf, columnSigil, columnSigilSize, notesSlot, upY, upZ } from "./leash/stones";
import { statueSigilColour } from "./statues";
import { wakeK } from "../rules/challengeStatues";
import { DANGER } from "./leash/attackLook";
import { rankColour, sigilRankColour, stoneKnobs } from "./leash/ranks";
import { NO_CARVING } from "./legendCarving";
import type { View } from "./view";

/** How far (m) she is before its floor takes a legend circle's slot in the ground, and its columns and lights are drawn. */
const NEAR = 260;
/** Its columns' art piece (art/landmarks.js), and how near (m) before it's asked for (ahead of need, as a find's). */
const COLUMN = "column", ASK = 420;
/** How long (s) its dancefloor takes to come in from the middle to the edge. */
const FLOOR_RISE = 1.6;
/** Its dancefloor's tiles a side (as home's: rules/dancefloor.ts GRID) and their lights this frame (reused). */
const TILES = 32, FLOOR_RGBI = new Uint8Array(TILES * TILES * 4);
/** A column's top (m), where its light sits and its fireworks go up from: the top of its art (art/landmarks.js "column", 75 px over
 *  its foot at the view's 0.09375 m a pixel; render/challenge.test.ts measures it). */
export const COLUMN_TOP = 7.05;
/** Where a column's sigils stand (Ed, 2026-11-04, on #1827: "Statue sigils should sit comfortably above the top of their columns"):
 *  stacked as a rune stone's (render/leash/stones.ts columnOf: adult below, youth above), the lowest one's foot `sigilGap` m over its
 *  column's top. Each one's middle (m up the column's face) and size. */
export function columnSigilsAt(sigils: readonly { level: number }[], t: Tuning): { y: number; size: number }[] {
  const P = columnOf(sigils, lvl => columnSigilSize(t, lvl)), lift = P.length ? COLUMN_TOP + Math.max(0, challengeOf(t).sigilGap) - (P[0].y - P[0].size / 2) : 0;
  return P.map(q => ({ y: q.y + lift, size: q.size }));
}

const smooth = (k: number) => { const q = Math.max(0, Math.min(1, k)); return q * q * (3 - 2 * q); };
/** 1 on the beat, falling away before the next. */
const beatPulse = (g: Game): number => { const b = beatAt(g.beat, g.clock.time); return Math.pow(1 - (b - Math.floor(b)), 3); };
/** The beat's count (whole beats). */
const beatNo = (g: Game): number => Math.floor(beatAt(g.beat, g.clock.time));

/** The circle's floor for the ground (view.ts legendRings): its middle, radius and ring width, its band's brightening, and no carving
 *  of the legend slot's own (its sigil is carved by its own pass: challengeCarving); null with none, cleared, or far off. */
export function challengeRing(g: Game, x: number, z: number): { x: number; z: number; r: number; edge: number; glow: number; species: string; glint: number; /** how far it's there (rules/challenge.ts revealK): the ground mixes its floor in by it */ show: number } | null {
  const ch = g.challenge;
  if (!ch || ch.clearedAt !== null || Math.hypot(ch.x - x, ch.z - z) > NEAR + ch.radius) return null; // (cleared: its dancefloor instead, challengeFloor)
  const show = revealK(g);
  if (show <= 0) return null; // (hidden: the forest's floor there, rules/challenge.ts)
  const p = beatPulse(g), inside = g.witch.mode === "ground" && Math.hypot(g.witch.x - ch.x, g.witch.z - ch.z) <= ch.radius;
  const lit = ch.clearedAt !== null, dark = ch.closedAt !== null;
  const glow = dark ? 0 : lit ? 0.35 + 0.65 * p : inside ? 0.55 : 0.2;
  return { x: ch.x, z: ch.z, r: ch.radius, edge: g.tuning.legendClearing.edge, glow: glow * show, species: NO_CARVING, glint: 0, show };
}

/** The moonlit glow in its grooves (the carving's own, before the statues). */
export const MOONLIT: [number, number, number] = [0.35, 0.72, 0.8];

/** Its carved sigil's look as the fight goes (Ed, 2026-11-04, on #1804, by the colour grammar, render/colourGrammar.ts: red the
 *  warning, cold the wild, warm the won; challenge.carving): its glow's strength and colour, and which state that is.
 *  - "stone" (its statues asleep): dark but readable, a carving catching a little moonlight (`stone`), not glowing;
 *  - "waking": glowing red with the statues over the wake-up's bars, rising to `red`, brighter on each beat (the danger red);
 *  - "fight" (the pack awake): a steady cold wild glow (`wild`, the wild adult's colour);
 *  - "won" (every column lit, the spell to cast): warm (`warm`, the party adult's colour), breathing; the dancefloor covers it once cast;
 *  - "fading" (back to stone after a fight): from the cold glow back to dark over `fade` seconds;
 *  - "dark" (closed): nothing; "moonlit" (the statues off, or a night from before them): the carving's glow as it was (brighter with
 *    her in it, brighter still ready to cast). */
export function carvingLook(g: Game): { glow: number; rgb: [number, number, number]; state: "stone" | "waking" | "fight" | "won" | "fading" | "dark" | "moonlit" } {
  const ch = g.challenge!, t = g.tuning, C = challengeOf(t).carving, st = ch.statues, time = g.clock.time;
  if (ch.closedAt !== null) return { glow: 0, rgb: MOONLIT, state: "dark" };
  if (!st) {
    const inside = g.witch.mode === "ground" && Math.hypot(g.witch.x - ch.x, g.witch.z - ch.z) <= ch.radius;
    return { glow: challengeReady(g) ? 1.6 + 0.3 * Math.sin(time * 3) : inside ? 1.2 : 0.7, rgb: MOONLIT, state: "moonlit" };
  }
  if (challengeReady(g)) return { glow: C.warm * (0.9 + 0.1 * Math.sin(time * 3)), rgb: rankColour(t, 2, true), state: "won" };
  const k = wakeK(g);
  if (st.phase === "waking" && k !== null) return { glow: C.stone + (C.red - C.stone) * k * (0.75 + 0.25 * beatPulse(g)), rgb: [...DANGER], state: "waking" };
  if (st.phase === "awake") return { glow: C.wild, rgb: rankColour(t, 2, false), state: "fight" };
  const f = st.back && st.at !== undefined ? (time - st.at) / Math.max(0.05, C.fade) : 1;
  if (f < 1) {
    const e = smooth(f), w = rankColour(t, 2, false);
    return { glow: C.wild + (C.stone - C.wild) * e, rgb: [w[0] + (MOONLIT[0] - w[0]) * e, w[1] + (MOONLIT[1] - w[1]) * e, w[2] + (MOONLIT[2] - w[2]) * e], state: "fading" };
  }
  return { glow: C.stone, rgb: MOONLIT, state: "stone" };
}

/** The island's sigil carved into the circle's floor (render/ground.ts setChallengeCarving): its middle, radius, whose sigil, the glow
 *  in its grooves and its colour (carvingLook), and the moonlight on its stone floor (challenge.carving.floor: so the circle reads as
 *  a circle before she steps in); null with none, cleared (its dancefloor covers it), or far off. */
export function challengeCarving(g: Game, x: number, z: number): { x: number; z: number; r: number; glow: number; rgb: [number, number, number]; floor: number; species: string; show: number } | null {
  const ch = g.challenge;
  if (!ch || ch.clearedAt !== null || Math.hypot(ch.x - x, ch.z - z) > NEAR + ch.radius) return null;
  const show = revealK(g);
  if (show <= 0) return null; // (hidden)
  const L = carvingLook(g), floor = ch.closedAt !== null || !ch.statues ? 0 : Math.max(0, challengeOf(g.tuning).carving.floor);
  return { x: ch.x, z: ch.z, r: ch.radius, glow: L.glow, rgb: L.rgb, floor, species: islandSigilOf(g.map), show };
}

/** A waiting column's top light (Ed, 2026-11-03: a column with no sigils left is that kind finished): lit, steady and warm (the
 *  party's colour: the friends' adult's, leash.ranks.colours) once its kind's all won over; else a faint cold glow. */
export function columnTop(col: { sigils: readonly unknown[] }, t: Tuning): { lit: boolean; rgb: [number, number, number]; size: number; alpha: number } {
  return col.sigils.length === 0 ? { lit: true, rgb: rankColour(t, 2, true), size: 2, alpha: 0.9 } : { lit: false, rgb: [0.45, 0.8, 0.9], size: 1.1, alpha: 0.5 };
}

/** Its columns (the view's decor batches, as tonight's find is drawn: render/view/finds.ts). */
export function drawChallengeColumns(v: View): void {
  const g = v.game, ch = g.challenge, key = "challenge:columns", batch = v.decorBatches.get(key), fading = v.decorBatches.get(COLUMNS_FADING);
  const w = g.witch, d = ch ? Math.hypot(w.x - ch.x, w.z - ch.z) : Infinity, show = ch ? revealK(g) : 0;
  VEIL_K = ch ? 1 - show : 0; v.decorBatches.forEach(fadeVeil); // (the hidden circle's own trees by 1 minus its reveal: veilBatch)
  if (!ch || d > ASK || show <= 0) { batch?.set([]); fading?.set([]); return; }
  const fa = v.assets.findArt(COLUMN, d <= NEAR), a = fa?.pieces[COLUMN];
  if (d > NEAR || !fa || !a) { batch?.set([]); fading?.set([]); return; }
  const frame = fa.atlas.frames[a.frame], m = v.mpp, items: SpriteInstance[] = columnSpots(ch, columnKinds(g).length).map((s, i) => {
    const flip = hash2(i, ch.cell[0], ch.cell[1] + 71) < 0.5;
    return { x: s.x - (a.originX - frame.w / 2) * m * (flip ? -1 : 1), y: 0, z: s.z, frame, flip, scale: 1 };
  });
  items.sort((p, q) => q.z - p.z); // (nearest the camera first, as the scenery's)
  // (fading in or out, Ed 2026-11-12: in a scenery batch of their own, by its fade; else solid, as they always were)
  if (show < 1) { batch?.set([]); fadeBatch(v, COLUMNS_FADING, () => new SpriteBatch(fa.atlas, v.mpp, { scenery: true, fade: true }), show)?.set(items); return; }
  fading?.set([]);
  v.batchFor(v.decorBatches, key, () => new SpriteBatch(fa.atlas, v.mpp, { solid: true }))?.set(items);
}

/** The columns' batch while the circle fades in or out (a scenery batch, faded whole by its appear uniform). */
const COLUMNS_FADING = "challenge:columns:fading";
/** The key of the hidden circle's trees' batch of an area type (in View.decorBatches, on that type's atlas). */
export const VEIL_KEY = "veil:";

/** A scenery batch in the view's decor batches faded by `k` (0 gone, 1 whole) through its own appear uniform, not the view's 0.8 s
 *  fade-in of a new set (taken off that). */
export function fadeBatch(v: View, key: string, make: () => SpriteBatch | undefined, k: number): SpriteBatch | undefined {
  const b = v.batchFor(v.decorBatches, key, make);
  if (b) { v.appearing.delete(b); b.appearU.value = Math.max(0, Math.min(1, k)); }
  return b;
}

/** The hidden challenge circle's own trees and bushes of area type `type` (rules/forest.ts Plant.veil; Ed, 2026-11-12): a scenery
 *  batch on its type's atlas, faded by 1 minus the circle's reveal (fadeVeil, each frame). */
export function veilBatch(v: View, type: number): SpriteBatch | undefined {
  const a = v.assets.typeArt(type);
  return a ? fadeBatch(v, VEIL_KEY + type, () => new SpriteBatch(a.atlas, v.mpp, { scenery: true, fade: true }), 1 - revealK(v.game)) : undefined;
}

/** What the hidden forest is doing, for the scenery's rebuild (render/view/scenery.ts: listed again as it changes): 0 gone (the circle
 *  wholly there), 1 fading (the circle mostly there: no shadows of its own), 2 mostly there (shadows too). */
export function veilState(g: Game): number {
  const k = revealK(g);
  return !g.map.challengeVeil || k >= 1 ? 0 : k > 0.5 ? 1 : 2;
}

/** Each frame (drawChallengeColumns): each of the hidden forest's batches faded by 1 minus the reveal (VEIL_K, set on the module, so
 *  no closure a frame). */
let VEIL_K = 1;
function fadeVeil(b: SpriteBatch, key: string): void { if (key.startsWith(VEIL_KEY)) b.appearU.value = VEIL_K; }

/** The clear each night's eruption was set off for (once a clear). */
const BURST = new WeakMap<Game, number>();

/** Its dancefloor once cleared, for the ground (render/ground.ts setChallengeFloor): its middle and radius, how far out it has come
 *  (from the middle, over FLOOR_RISE seconds), and its tiles' lights on the beat (r, g, b and intensity 0 to 3 a tile, as home's: a
 *  different few lit each beat, round the rainbow, brightest on it); null before it's cleared, closed, or far off. */
export function challengeFloor(g: Game, x: number, z: number): { x: number; z: number; r: number; k: number; rgbi: Uint8Array } | null {
  const ch = g.challenge;
  if (!ch || ch.clearedAt === null || Math.hypot(ch.x - x, ch.z - z) > NEAR + ch.radius) return null;
  const k = Math.max(0.001, Math.min(1, (g.clock.time - ch.clearedAt) / FLOOR_RISE)), p = beatPulse(g), beat = beatNo(g), T = FLOOR_RGBI;
  for (let j = 0, n = 0; j < TILES; j++) for (let i = 0; i < TILES; i++, n += 4) {
    const lit = hash2(i * 37 + j, beat, 7731) < 0.4, c = rainbow(hash2(i, j + beat * 3, 7733));
    T[n] = Math.round(c[0] * 255); T[n + 1] = Math.round(c[1] * 255); T[n + 2] = Math.round(c[2] * 255);
    T[n + 3] = lit ? (p > 0.6 ? 3 : p > 0.25 ? 2 : 1) : 0;
  }
  return { x: ch.x, z: ch.z, r: ch.radius, k, rgbi: T };
}

/** Its lights in the leash's layers (render/leash.ts, after the stones'): the spell's notes and fill, the columns' lights, the
 *  party as its dancefloor comes in. */
export function drawChallenge(lv: LeashView, time: number, dot: number[]): void {
  const g = lv.game, ch = g.challenge, w = g.witch, t = g.tuning;
  if (!ch || Math.hypot(ch.x - w.x, ch.z - w.z) > NEAR + ch.radius) return;
  const p = beatPulse(g), W = g.witches?.[0], show = revealK(g);
  if (ch.closedAt !== null || show <= 0) return; // (dark: nothing lit; hidden, Ed 2026-11-12: nothing there)
  const cols = columnSpots(ch, columnKinds(g).length);
  if (ch.clearedAt === null) {
    // Waiting: each column's top a faint cold glow, or, its kind all won over, lit steadily in the party's warm colour; on it, within
    // the stones' columns' range of her, its kind's wild fighters' sigils, adult below and youth above (as a rune stone's column).
    const K = stoneKnobs(t), sigils = !!t.leash.ranks?.on;
    for (const col of challengeColumns(g)) {
      const top = columnTop(col, t), lit = top.lit;
      lv.standing.add(col.x, COLUMN_TOP, col.z, top.size, dot, top.rgb[0], top.rgb[1], top.rgb[2], top.alpha * show, 1, true);
      if (lit) lv.flat.add(col.x, 0.03, col.z, 2.6, dot, top.rgb[0], top.rgb[1], top.rgb[2], 0.18 * show, 1, true); // (and a little warm light at its foot)
      const vis = smooth((K.range - Math.hypot(col.x - w.x, col.z - w.z)) / Math.max(1, K.fade)) * show; // (and as it fades in or out)
      if (lit || !sigils || vis <= 0.01) continue;
      const P = columnSigilsAt(col.sigils, t);
      col.sigils.forEach((it, i) => { const h = P[i].y; columnSigil(lv, time, dot, it.id, it.level, col.x, upY(col.x, col.z, h), upZ(col.z, h), P[i].size, vis, statueSigilColour(g, sigilRankColour(t, it.level, false, false))); }); // (grey while its pack's stone, glowing as they wake: render/statues.ts)
    }
    // Ready (every column lit): the spell's notes at its middle, and her fill round her as she casts.
    if (!challengeReady(g)) return;
    const col = rainbow(time * 0.25), on = Math.max(0, Math.min(1, (24 - Math.hypot(w.x - ch.x, w.z - ch.z)) / 12)), size = 2.2;
    if (on > 0.01) {
      lv.flat.add(ch.x, 0, ch.z, size * 1.9, dot, col[0], col[1], col[2], 0.22 * on, 1, true);
      lv.ink.add(ch.x, 0, ch.z, size, notesSlot(lv), col[0] * on, col[1] * on, col[2] * on, on);
      lv.flat.add(ch.x, 0, ch.z, size, notesSlot(lv), col[0], col[1], col[2], 0.6 * on);
    }
    const key = `challenge:${ch.key}`, k = W ? castProgress(W, key, W.time ?? g.herTime, t) : 0;
    if (k > 0) drawAnalyser(lv, dot, time, k, W?.casting === key ? 1 : 0.6, 1);
    return;
  }
  // (the analyser held full a moment as it clears, fading as its dancefloor comes in)
  { const e = g.clock.time - ch.clearedAt, hold = FLOOR_RISE * 2; if (e >= 0 && e < hold) drawAnalyser(lv, dot, time, 1, 1, 1 - e / hold); }
  // Cleared: the columns light on the beat, each its own colour round the rainbow; the party's eruption as it clears, its dome while
  // its dancefloor comes in (the ground's: challengeFloor).
  const e = g.clock.time - ch.clearedAt;
  cols.forEach((s, i) => {
    const c = rainbow(i / Math.max(1, cols.length) + time * 0.05), a = (0.35 + 0.65 * p) * show;
    lv.standing.add(s.x, COLUMN_TOP, s.z, 1.2 + 1.2 * p, dot, c[0], c[1], c[2], a, 1, true);
    lv.flat.add(s.x, 0.03, s.z, 3.2, dot, c[0], c[1], c[2], 0.25 * a, 1, true);
  });
  if (e < 0.25 && BURST.get(g) !== ch.clearedAt) { BURST.set(g, ch.clearedAt); lv.look.magic.emit("party", "eruption", ch.x, 3, ch.z, 3, 1.6, 1.8, 950101); }
  if (e < FLOOR_RISE * 2) { const k = Math.min(1, e / FLOOR_RISE); lv.look.magic.draw("party", "dome", ch.x, 1, ch.z, 2, 0.9, (1 - k * 0.5) * 0.4, k, 700101); }
  // Its reward coming down from the sky (rules/challenge.ts rewardFall): a trail of sparkles above it, and a flask a glowing orb (its
  // sigil lies on the floor once it's landed); a find is its own sprite (render/view/finds.ts).
  const f = rewardFall(g);
  if (f && !f.hidden) {
    for (let j = 0; j < 16; j++) {
      const up = j * 1.1, a = (1 - j / 16) * (0.5 + 0.5 * f.k), c = j % 3 ? [1, 0.9, 0.6] : rainbow(j / 16 + time * 0.3), jx = Math.sin(time * 7 + j * 1.7) * 0.4 * (j / 16);
      lv.over.add(ch.x + jx, f.y + 0.8 + up, ch.z, 0.35 + 0.25 * (1 - j / 16), dot, c[0], c[1], c[2], a, 1, true);
    }
    if (ch.reward === "flask") lv.over.add(ch.x, f.y + 0.6, ch.z, 1.2 + 0.4 * f.k, dot, 1, 0.85, 0.5, 0.95, 1, true);
  }
}

/** The music spell's analyser at the circle (Ed, 2026-11-04: "should be larger, the audio analyser filling the whole stone circle";
 *  challenge.analyser): `bars` bars round its middle, the first due south (toward the camera) and on round as the great stumps' dial,
 *  the first `k` of them lit (the cast's share), each reaching out `reach` x its level (0 to 1) of its `steps` dots, the last at `fill`
 *  of its radius, so it fills the circle however big it's grown (rules/challengeCircle.ts). Each dot to `emit`: where, its size (m),
 *  its bar's share round (0 to 1) and whether it's its bar's tip. */
export function challengeAnalyser(ch: { x: number; z: number; radius: number }, t: Tuning, k: number, reach: number, level: (i: number, n: number) => number, emit: (x: number, z: number, size: number, f: number, tip: boolean) => void): void {
  const A = challengeOf(t).analyser, n = Math.max(8, Math.round(A.bars)), steps = Math.max(2, Math.round(A.steps));
  const out = ch.radius * Math.max(0.1, Math.min(1, A.fill)), cell = out / (steps + 1), inner = cell; // (from a dot out from her at its middle)
  for (let i = 0; i < n; i++) {
    const f = i / n;
    if (f >= k) break;
    const top = Math.max(0, Math.min(steps - 1, Math.round(level(i, n) * reach * (steps - 1)))), a = Math.PI / 2 + f * Math.PI * 2, ux = Math.cos(a), uz = Math.sin(a);
    for (let j = 0; j <= top; j++) { const r = inner + (j + 1) * cell; emit(ch.x + ux * r, ch.z + uz * r, cell, f, j === top); }
  }
}

/** The analyser drawn (challengeAnalyser) in the leash's layers, its bars the music's spectrum (the stones' eased levels: the
 *  stones' view reads it while it's wanted), painted on and glowing in their own colour, as a stump's (render/leash/stones.ts). */
function drawAnalyser(lv: LeashView, dot: number[], time: number, k: number, reach: number, alpha: number): void {
  const g = lv.game, ch = g.challenge!, V = lv.stoneView, spec = V.spectrum, dt = Math.min(0.1, lv.frameDt);
  V.wantsSpectrum = true;
  const level = (i: number, m: number) => {
    const j = i % V.bars.length, live = spec ? barLevel(spec, i, m) : 0.25 + 0.2 * Math.abs(Math.sin(time * 1.3 + i * 1.7) * 0.6 + Math.sin(time * 2.1 + i * 0.9) * 0.4);
    return (V.bars[j] = Math.max(live, V.bars[j] - dt * 1.8));
  };
  challengeAnalyser(ch, g.tuning, k, reach, level, (x, z, size, f, tip) => {
    const c = rainbow(f + time * 0.15), lo = Math.min(c[0], c[1], c[2]) * 0.9;
    lv.ink.add(x, 0.06, z, size, dot, c[0], c[1], c[2], alpha * (tip ? 1 : 0.9));
    lv.flat.add(x, 0.08, z, size * 1.8, dot, (c[0] - lo) * 1.2, (c[1] - lo) * 1.2, (c[2] - lo) * 1.2, alpha * (tip ? 0.6 : 0.45), 1, true);
  });
}

/** Beats in a bar (the music's 4/4: rules/game.ts reckons bars so). */
const BEATS_PER_BAR = 4;
const SHELL_KINDS: ShellKind[] = ["peony", "peony", "ring", "crackle"];

/** The firework this bar (`bar`, else the bar playing now): which column fires it (its index in columnSpots, which run clockwise from
 *  north seen from above, north at the top of the screen), where, and when (the bar's downbeat). From the first bar starting at or
 *  after its clearing, the first column a seeded one, then the next clockwise each bar; null before it's cleared, if it closed
 *  uncleared, with its fireworks off, or with no columns. Drawn only: nothing in the rules reads it. */
export function challengeShot(g: Game, bar?: number): { bar: number; column: number; at: number; x: number; z: number } | null {
  const ch = g.challenge, C = challengeOf(g.tuning);
  if (!ch || ch.clearedAt === null || ch.closedAt !== null || !C.fireworks.on) return null;
  const spots = columnSpots(ch, columnKinds(g).length), n = spots.length;
  if (!n) return null;
  const first = Math.ceil(beatAt(g.beat, ch.clearedAt) / BEATS_PER_BAR - 1e-9), b = bar ?? Math.floor(beatAt(g.beat, g.clock.time) / BEATS_PER_BAR + 1e-9);
  if (b < first) return null;
  const start = Math.floor(hash2(ch.cell[0], ch.cell[1], g.seed + 6151) * n) % n, column = (start + (b - first)) % n;
  return { bar: b, column, at: timeAt(g.beat, b * BEATS_PER_BAR), x: spots[column].x, z: spots[column].z };
}

/** The bar each night's last firework went up for (once a bar). */
const FIRED = new WeakMap<Game, number>();

/** Each frame (view.ts, before the fireworks fly): this bar's firework up from its column's top, once (render/fireworks.ts launch). */
export function fireChallenge(g: Game, fw: Fireworks): void {
  const sh = challengeShot(g), ch = g.challenge;
  if (!sh || !ch || FIRED.get(g) === sh.bar || Math.hypot(sh.x - g.witch.x, sh.z - g.witch.z) > 600) return;
  FIRED.set(g, sh.bar);
  const F = challengeOf(g.tuning).fireworks, h = (k: number) => hash2(sh.bar, sh.column, g.seed + 6157 + k);
  const s: Shell = { launch: sh.at, burst: sh.at + 0.9 + 0.2 * h(0), x: sh.x + (h(1) - 0.5) * 3, z: sh.z + (h(2) - 0.5) * 3, height: F.height * (0.9 + 0.2 * h(3)), kind: SHELL_KINDS[Math.floor(h(4) * SHELL_KINDS.length) % SHELL_KINDS.length], radius: F.burst, hue: h(5), hue2: h(6) < 0.4 ? h(7) : -1, finale: false };
  fw.launch(s, sh.x, sh.z, COLUMN_TOP);
}

/** Its lights once cleared (view/lights.ts, among the forest's point lights, the nearest of which the light budget keeps): its
 *  dancefloor's own coloured light, as home's (render/dancefloor.ts): over its middle, reaching across the circle, the colour of its
 *  lit tiles and brighter on the beat, coming up as the floor comes in; and a falling flask's little gold light (a find has its own:
 *  render/view/finds.ts findLight). None before it's cleared, once closed, or with her far off. */
export function challengeLights(g: Game, x: number, z: number, out: { x: number; y: number; z: number; reach: number; rgb: THREE.Vector3; strength: number }[]): void {
  const ch = g.challenge;
  if (!ch || ch.clearedAt === null || Math.hypot(ch.x - x, ch.z - z) > NEAR + ch.radius) return;
  const D = g.tuning.dancefloor, p = beatPulse(g), k = Math.min(1, (g.clock.time - ch.clearedAt) / FLOOR_RISE), T = FLOOR_RGBI;
  let r = 0, gg = 0, b = 0, n = 0;
  for (let i = 0; i < T.length; i += 4) if (T[i + 3] > 0) { r += T[i]; gg += T[i + 1]; b += T[i + 2]; n++; }
  if (n) { const m = Math.max(r, gg, b) || 1; FLOOR_LIGHT.set(r / m, gg / m, b / m); }
  out.push({ x: ch.x, y: 3, z: ch.z, reach: ch.radius * 1.4, rgb: FLOOR_LIGHT, strength: D.lightStrength * (0.6 + 0.4 * p) * Math.max(0, k) });
  const f = rewardFall(g);
  if (f && !f.hidden && ch.reward === "flask") out.push({ x: ch.x, y: f.y + 0.6, z: ch.z, reach: 10, rgb: FLASK_LIGHT, strength: 0.6 + 0.8 * f.k });
}
const FLOOR_LIGHT = new THREE.Vector3(1, 0.6, 1), FLASK_LIGHT = new THREE.Vector3(1, 0.85, 0.5);
