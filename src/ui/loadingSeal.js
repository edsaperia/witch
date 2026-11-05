// The loading screen's seal (Ed, 2026-11-05: "Loading screen: can you copy this for the sigil design", his reference a Celtic-knot
// Tree of Life, white on black): a round sigil in the middle, COVEN to its left and RUSH to its right, level with the trunk's middle.
// The tree: a thick trunk, narrowest a little below the middle, flaring into its roots and parting at the top into heavy limbs;
// ribbon branches off them curving up, hooking back like a crook and weaving over and under; roots fanning from its foot, a level
// one each side out to the rim and a pretzel knot at the bottom. There's no separate circle: up each side two ribbons twist over
// and under each other, and over the top and round the bottom the branches and roots run on into them, so the canopy and the roots
// are the ring. Solid, no outlines, one ribbon width all through, a black gap on the ribbon passing under at every crossing.
// Drawn here as our own paths on a 640-unit design grid (smooth curves through hand-placed points, the side twists generated); the
// crossings are found and the over-unders set in turn along each ribbon, so the knot alternates; then cut into short pieces that
// light as the game loads. Plain JS with no DOM, for src/ui/loadingScreen.js (before the art kit loads) and its tests.
// Seal units: the sigil's middle at 0, 0, its rim radius 1, x right, y down; the seal spans ±SEAL_W across and ±SEAL_H down.

/** @typedef {{ x: number, y: number, at?: number }} SealStar a star of the seal, seal units; `at` its turn to light (0 first) */
/** @typedef {{ x: number, y: number, at?: number, poly: number[][], band?: number[], strand?: number }} SealPiece a piece of the sigil, a
 *  polygon to fill (seal units), only between the heights `band` if it has one (the trunk's); x, y its middle; `strand` the ribbon
 *  it's of (sigilKnot's strands), if it's a ribbon's */

const rand = seed => () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

/** The ribbons' width and the black gap either side of a ribbon another passes under (Ed's reference: a ribbon a little over 3% of
 *  the sigil across, each crossing's gap about half a ribbon). */
export const RIBBON = 0.07, GAP = 0.03;
/** The words, centred ±WORD_X either side of the sigil on the trunk's middle line (Ed: "both sit level"), at most WORD_W across and
 *  WORD_H high (the longer word sets the size of both). */
export const WORD_X = 1.7, WORD_W = 1.1, WORD_H = 0.27;
/** The seal's half-width and half-height, seal units (the words' outsides; the sigil's rim). */
export const SEAL_W = WORD_X + WORD_W / 2 + 0.04, SEAL_H = 1;

/** The design grid: 640 across, the sigil's middle at MID, its rim RIM out. */
const MID = [322, 314.5], RIM = 307;
const D = ([x, y]) => [(x - MID[0]) / RIM, (y - MID[1]) / RIM];
const STEP = 0.008; // (the curves' points, seal units apart)
const EXT = 0.05; // (how far a tucking end runs on past where it's drawn to)

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
  [252, 458], [277, 468], [302, 471], [330, 471], [356, 466], [378, 455], [396, 441], [384, 421], [369, 404], [362, 380], [360, 350], [362, 322],
  [368, 296], [380, 274], [398, 258], [420, 247], [450, 240], [478, 236], [505, 239], [530, 245], [552, 252], [556, 233], [530, 224], [500, 219], [470, 219], [440, 223],
  [412, 228], [400, 222], [397, 196], [394, 170], [391, 148], [367, 146], [368, 176], [364, 204], [350, 226], [334, 238], [320, 238], [302, 228], [284, 212],
  [270, 192], [263, 170], [260, 152], [234, 160], [232, 186], [238, 204], [240, 214], [225, 216]];

/** Where the reference's over-unders break plain alternation: the ribbon named passes over at the crossing nearest each point. */
const OVER = [[364, 124, "diagonal"], [212, 553, "pretzel"]];

/** The ribbons on the design grid: [points, start, end, name?], an end "tuck" (it passes under a ribbon there and ends) or "join"
 *  (it runs into a ribbon or the trunk and merges). The twists' ribbons run on at the top into the canopy and at the bottom into the
 *  roots. */
