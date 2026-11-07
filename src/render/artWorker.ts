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

const mk = (w: number, h: number) => new OffscreenCanvas(w, h);
const post = (m: unknown, t: Transferable[] = []) => (self as unknown as Worker).postMessage(m, t);
// Hits and cache-only misses never load drawing modules. Concurrent misses share
// the first import, just as later misses reuse the already loaded module.
let drawing: Promise<typeof import("./artBuild")> | undefined;
// A failed import is forgotten, so the next attempt fetches again: a kept rejection turned one dropped chunk fetch
// (a busy server, a deploy replacing the hashed chunks under an open page) into every later set drawn on the page's
// thread (the pre-bake measurement, #1884: one dev-server worker failed 606 of 1886 sets). Each job retries once
// before it replies with an error.
const loadDrawing = () => drawing ??= import("./artBuild").catch((err: unknown) => { drawing = undefined; throw err; });
const loadDrawingRetry = () => loadDrawing().catch(() => loadDrawing());

self.onmessage = async (e: MessageEvent<ArtJob & CacheHint>) => {
  const job = e.data, key = job.cacheKey ?? null;
  const trace = beginWorkerTrace(job);
  const reply = (m: unknown, transfers: Transferable[] = [], status = 'done') => { trace?.finish(status); post(m, transfers); };
  try {
    if (key) { const hit = await traceAsync(trace, 'cache-read', () => cacheGet(key)); if (hit?.px) { reply({ job, result: hit, ms: 0, cached: true }, transferables(hit), 'cached'); return; } }
    if (job.cacheOnly) { reply({ job, miss: true }, [], 'cache-miss'); return; } // (only if it's kept: render/assets.ts tonight)
    const { runJob } = await traceAsync(trace, 'load:art', loadDrawingRetry);
    const t0 = performance.now(), result = traceSync(trace, 'compute:art', () => runJob(job, mk)), ms = performance.now() - t0;
    if (key) await traceAsync(trace, 'cache-write', () => cachePut(key, result)); // (copied as it's put, before its buffers are sent on)
    reply({ job, result, ms }, transferables(result));
  } catch (err) {
    reply({ job, error: String(err) }, [], 'error');
  }
};
