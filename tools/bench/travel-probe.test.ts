import { expect, it, vi } from 'vitest';
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
  const trace = context.__travelProbe.trace;
  expect(trace.events).toHaveLength(0);
  expect(trace.uploads.texImage2D).toEqual({ method: 'texImage2D', count: 2, wallMs: 2, longestMs: 1, firstAt: 0, lastAt: 2, longestAt: 0, errors: 1 });
});
it('records native worker errors without replacing handlers or retaining event payloads', () => {
  class NativeWorker {
    listeners = new Map<string, (e: unknown) => void>();
    set onmessage(_handler: unknown) {}
    addEventListener(type: string, handler: (e: unknown) => void) { this.listeners.set(type, handler); }
  }
  const context: any = { Worker: NativeWorker, performance: { now: () => 1 }, requestAnimationFrame: () => {} }; context.window = context;
  runInNewContext(`(${installTravelProbe.toString()})()`, context);
  const worker = new context.Worker('chartOutlines.worker.js'), preventDefault = vi.fn();
  worker.listeners.get('error')({ message: 'startup failed', data: new Uint8Array(100), preventDefault });
  expect(context.__travelProbe.trace.events[0]).toEqual({ kind: 'worker-error', worker: 'chart', at: 1, ms: 0, message: 'startup failed' });
  expect(preventDefault).not.toHaveBeenCalled();
});

it('retains every upload count and slowest call beyond the old cap, leaving room for late worker events', () => {
  let now = 0;
  class GL {
    texSubImage2D(ms: number, payload: unknown) { expect(this).toBe(gl); expect(payload).toBe(pixels); now += ms; return payload; }
    texStorage2D() { now += 2; }
  }
  class NativeWorker {
    handler: unknown;
    set onmessage(fn: unknown) { this.handler = fn; }
    postMessage() { now++; }
  }
  const context: any = { WebGL2RenderingContext: GL, Worker: NativeWorker, performance: { now: () => now }, ArrayBuffer, requestAnimationFrame: () => {} }; context.window = context;
  runInNewContext(`(${installTravelProbe.toString()})()`, context);
  const gl = new GL(), pixels = new Uint8Array(8);
  for (let i = 0; i < 30000; i++) expect(gl.texSubImage2D(i === 20000 ? 50 : 1, pixels)).toBe(pixels);
  gl.texStorage2D();
  const worker = new context.Worker('http://local/artWorker.js'); worker.postMessage();
  const trace = context.__travelProbe.trace;
  expect(trace.dropped).toBe(0);
  expect(trace.events).toHaveLength(1); expect(trace.events[0].kind).toBe('worker-send');
  expect(Object.keys(trace.uploads)).toHaveLength(2);
  expect(trace.uploads.texSubImage2D).toEqual({ method: 'texSubImage2D', count: 30000, wallMs: 30049, longestMs: 50, firstAt: 0, lastAt: 30048, longestAt: 20000, errors: 0 });
  expect(trace.uploads.texSubImage2D.pixels).toBeUndefined();
  context.__travelProbe.reset();
  expect(Object.keys(trace.uploads)).toHaveLength(0); expect(trace.events).toHaveLength(0); expect(trace.dropped).toBe(0);
  gl.texSubImage2D(3, pixels);
  expect(trace.uploads.texSubImage2D.count).toBe(1); expect(trace.uploads.texSubImage2D.wallMs).toBe(3);
});
