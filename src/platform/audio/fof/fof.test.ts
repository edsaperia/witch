// The FOF voice's compiled module (tools/voice/fof/build.mjs): it loads, sings a note on its gate, is silent before it, and
// sings the same every time (its noise the compiled code's own).
import { describe, expect, it } from "vitest";
import { FOF_META, FOF_WASM } from "./fofModule";

function render(freq: number, frames = 48000): Float32Array {
  const mod = new WebAssembly.Module(Buffer.from(FOF_WASM, "base64"));
  const mem = new WebAssembly.Memory({ initial: Math.ceil((FOF_META.size + 8192) / 65536) + 1 });
  const w = new WebAssembly.Instance(mod, { env: { memory: mem, _cosf: Math.cos, _expf: Math.exp, _powf: Math.pow, _sinf: Math.sin, _tanf: Math.tan } }).exports as Record<string, (...a: number[]) => number>;
  const out = Math.ceil(FOF_META.size / 16) * 16, ptrs = out + 2 * 128 * 4, i32 = new Int32Array(mem.buffer), f32 = new Float32Array(mem.buffer);
  i32[ptrs >> 2] = out; i32[(ptrs >> 2) + 1] = out + 128 * 4;
  w.init(0, 48000);
  const P = FOF_META.params as Record<string, number>, L = new Float32Array(frames);
  w.setParamValue(0, P.freq, freq); w.setParamValue(0, P.gain, 0.7); w.setParamValue(0, P.vowel, 0);
  for (let f = 0; f < frames; f += 128) {
    if (f === 4864) w.setParamValue(0, P.gate, 1); // (a block line: 38 blocks in)
    w.compute(0, 128, ptrs, ptrs);
    L.set(f32.subarray(out >> 2, (out >> 2) + Math.min(128, frames - f)), f);
  }
  return L;
}

describe("the FOF voice", () => {
  it("is silent before its gate, sings after it, the same every time", () => {
    expect(FOF_META.outputs).toBe(2);
    for (const k of ["freq", "gain", "gate", "vowel", "type", "detune", "vibrato", "breath", "attack", "release"]) expect((FOF_META.params as Record<string, number>)[k], k).toBeTypeOf("number");
    const a = render(440), b = render(440);
    let before = 0, after = 0, nan = 0;
    for (let i = 0; i < a.length; i++) { if (!Number.isFinite(a[i])) nan++; if (i < 4864) before = Math.max(before, Math.abs(a[i])); else after = Math.max(after, Math.abs(a[i])); }
    expect(nan).toBe(0);
    expect(before).toBeLessThan(1e-6);
    expect(after).toBeGreaterThan(0.005);
    expect(Array.from(a)).toEqual(Array.from(b));
  });
});
