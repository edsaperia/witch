// Modern relics (Ed: "We also have a nice mix of 'fantasy' and 'modern', so we can have the
// occasional half-buried car and shopping trolley and traffic cone and broken bit of highway"):
// the forest reclaimed the modern world long ago. Rare, overgrown, moonlit, rusty, mossy, with
// saplings growing through. No brands, logos or text anywhere. Three families:
//   modern      cars, trolleys, cones, broken highway, a fallen sign and odds and ends (a phone box,
//               a bent lamppost, a sofa, a washing machine, a bike in roots, a satellite-dish
//               birdbath, a fridge full of fireflies);
//   playground  an overgrown playground, as separate pieces with a suggested arrangement;
//   sports      a tennis court, a baseball diamond and a football pitch (Ed: "sports things"), each a
//               ground decal and pieces with a suggested arrangement, plus a basketball hoop.
// Mostly unlit; at most one magical touch per piece or ground (a car's headlights, a cone lit like a
// lantern, the fridge's fireflies, a swing that sways with a sparkle, glowing tennis balls, a
// floodlight lamp of fairy light). Built in 3D at the witch's scale (she is about 1.3 units tall).
import { M, Sprite, hsv2rgb } from "./core.js";
import { Model, render, v3, YAW, PITCH } from "./model3d.js";
import { witchPixelsPerUnit } from "./witch.js";

const rlHash = (a, b = 0) => { const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return x - Math.floor(x); };
const rlCell = (p, k, s = 0) => rlHash(Math.floor(p[0] * k) + Math.floor(p[2] * k) * 57 + s, Math.floor(p[1] * k));
// weathering: rust and moss patches over a material
const rlWorn = (rust = .2, moss = .15) => p => { const r = rlCell(p, 16, 3), n = rlCell(p, 6, 5); return n < moss && p[1] > .1 ? M.MOSS : r > 1 - rust * .7 ? M.BODY2 : undefined; };
const rlTufts = (m, n, R, g, seed, cx = 0, cz = 0) => { for (let i = 0; i < n; i++) { const a = rlHash(seed, i) * 6.283, d = R * Math.sqrt(rlHash(i, seed)); m.ell([cx + Math.cos(a) * d, .07, cz + Math.sin(a) * d * .7], [.07, .1 + rlHash(i, 4) * .08, .07], M.LEAF2, { group: g + (i % 3), paint: p => p[1] > .13 ? M.LEAF : undefined }); } };
const rlFern = (m, c, g, k = 1) => { for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283 + c[0], d = [Math.cos(a), 0, Math.sin(a)]; m.chain([[...c, .03 * k], [...v3.add(c, v3.add(v3.mul(d, .25 * k), [0, .2 * k, 0])), .025 * k], [...v3.add(c, v3.add(v3.mul(d, .5 * k), [0, .05 * k, 0])), .01 * k]], i % 2 ? M.LEAF : M.LEAF2, { group: g }); } };
const rlIvy = (m, from, to, g, seed) => { const pts = []; for (let k = 0; k <= 4; k++) pts.push([...v3.add(v3.lerp(from, to, k / 4), [(rlHash(seed, k) - .5) * .12, 0, .02]), .03]); m.chain(pts, M.LEAF, { group: g, paint: p => rlCell(p, 30) < .3 ? M.LEAF2 : undefined }); };
const rlCrown = (m, c, r, g) => m.ell(c, r, M.LEAF, { group: g, rough: .04, paint: p => { const n = rlCell(p, 10, 2); return p[1] < c[1] - .15 || n < .2 ? M.LEAF3 : n > .8 ? M.LEAF2 : undefined; } });
const rlBar = (m, a, b, g, r = .025, mat = M.FRAME) => m.seg(a, b, r, r, mat, { group: g, paint: rlWorn(.35, .05) });
const rlGlow = (m, c, r, g, mat = M.MAGIC) => m.ell(c, [r, r, r], mat, { group: g, extra: true });

// Turns the parts added since `from` (and their paint) by yaw (about y), pitch (about z: nose up) and roll (about x), then moves them by `at`.
function rlPlace(m, from, { yaw = 0, pitch = 0, roll = 0, at = [0, 0, 0] } = {}) {
  const R = (v, a, i, j) => { const c = Math.cos(a), s = Math.sin(a), o = [...v]; o[i] = v[i] * c - v[j] * s; o[j] = v[i] * s + v[j] * c; return o; };
  const rot = v => R(R(R(v, roll, 1, 2), pitch, 0, 1), -yaw, 0, 2), inv = v => R(R(R(v, yaw, 0, 2), -pitch, 0, 1), -roll, 1, 2);
  const fwd = p => v3.add(rot(p), at), back = p => inv(v3.sub(p, at));
  for (const q of m.parts.slice(from)) {
    if (q.type === "cone") { q.a = fwd(q.a); q.b = fwd(q.b); } else { q.c = fwd(q.c); q.axes = q.axes.map(rot); }
    if (q.paint) { const f = q.paint; q.paint = (p, part) => f(back(p), part); }
  }
}
// A car, along x, nose at +x, wheels on the ground: a body, a cabin with dark windows, wheels, headlights.
function rlCar(m, g, { len = 1.5, van = false, glow = false, flat = false } = {}) {
  const h = van ? .62 : .3, y = van ? .8 : .5;
  m.box([0, y, 0], [len, h, .66], M.BODY, { round: .14, group: g, paint: p => { const w = rlWorn(.3, .12)(p); if (w) return w; if (p[0] > len - .06 && Math.abs(p[1] - (y + h * .2)) < .07 && Math.abs(Math.abs(p[2]) - .45) < .1) return glow ? M.MAGIC2 : M.FRAME; if (van && p[1] > y + .1 && Math.abs(p[2]) > .6 && Math.abs(p[0] + .2) < .9 && ((p[0] + 3) * 3) % 1 > .15) return M.SHADES; return p[1] < y - h + .1 ? M.SHADES : undefined; } });
  if (!van) m.box([-.2, y + h + .22, 0], [len * .6, .24, .6], M.BODY, { round: .14, group: g, paint: p => Math.abs(p[2]) > .52 || p[0] > len * .6 - .25 - .2 ? (rlCell(p, 9) < .25 ? M.STONED : M.SHADES) : rlWorn(.3, .25)(p) }); // the cabin, its windows dark and cracked
  for (const x of [-len * .65, len * .65]) for (const z of [-.66, .66]) m.ell([x, .3, z], [.3, flat ? .22 : .3, .1], M.BODY3, { group: g + 1, paint: p => Math.hypot(p[0] - x, p[1] - .3) < .12 ? M.FRAME : undefined });
  if (glow) for (const z of [-.45, .45]) rlGlow(m, [len + .05, y + h * .2, z], .07, g + 2, M.MAGIC2);
}

