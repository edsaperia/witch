// Small set pieces from genomes (art builder 1's ask on #119: "a generated small set piece, a ring, a heap, a jetty or a punt from a
// genome, would let new areas have their own"): an area's landmark built from its genome and a seed, like the props (art/props/
// generator.js), so an area recipe (art/recipes/) can name one as its `setPiece` ([kind, text, size, { seed, ...numbers }]) and get
// a set piece of its own instead of reusing another area's builder. Each is 6 to 12 m across, at the witch's scale, standing on its
// bottom row, its origin the ground under its middle (as art/setpieces.js gives the hand-made ones). Most are unlit; a jetty's lantern
// and a ring's embers are their one warm touch.
//   punt:  a flat-bottomed punt sunk at a slant in a pool among reeds, whole, its stern broken or swamped, a pole stuck in the mud
//   jetty: a plank jetty on posts running out over a pool from its far shore, planks missing, its end a mooring post, a ladder,
//          a lantern or a little boat tied up
//   ring:  a ring of small stones, posts or stumps round trodden grass, a gap for a way in, one or two fallen, a fire pit, a stone,
//          a stump or a slab altar in the middle
//   heap:  a big heap of stones, logs, brushwood or dressed rubble, mossed over, things spilled round its foot, a post or slab on top
import { M, Sprite, hsv2rgb, hash2, rng } from "../core.js";
import { Model, render, v3 } from "../model3d.js";
import { witchPixelsPerUnit, cleanFlecks } from "../witch.js";
import { groundColours } from "../ground.js";

// Ranges [lo, hi] (whole numbers stay whole), choices [[option, weight], ...], colours [h, s, v] (a list of [h, s, v, weight] picks one).
export const SET_PROP_GENOMES = {
  punt: {
    length: [4.2, 6], beam: [1.1, 1.5], depth: [.35, .55], yaw: [-.45, .45], sink: [.15, .5], // m; its heading in the picture (radians); how far its stern is sunk (a share of its depth)
    state: [["whole", 2], ["broken", 1], ["swamped", 2]], thwarts: [1, 3], pole: [0, 1], cargo: [["none", 3], ["trap", 2], ["nets", 1]], // a broken stern; swamped: water inside; a pole stuck in the mud (a chance); an eel trap or nets in it
    radius: [3.1, 3.8], aspect: [.5, .7], waves: [2, 4], wobble: [.06, .16], rim: [.2, .4], reeds: [3, 6], reedsPer: [5, 9], reedHeight: [.6, 1.2], stones: [1, 4], // its pool
    colour: { wood: [[.08, .18, .45, 2], [.07, .35, .24, 1], [.36, .3, .38, 1]], spread: .05 }, // weathered grey, tarred, or old green paint
  },
  jetty: {
    length: [5.5, 8], width: [1.1, 1.5], deck: [.35, .6], sag: [0, .18], kink: [-.35, .35], heading: [-.5, .5], // m; the deck's height over the water and how much its far end droops; a bend halfway; its heading
    missing: [0, 3], posts: [3, 5], end: [["post", 2], ["ladder", 1], ["lantern", 2], ["boat", 1]], rail: [["none", 2], ["one", 1]],
    radius: [3.4, 4.3], aspect: [.5, .65], waves: [2, 4], wobble: [.05, .14], rim: [.2, .35], reeds: [2, 5], reedsPer: [4, 8], reedHeight: [.5, 1.1], stones: [2, 5],
    colour: { wood: [[.08, .22, .42, 2], [.07, .4, .3, 1]], spread: .05 },
  },
  ring: {
    radius: [2.8, 3.5], count: [7, 11], member: [["stone", 3], ["post", 2], ["stump", 2]], height: [1.1, 2], width: [.5, .8], // m
    gap: [0, 1], lean: [0, .22], fallen: [0, 2], centre: [["fire", 2], ["stone", 2], ["stump", 1], ["altar", 1]], embers: [0, 1], // a way in (a chance); a fire pit's embers glow (a chance)
    colour: { stone: [.61, .14, .62], dark: [.65, .16, .38], wood: [.07, .38, .32], moss: [.24, .45, .38], spread: .06 },
  },
  heap: {
    of: [["stones", 3], ["logs", 2], ["brush", 1], ["rubble", 2]], width: [6.2, 7.8], height: [1.8, 3], depth: [.55, .8], // what; m across; how deep into the picture, times across
    pieces: [36, 60], moss: [.1, .5], spill: [5, 11], top: [["none", 2], ["post", 1], ["slab", 1]],
    colour: { stone: [.61, .14, .6], dark: [.65, .16, .36], wood: [.07, .38, .34], moss: [.24, .45, .38], cloth: [[.0, .5, .6, 1], [.6, .3, .6, 1], [.13, .4, .75, 1]], spread: .06 },
  },
};
export const SET_PROP_KINDS = Object.keys(SET_PROP_GENOMES);

