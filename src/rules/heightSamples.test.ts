import { expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { DataUtils } from 'three';
import { generateMap, hydrateMap, prepOf, prepProblem } from './map';
import { Forest } from './forest';
import { TUNING } from './tuning';
import { smallWorldTuning } from '../test/worlds';
import { HeightField } from '../render/height';
import { HeightSamples, arrivalHills, heightPrepProblem, rememberHeightPrep } from './heightSamples';

const hash = (samples: unknown) => createHash('sha256').update(new Uint8Array((samples as Uint16Array).buffer)).digest('hex');
const tuning = (island: string) => ({ ...TUNING, map: { ...TUNING.map!, island, islandAreas: 10, world: 0 } });

it('retains the original quantised windows at arrival and after small and large moves', () => {
  // Frozen from fb5d5e4cd's original HeightField before extraction, shipped tuning; re-frozen 2026-11-03 for the path network's maps
  // (the island grown one area more for tonight's find, the stones spaced: other hills under the stones), the code unchanged; and for
  // the challenge area (rules/challenge.ts): its stone circle a terrace of its own, as a legend's circle is.
  for (const [seed, island, expected] of [
    [123, 'home', ['df335192a540aa6da6db7a6434d8292cc034cfcc81874645370b25bcf7beaf4f', 'b6043e641cb6c250574097e7c8f7af4a4853d358da420a104adc73dbb53a8be4', '211c9e70da0879e0d83ef85f17394c85dedb41623ac8517b46d774cb0cafaef2']],
    [424242, 'fox', ['b3e4530f3cac6c2c1c38fab59a330ef36e21b6eddaa5df457c62218f3089fc61', '6e4ec66a3562dfed81a7fd586da5da410775f4ae0f9954b02e00506979d6bcca', '211c9e70da0879e0d83ef85f17394c85dedb41623ac8517b46d774cb0cafaef2']],
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
  const map = generateMap(123, smallWorldTuning(TUNING, 'Malformed height-buffer validation is independent of world extent.')), H = { ...arrivalHills(map.tuning), on: false };
  const field = new HeightSamples(map, new Forest(map), H, DataUtils);
  field.follow(map.start.x, map.start.z);
  const prep = structuredClone(field.snapshot(H));
  expect(heightPrepProblem(prep)).toBeNull();
  (prep.state.data as Float32Array)[0] = NaN;
  expect(heightPrepProblem(prep)).toBe('height sample values');
  prep.state.half = new Uint16Array(1);
  expect(heightPrepProblem(prep)).toBe('height half');
});
