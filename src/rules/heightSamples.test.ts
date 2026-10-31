import { expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { DataUtils } from 'three';
import { generateMap, hydrateMap, prepOf, prepProblem } from './map';
import { Forest } from './forest';
import { TUNING } from './tuning';
import { HeightField } from '../render/height';
import { HeightSamples, arrivalHills, heightPrepProblem, rememberHeightPrep } from './heightSamples';

const hash = (samples: unknown) => createHash('sha256').update(new Uint8Array((samples as Uint16Array).buffer)).digest('hex');
const tuning = (island: string) => ({ ...TUNING, map: { ...TUNING.map!, island, islandAreas: 10, world: 0 } });

it('retains the original quantised windows at arrival and after small and large moves', () => {
  // Frozen from fb5d5e4cd's original HeightField before extraction, shipped tuning.
  for (const [seed, island, expected] of [
    [123, 'home', ['68c4a3371c7c7c03755dfbe4ccd5db35a48acaeaa3fc15bbf3fdc4ed43e196e8', 'ce7059bd2c357eef841c3dfb9483455e869894c86ad21808b1bd17887ec27c16', '211c9e70da0879e0d83ef85f17394c85dedb41623ac8517b46d774cb0cafaef2']],
    [424242, 'fox', ['02dbc1296e91f85ff344019f140cf7a927931119b29179702772383ce07fc888', 'ee2962de444fbd25ab5b7aefb39fb16e738a2eaae2b2dade4f9bad642802bd16', '211c9e70da0879e0d83ef85f17394c85dedb41623ac8517b46d774cb0cafaef2']],
  ] as const) {
    const map = generateMap(seed, tuning(island)), H = arrivalHills(map.tuning), field = new HeightSamples(map, new Forest(map), H, DataUtils);
    const { x, z } = map.start;
    for (const _ of field.fillSteps(x, z)) { /* prepare */ }
    expect(hash(field.snapshot(H).state.half)).toBe(expected[0]);
    field.follow(x + 16, z + 16);
    expect(hash(field.snapshot(H).state.half)).toBe(expected[1]);
    field.follow(x + 1200, z + 900);
    expect(hash(field.snapshot(H).state.half)).toBe(expected[2]);
  }
});

it('hydrates the worker window without refilling, preserves rolling continuation and cache immutability', () => {
  const map = generateMap(123, tuning('home')), H = arrivalHills(map.tuning), forest = new Forest(map);
  const sync = new HeightSamples(map, forest, H, DataUtils), { x, z } = map.start;
  for (const _ of sync.fillSteps(x, z)) { /* prepare */ }
  rememberHeightPrep(map, sync.snapshot(H));
  const prep = structuredClone(prepOf(map)), original = hash(prep.heightSamples!.state.half);
  expect(prepProblem(prep)).toBeNull();
  const hydrated = hydrateMap(123, map.tuning, prep), view = new HeightField(hydrated, new Forest(hydrated), H);
  expect(view.prepSource).toBe('worker');
  expect(view.fillSteps(x, z).next().done).toBe(true);
  expect(hash(view.texture.image.data)).toBe(original);
  for (const [dx, dz] of [[16, 16], [64, -32], [1200, 900], [0, 0]]) {
    sync.follow(x + dx, z + dz); view.follow(x + dx, z + dz);
    expect(hash(view.texture.image.data)).toBe(hash(sync.snapshot(H).state.half));
    expect(view.heightAt(x + dx + 3.25, z + dz - 1.75)).toBe(sync.heightAt(x + dx + 3.25, z + dz - 1.75));
  }
  expect(hash(prep.heightSamples!.state.half)).toBe(original);
  const changed = new HeightField(hydrated, new Forest(hydrated), { ...H, amplitude: H.amplitude + 1 });
  expect(changed.prepSource).toBe('mismatch');
  expect(changed.fillSteps(x, z).next().done).toBe(false);
  view.dispose(); changed.dispose();
});

it('rejects incomplete or nonfinite height payloads instead of trusting a cached window', () => {
  expect(heightPrepProblem({})).toBe('height prep');
  const map = generateMap(123, tuning('home')), H = { ...arrivalHills(map.tuning), on: false };
  const field = new HeightSamples(map, new Forest(map), H, DataUtils);
  field.follow(map.start.x, map.start.z);
  const prep = structuredClone(field.snapshot(H));
  expect(heightPrepProblem(prep)).toBeNull();
  (prep.state.data as Float32Array)[0] = NaN;
  expect(heightPrepProblem(prep)).toBe('height sample values');
  prep.state.half = new Uint16Array(1);
  expect(heightPrepProblem(prep)).toBe('height half');
});
