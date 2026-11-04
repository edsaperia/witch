// Test fixtures only (test health, 2026-11-04). A fresh game on a map made from its prep (rules/map.ts MapPrep), the way the sailing
// makes the night's map (app/mapPrep.ts readyMap): the map's heavy parts made once a test file for a seed and tuning, and every game
// after the first given its own new map hydrated from them, about half newGame's work. src/rules/mapPrep.test.ts holds that a map
// made from its prep is the map made directly (its data, its closures' answers and a game on it playing the same), so a test that
// only needs a fresh game to set up gets the same game, quicker. Tests of the map's own making (the same map every time, its
// generation's cost, mapPrep itself) keep generateMap. sharedMap is for tests that only read a map: the one map, made once a file.
import { expect } from "vitest";
import { newGame } from "../rules/game";
import { generateMap, prepOf, type ForestMap, type MapPrep } from "../rules/map";
import { routeOf } from "../rules/party";
import type { Tuning } from "../rules/tuning";

// (keyed by the test file too: the suite's files share modules (vite.config.ts isolate false), and a prep is never carried from
// one file into the next)
let FILE: string | undefined;
const PREPS = new Map<string, MapPrep>(), MAPS = new Map<string, ForestMap>();
/** This file's key for a seed and tuning, the caches emptied when a new file asks. */
function keyOf(seed: number, tuning: Tuning): string {
  const file = expect.getState().testPath ?? "";
  if (file !== FILE) { FILE = file; PREPS.clear(); MAPS.clear(); }
  return `${seed} ${JSON.stringify(tuning)}`;
}

/** The prep of seed's map with this tuning, made once a test file (the worker's way: the map, its route, then a structured clone). */
export function prepFor(seed: number, tuning: Tuning): MapPrep {
  const key = keyOf(seed, tuning);
  let prep = PREPS.get(key);
  if (!prep) {
    const map = generateMap(seed, tuning);
    routeOf(map);
    prep = structuredClone(prepOf(map));
    PREPS.set(key, prep);
  }
  return prep;
}

/** generateMap(seed, tuning), made once a test file and the same map each call after: only for tests that read it (none may change
 *  it; the game's own maps are each night's, so a test that plays on one uses preppedGame). */
export function sharedMap(seed: number, tuning: Tuning): ForestMap {
  const key = keyOf(seed, tuning);
  let map = MAPS.get(key);
  if (!map) MAPS.set(key, (map = generateMap(seed, tuning)));
  return map;
}

/** newGame(seed, tuning, players), its map hydrated from prepFor's prep: a new map and game each call, nothing shared but the prep's copy. */
export function preppedGame(seed: number, tuning: Tuning, players = 1): ReturnType<typeof newGame> {
  return newGame(seed, tuning, players, structuredClone(prepFor(seed, tuning)));
}
