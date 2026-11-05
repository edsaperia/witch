import { afterEach, expect, it, vi } from "vitest";
import * as THREE from "three";
import { OcclusionProbes } from "./occlusion";
import type { Smoke } from "./smoke";
import { emptyVeilReadTiming } from "./veilReadback";
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
