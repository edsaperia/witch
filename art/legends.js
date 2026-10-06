// Witch sleeping legends (Ed, 2026-10-04): every area has a legend of its species asleep in it,
// "ancient creatures, half sunken into the ground, they could almost be mistaken for scenery.
// They have been sleeping for centuries." Each species' legend is drawn asleep from its own 3D
// model (creatures3d.js) at the legend's scale, in 2 frames of a slow breath: sunk to its flanks
// in a mound of its area's earth, head down, eyes shut, its glow gone to stone and wood, mossed,
// lichened and grown over (ferns, grass, mushrooms, roots, a sapling or a nest), in its area's
// colours: a boulder, a log or a mound until you know. No waking sequence or awake redraw yet
// (Ed, 2026-10-04: "just the sleeping form"); awake it is the ordinary legend (critter level 3).
// legendForm(id, st, { frame, facing }) -> { sp, colours }; legendSprites bakes the lot.
import { M, rng, uni, vnoise, hsv2rgb, bake, defaultCanvas, Sprite } from "./core.js";
import { render, v3, spotty } from "./model3d.js";
import { withForm } from "./creatures3d.js";
import { SPECIES_BY_ID, speciesColours, buildCreature } from "./creatures.js";
import { AREAS } from "./areas.js";
import { decorColours, rockTint } from "./decor.js";

export const LEGEND_STATES = ["asleep"];
export const LEGEND_FRAMES = { asleep: 2 };

