// The music engine (Ed, 2026-10-04: generative music, in code): plays the score
// (rules/musicScore.ts) from the conductor's sections (rules/musicPlan.ts) with Web Audio, every
// sound synthesised (no samples). Each frame it schedules the sixteenths of the next fraction of a
// second on the audio clock, on the game's beat clock (rules/beat.ts: step 0 is game time 0, the
// tempo rising wave by wave). Two outputs: the music, which Music (platform/music.ts) puts through
// the proximity mix (the Music Lab plays it straight); and a sleeping legend's clearing layer
// (Ed, 2026-10-06), its own reverb and limiter, which Music plays over the muffle.
// The parts share a reverb (a generated impulse, pre-delayed, its tail darkening), a dotted delay
// and the kick's duck (the pump), then the section's low-pass (sweeps in builds, half shut in
// breakdowns) and a gentle limiter. Each part has its own channel: a high-pass to keep the low end
// to the kick and bass, and a place in the stereo field. Sound design after common practice: the
// kick a pitched sine with a click; hats the 808's six square tones through band- and high-pass;
// supersaws as unison voices detuned and spread wide; pads breathing with a slow filter LFO.
import { beatAt, bpmAt, timeAt, type BeatClock } from "../../rules/beat";
import { Conductor, bootLayers, type MusicCue } from "../../rules/musicPlan";
import { mtof, noiseBuffer } from "./dsp";
import { notesAt, resolveSection, sectionCutoff, type BlockPlan, type MusicStyle, type NoteEvent, type Patch } from "../../rules/musicScore";

interface Channel { in: GainNode; lastFreq: number }

/** Vowels for the synthesised voice: three formants each (Hz) and their levels. */
const VOWELS: Record<string, [number, number][]> = {
  ah: [[800, 1], [1150, 0.6], [2900, 0.25]],
  oh: [[450, 1], [800, 0.5], [2830, 0.15]],
  oo: [[325, 1], [700, 0.3], [2530, 0.1]],
  eh: [[530, 1], [1840, 0.5], [2480, 0.3]],
  ee: [[270, 1], [2290, 0.45], [3010, 0.35]],
};

/** The 808's hi-hat and cymbal tones: six square waves at these ratios of a 40 Hz fundamental. */
const METAL_RATIOS = [2, 3, 4.16, 5.43, 6.79, 8.21];

export class MusicEngine {
  readonly conductor: Conductor;
  /** What was last scheduled (a fraction of a second ahead of what's heard): for the Music Lab. */
  current: { plan: BlockPlan; bar: number; step: number } | null = null;
  /** Only these parts sound (the Music Lab's analysis); null: all. */
  solo: Set<string> | null = null;
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
  private metal: AudioBuffer;
  private channels = new Map<string, Channel>();
  /** A legend's clearing layer: its parts' channels feed this, with its own reverb, to `circleDest`. */
  private circleIn: GainNode;
  private circleVerbIn: GainNode;
  private circleVerb: ConvolverNode;
  private curves = new Map<number, Float32Array<ArrayBuffer>>();
  private nextStep = -1;
  /** The last step scheduled: a re-anchoring never schedules it again (round 13: the game running
   *  slower than the audio, every frame re-anchored, had each note scheduled several times over). */
  private lastStep = -Infinity;
  /** Game time as the music hears it (Ed, 2026-10-06: inside a legend's circle the world, the
   *  music and the countdown slow to about a tenth): game time g0 at audio time a0, running at
   *  `rate` game seconds an audio second (the game's time scale). */
  private g0 = NaN;
  private a0 = 0;
  private rate = 1;
  /** Continuity, for the checks (tools/music-lab/flight.cjs) and the playtest log: times the timeline was re-anchored,
   *  sixteenths a stall made late (held and played, not dropped), audio seconds left with nothing scheduled between one
   *  sixteenth and the next, and how far ahead it schedules now (s). */
  readonly stats = { resyncs: 0, late: 0, gap: 0, ahead: 0 };
  private heardTo = -1;
  private lastNow = -1;
  /** How much faster or slower than the game the music may run while easing back into step (a share). */
  static slew = 0.05;
  /** After a long frame it schedules further ahead (a stall that long may come again: the art baking, a new place's first
   *  frames), up to `maxAhead` seconds, easing back down by `aheadEase` seconds a second (Ed, round 16: "Music is still
   *  starting and stopping unexpectedly"). */
  static maxAhead = 2;
  static aheadEase = 0.05;
  private lagAhead = 0;
  /** Notes' pitch now (the tape slowing with the music: 1 at full speed). */
  private pitch = 1;
  /** The note being played's pitch (the circle's layer never slowed). */
  private notePitch = 1;
  /** A legend's circle's layer, at full speed whatever the music's rate: its next step and that
   *  step's audio time (-1: not playing; it starts in step with the music). */
  private cNext = -1;
  private cAt = 0;
  private reverbTime = 0;
  /** Sound shed to spare the audio thread (shed.ts; Ed's under-runs, 2026-10-07): 2+ every synth and sung note one
   *  oscillator (no unison, its first wave only) and shorter tails; 3 the reverbs short and the delay off. */
  private shedLevel = 0;
  get shed(): number { return this.shedLevel; }
  set shed(level: number) {
    if (level === this.shedLevel) return;
    const was = this.shedLevel; this.shedLevel = level;
    if ((was >= 3) !== (level >= 3)) { this.reverbTime = -1; this.setMix(); }
  }

