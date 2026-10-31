import { afterEach, expect, it, vi } from "vitest";
import { createRequire } from "node:module";
const { effectsScene } = createRequire(import.meta.url)("../smoke/effects-scene.cjs");
afterEach(() => vi.unstubAllGlobals());
function scene(colours = 50, missing = 0) {
  const pixels = new Uint8ClampedArray(64 * 36 * 4);
  for (let i = 0; i < 64 * 36; i++) { pixels[i * 4] = (i % colours) * 4; pixels[i * 4 + 3] = 255; }
  vi.stubGlobal("window", { witch: { ready: true, game: { clock: { paused: false }, witch: { mode: "ground" } }, view: {
    islandDrawn: () => true, assets: { pending: 0 }, stats: { forestMissing: missing, pendingGround: 0, trees: 100, batches: 5, drawCalls: 50 },
  } } });
  vi.stubGlobal("document", { querySelector: () => ({ width: 1280, height: 720 }), createElement: () => ({
    getContext: () => ({ drawImage() {}, getImageData: () => ({ data: pixels }) }),
  }) });
}
it("rejects a black frame even when drawing counters claim the scene is ready", () => {
  scene(1); expect(effectsScene("ground")).toBe(false);
});
it("rejects an unfinished forest and the wrong flight mode even when pixels have detail", () => {
  scene(50, 1); expect(effectsScene("ground")).toBe(false);
  scene(); expect(effectsScene("treetop")).toBe(false);
});
it("reports actual drawn detail only when the complete scene and requested mode agree", () => {
  scene(); expect(effectsScene("ground")).toEqual({ mode: "ground", colours: 50, trees: 100, batches: 5, drawCalls: 50 });
});
