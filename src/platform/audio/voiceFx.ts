// An ethereal effects chain for a voice line (Ed, 2026-10-11: "perhaps we can use other effects on the voice line to make it
// sound more ethereal"): the FOF choir's and the recorded voices'. Every effect is a level, 0 off (the voice as it was), 1 its
// full strength; all off by default. On Web Audio's own nodes, nothing pre-rendered:
// - chorus: an ensemble of three slowly swept short delays;
// - saturation: a gentle tanh, mixed in;
// - air: a high shelf above 8 kHz;
// - delay: dotted-eighth ping-pong echoes on the beat;
// - hall: a long dark hall (a generated impulse);
// - shimmer: a reverb fed back through an octave-up pitch shifter (two crossfaded Doppler delay taps), rising and sparkling;
// - duck: the wet returns ducked by the kick (into the engine's duck bus, where there is one);
// - swells: reverse-reverb-like swells into each phrase (the source plays a note into `wetIn` with a rising envelope);
// - freeze: each phrase's end smeared into a long bright tail (a send opened for a moment into a very long reverb);
// - whisper: a channel vocoder, the voice the carrier and a whispering recording the modulator, mixed in;
// - octave: a level the sources read, doubling their notes an octave up (formants kept on the FOF voice).
// The sources tell it where phrases start and end (`phrase`, `release`).

export interface VoiceFxSettings {
  chorus: number; saturation: number; air: number; delay: number; hall: number; shimmer: number;
  duck: number; swells: number; freeze: number; whisper: number; octave: number;
}
export const VOICE_FX: (keyof VoiceFxSettings)[] = ["chorus", "saturation", "air", "delay", "hall", "shimmer", "duck", "swells", "freeze", "whisper", "octave"];
export const NO_FX: VoiceFxSettings = { chorus: 0, saturation: 0, air: 0, delay: 0, hall: 0, shimmer: 0, duck: 0, swells: 0, freeze: 0, whisper: 0, octave: 0 };
/** Whether any effect is on. */
export const fxOn = (s: Partial<VoiceFxSettings> | undefined): boolean => !!s && VOICE_FX.some(k => (s[k] ?? 0) > 0);

/** A seeded noise impulse decaying over `seconds`, its top rolled off by `dark` (0 bright to 1 dark), two channels. Made once a
 *  context for each length, darkness and seed and shared (a buffer can feed any number of convolvers), its envelope from a table of
 *  ENV steps rather than a Math.pow a sample: the hall's 5.5 s and the shimmer's 3.5 s were about 190 ms on the page's thread the
 *  first time the sung part played (the stall hunt, 2026-10-13); about a tenth of that now, once. */
const IMPULSES = new WeakMap<BaseAudioContext, Map<string, AudioBuffer>>();
const ENV = 4096;
function impulse(ctx: BaseAudioContext, seconds: number, dark: number, seed: number): AudioBuffer {
  let made = IMPULSES.get(ctx); if (!made) IMPULSES.set(ctx, made = new Map());
  const key = `${seconds}|${dark}|${seed}`, had = made.get(key); if (had) return had;
  const n = Math.max(1, Math.floor(seconds * ctx.sampleRate)), b = ctx.createBuffer(2, n, ctx.sampleRate);
  const env = new Float32Array(ENV + 1); for (let j = 0; j <= ENV; j++) env[j] = Math.pow(1 - j / ENV, 2.2);
  const ramp = Math.max(1, Math.floor(n * 0.01)), perSample = ENV / n;
  for (let ch = 0; ch < 2; ch++) {
    const d = b.getChannelData(ch);
    let r = (seed + ch * 7919) >>> 0 || 1, lp = 0;
    const k = 1 - 0.85 * dark;
    for (let i = 0; i < n; i++) {
      r = (Math.imul(r, 1664525) + 1013904223) >>> 0;
      lp += k * ((r / 4294967296) * 2 - 1 - lp);
      d[i] = lp * env[Math.floor(i * perSample)] * (i < ramp ? i / ramp : 1);
    }
  }
  made.set(key, b);
  return b;
}

