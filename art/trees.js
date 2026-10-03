// Witch trees and bushes, drawn with the same toolkit as the animals: trunks and branches
// are smooth tapering limbs that twist and fork, crowns are clumps of leaves (closed,
// ragged outlines, shaded light on top and dark beneath), roots spread over the ground,
// and bark is carved into the trunk. Six kinds, after Ed's references: gnarled broadleaf,
// willow, birch, tree fern, tiered fir and flat-crowned maple.
// Each tree returns {sp, crownY}: trunk pixels below crownY are its bottom half (seen in
// ground mode), everything else its top half (the canopy seen from the treetops).
import { M, Sprite, uni, pick, hash2, vnoise, hsv2rgb, tufts, rot, lerp2, add } from "./core.js";

const WOOD = new Set([M.TRUNK, M.BARK2, M.BARKD, M.BARKL, M.BELLY]); // BELLY: a pine's orange or a yew's red trunk

// A clump of leaves: a ragged blob, lit on top, dark beneath, speckled with single leaves.
function clump(sp, c, rx, ry, st, r, { mat = M.LEAF, group = 30, ragged = 1 } = {}) {
  const n = 9, pts = [];
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2, k = 1 + (r() - .5) * .35 * (st.clump + .3);
    pts.push([c[0] + Math.cos(a) * rx * k, c[1] + Math.sin(a) * ry * k * (Math.sin(a) > 0 ? .8 : 1)]);
  }
  const bumps = Math.max(1, Math.round(Math.min(rx, ry) / 3.5));
  sp.shape(tufts(pts, 0, n, bumps, Math.max(1.2, Math.min(rx, ry) * .14) * ragged, 1), mat, { group, line: false, round: st.round });
  // shading: a dark underside, a lit crown
  sp.mark([add(c, [-rx * 1.1, ry * .15]), add(c, [rx * 1.1, ry * .1]), add(c, [rx * 1.1, ry * 1.2]), add(c, [-rx * 1.1, ry * 1.2])], M.LEAF3, [mat]);
  sp.mark([add(c, [-rx * .75, -ry * .55]), add(c, [rx * .25, -ry * .95]), add(c, [rx * .55, -ry * .35]), add(c, [-rx * .2, -ry * .05])], M.LEAF2, [mat]);
  // single leaves: a speckle of light and dark, denser with the style's foliage density
  const x0 = Math.floor(c[0] - rx * 1.2), x1 = Math.ceil(c[0] + rx * 1.2), y0 = Math.floor(c[1] - ry * 1.2), y1 = Math.ceil(c[1] + ry * 1.2), seed = (r() * 1e4) | 0;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const m = sp.get(x, y); if (m !== mat && m !== M.LEAF2 && m !== M.LEAF3) continue;
    const h = hash2(x, y, seed);
    const v = vnoise(x / 2, y / 2, seed) * .5 + h * .5; // leaves come in little bunches, not noise
    if (v < .16 * st.density) sp.recolour(x, y, m === M.LEAF2 ? mat : M.LEAF2);
    else if (v > 1 - .16 * st.density) sp.recolour(x, y, m === M.LEAF3 ? mat : M.LEAF3);
  }
}

// A wooden limb along a wobbling path from p, heading `ang` (0 = right, -PI/2 = up).
function bough(sp, p, ang, len, w0, w1, st, r, { mat = M.TRUNK, bend = 1, group = 10, line = false } = {}) {
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
function roots(sp, bx, gy, w, st, r, s) {
  // the foot of the trunk flares out where it meets the ground
  sp.shape([[bx - w * 1.05, gy], [bx - w * .62, gy - w * .5], [bx - w * .45, gy - w * 1.4], [bx + w * .45, gy - w * 1.4], [bx + w * .62, gy - w * .5], [bx + w * 1.05, gy]], M.TRUNK, { group: 10, round: st.round });
  if (st.roots <= 0) return;
  const n = Math.round(2 + st.roots * 4);
  for (let i = 0; i < n; i++) {
    const side = i % 2 ? 1 : -1, L = (8 + r() * 16) * s * (.4 + st.roots), lift = (2 + r() * 3) * s;
    const a = [bx + side * w * .2, gy - w * .5], b = [bx + side * (w * .55 + L * .4), gy - lift], c = [bx + side * (w * .5 + L), gy - .5];
    sp.limb([[...a, w * .55], [...b, w * .28], [...c, 1.2]], M.TRUNK, { group: 11, round: st.round, cap: .5, capEnd: .6 });
  }
}

// Bark: dark crevices running along the wood, with lit ridges beside them.
function bark(sp, st, vertical = true) {
  if (st.bark <= 0) return;
  for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) {
    const i = y * sp.w + x; if (sp.m[i] !== M.TRUNK) continue;
    const v = vertical ? vnoise(x / 1.3, y / 6, 21) : vnoise(x / 6, y / 1.3, 21);
    if (v > 1 - st.bark * .42 || hash2(x, y, 4) < st.bark * .05) sp.m[i] = M.BARKD;
    else if (v > 1 - st.bark * .62 && sp.n[i * 3] < -.1) sp.m[i] = M.BARKL;
  }
}

// Trims empty margins, keeping the ground row at the bottom and the base at the centre.
function trim(sp, bx, crownY) {
  let x0 = sp.w, x1 = -1, y0 = sp.h;
  for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); }
  if (x1 < 0) return { sp, crownY };
  const half = Math.max(bx - x0, x1 - bx) + 2, nx0 = Math.max(0, Math.floor(bx - half)), w = Math.min(sp.w - nx0, Math.ceil(half * 2) + 1), ny0 = Math.max(0, y0 - 1), h = sp.h - ny0;
  const out = new Sprite(w, h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y + ny0) * sp.w + x + nx0, j = y * w + x;
    out.m[j] = sp.m[i]; out.g[j] = sp.g[i]; out.n[j * 3] = sp.n[i * 3]; out.n[j * 3 + 1] = sp.n[i * 3 + 1]; out.n[j * 3 + 2] = sp.n[i * 3 + 2];
  }
  return { sp: out, crownY: crownY - ny0 };
}
const spread = st => (st.crownWidth || 3) / 3;

