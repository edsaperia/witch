// Witch creatures: the bestiary, drawn the way an illustrator would.
// Young and legendary animals are closed smooth outlines (a deep chest, a tucked waist,
// jointed legs, a curved neck, a proper head and snout), filled, with normals from the
// distance to their edge so the night lighting still models them; then the few pixels
// that matter (eye and glint, nose, ear tips) are placed by hand. Babies are hand-drawn
// pixel grids, recoloured by the style. Every animal faces right; the game mirrors it.
import { M, Sprite, rng, uni, hash2, hsv2rgb, spline, band, tufts, rot, lerp2, add } from "./core.js";
import { BABIES } from "./babies.js";
import { quad3d, owl3d } from "./creatures3d.js";
// Species drawn from 3D models (true three-quarter view, Ed 2026-10-03); the rest are still 2D.
const MODELLED = new Set(["wolf", "boar", "owl", "hare"]);

// ================= the bestiary: 20 forest animals =================
// plan: body plan. hue/sat/val: base colour. legend: what the legendary form grows.
// Species with `q` are drawn with the quadruped builder below; q holds its proportions
// in units of its height at the shoulder (see quad()). The rest of the old fields serve
// species still drawn the old way.
export const SPECIES = [
  { id: "wolf", name: "Wolf", plan: "quad", hue: .6, sat: .14, val: .74, legend: ["wings", "mane"],
    q: { len: .64, chest: .42, tuck: .6, neck: .32, neckAng: .7, neckW: .42, hr: .26, snout: .82, snoutD: .7, ear: "point", earS: .82, tail: "brush", paw: "paw", legW: 1.25, saddle: true, belly: true },
    tail: "up" },
  { id: "fox", name: "Fox", plan: "quad", q: { hgt: .8, len: .62, chest: .4, tuck: .5, neck: .3, neckAng: .7, neckW: .32, hr: .24, snout: 1.05, snoutD: .5, snoutTaper: .6, ear: "point", earS: 1.35, tail: "bushy", paw: "paw", legW: .9, belly: true, socks: .3 }, hue: .06, sat: .8, val: .9, belly: "white", legend: ["tails"] },
  { id: "badger", name: "Badger", plan: "quad", q: { hgt: .62, len: .78, chest: .2, tuck: .22, neck: .18, neckAng: .1, neckW: .5, hr: .26, snout: 1.0, snoutD: .55, snoutTaper: .55, ear: "round", earS: .7, tail: "stub", paw: "paw", legW: 1.35, legMat: M.BODY3, face: "badger", shaggy: true }, hue: .65, sat: .08, val: .45, legend: ["crystals"] },
  { id: "boar", name: "Boar", plan: "quad", hue: .07, sat: .62, val: .5, legend: ["tusksBig"],
    q: { len: .72, chest: .34, tuck: .42, neck: .2, neckAng: -.15, neckW: .55, hr: .27, snout: 1.25, snoutD: .62, snoutTaper: .55, ear: "small", earS: .8, tail: "thin", paw: "hoof", legW: 1.15, ridge: true, tusks: true, back: "hump", disc: true },
    ridge: true },
  { id: "stag", name: "Stag", plan: "quad", q: { hgt: 1.3, len: .6, chest: .6, tuck: .7, neck: .55, neckAng: .95, neckW: .32, hr: .2, snout: 1.15, snoutD: .6, snoutTaper: .65, ear: "point", earS: 1.1, tail: "deer", paw: "hoof", legW: .75, antlers: "branch", rump: true, spots: "young", belly: true }, hue: .08, sat: .5, val: .7, legend: ["antlersGlow"] },
  { id: "hare", name: "Hare", plan: "quad", q: { hgt: .72, len: .5, chest: .4, tuck: .45, neck: .2, neckAng: .9, neckW: .35, hr: .27, snout: .65, snoutD: .7, ear: "long", earS: 2.4, tail: "puff", paw: "paw", legW: .85, haunch: 1.35, hindFoot: 1.6, back: "arch", belly: true, whiskers: true }, hue: .08, sat: .4, val: .72, legend: ["jackalope"] },
  { id: "owl", name: "Owl", plan: "owl", hue: .08, sat: .5, val: .55, legend: ["eyesRing", "wings"] },
  { id: "bear", name: "Bear", plan: "quad", q: { hgt: 1.15, len: .72, chest: .38, tuck: .4, neck: .25, neckAng: .3, neckW: .55, hr: .28, snout: .7, snoutD: .62, snoutTaper: .7, ear: "round", earS: .8, tail: "stub", paw: "paw", legW: 1.55, back: "hump", muzzle: true, shaggy: true }, hue: .07, sat: .55, val: .42, legend: ["moss"] },
  { id: "hedgehog", name: "Hedgehog", plan: "hedgehog", hue: .08, sat: .4, val: .5, legend: ["crystals"] },
  { id: "squirrel", name: "Squirrel", plan: "quad", q: { hgt: .55, len: .45, chest: .35, tuck: .4, neck: .2, neckAng: .9, neckW: .35, hr: .3, snout: .55, snoutD: .65, ear: "tuft", earS: 1.1, tail: "squirrel", paw: "paw", legW: .8, haunch: 1.3, back: "arch", belly: true, whiskers: true }, hue: .03, sat: .75, val: .75, belly: "white", legend: ["starTail"] },
  { id: "toad", name: "Toad", plan: "toad", hue: .2, sat: .5, val: .55, legend: ["crown"] },
  { id: "otter", name: "Otter", plan: "quad", q: { hgt: .55, len: 1.0, chest: .25, tuck: .25, neck: .3, neckAng: .35, neckW: .5, hr: .27, snout: .6, snoutD: .7, ear: "round", earS: .5, tail: "otter", paw: "paw", legW: 1.1, muzzle: true, belly: true, whiskers: true }, hue: .07, sat: .55, val: .45, belly: "white", legend: ["ribbons"] },
  { id: "lynx", name: "Lynx", plan: "quad", q: { hgt: .9, len: .55, chest: .5, tuck: .55, neck: .25, neckAng: .8, neckW: .4, hr: .27, snout: .5, snoutD: .75, snoutTaper: .8, ear: "tuft", earS: 1.0, tail: "bob", paw: "paw", legW: 1.2, cheeks: true, spots: true, belly: true, whiskers: true }, hue: .09, sat: .45, val: .75, legend: ["mane"] },
  { id: "elk", name: "Elk", plan: "quad", q: { hgt: 1.4, len: .68, chest: .6, tuck: .66, neck: .45, neckAng: .75, neckW: .42, hr: .24, snout: 1.6, snoutD: .9, snoutTaper: .85, ear: "point", earS: .9, tail: "stub", paw: "hoof", legW: .9, back: "hump", antlers: "palm", shaggy: true }, hue: .07, sat: .55, val: .38, legend: ["antlersGlow", "moss"] },
  { id: "raven", name: "Raven", plan: "raven", hue: .68, sat: .35, val: .3, legend: ["wings", "eyesRing"] },
  { id: "bat", name: "Bat", plan: "bat", hue: .78, sat: .25, val: .45, legend: ["wingsBig"] },
  { id: "mole", name: "Mole", plan: "mole", hue: .7, sat: .15, val: .32, legend: ["crown"] },
  { id: "beaver", name: "Beaver", plan: "quad", q: { hgt: .6, len: .65, chest: .2, tuck: .22, neck: .2, neckAng: .4, neckW: .55, hr: .28, snout: .6, snoutD: .75, ear: "round", earS: .45, tail: "flat", paw: "paw", legW: 1.2, back: "arch", teeth: true, whiskers: true }, hue: .06, sat: .6, val: .45, legend: ["moss"] },
  { id: "stoat", name: "Stoat", plan: "quad", q: { hgt: .5, len: 1.0, chest: .3, tuck: .33, neck: .35, neckAng: .6, neckW: .32, hr: .25, snout: .6, snoutD: .6, ear: "round", earS: .6, tail: "stoat", paw: "paw", legW: .8, belly: true, back: "arch", whiskers: true }, hue: .1, sat: .25, val: .92, legend: ["ribbons", "mane"] },
  { id: "snail", name: "Snail", plan: "snail", hue: .08, sat: .45, val: .55, legend: ["glowShell"] },
  { id: "ram", name: "Ram", plan: "quad", q: { hgt: .95, len: .6, chest: .48, tuck: .52, neck: .22, neckAng: .45, neckW: .48, hr: .25, snout: .85, snoutD: .75, snoutTaper: .8, ear: "small", earS: .7, tail: "stub", paw: "hoof", legW: .9, wool: true, horns: "curl", face: "dark" }, hue: .1, sat: .12, val: .88, legend: ["hornsGlow"] },
  { id: "woodlouse", name: "Woodlouse", plan: "woodlouse", hue: .65, sat: .12, val: .45, legend: ["crystals"] },
  { id: "snake", name: "Snake", plan: "snake", hue: .25, sat: .45, val: .45, legend: ["wings"] },
  { id: "moth", name: "Moth", plan: "moth", hue: .1, sat: .3, val: .7, legend: ["wingsBig"] },
  { id: "marten", name: "Pine marten", plan: "quad", q: { hgt: .55, len: .78, chest: .35, tuck: .38, neck: .3, neckAng: .55, neckW: .35, hr: .25, snout: .65, snoutD: .6, ear: "round", earS: .9, tail: "bushy", paw: "paw", legW: .85, belly: true, back: "arch" }, hue: .07, sat: .6, val: .45, legend: ["mane"] },
  { id: "salamander", name: "Salamander", plan: "quad", q: { hgt: .3, len: .9, chest: .14, tuck: .14, neck: .12, neckAng: .05, neckW: .5, hr: .27, snout: .55, snoutD: .55, ear: "none", tail: "otter", paw: "paw", legW: 1.0, spots: true, spotMat: "belly" }, hue: .1, sat: .1, val: .22, belly: "yellow", legend: ["flames"] },
  { id: "glowworm", name: "Glow-worm", plan: "glowworm", hue: .12, sat: .4, val: .35, legend: ["lantern"] },
  { id: "spider", name: "Spider", plan: "spider", hue: .07, sat: .45, val: .4, legend: ["eyesRing"] },
  { id: "dormouse", name: "Dormouse", plan: "quad", q: { hgt: .38, len: .45, chest: .35, tuck: .38, neck: .15, neckAng: .6, neckW: .4, hr: .34, snout: .45, snoutD: .7, ear: "round", earS: .85, tail: "squirrel", paw: "paw", legW: .8, back: "arch", belly: true, whiskers: true, eyeK: 1.6 }, hue: .09, sat: .6, val: .75, belly: "white", legend: ["starTail"] },
  { id: "beetle", name: "Stag beetle", plan: "beetle", hue: .78, sat: .5, val: .35, legend: ["horn", "crystals"] },
];
export const SPECIES_BY_ID = Object.fromEntries(SPECIES.map(s => [s.id, s]));
export const FEATURE_NAMES = { wings: "spirit wings", mane: "a glowing mane", tails: "many tails", crystals: "crystals", tusksBig: "great tusks", antlersGlow: "glowing antlers", jackalope: "antlers", eyesRing: "a ring of eyes", moss: "a little forest on its back", starTail: "a starry tail", crown: "a crown", ribbons: "light ribbons", wingsBig: "huge glowing wings", horn: "a glowing horn", glowShell: "a glowing shell", hornsGlow: "glowing golden horns", flames: "a crest of flame", lantern: "a great lantern" };

