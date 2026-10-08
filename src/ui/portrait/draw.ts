// The portrait drawn: each layer of the rig (rig.ts) as a shape (raster.ts) through its anchor's transform, back to front.
// Parts are small functions of their own coordinates; the hats, hair styles, tops and hands are tables keyed by the creator's
// names (HATS, HAIRS, TOPS, HANDS), so another one is an entry, and a name the tables lack falls back to hers.

import { BASE, DEEP, INK, LIGHT, MAT, SHADE, col, type Mat } from "./palette";
import { Raster, hash, inEll, mul, move, nearSeg, tri, turn, type Box, type Xf } from "./raster";
import { HEAD, H, NECK, SHOULDER, W, type Hand, type Look, type Params } from "./rig";

const TAU = Math.PI * 2;
/** Light from the upper left: a material's tone by where (nx, ny: -1..1 across the part) a pixel is. */
const lit = (m: Mat, nx: number, ny: number, k = 0): number => { const v = nx * 0.6 + ny * 0.7 + k; return col(m, v < -0.62 ? LIGHT : v > 0.85 ? DEEP : v > 0.38 ? SHADE : BASE); };

// ---- hair ----
/** A hair style: its back (behind the head), its fringe and side locks (over the face), in head coordinates (the head's centre
 *  at 0, 0), and where its fringe ends at x (for the shadow it casts on the forehead; null: no fringe). */
interface Hair { back: (x: number, y: number, p: Params) => boolean; front: (x: number, y: number, p: Params, hat: boolean) => boolean; fringe: ((x: number) => number) | null; length: number }
/** The fringe's spiky lower edge: tips every 5 px, a parting in the middle. */
const bangs = (top: number, depth: number) => (x: number) => (Math.abs(x) < 1.3 ? top - 2 : top + depth * tri((Math.abs(x) + 1.2) / 5));
/** The hair's top dome (a little over the head), with a ragged edge when messy, puffed up when it's falling. */
const dome = (x: number, y: number, p: Params, rx = 18.5, ry = 17.5) => {
  const a = Math.atan2(y + 1, x), bump = p.messy * 0.22 * hash(Math.floor((a + 4) * 5), 7) + (y < 0 ? -p.hairY * 0.12 : 0);
  return ((x / rx) ** 2 + ((y + 1) / ry) ** 2) <= (1 + bump) ** 2;
};
/** Hair hanging down to `len` below the head's centre, streaming with the wind (hairX, hairY), ragged at its ends. */
const hang = (x: number, y: number, p: Params, len: number, half: number) => {
  if (y < -2 || (Math.abs(x) < 10.5 && y > 8)) return false; // (not under her chin: the neck and collar are there)
  const k = Math.max(0, y + 2), sx = x - p.hairX * k * 0.45, end = len + p.hairY * 5 - Math.abs(p.hairX) * 4 + 2.5 * tri(sx / 4) + p.messy * 3 * hash(Math.floor(sx / 2), 3);
  return y <= end && Math.abs(sx) <= half + k * 0.06 + Math.abs(p.hairX) * 2;
};
/** Side locks framing the face, from the fringe down to `len`. */
const locks = (x: number, y: number, p: Params, len: number) => {
  if (y < -9 || y > len + p.hairY * 3) return false;
  const sx = Math.abs(x - p.hairX * Math.max(0, y + 6) * 0.35), taper = (y + 9) / (len + 9);
  return sx >= 12 - taper * 0.8 && sx <= 16.8 - taper * 2.4;
};
/** A cowlick, up out of the top of her head when the hat's gone. */
const ahoge = (x: number, y: number) => nearSeg(x, y, 0, -16, 1.5, -21, 0.75) || nearSeg(x, y, 1.5, -21, 4.5, -20.5, 0.75);
export const HAIRS: Record<string, Hair> = {
  long: { length: 26, fringe: bangs(-10.5, 4.6), back: (x, y, p) => dome(x, y, p) || hang(x, y, p, 26, 17.8), front: (x, y, p, hat) => locks(x, y, p, 18) || (!hat && ahoge(x, y)) },
  bob: { length: 9, fringe: bangs(-10.5, 4.2), back: (x, y, p) => dome(x, y, p, 18.5, 17) || hang(x, y, p, 9, 18), front: (x, y, p, hat) => locks(x, y, p, 9) || (!hat && ahoge(x, y)) },
  buns: { length: 0, fringe: bangs(-10, 3.2), back: (x, y, p) => dome(x, y, p, 17.5, 16.5) || inEll(x, y, -13, -14, 6, 6) || inEll(x, y, 13, -14, 6, 6), front: (x, y) => locks(x, y, NO_WIND, 2) },
  mohawk: {
    length: 0, fringe: null, back: () => false,
    front: (x, y, _p, hat) => !hat && y < -12 && y > -30 + 3 * tri((x + 9) / 3) && Math.abs(x) <= 3.8 + (y + 30) * 0.02,
  },
};
const NO_WIND = { hairX: 0, hairY: 0, messy: 0 } as Params;

