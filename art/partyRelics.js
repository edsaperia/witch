// Party relics (Ed, #87, 2026-10-05): giant, legend-sized bottles half-buried in the forest floor, 3 or 4 to a map, waiting to be
// found. The witch digs one up; it becomes a sigil in her stack, and placed by a sleeping legend it wakes the legend happy. Ed: "The
// legend relics should be various kinds of bottle ... the liquid inside should glow so it's clear that it's a magical item and not
// just scenery" and "They should all look like colourful transparent bottles of different shapes. Round, square, hexagonal, etc."
// Six, each its own shape and glass: a tall wine bottle (amethyst), a round flask (ruby), a square decanter (emerald), a tapering
// hexagonal bottle (sapphire), a spiral-fluted bottle (amber) and a teardrop potion (rose), each tilted and sunk in a mound of dug earth with moss and
// grass. The glass is transparent: its rim in the glass's colour, a highlight streak, and where it is empty above the liquid, a
// half-clear dither of tinted glass the ground shows through. The liquid inside glows (the one glowing material, MAGIC, its level
// surface MAGIC2), in its own colour, with motes rising from the neck in 3 frames; each relic carries a light ({ rgb, radius,
// height, pulse }) for the lighting pass, so it lights the ground round it like the magic stones. Built in 3D at the witch's scale
// (she is about 1.3 units tall) and drawn turned towards us.
// A relic glints now and then (partyRelicGlint: a four-point star in 4 frames, bigger at the treetop zoom) at its `glint` anchor, so a
// sharp-eyed explorer can spot one from the treetops. They share one sigil (`relic`: the flask's silhouette, in gold), drawn by
// drawSigil, groundSigil and the stack like a creature's.
import { M, Sprite, hsv2rgb, sinHash } from "./core.js";
import { Model, render, v3 } from "./model3d.js";
import { witchPixelsPerUnit } from "./witch.js";
import { SIGILS, SIGIL_NEON } from "./sigils.js";

const prCell = (p, k, s = 0) => sinHash(Math.floor(p[0] * k) + Math.floor(p[2] * k) * 57 + s, Math.floor(p[1] * k));
const prUnit = v => v3.mul(v, 1 / Math.hypot(...v));
// where p lies along an axis from a in direction d (0 at a), and how far from it
const prAlong = (p, a, d) => v3.dot(v3.sub(p, a), d);
const prOff = (p, a, d) => { const q = v3.sub(p, a), t = v3.dot(q, d); return v3.sub(q, v3.mul(d, t)); };

// The dug earth it lies in: a low mound, darker clods round its rim, moss and a few grass tufts on it.
function prMound(m, R, seed) {
  m.ell([0, -.05, 0], [R * 1.3, .45, R * 1.05], M.TRUNK, { group: 2, rough: .06, paint: p => { const n = prCell(p, 5, seed); return n < .22 ? M.MOSS : n > .86 ? M.STONE : prCell(p, 11, seed + 1) < .3 ? M.BARKD : undefined; } });
  for (let i = 0; i < 9; i++) { const a = i / 9 * 6.283 + sinHash(seed, i), d = R * (1.05 + .3 * sinHash(i, seed)); m.ell([Math.cos(a) * d, .08, Math.sin(a) * d * .85], [.22 + .15 * sinHash(i, 3), .16, .2], sinHash(i, 7) < .5 ? M.BARKD : M.TRUNK, { group: 3, rough: .03 }); }
  for (let i = 0; i < 14; i++) { const a = sinHash(seed + 9, i) * 6.283, d = R * (.9 + .5 * sinHash(i, seed + 9)); m.ell([Math.cos(a) * d, .22, Math.sin(a) * d * .85], [.06, .16 + sinHash(i, 5) * .14, .06], sinHash(i, 2) < .4 ? M.LEAF2 : M.LEAF, { group: 4 }); }
}
// motes rising from the neck: the liquid's glow escaping (GLOW), drifting up a little further each frame
const prMotes = (m, from, n, r, seed, frame) => { for (let i = 0; i < n; i++) { const t = ((i + frame / 3) / n), up = .35 + t * 2.4, k = 1 - t * .6; m.ell(v3.add(from, [(sinHash(seed, i) - .5) * .7 * t, up, (sinHash(i, seed) - .5) * .3]), [r * k, r * k, r * k], M.GLOW, { group: 20 + i, extra: true }); } };
// The glass's paint, in the bottle's own frame (axis d from a): a highlight streak down its upper-left side; below the liquid's
// level (a world height: the surface lies flat however the bottle tilts) the liquid, its surface a brighter band; above it, empty glass.
const prGlass = (a, d, level, ball = null) => p => {
  if (ball) { const q = v3.sub(p, ball), r = Math.hypot(...q) || 1; if ((q[0] * -.5 + q[1] * .65 + q[2] * .57) / r > .9) return M.CRYSTAL; } // a round swell: a cap of light on its upper left
  const o = prOff(p, a, d), r = Math.hypot(...o) || 1, side = (o[0] * -.55 + o[1] * .75 + o[2] * .35) / r;
  if (!ball && side > .985 && prAlong(p, a, d) > .2) return M.CRYSTAL;
  return p[1] < level - .22 ? M.MAGIC : p[1] < level ? M.MAGIC2 : M.HAT2;
};
const prCork = (m, at, d, r, len, mat = M.WOOD) => m.seg(at, v3.add(at, v3.mul(d, len)), r, r * .92, mat, { group: 13, paint: p => mat === M.WOOD && prCell(p, 9, 4) < .2 ? M.BARK2 : undefined });
// a neck from `at` along d, a lip at its end; returns the lip's end
function prNeck(m, at, d, r, len, level) { const end = v3.add(at, v3.mul(d, len)); m.seg(at, end, r, r * .95, M.HAT2, { group: 10, paint: prGlass(at, d, level) }); m.ell(end, [r * 1.25, r * 1.25, r * 1.25], M.HAT1, { group: 12 }); return end; }

