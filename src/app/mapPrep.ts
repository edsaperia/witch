// The island's map made while the chart flies (Ed, 2026-10-19: Foxtrot's transition review, option 4). After sailing, the
// game's page used to make the island on its main thread before anything moved: the archipelago (worldOf) and the map
// (generateMap), a second or several. Both need only the night's seed and the tuning, fixed the moment she chooses an island,
// so the chart starts a worker then (mapPrep.worker.ts) that makes them, the map's heavy parts as plain data (rules/map.ts
// MapPrep: which areas touch which, the land and lakes maps, the ley line's route) and the archipelago, and keeps them in
// IndexedDB under the build, the seed and the tuning. The page, landing (&arrive=1), takes them if they match and makes the map
// from them (the same map: src/rules/mapPrep.test.ts); if none is ready, or it doesn't match, it makes the map as before.
import { generateMap, hydrateMap, prepProblem, type ForestMap, type MapPrep } from "../rules/map";
import { postTracedJob } from "./workerJobTrace";
import { rememberWorld } from "../rules/rosters";
import type { Tuning } from "../rules/tuning";
import { hashText } from "../render/artCache";
import { tuningFromLink } from "./linkParams";
import { applySavedSettings } from "./settings";
import { applySettings, currentSettings } from "./playerSettings";
import { applyLoadRungs } from "./ladder";
import { getPrep, type PrepAsk, type PrepRecord } from "./mapPrepStore";

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
  applyLoadRungs(tuning);
  applySettings(currentSettings(), tuning); // (as the night's will be: app/night.ts)
  return tuning;
}

/** How the page's map was made, for the load's timings (main.ts loadTimes): from the worker's prep, or here as before. */
export let prepUsed: "worker" | "none" | "stale" | "unsound" | "failed" = "none";
/** The worker's own time making it (ms), and the hydrate's here: one slower than the other is logged (?timing=1 has the step too). */
let workerMs = 0;
export let hydrateMs = 0;
const prepMark = (seed: number, ms = 0): void => { try { performance.mark('witch:map-prep-source', { detail: { seed, status: prepUsed, workerMs, hydrateMs, checkMs: ms } }); } catch { /* no performance timeline */ } };

/** A ready map for this night (the worker's record, from IndexedDB or straight from the worker), checked: if it's this night's (the
 *  build, the seed and the whole tuning), its archipelago is taken as worldOf's and its prep returned, for newGame (or a night
 *  started in place: docs/plans/sail-without-reload.md, startNight) to make the map from; else null, and the map's made as ever. */
export function useReadyMap(rec: PrepRecord | null, seed: number, tuning: Tuning): MapPrep | null {
  const t0 = performance.now();
  prepUsed = 'none'; workerMs = 0; hydrateMs = 0; // diagnostics belong to this night, not the preceding successful prep
  if (!rec) { prepMark(seed); return null; }
  if (rec.key !== prepKey(seed, tuning)) {
    prepUsed = "stale";
    prepMark(seed, performance.now() - t0);
    // (which of the tuning's groups differ, if it was this seed's: a sailing whose tuning the chart didn't foresee)
    if (rec.key.split("|")[1] === String(seed) && rec.tuning) console.info("map prep: another tuning's", Object.keys(tuning).filter(k => JSON.stringify((tuning as unknown as Record<string, unknown>)[k]) !== JSON.stringify((rec.tuning as unknown as Record<string, unknown>)[k])));
    return null;
  }
  const bad = prepProblem(rec.prep);
  if (bad) { prepUsed = "unsound"; prepMark(seed, performance.now() - t0); console.warn("map prep: unsound, made afresh:", bad); return null; }
  rememberWorld(rec.arch);
  prepUsed = "worker"; workerMs = rec.ms;
  prepMark(seed, performance.now() - t0);
  return rec.prep;
}

/** The night's map (Ed's laptop, 2026-10-20: the sail's new page must never be slower for the prep): from its prep if there is a
 *  sound one, guarded (one that fails to hydrate is made afresh, and the map's made afresh if there's none), timed. */
export function readyMap(seed: number, tuning: Tuning, prep: MapPrep | null): ForestMap {
  const t0 = performance.now();
  if (prep) {
    try {
      const map = hydrateMap(seed, tuning, prep);
      hydrateMs = performance.now() - t0;
      try { performance.mark('witch:map-hydrated', { detail: { seed, ms: hydrateMs, workerMs } }); } catch { /* no timeline */ }
      // (by construction a hydrate skips the work the worker did: one slower than the worker's whole making is a regression to see)
      if (workerMs > 0 && hydrateMs > workerMs) console.warn(`map prep: hydrate ${Math.round(hydrateMs)} ms, slower than making it (${Math.round(workerMs)} ms in the worker)`);
      return map;
    } catch (err) { prepUsed = "failed"; prepMark(seed); console.warn("map prep: hydrate failed, made afresh:", err); }
  }
  return generateMap(seed, tuning);
}

