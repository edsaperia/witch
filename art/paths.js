// Paths and railways (Ed: "various varieties of pathways"; "Railways would be great. Paths should
// go in a few directions and not just be straight lines").
// Every path kind is a ground texture in GROUND space (seen from straight above, 16 px per metre;
// the prototype lays it on the ground as it does the floor):
//   strip   u across the path (its width), v along it; tiles along v, so the prototype can sweep it
//           along any spline (curves of any radius);
//   end     where a path peters out (v from the open end, 0, to where the strip joins, its length);
//   y, t    junction patches, laid where three paths meet (Y: arms at 120 degrees; T: a straight
//           through and one arm off it); each arm ends square, a path's width wide, where a strip joins.
// Plus 3D pieces at the game's view: edge props (verge posts, cat's-eyes, stepping stones, boardwalk
// posts, glowing mushrooms), stone stairs, a root bridge, a footbridge and a rope bridge; and for the
// railway: points (two tracks parting), a broken end, a level-crossing patch, and landmarks (a
// tipped goods wagon, an overgrown carriage, a station platform, a level crossing, a signal gantry).
// Night-readable and mostly unlit; the magic trail is the one glowing kind (and the carriage's
// windows). No text or liveries.
import { M, Sprite, hsv2rgb, sinHash, glowBall } from "./core.js";
import { BRIDGE_GENOMES, buildBridge } from "./props/bridges.js";
import { Model, render, v3 } from "./model3d.js";
import { witchPixelsPerUnit } from "./witch.js";

export const PATH_PPM = 16; // ground pixels per metre
const UP = [0, -.42, .9]; // a ground pixel's normal (as the floor's)
// value noise on the ground, periodic along v with period P (metres), so strips tile
const pkNoise = (x, y, k, P = 0) => { if (P) k = Math.max(1, Math.round(P * k)) / P; /* a whole number of cells per period, so it repeats */ const X = x * k, Y = y * k, ix = Math.floor(X), iy = Math.floor(Y), fx = X - ix, fy = Y - iy, n = P ? Math.round(P * k) : 0, w = j => n ? ((j % n) + n) % n : j, h = (a, b) => sinHash(a, w(b)), s = t => t * t * (3 - 2 * t); return (h(ix, iy) * (1 - s(fx)) + h(ix + 1, iy) * s(fx)) * (1 - s(fy)) + (h(ix, iy + 1) * (1 - s(fx)) + h(ix + 1, iy + 1) * s(fx)) * s(fy); };
// cells (for flagstones and cobbles): the nearest jittered point, and how close the second is
function pkCells(x, y, k, P) { k = Math.max(1, Math.round(P * k)) / P; const X = x * k, Y = y * k, ix = Math.floor(X), iy = Math.floor(Y), n = Math.round(P * k); let d1 = 9, d2 = 9, id = 0; for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) { const cx = ix + i, cy = iy + j, wy = ((cy % n) + n) % n, px = cx + sinHash(cx, wy * 3 + 1), py = cy + sinHash(cx * 7 + 2, wy), d = Math.hypot(px - X, py - Y); if (d < d1) { d2 = d1; d1 = d; id = sinHash(cx, wy); } else if (d < d2) d2 = d; } return { edge: d2 - d1, id }; }

