// Party relics (Ed, #87, 2026-10-05): giant, legend-sized party objects half-buried in the forest floor, 3 or 4 to a map, waiting
// to be found. The witch digs one up; it becomes a sigil in her stack, and placed by a sleeping legend it wakes the legend happy.
// Six: a bottle of wine, a party hat, a disco ball, a gramophone horn, a wrapped present and a carnival mask, each tilted and sunk
// in a mound of dug earth with moss and grass on it, weathered but still festive, with one magical touch that glows (wine bubbles,
// the hat's pompom, a few of the ball's facets, notes drifting from the horn, light leaking from under the bow, the mask's eyes).
// Built in 3D at the witch's scale (she is about 1.3 units tall), as the modern relics are, and drawn turned towards us.
// A relic glints now and then (partyRelicGlint: a four-point star in 4 frames, bigger at the treetop zoom) at its `glint` anchor, so a
// sharp-eyed explorer can spot one from the treetops. Each has a sigil (`relic-<id>`, in the sigils' own strokes, in gold), drawn
// by drawSigil, groundSigil and the stack like a creature's.
import { M, Sprite, hsv2rgb } from "./core.js";
import { Model, render, v3 } from "./model3d.js";
import { witchPixelsPerUnit } from "./witch.js";
import { SIGILS, SIGIL_NEON } from "./sigils.js";

const prHash = (a, b = 0) => { const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return x - Math.floor(x); };
const prCell = (p, k, s = 0) => prHash(Math.floor(p[0] * k) + Math.floor(p[2] * k) * 57 + s, Math.floor(p[1] * k));
const prUnit = v => v3.mul(v, 1 / Math.hypot(...v));
// where p lies along an axis from a in direction d (0 at a), and how far from it
const prAlong = (p, a, d) => v3.dot(v3.sub(p, a), d);
const prOff = (p, a, d) => { const q = v3.sub(p, a), t = v3.dot(q, d); return v3.sub(q, v3.mul(d, t)); };

// The dug earth it lies in: a low mound, darker clods round its rim, moss and a few grass tufts on it.
function prMound(m, R, seed) {
  m.ell([0, -.05, 0], [R * 1.3, .45, R * 1.05], M.TRUNK, { group: 2, rough: .06, paint: p => { const n = prCell(p, 5, seed); return n < .22 ? M.MOSS : n > .86 ? M.STONE : prCell(p, 11, seed + 1) < .3 ? M.BARKD : undefined; } });
  for (let i = 0; i < 9; i++) { const a = i / 9 * 6.283 + prHash(seed, i), d = R * (1.05 + .3 * prHash(i, seed)); m.ell([Math.cos(a) * d, .08, Math.sin(a) * d * .85], [.22 + .15 * prHash(i, 3), .16, .2], prHash(i, 7) < .5 ? M.BARKD : M.TRUNK, { group: 3, rough: .03 }); }
  for (let i = 0; i < 14; i++) { const a = prHash(seed + 9, i) * 6.283, d = R * (.9 + .5 * prHash(i, seed + 9)); m.ell([Math.cos(a) * d, .22, Math.sin(a) * d * .85], [.06, .16 + prHash(i, 5) * .14, .06], prHash(i, 2) < .4 ? M.LEAF2 : M.LEAF, { group: 4 }); }
}
// a few small glowing motes (bubbles, notes, sparks) along a line: the relic's magical touch
const prMotes = (m, from, dir, n, r, seed, extra = true) => { for (let i = 0; i < n; i++) m.ell(v3.add(from, v3.add(v3.mul(dir, .45 * (i + 1)), [(prHash(seed, i) - .5) * .5, 0, (prHash(i, seed) - .5) * .3])), [r * (1 - i * .15), r * (1 - i * .15), r * (1 - i * .15)], M.MAGIC, { group: 20 + i, extra }); }; // extra: not counted in its size (and so cropped if it floats far above)

