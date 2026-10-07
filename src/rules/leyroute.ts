// The ley line's route (Ed, 2026-10-06: "I think the leylines should cover the entire set of waves
// the whole time, but ideally it shouldn't cross itself, or try and minimise crossings"). With the
// route picker (party.picker "route", the default) the waves wake the areas in one order worked out
// once per map, here, and the line runs through all of them, home first: its first link the
// treehouse's departure curve (rules/departure.ts), the rest straight from stone to stone (drawn
// wandering a little, render/leylines.ts). The order is a spiral (spiralOrder; Ed, 2026-10-06, of the
// mock-up: "This last example looks great!"): out from home ring by ring, the same way round, a
// gentle in-and-out zigzag and now and then a little lobe; untangled (any two links that cross have
// the stones between them reversed, 2-opt, and a stone whose links still meet another's moved to
// wherever they cross fewest); then a few crossings added (addCrossings) within Ed's rules
// (CROSSING_RULES: at most 4, none the pulse would pass over already drawn ahead of it, 350 m apart).
// Past the rules, the noisy picker's order untangled instead. Seeded only by the map; no
// drawing here.
import type { ForestMap } from "./map";
import { departureClear, departureRoute } from "./departure";
import { polylinesMeet, segmentsMeet, type P2 } from "./crossing";
import { rng } from "./random";
import { fitWays } from "./leycurve";

export type { P2 };

export interface LeyRoute {
  /** The areas' keys in the order the waves wake them (home not among them). */
  order: string[];
  /** Each one's stone (its soundsystem's spot), in that order. */
  stones: P2[];
  /** links[i] runs into order[i]: links[0] the departure curve from the treehouse, the rest curving smoothly through
   *  each stone, never tighter than leyLines.minRadius (rules/leycurve.ts). */
  links: P2[][];
  /** The same links straight from stone to stone, as the order was planned on. */
  straight?: P2[][];
}

const ROUTES = new WeakMap<ForestMap, LeyRoute>();

/** The map's route, worked out once: from `initial`, the order the waves would wake the areas in
 *  without it (the noisy picker's: its lobes and wanderings, so every map's differs), untangled;
 *  if it still crosses itself, the order nudged a little (a few neighbouring stones swapped, seeded)
 *  and untangled again, up to TRIES times, the least crossed kept (none, on every seed tried). */
export function leyRoute(map: ForestMap, initial: () => string[], fallback?: () => string[], finish?: (r: LeyRoute) => LeyRoute, others?: () => string[][]): LeyRoute {
  let r = ROUTES.get(map);
  if (!r) {
    r = planRoute(map, initial());
    // A route that turns back toward home late on (untangling can reverse a long run: seed 2 once the ghost areas went,
    // Ed v1628; seed 32 before): the other orders planned too, the one with the least late dip that keeps Ed's crossing
    // rules kept. (Most maps' routes are sound: nothing more to plan.)
    if (others && routeShape(map, r.stones).lateDip > SPIRAL_RULES.maxDip) {
      let dip = routeShape(map, r.stones).lateDip;
      for (const o of others()) { const q = planRoute(map, o), d = routeShape(map, q.stones).lateDip; if (d < dip - 1 && withinCrossingRules(q.links)) { r = q; dip = d; } }
    }
    // A link straight over the dancefloor (Ed, 2026-10-06: never; a smaller map's first ring can leave a gap round home
    // that the spiral jumps across): the other orders planned, the first that keeps clear of it and Ed's crossing rules kept.
    const overIt = (q: LeyRoute) => q.stones.some((s, i) => i > 0 && overHome(map, q.stones[i - 1], s));
    if (others && overIt(r)) for (const o of others()) { const q = planRoute(map, o); if (!overIt(q) && withinCrossingRules(q.links) && routeShape(map, q.stones).lateDip <= SPIRAL_RULES.maxDip) { r = q; break; } }
    if (finish && withinCrossingRules(r.links)) r = finish(r);
    if (fallback && !withinCrossingRules(r.links)) r = planRoute(map, fallback());
    r = curved(map, r);
    ROUTES.set(map, r);
  }
  return r;
}