const GS_U = 1 / 1.9; // model units a metre (the witch's model is about 1.9 m a unit)
const gsPick = (r, opts) => { const tot = opts.reduce((a, [, w]) => a + w, 0); let x = r() * tot; for (const [v, w] of opts) if ((x -= w) < 0) return v; return opts[0][0]; };
// A variant: each range picked within, each list of options by weight; `over` fixes any of them.
export function setPropVariant(kind, seed = 0, over = {}) {
  const G = SET_PROP_GENOMES[kind]; if (!G) throw new Error(`no set piece kind "${kind}"`);
  const r = rng(((seed + 3) * 2246822519 + kind.length * 131) >>> 0), v = {};
  for (const [k, g] of Object.entries(G)) {
    if (k === "colour") continue;
    if (Array.isArray(g[0])) v[k] = gsPick(r, g);
    else { const x = g[0] + (g[1] - g[0]) * r(); v[k] = Number.isInteger(g[0]) && Number.isInteger(g[1]) && g[1] - g[0] >= 1 ? Math.round(x) : x; }
  }
  v.seed = seed; v.r = r;
  return Object.assign(v, Object.fromEntries(Object.entries(over).filter(([k]) => k in G && k !== "colour")));
}
const gsCell = (p, k, seed) => hash2(Math.floor(p[0] * k + 500), Math.floor(p[1] * k + 500) + Math.floor(p[2] * k + 500) * 131, seed);
const gsGrain = (p, d, k = 9) => { const s = v3.dot(p, d) * k; return (s - Math.floor(s)) < .12 ? M.BARKD : undefined; }; // plank seams across a direction
const gsPlanks = (d, up) => p => { const s = v3.dot(p, up) * 16; return (s - Math.floor(s)) < .14 ? M.BARKD : gsCell(p, 6, 3) < .1 ? M.MOSS : undefined; }; // a hull's strakes: seams along it, a little moss

// A pool with an irregular shore, a mud rim, a moonlit far rim and the sky's faint reflection (as the props' pool), reeds and stones
// round it; returns the shore's point at an angle (k: times its radius).
function gsPool(m, v, R, A, { reedsAt } = {}) {
  const r = v.r, rimW = v.rim * GS_U / R;
  const waves = [...Array(v.waves).keys()].map(k => [k + 2, (r() - .5) * 2 * v.wobble, r() * Math.PI * 2]);
  const shore = a => 1 + waves.reduce((s, [k, amp, ph]) => s + amp * Math.cos(k * a + ph), 0) - v.wobble * .4;
  const glints = [...Array(4 + Math.floor(r() * 3)).keys()].map(() => [(r() - .5) * 1.2, (r() - .5) * .9, .04 + r() * .05]);
  const W = 1 + v.wobble + rimW;
  m.flat([0, .004, 0], [1, 0, 0], [0, 0, -1], R * W, R * A * W, (s, t) => {
    const a = Math.atan2(t, s), d = Math.hypot(s, t) / W, e = shore(a) / W;
    if (d > e + rimW / W) return undefined;
    if (d > e) return d > e + rimW / W * .5 ? M.BODY : M.BARK2;
    if (glints.some(([gx, gy, gr]) => Math.abs(s - gx) < gr * 1.4 && Math.abs(t - gy) < gr * .5)) return M.GLINT;
    if (t > -.1 && d > e - .06) return M.WEB;
    if (t > .12 && d < e * .93 && d > e * .3) return M.ACCENT;
    return d < e * .55 ? M.BODY2 : M.WATER;
  }, { group: 1, bend: .04 });
  const edge = (a, k = 1) => { const e = shore(a) * k; return [Math.cos(a) * R * e, 0, -Math.sin(a) * R * A * e]; };
  for (let c = 0; c < v.reeds; c++) {
    const a0 = reedsAt ? reedsAt(c) : r() * Math.PI * 2;
    for (let i = 0; i < v.reedsPer; i++) {
      const p = edge(a0 + (r() - .5) * .45, .9 + r() * .18), h = v.reedHeight * GS_U * (.55 + r() * .55), tip = v3.add(p, [(r() - .5) * .1, h, (r() - .5) * .06]);
      m.seg(p, tip, .024, .006, i % 3 ? M.LEAF : M.LEAF2, { group: 40 + c });
      if (i % 3 === 0 && r() < .5) m.ell(v3.lerp(p, tip, .8), [.024, .065, .024], M.TRUNK, { dir: v3.sub(tip, p), group: 40 + c });
    }
  }
  for (let k = 0; k < v.stones; k++) { const p = edge(r() * Math.PI * 2, 1 + rimW * .5), s = (.1 + r() * .14) * GS_U * 2; m.ell(v3.add(p, [0, s * .3, 0]), [s, s * .55, s * .8], M.STONE, { rough: .02, group: 60 + k, dir: [r() - .5, .1, r() - .5] }); }
  return edge;
}

