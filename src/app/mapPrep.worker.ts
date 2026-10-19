// The island's map made off the page's thread while the chart flies (app/mapPrep.ts): the world's archipelago and the map's heavy
// parts (rules/map.ts MapPrep), kept in IndexedDB for the game's page to take as it lands.
import { generateMap, prepOf } from "../rules/map";
import { routeOf } from "../rules/party";
import { worldOf } from "../rules/rosters";
import { putPrep, type PrepAsk } from "./mapPrepStore";

self.onmessage = async (e: MessageEvent<PrepAsk>) => {
  const { key, seed, tuning } = e.data, t0 = performance.now();
  let ok = false;
  try {
    const arch = worldOf(tuning.map?.world ?? 0), map = generateMap(seed, tuning);
    routeOf(map); // (the ley line's route, worked out with the map: the page's party asks for it first thing)
    ok = await putPrep({ key, prep: prepOf(map), arch, ms: performance.now() - t0, tuning });
  } catch (err) { console.warn("map prep failed", err); }
  (self as unknown as Worker).postMessage({ ok });
};
