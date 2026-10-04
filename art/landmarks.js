// The large scenes' pieces (Ed, 2026-10-04): set-piece-scale scenes with a bigger footprint, every piece
// reclaimed by the forest and seen at night, no brands or readable text:
//   cemetery   headstones (upright, leaning, sunk), stone crosses, an obelisk, a stone angel, a mausoleum,
//              iron railings, a lychgate, a yew, grave lanterns (their candles still flicker: the glow);
//   carpark    the cracked tarmac with faded bays (a ground decal), a ticket machine, a snapped barrier, a
//              car with its bonnet up (with the parked car, the van with a tree through it, trolleys, lampposts);
//   scrap      stacks of crushed cars, oil drums, a grab crane, a corrugated shack (with tyres, chain-link);
//   worship    ruined places of worship, each in its own architecture, a broken shell open to the sky, ruined
//              by time and the forest, never vandalised: a wooden stave church, a stone parish church with a
//              square tower, a baroque church with its dome cracked open, a domed Coptic basilica with a bell
//              tower, a tiered wooden pagoda temple, a stupa, a Greek temple. No religious symbols: their
//              shapes say what they were (an open call for Ed);
//   castle     curtain walls (whole and breached), a round tower, a gatehouse with its portcullis fallen,
//              steps to nowhere, rubble;
//   classical  columns (standing, broken, fallen in drums), a pediment fragment, a mosaic floor (a ground
//              decal), a headless statue, a broken arch.
// The buildings you can fly into come in two halves, "<id>-far" and "<id>-near", each centred on its own
// middle: a scene puts the far half behind and the near half in front, so the witch flies between them.
// Built in 3D (model3d.js) at the witch's scale, like the country pieces (country.js).
import { M, hsv2rgb } from "./core.js";
import { Model, v3, masks } from "./model3d.js";
import { carModel } from "./relics.js";
import { ctHash, ctCell, ctWorn, ctPlank, ctTufts, ctFern, ctIvy, ctCrown, ctBar, ctGlow, ctMoss, ctCyl, mark, place, pieceSprite } from "./country.js";

// stone: courses, cracks, moss on the tops and in patches
const ldStone = (courses = 4, moss = .14) => p => {
  const n = ctCell(p, 8, 7);
  if (n < moss && ctCell(p, 3, 1) < .6) return M.MOSS;
  if (courses && ((p[1] * courses) % 1 < .08 || ((p[0] + p[2]) * courses * .6 + Math.floor(p[1] * courses) * .5) % 1 < .05)) return M.STONED;
  return n > .94 ? M.STONED : undefined;
};
const ldBlock = (m, c, h, g, o = {}) => m.box(c, h, o.mat ?? M.STONE, { round: .025, rough: .01, group: g, paint: ldStone(o.courses ?? 4, o.moss ?? .14), ...o });
const ldRubble = (m, c, n, R, g, seed, mat = M.STONE) => { for (let i = 0; i < n; i++) { const a = ctHash(seed, i) * 6.283, d = R * Math.sqrt(ctHash(i, seed)), s = .08 + ctHash(i, seed + 2) * .12; m.box([c[0] + Math.cos(a) * d, s * .7, c[2] + Math.sin(a) * d * .8], [s * 1.3, s * .7, s], mat, { dir: [Math.cos(a * 3), (ctHash(i, 3) - .5) * .5, Math.sin(a * 3)], round: .02, rough: .008, group: g + (i % 3), paint: ldStone(0, .3) }); } };
// a window or doorway carved through a wall (thickness along `across`): a slot with a round or pointed head
const ldOpening = (m, c, w, h, across, g, { pointed = false, mat = M.STONED } = {}) => {
  m.box(c, across === 0 ? [.6, h, w] : [w, h, .6], mat, { group: g, cut: true, round: .005 });
  m.ell(v3.add(c, [0, h, 0]), across === 0 ? [.6, pointed ? w * 1.8 : w, w] : [w, pointed ? w * 1.8 : w, .6], mat, { group: g, cut: true });
};
// a flat triangle (a gable or a pediment) in stone courses: base on the ground plane of u, apex up v
const ldTriangle = (mat, courses = 6, holes = 0, seed = 0) => (s, t) => { const half = (1 - t) / 2; if (Math.abs(s) > half) return null; if (holes && ctHash(Math.floor((s + 1) * 4), Math.floor((t + 1) * 4) + seed) < holes && t > -.6) return null; return courses && ((t + 1) * courses) % 1 < .1 ? M.STONED : mat; };
const ldDome = (m, c, r, g, mat, o = {}) => { m.ell(c, [r, r * (o.tall ?? 1), r], mat, { group: g, paint: o.paint ?? ldStone(0, .35) }); m.ell(c, [r * .88, r * (o.tall ?? 1) * .88, r * .88], M.STONED, { group: g, cut: true }); m.box(v3.add(c, [0, -r, 0]), [r * 1.1, r, r * 1.1], M.STONED, { group: g, cut: true }); if (o.crack) m.box(v3.add(c, o.crack[0]), o.crack[1], M.STONED, { group: g, cut: true, dir: o.crack[2], round: .02 }); };
const ldColumn = (m, c, h, r, g, { capital = true, mat = M.BELLY } = {}) => {
  m.box(v3.add(c, [0, .06, 0]), [r * 1.35, .06, r * 1.35], mat, { round: .015, group: g, paint: ldStone(0, .3) });
  m.seg(v3.add(c, [0, .1, 0]), v3.add(c, [0, h, 0]), r, r * .85, mat, { group: g, paint: p => Math.abs(Math.sin(Math.atan2(p[2] - c[2], p[0] - c[0]) * 9)) > .9 ? M.STONED : ldStone(0, .2)(p) });
  if (capital) m.box(v3.add(c, [0, h + .06, 0]), [r * 1.4, .07, r * 1.4], mat, { round: .02, group: g, paint: ldStone(0, .4) });
};
const ldYew = (m, c, g, k = 1) => {
  for (let i = 0; i < 4; i++) { const a = i * 1.6; m.chain([[c[0] + Math.cos(a) * .2 * k, 0, c[2] + Math.sin(a) * .2 * k, .2 * k], [c[0] + Math.cos(a) * .1 * k, 1.0 * k, c[2] + Math.sin(a) * .1 * k, .14 * k], [c[0] + Math.cos(a) * .4 * k, 1.8 * k, c[2] + Math.sin(a) * .35 * k, .08 * k]], M.BARK2, { group: g, rough: .015, paint: p => ctCell(p, 12) < .2 ? M.BARKD : undefined }); }
  for (const [dx, dy, dz, r] of [[0, 2.3, 0, 1.1], [-.6, 1.8, .3, .7], [.7, 1.9, -.2, .75], [.1, 3.0, .1, .7], [.5, 1.5, .6, .6]]) m.ell([c[0] + dx * k, dy * k, c[2] + dz * k], [r * k, r * .8 * k, r * k], M.LEAF3, { group: g + 1, rough: .05, paint: p => ctCell(p, 9, 2) < .2 ? M.LEAF : ctCell(p, 15, 3) < .006 ? M.ACCENT : undefined });
};
// a crenellated top along x from x0 to x1 at height y (merlons; `gaps` knocks some out)
const ldMerlons = (m, x0, x1, y, z, th, g, seed, gaps = .25) => { for (let x = x0 + .12, i = 0; x < x1; x += .36, i++) if (ctHash(seed, i) > gaps) ldBlock(m, [x, y + .12, z], [.11, .12, th], g, { courses: 0 }); };

