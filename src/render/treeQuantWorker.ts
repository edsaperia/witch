// A Web Worker that works out a tree atlas's palette of normal directions (render/treeQuant.ts) off the page's thread, for the
// pause page's Tree normal maps choice (render/treeNormalDirs.ts): a quarter to two-thirds of a second an atlas at 64 directions,
// which the page would otherwise have to take in slices over a few seconds. It answers each request with the palette, the
// index plane and the cut plane itself (sent, not copied), so the page only has to upload it: nothing of the atlas's size is
// done on the page's thread (Ed, 2026-11-12, on the game waiting for the palettes: "Don't wait for it").
import { applyNormalPalette, quantiseNormals, runToEnd, type PixelRect } from "./treeQuant";

export interface TreeQuantAsk { id: number; normal: Uint8Array; width: number; rects: PixelRect[]; k: number }
export interface TreeQuantReply { id: number; idx?: Uint8Array; pal?: Uint8Array; plane?: Uint8Array; ms: number; error?: string }

self.onmessage = (e: MessageEvent<TreeQuantAsk>) => {
  const { id, normal, width, rects, k } = e.data, t0 = performance.now();
  const post = (m: TreeQuantReply, t: Transferable[] = []) => (self as unknown as Worker).postMessage(m, t);
  try {
    const q = runToEnd(quantiseNormals(normal, width, rects, k));
    const plane = applyNormalPalette(normal, q);
    post({ id, idx: q.idx, pal: q.pal, plane, ms: performance.now() - t0 }, [q.idx.buffer, plane.buffer]);
  } catch (err) {
    post({ id, ms: performance.now() - t0, error: String(err) });
  }
};
