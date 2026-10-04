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
export function bakeSway(sp, makeCanvas = defaultCanvas) {
  const s = swayMask(sp), c = makeCanvas(sp.w, sp.h), g = c.getContext("2d"), d = g.createImageData(sp.w, sp.h);
  for (let i = 0; i < s.length; i++) if (sp.m[i]) d.data.set([s[i], s[i], s[i], 255], i * 4);
  g.putImageData(d, 0, 0); return c;
}

