// The portrait drawn: each layer of the rig (rig.ts) as a shape (raster.ts) through its anchor's transform, back to front.
// Parts are small functions of their own coordinates; the hats, hair styles, tops and hands are tables keyed by the creator's
// names (HATS, HAIRS, TOPS, HANDS), so another one is an entry, and a name the tables lack falls back to hers.

import { BASE, DEEP, INK, LIGHT, MAT, SHADE, col, type Mat } from "./palette";
import { Raster, hash, inEll, mul, move, nearSeg, scale, tri, turn, type Box, type Xf } from "./raster";
import { BLUSH, BROWS, EYES, FACE, IRISES, MOUTHS as MOUTH_ART, SWEAT, TEAR } from "./art/face";
import { HEAD_SKIN, NECK as NECK_ART } from "./art/target";
import { BRIM_AT, FALLBACK, HAIR_ART, HAT_ART, NEAREST, NECKWEAR, TOP_ART, atAnchor } from "./parts";
import { handHatTip } from "./maps/body";
import { LEGEND, blit, blitXf, type Placed } from "./sprite";
import { OTHER_HATS } from "./hats";
import { OTHER_TOPS } from "./tops";
import { HEAD_BOX, H, NECK, SHAPE_K, SHOULDER, W, type Hand, type Look, type Params } from "./rig";

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

