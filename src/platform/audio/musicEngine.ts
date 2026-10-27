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
import { Conductor, bootLayers, formClock, silentAt, type MusicCue } from "../../rules/musicPlan";
import { mtof, noiseBuffer } from "./dsp";
import { FOF_TYPES, FOF_VOWELS, FofVoices, fofLoaded, fofReady } from "./fof/fof";
import { TractVoices, tractLoaded, tractReady } from "./tract/tract";
import { fxOn, VoiceFx, prepareWhisperEnvelopes } from "./voiceFx";
import { musicSeed, notesAt, resolveSection, sectionCutoff, type BlockPlan, type MusicStyle, type NoteEvent, type Patch } from "../../rules/musicScore";

/** A part's way into the mix; `lfo`: its filter's slow wobble, one for all its notes (made when first wanted). */
interface Channel {
  in: GainNode; lastFreq: number; lfo?: { osc: OscillatorNode; depth: GainNode };
  /** A drum's filters, which never move: one set a part, every hit's envelope into it (made when first wanted). */
  hitIn?: AudioNode;
  /** The part it's the channel of. */
  part?: string;
  /** A sung part's vibrato (5.2 Hz) and formant banks by vowel, shared by its notes. */
  vib?: OscillatorNode; banks?: Map<string, AudioNode>;
  /** What to stop when the style changes (the shared sources). */
  running?: AudioScheduledSourceNode[];
  /** A FOF part's voices (one worklet a part), its voice line's effects, when its last note ends (its phrases), and its
   *  swells' voices (into the effects' reverbs only, under a rising envelope). */
  fof?: FofVoices; tract?: TractVoices; fx?: VoiceFx; lastEnd?: number;
  /** Which chain the voice effects are set to (the style's voiceFx, "pure", or voiceFxDark): Ed, 2026-10-14, two chains by place. */
  fxKind?: "pure" | "dark"; swell?: { voices: FofVoices; gain: GainNode };
  /** A recorded voice's presence lift, shared by its notes, and its notes so far this phrase (its vowels taken in turn). */
  presence?: BiquadFilterNode; sung?: number;
}

/** Held synth notes (the Music Studio's keyboard): what letting go of them releases. */
type Held = { gain: GainNode; filter: BiquadFilterNode | null; fBase: number; fRelease: number; release: number; sources: AudioScheduledSourceNode[] }[];

/** Where the parts' notes go, and the bus's own automation (the section's low-pass over a bar, the kick's duck, the knockdown's
 *  gate, the voice line's chain by place): the engine's own buses (live, as ever), or a renderer's stems (render/ahead: the
 *  music drawn a bar at a time on an OfflineAudioContext, docs/notes/music.md "Music ahead"), the automation kept to be played
 *  on the live buses as the bar is heard. */
export interface MusicSink {
  /** The parts the kick ducks, the rest, the reverb's send and the delay's (each a node on the notes' context). */
  duck: AudioNode; dry: AudioNode; reverb: AudioNode; delay: AudioNode;
  /** The voice line's part before its effects (its effects, high-pass, pan and sends are the bus's); null: the engine's own. */
  voice: ((part: string) => AudioNode) | null;
  /** The section's low-pass from `f0` to `f1` Hz over `dur` seconds from `t`. */
  tone(f0: number, f1: number, t: number, dur: number): void;
  /** The kick's duck at `t`, `depth` deep (0-1), easing back over the sixteenth `sps`. */
  duckAt(t: number, depth: number, sps: number): void;
  /** The knockdown's gate shut (fading) or open at `t`. */
  gate(open: boolean, t: number): void;
  /** The voice line's chain by place at `t` (Ed, 2026-10-14, "two chains by place"). */
  fxChain?(part: string, kind: "pure" | "dark", t: number): void;
  /** The voice effects' end of a phrase at `t` (the freeze: VoiceFx.release). */
  fxRelease?(part: string, t: number): void;
  /** A recorded phrase's swell (the recording `rec` at `rate`, rising over `swell` seconds into the effects' reverbs before its
   *  first note at `t`, at `peak`): the effects', so played on the bus (it starts before the bar it leads into). */
  fxSwell?(part: string, rec: AudioBuffer, rate: number, t: number, swell: number, peak: number): void;
}