// ---------------- the cemetery ----------------
const headstone = (m, { lean = 0, sunk = 0, yaw = 0, seed = 0 } = {}) => {
  const n = mark(m); const face = p => Math.abs(p[0]) < .18 && p[2] > .04 && ((p[1] - .1) * 14) % 1 < .18 && p[1] > .25 && p[1] < .6 ? M.STONED : ldStone(0, .25)(p);
  m.box([0, .35, 0], [.26, .35, .055], M.STONE, { round: .02, rough: .006, group: 1, paint: face }); m.ell([0, .7, 0], [.26, .13, .055], M.STONE, { group: 1, paint: face });
  place(m, n, { roll: lean, yaw, at: [0, -sunk, 0] }); ctTufts(m, 5, .45, 3, 70 + seed);
};
const LANDMARK_CEMETERY = {
  "headstone": { desc: "a headstone, its carving worn smooth, lichen on its shoulders", build(m) { headstone(m, { lean: .08 }); } },
  "headstone-lean": { desc: "a headstone leaning hard back into the grass", build(m) { headstone(m, { lean: -.38, yaw: .2, seed: 1 }); } },
  "headstone-sunk": { desc: "a headstone sunk to its shoulders and tipped, ivy over it", build(m) { headstone(m, { lean: .3, sunk: .25, yaw: -.3, seed: 2 }); ctIvy(m, [-.3, 0, .1], [.15, .4, .1], 5, 71); } },
  "grave-cross": { desc: "a plain stone cross on a stepped base, lichen-covered", build(m) {
    ldBlock(m, [0, .08, 0], [.3, .08, .2], 1, { courses: 0 }); ldBlock(m, [0, .2, 0], [.2, .05, .13], 1, { courses: 0 });
    const n = mark(m); m.box([0, .7, 0], [.06, .45, .06], M.STONE, { round: .015, group: 2, paint: ldStone(0, .3) }); m.box([0, .92, 0], [.24, .06, .06], M.STONE, { round: .015, group: 2, paint: ldStone(0, .3) }); place(m, n, { roll: .12, at: [0, 0, 0] }); ctTufts(m, 6, .5, 3, 72);
  } },
  "obelisk": { desc: "a tall memorial obelisk on a plinth, cracked, moss up one side", build(m) {
    ldBlock(m, [0, .15, 0], [.32, .15, .32], 1, { courses: 0 }); ldBlock(m, [0, .42, 0], [.22, .12, .22], 1, { courses: 0 });
    m.seg([0, .54, 0], [0, 1.9, 0], .15, .08, M.STONE, { group: 2, paint: p => p[0] < -.05 && ctCell(p, 6) < .5 ? M.MOSS : Math.abs(p[0] * 3 - p[1] + 1.2) < .02 ? M.STONED : undefined }); m.ell([0, 1.92, 0], [.07, .1, .07], M.STONE, { group: 2 }); ctTufts(m, 8, .7, 3, 73);
  } },
  "stone-angel": { desc: "a stone angel on a plinth, head bowed, hands folded, wings mossed over", split: 1.6, build(m) {
    ldBlock(m, [0, .3, 0], [.38, .3, .32], 1, { courses: 2 });
    m.seg([0, .6, 0], [0, 1.55, 0], .3, .15, M.BELLY, { group: 2, rough: .006, paint: p => Math.abs(Math.sin(Math.atan2(p[2], p[0]) * 7 + p[1] * 2)) > .93 ? M.STONED : ctCell(p, 7, 3) < .12 ? M.MOSS : undefined }); // the robe in folds
    m.ell([0, 1.55, 0], [.17, .14, .13], M.BELLY, { group: 2 }); m.ell([.04, 1.78, .03], [.1, .12, .1], M.BELLY, { group: 3, paint: p => p[1] > 1.84 && ctCell(p, 20) < .4 ? M.STONED : undefined }); // shoulders, the bowed head
    m.ell([.03, 1.5, .15], [.07, .1, .06], M.BELLY, { group: 4 }); // folded hands
    for (const s of [-1, 1]) m.flat([-.18, 1.55, s * .2], [-.25, .97, s * .3], [-1, -.1, -s * .1], .55, .3, (a, b) => { const r = masks.wing(M.BELLY, M.STONE)(a, b); return r && ctHash(Math.floor(a * 8), Math.floor(b * 5) + s) < .25 ? M.MOSS : r; }, { group: 5 + (s > 0 ? 1 : 0), bend: .2 }); // the folded wings
    ctIvy(m, [-.38, 0, .3], [-.3, .7, .3], 7, 74); ctTufts(m, 10, 1.0, 8, 75);
  } },
  "mausoleum": { desc: "a family mausoleum: columns, a pediment, its iron door rusted half open, ivy over its roof", split: 2.0, build(m) {
    ldBlock(m, [0, .1, 0], [1.25, .1, 1.0], 1, { courses: 0 }); ldBlock(m, [0, .25, .1], [1.15, .06, .95], 1, { courses: 0 });
    ldBlock(m, [0, 1.0, -.15], [.95, .7, .7], 2, { courses: 5 });
    for (const x of [-.75, -.25, .25, .75]) ldColumn(m, [x, .31, .78], 1.2, .09, 3, { mat: M.STONE });
    ldBlock(m, [0, 1.65, .12], [1.0, .1, .9], 4, { courses: 0 });
    m.flat([0, 2.03, .97], [1, 0, 0], [0, 1, 0], 1.0, .3, ldTriangle(M.STONE, 3), { group: 5, bend: .02 });
    for (const s of [-1, 1]) m.box([0, 1.95, .1 + s * .48], [1.02, .03, .52], M.STONE, { dir: [1, 0, 0], up: [0, 1, s * .55], round: .01, group: 6 + (s > 0 ? 1 : 0), paint: p => ctCell(p, 4, s + 3) < .55 ? M.LEAF : ldStone(0, .3)(p) });
    m.box([0, .85, .56], [.3, .55, .03], M.NOSE, { group: 8 }); m.box([.32, .85, .72], [.02, .5, .27], M.JACKET, { dir: [.5, 0, 1], round: .01, group: 9, paint: p => ((p[1] * 10) % 1) < .15 ? M.BODY2 : ctWorn(.5, .1)(p) }); // the doorway and its door
    ctIvy(m, [-.95, .3, .55], [-.8, 1.9, .6], 10, 76); ctIvy(m, [.95, .3, -.2], [.6, 2.0, .2], 11, 77); ctTufts(m, 12, 1.6, 12, 78);
  } },
  "iron-railing": { desc: "a run of spear-topped iron railing round an old plot, bent at one end", build(m) {
    for (const y of [.15, .75]) ctBar(m, [-1.0, y, 0], [1.0, y, 0], 1, .018, M.JACKET);
    for (let i = 0; i <= 12; i++) { const x = -1.0 + i / 12 * 2, bend = x > .55 ? (x - .55) * .9 : 0; ctBar(m, [x, 0, 0], [x + bend * .3, .95 - bend * .3, bend], 2, .014, M.JACKET); m.seg([x + bend * .3, .95 - bend * .3, bend], [x + bend * .35, 1.02 - bend * .3, bend * 1.05], .03, .002, M.JACKET, { group: 3 }); }
    ctIvy(m, [-.9, 0, .05], [-.3, .8, .05], 4, 79); ctTufts(m, 10, 1.1, 5, 80);
  } },
  "lychgate": { desc: "a lychgate: a little roofed gateway of oak, its shingles mossed, one gate leaf open", split: 1.8, build(m) {
    for (const x of [-.75, .75]) for (const z of [-.55, .55]) m.box([x, .85, z], [.07, .85, .07], M.WOOD, { round: .02, group: 1, paint: ctPlank(7, .3) });
    for (const z of [-.55, .55]) m.box([0, 1.72, z], [.9, .06, .06], M.WOOD, { round: .02, group: 2, paint: ctPlank() });
    for (const s of [-1, 1]) m.box([0, 2.05, s * .42], [1.05, .04, .5], M.BARK2, { dir: [1, 0, 0], up: [0, 1, s * .9], round: .015, group: 3 + (s > 0 ? 1 : 0), paint: p => ctCell(p, 5, s + 4) < .5 ? M.MOSS : ((p[0] + 3) * 8) % 1 < .12 ? M.BARKD : undefined });
    for (const x of [-1.05, 1.05]) m.flat([x * .97, 2.0, 0], [0, 0, 1], [0, 1, 0], .6, .35, ldTriangle(M.WOOD, 0), { group: 5, bend: .02 });
    const n = mark(m); for (let i = 0; i < 4; i++) m.box([.32, .25 + i * .22, 0], [.32, .025, .02], M.WOOD, { round: .01, group: 6, paint: ctPlank() }); for (const x of [.02, .62]) m.box([x, .55, 0], [.03, .38, .02], M.WOOD, { round: .01, group: 6 }); place(m, n, { yaw: -1.0, at: [-.68, 0, 0] });
    for (const x of [-.75, .75]) ldBlock(m, [x * .5 + (x > 0 ? .2 : 0), .2, .62], [.1, .2, .1], 7, { courses: 0 });
    ctTufts(m, 12, 1.4, 8, 81);
  } },
  "yew": { desc: "an old churchyard yew, its red trunk fluted and split, its crown nearly black", split: 1.3, build(m) { ldYew(m, [0, 0, 0], 1, 1.1); ctTufts(m, 8, 1.2, 4, 82); } },
  "grave-lantern": { desc: "a little lantern on a grave, its candle somehow still flickering", glow: true, build(m) {
    ldBlock(m, [0, .06, 0], [.2, .06, .14], 1, { courses: 0 });
    for (const [x, z] of [[-.07, -.07], [.07, -.07], [-.07, .07], [.07, .07]]) ctBar(m, [x, .12, z], [x, .4, z], 2, .008, M.JACKET);
    m.seg([0, .4, 0], [0, .5, 0], .1, .02, M.JACKET, { group: 2 }); m.seg([0, .13, 0], [0, .2, 0], .025, .025, M.BELLY, { group: 3 }); m.ell([0, .23, 0], [.015, .035, .015], M.GLOW, { group: 4 }); ctGlow(m, [0, .24, 0], .05, 5, M.MAGIC2);
    ctTufts(m, 5, .4, 6, 83);
  } },
};

