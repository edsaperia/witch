// Witch sleeping legends (Ed, 2026-10-04): every area has a legend of its species asleep in it,
// "ancient creatures, half sunken into the ground, they could almost be mistaken for scenery.
// They have been sleeping for centuries." Each species' legend is drawn three ways, from its own
// 3D model (creatures3d.js) at the legend's scale:
//   asleep (2 frames, a slow breath): sunk to its flanks in a mound of its area's earth, head
//     down, eyes shut, its glow gone to stone and wood, mossed, lichened and grown over (ferns,
//     grass, mushrooms, roots, a sapling or a nest), in its area's colours: a boulder, a log or a
//     mound until you know;
//   waking (4 frames): it heaves up out of the ground, soil and clods falling, roots snapping,
//     the moss shedding, and opens its eyes red and angry;
//   awake (2 frames): the legend, woken, weathered, with the last of the moss and roots on it.
// legendForm(id, st, { state, frame, facing }) -> { sp, colours }; legendSprites bakes the lot.
import { M, rng, uni, vnoise, hsv2rgb, bake, defaultCanvas, Sprite } from "./core.js";
import { render, v3, spotty } from "./model3d.js";
import { withForm } from "./creatures3d.js";
import { SPECIES_BY_ID, speciesColours, buildCreature } from "./creatures.js";
import { AREAS } from "./areas.js";
import { decorColours, rockTint } from "./decor.js";

export const LEGEND_STATES = ["asleep", "waking", "awake"];
export const LEGEND_FRAMES = { asleep: 2, waking: 4, awake: 2 };
const LG_WAKE = [.22, .5, .78, .97]; // how far up out of the ground each waking frame is

// How each species sleeps. ground: the ground line in model units (y up from its feet; for the
// four-legged, a share of the way up from its belly to its back, `sink`). droop: how far its head
// comes down to rest on the ground. drop: groups not drawn while it sleeps (spirit wings, manes,
// ribbons: its magic is gone into it). lid: the closed eye's colour. wood: groups whose glow turns
// to old wood (antlers and horns, like dead branches). over: what has grown over it, by count:
// moss and lichen (shares of its surface), ferns, grass, mushrooms (brackets: on its flanks),
// roots, stones, a sapling ("broad" or "pine"), a nest, moss hanging from its antlers. eyes: the groups its
// glowing legend eyes are in (1 unless given).
// Batch 1 (the bug hunter's first slice): bat, marten, elk, stoat, owl, snail.
export const LEGEND_POSES = {
  bat: { ground: .3, droop: 0, drop: [0, 10, 11], cloak: true, over: { moss: .3, lichen: .14, ferns: 1, grass: 2, mushrooms: 2, roots: 2, stones: 4 } },
  marten: { sink: .45, droop: 1, drop: [60, 61], over: { moss: .45, lichen: .05, ferns: 3, grass: 3, mushrooms: 3, roots: 3, stones: 1, sapling: "pine" } },
  elk: { sink: .42, droop: .9, drop: [89], wood: [11, 12], over: { moss: .6, lichen: .04, ferns: 3, grass: 6, mushrooms: 2, roots: 3, stones: 2, beard: 5 } },
  stoat: { sink: .4, droop: 1, drop: [60, 61, 90, 91, 92], over: { moss: .3, lichen: .16, ferns: 1, grass: 3, mushrooms: 0, roots: 2, stones: 5 } },
  owl: { ground: .58, droop: 0, drop: [40, 50, 95, 96, 97, 98, 99, 100, 101], lid: M.BELLY, over: { moss: .4, lichen: .06, ferns: 2, grass: 2, mushrooms: 3, brackets: 4, roots: 2, stones: 0, nest: true } },
  snail: { ground: .2, droop: 1, drop: [5], eyes: [5], over: { moss: .4, lichen: .08, ferns: 3, grass: 3, mushrooms: 4, roots: 1, stones: 1 } },
};
export const LEGEND_IDS = Object.keys(LEGEND_POSES);
const legendArea = id => AREAS.find(a => a.creature === id) || AREAS[0];

