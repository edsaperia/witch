// The prop generator (#119): a prop built from its genome (art/props/genomes.js) and a seed, in 3D (model3d.js) at the witch's
// scale like the tall pieces (art/tall.js), cropped to what is drawn, standing on its bottom row. Each kind has a builder that reads
// only its variant's numbers, so every seed gives a different shape, not the same sprite placed again (the art director's lesson on
// #112: "props vary in shape, not only placement"). Light comes from the model's normals, so the bake's bands (and the ?style=bold
// and ?style=ref stylisation) give each material its tones; surface detail is a few big patches, never speckle.
//   propVariant(kind, seed, over): the variant's numbers (over: fixed ones, an area's)
//   propPiece(kind, o, def, st): { sp, prColours, metres: { height, width }, variant } (o.seed picks the variant; o's other keys fix numbers)
import { M, Sprite, hsv2rgb, hash2, rng } from "../core.js";
import { Model, render, v3 } from "../model3d.js";
import { witchPixelsPerUnit, cleanFlecks } from "../witch.js";
import { PROP_GENOMES } from "./genomes.js";
import { groundColours } from "../ground.js";

const PR_U = 1 / 1.9; // model units a metre (the witch's model is about 1.9 m a unit)
const prPick = (r, opts) => { const tot = opts.reduce((a, [, w]) => a + w, 0); let x = r() * tot; for (const [v, w] of opts) if ((x -= w) < 0) return v; return opts[0][0]; };
// A variant: each range picked within (integers stay whole where both ends are), each list of options by weight; `over` fixes any.
export function propVariant(kind, seed = 0, over = {}) {
  const G = PROP_GENOMES[kind]; if (!G) throw new Error(`no prop kind "${kind}"`);
  const r = rng(((seed + 1) * 2654435761 + kind.length * 97) >>> 0), v = {};
  for (const [k, g] of Object.entries(G)) {
    if (k === "colour" || k === "bog") continue;
    if (Array.isArray(g) && Array.isArray(g[0])) v[k] = prPick(r, g);
    else if (Array.isArray(g)) { const x = g[0] + (g[1] - g[0]) * r(); v[k] = Number.isInteger(g[0]) && Number.isInteger(g[1]) && Math.abs(g[1] - g[0]) >= 1 && k !== "branchSide" ? Math.round(x) : x; }
    else v[k] = g;
  }
  v.branchSide = v.branchSide !== undefined ? (v.branchSide < 0 ? -1 : 1) : undefined;
  v.seed = seed; v.r = r;
  return Object.assign(v, Object.fromEntries(Object.entries(over).filter(([k]) => k in G && k !== "colour")));
}
const gpPrCell = (p, k, seed) => hash2(Math.floor(p[0] * k + 500), Math.floor(p[1] * k + 500) + Math.floor(p[2] * k + 500) * 131, seed);
// patches: a few big blobs on a surface (centres and radii), so marks come as clusters, not noise
const prInPatch = (p, patches) => patches.some(([c, rad]) => (p[0] - c[0]) ** 2 + (p[1] - c[1]) ** 2 * 1.4 + (p[2] - c[2]) ** 2 < rad * rad);