export const PARTY_RELICS = [
  { id: "wine", name: "a giant bottle of wine", note: "lying tilted, neck up, its label blank and its foil red; glowing bubbles rise from the cork", build(m) {
    const d = prUnit([.7, .5, .3]), a = [-2.6, -.55, -.6], body = v3.add(a, v3.mul(d, 3.6)), sh = v3.add(body, v3.mul(d, .9)), neck = v3.add(sh, v3.mul(d, 1.6));
    const glass = p => { const t = prAlong(p, a, d), o = prOff(p, a, d), side = v3.dot(prUnit(o.every(v => v === 0) ? [0, 1, 0] : o), prUnit([-.5, .8, .4])); if (t > 1.1 && t < 2.5 && side > -.6) return Math.abs(t - 1.8) > .62 ? M.HAT1 : M.CLOTH; if (side > .78 && t > .3 && t < 4.5) return M.CRYSTAL; return prCell(p, 7, 2) < .06 && p[1] < .9 ? M.MOSS : undefined; };
    m.seg(a, body, .98, .98, M.BODY, { group: 10, paint: glass });
    m.seg(body, sh, .98, .4, M.BODY, { group: 10, paint: glass });
    m.seg(sh, neck, .38, .36, M.BODY, { group: 11, paint: p => prAlong(p, sh, d) > .55 ? M.ACCENT : prOff(p, sh, d)[1] > .2 ? M.CRYSTAL : undefined });
    m.ell(v3.add(neck, v3.mul(d, .02)), [.42, .42, .42], M.ACCENT, { group: 12 });
    m.seg(neck, v3.add(neck, v3.mul(d, .22)), .3, .28, M.WOOD, { group: 13 });
    prMound(m, 1.8, 3); prMotes(m, v3.add(neck, v3.mul(d, .3)), [.15, 1, 0], 4, .13, 5);
  } },
  { id: "partyHat", name: "a giant party hat", note: "a striped cone sunk at a slant, its pompom glowing at the tip", build(m) {
    const d = prUnit([-.32, 1, .22]), a = [.3, -1.1, 0], tip = v3.add(a, v3.mul(d, 6));
    m.seg(a, tip, 2.25, .06, M.HAT1, { group: 10, rough: .02, paint: p => { const t = prAlong(p, a, d), o = prOff(p, a, d), ang = Math.atan2(o[2], o[0]); const s = Math.floor(t * 1.3 + ang * .8); return prCell(p, 6, 4) < .05 && p[1] < .7 ? M.MOSS : ((s % 2) + 2) % 2 ? M.HAT2 : undefined; } });
    m.ell(tip, [.62, .62, .62], M.MAGIC, { group: 12, rough: .05 });
    prMound(m, 2.2, 7);
  } },
  { id: "discoBall", name: "a giant disco ball", note: "a mirror ball sunk to its middle, its facets catching the moon, a few glowing; its hanging loop still on top", build(m) {
    const c = [0, .95, 0], R = 2.45;
    m.ell(c, [R, R, R], M.FRAME, { group: 10, paint: p => {
      const q = v3.sub(p, c), lat = Math.asin(Math.max(-1, Math.min(1, q[1] / R))), lon = Math.atan2(q[2], q[0]), i = lat / .2, j = lon / (.2 / Math.max(.25, Math.cos(lat)));
      if (Math.abs(i - Math.round(i)) < .1 || Math.abs(j - Math.round(j)) < .1 / Math.max(.4, Math.cos(lat))) return M.LINE; // the grout
      const h = prHash(Math.round(i) * 31 + Math.round(j), 9); if (q[1] < -.6 && h < .35) return M.MOSS;
      return h < .03 ? M.MAGIC : h < .3 ? M.BELLY : h > .82 ? M.SHADES : h > .64 ? M.CRYSTAL : undefined; } });
    m.seg(v3.add(c, [0, R - .05, 0]), v3.add(c, [0, R + .3, 0]), .32, .28, M.FRAME, { group: 11 });
    m.ell(v3.add(c, [0, R + .52, 0]), [.26, .26, .08], M.FRAME, { group: 12 }); m.ell(v3.add(c, [0, R + .52, .04]), [.13, .13, .12], M.NOSE, { group: 12, cut: true });
    prMound(m, 2.4, 11);
  } },
  { id: "gramophone", name: "a giant gramophone horn", note: "a mossy brass horn curling up out of the earth by the corner of its box, its dark throat towards us, glowing notes drifting from its mouth", build(m) {
    const pts = [[.9, -.4, -.6, .26], [.85, .7, -.55, .3], [.6, 1.7, -.35, .42], [.15, 2.45, .05, .7], [-.35, 2.95, .6, 1.15], [-.7, 3.2, 1.15, 1.8]];
    const brass = p => { const n = prCell(p, 4, 13); return n < .2 ? M.MOSS : n > .82 ? M.BODY2 : prCell(p, 9, 2) > .9 ? M.CRYSTAL : undefined; };
    for (let i = 0; i + 1 < pts.length; i++) m.seg(pts[i].slice(0, 3), pts[i + 1].slice(0, 3), pts[i][3], pts[i + 1][3], M.ACCENT, { group: 10, paint: brass });
    const mouth = pts[pts.length - 1].slice(0, 3), dir = prUnit(v3.sub(mouth, pts[3].slice(0, 3)));
    m.seg(mouth, v3.add(mouth, v3.mul(dir, .3)), 1.8, 2.15, M.ACCENT, { group: 10, paint: brass }); // the bell's flare
    m.seg(v3.add(mouth, v3.mul(dir, -1.2)), v3.add(mouth, v3.mul(dir, .8)), .2, 2.0, M.NOSE, { group: 10, cut: true }); // its dark throat, narrowing inwards
    m.box([1.9, .35, -.2], [1.15, .85, .95], M.WOOD, { group: 14, round: .06, paint: p => prCell(p, 5, 6) < .25 ? M.MOSS : p[1] > 1.05 ? M.BARK2 : undefined });
    m.ell([1.9, 1.22, -.2], [.85, .04, .85], M.BODY3, { group: 15 }); m.ell([1.9, 1.3, -.2], [.18, .05, .18], M.HAT1, { group: 15 }); // the record and its label
    prMound(m, 2.7, 13); prMotes(m, v3.add(mouth, v3.mul(dir, 1.1)), [.2, 1, .3], 3, .2, 17, false);
  } },
  { id: "present", name: "a giant wrapped present", note: "a spotted box sunk on one corner, its ribbon crossed and its bow on top, warm light leaking from under the bow", build(m) {
    const n0 = m.parts.length, H = [1.75, 1.55, 1.75];
    m.box([0, 0, 0], H, M.HAT1, { group: 10, round: .08, paint: p => { if (Math.abs(p[0]) < .28 || Math.abs(p[2]) < .28) return M.ACCENT; const n = prCell(p, 4, 21); return n < .16 ? M.POM : prCell(p, 6, 3) < .07 ? M.MOSS : undefined; } });
    m.ell([-.55, H[1] + .45, 0], [.75, .45, .3], M.ACCENT, { group: 11 }); m.ell([.55, H[1] + .45, 0], [.75, .45, .3], M.ACCENT, { group: 11 });
    m.ell([-.55, H[1] + .45, .02], [.42, .2, .34], M.NOSE, { group: 11, cut: true }); m.ell([.55, H[1] + .45, .02], [.42, .2, .34], M.NOSE, { group: 11, cut: true });
    m.ell([0, H[1] + .2, 0], [.36, .3, .36], M.ACCENT, { group: 12 }); m.ell([0, H[1] + .02, 0], [.7, .06, .7], M.MAGIC, { group: 13, extra: true }); // the light under the bow
    // tilted onto a corner and sunk
    const R = (v, a, i, j) => { const c = Math.cos(a), s = Math.sin(a), o = [...v]; o[i] = v[i] * c - v[j] * s; o[j] = v[i] * s + v[j] * c; return o; };
    const rot = v => R(R(v, .32, 1, 0), .5, 0, 2), at = [0, .75, 0], inv = v => R(R(v, -.5, 0, 2), -.32, 1, 0);
    for (const q of m.parts.slice(n0)) { if (q.type === "cone") { q.a = v3.add(rot(q.a), at); q.b = v3.add(rot(q.b), at); } else { q.c = v3.add(rot(q.c), at); q.axes = q.axes.map(rot); } if (q.paint) { const f = q.paint; q.paint = (p, part) => f(inv(v3.sub(p, at)), part); } }
    prMound(m, 2.3, 19);
  } },
  { id: "mask", name: "a giant carnival mask", note: "a harlequin mask standing slantwise in the earth, gilt-edged, a plume of feathers on one side, its eyes glowing", build(m) {
    const c = [0, 1.25, 0], r = [2.3, 1.45, .55], rot = .28;
    const lean = v => { const cs = Math.cos(rot), sn = Math.sin(rot); return [v[0] * cs - v[1] * sn, v[0] * sn + v[1] * cs, v[2]]; }, un = v => { const cs = Math.cos(-rot), sn = Math.sin(-rot); return [v[0] * cs - v[1] * sn, v[0] * sn + v[1] * cs, v[2]]; };
    m.ell(c, r, M.BELLY, { group: 10, axes: [lean([1, 0, 0]), lean([0, 1, 0]), [0, 0, 1]], paint: p => {
      const q = un(v3.sub(p, c)), e = (q[0] / r[0]) ** 2 + (q[1] / r[1]) ** 2; if (e > .78) return M.ACCENT; // the gilt edge
      return (Math.floor(q[0] * 1.6 + q[1] * 1.6 + 20) + Math.floor(q[0] * 1.6 - q[1] * 1.6 + 20)) % 2 ? M.HAT2 : undefined; } }); // harlequin diamonds
    for (const s of [-1, 1]) { const e = v3.add(c, lean([s * .95, .2, 0])); m.ell(v3.add(e, [0, 0, .45]), [.5, .3, .5], M.NOSE, { group: 10, cut: true }); m.ell(v3.add(e, [0, 0, .05]), [.32, .17, .2], M.MAGIC, { group: 12, extra: true }); }
    for (let i = 0; i < 4; i++) { const base = v3.add(c, lean([2.0, .6, -.1])), tip = v3.add(base, [.4 + i * .45, 2.6 - i * .35, -.15 * i]); m.seg(base, tip, .32, .05, i % 2 ? M.HAT1 : M.CLOTH, { group: 14 + i, paint: p => prCell(p, 8, i) < .25 ? M.POM : undefined }); }
    prMound(m, 2.1, 23);
  } },
];
export const PARTY_RELIC_BY_ID = Object.fromEntries(PARTY_RELICS.map(r => [r.id, r]));
export const PARTY_RELIC_IDS = PARTY_RELICS.map(r => r.id);