// ---- the overgrowth's parts (all `extra`, so they don't count in its height) ----
let lgGroup = 200; // each piece its own group: drawn with an outline where it crosses the body
const lgNext = () => lgGroup++;
// a fern frond: s across, t from the base (-1) to the tip (1); leaflets in pairs, a pale rib
const lgFern = (mat, mat2) => (s, t) => {
  const u = (t + 1) / 2, half = .95 * Math.sin(Math.PI * Math.min(1, .08 + u * .95)) * (1 - .5 * u);
  if (Math.abs(s) > half || u > .98) return null;
  if (Math.abs(s) < .1) return mat2;
  const leaf = (u * 11 + Math.abs(s) * 1.6) % 1;
  return leaf < .62 ? (Math.abs(s) > half * .55 ? mat2 : mat) : null;
};
function lgAddFern(m, p, size, r) {
  const n = 4 + Math.floor(r() * 3), a0 = r() * 6.28;
  for (let i = 0; i < n; i++) {
    const a = a0 + i / n * 6.28, out = [Math.cos(a), 0, Math.sin(a)], up = v3.norm(v3.add(v3.mul(out, .9), [0, 1.1 + r() * .4, 0])), across = v3.norm(v3.cross(up, out));
    m.flat(v3.add(p, v3.mul(up, size * .5)), across, up, size * .22, size * .5, lgFern(i % 2 ? M.LEAF : M.LEAF2, M.LEAF2), { group: lgNext(), extra: true, bend: .5 });
  }
}
function lgAddGrass(m, p, size, r) {
  const g = lgNext();
  for (let i = 0; i < 5; i++) { const a = r() * 6.28, h = size * uni(r, .6, 1), lean = uni(r, .1, .35); m.seg(p, v3.add(p, [Math.cos(a) * h * lean, h, Math.sin(a) * h * lean]), size * .05, size * .015, i % 3 ? M.LEAF2 : M.STRAW, { group: g, extra: true }); }
}
function lgAddMushrooms(m, p, size, r) {
  const g = lgNext();
  for (let i = 0; i < 2 + Math.floor(r() * 2); i++) {
    const q = v3.add(p, [uni(r, -1, 1) * size * .5, 0, uni(r, -1, 1) * size * .5]), h = size * uni(r, .35, .7), cr = size * uni(r, .2, .32);
    m.seg(v3.add(q, [0, -size * .1, 0]), v3.add(q, [0, h, 0]), cr * .3, cr * .25, M.CLOTH, { group: g, extra: true });
    m.ell(v3.add(q, [0, h, 0]), [cr, cr * .5, cr], M.FLOWER, { group: g, extra: true, paint: p2 => spotty(p2, 60, .12) ? M.CLOTH : undefined });
  }
}
function lgAddBracket(m, p, out, size, r) { // shelf fungi on a flank
  const g = lgNext();
  for (let i = 0; i < 3; i++) { const q = v3.add(p, [0, -i * size * .35, 0]), w = size * (1 - i * .25); m.ell(v3.add(q, v3.mul(out, w * .3)), [w * .55, w * .14, w * .45], i % 2 ? M.CLOTH : M.FLOWER, { group: g, extra: true }); }
}
function lgAddRoot(m, p, out, G, size, r) { // a root over its flank and into the ground
  const g = lgNext(), down = Math.max(.05, p[1] - G);
  const mid = v3.add(p, v3.add(v3.mul(out, size * .45), [0, -down * .45, 0])), end = v3.add(p, v3.add(v3.mul(out, size * 1.1), [0, -down - size * .3, 0]));
  m.chain([[...p, size * .09], [...mid, size * .08], [...end, size * .06]], r() < .5 ? M.TRUNK : M.BARKD, { group: g, extra: true });
}
function lgAddStone(m, p, size, r) { m.ell(p, [size * uni(r, .8, 1.2), size * uni(r, .5, .8), size * uni(r, .7, 1)], M.STONE, { group: lgNext(), extra: true, rough: size * .08, dir: [Math.cos(r() * 6), uni(r, -.2, .2), Math.sin(r() * 6)], up: [0, 1, 0], paint: p2 => spotty(p2, 16, .25) ? M.MOSS : spotty(p2, 30, .1) ? M.STONED : undefined }); }
function lgAddSapling(m, p, size, kind, r) {
  const g = lgNext(), h = size, top = v3.add(p, [uni(r, -.1, .1) * h, h, uni(r, -.1, .1) * h]);
  m.seg(v3.add(p, [0, -h * .1, 0]), top, h * .045, h * .02, M.TRUNK, { group: g, extra: true });
  if (kind === "pine") for (let i = 0; i < 4; i++) { const y = .35 + i * .19, w = h * (.3 - i * .06); m.ell(v3.lerp(p, top, y), [w, h * .1, w], i % 2 ? M.LEAF3 : M.LEAF, { group: g + 1000, extra: true, rough: h * .02 }); }
  else for (let i = 0; i < 3; i++) m.ell(v3.add(top, [Math.cos(i * 2.1) * h * .14, -h * .08 + i * h * .07, Math.sin(i * 2.1) * h * .14]), [h * .2, h * .16, h * .2], [M.LEAF, M.LEAF2, M.LEAF3][i], { group: g + 1000, extra: true, rough: h * .03 });
}
function lgAddNest(m, c, rad, size, r) {
  const g = lgNext();
  for (let i = 0; i < 18; i++) { const a = i / 18 * 6.28, b = a + uni(r, .5, .9), y = c[1] + uni(r, -.3, .3) * size, rr = rad * uni(r, .9, 1.1); m.seg([c[0] + Math.cos(a) * rr, y, c[2] + Math.sin(a) * rr], [c[0] + Math.cos(b) * rr, y + uni(r, -.3, .3) * size, c[2] + Math.sin(b) * rr], size * .35, size * .3, i % 3 ? M.TRUNK : i % 2 ? M.STRAW : M.BARKD, { group: g, extra: true }); }
}