/** The route's links curved (Ed, 2026-10-06: "can we give leylines a maximum curvature so they don't kink like this?"):
 *  through every stone in one sweep, never tighter than leyLines.minRadius (rules/leycurve.ts). */
export function curved(map: ForestMap, r: LeyRoute): LeyRoute {
  if (!r.stones.length) return r;
  const R = leyRadius(map), ways = new Map<string, number>();
  let heads: number[] = [];
  const own = new Set(crossingPairs(r.links).map(([i, j]) => `${i},${j}`)); // (the straight line's own few crossings, Ed's)
  const make = (o: LeyRoute, only?: [number, number]): LeyRoute => {
    const f = fitWays(o.links[0], o.stones, R, { keep: (i, j) => own.has(`${i},${j}`), from: only ? o.order.map(k => ways.get(k) ?? NaN) : undefined, only });
    heads = f.heads;
    return { ...o, straight: o.links, links: f.links };
  };
  const keepWays = (o: LeyRoute) => o.order.forEach((k, i) => ways.set(k, heads[i])); // (the ways the kept route goes through its stones)
  const T0 = performance.now(); let best = make(r), bestPairs = crossingPairs(best.links), bestC = bestPairs.length; if (globalThis.process?.env?.LEYPROF) console.log("fit", Math.round(performance.now() - T0));
  keepWays(best);
  // A changed route's crossings: those of the links outside [lo, hi] as they were, and the changed links' afresh.
  const pairsAfter = (links: P2[][], lo: number, hi: number): [number, number][] => {
    const inn = (k: number) => k >= lo && k <= hi, out: [number, number][] = bestPairs.filter(([a, b]) => !inn(a) && !inn(b));
    for (let a = Math.max(0, lo); a <= Math.min(links.length - 1, hi); a++) for (let b = 0; b < links.length; b++) if (b !== a && !(inn(b) && b < a) && (a < b ? polylinesMeet(links[a], links[b]) : polylinesMeet(links[b], links[a]))) out.push(a < b ? [a, b] : [b, a]);
    return out;
  };
  // Where its curves still meet (a wide swing into a strand passing close by), the stones between the two links turned
  // round (2-opt, as untangle does on the straight line) and curved again, kept if it meets less and is no worse a shape.
  const dip = routeShape(map, r.stones).lateDip;
  let bestOk = withinCrossingRules(best.links, CROSSING_RULES, bestPairs);
  for (let round = 0, tried = 0; round < 6 && !bestOk && tried < 60; round++) {
    let improved = false;
    // (the curves' own crossings first; then, if the rules still fail (two of the straight line's own few curved closer
    // together than CROSSING_RULES.apart), those too; the first stone stays first: the departure leads to it)
    for (const [i, j] of [...bestPairs].sort((p, q) => +own.has(`${p[0]},${p[1]}`) - +own.has(`${q[0]},${q[1]}`))) {
      // the stones between them turned round, or one stone swapped with its neighbour near either link (two hairpins
      // close together: a stone taken in the other order)
      // (or a few round them turned round, or the stone at the crossing taken a few waves sooner or later)
      const N = best.stones.length, tries: { a: number; b: number; move?: number; perm?: number[] }[] = [[i, j], [i - 1, i + 1], [i, i + 2], [j - 1, j + 1], [j, j + 2], [i - 1, i + 2], [i - 2, i + 2], [i - 2, i + 3]].map(([a, b]) => ({ a, b }));
      for (const at of [i, j]) for (const d of [-3, -2, 2, 3]) tries.push({ a: at, b: at + d, move: 1 });
      // (at the start, where the departure fixes the first stone's way and the first stones lie close together: every
      // order of the next four)
      if (i <= 1) for (const perm of PERMS4) tries.push({ a: 1, b: 5, perm });
      for (const { a, b, move, perm } of tries) {
        let st: P2[], keys: string[];
        if (perm) {
          if (N < 6) continue;
          st = [...best.stones]; keys = [...best.order];
          perm.forEach((p, k) => { st[1 + k] = best.stones[1 + p]; keys[1 + k] = best.order[1 + p]; });
        } else if (move) {
          if (a < 1 || b < 1 || a >= N || b >= N) continue;
          st = [...best.stones]; keys = [...best.order];
          const [sv] = st.splice(a, 1), [kv] = keys.splice(a, 1); st.splice(b, 0, sv); keys.splice(b, 0, kv);
        } else {
          if (a < 1 || b > N || b - a < 2) continue;
          st = [...best.stones.slice(0, a), ...best.stones.slice(a, b).reverse(), ...best.stones.slice(b)]; keys = [...best.order.slice(0, a), ...best.order.slice(a, b).reverse(), ...best.order.slice(b)];
        }
        const straight: P2[][] = [best.straight![0] as P2[]];
        for (let k = 1; k < st.length; k++) straight.push([st[k - 1], st[k]]);
        if (++tried > 60) break;
        const lo = Math.min(a, b) - 2, hi = Math.max(a, b) + 1, o = make({ order: keys, stones: st, links: straight }, [lo, hi]), ps = pairsAfter(o.links, lo, hi + 1), c = ps.length;
        const ok = withinCrossingRules(o.links, CROSSING_RULES, ps);
        if (((ok && !bestOk) || (ok === bestOk && c < bestC)) && routeShape(map, st).lateDip <= Math.max(dip, SPIRAL_RULES.dip)) { best = o; bestPairs = ps; bestC = c; bestOk = ok; improved = true; keepWays(o); break; }
      }
      if (improved) break;
    }
    if (!improved) break;
  }
  if (globalThis.process?.env?.LEYPROF) console.log("all", Math.round(performance.now() - T0));
  return best;
}
/** Every order of four (but the one they're in). */
const PERMS4 = ((): number[][] => { const out: number[][] = [], go = (p: number[], rest: number[]) => { if (!rest.length) { if (p.join() !== "0,1,2,3") out.push(p); return; } rest.forEach((r, k) => go([...p, r], [...rest.slice(0, k), ...rest.slice(k + 1)])); }; go([], [0, 1, 2, 3]); return out; })();
/** The tightest the ley line turns (metres; leyLines.minRadius, 30 by default). */
export const leyRadius = (map: ForestMap) => map.tuning.leyLines.minRadius ?? 30;

