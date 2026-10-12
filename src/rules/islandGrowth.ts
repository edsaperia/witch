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
 *  area's own seeded nudge (in areas), for ragged edges; lakes, how many lakes (fewest, most) and lakeSize, how many areas
 *  each (fewest, most: neighbouring lakes' areas merge into one water). */
export interface ShapeKnobs { lobes: number; harmonics: number; arms: number; armCount: number[]; armWidth: number; bays: number; bayCount: number[]; jitter: number; lakes?: number[]; lakeSize?: number[] }

/** The default shapes by phase (home, 1 to 5), if the tuning has none. */
export const SHAPES: ShapeKnobs[] = [
  { lobes: 0.08, harmonics: 3, arms: 0, armCount: [0, 0], armWidth: 0.3, bays: 0, bayCount: [0, 0], jitter: 0.15, lakes: [0, 0], lakeSize: [1, 1] },
  { lobes: 0.35, harmonics: 3, arms: 0, armCount: [0, 0], armWidth: 0.3, bays: 0.3, bayCount: [1, 1], jitter: 0.3, lakes: [1, 1], lakeSize: [1, 1] },
  { lobes: 0.4, harmonics: 4, arms: 1.1, armCount: [1, 1], armWidth: 0.3, bays: 0.5, bayCount: [1, 2], jitter: 0.4, lakes: [1, 2], lakeSize: [1, 2] },
  { lobes: 0.45, harmonics: 5, arms: 1.4, armCount: [2, 3], armWidth: 0.25, bays: 0.6, bayCount: [2, 3], jitter: 0.6, lakes: [1, 2], lakeSize: [1, 3] },
  { lobes: 0.55, harmonics: 6, arms: 1.9, armCount: [3, 4], armWidth: 0.22, bays: 0.7, bayCount: [2, 4], jitter: 0.7, lakes: [2, 3], lakeSize: [1, 3] },
  { lobes: 0.6, harmonics: 6, arms: 2.4, armCount: [3, 5], armWidth: 0.2, bays: 0.75, bayCount: [3, 5], jitter: 0.8, lakes: [2, 4], lakeSize: [2, 4] },
];

/** The knobs for a phase: the tuning's, else the defaults (clamped to the last). */
export const shapeOf = (phase: number, shapes?: readonly ShapeKnobs[]): ShapeKnobs => { const S = shapes?.length ? shapes : SHAPES; return S[Math.max(0, Math.min(S.length - 1, Math.round(phase)))]; };

/** The island's reach by bearing (a factor, about 1 on the whole): `reach(angle)`, and the most it reaches anywhere; turned by
 *  `turn` (radians, as atan2(z, x) turns: the archipelago's, its arms into the room it has). */
export function reachOf(K: ShapeKnobs, seed: number, turn = 0): { reach: (angle: number) => number; most: number } {
  const r = rng(seed * 6151 + 811), terms: [number, number, number][] = [];
  for (let h = 0; h < Math.max(1, Math.round(K.harmonics)); h++) terms.push([2 + h, 0.5 + 0.5 * r(), r() * Math.PI * 2]);
  const total = terms.reduce((t, [, w]) => t + w, 0) || 1;
  const bumps: [number, number][] = []; // (angle, height: + an arm, - a bay)
  const count = (c: number[]) => Math.round(c[0] + r() * (c[1] - c[0]));
  const arms = count(K.armCount), bays = count(K.bayCount), a0 = r() * Math.PI * 2;
  for (let i = 0; i < arms; i++) bumps.push([a0 + (i / Math.max(1, arms)) * Math.PI * 2 + (r() - 0.5) * 1.2, K.arms * (0.75 + 0.5 * r())]);
  for (let i = 0; i < bays; i++) bumps.push([r() * Math.PI * 2, -K.bays * (0.7 + 0.6 * r())]);
  const w = Math.max(0.05, K.armWidth);
  const reach = (turned: number) => {
    const angle = turned - turn;
    let s = 0;
    for (const [h, wt, ph] of terms) s += wt * Math.sin(h * angle + ph);
    let v = 1 + K.lobes * (s / total);
    for (const [at, hgt] of bumps) { const d = Math.atan2(Math.sin(angle - at), Math.cos(angle - at)) / w; v += hgt * Math.exp(-d * d); }
    return Math.max(0.35, v);
  };
  return { reach, most: 1 + K.lobes + Math.max(0, ...bumps.map(b => b[1])) };
}

/** An island's patch on the chart (rules/archipelago.ts), for its growth: its reach by angle (a factor about 1, its patch's shape)
 *  and how far past the patch a candidate lies (in areas; 0 inside). */
export interface PatchGrowth { reach: (angle: number) => number; outside: (c: Candidate) => number }
/** How much of an island's own shape (its phase's lobes, arms and bays) shows through its patch's: all of it (Ed, 2026-10-12: "keep
 *  arms and irregularity"); its patch, shaped round it (rules/archipelago.ts), only bounds it. */
export const PATCH_SHAPE = 1;

/** One area the island may take: its key, where its middle is from home's (in areas), and whether it has ground. */
export interface Candidate { key: string; dx: number; dz: number }

/** Grow an island of `size` areas besides home from home (`home`, its key) over `neighbours`, taking `candidates` (the areas with
 *  ground, their places from home's in areas) by K's shape: the playable areas, home among them, in the order taken. */
export function growIsland(home: string, size: number, candidates: ReadonlyMap<string, Candidate>, neighbours: ReadonlyMap<string, ReadonlySet<string>>, K: ShapeKnobs, seed: number, patch?: PatchGrowth, turn = 0): string[] {
  const shape = reachOf(K, seed, turn).reach, taken = new Set([home]), order = [home];
  // (in its patch on the chart, rules/archipelago.ts: its reach mostly the patch's, its own shape's a little, and anything past
  // the patch taken only when nothing inside is left)
  const reach = patch ? (a: number) => patch.reach(a) ** (1 - PATCH_SHAPE) * shape(a) ** PATCH_SHAPE : shape;
  const score = (c: Candidate) => Math.hypot(c.dx, c.dz) / reach(Math.atan2(c.dz, c.dx)) + K.jitter * (hash2(...keyXY(c.key), seed + 4447) - 0.5) + (patch ? patch.outside(c) * 100 : 0);
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

/** How many of an island's areas its lakes are to take, by K (seeded): the lakes' sizes, each from K.lakeSize. */
export function lakePlan(K: ShapeKnobs, seed: number): number[] {
  const r = rng(seed * 7307 + 113), pick = (c: number[] | undefined) => (c ? Math.round(c[0] + r() * (c[1] - c[0])) : 0);
  const n = pick(K.lakes), out: number[] = [];
  for (let i = 0; i < n; i++) out.push(Math.max(1, pick(K.lakeSize ?? [1, 1])));
  return out;
}

/** The lakes (Ed, 2026-10-11, the journey's lakes: from phase 1, never home): `order` an island grown with room for them
 *  (growIsland's, home first), `size` its playable areas besides home. Each lake starts at an area neither home nor home's
 *  neighbour, the most hemmed in by the island's own areas (seeded among the likeliest), and spreads over its neighbours to
 *  its size; an area is only made water if the rest stay joined to home. The island's playable areas are then the rest, the
 *  last taken left off till exactly `size` besides home remain. Pure: the map (rules/map.ts) and the outlines both use it. */
export function placeLakes(order: string[], size: number, plan: number[], neighbours: ReadonlyMap<string, ReadonlySet<string>>, seed: number): { lakes: Set<string>; playable: string[] } {
  const home = order[0], near = new Set(neighbours.get(home) ?? []), taken = new Set(order), lakes = new Set<string>(), r = rng(seed * 4391 + 29);
  const joined = (without: Set<string>, also?: string) => {
    const seen = new Set([home]), todo = [home];
    let n = 1;
    while (todo.length) for (const q of neighbours.get(todo.pop()!) ?? []) if (taken.has(q) && !without.has(q) && q !== also && !seen.has(q)) { seen.add(q); todo.push(q); n++; }
    return n === order.length - without.size - (also ? 1 : 0);
  };
  const hemmed = (k: string) => { let n = 0; for (const q of neighbours.get(k) ?? []) if (taken.has(q) && !lakes.has(q)) n++; return n; };
  const ok = (k: string) => k !== home && !near.has(k) && !lakes.has(k) && taken.has(k) && joined(lakes, k);
  for (const want of plan) {
    const cand = order.filter(ok).map(k => ({ k, s: hemmed(k) + r() * 1.5 - [...(neighbours.get(k) ?? [])].filter(q => lakes.has(q)).length * 2 })).sort((a, b) => b.s - a.s || (a.k < b.k ? -1 : 1));
    if (!cand.length) break;
    const lake = [cand[0].k];
    lakes.add(cand[0].k);
    while (lake.length < want) {
      const more = [...new Set(lake.flatMap(k => [...(neighbours.get(k) ?? [])]))].filter(ok).sort();
      if (!more.length) break;
      const k = more[Math.floor(r() * more.length)];
      lake.push(k); lakes.add(k);
    }
  }
  // (the island's own areas: the rest, the last taken left off while it has more than its size, never one that cuts it in two)
  const playable = order.filter(k => !lakes.has(k)), off = new Set(lakes);
  for (let i = playable.length - 1; i > 0 && playable.length > size + 1; i--) {
    const k = playable[i];
    if (joined(off, k)) { off.add(k); playable.splice(i, 1); }
  }
  return { lakes, playable };
}

const keyXY = (k: string): [number, number] => { const i = k.indexOf(","); return [Number(k.slice(0, i)), Number(k.slice(i + 1))]; };