// The highest point of the body over (x, z) above the ground line, or null.
function lgSurface(m, x, z, y0, G) { for (let y = y0; y > G; y -= .015) if (m.field([x, y, z]) < 0) return y; return null; }

// The body's bounds (its solid parts).
function lgBounds(m) {
  const b = { x0: Infinity, x1: -Infinity, y0: Infinity, y1: -Infinity, z0: Infinity, z1: -Infinity };
  for (const q of m.parts) {
    if (q.extra || q.cut) continue;
    const pts = q.type === "cone" ? [[q.a, q.r1], [q.b, q.r2]] : [[q.c, Math.max(...(q.r || q.h))]];
    for (const [c, rr] of pts) { b.x0 = Math.min(b.x0, c[0] - rr); b.x1 = Math.max(b.x1, c[0] + rr); b.y0 = Math.min(b.y0, c[1] - rr); b.y1 = Math.max(b.y1, c[1] + rr); b.z0 = Math.min(b.z0, c[2] - rr); b.z1 = Math.max(b.z1, c[2] + rr); }
  }
  return b;
}

// Moves every part by f(point, part) (each centre or end on its own).
function lgMove(m, f) {
  for (const q of m.parts) { if (q.type === "cone") { q.a = f(q.a, q); q.b = f(q.b, q); } else q.c = f(q.c, q); }
  for (const fl of m.flats) fl.c = f(fl.c, fl);
}

