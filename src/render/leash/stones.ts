// The rune stones' sigils (Ed, 2026-10-28, after the runestone mocks; render/leash.ts draws them, with rank sigils on), from the rules'
// runestone stacks (rules/stoneStacks.ts: stoneStack, castShown, g.loose):
// - over each stone, its stack as one column of sigils, the friends (invited) above the enemies (still wild), each side in rank order,
//   legend lowest and babies on top, in the side's palette and the rank's size (Ed: "you mostly care about how many creatures are still
//   hostile"); it may run off the top of the screen;
// - the spell's spot, the HUD's music notes (render/indicator.ts NOTES) in a cycling rainbow, `south` m south of a stone with a stack,
//   fading in as she comes within `far` m of it and fully on within `near`;
// - the cast (castShown): a ring of rainbow bars round the stone's foot, an analyser of the music playing (Ed, 2026-10-28: "the
//   soundsystem spell audio analyser bars should move with the music": the mix's spectrum, platform/audio/music.ts spectrum, read once
//   a frame while the ring shows), as much of it lit as the cast has filled, the part a hit has cost it showing red a moment; and
//   rainbow motes up out of the stone, more as it fills;
// - the conversion (`convert` s; the rules scatter its friend sigils, g.loose, each with the stack slot it fell from): the stone
//   flares, the friends' sigils arc down off the column to where they lie, the enemies' fade;
// - the loose sigils lying on the ground, to pick up (a sleeping legend's tethers her: render/leash/stack.ts).
import { NOTES, rainbow } from "../indicator";
import { castShown, stoneStack, type StackEntry } from "../../rules/stoneStacks";
import { RUNE_SCALE, sigilSize } from "../../rules/runeOffset";
import { hash2 } from "../../rules/random";
import type { LeashView } from "../leash";
import { SPRITE_UNIFORMS } from "../sprites";
import { groundHeight } from "../height";
import { SLOT, SLOTS } from "./glyphs";
import { drawEmbers, rankColour, rankKnobs, rankSize, stoneKnobs } from "./ranks";

/** A rune stone drawn this frame: its area's key ("cx,cy"), where it stands and its stone's height (m, STONE_FACE of its drawn height;
 *  up its face: the sprites lean back toward the camera, render/sprites.ts uUp, and its column climbs on up that way, in its plane). */
export interface StoneSpot { key: string; x: number; z: number; top: number }
/** The share of a stone's drawn height (render/markers.ts MarkerArt.height: to the top of its rune's glow) that is the stone itself:
 *  measured in the game, 2026-10-28 (the column drawn at 1, 0.7, 0.5, 0.3 and 0 of it: 0.5 sits on the stone's top). */
export const STONE_FACE = 0.5;

/** A stone's column as drawn last: where it stands, and each sigil's height over its top and size. */
interface Column { x: number; z: number; top: number; items: (StackEntry & { y: number; size: number })[] }
/** A conversion seen: its stone (its column as it last was) and when. */
interface Converted { col: Column; at: number }
export interface StoneView {
  /** Each stone's column as last drawn, to fall from at its conversion. */
  last: Map<string, Column>;
  /** The conversions under way. */
  converted: Converted[];
  /** Each loose sigil's fall (by creature): from where, when it began and when it lands; none for one put down (a tether's).
   *  `hidden`: a legend circle's baby's (LooseSigil.to "circle"), not seen in flight: it fades out of the stack and in where it lands. */
  falls: Map<number, { x: number; y: number; z: number; t0: number; land: number; was: boolean; hidden?: boolean }>;
  /** The loose sigils seen so far (by creature). */
  seen: Set<number>;
  /** The music's spectrum this frame (main.ts sets it while `wantsSpectrum`: the ring showing; null: no audio running), and the bars'
   *  eased levels. */
  spectrum: Uint8Array | null;
  wantsSpectrum: boolean;
  bars: Float32Array;
}
export const newStoneView = (): StoneView => ({ last: new Map(), converted: [], falls: new Map(), seen: new Set(), spectrum: null, wantsSpectrum: false, bars: new Float32Array(64) });
export const resetStoneView = (v: StoneView): void => { v.last.clear(); v.converted.length = 0; v.falls.clear(); v.seen.clear(); v.spectrum = null; v.wantsSpectrum = false; v.bars.fill(0); };

/** A column's sigils' heights over the stone's top and sizes (m), bottom first. */
export function columnOf(items: readonly { level: number }[], size: (level: number) => number): { y: number; size: number }[] {
  let y = 0.6;
  return items.map(it => { const s = size(it.level); y += s / 2; const at = { y, size: s }; y += s / 2 + s * 0.15; return at; });
}