// Gnarled broadleaf: a twisting trunk forking low into heavy limbs, a wide crown of clumps
// with the branches showing between them.
export function broadTree(r, st, s) {
  const k = spread(st), W = Math.round(220 * s * k + 60 * s), H = Math.round(140 * s), sp = new Sprite(W, H), bx = W / 2, gy = H;
  // options an area type may set: treeTrunks (several from one root), treeLean, treeThick,
  // treeThin, treeBare (dead, no leaves), treeHollow (a dark hollow), treeWebs (hung with webs)
  const n = st.treeTrunks || 1, tw = 12 * s * (st.treeThick || 1) * (st.treeThin ? .55 : 1) / Math.sqrt(n), lean0 = (r() - .5) * .5 * st.gnarl + (st.treeLean || 0);
  const tips = [];
  let crownY = H;
  const grow = (p, ang, len, w, d) => {
    const b = bough(sp, p, ang, len, w, w * .65, st, r, { group: 12 });
    if (d === 0) { tips.push(b.end); return; }
    const kids = r() < .35 ? 3 : 2;
    for (let i = 0; i < kids; i++) {
      const da = (i - (kids - 1) / 2) * uni(r, .5, .85) * (d === 3 ? 1.4 : 1);
      grow(b.end, b.ang + da + (r() - .5) * .25, len * uni(r, .6, .78), w * .62, d - 1);
    }
    if (d <= 2) tips.push(lerp2(p, b.end, .7));
  };
  for (let t = 0; t < n; t++) {
    const lean = lean0 + (n > 1 ? (t / (n - 1) - .5) * .8 : 0), base = [bx + (t - (n - 1) / 2) * tw * .6, gy];
    const trunk = bough(sp, base, -Math.PI / 2 + lean, H * .36 * (n > 1 ? uni(r, .75, 1.15) : 1), tw, tw * .72, st, r, { bend: 1.4 });
    crownY = Math.min(crownY, trunk.end[1]);
    // the first limbs spread wide: Ed asked for broad crowns
    for (const side of [-1, 1]) grow(trunk.end, -Math.PI / 2 + lean * .5 + side * uni(r, .55, .95) * (.7 + .3 * k) * (n > 1 ? .6 : 1), H * .22 * (.75 + .25 * k) * (n > 1 ? .7 : 1), tw * .7, n > 2 ? 2 : 3);
    if (n === 1 && r() < .7) grow(trunk.end, -Math.PI / 2 + (r() - .5) * .3, H * .18, tw * .55, 2);
    if (t === 0 && st.treeHollow) { const h = lerp2(base, trunk.end, .38); sp.ellipse(h[0], h[1], tw * .28, tw * .5, M.NOSE, { round: .3 }); }
  }
  roots(sp, bx, gy, tw * Math.sqrt(n), st, r, s);
  bark(sp, st);
  if (st.treeWebs) for (let i = 0; i + 1 < tips.length; i += 2) { const a = tips[i], c = tips[i + 1], L = Math.hypot(c[0] - a[0], c[1] - a[1]); if (L < 40 * s) for (let j = 0; j <= L; j++) { const p = lerp2(a, c, j / L); sp.px(p[0], p[1] + Math.sin(j / L * Math.PI) * L * .15, M.WEB, 0, 0, 1); } }
  if (st.treeBare) return trim(sp, bx, crownY + 4 * s);
  // clumps at the tips: back ones darker first, then the front
  tips.sort((a, b) => a[1] - b[1]);
  for (const t of tips) clump(sp, add(t, [0, -3 * s]), uni(r, 14, 21) * s, uni(r, 10, 14) * s, st, r, { mat: r() < .35 ? M.LEAF3 : M.LEAF });
  for (const t of tips) if (r() < .75) clump(sp, add(t, [uni(r, -9, 9) * s, uni(r, -12, -3) * s]), uni(r, 10, 15) * s, uni(r, 7, 10) * s, st, r);
  return trim(sp, bx, crownY + 4 * s);
}

// Tiered fir: a straight trunk and drooping skirts of branches, narrowing to a spire.
export function firTree(r, st, s) {
  const k = .8 + .2 * spread(st), W = Math.round(90 * s * k), H = Math.round(160 * s), sp = new Sprite(W, H), bx = W / 2, gy = H;
  sp.limb([[bx, gy, 6 * s], [bx, gy - H * .5, 4 * s], [bx, 6 * s, 1.5]], M.TRUNK, { group: 10, round: st.round });
  roots(sp, bx, gy, 6 * s, st, r, s * .6);
  bark(sp, st);
  const tiers = Math.round(uni(r, 9, 12));
  for (let i = tiers - 1; i >= 0; i--) {
    const f = i / (tiers - 1), y = 6 * s + f * H * .7, half = (5 + f * 36) * s * k * uni(r, .9, 1.1), droop = (5 + f * 13) * s;
    const pts = [[bx, y - 4 * s], [bx + half * .5, y + droop * .3], [bx + half, y + droop], [bx + half * .7, y + droop * 1.15], [bx, y + droop * .7], [bx - half * .7, y + droop * 1.15], [bx - half, y + droop], [bx - half * .5, y + droop * .3]];
    sp.shape(tufts(pts, 1, 7, Math.max(2, Math.round(half / (3 * s))), 2 * s, 1), M.LEAF, { group: 30 + i, line: false, round: st.round });
    sp.mark([[bx - half, y + droop * .55], [bx + half, y + droop * .55], [bx + half, y + droop * 1.4], [bx - half, y + droop * 1.4]], M.LEAF3, [M.LEAF]);
    sp.mark([[bx - half * .55, y - 2 * s], [bx + half * .1, y - 3 * s], [bx + half * .1, y + droop * .45], [bx - half * .7, y + droop * .7]], M.LEAF2, [M.LEAF]);
  }
  return trim(sp, bx, H * .82);
}

