// The loading screen's seal (Ed, 2026-11-05, his sketch of a landscape screen): the Ent's World Tree, its trunk a vertical line down
// the middle, its branches fanning out at the top and sweeping down and round, its roots fanning out at the bottom and sweeping up
// and round, together two big rings either side of the trunk (a sideways hourglass, ∞), COVEN in the left ring and RUSH in the
// right, level ("both sit level"). Redrawn from the World Tree's sigil (art/sigils.js WORLD_TREE: Ed, "it's today's sigil, though
// I'd be happy to redraw the sigil with more detail, referencing the original design"): its knotwork band (two strands weaving over
// and under), its crown limbs and roots reaching into the band, its trunk a little off true, in the same bezier strokes, the one
// ring now two. Plain JS with no DOM, for src/ui/loadingScreen.js (before the art kit loads) and its tests.
// Seal units: its middle at 0, 0, x right, y down; it spans about ±SEAL_W across and ±SEAL_H down.

/** @typedef {{ x: number, y: number, at?: number }} SealStar a star of the seal, seal units; `at` its turn to light (0 first) */

const rand = seed => () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

/** The trunk's half-width at its forks (where the rings' knotwork ends), and the rings: their centres ±RING_X from the trunk, their band RING_R round (the two crossing at the trunk's forks, so the trunk
 *  rises between them in the narrow lens they make), each strand weaving KNOT_A in and out KNOT_N times round, a KNOT_GAP° gap
 *  where it passes under (the sigil's band, art/sigils.js knotBand, at twice its size). */
export const TRUNK_W = 0.06, RING_X = 0.74, RING_R = 0.82, KNOT_A = 0.03, KNOT_N = 10, KNOT_GAP = 5;
/** The seal's half-width and half-height, seal units (its rings' outsides). */
export const SEAL_W = RING_X + RING_R + KNOT_A, SEAL_H = RING_R + KNOT_A;
/** Where the rings cross above and below the trunk's middle: its crown's fork and its roots'. */
export const FORK = Math.sqrt(RING_R * RING_R - RING_X * RING_X);

