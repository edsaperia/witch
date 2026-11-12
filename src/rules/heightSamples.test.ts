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
  // the challenge area (rules/challenge.ts): its stone circle a terrace of its own, as a legend's circle is; and for its claim on the
  // whole circle (rules/map.ts: the areas round it cut afresh, so their stones, paths and hills move), the code unchanged; and for the fox island's
  // roster (Ed, 2026-11-04, rules/rosters.ts: one area a kind while its compass neighbourhood lasts: its areas' types, and so their hills, dealt afresh);
  // and for Ed's 2026-11-04 home (5 areas at the start, no find or challenge area till every island is found), the code unchanged; and for
  // areas 196 m across with every two sites 50 m apart (#1807, 2026-11-04: the map a sixth bigger, its stones moved), the code unchanged; and for the challenge circle 36 to 50 m (#1827,
  // Ed: "If this doesn't fit, make the circle bigger.": its claim, terrace and the stones round it moved), the code unchanged; and for
  // legends sleeping at the back of their circles (Ed, 2026-11-12: "Legends should sleep at the back of their circles, so you can stand
  // in the circle before them": the circles sized for it, up to a quarter bigger, their terraces and the sites round them moved), the code unchanged.
  for (const [seed, island, expected] of [
    [123, 'home', ['fd31e33517101b7ac6d59a60d3b54f314e99024662ba61dd5347253c8ea5b780', '3fe75ec3c6da1715b15daada5de3bb95c03b8ae2f47c9a9165bac08ecc7e3509', '211c9e70da0879e0d83ef85f17394c85dedb41623ac8517b46d774cb0cafaef2']],
    [424242, 'fox', ['5421d3d9ef00ad59ea94879f75486e0ac69ad4d8d20daacfb8b3ab9c76ef8d7e', '4bfc5364795716884bf18d6b36e69d021032c16a80037595388b1c29da1d5adb', '211c9e70da0879e0d83ef85f17394c85dedb41623ac8517b46d774cb0cafaef2']],
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