// ---- punt: a long flat-bottomed boat, square raked ends, sunk at a slant in its pool ----
function gsPunt(m, v) {
  const r = v.r, R = v.radius * GS_U, A = v.aspect;
  gsPool(m, v, R, A);
  const L = v.length * GS_U / 2, B = v.beam * GS_U / 2, D = v.depth * GS_U, tilt = v.sink * D / L;
  const d = v3.norm([Math.cos(v.yaw), tilt, Math.sin(v.yaw) * .8]), side = v3.norm(v3.cross([0, 1, 0], d)), up = v3.norm(v3.cross(d, side));
  const c = [-R * .08, D * (.55 - v.sink * .4), R * A * .1], at = (s, u = 0, w = 0) => v3.add(c, v3.add(v3.mul(d, s), v3.add(v3.mul(up, u), v3.mul(side, w))));
  m.box(c, [L, D / 2, B], M.WOOD, { dir: d, up, round: .03, group: 2, paint: gsPlanks(d, up) });
  m.box(at(0, D * .34), [L - .05, D * .42, B - .05], M.BARKD, { dir: d, up, group: 2, cut: true }); // hollow, its floor kept
  for (const s of [-1, 1]) m.box(at(s * L, -D * .55), [L * .2, D * .5, B * 1.3], M.WOOD, { dir: v3.norm(v3.add(d, v3.mul(up, s * .9))), up, group: 2, cut: true }); // raked ends
  if (v.state === "broken") m.box(at(L * .85, D * .2, B * .4), [L * .22, D * .7, B * .55], M.BARKD, { dir: v3.norm(v3.add(d, [0, .4, 0])), group: 2, cut: true }); // its stern stove in
  if (v.state === "swamped") m.flat(at(-L * .05, -D * .12), d, side, L * .82, B * .82, (s, t) => Math.hypot(s * .9, t) < 1 ? (s > .5 ? M.WEB : M.WATER) : undefined, { group: 3, bend: .02 }); // water inside, its far end lit
  for (let i = 0; i < v.thwarts; i++) { const s = ((i + 1) / (v.thwarts + 1) - .5) * L * 1.5; m.box(at(s, D * .3), [.035, .02, B - .06], M.WOOD, { dir: d, up, group: 4, paint: p => gsGrain(p, side, 14) }); }
  if (v.cargo === "trap") { const p = at(-L * .3, D * .25, B * .2); m.ell(p, [.18, .1, .1], M.STRAW, { dir: d, group: 5, paint: p2 => Math.sin(v3.dot(p2, d) * 60) > .6 ? M.BARKD : undefined }); } // a wicker eel trap
  if (v.cargo === "nets") m.ell(at(L * .25, D * .25, -B * .2), [.22, .07, .16], M.CLOTH, { group: 5, rough: .03, paint: p => gsCell(p, 30, 2) < .3 ? M.BARKD : undefined });
  if (v.pole > .4) { const b = [c[0] + Math.cos(v.yaw) * L * 1.3 + side[0] * .2, -.05, c[2] + .35]; m.seg(b, v3.add(b, [-.3, 2.4 * GS_U, -.12]), .022, .018, M.WOOD, { group: 6 }); } // a punt pole stuck in the mud, leaning
}

