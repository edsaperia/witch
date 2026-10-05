// The genome generator (stage 8 of issue #79): a tree grown from its record alone. Its wood is levels of branches, Weber–Penn style
// (a trunk, then each level's children along their parent: how many, where along it, how long by where (the crown's shape), at what
// angle and how much they turn up), and its crown is a few big lit blobs (3 to 9) at the branch tips, each filled with leaf stamps:
// little clusters of pixels shaded as one leaf bunch, the whole blob lit from the upper left in three tones (t3ssel8r style), the
// blobs behind a tone darker. A crown can carry dots (blossom, fruit, glowing spots), glints, hanging vines with glowing buds, or
// be mushroom caps with glowing gills. The new species in art/flora/genomes.js (generator "blob") are drawn by it.
import { M, Sprite, uni, hash2, lerp2, add } from "../core.js";
import { bough, roots, bark, smoothBark, trim, spread } from "../trees.js";

const matOf = name => (typeof name === "number" ? name : M[name]);
const unit = v => { const l = Math.hypot(...v) || 1; return v.map(x => x / l); };
const BLOB_LIGHT = unit([-.5, -.75, .45]); // from the upper left and a little in front, as the creatures are lit
const LEAFY = [M.LEAF, M.LEAF2, M.LEAF3];
// A point a fraction f of the way along a limb's polyline.
function along(pts, f) { const t = Math.max(0, Math.min(1, f)) * (pts.length - 1), i = Math.min(pts.length - 2, Math.floor(t)); return lerp2(pts[i], pts[i + 1], t - i); }
// How long a level's children are by where they grow along their parent (0 at its base, 1 at its tip): the crown's outline.
const SHAPES = { cone: f => .25 + .75 * (1 - f), sphere: f => .3 + .7 * Math.sin(Math.PI * Math.min(1, .15 + f * .85)), flame: f => .3 + .7 * Math.sin(Math.PI * Math.min(1, f * .6 + .1)), even: () => 1, cup: f => .5 + .5 * f };
// A leaf stamp: the pixels of one leaf bunch round its centre, each with its own shade (+ lit, - shadowed) so every bunch shows a
// lit edge and a dark one. leaf: a rounded bunch; round: a ball; needle: drooping streaks; crystal: a faceted diamond.
function stampPixels(kind, ss, seed) {
  const out = [], R = Math.ceil(ss * 1.4);
  for (let dy = -R; dy <= R; dy++) for (let dx = -R; dx <= R; dx++) {
    const h = hash2(dx + 40, dy + 40, seed);
    if (kind === "crystal") { const d = Math.abs(dx) / ss + Math.abs(dy) / (ss * 1.35); if (d > 1) continue; out.push([dx, dy, dx + dy < 0 ? 1 : dx + dy > 0 ? -1 : .2]); continue; }
    if (kind === "needle") { const row = Math.round(dy / 1.6); if (Math.abs(dy - row * 1.6) > .55 || Math.abs(dx) > ss * (1.2 - Math.abs(row) * .25) || Math.abs(row) > 1) continue; out.push([dx, dy + Math.round(Math.abs(dx) / ss * .8), -row * .6 - dx / ss * .2]); continue; }
    const ry = kind === "round" ? ss : ss * .78, d = (dx * dx) / (ss * ss) + (dy * dy) / (ry * ry);
    if (d > 1 || (d > .62 && h < .38)) continue; // a ragged rim: the bunch's single leaves
    out.push([dx, dy, -(dx / ss) * .45 - (dy / ry) * .75]);
  }
  return out;
}

