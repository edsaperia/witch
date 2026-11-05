import { afterEach, expect, it, vi } from "vitest";
import * as THREE from "three";
import { OcclusionProbes } from "./occlusion";
import type { Smoke } from "./smoke";
import { emptyVeilReadTiming } from "./veilReadback";
import { createRequire } from 'node:module';
const { withProbeClock } = createRequire(import.meta.url)('../../tools/bench/veil-capture-clock.cjs');
afterEach(() => vi.unstubAllGlobals());
it("does not give a newly assigned indicator the forgotten indicator's smoke veil", () => {
  class Context {}
  vi.stubGlobal("WebGL2RenderingContext", Context);
  const renderer = { getContext: () => new Context() } as unknown as THREE.WebGLRenderer;
  const smoke = { mesh: { visible: true } } as Smoke;
  const probes = new OcclusionProbes(new THREE.Scene(), renderer, new THREE.PerspectiveCamera(), smoke);
  probes.probe("old", 0, 0, 0, 1);
  // A completed smoke readback left this slot partially veiled; no GPU is needed to test its later reuse.
  (probes as unknown as { pool: Array<{ veil: number }> }).pool[0].veil = 0.4;
  expect(probes.shown("old")).toBeCloseTo(0.6);
  for (let i = 1; i <= 122; i++) probes.update(i / 60);
  probes.probe("new", 0, 0, 0, 1);
  expect(probes.shown("new")).toBe(1);
});
it("polls at the explicit frame start, never from indicator updates", () => {
  const probes=new OcclusionProbes(new THREE.Scene(),{getContext:()=>({})} as THREE.WebGLRenderer,new THREE.PerspectiveCamera());
  const poll=vi.fn<(_target:Uint8Array,_frame:number)=>boolean>(()=>false),timing=emptyVeilReadTiming();
  (probes as unknown as {veilReader:unknown}).veilReader={poll,timing};
  probes.beginFrame();probes.update(0);probes.update(1/60);
  expect(poll).toHaveBeenCalledTimes(1);expect(poll.mock.calls[0][1]).toBe(1);
  probes.beginFrame();expect(poll).toHaveBeenCalledTimes(2);
});
it('settles real indicator easing at a fixed picture time and restores its update clock', async () => {
  class Context {}
  vi.stubGlobal('WebGL2RenderingContext', Context);
  const probes = new OcclusionProbes(new THREE.Scene(), { getContext: () => new Context() } as unknown as THREE.WebGLRenderer,
    new THREE.PerspectiveCamera(), { mesh: { visible: true } } as Smoke);
  probes.update(20); probes.probe('letter', 0, 0, 0, 1);
  const state = probes as unknown as { pool: Array<{ answer: number }>; lastTime: number };
  state.pool[0].answer = 0;
  const update = probes.update;
  await withProbeClock(probes, 20, async () => {
    for (let frame = 0; frame < 120; frame++) { probes.update(20); probes.probe('letter', 0, 0, 0, 1); }
    expect(probes.shown('letter')).toBeLessThan(1e-9);
    expect(state.lastTime).toBe(22);
  });
  expect(state.lastTime).toBe(20); expect(probes.update).toBe(update);
  expect(Object.hasOwn(probes, 'update')).toBe(false);
});