// ---- standing stone: a plain grey slab, wider than deep, tapering, leaning; its top slanted, rounded, notched or broken ----
function prStanding(m, v) {
  const r = v.r, squat = v.shape === "squat", h = v.height * PR_U * (squat ? .7 : 1), w = v.width * PR_U * .5 * (squat ? 1.45 : 1), d = v.depth * PR_U * .5 * (squat ? 1.15 : 1), a = v.lean * (squat ? .5 : 1), b = v.tilt;
  const up = v3.norm([Math.sin(a), Math.cos(a) * Math.cos(b), Math.sin(b)]), side = v3.norm([Math.cos(a), -Math.sin(a), 0]);
  const at = (u, s, f = 0) => v3.add(v3.mul(up, u), v3.add(v3.mul(side, s), [0, 0, f]));
  const broken = v.top === "broken", H = broken ? h * .62 : h;
  const patches = [...Array(v.lichen).keys()].map(() => [at(H * (.3 + r() * .6), w * (r() - .5) * 1.2, d * 1.05), v.lichenSize * PR_U]);
  const lichenMat = v.lichenMat, mossTop = H * v.moss;
  const paint = p => v3.dot(p, up) < mossTop * (.75 + .5 * gpPrCell(p, 9, 3)) ? M.MOSS : prInPatch(p, patches) ? lichenMat : undefined;
  // the slab: one rounded box, sunk a little into the ground, its shoulders cut away towards the top (its taper), so its faces stay flat and plain
  m.box(at(H * .5 - .02, 0), [H * .5 + .02, w, d], M.STONE, { dir: up, up: side, round: Math.min(w, d) * .5, rough: v.rough, group: 1, paint });
  const cutW = v.top === "flat" ? 0 : w * (1 - v.taper); // a flat-topped slab stays square
  if (cutW > .01) for (const s0 of [-1, 1]) { const k = s0 > 0 ? 1 : .6 + r() * .4; m.box(at(H * .95, s0 * (w + cutW * .2)), [H * .45, cutW * k * 1.2, d * 2], M.STONE, { dir: v3.norm(v3.add(up, v3.mul(side, -s0 * cutW * k * 2 / H))), up: side, cut: true, group: 1 }); }
  const top = at(H, 0);
  const s1 = r() < .5 ? -1 : 1;
  if (v.top === "slant") { // cut by a plane through a third of its width or more, dropping toward one edge (one box, its inner face the plane, reaching past that edge)
    const k = w * 2 * (.33 + r() * .12), th = .5, A = at(H, s1 * (w - k)), n = v3.norm(v3.add(v3.mul(up, Math.cos(th)), v3.mul(side, s1 * Math.sin(th)))), T = w * 2;
    m.box(v3.add(A, v3.mul(n, T)), [T, w * 3, d * 2], M.STONE, { dir: n, up: v3.norm(v3.sub(v3.mul(side, s1 * Math.cos(th)), v3.mul(up, Math.sin(th)))), round: .004, cut: true, group: 1 });
  }
  if (v.top === "round") m.ell(top, [w * .9 * v.taper, d * .95, w * .55], M.STONE, { dir: side, up: [0, 0, 1], rough: v.rough, group: 1, paint });
  if (v.top === "notch") { // a V in its top quarter at most (deeper read as a stone split in two: the art director, #142): a square cut turned 45°, its lower corner the V's bottom
    const D = Math.min(H * .22, w * .55), h2 = D / Math.SQRT2 * 1.4, x0 = w * .2 * s1, bottom = at(H - D, x0);
    m.box(v3.add(bottom, v3.mul(up, h2 * Math.SQRT2)), [h2, h2, d * 2], M.STONE, { dir: v3.norm(v3.add(up, side)), up: v3.norm(v3.sub(up, side)), round: .004, cut: true, group: 1 });
  }


  if (broken) { // snapped off: a jagged top, and the piece lying beside it
    for (let i = 0; i < 3; i++) m.box(v3.add(top, at(.02, w * (i - 1) * .6)), [w * .35, w * .35, d * 1.6], M.STONE, { dir: v3.norm(v3.add(up, v3.mul(side, (i - 1) * .8 + .3))), up: [0, 0, 1], cut: true, group: 1 });
    const L = h * .38, s0 = (r() < .5 ? -1 : 1);
    m.box([s0 * (w + L * .55), d * .9, (r() - .3) * w], [L * .5, d * .95, w * .8], M.STONE, { dir: [s0, .12, (r() - .5) * .5], up: [0, 1, 0], round: d * .6, rough: v.rough, group: 2, paint: q => q[1] > d * 1.4 && gpPrCell(q, 7, 9) < .35 ? M.MOSS : undefined });
  }
  for (let i = 0; i < 5 + Math.floor(r() * 4); i++) { const x = (r() - .5) * w * 3, z = d * (1 + r() * 1.5) * (r() < .7 ? 1 : -1); m.seg([x, 0, z], [x + (r() - .5) * .04, .08 + r() * .14, z], .025, .006, r() < .5 ? M.LEAF : M.LEAF2, { group: 3 }); } // grass round its foot
}
// ---- cairn: stones stacked by hand into a rounded cone, big ones low and small ones high, a capstone on top; a slab or two leaning on it;
// rubble round it. Its stones share a few groups, so the cracks between them are soft (their own dark, not near-black: prColours) ----
function prCairn(m, v) {
  const r = v.r, R = v.spread * PR_U * .5, H = v.height * PR_U, sz = v.size * PR_U;
  let placed = 0, y = 0;
  const layers = Math.max(3, Math.round(v.stones / 2.6));
  for (let j = 0; j < layers && placed < v.stones - 1; j++) {
    const t = j / layers, ring = R * (1 - t) * .62, n = Math.max(1, Math.round((layers - j) * .9)), s = sz * (1.2 - t * .6), fl = v.flat, a0 = r() * Math.PI * 2;
    for (let i = 0; i < n && placed < v.stones - 1; i++, placed++) {
      const a = a0 + i / n * Math.PI * 2 + (r() - .5) * .5, ss = s * (.85 + r() * .3), c = [Math.cos(a) * ring, y + ss * fl * .85, Math.sin(a) * ring * .85], mossy = j < 2 && r() < v.moss;
      m.ell(c, [ss * (1 + r() * .3), ss * fl * (.85 + r() * .3), ss * (.8 + r() * .3)], M.STONE, { dir: [Math.cos(a + 1.6), (r() - .5) * .3, Math.sin(a + 1.6)], rough: v.rough, group: 1 + (placed % 3), paint: p => mossy && p[1] > c[1] + ss * fl * .4 ? M.MOSS : gpPrCell(p, 8, placed) < .06 ? M.BELLY : undefined });
    }
    y += s * fl * 1.45 * Math.min(1, H / (layers * s * fl * 1.45));
  }
  const cap = sz * .7; m.ell([0, y + cap * .5, 0], [cap * .9, cap * .55, cap * .75], M.STONE, { dir: [1, .15, .2], rough: v.rough, group: 4 }); placed++; // its capstone
  const slabs = v.slab === "two" ? 2 : v.slab === "one" ? 1 : 0;
  for (let k = 0; k < slabs; k++) { const a = r() * Math.PI * 2, hgt = H * (.8 + r() * .5); m.box([Math.cos(a) * R * .85, hgt * .5, Math.sin(a) * R * .65], [.05, hgt * .55, sz * 1.1], M.STONE, { round: .03, rough: v.rough * .5, group: 7 + k, dir: [-Math.cos(a) * .4, 1, -Math.sin(a) * .3], up: [Math.sin(a), 0, -Math.cos(a)] }); }
  for (let k = 0; k < v.rubble; k++) { const a = r() * Math.PI * 2, rr = R * (1.05 + r() * .35), s = sz * (.3 + r() * .3); m.ell([Math.cos(a) * rr, s * .5, Math.sin(a) * rr * .8], [s, s * .6, s * .85], M.STONE, { rough: v.rough, group: 9, dir: [Math.cos(a), 0, Math.sin(a)] }); }
  for (let k = 0; k < 6; k++) { const a = r() * Math.PI * 2, x = Math.cos(a) * R * 1.1, z = Math.sin(a) * R * .9; m.seg([x, 0, z], [x, .07 + r() * .1, z], .022, .005, k % 2 ? M.LEAF2 : M.LEAF, { group: 10 }); }
  return placed;
}
// ---- pool: flat water with an irregular shore, a darker middle, glints; a mud or moss rim; reed clumps, cattails, stones ----
function prPool(m, v) {
  const r = v.r, R = v.radius * PR_U, A = v.aspect, rimW = v.rim * PR_U / R;
  const waves = [...Array(v.waves).keys()].map(k => [k + 2, (r() - .5) * 2 * v.wobble * (1 - k * .15), r() * Math.PI * 2]);
  const shore = a => 1 + waves.reduce((s, [k, amp, ph]) => s + amp * Math.cos(k * a + ph), 0) - v.wobble * .4;
  const glints = [...Array(3 + Math.floor(r() * 3)).keys()].map(() => [(r() - .5) * 1.1, (r() - .5) * .9, .05 + r() * .06]);
  const mask = (s, t) => { // s across, t into the picture, both -1..1 over the prPool and its rim
    const a = Math.atan2(t, s), d = Math.hypot(s, t) / (1 + v.wobble + rimW), e = shore(a) / (1 + v.wobble + rimW);
    if (d > e + rimW / (1 + v.wobble + rimW)) return undefined;
    if (d > e) return v.rimKind === "moss" ? M.MOSS : d > e + rimW / (1 + v.wobble + rimW) * .5 ? M.BODY : M.BARK2; // mud: the ground's darker tone inside, its own tone outside
    if (glints.some(([gx, gy, gr]) => Math.abs(s - gx) < gr * 1.4 && Math.abs(t - gy) < gr * .5)) return M.GLINT; // glowing, so the stylisation leaves them be
    return d < e * .55 ? M.BODY2 : M.WATER;
  };
  const S = R * (1 + v.wobble + rimW);
  m.flat([0, .004, 0], [1, 0, 0], [0, 0, -1], S, S * A, mask, { group: 1, bend: .04 });
  const edge = (a, k = 1) => { const e = shore(a) * k; return [Math.cos(a) * R * e, 0, -Math.sin(a) * R * A * e]; };
  for (let c = 0; c < v.reeds; c++) {
    const a0 = r() * Math.PI * 2;
    for (let i = 0; i < v.reedsPer; i++) {
      const p = edge(a0 + (r() - .5) * .5, .92 + r() * .16), hgt = v.reedHeight * PR_U * (.6 + r() * .5), tip = v3.add(p, [(r() - .5) * .08, hgt, (r() - .5) * .05]);
      m.seg(p, tip, .022, .006, i % 3 ? M.LEAF : M.LEAF2, { group: 10 + c });
      if (r() < v.cattails && i % 2 === 0) m.ell(v3.lerp(p, tip, .82), [.022, .06, .022], M.TRUNK, { dir: v3.sub(tip, p), group: 10 + c });
    }
  }
  for (let k = 0; k < v.stones; k++) { const p = edge(r() * Math.PI * 2, 1 + rimW * .5), s = (.05 + r() * .07) * PR_U * 2; m.ell(v3.add(p, [0, s * .35, 0]), [s, s * .55, s * .8], M.STONE, { rough: .02, group: 20 + k, dir: [r() - .5, .1, r() - .5] }); }
  for (let k = 0; k < v.pads; k++) { const a = r() * Math.PI * 2, p = edge(a, .5 + r() * .35); m.ell(v3.add(p, [0, .008, 0]), [.07, .006, .06], M.LEAF3, { group: 30 + k }); }
}
// ---- broken trunk: a short trunk snapped off; its broken branch grows out of it (from inside the trunk, so the two are one piece) ----
function prTrunk(m, v) {
  const r = v.r, H = v.height * PR_U, R0 = v.girth * PR_U, sd = v.branchSide;
  const grooves = p => { const a = Math.atan2(p[2], p[0]), k = Math.sin(a * 7 + p[1] * 2.1 + Math.sin(p[1] * 5) * .6); return k > .8 ? M.BARKD : k < -.88 ? M.BARKL : undefined; };
  const moss = p => p[2] < -R0 * .2 && p[1] < H * v.moss ? M.MOSS : undefined; // moss on its back, the shady side
  const bark = p => moss(p) ?? grooves(p);
  const lean = (r() - .5) * .12, axis = y => [lean * y, y, 0];
  m.chain([[...axis(0), R0], [...axis(H * .35), R0 * .86], [...axis(H * .75), R0 * .8], [...axis(H), R0 * .76]], M.TRUNK, { group: 1, rough: .012, paint: bark });
  // the break: a ring of jagged pale splinters, the tallest on one side
  const top = axis(H), hi = r() * Math.PI * 2;
  m.ell(v3.add(top, [0, .01, 0]), [R0 * .72, .02, R0 * .72], M.BELLY, { group: 2 });
  for (let i = 0; i < v.splinters; i++) { const a = i / v.splinters * Math.PI * 2 + r() * .4, k = .5 + .5 * Math.cos(a - hi), base = v3.add(top, [Math.cos(a) * R0 * .55, -.02, Math.sin(a) * R0 * .55]); m.seg(base, v3.add(base, [Math.cos(a) * R0 * .1, (.04 + k * .2 + r() * .06) * PR_U * 2, Math.sin(a) * R0 * .1]), R0 * .2, R0 * .03, i % 2 ? M.BELLY : M.BARKL, { group: 2 }); }
  // the branch, rooted on the trunk's axis so it fuses with it: up (rising and snapped short), out (level), or hanging (snapped and dangling to the ground)
  if (v.branch !== "none") {
    const y0 = H * v.branchAt, from = axis(y0), L = v.branchLen * PR_U, rb = R0 * .58, z = (r() - .5) * .3;
    const dir = v.branch === "up" ? v3.norm([sd * .65, .75, z]) : v.branch === "out" ? v3.norm([sd, .12, z]) : v3.norm([sd * .7, -.6, z]);
    let mid = v3.add(from, v3.mul(dir, R0 * .9 + L * .5)), end = v3.add(from, v3.mul(dir, R0 * .9 + L));
    if (v.branch === "hanging") { end = [end[0], Math.max(.03, end[1]), end[2]]; mid = v3.add(v3.lerp(from, end, .5), [sd * .06, .04, 0]); }
    m.chain([[...from, rb * 1.25], [...v3.add(from, v3.mul(dir, R0 * .9)), rb], [...mid, rb * .8], [...end, rb * .62]], M.TRUNK, { group: 1, rough: .01, paint: grooves }); // same group: it grows out of the trunk
    const tipDir = v3.norm(v3.sub(end, mid));
    // its snapped end: a jagged, tapering break (docs/ART-GUIDE.md: tips taper, never round knobs): one long splinter and one short,
    // offset along the branch, pale at the break and darker towards their points
    const sideV = v3.norm(v3.cross(tipDir, [0, 0, 1])), splinter = (back, off, len, w0) => { const b0 = v3.add(v3.sub(end, v3.mul(tipDir, back)), v3.mul(sideV, off)), tip = v3.add(b0, v3.add(v3.mul(tipDir, len), v3.mul(sideV, off * .5))); m.seg(b0, tip, w0, .004, M.BELLY, { group: 3, paint: p => v3.dot(v3.sub(p, b0), tipDir) > len * .55 ? M.BARKL : undefined }); };
    splinter(rb * .4, rb * .3, rb * 2.6 + .05, rb * .42); splinter(rb * .1, -rb * .35, rb * 1.2 + .02, rb * .32);
    if (v.branch !== "hanging" && L > .4) { const t = .45 + r() * .2, b = v3.lerp(mid, end, t); m.seg(b, v3.add(b, [sd * .1, .16 + r() * .1, (r() - .5) * .1]), rb * .35, rb * .12, M.TRUNK, { group: 1, paint: grooves }); } // a twig off it
  }
  for (let i = 0; i < v.roots; i++) { const a = i / v.roots * Math.PI * 2 + r() * .5, e = R0 * (1.7 + r() * .5); m.chain([[Math.cos(a) * R0 * .6, H * .12, Math.sin(a) * R0 * .6, R0 * .45], [Math.cos(a) * e, .02, Math.sin(a) * e, R0 * .15]], M.TRUNK, { group: 1, paint: bark }); }
  for (let i = 0; i < v.fungi; i++) { const a = -Math.PI / 2 + (r() - .5) * 2.4, y = H * (.2 + r() * .55), c = v3.add(axis(y), [Math.cos(a) * R0 * .85, 0, Math.sin(a) * R0 * .85]); m.ell(c, [R0 * .45, .025, R0 * .35], M.FLOWER, { dir: [Math.cos(a), 0, Math.sin(a)], group: 5 + i, paint: p => p[1] > c[1] + .012 ? M.BELLY : undefined }); }
  for (let k = 0; k < 4; k++) { const a = r() * Math.PI * 2, x = Math.cos(a) * R0 * 2, z = Math.sin(a) * R0 * 2; m.seg([x, 0, z], [x, .06 + r() * .1, z], .02, .005, k % 2 ? M.LEAF2 : M.LEAF, { group: 9 }); }
}
const PR_BUILD = { standingStone: prStanding, cairn: prCairn, pool: prPool, brokenTrunk: prTrunk };

