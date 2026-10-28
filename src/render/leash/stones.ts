// The rune stones' sigils (Ed, 2026-10-28, after the runestone mocks; render/leash.ts draws them, with rank sigils on):
// - over each stone, its area's creatures as one column of sigils, the friends (invited) above the enemies (still wild), each side in
//   rank order, legend lowest and babies on top, in the side's palette and the rank's size (Ed: "you mostly care about how many
//   creatures are still hostile"); it may run off the top of the screen;
// - the spell's spot, the HUD's music notes (render/indicator.ts NOTES) in a cycling rainbow, `south` m south of the stone, fading
//   in as she comes within `far` m of it and fully on within `near`;
// - the cast: a ring of rainbow bars round the stone's foot, beating like a spectrum analyser, as much of it lit as the cast has
//   filled, the part a hit has cost it still showing red a moment; and rainbow motes up out of the stone, more as it fills;
// - the conversion (`convert` s): the stone flares, the friends' sigils arc down off the column to land as their runes at their
//   feet, the enemies' fade.
// The data (Foxtrot's rules, still to land: rules stoneStack and castShown) comes through stoneStack and castShown below, stand-ins
// with their shapes: the column from the creatures as they are; the cast from stoneView.cast, which tools set. The conversion is
// read off the column: its last enemy turning friend.
import { NOTES } from "../indicator";
import type { Game } from "../../rules/game";
import { runeOffset } from "../../rules/runeOffset";
import { hash2 } from "../../rules/random";
import type { LeashView } from "../leash";
import { SPRITE_UNIFORMS } from "../sprites";
import { groundHeight } from "../height";
import { SLOT, SLOTS } from "./glyphs";
import { drawEmbers, rankColour, rankKnobs, rankSize, stoneKnobs } from "./ranks";

/** A rune stone drawn this frame: its area's key ("cx,cy"), where it stands and its stone's height (m, STONE_FACE of its drawn height; up its face: the sprites lean back
 *  toward the camera, render/sprites.ts uUp, and its column climbs on up that way, in its plane). */
export interface StoneSpot { key: string; x: number; z: number; top: number }
/** The share of a stone's drawn height (render/markers.ts MarkerArt.height: to the top of its rune's glow) that is the stone itself:
 *  measured in the game, 2026-10-28 (the column drawn at 1, 0.7, 0.5, 0.3 and 0 of it: 0.5 sits on the stone's top). */
export const STONE_FACE = 0.5;
/** One of a stone's sigils: its creature, rank and side. */
export interface StackItem { id: number; level: number; friend: boolean }
/** The spell being cast at a stone (its key, where it stands), how far it has filled (0 to 1), and after a hit how far it had
 *  filled (`lostFrom`) and when (`hitAt`, on the game's clock). */
export interface CastShown { key: string; x: number; z: number; k: number; lostFrom?: number; hitAt?: number }

interface Converting { key: string; x: number; z: number; top: number; at: number; items: (StackItem & { was: boolean; y: number; size: number; land: number })[] }
export interface StoneView {
  /** The cast shown (the stand-in for rules castShown: tools set it, window.witch.view.leashView.stoneView.cast). */
  cast: CastShown | null;
  /** Each stone's column last frame, to see the conversion. */
  last: Map<string, StackItem[]>;
  converting: Converting[];
  /** A converted creature's landing time (its rune waits for its sigil): render/leash.ts. */
  landing: Map<number, number>;
  /** This frame's columns by key (pooled). */
  cols: Map<string, StackItem[]>;
}
export const newStoneView = (): StoneView => ({ cast: null, last: new Map(), converting: [], landing: new Map(), cols: new Map() });
export const resetStoneView = (v: StoneView): void => { v.cast = null; v.last.clear(); v.converting.length = 0; v.landing.clear(); v.cols.clear(); };

/** Stand-in for rules stoneStack(g, key): every area's column, bottom first (enemies legend to baby, then friends legend to baby):
 *  the creatures living there now (not hers, gone, fled, travelling, dancing or the party legend), friends the happy. */
