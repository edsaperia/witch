// The music engine (Ed, 2026-10-04: generative music, in code): plays the score
// (rules/musicScore.ts) from the conductor's sections (rules/musicPlan.ts) with Web Audio, every
// sound synthesised (no samples). Each frame it schedules the sixteenths of the next fraction of a
// second on the audio clock, on the game's beat clock (rules/beat.ts: step 0 is game time 0, the
// tempo rising wave by wave). One output: Music
// (platform/music.ts) puts it through the proximity mix; the Music Lab plays it straight.
// The parts share a reverb (a generated impulse), a dotted delay and the kick's duck (the pump),
// then the section's low-pass (sweeps in builds, half shut in breakdowns) and a gentle limiter.
import { beatAt, bpmAt, timeAt, type BeatClock } from "../rules/beat";
import { Conductor, type MusicCue } from "../rules/musicPlan";
import { notesAt, resolveSection, sectionCutoff, type BlockPlan, type MusicStyle, type NoteEvent, type Patch } from "../rules/musicScore";

const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

interface Channel { in: GainNode; lastFreq: number }

export class MusicEngine {
  readonly conductor: Conductor;
  /** What was last scheduled (a fraction of a second ahead of what's heard): for the Music Lab. */
  current: { plan: BlockPlan; bar: number; step: number } | null = null;
  private out: GainNode;
  private tone: BiquadFilterNode;
  private duckBus: GainNode;
  private dryBus: GainNode;
  private reverb: ConvolverNode;
  private reverbIn: GainNode;
  private delay: DelayNode;
  private delayIn: GainNode;
  private feedback: GainNode;
  private noise: AudioBuffer;
  private channels = new Map<string, Channel>();
  private curves = new Map<number, Float32Array<ArrayBuffer>>();
  private nextStep = -1;
  private anchor = NaN; // audio time of game time 0
  private reverbTime = 0;

  constructor(private ctx: BaseAudioContext, dest: AudioNode, public style: MusicStyle, public seed = 0) {
    this.conductor = new Conductor(style);
    const c = ctx;
    this.out = c.createGain();
    const limit = c.createDynamicsCompressor();
    limit.threshold.value = -10; limit.knee.value = 6; limit.ratio.value = 4; limit.attack.value = 0.003; limit.release.value = 0.2;
    this.tone = c.createBiquadFilter(); this.tone.type = "lowpass"; this.tone.frequency.value = 18000; this.tone.Q.value = 0.9;
    this.duckBus = c.createGain(); this.dryBus = c.createGain();
    this.reverb = c.createConvolver(); this.reverbIn = c.createGain();
    this.delay = c.createDelay(4); this.delayIn = c.createGain(); this.feedback = c.createGain();
    const delayTone = c.createBiquadFilter(); delayTone.type = "lowpass"; delayTone.frequency.value = 3200;
    // parts -> (duck | dry) + reverb + delay -> section low-pass -> limiter -> out
    this.duckBus.connect(this.tone); this.dryBus.connect(this.tone);
    this.reverbIn.connect(this.reverb); this.reverb.connect(this.tone);
    this.delayIn.connect(this.delay); this.delay.connect(delayTone); delayTone.connect(this.feedback); this.feedback.connect(this.delay); delayTone.connect(this.tone);
    this.tone.connect(limit); limit.connect(this.out); this.out.connect(dest);
    this.noise = c.createBuffer(1, 2 * c.sampleRate, c.sampleRate);
    const d = this.noise.getChannelData(0);
    let r = 22222;
    for (let i = 0; i < d.length; i++) { r = (Math.imul(r, 1103515245) + 12345) >>> 0; d[i] = (r / 4294967296) * 2 - 1; }
    this.setStyle(style);
  }

  /** A new or edited style: takes effect from the next block. */
  setStyle(style: MusicStyle): void {
    this.style = style;
    this.conductor.reset(style);
    const m = style.mix;
    this.out.gain.value = m.master;
    this.reverbIn.gain.value = m.reverb;
    this.delayIn.gain.value = m.delay;
    this.feedback.gain.value = Math.min(0.85, m.feedback);
    if (m.reverbTime !== this.reverbTime) { this.reverbTime = m.reverbTime; this.reverb.buffer = this.impulse(m.reverbTime); }
    this.channels.clear();
  }

