// World decorations (Ed: "other decorations that are just around; rocks, ruins, lakes, weird freak
// trees. I think we can have a dozen kinds of ruin"). Scattered features any area can have,
// independent of its own props, placed sparsely as discoveries and landmarks. Built in 3D
// (model3d.js) at the witch's scale, turned towards the viewer (the prototype mirrors them).
//   ruins (12 kinds, each in two conditions: 0 weathered, 1 overgrown): moonlit mossy stone; four
//     have a magical touch (a keystone rune, fireflies in the well, a lit chapel window, the
//     statue's eyes);
//   rocks (8): fist-sized clusters to big boulders and a flat slab, tinted per area (areas[].rockTint);
//   freak trees (8): oddities, rare and memorable;
//   lakes: a water tile, a shore band and props for the edge (reeds, lily pads), for the prototype
//     to build organic lakes from (see lakeKit).
// Tall pieces are split into a bottom and a top (from crownY up) for the treetop cut-out.
import { M, Sprite, hsv2rgb } from "./core.js";
import { Model, render, v3 } from "./model3d.js";
import { witchPixelsPerUnit } from "./witch.js";

const dcHash = (a, b = 0) => { const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return x - Math.floor(x); };
const dcCell = (p, k, s = 0) => dcHash(Math.floor(p[0] * k) + Math.floor(p[2] * k) * 57 + s, Math.floor(p[1] * k));
const dcBark = p => { const n = dcCell(p, 12); return n < .14 ? M.BARKD : n > .88 ? M.BARKL : undefined; };
const dcLeafy = c => p => { const n = dcCell(p, 10, 3); return p[1] < c[1] - .2 || n < .2 ? M.LEAF3 : n > .8 ? M.LEAF2 : undefined; };
// stone: mortar courses, cracks, moss on top faces (more when overgrown)
const dcStone = (grown, courses = 0) => p => {
  const n = dcCell(p, 9, 7);
  if (p[1] > .05 && n < (grown ? .34 : .12) && dcCell(p, 3, 1) < (grown ? .75 : .45)) return M.MOSS;
  if (courses && ((p[1] * courses) % 1 < .1 || ((p[0] + p[2]) * courses * .7 + Math.floor(p[1] * courses) * .5) % 1 < .07)) return M.STONED;
  return n > .93 ? M.STONED : undefined;
};
const dcBlock = (m, c, h, g, grown, o = {}) => m.box(c, h, M.STONE, { round: .03, rough: .012, group: g, paint: dcStone(grown, o.courses ?? 5), ...o });
const dcIvy = (m, from, to, g, seed) => { const pts = []; for (let k = 0; k <= 4; k++) { const t = k / 4; pts.push([...v3.add(v3.lerp(from, to, t), [(dcHash(seed, k) - .5) * .15, 0, .02]), .03]); } m.chain(pts, M.LEAF, { group: g, rough: .02, paint: p => dcCell(p, 30) < .3 ? M.LEAF2 : undefined }); };
const dcTufts = (m, n, R, g, seed) => { for (let i = 0; i < n; i++) { const a = dcHash(seed, i) * 6.283, d = R * Math.sqrt(dcHash(i, seed)), x = Math.cos(a) * d, z = Math.sin(a) * d * .7; m.ell([x, .08, z], [.07, .1 + dcHash(i, 4) * .08, .07], M.LEAF2, { group: g + (i % 3), paint: p => p[1] > .14 ? M.LEAF : undefined }); } };
const dcCrown = (m, c, r, g) => m.ell(c, r, M.LEAF, { group: g, rough: .04, paint: dcLeafy(c) });
const dcLimb = (m, pts, g) => m.chain(pts, M.TRUNK, { group: g, rough: .012, paint: dcBark });
const dcRock = (m, c, r, g, o = {}) => m.ell(c, r, M.STONE, { group: g, rough: .03, dir: o.dir, paint: p => p[1] > c[1] + r[1] * (o.moss ?? .62) && dcCell(p, 5, g) < .7 ? M.MOSS : dcCell(p, 14) > .9 ? M.STONED : undefined }); // moss in patches on top
const dcGlow = (m, c, r, g, mat = M.MAGIC) => m.ell(c, [r, r, r], mat, { group: g, extra: true });

