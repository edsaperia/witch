// The ley line's curvature (Ed, 2026-10-06, of a hairpin at a runestone: "can we give leylines a maximum curvature so they
// don't kink like this?"; and of a sharp V at another: "Another runestone showing the leyline with a kink in it"): the
// line passes through each stone in one smooth sweep, like a road through a town, never turning tighter than
// leyLines.minRadius. Each stone gets a heading, the line's way through it: the bisector of the way in and the way out
// (for the first stone, the way the departure curve from the treehouse arrives, rules/departure.ts); then each link is
// the shortest path between its two stones, leaving the one on its heading and arriving at the next on its, that never
// turns tighter than the radius (a Dubins path: arcs of that radius and straight runs). Where the next stone lies back
// the way the line came, the way through a stone is across it, and the line loops round wide instead of doubling back.
// No drawing here; render/leylines.ts draws its wander along these curves, and rules/leyroute.ts keeps them from crossing.
import { polylinesMeet, type P2 } from "./crossing";

const TAU = Math.PI * 2;
const mod = (a: number) => ((a % TAU) + TAU) % TAU;
const unit = (a: P2, b: P2): [number, number] => { const dx = b[0] - a[0], dz = b[1] - a[1], l = Math.hypot(dx, dz) || 1; return [dx / l, dz / l]; };
/** A heading (radians) as an angle in the (x, z) plane: atan2(dz, dx). */
export const headingOf = (a: P2, b: P2) => Math.atan2(b[1] - a[1], b[0] - a[0]);

/** The way through `at`, from `prev` on to `next`: the bisector of the way in and the way out (a hairpin's, across it).
 *  Without `next`, the way in; without `prev`, the way out. */
export function wayThrough(prev: P2 | null, at: P2, next: P2 | null): number {
  if (!prev && !next) return 0;
  if (!next) return headingOf(prev!, at);
  if (!prev) return headingOf(at, next);
  const i = unit(prev, at), o = unit(at, next), x = i[0] + o[0], z = i[1] + o[1];
  return Math.hypot(x, z) > 1e-6 ? Math.atan2(z, x) : Math.atan2(i[0], -i[1]); // (straight back: across, to the left)
}

type Word = { kinds: [number, number, number]; len: [number, number, number] }; // kinds: +1 left, -1 right, 0 straight; lengths in radii

/** The shortest path from (a, heading ha) to (b, heading hb) turning no tighter than radius R (Dubins), sampled every
 *  `step` metres, a first and b last. */
export function curveLink(a: P2, ha: number, b: P2, hb: number, R: number, step = 4): [number, number][] {
  const dx = b[0] - a[0], dz = b[1] - a[1], d = Math.hypot(dx, dz) / R, th = Math.atan2(dz, dx), al = mod(ha - th), be = mod(hb - th);
  if (d < 1e-9 && Math.abs(mod(ha - hb)) < 1e-9) return [[a[0], a[1]], [b[0], b[1]]];
  const sa = Math.sin(al), sb = Math.sin(be), ca = Math.cos(al), cb = Math.cos(be), cab = Math.cos(al - be), words: Word[] = [];
  { const p2 = 2 + d * d - 2 * cab + 2 * d * (sa - sb); if (p2 >= 0) { const t1 = Math.atan2(cb - ca, d + sa - sb); words.push({ kinds: [1, 0, 1], len: [mod(-al + t1), Math.sqrt(p2), mod(be - t1)] }); } } // LSL
  { const p2 = 2 + d * d - 2 * cab + 2 * d * (sb - sa); if (p2 >= 0) { const t1 = Math.atan2(ca - cb, d - sa + sb); words.push({ kinds: [-1, 0, -1], len: [mod(al - t1), Math.sqrt(p2), mod(-be + t1)] }); } } // RSR
  { const p2 = -2 + d * d + 2 * cab + 2 * d * (sa + sb); if (p2 >= 0) { const p = Math.sqrt(p2), t2 = Math.atan2(-ca - cb, d + sa + sb) - Math.atan2(-2, p); words.push({ kinds: [1, 0, -1], len: [mod(-al + t2), p, mod(-be + t2)] }); } } // LSR
  { const p2 = d * d - 2 + 2 * cab - 2 * d * (sa + sb); if (p2 >= 0) { const p = Math.sqrt(p2), t2 = Math.atan2(ca + cb, d - sa - sb) - Math.atan2(2, p); words.push({ kinds: [-1, 0, 1], len: [mod(al - t2), p, mod(be - t2)] }); } } // RSL
  { const c = (6 - d * d + 2 * cab + 2 * d * (sa - sb)) / 8; if (Math.abs(c) <= 1) { const p = mod(TAU - Math.acos(c)), t = mod(al - Math.atan2(ca - cb, d - sa + sb) + p / 2); words.push({ kinds: [-1, 1, -1], len: [t, p, mod(al - be - t + p)] }); } } // RLR
  { const c = (6 - d * d + 2 * cab + 2 * d * (sb - sa)) / 8; if (Math.abs(c) <= 1) { const p = mod(TAU - Math.acos(c)), t = mod(-al - Math.atan2(ca - cb, d + sa - sb) + p / 2); words.push({ kinds: [1, -1, 1], len: [t, p, mod(be - al - t + p)] }); } } // LRL
  // The shortest that lands where it should (each checked by where its three pieces end), walked.
  let best: Word | null = null, bestL = Infinity;
  for (const w of words) {
    const L = (w.len[0] + w.len[1] + w.len[2]) * R;
    if (L >= bestL) continue;
    const end = endOf(a, ha, w, R);
    if (Math.hypot(end[0] - b[0], end[1] - b[1]) > 1e-3 * Math.max(1, R)) continue;
    best = w; bestL = L;
  }
  if (!best) return [[a[0], a[1]], [b[0], b[1]]];
  const pts = walk(a, ha, best, R, step);
  pts[pts.length - 1] = [b[0], b[1]];
  return pts;
}