/** Bar i of n round the ring's level from the music's spectrum: the ring mirrored left and right of its front (so it's whole), the
 *  bass at the front and the treble at the back, the bins spread to favour the low end (where the music's energy is). 0 to 1. */
export function barLevel(bins: ArrayLike<number>, i: number, n: number): number {
  const f = i / n, m = f < 0.5 ? f * 2 : (1 - f) * 2, used = Math.max(1, Math.floor(bins.length * 0.7));
  const b = Math.min(used - 1, Math.floor(Math.pow(m, 1.6) * used));
  return Math.max(0, Math.min(1, (bins[b] ?? 0) / 255));
}

/** A rainbow hue, 0 to 1 round (the wave pointer cycles the same: render/indicator.ts). */
const hue = rainbow;
const smooth = (k: number) => { const q = Math.max(0, Math.min(1, k)); return q * q * (3 - 2 * q); };

export function drawStones(lv: LeashView, time: number, dot: number[]): void {
  const g = lv.game, t = g.tuning, V = lv.stoneView, K = stoneKnobs(t), RK = rankKnobs(t), w = g.witch, S = t.stack;
  if (!t.leash.ranks?.on) return;
  const sizeOf = (lvl: number) => (2 + 2 * 0.4) * S.scale * rankSize(t, lvl), notes = notesSlot(lv);
  const sigil = (id: number, level: number, x: number, y: number, z: number, size: number, alpha: number, c: [number, number, number]) => {
    const sp = g.creatures[id]?.species ?? "fox", uv = lv.uv(lv.bareSlot(sp)), sh = lv.shadeOf(uv);
    if (sh) lv.stackBack.add(x, y, z, size, sh, 0.02, 0.02, 0.035, (S.backing ?? 0.6) * alpha);
    lv.stackGlyphs.add(x, y, z, size, uv, c[0], c[1], c[2], alpha);
    if (alpha > 0.5) drawEmbers(lv.stackGlyphs, dot, lv.glyphPts.get(`${uv[0]},${uv[1]}`) ?? [], x, y, z, size, false, level, c, time, id * 7 + 3, RK.embers, RK.embers.stack);
  };
  // A point `h` m up a stone's face (its sprite's up: leaning back toward the camera), a little in front of it.
  // (The batches stand things on the ground under them, render/height.ts onGround, and a point up a stone's face is over ground
  // further north, maybe higher or lower on a hill: the difference taken off, so it's the stone's foot's ground it stands on.)
  const U = SPRITE_UNIFORMS.uUp.value, upZ = (z: number, h: number) => z + 0.3 + h * U.z;
  const upY = (x: number, z: number, h: number) => h * U.y + groundHeight(x, z) - groundHeight(x, upZ(z, h));
  const shown = new Set<string>();
  for (const st of lv.stones) {
    const items = stoneStack(g, st.key);
    if (!items.length) continue;
    shown.add(st.key);
    const P = columnOf(items, sizeOf);
    V.last.set(st.key, { x: st.x, z: st.z, top: st.top, items: items.map((it, i) => ({ ...it, y: P[i].y, size: P[i].size })) });
    // The column: the friends above the enemies, each side legend lowest, babies on top (stoneStack's order, bottom first).
    const vis = smooth((K.range - Math.hypot(st.x - w.x, st.z - w.z)) / Math.max(1, K.fade));
    if (vis > 0.01) items.forEach((it, i) => { const h = st.top + P[i].y; sigil(it.id, it.level, st.x, upY(st.x, st.z, h), upZ(st.z, h), P[i].size, vis, rankColour(t, it.level, it.friend)); });
    // The spell's spot: south of the stone, only as she comes near it.
    const sx = st.x, sz = st.z + K.south, on = smooth((K.far - Math.hypot(w.x - sx, w.z - sz)) / Math.max(0.1, K.far - K.near));
    if (on > 0.01) {
      const c = hue(time * 0.25);
      lv.flat.add(sx, 0, sz, K.size * 1.9, dot, c[0], c[1], c[2], 0.22 * on, 1, true); // (its glow)
      lv.ink.add(sx, 0, sz, K.size, notes, c[0] * on, c[1] * on, c[2] * on, on);
      lv.flat.add(sx, 0, sz, K.size, notes, c[0], c[1], c[2], 0.6 * on);
    }
  }
  // The conversions: a stone's friend sigils newly loose, each from its slot in the stack (rules/game.ts, LooseSigil.from).
  const looseIds = new Set<number>();
  for (const p of g.loose ?? []) {
    looseIds.add(p.id);
    if (V.seen.has(p.id)) continue;
    V.seen.add(p.id);
    if (!p.from) continue; // (put down, not scattered: no fall)
    let C = V.converted.find(c => Math.abs(c.col.x - p.from!.x) < 0.5 && Math.abs(c.col.z - p.from!.z) < 0.5 && time - c.at < 0.5);
    if (!C) {
      const col = [...V.last.values()].find(c => Math.abs(c.x - p.from!.x) < 0.5 && Math.abs(c.z - p.from!.z) < 0.5) ?? { x: p.from.x, z: p.from.z, top: 5.4, items: [] };
      V.converted.push(C = { col, at: time });
    }
    const it = C.col.items.find(q => q.id === p.id), lvl = it?.level ?? Math.min(3, g.creatures[p.id]?.level ?? 0), y = it?.y ?? 0.6 + (p.from.y + 0.5) * sizeOf(lvl) * 1.15;
    const t0 = time + K.convert * (0.1 + 0.2 * hash2(p.id, 3, 91));
    V.falls.set(p.id, { x: C.col.x, y: upY(C.col.x, C.col.z, C.col.top + y), z: upZ(C.col.z, C.col.top + y), t0, land: time + K.convert * (0.65 + 0.2 * hash2(p.id, 5, 91)), was: it?.friend ?? true, ...(p.to === "circle" ? { hidden: true } : {}) });
  }
  for (const id of [...V.seen]) if (!looseIds.has(id)) { V.seen.delete(id); V.falls.delete(id); }
  V.converted = V.converted.filter(C => time - C.at < K.convert);
  for (const C of V.converted) {
    const T = (time - C.at) / K.convert, c = C.col;
    if (T < 0.3) { const f = 1 - T / 0.3; lv.over.add(c.x, upY(c.x, c.z, c.top + 1), upZ(c.z, c.top + 1), 9 * (1.2 - f), dot, 1, 0.95, 0.85, 0.55 * f, 1, true); } // (its flare)
    if (T < 0.35) for (const it of c.items) if (!looseIds.has(it.id)) { const h = c.top + it.y; sigil(it.id, it.level, c.x, upY(c.x, c.z, h), upZ(c.z, h), it.size, 1 - T / 0.35, rankColour(t, it.level, it.friend)); } // (the wild ones' fade)
  }
  // The loose sigils: falling, or lying on the ground to pick up.
  for (const p of g.loose ?? []) {
    const cr = g.creatures[p.id], lvl = Math.min(3, cr?.boss ? 3 : cr?.level ?? 0), to = rankColour(t, lvl, true), F = V.falls.get(p.id);
    if (F?.hidden && time < F.land) { // (gone from the stack in a fade, unseen on its way to its circle)
      const out = 1 - smooth((time - F.t0) / Math.max(0.05, (F.land - F.t0) * 0.3));
      if (out > 0.01) sigil(p.id, lvl, F.x, F.y, F.z, sizeOf(lvl), out, rankColour(t, lvl, F.was));
      continue;
    }
    if (F && time < F.land) {
      const e = smooth((time - F.t0) / Math.max(0.05, F.land - F.t0)), from = rankColour(t, lvl, F.was), m = smooth((time - F.t0) / 0.6);
      const c: [number, number, number] = [from[0] + (to[0] - from[0]) * m, from[1] + (to[1] - from[1]) * m, from[2] + (to[2] - from[2]) * m];
      const at = (q: number) => [F.x + (p.x - F.x) * q, Math.max(0.3, F.y * (1 - q) + Math.sin(q * Math.PI) * 2.5), F.z + (p.z - F.z) * q];
      const [x, y, z] = at(e), size = sizeOf(lvl);
      sigil(p.id, lvl, x, y, z, size * (1 - 0.2 * e), 1, c);
      if (e > 0.02) for (let k2 = 1; k2 <= 4; k2++) { const [bx, by, bz] = at(Math.max(0, e - k2 * 0.06)); lv.over.add(bx, by, bz, 0.35, dot, c[0], c[1], c[2], 0.5 * (1 - k2 / 5)); } // (a short trail)
      continue;
    }
    if (Math.abs(p.x - w.x) > K.range || Math.abs(p.z - w.z) > K.range) continue;
    const uv = lv.uv(lv.bareSlot(cr?.species ?? "fox")), size = sigilSize(2, RUNE_SCALE) * rankSize(t, lvl) * (p.legend ? 1.25 : 1), a = (0.62 + 0.12 * Math.sin(time * 2 + p.id)) * (F?.hidden ? smooth((time - F.land) / Math.max(0.05, K.convert * 0.3)) : 1);
    lv.groundSigil(p.x, 0.03, p.z, size, uv, to[0] * 0.8, to[1] * 0.8, to[2] * 0.8, a);
    lv.flat.add(p.x, 0.015, p.z, size * 0.9, dot, to[0], to[1], to[2], 0.18 * a / 0.62); // (a glint: ready to pick up)
    drawEmbers(lv.standing, dot, lv.glyphPts.get(`${uv[0]},${uv[1]}`) ?? [], p.x, 0.02, p.z, size, true, lvl, to, time, p.id * 11 + 5, RK.embers);
  }
  for (const k of [...V.last.keys()]) if (!shown.has(k) && !V.converted.some(C => C.col === V.last.get(k))) V.last.delete(k);
  // The cast: the ring round the stone's foot, its bars the music's analyser, and the motes.
  const W = g.witches?.[0], cs = W ? castShown(g, W) : null, show = !!cs && (cs.casting || cs.k > 0 || cs.lostFrom !== undefined);
  V.wantsSpectrum = show;
  if (!cs || !show) return;
  const st = lv.stones.find(s => s.key === cs.key), top = st ? upY(st.x, st.z, st.top) : 5.4, k = Math.max(0, Math.min(1, cs.k)), dr = Math.max(k, cs.lostFrom ?? k);
  const lostA = cs.hitAt === undefined ? 0 : Math.max(0, 1 - (g.herTime - cs.hitAt) / 1.2), n = Math.max(8, Math.min(V.bars.length, Math.round(K.bars))), cell = K.cell;
  const spec = V.spectrum, dt = Math.min(0.1, lv.frameDt);
  for (let i = 0; i < n; i++) {
    // (the music's level at this bar, rising at once and falling slowly, as an analyser's do; with no audio running, a gentle idle)
    const live = spec ? barLevel(spec, i, n) : 0.25 + 0.2 * Math.abs(Math.sin(time * 1.3 + i * 1.7) * 0.6 + Math.sin(time * 2.1 + i * 0.9) * 0.4);
    V.bars[i] = Math.max(live, V.bars[i] - dt * 1.8);
    const f = i / n, a = Math.PI / 2 + f * Math.PI * 2, ux = Math.cos(a), uz = Math.sin(a) * (K.ringTilt ?? 1), cx = cs.x, cz = cs.z + 0.6, lv0 = V.bars[i];
    const lit = f < k, lost = !lit && f < dr && lostA > 0;
    const h = lit ? 1 + Math.round(lv0 * 7 * (cs.casting ? 1 : 0.6)) : lost ? 1 + Math.round(lv0 * 3) : 1 + Math.round(lv0 * 1.5), c = lit ? hue(f + time * 0.15) : lost ? [1, 0.2, 0.15] : [0.45, 0.45, 0.5];
    for (let j = 0; j < h; j++) {
      const r = K.radius + j * cell * 1.1, x = cx + ux * r, z = cz + uz * r, tip = j === h - 1;
      // (the ring's far half, behind the stone from the camera, over it: Ed's playtest, 2026-10-29, "I can usually only see the beginning
      // and the end of the dial"; the near half lies on the ground as before)
      (uz < 0 ? lv.over : lv.flat).add(x, uz < 0 ? 0.06 : 0, z, cell * (lit ? 1 : 0.85), dot, c[0], c[1], c[2], lit ? (tip ? 1 : 0.85) : lost ? lostA : 0.35);
      if (lit && tip) lv.over.add(x, 0.2, z, cell * 0.9, dot, c[0], c[1], c[2], 0.45);
    }
  }
  const m = Math.round(6 + 34 * k * (cs.casting ? 1 : 0.4));
  for (let j = 0; j < m; j++) {
    const life = (time * (0.45 + 0.25 * hash2(j, 9, 93)) + hash2(j, 7, 93)) % 1, a = hash2(j, 5, 93) * Math.PI * 2, out = 0.6 + life * (2.5 + 3 * k), c = hue(hash2(j, 4, 93) + time * 0.1);
    lv.over.add(cs.x + Math.cos(a) * out, top * 0.6 + life * (3 + 4 * k), cs.z + 0.3 + Math.sin(a) * out * 0.6, 0.28 + 0.12 * k, dot, c[0], c[1], c[2], (1 - life) * (0.5 + 0.5 * k));
  }
}

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