// ---------------- the car park ----------------
const LANDMARK_CARPARK = {
  "carpark-tarmac": { desc: "a car park's cracked tarmac, its bay lines faded, grass and saplings up through the cracks", decal: true, build(m) {
    const L = 5.6, W = 3.6;
    m.box([0, .015, 0], [L, .015, W], M.JACKET, { round: .01, group: 1, paint: p => {
      const x = p[0], z = p[2], crack = Math.abs(Math.sin(x * 1.1 + 1) * .9 + Math.sin(x * 3.7) * .15 - z * .5) < .025 || Math.abs(Math.sin(z * 1.4) * .7 - x * .4 + 1.5) < .025;
      if (ctCell(p, 2.2, 4) < .08 || crack) return ctCell(p, 16) < .5 ? M.LEAF2 : M.NOSE;
      if (ctCell(p, 1.4, 8) < .06) return ctCell(p, 10) < .5 ? M.MOSS : M.LEAF2; // patches gone to grass
      const bay = Math.abs(z) > 1.0 && Math.abs(z) < 3.3 && Math.abs(((x + 30) % 1.25) - .625) > .6 || ((Math.abs(Math.abs(z) - 1.0) < .04) && Math.abs(x) < 5.2);
      if (bay) return ctCell(p, 9, 2) < .35 ? M.JACKET : M.CLOTH;
      return ctCell(p, 20, 1) > .93 ? M.NOSE : ctCell(p, 20, 2) > .95 ? M.STONED : undefined; } });
    for (let i = 0; i < 12; i++) { const x = (ctHash(i, 40) - .5) * 2 * L * .9, z = (ctHash(40, i) - .5) * 2 * W * .9; m.ell([x, .06, z], [.09, .06 + ctHash(i) * .05, .09], M.LEAF2, { group: 2 + (i % 3), paint: p => p[1] > .08 ? M.LEAF : undefined }); }
  } },
  "ticket-machine": { desc: "a pay-and-display machine on its plinth, its screen dark and blank, a fern at its foot", build(m) {
    ldBlock(m, [0, .06, 0], [.25, .06, .2], 1, { courses: 0 });
    m.box([0, .7, 0], [.2, .58, .15], M.FRAME, { round: .04, group: 2, paint: p => p[2] > .12 && Math.abs(p[0]) < .12 && Math.abs(p[1] - 1.0) < .08 ? M.SHADES : p[2] > .12 && Math.abs(p[0] - .08) < .03 && Math.abs(p[1] - .8) < .05 ? M.NOSE : ctWorn(.35, .15)(p) });
    m.box([0, 1.3, -.02], [.24, .04, .19], M.FRAME, { round: .02, group: 3, paint: ctWorn(.4, .4) }); ctFern(m, [-.2, .05, .25], 4, .7); ctTufts(m, 6, .6, 5, 84);
  } },
  "barrier": { desc: "a car park barrier, its striped arm snapped and drooping to the ground", build(m) {
    m.box([0, .55, 0], [.16, .55, .16], M.BELLY, { round: .04, group: 1, paint: ctWorn(.3, .2) });
    const stripe = p => (Math.floor((p[0] + p[1] + 9) * 3) % 2) ? M.ACCENT : ctCell(p, 12) < .15 ? M.BODY2 : M.BELLY;
    m.seg([.15, 1.0, 0], [1.4, 1.02, 0], .045, .04, M.BELLY, { group: 2, paint: stripe }); m.seg([1.45, .98, .02], [2.4, .05, .1], .04, .035, M.BELLY, { group: 3, paint: stripe }); // snapped, the end in the grass
    m.box([-.35, 1.0, 0], [.18, .08, .08], M.FRAME, { round: .03, group: 4, paint: ctWorn(.5, 0) }); ctTufts(m, 10, 1.4, 5, 85);
  } },
  "car-bonnet-up": { desc: "a car left with its bonnet up, a bramble growing out of the engine", build(m) {
    carModel(m, 1, { flat: true }); const n = mark(m); m.box([0, 0, 0], [.48, .03, .62], M.BODY, { round: .03, group: 4, paint: ctWorn(.4, .2) }); place(m, n, { pitch: 1.0, at: [1.05, 1.18, 0] });
    for (let i = 0; i < 6; i++) m.chain([[1.0, .7, (i - 2.5) * .15, .03], [1.2 + ctHash(i) * .4, 1.1 + ctHash(i, 2) * .4, (i - 2.5) * .22, .025], [1.5 + ctHash(i, 3) * .5, .4 + ctHash(i, 4) * .5, (i - 2.5) * .3, .015]], M.LEAF2, { group: 5 + (i % 2), paint: p => ctCell(p, 25) < .2 ? M.LEAF3 : undefined });
    ctMoss(m, [0, 0, 0], [1.9, .14, 1.0], 7); ctTufts(m, 12, 2.0, 8, 86);
  } },
};

