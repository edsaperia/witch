// The floor ⇄ head transition of a sigil (Ed, 2026-11-12: "Also make the floor<=>head transition more 'magical'", then "have a
// distinct flash with each transition in the sigil colour, and it burns into the ground with a glow and sparkles above the head").
// Only the drawing: the rules have already put the sigil down or picked it up at the event (rules/leash.ts); this draws it on its way.
// - Picked up: a flash in its colour where it lay, then the glyph rises to its place at the bottom of her stack along a soft arc with a
//   little sideways swirl and a short sparkle trail in its colour, eased in and out over leash.sigilFeel.fly seconds; arrived, a flash
//   at its slot and sparkles in its colour round the stack.
// - Put down: a small flash where it leaves her stack, the glyph falls along the same kind of arc to its cell, and lands with a distinct
//   flash and a ring in its colour; then it burns into the ground: written in fast, white-hot in its colour with a glow round it,
//   settling over leash.sigilFeel.burn seconds into its resting look (render/leash.ts draws the placed sigil with feelBurn).
// ?sigilfeel=old draws it as before (the amber ring and the snap into the stack). Cheap: its instances join the leash's batches (no
// draw call of its own); its state is made per event, never per frame.
import type { Tuning } from "../../rules/tuning";
import type { LeashView } from "../leash";
import { hash2 } from "../../rules/random";

/** leash.sigilFeel with its defaults (absent: on, as tuned). */
export interface SigilFeelKnobs { on: boolean; fly: number; arc: number; flash: number; burn: number; sparkles: number; trail: number }
export const SIGIL_FEEL_DEFAULT: SigilFeelKnobs = { on: true, fly: 0.4, arc: 2.5, flash: 1, burn: 1.2, sparkles: 18, trail: 6 };
export const sigilFeelKnobs = (t: Tuning): SigilFeelKnobs => ({ ...SIGIL_FEEL_DEFAULT, ...(t.leash.sigilFeel ?? {}) });
export const sigilFeelOn = (t: Tuning): boolean => sigilFeelKnobs(t).on && sigilFeelKnobs(t).fly > 0;

/** How long the arrival's sparkles round the stack last, and the flashes (s). */
const SPARKLE_LIFE = 0.9, FLASH_LIFE = 0.35;

/** A sigil on its way up: when it was picked up (the view's clock) and where it lay. */
export interface Rising { at: number; fx: number; fz: number; seed: number; /** arrived (its pixel stars sent) */ home?: boolean }
/** A sigil on its way down: when, from where in her stack, to where, the size it had there; whether it has landed (its ring and motes sent). */
export interface Falling { at: number; fx: number; fy: number; fz: number; x: number; z: number; size0: number; seed: number; landed: boolean }
export interface SigilFeelState { up: Map<number, Rising>; down: Map<number, Falling> }
export const newSigilFeel = (): SigilFeelState => ({ up: new Map(), down: new Map() });
export function resetSigilFeel(s: SigilFeelState): void { s.up.clear(); s.down.clear(); }

/** Ease in and out (cubic). */
export const easeInOut = (k: number): number => { const q = Math.min(1, Math.max(0, k)); return q < 0.5 ? 4 * q * q * q : 1 - Math.pow(-2 * q + 2, 3) / 2; };

/** Where a flying sigil is at k (0 to 1) of its way from (fx, fy, fz) to (tx, ty, tz): eased along the line, lifted `arc` m at the
 *  middle, swirling a little across (screen right, x) as it goes. Written into `out` (no allocation). */
export function flightPoint(k: number, fx: number, fy: number, fz: number, tx: number, ty: number, tz: number, arc: number, seed: number, out: { x: number; y: number; z: number }): { x: number; y: number; z: number } {
  const e = easeInOut(k), bump = Math.sin(Math.PI * Math.min(1, Math.max(0, k)));
  const swirl = Math.sin(e * Math.PI * 2 + seed * 6.283) * 0.9 * bump;
  out.x = fx + (tx - fx) * e + swirl;
  out.y = fy + (ty - fy) * e + arc * bump;
  out.z = fz + (tz - fz) * e + Math.cos(e * Math.PI * 2 + seed * 6.283) * 0.35 * bump;
  return out;
}

const P = { x: 0, y: 0, z: 0 };