// Willow: a short, heavy trunk, limbs arching out, and a curtain of hanging strands.
export function willowTree(r, st, s) {
  const k = spread(st), W = Math.round(200 * s * k + 50 * s), H = Math.round(130 * s), sp = new Sprite(W, H), bx = W / 2, gy = H;
  const tw = 13 * s;
  const trunk = bough(sp, [bx, gy], -Math.PI / 2 + (r() - .5) * .3, H * .3, tw, tw * .8, st, r, { bend: 1.6 });
  const arcs = [];
  for (let i = 0; i < 5; i++) {
    const side = i % 2 ? 1 : -1, a = -Math.PI / 2 + side * uni(r, .55, 1.25) * (.7 + .3 * k);
    const b = bough(sp, trunk.end, a, H * uni(r, .3, .42) * (.8 + .2 * k), tw * .55, tw * .3, st, r, { group: 12 });
    arcs.push(b.end);
  }
  roots(sp, bx, gy, tw, st, r, s);
  bark(sp, st);
  // the crown's top: low domed clumps over the limbs
  for (const p of arcs) clump(sp, add(p, [0, -2 * s]), uni(r, 20, 28) * s, uni(r, 9, 12) * s, st, r);
  clump(sp, add(trunk.end, [0, -8 * s]), 24 * s, 11 * s, st, r);
  // strands: thin hanging lines, in two shades, swaying slightly
  let x0 = W, x1 = 0; for (const p of arcs) { x0 = Math.min(x0, p[0] - 22 * s); x1 = Math.max(x1, p[0] + 22 * s); }
  for (let x = x0; x < x1; x += uni(r, 1, 1.7)) {
    let top = H; for (let y = 0; y < H; y++) if (sp.get(x, y) === M.LEAF || sp.get(x, y) === M.LEAF2 || sp.get(x, y) === M.LEAF3) { top = y; break; }
    if (top >= H) continue;
    const d = Math.abs(x - bx) / (W / 2), len = (gy - top) * uni(r, .5, .9) * (1 - d * .3), mat = hash2(x | 0, 1, 9) < .4 ? M.LEAF2 : M.LEAF;
    for (let y = top + 2; y < Math.min(gy - 2, top + len); y++) {
      const sway = Math.round(Math.sin(y * .12 + x) * .7);
      if (hash2(x | 0, y, 5) < .2 + st.density * .8) sp.px(x + sway, y, (y - top) / len > .8 ? M.LEAF3 : mat, sway * .3, .2, .95);
    }
  }
  return trim(sp, bx, trunk.end[1] + 6 * s);
}

// Birch: a slender pale trunk banded with black, thin branches, light airy clumps.
export function birchTree(r, st, s) {
  const k = .7 + .3 * spread(st), W = Math.round(110 * s * k), H = Math.round(155 * s), sp = new Sprite(W, H), bx = W / 2, gy = H;
  const lean = (r() - .5) * .25 + (st.treeLean || 0);
  const trunk = bough(sp, [bx, gy], -Math.PI / 2 + lean, H * .85, 5 * s, 2 * s, st, r, { mat: M.BARK2, bend: .4 });
  // black marks across the white bark
  for (let i = 0; i < trunk.pts.length - 1; i++) for (let t = 0; t < 1; t += 1 / 8) {
    const p = lerp2(trunk.pts[i], trunk.pts[i + 1], t + r() * .1);
    if (r() < .55) for (let dx = -3; dx <= 3; dx++) if (sp.get(p[0] + dx, p[1]) === M.BARK2 && r() < .8) sp.recolour(p[0] + dx, p[1], M.BARKD);
  }
  const tips = [trunk.end];
  for (let i = 0; i < 7; i++) {
    const f = uni(r, .35, .9), p = lerp2(trunk.pts[0], trunk.end, f), side = i % 2 ? 1 : -1;
    const b = bough(sp, p, -Math.PI / 2 + side * uni(r, .5, 1.0), H * uni(r, .12, .2) * k, 2 * s, 1, st, r, { mat: M.BARKD, group: 12 });
    tips.push(b.end);
  }
  for (const t of tips) clump(sp, t, uni(r, 9, 13) * s * k, uni(r, 7, 10) * s, st, r, { mat: M.LEAF2, ragged: 1.3 });
  return trim(sp, bx, H * .55);
}