// Colours: each relic's own over a shared earth (dug soil, moss, grass) and its glow (MAGIC, a warm gold unless it says).
const PR_LOOKS = {
  wine: { [M.BODY]: [36, 74, 52], [M.CRYSTAL]: [168, 214, 178], [M.CLOTH]: [228, 216, 184], [M.HAT1]: [126, 30, 44], [M.ACCENT]: [176, 36, 48], [M.WOOD]: [176, 140, 96], [M.MAGIC]: [255, 120, 170] },
  partyHat: { [M.HAT1]: [236, 82, 160], [M.HAT2]: [70, 200, 220], [M.MAGIC]: [255, 236, 140] },
  discoBall: { [M.FRAME]: [168, 172, 186], [M.BELLY]: [222, 226, 236], [M.SHADES]: [70, 74, 90], [M.CRYSTAL]: [196, 220, 255], [M.LINE]: [40, 42, 52], [M.MAGIC]: [200, 140, 255] },
  gramophone: { [M.ACCENT]: [188, 146, 64], [M.BODY2]: [88, 140, 118], [M.CRYSTAL]: [240, 214, 140], [M.WOOD]: [104, 64, 38], [M.BARK2]: [140, 96, 60], [M.BODY3]: [26, 24, 30], [M.HAT1]: [176, 40, 48], [M.MAGIC]: [255, 214, 110] },
  present: { [M.HAT1]: [70, 150, 190], [M.POM]: [240, 232, 210], [M.ACCENT]: [220, 60, 80], [M.MAGIC]: [255, 214, 120] },
  mask: { [M.BELLY]: [236, 228, 214], [M.HAT2]: [52, 40, 70], [M.ACCENT]: [214, 172, 70], [M.HAT1]: [120, 70, 200], [M.CLOTH]: [240, 110, 170], [M.POM]: [255, 220, 240], [M.MAGIC]: [120, 255, 230] },
};
export function partyRelicColours(id, st = {}) {
  const leaf = st.leafHue ?? .3, trunk = st.trunkHue ?? .07;
  return {
    [M.TRUNK]: hsv2rgb(trunk, .5, .3), [M.BARKD]: hsv2rgb(trunk + .02, .5, .17), [M.STONE]: [96, 94, 100], [M.MOSS]: hsv2rgb(.26, .45, .42),
    [M.LEAF]: hsv2rgb(leaf, .55, .45), [M.LEAF2]: hsv2rgb(leaf - .03, .5, .6), [M.LEAF3]: hsv2rgb(leaf + .03, .6, .28), [M.NOSE]: [16, 12, 20], [M.LINE]: [24, 22, 30],
    [M.GLINT]: [255, 248, 220], ...(PR_LOOKS[id] || {}),
  };
}