// How each species sleeps. ground: the ground line in model units (y up from its feet; for the
// four-legged, a share of the way up from its belly to its back, `sink`). droop: how far its head
// comes down to rest on the ground. drop: groups not drawn while it sleeps (spirit wings, manes,
// ribbons: its magic is gone into it). lid: the closed eye's colour. wood: groups whose glow turns
// to old wood (antlers and horns, like dead branches). over: what has grown over it, by count:
// moss and lichen (shares of its surface), ferns, grass, mushrooms (brackets: on its flanks),
// roots, stones, a sapling ("broad" or "pine"), a nest, moss hanging from its antlers, wildflowers. eyes: the groups its
// glowing legend eyes are in (1 unless given).
// Batch 1 (the bug hunter's first slice): bat, marten, elk, stoat, owl, snail. Batch 2: wolf, fox,
// badger, boar, stag, hare, bear. Batch 3: lynx, otter, beaver, ram, squirrel, dormouse, salamander.
// Batch 4: toad, raven, mole, hedgehog, woodlouse. Batch 5: snake, moth, glow-worm, spider, stag beetle.
export const LEGEND_POSES = {
  bat: { ground: .3, droop: 0, drop: [0, 10, 11], cloak: { c: [-.05, .38, 0], r: [.42, .46, .38] }, over: { moss: .3, lichen: .14, ferns: 1, grass: 2, mushrooms: 2, roots: 2, stones: 4 } },
  marten: { sink: .45, droop: 1, drop: [60, 61], over: { moss: .45, lichen: .05, ferns: 3, grass: 3, mushrooms: 3, roots: 3, stones: 1, sapling: "pine" } },
  elk: { sink: .42, droop: .9, drop: [89], wood: [11, 12], over: { moss: .6, lichen: .04, ferns: 3, grass: 6, mushrooms: 2, roots: 3, stones: 2, beard: 5 } },
  stoat: { sink: .4, droop: 1, drop: [60, 61, 90, 91, 92], over: { moss: .3, lichen: .16, ferns: 1, grass: 3, mushrooms: 0, roots: 2, stones: 5 } },
  owl: { ground: .58, droop: 0, drop: [40, 50, 95, 96, 97, 98, 99, 100, 101], lid: M.BELLY, over: { moss: .4, lichen: .06, ferns: 2, grass: 2, mushrooms: 3, brackets: 4, roots: 2, stones: 0, nest: true } },
  snail: { ground: .2, droop: 1, drop: [5], eyes: [5], over: { moss: .4, lichen: .08, ferns: 3, grass: 3, mushrooms: 4, roots: 1, stones: 1 } },
  wolf: { sink: .45, droop: 1, drop: [40, 50, 60, 61], over: { moss: .45, lichen: .06, ferns: 2, grass: 5, mushrooms: 2, roots: 3, stones: 2, sapling: "broad" } },
  fox: { sink: .42, droop: 1, drop: [70, 71], over: { moss: .35, lichen: .14, ferns: 1, grass: 3, mushrooms: 1, roots: 1, stones: 5 } },
  badger: { sink: .5, droop: 1, drop: [], over: { moss: .55, lichen: .1, ferns: 1, grass: 6, mushrooms: 0, roots: 1, stones: 3 } },
  boar: { sink: .45, droop: .8, drop: [], over: { moss: .4, lichen: .04, ferns: 6, grass: 2, mushrooms: 2, roots: 3, stones: 1 } },
  stag: { sink: .42, droop: .9, drop: [], wood: [11, 12], over: { moss: .55, lichen: .06, ferns: 2, grass: 3, mushrooms: 3, roots: 5, stones: 2, beard: 6 } },
  hare: { sink: .45, droop: 1, drop: [], over: { moss: .3, lichen: .04, ferns: 0, grass: 7, mushrooms: 1, roots: 1, stones: 1, flowers: 6 } },
  bear: { sink: .48, droop: .9, drop: [89], over: { moss: .55, lichen: .05, ferns: 3, grass: 3, mushrooms: 4, roots: 3, stones: 2 } },
  lynx: { sink: .45, droop: 1, drop: [60, 61], over: { moss: .3, lichen: .18, ferns: 0, grass: 3, mushrooms: 0, roots: 1, stones: 6 } },
  otter: { sink: .5, droop: 1, drop: [90, 91, 92], over: { moss: .5, lichen: .08, ferns: 2, grass: 5, mushrooms: 1, roots: 2, stones: 5 } },
  beaver: { sink: .5, droop: 1, drop: [89], over: { moss: .45, lichen: .04, ferns: 1, grass: 4, mushrooms: 2, roots: 4, stones: 0 } },
  ram: { sink: .42, droop: .9, drop: [], over: { moss: .35, lichen: .1, ferns: 1, grass: 4, mushrooms: 1, roots: 4, stones: 2, flowers: 0 } },
  squirrel: { sink: .45, droop: 1, drop: [], over: { moss: .3, lichen: .06, ferns: 0, grass: 3, mushrooms: 0, roots: 1, stones: 1, flowers: 6 } },
  dormouse: { sink: .45, droop: 1, drop: [], over: { moss: .4, lichen: .04, ferns: 1, grass: 3, mushrooms: 2, roots: 2, stones: 0, flowers: 5 } },
  newt: { sink: .6, droop: 1, drop: [60, 61], over: { moss: .3, lichen: .08, ferns: 1, grass: 3, mushrooms: 1, roots: 1, stones: 2 } }, // the fen's newt (an area recipe's): sunk in peat, sedge over it
  heron: { ground: .68, droop: .6, drop: [95, 96, 97, 98, 99, 100, 101], over: { moss: .35, lichen: .1, ferns: 1, grass: 4, mushrooms: 1, roots: 2, stones: 2, nest: true } }, // the heronry's heron (an area recipe's): folded down in the reeds, its neck laid along its back, a nest of sticks on it
  salamander: { sink: .55, droop: 1, drop: [60, 61], over: { moss: .35, lichen: .14, ferns: 2, grass: 1, mushrooms: 2, roots: 1, stones: 5 } },
  toad: { ground: .2, droop: .5, drop: [], over: { moss: .55, lichen: .06, ferns: 1, grass: 5, mushrooms: 2, roots: 1, stones: 3 } },
  raven: { ground: .42, droop: .6, drop: [40, 50, 95, 96, 97, 98, 99, 100], over: { moss: .35, lichen: .1, ferns: 1, grass: 2, mushrooms: 3, roots: 3, stones: 1, nest: true } },
  mole: { ground: .2, droop: .4, drop: [], over: { moss: .4, lichen: .04, ferns: 0, grass: 7, mushrooms: 1, roots: 2, stones: 1, flowers: 0 } },
  hedgehog: { ground: .18, droop: .5, drop: [], over: { moss: .45, lichen: .05, ferns: 1, grass: 4, mushrooms: 3, roots: 1, stones: 1 } },
  woodlouse: { ground: .09, droop: 0, drop: [9], over: { moss: .5, lichen: .1, ferns: 1, grass: 2, mushrooms: 4, roots: 2, stones: 0 } },
  snake: { ground: .04, droop: 1, drop: [40, 50], over: { moss: .45, lichen: .06, ferns: 2, grass: 6, mushrooms: 2, roots: 2, stones: 1 } },
  moth: { ground: .4, droop: 0, drop: [0, 10, 11, 12, 13], cloak: { c: [-.1, .42, 0], r: [.6, .3, .45] }, over: { moss: .35, lichen: .16, ferns: 0, grass: 4, mushrooms: 1, roots: 1, stones: 2, flowers: 4 } },
  glowworm: { ground: .14, droop: 0, drop: [], over: { moss: .45, lichen: .06, ferns: 2, grass: 3, mushrooms: 3, roots: 1, stones: 0, flowers: 5 } },
  spider: { ground: .3, droop: .5, drop: [95, 96, 97, 98, 99], over: { moss: .4, lichen: .1, ferns: 3, grass: 2, mushrooms: 3, roots: 2, stones: 1 } },
  beetle: { ground: .2, droop: .4, drop: [], wood: [8], over: { moss: .45, lichen: .08, ferns: 1, grass: 2, mushrooms: 4, brackets: 3, roots: 2, stones: 0 } },
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
function lgAddFlowers(m, p, size, r) { // a few wildflowers: a stem and a head
  const g = lgNext();
  for (let i = 0; i < 3; i++) { const q = v3.add(p, [uni(r, -1, 1) * size * .4, 0, uni(r, -1, 1) * size * .4]), h = size * uni(r, .6, 1); m.seg(q, v3.add(q, [0, h, 0]), size * .03, size * .02, M.LEAF2, { group: g, extra: true }); m.ell(v3.add(q, [0, h, 0]), [size * .09, size * .07, size * .09], M.FLOWER, { group: g, extra: true }); }
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

// The form: redraws the finished model of species S's legend, asleep (breath: how far up this breath lifts it).
function lgForm(S, { breath }) {
  const pose = LEGEND_POSES[S.id], over = pose.over;
  const form = (m, o) => {
    const s = render(m, { ...o, measure: true }).s; // the awake legend's scale
    const r = rng(S.id.length * 977 + 31);
    lgGroup = 200;
    // the ground line it sleeps sunk to
    const b0 = lgBounds(m), torso = m.parts[0], belly = pose.ground ?? torso.c[1] - torso.r[1]; // the four-legged: their torso first
    const G = pose.ground ?? belly + (1 - belly) * pose.sink;
    // what it has given up while it sleeps
    m.parts = m.parts.filter(q => !pose.drop.includes(q.group)); m.flats = m.flats.filter(f => !pose.drop.includes(f.group));
    // its colours: glow to stone (antlers to old wood), eyes shut, moss over it
    const eyeMats = [M.EYE, M.IRIS, M.PUPIL, M.GLINT], lid = pose.lid ?? M.BODY;
    const remap = (mat, g) => {
      if (eyeMats.includes(mat) || (mat === M.MAGIC2 && (pose.eyes || [1]).includes(g))) return mat === M.IRIS ? lid : M.BODY2; // shut: a lid
      if (mat === M.RUNE || mat === M.GLOW) return M.STONED; // its runes and glowing hollows go dark while it sleeps
      if (mat === M.MAGIC || mat === M.MAGIC2) return pose.wood?.includes(g) ? (mat === M.MAGIC ? M.TRUNK : M.BARKL) : (mat === M.MAGIC ? M.STONE : M.STONED);
      return mat;
    };
    const moss = over.moss || 0, lichen = over.lichen || 0, top = b0.y1, seed = S.id.length * 7;
    const mossy = p => {
      if (p[1] < G + .035) return M.BARK2; // earth smeared along the ground line
      const h = Math.max(0, Math.min(1, (p[1] - G) / Math.max(.1, top - G))), n = vnoise(p[0] * 5 + p[2] * 3.1, p[1] * 5 + p[2] * 2.3, seed);
      if (n < moss * (.35 + .9 * h)) return n < moss * (.35 + .9 * h) * .45 ? M.LEAF3 : M.MOSS;
      if (spotty(p, 26, lichen)) return M.WEB;
      return undefined;
    };
    for (const q of m.parts) {
      const base = q.paint, g = q.group, body = (!q.extra || [70, 85, 86, 87].includes(g)) && g !== 0; // (not a flyer's shadow)
      q.mat = remap(q.mat, g);
      q.paint = p => { const mm = body ? mossy(p) : undefined; if (mm) return mm; const v = base?.(p); return v == null ? v : remap(v, g); };
    }
    for (const f of m.flats) { const mask = f.mask, g = f.group; f.mask = (u, v) => { const mm = mask(u, v); return mm ? remap(mm, g) : mm; }; }
    // head down to the ground; the whole a breath up or down
    const H = m.anchors.head?.c;
    if (H && pose.droop > 0) {
      const nk = m.anchors.neck?.c || H, x0 = Math.min(H[0] - .05, H[0] - (H[0] - nk[0]) * 2.2), hr = m.anchors.head.r[1], dy = (G + hr * .55 - H[1]) * pose.droop;
      if (dy < 0) lgMove(m, (p, q) => { const t = [11, 12, 13].includes(q.group) ? 1 : Math.max(0, Math.min(1, (p[0] - x0) / Math.max(.05, H[0] - x0))); return [p[0], p[1] + dy * t * t * (3 - 2 * t), p[2]]; });
    }
    if (breath) lgMove(m, p => [p[0], p[1] + breath, p[2]]);
    // a flyer asleep wraps its wings round itself (cloak: their centre and radii): a hunched, cloaked stone
    if (pose.cloak) { const c = pose.cloak.c; m.ell(c, pose.cloak.r, M.BODY2, { group: 1, paint: p => { const mm = mossy(p); if (mm) return mm; return Math.abs(Math.sin(Math.atan2(p[2], p[0] - c[0]) * 5)) > .85 ? M.BODY3 : undefined; } }); }
    // what has grown over it, on its back and round it
    const b = lgBounds(m), cx = (b.x0 + b.x1) / 2, rx = (b.x1 - b.x0) / 2, rz = (b.z1 - b.z0) / 2, unit = Math.max(.25, Math.min(rx, top - G + .2));
    const tops = [];
    for (let i = 0; i < 9; i++) for (let j = 0; j < 5; j++) { const x = b.x0 + (i + .5) / 9 * (b.x1 - b.x0), z = b.z0 + (j + .5) / 5 * (b.z1 - b.z0), y = lgSurface(m, x, z, b.y1 + .02, G); if (y != null && y > G + .04) tops.push([x, y, z]); }
    tops.sort((a, c) => c[1] - a[1]);
    const onBack = () => tops[Math.floor(r() * Math.min(tops.length, 12))], round = k => { const a = (k * 2.39 + r() * .6) % 6.28; return [cx + Math.cos(a) * rx * uni(r, .8, .95), G + unit * .03, Math.sin(a) * rz * uni(r, .9, 1.1)]; }; // round its foot, on the mound
    if (tops.length) {
      for (let i = 0; i < (over.ferns || 0); i++) lgAddFern(m, i % 2 ? onBack() : round(i), unit * uni(r, .35, .5), r);
      for (let i = 0; i < (over.grass || 0); i++) lgAddGrass(m, i % 3 ? onBack() : round(i + 3), unit * uni(r, .15, .25), r);
      for (let i = 0; i < (over.mushrooms || 0); i++) lgAddMushrooms(m, i % 2 ? round(i + 7) : onBack(), unit * .14, r);
      for (let i = 0; i < (over.brackets || 0); i++) { const t = tops[tops.length - 1 - Math.floor(r() * Math.min(tops.length, 8))], out = v3.norm([t[0] - cx, 0, t[2] || .3]); lgAddBracket(m, v3.add(t, v3.mul(out, .02)), out, unit * .16, r); }
      for (let i = 0; i < (over.roots || 0); i++) { const t = onBack(), out = v3.norm([t[0] - cx, 0, t[2] + (i % 2 ? .3 : -.3)]); lgAddRoot(m, t, out, G, unit * .5, r); }
      for (let i = 0; i < (over.flowers || 0); i++) lgAddFlowers(m, i % 2 ? onBack() : round(i + 11), unit * .3, r);
      if (over.sapling) lgAddSapling(m, onBack(), unit * .75, over.sapling, r);
    }
    if (over.beard) for (const q of m.parts.filter(q => pose.wood?.includes(q.group) && q.type === "cone").slice(0, over.beard * 3).filter((_, i) => i % 3 === 2)) { const p = q.b; m.chain([[...p, .025], [...v3.add(p, [.01, -.12, .01]), .02], [...v3.add(p, [-.01, -.22, 0]), .012]], M.MOSS, { group: lgNext(), extra: true }); }
    // the mound of earth it sleeps in, stones half buried round it
    m.ell([cx, G - unit * .3, 0], [rx * .95 + unit * .08, unit * .42, rz * 1.05 + unit * .08], M.BARK2, { group: 150, extra: true, rough: unit * .03, paint: p => { const k = vnoise(p[0] * 7, p[2] * 7, 3); return k < .3 + moss * .6 ? M.MOSS : k > .88 ? M.STONED : undefined; } }); // a lip of its earth, grown over
    for (let i = 0; i < (over.stones || 0); i++) lgAddStone(m, v3.add(round(i * 3 + 1), [0, unit * .02, 0]), unit * uni(r, .1, .2), r);
    if (over.nest) lgAddNest(m, [cx, G + unit * .08, 0], Math.max(rz, rx * .6) * 1.05, unit * .08, r);
    m.clipY = G;
    const res = render(m, { scale: s, facing: o.facing });
    res.sp.origin = res.project([cx, G, 0]); // the ground under its middle, on the sprite
    res.sp.groundLine = G;
    return res.sp;
  };
  form.motes = false;
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

// One form of a species' legend: { sp, colours } (sp.origin: the ground under its middle). Only
// asleep for now (Ed, 2026-10-04: "no waking sequence yet, just the sleeping form").
export function legendForm(id, st, { state = "asleep", frame = 0, facing = "towards" } = {}) {
  const S = SPECIES_BY_ID[id], pose = LEGEND_POSES[id];
  if (!S || !pose) throw new Error(`no sleeping legend for ${id}`);
  if (!LEGEND_STATES.includes(state)) throw new Error(`no ${state} legend yet`);
  const sp = lgCrop(withForm(lgForm(S, { breath: frame % 2 ? .025 : 0 }), () => buildCreature(S, 3, 0, st, facing)));
  return { sp, colours: legendColours(id, st) };
}

// Its colours asleep: its own weathered toward its area's stone, and the area's moss, earth and leaves.
export function legendColours(id, st) {
  const a = legendArea(id), [, fh, fs, fv] = a.floor, base = speciesColours(id, st), d = decorColours(st, rockTint(a));
  const mix = (x, y, t) => x.map((v, i) => Math.round(v + (y[i] - v) * t));
  const stoneT = .62, stone = d[M.STONE], dark = d[M.STONED];
  const c = { ...base };
  for (const [k, to] of [[M.BODY, stone], [M.BODY2, mix(stone, dark, .45)], [M.BODY3, dark], [M.BELLY, mix(stone, [220, 216, 200], .3)], [M.ACCENT, mix(stone, dark, .2)], [M.EAR, mix(stone, dark, .3)], [M.SKIN, mix(stone, [150, 120, 110], .3)], [M.NOSE, dark]]) if (c[k]) c[k] = mix(c[k], to, stoneT);
  const floor = hsv2rgb(fh, fs, fv);
  Object.assign(c, {
    [M.STONE]: d[M.STONE], [M.STONED]: d[M.STONED], [M.MOSS]: mix(d[M.MOSS], floor, .3), [M.LEAF]: mix(d[M.LEAF], floor, .2), [M.LEAF2]: mix(d[M.LEAF2], floor, .15), [M.LEAF3]: d[M.LEAF3],
    [M.TRUNK]: d[M.TRUNK], [M.BARKD]: d[M.BARKD], [M.BARKL]: d[M.BARKL], [M.STRAW]: d[M.STRAW], [M.CLOTH]: [222, 210, 186],
    [M.BARK2]: hsv2rgb(fh, Math.min(1, fs * .9), fv * .62), // the area's earth
    [M.WEB]: mix([196, 200, 150], floor, .2),               // lichen
    [M.FLOWER]: LEGEND_POSES[id]?.over.flowers ? [238, 206, 96] : hsv2rgb(.04 + (id.length % 3) * .03, .55, .72), // mushroom caps (or, in a meadow, buttercups)
  });
  return c;
}

// Every form of a species' legend, baked: { asleep: [canvas…] }, each canvas carrying origin (the
// ground under its middle, in its pixels).
export function legendSprites(id, st, { facing = "towards", makeCanvas = defaultCanvas } = {}) {
  const out = {};
  for (const state of LEGEND_STATES) out[state] = Array.from({ length: LEGEND_FRAMES[state] }, (_, frame) => { const { sp, colours } = legendForm(id, st, { state, frame, facing }), cv = bake(sp, colours, st, "none", makeCanvas); cv.origin = sp.origin; return cv; });
  return out;
}