export const PARTY_RELICS = [
  { id: "wine", name: "a giant wine bottle", glass: "amethyst", note: "tall and slim, lying tilted, its cork in; violet light glows inside", liquid: [190, 110, 255], build(m, f) {
    const d = prUnit([.85, .48, .05]), a = [-3, -.8, -.2], body = v3.add(a, v3.mul(d, 4.6)), sh = v3.add(body, v3.mul(d, 1)), lv = 2.25;
    m.seg(a, body, 1.35, 1.35, M.HAT2, { group: 10, paint: prGlass(a, d, lv) }); m.seg(body, sh, 1.35, .45, M.HAT2, { group: 10, paint: prGlass(a, d, lv) });
    const lip = prNeck(m, sh, d, .43, 1.7, lv); prCork(m, lip, d, .36, .45);
    prMound(m, 2.2, 3); prMotes(m, v3.add(lip, v3.mul(d, .4)), 4, .14, 5, f);
  } },
  { id: "flask", name: "a giant round flask", glass: "ruby", note: "a round belly on a long neck, sunk to its middle, rose-pink light inside", liquid: [255, 96, 176], build(m, f) {
    const c = [0, .9, 0], R = 2.35, d = prUnit([-.32, 1, .22]), lv = 2.2, top = v3.add(c, v3.mul(d, R * .85));
    m.ell(c, [R, R, R], M.HAT2, { group: 10, paint: prGlass(v3.sub(c, v3.mul(d, R)), d, lv, c) });
    const lip = prNeck(m, top, d, .55, 2.3, lv); prCork(m, lip, d, .46, .55);
    prMound(m, 2.5, 7); prMotes(m, v3.add(lip, v3.mul(d, .5)), 4, .15, 8, f);
  } },
  { id: "decanter", name: "a giant square decanter", glass: "emerald", note: "a square bottle sunk on one edge, a round glass stopper, acid-green light inside", liquid: [170, 255, 80], build(m, f) {
    const d = prUnit([.42, 1, -.12]), a = [-.6, -1.2, 0], c = v3.add(a, v3.mul(d, 2.3)), lv = 2.7;
    m.box(c, [2.3, 1.55, 1.55], M.HAT2, { group: 10, dir: d, up: [0, 0, 1], round: .25, paint: prGlass(a, d, lv) });
    const lip = prNeck(m, v3.add(c, v3.mul(d, 2.25)), d, .6, .9, lv);
    m.ell(v3.add(lip, v3.mul(d, .75)), [.85, .85, .85], M.HAT1, { group: 13, paint: p => (p[0] - lip[0]) * -.5 + (p[1] - lip[1]) * .8 > .55 ? M.CRYSTAL : undefined });
    prMound(m, 2.5, 11); prMotes(m, v3.add(lip, v3.mul(d, 1.5)), 3, .15, 12, f);
  } },
  { id: "hexagon", name: "a giant hexagonal bottle", glass: "sapphire", note: "six-sided and tapering to its foot, standing nearly upright, its neck sealed in gold wax; cyan light inside", liquid: [70, 235, 255], build(m, f) {
    const d = prUnit([-.18, 1, .1]), a = [.2, -.7, 0], L = 4.4, end = v3.add(a, v3.mul(d, L)), R0 = .8, R1 = 2.2, taper = Math.atan((R1 - R0) * Math.cos(Math.PI / 6) / L), lv = 2.6;
    const u0 = prUnit(v3.cross(d, [0, 0, 1])), w0 = v3.cross(u0, d), glass = prGlass(a, d, lv), faceted = p => { const o = prOff(p, a, d), ang = Math.atan2(v3.dot(o, w0), v3.dot(o, u0)) * 180 / Math.PI, e = ((ang - 30) % 60 + 60) % 60; return e < 5 || e > 55 ? M.HAT1 : glass(p); }; // its edges in the glass's colour
    m.seg(a, end, R0, R1, M.HAT2, { group: 10, paint: faceted }); // a cone, narrow at the foot, cut to six faces leaning out as they rise
    const mid = v3.add(a, v3.mul(d, L / 2)), apMid = (R0 + R1) / 2 * Math.cos(Math.PI / 6);
    for (let k = 0; k < 6; k++) { const ang = k * Math.PI / 3, n0 = v3.add(v3.mul(u0, Math.cos(ang)), v3.mul(w0, Math.sin(ang))), n = prUnit(v3.sub(v3.mul(n0, Math.cos(taper)), v3.mul(d, Math.sin(taper)))); m.box(v3.add(mid, v3.mul(n, apMid * Math.cos(taper) + 2)), [2, 4, 4], M.HAT2, { group: 10, cut: true, dir: n, up: d, paint: faceted }); }
    m.box(v3.add(end, v3.mul(d, 2)), [2, 5, 5], M.HAT2, { group: 10, cut: true, dir: d, up: u0, paint: faceted }); // its flat top
    const sh = v3.add(end, v3.mul(d, .45)); m.seg(v3.sub(end, v3.mul(d, .05)), sh, R1 * .5, .5, M.HAT2, { group: 11, paint: glass });
    const lip = prNeck(m, sh, d, .48, 1.1, lv); prCork(m, lip, d, .52, .4, M.ACCENT);
    prMound(m, 2.4, 13); prMotes(m, v3.add(lip, v3.mul(d, .4)), 4, .14, 14, f);
  } },
  { id: "spiral", name: "a giant spiral bottle", glass: "amber", note: "tall and fluted, a spiral twisting up it, standing tilted with a fat cork; golden light inside", liquid: [255, 214, 80], build(m, f) {
    const d = prUnit([.35, 1, .2]), a = [-.4, -.9, 0], L = 4.6, end = v3.add(a, v3.mul(d, L)), lv = 2.8, glass = prGlass(a, d, lv);
    const u0 = prUnit(v3.cross(d, [0, 0, 1])), w0 = v3.cross(u0, d);
        m.seg(a, end, 1.45, 1.3, M.HAT2, { group: 10, paint: glass });
    for (let k = 0; k < 3; k++) m.chain(Array.from({ length: 25 }, (_, i) => { const t = i / 24 * L * 1.08, ang = k * 2.094 + t * 1.15, R = 1.45 + (1.3 - 1.45) * Math.min(1, t / L) + .02; return [...v3.add(v3.add(a, v3.mul(d, t)), v3.add(v3.mul(u0, Math.cos(ang) * R), v3.mul(w0, Math.sin(ang) * R))), .17]; }), M.CRYSTAL, { group: 12 }); // three raised ribs of glass spiralling up
    const sh = v3.add(end, v3.mul(d, .8)); m.seg(end, sh, 1.3, .42, M.HAT2, { group: 10, paint: glass });
    const lip = prNeck(m, sh, d, .42, 1.3, lv); prCork(m, lip, d, .5, .6);
    prMound(m, 2.3, 17); prMotes(m, v3.add(lip, v3.mul(d, .7)), 3, .16, 18, f);
  } },
  { id: "teardrop", name: "a giant teardrop potion", glass: "rose", note: "a teardrop of glass leaning on its belly, a pointed glass stopper; mint light inside", liquid: [90, 255, 190], build(m, f) {
    const d = prUnit([-.4, 1, .25]), a = [.5, .4, 0], tip = v3.add(a, v3.mul(d, 3.4)), lv = 2.6;
    m.seg(a, tip, 2.25, .5, M.HAT2, { group: 10, paint: prGlass(v3.sub(a, v3.mul(d, 2.2)), d, lv, v3.add(a, v3.mul(d, .3))) });
    const lip = prNeck(m, tip, d, .45, .9, lv);
    m.seg(v3.add(lip, v3.mul(d, .15)), v3.add(lip, v3.mul(d, 1.6)), .62, .08, M.HAT1, { group: 13, paint: p => (p[0] - lip[0]) * -.6 + (p[2] - lip[2]) * .3 > .12 ? M.CRYSTAL : undefined });
    prMound(m, 2.5, 19); prMotes(m, v3.add(lip, v3.mul(d, 1.8)), 3, .14, 20, f);
  } },
];
export const PARTY_RELIC_BY_ID = Object.fromEntries(PARTY_RELICS.map(r => [r.id, r]));
export const PARTY_RELIC_IDS = PARTY_RELICS.map(r => r.id);

