import { parentPort } from 'node:worker_threads';
import { generateMap, prepOf, LOOKS } from '../../src/rules/map';
import { worldOf } from '../../src/rules/rosters';
import { routeOf } from '../../src/rules/party';
import { TUNING } from '../../src/rules/tuning';
import { biomeKey } from '../../src/rules/lakeLooks';
import { loadStyle } from '../../src/render/style';
import { typeSprites, packPixels, runJob, type MakeCanvas } from '../../src/render/artBuild';

const stages: Record<string, { count: number; ms: number }> = {};
function stage<T>(name: string, fn: () => T): T {
  const at = performance.now();
  try { return fn(); } finally { const s = stages[name] ??= { count: 0, ms: 0 }; s.count++; s.ms += performance.now() - at; }
}
(globalThis as unknown as { __stage: typeof stage }).__stage = stage;

// The tested ImageData-only backend deliberately throws on unsupported canvas operations.
// It preserves pixel copies used by typeSprites/packPixels, not browser/Skia canvas timings.
export class PixelCanvas {
  data: Uint8ClampedArray;
  constructor(public width: number, public height: number) { this.data = new Uint8ClampedArray(width * height * 4); }
  getContext() {
    return {
      createImageData: (w: number, h: number) => ({ width: w, height: h, data: new Uint8ClampedArray(w * h * 4) }),
      putImageData: (img: { width: number; height: number; data: Uint8ClampedArray }, dx: number, dy: number) => stage('art.pixelCopies', () => {
        for (let y = 0; y < img.height; y++) for (let x = 0; x < img.width; x++) if (x + dx >= 0 && x + dx < this.width && y + dy >= 0 && y + dy < this.height) {
          const from = (y * img.width + x) * 4, to = ((y + dy) * this.width + x + dx) * 4;
          this.data.set(img.data.subarray(from, from + 4), to);
        }
      }),
      getImageData: (sx: number, sy: number, w: number, h: number) => stage('art.pixelCopies', () => {
        const data = new Uint8ClampedArray(w * h * 4);
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (x + sx >= 0 && x + sx < this.width && y + sy >= 0 && y + sy < this.height) {
          const from = ((y + sy) * this.width + x + sx) * 4;
          data.set(this.data.subarray(from, from + 4), (y * w + x) * 4);
        }
        return { data, width: w, height: h };
      }),
    };
  }
}

parentPort?.on('message', async job => {
  const at = performance.now();
  try {
    let result: unknown;
    if (job.kind === 'map') {
      const tuning = { ...TUNING, map: { ...TUNING.map, island: 'fox', world: 0, found: [] } };
      stage('map.archipelago', () => worldOf(0));
      const map = stage('map.generate', () => generateMap(424242, tuning));
      stage('map.route', () => routeOf(map));
      const prep = stage('map.prepRecord', () => prepOf(map));
      stage('map.structuredClone', () => structuredClone(prep));
      result = { seed: 424242, world: 0, island: 'fox', found: [] };
    } else if (job.kind === 'chart') {
      const { make } = await import('../../src/app/chartOutlines.worker');
      const outline = make(job.island, 0, [], 32, job.across);
      result = { island: job.island, across: job.across, cols: outline?.ground.cols, rows: outline?.ground.rows };
    } else if (job.kind === 'travel-art') {
      const style = loadStyle(), K = 2 / TUNING.pixelSize;
      const input = job.house
        ? { kind: 'treehouse' as const, id: 'house:22:12.5:fox', style }
        : { kind: 'type' as const, id: 25, seed: 225745, style, K, biome: biomeKey('home', 0, TUNING.biomeLooks) };
      const built = stage('art.runJob', () => runJob(input, ((w: number, h: number) => new PixelCanvas(w, h)) as unknown as MakeCanvas));
      result = { id: input.id, seed: 'seed' in input ? input.seed : undefined, biome: 'biome' in input ? input.biome : undefined, K, atlas: [built.px.width, built.px.height], backend: 'ImageData-only; no browser canvas or IDB' };
    } else {
      const style = loadStyle(), id = 0, K = 2 / (style.pixel || 2);
      const built = stage('art.generateAndBake', () => typeSprites(style, job.seed, id, K, ((w: number, h: number) => new PixelCanvas(w, h)) as unknown as MakeCanvas));
      const packed = stage('art.packAndPalette', () => packPixels(built.sprites));
      result = { representative: true, seed: job.seed, areaType: LOOKS[id].id, K, sprites: built.sprites.length, atlas: [packed.width, packed.height] };
    }
    parentPort!.postMessage({ ok: true, elapsedMs: performance.now() - at, stages, result });
  } catch (e) { parentPort!.postMessage({ ok: false, error: String(e), stages, elapsedMs: performance.now() - at }); }
});
parentPort?.postMessage({ ready: true });
