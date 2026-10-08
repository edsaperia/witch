// Hand-placed pixel maps (the portrait's round 2, docs/PORTRAIT-STYLE.md): a part as rows of letters, '.' empty, each letter
// one material at one tone through the part's legend, so the creator's colours swap without redrawing. Placed in whole pixels
// on an anchor (the part's own reference point: the brim's centre, the head's centre, the neck pivot), never rotated or scaled.

import type { Mat } from "../palette";

/** The outline tone (darker and richer than deep, in the material's own hue), after base 0, light 1, shade 2, deep 3. */
export const OUTLINE = 4;

export interface PixMap {
  /** where the part's reference point is, in its rows (x, y) */
  readonly anchor: readonly [number, number];
  /** each letter's material and tone */
  readonly legend: Readonly<Record<string, readonly [Mat, number]>>;
  /** its pixels, top row first, all the same width */
  readonly rows: readonly string[];
}

/** A template block's rows (its blank first and last lines dropped). */
export const rows = (s: string): string[] => s.split("\n").filter(r => r.length > 0);

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
/** Every letter the map uses, and the ones its legend lacks. */
export function missingLetters(m: PixMap): string[] {
  const seen = new Set<string>(); for (const r of m.rows) for (const c of r) if (c !== ".") seen.add(c);
  return [...seen].filter(c => !(c in m.legend));
}