// ---- the head ----
/** Her face's outline (the chin narrowing) and her ears, in head coordinates. */
const face = (x: number, y: number) => ((x / (HEAD.rx * (y > 0 ? 1 - 0.36 * (y / HEAD.ry) : 1))) ** 2 + (y / HEAD.ry) ** 2 <= 1);
const ear = (x: number, y: number) => inEll(Math.abs(x), y, 15, 2.5, 2.4, 3.4);

/** An eye, at its centre, s the side (-1 our left, 1 our right). */
function eye(x: number, y: number, p: Params, s: number): number {
  const sh = p.eyeShape, ax = x * s; // (ax: towards her outer corner)
  if (sh === "happy") return Math.abs(x) <= 4.8 && Math.abs(y - (1.4 - 3.8 * (1 - (x / 4.8) ** 2))) < 0.8 ? INK : 0;
  if (sh === "closed") return (Math.abs(x) <= 4.8 && Math.abs(y - (0.2 + 1.8 * (1 - (x / 4.8) ** 2))) < 0.75) || (ax > 4 && ax < 5.7 && Math.abs(y - 0.4) < 0.6) ? INK : 0;
  if (sh === "wince") return nearSeg(ax, y, -3.6, 0, 4, -3.4, 0.8) || nearSeg(ax, y, -3.6, 0, 4, 3.4, 0.8) ? INK : 0;
  if (sh === "dizzy") {
    const r = Math.hypot(x, y), th = (Math.atan2(y, x) + Math.PI) / TAU;
    for (let k = 0; k < 3; k++) if (Math.abs(r - (0.5 + 1.45 * (th + k))) < 0.55) return r < 5.2 ? INK : 0;
    return 0;
  }
  const wide = sh === "wide", open = Math.max(0, p.eyeOpen) * (wide ? 1.1 : 1) * (sh === "sleepy" ? 0.45 : 1), hw = wide ? 5 : 4.8, hh = 5.6 * open;
  if (hh < 0.9) return Math.abs(x) <= 4.6 && Math.abs(y - 0.5) < 0.7 ? INK : 0; // (blinking: a line)
  // the eye between an arched top (its lashes) and a rounder bottom, the outer corner a little higher
  const u = x / hw, top = -hh + 0.6 + 1.3 * u * u - ax * 0.12, bot = hh * 0.95 + 0.6 - 2.2 * u * u + ax * 0.1;
  if (Math.abs(u) > 1 || y < top - 0.2 || y > bot) return ax > hw - 1.4 && ax < hw + 1.8 && y > top - 1.4 && y < top + 1 ? INK : 0; // (the lashes' wing)
  if (y < top + 1.6) return INK; // (the upper lashes, bold)
  if (y > bot - 0.9 && ax > 0.5) return col(MAT.SKIN, DEEP); // (the lower lashes, faint)
  const ix = p.lookX * 1.4, iy = p.lookY * 1.3 + 1, irx = wide ? 2.6 : 3.4, iry = wide ? 2.6 : 4.4, dx = x - ix, dy = y - iy;
  if ((dx / irx) ** 2 + (dy / iry) ** 2 <= 1) {
    if ((dx + 1.5) ** 2 + (dy + 1.6) ** 2 < 1.5) return col(MAT.WHITE, BASE); // glints
    if ((dx - 1.5) ** 2 + (dy - 1.5) ** 2 < 0.5 && !wide) return col(MAT.WHITE, BASE);
    if (p.sparkle > 0.3 && ((Math.abs(dx - 1.3) < 0.5 && Math.abs(dy + 1.6) < 1.4) || (Math.abs(dy + 1.6) < 0.5 && Math.abs(dx - 1.3) < 1.4))) return col(MAT.WHITE, BASE);
    if ((dx / (wide ? 0.9 : 1.5)) ** 2 + (dy / (wide ? 0.9 : 2.1)) ** 2 < 1) return INK;
    return col(MAT.IRIS, dy < -1.6 ? DEEP : dy > 1.8 ? LIGHT : BASE);
  }
  return col(MAT.WHITE, y < top + 2.6 ? SHADE : BASE);
}
/** A brow, at the brow's centre, s the side. */
const brow = (x: number, y: number, p: Params, s: number): number => {
  const ax = x * s, yi = p.browAng * 2.6, yo = -p.browAng * 1.3; // (inner end at ax = -3.5, outer at 3.5)
  return ax >= -3.9 && ax <= 3.9 && Math.abs(y - (yi + (yo - yi) * (ax + 3.5) / 7 - 0.8 * (1 - (ax / 3.9) ** 2))) < 0.85 ? col(MAT.HAIR, DEEP) : 0;
};

