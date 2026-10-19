// A Web Worker that draws sprite sets off the page's thread, so flying into a new kind of forest
// never stutters. It answers each job with the packed atlas pixels, and keeps the art cache itself (render/artCache.ts,
// IndexedDB, when the job carries its cache key): a set drawn before comes back from the cache (`cached`), a new one is written
// before it's sent on, so the page never clones a set's megabytes (the coordinator's stall hunt, 2026-10-13: each set arriving
// was a 30 to 70 ms write on the page's thread, and the garbage collector's 30 to 50 ms after it).
import { runJob, transferables, type ArtJob } from "./artBuild";
import { cacheGet, cachePut, type CacheHint } from "./artCache";

const mk = (w: number, h: number) => new OffscreenCanvas(w, h);
const post = (m: unknown, t: Transferable[] = []) => (self as unknown as Worker).postMessage(m, t);

self.onmessage = async (e: MessageEvent<ArtJob & CacheHint>) => {
  const job = e.data, key = job.cacheKey ?? null;
  try {
    if (key) { const hit = await cacheGet(key); if (hit?.px) { post({ job, result: hit, ms: 0, cached: true }, transferables(hit)); return; } }
    if (job.cacheOnly) { post({ job, miss: true }); return; } // (only if it's kept: render/assets.ts tonight)
    const t0 = performance.now(), result = runJob(job, mk), ms = performance.now() - t0;
    if (key) await cachePut(key, result); // (copied as it's put, before its buffers are sent on)
    post({ job, result, ms }, transferables(result));
  } catch (err) {
    post({ job, error: String(err) });
  }
};