function endOf(a: P2, h: number, w: Word, R: number): P2 {
  let x = a[0], z = a[1];
  for (let s = 0; s < 3; s++) {
    const k = w.kinds[s], L = w.len[s] * R;
    if (k === 0) { x += Math.cos(h) * L; z += Math.sin(h) * L; }
    else { const f = L / R; x += k * R * (Math.sin(h + k * f) - Math.sin(h)); z -= k * R * (Math.cos(h + k * f) - Math.cos(h)); h += k * f; }
  }
  return [x, z];
}

function walk(a: P2, h: number, w: Word, R: number, step: number): [number, number][] {
  const pts: [number, number][] = [[a[0], a[1]]];
  let x = a[0], z = a[1];
  for (let s = 0; s < 3; s++) {
    const k = w.kinds[s], L = w.len[s] * R, n = Math.max(1, Math.ceil(L / step));
    if (L < 1e-9) continue;
    const x0 = x, z0 = z, h0 = h;
    for (let i = 1; i <= n; i++) {
      const l = (L * i) / n;
      if (k === 0) { x = x0 + Math.cos(h0) * l; z = z0 + Math.sin(h0) * l; }
      else { const f = (k * l) / R; x = x0 + k * R * (Math.sin(h0 + f) - Math.sin(h0)); z = z0 - k * R * (Math.cos(h0 + f) - Math.cos(h0)); }
      pts.push([x, z]);
    }
    if (k !== 0) h = h0 + (k * L) / R;
  }
  return pts;
}

/** The links of a route through `stones` in order, each curved (curveLink) and never turning tighter than R: the first,
 *  `depart` (the treehouse's departure curve, ending at stones[0]), as it is; the rest from each stone to the next,
 *  leaving and arriving on their ways through. Each stone's way starts as wayThrough's (the first stone's, the way the
 *  departure arrives); then, where its two links meet others, the way through it is turned (a little, a lot, or round:
 *  looping round it the other way) to whichever meets the fewest, then the shortest (`passes` times over the stones).
 *  keep(i, j): links i and j may meet (the straight line's own few crossings, Ed's: rules/leyroute.ts addCrossings). */
export function curvedLinks(depart: readonly P2[], stones: readonly P2[], R: number, step = 4, passes = 3, keep: (i: number, j: number) => boolean = () => false): [number, number][][] {
  return fitWays(depart, stones, R, { step, passes, keep }).links;
}

/** curvedLinks, with the ways it chose. `from`: ways to start from (NaN: worked out afresh), and `only`: the stones whose
 *  ways may change (the rest kept), for a route changed in one place (rules/leyroute.ts curved). Which links meet is kept
 *  in a table, worked out once and then only for the links a change touches. */