// Each kind: width (m), period (the strip's tile length, m), moods (areas it suits), and surface(u, v, core):
// u in [-1, 1] across (0 the middle), v metres along; core: inside a junction's middle (no markings).
// Returns [material, tilt] or 0 (nothing: the ground shows through).
const rag = (u, v, P, amt = .14) => Math.abs(u) > 1 - amt * pkNoise(u > 0 ? 3 : 7, v, 1.4, P) * 1.6; // a ragged edge
export const PATH_KINDS = {
  dirt: { width: 3, period: 4, desc: "a dirt track: worn earth, grass at its edges, puddles in its ruts", moods: ["muddy-forest", "hazel-forest", "twiggy-forest", "alder-forest", "meadow", "grassland", "beaver-pond", "wispy-forest"],
    surface(u, v) { const P = 4; if (rag(u, v, P, .3)) return 0; const n = pkNoise(u * 3, v, 2.2, P); if (Math.abs(u) > .8 - n * .15) return [n > .5 ? M.LEAF2 : M.LEAF, .1]; const rut = Math.abs(Math.abs(u) - .45) < .1 + n * .05; if (rut && pkNoise(u * 2, v, .9, P) > .68) return [M.WATER, 0]; return [rut ? (n < .5 ? M.BARK2 : M.BARKD) : n < .3 ? M.BARK2 : n > .8 ? M.LEAF3 : M.BODY2, .15]; } },
  animal: { width: 1.2, period: 4, desc: "an animal track: a faint, narrow trail through the undergrowth", moods: ["berry-thicket", "tangly-forest", "holly-thicket", "fern-forest", "honeysuckle-tangle", "ancient", "bog"],
    surface(u, v) { const P = 4; if (rag(u, v, P, .5)) return 0; const n = pkNoise(u * 2, v, 3, P); if (n < .35) return 0; return [n > .75 ? M.BARK2 : M.LEAF3, .1]; } },
  flagstones: { width: 2.5, period: 4, desc: "mossy flagstones: an old stone path, gaps between the slabs", moods: ["garden", "stone-shrine", "ancient", "bluebell-glade", "old-oaks"],
    surface(u, v) { const P = 4; if (rag(u, v, P, .1)) return 0; const c = pkCells(u * 1.25, v, 1.3, P); if (c.edge < .12) return c.edge < .05 ? 0 : [M.MOSS, .1]; if (c.id < .08) return 0; return [c.id < .25 ? M.STONED : pkNoise(u, v, 4, P) < .2 ? M.MOSS : M.STONE, .25]; } },
  cobbles: { width: 4, period: 4, desc: "cobbles: a stretch of old village lane", moods: ["garden", "old-oaks", "meadow", "stone-shrine"],
    surface(u, v) { const P = 4; if (rag(u, v, P, .08)) return 0; const c = pkCells(u * 2, v, 2.2, P); if (c.edge < .16) return [pkNoise(u, v, 3, P) < .3 ? M.MOSS : M.STONED, .05]; return [c.id < .2 ? M.STONED : c.id > .85 ? M.BELLY : M.STONE, .35]; } },
  stepping: { width: 2, period: 4, desc: "stepping stones across water or bog (each also a 3D prop)", moods: ["stream", "wetland", "bog", "ravine", "beaver-pond"],
    surface(u, v) { const P = 4, sp = P / 3, k = Math.floor(v / sp), t = v - k * sp - sp / 2, du = u * 1 - (sinHash(k % 3, 9) - .5) * .5, d = Math.hypot(du * .9, t / .55); if (d > .55 + pkNoise(u, v, 4, P) * .1) return 0; return [d > .45 ? M.MOSS : M.STONE, .4]; } },
  boardwalk: { width: 2.5, period: 4, desc: "a boardwalk: planks on posts over bog or pools, a few boards missing (posts are 3D props)", moods: ["bog", "wetland", "moor", "beaver-pond"],
    surface(u, v) { const P = 4, k = Math.floor(v / .5), f = v / .5 - k; if (Math.abs(u) > .97) return [M.BARKD, .1]; if (sinHash(k % 8, 3) < .1) return 0; if (f < .1) return 0; const grain = Math.abs(Math.sin(u * 40 + (k % 8) * 3)) < .12; return [pkNoise(u, v, 3, P) < .15 ? M.MOSS : grain ? M.BARKD : sinHash(k % 8, 5) < .4 ? M.BARK2 : M.WOOD, .1]; } },
  tarmac: { width: 10, period: 8, desc: "an overgrown tarmac road: cracked, faded centre lines, verge posts and a cat's-eye or two (3D props)", moods: ["grassland", "deadwood", "heath", "muddy-forest", "moor"],
    surface(u, v, core) { const P = 8; if (rag(u, v, P, .06)) return 0; const n = pkNoise(u * 4, v, 1.1, P), crack = Math.abs(pkNoise(u * 6, v, .7, P) - .5) < .02 || Math.abs(pkNoise(u * 3 + 9, v, 1.6, P) - .5) < .012; if (crack) return [pkNoise(u, v, 6, P) < .5 ? M.LEAF2 : M.STONED, 0]; if (Math.abs(u) > .9) return [n < .5 ? M.LEAF2 : M.LEAF, .1]; if (!core && Math.abs(u) < .025 && (v % 4) < 2.2 && n > .3) return [M.CLOTH, .05]; if (!core && Math.abs(Math.abs(u) - .84) < .015 && n > .35) return [M.BELLY, .05]; return [n < .2 ? M.MOSS : n > .85 ? M.STONED : M.STONE, .05]; } },
  railway: { width: 4, period: 4, desc: "an old railway line: rusty rails, sleepers half-buried in grass", moods: ["grassland", "heath", "deadwood", "moor", "norway", "rocky-slope"], variants: ["plain", "half-buried", "overgrown"],
    surface(u, v, core, variant = 0) { const P = 4, n = pkNoise(u * 3, v, 2.5, P), grass = [0, .35, .6][variant]; if (rag(u, v, P, .2)) return 0; const ru = Math.abs(Math.abs(u) - .3); if (ru < .05) return [pkNoise(u, v, 8, P) < grass * .5 ? M.LEAF2 : ru < .018 ? M.FRAME : M.SHADES, .3]; /* the rails: dark, a rusty shine along their tops */ const k = Math.floor(v * 6 / P), f = v * 6 / P - k; if (Math.abs(u) < .55 && f < .38 && pkNoise(u, v, 6, P) > grass * .8) return [sinHash(k % 6, 2) < .25 ? M.BARKD : f < .06 || f > .32 ? M.BARKD : M.BARK2, .2]; if (n < grass) return [n < grass * .5 ? M.LEAF : M.LEAF2, .1]; return [n > .7 ? M.STONED : M.STONE, .3]; } },
  roots: { width: 2.5, period: 4, desc: "a root path: gnarled roots across it, worn into steps", moods: ["ancient", "old-oaks", "old-pinewood", "log-pile", "fern-forest"],
    surface(u, v) { const P = 4; if (rag(u, v, P, .25)) return 0; const k = Math.floor(v / .8), wob = Math.sin(u * 3 + (k % 5) * 2) * .12, f = v / .8 - k + wob; if (Math.abs(f - .5) < .14 + pkNoise(u, v, 3, P) * .06) return [Math.abs(f - .5) < .05 ? M.BARKL : M.TRUNK, .6]; return [pkNoise(u, v, 2, P) < .4 ? M.BARKD : M.BARK2, .1]; } },
  magic: { width: 2, period: 4, desc: "a magic trail: a line of softly glowing mushrooms and fairy stones (the one glowing kind; use rarely, leading to a set piece)", glow: true, moods: ["bluebell-glade", "hazel-forest", "stone-shrine", "wispy-forest", "ancient"],
    surface(u, v) { const P = 4, k = Math.floor(v), side = k % 2 ? 1 : -1, t = v - k - .5, d = Math.hypot((u - side * .8) * 2.2, t * 3); if (d < .45) return [d < .22 ? M.MAGIC2 : M.MAGIC, 0]; const k2 = Math.floor((v + .5) / 2), d2 = Math.hypot(u * 2.2, (v + .5 - k2 * 2 - 1) * 3); if (d2 < .3) return [M.RUNE, 0]; if (Math.abs(u) < .4 && pkNoise(u, v, 3, P) > .62) return [M.LEAF3, .1]; return 0; } },
};
export const PATH_IDS = Object.keys(PATH_KINDS);