// ---- the mouth ----
/** A mouth shape: its pixels about the mouth's centre, and whether it's an open one (outlined in ink). */
interface Mouth { box: Box; open: boolean; px: (x: number, y: number) => number }
const line = (f: (x: number) => number, half: number, w = 0.62): Mouth => ({ box: [-half - 1, -4, half + 1, 4], open: false, px: (x, y) => (Math.abs(x) <= half && Math.abs(y - f(x)) < w ? INK : 0) });
/** An open mouth between a top edge and a bottom one: teeth along the top, the tongue at the bottom. */
const open = (half: number, top: (x: number) => number, bot: (x: number) => number, teeth = 1.4, tongue = 1.8): Mouth => ({
  box: [-half - 1, -6, half + 1, 7], open: true,
  px: (x, y) => { if (Math.abs(x) > half || y < top(x) || y > bot(x)) return 0; if (y < top(x) + teeth) return col(MAT.WHITE, BASE); if (y > bot(x) - tongue && Math.abs(x) < half * 0.55) return col(MAT.TONGUE, BASE); return col(MAT.MOUTH, BASE); },
});
const oval = (rx: number, ry: number, teeth = 0, tongue = 1.2): Mouth => open(rx, x => 0.5 - ry * Math.sqrt(Math.max(0, 1 - (x / rx) ** 2)), x => 0.5 + ry * Math.sqrt(Math.max(0, 1 - (x / rx) ** 2)), teeth, tongue);
export const MOUTHS: Record<string, Mouth> = {
  rest: line(x => 0.4 - 0.9 * (x / 2.5) ** 2, 2.5),
  smile: line(x => 0.9 - 2 * (x / 4) ** 2, 4),
  frown: line(x => -0.8 + 2 * (x / 4) ** 2, 4),
  wavy: line(x => 0.9 * Math.sin(x * 1.5), 4.5),
  smirk: line(x => 0.2 - 0.32 * x - 0.5 * Math.max(0, x - 1.5) ** 2 * 0.4, 3.6),
  cat: line(x => Math.sqrt(Math.max(0, 1 - ((Math.abs(x) - 1.5) / 1.5) ** 2)) - 0.2, 3),
  M: line(() => 0, 2.6, 0.55),
  grin: open(5, () => -1.2, x => -1.2 + 3.8 * (1 - (x / 5) ** 2), 1.4, 1.4),
  laugh: open(5, () => -2, x => -2 + 6.2 * Math.max(0, 1 - (x / 5) ** 2) ** 0.75, 1.4, 2.4),
  O: oval(2.1, 2.6, 0, 1.1),
  gasp: oval(2.8, 3.6, 0, 1.6),
  A: open(3.4, x => -1.4 + 0.4 * (x / 3.4) ** 2, x => -1.4 + 4.6 * Math.sqrt(Math.max(0, 1 - (x / 3.4) ** 2)), 1.2, 1.6),
  E: oval(4, 1.6, 1.4, 0),
  U: oval(1.6, 1.8, 0, 0.8),
  F: open(3, () => -1, () => 1.2, 1.4, 0),
  eww: {
    box: [-6, -4, 6, 5], open: true,
    px: (x, y) => { const t = -1.4 + 0.06 * x * x, b = 1.4 + 0.08 * x * x; if (Math.abs(x) > 4.6 || y < t || y > b) return 0; return Math.abs(y - 0.07 * x * x) < 0.45 || (Math.abs(x) % 2 < 0.5 && Math.abs(x) > 1) ? col(MAT.MOUTH, BASE) : col(MAT.WHITE, BASE); },
  },
};

