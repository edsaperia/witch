// The GPU budget's frame check (render/view/gpuBudget.ts) never makes a frame wait on the GPU for GL's error: it reads it at most
// every `gpu.errorEvery` seconds, and then only if something was allocated since the last read (the frame-sync hunt, 2026-11-04:
// each read waits for everything drawn so far, up to 1.7 s in the cloud's software renderer).
import { describe, expect, it } from "vitest";
import type { View } from "../view";
import { GpuLedger } from "../gpuLedger";
import { keepUnderBudget, newGpuState } from "./gpuBudget";

const TUNING = { mb: 1024, refWidth: 1920, refHeight: 1080, floor: 512, ceil: 2048, headroom: 0.85, keep: 3, every: 1, errorEvery: 5 };

function rig() {
  let reads = 0;
  const gl: Record<string, unknown> = { getError: () => { reads++; return 0; } };
  for (const k of ["activeTexture", "bindTexture", "texImage2D", "bufferData"]) gl[k] = () => {};
  const ledger = new GpuLedger(gl as unknown as WebGL2RenderingContext);
  const v = { game: { tuning: { gpu: TUNING } }, gpu: newGpuState(), ledger } as unknown as View;
  return { v, gl: gl as unknown as WebGL2RenderingContext, reads: () => reads };
}

describe("the GPU budget's frame check", () => {
  it("doesn't read GL's error while nothing new is made, however many frames", () => {
    const { v, reads } = rig();
    for (let f = 0; f < 60 * 60; f++) keepUnderBudget(v, f * (1000 / 60)); // (a minute at 60 frames a second)
    expect(reads()).toBe(0);
  });

  it("reads it at most every errorEvery seconds while art keeps arriving, never a frame", () => {
    const { v, gl, reads } = rig();
    for (let f = 0; f < 60 * 60; f++) {
      gl.bufferData(0x8892, 64, 0x88e4); // (something made every frame)
      keepUnderBudget(v, f * (1000 / 60));
    }
    expect(reads()).toBeGreaterThan(0);
    expect(reads()).toBeLessThanOrEqual(Math.ceil(60 / TUNING.errorEvery) + 1);
  });
});