function prCrop(sp) {
  let x0 = sp.w, x1 = -1, y0 = sp.h, y1 = -1;
  for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  if (x1 < 0) return sp;
  const out = new Sprite(x1 - x0 + 1, y1 - y0 + 1);
  for (let y = 0; y < out.h; y++) for (let x = 0; x < out.w; x++) { const i = (y + y0) * sp.w + x + x0; if (sp.m[i]) { out.put(x, y, sp.m[i], sp.n[i * 3], sp.n[i * 3 + 1], sp.n[i * 3 + 2]); out.g[y * out.w + x] = sp.g[i]; } }
  return out;
}
// A colour from the genome: [h, s, v] jittered by the variant's spread (a list of [h, s, v, weight] picks one).
function prTone(c, r, k) { if (Array.isArray(c[0])) c = prPick(r, c.map(x => [x, x[3] ?? 1])); return hsv2rgb(((c[0] + (r() - .5) * k * .5) % 1 + 1) % 1, Math.max(0, Math.min(1, c[1] + (r() - .5) * k)), Math.max(0, Math.min(1, c[2] + (r() - .5) * k * 1.5))); }
function prColours(kind, v, def, o, st = {}) {
  const G = PROP_GENOMES[kind], C = { ...G.colour, ...(o.bog && G.bog ? G.bog : {}) }, r = rng((v.seed * 7919 + 13) >>> 0), k = C.spread, leaf = def?.leaf ?? .26;
  const grass = { [M.LEAF]: hsv2rgb(leaf, .5, .45), [M.LEAF2]: hsv2rgb(leaf - .03, .45, .62), [M.LEAF3]: hsv2rgb(leaf + .02, .5, .4), [M.LINE]: [24, 22, 30] };
  if (kind === "standingStone" || kind === "cairn") { const dark = prTone(C.dark, r, k); return { ...grass, [M.STONE]: prTone(C.stone, r, k), [M.STONED]: dark, [M.BELLY]: prTone(C.lichen, r, k * .5), [M.MOSS]: prTone(C.moss, r, k), ...(kind === "cairn" ? { [M.LINE]: dark.map(c => c * .75) } : {}) }; } // a cairn's cracks in its stones' own dark
  if (kind === "pool") { // its shore in the area's own ground (art/ground.js: the mud its darker and own tones, the moss its moss), so it meets the floor tile
    const g = def?.floor ? groundColours(def, st) : null;
    return { ...grass, [M.WATER]: prTone(C.water, r, k), [M.BODY2]: prTone(C.deep, r, k), [M.GLINT]: prTone(C.glint, r, k * .5), [M.BARK2]: prTone(C.mud, r, k), [M.MOSS]: prTone(C.moss, r, k), [M.LEAF]: prTone(C.reed, r, k), [M.LEAF2]: prTone(C.reed2, r, k), [M.TRUNK]: prTone(C.cattail, r, k), [M.STONE]: prTone(C.stone, r, k), [M.LEAF3]: prTone(C.pad, r, k), ...(g ? { [M.BARK2]: g[M.BODY2], [M.BODY]: g[M.BODY], [M.MOSS]: g[M.MOSS] } : { [M.BODY]: prTone(C.mud, r, k).map(c => Math.min(255, c * 1.15)) }) };
  }
  return { ...grass, [M.TRUNK]: prTone(C.wood, r, k), [M.BARKD]: prTone(C.dark, r, k), [M.BARKL]: prTone(C.light, r, k), [M.BELLY]: prTone(C.pale, r, k * .5), [M.MOSS]: prTone(C.moss, r, k), [M.FLOWER]: prTone(C.fungus, r, k) };
}
// One generated prop. o: { seed, bog (a pool's), and any of its genome's numbers to fix }; def: the area (its leaf hue for grass).
export function propPiece(kind, o = {}, def = null, st = {}, ppm = 16) {
  const v = propVariant(kind, o.seed ?? 0, o);
  if (kind === "standingStone") { v.lichenMat = M.BELLY; if (o.lead) { v.shape = "tall"; v.height = Math.max(v.height, 5.2); v.lean *= .5; if (v.top === "broken" || v.top === "notch") v.top = "flat"; } } // lead: an area's first stone stands tall and whole (the moor's something 4 m tall)
  const m = new Model({ blend: kind === "brokenTrunk" ? .06 : .035 });
  PR_BUILD[kind](m, v);
  let sp = prCrop(render(m, { scale: witchPixelsPerUnit(st) }).sp);
  if (kind === "pool") { // its shore breaks into the floor: the outermost rim pixels (touching nothing) dropped in 2 x 1 clusters, by hash (agreed with art builder 1, #156)
    const rim = new Set([M.BODY, M.BARK2, M.MOSS]), at = (x, y) => x < 0 || y < 0 || x >= sp.w || y >= sp.h ? 0 : sp.m[y * sp.w + x], drop = [];
    for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) { const m0 = at(x, y); if (!rim.has(m0) || (at(x - 1, y) && at(x + 1, y) && at(x, y - 1) && at(x, y + 1))) continue; if (hash2(x >> 1, y, v.seed + 77) < .5) drop.push(y * sp.w + x, y * sp.w + (x ^ 1)); }
    for (const i of drop) if (rim.has(sp.m[i])) sp.m[i] = 0;
    sp = prCrop(sp); // (thinned, it may have lost its bottom row)
  }
  cleanFlecks(sp); // no lone pixels or stray line dots (docs/ART-GUIDE.md: clusters, not noise)
  // a pool's water lit as a level surface at a grazing light, so every style gives it its base tone (the light tone's shift toward
  // yellow turned the teal moss-green in bold and ref: the art director, #142) and its value stays well apart from its rim
  if (kind === "pool") { const wn = [.3, .2, .93], l = Math.hypot(...wn); for (let i = 0; i < sp.m.length; i++) if (sp.m[i] === M.WATER || sp.m[i] === M.BODY2) sp.n.set(wn.map(c => c / l), i * 3); }
  const { r, ...variant } = v;
  return { sp, colours: prColours(kind, v, def, o, st), metres: { height: +(sp.h / ppm).toFixed(1), width: +(sp.w / ppm).toFixed(1) }, variant };
}
// Which generated kind (and fixed numbers) stands in for one of the areas' hand-made props under ?props=gen, or null.
export function propFor(kind, o = {}) {
  if (kind === "standingstone") return ["standingStone", o.lean ? { lean: o.lean } : {}];
  if (kind === "cairn") return ["cairn", o.tall ? { height: 1.6, stones: 12, spread: 1.2 } : {}];
  if (kind === "water" && !o.stream) return ["pool", { bog: !!o.bog, ...(o.w ? { radius: .6 * o.w } : {}) }];
  if (kind === "stump" && !o.gnawed) return ["brokenTrunk", o.snag ? {} : { branch: "none" }];
  return null;
}