// Colours: each bottle's glass (its rim HAT1, the empty glass HAT2 a deeper tint, its highlight CRYSTAL) and liquid (MAGIC, its
// surface MAGIC2 and the motes GLOW, lighter), over a shared earth (dug soil, moss, grass), a cork (WOOD) and gold wax (ACCENT).
const PR_GLASS = { amethyst: [150, 80, 210], ruby: [210, 40, 80], emerald: [40, 180, 100], sapphire: [50, 100, 230], amber: [230, 150, 40], rose: [240, 120, 170] };
const prMix = (c, t, k) => c.map((v, i) => Math.round(v + (t[i] - v) * k));
export function partyRelicColours(id, st = {}) {
  const leaf = st.leafHue ?? .3, trunk = st.trunkHue ?? .07, R = PARTY_RELIC_BY_ID[id], g = PR_GLASS[R?.glass] || PR_GLASS.amethyst, l = R?.liquid || [255, 220, 140];
  return {
    [M.TRUNK]: hsv2rgb(trunk, .5, .3), [M.BARKD]: hsv2rgb(trunk + .02, .5, .17), [M.STONE]: [96, 94, 100], [M.MOSS]: hsv2rgb(.26, .45, .42),
    [M.LEAF]: hsv2rgb(leaf, .55, .45), [M.LEAF2]: hsv2rgb(leaf - .03, .5, .6), [M.LEAF3]: hsv2rgb(leaf + .03, .6, .28), [M.NOSE]: [16, 12, 20], [M.LINE]: [24, 22, 30],
    [M.GLINT]: [255, 248, 220], [M.WOOD]: [176, 132, 86], [M.BARK2]: [128, 92, 58], [M.ACCENT]: [222, 176, 64],
    [M.HAT1]: prMix(g, [255, 255, 255], .2), [M.HAT2]: prMix(g, [20, 10, 30], .15), [M.CRYSTAL]: prMix(g, [255, 255, 255], .78),
    [M.MAGIC]: l, [M.MAGIC2]: prMix(l, [255, 255, 255], .55), [M.GLOW]: prMix(l, [255, 255, 255], .35),
  };
}
// The light a relic gives the ground round it (for the lighting pass, like the magic stones'): its liquid's colour, how far it
// reaches and how high it sits (metres), and a slow pulse (seconds a breath).
export const partyRelicLight = id => ({ rgb: PARTY_RELIC_BY_ID[id].liquid, radius: 10, height: 2.5, pulse: 3.2 });
export const PARTY_RELIC_FRAMES = 3; // the motes' frames, at about 4 fps

