// The loading screen's seal (Ed, 2026-11-05: "Loading screen: can you copy this for the sigil design", his reference a Celtic-knot
// Tree of Life, white on black; then "now turn this design into dots that are stars, and put the words into gaps, as per my
// diagram", his chalk sketch of the screen: the tree up the middle, a big ring either side, COVEN in the left and RUSH in the right).
// The tree: a thick trunk, narrowest a little below the middle, flaring into its roots and parting at the top into heavy arms;
// ribbon branches curving up, hooking back like a crook and weaving over and under; roots from its foot, a level one each side out to
// the rim and a pretzel knot below. There's no separate circle: up each side two ribbons twist over and under each other, and over
// the top and round the bottom the branches and the rim's ribbon run on into them, so the canopy and the roots are the ring. One
// ribbon width all through, a gap on the ribbon passing under at every crossing. Widened for the landscape screen (the trunk as
// drawn, the rest wider) so the big gaps either side of the trunk take the words, level.
// Drawn here as our own paths on a 640-unit design grid (smooth curves through hand-placed points, the side twists generated); the
// crossings are found and the over-unders set in turn along each ribbon, so the knot alternates; the solid knot's outline is then
// traced and laid with stars, which light as the game loads. Plain JS with no DOM, for src/ui/loadingScreen.js (before the art kit
// loads) and its tests.
// Seal units: the sigil's middle at 0, 0, its rim radius 1 before widening, x right, y down; the seal spans ±SEAL_W across and
// ±SEAL_H down.

/** @typedef {{ x: number, y: number, at?: number }} SealStar a star of the seal, seal units; `at` its turn to light (0 first) */

const rand = seed => () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

/** The ribbons' width and the black gap either side of a ribbon another passes under (Ed's reference: a ribbon a little over 3% of
 *  the sigil across, each crossing's gap about half a ribbon). */
export const RIBBON = 0.07, GAP = 0.03;
/** The words, each centred in a big gap either side of the trunk, ±WORD_X across and WORD_Y down, level (Ed: "both sit level"), at
 *  most WORD_W across and WORD_H high (the longer word sets the size of both). */
export const WORD_X = 0.75, WORD_Y = 0.055, WORD_W = 1, WORD_H = 0.26;
/** The seal's half-width and half-height, seal units (the widened rim). */
export const SEAL_W = 1.79, SEAL_H = 1.03;

/** The design grid: 640 across, the sigil's middle at MID, its rim RIM out. */
const MID = [322, 314.5], RIM = 307;
const D = ([x, y]) => [(x - MID[0]) / RIM, (y - MID[1]) / RIM];
/** The knot widened for the landscape screen (Ed's diagram: the tree up the middle, a big ring either side of it, COVEN and RUSH in
 *  them): across, the trunk as drawn, the canopy, roots and ring WIDEN times as wide, so the big gaps either side of the trunk take
 *  the words. */
const WIDEN = 1.9, WIDEN_AT = 0.15;
const widen = ([x, y]) => [WIDEN * x - (WIDEN - 1) * WIDEN_AT * Math.tanh(x / WIDEN_AT), y];
const STEP = 0.008; // (the curves' points, seal units apart)
const EXT = 0.05; // (how far a tucking end runs on past where it's drawn to)
const GRID = 0.005; // (the grid the sigil's outline is traced on, seal units)