const P = (cx, cy, r, deg) => { const a = deg * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
/** A cubic Bezier's polyline (the sigil kit's `bezier`). */
const bezier = (p0, c0, c1, p1, n = 24) => Array.from({ length: n + 1 }, (_, i) => { const t = i / n, u = 1 - t; return [0, 1].map(k => u * u * u * p0[k] + 3 * u * u * t * c0[k] + 3 * u * t * t * c1[k] + t * t * t * p1[k]); });
/** A limb curling round inside a ring (centre cx, 0): from p0 its radius easing from p0's to `r1` as its angle runs to `deg1`. */
const curl = (cx, p0, deg1, r1, n = 40) => {
  const r0 = Math.hypot(p0[0] - cx, p0[1]), a0 = Math.atan2(p0[1], p0[0] - cx) * 180 / Math.PI;
  let d = deg1 - a0; if (d > 180) d -= 360; if (d < -180) d += 360;
  return Array.from({ length: n + 1 }, (_, i) => { const t = i / n, e = t * t * (3 - 2 * t); return P(cx, 0, r0 + (r1 - r0) * e, a0 + d * t); });
};

/** One ring's knotwork: two strands round (cx, 0), crossing 2 × KNOT_N times, over and under in turn; left out across the trunk
 *  (between the forks the trunk's bark is the rings' inside), so the branches and roots sweep round from fork to fork. */
function knotRing(cx) {
  const out = [], step = 2;
  for (const side of [1, -1]) {
    let run = [];
    for (let d = 0; d <= 360; d += step) {
      const k = Math.round(d / (180 / KNOT_N)), near = Math.abs(d - k * 180 / KNOT_N) < KNOT_GAP, under = (k % 2 === 0) === (side === 1);
      const a = (d - 90) * Math.PI / 180, r = RING_R + side * KNOT_A * Math.sin(KNOT_N * a), x = cx + r * Math.cos(a);
      if ((near && under) || Math.sign(cx) * x < TRUNK_W) { if (run.length > 1) out.push(run); run = []; continue; }
      run.push([x, r * Math.sin(a)]);
    }
    if (run.length > 1) out.push(run);
  }
  return out;
}

/** The tree's strokes, polylines in seal units: the two rings' knotwork, the trunk, the crown's limbs and the roots. Drawn freehand
 *  like the sigil rather than mirrored: the left side's limbs a little off the right's, the crown climbing higher than the roots. */
export function treeStrokes() {
  const F = FORK, top = -F, bot = F, out = [...knotRing(-RING_X), ...knotRing(RING_X)];
  // the trunk: its centre line from the roots' fork to the crown's, a little off true, its bark two lines either side, narrowest at
  // its middle, flaring into the forks (the sigil's TRUNK)
  out.push(bezier([0.006, bot + 0.05], [-0.012, 0.15], [0.014, -0.15], [-0.004, top - 0.05]));
  out.push(bezier([-0.05, bot - 0.03], [-0.022, 0.12], [-0.026, -0.12], [-0.048, top + 0.03]));
  out.push(bezier([0.052, bot - 0.03], [0.026, 0.12], [0.024, -0.13], [0.05, top + 0.03]));
  // the crown: a leader climbing on above the fork between the rings and forking, and limbs fanning out of the fork each side and
  // curling down and round inside its ring, under the band (the sigil's CROWN, its limbs reaching into the band)
  const crown = [-0.004, top - 0.05];
  out.push(bezier(crown, [0.01, top - 0.16], [-0.012, top - 0.25], [0.0, top - 0.33]));
  out.push(bezier([0.0, top - 0.3], [-0.03, top - 0.37], [-0.08, top - 0.41], [-0.13, top - 0.43]));
  out.push(bezier([0.0, top - 0.3], [0.035, top - 0.38], [0.085, top - 0.42], [0.14, top - 0.42]));
  out.push(bezier([0.002, top - 0.18], [0.04, top - 0.22], [0.07, top - 0.22], [0.1, top - 0.26]));
  out.push(bezier([-0.006, top - 0.13], [-0.04, top - 0.17], [-0.07, top - 0.18], [-0.095, top - 0.21]));
  for (const s of [1, -1]) {
    const cx = s * RING_X, j = s > 0 ? 0 : 1; // (j: the left side a little off the right)
    const hi = curl(cx, [s * 0.03, top + 0.02], s > 0 ? -58 + j * 4 : -122 - j * 4, RING_R - 0.17); // the high limb, over the word
    out.push(hi);
    out.push(curl(cx, [s * 0.04, top + 0.06], s > 0 ? -28 : -152 - 5, RING_R - 0.3));      // the long one, curling furthest round
    // twigs off the high limb, toward the band
    for (const t of [0.35, 0.7]) { const p = hi[Math.round(t * (hi.length - 1))], dx = p[0] - cx, dy = p[1], r = Math.hypot(dx, dy); out.push([p, [p[0] + dx / r * 0.08 + s * 0.03, p[1] + dy / r * 0.08]]); }
  }
  // the roots: flatter and lower than the crown (the sigil's ROOTS), a taproot down from the fork forking, the rest curling up round
  // inside the rings
  const root = [0.006, bot + 0.05];
  out.push(bezier(root, [0.0, bot + 0.13], [0.012, bot + 0.2], [0.004, bot + 0.27]));
  out.push(bezier([0.004, bot + 0.24], [-0.04, bot + 0.29], [-0.1, bot + 0.31], [-0.16, bot + 0.33]));
  out.push(bezier([0.004, bot + 0.24], [0.045, bot + 0.3], [0.1, bot + 0.31], [0.15, bot + 0.34]));
  for (const s of [1, -1]) {
    const cx = s * RING_X;
    out.push(curl(cx, [s * 0.03, bot - 0.02], s > 0 ? 50 : 130 + 3, RING_R - 0.2));      // spreading round under the word
    out.push(curl(cx, [s * 0.04, bot - 0.07], s > 0 ? 24 : 156, RING_R - 0.32));         // the long one, up the far side
  }
  return out;
}

/** The tree's stars along its strokes, every SP seal units of its length (and at each end and sharp turn), each a little off its
 *  line; none nearer than MERGE to another. @param {number[][][]} [strokes] @param {number} [SP] @returns {SealStar[]} */
export function treeStars(strokes = treeStrokes(), SP = 0.02) {
  const stars = [], r = rand(3), jr = () => (r() - 0.5) * 0.008, MERGE = SP * 0.5;
  const starAt = (x, y) => { for (const s of stars) if (Math.hypot(s.x - x, s.y - y) < MERGE) return; stars.push({ x, y }); };
  for (const poly of strokes) {
    starAt(poly[0][0], poly[0][1]);
    let run = 0; // (its length since the last star)
    for (let i = 1; i < poly.length; i++) {
      const [x0, y0] = poly[i - 1], [x1, y1] = poly[i], len = Math.hypot(x1 - x0, y1 - y0);
      let at = SP - run, last = -run;
      for (; at < len; at += SP) { const f = at / len; starAt(x0 + (x1 - x0) * f + jr(), y0 + (y1 - y0) * f + jr()); last = at; }
      run = len - last;
      let turn = i === poly.length - 1;
      if (!turn) { const [x2, y2] = poly[i + 1], a = Math.atan2(y1 - y0, x1 - x0), b = Math.atan2(y2 - y1, x2 - x1); turn = Math.abs(((b - a + 3 * Math.PI) % (2 * Math.PI)) - Math.PI) > 0.6; }
      if (turn) { starAt(x1 + jr(), y1 + jr()); run = 0; }
    }
  }
  return stars;
}

/** Where each word sits: centred in its ring, both on the trunk's middle line (Ed: "both sit level"), at most WORD_W across and
 *  WORD_H high (the longer word sets the size of both). */
export const WORD_W = 0.96, WORD_H = 0.25;
/** The words' stars in seal units: `words` the font's points for COVEN and RUSH ({ pts, x0, x1, y0, y1 } in the font's pixels).
 *  @param {{ pts: number[][], x0: number, x1: number, y0: number, y1: number }[]} words @returns {SealStar[]} */
export function wordStars(words) {
  const sc = Math.min(...words.map(w => Math.min(WORD_W / (w.x1 - w.x0), WORD_H / (w.y1 - w.y0)))), out = [];
  words.forEach((w, k) => { const cx = k === 0 ? -RING_X : RING_X; for (const [x, y] of w.pts) out.push({ x: cx + (x - (w.x0 + w.x1) / 2) * sc, y: (y - (w.y0 + w.y1) / 2) * sc }); });
  return out;
}

/** The lighting order (Ed, 2026-11-05: "roughly left to right, with some random scatter"): each star's turn by its place across
 *  the seal, `sweep` times as strong as a random jitter (0 plain random), the heart's star (the trunk's, nearest the middle) last,
 *  for the supernova. Sets each star's `at` (0 first) and returns the stars.
 *  @param {SealStar[]} stars @param {number} [sweep] @param {number} [seed] @returns {SealStar[]} */
export function lightOrder(stars, sweep = 3, seed = 20261105) {
  if (!stars.length) return stars;
  const o = rand(seed), x0 = Math.min(...stars.map(s => s.x)), span = Math.max(1e-9, Math.max(...stars.map(s => s.x)) - x0);
  const mid = stars.reduce((b, s, i) => (Math.hypot(s.x, s.y) < Math.hypot(stars[b].x, stars[b].y) ? i : b), 0);
  const order = stars.map((s, i) => ({ i, k: o() + sweep * (s.x - x0) / span })).sort((a, b) => a.k - b.k).map(e => e.i).filter(i => i !== mid);
  order.push(mid);
  order.forEach((i, n) => (stars[i].at = n));
  return stars;
}

/** How many of N stars the load's `share` (0 to 1) lights: all but the heart's till the game's `finished`, then all. */
export const starsFor = (share, N, finished) => (N ? (finished ? N : Math.min(N - 1, Math.floor(Math.max(0, Math.min(1, share)) * (N - 1)))) : 0);