// Tree fern: a fibrous trunk and a crown of arching fronds, a fiddlehead curled at the top.
export function palmTree(r, st, s) {
  const k = .8 + .2 * spread(st), W = Math.round(150 * s * k), H = Math.round(140 * s), sp = new Sprite(W, H), bx = W / 2, gy = H;
  const bend = uni(r, -14, 14) * s, top = [bx + bend, H * .3];
  const spine = []; for (let i = 0; i <= 6; i++) { const f = i / 6; spine.push([bx + bend * f * f, gy - (gy - top[1]) * f, (7 - f * 2) * s]); }
  sp.limb(spine, M.TRUNK, { group: 10, round: st.round });
  for (let y = Math.round(top[1]); y < gy; y += Math.max(2, Math.round(3 * s))) for (let x = 0; x < W; x++) if (sp.get(x, y) === M.TRUNK) sp.recolour(x, y, M.BARKD); // the old frond scars
  const fronds = Math.round(uni(r, 9, 12));
  for (let i = 0; i < fronds; i++) {
    const a = -Math.PI / 2 + (i / (fronds - 1) - .5) * Math.PI * 1.35, len = uni(r, 36, 50) * s * k;
    let p = top.slice(), ang = a;
    const back = i % 2 === 0;
    for (let j = 0; j < len; j++) {
      const f = j / len; ang = a + Math.sign(Math.cos(a)) * f * 1.3 * Math.abs(Math.cos(a)) + (Math.abs(Math.cos(a)) < .3 ? f * .8 * Math.sign(i - fronds / 2) : 0);
      p = [p[0] + Math.cos(ang), p[1] + Math.sin(ang) + f * .9];
      sp.px(p[0], p[1], back ? M.LEAF3 : M.LEAF, Math.cos(ang) * .3, -.3, .9);
      const leaflet = (1 - f * .8) * 6 * s;
      if (j % 2) continue;
      for (let q = 1; q < leaflet; q++) {
        const nx = -Math.sin(ang), ny = Math.cos(ang);
        sp.px(p[0] + nx * q, p[1] + ny * q * .8 + q * .35, back ? M.LEAF3 : q > leaflet * .6 ? M.LEAF2 : M.LEAF, nx * .5, .3, .8);
        sp.px(p[0] - nx * q, p[1] - ny * q * .8 + q * .35, back ? M.LEAF3 : M.LEAF, -nx * .5, -.2, .85);
      }
    }
  }
  // the fiddlehead
  for (let t = 0; t < 10; t += .25) { const rr = (10 - t) * .4 * s, p = add(top, [Math.cos(t) * rr, -6 * s + Math.sin(t) * rr]); sp.px(p[0], p[1], M.LEAF2, 0, -.5, .85); }
  return trim(sp, bx, top[1] + 6 * s);
}