  constructor(private ctx: BaseAudioContext, dest: AudioNode, public style: MusicStyle, public seed = 0, circleDest: AudioNode = dest) {
    this.conductor = new Conductor(style);
    const c = ctx;
    this.out = c.createGain();
    const limit = c.createDynamicsCompressor();
    limit.threshold.value = -8; limit.knee.value = 4; limit.ratio.value = 12; limit.attack.value = 0.002; limit.release.value = 0.15;
    this.tone = c.createBiquadFilter(); this.tone.type = "lowpass"; this.tone.frequency.value = 18000; this.tone.Q.value = 0.9;
    this.duckBus = c.createGain(); this.dryBus = c.createGain();
    this.reverb = c.createConvolver(); this.reverbIn = c.createGain();
    this.delay = c.createDelay(4); this.delayIn = c.createGain(); this.feedback = c.createGain();
    const delayTone = c.createBiquadFilter(); delayTone.type = "lowpass"; delayTone.frequency.value = 3200;
    // parts -> (duck | dry) + reverb + delay -> section low-pass -> limiter -> out
    this.duckBus.connect(this.tone); this.dryBus.connect(this.tone);
    // the reverb's return, its lows cut so the tails don't muddy the kick and bass
    const reverbLow = c.createBiquadFilter(); reverbLow.type = "highpass"; reverbLow.frequency.value = 220;
    this.reverbIn.connect(this.reverb); this.reverb.connect(reverbLow); reverbLow.connect(this.tone);
    this.delayIn.connect(this.delay); this.delay.connect(delayTone); delayTone.connect(this.feedback); this.feedback.connect(this.delay); delayTone.connect(this.tone);
    this.tone.connect(limit); limit.connect(this.out); this.out.connect(dest);
    // the legend's clearing layer: not through the section's low-pass, its own reverb and a limiter
    this.circleIn = c.createGain(); this.circleVerbIn = c.createGain(); this.circleVerb = c.createConvolver();
    const circleLimit = c.createDynamicsCompressor();
    circleLimit.threshold.value = -10; circleLimit.knee.value = 6; circleLimit.ratio.value = 8; circleLimit.attack.value = 0.005; circleLimit.release.value = 0.3;
    this.circleVerbIn.connect(this.circleVerb); this.circleVerb.connect(this.circleIn);
    this.circleIn.connect(circleLimit); circleLimit.connect(circleDest);
    this.noise = noiseBuffer(c, 2, 22222);
    this.metal = c.createBuffer(1, 2 * c.sampleRate, c.sampleRate);
    const m = this.metal.getChannelData(0), phase = METAL_RATIOS.map((_, i) => i * 0.37);
    for (let i = 0; i < m.length; i++) {
      let v = 0;
      for (let k = 0; k < METAL_RATIOS.length; k++) v += ((40 * METAL_RATIOS[k] * i) / c.sampleRate + phase[k]) % 1 < 0.5 ? 1 : -1;
      m[i] = v / METAL_RATIOS.length;
    }
    // tilt it bright (twice differenced) and bring it to full scale: the 808 keeps only the top of these tones
    let peak = 0, a = 0, b = 0;
    for (let i = 0; i < m.length; i++) { const x = m[i], d1 = x - a; a = x; const d2 = d1 - b; b = d1; m[i] = d2; peak = Math.max(peak, Math.abs(d2)); }
    for (let i = 0; i < m.length; i++) m[i] /= peak || 1;
    this.setStyle(style);
  }