// One relic, drawn: { sp, origin (its middle on the ground, in px), glint (where it catches the light: its highest lit point), metres }.
export function partyRelicSprite(id, st = {}, { ppm = 16, facing = "towards" } = {}) {
  const d = PARTY_RELIC_BY_ID[id]; if (!d) throw new Error(`no party relic "${id}"`);
  const m = new Model({ blend: .05 }); m.clipY = 0; d.build(m);
  const s = witchPixelsPerUnit(st), { sp, project } = render(m, { scale: s, facing });
  let x0 = sp.w, x1 = -1, y0 = sp.h, y1 = -1; for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  const W = x1 - x0 + 1, H = y1 - y0 + 1, out = new Sprite(W, H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = (y + y0) * sp.w + x + x0, mm = sp.m[i]; if (mm) out.put(x, y, mm, sp.n[i * 3], sp.n[i * 3 + 1], sp.n[i * 3 + 2]); }
  const [px, py] = project([0, 0, 0]);
  // the glint: the highest bright, unglowing pixel of the relic itself (not the mound)
  const BRIGHT = new Set([M.CRYSTAL, M.BELLY, M.FRAME, M.ACCENT, M.POM, M.CLOTH, M.HAT1, M.HAT2, M.BODY]);
  let glint = null; for (let y = 0; y < H && !glint; y++) for (let x = 0; x < W; x++) if (BRIGHT.has(out.m[y * W + x])) { glint = { x, y }; break; }
  return { sp: out, origin: { x: +(px - x0).toFixed(1), y: +(py - y0).toFixed(1) }, glint: glint || { x: W / 2, y: 0 }, metres: { width: +(W / ppm).toFixed(1), height: +(H / ppm).toFixed(1) } };
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

// Sigils: each relic's glyph in the sigils' strokes (unit box, written as lines `l`, arcs `a` in degrees and dots `d`), in gold.
export const PARTY_RELIC_SIGILS = {
  // the bottle, upright, a band for its label
  wine: [{ l: [[.41, .9], [.41, .46], [.46, .36], [.46, .12], [.54, .12], [.54, .36], [.59, .46], [.59, .9], [.41, .9]] }, { l: [[.41, .62], [.59, .62]] }, { d: [.5, .06] }],
  // the cone, a stripe across it, the pompom
  partyHat: [{ l: [[.3, .84], [.5, .2], [.7, .84]] }, { a: [.5, .62, .3, 47, 133] }, { l: [[.38, .58], [.62, .62]] }, { d: [.5, .12] }],
  // the ball, a band of facets across it, its hanging line
  discoBall: [{ a: [.5, .58, .3, 0, 360] }, { l: [[.22, .48], [.78, .48]] }, { l: [[.22, .68], [.78, .68]] }, { a: [.5, .58, .3, 100, 260] }, { l: [[.5, .28], [.5, .06]] }],
  // the horn's flare on its stem, and a note
  gramophone: [{ l: [[.3, .9], [.3, .62], [.42, .5]] }, { l: [[.42, .5], [.58, .14]] }, { l: [[.42, .5], [.82, .34]] }, { a: [.7, .24, .145, -80, 20] }, { d: [.2, .3] }, { l: [[.2, .3], [.2, .14]] }],
  // the box, its ribbon and bow
  present: [{ l: [[.24, .42], [.76, .42], [.76, .9], [.24, .9], [.24, .42]] }, { l: [[.5, .42], [.5, .9]] }, { a: [.38, .32, .11, -10, 280] }, { a: [.62, .32, .11, -100, 190] }],
  // the mask, its eyes, a feather
  mask: [{ l: [[.14, .48], [.3, .36], [.5, .44], [.7, .36], [.86, .48], [.7, .66], [.5, .58], [.3, .66], [.14, .48]] }, { a: [.32, .5, .07, 0, 360] }, { a: [.68, .5, .07, 0, 360] }, { l: [[.82, .4], [.9, .08]] }, { l: [[.78, .38], [.74, .12]] }],
};
export const partyRelicSigilId = id => "relic-" + id;
for (const [id, strokes] of Object.entries(PARTY_RELIC_SIGILS)) { SIGILS[partyRelicSigilId(id)] = strokes; SIGIL_NEON[partyRelicSigilId(id)] = "lemon"; } // into the sigil system, so drawSigil, groundSigil and the stack draw them
