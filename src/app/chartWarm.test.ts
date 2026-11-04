import { afterEach, describe, expect, it, vi } from 'vitest';
import { chartIslandIds, foundChartIslandIds, stopWarmChart, warmChart } from './chartWarm';
import { ChartWarmSchedule, type ChartWarmState } from './chartWarmSchedule';
import { KIND_NAMES } from '../rules/rosters';

class FakeWorker {
  static made: FakeWorker[] = [];
  onmessage: ((e: { data: unknown }) => void) | null = null;
  onerror: (() => void) | null = null;
  terminate = vi.fn(); postMessage = vi.fn();
  constructor() { FakeWorker.made.push(this); }
}
afterEach(() => { stopWarmChart(); FakeWorker.made = []; vi.unstubAllGlobals(); });
describe('found-island chart warm worker', () => {
  it('reduces cold speculative jobs while preserving all-island demand enumeration', () => {
    const before = chartIslandIds(0), after = foundChartIslandIds(0, ['fox', 'owl', 'fox', 'unknown']);
    expect(before).toHaveLength(KIND_NAMES.length + 1);
    expect(new Set(after)).toEqual(new Set(['home', 'fox', 'owl']));
    expect(after.length).toBeLessThan(before.length);
    expect(foundChartIslandIds(0, [])).toEqual(['home']);
  });
  it('sends only saved found IDs even if a caller asks for the whole unlocked chart', () => {
    vi.stubGlobal('Worker', FakeWorker);
    warmChart(0, ['fox'], undefined, undefined, chartIslandIds(0));
    expect(new Set(FakeWorker.made[0].postMessage.mock.calls[0][0].ids)).toEqual(new Set(['home', 'fox']));
  });
  it('sends only found IDs, stops its worker, and rejects late replies from it', () => {
    vi.stubGlobal('Worker', FakeWorker);
    const done = vi.fn(), nextDone = vi.fn();
    warmChart(0, ['fox'], done);
    const old = FakeWorker.made[0], job = old.postMessage.mock.calls[0][0];
    expect(new Set(job.ids)).toEqual(new Set(['home', 'fox'])); expect(job.warm).toBe(true);
    stopWarmChart(); expect(old.terminate).toHaveBeenCalledOnce();
    warmChart(7, ['owl'], nextDone);
    old.onmessage?.({ data: { warmDone: true, made: 2, kept: 0 } });
    old.onerror?.(); expect(done).not.toHaveBeenCalled();
    FakeWorker.made[1].onmessage?.({ data: { warmDone: true, made: 0, kept: 2 } });
    expect(nextDone).toHaveBeenCalledWith(0, 2);
  });
  const ready: ChartWarmState = { enabled: true, ready: true, treehouse: true, map: false, sailing: false, sleeping: false, hidden: false, paused: false, manual: false, arriving: false };
  const exits: [string, Partial<ChartWarmState>][] = [
    ['outside the treehouse', { treehouse: false }], ['sailing', { sailing: true }], ['sleeping', { sleeping: true }],
    ['hidden tab', { hidden: true }], ['full chart open', { map: true }], ['paused', { paused: true }],
    ['not ready', { ready: false }], ['manual stepping', { manual: true }], ['arriving', { arriving: true }], ['disabled', { enabled: false }],
  ];
  it.each(exits)('has zero background jobs when %s, cancels immediately and resumes only on re-entry', (_name, exit) => {
    vi.stubGlobal('Worker', FakeWorker);
    const schedule = new ChartWarmSchedule(({ world, found, ids }, done) => warmChart(world, found, done, undefined, ids), stopWarmChart);
    const request = vi.fn(() => ({ world: 0, found: ['fox'], ids: ['home', 'fox'] }));
    const active = () => FakeWorker.made.filter(w => !w.terminate.mock.calls.length);
    const blocked = { ...ready, ...exit };
    schedule.update(blocked, request); expect(active()).toHaveLength(0); expect(request).not.toHaveBeenCalled();
    schedule.update(ready, request); expect(active()).toHaveLength(1);
    const old = active()[0];
    // The next save/cache read is throttled; leaving must still stop work first.
    const throttled = vi.fn(() => null);
    schedule.update(blocked, throttled); expect(active()).toHaveLength(0); expect(throttled).not.toHaveBeenCalled();
    old.onmessage?.({ data: { warmed: 'fox', made: true } }); old.onmessage?.({ data: { warmDone: true, made: 2, kept: 0 } });
    expect(active()).toHaveLength(0);
    schedule.update(ready, request); expect(active()).toHaveLength(1);
    active()[0].onmessage?.({ data: { warmDone: true, made: 0, kept: 2 } });
    expect(active()).toHaveLength(0);
    schedule.update(ready, request); expect(active()).toHaveLength(0); // Completed from cache; no second worker.
  });
  it('never terminates the full chart demand worker when background work pauses', () => {
    vi.stubGlobal('Worker', FakeWorker);
    const demand = new Worker('demand');
    const schedule = new ChartWarmSchedule(({ world, found, ids }, done) => warmChart(world, found, done, undefined, ids), stopWarmChart);
    schedule.update(ready, () => ({ world: 0, found: [], ids: ['home'] }));
    schedule.update({ ...ready, map: true }, () => null);
    expect(demand.terminate).not.toHaveBeenCalled();
    expect(FakeWorker.made[1].terminate).toHaveBeenCalledOnce();
  });
});