export function fitWays(depart: readonly P2[], stones: readonly P2[], R: number, o: { step?: number; passes?: number; keep?: (i: number, j: number) => boolean; from?: readonly number[]; only?: [number, number] } = {}): { links: [number, number][][]; heads: number[] } {
  const step = o.step ?? 4, passes = o.passes ?? 3, keep = o.keep ?? (() => false), lo = Math.max(1, o.only?.[0] ?? 1), hi = o.only?.[1] ?? Infinity, free = (s: number) => s >= lo && s <= hi;
  const heads = stoneWays(depart, stones).map((h, i) => (o.from && Number.isFinite(o.from[i]) ? o.from[i] : h)), n = stones.length;
  const links: [number, number][][] = [depart.map(p => [p[0], p[1]] as [number, number])];
  const FIT = Math.max(step, 8), link = (i: number, at = FIT) => curveLink(stones[i - 1], heads[i - 1], stones[i], heads[i], R, at); // (links[i] runs into stones[i]; fitted coarser, drawn at `step`)
  for (let i = 1; i < n; i++) links.push(link(i));
  const box = links.map(boxOf), lenOf = (l: readonly P2[]) => { let t = 0; for (let k = 1; k < l.length; k++) t += Math.hypot(l[k][0] - l[k - 1][0], l[k][1] - l[k - 1][1]); return t; };
  const meet = (i: number, j: number, li = links[i], bi = box[i]) => {
    if (i === j || keep(Math.min(i, j), Math.max(i, j))) return false;
    const q = box[j];
    if (bi[2] < q[0] || q[2] < bi[0] || bi[3] < q[1] || q[3] < bi[1]) return false;
    return i < j ? polylinesMeet(li, links[j]) : polylinesMeet(links[j], li);
  };
  // The table: which links each meets (only links that can change, and what they meet, when `only`).
  const adj = links.map(() => new Set<number>());
  const scan = (k: number) => { for (const j of adj[k]) adj[j].delete(k); adj[k].clear(); for (let j = 1; j < links.length; j++) if (meet(k, j)) { adj[k].add(j); adj[j].add(k); } };
  const changeable = (k: number) => free(k) || free(k - 1); // (link k runs from stone k - 1 to stone k)
  for (let k = 1; k < n; k++) if (changeable(k)) scan(k);
  const set = (s: number, h: number) => { heads[s] = h; for (const k of [s, s + 1]) if (k >= 1 && k < n) { links[k] = link(k); box[k] = boxOf(links[k]); } };
  const rescan = (s: number) => { for (const k of [s, s + 1]) if (k >= 1 && k < n) scan(k); };
  // The cost of stone s's two links as they'd be: what they meet, then their length.
  const costAt = (span: number[], bound = Infinity) => {
    let c = 0, L = 0;
    for (const k of span) { for (let j = 1; j < links.length; j++) if (!(span.includes(j) && j < k) && meet(k, j)) { c++; if (c * 1e6 > bound) return Infinity; } L += lenOf(links[k]); }
    return c * 1e6 + L;
  };
  // The ways tried through stone s: turns off its bisector, and along the straight to each neighbour and back (so two stones
  // close together can be joined nearly straight instead of looping round each other).
  const waysFor = (s: number, base: number, turns: readonly number[]) => {
    const out = turns.map(t => base + t);
    for (const q of [s - 1, s + 1]) if (q >= 0 && q < n) { const h = q < s ? headingOf(stones[q], stones[s]) : headingOf(stones[s], stones[q]); out.push(h, h + Math.PI); }
    return out;
  };
  const bisector = (s: number) => wayThrough(stones[s - 1], stones[s], s + 1 < n ? stones[s + 1] : null);
  const spanOf = (s: number, w = 2) => Array.from({ length: w }, (_, k) => s + k).filter(k => k >= 1 && k < n);
  // One stone's way at a time, where its links meet another.
  for (let pass = 0; pass < passes; pass++) {
    let changed = false;
    for (let s = lo; s < Math.min(n, hi + 1); s++) { // (stone 0's way is the departure's)
      if (!adj[s]?.size && !adj[s + 1]?.size) continue;
      const was = heads[s], span = spanOf(s);
      let best = was, bestCost = costAt(span);
      for (const h of waysFor(s, bisector(s), TURNS)) {
        if (Math.abs(Math.atan2(Math.sin(h - was), Math.cos(h - was))) < 1e-9) continue;
        set(s, h);
        const c = costAt(span, bestCost);
        if (c < bestCost - 1e-6) { bestCost = c; best = h; }
      }
      set(s, best); rescan(s);
      if (best !== was) changed = true;
    }
    if (!changed) break;
  }
  // Then where two links still meet (a loop through an S-bend, or a wide swing into a strand passing close by: one stone's
  // way can't undo it alone), the ways through two neighbouring stones at either end of either link turned together.
  for (let round = 0; round < 4; round++) {
    let fixed = false;
    for (let i = 1; i < n; i++) for (const j of [...adj[i]]) {
      if (j <= i || !adj[i].has(j)) continue;
      const near = j - i <= 3 ? Array.from({ length: j - i + 2 }, (_, k) => i - 1 + k) : [i - 1, i, j - 1, j];
      for (const s of near) {
        if (s < 1 || s >= n - 1 || !free(s) || !free(s + 1) || !adj[i].has(j)) continue;
        const span = spanOf(s, 3), w0 = heads[s], w1 = heads[s + 1], b0 = bisector(s), b1 = bisector(s + 1);
        const set2 = (h0: number, h1: number) => { heads[s] = h0; heads[s + 1] = h1; for (const k of span) { links[k] = link(k); box[k] = boxOf(links[k]); } };
        let best: [number, number] = [w0, w1], bestCost = costAt(span);
        for (const h0 of waysFor(s, b0, PAIR_TURNS)) for (const h1 of waysFor(s + 1, b1, PAIR_TURNS)) { set2(h0, h1); const c = costAt(span, bestCost); if (c < bestCost - 1e-6) { bestCost = c; best = [h0, h1]; } }
        set2(best[0], best[1]);
        for (const k of span) scan(k);
        if (best[0] !== w0 || best[1] !== w1) fixed = true;
      }
    }
    if (!fixed) break;
  }
  for (let i = 1; i < n; i++) links[i] = link(i, step);
  return { links, heads };
}

