// The FOF singing voice on Web Audio (Ed, 2026-10-11: "replace Pink Trombone in the music engine ... with Faust's physmodels.lib
// FOF singing model"): Mike Olsen's pm.SFFormantModelFofSmooth compiled to WebAssembly (tools/voice/fof/fof.dsp, built by
// tools/voice/fof/build.mjs into fofModule.ts), run by our own AudioWorklet (no Faust runtime shipped): a pool of voices in
// one worklet, each three detuned singers spread across the stereo field, notes started and stopped on the audio clock. Its
// noise is the compiled code's own, so a render is the same every time.
// (the compiled module, 46 kB of base64, is loaded only when a FOF voice is first wanted: a dynamic import, so the game's
// first load doesn't carry it; the formant voice sings until it's in, as it did while the module compiled)
type FofMeta = typeof import("./fofModule").FOF_META;
let meta: FofMeta | null = null;

/** The worklet's processor: `voices` voices of the compiled module in one memory; events (a note on, its vowel, off; a
 *  setting for all) applied at the block they fall in (128 samples, under 3 ms). */
const PROCESSOR = `
class WitchFof extends AudioWorkletProcessor {
  constructor(options) {
    super();
    const o = options.processorOptions;
    this.P = o.params; this.N = o.voices; this.size = o.size;
    const bytes = this.N * this.size + 4096 + 2 * 128 * 4;
    this.mem = new WebAssembly.Memory({ initial: Math.ceil(bytes / 65536) + 1 });
    const env = { memory: this.mem, _cosf: Math.cos, _expf: Math.exp, _powf: Math.pow, _sinf: Math.sin, _tanf: Math.tan };
    this.w = new WebAssembly.Instance(o.module, { env }).exports;
    this.out = Math.ceil((this.N * this.size) / 16) * 16; this.ptrs = this.out + 2 * 128 * 4;
    const i32 = new Int32Array(this.mem.buffer); i32[this.ptrs >> 2] = this.out; i32[(this.ptrs >> 2) + 1] = this.out + 128 * 4;
    this.f32 = new Float32Array(this.mem.buffer);
    this.v = [];
    for (let k = 0; k < this.N; k++) { this.w.init(k * this.size, sampleRate); this.v.push({ id: -1, held: false, offFrame: -1e12, onFrame: -1e12 }); }
    this.release = 0.5; this.events = []; this.ids = new Map();
    this.port.onmessage = e => { for (const ev of e.data) this.events.push(ev); this.events.sort((a, b) => a.t - b.t); };
  }
  set(k, name, value) { const i = this.P[name]; if (i !== undefined) this.w.setParamValue(k * this.size, i, value); }
  handle(ev, frame) {
    if (ev.type === "set") { for (let k = 0; k < this.N; k++) this.set(k, ev.name, ev.value); if (ev.name === "release") this.release = ev.value; return; }
    if (ev.type === "on") {
      // a free voice (the longest released), else the oldest held one, stolen
      let best = -1, score = Infinity;
      for (let k = 0; k < this.N; k++) { const v = this.v[k], s = v.held ? 1e15 + v.onFrame : v.offFrame; if (s < score) { score = s; best = k; } }
      const v = this.v[best];
      if (v.held) { this.set(best, "gate", 0); v.held = false; v.offFrame = frame; this.events.unshift({ ...ev, t: (frame + 128) / sampleRate }); return; }
      this.set(best, "freq", ev.freq); this.set(best, "gain", ev.gain); this.set(best, "vowel", ev.vowel); this.set(best, "gate", 1);
      v.id = ev.id; v.held = true; v.onFrame = frame; this.ids.set(ev.id, best); return;
    }
    const k = this.ids.get(ev.id);
    if (k === undefined || this.v[k].id !== ev.id) return;
    if (ev.type === "vowel") this.set(k, "vowel", ev.vowel);
    else if (ev.type === "off") { this.set(k, "gate", 0); this.v[k].held = false; this.v[k].offFrame = frame; this.ids.delete(ev.id); }
  }
  process(inputs, outputs) {
    const L = outputs[0][0], R = outputs[0][1] || outputs[0][0], n = L.length, frame = currentFrame, end = frame + n;
    while (this.events.length && this.events[0].t * sampleRate < end) this.handle(this.events.shift(), frame);
    const ring = (this.release + 1.5) * sampleRate;
    for (let k = 0; k < this.N; k++) {
      const v = this.v[k];
      if (!v.held && frame - v.offFrame > ring) continue; // (silent: not computed)
      this.w.compute(k * this.size, n, this.ptrs, this.ptrs);
      const a = this.out >> 2, b = (this.out >> 2) + 128;
      for (let i = 0; i < n; i++) { L[i] += this.f32[a + i]; R[i] += this.f32[b + i]; }
    }
    return true;
  }
}
registerProcessor("witch-fof", WitchFof);
`;