// ---- jetty: planks on two stringers on posts, from the pool's far shore out over its water ----
function gsJetty(m, v) {
  const r = v.r, R = v.radius * GS_U, A = v.aspect;
  const edge = gsPool(m, v, R, A, { reedsAt: c => Math.PI * .5 + (c % 2 ? 1 : -1) * (.35 + c * .25) });
  const W = v.width * GS_U / 2, H = v.deck * GS_U, L0 = v.length * GS_U;
  const start = edge(Math.PI * .55, 1.05), a0 = Math.PI * .5 + v.heading; // from the far shore, heading towards us
  const dir1 = v3.norm([Math.cos(a0) * .6, 0, Math.sin(a0)]), dir2 = v3.norm([Math.cos(a0 + v.kink) * .6, 0, Math.sin(a0 + v.kink)]);
  const path = (s, l) => s < l / 2 ? v3.add(start, v3.mul(dir1, s)) : v3.add(v3.add(start, v3.mul(dir1, l / 2)), v3.mul(dir2, s - l / 2));
  const inside = p => (p[0] / R) ** 2 + (p[2] / (R * A)) ** 2 < .62;
  let L = L0; while (L > L0 * .45 && !inside(path(L, L))) L *= .95; // it ends out over the water, never past the near shore
  const along = s => path(s, L);
  const dirAt = s => s < L / 2 ? dir1 : dir2, deckY = s => H * (1 - v.sag * (s / L) ** 2 * 2.2);
  m.ell(v3.add(start, [0, -.05, -.1]), [.9, .22, .45], M.BODY, { group: 2, rough: .02, paint: p => gsCell(p, 4, 9) < .3 ? M.MOSS : undefined }); // the bank it starts from
  const nP = Math.round(L / (.16 * GS_U * 2.6)), missing = new Set([...Array(v.missing).keys()].map(() => 3 + Math.floor(r() * (nP - 5))));
  for (let i = 0; i < nP; i++) {
    if (missing.has(i)) continue;
    const s = (i + .5) / nP * L, p = along(s), d = dirAt(s), side = v3.norm(v3.cross([0, 1, 0], d)), jag = (r() - .5) * .03;
    m.box(v3.add(p, [0, deckY(s), 0]), [.075, .018, W + jag], M.WOOD, { dir: d, group: 3, round: .008, paint: q => gsCell(q, 5, i) < .07 ? M.MOSS : undefined });
    if (i === 0 || i === nP - 1) continue;
    for (const k of [-1, 1]) m.box(v3.add(v3.add(p, v3.mul(side, k * W * .7)), [0, deckY(s) - .04, 0]), [L / nP * .55, .025, .025], M.BARKD, { dir: d, group: 4, round: .01 }); // stringers under the deck
  }
  for (let j = 0; j < v.posts; j++) {
    const s = (j + .5) / v.posts * L, p = along(s), d = dirAt(s), side = v3.norm(v3.cross([0, 1, 0], d));
    for (const k of [-1, 1]) { const b = v3.add(p, v3.mul(side, k * (W + .03))), top = deckY(s) + .02 + (r() < .3 ? .12 : 0); m.seg(v3.add(b, [0, -.02, 0]), v3.add(b, [0, top, 0]), .045, .04, M.TRUNK, { group: 5 + j, paint: q => q[1] < .05 ? M.MOSS : undefined }); }
  }
  const end = along(L), dE = dirAt(L), sideE = v3.norm(v3.cross([0, 1, 0], dE)), yE = deckY(L);
  if (v.rail === "one") { const k = r() < .5 ? -1 : 1; for (let j = 0; j <= 3; j++) { const s = L * (.35 + j * .2), p = v3.add(along(s), v3.mul(dirAt(s), 0)), b = v3.add(p, v3.mul(v3.norm(v3.cross([0, 1, 0], dirAt(s))), k * W)); m.seg(v3.add(b, [0, deckY(s), 0]), v3.add(b, [0, deckY(s) + .5 * GS_U * 1.9 * .55, 0]), .02, .02, M.WOOD, { group: 12 }); } const a = v3.add(along(L * .35), v3.mul(v3.norm(v3.cross([0, 1, 0], dirAt(L * .35))), k * W)), b = v3.add(along(L * .95), v3.mul(v3.norm(v3.cross([0, 1, 0], dirAt(L * .95))), k * W)); m.seg(v3.add(a, [0, deckY(L * .35) + .52, 0]), v3.add(b, [0, deckY(L * .95) + .52, 0]), .018, .018, M.WOOD, { group: 12 }); }
  if (v.end === "post" || v.end === "lantern") {
    const b = v3.add(end, v3.mul(sideE, W * .8)), h = yE + (v.end === "lantern" ? 1.0 : .45);
    m.seg(v3.add(b, [0, -.02, 0]), v3.add(b, [0, h, 0]), .05, .045, M.TRUNK, { group: 13 });
    if (v.end === "post") m.ell(v3.add(b, [0, h - .12, 0]), [.07, .03, .07], M.STRAW, { group: 13 }); // a coil of rope round it
    else { const tip = v3.add(b, [-.22, h, 0]); m.seg(v3.add(b, [0, h - .02, 0]), tip, .015, .015, M.TRUNK, { group: 13 }); m.seg(tip, v3.add(tip, [0, -.1, 0]), .006, .006, M.BARKD, { group: 14 }); m.ell(v3.add(tip, [0, -.17, 0]), [.06, .08, .06], M.GLOW, { group: 14 }); m.box(v3.add(tip, [0, -.09, 0]), [.06, .012, .06], M.BARKD, { group: 14 }); } // a lit lantern hanging off a crook
  }
  if (v.end === "ladder") for (const k of [-.4, .4]) { const b = v3.add(v3.add(end, v3.mul(dE, .05)), v3.mul(sideE, k * W)); m.seg(v3.add(b, [0, -.02, 0]), v3.add(b, [0, yE + .1, 0]), .018, .018, M.WOOD, { group: 15 }); if (k > 0) for (let i = 1; i < 4; i++) m.seg(v3.add(v3.add(end, v3.mul(dE, .05)), v3.add(v3.mul(sideE, -.4 * W), [0, yE * i / 4, 0])), v3.add(v3.add(end, v3.mul(dE, .05)), v3.add(v3.mul(sideE, .4 * W), [0, yE * i / 4, 0])), .012, .012, M.WOOD, { group: 15 }); }
  if (v.end === "boat") { const c = v3.add(v3.add(end, v3.mul(sideE, W + .45)), [0, .05, -.15]), bd = v3.norm(v3.add(dE, [0, 0, -.2])); m.ell(c, [.6, .17, .26], M.WOOD, { dir: bd, group: 16, paint: q => (q[1] * 30 % 1 + 1) % 1 < .2 ? M.BARKD : undefined }); m.ell(v3.add(c, [0, .1, 0]), [.55, .14, .21], M.BARKD, { dir: bd, group: 16, cut: true }); m.seg(v3.add(c, [-.1, .12, -.05]), v3.add(end, [0, yE, 0]), .006, .006, M.STRAW, { group: 17 }); } // a little rowing boat tied up
}

