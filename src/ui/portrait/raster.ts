// The portrait's pixel engine (the witch's portrait, Ed 2026-10-08: "as flexible a model as you can make it"): every part is a
// shape, a function from its own coordinates (art pixels, y down) to a palette index (0: not there), drawn into one small buffer
// of palette indices through an affine transform, so a part tilts, bobs, flies off and comes back for free, and a new part is a
// few lines. A part can carry an outline: the pixels just outside it, drawn in ink first, so each part reads as a sticker over
// the ones under it (the chunky anime bust of Ed's reference). No canvas here: the buffer is painted by portrait.ts, and the
// tests draw it in node.

/** An affine transform from a part's coordinates to the buffer's: [a, b, c, d, e, f] maps (x, y) to (a x + c y + e, b x + d y + f). */
export type Xf = readonly [number, number, number, number, number, number];
export const ID: Xf = [1, 0, 0, 1, 0, 0];
/** a after b: b first, then a. */
export const mul = (a: Xf, b: Xf): Xf => [a[0] * b[0] + a[2] * b[1], a[1] * b[0] + a[3] * b[1], a[0] * b[2] + a[2] * b[3], a[1] * b[2] + a[3] * b[3], a[0] * b[4] + a[2] * b[5] + a[4], a[1] * b[4] + a[3] * b[5] + a[5]];
export const move = (x: number, y: number): Xf => [1, 0, 0, 1, x, y];
export const turn = (r: number): Xf => { const c = Math.cos(r), s = Math.sin(r); return [c, s, -s, c, 0, 0]; };
export const scale = (sx: number, sy = sx): Xf => [sx, 0, 0, sy, 0, 0];
/** Turned by r about (x, y), in the part's own coordinates. */
export const turnAbout = (r: number, x: number, y: number): Xf => mul(move(x, y), mul(turn(r), move(-x, -y)));
const inv = (m: Xf): Xf => { const det = m[0] * m[3] - m[1] * m[2], a = m[3] / det, b = -m[1] / det, c = -m[2] / det, d = m[0] / det; return [a, b, c, d, -(a * m[4] + c * m[5]), -(b * m[4] + d * m[5])]; };

/** A part's shape: its palette index at (x, y) in its own coordinates, 0 where it isn't. */
export type Shape = (x: number, y: number) => number;
/** Its box in its own coordinates: [x0, y0, x1, y1]. */
export type Box = readonly [number, number, number, number];

export class Raster {
  readonly px: Uint8Array;
  private mask: Uint8Array;
  constructor(readonly w: number, readonly h: number) { this.px = new Uint8Array(w * h); this.mask = new Uint8Array((w + 2) * (h + 2)); }
  clear(): void { this.px.fill(0); }
  /** Draws a shape through xf over its box; with `outline` (a palette index), the pixels just outside it (4-neighbours) first. */
  draw(shape: Shape, box: Box, xf: Xf = ID, outline = 0): void {
    const { w, h } = this, iv = inv(xf);
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const [bx, by] of [[box[0], box[1]], [box[2], box[1]], [box[0], box[3]], [box[2], box[3]]]) {
      const sx = xf[0] * bx + xf[2] * by + xf[4], sy = xf[1] * bx + xf[3] * by + xf[5];
      x0 = Math.min(x0, sx); y0 = Math.min(y0, sy); x1 = Math.max(x1, sx); y1 = Math.max(y1, sy);
    }
    const ax = Math.max(0, Math.floor(x0) - 1), ay = Math.max(0, Math.floor(y0) - 1), bx = Math.min(w - 1, Math.ceil(x1) + 1), by = Math.min(h - 1, Math.ceil(y1) + 1);
    if (ax > bx || ay > by) return;
    const mw = bx - ax + 3, mask = this.mask.length >= mw * (by - ay + 3) ? this.mask : (this.mask = new Uint8Array(mw * (by - ay + 3)));
    mask.fill(0, 0, mw * (by - ay + 3));
    for (let y = ay; y <= by; y++) for (let x = ax; x <= bx; x++) {
      const cx = x + 0.5, cy = y + 0.5, lx = iv[0] * cx + iv[2] * cy + iv[4], ly = iv[1] * cx + iv[3] * cy + iv[5];
      mask[(y - ay + 1) * mw + (x - ax + 1)] = shape(lx, ly);
    }
    const px = this.px;
    if (outline) for (let y = ay; y <= by; y++) for (let x = ax; x <= bx; x++) {
      const i = (y - ay + 1) * mw + (x - ax + 1);
      if (!mask[i] && (mask[i - 1] || mask[i + 1] || mask[i - mw] || mask[i + mw])) px[y * w + x] = outline;
    }
    for (let y = ay; y <= by; y++) for (let x = ax; x <= bx; x++) { const v = mask[(y - ay + 1) * mw + (x - ax + 1)]; if (v) px[y * w + x] = v; }
  }
  /** Painted into RGBA (a Uint32 per pixel, little-endian ABGR as ImageData wants) through a palette of the same. */
  paint(out: Uint32Array, palette: Uint32Array): void { const px = this.px; for (let i = 0; i < px.length; i++) out[i] = px[i] ? palette[px[i]] : 0; }
}

// Shape helpers, in a part's own coordinates.
/** Inside the ellipse at (cx, cy) with radii rx, ry. */
export const inEll = (x: number, y: number, cx: number, cy: number, rx: number, ry: number): boolean => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1;
/** Within d of the segment (ax, ay)-(bx, by). */
export const nearSeg = (x: number, y: number, ax: number, ay: number, bx: number, by: number, d: number): boolean => {
  const vx = bx - ax, vy = by - ay, l = vx * vx + vy * vy, t = l ? Math.max(0, Math.min(1, ((x - ax) * vx + (y - ay) * vy) / l)) : 0;
  return (x - ax - t * vx) ** 2 + (y - ay - t * vy) ** 2 <= d * d;
};
/** A triangle wave, 0 to 1 and back, period 1. */
export const tri = (v: number): number => { const f = v - Math.floor(v); return f < 0.5 ? f * 2 : 2 - f * 2; };
/** A stable hash of integers to 0..1 (no Math.random in the art). */
export const hash = (a: number, b: number, c = 0): number => { let h = (a * 374761393 + b * 668265263 + c * 2147483647) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