// ---- hats ----
/** A hat, in its own coordinates (the brim's centre at 0, 0; y up negative): its pixels, and its box. */
interface HatDraw { box: (l: Look) => Box; px: (x: number, y: number, l: Look, p: Params) => number }
/** A pointed witch's hat: the crown's height, its crook (how far its tip bends over), its brim's width, a band with a buckle. */
function pointed(o: { h?: number; bend?: number; brim?: number; stars?: boolean; flowers?: boolean; droop?: number } = {}): HatDraw {
  const geo = (l: Look) => ({ ht: 28 * (o.h ?? 1) * Math.min(2, l.hatHeight), B: (17 + 6.5 * Math.min(2.2, l.hatBrim)) * (o.brim ?? 1), bend: (o.bend ?? 0.25) + l.hatTilt * 0.5 });
  return {
    box: l => { const g = geo(l); return [-g.B - 2, -g.ht - 4, g.B + 2 + Math.abs(g.bend) * g.ht * 0.5, 5]; },
    px: (x, y, l) => {
      const { ht, B, bend } = geo(l), inBrim = inEll(x, y, 0, 0.5, B, 3.4 + B * 0.04);
      if (inBrim && y >= 0.5) return col(MAT.HAT, y > 2.4 ? DEEP : SHADE);
      const t = Math.max(0, -y / ht), cx = bend * ht * 0.4 * t * t, w = 12 * Math.pow(Math.max(0, 1 - t), 0.95) + 0.7;
      if (y <= 0.6 && t <= 1 && Math.abs(x - cx) <= w) {
        const rel = (x - cx) / w, bh = 2.6 * l.hatBand;
        if (bh > 0.2 && y > -bh - 0.6 && y <= 0.6) {
          if (Math.abs(x - cx) <= 2.4) return Math.abs(x - cx) <= 0.9 && y > -bh + 0.6 && y < -0.2 ? col(MAT.HAT, DEEP) : col(MAT.GOLD, rel > 0.1 ? SHADE : BASE);
          if (o.flowers && hash(Math.floor((x + 40) / 4), 2) > 0.35 && Math.abs(((x + 40) % 4) - 2) < 1.3) return col(Math.floor((x + 40) / 4) % 2 ? MAT.FLOWER : MAT.FLOWER2, BASE);
          return col(MAT.BAND, y < -bh + 0.6 ? LIGHT : BASE);
        }
        if (o.stars && hash(Math.round(x), Math.round(y), 9) > 0.93) return col(MAT.STAR, BASE);
        return col(MAT.HAT, rel > 0.78 ? DEEP : rel > 0.3 ? SHADE : rel < -0.62 ? LIGHT : BASE);
      }
      if (inBrim) return col(MAT.HAT, y < -1.6 ? LIGHT : BASE);
      return 0;
    },
  };
}
/** The other hats, plain stand-ins for now (round 1 of the portrait; the art builders can redraw any of them as an entry here). */
const brimOnly = (B: number, ry = 2.6) => (x: number, y: number) => inEll(x, y, 0, 0.5, B, ry);
export const HATS: Record<string, HatDraw | null> = {
  none: null,
  classic: pointed(), crooked: pointed({ bend: 1.1 }), floppy: pointed({ h: 0.8, bend: 1.6, brim: 1.15 }), small: pointed({ h: 0.62, brim: 0.72 }),
  flowers: pointed({ flowers: true }), wizard: pointed({ h: 1.25, bend: 0.15, stars: true }),
  top: { box: () => [-18, -22, 18, 4], px: (x, y, l) => { const h = 15 * Math.min(1.8, l.hatHeight); if (Math.abs(x) <= 9 && y <= 0.5 && y >= -h) return y > -2.6 * l.hatBand - 0.5 && y < 0 && l.hatBand > 0 ? col(MAT.BAND, BASE) : col(MAT.HAT, x > 4 ? SHADE : x < -6 ? LIGHT : BASE); return brimOnly(13 + 2 * l.hatBrim)(x, y) ? col(MAT.HAT, y > 1.5 ? DEEP : SHADE) : 0; } },
  cowboy: { box: () => [-28, -18, 28, 6], px: (x, y, l) => { const B = 16 + 6 * Math.min(2, l.hatBrim), yb = y + 0.05 * x * x * (20 / B); if (Math.abs(x) <= 9 - Math.max(0, -y - 8) * 0.25 && y <= 0 && y >= -13 * Math.min(1.8, l.hatHeight) + (Math.abs(x) < 3 ? 1.5 : 0)) return col(MAT.HAT, x > 4 ? SHADE : BASE); return Math.abs(x) <= B && Math.abs(yb - 0.5) < 2.2 ? col(MAT.HAT, yb > 1.5 ? DEEP : LIGHT) : 0; } },
  conical: { box: () => [-32, -14, 32, 3], px: (x, y, l) => { const ht = 9 * Math.min(1.6, l.hatHeight), B = 18 + 6 * Math.min(2, l.hatBrim); return y <= 1.5 && y >= -ht && Math.abs(x) <= B * (1 - Math.max(0, -y) / ht) ? col(MAT.HAT, x > 0 ? SHADE : LIGHT) : 0; } },
  boppers: { box: () => [-14, -22, 14, 3], px: (x, y) => { for (const s of [-1, 1]) { if (inEll(x, y, s * 9.5, -18, 2.8, 2.8)) return col(MAT.FLOWER, BASE); if (nearSeg(x, y, s * 5, 0, s * 9, -16, 0.6)) return INK; } return Math.abs(y) < 1 && Math.abs(x) < 11 ? col(MAT.HAT, BASE) : 0; } },
  party: { box: () => [-10, -28, 10, 3], px: (x, y, l) => { const ht = 22 * Math.min(1.8, l.hatHeight), t = -y / ht; if (inEll(x, y, 0, -ht, 2.6, 2.6)) return col(MAT.FLOWER2, BASE); if (y > 0.5 || t > 1 || Math.abs(x) > 7.5 * (1 - t) + 0.6) return 0; return col(Math.floor((x - y * 0.8 + 40) / 3) % 2 ? MAT.HAT : MAT.FLOWER, x > 2 ? SHADE : BASE); } },
  musketeer: { box: () => [-30, -26, 30, 5], px: (x, y, l) => { if (nearSeg(x, y, 6, -7, -6, -17, 2.2) || nearSeg(x, y, -6, -17, -15, -15, 1.6)) return col(MAT.PLUME, y < -14 ? LIGHT : BASE); if (inEll(x, y, 0, 0, 10, 10) && y <= 0.5) return col(MAT.HAT, x > 4 ? SHADE : BASE); return brimOnly(18 + 6 * Math.min(2, l.hatBrim), 3)(x, y) ? col(MAT.HAT, y > 1.5 ? DEEP : LIGHT) : 0; } },
  beanie: { box: () => [-16, -14, 16, 3], px: (x, y) => { if (inEll(x, y, 0, -11.5, 3.4, 3.4)) return col(MAT.FLOWER, BASE); if (!inEll(x, y, 0, 0, 14.5, 11) || y > 1.5) return 0; return y > -2.5 ? col(MAT.HAT, Math.round(x) % 2 ? SHADE : LIGHT) : col(MAT.HAT, x > 6 ? SHADE : BASE); } },
  crown: { box: () => [-13, -14, 13, 3], px: (x, y) => { if (Math.abs(x) > 11 || y > 1 || y < -7 - 5 * (1 - tri((x + 11) / 5.5))) return 0; if (Math.abs(y + 3) < 1.2 && Math.abs(((x + 44) % 5.5) - 2.75) < 1) return col(MAT.FLOWER, BASE); return col(MAT.GOLD, x > 5 ? SHADE : BASE); } },
  mushroom: { box: () => [-26, -20, 26, 3], px: (x, y, l) => { const B = 18 + 3 * Math.min(2, l.hatBrim); if (!inEll(x, y, 0, 1, B, 13 * Math.min(1.6, l.hatHeight)) || y > 1.5) return 0; if (hash(Math.floor((x + 40) / 5), Math.floor((y + 40) / 4), 5) > 0.7 && Math.abs(((x + 40) % 5) - 2.5) < 1.6 && Math.abs(((y + 40) % 4) - 2) < 1.2) return col(MAT.WHITE, BASE); return col(MAT.HAT, x > B * 0.4 ? SHADE : y < -8 ? LIGHT : BASE); } },
  traffic: { box: () => [-16, -30, 16, 3], px: (x, y, l) => { const ht = 24 * Math.min(1.8, l.hatHeight), t = -y / ht; if (Math.abs(x) <= 13 && y >= -1 && y <= 1.5) return col(MAT.HAT, SHADE); if (y > 0 || t > 1 || Math.abs(x) > 9.5 * (1 - t) + 1.2) return 0; return (t > 0.3 && t < 0.42) || (t > 0.6 && t < 0.7) ? col(MAT.WHITE, BASE) : col(MAT.HAT, x > 2 ? SHADE : BASE); } },
};

