import { expect, it, vi } from 'vitest';
import type { PrepAsk, PrepRecord } from '../app/mapPrepStore';
import { createHash } from 'node:crypto';
import { PATH_KINDS, areaPathKinds } from '../../art/generator.js';
import { generateMap, hydrateMap, prepOf, prepProblem } from './map';
import { TUNING } from './tuning';
import { knownPathGeometry, pathGeometrySteps, pathGeometryProblem, rememberPathGeometry } from './pathGeometry';

const catalog = { kinds: PATH_KINDS, byArea: areaPathKinds() as unknown as Record<string, string[]> };
const finish = <T>(steps: Generator<undefined, T>): T => { for (;;) { const n = steps.next(); if (n.done) return n.value; } };

it('retains exact pre-extraction ribbon arrays on a fixed map and a coastal island', () => {
  // Generated from a4aad736d PathView.prep's original geometry loop, before extraction.
  for (const [seed, island, hash] of [
    [123, null, '699cec1899bc8a804b60972ff8d27b15aaa510cc82e547c55a71e208603c3291'],
    [424242, 'fox', 'b54f5f8cf63b97aa0a3e408c742fd63b455b1325e099e323897677461a90703a'],
  ] as const) {
    // Override the suite's radius-map setup: the frozen reference uses shipped tuning.
    const tuning = { ...TUNING, map: { ...TUNING.map!, island: island ?? 'home', islandAreas: 10, world: 0 } };
    const data = finish(pathGeometrySteps(generateMap(seed, tuning), catalog));
    expect(createHash('sha256').update(JSON.stringify([...data.quads])).digest('hex')).toBe(hash);
  }
});

it('round-trips prepared geometry through worker cloning and map hydration; old prep falls back', () => {
  const map = generateMap(123, TUNING), data = finish(pathGeometrySteps(map, catalog));
  rememberPathGeometry(map, data);
  const prep = structuredClone(prepOf(map));
  expect(prepProblem(prep)).toBeNull();
  const hydrated = hydrateMap(123, TUNING, prep);
  expect(knownPathGeometry(hydrated)).toEqual(data);
  expect(knownPathGeometry(hydrated)).toEqual(finish(pathGeometrySteps(hydrated, catalog)));
  delete prep.pathGeometry;
  expect(prepProblem(prep)).toBeNull();
  expect(knownPathGeometry(hydrateMap(123, TUNING, prep))).toBeUndefined();
});

it('rejects malformed, inconsistent and nonfinite prepared geometry', () => {
  expect(pathGeometryProblem({ quads: [] })).toBe('path quads');
  expect(pathGeometryProblem({ quads: new Map([['dirt:0', { pos: [0], uv: [0], c: [] }]]) })).toBe('path buffer lengths');
  const data = { quads: new Map([['dirt:0', { pos: new Array(18).fill(0), uv: new Array(18).fill(0), c: new Array(12).fill(0) }]]) };
  data.quads.get('dirt:0')!.pos[0] = NaN;
  expect(pathGeometryProblem(data)).toBe('path buffer values');
});

it('the existing worker returns plain geometry without canvas or GPU objects', async () => {
  let message: { ok: boolean; rec?: PrepRecord } | undefined;
  const scope = { onmessage: null as unknown as (e: { data: PrepAsk }) => Promise<void>, postMessage: (value: typeof message) => { message = value; } };
  vi.stubGlobal('self', scope);
  try {
    await import('../app/mapPrep.worker');
    await scope.onmessage({ data: { key: 'test', seed: 123, tuning: TUNING, send: true, noKeep: true } });
    expect(message?.ok).toBe(true);
    expect(message?.rec?.prep.pathGeometry).toBeDefined();
    expect(prepProblem(structuredClone(message!.rec!.prep))).toBeNull();
    expect(message!.rec!.prep.pathGeometry).toEqual(finish(pathGeometrySteps(generateMap(123, TUNING), catalog)));
  } finally { vi.unstubAllGlobals(); }
});
