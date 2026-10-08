// Hand-placed pixel maps as art builder 1 draws them (the portrait's round 2, docs/PORTRAIT-STYLE.md): a part as rows of the
// shared letters (sprite.ts LEGEND), '.' empty, on an anchor (its reference point: the brim's centre, the head's centre, the neck
// pivot), so the sliders can work on whole rows and columns before it becomes a Sprite. Never rotated or scaled.

import { LEGEND, sprite, type Sprite } from "../sprite";

export interface PixMap {
  /** where the part's reference point is, in its rows (x, y) */
  readonly anchor: readonly [number, number];
  /** its pixels in LEGEND's letters, top row first, all the same width */
  readonly rows: readonly string[];
}

/** A template block's rows (its blank first and last lines dropped). */
export const rows = (s: string): string[] => s.split("\n").filter(r => r.length > 0);
/** The map as a Sprite (its rows kept whole: blank rows included). */
export const toSprite = (m: PixMap): Sprite => sprite(m.rows.join("\n"));

/** Resamples rows a..b (inclusive) of `rows` to `n` rows (nearest), keeping the rest. */
export function stretchRows(rs: readonly string[], a: number, b: number, n: number): string[] {
  const k = b - a + 1, mid = Array.from({ length: Math.max(1, n) }, (_, i) => rs[a + Math.min(k - 1, Math.floor((i * k) / Math.max(1, n)))]);
  return [...rs.slice(0, a), ...mid, ...rs.slice(b + 1)];
}
/** Resamples columns a..b (inclusive) of every row to `n` columns (nearest), keeping the rest. */
export function stretchCols(rs: readonly string[], a: number, b: number, n: number): string[] {
  const k = b - a + 1, pick = Array.from({ length: Math.max(1, n) }, (_, i) => a + Math.min(k - 1, Math.floor((i * k) / Math.max(1, n))));
  return rs.map(r => r.slice(0, a) + pick.map(c => r[c]).join("") + r.slice(b + 1));
}
/** Shifts each row y < `until` right by shift(y) whole pixels (negative: left), padding both sides by `pad`. */
export function shear(rs: readonly string[], until: number, shift: (y: number) => number, pad: number): string[] {
  const p = ".".repeat(pad);
  return rs.map((r, y) => {
    const s = y < until ? Math.max(-pad, Math.min(pad, shift(y))) : 0;
    const row = p + r + p;
    return s > 0 ? ".".repeat(s) + row.slice(0, row.length - s) : s < 0 ? row.slice(-s) + ".".repeat(-s) : row;
  });
}
/** The letters a map uses that LEGEND lacks. */
export function missingLetters(m: PixMap): string[] {
  const seen = new Set<string>(); for (const r of m.rows) for (const c of r) if (c !== ".") seen.add(c);
  return [...seen].filter(c => !(c in LEGEND));
}