// Flat-crowned maple: a fork of spreading limbs under broad, flat layers of leaves.
export function flatTree(r, st, s) {
  const k = spread(st), W = Math.round(220 * s * k + 50 * s), H = Math.round(120 * s), sp = new Sprite(W, H), bx = W / 2, gy = H;
  const tw = 10 * s;
  const trunk = bough(sp, [bx, gy], -Math.PI / 2 + (r() - .5) * .4 * (st.gnarl + .3), H * .4, tw, tw * .75, st, r, { bend: 1.2 });
  const ends = [];
  for (const side of [-1, 1, -1, 1]) {
    const b = bough(sp, trunk.end, -Math.PI / 2 + side * uni(r, .7, 1.15) * (.7 + .3 * k), H * uni(r, .3, .42) * (.7 + .3 * k), tw * .55, tw * .25, st, r, { group: 12 });
    ends.push(b.end, lerp2(trunk.end, b.end, .55));
  }
  roots(sp, bx, gy, tw, st, r, s);
  bark(sp, st);
  const layers = Math.round(uni(r, 2, 3)), y0 = Math.min(...ends.map(p => p[1]));
  for (let i = 0; i < layers; i++) {
    const y = y0 - 6 * s + i * 9 * s, w = (95 - i * 12) * s * (.65 + .35 * k);
    for (let j = 0; j < 5; j++) clump(sp, [bx + (j - 2) * w * .36 + uni(r, -5, 5) * s, y + uni(r, -3, 3) * s], w * uni(r, .2, .26), 7 * s, st, r, { mat: i === layers - 1 ? M.LEAF : M.LEAF3 });
  }
  return trim(sp, bx, trunk.end[1] + 4 * s);
}


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
  if (!P.noRoots) roots(sp, bx, gy, tw * Math.sqrt(n), st, r, s * (P.rootK || 1));
  if (!P.smooth) bark(sp, st); // smooth-barked kinds (beech, rowan, hazel) keep their trunks plain
  if (st.treeBare) return trim(sp, bx, crownY + 4 * s);
  tips.sort((a, b) => a[1] - b[1]);
  const [ra, rb] = P.clumpR || [12, 18], flat = P.flat || .7, drawn = [];
  const put = (c, rx, ry, mat) => { clump(sp, c, rx, ry, st, r, { mat, ragged: P.ragged || 1 }); drawn.push([c, rx, ry]); };
  for (const t of tips) put(add(t, [0, -3 * s]), uni(r, ra, rb) * s, uni(r, ra, rb) * s * flat, r() < (P.darkBack ?? .35) ? M.LEAF3 : M.LEAF);
  for (const t of tips) if (r() < (P.extra ?? .7)) put(add(t, [uni(r, -9, 9) * s, uni(r, -12, -3) * s]), uni(r, ra, rb) * s * .7, uni(r, ra, rb) * s * flat * .7, M.LEAF);
  if (P.dome) { const top = Math.min(...tips.map(t => t[1])), xs = tips.map(t => t[0]), mid = (Math.min(...xs) + Math.max(...xs)) / 2, w = (Math.max(...xs) - Math.min(...xs)) / 2; for (let i = 0; i < P.dome; i++) { const f = i / Math.max(1, P.dome - 1) - .5; put([mid + f * w * 1.1, top - (1 - 4 * f * f) * 14 * s - uni(r, 2, 6) * s], uni(r, ra, rb) * s * 1.1, uni(r, ra, rb) * s * flat, M.LEAF); } } // an arched dome over the top
  if (P.layers) for (const [c, rx, ry] of drawn) for (let yy = -ry; yy < ry; yy += Math.max(3, P.layers * s)) for (let xx = -rx; xx < rx; xx++) if (sp.get(c[0] + xx, c[1] + yy) === M.LEAF) sp.recolour(c[0] + xx, c[1] + yy, M.LEAF3); // dark lines between layers
  for (const [c, rx, ry] of drawn) leafTexture(sp, c, rx, ry, r, P.tex || {});
  return trim(sp, bx, crownY + 4 * s);
}
// Oak: wide and lumpy, a short stout trunk forking low into heavy crooked limbs; many mid-sized clumps.
export function oakTree(r, st, s) { return broadleaf(r, { ...st, gnarl: Math.max(st.gnarl, .8) }, s, { trunk: .26, tw: 15, limbs: 3, spreadA: 1.05, limb: .26, depth: 3, wide: 1.15, clumpR: [10, 15], flat: .75, extra: .9, dome: 5, bend: 1.4, tex: { grain: 1.6, holes: .12, flecks: .18 } }); }
// Beech: a smooth grey trunk, a dense dome of flat layered sprays.
export function beechTree(r, st, s) { return broadleaf(r, { ...st, gnarl: st.gnarl * .4 }, s, { trunk: .4, tw: 11, limbs: 2, leader: 1.3, spreadA: .6, limb: .22, depth: 3, clumpR: [15, 21], flat: .5, extra: 1, dome: 7, smooth: 1, layers: 3.5, trunkMat: M.BARK2, limbMat: M.BARK2, tall: 155, tex: { grain: 3.5, holes: 0, flecks: .1 } }); }
// Ash: tall, open and airy, limbs swept upwards, small feathery clumps with sky between.
export function ashTree(r, st, s) { return broadleaf(r, { ...st, gnarl: st.gnarl * .6 }, s, { trunk: .4, tw: 9, limbs: 3, spreadA: .45, limb: .26, depth: 3, splay: .6, clumpR: [7, 10], flat: .8, extra: .35, ragged: 1.8, tall: 160, wide: .8, darkBack: .1, tex: { grain: 1.2, holes: .3, flecks: .26 } }); }
// Lime: tall, a high close dome of small neat clumps, bright.
export function limeTree(r, st, s) { return broadleaf(r, { ...st, gnarl: st.gnarl * .4 }, s, { trunk: .38, tw: 11, limbs: 2, spreadA: .55, limb: .24, depth: 3, leader: 1.1, clumpR: [9, 12], flat: .85, extra: 1, dome: 5, tall: 170, wide: .75, darkBack: .15, tex: { grain: 1.4, holes: .05, flecks: .22 } }); }
// Sycamore: a broad dome of big heavy lobed clumps, dark beneath.
export function sycamoreTree(r, st, s) { return broadleaf(r, st, s, { trunk: .34, tw: 12, limbs: 2, spreadA: .8, limb: .24, depth: 2, clumpR: [20, 27], flat: .7, extra: .8, dome: 2, darkBack: .5, tex: { grain: 4, holes: .16, flecks: .12 } }); }
// Horse chestnut: a big round dome of very large clumps, white candles of flowers standing on it.
export function chestnutTree(r, st, s) { return broadleaf(r, st, s, { trunk: .32, tw: 14, limbs: 2, spreadA: .85, limb: .25, depth: 2, clumpR: [22, 30], flat: .78, extra: .9, dome: 3, darkBack: .25, tall: 150, tex: { grain: 6, holes: .04, flecks: .16, dots: .025, dotTall: true } }); }
// Rowan: slim, a grey trunk, a light open crown of feathery leaves hung with red berries.
export function rowanTree(r, st, s) { return broadleaf(r, { ...st, gnarl: st.gnarl * .7 }, s, { trunk: .45, tw: 7, limbs: 3, spreadA: .55, limb: .2, depth: 2, clumpR: [8, 11], flat: .7, extra: .5, ragged: 1.7, wide: .6, tall: 120, smooth: 1, trunkMat: M.BARK2, limbMat: M.BARK2, darkBack: .1, tex: { grain: 1.1, holes: .26, flecks: .22, dots: .05 } }); }
// Alder: narrow and dark, a straight stem with short side branches, small dark clumps up it, little cones.
export function alderTree(r, st, s) {
  const k = .7 + .3 * spread(st), W = Math.round(110 * s * k), H = Math.round(165 * s), sp = new Sprite(W, H), bx = W / 2, gy = H;
  const n = st.treeTrunks || 1, lean = (r() - .5) * .2 + (st.treeLean || 0), clumps = [];
  for (let t = 0; t < n; t++) {
    const trunk = bough(sp, [bx + (t - (n - 1) / 2) * 5 * s, gy], -Math.PI / 2 + lean + (n > 1 ? (t / (n - 1) - .5) * .3 : 0), H * .92, 6 * s / Math.sqrt(n), 1.5, st, r, { bend: .5 });
    for (let i = 0; i < 16; i++) { const f = uni(r, .3, .97), p = lerp2(trunk.pts[0], trunk.end, f), side = i % 2 ? 1 : -1, len = (1 - f * .6) * H * .12 * k; const b = bough(sp, p, -Math.PI / 2 + side * uni(r, .7, 1.2), len, 2 * s, 1, st, r, { group: 12, mat: M.BARKD }); clumps.push([b.end, (8 + (1 - f) * 6) * s * k], [lerp2(p, b.end, .4), (7 + (1 - f) * 4) * s * k]); }
    clumps.push([trunk.end, 7 * s]);
  }
  roots(sp, bx, gy, 6 * s, st, r, s * .6); bark(sp, st);
  for (const [c, rr] of clumps) clump(sp, c, rr, rr * .8, st, r, { mat: r() < .5 ? M.LEAF3 : M.LEAF });
  for (const [c, rr] of clumps) leafTexture(sp, c, rr, rr * .8, r, { grain: 1.3, holes: .2, flecks: .1, dots: .03, dot: M.BARKD });
  const topY = Math.min(...clumps.map(([c]) => c[1]));
  return trim(sp, bx, topY + (gy - topY) * .45); // the crown line follows the leaves, wherever the stem leans
}
// Scots pine: a tall bare trunk, orange higher up, and flat-topped blue-green clumps on crooked limbs at the top.
export function pineTree(r, st, s) {
  const k = .8 + .2 * spread(st), W = Math.round(150 * s * k), H = Math.round(175 * s), sp = new Sprite(W, H), bx = W / 2, gy = H;
  const trunk = bough(sp, [bx, gy], -Math.PI / 2 + (r() - .5) * .25 + (st.treeLean || 0), H * .78, 8 * s, 3 * s, st, r, { bend: .7 });
  bark(sp, st); for (let y = 0; y < sp.h * .55; y++) for (let x = 0; x < W; x++) if (sp.get(x, y) === M.TRUNK || sp.get(x, y) === M.BARKD) sp.recolour(x, y, hash2(x, y, 3) < .15 ? M.BARKD : M.BELLY); // the upper trunk glows orange
  roots(sp, bx, gy, 8 * s, st, r, s * .7);
  const pads = [];
  for (let i = 0; i < 6; i++) { const f = uni(r, .55, 1), p = lerp2(trunk.pts[0], trunk.end, f), side = i % 2 ? 1 : -1; const b = bough(sp, p, -Math.PI / 2 + side * uni(r, .6, 1.3), H * uni(r, .12, .22) * k, 3 * s, 1.5, st, r, { group: 12, bend: 1.6, mat: M.BELLY }); pads.push(b.end); }
  pads.push(trunk.end);
  for (const p of pads) clump(sp, add(p, [0, -2 * s]), uni(r, 13, 19) * s * k, uni(r, 4, 6) * s, st, r, { mat: M.LEAF, ragged: 1.3 }); // flat-topped plates of needles
  for (const p of pads) leafTexture(sp, add(p, [0, -2 * s]), 19 * s * k, 6 * s, r, { grain: 1, holes: .25, flecks: .14 });
  return trim(sp, bx, Math.min(...pads.map(p => p[1])) + 8 * s);
}
// Yew: squat, dark and dense, a short fluted reddish trunk under a broad dark dome of tiny needles.
export function yewTree(r, st, s) {
  const k = spread(st), W = Math.round(200 * s * k + 50 * s), H = Math.round(120 * s), sp = new Sprite(W, H), bx = W / 2, gy = H;
  const n = st.treeTrunks || 3, tw = 9 * s * (st.treeThick || 1.2);
  for (let t = 0; t < n; t++) bough(sp, [bx + (t - (n - 1) / 2) * tw * .5, gy], -Math.PI / 2 + (t - (n - 1) / 2) * .35 + (st.treeLean || 0), H * .3, tw, tw * .6, st, r, { mat: M.BELLY, bend: 1.6 });
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (sp.get(x, y) === M.BELLY && (x + Math.round(y / 6)) % 4 === 0) sp.recolour(x, y, M.BARKD); // fluted
  roots(sp, bx, gy, tw * 1.4, st, r, s);
  const top = gy - H * .3, cs = [];
  for (let i = 0; i < 9; i++) { const a = Math.PI + (i / 8) * Math.PI, rr = (40 + 20 * k) * s; cs.push([[bx + Math.cos(a) * rr, top + Math.sin(a) * rr * .55 + 10 * s], uni(r, 16, 22) * s]); }
  for (let i = 0; i < 7; i++) cs.push([[bx + (i / 6 - .5) * (60 + 30 * k) * s, top - uni(r, 4, 22) * s], uni(r, 20, 26) * s]); // the dome filled in
  cs.push([[bx, top - 24 * s], 26 * s]);
  for (const [c, rr] of cs) clump(sp, c, rr, rr * .7, st, r, { mat: M.LEAF3, ragged: .6 });
  for (const [c, rr] of cs) leafTexture(sp, c, rr, rr * .7, r, { grain: .7, holes: 0, flecks: .08, mats: [M.LEAF, M.LEAF2, M.LEAF3] });
  return trim(sp, bx, top + 4 * s);
}
// Hawthorn: small, twisted and wind-bent, a tangle of branches, dense little clumps, red haws.
export function hawthornTree(r, st, s) { return broadleaf(r, { ...st, gnarl: 1 }, s, { trunk: .3, tw: 8, limbs: 3, spreadA: .9, limb: .3, depth: 3, fork: .6, bend: 2, lean: .45, clumpR: [7, 10], flat: .65, extra: .8, wide: .7, tall: 90, ragged: 1.4, darkBack: .3, tex: { grain: 1, holes: .1, flecks: .14, dots: .035 } }); }
// Holly: a dark, glossy cone of small tight clumps, bright glints on the leaves, red berries.
export function hollyTree(r, st, s) {
  const k = .8 + .2 * spread(st), W = Math.round(110 * s * k), H = Math.round(130 * s), sp = new Sprite(W, H), bx = W / 2, gy = H;
  sp.limb([[bx, gy, 5 * s], [bx, gy - H * .5, 3 * s], [bx, 10 * s, 1.5]], M.BARK2, { group: 10, round: st.round });
  const cs = [];
  for (let i = 0; i < 10; i++) { const f = i / 9, y = 10 * s + f * H * .72, half = (5 + f * 28) * s * k, m = 1 + Math.round(f * 3); for (let j = 0; j < m; j++) cs.push([[bx + (m > 1 ? (j / (m - 1) - .5) * half * 1.3 : 0) + uni(r, -2, 2) * s, y + uni(r, -2, 2) * s], (6 + f * 5) * s]); } // tiers widening into a cone
  for (const [c, rr] of cs) clump(sp, c, rr * 1.2, rr, st, r, { mat: M.LEAF3, ragged: .7 });
  for (const [c, rr] of cs) leafTexture(sp, c, rr * 1.2, rr, r, { grain: 1.1, holes: 0, flecks: .2, dots: .035, mats: [M.LEAF, M.LEAF2, M.LEAF3] });
  return trim(sp, bx, H * .85);
}
// Hazel: a coppice, many thin stems fanning from one stool, a low rounded crown of soft clumps.
export function hazelTree(r, st, s) { return broadleaf(r, { ...st, gnarl: st.gnarl * .5, treeTrunks: st.treeTrunks || 6 }, s, { trunk: .5, tw: 9, limbs: 1, spreadA: .5, limb: .18, depth: 1, fan: 1.3, trunkBend: .8, clumpR: [11, 15], flat: .8, extra: 1, wide: .8, tall: 110, noRoots: false, rootK: .4, smooth: 1, trunkMat: M.BARK2, limbMat: M.BARK2, darkBack: .2, tex: { grain: 3.6, holes: .14, flecks: .2 } }); }
// Weeping birch: a white trunk, its fine twigs hanging in long pale-green curtains.
export function weepingBirchTree(r, st, s) {
  const t = birchTree(r, { ...st, treeLean: st.treeLean || 0 }, s), sp = t.sp;
  for (let x = 0; x < sp.w; x++) {
    let top = -1; for (let y = 0; y < sp.h; y++) if ([M.LEAF, M.LEAF2, M.LEAF3].includes(sp.get(x, y))) { top = y; break; }
    if (top < 0 || hash2(x, 1, 7) < .35) continue;
    const len = (sp.h - top) * uni(r, .25, .5);
    for (let y = top + 1; y < Math.min(sp.h - 3, top + len); y++) if (!sp.get(x, y) || sp.get(x, y) === M.LEAF3) sp.px(x + Math.round(Math.sin(y * .2 + x) * .6), y, hash2(x, y, 2) < .3 ? M.LEAF : M.LEAF2, 0, .2, .95);
  }
  return t;
}
// Larch: a soft cone of tufted, yellow-green tiers, lighter and gappier than a spruce.
export function larchTree(r, st, s) {
  const k = .8 + .2 * spread(st), W = Math.round(100 * s * k), H = Math.round(170 * s), sp = new Sprite(W, H), bx = W / 2, gy = H;
  sp.limb([[bx, gy, 6 * s], [bx, gy - H * .5, 3.5 * s], [bx, 6 * s, 1.2]], M.TRUNK, { group: 10, round: st.round });
  roots(sp, bx, gy, 6 * s, st, r, s * .5); bark(sp, st);
  const tiers = 14;
  for (let i = 0; i < tiers; i++) {
    const f = i / (tiers - 1), y = 8 * s + f * H * .68, half = (4 + f * 30) * s * k;
    for (let j = 0; j < 4; j++) { const c = [bx + (j / 3 - .5) * half * 1.6, y + Math.abs(j / 3 - .5) * 6 * s]; clump(sp, c, half * .35 + 2 * s, 4 * s, st, r, { mat: M.LEAF2, ragged: 1.6 }); leafTexture(sp, c, half * .35 + 2 * s, 4 * s, r, { grain: 1, holes: .32, flecks: .1, mats: [M.LEAF, M.LEAF2] }); }
  }
  return trim(sp, bx, H * .8);
}