// The form: redraws the finished model of species S's legend, `wake` 0 (asleep) to 1 (awake).
function lgForm(S, { wake, breath, frame, facing }) {
  const pose = LEGEND_POSES[S.id], over = pose.over, open = wake >= .7;
  const form = (m, o) => {
    const s = render(m, { ...o, measure: true }).s; // the awake legend's scale: every form of it shares it
    const r = rng(S.id.length * 977 + 31), rf = rng(S.id.length * 131 + frame * 17 + Math.round(wake * 100));
    lgGroup = 200;
    // the ground line it sleeps sunk to
    const b0 = lgBounds(m), torso = m.parts[0], belly = pose.ground ?? torso.c[1] - torso.r[1]; // the four-legged: their torso first
    const G = (pose.ground ?? belly + (1 - belly) * pose.sink) * (1 - wake);
    // what it has given up while it sleeps
    if (!open) { m.parts = m.parts.filter(q => !pose.drop.includes(q.group)); m.flats = m.flats.filter(f => !pose.drop.includes(f.group)); }
    // its colours: glow to stone (antlers to old wood), eyes shut (or woken red), moss over it
    const eyeMats = [M.EYE, M.IRIS, M.PUPIL, M.GLINT], lid = pose.lid ?? M.BODY;
    const remap = (mat, g) => {
      if (eyeMats.includes(mat) || (mat === M.MAGIC2 && (pose.eyes || [1]).includes(g))) return open ? M.WOKEN : mat === M.IRIS ? lid : M.BODY2; // shut: a lid
      if (open) return mat;
      if (mat === M.MAGIC || mat === M.MAGIC2) return pose.wood?.includes(g) ? (mat === M.MAGIC ? M.TRUNK : M.BARKL) : (mat === M.MAGIC ? M.STONE : M.STONED);
      return mat;
    };
    const moss = (over.moss || 0) * (1 - wake * .8), lichen = (over.lichen || 0) * (1 - wake * .7), top = b0.y1, seed = S.id.length * 7;
    const mossy = p => {
      if (p[1] < G + .035 && wake < .9) return M.BARK2; // earth smeared along the ground line
      const h = Math.max(0, Math.min(1, (p[1] - G) / Math.max(.1, top - G))), n = vnoise(p[0] * 5 + p[2] * 3.1, p[1] * 5 + p[2] * 2.3, seed);
      if (n < moss * (.35 + .9 * h)) return n < moss * (.35 + .9 * h) * .45 ? M.LEAF3 : M.MOSS;
      if (spotty(p, 26, lichen)) return M.WEB;
      if (wake > .05 && wake < .9 && spotty(p, 14, .14 * (1 - wake))) return M.BARK2; // clinging soil
      return undefined;
    };
    for (const q of m.parts) {
      const base = q.paint, g = q.group, body = (!q.extra || [70, 85, 86, 87].includes(g)) && g !== 0; // (not a flyer's shadow)
      q.mat = remap(q.mat, g);
      q.paint = p => { const mm = body ? mossy(p) : undefined; if (mm) return mm; const v = base?.(p); return v == null ? v : remap(v, g); };
    }
    for (const f of m.flats) { const mask = f.mask, g = f.group; f.mask = (u, v) => { const mm = mask(u, v); return mm ? remap(mm, g) : mm; }; }
    // head down to the ground; the whole a breath up or down
    const H = m.anchors.head?.c, droop = pose.droop * (1 - wake);
    if (H && droop > 0) {
      const nk = m.anchors.neck?.c || H, x0 = Math.min(H[0] - .05, H[0] - (H[0] - nk[0]) * 2.2), hr = m.anchors.head.r[1], dy = (G + hr * .55 - H[1]) * droop;
      if (dy < 0) lgMove(m, (p, q) => { const t = [11, 12, 13].includes(q.group) ? 1 : Math.max(0, Math.min(1, (p[0] - x0) / Math.max(.05, H[0] - x0))); return [p[0], p[1] + dy * t * t * (3 - 2 * t), p[2]]; });
    }
    if (breath) lgMove(m, p => [p[0], p[1] + breath, p[2]]);
    // the bat asleep wraps its wings round itself: a hunched, cloaked stone with two ears
    if (pose.cloak && !open) { const c = [-.05, .38, 0]; m.ell(c, [.42, .46, .38], M.BODY2, { group: 1, paint: p => { const mm = mossy(p); if (mm) return mm; return Math.abs(Math.sin(Math.atan2(p[2], p[0] - c[0]) * 5)) > .85 ? M.BODY3 : undefined; } }); }
    // what has grown over it, on its back and round it (less of it the further it's up)
    const b = lgBounds(m), keep = 1 - wake, cx = (b.x0 + b.x1) / 2, rx = (b.x1 - b.x0) / 2, rz = (b.z1 - b.z0) / 2, unit = Math.max(.25, Math.min(rx, top - G + .2));
    const tops = [];
    for (let i = 0; i < 9; i++) for (let j = 0; j < 5; j++) { const x = b.x0 + (i + .5) / 9 * (b.x1 - b.x0), z = b.z0 + (j + .5) / 5 * (b.z1 - b.z0), y = lgSurface(m, x, z, b.y1 + .02, G); if (y != null && y > G + .04) tops.push([x, y, z]); }
    tops.sort((a, c) => c[1] - a[1]);
    const onBack = () => tops[Math.floor(r() * Math.min(tops.length, 12))], round = k => { if (wake >= .9) return onBack(); const a = (k * 2.39 + r() * .6) % 6.28; return [cx + Math.cos(a) * rx * uni(r, .8, .95), G + unit * .03, Math.sin(a) * rz * uni(r, .9, 1.1)]; }; // round its foot, on the mound
    const n = k => Math.round((k || 0) * (wake < .01 ? 1 : wake < .9 ? keep * 1.1 : .35));
    if (tops.length) {
      for (let i = 0; i < n(over.ferns); i++) lgAddFern(m, i % 2 ? onBack() : round(i), unit * uni(r, .35, .5), r);
      for (let i = 0; i < n(over.grass); i++) lgAddGrass(m, i % 3 ? onBack() : round(i + 3), unit * uni(r, .15, .25), r);
      for (let i = 0; i < n(over.mushrooms); i++) lgAddMushrooms(m, i % 2 ? round(i + 7) : onBack(), unit * .14, r);
      for (let i = 0; i < n(over.brackets); i++) { const t = tops[tops.length - 1 - Math.floor(r() * Math.min(tops.length, 8))], out = v3.norm([t[0] - cx, 0, t[2] || .3]); lgAddBracket(m, v3.add(t, v3.mul(out, .02)), out, unit * .16, r); }
      if (wake < .9) for (let i = 0; i < n(over.roots); i++) { const t = onBack(), out = v3.norm([t[0] - cx, 0, t[2] + (i % 2 ? .3 : -.3)]); lgAddRoot(m, t, out, G, unit * .5, r); }
      if (over.sapling && wake < .5) lgAddSapling(m, onBack(), unit * .75 * (1 - wake), over.sapling, r);
    }
    if (over.beard) for (const q of m.parts.filter(q => pose.wood?.includes(q.group) && q.type === "cone").slice(0, over.beard * 3).filter((_, i) => i % 3 === 2)) { if (r() > keep + .3) continue; const p = q.b; m.chain([[...p, .025], [...v3.add(p, [.01, -.12, .01]), .02], [...v3.add(p, [-.01, -.22 * (1 - wake * .5), 0]), .012]], M.MOSS, { group: lgNext(), extra: true }); }
    // the mound of earth it sleeps in, stones half buried round it; waking, it breaks and falls
    if (wake < .9) {
      const lift = wake * .6;
      m.ell([cx, G - unit * .3, 0], [rx * .95 + unit * .08, unit * (.42 - lift * .3), rz * 1.05 + unit * .08], M.BARK2, { group: 150, extra: true, rough: unit * .03, paint: p => { const k = vnoise(p[0] * 7, p[2] * 7, 3); return k < .3 + moss * .6 ? M.MOSS : k > .88 ? M.STONED : undefined; } }); // a lip of its earth, grown over
      for (let i = 0; i < Math.round((over.stones || 0) * (1 - wake * .5)); i++) lgAddStone(m, v3.add(round(i * 3 + 1), [0, unit * .02, 0]), unit * uni(r, .1, .2), r);
      if (over.nest) lgAddNest(m, [cx, G + unit * .08, 0], Math.max(rx, rz) * 1.05, unit * .08, r);
    }
    if (wake > .05 && wake < .99) { // clods and crumbs falling off it, roots snapping
      for (let i = 0; i < 16; i++) { const t = tops.length ? tops[Math.floor(rf() * tops.length)] : [cx, top, 0], out = v3.norm([t[0] - cx + uni(rf, -.2, .2), 0, (t[2] || 0) + uni(rf, -.4, .4)]), fall = uni(rf, 0, 1) * (t[1] - G);
        const p = v3.add(t, v3.add(v3.mul(out, unit * uni(rf, .15, .45)), [0, -fall, 0])), k = unit * uni(rf, .03, .07);
        m.ell(p, [k, k * .8, k], rf() < .3 ? M.MOSS : M.BARK2, { group: lgNext(), extra: true, rough: k * .2 }); }
      for (let i = 0; i < 3; i++) { const t = tops.length ? tops[tops.length - 1 - Math.floor(rf() * Math.min(8, tops.length))] : [cx, top, 0], out = v3.norm([t[0] - cx, 0, (t[2] || 0) + .2]); m.chain([[...t, unit * .04], [...v3.add(t, v3.add(v3.mul(out, unit * .12), [0, -unit * .2, 0])), unit * .03], [...v3.add(t, v3.add(v3.mul(out, unit * .1), [0, -unit * .45 * (1 - wake), 0])), unit * .015]], M.TRUNK, { group: lgNext(), extra: true }); }
    }
    if (wake >= .99) for (let i = 0; i < 4; i++) { const t = tops.length ? tops[Math.floor(r() * Math.min(10, tops.length))] : null; if (!t) break; m.chain([[...t, .02], [...v3.add(t, [.03, -.12, .04]), .015], [...v3.add(t, [0, -.22, .05]), .008]], i % 2 ? M.MOSS : M.TRUNK, { group: lgNext(), extra: true }); }
    if (G > 0) m.clipY = G;
    const res = render(m, { scale: s, facing: o.facing });
    res.sp.origin = res.project([cx, Math.max(0, G), 0]); // the ground under its middle, on the sprite
    res.sp.groundLine = G;
    return res.sp;
  };
  form.motes = open;
  return form;
}

