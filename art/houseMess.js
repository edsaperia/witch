// A messy witch's things on the floor round her house's pieces (Ed, 2026-10-26: "she's a messy witch; the invitation desk should have
// invitations falling all over the floor, and her shoe rack should have shoes scattered around it, etc."): what's spilled off each
// piece, only looked at (nothing in the rules knows of it), drawn with its room's dressing (render/houseDecor.ts), so it lies on the
// floor under the pieces and the lit outline of the one she can use (render/useGlow.ts) stays round the piece alone.
//   - Model space as the piece's (art/furniture.js): x along the wall it backs on, z out into the room (its front at D/2), y up; in the
//     real piece's metres (its footprint over sizeOf), drawn as big as the piece, so a shoe by the shoe rack is the rack's own size.
//   - Each piece's spill (MESS) is a list of things and how many; they're scattered round its front and sides (more in front, where she
//     stands, and none behind it), seeded by the piece's id so the same every load, never on one another.
import { M, hash2 } from "./core.js";
import { Model } from "./model3d.js";
import { PARTS, modelSprite, sizeOf } from "./furniture.js";

const { can, disc } = PARTS;
const rotY = (v, a) => [v[0] * Math.cos(a) + v[2] * Math.sin(a), v[1], -v[0] * Math.sin(a) + v[2] * Math.cos(a)];
const X = [1, 0, 0];