// Every tree kind an area can name, with its look: hue (added to the area's leaf hue), saturation and
// value of the leaves, the trunk's colour, how it grows across the height classes (wide, narrow, small,
// willow, normal), and what it is. The first six are the original kinds.
export const TREE_SPECIES = {
  broad: { fn: broadTree, name: "gnarled broadleaf", grow: "normal" },
  fir: { fn: firTree, name: "spruce", grow: "narrow", hue: .06 },
  willow: { fn: willowTree, name: "willow", grow: "willow", hue: -.02, val: 1.05 },
  birch: { fn: birchTree, name: "silver birch", grow: "narrow", hue: -.02, val: 1.08 },
  flat: { fn: flatTree, name: "field maple", grow: "normal", hue: .01 },
  oak: { fn: oakTree, name: "oak", grow: "wide", hue: .01, val: .92 },
  beech: { fn: beechTree, name: "beech", grow: "normal", hue: -.03, sat: 1.05, val: 1.02, trunk: [.62, .08, .62] },
  ash: { fn: ashTree, name: "ash", grow: "narrow", hue: -.04, sat: .85, val: 1.12 },
  lime: { fn: limeTree, name: "lime", grow: "narrow", hue: -.05, sat: 1.1, val: 1.12 },
  sycamore: { fn: sycamoreTree, name: "sycamore", grow: "wide", hue: .03, sat: 1.1, val: .72 },
  chestnut: { fn: chestnutTree, name: "horse chestnut", grow: "wide", hue: -.01, val: 1.0, dot: [244, 238, 226] },
  rowan: { fn: rowanTree, name: "rowan", grow: "small", hue: -.01, val: 1.05, trunk: [.08, .12, .52], dot: [210, 40, 34] },
  alder: { fn: alderTree, name: "alder", grow: "narrow", hue: .04, sat: .9, val: .72 },
  pine: { fn: pineTree, name: "Scots pine", grow: "narrow", hue: .1, sat: .7, val: .78, upper: [.06, .6, .72] },
  yew: { fn: yewTree, name: "yew", grow: "wide", hue: .07, sat: .8, val: .55, upper: [.02, .55, .45] },
  hawthorn: { fn: hawthornTree, name: "hawthorn", grow: "small", hue: .025, val: .8, dot: [176, 30, 40] },
  holly: { fn: hollyTree, name: "holly", grow: "narrow", hue: .06, sat: .85, val: .6, trunk: [.1, .08, .55], dot: [214, 28, 36] },
  hazel: { fn: hazelTree, name: "hazel coppice", grow: "small", hue: .0, val: .94, trunk: [.07, .3, .45] },
  weepingBirch: { fn: weepingBirchTree, name: "weeping birch", grow: "narrow", hue: -.04, val: 1.12 },
  larch: { fn: larchTree, name: "larch", grow: "narrow", hue: -.07, sat: .8, val: 1.15 },
};
const SPECIES_BY_FN = new Map(Object.entries(TREE_SPECIES).map(([id, S]) => [S.fn, { id, ...S }]));
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
export function treeColours(r, st, type) {
  const S = SPECIES_BY_FN.get(type), sa = S?.sat || 1, va = S?.val || 1;
  // a species shifts the area's leaf hue a little; towards yellow it shifts less where the area's leaves are already yellow, so no species turns an area autumnal
  const sh0 = S?.hue || 0, sh = sh0 < 0 ? sh0 * Math.max(0, Math.min(1, (st.leafHue - .17) / .09)) : sh0, h = st.leafHue + (r() - .5) * st.leafVariety * .7 + sh;
  const c = {
    [M.TRUNK]: hsv2rgb(st.trunkHue, .45 * st.sat, .34), [M.BARKD]: hsv2rgb(st.trunkHue + .03, .5 * st.sat, .17), [M.BARKL]: hsv2rgb(st.trunkHue - .01, .38 * st.sat, .5), [M.BARK2]: [222, 220, 212],
    [M.LEAF]: hsv2rgb(h, Math.min(1, .62 * st.sat * sa), Math.min(1, .58 * va)), [M.LEAF2]: hsv2rgb(h - .05, Math.min(1, .55 * st.sat * sa), Math.min(1, .8 * va)), [M.LEAF3]: hsv2rgb(h + .03, Math.min(1, .66 * st.sat * sa), .38 * va), [M.WEB]: [225, 225, 232],
  };
  if (S?.trunk) c[M.BARK2] = hsv2rgb(...S.trunk); // smooth grey or brown bark (beech, rowan, holly, hazel)
  if (S?.upper) c[M.BELLY] = hsv2rgb(...S.upper); // a pine's orange upper trunk, a yew's red
  if (S?.dot) c[M.FLOWER] = S.dot; // berries, candles
  return c;
}
// The trunk was drawn with its roots and bark; this stays for callers of the old API.
export function finishTree(t) { return t; }
export function splitTree(t) { // bottom = wood below the crown line; top = everything else
  const { sp, crownY } = t, top = new Sprite(sp.w, sp.h), bot = new Sprite(sp.w, sp.h);
  for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) {
    const i = y * sp.w + x, m = sp.m[i]; if (!m) continue;
    const dst = WOOD.has(m) && y >= crownY ? bot : top;
    dst.put(x, y, m, sp.n[i * 3], sp.n[i * 3 + 1], sp.n[i * 3 + 2]);
  }
  return { top, bot };
}

