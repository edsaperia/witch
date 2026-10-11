// An island's coastline by its kind (the wave 2 finale: each woken legend dreams of its home island, "the same picture that
// lights up on the sea chart", docs/backlog/journey.md): the shape the map builds an island with, its round radius times the
// coast (rules/mapShape.ts makeCoast, the map's own `map.coast` knobs) at each angle, seeded by the island, sized by its phase.
// Drawn by art/islands.js (islandPixels for a dream bubble, islandPath for the sea chart).
import { makeCoast, type CoastKnobs } from "./mapShape";

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
