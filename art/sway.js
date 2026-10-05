// The sway mask (for the prototype's wind shader): one byte a pixel, 0 for anything rigid (trunks, limbs, rock, stone, wood,
// metal) rising to 255 at the leafy tips. Leaves, flowers, grass, reeds and cotton sway more the higher they stand above the
// sprite's foot and the nearer they are to its silhouette (the tips); thin twigs (a wooden pixel with few wooden neighbours)
// a little; everything else not at all. swayMask(sp) -> Uint8Array (row by row); bakeSway(sp) -> a grey canvas the size of
// the sprite's albedo (R = G = B = the sway, alpha 255 where the sprite has a pixel), for a parallel texture or atlas.
import { M, defaultCanvas } from "./core.js";

const TF_LEAFY = new Set([M.LEAF, M.LEAF2, M.LEAF3, M.FLOWER, M.WEB, M.STRAW]);
const TF_WOOD = new Set([M.TRUNK, M.BARK2, M.BARKD, M.BARKL]);

export function swayMask(sp) {
  const { w, h } = sp, out = new Uint8Array(w * h);
  let foot = 0; for (let y = h - 1; y >= 0 && !foot; y--) for (let x = 0; x < w; x++) if (sp.m[y * w + x]) { foot = y + 1; break; } // its lowest drawn row
  const H = Math.max(1, foot);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x, m = sp.m[i]; if (!m) continue;
    const up = 1 - y / H; // 0 at its foot, 1 at the top of the sprite
    if (TF_LEAFY.has(m)) {
      let edge = 0; for (let d = 1; d <= 2 && !edge; d++) if (!sp.get(x + d, y) || !sp.get(x - d, y) || !sp.get(x, y - d) || !sp.get(x, y + d)) edge = d === 1 ? 1 : .5; // near the silhouette: the tips
      out[i] = Math.round(255 * Math.min(1, .2 + .6 * Math.pow(Math.max(0, up), .8) + .2 * edge));
    } else if (TF_WOOD.has(m)) { // thin twigs sway a little; trunks and limbs not at all
      let n = 0; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [2, 0], [-2, 0]]) if (TF_WOOD.has(sp.get(x + dx, y + dy))) n++;
      out[i] = n <= 2 && up > .33 ? Math.round(255 * .35 * up) : 0; // (roots at the foot stay still)
    }
  }
  return out;
}
// Pixel wind (stage 8 of #79): the sway by regions that move whole, each a whole number of pixels at a time with its own phase and
// stiffness, so a crown's blobs bob one by one instead of its pixels smearing. A region is a blob (sp.blob, from the genome
// generator) or, for art without blobs, a cell of about SWAY_CELL px. swayCode(sp) -> Uint8Array: 0 where rigid, else the region's
// phase (0 to 7) in the top 3 bits and its stiffness as how far it moves (1 to 31, its pixels' mean sway) in the low 5.
export const SWAY_CELL = [10, 8];
export function swayRegions(sp) {
  const { w, h } = sp, out = new Uint16Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x; if (!sp.m[i]) continue;
    const b = sp.blob?.[i];
    if (b) { out[i] = b; continue; }
    const row = Math.floor(y / SWAY_CELL[1]), col = Math.floor((x + (row % 2) * SWAY_CELL[0] / 2) / SWAY_CELL[0]); // cells offset row by row, like bricks
    out[i] = 256 + ((row * 97 + col) & 0x7fff);
  }
  return out;
}
export function swayCode(sp, mask = swayMask(sp)) {
  const reg = swayRegions(sp), sum = new Map(), out = new Uint8Array(mask.length);
  for (let i = 0; i < mask.length; i++) if (mask[i]) { const a = sum.get(reg[i]) || [0, 0]; a[0] += mask[i]; a[1]++; sum.set(reg[i], a); }
  for (let i = 0; i < mask.length; i++) {
    if (!mask[i] && !(sp.blob?.[i] && sum.has(reg[i]))) continue; // a blob moves whole, its glowing gills and glints with it
    const [t, n] = sum.get(reg[i]), amp = Math.max(1, Math.min(31, Math.round(t / n / 255 * 31))), phase = Math.floor(((Math.imul(reg[i] + 1, 2654435761) >>> 0) / 4294967296) * 8);
    out[i] = (phase << 5) | amp;
  }
  return out;
}
// The mask as a canvas the size of the sprite's albedo: R and B the sway (grey, 0 to 255), G its pixel-wind code (swayCode), alpha
// 255 where the sprite has a pixel; for a parallel texture or atlas.
export function bakeSway(sp, makeCanvas = defaultCanvas) {
  const s = swayMask(sp), code = swayCode(sp, s), c = makeCanvas(sp.w, sp.h), g = c.getContext("2d"), d = g.createImageData(sp.w, sp.h);
  for (let i = 0; i < s.length; i++) if (sp.m[i]) d.data.set([s[i], code[i], s[i], 255], i * 4);
  g.putImageData(d, 0, 0); return c;
}

// The pixel wind as the game's sprite shader draws it (src/render/sprites.ts), for previews and checks: rgba (the baked albedo's
// pixels, row by row) moved by code (swayCode) when the leafiest pixels would move px art pixels at time t. Each region shifts whole
// by a whole number of pixels (at most 2), in step with its own phase; a pixel shows whichever region lands on it, moving ones
// first, or nothing where its own has moved away. smooth: every pixel slides by its own sway instead (?wind=smooth), rounded.
export function windShift(rgba, code, w, h, px, t, { smooth = false, moved = null } = {}) { // moved: an Int8Array to fill with each pixel's shift (or -128 for none)
  const out = new Uint8ClampedArray(rgba.length), off = c => c ? Math.max(-2, Math.min(2, Math.floor((c % 32) / 31 * px * (.8 + .35 * Math.sin(t * 2.3 + Math.floor(c / 32) * .785)) + .5))) : 0;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    let src = -1;
    if (smooth) { const m0 = (code[y * w + x] % 32) / 31, xs = Math.round(x - px * m0); if (xs >= 0 && xs < w) src = y * w + xs; }
    else for (const d of [1, -1, 2, -2, 0]) { const xs = x - d; if (xs < 0 || xs >= w) continue; if (off(code[y * w + xs]) === d) { src = y * w + xs; break; } }
    if (src >= 0) out.set(rgba.subarray(src * 4, src * 4 + 4), (y * w + x) * 4);
    if (moved) moved[y * w + x] = src >= 0 && rgba[src * 4 + 3] ? x - (src - y * w) : -128;
  }
  return out;
}