/** A short sparkle trail behind a flying sigil at k, in its colour (r, g, b): `n` motes back along its own path. */
function trail(lv: LeashView, time: number, k: number, fly: number, n: number, fx: number, fy: number, fz: number, tx: number, ty: number, tz: number, arc: number, seed: number, r: number, g: number, b: number): void {
  const dot = lv.uv(0), batch = lv.stackGlyphs;
  for (let j = 1; j <= n; j++) {
    const kj = k - j * (0.06 / Math.max(0.1, fly));
    if (kj <= 0) break;
    flightPoint(kj, fx, fy, fz, tx, ty, tz, arc, seed, P);
    const tw = 0.55 + 0.45 * Math.sin(time * 37 + j * 2.1 + seed * 11), jx = (hash2(seed * 97, j, 3) - 0.5) * 0.5, jy = (hash2(seed * 97, j, 5) - 0.5) * 0.5;
    batch.add(P.x + jx, P.y + jy, P.z, 0.42 * (1 - j / (n + 1)) + 0.12, dot, r * 1.3, g * 1.3, b * 1.3, 0.9 * (1 - j / (n + 1)) * tw);
  }
}

/** A flash in a sigil's colour at (x, y, z), q (0 to 1) of its way: a soft disc opening and fading, a hot core. `flat` on the ground. */
export function flash(lv: LeashView, x: number, y: number, z: number, size: number, q: number, r: number, g: number, b: number, gain: number, flat: boolean): void {
  if (q < 0 || q >= 1) return;
  const dot = lv.uv(0), fade = (1 - q) * (1 - q), batch = flat ? lv.flat : lv.stackGlyphs;
  batch.add(x, y, z, size * (1.1 + 1.8 * q), dot, r * 1.4, g * 1.4, b * 1.4, 0.85 * fade * gain, 1, true);
  batch.add(x, y + (flat ? 0.01 : 0), z + (flat ? 0 : 0.02), size * (0.45 + 0.4 * q), dot, 0.6 + r, 0.6 + g, 0.6 + b, 0.9 * fade * gain, 1, true); // (its hot core, toward white)
}

/** The rising sigil `id` this frame, if it's on its way up to `pos` in her stack (its slot, `size` there; mutated to where it's drawn):
 *  its flight, its trail, the flash where it lay and, arrived, the flash and sparkles round the stack. Returns whether it's still in
 *  flight (the stack leaves its dots and icons off it till it's home) and the size to draw it (one shared object). Called by render/leash/stack.ts for each sigil it draws. */
export function riseInStack(lv: LeashView, id: number, time: number, pos: { x: number; y: number; z: number }, size: number, groundSize: number, r: number, g: number, b: number): { flying: boolean; size: number } {
  const u = lv.feel.up.get(id);
  if (!u) return NOT_FLYING(size);
  const F = sigilFeelKnobs(lv.game.tuning), k = (time - u.at) / F.fly;
  // the flash where it lay, on the ground
  flash(lv, u.fx, 0.03, u.fz, groundSize, (time - u.at) / FLASH_LIFE, r, g, b, F.flash, true);
  if (k < 1) {
    const tx = pos.x, ty = pos.y, tz = pos.z;
    trail(lv, time, k, F.fly, F.trail, u.fx, 0.3, u.fz, tx, ty, tz, F.arc, u.seed, r, g, b);
    flightPoint(k, u.fx, 0.3, u.fz, tx, ty, tz, F.arc, u.seed, pos);
    const e = easeInOut(k), wob = 1 + 0.18 * Math.sin(k * Math.PI * 3); // (a little tumble in its size as it turns over)
    RISE.flying = true; RISE.size = (groundSize + (size - groundSize) * e) * wob; return RISE;
  }
  // home: a flash at its slot and its sparkles round the stack
  const q = (time - u.at - F.fly) / SPARKLE_LIFE;
  if (q >= 1) { lv.feel.up.delete(id); return NOT_FLYING(size); }
  flash(lv, pos.x, pos.y, pos.z + 0.03, size, (time - u.at - F.fly) / FLASH_LIFE, r, g, b, F.flash, false);
  if (!u.home) {
    // a few pixel stars twinkling round the stack as it arrives (the fight's own sparkle: render/leash/combat.ts "flash")
    u.home = true;
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + u.seed * 6.283, rad = size * (0.8 + 0.4 * hash2(u.seed * 71, i, 3));
      lv.fx.push({ kind: "flash", x: pos.x + Math.cos(a) * rad, y: pos.y + Math.sin(a) * rad * 0.8, z: pos.z + 0.05, at: time, life: 0.3 + 0.25 * hash2(u.seed * 71, i, 5), r: Math.min(1, r * 1.2 + 0.3), g: Math.min(1, g * 1.2 + 0.3), b: Math.min(1, b * 1.2 + 0.3), seed: 0, size: 1 });
    }
  }
  const dot = lv.uv(0);
  for (let i = 0; i < F.sparkles; i++) {
    const a = hash2(u.seed * 131, i, 3) * Math.PI * 2 + q * 2.4 * (i % 2 ? 1 : -1), rad = size * (0.55 + 0.9 * q) * (0.7 + 0.5 * hash2(u.seed * 131, i, 5));
    const up = (hash2(u.seed * 131, i, 7) - 0.4) * size * 0.9 + q * 1.4, tw = 0.45 + 0.55 * Math.abs(Math.sin(time * 23 + i * 1.7)), big = i % 4 === 0 ? 1.6 : 1;
    lv.stackGlyphs.add(pos.x + Math.cos(a) * rad, pos.y + up, pos.z + 0.04 + Math.sin(a) * 0.2, 0.5 * big * (1 - q * 0.4), dot, r * 1.4 + 0.25, g * 1.4 + 0.25, b * 1.4 + 0.25, (1 - q * q) * tw);
  }
  return NOT_FLYING(size);
}
const RISE = { flying: false, size: 0 };
const NOT_FLYING = (size: number) => { RISE.flying = false; RISE.size = size; return RISE; };

