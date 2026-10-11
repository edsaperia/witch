// An island grown from its areas (Ed, 2026-10-11, the journey's irregular islands: docs/backlog/journey.md): from home outward over
// the areas' neighbours, each step taking the frontier area that's nearest home for the reach of the island that way. The reach
// is the island's shape: a seeded noise round home (lobes), arms reaching out (peninsulas) and bays cut in, and a jitter of each
// area's own (ragged bays), all by its phase (the tuning's map.shapes: home near-round, phase 1 gently lobed, 2 bays and a
// peninsula, 3 arms and inlets, 4-5 strongly irregular). Home's own neighbours always first, so home stays inland. Pure: the
// map (rules/map.ts) and the outlines for the sea chart and the dreams (rules/islandShape.ts) both grow islands with it.
import { hash2, rng } from "./random";

/** The shape of an island of a phase (the tuning's map.shapes[phase]): lobes, how far (a share of its reach) its outline swells and
 *  shrinks round home, over `harmonics` gentle bumps; arms, how far its peninsulas reach past it (a share), `armCount` of them
 *  (fewest, most), each `armWidth` radians across; bays, how deep the bays cut in (a share), `bayCount` of them; jitter, each
 *  area's own seeded nudge (in areas), for ragged edges. */
export interface ShapeKnobs { lobes: number; harmonics: number; arms: number; armCount: number[]; armWidth: number; bays: number; bayCount: number[]; jitter: number }

/** The default shapes by phase (home, 1 to 5), if the tuning has none. */
export const SHAPES: ShapeKnobs[] = [
  { lobes: 0.08, harmonics: 3, arms: 0, armCount: [0, 0], armWidth: 0.3, bays: 0, bayCount: [0, 0], jitter: 0.15 },
  { lobes: 0.35, harmonics: 3, arms: 0, armCount: [0, 0], armWidth: 0.3, bays: 0.3, bayCount: [1, 1], jitter: 0.3 },
  { lobes: 0.4, harmonics: 4, arms: 1.1, armCount: [1, 1], armWidth: 0.3, bays: 0.5, bayCount: [1, 2], jitter: 0.4 },
  { lobes: 0.45, harmonics: 5, arms: 1.4, armCount: [2, 3], armWidth: 0.25, bays: 0.6, bayCount: [2, 3], jitter: 0.6 },
  { lobes: 0.55, harmonics: 6, arms: 1.9, armCount: [3, 4], armWidth: 0.22, bays: 0.7, bayCount: [2, 4], jitter: 0.7 },
  { lobes: 0.6, harmonics: 6, arms: 2.4, armCount: [3, 5], armWidth: 0.2, bays: 0.75, bayCount: [3, 5], jitter: 0.8 },
];

/** The knobs for a phase: the tuning's, else the defaults (clamped to the last). */
export const shapeOf = (phase: number, shapes?: readonly ShapeKnobs[]): ShapeKnobs => { const S = shapes?.length ? shapes : SHAPES; return S[Math.max(0, Math.min(S.length - 1, Math.round(phase)))]; };

/** The island's reach by bearing (a factor, about 1 on the whole): `reach(angle)`, and the most it reaches anywhere. */
export function reachOf(K: ShapeKnobs, seed: number): { reach: (angle: number) => number; most: number } {
  const r = rng(seed * 6151 + 811), terms: [number, number, number][] = [];
  for (let h = 0; h < Math.max(1, Math.round(K.harmonics)); h++) terms.push([2 + h, 0.5 + 0.5 * r(), r() * Math.PI * 2]);
  const total = terms.reduce((t, [, w]) => t + w, 0) || 1;
  const bumps: [number, number][] = []; // (angle, height: + an arm, - a bay)
  const count = (c: number[]) => Math.round(c[0] + r() * (c[1] - c[0]));
  const arms = count(K.armCount), bays = count(K.bayCount), a0 = r() * Math.PI * 2;
  for (let i = 0; i < arms; i++) bumps.push([a0 + (i / Math.max(1, arms)) * Math.PI * 2 + (r() - 0.5) * 1.2, K.arms * (0.75 + 0.5 * r())]);
  for (let i = 0; i < bays; i++) bumps.push([r() * Math.PI * 2, -K.bays * (0.7 + 0.6 * r())]);
  const w = Math.max(0.05, K.armWidth);
  const reach = (angle: number) => {
    let s = 0;
    for (const [h, wt, ph] of terms) s += wt * Math.sin(h * angle + ph);
    let v = 1 + K.lobes * (s / total);
    for (const [at, hgt] of bumps) { const d = Math.atan2(Math.sin(angle - at), Math.cos(angle - at)) / w; v += hgt * Math.exp(-d * d); }
    return Math.max(0.35, v);
  };
  return { reach, most: 1 + K.lobes + Math.max(0, ...bumps.map(b => b[1])) };
}

/** One area the island may take: its key, where its middle is from home's (in areas), and whether it has ground. */
export interface Candidate { key: string; dx: number; dz: number }

/** Grow an island of `size` areas besides home from home (`home`, its key) over `neighbours`, taking `candidates` (the areas with
 *  ground, their places from home's in areas) by K's shape: the playable areas, home among them, in the order taken. */
export function growIsland(home: string, size: number, candidates: ReadonlyMap<string, Candidate>, neighbours: ReadonlyMap<string, ReadonlySet<string>>, K: ShapeKnobs, seed: number): string[] {
  const { reach } = reachOf(K, seed), taken = new Set([home]), order = [home];
  const score = (c: Candidate) => Math.hypot(c.dx, c.dz) / reach(Math.atan2(c.dz, c.dx)) + K.jitter * (hash2(...keyXY(c.key), seed + 4447) - 0.5);
  const frontier = new Map<string, number>();
  const offer = (k: string) => { if (taken.has(k) || frontier.has(k)) return; const c = candidates.get(k); if (c) frontier.set(k, score(c)); };
  // (home's own neighbours first: home stays inland whatever the shape)
  for (const k of [...(neighbours.get(home) ?? [])].sort()) { if (order.length > size) break; if (candidates.has(k) && !taken.has(k)) { taken.add(k); order.push(k); } }
  for (const k of order) for (const q of neighbours.get(k) ?? []) offer(q);
  while (order.length < size + 1 && frontier.size) {
    let best = "", bs = Infinity;
    for (const [k, s] of frontier) if (s < bs || (s === bs && k < best)) { bs = s; best = k; }
    frontier.delete(best); taken.add(best); order.push(best);
    for (const q of neighbours.get(best) ?? []) offer(q);
  }
  return order;
}

const keyXY = (k: string): [number, number] => { const i = k.indexOf(","); return [Number(k.slice(0, i)), Number(k.slice(i + 1))]; };
