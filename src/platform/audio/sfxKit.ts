// The sound effects' workbench (platform/audio/sfx.ts): their output bus (a gain into a gentle
// limiter), the little builders every effect is made of (a panned voice, an envelope, an
// oscillator, a burst of noise, a body's thump), rate limiting, and the legends' big space.
import type { Tuning } from "../../rules/tuning";
import { lcg, noiseBuffer } from "./dsp";

export type SfxTuning = Tuning["sfx"];

export class SfxKit {
  readonly out: GainNode;
  /** The last node before the speakers (its limiter): the watchdog taps it. */
  readonly final: DynamicsCompressorNode;
  readonly noise: AudioBuffer;
  private lastAt = new Map<string, number>();
  /** The legends' big space (a long generated reverb), built when one first sings. */
  private ocean: GainNode | null = null;

  constructor(readonly ctx: AudioContext | OfflineAudioContext, public volume: number, readonly T: SfxTuning, readonly root: number, dest?: AudioNode) {
    const c = ctx;
    this.out = c.createGain(); this.out.gain.value = volume * T.volume;
    const limit = c.createDynamicsCompressor();
    limit.threshold.value = -10; limit.knee.value = 6; limit.ratio.value = 8; limit.attack.value = 0.003; limit.release.value = 0.12;
    this.out.connect(limit); limit.connect(dest ?? c.destination); this.final = limit;
    this.noise = noiseBuffer(c, 1, 777);
  }

  setVolume(v: number): void { this.volume = v; this.out.gain.setTargetAtTime(v * this.T.volume, this.ctx.currentTime, 0.05); }

  /** Rate limiting: true (and remembered) if `key` last sounded at least `gap` seconds ago. */
  ready(key: string, gap: number): boolean {
    const now = this.ctx.currentTime, last = this.lastAt.get(key) ?? -Infinity;
    if (now - last < gap) return false;
    this.lastAt.set(key, now);
    return true;
  }

  /** A gain into a panner into the bus: one sound's output. */
  voice(pan: number): GainNode {
    const c = this.ctx, g = c.createGain(), p = c.createStereoPanner();
    p.pan.value = Math.max(-1, Math.min(1, pan));
    g.connect(p); p.connect(this.out);
    return g;
  }
  env(g: GainNode, at: number, peak: number, attack: number, decay: number): void {
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), at + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, at + attack + decay);
  }
  osc(type: OscillatorType, freq: number, at: number, dur: number, dest: AudioNode): OscillatorNode {
    const o = this.ctx.createOscillator();
    o.type = type; o.frequency.setValueAtTime(freq, at);
    o.connect(dest); o.start(at); o.stop(at + dur + 0.05);
    return o;
  }
  noiseBurst(at: number, dur: number, dest: AudioNode, offset = 0): AudioBufferSourceNode {
    const s = this.ctx.createBufferSource();
    s.buffer = this.noise; s.connect(dest); s.start(at, offset % 0.9, dur + 0.02);
    return s;
  }

  /** A soft body thump: a low sine falling, and a puff of low noise. */
  thump(at: number, vol: number, pan = 0): void {
    const c = this.ctx, out = this.voice(pan), g = c.createGain();
    g.connect(out); this.env(g, at, vol, 0.002, 0.14);
    const o = this.osc("sine", 110, at, 0.16, g); o.frequency.exponentialRampToValueAtTime(42, at + 0.14);
    const lp = c.createBiquadFilter(), ng = c.createGain();
    lp.type = "lowpass"; lp.frequency.value = 500; ng.connect(out); this.env(ng, at, vol * 0.5, 0.002, 0.08);
    lp.connect(ng); this.noiseBurst(at, 0.1, lp, 0.6);
  }

  /** The legends' space: a long, dark generated reverb (built once). */
  space(): GainNode {
    if (this.ocean) return this.ocean;
    const c = this.ctx, len = Math.floor(c.sampleRate * 4.5), ir = c.createBuffer(2, len, c.sampleRate), next = lcg(4242);
    for (let ch = 0; ch < 2; ch++) {
      const d = ir.getChannelData(ch);
      for (let i = 0; i < len; i++) { const t = i / c.sampleRate; d[i] = next() * Math.exp(-t * 1.3) * (t < 0.03 ? t / 0.03 : 1); }
    }
    const conv = c.createConvolver(), dark = c.createBiquadFilter(), wet = c.createGain();
    conv.buffer = ir; dark.type = "lowpass"; dark.frequency.value = 1800; wet.gain.value = this.T.whale.reverb;
    this.ocean = c.createGain();
    this.ocean.connect(conv); conv.connect(dark); dark.connect(wet); wet.connect(this.out);
    return this.ocean;
  }
}
