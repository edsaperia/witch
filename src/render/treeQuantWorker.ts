// A Web Worker that works out a tree atlas's palette of normal directions (render/treeQuant.ts) off the page's thread, for the
// pause page's Tree normal maps choice (render/treeNormalDirs.ts): a quarter to two-thirds of a second an atlas at 64 directions,
// which the page would otherwise have to take in slices over a few seconds. It answers each request with the palette and the
// index plane (sent, not copied).
import { quantiseNormals, runToEnd, type PixelRect } from "./treeQuant";

export interface TreeQuantAsk { id: number; normal: Uint8Array; width: number; rects: PixelRect[]; k: number }
export interface TreeQuantReply { id: number; idx?: Uint8Array; pal?: Uint8Array; ms: number; error?: string }

self.onmessage = (e: MessageEvent<TreeQuantAsk>) => {
  const { id, normal, width, rects, k } = e.data, t0 = performance.now();
  const post = (m: TreeQuantReply, t: Transferable[] = []) => (self as unknown as Worker).postMessage(m, t);
  try {
    const q = runToEnd(quantiseNormals(normal, width, rects, k));
    post({ id, idx: q.idx, pal: q.pal, ms: performance.now() - t0 }, [q.idx.buffer]);
  } catch (err) {
    post({ id, ms: performance.now() - t0, error: String(err) });
  }
};