// ---------------- the scrap yard ----------------
const LANDMARK_SCRAP = {
  "crushed-cars": { desc: "crushed cars stacked four high, their colours faded under rust, moss on the top one", split: 1.6, build(m) {
    [[M.BODY, 0, .03], [M.HAT1, .06, -.04], [M.HAT2, -.05, .05], [M.BELLY, .1, -.02]].forEach(([mat, dx, yaw], i) => m.box([dx, .2 + i * .38, 0], [.95, .18, .48], mat, { dir: [1, (ctHash(i) - .5) * .06, yaw], round: .05, rough: .025, group: 1 + i, paint: p => { const w = ctWorn(.55, i === 3 ? .4 : .05)(p); if (w) return w; return Math.abs(p[1] - .2 - i * .38) < .05 && Math.abs(p[0]) < .5 ? M.SHADES : ctCell(p, 9, i) < .1 ? M.BODY3 : undefined; } }));
    ctTufts(m, 10, 1.4, 6, 87);
  } },
  "oil-drums": { desc: "oil drums, rust-eaten, one tipped and spilling dark into the grass", build(m) {
    [[0, -.2, M.HAT1], [.42, -.05, M.BODY], [-.1, .25, M.HAT2]].forEach(([x, z, mat], i) => ctCyl(m, [x, 0, z], [x, .58, z], .19, mat, 1 + i, { paint: p => Math.abs(p[1] - .2) < .02 || Math.abs(p[1] - .4) < .02 ? M.BODY3 : ctWorn(.6, .15)(p), end: M.BODY3 }));
    const n = mark(m); ctCyl(m, [0, 0, 0], [0, .58, 0], .19, M.POM, 5, { paint: ctWorn(.6, .1), end: M.BODY3 }); place(m, n, { roll: 1.55, yaw: .7, at: [-.6, .19, -.1] });
    m.ell([-.5, .01, .45], [.35, .01, .25], M.NOSE, { group: 7 }); ctTufts(m, 8, 1.1, 8, 88);
  } },
  "grab-crane": { desc: "a scrap yard's grab crane on its tracks, its arm still raised, the grab hanging open over nothing", split: 2.4, build(m) {
    for (const z of [-.5, .5]) m.box([0, .2, z], [.9, .2, .18], M.BODY3, { round: .12, group: 1, paint: p => ((p[0] + 5) * 8) % 1 < .25 ? M.NOSE : ctCell(p, 6, 2) < .15 ? M.MOSS : undefined });
    m.box([0, .55, 0], [.65, .15, .55], M.POM, { round: .05, group: 2, paint: ctWorn(.6, .2) });
    m.box([-.15, 1.05, .1], [.38, .38, .3], M.POM, { round: .05, group: 3, paint: p => p[2] > .35 && p[1] > 1.05 ? M.SHADES : p[0] > .2 && p[1] > 1.05 ? M.SHADES : ctWorn(.6, .2)(p) }); // the cab, glass gone
    m.box([-.6, .85, -.1], [.3, .25, .4], M.POM, { round: .04, group: 4, paint: ctWorn(.6, .2) });
    const a = [.3, .8, -.15], b = [2.0, 3.9, -.15], c = [3.0, 3.5, -.15];
    for (const dz of [-.08, .08]) { ctBar(m, v3.add(a, [0, 0, dz]), v3.add(b, [0, 0, dz]), 5, .05, M.POM, ctWorn(.6, .05)); ctBar(m, v3.add(b, [0, 0, dz]), v3.add(c, [0, 0, dz]), 6, .04, M.POM, ctWorn(.6, .05)); }
    for (let i = 1; i < 8; i++) ctBar(m, v3.lerp(a, b, i / 8), v3.lerp(a, b, (i + .5) / 8), 5, .02, M.POM, ctWorn(.6, 0)); // the bracing
    ctBar(m, [.3, .9, -.15], [1.2, 2.4, -.15], 7, .045, M.FRAME, ctWorn(.3, 0)); // the ram
    ctBar(m, c, [3.0, 2.0, -.15], 8, .012, M.JACKET); for (let k = 0; k < 4; k++) { const an = k / 4 * 6.283; m.chain([[3.0, 2.0, -.15, .04], [3.0 + Math.cos(an) * .3, 1.75, -.15 + Math.sin(an) * .3, .035], [3.0 + Math.cos(an) * .22, 1.45, -.15 + Math.sin(an) * .22, .02]], M.FRAME, { group: 9, paint: ctWorn(.6, 0) }); }
    ctIvy(m, [.3, .6, .3], [1.0, 2.0, -.07], 10, 89); ctTufts(m, 14, 2.0, 11, 90);
  } },
  "shack": { desc: "a corrugated iron shack, its roof sagging, its door off, a stovepipe leaning", split: 1.8, build(m) {
    const corr = p => { const w = ctWorn(.3, .06)(p); if (w) return w; return Math.abs(Math.sin((p[0] + p[2]) * 40)) > .8 ? M.STONED : undefined; };
    m.box([0, .8, 0], [1.0, .8, .7], M.FRAME, { round: .02, group: 1, paint: p => p[2] > .65 && Math.abs(p[0] - .45) < .25 && p[1] < 1.3 ? M.NOSE : p[2] > .65 && Math.abs(p[0] + .45) < .2 && Math.abs(p[1] - 1.0) < .18 ? M.SHADES : corr(p) });
    m.box([0, 1.72, 0], [1.15, .03, .85], M.FRAME, { dir: [1, 0, 0], up: [.1, 1, .25], round: .01, group: 2, paint: p => ctCell(p, 5, 4) < .4 ? M.MOSS : corr(p) });
    m.box([.95, .45, .9], [.02, .45, .26], M.FRAME, { dir: [0, 0, 1], up: [.5, 1, 0], round: .01, group: 3, paint: corr }); // the door, off and leant
    ctBar(m, [-.7, 1.6, -.3], [-.8, 2.5, -.35], 4, .05, M.BODY3); ctIvy(m, [-1.0, 0, .7], [-.8, 1.6, .7], 5, 91); ctTufts(m, 14, 1.8, 6, 92);
  } },
};