// ---------------- ruins ----------------
// build(m, grown): grown 0 weathered, 1 overgrown. split: the model height above which it goes in the top (null: not tall).
const RUINS = {
  "broken-arch": { desc: "a broken arch, one side fallen, a rune on its keystone", glow: true, split: null, build(m, g) {
    for (const x of [-1.0, 1.0]) dcBlock(m, [x, x < 0 ? 1.0 : .7, 0], [.22, x < 0 ? 1.0 : .7, .25], 1 + (x > 0 ? 1 : 0), g);
    for (let i = 0; i <= 6; i++) { const a = Math.PI * (1 - i / 9), c = [Math.cos(a) * 1.0, 2.0 + Math.sin(a) * .7, 0]; dcBlock(m, c, [.17, .14, .25], 3 + (i % 2), g, { dir: [-Math.sin(a), Math.cos(a), 0], courses: 0, paint: i === 4 ? (p => Math.abs(p[0] - c[0]) < .05 && Math.abs(p[1] - c[1]) < .08 ? M.RUNE : dcStone(g)(p)) : dcStone(g) }); }
    for (let i = 0; i < 4; i++) dcBlock(m, [1.3 + i * .3, .14, .4 + dcHash(i) * .5], [.17, .13, .22], 6 + i, g, { dir: [1, .3 * (dcHash(i, 2) - .5), dcHash(i, 3) - .5], courses: 0 });
    if (g) { dcIvy(m, [-1.15, .1, .26], [-.9, 1.9, .26], 12, 1); dcTufts(m, 14, 1.8, 14, 2); }
  } },
  "tower-stump": { desc: "a fallen tower's stump, a spiral stair climbing round its inside", split: 2.0, build(m, g) {
    for (let k = 0; k < 14; k++) { const a = k / 14 * Math.PI * 2, h = 1.0 + (Math.sin(a * 2 + 1) * .5 + .5) * 1.6 * (a > 3.6 && a < 5.4 ? 1 : .55); if (a > .9 && a < 2.0) continue; dcBlock(m, [Math.cos(a) * 1.05, h / 2, Math.sin(a) * .95], [.25, h / 2, .14], 1 + (k % 3), g, { dir: [-Math.sin(a), 0, Math.cos(a)] }); }
    for (let k = 0; k < 9; k++) { const a = 3.2 + k * .42, y = .15 + k * .26; dcBlock(m, [Math.cos(a) * .7, y, Math.sin(a) * .6], [.24, .06, .12], 5, g, { dir: [Math.cos(a), 0, Math.sin(a)], courses: 0 }); } // the stair
    for (let i = 0; i < 3; i++) dcBlock(m, [.6 + i * .35, .14, 1.1], [.22, .13, .2], 7, g, { dir: [1, 0, .4 * i], courses: 0 });
    if (g) { dcIvy(m, [-1.05, .1, -.4], [-1.0, 2.3, -.5], 10, 3); dcIvy(m, [.9, .1, -.6], [.95, 1.7, -.55], 11, 4); m.ell([0, .2, 0], [.55, .2, .5], M.LEAF, { group: 12, rough: .04 }); }
  } },
  "colonnade": { desc: "a colonnade, two columns standing and the rest toppled", split: null, build(m, g) {
    dcBlock(m, [0, .08, 0], [2.2, .08, .55], 1, g, { courses: 0 });
    for (const [x, h] of [[-1.7, 1.9], [-.6, 1.4]]) { m.seg([x, .16, 0], [x, h, 0], .18, .17, M.STONE, { group: 2, rough: .01, paint: p => Math.abs(Math.sin(Math.atan2(p[2], p[0] - x) * 8)) < .15 ? M.STONED : dcStone(g, 0)(p) }); dcBlock(m, [x, h + .07, 0], [.26, .07, .26], 3, g, { courses: 0 }); }
    for (const [x, z, a] of [[.6, .55, .3], [1.6, .4, -.4]]) m.seg([x - Math.cos(a) * .7, .2, z - Math.sin(a) * .7], [x + Math.cos(a) * .7, .2, z + Math.sin(a) * .7], .18, .18, M.STONE, { group: 4, paint: dcStone(g, 0) }); // fallen drums
    dcBlock(m, [-1.15, 2.0, 0], [.75, .1, .28], 5, g, { courses: 0 }); // a lintel still bridging the two
    if (g) { dcIvy(m, [-1.7, .2, .18], [-1.65, 1.8, .18], 8, 5); dcTufts(m, 16, 2.2, 10, 6); }
  } },
  "stone-ring": { desc: "a ring of standing-stone stubs", split: null, build(m, g) {
    for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2, h = .3 + dcHash(i, 9) * (i % 3 === 0 ? 1.2 : .45); dcBlock(m, [Math.cos(a) * 1.7, h / 2, Math.sin(a) * 1.35], [.2, h / 2, .14], 1 + (i % 4), g, { dir: [-Math.sin(a), .1 * (dcHash(i) - .5), Math.cos(a)], courses: 0, round: .07 }); }
    dcBlock(m, [0, .1, 0], [.55, .1, .35], 6, g, { courses: 0, round: .05 }); // a fallen altar stone
    if (g) dcTufts(m, 20, 2.0, 10, 7);
  } },
  "chapel-wall": { desc: "a ruined chapel wall with an empty pointed window, moonlight caught in it", glow: true, split: 2.4, build(m, g) {
    dcBlock(m, [0, 1.4, 0], [1.4, 1.4, .18], 1, g, { paint: p => { const x = p[0], y = p[1]; const win = Math.abs(x) < .38 && y > 1.1 && y < 2.3 - Math.abs(x) * .5; return win ? undefined : dcStone(g, 5)(p); } });
    m.box([0, 1.6, 0], [.33, .55, .3], M.NOSE, { group: 1, cut: true });
    m.ell([0, 1.5, -.05], [.3, .5, .02], M.MAGIC2, { group: 2, extra: true, paint: p => dcCell(p, 18) < .5 ? M.MAGIC : undefined }); // moonlight held in the window
    for (const [x, h] of [[-1.55, 2.6], [1.5, 1.6]]) dcBlock(m, [x, h / 2, 0], [.22, h / 2, .26], 3, g); // buttresses
    for (let i = 0; i < 5; i++) dcBlock(m, [-1.2 + i * .6, .12, .55 + dcHash(i) * .3], [.18, .12, .16], 4, g, { courses: 0, dir: [1, 0, dcHash(i, 5) - .5] });
    if (g) { dcIvy(m, [-1.2, .1, .2], [-.6, 2.6, .2], 6, 8); dcIvy(m, [1.0, .1, .2], [1.2, 2.0, .2], 7, 9); }
  } },
  "well": { desc: "an old well with a broken winch, fireflies over the water", glow: true, split: null, build(m, g) {
    for (let k = 0; k < 12; k++) { const a = k / 12 * Math.PI * 2; dcBlock(m, [Math.cos(a) * .55, .32, Math.sin(a) * .5], [.15, .32, .1], 1 + (k % 2), g, { dir: [-Math.sin(a), 0, Math.cos(a)], courses: 3 }); }
    m.ell([0, .55, 0], [.42, .02, .38], M.WATER, { group: 3 });
    for (const x of [-.6, .6]) m.box([x, 1.0, 0], [.06, .5, .06], M.WOOD, { group: 4, round: .02 });
    m.seg([-.6, 1.4, 0], [.1, 1.25, .05], .04, .04, M.WOOD, { group: 5 }); // the winch, broken
    m.seg([.1, 1.25, .05], [.0, .85, .1], .01, .01, M.STRAW, { group: 5 });
    for (let i = 0; i < 4; i++) dcGlow(m, [(dcHash(i) - .5) * .8, .8 + dcHash(i, 2) * .7, (dcHash(i, 3) - .5) * .6], .03, 10 + i, i % 2 ? M.MAGIC : M.MAGIC2); // fireflies
    if (g) { dcIvy(m, [-.55, .05, .5], [-.4, .62, .5], 15, 10); dcTufts(m, 10, 1.0, 16, 11); }
  } },
  "watchtower": { desc: "a crumbled watchtower, tall enough to see from the treetops", split: 2.6, build(m, g) {
    dcBlock(m, [0, 1.2, 0], [.7, 1.2, .7], 1, g, { paint: p => Math.abs(p[1] - 1.9) < .16 && Math.abs(p[0]) < .07 && p[2] > .6 ? M.NOSE : dcStone(g, 5)(p) });
    for (const [x, z, h] of [[-.5, -.5, 1.3], [0, -.5, 1.0], [.5, -.5, .7], [-.5, 0, .9], [-.5, .5, .5], [.5, 0, .3]]) dcBlock(m, [x, 2.4 + h / 2, z], [.2, h / 2, .2], 1, g); // its broken top, highest at the back
    m.box([0, .55, .7], [.25, .45, .1], M.NOSE, { group: 1, cut: true }); // its door
    for (let i = 0; i < 6; i++) dcBlock(m, [.5 + dcHash(i) * 1.2, .13, -.3 + dcHash(i, 4) * 1.2], [.17, .12, .15], 2 + (i % 2), g, { courses: 0, dir: [1, 0, dcHash(i, 5) - .5] });
    if (g) { dcIvy(m, [-.7, .1, .3], [-.7, 2.4, .2], 4, 12); dcIvy(m, [.3, .1, .72], [.5, 1.8, .72], 5, 13); dcCrown(m, [.1, 2.6, -.2], [.45, .3, .4], 6); }
  } },
  "sunken-stair": { desc: "a stairway going down into the ground, a dark doorway at its foot", split: null, build(m, g) {
    for (const z of [-.6, .6]) dcBlock(m, [0, .2, z], [1.1, .2, .12], 1, g, { courses: 2 });
    for (let k = 0; k < 5; k++) dcBlock(m, [.8 - k * .32, .3 - k * .07, 0], [.16, .04, .5], 2, g, { courses: 0 });
    m.box([-.55, .08, 0], [.28, .1, .48], M.NOSE, { group: 3 });
    dcBlock(m, [-1.1, .55, 0], [.15, .55, .62], 4, g); dcBlock(m, [-1.05, 1.15, 0], [.2, .1, .7], 5, g, { courses: 0 }); // a lintel over the way down
    if (g) { dcTufts(m, 12, 1.6, 10, 14); dcIvy(m, [-1.0, 1.2, .5], [-.9, .3, .62], 13, 15); }
  } },
  "statue-head": { desc: "a toppled giant statue head, its eyes still faintly lit", glow: true, split: null, build(m, g) {
    // lying on its side, face turned to us: up the face is +y here, so its features run along y and out along z
    const H = [0, .8, 0], F = .62, face = (y, x) => [H[0] + x, H[1] + y, H[2] + F]; // a point on the face
    m.ell(H, [.8, 1.0, .7], M.STONE, { group: 1, rough: .012, dir: [1, .25, 0], paint: dcStone(g, 0) }); // the head, tipped over
    m.ell(face(.3, 0), [.62, .14, .16], M.STONE, { group: 2, paint: dcStone(g, 0) }); // the brow
    for (const x of [-.26, .26]) { m.ell(face(.12, x), [.15, .09, .1], M.STONED, { group: 1, cut: true }); dcGlow(m, face(.12, x), .05, 3 + (x > 0 ? 1 : 0), M.MAGIC); } // eye sockets, the eyes faintly lit
    m.ell(face(-.08, 0), [.11, .24, .14], M.STONE, { group: 5, paint: dcStone(g, 0) }); // the nose
    m.ell(face(-.42, 0), [.3, .07, .08], M.STONE, { group: 6, paint: p => Math.abs(p[1] - (H[1] - .42)) < .015 ? M.STONED : dcStone(g, 0)(p) }); // the lips
    for (const [x, y] of [[-.55, .75], [0, .95], [.5, .8], [-.7, .3], [.75, .3]]) m.ell([H[0] + x, H[1] + y, H[2] - .2], [.3, .25, .45], M.STONE, { group: 7, rough: .02, paint: dcStone(g, 0) }); // carved curls of hair
    m.ell([H[0], .05, H[2] + .2], [1.0, .1, .8], M.STONE, { group: 8, paint: dcStone(g, 0) }); // the broken neck, sunk in the ground
    if (g) { dcTufts(m, 14, 1.8, 10, 16); dcCrown(m, v3.add(H, [-.2, .95, -.2]), [.5, .25, .45], 6); }
  } },
  "hearth": { desc: "a collapsed cottage: its hearth and chimney still standing", split: 2.6, build(m, g) {
    dcBlock(m, [0, 1.6, -.2], [.45, 1.6, .35], 1, g); m.box([0, .45, .1], [.3, .3, .3], M.NOSE, { group: 1, cut: true }); // the chimney stack, the hearth's mouth
    for (const [x, z, w, h, a] of [[-1.1, .4, .9, .5, 0], [1.0, .5, .7, .35, 0], [-1.9, -.2, .12, .35, 1]]) dcBlock(m, [x, h / 2, z], a ? [.12, h / 2, .7] : [w, h / 2, .12], 2, g); // footings of the walls
    for (let i = 0; i < 4; i++) m.seg([-.5 + i * .4, .08, .9], [.2 + i * .5, .3, .3 + i * .1], .05, .05, M.BARKD, { group: 3 }); // charred beams
    if (g) { dcIvy(m, [-.4, .1, .16], [-.3, 2.8, .16], 5, 17); dcTufts(m, 14, 1.8, 10, 18); }
  } },
  "bridge-span": { desc: "an old bridge span going nowhere, one arch over nothing", split: null, build(m, g) {
    dcBlock(m, [-.9, .7, 0], [.35, .7, .5], 1, g); dcBlock(m, [.95, .55, 0], [.3, .55, .5], 2, g);
    for (let i = 0; i <= 8; i++) { const t = i / 8, a = Math.PI * (1 - t), c = [Math.cos(a) * .85, .9 + Math.sin(a) * .55, 0]; dcBlock(m, c, [.14, .12, .5], 3 + (i % 2), g, { dir: [-Math.sin(a), Math.cos(a), 0], courses: 0 }); }
    dcBlock(m, [-.1, 1.62, 0], [1.25, .1, .55], 5, g, { courses: 0, dir: [1, -.08, 0] }); // the deck, ending in air
    for (const z of [-.5, .5]) dcBlock(m, [-.2, 1.85, z], [1.0, .14, .06], 6, g, { courses: 0 }); // parapets
    if (g) { dcIvy(m, [-1.2, .1, .5], [-1.0, 1.6, .55], 8, 19); dcTufts(m, 10, 1.6, 10, 20); }
  } },
  "gateway": { desc: "an overgrown gateway, two posts and a rusted gate, a rune glowing on one post", glow: true, split: null, build(m, g) {
    for (const x of [-.9, .9]) { dcBlock(m, [x, .9, 0], [.22, .9, .22], 1 + (x > 0 ? 1 : 0), g, { paint: x < 0 ? (p => p[2] > .2 && Math.abs(p[1] - 1.1) < .14 && Math.abs(p[0] - x) < .06 ? M.RUNE : dcStone(g, 5)(p)) : dcStone(g, 5) }); m.ell([x, 1.9, 0], [.18, .14, .18], M.STONE, { group: 3, paint: dcStone(g, 0) }); }
    for (let i = 0; i < 6; i++) m.seg([-.65 + i * .12, .1, .1 + i * .06], [-.65 + i * .12, 1.2, .1 + i * .06], .015, .015, M.SHADES, { group: 4 }); // a rusted gate, swung open
    for (const y of [.25, 1.1]) m.seg([-.65, y, .1], [-.05, y, .4], .018, .018, M.SHADES, { group: 4 });
    for (const s of [-1, 1]) for (let i = 0; i < 3; i++) dcBlock(m, [s * (1.3 + i * .35), .3 - i * .08, 0], [.17, .3 - i * .08, .14], 5, g); // the old wall, stepping down
    if (g) { dcIvy(m, [.75, .05, .22], [.85, 1.9, .22], 7, 21); dcIvy(m, [-.9, 1.8, .22], [-.3, 1.0, .3], 8, 22); dcTufts(m, 12, 1.6, 10, 23); }
  } },
};

