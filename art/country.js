// Countryside and street pieces (Ed, 2026-10-04: farming and street decorations, and small scenes of
// them): the forest reclaimed the farms and roads long ago. Rusted, mossy, sunk, overgrown, moonlit;
// no brands, logos or readable text anywhere (signs are blank or carry a plain symbol). Families:
//   farm    a tractor, trailers (one with hay), round and square hay bales (some mouldy), fence
//           sections (whole, broken, leaning), a gate, a feed trough, a water butt, a scarecrow, a milk
//           churn, a wheelbarrow, a plough;
//   street  lampposts (upright; one still flickering warm), road signs (blank or symbol-only, leaning),
//           a bench, heaps of bin bags, a bus shelter and its stop sign, a litter bin, a parked car;
//   scene   the pieces the small scenes (scenes.js) are built from: a picnic, an allotment, a lay-by,
//           festival remnants, a woodcutter's clearing, a fly-tip, an apiary.
// Mostly unlit; only the flagged pieces glow (the warm lamppost, glowing fungi, glow sticks). Built in
// 3D (model3d.js) at the witch's scale (she is about 1.3 units tall, so a unit is about 1.3 real metres),
// turned towards the viewer; the prototype mirrors them.
import { M, Sprite, hsv2rgb } from "./core.js";
import { Model, render, v3 } from "./model3d.js";
import { witchPixelsPerUnit } from "./witch.js";
import { carModel } from "./relics.js";

const ctHash = (a, b = 0) => { const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return x - Math.floor(x); };
const ctCell = (p, k, s = 0) => ctHash(Math.floor(p[0] * k) + Math.floor(p[2] * k) * 57 + s, Math.floor(p[1] * k));
// weathering: rust and moss patches over a material
const ctWorn = (rust = .2, moss = .15) => p => { const r = ctCell(p, 16, 3), n = ctCell(p, 6, 5); return n < moss && p[1] > .1 ? M.MOSS : r > 1 - rust * .7 ? M.BODY2 : undefined; };
// weathered planks: grain along x, dark seams, moss
const ctPlank = (k = 7, moss = .15) => p => { const n = ctCell(p, 6, 9); if (n < moss && p[1] > .15) return M.MOSS; if (Math.abs(Math.sin(p[1] * 60 + Math.sin(p[0] * 9) * 1.5)) > .97) return M.BARK2; return ctCell(p, k * 3, 2) > .9 ? M.BARKD : undefined; };
const ctTufts = (m, n, R, g, seed, cx = 0, cz = 0) => { for (let i = 0; i < n; i++) { const a = ctHash(seed, i) * 6.283, d = R * Math.sqrt(ctHash(i, seed)); m.ell([cx + Math.cos(a) * d, .07, cz + Math.sin(a) * d * .7], [.07, .1 + ctHash(i, 4) * .08, .07], M.LEAF2, { group: g + (i % 3), paint: p => p[1] > .13 ? M.LEAF : undefined }); } };
const ctFern = (m, c, g, k = 1) => { for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283 + c[0], d = [Math.cos(a), 0, Math.sin(a)]; m.chain([[...c, .03 * k], [...v3.add(c, v3.add(v3.mul(d, .25 * k), [0, .2 * k, 0])), .025 * k], [...v3.add(c, v3.add(v3.mul(d, .5 * k), [0, .05 * k, 0])), .01 * k]], i % 2 ? M.LEAF : M.LEAF2, { group: g }); } };
const ctIvy = (m, from, to, g, seed) => { const pts = []; for (let k = 0; k <= 4; k++) pts.push([...v3.add(v3.lerp(from, to, k / 4), [(ctHash(seed, k) - .5) * .12, 0, .02]), .03]); m.chain(pts, M.LEAF, { group: g, paint: p => ctCell(p, 30) < .3 ? M.LEAF2 : undefined }); };
const ctCrown = (m, c, r, g) => m.ell(c, r, M.LEAF, { group: g, rough: .04, paint: p => { const n = ctCell(p, 10, 2); return p[1] < c[1] - .15 || n < .2 ? M.LEAF3 : n > .8 ? M.LEAF2 : undefined; } });
const ctBar = (m, a, b, g, r = .025, mat = M.FRAME, paint = ctWorn(.35, .05)) => m.seg(a, b, r, r, mat, { group: g, paint });
const ctGlow = (m, c, r, g, mat = M.MAGIC) => m.ell(c, [r, r, r], mat, { group: g, extra: true });
const ctMoss = (m, c, r, g) => m.ell(c, r, M.MOSS, { group: g, rough: .03, paint: p => ctCell(p, 12, 4) < .25 ? M.LEAF2 : ctCell(p, 9, 6) < .15 ? M.LEAF3 : undefined });
// A cylinder with flat ends from a to b: a capsule, cut square at both ends (the ends drawn in `end`, a material or a paint).
function ctCyl(m, a, b, r, mat, g, o = {}) {
  const d = v3.norm(v3.sub(b, a)), endPaint = typeof o.end === "function" ? o.end : undefined, endMat = typeof o.end === "number" ? o.end : endPaint ? mat : mat;
  m.seg(a, b, r, r, mat, { group: g, paint: o.paint });
  for (const [e, s] of [[b, 1], [a, -1]]) m.box(v3.add(e, v3.mul(d, s * r * .75)), [r * .75, r * 1.25, r * 1.25], endMat, { dir: v3.mul(d, s), up: Math.abs(d[1]) > .9 ? [1, 0, 0] : [0, 1, 0], round: .005, group: g, cut: true, paint: endPaint });
}
// Rings and radial cracks on a log's or stump's cut end (centre c, axis along `axis` 0 x, 1 y, 2 z).
const ctRings = (c, axis) => p => { const q = [0, 1, 2].filter(i => i !== axis), r = Math.hypot(p[q[0]] - c[q[0]], p[q[1]] - c[q[1]]); return (r * 34) % 1 < .22 ? M.BARK2 : ctCell(p, 30) < .05 ? M.BARKD : M.STRAW; };
// A wheel: a tyre (rubber, treads) round a rusty hub; axis along z.
const ctWheel = (m, c, r, w, g, flat = false) => m.ell(c, [r, flat ? r * .8 : r, w], M.BODY3, { group: g, paint: p => { const d = Math.hypot(p[0] - c[0], p[1] - c[1]); if (d < r * .45) return ctCell(p, 20) < .3 ? M.BODY2 : M.FRAME; return d > r * .8 && Math.abs(Math.sin(Math.atan2(p[1] - c[1], p[0] - c[0]) * 14)) < .3 ? M.NOSE : undefined; } });

// Turns the parts and planes added since `from` (and their paint) by yaw (about y), pitch (about z: nose up) and roll (about x), then moves them by `at`.
function ctPlace(m, from, { yaw = 0, pitch = 0, roll = 0, at = [0, 0, 0] } = {}, fromFlat = m.flats.length) {
  const R = (v, a, i, j) => { const c = Math.cos(a), s = Math.sin(a), o = [...v]; o[i] = v[i] * c - v[j] * s; o[j] = v[i] * s + v[j] * c; return o; };
  const rot = v => R(R(R(v, roll, 1, 2), pitch, 0, 1), -yaw, 0, 2), inv = v => R(R(R(v, yaw, 0, 2), -pitch, 0, 1), -roll, 1, 2);
  const fwd = p => v3.add(rot(p), at), back = p => inv(v3.sub(p, at));
  for (const q of m.parts.slice(from)) {
    if (q.type === "cone") { q.a = fwd(q.a); q.b = fwd(q.b); } else { q.c = fwd(q.c); q.axes = q.axes.map(rot); }
    if (q.paint) { const f = q.paint; q.paint = (p, part) => f(back(p), part); }
  }
  for (const f of m.flats.slice(fromFlat)) { f.c = fwd(f.c); f.u = rot(f.u); f.v = rot(f.v); }
}
const mark = m => [m.parts.length, m.flats.length];
const place = (m, [n, nf], o) => ctPlace(m, n, o, nf);

