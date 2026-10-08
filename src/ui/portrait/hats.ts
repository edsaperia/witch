// The portrait's other hats (art builder 1, on art3's frame): the creator's hats that aren't pointed witch's hats, each drawn
// in the hat's own coordinates (the brim's centre at 0, 0, y down; the head's centre at 0, 14, the hair's crown at about -4.5),
// lit from the upper left like the rest of her, in the hat's colours (HAT, BAND) and the trimmings' (FLOWER, FLOWER2, PLUME,
// GOLD, WHITE). Merged into draw.ts's HATS, so a hat is an entry here.

import { BASE, DEEP, INK, LIGHT, MAT, SHADE, col, type Mat } from "./palette";
import { hash, inEll, tri, type Box } from "./raster";
import type { Look, Params } from "./rig";

export interface HatDraw { box: (l: Look) => Box; px: (x: number, y: number, l: Look, p: Params) => number }

/** A tone across a part, rel -1 (its lit left) to 1 (its shaded right). */
const across = (m: Mat, rel: number): number => col(m, rel < -0.55 ? LIGHT : rel > 0.78 ? DEEP : rel > 0.3 ? SHADE : BASE);
/** A tone over a round part (nx, ny -1..1 across it): light from the upper left. */
const round = (m: Mat, nx: number, ny: number): number => { const v = nx * 0.65 + ny * 0.6; return col(m, v < -0.5 ? LIGHT : v > 0.75 ? DEEP : v > 0.28 ? SHADE : BASE); };
/** A brim seen a little from above: an ellipse about (0, 0.5), its ends lifted by `lift` (px at the tips); "top" its upper face,
 *  "edge" the strip of its front edge and underside below that, null off it. */
function brim(x: number, y: number, B: number, ry: number, lift = 0, liftL = 0): "top" | "edge" | null {
  if (Math.abs(x) > B) return null;
  const k = (x / B) ** 4, yy = y + lift * k + liftL * Math.max(0, -x / B) ** 2;
  if (inEll(x, yy, 0, 0.5, B, ry)) return "top";
  if (yy > 0.5 && inEll(x, yy - 1.4, 0, 0.5, B, ry)) return "edge";
  return null;
}
const brimTone = (m: Mat, part: "top" | "edge", x: number, B: number) => (part === "edge" ? col(m, DEEP) : col(m, x < -B * 0.45 ? LIGHT : x > B * 0.5 ? SHADE : BASE));
/** A hat's band (its glowing band, the creator's `band`) between y0 and 0. */
const bandAt = (y: number, l: Look) => { const bh = 2.6 * l.hatBand; return bh > 0.2 && y > -bh - 0.5 && y <= 0.5; };
const bandTone = (y: number, l: Look) => col(MAT.BAND, y < -2.6 * l.hatBand + 0.5 ? LIGHT : BASE);
/** Distance from (x, y) to a polyline, and how far along it (0..1) the nearest point is. */
function along(x: number, y: number, pts: readonly (readonly [number, number])[]): { d: number; t: number } {
  let best = Infinity, bt = 0, acc = 0, total = 0;
  for (let i = 1; i < pts.length; i++) total += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  for (let i = 1; i < pts.length; i++) {
    const [ax, ay] = pts[i - 1], [bx, by] = pts[i], vx = bx - ax, vy = by - ay, L = Math.hypot(vx, vy);
    const u = Math.max(0, Math.min(1, ((x - ax) * vx + (y - ay) * vy) / (L * L))), d = Math.hypot(x - ax - u * vx, y - ay - u * vy);
    if (d < best) { best = d; bt = (acc + u * L) / total; }
    acc += L;
  }
  return { d: best, t: bt };
}
/** A fluffy ball (a pompom): ragged at its edge, lit from the upper left. */
const pompom = (x: number, y: number, cx: number, cy: number, r: number, m: Mat): number => {
  const dx = x - cx, dy = y - cy, a = Math.atan2(dy, dx), rr = r * (0.88 + 0.22 * hash(Math.floor((a + 4) * 3.2), 11));
  if (dx * dx + dy * dy > rr * rr) return 0;
  return hash(Math.round(x), Math.round(y), 12) > 0.8 ? col(m, LIGHT) : round(m, dx / r, dy / r);
};

