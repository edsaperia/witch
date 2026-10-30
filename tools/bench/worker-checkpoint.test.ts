import { afterEach, expect, it, vi } from 'vitest';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { createWorkerCheckpoint, attachWorkerCheckpoint } = require('../view/worker-checkpoint.cjs');
const { collectFailure } = require('../view/travel-failure.cjs');
afterEach(() => vi.useRealTimers());
const meta = { kind: 'worker-job', jobId: 'home', jobKind: 'chart:detail', id: 'home', workerIndex: 2, queueDepth: 3, enqueuedEpochMs: 1000, atEpochMs: 1000 };
it('preserves metadata already delivered to the host when the page later stops responding', async () => {
  vi.useFakeTimers(); const writes: unknown[] = [], checkpoint = createWorkerCheckpoint((p: unknown) => writes.push(p));
  checkpoint.accept({ sequence: 1, atEpochMs: 5000, events: [{ ...meta, phase: 'start', startedEpochMs: 1100 }, { ...meta, phase: 'stage-start', stage: 'cache-read', stageStartEpochMs: 1200, atEpochMs: 1200, payload: new Uint8Array(5000) }] });
  const pending = collectFailure({ evaluate: () => new Promise(() => {}) }, { phase: 'sailing' });
  await vi.advanceTimersByTimeAsync(1500);
  const result = attachWorkerCheckpoint(await pending, checkpoint.snapshot());
  expect(writes).toHaveLength(1); expect(result.diagnosticError).toContain('timed out');
  expect(result.workerJobEvidence).toBe('last-host-checkpoint');
  expect(result.workerJobs[0]).toMatchObject({ id: 'home', complete: false, currentStage: 'cache-read', currentStageElapsedMs: 3800 });
  expect(result.hostCheckpoint.observedThroughEpochMs).toBe(5000);
  expect(result.hostCheckpoint.events[1].payload).toBeUndefined();
});
it('deduplicates batches, declares gaps and bounds retained history', () => {
  const checkpoint = createWorkerCheckpoint(() => {}, 2);
  const packet = { sequence: 1, atEpochMs: 1200, events: [{ ...meta, phase: 'enqueue' }] };
  checkpoint.accept(packet); checkpoint.accept(packet);
  checkpoint.accept({ ...packet, sequence: 3, events: [{ ...meta, phase: 'start' }, { ...meta, phase: 'end' }] });
  const result = checkpoint.snapshot(); expect(result.events).toHaveLength(2); expect(result.dropped).toBe(2);
});
it('does not call missing checkpoints zero jobs and prefers a completed page snapshot', () => {
  expect(attachWorkerCheckpoint({ diagnosticError: 'closed' }, undefined).workerJobEvidence).toBe('no-job-evidence');
  expect(attachWorkerCheckpoint({ probe: { events: [] } }, { events: [meta] }).workerJobEvidence).toBe('page-snapshot');
});
it('does not extend pending-stage elapsed time through a transport backlog', () => {
  const checkpoint = createWorkerCheckpoint(() => {});
  checkpoint.accept({ sequence: 1, atEpochMs: 2000, events: [{ ...meta, phase: 'enqueue' }] });
  checkpoint.accept({ sequence: 2, atEpochMs: 9000, backlog: 3, events: [{ ...meta, phase: 'stage-start', stage: 'compute:outline', stageStartEpochMs: 3000, atEpochMs: 3000 }] });
  const snapshot = checkpoint.snapshot(), result = attachWorkerCheckpoint({ diagnosticError: 'stalled' }, snapshot);
  expect(snapshot).toMatchObject({ observedThroughEpochMs: 2000, capturedEpochMs: null, backlog: 3, coverageIncomplete: true });
  expect(result.workerJobs[0].currentStageElapsedMs).toBeNull();
});
it('never resurrects a cancelled job when a delayed worker stage packet arrives', () => {
  const checkpoint = createWorkerCheckpoint(() => {});
  checkpoint.accept({ sequence: 1, atEpochMs: 2000, events: [{ ...meta, phase: 'cancel', endedEpochMs: 1900 }, { ...meta, phase: 'stage-start', stage: 'compute:art', stageStartEpochMs: 1500 }] });
  const snapshot = checkpoint.snapshot(); expect(snapshot.activeJobs).toHaveLength(0);
  expect(attachWorkerCheckpoint({}, snapshot).workerJobs[0]).toMatchObject({ complete: true, endedEpochMs: 1900 });
});
