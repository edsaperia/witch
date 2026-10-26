// The house's floor (render/houseArt.ts paintFloorPixels), painted by a few workers at once, a band of rows each
// (render/houseFloor.worker.ts), so the page's thread never waits on it (the boot freeze, 2026-10-25: over a minute at the start, on
// any machine). Without workers (the tests), painted here.
import { HOUSE_ROOMS } from "../rules/houseRooms";
import { floorFrame, paintFloorPixels, type FloorPixels } from "./houseArt";

export function paintFloorOff(mpp: number): Promise<FloorPixels> {
  const F = floorFrame(HOUSE_ROOMS, mpp);
  if (typeof Worker === "undefined") return Promise.resolve(paintFloorPixels(HOUSE_ROOMS, mpp));
  // (bands of whole blocks, about even; up to four workers, leaving the page and the art workers a core)
  const cores = (typeof navigator !== "undefined" && navigator.hardwareConcurrency) || 2, n = Math.max(1, Math.min(4, cores - 1));
  const blocks = Math.ceil(F.h / F.B), per = Math.ceil(blocks / n), rest = new Uint8ClampedArray(F.w * F.h * 4), terrace = new Uint8ClampedArray(rest.length);
  const bands: Promise<void>[] = [];
  for (let k = 0; k < n; k++) {
    const j0 = k * per * F.B, j1 = Math.min(F.h, (k + 1) * per * F.B);
    if (j0 >= j1) break;
    bands.push(new Promise<void>((resolve, reject) => {
      let w: Worker;
      try { w = new Worker(new URL("./houseFloor.worker.ts", import.meta.url), { type: "module" }); } catch (err) { reject(err); return; }
      w.onmessage = (e: MessageEvent<{ j0: number; rest: Uint8ClampedArray; terrace: Uint8ClampedArray }>) => { rest.set(e.data.rest, e.data.j0 * F.w * 4); terrace.set(e.data.terrace, e.data.j0 * F.w * 4); w.terminate(); resolve(); };
      w.onerror = err => { w.terminate(); reject(err); };
      w.postMessage({ mpp, j0, j1 });
    }));
  }
  // (a worker that can't start or fails: painted here, as before)
  return Promise.all(bands).then(() => ({ ...F, rest, terrace }), err => { console.warn("house floor: painted on the page", err); return paintFloorPixels(HOUSE_ROOMS, mpp); });
}