const top: HatDraw = {
  box: l => { const h = 15 * Math.min(1.8, l.hatHeight), B = 13 + 2 * Math.min(2, l.hatBrim); return [-B - 2, -h - 4, B + 2, 5]; },
  px: (x, y, l) => {
    const h = 15 * Math.min(1.8, l.hatHeight), B = 13 + 2 * Math.min(2, l.hatBrim), b = brim(x, y, B, 2.4, 2.4);
    if (b && y > 0.5) return brimTone(MAT.HAT, b, x, B);
    const w = 8.5 + 1.3 * Math.max(0, -y) / h; // (flaring a little to its top)
    if (inEll(x, y, 0, -h, w, 1.7)) return col(MAT.HAT, x < 2 ? LIGHT : BASE); // its top
    if (Math.abs(x) <= w && y <= 0.5 && y >= -h) {
      if (bandAt(y, l)) return bandTone(y, l);
      const rel = x / w;
      if (Math.abs(rel + 0.42) < 0.09) return col(MAT.HAT, LIGHT); // (the silk's sheen)
      return across(MAT.HAT, rel);
    }
    return b ? brimTone(MAT.HAT, b, x, B) : 0;
  },
};

const cowboy: HatDraw = {
  box: l => { const B = 17 + 5 * Math.min(2, l.hatBrim), h = 12 * Math.min(1.8, l.hatHeight); return [-B - 2, -h - 3, B + 2, 6]; },
  px: (x, y, l) => {
    const B = 17 + 5 * Math.min(2, l.hatBrim), h = 12 * Math.min(1.8, l.hatHeight), b = brim(x, y, B, 3, 5.5);
    if (b && y > 0.5) return brimTone(MAT.HAT, b, x, B);
    // the crown: tapering to its top, creased down the middle, pinched at the front
    const ax = Math.abs(x), w = 9.5 - Math.max(0, -y - h * 0.55) * 0.45, topY = -h + (ax < 6 ? 2.2 * (1 - (ax / 6) ** 2) : 0) + Math.max(0, ax - 5.5) ** 2 * 0.35;
    if (ax <= w && y <= 0.5 && y >= topY) {
      if (bandAt(y, l)) return bandTone(y, l);
      if (ax < 5 && y < topY + 1.2) return col(MAT.HAT, DEEP); // (the crease's shadow)
      if (inEll(ax, y, 4.6, -h + 4.5, 1.3, 2.2)) return col(MAT.HAT, x < 0 ? SHADE : DEEP); // (the pinches)
      return across(MAT.HAT, x / w);
    }
    return b ? brimTone(MAT.HAT, b, x, B) : 0;
  },
};

const conical: HatDraw = {
  box: l => { const B = 18 + 6 * Math.min(2, l.hatBrim), ht = 10 * Math.min(1.6, l.hatHeight); return [-B - 1, -ht - 3, B + 1, 4]; },
  px: (x, y, l) => {
    const B = 18 + 6 * Math.min(2, l.hatBrim), ht = 10 * Math.min(1.6, l.hatHeight);
    if (inEll(x, y, 0, -ht, 1.8, 1.4)) return col(MAT.BAND, y < -ht ? LIGHT : BASE); // its knot
    if (y > 2.2 || y < -ht) return 0;
    const half = B * Math.min(1, (y + ht) / ht);
    if (Math.abs(x) > half) return 0;
    if (y > 0.6) return Math.abs(x) <= B - 1 ? col(MAT.HAT, DEEP) : 0; // (its rim's underside)
    const u = x / Math.max(1, half);
    if ((((u + 1) * 5) % 1) < 0.12 && Math.abs(u) < 0.9 && y > -ht + 2) return col(MAT.HAT, u > 0.2 ? DEEP : SHADE); // (the ribs)
    if (Math.abs(y + ht * 0.45) < 0.6 && Math.floor(x + 40) % 2 === 0) return col(MAT.HAT, u < 0.3 ? LIGHT : BASE); // (a woven ring)
    return across(MAT.HAT, u * 0.9 + 0.08);
  },
};

const boppers: HatDraw = {
  box: () => [-17, -26, 17, 5],
  px: (x, y) => {
    for (const s of [-1, 1]) {
      const bx = s * 11.5, by = -20.5;
      if (inEll(x, y, bx, by, 3.3, 3.3)) { // the balls: shiny, a glint and a sparkle
        const dx = x - bx, dy = y - by;
        if ((dx + 1.2) ** 2 + (dy + 1.3) ** 2 < 0.9) return col(MAT.WHITE, BASE);
        return round(s < 0 ? MAT.FLOWER : MAT.FLOWER2, dx / 3.3, dy / 3.3);
      }
      // the springs: a wire zigzagging from the band up to the ball
      const ax = s * 7.5, ay = -4, ex = s * 10.8, ey = -17.6, vx = ex - ax, vy = ey - ay, L = Math.hypot(vx, vy);
      const u = ((x - ax) * vx + (y - ay) * vy) / (L * L), d = ((x - ax) * vy - (y - ay) * vx) / L;
      if (u >= 0 && u <= 1 && Math.abs(d - 1.4 * (tri(u * L / 2.2) * 2 - 1)) < 0.75) return col(MAT.HAT, u * L % 2.2 < 1.1 ? LIGHT : SHADE);
    }
    // the band over the top of her head
    const d = Math.hypot(x / 19.6, (y - 13) / 18.6);
    if (Math.abs(d - 1) < 0.055 && y < 3) return col(MAT.HAT, x > 6 ? SHADE : y < -3 ? LIGHT : BASE);
    return 0;
  },
};

