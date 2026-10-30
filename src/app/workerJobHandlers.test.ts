import { afterEach, beforeEach, expect, it, vi } from 'vitest';
const mocks = vi.hoisted(() => ({ cacheGet: vi.fn(), cachePut: vi.fn(), runJob: vi.fn(), putPrep: vi.fn() }));
beforeEach(() => {
  vi.resetModules(); vi.clearAllMocks();
  // Mock the worker's actual dependencies after the lazy storage/transfer split.
  vi.doMock('../render/artCacheStorage', () => ({ cacheGet: mocks.cacheGet, cachePut: mocks.cachePut }));
  vi.doMock('../render/artTransfer', () => ({ transferables: () => [] }));
  vi.doMock('../render/artBuild', () => ({ runJob: mocks.runJob }));
  vi.doMock('../rules/map', () => ({ generateMap: () => ({}), prepOf: () => ({ prep: true }) }));
  vi.doMock('../rules/rosters', () => ({ worldOf: () => ({ world: true }) }));
  vi.doMock('../rules/party', () => ({ routeOf: () => ({ route: true }) }));
  vi.doMock('./mapPrepStore', () => ({ putPrep: mocks.putPrep }));
  mocks.cacheGet.mockResolvedValue(null); mocks.cachePut.mockResolvedValue(undefined);
  mocks.runJob.mockReturnValue({ px: { output: true } }); mocks.putPrep.mockResolvedValue(true);
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.doUnmock('../render/artCacheStorage'); vi.doUnmock('../render/artTransfer'); vi.doUnmock('../render/artBuild');
  vi.doUnmock('../rules/map'); vi.doUnmock('../rules/rosters'); vi.doUnmock('../rules/party'); vi.doUnmock('./mapPrepStore');
  vi.resetModules();
});
const meta = { jobId: 'one', jobKind: 'art:type', id: 17, workerIndex: 2, queueDepth: 3, enqueuedEpochMs: performance.timeOrigin + performance.now() };
it('sends only the original art result when diagnostics are off', async () => {
  const scope: any = { postMessage: vi.fn() }; vi.stubGlobal('self', scope);
  await import('../render/artWorker');
  const job = { kind: 'type', id: 17, seed: 44, cacheKey: 'key' };
  await scope.onmessage({ data: job });
  expect(scope.postMessage).toHaveBeenCalledTimes(1);
  expect(scope.postMessage.mock.calls[0][0]).toMatchObject({ job, result: { px: { output: true } } });
  expect(mocks.runJob).toHaveBeenCalledTimes(1); expect(mocks.cachePut).toHaveBeenCalledTimes(1);
});
it('records a cached art job end before its business reply without running the bake', async () => {
  mocks.cacheGet.mockResolvedValue({ px: { cached: true } });
  const scope: any = { postMessage: vi.fn() }; vi.stubGlobal('self', scope);
  await import('../render/artWorker');
  await scope.onmessage({ data: { kind: 'type', id: 17, cacheKey: 'key', __witchJobTrace: meta } });
  const messages = scope.postMessage.mock.calls.map((c: any[]) => c[0]), replyAt = messages.findIndex((m: any) => m.cached === true);
  expect(messages[replyAt - 1].__witchJobTraceEvent).toMatchObject({ phase: 'end', status: 'cached', id: 17, workerIndex: 2 });
  expect(messages.some((m: any) => m.__witchJobTraceEvent?.stage === 'cache-read')).toBe(true);
  expect(mocks.runJob).not.toHaveBeenCalled(); expect(mocks.cachePut).not.toHaveBeenCalled();
});
it('separates map compute and store stages and completes diagnostics before the terminating reply', async () => {
  const scope: any = { postMessage: vi.fn() }; vi.stubGlobal('self', scope);
  await import('./mapPrep.worker');
  await scope.onmessage({ data: { key: 'key', seed: 424242, tuning: { map: { world: 0 } }, __witchJobTrace: { ...meta, jobKind: 'map-prep', id: 424242 } } });
  const messages = scope.postMessage.mock.calls.map((c: any[]) => c[0]);
  expect(messages.at(-1)).toEqual({ ok: true });
  expect(messages.at(-2).__witchJobTraceEvent).toMatchObject({ phase: 'end', status: 'done' });
  expect(messages.filter((m: any) => m.__witchJobTraceEvent?.phase === 'stage-start').map((m: any) => m.__witchJobTraceEvent.stage)).toEqual(['compute:archipelago', 'compute:map', 'compute:route', 'compute:prep-record', 'cache-write']);
});