  /** A new or edited style: takes effect from the next block. */
  setStyle(style: MusicStyle): void {
    this.style = style;
    this.conductor.reset(style);
    this.setMix();
    this.channels.clear();
  }

  /** The style's mix on the buses (shed 3: the reverbs cut short, the delay off). */
  private setMix(): void {
    const m = this.style.mix, lite = this.shedLevel >= 3, time = lite ? Math.min(0.7, m.reverbTime) : m.reverbTime;
    this.out.gain.value = m.master;
    this.reverbIn.gain.value = m.reverb;
    this.delayIn.gain.value = lite ? 0 : m.delay;
    this.feedback.gain.value = lite ? 0 : Math.min(0.85, m.feedback);
    if (time !== this.reverbTime) { this.reverbTime = time; this.reverb.buffer = this.impulse(time); this.circleVerb.buffer = this.impulse(time * 1.6); }
  }

  /** Each frame: schedule what's due in the next `ahead` seconds of audio time, at game time
   *  `gameTime` (seconds) on the beat clock `clock`. `playing` false: nothing new is scheduled. */
  update(cue: MusicCue, gameTime: number, clock: BeatClock, playing: boolean, ahead = 0.6, rate = 1, pitch = 1): void {
    const now = this.ctx.currentTime, stepNow = beatAt(clock, gameTime) * 4;
    if (!playing) { this.nextStep = -1; this.cNext = -1; this.heardTo = -1; this.lastNow = -1; return; }
    // Game time as heard: running on from where it was at the old rate, then at the new one (the
    // world slowing in a legend's circle). The music never waits for the game (Ed's playtest, 2026-10-06:
    // "The music cuts in and out a lot": a frame over the rules' MAX_STEP loses game time, and re-anchoring
    // on it left a silence at every hitch): it plays on and is eased back into step, never more than
    // `slew` faster or slower, so the frames' jitter and the hitches never reach the notes. Only a real
    // jump (game time going back, a pause, a new run, far out of step) starts it afresh.
    rate = Math.max(0.01, rate);
    if (rate !== this.rate) { if (Number.isFinite(this.g0)) { this.g0 += (now - this.a0) * this.rate; this.a0 = now; } this.rate = rate; }
    this.pitch = pitch;
    const dtA = this.lastNow < 0 ? 0 : Math.max(0, now - this.lastNow);
    this.lastNow = now;
    this.lagAhead = Math.min(MusicEngine.maxAhead, Math.max(dtA * 1.5, this.lagAhead - dtA * MusicEngine.aheadEase));
    ahead = Math.max(ahead, this.lagAhead);
    this.stats.ahead = ahead;
    const err = gameTime - (this.g0 + (now - this.a0) * rate), slew = MusicEngine.slew * Math.min(dtA, 0.05) * rate; // (a long frame no bigger a nudge than an ordinary one)
    if (!Number.isFinite(err) || err > 0.25 * rate) { if (Number.isFinite(this.g0)) this.stats.resyncs++; this.g0 = gameTime; this.a0 = now; this.nextStep = -1; }
    else if (err < -6 * rate) { this.g0 += err + 6 * rate; this.stats.resyncs++; } // (a game running far slower than its audio for long: the music waits, never more than 6 s ahead)
    else this.g0 += Math.max(-slew, Math.min(slew, err * 0.05));
    const audioAt = (g: number) => this.a0 + (g - this.g0) / rate;
    if (this.nextStep < 0 || this.nextStep < stepNow - 1 || this.nextStep > stepNow + 64) {
      this.nextStep = Math.ceil(stepNow);
      // (not what's already scheduled, unless time went back: a new run, a jump)
      if (this.lastStep < stepNow + 64 && this.lastStep >= stepNow - 64) this.nextStep = Math.max(this.nextStep, this.lastStep + 1);
    }
    this.delay.delayTime.setTargetAtTime(Math.min(4, (this.style.mix.delayBeats * 60) / bpmAt(clock, gameTime) / rate), now, 0.05);
    // A frame longer than what was scheduled ahead: the next sixteenth is already late. Played now rather than
    // dropped: the music held for the hitch, then on from where it was (the slew takes it back into step).
    if (this.heardTo >= 0 && this.nextStep >= 0) { const t = audioAt(timeAt(clock, this.nextStep / 4)); if (t < now) { this.a0 += now + 0.005 - t; this.stats.late++; } }
    for (;;) {
      const g = timeAt(clock, this.nextStep / 4), t = this.a0 + (g - this.g0) / rate;
      if (t >= now + ahead) break;
      if (t >= now) {
        const sps = 60 / bpmAt(clock, g) / 4 / rate;
        if (this.heardTo >= 0 && t > this.heardTo + 0.02) this.stats.gap += t - this.heardTo;
        this.heardTo = t + sps;
        this.step(cue, this.nextStep, t, sps); this.lastStep = this.nextStep;
      }
      this.nextStep++;
    }
    // A legend's circle's layer: its own time, at the music's tempo as if never slowed (the circle's
    // own time, over the slowed world), starting in step with the music, its chords the music's.
    if (!cue.circle) { this.cNext = -1; return; }
    const sps = 60 / bpmAt(clock, gameTime) / 4;
    if (this.cNext < 0 || this.cAt < now - 1 || this.cAt > now + 2) { this.cNext = this.nextStep; this.cAt = Math.max(now, audioAt(timeAt(clock, this.nextStep / 4))); }
    while (this.cAt < now + ahead) {
      if (this.cAt >= now) {
        const main = Math.floor(beatAt(clock, this.g0 + (this.cAt - this.a0) * rate) * 4), plan = this.conductor.plan(cue, Math.floor(main / 16));
        const events = notesAt(this.style, plan, null, main, { seed: this.seed, siege: 0, circle: cue.circle, only: "circle", circleStep: this.cNext });
        const swing = this.cNext % 2 === 1 ? this.style.swing * sps : 0;
        for (const e of events) this.play(e, this.cAt + swing + e.offset * sps, e.dur * sps, sps);
      }
      this.cNext++; this.cAt += sps;
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
  reset(): void { this.nextStep = -1; this.lastStep = -Infinity; this.conductor.reset(); }

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
      // (while the speakers boot, the low-pass opens with them rather than over the block)
      const b0 = bootLayers(cue, bar), b1 = bootLayers(cue, bar + 1);
      const boot = cue.speakerBars !== undefined && plan.section === S.intro;
      const f0 = sectionCutoff(sec, boot ? b0 : barIn / plan.bars), f1 = sectionCutoff(sec, boot ? b1 : (barIn + 1) / plan.bars);
      this.tone.frequency.setValueAtTime(f0, t);
      if (f1 !== f0) this.tone.frequency.exponentialRampToValueAtTime(f1, t + 16 * sps);
    }
    const events = notesAt(S, plan, next, step, { seed: this.seed, siege: cue.siege, party: cue.party, legend: cue.legend, only: "main", build: cue.speakerBars !== undefined ? bootLayers(cue, bar) : undefined });
    const swing = step % 2 === 1 ? S.swing * sps : 0;
    for (const e of events) this.play(e, t + swing + e.offset * sps, e.dur * sps, sps);
  }