/** The noise and the 808's metal, made once a sample rate (the same on every context: a renderer's a bar at a time too). */
const SHARED = new Map<number, { noise: AudioBuffer; metal: AudioBuffer }>();

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
  /** Shut from a knockdown till its new record starts (Ed, 2026-10-09: "the music stops when she gets knocked down"): cut at
   *  once on the audio clock when the knockdown is heard of (what's already scheduled ahead with it), opened on the new
   *  record's first downbeat. */
  private gate: GainNode;
  /** After the limiter: where the voice line joins the music, through a safety limiter. */
  private post: WaveShaperNode;
  /** Knockdowns heard of so far, and whether the gate is shut (as scheduled: on the audio clock, ahead of now). */
  private knocksHeard = 0;
  gated = false;
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
  /** Drawn ahead (platform/audio/musicAhead.ts; docs/notes/music.md "Music ahead"): from `from` to `to` (audio time) the main
   *  notes and their bus automation are the bars drawn ahead, this engine playing the hooks' parts alone (and a legend's
   *  clearing layer, as ever); and while it's set, the timeline never eased or re-anchored to the game (the bars are fixed on
   *  the audio clock: the audio clock is the music's), but after a pause, a new run or a jump in time. */
  handoff = { from: Infinity, to: Infinity };
  /** The music's own time now (game time as the music has it), and the audio time a music time is heard at (early by the lead). */
  musicTime(now = this.ctx.currentTime): number { return this.g0 + (now - this.a0) * this.rate; }
  audioAt(g: number): number { return this.a0 + (g - this.g0) / this.rate - this.leadNow; }
  /** Its timeline's anchor: the audio time music time 0 is at (the lead left out: that eases on its own). */
  get anchorAt(): number { return this.a0 - this.g0 / this.rate; }
  /** The game's beat moved on by `lost` seconds to where the music is (rules/beat.ts shiftBeat): its timeline the same on the
   *  audio clock, in the game's new reckoning. */
  shiftTime(lost: number): void { if (Number.isFinite(this.g0)) this.g0 -= lost; }
  /** Called as its timeline starts afresh (newTimeline: the next night), before it does: the player drawing it ahead's. */
  onNewTimeline?: () => void;
  /** Whether its timeline is anchored (it's been played since its last jump). */
  get anchored(): boolean { return Number.isFinite(this.g0); }
  private wasPlaying = false;
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
  /** The most the notes are sent early by the context's latency (s). */
  static maxLead = 0.25;
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
   *  oscillator (no unison, its first wave only) and shorter tails; 3 the reverbs short and the delay off. The voice line's
   *  effects shed with it (VoiceFx.shedTo: 1 its vocoder and freeze, 2 its shimmer and chorus, 3 its hall and echoes). */
  private shedLevel = 0;
  get shed(): number { return this.shedLevel; }
  set shed(level: number) {
    if (level === this.shedLevel) return;
    const was = this.shedLevel; this.shedLevel = level;
    if ((was >= 3) !== (level >= 3)) { this.reverbTime = -1; this.setMix(); }
    for (const ch of this.channels.values()) ch.fx?.shedTo(level);
  }

  /** Where the notes go: its own buses (`bus`), or a renderer's stems. */
  private sink: MusicSink;
  /** Rendering into another's stems (no buses of its own heard, no reverbs' impulses made). */
  private readonly stems: boolean;
  /** A renderer's: how far (s) its context's time 0 is past the first renderer's, so the parts' running wobbles and vibratos
   *  (free oscillators) go on in phase from one bar's context to the next. */
  phaseAt = 0;
  /** A renderer's: what the bar before's renderer left in each part (a glide's last note, the sung phrase's vowel and end, its
   *  chain by place), its times on this one's context; taken up as each part's channel is made. */
  private carried = new Map<string, Pick<Channel, "lastFreq" | "sung" | "lastEnd" | "fxKind">>();
  /** A renderer following `prev` (the bar before's, its context `shift` seconds earlier): its parts' state and its gate carried on. */
  carryFrom(prev: MusicEngine, shift: number): void {
    const move = (st: Pick<Channel, "lastFreq" | "sung" | "lastEnd" | "fxKind">) => ({ ...st, lastEnd: st.lastEnd === undefined ? undefined : st.lastEnd - shift });
    for (const [k, st] of prev.carried) this.carried.set(k, move(st));
    for (const [k, ch] of prev.channels) this.carried.set(k, move({ lastFreq: ch.lastFreq, sung: ch.sung, lastEnd: ch.lastEnd, fxKind: ch.fxKind }));
    this.gated = prev.gated; this.phaseAt = prev.phaseAt + shift;
  }
  /** A free oscillator at `rate` Hz started at time 0, in phase with the first renderer's (a renderer's; live, as it starts). */
  private phased(o: OscillatorNode, rate: number): void {
    if (!this.stems || !this.phaseAt) return;
    const ph = 2 * Math.PI * rate * this.phaseAt;
    o.setPeriodicWave(this.ctx.createPeriodicWave(new Float32Array([0, Math.sin(ph)]), new Float32Array([0, Math.cos(ph)]), { disableNormalization: true }));
  }

  constructor(private ctx: BaseAudioContext, dest: AudioNode, public style: MusicStyle, public seed = 0, circleDest: AudioNode = dest, sink?: MusicSink) {
    this.stems = !!sink;
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
    this.gate = c.createGain();
    // (the voice line joins after the limiter, so the sum has a safety clipper of its own: exactly linear to 0.9, where the music
    // alone stays, rounding off only the voice's overs; no compressor, whose make-up gain would lift the music too)
    this.post = c.createWaveShaper();
    const curve = new Float32Array(4097);
    for (let i = 0; i < curve.length; i++) { const x = (i / 2048) - 1, a = Math.abs(x); curve[i] = a <= 0.9 ? x : Math.sign(x) * (0.9 + 0.1 * Math.tanh((a - 0.9) / 0.1)); }
    this.post.curve = curve;
    this.tone.connect(limit); limit.connect(this.post); this.post.connect(this.gate); this.gate.connect(this.out); this.out.connect(dest);
    // the legend's clearing layer: not through the section's low-pass, its own reverb and a limiter
    this.circleIn = c.createGain(); this.circleVerbIn = c.createGain(); this.circleVerb = c.createConvolver();
    const circleLimit = c.createDynamicsCompressor();
    circleLimit.threshold.value = -10; circleLimit.knee.value = 6; circleLimit.ratio.value = 8; circleLimit.attack.value = 0.005; circleLimit.release.value = 0.3;
    this.circleVerbIn.connect(this.circleVerb); this.circleVerb.connect(this.circleIn);
    this.circleIn.connect(circleLimit); circleLimit.connect(circleDest);
    let shared = SHARED.get(c.sampleRate);
    if (!shared) {
      const noise = noiseBuffer(c, 2, 22222), metal = c.createBuffer(1, 2 * c.sampleRate, c.sampleRate);
      const m = metal.getChannelData(0), phase = METAL_RATIOS.map((_, i) => i * 0.37);
      for (let i = 0; i < m.length; i++) {
        let v = 0;
        for (let k = 0; k < METAL_RATIOS.length; k++) v += ((40 * METAL_RATIOS[k] * i) / c.sampleRate + phase[k]) % 1 < 0.5 ? 1 : -1;
        m[i] = v / METAL_RATIOS.length;
      }
      // tilt it bright (twice differenced) and bring it to full scale: the 808 keeps only the top of these tones
      let peak = 0, a = 0, b = 0;
      for (let i = 0; i < m.length; i++) { const x = m[i], d1 = x - a; a = x; const d2 = d1 - b; b = d1; m[i] = d2; peak = Math.max(peak, Math.abs(d2)); }
      for (let i = 0; i < m.length; i++) m[i] /= peak || 1;
      SHARED.set(c.sampleRate, shared = { noise, metal });
    }
    this.noise = shared.noise; this.metal = shared.metal;
    this.sink = sink ?? this.bus;
    this.setStyle(style);
    if (Object.values(style.patches).some(p => p.kind === "fof") && style.form?.sung && style.patches[style.form.sung.patch]?.kind === "fof") void fofReady(ctx); // (the FOF voice loading ahead of its first note, when it sings)
  }

  /** A new or edited style: takes effect from the next block. */
  setStyle(style: MusicStyle): void {
    this.style = style;
    this.conductor.reset(style);
    this.setMix();
    for (const ch of this.channels.values()) {
      for (const n of [ch.lfo?.osc, ...(ch.running ?? [])]) if (n) try { n.stop(); } catch { /* stopped */ }
      ch.fof?.dispose(); ch.swell?.voices.dispose(); ch.fx?.dispose();
    }
    this.channels.clear();
    this.warmSung();
  }

  /** The sung part's channel and its effects built now, not at its first note, their convolvers' impulses a frame at a time
   *  from here on (VoiceFx.warm, in update): the stall hunt, 2026-10-13: that first note was a 190 ms frame. */
  private warmSung(): void {
    const sung = this.style.form?.sung, p = sung && this.style.patches[sung.patch];
    if (sung && p) this.channel(sung.part, p);
  }

  /** The FOF voice's worklet loaded on a context (tools rendering offline wait for it; the game starts it with the music). */
  static fofReady = fofReady;
  /** The tempo now (the voice effects' echoes are on the beat). */
  private bpmNow = 120;
  /** The voice line's effects changed while playing (the Music Lab's sliders): set at once on its parts. */
  /** The voice effects' settings for a chain: the style's voiceFx (pure, for breakdowns and builds) or, "dark", its voiceFxDark
   *  over it (the dark families: Ed, 2026-10-14, "two chains by place"). */
  private fxChain(kind: "pure" | "dark"): NonNullable<MusicStyle["voiceFx"]> {
    const F = this.style.voiceFx ?? {};
    if (kind !== "dark" || !this.style.voiceFxDark) return F;
    const { families: _f, parts: _p, ...dark } = this.style.voiceFxDark as NonNullable<MusicStyle["voiceFxDark"]> & { _?: string };
    delete (dark as { _?: string })._;
    return { ...F, ...dark };
  }

  setVoiceFx(settings: NonNullable<MusicStyle["voiceFx"]>): void {
    this.style = { ...this.style, voiceFx: { ...this.style.voiceFx, ...settings } };
    for (const ch of this.channels.values()) ch.fx?.set(settings);
  }
  /** The recorded voices the sample patches sing (samples/voices: platform/audio/voiceSamples.ts loads them). */
  private recordings = new Map<string, AudioBuffer>();
  /** The recordings it sings from (a renderer drawing ahead sings from the same). */
  get recorded(): Record<string, AudioBuffer> { return Object.fromEntries(this.recordings); }
  setRecordings(recs: Record<string, AudioBuffer>): void { for (const [k, b] of Object.entries(recs)) this.recordings.set(k, b); }
  /** A whispering recording for the voice effects' vocoder (the CC0 whispers). */
  private whisperRec: AudioBuffer | null = null;
  setWhisper(rec: AudioBuffer): void { void prepareWhisperEnvelopes(this.ctx, rec).then(() => { this.whisperRec = rec; for (const ch of this.channels.values()) ch.fx?.whisper(rec); }); } // (its envelopes made ahead, a band a task)

  /** The style's mix on the buses (shed 3: the reverbs cut short, the delay off). */
  private setMix(): void {
    const m = this.style.mix, lite = this.shedLevel >= 3, time = lite ? Math.min(0.7, m.reverbTime) : m.reverbTime;
    this.out.gain.value = m.master;
    this.reverbIn.gain.value = m.reverb;
    this.delayIn.gain.value = lite ? 0 : m.delay;
    this.feedback.gain.value = lite ? 0 : Math.min(0.85, m.feedback);
    if (time !== this.reverbTime && !this.stems) { this.reverbTime = time; this.reverb.buffer = this.impulse(time); this.circleVerb.buffer = this.impulse(time * 1.6); } // (a renderer's reverbs are the bus's)
  }

  /** Its own buses as a sink (live: the notes and their automation straight onto them); what a renderer's stems play into. */
  get bus(): MusicSink {
    return this.ownBus ??= {
      duck: this.duckBus, dry: this.dryBus, reverb: this.reverbIn, delay: this.delayIn, voice: null,
      tone: (f0, f1, t, dur) => { this.tone.frequency.setValueAtTime(f0, t); if (f1 !== f0) this.tone.frequency.exponentialRampToValueAtTime(f1, t + dur); },
      duckAt: (t, depth, sps) => { const g = this.duckBus.gain; g.setTargetAtTime(1 - depth, t, 0.004); g.setTargetAtTime(1, t + 0.03, sps * 0.7); },
      gate: (open, t) => { if (open) { this.gate.gain.cancelScheduledValues(t); this.gate.gain.setValueAtTime(1, t); } else this.gate.gain.setTargetAtTime(0, t, 0.03); },
      fxChain: (part, kind) => { const ch = this.channels.get(part); if (ch?.fx && ch.fxKind !== kind) { ch.fxKind = kind; ch.fx.set(this.fxChain(kind)); } },
      fxRelease: (part, t) => this.channels.get(part)?.fx?.release(t),
      fxSwell: (part, rec, rate, t, swell, peak) => { const fx = this.channels.get(part)?.fx; if (fx) this.swellInto(fx, rec, rate, t, swell, peak); },
    };
  }
  private ownBus: MusicSink | null = null;
  /** The voice line's part's way in, its effects after (a renderer's voice stem plays into it). */
  voiceIn(part: string): AudioNode | null { const p = this.style.patches[this.style.form?.sung.part === part ? this.style.form.sung.patch : ""] ?? null; return p ? this.channel(part, p).in : null; }

  /** Each frame: schedule what's due in the next `ahead` seconds of audio time, at game time
   *  `gameTime` (seconds) on the beat clock `clock`. `playing` false: nothing new is scheduled. */
  /** How early (s) the notes go out so they're heard on the beat the game shows: the context's own latency (its buffer and the
   *  device's; a bigger buffer against under-runs, platform/audio/buffer.ts), eased so a change never jolts the timeline. */
  lead = 0;
  private leadNow = 0;

  update(cue: MusicCue, gameTime: number, clock: BeatClock, playing: boolean, ahead = 0.6, rate = 1, pitch = 1): void {
    for (const ch of this.channels.values()) if (ch.fx?.warm()) break; // (one piece of the effects' work put off, a frame)
    const now = this.ctx.currentTime, stepNow = beatAt(clock, gameTime) * 4;
    const want = Math.max(0, Math.min(MusicEngine.maxLead, this.lead)); this.leadNow += Math.max(-.002, Math.min(.002, want - this.leadNow)); const L = this.leadNow;
    if (!playing) { this.nextStep = -1; this.cNext = -1; this.heardTo = -1; this.lastNow = -1; this.wasPlaying = false; return; }
    const drawn = Number.isFinite(this.handoff.from), resumed = !this.wasPlaying; this.wasPlaying = true;
    // a knockdown just heard of: the record scratched (sfx), the music cut now, notes already scheduled with it
    const knocks = cue.knockdowns?.length ?? 0;
    if (knocks < this.knocksHeard) this.knocksHeard = knocks; // (a new run)
    if (knocks > this.knocksHeard) {
      this.knocksHeard = knocks;
      if (silentAt(cue, stepNow / 16)) { this.gate.gain.cancelScheduledValues(now); this.gate.gain.setValueAtTime(this.gate.gain.value, now); this.gate.gain.setTargetAtTime(0, now, 0.03); this.gated = true; }
    }
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
    if (drawn && Number.isFinite(err) && !resumed && err > -30 && err < 2) { /* (drawn ahead: the timeline the audio clock's, held; only a jump in time or a fresh start re-anchors) */ }
    else if (!Number.isFinite(err) || err > 0.25 * rate || (drawn && resumed)) { if (Number.isFinite(this.g0) && !(drawn && resumed)) this.stats.resyncs++; this.g0 = gameTime; this.a0 = now; this.nextStep = -1; }
    else if (err < -6 * rate) { this.g0 += err + 6 * rate; this.stats.resyncs++; } // (a game running far slower than its audio for long: the music waits, never more than 6 s ahead)
    else this.g0 += Math.max(-slew, Math.min(slew, err * 0.05));
    const audioAt = (g: number) => this.a0 + (g - this.g0) / rate - L; // (early by the lead: heard when it's shown)
    const stepMusic = drawn ? beatAt(clock, this.musicTime(now)) * 4 : stepNow; // (drawn ahead: where the music is, not the game)
    if (this.nextStep < 0 || this.nextStep < stepMusic - 1 || this.nextStep > stepMusic + 64) {
      this.nextStep = Math.ceil(stepMusic);
      // (not what's already scheduled, unless time went back: a new run, a jump)
      if (this.lastStep < stepMusic + 64 && this.lastStep >= stepMusic - 64) this.nextStep = Math.max(this.nextStep, this.lastStep + 1);
    }
    this.bpmNow = bpmAt(clock, gameTime) * rate;
    this.delay.delayTime.setTargetAtTime(Math.min(4, (this.style.mix.delayBeats * 60) / bpmAt(clock, gameTime) / rate), now, 0.05);
    // A frame longer than what was scheduled ahead: the next sixteenth is already late. Played now rather than
    // dropped: the music held for the hitch, then on from where it was (the slew takes it back into step).
    if (this.heardTo >= 0 && this.nextStep >= 0) { const t = audioAt(timeAt(clock, this.nextStep / 4)); if (t < now) { this.stats.late++; if (!drawn) this.a0 += now + 0.005 - t; } } // (drawn ahead: the bars are fixed, so the hooks' late steps go unplayed)
    for (;;) {
      const g = timeAt(clock, this.nextStep / 4), t = this.a0 + (g - this.g0) / rate - L;
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
        const main = Math.floor(beatAt(clock, this.g0 + (this.cAt + L - this.a0) * rate) * 4), plan = this.conductor.plan(cue, Math.floor(main / 16));
        if (silentAt(cue, main / 16)) { this.cNext++; this.cAt += sps; continue; }
        const events = notesAt(this.style, plan, null, main, { ...this.formAt(cue, Math.floor(main / 16)), siege: 0, circle: cue.circle, only: "circle", circleStep: this.cNext });
        const swing = this.cNext % 2 === 1 ? this.style.swing * sps : 0;
        this.playAll(events, e => this.cAt + (e.straight ? 0 : swing) + e.offset * sps, sps);
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
      if (this.stems) this.bpmNow = bpmAt(clock, g); // (a renderer's: the tempo it's drawn at, as the live engine has it)
      this.step(cue, s, at + (g - from), 60 / bpmAt(clock, g) / 4);
    }
  }

  /** The bus's automation from `t` on let go (the bars drawn ahead from there dropped, to be drawn again). */
  cancelBusFrom(t: number): void {
    for (const p of [this.tone.frequency, this.duckBus.gain, this.gate.gain]) p.cancelScheduledValues(t);
  }

  /** Stop scheduling and forget the plans (a jump in the timeline). */
  reset(): void { this.nextStep = -1; this.lastStep = -Infinity; this.conductor.reset(); }

  /** A new night on the same page (docs/plans/sail-without-reload.md, A4): its game time starts again from 0, so the timeline
   *  is anchored afresh at its first frame (not eased back from 6 s ahead), its knockdowns counted from none and the gate open.
   *  What belongs to the page (the stats, the lead, a stall's look-ahead, the shed level, the channels) stays. */
  newTimeline(): void {
    this.onNewTimeline?.(); // (the bars drawn ahead for the old night let go, those still rendering too: musicAhead.ts)
    this.reset();
    this.g0 = NaN; this.a0 = 0; this.rate = 1;
    this.heardTo = -1; this.lastNow = -1;
    this.cNext = -1; this.cAt = 0;
    this.knocksHeard = 0;
    this.current = null;
    const now = this.ctx.currentTime;
    this.gate.gain.cancelScheduledValues(now); this.gate.gain.setValueAtTime(1, now); this.gated = false;
  }

  /** One sixteenth: `t` its audio time, `sps` seconds a sixteenth lasts now. */
  private step(cue: MusicCue, step: number, t: number, sps: number): void {
    const S = this.style, B = S.blockBars, bar = Math.floor(step / 16), s = step - bar * 16;
    // knocked down: nothing till her new record starts, then the gate open on its first sixteenth
    const drawn = t >= this.handoff.from && t < this.handoff.to; // (drawn ahead: the main notes and their automation the bars')
    if (silentAt(cue, step / 16)) { if (!this.gated) { if (!drawn) this.sink.gate(false, t); this.gated = true; } return; }
    if (this.gated) { if (!drawn) this.sink.gate(true, t); this.gated = false; }
    const plan = this.conductor.plan(cue, bar);
    // in a block's last bar, the next block's plan (for the fill): fixed a bar early
    const next = bar % B === B - 1 ? this.conductor.plan(cue, bar + 1) : null;
    this.current = { plan, bar, step };
    if (s === 0 && !drawn) {
      // the section's low-pass over this bar
      const sec = resolveSection(S, plan.section), barIn = bar - plan.start;
      // (while the speakers boot, the low-pass opens with them rather than over the block)
      const b0 = bootLayers(cue, bar), b1 = bootLayers(cue, bar + 1);
      const boot = cue.speakerBars !== undefined && plan.section === S.intro;
      const f0 = sectionCutoff(sec, boot ? b0 : barIn / plan.bars), f1 = sectionCutoff(sec, boot ? b1 : (barIn + 1) / plan.bars);
      this.sink.tone(f0, f1, t, 16 * sps);
    }
    const all = notesAt(S, plan, next, step, { ...this.formAt(cue, bar), siege: cue.siege, party: cue.party, legend: cue.legend, only: "main", build: cue.speakerBars !== undefined ? bootLayers(cue, bar) : undefined });
    const events = drawn ? all.filter(e => e.hook) : all; // (drawn ahead: the hooks' parts alone here, live)
    const swing = step % 2 === 1 ? S.swing * sps : 0;
    this.playAll(events, e => t + (e.straight ? 0 : swing) + e.offset * sps, sps);
  }

  /** The music's seed and its form's start in bar `bar` (each knockdown re-seeds it: Ed, 2026-10-09). */
  private formAt(cue: MusicCue, bar: number): { seed: number; formStart: number } {
    const f = formClock(this.style, cue, bar);
    return { seed: musicSeed(this.seed, f.n), formStart: f.start };
  }

  private channel(part: string, p: Patch, circle = false): Channel {
    const key = circle ? `circle:${part}` : part;
    let ch = this.channels.get(key);
    if (!ch) {
      const c = this.ctx, g = c.createGain(), F = this.style.voiceFx;
      let out: AudioNode = g, fx: VoiceFx | undefined;
      // the voice line's ethereal effects (Ed, 2026-10-11), on the sung part and any listed
      const voiced = !circle && fxOn(F) && (part === this.style.form?.sung.part || F!.parts?.includes(part));
      if (voiced && this.sink.voice) { // (a renderer's: the voice line as it is, its effects and the rest the bus's)
        g.connect(this.sink.voice(part));
        this.channels.set(key, ch = { in: g, lastFreq: 0, part, ...this.carried.get(key) });
        return ch;
      }
      if (voiced) {
        fx = new VoiceFx(c, F, () => this.bpmNow, (F!.duck ?? 0) > 0 ? this.duckBus : undefined);
        if (this.shedLevel) fx.shedTo(this.shedLevel);
        if (this.whisperRec) fx.whisper(this.whisperRec);
        g.connect(fx.input); out = fx.output;
      }
      if (p.hp) { const f = c.createBiquadFilter(); f.type = "highpass"; f.frequency.value = p.hp; f.Q.value = 0.7; out.connect(f); out = f; }
      if (p.pan) { const s = c.createStereoPanner(); s.pan.value = p.pan; out.connect(s); out = s; }
      // (a legend's clearing layer into its own bus and reverb, over the muffle; the voice line with its effects in after the
      // section's low-pass and the limiter, before the knockdown's gate, as the A/B Ed picked had it: Ed, 2026-10-11, "e Recorded
      // + ethereal"; the rest into the mix)
      out.connect(circle ? this.circleIn : fx ? this.post : p.duck ? this.sink.duck : this.sink.dry);
      if (p.reverb) { const r = c.createGain(); r.gain.value = p.reverb; out.connect(r); r.connect(circle ? this.circleVerbIn : this.sink.reverb); }
      if (p.delay && !circle) { const d = c.createGain(); d.gain.value = p.delay; out.connect(d); d.connect(this.sink.delay); }
      this.channels.set(key, ch = { in: g, lastFreq: 0, part, ...this.carried.get(key), ...(fx ? { fx } : {}) });
    }
    return ch;
  }

  /** A step's notes. A synth part's chord, its notes struck together (the same time, length and velocity), shares one
   *  filter, envelope and pair of panners: a filter's the same on their sum as on each (not with drive, a waveshaper, or
   *  glide). A note each was the gate pad's and the stabs' cost; foxtrot's measure, #523. */
  private playAll(events: NoteEvent[], at: (e: NoteEvent) => number, sps: number): void {
    const taken = new Set<NoteEvent>();
    for (let i = 0; i < events.length; i++) {
      const e = events[i];
      if (taken.has(e)) continue;
      const p = this.style.patches[e.patch];
      if (p?.kind === "synth" && !p.drive && !p.glide && e.midi !== null) {
        const mates = events.filter((f, j) => j > i && !taken.has(f) && f.part === e.part && f.patch === e.patch && f.layer === e.layer && f.offset === e.offset && f.dur === e.dur && f.vel === e.vel && f.midi !== null);
        if (mates.length) { for (const f of mates) taken.add(f); this.play(e, at(e), e.dur * sps, sps, mates.map(f => f.midi!)); continue; }
      }
      this.play(e, at(e), e.dur * sps, sps);
    }
  }

  /** One note outside the score, at audio time `t`, `dur` seconds long, on part `part`'s channel with patch `patch` (the
   *  Music Studio's MIDI player and keyboard, tools/music-studio: Ed, 2026-10-22). `midi` null for a drum. */
  note(part: string, patch: string, midi: number | null, vel: number, t: number, dur: number): void {
    this.play({ part, patch, midi, vel, step: 0, offset: 0, dur: 0 }, t, dur, 60 / 120 / 4);
  }

  /** One piece of the voice effects' work put off (their halls' impulses), as update does a frame at a time: for a page playing
   *  notes without update (the treehouse Studio). True while there's more. */
  warmFx(): boolean {
    for (const ch of this.channels.values()) if (ch.fx?.warm()) return true;
    return false;
  }

  /** The Studio's tempo (it plays without a beat clock): the echoes' time and the voice effects' beat. */
  tempo(bpm: number): void {
    this.bpmNow = bpm;
    this.delay.delayTime.setTargetAtTime(Math.min(4, (this.style.mix.delayBeats * 60) / Math.max(20, bpm)), this.ctx.currentTime, 0.05);
  }

  /** A part's channel let go, made afresh at its next note (the Studio: its patch's high-pass, pan, sends or wobble changed);
   *  what's still sounding on the old one gets a few seconds to ring out. */
  resetPart(part: string): void {
    const ch = this.channels.get(part);
    if (!ch) return;
    this.channels.delete(part);
    setTimeout(() => {
      for (const n of [ch.lfo?.osc, ...(ch.running ?? [])]) if (n) try { n.stop(); } catch { /* stopped */ }
      ch.fof?.dispose(); ch.swell?.voices.dispose(); ch.fx?.dispose();
      try { ch.in.disconnect(); } catch { /* gone */ }
    }, 6000);
  }

  /** A synth or sampled note held from audio time `t` till the function it gives back is called with the time to let go (the
   *  Studio's keyboard; the treehouse Studio's instruments: a sung note loops its recording's steady middle while held); any other
   *  kind of patch plays a short note and the function does nothing. */
  hold(part: string, patch: string, midi: number, vel: number, t: number): (at: number) => void {
    const p = this.style.patches[patch];
    if (!p) return () => { /* none */ };
    if (p.kind !== "synth" && p.kind !== "sample") { this.note(part, patch, midi, vel, t, 0.4); return () => { /* one shot */ }; }
    const held: Held = [], ch = this.channel(part, p);
    this.notePitch = 1;
    if (p.kind === "sample") this.sampled(t, p, p.gain * vel, mtof(midi), Infinity, 0, ch, held);
    else this.synth(t, p, p.gain * vel, mtof(midi), 0, ch, held);
    return at => {
      for (const h of held) {
        h.gain.gain.setTargetAtTime(0, at, h.release / 3);
        h.filter?.frequency.setTargetAtTime(h.fBase, at, h.fRelease / 3);
        for (const s of h.sources) try { s.stop(at + 2 * Math.max(h.release, h.fRelease) + 0.05); } catch { /* stopped */ }
      }
    };
  }

  private play(e: NoteEvent, t: number, dur: number, sps: number, chord: number[] = []): void {
    const p = this.style.patches[e.patch];
    if (!p || (this.solo && !this.solo.has(e.part))) return;
    const ch = this.channel(e.part, p, e.layer === "circle"), peak = p.gain * e.vel;
    const pf = (this.notePitch = e.layer === "circle" ? 1 : this.pitch); // (the tape slowing: the circle's own layer never)
    if (e.fx && ch.fx && ch.fxKind !== e.fx) { ch.fxKind = e.fx; ch.fx.set(this.fxChain(e.fx)); } // (two chains by place: Ed, 2026-10-14)
    else if (e.fx && this.stems && ch.fxKind !== e.fx) { ch.fxKind = e.fx; this.sink.fxChain?.(e.part, e.fx, t); } // (a renderer's: the bus's chain, as it's heard)
    switch (p.kind) {
      case "kick": this.kick(t, pf === 1 ? p : { ...p, pitch: (p.pitch ?? 150) * pf, pitchEnd: (p.pitchEnd ?? 45) * pf }, peak, ch.in); this.duck(t, e.vel, sps); break;
      case "noise": this.noiseHit(t, p, peak, ch); break;
      case "snare": this.snare(t, p, peak, ch); break;
      case "bell": this.bell(t, p, peak, mtof(e.midi ?? 69) * pf, ch.in); break;
      case "synth": this.synth(t, p, peak, chord.length ? [e.midi ?? 45, ...chord].map(m => mtof(m) * pf) : mtof(e.midi ?? 45) * pf, dur, ch); break;
      case "voice": this.voice(t, p, peak, mtof(e.midi ?? 57) * pf, dur, e.step, ch); break;
      case "fof": this.fof(t, p, peak, mtof(e.midi ?? 57) * pf, dur, e.step, ch); break;
      case "sample": this.sampled(t, p, peak, mtof(e.midi ?? 57) * pf, dur, e.step, ch); break;
      case "tract": this.tract(t, p, peak, mtof(e.midi ?? 57) * pf, dur, e.step, ch); break;
      case "riser": this.riser(t, p, dur, e.from ?? 0, e.to ?? 1, ch.in); break;
      case "impact": this.impact(t, p, peak, ch.in); break;
    }
  }

  private duck(t: number, vel: number, sps: number): void {
    const depth = this.style.mix.duck * Math.min(1, vel);
    if (depth <= 0) return;
    this.sink.duckAt(t, depth, sps);
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
    const at = t + (this.stems ? this.phaseAt : 0); // (where in the noise: by the music's time, a renderer's the same as live's)
    s.start(t, ((((at * 7.31) % 1) + 1) % 1) * 0.5); // (never a negative offset: a renderer's time against the first's can be)
    s.stop(t + length);
    return s;
  }

  /** A drum part's filters, which never move, made once and shared by its hits (each hit's envelope goes in before them:
   *  the same sound, a filter or two fewer a hit; foxtrot's measure, #523). */
  private hitFilters(ch: Channel, make: () => AudioNode[]): AudioNode {
    if (!ch.hitIn) { const f = make(); this.chain(f, ch.in); ch.hitIn = f[0]; }
    return ch.hitIn;
  }

  private noiseHit(t: number, p: Patch, peak: number, ch: Channel): void {
    const c = this.ctx, decay = p.decay ?? 0.05, bursts = p.bursts ?? 1, gap = 0.011;
    const g = c.createGain(), t0 = t + (bursts - 1) * gap, metal = p.source === "metal";
    g.gain.setValueAtTime(0, t);
    for (let i = 0; i < bursts - 1; i++) { g.gain.linearRampToValueAtTime(peak, t + i * gap + 0.001); g.gain.exponentialRampToValueAtTime(peak * 0.15, t + i * gap + gap * 0.9); }
    g.gain.linearRampToValueAtTime(peak, t0 + Math.max(0.001, p.attack ?? 0.001));
    g.gain.exponentialRampToValueAtTime(0.0005, t0 + (p.attack ?? 0.001) + decay);
    // the filter (a high-pass at 7 kHz or so); the 808's metal, its six tones, through a band-pass at 10 kHz before it
    const filters = this.hitFilters(ch, () => {
      const f = c.createBiquadFilter(); f.type = p.filter ?? "highpass"; f.frequency.value = p.cutoff ?? 8000; f.Q.value = p.q ?? 0.7;
      if (!metal) return [f];
      const b = c.createBiquadFilter(); b.type = "bandpass"; b.frequency.value = 10000; b.Q.value = 0.6;
      return [b, f];
    });
    this.chain([this.noiseSource(t, t0 - t + decay + 0.06, metal), g], filters);
  }
  private snare(t: number, p: Patch, peak: number, ch: Channel): void {
    const c = this.ctx, decay = p.decay ?? 0.14, dest = ch.in;
    const hp = this.hitFilters(ch, () => { const f = c.createBiquadFilter(); f.type = "highpass"; f.frequency.value = p.cutoff ?? 1800; f.Q.value = p.q ?? 0.7; return [f]; });
    this.chain([this.noiseSource(t, decay + 0.05), this.env(t, peak, 0.001, decay)], hp);
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

  /** A synth note. Every knob past the original ones (levels, semis, custom harmonics, sub, noise, FM, the filter's own
   *  envelope, a second filter, vibrato, tremolo, the filter wobble's wave: the Music Studio's, 2026-10-22) is optional, and a
   *  patch without them plays exactly as it did. `held`: the note isn't released; its release is the caller's (the Studio's
   *  keyboard, `hold`). */
  private synth(t: number, p: Patch, peak: number, freqOrChord: number | number[], dur: number, ch: Channel, held?: Held): void {
    const freqs = Array.isArray(freqOrChord) ? freqOrChord : [freqOrChord], freq = freqs[freqs.length - 1];
    const lite = this.shedLevel >= 2, all = p.waves ?? ["sawtooth"], waves = lite ? all.slice(0, 1) : all, U = lite ? 1 : Math.max(1, Math.round(p.unison ?? 1)), n = waves.length * U;
    const c = this.ctx, attack = Math.max(0.002, p.attack ?? 0.005), decay = Math.max(0.01, p.decay ?? 0.2), sustain = p.sustain ?? 0.5, release = Math.max(0.01, p.release ?? 0.1);
    const end = held ? Infinity : t + Math.max(dur, attack), stop = end + release * (lite ? 1.5 : 2) + 0.02; // (its gain's fall has time constant release / 3: 2 releases is -52 dB, under everything)
    const g = c.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(peak / Math.sqrt(n), t + attack);
    if (end > t + attack) g.gain.setTargetAtTime((peak / Math.sqrt(n)) * sustain, t + attack, decay / 3);
    if (!held) g.gain.setTargetAtTime(0, end, release / 3);
    const nodes: AudioNode[] = [], sources: AudioScheduledSourceNode[] = [];
    let lfoOf: GainNode | null = null, wobbled: BiquadFilterNode | null = null, filter: BiquadFilterNode | null = null, fBase = 0;
    const fEnv = p.fAttack !== undefined || p.fDecay !== undefined || p.fSustain !== undefined || p.fRelease !== undefined;
    if (p.filter) {
      const f = c.createBiquadFilter(); f.type = p.filter; f.Q.value = p.q ?? 0.7; kRate(f.frequency);
      const base = p.cutoff ?? 2000, top = Math.min(18000, base + (p.envAmt ?? 0) * peak / Math.max(0.001, p.gain));
      if (fEnv) {
        // its own envelope: up to the top over fAttack, down to fSustain of the way over fDecay, back to the cutoff over fRelease
        const fa = Math.max(0, p.fAttack ?? 0), fd = Math.max(0.01, p.fDecay ?? attack + decay), fr = Math.max(0.01, p.fRelease ?? release);
        f.frequency.setValueAtTime(fa > 0.002 ? base : top, t);
        if (fa > 0.002 && top > base) f.frequency.exponentialRampToValueAtTime(top, t + fa);
        f.frequency.setTargetAtTime(base + (top - base) * Math.max(0, Math.min(1, p.fSustain ?? 0)), t + fa, fd / 3);
        if (!held) f.frequency.setTargetAtTime(base, end, fr / 3);
        filter = f; fBase = base;
      } else {
        f.frequency.setValueAtTime(top, t);
        if (top > base) f.frequency.exponentialRampToValueAtTime(base, t + attack + decay);
      }
      // a slow wobble of the filter: pads breathe (one wobble a part, shared by its notes and let go of each as it ends:
      // a wobble a note was a fifth of the pads' cost; foxtrot's measure, #523)
      if (p.lfoRate && p.lfoDepth) {
        if (!ch.lfo) {
          const osc = c.createOscillator(), depth = c.createGain();
          if (p.lfoWave) osc.type = p.lfoWave;
          osc.frequency.value = p.lfoRate; depth.gain.value = p.lfoDepth;
          if (!p.lfoWave || p.lfoWave === "sine") this.phased(osc, p.lfoRate);
          osc.connect(depth); osc.start(); ch.lfo = { osc, depth };
        }
        lfoOf = ch.lfo.depth; lfoOf.connect(f.frequency); wobbled = f;
      }
      nodes.push(f);
      if (p.filter2) { const f2 = c.createBiquadFilter(); f2.type = p.filter2; f2.frequency.value = p.cutoff2 ?? 400; f2.Q.value = p.q2 ?? 0.7; nodes.push(f2); }
    }
    if (p.drive) nodes.push(this.shaper(p.drive));
    nodes.push(g);
    // a tremolo: the note's level wobbling by tremDepth (0-1) at tremRate Hz
    if (p.tremRate && p.tremDepth) {
      const tg = c.createGain(), lo = c.createOscillator(), ld = c.createGain(), d = Math.max(0, Math.min(1, p.tremDepth));
      tg.gain.value = 1 - d / 2; lo.frequency.value = p.tremRate; ld.gain.value = d / 2;
      lo.connect(ld); ld.connect(tg.gain); lo.start(t); sources.push(lo); nodes.push(tg);
    }
    this.chain(nodes, ch.in);
    // every wave as `unison` voices, detuned across ±detune cents and spread across ±width in the
    // stereo field (outer voices widest), each starting at its own point in the cycle
    // the voices spread across ±width: those on each side through one panner at their mean place (a panner a voice was
    // the gate pad's, stab's and supersaw's biggest cost; foxtrot's measure, #523)
    const pans: number[] = [];
    for (let v = 0; v < n; v++) { const x = n > 1 ? (2 * v) / (n - 1) - 1 : 0; pans.push(p.width && n > 1 ? p.width * (v % 2 ? x : -x) : 0); }
    const side = (sign: number): AudioNode | null => {
      const on = pans.filter(q => Math.sign(q) === sign);
      if (!on.length) return null;
      const s = c.createStereoPanner(); s.pan.value = on.reduce((a, q) => a + q, 0) / on.length; s.connect(nodes[0]);
      return s;
    };
    const left = side(-1), right = side(1);
    // a middle voice among spread ones as a centred panner had it: -3 dB a side (a mono input alone would be copied whole to both)
    const mid = (left || right) && pans.some(q => q === 0) ? (() => { const m = c.createGain(); m.gain.value = Math.SQRT1_2; m.connect(nodes[0]); return m; })() : nodes[0];
    // a vibrato, one a note into every oscillator's detune: vibDepth cents at vibRate Hz, creeping in after vibDelay seconds
    let vib: GainNode | null = null;
    if (p.vibRate && p.vibDepth) {
      const lo = c.createOscillator(); vib = c.createGain(); lo.frequency.value = p.vibRate;
      const at = t + Math.max(0, p.vibDelay ?? 0);
      vib.gain.setValueAtTime(0, t); vib.gain.setValueAtTime(0, at); vib.gain.linearRampToValueAtTime(p.vibDepth, at + 0.25);
      lo.connect(vib); lo.start(t); sources.push(lo);
    }
    let last: OscillatorNode | null = null;
    for (const freq of freqs) {
      let v = 0;
      for (let wi = 0; wi < waves.length; wi++) {
        const w = waves[wi], wf = freq * Math.pow(2, (p.semis?.[wi] ?? 0) / 12), lvl = p.levels?.[wi] ?? 1;
        for (let u = 0; u < U; u++, v++) {
          const o = c.createOscillator(), x = n > 1 ? (2 * v) / (n - 1) - 1 : 0;
          if (w === "custom") o.setPeriodicWave(this.periodic(p.harmonics ?? [1]));
          else o.type = w;
          o.detune.value = (p.detune ?? 0) * x;
          if (p.glide && freqs.length === 1 && ch.lastFreq > 0 && ch.lastFreq !== freq) { o.frequency.setValueAtTime(ch.lastFreq * (wf / freq), t); o.frequency.exponentialRampToValueAtTime(wf, t + p.glide); }
          else if (p.bend) { o.frequency.setValueAtTime(wf * Math.pow(2, p.bend / 12), t); o.frequency.exponentialRampToValueAtTime(wf, t + (p.bendTime ?? 0.08)); }
          else o.frequency.value = wf;
          if (vib) vib.connect(o.detune);
          // FM: a sine at fmRatio times the note bending this oscillator by fmIndex times the note, falling to fmSustain of that over fmDecay
          if (p.fmRatio && p.fmIndex) {
            const m = c.createOscillator(), mg = c.createGain(), dev = wf * p.fmIndex;
            m.frequency.value = wf * p.fmRatio;
            mg.gain.setValueAtTime(dev, t);
            if (p.fmDecay) mg.gain.setTargetAtTime(dev * Math.max(0, p.fmSustain ?? 0), t, p.fmDecay / 3);
            m.connect(mg); mg.connect(o.frequency); m.start(t); sources.push(m);
          }
          const to = pans[v] < 0 ? left! : pans[v] > 0 ? right! : mid;
          if (lvl !== 1) { const lg = c.createGain(); lg.gain.value = lvl; o.connect(lg); lg.connect(to); } else o.connect(to);
          o.start(t + (U > 1 ? (u * 0.0007) % 0.004 : 0)); sources.push(o);
          last = o;
        }
      }
      // a sine an octave under the note, centred
      if (p.sub) {
        const o = c.createOscillator(), sg = c.createGain(); o.frequency.value = freq / 2; sg.gain.value = p.sub;
        if (vib) vib.connect(o.detune);
        o.connect(sg); sg.connect(nodes[0]); o.start(t); sources.push(o);
      }
    }
    // noise into the filter beside the oscillators
    if (p.noise) { const ng = c.createGain(); ng.gain.value = p.noise; const s = this.noiseSource(t, held ? 3600 : stop - t); s.connect(ng); ng.connect(nodes[0]); if (held) sources.push(s); }
    if (!held) for (const s of sources) s.stop(stop);
    else held.push({ gain: g, filter, fBase, fRelease: Math.max(0.01, p.fRelease ?? release), release, sources });
    if (lfoOf && wobbled && last) { const l = lfoOf, f = wobbled; last.onended = () => { try { l.disconnect(f.frequency); } catch { /* gone */ } }; }
    ch.lastFreq = freq;
  }

  /** A custom wave from its harmonics' levels (the first the fundamental), made once a set. */
  private periodics = new Map<string, PeriodicWave>();
  private periodic(h: number[]): PeriodicWave {
    const key = h.join(",");
    let w = this.periodics.get(key);
    if (!w) {
      const real = new Float32Array(h.length + 1), imag = new Float32Array(h.length + 1);
      h.forEach((a, i) => { imag[i + 1] = a; });
      this.periodics.set(key, w = this.ctx.createPeriodicWave(real, imag));
    }
    return w;
  }

  /** A sung note on the FOF voice (Ed, 2026-10-11): its pool of voices on the part's channel, the vowel morphing to the next
   *  through it; a phrase (after a rest of a beat or more) swelling in and the last one's end frozen, as the voice effects
   *  ask; an octave-up double if asked. Until the worklet's loaded, or with the sound shed (shed.ts, step 2), the formant
   *  voice sings it instead. */
  private fof(t: number, p: Patch, peak: number, freq: number, dur: number, step: number, ch: Channel): void {
    if (!fofLoaded(this.ctx) || this.shedLevel >= 2) {
      void fofReady(this.ctx);
      this.voice(t, { ...p, kind: "voice", formantShift: p.voiceType === "alto" || p.voiceType === "tenor" ? 1.02 : 1.18, q: 9, vibrato: 20 }, peak, freq, dur, step, ch);
      return;
    }
    const settings = { type: FOF_TYPES[p.voiceType ?? "soprano"] ?? 3, detune: p.detune ?? 9, vibrato: p.vibrato ?? 22, vibratoRate: p.vibratoRate ?? 5.2, vibratoDelay: p.vibratoDelay ?? 0.35, breath: p.breath ?? 0.06, attack: p.attack ?? 0.12, release: p.release ?? 0.5 };
    ch.fof ??= new FofVoices(this.ctx, ch.in, 6, settings);
    const vs = p.vowels?.length ? p.vowels : ["ah"], k = Math.floor(step / Math.max(1, p.vowelStep ?? 1));
    const v = FOF_VOWELS[vs[k % vs.length]] ?? 0, vTo = dur > 0.6 ? FOF_VOWELS[vs[(k + 1) % vs.length]] ?? v : undefined, gain = Math.min(1, peak);
    const fx = ch.fx, beat = 60 / Math.max(40, this.bpmNow);
    if (fx && (ch.lastEnd === undefined || t - ch.lastEnd > beat)) {
      if (ch.lastEnd !== undefined) fx.release(ch.lastEnd + (p.release ?? 0.5) * 0.3);
      if (fx.s.swells > 0) {
        if (!ch.swell) { const sg = this.ctx.createGain(); sg.gain.value = 0; sg.connect(fx.wetIn); ch.swell = { voices: new FofVoices(this.ctx, sg, 2, { ...settings, attack: 1.2, release: 0.05 }), gain: sg }; }
        const len = Math.min(4 * beat, Math.max(beat, t - (ch.lastEnd ?? t - 4 * beat) - 0.1));
        ch.swell.voices.note(t - len, freq, len, Math.min(1, gain * 0.9), v);
        fx.swellEnvelope(ch.swell.gain, t, len, 1);
      }
    }
    ch.fof.note(t, freq, dur, gain, v, vTo);
    const double = (fx?.s.octave ?? 0) + (p.octave ?? 0);
    if (double > 0) ch.fof.note(t, freq * 2, dur, Math.min(1, gain * double), v, vTo);
    ch.lastEnd = t + dur;
  }

  /** A sung note on the vocal-tract voice (Ed, 2026-10-14: Pink Trombone's physics in a worklet, A/B'd against the sampled
   *  alto): its vowel from the patch's in turn through the phrase, breathier by the patch's `breath` (lower tenseness), the
   *  phrase's effects told where phrases start and end as the sampled voice tells them. The formant voice sings until the
   *  worklet's loaded, or with the sound shed to step 2. */
  private tract(t: number, p: Patch, peak: number, freq: number, dur: number, step: number, ch: Channel): void {
    if (!tractLoaded(this.ctx) || this.shedLevel >= 2) {
      void tractReady(this.ctx);
      this.voice(t, { ...p, kind: "voice", formantShift: 1.02, q: 9, vibrato: 16 }, peak, freq, dur, step, ch);
      return;
    }
    const b = Math.min(1, Math.max(0, p.breath ?? 0)), [t0, t1] = p.tense ?? [0.45, 0.72], tense: [number, number] = [Math.max(0.1, t0 - 0.3 * b), Math.max(0.15, t1 - 0.3 * b)];
    ch.tract ??= new TractVoices(this.ctx, ch.in, 3, { tractLength: p.tractLength ?? 40, tense, vibrato: p.vibrato ?? 0.012, vibratoRate: p.vibratoRate ?? 5.2, vibratoAfter: p.vibratoAfter ?? 0.3, glide: p.glide ?? 0.09, wander: p.wander ?? 0.15 });
    const fx = ch.fx, beat = 60 / Math.max(40, this.bpmNow), phrase = ch.lastEnd === undefined || t - ch.lastEnd > beat;
    if (fx && phrase && ch.lastEnd !== undefined) fx.release(ch.lastEnd);
    ch.sung = phrase ? 0 : (ch.sung ?? 0) + 1;
    ch.lastEnd = Math.max(ch.lastEnd ?? -Infinity, t + dur);
    const vs = p.vowels?.length ? p.vowels : ["ah"], vowel = vs[(ch.sung ?? 0) % vs.length];
    ch.tract.note(t, 69 + 12 * Math.log2(freq / 440), dur * 0.97, Math.min(1, peak), vowel);
  }

  /** A recorded phrase's swell into its effects' reverbs (see sampled). */
  private swellInto(fx: VoiceFx, rec: AudioBuffer, rate: number, t: number, swell: number, peak: number): void {
    const c = this.ctx;
    if (!(fx.s.swells > 0 && t - swell >= c.currentTime)) return;
    const sw = c.createBufferSource(), sg = c.createGain();
    sw.buffer = rec; sw.playbackRate.value = rate; sw.loop = true; sw.loopStart = Math.min(0.3, rec.duration / 4); sw.loopEnd = Math.min(1.6, rec.duration);
    sw.connect(sg).connect(fx.wetIn); fx.swellEnvelope(sg, t, swell, peak); sw.start(t - swell); sw.stop(t + 0.05);
  }

  /** A sung note from a recording (Ed, 2026-10-11: the game's singer, "Recorded + ethereal"): the recording retuned to it
   *  (its own length at most), through a presence lift; a phrase (after a rest of a beat or more) swelling in, the last one's
   *  end frozen, as the voice effects ask. Until the recording's loaded, the formant voice sings it. */
  private sampled(t: number, p: Patch, peak: number, freq: number, dur: number, step: number, ch: Channel, held?: Held): void {
    // the recording: the sample set's nearest note (bent at most a semitone), else the one recording at its root
    const want = 69 + 12 * Math.log2(freq / 440), near = p.notes?.length ? p.notes.reduce((a, b) => Math.abs(b.midi - want) < Math.abs(a.midi - want) ? b : a) : null;
    const rec = this.recordings.get(near?.sample ?? p.sample ?? "") ?? (near ? this.recordings.get(p.sample ?? "") : undefined), root = near && this.recordings.has(near.sample) ? near.midi : p.root ?? 69;
    if (!rec) { this.voice(t, { ...p, kind: "voice", vowels: ["ah", "oh", "ee", "eh", "oo"], formantShift: 1.18, q: 10, vibrato: 24, attack: 0.06, decay: 0.4, sustain: 0.85, release: 0.3 }, peak, freq, dur, step, ch); return; }
    const c = this.ctx, rate = freq / mtof(root), skip = Math.min(p.skip ?? 0, rec.duration / 2), len = held ? 3600 : Math.min(dur * 0.97, (rec.duration - skip - 0.05) / rate);
    if (len < 0.05) return;
    if (!ch.presence) { ch.presence = c.createBiquadFilter(); ch.presence.type = "peaking"; ch.presence.frequency.value = 3000; ch.presence.Q.value = 0.8; ch.presence.gain.value = p.presence ?? 0; ch.presence.connect(ch.in); }
    const fx = ch.fx, beat = 60 / Math.max(40, this.bpmNow), onBus = !fx && this.stems && ch.part ? this.sink : null; // (a renderer's: its effects the bus's)
    if ((fx || onBus) && (ch.lastEnd === undefined || t - ch.lastEnd > beat)) {
      if (ch.lastEnd !== undefined) { if (fx) fx.release(ch.lastEnd); else onBus!.fxRelease?.(ch.part!, ch.lastEnd); }
      const swell = Math.min(4 * beat, Math.max(beat, t - (ch.lastEnd ?? t - 4 * beat) - 0.1));
      if (fx) this.swellInto(fx, rec, rate, t, swell, peak); else onBus!.fxSwell?.(ch.part!, rec, rate, t, swell, peak);
    }
    const phrase = ch.lastEnd === undefined || t - ch.lastEnd > beat;
    ch.lastEnd = Math.max(ch.lastEnd ?? -Infinity, t + (held ? 0.5 : len));
    ch.sung = phrase ? 0 : (ch.sung ?? 0) + 1;
    const src = c.createBufferSource(), g = c.createGain();
    src.buffer = rec; src.playbackRate.value = rate;
    // the swell (Ed, 2026-10-14: "more dynamic range"): each note rising from nothing over its first `swell` share and fading
    // over its last (a 30 ms ramp with none), so a held note breathes rather than switches on
    const sw = Math.min(0.5, Math.max(0, p.swell ?? 0)), rise = Math.max(0.03, Math.min(len * sw, 1.5)), fall = Math.max(0.08, Math.min(len * sw, 1.5));
    const envelope = (gain: AudioParam, top: number) => {
      gain.setValueAtTime(0, t); gain.linearRampToValueAtTime(top, t + (held ? 0.12 : rise));
      if (!held) { gain.setValueAtTime(top, t + Math.max(rise, len - fall)); gain.linearRampToValueAtTime(0, t + len); }
    };
    envelope(g.gain, peak);
    // its vowel (Ed, 2026-10-11: "stick to aa and oo"), the patch's taken in turn through the phrase: the recording sings a dark
    // vowel (its partials strong to 800 Hz, weak past 1 kHz), opened to "aa" by lifts at aa's formants (800 and 1150 Hz) or closed
    // to "oo" by a low-pass; and its onset ("l": the filter opening from a muffle over its first 80 ms, "laa")
    const vs = p.vowels?.length ? p.vowels : [], vowel = vs.length ? vs[ch.sung % vs.length] : "";
    const nodes: AudioNode[] = [src, g];
    src.connect(g);
    let last: AudioNode = g;
    const open = vowel === "oo" ? 750 : 16000;
    if (p.onset === "l" || vowel === "oo") {
      const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.Q.value = 0.7;
      if (p.onset === "l") { lp.frequency.setValueAtTime(420, t); lp.frequency.exponentialRampToValueAtTime(open, t + 0.08); } else lp.frequency.value = open;
      last.connect(lp); last = lp; nodes.push(lp);
    }
    if (vowel === "aa" || vowel === "ah") for (const [f, db] of [[800, 4], [1150, 8]]) {
      const pk = c.createBiquadFilter(); pk.type = "peaking"; pk.frequency.value = f; pk.Q.value = 2.2; pk.gain.value = db;
      last.connect(pk); last = pk; nodes.push(pk);
    }
    // (held: the recording's steady middle looped till it's let go)
    if (held) { src.loop = true; src.loopStart = Math.min(skip + 0.15, rec.duration / 3); src.loopEnd = Math.max(src.loopStart + 0.3, rec.duration - 0.1); src.start(t, skip); }
    last.connect(ch.presence);
    if (!held) src.start(t, skip, len * rate + 0.02);
    // breath (Ed, 2026-10-14: "gentler, breathier"): shaped noise under the note, through the same swell, at the patch's level
    if ((p.breath ?? 0) > 0) {
      const n = c.createBufferSource(), bp = c.createBiquadFilter(), bg = c.createGain();
      n.buffer = this.noise; n.loop = true; bp.type = "bandpass"; bp.frequency.value = 2400; bp.Q.value = 0.9;
      envelope(bg.gain, peak * (p.breath ?? 0));
      n.connect(bp).connect(bg).connect(ch.presence); n.start(t);
      if (held) held.push({ gain: bg, filter: null, fBase: 0, fRelease: 0.01, release: 0.25, sources: [n] }); else n.stop(t + len + 0.02);
      nodes.push(n, bp, bg);
    }
    if (held) held.push({ gain: g, filter: null, fBase: 0, fRelease: 0.01, release: Math.max(0.15, p.release ?? 0.35), sources: [src] });
    src.onended = () => { for (const n of nodes) n.disconnect(); };
  }

  /** A sung note, synthesised: a buzzy source (saws, a touch of breath) through three formant
   *  band-passes for its vowel (chosen by the note, from the patch's vowels), with a vibrato that
   *  creeps in; unison voices spread wide make a choir. */
  private voice(t: number, p: Patch, peak: number, freq: number, dur: number, step: number, ch: Channel): void {
    const c = this.ctx, vowels = p.vowels?.length ? p.vowels : ["ah"], name = vowels[Math.floor(Math.abs(step) / Math.max(1, p.vowelStep ?? 4)) % vowels.length], vowel = VOWELS[name] ? name : "ah";
    const U = this.shedLevel >= 2 ? 1 : Math.max(1, Math.round(p.unison ?? 1)), attack = Math.max(0.005, p.attack ?? 0.08), decay = Math.max(0.01, p.decay ?? 0.3), sustain = p.sustain ?? 0.8, release = Math.max(0.02, p.release ?? 0.3);
    const end = t + Math.max(dur, attack), stop = end + release * (this.shedLevel >= 2 ? 1.5 : 2) + 0.02;
    // The part's own vowels (three formant band-passes each) and its vibrato, made once and shared by its notes: each note's
    // envelope goes in before the formants (the same sound; a choir note's 3 band-passes and vibrato were most of the
    // choir's cost; foxtrot's measure, #523).
    const bank = (ch.banks ??= new Map()).get(vowel) ?? (() => {
      const into = c.createGain();
      for (const [f, a] of VOWELS[vowel]) {
        const bp = c.createBiquadFilter(), bg = c.createGain();
        bp.type = "bandpass"; bp.frequency.value = f * (p.formantShift ?? 1); bp.Q.value = p.q ?? 8; bg.gain.value = a * 3;
        into.connect(bp); bp.connect(bg); bg.connect(ch.in);
      }
      ch.banks!.set(vowel, into);
      return into;
    })();
    if (!ch.vib) { ch.vib = c.createOscillator(); ch.vib.frequency.value = 5.2; this.phased(ch.vib, 5.2); ch.vib.start(); (ch.running ??= []).push(ch.vib); }
    const g = c.createGain(), lvl = peak / Math.sqrt(U);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(lvl, t + attack);
    if (end > t + attack) g.gain.setTargetAtTime(lvl * sustain, t + attack, decay / 3);
    g.gain.setTargetAtTime(0, end, release / 3);
    g.connect(bank);
    // vibrato: a few cents, creeping in after the attack (the part's wobble, this note's depth)
    const vg = c.createGain();
    vg.gain.setValueAtTime(0, t); vg.gain.linearRampToValueAtTime(p.vibrato ?? 15, t + Math.min(0.6, attack + 0.25));
    ch.vib.connect(vg);
    // (the outer voices through a panner a side, the middle one straight in: as synth())
    const spread = !!p.width && U > 1, xs = Array.from({ length: U }, (_, u) => U > 1 ? (2 * u) / (U - 1) - 1 : 0);
    const sideOf = (sign: number): AudioNode => {
      const on = xs.filter(x => Math.sign(x) === sign), sp = c.createStereoPanner();
      sp.pan.value = p.width! * on.reduce((a, x) => a + x, 0) / on.length; sp.connect(g); return sp;
    };
    const left = spread ? sideOf(-1) : null, right = spread ? sideOf(1) : null;
    const mid = spread && xs.includes(0) ? (() => { const m = c.createGain(); m.gain.value = Math.SQRT1_2; m.connect(g); return m; })() : g; // (as synth())
    let last: OscillatorNode | null = null;
    for (let u = 0; u < U; u++) {
      const o = c.createOscillator(), x = xs[u];
      o.type = "sawtooth"; o.frequency.value = freq; o.detune.value = (p.detune ?? 0) * x; kRate(o.detune);
      vg.connect(o.detune);
      o.connect(spread && x < 0 ? left! : spread && x > 0 ? right! : mid); o.start(t); o.stop(stop);
      last = o;
    }
    // its breath: a noise of its own (a shared one sums differently over overlapping notes: 1 to 2 dB on the mix)
    if (p.breath) { const h = c.createBiquadFilter(); h.type = "highpass"; h.frequency.value = 2500; this.chain([this.noiseSource(t, stop - t), h, this.env(t, p.breath, attack, Math.max(dur, 0.05) + release)], bank); }
    // the note over (on the audio clock): let go of the part's vibrato
    if (last) { const v = ch.vib; last.onended = () => { try { v.disconnect(vg); } catch { /* gone */ } }; }
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

  /** The impulses made, by their length: the shed's short reverb (level 3) and the full one swap without being made again. */
  private impulses = new Map<number, AudioBuffer>();
  private impulse(seconds: number): AudioBuffer {
    const had = this.impulses.get(seconds); if (had) return had;
    // decorrelated noise in each ear, after a short pre-delay, decaying, and darkening as it goes
    // (a one-pole low-pass closing over the tail, as air and walls soak up the highs)
    // (The envelope and the low-pass's coefficient come from a table of ENV steps over the tail, not a Math.pow a sample: the
    // 2.4 s impulse and the circle's 3.8 s one were 135 ms on the page's thread at the first speaker, and again when the sound
    // shed to level 3 (the stall hunt, 2026-10-13).)
    const c = this.ctx, rate = c.sampleRate, pre = Math.floor(0.015 * rate), n = Math.max(pre + 1, Math.floor(seconds * rate)), b = c.createBuffer(2, n, rate);
    const ENV = 4096, env = new Float32Array(ENV + 1), coef = new Float32Array(ENV + 1);
    for (let j = 0; j <= ENV; j++) { const k = j / ENV, a = 0.85 - 0.75 * k; coef[j] = a; env[j] = Math.pow(1 - k, 2.5) * (1 + 0.6 * (1 - a)); }
    const perSample = ENV / Math.max(1, n - pre);
    let r = 777;
    for (let ch = 0; ch < 2; ch++) {
      const d = b.getChannelData(ch);
      let y = 0;
      for (let i = pre; i < n; i++) {
        r = (Math.imul(r, 1664525) + 1013904223) >>> 0;
        const j = Math.min(ENV, Math.floor((i - pre) * perSample)), a = coef[j];
        y += a * ((r / 4294967296) * 2 - 1 - y);
        d[i] = y * env[j];
      }
    }
    this.impulses.set(seconds, b);
    return b;
  }

}

/** An AudioParam worked out once a 128-sample block rather than every sample (about 3 ms: nothing heard in a filter's sweep,
 *  a pad's slow wobble or a vibrato): a filter whose frequency moves recomputes its coefficients every sample otherwise,
 *  the music's biggest steady cost on the audio thread (Ed's under-runs, 2026-10-07). */
function kRate(p: AudioParam): void { try { p.automationRate = "k-rate"; } catch { /* (an older browser: as it was) */ } }