/** A smooth curve (centripetal Catmull-Rom) through points in seal units, its points about STEP apart. */
function spline(P) {
  const out = [P[0]];
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(P.length - 1, i + 2)];
    const d = (a, b) => Math.max(1e-6, Math.sqrt(Math.hypot(b[0] - a[0], b[1] - a[1])));
    const t0 = 0, t1 = t0 + d(p0, p1), t2 = t1 + d(p1, p2), t3 = t2 + d(p2, p3);
    const n = Math.max(2, Math.ceil(Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) / STEP));
    for (let j = 1; j <= n; j++) {
      const t = t1 + (t2 - t1) * j / n, L = (a, b, ta, tb) => [0, 1].map(k => ((tb - t) * a[k] + (t - ta) * b[k]) / (tb - ta));
      const A1 = p0 === p1 ? p1 : L(p0, p1, t0, t1), A2 = L(p1, p2, t1, t2), A3 = p2 === p3 ? p2 : L(p2, p3, t2, t3);
      const B1 = p0 === p1 ? A2 : L(A1, A2, t0, t2), B2 = p2 === p3 ? A2 : L(A2, A3, t1, t3);
      out.push(L(B1, B2, t1, t2));
    }
  }
  return out;
}

// ---- the twists up each side: two ribbons crossing every TWIST_STEP degrees, round the rim from the canopy to the roots ----
const TWIST_R = 0.893, TWIST_A = 0.077, TWIST_STEP = 18.5, TWIST_AT = 93; // (a crossing a little below the trunk's middle line)
/** A twist ribbon's waypoints, side s (1 right, -1 left), strand k (0, 1), from `d0` to `d1` degrees round from the top. */
const twist = (s, k, d0, d1) => {
  const out = [];
  for (let n = Math.round((d1 - d0) / 3), i = 0; i <= n; i++) { const d = d0 + (d1 - d0) * i / n;
    const a = s * d * Math.PI / 180, r = TWIST_R + (k ? -1 : 1) * TWIST_A * Math.sin((d - TWIST_AT) / TWIST_STEP * Math.PI);
    out.push([r * Math.sin(a), -r * Math.cos(a)]);
  }
  return out;
};
const TW0 = TWIST_AT - 2 * TWIST_STEP, TW1 = TWIST_AT + 2.5 * TWIST_STEP; // (the twists' ends, degrees from the top: a crossing at the top, strand 0 outermost at the bottom)

/** The trunk, solid: its outline on the design grid, left side down, foot, right side up, the fork's top. */
const TRUNK = [[205, 221], [228, 230], [250, 246], [266, 266], [279, 293], [286, 318], [287, 345], [284, 375], [277, 398], [266, 416], [250, 432], [232, 444],
  [246, 458], [266, 463], [284, 472], [302, 468], [322, 461], [342, 468], [360, 472], [378, 463], [398, 456], [396, 441], [384, 421], [369, 404], [362, 380], [360, 350], [362, 322],
  [368, 296], [380, 274], [398, 258], [420, 247], [450, 240], [478, 236], [505, 239], [530, 245], [552, 252], [556, 233], [530, 224], [500, 219], [470, 219], [440, 223],
  [412, 228], [400, 222], [397, 196], [394, 170], [391, 148], [367, 146], [368, 176], [364, 204], [350, 226], [334, 238], [320, 238], [302, 228], [284, 212],
  [270, 192], [263, 170], [260, 152], [234, 160], [232, 186], [238, 204], [240, 214], [225, 216]];

/** Where the reference's over-unders break plain alternation: the ribbon named passes over at the crossing nearest each point. */
const OVER = [[364, 124, "diagonal"]];

/** The ribbons on the design grid: [points, start, end, name?], an end "tuck" (it passes under a ribbon there and ends) or "join"
 *  (it runs into a ribbon or the trunk and merges). The twists' ribbons run on at the top into the canopy and at the bottom into the
 *  roots. */