  private channel(part: string, p: Patch, circle = false): Channel {
    const key = circle ? `circle:${part}` : part;
    let ch = this.channels.get(key);
    if (!ch) {
      const c = this.ctx, g = c.createGain();
      let out: AudioNode = g;
      if (p.hp) { const f = c.createBiquadFilter(); f.type = "highpass"; f.frequency.value = p.hp; f.Q.value = 0.7; out.connect(f); out = f; }
      if (p.pan) { const s = c.createStereoPanner(); s.pan.value = p.pan; out.connect(s); out = s; }
      // (a legend's clearing layer into its own bus and reverb, over the muffle; the rest into the mix)
      out.connect(circle ? this.circleIn : p.duck ? this.duckBus : this.dryBus);
      if (p.reverb) { const r = c.createGain(); r.gain.value = p.reverb; out.connect(r); r.connect(circle ? this.circleVerbIn : this.reverbIn); }
      if (p.delay && !circle) { const d = c.createGain(); d.gain.value = p.delay; out.connect(d); d.connect(this.delayIn); }
      this.channels.set(key, ch = { in: g, lastFreq: 0 });
    }
    return ch;
  }

  private play(e: NoteEvent, t: number, dur: number, sps: number): void {
    const p = this.style.patches[e.patch];
    if (!p || (this.solo && !this.solo.has(e.part))) return;
    const ch = this.channel(e.part, p, e.layer === "circle"), peak = p.gain * e.vel;
    const pf = (this.notePitch = e.layer === "circle" ? 1 : this.pitch); // (the tape slowing: the circle's own layer never)
    switch (p.kind) {
      case "kick": this.kick(t, pf === 1 ? p : { ...p, pitch: (p.pitch ?? 150) * pf, pitchEnd: (p.pitchEnd ?? 45) * pf }, peak, ch.in); this.duck(t, e.vel, sps); break;
      case "noise": this.noiseHit(t, p, peak, ch.in); break;
      case "snare": this.snare(t, p, peak, ch.in); break;
      case "bell": this.bell(t, p, peak, mtof(e.midi ?? 69) * pf, ch.in); break;
      case "synth": this.synth(t, p, peak, mtof(e.midi ?? 45) * pf, dur, ch); break;
      case "voice": this.voice(t, p, peak, mtof(e.midi ?? 57) * pf, dur, e.step, ch.in); break;
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
    // the body: a sine falling fast from a punch to its fundamental, holding a little then dying
    const c = this.ctx, o = c.createOscillator(), decay = p.decay ?? 0.35;
    o.frequency.setValueAtTime(p.pitch ?? 150, t);
    o.frequency.exponentialRampToValueAtTime(p.pitchEnd ?? 45, t + (p.pitchTime ?? 0.08));
    const g = c.createGain();
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + 0.002);
    g.gain.setTargetAtTime(peak * 0.6, t + 0.01, decay * 0.25);
    g.gain.setTargetAtTime(0, t + decay * 0.5, decay * 0.18);
    this.chain(p.drive ? [o, this.shaper(p.drive), g] : [o, g], dest);
    o.start(t); o.stop(t + decay * 1.3 + 0.05);
    // the click: a few milliseconds of bright noise for the beater, so it cuts through on small speakers
    if (p.click) {
      const f = c.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = 3500; f.Q.value = 0.8;
      this.chain([this.noiseSource(t, 0.03), f, this.env(t, peak * p.click, 0.0005, 0.012)], dest);
    }
  }