/** The sigils falling to the ground this frame (render/leash.ts calls it each frame, after her stack): each one's flight and trail, the
 *  flash where it left her stack; landed, its flash and ring in its colour and its motes (once), till it has burnt in. `glyph(id)` gives
 *  a creature's glyph, its colour and its size on the ground (null: gone). `land` sends its ring and motes (the leash's fx). */
export function drawFalling(lv: LeashView, time: number, glyph: (id: number) => { uv: number[]; r: number; g: number; b: number; size: number } | null, land: (id: number, f: Falling, r: number, g: number, b: number, size: number) => void): void {
  const F = sigilFeelKnobs(lv.game.tuning);
  for (const [id, d] of lv.feel.down) {
    const s = glyph(id);
    if (!s) { lv.feel.down.delete(id); continue; }
    const k = (time - d.at) / F.fly;
    flash(lv, d.fx, d.fy, d.fz + 0.03, d.size0 * 0.8, (time - d.at) / (FLASH_LIFE * 0.8), s.r, s.g, s.b, F.flash * 0.7, false); // (leaving her stack)
    if (k < 1) {
      trail(lv, time, k, F.fly, F.trail, d.fx, d.fy, d.fz, d.x, 0.15, d.z, F.arc * 0.6, d.seed, s.r, s.g, s.b);
      flightPoint(k, d.fx, d.fy, d.fz, d.x, 0.15, d.z, F.arc * 0.6, d.seed, P);
      const e = easeInOut(k), wob = 1 + 0.18 * Math.sin(k * Math.PI * 3);
      lv.stackGlyphs.add(P.x, P.y, P.z, (d.size0 + (s.size - d.size0) * e) * wob, s.uv, s.r, s.g, s.b, 1);
      continue;
    }
    if (!d.landed) { d.landed = true; land(id, d, s.r, s.g, s.b, s.size); }
    const q = (time - d.at - F.fly) / FLASH_LIFE;
    flash(lv, d.x, 0.04, d.z, s.size, q, s.r, s.g, s.b, F.flash * 1.2, true);
    if (q < 1) lv.standing.add(d.x, 0.6 + q * 0.8, d.z + 0.3, s.size * (0.5 + q), lv.uv(0), s.r * 1.2 + 0.3, s.g * 1.2 + 0.3, s.b * 1.2 + 0.3, 0.7 * (1 - q) * (1 - q) * F.flash, 1, true); // (its flash standing up, so it reads from the camera)
    if (time - d.at - F.fly >= F.burn) lv.feel.down.delete(id);
  }
}

/** A placed sigil's burn-in (render/leash.ts draws it with this): null when it isn't burning in (drawn as ever); `hidden` while it's
 *  still on its way down; else how hot it still is (`heat`, 1 at landing to 0 at rest) and how much of it is written in (`drawn`). */
export function feelBurn(lv: LeashView, id: number, time: number): { hidden: boolean; heat: number; drawn: number } | null {
  const d = lv.feel.down.get(id);
  if (!d) return null;
  const F = sigilFeelKnobs(lv.game.tuning), since = time - d.at - F.fly;
  if (since < 0) return HIDDEN;
  const b = Math.min(1, since / Math.max(0.05, F.burn));
  BURN.heat = (1 - b) * (1 - b); BURN.drawn = Math.min(1, since / 0.3);
  return BURN;
}
const HIDDEN = { hidden: true, heat: 0, drawn: 0 }, BURN = { hidden: false, heat: 0, drawn: 0 };
