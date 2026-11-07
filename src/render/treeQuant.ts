// The trees' normal maps cut to a small palette of directions (Ed, 2026-11-07: "Normal maps do improve things, can we try a low
// number (16? 32? 64?)"): a k-means palette of k directions per tree atlas, as a bake would ship it. Ported from PR #1884's
// measurement (tools/prebake/treeQuant.mjs on claude/prebake-art: kmeans and quantNormal, its km<N> settings): each distinct
// normal is a unit direction, decoded as the sprite shader decodes it, weighted by how many pixels have it; the centres start
// from the most used direction and then the farthest by weighted distance in turn (deterministic), take 12 rounds of Lloyd's
// steps, and are renormalised to unit length and encoded back as the art's bytes. The alpha (the pixel wind's sway code) is kept
// exactly, and empty pixels (all four bytes 0) are skipped. Pure (no Three.js): render/treeNormalDirs.ts runs it on the page in
// slices (a generator: it yields every so often and the caller stops at its frame budget) and uploads the result.

/** A box of an atlas's pixels (a tree frame's), in pixels from its top left. */
export interface PixelRect { x: number; y: number; w: number; h: number }
/** A plane's normals as palette entries: `idx` one byte a pixel of the whole plane (0: untouched, outside the boxes or empty;
 *  c + 1: entry c), `pal` the entries' RGB bytes (3 an entry, up to k of them). */
export interface NormalPalette { k: number; idx: Uint8Array; pal: Uint8Array; rects: readonly PixelRect[]; width: number }

/** A normal's bytes as the shader reads them, as a unit direction (x and y signed about 128, z from 0). */
export const dirOf = (R: number, G: number, B: number): [number, number, number] => {
  const x = (R - 128) / 127, y = (G - 128) / 127, z = B / 255, l = Math.hypot(x, y, z) || 1;
  return [x / l, y / l, z / l];
};
/** A unit direction as the art's bytes. */
export const bytesOf = (x: number, y: number, z: number): [number, number, number] => [Math.max(0, Math.min(255, Math.round(x * 127 + 128))), Math.max(0, Math.min(255, Math.round(y * 127 + 128))), Math.max(0, Math.min(255, Math.round(z * 255)))];

/** How much arithmetic between yields (point-centre distances): a millisecond or so. */
const WORK = 60000;

/** k-means over weighted 3D points (x, y, z each), as the measurement's: k-means++'s farthest-first start from the most used point,
 *  deterministic, then `iters` rounds of assigning each point its nearest centre and moving each centre to its points' weighted
 *  mean (a centre left with none stays put). Yields as it goes. (The measurement's took any number of dimensions; this one is
 *  written out for three, the same sums in the same order, so it gives the same centres about three times as fast.) */
export function* kmeans(points: Float64Array, weights: Float64Array, k: number, iters = 12): Generator<void, { centres: Float64Array; assign: Int32Array }, void> {
  const n = weights.length;
  if (n <= k) return { centres: points.slice(), assign: Int32Array.from({ length: n }, (_, i) => i) };
  const C = new Float64Array(k * 3), d2 = new Float64Array(n).fill(Infinity);
  let first = 0; for (let i = 1; i < n; i++) if (weights[i] > weights[first]) first = i;
  C[0] = points[first * 3]; C[1] = points[first * 3 + 1]; C[2] = points[first * 3 + 2];
  let work = 0;
  for (let c = 1; c < k; c++) {
    const cx = C[(c - 1) * 3], cy = C[(c - 1) * 3 + 1], cz = C[(c - 1) * 3 + 2];
    let far = 0, farV = -1;
    for (let i = 0; i < n; i++) {
      const dx = points[i * 3] - cx, dy = points[i * 3 + 1] - cy, dz = points[i * 3 + 2] - cz, s = dx * dx + dy * dy + dz * dz;
      if (s < d2[i]) d2[i] = s;
      const v = d2[i] * weights[i]; if (v > farV) { farV = v; far = i; }
    }
    C[c * 3] = points[far * 3]; C[c * 3 + 1] = points[far * 3 + 1]; C[c * 3 + 2] = points[far * 3 + 2];
    if ((work += n) > WORK) { work = 0; yield; }
  }
  const assign = new Int32Array(n);
  for (let it = 0; it < iters; it++) {
    for (let i = 0; i < n; i++) {
      const px = points[i * 3], py = points[i * 3 + 1], pz = points[i * 3 + 2];
      let best = 0, bv = Infinity;
      for (let c = 0, o = 0; c < k; c++, o += 3) { const dx = px - C[o], dy = py - C[o + 1], dz = pz - C[o + 2], s = dx * dx + dy * dy + dz * dz; if (s < bv) { bv = s; best = c; } }
      assign[i] = best;
      if ((work += k) > WORK) { work = 0; yield; }
    }
    const sum = new Float64Array(k * 3), wsum = new Float64Array(k);
    for (let i = 0; i < n; i++) { const c = assign[i], w = weights[i]; wsum[c] += w; sum[c * 3] += points[i * 3] * w; sum[c * 3 + 1] += points[i * 3 + 1] * w; sum[c * 3 + 2] += points[i * 3 + 2] * w; }
    for (let c = 0; c < k; c++) if (wsum[c] > 0) { C[c * 3] = sum[c * 3] / wsum[c]; C[c * 3 + 1] = sum[c * 3 + 1] / wsum[c]; C[c * 3 + 2] = sum[c * 3 + 2] / wsum[c]; }
  }
  return { centres: C, assign };
}