  private noiseSource(t: number, length: number, metal = false): AudioBufferSourceNode {
    const s = this.ctx.createBufferSource();
    s.buffer = metal ? this.metal : this.noise;
    s.loop = length > 1.5;
    if (this.notePitch !== 1) s.playbackRate.value = this.notePitch; // (the tape slowing: hats and snares drop too)
    s.start(t, ((t * 7.31) % 1) * 0.5);
    s.stop(t + length);
    return s;
  }

  private noiseHit(t: number, p: Patch, peak: number, dest: AudioNode): void {
    const c = this.ctx, decay = p.decay ?? 0.05, bursts = p.bursts ?? 1, gap = 0.011;
    const f = c.createBiquadFilter(); f.type = p.filter ?? "highpass"; f.frequency.value = p.cutoff ?? 8000; f.Q.value = p.q ?? 0.7;
    const g = c.createGain(), t0 = t + (bursts - 1) * gap, metal = p.source === "metal";
    g.gain.setValueAtTime(0, t);
    for (let i = 0; i < bursts - 1; i++) { g.gain.linearRampToValueAtTime(peak, t + i * gap + 0.001); g.gain.exponentialRampToValueAtTime(peak * 0.15, t + i * gap + gap * 0.9); }
    g.gain.linearRampToValueAtTime(peak, t0 + Math.max(0.001, p.attack ?? 0.001));
    g.gain.exponentialRampToValueAtTime(0.0005, t0 + (p.attack ?? 0.001) + decay);
    const nodes: AudioNode[] = [this.noiseSource(t, t0 - t + decay + 0.06, metal), f];
    // the 808's metal: its six tones through a band-pass at 10 kHz, then the filter (a high-pass at 7 kHz or so)
    if (metal) { const b = c.createBiquadFilter(); b.type = "bandpass"; b.frequency.value = 10000; b.Q.value = 0.6; nodes.splice(1, 0, b); }
    this.chain([...nodes, g], dest);
  }