// ---------- the things, each lying at (x, z) on the floor turned by a, its seed k ----------
const THINGS = {
  // a trainer or a boot on its side, toe out, its sole another colour
  shoe(m, x, z, a, k, g) { const mat = [M.SHOES, M.POM, M.SHADES, M.HAT1, M.BARKD][Math.floor(hash2(k, 1, 3) * 5)], sole = mat === M.SHADES ? M.COLLAR : M.SOLE, d = rotY([0, 0, 1], a);
    m.ell([x, .06, z], [.08, .06, .14], mat, { group: g, dir: d });
    m.ell([x + d[0] * .01, .02, z + d[2] * .01], [.085, .022, .15], sole, { group: g + 1, dir: d });
    if (hash2(k, 2, 3) > .6) m.seg([x - d[0] * .08, .08, z - d[2] * .08], [x - d[0] * .12, .24, z - d[2] * .12], .065, .06, mat, { group: g }); },
  // a sock, curled
  sock(m, x, z, a, k, g) { const d = rotY(X, a); m.chain([[x - d[0] * .1, .02, z - d[2] * .1, .03], [x, .025, z, .03], [x + d[0] * .06, .02, z + d[2] * .08, .028]], [M.BELLY, M.POM, M.IRIS][k % 3], { group: g, paint: p => (Math.floor((p[0] + p[2]) * 30) % 3 ? undefined : M.ACCENT) }); },
  // a garment dropped in a heap: a crumpled body, a sleeve thrown out
  clothes(m, x, z, a, k, g) { const mat = [M.HAT2, M.POM, M.JACKET, M.IRIS, M.CLOTH, M.HAT1][Math.floor(hash2(k, 4, 3) * 6)], d = rotY(X, a);
    // (a top flung down: its body flat and creased, both sleeves out, its neck a darker ring; so it reads as clothes, not a cushion)
    const e = [-d[2], 0, d[0]];
    m.box([x, .025, z], [.17, .022, .2], mat, { round: .03, group: g, dir: d, rough: .01, paint: p => (Math.abs(((p[0] - x) * d[0] + (p[2] - z) * d[2]) * 9 % 1) < .12 ? M.BODY : undefined) });
    for (const s of [-1, 1]) m.chain([[x + d[0] * s * .15 - e[0] * .12, .03, z + d[2] * s * .15 - e[2] * .12, .05], [x + d[0] * s * .3, .025, z + d[2] * s * .3 + .02, .045], [x + d[0] * s * .36 + e[0] * .1 * s, .02, z + d[2] * s * .36 + e[2] * .1 * s, .04]], mat, { group: g + 1 });
    m.ell([x - e[0] * .17, .05, z - e[2] * .17], [.07, .02, .05], M.BODY, { group: g + 2, dir: d }); },
  // a hanger dropped
  hanger(m, x, z, a, k, g) { const d = rotY(X, a); m.seg([x - d[0] * .16, .01, z - d[2] * .16], [x + d[0] * .16, .01, z + d[2] * .16], .012, .012, M.WOOD, { group: g }); m.seg([x, .01, z], [x - d[2] * .08, .01, z + d[0] * .08], .008, .008, M.FRAME, { group: g }); },
  // a book lying open or shut; a stack of them
  book(m, x, z, a, k, g) { const mat = [M.ACCENT, M.HAT1, M.IRIS, M.FLOWER, M.BODY3][k % 5], d = rotY(X, a);
    if (hash2(k, 5, 3) > .5) m.box([x, .03, z], [.12, .025, .16], mat, { round: .01, group: g, dir: d, paint: p => (p[1] > .05 ? M.BELLY : undefined) });
    else { m.box([x, .015, z], [.2, .012, .14], mat, { group: g, dir: d }); for (const s of [-1, 1]) m.box([x + d[0] * s * .095, .032, z + d[2] * s * .095], [.09, .006, .12], M.BELLY, { group: g + 1, dir: d }); } },
  books(m, x, z, a, k, g) { const n = 3 + (k % 3); for (let i = 0; i < n; i++) m.box([x + (hash2(k, i, 6) - .5) * .04, .04 + i * .07, z + (hash2(k, i, 7) - .5) * .04], [.15 - (i % 2) * .02, .03, .11], [M.ACCENT, M.HAT1, M.IRIS, M.FLOWER, M.BODY3, M.BODY2][(k + i) % 6], { round: .01, group: g + i, dir: rotY(X, a + (hash2(k, i, 8) - .5) * .5), paint: p => (Math.abs(((p[1] - .04) / .07) % 1 - .5) < .1 ? M.BELLY : undefined) }); },
  // a loose sheet of paper (a page, a note, a chart), a crumpled ball of it
  paper(m, x, z, a, k, g) { m.box([x, .006, z], [.1, .004, .14], M.BELLY, { group: g, dir: rotY(X, a), paint: p => (Math.abs(((p[2] - z) * 25) % 1) < .2 && hash2(k, 9, 3) > .4 ? M.TOP : undefined) }); },
  crumple(m, x, z, a, k, g) { m.ell([x, .045, z], [.05, .045, .05], M.BELLY, { group: g, rough: .02 }); },
  // a chart: parchment, its sea, unrolled at a corner; or rolled and tied
  chart(m, x, z, a, k, g) { if (k % 2) { const d = rotY(X, a); m.seg([x - d[0] * .2, .04, z - d[2] * .2], [x + d[0] * .2, .04, z + d[2] * .2], .04, .04, M.BELLY, { group: g, paint: p => (Math.abs((p[0] - x) * d[0] + (p[2] - z) * d[2]) < .02 ? M.ACCENT : undefined) }); }
    else m.box([x, .006, z], [.18, .004, .13], M.STRAW, { group: g, dir: rotY(X, a), paint: p => (Math.hypot(p[0] - x - .03, p[2] - z) < .07 ? M.WATER : Math.hypot(p[0] - x - .03, p[2] - z) < .09 ? M.LEAF2 : undefined) }); },
  // a pencil, a quill, a paintbrush, a drumstick
  pencil(m, x, z, a, k, g) { const d = rotY(X, a); m.seg([x - d[0] * .08, .012, z - d[2] * .08], [x + d[0] * .08, .012, z + d[2] * .08], .012, .008, [M.FLOWER, M.ACCENT, M.HAT1][k % 3], { group: g }); },
  stick(m, x, z, a, k, g) { const d = rotY(X, a); m.seg([x - d[0] * .2, .018, z - d[2] * .2], [x + d[0] * .2, .018, z + d[2] * .2], .018, .012, M.WOOD, { group: g }); },
  // wood shavings curling, sawdust; straw from a broom's bristles
  shavings(m, x, z, a, k, g) { for (let i = 0; i < 6; i++) { const b = a + i * 1.05, r = .05 + hash2(k, i, 9) * .12; m.ell([x + Math.cos(b) * r, .012, z + Math.sin(b) * r], [.05, .014, .025], i % 3 ? M.STRAW : M.WOOD, { group: g, dir: [Math.cos(b + 1), .3, Math.sin(b + 1)] }); } },
  straw(m, x, z, a, k, g) { for (let i = 0; i < 7; i++) { const b = a + (hash2(k, i, 4) - .5) * 1.6, d = [Math.cos(b), 0, Math.sin(b)], o = (hash2(k, i, 5) - .5) * .14; m.seg([x + o, .008, z - o], [x + o + d[0] * .14, .008, z - o + d[2] * .14], .007, .005, M.STRAW, { group: g }); } },
  // a spanner, a screwdriver; screws and nuts; an oily rag
  spanner(m, x, z, a, k, g) { const d = rotY(X, a); m.seg([x - d[0] * .12, .012, z - d[2] * .12], [x + d[0] * .12, .012, z + d[2] * .12], .016, .016, M.FRAME, { group: g }); m.ell([x + d[0] * .14, .012, z + d[2] * .14], [.035, .012, .035], M.FRAME, { group: g }); },
  screws(m, x, z, a, k, g) { for (let i = 0; i < 4; i++) m.ell([x + (hash2(k, i, 2) - .5) * .16, .01, z + (hash2(k, i, 3) - .5) * .12], [.014, .01, .014], M.FRAME, { group: g }); },
  rag(m, x, z, a, k, g) { m.ell([x, .02, z], [.14, .025, .1], M.BELLY, { group: g, rough: .012, dir: rotY(X, a), paint: p => (hash2(Math.round(p[0] * 40), Math.round(p[2] * 40), k) > .7 ? M.ACCENT : undefined) }); },
  // a record out of its sleeve, the sleeve by it
  record(m, x, z, a, k, g) { disc(m, [x, .006, z], .13, .005, M.SHADES, { group: g, paint: p => (Math.hypot(p[0] - x, p[2] - z) < .04 ? [M.ACCENT, M.FLOWER, M.HAT1][k % 3] : undefined) });
    if (k % 2) m.box([x + .12, .008, z + .05], [.14, .005, .14], [M.POM, M.IRIS, M.JACKET][k % 3], { group: g + 1, dir: rotY(X, a) }); },
  // a cable, coiled and trailing; a patch lead
  cable(m, x, z, a, k, g) { const pts = []; for (let i = 0; i <= 8; i++) { const t = i / 8, b = a + t * 5; pts.push([x + Math.cos(b) * (.06 + t * .1), .012, z + Math.sin(b) * (.06 + t * .08), .012]); } m.chain(pts, [M.SHADES, M.ACCENT, M.HAT1, M.COLLAR][k % 4], { group: g }); },
  // a mug or a teacup (on its side, sometimes), a sugar cube or two
  cup(m, x, z, a, k, g) { const mat = [M.ACCENT, M.BELLY, M.HAT1, M.POM][k % 4]; if (k % 3) can(m, x, z, 0, .1, .045, mat, { group: g }); else m.seg([x - .05, .045, z], [x + .05, .045, z + .02], .045, .045, mat, { group: g }); },
  sugar(m, x, z, a, k, g) { for (let i = 0; i < 2; i++) m.box([x + i * .05, .015, z + i * .03], [.015, .015, .015], M.BELLY, { group: g }); },
  // a playing card or three, a gambling chip
  cards(m, x, z, a, k, g) { for (let i = 0; i < 3; i++) m.box([x + i * .04, .004 + i * .002, z + (i - 1) * .03], [.05, .003, .075], M.BELLY, { group: g + i, dir: rotY(X, a + i * .5), paint: p => (Math.abs(p[0] - x - i * .04) < .015 ? (i % 2 ? M.ACCENT : M.SHADES) : undefined) }); },
  chips(m, x, z, a, k, g) { for (let i = 0; i < 3; i++) disc(m, [x + i * .04, .01, z + (i % 2) * .04], .025, .008, [M.ACCENT, M.IRIS, M.FLOWER][i], { group: g }); },
  // herbs dropped, peelings; a bag of crisps
  herbs(m, x, z, a, k, g) { for (let i = 0; i < 4; i++) { const b = a + i * .4; m.seg([x, .01, z], [x + Math.cos(b) * .14, .01, z + Math.sin(b) * .14], .008, .008, M.LEAF3, { group: g }); m.ell([x + Math.cos(b) * .13, .02, z + Math.sin(b) * .13], [.025, .012, .02], i % 2 ? M.LEAF : M.LEAF2, { group: g }); } },
  crisps(m, x, z, a, k, g) { m.box([x, .025, z], [.08, .02, .1], [M.JACKET, M.ACCENT, M.IRIS][k % 3], { round: .02, group: g, dir: rotY(X, a), paint: p => (Math.hypot(p[0] - x, p[2] - z) < .03 ? M.BELLY : undefined) }); },
  // a bottle on its side, a potion's little glow; a lipstick, a compact, hair ties
  bottle(m, x, z, a, k, g) { const d = rotY(X, a); m.seg([x - d[0] * .08, .04, z - d[2] * .08], [x + d[0] * .06, .04, z + d[2] * .06], .04, .035, M.CRYSTAL, { group: g }); m.seg([x + d[0] * .06, .04, z + d[2] * .06], [x + d[0] * .11, .04, z + d[2] * .11], .015, .015, M.CRYSTAL, { group: g }); },
  makeup(m, x, z, a, k, g) { m.seg([x, .015, z], [x + .07, .015, z + .02], .014, .014, M.SHADES, { group: g }); m.seg([x + .07, .015, z + .02], [x + .09, .015, z + .025], .012, .009, M.ACCENT, { group: g }); disc(m, [x - .06, .012, z + .06], .035, .012, M.FLOWER, { group: g + 1 }); for (let i = 0; i < 2; i++) disc(m, [x + .04 + i * .05, .006, z - .06], .025, .006, [M.POM, M.HAT1][i], { group: g + 2 }); },
  // a glove, a fallen hat, a ribbon
  hat(m, x, z, a, k, g) { const mat = [M.HAT, M.HAT2, M.HAT1][k % 3]; m.ell([x, .015, z], [.2, .015, .18], mat, { group: g }); m.seg([x, .02, z], [x + .18, .1, z - .1], .1, .01, mat, { group: g, paint: p => (p[1] < .05 ? M.FLOWER : undefined) }); },
  ribbon(m, x, z, a, k, g) { m.chain([[x - .12, .006, z, .012], [x - .04, .006, z + .05, .012], [x + .04, .006, z - .03, .012], [x + .12, .006, z + .03, .012]], [M.POM, M.ACCENT, M.FLOWER][k % 3], { group: g }); },
  // bones and a feather (the bestiary's)
  bone(m, x, z, a, k, g) { const d = rotY(X, a); m.seg([x - d[0] * .1, .02, z - d[2] * .1], [x + d[0] * .1, .02, z + d[2] * .1], .018, .018, M.BELLY, { group: g }); for (const s of [-1, 1]) m.ell([x + d[0] * s * .11, .025, z + d[2] * s * .11], [.03, .025, .03], M.BELLY, { group: g }); },
  feather(m, x, z, a, k, g) { m.flat([x, .006, z], rotY(X, a), rotY([0, 0, 1], a), .12, .035, (s, t) => (Math.abs(t) < 1 - s * s ? (s > .6 ? M.SHADES : M.HAT2) : undefined), { group: g, bend: 0 }); },
  // a key or two, coins (spilled from a bag)
  keys(m, x, z, a, k, g) { for (let i = 0; i < 2; i++) { m.ell([x + i * .05, .008, z], [.02, .006, .02], M.FLOWER, { group: g }); m.seg([x + i * .05, .008, z], [x + i * .05 + .05, .008, z + .02], .008, .008, M.FLOWER, { group: g }); } for (let i = 0; i < 3; i++) disc(m, [x - .06 + i * .03, .005, z + .07], .015, .004, M.FLOWER, { group: g + 1 }); },
};