export function speciesColours(sp, st) {
  const s = SPECIES_BY_ID[sp], v = st.cVal / .85, sat = st.cSat / .6;
  const body = hsv2rgb(s.hue, s.sat * sat * st.sat, s.val * v);
  const belly = s.belly === "yellow" ? [240, 196, 40] : s.belly === "white" || s.q?.face === "badger" ? [236, 232, 222] : hsv2rgb(s.hue + .03, s.sat * .5 * sat, Math.min(1, s.val * v * 1.3 + .08));
  const magic = hsv2rgb(st.magicHue + s.hue * .3, .6, 1), magic2 = hsv2rgb(st.magicHue + s.hue * .3, .18, 1);
  const pale = ["boar", "stag", "elk", "ram"].includes(s.id);
  return {
    [M.BODY]: body, [M.BODY2]: hsv2rgb(s.hue + .02, Math.min(1, s.sat * sat * 1.2 + .05), s.val * v * .66), [M.BODY3]: hsv2rgb(s.hue + .03, Math.min(1, s.sat * sat * 1.3 + .1), s.val * v * .4),
    [M.BELLY]: belly, [M.ACCENT]: pale ? [236, 226, 200] : hsv2rgb(s.hue + .05, s.sat * .6, Math.min(1, s.val * v * .5 + .25)),
    [M.MAGIC]: magic, [M.MAGIC2]: magic2, [M.LEAF]: hsv2rgb(.3, .55, .55), [M.LEAF2]: hsv2rgb(.25, .5, .75), [M.LEAF3]: hsv2rgb(.33, .6, .35), [M.TRUNK]: hsv2rgb(.07, .45, .32),
    [M.EYE]: [24, 18, 30], [M.PUPIL]: [70, 40, 90], [M.GLINT]: [255, 255, 245], [M.NOSE]: [38, 28, 36], [M.EAR]: hsv2rgb(s.hue + .97, Math.min(1, s.sat * .6 + .2), Math.min(1, s.val * v * .55 + .2)),
    [M.IRIS]: s.plan === "owl" ? [255, 176, 40] : hsv2rgb(.12, .7, .85), [M.SKIN]: [238, 158, 192],
  };
}

// A creature's height in pixels at each level: babies are drawn grids; young and legend
// grow from the style's baby size (Ed: a legend is about 20 times a baby's height).
// Young and legends are drawn in fewer, bigger pixels when the style's pixel size grows, so
// they keep their size on screen (Ed: "bigger pixels"); babies are fixed grids.
export const levelHeight = (level, st) => Math.round(st.size * Math.pow(Math.sqrt(st.growth), level) * (level ? 2 / (st.pixel || 2) : 1));

export function critter(spId, level, frame, st) {
  const S = SPECIES_BY_ID[spId] || SPECIES[0];
  if (MODELLED.has(S.id)) return S.plan === "owl" ? owl3d(S, level, frame, st) : quad3d(S, level, frame, st);
  if (level === 0 && BABIES[S.id]) return babySprite(S.id, frame, st);
  if (S.q) return quad(S, level, frame, st);
  const draw = { owl, raven, bat, toad, hedgehog, mole, beetle, snail, woodlouse, snake, moth, glowworm, spider }[S.plan];
  return draw(S, level, frame, st);
}

// ================= babies: hand-drawn grids =================
function babySprite(id, frame, st) {
  const B = BABIES[id], rows = frame && B.walk ? B.rows.slice(0, B.rows.length - B.walk.length).concat(B.walk) : B.rows;
  const w = Math.max(...rows.map(r => r.length)) + 2, h = rows.length + 1, sp = new Sprite(w, h);
  sp.grid(rows, KEY, 1, 1, { round: st.round });
  return sp;
}
// What each character in a baby grid is.
const KEY = { B: M.BODY, b: M.BODY2, d: M.BODY3, W: M.BELLY, A: M.ACCENT, E: M.EYE, G: M.GLINT, N: M.NOSE, I: M.IRIS, P: M.PUPIL, e: M.EAR, L: M.LINE, S: M.SKIN };