  private snare(t: number, p: Patch, peak: number, dest: AudioNode): void {
    const c = this.ctx, decay = p.decay ?? 0.14;
    const f = c.createBiquadFilter(); f.type = "highpass"; f.frequency.value = p.cutoff ?? 1800; f.Q.value = p.q ?? 0.7;
    this.chain([this.noiseSource(t, decay + 0.05), f, this.env(t, peak, 0.001, decay)], dest);
    // the shell: two tones, the second a little under a ninth above, each dropping into place
    for (const [k, lvl] of [[1, 0.7], [1.85, 0.35]]) {
      const o = c.createOscillator(); o.type = "triangle";
      const f0 = (p.pitch ?? 190) * k;
      o.frequency.setValueAtTime(f0 * 1.5, t); o.frequency.exponentialRampToValueAtTime(f0, t + 0.03);
      this.chain([o, this.env(t, peak * lvl, 0.001, decay * 0.5)], dest);
      o.start(t); o.stop(t + decay + 0.05);
    }
  }

  private bell(t: number, p: Patch, peak: number, freq: number, dest: AudioNode): void {
    const c = this.ctx, decay = p.decay ?? 0.3;
    const f = c.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = p.cutoff ?? 2400; f.Q.value = p.q ?? 1.5;
    const g = this.env(t, peak, 0.001, decay);
    f.connect(g); g.connect(dest);
    for (const k of [1, p.ratio ?? 1.48]) { const o = c.createOscillator(); o.type = "square"; o.frequency.value = freq * k; o.connect(f); o.start(t); o.stop(t + decay + 0.05); }
  }

