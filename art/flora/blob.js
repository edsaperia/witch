// The genome generator (stage 8 of issue #79): a tree grown from its record alone. Its wood is levels of branches, Weber–Penn style
// (a trunk, then each level's children along their parent: how many, where along it, how long by where (the crown's shape), at what
// angle and how much they turn up), and its crown is a few big lit blobs (3 to 9) at the branch tips, each filled with leaf stamps:
// little clusters of pixels shaded as one leaf bunch, the whole blob lit from the upper left in three tones (t3ssel8r style), the
// blobs behind a tone darker. A crown can carry dots (blossom, fruit, glowing spots), glints, hanging vines with glowing buds, or
// be mushroom caps with glowing gills. The new species in art/flora/genomes.js (generator "blob") are drawn by it.
import { M, Sprite, uni, hash2, lerp2, add, unitVec, matOf } from "../core.js";
import { bough, roots, bark, smoothBark, trim, spread } from "../trees.js";

const BLOB_LIGHT = unitVec([-.5, -.75, .45]); // from the upper left and a little in front, as the creatures are lit
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

// Clusters, not noise (docs/ART-GUIDE.md section 0, rule 4): each leaf pixel takes the leaf tone most of its 3 x 3 neighbourhood
// has (ties keep it), twice over, so the three tones form clusters and no tone is a lone pixel.
export function clusterLeaves(sp) {
  const { w, h } = sp;
  for (let pass = 0; pass < 2; pass++) {
    const src = sp.m.slice();
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = y * w + x, m = src[i]; if (!LEAFY.includes(m)) continue;
      const cnt = [0, 0, 0];
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue; const k = LEAFY.indexOf(src[yy * w + xx]); if (k >= 0) cnt[k]++; }
      const best = cnt.indexOf(Math.max(...cnt)), own = LEAFY.indexOf(m);
      if (cnt[best] > cnt[own]) sp.m[i] = LEAFY[best];
    }
  }
}

