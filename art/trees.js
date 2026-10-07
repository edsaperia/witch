// Witch trees and bushes, drawn with the same toolkit as the animals: trunks and branches
// are smooth tapering limbs that twist and fork, crowns are clumps of leaves (closed,
// ragged outlines, shaded light on top and dark beneath), roots spread over the ground,
// and bark is carved into the trunk. Six kinds, after Ed's references: gnarled broadleaf,
// willow, birch, tree fern, tiered fir and flat-crowned maple.
// Each tree returns {sp, crownY}: trunk pixels below crownY are its bottom half (seen in
// ground mode), everything else its top half (the canopy seen from the treetops).
import { M, Sprite, uni, pick, hash2, vnoise, hsv2rgb, tufts, rot, lerp2, add } from "./core.js";
import { PLANT_GENOMES, BUSH_KINDS, BUSH_GENOMES, genomeStyle } from "./flora/genomes.js";
import { blobTree, blobBush, stampBlobs, clusterLeaves } from "./flora/blob.js";

const WOOD = new Set([M.TRUNK, M.BARK2, M.BARKD, M.BARKL, M.BELLY]); // BELLY: a pine's orange or a yew's red trunk

// A clump of leaves (#119): one blob filled with the blob generator's leaf stamps (stampBlobs), lit from the upper left as one
// shape, dark beneath, in the tree's three leaf tones; mat LEAF3 a clump in shadow (behind). Each clump is its own region of the
// pixel wind (sp.blob), numbered after any the sprite has. The caller clusters the tones once, after all its clumps (stylised).
function clump(sp, c, rx, ry, st, r, { mat = M.LEAF, ragged = 1, env = null } = {}) {
  if (sp.clumpId === undefined) { let top = 0; if (sp.blob) for (const b of sp.blob) if (b > top && b < 230) top = b; sp.clumpId = top; }
  sp.clumpId = sp.clumpId % 228 + 1;
  const S = sp.stylised ? st : { ...st, artStyle: undefined }; // drawn stylised only onto a sprite its generator stylised (the blob trees); broadleaf takes bake's post-pass
  stampBlobs(sp, r, S, 1, [{ c, rx, ry, back: mat === M.LEAF3 }], { stampSize: Math.max(1.5, Math.min(3, Math.min(rx, ry) / 3.2)), tones: [.2, .7], jitter: .16 * ragged, under: env ? .12 : .22, backDark: env ? .18 : .3, env, holes: .02 * st.density, blobBase: sp.clumpId - 1, cluster: false });
}
// After the life below a stylised crown (a blob tree's, under st.artStyle bold or ref): its tones in clusters too.
function clusterClumps(sp) { if (sp.stylised) clusterLeaves(sp); }

// A wooden limb along a wobbling path from p, heading `ang` (0 = right, -PI/2 = up).
export function bough(sp, p, ang, len, w0, w1, st, r, { mat = M.TRUNK, bend = 1, group = 10, line = false } = {}) {
  const pts = [p], n = 4;
  let a = ang, q = p;
  for (let i = 1; i <= n; i++) {
    a += (r() - .5) * .7 * st.gnarl * bend;
    q = add(q, [Math.cos(a) * len / n, Math.sin(a) * len / n]);
    pts.push(q);
  }
  sp.limb(pts.map((t, i) => [...t, w0 + (w1 - w0) * i / n]), mat, { group, line, round: st.round, cap: .6, capEnd: 1 });
  return { end: q, ang: a, pts };
}

// The base: a flared trunk foot and roots that snake out over the ground.
export function roots(sp, bx, gy, w, st, r, s, mat = M.TRUNK) {
  // the foot of the trunk flares out where it meets the ground, in the trunk's own bark (a smooth
  // grey beech's foot was brown, a sawn-off stump under a grey column: Ed, 2026-10-04)
  sp.shape([[bx - w * 1.05, gy], [bx - w * .62, gy - w * .5], [bx - w * .45, gy - w * 1.4], [bx + w * .45, gy - w * 1.4], [bx + w * .62, gy - w * .5], [bx + w * 1.05, gy]], mat, { group: 10, round: st.round });
  if (st.roots <= 0) return;
  const n = Math.round(2 + st.roots * 4);
  for (let i = 0; i < n; i++) {
    const side = i % 2 ? 1 : -1, L = (8 + r() * 16) * s * (.4 + st.roots), lift = (2 + r() * 3) * s;
    const a = [bx + side * w * .2, gy - w * .5], b = [bx + side * (w * .55 + L * .4), gy - lift], c = [bx + side * (w * .5 + L), gy - .5];
    sp.limb([[...a, w * .55], [...b, w * .28], [...c, 1.2]], mat, { group: 11, round: st.round, cap: .5, capEnd: .6 });
  }
}

