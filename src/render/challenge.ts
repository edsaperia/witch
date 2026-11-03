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
//   - cleared: the sigil and the columns light on the beat, a small dancefloor rises at its middle, tile by tile from the middle
//     out, with the party's eruption and dome (render/fx, the stones' conversion's: not restyled); its pack dance round it.
//   - closed (the night won or lost, uncleared): dark.
import type { Game } from "../rules/game";
import { challengeReady, columnSpots } from "../rules/challenge";
import { castOf, castProgress } from "../rules/stoneStacks";
import { beatAt } from "../rules/beat";
import { islandSigilOf } from "../rules/dancefloor";
import { hash2 } from "../rules/random";
import { rainbow } from "./indicator";
import { SpriteBatch, type SpriteInstance } from "./sprites";
import type { LeashView } from "./leash";
import { notesSlot } from "./leash/stones";
import { LEGEND_LEVEL, SLOT, SLOTS } from "./leash/glyphs";
import type { View } from "./view";

/** How far (m) she is before its floor takes a legend circle's slot in the ground, and its columns and lights are drawn. */
const NEAR = 260;
/** Its columns' art piece (art/landmarks.js), and how near (m) before it's asked for (ahead of need, as a find's). */
const COLUMN = "column", ASK = 420;
/** The small dancefloor: tiles a side, a tile's size (m), and how long it takes to rise (s). */
const FLOOR_N = 5, FLOOR_TILE = 1.5, FLOOR_RISE = 1.6;
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
  if (!ch || Math.hypot(ch.x - x, ch.z - z) > NEAR + ch.radius) return null;
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

/** A small square tile in the leash atlas (made once): the little dancefloor's. */
function tileSlot(lv: LeashView): number[] {
  const had = lv.slots.get("challenge:tile");
  if (had !== undefined) return lv.uv(had);
  const s = lv.nextSlot++, g = lv.canvas.getContext("2d")!, ox = (s % SLOTS) * SLOT, oy = Math.floor(s / SLOTS) * SLOT;
  g.clearRect(ox, oy, SLOT, SLOT); g.fillStyle = "#fff"; g.fillRect(ox + 1, oy + 1, SLOT - 2, SLOT - 2);
  lv.slots.set("challenge:tile", s); lv.tex.needsUpdate = true;
  return lv.uv(s);
}

/** Its lights in the leash's layers (render/leash.ts, after the stones'): the spell's notes and fill, the columns' lights, the
 *  little dancefloor. */
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
  {
    const lit = ch.clearedAt !== null, ready = !lit && challengeReady(g), c = lit ? rainbow(time * 0.1) : [0.45, 0.85, 0.95];
    const a = lit ? 0.5 + 0.45 * p : ready ? 0.7 + 0.1 * Math.sin(time * 3) : 0.55;
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
  // the little floor rises.
  const e = g.clock.time - ch.clearedAt;
  cols.forEach((s, i) => {
    const c = rainbow(i / Math.max(1, cols.length) + time * 0.05), a = 0.35 + 0.65 * p;
    lv.standing.add(s.x, COLUMN_TOP, s.z, 1.2 + 1.2 * p, dot, c[0], c[1], c[2], a, 1, true);
    lv.flat.add(s.x, 0.03, s.z, 3.2, dot, c[0], c[1], c[2], 0.25 * a, 1, true);
  });
  if (e < 0.25 && BURST.get(g) !== ch.clearedAt) { BURST.set(g, ch.clearedAt); lv.look.magic.emit("party", "eruption", ch.x, 3, ch.z, 3, 1.6, 1.8, 950101); }
  if (e < FLOOR_RISE * 2) { const k = Math.min(1, e / FLOOR_RISE); lv.look.magic.draw("party", "dome", ch.x, 1, ch.z, 2, 0.9, (1 - k * 0.5) * 0.4, k, 700101); }
  // The little dancefloor: FLOOR_N × FLOOR_N tiles, each rising from the middle out (bigger and brighter as it comes), then lit on
  // the beat in the party's colours, a different few each beat.
  const tile = tileSlot(lv), half = (FLOOR_N - 1) / 2, far = Math.hypot(half, half) || 1, beat = beatNo(g);
  for (let j = 0; j < FLOOR_N; j++) for (let i = 0; i < FLOOR_N; i++) {
    const dx = i - half, dz = j - half, rise = Math.max(0, Math.min(1, (e / FLOOR_RISE - (Math.hypot(dx, dz) / far) * 0.6) / 0.4));
    if (rise <= 0) continue;
    const lit = hash2(i * 7 + j, beat, 7731) < 0.45, c = rainbow(hash2(i, j + beat * 3, 7733)), k = lit ? 0.45 + 0.55 * p : 0.18;
    lv.flat.add(ch.x + dx * FLOOR_TILE, 0.05, ch.z + dz * FLOOR_TILE, FLOOR_TILE * 0.92 * rise, tile, c[0] * k, c[1] * k, c[2] * k, 0.85 * rise, 1, true);
  }
}