// ---- tops, the cloak ----
/** The shoulders' half-width at y below the neck pivot. */
const shoulders = (y: number) => 27 - 18 * Math.exp(-(y - 3) / 5);
/** A top: its pixels in body coordinates (the neck pivot at 0, 0), inside the shoulders. */
export const TOPS: Record<string, (x: number, y: number, p: Params) => number> = {
  jacket: (x, y) => (Math.abs(x) < 7 - (y - 3) * 0.42 ? col(MAT.TOP, y < 6 ? SHADE : BASE) : lit(MAT.JACKET, x / 27, (y - 12) / 14)),
  sequins: (x, y) => (Math.abs(x) < 7 - (y - 3) * 0.42 ? (hash(Math.round(x), Math.round(y), 4) > 0.7 ? col(MAT.STAR, BASE) : col(MAT.TOP, (Math.round(x) + Math.round(y)) % 2 ? LIGHT : SHADE)) : lit(MAT.JACKET, x / 27, (y - 12) / 14)),
  mesh: (x, y) => (Math.abs(x) < 7 - (y - 3) * 0.42 ? ((Math.round(x) + Math.round(y)) % 3 === 0 ? col(MAT.TOP, DEEP) : col(MAT.SKIN, SHADE)) : lit(MAT.JACKET, x / 27, (y - 12) / 14)),
  poncho: (x, y) => { const band = Math.floor((y + 2) / 4) % 3; return col(band === 0 ? MAT.TOP : band === 1 ? MAT.JACKET : MAT.FLOWER, x > 14 ? SHADE : BASE); },
  cape: (x, y) => (Math.abs(x) < 7 - (y - 3) * 0.42 ? col(MAT.TOP, BASE) : lit(MAT.CLOAK, x / 27, (y - 12) / 14)),
};

