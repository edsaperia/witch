import { expect, it, vi } from 'vitest';
import { ArrivalFlight } from './arrive';
import { TUNING } from '../rules/tuning';
import type { Arrival } from './arrival';
import type { View } from '../render/view';
import type { Game } from '../rules/game';

it('lands a limited arrival with full witch/floor available even while homeDone remains false', () => {
  vi.stubGlobal('document', { getElementById: () => null });
  try {
    const f = new ArrivalFlight({} as Arrival, TUNING.arrive!, null);
    (f as unknown as { plan: object }).plan = {};
    const v = { homeDone: false, fly: {}, limitedLandingReady: () => true } as unknown as View;
    let revealed = 0; f.onReveal = () => revealed++;
    expect(f.frame(v, {} as Game, 15000)).toBe(true);
    expect(f.done).toBe(true); expect(v.homeDone).toBe(false); expect(v.fly).toBeNull(); expect(revealed).toBe(1);
  } finally { vi.unstubAllGlobals(); }
});
