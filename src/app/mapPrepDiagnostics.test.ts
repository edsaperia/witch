import { afterEach, expect, it, vi } from 'vitest';
import { generateMap, prepOf } from '../rules/map';
import { routeOf } from '../rules/party';
import { worldOf } from '../rules/rosters';
import { TUNING as gameTuning } from '../rules/tuning';
import { smallWorldTuning } from '../test/worlds';
const TUNING = smallWorldTuning(gameTuning, 'Worker prep diagnostics test keys, corruption and timing marks, independent of area count.');
import type { PrepRecord } from './mapPrepStore';
import * as diagnostics from './mapPrep';

const seed = 123, map = generateMap(seed,TUNING); routeOf(map);
const rec: PrepRecord = { key: diagnostics.prepKey(seed,TUNING), prep: prepOf(map), arch: worldOf(0), ms: 42, tuning: TUNING };
const lastSource = () => performance.getEntriesByName('witch:map-prep-source').at(-1) as PerformanceMark;
afterEach(() => { performance.clearMarks('witch:map-prep-source'); performance.clearMarks('witch:map-hydrated'); vi.restoreAllMocks(); });

it('records a valid worker prep, then resets its diagnostics when the next night has none', () => {
  expect(diagnostics.useReadyMap(rec,seed,TUNING)).toBe(rec.prep);
  expect(lastSource().detail.status).toBe('worker');
  expect(lastSource().detail.workerMs).toBe(42);
  expect(diagnostics.useReadyMap(null,seed,TUNING)).toBeNull();
  expect(diagnostics.prepUsed).toBe('none');
  expect(lastSource().detail).toMatchObject({ status: 'none', workerMs: 0, hydrateMs: 0 });
});
it('distinguishes another seed from an invalid prep without using either', () => {
  vi.spyOn(console,'warn').mockImplementation(() => {});
  expect(diagnostics.useReadyMap(rec,seed+1,TUNING)).toBeNull();
  expect(lastSource().detail.status).toBe('stale');
  const unsound = { ...rec, prep: { ...rec.prep, neighbours: {} } } as unknown as PrepRecord; // corrupted IndexedDB data need not satisfy its declared interface
  expect(diagnostics.useReadyMap(unsound,seed,TUNING)).toBeNull();
  expect(lastSource().detail.status).toBe('unsound');
});
it('records hydration time separately from the worker time', () => {
  diagnostics.useReadyMap(rec,seed,TUNING);
  expect(diagnostics.readyMap(seed,TUNING,rec.prep).seed).toBe(seed);
  const mark = performance.getEntriesByName('witch:map-hydrated').at(-1) as PerformanceMark;
  expect(mark.detail.workerMs).toBe(42);
  expect(mark.detail.ms).toBeGreaterThanOrEqual(0);
});
