// The biome lakes' shore dressing (Ed, 2026-10-23, the biome lakes' second part): the pieces that stand round each special
// lake (src/rules/lakeShore.ts lays them out): bones and a drowned trunk in a tar pit, ice chunks by a glacial tarn and a glacier,
// lava rocks (glowing in their cracks) and scorched trees by lava, a hot spring's pale mineral crust. Built in 3D like the world
// decorations (decor.js decorPieceSprite), at the witch's scale. The oasis's palms and grass and the lily pond's reeds are
// the art's own (trees.js palmTree, the beach's grass, decor.js lakeKit), baked beside these (src/render/artBuild.ts lakeShore).
import { M, sinHash } from "./core.js";
import { DECOR_BY_ID, dcCell, dcDead, dcRock, decorColours, decorPieceSprite } from "./decor.js";

// bone: pale, its ends knobbed, its foot in the tar (black)
const tarFoot = (mat, y = .06) => p => (p[1] < y ? M.NOSE : dcCell(p, 16) > .9 ? M.BODY2 : mat === M.BELLY ? undefined : mat);
const bone = (m, a, b, r, g) => { m.seg(a, b, r, r * .8, M.BELLY, { group: g, paint: tarFoot(M.BELLY) }); for (const e of [a, b]) m.ell(e, [r * 1.7, r * 1.4, r * 1.7], M.BELLY, { group: g, paint: tarFoot(M.BELLY) }); };

export const LAKE_SHORE_PIECES = [
  // a tar pit: a great beast's ribs half sunk, its skull; a scatter of long bones; a drowned trunk, its limbs reaching up out of the tar
  { id: "tar-ribs", kind: "bones", variants: 2, size: 1.3, split: null, build(m, v) {
    const n = 5 + v * 2;
    m.chain([[-1.1, .12, 0, .07], [0, .2, 0, .08], [1.1 + v * .3, .1, 0, .06]], M.BELLY, { group: 1, paint: tarFoot(M.BELLY, .1) }); // the spine, along the surface
    for (let i = 0; i < n; i++) { const x = -.9 + i * (1.8 + v * .3) / (n - 1), h = .75 - Math.abs(i - n / 2) * .08;
      for (const s of [-1, 1]) m.chain([[x, .2, 0, .045], [x + .05, h, s * .35, .04], [x + .1, h * .7, s * .6, .03], [x + .12, .02, s * .7, .02]], M.BELLY, { group: 2 + (i % 3), paint: tarFoot(M.BELLY) }); } // each rib arching up out of the tar and down
    if (v === 0) { m.ell([1.55, .22, .05], [.32, .22, .24], M.BELLY, { group: 6, paint: p => (p[1] < .08 ? M.NOSE : Math.hypot(p[0] - 1.72, p[1] - .28) < .07 && p[2] > .1 ? M.NOSE : undefined) }); m.seg([1.75, .1, 0], [2.0, .06, 0], .08, .05, M.BELLY, { group: 6, paint: tarFoot(M.BELLY) }); } // its skull, an eye socket black
  } },
  { id: "tar-bones", kind: "bones", variants: 2, size: 1, split: null, build(m, v) {
    for (let i = 0; i < 4 + v; i++) { const a = sinHash(i, v + 3) * 6.28, x = (sinHash(i, v) - .5) * 1.4, z = (sinHash(v, i) - .5) * .7, L = .35 + sinHash(i, 9) * .35;
      bone(m, [x - Math.cos(a) * L / 2, .05 + sinHash(i, 11) * .12, z - Math.sin(a) * L * .3], [x + Math.cos(a) * L / 2, .04, z + Math.sin(a) * L * .3], .035, 1 + (i % 3)); }
    if (v === 1) m.ell([.1, .12, .1], [.14, .11, .16], M.BELLY, { group: 4, paint: p => (p[1] < .05 ? M.NOSE : Math.hypot(p[0] - .17, p[1] - .14) < .04 && p[2] > .15 ? M.NOSE : undefined) }); // a small skull
  } },
  { id: "drowned-trunk", kind: "trunk", variants: 2, size: 1.4, split: null, build(m, v) {
    const s = v ? -1 : 1, wet = p => (p[1] < .12 ? M.NOSE : dcCell(p, 11, 9) < .25 ? M.BARKD : undefined);
    m.chain([[-1.4 * s, .05, -.1, .26], [-.3 * s, .22, 0, .24], [.9 * s, .28, .1, .2], [1.6 * s, .2, .12, .12]], M.STONE, { group: 1, rough: .015, paint: wet }); // lying in the tar, half sunk
    m.ell([-1.45 * s, .12, -.1], [.28, .3, .3], M.STONE, { group: 1, paint: wet }); // its root plate's stump
    for (let i = 0; i < 3; i++) { const x = (-.6 + i * .8) * s; dcDead(m, [[x, .3, 0, .08], [x + .15 * s, .9 + i * .15, .05, .05], [x + .1 * s, 1.4 + i * .2, .1, .02]], 2 + i); } // its dead limbs, reaching up out of it
  } },
  // ice: angular chunks heaped by the water, snow on their tops, blue in their faces
  { id: "ice-chunks", kind: "ice", variants: 3, size: 1, split: null, build(m, v) {
    for (let i = 0; i < 3 + v * 2; i++) { const x = (sinHash(i, v) - .5) * (.8 + v * .5), z = (sinHash(v, i) - .5) * .5, s = .14 + sinHash(i, v + 7) * (.22 + v * .05);
      const top = .02 + s * 1.2;
      m.box([x, s * .7, z], [s, s * .75, s * .8], M.STONE, { group: 1 + (i % 3), round: .01, dir: [Math.cos(sinHash(i, 21) * 3), .25 * (sinHash(i, 22) - .5), Math.sin(sinHash(i, 21) * 3)], paint: p => (p[1] > top ? M.BELLY : dcCell(p, 9, i) < .22 ? M.STONED : undefined) }); }
  } },
  // lava: black basalt, its cracks glowing; trees by it scorched black
  { id: "lava-rock", kind: "lavaRock", variants: 3, size: 1, split: null, build(m, v) {
    const glow = (c, r) => p => { const n = dcCell(p, 7, v + 3); return Math.abs(n - .5) < .05 && p[1] < c[1] + r[1] * .6 ? M.GLOW : n > .88 ? M.STONED : undefined; };
    const rocks = v === 2 ? [[[0, .45, 0], [.7, .5, .55]]] : [[[-.2, .25, 0], [.4, .28, .35]], [[.35, .15, .2], [.25, .18, .22]], ...(v ? [[[-.5, .1, .3], [.18, .12, .16]]] : [])];
    rocks.forEach(([c, r], i) => m.ell(c, r, M.STONE, { group: 1 + i, rough: .05, dir: [1, .2 * (i - 1), .3], paint: glow(c, r) }));
  } },
  ...["dead-tree", "cleft-tree", "hollow-tree"].map(id => ({ id: "scorched-" + id.split("-")[0], kind: "scorched", variants: 1, size: 1.2, split: DECOR_BY_ID[id].split, build: DECOR_BY_ID[id].build })),
  // a hot spring's crust: pale travertine lips stepping down, the runoff staining them orange-brown
  { id: "mineral-crust", kind: "crust", variants: 3, size: 1.1, split: null, build(m, v) {
    for (let k = 0; k < 3 + v; k++) { const r = .9 - k * .18, y = .05 + k * .06, x = (sinHash(k, v) - .5) * .2;
      m.ell([x, y, -k * .06], [r, .06, r * .7], M.CLOTH, { group: 1 + (k % 3), rough: .01, paint: p => { const st = Math.sin((p[0] + p[2]) * 13 + v * 2); return st > .7 && dcCell(p, 6, k) < .6 ? M.ACCENT : st > .5 ? M.BODY2 : p[1] > y + .03 && dcCell(p, 9, k) < .3 ? M.WATER : undefined; } }); } // each lip, a shallow pool on top
  } },
];
export const LAKE_SHORE_BY_ID = Object.fromEntries(LAKE_SHORE_PIECES.map(d => [d.id, d]));