// Bark: dark crevices running along the wood, with lit ridges beside them.
export function bark(sp, st, vertical = true) {
  if (st.bark <= 0) return;
  for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) {
    const i = y * sp.w + x; if (sp.m[i] !== M.TRUNK) continue;
    const v = vertical ? vnoise(x / 1.3, y / 6, 21) : vnoise(x / 6, y / 1.3, 21);
    if (v > 1 - st.bark * .42 || hash2(x, y, 4) < st.bark * .05) sp.m[i] = M.BARKD;
    else if (v > 1 - st.bark * .62 && sp.n[i * 3] < -.1) sp.m[i] = M.BARKL;
  }
}

// Smooth bark (beech, rowan, hazel): plain, but for a few dark "eyes", short dark arcs across
// the trunk where old branches fell away, so it reads as bark and not a flat pale slab.
export function smoothBark(sp, r, s) {
  const pts = [];
  for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x] === M.BARK2) pts.push([x, y]);
  const n = Math.round(pts.length / (260 * s * s));
  for (let k = 0; k < n; k++) {
    const [x, y] = pts[Math.floor(r() * pts.length)], half = Math.max(1, Math.round((1 + r() * 1.5) * s));
    for (let dx = -half; dx <= half; dx++) {
      const yy = y + (Math.abs(dx) === half ? -1 : 0), i = yy * sp.w + x + dx; // a little arc: its ends turned up
      if (yy >= 0 && x + dx >= 0 && x + dx < sp.w && sp.m[i] === M.BARK2) sp.m[i] = M.BARKD;
    }
  }
}

// Trims empty margins, keeping the ground row at the bottom and the base at the centre.
export function trim(sp, bx, crownY) {
  let x0 = sp.w, x1 = -1, y0 = sp.h;
  for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); }
  if (x1 < 0) return { sp, crownY };
  const half = Math.max(bx - x0, x1 - bx) + 2, nx0 = Math.max(0, Math.floor(bx - half)), w = Math.min(sp.w - nx0, Math.ceil(half * 2) + 1), ny0 = Math.max(0, y0 - 1), h = sp.h - ny0;
  const out = new Sprite(w, h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y + ny0) * sp.w + x + nx0, j = y * w + x;
    out.m[j] = sp.m[i]; out.g[j] = sp.g[i]; out.n[j * 3] = sp.n[i * 3]; out.n[j * 3 + 1] = sp.n[i * 3 + 1]; out.n[j * 3 + 2] = sp.n[i * 3 + 2];
    if (sp.blob) (out.blob || (out.blob = new Uint8Array(w * h)))[j] = sp.blob[i]; // the genome generator's blobs, for the pixel wind
  }
  if (sp.stylised) out.stylised = sp.stylised;
  return { sp: out, crownY: crownY - ny0 };
}
export const spread = st => (st.crownWidth || 3) / 3;








// ================= UK species =================
// Ed: "the forest feels like it only has a few kinds of tree ... mostly stick to UK kinds of trees
// — they don't have to be completely different, just different enough that the texture clearly
// varies from area to area". What tells them apart from the treetops is the canopy's texture:
// the size of its leaf clumps, how dense it is and how gappy, its colour and its outline; from the
// ground, the trunk and silhouette.

