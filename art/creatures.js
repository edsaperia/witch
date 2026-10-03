// Witch creatures: the bestiary, drawn the way an illustrator would.
// Young and legendary animals are closed smooth outlines (a deep chest, a tucked waist,
// jointed legs, a curved neck, a proper head and snout), filled, with normals from the
// distance to their edge so the night lighting still models them; then the few pixels
// that matter (eye and glint, nose, ear tips) are placed by hand. Babies are hand-drawn
// pixel grids, recoloured by the style. Every animal faces right; the game mirrors it.
import { M, Sprite, rng, uni, hash2, hsv2rgb, spline, band, tufts, rot, lerp2 } from "./core.js";
import { BABIES } from "./babies.js";
import { legacyCritter } from "./legacy-creatures.js";

// ================= the bestiary: 20 forest animals =================
// plan: body plan. hue/sat/val: base colour. legend: what the legendary form grows.
// Species with `q` are drawn with the quadruped builder below; q holds its proportions
// in units of its height at the shoulder (see quad()). The rest of the old fields serve
// species still drawn the old way.
export const SPECIES = [
  { id: "wolf", name: "Wolf", plan: "quad", hue: .6, sat: .14, val: .74, legend: ["wings", "mane"],
    q: { len: .64, chest: .42, tuck: .6, neck: .32, neckAng: .7, neckW: .42, hr: .26, snout: .82, snoutD: .7, ear: "point", earS: .82, tail: "brush", paw: "paw", legW: 1.25, saddle: true, belly: "pale", ruff: false },
    bw: .34, bh: .2, leg: .27, legW: .065, head: .16, snout: .6, headUp: .9, ears: "point", tail: "up" },
  { id: "fox", name: "Fox", plan: "quad", hue: .06, sat: .8, val: .9, bw: .3, bh: .17, leg: .2, legW: .055, head: .15, snout: .65, headUp: .8, ears: "big", tail: "bushy", belly: "white", legend: ["tails"] },
  { id: "badger", name: "Badger", plan: "quad", hue: .65, sat: .08, val: .45, bw: .42, bh: .18, leg: .1, legW: .08, head: .14, snout: .7, headUp: .1, ears: "round", tail: "short", face: "badger", legend: ["crystals"] },
  { id: "boar", name: "Boar", plan: "quad", hue: .07, sat: .62, val: .5, legend: ["tusksBig"],
    q: { len: .72, chest: .34, tuck: .42, neck: .2, neckAng: -.15, neckW: .55, hr: .27, snout: 1.25, snoutD: .62, snoutTaper: .55, ear: "small", earS: .8, tail: "thin", paw: "hoof", legW: 1.15, ridge: true, tusks: true, back: "hump", belly: "same", disc: true },
    bw: .4, bh: .27, leg: .16, legW: .09, head: .2, snout: .6, headUp: .2, ears: "small", tail: "thin", stripes: true, tusks: true, ridge: true },
  { id: "stag", name: "Stag", plan: "quad", hue: .08, sat: .5, val: .7, bw: .32, bh: .19, leg: .36, legW: .05, head: .13, snout: .5, headUp: 1.6, ears: "point", tail: "short", spots: true, antlers: "branch", legend: ["antlersGlow"] },
  { id: "hare", name: "Hare", plan: "quad", hue: .08, sat: .4, val: .72, bw: .26, bh: .2, leg: .18, legW: .06, head: .15, snout: .35, headUp: .9, ears: "long", tail: "puff", legend: ["jackalope"] },
  { id: "owl", name: "Owl", plan: "owl", hue: .08, sat: .5, val: .55, legend: ["eyesRing", "wings"] },
  { id: "bear", name: "Bear", plan: "quad", hue: .07, sat: .55, val: .42, bw: .42, bh: .3, leg: .17, legW: .11, head: .18, snout: .45, headUp: .5, ears: "round", tail: "short", legend: ["moss"] },
  { id: "hedgehog", name: "Hedgehog", plan: "hedgehog", hue: .08, sat: .4, val: .5, legend: ["crystals"] },
  { id: "squirrel", name: "Squirrel", plan: "quad", hue: .03, sat: .75, val: .75, bw: .22, bh: .17, leg: .12, legW: .05, head: .15, snout: .35, headUp: .8, ears: "tuft", tail: "squirrel", belly: "white", legend: ["starTail"] },
  { id: "toad", name: "Toad", plan: "toad", hue: .2, sat: .5, val: .55, legend: ["crown"] },
  { id: "otter", name: "Otter", plan: "quad", hue: .07, sat: .55, val: .45, bw: .44, bh: .15, leg: .09, legW: .07, head: .13, snout: .4, headUp: .5, ears: "round", tail: "long", belly: "white", legend: ["ribbons"] },
  { id: "lynx", name: "Lynx", plan: "quad", hue: .09, sat: .45, val: .75, bw: .3, bh: .19, leg: .26, legW: .07, head: .16, snout: .3, headUp: .8, ears: "tuft", tail: "short", spots: true, legend: ["mane"] },
  { id: "elk", name: "Elk", plan: "quad", hue: .07, sat: .55, val: .38, bw: .38, bh: .23, leg: .38, legW: .06, head: .16, snout: .8, headUp: 1.2, ears: "point", tail: "short", antlers: "palm", legend: ["antlersGlow", "moss"] },
  { id: "raven", name: "Raven", plan: "raven", hue: .68, sat: .35, val: .3, legend: ["wings", "eyesRing"] },
  { id: "bat", name: "Bat", plan: "bat", hue: .78, sat: .25, val: .45, legend: ["wingsBig"] },
  { id: "mole", name: "Mole", plan: "mole", hue: .7, sat: .15, val: .32, legend: ["crown"] },
  { id: "beaver", name: "Beaver", plan: "quad", hue: .06, sat: .6, val: .45, bw: .36, bh: .22, leg: .1, legW: .07, head: .16, snout: .35, headUp: .4, ears: "small", tail: "flat", teeth: true, legend: ["moss"] },
  { id: "stoat", name: "Stoat", plan: "quad", hue: .1, sat: .25, val: .92, bw: .42, bh: .11, leg: .11, legW: .05, head: .12, snout: .45, headUp: .7, ears: "round", tail: "long", legend: ["ribbons", "mane"] },
  { id: "beetle", name: "Stag beetle", plan: "beetle", hue: .78, sat: .5, val: .35, legend: ["horn", "crystals"] },
];
export const SPECIES_BY_ID = Object.fromEntries(SPECIES.map(s => [s.id, s]));
export const FEATURE_NAMES = { wings: "spirit wings", mane: "a glowing mane", tails: "many tails", crystals: "crystals", tusksBig: "great tusks", antlersGlow: "glowing antlers", jackalope: "antlers", eyesRing: "a ring of eyes", moss: "a little forest on its back", starTail: "a starry tail", crown: "a crown", ribbons: "light ribbons", wingsBig: "huge glowing wings", horn: "a glowing horn" };