// ---------------- building blocks ----------------
function ctFence(m, g, { broken = false, len = 1.0 } = {}) { // a post-and-rail section along x, from -len to len
  for (const x of [-len, len]) m.box([x, .45, 0], [.06, .47, .06], M.WOOD, { round: .02, group: g, rough: .006, paint: ctPlank(7, .3) });
  for (const [i, y] of [.3, .55, .8].entries()) {
    if (broken && i === 1) { // the middle rail snapped, both halves hanging
      m.box([-len * .55, y - .12, .03], [len * .48, .04, .022], M.WOOD, { dir: [1, -.35, 0], round: .015, group: g + 1, paint: ctPlank() });
      m.box([len * .7, y - .2, .04], [len * .34, .04, .022], M.WOOD, { dir: [1, .8, 0], round: .015, group: g + 2, paint: ctPlank() }); continue;
    }
    if (broken && i === 2) continue; // the top rail gone
    m.box([0, y, .07], [len + .06, .045, .022], M.WOOD, { round: .015, group: g + 1, paint: ctPlank() });
  }
}
function ctHayRound(m, c, g, { mould = false, along = 2 } = {}) { // a round bale lying on its side, its axis along x (along 0) or z (2)
  const r = .56, w = .44, a = [...c], b = [...c]; a[1] = b[1] = c[1] + r; a[along] -= w; b[along] += w;
  const straw = p => { if (mould && (ctCell(p, 5, 11) < .32 || (p[1] < c[1] + .25 && ctCell(p, 9, 3) < .6))) return ctCell(p, 14) < .4 ? M.BODY3 : M.SKIN; const n = ctCell(p, 22, 1); return n < .18 ? M.BARK2 : n > .85 ? M.BELLY : undefined; };
  const ends = p => { const q = along === 2 ? [p[0] - c[0], p[1] - a[1]] : [p[2] - c[2], p[1] - a[1]], rr = Math.hypot(...q), an = Math.atan2(q[1], q[0]) / 6.283; if (mould && ctCell(p, 6, 2) < .35) return M.SKIN; return (rr * 12 + an) % 1 < .3 ? M.BARK2 : M.STRAW; };
  ctCyl(m, a, b, r, M.STRAW, g, { paint: straw, end: ends });
  if (!mould) for (const t of [-.25, .25]) { const k = [...c]; k[along] += t; m.ell([k[0], c[1] + r, k[2]], along === 2 ? [r + .012, r + .012, .012] : [.012, r + .012, r + .012], M.CLOTH, { group: g + 1 }); } // the net wrap's bands
}
function ctHaySquare(m, c, g, { mould = false, yaw = 0 } = {}) { // a small square bale, its strings round it
  const dir = [Math.cos(yaw), 0, Math.sin(yaw)];
  m.box(v3.add(c, [0, .19, 0]), [.4, .19, .23], M.STRAW, { dir, round: .05, group: g, rough: .008, paint: p => { if (mould && ctCell(p, 5, 7) < .35) return ctCell(p, 13) < .4 ? M.BODY3 : M.SKIN; const u = (p[0] - c[0]) * dir[0] + (p[2] - c[2]) * dir[2]; if (Math.abs(Math.abs(u) - .2) < .02) return M.BARK2; const n = ctCell(p, 22, 1); return n < .16 ? M.BARK2 : n > .86 ? M.BELLY : undefined; } });
}
const ctLog = (m, a, b, r, g) => ctCyl(m, a, b, r, M.TRUNK, g, { paint: p => { const n = ctCell(p, 14, 2); return n < .15 ? M.BARKD : n > .88 ? M.BARKL : ctCell(p, 5, 8) < .12 && p[1] > a[1] ? M.MOSS : undefined; }, end: ctRings(a, v3.sub(b, a).map(Math.abs).indexOf(Math.max(...v3.sub(b, a).map(Math.abs)))) });
const ctTyre = (m, c, g, o = {}) => { m.ell(c, [.3, .1, .3], M.BODY3, { group: g, axes: o.axes, paint: p => Math.abs(Math.sin(Math.atan2(p[2] - c[2], p[0] - c[0]) * 16)) < .25 ? M.NOSE : ctCell(p, 9, 4) < .1 ? M.MOSS : undefined }); m.ell(c, [.15, .2, .15], M.NOSE, { group: g, axes: o.axes, cut: true }); };
const ctMushrooms = (m, c, n, g, seed, { cap = M.EAR, k = 1 } = {}) => { for (let i = 0; i < n; i++) { const a = ctHash(seed, i) * 6.283, d = .16 * k * Math.sqrt(ctHash(i, seed)), x = c[0] + Math.cos(a) * d, z = c[2] + Math.sin(a) * d, h = (.06 + ctHash(i, 3) * .09) * k; m.seg([x, c[1], z], [x, c[1] + h, z], .012 * k, .01 * k, M.CLOTH, { group: g }); m.ell([x, c[1] + h, z], [.04 * k, .022 * k, .04 * k], cap, { group: g + 1 }); } };
// a flat panel: crossbars FRAME, panes of dark glass, some missing, some cracked (seed picks which)
const ctPanes = (cols, rows, seed, missing = .35) => (s, t) => { const u = (s + 1) / 2 * cols, v = (t + 1) / 2 * rows; if (u % 1 < .07 || u % 1 > .93 || v % 1 < .07 || v % 1 > .93) return M.FRAME; const k = Math.floor(u) + Math.floor(v) * 7; if (ctHash(k, seed) < missing) return null; return Math.abs(Math.sin((u + v * .7) * 9 + k)) < .06 ? M.STONED : M.SHADES; };
// a plate's border (a road sign's)
const ctTriangle = (border, fill, sym) => (s, t) => { const half = (1 - t) / 2; if (t < -1 || Math.abs(s) > half) return null; const edge = Math.min(half - Math.abs(s), t + 1); if (edge < .17) return border; return sym(s, t) ? M.NOSE : fill; };