// ---------------- places of worship: broken shells open to the sky ----------------
const WORSHIP = {
  "stave-church": { desc: "a wooden stave church: tiers of steep shingled roofs, carved finials, tarred plank walls; its nave roof fallen in and open to the sky, its spire still standing", halves: 1.0, split: 2.4, build(m) {
    const tar = p => ctCell(p, 5, 6) < .15 && p[1] < 1.2 ? M.MOSS : Math.abs(Math.sin(p[0] * 22 + p[2] * 22)) > .9 ? M.NOSE : ctCell(p, 14) > .9 ? M.WOOD : undefined;
    ldBlock(m, [0, .08, 0], [1.9, .08, 1.3], 1, { courses: 0, moss: .4 });
    for (const z of [-1.1, 1.1]) m.box([0, z > 0 ? .7 : 1.0, z], [1.6, z > 0 ? .55 : .85, .07], M.BARKD, { round: .02, group: 2 + (z > 0 ? 1 : 0), paint: tar }); // the near wall broken down
    for (const x of [-1.6, 1.6]) m.box([x, 1.0, 0], [.07, .85, 1.1], M.BARKD, { round: .02, group: 4, paint: tar });
    m.box([1.6, .55, .1], [.3, .5, .25], M.NOSE, { group: 4, cut: true }); // the west door
    m.box([0, 2.12, -.62], [1.7, .04, .7], M.BARKD, { dir: [1, 0, 0], up: [0, 1, -.95], round: .01, group: 5, paint: p => ctHash(Math.floor((p[0] + 3) * 2.5), 9) < .35 ? M.MOSS : ((p[0] + 3) * 10) % 1 < .15 ? M.NOSE : undefined }); // the far roof slope, holed
    for (let i = 0; i < 5; i++) { const x = -1.4 + i * .7; ctBar(m, [x, 1.85, 1.1], [x, 2.6, 0], 6, .035, M.BARKD, undefined); } // the near slope's bare rafters
    m.box([0, 2.6, 0], [1.8, .04, .04], M.BARKD, { round: .02, group: 6 });
    for (const x of [-1.6, 1.6]) m.flat([x, 2.18, 0], [0, 0, 1], [0, 1, 0], 1.15, .45, ldTriangle(M.BARKD, 0, .2, x > 0 ? 1 : 2), { group: 7, bend: .02 });
    for (const x of [-1.75, 1.75]) m.chain([[x, 2.6, 0, .04], [x * 1.08, 2.95, 0, .03], [x * 1.04, 3.15, 0, .02]], M.BARKD, { group: 8 }); // the finials
    m.box([0, 2.95, 0], [.55, .35, .55], M.BARKD, { round: .02, group: 9, paint: tar }); // the bell tower on the ridge
    for (const s of [-1, 1]) m.box([0, 3.45, s * .35], [.65, .03, .42], M.BARKD, { dir: [1, 0, 0], up: [0, 1, s * 1.1], round: .01, group: 10 + (s > 0 ? 1 : 0), paint: p => ((p[0] + 3) * 12) % 1 < .15 ? M.NOSE : ctCell(p, 6, 3) < .2 ? M.MOSS : undefined });
    m.box([0, 3.75, 0], [.3, .2, .3], M.BARKD, { round: .02, group: 12 }); m.seg([0, 3.9, 0], [0, 5.2, 0], .3, .02, M.BARKD, { group: 13, paint: p => ((p[1] * 12) % 1) < .2 ? M.NOSE : undefined }); // the spire
    for (let i = 0; i < 4; i++) m.box([-.8 + i * .5, .12, 1.55 + ctHash(i) * .3], [.3, .03, .06], M.BARKD, { dir: [1, 0, ctHash(i, 2) - .5], round: .01, group: 14 + (i % 2) }); // fallen planks
    ctIvy(m, [-1.6, .2, 1.15], [-1.0, 1.5, 1.15], 16, 93); ctFern(m, [.5, .16, .2], 17, 1.2); ctTufts(m, 18, 2.6, 18, 94);
  } },
  "parish-church": { desc: "a stone parish church: a roofless nave with empty pointed windows, its gables still standing, a square tower with broken battlements", halves: 1.0, split: 2.6, build(m) {
    const L = 2.0, W = .95, H = 1.9;
    ldBlock(m, [0, H / 2, -W], [L, H / 2, .14], 1, { courses: 6 });
    for (const [x0, x1, h] of [[-L, -.4, H], [-.4, .5, .9], [.5, L, 1.5]]) ldBlock(m, [(x0 + x1) / 2, h / 2, W], [(x1 - x0) / 2, h / 2, .14], 2, { courses: 6 }); // the near wall, part fallen
    for (const x of [-1.3, .2, 1.3]) { ldOpening(m, [x, 1.15, -W], .17, .35, 2, 1, { pointed: true }); if (x !== .2) ldOpening(m, [x, x > 1 ? .95 : 1.15, W], .17, x > 1 ? .2 : .35, 2, 2, { pointed: true }); }
    ldBlock(m, [L, H / 2, 0], [.14, H / 2, W + .14], 3, { courses: 6 }); ldOpening(m, [L, 1.3, 0], .25, .45, 0, 3, { pointed: true }); // the east end, its big window
    m.flat([L + .12, H + .55, 0], [0, 0, 1], [0, 1, 0], W + .14, .55, ldTriangle(M.STONE, 5), { group: 4, bend: .02 });
    const T = -L - .55; ldBlock(m, [T, 2.2, 0], [.6, 2.2, .6], 5, { courses: 9 }); // the tower
    for (const z of [-.6, .6]) for (const x of [T - .6, T + .6]) ldBlock(m, [x, 1.0, z], [.1, 1.0, .1], 5, { courses: 0 }); // buttresses
    ldOpening(m, [T, 3.6, .6], .14, .25, 2, 5, { pointed: true }); ldOpening(m, [T + .6, 3.6, 0], .14, .25, 0, 5, { pointed: true }); ldOpening(m, [T, .55, .6], .22, .4, 2, 5, { pointed: true });
    ldMerlons(m, T - .55, T + .6, 4.4, .55, .07, 6, 1, .35); ldMerlons(m, T - .55, T + .6, 4.4, -.55, .07, 6, 2, .2);
    for (let i = 0; i < 3; i++) ctBar(m, [-1.2 + i * 1.0, .1, -.5 + i * .3], [-.6 + i * .9, .9, .2], 7, .05, M.BARK2, undefined); // fallen roof beams
    ldRubble(m, [0, 0, W + .3], 12, .8, 8, 95); ctIvy(m, [L, .1, W + .15], [L - .2, 1.6, W + .15], 11, 96); ctIvy(m, [T + .6, .1, .6], [T + .5, 3.2, .62], 12, 97); ctTufts(m, 18, 2.8, 13, 98);
  } },
  "baroque-church": { desc: "a baroque church: a pale curving facade with scrolls and a broken pediment, pilasters, and behind it a great dome cracked open to the sky", halves: 1.1, split: 2.8, build(m) {
    const pale = (c = 4) => p => { const w = ldStone(c, .1)(p); if (w) return w; return ctCell(p, 4, 3) < .07 ? M.STRAW : undefined; };
    for (const z of [-1.4, 1.4]) m.box([0, 1.1, z * .85], [1.3, 1.1, .14], M.BELLY, { round: .03, group: 1, paint: pale() }); m.box([-1.3, 1.1, 0], [.14, 1.1, 1.2], M.BELLY, { round: .03, group: 1, paint: pale() });
    ldOpening(m, [0, 1.0, -1.19], .2, .45, 2, 1); ldOpening(m, [-1.3, 1.0, 0], .2, .45, 0, 1);
    ctCyl(m, [0, 2.2, 0], [0, 2.75, 0], 1.0, M.BELLY, 2, { paint: p => ((Math.atan2(p[2], p[0]) * 8 / 6.283) % 1 + 1) % 1 < .08 ? M.STONED : pale(0)(p) }); m.seg([0, 2.1, 0], [0, 2.85, 0], .88, .88, M.STONED, { group: 2, cut: true }); // the drum, hollow
    ldDome(m, [0, 2.75, 0], 1.02, 3, M.STONE, { tall: .95, crack: [[.55, .6, .55], [.55, .7, .45], [1, .3, 1]], paint: p => ((Math.atan2(p[2], p[0]) * 12 / 6.283) % 1 + 1) % 1 < .07 ? M.BELLY : ctCell(p, 5, 6) < .2 ? M.MOSS : undefined });
    const F = 1.35; // the facade, towards the viewer
    m.box([0, 1.25, F], [1.45, 1.25, .16], M.BELLY, { round: .03, group: 4, paint: pale(5) }); ldOpening(m, [0, .6, F], .3, .6, 2, 4); ldOpening(m, [-.85, 1.45, F], .14, .26, 2, 4); ldOpening(m, [.85, 1.45, F], .14, .26, 2, 4);
    for (const x of [-1.35, -.55, .55, 1.35]) m.box([x, 1.25, F + .17], [.07, 1.2, .04], M.BELLY, { round: .02, group: 5, paint: pale(0) }); // pilasters
    m.box([0, 2.6, F], [.75, .3, .15], M.BELLY, { round: .03, group: 6, paint: pale(0) }); for (const s of [-1, 1]) m.ell([s * .95, 2.45, F], [.28, .22, .1], M.BELLY, { group: 7, paint: p => Math.abs(Math.hypot(p[0] - s * .95, p[1] - 2.45) - .14) < .03 ? M.STONED : pale(0)(p) }); // scrolls
    m.flat([-.3, 3.08, F + .02], [1, 0, 0], [0, 1, 0], .75, .2, ldTriangle(M.BELLY, 0, .45, 3), { group: 8, bend: .02 }); // the broken pediment
    m.ell([1.7, .2, 1.0], [.25, .18, .25], M.STONE, { group: 9, paint: ldStone(0, .4) }); m.seg([1.6, .2, .7], [2.1, .25, 1.4], .1, .06, M.STONE, { group: 9 }); // the fallen lantern
    ldRubble(m, [.6, 0, .3], 10, .7, 10, 99); ctIvy(m, [-1.45, .1, F + .2], [-1.2, 2.2, F + .2], 13, 100); ctIvy(m, [1.3, 2.2, -.5], [.6, 3.5, -.2], 14, 101); ctTufts(m, 18, 2.8, 15, 102);
  } },
  "coptic-basilica": { desc: "a domed Coptic basilica: whitewashed walls, a row of small domes, a rounded apse, a square bell tower with arched openings; one dome fallen in", halves: .9, split: 2.6, build(m) {
    const lime = (c = 0) => p => { const w = ldStone(c, .08)(p); if (w) return w; return ctCell(p, 3, 5) < .07 ? M.STRAW : undefined; };
    for (const z of [-1.0, 1.0]) m.box([0, z > 0 ? .7 : .9, z], [1.8, z > 0 ? .7 : .9, .13], M.BELLY, { round: .03, group: 1 + (z > 0 ? 1 : 0), paint: lime() });
    for (const x of [-1.0, 0, 1.0]) { ldOpening(m, [x, 1.1, -1.0], .14, .2, 2, 1); if (x) ldOpening(m, [x, .9, 1.0], .14, .2, 2, 2); }
    m.box([1.8, .9, 0], [.13, .9, 1.0], M.BELLY, { round: .03, group: 3, paint: lime() }); ldOpening(m, [1.8, .55, 0], .25, .35, 0, 3);
    m.seg([-1.8, 0, 0], [-1.8, 1.6, 0], .95, .95, M.BELLY, { group: 4, paint: lime() }); m.box([-1.2, .8, 0], [.6, 1.0, 1.2], M.BELLY, { group: 4, cut: true }); m.seg([-1.8, .1, 0], [-1.8, 1.7, 0], .82, .82, M.STONED, { group: 4, cut: true }); ldDome(m, [-1.8, 1.65, 0], .95, 5, M.BELLY, { paint: lime() }); m.box([-1.3, 1.6, 0], [.5, 1.2, 1.2], M.STONED, { group: 5, cut: true }); // the apse and its half dome
    for (const [x, fallen] of [[-.9, 0], [0, 1], [.9, 0]]) { if (fallen) { ldRubble(m, [x, 0, 0], 8, .5, 6, 103); continue; } ctCyl(m, [x, 1.8, -.2], [x, 2.1, -.2], .45, M.BELLY, 7 + Math.round(x), { paint: lime() }); ldDome(m, [x, 2.1, -.2], .45, 10 + Math.round(x), M.BELLY, { paint: lime() }); }
    const B = [2.5, 0, -.7]; ldBlock(m, v3.add(B, [0, 1.7, 0]), [.4, 1.7, .4], 13, { mat: M.BELLY, courses: 0, paint: lime(0) });
    for (const [dx, dz, ax] of [[0, .4, 2], [.4, 0, 0]]) for (const y of [2.6, 3.05]) ldOpening(m, v3.add(B, [dx, y, dz]), .1, .16, ax, 13);
    ldDome(m, v3.add(B, [0, 3.4, 0]), .38, 14, M.BELLY, { paint: lime() }); m.seg(v3.add(B, [0, 3.75, 0]), v3.add(B, [0, 3.95, 0]), .04, .02, M.STONE, { group: 14 });
    ctIvy(m, [1.8, .1, 1.05], [1.4, 1.3, 1.05], 15, 104); ctIvy(m, v3.add(B, [-.4, .1, .4]), v3.add(B, [-.3, 2.2, .42]), 16, 105); ctTufts(m, 18, 2.8, 17, 106);
  } },
  "pagoda-temple": { desc: "a tiered wooden temple on a stone plinth: three roofs with upturned eaves, red-lacquered posts faded to brown; its top tier leaning and its spire fallen beside it", split: 2.2, build(m) {
    ldBlock(m, [0, .12, 0], [1.4, .12, 1.2], 1, { courses: 0, moss: .35 }); for (let i = 0; i < 3; i++) ldBlock(m, [0, .04 + i * .08, 1.25 + (2 - i) * .12], [.5, .04 + i * .04, .1], 1, { courses: 0 });
    const tier = (y, w, h, g) => {
      for (const x of [-w, w]) for (const z of [-w * .85, w * .85]) m.seg([x, y, z], [x, y + h, z], .06, .06, M.ACCENT, { group: g, paint: p => ctCell(p, 10) < .3 ? M.BARK2 : undefined });
      m.box([0, y + h * .5, -w * .8], [w * .95, h * .5, .04], M.WOOD, { round: .01, group: g, paint: ctPlank(7, .2) });
      const tiles = p => Math.abs(Math.sin(Math.atan2(p[2], p[0]) * 18)) > .85 ? M.NOSE : ctCell(p, 4, g) < .22 ? M.MOSS : undefined, e = w + .5;
      m.ell([0, y + h + .06, 0], [e * 1.05, .06, e * 1.05], M.JACKET, { group: g + 1, paint: tiles }); m.ell([0, y + h + .08, 0], [e * .78, .34, e * .78], M.JACKET, { group: g + 1, paint: tiles }); m.box([0, y + h - .3, 0], [e * 1.2, .36, e * 1.2], M.NOSE, { group: g + 1, cut: true }); m.ell([0, y + h + .06, 0], [e * 1.05, .05, e * 1.05], M.JACKET, { group: g + 3, paint: tiles }); // a low roof over flared eaves
      for (const x of [-1, 1]) for (const z of [-1, 1]) m.seg([x * e * .6, y + h + .08, z * e * .6], [x * e * .85, y + h + .24, z * e * .85], .05, .015, M.JACKET, { group: g + 2 }); // the upturned eaves
    };
    tier(.24, .95, 1.0, 2); tier(1.85, .65, .65, 6);
    const n = mark(m); tier(0, .5, .45, 14); place(m, n, { roll: .14, at: [.1, 3.08, 0] }); // the top tier, leaning
    const n2 = mark(m); m.seg([0, 0, 0], [0, 1.0, 0], .06, .02, M.FRAME, { group: 18, paint: ctWorn(.6, 0) }); for (let i = 0; i < 4; i++) m.ell([0, .25 + i * .18, 0], [.12 - i * .02, .025, .12 - i * .02], M.FRAME, { group: 18, paint: ctWorn(.6, 0) }); place(m, n2, { roll: 1.45, yaw: .5, at: [1.8, .1, 1.1] }); // its spire, fallen
    ctIvy(m, [-.95, .25, .8], [-.8, 1.5, .85], 19, 107); ctTufts(m, 16, 2.4, 20, 108);
  } },
  "stupa": { desc: "a stupa: a great domed mound on square terraces, its spire of rings broken, a tree rooted in its dome", split: 2.4, build(m) {
    ldBlock(m, [0, .15, 0], [1.6, .15, 1.6], 1, { courses: 0, moss: .35 }); ldBlock(m, [0, .42, 0], [1.3, .12, 1.3], 1, { courses: 0, moss: .35 });
    ctCyl(m, [0, .54, 0], [0, .8, 0], 1.1, M.BELLY, 2, { paint: ldStone(0, .3) });
    m.ell([0, .8, 0], [1.05, 1.0, 1.05], M.BELLY, { group: 3, paint: p => ctCell(p, 9, 2) < .16 ? M.MOSS : ctCell(p, 14, 5) < .06 ? M.STONED : undefined }); m.box([0, .3, 0], [1.2, .5, 1.2], M.BELLY, { group: 3, cut: true });
    ldBlock(m, [0, 1.92, 0], [.22, .14, .22], 4, { mat: M.BELLY, courses: 0 });
    for (let i = 0; i < 4; i++) ctCyl(m, [0, 2.06 + i * .17, 0], [0, 2.12 + i * .17, 0], .2 - i * .035, M.STONE, 5, { paint: ldStone(0, .3) }); m.seg([0, 2.06, 0], [0, 2.7, 0], .04, .03, M.STONE, { group: 5 });
    for (let i = 0; i < 3; i++) ctCyl(m, [1.6 + i * .25, .05, .9 - i * .3], [1.6 + i * .25, .11, .9 - i * .3], .14 - i * .02, M.STONE, 6 + i); // fallen rings
    m.chain([[-.55, 1.4, .5, .07], [-.75, 2.0, .6, .05], [-.8, 2.4, .5, .03]], M.TRUNK, { group: 9, rough: .01 }); ctCrown(m, [-.8, 2.5, .5], [.45, .32, .4], 10); m.chain([[-.55, 1.4, .5, .04], [-.3, .9, .9, .03], [-.1, .6, 1.1, .02]], M.TRUNK, { group: 9 }); // a tree rooted in the dome
    ctTufts(m, 18, 2.6, 11, 109);
  } },
  "greek-temple": { desc: "a Greek temple: a stepped base, a peristyle of fluted columns, some fallen in drums, a broken architrave and the corner of a pediment", halves: .9, split: 2.4, build(m) {
    for (let i = 0; i < 3; i++) ldBlock(m, [0, .06 + i * .12, 0], [2.4 - i * .12, .06, 1.4 - i * .12], 1, { mat: M.BELLY, courses: 0, moss: .25 });
    const top = .36, H = 1.9, cols = [];
    for (let i = 0; i < 7; i++) for (const z of [-1.05, 1.05]) cols.push([-1.95 + i * .65, z]); for (const x of [-1.95, 1.95]) for (const z of [-.35, .35]) cols.push([x, z]);
    cols.forEach(([x, z], i) => { const h = ctHash(i, 11), fallen = h < .22, broken = h > .8; if (fallen) return; ldColumn(m, [x, top, z], broken ? H * (.35 + ctHash(i, 12) * .3) : H, .15, 2 + (z > 0 ? 1 : 0), { capital: !broken }); });
    ldBlock(m, [-1.3, top + H + .2, -1.05], [.85, .12, .17], 4, { mat: M.BELLY, courses: 0 }); ldBlock(m, [-1.95, top + H + .2, 0], [.17, .12, 1.0], 4, { mat: M.BELLY, courses: 0 });
    m.flat([-2.05, top + H + .65, -.25], [0, 0, 1], [0, 1, 0], .85, .33, (s, t) => s > .3 - t * .2 ? null : ldTriangle(M.BELLY, 0)(s, t), { group: 5, bend: .02 }); // the pediment's corner
    ldBlock(m, [.2, .65, -.3], [.6, .3, .1], 6, { mat: M.BELLY, courses: 3 }); // the cella's low wall
    for (let k = 0; k < 4; k++) m.seg([.3 + k * .38, .55, 1.6 + k * .05], [.3 + k * .38 + .3, .55, 1.62 + k * .05], .15, .15, M.BELLY, { group: 7 + (k % 2), paint: ldStone(0, .3) }); // fallen drums
    ctIvy(m, [-1.95, top, 1.2], [-1.9, 1.8, 1.2], 9, 110); ctTufts(m, 18, 2.8, 10, 111);
  } },
};