export function speciesColours(sp, st) {
  const s = SPECIES_BY_ID[sp], v = st.cVal / .85, sat = st.cSat / .6;
  const body = hsv2rgb(s.hue, s.sat * sat * st.sat, s.val * v);
  const belly = s.belly === "white" || s.face === "badger" ? [236, 232, 222] : hsv2rgb(s.hue + .03, s.sat * .5 * sat, Math.min(1, s.val * v * 1.3 + .08));
  const magic = hsv2rgb(st.magicHue + s.hue * .3, .6, 1), magic2 = hsv2rgb(st.magicHue + s.hue * .3, .18, 1);
  const pale = ["boar", "stag", "elk"].includes(s.id);
  return {
    [M.BODY]: body, [M.BODY2]: hsv2rgb(s.hue + .02, Math.min(1, s.sat * sat * 1.2 + .05), s.val * v * .66), [M.BODY3]: hsv2rgb(s.hue + .03, Math.min(1, s.sat * sat * 1.3 + .1), s.val * v * .4),
    [M.BELLY]: belly, [M.ACCENT]: pale ? [236, 226, 200] : hsv2rgb(s.hue + .05, s.sat * .6, Math.min(1, s.val * v * .5 + .25)),
    [M.MAGIC]: magic, [M.MAGIC2]: magic2, [M.LEAF]: hsv2rgb(.3, .55, .55), [M.LEAF2]: hsv2rgb(.25, .5, .75), [M.LEAF3]: hsv2rgb(.33, .6, .35), [M.TRUNK]: hsv2rgb(.07, .45, .32),
    [M.EYE]: [24, 18, 30], [M.PUPIL]: [70, 40, 90], [M.GLINT]: [255, 255, 245], [M.NOSE]: [38, 28, 36], [M.EAR]: hsv2rgb(s.hue + .97, Math.min(1, s.sat * .6 + .2), Math.min(1, s.val * v * .55 + .2)),
    [M.IRIS]: s.plan === "owl" ? [255, 176, 40] : hsv2rgb(.12, .7, .85),
  };
}

// A creature's height in pixels at each level: babies are drawn grids; young and legend
// grow from the style's baby size (Ed: a legend is about 20 times a baby's height).
export const levelHeight = (level, st) => Math.round(st.size * Math.pow(Math.sqrt(st.growth), level));

export function critter(spId, level, frame, st) {
  const S = SPECIES_BY_ID[spId] || SPECIES[0];
  if (level === 0 && BABIES[S.id]) return babySprite(S.id, frame, st);
  if (S.q) return quad(S, level, frame, st);
  if (S.plan === "owl") return owl(S, level, frame, st);
  return legacyCritter(S, level, frame, st);
}

