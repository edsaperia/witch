// The detailed sigils (Ed, 2026-10-12, for the sea chart's island runes: "we don't need the circles around the rune; ideally we
// want more detailed versions of the rune itself, which is the animal shape design as already chosen but embellished with more
// details", with a reference sheet of Norse emblems: each animal a bold, crisp shape with knotwork, spirals and inner lines
// carved into it). Made from the sigil's own strokes (art/sigils.js), so it stays recognisably the same rune, in tiers by how big
// it shows:
//   0  the plain glyph (sigilArrival): it reads down to about 12 px;
//   1  carved bands: every stroke a broad band with a groove cut down its middle (two lines, as the reference's ribbons), the
//      animal's extra detail added (LEGEND_DETAIL), the end dots rings;
//   2  the carved emblem (carved() below): the animal a solid mass, its detail cut into it.
// sigilDetail(id, size, { tier }) gives a size × size mask, 1 where there's ink, 0 where it's carved away or empty: white, to
// colour as the sigil's neon. No circle at any tier.
import { SIGIL_DOT, SIGIL_STROKE, sigilArrival, sigilDetailStrokes } from "./sigils.js";

/** The tier for a sigil `px` across on screen (the plain glyph below 64 px, carved bands to 128, the carved emblem past). */
export const detailTier = px => (px >= 128 ? 2 : px >= 64 ? 1 : 0);
/** The detailed sigil's margin in its box (unit box). */
const INSET = .055;
/** Tier 1's bands' width and their groove's (unit box). */
const BAND = SIGIL_STROKE * 1.55, GROOVE = SIGIL_STROKE * .42;

function segDist(u, v, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx * dx + dy * dy, t = l2 ? Math.max(0, Math.min(1, ((u - a[0]) * dx + (v - a[1]) * dy) / l2)) : 0;
  return Math.hypot(u - a[0] - dx * t, v - a[1] - dy * t);
}
const polyDist = (u, v, s) => (s.dot ? Math.hypot(u - s.pts[0][0], v - s.pts[0][1]) : s.pts.slice(1).reduce((d, b, i) => Math.min(d, segDist(u, v, s.pts[i], b)), Infinity));

const cache = new Map();
export function sigilDetail(id, size = 128, { tier = detailTier(size) } = {}) {
  const key = `${id}|${size}|${tier}`;
  if (cache.has(key)) return cache.get(key);
  const out = new Uint8Array(size * size);
  if (tier <= 0) { const at = sigilArrival(id, size); for (let i = 0; i < at.length; i++) out[i] = at[i] < Infinity ? 1 : 0; cache.set(key, out); return out; }
  if (tier >= 2) { const m = carved(id, size); cache.set(key, m); return m; }
  // tier 1, carved bands (drawn a little in from the box's edge: the bands are broader than the plain strokes)
  const S = sigilDetailStrokes(id, 1).map(s => ({ ...s, pts: s.pts.map(([x, y]) => [INSET + x * (1 - 2 * INSET), INSET + y * (1 - 2 * INSET)]) })), W = BAND / 2, G = GROOVE / 2, px = 1 / size;
  const dotR = Math.max(SIGIL_DOT * 1.5, W * 1.1);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const u = (x + .5) * px, v = (y + .5) * px;
    let ink = 0;
    for (const s of S) { // the first band covering it: ink, but its groove (or, in a dot, a ring) cut away
      const d = polyDist(u, v, s), r = s.dot ? dotR : W;
      if (d >= r) continue;
      ink = s.dot ? (d / r > .38 && d / r < .62 ? 0 : 1) : d < Math.max(G, px * .6) ? 0 : 1;
      break;
    }
    out[y * size + x] = ink;
  }
  cache.set(key, out);
  return out;
}

// ---- tier 2: the carved emblem ----
// (Ed, 2026-10-12, of the first knotwork: "close but could do with more work"; his reference's emblems are solid: the animal's
// whole body a mass of ink, its knotwork, spirals and bands carved into it as channels, its edge clean.) The mass is the sigil's
// strokes made broad and every shape they close in filled; into it are cut: a channel down every stroke (so the outline strokes
// become a carved border, the inner ones the face's lines), the eyes as holes with a pupil left in, spirals where the body is
// broadest (its haunches, its cheeks, its shoulders), and channels echoing the outline through the rest of the solid.
const CLOSE = .055, MASS = SIGIL_STROKE * .85, CUT = SIGIL_STROKE * .28, EYE = SIGIL_DOT * 1.15, PUPIL = SIGIL_DOT * .42;

/** Chamfer distance (pixels) from every pixel of `inside` (a w × h grid, h defaulting to w) to the nearest pixel not in it
 *  (0 outside; past the grid's edge counts as outside). */
function distIn(inside, w, h = w) {
  const D = new Float32Array(w * h), big = 1e9, a = 1, b = Math.SQRT2;
  for (let i = 0; i < w * h; i++) D[i] = inside[i] ? big : 0;
  const at = (x, y) => (x < 0 || y < 0 || x >= w || y >= h ? 0 : D[y * w + x]);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x; if (!D[i]) continue;
    D[i] = Math.min(D[i], at(x - 1, y) + a, at(x, y - 1) + a, at(x - 1, y - 1) + b, at(x + 1, y - 1) + b);
  }
  for (let y = h - 1; y >= 0; y--) for (let x = w - 1; x >= 0; x--) {
    const i = y * w + x; if (!D[i]) continue;
    D[i] = Math.min(D[i], at(x + 1, y) + a, at(x, y + 1) + a, at(x + 1, y + 1) + b, at(x - 1, y + 1) + b);
  }
  return D;
}