// ---------------- castle ruins ----------------
const LANDMARK_CASTLE = {
  "curtain-wall": { desc: "a stretch of curtain wall, its battlements gapped, arrow slits, ivy up its face", split: 2.2, build(m) {
    ldBlock(m, [0, 1.25, 0], [1.7, 1.25, .3], 1, { courses: 8 }); ldMerlons(m, -1.7, 1.7, 2.5, 0, .3, 2, 3);
    for (const x of [-.9, .2, 1.1]) m.box([x, 1.3, .3], [.04, .25, .4], M.NOSE, { group: 1, cut: true });
    ldRubble(m, [0, 0, .7], 8, .9, 3, 112); ctIvy(m, [-1.4, 0, .32], [-1.0, 2.3, .32], 6, 113); ctTufts(m, 14, 2.0, 7, 114);
  } },
  "curtain-wall-breach": { desc: "a curtain wall breached: a ragged gap down to the ground, its stones spilled out", split: 2.2, build(m) {
    for (const [x, h] of [[-1.15, 2.5], [1.2, 1.9]]) ldBlock(m, [x, h / 2, 0], [.55, h / 2, .3], 1, { courses: 8 }); ldMerlons(m, -1.7, -.6, 2.5, 0, .3, 2, 4);
    ldBlock(m, [0, .2, 0], [.6, .2, .3], 3, { courses: 2 }); for (let i = 0; i < 5; i++) ldBlock(m, [-.5 + i * .25, .35 + ctHash(i) * .2, -.05], [.12, .12 + ctHash(i, 2) * .1, .25], 4, { courses: 0 }); // the ragged gap
    ldRubble(m, [0, 0, .9], 16, 1.3, 5, 115); ctTufts(m, 14, 2.2, 8, 116);
  } },
  "round-tower": { desc: "a round tower, hollow and roofless, its top broken off on a slant, arrow slits round it", split: 2.4, build(m) {
    m.seg([0, 0, 0], [0, 4.2, 0], 1.0, 1.0, M.STONE, { group: 1, rough: .01, paint: ldStone(9, .18) }); m.seg([0, .3, 0], [0, 5.0, 0], .78, .78, M.STONED, { group: 1, cut: true });
    m.box([0, 4.5, 0], [1.6, .8, 1.6], M.STONED, { dir: [1, .45, .2], group: 1, cut: true }); m.box([0, -.8, 0], [1.4, .8, 1.4], M.STONED, { group: 1, cut: true });
    for (const [a, y] of [[.4, 1.2], [1.6, 2.2], [-.6, 2.6], [.9, 3.2]]) m.box([Math.cos(a) * 1.0, y, Math.sin(a) * 1.0], [.6, .22, .035], M.NOSE, { dir: [Math.cos(a), 0, Math.sin(a)], group: 1, cut: true });
    ldOpening(m, [.25, .5, 1.0], .22, .35, 2, 1);
    ldRubble(m, [1.3, 0, .6], 12, .9, 3, 117); ctIvy(m, [-.8, 0, .6], [-.6, 3.0, .75], 6, 118); ctIvy(m, [.3, 0, .97], [.5, 2.0, .9], 7, 119); ctTufts(m, 14, 2.0, 8, 120);
  } },
  "gatehouse": { desc: "a gatehouse: two square towers and the arch between, its portcullis fallen flat in the gateway", split: 2.6, build(m) {
    for (const x of [-1.25, 1.25]) { ldBlock(m, [x, 1.6, 0], [.6, 1.6, .65], 1 + (x > 0 ? 1 : 0), { courses: 10 }); ldMerlons(m, x - .6, x + .6, 3.2, .55, .08, 3, x > 0 ? 5 : 6, .3); m.box([x, 1.8, .65], [.04, .25, .3], M.NOSE, { group: 1 + (x > 0 ? 1 : 0), cut: true }); }
    ldBlock(m, [0, 2.45, 0], [.7, .4, .55], 4, { courses: 3 }); m.ell([0, 2.05, 0], [.66, .35, .8], M.STONED, { group: 4, cut: true });
    const n = mark(m); for (let i = 0; i < 7; i++) ctBar(m, [-.55 + i * .18, 0, 0], [-.55 + i * .18, 0, 1.5], 5, .03, M.JACKET); for (let k = 0; k < 6; k++) ctBar(m, [-.6, 0, k * .28], [.6, 0, k * .28], 5, .03, M.JACKET); place(m, n, { roll: -.08, at: [0, .06, -.2] }); // the portcullis, fallen flat
    ldRubble(m, [0, 0, 1.4], 10, .8, 6, 121); ctIvy(m, [-1.85, 0, .66], [-1.6, 2.8, .66], 9, 122); ctTufts(m, 14, 2.4, 10, 123);
  } },
  "steps-to-nowhere": { desc: "a stone stair climbing the stub of a fallen wall and ending in the air", build(m) {
    ldBlock(m, [-.3, .9, -.35], [1.0, .9, .25], 1, { courses: 6 });
    for (let i = 0; i < 8; i++) ldBlock(m, [-1.1 + i * .23, (.2 + i * .2) / 2, 0], [.12, (.2 + i * .2) / 2, .3], 2, { courses: 0, moss: .35 });
    ldRubble(m, [1.0, 0, .3], 8, .6, 3, 124); ctTufts(m, 12, 1.8, 6, 125);
  } },
  "rubble": { desc: "a heap of fallen dressed stone, grass and a sapling through it", build(m) { ldRubble(m, [0, 0, 0], 22, 1.0, 1, 126); m.seg([.2, 0, .1], [.25, 1.1, .1], .03, .02, M.TRUNK, { group: 4 }); ctCrown(m, [.25, 1.2, .1], [.3, .22, .25], 5); ctTufts(m, 12, 1.4, 6, 127); } },
};