// Cropped to what is drawn (what sank under the ground leaves empty room), its origin moved with it.
function lgCrop(sp) {
  let x0 = sp.w, x1 = -1, y0 = sp.h;
  for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); }
  if (x1 < 0) return sp;
  const W = x1 - x0 + 1, H = sp.h - y0, c = new Sprite(W, H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = (y + y0) * sp.w + x + x0, j = y * W + x; c.m[j] = sp.m[i]; c.g[j] = sp.g[i]; for (let k = 0; k < 3; k++) c.n[j * 3 + k] = sp.n[i * 3 + k]; }
  c.bodyH = sp.bodyH; c.groundLine = sp.groundLine;
  if (sp.origin) c.origin = [+(sp.origin[0] - x0).toFixed(1), +(sp.origin[1] - y0).toFixed(1)];
  return c;
}

// One form of a species' legend: { sp, colours } (sp.origin: the ground under its middle).
export function legendForm(id, st, { state = "asleep", frame = 0, facing = "towards" } = {}) {
  const S = SPECIES_BY_ID[id], pose = LEGEND_POSES[id];
  if (!S || !pose) throw new Error(`no sleeping legend for ${id}`);
  const wake = state === "asleep" ? 0 : state === "awake" ? 1 : LG_WAKE[frame % 4];
  const breath = state === "asleep" ? (frame % 2 ? .025 : 0) : 0;
  const sp = lgCrop(withForm(lgForm(S, { wake, breath, frame, facing }), () => buildCreature(S, 3, state === "awake" ? frame % 2 : 0, st, facing)));
  return { sp, colours: legendColours(id, st, wake) };
}