// ================= drawing in body units =================
// A creature is described in units of its shoulder height (ground at y = 0, up is
// negative), as a list of parts; it is then scaled to the level's pixel height, so the
// same description draws a young animal and a legend.
// Moves a sprite down so its lowest pixels stand on the bottom row (thin feet can round
// away to nothing at small sizes, leaving a creature floating a pixel up).
function settle(sp) {
  let low = -1; for (let y = sp.h - 1; y >= 0 && low < 0; y--) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x]) { low = y; break; }
  const d = sp.h - 1 - low; if (low < 0 || d === 0) return;
  for (let y = sp.h - 1; y >= 0; y--) for (let x = 0; x < sp.w; x++) {
    const i = y * sp.w + x, j = (y - d) * sp.w + x, from = y - d >= 0;
    sp.m[i] = from ? sp.m[j] : 0; sp.g[i] = from ? sp.g[j] : 0;
    for (let k = 0; k < 3; k++) sp.n[i * 3 + k] = from ? sp.n[j * 3 + k] : 0;
  }
}
class Plan {
  constructor() { this.ops = []; }
  shape(pts, mat, o = {}) { this.ops.push({ k: "shape", pts, mat, o }); return this; }
  limb(spine, mat, o = {}) { this.ops.push({ k: "limb", pts: spine, mat, o }); return this; }
  mark(pts, mat, onlyOn, o = {}) { this.ops.push({ k: "mark", pts, mat, onlyOn, o }); return this; }
  fn(f) { this.ops.push({ k: "fn", f }); return this; }
  // Scales the plan so that the points tagged `measure` span `height` pixels, makes the
  // sprite, and draws every part in order.
  // `warp([x, y]) -> [x, y, widthScale]`: an optional perspective applied to every point.
  draw(height, round, extraPad = 1, warp = null, ground = true) {
    if (warp) for (const op of this.ops) if (op.pts) op.pts = op.pts.map(p => { const [x, y, k = 1] = warp(p); return p.length > 2 ? [x, y, p[2] * k] : [x, y]; });
    const all = [], body = [];
    for (const op of this.ops) if (op.pts) for (const p of op.pts) { const r = op.k === "limb" ? (p[2] || 0) / 2 : 0; all.push([p[0] - r, p[1] - r], [p[0] + r, p[1] + r]); if (!op.o.extra) body.push([p[0], p[1] - r]); }
    const top = Math.min(...body.map(p => p[1])), s = height / -top;
    const x0 = Math.min(...all.map(p => p[0])), x1 = Math.max(...all.map(p => p[0])), y0 = Math.min(...all.map(p => p[1]));
    const W = Math.ceil((x1 - x0) * s) + 2 * extraPad + 2, H = Math.ceil(-y0 * s) + extraPad + 1;
    const sp = new Sprite(W, H), T = p => [(p[0] - x0) * s + extraPad + 1, H + p[1] * s];
    const ctx = { sp, s, T: warp ? p => T(warp(p)) : T, W, H }; // hand-placed details follow the warp too
    for (const op of this.ops) {
      const o = { round, ...op.o };
      if (s < 40 && !o.extra) o.line = false; // at young sizes interior lines eat thin legs
      if (op.k === "shape") sp.shape(op.pts.map(T), op.mat, o);
      else if (op.k === "limb") sp.limb(op.pts.map(p => [...T(p), p[2] * s]), op.mat, o);
      else if (op.k === "mark") sp.mark(op.pts.map(T), op.mat, op.onlyOn, o);
      else op.f(ctx);
    }
    if (ground) settle(sp);
    return sp;
  }
}
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
// Units: the shoulder (withers) is at y = -1, the ground at 0; x runs from tail (-) to head (+).
// q (per species): len half body length · chest, tuck: chest and waist heights above ground ·
// legW leg thickness · haunch hind-thigh size · hindFoot long hind feet (hare) ·
// neck, neckAng, neckW · hr skull radius · snout, snoutD, snoutTaper (in skull radii) ·
// ear point|big|tuft|small|round|long · tail (see tail()) · paw paw|hoof ·
// back flat|hump|arch · belly pale|white · and markings and features named below.
function quad(S, level, frame, st) {
  const q = { legW: 1, earS: 1, snoutTaper: .75, haunch: 1, hindFoot: 1, hgt: 1, ...S.q }, legend = level === 2, has = f => legend && S.legend.includes(f);
  const young = level === 1;
  // proportions shift with level: youngsters have big heads and short legs, legends are heroic
  // Three-quarter view (Ed): the body is turned partly towards the viewer, so it is foreshortened,
  // the far legs stand higher and a little ahead, and the head shows both eyes.
  const hr = q.hr * (young ? 1.22 : 1) * (st.head / .44) ** .5, len = q.len * (young ? .9 : 1.04) * st.long * .84;
  const legK = (young ? .92 : 1.04) * st.legs ** .5;
  const bob = frame ? -.05 : 0, back = -1 + bob, chest = -q.chest * (legend ? 1.1 : 1) / legK + bob, tuck = -q.tuck / legK + bob;
  const P = new Plan(), lw = q.legW * (legend ? 1.15 : 1), legMat = q.legMat || M.BODY;
  const swing = [.36, -.36][frame] * (q.stride || 1), far = [len * .14, -.13];
  const arch = q.back === "arch" ? .14 : 0, hump = q.back === "hump" ? .12 : 0;

  // ---- legs: hip/shoulder, knee, hock/wrist, foot; jointed like the real thing ----
  const hindTop = [-len * .62, back + .28 - arch * .5], foreTop = [len * .6, back + .42];
  const hindLeg = side => {
    const f = q.hindFoot, j = [hindTop, [-len * .42, tuck + .2], [-len * .74 - (f - 1) * .1, -.24 / f], [-len * .7 - (f - 1) * .05, -.05], [-len * .6 + (f - 1) * .22, 0]];
    return j.map(p => rot(p, hindTop, side * swing));
  };
  const foreLeg = side => [foreTop, [len * .64, chest + .06], [len * .6, -.2], [len * .63, -.05], [len * .72, 0]].map(p => rot(p, foreTop, -side * swing * .9));
  const legSpine = (j, w0) => { // stretch so the foot is on the ground
    const lo = Math.max(...j.map(p => p[1])), k = (0 - j[0][1]) / (lo - j[0][1]);
    const jj = j.map(p => [p[0], j[0][1] + (p[1] - j[0][1]) * k]);
    return [[...jj[0], w0], [...jj[1], .15 * lw], [...jj[2], .095 * lw], [...jj[3], .085 * lw], [...jj[4], .07 * lw]];
  };
  const foot = (j, mat, o, long = 1) => {
    const t = j[j.length - 1], fl = (q.paw === "hoof" ? .1 : .13) * long, fh = q.paw === "hoof" ? .09 : .075;
    P.shape([[t[0] - fl * .55, -fh], [t[0] + fl * .2, -fh * 1.1], [t[0] + fl * .6, -fh * .3], [t[0] + fl * .55, 0], [t[0] - fl * .6, 0]], q.paw === "hoof" ? M.NOSE : mat, o);
  };
  const leg = (j, mat, w0, o, long, off = [0, 0]) => { const sp = legSpine(j, w0).map(p => [p[0] + off[0], p[1] + off[1], p[2]]); P.limb(sp, mat, { cap: 1, capEnd: .4, ...o }); foot(sp.map(p => [p[0], p[1]]), mat, o, long); };

  // ---- behind everything: wings, many tails ----
  if (has("wings")) wings(P, [len * .25, back - .05], legend, frame, -1);
  if (has("tails")) for (let i = 0; i < 7; i++) { // a fan of fox tails, tipped with foxfire
    const a = Math.PI * (.62 + i * .085) + (frame ? .03 : 0), b = [-len * .95, back + .15], L = .95 + (i % 2) * .12;
    const e = add(b, [Math.cos(a) * L, -Math.sin(a) * L]), m = add(lerp2(b, e, .55), [Math.sin(a) * .08, Math.cos(a) * .08]);
    P.limb([[...b, .12], [...m, .34], [...lerp2(m, e, .6), .28], [...e, .12]], i % 2 ? M.BODY2 : M.BODY, { group: 70 + i % 2, line: true, extra: true });
    P.shape([add(e, [Math.cos(a) * .07, -Math.sin(a) * .07]), add(lerp2(m, e, .7), [Math.sin(a) * .13, Math.cos(a) * .13]), add(lerp2(m, e, .7), [-Math.sin(a) * .13, -Math.cos(a) * .13])], M.MAGIC2, { group: 72, extra: true });
  }

  // far legs: a shade darker (they are in shadow, and it tells near from far)
  const farMat = legMat === M.BODY ? M.BODY2 : M.BODY3;
  leg(foreLeg(-1), farMat, .19 * lw, { group: 2 }, 1, far);
  leg(hindLeg(-1), farMat, .3 * lw * q.haunch, { group: 2 }, q.hindFoot, far);

  // ---- tail ----
  const tb = [-len * 1.0, back + .18 - arch * .3];
  if (!has("tails")) tail(P, has("starTail") ? "star" : q.tail, tb, len, back, frame, has, young);

  // ---- torso: rump, a back line, withers, a deep chest, a tucked waist ----
  let torso = [
    [-len * 1.04, back + .14 - arch], [-len * .5, back + .02 - arch * 1.3], [len * .1, back + .06 - hump * .5 - arch * .6], [len * .55, back - .03 - hump], [len * .95, back + .22 - hump * .5],
    [len * 1.06, chest - .2], [len * .8, chest], [len * .3, chest + (tuck - chest) * .2], [-len * .25, tuck], [-len * .72, tuck + .02], [-len * 1.1, back + .42 - arch * .5],
  ];
  if (q.ridge) torso = tufts(torso, 0, 4, legend ? 10 : 7, legend ? .1 : .07, 1);
  if (q.shaggy) torso = tufts(torso, 6, 9, legend ? 6 : 4, .04, 1);
  if (q.wool) torso = tufts(torso, 0, torso.length - 1, legend ? 16 : 10, .05, 1);
  P.shape(torso, M.BODY, { group: 1, tilt: [0, -.3] }); // one mass, its top turned up to the light

  // ---- neck and head ----
  const neckBase = [len * .78, back + .2], ang = q.neckAng, H0 = add(neckBase, [Math.cos(ang) * q.neck * .85, -Math.sin(ang) * q.neck * .85]);
  const headC = add(H0, [hr * .2, 0]);
  P.limb([[...neckBase, q.neckW * 1.3], [...lerp2(neckBase, H0, .55), q.neckW * 1.05], [...H0, q.neckW * .9]], M.BODY, { group: 1, cap: 0, capEnd: 1 });
  const L = hr * q.snout * (young ? .75 : 1) * .72, D = hr * q.snoutD * 1.1, tp = q.snoutTaper; // the snout comes towards us, foreshortened
  let head = [
    [-hr * .85, -hr * .1], [-hr * .4, -hr * .78], [hr * .35, -hr * .72], [hr * .85, -hr * .38], [hr * .8 + L * .6, -D * .65 * (1 + tp) / 2 + hr * .02], [hr * .85 + L, -D * .5 * tp],
    [hr * .9 + L, D * .25 * tp], [hr * .75 + L, D * .42 * tp + hr * .1], [hr * .35, hr * .55], [-hr * .3, hr * .7], [-hr * .85, hr * .3],
  ].map(p => add(headC, p));
  if (q.cheeks) head = tufts(head, 8, 10, 3, hr * .22, 1); // a ruff of cheek fur (lynx)

  // ears: the far one behind the head, the near one in front of it
  const ear = (dx, k, mat, o) => earShape(P, q, add(headC, [dx * hr, -hr * .55]), hr, hr * q.earS * k, mat, o, frame);
  const antler = (dx, mat, o) => antlers(P, q, add(headC, [dx * hr, -hr * .6]), hr, level, has, mat, o);
  if (q.antlers || has("jackalope")) antler(.42, has("antlersGlow") ? M.MAGIC : M.ACCENT, { group: 11, line: true, extra: true });
  if (!q.antlers && has("jackalope")) antler(.1, M.ACCENT, { group: 12, line: true, extra: true }); // small antlers stand behind the long ears
  ear(.42, .85, M.BODY2, { group: 4 }); // the far ear, across the top of the head
  P.shape(head, M.BODY, { group: 1, line: false });
  if (q.face === "dark") P.mark(head, M.BODY2, [M.BODY]);
  ear(-.3, 1, M.BODY, { group: 5, line: true });
  if (q.horns) hornCurl(P, add(headC, [-hr * .1, -hr * .45]), hr, young ? .6 : has("hornsGlow") ? 1.5 : 1, has("hornsGlow") ? M.MAGIC : M.ACCENT, { group: 13, line: true, extra: true });
  if (q.antlers) antler(-.05, has("antlersGlow") ? M.MAGIC2 : M.ACCENT, { group: 12, line: true, extra: true });

  // near legs, in front, outlined where they overlap the body
  leg(hindLeg(1), legMat, .36 * lw * q.haunch, { group: 6, line: true }, q.hindFoot);
  leg(foreLeg(1), legMat, .2 * lw, { group: 7, line: true });

  // ---- markings ----
  if (q.saddle) P.mark([[-len * 1.15, back - .05 - arch], [len * .5, back - .1], [len * .85, back + .1], [len * .3, back + .2], [-len * .5, back + .24], [-len * 1.2, back + .3]], M.BODY2, [M.BODY]);
  if (q.belly) {
    const m = M.BELLY;
    P.mark([[len * .55, chest - .3], [len * 1.15, chest - .32], [len * 1.0, chest + .1], [len * .2, chest + .05], [-len * .4, tuck + .05], [-len * .3, tuck - .08]], m, [M.BODY]);
    P.mark([headC, add(headC, [hr * .5 + L, hr * .2]), add(headC, [hr * .8 + L, D * .5]), add(headC, [-hr * .2, hr * .9]), add(headC, [-hr * .7, hr * .5])], m, [M.BODY]);
  }
  if (q.muzzle) P.mark([add(headC, [hr * .55, -hr * .2]), add(headC, [hr * 1.2 + L, -D]), add(headC, [hr * 1.2 + L, D * .8]), add(headC, [hr * .4, hr * .6])], M.BELLY, [M.BODY]);
  if (q.face === "badger") { // white face, two black stripes from nose over the eyes to the ears
    P.mark([add(headC, [-hr * 1.1, -hr]), add(headC, [hr * 1.3 + L, -D]), add(headC, [hr * 1.3 + L, D]), add(headC, [-hr * 1.1, hr])], M.BELLY, [M.BODY]);
    for (const off of [-.05, .42]) P.mark([add(headC, [-hr * .9, -hr * (.85 - off)]), add(headC, [-hr * .4, -hr * (.95 - off)]), add(headC, [hr * .9 + L * .9, -D * .35 + hr * off * .25]), add(headC, [hr * .9 + L * .9, -D * .15 + hr * off * .3]), add(headC, [-hr * .3, -hr * (.4 - off)]), add(headC, [-hr * .9, -hr * (.35 - off)])], M.BODY3, [M.BELLY]);
  }
  if (q.rump) P.mark([[-len * 1.2, back + .12], [-len * .95, back + .14], [-len * .92, back + .45], [-len * 1.2, back + .45]], M.BELLY, [M.BODY]);
  if (q.paw === "paw" && !q.socks) { const t = legSpine(foreLeg(1), 0)[4]; P.mark([[t[0] - .08, -.18], [t[0] + .09, -.18], [t[0] + .12, 0], [t[0] - .08, 0]], M.BELLY, [M.BODY]); }
  P.fn(({ sp, T, s }) => { // socks, spots
    if (q.socks) { const y0 = T([0, -q.socks])[1]; for (let y = Math.floor(y0); y < sp.h; y++) for (let x = 0; x < sp.w; x++) { const i = y * sp.w + x; if ([2, 6, 7].includes(sp.g[i]) && [M.BODY, M.BODY2].includes(sp.m[i])) sp.m[i] = M.BODY3; } }
    const spots = q.spots === "young" ? young : q.spots;
    if (spots && s > 18) {
      const step = Math.max(3, Math.round(s * .09)), mat = q.spots === "young" || q.spotMat === "belly" ? M.BELLY : M.BODY3, yb = Math.round(T([0, back + .1])[1]), yc = Math.round(T([0, chest + .05])[1]);
      for (let y = yb; y < yc; y += step) for (let x = 0; x < sp.w; x += step * (q.spotMat ? 2 : 1)) {
        const ox = x + (((y / step) | 0) % 2 ? step >> 1 : 0) + (hash2(x, y, 3) * 2 | 0), i = y * sp.w + ox;
        if (sp.m[i] === M.BODY && sp.g[i] === 1 && sp.m[i + 1] === M.BODY && hash2(x, y, 5) < (q.spotMat ? .1 : .25) + st.fur * (q.spotMat ? .4 : 1)) { sp.m[i] = mat; if (s > 40) sp.m[i + 1] = mat; if (q.spotMat && s > 30) { sp.recolour(ox, y + 1, mat); sp.recolour(ox + 1, y + 1, mat); } }
      }
    }
  });

  // ---- face: the pixels that matter ----
  const ex = headC[0] + hr * .32, ey = headC[1] - hr * .24, nose = add(headC, [hr * .88 + L, -D * .45 * tp]);
  P.fn(({ sp, T, s }) => {
    const ep = Math.max(2, Math.round(hr * s * (young ? .42 : .3) * st.eye * (q.eyeK || 1)));
    const [x, y] = T([ex, ey]);
    eye(sp, x, y, ep, { glow: legend && !q.tusks });
    const [fx, fy] = T([headC[0] + hr * .78, headC[1] - hr * .46]); // the far eye, smaller, beside the bridge of the nose
    eye(sp, fx, fy, Math.max(1, ep - 1), { glow: legend && !q.tusks });
    // nose leather: a dark cap on the snout's tip
    const [nx, ny] = T(nose), nr = Math.max(1, Math.round(hr * s * (q.disc ? .22 : .14)));
    for (let dy = 0; dy <= nr; dy++) for (let dx = -nr; dx <= Math.round(nr * .3); dx++) if (sp.get(nx + dx, ny + dy) && (dx * dx) / (nr * nr) + (dy * dy) / ((nr + 1) * (nr + 1)) <= 1) sp.recolour(nx + dx, ny + dy, M.NOSE);
    if (q.disc) sp.recolour(nx - 1, ny + nr, M.BODY3);
    // mouth: a short line back from under the nose
    const m0 = T(add(headC, [hr * .85 + L, D * .2 * tp + hr * .06])), m1 = T(add(headC, [hr * .55 + L * .45, D * .32 * tp + hr * .12]));
    const steps = Math.ceil(Math.hypot(m1[0] - m0[0], m1[1] - m0[1]));
    if (s * hr > 6) for (let i = 0; i <= steps; i++) sp.recolour(m0[0] + (m1[0] - m0[0]) * i / steps, m0[1] + (m1[1] - m0[1]) * i / steps, M.LINE);
    if (q.teeth) { const [tx, ty] = T(add(headC, [hr * .8 + L, D * .35 * tp + hr * .1])), tw2 = Math.max(1, Math.round(hr * s * .14)); for (let dy = 0; dy < tw2 * 2; dy++) for (let dx = 0; dx < tw2; dx++) sp.px(tx - dx, ty + dy, M.ACCENT, 0, 0, 1); }
    if (q.whiskers && s * hr > 8) for (const k of [-1, 1]) { const [wx, wy] = T(add(headC, [hr * .75 + L, D * .1])); for (let i = 1; i <= Math.round(hr * s * .4); i++) if (!sp.get(wx + i, wy + k * (i >> 1))) sp.px(wx + i, wy + k * (i >> 1), M.LINE); }
  });

  // ---- tusks, ridge, and what legends grow on their backs ----
  if (q.tusks) {
    const k = young ? .35 : has("tusksBig") ? 1.25 : .7;
    const b = add(headC, [hr * .45 + L * .6, D * .3]);
    P.limb([[...b, .075 * k ** .5], [...add(b, [hr * .3 * k, -hr * .2 * k]), .07 * k ** .5], [...add(b, [hr * .38 * k, -hr * .6 * k]), .045 * k ** .5], [...add(b, [hr * .15 * k, -hr * .95 * k]), .012]], M.ACCENT, { group: 8, line: true, cap: .6, extra: true });
  }
  if (q.ridge) P.mark(tufts([[-len * 1.05, back + .12], [-len * .5, back + .01], [len * .1, back + .05 - hump * .5], [len * .55, back - .04 - hump], [len * .9, back + .2], [len * .5, back + .12], [-len * .5, back + .16]], 0, 4, legend ? 10 : 7, .07, 1), M.BODY3, [M.BODY, M.LINE]);
  const backAt = t => [-len * .9 + t * len * 1.6, back + .02 - arch * (1 - Math.abs(t - .45) * 1.6) - hump * Math.max(0, 1 - Math.abs(t - .85) * 3)];
  if (has("crystals")) crystals(P, backAt, frame);
  if (has("moss")) mossyBack(P, backAt, len, frame);
  if (has("ribbons")) ribbons(P, len, back, frame);
  if (has("mane") || has("flames")) for (let i = 0; i < 6; i++) { // flames streaming back from the crest of the neck, licking up
    const t = i / 5, b = lerp2(add(H0, [-hr * .3, -hr * .6]), [len * .25, back + .02], t), h = [.42, .3, .5, .26, .36, .22][i], w0 = .16 - t * .04, sw = frame ? .04 : 0;
    P.limb([[...b, w0], [...add(b, [-.03, -h * .45]), w0 * 1.05], [...add(b, [-.14 - sw, -h * .8]), w0 * .6], [...add(b, [-.1 - sw * 2, -h * 1.05]), w0 * .3], [...add(b, [.02 - sw, -h * 1.2]), .01]], i % 2 ? M.MAGIC : M.MAGIC2, { group: 60 + i % 2, line: true, extra: true, cap: 1, capEnd: .5 });
  }
  if (has("wings")) wings(P, [len * .15, back + .02], legend, frame, 1);

  // perspective: the front of the animal is nearer (larger), the rear further (smaller, higher)
  const warp = ([x, y]) => { const t = Math.max(-1.2, Math.min(.75, x / len)), k = 1 + .1 * t; return [x, y * k - .08 * Math.max(0, -t), k]; };
  const sp = P.draw(levelHeight(level, st) * q.hgt, st.round, 1, warp);
  if (legend) sparkle(sp, S.id);
  return sp;
}