/** Ed's limits on crossings. At most `max` a map (Ed, 2026-10-06: "A map can have at most four crossings").
 *  The pulse never passes over a crossing already drawn ahead of it (Ed, 2026-10-06; this replaced
 *  "at least 12 apart, none in the first 12"). The pulse runs along links[i] between waves i and i + 1.
 *  The drawn line's tip runs `pace` links a wave from the end of home's boot (leyLines.reveal, TIP_PACE
 *  in rules/leypulse.ts; leyReachTimes), so it starts links[j] at j / pace waves. A crossing of links i
 *  < j is fine when that's after the pulse has left links[i]: j >= pace × (i + 1) + `margin` links.
 *  Crossings at least `apart` metres from each other on the map. links[i] runs into the (i + 1)th
 *  wave's stone. */
export const CROSSING_RULES = { max: 4, pace: 3, margin: 1, apart: 350 };
/** maxDip: the planned route's late dip (routeShape) past which leyRoute plans the other orders it's given (the spiral's other ring counts).
 *  Adding crossings to the spiral (spiralRoute): each new link at most `stretch` times the mean link;
 *  no reversal pulling the route's distance from home (smoothed over `smooth` waves) back more than
 *  `dip` metres below the farthest it has been, after the first `dipFrom` waves (or the plain spiral's
 *  own worst, if more). */
export const SPIRAL_RULES = { stretch: 2, dip: 160, smooth: 9, dipFrom: 24, tries: 600, local: 12, maxDip: 380 };
export function crossingPairs(links: readonly (readonly P2[])[]): [number, number][] {
  const out: [number, number][] = [];
  for (let i = 0; i < links.length; i++) for (let j = i + 1; j < links.length; j++) if (polylinesMeet(links[i], links[j])) out.push([i, j]);
  return out;
}
/** Whether straight link a-b passes over the dancefloor (Ed, 2026-10-06: "The leyline shouldn't cross the dancefloor"):
 *  within the line's clearance round its ring of speakers (rules/departure.ts departureClear). */