export const carModel = (m, g, o) => rlCar(m, g, o); // a car's model, for the country pieces' parked car

// ---------------- modern relics ----------------
const MODERN = {
  "car-nose-down": { desc: "a hatchback nose-down in the earth, ferns round it", build(m) {
    const n = m.parts.length; rlCar(m, 1); rlPlace(m, n, { pitch: -.5, at: [0, .2, 0] });
    m.ell([1.3, .1, 0], [.9, .35, 1.0], M.BARK2, { group: 4, rough: .04, paint: p => p[1] > .25 ? M.MOSS : undefined }); // the earth it sank into
    rlFern(m, [.9, .2, .8], 5); rlFern(m, [-.9, .05, .9], 6, .8); m.ell([-.6, 1.25, 0], [.5, .06, .4], M.MOSS, { group: 7 }); // moss on its roof
  } },
  "van-tree": { desc: "a camper van with a tree grown up through its roof, its headlights glowing with fairy light", glow: true, build(m) {
    rlCar(m, 1, { van: true, len: 1.6, flat: true, glow: true });
    m.chain([[.2, 0, 0, .22], [.2, 1.5, 0, .2], [.3, 2.6, -.1, .14], [.35, 3.3, -.1, .08]], M.TRUNK, { group: 4, rough: .015 });
    rlCrown(m, [.3, 3.4, -.1], [1.1, .7, .9], 5); rlIvy(m, [-1.6, .1, .66], [-1.0, 1.3, .7], 6, 1); rlTufts(m, 14, 2.2, 7, 2);
  } },
  "car-on-side": { desc: "a car on its side among ferns", build(m) {
    const n = m.parts.length; rlCar(m, 1); rlPlace(m, n, { roll: Math.PI / 2, at: [0, .2, .1] });
    for (const [x, z] of [[-1.2, .9], [.3, 1.1], [1.4, .6], [-.4, -1.0]]) rlFern(m, [x, .05, z], 5 + (x > 0 ? 1 : 0), 1.1);
  } },
  "trolley-tipped": { desc: "a shopping trolley tipped over, a plant growing in its basket", build(m) {
    const n = m.parts.length; rlTrolley(m, 1); rlCrown(m, [.05, .65, 0], [.32, .28, .26], 3); rlPlace(m, n, { roll: 1.35, at: [0, .32, 0] }); rlTufts(m, 8, .9, 6, 3);
  } },
  "trolley-nest": { desc: "a shopping trolley standing upright, a bird's nest in its basket", build(m) {
    rlTrolley(m, 1); m.ell([0, .78, 0], [.2, .08, .17], M.STRAW, { group: 3, paint: p => Math.abs(Math.sin(p[0] * 40 + p[2] * 30)) < .3 ? M.BARK2 : undefined });
    for (const x of [-.05, .05]) m.ell([x, .84, .02], [.04, .03, .035], M.BELLY, { group: 4 }); rlTufts(m, 8, .9, 6, 4);
  } },
  "cone": { desc: "a single traffic cone, faded", build(m) { rlCone(m, [0, 0, 0], 1); } },
  "cones": { desc: "a little cluster of traffic cones, one fallen", build(m) { rlCone(m, [0, 0, 0], 1); rlCone(m, [.5, 0, .2], 4); const n = m.parts.length; rlCone(m, [0, 0, 0], 7); rlPlace(m, n, { roll: 1.5, yaw: .6, at: [-.4, .2, .4] }); rlTufts(m, 6, .8, 10, 5); } },
  "cone-lantern": { desc: "a traffic cone lit from within like a lantern, a ring of mushrooms round it", glow: true, build(m) {
    rlCone(m, [0, 0, 0], 1, true); for (let i = 0; i < 9; i++) { const a = i / 9 * 6.283, c = [Math.cos(a) * .55, 0, Math.sin(a) * .45]; m.seg(c, v3.add(c, [0, .08, 0]), .02, .02, M.CLOTH, { group: 5 }); m.ell(v3.add(c, [0, .1, 0]), [.06, .035, .06], M.BODY2, { group: 6 }); }
  } },
  "highway-slab": { desc: "a slab of tarmac tilted up out of the ground, faded lane markings, a crash-barrier stub", build(m) {
    const n = m.parts.length;
    m.box([0, 0, 0], [2.2, .14, 1.3], M.STONE, { round: .03, group: 1, rough: .01, paint: p => { if (rlCell(p, 5, 1) < .06 || Math.abs(Math.sin(p[0] * 3 + p[2] * 5) * .3 + p[2] * .6 - .2) < .02) return M.STONED; if (p[1] > .1 && Math.abs(p[2]) < .05 && ((p[0] + 9) * .8) % 1 < .55) return rlCell(p, 12) < .3 ? M.STONE : M.CLOTH; if (p[1] > .1 && Math.abs(p[2] - 1.1) < .04) return M.BELLY; return p[1] > .1 && rlCell(p, 6, 4) < .12 ? M.MOSS : undefined; } });
    for (const x of [-1.6, -.4]) rlBar(m, [x, .1, 1.25], [x, .75, 1.25], 2, .04);
    m.box([-1.0, .62, 1.3], [.9, .1, .03], M.FRAME, { group: 3, paint: p => Math.abs(p[1] - .62) < .02 ? M.STONED : rlWorn(.5, .1)(p) }); // the barrier's rail
    rlPlace(m, n, { pitch: .38, roll: .08, at: [0, .7, 0] }); m.ell([-1.8, .1, 0], [.6, .2, 1.3], M.BARK2, { group: 5, rough: .04, paint: p => p[1] > .2 ? M.MOSS : undefined }); rlTufts(m, 16, 2.4, 6, 6);
  } },
  "highway-line": { desc: "a section of cracked road, its white line broken, grass in the cracks", build(m) {
    m.box([0, .02, 0], [2.0, .03, 1.0], M.STONE, { round: .02, group: 1, paint: p => { if (rlCell(p, 4, 9) < .08 || Math.abs(Math.sin(p[0] * 2.3) * .4 - p[2]) < .025) return rlCell(p, 20) < .4 ? M.LEAF2 : M.STONED; if (Math.abs(p[2] + .05) < .05 && ((p[0] + 9) * .7) % 1 < .6) return M.CLOTH; return rlCell(p, 6) < .08 ? M.MOSS : undefined; } });
    for (const [x, z] of [[-1.2, .3], [.4, -.2], [1.3, .5]]) rlTufts(m, 4, .2, 3, x * 10 + 7, x, z);
  } },
  "road-sign": { desc: "a fallen road sign, blank but for an abstract arrow", build(m) {
    rlBar(m, [-.9, .05, .2], [.6, .1, -.1], 1, .03);
    m.box([.9, .12, -.15], [.62, .05, .46], M.HAT1, { group: 2, dir: [1, .25, -.2], round: .02, paint: p => { const x = p[0] - .9, z = p[2] + .15; return (Math.abs(z) < .08 && x > -.36 && x < .2) || (x > .08 && Math.abs(z) < .28 - (x - .08) * .9 && x < .38) ? M.BELLY : Math.hypot(Math.abs(x) - .56, Math.abs(z) - .4) < .04 ? M.FRAME : rlWorn(.2, .1)(p); } });
    rlTufts(m, 8, 1.2, 4, 7);
  } },
  "phone-box": { desc: "an overgrown phone box, its panes long gone", build(m) {
    m.box([0, 1.0, 0], [.42, 1.0, .42], M.ACCENT, { round: .04, group: 1, paint: p => Math.max(Math.abs(p[0]), Math.abs(p[2])) > .38 && p[1] > .5 && p[1] < 1.75 && ((p[1] * 5) % 1 > .12) && ((Math.abs(p[0]) + Math.abs(p[2])) * 5 % 1 > .12) ? M.SHADES : rlWorn(.3, .15)(p) });
    m.box([0, 2.08, 0], [.46, .09, .46], M.ACCENT, { round: .06, group: 2, paint: rlWorn(.3, .3) }); rlIvy(m, [.43, 0, .3], [.4, 1.9, .43], 3, 8); rlIvy(m, [-.3, 0, .43], [-.1, 1.4, .43], 4, 9); rlTufts(m, 10, .9, 5, 8);
  } },
  "lamppost": { desc: "a lamppost bent over, its lamp hanging near the ground", build(m) {
    m.chain([[0, 0, 0, .06], [0, 1.4, 0, .05], [.2, 2.1, 0, .045], [.8, 2.2, 0, .04], [1.2, 1.7, 0, .035]], M.FRAME, { group: 1, paint: rlWorn(.4, .05) });
    m.box([1.25, 1.55, 0], [.16, .1, .12], M.FRAME, { round: .04, group: 2 }); m.ell([1.25, 1.45, 0], [.12, .06, .1], M.SHADES, { group: 2 }); rlIvy(m, [0, 0, .06], [.05, 1.5, .06], 3, 10); rlTufts(m, 6, .7, 4, 9);
  } },
  "sofa": { desc: "a sofa left in a clearing, moss on its cushions", build(m) {
    const cloth = p => rlCell(p, 6, 5) < .25 && p[1] > .4 ? M.MOSS : rlCell(p, 14) > .9 ? M.STONED : undefined;
    m.box([0, .3, 0], [.9, .2, .4], M.CLOTH, { round: .1, group: 1, paint: cloth }); m.box([-.02, .7, -.32], [.9, .3, .12], M.CLOTH, { round: .1, group: 2, paint: cloth });
    for (const x of [-.85, .85]) m.box([x, .55, 0], [.12, .22, .42], M.CLOTH, { round: .1, group: 3, paint: cloth });
    for (const x of [-.4, .4]) m.box([x, .53, .05], [.42, .08, .34], M.CLOTH, { round: .08, group: 4, paint: cloth }); rlTufts(m, 14, 1.6, 5, 10);
  } },
  "washing-machine": { desc: "a washing machine in the undergrowth, a fern in its drum", build(m) {
    m.box([0, .42, 0], [.32, .42, .32], M.BELLY, { round: .05, group: 1, paint: p => { if (p[2] > .28 && Math.hypot(p[0], p[1] - .4) < .2) return Math.hypot(p[0], p[1] - .4) < .15 ? M.SHADES : M.FRAME; return rlWorn(.25, .15)(p); } });
    rlFern(m, [0, .4, .4], 2, .55); rlTufts(m, 8, .8, 3, 11);
  } },
  "bike-roots": { desc: "a bicycle tangled in tree roots", build(m) {
    for (const x of [-.45, .45]) for (let k = 0; k < 12; k++) { const a = k / 12 * 6.283, b = (k + 1) / 12 * 6.283; rlBar(m, [x + Math.cos(a) * .3, .32 + Math.sin(a) * .3, 0], [x + Math.cos(b) * .3, .32 + Math.sin(b) * .3, 0], 1 + (x > 0 ? 1 : 0), .018); }
    for (const [a, b] of [[[-.45, .32, 0], [0, .35, 0]], [[0, .35, 0], [.3, .7, 0]], [[-.45, .32, 0], [-.15, .72, 0]], [[-.15, .72, 0], [.3, .7, 0]], [[.3, .7, 0], [.45, .32, 0]], [[0, .35, 0], [-.15, .72, 0]], [[.3, .7, 0], [.35, .85, 0]]]) rlBar(m, a, b, 3, .022);
    m.box([-.17, .76, 0], [.1, .03, .04], M.SHADES, { group: 4 }); rlBar(m, [.25, .85, -.15], [.42, .87, .15], 4, .018);
    for (let i = 0; i < 4; i++) m.chain([[-1.0 + i * .2, 0, -.4, .09], [-.3 + i * .3, .35 + (i % 2) * .2, -.05 + i * .05, .07], [.4 + i * .2, .1, .3, .05]], M.TRUNK, { group: 5 + (i % 2), rough: .01 }); // roots over and through it
  } },
  "dish-birdbath": { desc: "a satellite dish fallen face-up, full of rainwater, a bird drinking", build(m) {
    m.ell([0, .2, 0], [.6, .22, .6], M.BELLY, { group: 1, paint: rlWorn(.25, .2) }); m.ell([0, .34, 0], [.52, .12, .52], M.BELLY, { group: 1, cut: true }); m.ell([0, .28, 0], [.48, .02, .48], M.WATER, { group: 2 });
    rlBar(m, [0, .25, -.5], [.1, .8, -.6], 3, .03); const b = [.5, .45, .3]; m.ell(b, [.12, .07, .06], M.BODY3, { group: 4, dir: [1, .3, 0] }); m.ell(v3.add(b, [.1, .07, 0]), [.05, .05, .045], M.BODY3, { group: 4 }); m.seg(v3.add(b, [.14, .07, 0]), v3.add(b, [.2, .04, 0]), .012, .004, M.ACCENT, { group: 4 }); rlTufts(m, 8, 1.0, 5, 12);
  } },
  "fridge-fireflies": { desc: "a fridge standing in the woods, its door ajar, fireflies inside", glow: true, build(m) {
    m.box([0, .85, 0], [.36, .85, .32], M.BELLY, { round: .05, group: 1, paint: p => p[2] > .28 && Math.abs(p[0]) < .3 && p[1] < 1.55 && p[1] > .1 ? M.SHADES : rlWorn(.25, .2)(p) });
    m.box([.5, .85, .4], [.03, .78, .3], M.BELLY, { dir: [.5, 0, 1], round: .03, group: 2, paint: rlWorn(.25, .15) }); // its door, ajar
    for (let i = 0; i < 7; i++) rlGlow(m, [(rlHash(i) - .5) * .4, .4 + rlHash(i, 2) * 1.0, .2 + rlHash(i, 3) * .3], .03, 10 + i, i % 2 ? M.MAGIC : M.MAGIC2); rlIvy(m, [-.36, 0, .3], [-.3, 1.6, .33], 3, 13);
  } },
};
function rlTrolley(m, g) {
  const c = [[-.35, .45, -.25], [.35, .45, -.25], [.35, .45, .25], [-.35, .45, .25], [-.3, .9, -.28], [.4, .9, -.28], [.4, .9, .28], [-.3, .9, .28]];
  for (const [a, b] of [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]]) rlBar(m, c[a], c[b], g, .015);
  for (let i = 1; i < 6; i++) { const t = i / 6; rlBar(m, v3.lerp(c[0], c[1], t), v3.lerp(c[4], c[5], t), g, .008); rlBar(m, v3.lerp(c[3], c[2], t), v3.lerp(c[7], c[6], t), g, .008); }
  rlBar(m, c[4], [-.45, .95, -.28], g, .015); rlBar(m, c[7], [-.45, .95, .28], g, .015); rlBar(m, [-.45, .95, -.28], [-.45, .95, .28], g, .025, M.ACCENT); // the handle
  for (const [x, z] of [[-.3, -.22], [.3, -.22], [-.3, .22], [.3, .22]]) { rlBar(m, [x, .45, z], [x, .08, z], g, .012); m.ell([x, .06, z], [.05, .05, .02], M.BODY3, { group: g + 1 }); }
}
function rlCone(m, c, g, lit = false) {
  m.box(v3.add(c, [0, .03, 0]), [.24, .03, .24], M.ACCENT, { round: .02, group: g, paint: rlWorn(.15, .2) });
  m.seg(v3.add(c, [0, .05, 0]), v3.add(c, [0, .72, 0]), .2, .03, M.ACCENT, { group: g + 1, paint: p => Math.abs(p[1] - c[1] - .42) < .07 ? (lit ? M.MAGIC2 : M.CLOTH) : lit && rlCell(p, 18) < .2 ? M.GLOW : rlWorn(.15, .1)(p) });
  if (lit) rlGlow(m, v3.add(c, [0, .78, 0]), .05, g + 2, M.MAGIC2);
}

