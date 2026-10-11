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

/** A seeded noise impulse decaying over `seconds`, its top rolled off by `dark` (0 bright to 1 dark), two channels. */
function impulse(ctx: BaseAudioContext, seconds: number, dark: number, seed: number): AudioBuffer {
  const n = Math.max(1, Math.floor(seconds * ctx.sampleRate)), b = ctx.createBuffer(2, n, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = b.getChannelData(ch);
    let r = (seed + ch * 7919) >>> 0 || 1, lp = 0;
    const k = 1 - 0.85 * dark;
    for (let i = 0; i < n; i++) {
      r = (Math.imul(r, 1664525) + 1013904223) >>> 0;
      lp += k * ((r / 4294967296) * 2 - 1 - lp);
      const t = i / n;
      d[i] = lp * Math.pow(1 - t, 2.2) * (t < 0.01 ? t / 0.01 : 1);
    }
  }
  return b;
}

/** A loop of one period: a ramp 0 to 1 (the delay's sweep) or a sin² window. */
function loopBuffer(ctx: BaseAudioContext, period: number, shape: "ramp" | "window"): AudioBuffer {
  const n = Math.max(2, Math.round(period * ctx.sampleRate)), b = ctx.createBuffer(1, n, ctx.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = shape === "ramp" ? 1 - i / n : Math.sin((Math.PI * i) / n) ** 2;
  return b;
}

export class VoiceFx {
  /** The voice in. */
  readonly input: GainNode;
  /** Into the reverbs only (swells). */
  readonly wetIn: GainNode;
  /** The voice out (dry and the effects). */
  readonly output: GainNode;
  private dry: GainNode;
  private chorusMix: GainNode; private satMix: GainNode; private air: BiquadFilterNode;
  private delayL: DelayNode; private delayR: DelayNode; private delayFb: GainNode; private delaySend: GainNode;
  private hallSend: GainNode; private shimmerSend: GainNode; private shimmerFb: GainNode; private freezeSend: GainNode;
  private whisperMix: GainNode;
  private wet: GainNode;
  private sources: AudioScheduledSourceNode[] = [];
  private whisperOn = false;
  s: VoiceFxSettings = { ...NO_FX };

  constructor(private ctx: BaseAudioContext, settings: Partial<VoiceFxSettings> = {}, private bpm = () => 120, duckInto?: AudioNode) {
    const c = ctx;
    this.input = c.createGain(); this.wetIn = c.createGain(); this.output = c.createGain();
    // the voice coloured: saturation and air, then on to the dry path and the sends
    const shaped = c.createGain();
    const sat = c.createWaveShaper(), curve = new Float32Array(1024);
    for (let i = 0; i < curve.length; i++) { const x = (i / (curve.length - 1)) * 2 - 1; curve[i] = Math.tanh(2.5 * x) / Math.tanh(2.5); }
    sat.curve = curve; sat.oversample = "2x";
    this.satMix = c.createGain(); this.satMix.gain.value = 0;
    this.input.connect(shaped); this.input.connect(sat).connect(this.satMix).connect(shaped);
    this.air = c.createBiquadFilter(); this.air.type = "highshelf"; this.air.frequency.value = 8000; this.air.gain.value = 0;
    shaped.connect(this.air);
    this.dry = c.createGain(); this.air.connect(this.dry).connect(this.output);
    // chorus: three short delays swept slowly out of step, mixed in
    this.chorusMix = c.createGain(); this.chorusMix.gain.value = 0;
    [[0.011, 0.31, -0.6], [0.017, 0.23, 0.6], [0.023, 0.17, 0]].forEach(([base, rate, pan]) => {
      const d = c.createDelay(0.05), lfo = c.createOscillator(), depth = c.createGain(), p = c.createStereoPanner();
      d.delayTime.value = base; lfo.frequency.value = rate; depth.gain.value = 0.004; p.pan.value = pan;
      lfo.connect(depth).connect(d.delayTime); lfo.start(); this.sources.push(lfo);
      this.air.connect(d).connect(p).connect(this.chorusMix);
    });
    this.chorusMix.connect(this.output);
    // the wet returns: into the engine's duck bus (the kick ducks them) when asked, else straight out
    this.wet = c.createGain(); this.wet.connect(duckInto ?? this.output);
    // ping-pong dotted eighths
    this.delaySend = c.createGain(); this.delaySend.gain.value = 0;
    this.delayL = c.createDelay(3); this.delayR = c.createDelay(3); this.delayFb = c.createGain(); this.delayFb.gain.value = 0.42;
    const merge = c.createChannelMerger(2), dTone = c.createBiquadFilter(); dTone.type = "lowpass"; dTone.frequency.value = 4500;
    this.air.connect(this.delaySend).connect(this.delayL);
    this.delayL.connect(this.delayR); this.delayR.connect(this.delayFb).connect(dTone).connect(this.delayL);
    this.delayL.connect(merge, 0, 0); this.delayR.connect(merge, 0, 1); merge.connect(this.wet);
    // a dark hall
    const hall = c.createConvolver(); hall.buffer = impulse(c, 5.5, 0.8, 4441);
    this.hallSend = c.createGain(); this.hallSend.gain.value = 0;
    this.air.connect(this.hallSend).connect(hall).connect(this.wet);
    this.wetIn.connect(hall);
    // shimmer: a reverb whose tail goes back through an octave-up shifter into itself
    const shimmerVerb = c.createConvolver(); shimmerVerb.buffer = impulse(c, 3.5, 0.3, 9001);
    this.shimmerSend = c.createGain(); this.shimmerSend.gain.value = 0;
    this.shimmerFb = c.createGain(); this.shimmerFb.gain.value = 0;
    const up = this.octaveUp(), shimmerOut = c.createGain(); shimmerOut.gain.value = 0.7;
    this.air.connect(this.shimmerSend).connect(shimmerVerb);
    this.wetIn.connect(shimmerVerb);
    shimmerVerb.connect(up.input); up.output.connect(this.shimmerFb).connect(shimmerVerb);
    shimmerVerb.connect(shimmerOut).connect(this.wet);
    // freeze: a moment of the voice into a very long bright reverb
    const freeze = c.createConvolver(); freeze.buffer = impulse(c, 9, 0.2, 2027);
    this.freezeSend = c.createGain(); this.freezeSend.gain.value = 0;
    this.air.connect(this.freezeSend).connect(freeze).connect(this.wet);
    // the whisper vocoder's mix (its bands built when it's given a recording)
    this.whisperMix = c.createGain(); this.whisperMix.gain.value = 0; this.whisperMix.connect(this.output);
    this.set(settings);
  }

  /** An octave-up pitch shifter: two delay taps sweeping down a 60 ms window at the speed of sound, half a period apart,
   *  each faded in and out (sin²), so their sum plays an octave up. */
  private octaveUp(): { input: GainNode; output: GainNode } {
    const c = this.ctx, P = 0.06, input = c.createGain(), output = c.createGain(), ramp = loopBuffer(c, P, "ramp"), win = loopBuffer(c, P, "window");
    for (const offset of [0, P / 2]) {
      const d = c.createDelay(0.2), g = c.createGain(), r = c.createBufferSource(), w = c.createBufferSource(), depth = c.createGain();
      d.delayTime.value = 0; g.gain.value = 0;
      r.buffer = ramp; r.loop = true; w.buffer = win; w.loop = true; depth.gain.value = P;
      r.connect(depth).connect(d.delayTime); w.connect(g.gain);
      const t = c.currentTime;
      r.start(t, offset); w.start(t, offset);
      this.sources.push(r, w);
      input.connect(d).connect(g).connect(output);
    }
    return { input, output };
  }

  /** New levels (0 to 1 each), eased in. */
  set(settings: Partial<VoiceFxSettings>): void {
    this.s = { ...this.s, ...settings };
    const s = this.s, t = this.ctx.currentTime, to = (p: AudioParam, v: number) => p.setTargetAtTime(v, t, 0.05);
    to(this.satMix.gain, 0.6 * s.saturation);
    to(this.air.gain, 9 * s.air);
    to(this.chorusMix.gain, 0.7 * s.chorus);
    to(this.delaySend.gain, 0.55 * s.delay);
    const beat = 60 / Math.max(40, this.bpm());
    this.delayL.delayTime.setTargetAtTime(0.75 * beat, t, 0.05); this.delayR.delayTime.setTargetAtTime(0.75 * beat, t, 0.05);
    to(this.hallSend.gain, 0.5 * s.hall);
    to(this.shimmerSend.gain, 0.45 * s.shimmer);
    to(this.shimmerFb.gain, 0.62 * Math.min(1, s.shimmer * 1.4));
    to(this.whisperMix.gain, 1.6 * s.whisper);
    to(this.dry.gain, 1 - 0.25 * Math.max(s.hall, s.shimmer));
    to(this.wetIn.gain, 1);
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
    if (this.s.freeze <= 0) return;
    const g = this.freezeSend.gain;
    g.setValueAtTime(0, Math.max(0, t - 0.35));
    g.linearRampToValueAtTime(0.9 * this.s.freeze, t - 0.05);
    g.linearRampToValueAtTime(0, t + 0.1);
  }

  /** The whisper vocoder: the voice through 14 bands, each band's level the recording's in it (looped from `start`). */
  whisper(rec: AudioBuffer, start = 0): void {
    if (this.whisperOn) return;
    this.whisperOn = true;
    const c = this.ctx, src = c.createBufferSource();
    src.buffer = rec; src.loop = true; src.start(Math.max(start, c.currentTime)); this.sources.push(src);
    const bands = 14, lo = 220, hi = 7500;
    for (let b = 0; b < bands; b++) {
      const f = lo * Math.pow(hi / lo, b / (bands - 1)), q = 5;
      const car = c.createBiquadFilter(), mod = c.createBiquadFilter(), env = c.createWaveShaper(), smooth = c.createBiquadFilter(), vca = c.createGain(), amt = c.createGain();
      car.type = mod.type = "bandpass"; car.frequency.value = mod.frequency.value = f; car.Q.value = mod.Q.value = q;
      const rect = new Float32Array(257); for (let i = 0; i < 257; i++) rect[i] = Math.abs(i / 128 - 1);
      env.curve = rect; smooth.type = "lowpass"; smooth.frequency.value = 35; vca.gain.value = 0; amt.gain.value = 6;
      this.air.connect(car).connect(vca).connect(this.whisperMix);
      src.connect(mod).connect(env).connect(smooth).connect(amt).connect(vca.gain);
    }
  }

  dispose(): void { for (const s of this.sources) try { s.stop(); } catch { /* stopped */ } try { this.output.disconnect(); this.wet.disconnect(); } catch { /* gone */ } }
}
