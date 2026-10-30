import { afterEach, expect, it, vi } from 'vitest';
import { beginWorkerTrace, enqueueWorkerTrace, postTracedJob, traceAsync, traceSync } from './workerJobTrace';
afterEach(() => vi.unstubAllGlobals());
it('keeps tracing off when worker diagnostic packets cannot be safely intercepted', () => {
  const record = vi.fn(), job = { kind: 'type', id: 3 }, worker = { postMessage: vi.fn() };
  vi.stubGlobal('__travelProbe', { record, trace: { capabilities: { workerMessages: false } } });
  postTracedJob(worker, job, 'art:type', 3);
  expect(worker.postMessage.mock.calls[0][0]).toBe(job); expect(record).not.toHaveBeenCalled();
});
it('measures a deferred queue gap independently of compute and cache operations', () => {
  let now = 10; const events: any[] = [];
  vi.stubGlobal('performance', { timeOrigin: 1000, now: () => now }); vi.stubGlobal('self', { postMessage: (e: any) => events.push(e.__witchJobTraceEvent) });
  const trace = beginWorkerTrace({ __witchJobTrace: { jobId: 'one', jobKind: 'chart:outline', id: 'home', enqueuedEpochMs: 1000, queueDepth: 0 } })!;
  traceSync(trace, 'compute:one', () => { now += 5; }); trace.defer(); now += 20;
  traceSync(trace, 'cache-read', () => { now += 3; }); trace.finish();
  expect(events.at(-1).stages).toEqual({ 'compute:one': 5, 'queue-wait': 20, 'cache-read': 3 });
  expect(trace.active).toBe(false);
});
it('keeps payload identity and original promises/results/errors when tracing is off', async () => {
  const job = { kind: 'type', id: 3 }, worker = { postMessage: vi.fn() };
  postTracedJob(worker, job, 'art:type', 3);
  expect(worker.postMessage.mock.calls[0][0]).toBe(job); expect(beginWorkerTrace(job)).toBeNull();
  const promise = Promise.resolve(7); expect(traceAsync(null, 'cache', () => promise)).toBe(promise);
  expect(traceSync(null, 'compute', () => 8)).toBe(8);
  expect(() => traceSync(null, 'compute', () => { throw new Error('original'); })).toThrow('original');
});
it('records real enqueue depth and worker assignment without mutating the business job', () => {
  const events: Record<string, unknown>[] = [], job = { kind: 'type', id: 17 }, worker = { postMessage: vi.fn() };
  vi.stubGlobal('__travelProbe', { record: (e: Record<string, unknown>) => events.push(e), trace: { capabilities: { workerMessages: true } } });
  vi.stubGlobal('performance', { timeOrigin: 1000, now: () => 20 });
  enqueueWorkerTrace(job, 'art:type', 17, 4); postTracedJob(worker, job, 'art:type', 17);
  const sent = worker.postMessage.mock.calls[0][0];
  expect(sent.__witchJobTrace).toMatchObject({ jobKind: 'art:type', id: 17, queueDepth: 4, enqueuedEpochMs: 1020 });
  expect(sent.__witchJobTrace.workerIndex).toBeGreaterThan(0); expect(job).toEqual({ kind: 'type', id: 17 });
  expect(events.map(e => e.phase)).toEqual(['enqueue', 'dispatch']);
});
it('uses epoch clocks for worker stages and emits completion before a caller can send its reply', async () => {
  let now = 50; const events: any[] = [];
  vi.stubGlobal('performance', { timeOrigin: 1000, now: () => now });
  vi.stubGlobal('self', { postMessage: (e: any) => events.push(e.__witchJobTraceEvent) });
  const trace = beginWorkerTrace({ __witchJobTrace: { jobId: 'one', jobKind: 'map', id: 424242, enqueuedEpochMs: 1020, queueDepth: 0, workerIndex: 2 } })!;
  expect(traceSync(trace, 'compute', () => { now += 5; return 3; })).toBe(3);
  await traceAsync(trace, 'cache-write', async () => { now += 10; }); trace.finish(); trace.finish();
  expect(events[0]).toMatchObject({ phase: 'start', startedEpochMs: 1050 });
  expect(events.at(-1)).toMatchObject({ phase: 'end', endedEpochMs: 1065, stages: { compute: 5, 'cache-write': 10 } });
  expect(events.filter(e => e.phase === 'end')).toHaveLength(1);
});