/** What spills off each piece (Ed's: invitations over the floor, shoes round the shoe rack; the rest in kind): things and how many. The
 *  invitations desk is Lima's (her redo of it). */
/** @type {Record<string, [string, number][]>} */
export const MESS = {
  // (her Bedroom's kept sparse, low and with no clothes on the floor, Ed 2026-10-26: so nothing on its floor looks like last night's
  // clothes, the pile she picks up by the wardrobe: rules/clothesPile.ts; and the rest lies away from it, render/houseDecor.ts PILE_CLEAR)
  // (nothing round the bed, up in the Turret: Ed, 2026-10-26, "Move the bed to the turret")
  wardrobe: [["hanger", 2]], // (her clothes pile lies by it: only hangers, never clothes or shoes)
  dressingTable: [["makeup", 1], ["ribbon", 1]],
  shoeRack: [["shoe", 5], ["sock", 1]],
  cloakPegs: [["hat", 1], ["ribbon", 1], ["clothes", 1], ["sock", 1]],
  mirror: [["ribbon", 2], ["makeup", 1], ["hat", 1]],
  telephone: [["paper", 3], ["crumple", 3], ["pencil", 1]],
  bags: [["keys", 1], ["crisps", 1], ["paper", 2], ["clothes", 1]],
  pegboard: [["spanner", 2], ["screws", 2], ["rag", 1]],
  broomBay: [["straw", 3], ["rag", 1], ["spanner", 1], ["screws", 1]],
  lathe: [["shavings", 5], ["pencil", 1], ["rag", 1]],
  recordShelf: [["record", 4], ["cable", 1], ["cup", 1]],
  cauldron: [["herbs", 3], ["crisps", 1], ["bottle", 2], ["cup", 1]],
  teaTable: [["cup", 2], ["sugar", 2], ["paper", 1]],
  cardTable: [["cards", 3], ["chips", 2], ["cup", 1]],
  book: [["books", 3], ["paper", 3], ["book", 1]],
  specimens: [["bone", 3], ["feather", 2], ["bottle", 1], ["books", 1]],
  telescope: [["chart", 3], ["paper", 2], ["pencil", 2]],
  mapTable: [["chart", 4], ["pencil", 3], ["paper", 2], ["cup", 1]],
  drumKit: [["stick", 3], ["paper", 2], ["cable", 1], ["cup", 1]],
  synthRack: [["cable", 3], ["paper", 2], ["cup", 1]],
  microphone: [["paper", 4], ["crumple", 2], ["bottle", 1]],
};