/** The page's, after a reload: the ready map the worker kept for this night, if any (useReadyMap); never waits more than `ms`
 *  for IndexedDB. */
export async function takeMapPrep(seed: number, tuning: Tuning, ms = 1500): Promise<MapPrep | null> {
  if (typeof indexedDB === "undefined") return useReadyMap(null, seed, tuning);
  return useReadyMap(await Promise.race([getPrep(), new Promise<null>(res => setTimeout(() => res(null), ms))]), seed, tuning);
}

/** Make night `seed`'s map's prep with `tuning` in a worker (mapPrep.worker.ts): `done` resolves when it's made (or failed, or
 *  stopped: null), with the record itself if `send`, else whether it was kept in IndexedDB; `keep` false keeps it out of there. */
function prepInWorker(seed: number, tuning: Tuning, send: boolean, keep = true): { done: Promise<PrepRecord | boolean | null>; stop(): void } {
  let worker: Worker | null = null, finish: (r: PrepRecord | boolean | null) => void = () => {};
  const done = new Promise<PrepRecord | boolean | null>(res => { finish = res; });
  try {
    if (typeof Worker === "undefined") { finish(null); return { done, stop() {} }; }
    worker = new Worker(new URL("./mapPrep.worker.ts", import.meta.url), { type: "module" });
    worker.onmessage = (e: MessageEvent<{ ok: boolean; rec?: PrepRecord }>) => { finish(e.data.rec ?? e.data.ok); worker?.terminate(); worker = null; };
    worker.onerror = () => { finish(null); worker?.terminate(); worker = null; };
    postTracedJob(worker, { key: prepKey(seed, tuning), seed, tuning, send, noKeep: !keep } satisfies PrepAsk, 'map-prep', seed);
  } catch { finish(null); }
  return { done, stop() { worker?.terminate(); worker = null; finish(null); } };
}

/** The chart's: start making night `seed`'s map on island `island` (world `world`, as the link will give it) in a worker, kept in
 *  IndexedDB for the page after the reload. `done` resolves when it's kept (or failed, or stopped: null), with the record itself
 *  if `send` (for a night started without a reload, which takes it with useReadyMap; otherwise only whether it was kept, so the
 *  page's thread doesn't take in megabytes it won't use). */
export function startMapPrep(island: string, world: number | undefined, seed: number, send = false): { done: Promise<PrepRecord | boolean | null>; stop(): void } {
  return prepInWorker(seed, sailTuning(island, world, seed), send);
}

/** Existing worker, descriptor only: never overwrite the selected sailing's map cache. */
export function startGroundPrep(island: string, world: number, seed: number) {
  let worker: Worker | null = null, finish: (v: Record<string, string> | null) => void = () => {};
  const done = new Promise<Record<string, string> | null>(resolve => { finish = resolve; });
  const stop = () => { worker?.terminate(); worker = null; finish(null); };
  try {
    const tuning = sailTuning(island, world, seed);
    worker = new Worker(new URL('./mapPrep.worker.ts', import.meta.url), {type:'module'});
    worker.onmessage = (e: MessageEvent<{ok: boolean; ground?: Record<string, string>}>) => { const value = e.data.ok ? e.data.ground ?? null : null; worker?.terminate(); worker = null; finish(value); };
    worker.onerror = stop;
    worker.postMessage({key:prepKey(seed,tuning),seed,tuning,groundOnly:true} satisfies PrepAsk);
  } catch { stop(); }
  return {done,stop};
}

/** The boot's own map (Ed, 2026-10-20: the first load's home map, 1.6 s on the page in the cloud): made in a worker from the page's
 *  first moments, with the tuning the boot's night will have (app/night.ts startNight: the link's, then this browser's settings
 *  but those the link's ?set= gives), and sent straight back for useReadyMap. Null (the map made on the page, as before) with no
 *  workers, if it fails, or if it isn't back within `ms`. */
export function startBootMapPrep(seed: number, params: URLSearchParams, ms = 10000): Promise<PrepRecord | null> {
  try {
    const { tuning } = tuningFromLink(params);
    const linkSets = new Set((params.get("set") ?? "").split(";").map(p => p.split("=")[0]).filter(Boolean));
    applySavedSettings(tuning, undefined, linkSets);
    applyLoadRungs(tuning, linkSets); // (as the night's will be: app/night.ts)
    applySettings(currentSettings(), tuning);
    const job = prepInWorker(seed, tuning, true, false);
    const late = setTimeout(() => job.stop(), ms);
    return job.done.then(r => { clearTimeout(late); return r && typeof r === "object" ? r : null; });
  } catch { return Promise.resolve(null); }
}
