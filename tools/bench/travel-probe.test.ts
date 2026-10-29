import { expect, it } from 'vitest';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';
const { installTravelProbe } = createRequire(import.meta.url)('../view/travel-probe.cjs');
it('preserves worker handlers, receiver, return values and transfer-list identity', () => {
  class NativeWorker {
    handler: ((e: unknown) => unknown) | null = null;
    args: unknown[] = [];
    constructor(_url: string, _options?: unknown) {}
    set onmessage(fn: ((e: unknown) => unknown) | null) { this.handler = fn; }
    get onmessage() { return this.handler; }
    postMessage(...args: unknown[]) { this.args = args; return 7; }
  }
  let now = 0;
  const context: any = { Worker: NativeWorker, performance: { now: () => now++ }, ArrayBuffer, requestAnimationFrame: () => {} }; context.window = context;
  runInNewContext(`(${installTravelProbe.toString()})()`, context);
  const worker = new context.Worker('http://local/artWorker-hash.js', { type: 'module' });
  const data = { kind: 'type' }, transfers: unknown[] = [];
  expect(worker.postMessage(data, transfers)).toBe(7);
  expect(worker.args[0]).toBe(data); expect(worker.args[1]).toBe(transfers);
  let receiver: unknown;
  const handler = function(this: unknown, event: unknown) { receiver = this; return event; };
  worker.onmessage = handler;
  expect(worker.onmessage).toBe(handler);
  const event = { data: { ms: 500, cached: false, result: { pixels: new Uint8Array(8) } } };
  expect(worker.handler(event)).toBe(event); expect(receiver).toBe(worker);
  const trace = context.__travelProbe.trace;
  expect(trace.events.map((e: any) => e.kind)).toEqual(['worker-send', 'worker-callback']);
  expect(trace.events[1].workerMs).toBe(500); expect(trace.events[1].receivedBytes).toBe(8);
  expect(trace.events[1].result).toBeUndefined(); // payload is not retained
  worker.onmessage = null; expect(worker.handler).toBeNull();
  context.__travelProbe.reset(); expect(trace.events).toHaveLength(0);
});
it('preserves upload return values and thrown errors while recording the call', () => {
  class GL { texImage2D(value: number) { if (value < 0) throw new Error('driver'); return value; } }
  let now = 0;
  const context: any = { WebGL2RenderingContext: GL, performance: { now: () => now++ }, requestAnimationFrame: () => {} }; context.window = context;
  runInNewContext(`(${installTravelProbe.toString()})()`, context);
  const gl = new GL(); expect(gl.texImage2D(3)).toBe(3); expect(() => gl.texImage2D(-1)).toThrow('driver');
  expect(context.__travelProbe.trace.events.map((e: any) => e.method)).toEqual(['texImage2D', 'texImage2D']);
});
