// Hand-placed pixel parts (the portrait's art direction, round 1: docs/PORTRAIT-STYLE.md): each part an ASCII grid of palette
// letters, `.` empty, each letter one material at one tone (LEGEND), so the creator's colours swap without redrawing. Parts are
// placed in whole pixels only, never rotated or scaled (a flying hat aside).

import { BASE, DEEP, HIGH, INK, LIGHT, MAT, OUTLINE, SHADE, col } from "./palette";
import type { Raster, Xf } from "./raster";

/** A pixel part: its size and its palette indices (0: empty). */
export interface Sprite { w: number; h: number; px: Uint8Array }
/** A part placed: its sprite and where its top-left goes (whole pixels, in the frame it's placed in). */
export interface Placed { sprite: Sprite; x: number; y: number }

/** The letters (docs/PORTRAIT-STYLE.md; art direction round 1's target maps). Every letter is taken; a new one needs a symbol (or a free digit-like character) added here, never reused. */
export const LEGEND: Record<string, number> = {
  // hair: base, light, glint, shade, deep, outline; brows in its deep tone
  H: col(MAT.HAIR, BASE), h: col(MAT.HAIR, LIGHT), g: col(MAT.HAIR, HIGH), d: col(MAT.HAIR, SHADE), D: col(MAT.HAIR, DEEP), o: col(MAT.HAIR, OUTLINE), B: col(MAT.HAIR, DEEP),
  // skin: base, light, shade, deep, outline (warm brown: the jaw, the lower lids)
  S: col(MAT.SKIN, BASE), s: col(MAT.SKIN, LIGHT), k: col(MAT.SKIN, SHADE), n: col(MAT.SKIN, DEEP), K: col(MAT.SKIN, OUTLINE),
  // the hat: base, light, shade, deep, outline (dark blue-violet)
  p: col(MAT.HAT, BASE), l: col(MAT.HAT, LIGHT), q: col(MAT.HAT, SHADE), Q: col(MAT.HAT, DEEP), O: col(MAT.HAT, OUTLINE),
  // the hatband (red by default) and its buckle (gold)
  r: col(MAT.BAND, BASE), e: col(MAT.BAND, LIGHT), f: col(MAT.BAND, SHADE), F: col(MAT.BAND, DEEP),
  Y: col(MAT.GOLD, BASE), y: col(MAT.GOLD, SHADE), G: col(MAT.GOLD, LIGHT),
  // the eyes: the lash line (the one near-black), whites, the iris's tones, the pupil, highlights
  L: INK, W: col(MAT.WHITE, BASE), w: col(MAT.WHITE, SHADE), "*": col(MAT.WHITE, HIGH),
  J: col(MAT.IRIS, DEEP), I: col(MAT.IRIS, BASE), i: col(MAT.IRIS, LIGHT), P: col(MAT.IRIS, OUTLINE),
  // the mouth: its line and inside, the tongue; blush; sweat and tears
  M: col(MAT.MOUTH, OUTLINE), T: col(MAT.MOUTH, BASE), t: col(MAT.TONGUE, BASE), R: col(MAT.BLUSH, BASE),
  a: col(MAT.SWEAT, LIGHT), b: col(MAT.SWEAT, BASE), v: col(MAT.SWEAT, OUTLINE),
  // the robe and its collar (the jacket's and the top's colours)
  C: col(MAT.JACKET, BASE), Z: col(MAT.JACKET, LIGHT), z: col(MAT.JACKET, SHADE), X: col(MAT.JACKET, DEEP), x: col(MAT.JACKET, OUTLINE),
  // (art builder 1) the top in the jacket's V; the blossoms on the flowers hat; the hat-tip hand's cuff (the trim)
  A: col(MAT.TOP, BASE), E: col(MAT.TOP, SHADE), U: col(MAT.FLOWER, BASE), u: col(MAT.FLOWER, SHADE), V: col(MAT.FLOWER2, BASE), N: col(MAT.FLOWER2, SHADE),
  m: col(MAT.TRIM, BASE), c: col(MAT.TRIM, SHADE), j: col(MAT.TRIM, LIGHT),
  // (art builder 1) headphones resting round her neck, and the scarf
  "1": col(MAT.PHONES, LIGHT), "2": col(MAT.PHONES, BASE), "3": col(MAT.PHONES, SHADE), "4": col(MAT.PHONES, DEEP), "5": col(MAT.PHONES, OUTLINE),
  "6": col(MAT.SCARF, LIGHT), "7": col(MAT.SCARF, BASE), "8": col(MAT.SCARF, SHADE), "9": col(MAT.SCARF, DEEP), "0": col(MAT.SCARF, OUTLINE),
};