// Blobs through a crown's envelope rather than at its branch tips (flora part 4: firs, larches, hollies, yews, alders): from the top
// of the crown (top: the leader's tip) down to C.fill.base (a share of the tree's height above the ground).
//   tiers:  rows of flat, drooping blobs, wider down the tree (a fir's or larch's skirts)
//   cone, column, dome: round blobs packed through that shape
function fillBlobs(r, s, k, top, C, gy, trunk) {
  const F = C.fill, y0 = top[1] - (C.lift ?? 2) * s, y1 = gy - (gy - top[1]) * (F.base ?? .15), out = [], [r0, r1] = C.r;
  // the trunk's x at a height (the crown stays centred on a leaning trunk)
  const xAt = y => { const pts = trunk?.pts; if (!pts) return top[0]; for (let i = 0; i < pts.length - 1; i++) { const a = pts[i], b = pts[i + 1]; if ((y <= a[1] && y >= b[1]) || (y >= a[1] && y <= b[1])) return a[0] + (b[0] - a[0]) * ((y - a[1]) / ((b[1] - a[1]) || 1)); } return y < pts[pts.length - 1][1] ? pts[pts.length - 1][0] : pts[0][0]; };
  if (F.shape === "tiers") {
    const n = Math.max(2, Math.round(uni(r, ...F.tiers)));
    const gapY = (y1 - y0) / (n - 1);
    for (let i = 0; i < n; i++) { const f = i / (n - 1), y = y0 + gapY * i, cx = xAt(y), half = ((F.top ?? 4) + f * ((F.bottom ?? 30) - (F.top ?? 4))) * s * (.85 + .15 * k) * uni(r, .9, 1.1), droop = (F.droop ?? 4) * s * (.4 + f);
      const per = Math.max(1, Math.round(half / ((r0 + r1) * .5 * s) * (F.per ?? 1)));
      // each tier a skirt: its blobs overlapping across it and deep enough to overlap the tier below, its ends drooping
      for (let j = 0; j < per; j++) { const u = per > 1 ? j / (per - 1) - .5 : 0, rx = Math.max(r0 * s * .5, half / per * 1.6), c = [cx + u * half * 1.4, y + droop * Math.abs(u) * 1.6]; out.push({ c, rx, ry: Math.max(rx * (C.flat ?? .4), gapY * .6), back: j % 2 === 1 && r() < (C.back ?? .3) }); } }
    return out;
  }
  const n = Math.round(uni(r, ...C.blobs)), width = f => F.shape === "cone" ? (F.top ?? .15) + (1 - (F.top ?? .15)) * f : F.shape === "column" ? .55 + .45 * Math.sin(Math.PI * Math.min(1, .2 + f)) : Math.sqrt(Math.max(0, 1 - (1 - f) * (1 - f))) * .95 + .05;
  const halfW = (F.width ?? 40) * s * (.8 + .2 * k);
  for (let i = 0; i < n; i++) { const f = n > 1 ? i / (n - 1) : .5, y = y0 + (y1 - y0) * (f * .9 + r() * .1), w = width((y - y0) / Math.max(1, y1 - y0)) * halfW, x = xAt(y) + (r() - .5) * 2 * w * .7, rx = uni(r, r0, r1) * s * (.6 + .5 * width((y - y0) / Math.max(1, y1 - y0)));
    out.push({ c: [x, y], rx, ry: rx * (C.flat ?? .85), back: r() < (C.back ?? .3) }); }
  return out;
}
// A tree fern's or palm's crown (C.fronds: n, len, droop): fronds arching out from the trunk's top, each a stalk with leaflets on
// both sides, the near ones lit and the far ones in shadow, in two-pixel clusters.
function frondCrown(sp, r, st, s, k, top, C, gy) {
  const F = C.fronds, n = Math.round(uni(r, ...F.n)), mats = (C.mats || ["LEAF3", "LEAF", "LEAF2"]).map(matOf), W = sp.w, blobOf = sp.blob = new Uint8Array(W * sp.h);
  const put = (x, y, m, b) => { x = Math.floor(x); y = Math.floor(y); if (!sp.inb(x, y)) return; sp.px(x, y, m, 0, -.3, .9); blobOf[y * W + x] = b; };
  for (let i = 0; i < n; i++) {
    const back = i % 2 === 0, a = -Math.PI / 2 + (i / Math.max(1, n - 1) - .5) * Math.PI * (F.spread ?? 1.4), len = uni(r, ...F.len) * s * (.8 + .2 * k), droop = F.droop ?? 1.2;
    let p = [top[0], top[1]], ang = a;
    for (let j = 0; j < len; j += 1) {
      const f = j / len; ang = a + Math.sign(Math.cos(a) || 1) * f * droop * Math.abs(Math.cos(a) + .25);
      p = [p[0] + Math.cos(ang), p[1] + Math.sin(ang) + f * .6];
      const m = back ? mats[0] : f < .3 ? mats[1] : mats[2 - (j % 6 < 2 ? 1 : 0)];
      put(p[0], p[1], back ? mats[0] : mats[1], i + 1);
      if (j % 2 === 0 && f > .08) { const l = Math.round((1 - f * .7) * (F.leaflet ?? 4) * s), nx = -Math.sin(ang), ny = Math.cos(ang); for (const sd of [-1, 1]) for (let q = 1; q <= l; q++) { put(p[0] + nx * q * sd, p[1] + ny * q * sd + q * .35, m, i + 1); put(p[0] + nx * q * sd, p[1] + ny * q * sd + q * .35 + 1, back ? mats[0] : m, i + 1); } }
    }
  }
  if (st.artStyle === "bold" || st.artStyle === "ref") { clusterLeaves(sp); sp.stylised = st.artStyle; }
  return trim(sp, sp.w / 2, Math.min(gy - 6 * s, top[1] + 6 * s));
}