// ---------------- rocks ----------------
const ROCKS = {
  "pebbles": { desc: "a cluster of fist-sized stones", build(m) { for (let i = 0; i < 7; i++) dcRock(m, [(dcHash(i) - .5) * .6, .04, (dcHash(i, 2) - .5) * .4], [.07 + dcHash(i, 3) * .05, .05, .07], 1 + i, { moss: .8 }); } },
  "pair": { desc: "two small rocks", build(m) { dcRock(m, [-.15, .12, 0], [.22, .15, .2], 1); dcRock(m, [.2, .08, .12], [.14, .1, .13], 2); } },
  "rock": { desc: "a knee-high rock", build(m) { dcRock(m, [0, .22, 0], [.45, .3, .38], 1, { dir: [1, .15, .2] }); } },
  "split": { desc: "a rock split in two, a seedling in the crack", build(m) { dcRock(m, [-.28, .35, 0], [.3, .45, .45], 1, { dir: [1, .3, 0] }); dcRock(m, [.3, .33, 0], [.3, .42, .45], 2, { dir: [1, -.3, 0] }); m.seg([.02, .2, .1], [0, .6, .1], .015, .01, M.TRUNK, { group: 3 }); dcCrown(m, [0, .62, .1], [.1, .07, .1], 4); } },
  "boulder": { desc: "a big boulder", build(m) { dcRock(m, [0, .55, 0], [.85, .75, .7], 1, { dir: [1, .1, .3] }); dcRock(m, [.7, .15, .5], [.22, .15, .2], 2); } },
  "great-boulder": { desc: "a great mossy boulder, a landmark", build(m) { dcRock(m, [0, .9, 0], [1.4, 1.15, 1.1], 1, { dir: [1, .2, .1], moss: .2 }); dcRock(m, [-1.1, .3, .6], [.4, .35, .35], 2); dcRock(m, [1.2, .2, .5], [.3, .22, .28], 3); } },
  "slab": { desc: "a flat slab of rock", build(m) { m.box([0, .12, 0], [1.0, .12, .7], M.STONE, { round: .08, rough: .02, group: 1, dir: [1, .04, .2], paint: p => p[1] > .2 && dcCell(p, 6) < .3 ? M.MOSS : dcCell(p, 14) > .9 ? M.STONED : undefined }); } },
  "standing-rock": { desc: "a tall natural standing rock", build(m) { dcRock(m, [0, .8, 0], [.35, .85, .3], 1, { moss: .8 }); dcRock(m, [.35, .1, .25], [.15, .1, .14], 2); } },
};

