// A4 boundary regressions: night replacement and renderer exceptions must keep their original page semantics.
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { PageHost } from '../main';
import { drawFrame, frameBody } from './pageFrame';
import { queueCast } from './pageNight';
import { buildHome } from '../render/view/houseFrame';
import type { View, ViewInternals, ViewShared } from '../render/view';

afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('extracted page composition boundaries', () => {
  it('looks up the replacement night when a retained cast callback runs', () => {
    const makeNight = () => ({ game: { party: { spellAt: null as number | null }, wake: null as object | null }, flags: { castWanted: false } });
    const first = makeNight(), replacement = makeNight();
    let current = first;
    const host = { N: () => current } as unknown as PageHost;
    const retained = () => queueCast(host);
    current = replacement;
    retained();
    expect(first.flags.castWanted).toBe(false);
    expect(replacement.flags.castWanted).toBe(true);
    replacement.flags.castWanted = false;
    replacement.game.wake = {};
    retained();
    expect(replacement.flags.castWanted).toBe(false);
    replacement.game.wake = null;
    replacement.game.party.spellAt = 10;
    retained();
    expect(replacement.flags.castWanted).toBe(false);
  });

  it('keeps scheduling manual frames without stepping or drawing', () => {
    const raf = vi.fn(); vi.stubGlobal('requestAnimationFrame', raf);
    const frame = vi.fn();
    const host = { loop: { manual: true }, frame } as unknown as PageHost;
    frameBody(host, 10);
    expect(raf).toHaveBeenCalledExactlyOnceWith(frame);
    expect(frame).not.toHaveBeenCalled();
  });

  it('preserves a draw error while accounting its completed render parts', () => {
    const error = new Error('draw failed');
    const view = { ms: {} as Record<string, number>, render: (_time: number) => { view.ms = { witch: 3 }; throw error; } };
    const data = { view, measuredDraw: 2, measuredParts: { 'draw.witch': 4 } };
    vi.spyOn(performance, 'now').mockReturnValueOnce(10).mockReturnValueOnce(15);
    expect(() => drawFrame(data as unknown as PageHost, 12)).toThrow(error);
    expect(data.measuredDraw).toBe(7);
    expect(data.measuredParts['draw.witch']).toBe(7);
  });

  it('abandons an old home build when its shader epoch changes during a slice', async () => {
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => { queueMicrotask(() => callback(0)); return 1; });
    let warmed = false;
    const internals = {
      shaderEpoch: 1,
      *warmSteps() { warmed = true; internals.shaderEpoch = 2; },
    };
    const view = { get assets() { throw new Error('old home must not resume'); } };
    await expect(buildHome(view as unknown as View, internals as unknown as ViewInternals, {} as ViewShared, 1)).resolves.toBeUndefined();
    expect(warmed).toBe(true);
  });
});