// Tails, from the base of the spine backwards.
function tail(P, kind, tb, len, back, frame, has, young) {
  const tw = frame ? .03 : -.01, o = { group: 3, line: true };
  const X = k => -len * k;
  if (kind === "brush") { // a full brush, hanging, dark at the tip (wolf)
    P.shape(tufts([add(tb, [0, -.04]), [X(1.3), back + .26 + tw], [X(1.46), back + .6], [X(1.36), -.36 + tw], [X(1.2), -.36], [X(1.16), back + .66], [X(1.0), back + .4]], 1, 4, 5, .05, 1), M.BODY, o);
    P.mark([[X(1.5), -.5 + tw], [X(1.1), -.5], [X(1.2), -.3], [X(1.4), -.3]], M.BODY3, [M.BODY]);
  } else if (kind === "bushy") { // a fox's: long, thick, held out, white-tipped
    const tip = [X(1.05) - .95, back + .5 + tw];
    P.shape(tufts([add(tb, [0, -.05]), [X(1.05) - .3, back + .05 + tw], [X(1.05) - .7, back + .2 + tw], [tip[0] - .05, tip[1] - .08], [tip[0] - .02, tip[1] + .1], [X(1.05) - .6, back + .6 + tw], [X(1.05) - .25, back + .52], [X(1.0), back + .4]], 2, 6, 5, .045, 1), M.BODY, o);
    P.mark([[tip[0] - .2, tip[1] - .3], [tip[0] + .22, tip[1] - .3], [tip[0] + .22, tip[1] + .3], [tip[0] - .2, tip[1] + .3]], M.BELLY, [M.BODY]);
  } else if (kind === "stub") {
    P.shape([add(tb, [.04, -.04]), add(tb, [-.12, -.1 + tw]), add(tb, [-.16, .02 + tw]), add(tb, [-.04, .12])], M.BODY, o);
  } else if (kind === "deer") { // a short tail, white beneath
    P.shape([add(tb, [.03, -.04]), add(tb, [-.07, -.06 + tw]), add(tb, [-.09, .06 + tw]), add(tb, [-.01, .11])], M.BELLY, o);
    P.mark([add(tb, [.04, -.08]), add(tb, [-.12, -.08]), add(tb, [-.1, -.02]), add(tb, [.04, -.02])], M.BODY, [M.BELLY]);
  } else if (kind === "bob") { // lynx: a short bob with a black tip
    P.shape([add(tb, [.04, -.06]), add(tb, [-.16, -.12 + tw]), add(tb, [-.24, -.02 + tw]), add(tb, [-.04, .12])], M.BODY, o);
    P.mark([add(tb, [-.14, -.2]), add(tb, [-.3, -.1]), add(tb, [-.3, .05]), add(tb, [-.14, .05])], M.BODY3, [M.BODY]);
  } else if (kind === "puff") { // a hare's: a white puff
    P.shape(tufts([add(tb, [.04, -.1]), add(tb, [-.14, -.16]), add(tb, [-.2, .02]), add(tb, [-.04, .1])], 0, 3, 2, .03, 1), M.BELLY, o);
  } else if (kind === "squirrel" || kind === "star") { // a big plume curling up over the back
    const mat = kind === "star" ? M.MAGIC : M.BODY, s = [[...tb, .16], [X(1.3), back - .05 + tw, .36], [X(1.32), back - .65 + tw, .46], [X(1.0), back - 1.05 + tw, .44], [X(.62), back - 1.02 + tw, .3], [X(.45), back - .82 + tw, .12]];
    P.shape(tufts(band(s), 0, 6, 9, .05, 1), mat, { ...o, extra: true });
    P.mark(band([[X(1.18), back - .1, .12], [X(1.18), back - .62, .2], [X(.98), back - .9, .2], [X(.7), back - .92, .1]]), kind === "star" ? M.MAGIC2 : M.BODY2, [mat]);
    if (kind === "star") P.fn(({ sp, T, s: sc }) => { const r = rng(7); for (let i = 0; i < 9; i++) { const [x, y] = T([X(uni(r, .7, 1.4)), back - uni(r, .1, 1.0)]); if (sp.get(x, y) === M.MAGIC || sp.get(x, y) === M.MAGIC2) { sp.px(x, y, M.GLINT); if (sc > 40) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if ([M.MAGIC, M.MAGIC2].includes(sp.get(x + dx, y + dy))) sp.px(x + dx, y + dy, M.GLINT); } } });
  } else if (kind === "otter") { // thick at the root, tapering to the ground
    P.limb([[...tb, .26], [X(1.3), back + .5 + tw, .18], [X(1.6), -.12, .1], [X(1.85), -.06 + tw, .04]], M.BODY, o);
  } else if (kind === "stoat") { // thin, held out, black-tipped
    P.limb([[...tb, .12], [X(1.25), back + .12 + tw, .1], [X(1.5), back + .02 + tw, .09], [X(1.65), back - .05 + tw, .07]], M.BODY, o);
    P.mark([[X(1.48), back - .25], [X(1.8), back - .25], [X(1.8), back + .25], [X(1.48), back + .25]], M.BODY3, [M.BODY]);
  } else if (kind === "flat") { // a beaver's paddle, scaled
    P.limb([[...tb, .14], [X(1.15), back + .6, .1]], M.BODY2, o);
    const c = [X(1.35), -.12 + tw * .5];
    P.shape([add(c, [.22, -.06]), add(c, [0, -.11]), add(c, [-.3, -.07]), add(c, [-.36, .02]), add(c, [-.2, .07]), add(c, [.2, .05])], M.BODY3, o);
    P.fn(({ sp, T, s }) => { if (s < 30) return; const [x0, y0] = T(add(c, [-.32, -.1])), [x1, y1] = T(add(c, [.2, .06])); for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if ((x + y) % 4 === 0 && sp.get(x, y) === M.BODY3) sp.recolour(x, y, M.LINE); });
  } else if (kind === "thin") { // a pig's: thin, with a tassel
    P.limb([[...tb, .07], [X(1.1), back + .3, .05], [X(1.12) + tw, back + .55, .035]], M.BODY, { group: 3 });
    P.shape(tufts([[X(1.15) + tw, back + .5], [X(1.08) + tw, back + .55], [X(1.12) + tw, back + .72], [X(1.17) + tw, back + .7]], 1, 3, 2, .04, 1), M.BODY3, { group: 3 });
  }
}

