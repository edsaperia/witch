// The challenge area's look (rules/challenge.ts; Ed, 2026-11-03: "a large stone floor circle (like the legend circle) with the glowing
// sigil of the island carved into it, with a circle of stone columns around the edge (we already have art for this)"):
//   - the floor: a legend circle's (render/ground.ts, its flagstones, its area's stone and debris, render/legendFloor.ts), the
//     island's sigil carved in it (art/sigils.js islandSigil: home's the World Tree; render/legendCarving.ts) and glowing (the
//     carving's glint), drawn in the ground's last legend-circle slot (view.ts legendRings: challengeRing);
//   - the columns: the classical ruins' standing column (art/landmarks.js "column"), drawn alone (a "find" art job, as tonight's find
//     is: render/view/finds.ts), round its edge (rules/challenge.ts columnSpots);
//   - no beam of light over it (Ed, 2026-11-03, on #1725: "remove the beam"): the telescope and the footpaths find it;
//   - ready to cast: the spell's music notes at its middle, as at a stone (render/leash/stones.ts); casting, its fill a ring of
//     rainbow dots round her;
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
import type { Game } from "../rules/game";
import { challengeOf, challengeReady, columnSpots, rewardFall } from "../rules/challenge";
import * as THREE from "three";
import { castOf, castProgress } from "../rules/stoneStacks";
import { beatAt, timeAt } from "../rules/beat";
import type { Shell, ShellKind } from "../rules/fireworks";
import type { Fireworks } from "./fireworks";
import { islandSigilOf } from "../rules/dancefloor";
import { hash2 } from "../rules/random";
import { rainbow } from "./indicator";
import { SpriteBatch, type SpriteInstance } from "./sprites";
import type { LeashView } from "./leash";
import { notesSlot } from "./leash/stones";
import { LEGEND_LEVEL } from "./leash/glyphs";
import type { View } from "./view";

/** How far (m) she is before its floor takes a legend circle's slot in the ground, and its columns and lights are drawn. */
const NEAR = 260;
/** Its columns' art piece (art/landmarks.js), and how near (m) before it's asked for (ahead of need, as a find's). */
const COLUMN = "column", ASK = 420;
/** How long (s) its dancefloor takes to come in from the middle to the edge. */
const FLOOR_RISE = 1.6;
/** Its dancefloor's tiles a side (as home's: rules/dancefloor.ts GRID) and their lights this frame (reused). */
const TILES = 32, FLOOR_RGBI = new Uint8Array(TILES * TILES * 4);
/** The sigil's size on the floor, times the circle's radius (Ed, 2026-11-03, on #1725: filling the floor, its ring just inside the columns). */
const SIGIL_SIZE = 1.85;
/** A column's top (m), where its light sits. */
const COLUMN_TOP = 4.6;

/** 1 on the beat, falling away before the next. */
const beatPulse = (g: Game): number => { const b = beatAt(g.beat, g.clock.time); return Math.pow(1 - (b - Math.floor(b)), 3); };
/** The beat's count (whole beats). */
const beatNo = (g: Game): number => Math.floor(beatAt(g.beat, g.clock.time));

/** The circle's floor for the ground (view.ts legendRings): its middle, radius and ring width, its band's brightening, the carving
 *  (the island's sigil) and its glint; null with none, or far off. */
export function challengeRing(g: Game, x: number, z: number): { x: number; z: number; r: number; edge: number; glow: number; species: string; glint: number } | null {
  const ch = g.challenge;
  if (!ch || ch.clearedAt !== null || Math.hypot(ch.x - x, ch.z - z) > NEAR + ch.radius) return null; // (cleared: its dancefloor instead, challengeFloor)
  const p = beatPulse(g), inside = g.witch.mode === "ground" && Math.hypot(g.witch.x - ch.x, g.witch.z - ch.z) <= ch.radius;
  const lit = ch.clearedAt !== null, dark = ch.closedAt !== null;
  const glint = dark ? 0 : lit ? 2.5 + 6 * p : challengeReady(g) ? 3 + 1.5 * Math.sin(g.clock.time * 3) : 2.2;
  const glow = dark ? 0 : lit ? 0.35 + 0.65 * p : inside ? 0.55 : 0.2;
  return { x: ch.x, z: ch.z, r: ch.radius, edge: g.tuning.legendClearing.edge, glow, species: islandSigilOf(g.map), glint };
}