function ribbons() {
  const G = pts => pts.map(D), T = (s, k) => twist(s, k, TW0, TW1), rev = a => a.slice().reverse();
  return [
    // the outer ring: the top band from under the big arc, over the top-right, down the right side's twist, along the bottom of the
    // rim, up the left side's twist, then in over the big arc's foot as the crook, along the bar, under the diagonal and up into the
    // top band
    [[...G([[256, 50], [266, 31], [288, 18], [318, 16], [342, 25], [362, 42], [382, 58], [408, 67], [440, 72], [474, 80], [508, 96], [532, 120]]), ...T(1, 0),
      ...G([[500, 562], [470, 584], [430, 601], [378, 612], [322, 615], [266, 612], [214, 601], [174, 584], [144, 562]]), ...rev(T(-1, 0)),
      ...G([[110, 130], [128, 106], [150, 94], [172, 88], [196, 76], [224, 76], [244, 90], [256, 112], [270, 134], [294, 144], [322, 143], [346, 138], [362, 124], [380, 104], [398, 86], [414, 76]])], "tuck", "join", "crook"],
    // left, inner twist: out of the trunk's foot, round and up the side, tucking under its twin at the top
    [[...G([[250, 466], [226, 487], [196, 500]]), ...rev(T(-1, 1))], "join", "tuck"],
    // the big arc: out of the left limb, up the canopy's left and over the top, tucking under the top band
    [G([[240, 222], [212, 204], [188, 188], [164, 168], [150, 145], [146, 112], [154, 80], [172, 56], [198, 42], [228, 36], [262, 39], [292, 46], [318, 45], [334, 37]]), "join", "tuck"],
    // right, inner twist: from under its twin at the top, down the side and into the trunk's foot
    [[...T(1, 1), ...G([[446, 494], [422, 474], [398, 456]])], "tuck", "join"],
    // the loop over the top, turning back
    [G([[370, 32], [395, 22], [422, 25], [443, 39], [456, 57], [461, 70]]), "tuck", "tuck"],
    // the big diagonal, from under the arc down the fork's right into the trunk
    [G([[358, 46], [340, 62], [318, 68], [305, 76], [314, 90], [330, 102], [347, 112], [362, 118], [376, 138], [382, 158], [382, 176]]), "tuck", "join", "diagonal"],
    // the crook's drop, down the fork's left into the trunk
    [G([[262, 128], [252, 146], [247, 164], [246, 176]]), "join", "join"],
    // the left limb, out to the twist
    [G([[252, 238], [230, 222], [205, 211], [180, 208], [150, 214], [112, 224], [76, 236]]), "join", "join"],
    // right: an S from the top band down into the limb
    [G([[408, 76], [406, 102], [413, 127], [430, 150], [455, 168], [478, 182], [489, 200], [484, 220]]), "join", "join"],
    // the roots: the level ones, out under the twists
    [G([[248, 450], [200, 452], [150, 452], [110, 452]]), "join", "tuck"],
    [G([[396, 450], [444, 452], [494, 452], [534, 452]]), "join", "tuck"],
    // the pretzel: two roots down from the trunk's foot, each curling round below and up across the other, crossing at the bottom
    [G([[300, 452], [284, 478], [258, 506], [238, 534], [240, 562], [266, 576], [300, 568], [326, 548], [350, 522], [370, 500]]), "join", "tuck"],
    [G([[344, 452], [360, 478], [386, 506], [406, 534], [404, 562], [378, 576], [344, 568], [318, 548], [294, 522], [274, 500]]), "join", "tuck"],
  ];
}

/** Every ribbon's centre line in seal units, its ends' kinds. */
export function sigilStrands() {
  return ribbons().map(([pts, a, b, name]) => {
    // a tucking end runs on a little, so it crosses the ribbon it passes under (and is cut off there)
    const on = (p, q) => { const l = Math.hypot(p[0] - q[0], p[1] - q[1]); return [p[0] + (p[0] - q[0]) / l * EXT, p[1] + (p[1] - q[1]) / l * EXT]; };
    const P = [...pts]; if (a === "tuck") P.unshift(on(P[0], P[1])); if (b === "tuck") P.push(on(P[P.length - 1], P[P.length - 2]));
    return { pts: spline(P).map(widen), ends: [a, b], name };
  });
}