export function overHome(map: ForestMap, a: P2, b: P2): boolean {
  const d = map.dancefloor, R = departureClear(map, map.tuning.leyLines.depart.avoid), vx = b[0] - a[0], vz = b[1] - a[1], l2 = vx * vx + vz * vz || 1;
  const t = Math.max(0, Math.min(1, ((d.x - a[0]) * vx + (d.z - a[1]) * vz) / l2));
  return Math.hypot(a[0] + vx * t - d.x, a[1] + vz * t - d.z) < R;
}

/** Where two segments cross (null if they don't, or only touch end to end). */
function segmentPoint(a: P2, b: P2, c: P2, d: P2): P2 | null {
  const r0 = b[0] - a[0], r1 = b[1] - a[1], s0 = d[0] - c[0], s1 = d[1] - c[1], den = r0 * s1 - r1 * s0;
  if (Math.abs(den) < 1e-12) return null;
  const t = ((c[0] - a[0]) * s1 - (c[1] - a[1]) * s0) / den, u = ((c[0] - a[0]) * r1 - (c[1] - a[1]) * r0) / den;
  return t >= 0 && t <= 1 && u >= 0 && u <= 1 ? [a[0] + t * r0, a[1] + t * r1] : null;
}
/** Where polylines p and q cross (the first place found), or null. */
export function meetPoint(p: readonly P2[], q: readonly P2[]): P2 | null {
  for (let i = 0; i + 1 < p.length; i++) for (let j = 0; j + 1 < q.length; j++) { const m = segmentPoint(p[i], p[i + 1], q[j], q[j + 1]); if (m) return m; }
  return null;
}
export function withinCrossingRules(links: readonly (readonly P2[])[], rules = CROSSING_RULES, ps = crossingPairs(links)): boolean {
  if (ps.length > rules.max || !ps.every(([i, j]) => j >= rules.pace * (i + 1) + rules.margin)) return false;
  const pts = ps.map(([i, j]) => meetPoint(links[i], links[j]) ?? links[i][0]);
  for (let a = 0; a < pts.length; a++) for (let b = a + 1; b < pts.length; b++) if (Math.hypot(pts[a][0] - pts[b][0], pts[a][1] - pts[b][1]) < rules.apart) return false;
  return true;
}

/** How a route's distance from home goes with the wave (stones in wave order): `drift`, the mean gap
 *  between the k-th wave's distance and the k-th smallest distance (0: always the nearest left);
 *  `lateDip`, after the first `from` waves, the most the distance (smoothed over `smooth` waves) falls
 *  back below the farthest it has been; `oneSided`, over each run of `window` waves, how much their
 *  directions from home agree (the length of their mean unit vector: 0 all round, 1 all one way), on
 *  average. */
export function routeShape(map: ForestMap, stones: readonly P2[], smooth = SPIRAL_RULES.smooth, from = SPIRAL_RULES.dipFrom, window = 24): { drift: number; lateDip: number; oneSided: number } {
  const d = map.dancefloor, r = stones.map(q => Math.hypot(q[0] - d.x, q[1] - d.z)), n = r.length;
  if (!n) return { drift: 0, lateDip: 0, oneSided: 0 };
  const sorted = [...r].sort((u, v) => u - v);
  const drift = r.reduce((t, x, i) => t + Math.abs(x - sorted[i]), 0) / n;
  const h = Math.floor(smooth / 2), sm = r.map((_, i) => { let t = 0, c = 0; for (let k = Math.max(0, i - h); k <= Math.min(n - 1, i + h); k++) { t += r[k]; c++; } return t / c; });
  let top = -Infinity, lateDip = 0;
  sm.forEach((x, i) => { top = Math.max(top, x); if (i >= from) lateDip = Math.max(lateDip, top - x); });
  let side = 0, wins = 0;
  for (let i = 0; i + window <= n; i++) {
    let sx = 0, sz = 0;
    for (let k = i; k < i + window; k++) { const a = Math.atan2(stones[k][0] - d.x, stones[k][1] - d.z); sx += Math.sin(a); sz += Math.cos(a); }
    side += Math.hypot(sx, sz) / window; wins++;
  }
  return { drift, lateDip, oneSided: wins ? side / wins : 0 };
}