// Ears, standing on base point b, `e` long.
function earShape(P, q, b, hr, e, mat, o, frame) {
  const k = q.ear;
  if (k === "none") return;
  if (k === "round") { // bear, badger, otter: a small half-disc
    P.shape([add(b, [-hr * .32, .02]), add(b, [-hr * .3, -e * .32]), add(b, [-hr * .05, -e * .45]), add(b, [hr * .15, -e * .25]), add(b, [hr * .18, .02])], mat, o);
    P.mark([add(b, [-hr * .2, -.01]), add(b, [-hr * .18, -e * .2]), add(b, [hr * .02, -e * .28]), add(b, [hr * .08, -.01])], M.EAR, [mat]);
    return;
  }
  if (k === "long") { // a hare's: long, laid back, black-tipped
    const tip = add(b, [-e * .32, -e * 1.05 + (frame ? .02 : 0)]);
    P.shape([add(b, [-hr * .25, .02]), add(lerp2(b, tip, .5), [-hr * .2, 0]), add(tip, [-hr * .05, -hr * .05]), add(tip, [hr * .12, hr * .1]), add(lerp2(b, tip, .5), [hr * .24, hr * .05]), add(b, [hr * .25, 0])], mat, o);
    P.mark([add(lerp2(b, tip, .15), [-hr * .05, 0]), add(lerp2(b, tip, .8), [0, 0]), add(lerp2(b, tip, .5), [hr * .14, hr * .03])], M.EAR, [mat]);
    P.mark([add(tip, [-hr * .3, -hr * .3]), add(tip, [hr * .3, -hr * .2]), add(lerp2(b, tip, .85), [hr * .3, hr * .1]), add(lerp2(b, tip, .85), [-hr * .3, 0])], M.BODY3, [mat, M.EAR]);
    return;
  }
  const pts = k === "small"
    ? [add(b, [-hr * .25, .02]), add(b, [-hr * .55, -e * .55]), add(b, [-hr * .62, -e * .62]), add(b, [hr * .2, -hr * .08])]
    : [add(b, [-hr * .3, .02]), add(b, [-hr * .25, -e * .6]), add(b, [-hr * .12, -e * 1.02]), add(b, [-hr * .05, -e * 1.04]), add(b, [hr * .22, -e * .45]), add(b, [hr * .3, -hr * .02])];
  P.shape(pts, mat, o);
  if (k !== "small") P.mark([add(b, [-hr * .15, -e * .15]), add(b, [-hr * .1, -e * .7]), add(b, [hr * .1, -e * .35]), add(b, [hr * .12, -e * .1])], M.EAR, [mat]);
  P.mark([add(b, [-hr * .3, -e * .72]), add(b, [-hr * .1, -e * 1.1]), add(b, [hr * .1, -e * .9]), add(b, [hr * .3, -e * .62])], M.BODY3, [mat, M.EAR]);
  if (k === "tuft") P.limb([[...add(b, [-hr * .08, -e * .98]), .045], [...add(b, [-hr * .02, -e * 1.35]), .02]], M.BODY3, { ...o, extra: true });
}

// Antlers: a beam that sweeps back and then up, with tines pointing forward; or a palmate
// blade spreading back (elk). They grow with level; a jackalope's are small.
function antlers(P, q, b, hr, level, has, mat, o) {
  const jack = !q.antlers, A = jack ? .45 : [0, .5, .9][level] * (has("antlersGlow") ? 1.15 : 1);
  if (!A) return;
  const tine = (p, a, l, w) => P.limb([[...p, w], [...add(p, [Math.cos(a) * l * .6, -Math.sin(a) * l * .6]), w * .7], [...add(p, [Math.cos(a) * l, -Math.sin(a) * l * 1.05]), w * .3]], mat, { ...o, capEnd: .6 });
  const w = .07 * Math.max(.7, A);
  if (q.antlers === "palm") {
    const knee = add(b, [-.2 * A, -.12 * A]), c = add(knee, [-.32 * A, -.18 * A]);
    P.limb([[...b, w * 1.3], [...knee, w * 1.1], [...lerp2(knee, c, .6), w]], mat, o);
    const pts = [add(knee, [0, -.02 * A]), add(c, [.18 * A, -.2 * A]), add(c, [-.05 * A, -.3 * A]), add(c, [-.38 * A, -.2 * A]), add(c, [-.42 * A, .02 * A]), add(c, [-.15 * A, .12 * A])];
    P.shape(tufts(pts, 1, 4, level === 2 ? 4 : 3, .09 * A, 1), mat, o);
    tine(add(knee, [.02 * A, 0]), .5, .22 * A, w * .7); // brow tine
    return;
  }
  const p1 = add(b, [-.22 * A, -.28 * A]), p2 = add(b, [-.3 * A, -.62 * A]), p3 = add(b, [-.16 * A, -.92 * A]), p4 = add(b, [.02 * A, -1.02 * A]);
  P.limb([[...b, w * 1.25], [...p1, w], [...p2, w * .85], [...p3, w * .65], [...p4, w * .3]], mat, { ...o, capEnd: .6 });
  tine(add(b, [-.06 * A, -.08 * A]), .45, .3 * A, w * .8);   // brow tine, forward over the face
  if (A > .4 || jack) tine(p1, .7, .32 * A, w * .7);
  if (A > .7) { tine(p2, .85, .3 * A, w * .6); tine(p3, 1.1, .2 * A, w * .5); tine(p3, 2.3, .16 * A, w * .45); }
}

// Faceted crystals growing from the back: each a prism with one lit facet.
function crystals(P, backAt, frame) {
  const sizes = [.32, .5, .38, .62, .42, .3];
  sizes.forEach((h, i) => {
    const t = .12 + i * .14, b = add(backAt(t), [0, .08]), lean = (i - 2.5) * .08, w = h * .32;
    const apex = add(b, [lean * h, -h]);
    const pts = [add(b, [-w * .5, 0]), add(b, [-w * .55 + lean * h * .7, -h * .72]), apex, add(b, [w * .55 + lean * h * .7, -h * .72]), add(b, [w * .5, 0])];
    P.shape(pts, M.MAGIC, { group: 80 + i % 2, line: true, extra: true });
    P.mark([add(b, [0, 0]), add(b, [lean * h * .7, -h * .72]), apex, add(b, [w * .55 + lean * h * .7, -h * .72]), add(b, [w * .5, 0])], M.MAGIC2, [M.MAGIC]);
  });
}

// A little forest on its back: a moss blanket, small trees, glowing mushrooms.
function mossyBack(P, backAt, len, frame) {
  const top = [], bot = [];
  for (let i = 0; i <= 8; i++) { const p = backAt(.05 + i * .11); top.push(add(p, [0, -.08])); bot.unshift(add(p, [0, .14])); }
  P.shape(tufts([...top, ...bot], 0, 8, 2, .05, 1), M.LEAF, { group: 85, line: true, extra: true });
  for (const [t, h] of [[.22, .55], [.5, .8], [.75, .45]]) {
    const b = add(backAt(t), [0, -.02]), sway = frame ? .02 : 0;
    P.limb([[...b, .07], [...add(b, [sway, -h * .6]), .04]], M.TRUNK, { group: 86, line: true, extra: true });
    const c = add(b, [sway, -h * .75]), r = h * .32;
    P.shape(tufts([add(c, [0, -r]), add(c, [r * .9, -r * .3]), add(c, [r, r * .4]), add(c, [0, r * .6]), add(c, [-r, r * .4]), add(c, [-r * .9, -r * .3])], 0, 6, 2, r * .2, 1), M.LEAF2, { group: 87, line: true, extra: true });
    P.mark([add(c, [-r * .2, -r * .1]), add(c, [r * .9, 0]), add(c, [r * .8, r * .5]), add(c, [-r * .5, r * .5])], M.LEAF, [M.LEAF2]);
  }
  for (const t of [.1, .38, .62, .9]) { const b = add(backAt(t), [0, -.06]); P.limb([[...b, .04], [...add(b, [0, -.1]), .035]], M.BELLY, { group: 88, extra: true }); P.shape([add(b, [-.08, -.1]), add(b, [0, -.17]), add(b, [.08, -.1])], M.MAGIC, { group: 89, line: true, extra: true }); }
}

// Ribbons of light streaming back from the body.
function ribbons(P, len, back, frame) {
  for (let i = 0; i < 3; i++) {
    const s = [], ph = frame * .8 + i * 1.7;
    for (let k = 0; k <= 8; k++) { const t = k / 8; s.push([len * (.55 - t * 2.2), back + .05 - i * .1 - t * (.25 + i * .12) + Math.sin(t * 6 + ph) * .1 * t, .07 * (1 - t * .7)]); }
    P.limb(s, i % 2 ? M.MAGIC2 : M.MAGIC, { group: 90 + i, line: true, extra: true });
  }
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

// ================= the other body plans =================
// Same units as the quadrupeds: ground at 0, the body's top at about -1.

// A crown: a band with five points and glowing gems, sitting on `c` (toad, mole).
function crown(P, c, w, h, frame) {
  const b = [add(c, [-w / 2, 0]), add(c, [-w / 2, -h * .35]), add(c, [w / 2, -h * .35]), add(c, [w / 2, 0])];
  const pts = [b[0], add(c, [-w * .55, -h]), add(c, [-w * .3, -h * .45]), add(c, [-w * .15, -h * 1.05]), add(c, [0, -h * .5]), add(c, [w * .15, -h * 1.05]), add(c, [w * .3, -h * .45]), add(c, [w * .55, -h]), b[3]];
  P.shape(pts, M.MAGIC, { group: 95, line: true, extra: true });
  P.mark([add(c, [-w * .6, -h * .05]), add(c, [w * .6, -h * .05]), add(c, [w * .6, -h * .3]), add(c, [-w * .6, -h * .3])], M.MAGIC2, [M.MAGIC]);
  P.fn(({ sp, T }) => { for (const k of [-.3, 0, .3]) { const [x, y] = T(add(c, [w * k, -h * .17])); sp.recolour(x, y, M.GLINT); } });
}

// Hedgehog: a dome of spines over a small pale face and little legs.
function hedgehog(S, level, frame, st) {
  const legend = level === 2, young = level === 1, has = f => legend && S.legend.includes(f), P = new Plan();
  const f = frame ? .02 : 0;
  for (const [x, m, g] of [[-.45, M.BODY3, 2], [.3, M.BODY3, 2]]) P.limb([[x + .05, -.25, .14], [x + .08 + f, 0, .1]], m, { group: g });
  P.shape([[-.6, -.3], [.45, -.38], [.55, -.15], [.1, -.08], [-.55, -.12]], M.BELLY, { group: 1, line: true });
  // the coat of spines, with a ragged edge
  let coat = [[-.75, -.15], [-.82, -.5], [-.55, -.9], [-.05, -1.0], [.35, -.88], [.58, -.58], [.5, -.3], [.15, -.38], [-.3, -.28]];
  coat = tufts(coat, 0, 6, young ? 3 : legend ? 6 : 4, young ? .06 : .09, 1);
  P.shape(coat, M.BODY2, { group: 3, line: true });
  P.fn(({ sp, T, s }) => { // spines: short dark strokes raking back, with pale tips
    if (s < 18) return;
    const r = rng(11), [x0, y0] = T([-.85, -1.05]), [x1, y1] = T([.6, -.2]), n = Math.round((x1 - x0) * (y1 - y0) / 9);
    for (let i = 0; i < n; i++) {
      const x = Math.round(uni(r, x0, x1)), y = Math.round(uni(r, y0, y1)), L = Math.max(2, Math.round(s * .05));
      if (sp.g[y * sp.w + x] !== 3) continue;
      for (let k = 0; k < L; k++) { const X = x - k, Y = y + (k >> 1); if (sp.g[Y * sp.w + X] === 3 && sp.m[Y * sp.w + X] !== M.LINE) sp.m[Y * sp.w + X] = M.BODY3; }
      if (sp.g[y * sp.w + x + 1] === 3) sp.m[y * sp.w + x + 1] = M.BELLY;
    }
  });
  // the face: a pale wedge with a dark nose
  const sn = young ? .16 : .24;
  P.shape([[.35, -.68], [.58, -.6], [.68 + sn, -.4], [.7 + sn, -.3], [.6, -.18], [.32, -.22]], M.BELLY, { group: 4, line: true });
  P.shape([[.38, -.7], [.48, -.78], [.55, -.66], [.46, -.6]], M.BODY, { group: 5, line: true }); // ear
  P.fn(({ sp, T, s }) => {
    const [nx, ny] = T([.7 + sn, -.36]), r = Math.max(1, Math.round(s * .035));
    for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= 0; dx++) sp.recolour(nx + dx, ny + dy, M.NOSE);
    const [x, y] = T([.58, -.5]); eye(sp, x, y, Math.max(2, Math.round(s * (young ? .1 : .07) * st.eye)), { glow: legend });
  });
  if (has("crystals")) crystals(P, t => [-.7 + t * 1.2, -.98 + Math.pow(t - .45, 2) * 1.4], frame);
  const sp = P.draw(levelHeight(level, st) * .55, st.round, 1, sideWarp);
  if (legend) sparkle(sp, S.id);
  return sp;
}