const inPoly = (poly, x, y) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
/** The trunk's outline in seal units, smoothed. */
export const trunkOutline = () => { const t = TRUNK.map(D); return spline([...t, t[0]]).map(widen); };

/** Where the ribbons cross (outside the trunk, where they merge), and which passes over: in turn along each ribbon over, under,
 *  over, as far as the knot allows (`conflicts` how many crossings it can't); a ribbon tucking under another at its end always
 *  under. */
export function sigilKnot() {
  const strands = sigilStrands(), trunk = trunkOutline();
  const arcs = strands.map(({ pts }) => { const s = [0]; for (let i = 1; i < pts.length; i++) s.push(s[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return s; });
  const len = si => arcs[si][arcs[si].length - 1];
  // a grid of segments, to find the crossings
  const G = 0.05, grid = new Map();
  strands.forEach(({ pts }, si) => { for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; for (let gx = Math.floor(Math.min(x0, x1) / G); gx <= Math.floor(Math.max(x0, x1) / G); gx++) for (let gy = Math.floor(Math.min(y0, y1) / G); gy <= Math.floor(Math.max(y0, y1) / G); gy++) { const k = gx * 1000 + gy; if (!grid.has(k)) grid.set(k, []); grid.get(k).push([si, i]); } } });
  const seen = new Set(), JOIN = 0.05;
  let crossings = [];
  for (const cell of grid.values()) for (let a = 0; a < cell.length; a++) for (let b = a + 1; b < cell.length; b++) {
    let [sa, ia] = cell[a], [sb, ib] = cell[b];
    if (sa > sb || (sa === sb && ia > ib)) [sa, ia, sb, ib] = [sb, ib, sa, ia];
    if (sa === sb && Math.abs(ia - ib) < 4) continue;
    const P = strands[sa].pts, Q = strands[sb].pts, [x1, y1] = P[ia - 1], [x2, y2] = P[ia], [x3, y3] = Q[ib - 1], [x4, y4] = Q[ib];
    const d = (x2 - x1) * (y4 - y3) - (y2 - y1) * (x4 - x3); if (Math.abs(d) < 1e-12) continue;
    const t = ((x3 - x1) * (y4 - y3) - (y3 - y1) * (x4 - x3)) / d, u = ((x3 - x1) * (y2 - y1) - (y3 - y1) * (x2 - x1)) / d;
    if (t < 0 || t >= 1 || u < 0 || u >= 1) continue;
    const id = ((sa * 4096 + ia) * 64 + sb) * 4096 + ib; if (seen.has(id)) continue; seen.add(id); // (a pair in two cells, once)
    const x = x1 + t * (x2 - x1), y = y1 + t * (y2 - y1);
    if (inPoly(trunk, x, y)) continue; // (in the trunk they merge)
    const s1 = arcs[sa][ia - 1] + t * (arcs[sa][ia] - arcs[sa][ia - 1]), s2 = arcs[sb][ib - 1] + u * (arcs[sb][ib] - arcs[sb][ib - 1]);
    // a ribbon running into another merges with it there
    const joins = (si, s) => (s < JOIN && strands[si].ends[0] === "join") || (len(si) - s < JOIN && strands[si].ends[1] === "join");
    if (joins(sa, s1) || joins(sb, s2)) continue;
    const ang = Math.abs(Math.atan2(d, (x2 - x1) * (x4 - x3) + (y2 - y1) * (y4 - y3)));
    crossings.push({ x, y, a: sa, sa: s1, ia, b: sb, sb: s2, ib, angle: Math.min(ang, Math.PI - ang), over: -1 });
  }
  // the tucks: each tucking end's crossing nearest where its drawn end was (it runs on EXT past it), that ribbon under; any crossing
  // past it gone (that bit of the ribbon is cut off)
  const TUCK = 0.14, forced = new Map(), past = new Set();
  strands.forEach((st, si) => [0, 1].forEach(e => {
    if (st.ends[e] !== "tuck") return;
    let best = -1, bd = TUCK, at = 0;
    crossings.forEach((c, ci) => { for (const [k, s] of [[c.a, c.sa], [c.b, c.sb]]) if (k === si) { const dd = e ? len(si) - s : s; if (dd < TUCK && Math.abs(dd - EXT) < bd) { bd = Math.abs(dd - EXT); best = ci; at = dd; } } });
    if (best < 0) return;
    crossings.forEach((c, ci) => { for (const [k, s] of [[c.a, c.sa], [c.b, c.sb]]) if (k === si && (e ? len(si) - s : s) < at) past.add(ci); });
    (st.tuckAt ??= [])[e] = best;
  }));
  const keep = crossings.map((c, ci) => !past.has(ci)), renum = []; let kept = 0; keep.forEach((k, ci) => (renum[ci] = k ? kept++ : -1));
  crossings = crossings.filter((c, ci) => keep[ci]);
  strands.forEach((st, si) => { if (!st.tuckAt) return; st.tucks = st.tuckAt.map(ci => (ci === undefined ? undefined : renum[ci])); delete st.tuckAt; st.tucks.forEach(ci => { if (ci >= 0) forced.set(ci, si); }); });
  // and where the reference's ribbon passes over though plain alternation would put it under
  for (const [x, y, name] of OVER) {
    const p = widen(D([x, y])), si = strands.findIndex(st => st.name === name);
    let best = -1, bd = 0.08; crossings.forEach((c, ci) => { const dd = Math.hypot(c.x - p[0], c.y - p[1]); if ((c.a === si || c.b === si) && dd < bd) { bd = dd; best = ci; } });
    if (best >= 0) forced.set(best, crossings[best].a === si ? crossings[best].b : crossings[best].a);
  }
  // over and under in turn along each ribbon: each crossing's `aOver` a variable, neighbours along a ribbon opposite
  const visits = strands.map(() => []);
  crossings.forEach((c, ci) => { visits[c.a].push([c.sa, ci, 0]); visits[c.b].push([c.sb, ci, 1]); });
  const edges = crossings.map(() => []);
  visits.forEach(v => { v.sort((p, q) => p[0] - q[0]); for (let i = 0; i < v.length - 1; i++) { const p = v[i], q = v[i + 1], par = p[2] ^ q[2] ^ 1; edges[p[1]].push([q[1], par]); edges[q[1]].push([p[1], par]); } });
  const val = crossings.map(() => -1);
  let conflicts = 0;
  const fill = start => { const q = [start]; while (q.length) { const c = q.shift(); for (const [dn, par] of edges[c]) { const want = val[c] ^ par; if (val[dn] < 0) { val[dn] = want; q.push(dn); } else if (val[dn] !== want) conflicts++; } } };
  for (const [ci, under] of forced) { const want = crossings[ci].a === under ? 0 : 1; if (val[ci] < 0) { val[ci] = want; fill(ci); } else if (val[ci] !== want) { conflicts += 2; val[ci] = want; } }
  crossings.forEach((c, ci) => { if (val[ci] < 0) { val[ci] = 1; fill(ci); } });
  crossings.forEach((c, i) => (c.over = val[i] === 1 ? c.a : c.b));
  return { strands, arcs, trunk, crossings, conflicts: conflicts / 2 };
}

/** The solid sigil as polygons in seal units, as Ed's reference draws it: the ribbons in pieces about SP long (each gap where one
 *  passes under cut square to the ribbon over it, GAP clear of it; `strand` the ribbon's), then the trunk's outline.
 *  @param {number} [SP] @returns {{ poly: number[][], strand?: number }[]} */
export function sigilShapes(SP = 0.3) {
  const { strands, crossings, trunk } = sigilKnot(), out = [], w = RIBBON / 2, T = w + GAP;
  strands.forEach(({ pts, tucks = [] }, si) => {
    const n = pts.length, tan = pts.map((p, i) => { const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)], l = Math.hypot(b[0] - a[0], b[1] - a[1]); return [(b[0] - a[0]) / l, (b[1] - a[1]) / l]; });
    const edge = side => pts.map((p, i) => [p[0] - side * tan[i][1] * w, p[1] + side * tan[i][0] * w]);
    const L = edge(1), R = edge(-1);
    // each gap: on each edge, the span of points within T of the ribbon over's line
    const gaps = [];
    for (const [ci, c] of crossings.entries()) {
      if (c.over === si || (c.a !== si && c.b !== si)) continue;
      const i0 = c.a === si ? c.ia : c.ib, oi = c.a === si ? c.ib : c.ia, op = strands[c.over].pts, W = Math.ceil(0.3 / STEP);
      // (how far a point is from the ribbon over's centre line, near the crossing)
      const near = op.slice(Math.max(0, oi - W), Math.min(op.length, oi + W));
      const dist = (x, y) => { let best = Infinity; for (let i = 1; i < near.length; i++) { const [x0, y0] = near[i - 1], [x1, y1] = near[i], dx = x1 - x0, dy = y1 - y0, t = Math.max(0, Math.min(1, ((x - x0) * dx + (y - y0) * dy) / (dx * dx + dy * dy || 1))); best = Math.min(best, Math.hypot(x - x0 - t * dx, y - y0 - t * dy)); } return best; };
      const span = E => {
        const f = i => dist(E[i][0], E[i][1]);
        let a = i0, b = i0; while (a > 0 && Math.abs(f(a - 1)) < T) a--; while (b < n - 1 && Math.abs(f(b)) < T) b++;
        // the exact ends, between points
        const fa = a > 0 ? (Math.abs(f(a - 1)) - T) / (Math.abs(f(a - 1)) - Math.abs(f(a)) || 1) : 0, fb = b < n - 1 ? (T - Math.abs(f(b - 1))) / (Math.abs(f(b)) - Math.abs(f(b - 1)) || 1) : 0;
        return [a - 1 + fa, b - 1 + fb];
      };
      const tuck = tucks[0] === ci ? 0 : tucks[1] === ci ? 1 : -1;
      gaps.push({ L: span(L), R: span(R), tuck });
    }
    gaps.sort((p, q) => p.L[0] + p.R[0] - q.L[0] - q.R[0]);
    // the runs between the gaps (none past a tuck), each cut into pieces
    let from = { L: -1, R: -1 }, start = 0, end = n - 1;
    const runs = [];
    for (const g of gaps) {
      if (g.tuck === 0) { start = Math.max(start, Math.ceil(Math.max(g.L[1], g.R[1]))); from = { L: g.L[1], R: g.R[1] }; continue; }
      if (g.tuck === 1) { runs.push([from, { L: g.L[0], R: g.R[0] }]); from = null; break; }
      runs.push([from, { L: g.L[0], R: g.R[0] }]); from = { L: g.L[1], R: g.R[1] };
    }
    if (from) runs.push([from, { L: end + 1e-9, R: end + 1e-9 }]);
    const at = (E, f) => { const i = Math.max(0, Math.min(n - 2, Math.floor(f))), t = Math.max(0, Math.min(1, f - i)); return [E[i][0] + (E[i + 1][0] - E[i][0]) * t, E[i][1] + (E[i + 1][1] - E[i][1]) * t]; };
    for (const [a, b] of runs) {
      const aL = Math.max(0, a.L), aR = Math.max(0, a.R), bL = Math.min(n - 1, b.L), bR = Math.min(n - 1, b.R);
      if (bL - aL < 1 || bR - aR < 1) continue;
      // the piece breaks, square across, every SP along it (each piece overlapping the next by a point, so no seam shows)
      const i0 = Math.ceil(Math.max(aL, aR)), i1 = Math.floor(Math.min(bL, bR)), per = Math.max(2, Math.round(SP / STEP));
      const cuts = [];
      for (let i = i0 + per; i < i1 - per / 2; i += per) cuts.push(i);
      const bounds = [[aL, aR], ...cuts.map(i => [i, i]), [bL, bR]];
      for (let k = 0; k < bounds.length - 1; k++) {
        const [l0, r0] = bounds[k], [l1, r1] = bounds[k + 1].map(v => (k < bounds.length - 2 ? v + 1 : v));
        const side = (E, f0, f1) => { const s = [at(E, f0)]; for (let i = Math.ceil(f0); i <= Math.floor(f1); i++) s.push(E[i]); s.push(at(E, f1)); return s; };
        out.push({ poly: [...side(L, l0, l1), ...side(R, r0, r1).reverse()], strand: si });
      }
    }
  });
  out.push({ poly: trunk });
  return out;
}