// ================= undergrowth =================
// Bushes: round leafy mounds (some flowering), ferns, grass tufts and shrubs.
export function bush(r, st) {
  const s = st.bushSize, kind = pick(r, ["round", "round", "fern", "grass", "shrub"]);
  const W = Math.round(40 * s), H = Math.round(28 * s), sp = new Sprite(W, H);
  if (kind === "round" || kind === "shrub") {
    const n = kind === "shrub" ? 5 : 3;
    for (let i = 0; i < n; i++) clump(sp, [W / 2 + uni(r, -9, 9) * s, H - 8 * s + uni(r, -4, 2) * s], uni(r, 7, 10) * s, uni(r, 5, 8) * s, st, r);
    if (kind === "shrub" || r() < st.flowers) for (let i = 0; i < 18 * st.flowers + 3; i++) { const x = W / 2 + uni(r, -12, 12) * s, y = H - uni(r, 5, 17) * s; if (sp.get(x, y)) sp.recolour(x, y, M.FLOWER); }
  } else if (kind === "fern") {
    for (let k = 0; k < 7; k++) {
      const a = -Math.PI / 2 + (k / 6 - .5) * 2.4; let x = W / 2, y = H - 1;
      for (let j = 0; j < 15 * s; j++) { x += Math.cos(a) * .9; y += Math.sin(a) * .9 + j * .06; sp.put(x, y, k % 2 ? M.LEAF3 : M.LEAF, Math.cos(a) * .4, -.2, .9); if (j % 2) { sp.put(x, y - 1, M.LEAF2, 0, -.5, .85); sp.put(x + Math.sign(Math.cos(a)), y + 1, M.LEAF, 0, .3, .9); } }
    }
  } else {
    for (let k = 0; k < 18 * s; k++) { const x0 = W / 2 + uni(r, -13, 13) * s, h = uni(r, 5, 15) * s, lean = uni(r, -3, 3); for (let j = 0; j < h; j++) sp.put(x0 + lean * j / h * (j / h), H - 1 - j, j > h * .65 ? M.LEAF2 : j < h * .3 ? M.LEAF3 : M.LEAF, lean * .1, -.3, .9); }
  }
  const c = treeColours(r, st, null); c[M.FLOWER] = hsv2rgb(r(), .55, .95);
  return { sp, colours: c };
}
