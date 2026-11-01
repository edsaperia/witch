import { expect, it } from 'vitest';
import { createRequire } from 'node:module';
const { settleBlinkFixture } = createRequire(import.meta.url)('./patterned-blink-fixture.cjs');
it('waits for newly requested blink art and records the settled geometry with held clocks', async () => {
  const order: string[] = [], clocks = { world: 20.133, her: 20.133 };
  let calls = 172;
  const result = await settleBlinkFixture(async () => { order.push('blink'); return { at: 20 }; },
    async () => { order.push('settle'); await Promise.resolve(); calls = 182; return { urgent: 0, ground: 0, missing: 0 }; },
    async () => ({ clocks: { ...clocks }, blinkAt: 20, geometry: { calls, ringPhases: [14.093] } }));
  expect(order).toEqual(['blink', 'settle']); expect(result.blinkState).toEqual({ at: 20 });
  expect(result.postBlink.geometry).toEqual({ calls: 182, ringPhases: [14.093] });
  expect(result.postBlink.readiness.urgent).toBe(0); expect(result.postBlink.clocks).toEqual(clocks);
});
it('rejects a settle that changes either clock or the spell timestamp', async () => {
  for (const change of ['world', 'her', 'blinkAt', 'ringPhase'] as const) {
    let changed = false;
    await expect(settleBlinkFixture(async () => ({}), async () => { changed = true; }, async () => ({
      clocks: { world: changed && change === 'world' ? 21 : 20, her: changed && change === 'her' ? 21 : 20 },
      blinkAt: changed && change === 'blinkAt' ? 21 : 20, geometry: { ringPhases: [changed && change === 'ringPhase' ? 15 : 14] },
    }))).rejects.toThrow('changed clocks or spell phase');
  }
});
