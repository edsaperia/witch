// Test fixtures only. Do not mutate production tuning or the global Vitest setup.
import type { Tuning } from "../rules/tuning";
import type { newGame } from "../rules/game";
import { REAL_KINDS, homeIsland, islandOf, knownKinds } from "../rules/rosters";

export const SMALL_WORLD_RADIUS = 2;

/** Art loading/drawing across area types must cover the largest world shipped, not the small logic fixture. */
export function largestShippedWorld() {
  const found = [...REAL_KINDS], home = homeIsland(0, knownKinds(found));
  const candidates = [home, ...REAL_KINDS.map(kind => islandOf(kind)!).filter(Boolean)];
  const largest = candidates.sort((a, b) => b.size - a.size || a.kind.localeCompare(b.kind))[0];
  return { island: largest.kind, world: 0, seed: 123, shapeSeed: largest.seed, areas: largest.size, areaKinds: largest.roster.length, found,
    reason: "Art loading and drawing across area types must cover the largest shipped world." };
}

export function largestWorldTuning(tuning: Tuning): Tuning {
  const fixture = largestShippedWorld();
  return { ...tuning, map: { ...tuning.map!, island: fixture.island, islandAreas: fixture.areas, world: fixture.world, found: fixture.found } };
}

export function smallWorldTuning(tuning: Tuning, reason: string): Tuning {
  if (!reason.trim()) throw Error("A test world needs a one-line reason for its size");
  if (!tuning.map) throw Error("A small-world fixture requires map tuning");
  return { ...tuning, map: { ...tuning.map, radius: SMALL_WORLD_RADIUS, islandAreas: 0, island: "", found: [] } };
}

/** Keep the test's seed/players/mechanics; shrink only its explicitly size-independent map. */
export function smallWorld(make: typeof newGame, reason: string): typeof newGame {
  return (seed, tuning, players = 1, ready) => {
    if (ready) throw Error("A prebuilt map needs its own explicit size fixture");
    return make(seed, smallWorldTuning(tuning, reason), players);
  };
}