// ---------------- the playground ----------------
const PLAYGROUND = {
  "swings": { desc: "a rusty swing set, one swing hanging, one chain broken; the hanging one sways on its own with a faint sparkle", glow: true, split: 1.6, build(m) {
    for (const x of [-1.1, 1.1]) for (const z of [-.5, .5]) rlBar(m, [x, 0, z], [x * .95, 2.1, 0], 1, .045);
    rlBar(m, [-1.1, 2.1, 0], [1.1, 2.1, 0], 2, .05);
    for (const z of [-.12, .12]) rlBar(m, [-.5, 2.08, z], [-.42, .55, z * 1.2], 3, .012); m.box([-.42, .52, 0], [.2, .025, .14], M.BODY3, { round: .02, group: 3, dir: [1, -.15, 0] }); // the swing that sways
    for (let i = 0; i < 5; i++) rlGlow(m, [-.42 + (rlHash(i) - .5) * .5, .6 + rlHash(i, 2) * .7, (rlHash(i, 3) - .5) * .3], .025, 10 + i);
    rlBar(m, [.5, 2.08, -.12], [.5, 1.3, -.12], 4, .012); rlBar(m, [.5, 2.08, .12], [.58, .9, .2], 4, .012); m.box([.7, .04, .3], [.2, .025, .14], M.BODY3, { round: .02, group: 5, dir: [1, 0, .5] }); // the broken one, its seat in the grass
    rlIvy(m, [1.1, 0, .5], [1.05, 1.6, .25], 6, 14); rlTufts(m, 14, 1.8, 7, 15);
  } },
  "slide": { desc: "a slide half-swallowed by brambles, a sapling at its foot", split: 1.6, build(m) {
    for (const x of [-.95, -.55]) for (const z of [-.3, .3]) rlBar(m, [x, 0, z], [x, 1.5, z], 1, .035);
    for (let i = 1; i < 6; i++) rlBar(m, [-.95, i * .27, -.3], [-.95, i * .27, .3], 1, .02); // the ladder
    m.box([-.75, 1.5, 0], [.25, .04, .32], M.FRAME, { group: 2, paint: rlWorn(.4, .1) });
    m.box([.35, .78, 0], [.95, .03, .26], M.HAT1, { dir: [1, -.75, 0], round: .02, group: 3, paint: p => Math.abs(p[2]) > .22 ? M.FRAME : rlWorn(.35, .15)(p) }); // the chute
    for (let i = 0; i < 10; i++) { const a = rlHash(i, 3) * 6.283; m.chain([[.4 + Math.cos(a) * .9, 0, Math.sin(a) * .6, .03], [.3 + Math.cos(a) * .4, .5 + rlHash(i) * .5, Math.sin(a) * .3, .025], [.1 + rlHash(i, 4) * .6, .7 + rlHash(i, 5) * .4, (rlHash(i, 6) - .5) * .4, .015]], M.BARKD, { group: 5 + (i % 2) }); if (i % 3 === 0) m.ell([.3 + rlHash(i, 7) * .6, .5 + rlHash(i, 8) * .4, (rlHash(i, 9) - .5) * .5], [.2, .14, .16], M.LEAF, { group: 7, rough: .03, paint: p => rlCell(p, 30) < .1 ? M.ACCENT : undefined }); }
    m.seg([1.45, 0, .2], [1.45, 1.2, .2], .03, .02, M.TRUNK, { group: 8 }); rlCrown(m, [1.45, 1.3, .2], [.25, .2, .22], 9); // the sapling
  } },
  "roundabout": { desc: "a roundabout tilted in the moss", build(m) {
    const n = m.parts.length;
    m.ell([0, .2, 0], [.9, .05, .9], M.HAT2, { group: 1, paint: p => Math.abs(Math.sin(Math.atan2(p[2], p[0]) * 3)) < .08 ? M.FRAME : rlWorn(.35, .2)(p) });
    for (let k = 0; k < 3; k++) { const a = k / 3 * 6.283; rlBar(m, [Math.cos(a) * .7, .25, Math.sin(a) * .7], [Math.cos(a) * .7, .6, Math.sin(a) * .7], 2, .025); rlBar(m, [Math.cos(a) * .7, .6, Math.sin(a) * .7], [Math.cos(a) * .1, .6, Math.sin(a) * .1], 2, .02); }
    rlPlace(m, n, { pitch: .18, roll: .1, at: [0, .05, 0] }); m.ell([0, .05, 0], [1.1, .08, 1.0], M.MOSS, { group: 4 }); rlTufts(m, 10, 1.3, 5, 16);
  } },
  "seesaw": { desc: "a seesaw stuck at an angle", build(m) {
    m.box([0, .2, 0], [.08, .2, .14], M.FRAME, { round: .02, group: 1, paint: rlWorn(.4, .1) });
    const n = m.parts.length; m.box([0, 0, 0], [1.3, .035, .12], M.WOOD, { round: .02, group: 2, paint: p => rlCell(p, 8) < .2 ? M.MOSS : undefined }); for (const x of [-1.05, 1.05]) rlBar(m, [x, .03, -.12], [x, .03, .12], 3, .02); rlPlace(m, n, { pitch: .32, at: [0, .42, 0] });
    rlTufts(m, 10, 1.4, 5, 17);
  } },
  "climbing-frame": { desc: "a climbing frame, a dome of bars wound with ivy", split: 1.4, build(m) {
    const R = 1.0, pts = (i, j) => { const a = i / 8 * 6.283, b = j / 4 * Math.PI / 2; return [Math.cos(a) * Math.cos(b) * R, Math.sin(b) * R * 1.5, Math.sin(a) * Math.cos(b) * R]; };
    for (let i = 0; i < 8; i++) for (let j = 0; j < 4; j++) { rlBar(m, pts(i, j), pts(i, j + 1), 1, .025); rlBar(m, pts(i, j), pts(i + 1, j), 1, .025); }
    for (let k = 0; k < 3; k++) rlIvy(m, pts(k * 3, 0), pts(k * 3 + 1, 3), 3 + k, 18 + k); rlTufts(m, 12, 1.4, 6, 18);
  } },
  "spring-rider": { desc: "a spring rider animal, its paint faded (a generic animal, no characters)", build(m) {
    for (let k = 0; k < 6; k++) m.seg([Math.cos(k * 2) * .06, k * .07, Math.sin(k * 2) * .06], [Math.cos(k * 2 + 2) * .06, (k + 1) * .07, Math.sin(k * 2 + 2) * .06], .022, .022, M.FRAME, { group: 1 });
    m.ell([0, .55, 0], [.35, .16, .14], M.BODY, { group: 2, paint: rlWorn(.4, .2) }); m.ell([.32, .72, 0], [.12, .11, .1], M.BODY, { group: 2, paint: rlWorn(.4, .2) }); // body and head
    for (const z of [-.05, .05]) m.ell([.28, .85, z], [.03, .06, .02], M.BODY, { group: 3 }); m.ell([.43, .74, .06], [.015, .015, .015], M.SHADES, { group: 3 }); rlBar(m, [.25, .68, -.12], [.25, .68, .12], 4, .015); // ears, an eye, the handle
    m.box([0, .02, 0], [.25, .02, .25], M.STONE, { group: 5 }); rlTufts(m, 8, .8, 6, 19);
  } },
};
// A suggested arrangement for the playground: piece, x and z in model units from the clearing's middle (x right, z towards the viewer); relicLayouts gives metres.
const PLAYGROUND_AT = [["swings", -2.6, -2.0], ["slide", 2.4, -2.2], ["climbing-frame", 2.6, 1.6], ["roundabout", -.3, .4], ["seesaw", -3.2, 2.0], ["spring-rider", .2, 2.9]];