// Toad: squat and warty, a wide mouth, eyes on top like turrets, folded hind legs.
function toad(S, level, frame, st) {
  const legend = level === 2, young = level === 1, has = f => legend && S.legend.includes(f), P = new Plan();
  const hop = frame ? -.05 : 0;
  P.limb([[-.35, -.35 + hop, .28], [-.05, -.12, .18], [-.4, -.04, .12], [-.1, 0, .08]], M.BODY2, { group: 2 }); // far hind leg
  P.limb([[.45, -.35 + hop, .12], [.62, 0, .08]], M.BODY2, { group: 2 });
  const body = [[-.7, -.18 + hop], [-.72, -.5 + hop], [-.4, -.8 + hop], [.1, -.86 + hop], [.5, -.74 + hop], [.76, -.52 + hop], [.8, -.36 + hop], [.62, -.18 + hop], [.1, -.08 + hop], [-.4, -.08 + hop]];
  P.shape(body, M.BODY, { group: 1, line: true });
  P.mark([[-.5, -.3 + hop], [.3, -.42 + hop], [.8, -.38 + hop], [.65, -.1 + hop], [-.4, -.05 + hop]], M.BELLY, [M.BODY]);
  P.shape([[.18, -.78 + hop], [.28, -.98 + hop], [.48, -1.0 + hop], [.58, -.8 + hop]], M.BODY, { group: 1 }); // the eye's turret
  P.limb([[-.3, -.45 + hop, .34], [.02, -.14, .2], [-.42, -.05, .13], [-.06, 0, .09]], M.BODY, { group: 6, line: true }); // near hind leg, folded
  const front = () => { P.limb([[.46, -.32 + hop, .16], [.56, -.14, .11], [.64, 0, .08]], M.BODY, { group: 7, line: true }); for (const x of [-.06, .64]) P.shape([[x - .06, -.04], [x + .14, -.05], [x + .16, 0], [x - .06, 0]], M.BODY, { group: 7 }); };
  P.fn(({ sp, T, s }) => {
    // warts
    if (s > 18) { const r = rng(5); for (let i = 0; i < 40; i++) { const [x, y] = T([uni(r, -.65, .55), uni(r, -.8, -.35) + hop]); if (sp.m[y * sp.w + x] === M.BODY && sp.g[y * sp.w + x] === 1) { sp.m[y * sp.w + x] = M.BODY3; if (s > 50) sp.recolour(x + 1, y - 1, M.BELLY); } } }
    // the mouth: a long line back from the snout
    const [x0, y0] = T([.79, -.4 + hop]), [x1] = T([.35, 0]);
    for (let x = x1; x <= x0; x++) sp.recolour(x, y0 + Math.round((x0 - x) * .08), M.LINE);
    // the eye: gold, with a dark bar of a pupil
    const [ex, ey] = T([.42, -.88 + hop]), d = Math.max(2, Math.round(s * (young ? .17 : .13) * st.eye));
    owlEye(sp, ex, ey, d, legend);
    if (d >= 4) for (let k = -Math.floor(d / 2) + 1; k < Math.floor(d / 2); k++) sp.px(ex + k, ey, M.EYE);
  });
  front();
  if (has("crown")) crown(P, [.38, -1.0 + hop], .5, .32, frame);
  const sp = P.draw(levelHeight(level, st) * .5, st.round, 1, sideWarp);
  if (legend) sparkle(sp, S.id);
  return sp;
}

// Raven: a heavy beak, shaggy throat, folded wings over a long wedge tail.
function raven(S, level, frame, st) {
  const legend = level === 2, young = level === 1, has = f => legend && S.legend.includes(f), P = new Plan();
  const bob = frame ? .02 : 0;
  if (has("wings")) wings(P, [.05, -.72], legend, frame, -1);
  for (const [x, g, m] of [[-.02, 2, M.BODY3], [.1, 7, M.NOSE]]) {
    const f = frame && g === 7 ? -.04 : 0;
    P.limb([[x, -.32, .07], [x + .04, -.02 + f, .05]], m, { group: g });
    P.shape([[x - .1, -.04 + f], [x + .2, -.05 + f], [x + .2, 0 + f], [x - .1, 0 + f]], m, { group: g });
  }
  P.shape(tufts([[-.25, -.48 + bob], [-.95, -.3], [-1.0, -.2], [-.25, -.3]], 1, 2, 3, .04, 1), M.BODY2, { group: 3, line: true }); // tail
  P.shape([[.38, -.78 + bob], [.42, -.52], [.18, -.3], [-.25, -.3], [-.48, -.45], [-.2, -.72 + bob]], M.BODY, { group: 1, line: true });
  const hr = young ? .21 : .17, hc = [.45, -.86 + bob];
  P.shape(tufts([add(hc, [-hr * .9, 0]), add(hc, [-hr * .4, -hr * .95]), add(hc, [hr * .5, -hr * .85]), add(hc, [hr * .95, -hr * .1]), add(hc, [hr * .6, hr * .9]), add(hc, [-hr * .2, hr * 1.6]), add(hc, [-hr * .8, hr * 1.2])], 4, 6, 3, .03, 1), M.BODY, { group: 1 });
  const bl = young ? .28 : .38;
  P.shape([add(hc, [hr * .6, -hr * .45]), add(hc, [hr + bl * .6, -hr * .45]), add(hc, [hr + bl, -hr * .05]), add(hc, [hr + bl * .95, hr * .15]), add(hc, [hr + bl * .4, hr * .2]), add(hc, [hr * .6, hr * .35])], M.NOSE, { group: 8, line: true });
  if (!has("wings")) P.shape(tufts([[.28, -.72 + bob], [-.1, -.42], [-.75, -.3], [-.75, -.36], [-.2, -.66 + bob]], 1, 3, 4, .04, 1), M.BODY2, { group: 4, line: true });
  P.fn(({ sp, T, s }) => {
    const [x, y] = T(add(hc, [hr * .35, -hr * .2])); eye(sp, x, y, Math.max(2, Math.round(s * (young ? .1 : .07) * st.eye)), { glow: legend });
    const [fx, fy] = T(add(hc, [hr * .85, -hr * .35])); sp.px(fx, fy, legend ? M.MAGIC2 : M.EYE); // the far eye, by the beak
    if (s > 30) { const [gx, gy] = T(add(hc, [hr * .1, -hr * .7])); sp.recolour(gx, gy, M.BELLY); sp.recolour(gx + 1, gy, M.BELLY); } // a sheen on the crown
  });
  if (has("eyesRing")) P.fn(({ sp, T, s }) => { const ep = Math.max(3, Math.round(s * .09)); for (let i = 0; i < 5; i++) { const a = Math.PI * (1.15 + i * .17), [x, y] = T(add(hc, [Math.cos(a) * .55 - .15, Math.sin(a) * .5 + .05])); owlEye(sp, x, y, ep, true, true); } });
  if (has("wings")) wings(P, [-.02, -.66], legend, frame, 1);
  const sp = P.draw(levelHeight(level, st) * .6, st.round, 1, sideWarp);
  if (legend) sparkle(sp, S.id);
  return sp;
}

// Bat: on the wing, seen from the front: big ears, a furry body, membranes stretched
// between finger bones. Two frames: wings up, wings down.
function bat(S, level, frame, st) {
  const legend = level === 2, young = level === 1, has = f => legend && S.legend.includes(f), P = new Plan();
  const span = has("wingsBig") ? 1.5 : young ? .85 : 1, up = frame === 0, hov = -.25;
  for (const sd of [-1, 1]) {
    const X = (x, y) => [sd * x * span, y + hov], sh = X(.12 / span, -.62);
    const wrist = up ? X(.55, -1.0) : X(.6, -.62), tips = up ? [X(1.0, -.95), X(1.05, -.62), X(.8, -.32)] : [X(1.05, -.45), X(.9, -.18), X(.6, -.02)];
    const root = X(.12 / span, -.38), mem = [sh, wrist, tips[0]];
    for (let i = 1; i < tips.length; i++) mem.push(lerp2(lerp2(tips[i - 1], tips[i], .5), wrist, .22), tips[i]);
    mem.push(lerp2(lerp2(tips[2], root, .5), wrist, .1), root);
    const mat = has("wingsBig") ? M.MAGIC : M.BODY2;
    P.shape(sd < 0 ? mem.slice().reverse() : mem, mat, { group: 10 + (sd > 0 ? 1 : 0), line: true, extra: true, depth: 2 });
    for (const t of tips) P.limb([[...wrist, .05], [...t, .02]], has("wingsBig") ? M.MAGIC2 : M.BODY3, { group: 12, extra: true });
    P.limb([[...sh, .07], [...wrist, .05]], has("wingsBig") ? M.MAGIC2 : M.BODY3, { group: 12, extra: true });
  }
  const bc = [0, -.5 + hov];
  P.shape(tufts([add(bc, [0, -.25]), add(bc, [.17, -.12]), add(bc, [.16, .15]), add(bc, [0, .28]), add(bc, [-.16, .15]), add(bc, [-.17, -.12])], 2, 5, 3, .03, 1), M.BODY, { group: 1, line: true });
  const hc = [0, -.82 + hov], hr = young ? .17 : .14;
  for (const sd of [-1, 1]) {
    P.shape([add(hc, [sd * hr * .3, -hr * .6]), add(hc, [sd * hr * 1.05, -hr * 2.3]), add(hc, [sd * hr * 1.2, -hr * .3])], M.BODY, { group: 2, line: true });
    P.mark([add(hc, [sd * hr * .55, -hr * .7]), add(hc, [sd * hr * 1.0, -hr * 1.9]), add(hc, [sd * hr * 1.0, -hr * .5])], M.EAR, [M.BODY]);
  }
  P.shape([add(hc, [0, -hr]), add(hc, [hr, -hr * .3]), add(hc, [hr * .7, hr * .8]), add(hc, [0, hr]), add(hc, [-hr * .7, hr * .8]), add(hc, [-hr, -hr * .3])], M.BODY, { group: 1 });
  P.fn(({ sp, T, s }) => {
    for (const sd of [-1, 1]) { const [x, y] = T(add(hc, [sd * hr * .42, -hr * .1])); if (s * hr > 7) owlEye(sp, x, y, Math.max(2, Math.round(s * hr * .4 * st.eye)), legend); else sp.px(x, y, M.EYE); }
    const [nx, ny] = T(add(hc, [0, hr * .45])); sp.recolour(nx, ny, M.NOSE); sp.recolour(nx - 1, ny, M.NOSE);
    if (s > 30) { sp.recolour(nx - 2, ny + 2, M.GLINT); sp.recolour(nx + 1, ny + 2, M.GLINT); } // two little fangs
  });
  for (const sd of [-1, 1]) P.limb([[sd * .08, -.28 + hov, .05], [sd * .1, -.18 + hov, .04]], M.BODY3, { group: 3 }); // feet
  const sp = P.draw(levelHeight(level, st) * .45, st.round, 1, null, false); // it flies: no ground
  if (legend) sparkle(sp, S.id);
  return sp;
}