// ---------------- farm ----------------
const FARM = {
  "tractor": { desc: "an old tractor rusted through and sunk to its axles in moss, a sapling up through its cab", split: 2.2, build(m) {
    const k = -.2; // how far it has sunk
    for (const z of [-.62, .62]) ctWheel(m, [-.6, .58 + k, z], .58, .17, 1 + (z > 0 ? 1 : 0));
    for (const z of [-.5, .5]) ctWheel(m, [.95, .34 + k, z], .34, .11, 3, true);
    m.box([.5, .64 + k, 0], [.62, .2, .25], M.BODY, { round: .08, group: 4, paint: p => Math.abs(p[2]) > .2 && p[0] > .2 && ((p[0] * 12) % 1) < .35 && Math.abs(p[1] - .64 - k) < .1 ? M.SHADES : ctWorn(.5, .2)(p) }); // the bonnet, its louvres
    m.box([1.1, .66 + k, 0], [.06, .2, .22], M.FRAME, { round: .04, group: 4, paint: p => ((p[1] * 18) % 1) < .4 ? M.SHADES : ctWorn(.5, .1)(p) }); // the grille
    m.box([.35, .38 + k, 0], [.75, .13, .17], M.FRAME, { round: .05, group: 5, paint: ctWorn(.55, .1) }); // the chassis
    m.box([-.55, .74 + k, 0], [.32, .16, .42], M.BODY, { round: .06, group: 6, paint: ctWorn(.55, .25) });
    for (const z of [-.62, .62]) { m.ell([-.6, .58 + k, z], [.66, .66, .2], M.BODY, { group: 7 + (z > 0 ? 1 : 0), paint: ctWorn(.6, .3) }); m.ell([-.6, .58 + k, z], [.6, .6, .3], M.BODY2, { group: 7 + (z > 0 ? 1 : 0), cut: true }); m.box([-.6, .1 + k, z], [.8, .55, .3], M.BODY2, { group: 7 + (z > 0 ? 1 : 0), cut: true }); } // mudguards
    m.box([-.62, 1.0 + k, 0], [.17, .04, .17], M.BODY3, { round: .03, group: 9 }); m.box([-.78, 1.17 + k, 0], [.03, .17, .16], M.BODY3, { round: .03, group: 9 }); // the seat
    ctBar(m, [-.25, .9 + k, 0], [-.05, 1.2 + k, 0], 10, .02); m.flat([-.04, 1.22 + k, 0], [0, 0, 1], [.5, .87, 0], .13, .13, (s, t) => Math.abs(Math.hypot(s, t) - .85) < .17 ? M.BODY3 : null, { group: 10, bend: .1 }); // the steering wheel
    for (const [x, z] of [[-1.05, -.55], [-1.05, .55], [-.2, -.55], [-.2, .55]]) ctBar(m, [x, .9 + k, z], [x * .95, 2.0 + k, z * .95], 11, .03, M.BODY, ctWorn(.6, .05)); // the cab's frame
    m.box([-.62, 2.03 + k, -.2], [.5, .035, .5], M.BODY, { round: .02, group: 12, dir: [1, 0, .25], paint: p => p[1] > 2.03 + k && ctCell(p, 6, 2) < .5 ? M.MOSS : ctWorn(.7, .3)(p) }); // the roof, slid askew
    ctBar(m, [.8, .8 + k, .18], [.8, 1.55 + k, .18], 13, .035, M.BODY3); // the exhaust
    m.seg([-.45, 0, .05], [-.38, 2.5, .1], .06, .035, M.TRUNK, { group: 14, rough: .01 }); ctCrown(m, [-.36, 2.6, .1], [.5, .38, .45], 15); // the sapling through the cab
    ctMoss(m, [-.1, 0, 0], [1.75, .26, 1.05], 16); ctFern(m, [1.2, .05, .7], 17); ctFern(m, [-1.3, .05, .8], 18, .8); ctTufts(m, 14, 2.2, 19, 1);
  } },
  "trailer": { desc: "a farm trailer, its boards silver with age, its tailgate dropped, a fern in its bed", build(m) {
    m.box([0, .58, 0], [1.15, .05, .6], M.WOOD, { round: .02, group: 1, paint: ctPlank() }); // the bed
    for (const z of [-.6, .6]) m.box([0, .78, z], [1.15, .2, .03], M.WOOD, { round: .02, group: 2, paint: ctPlank(7, .25) });
    m.box([-1.15, .78, 0], [.03, .2, .6], M.WOOD, { round: .02, group: 3, paint: ctPlank() });
    m.box([1.32, .38, 0], [.03, .2, .58], M.WOOD, { round: .02, group: 4, dir: [.25, -1, 0], up: [1, .25, 0], paint: ctPlank(7, .3) }); // the tailgate, dropped
    for (const z of [-.7, .7]) ctWheel(m, [0, .33, z], .33, .11, 5, z > 0);
    m.box([0, .45, 0], [1.0, .06, .5], M.FRAME, { round: .03, group: 6, paint: ctWorn(.6, .1) });
    for (const z of [-.3, .3]) ctBar(m, [-1.1, .5, z], [-1.8, .4, 0], 7, .035, M.FRAME, ctWorn(.6, .1)); ctBar(m, [-1.75, .4, 0], [-1.75, 0, 0], 7, .03, M.FRAME, ctWorn(.6, .1)); // the drawbar on its jack
    ctFern(m, [.3, .62, 0], 8, .9); ctTufts(m, 12, 2.0, 9, 2);
  } },
  "trailer-hay": { desc: "a trailer still loaded with hay bales, the top ones slumped and mouldy", build(m) {
    FARM.trailer.build(m);
    for (const [x, z, y, mould, yaw] of [[-.7, -.3, .63, 0, 0], [-.7, .3, .63, 0, 0], [0, -.3, .63, 0, 0], [0, .3, .63, 1, 0], [.7, -.3, .63, 0, 0], [-.4, 0, 1.01, 1, .2], [.35, -.1, 1.01, 1, -.3]]) ctHaySquare(m, [x, y, z], 20 + Math.round((x + 1) * 3) + (y > .9 ? 9 : 0), { mould: !!mould, yaw });
  } },
  "hay-round": { desc: "a round hay bale on its end, its net wrap perished", build(m) { ctHayRound(m, [0, 0, 0], 1); ctTufts(m, 8, 1.0, 4, 3); } },
  "hay-round-side": { desc: "a round hay bale lying along the ground", build(m) { ctHayRound(m, [0, 0, 0], 1, { along: 0 }); ctTufts(m, 8, 1.0, 4, 4); } },
  "hay-round-mouldy": { desc: "a round bale gone black with mould and sagging, mushrooms at its foot", build(m) { const n = mark(m); ctHayRound(m, [0, 0, 0], 1, { mould: true }); place(m, n, { roll: .06, at: [0, -.06, 0] }); ctMushrooms(m, [.5, 0, .35], 6, 3, 1); ctTufts(m, 10, 1.1, 5, 5); } },
  "hay-square": { desc: "a small square hay bale", build(m) { ctHaySquare(m, [0, 0, 0], 1); ctTufts(m, 5, .6, 3, 6); } },
  "hay-square-mouldy": { desc: "a square bale gone soft and mouldy", build(m) { ctHaySquare(m, [0, 0, 0], 1, { mould: true, yaw: .3 }); ctTufts(m, 6, .6, 3, 7); } },
  "hay-stack": { desc: "square bales stacked three high, the stack slumping, one fallen", split: 1.6, build(m) {
    const at = [[-.42, 0, -.25], [.42, 0, -.25], [-.42, 0, .25], [.42, 0, .25], [0, .38, -.25], [0, .38, .25], [-.05, .76, 0]];
    at.forEach(([x, y, z], i) => ctHaySquare(m, [x, y, z], 1 + i, { mould: i === 6 || i === 2, yaw: (ctHash(i, 9) - .5) * .25 }));
    const n = mark(m); ctHaySquare(m, [0, 0, 0], 10, { mould: true }); place(m, n, { roll: 1.2, yaw: .8, at: [1.1, .15, .45] }); ctTufts(m, 10, 1.4, 12, 8);
  } },
  "fence": { desc: "a post-and-rail fence section, grey with age", build(m) { ctFence(m, 1); ctTufts(m, 6, 1.0, 4, 9); } },
  "fence-broken": { desc: "a fence section, its top rail gone and its middle rail snapped", build(m) { ctFence(m, 1, { broken: true }); ctTufts(m, 8, 1.0, 4, 10); } },
  "fence-leaning": { desc: "a fence section leaning over, ivy through its rails", build(m) { const n = mark(m); ctFence(m, 1); place(m, n, { roll: -.45 }); ctIvy(m, [-.8, 0, .1], [.4, .55, -.2], 5, 11); ctTufts(m, 8, 1.0, 6, 11); } },
  "gate": { desc: "a five-bar field gate hanging open on its post, its latch post fallen", split: null, build(m) {
    m.box([0, .62, 0], [.08, .64, .08], M.WOOD, { round: .02, group: 1, paint: ctPlank(7, .35) }); // the hinge post
    const n = mark(m), L = 2.0;
    for (let i = 0; i < 5; i++) m.box([L / 2, .22 + i * .17, 0], [L / 2, .03, .02], M.WOOD, { round: .012, group: 2, paint: ctPlank() });
    for (const x of [.05, L - .05]) m.box([x, .56, 0], [.04, .4, .025], M.WOOD, { round: .012, group: 3, paint: ctPlank() });
    m.box([L / 2, .56, .02], [L / 2 * 1.04, .025, .02], M.WOOD, { dir: [L, .66, 0], round: .01, group: 4, paint: ctPlank() }); // the brace
    ctBar(m, [.1, .9, .03], [.1, .3, .03], 4, .015, M.FRAME); // a hinge strap
    place(m, n, { yaw: .55, pitch: -.04, at: [0, 0, .08] });
    const n2 = mark(m); m.box([0, .62, 0], [.08, .64, .08], M.WOOD, { round: .02, group: 5, paint: ctPlank(7, .4) }); place(m, n2, { roll: 1.45, at: [2.0, .08, .3] }); // the latch post, fallen
    ctTufts(m, 12, 1.8, 6, 12);
  } },
  "trough": { desc: "a galvanised feed trough on short legs, rainwater and leaves in it", build(m) {
    m.box([0, .36, 0], [.72, .17, .24], M.FRAME, { round: .07, group: 1, paint: ctWorn(.5, .15) }); m.box([0, .52, 0], [.68, .15, .2], M.FRAME, { round: .06, group: 1, cut: true });
    m.box([0, .43, 0], [.67, .01, .19], M.WATER, { group: 2, paint: p => ctCell(p, 11) < .2 ? M.LEAF3 : ctCell(p, 9, 3) < .12 ? M.BARK2 : undefined });
    for (const x of [-.6, .6]) for (const z of [-.16, .16]) ctBar(m, [x, .2, z], [x, 0, z * 1.3], 3, .025);
    ctTufts(m, 10, 1.1, 4, 13);
  } },
  "water-butt": { desc: "a water butt on two bricks, moss down its side, its lid cracked", build(m) {
    for (const x of [-.18, .18]) m.box([x, .08, 0], [.1, .08, .2], M.STONE, { round: .02, group: 1, paint: p => ctCell(p, 8) < .3 ? M.MOSS : undefined });
    ctCyl(m, [0, .16, 0], [0, 1.0, 0], .3, M.HAT2, 2, { paint: p => Math.abs(Math.sin(p[1] * 22)) > .94 ? M.LEAF3 : ctCell(p, 7, 2) < .22 && p[2] > 0 ? M.MOSS : undefined });
    ctCyl(m, [0, .99, 0], [0, 1.05, 0], .32, M.HAT2, 3, { end: p => Math.abs(p[0] - p[2] * .4) < .015 ? M.NOSE : ctCell(p, 10, 3) < .3 ? M.MOSS : M.HAT2 });
    ctBar(m, [.1, .3, .28], [.1, .3, .38], 4, .03, M.FRAME); ctTufts(m, 8, .8, 5, 14);
  } },
  "scarecrow": { desc: "a scarecrow in a ragged coat and straw hat, a crow on its arm", split: 1.6, build(m) {
    m.seg([0, 0, 0], [0, 1.9, 0], .04, .035, M.WOOD, { group: 1 }); m.seg([-.6, 1.48, 0], [.6, 1.5, 0], .03, .03, M.WOOD, { group: 1 });
    m.box([0, 1.25, 0], [.22, .36, .13], M.JACKET, { round: .08, group: 2, rough: .01, paint: p => Math.hypot(p[0] + .08, p[1] - 1.12) < .07 ? M.ACCENT : Math.hypot(p[0] - .1, p[1] - 1.35) < .06 ? M.HAT1 : undefined }); // patched
    for (const s of [-1, 1]) { m.seg([s * .18, 1.46, 0], [s * .55, 1.47, 0], .085, .07, M.JACKET, { group: 3, rough: .01 }); for (let i = 0; i < 4; i++) m.seg([s * .58, 1.47, 0], [s * (.66 + ctHash(i, s) * .08), 1.4 + i * .04, (ctHash(s, i) - .5) * .1], .015, .005, M.STRAW, { group: 4 }); }
    for (let i = 0; i < 5; i++) m.seg([(i - 2) * .07, .92, 0], [(i - 2) * .09, .78 - ctHash(i) * .1, .02], .015, .006, M.STRAW, { group: 4 }); // straw out of the coat's hem
    m.ell([0, 1.78, 0], [.15, .17, .14], M.CLOTH, { group: 5, paint: p => p[2] > .1 && Math.abs(p[1] - 1.8) < .03 && Math.abs(Math.abs(p[0]) - .06) < .03 ? M.NOSE : Math.abs(p[1] - 1.66) < .02 ? M.BARK2 : undefined }); // a sacking head, button eyes
    m.ell([0, 1.9, 0], [.3, .025, .28], M.STRAW, { group: 6, rough: .006 }); m.ell([0, 1.97, 0], [.14, .09, .13], M.STRAW, { group: 6, paint: p => Math.abs(p[1] - 1.93) < .02 ? M.ACCENT : undefined }); // the straw hat
    const b = [.5, 1.6, .02]; m.ell(b, [.1, .06, .05], M.NOSE, { group: 7, dir: [1, .3, 0] }); m.ell(v3.add(b, [.09, .06, 0]), [.045, .045, .04], M.NOSE, { group: 7 }); m.seg(v3.add(b, [.12, .06, 0]), v3.add(b, [.18, .04, 0]), .012, .003, M.STONED, { group: 7 }); m.seg(v3.add(b, [-.06, 0, 0]), v3.add(b, [-.18, -.04, 0]), .03, .01, M.NOSE, { group: 7 }); // a crow
    ctTufts(m, 8, .8, 8, 15);
  } },
  "milk-churn": { desc: "an old milk churn, dented, moss on its shoulder", build(m) {
    ctCyl(m, [0, 0, 0], [0, .52, 0], .2, M.FRAME, 1, { paint: p => Math.abs(p[1] - .08) < .02 || Math.abs(p[1] - .45) < .02 ? M.STONED : ctWorn(.3, .1)(p) });
    m.seg([0, .52, 0], [0, .7, 0], .2, .1, M.FRAME, { group: 1, paint: p => ctCell(p, 8, 2) < .4 ? M.MOSS : ctWorn(.3, 0)(p) }); ctCyl(m, [0, .68, 0], [0, .8, 0], .1, M.FRAME, 1);
    ctCyl(m, [0, .79, 0], [0, .84, 0], .125, M.FRAME, 2, { paint: ctWorn(.5, 0) }); for (const s of [-1, 1]) ctBar(m, [s * .16, .62, 0], [s * .2, .7, 0], 3, .015);
  } },
  "wheelbarrow": { desc: "a rusted wheelbarrow, a flat tyre, a fern growing in its tray", build(m) {
    const n = mark(m);
    m.box([0, .42, 0], [.45, .16, .3], M.HAT1, { round: .06, group: 1, paint: ctWorn(.6, .15) }); m.box([0, .55, 0], [.41, .15, .26], M.BODY2, { round: .05, group: 1, cut: true });
    ctWheel(m, [.62, .17, 0], .17, .05, 2, true); for (const z of [-.12, .12]) ctBar(m, [.62, .17, z], [-.2, .3, z * 2], 3, .02);
    for (const z of [-.24, .24]) { ctBar(m, [.3, .3, z * .8], [-.95, .5, z * 1.15], 4, .022); ctBar(m, [-.35, .3, z], [-.4, 0, z], 4, .02); }
    place(m, n, { pitch: -.05 }); ctFern(m, [0, .35, 0], 6, .75); ctTufts(m, 8, 1.0, 7, 16);
  } },
  "plough": { desc: "a horse plough left in the grass, its shares rusted, bindweed over it", build(m) {
    ctBar(m, [-1.0, .62, 0], [.9, .26, 0], 1, .045, M.FRAME, ctWorn(.7, .1)); // the beam
    for (const [x, z] of [[-.4, -.08], [.15, .08], [.65, .02]]) { ctBar(m, [x, .52 - x * .2, z], [x + .1, .18, z], 2, .03, M.FRAME, ctWorn(.7, 0)); m.ell([x + .18, .16, z + .1], [.22, .13, .03], M.BODY2, { dir: [1, -.2, .7], group: 3, paint: p => ctCell(p, 14) < .3 ? M.BODY3 : undefined }); }
    ctWheel(m, [1.05, .22, 0], .22, .04, 4); for (const z of [-.18, .18]) ctBar(m, [-.9, .6, 0], [-1.45, .9, z], 5, .025, M.WOOD, ctPlank());
    ctIvy(m, [-.6, 0, .2], [.5, .4, .1], 6, 17); ctTufts(m, 12, 1.5, 7, 18);
  } },
};

