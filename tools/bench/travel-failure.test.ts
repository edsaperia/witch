import { afterEach, expect, it, vi } from 'vitest';
import { createRequire } from 'node:module';
const { collectFailure, snapshotFailure } = createRequire(import.meta.url)('../view/travel-failure.cjs');
afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); });
it('retains chart readiness and bounded mark metadata without outline payloads', () => {
  vi.stubGlobal('window', { witch: { ready: true }, chart: { chart: { selected: 'home' }, islands: () => [{ id: 'fox', outline: { pixels: new Uint8Array(100) }, sail: true }] } });
  vi.stubGlobal('performance', { getEntriesByType: () => Array.from({ length: 40 }, (_, i) => ({ name: `mark${i}`, startTime: i })) });
  const snapshot = snapshotFailure();
  expect(snapshot.chart).toEqual({ selected: 'home', islands: [{ id: 'fox', outline: true, sail: true }] });
  expect(snapshot.marks).toHaveLength(32); expect(snapshot.marks[0].name).toBe('mark8');
});
it('preserves original phase context on a closed page', async () => {
  const result = await collectFailure({ evaluate: () => Promise.reject(new Error('closed')) }, { phase: 'chart outlines', island: 'fox' });
  expect(result.phase).toBe('chart outlines'); expect(result.diagnosticError).toContain('closed');
});
it('bounds diagnostics when the failed page no longer responds', async () => {
  vi.useFakeTimers();
  const pending = collectFailure({ evaluate: () => new Promise(() => {}) }, { phase: 'chart outlines' });
  await vi.advanceTimersByTimeAsync(1500);
  expect((await pending).diagnosticError).toContain('timed out'); expect(vi.getTimerCount()).toBe(0);
});
