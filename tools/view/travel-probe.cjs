// Opt-in browser instrumentation. No payloads, textures or game objects are retained in the trace.
function installTravelProbe() {
  const limit = 6000, trace = { events: [], uploads: Object.create(null), quality: [], dropped: 0, capabilities: { workerMessages: false, uploadCalls: 0 } };
  const add = e => { if (trace.events.length < limit) trace.events.push(e); else trace.dropped++; };
  const bytes = value => {
    const seen = new Set(); let total = 0, visited = 0;
    const walk = (v, depth) => {
      if (!v || typeof v !== 'object' || depth > 6 || visited++ > 128) return;
      const b = ArrayBuffer.isView(v) ? v.buffer : v instanceof ArrayBuffer ? v : null;
      if (b) { if (!seen.has(b)) { seen.add(b); total += b.byteLength; } return; }
      for (const k of Object.keys(v)) walk(v[k], depth + 1);
    };
    walk(value, 0); return total;
  };
  const NativeWorker = window.Worker;
  const message = NativeWorker && Object.getOwnPropertyDescriptor(NativeWorker.prototype, 'onmessage');
  trace.capabilities.workerMessages = !!message?.set;
  if (NativeWorker && message?.set) window.Worker = class extends NativeWorker {
    constructor(url, options) { super(url, options); const name = String(url).split('/').pop(); this._travelWorker = /mapPrep/.test(name) ? 'map' : /artWorker/.test(name) ? 'art' : /chartOutlines/.test(name) ? 'chart' : name; }
    postMessage(...args) { const at = performance.now(); try { return super.postMessage(...args); } finally { add({ kind: 'worker-send', worker: this._travelWorker, at, ms: performance.now() - at, job: args[0]?.kind, jobSeed: args[0]?.seed }); } }
    get onmessage() { return this._travelHandler ?? null; }
    set onmessage(handler) {
      this._travelHandler = handler;
      message.set.call(this, typeof handler === 'function' ? function(e) {
        const receivedBytes = bytes(e.data), at = performance.now();
        try { return handler.call(this, e); }
        finally { add({ kind: 'worker-callback', worker: this._travelWorker, at, ms: performance.now() - at, receivedBytes, workerMs: e.data?.ms ?? e.data?.rec?.ms ?? null, cached: e.data?.cached === true, job: e.data?.job?.kind, jobSeed: e.data?.job?.seed }); }
      } : null);
    }
  };
  const wrapped = new WeakSet();
  for (const C of [window.WebGLRenderingContext, window.WebGL2RenderingContext]) if (C) {
    for (const method of ['texImage2D', 'texSubImage2D', 'texImage3D', 'texSubImage3D', 'texStorage2D', 'texStorage3D', 'compressedTexImage2D']) {
      const original = C.prototype[method]; if (typeof original !== 'function' || wrapped.has(original)) continue;
      const measured = function(...args) {
        const at = performance.now(); let failed = true;
        try { const result = original.apply(this, args); failed = false; return result; }
        finally {
          const ms = performance.now() - at;
          const g = trace.uploads[method] ||= { method, count: 0, wallMs: 0, longestMs: 0, firstAt: at, lastAt: at, longestAt: at, errors: 0 };
          g.count++; g.wallMs += ms; g.lastAt = at; g.errors += failed ? 1 : 0;
          if (ms > g.longestMs) { g.longestMs = ms; g.longestAt = at; }
        }
      };
      wrapped.add(measured); C.prototype[method] = measured; trace.capabilities.uploadCalls++;
    }
  }
  let last = -Infinity;
  const sample = at => {
    const state = window.witch?.ladder?.state;
    if (state && at - last >= 250) { last = at; if (trace.quality.length < limit) trace.quality.push({ at, rung: state.rung, mode: state.mode }); else trace.dropped++; }
    requestAnimationFrame(sample);
  };
  requestAnimationFrame(sample);
  window.__travelProbe = { trace, reset() { trace.events.length = 0; for (const method of Object.keys(trace.uploads)) delete trace.uploads[method]; trace.quality.length = 0; trace.dropped = 0; last = -Infinity; } };
}
module.exports = { installTravelProbe };
