import { expect, it } from 'vitest';
import { LandingArtFade, lateLandingReady, loadingFloorBounds } from './landingReadiness';
import { HOUSE_ROOMS } from '../rules/houseRooms';

it('only the fully drawable witch can extend an expired grace, not house/props readiness', () => {
  expect(lateLandingReady(false, true, true)).toBe(false);
  expect(lateLandingReady(true, false, true)).toBe(false);
  expect(lateLandingReady(true, true, false)).toBe(false);
  expect(lateLandingReady(true, true, true)).toBe(true);
});

it('keeps warm art unchanged, fades late art after it arrives and resets between islands', () => {
  const f = new LandingArtFade();
  expect(f.share('treehouse', true, 0)).toBe(1);
  f.arm({ treehouse: false, props: true, soundsystems: false });
  expect(f.share('props', true, 10)).toBe(1);
  expect(f.share('treehouse', false, 10000)).toBe(0);
  expect(f.share('treehouse', true, 10000)).toBe(0);
  expect(f.share('treehouse', true, 10400)).toBe(0.5);
  expect(f.share('treehouse', true, 10800)).toBe(1);
  expect(f.share('soundsystems', false, 10800)).toBe(0);
  f.reset(); expect(f.share('treehouse', true, 0)).toBe(1);
});

it('never leaves any configured room, corridor or terrace bound outside the temporary floor', () => {
  const rects = [...HOUSE_ROOMS.rooms, ...HOUSE_ROOMS.corridors], b = loadingFloorBounds(rects, 18);
  for (const r of rects) { expect(b.x0).toBeLessThan(r.x0); expect(b.x1).toBeGreaterThan(r.x1); expect(b.z0).toBeLessThan(r.z0); expect(b.z1).toBeGreaterThan(r.z1); }
  expect(b.x0).toBeLessThanOrEqual(-18); expect(b.x1).toBeGreaterThanOrEqual(18);
  expect(b.z0).toBeLessThanOrEqual(-18); expect(b.z1).toBeGreaterThanOrEqual(18);
});
