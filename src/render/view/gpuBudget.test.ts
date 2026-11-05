// The GPU budget's frame check (render/view/gpuBudget.ts) never makes a frame wait on the GPU for GL's error: it reads it at most
// every `gpu.errorEvery` seconds, and then only if something was allocated since the last read (the frame-sync hunt, 2026-11-04:
// each read waits for everything drawn so far, up to 1.7 s in the cloud's software renderer); once a minute as built (Ed, 2026-11-04:
// "Once a minute"), a link's ?set=gpu.errorEvery=<s> more often.
import { describe, expect, it } from "vitest";
import { TUNING as BUILT } from "../../rules/tuning";
import type { View } from "../view";
import { GpuLedger } from "../gpuLedger";
import { keepUnderBudget, newGpuState } from "./gpuBudget";

const TUNING = { mb: 1024, refWidth: 1920, refHeight: 1080, floor: 512, ceil: 2048, headroom: 0.85, keep: 3, every: 1, errorEvery: 60 };

function rig(tuning = TUNING) {
  let reads = 0;
  const gl: Record<string, unknown> = { getError: () => { reads++; return 0; } };
  for (const k of ["activeTexture", "bindTexture", "texImage2D", "bufferData"]) gl[k] = () => {};
  const ledger = new GpuLedger(gl as unknown as WebGL2RenderingContext);
  const v = { game: { tuning: { gpu: tuning } }, gpu: newGpuState(), ledger } as unknown as View;
  return { v, gl: gl as unknown as WebGL2RenderingContext, reads: () => reads };
}

describe("the GPU budget's frame check", () => {
  it("doesn't read GL's error while nothing new is made, however many frames", () => {
    const { v, reads } = rig();
    for (let f = 0; f < 60 * 60; f++) keepUnderBudget(v, f * (1000 / 60)); // (a minute at 60 frames a second)
    expect(reads()).toBe(0);
  });

  /** GL's error reads over `minutes` at 60 frames a second, something made every frame. */
  const readsOver = (minutes: number, tuning = TUNING) => {
    const { v, gl, reads } = rig(tuning);
    for (let f = 0; f < 60 * 60 * minutes; f++) {
      gl.bufferData(0x8892, 64, 0x88e4); // (something made every frame)
      keepUnderBudget(v, f * (1000 / 60));
    }
    return reads();
  };

  it("checks once a minute as built (Ed, 2026-11-04: \"Once a minute\")", () => {
    expect(BUILT.gpu?.errorEvery).toBe(60);
  });

  it("reads it at most every errorEvery seconds while art keeps arriving, never a frame: once a minute as built", () => {
    const n = readsOver(5);
    expect(n).toBeGreaterThan(0);
    expect(n).toBeLessThanOrEqual(5 + 1);
  });

  it("reads it more often under a link's shorter errorEvery (?set=gpu.errorEvery=5)", () => {
    expect(readsOver(1, { ...TUNING, errorEvery: 5 })).toBeGreaterThan(readsOver(1));
    expect(readsOver(1, { ...TUNING, errorEvery: 5 })).toBeLessThanOrEqual(60 / 5 + 1);
  });
});
