// Exercise the real outline-worker queue with tiny synthetic terrain, no browser or generated game world.
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { chartOrder } from './chartWarm';
import { KIND_NAMES } from '../rules/rosters';
import type { OutlineAsk, OutlineDone } from './chartOutlines.worker';

const fixture = vi.hoisted(() => ({ cache: new Map<string, unknown>(), generated: vi.fn() }));
vi.mock('./chartCache', () => ({
  CACHE_PREFIX: 'unit', OUTLINE_ACROSS: 150, OUTLINE_DETAIL: 420,
  cacheKey: (id: string, world: number, found: string[], step: number, across: number) => JSON.stringify([id, world, id === 'home' ? found : [], step, across]),
  cacheGet: async (key: string) => fixture.cache.get(key) ?? null,
  cachePut: async (key: string, value: unknown) => { fixture.cache.set(key, value); },
  cachePrune: async () => {}, keepCoast: async () => {},
}));
vi.mock('../rules/map', () => ({
  generateMap: (_seed: number, tuning: { map: { island: string } }) => {
    fixture.generated(tuning.map.island);
    return {
      bounds: { land: { box: { minX: -8, maxX: 8, minZ: -8, maxZ: 8 }, loops: [{ sea: true, pts: new Float32Array([-8, -8, 8, -8, 8, 8, -8, 8]) }], distAt: (x: number, z: number) => 8 - Math.max(Math.abs(x), Math.abs(z)) } },
      dancefloor: { x: 0, z: 0 }, treeWeight: () => 0,
    };
  },
}));
vi.mock('../rules/rosters', async importOriginal => {
  const real = await importOriginal<typeof import('../rules/rosters')>();
  const island = () => ({ seed: 1, phase: 1, size: 10, roster: [] });
  return { ...real, homeIsland: island, islandOf: island };
});
vi.mock('../rules/mapShape', () => ({ beachOf: () => null }));
vi.mock('../rules/terrain', () => ({ drawnHills: () => ({}), terrainAt: () => 0, hillsAt: () => 0, lakeLevel: () => null }));
vi.mock('../rules/lakeLooks', async importOriginal => ({
  ...await importOriginal<typeof import('../rules/lakeLooks')>(),
  islandBiome: () => ({ blend: { a: 'temperate', b: 'temperate', w: 1 }, lakeBlend: null, lakeShare: 0 }),
}));
vi.mock('../render/chart/islandMesh', () => ({ buildIslandMesh: () => ({}), meshBuffers: () => [] }));
vi.mock('../render/chart/chartScale', () => ({ K: 1, SIGIL_TIERS: [{ px: 4 }] }));
vi.mock('../../art/sigilDetail.js', () => ({ sigilDetail: () => [1, 0, 1, 0] }));

beforeEach(() => { vi.resetModules(); vi.useFakeTimers(); fixture.cache.clear(); fixture.generated.mockClear(); });
afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); vi.restoreAllMocks(); });

async function worker() {
  const scope = { postMessage: vi.fn(), onmessage: undefined as undefined | ((e: { data: OutlineAsk }) => void) };
  vi.stubGlobal('self', scope);
  await import('./chartOutlines.worker');
  return scope;
}

it('makes every missing unfound island on full-chart demand after only found islands were prepared', async () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {}), scope = await worker();
  scope.onmessage!({ data: { world: 0, found: ['fox'], ids: ['home', 'fox'], step: 32, warm: true } });
  await vi.runAllTimersAsync();
  expect(fixture.generated.mock.calls.map(c => c[0])).toEqual(['home', 'fox']);
  expect(scope.postMessage.mock.calls.at(-1)![0]).toEqual({ warmDone: true, made: 2, kept: 0 });
  scope.postMessage.mockClear(); fixture.generated.mockClear();

  const islands = ['home', ...KIND_NAMES].map((id, i) => ({ id, x: i, y: 0, phase: i % 4, sail: id === 'home' || id === 'fox' }));
  const ids = chartOrder(islands, islands[0]);
  scope.onmessage!({ data: { world: 0, found: ['fox'], ids, step: 32, cacheOnly: false } });
  await vi.runAllTimersAsync();
  const delivered = scope.postMessage.mock.calls.map(c => c[0] as OutlineDone);
  expect(delivered.map(o => o.id).sort()).toEqual([...ids].sort());
  expect(new Set(delivered.map(o => o.id)).size).toBe(ids.length);
  expect(fixture.generated.mock.calls.map(c => c[0]).sort()).toEqual(ids.filter(id => !['home', 'fox'].includes(id)).sort());
  expect(delivered.every(o => o.mesh && o.sigils && o.ground.h.length > 0)).toBe(true);
  expect(warn).not.toHaveBeenCalled();
});

it('keeps the map-table miniature cache-only instead of generating unfound islands', async () => {
  const scope = await worker();
  scope.onmessage!({ data: { world: 0, found: [], ids: ['home', 'fox'], step: 32, cacheOnly: true } });
  await vi.runAllTimersAsync();
  expect(fixture.generated).not.toHaveBeenCalled();
  expect(scope.postMessage).not.toHaveBeenCalled();
});
