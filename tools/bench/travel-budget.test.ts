import { expect, it } from 'vitest';
import { createRequire } from 'node:module';
const { checkTravel, checkTrace, summarizeTravel } = createRequire(import.meta.url)('./travel-budget.cjs');
const good = () => ({ marks: { 'chart:ready': 900, 'chart:flown': 1000, 'game:arrived': 2000 }, qualityBefore: { mode: 'auto', rung: 0 }, quality: [{ at: 0, mode: 'auto', rung: 0 }, { at: 4000, mode: 'auto', rung: 0 }], longTasks: [{ at: 10, ms: 80 }], slices: [{ what: 'handoff-heights', ms: 50, slices: 3, longest: 18 }], chartFrames: { frames: 30, longest: 50 }, toDive: { frames: 60, longest: 90 }, diveToEnd: { frames: 60, longest: 30 }, settle: { frames: 120, longest: 16 } });
it('passes a complete, smooth trip without a quality downgrade', () => expect(checkTravel(good()).ok).toBe(true));
it('rejects an unmeasured API trip instead of counting missing telemetry as zero', () => {
  expect(checkTravel({ route: 'api', marks: { 'game:arrived': 2000 }, qualityBefore: good().qualityBefore, quality: good().quality }).ok).toBe(false);
});
it('accepts observed zero long tasks but not unsupported empty telemetry', () => {
  expect(checkTravel({ ...good(), longTasks: [], coverage: { longTasks: true } }).ok).toBe(true);
  expect(checkTravel({ ...good(), longTasks: [] }).ok).toBe(false);
});
it('rejects non-finite durations and frame counts', () => {
  expect(checkTravel({ ...good(), longTasks: [{ at: 0, ms: NaN }] }).ok).toBe(false);
  expect(checkTravel({ ...good(), toDive: { frames: NaN, longest: 0 } }).ok).toBe(false);
  expect(checkTravel({ ...good(), slices: [{ ...good().slices[0], longest: Infinity }] }).ok).toBe(false);
});
it('does not pass a partial trace whose later trip timed out', () => {
  expect(checkTrace({ runs: [good()], error: 'arrival timed out on home' }).ok).toBe(false);
  expect(checkTrace({ runs: [] }).ok).toBe(false);
});
it('does not silently pass with a misspelled numeric budget', () => expect(checkTravel(good(),{ task: NaN }).ok).toBe(false));
it('catches removal of sliced terrain preparation even under the broad software-renderer frame limit', () => expect(checkTravel({ ...good(), slices: [] }).ok).toBe(false));
it('rejects the measured premature handoff even when no frame was blocked', () => {
  const run = good(); run.marks['chart:ready'] = 38161; run.marks['chart:flown'] = 83;
  expect(checkTravel(run).failures).toContain('chart handed over 38078 ms before readiness');
});
it('rejects an unrecorded arrival or incomplete observation rather than treating null as zero', () => {
  const run = good(); delete (run.marks as Partial<typeof run.marks>)['game:arrived'];
  expect(checkTravel(run).ok).toBe(false);
  expect(checkTravel({ ...good(), quality: [{ at: 100, mode: 'auto', rung: 0 }] }).ok).toBe(false);
});
it('rejects long tasks, slices and frame gaps independently', () => {
  const run = { ...good(), longTasks: [{ at: 30, ms: 3713 }], slices: [{ ...good().slices[0], longest: 721 }], toDive: { ...good().toDive, longest: 2000 } };
  expect(checkTravel(run).failures).toHaveLength(3);
});
it('requires active quality and catches a drop during travel or the arrival grace period', () => {
  expect(checkTravel({ ...good(), qualityBefore: { mode: 'off', rung: 0 } }).ok).toBe(false);
  expect(checkTravel({ ...good(), quality: [{ at: 2500, mode: 'auto', rung: 1 }, { at: 4000, mode: 'auto', rung: 1 }] }).ok).toBe(false);
  expect(checkTravel({ ...good(), quality: [{ at: 0, mode: 'auto', rung: 0 }, { at: 4001, mode: 'auto', rung: 1 }] }).ok).toBe(true); // normal play after the grace is outside this travel check
});
it('does not require chart markers for an explicitly identified API trip', () => {
  const { chartFrames: _chartFrames, ...rest } = good();
  const run = { ...rest, route: 'api', marks: { 'game:arrived': 2000 }, slices: [{ what: 'setGame', ms: 50, slices: 3, longest: 18 }] };
  expect(checkTravel(run).ok).toBe(true);
});
it('summarizes elapsed shader waits separately from callbacks and parallel worker reports', () => {
  const summary = summarizeTravel({ marks: { 'witch:prep-compile0': 100, 'witch:prep-compiled': 3100 }, trace: { events: [{ kind: 'worker-callback', worker: 'art', ms: 3, workerMs: 500, cached: false }, { kind: 'worker-callback', worker: 'art', ms: 2, workerMs: 0, cached: true }] } });
  expect(summary.shaderReadinessWait).toBe(3000);
  expect(summary.events['worker-callback:art']).toEqual({ count: 2, wallMs: 5, longestMs: 3, workerReportedMs: 500, workerReports: 2, receivedBytesEstimate: 0, cached: 1 });
});