/** The sigil's stars: the solid sigil's outline (sigilShapes, drawn on a grid GRID seal units square and its edges traced), a star
 *  every SP seal units along it, each a little off it, so each ribbon is two lines of stars, the one under at a crossing ending short
 *  of the one over; specks too small to read left out; the heart a star at the middle, the trunk's, the nearest the middle so it
 *  lights last. @param {number} [SP] @returns {SealStar[]} */
export function sigilStars(SP = 0.024) {
  // the grid, a cell's border round it left empty (so the tracing needs no bounds checks)
  const G = GRID, X0 = -SEAL_W - 0.06, Y0 = -SEAL_H - 0.06, NX = Math.ceil((2 * SEAL_W + 0.12) / G) + 2, NY = Math.ceil((2 * SEAL_H + 0.12) / G) + 2;
  const on = new Uint8Array(NX * NY);
  // the shapes filled, row by row (each grid point's middle in or out)
  for (const { poly } of sigilShapes()) {
    let ya = Infinity, yb = -Infinity; for (const p of poly) { ya = Math.min(ya, p[1]); yb = Math.max(yb, p[1]); }
    for (let j = Math.max(1, Math.floor((ya - Y0) / G)); j <= Math.min(NY - 2, Math.ceil((yb - Y0) / G)); j++) {
      const y = Y0 + (j + 0.5) * G, xs = [];
      for (let i = 0, k = poly.length - 1; i < poly.length; k = i++) { const [x1, y1] = poly[i], [x2, y2] = poly[k]; if ((y1 > y) !== (y2 > y)) xs.push(x1 + (y - y1) * (x2 - x1) / (y2 - y1)); }
      xs.sort((p, q) => p - q);
      for (let k = 0; k + 1 < xs.length; k += 2) for (let i = Math.max(1, Math.ceil((xs[k] - X0) / G - 0.5)); i <= Math.min(NX - 2, Math.floor((xs[k + 1] - X0) / G - 0.5)); i++) on[j * NX + i] = 1;
    }
  }
  // its edges traced (marching squares): each edge a closed loop of points between grid points, the inside on its right; a cell's
  // case (its corners in or out) gives its edge pieces, between its sides' middles (0 top, 1 right, 2 bottom, 3 left)
  const CASES = [[], [[0, 3]], [[1, 0]], [[1, 3]], [[2, 1]], [[0, 1], [2, 3]], [[2, 0]], [[2, 3]], [[3, 2]], [[0, 2]], [[3, 0], [1, 2]], [[1, 2]], [[3, 1]], [[0, 1]], [[3, 0]], []];
  const next = new Map();
  for (let j = 0; j < NY - 1; j++) for (let i = 0; i < NX - 1; i++) {
    const o = j * NX + i, c = on[o] | (on[o + 1] << 1) | (on[o + NX + 1] << 2) | (on[o + NX] << 3);
    if (c === 0 || c === 15) continue;
    // (a side's middle as one number: twice its grid position)
    const side = [(2 * j) * 8192 + 2 * i + 1, (2 * j + 1) * 8192 + 2 * i + 2, (2 * j + 2) * 8192 + 2 * i + 1, (2 * j + 1) * 8192 + 2 * i];
    for (const [p, q] of CASES[c]) next.set(side[p], side[q]);
  }
  const loops = [];
  for (const startKey of [...next.keys()]) {
    if (!next.has(startKey)) continue;
    const loop = []; let k = startKey;
    while (next.has(k)) { loop.push([X0 + ((k % 8192) / 2 + 0.5) * G, Y0 + (Math.floor(k / 8192) / 2 + 0.5) * G]); const n = next.get(k); next.delete(k); k = n; }
    if (loop.length > 3) loops.push(loop);
  }
  // each loop smoothed (the grid's steps out), then a star every SP along it, evenly; the heart first
  const stars = [{ x: 0, y: 0 }], jr = (r => () => (r() - 0.5) * SP * 0.15)(rand(3)), MERGE = SP / 2, cells = new Map();
  // (a star too near one already laid, where two edges come close, left out)
  const lay = (x, y) => {
    const ci = Math.floor(x / MERGE), cj = Math.floor(y / MERGE);
    for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) for (const q of cells.get((ci + a) * 65536 + cj + b) ?? []) if (Math.hypot(q.x - x, q.y - y) < MERGE) return;
    const st = { x, y }; stars.push(st); const k = ci * 65536 + cj; if (!cells.has(k)) cells.set(k, []); cells.get(k).push(st);
  };
  for (let loop of loops) {
    for (let pass = 0; pass < 4; pass++) loop = loop.map((p, i) => { const a = loop[(i + loop.length - 1) % loop.length], b = loop[(i + 1) % loop.length]; return [(a[0] + 2 * p[0] + b[0]) / 4, (a[1] + 2 * p[1] + b[1]) / 4]; });
    const arc = [0]; for (let i = 1; i <= loop.length; i++) arc.push(arc[i - 1] + Math.hypot(loop[i % loop.length][0] - loop[i - 1][0], loop[i % loop.length][1] - loop[i - 1][1]));
    const L = arc[loop.length]; if (L < SP * 4) continue; // (a speck)
    const n = Math.round(L / SP);
    for (let k = 0, j = 1; k < n; k++) { const s = L * k / n; while (arc[j] < s) j++; const a = loop[j - 1], b = loop[j % loop.length], t = (s - arc[j - 1]) / (arc[j] - arc[j - 1] || 1); lay(a[0] + (b[0] - a[0]) * t + jr(), a[1] + (b[1] - a[1]) * t + jr()); }
  }
  return stars;
}

/** The words' stars in seal units: `words` the font's points for COVEN and RUSH ({ pts, x0, x1, y0, y1 } in the font's pixels).
 *  @param {{ pts: number[][], x0: number, x1: number, y0: number, y1: number }[]} words @returns {SealStar[]} */
export function wordStars(words) {
  const sc = Math.min(...words.map(w => Math.min(WORD_W / (w.x1 - w.x0), WORD_H / (w.y1 - w.y0)))), out = [];
  words.forEach((w, k) => { const cx = k === 0 ? -WORD_X : WORD_X; for (const [x, y] of w.pts) out.push({ x: cx + (x - (w.x0 + w.x1) / 2) * sc, y: WORD_Y + (y - (w.y0 + w.y1) / 2) * sc }); });
  return out;
}

/** The lighting order (Ed, 2026-11-05: "roughly left to right, with some random scatter"): each star's turn by its place
 *  across the seal, `sweep` times as strong as a random jitter (0 plain random), the heart's (the trunk's, nearest the middle) last,
 *  for the supernova. Sets each one's `at` (0 first) and returns them.
 *  @template {SealStar} T @param {T[]} stars @param {number} [sweep] @param {number} [seed] @returns {T[]} */
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