// A crown's blobs (list: { c, rx, ry, back }) filled with leaf stamps, lit as one shape each, then its dots and glints (a tree's, a bush's):
// returns what the strands drawn after need (the leaf materials, the stamp size, a put that keeps each pixel with its blob).
export function stampBlobs(sp, r, st, s, list, C) {
  const W = sp.w, H = sp.h;
  // stylised (st.artStyle bold or ref, the game's ?style=; docs/ART-GUIDE.md section 0): bigger, fewer stamps, each one tone, lit as one big shape with no jitter, then clustered
  const sty = st.artStyle === "bold" || st.artStyle === "ref", ss = Math.max(sty ? 2.5 : 1.5, (C.stampSize || 3) * s * (sty ? 1.5 : 1)), kind = sty && C.stamp === "needle" ? "leaf" : C.stamp || "leaf", [t1, t2] = C.tones || [.12, .55], mats = (C.mats || ["LEAF3", "LEAF", "LEAF2"]).map(matOf);
  const seed = (r() * 1e4) | 0, cap = !!C.cap, blobOf = sp.blob || (sp.blob = new Uint8Array(W * H)), id0 = C.blobBase || 0; // which blob each pixel is part of (the pixel wind moves each whole)
  const put = (x, y, mat, nx, ny, nz, b) => { x = Math.floor(x); y = Math.floor(y); if (!sp.inb(x, y)) return; sp.px(x, y, mat, nx, ny, nz); blobOf[y * W + x] = b; };
  for (const [bi, B] of list.entries()) {
    const { c, rx, ry, back } = B, step = ss * (C.packing || 1.15) * (sty ? 1.2 : 1), pts = [];
    for (let y = -ry - ss; y <= ry + ss; y += step) for (let x = -rx - ss; x <= rx + ss; x += step) {
      const jx = x + (r() - .5) * step * .6, jy = y + (r() - .5) * step * .6, u = jx / rx, v = jy / ry, d = u * u + v * v;
      if (d > 1 + (hash2(Math.round(jx), Math.round(jy), seed + bi) - .5) * .3) continue;
      if (cap && v > .2) continue; // a cap: only its dome
      if (d < .65 && r() < (C.holes || 0)) continue; // gaps where the branches show through
      pts.push([jx, jy, u, v, Math.sqrt(Math.max(0, 1 - Math.min(1, d)))]);
    }
    pts.sort((a, b) => a[4] - b[4]); // the rim first, the middle over it
    for (const [jx, jy, u, v, nz] of pts) {
      let nrm = unitVec([u * .9, v * .9, nz + .15]), top = true;
      if (C.env) { // lit as one crown (C.env: the crown's envelope { c, rx, ry, mix }): the envelope's normal there, mixed with the blob's own; the light tone only on the crown's lit top-left third
        const E = C.env, eu0 = (c[0] + jx - E.c[0]) / E.rx, ev0 = (c[1] + jy - E.c[1]) / E.ry, el = Math.max(1, Math.hypot(eu0, ev0) / .97), eu = eu0 / el, ev = ev0 / el, /* (a clump past the envelope takes its edge's light, not the dark beyond) */ en = unitVec([eu * .9, ev * .9, Math.sqrt(Math.max(0, 1 - eu * eu - ev * ev)) + .15]), k = E.mix ?? .7;
        nrm = unitVec([en[0] * k + nrm[0] * (1 - k), en[1] * k + nrm[1] * (1 - k), en[2] * k + nrm[2] * (1 - k)]); top = eu + ev < -.45;
      }
      const lit = nrm[0] * BLOB_LIGHT[0] + nrm[1] * BLOB_LIGHT[1] + nrm[2] * BLOB_LIGHT[2];
      const base = lit + (sty ? 0 : (r() - .5) * (C.jitter ?? .16)) - (back ? (C.backDark ?? .32) : 0) - Math.max(0, v) * (C.under ?? .12), /* under: how dark a blob's underside goes (a fir's tiers each a dark lower edge) */ sx = Math.round(c[0] + jx), sy = Math.round(c[1] + jy), sd = seed + ((sx * 7 + sy * 13) & 7);
      for (const [dx, dy, sh] of stampPixels(kind, ss, sd)) {
        const t = base + sh * (sty ? .08 : (C.stampShade ?? .28)), mat = t > t2 && top ? mats[2] : t > t1 ? mats[1] : mats[0];
        put(sx + dx, sy + dy, mat, nrm[0] + dx / ss * .25, nrm[1] + dy / ss * .25, nrm[2], id0 + bi + 1);
      }
    }
    if (cap) { // the underside: gills fanning from the stem, glowing between dark ribs, and a lit rim
      const y0 = Math.round(c[1] + ry * .2), gm = matOf(C.cap.gill || "GLOW"), rib = matOf(C.cap.rib || "LEAF3");
      for (let x = Math.round(c[0] - rx); x <= Math.round(c[0] + rx); x++) {
        const u = (x - c[0]) / rx, depth = Math.max(1, Math.round(ry * (C.cap.depth ?? .35) * Math.sqrt(Math.max(0, 1 - u * u))));
        for (let y = y0; y < y0 + depth; y++) put(x, y, (Math.round(x - c[0] + (y - y0) * u * 1.5) % 3 === 0) ? rib : gm, u * .3, .8, .5, id0 + bi + 1);
        put(x, y0 - 1, mats[1], 0, .2, .9, id0 + bi + 1);
      }
    }
  }
  if (sty && C.cluster !== false) { clusterLeaves(sp); sp.stylised = st.artStyle; } // no lone leaf pixels: each tone in clusters; bake leaves its tones be (cluster false: the caller does it once, after all its blobs)
  // dots (blossom, fruit, glowing spots) on the leaves, the lit side more; glints on the lit leaves
  let cx0 = W, cx1 = 0, cy0 = H, cy1 = 0;
  for (const { c, rx, ry } of list) { cx0 = Math.min(cx0, c[0] - rx - ss); cx1 = Math.max(cx1, c[0] + rx + ss); cy0 = Math.min(cy0, c[1] - ry - ss); cy1 = Math.max(cy1, c[1] + ry + ss); }
  const each = f => { for (let y = Math.max(0, Math.floor(cy0)); y <= Math.min(H - 1, Math.ceil(cy1)); y++) for (let x = Math.max(0, Math.floor(cx0)); x <= Math.min(W - 1, Math.ceil(cx1)); x++) f(x, y, sp.m[y * W + x]); };
  for (const D of [C.dots, C.glints].filter(Boolean)) {
    const dm = matOf(D.mat || "FLOWER"), on = (D.on || ["LEAF", "LEAF2"]).map(matOf), size = D.size || 1;
    each((x, y, m) => { if (on.includes(m) && hash2(x, y, seed + 77) < D.share * (m === M.LEAF2 ? 1.5 : 1)) for (let q = 0; q < size * size; q++) sp.recolour(x + (q % size), y + Math.floor(q / size), dm); });
  }
  return { mats, ss, put };
}