// ================= babies: hand-drawn grids =================
function babySprite(id, frame, st) {
  const B = BABIES[id], rows = frame && B.walk ? B.rows.slice(0, B.rows.length - B.walk.length).concat(B.walk) : B.rows;
  const w = Math.max(...rows.map(r => r.length)) + 2, h = rows.length + 1, sp = new Sprite(w, h);
  sp.grid(rows, KEY, 1, 1, { round: st.round });
  return sp;
}
// What each character in a baby grid is.
const KEY = { B: M.BODY, b: M.BODY2, d: M.BODY3, W: M.BELLY, A: M.ACCENT, E: M.EYE, G: M.GLINT, N: M.NOSE, I: M.IRIS, P: M.PUPIL, e: M.EAR, L: M.LINE };

// ================= drawing in body units =================
// A creature is described in units of its shoulder height (ground at y = 0, up is
// negative), as a list of parts; it is then scaled to the level's pixel height, so the
// same description draws a young animal and a legend.
class Plan {
  constructor() { this.ops = []; }
  shape(pts, mat, o = {}) { this.ops.push({ k: "shape", pts, mat, o }); return this; }
  limb(spine, mat, o = {}) { this.ops.push({ k: "limb", pts: spine, mat, o }); return this; }
  mark(pts, mat, onlyOn, o = {}) { this.ops.push({ k: "mark", pts, mat, onlyOn, o }); return this; }
  fn(f) { this.ops.push({ k: "fn", f }); return this; }
  // Scales the plan so that the points tagged `measure` span `height` pixels, makes the
  // sprite, and draws every part in order.
  draw(height, round, extraPad = 1) {
    const all = [], body = [];
    for (const op of this.ops) if (op.pts) for (const p of op.pts) { const r = op.k === "limb" ? (p[2] || 0) / 2 : 0; all.push([p[0] - r, p[1] - r], [p[0] + r, p[1] + r]); if (!op.o.extra) body.push([p[0], p[1] - r]); }
    const top = Math.min(...body.map(p => p[1])), s = height / -top;
    const x0 = Math.min(...all.map(p => p[0])), x1 = Math.max(...all.map(p => p[0])), y0 = Math.min(...all.map(p => p[1]));
    const W = Math.ceil((x1 - x0) * s) + 2 * extraPad + 2, H = Math.ceil(-y0 * s) + extraPad + 1;
    const sp = new Sprite(W, H), T = p => [(p[0] - x0) * s + extraPad + 1, H + p[1] * s];
    const ctx = { sp, s, T, W, H };
    for (const op of this.ops) {
      const o = { round, ...op.o };
      if (s < 40 && !o.extra) o.line = false; // at young sizes interior lines eat thin legs
      if (op.k === "shape") sp.shape(op.pts.map(T), op.mat, o);
      else if (op.k === "limb") sp.limb(op.pts.map(p => [...T(p), p[2] * s]), op.mat, o);
      else if (op.k === "mark") sp.mark(op.pts.map(T), op.mat, op.onlyOn, o);
      else op.f(ctx);
    }
    return sp;
  }
}
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const bodyMats = [M.BODY, M.BODY2, M.BODY3, M.BELLY, M.LINE];

// Places an eye: a dark almond with a glint, sized for the creature's pixel height.
function eye(sp, x, y, px, { iris = false, glow = false } = {}) {
  x = Math.round(x); y = Math.round(y);
  const put = (dx, dy, m) => sp.px(x + dx, y + dy, m, 0, 0, 1);
  if (px < 2) { put(0, 0, M.EYE); return; }
  if (px < 3) { put(0, 0, M.EYE); put(0, 1, M.EYE); put(-1, 1, M.EYE); put(0, 0, glow ? M.MAGIC2 : M.GLINT); return; }
  // an almond: dark rim, then (on a legend) a glowing iris, a pupil, a glint
  const w = Math.round(px * 1.25), h = Math.round(px);
  for (let dy = 0; dy < h; dy++) for (let dx = 0; dx < w; dx++) {
    const ex = (dx + .5) / w * 2 - 1, ey = (dy + .5) / h * 2 - 1, q = ex * ex + ey * ey; if (q > 1.15) continue;
    put(dx - w + 1, dy, (glow || iris) && q < .62 && q > .08 && h >= 4 ? (glow ? M.MAGIC : M.IRIS) : M.EYE);
  }
  put(-Math.floor(w / 2) + 1, Math.floor((h - 1) / 2) - (h >= 4 ? 1 : 0), M.GLINT); if (w >= 6) put(-Math.floor(w / 2) + 2, Math.floor((h - 1) / 2) - 1, M.GLINT);
}

