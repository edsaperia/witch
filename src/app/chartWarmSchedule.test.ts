import { describe, expect, it, vi } from 'vitest';
import { chartWarmEligible, ChartWarmSchedule, type ChartWarmRequest } from './chartWarmSchedule';
const request = (world = 0, found = ['fox']): ChartWarmRequest => ({ world, found, ids: ['home', ...found] });

describe('speculative chart scheduling', () => {
  it('allows only ready treehouse work; MAP is handed to its existing demand worker', () => {
    const ready = { enabled: true, ready: true, treehouse: true, map: false, blocked: false };
    expect(chartWarmEligible(ready)).toBe(true);
    for (const changed of [{ enabled: false }, { ready: false }, { treehouse: false }, { map: true }, { blocked: true }])
      expect(chartWarmEligible({ ...ready, ...changed })).toBe(false);
  });
  it('stops immediately on leaving, resumes the same cached request, ignores the old reply', () => {
    const replies: (() => void)[] = [], start = vi.fn((_r: ChartWarmRequest, done: () => void) => replies.push(done)), stop = vi.fn();
    const schedule = new ChartWarmSchedule(start, stop);
    schedule.tick(request()); schedule.tick(request()); expect(start).toHaveBeenCalledTimes(1);
    schedule.pause(); expect(stop).toHaveBeenCalledTimes(1);
    schedule.tick(request()); replies[0](); schedule.tick(request()); expect(start).toHaveBeenCalledTimes(2);
    replies[1](); schedule.pause(); schedule.tick(request()); expect(start).toHaveBeenCalledTimes(2);
  });
  it('replaces world/finds requests and does not let their late completion settle the replacement', () => {
    const replies: (() => void)[] = [], start = vi.fn((_r: ChartWarmRequest, done: () => void) => replies.push(done)), stop = vi.fn();
    const schedule = new ChartWarmSchedule(start, stop);
    schedule.tick(request()); schedule.tick(request(7)); replies[0](); schedule.tick(request(7));
    expect(stop).toHaveBeenCalledTimes(1); expect(start).toHaveBeenCalledTimes(2);
    replies[1](); schedule.tick(request(7, ['fox', 'owl'])); expect(start).toHaveBeenCalledTimes(3);
  });
  it('stops an active different context even when returning to an already-completed one', () => {
    const replies: (() => void)[] = [], stop = vi.fn();
    const schedule = new ChartWarmSchedule((_r, done) => replies.push(done), stop);
    schedule.tick(request()); replies[0](); schedule.tick(request(7)); schedule.tick(request());
    expect(stop).toHaveBeenCalledOnce();
  });
});