type Seg = readonly [P2, P2];
const sameP = (a: P2, b: P2) => a[0] === b[0] && a[1] === b[1];
/** Two straight links meet (sharing a stone, only past it). */
function segsMeet(s: Seg, t: Seg): boolean {
  let [a, b] = s, [c, d] = t;
  if (Math.max(a[0], b[0]) < Math.min(c[0], d[0]) || Math.max(c[0], d[0]) < Math.min(a[0], b[0]) || Math.max(a[1], b[1]) < Math.min(c[1], d[1]) || Math.max(c[1], d[1]) < Math.min(a[1], b[1])) return false;
  if (sameP(a, c)) [a, b] = [b, a];
  else if (sameP(a, d)) { [a, b] = [b, a]; [c, d] = [d, c]; }
  else if (sameP(b, d)) [c, d] = [d, c];
  return segmentsMeet(a, b, c, d, sameP(b, c));
}
/** The spiral (Ed, 2026-10-06, of the mock-up: "This last example looks great!"; he'd found the varied
 *  order's petals and sweeps too lobey, out far too soon and staying out): the distance from home grows
 *  steadily with the wave, "more spiral-like", "a little lobe", "a few crossings", the time spent in
 *  each direction from home more even. Seeded by the map: the stones split by distance from home into
 *  K rings of equal counts (5 to 7); each ring walked the same way round (which way, per map), starting
 *  where the last ended (the first just before one of home's neighbours, so the line leaves from beside
 *  home); each ring cut into B wedges (6 to 15), visited in turn, each in order of distance, out and in
 *  alternately (a gentle zigzag); on about half the rings (not the last), one wedge reaches out as a
 *  little lobe through the next ring's stones in it (out along its first half, back along the second;
 *  the next ring skips them). */
export function spiralOrder(map: ForestMap): string[] { return spiralWith(map); }