// ---- hands ----
/** A hand's pixels in its own coordinates (its fingers up, the thumb on the side away from her middle, s). */
export const HANDS: Record<string, (x: number, y: number, s: number) => number> = {
  fist: (x, y) => (inEll(x, y, 0, 0, 3.1, 2.9) ? col(MAT.SKIN, y < -1.4 ? LIGHT : x > 1.6 ? SHADE : BASE) : 0),
  open: (x, y, s) => {
    if (inEll(x, y, 0, 1.2, 2.9, 2.6)) return col(MAT.SKIN, x > 1.5 ? SHADE : BASE);
    for (const fx of [-2.2, -0.75, 0.75, 2.2]) if (nearSeg(x, y, fx, 0, fx * 1.15, -4.2 + Math.abs(fx) * 0.35, 0.68)) return col(MAT.SKIN, LIGHT);
    return nearSeg(x, y, -s * 2.4, 2, -s * 4.6, -0.6, 0.75) ? col(MAT.SKIN, BASE) : 0;
  },
  thumb: (x, y, s) => (nearSeg(x, y, -s * 1.2, -1.6, -s * 1.2, -6, 0.9) ? col(MAT.SKIN, LIGHT) : HANDS.fist(x, y, s)),
  point: (x, y, s) => (nearSeg(x, y, 0, -2, 0, -7, 0.75) ? col(MAT.SKIN, LIGHT) : HANDS.fist(x, y, s)),
  pinch: (x, y, s) => (nearSeg(x, y, -1, -2, -1.3, -5.2, 0.7) || nearSeg(x, y, -s * 2.6, -0.5, -s * 3.4, -3.8, 0.7) ? col(MAT.SKIN, LIGHT) : HANDS.fist(x, y, s)),
  peace: (x, y, s) => (nearSeg(x, y, -0.8, -2, -2.2, -7, 0.7) || nearSeg(x, y, 0.8, -2, 2.2, -7, 0.7) ? col(MAT.SKIN, LIGHT) : HANDS.fist(x, y, s)),
};

/** Where the bust and the head are this frame (rhythm, shake, tilt), as transforms to the canvas. */
export function frame(p: Params, t: number): { body: Xf; head: Xf } {
  const bob = p.bobAmp * Math.sin(TAU * p.bobHz * t), sway = p.swayAmp * Math.sin(TAU * p.swayHz * t), nod = p.nodAmp * Math.abs(Math.sin(Math.PI * p.nodHz * t));
  const shake = p.shake * Math.sin(t * 57) * (0.6 + 0.4 * Math.sin(t * 23));
  const body = mul(move(Math.round(NECK.x + p.dx + sway + shake), Math.round(NECK.y + p.dy + bob)), turn(p.lean + sway * 0.012));
  return { body, head: mul(body, mul(turn(p.tilt + sway * 0.02), move(HEAD.x, HEAD.y + Math.round(nod)))) };
}