/** Where each thing of a piece's spill lies (pure: seeded by its id): round its front and sides, out to `out` metres past its edge, more
 *  in front, the things no nearer than `gap` to each other. In the piece's model space (W, D its real footprint). */
export function messPlace(id, W, D, { out = .55, gap = .2 } = {}) {
  const list = (MESS[id] ?? []).flatMap(([kind, n]) => Array.from({ length: n }, () => kind)), seed = [...id].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7) >>> 0;
  const placed = [];
  list.forEach((kind, i) => {
    for (let t = 0; t < 40; t++) {
      const r = j => hash2(seed % 9973, i * 53 + t * 7 + j, 11), side = r(1);
      // (the front half the time, the sides the rest; never behind)
      let x, z;
      if (side < .55) { x = (r(2) - .5) * (W + out); z = D / 2 + .05 + r(3) * out; }
      else { const s = side < .78 ? -1 : 1; x = s * (W / 2 + .05 + r(2) * out); z = (r(3) - .35) * (D * .9 + out * .5); }
      if (placed.every(p => Math.hypot(p.x - x, p.z - z) > gap)) { placed.push({ kind, x, z, a: r(4) * Math.PI * 2, k: (seed + i * 17) % 997 }); break; }
    }
  });
  return placed;
}

/** The things drawn this much bigger again than the piece (Ed's pick for the house, #1017: "fewer, chunkier things that read at a
 *  glance"): a shoe by the rack a size or two up, so it reads as a shoe from the house's camera. */
export const CHUNK = 1.4;
/** A piece's spill, drawn: its sprite and origin (its footprint's middle on the floor), as art/furniture.js furnitureSprite's, at the
 *  piece's own size and turn; null for a piece with none. foot as furnitureSprite takes it. */
export function messSprite(id, foot, st = {}, { ppm = 32 / 3, pitch = .6, yaw = 0 } = {}) {
  if (!MESS[id]) return null;
  const k = sizeOf(id) * CHUNK, W = foot.w / k, D = foot.d / k, m = new Model({ blend: .02 });
  messPlace(id, W, D).forEach((p, i) => THINGS[p.kind](m, p.x, p.z, p.a, p.k, 1 + i * 4));
  return modelSprite(m, { ppm, pitch, yaw, size: k });
}
export const MESS_THINGS = Object.keys(THINGS);