export function stoneStacks(g: Pick<Game, "creatures">, out: Map<string, StackItem[]>): Map<string, StackItem[]> {
  for (const l of out.values()) l.length = 0;
  for (const c of g.creatures) {
    if (c.gone || c.leashed || c.fleeUntil !== undefined || c.travelling || c.dancing || c.partyLegend) continue;
    const k = c.cell[0] + "," + c.cell[1];
    let l = out.get(k);
    if (!l) out.set(k, l = []);
    l.push({ id: c.id, level: Math.max(0, Math.min(3, c.level)), friend: c.state === "happy" });
  }
  for (const l of out.values()) l.sort((a, b) => Number(a.friend) - Number(b.friend) || b.level - a.level || a.id - b.id);
  return out;
}

/** A column's sigils' heights over the stone's top and sizes (m), bottom first. */
export function columnOf(items: readonly StackItem[], size: (level: number) => number): { y: number; size: number }[] {
  let y = 0.6;
  return items.map(it => { const s = size(it.level); y += s / 2; const at = { y, size: s }; y += s / 2 + s * 0.15; return at; });
}

/** A rainbow hue, 0 to 1 round. */
const hue = (h: number): [number, number, number] => { const f = (n: number) => { const q = (((n + h * 6) % 6) + 6) % 6; return 1 - Math.max(0, Math.min(1, Math.min(q, 4 - q))); }; return [f(5), f(3), f(1)]; };
const smooth = (k: number) => { const q = Math.max(0, Math.min(1, k)); return q * q * (3 - 2 * q); };

