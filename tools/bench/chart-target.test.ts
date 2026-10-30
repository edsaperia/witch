import { afterEach, expect, it, vi } from 'vitest';
import { createRequire } from 'node:module';
const { prepareChartTarget } = createRequire(import.meta.url)('../view/chart-target.cjs');
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });
it('selects a record with no outline before waiting for its prioritized outline', async () => {
  const island = { id: 'fox', outline: null as object | null }, order: string[] = [], phases: string[] = [];
  vi.stubGlobal('window', { chart: { islands: () => [island] } });
  const page = {
    waitForFunction: async (predicate: (id: string) => unknown, id: string) => { order.push('wait'); expect(predicate(id)).toBeTruthy(); },
    evaluate: async (_fn: unknown, args: unknown[]) => { order.push('choose'); expect(args).toEqual(['fox', '424242']); island.outline = {}; },
  };
  await prepareChartTarget(page, 'fox', '424242', 120000, (phase: string) => phases.push(phase));
  expect(order).toEqual(['wait', 'choose', 'wait']);
  expect(phases).toEqual(['chart target record', 'chart selection', 'chart outlines']);
});
it('shares one wait budget rather than restarting the full timeout after selection', async () => {
  let now = 0; vi.spyOn(Date, 'now').mockImplementation(() => now);
  const waits: number[] = [];
  const page = { waitForFunction: async (_fn: unknown, _id: string, options: { timeout: number }) => waits.push(options.timeout), evaluate: async () => { now = 1600; } };
  await prepareChartTarget(page, 'fox', null, 120000);
  expect(waits).toEqual([120000, 118400]);
});
it('does not choose a target whose record never becomes available', async () => {
  const page = { waitForFunction: async () => { throw new Error('record timeout'); }, evaluate: vi.fn() };
  await expect(prepareChartTarget(page, 'fox', null, 120000)).rejects.toThrow('record timeout');
  expect(page.evaluate).not.toHaveBeenCalled();
});