// ---------------- freak trees ----------------
const FREAKS = {
  "spiral-tree": { desc: "a tree whose trunk twists in a spiral", split: 2.4, build(m) { const pts = []; for (let k = 0; k <= 10; k++) { const t = k / 10, a = t * Math.PI * 4; pts.push([Math.cos(a) * .35 * (1 - t * .4), t * 3.0, Math.sin(a) * .3, .2 - t * .12]); } dcLimb(m, pts, 1); dcCrown(m, [0, 3.2, 0], [.9, .6, .8], 2); } },
  "loop-tree": { desc: "a tree grown into a loop", split: 2.4, build(m) { const pts = [[0, 0, 0, .22], [.1, .9, 0, .18]]; for (let k = 0; k <= 10; k++) { const a = -Math.PI / 2 + k / 10 * Math.PI * 2; pts.push([.1 + Math.cos(a) * .55 + k * .02, 1.45 + Math.sin(a) * .55, 0, .15]); } pts.push([.3, 2.6, 0, .1]); dcLimb(m, pts, 1); dcCrown(m, [.3, 2.9, 0], [.75, .5, .65], 2); } },
  "split-tree": { desc: "a tree split by lightning, both halves still leafing", split: 2.0, build(m) { dcLimb(m, [[0, 0, 0, .3], [0, .9, 0, .26]], 1); dcLimb(m, [[-.05, .9, 0, .18], [-.6, 1.9, 0, .13], [-1.0, 2.6, 0, .07]], 2); dcLimb(m, [[.05, .9, 0, .18], [.55, 1.8, .05, .13], [.9, 2.4, .05, .07]], 3); m.ell([0, 1.0, .05], [.08, .25, .2], M.BARKD, { group: 1, cut: true }); dcCrown(m, [-1.0, 2.7, 0], [.6, .45, .5], 4); dcCrown(m, [.95, 2.5, .05], [.55, .4, .5], 5); } },
  "door-tree": { desc: "a fat old tree with a little round door in it, a lit window above", glow: true, split: 2.3, build(m) { m.ell([0, 1.0, 0], [.8, 1.1, .75], M.TRUNK, { group: 1, rough: .02, paint: p => { if (p[2] > .5 && Math.hypot(p[0], p[1] - .45) < .3 && p[1] > .2) return Math.hypot(p[0], p[1] - .45) < .25 ? (Math.abs(p[0] % .1) < .015 ? M.BARKD : M.ACCENT) : M.BARKD; if (p[2] > .45 && Math.hypot(p[0] - .3, p[1] - 1.3) < .13) return Math.abs(p[0] - .3) < .015 || Math.abs(p[1] - 1.3) < .015 ? M.BARKD : M.GLOW; return dcBark(p); } }); m.ell([.12, .45, .72], [.03, .03, .03], M.FRAME, { group: 2 }); dcCrown(m, [0, 2.4, -.1], [1.1, .7, .9], 3); for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; dcLimb(m, [[Math.cos(a) * .6, .2, Math.sin(a) * .55, .15], [Math.cos(a) * 1.1, .02, Math.sin(a) * 1.0, .05]], 4); } } },
  "mushroom-tree": { desc: "an enormous mushroom, tall as a tree", split: 2.2, build(m) { m.seg([0, 0, 0], [.1, 2.4, 0], .3, .22, M.CLOTH, { group: 1, paint: p => p[1] > 2.0 && p[1] < 2.15 ? M.BELLY : undefined }); m.ell([.1, 2.55, 0], [1.3, .45, 1.15], M.ACCENT, { group: 2, rough: .01, paint: p => p[1] < 2.35 ? M.BODY2 : dcCell(p, 8) < .18 ? M.BELLY : undefined }); m.ell([.1, 2.35, 0], [1.2, .08, 1.05], M.BODY2, { group: 3, paint: p => Math.abs(Math.sin(Math.atan2(p[2], p[0] - .1) * 20)) < .3 ? M.STRAW : undefined }); } },
  "root-tree": { desc: "an upside-down-looking tree, its roots raised high like a crown", split: 2.0, build(m) { dcLimb(m, [[0, 0, 0, .35], [0, 1.6, 0, .25]], 1); for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2; dcLimb(m, [[0, 1.6, 0, .16], [Math.cos(a) * .7, 2.2 + dcHash(i) * .3, Math.sin(a) * .6, .1], [Math.cos(a) * 1.2, 2.5 + dcHash(i, 2) * .4, Math.sin(a) * 1.0, .04]], 2 + (i % 2)); } for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI * 2 + .4; dcLimb(m, [[Math.cos(a) * .25, .3, Math.sin(a) * .25, .14], [Math.cos(a) * .6, .02, Math.sin(a) * .55, .05]], 4); } } },
  "stone-lifter": { desc: "a tree that has lifted great stones up in its roots", split: 2.4, build(m) { dcLimb(m, [[0, .6, 0, .3], [0, 2.0, 0, .22], [.1, 2.8, 0, .12]], 1); for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; dcLimb(m, [[Math.cos(a) * .2, .6, Math.sin(a) * .2, .15], [Math.cos(a) * .6, .45, Math.sin(a) * .55, .12], [Math.cos(a) * .9, 0, Math.sin(a) * .8, .07]], 2); } for (const [x, z, y] of [[.5, .45, .9], [-.5, .4, 1.1], [.15, -.5, .8]]) dcRock(m, [x, y, z], [.3, .24, .26], 3); /* lifted up in the roots */ dcCrown(m, [.1, 3.0, 0], [1.0, .6, .85], 4); } },
  "ring-tree": { desc: "a hollow ring of a tree you could fly through", split: null, build(m) { for (let k = 0; k <= 16; k++) { const a = k / 16 * Math.PI * 2, c = [Math.cos(a) * 1.2, 1.35 + Math.sin(a) * 1.2, 0]; m.ell(c, [.3, .3, .3], M.TRUNK, { group: 1, rough: .02, paint: dcBark }); } dcLimb(m, [[-.6, 0, .2, .3], [-.5, .3, .1, .3]], 2); dcLimb(m, [[.6, 0, .2, .3], [.5, .3, .1, .3]], 2); for (const [x, y] of [[-.9, 2.3], [.3, 2.65], [1.1, 2.0]]) dcCrown(m, [x, y, -.1], [.45, .3, .35], 3); } },
};