const party: HatDraw = {
  box: l => { const ht = 22 * Math.min(1.8, l.hatHeight); return [-11, -ht - 5, 11, 4]; },
  px: (x, y, l) => {
    const ht = 22 * Math.min(1.8, l.hatHeight), pp = pompom(x, y, 0, -ht - 1, 3.1, MAT.FLOWER2);
    if (pp) return pp;
    // the frill round its foot
    if (y > -1.4 && y < 2 && Math.abs(x) <= 10 && y <= 0.6 + 1.3 * tri((x + 40) / 2.4)) return col(MAT.FLOWER2, y > 0.8 ? SHADE : x < -4 ? LIGHT : BASE);
    const t = -y / ht, w = 8 * (1 - t) + 0.6;
    if (y > 0 || t > 1 || Math.abs(x) > w) return 0;
    const rel = x / w, stripe = Math.floor((x * 0.7 - y + 60) / 3.4) % 2;
    if (stripe && hash(Math.floor((x * 0.7 - y + 60) / 3.4), 3) > 0.55 && (Math.round(x) + Math.round(y)) % 3 === 0) return col(MAT.STAR, BASE); // (glitter on the stripes)
    return across(stripe ? MAT.FLOWER : MAT.HAT, rel);
  },
};

/** The musketeer's plume: its spine from the brooch, up, over and down behind. */
const PLUME: readonly (readonly [number, number])[] = [[-11, -3], [-8, -12], [-1, -18.5], [8, -20], [16, -16.5], [21.5, -10], [23, -5]];
const musketeer: HatDraw = {
  box: l => { const B = 18 + 6 * Math.min(2, l.hatBrim); return [-B - 2, -26, Math.max(B, 26) + 2, 6]; },
  px: (x, y, l) => {
    const B = 18 + 6 * Math.min(2, l.hatBrim), b = brim(x, y, B, 3, 1.5, 9); // (cocked up at her right, our left)
    if (b && y > 0.5 && x > -B * 0.45) return brimTone(MAT.HAT, b, x, B);
    if (inEll(x, y, -10.5, -3, 2, 2)) return col(MAT.GOLD, x < -11 && y < -3.3 ? LIGHT : BASE); // the brooch
    // the plume: barbed, ragged at its edges, its quill lighter
    const { d, t } = along(x, y, PLUME), s = t * 48, w = (1 - t) * 2.6 + 1.6 + 0.9 * Math.sin(t * Math.PI);
    if (d < w * (0.86 + 0.28 * hash(Math.floor(s), 21))) {
      if (d < 0.55 && t < 0.9) return col(MAT.PLUME, LIGHT);
      return col(MAT.PLUME, (s + d * 0.9) % 2.2 < 0.8 ? SHADE : t > 0.75 ? SHADE : BASE);
    }
    // the crown: a low round dome with its band
    if (y <= 0.5 && inEll(x, y, 0, 0.5, 10.5, 10)) return bandAt(y, l) ? bandTone(y, l) : round(MAT.HAT, x / 10.5, (y + 5) / 10);
    return b ? brimTone(MAT.HAT, b, x, B) : 0;
  },
};

const beanie: HatDraw = {
  box: () => [-18, -20, 18, 6],
  px: (x, y) => {
    const pp = pompom(x, y, 0, -13.5, 4.2, MAT.FLOWER);
    if (pp) return pp;
    if (y >= -0.5 && y <= 4.5 && Math.abs(x) <= 16.6 - Math.max(0, y - 3) * 0.6) // the turned-up cuff, ribbed
      return col(MAT.HAT, Math.floor(x + 40) % 2 ? (x > 9 ? DEEP : SHADE) : x < -10 ? LIGHT : y > 3.4 ? SHADE : BASE);
    if (y < -0.5 && inEll(x, y, 0, 0.5, 16, 13.2)) { // the crown, knitted in chevron rows
      const v = y + Math.abs(((x + 40) % 4) - 2) * 0.6;
      return Math.floor(v + 40) % 3 === 0 ? col(MAT.HAT, x > 6 ? DEEP : SHADE) : round(MAT.HAT, x / 16, (y + 6) / 13);
    }
    return 0;
  },
};