// ---------------- street ----------------
function ctLamppost(m, lit) {
  m.box([0, .18, 0], [.12, .18, .12], M.HAT2, { round: .04, group: 1, paint: ctWorn(.4, .2) });
  m.seg([0, .3, 0], [0, 3.3, 0], .07, .05, M.HAT2, { group: 1, paint: ctWorn(.4, .05) });
  m.chain([[0, 3.3, 0, .05], [.12, 3.5, 0, .045], [.45, 3.58, 0, .04], [.68, 3.55, 0, .035]], M.HAT2, { group: 2, paint: ctWorn(.4, 0) });
  m.box([.74, 3.5, 0], [.22, .05, .14], M.HAT2, { round: .04, group: 3, paint: ctWorn(.5, .3) });
  m.ell([.74, 3.42, 0], [.17, .07, .11], lit ? M.GLOW : M.SHADES, { group: 3 });
  if (lit) ctGlow(m, [.74, 3.38, 0], .07, 4, M.MAGIC2);
  ctIvy(m, [0, 0, .07], [.02, 2.1, .06], 5, lit ? 19 : 20); ctIvy(m, [-.06, 0, 0], [-.05, 1.3, .04], 6, 21); ctTufts(m, 8, .8, 7, 22);
}
// a road sign's plate, facing the viewer: a mask over (s, t)
const ctSign = (m, mask, w, h, at, g, o = {}) => { const n = mark(m); ctBar(m, [0, 0, 0], [0, 1.55, 0], g, .03, M.FRAME, ctWorn(.4, .1)); m.flat([0, 1.55 + h * .7, .04], [1, 0, 0], [0, 1, 0], w, h, mask, { group: g + 1, bend: .05 }); m.box([0, 1.55 + h * .7, .02], [w * .6, h * .6, .012], M.FRAME, { group: g + 2, round: .01 }); place(m, n, { at, ...o }); };
const STREET = {
  "lamppost": { desc: "a street lamp still standing, dark, ivy up its post", split: 2.2, build(m) { ctLamppost(m, false); } },
  "lamppost-lit": { desc: "a street lamp still standing, its lamp flickering warm after all these years", glow: true, split: 2.2, build(m) { ctLamppost(m, true); } },
  "sign-blank": { desc: "a road sign leaning, its plate weathered blank", build(m) { ctSign(m, (s, t) => Math.abs(s) > .88 || Math.abs(t) > .82 ? M.BELLY : ctCell([s * 3, t * 3, 0], 4) < .2 ? M.STONED : M.HAT1, .45, .32, [0, 0, 0], 1, { roll: .22, yaw: -.15 }); ctTufts(m, 8, .8, 5, 23); } },
  "sign-triangle": { desc: "a warning sign leaning, a leaping deer on it (no words)", build(m) { ctSign(m, ctTriangle(M.ACCENT, M.BELLY, (s, t) => { const b = ((s - .02) / .3) ** 2 + ((t + .38) / .09) ** 2 < 1, head = Math.hypot(s - .3, t + .22) < .07, legs = (Math.abs(s + .2 + (t + .5) * .5) < .03 || Math.abs(s - .2 - (t + .5) * .4) < .03) && t < -.4 && t > -.62, ant = Math.abs(s - .32 + (t + .1) * .3) < .025 && t > -.18 && t < -.02; return b || head || legs || ant; }), .38, .36, [0, 0, 0], 1, { roll: -.18, pitch: .1 }); ctTufts(m, 8, .8, 5, 24); } },
  "sign-round": { desc: "a round sign bent on its pole, a plain white arrow on blue", build(m) { ctSign(m, (s, t) => { const r = Math.hypot(s, t); if (r > 1) return null; if (r > .88) return M.BELLY; const arrow = (Math.abs(t) < .13 && s > -.55 && s < .2) || (s >= .1 && s < .55 && Math.abs(t) < .5 - (s - .1) * 1.1); return arrow ? M.BELLY : ctCell([s * 3, t * 3, 0], 5) < .15 ? M.STONED : M.HAT1; }, .3, .3, [0, 0, 0], 1, { roll: .12, pitch: -.3 }); ctTufts(m, 8, .8, 5, 25); } },
  "bench": { desc: "a park bench, cast-iron ends and rotting slats, one slat gone, moss on its seat", build(m) {
    for (const x of [-.8, .8]) { m.box([x, .23, 0], [.04, .23, .22], M.FRAME, { round: .02, group: 1, paint: ctWorn(.5, .05) }); m.box([x, .55, -.2], [.04, .28, .04], M.FRAME, { round: .02, group: 1, dir: [0, 1, -.25], paint: ctWorn(.5, 0) }); m.box([x, .52, .1], [.04, .03, .17], M.FRAME, { round: .015, group: 1 }); }
    for (const z of [-.15, 0, .15]) if (z !== 0) m.box([0, .46, z], [.88, .025, .06], M.WOOD, { round: .015, group: 2, paint: ctPlank(7, .4) });
    for (const y of [.62, .76]) m.box([0, y, -.22 - (y - .62) * .25], [.88, .045, .02], M.WOOD, { round: .012, group: 3, dir: [1, 0, 0], up: [0, 1, -.25], paint: ctPlank(7, .3) });
    m.box([.45, .2, .2], [.4, .02, .05], M.WOOD, { dir: [1, -.6, .3], round: .012, group: 4, paint: ctPlank(7, .5) }); // the fallen slat
    ctTufts(m, 12, 1.2, 5, 26);
  } },
  "bin-bags": { desc: "a heap of bin bags, long faded and split, moss creeping over them", build(m) {
    const at = [[-.35, .22, -.1, .3], [.25, .2, -.2, .28], [0, .24, .25, .3], [-.05, .5, -.05, .26], [.5, .16, .25, .22], [-.6, .15, .3, .2]];
    at.forEach(([x, y, z, r], i) => { m.ell([x, y, z], [r * 1.1, r * .9, r], M.JACKET, { group: 1 + i, rough: .015, paint: p => ctCell(p, 7, i) < .18 ? M.MOSS : ctCell(p, 16, i + 3) > .93 ? M.STONED : undefined }); m.ell([x + .05, y + r * .9, z], [.06, .07, .05], M.JACKET, { group: 1 + i }); });
    for (let i = 0; i < 6; i++) m.box([.8 + ctHash(i) * .5, .02, -.1 + ctHash(i, 2) * .5], [.06, .015, .04], i % 2 ? M.BELLY : M.CLOTH, { dir: [ctHash(i, 3) - .5, 0, ctHash(i, 4) - .5], group: 8 + i }); // litter from a split bag
    ctTufts(m, 10, 1.2, 15, 27);
  } },
  "bus-shelter": { desc: "a bus shelter, most of its glass gone, ivy over its roof, a bench inside", split: 1.7, build(m) {
    for (const [x, z] of [[-1.15, -.5], [1.15, -.5], [-1.15, .45], [1.15, .45]]) ctBar(m, [x, 0, z], [x, 1.85 - z * .1, z], 1, .035);
    m.box([0, 1.9, -.02], [1.25, .04, .6], M.FRAME, { dir: [1, 0, 0], up: [0, 1, .12], round: .02, group: 2, paint: p => ctCell(p, 4, 6) < .45 && p[1] > 1.9 ? M.MOSS : ctWorn(.5, .1)(p) });
    m.flat([0, .98, -.5], [1, 0, 0], [0, 1, 0], 1.12, .82, ctPanes(4, 2, 1, .45), { group: 3, bend: .02 });
    m.flat([1.15, .98, -.02], [0, 0, 1], [0, 1, 0], .45, .82, ctPanes(2, 2, 3, .55), { group: 4, bend: .02 });
    m.box([0, .45, -.38], [.9, .03, .1], M.FRAME, { round: .02, group: 5 }); for (const x of [-.8, .8]) ctBar(m, [x, 0, -.38], [x, .44, -.38], 5, .02);
    ctIvy(m, [-1.15, 0, .46], [-.6, 1.95, .3], 6, 28); ctIvy(m, [-.5, 1.95, .5], [.6, 1.95, .1], 7, 29); m.ell([-.3, 1.98, 0], [.7, .1, .45], M.LEAF, { group: 8, rough: .03, paint: p => ctCell(p, 9) < .3 ? M.LEAF3 : undefined });
    ctTufts(m, 14, 1.8, 9, 30);
  } },
  "bus-stop-sign": { desc: "a bus stop pole, its plate a blank disc, a timetable case long empty", split: 1.6, build(m) {
    ctBar(m, [0, 0, 0], [0, 2.3, 0], 1, .035, M.FRAME, ctWorn(.4, .1));
    m.flat([0, 2.4, .04], [1, 0, 0], [0, 1, 0], .24, .24, (s, t) => { const r = Math.hypot(s, t); return r > 1 ? null : r > .8 ? M.HAT1 : r < .5 && Math.abs(t) < .15 ? M.HAT1 : M.BELLY; }, { group: 2, bend: .05 });
    m.box([0, 1.45, .06], [.16, .22, .03], M.FRAME, { round: .02, group: 3, paint: p => p[2] > .07 && Math.abs(p[0]) < .12 && Math.abs(p[1] - 1.45) < .18 ? M.SHADES : ctWorn(.5, .2)(p) });
    ctIvy(m, [0, 0, .04], [.02, 1.2, .04], 4, 31); ctTufts(m, 6, .6, 5, 32);
  } },
  "litter-bin": { desc: "a litter bin on its post, rusted through, a bag spilling out", build(m) {
    ctBar(m, [0, 0, -.2], [0, 1.0, -.2], 1, .03, M.FRAME); ctCyl(m, [0, .45, 0], [0, .95, 0], .19, M.HAT2, 2, { paint: p => ((Math.atan2(p[2], p[0]) * 4) % 1 + 1) % 1 < .12 ? M.LEAF3 : ctWorn(.5, .2)(p), end: M.NOSE });
    m.ell([.12, .98, .08], [.14, .1, .12], M.JACKET, { group: 3 }); ctTufts(m, 6, .6, 4, 33);
  } },
  "car-parked": { desc: "a car still parked where it was left, tyres flat, moss on its roof", build(m) {
    carModel(m, 1, { flat: true }); m.ell([-.25, 1.22, 0], [.55, .05, .4], M.MOSS, { group: 4, rough: .02 }); ctMoss(m, [0, 0, 0], [1.9, .14, 1.0], 5); ctFern(m, [1.4, .05, .8], 6); ctTufts(m, 14, 2.2, 7, 34);
  } },
};