// ---------------- the table ----------------
// family: ruins | rocks | freak; size: a factor on the witch's scale.
export const DECOR = [
  ...Object.entries(RUINS).map(([id, d]) => ({ id, family: "ruins", size: 1.15, variants: 2, ...d })),
  ...Object.entries(ROCKS).map(([id, d]) => ({ id, family: "rocks", size: 1, variants: 1, split: null, ...d })),
  ...Object.entries(FREAKS).map(([id, d]) => ({ id, family: "freak", size: 1.2, variants: 1, ...d })),
];
export const DECOR_BY_ID = Object.fromEntries(DECOR.map(d => [d.id, d]));
// An area's tint for rocks (multiply the stone colours): a touch of its floor's hue.
export const rockTint = def => hsv2rgb(def.floor[1], .16, 1).map(v => +(v / 255).toFixed(2));

export function decorColours(st = {}, tint = [1, 1, 1]) {
  const leaf = st.leafHue ?? .3, trunk = st.trunkHue ?? .07, t = c => c.map((v, i) => Math.min(255, Math.round(v * tint[i])));
  return {
    [M.STONE]: t([128, 126, 134]), [M.STONED]: t([64, 62, 72]), [M.MOSS]: hsv2rgb(.26, .45, .45),
    [M.TRUNK]: hsv2rgb(trunk, .45, .36), [M.BARKD]: hsv2rgb(trunk + .03, .5, .17), [M.BARKL]: hsv2rgb(trunk, .35, .55),
    [M.LEAF]: hsv2rgb(leaf, .55, .45), [M.LEAF2]: hsv2rgb(leaf - .03, .5, .62), [M.LEAF3]: hsv2rgb(leaf + .03, .6, .26),
    [M.WOOD]: [120, 88, 56], [M.STRAW]: [180, 156, 104], [M.SHADES]: [70, 46, 36], [M.FRAME]: [190, 160, 90], [M.NOSE]: [14, 12, 18],
    [M.CLOTH]: [226, 216, 196], [M.BELLY]: [240, 236, 226], [M.ACCENT]: [176, 52, 60], [M.BODY2]: [150, 110, 90], [M.WATER]: [44, 70, 96],
    [M.RUNE]: [120, 230, 255], [M.MAGIC]: hsv2rgb(st.magicHue ?? .45, .6, 1), [M.MAGIC2]: hsv2rgb(st.magicHue ?? .45, .2, 1), [M.GLOW]: [255, 190, 96], [M.LINE]: [24, 22, 30],
  };
}
// One decoration, drawn: { whole, top, bot, crownY, metres: { width, height, footprint } }. top is everything from
// crownY up (tall pieces; empty otherwise), bot the rest. footprint: the radius on the ground, in metres.
export function decorSprite(id, st = {}, { variant = 0, ppm = 16 } = {}) {
  const d = DECOR_BY_ID[id]; if (!d) throw new Error(`no decoration "${id}"`);
  const m = new Model({ blend: .05 }); d.build(m, variant % d.variants);
  m.ell([0, .004, 0], [.01, .004, .01], M.NOSE, { group: 0 }); // a common ground line
  const s = witchPixelsPerUnit(st) * d.size, { sp, project } = render(m, { scale: s });
  let reach = 0; for (const q of m.parts) { if (q.extra) continue; const ends = q.type === "cone" ? [[q.a, q.r1], [q.b, q.r2]] : [[q.c, q.r ? Math.max(...q.r) : Math.max(q.h[0], q.h[2])]]; for (const [c, r] of ends) if (c[1] - r < .3) reach = Math.max(reach, Math.hypot(c[0], c[2]) + r); } // the furthest reach of what touches the ground
  // crop to what is drawn (a box's bounding sphere leaves empty rows above it)
  let x0 = sp.w, x1 = -1, y0 = sp.h; for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); }
  const W = x1 - x0 + 1, H = sp.h - y0, crop = new Sprite(W, H), top = new Sprite(W, H), bot = new Sprite(W, H);
  const crownY = d.split == null ? 0 : Math.max(0, Math.round(project([0, d.split, 0])[1]) - y0);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = (y + y0) * sp.w + x + x0, mm = sp.m[i]; if (!mm) continue; const n = [sp.n[i * 3], sp.n[i * 3 + 1], sp.n[i * 3 + 2]]; crop.put(x, y, mm, ...n); (y < crownY ? top : bot).put(x, y, mm, ...n); }
  const unit = s / ppm; // metres per model unit
  return { whole: crop, top, bot, crownY, metres: { width: +(W / ppm).toFixed(1), height: +(H / ppm).toFixed(1), footprint: +(reach * unit).toFixed(1) } };
}