// ---------------- the ground textures ----------------
function ground(w, h, fn) { const sp = new Sprite(w, h); for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const r = fn(x + .5, y + .5); if (r) sp.px(x, y, r[0], UP[0] + (r[1] ? (sinHash(x, y) - .5) * r[1] : 0), UP[1] + (r[1] ? (sinHash(y, x) - .5) * r[1] * .5 : 0), UP[2]); } return sp; }
// One kind's textures: { strip, end, y, t } (Sprites in ground space; x across, y along; 16 px per metre).
export function pathTextures(id, { variant = 0 } = {}) {
  const K = PATH_KINDS[id], W = Math.round(K.width * PATH_PPM), L = Math.round(K.period * PATH_PPM), half = K.width / 2, S = (x, y, core) => K.surface(x, y, core, variant);
  const strip = ground(W, L, (x, y) => S((x / W) * 2 - 1, y / PATH_PPM));
  const E = Math.round(Math.max(1.5, K.width * .8) * PATH_PPM); // the end: the path narrows and frays towards v = 0
  const end = ground(W, E, (x, y) => { const t = y / E, u = ((x / W) * 2 - 1) / Math.max(.05, Math.sqrt(t)); return Math.abs(u) > 1 || pkNoise(x / PATH_PPM, y / PATH_PPM, 2) > .25 + t ? 0 : S(u, y / PATH_PPM); });
  // junctions: a square patch; each arm ends square at its edge, the path's width wide, centred on that edge's middle
  const J = Math.round(K.width * 2.4 * PATH_PPM), c = J / 2;
  const junction = arms => ground(J, J, (x, y) => {
    let best = null;
    for (const a of arms) { const dx = Math.cos(a), dy = Math.sin(a), along = (x - c) * dx + (y - c) * dy, across = -(x - c) * dy + (y - c) * dx; if (along < -K.width * PATH_PPM * .5) continue; const u = across / (W / 2); if (Math.abs(u) <= 1 && (!best || Math.abs(u) < Math.abs(best.u))) best = { u, v: (c - along) / PATH_PPM }; }
    if (!best) return 0; return S(best.u, ((best.v % K.period) + K.period) % K.period, Math.hypot(x - c, y - c) < W * .6);
  });
  return { strip, end, y: junction([-Math.PI / 2, Math.PI / 6, Math.PI * 5 / 6]), t: junction([Math.PI, 0, Math.PI / 2]), width: K.width, period: K.period };
}
// Sweeps a kind's strip along a polyline (ground metres) into a ground-space sprite: the reference for how
// the prototype lays paths along splines (u across from the line, v the distance along it).
// pts: one polyline [[x, y], ...] or several (a branch meeting another makes a junction where they overlap).
export function sweepPath(id, pts, { variant = 0, pad = 2 } = {}) {
  const K = PATH_KINDS[id], half = K.width / 2, lines = Array.isArray(pts[0][0]) ? pts : [pts], all = lines.flat();
  const xs = all.map(p => p[0]), ys = all.map(p => p[1]), x0 = Math.min(...xs) - half - pad, y0 = Math.min(...ys) - half - pad, W = Math.ceil((Math.max(...xs) + half + pad - x0) * PATH_PPM), H = Math.ceil((Math.max(...ys) + half + pad - y0) * PATH_PPM);
  const segs = []; for (const line of lines) { let acc = 0; for (let i = 0; i + 1 < line.length; i++) { const a = line[i], b = line[i + 1], l = Math.hypot(b[0] - a[0], b[1] - a[1]); segs.push({ a, b, l, s: acc, first: i === 0, last: i + 2 === line.length }); acc += l; } }
  const sp = new Sprite(W, H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const px = x0 + (x + .5) / PATH_PPM, py = y0 + (y + .5) / PATH_PPM; let best = null;
    for (const g of segs) { const dx = g.b[0] - g.a[0], dy = g.b[1] - g.a[1], t0 = ((px - g.a[0]) * dx + (py - g.a[1]) * dy) / (g.l * g.l); if ((t0 < 0 && g.first) || (t0 > 1 && g.last)) continue; /* a line's ends are cut square (use the end texture there) */ const t = Math.max(0, Math.min(1, t0)), qx = g.a[0] + dx * t, qy = g.a[1] + dy * t, d = Math.hypot(px - qx, py - qy); if (d <= half && (!best || d < best.d)) best = { d, u: ((px - qx) * -dy + (py - qy) * dx) / g.l / half, v: g.s + t * g.l }; }
    if (!best) continue; const r = K.surface(best.u, ((best.v % K.period) + K.period) % K.period, false, variant); if (r) sp.px(x, y, r[0], UP[0], UP[1], UP[2]);
  }
  return { sp, origin: [-x0 * PATH_PPM, -y0 * PATH_PPM] };
}
// Railway points: two tracks parting, one straight and one curving away (ground space).
export function railPoints({ variant = 0, length = 16, radius = 30 } = {}) {
  const straight = [[0, 0], [length, 0]], curve = []; for (let i = 0; i <= 12; i++) { const a = i / 12 * (length / radius); curve.push([Math.sin(a) * radius, (1 - Math.cos(a)) * radius]); }
  const A = sweepPath("railway", straight, { variant, pad: 0 }), B = sweepPath("railway", curve, { variant, pad: 0 });
  const W = Math.max(A.sp.w, B.sp.w + Math.round(B.origin[0] - A.origin[0])), oy = Math.max(A.origin[1], B.origin[1]), H = Math.max(A.sp.h - A.origin[1], B.sp.h - B.origin[1]) + oy, sp = new Sprite(W, Math.ceil(H));
  for (const P of [B, A]) for (let y = 0; y < P.sp.h; y++) for (let x = 0; x < P.sp.w; x++) { const m = P.sp.m[y * P.sp.w + x]; if (!m) continue; const X = x + Math.round(A.origin[0] - P.origin[0]), Y = y + Math.round(oy - P.origin[1]); if (sp.inb(X, Y) && !(sp.m[Y * W + X] === M.FRAME && m !== M.FRAME)) sp.px(X, Y, m, UP[0], UP[1], UP[2]); }
  return sp;
}
// The broken end of a line: the rails lifted and bent, sleepers scattered (ground space).
export function railBrokenEnd({ variant = 1 } = {}) {
  const K = PATH_KINDS.railway, W = Math.round(K.width * PATH_PPM), L = Math.round(6 * PATH_PPM);
  return ground(W, L, (x, y) => { const u = (x / W) * 2 - 1, v = y / PATH_PPM, t = y / L; if (t < .35) { const k = Math.floor(v / .67); if (sinHash(k, 4) < .5 && Math.abs(u + (sinHash(k, 5) - .5) * .5) < .5 && (v / .67 - k) < .35) return [M.WOOD, .3]; return pkNoise(u, v, 2) > .55 ? [M.LEAF2, .1] : 0; } return K.surface(u, v % K.period, false, variant); });
}
// A level crossing's road surface: tarmac over the rails (ground space, a square the road's width).
export function railCrossing() {
  const R = PATH_KINDS.tarmac, W = Math.round(R.width * PATH_PPM);
  return ground(W, W, (x, y) => { const u = (x / W) * 2 - 1, v = (y / W) * 2 - 1; if (Math.abs(Math.abs(v) - .12) < .02 && Math.abs(u) < .95) return [M.FRAME, .3]; return R.surface(u, (y / PATH_PPM) % R.period, true); });
}

