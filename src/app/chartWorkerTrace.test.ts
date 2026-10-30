import { afterEach, beforeEach, expect, it, vi } from 'vitest';
const cache = vi.hoisted(() => ({ get: vi.fn(), coast: vi.fn() }));
vi.mock('./chartCache', () => ({ CACHE_PREFIX: 'test', cacheGet: cache.get, cacheKey: () => 'key', cachePrune: async () => {}, cachePut: async () => {}, keepCoast: cache.coast, OUTLINE_ACROSS: 150, OUTLINE_DETAIL: 420 }));
vi.mock('../render/chart/islandMesh', () => ({ buildIslandMesh: () => ({}), meshBuffers: () => [] }));
beforeEach(() => { vi.resetModules(); vi.useFakeTimers(); vi.clearAllMocks(); cache.coast.mockResolvedValue(undefined); });
afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); });
function outline() { return { id: 'home', world: 0, loops: [], mesh: {}, sigils: [], ground: { h: new Float32Array(), rgb: new Uint8Array(), water: new Uint8Array(), level: new Float32Array(), looks: new Uint8Array() } }; }
it('keeps the untraced cached outline and transfer buffers unchanged', async () => {
  const value = outline(), scope: any = { postMessage: vi.fn() }; cache.get.mockResolvedValue(value); vi.stubGlobal('self', scope);
  await import('./chartOutlines.worker');
  scope.onmessage({ data: { world: 0, found: [], ids: ['home'], step: 32 } });
  await vi.runAllTimersAsync();
  expect(scope.postMessage).toHaveBeenCalledTimes(1); expect(scope.postMessage.mock.calls[0][0]).toBe(value);
  expect(scope.postMessage.mock.calls[0][1]).toContain(value.ground.h.buffer);
});
it('traces cached scan and background coast write as separate completed jobs', async () => {
  const value = outline(), scope: any = { postMessage: vi.fn() }; cache.get.mockResolvedValue(value); vi.stubGlobal('self', scope);
  await import('./chartOutlines.worker');
  scope.onmessage({ data: { world: 0, found: [], ids: ['home'], step: 32, __witchJobTrace: { jobId: 'request', jobKind: 'chart:request', id: 'outlines', enqueuedEpochMs: performance.timeOrigin, queueDepth: 1, workerIndex: 3 } } });
  await vi.runAllTimersAsync();
  const events = scope.postMessage.mock.calls.map((c: any[]) => c[0].__witchJobTraceEvent).filter(Boolean);
  expect(events.find((e: any) => e.phase === 'end' && e.jobKind === 'chart:outline')).toMatchObject({ id: 'home', workerIndex: 3, status: 'cached' });
  expect(events.find((e: any) => e.phase === 'end' && e.jobKind === 'chart:coast-cache')).toMatchObject({ id: 'home', status: 'done' });
  expect(scope.postMessage.mock.calls.some((c: any[]) => c[0] === value)).toBe(true);
});