// ---------------- the small scenes' pieces ----------------
const SCENE_PIECES = {
  // a picnic gone wild
  "picnic-table": { desc: "a picnic table, its planks soft with rot, bracket fungus on its legs", build(m) {
    for (const z of [-.12, 0, .12]) m.box([0, .6, z * 2], [.78, .025, .11], M.WOOD, { round: .012, group: 1, paint: ctPlank(7, .3) });
    for (const z of [-.5, .5]) m.box([0, .36, z], [.78, .025, .11], M.WOOD, { round: .012, group: 2, paint: ctPlank(7, .3) });
    for (const x of [-.6, .6]) for (const s of [-1, 1]) { m.box([x, .3, s * .22], [.03, .32, .04], M.WOOD, { dir: [0, 1, -s * .75], round: .012, group: 3, paint: ctPlank() }); m.box([x, .34, 0], [.03, .03, .6], M.WOOD, { round: .01, group: 3 }); }
    for (const [x, y, z] of [[-.6, .25, .2], [-.6, .17, .25], [.6, .4, -.15]]) m.ell([x + .04, y, z], [.07, .02, .06], M.EAR, { group: 4 });
    ctTufts(m, 12, 1.3, 5, 35);
  } },
  "picnic-blanket": { desc: "a picnic blanket on the ground, its check faded, mushrooms grown up through it, plates and a bottle", build(m) {
    m.box([0, .02, 0], [.62, .015, .5], M.CLOTH, { round: .01, rough: .01, group: 1, dir: [1, 0, .15], paint: p => ctCell(p, 6, 3) < .15 ? M.MOSS : (Math.floor((p[0] + 5) * 6) + Math.floor((p[2] + 5) * 6)) % 2 ? M.ACCENT : undefined });
    for (const [x, z] of [[-.3, -.15], [.2, .25]]) m.ell([x, .04, z], [.11, .015, .1], M.BELLY, { group: 2 });
    m.seg([.3, .08, -.2], [.55, .08, -.32], .06, .03, M.HAT2, { group: 3 });
    ctMushrooms(m, [-.05, .02, .05], 9, 4, 2, { k: 1.4 }); ctMushrooms(m, [.4, .02, .2], 5, 6, 3); ctTufts(m, 8, 1.0, 8, 36);
  } },
  "hamper": { desc: "a wicker hamper, its lid fallen open, ivy through the weave", build(m) {
    m.box([0, .18, 0], [.3, .17, .2], M.STRAW, { round: .04, group: 1, paint: p => (Math.floor(p[0] * 30) + Math.floor(p[1] * 30)) % 2 ? M.BARK2 : ctCell(p, 6, 2) < .2 ? M.MOSS : undefined }); m.box([0, .3, 0], [.27, .16, .17], M.BARK2, { round: .03, group: 1, cut: true });
    const n = mark(m); m.box([0, 0, 0], [.3, .02, .2], M.STRAW, { round: .02, group: 2, paint: p => (Math.floor(p[0] * 30) + Math.floor(p[2] * 30)) % 2 ? M.BARK2 : undefined }); place(m, n, { roll: -1.2, at: [0, .4, -.32] });
    m.box([.15, .3, .1], [.12, .02, .08], M.ACCENT, { dir: [1, .5, .5], group: 3 }); ctIvy(m, [-.3, 0, .2], [.1, .32, .2], 4, 37); ctTufts(m, 6, .7, 5, 38);
  } },
  "fungi-glow": { desc: "a clump of tall pale fungi glowing faintly, grown out of a rotted basket", glow: true, build(m) {
    for (let i = 0; i < 7; i++) { const a = i * 2.4, d = .05 + ctHash(i, 5) * .18, x = Math.cos(a) * d, z = Math.sin(a) * d, h = .2 + ctHash(i, 6) * .3; m.seg([x, 0, z], [x * 1.3, h, z * 1.3], .02, .014, M.CLOTH, { group: 1 + (i % 2) }); m.ell([x * 1.3, h + .02, z * 1.3], [.07, .035, .07], M.MAGIC, { group: 3 + (i % 2), paint: p => p[1] < h + .01 ? M.MAGIC2 : undefined }); }
    m.ell([0, .05, 0], [.28, .06, .24], M.BARK2, { group: 6, rough: .02, paint: p => ctCell(p, 9) < .4 ? M.MOSS : undefined }); ctTufts(m, 6, .6, 7, 39);
  } },
  // an allotment gone feral
  "raised-bed": { desc: "a raised bed bolted to seed: leggy kale gone to flower, a cabbage split", build(m) {
    m.box([0, .14, 0], [.8, .14, .4], M.WOOD, { round: .02, group: 1, paint: ctPlank(7, .3) }); m.box([0, .26, 0], [.76, .12, .36], M.BARK2, { round: .02, group: 1, cut: true });
    m.box([0, .2, 0], [.75, .02, .35], M.BARK2, { group: 2 });
    for (let i = 0; i < 5; i++) { const x = -.6 + i * .3, z = (ctHash(i, 3) - .5) * .3, h = .5 + ctHash(i) * .4; m.seg([x, .2, z], [x + .04, h, z], .025, .015, M.LEAF2, { group: 3 }); m.ell([x + .04, h - .1, z], [.16, .1, .14], M.LEAF, { group: 4 + (i % 2), rough: .02, paint: p => ctCell(p, 16) < .25 ? M.LEAF3 : undefined }); for (let k = 0; k < 4; k++) m.ell([x + .04 + (ctHash(i, k) - .5) * .2, h + .02 + ctHash(k, i) * .08, z + (ctHash(k, i + 4) - .5) * .15], [.025, .025, .025], M.FLOWER, { group: 6 }); }
    ctTufts(m, 10, 1.3, 7, 40);
  } },
  "bean-wigwam": { desc: "a wigwam of bean canes buried in runner-bean vines, red flowers in it", split: 1.4, build(m) {
    const top = [0, 1.75, 0]; for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283; ctBar(m, [Math.cos(a) * .42, 0, Math.sin(a) * .42], v3.add(top, [Math.cos(a) * .04, .1, Math.sin(a) * .04]), 1, .015, M.STRAW, undefined); }
    for (let v = 0; v < 3; v++) { const pts = []; for (let k = 0; k <= 12; k++) { const t = k / 12, a = t * 9 + v * 2.1, r = .42 * (1 - t * .92); pts.push([Math.cos(a) * r, t * 1.7, Math.sin(a) * r, .05 * (1 - t * .6)]); } m.chain(pts, M.LEAF, { group: 2 + v, rough: .02, paint: p => ctCell(p, 22, v) < .08 ? M.ACCENT : ctCell(p, 12) < .3 ? M.LEAF3 : undefined }); }
    ctTufts(m, 8, .8, 6, 41);
  } },
  "garden-shed": { desc: "a garden shed, its door hanging open, its felt roof furred with moss, a window gone", split: 1.6, build(m) {
    m.box([0, .7, 0], [.7, .7, .55], M.WOOD, { round: .02, group: 1, paint: p => p[2] > .5 && Math.abs(p[0] + .3) < .22 && Math.abs(p[1] - .95) < .18 ? M.SHADES : p[2] > .5 && p[0] > .05 && p[0] < .6 && p[1] < 1.25 ? M.NOSE : Math.abs(Math.sin(p[0] * 30)) > .96 || Math.abs(Math.sin(p[2] * 30)) > .96 ? M.BARK2 : ctCell(p, 6, 4) < .12 ? M.MOSS : undefined });
    for (const s of [-1, 1]) m.box([0, 1.58, s * .32], [.78, .03, .38], M.JACKET, { dir: [1, 0, 0], up: [0, 1, s * .9], round: .01, group: 2 + (s > 0 ? 1 : 0), paint: p => ctCell(p, 5, 2) < .6 ? M.MOSS : ctCell(p, 12) < .2 ? M.LEAF2 : undefined });
    m.box([.62, .62, .78], [.25, .58, .02], M.WOOD, { dir: [1, 0, .9], round: .01, group: 4, paint: ctPlank(7, .2) }); // the door, hanging open
    ctIvy(m, [-.7, 0, .55], [-.55, 1.5, .5], 5, 42); ctIvy(m, [.7, 0, -.3], [.68, 1.3, .2], 6, 43); ctFern(m, [-.9, .05, .6], 7); ctTufts(m, 12, 1.4, 8, 44);
  } },
  "compost-heap": { desc: "a slatted compost bay, a marrow vine sprawling out of it, its fruit swollen", build(m) {
    for (const s of [-1, 1]) m.box([s * .5, .32, 0], [.03, .32, .45], M.WOOD, { round: .01, group: 1, paint: p => ((p[1] * 9) % 1) < .2 ? M.NOSE : ctPlank(7, .3)(p) });
    m.box([0, .32, -.45], [.5, .32, .03], M.WOOD, { round: .01, group: 1, paint: p => ((p[1] * 9) % 1) < .2 ? M.NOSE : ctPlank(7, .3)(p) });
    m.ell([0, .35, 0], [.48, .3, .44], M.BARK2, { group: 2, rough: .03, paint: p => ctCell(p, 12) < .25 ? M.LEAF3 : ctCell(p, 9, 3) < .15 ? M.STRAW : undefined });
    m.chain([[0, .6, 0, .03], [.4, .5, .4, .03], [.8, .1, .5, .025], [1.2, .05, .2, .02]], M.LEAF2, { group: 3 }); for (const [x, z, r] of [[.85, .45, .14], [1.15, .1, .11]]) m.ell([x, r * .9, z], [r * 1.4, r, r], M.POM, { group: 4, dir: [1, 0, .4], paint: p => ((Math.atan2(p[2] - z, p[1] - r) * 3) % 1 + 1) % 1 < .15 ? M.BODY2 : undefined });
    for (let i = 0; i < 4; i++) m.ell([.3 + i * .25, .15, .45 - i * .08], [.14, .03, .12], M.LEAF, { group: 5 + (i % 2) }); ctTufts(m, 8, 1.2, 7, 45);
  } },
  "watering-can": { desc: "a watering can on its side, its rose gone", build(m) {
    const n = mark(m); ctCyl(m, [0, 0, 0], [0, .32, 0], .14, M.HAT2, 1, { paint: ctWorn(.3, .2) }); ctBar(m, [.1, .1, 0], [.38, .36, 0], 2, .025, M.HAT2, ctWorn(.3, 0)); ctBar(m, [-.12, .3, 0], [-.05, .4, 0], 3, .015, M.HAT2); place(m, n, { roll: 1.5, yaw: .4, at: [0, .14, 0] });
    ctTufts(m, 5, .5, 4, 46);
  } },
  // a lay-by
  "snack-van": { desc: "a roadside snack trailer, its hatch propped open on nothing, shutters rusted down (no signs)", split: 1.6, build(m) {
    m.box([0, .95, 0], [1.0, .6, .6], M.BELLY, { round: .1, group: 1, paint: p => p[2] > .55 && Math.abs(p[0] - .05) < .6 && Math.abs(p[1] - 1.05) < .25 ? (((p[1] * 18) % 1) < .3 ? M.STONED : M.FRAME) : ctWorn(.15, .08)(p) });
    m.box([.05, 1.42, .7], [.62, .02, .18], M.BELLY, { dir: [1, 0, 0], up: [0, 1, -.6], round: .01, group: 2, paint: ctWorn(.4, .3) }); ctBar(m, [-.5, 1.3, .62], [-.5, 1.5, .8], 2, .012); // the hatch
    m.box([.05, .82, .66], [.6, .025, .08], M.FRAME, { round: .01, group: 3, paint: ctWorn(.4, .2) }); // the counter
    for (const z of [-.6, .6]) ctWheel(m, [0, .28, z], .28, .09, 4, true);
    ctBar(m, [1.0, .45, 0], [1.6, .38, 0], 5, .035); ctBar(m, [1.55, .4, 0], [1.55, 0, 0], 5, .03);
    ctIvy(m, [-1.0, 0, .6], [-.7, 1.4, .62], 6, 47); ctTufts(m, 12, 1.8, 7, 48);
  } },
  // festival remnants
  "tent-frame": { desc: "a dome tent's bent poles, a few rags of its fabric still caught on them", split: 1.2, build(m) {
    for (const a of [.6, -.6]) { const pts = []; for (let k = 0; k <= 10; k++) { const t = k / 10 * Math.PI, r = .85; pts.push([Math.cos(t) * r * Math.cos(a), Math.sin(t) * .95 + (k === 6 ? -.08 : 0), Math.cos(t) * r * Math.sin(a), .02]); } m.chain(pts, M.FRAME, { group: 1 }); }
    for (const [c, u, v, su, sv, mat] of [[[-.4, .6, .3], [1, .3, 0], [.4, -1, .3], .28, .25, M.HAT1], [[.35, .75, -.3], [1, -.2, 0], [0, -.6, -1], .3, .22, M.ACCENT], [[.05, .9, 0], [1, 0, 0], [0, .2, 1], .2, .25, M.HAT1]]) m.flat(c, u, v, su, sv, (s, t) => t < -1 + .4 * Math.abs(Math.sin(s * 7)) + .3 * ctHash(Math.floor(s * 5)) ? null : mat, { group: 2, bend: .2 });
    for (const [x, z] of [[-.85, .2], [.85, -.2]]) ctBar(m, [x, .02, z], [x * 1.4, 0, z * 1.6], 3, .006, M.CLOTH, undefined); // guy lines
    ctTufts(m, 12, 1.3, 4, 49);
  } },
  "bunting": { desc: "a string of faded bunting sagging between two poles, one pole leaning", split: 1.4, build(m) {
    ctBar(m, [-1.3, 0, 0], [-1.3, 2.0, 0], 1, .03, M.WOOD, ctPlank()); ctBar(m, [1.3, 0, 0], [1.05, 1.75, .15], 1, .03, M.WOOD, ctPlank());
    const at = t => [-1.3 + t * 2.35, 1.95 - Math.sin(t * Math.PI) * .55 - t * .2, t * .15], cols = [M.ACCENT, M.HAT1, M.POM, M.HAT2, M.TOP];
    const pts = []; for (let k = 0; k <= 12; k++) pts.push([...at(k / 12), .01]); m.chain(pts, M.CLOTH, { group: 2 });
    for (let i = 1; i < 12; i++) { if (ctHash(i, 7) < .2) continue; const c = at(i / 12); m.flat(v3.add(c, [0, -.11, 0]), [1, 0, .1], [0, 1, 0], .08, .11, (s, t) => Math.abs(s) < (t + 1) / 2 ? cols[i % 5] : null, { group: 3, bend: .1 }); }
    ctTufts(m, 10, 1.6, 4, 50);
  } },
  "fire-pit": { desc: "a cold fire pit: a ring of stones, charred logs, grey ash", build(m) {
    for (let i = 0; i < 9; i++) { const a = i / 9 * 6.283; m.ell([Math.cos(a) * .5, .08, Math.sin(a) * .42], [.12, .09 + ctHash(i) * .04, .1], M.STONE, { group: 1 + (i % 3), rough: .02, paint: p => ctCell(p, 9, i) < .25 ? M.MOSS : p[1] > .1 && ctCell(p, 14) < .3 ? M.STONED : undefined }); }
    m.ell([0, .02, 0], [.38, .025, .32], M.STONED, { group: 5, paint: p => ctCell(p, 18) < .3 ? M.CLOTH : undefined });
    for (const [a, b] of [[[-.25, .05, -.1], [.25, .12, .08]], [[-.1, .05, .2], [.2, .1, -.18]]]) m.seg(a, b, .05, .04, M.BARKD, { group: 6, paint: p => ctCell(p, 20) < .4 ? M.NOSE : undefined });
    ctTufts(m, 8, 1.0, 7, 51);
  } },
  "crates": { desc: "a stack of slatted crates, one fallen and split", build(m) {
    const crate = (c, g) => m.box(c, [.25, .18, .2], M.WOOD, { round: .015, group: g, paint: p => ((p[1] - c[1] + 1) * 9 % 1) < .22 && Math.abs(p[1] - c[1]) < .15 ? M.NOSE : ctPlank(7, .25)(p) });
    crate([0, .18, 0], 1); crate([.5, .18, .1], 2); crate([.2, .54, .02], 3); const n = mark(m); crate([0, 0, 0], 4); place(m, n, { roll: .9, yaw: .5, at: [-.5, .2, .35] }); ctTufts(m, 8, 1.0, 6, 52);
  } },
  "glow-sticks": { desc: "glow sticks scattered in the grass, somehow still glowing", glow: true, build(m) {
    for (let i = 0; i < 7; i++) { const x = (ctHash(i) - .5) * 1.0, z = (ctHash(i, 2) - .5) * .7, a = ctHash(i, 3) * 6.283; m.seg([x, .02, z], [x + Math.cos(a) * .12, .03, z + Math.sin(a) * .12], .014, .014, i % 3 ? M.MAGIC : M.COLLAR, { group: 1 + i }); }
    ctBar(m, [.2, .25, -.1], [.2, .02, -.1], 9, .012, M.MAGIC2, undefined); // one hanging from a stalk
    ctTufts(m, 10, .8, 10, 53);
  } },
  "camp-chair": { desc: "a folding camp chair tipped over, its fabric sagging", build(m) {
    const n = mark(m); for (const s of [-1, 1]) { ctBar(m, [-.2, 0, s * .22], [.2, .45, s * .22], 1, .015); ctBar(m, [.2, 0, s * .22], [-.2, .45, s * .22], 1, .015); ctBar(m, [-.22, .45, s * .22], [-.3, .85, s * .22], 1, .015); }
    m.box([0, .42, 0], [.22, .02, .22], M.HAT1, { round: .01, group: 2, paint: ctWorn(0, .2) }); m.box([-.27, .65, 0], [.02, .2, .22], M.HAT1, { dir: [0, 1, 0], up: [1, .2, 0], round: .01, group: 2 });
    place(m, n, { roll: 1.4, yaw: .3, at: [0, .22, 0] }); ctTufts(m, 6, .7, 4, 54);
  } },
  // a woodcutter's clearing
  "log-pile": { desc: "a woodpile of cut logs, ends to the viewer, moss on the top ones", build(m) {
    let g = 1; for (let row = 0; row < 3; row++) for (let i = 0; i < 4 - row; i++) { const x = (i - (3 - row) / 2) * .38, y = .17 + row * .3; ctLog(m, [x, y, -.5], [x, y, .5], .17 + ctHash(i, row) * .02, g++); }
    ctTufts(m, 10, 1.3, 20, 55);
  } },
  "chopping-block": { desc: "a chopping block with an axe left in it, chips in the grass", build(m) {
    ctCyl(m, [0, 0, 0], [0, .45, 0], .26, M.TRUNK, 1, { paint: p => ctCell(p, 14, 2) < .15 ? M.BARKD : ctCell(p, 5, 3) < .15 ? M.MOSS : undefined, end: ctRings([0, .45, 0], 1) });
    ctBar(m, [.02, .45, .05], [-.35, .95, .2], 2, .025, M.WOOD, undefined); m.box([.04, .47, .04], [.1, .06, .02], M.FRAME, { dir: [1, -.5, 0], up: [0, 1, 0], round: .01, group: 3, paint: ctWorn(.5, 0) });
    for (let i = 0; i < 8; i++) m.box([(ctHash(i) - .5) * 1.0, .015, (ctHash(i, 2) - .5) * .8], [.05, .012, .025], M.STRAW, { dir: [ctHash(i, 3) - .5, 0, ctHash(i, 4) - .5], group: 4 + (i % 2) });
    ctTufts(m, 8, .9, 6, 56);
  } },
  "sawhorse": { desc: "a sawhorse with a log still across it, a bow saw hung on it", build(m) {
    for (const x of [-.4, .4]) for (const s of [-1, 1]) ctBar(m, [x, 0, s * .3], [x, .62, -s * .1], 1, .03, M.WOOD, ctPlank());
    ctBar(m, [-.4, .3, 0], [.4, .3, 0], 1, .025, M.WOOD, ctPlank()); ctLog(m, [-.8, .7, 0], [.7, .72, 0], .14, 2);
    ctBar(m, [-.25, .55, .22], [.25, .55, .22], 3, .01, M.FRAME, undefined); m.chain([[-.25, .55, .22, .015], [-.2, .35, .22, .015], [.2, .35, .22, .015], [.25, .55, .22, .015]], M.ACCENT, { group: 3, paint: ctWorn(.5, 0) });
    ctTufts(m, 8, 1.0, 5, 57);
  } },
  "stumps": { desc: "two sawn stumps, bracket fungus on one", build(m) {
    for (const [x, z, r, h, g] of [[-.3, -.1, .3, .32, 1], [.45, .25, .22, .22, 3]]) { ctCyl(m, [x, 0, z], [x, h, z], r, M.TRUNK, g, { paint: p => ctCell(p, 14, 2) < .15 ? M.BARKD : ctCell(p, 5, 3) < .2 ? M.MOSS : undefined, end: ctRings([x, h, z], 1) }); for (let i = 0; i < 4; i++) { const a = i * 1.6; m.ell([x + Math.cos(a) * (r + .1), .05, z + Math.sin(a) * (r + .1)], [.12, .06, .1], M.TRUNK, { group: g + 1, dir: [Math.cos(a), -.3, Math.sin(a)] }); } }
    for (const y of [.12, .2]) m.ell([-.05, y, .12], [.1, .02, .08], M.EAR, { group: 5 }); ctTufts(m, 8, 1.0, 6, 58);
  } },
  // a fly-tip
  "mattress": { desc: "a mattress dumped in the bracken, stained and sprung, a fern through it", build(m) {
    const n = mark(m); m.box([0, 0, 0], [.75, .1, .5], M.BELLY, { round: .07, group: 1, rough: .01, paint: p => ctCell(p, 4, 2) < .3 ? M.STRAW : ctCell(p, 6, 3) < .15 ? M.MOSS : Math.abs(Math.sin(p[0] * 20)) > .93 ? M.CLOTH : undefined }); place(m, n, { roll: .2, pitch: .1, at: [0, .15, 0] });
    for (let i = 0; i < 3; i++) m.chain([[-.3 + i * .25, .26, .1, .012], [-.28 + i * .25, .34, .12, .012], [-.3 + i * .25, .38, .1, .01]], M.FRAME, { group: 3 }); ctFern(m, [.4, .2, .1], 4, .8); ctTufts(m, 10, 1.2, 5, 59);
  } },
  "tyre-pile": { desc: "a pile of old tyres, one rolled away, rainwater and moss in them", build(m) {
    for (let i = 0; i < 4; i++) ctTyre(m, [(ctHash(i) - .5) * .06, .1 + i * .2, (ctHash(i, 2) - .5) * .06], 1 + i);
    ctTyre(m, [.65, .1, .3], 6); const n = mark(m); ctTyre(m, [0, 0, 0], 8); place(m, n, { roll: 1.4, yaw: .9, at: [-.6, .3, .35] }); ctTufts(m, 10, 1.1, 10, 60);
  } },
  // an abandoned apiary
  "beehive": { desc: "a white-painted beehive, its boxes askew, its roof slid off, comb in the grass", build(m) {
    m.box([0, .15, 0], [.3, .15, .3], M.WOOD, { round: .01, group: 1 }); for (const [y, dx, g] of [[.45, 0, 2], [.75, .04, 3], [1.02, -.05, 4]]) m.box([dx, y, 0], [.3, .13, .3], M.BELLY, { dir: [1, 0, dx * 3], round: .015, group: g, paint: p => Math.abs(p[1] - y + .1) < .015 && p[2] > .28 && Math.abs(p[0] - dx) < .15 ? M.NOSE : ctCell(p, 6, g) < .18 ? M.MOSS : ctCell(p, 15) > .9 ? M.STONED : undefined });
    const n = mark(m); m.box([0, 0, 0], [.36, .05, .36], M.FRAME, { round: .02, group: 5, paint: ctWorn(.4, .3) }); place(m, n, { roll: .5, yaw: .3, at: [.5, .2, .35] });
    m.box([-.5, .04, .3], [.18, .025, .1], M.STRAW, { group: 6, dir: [1, 0, .5], paint: p => ctCell(p, 30) < .5 ? M.BODY2 : undefined }); ctTufts(m, 10, 1.0, 7, 61);
  } },
};

