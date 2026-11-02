import { expect, it } from 'vitest';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
const { percentile, pair, capabilities, quietPolicy, MAX_MS, WORK_MS } = createRequire(import.meta.url)('./patterned-light-cost.cjs');
it('reports nearest-rank tails without dropping outliers or inventing missing GPU samples', () => {
  expect(percentile([1, 2, 3, 100], .95)).toBe(100);
  expect(() => percentile([], .5)).toThrow(); expect(() => percentile([NaN], .5)).toThrow();
});
it('rejects missing or invalid input telemetry and records valid input without inventory', () => {
  for (const state of [undefined, null, {}, { idleMs: NaN }, { idleMs: Infinity }, { idleMs: -1 }]) {
    expect(() => quietPolicy(state)).toThrow('Input telemetry unavailable');
  }
  expect(quietPolicy({ at: 'now', idleMs: 0, lastInputTick: 1 })).toEqual({
    at: 'now', idleMs: 0, method: 'input-only-record', inputChanged: false,
  });
});
it('marks input changes on idle drop or input tick change without rejecting the reading', () => {
  const previous = { idleMs: 120000, lastInputTick: 1 };
  expect(quietPolicy({ idleMs: 120001, lastInputTick: 1 }, undefined, previous).inputChanged).toBe(false);
  expect(quietPolicy({ idleMs: 119999, lastInputTick: 1 }, undefined, previous).inputChanged).toBe(true);
  expect(quietPolicy({ idleMs: 120001, lastInputTick: 2 }, undefined, previous).inputChanged).toBe(true);
});
it('enforces two-minute initial idle in the actual runner checkpoint, then records runtime input', () => {
  const source = readFileSync(new URL('./patterned-light-cost.cjs', import.meta.url), 'utf8');
  const start = source.indexOf('const quietCheckpoint=()=>{'), end = source.indexOf('\n  try{', start);
  expect(start).toBeGreaterThan(0); expect(end).toBeGreaterThan(start);
  let state = { at: 'now', idleMs: 119999, lastInputTick: 1 };
  const context = { safetyError: null, launched: false, lastQuiet: undefined,
    laptopState: () => state, quietPolicy, process: { pid: 1 }, report: {} as { measuredUnderLoad?: boolean; activityFlags?: unknown[] } };
  const checkpoint = runInNewContext(source.slice(start, end) + '\nquietCheckpoint', context);
  expect(() => checkpoint()).toThrow('Initial input idle below two minutes');
  state = { ...state, idleMs: 120000 }; expect(checkpoint().inputChanged).toBe(false);
  context.launched = true; state = { ...state, idleMs: 0, lastInputTick: 2 };
  expect(checkpoint().inputChanged).toBe(true); expect(context.report.measuredUnderLoad).toBe(true);
  expect(context.report.activityFlags).toEqual([{ category: 'input', at: 'now' }]);
});
it('refuses mismatches and enforces both canonical thresholds without dropping tail frames', () => {
  const off = { fingerprint: 'same', gpu: Array(48).fill(2) }, on = { fingerprint: 'same', gpu: Array(48).fill(3) };
  expect(pair(on, off).withinCeiling).toBe(false);
  const boundary={...on,gpu:[...Array(45).fill(2.5),3,3,3]};
  expect(pair(boundary,off).withinCeiling).toBe(true);
  expect(pair(boundary,off).delta).toEqual({ median: .5, p95: 1 });
  expect(pair({...on,gpu:[...Array(45).fill(2.4),3.01,3.01,3.01]},off).withinCeiling).toBe(false);
  expect(() => pair({ ...on, fingerprint: 'different' }, off)).toThrow();
  expect(() => pair({ ...on, gpu: [1] }, off)).toThrow();
});
it('requires the allocated Intel hardware and both real GPU extensions within a cleanup-reserved cap', () => {
  const info = { gpu: 'ANGLE Intel UHD D3D11', khr: true, timer: true };
  expect(capabilities(info)).toBe(info);
  expect(() => capabilities({ ...info, gpu: 'SwiftShader' })).toThrow();
  expect(() => capabilities({ ...info, khr: false })).toThrow();
  expect(() => capabilities({ ...info, timer: false })).toThrow();
  expect(MAX_MS).toBeLessThanOrEqual(270000); expect(WORK_MS + 5000).toBeLessThan(MAX_MS);
});