// ================= quadrupeds =================
function quad(S, level, frame, st) {
  const q = { legW: 1, earS: 1, snoutTaper: .75, ...S.q }, legend = level === 2, has = f => legend && S.legend.includes(f);
  const young = level === 1;
  // proportions shift with level: youngsters have big heads and short legs, legends are heroic
  const hr = q.hr * (young ? 1.22 : 1) * (st.head / .44) ** .5, len = q.len * (young ? .9 : 1.04) * st.long;
  const legK = (young ? .92 : 1.04) * st.legs ** .5;
  const back = -1, chest = -q.chest * (legend ? 1.12 : 1) / legK, tuck = -q.tuck / legK;
  const P = new Plan(), lw = q.legW * (legend ? 1.15 : 1);
  const swing = [.24, -.24][frame];

  // ---- legs: hip/shoulder, knee, hock/wrist, foot; jointed like the real thing ----
  const hindTop = [-len * .62, back + .28], foreTop = [len * .6, back + .42];
  const hindLeg = (side) => {
    const a = side * swing, j = [hindTop, [-len * .42, tuck + .2], [-len * .74, -.24], [-len * .7, -.05], [-len * .6, 0]];
    return j.map(p => rot(p, hindTop, a));
  };
  const foreLeg = (side) => {
    const a = side * swing * .9, j = [foreTop, [len * .64, chest + .06], [len * .6, -.2], [len * .63, -.05], [len * .72, 0]];
    return j.map(p => rot(p, foreTop, -a));
  };
  const legSpine = (j, w0) => { // stretch so the foot is on the ground
    const lo = Math.max(...j.map(p => p[1])), k = (0 - j[0][1]) / (lo - j[0][1]);
    const jj = j.map(p => [p[0], j[0][1] + (p[1] - j[0][1]) * k]);
    return [[...jj[0], w0], [...jj[1], .15 * lw], [...jj[2], .095 * lw], [...jj[3], .085 * lw], [...jj[4], .07 * lw]];
  };
  const foot = (j, mat, o) => {
    const t = j[j.length - 1], fl = q.paw === "hoof" ? .1 : .13, fh = q.paw === "hoof" ? .09 : .075;
    P.shape([[t[0] - fl * .55, -fh], [t[0] + fl * .2, -fh * 1.1], [t[0] + fl * .6, -fh * .3], [t[0] + fl * .55, 0], [t[0] - fl * .6, 0]], q.paw === "hoof" ? M.NOSE : mat, o);
  };
  const leg = (j, mat, w0, o) => { const sp = legSpine(j, w0); P.limb(sp, mat, { cap: 1, capEnd: .4, ...o }); foot(sp.map(p => [p[0], p[1]]), mat, o); };

  // ---- legendary wings behind everything ----
  if (has("wings")) wings(P, [len * .25, back - .05], legend, frame, -1);

  // far legs, darker (they are in shadow, and it tells near from far)
  leg(foreLeg(-1), M.BODY2, .19 * lw, { group: 2 });
  leg(hindLeg(-1), M.BODY2, .3 * lw, { group: 2 });

  // ---- tail ----
  const tailBase = [-len * 1.0, back + .18], tw = [0, .03, -.03][frame + 1] || 0;
  if (q.tail === "brush") { // a full brush, hanging, dark at the tip
    P.shape(tufts([add(tailBase, [0, -.04]), [-len * 1.3, back + .26 + tw], [-len * 1.46, back + .6], [-len * 1.36, -.36 + tw], [-len * 1.2, -.36], [-len * 1.16, back + .66], [-len * 1.0, back + .4]], 1, 4, 5, .05, 1), M.BODY, { group: 3, line: true });
    P.mark([[-len * 1.5, -.5 + tw], [-len * 1.1, -.5], [-len * 1.2, -.3], [-len * 1.4, -.3]], M.BODY3, [M.BODY]);
  }
  if (q.tail === "thin") { P.limb([[...tailBase, .07], [-len * 1.1, back + .3, .05], [-len * 1.12 + tw, back + .55, .035]], M.BODY, { group: 3 }); P.shape(tufts([[-len * 1.15 + tw, back + .5], [-len * 1.08 + tw, back + .55], [-len * 1.12 + tw, back + .72], [-len * 1.17 + tw, back + .7]], 1, 3, 2, .04, 1), M.BODY3, { group: 3 }); }

  // ---- torso: rump, a back line, withers, a deep chest, a tucked waist ----
  const hump = q.back === "hump" ? .12 : 0;
  let torso = [
    [-len * 1.04, back + .14], [-len * .5, back + .02], [len * .1, back + .06 - hump * .5], [len * .55, back - .03 - hump], [len * .95, back + .22 - hump * .5],
    [len * 1.06, chest - .2], [len * .8, chest], [len * .3, chest + (tuck - chest) * .2], [-len * .25, tuck], [-len * .72, tuck + .02], [-len * 1.1, back + .42],
  ];
  if (q.ridge) torso = tufts(torso, 0, 4, legend ? 10 : 7, legend ? .1 : .07, 1);
  P.shape(torso, M.BODY, { group: 1, line: true });

  // ---- neck and head ----
  const neckBase = [len * .78, back + .2], ang = q.neckAng, H0 = add(neckBase, [Math.cos(ang) * q.neck, -Math.sin(ang) * q.neck]);
  const headC = add(H0, [hr * .2, 0]);
  P.limb([[...neckBase, q.neckW * 1.3], [...lerp2(neckBase, H0, .55), q.neckW * 1.05], [...H0, q.neckW * .9]], M.BODY, { group: 1, cap: 0, capEnd: 1 });
  if (q.ruff) P.shape(tufts([[neckBase[0] - .05, neckBase[1] - .05], [H0[0] + hr * .1, H0[1] - hr * .3], [H0[0] + hr * .55, H0[1] + hr * .6], [neckBase[0] + .25, chest + .3], [neckBase[0] + .05, chest + .25]], 1, 4, legend ? 7 : 4, .045, 1), M.BELLY, { group: 1 });
  const L = hr * q.snout * (young ? .75 : 1), D = hr * q.snoutD, tp = q.snoutTaper;
  const head = [
    [-hr * .85, -hr * .1], [-hr * .4, -hr * .78], [hr * .35, -hr * .72], [hr * .85, -hr * .38], [hr * .8 + L * .6, -D * .65 * (1 + tp) / 2 + hr * .02], [hr * .85 + L, -D * .5 * tp],
    [hr * .9 + L, D * .25 * tp], [hr * .75 + L, D * .42 * tp + hr * .1], [hr * .35, hr * .55], [-hr * .3, hr * .7], [-hr * .85, hr * .3],
  ].map(p => add(headC, p));
  // ears: the far one behind the head, the near one in front of it
  const ear = (dx, k, mat, o) => {
    const b = add(headC, [dx * hr, -hr * .55]), e = hr * q.earS * k;
    const pts = q.ear === "small"
      ? [add(b, [-hr * .25, .02]), add(b, [-hr * .55, -e * .55]), add(b, [-hr * .62, -e * .62]), add(b, [hr * .2, -hr * .08])]
      : [add(b, [-hr * .3, .02]), add(b, [-hr * .25, -e * .6]), add(b, [-hr * .12, -e * 1.02]), add(b, [-hr * .05, -e * 1.04]), add(b, [hr * .22, -e * .45]), add(b, [hr * .3, -hr * .02])];
    P.shape(pts, mat, o);
    if (q.ear !== "small") P.mark([add(b, [-hr * .15, -e * .15]), add(b, [-hr * .1, -e * .7]), add(b, [hr * .1, -e * .35]), add(b, [hr * .12, -e * .1])], M.EAR, [mat]);
    P.mark([add(b, [-hr * .3, -e * .72]), add(b, [-hr * .1, -e * 1.1]), add(b, [hr * .1, -e * .9]), add(b, [hr * .3, -e * .62])], M.BODY3, [mat, M.EAR]);
  };
  ear(.18, .95, M.BODY2, { group: 4 });
  P.shape(head, M.BODY, { group: 1, line: false });
  ear(-.12, 1, M.BODY, { group: 5, line: true });

  // near legs, in front, outlined where they overlap the body
  leg(hindLeg(1), M.BODY, .36 * lw, { group: 6, line: true });
  leg(foreLeg(1), M.BODY, .2 * lw, { group: 7, line: true });

  // ---- markings ----
  if (q.saddle) P.mark([[-len * 1.15, back - .05], [len * .5, back - .1], [len * .85, back + .1], [len * .3, back + .2], [-len * .5, back + .24], [-len * 1.2, back + .3]], M.BODY2, [M.BODY]);
  if (q.belly === "pale") {
    P.mark([[len * .55, chest - .3], [len * 1.15, chest - .32], [len * 1.0, chest + .1], [len * .2, chest + .05], [-len * .4, tuck + .05], [-len * .3, tuck - .08]], M.BELLY, [M.BODY]);
    P.mark([headC, add(headC, [hr * .5 + L, hr * .2]), add(headC, [hr * .8 + L, D * .5]), add(headC, [-hr * .2, hr * .9]), add(headC, [-hr * .7, hr * .5])], M.BELLY, [M.BODY]);
  }
  if (q.paw === "paw") for (const side of [1]) { const t = legSpine(foreLeg(side), 0)[4]; P.mark([[t[0] - .08, -.18], [t[0] + .09, -.18], [t[0] + .12, 0], [t[0] - .08, 0]], M.BELLY, [M.BODY]); }

  // ---- face: the pixels that matter ----
  const ex = headC[0] + hr * .45, ey = headC[1] - hr * .32, nose = add(headC, [hr * .88 + L, -D * .45 * tp]);
  P.fn(({ sp, T, s }) => {
    const ep = Math.max(2, Math.round(hr * s * (young ? .42 : .3) * st.eye));
    const [x, y] = T([ex, ey]);
    eye(sp, x, y, ep, { glow: legend && !q.tusks });
    if (legend && q.tusks) eye(sp, x, y, ep, {});
    // nose leather: a dark cap on the snout's tip
    const [nx, ny] = T(nose), nr = Math.max(1, Math.round(hr * s * (q.disc ? .22 : .14)));
    for (let dy = 0; dy <= nr; dy++) for (let dx = -nr; dx <= Math.round(nr * .3); dx++) if (sp.get(nx + dx, ny + dy) && (dx * dx) / (nr * nr) + (dy * dy) / ((nr + 1) * (nr + 1)) <= 1) sp.recolour(nx + dx, ny + dy, M.NOSE);
    if (q.disc) sp.recolour(nx - 1, ny + nr, M.BODY3);
    // mouth: a short line back from under the nose
    const m0 = T(add(headC, [hr * .85 + L, D * .2 * tp + hr * .06])), m1 = T(add(headC, [hr * .55 + L * .45, D * .32 * tp + hr * .12]));
    const steps = Math.ceil(Math.hypot(m1[0] - m0[0], m1[1] - m0[1]));
    if (s * hr > 6) for (let i = 0; i <= steps; i++) sp.recolour(m0[0] + (m1[0] - m0[0]) * i / steps, m0[1] + (m1[1] - m0[1]) * i / steps, M.LINE);
  });

  // ---- tusks and ridge ----
  if (q.tusks) {
    const k = young ? .35 : has("tusksBig") ? 1.25 : .7;
    const b = add(headC, [hr * .45 + L * .6, D * .3]);
    P.limb([[...b, .075 * k ** .5], [...add(b, [hr * .3 * k, -hr * .2 * k]), .07 * k ** .5], [...add(b, [hr * .38 * k, -hr * .6 * k]), .045 * k ** .5], [...add(b, [hr * .15 * k, -hr * .95 * k]), .012]], M.ACCENT, { group: 8, line: true, cap: .6, extra: true });
  }
  if (q.ridge) P.mark(tufts([[-len * 1.05, back + .12], [-len * .5, back + .01], [len * .1, back + .05 - hump * .5], [len * .55, back - .04 - hump], [len * .9, back + .2], [len * .5, back + .12], [-len * .5, back + .16]], 0, 4, legend ? 10 : 7, .07, 1), M.BODY3, [M.BODY, M.LINE]);
  if (has("mane")) for (let i = 0; i < 7; i++) { // flames streaming back from the crest of the neck
    const t = i / 6, b = lerp2(add(H0, [-hr * .3, -hr * .6]), [len * .2, back + .02], t), h = .32 - t * .12, w0 = .13 - t * .03, sw = frame ? .03 : 0;
    P.limb([[...b, w0], [...add(b, [-.06, -h * .5]), w0 * .9], [...add(b, [-.2 - sw, -h * .85]), w0 * .55], [...add(b, [-.38 - sw, -h]), .015]], i % 2 ? M.MAGIC : M.MAGIC2, { group: 60 + i % 2, line: true, extra: true, cap: 1, capEnd: .5 });
  }
  if (has("wings")) wings(P, [len * .15, back + .02], legend, frame, 1);

  const sp = P.draw(levelHeight(level, st), st.round);
  if (legend) sparkle(sp, S.id);
  return sp;
}