/** The spiral with its rings: K of them, or the seeded 5 to 7 (spiralOrder). */
export function spiralWith(map: ForestMap, ringsOver?: number): string[] {
  const R = rng(map.seed * 7919 + 41), d = map.dancefloor, home = `${map.centreCell[0]},${map.centreCell[1]}`, TAU = Math.PI * 2;
  const wrap = (a: number) => ((a % TAU) + TAU) % TAU;
  type Pt = { k: string; r: number; a: number; p: P2 };
  const all: Pt[] = [];
  for (const [x, y] of map.cells) {
    const k = `${x},${y}`;
    if (k === home) continue;
    const q = map.soundsystemSpot(x, y);
    all.push({ k, r: Math.hypot(q.x - d.x, q.z - d.z), a: Math.atan2(q.x - d.x, q.z - d.z), p: [q.x, q.z] });
  }
  // Clockwise on the screen (dir -1: angles run 0 south, PI/2 east), starting east of home, where the line leaves it (Ed,
  // 2026-10-06: "After going around the speaker circle it should go off to the right and loop around to whatever direction
  // it needs to go"; rules/departure.ts): round the speakers from the treehouse and off to the right, so the spiral goes
  // on the way the line came, never folding back. (It was either way round, from anywhere, seeded.)
  const K0 = 5 + Math.floor(R() * 3), K = ringsOver ?? K0, dir = (R(), -1), seeded = (R(), Math.PI / 2), n = all.length;
  const byR = [...all].sort((u, v) => u.r - v.r), rings: Pt[][] = [];
  for (let i = 0; i < K; i++) rings.push(byR.slice(Math.round((i * n) / K), Math.round(((i + 1) * n) / K)));
  // The first stone: the innermost of the first ring's just past the line's way out (so the ring's end, coming back round,
  // passes outside the line leaving home); else the first of home's neighbours round from there.
  const near = all.filter(p => map.neighbours.get(home)?.has(p.k)), past = rings[0].filter(p => wrap(dir * (p.a - seeded)) < 0.6);
  const first = past.length ? past.reduce((m, p) => (p.r < m.r ? p : m)) : near.length ? near.reduce((m, p) => (wrap(dir * (p.a - seeded)) < wrap(dir * (m.a - seeded)) ? p : m)) : null;
  let from = first ? first.a - dir * 1e-3 : seeded;
  const rel = (p: Pt) => wrap(dir * (p.a - from));
  const out: Pt[] = [], used = new Set<string>();
  let last: Pt | null = null;
  const take = (list: Pt[]) => { for (const p of list) if (!used.has(p.k)) { used.add(p.k); out.push(p); last = p; } };
  const up = (u: Pt, v: Pt) => u.r - v.r, down = (u: Pt, v: Pt) => v.r - u.r;
  for (let ri = 0; ri < K; ri++) {
    const B = 6 + Math.floor(R() * 10), w = TAU / B, lobe = ri < K - 1 && R() < 0.5 ? Math.floor(R() * B) : -1;
    let outward = true;
    for (let b = 0; b < B; b++) {
      const inB = (p: Pt) => !used.has(p.k) && rel(p) >= b * w && rel(p) < (b + 1) * w;
      const q = rings[ri].filter(inB);
      if (b === lobe) {
        // (only the inner part of the next ring's stones there, so that ring can pass round outside its tip)
        const nx = rings[ri + 1], rMid = nx.length ? nx[Math.floor(nx.length / 2)].r : Infinity;
        const both = [...q, ...nx.filter(p => inB(p) && p.r < rMid)], mid = (b + 0.5) * w;
        take(both.filter(p => rel(p) < mid).sort(up));
        take(both.filter(p => rel(p) >= mid).sort(down));
        outward = true;
        continue;
      }
      if (!q.length) continue;
      take(q.sort(outward ? up : down));
      outward = !outward;
    }
    take(rings[ri].filter(p => !used.has(p.k)).sort((u, v) => rel(u) - rel(v))); // (any on a wedge's edge)
    if (last) from = (last as Pt).a - dir * 1e-3;
  }
  take(all.filter(p => !used.has(p.k)).sort(up));
  // Local tangles (a wedge's zigzag crossing itself or the next) undone by reversing short runs only,
  // and a stone poking across another ring's link moved onto that link, which leaves the spiral's
  // shape as it is; untangle sees to anything left.
  const meets = (i: number, j: number) => segmentsMeet(out[i - 1].p, out[i].p, out[j - 1].p, out[j].p, j === i + 1);
  const stuck = new Set<string>(); // (crossings no move helped: not tried again)
  for (let round = 0; round < 80; round++) {
    let best = null as Pt[] | null, bestD = 0;
    const was = [...out], N = was.length, link = (k: number): Seg => [was[k - 1].p, was[k].p];
    // How many more crossings: the links a move takes away (by their index in `was`) against those it adds.
    const delta = (gone: number[], added: Seg[]) => {
      const g = new Set(gone.filter(k => k >= 1 && k < N)), lost = [...g].map(link);
      const count = (list: Seg[]) => { let c = 0; for (let x = 0; x < list.length; x++) { for (let k = 1; k < N; k++) if (!g.has(k) && segsMeet(list[x], link(k))) c++; for (let y = x + 1; y < list.length; y++) if (segsMeet(list[x], list[y])) c++; } return c; };
      return count(added) - count(lost);
    };
    for (let i = 2; i < was.length && !best; i++) for (let j = i + 1; j < was.length; j++) {
      if (!meets(i, j)) continue;
      const id = `${was[i - 1].k} ${was[i].k} ${was[j - 1].k} ${was[j].k}`;
      if (stuck.has(id)) continue;
      // a run of one to three stones by either link, moved (either way round) onto the other link
      for (const [near, onto] of [[i, j], [j, i]] as [number, number][]) for (let len = 1; len <= 3; len++) for (let from = near - len; from <= near; from++) {
        if (from < 1 || from + len > was.length || (onto > from && onto <= from + len)) continue;
        const run = was.slice(from, from + len), rest = [...was.slice(0, from), ...was.slice(from + len)], at = rest.indexOf(was[onto]);
        if (at < 1) continue;
        const back = from + len < N, same = at === from; // (put back where it was: only turned round)
        for (const r of len > 1 ? [run, [...run].reverse()] : same ? [] : [run]) {
          const added: Seg[] = [[rest[at - 1].p, r[0].p]];
          if (at < rest.length) added.push([r[r.length - 1].p, rest[at].p]);
          if (back && !same) added.push([was[from - 1].p, was[from + len].p]);
          const dl = delta(same ? [from, from + len] : [from, from + len, onto], added);
          if (dl < bestD) { bestD = dl; best = [...rest.slice(0, at), ...r, ...rest.slice(at)]; }
        }
      }
      if (best) break;
      stuck.add(id);
    }
    if (!best) break;
    out.splice(0, out.length, ...best);
  }
  for (let pass = 0; pass < 50; pass++) {
    let changed = false;
    for (let i = 2; i < out.length; i++) for (let j = i + 2; j < Math.min(out.length, i + SPIRAL_RULES.local); j++) if (meets(i, j)) {
      for (let a = i, b = j - 1; a < b; a++, b--) [out[a], out[b]] = [out[b], out[a]];
      changed = true;
    }
    if (!changed) break;
  }
  return out.map(p => p.k);
}