// ---------------- the sports grounds ----------------
// A ground decal: a flat, cracked surface with painted lines, seen at the game's angle.
function rlDecal(m, w, d, surface, lines, g = 1) {
  m.box([0, .015, 0], [w, .015, d], surface, { round: .01, group: g, paint: p => { if (rlCell(p, 3, 4) < .05 || Math.abs(Math.sin(p[0] * 1.3 + 1) * .5 + Math.sin(p[0] * 4.1) * .08 - p[2] * .3) < .012) return rlCell(p, 18) < .5 ? M.LEAF2 : M.STONED; if (lines(p[0], p[2])) return rlCell(p, 10, 2) < .25 ? surface : M.CLOTH; return rlCell(p, 5, 7) < .07 ? M.MOSS : undefined; } });
}
const near = (v, t, w = .045) => Math.abs(v - t) < w;
const SPORTS = {
  "tennis-court": { desc: "a cracked tennis court, faded lines, grass through the cracks", decal: true, build(m) { const L = 4.4, W = 2.0; rlDecal(m, L + .5, W + .5, M.HAT2, (x, z) => (Math.abs(x) <= L + .05 && Math.abs(z) <= W + .05 && (near(Math.abs(x), L) || near(Math.abs(z), W) || near(Math.abs(z), W * .75) || (Math.abs(x) < L * .54 && (near(z, 0) || near(Math.abs(x), L * .54)))))); } },
  "tennis-net": { desc: "a sagging tennis net between its posts", build(m) { for (const z of [-2.2, 2.2]) rlBar(m, [0, 0, z], [0, .55, z], 1, .035); m.box([0, .38, 0], [.01, .17, 2.15], M.CLOTH, { group: 2, paint: p => p[1] > .5 ? M.CLOTH : ((p[1] * 25) % 1 < .25 || ((p[2] + 5) * 25) % 1 < .25) ? M.SHADES : undefined }); m.box([0, .25, 0], [.012, .15, 1.0], M.SHADES, { group: 2, cut: true }); } },
  "umpire-chair": { desc: "a tennis umpire's chair leaning over", split: 1.4, build(m) { const n = m.parts.length; for (const x of [-.25, .25]) for (const z of [-.2, .2]) rlBar(m, [x * 1.4, 0, z * 1.4], [x, 1.5, z], 1, .03); for (let i = 1; i < 5; i++) rlBar(m, [-.3, i * .3, -.22], [-.3, i * .3, .22], 1, .02); m.box([0, 1.55, 0], [.28, .04, .25], M.WOOD, { group: 2 }); m.box([-.26, 1.8, 0], [.03, .25, .25], M.WOOD, { group: 2 }); rlPlace(m, n, { roll: .25, pitch: -.1 }); rlTufts(m, 8, 1.0, 4, 20); } },
  "court-fence": { desc: "a chain-link fence section, ivy through it, a gap torn in it", build(m) { for (const x of [-1.5, 0, 1.5]) rlBar(m, [x, 0, 0], [x, 1.7, 0], 1, .03); rlBar(m, [-1.5, 1.7, 0], [1.5, 1.7, 0], 1, .025); m.box([0, .85, 0], [1.5, .85, .008], M.FRAME, { group: 2, paint: p => ((p[0] + p[1] + 9) * 9) % 1 < .2 || ((p[0] - p[1] + 9) * 9) % 1 < .2 ? (rlCell(p, 5) < .15 ? M.BODY2 : M.FRAME) : M.SHADES }); m.ell([.7, .5, 0], [.4, .5, .05], M.SHADES, { group: 2, cut: true, rough: .08 }); for (let k = 0; k < 3; k++) rlIvy(m, [-1.3 + k * .6, 0, .03], [-1.1 + k * .5, 1.5, .03], 3 + k, 21 + k); } },
  "tennis-balls": { desc: "a few old tennis balls glowing faintly in the grass", glow: true, build(m) { for (let i = 0; i < 4; i++) rlGlow(m, [(rlHash(i) - .5) * 1.2, .06, (rlHash(i, 2) - .5) * .8], .06, 1 + i, i % 2 ? M.MAGIC : M.MAGIC2); m.ell([0, .004, 0], [.8, .004, .5], M.LEAF3, { group: 9 }); rlTufts(m, 8, .8, 5, 22); } },
  "baseball-diamond": { desc: "a baseball diamond: the worn dirt infield, grown-over bases, a pitcher's mound", decal: true, build(m) { const S = 2.2; m.box([0, .015, 0], [S * 1.6, .015, S * 1.2], M.LEAF2, { group: 1, round: .01, paint: p => { const u = Math.abs(p[0]) / S + Math.abs(p[2]) / (S * .75); if (u < 1.08 && u > .78) return rlCell(p, 8) < .2 ? M.LEAF2 : M.BARK2; if (u <= .78) return rlCell(p, 6) < .15 ? M.MOSS : undefined; return rlCell(p, 6, 3) < .3 ? M.LEAF : undefined; } }); for (const [x, z] of [[S, 0], [0, S * .75], [-S, 0], [0, -S * .75]]) m.box([x * .93, .04, z * .93], [.12, .02, .1], M.BELLY, { group: 2, round: .02, paint: p => rlCell(p, 20) < .3 ? M.LEAF2 : undefined }); m.ell([0, .02, 0], [.35, .08, .28], M.BARK2, { group: 3 }); } },
  "backstop": { desc: "a baseball backstop fence, a dugout bench beside it", build(m) { for (let k = 0; k <= 4; k++) { const a = -.8 + k * .4; rlBar(m, [-Math.cos(a) * .8, 0, Math.sin(a) * 1.4], [-Math.cos(a) * .8, 1.8, Math.sin(a) * 1.4], 1, .03); } for (let k = 0; k < 4; k++) { const a = -.8 + k * .4, b = a + .4, A = [-Math.cos(a) * .8, .9, Math.sin(a) * 1.4], B = [-Math.cos(b) * .8, .9, Math.sin(b) * 1.4], c = v3.lerp(A, B, .5); m.box(c, [Math.hypot(B[0] - A[0], B[2] - A[2]) / 2, .9, .008], M.FRAME, { dir: v3.sub(B, A), group: 2, paint: p => ((p[1] + p[0] * 2 + 9) * 9) % 1 < .2 ? (rlCell(p, 5) < .2 ? M.BODY2 : M.FRAME) : M.SHADES }); } m.box([-.6, .3, 2.0], [.15, .04, .7], M.WOOD, { group: 3 }); for (const z of [1.4, 2.6]) m.box([-.6, .14, z], [.12, .14, .04], M.WOOD, { group: 3 }); rlIvy(m, [-.75, 0, -.5], [-.7, 1.6, -.4], 4, 25); /* a dugout bench to one side */ } },
  "scoreboard": { desc: "a scoreboard frame, panels missing (no text)", split: 1.8, build(m) { for (const x of [-1.0, 1.0]) rlBar(m, [x, 0, 0], [x, 2.6, 0], 1, .05); for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) if (rlHash(r, c) > .3) m.box([-.8 + c * .4, 1.6 + r * .32, 0], [.18, .14, .03], M.HAT1, { group: 2 + r, round: .01, paint: rlWorn(.3, .1) }); m.box([0, 2.62, 0], [1.1, .05, .06], M.FRAME, { group: 5 }); rlIvy(m, [-1.0, 0, .06], [-.95, 2.3, .06], 6, 26); } },
  "football-pitch": { desc: "a football pitch: faded lines, a centre circle, mown stripes long grown out", decal: true, build(m) { const L = 5.2, W = 3.3; m.box([0, .015, 0], [L + .5, .015, W + .5], M.LEAF2, { group: 1, round: .01, paint: p => { const x = p[0], z = p[2], ln = Math.abs(x) <= L + .05 && Math.abs(z) <= W + .05 && (near(Math.abs(x), L, .06) || near(Math.abs(z), W, .06) || near(x, 0, .06) || near(Math.hypot(x, z * 1), 1.0, .06) || (Math.abs(x) > L - 1.0 && Math.abs(z) < 1.6 && (near(Math.abs(x), L - 1.0, .06) || near(Math.abs(z), 1.6, .06)))); if (ln) return rlCell(p, 8, 2) < .3 ? M.LEAF2 : M.CLOTH; return Math.floor((x + 20) * .8) % 2 ? (rlCell(p, 6) < .25 ? M.LEAF2 : M.LEAF) : rlCell(p, 5, 9) < .1 ? M.LEAF3 : undefined; } }); } },
  "goal": { desc: "a football goal, its net torn, a sapling grown through it", split: 1.1, build(m) { rlGoal(m, 1); m.seg([.3, 0, .2], [.3, 1.5, .2], .035, .025, M.TRUNK, { group: 5 }); rlCrown(m, [.3, 1.6, .2], [.35, .25, .3], 6); rlTufts(m, 8, 1.2, 7, 27); } },
  "goal-tipped": { desc: "a football goal tipped on its back", build(m) { const n = m.parts.length; rlGoal(m, 1); rlPlace(m, n, { pitch: -Math.PI / 2 + .12, at: [-.5, .06, 0] }); /* on its back, the net in the air */ rlTufts(m, 8, 1.2, 7, 28); } },
  "corner-flag": { desc: "a corner flag, its flag a faded rag", build(m) { rlBar(m, [0, 0, 0], [0, .9, 0], 1, .015); m.box([.12, .8, 0], [.12, .08, .006], M.ACCENT, { group: 2, dir: [1, -.3, .1], paint: rlWorn(.2, 0) }); rlTufts(m, 5, .4, 3, 29); } },
  "floodlight": { desc: "a floodlight pylon, one lamp still flickering with fairy light", glow: true, split: 2.4, build(m) { const H = 4.0; for (const [x, z] of [[-.25, -.25], [.25, -.25], [.25, .25], [-.25, .25]]) rlBar(m, [x * 1.6, 0, z * 1.6], [x * .5, H, z * .5], 1, .035); for (let i = 1; i < 8; i++) { const y = i * H / 8, k = 1.6 - (1.1 * y / H); rlBar(m, [-.25 * k, y, -.25 * k], [.25 * k, y + H / 8, .25 * k], 2, .015); rlBar(m, [.25 * k, y, -.25 * k], [-.25 * k, y + H / 8, .25 * k], 2, .015); } for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) m.box([-.3 + c * .3, H + .2 + r * .25, .1], [.12, .1, .06], M.FRAME, { group: 3, round: .02, paint: p => p[2] > .14 ? (r === 1 && c === 1 ? M.MAGIC2 : M.SHADES) : rlWorn(.4, .1)(p) }); rlGlow(m, [0, H + .45, .22], .06, 4, M.MAGIC2); rlIvy(m, [-.4, 0, .4], [-.2, 2.4, .2], 5, 30); } },
  "basketball-hoop": { desc: "a basketball hoop on a leaning post, its net gone", split: 1.8, build(m) { const n = m.parts.length; rlBar(m, [0, 0, 0], [0, 2.4, 0], 1, .05); m.box([.15, 2.5, 0], [.03, .3, .45], M.BELLY, { group: 2, paint: p => Math.abs(p[1] - 2.4) < .1 && Math.abs(p[2]) < .14 && Math.abs(Math.abs(p[2]) - .12) < .02 ? M.ACCENT : rlWorn(.25, .1)(p) }); for (let k = 0; k < 8; k++) { const a = k / 8 * 6.283, b = (k + 1) / 8 * 6.283; rlBar(m, [.36 + Math.cos(a) * .17, 2.32, Math.sin(a) * .17], [.36 + Math.cos(b) * .17, 2.32, Math.sin(b) * .17], 3, .012, M.ACCENT); } rlPlace(m, n, { pitch: -.2 }); rlTufts(m, 8, 1.0, 5, 31); } },
};
function rlGoal(m, g) { for (const z of [-1.4, 1.4]) rlBar(m, [0, 0, z], [0, 1.0, z], g, .035, M.BELLY); rlBar(m, [0, 1.0, -1.4], [0, 1.0, 1.4], g, .035, M.BELLY); for (const z of [-1.4, 1.4]) rlBar(m, [0, 1.0, z], [-.6, 0, z], g + 1, .02, M.BELLY); m.box([-.3, .5, 0], [.012, .55, 1.38], M.CLOTH, { dir: [.6, 1, 0], group: g + 2, paint: p => ((p[1] * 12) % 1 < .3 || ((p[2] + 5) * 12) % 1 < .3) ? M.CLOTH : M.SHADES }); m.ell([-.3, .4, .5], [.2, .3, .4], M.CLOTH, { group: g + 2, cut: true }); }
// Suggested arrangements (model units from the clearing's middle; x right, z towards the viewer). The decal goes first, under everything.
const SPORTS_AT = {
  tennis: [["tennis-court", 0, 0], ["tennis-net", 0, 0], ["umpire-chair", 0, -2.6], ["court-fence", -2.5, -2.9], ["court-fence", 2.5, -2.9], ["tennis-balls", 3.5, 1.8]],
  baseball: [["baseball-diamond", 0, 0], ["backstop", -2.9, 0], ["scoreboard", 3.5, -2.6]],
  football: [["football-pitch", 0, 0], ["goal", -5.2, 0], ["goal-tipped", 5.2, 0], ["corner-flag", -5.2, -3.3], ["corner-flag", 5.2, 3.3], ["floodlight", 6.2, -4.0]],
  basketball: [["basketball-hoop", 0, 0]],
};
// The suggested arrangements in metres: { playground: [{ id, x, z }], tennis, baseball, football, basketball }.
export function relicLayouts(st = {}, ppm = 16) {
  const k = id => witchPixelsPerUnit(st) * RELIC_BY_ID[id].size / ppm, at = list => list.map(([id, x, z]) => ({ id, x: +(x * k(id)).toFixed(1), z: +(z * k(id)).toFixed(1) }));
  return { playground: at(PLAYGROUND_AT), ...Object.fromEntries(Object.entries(SPORTS_AT).map(([n, l]) => [n, at(l)])) };
}