// ---- ring: small stones, posts or stumps round a trodden ring of grass; a way in, a fallen one or two, something in the middle ----
function gsRing(m, v) {
  const r = v.r, R = v.radius * GS_U, A = .7, H = v.height * GS_U, Wd = v.width * GS_U / 2;
  m.flat([0, .003, 0], [1, 0, 0], [0, 0, -1], R * 1.2, R * A * 1.2, (s, t) => { const d = Math.hypot(s, t) + (gsCell([s, 0, t], 4, 4) - .5) * .12; return d < 1 ? (d > .72 && d < .9 || d < .28 ? M.BELLY : M.LEAF3) : undefined; }, { group: 1, bend: .04 }); // a trodden path round inside the ring and its middle worn bare, short grass between
  const gapAt = Math.PI * .5 + (r() - .5) * .8, gapW = v.gap > .45 ? Math.PI * 2 / v.count * 1.1 : 0, fallen = new Set([...Array(v.fallen).keys()].map(() => Math.floor(r() * v.count)));
  for (let i = 0; i < v.count; i++) {
    const a = i / v.count * Math.PI * 2 + r() * .15, da = Math.atan2(Math.sin(a - gapAt), Math.cos(a - gapAt));
    if (gapW && Math.abs(da) < gapW) continue;
    const p = [Math.cos(a) * R, 0, Math.sin(a) * R * A], h = H * (.65 + r() * .5), w = Wd * (.8 + r() * .4), out = v3.norm([Math.cos(a), 0, Math.sin(a)]), g = 10 + i;
    if (fallen.has(i)) { const d = v3.norm([Math.cos(a + 1.4), 0, Math.sin(a + 1.4)]); m.box(v3.add(p, [0, w * .4, 0]), [h * .5, w * .4, w * .7], v.member === "stone" ? M.STONE : M.TRUNK, { dir: d, round: .03, group: g, paint: q => q[1] > w * .55 ? M.MOSS : undefined }); continue; }
    const lean = v.lean * (r() - .3), up = v3.norm(v3.add([0, 1, 0], v3.mul(out, lean))), top = v3.add(p, v3.mul(up, h));
    if (v.member === "stone") m.box(v3.add(p, v3.mul(up, h * .45)), [h * .5, w, w * .55], M.STONE, { dir: up, up: [-out[2], 0, out[0]], round: w * .45, group: g, rough: .01, paint: q => q[1] < h * .18 ? M.MOSS : gsCell(q, 7, g) < .12 ? M.BELLY : undefined });
    else if (v.member === "post") { m.seg(p, top, w * .55, w * .45, M.TRUNK, { group: g, paint: q => { const y = (q[1] / h) * 5; return y - Math.floor(y) < .12 ? M.BARKD : q[1] < h * .15 ? M.MOSS : undefined; } }); m.ell(top, [w * .45, w * .2, w * .45], M.BELLY, { group: g }); } // carved bands, a weathered top
    else { const hh = h * .45; m.seg(p, v3.add(p, [0, hh, 0]), w * .95, w * .8, M.TRUNK, { group: g, rough: .015, paint: q => q[1] < hh * .3 ? M.MOSS : undefined }); m.ell(v3.add(p, [0, hh, 0]), [w * .8, .012, w * .8], M.BELLY, { group: g, paint: q => Math.hypot(q[0] - p[0], q[2] - p[2]) % .06 < .015 ? M.ACCENT : undefined }); } // a stump's rings on top
  }
  if (v.centre === "fire") {
    for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2, s = .07 + r() * .03; m.ell([Math.cos(a) * .32, s * .5, Math.sin(a) * .32 * A], [s, s * .6, s * .8], M.STONE, { group: 30 + i, rough: .01 }); }
    for (let i = 0; i < 3; i++) { const a = i * 2.1 + r(); m.seg([Math.cos(a) * .25, .04, Math.sin(a) * .18], [-Math.cos(a) * .06, .1, -Math.sin(a) * .05], .035, .03, M.BARKD, { group: 38 + i }); }
    if (v.embers > .5) for (let i = 0; i < 5; i++) m.ell([(r() - .5) * .22, .05, (r() - .5) * .14], [.025, .02, .025], M.GLOW, { group: 41 + i }); // embers still glowing
  } else if (v.centre === "stone") m.box([0, H * .6, 0], [Wd * 1.4, H * .62, Wd * .7], M.STONE, { round: Wd * .5, group: 30, paint: q => q[1] < H * .15 ? M.MOSS : undefined });
  else if (v.centre === "stump") { m.seg([0, 0, 0], [0, H * .4, 0], Wd * 1.6, Wd * 1.4, M.TRUNK, { group: 30, rough: .02 }); m.ell([0, H * .4, 0], [Wd * 1.4, .015, Wd * 1.4], M.BELLY, { group: 30, paint: q => Math.hypot(q[0], q[2]) % .07 < .018 ? M.ACCENT : undefined }); }
  else { for (const x of [-.3, .3]) m.box([x, .12, 0], [.1, .12, .2], M.STONE, { group: 30, round: .04 }); m.box([0, .27, 0], [.48, .04, .27], M.STONE, { group: 31, round: .03, paint: q => q[1] > .29 && gsCell(q, 6, 2) < .3 ? M.MOSS : undefined }); } // a slab on two stones
}

