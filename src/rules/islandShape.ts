// An island's coastline by its kind (the wave 2 finale: each woken legend dreams of its home island, "the same picture that
// lights up on the sea chart", docs/backlog/journey.md): the shape the map builds an island with, its round radius times the
// coast (rules/mapShape.ts makeCoast, the map's own `map.coast` knobs) at each angle, seeded by the island, sized by its phase.
// Drawn by art/islands.js (islandPixels for a dream bubble, islandPath for the sea chart).
import { makeCoast, type CoastKnobs } from "./mapShape";
import { islandLand } from "./map";
import type { Island } from "./rosters";
import type { Tuning } from "./tuning";

/** What an island's shape needs: its kind (a legend's species, or "home"), and, from the rosters (islandOf), its phase, seed
 *  and size in areas when known. Until then: the phase is 1, the seed the kind's own (islandSeed), the size by phase. */
export interface IslandSpec { kind: string; phase?: number; seed?: number; areas?: number }

/** A kind's own seed for its island: a hash of its name (FNV-1a), the same on every run. */
export function islandSeed(kind: string): number {
  let h = 2166136261;
  for (let i = 0; i < kind.length; i++) h = Math.imul(h ^ kind.charCodeAt(i), 16777619);
  return (h >>> 0) % 1000003;
}

/** An island's size in areas by its phase (journey.md, Ed 2026-10-10: phase islands are 10 / 20 / 30 / 40 / 50 areas; a kind of
 *  phase p, rosters' config/kinds.json, has its island in phase p + 1; home about 64 at the end). */
export const islandAreas = (phase: number): number => 10 * Math.max(1, Math.min(5, Math.round(phase) + 1));
export const HOME_AREAS = 64;

/** The coastline: `n` radii round the island (from east, clockwise as the map's angles run: atan2(z, x)), each as a share of
 *  the biggest island's radius (HOME_AREAS), so islands keep their sizes against each other; and its seed and areas. */
export function islandCoast(spec: IslandSpec, coast: CoastKnobs | undefined, n = 96): { radii: Float32Array; seed: number; areas: number } {
  const home = spec.kind === "home", seed = spec.seed ?? islandSeed(spec.kind), areas = spec.areas ?? (home ? HOME_AREAS : islandAreas(spec.phase ?? 0));
  const c = makeCoast(seed, coast), size = Math.sqrt(areas / HOME_AREAS), radii = new Float32Array(n);
  for (let k = 0; k < n; k++) radii[k] = size * c(-Math.PI + (k / n) * Math.PI * 2);
  return { radii, seed, areas };
}

/** An island's real outline (Ed, 2026-10-11, the journey's irregular islands: the shape the map grows it to, rules/islandGrowth.ts
 *  and rules/land.ts, for the sea chart and the dreams): its coast's loops (x, z interleaved, metres from home's middle; `sea` the
 *  sea's coast, else a lake's shore), the box round them, how far its furthest coast lies from home, and its areas' size. Exact,
 *  so not cheap (on a laptop about 0.1 s for a phase 1 island to 2 s for a phase 5 one, its land sampled every `step` metres):
 *  made once per island and remembered; for a whole chart, worth making off the main thread or as islands come into view. */
export interface IslandOutline { loops: { pts: Float32Array; sea: boolean }[]; box: { minX: number; maxX: number; minZ: number; maxZ: number }; far: number; areaSize: number }
const outlines = new Map<string, IslandOutline>();
export function islandOutline(island: Island, tuning: Tuning, step = 16): IslandOutline {
  const key = `${island.kind}|${island.seed}|${island.size}|${island.phase}|${step}`;
  const had = outlines.get(key);
  if (had) return had;
  const { land, home, areaSize } = islandLand(island, tuning, step);
  let far = 0;
  const loops = land.loops.map(l => {
    const pts = new Float32Array(l.pts.length);
    for (let i = 0; i < pts.length; i += 2) { pts[i] = l.pts[i] - home.x; pts[i + 1] = l.pts[i + 1] - home.z; if (l.sea) far = Math.max(far, Math.hypot(pts[i], pts[i + 1])); }
    return { pts, sea: l.sea };
  });
  const b = land.box, out = { loops, box: { minX: b.minX - home.x, maxX: b.maxX - home.x, minZ: b.minZ - home.z, maxZ: b.maxZ - home.z }, far, areaSize };
  outlines.set(key, out);
  return out;
}