/** A few crossings added to an uncrossed route (Ed: "a few crossings"): 0 to CROSSING_RULES.max a map,
 *  seeded, each made by reversing a run of stones (2-opt backwards), kept only if the route stays within
 *  CROSSING_RULES, the two new links stay short (SPIRAL_RULES.stretch) and it doesn't pull the route back
 *  toward home (SPIRAL_RULES.dip). */
export function addCrossings(map: ForestMap, route: LeyRoute): LeyRoute {
  const R = rng(map.seed * 3571 + 59), target = Math.floor(R() * (CROSSING_RULES.max + 1)), n = route.stones.length;
  if (!target || n < 8) return route;
  let keys = [...route.order], st = [...route.stones];
  const linksOf = (s: readonly P2[]) => { const l: P2[][] = [route.links[0] as P2[]]; for (let i = 1; i < s.length; i++) l.push([s[i - 1], s[i]]); return l; };
  const len = (a: P2, b: P2) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  let meanLen = 0;
  for (let i = 1; i < n; i++) meanLen += len(st[i - 1], st[i]);
  meanLen /= n - 1;
  const dipCap = Math.max(SPIRAL_RULES.dip, routeShape(map, st).lateDip);
  let count = crossingPairs(linksOf(st)).length, tries = 0;
  // The reversals that could do: stones i..j-1 turned round, so links i and j become st[i-1] → st[j-1]
  // and st[i] → st[j], both short, and j late enough for the pulse (CROSSING_RULES); tried in a seeded
  // order, the list made afresh after each one kept.
  while (count < target && tries < SPIRAL_RULES.tries) {
    const cap = SPIRAL_RULES.stretch * meanLen, pairs: [number, number][] = [];
    for (let i = 1; i < n; i++) for (let j = CROSSING_RULES.pace * (i + 1) + CROSSING_RULES.margin; j < n; j++) if (len(st[i - 1], st[j - 1]) <= cap && len(st[i], st[j]) <= cap && !overHome(map, st[i - 1], st[j - 1]) && !overHome(map, st[i], st[j])) pairs.push([i, j]);
    for (let k = pairs.length - 1; k > 0; k--) { const r = Math.floor(R() * (k + 1)); [pairs[k], pairs[r]] = [pairs[r], pairs[k]]; }
    let kept = false;
    for (const [i, j] of pairs) {
      if (++tries > SPIRAL_RULES.tries) break;
      const s2 = [...st.slice(0, i), ...st.slice(i, j).reverse(), ...st.slice(j)];
      const l1 = linksOf(st), l2 = linksOf(s2), m = (L: P2[][], a: number, b: number) => (a < b ? polylinesMeet(L[a], L[b]) : polylinesMeet(L[b], L[a]));
      const cnt = (L: P2[][], k: number) => { let c = 0; for (let x = 0; x < L.length; x++) if (x !== k && m(L, x, k)) c++; return c; };
      const c2 = count - cnt(l1, i) - cnt(l1, j) + (m(l1, i, j) ? 1 : 0) + cnt(l2, i) + cnt(l2, j) - (m(l2, i, j) ? 1 : 0);
      if (c2 <= count || c2 > target || routeShape(map, s2).lateDip > dipCap || !withinCrossingRules(l2)) continue;
      st = s2; keys = [...keys.slice(0, i), ...keys.slice(i, j).reverse(), ...keys.slice(j)]; count = c2; kept = true;
      break;
    }
    if (!kept) break;
  }
  return { order: keys, stones: st, links: linksOf(st) };
}

const TRIES = 30;

