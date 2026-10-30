import { expect, it } from 'vitest';
import { createRequire } from 'node:module';
const { summarizeWorkerJobs } = createRequire(import.meta.url)('./worker-job-summary.cjs');
it('keeps queue, compute and cache wall spans separate across different time origins', () => {
  const meta = { kind: 'worker-job', jobId: 'one', jobKind: 'art:type', id: 17, seed: 44, workerIndex: 2, queueDepth: 3, enqueuedEpochMs: 1000 };
  const rows = summarizeWorkerJobs({ events: [
    { ...meta, phase: 'enqueue' },
    { ...meta, phase: 'start', startedEpochMs: 1100 },
    { ...meta, phase: 'stage-start', stage: 'compute:art', stageStartEpochMs: 1120 },
    { ...meta, phase: 'end', startedEpochMs: 1100, endedEpochMs: 1200, stages: { 'compute:art': 50, 'cache-read': 20, 'cache-write': 10, 'queue-wait': 15 } },
  ] });
  expect(rows[0]).toMatchObject({ id: 17, seed: 44, workerIndex: 2, queueDepth: 3, queueBeforeStartMs: 100, queueInsideWorkerMs: 15, computeWallMs: 50, cacheWallMs: 30, computeStartEpochMs: 1120 });
});
it('retains a pending cache operation at failure without pretending it completed', () => {
  const row = summarizeWorkerJobs({ events: [], capturedEpochMs: 5000, activeJobs: [{ kind: 'worker-job', jobId: 'home', jobKind: 'chart:detail', id: 'home', phase: 'stage-start', stage: 'cache-read', enqueuedEpochMs: 1000, startedEpochMs: 1100, stageStartEpochMs: 1200, stages: {} }] })[0];
  expect(row).toMatchObject({ complete: false, currentStage: 'cache-read', currentStageElapsedMs: 3800, currentStageDurationConfirmed: false, cacheWallMs: 0, queueBeforeStartMs: 100 });
});