function ribbons() {
  const G = pts => pts.map(D), T = (s, k) => twist(s, k, TW0, TW1), rev = a => a.slice().reverse();
  return [
    // left, outer twist: the bottom's upper diagonal, under the pretzel's loop, hooking out and up the side, the twist, then on in
    // over the big arc's foot as the crook, along the bar, under the diagonal and up into the top band
    [[...G([[426, 593], [402, 591], [380, 594], [358, 594], [336, 587], [312, 573], [286, 558], [260, 551], [232, 551], [204, 556], [180, 556]]), ...rev(T(-1, 0)),
      ...G([[110, 130], [128, 106], [150, 94], [172, 88], [196, 76], [224, 76], [244, 90], [256, 112], [270, 134], [294, 144], [322, 143], [346, 138], [362, 124], [380, 104], [398, 86], [414, 76]])], "join", "join", "crook"],
    // left, inner twist: out of the trunk's foot, round and up the side, tucking under its twin at the top
    [[...G([[250, 466], [226, 487], [196, 500]]), ...rev(T(-1, 1))], "join", "tuck"],
    // the big arc: out of the left limb, up the canopy's left and over the top, tucking under the top band
    [G([[240, 222], [212, 204], [188, 188], [164, 168], [150, 145], [146, 112], [154, 80], [172, 56], [198, 42], [228, 36], [262, 39], [292, 46], [318, 45], [334, 37]]), "join", "tuck"],
    // right, outer twist: the top band from under the big arc, over the top-right and down the side, along the bottom and round
    // the pretzel's loop up into the trunk's foot
    [[...G([[256, 50], [266, 31], [288, 18], [318, 16], [342, 25], [362, 42], [382, 58], [408, 67], [440, 72], [474, 80], [508, 96], [532, 120]]), ...T(1, 0),
      ...G([[500, 560], [478, 577], [450, 588], [420, 594], [392, 604], [366, 613], [340, 613], [314, 604], [292, 593], [274, 597], [257, 606], [238, 607], [222, 598], [213, 578], [212, 543], [222, 515], [240, 488], [256, 462]])], "tuck", "join", "pretzel"],
    // right, inner twist: from under its twin at the top, down the side and into the trunk's foot
    [[...T(1, 1), ...G([[455, 486], [428, 466], [402, 448]])], "tuck", "join"],
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
    // the roots: the left level one, out under the twist
    [G([[248, 450], [200, 452], [150, 452], [110, 452]]), "join", "tuck"],
    // the pretzel's arc, from under the bottom's diagonal up and round into the right diagonal root
    [G([[300, 562], [316, 538], [340, 521], [364, 513], [384, 517], [396, 528]]), "tuck", "join"],
    // the strand from under the arc out to the right twist
    [G([[324, 540], [344, 541], [363, 543], [387, 551], [410, 562], [437, 568], [458, 564], [478, 553], [495, 540], [514, 530]]), "tuck", "join"],
    // the middle root, down under the arc
    [G([[300, 466], [303, 492], [308, 524]]), "join", "tuck"],
    // the right diagonal root, down under the strand
    [G([[350, 468], [377, 490], [400, 510], [420, 530], [432, 548], [438, 562]]), "join", "tuck"],
    // the right level root, out under the twist
    [G([[380, 436], [440, 442], [490, 450], [520, 458]]), "join", "tuck"],
  ];
}

/** Every ribbon's centre line in seal units, its ends' kinds. */
export function sigilStrands() {
  return ribbons().map(([pts, a, b, name]) => {
    // a tucking end runs on a little, so it crosses the ribbon it passes under (and is cut off there)
    const on = (p, q) => { const l = Math.hypot(p[0] - q[0], p[1] - q[1]); return [p[0] + (p[0] - q[0]) / l * EXT, p[1] + (p[1] - q[1]) / l * EXT]; };
    const P = [...pts]; if (a === "tuck") P.unshift(on(P[0], P[1])); if (b === "tuck") P.push(on(P[P.length - 1], P[P.length - 2]));
    return { pts: spline(P), ends: [a, b], name };
  });
}

const inPoly = (poly, x, y) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
/** The trunk's outline in seal units, smoothed. */
export const trunkOutline = () => { const t = TRUNK.map(D); return spline([...t, t[0]]); };

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
    const p = D([x, y]), si = strands.findIndex(st => st.name === name);
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

/** The sigil cut into pieces about SP seal units long, polygons in seal units: the ribbons (each gap where one passes under cut
 *  square to the ribbon over it, GAP clear of it), then the trunk in bands. @param {number} [SP] @returns {SealPiece[]} */
export function sigilPieces(SP = 0.09) {
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
  for (const p of out) { p.x = p.poly.reduce((s, v) => s + v[0], 0) / p.poly.length; p.y = p.poly.reduce((s, v) => s + v[1], 0) / p.poly.length; }
  // the trunk, in bands across it, each the whole outline shown only between its band's two heights (so no seam shows between them)
  const y0 = Math.min(...trunk.map(p => p[1])), y1 = Math.max(...trunk.map(p => p[1])), H = SP * 0.8;
  for (let y = y0; y < y1; y += H) {
    const inBand = trunk.filter(p => p[1] >= y && p[1] <= y + H), mx = inBand.length ? inBand.reduce((s, v) => s + v[0], 0) / inBand.length : 0;
    out.push({ poly: trunk, band: [y - 0.003, Math.min(y1, y + H) + 0.003], x: mx, y: y + H / 2 });
  }
  // the heart: a small piece at the sigil's middle, on the trunk (already drawn by its band, so the knot looks whole without it), the
  // nearest the middle so it lights last, for the supernova
  out.push({ poly: [[0, -0.02], [0.02, 0], [0, 0.02], [-0.02, 0]], x: 0, y: 0 });
  return out;
}

/** The words' stars in seal units: `words` the font's points for COVEN and RUSH ({ pts, x0, x1, y0, y1 } in the font's pixels).
 *  @param {{ pts: number[][], x0: number, x1: number, y0: number, y1: number }[]} words @returns {SealStar[]} */
export function wordStars(words) {
  const sc = Math.min(...words.map(w => Math.min(WORD_W / (w.x1 - w.x0), WORD_H / (w.y1 - w.y0)))), out = [];
  words.forEach((w, k) => { const cx = k === 0 ? -WORD_X : WORD_X; for (const [x, y] of w.pts) out.push({ x: cx + (x - (w.x0 + w.x1) / 2) * sc, y: (y - (w.y0 + w.y1) / 2) * sc }); });
  return out;
}

/** The lighting order (Ed, 2026-11-05: "roughly left to right, with some random scatter"): each star's or piece's turn by its place
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