  private synth(t: number, p: Patch, peak: number, freq: number, dur: number, ch: Channel): void {
    const lite = this.shedLevel >= 2, all = p.waves ?? ["sawtooth"], waves = lite ? all.slice(0, 1) : all, U = lite ? 1 : Math.max(1, Math.round(p.unison ?? 1)), n = waves.length * U;
    const c = this.ctx, attack = Math.max(0.002, p.attack ?? 0.005), decay = Math.max(0.01, p.decay ?? 0.2), sustain = p.sustain ?? 0.5, release = Math.max(0.01, p.release ?? 0.1);
    const end = t + Math.max(dur, attack), stop = end + release * (lite ? 2 : 4) + 0.02;
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
      // a slow wobble of the filter: pads breathe
      if (p.lfoRate && p.lfoDepth) {
        const l = c.createOscillator(), lg = c.createGain();
        l.frequency.value = p.lfoRate; lg.gain.value = p.lfoDepth;
        l.connect(lg); lg.connect(f.frequency); l.start(t); l.stop(stop);
      }
      nodes.push(f);
    }
    if (p.drive) nodes.push(this.shaper(p.drive));
    nodes.push(g);
    this.chain(nodes, ch.in);
    // every wave as `unison` voices, detuned across ±detune cents and spread across ±width in the
    // stereo field (outer voices widest), each starting at its own point in the cycle
    let v = 0;
    for (const w of waves) for (let u = 0; u < U; u++, v++) {
      const o = c.createOscillator(), x = n > 1 ? (2 * v) / (n - 1) - 1 : 0;
      o.type = w;
      o.detune.value = (p.detune ?? 0) * x;
      if (p.glide && ch.lastFreq > 0 && ch.lastFreq !== freq) { o.frequency.setValueAtTime(ch.lastFreq, t); o.frequency.exponentialRampToValueAtTime(freq, t + p.glide); }
      else if (p.bend) { o.frequency.setValueAtTime(freq * Math.pow(2, p.bend / 12), t); o.frequency.exponentialRampToValueAtTime(freq, t + (p.bendTime ?? 0.08)); }
      else o.frequency.value = freq;
      let src: AudioNode = o;
      if (p.width && n > 1) { const s = c.createStereoPanner(); s.pan.value = p.width * (v % 2 ? x : -x); o.connect(s); src = s; }
      src.connect(nodes[0]); o.start(t + (U > 1 ? (u * 0.0007) % 0.004 : 0)); o.stop(stop);
    }
    ch.lastFreq = freq;
  }

  /** A sung note, synthesised: a buzzy source (saws, a touch of breath) through three formant
   *  band-passes for its vowel (chosen by the note, from the patch's vowels), with a vibrato that
   *  creeps in; unison voices spread wide make a choir. */
  private voice(t: number, p: Patch, peak: number, freq: number, dur: number, step: number, dest: AudioNode): void {
    const c = this.ctx, vowels = p.vowels?.length ? p.vowels : ["ah"], vowel = VOWELS[vowels[Math.abs(step >> 2) % vowels.length]] ?? VOWELS.ah;
    const U = this.shedLevel >= 2 ? 1 : Math.max(1, Math.round(p.unison ?? 1)), attack = Math.max(0.005, p.attack ?? 0.08), decay = Math.max(0.01, p.decay ?? 0.3), sustain = p.sustain ?? 0.8, release = Math.max(0.02, p.release ?? 0.3);
    const end = t + Math.max(dur, attack), stop = end + release * (this.shedLevel >= 2 ? 2 : 4) + 0.02;
    const g = c.createGain(), lvl = peak / Math.sqrt(U);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(lvl, t + attack);
    if (end > t + attack) g.gain.setTargetAtTime(lvl * sustain, t + attack, decay / 3);
    g.gain.setTargetAtTime(0, end, release / 3);
    g.connect(dest);
    const src = c.createGain(); // the buzz, into the formants in parallel
    for (const [f, a] of vowel) {
      const b = c.createBiquadFilter(), bg = c.createGain();
      b.type = "bandpass"; b.frequency.value = f * (p.formantShift ?? 1); b.Q.value = p.q ?? 8; bg.gain.value = a * 3;
      src.connect(b); b.connect(bg); bg.connect(g);
    }
    // vibrato: a few cents, creeping in after the attack
    const vib = c.createOscillator(), vg = c.createGain();
    vib.frequency.value = 5.2; vg.gain.setValueAtTime(0, t); vg.gain.linearRampToValueAtTime(p.vibrato ?? 15, t + Math.min(0.6, attack + 0.25));
    vib.connect(vg); vib.start(t); vib.stop(stop);
    for (let u = 0; u < U; u++) {
      const o = c.createOscillator(), x = U > 1 ? (2 * u) / (U - 1) - 1 : 0;
      o.type = "sawtooth"; o.frequency.value = freq; o.detune.value = (p.detune ?? 0) * x;
      vg.connect(o.detune);
      let out: AudioNode = o;
      if (p.width && U > 1) { const s = c.createStereoPanner(); s.pan.value = p.width * x; o.connect(s); out = s; }
      out.connect(src); o.start(t); o.stop(stop);
    }
    if (p.breath) { const h = c.createBiquadFilter(); h.type = "highpass"; h.frequency.value = 2500; this.chain([this.noiseSource(t, stop - t), h, this.env(t, p.breath, attack, Math.max(dur, 0.05) + release)], src); }
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
    // decorrelated noise in each ear, after a short pre-delay, decaying, and darkening as it goes
    // (a one-pole low-pass closing over the tail, as air and walls soak up the highs)
    const c = this.ctx, rate = c.sampleRate, pre = Math.floor(0.015 * rate), n = Math.max(pre + 1, Math.floor(seconds * rate)), b = c.createBuffer(2, n, rate);
    let r = 777;
    for (let ch = 0; ch < 2; ch++) {
      const d = b.getChannelData(ch);
      let y = 0;
      for (let i = pre; i < n; i++) {
        r = (Math.imul(r, 1664525) + 1013904223) >>> 0;
        const k = (i - pre) / (n - pre), a = 0.85 - 0.75 * k;
        y += a * ((r / 4294967296) * 2 - 1 - y);
        d[i] = y * Math.pow(1 - k, 2.5) * (1 + 0.6 * (1 - a));
      }
    }
    return b;
  }
}