// ---------------- the table ----------------
// family: farm | street | scene; size: a factor on the witch's scale; split: the model height above which it goes in the top (treetop mode).
export const COUNTRY = [
  ...Object.entries(FARM).map(([id, d]) => ({ id, family: "farm", size: 1, split: null, ...d })),
  ...Object.entries(STREET).map(([id, d]) => ({ id, family: "street", size: 1, split: null, ...d })),
  ...Object.entries(SCENE_PIECES).map(([id, d]) => ({ id, family: "scene", size: 1, split: null, ...d })),
];
export const COUNTRY_BY_ID = Object.fromEntries(COUNTRY.map(d => [d.id, d]));
export function countryColours(st = {}) {
  const leaf = st.leafHue ?? .3, trunk = st.trunkHue ?? .07;
  return {
    [M.BODY]: [146, 64, 50], [M.BODY2]: [132, 74, 42], [M.BODY3]: [34, 32, 38], [M.FRAME]: [150, 152, 158], [M.SHADES]: [24, 24, 30], [M.NOSE]: [14, 12, 18], // faded tractor red, rust, rubber, worn metal, dark glass, black
    [M.STONE]: [112, 110, 116], [M.STONED]: [50, 50, 58], [M.CLOTH]: [180, 166, 132], [M.BELLY]: [222, 218, 206], [M.ACCENT]: [176, 60, 52], // stone, cracks, sacking and canvas, white paint, faded red
    [M.HAT1]: [54, 84, 120], [M.HAT2]: [58, 88, 66], [M.POM]: [204, 170, 70], [M.TOP]: [140, 96, 150], [M.JACKET]: [44, 46, 52], // sign blue, council green, bunting yellow and purple, black plastic
    [M.WOOD]: [126, 112, 94], [M.STRAW]: [190, 162, 98], [M.SKIN]: [96, 104, 80], [M.EAR]: [214, 184, 140], [M.FLOWER]: [214, 206, 110], // weathered wood, hay, mould, fungus, kale flowers
    [M.MOSS]: hsv2rgb(.26, .45, .45), [M.TRUNK]: hsv2rgb(trunk, .45, .36), [M.BARK2]: [98, 74, 52], [M.BARKD]: hsv2rgb(trunk + .03, .5, .17), [M.BARKL]: hsv2rgb(trunk, .35, .55),
    [M.LEAF]: hsv2rgb(leaf, .55, .45), [M.LEAF2]: hsv2rgb(leaf - .03, .5, .6), [M.LEAF3]: hsv2rgb(leaf + .03, .6, .28), [M.WATER]: [44, 70, 96],
    [M.GLOW]: [255, 176, 92], [M.MAGIC]: hsv2rgb(st.magicHue ?? .35, .45, 1), [M.MAGIC2]: hsv2rgb(st.magicHue ?? .35, .12, 1), [M.COLLAR]: [255, 96, 200], [M.LINE]: [24, 22, 30],
  };
}
// One piece, drawn: { whole, top, bot, crownY, origin, metres: { width, height, footprint } }, like the relics. origin: where
// its middle on the ground lands (put it at its spot in a scene); footprint: its radius on the ground, in metres.
export function countrySprite(id, st = {}, { ppm = 16 } = {}) {
  const d = COUNTRY_BY_ID[id]; if (!d) throw new Error(`no country piece "${id}"`);
  const m = countryModel(id); m.ell([0, .004, 0], [.01, .004, .01], M.NOSE, { group: 0 }); // a common ground line
  const s = witchPixelsPerUnit(st) * d.size, { sp, project } = render(m, { scale: s });
  let x0 = sp.w, x1 = -1, y0 = sp.h; for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); }
  const W = x1 - x0 + 1, H = sp.h - y0, crop = new Sprite(W, H), top = new Sprite(W, H), bot = new Sprite(W, H);
  const crownY = d.split == null ? 0 : Math.max(0, Math.round(project([0, d.split, 0])[1]) - y0);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = (y + y0) * sp.w + x + x0, mm = sp.m[i]; if (!mm) continue; const n = [sp.n[i * 3], sp.n[i * 3 + 1], sp.n[i * 3 + 2]]; crop.put(x, y, mm, ...n); (y < crownY ? top : bot).put(x, y, mm, ...n); }
  crop.bodyH = sp.bodyH;
  const unit = s / ppm, [px, py] = project([0, 0, 0]);
  return { whole: crop, top, bot, crownY, origin: { x: +(px - x0).toFixed(1), y: +(py - y0).toFixed(1) }, metres: { width: +(W / ppm).toFixed(1), height: +(H / ppm).toFixed(1), footprint: +(modelReach(m) * unit).toFixed(1) } };
}
export function countryModel(id) { const d = COUNTRY_BY_ID[id]; if (!d) throw new Error(`no country piece "${id}"`); const m = new Model({ blend: .04 }); d.build(m); return m; }
// How far a model reaches over the ground from its middle (model units): its solid parts near the ground.
export function modelReach(m) {
  let reach = 0;
  for (const q of m.parts) { if (q.extra || q.cut) continue; const ends = q.type === "cone" ? [[q.a, q.r1], [q.b, q.r2]] : [[q.c, q.r ? Math.max(...q.r) : Math.max(q.h[0], q.h[2])]]; for (const [c, r] of ends) if (c[1] - r < .3) reach = Math.max(reach, Math.hypot(c[0], c[2]) + r); }
  for (const f of m.flats) if (f.c[1] < .5) reach = Math.max(reach, Math.hypot(f.c[0], f.c[2]) + Math.max(f.su, f.sv));
  return reach;
}