export function drawStones(lv: LeashView, time: number, dot: number[]): void {
  const g = lv.game, t = g.tuning, V = lv.stoneView, K = stoneKnobs(t), RK = rankKnobs(t), w = g.witch, S = t.stack;
  if (!t.leash.ranks?.on) return;
  const cols = stoneStacks(g, V.cols), sizeOf = (lvl: number) => (2 + 2 * 0.4) * S.scale * rankSize(t, lvl);
  const notes = notesSlot(lv);
  const sigil = (it: StackItem, x: number, y: number, z: number, size: number, alpha: number, c: [number, number, number], seed: number) => {
    const sp = g.creatures[it.id]?.species ?? "fox", uv = lv.uv(lv.bareSlot(sp)), sh = lv.shadeOf(uv);
    if (sh) lv.stackBack.add(x, y, z, size, sh, 0.02, 0.02, 0.035, (S.backing ?? 0.6) * alpha);
    lv.stackGlyphs.add(x, y, z, size, uv, c[0], c[1], c[2], alpha);
    if (alpha > 0.5) drawEmbers(lv.stackGlyphs, dot, lv.glyphPts.get(`${uv[0]},${uv[1]}`) ?? [], x, y, z, size, false, it.level, c, time, seed, RK.embers, RK.embers.stack);
  };
  // A point `h` m up a stone's face (its sprite's up: leaning back toward the camera), a little in front of it.
  // (The batches stand things on the ground under them, render/height.ts onGround, and a point up a stone's face is over ground
  // further north, maybe higher or lower on a hill: the difference taken off, so it's the stone's foot's ground it stands on.)
  const U = SPRITE_UNIFORMS.uUp.value, upZ = (z: number, h: number) => z + 0.3 + h * U.z;
  const upY = (x: number, z: number, h: number) => h * U.y + groundHeight(x, z) - groundHeight(x, upZ(z, h));
  const conv = new Set(V.converting.map(c => c.key));
  for (const st of lv.stones) {
    const items = cols.get(st.key) ?? [], enemies = items.filter(i => !i.friend).length, last = V.last.get(st.key);
    // The conversion, read off the column: enemies a moment ago, none now, one of them a friend now (or a cast here just now).
    if (last && !conv.has(st.key) && enemies === 0 && last.some(i => !i.friend)) {
      const turned = last.some(i => !i.friend && items.some(j => j.id === i.id && j.friend)), cast = V.cast?.key === st.key;
      if (turned || cast) {
        const P = columnOf(last, sizeOf), now = new Set(items.filter(i => i.friend).map(i => i.id));
        const C: Converting = { key: st.key, x: st.x, z: st.z, top: st.top, at: time, items: last.map((it, i) => ({ ...it, friend: now.has(it.id), was: it.friend, y: P[i].y, size: P[i].size, land: time + K.convert * (0.65 + 0.2 * hash2(it.id, 3, 91)) })) };
        for (const it of C.items) if (it.friend) V.landing.set(it.id, it.land);
        V.converting.push(C); conv.add(st.key);
        if (cast) V.cast = null;
      }
    }
    V.last.set(st.key, items.slice());
    const d = Math.hypot(st.x - w.x, st.z - w.z), vis = smooth((K.range - d) / Math.max(1, K.fade));
    if (vis <= 0.01 || conv.has(st.key) || enemies === 0) continue;
    // The column: the friends above the enemies, each side legend lowest, babies on top.
    const P = columnOf(items, sizeOf);
    items.forEach((it, i) => { const h = st.top + P[i].y; sigil(it, st.x, upY(st.x, st.z, h), upZ(st.z, h), P[i].size, vis, rankColour(t, it.level, it.friend), it.id * 7 + 3); });
    // The spell's spot: south of the stone, only as she comes near it.
    const sx = st.x, sz = st.z + K.south, on = smooth((K.far - Math.hypot(w.x - sx, w.z - sz)) / Math.max(0.1, K.far - K.near));
    if (on > 0.01) {
      const c = hue(time * 0.25);
      lv.flat.add(sx, 0, sz, K.size * 1.9, dot, c[0], c[1], c[2], 0.22 * on, 1, true); // (its glow)
      lv.ink.add(sx, 0, sz, K.size, notes, c[0] * on, c[1] * on, c[2] * on, on);
      lv.flat.add(sx, 0, sz, K.size, notes, c[0], c[1], c[2], 0.6 * on);
    }
  }
  for (const k of [...V.last.keys()]) if (!lv.stones.some(s => s.key === k)) V.last.delete(k);
  for (const [id, at] of V.landing) if (at < time) V.landing.delete(id);
  // The cast: the ring round the stone's foot and the motes.
  const cs = castShown(lv);
  if (cs) {
    const st = lv.stones.find(s => s.key === cs.key), top = st ? upY(st.x, st.z, st.top) : 5.4, k = Math.max(0, Math.min(1, cs.k)), dr = Math.max(k, cs.lostFrom ?? k);
    const lostA = cs.hitAt === undefined ? 1 : Math.max(0, 1 - (time - cs.hitAt) / 1.2), n = Math.max(8, Math.round(K.bars)), cell = K.cell;
    for (let i = 0; i < n; i++) {
      const f = i / n, a = Math.PI / 2 + f * Math.PI * 2, ux = Math.cos(a), uz = Math.sin(a) * 0.8, cx = cs.x, cz = cs.z + 0.6;
      const beat = Math.abs(Math.sin(time * 5.3 + i * 1.7) * 0.6 + Math.sin(time * 8.1 + i * 0.9) * 0.4), lit = f < k, lost = !lit && f < dr && lostA > 0;
      const h = lit ? 2 + Math.round(beat * 5 * (0.5 + 0.5 * k)) : lost ? 2 + Math.round(2 * beat) : 1, c = lit ? hue(f + time * 0.15) : lost ? [1, 0.2, 0.15] : [0.45, 0.45, 0.5];
      for (let j = 0; j < h; j++) {
        const r = K.radius + j * cell * 1.1, x = cx + ux * r, z = cz + uz * r, tip = j === h - 1;
        lv.flat.add(x, 0, z, cell * (lit ? 1 : 0.85), dot, c[0], c[1], c[2], lit ? (tip ? 1 : 0.85) : lost ? lostA : 0.35);
        if (lit && tip) lv.over.add(x, 0.2, z, cell * 0.9, dot, c[0], c[1], c[2], 0.45);
      }
    }
    const m = Math.round(6 + 34 * k);
    for (let j = 0; j < m; j++) {
      const life = (time * (0.45 + 0.25 * hash2(j, 9, 93)) + hash2(j, 7, 93)) % 1, a = hash2(j, 5, 93) * Math.PI * 2, out = 0.6 + life * (2.5 + 3 * k), c = hue(hash2(j, 4, 93) + time * 0.1);
      lv.over.add(cs.x + Math.cos(a) * out, top * 0.6 + life * (3 + 4 * k), cs.z + 0.3 + Math.sin(a) * out * 0.6, 0.28 + 0.12 * k, dot, c[0], c[1], c[2], (1 - life) * (0.5 + 0.5 * k));
    }
  }
  // The conversions: the flare, the friends' sigils arcing down to their runes, the enemies' fading.
  V.converting = V.converting.filter(C => time - C.at < K.convert);
  for (const C of V.converting) {
    const T = (time - C.at) / K.convert;
    if (T < 0.3) { const f = 1 - T / 0.3; lv.over.add(C.x, upY(C.x, C.z, C.top + 1), upZ(C.z, C.top + 1), 9 * (1.2 - f), dot, 1, 0.95, 0.85, 0.55 * f, 1, true); }
    C.items.forEach(it => {
      const sx = C.x, sy = upY(C.x, C.z, C.top + it.y), sz = upZ(C.z, C.top + it.y);
      if (!it.friend) { if (T < 0.35) sigil(it, sx, sy, sz, it.size, 1 - T / 0.35, rankColour(t, it.level, false), it.id * 7 + 3); return; }
      const cr = g.creatures[it.id], ex = cr?.x ?? sx, ez = cr ? cr.z + runeOffset(cr, t) : sz;
      const t0 = C.at + K.convert * (0.1 + 0.2 * hash2(it.id, 3, 91)), e = smooth((time - t0) / (it.land - t0));
      if (time >= it.land) return; // (landed: its rune now, render/leash.ts)
      const from = rankColour(t, it.level, it.was), to = rankColour(t, it.level, true), m = smooth(T / 0.3), c: [number, number, number] = [from[0] + (to[0] - from[0]) * m, from[1] + (to[1] - from[1]) * m, from[2] + (to[2] - from[2]) * m];
      const at = (q: number) => [sx + (ex - sx) * q, Math.max(0.3, sy * (1 - q) + Math.sin(q * Math.PI) * 2.5), sz + (ez - sz) * q];
      const [x, y, z] = at(e);
      sigil(it, x, y, z, it.size * (1 - 0.2 * e), 1, c, it.id * 7 + 3);
      if (e > 0.02) for (let k2 = 1; k2 <= 4; k2++) { const [bx, by, bz] = at(Math.max(0, e - k2 * 0.06)); lv.over.add(bx, by, bz, 0.35, dot, c[0], c[1], c[2], 0.5 * (1 - k2 / 5)); } // (a short trail)
    });
  }
}

/** Stand-in for rules castShown(W): the cast tools set (stoneView.cast), else none. */
export const castShown = (lv: LeashView): CastShown | null => lv.stoneView.cast;

/** The music notes in the leash atlas (made once): the HUD's 🎶 (render/indicator.ts NOTES). */
function notesSlot(lv: LeashView): number[] {
  const had = lv.slots.get("stone:notes");
  if (had !== undefined) return lv.uv(had);
  const s = lv.nextSlot++, g = lv.canvas.getContext("2d")!, ox = (s % SLOTS) * SLOT, oy = Math.floor(s / SLOTS) * SLOT;
  g.clearRect(ox, oy, SLOT, SLOT); g.fillStyle = "#fff";
  NOTES.forEach((row, y) => [...row].forEach((ch, x) => { if (ch === "#") g.fillRect(ox + 1 + x * 2, oy + 3 + y * 2, 2, 2); }));
  lv.slots.set("stone:notes", s); lv.tex.needsUpdate = true;
  return lv.uv(s);
}