function carved(id, n) {
  const px = 1 / n, S = sigilDetailStrokes(id, 2).map(s => ({ ...s, pts: s.pts.map(([x, y]) => [INSET + x * (1 - 2 * INSET), INSET + y * (1 - 2 * INSET)]) }));
  const base = sigilDetailStrokes(id, 0).length, lines = S.filter(s => !s.dot), dots = S.filter(s => s.dot);
  const fine = new Set(S.slice(base).filter(s => !s.dot)); // (the animal's extra detail: its fur and feather lines, cut finer)
  // the mass: the strokes broad, and everything they close in
  const near = new Float32Array(n * n), nearFine = new Float32Array(n * n), mass = new Uint8Array(n * n);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const u = (x + .5) * px, v = (y + .5) * px;
    let d = Infinity, f = Infinity; for (const s of lines) { const k = polyDist(u, v, s); if (fine.has(s)) f = Math.min(f, k); else d = Math.min(d, k); }
    nearFine[y * n + x] = f; d = Math.min(d, f + MASS * .35);
    for (const s of dots) d = Math.min(d, polyDist(u, v, s) - EYE * .4);
    near[y * n + x] = d;
    if (d < MASS) mass[y * n + x] = 1;
  }
  { // close the gaps between strokes (grown out by CLOSE, then back in), so the body reads as one mass
    // (on a grid padded by more than CLOSE, so nothing near the box's edge is cut flat by it)
    const R = CLOSE * n, P = Math.ceil(R) + 2, m = n + 2 * P, out0 = new Uint8Array(m * m).fill(1);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) out0[(y + P) * m + x + P] = mass[y * n + x] ? 0 : 1;
    const toMass = distIn(out0, m), grown = new Uint8Array(m * m);
    for (let i = 0; i < m * m; i++) grown[i] = !out0[i] || toMass[i] <= R ? 1 : 0;
    const inGrown = distIn(grown, m);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const k = (y + P) * m + x + P; if (grown[k] && inGrown[k] > R) mass[y * n + x] = 1; }
  }
  { // fill what the strokes close in
    const seen = new Uint8Array(n * n), stack = [];
    for (let i = 0; i < n; i++) stack.push(i, (n - 1) * n + i, i * n, i * n + n - 1);
    while (stack.length) { const i = stack.pop(); if (seen[i] || mass[i]) continue; seen[i] = 1; const x = i % n, y = (i / n) | 0; if (x > 0) stack.push(i - 1); if (x < n - 1) stack.push(i + 1); if (y > 0) stack.push(i - n); if (y < n - 1) stack.push(i + n); }
    for (let i = 0; i < n * n; i++) if (!seen[i]) mass[i] = 1;
  }
  const edge = distIn(mass, n); // (pixels in from the mass's edge)
  // spirals where the solid is broadest: the deepest points, well apart, at most four
  const spirals = [], minR = .085 * n;
  const order = [];
  for (let i = 0; i < n * n; i++) if (edge[i] > minR && near[i] * n > minR * .8) order.push(i);
  order.sort((a, b) => edge[b] - edge[a]);
  for (const i of order) {
    if (spirals.length >= 3) break;
    const x = i % n, y = (i / n) | 0, r = Math.min(edge[i], near[i] * n) * .8;
    if (spirals.some(s => Math.hypot(s.x - x, s.y - y) < s.r + r + 2)) continue;
    spirals.push({ x, y, r, turn: hashTurn(id, spirals.length) });
  }
  const out = new Uint8Array(n * n), cut = Math.max(1, CUT * n), echo = Math.max(cut * 3.2, 4);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const i = y * n + x;
    if (!mass[i]) continue;
    const u = (x + .5) * px, v = (y + .5) * px, dE = edge[i];
    let ink = 1;
    // a channel down every stroke, kept off the very edge so the silhouette stays whole
    if (near[i] * n < cut / 2 + .5 && dE > cut * .9) ink = 0;
    if (nearFine[i] * n < cut * .36 + .5 && dE > cut * 1.4) ink = 0; // (the fur and feather lines, finer)
    // the eyes: holes with a pupil left in
    for (const s of dots) { const d = Math.hypot(u - s.pts[0][0], v - s.pts[0][1]); if (d < EYE) ink = d < PUPIL ? 1 : 0; }
    // a spiral cut into each broad place
    let inSpiral = false;
    for (const sp of spirals) {
      const dx = x + .5 - sp.x, dy = y + .5 - sp.y, r = Math.hypot(dx, dy);
      if (r > sp.r) continue;
      inSpiral = true;
      const turns = Math.max(1.3, sp.r / (cut * 2.6)), a = (Math.atan2(dy, dx) / (Math.PI * 2) + 1 + sp.turn) % 1, k = sp.r / turns;
      const along = (r / k - a + 8) % 1;
      ink = along < .58 || r < cut * .8 ? 1 : 0;
      if (r > sp.r - cut) ink = 0; // (its rim cut free of the body)
    }
    // the rest of the solid: channels echoing the outline
    if (!inSpiral && ink && near[i] * n > cut * 1.8 && dE > echo * 1.2 && (dE % echo) < cut) ink = 0;
    out[i] = ink;
  }
  return out;
}
const hashTurn = (id, k) => { let h = 2166136261; for (const c of id + k) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return ((h >>> 0) % 1000) / 1000; };