  /** Each frame: schedule what's due in the next `ahead` seconds of audio time, at game time
   *  `gameTime` (seconds) on the beat clock `clock`. `playing` false: nothing new is scheduled. */
  update(cue: MusicCue, gameTime: number, clock: BeatClock, playing: boolean, ahead = 0.3): void {
    const now = this.ctx.currentTime, stepNow = beatAt(clock, gameTime) * 4;
    if (!playing) { this.nextStep = -1; return; }
    // the audio time of game time 0, smoothed so the frames' jitter doesn't reach the notes; a jump
    // (a hitch, a pause, a jump in game time) resets it
    const raw = now - gameTime;
    if (!(Math.abs(raw - this.anchor) < 0.06)) { this.anchor = raw; this.nextStep = -1; } else this.anchor += (raw - this.anchor) * 0.05;
    if (this.nextStep < 0 || this.nextStep < stepNow - 1 || this.nextStep > stepNow + 64) this.nextStep = Math.ceil(stepNow);
    this.delay.delayTime.setTargetAtTime(Math.min(4, (this.style.mix.delayBeats * 60) / bpmAt(clock, gameTime)), now, 0.05);
    for (;;) {
      const g = timeAt(clock, this.nextStep / 4), t = this.anchor + g;
      if (t >= now + ahead) break;
      if (t >= now) this.step(cue, this.nextStep, t, 60 / bpmAt(clock, g) / 4);
      this.nextStep++;
    }
  }

  /** Schedule game time [from, from + seconds) to play from audio time `at` (offline rendering). */
  renderAhead(cue: MusicCue, from: number, seconds: number, clock: BeatClock, at = 0): void {
    const first = Math.ceil(beatAt(clock, from) * 4 - 1e-9);
    for (let s = first; ; s++) {
      const g = timeAt(clock, s / 4);
      if (g >= from + seconds) break;
      this.step(cue, s, at + (g - from), 60 / bpmAt(clock, g) / 4);
    }
  }

  /** Stop scheduling and forget the plans (a jump in the timeline). */
  reset(): void { this.nextStep = -1; this.conductor.reset(); }

  /** One sixteenth: `t` its audio time, `sps` seconds a sixteenth lasts now. */
  private step(cue: MusicCue, step: number, t: number, sps: number): void {
    const S = this.style, B = S.blockBars, bar = Math.floor(step / 16), s = step - bar * 16;
    const plan = this.conductor.plan(cue, bar);
    // in a block's last bar, the next block's plan (for the fill): fixed a bar early
    const next = bar % B === B - 1 ? this.conductor.plan(cue, bar + 1) : null;
    this.current = { plan, bar, step };
    if (s === 0) {
      // the section's low-pass over this bar
      const sec = resolveSection(S, plan.section), barIn = bar - plan.start;
      const f0 = sectionCutoff(sec, barIn / plan.bars), f1 = sectionCutoff(sec, (barIn + 1) / plan.bars);
      this.tone.frequency.setValueAtTime(f0, t);
      if (f1 !== f0) this.tone.frequency.exponentialRampToValueAtTime(f1, t + 16 * sps);
    }
    const events = notesAt(S, plan, next, step, { seed: this.seed, siege: cue.siege });
    const swing = step % 2 === 1 ? S.swing * sps : 0;
    for (const e of events) this.play(e, t + swing + e.offset * sps, e.dur * sps, sps);
  }

  private channel(part: string, p: Patch): Channel {
    let ch = this.channels.get(part);
    if (!ch) {
      const g = this.ctx.createGain();
      g.connect(p.duck ? this.duckBus : this.dryBus);
      if (p.reverb) { const r = this.ctx.createGain(); r.gain.value = p.reverb; g.connect(r); r.connect(this.reverbIn); }
      if (p.delay) { const d = this.ctx.createGain(); d.gain.value = p.delay; g.connect(d); d.connect(this.delayIn); }
      this.channels.set(part, ch = { in: g, lastFreq: 0 });
    }
    return ch;
  }

  private play(e: NoteEvent, t: number, dur: number, sps: number): void {
    const p = this.style.patches[e.patch];
    if (!p) return;
    const ch = this.channel(e.part, p), peak = p.gain * e.vel;
    switch (p.kind) {
      case "kick": this.kick(t, p, peak, ch.in); this.duck(t, e.vel, sps); break;
      case "noise": this.noiseHit(t, p, peak, ch.in); break;
      case "snare": this.snare(t, p, peak, ch.in); break;
      case "bell": this.bell(t, p, peak, mtof(e.midi ?? 69), ch.in); break;
      case "synth": this.synth(t, p, peak, mtof(e.midi ?? 45), dur, ch); break;
      case "riser": this.riser(t, p, dur, e.from ?? 0, e.to ?? 1, ch.in); break;
      case "impact": this.impact(t, p, peak, ch.in); break;
    }
  }