// Its colours, `wake` 0 (asleep: weathered to its area's stone and moss) to 1 (awake, woken).
export function legendColours(id, st, wake = 0) {
  const a = legendArea(id), [, fh, fs, fv] = a.floor, base = speciesColours(id, st, wake >= .7 ? { woken: true } : null), d = decorColours(st, rockTint(a));
  const mix = (x, y, t) => x.map((v, i) => Math.round(v + (y[i] - v) * t));
  const stoneT = .62 * (1 - wake) + .14 * wake, stone = d[M.STONE], dark = d[M.STONED];
  const c = { ...base };
  for (const [k, to] of [[M.BODY, stone], [M.BODY2, mix(stone, dark, .45)], [M.BODY3, dark], [M.BELLY, mix(stone, [220, 216, 200], .3)], [M.ACCENT, mix(stone, dark, .2)], [M.EAR, mix(stone, dark, .3)], [M.SKIN, mix(stone, [150, 120, 110], .3)], [M.NOSE, dark]]) if (c[k]) c[k] = mix(c[k], to, stoneT);
  const floor = hsv2rgb(fh, fs, fv);
  Object.assign(c, {
    [M.STONE]: d[M.STONE], [M.STONED]: d[M.STONED], [M.MOSS]: mix(d[M.MOSS], floor, .3), [M.LEAF]: mix(d[M.LEAF], floor, .2), [M.LEAF2]: mix(d[M.LEAF2], floor, .15), [M.LEAF3]: d[M.LEAF3],
    [M.TRUNK]: d[M.TRUNK], [M.BARKD]: d[M.BARKD], [M.BARKL]: d[M.BARKL], [M.STRAW]: d[M.STRAW], [M.CLOTH]: [222, 210, 186],
    [M.BARK2]: hsv2rgb(fh, Math.min(1, fs * .9), fv * .62), // the area's earth
    [M.WEB]: mix([196, 200, 150], floor, .2),               // lichen
    [M.FLOWER]: hsv2rgb(.04 + (id.length % 3) * .03, .55, .72), // mushroom caps
    [M.WOKEN]: [255, 40, 36],
  });
  return c;
}

// Every form of a species' legend, baked: { asleep: [canvas…], waking: […], awake: […] }, each
// canvas carrying origin (the ground under its middle, in its pixels).
export function legendSprites(id, st, { facing = "towards", makeCanvas = defaultCanvas } = {}) {
  const out = {};
  for (const state of LEGEND_STATES) out[state] = Array.from({ length: LEGEND_FRAMES[state] }, (_, frame) => { const { sp, colours } = legendForm(id, st, { state, frame, facing }), cv = bake(sp, colours, st, "none", makeCanvas); cv.origin = sp.origin; return cv; });
  return out;
}
