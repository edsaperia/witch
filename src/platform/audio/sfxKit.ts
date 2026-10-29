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
  /** Her routine's strokes' length, times (audio/deck.ts): 1 at 120 bpm and slower, shorter at a faster record's tempo so the
   *  strokes of a quick bar don't run over each other (sfxCues.ts sets it from the beat; Ed's DJ booth records, 2026-10-29). */
  pace = 1;
  private lastAt = new Map<string, number>();
  /** The legends' big space (a long generated reverb), built when one first sings. */
  private ocean: GainNode | null = null;

  /** `T`: the tuning's sfx, read live by every effect (a new night re-points it: retune). */
  constructor(readonly ctx: AudioContext | OfflineAudioContext, public volume: number, public T: SfxTuning, readonly root: number, dest?: AudioNode) {
    const c = ctx;
    this.out = c.createGain(); this.out.gain.value = volume * T.volume;
    const limit = c.createDynamicsCompressor();
    limit.threshold.value = -10; limit.knee.value = 6; limit.ratio.value = 8; limit.attack.value = 0.003; limit.release.value = 0.12;
    this.out.connect(limit); limit.connect(dest ?? c.destination); this.final = limit;
    this.noise = noiseBuffer(c, 1, 777);
  }

  setVolume(v: number): void { this.volume = v; this.out.gain.setTargetAtTime(v * this.T.volume, this.ctx.currentTime, 0.05); }

  /** A new night's tuning (docs/plans/sail-without-reload.md, A4): its sfx knobs from now on, its volume eased to. */
  retune(T: SfxTuning): void { if (T === this.T) return; this.T = T; this.setVolume(this.volume); }

  /** Rate limiting: true (and remembered) if `key` last sounded at least `gap` seconds ago. */
  ready(key: string, gap: number): boolean {
    const now = this.ctx.currentTime, last = this.lastAt.get(key) ?? -Infinity;
    if (now - last < gap) return false;
    this.lastAt.set(key, now);
    return true;
  }

  /** A gain into a panner into the bus: one sound's output. Every one-shot is counted against the budget (the tuning's
   *  sfx.budget.voices; Ed's playtest, 2026-10-12: "the sound is cutting out ... too many simultaneous sounds"): over it, a
   *  sound that matters less than every one sounding (`prio`, 0 to 1: her own sounds and the stings 1, a creature's by how
   *  near it is, the beds' scattered details low) is given a gain that goes nowhere (built, never heard, never rendered),
   *  and one that matters more takes the place of the least that's sounding (faded out in 20 ms). `life`: how long it
   *  sounds (s), Infinity for a lasting one (a bed's murmur), which isn't counted. */
  voice(pan: number, prio = 0.5, life = 1.5): GainNode {
    const c = this.ctx, g = c.createGain();
    if (Number.isFinite(life)) {
      const cap = this.T.budget?.voices ?? 0, now = c.currentTime, live = this.live;
      let n = 0;
      for (const v of live) if (v.end > now) live[n++] = v;
      live.length = n;
      if (cap > 0 && n >= cap) {
        let low = 0;
        for (let i = 1; i < n; i++) if (live[i].prio < live[low].prio) low = i;
        if (prio <= live[low].prio) { this.budget.culled++; return g; } // (never connected: nothing of it is rendered)
        const v = live[low]; v.g.gain.cancelScheduledValues(now); v.g.gain.setTargetAtTime(0, now, 0.02); v.end = now; live.splice(low, 1);
        this.budget.stolen++;
      }
      live.push({ end: now + life, prio, g });
      if (live.length > this.budget.peak) this.budget.peak = live.length;
    }
    const p = c.createStereoPanner();
    p.pan.value = Math.max(-1, Math.min(1, pan));
    g.connect(p); p.connect(this.out);
    return g;
  }
  /** The one-shots sounding (or still to sound) by the budget's count. */
  private live: { end: number; prio: number; g: GainNode }[] = [];
  /** The budget's count since the start: the most at once, those never played and those cut short (the audit reads it). */
  readonly budget = { peak: 0, culled: 0, stolen: 0 };
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
  /** The kit's noise looping at `rate` times its speed, not yet connected or started: the bed of wind, water and breath. */
  loopNoise(rate?: number): AudioBufferSourceNode {
    const s = this.ctx.createBufferSource();
    s.buffer = this.noise; s.loop = true;
    if (rate !== undefined) s.playbackRate.value = rate;
    return s;
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