let compiled: Promise<WebAssembly.Module> | null = null;
/** The compiled module, once it is (every pool's). */
let compiledModule: WebAssembly.Module | null = null;
const loaded = new WeakMap<BaseAudioContext, Promise<boolean>>();
const ready = new WeakSet<BaseAudioContext>();

/** The FOF worklet on this context (once a context): true once it can sing, false if it can't (no AudioWorklet). */
export function fofReady(ctx: BaseAudioContext): Promise<boolean> {
  let p = loaded.get(ctx);
  if (!p) {
    p = (async () => {
      try {
        if (!ctx.audioWorklet) return false;
        const m = await import("./fofModule");
        meta = m.FOF_META;
        compiled ??= WebAssembly.compile(Uint8Array.from(atob(m.FOF_WASM), c => c.charCodeAt(0)));
        compiledModule = await compiled;
        const url = URL.createObjectURL(new Blob([PROCESSOR], { type: "application/javascript" }));
        await ctx.audioWorklet.addModule(url);
        URL.revokeObjectURL(url);
        ready.add(ctx);
        return true;
      } catch (e) { console.warn("fof: " + (e as Error)?.message); return false; }
    })();
    loaded.set(ctx, p);
  }
  return p;
}

/** Whether the FOF voice is loaded on this context now. */
export const fofLoaded = (ctx: BaseAudioContext): boolean => ready.has(ctx);

/** The FOF vowels by name: a, e, i, o, u (Faust's 0 to 4); the formant voice's names map onto them. */
export const FOF_VOWELS: Record<string, number> = { ah: 0, a: 0, eh: 1, e: 1, ee: 2, i: 2, oh: 3, o: 3, oo: 4, u: 4 };
/** The voice types: alto, bass, countertenor, soprano, tenor. */
export const FOF_TYPES: Record<string, number> = { alto: 0, bass: 1, countertenor: 2, soprano: 3, tenor: 4 };

export interface FofSettings { type?: number; detune?: number; vibrato?: number; vibratoRate?: number; vibratoDelay?: number; breath?: number; attack?: number; release?: number }

let nextId = 1;
/** A pool of FOF voices on one worklet (a part's): notes on the audio clock. Only once fofReady(ctx) has resolved true. */
export class FofVoices {
  readonly node: AudioWorkletNode;
  private out: GainNode;
  private pending: object[] = [];
  private flushAt = -1;
  constructor(ctx: BaseAudioContext, dest: AudioNode, voices = 6, settings: FofSettings = {}) {
    this.node = new AudioWorkletNode(ctx, "witch-fof", {
      numberOfInputs: 0, numberOfOutputs: 1, outputChannelCount: [2],
      processorOptions: { module: compiledModule!, size: meta!.size, params: meta!.params, voices },
    });
    // (the compiled voice sings quietly: three singers each at 0.45 of a FOF's own level; brought up to the formant voice's)
    const level = ctx.createGain(); level.gain.value = 12;
    this.node.connect(level).connect(dest);
    this.out = level;
    this.settings(settings);
  }
  /** Settings for every voice, now. */
  settings(s: FofSettings): void {
    this.post(Object.entries(s).filter(([, v]) => v !== undefined).map(([name, value]) => ({ type: "set", t: 0, name, value })));
  }
  /** A note: from `t` for `dur` seconds (then its release) at `freq` Hz, `gain` 0-1, its vowel (0 a to 4 u), and if given,
   *  the vowel it morphs to by its middle. */
  note(t: number, freq: number, dur: number, gain: number, vowel: number, vowelTo?: number): void {
    const id = nextId++, evs: object[] = [{ type: "on", t, id, freq, gain, vowel }];
    if (vowelTo !== undefined && vowelTo !== vowel) evs.push({ type: "vowel", t: t + dur * 0.5, id, vowel: vowelTo });
    evs.push({ type: "off", t: t + Math.max(0.03, dur), id });
    this.post(evs);
  }
  private post(evs: object[]): void {
    // (gathered and sent once a task: the engine schedules a frame's notes together)
    this.pending.push(...evs);
    if (this.flushAt < 0) { this.flushAt = 0; queueMicrotask(() => { this.node.port.postMessage(this.pending); this.pending = []; this.flushAt = -1; }); }
  }
  dispose(): void { try { this.node.disconnect(); this.out.disconnect(); this.node.port.close(); } catch { /* gone */ } }
}