// ---- heap: stones, logs, brushwood or dressed rubble piled in a low dome, spilled round its foot, mossed over its top ----
function gsHeap(m, v) {
  const r = v.r, Wh = v.width * GS_U / 2, Hh = v.height * GS_U, Dh = Wh * v.depth;
  const at = (u, w) => { const x = u * Wh, z = w * Dh, k = 1 - (u * u + w * w); return [x, Math.max(0, Hh * Math.sqrt(Math.max(0, k))), z]; }; // a point on its dome
  const mossy = q => q[1] > Hh * (1 - v.moss) ? M.MOSS : undefined;
  const n = v.of === "brush" ? Math.round(v.pieces * 1.6) : v.pieces;
  for (let i = 0; i < n; i++) {
    const t = i / n, ring = Math.sqrt(1 - t) * .95, a = r() * Math.PI * 2, base = at(Math.cos(a) * ring, Math.sin(a) * ring), g = 2 + (i % 24);
    const p = v3.add(base, [0, -.05, 0]), s = (.18 + r() * .2) * GS_U * 2;
    if (v.of === "stones") m.ell(p, [s, s * .6, s * .8], M.STONE, { group: g, rough: .02, dir: [r() - .5, .2, r() - .5], paint: q => mossy(q) ?? (gsCell(q, 9, i) < .08 ? M.BELLY : undefined) });
    else if (v.of === "rubble") m.box(p, [s * 1.1, s * .55, s * .7], M.STONE, { group: g, round: .02, dir: [Math.cos(a + 1.6), (r() - .5) * .4, Math.sin(a + 1.6)], paint: q => mossy(q) ?? (gsCell(q, 5, i) < .15 ? M.STONED : undefined) }); // dressed blocks, a few cracked
    else if (v.of === "logs") { const d = [1, (r() - .5) * .15, (r() - .5) * .25], l = s * (2.2 + r() * 1.5); m.seg(v3.sub(p, v3.mul(d, l)), v3.add(p, v3.mul(d, l)), s * .45, s * .42, M.TRUNK, { group: g, paint: q => mossy(q) ?? (gsCell(q, 14, i) < .12 ? M.BARKD : undefined) }); m.ell(v3.add(p, v3.mul(d, l + .005)), [.006, s * .43, s * .43], M.BELLY, { dir: d, group: g }); } // logs stacked lengthways, their sawn ends to us
    else { const d = v3.norm([r() - .5, (r() - .5) * .6, r() - .5]), l = s * (2 + r() * 2); m.chain([[...v3.sub(p, v3.mul(d, l)), .022], [...p, .018], [...v3.add(p, v3.add(v3.mul(d, l), [0, (r() - .5) * .15, 0])), .008]], i % 3 ? M.TRUNK : M.BARKL, { group: g }); } // brushwood
  }
  if (v.of === "brush") m.ell([0, Hh * .3, 0], [Wh * .62, Hh * .55, Dh * .6], M.BARKD, { group: 1, rough: .04, paint: q => gsCell(q, 8, 3) < .35 ? M.TRUNK : undefined }); // its dark tangled heart
  else m.ell([0, 0, 0], [Wh * .82, Hh * .88, Dh * .82], v.of === "logs" ? M.TRUNK : M.STONE, { group: 1, rough: .03, paint: q => mossy(q) ?? (gsCell(q, 6, 11) < .4 ? (v.of === "logs" ? M.BARKD : M.STONED) : undefined) }); // a core under the pieces, so the heap is solid
  for (let i = 0; i < v.spill; i++) { const a = r() * Math.PI * 2, p = [Math.cos(a) * Wh * (1 + r() * .15), 0, Math.sin(a) * Dh * (1 + r() * .15)], s = (.12 + r() * .12) * GS_U * 2; if (v.of === "logs" || v.of === "brush") m.seg(v3.add(p, [-s * 1.5, s * .4, 0]), v3.add(p, [s * 1.5, s * .4, (r() - .5) * s]), s * .4, s * .38, M.TRUNK, { group: 30 + i }); else m.ell(v3.add(p, [0, s * .35, 0]), [s, s * .55, s * .8], M.STONE, { group: 30 + i, rough: .02 }); }
  const peak = [0, Hh, 0];
  if (v.top === "post") { m.seg(v3.add(peak, [0, -.1, 0]), v3.add(peak, [.05, .75, 0]), .03, .025, M.TRUNK, { group: 50 }); m.flat(v3.add(peak, [.2, .65, .01]), [1, -.15, 0], [0, 1, 0], .17, .07, (s, t) => t > -1 + (s + 1) * .3 * (s > 0 ? 1 : 0) ? M.CLOTH : undefined, { group: 51 }); } // a stick with a rag tied to it, a way-marker
  if (v.top === "slab") m.box(v3.add(peak, [0, .12, 0]), [.32, .2, .07], M.STONE, { dir: [1, -.25, 0], round: .03, group: 50, paint: q => gsCell(q, 6, 7) < .2 ? M.BELLY : undefined });
}

