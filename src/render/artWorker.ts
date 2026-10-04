// A Web Worker that draws sprite sets off the page's thread, so flying into a new kind of forest
// never stutters. It answers each job with the packed atlas pixels.
import { runJob, transferables, type ArtJob } from "./artBuild";

const mk = (w: number, h: number) => new OffscreenCanvas(w, h);

self.onmessage = (e: MessageEvent<ArtJob>) => {
  const job = e.data;
  try {
    const t0 = performance.now(), result = runJob(job, mk), ms = performance.now() - t0;
    (self as unknown as Worker).postMessage({ job, result, ms }, transferables(result));
  } catch (err) {
    (self as unknown as Worker).postMessage({ job, error: String(err) });
  }
};
