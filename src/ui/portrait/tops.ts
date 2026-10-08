// The portrait's tops with patterns (art builder 1, on art3's frame): in body coordinates (the neck pivot at 0, 0, y down),
// inside her shoulders. The jacket's open front shows the top under it (|x| < 7 - (y - 3) * 0.42); the rest is the jacket, or
// for the poncho the blanket itself, or for the cape the cloak. Merged into draw.ts's TOPS.

import { BASE, DEEP, LIGHT, MAT, SHADE, col, type Mat } from "./palette";
import { hash, inEll, tri } from "./raster";
import type { Params } from "./rig";

const ORDER = [LIGHT, BASE, SHADE, DEEP];
/** A tone step (0 light .. 3 deep) over the bust, light from the upper left (as draw.ts's `lit`), plus `k` steps. */
const step = (nx: number, ny: number, k = 0): number => { const v = nx * 0.6 + ny * 0.7; return Math.max(0, Math.min(3, (v < -0.62 ? 0 : v > 0.85 ? 3 : v > 0.38 ? 2 : 1) + k)); };
const lit = (m: Mat, x: number, y: number, k = 0) => col(m, ORDER[step(x / 27, (y - 12) / 14, k)]);
/** In the open front of her jacket. */
const front = (x: number, y: number) => Math.abs(x) < 7 - (y - 3) * 0.42;

/** Sequins: overlapping discs in rows, each lit on its upper left and shaded at its lower right, a few catching the light. */
function sequin(m: Mat, x: number, y: number): number {
  const row = Math.floor(y / 2), sx = x + (row % 2), lx = sx - Math.floor(sx / 2) * 2, ly = y - row * 2;
  if (hash(Math.floor(sx / 2), row, 41) > 0.975) return col(MAT.STAR, BASE);
  return lit(m, x, y, lx < 0.9 && ly < 0.9 ? -1 : lx > 1.1 && ly > 1.1 ? 1 : 0);
}

/** The poncho's woven bands, stepping in zigzags, a row of diamonds in the widest. */
function poncho(x: number, y: number): number {
  const z = y - 1.6 * tri((x + 40) / 6), band = Math.floor((z + 40) / 3.5) % 4, local = ((z + 40) % 3.5);
  if (band === 3 && Math.abs(((x + 40) % 6) - 3) + Math.abs(local - 1.75) < 1.6) return lit(MAT.FLOWER2, x, y);
  if (Math.abs(local - 0.2) < 0.45 && Math.floor(x + 40) % 2 === 0) return lit(MAT.WHITE, x, y, 1); // (a stitched line along each band)
  return lit(band === 0 ? MAT.TOP : band === 1 ? MAT.JACKET : band === 2 ? MAT.TOP : MAT.FLOWER, x, y);
}

export const OTHER_TOPS: Record<string, (x: number, y: number, p: Params) => number> = {
  // a sequinned jacket over a plain top
  sequins: (x, y) => (front(x, y) ? col(MAT.TOP, y < 6 ? SHADE : BASE) : sequin(MAT.JACKET, x, y)),
  // a fishnet top under the jacket, her skin through the net
  mesh: (x, y) => {
    if (!front(x, y)) return lit(MAT.JACKET, x, y);
    const a = ((x + y + 60) % 3 + 3) % 3, b = ((x - y + 60) % 3 + 3) % 3;
    return a < 0.75 || b < 0.75 ? col(MAT.TOP, DEEP) : col(MAT.SKIN, y < 6 ? DEEP : SHADE);
  },
  poncho,
  // the cloak over her shoulders, falling in folds, its clasp's chain across her chest
  cape: (x, y) => {
    if (front(x, y)) {
      for (const s of [-1, 1]) if (inEll(x, y, s * 4.4, 6, 1.4, 1.4)) return col(MAT.GOLD, x < s * 4.4 ? LIGHT : BASE);
      if (Math.abs(y - 6.6) < 0.5 && Math.abs(x) < 3.4) return col(MAT.GOLD, Math.floor(x + 40) % 2 ? BASE : SHADE);
      return col(MAT.TOP, y < 6 ? SHADE : BASE);
    }
    const f = ((Math.abs(x) + 40) / 6.5) % 1; // (folds hanging from her shoulders)
    return lit(MAT.CLOAK, x, y, f > 0.78 && y > 8 ? 1 : f < 0.12 && y > 8 ? -1 : 0);
  },
};