/** The ways through a stone tried (turns off its bisector): near it first, then all round. */
const TURNS = [0, -0.35, 0.35, -0.7, 0.7, ...Array.from({ length: 12 }, (_, k) => ((k + 1) / 13) * TAU)];
/** Fewer for two stones turned together. */
const PAIR_TURNS = [0, -0.35, 0.35, -0.7, 0.7, -1.5, 1.5, Math.PI, Math.PI - 0.6, Math.PI + 0.6];
const boxOf = (p: readonly P2[]): number[] => { let x0 = Infinity, z0 = Infinity, x1 = -Infinity, z1 = -Infinity; for (const q of p) { if (q[0] < x0) x0 = q[0]; if (q[0] > x1) x1 = q[0]; if (q[1] < z0) z0 = q[1]; if (q[1] > z1) z1 = q[1]; } return [x0, z0, x1, z1]; };

/** Each stone's way through (radians, atan2(dz, dx)): the first's the way the departure curve arrives at it. */
export function stoneWays(depart: readonly P2[], stones: readonly P2[]): number[] {
  const n = depart.length, arrive = n >= 2 ? headingOf(depart[n - 2], depart[n - 1]) : null;
  return stones.map((s, i) => (i === 0 && arrive !== null ? arrive : wayThrough(i > 0 ? stones[i - 1] : null, s, i + 1 < stones.length ? stones[i + 1] : null)));
}

/** The tightest turn along a line (metres: the smallest radius of the circle through three of its points, the outer two
 *  about `span` metres either side of the middle one along it; Infinity for a straight one). */
export function tightestTurn(pts: readonly P2[], span = 6): number {
  const L = [0];
  for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  let r = Infinity, a = 0, c = 0;
  for (let b = 1; b < pts.length - 1; b++) {
    while (a + 1 < b && L[b] - L[a + 1] >= span) a++;
    if (c < b) c = b;
    while (c < pts.length - 1 && L[c] - L[b] < span) c++;
    if (L[b] - L[a] < span * 0.5 || L[c] - L[b] < span * 0.5) continue;
    const A = pts[a], B = pts[b], C = pts[c], ab = Math.hypot(B[0] - A[0], B[1] - A[1]), bc = Math.hypot(C[0] - B[0], C[1] - B[1]), ca = Math.hypot(A[0] - C[0], A[1] - C[1]);
    const cross = Math.abs((B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0]));
    if (cross > 1e-9) r = Math.min(r, (ab * bc * ca) / (2 * cross));
  }
  return r;
}

/** The sharpest turn along a line (radians a metre), for the before-and-after report. */
export const sharpest = (pts: readonly P2[], span = 6) => 1 / tightestTurn(pts, span);