// ---------------- 3D pieces at the game's view ----------------
const pkCell = (p, k, s = 0) => sinHash(Math.floor(p[0] * k) + Math.floor(p[2] * k) * 57 + s, Math.floor(p[1] * k));
const pkWorn = (rust = .25, moss = .15) => p => { const r = pkCell(p, 16, 3), n = pkCell(p, 6, 5); return n < moss && p[1] > .1 ? M.MOSS : r > 1 - rust * .7 ? M.BODY2 : undefined; };
const pkBar = (m, a, b, g, r = .025, mat = M.FRAME) => m.seg(a, b, r, r, mat, { group: g, paint: pkWorn(.4, .05) });
const pkStone = (m, c, r, g) => m.ell(c, r, M.STONE, { group: g, rough: .025, paint: p => p[1] > c[1] + r[1] * .5 && pkCell(p, 5, g) < .6 ? M.MOSS : pkCell(p, 14) > .9 ? M.STONED : undefined });
const pkTufts = (m, n, R, g, seed) => { for (let i = 0; i < n; i++) { const a = sinHash(seed, i) * 6.283, d = R * Math.sqrt(sinHash(i, seed)); m.ell([Math.cos(a) * d, .07, Math.sin(a) * d * .7], [.07, .1 + sinHash(i, 4) * .08, .07], M.LEAF2, { group: g + (i % 3), paint: p => p[1] > .13 ? M.LEAF : undefined }); } };
const pkCrown = (m, c, r, g) => m.ell(c, r, M.LEAF, { group: g, rough: .04, paint: p => { const n = pkCell(p, 10, 2); return p[1] < c[1] - .15 || n < .2 ? M.LEAF3 : n > .8 ? M.LEAF2 : undefined; } });
const pkIvy = (m, from, to, g, seed) => { const pts = []; for (let k = 0; k <= 4; k++) pts.push([...v3.add(v3.lerp(from, to, k / 4), [(sinHash(seed, k) - .5) * .12, 0, .02]), .03]); m.chain(pts, M.LEAF, { group: g, paint: p => pkCell(p, 30) < .3 ? M.LEAF2 : undefined }); };
function pkPlace(m, from, { pitch = 0, roll = 0, at = [0, 0, 0] } = {}) {
  const R = (v, a, i, j) => { const c = Math.cos(a), s = Math.sin(a), o = [...v]; o[i] = v[i] * c - v[j] * s; o[j] = v[i] * s + v[j] * c; return o; };
  const rot = v => R(R(v, roll, 1, 2), pitch, 0, 1), inv = v => R(R(v, -pitch, 0, 1), -roll, 1, 2), fwd = p => v3.add(rot(p), at), back = p => inv(v3.sub(p, at));
  for (const q of m.parts.slice(from)) { if (q.type === "cone") { q.a = fwd(q.a); q.b = fwd(q.b); } else { q.c = fwd(q.c); q.axes = q.axes.map(rot); } if (q.paint) { const f = q.paint; q.paint = (p, part) => f(back(p), part); } }
}
const PIECES = {
  // edge props
  "verge-post": { family: "prop", path: "tarmac", desc: "a road's verge post, leaning, its band faded", build(m) { const n = m.parts.length; m.box([0, .4, 0], [.06, .4, .06], M.BELLY, { round: .02, group: 1, paint: p => Math.abs(p[1] - .62) < .06 ? M.SHADES : pkWorn(.1, .2)(p) }); pkPlace(m, n, { roll: .15, pitch: .1 }); pkTufts(m, 4, .25, 3, 1); } },
  "cats-eye": { family: "prop", path: "tarmac", desc: "a cat's-eye stud in the road (unlit)", build(m) { m.box([0, .02, 0], [.09, .02, .05], M.SHADES, { round: .01, group: 1 }); for (const x of [-.04, .04]) m.ell([x, .04, .03], [.025, .015, .015], M.FRAME, { group: 2 }); } },
  "stepping-stone": { family: "prop", path: "stepping", desc: "a stepping stone, flat-topped and mossy", build(m) { pkStone(m, [0, .08, 0], [.38, .12, .3], 1); } },
  "boardwalk-post": { family: "prop", path: "boardwalk", desc: "a boardwalk's post, standing in the water", build(m) { m.seg([0, 0, 0], [0, .55, 0], .06, .055, M.WOOD, { group: 1, paint: p => p[1] < .12 ? M.MOSS : p[1] > .5 ? M.BARK2 : undefined }); } },
  "sleeper-sapling": { family: "prop", path: "railway", desc: "a sapling grown up between the sleepers", build(m) { m.seg([0, 0, 0], [0, .9, 0], .025, .015, M.TRUNK, { group: 1 }); pkCrown(m, [0, .95, 0], [.22, .18, .2], 2); pkTufts(m, 4, .2, 3, 2); } },
  "glow-mushrooms": { family: "prop", path: "magic", glow: true, desc: "a cluster of softly glowing mushrooms", build(m) { for (let i = 0; i < 4; i++) { const c = [(sinHash(i) - .5) * .3, 0, (sinHash(i, 2) - .5) * .2], h = .08 + sinHash(i, 3) * .1; m.seg(c, v3.add(c, [0, h, 0]), .015, .012, M.CLOTH, { group: 1 }); m.ell(v3.add(c, [0, h + .02, 0]), [.05, .03, .05], M.MAGIC, { group: 2 + i, paint: p => p[1] > c[1] + h + .035 ? M.MAGIC2 : undefined }); } } },
  "fairy-stone": { family: "prop", path: "magic", glow: true, desc: "a small fairy stone with a glowing rune", build(m) { m.box([0, .18, 0], [.09, .18, .06], M.STONE, { round: .04, group: 1, paint: p => p[2] > .04 && Math.abs(p[1] - .2) < .07 && Math.abs(p[0]) < .025 ? M.RUNE : p[1] > .32 ? M.MOSS : undefined }); } },
  "signal-post": { family: "prop", path: "railway", desc: "a rusty old signal post, its arm dropped (unlit)", build(m) { pkBar(m, [0, 0, 0], [0, 2.2, 0], 1, .04); m.box([.25, 2.0, 0], [.25, .05, .02], M.ACCENT, { dir: [1, -.6, 0], group: 2, paint: p => p[0] > .38 ? M.BELLY : pkWorn(.4, 0)(p) }); m.ell([0, 2.05, .05], [.06, .06, .03], M.SHADES, { group: 3 }); pkIvy(m, [0, 0, .04], [.02, 1.4, .04], 4, 3); } },
  // crossings and steps
  "stairs": { family: "piece", path: "stairs", desc: "a short flight of mossy stone stairs, for ruins and hollows", build(m) { for (let k = 0; k < 5; k++) m.box([0, .1 + k * .2, -k * .3], [.6, .1 + k * .2, .15], M.STONE, { round: .03, rough: .01, group: 1 + (k % 2), paint: p => p[1] > .16 + k * .4 && pkCell(p, 6, k) < .35 ? M.MOSS : pkCell(p, 14) > .9 ? M.STONED : undefined }); for (const x of [-.7, .7]) pkStone(m, [x, .3, -.6], [.15, .35, .7], 5); } },
  "stairs-turn": { family: "piece", path: "stairs", desc: "stone stairs turning on a landing", build(m) { for (let k = 0; k < 3; k++) m.box([0, .1 + k * .2, -k * .3], [.5, .1 + k * .2, .15], M.STONE, { round: .03, rough: .01, group: 1 + (k % 2), paint: p => pkCell(p, 6, k) < .3 && p[1] > .2 + k * .4 ? M.MOSS : undefined }); m.box([0, .35, -1.1], [.55, .35, .5], M.STONE, { round: .03, group: 3, paint: p => pkCell(p, 6) < .3 && p[1] > .6 ? M.MOSS : undefined }); for (let k = 0; k < 3; k++) m.box([.65 + k * .3, .8 + k * .2, -1.1], [.15, .1 + k * .1, .5], M.STONE, { round: .03, group: 4 + (k % 2) }); } },
  "root-bridge": { family: "piece", path: "roots", desc: "a bridge of gnarled roots over a stream", build(m) { m.ell([0, .01, 0], [1.4, .015, .6], M.WATER, { group: 1 }); for (let i = 0; i < 4; i++) m.chain([[-1.8, 0, -.4 + i * .27, .14], [-.8, .45, -.35 + i * .25, .1], [.6, .5, -.3 + i * .22, .1], [1.8, 0, -.25 + i * .2, .13]], M.TRUNK, { group: 2 + (i % 2), rough: .015, paint: p => pkCell(p, 12) < .12 ? M.BARKD : p[1] > .55 && pkCell(p, 5) < .3 ? M.MOSS : undefined }); pkCrown(m, [-1.7, .25, -.5], [.3, .2, .25], 5); } },
  "footbridge": { family: "piece", path: "bridges", desc: "a little wooden footbridge over a stream", build(m) { m.ell([0, .01, 0], [1.2, .015, .7], M.WATER, { group: 1 }); for (let k = -6; k <= 6; k++) { const x = k * .2, y = .35 - (x * x) * .1; m.box([x, y, 0], [.09, .03, .5], M.WOOD, { round: .01, group: 2 + (k & 1), paint: p => pkCell(p, 10) < .15 ? M.MOSS : undefined }); } for (const z of [-.5, .5]) { for (const x of [-1.1, 0, 1.1]) m.seg([x, .3 - x * x * .1, z], [x, .85 - x * x * .1, z], .03, .03, M.WOOD, { group: 4 }); m.chain([[-1.1, .85 - .121, z, .025], [0, .85, z, .025], [1.1, .85 - .121, z, .025]], M.WOOD, { group: 4 }); } } },
  "rope-bridge": { family: "piece", path: "bridges", desc: "a rope bridge over a stream, planks sagging, one missing", build(m) { m.ell([0, .01, 0], [1.3, .015, .7], M.WATER, { group: 1 }); for (const x of [-1.6, 1.6]) for (const z of [-.45, .45]) m.seg([x, 0, z], [x, 1.1, z], .05, .045, M.WOOD, { group: 2 }); for (let k = -7; k <= 7; k++) { if (k === 3) continue; const x = k * .2, y = .55 - (1 - (x / 1.6) ** 2) * .3; m.box([x, y, 0], [.08, .02, .38], M.WOOD, { round: .01, group: 3 + (k & 1) }); } for (const z of [-.45, .45]) for (const top of [0, 1]) { const pts = []; for (let k = 0; k <= 8; k++) { const x = -1.6 + k * .4, y = (top ? 1.05 : .55) - (1 - (x / 1.6) ** 2) * (top ? .25 : .3); pts.push([x, y, z, .015]); } m.chain(pts, M.STRAW, { group: 5 }); } } },
  // railway landmarks
  "goods-wagon": { family: "landmark", path: "railway", desc: "an abandoned goods wagon tipped on its side (no livery)", build(m) { const n = m.parts.length; m.box([0, .75, 0], [1.6, .65, .6], M.BODY2, { round: .05, group: 1, paint: p => ((p[0] + 9) * 4) % 1 < .08 ? M.SHADES : pkWorn(.6, .2)(p) }); for (const x of [-1.1, 1.1]) for (const z of [-.55, .55]) m.ell([x, .22, z], [.22, .22, .06], M.SHADES, { group: 2, paint: p => Math.hypot(p[0] - x, p[1] - .22) < .08 ? M.FRAME : undefined }); pkPlace(m, n, { roll: 1.4, at: [0, .3, .3] }); pkTufts(m, 14, 2.2, 4, 5); pkIvy(m, [-1.2, 0, 1.0], [-.6, 1.0, 1.1], 7, 6); } },
  "carriage": { family: "landmark", path: "railway", glow: true, desc: "an old passenger carriage, mossy roof, a tree grown through it, its windows glowing", build(m) { m.box([0, .95, 0], [2.4, .65, .62], M.HAT1, { round: .08, group: 1, paint: p => { if (Math.abs(p[2]) > .58 && p[1] > 1.0 && p[1] < 1.35 && ((p[0] + 9) * 1.6) % 1 > .25) return pkCell(p, 9) < .2 ? M.SHADES : M.GLOW; return pkWorn(.4, .15)(p); } }); m.ell([0, 1.62, 0], [2.4, .14, .62], M.MOSS, { group: 2, paint: p => pkCell(p, 6) < .3 ? M.LEAF2 : undefined }); for (const x of [-1.8, 1.8]) for (const z of [-.5, .5]) m.ell([x, .25, z], [.24, .24, .06], M.SHADES, { group: 3 }); m.chain([[.6, 0, 0, .2], [.6, 1.8, 0, .16], [.7, 2.9, -.1, .09]], M.TRUNK, { group: 4, rough: .015 }); pkCrown(m, [.7, 3.1, -.1], [1.0, .6, .8], 5); pkTufts(m, 16, 2.8, 6, 7); } },
  "platform": { family: "landmark", path: "railway", desc: "a little station platform, a bench and a lamp post (no name board)", build(m) { m.box([0, .35, 0], [2.4, .35, .7], M.STONE, { round: .02, rough: .008, group: 1, paint: p => p[2] > .62 && p[1] > .6 ? M.BELLY : p[1] > .66 && pkCell(p, 5) < .25 ? M.MOSS : ((p[0] + 9) * 2.5) % 1 < .06 ? M.STONED : undefined }); m.box([-.6, .95, -.3], [.6, .04, .16], M.WOOD, { group: 2 }); m.box([-.6, 1.2, -.44], [.6, .18, .03], M.WOOD, { group: 2 }); for (const x of [-1.1, -.1]) m.box([x, .82, -.3], [.04, .12, .14], M.FRAME, { group: 2 }); pkBar(m, [1.4, .7, -.4], [1.4, 2.4, -.4], 3, .035); m.box([1.4, 2.5, -.4], [.12, .12, .12], M.FRAME, { round: .03, group: 4, paint: p => Math.abs(p[1] - 2.5) < .07 ? M.SHADES : undefined }); pkIvy(m, [1.4, .7, -.36], [1.42, 2.2, -.36], 5, 8); pkTufts(m, 10, 2.4, 6, 9); } },
  "level-crossing": { family: "landmark", path: "railway", desc: "a level crossing's barrier post, its boom broken off and lying in the grass", build(m) { m.box([0, .55, 0], [.15, .55, .15], M.BELLY, { round: .03, group: 1, paint: pkWorn(.3, .15) }); m.box([.6, 1.05, 0], [.6, .05, .04], M.BELLY, { group: 2, paint: p => ((p[0] + 9) * 2.5) % 1 < .5 ? M.ACCENT : pkWorn(.3, 0)(p) }); m.box([1.6, .05, .4], [.7, .05, .04], M.BELLY, { dir: [1, 0, .5], group: 3, paint: p => ((p[0] + 9) * 2.5) % 1 < .5 ? M.ACCENT : pkWorn(.3, .15)(p) }); pkBar(m, [-.5, 0, 0], [-.5, 1.6, 0], 4, .03); for (const s of [-1, 1]) m.box([-.5, 1.6, 0], [.35, .04, .015], M.BELLY, { dir: [1, s, 0], group: 5 }); pkTufts(m, 10, 1.6, 6, 10); } },
  "buffer-stop": { family: "landmark", path: "railway", desc: "a buffer stop at the end of the line: a timber beam on rusty posts, its buffers worn, grass round its short stub of track", build(m) { for (const z of [-.45, .45]) { pkBar(m, [-.2, 0, z], [0, .75, z], 1, .05); pkBar(m, [.35, 0, z], [0, .7, z], 1, .04); m.seg([0, .62, z], [.22, .62, z], .07, .07, M.FRAME, { group: 2, paint: pkWorn(.5, 0) }); m.ell([.25, .62, z], [.03, .1, .1], M.SHADES, { group: 2 }); } m.box([0, .7, 0], [.08, .1, .75], M.ACCENT, { round: .02, group: 3, paint: p => ((p[2] + 9) * 4) % 1 < .5 ? M.BELLY : pkWorn(.4, .1)(p) }); for (const z of [-.3, .3]) m.seg([.2, .03, z], [2.0, .03, z], .03, .03, M.SHADES, { group: 4, paint: p => p[1] > .05 ? M.FRAME : undefined }); for (let i = 0; i < 4; i++) m.box([.5 + i * .45, .02, 0], [.07, .02, .45], M.WOOD, { group: 5, paint: p => pkCell(p, 9) < .3 ? M.MOSS : undefined }); pkTufts(m, 12, 1.4, 6, 12); } },
  "signal-gantry": { family: "landmark", path: "railway", desc: "a rusty signal gantry spanning the line, its signals dark", build(m) { for (const x of [-2.0, 2.0]) for (const z of [-.15, .15]) pkBar(m, [x, 0, z], [x, 3.0, z], 1, .04); for (let i = 0; i < 8; i++) { const x = -2.0 + i * .5; pkBar(m, [x, 2.8, 0], [x + .5, 3.1, 0], 2, .02); pkBar(m, [x, 3.1, 0], [x + .5, 2.8, 0], 2, .02); } for (const y of [2.8, 3.1]) pkBar(m, [-2.0, y, 0], [2.0, y, 0], 3, .035); for (const x of [-.8, .8]) { pkBar(m, [x, 2.8, .05], [x, 2.3, .05], 4, .02); m.box([x, 2.2, .08], [.12, .2, .05], M.SHADES, { round: .03, group: 5, paint: p => Math.hypot(p[0] - x, p[1] - 2.27) < .05 || Math.hypot(p[0] - x, p[1] - 2.13) < .05 ? M.FRAME : undefined }); } pkIvy(m, [-2.0, 0, .2], [-1.95, 2.4, .2], 6, 11); } },
};
export const PATH_PIECES = Object.entries(PIECES).map(([id, d]) => ({ id, ...d }));
export const PATH_PIECE_BY_ID = Object.fromEntries(PATH_PIECES.map(d => [d.id, d]));
export function pathColours(st = {}) {
  const leaf = st.leafHue ?? .3, trunk = st.trunkHue ?? .07;
  return {
    [M.STONE]: [118, 116, 124], [M.STONED]: [58, 56, 66], [M.MOSS]: hsv2rgb(.26, .45, .45), [M.BELLY]: [220, 216, 204], [M.CLOTH]: [208, 204, 188],
    [M.BARK2]: [104, 80, 56], [M.BARKD]: hsv2rgb(trunk + .03, .5, .17), [M.BODY2]: [128, 98, 70], [M.BARKL]: hsv2rgb(trunk, .35, .55), [M.TRUNK]: hsv2rgb(trunk, .45, .36),
    [M.LEAF]: hsv2rgb(leaf, .55, .45), [M.LEAF2]: hsv2rgb(leaf - .03, .5, .6), [M.LEAF3]: hsv2rgb(leaf + .03, .6, .28),
    [M.WOOD]: [128, 94, 60], [M.STRAW]: [180, 156, 104], [M.FRAME]: [168, 120, 92], [M.SHADES]: [26, 26, 32], [M.ACCENT]: [176, 52, 46], [M.HAT1]: [66, 92, 74], [M.WATER]: [44, 70, 96], [M.NOSE]: [14, 12, 18],
    [M.GLOW]: [255, 196, 110], [M.MAGIC]: hsv2rgb(st.magicHue ?? .5, .55, 1), [M.MAGIC2]: hsv2rgb(st.magicHue ?? .5, .15, 1), [M.RUNE]: [150, 240, 255], [M.LINE]: [24, 22, 30],
  };
}
// One 3D piece at the game's view, cropped to what is drawn: { sp, origin, metres }.
// "<bridge>~<k>": the bridge's generated variant k (art/props/bridges.js, under ?props=gen).
export function pathPieceSprite(id, st = {}, ppm = 16) {
  const [base, k] = id.split("~"), d = PATH_PIECE_BY_ID[base]; if (k !== undefined ? !BRIDGE_GENOMES[base] : !d) throw new Error(`no path piece "${id}"`); // (the fingerpost has only generated variants)
  const m = new Model({ blend: .04 }); if (k !== undefined) buildBridge(m, base, +k); else d.build(m); m.ell([0, .004, 0], [.01, .004, .01], M.NOSE, { group: 0 });
  const s = witchPixelsPerUnit(st) * 1.1, r = render(m, { scale: s }), full = r.sp;
  let x0 = full.w, x1 = -1, y0 = full.h; for (let y = 0; y < full.h; y++) for (let x = 0; x < full.w; x++) if (full.m[y * full.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); }
  const sp = new Sprite(x1 - x0 + 1, full.h - y0); for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) { const i = (y + y0) * full.w + x + x0; if (full.m[i]) sp.put(x, y, full.m[i], full.n[i * 3], full.n[i * 3 + 1], full.n[i * 3 + 2]); }
  const [ox, oy] = r.project([0, 0, 0]);
  return { sp, origin: { x: +(ox - x0).toFixed(1), y: +(oy - y0).toFixed(1) }, metres: { width: +(sp.w / ppm).toFixed(1), height: +(sp.h / ppm).toFixed(1) } };
}
// The areas each path kind suits, turned round: { areaId: [kinds] }, for an area's layout to name its preferred paths; with each
// area's own extra kinds (areas: art/areas.js AREAS, an area's `pathKinds`: stairs on the steep ones, bridges over the stream).
export function pathKindsByArea(areas = []) { const out = {}; for (const [k, K] of Object.entries(PATH_KINDS)) for (const a of K.moods) (out[a] = out[a] || []).push(k); for (const A of areas) for (const k of A.pathKinds || []) (out[A.id] = out[A.id] || []).push(k); return out; }
