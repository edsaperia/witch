import { afterEach, expect, it, vi } from 'vitest';
// @ts-expect-error diagnostic CommonJS tool
import { checkCoastFirstUse } from '../view/coast-first-use.cjs';
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

it('separates the coast transition window from later coast frames and verifies material activation', async () => {
  let now = 1000;
  vi.spyOn(performance, 'now').mockImplementation(() => now);
  vi.spyOn(performance, 'getEntriesByName').mockReturnValue([{ startTime: 100 }] as PerformanceEntry[]);
  vi.stubGlobal('window', { witch: { coastFacing: () => ({ x: 100, z: 50, nx: 1, nz: 0 }), shot: () => ({ ok: true }), view: { ground: { mesh: { material: { defines: { GROUND_BEACH: '' } } } } } },
    __f: [990, 1010, 1020, 1140, 1150, 2200, 2210], __travelProbe: { trace: { events: [{ kind: 'beach-shader', phase: 'coast-use', at: 1020 }], quality: [{ at: 1100, rung: 0 }] } } });
  const page = { evaluate: (fn: (arg?: unknown) => unknown, arg?: unknown) => fn(arg), waitForTimeout: async () => { now = 11000; } };
  const result = await checkCoastFirstUse(page);
  expect(result.afterArrivalMs).toBe(900);
  expect(result.activated).toBe(true); expect(result.actualBeachMaterial).toBe(true);
  expect(result.transitionHasFrameOver100ms).toBe(true);
  expect(result.qualityRungs).toEqual([0]);
});

it('refuses an unverified coast visit later than30s after arrival', async () => {
  vi.spyOn(performance, 'now').mockReturnValue(40000);
  vi.spyOn(performance, 'getEntriesByName').mockReturnValue([{ startTime: 100 }] as PerformanceEntry[]);
  vi.stubGlobal('window', { witch: { coastFacing: () => ({ x: 1, z: 2, nx: 1, nz: 0 }) } });
  await expect(checkCoastFirstUse({ evaluate: async (fn: () => unknown) => fn() })).rejects.toThrow('outside first30s');
});