// ---------------- classical ruins ----------------
const LANDMARK_CLASSICAL = {
  "column": { desc: "a fluted marble column still standing, its capital chipped", split: 2.0, build(m) { ldColumn(m, [0, 0, 0], 2.5, .2, 1); ctIvy(m, [-.18, 0, .1], [-.1, 1.4, .18], 3, 128); ctTufts(m, 8, .8, 4, 129); } },
  "column-broken": { desc: "a column snapped off at a man's height, its top jagged", build(m) { ldColumn(m, [0, 0, 0], 1.1, .2, 1, { capital: false }); m.ell([.05, 1.1, 0], [.18, .1, .18], M.BELLY, { group: 1, rough: .03 }); ctTufts(m, 8, .8, 4, 130); } },
  "column-drums": { desc: "a column fallen in a line of drums, its capital at the end", build(m) {
    for (let i = 0; i < 4; i++) m.seg([-1.2 + i * .62, .2, (ctHash(i) - .5) * .12], [-.75 + i * .62, .2, (ctHash(i + 1) - .5) * .12], .2, .2, M.BELLY, { group: 1 + (i % 2), paint: p => Math.abs(Math.sin(Math.atan2(p[2], p[1] - .2) * 9)) > .9 ? M.STONED : ldStone(0, .3)(p) });
    m.box([1.4, .12, 0], [.28, .12, .28], M.BELLY, { round: .02, group: 3, dir: [1, 0, .3], paint: ldStone(0, .4) }); ctTufts(m, 10, 1.5, 4, 131);
  } },
  "pediment-fragment": { desc: "a fallen corner of pediment, its moulding still crisp, half in the grass", build(m) {
    const n = mark(m); m.box([0, 0, 0], [1.0, .12, .3], M.BELLY, { round: .02, group: 1, paint: ldStone(0, .3) }); m.flat([0, .5, 0], [1, 0, 0], [0, 1, 0], 1.0, .38, (s, t) => s < -.1 + t * .3 ? null : ldTriangle(M.BELLY, 0)(s, t), { group: 2, bend: .02 }); place(m, n, { roll: -.5, yaw: .3, at: [0, .15, 0] });
    ctTufts(m, 10, 1.3, 3, 132);
  } },
  "mosaic-floor": { desc: "a mosaic floor: a border of waves round a ring of rosettes, tesserae lost in patches, grass through the cracks", decal: true, build(m) {
    const L = 2.4, W = 1.8;
    m.box([0, .015, 0], [L, .015, W], M.BELLY, { round: .01, group: 1, paint: p => {
      const x = p[0], z = p[2], tx = Math.floor(x * 14), tz = Math.floor(z * 14);
      if (ctCell(p, 1.6, 9) < .18 || Math.abs(Math.sin(x * 1.6 + .5) * .7 - z * .6) < .02) return ctCell(p, 12) < .5 ? M.LEAF2 : M.BARK2; // lost tesserae, cracks
      if ((tx + tz) % 7 === 0 && ctHash(tx, tz) < .3) return M.STONED; // grout
      const bx = L - Math.abs(x), bz = W - Math.abs(z), edge = Math.min(bx, bz);
      if (edge < .12) return M.STONED;
      if (edge < .42) return Math.sin((bx < bz ? x : z) * 9) * .12 + .27 > edge ? M.HAT1 : M.BELLY; // the wave border
      const r = Math.hypot(x, z * 1.2), a = Math.atan2(z, x);
      if (Math.abs(r - 1.0) < .06) return M.ACCENT;
      if (r < .5) return Math.abs(Math.sin(a * 4)) * .4 > r - .1 ? M.STRAW : r < .1 ? M.ACCENT : M.BELLY; // the rosette in the middle
      return ((tx + tz) % 2 === 0 && r < 1.0) ? M.STRAW : undefined; } });
    for (let i = 0; i < 8; i++) m.ell([(ctHash(i, 50) - .5) * 4, .06, (ctHash(50, i) - .5) * 3], [.08, .06, .08], M.LEAF2, { group: 2 + (i % 3) });
  } },
  "statue-headless": { desc: "a draped statue on its plinth, its head long gone, one arm broken at the elbow", build(m) {
    ldBlock(m, [0, .3, 0], [.38, .3, .32], 1, { mat: M.BELLY, courses: 0 });
    m.seg([0, .6, 0], [0, 1.6, 0], .3, .19, M.BELLY, { group: 2, rough: .006, paint: p => Math.abs(Math.sin(p[0] * 18 + p[1] * 3)) > .92 ? M.STONED : ctCell(p, 6, 3) < .12 ? M.MOSS : undefined });
    m.ell([0, 1.62, 0], [.24, .14, .16], M.BELLY, { group: 2 }); m.seg([0, 1.7, 0], [0, 1.78, 0], .08, .07, M.BELLY, { group: 3, paint: p => p[1] > 1.75 ? M.STONED : undefined }); // the neck, broken
    m.seg([.22, 1.6, .05], [.3, 1.3, .15], .07, .06, M.BELLY, { group: 4 }); m.seg([-.22, 1.6, 0], [-.3, 1.15, .05], .07, .06, M.BELLY, { group: 4 }); m.seg([-.3, 1.15, .05], [-.2, 1.0, .25], .06, .05, M.BELLY, { group: 4 });
    m.seg([.6, .06, .5], [.85, .07, .7], .06, .05, M.BELLY, { group: 5 }); ctIvy(m, [-.38, 0, .32], [-.2, 1.2, .32], 6, 133); ctTufts(m, 10, 1.0, 7, 134);
  } },
  "arch-ruin": { desc: "a single arch of a fallen arcade, its keystone slipped", split: 2.2, build(m) {
    for (const x of [-1.0, 1.0]) ldBlock(m, [x, 1.0, 0], [.25, 1.0, .3], 1, { mat: M.BELLY, courses: 5 });
    for (let i = 0; i <= 8; i++) { const a = Math.PI * (1 - i / 8), c = [Math.cos(a) * 1.0, 2.0 + Math.sin(a) * .85 - (i === 4 ? .12 : 0), 0]; ldBlock(m, c, [.2, .14, .3], 2 + (i % 2), { mat: M.BELLY, courses: 0, dir: [-Math.sin(a), Math.cos(a), 0] }); }
    ldBlock(m, [-.4, 3.0, 0], [.8, .1, .32], 4, { mat: M.BELLY, courses: 0 }); // what is left of the entablature
    ldRubble(m, [.8, 0, .6], 8, .6, 5, 135, M.BELLY); ctIvy(m, [-1.2, 0, .3], [-.9, 2.2, .3], 8, 136); ctTufts(m, 12, 1.8, 9, 137);
  } },
};