// One feather: a rounded base, a long vane and a pointed tip, pointing along `dir`.
function feather(base, dir, len, wid) {
  const l = Math.hypot(...dir), d = [dir[0] / l, dir[1] / l], n = [-d[1], d[0]];
  const at = (t, k) => [base[0] + d[0] * len * t + n[0] * wid * k, base[1] + d[1] * len * t + n[1] * wid * k];
  return [at(-.05, .45), at(.45, .55), at(.86, .3), at(1, 0), at(.86, -.25), at(.45, -.5), at(-.05, -.45)];
}
// A feathered wing along an arm (shoulder -> wrist -> tip): one solid shape whose trailing
// edge is a row of feather tips, fanning from `d0` at the shoulder to `d1` at the tip; the
// flight feathers are told apart by alternating shades, with coverts over their roots.
function featherWing(P, { sh, wrist, tip, d0, d1, l0, l1, w = .13, mat = M.MAGIC, light = M.MAGIC2, n = 11, group = 10 }) {
  const along = t => t < .45 ? lerp2(sh, wrist, t / .45) : lerp2(wrist, tip, (t - .45) / .55);
  const fs = [];
  for (let i = 0; i <= n; i++) { const t = i / n, d = lerp2(d0, d1, t), l = Math.hypot(...d), len = l0 + (l1 - l0) * t * t; const b = along(t); fs.push({ b, e: [b[0] + d[0] / l * len, b[1] + d[1] / l * len] }); }
  const edge = []; // feather tips, with a notch between each pair
  for (let i = n; i >= 0; i--) { edge.push(fs[i].e); if (i) edge.push(lerp2(lerp2(fs[i].e, fs[i - 1].e, .5), lerp2(fs[i].b, fs[i - 1].b, .5), .14)); }
  P.shape([add(sh, [0, -w * .5]), add(wrist, [0, -w * .5]), add(tip, [0, -w * .4]), ...edge], mat, { group, line: true, extra: true });
  for (let i = 0; i < n; i += 2) P.mark([fs[i].b, fs[i + 1].b, lerp2(fs[i + 1].b, fs[i + 1].e, 1.02), lerp2(fs[i].b, fs[i].e, 1.02)], light, [mat]);
  // coverts: a scalloped band of short feathers along the arm
  const cov = [];
  for (let i = n; i >= 0; i--) cov.push(lerp2(fs[i].b, fs[i].e, .33));
  P.shape(tufts([add(sh, [0, -w * .6]), add(wrist, [0, -w * .6]), add(tip, [0, -w * .5]), ...cov], 3, 3 + n, 1, w * .25, 1), light, { group: group + 1, line: true, extra: true });
}
function wings(P, root, legend, frame, side) {
  const far = side < 0, up = frame ? -.06 : 0, sh = add(root, far ? [.1, -.06] : [0, 0]), k = far ? .9 : 1;
  featherWing(P, { sh, wrist: add(sh, [-.25 * k, -.72 * k + up]), tip: add(sh, [-1.0 * k, -1.0 * k + up * 1.5]), d0: [-.85, .55], d1: [-1, .25], l0: .22 * k, l1: .8 * k, mat: far ? M.BODY2 : M.MAGIC, light: far ? M.MAGIC : M.MAGIC2, group: far ? 40 : 50 });
}
// A few glowing motes around a legend.
function sparkle(sp, seed) {
  const r = rng(seed.length * 7919);
  for (let i = 0; i < 8; i++) {
    const x = Math.floor(uni(r, 2, sp.w - 2)), y = Math.floor(uni(r, 2, sp.h * .6));
    if (sp.get(x, y) || sp.get(x + 1, y) || sp.get(x - 1, y) || sp.get(x, y + 1) || sp.get(x, y - 1)) continue;
    sp.px(x, y, M.MAGIC2);
    if (i % 3 === 0) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!sp.get(x + dx, y + dy)) sp.px(x + dx, y + dy, M.MAGIC);
  }
}