/** Its columns (the view's decor batches, as tonight's find is drawn: render/view/finds.ts). */
export function drawChallengeColumns(v: View): void {
  const g = v.game, ch = g.challenge, key = "challenge:columns", batch = v.decorBatches.get(key);
  const w = g.witch, d = ch ? Math.hypot(w.x - ch.x, w.z - ch.z) : Infinity;
  if (!ch || d > ASK) { batch?.set([]); return; }
  const fa = v.assets.findArt(COLUMN, d <= NEAR), a = fa?.pieces[COLUMN];
  if (d > NEAR || !fa || !a) { batch?.set([]); return; }
  const frame = fa.atlas.frames[a.frame], m = v.mpp, items: SpriteInstance[] = columnSpots(ch, g.tuning).map((s, i) => {
    const flip = hash2(i, ch.cell[0], ch.cell[1] + 71) < 0.5;
    return { x: s.x - (a.originX - frame.w / 2) * m * (flip ? -1 : 1), y: 0, z: s.z, frame, flip, scale: 1 };
  });
  items.sort((p, q) => q.z - p.z); // (nearest the camera first, as the scenery's)
  v.batchFor(v.decorBatches, key, () => new SpriteBatch(fa.atlas, v.mpp, { solid: true }))?.set(items);
}

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
  const p = beatPulse(g), W = g.witches?.[0];
  if (ch.closedAt !== null) return; // (dark: nothing lit)
  const cols = columnSpots(ch, t);
  // The island's sigil glowing in its floor (its legendary form: a magic circle with the animal at its middle, render/leash.ts
  // slotOf), over the floor's carving (the ground's: challengeRing), so it reads in the dark: moonlit while it waits, brighter once
  // it's ready, the rainbow on the beat once cleared. Its light alone, no dark backing as a sigil lying on the ground has (at this
  // size that blacked out the stone floor under it).
  if (ch.clearedAt === null) { // (cleared: its dancefloor replaces the floor and the sigil, challengeFloor)
    const ready = challengeReady(g), c = [0.45, 0.85, 0.95];
    const a = ready ? 0.7 + 0.1 * Math.sin(time * 3) : 0.55;
    lv.flat.add(ch.x, 0.02, ch.z, ch.radius * SIGIL_SIZE, lv.uv(lv.slotOf(islandSigilOf(g.map), LEGEND_LEVEL, true), 2), c[0], c[1], c[2], a);
  }
  if (ch.clearedAt === null) {
    // Waiting: each column's top a faint cold glow; ready, the spell's notes at its middle, and her fill round her as she casts.
    for (const s of cols) lv.standing.add(s.x, COLUMN_TOP, s.z, 1.1, dot, 0.45, 0.8, 0.9, 0.5, 1, true);
    if (!challengeReady(g)) return;
    const col = rainbow(time * 0.25), on = Math.max(0, Math.min(1, (24 - Math.hypot(w.x - ch.x, w.z - ch.z)) / 12)), size = 2.2;
    if (on > 0.01) {
      lv.flat.add(ch.x, 0, ch.z, size * 1.9, dot, col[0], col[1], col[2], 0.22 * on, 1, true);
      lv.ink.add(ch.x, 0, ch.z, size, notesSlot(lv), col[0] * on, col[1] * on, col[2] * on, on);
      lv.flat.add(ch.x, 0, ch.z, size, notesSlot(lv), col[0], col[1], col[2], 0.6 * on);
    }
    const key = `challenge:${ch.key}`, k = W ? castProgress(W, key, W.time ?? g.herTime, t) : 0;
    if (k > 0) {
      const n = 48, R = castOf(t).radius + 1.2;
      for (let i = 0; i < Math.round(n * k); i++) { const a = -Math.PI / 2 + (i / n) * Math.PI * 2, c = rainbow(i / n + time * 0.15); lv.flat.add(w.x + Math.cos(a) * R, 0.06, w.z + Math.sin(a) * R, 0.6, dot, c[0], c[1], c[2], 0.9, 1, true); }
    }
    return;
  }
  // Cleared: the columns light on the beat, each its own colour round the rainbow; the party's eruption as it clears, its dome while
  // its dancefloor comes in (the ground's: challengeFloor).
  const e = g.clock.time - ch.clearedAt;
  cols.forEach((s, i) => {
    const c = rainbow(i / Math.max(1, cols.length) + time * 0.05), a = 0.35 + 0.65 * p;
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
  const spots = columnSpots(ch, g.tuning), n = spots.length;
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