/** The crown's points: their x and height (the middle one tallest). */
const POINTS: readonly (readonly [number, number])[] = [[-10, 5.6], [-5, 6], [0, 7.4], [5, 6], [10, 5.6]];
const crown: HatDraw = {
  box: () => [-14, -15, 14, 4],
  px: (x, y) => {
    if (Math.abs(x) > 12.6) return 0;
    const yb = y - 1.2 * (1 - (x / 12.6) ** 2); // (its front curving down towards us)
    for (const [p, h] of POINTS) if (inEll(x, yb, p, -4.6 - h, 1.25, 1.25)) return col(MAT.GOLD, x < p ? LIGHT : BASE); // (the balls on its points)
    if (yb < -4.5) { // its points
      for (const [p, h] of POINTS) { const k = Math.abs(x - p) / 2.6; if (k <= 1 && yb >= -4.5 - h * (1 - k)) return col(MAT.GOLD, x < p - 0.6 ? (x < -6 ? LIGHT : BASE) : x > 6 ? DEEP : SHADE); }
      return 0;
    }
    if (yb > 1) return 0;
    // its band: rims, gems, a glint
    if (yb < -3.6) return col(MAT.GOLD, LIGHT);
    if (yb > 0.2) return col(MAT.GOLD, DEEP);
    for (const [gx, m] of [[-6.5, MAT.FLOWER], [0, MAT.FLOWER2], [6.5, MAT.FLOWER]] as const) if (inEll(x, yb, gx, -1.7, 1.6, 1.4)) return (x - gx + 0.6) ** 2 + (yb + 2.3) ** 2 < 0.5 ? col(MAT.WHITE, BASE) : round(m, (x - gx) / 1.6, (yb + 1.7) / 1.4);
    return col(MAT.GOLD, x < -8 ? LIGHT : x > 7 ? SHADE : BASE);
  },
};

/** The mushroom cap's spots: where (cap coordinates, -1..1) and how big (px). */
const SPOTS: readonly (readonly [number, number, number])[] = [[-0.55, -0.45, 2.6], [0.05, -0.75, 2.2], [0.5, -0.35, 2.8], [-0.15, -0.15, 1.6], [-0.85, -0.05, 1.5], [0.85, -0.02, 1.4], [0.25, 0.02, 1.2]];
const mushroom: HatDraw = {
  box: l => { const B = 19 + 3 * Math.min(2, l.hatBrim), R = 13 * Math.min(1.6, l.hatHeight); return [-B - 1, -R + 1, B + 1, 6]; },
  px: (x, y, l) => {
    const B = 19 + 3 * Math.min(2, l.hatBrim), R = 13 * Math.min(1.6, l.hatHeight);
    if (y > 1.8) return y < 4.2 && inEll(x, y, 0, 1.8, B * 0.9, 2.4) ? col(MAT.WHITE, Math.floor(x + 40) % 2 ? DEEP : SHADE) : 0; // the gills
    if (!inEll(x, y, 0, 1.8, B, R)) return 0;
    const nx = x / B, ny = (y - 1.8) / R;
    for (const [sx, sy, r] of SPOTS) { const dx = x - sx * B, dy = y - 1.8 - sy * R; if (dx * dx + dy * dy < r * r) return col(MAT.WHITE, dx + dy < -r * 0.6 ? BASE : dx + dy > r * 0.7 ? SHADE : BASE); }
    if (y > 0.4) return col(MAT.HAT, DEEP); // (its rim)
    return round(MAT.HAT, nx, ny * 1.1 + 0.25);
  },
};

const traffic: HatDraw = {
  box: l => { const ht = 24 * Math.min(1.8, l.hatHeight); return [-15, -ht - 3, 15, 4]; },
  px: (x, y, l) => {
    const ht = 24 * Math.min(1.8, l.hatHeight), t = -y / ht;
    if (Math.abs(x) <= 13.5 && y >= -1 && y <= 2) return col(MAT.HAT, y > 1 ? DEEP : x < -8 ? BASE : SHADE); // its square foot
    if (y > -0.5 || t > 1 || Math.abs(x) > 9.5 * (1 - t) + 1.3) return 0;
    if (t > 0.94 && inEll(x, y, 0, -ht + 0.6, 1.1, 0.6)) return INK; // (the hole at its top)
    const rel = x / (9.5 * (1 - t) + 1.3), hi = (t > 0.28 && t < 0.42) || (t > 0.58 && t < 0.69);
    if (hi) return col(MAT.WHITE, rel < -0.4 ? BASE : rel > 0.45 ? SHADE : BASE);
    if (hash(Math.round(x), Math.round(y), 31) > 0.95) return col(MAT.HAT, DEEP); // (scuffs)
    return across(MAT.HAT, rel);
  },
};

/** The hats besides the pointed witch's hats, by the creator's names. */
export const OTHER_HATS: Record<string, HatDraw> = { top, cowboy, conical, boppers, party, musketeer, beanie, crown, mushroom, traffic };