export function blobTree(r, st, s, P) {
  const k = (P.narrow ? .8 + .2 * spread(st) : spread(st)) * (P.wide || 1), W = Math.round(P.w * s * k + (P.wPad ?? 40) * s), H = Math.round(P.h * s), sp = new Sprite(W, H), bx = W / 2, gy = H;
  const T = P.trunk, n = st.treeTrunks || T.stems || 1, tmat = matOf(T.mat || "TRUNK"), lmat = matOf(T.limbMat || T.mat || "TRUNK");
  const tw = T.w * s * (st.treeThick || 1) * (st.treeThin ? .55 : 1) / Math.sqrt(n), lean0 = (r() - .5) * (T.lean ?? .3) * st.gnarl + (st.treeLean || 0);
  const tips = [], ends = [], trunks0 = [];
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
    if (t === 0) trunks0.push(trunk);
    if (T.top !== false) tips.push(trunk.end); // the leader carries the top blob
    grow(trunk, len, tw, 0);
    if (t === 0 && st.treeHollow) { const h = lerp2(base, trunk.end, .38); sp.ellipse(h[0], h[1], tw * .28, tw * .5, M.NOSE, { round: .3 }); }
  }
  if (T.roots !== 0) roots(sp, bx, gy, tw * Math.sqrt(n), st, r, s * (T.roots || 1), tmat);
  if (T.smooth) smoothBark(sp, r, s); else bark(sp, st);
  // the trunk's own marks: bands (a birch's black marks across its white bark, two pixels tall so they read), upper (the share of
  // the tree's height, from the top, whose bark turns a pine's orange), scars (a tree fern's rings of old frond bases)
  const bandM = matOf(T.bandMat || "BARKD");
  if (T.bands) for (const tr of trunks0) for (let i = 0; i < tr.pts.length - 1; i++) for (let u = 0; u < 1; u += T.bands) {
    const p = lerp2(tr.pts[i], tr.pts[i + 1], u + r() * T.bands * .4), wl = 2 + Math.floor(r() * 4) * s;
    if (r() < .7) for (let dy = 0; dy < Math.max(2, Math.round(s * 1.2)); dy++) for (let dx = -wl; dx <= wl; dx++) if (sp.get(p[0] + dx, p[1] + dy) === tmat) sp.recolour(p[0] + dx, p[1] + dy, bandM);
  }
  if (T.upper) for (let y = 0; y < H * T.upper; y++) for (let x = 0; x < W; x++) { const m = sp.get(x, y); if (m === M.TRUNK || m === M.BARKD || m === tmat) sp.recolour(x, y, M.BELLY); }
  if (T.scars) for (let y = 0; y < H; y += Math.max(2, Math.round(T.scars * s))) for (let x = 0; x < W; x++) if (sp.get(x, y) === tmat) sp.recolour(x, y, M.BARKD);
  const C = P.crown, lowestEnd = Math.max(...ends.map(e => e[1]));
  if (st.treeBare || !tips.length) return trim(sp, bx, Math.min(lowestEnd, gy - 6 * s) + 4 * s);
  if (C.fronds) return frondCrown(sp, r, st, s, k, ends[0], C, gy);
  // the blobs: the tips spread round the crown, evenly by angle about its middle, the biggest on top
  const mid = [tips.reduce((a, t) => a + t[0], 0) / tips.length, tips.reduce((a, t) => a + t[1], 0) / tips.length];
  const byAng = tips.map(t => [t, Math.atan2(t[1] - mid[1] - 1e-3, t[0] - mid[0])]).sort((a, b) => a[1] - b[1]).map(([t]) => t);
  const nb = Math.max(1, Math.min(byAng.length, Math.round(uni(r, ...C.blobs)))), blobs = [], used = new Set();
  for (let i = 0; i < nb; i++) { const j = Math.floor((i + .5) * byAng.length / nb); used.add(j); blobs.push(byAng[j]); }
  const top = tips.reduce((a, t) => (t[1] < a[1] ? t : a)); if (!blobs.includes(top) && C.topBlob !== false) blobs[0] = top;
  const list = C.fill ? fillBlobs(r, s, k, top, C, gy, trunks0[0]) : blobs.map(t => { const big = t === top ? (C.topBig || 1) : 1, rx = uni(r, ...C.r) * s * (C.spreadK === false ? 1 : .75 + .25 * k) * big; return { c: add(t, [uni(r, -2, 2) * s, -(C.lift ?? 3) * s]), rx, ry: rx * (C.flat ?? .8), back: r() < (C.back ?? .3) }; });
  if (C.twigs) byAng.forEach((t, j) => { if (!used.has(j) && t !== top) { const rx = C.r[0] * s * C.twigs; list.push({ c: add(t, [0, -s]), rx, ry: rx * (C.flat ?? .8), back: true }); } });
  list.sort((a, b) => (a.back !== b.back ? (a.back ? -1 : 1) : a.c[1] - b.c[1])); // the back blobs first, then top down: the lower ones in front
  const { mats, ss, put } = stampBlobs(sp, r, st, s, list, C);
  // curtains: a willow's or weeping birch's leafy strands hanging from the blobs, two pixels wide, each swaying with its blob
  if (C.curtains) {
    const V = C.curtains;
    for (const [bi, B] of list.entries()) { if (B.back && !V.back) continue; const { c, rx, ry } = B;
      for (let x = Math.round(c[0] - rx * (V.width ?? .95)); x <= c[0] + rx * (V.width ?? .95); x += Math.max(2, Math.round((V.gap ?? 2.5) * s))) {
        if (r() > (V.share ?? .8)) continue;
        const u = (x - c[0]) / rx, y0 = Math.round(c[1] + ry * Math.sqrt(Math.max(0, 1 - u * u)) * .7), len = uni(r, ...V.len) * s * (1 - .4 * Math.abs(u));
        for (let j = 0; j < len && y0 + j < gy - 2 * s; j++) { const lit = u < -.2 ? 2 : u > .3 ? 0 : 1, m = j > len * .8 ? mats[0] : mats[Math.min(2, lit)];
          put(x, y0 + j, m, 0, 0, 1, 230); put(x + 1, y0 + j, j % 4 === 3 ? mats[0] : m, 0, 0, 1, 230); } // the curtains sway as one, so strands never cross
      }
    }
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
  if (C.crownLine) return trim(sp, bx, H * C.crownLine); // a crown to the ground (a fir's skirts): the line at a share of the height, so its lowest skirts carry the life below
  return trim(sp, bx, Math.min(gy - 6 * s, Math.max(under, Math.min(...ends.map(e => e[1])))));
}