// One relic, drawn: { sp, origin (its middle on the ground, in px), glint (where it catches the light: its highest highlight), light,
// metres }. frame 0 to 2: the motes rising. The glass is made see-through after drawing: its outermost pixels become its rim, and
// the empty glass inside a half-clear dither.
const PR_GLASSY = new Set([M.HAT2, M.MAGIC, M.MAGIC2, M.CRYSTAL]);
export function partyRelicSprite(id, st = {}, { ppm = 16, facing = "towards", frame = 0 } = {}) {
  const d = PARTY_RELIC_BY_ID[id]; if (!d) throw new Error(`no party relic "${id}"`);
  const m = new Model({ blend: .05 }); m.clipY = 0; d.build(m, frame % PARTY_RELIC_FRAMES);
  const s = witchPixelsPerUnit(st), { sp, project } = render(m, { scale: s, facing });
  let x0 = sp.w, x1 = -1, y0 = sp.h, y1 = -1; for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  const W = x1 - x0 + 1, H = y1 - y0 + 1, out = new Sprite(W, H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = (y + y0) * sp.w + x + x0, mm = sp.m[i]; if (mm) out.put(x, y, mm, sp.n[i * 3], sp.n[i * 3 + 1], sp.n[i * 3 + 2]); }
  const glassy = (x, y) => x >= 0 && y >= 0 && x < W && y < H && PR_GLASSY.has(out.m[y * W + x]), rim = [];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (glassy(x, y) && !(glassy(x - 1, y) && glassy(x + 1, y) && glassy(x, y - 1) && glassy(x, y + 1))) rim.push(y * W + x);
  for (const i of rim) if (out.m[i] !== M.CRYSTAL) out.m[i] = M.HAT1; // the glass's edge, in its colour
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (out.m[y * W + x] === M.HAT2 && (x + y) % 2 === 0) out.m[y * W + x] = 0; // empty glass: half clear
  const [px, py] = project([0, 0, 0]);
  let glint = null; for (let y = 0; y < H && !glint; y++) for (let x = 0; x < W; x++) if (out.m[y * W + x] === M.CRYSTAL) { glint = { x, y }; break; }
  for (let y = 0; y < H && !glint; y++) for (let x = 0; x < W; x++) if (out.m[y * W + x] === M.HAT1) { glint = { x, y }; break; } // no highlight (flat facets): the top of its glass
  return { sp: out, origin: { x: +(px - x0).toFixed(1), y: +(py - y0).toFixed(1) }, glint: glint || { x: W / 2, y: 0 }, light: partyRelicLight(id), metres: { width: +(W / ppm).toFixed(1), height: +(H / ppm).toFixed(1) } };
}

