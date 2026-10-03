// Witch trees and bushes, drawn with the same toolkit as the animals: trunks and branches
// are smooth tapering limbs that twist and fork, crowns are clumps of leaves (closed,
// ragged outlines, shaded light on top and dark beneath), roots spread over the ground,
// and bark is carved into the trunk. Six kinds, after Ed's references: gnarled broadleaf,
// willow, birch, tree fern, tiered fir and flat-crowned maple.
// Each tree returns {sp, crownY}: trunk pixels below crownY are its bottom half (seen in
// ground mode), everything else its top half (the canopy seen from the treetops).
import { M, Sprite, uni, pick, hash2, vnoise, hsv2rgb, tufts, rot, lerp2, add } from "./core.js";

const WOOD = new Set([M.TRUNK, M.BARK2, M.BARKD, M.BARKL]);

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
  if (st.treeWebs) for (let i = 0; i + 1 < tips.length; i += 2) { const a = tips[i], c = tips[i + 1], L = Math.hypot(c[0] - a[0], c[1] - a[1]); if (L < 40 * s) for (let j = 0; j <= L; j++) { const p = lerp2(a, c, j / L); sp.px(p[0], p[1] + Math.sin(j / L * Math.PI) * L * .15, M.GLINT, 0, 0, 1); } }
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

export const TREE_TYPES = [["wBroad", broadTree], ["wFir", firTree], ["wWillow", willowTree], ["wBirch", birchTree], ["wPalm", palmTree], ["wFlat", flatTree]];
export function chooseType(r, st) {
  const tot = TREE_TYPES.reduce((a, [k]) => a + st[k], 0) || 1; let x = r() * tot;
  for (const [k, f] of TREE_TYPES) { x -= st[k]; if (x <= 0) return f; }
  return broadTree;
}
export function treeColours(r, st, type) {
  const h = st.leafHue + (r() - .5) * st.leafVariety * .7 + (type === firTree ? .06 : 0);
  return {
    [M.TRUNK]: hsv2rgb(st.trunkHue, .45 * st.sat, .34), [M.BARKD]: hsv2rgb(st.trunkHue + .03, .5 * st.sat, .17), [M.BARKL]: hsv2rgb(st.trunkHue - .01, .38 * st.sat, .5), [M.BARK2]: [222, 220, 212],
    [M.LEAF]: hsv2rgb(h, .62 * st.sat, .58), [M.LEAF2]: hsv2rgb(h - .05, .55 * st.sat, .8), [M.LEAF3]: hsv2rgb(h + .03, .66 * st.sat, .38),
  };
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