// Undergrowth in the trees' stamp language (#119): a bush genome with generator "blob" and params.kind:
//   mound:  a few lit blobs low on the ground, filled with leaf stamps as a crown is (flowering: blossom dots on the lit side)
//   fronds: a fern's fronds arching up and out from one root, leaflets down both sides, the far fronds in shadow
//   blades: grass in a few clumps of blades, each clump leaning its own way, lit on the side towards the light
// Each blob, frond or clump is its own sway region (sp.blob), so it bobs whole. Stylised (st.artStyle bold or ref): bigger stamps,
// one tone each, the tones clustered, and the sprite marked so bake leaves it be.
export function blobBush(r, st, s, P) {
  const W = Math.round(P.w * s), H = Math.round(P.h * s), sp = new Sprite(W, H), gy = H - 1, sty = st.artStyle === "bold" || st.artStyle === "ref";
  const mats = (P.mats || ["LEAF3", "LEAF", "LEAF2"]).map(matOf), blobOf = sp.blob = new Uint8Array(W * H);
  const put = (x, y, m, b, nx = 0, ny = -.3, nz = .9) => { x = Math.floor(x); y = Math.floor(y); if (!sp.inb(x, y)) return; sp.px(x, y, m, nx, ny, nz); blobOf[y * W + x] = b; };
  if (P.kind === "mound") {
    const n = Math.round(uni(r, ...(Array.isArray(P.clumps) ? P.clumps : [P.clumps, P.clumps]))), list = [];
    for (let i = 0; i < n; i++) { const rx = uni(r, ...(P.r || [7, 10])) * s, ry = rx * uni(r, .65, .85), x = W / 2 + (n > 1 ? (i / (n - 1) - .5) * 2 : 0) * (P.spread ?? 9) * s + uni(r, -2, 2) * s;
      list.push({ c: [x, Math.min(gy - ry * .55, H - 8 * s + uni(r, -4, 1) * s)], rx, ry, back: i % 2 === 1 && r() < .5 }); }
    if (P.top !== false) { const rx = uni(r, ...(P.r || [7, 10])) * s * .85; list.push({ c: [W / 2 + uni(r, -3, 3) * s, Math.min(...list.map(b => b.c[1] - b.ry * .6))], rx, ry: rx * .75, back: false }); } // a crown on top, so it reads as a dome, not a row
    list.sort((a, b) => (a.back !== b.back ? (a.back ? -1 : 1) : a.c[1] - b.c[1]));
    const flowering = P.flowering || r() < st.flowers;
    stampBlobs(sp, r, st, s, list, { stamp: "leaf", stampSize: P.stampSize ?? 2, tones: P.tones || [.22, .66], under: P.under ?? .25, back: 0, packing: 1.1, dots: flowering ? { mat: "FLOWER", share: P.bloom ?? .06, on: ["LEAF2", "LEAF"], size: sty ? 2 : 1 } : null });
  } else if (P.kind === "fronds") {
    const n = P.fronds, len = P.len * s, base = [W / 2, gy];
    for (let i = 0; i < n; i++) {
      const f0 = n > 1 ? i / (n - 1) - .5 : 0, back = i % 2 === 1, a = -Math.PI / 2 + f0 * (P.spread ?? 2.4), l = len * (1 - Math.abs(f0) * .35) * uni(r, .85, 1.1);
      let p = base.slice(), ang = a; const side = Math.sign(Math.cos(a)) || (i % 2 ? 1 : -1), lit = f0 < -.1 ? 2 : f0 > .25 ? 0 : 1 + (i % 4 === 0 ? 1 : 0);
      for (let j = 0; j < l; j++) {
        const f = j / l; ang = a + side * f * f * (P.droop ?? 1.6); p = [p[0] + Math.cos(ang), p[1] + Math.sin(ang)];
        put(p[0], p[1], back ? mats[0] : mats[Math.max(0, lit - 1)], i + 1); // the stalk a tone under its leaflets
        if (j % (sty ? 3 : 2) === 0 && f > .12) { /* (stylised: fewer leaflets, so each pair reads) */ const q = Math.max(1, Math.round((1 - f * .75) * (P.leaflet ?? 3) * s)), nx = -Math.sin(ang), ny = Math.cos(ang);
          for (const sd of [-1, 1]) for (let k = 1; k <= q; k++) { const m = back ? mats[0] : mats[sd < 0 ? lit : Math.max(0, lit - 1)]; // the leaflets towards the light lit, the others a tone down
            const lx = p[0] + nx * k * sd + Math.cos(ang) * k * .45, ly = p[1] + ny * k * sd + Math.sin(ang) * k * .45; put(lx, ly, m, i + 1); } } // swept towards the tip
      }
    }
  } else { // blades
    const nc = P.clumps || 4, per = Math.max(2, Math.round(P.blades * s / nc));
    for (let c = 0; c < nc; c++) {
      const cx = W / 2 + (nc > 1 ? (c / (nc - 1) - .5) * 2 : 0) * (P.spread ?? 11) * s + uni(r, -2, 2) * s, lean = uni(r, -3, 3), hk = uni(r, .6, 1), lit = lean < -1 ? 2 : lean > 1 ? 0 : 1;
      for (let b = 0; b < per; b++) {
        const x0 = cx + uni(r, -3, 3) * s, h = uni(r, 6, 15) * s * hk, lb = lean + uni(r, -1, 1);
        for (let j = 0; j < h; j++) { const f = j / h, m = mats[Math.min(2, Math.max(0, (f < .3 ? 0 : f > .6 ? 2 : 1) + lit - 1))]; put(x0 + lb * f * f, gy - j, m, c + 1, lb * .1); }
      }
    }
  }
  if (sty) { clusterLeaves(sp); sp.stylised = st.artStyle; }
  return sp;
}
