// A Web Worker that draws sprite sets off the page's thread, so flying into a new kind of forest
// never stutters. It answers each job with the packed atlas pixels, and keeps the art cache itself (render/artCache.ts,
// IndexedDB, when the job carries its cache key): a set drawn before comes back from the cache (`cached`), a new one is written
// before it's sent on, so the page never clones a set's megabytes (the coordinator's stall hunt, 2026-10-13: each set arriving
// was a 30 to 70 ms write on the page's thread, and the garbage collector's 30 to 50 ms after it).
import type { ArtJob } from "./artBuild";
import { transferables } from "./artTransfer";
import { cacheGet, cachePut } from "./artCacheStorage";
import type { CacheHint } from "./artCache";
import { beginWorkerTrace, traceSync, traceAsync } from "../app/workerJobTrace";

// Each canvas kept on the CPU (willReadFrequently, as the page's own are: ui/creator.ts cpuCanvas). A set's pixels are put into a
// canvas a frame and read back when it's packed, hundreds of times a set; on a canvas of the GPU's each read waits its turn behind
// the game's own drawing (Ed, 2026-11-13: "Why do outfits take a long time to load?"; her preview, 0.15 s of drawing on a page with
// nothing else on it, took 20 to 50 s of a worker's time over the running game on the cloud machine: docs/notes/performance.md).
const mk = (w: number, h: number) => { const c = new OffscreenCanvas(w, h); c.getContext("2d", { willReadFrequently: true }); return c; };
const post = (m: unknown, t: Transferable[] = []) => (self as unknown as Worker).postMessage(m, t);
// Hits and cache-only misses never load drawing modules. Concurrent misses share
// the first import, just as later misses reuse the already loaded module.
let drawing: Promise<typeof import("./artBuild")> | undefined;

self.onmessage = async (e: MessageEvent<ArtJob & CacheHint>) => {
  const job = e.data, key = job.cacheKey ?? null;
  const trace = beginWorkerTrace(job);
  const reply = (m: unknown, transfers: Transferable[] = [], status = 'done') => { trace?.finish(status); post(m, transfers); };
  try {
    if (key) { const hit = await traceAsync(trace, 'cache-read', () => cacheGet(key)); if (hit?.px) { reply({ job, result: hit, ms: 0, cached: true }, transferables(hit), 'cached'); return; } }
    if (job.cacheOnly) { reply({ job, miss: true }, [], 'cache-miss'); return; } // (only if it's kept: render/assets.ts tonight)
    // (a failed chunk fetch isn't kept: the next job tries the import again, rather than every later job in this worker failing)
    const { runJob } = await traceAsync(trace, 'load:art', () => drawing ??= import("./artBuild").catch(err => { drawing = undefined; throw err; }));
    const t0 = performance.now(), result = traceSync(trace, 'compute:art', () => runJob(job, mk)), ms = performance.now() - t0;
    if (key) await traceAsync(trace, 'cache-write', () => cachePut(key, result)); // (copied as it's put, before its buffers are sent on)
    reply({ job, result, ms }, transferables(result));
  } catch (err) {
    reply({ job, error: String(err) }, [], 'error');
  }
};