/** A sprite from its grid (lines of equal width once leading and trailing blank lines are dropped; short lines padded). */
export function sprite(text: string, legend: Record<string, number> = LEGEND): Sprite {
  const lines = text.split("\n").map(l => l.replace(/\s+$/, "")).filter((l, i, a) => l.length || (i > 0 && i < a.length - 1));
  while (lines.length && !lines[0].length) lines.shift();
  while (lines.length && !lines[lines.length - 1].length) lines.pop();
  const w = Math.max(0, ...lines.map(l => l.length)), h = lines.length, px = new Uint8Array(w * h);
  lines.forEach((l, y) => { for (let x = 0; x < l.length; x++) { const ch = l[x]; if (ch === "." || ch === " ") continue; const v = legend[ch]; if (v === undefined) throw new Error(`portrait sprite: no letter "${ch}" in the legend`); px[y * w + x] = v; } });
  return { w, h, px };
}
/** Flipped left to right (a part on the other side; never the eyes' highlights: the light stays on the left). */
export function mirror(s: Sprite): Sprite { const px = new Uint8Array(s.px.length); for (let y = 0; y < s.h; y++) for (let x = 0; x < s.w; x++) px[y * s.w + x] = s.px[y * s.w + s.w - 1 - x]; return { w: s.w, h: s.h, px }; }
/** Rows y0..y1 (inclusive) resampled to `count` rows, nearest (repeating or dropping whole rows): the creator's hat height. */
export function resizeRows(s: Sprite, y0: number, y1: number, count: number): Sprite {
  const n = y1 - y0 + 1, rows: number[] = [];
  for (let y = 0; y < y0; y++) rows.push(y);
  for (let k = 0; k < count; k++) rows.push(y0 + Math.min(n - 1, Math.floor(((k + 0.5) * n) / Math.max(1, count))));
  for (let y = y1 + 1; y < s.h; y++) rows.push(y);
  const px = new Uint8Array(rows.length * s.w); rows.forEach((y, i) => px.set(s.px.subarray(y * s.w, (y + 1) * s.w), i * s.w)); return { w: s.w, h: rows.length, px };
}
/** Columns x0..x1 resampled to `count` columns, nearest: the creator's brim width. */
export function resizeCols(s: Sprite, x0: number, x1: number, count: number): Sprite {
  const n = x1 - x0 + 1, cols: number[] = [];
  for (let x = 0; x < x0; x++) cols.push(x);
  for (let k = 0; k < count; k++) cols.push(x0 + Math.min(n - 1, Math.floor(((k + 0.5) * n) / Math.max(1, count))));
  for (let x = x1 + 1; x < s.w; x++) cols.push(x);
  const w = cols.length, px = new Uint8Array(w * s.h); for (let y = 0; y < s.h; y++) for (let i = 0; i < w; i++) px[y * w + i] = s.px[y * s.w + cols[i]]; return { w, h: s.h, px };
}
/** Sheared by whole pixels: each row moved `per` px right for every `every` rows above `from` (the creator's hat tilt). */
export function shear(s: Sprite, from: number, every: number, per: number): Sprite {
  if (!per || !every) return s;
  const pad = Math.ceil(Math.abs(per) * from / every) + 1, w = s.w + pad * 2, px = new Uint8Array(w * s.h);
  for (let y = 0; y < s.h; y++) { const dx = Math.round(per * Math.floor(Math.max(0, from - y) / every)); for (let x = 0; x < s.w; x++) { const v = s.px[y * s.w + x]; if (v) px[y * w + x + pad + dx] = v; } }
  return { w, h: s.h, px };
}

/** Draws a sprite with its top-left at (x, y) (whole pixels); with `where`, only where it says (a mask, in the raster's pixels). */
export function blit(r: Raster, s: Sprite, x: number, y: number, where?: (x: number, y: number) => boolean): void {
  x = Math.round(x); y = Math.round(y);
  for (let j = 0; j < s.h; j++) { const ry = y + j; if (ry < 0 || ry >= r.h) continue; for (let i = 0; i < s.w; i++) { const v = s.px[j * s.w + i], rx = x + i; if (!v || rx < 0 || rx >= r.w || (where && !where(rx, ry))) continue; r.px[ry * r.w + rx] = v; } }
}
/** Draws a sprite through a transform (only for things in flight, a hat flying off: drawn art is otherwise never turned). */
export function blitXf(r: Raster, s: Sprite, xf: Xf): void {
  r.draw((x, y) => { const i = Math.floor(x), j = Math.floor(y); return i >= 0 && j >= 0 && i < s.w && j < s.h ? s.px[j * s.w + i] : 0; }, [0, 0, s.w, s.h], xf);
}