// Leaf texture over a clump already drawn: bunches of `grain` px, dark gaps (`holes`), light flecks,
// and coloured dots (berries, flowers, cones) in M.FLOWER or `dot`.
function leafTexture(sp, c, rx, ry, r, { grain = 2, holes = 0, flecks = .16, dots = 0, dot = M.FLOWER, dotTall = false, mats = [M.LEAF, M.LEAF2, M.LEAF3] } = {}) {
  const x0 = Math.floor(c[0] - rx * 1.3), x1 = Math.ceil(c[0] + rx * 1.3), y0 = Math.floor(c[1] - ry * 1.3), y1 = Math.ceil(c[1] + ry * 1.3), seed = (r() * 1e4) | 0;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const m = sp.get(x, y); if (!mats.includes(m)) continue;
    const v = vnoise(x / grain, y / grain, seed), h = hash2(x, y, seed);
    if (holes && v < holes) sp.recolour(x, y, M.LEAF3);
    else if (v > 1 - flecks) sp.recolour(x, y, M.LEAF2);
    if (dots && h < dots && m !== M.LEAF3) { sp.recolour(x, y, dot); if (dotTall) sp.recolour(x, y - 1, dot); }
  }
}
// A broadleaf of given proportions: a trunk to `trunk` of the height, `limbs` first limbs spread by
// `spreadA`, forking `depth` times; clumps of `clumpR` [rx range] and `flat` (ry / rx) at the tips,
// then a leaf texture. trunks: several stems; lean; dome: an extra crown of clumps over the top.
function broadleaf(r, st, s, P) {
  const k = spread(st) * (P.wide || 1), W = Math.round(240 * s * k + 70 * s), H = Math.round((P.tall || 140) * s), sp = new Sprite(W, H), bx = W / 2, gy = H;
  const n = st.treeTrunks || P.trunks || 1, tw = (P.tw || 12) * s * (st.treeThick || 1) * (st.treeThin ? .55 : 1) / Math.sqrt(n), lean0 = (r() - .5) * .4 * st.gnarl + (st.treeLean || 0) + (P.lean || 0);
  const tips = []; let crownY = H;
  const grow = (p, ang, len, w, d) => {
    const b = bough(sp, p, ang, len, w, w * .65, st, r, { group: 12, mat: P.limbMat || M.TRUNK, bend: P.bend ?? 1 });
    if (d === 0) { tips.push(b.end); return; }
    const kids = r() < (P.fork ?? .35) ? 3 : 2;
    for (let i = 0; i < kids; i++) grow(b.end, b.ang + (i - (kids - 1) / 2) * uni(r, .45, .8) * (P.splay || 1) + (r() - .5) * .25, len * uni(r, .6, .78), w * .62, d - 1);
    if (d <= 2) tips.push(lerp2(p, b.end, .7));
  };
  for (let t = 0; t < n; t++) {
    const lean = lean0 + (n > 1 ? (t / (n - 1) - .5) * (P.fan || .8) : 0), base = [bx + (t - (n - 1) / 2) * tw * .6, gy];
    const trunk = bough(sp, base, -Math.PI / 2 + lean, H * (P.trunk || .36) * (n > 1 ? uni(r, .8, 1.1) : 1), tw, tw * .72, st, r, { bend: P.trunkBend ?? 1.2, mat: P.trunkMat || M.TRUNK });
    crownY = Math.min(crownY, trunk.end[1]);
    for (let i = 0; i < (P.limbs || 2); i++) { const side = i % 2 ? 1 : -1; grow(trunk.end, -Math.PI / 2 + lean * .5 + side * uni(r, .5, 1) * (P.spreadA || .8) * (n > 1 ? .7 : 1), H * (P.limb || .22) * (n > 1 ? .75 : 1), tw * .7, P.depth ?? 3); }
    if (P.leader) grow(trunk.end, -Math.PI / 2 + (r() - .5) * .2, H * (P.limb || .22) * P.leader, tw * .55, 2);
    if (t === 0 && st.treeHollow) { const h = lerp2(base, trunk.end, .38); sp.ellipse(h[0], h[1], tw * .28, tw * .5, M.NOSE, { round: .3 }); }
  }
  if (!P.noRoots) roots(sp, bx, gy, tw * Math.sqrt(n), st, r, s * (P.rootK || 1), P.trunkMat || M.TRUNK);
  if (!P.smooth) bark(sp, st); // smooth-barked kinds (beech, rowan, hazel) keep their trunks plain,
  else smoothBark(sp, r, s); //  marked only with a few dark "eyes" where old branches fell away
  if (st.treeBare) return trim(sp, bx, crownY + 4 * s);
  tips.sort((a, b) => a[1] - b[1]);
  const [ra, rb] = P.clumpR || [12, 18], flat = P.flat || .7, drawn = [];
  // stylised (st.artStyle bold or ref; the art director on #155): every clump lit as part of the one crown (its envelope round
  // the branch tips), a clump at most a tone darker beneath, the light tone only on the crown's lit top-left third, then clustered
  const sty = st.artStyle === "bold" || st.artStyle === "ref", xs = tips.map(t => t[0]), ys = tips.map(t => t[1]);
  const env = sty && tips.length ? { c: [(Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2 - 3 * s], rx: (Math.max(...xs) - Math.min(...xs)) / 2 + rb * s, ry: (Math.max(...ys) - Math.min(...ys)) / 2 + rb * s * flat + 6 * s, mix: .7 } : null;
  if (sty) sp.stylised = st.artStyle;
  const put = (c, rx, ry, mat) => { clump(sp, c, rx, ry, st, r, { mat, ragged: P.ragged || 1, env }); drawn.push([c, rx, ry]); };
  for (const t of tips) put(add(t, [0, -3 * s]), uni(r, ra, rb) * s, uni(r, ra, rb) * s * flat, r() < (P.darkBack ?? .35) ? M.LEAF3 : M.LEAF);
  for (const t of tips) if (r() < (P.extra ?? .7)) put(add(t, [uni(r, -9, 9) * s, uni(r, -12, -3) * s]), uni(r, ra, rb) * s * .7, uni(r, ra, rb) * s * flat * .7, M.LEAF);
  if (P.dome) { const top = Math.min(...tips.map(t => t[1])), xs = tips.map(t => t[0]), mid = (Math.min(...xs) + Math.max(...xs)) / 2, w = (Math.max(...xs) - Math.min(...xs)) / 2; for (let i = 0; i < P.dome; i++) { const f = i / Math.max(1, P.dome - 1) - .5; put([mid + f * w * 1.1, top - (1 - 4 * f * f) * 14 * s - uni(r, 2, 6) * s], uni(r, ra, rb) * s * 1.1, uni(r, ra, rb) * s * flat, M.LEAF); } } // an arched dome over the top
  if (P.layers) for (const [c, rx, ry] of drawn) for (let yy = -ry; yy < ry; yy += Math.max(3, P.layers * s)) for (let xx = -rx; xx < rx; xx++) if (sp.get(c[0] + xx, c[1] + yy) === M.LEAF) sp.recolour(c[0] + xx, c[1] + yy, M.LEAF3); // dark lines between layers
  for (const [c, rx, ry] of drawn) leafTexture(sp, c, rx, ry, r, sty ? { ...P.tex, flecks: 0 } : P.tex || {}); // (stylised: no pale flecks across the crown; its dots stay)
  if (sty) clusterLeaves(sp);
  return trim(sp, bx, crownY + 4 * s);
}

// Life on the trunk, below the crown: what the bottom half (ground mode) carries besides bare wood. Ivy
// climbing the trunk, moss at its foot, epicormic sprigs (little leaf clumps hugging the bark), low side
// boughs with a leaf clump, and a skirt of drooping lower boughs (yew, holly, the conifers). It is drawn
// after the tree, only onto empty or wooden pixels at least a margin below the crown line, so the canopy
// (the top half) is untouched; the pixels it adds are listed in sp.low, and splitTree puts them in the
// bottom half. Saplings and young trees are leafier, almost to the ground; dead trees keep only ivy and moss.
const LOW_MARGIN = 6;
function lowLife(t, r, st, s, P) {
  const { sp, crownY } = t, W = sp.w, H = sp.h, low = sp.low || (sp.low = new Uint8Array(W * H));
  const y0 = Math.ceil(crownY + LOW_MARGIN * s); if (y0 >= H - 2) return t;
  const rel = s / (st.treeSize * 2 / (st.pixel || 2)), youth = Math.max(0, Math.min(1, (1 - rel) / .5)), bare = !!st.treeBare;
  const runs = y => { const out = []; let a = -1; for (let x = 0; x <= W; x++) { const w = x < W && WOOD.has(sp.m[y * W + x]); if (w && a < 0) a = x; if (!w && a >= 0) { out.push([a, x - 1]); a = -1; } } return out; };
  const near = (rs, x) => rs.reduce((b, q) => !b || Math.abs((q[0] + q[1]) / 2 - x) < Math.abs((b[0] + b[1]) / 2 - x) ? q : b, null);
  // draws f, then keeps only what landed on empty or wooden pixels below the margin, and lists it
  const draw = f => {
    const m0 = sp.m.slice(), n0 = sp.n.slice(), b0 = sp.blob?.slice(); f();
    if (sp.blob) { if (b0) sp.blob.set(b0); else sp.blob.fill(0); } // the life below sways by the wind's cells, its foot still, not as the crown's whole blobs
    for (let i = 0; i < m0.length; i++) if (sp.m[i] !== m0[i]) {
      const y = (i / W) | 0;
      if (y < y0 || (m0[i] && !WOOD.has(m0[i]) && !low[i])) { sp.m[i] = m0[i]; sp.n[i * 3] = n0[i * 3]; sp.n[i * 3 + 1] = n0[i * 3 + 1]; sp.n[i * 3 + 2] = n0[i * 3 + 2]; }
      else low[i] = 1;
    }
  };
  const spot = () => { for (let k = 0; k < 8; k++) { const y = Math.round(uni(r, y0, H - 3)), rs = runs(y); if (rs.length) { const q = pick(r, rs), side = r() < .5 ? -1 : 1; return { x: side < 0 ? q[0] : q[1], y, side }; } } return null; };
  const leafy = bare ? 0 : 1, gy = H - 1;
  let cx0 = W, cx1 = 0; for (let i = 0; i < y0 * W; i++) if (sp.m[i] && !WOOD.has(sp.m[i])) { const x = i % W; cx0 = Math.min(cx0, x); cx1 = Math.max(cx1, x); }
  const reach = Math.max(6 * s, (cx1 - cx0) * .22); // low boughs and skirts stay well inside the crown's spread: no wall of leaves
  // moss: the foot of the trunk and the roots go green on their upper, shaded side
  if (P.moss) draw(() => { for (let y = Math.max(y0, Math.round(H - (H - y0) * .4)); y < H; y++) for (let x = 0; x < W; x++) { const i = y * W + x; if (!WOOD.has(sp.m[i])) continue; const up = y > 0 && !sp.m[i - W], v = vnoise(x / 2.5, y / 2.5, 41); if (v > 1 - P.moss * (.35 + .4 * (y - y0) / (H - y0)) || (up && hash2(x, y, 9) < P.moss * .6)) sp.m[i] = hash2(x, y, 5) < .3 ? M.LEAF2 : M.LEAF; } });
  // ivy: a stem winding up the trunk, dark glossy leaves either side
  if (P.ivy && r() < .35 + P.ivy * .6) draw(() => {
    let x = W / 2; const top = gy - (gy - y0) * uni(r, .45, .95) * Math.min(1, P.ivy + .3), ph = r() * 6;
    for (let y = gy - 1; y > top; y--) {
      const q = near(runs(y), x); if (!q) break;
      x = q[0] + (q[1] - q[0]) * (.5 + .48 * Math.sin(y * .22 + ph));
      sp.px(x, y, M.LEAF3, 0, 0, 1);
      if (hash2(Math.round(x), y, 13) < .45) { const d = hash2(y, 3, 2) < .5 ? -1 : 1; sp.px(x + d, y, M.LEAF, d * .5, -.3, .8); sp.px(x + d * 2, y, M.LEAF3, d * .6, 0, .8); sp.px(x + d, y - 1, hash2(x, y, 4) < .4 ? M.LEAF2 : M.LEAF3, 0, -.6, .8); }
    }
  });
  // epicormic sprigs: little clumps on the bark
  const nSprig = Math.round(P.sprigs * leafy * (5 + 8 * youth) * (H - y0) / (40 * s));
  for (let k = 0; k < nSprig; k++) { const p = spot(); if (!p) break; const rr = uni(r, 3, 5.5) * s; draw(() => clump(sp, [p.x + p.side * rr * .6, p.y], rr, rr * .75, st, r, { mat: r() < .4 ? M.LEAF3 : M.LEAF, ragged: .8 })); }
  // low boughs: a short side branch reaching out and up, a leaf clump at its end
  const nBough = Math.round(P.boughs * leafy * (3 + 4 * youth) * (H - y0) / (45 * s) + (r() < P.boughs * leafy ? 1 : 0));
  for (let k = 0; k < nBough; k++) { const p = spot(); if (!p) break; draw(() => { const b = bough(sp, [p.x, p.y], -Math.PI / 2 + p.side * uni(r, .9, 1.35), Math.min(reach, uni(r, 10, 20) * s), 2 * s, 1, st, r, { group: 12, mat: M.TRUNK }); const rr = uni(r, 6, 9.5) * s; clump(sp, add(b.end, [0, -1 * s]), rr, rr * .65, st, r, { mat: r() < .4 ? M.LEAF3 : M.LEAF }); }); }
  // a skirt: drooping lower boughs near the ground, with gaps between them
  if (P.skirt && leafy) {
    const nS = Math.round(3 + P.skirt * 5 + youth * 3);
    for (let k = 0; k < nS; k++) draw(() => {
      const y = Math.round(uni(r, Math.max(y0, H - (H - y0) * .8), H - 4 * s)), q = near(runs(y), W / 2); if (!q) return;
      const side = k % 2 ? 1 : -1, x = side < 0 ? q[0] : q[1], L = Math.min(reach * 1.3, uni(r, 14, 24) * s * (.6 + P.skirt * .5));
      const b = bough(sp, [x, y], -Math.PI / 2 + side * uni(r, 1.6, 1.95), L, 1.6 * s, 1, st, r, { group: 12, mat: M.BARKD });
      clump(sp, lerp2([x, y], b.end, .6), L * .5, 3.5 * s, st, r, { mat: r() < .5 ? M.LEAF3 : M.LEAF, ragged: 1.2 });
    });
  }
  clusterClumps(sp);
  return t;
}
// Every tree kind an area can name, grown from its genome (art/flora/genomes.js): its generator and params, the style
// it bends, its life below the crown and its look: hue (added to the area's leaf hue), saturation and value of the
// leaves, the trunk's colour, how it grows across the height classes (wide, narrow, small, willow, normal), and what
// it is. The first six are the original kinds.
const TREE_GENERATORS = { broadleaf, blob: blobTree };
const MAT_PARAMS = ["trunkMat", "limbMat"]; // material names in a genome, as M's numbers
function genomeParams(P) { const out = { ...P }; for (const k of MAT_PARAMS) if (typeof P[k] === "string") out[k] = M[P[k]]; return out; }
// A genome's tree, without its life below the crown. A bespoke generator's own record, with no style rules, is the
// generator itself (it reads that record's params by default), so the original six still name their species when
// passed around as functions, as chooseType does.
function genomeTree(id, g) {
  const gen = TREE_GENERATORS[g.generator], P = genomeParams(g.params);
  if (!gen) throw new Error(`no tree generator "${g.generator}"`);
  if (!g.style && TREE_GENERATORS[id] === gen) return gen;
  return (r, st, s) => gen(r, genomeStyle(st, g.style), s, P);
}
export const TREE_SPECIES = {};
for (const [id, g] of Object.entries(PLANT_GENOMES)) {
  if (g.species === false) continue; // only a TREE_TYPES kind (the tree fern), never an area's species
  const bare = genomeTree(id, g);
  TREE_SPECIES[id] = { fn: (r, st, s) => lowLife(bare(r, st, s), r, st, s, g.low || {}), bare, name: g.name, grow: g.grow, blob: true, ...g.colour }; // blob: drawn in leaf stamps, every species now (broadleaf's clumps too), so the pixel-art ramp applies // every species' trees carry their life below the crown; bare draws without it
}
// The species a flora preview names (the game's ?flora=, the lab): "new" the genome generator's species, "fantasy" its fantasy
// ones, "all" every species, or a comma list of ids; unknown ids are left out.
export function floraPick(q) {
  if (!q) return [];
  const ids = Object.keys(TREE_SPECIES), blob = ids.filter(id => PLANT_GENOMES[id]?.generator === "blob");
  if (q === "new") return blob;
  if (q === "fantasy") return blob.filter(id => PLANT_GENOMES[id].fantasy);
  if (q === "all") return ids;
  return q.split(",").map(x => x.trim()).filter(x => TREE_SPECIES[x]);
}
// the original six kinds by their old names (the style's tree-type knobs, the lab): grown from their genomes by the blob generator now
export const broadTree = TREE_SPECIES.broad.bare, firTree = TREE_SPECIES.fir.bare, willowTree = TREE_SPECIES.willow.bare, birchTree = TREE_SPECIES.birch.bare, flatTree = TREE_SPECIES.flat.bare, palmTree = genomeTree("palm", PLANT_GENOMES.palm);
const SPECIES_BY_FN = new Map(Object.entries(TREE_SPECIES).flatMap(([id, S]) => [[S.fn, { id, ...S }], [S.bare, { id, ...S }]]));
export const treeSpecies = type => TREE_SPECIES[type] || TREE_SPECIES.broad;
// What a species' canopy looks like from the treetops, as numbers: its crown (the top half of a mature
// tree, averaged over a few seeds): fill (how much of the crown's box is leaves), dark and light (the shares
// of shadow and lit leaves), grain (the mean run of one leaf shade along a row, in px: the clump texture),
// shape (the crown's width over its height), and its leaf colour's hue and value. For telling species apart.
export function crownStats(id, st, { seeds = 3 } = {}) {
  const S = treeSpecies(id), K = 2 / (st.pixel || 2), acc = { fill: 0, dark: 0, light: 0, grain: 0, shape: 0, hue: 0, value: 0 }, LEAVES = [M.LEAF, M.LEAF2, M.LEAF3];
  for (let k = 0; k < seeds; k++) {
    const r = rngLocal(11 + k * 97), t = S.fn(r, { ...st }, st.treeSize * K), { top } = splitTree(t), sp = top;
    let x0 = sp.w, x1 = -1, y0 = sp.h, y1 = -1, n = 0, dark = 0, light = 0, runs = 0, runPx = 0, prev = 0;
    for (let y = 0; y < sp.h; y++) { prev = 0; for (let x = 0; x < sp.w; x++) { const m = sp.m[y * sp.w + x]; if (!LEAVES.includes(m)) { prev = 0; continue; } n++; if (m === M.LEAF3) dark++; if (m === M.LEAF2) light++; if (m !== prev) runs++; runPx++; prev = m; x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); } }
    const w = x1 - x0 + 1, h = y1 - y0 + 1, c = treeColours(rngLocal(3), { ...st, leafVariety: 0 }, S.fn), [hh, , vv] = rgb2hsv(c[M.LEAF]);
    acc.fill += n / Math.max(1, w * h); acc.dark += dark / Math.max(1, n); acc.light += light / Math.max(1, n); acc.grain += runPx / Math.max(1, runs); acc.shape += w / Math.max(1, h); acc.hue += hh; acc.value += vv;
  }
  for (const k in acc) acc[k] = +(acc[k] / seeds).toFixed(3);
  return acc;
}
function rngLocal(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function rgb2hsv([r, g, b]) { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; let h = 0; if (d) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; return [(h / 6 + 1) % 1, mx ? d / mx : 0, mx]; }

export const TREE_TYPES = [["wBroad", broadTree], ["wFir", firTree], ["wWillow", willowTree], ["wBirch", birchTree], ["wPalm", palmTree], ["wFlat", flatTree]];
export function chooseType(r, st) {
  const tot = TREE_TYPES.reduce((a, [k]) => a + st[k], 0) || 1; let x = r() * tot;
  for (const [k, f] of TREE_TYPES) { x -= st[k]; if (x <= 0) return f; }
  return broadTree;
}
// The night palette (the art director, round 1, after Ed's "a spooky dark forest with a party in it": a dark blue-green and violet
// forest, no lime): a green hue pulled toward blue-green, compressed into .34 to .44; golds, browns, blues and violets left alone.
export const nightGreen = h => (h >= .17 && h < .42 ? .34 + (h - .17) * .4 : h);
export function treeColours(r, st, type, blob = false) {
  const S = SPECIES_BY_FN.get(type), sa = S?.sat || 1, va = (S?.val || 1) * (st.leafVal ?? 1); // leafVal: an area's palette, brighter or darker leaves
  // a species shifts the area's leaf hue a little; towards yellow it shifts less where the area's leaves are already yellow, so no species turns an area autumnal
  const sh0 = S?.hue || 0, sh = sh0 < 0 ? sh0 * Math.max(0, Math.min(1, (st.leafHue - .17) / .09)) : sh0, h = nightGreen((S?.hueAbs ?? st.leafHue) + (r() - .5) * st.leafVariety * .7 + sh); // hueAbs: a hue of its own, whatever the area's; never lime (nightGreen)
  const c = {
    [M.TRUNK]: hsv2rgb(st.trunkHue, .45 * st.sat, .34), [M.BARKD]: hsv2rgb(st.trunkHue + .03, .5 * st.sat, .17), [M.BARKL]: hsv2rgb(st.trunkHue - .01, .38 * st.sat, .5), [M.BARK2]: [222, 220, 212],
    [M.LEAF]: hsv2rgb(h, Math.min(1, .62 * st.sat * sa), Math.min(1, .58 * va)), [M.LEAF2]: hsv2rgb(h - .05, Math.min(1, .46 * st.sat * sa), Math.min(1, .68 * va)), /* (the night palette: the lit tone quieter, so a lit crown never glows) */ [M.LEAF3]: hsv2rgb(h + .03, Math.min(1, .66 * st.sat * sa), .38 * va), [M.WEB]: [225, 225, 232],
  };
  if (st.artStyle && (S?.blob || blob)) { // the pixel-art ramp (the blob generator's trees; bake's post-pass does the rest) (docs/ART-GUIDE.md section 0): 3 hue-shifted tones per material, the shadow deeper, more saturated and
    // towards blue-violet, the light pale and towards cream; "ref" (Ed's reference, rung 6) keeps one tone family, "bold" (rung 3/4) shifts further
    const ref = st.artStyle === "ref", ls = Math.min(1, .62 * st.sat * sa), lv = Math.min(1, .58 * va);
    c[M.LEAF3] = hsv2rgb(h + (ref ? .035 : .07), Math.min(1, ls * 1.25), lv * .52);
    c[M.LEAF2] = hsv2rgb(h - (ref ? .045 : .08), ls * (ref ? .5 : .62), Math.min(1, lv * 1.5));
    c[M.BARKD] = hsv2rgb(st.trunkHue - (ref ? .02 : .04), Math.min(1, .6 * st.sat), .15); // bark's shadow towards red-brown
    c[M.BARKL] = hsv2rgb(st.trunkHue + (ref ? .03 : .05), .26 * st.sat, .56);            // and its light towards cream
  }
  if (S?.trunk) c[M.BARK2] = hsv2rgb(...S.trunk); // smooth grey or brown bark (beech, rowan, holly, hazel)
  if (S?.upper) c[M.BELLY] = hsv2rgb(...S.upper); // a pine's orange upper trunk, a yew's red
  if (S?.dot) c[M.FLOWER] = S.dot; // berries, candles
  if (S?.glow) c[M.GLOW] = S.glow; // glowing gills and spots, buds on vines
  if (S?.glint) c[M.GLINT] = S.glint; // a crystal's glints
  return c;
}
// The trunk was drawn with its roots and bark; this stays for callers of the old API.
export function finishTree(t) { return t; }
export function splitTree(t) { // bottom = wood below the crown line and the life on it; top = everything else
  const { sp, crownY } = t, top = new Sprite(sp.w, sp.h), bot = new Sprite(sp.w, sp.h);
  for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) {
    const i = y * sp.w + x, m = sp.m[i]; if (!m) continue;
    const dst = (WOOD.has(m) && y >= crownY) || sp.low?.[i] ? bot : top; // low: the foliage lowLife put below the crown
    dst.put(x, y, m, sp.n[i * 3], sp.n[i * 3 + 1], sp.n[i * 3 + 2]);
    if (sp.blob?.[i]) (dst.blob || (dst.blob = new Uint8Array(sp.w * sp.h)))[i] = sp.blob[i];
  }
  underTrunk(sp, crownY, bot);
  if (sp.stylised) top.stylised = bot.stylised = sp.stylised; // drawn stylised already: bake leaves it be
  return { top, bot };
}
// A crown reaching nearly to the ground (a fir's, a cedar's), or leaves hanging over the trunk (a willow's, a yew's), hide the trunk, so the
// bottom half kept a stub of wood, and in ground mode, where the crowns are cut away round her, a forest of them showed no
// trunks at all, only the crowns' haze further off (Ed, 2026-10-06: "In a forest in Norway area, no tree trunks"). Then the
// bottom half carries the trunk the leaves hide, up to TRUNK_UNDER of the tree's height: the wood of its highest visible row
// below that (two pixels wide or more) carried straight up, each pixel lit as that row's is (so it stays round). The top half is untouched.
const LOW_CROWN = .3, TRUNK_UNDER = .32;
function underTrunk(sp, crownY, bot) {
  const W = sp.w, H = sp.h;
  const y1 = Math.max(0, Math.round(H * (1 - TRUNK_UNDER)));
  // (a crown low over its trunk, or leaves hanging over it, a willow's curtain, a yew's skirt: whatever its crown line, the bottom
  // half holding under two pixels a row over that height)
  let kept = 0;
  for (let i = y1 * W; i < H * W; i++) if (bot.m[i]) kept++;
  if (H - crownY >= H * LOW_CROWN && kept >= (H - y1) * 2) return;
  // (the highest row of it showing, from the carried trunk's top down: the trunk itself, not its foot flaring into roots)
  let row = -1, xs = [];
  for (let y = y1; y < H && xs.length < 2; y++) {
    const here = [];
    for (let x = 0; x < W; x++) if (WOOD.has(sp.m[y * W + x])) here.push(x);
    if (here.length > xs.length) { xs = here; row = y; }
  }
  const col = x => row >= 0 ? { m: sp.m[row * W + x], n: [sp.n[(row * W + x) * 3], sp.n[(row * W + x) * 3 + 1], sp.n[(row * W + x) * 3 + 2]] } : null;
  if (!xs.length) { const c = Math.floor(W / 2); xs = [c - 1, c]; } // (none showing at all: a plain trunk up its middle)
  for (const x of xs) {
    const c = col(x) ?? { m: M.TRUNK, n: x < W / 2 ? [-.6, 0, .8] : [.6, 0, .8] };
    for (let y = y1; y < H; y++) if (!bot.m[y * W + x]) bot.px(x, y, c.m, c.n[0], c.n[1], c.n[2]);
  }
}

// ================= undergrowth =================
// Bushes: round leafy mounds (some flowering), ferns, grass tufts and shrubs, grown from their genomes (BUSH_GENOMES).
export function bush(r, st, kind = pick(r, BUSH_KINDS)) { // (kind: one of BUSH_GENOMES, for the sheets)
  const s = st.bushSize, g = BUSH_GENOMES[kind];
  const sp = blobBush(r, st, s, g.params), c = treeColours(r, st, null, true); c[M.FLOWER] = hsv2rgb(r(), .55, .95);
  return { sp, colours: c };
}
