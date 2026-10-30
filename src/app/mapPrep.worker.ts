// The island's map made off the page's thread while the chart flies (app/mapPrep.ts): the world's archipelago and the map's heavy
// parts (rules/map.ts MapPrep), kept in IndexedDB for the game's page to take as it lands.
import { generateMap, prepOf } from "../rules/map";
import { routeOf } from "../rules/party";
import { worldOf } from "../rules/rosters";
import { putPrep, type PrepAsk, type PrepRecord } from "./mapPrepStore";
import { beginWorkerTrace, traceSync, traceAsync } from "./workerJobTrace";
import { pathGeometrySteps, rememberPathGeometry } from "../rules/pathGeometry";
import { PATH_KINDS, areaPathKinds } from "../../art/generator.js";

self.onmessage = async (e: MessageEvent<PrepAsk>) => {
  const { key, seed, tuning, send, noKeep } = e.data, t0 = performance.now();
  const trace = beginWorkerTrace(e.data);
  let ok = false, rec: PrepRecord | undefined;
  try {
    const arch = traceSync(trace, 'compute:archipelago', () => worldOf(tuning.map?.world ?? 0)), map = traceSync(trace, 'compute:map', () => generateMap(seed, tuning));
    traceSync(trace, 'compute:route', () => routeOf(map)); // (the ley line's route, worked out with the map: the page's party asks for it first thing)
    traceSync(trace, 'compute:path-geometry', () => {
      const steps = pathGeometrySteps(map, { kinds: PATH_KINDS, byArea: areaPathKinds() as unknown as Record<string, string[]> });
      for (;;) { const next = steps.next(); if (next.done) { rememberPathGeometry(map, next.value); break; } }
    });
    rec = { key, prep: traceSync(trace, 'compute:prep-record', () => prepOf(map)), arch, ms: performance.now() - t0, tuning };
    ok = noKeep ? true : await traceAsync(trace, 'cache-write', () => putPrep(rec!));
  } catch (err) { console.warn("map prep failed", err); }
  trace?.finish(ok ? 'done' : 'failed');
  (self as unknown as Worker).postMessage(send && rec ? { ok, rec } : { ok });
};