export function planRoute(map: ForestMap, order: string[]): LeyRoute {
  let best = untangle(map, order) ?? { order: [], stones: [], links: [] }, bestC = crossingsOf(best.links);
  const R = rng(map.seed * 4099 + 17);
  for (let t = 1; t <= TRIES && bestC > 0; t++) {
    const o = [...order];
    for (let k = 0; k < 3 + t; k++) { const i = 1 + Math.floor(R() * (o.length - 2)); [o[i], o[i + 1]] = [o[i + 1], o[i]]; }
    const r = untangle(map, o), c = r ? crossingsOf(r.links) : Infinity;
    if (r && c < bestC) { best = r; bestC = c; }
  }
  return best;
}

const crossingsOf = (links: readonly (readonly P2[])[]) => {
  let c = 0;
  for (let i = 0; i < links.length; i++) for (let j = i + 1; j < links.length; j++) if (polylinesMeet(links[i], links[j])) c++;
  return c;
};

/** A route through these areas in this order (home's not among them, the first kept first: the
 *  departure curve leads to it), untangled: wherever two links cross, the stones between them
 *  reversed (2-opt), then a stone at a crossing moved to wherever its links cross fewest. */
export function untangle(map: ForestMap, order: readonly string[]): LeyRoute | null {
  const keys = [...order], st = keys.map(k => { const [x, y] = k.split(",").map(Number), q = map.soundsystemSpot(x, y); return [q.x, q.z] as P2; }), n = st.length;
  if (!n) return null;
  const D = map.tuning.leyLines.depart, depart = departureRoute(map, { x: st[0][0], z: st[0][1] }, D.avoid, 4) as P2[];
  // (The first stone stays first: the departure curve leads to it.)
  const swap = (i: number, j: number) => { for (; i < j; i++, j--) { [st[i], st[j]] = [st[j], st[i]]; [keys[i], keys[j]] = [keys[j], keys[i]]; } };
  const meets = (i: number, j: number) => (i === 0 ? polylinesMeet(depart, [st[j - 1], st[j]]) : segmentsMeet(st[i - 1], st[i], st[j - 1], st[j], j === i + 1));
  const twoOpt = () => {
    for (let pass = 0; pass < 200; pass++) {
      let changed = false;
      for (let i = 1; i < n; i++) for (let j = i + 2; j < n; j++) if (meets(i, j)) { swap(i, j - 1); changed = true; }
      if (!changed) return;
    }
  };
  twoOpt();
  // Then a stone at a crossing moved, while that helps: wherever the links it changes (into it, into
  // the stone after it, and into the one that followed it where it was) cross the fewest others.
  const crossingsAt = (idx: number[]) => {
    const set = [...new Set(idx.filter(i => i >= 0 && i < n))];
    let c = 0;
    for (const k of set) for (let i = 0; i < n; i++) if (i !== k && !(set.includes(i) && i < k) && meets(Math.min(i, k), Math.max(i, k))) c++;
    return c;
  };
  for (let round = 0; round < 8; round++) {
    let at = -1;
    for (let i = 0; i < n && at < 0; i++) for (let j = i + 1; j < n && at < 0; j++) if (meets(i, j)) at = j;
    if (at < 0) break;
    let moved = false;
    for (const k of [at, at - 1]) {
      if (k < 1 || moved) continue;
      const before = crossingsAt([k, k + 1]), sk = st[k], kk = keys[k], next = keys[k + 1];
      st.splice(k, 1); keys.splice(k, 1);
      let best = -1, bestC = before;
      for (let p = 1; p <= st.length; p++) {
        if (p === k) continue;
        st.splice(p, 0, sk); keys.splice(p, 0, kk);
        const c = crossingsAt([p, p + 1, next === undefined ? -1 : keys.indexOf(next)]);
        st.splice(p, 1); keys.splice(p, 1);
        if (c < bestC) { bestC = c; best = p; if (c === 0) break; }
      }
      st.splice(best >= 0 ? best : k, 0, sk); keys.splice(best >= 0 ? best : k, 0, kk);
      moved = best >= 0;
    }
    if (!moved) break;
    twoOpt();
  }
  const links: P2[][] = [depart];
  for (let i = 1; i < n; i++) links.push([st[i - 1], st[i]]);
  return { order: keys, stones: st, links };
}