// The glint: a four-point star of glowing pixels, growing and fading over 4 frames (0 small, 1 bigger, 2 full with its diagonals,
// 3 fading), centred on the sprite; at the treetop zoom (zoom "treetop") 2.5 times bigger, so it reads from up there.
export const PARTY_RELIC_GLINT_FRAMES = 4;
export function partyRelicGlint(frame = 0, { zoom = "ground" } = {}) {
  const k = zoom === "treetop" ? 2.5 : 1, arm = [2, 4, 6, 3][frame % 4] * k, diag = [0, 1, 2.5, 1][frame % 4] * k, w = Math.ceil(arm) * 2 + 3, sp = new Sprite(w, w), c = (w - 1) / 2;
  const thick = zoom === "treetop" ? 1 : 0;
  for (let i = -Math.round(arm); i <= Math.round(arm); i++) for (let t = -thick; t <= thick; t++) { if (Math.abs(i) > arm * .55 && t) continue; sp.px(c + i, c + t, M.GLINT, 0, 0, 1); sp.px(c + t, c + i, M.GLINT, 0, 0, 1); }
  for (let i = 1; i <= Math.round(diag); i++) for (const [sx, sy] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) sp.px(c + sx * i, c + sy * i, M.GLINT, 0, 0, 1);
  return { sp, origin: { x: c, y: c } };
}

// The sigil: one for every relic, as they all do the same in the game (Ed: "they can all have the same sigil since they have the same
// effect in game. The flask sigil is good"): the round flask's silhouette, in the sigils' strokes, in gold.
export const PARTY_RELIC_SIGIL = "relic";
export const PARTY_RELIC_SIGIL_STROKES = [{ a: [.5, .66, .25, -65, 245] }, { l: [[.4, .44], [.44, .4], [.44, .12]] }, { l: [[.6, .44], [.56, .4], [.56, .12]] }, { l: [[.42, .12], [.58, .12]] }];
export const partyRelicSigilId = () => PARTY_RELIC_SIGIL; // every relic's
SIGILS[PARTY_RELIC_SIGIL] = PARTY_RELIC_SIGIL_STROKES; SIGIL_NEON[PARTY_RELIC_SIGIL] = "lemon"; // into the sigil system, so drawSigil, groundSigil and the stack draw it