// ---------------- lakes ----------------
// The prototype builds a lake as a signed-distance blob on the ground (a few overlapping circles,
// or noise on a radius): inside it draws the water tile (WATER pixels take the moon's reflection,
// like the ponds), across the edge the shore band (u along the edge, v from water 0 to land 1,
// 1 to 2 m wide), and along the band it scatters the edge props: reeds on the shore side, lily pads
// on the water side, rocks from the rocks family half in the water.
export function lakeKit(st = {}) {
  const ppu = witchPixelsPerUnit(st);
  // the water: a 64 x 48 tile, flat, with a few slow ripples in its normals
  const water = new Sprite(64, 48);
  for (let y = 0; y < 48; y++) for (let x = 0; x < 64; x++) { const r = Math.sin(x * .2 + y * .5) * Math.sin(y * .31 - x * .07); water.px(x, y, r > .72 && dcHash(x >> 2, y) < .35 ? M.BELLY : M.WATER, r * .08, -.42 + r * .05, .9); }
  // the shore band: 64 px along the edge (tiles that way), 16 px from water (top) to land (bottom): wet mud, pebbles, grass
  const shore = new Sprite(64, 16);
  for (let y = 0; y < 16; y++) for (let x = 0; x < 64; x++) { const n = dcHash(x, y), edge = 4 + Math.sin(x * .3) * 1.5 + Math.sin(x * .11) * 1.5; shore.px(x, y, y < edge ? (n < .3 ? M.WATER : M.BODY2) : y < edge + 3 ? (n < .25 ? M.STONE : M.BODY2) : n < .5 ? M.LEAF2 : M.LEAF, 0, -.42, .9); }
  const prop = build => { const m = new Model({ blend: .04 }); build(m); m.ell([0, .004, 0], [.01, .004, .01], M.NOSE, { group: 0 }); return render(m, { scale: ppu }).sp; };
  const reeds = [0, 1, 2].map(v => prop(m => { for (let i = 0; i < 9 + v * 4; i++) { const x = (dcHash(i, v) - .5) * (.6 + v * .3), z = (dcHash(v, i) - .5) * .3, h = .35 + dcHash(i, v + 5) * .4; m.seg([x, 0, z], [x + (dcHash(i, 9) - .5) * .1, h, z], .02, .012, M.LEAF2, { group: 1 + (i % 3) }); if (i % 3 === 0) m.ell([x, h - .04, z], [.02, .06, .02], M.BARKD, { group: 4 }); } }));
  const lilies = [0, 1, 2].map(v => prop(m => { for (let i = 0; i < 3 + v * 2; i++) { const x = (dcHash(i, v + 3) - .5) * (.5 + v * .3), z = (dcHash(v + 3, i) - .5) * .4; m.ell([x, .01, z], [.09, .01, .08], M.LEAF, { group: 1 + (i % 2), paint: p => Math.atan2(p[2] - z, p[0] - x) > 2.6 ? M.WATER : undefined }); if (i === v) m.ell([x, .04, z], [.035, .03, .035], M.BELLY, { group: 3 }); } }));
  return { water, shore, reeds, lilies, colours: { ...decorColours(st), [M.BODY2]: [76, 64, 48], [M.BELLY]: [200, 214, 226] } };
}