export function blobTree(r, st, s, P) {
  const k = (P.narrow ? .8 + .2 * spread(st) : spread(st)) * (P.wide || 1), W = Math.round(P.w * s * k + (P.wPad ?? 40) * s), H = Math.round(P.h * s), sp = new Sprite(W, H), bx = W / 2, gy = H;
  const T = P.trunk, n = st.treeTrunks || T.stems || 1, tmat = matOf(T.mat || "TRUNK"), lmat = matOf(T.limbMat || T.mat || "TRUNK");
  const tw = T.w * s * (st.treeThick || 1) * (st.treeThin ? .55 : 1) / Math.sqrt(n), lean0 = (r() - .5) * (T.lean ?? .3) * st.gnarl + (st.treeLean || 0);
  const tips = [], ends = [];
  // a level's children along a limb, then theirs, down to the last level, whose tips carry the crown
  const grow = (b, len, w, li) => {
    const L = P.levels[li];
    if (!L) { tips.push(b.end); return; }
    const cnt = Math.round(uni(r, ...L.n));
    for (let i = 0; i < cnt; i++) {
      const f = L.at[0] + (L.at[1] - L.at[0]) * (cnt > 1 ? i / (cnt - 1) : .5) + (r() - .5) * .08, p = along(b.pts, f), side = (i + li) % 2 ? 1 : -1;
      let a = b.ang + side * uni(r, ...L.angle); a += (-Math.PI / 2 - a) * (L.up || 0); // turned up towards the light
      const cl = len * uni(r, ...L.len) * (SHAPES[L.shape || "even"])(f), cw = Math.max(1, w * (L.w ?? .55) * (1 - f * .35));
      const c = bough(sp, p, a, cl, cw, Math.max(1, cw * .6), st, r, { group: 12, mat: lmat, bend: L.bend ?? 1 });
      if (L.tips) tips.push(c.end); // a level whose own ends carry blobs too
      grow(c, cl, cw, li + 1);
    }
  };
  for (let t = 0; t < n; t++) {
    const lean = lean0 + (n > 1 ? (t / (n - 1) - .5) * (T.fan ?? .8) : 0), base = [bx + (t - (n - 1) / 2) * tw * .6, gy];
    const len = H * T.len * (n > 1 ? uni(r, .8, 1.1) : 1), trunk = bough(sp, base, -Math.PI / 2 + lean, len, tw, tw * (T.taper ?? .6), st, r, { bend: T.bend ?? 1, mat: tmat });
    ends.push(trunk.end);
    if (T.top !== false) tips.push(trunk.end); // the leader carries the top blob
    grow(trunk, len, tw, 0);
    if (t === 0 && st.treeHollow) { const h = lerp2(base, trunk.end, .38); sp.ellipse(h[0], h[1], tw * .28, tw * .5, M.NOSE, { round: .3 }); }
  }
  if (T.roots !== 0) roots(sp, bx, gy, tw * Math.sqrt(n), st, r, s * (T.roots || 1), tmat);
  if (T.smooth) smoothBark(sp, r, s); else bark(sp, st);
  const C = P.crown, lowestEnd = Math.max(...ends.map(e => e[1]));
  if (st.treeBare || !tips.length) return trim(sp, bx, Math.min(lowestEnd, gy - 6 * s) + 4 * s);
  // the blobs: the tips spread round the crown, evenly by angle about its middle, the biggest on top
  const mid = [tips.reduce((a, t) => a + t[0], 0) / tips.length, tips.reduce((a, t) => a + t[1], 0) / tips.length];
  const byAng = tips.map(t => [t, Math.atan2(t[1] - mid[1] - 1e-3, t[0] - mid[0])]).sort((a, b) => a[1] - b[1]).map(([t]) => t);
  const nb = Math.max(1, Math.min(byAng.length, Math.round(uni(r, ...C.blobs)))), blobs = [], used = new Set();
  for (let i = 0; i < nb; i++) { const j = Math.floor((i + .5) * byAng.length / nb); used.add(j); blobs.push(byAng[j]); }
  const top = tips.reduce((a, t) => (t[1] < a[1] ? t : a)); if (!blobs.includes(top) && C.topBlob !== false) blobs[0] = top;
  const list = blobs.map(t => { const big = t === top ? (C.topBig || 1) : 1, rx = uni(r, ...C.r) * s * (C.spreadK === false ? 1 : .75 + .25 * k) * big; return { c: add(t, [uni(r, -2, 2) * s, -(C.lift ?? 3) * s]), rx, ry: rx * (C.flat ?? .8), back: r() < (C.back ?? .3) }; });
  if (C.twigs) byAng.forEach((t, j) => { if (!used.has(j) && t !== top) { const rx = C.r[0] * s * C.twigs; list.push({ c: add(t, [0, -s]), rx, ry: rx * (C.flat ?? .8), back: true }); } });
  list.sort((a, b) => (a.back !== b.back ? (a.back ? -1 : 1) : a.c[1] - b.c[1])); // the back blobs first, then top down: the lower ones in front
  const ss = Math.max(1.5, (C.stampSize || 3) * s), kind = C.stamp || "leaf", [t1, t2] = C.tones || [.12, .55], mats = (C.mats || ["LEAF3", "LEAF", "LEAF2"]).map(matOf);
  const seed = (r() * 1e4) | 0, cap = !!C.cap, blobOf = sp.blob = new Uint8Array(W * H); // which blob each pixel is part of (the pixel wind moves each whole)
  const put = (x, y, mat, nx, ny, nz, b) => { x = Math.floor(x); y = Math.floor(y); if (!sp.inb(x, y)) return; sp.px(x, y, mat, nx, ny, nz); blobOf[y * W + x] = b; };
  for (const [bi, B] of list.entries()) {
    const { c, rx, ry, back } = B, step = ss * (C.packing || 1.15), pts = [];
    for (let y = -ry - ss; y <= ry + ss; y += step) for (let x = -rx - ss; x <= rx + ss; x += step) {
      const jx = x + (r() - .5) * step * .6, jy = y + (r() - .5) * step * .6, u = jx / rx, v = jy / ry, d = u * u + v * v;
      if (d > 1 + (hash2(Math.round(jx), Math.round(jy), seed + bi) - .5) * .3) continue;
      if (cap && v > .2) continue; // a cap: only its dome
      if (d < .65 && r() < (C.holes || 0)) continue; // gaps where the branches show through
      pts.push([jx, jy, u, v, Math.sqrt(Math.max(0, 1 - Math.min(1, d)))]);
    }
    pts.sort((a, b) => a[4] - b[4]); // the rim first, the middle over it
    for (const [jx, jy, u, v, nz] of pts) {
      const nrm = unit([u * .9, v * .9, nz + .15]), lit = nrm[0] * BLOB_LIGHT[0] + nrm[1] * BLOB_LIGHT[1] + nrm[2] * BLOB_LIGHT[2];
      const base = lit + (r() - .5) * (C.jitter ?? .16) - (back ? (C.backDark ?? .32) : 0) - Math.max(0, v) * .12, sx = Math.round(c[0] + jx), sy = Math.round(c[1] + jy), sd = seed + ((sx * 7 + sy * 13) & 7);
      for (const [dx, dy, sh] of stampPixels(kind, ss, sd)) {
        const t = base + sh * (C.stampShade ?? .28), mat = t > t2 ? mats[2] : t > t1 ? mats[1] : mats[0];
        put(sx + dx, sy + dy, mat, nrm[0] + dx / ss * .25, nrm[1] + dy / ss * .25, nrm[2], bi + 1);
      }
    }
    if (cap) { // the underside: gills fanning from the stem, glowing between dark ribs, and a lit rim
      const y0 = Math.round(c[1] + ry * .2), gm = matOf(C.cap.gill || "GLOW"), rib = matOf(C.cap.rib || "LEAF3");
      for (let x = Math.round(c[0] - rx); x <= Math.round(c[0] + rx); x++) {
        const u = (x - c[0]) / rx, depth = Math.max(1, Math.round(ry * (C.cap.depth ?? .35) * Math.sqrt(Math.max(0, 1 - u * u))));
        for (let y = y0; y < y0 + depth; y++) put(x, y, (Math.round(x - c[0] + (y - y0) * u * 1.5) % 3 === 0) ? rib : gm, u * .3, .8, .5, bi + 1);
        put(x, y0 - 1, mats[1], 0, .2, .9, bi + 1);
      }
    }
  }
  // dots (blossom, fruit, glowing spots) on the leaves, the lit side more; glints on the lit leaves
  let cx0 = W, cx1 = 0, cy0 = H, cy1 = 0;
  for (const { c, rx, ry } of list) { cx0 = Math.min(cx0, c[0] - rx - ss); cx1 = Math.max(cx1, c[0] + rx + ss); cy0 = Math.min(cy0, c[1] - ry - ss); cy1 = Math.max(cy1, c[1] + ry + ss); }
  const each = f => { for (let y = Math.max(0, Math.floor(cy0)); y <= Math.min(H - 1, Math.ceil(cy1)); y++) for (let x = Math.max(0, Math.floor(cx0)); x <= Math.min(W - 1, Math.ceil(cx1)); x++) f(x, y, sp.m[y * W + x]); };
  for (const D of [C.dots, C.glints].filter(Boolean)) {
    const dm = matOf(D.mat || "FLOWER"), on = (D.on || ["LEAF", "LEAF2"]).map(matOf), size = D.size || 1;
    each((x, y, m) => { if (on.includes(m) && hash2(x, y, seed + 77) < D.share * (m === M.LEAF2 ? 1.5 : 1)) for (let q = 0; q < size * size; q++) sp.recolour(x + (q % size), y + Math.floor(q / size), dm); });
  }
  // vines: strands hanging from the blobs' undersides, leafy, with glowing buds
  if (C.vines) {
    const V = C.vines, bud = matOf(V.bud || "GLOW");
    let vine = 0;
    for (const { c, rx, ry } of list) for (let x = Math.round(c[0] - rx * .85); x <= c[0] + rx * .85; x += Math.max(2, Math.round(2 * s))) {
      if (r() > V.share) continue;
      const vb = 100 + (vine++ % 120); // each vine sways on its own
      let y = Math.round(c[1] + ry + ss); while (y > c[1] && !LEAFY.includes(sp.get(x, y))) y--;
      if (y <= c[1]) continue;
      const len = uni(r, ...V.len) * s, ph = r() * 6;
      for (let j = 1; j < len && y + j < gy - 3 * s; j++) {
        const xx = x + Math.round(Math.sin(j * .15 + ph) * .8);
        put(xx, y + j, j % 5 === 0 ? M.LEAF2 : M.LEAF3, 0, 0, 1, vb);
        if (j % 3 === 1) put(xx + (j % 6 === 1 ? 1 : -1), y + j, M.LEAF, j % 6 === 1 ? .5 : -.5, -.3, .8, vb);
        if (V.budEvery && j % V.budEvery === V.budEvery - 1) put(xx, y + j, bud, 0, 0, 1, vb);
      }
    }
  }
  // the crown line: the underside of the lowest blobs, or the trunk's fork, whichever is lower
  const under = Math.max(...list.filter(b => !b.back || list.length < 3).map(b => b.c[1] + b.ry * .4));
  return trim(sp, bx, Math.min(gy - 6 * s, Math.max(under, Math.min(...ends.map(e => e[1])))));
}
