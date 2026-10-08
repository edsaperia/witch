// The portrait's colours, from the same genome the character creator edits (src/ui/creator.ts, art/witchGenome.js): each of its
// colour parts (hue, saturation, value) becomes a material of four tones (base, light, shade, deep), hue-shifted the pixel-art
// way (light towards warm, shade towards blue-violet), so every combination the creator can make reads. A part the genome has
// no colour for takes hers (DEFAULT_OUTFIT); the eyes, which the creator has no colour for yet, take `eyes` (DECISION FOR ED).

import { DEFAULT_OUTFIT } from "../../../art/witch.js";

/** The materials, each four palette entries: base, light, shade, deep (tone 0..3). */
export const MAT = {
  SKIN: 0, HAIR: 1, HAT: 2, BAND: 3, JACKET: 4, TOP: 5, CLOAK: 6, SCARF: 7, PHONES: 8, SHADES: 9, GOLD: 10, IRIS: 11,
  MOUTH: 12, TONGUE: 13, WHITE: 14, BLUSH: 15, SWEAT: 16, PLUME: 17, FLOWER: 18, FLOWER2: 19, TRIM: 20, STAR: 21,
} as const;
export type Mat = (typeof MAT)[keyof typeof MAT];
export const BASE = 0, LIGHT = 1, SHADE = 2, DEEP = 3;
/** The ink (outlines, lashes, pupils): palette index 1. */
export const INK = 1;
/** A material's tone as a palette index. */
export const col = (m: Mat, tone = BASE): number => 2 + m * 4 + tone;
export const PALETTE_SIZE = 2 + 22 * 4;

export type HSV = [number, number, number];
/** The genome's colour parts (the creator's `palette`), any of them missing. */
export type Colours = Partial<Record<string, number[]>>;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
export function hsv2rgb(h: number, s: number, v: number): [number, number, number] {
  h = ((h % 1) + 1) % 1; s = clamp(s); v = clamp(v);
  const i = Math.floor(h * 6), f = h * 6 - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
  const [r, g, b] = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][i % 6];
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
/** Hue moved d of the way towards `to` the short way round. */
const towards = (h: number, to: number, d: number) => { let k = to - h; k -= Math.round(k); return h + k * d; };
/** A colour's four tones: base, light (warmer, brighter, a little less saturated), shade and deep (cooler, darker, richer). */
export function tones([h, s, v]: HSV): HSV[] {
  return [[h, s, v], [towards(h, 0.14, 0.12), s * 0.85, Math.min(1, v * 1.12 + 0.08)], [towards(h, 0.72, 0.12), Math.min(1, s * 1.1 + 0.05), v * 0.72], [towards(h, 0.72, 0.2), Math.min(1, s * 1.15 + 0.1), v * 0.48]];
}
const abgr = ([r, g, b]: [number, number, number], a = 255) => ((a << 24) | (b << 16) | (g << 8) | r) >>> 0;

/** The fixed colours: the mouth, tongue, whites, blush, sweat, the stars. */
const FIXED: Partial<Record<Mat, HSV>> = { [MAT.MOUTH]: [0.98, 0.65, 0.45], [MAT.TONGUE]: [0.99, 0.45, 0.88], [MAT.WHITE]: [0.62, 0.04, 0.99], [MAT.BLUSH]: [0.97, 0.45, 1], [MAT.SWEAT]: [0.55, 0.35, 1], [MAT.STAR]: [0.14, 0.45, 1] };
/** Which genome part colours each material. */
const PART: Partial<Record<Mat, string>> = { [MAT.SKIN]: "skin", [MAT.HAIR]: "hair", [MAT.HAT]: "hat", [MAT.BAND]: "band", [MAT.JACKET]: "jacket", [MAT.TOP]: "top", [MAT.CLOAK]: "cloak", [MAT.SCARF]: "scarf", [MAT.PHONES]: "headphones", [MAT.SHADES]: "shades", [MAT.GOLD]: "gold", [MAT.IRIS]: "eyes", [MAT.PLUME]: "plume", [MAT.FLOWER]: "flower", [MAT.FLOWER2]: "flower2", [MAT.TRIM]: "trim" };
/** The eyes' colour while the creator has none (DECISION FOR ED: a warm amber-brown, as in Ed's reference). */
export const EYES: HSV = [0.07, 0.6, 0.62];

/** The palette (Uint32, ImageData's byte order) for a genome's colours (null: hers). */
export function portraitPalette(colours: Colours | null | undefined): Uint32Array {
  const out = new Uint32Array(PALETTE_SIZE), def = DEFAULT_OUTFIT as Record<string, number[]>;
  out[INK] = abgr([26, 16, 34]);
  for (const m of Object.values(MAT) as Mat[]) {
    const part = PART[m], c = (FIXED[m] ?? (part && (colours?.[part] ?? def[part])) ?? (m === MAT.IRIS ? EYES : [0, 0, 0.5])) as HSV;
    tones([c[0], c[1], c[2]]).forEach((t, i) => (out[col(m, i)] = abgr(hsv2rgb(t[0], t[1], t[2]))));
  }
  return out;
}