// ---------------- the table ----------------
export const RELICS = [
  ...Object.entries(MODERN).map(([id, d]) => ({ id, family: "modern", size: 1, split: null, ...d })),
  ...Object.entries(PLAYGROUND).map(([id, d]) => ({ id, family: "playground", size: 1.1, split: null, ...d })),
  ...Object.entries(SPORTS).map(([id, d]) => ({ id, family: "sports", size: 1.1, split: null, ...d })),
];
export const RELIC_BY_ID = Object.fromEntries(RELICS.map(d => [d.id, d]));
export function relicColours(st = {}) {
  const leaf = st.leafHue ?? .3, trunk = st.trunkHue ?? .07;
  return {
    [M.BODY]: [92, 118, 140], [M.BODY2]: [132, 74, 42], [M.BODY3]: [34, 32, 38], [M.FRAME]: [150, 152, 158], [M.SHADES]: [24, 24, 30], // faded car paint, rust, tyres and rubber, worn metal, dark glass and gaps
    [M.STONE]: [72, 72, 80], [M.STONED]: [34, 34, 40], [M.CLOTH]: [214, 210, 196], [M.BELLY]: [222, 218, 206], [M.ACCENT]: [214, 92, 40], // tarmac, cracks, faded white paint, enamel, cone orange
    [M.HAT1]: [54, 84, 120], [M.HAT2]: [86, 112, 92], // a sign's or slide's blue, a court's green
    [M.MOSS]: hsv2rgb(.26, .45, .45), [M.TRUNK]: hsv2rgb(trunk, .45, .36), [M.BARK2]: [98, 74, 52], [M.BARKD]: hsv2rgb(trunk + .03, .5, .17),
    [M.LEAF]: hsv2rgb(leaf, .55, .45), [M.LEAF2]: hsv2rgb(leaf - .03, .5, .6), [M.LEAF3]: hsv2rgb(leaf + .03, .6, .28),
    [M.WOOD]: [120, 88, 56], [M.STRAW]: [180, 156, 104], [M.WATER]: [44, 70, 96], [M.NOSE]: [14, 12, 18],
    [M.GLOW]: [255, 170, 80], [M.MAGIC]: hsv2rgb(st.magicHue ?? .2, .55, 1), [M.MAGIC2]: hsv2rgb(st.magicHue ?? .2, .15, 1), [M.LINE]: [24, 22, 30],
  };
}
// One relic, drawn: { whole, top, bot, crownY, metres: { width, height, footprint } }, like the world decorations.
export function relicSprite(id, st = {}, { ppm = 16 } = {}) {
  const d = RELIC_BY_ID[id]; if (!d) throw new Error(`no relic "${id}"`);
  const m = new Model({ blend: .04 }); d.build(m); m.ell([0, .004, 0], [.01, .004, .01], M.NOSE, { group: 0 });
  const s = witchPixelsPerUnit(st) * d.size, { sp, project } = render(m, { scale: s });
  let reach = 0; for (const q of m.parts) { if (q.extra || q.cut) continue; const ends = q.type === "cone" ? [[q.a, q.r1], [q.b, q.r2]] : [[q.c, q.r ? Math.max(...q.r) : Math.max(q.h[0], q.h[2])]]; for (const [c, r] of ends) if (c[1] - r < .3) reach = Math.max(reach, Math.hypot(c[0], c[2]) + r); }
  // crop to what is drawn (a flat box's bounding sphere leaves empty rows above it)
  let x0 = sp.w, x1 = -1, y0 = sp.h; for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); }
  const W = x1 - x0 + 1, H = sp.h - y0, crop = new Sprite(W, H), top = new Sprite(W, H), bot = new Sprite(W, H);
  const crownY = d.split == null ? 0 : Math.max(0, Math.round(project([0, d.split, 0])[1]) - y0);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = (y + y0) * sp.w + x + x0, mm = sp.m[i]; if (!mm) continue; const n = [sp.n[i * 3], sp.n[i * 3 + 1], sp.n[i * 3 + 2]]; crop.put(x, y, mm, ...n); (y < crownY ? top : bot).put(x, y, mm, ...n); }
  crop.bodyH = sp.bodyH;
  const unit = s / ppm, [px, py] = project([0, 0, 0]), ox = +(px - x0).toFixed(1), oy = +(py - y0).toFixed(1); // origin: where its middle on the ground lands (place this at its spot in an arrangement)
  return { whole: crop, top, bot, crownY, origin: { x: ox, y: oy }, metres: { width: +(W / ppm).toFixed(1), height: +(H / ppm).toFixed(1), footprint: +(reach * unit).toFixed(1) } };
}
// Where a point on the ground (x, z metres from an arrangement's middle) lands on screen, in pixels from the middle, at the game's view (turned towards).
export function groundOffset(x, z, ppm = 16) { const cy = Math.cos(YAW.towards), sy = Math.sin(YAW.towards); return [(x * cy - z * sy) * ppm, (x * sy + z * cy) * Math.sin(PITCH) * ppm]; }
