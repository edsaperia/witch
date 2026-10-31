import { expect, it } from 'vitest';
import { createRequire } from 'node:module';
const { percentile, pair, capabilities, MAX_MS, WORK_MS } = createRequire(import.meta.url)('./patterned-light-cost.cjs');
it('reports nearest-rank tails without dropping outliers or inventing missing GPU samples', () => {
  expect(percentile([1, 2, 3, 100], .95)).toBe(100);
  expect(() => percentile([], .5)).toThrow(); expect(() => percentile([NaN], .5)).toThrow();
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