/** Each kind's colours (the decor's with its own): the tar's black, bone, ice, basalt and its glow, charcoal, travertine. */
export function lakeShoreColours(kind, st = {}) {
  const c = decorColours(st);
  if (kind === "bones") return { ...c, [M.BELLY]: [214, 204, 180], [M.BODY2]: [150, 138, 116], [M.NOSE]: [10, 9, 12] };
  if (kind === "trunk") return { ...c, [M.STONE]: [70, 60, 54], [M.STONED]: [44, 38, 36], [M.BARKD]: [24, 20, 20], [M.NOSE]: [10, 9, 12] };
  if (kind === "ice") return { ...c, [M.STONE]: [178, 210, 232], [M.STONED]: [96, 150, 200], [M.BELLY]: [236, 244, 250] };
  if (kind === "lavaRock") return { ...c, [M.STONE]: [48, 42, 46], [M.STONED]: [26, 22, 26], [M.MOSS]: [48, 42, 46], [M.GLOW]: [255, 120, 36] };
  if (kind === "scorched") return { ...c, [M.STONE]: [46, 40, 38], [M.STONED]: [26, 22, 22], [M.BARKD]: [12, 10, 10], [M.BARKL]: [70, 58, 52], [M.TRUNK]: [40, 34, 32], [M.LEAF3]: [30, 26, 24] };
  if (kind === "crust") return { ...c, [M.CLOTH]: [228, 220, 200], [M.BODY2]: [196, 150, 96], [M.ACCENT]: [176, 92, 40], [M.WATER]: [92, 150, 170] };
  return c;
}

/** One shore piece drawn (decor.js decorPieceSprite: whole, top, bot, crownY, origin, metres) and its colours. */
export function lakeShoreSprite(id, st = {}, { variant = 0 } = {}) {
  const d = LAKE_SHORE_BY_ID[id]; if (!d) throw new Error(`no lake shore piece "${id}"`);
  return { ...decorPieceSprite(d, st, { variant: variant % d.variants }), colours: lakeShoreColours(d.kind, st), kind: d.kind };
}
