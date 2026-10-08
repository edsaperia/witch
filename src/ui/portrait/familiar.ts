// Her familiar on her shoulder (art builder 1, on art3's frame; the creator's accessories.familiar: cat, crow, toad, bat), in
// body coordinates (the neck pivot at 0, 0, y down), sitting on her right shoulder (our left), so it bobs and leans with her.
// Each is a few shapes in the familiar's colours (FAMILIAR its coat, FAMILIAR2 its eyes, beak or throat), alive in small ways
// by the clock: the cat's tail swishes and it blinks, the crow cocks its head, the toad's throat pulses, the bat's ears flick.

import { BASE, DEEP, INK, LIGHT, MAT, SHADE, col, type Mat } from "./palette";
import { hash, inEll, nearSeg, type Box } from "./raster";

/** A tone over a round part (nx, ny -1..1 across it): light from the upper left. */
const round = (m: Mat, nx: number, ny: number): number => { const v = nx * 0.65 + ny * 0.6; return col(m, v < -0.5 ? LIGHT : v > 0.75 ? DEEP : v > 0.28 ? SHADE : BASE); };
/** Inside the triangle a, b, c. */
const inTri = (x: number, y: number, ax: number, ay: number, bx: number, by: number, cx: number, cy: number) => {
  const d1 = (x - bx) * (ay - by) - (ax - bx) * (y - by), d2 = (x - cx) * (by - cy) - (bx - cx) * (y - cy), d3 = (x - ax) * (cy - ay) - (cx - ax) * (y - ay);
  return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0));
};
/** Shut now (a blink of about 0.15 s every few seconds, its own rhythm by `seed`). */
const blink = (t: number, seed: number) => ((t + seed * 1.7) % (3.1 + seed)) < 0.15;
const F = MAT.FAMILIAR, F2 = MAT.FAMILIAR2;

export interface Familiar { box: Box; px: (x: number, y: number, t: number) => number }

const cat: Familiar = {
  box: [-30, -13, -11, 10],
  px: (x, y, t) => {
    // its head: ears, eyes (slit pupils), a pink nose
    const hx = -18.6, hy = -5.6;
    for (const s of [-1, 1]) {
      const ex = hx + s * 2.6;
      if (inEll(x, y, ex, hy - 0.1, 1.25, 1.5)) return blink(t, 1) ? (Math.abs(y - hy) < 0.5 ? INK : col(F, BASE)) : Math.abs(x - ex) < 0.45 ? INK : col(F2, y < hy - 0.6 ? LIGHT : BASE);
      if (inTri(x, y, hx + s * 1.2, hy - 3, hx + s * 4.4, hy - 2, hx + s * 3.6, hy - 7.2)) return inTri(x, y, hx + s * 2.2, hy - 3.2, hx + s * 3.7, hy - 2.8, hx + s * 3.4, hy - 5.6) ? col(MAT.TONGUE, SHADE) : col(F, s < 0 ? LIGHT : BASE);
    }
    if (inEll(x, y, hx, hy + 1.6, 0.8, 0.5)) return col(MAT.TONGUE, BASE);
    if (inEll(x, y, hx, hy, 4.4, 3.8)) return round(F, (x - hx) / 4.4, (y - hy) / 3.8);
    // its body, sitting, its tail swishing down over her shoulder
    if (inEll(x, y, -19.6, 2.4, 4.4, 5.4)) return round(F, (x + 19.6) / 4.4, (y - 2.4) / 5.4);
    const sw = Math.sin(t * 2.1) * 1.6;
    if (nearSeg(x, y, -22.6, 5.5, -26, 7.5, 1.2) || nearSeg(x, y, -26, 7.5, -27.4 + sw * 0.4, 3.5, 1.1) || nearSeg(x, y, -27.4 + sw * 0.4, 3.5, -26 + sw, 0, 1)) return col(F, y < 3 ? BASE : SHADE);
    return 0;
  },
};

const crow: Familiar = {
  box: [-28, -11, -9, 10],
  px: (x, y, t) => {
    const cock = ((t % 3.4) > 2.6 ? 0.9 : 0), hx = -18.4 + cock * 0.6, hy = -5.2 - cock * 0.5;
    // its beak, its eye, its head
    if (inTri(x, y, hx + 2.4, hy - 1.2, hx + 2.4, hy + 1.2, hx + 6.6 + cock * 0.4, hy + 0.4)) return col(F2, y < hy + 0.1 ? LIGHT : SHADE);
    if (inEll(x, y, hx + 0.9, hy - 0.6, 1, 1)) return (x - hx - 0.6) ** 2 + (y - hy + 0.9) ** 2 < 0.25 ? col(MAT.WHITE, BASE) : INK;
    if (inEll(x, y, hx, hy, 3.6, 3.4)) return round(F, (x - hx) / 3.6, (y - hy) / 3.4);
    // its folded wing over its body, its tail feathers, its feet gripping her shoulder
    if (inEll(x, y, -20.4, 1.8, 3.6, 4.6) && y > -1) return col(F, ((x + y + 40) % 2.4) < 0.7 ? DEEP : SHADE);
    if (inEll(x, y, -19.2, 1.4, 4.6, 5.6)) return round(F, (x + 19.2) / 4.6, (y - 1.4) / 5.6);
    if (inTri(x, y, -22.8, 4, -20.6, 6, -26, 9.5)) return col(F, ((x - y + 40) % 2) < 0.8 ? DEEP : SHADE);
    for (const fx of [-20.4, -18]) if (nearSeg(x, y, fx, 6.4, fx + 0.6, 8, 0.55)) return col(F2, SHADE);
    return 0;
  },
};