// Mole: a velvet barrel, a long pink snout, huge spade hands turned out.
function mole(S, level, frame, st) {
  const legend = level === 2, young = level === 1, has = f => legend && S.legend.includes(f), P = new Plan();
  const f = frame ? .03 : 0;
  P.limb([[-.5, -.25, .14], [-.48, 0, .1]], M.SKIN, { group: 2 });
  P.limb([[-.7, -.3, .08], [-.85, -.2, .05]], M.SKIN, { group: 2 }); // tail
  const sn = young ? .22 : .32;
  P.shape([[-.75, -.12], [-.82, -.5], [-.45, -.95], [.15, -1.0], [.55, -.8], [.8, -.55], [.8, -.35], [.55, -.2], [0, -.08]], M.BODY, { group: 1, line: true });
  P.shape([[.7, -.58], [.8 + sn, -.5], [.84 + sn, -.42], [.8 + sn, -.36], [.72, -.36]], M.SKIN, { group: 4, line: true });
  P.mark([[-.6, -.85], [.3, -.98], [.5, -.8], [-.3, -.72]], M.BODY2, [M.BODY]);
  // a spade hand: broad, pink, with long claws, turned outwards
  const hand = (x, m, g) => {
    P.limb([[x - .05, -.4, .14], [x + .02, -.16 - f, .11]], m, { group: g, line: true });
    P.shape([[x - .06, -.2 - f], [x + .12, -.22 - f], [x + .2, -.08 - f], [x + .06, -.03], [x - .08, -.06]], M.SKIN, { group: g, line: true });
    for (let k = 0; k < 4; k++) P.limb([[x + .08 + k * .045, -.08 - f * (k % 2), .035], [x + .14 + k * .05, .0, .015]], M.ACCENT, { group: g + 1, line: true, extra: true });
  };
  hand(.25, M.BODY2, 5);
  hand(.45, M.BODY, 7);
  P.fn(({ sp, T, s }) => {
    const [x, y] = T([.62, -.62]); sp.px(x, y, legend ? M.MAGIC2 : M.EYE); if (s > 40) sp.px(x - 1, y, legend ? M.MAGIC : M.EYE);
    const [nx, ny] = T([.84 + sn, -.45]); sp.recolour(nx, ny, M.NOSE); sp.recolour(nx, ny + 1, M.NOSE);
  });
  if (has("crown")) crown(P, [.25, -.98], .42, .3, frame);
  const sp = P.draw(levelHeight(level, st) * .45, st.round, 1, sideWarp);
  if (legend) sparkle(sp, S.id);
  return sp;
}

// Stag beetle: glossy wing cases, a shield behind the head, antler-like jaws, six legs.
function beetle(S, level, frame, st) {
  const legend = level === 2, young = level === 1, has = f => legend && S.legend.includes(f), P = new Plan();
  const leg = (x, side, i, m, g) => {
    const ph = (i + (side > 0 ? 1 : 0) + frame) % 2 ? .06 : -.06, k = [x, -.3], kn = [x + side * .0 + ph + (i - 1) * .1, -.42], ft = [x + ph * 1.5 + (i - 1) * .22, 0];
    P.limb([[...k, .07], [...kn, .06], [...ft, .03]], m, { group: g, line: true });
  };
  for (let i = 0; i < 3; i++) leg(-.3 + i * .35, -1, i, M.BODY3, 2);
  // jaws grow with level; a legend's glow
  const jl = [.3, .55, .8][level] * (has("horn") ? 1.3 : 1), jm = has("horn") ? M.MAGIC : M.BODY2, hc = [.62, -.5];
  const jaw = (dy, m, g) => {
    const b = add(hc, [.12, dy]), e = add(b, [jl * .9, -jl * .45]), t = add(b, [jl * 1.05, -jl * .2]);
    P.limb([[...b, .1], [...add(b, [jl * .45, -jl * .4]), .085], [...e, .06], [...t, .02]], m, { group: g, line: true, extra: true, capEnd: .5 });
    P.limb([[...add(b, [jl * .5, -jl * .4]), .05], [...add(b, [jl * .62, -jl * .18]), .015]], m, { group: g, line: true, extra: true });
  };
  jaw(-.02, has("horn") ? M.MAGIC : M.BODY3, 3);
  P.shape([[-.8, -.25], [-.78, -.6], [-.35, -.85], [.12, -.8], [.3, -.58], [.25, -.28], [-.3, -.18]], M.BODY, { group: 1, line: true }); // wing cases
  P.mark([[-.65, -.65], [-.3, -.8], [.05, -.76], [-.2, -.68]], M.BELLY, [M.BODY]); // gloss
  P.shape([[.22, -.68], [.48, -.7], [.58, -.5], [.5, -.3], [.24, -.3]], M.BODY, { group: 4, line: true }); // pronotum
  P.shape([[.5, -.62], [.72, -.6], [.78, -.45], [.68, -.36], [.5, -.4]], M.BODY2, { group: 5, line: true }); // head
  jaw(.04, jm, 6);
  P.limb([[.7, -.6, .025], [.78, -.75, .02], [.9, -.72, .02]], M.BODY3, { group: 9, extra: true }); // antenna, elbowed
  for (let i = 0; i < 3; i++) leg(-.2 + i * .35, 1, i, M.BODY2, 7);
  P.fn(({ sp, T, s }) => { // the seam down the wing cases, and an eye
    const [x0, y0] = T([-.78, -.42]), [x1, y1] = T([.28, -.5]);
    if (s > 25) for (let x = x0 + 2; x < x1 - 2; x++) sp.recolour(x, Math.round(y0 + (y1 - y0) * (x - x0) / (x1 - x0)) - Math.round(Math.sin((x - x0) / (x1 - x0) * Math.PI) * s * .12), M.LINE);
    const [ex, ey] = T([.66, -.52]); sp.px(ex, ey, legend ? M.MAGIC2 : M.GLINT);
  });
  if (has("crystals")) crystals(P, t => [-.7 + t * .9, -.82 + Math.pow(t - .5, 2) * .8], frame);
  const sp = P.draw(levelHeight(level, st) * .4, st.round, 1, sideWarp);
  if (legend) sparkle(sp, S.id);
  return sp;
}

// The slight three-quarter turn the small side-on creatures share: the front nearer, the rear
// further away (smaller, higher).
const sideWarp = ([x, y]) => { const t = Math.max(-1.2, Math.min(.75, x)), k = 1 + .1 * t; return [x, y * k - .08 * Math.max(0, -t), k]; };

// Snail: a soft foot along the ground, a spiral shell on its back, eyes on stalks.
function snail(S, level, frame, st) {
  const legend = level === 2, young = level === 1, has = f => legend && S.legend.includes(f), P = new Plan();
  const st2 = frame ? .04 : 0; // the foot stretches as it glides
  P.shape([[-.85, -.02], [-.75, -.16], [.3, -.2], [.62 + st2, -.32], [.82 + st2, -.32], [.9 + st2, -.15], [.8 + st2, 0], [-.85, 0]], M.SKIN, { group: 1, line: true });
  for (const [dx, m, g] of [[.08, M.BODY2, 2], [0, M.SKIN, 5]]) P.limb([[.72 + st2 + dx, -.3, .06], [.8 + st2 + dx, -.55, .04], [.84 + st2 + dx, -.62, .05]], m, { group: g, line: true });
  const shell = has("glowShell") ? M.MAGIC : M.BODY, c = [-.15, -.55], R = young ? .45 : .5;
  P.shape([add(c, [0, -R]), add(c, [R * .95, -R * .2]), add(c, [R * .7, R * .75]), add(c, [-R * .3, R * .9]), add(c, [-R, R * .3]), add(c, [-R * .85, -R * .55])], shell, { group: 3, line: true });
  P.fn(({ sp, T, s }) => { // the spiral, wound in from the rim
    const lines = has("glowShell") ? M.MAGIC2 : M.BODY3;
    for (let t = 0; t < 1; t += .004) { const a = t * Math.PI * 5.2, r = R * .85 * (1 - t), [x, y] = T(add(c, [Math.cos(a) * r, Math.sin(a) * r * .95])); const m = sp.get(x, y); if (m === shell || m === M.BODY2) sp.recolour(x, y, lines); }
    const [ex, ey] = T([.85 + st2, -.64]); sp.px(ex, ey, legend ? M.MAGIC2 : M.EYE);
    const [fx, fy] = T([.93 + st2, -.62]); sp.px(fx, fy, legend ? M.MAGIC2 : M.EYE);
  });
  const sp = P.draw(levelHeight(level, st) * .4, st.round, 1, sideWarp);
  if (legend) sparkle(sp, S.id);
  return sp;
}

// Woodlouse: a domed back of overlapping plates, a fringe of small legs, two antennae.
function woodlouse(S, level, frame, st) {
  const legend = level === 2, has = f => legend && S.legend.includes(f), P = new Plan();
  for (let i = 0; i < 7; i++) { const x = -.6 + i * .2, ph = (i + frame) % 2 ? .04 : -.04; P.limb([[x, -.12, .05], [x + ph + .04, 0, .03]], M.BODY3, { group: 2 }); }
  P.limb([[.75, -.3, .03], [.95, -.55, .02], [1.05, -.5, .02]], M.BODY3, { group: 2, extra: true });
  P.shape([[-.85, -.1], [-.7, -.6], [-.1, -.85], [.5, -.72], [.82, -.4], [.82, -.12], [-.8, -.06]], M.BODY, { group: 1, line: true });
  P.fn(({ sp, T, s }) => { // the plates
    for (let i = 1; i < 8; i++) { const x0 = -.85 + i * .21; for (let y = T([0, -.9])[1]; y < T([0, -.08])[1]; y++) { const [x] = T([x0 + (y - T([0, -.5])[1]) * .002, 0]); if (sp.get(x, y) === M.BODY) sp.recolour(x, y, s > 25 ? M.LINE : M.BODY2); } }
    const [ex, ey] = T([.72, -.38]); sp.px(ex, ey, legend ? M.MAGIC2 : M.EYE);
  });
  P.mark([[-.6, -.62], [0, -.86], [.4, -.72], [0, -.65]], M.BELLY, [M.BODY]);
  if (has("crystals")) crystals(P, t => [-.65 + t * 1.2, -.82 + Math.pow(t - .45, 2) * 1.2], frame);
  const sp = P.draw(levelHeight(level, st) * .3, st.round, 1, sideWarp);
  if (legend) sparkle(sp, S.id);
  return sp;
}

