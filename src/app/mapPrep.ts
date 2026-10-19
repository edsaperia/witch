// The island's map made while the chart flies (Ed, 2026-10-19: Foxtrot's transition review, option 4). After sailing, the
// game's page used to make the island on its main thread before anything moved: the archipelago (worldOf) and the map
// (generateMap), a second or several. Both need only the night's seed and the tuning, fixed the moment she chooses an island,
// so the chart starts a worker then (mapPrep.worker.ts) that makes them, the map's heavy parts as plain data (rules/map.ts
// MapPrep: which areas touch which, the land and lakes maps, the ley line's route) and the archipelago, and keeps them in
// IndexedDB under the build, the seed and the tuning. The page, landing (&arrive=1), takes them if they match and makes the map
// from them (the same map: src/rules/mapPrep.test.ts); if none is ready, or it doesn't match, it makes the map as before.
import type { MapPrep } from "../rules/map";
import { rememberWorld } from "../rules/rosters";
import type { Tuning } from "../rules/tuning";
import { hashText } from "../render/artCache";
import { tuningFromLink } from "./linkParams";
import { applySavedSettings } from "./settings";
import { getPrep, type PrepAsk } from "./mapPrepStore";

declare const __BUILD__: string;
const BUILD = typeof __BUILD__ === "string" ? __BUILD__ : "dev";


/** A night's key: the build, the seed and the whole tuning the game will make its map with (a knob changed is another map). */
export const prepKey = (seed: number, tuning: Tuning): string => `${BUILD}|${seed}|${hashText(JSON.stringify(tuning))}`;

/** The tuning the game's page will have for this sailing (main.ts: the link's, then this browser's saved settings), from the
 *  same link the chart sails by (chartView.ts go; ui/chartOverlay.ts): island, seed, world if the chart was given one. */
export function sailTuning(island: string, world: number | undefined, seed: number): Tuning {
  const params = new URLSearchParams({ island, seed: String(seed), ...(world != null ? { world: String(world) } : {}), arrive: "1" });
  const { tuning } = tuningFromLink(params);
  applySavedSettings(tuning, undefined, new Set());
  return tuning;
}

/** How the page's map was made, for the load's timings (main.ts loadTimes): from the worker's prep, or here as before. */
export let prepUsed: "worker" | "none" | "stale" = "none";

/** The page's: the prep for this night if the worker kept one (its archipelago taken as worldOf's), else null; never waits more
 *  than `ms` for IndexedDB. */
export async function takeMapPrep(seed: number, tuning: Tuning, ms = 1500): Promise<MapPrep | null> {
  if (typeof indexedDB === "undefined") return null;
  const key = prepKey(seed, tuning);
  const rec = await Promise.race([getPrep(), new Promise<null>(res => setTimeout(() => res(null), ms))]);
  if (!rec) return null;
  if (rec.key !== key) { prepUsed = "stale"; return null; }
  rememberWorld(rec.arch);
  prepUsed = "worker";
  return rec.prep;
}

/** The chart's: start making night `seed`'s map on island `island` (world `world`, as the link will give it) in a worker. `done`
 *  resolves when it's kept (or failed, or stopped), so the chart can let the page go once it is (at most its own wait). */
export function startMapPrep(island: string, world: number | undefined, seed: number): { done: Promise<boolean>; stop(): void } {
  let worker: Worker | null = null, finish: (ok: boolean) => void = () => {};
  const done = new Promise<boolean>(res => { finish = res; });
  try {
    const tuning = sailTuning(island, world, seed);
    worker = new Worker(new URL("./mapPrep.worker.ts", import.meta.url), { type: "module" });
    worker.onmessage = (e: MessageEvent<{ ok: boolean }>) => { finish(e.data.ok); worker?.terminate(); worker = null; };
    worker.onerror = () => { finish(false); worker?.terminate(); worker = null; };
    worker.postMessage({ key: prepKey(seed, tuning), seed, tuning } satisfies PrepAsk);
  } catch { finish(false); }
  return { done, stop() { worker?.terminate(); worker = null; finish(false); } };
}