  private duck(t: number, vel: number, sps: number): void {
    const depth = this.style.mix.duck * Math.min(1, vel), g = this.duckBus.gain;
    if (depth <= 0) return;
    g.setTargetAtTime(1 - depth, t, 0.004);
    g.setTargetAtTime(1, t + 0.03, sps * 0.7);
  }

  private env(t: number, peak: number, attack: number, decay: number): GainNode {
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(peak, t + Math.max(0.001, attack));
    g.gain.exponentialRampToValueAtTime(0.0005, t + Math.max(0.001, attack) + Math.max(0.01, decay));
    return g;
  }

  private shaper(drive: number): WaveShaperNode {
    const k = Math.round(drive * 40) + 1;
    let curve = this.curves.get(k);
    if (!curve) {
      curve = new Float32Array(1024);
      for (let i = 0; i < 1024; i++) { const x = (i / 1023) * 2 - 1; curve[i] = Math.tanh(k * 0.6 * x) / Math.tanh(k * 0.6); }
      this.curves.set(k, curve);
    }
    const w = this.ctx.createWaveShaper(); w.curve = curve;
    return w;
  }

  private chain(nodes: AudioNode[], dest: AudioNode): void {
    for (let i = 0; i < nodes.length - 1; i++) nodes[i].connect(nodes[i + 1]);
    nodes[nodes.length - 1].connect(dest);
  }

  private kick(t: number, p: Patch, peak: number, dest: AudioNode): void {
    const c = this.ctx, o = c.createOscillator(), decay = p.decay ?? 0.35;
    o.frequency.setValueAtTime(p.pitch ?? 150, t);
    o.frequency.exponentialRampToValueAtTime(p.pitchEnd ?? 45, t + (p.pitchTime ?? 0.08));
    const g = this.env(t, peak, 0.002, decay);
    this.chain(p.drive ? [o, this.shaper(p.drive), g] : [o, g], dest);
    o.start(t); o.stop(t + decay + 0.05);
  }

  private noiseSource(t: number, length: number): AudioBufferSourceNode {
    const s = this.ctx.createBufferSource();
    s.buffer = this.noise;
    s.loop = length > 1.5;
    s.start(t, ((t * 7.31) % 1) * 0.5);
    s.stop(t + length);
    return s;
  }

  private noiseHit(t: number, p: Patch, peak: number, dest: AudioNode): void {
    const c = this.ctx, decay = p.decay ?? 0.05, bursts = p.bursts ?? 1, gap = 0.011;
    const f = c.createBiquadFilter(); f.type = p.filter ?? "highpass"; f.frequency.value = p.cutoff ?? 8000; f.Q.value = p.q ?? 0.7;
    const g = c.createGain(), t0 = t + (bursts - 1) * gap;
    g.gain.setValueAtTime(0, t);
    for (let i = 0; i < bursts - 1; i++) { g.gain.linearRampToValueAtTime(peak, t + i * gap + 0.001); g.gain.exponentialRampToValueAtTime(peak * 0.15, t + i * gap + gap * 0.9); }
    g.gain.linearRampToValueAtTime(peak, t0 + Math.max(0.001, p.attack ?? 0.001));
    g.gain.exponentialRampToValueAtTime(0.0005, t0 + (p.attack ?? 0.001) + decay);
    this.chain([this.noiseSource(t, t0 - t + decay + 0.06), f, g], dest);
  }

  private snare(t: number, p: Patch, peak: number, dest: AudioNode): void {
    const c = this.ctx, decay = p.decay ?? 0.14;
    const f = c.createBiquadFilter(); f.type = "highpass"; f.frequency.value = p.cutoff ?? 1800; f.Q.value = p.q ?? 0.7;
    this.chain([this.noiseSource(t, decay + 0.05), f, this.env(t, peak, 0.001, decay)], dest);
    const o = c.createOscillator(); o.type = "triangle";
    o.frequency.setValueAtTime((p.pitch ?? 190) * 1.5, t); o.frequency.exponentialRampToValueAtTime(p.pitch ?? 190, t + 0.03);
    this.chain([o, this.env(t, peak * 0.7, 0.001, decay * 0.5)], dest);
    o.start(t); o.stop(t + decay + 0.05);
  }

  private bell(t: number, p: Patch, peak: number, freq: number, dest: AudioNode): void {
    const c = this.ctx, decay = p.decay ?? 0.3;
    const f = c.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = p.cutoff ?? 2400; f.Q.value = p.q ?? 1.5;
    const g = this.env(t, peak, 0.001, decay);
    f.connect(g); g.connect(dest);
    for (const k of [1, p.ratio ?? 1.48]) { const o = c.createOscillator(); o.type = "square"; o.frequency.value = freq * k; o.connect(f); o.start(t); o.stop(t + decay + 0.05); }
  }

