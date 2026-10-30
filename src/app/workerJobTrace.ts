// Default-off diagnostic metadata. Only the opt-in travel probe installs `record`.
export interface WorkerTraceMeta {
  jobId: string; jobKind: string; id: string | number; enqueuedEpochMs: number; queueDepth: number; workerIndex?: number; seed?: number;
}
type Probe = { record(event: Record<string, unknown>): void; trace: { capabilities: { workerMessages: boolean } } };
const probe = () => { const p = (globalThis as unknown as { __travelProbe?: Probe }).__travelProbe; return p?.trace?.capabilities?.workerMessages ? p : undefined; };
const queued = new WeakMap<object, WorkerTraceMeta>(), indices = new WeakMap<object, number>();
let sequence = 0, workerSequence = 0;
export const workerEpoch = () => performance.timeOrigin + performance.now();
export function enqueueWorkerTrace(job: object, kind: string, id: string | number, queueDepth: number): void {
  const p = probe(); if (!p?.record) return;
  const seed = (job as { seed?: number }).seed;
  const meta: WorkerTraceMeta = { jobId: `job-${++sequence}`, jobKind: kind, id, enqueuedEpochMs: workerEpoch(), queueDepth, ...(typeof seed === 'number' ? { seed } : {}) };
  queued.set(job, meta);
  p.record({ kind: 'worker-job', phase: 'enqueue', ...meta, at: performance.now() });
}
export function cancelWorkerTrace(job: object, reason: string): void {
  const meta = queued.get(job); if (!meta) return;
  probe()?.record?.({ kind: 'worker-job', phase: 'cancel', ...meta, reason, endedEpochMs: workerEpoch(), at: performance.now() });
  queued.delete(job);
}
export function postTracedJob(worker: Pick<Worker, 'postMessage'>, job: object, kind: string, id: string | number, queueDepth = 0): void {
  const p = probe();
  if (!p?.record) { worker.postMessage(job); return; } // exact original payload when off
  if (!queued.has(job)) enqueueWorkerTrace(job, kind, id, queueDepth);
  let index = indices.get(worker); if (index === undefined) { index = (worker as unknown as { _travelWorkerIndex?: number })._travelWorkerIndex ?? ++workerSequence; indices.set(worker, index); }
  const meta = { ...queued.get(job)!, workerIndex: index };
  queued.set(job, meta);
  p.record({ kind: 'worker-job', phase: 'dispatch', ...meta, at: performance.now(), dispatchEpochMs: workerEpoch() });
  worker.postMessage({ ...job, __witchJobTrace: meta });
}
export function readWorkerTrace(data: unknown): WorkerTraceMeta | null {
  const meta = (data as { __witchJobTrace?: WorkerTraceMeta } | null)?.__witchJobTrace;
  return meta && typeof meta.jobId === 'string' && typeof meta.jobKind === 'string' && (typeof meta.id === 'string' || typeof meta.id === 'number') && Number.isFinite(meta.enqueuedEpochMs) ? meta : null;
}
export class WorkerJobTrace {
  private startedEpochMs: number | null = null;
  private ended = false;
  private deferredEpochMs: number | null = null;
  private activeStages = 0;
  get active(): boolean { return this.activeStages > 0; }
  readonly stages: Record<string, number> = {};
  constructor(readonly meta: WorkerTraceMeta) {}
  private emit(phase: string, extra: Record<string, unknown> = {}, atEpochMs = workerEpoch()): void {
    self.postMessage({ __witchJobTraceEvent: { ...this.meta, phase, atEpochMs, stages: { ...this.stages }, ...extra } });
  }
  enqueue(): void { this.emit('enqueue', {}, this.meta.enqueuedEpochMs); }
  start(): void {
    if (this.startedEpochMs !== null) return;
    this.startedEpochMs = workerEpoch(); this.emit('start', { startedEpochMs: this.startedEpochMs });
  }
  defer(): void {
    if (this.deferredEpochMs !== null) return;
    this.deferredEpochMs = workerEpoch(); this.emit('stage-start', { stage: 'queue-wait', stageStartEpochMs: this.deferredEpochMs });
  }
  private resume(): void { if (this.deferredEpochMs !== null) { this.after('queue-wait', this.deferredEpochMs); this.deferredEpochMs = null; } }
  private before(stage: string): number { this.resume(); this.start(); this.activeStages++; const at = workerEpoch(); this.emit('stage-start', { stage, stageStartEpochMs: at }); return at; }
  private after(stage: string, at: number): void {
    const end = workerEpoch(), ms = Math.max(0, end - at);
    if (stage !== 'queue-wait') this.activeStages--;
    this.stages[stage] = (this.stages[stage] ?? 0) + ms;
    this.emit('stage-end', { stage, ms, stageStartEpochMs: at, stageEndEpochMs: end });
  }
  sync<T>(stage: string, fn: () => T): T { const at = this.before(stage); try { return fn(); } finally { this.after(stage, at); } }
  async async<T>(stage: string, fn: () => Promise<T>): Promise<T> { const at = this.before(stage); try { return await fn(); } finally { this.after(stage, at); } }
  finish(status = 'done'): void {
    if (this.ended) return; this.resume(); this.ended = true;
    this.emit('end', { status, startedEpochMs: this.startedEpochMs, endedEpochMs: workerEpoch(), stages: { ...this.stages } });
  }
}
export function beginWorkerTrace(data: unknown): WorkerJobTrace | null {
  const meta = readWorkerTrace(data); if (!meta) return null;
  const trace = new WorkerJobTrace(meta); trace.start(); return trace;
}
export const traceSync = <T>(trace: WorkerJobTrace | null | undefined, stage: string, fn: () => T): T => trace ? trace.sync(stage, fn) : fn();
export const traceAsync = <T>(trace: WorkerJobTrace | null | undefined, stage: string, fn: () => Promise<T>): Promise<T> => trace ? trace.async(stage, fn) : fn();