// Snake: coils along the ground, the front raised, a forked tongue; diamonds down its back.
function snake(S, level, frame, st) {
  const legend = level === 2, young = level === 1, has = f => legend && S.legend.includes(f), P = new Plan();
  if (has("wings")) wings(P, [-.05, -.55], legend, frame, -1);
  const ph = frame ? .6 : 0, spine = [];
  for (let i = 0; i <= 14; i++) { const t = i / 14, x = -1.1 + t * 1.6, y = -.08 - Math.sin(t * Math.PI * 2.2 + ph) * .05 * (1 - t); spine.push([x, y, .16 * (.35 + .65 * Math.sin(Math.min(1, t * 1.6) * Math.PI / 2))]); }
  spine.push([.6, -.25, .15], [.62, -.5, .14], [.7, -.68, .13]); // the raised neck
  P.limb(spine, M.BODY, { group: 1, line: true, cap: .5 });
  P.fn(({ sp, T, s }) => { // diamonds down the back
    for (let i = 1; i < spine.length - 1; i++) { const [x, y] = T(spine[i]); const r = Math.max(1, Math.round(s * .025)); for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) if (Math.abs(dx) + Math.abs(dy) <= r && sp.get(x + dx, y + dy - r) === M.BODY) sp.recolour(x + dx, y + dy - r, M.BODY3); }
  });
  P.mark([[-1, -.02], [.6, -.02], [.66, -.45], [.62, -.45], [.5, -.06], [-1, -.06]], M.BELLY, [M.BODY]);
  const hc = [.82, -.74], hr = young ? .15 : .12;
  P.shape([add(hc, [-hr * 1.1, -hr * .4]), add(hc, [hr * .3, -hr * .75]), add(hc, [hr * 1.5, -hr * .2]), add(hc, [hr * 1.4, hr * .3]), add(hc, [-hr * .3, hr * .7]), add(hc, [-hr, hr * .5])], M.BODY, { group: 1 });
  P.fn(({ sp, T, s }) => {
    const ep = Math.max(2, Math.round(s * hr * .45 * st.eye)), [x, y] = T(add(hc, [hr * .45, -hr * .3])); eye(sp, x, y, ep, { glow: legend });
    const [fx, fy] = T(add(hc, [hr * 1.05, -hr * .38])); sp.px(fx, fy, legend ? M.MAGIC2 : M.EYE);
    if (frame === 0) { const [tx, ty] = T(add(hc, [hr * 1.5, hr * .15])); for (let i = 0; i < Math.max(2, Math.round(s * .06)); i++) sp.px(tx + i, ty, M.SKIN); sp.px(tx + Math.max(2, Math.round(s * .06)), ty - 1, M.SKIN); sp.px(tx + Math.max(2, Math.round(s * .06)), ty + 1, M.SKIN); }
  });
  if (has("wings")) wings(P, [-.1, -.45], legend, frame, 1);
  const sp = P.draw(levelHeight(level, st) * .45, st.round, 1, sideWarp);
  if (legend) sparkle(sp, S.id);
  return sp;
}

// Moth: on the wing, facing us: two pairs of patterned wings with eyespots, a furry body,
// feathered antennae.
function moth(S, level, frame, st) {
  const legend = level === 2, young = level === 1, has = f => legend && S.legend.includes(f), P = new Plan();
  const span = has("wingsBig") ? 1.45 : young ? .85 : 1, up = frame === 0, hov = -.25, wm = has("wingsBig") ? M.MAGIC : M.BODY;
  for (const sd of [-1, 1]) {
    const X = (x, y) => [sd * x * span, (up ? y : y * .7 + .12) + hov];
    const fore = [X(.08, -.62), X(.55, -1.0), X(1.0, -.92), X(.95, -.6), X(.5, -.45), X(.1, -.48)];
    const hind = [X(.08, -.45), X(.45, -.42), X(.7, -.22), X(.5, -.05), X(.2, -.1), X(.06, -.3)];
    P.shape(sd < 0 ? hind.slice().reverse() : hind, has("wingsBig") ? M.MAGIC2 : M.BODY2, { group: 10, line: true, extra: true });
    P.shape(sd < 0 ? fore.slice().reverse() : fore, wm, { group: 11, line: true, extra: true });
    P.mark([X(.5, -.82), X(.75, -.82), X(.75, -.65), X(.5, -.65)].map((p, i) => p), M.BELLY, [wm]); // eyespot
    P.fn(({ sp, T }) => { const [x, y] = T(X(.62, -.74)); sp.recolour(x, y, M.BODY3); sp.recolour(x + 1, y, M.BODY3); });
  }
  P.shape(tufts([[0, -.78 + hov], [.1, -.6 + hov], [.08, -.2 + hov], [0, -.1 + hov], [-.08, -.2 + hov], [-.1, -.6 + hov]], 0, 6, 2, .025, 1), M.BELLY, { group: 1, line: true });
  for (const sd of [-1, 1]) P.limb([[sd * .03, -.8 + hov, .04], [sd * .14, -1.0 + hov, .07], [sd * .2, -1.08 + hov, .03]], M.BODY2, { group: 2, line: true });
  P.fn(({ sp, T, s }) => { for (const sd of [-1, 1]) { const [x, y] = T([sd * .05, -.74 + hov]); sp.px(x, y, legend ? M.MAGIC2 : M.EYE); } });
  const sp = P.draw(levelHeight(level, st) * .4, st.round, 1, null, false); // it flies: no ground
  if (legend) sparkle(sp, S.id);
  return sp;
}

// Glow-worm: a segmented larva whose tail end glows; a legend carries a great lantern.
function glowworm(S, level, frame, st) {
  const legend = level === 2, has = f => legend && S.legend.includes(f), P = new Plan(), ph = frame ? .05 : 0;
  const spine = []; for (let i = 0; i <= 8; i++) { const t = i / 8; spine.push([-.9 + t * 1.6, -.2 - Math.sin(t * Math.PI) * (.1 + ph), .32 - t * .08]); }
  P.limb(spine, M.BODY, { group: 1, line: true });
  for (let i = 0; i < 6; i++) { const x = -.3 + i * .16; P.limb([[x, -.1, .04], [x + (i % 2 ? .03 : -.03) * (frame ? -1 : 1), 0, .03]], M.BODY3, { group: 2 }); }
  P.fn(({ sp, T, s }) => {
    for (let i = 1; i < 8; i++) { const [x] = T(spine[i]); for (let y = 0; y < sp.h; y++) if (sp.get(x, y) === M.BODY) sp.recolour(x, y, M.BODY2); }
    const L = has("lantern") ? 1.7 : 1, [cx, cy] = T([-.8, -.2]), r = Math.round(s * .17 * L);
    for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) { const q = Math.hypot(dx, dy) / r; if (q > 1) continue; if (sp.get(cx + dx, cy + dy) || L > 1) sp.px(cx + dx, cy + dy, q < .55 ? M.MAGIC2 : M.MAGIC, dx / (r + 1), dy / (r + 1), .8); }
    const [ex, ey] = T([.66, -.28]); sp.px(ex, ey, legend ? M.MAGIC2 : M.EYE);
  });
  const sp = P.draw(levelHeight(level, st) * .3, st.round, 1, sideWarp);
  if (legend) sparkle(sp, S.id);
  return sp;
}

// Spider: a round abdomen marked with a cross, a smaller front, eight jointed legs, a
// cluster of eyes.
function spider(S, level, frame, st) {
  const legend = level === 2, has = f => legend && S.legend.includes(f), P = new Plan();
  const leg = (i, near) => {
    const x = .1 + i * .1, side = i < 2 ? 1 : -1, ph = (i + (near ? 0 : 1) + frame) % 2 ? .07 : -.07, off = near ? [0, 0] : [.06, -.1];
    const knee = [x + side * .25 + ph, -.75], foot = [x + side * .55 + ph * 1.5, 0];
    P.limb([[x, -.42, .07], knee, foot].map((p, k) => [p[0] + off[0], p[1] + off[1], k === 0 ? .07 : k === 1 ? .06 : .03]), near ? M.BODY2 : M.BODY3, { group: near ? 7 : 2, line: near });
  };
  for (let i = 0; i < 4; i++) leg(i, false);
  P.shape([[-.95, -.5], [-.7, -.95], [-.15, -1.0], [.12, -.6], [-.1, -.25], [-.6, -.2]], M.BODY, { group: 1, line: true }); // abdomen
  P.mark([[-.55, -.88], [-.45, -.88], [-.45, -.3], [-.55, -.3]], M.BELLY, [M.BODY]);
  P.mark([[-.85, -.62], [-.15, -.66], [-.15, -.56], [-.85, -.52]], M.BELLY, [M.BODY]);
  P.shape([[.05, -.55], [.3, -.7], [.55, -.6], [.6, -.4], [.3, -.3], [.05, -.38]], M.BODY2, { group: 3, line: true }); // front
  for (let i = 0; i < 4; i++) leg(i, true);
  P.fn(({ sp, T, s }) => {
    const ring = has("eyesRing"), pts = [[.48, -.6], [.53, -.55], [.43, -.57], [.5, -.5]];
    for (const p of pts) { const [x, y] = T(p); sp.px(x, y, ring ? M.MAGIC2 : M.EYE); if (s > 40) sp.px(x + 1, y, ring ? M.MAGIC : M.EYE); }
    if (!ring) { const [x, y] = T(pts[0]); sp.px(x, y, M.GLINT); }
  });
  if (has("eyesRing")) P.fn(({ sp, T, s }) => { const ep = Math.max(3, Math.round(s * .1)); for (let i = 0; i < 5; i++) { const a = Math.PI * (1.15 + i * .17), [x, y] = T([-.4 + Math.cos(a) * .7, -.6 + Math.sin(a) * .6]); owlEye(sp, x, y, ep, true, true); } });
  const sp = P.draw(levelHeight(level, st) * .4, st.round, 1, sideWarp);
  if (legend) sparkle(sp, S.id);
  return sp;
}

// Curled horns (ram): a thick spiral winding back and down beside the head.
function hornCurl(P, c, hr, k, mat, o) {
  const s = [];
  for (let t = 0; t <= 1.001; t += 1 / 10) { const a = -Math.PI / 2 + .5 - t * Math.PI * 1.75, r = hr * .7 * k * (1 - .5 * t); s.push([c[0] + Math.cos(a) * r - hr * .1, c[1] + Math.sin(a) * r * .95, hr * .4 * k * (1 - .65 * t)]); }
  P.limb(s, mat, { ...o, capEnd: .5 });
  P.fn(({ sp, T, s: sc }) => { if (sc * hr < 8) return; for (let i = 1; i < s.length - 1; i++) { const [x, y] = T(s[i]); if (sp.get(x, y) === mat) sp.recolour(x, y, M.LINE); } });
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
  // three-quarter view: the face is turned to our right, so the far (left) side of it narrows
  const fo = hr * .22, fk = sd => sd < 0 ? .68 : 1.08;
  for (const sd of [-1, 1]) P.mark([[fo + sd * hr * .05, hy - hr * .55], [fo + sd * hr * .7 * fk(sd), hy - hr * .62], [fo + sd * hr * .98 * fk(sd), hy - hr * .05], [fo + sd * hr * .68 * fk(sd), hy + hr * .5], [fo + sd * hr * .05, hy + hr * .4]], M.BELLY, [M.BODY]);
  P.fn(({ sp, T, s }) => {
    const ep = Math.max(2, Math.round(hr * s * (young ? .55 : .45) * st.eye));
    for (const sd of [-1, 1]) {
      const [x, y] = T([fo + sd * hr * .45 * fk(sd), hy - hr * .18]), d = Math.max(2, Math.round(ep * (sd < 0 ? .8 : 1)));
      owlEye(sp, x, y, d, legend);
    }
    // beak: hooked, between the eyes
    const [bx, by] = T([fo + hr * .05, hy + hr * .05]), bl = Math.max(2, Math.round(hr * s * .32)), bwid = Math.max(1, Math.round(bl * .4));
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