// ---- the face: hand-placed (art/face.ts) ----
export { MOUTH_ART as MOUTHS };

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
export const HATS: Record<string, HatDraw | null> = {
  none: null,
  classic: pointed(), crooked: pointed({ bend: 1.1 }), floppy: pointed({ h: 0.8, bend: 1.6, brim: 1.15 }), small: pointed({ h: 0.62, brim: 0.72 }),
  flowers: pointed({ flowers: true }), wizard: pointed({ h: 1.25, bend: 0.15, stars: true }),
  ...OTHER_HATS, // (the rest: hats.ts)
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
  ...OTHER_TOPS, // (patterned: tops.ts)
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

/** Where the bust and the head are this frame (rhythm, shake, tilt), in whole pixels: the neck pivot (bx, by), the head box's
 *  top-left (hx, hy), and the shape parts' transforms (their units scaled by SHAPE_K). Tilt is whole-pixel parallax: the head
 *  moves sideways over the body, the hat a pixel further (docs/PORTRAIT-STYLE.md: drawn art never turns). */
export function frame(p: Params, t: number): { bx: number; by: number; hx: number; hy: number; tiltPx: number; body: Xf; head: Xf } {
  const bob = p.bobAmp * Math.sin(TAU * p.bobHz * t), sway = p.swayAmp * Math.sin(TAU * p.swayHz * t), nod = p.nodAmp * Math.abs(Math.sin(Math.PI * p.nodHz * t));
  const shake = p.shake * Math.sin(t * 57) * (0.6 + 0.4 * Math.sin(t * 23));
  const bx = Math.round(NECK.x + p.dx * SHAPE_K + sway + shake), by = Math.round(NECK.y + p.dy * SHAPE_K + bob);
  const tiltPx = Math.round((p.tilt + p.lean) * 16 + sway * 0.4), hx = bx + HEAD_BOX.x + tiltPx, hy = by + HEAD_BOX.y + Math.round(nod);
  return { bx, by, hx, hy, tiltPx, body: mul(move(bx, by), scale(SHAPE_K)), head: mul(move(hx + 32, hy + 32), scale(SHAPE_K)) };
}

/** Which drawn eye her parameters pick, and which iris. */
function eyeArt(p: Params): { eye: keyof typeof EYES; iris: keyof typeof IRISES | null } {
  const o = p.eyeOpen, iris = p.sparkle > 0.3 ? "sparkle" : "plain";
  switch (p.eyeShape) {
    case "happy": case "closed": case "wince": case "dizzy": return { eye: p.eyeShape, iris: null };
    case "sleepy": return o < 0.3 ? { eye: "shut", iris: null } : { eye: "sleepy", iris };
    case "wide": return o < 0.3 ? { eye: "shut", iris: null } : { eye: "wide", iris: "small" };
    default: return o < 0.3 ? { eye: "shut", iris: null } : o < 0.72 ? { eye: "half", iris } : { eye: "open", iris };
  }
}
/** Which drawn brows. */
const browArt = (p: Params): keyof typeof BROWS => (p.browAng > 0.25 ? "cross" : p.browAng < -0.25 ? "worried" : p.browY >= 1.4 ? "arched" : p.browY <= -0.4 ? "low" : "flat");
const WHITES = new Set([LEGEND.W, LEGEND.w]);

/** Draws her (look, params, time in seconds) into r: the hand-placed parts (art/, parts.ts) in whole pixels, and the parts not
 *  yet hand-placed as their shapes (FALLBACK). */
export function drawPortrait(r: Raster, look: Look, p: Params, t: number): void {
  r.clear();
  const { bx, by, hx, hy, tiltPx, body, head } = frame(p, t), hatOn = p.hatOn > 0.5 && look.hat !== "none" && !!(HATS[look.hat] ?? HATS.classic);
  const near = FALLBACK.mode === "nearest";
  const hairArt = HAIR_ART[look.hair] ?? HAIR_ART[near ? NEAREST[look.hair] ?? "long" : ""], hairParts = hairArt?.(look, { ...p, hatOn: hatOn ? 1 : 0 });
  const hair = HAIRS[look.hair] ?? HAIRS.long;
  const at = (pl: Placed | undefined, ox: number, oy: number) => pl && blit(r, pl.sprite, ox + pl.x, oy + pl.y);
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
  // back hair: hand-placed, or its shape
  if (hairParts) at(hairParts.back, hx, hy);
  else r.draw((x, y) => {
    if (!hair.back(x, y, p)) return 0;
    const n = Math.hypot(x / 18.5, (y + 1) / 17.5);
    if (y < -5 && Math.abs(n - 0.78) < 0.07 && x < 7) return col(MAT.HAIR, LIGHT);
    return col(MAT.HAIR, Math.abs(x) < 10 && y > 3 ? DEEP : x > 8 || y > 10 ? SHADE : BASE);
  }, [-30, -30, 30, 40], head, INK);
  // the neck (under the collar), the top and its collar, the scarf, headphones round her neck, the pendant
  blit(r, NECK_ART, hx, hy + 52);
  const topArt = TOP_ART[look.top] ?? (near ? TOP_ART.jacket : undefined), placedTop = topArt !== undefined;
  if (topArt) for (const pl of topArt(look, p)) at(pl, bx, by);
  else {
    const top = TOPS[look.top] ?? TOPS.jacket;
    r.draw((x, y) => (y >= 3 && Math.abs(x) <= shoulders(y) ? top(x, y, p) : 0), [-30, 2, 30, 30], body, INK);
    if (look.top !== "poncho") r.draw((x, y) => { const a = Math.abs(x), v = 7 - (y - 3) * 0.42; return y >= 2 && y < 19 && a >= v && a < v + 3.6 - (y - 2) * 0.05 ? col(look.top === "cape" ? MAT.CLOAK : MAT.JACKET, a > v + 2.2 ? BASE : LIGHT) : 0; }, [-14, 1, 14, 20], body, INK);
  }
  if (placedTop) for (const pl of NECKWEAR(look, p)) at(pl, bx, by); // (hand-placed neckwear over a hand-placed top)
  else if (look.scarf) r.draw((x, y) => { if (y >= 0 && y <= 5 && Math.abs(x) <= 10 - y * 0.2) return col(MAT.SCARF, Math.floor(x + 20) % 4 < 2 ? BASE : LIGHT); const tx = x - p.robeBlow * Math.max(0, y - 5) * 0.8; return y > 5 && y < 24 && tx > 3.5 && tx < 8 ? col(MAT.SCARF, y % 4 < 2 ? BASE : SHADE) : 0; }, [-12, -1, 30, 25], body, INK);
  if (look.phones && p.phonesOn < 0.5 && !topArt) r.draw( // (round 2: not over a hand-placed top until they're drawn too)
    (x, y) => { const a = Math.abs(x); if (inEll(a, y, 9, 4.5, 4.2, 3)) return y > 5.6 ? col(MAT.PHONES, DEEP) : col(MAT.PHONES, x > 0 ? SHADE : LIGHT); return a > 4.2 && a < 6.4 && y > -4 && y < 3 ? col(MAT.PHONES, DEEP) : 0; }, [-15, -5, 15, 9], body, INK);
  if (look.pendant && !placedTop) r.draw((x, y) => (inEll(x, y, 0, 15, 2.2, 2.2) ? (inEll(x, y, -0.4, 14.6, 0.9, 0.9) ? col(MAT.BAND, LIGHT) : col(MAT.GOLD, BASE)) : 0), [-3, 12, 3, 18], body, INK);
  // her face: its skin, then the drawn features on it
  blit(r, HEAD_SKIN, hx, hy);
  const { eye, iris } = eyeArt(p), e = EYES[eye], gx = Math.max(-1, Math.min(1, Math.round(p.lookX * 1.2))), gy = Math.max(-1, Math.min(1, Math.round(p.lookY * 1.2)));
  for (const [sp, [ex, ey], ix] of [[e.l, FACE.eyeL, FACE.iris[0]], [e.r, FACE.eyeR, 16 - FACE.iris[0] - 7]] as const) {
    blit(r, sp, hx + ex, hy + ey);
    if (iris) { const is = IRISES[iris]; blit(r, is, hx + ex + ix + gx, hy + ey + FACE.iris[1] + gy, (x, y) => WHITES.has(r.px[y * r.w + x])); }
  }
  blit(r, MOUTH_ART[p.mouth] ?? MOUTH_ART.smile, hx + FACE.mouth[0], hy + FACE.mouth[1]);
  if (p.blush > 0.3) { blit(r, BLUSH.l, hx + FACE.blushL[0], hy + FACE.blushL[1]); blit(r, BLUSH.r, hx + FACE.blushR[0], hy + FACE.blushR[1]); }
  if (p.tears > 0.3) { blit(r, TEAR, hx + FACE.tearL[0], hy + FACE.tearL[1]); blit(r, TEAR, hx + FACE.tearR[0], hy + FACE.tearR[1]); }
  // the brows, then the hair in front over them (the fringe clips them: art direction round 3)
  const b = BROWS[browArt(p)], dy = -Math.max(-2, Math.min(3, Math.round(p.browY * 0.8)));
  blit(r, b.l, hx + FACE.browL[0], hy + FACE.browL[1] + dy); blit(r, b.r, hx + FACE.browR[0], hy + FACE.browR[1] + dy);
  if (hairParts) at(hairParts.front, hx, hy);
  if (look.earrings) r.draw((x, y) => (inEll(Math.abs(x), y, 15.5, 7.5, 1.1, 1.4) ? col(MAT.GOLD, BASE) : 0), [-18, 4, 18, 11], head, INK);
  if (p.shades > 0.5 || (look.shades && p.shades >= 0)) r.draw((x, y) => { for (const s of [-1, 1]) if (Math.abs(x - s * 7.3) <= 5.4 && y >= -1.5 && y <= 4.5) return col(MAT.SHADES, y < -0.5 ? LIGHT : (Math.round(x - y) % 5 === 0 ? LIGHT : BASE)); return Math.abs(x) < 2 && y >= -1 && y <= 0 ? INK : 0; }, [-14, -3, 14, 6], head, INK);
  // headphones on her ears, sweat
  if (p.phonesOn > 0.5) r.draw((x, y) => (inEll(Math.abs(x), y, 17.6, 2.5, 3.4, 4.8) ? col(MAT.PHONES, x > 0 ? SHADE : LIGHT) : Math.abs(Math.hypot(x, y + 1) - 19.6) < 1.1 && y < -3 ? col(MAT.PHONES, DEEP) : 0), [-23, -23, 23, 8], head, INK);
  if (p.sweat > 0.3) blit(r, SWEAT, hx + FACE.sweat[0], hy + FACE.sweat[1]);
  // the hat: hand-placed (a pixel further than the head when she tilts; turned only while it flies), or its shape
  let brimAt: [number, number] | null = null;
  if (hatOn) {
    const hatArt = HAT_ART[look.hat] ?? (near ? HAT_ART[NEAREST[look.hat] ?? "classic"] : undefined);
    if (hatArt) {
      const pl = hatArt(look), rot = p.hatRot, flying = Math.abs(rot) > 0.5;
      const ox = hx + pl.x + Math.round(p.hatX * SHAPE_K + (flying ? 0 : rot * 6)) + Math.sign(tiltPx), oy = hy + pl.y + Math.round(p.hatY * SHAPE_K + (flying ? 0 : Math.abs(rot) * 5));
      if (flying) { const cx = pl.sprite.w / 2, cy = pl.sprite.h - 6; blitXf(r, pl.sprite, mul(move(ox + cx, oy + cy), mul(turn(rot), move(-cx, -cy)))); }
      else { blit(r, pl.sprite, ox, oy); brimAt = [ox - pl.x + BRIM_AT.x, oy - pl.y + BRIM_AT.y]; }
    } else {
      const hd = (HATS[look.hat] ?? HATS.classic)!;
      r.draw((x, y) => hd.px(x, y, look, p), hd.box(look), mul(head, mul(move(p.hatX, -15.5 + p.hatY), turn(p.hatRot + look.hatTilt * 0.05))), INK);
    }
  }
  // hands in front: her right hand on the brim drawn by hand (art builder 1's hat-tip hand), the others still shapes
  const tipping = !!brimAt && p.handR?.shape === "pinch" && p.handR.y < -20;
  for (const [hd, s] of [[p.handL, -1], [p.handR, 1]] as const) if (hd && !hd.behind && !(tipping && s === 1)) hand(hd, s);
  if (tipping && brimAt) at(atAnchor(handHatTip(look), 0, 0), brimAt[0], brimAt[1]);
  void by;
}

export { W, H };
