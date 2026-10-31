// Durable host-side metadata checkpoints survive a later renderer/evaluation stall.
const { summarizeWorkerJobs } = require('../bench/worker-job-summary.cjs');
function createWorkerCheckpoint(append, limit = 6000) {
  const events = [], active = new Map(), closed = new Set();
  let dropped = 0, sequence = 0, capturedEpochMs = null, transportDropped = 0, backlog = 0, observedThroughEpochMs = null;
  const fields = ['jobId','jobKind','id','seed','workerIndex','queueDepth','phase','stage','status','reason','atEpochMs','enqueuedEpochMs','dispatchEpochMs','startedEpochMs','endedEpochMs','stageStartEpochMs','stageEndEpochMs','ms','interruptedStage','interruptedStageElapsedMs'];
  function accept(packet) {
    if (!packet || !Array.isArray(packet.events) || !Number.isInteger(packet.sequence) || !Number.isFinite(packet.atEpochMs)) throw new Error('invalid worker checkpoint');
    if (packet.sequence <= sequence) return; // duplicate delivery never double-counts
    if (packet.sequence !== sequence + 1) dropped++;
    sequence = packet.sequence; capturedEpochMs = packet.atEpochMs;
    backlog = packet.backlog || 0;
    if (!backlog) observedThroughEpochMs = capturedEpochMs;
    transportDropped = Math.max(transportDropped, packet.transportDropped || 0);
    const accepted = [];
    if (packet.events.length > 256) dropped += packet.events.length - 256;
    for (const input of packet.events.slice(0, 256)) {
      if (events.length >= limit) { dropped++; continue; }
      if (!input || input.kind !== 'worker-job' || typeof input.jobId !== 'string' || typeof input.jobKind !== 'string' || !['enqueue','dispatch','start','stage-start','stage-end','end','cancel'].includes(input.phase) || !Number.isFinite(input.atEpochMs)) { dropped++; continue; }
      const event = { kind: 'worker-job' };
      for (const field of fields) {
        const value = input[field];
        if (typeof value === 'string') event[field] = value.slice(0, 200);
        else if (typeof value === 'number' && Number.isFinite(value)) event[field] = value;
        else if (value === null) event[field] = null;
      }
      event.stages = Object.fromEntries(Object.entries(input.stages || {}).slice(0, 32).filter(([, value]) => typeof value === 'number' && Number.isFinite(value)));
      events.push(event); accepted.push(event);
      if (event.phase === 'end' || event.phase === 'cancel') { closed.add(event.jobId); active.delete(event.jobId); }
      else if (!closed.has(event.jobId)) active.set(event.jobId, { ...active.get(event.jobId), ...event });
    }
    append({ sequence, capturedEpochMs, observedThroughEpochMs, backlog, dropped: dropped + transportDropped, events: accepted });
  }
  function snapshot() {
    return { hostCheckpoint: true, jobOnly: true, scope: 'delivered-job-events-only', completeThroughFailure: false, observedThroughEpochMs, lastBatchEpochMs: capturedEpochMs, capturedEpochMs: backlog ? null : capturedEpochMs, backlog, coverageIncomplete: !!backlog || dropped + transportDropped > 0, dropped: dropped + transportDropped, capabilities: { workerJobs: events.length ? 1 : 0 }, events: events.slice(), activeJobs: [...active.values()] };
  }
  return { accept, snapshot };
}
function attachWorkerCheckpoint(failure, checkpoint) {
  const source = failure.probe || checkpoint;
  return { ...failure, hostCheckpoint: checkpoint, workerJobEvidence: failure.probe ? 'page-snapshot' : checkpoint?.events.length ? 'last-host-checkpoint' : 'no-job-evidence', workerJobs: summarizeWorkerJobs(source) };
}
module.exports = { createWorkerCheckpoint, attachWorkerCheckpoint };