/** Draws her (look, params, time in seconds) into r. */
export function drawPortrait(r: Raster, look: Look, p: Params, t: number): void {
  r.clear();
  const { body, head } = frame(p, t), hair = HAIRS[look.hair] ?? HAIRS.long, hatOn = p.hatOn > 0.5 && look.hat !== "none" && !!(HATS[look.hat] ?? HATS.classic);
  const hand = (hd: Hand | null, s: number) => {
    if (!hd) return;
    const sx = s * SHOULDER.x, sy = SHOULDER.y, draw = HANDS[hd.shape] ?? HANDS.open;
    // the arm in two, bending at an elbow out to her side (further out the higher the hand is)
    const up = Math.max(0, sy - hd.y), ex = sx + (hd.x - sx) * 0.4 + s * (3 + up * 0.18), ey = sy + (hd.y - sy) * 0.55 + 3;
    r.draw((x, y) => (nearSeg(x, y, sx, sy, ex, ey, 3.4) || nearSeg(x, y, ex, ey, hd.x, hd.y + 2, 2.8) ? lit(MAT.JACKET, ((x - ex) * s) / 8, (y - ey) / 12) : 0), [Math.min(sx, hd.x, ex) - 5, Math.min(sy, hd.y, ey) - 5, Math.max(sx, hd.x, ex) + 5, Math.max(sy, hd.y, ey) + 6], body, INK);
    r.draw((x, y) => draw(x * s, y, 1), [-6, -9, 6, 5], mul(body, mul(move(hd.x, hd.y), turn(hd.rot * s))), INK);
  };
  // hands behind her head (on the beach)
  for (const [hd, s] of [[p.handL, -1], [p.handR, 1]] as const) if (hd?.behind) hand(hd, s);
  // the cloak's hood and the cloak (behind her)
  if (look.cloak === "hooded") r.draw((x, y) => (inEll(x, y, 0, -1, 18.5, 17.5) && y < 9 ? col(MAT.CLOAK, x > 6 ? DEEP : SHADE) : 0), [-20, -20, 20, 10], head, INK);
  if (look.cloak !== "none") r.draw((x, y) => { const bx = x - p.robeBlow * Math.max(0, y) * 0.3; return y >= 0 && Math.abs(bx) <= shoulders(y + 1) + 3 + p.robeBlow * 2 * tri(y / 5) ? lit(MAT.CLOAK, bx / 30, y / 20, 0.2) : (y > -7 && y < 4 && Math.abs(x) > 5.5 && Math.abs(x) < 12 - y * 0.3) ? col(MAT.CLOAK, SHADE) : 0; }, [-36, -8, 36, 30], body, INK);
  // back hair
  r.draw((x, y) => {
    if (!hair.back(x, y, p)) return 0;
    const n = Math.hypot(x / 18.5, (y + 1) / 17.5);
    if (y < -5 && Math.abs(n - 0.78) < 0.07 && x < 7) return col(MAT.HAIR, LIGHT);
    return col(MAT.HAIR, Math.abs(x) < 10 && y > 3 ? DEEP : x > 8 || y > 10 ? SHADE : BASE);
  }, [-30, -30, 30, 40], head, INK);
  // the neck, the top, its collar, the scarf, headphones round her neck, the pendant
  r.draw((x, y) => (Math.abs(x) <= 4.5 && y >= -9 && y <= 4 ? col(MAT.SKIN, y < -3 ? DEEP : SHADE) : 0), [-6, -10, 6, 5], body, INK);
  const top = TOPS[look.top] ?? TOPS.jacket;
  r.draw((x, y) => (y >= 3 && Math.abs(x) <= shoulders(y) ? top(x, y, p) : 0), [-30, 2, 30, 30], body, INK);
  if (look.top !== "poncho") r.draw((x, y) => { const a = Math.abs(x), v = 7 - (y - 3) * 0.42; return y >= 2 && y < 19 && a >= v && a < v + 3.6 - (y - 2) * 0.05 ? col(look.top === "cape" ? MAT.CLOAK : MAT.JACKET, a > v + 2.2 ? BASE : LIGHT) : 0; }, [-14, 1, 14, 20], body, INK);
  if (look.scarf) r.draw((x, y) => { if (y >= 0 && y <= 5 && Math.abs(x) <= 10 - y * 0.2) return col(MAT.SCARF, Math.floor(x + 20) % 4 < 2 ? BASE : LIGHT); const tx = x - p.robeBlow * Math.max(0, y - 5) * 0.8; return y > 5 && y < 24 && tx > 3.5 && tx < 8 ? col(MAT.SCARF, y % 4 < 2 ? BASE : SHADE) : 0; }, [-12, -1, 30, 25], body, INK);
  if (look.phones && p.phonesOn < 0.5) r.draw((x, y) => { const a = Math.abs(x); if (inEll(a, y, 9, 4.5, 4.2, 3)) return y > 5.6 ? col(MAT.PHONES, DEEP) : col(MAT.PHONES, x > 0 ? SHADE : LIGHT); return a > 4.2 && a < 6.4 && y > -4 && y < 3 ? col(MAT.PHONES, DEEP) : 0; }, [-15, -5, 15, 9], body, INK);
  if (look.pendant) r.draw((x, y) => (inEll(x, y, 0, 15, 2.2, 2.2) ? (inEll(x, y, -0.4, 14.6, 0.9, 0.9) ? col(MAT.BAND, LIGHT) : col(MAT.GOLD, BASE)) : 0), [-3, 12, 3, 18], body, INK);
  // the head: face and ears, the skin's shadow under the fringe and on its right
  const fb = hair.fringe;
  r.draw((x, y) => {
    if (ear(x, y)) return col(MAT.SKIN, x > 0 ? SHADE : BASE);
    if (!face(x, y)) return 0;
    if (fb && y > fb(x) - 0.5 && y < fb(x) + 1.3) return col(MAT.SKIN, SHADE);
    return col(MAT.SKIN, x > 10.5 || (y > 11 && x > 4) ? SHADE : x < -9 && y < 3 ? LIGHT : BASE);
  }, [-19, -18, 19, 18], head, INK);
  if (look.earrings) r.draw((x, y) => (inEll(Math.abs(x), y, 15.5, 7.5, 1.1, 1.4) ? col(MAT.GOLD, BASE) : 0), [-18, 4, 18, 11], head, INK);
  // the face: eyes, brows (after the fringe), nose, mouth, blush, tears
  for (const s of [-1, 1]) r.draw((x, y) => eye(x - s * 7.3, y - 3.5, p, s), [s * 7.3 - 8, -4, s * 7.3 + 8, 11], head);
  r.draw((x, y) => (x >= -0.5 && x < 1.2 && y >= 8 && y < 9 ? col(MAT.SKIN, DEEP) : 0), [-2, 7, 3, 10], head);
  const m = MOUTHS[p.mouth] ?? MOUTHS.smile;
  r.draw((x, y) => m.px(x, y - 11.5), [m.box[0], m.box[1] + 11.5, m.box[2], m.box[3] + 11.5], head, m.open ? INK : 0);
  if (p.blush > 0.3) for (const s of [-1, 1]) r.draw((x, y) => (inEll(x, y, s * 10, 8.6, 3, 1.4) ? ((Math.round(x) + Math.round(y)) % 3 === 0 ? col(MAT.BLUSH, SHADE) : col(MAT.BLUSH, BASE)) : 0), [s * 10 - 4, 6, s * 10 + 4, 11], head);
  if (p.tears > 0.3) for (const s of [-1, 1]) r.draw((x, y) => (inEll(x, y, s * 12, 9.5, 1.2, 1.7) ? col(MAT.SWEAT, y < 9 ? LIGHT : BASE) : 0), [s * 12 - 2, 7, s * 12 + 2, 12], head, INK);
  // the fringe and side locks, then the brows over them
  r.draw((x, y) => {
    const inFringe = fb && face(x, y + 0.5) && y < fb(x), inFront = hair.front(x, y, p, hatOn);
    if (!inFringe && !inFront) return 0;
    if (y > -13 && y < -11.5 && x < 7 && x > -12) return col(MAT.HAIR, LIGHT);
    return col(MAT.HAIR, x > 8 ? SHADE : fb && y > fb(x) - 1.2 && inFringe ? SHADE : BASE);
  }, [-20, -32, 20, 28], head, INK);
  for (const s of [-1, 1]) r.draw((x, y) => brow(x - s * 7.3, y + 3.6 + p.browY, p, s), [s * 7.3 - 5, -8.5 - p.browY, s * 7.3 + 5, 0 - p.browY], head);
  if (p.shades > 0.5 || (look.shades && p.shades >= 0)) r.draw((x, y) => { for (const s of [-1, 1]) if (Math.abs(x - s * 7.3) <= 5.4 && y >= 0 && y <= 6) return col(MAT.SHADES, y < 1 ? LIGHT : (Math.round(x - y) % 5 === 0 ? LIGHT : BASE)); return Math.abs(x) < 2 && y >= 0.5 && y <= 1.5 ? INK : 0; }, [-14, -2, 14, 8], head, INK);
  // headphones on her ears
  if (p.phonesOn > 0.5) r.draw((x, y) => (inEll(Math.abs(x), y, 16.6, 2.5, 3.4, 4.8) ? col(MAT.PHONES, x > 0 ? SHADE : LIGHT) : Math.abs(Math.hypot(x, y + 1) - 18.6) < 1.1 && y < -3 ? col(MAT.PHONES, DEEP) : 0), [-21, -21, 21, 8], head, INK);
  // sweat
  if (p.sweat > 0.3) r.draw((x, y) => (inEll(x, y, 16.5, -8, 2, 2.2) || (y < -8 && y > -12.5 && Math.abs(x - 16.5) < (y + 12.5) * 0.45) ? col(MAT.SWEAT, x < 16 && y < -8 ? LIGHT : BASE) : 0), [13, -14, 20, -5], head, INK);
  // the hat
  if (hatOn) {
    const hd = (HATS[look.hat] ?? HATS.classic)!;
    r.draw((x, y) => hd.px(x, y, look, p), hd.box(look), mul(head, mul(move(p.hatX, -15.5 + p.hatY), turn(p.hatRot + look.hatTilt * 0.05))), INK);
  }
  // hands in front
  for (const [hd, s] of [[p.handL, -1], [p.handR, 1]] as const) if (hd && !hd.behind) hand(hd, s);
}

export { W, H };