const toad: Familiar = {
  box: [-28, -5, -10, 10],
  px: (x, y, t) => {
    // its eyes up on bumps: gold, a bar of a pupil
    for (const s of [-1, 1]) {
      const ex = -19.4 + s * 3.2, ey = -0.6;
      if (inEll(x, y, ex, ey, 1.5, 1.4)) return blink(t, 2) ? (Math.abs(y - ey) < 0.6 ? INK : col(F, BASE)) : Math.abs(y - ey) < 0.45 && Math.abs(x - ex) < 1 ? INK : col(F2, y < ey ? LIGHT : BASE);
      if (inEll(x, y, ex, ey + 0.4, 2.4, 2.2)) return col(F, s < 0 ? LIGHT : BASE);
    }
    // its wide mouth, its throat pulsing, its front feet
    const mouth = 2.6 + 0.02 * (x + 19.4) ** 2;
    if (Math.abs(x + 19.4) < 4.6 && Math.abs(y - mouth) < 0.45) return INK;
    const th = 0.9 + 0.35 * Math.max(0, Math.sin(t * 3.4));
    if (inEll(x, y, -19.4, 4.4, 3 * th, 1.6 * th) && y > mouth) return col(F2, y < 4 ? LIGHT : BASE);
    for (const s of [-1, 1]) if (inEll(x, y, -19.4 + s * 4.6, 6.8, 1.6, 1)) return col(F, SHADE);
    if (inEll(x, y, -19.4, 3.4, 6.4, 4.2)) return hash(Math.round(x), Math.round(y), 51) > 0.84 ? col(F, x < -20 ? LIGHT : SHADE) : round(F, (x + 19.4) / 6.4, (y - 3.4) / 4.2);
    return 0;
  },
};

const bat: Familiar = {
  box: [-28, -15, -11, 9],
  px: (x, y, t) => {
    const hx = -19.4, hy = -5.2, flick = (t % 2.7) < 0.12 ? 1 : 0;
    // tall ears (pink inside), little eyes and fangs
    for (const s of [-1, 1]) {
      const tipX = hx + s * (3.4 + flick * (s < 0 ? 1.2 : 0)), tipY = hy - 7 + flick * (s < 0 ? 1 : 0);
      if (inTri(x, y, hx + s * 0.6, hy - 2, hx + s * 3.4, hy - 1, tipX, tipY)) return inTri(x, y, hx + s * 1.4, hy - 2.2, hx + s * 2.9, hy - 1.8, tipX - s * 0.3, tipY + 1.6) ? col(F2, BASE) : col(F, s < 0 ? LIGHT : BASE);
      if (inEll(x, y, hx + s * 1.5, hy - 0.2, 0.75, 0.8)) return blink(t, 3) ? col(F, SHADE) : (x - hx - s * 1.5 + 0.3) ** 2 + (y - hy + 0.5) ** 2 < 0.2 ? col(MAT.WHITE, BASE) : INK;
      if (nearSeg(x, y, hx + s * 0.6, hy + 1.6, hx + s * 0.6, hy + 2.4, 0.35)) return col(MAT.WHITE, BASE);
    }
    if (inEll(x, y, hx, hy + 0.6, 1, 0.7)) return col(F2, SHADE); // (its snout)
    if (inEll(x, y, hx, hy, 3.4, 3.2)) return round(F, (x - hx) / 3.4, (y - hy) / 3.2);
    // its wings folded round it like a cloak, ribbed
    if (inEll(x, y, -19.4, 2.2, 4.8, 5.8)) {
      const rib = Math.abs(x + 19.4) < 0.5 || ((Math.abs(x + 19.4) + y * 0.3 + 40) % 2.6) < 0.55;
      return rib ? col(F, DEEP) : round(F, (x + 19.4) / 4.8, (y - 2.2) / 5.8);
    }
    for (const s of [-1, 1]) if (nearSeg(x, y, -19.4 + s * 1.6, 7.6, -19.4 + s * 2.2, 8.6, 0.5)) return col(F2, DEEP);
    return 0;
  },
};

/** The familiars by the creator's names ("none" and anything else: none). */
export const FAMILIARS: Record<string, Familiar> = { cat, crow, toad, bat };
