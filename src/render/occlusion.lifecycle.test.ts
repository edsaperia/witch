import { afterEach, expect, it, vi } from "vitest";
import * as THREE from "three";
import { OcclusionProbes } from "./occlusion";
import { createRequire } from 'node:module';
const { withProbeClock } = createRequire(import.meta.url)('../../tools/bench/veil-capture-clock.cjs');
afterEach(() => vi.unstubAllGlobals());
it('settles real indicator easing at a fixed picture time and restores its update clock', async () => {
  class Context {}
  vi.stubGlobal('WebGL2RenderingContext', Context);
  const probes = new OcclusionProbes(new THREE.Scene(), { getContext: () => new Context() } as unknown as THREE.WebGLRenderer,
    new THREE.PerspectiveCamera());
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
