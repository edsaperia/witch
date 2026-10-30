import { expect, it } from 'vitest';
import { DeferredBeach, prepareDeferredBeach } from './deferredBeach';

it('keeps coast use off and uniforms unread until background compile is ready', async () => {
  const events: string[] = [], gate = new DeferredBeach(e => events.push(e)); gate.begin();
  let ready = false, reads = 0, turns = 0;
  await prepareDeferredBeach({ id: 83, isReady: () => ready, getUniforms: () => { expect(ready).toBe(true); reads++; } }, Promise.resolve(), gate, async () => {
    expect(gate.use()).toBe(false); turns++; if (turns === 3) ready = true;
  });
  expect(reads).toBe(1); expect(gate.use()).toBe(true);
  expect(events).toEqual(['compile-start', 'coast-wait', 'compile-ready', 'coast-use']);
  gate.leave(); gate.use(); expect(events.at(-1)).toBe('coast-use');
});

it('stops polling disposed ground and does not read its uniforms', async () => {
  const gate = new DeferredBeach(() => {}); gate.begin(); let reads = 0;
  await prepareDeferredBeach({ id: 83, isReady: () => false, getUniforms: () => reads++ }, new Promise(() => {}), gate, async () => gate.cancel());
  expect(reads).toBe(0); expect(gate.ready).toBe(false);
});