/** The palette of `k` directions (1 to 255) for the normals inside `rects` of an RGBA plane `width` pixels wide: the plane itself
 *  is left as it is (applyNormalPalette makes the new one). Yields every so often. */
export function* quantiseNormals(N: Uint8Array, width: number, rects: readonly PixelRect[], k: number): Generator<void, NormalPalette, void> {
  if (!(k >= 1 && k <= 255)) throw new RangeError(`directions ${k}: 1 to 255`);
  // Each non-empty pixel's distinct value (by its RGB: the alpha is the sway code, kept), and how many pixels have each.
  let total = 0; for (const r of rects) total += r.w * r.h;
  const pix = new Uint32Array(total), which = new Uint32Array(total), slot = new Map<number, number>(), count: number[] = [], keys: number[] = [];
  let m = 0, lastKey = -1, lastSlot = 0;
  for (const r of rects) {
    for (let y = r.y; y < r.y + r.h; y++) {
      for (let i = y * width + r.x, end = i + r.w; i < end; i++) {
        const o = i * 4;
        if (!(N[o] | N[o + 1] | N[o + 2] | N[o + 3])) continue;
        const key = (N[o] << 16) | (N[o + 1] << 8) | N[o + 2];
        if (key !== lastKey) {
          let s = slot.get(key);
          if (s === undefined) { s = keys.length; slot.set(key, s); keys.push(key); count.push(0); }
          lastKey = key; lastSlot = s;
        }
        count[lastSlot]++; pix[m] = i; which[m] = lastSlot; m++;
      }
    }
    yield;
  }
  const n = keys.length, pts = new Float64Array(n * 3), wts = new Float64Array(n);
  for (let i = 0; i < n; i++) { const key = keys[i], d = dirOf(key >> 16, (key >> 8) & 255, key & 255); pts[i * 3] = d[0]; pts[i * 3 + 1] = d[1]; pts[i * 3 + 2] = d[2]; wts[i] = count[i]; }
  const { centres, assign } = yield* kmeans(pts, wts, k);
  const used = Math.min(k, n), pal = new Uint8Array(used * 3);
  for (let c = 0; c < used; c++) { const x = centres[c * 3], y = centres[c * 3 + 1], z = centres[c * 3 + 2], l = Math.hypot(x, y, z) || 1; pal.set(bytesOf(x / l, y / l, z / l), c * 3); }
  const idx = new Uint8Array(N.length >> 2);
  for (let j = 0; j < m; j++) idx[pix[j]] = assign[which[j]] + 1;
  return { k, idx, pal, rects, width };
}

/** The plane with the palette's directions put in (its RGB; its alpha, and every pixel outside the boxes or empty, as `orig`):
 *  a new array, or `out` filled. */
export function applyNormalPalette(orig: Uint8Array, q: NormalPalette, out: Uint8Array = new Uint8Array(orig.length)): Uint8Array {
  out.set(orig);
  const { idx, pal, width } = q;
  for (const r of q.rects) {
    for (let y = r.y; y < r.y + r.h; y++) {
      for (let i = y * width + r.x, end = i + r.w; i < end; i++) {
        const c = idx[i];
        if (!c) continue;
        const o = i * 4, p = (c - 1) * 3;
        out[o] = pal[p]; out[o + 1] = pal[p + 1]; out[o + 2] = pal[p + 2];
      }
    }
  }
  return out;
}

/** Run a generator to its end at once (tests, and anything off the frame loop). */
export function runToEnd<T>(g: Generator<void, T, void>): T {
  for (;;) { const r = g.next(); if (r.done) return r.value; }
}
