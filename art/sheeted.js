// The two other bedrooms' placeholders (Ed, 2026-10-23: three bedrooms, one per witch, "each distinct; but these will be made by
// future systems, so fill the other two with placeholders for now; the key thing is to reserve the space in the floorplan"): rooms
// not lived in yet, their furniture under dust sheets. A bare bed frame with a folded sheet on its slats, a wardrobe and a chest under
// sheets, and a stack of packing crates. Built as art/furniture.js's pieces are (its model space: x along the wall it backs on, z out
// into the room, y up, the real piece's metres), and joined into its pieces by object id: `bedroom2Bed`, `bedroom3Crates` and so on
// (config/house/, placed by tools/house/organic.mjs). No lights, nothing glowing: nobody lives here yet.
import { M, hash2 } from "./core.js";

/** A dust sheet over a box of half-sizes [hw, hh, hd] standing on the floor at x, z: the sheet's top rounded over it, folds falling
 *  from its top edges, its hem pooling on the floor, its creases in its surface (rough); all one group, so it reads as one cloth. */
function sheet(m, x, z, hw, hh, hd, g, seed) {
  m.box([x, hh, z], [hw, hh, hd], M.BELLY, { round: Math.min(hw, hd) * .35, group: g, rough: .015 });
  // folds down its front and sides, from the top edge to the floor, each a slightly different width
  const n = Math.max(2, Math.round(hw * 4));
  for (let i = 0; i < n; i++) {
    const t = (i + .5) / n * 2 - 1, r = .05 + .03 * hash2(i, seed, 3);
    m.seg([x + t * hw * .9, hh * 2 - .05, z + hd], [x + t * hw * .95 + (hash2(i, seed, 5) - .5) * .1, .04, z + hd + .06], r * .6, r, M.BELLY, { group: g });
  }
  for (const s of [-1, 1]) m.seg([x + s * hw, hh * 2 - .05, z], [x + s * (hw + .06), .04, z + (hash2(s + 2, seed, 7) - .5) * hd], .06, .09, M.BELLY, { group: g });
  // the hem pooling on the floor round it
  m.ell([x, .03, z + hd * .3], [hw + .12, .04, hd + .12], M.BELLY, { group: g });
}

/** The placeholder pieces, by kind; each takes its footprint (W along the wall, D out, H up: the real piece's metres). */
const KINDS = {
  // A bare bed frame: four plain posts, rails and slats, no mattress; a folded sheet and a pillow left on the slats at its foot.
  Bed(m, { W, D, H }) {
    const x0 = -W / 2 + .06, x1 = W / 2 - .06, zb = -D / 2 + .06, zf = D / 2 - .06, rail = Math.min(.42, H * .55);
    [[x0, zb, rail + .45], [x1, zb, rail + .45], [x0, zf, rail + .1], [x1, zf, rail + .1]].forEach(([x, z, h], i) => m.box([x, h / 2, z], [.05, h / 2, .05], M.BARKD, { group: 2 + i }));
    m.box([0, rail + .25, zb], [W / 2 - .06, .2, .03], M.WOOD, { group: 6, paint: p => (Math.abs(((p[0] / .25) % 1 + 1) % 1 - .5) > .45 ? M.BARKD : undefined) });
    for (const x of [x0, x1]) m.box([x, rail, 0], [.035, .05, D / 2 - .06], M.WOOD, { group: 7 });
    for (const z of [zb, zf]) m.box([0, rail, z], [W / 2 - .06, .05, .035], M.WOOD, { group: 7 });
    for (let z = zb + .2; z < zf - .1; z += .24) m.box([0, rail + .02, z], [W / 2 - .1, .015, .06], M.HAIR, { group: 8 });
    m.box([W * .12, rail + .1, zf - .45], [W * .22, .07, .22], M.BELLY, { round: .05, group: 9, paint: p => (Math.abs(p[1] - (rail + .1)) < .012 ? M.STRAW : undefined) });
    m.ell([-W * .2, rail + .12, zf - .4], [.22, .08, .15], M.BELLY, { group: 10 });
  },
  // A tall wardrobe under a dust sheet, its feet showing under the hem.
  Wardrobe(m, { W, D, H }) {
    sheet(m, 0, 0, W / 2 - .05, H / 2 - .04, D / 2 - .05, 2, 1);
    for (const s of [-1, 1]) m.box([s * (W / 2 - .15), .03, D / 2 - .1], [.04, .03, .04], M.BARKD, { group: 3 });
  },
  // A chest or an armchair, who can tell, under a dust sheet, lumpier.
  Chest(m, { W, D, H }) {
    sheet(m, 0, 0, W / 2 - .05, H / 2 - .02, D / 2 - .05, 2, 2);
    m.ell([-W * .2, H - .02, 0], [W * .22, .1, D * .35], M.BELLY, { group: 2 });
  },
  // Packing crates, stacked two and one, slatted, a stencilled arrow on one, a folded sheet on the top one.
  Crates(m, { W, D, H }) {
    const s = Math.min(W / 2, D, H / 2) * .95, slats = p => (Math.abs(((p[1] / (s / 3)) % 1 + 1) % 1 - .5) > .44 ? M.BARKD : undefined);
    const crate = (x, y, z, g, turn = 0) => m.box([x, y + s / 2, z], [s / 2, s / 2, s / 2], M.WOOD, { round: .01, group: g, dir: [Math.cos(turn), 0, Math.sin(turn)], paint: slats });
    crate(-W / 4, 0, 0, 2); crate(W / 4, 0, 0, 3, .12); crate(-W / 8, s, 0, 4, -.1);
    m.flat([W / 4, s * .55, s / 2 + .01], [1, 0, 0], [0, 1, 0], s * .25, s * .25, (u, v) => (Math.abs(u) < .2 && v < .4 || Math.abs(u) < .6 - (v - .4) && v >= .4 && v < 1 ? M.BARKD : undefined), { group: 5, bend: 0 });
    m.box([-W / 8, s * 2 + .03, 0], [s * .38, .03, s * .3], M.BELLY, { round: .02, group: 6, dir: [Math.cos(.3), 0, Math.sin(.3)] });
  },
};

/** The rooms that hold placeholders: the two locked bedrooms. */
export const SHEETED_ROOMS = ["bedroom2", "bedroom3"];
/** The placeholder kinds, each room's objects named `<room><Kind>`. */
export const SHEETED_KINDS = Object.keys(KINDS);
/** The pieces for art/furniture.js, by object id. */
export const SHEETED_PIECES = Object.fromEntries(SHEETED_ROOMS.flatMap(r => SHEETED_KINDS.map(k => [r + k, KINDS[k]])));
/** Their rooms' colours (art/furniture.js's per-room palettes): the dust sheets a dull, dusty grey, not the lit linen of hers (bright
 *  linen read as glowing under the house's lights), the wood unpolished. */
export const SHEETED_COLOURS = Object.fromEntries(SHEETED_ROOMS.map(r => [r, { [M.BELLY]: [128, 124, 118], [M.WOOD]: [104, 80, 58], [M.HAIR]: [80, 62, 48] }]));