const GS_BUILD = { punt: gsPunt, jetty: gsJetty, ring: gsRing, heap: gsHeap };
function gsTone(c, r, k) { if (Array.isArray(c[0])) c = gsPick(r, c.map(x => [x, x[3] ?? 1])); return hsv2rgb(((c[0] + (r() - .5) * k * .5) % 1 + 1) % 1, Math.max(0, Math.min(1, c[1] + (r() - .5) * k)), Math.max(0, Math.min(1, c[2] + (r() - .5) * k * 1.5))); }
// Its colours: wood and stone from its genome; mud, moss, reeds, grass and water from the area's ground (art/ground.js), so it sits in its floor.
function gsColours(kind, v, def, st) {
  const C = SET_PROP_GENOMES[kind].colour, r = rng((v.seed * 7919 + 29) >>> 0), k = C.spread, leaf = def?.leaf ?? .26, g = def?.floor ? groundColours(def, { sat: 1, trunkHue: .07, ...st }) : null;
  const wood = gsTone(C.wood ?? [.07, .38, .32], r, k), dark = wood.map(c => Math.round(c * .45)), light = wood.map(c => Math.min(255, Math.round(c * 1.35 + 12)));
  const stone = gsTone(C.stone ?? [.6, .08, .55], r, k), stoneD = C.dark ? gsTone(C.dark, r, k) : stone.map(c => Math.round(c * .55));
  return {
    [M.LEAF]: hsv2rgb(leaf, .5, .45), [M.LEAF2]: hsv2rgb(leaf - .03, .45, .62), [M.LEAF3]: hsv2rgb(leaf + .02, .5, .34), [M.LINE]: [24, 22, 30],
    [M.WOOD]: wood, [M.TRUNK]: kind === "punt" || kind === "jetty" ? dark.map(c => Math.round(c * 1.5)) : wood, [M.BARKD]: dark, [M.BARKL]: light,
    [M.STONE]: stone, [M.STONED]: stoneD, [M.MOSS]: C.moss ? gsTone(C.moss, r, k) : g ? g[M.MOSS] : hsv2rgb(.25, .45, .38),
    [M.BELLY]: kind === "ring" && v.member !== "stone" ? light : kind === "heap" && v.of === "logs" ? hsv2rgb(.1, .3, .7) : g ? g[M.BELLY] : hsv2rgb(.2, .1, .72), // trodden earth, lichen, or a sawn face
    [M.ACCENT]: kind === "ring" || kind === "heap" ? dark : hsv2rgb(.62, .35, .5), // a stump's rings; a pool's sky
    [M.WATER]: hsv2rgb(.6, .45, .38), [M.BODY2]: kind === "heap" || kind === "ring" ? hsv2rgb(.62, .55, .16) : hsv2rgb(.62, .55, .18), [M.WEB]: hsv2rgb(.58, .14, .8), [M.GLINT]: hsv2rgb(.55, .2, .95),
    [M.BODY]: g ? g[M.BODY] : hsv2rgb(.08, .35, .32), [M.BARK2]: g ? g[M.BODY2] : hsv2rgb(.08, .4, .24),
    [M.STRAW]: hsv2rgb(.11, .4, .62), [M.CLOTH]: C.cloth ? gsTone(C.cloth, r, k) : hsv2rgb(.1, .1, .72), [M.GLOW]: [255, 168, 80],
  };
}
function gsCrop(sp) {
  let x0 = sp.w, x1 = -1, y0 = sp.h, y1 = -1;
  for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  if (x1 < 0) return { sp, x0: 0, y0: 0 };
  const out = new Sprite(x1 - x0 + 1, y1 - y0 + 1);
  for (let y = 0; y < out.h; y++) for (let x = 0; x < out.w; x++) { const i = (y + y0) * sp.w + x + x0; if (sp.m[i]) { out.put(x, y, sp.m[i], sp.n[i * 3], sp.n[i * 3 + 1], sp.n[i * 3 + 2]); out.g[y * out.w + x] = sp.g[i]; } }
  return { sp: out, x0, y0 };
}
const GS_WATER = new Set([M.WATER, M.BODY2, M.ACCENT, M.WEB]);
// One generated set piece: { sp, colours, origin, metres, variant }, as art/setpieces.js setPiece3d gives (o: { seed, ...numbers to fix }; size: times the witch's scale).
export function genSetPiece(kind, o = {}, def = null, st = {}, size = 1, ppm = 16) {
  const v = setPropVariant(kind, o.seed ?? 0, o), m = new Model({ blend: .035 });
  m.clipY = 0; // a sunk punt's keel, a buried stone: cut away under the ground
  GS_BUILD[kind](m, v);
  m.ell([0, .004, 0], [.01, .004, .01], M.STONE, { group: 0, extra: true });
  const rr = render(m, { scale: witchPixelsPerUnit(st) * size }), { sp, x0, y0 } = gsCrop(rr.sp);
  cleanFlecks(sp);
  if (kind === "punt" || kind === "jetty") { const wn = [.2, 0, .98], l = Math.hypot(...wn); for (let i = 0; i < sp.m.length; i++) if (GS_WATER.has(sp.m[i])) sp.n.set(wn.map(c => c / l), i * 3); } // its water lit as a level surface at a grazing light (as the props' pool), never black
  const [ox, oy] = rr.project([0, 0, 0]), { r, ...variant } = v;
  return { sp, colours: gsColours(kind, v, def, st), origin: { x: +(ox - x0).toFixed(1), y: +(oy - y0).toFixed(1) }, metres: { width: +(sp.w / ppm).toFixed(1), height: +(sp.h / ppm).toFixed(1) }, variant };
}