/** A loop of one period: a ramp 0 to 1 (the delay's sweep) or a sin² window. */
function loopBuffer(ctx: BaseAudioContext, period: number, shape: "ramp" | "window"): AudioBuffer {
  const n = Math.max(2, Math.round(period * ctx.sampleRate)), b = ctx.createBuffer(1, n, ctx.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = shape === "ramp" ? 1 - i / n : Math.sin((Math.PI * i) / n) ** 2;
  return b;
}

/** The vocoder's bands (Hz) and their Q. */
const BANDS = Array.from({ length: 14 }, (_, b) => 220 * Math.pow(7500 / 220, b / 13)), BAND_Q = 5;
const ENVELOPES = new WeakMap<AudioBuffer, AudioBuffer>();
/** A recording's level in each vocoder band, as the live chain had it (a band-pass, rectified, smoothed at 35 Hz, times 6),
 *  a channel a band at 3 kHz (the lowest rate a buffer can have), worked out once a recording. */
export function whisperEnvelopes(ctx: BaseAudioContext, rec: AudioBuffer): AudioBuffer {
  const have = ENVELOPES.get(rec);
  if (have) return have;
  const sr = rec.sampleRate, n = rec.length, mono = new Float32Array(n);
  for (let ch = 0; ch < rec.numberOfChannels; ch++) { const d = rec.getChannelData(ch); for (let i = 0; i < n; i++) mono[i] += d[i] / rec.numberOfChannels; }
  const OUT = 3000, step = sr / OUT, m = Math.max(1, Math.floor(n / step)), out = ctx.createBuffer(BANDS.length, m, OUT);
  const lp = 1 - Math.exp((-2 * Math.PI * 35) / sr);
  BANDS.forEach((f, b) => {
    // RBJ band-pass (constant 0 dB peak), as a BiquadFilterNode's
    const w = (2 * Math.PI * f) / sr, al = Math.sin(w) / (2 * BAND_Q), a0 = 1 + al;
    const b0 = al / a0, b2 = -al / a0, a1 = (-2 * Math.cos(w)) / a0, a2 = (1 - al) / a0;
    let x1 = 0, x2 = 0, y1 = 0, y2 = 0, e = 0, k = 0;
    const d = out.getChannelData(b);
    for (let i = 0; i < n; i++) {
      const x = mono[i], y = b0 * x + b2 * x2 - a1 * y1 - a2 * y2;
      x2 = x1; x1 = x; y2 = y1; y1 = y;
      e += lp * (Math.abs(y) - e);
      if (i >= k * step && k < m) d[k++] = 6 * e;
    }
  });
  ENVELOPES.set(rec, out);
  return out;
}

export class VoiceFx {
  /** The voice in. */
  readonly input: GainNode;
  /** Into the reverbs only (swells). */
  readonly wetIn: GainNode;
  /** The voice out (dry and the effects). */
  readonly output: GainNode;
  private dry: GainNode;
  private air: BiquadFilterNode;
  /** The wet returns (into the duck bus, when there is one). */
  private wet: GainNode;
  // Each effect is built the first time its level is above 0 (Ed's playtest, 2026-10-12: "the sound is cutting out": every
  // effect built and running at once, even at 0, cost a ninth of the audio thread; built only when heard, nothing at 0), and
  // let go again for good when the sound is shed (shed.ts).
  private sat?: { mix: GainNode; nodes: AudioNode[] };
  private chorus?: { mix: GainNode; nodes: AudioNode[] };
  private delay?: { send: GainNode; l: DelayNode; r: DelayNode; nodes: AudioNode[] };
  private hall?: { send: GainNode; conv: ConvolverNode; nodes: AudioNode[] };
  private shimmer?: { send: GainNode; fb: GainNode; conv: ConvolverNode; nodes: AudioNode[] };
  private freeze?: { send: GainNode; nodes: AudioNode[] };
  private whisperRig?: { mix: GainNode; nodes: AudioNode[] };
  private whisperRec: { rec: AudioBuffer; start: number } | null = null;
  private sources: AudioScheduledSourceNode[] = [];
  /** What the sound shed has taken (shed.ts): 1 the vocoder and the freeze, 2 the shimmer and the chorus, 3 the hall and the
   *  echoes; none of it comes back within a load. */
  private shedStep = 0;
  s: VoiceFxSettings = { ...NO_FX };

  constructor(private ctx: BaseAudioContext, settings: Partial<VoiceFxSettings> = {}, private bpm = () => 120, duckInto?: AudioNode) {
    const c = ctx;
    this.input = c.createGain(); this.wetIn = c.createGain(); this.output = c.createGain();
    // the voice coloured: air, then on to the dry path and the sends
    this.air = c.createBiquadFilter(); this.air.type = "highshelf"; this.air.frequency.value = 8000; this.air.gain.value = 0;
    this.input.connect(this.air);
    this.dry = c.createGain(); this.air.connect(this.dry).connect(this.output);
    // the wet returns: into the engine's duck bus (the kick ducks them) when asked, else straight out
    this.wet = c.createGain(); this.wet.connect(duckInto ?? this.output);
    this.set(settings);
  }

  /** Saturation: a gentle tanh beside the input, mixed in. */
  private buildSat(): NonNullable<VoiceFx["sat"]> {
    const c = this.ctx, sat = c.createWaveShaper(), curve = new Float32Array(1024), mix = c.createGain();
    for (let i = 0; i < curve.length; i++) { const x = (i / (curve.length - 1)) * 2 - 1; curve[i] = Math.tanh(2.5 * x) / Math.tanh(2.5); }
    sat.curve = curve; mix.gain.value = 0;
    this.input.connect(sat).connect(mix).connect(this.air);
    return { mix, nodes: [sat, mix] };
  }
  /** Chorus: three short delays swept slowly out of step. */
  private buildChorus(): NonNullable<VoiceFx["chorus"]> {
    const c = this.ctx, mix = c.createGain(), nodes: AudioNode[] = [mix];
    mix.gain.value = 0;
    [[0.011, 0.31, -0.6], [0.017, 0.23, 0.6], [0.023, 0.17, 0]].forEach(([base, rate, pan]) => {
      const d = c.createDelay(0.05), lfo = c.createOscillator(), depth = c.createGain(), p = c.createStereoPanner();
      d.delayTime.value = base; lfo.frequency.value = rate; depth.gain.value = 0.004; p.pan.value = pan;
      lfo.connect(depth).connect(d.delayTime); lfo.start(); this.sources.push(lfo);
      this.air.connect(d).connect(p).connect(mix);
      nodes.push(d, lfo, depth, p);
    });
    mix.connect(this.output);
    return { mix, nodes };
  }
  /** Ping-pong dotted eighths. */
  private buildDelay(): NonNullable<VoiceFx["delay"]> {
    const c = this.ctx, send = c.createGain(), l = c.createDelay(3), r = c.createDelay(3), fb = c.createGain();
    send.gain.value = 0; fb.gain.value = 0.42;
    const merge = c.createChannelMerger(2), tone = c.createBiquadFilter(); tone.type = "lowpass"; tone.frequency.value = 4500;
    this.air.connect(send).connect(l);
    l.connect(r); r.connect(fb).connect(tone).connect(l);
    l.connect(merge, 0, 0); r.connect(merge, 0, 1); merge.connect(this.wet);
    return { send, l, r, nodes: [send, l, r, fb, merge, tone] };
  }
  /** A dark hall (the swells go into it too). */
  private buildHall(): NonNullable<VoiceFx["hall"]> {
    const c = this.ctx, conv = c.createConvolver(), send = c.createGain();
    conv.buffer = impulse(c, 5.5, 0.8, 4441); send.gain.value = 0;
    this.air.connect(send).connect(conv).connect(this.wet);
    this.wetIn.connect(conv);
    return { send, conv, nodes: [send, conv] };
  }
  /** Shimmer: a reverb whose tail goes back through an octave-up shifter into itself (the swells go into it too). */
  private buildShimmer(): NonNullable<VoiceFx["shimmer"]> {
    const c = this.ctx, conv = c.createConvolver(), send = c.createGain(), fb = c.createGain(), out = c.createGain();
    conv.buffer = impulse(c, 3.5, 0.3, 9001); send.gain.value = 0; fb.gain.value = 0; out.gain.value = 0.7;
    const up = this.octaveUp();
    this.air.connect(send).connect(conv);
    this.wetIn.connect(conv);
    conv.connect(up.input); up.output.connect(fb).connect(conv);
    conv.connect(out).connect(this.wet);
    return { send, fb, conv, nodes: [send, conv, fb, out, up.input, up.output, ...up.nodes] };
  }
  /** Freeze: a moment of the voice at each phrase's end sent into the hall (its own 9 s reverb, once, cost the audio thread
   *  as much as every other effect together: Ed's playtest, 2026-10-12). */
  private buildFreeze(): NonNullable<VoiceFx["freeze"]> {
    const c = this.ctx, send = c.createGain(), hall = (this.hall ??= this.buildHall());
    send.gain.value = 0;
    this.air.connect(send).connect(hall.conv);
    return { send, nodes: [send] };
  }

  /** An octave-up pitch shifter: two delay taps sweeping down a 60 ms window at the speed of sound, half a period apart,
   *  each faded in and out (sin²), so their sum plays an octave up. */
  private octaveUp(): { input: GainNode; output: GainNode; nodes: AudioNode[] } {
    const c = this.ctx, P = 0.06, input = c.createGain(), output = c.createGain(), ramp = loopBuffer(c, P, "ramp"), win = loopBuffer(c, P, "window"), nodes: AudioNode[] = [];
    for (const offset of [0, P / 2]) {
      const d = c.createDelay(0.2), g = c.createGain(), r = c.createBufferSource(), w = c.createBufferSource(), depth = c.createGain();
      d.delayTime.value = 0; g.gain.value = 0;
      r.buffer = ramp; r.loop = true; w.buffer = win; w.loop = true; depth.gain.value = P;
      r.connect(depth).connect(d.delayTime); w.connect(g.gain);
      const t = c.currentTime;
      r.start(t, offset); w.start(t, offset);
      this.sources.push(r, w);
      input.connect(d).connect(g).connect(output);
      nodes.push(d, g, r, w, depth);
    }
    return { input, output, nodes };
  }

  /** New levels (0 to 1 each), eased in; an effect is built the first time its level is above 0 (and not shed). */
  set(settings: Partial<VoiceFxSettings>): void {
    this.s = { ...this.s, ...settings };
    const s = this.s, t = this.ctx.currentTime, to = (p: AudioParam, v: number) => p.setTargetAtTime(v, t, 0.05), shed = this.shedStep;
    if (s.saturation > 0) to((this.sat ??= this.buildSat()).mix.gain, 0.6 * s.saturation);
    else if (this.sat) to(this.sat.mix.gain, 0);
    to(this.air.gain, 9 * s.air);
    if (s.chorus > 0 && shed < 2) to((this.chorus ??= this.buildChorus()).mix.gain, 0.7 * s.chorus);
    else if (this.chorus) to(this.chorus.mix.gain, 0);
    if (s.delay > 0 && shed < 3) {
      const d = (this.delay ??= this.buildDelay()), beat = 60 / Math.max(40, this.bpm());
      to(d.send.gain, 0.55 * s.delay);
      d.l.delayTime.setTargetAtTime(0.75 * beat, t, 0.05); d.r.delayTime.setTargetAtTime(0.75 * beat, t, 0.05);
    } else if (this.delay) to(this.delay.send.gain, 0);
    if ((s.hall > 0 || s.swells > 0 || s.freeze > 0) && shed < 3) to((this.hall ??= this.buildHall()).send.gain, 0.5 * s.hall);
    else if (this.hall) to(this.hall.send.gain, 0);
    if ((s.shimmer > 0 || (s.swells > 0 && !this.hall)) && shed < 2) {
      const sh = (this.shimmer ??= this.buildShimmer());
      to(sh.send.gain, 0.45 * s.shimmer); to(sh.fb.gain, 0.62 * Math.min(1, s.shimmer * 1.4));
    } else if (this.shimmer) { to(this.shimmer.send.gain, 0); to(this.shimmer.fb.gain, 0); }
    if (s.freeze > 0 && shed < 1 && (this.hall || shed < 3)) this.freeze ??= this.buildFreeze();
    if (s.whisper > 0 && shed < 1 && this.whisperRec) this.buildWhisper();
    if (this.whisperRig) to(this.whisperRig.mix.gain, 1.6 * s.whisper);
    to(this.dry.gain, 1 - 0.25 * Math.max(s.hall, s.shimmer));
    to(this.wetIn.gain, 1);
  }

  /** The sound shed a step (shed.ts; never back within a load): 1 the vocoder and the freeze let go, 2 the shimmer and the
   *  chorus, 3 the hall and the echoes: the voice drier, the audio thread lighter. */
  shedTo(step: number): void {
    if (step <= this.shedStep) return;
    this.shedStep = step;
    const drop = (x: { nodes: AudioNode[] } | undefined) => { if (!x) return; for (const n of x.nodes) { try { (n as AudioScheduledSourceNode).stop?.(); } catch { /* stopped */ } try { n.disconnect(); } catch { /* gone */ } } };
    if (step >= 1) { drop(this.whisperRig); this.whisperRig = undefined; drop(this.freeze); this.freeze = undefined; }
    if (step >= 2) { drop(this.shimmer); this.shimmer = undefined; drop(this.chorus); this.chorus = undefined; }
    if (step >= 3) { drop(this.hall); this.hall = undefined; drop(this.delay); this.delay = undefined; }
    this.set({});
  }

  /** A phrase begins at `t` (a voice's first note after a rest): a swell rises into it if asked (the source plays it into
   *  `wetIn`; this gives its envelope: from `t - len` rising, cut at `t`). */
  swellEnvelope(g: GainNode, t: number, len: number, peak: number): void {
    g.gain.setValueAtTime(0.0001, Math.max(0, t - len));
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak * this.s.swells), t - 0.02);
    g.gain.linearRampToValueAtTime(0, t);
  }

  /** A phrase ends at `t` (its last note's release): its end smeared into the long reverb, if asked. */
  release(t: number): void {
    if (this.s.freeze <= 0 || !this.freeze) return;
    const g = this.freeze.send.gain;
    g.setValueAtTime(0, Math.max(0, t - 0.35));
    g.linearRampToValueAtTime(0.9 * this.s.freeze, t - 0.05);
    g.linearRampToValueAtTime(0, t + 0.1);
  }

  /** The whisper vocoder's recording (looped from `start`): the vocoder built once its level is above 0. */
  whisper(rec: AudioBuffer, start = 0): void {
    if (this.whisperRec) return;
    this.whisperRec = { rec, start };
    if (this.s.whisper > 0 && this.shedStep < 1) { this.buildWhisper(); this.set({}); }
  }

  /** The whisper vocoder: the voice through 14 bands, each band's level the recording's in it there. The recording never
   *  changes, so its bands' levels are worked out once here (whisperEnvelopes) and played as one looped buffer, a channel a
   *  band: 14 filters on the audio thread, not 42 and 14 rectifiers (Ed's playtest, 2026-10-12). */
  private buildWhisper(): void {
    if (this.whisperRig || !this.whisperRec) return;
    const c = this.ctx, env = whisperEnvelopes(c, this.whisperRec.rec), src = c.createBufferSource(), split = c.createChannelSplitter(BANDS.length), mix = c.createGain(), nodes: AudioNode[] = [src, split, mix];
    mix.gain.value = 0; mix.connect(this.output);
    src.buffer = env; src.loop = true; src.connect(split); src.start(Math.max(this.whisperRec.start, c.currentTime)); this.sources.push(src);
    BANDS.forEach((f, b) => {
      const car = c.createBiquadFilter(), vca = c.createGain();
      car.type = "bandpass"; car.frequency.value = f; car.Q.value = BAND_Q; vca.gain.value = 0;
      this.air.connect(car).connect(vca).connect(mix);
      split.connect(vca.gain, b);
      nodes.push(car, vca);
    });
    this.whisperRig = { mix, nodes };
  }

  dispose(): void { for (const s of this.sources) try { s.stop(); } catch { /* stopped */ } try { this.output.disconnect(); this.wet.disconnect(); this.input.disconnect(); } catch { /* gone */ } }
}
