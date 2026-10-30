// Epoch times are comparable across page/worker time origins. Wall spans are not CPU self time.
function summarizeWorkerJobs(trace) {
  const byId = new Map();
  for (const e of [...(trace?.events || []), ...(trace?.activeJobs || [])]) {
    if (e.kind !== 'worker-job' || !e.jobId) continue;
    const old = byId.get(e.jobId) || {}, row = { ...old, ...e };
    if (e.phase === 'cancel' && !e.interruptedStage && old.phase === 'stage-start') { row.interruptedStage = old.stage; row.interruptedStageElapsedMs = Math.max(0, (e.endedEpochMs ?? e.atEpochMs) - old.stageStartEpochMs); }
    if (e.phase === 'stage-start' && e.stage?.startsWith('compute:') && old.computeStartEpochMs === undefined) row.computeStartEpochMs = e.stageStartEpochMs;
    byId.set(e.jobId, row);
  }
  const sum = (stages, prefix) => Object.entries(stages || {}).reduce((ms, [name, value]) => ms + (name.startsWith(prefix) && Number.isFinite(value) ? value : 0), 0);
  return [...byId.values()].map(e => {
    const ended = e.phase === 'end' || e.phase === 'cancel', started = Number.isFinite(e.startedEpochMs) ? e.startedEpochMs : null;
    const queueBeforeStartMs = started === null ? null : Math.max(0, started - e.enqueuedEpochMs);
    const currentStage = !ended && e.phase === 'stage-start' ? e.stage : null;
    return {
      jobId: e.jobId, kind: e.jobKind, id: e.id, seed: e.seed, workerIndex: e.workerIndex ?? null, queueDepth: e.queueDepth,
      enqueuedEpochMs: e.enqueuedEpochMs, startedEpochMs: started, computeStartEpochMs: e.computeStartEpochMs ?? null, endedEpochMs: ended ? e.endedEpochMs ?? e.atEpochMs ?? null : null,
      complete: ended, status: e.status ?? e.phase, queueBeforeStartMs, queueInsideWorkerMs: e.stages?.['queue-wait'] ?? 0,
      interruptedStage: e.interruptedStage ?? null, interruptedStageElapsedMs: e.interruptedStageElapsedMs ?? null,
      computeWallMs: sum(e.stages, 'compute:'), cacheWallMs: sum(e.stages, 'cache-'), stages: e.stages || {},
      currentStage, currentStageElapsedMs: currentStage && Number.isFinite(trace?.capturedEpochMs) ? Math.max(0, trace.capturedEpochMs - e.stageStartEpochMs) : null,
      waitingForStartMs: !ended && started === null && Number.isFinite(trace?.capturedEpochMs) ? Math.max(0, trace.capturedEpochMs - e.enqueuedEpochMs) : null,
    };
  }).sort((a, b) => a.enqueuedEpochMs - b.enqueuedEpochMs);
}
module.exports = { summarizeWorkerJobs };