  private synth(t: number, p: Patch, peak: number, freq: number, dur: number, ch: Channel): void {
    const c = this.ctx, waves = p.waves ?? ["sawtooth"], n = waves.length;
    const attack = Math.max(0.002, p.attack ?? 0.005), decay = Math.max(0.01, p.decay ?? 0.2), sustain = p.sustain ?? 0.5, release = Math.max(0.01, p.release ?? 0.1);
    const end = t + Math.max(dur, attack), stop = end + release * 4 + 0.02;
    const g = c.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(peak / Math.sqrt(n), t + attack);
    if (end > t + attack) g.gain.setTargetAtTime((peak / Math.sqrt(n)) * sustain, t + attack, decay / 3);
    g.gain.setTargetAtTime(0, end, release / 3);
    const nodes: AudioNode[] = [];
    if (p.filter) {
      const f = c.createBiquadFilter(); f.type = p.filter; f.Q.value = p.q ?? 0.7;
      const base = p.cutoff ?? 2000, top = Math.min(18000, base + (p.envAmt ?? 0) * peak / Math.max(0.001, p.gain));
      f.frequency.setValueAtTime(top, t);
      if (top > base) f.frequency.exponentialRampToValueAtTime(base, t + attack + decay);
      nodes.push(f);
    }
    if (p.drive) nodes.push(this.shaper(p.drive));
    nodes.push(g);
    this.chain(nodes, ch.in);
    waves.forEach((w, i) => {
      const o = c.createOscillator(); o.type = w;
      o.detune.value = n > 1 ? (p.detune ?? 0) * ((2 * i) / (n - 1) - 1) : 0;
      if (p.glide && ch.lastFreq > 0 && ch.lastFreq !== freq) { o.frequency.setValueAtTime(ch.lastFreq, t); o.frequency.exponentialRampToValueAtTime(freq, t + p.glide); }
      else o.frequency.value = freq;
      o.connect(nodes[0]); o.start(t); o.stop(stop);
    });
    ch.lastFreq = freq;
  }

  private riser(t: number, p: Patch, dur: number, from: number, to: number, dest: AudioNode): void {
    const c = this.ctx, lo = p.cutoff ?? 400, f = c.createBiquadFilter(), g = c.createGain();
    f.type = "bandpass"; f.Q.value = p.q ?? 4;
    const fq = (k: number) => lo * Math.pow(12000 / lo, k), lvl = (k: number) => p.gain * (0.1 + 0.9 * k * k);
    f.frequency.setValueAtTime(fq(from), t); f.frequency.exponentialRampToValueAtTime(fq(to), t + dur);
    g.gain.setValueAtTime(lvl(from), t); g.gain.linearRampToValueAtTime(lvl(to), t + dur);
    g.gain.linearRampToValueAtTime(0, t + dur + 0.02);
    this.chain([this.noiseSource(t, dur + 0.05), f, g], dest);
  }

  private impact(t: number, p: Patch, peak: number, dest: AudioNode): void {
    const c = this.ctx, decay = p.decay ?? 1.5;
    const f = c.createBiquadFilter(); f.type = "lowpass"; f.frequency.setValueAtTime(6000, t); f.frequency.exponentialRampToValueAtTime(300, t + decay);
    this.chain([this.noiseSource(t, decay + 0.1), f, this.env(t, peak * 0.6, 0.002, decay)], dest);
    const o = c.createOscillator();
    o.frequency.setValueAtTime(p.pitch ?? 90, t); o.frequency.exponentialRampToValueAtTime(p.pitchEnd ?? 30, t + (p.pitchTime ?? 0.6));
    this.chain([o, this.env(t, peak, 0.002, decay * 0.6)], dest);
    o.start(t); o.stop(t + decay);
  }

  private impulse(seconds: number): AudioBuffer {
    const c = this.ctx, n = Math.max(1, Math.floor(seconds * c.sampleRate)), b = c.createBuffer(2, n, c.sampleRate);
    let r = 777;
    for (let ch = 0; ch < 2; ch++) {
      const d = b.getChannelData(ch);
      for (let i = 0; i < n; i++) { r = (Math.imul(r, 1664525) + 1013904223) >>> 0; d[i] = ((r / 4294967296) * 2 - 1) * Math.pow(1 - i / n, 3); }
    }
    return b;
  }
}