// ---------------- the table ----------------
// family: cemetery | carpark | scrap | worship | castle | classical; size: a factor on the witch's scale; split: the model height above
// which it goes in the top (treetop mode); halves: the buildings drawn as "<id>-far" and "<id>-near" (each half centred on its own middle,
// `halves` model units behind and in front of the building's middle).
const table = [
  ...Object.entries(LANDMARK_CEMETERY).map(([id, d]) => ({ id, family: "cemetery", ...d })),
  ...Object.entries(LANDMARK_CARPARK).map(([id, d]) => ({ id, family: "carpark", ...d })),
  ...Object.entries(LANDMARK_SCRAP).map(([id, d]) => ({ id, family: "scrap", ...d })),
  ...Object.entries(WORSHIP).map(([id, d]) => ({ id, family: "worship", ...d })),
  ...Object.entries(LANDMARK_CASTLE).map(([id, d]) => ({ id, family: "castle", ...d })),
  ...Object.entries(LANDMARK_CLASSICAL).map(([id, d]) => ({ id, family: "classical", ...d })),
];
export const LANDMARKS = table.flatMap(d => {
  const base = { size: 1, split: null, ...d };
  if (!d.halves) return [base];
  return ["far", "near"].map(half => ({ ...base, id: `${d.id}-${half}`, building: d.id, half, offset: half === "far" ? -d.halves : d.halves, desc: `${d.desc} (its ${half} half)`, build: halfOf(d.build, half === "near", half === "far" ? -d.halves : d.halves) }));
});
export const LANDMARK_BY_ID = Object.fromEntries(LANDMARKS.map(d => [d.id, d]));
// The buildings drawn in halves: { id: offset } (model units from the building's middle to each half's, along z).
export const LANDMARK_BUILDINGS = Object.fromEntries(table.filter(d => d.halves).map(d => [d.id, d.halves]));
// Half a building: the parts whose middle lies on that side (z > 0 near, else far), moved so the half's own middle (zc) is at the origin.
function halfOf(build, near, zc) {
  return m => {
    const t = new Model({ blend: .04 }); build(t);
    const zOf = q => q.type === "cone" ? (q.a[2] + q.b[2]) / 2 : q.c[2], mv = p => [p[0], p[1], p[2] - zc];
    for (const q of t.parts) {
      if ((zOf(q) > 0) !== near) continue;
      if (q.type === "cone") { q.a = mv(q.a); q.b = mv(q.b); } else q.c = mv(q.c);
      if (q.paint) { const f = q.paint; q.paint = (p, part) => f([p[0], p[1], p[2] + zc], part); }
      q.group += 100; m.parts.push(q);
    }
    for (const f of t.flats) if ((f.c[2] > 0) === near) { f.c = mv(f.c); m.flats.push(f); }
  };
}
export function landmarkColours(st = {}) {
  const leaf = st.leafHue ?? .3, trunk = st.trunkHue ?? .07;
  return {
    [M.STONE]: [132, 128, 124], [M.STONED]: [58, 56, 62], [M.MOSS]: hsv2rgb(.26, .45, .45), [M.BELLY]: [212, 204, 184], [M.STRAW]: [190, 160, 108], // grey stone, cracks, moss, pale limestone and whitewash, ochre
    [M.WOOD]: [124, 106, 86], [M.BARKD]: [44, 36, 34], [M.BARK2]: [98, 74, 52], [M.TRUNK]: hsv2rgb(trunk, .45, .36), [M.NOSE]: [14, 12, 18], [M.JACKET]: [42, 44, 48], // weathered oak, tar, timber, trunks, dark, iron
    [M.FRAME]: [150, 152, 158], [M.BODY2]: [132, 74, 42], [M.BODY3]: [34, 32, 38], [M.SHADES]: [24, 24, 30], [M.BODY]: [146, 64, 50], [M.HAT1]: [64, 90, 124], [M.HAT2]: [62, 94, 70], [M.POM]: [196, 160, 64], // metal, rust, rubber, glass, paints
    [M.ACCENT]: [150, 58, 46], [M.CLOTH]: [222, 216, 198], [M.LEAF]: hsv2rgb(leaf, .55, .45), [M.LEAF2]: hsv2rgb(leaf - .03, .5, .6), [M.LEAF3]: hsv2rgb(leaf + .1, .5, .15), // faded red lacquer, line paint, leaves (yew nearly black)
    [M.GLOW]: [255, 184, 100], [M.MAGIC]: hsv2rgb(st.magicHue ?? .12, .5, 1), [M.MAGIC2]: hsv2rgb(st.magicHue ?? .12, .15, 1), [M.LINE]: [24, 22, 30],
  };
}
export function landmarkModel(id) { const d = LANDMARK_BY_ID[id]; if (!d) throw new Error(`no landmark piece "${id}"`); const m = new Model({ blend: .04 }); d.build(m); return m; }
// One piece, drawn: { whole, top, bot, crownY, origin, metres: { width, height, footprint } }, like the country pieces.
export function landmarkSprite(id, st = {}, { ppm = 16 } = {}) { return pieceSprite(landmarkModel(id), LANDMARK_BY_ID[id], st, ppm); }
