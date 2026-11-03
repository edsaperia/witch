import { expect, it, vi } from 'vitest';
import type { PrepAsk, PrepRecord } from '../app/mapPrepStore';
import { createHash } from 'node:crypto';
import { PATH_KINDS, areaPathKinds } from '../../art/generator.js';
import { generateMap, hydrateMap, prepOf, prepProblem } from './map';
import { TUNING } from './tuning';
import { smallWorldTuning } from '../test/worlds';
import { knownPathGeometry, pathGeometrySteps, pathGeometryProblem, rememberPathGeometry } from './pathGeometry';

const catalog = { kinds: PATH_KINDS, byArea: areaPathKinds() as unknown as Record<string, string[]> };
const payloadTuning = smallWorldTuning(TUNING, 'Worker payload cloning and hydration require valid paths, not a full world; frozen geometry references retain shipped maps.');
const finish = <T>(steps: Generator<undefined, T>): T => { for (;;) { const n = steps.next(); if (n.done) return n.value; } };

it('retains exact pre-extraction ribbon arrays on a fixed map and a coastal island', () => {
  // Generated from a4aad736d PathView.prep's original geometry loop, before extraction; re-pinned 2026-11-03 for the path network's maps (site-to-site, straight runs, wide bends) and when footpaths took
  // their looks (art/paths.js variants, dealt one a line: the same ribbons, keyed kind:variant, so split among more keys); re-pinned
  // for the challenge area (rules/challenge.ts): its clearing wider (the stone circle and its columns), so the footpaths end further out.
  for (const [seed, island, hash] of [
    [123, null, 'f2793049c2cfa74cfe6a2375cac4f899dcacfd2a2fbbf1c76ef82f393b0b4cea'],
    [424242, 'fox', 'e7ee686b18b4562e6a784019b94d3b7846351f1cc780ced50a4155e1cb50090f'],
  ] as const) {
    // Override the suite's radius-map setup: the frozen reference uses shipped tuning.
    const tuning = { ...TUNING, map: { ...TUNING.map!, island: island ?? 'home', islandAreas: 10, world: 0 } };
    const data = finish(pathGeometrySteps(generateMap(seed, tuning), catalog));
    expect(createHash('sha256').update(JSON.stringify([...data.quads])).digest('hex')).toBe(hash);
  }
});

it('round-trips prepared geometry through worker cloning and map hydration; old prep falls back', () => {
  const map = generateMap(123, payloadTuning), data = finish(pathGeometrySteps(map, catalog));
  rememberPathGeometry(map, data);
  const prep = structuredClone(prepOf(map));
  expect(prepProblem(prep)).toBeNull();
  const hydrated = hydrateMap(123, payloadTuning, prep);
  expect(knownPathGeometry(hydrated)).toEqual(data);
  expect(knownPathGeometry(hydrated)).toEqual(finish(pathGeometrySteps(hydrated, catalog)));
  delete prep.pathGeometry;
  expect(prepProblem(prep)).toBeNull();
  expect(knownPathGeometry(hydrateMap(123, payloadTuning, prep))).toBeUndefined();
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
    await scope.onmessage({ data: { key: 'test', seed: 123, tuning: payloadTuning, send: true, noKeep: true } });
    expect(message?.ok).toBe(true);
    expect(message?.rec?.prep.pathGeometry).toBeDefined();
    expect(prepProblem(structuredClone(message!.rec!.prep))).toBeNull();
    expect(message!.rec!.prep.pathGeometry).toEqual(finish(pathGeometrySteps(generateMap(123, payloadTuning), catalog)));
  } finally { vi.unstubAllGlobals(); }
});

it("deals each footpath one of its kind's looks, an area's paths taking them in turn (Ed, 2026-11-03)", () => {
  const tuning = { ...TUNING, map: { ...TUNING.map!, island: 'fox', islandAreas: 10, world: 0 } };
  const keys = [...finish(pathGeometrySteps(generateMap(424242, tuning), catalog)).quads.keys()].map(k => k.split(':'));
  for (const [kind, v] of keys) if (kind !== 'stream') expect(+v).toBeLessThan((PATH_KINDS as Record<string, { variants?: string[] }>)[kind].variants?.length ?? 1);
  const looks = (kind: string) => keys.filter(([k]) => k === kind).length;
  expect(Math.max(...['dirt', 'roots', 'animal', 'stepping', 'boardwalk'].map(looks))).toBeGreaterThanOrEqual(3); // (neighbouring paths of a kind differ)
});