// ================= owl =================
// An upright egg of a body, folded wing, a big round head sunk into it, a pale facial
// disc, ear tufts, huge eyes and a hooked beak; talons on a short leg.
function owl(S, level, frame, st) {
  const legend = level === 2, young = level === 1, has = f => legend && S.legend.includes(f);
  const P = new Plan(), bob = frame ? -.02 : 0;
  const bw = young ? .52 : .5, hr = young ? .4 : .34, hy = (young ? -1.02 : -1.1) + bob;
  if (has("wings")) { owlWing(P, -1, frame); }
  // talons
  for (const [x, k] of [[-.12, M.ACCENT], [.14, M.ACCENT]]) {
    const f = frame && x > 0 ? -.03 : 0;
    P.limb([[x, -.2, .12], [x + .02, -.05 + f, .09]], M.BODY2, { group: 2 });
    P.shape([[x - .07, -.06 + f], [x + .1, -.07 + f], [x + .16, 0 + f], [x + .1, .0 + f], [x - .08, 0 + f]], k, { group: 2 });
  }
  // tail feathers peeking out behind
  P.shape([[-.3, -.4], [-.48, -.12], [-.4, -.05], [-.18, -.2]], M.BODY2, { group: 3, line: true });
  // body
  const body = [[0, -1.0 + bob], [bw * .85, -.85 + bob], [bw * 1.02, -.5], [bw * .8, -.16], [0, -.12], [-bw * .85, -.2], [-bw * 1.02, -.55], [-bw * .8, -.88 + bob]];
  P.shape(body, M.BODY, { group: 1, line: true });
  // breast: pale, streaked
  P.mark([[0, -.9 + bob], [bw * .7, -.75], [bw * .75, -.35], [bw * .3, -.15], [-bw * .2, -.18], [-bw * .45, -.5], [-bw * .3, -.85]], M.BELLY, [M.BODY]);
  P.fn(({ sp, T, s }) => {
    if (s < 18) return;
    const [x0, y0] = T([-bw * .3, -.85]), [x1, y1] = T([bw * .7, -.25]), step = Math.max(3, Math.round(s * .09));
    for (let y = y0 + step; y < y1; y += step) for (let x = x0; x < x1; x += step) { const o = ((y / step) | 0) % 2 ? step >> 1 : 0; sp.recolour(x + o, y, sp.get(x + o, y) === M.BELLY ? M.BODY2 : sp.get(x + o, y)); if (s > 40) sp.recolour(x + o, y + 1, sp.get(x + o, y + 1) === M.BELLY ? M.BODY2 : sp.get(x + o, y + 1)); }
  });
  // folded wing on the near side, with feather scallops at its lower edge (unless spread)
  if (!has("wings")) P.shape(tufts([[-bw * .55, -.88 + bob], [-bw * .05, -.78 + bob], [bw * .15, -.45], [-bw * .1, -.15], [-bw * .45, -.1], [-bw * .85, -.35], [-bw * .95, -.7]], 2, 6, young ? 4 : 6, .045, 1), M.BODY2, { group: 4, line: true });
  P.fn(({ sp, T, s }) => { // wing coverts: a few darker feather marks
    if (s < 18 || has("wings")) return;
    for (const [u, v] of [[-.35, -.6], [-.15, -.5], [-.5, -.45], [-.3, -.35], [-.6, -.3]]) { const [x, y] = T([u * bw / .5, v]); sp.recolour(x, y, M.BODY3); sp.recolour(x + 1, y, M.BODY3); }
  });
  // head
  const hc = [0, hy];
  P.shape([[0, hy - hr * .82], [hr * .95, hy - hr * .72], [hr * 1.2, hy - hr * .05], [hr * .9, hy + hr * .6], [0, hy + hr * .78], [-hr * .9, hy + hr * .6], [-hr * 1.2, hy - hr * .05], [-hr * .95, hy - hr * .72]], M.BODY, { group: 1 });
  // ear tufts
  for (const sd of [-1, 1]) P.shape(tufts([[sd * hr * .5, hy - hr * .78], [sd * hr * 1.05, hy - hr * 1.25], [sd * hr * 1.12, hy - hr * 1.32], [sd * hr * 1.0, hy - hr * .6]], 0, 1, 2, .05, -sd), M.BODY2, { group: 5, line: true });
  // facial disc: two pale rings meeting over the beak
  for (const sd of [-1, 1]) P.mark([[sd * hr * .05, hy - hr * .55], [sd * hr * .7, hy - hr * .62], [sd * hr * .98, hy - hr * .05], [sd * hr * .68, hy + hr * .5], [sd * hr * .05, hy + hr * .4]], M.BELLY, [M.BODY]);
  P.fn(({ sp, T, s }) => {
    const ep = Math.max(2, Math.round(hr * s * (young ? .55 : .45) * st.eye));
    for (const sd of [-1, 1]) {
      const [x, y] = T([sd * hr * .45, hy - hr * .18]);
      if (legend) { owlEye(sp, x, y, ep, true); continue; }
      owlEye(sp, x, y, ep, false);
    }
    // beak: hooked, between the eyes
    const [bx, by] = T([0, hy + hr * .05]), bl = Math.max(2, Math.round(hr * s * .32)), bwid = Math.max(1, Math.round(bl * .4));
    for (let dy = 0; dy < bl; dy++) for (let dx = -bwid; dx <= bwid; dx++) if (Math.abs(dx) <= bwid * (1 - dy / bl) + .3) sp.px(bx + dx, by + dy, dy === bl - 1 || dx === bwid ? M.BODY3 : M.ACCENT, dx / (bwid + 1) * .5, -.2, .85);
  });
  if (has("eyesRing")) P.fn(({ sp, T, s }) => { // a halo of watching eyes
    const ep = Math.max(3, Math.round(s * .1));
    for (let i = 0; i < 7; i++) { const a = Math.PI * (1.1 + i / 6 * .8), [x, y] = T([Math.cos(a) * hr * 2.0, hy - hr * .3 + Math.sin(a) * hr * 1.6]); owlEye(sp, x, y, ep, true, true); }
  });
  if (has("wings")) owlWing(P, 1, frame);
  const sp = P.draw(levelHeight(level, st), st.round);
  if (legend) sparkle(sp, S.id);
  return sp;
}
function owlEye(sp, x, y, d, glow, ring = false) {
  const r = d / 2;
  for (let dy = -Math.ceil(r); dy <= Math.ceil(r); dy++) for (let dx = -Math.ceil(r); dx <= Math.ceil(r); dx++) {
    const q = Math.hypot(dx, dy) / r; if (q > 1.05) continue;
    const ring2 = q > .82;
    const m = ring ? (q < .45 ? M.EYE : ring2 ? M.MAGIC : M.MAGIC2) : ring2 && r >= 2 ? M.NOSE : q < .5 ? M.EYE : glow ? M.MAGIC2 : M.IRIS;
    sp.px(x + dx, y + dy, m, dx / (r + 1) * .4, dy / (r + 1) * .4, .9);
  }
  if (!ring) sp.px(x + Math.round(r * .35), y - Math.round(r * .35), M.GLINT);
}
// The owl's spread spirit wings, raised either side of it.
function owlWing(P, side, frame) {
  const x = side, up = frame ? -.08 : 0, far = side < 0;
  featherWing(P, { sh: [.3 * x, -.85], wrist: [1.0 * x, -1.38 + up], tip: [1.6 * x, -1.55 + up * 1.5], d0: [.15 * x, 1], d1: [.9 * x, .55], l0: .42, l1: .72, mat: far ? M.BODY2 : M.MAGIC, light: far ? M.MAGIC : M.MAGIC2, group: far ? 40 : 50 });
}
