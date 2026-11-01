import { afterEach, describe, expect, it, vi } from 'vitest';
import { chartIslandIds, reachableChartIslandIds, stopWarmChart, warmChart } from './chartWarm';
import { KIND_NAMES } from '../rules/rosters';

class FakeWorker {
  static made: FakeWorker[] = [];
  onmessage: ((e: { data: unknown }) => void) | null = null;
  onerror: (() => void) | null = null;
  terminate = vi.fn(); postMessage = vi.fn();
  constructor() { FakeWorker.made.push(this); }
}
afterEach(() => { stopWarmChart(); FakeWorker.made = []; vi.unstubAllGlobals(); });
describe('reachable chart warm worker', () => {
  it('reduces cold speculative jobs while preserving all-island demand enumeration', () => {
    const before = chartIslandIds(0), after = reachableChartIslandIds(0, ['fox', 'owl', 'fox', 'unknown']);
    expect(before).toHaveLength(KIND_NAMES.length + 1);
    expect(new Set(after)).toEqual(new Set(['home', 'fox', 'owl']));
    expect(after.length).toBeLessThan(before.length);
    expect(reachableChartIslandIds(0, [])).toEqual(['home']);
  });
  it('sends only reachable IDs, stops its worker, and rejects late replies from it', () => {
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
});
