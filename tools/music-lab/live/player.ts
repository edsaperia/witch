// The live Music Lab's player: the game's own music engine (src/platform/audio/musicEngine.ts) playing in real time from
// the style, with the research ingredients laid over it as the A/B renders laid them (tools/music-lab/ab.ts), every one
// following the sliders while it plays. Lab-only: the engine is the game's, untouched; the lab catches its notes before they
// sound (the CC0 kit for the synth drums, a voice for the sung melody) and its bars as they're scheduled (the frame drums,
// the drone's key, the recorded voices, the witch-house beat), and sets each part's level on its channel.
import { MusicEngine } from "../../../src/platform/audio/musicEngine";
import { newBeatClock, type BeatClock } from "../../../src/rules/beat";
import { formClock, type planBlock, type MusicCue } from "../../../src/rules/musicPlan";
import { arcStep, formChord, musicSeed, resolveSection, tuneSeed, type MusicStyle, type NoteEvent } from "../../../src/rules/musicScore";
import { BREAKDOWN, FRAMES, FRAME_IDS, frameHit, KIT, PITCH, PRESENCE_DB, VOCALISE_GAIN, VOWELS } from "../ingredients";
import { heard, type LabState } from "./settings";

type Hooked = {
  play: (ev: NoteEvent, t: number, dur: number, sps: number, chord?: number[]) => void;
  step: (cue: MusicCue, step: number, t: number, sps: number) => void;
  channels: Map<string, { in: GainNode }>;
};
type BlockPlan = ReturnType<typeof planBlock>;
const mtof = (m: number) => 440 * 2 ** ((m - 69) / 12);

export class Player {
  readonly ctx: AudioContext;
  private engine: MusicEngine | null = null;
  private style!: MusicStyle;
  private clock!: BeatClock;
  private startedAt = 0;
  /** Everything into `bus`, then the tape, then a safety limiter. */
  private bus: GainNode;
  private master: GainNode;
  private wow: GainNode; private flutter: GainNode; private tapeTone: BiquadFilterNode; private crackle: GainNode;
  private droneGain: GainNode; private droneOsc: OscillatorNode[] = [];
  private presence: BiquadFilterNode;
  private throatNext = 0;
  private wasBreakdown = false;
  /** Pink Trombone's notes, sung by a worker, by pitch, length and vowel. */
  private sung = new Map<string, AudioBuffer | "pending">();
  private worker: Worker | null = null;
  private waiting = new Map<string, { at: number; dur: number }[]>();
  private rr = 0;
  /** What's playing now, for the page. */
  now: { wave: string; section: string; bar: number; feel: string; arc: number } | null = null;

  constructor(private state: () => LabState, private samples: Record<string, AudioBuffer>, ctx: AudioContext) {
    this.ctx = ctx;
    const c = ctx;
    this.bus = c.createGain();
    // the tape: wow and flutter (a short delay swept slowly and quickly), its top rolled off, crackle and hiss
    const d = c.createDelay(0.1), wowOsc = c.createOscillator(), flOsc = c.createOscillator();
    this.wow = c.createGain(); this.flutter = c.createGain(); this.wow.gain.value = 0; this.flutter.gain.value = 0;
    d.delayTime.value = 0.012; wowOsc.frequency.value = 0.45; flOsc.frequency.value = 6.3;
    wowOsc.connect(this.wow).connect(d.delayTime); flOsc.connect(this.flutter).connect(d.delayTime); wowOsc.start(); flOsc.start();
    this.tapeTone = c.createBiquadFilter(); this.tapeTone.type = "lowpass"; this.tapeTone.frequency.value = 20000;
    this.master = c.createGain(); this.master.gain.value = 0;
    const limit = c.createDynamicsCompressor();
    limit.threshold.value = -3; limit.knee.value = 2; limit.ratio.value = 20; limit.attack.value = 0.002; limit.release.value = 0.12;
    this.bus.connect(d).connect(this.tapeTone).connect(this.master).connect(limit).connect(c.destination);
    const n = c.createBuffer(1, 4 * c.sampleRate, c.sampleRate), x = n.getChannelData(0);
    let r = 12345; const rnd = () => ((r = (Math.imul(r, 1664525) + 1013904223) >>> 0) / 4294967296);
    for (let i = 0; i < x.length; i++) { x[i] = (rnd() - 0.5) * 0.004; if (rnd() < 6 / c.sampleRate) { const a = (rnd() - 0.5) * 0.35; for (let k = 0; k < 24 && i + k < x.length; k++) x[i + k] += a * Math.exp(-k / 5); } }
    const cr = c.createBufferSource(), hp = c.createBiquadFilter(); cr.buffer = n; cr.loop = true; hp.type = "highpass"; hp.frequency.value = 1200;
    this.crackle = c.createGain(); this.crackle.gain.value = 0;
    cr.connect(hp).connect(this.crackle).connect(this.master); cr.start();
    // the drone: the tonic and its fifth, low, held, a slow filter breathing (organum)
    this.droneGain = c.createGain(); this.droneGain.gain.value = 0;
    const lp = c.createBiquadFilter(), lfo = c.createOscillator(), lg = c.createGain();
    lp.type = "lowpass"; lp.frequency.value = 700; lp.Q.value = 2; lfo.frequency.value = 0.08; lg.gain.value = 300;
    lfo.connect(lg).connect(lp.frequency); lfo.start();
    for (const det of [-4, 4, 0, 2]) { const o = c.createOscillator(); o.type = "sawtooth"; o.detune.value = det; o.connect(lp); o.start(); this.droneOsc.push(o); }
    lp.connect(this.droneGain).connect(this.bus);
    this.presence = c.createBiquadFilter(); this.presence.type = "peaking"; this.presence.frequency.value = 3000; this.presence.Q.value = 0.8; this.presence.gain.value = PRESENCE_DB;
    this.presence.connect(this.bus);
  }

  get playing(): boolean { return this.engine !== null; }

  /** A night in miniature (the set view): `bars` bars a wave, `waves` of them; null: the passage. */
  private night: { bars: number; waves: number } | null = null;

  /** Start from the top of the passage with this style (its tempo, seed and wave from the settings); with `night`, the whole
   *  night in miniature (the style's arc a night's set: a wave every `bars` bars, at the style's tempo: the gameplay sets the
   *  game's, Ed 2026-10-11, so the lab's bpm is a preview of what it might be). */
  start(style: MusicStyle, night: { bars: number; waves: number } | null = null): void {
    this.stop();
    const s = this.state();
    this.style = style;
    this.night = night;
    this.clock = newBeatClock(style.bpm);
    const e = new MusicEngine(this.ctx, this.bus, style, s.seed), h = e as unknown as Hooked;
    const play = h.play.bind(e), step = h.step.bind(e);
    h.play = (ev, t, dur, sps, chord) => this.note(ev, t, dur, sps, chord, play);
    h.step = (cue, n, t, sps) => { step(cue, n, t, sps); if (n % 16 === 0 && e.current?.step === n) this.bar(Math.floor(n / 16), t, sps, e.current.plan, cue); };
    this.engine = e;
    this.startedAt = this.ctx.currentTime + 0.1;
    this.throatNext = 0; this.wasBreakdown = false;
    this.master.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master.gain.setTargetAtTime(1, this.ctx.currentTime, 0.01);
  }

  /** Stop at once (what's scheduled ahead faded out with the master). */
  stop(): void {
    if (!this.engine) return;
    const t = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(t); this.master.gain.setTargetAtTime(0, t, 0.02);
    const old = this.engine; this.engine = null; this.now = null;
    // (its notes already scheduled ring on into the silent master; let it go once they're done)
    setTimeout(() => (old as unknown as { out: GainNode }).out?.disconnect(), 3000);
  }

  /** A new style while playing (the mode, the victory's knobs, witch house): from the next block. */
  setStyle(style: MusicStyle): void { this.style = style; this.engine?.setStyle(style); }

  cue(): MusicCue {
    const s = this.state(), N = this.night;
    if (N) return { waves: Array.from({ length: N.waves }, (_, i) => (i + 1) * N.bars), nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0 };
    return { waves: Array.from({ length: s.wave }, () => 0), nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0, forceWave: s.wave, forceSection: s.section || undefined };
  }

  /** Each frame: schedule what's due, the levels from the sliders. */
  update(): void {
    const s = this.state(), t = this.ctx.currentTime, L = (name: keyof LabState["layers"]) => heard(s, name, s.layers[name]);
    const tape = L("tape");
    this.wow.gain.setTargetAtTime(0.0022 * tape, t, 0.05); this.flutter.gain.setTargetAtTime(0.00025 * tape, t, 0.05);
    this.tapeTone.frequency.setTargetAtTime(tape > 0 ? Math.max(4000, 20000 - 10500 * Math.min(1.5, tape)) : 20000, t, 0.05);
    this.crackle.gain.setTargetAtTime(tape, t, 0.05);
    this.droneGain.gain.setTargetAtTime(0.09 * L("drone"), t, 0.08);
    if (!this.engine) return;
    const h = this.engine as unknown as Hooked;
    for (const [part, ch] of h.channels) if (!part.startsWith("circle:")) {
      const lvl = part === this.style.form?.sung.part ? (s.voice === "synth" ? L("vocalise") : 0) : heard(s, part, s.parts[part] ?? 1);
      ch.in.gain.setTargetAtTime(lvl, t, 0.02);
    }
    const game = Math.max(0, t - this.startedAt);
    this.engine.update(this.cue(), game, this.clock, true, 1.2); // (1.2 s ahead: a hidden tab's timers run once a second)
  }

  /** A note the engine is about to play: the kit's sample for a synth drum, a voice for the sung melody, else as it was. */
  private note(ev: NoteEvent, t: number, dur: number, sps: number, chord: number[] | undefined, play: Hooked["play"]): void {
    const s = this.state(), S = this.style, part = ev.part;
    if (S.form && part === S.form.sung.part && s.voice !== "synth") { this.sing(ev, t, dur); return; }
    if (s.witchHouse && S.parts[part]?.role === "drum") return; // (the half-time beat instead)
    const kit = heard(s, "kit", s.layers.kit), k = KIT[part];
    if (kit > 0 && k) {
      const id = k.soft && ev.vel < 0.6 ? k.soft : k.ids[this.rr++ % k.ids.length];
      this.hit(id, t, k.gain * ev.vel * kit * heard(s, part, s.parts[part] ?? 1), 1, part === "hat" ? 0.15 : part === "shaker" ? -0.2 : 0);
      return;
    }
    play(ev, t, dur, sps, chord);
  }

  /** A bar as it's scheduled: its tonic for the drone, its frame drums, voices and witch-house beat. */
  private bar(bar: number, t: number, sps: number, plan: BlockPlan, cue: MusicCue): void {
    const s = this.state(), S = this.style, sec = resolveSection(S, plan.section), L = (n: keyof LabState["layers"]) => heard(s, n, s.layers[n]);
    const a = arcStep(S, plan.arc), tr = (a.transpose ?? 0) + (sec.transpose ?? 0), sc = S.scales[a.scale ?? S.scale] ?? S.scales.dorian;
    const tonic = S.root + tr;
    const f = formClock(S, cue, bar), ch = S.form ? formChord(S, tuneSeed(musicSeed(this.engine!.seed, f.n), a.tune ?? 0), bar - f.start) : { root: 0 };
    const chordRoot = tonic + sc[((ch.root % 7) + 7) % 7] + 12 * Math.floor(ch.root / 7);
    const breakdown = BREAKDOWN.test(plan.section);
    this.now = { wave: this.night ? `wave ${plan.arc} · ${a.name}` : `${plan.arc + 1} · ${a.name}`, section: plan.section, bar: bar - plan.start + 1, feel: sec.feel ?? "", arc: plan.arc };
    for (const [i, o] of this.droneOsc.entries()) o.frequency.setTargetAtTime(mtof(tonic + [12, 12, 19, 24][i]), t, 0.05);
    const barLen = 16 * sps;
    // frame drums: the ritual pattern over the beat, but in the breakdowns
    const frames = L("frames");
    if (frames > 0 && !breakdown) {
      const pat = FRAMES[bar % FRAMES.length];
      for (let i = 0; i < 16; i++) { const c = pat[i]; if (c !== ".") { const fh = frameHit(c); this.hit(FRAME_IDS[c], t + i * sps + (i % 2 ? S.swing * sps : 0), fh.gain * frames, 1, fh.pan); } }
    }
    // the witch-house beat: half time (the kick on 1, the snare and clap on 3), trap hats with rolls, an 808-ish sub
    if (s.witchHouse && !breakdown) {
      const drums = heard(s, "witchHouse", 1);
      for (const i of [0, 10]) {
        const at = t + i * sps; this.hit("bass-drum", at, 0.8 * drums);
        const sub = this.ctx.createOscillator(), g = this.ctx.createGain();
        sub.frequency.setValueAtTime(110, at); sub.frequency.exponentialRampToValueAtTime(mtof(chordRoot), at + 0.12);
        g.gain.setValueAtTime(0.5 * drums, at); g.gain.exponentialRampToValueAtTime(0.001, at + 1.4);
        sub.connect(g).connect(this.bus); sub.start(at); sub.stop(at + 1.5);
      }
      this.hit("snare", t + 8 * sps, 0.55 * drums); this.hit("clap-1", t + 8 * sps, 0.45 * drums);
      for (let i = 0; i < 16; i++) { if (bar % 4 === 3 && i >= 12) { for (let k = 0; k < 3; k++) this.hit("hat-closed-soft", t + (i + k / 3) * sps, 0.25 * drums); } else this.hit(i % 4 === 2 ? "hat-closed" : "hat-closed-soft", t + i * sps, 0.3 * drums); }
    }
    // the recorded choir: the crowd's "uh" on each two bars' chord root and its fifth (quieter in a drop)
    const choir = L("choir");
    if (choir > 0 && bar % 2 === 0) {
      const quiet = /drop|Drop/.test(plan.section) ? 0.5 : 1;
      let root = chordRoot; while (root < PITCH.crowd - 6) root += 12; while (root > PITCH.crowd + 6) root -= 12;
      for (const [m, g, pan] of [[root, 0.32, -0.3], [root + 7, 0.2, 0.3]] as [number, number, number][]) {
        const rate = 2 ** ((m - PITCH.crowd) / 12);
        this.seg("crowd-uh-f", t, 1.5, Math.min(2 * barLen, 4.3 / rate), rate, g * quiet * choir, pan, 0.4);
      }
    }
    // whispers as a breakdown begins
    const whispers = L("whispers");
    if (whispers > 0 && breakdown && !this.wasBreakdown) this.seg("whispers", t, 0, 9, 1, 0.3 * whispers, 0.2, 0.8);
    this.wasBreakdown = breakdown;
    // a throat-sung drone on the tonic (the cave's an octave up; the kargyraa at the root for witch house), overlapping
    const throat = L("throat");
    if (throat > 0 && t + barLen > this.throatNext) {
      const [id, pitch, len] = s.witchHouse ? ["kargyraa", PITCH.kargyraa, 10] : ["throat-cave", PITCH.throatCave, 12];
      const rate = 2 ** (((s.witchHouse ? tonic : tonic + 12) - pitch) / 12), at = Math.max(t, this.throatNext);
      this.seg(id, at, 0.6, len / rate - 0.6, rate, 0.22 * throat, 0, 1);
      this.throatNext = at + len / rate - 2;
    }
  }

  /** The sung melody by Pink Trombone (a worker sings each note once) or the recorded woman's note retuned. */
  private sing(ev: NoteEvent, t: number, dur: number): void {
    const s = this.state(), lvl = heard(s, "vocalise", s.layers.vocalise) * VOCALISE_GAIN;
    if (lvl <= 0 || ev.midi === null) return;
    if (s.voice === "recorded") {
      const b = this.samples["female-note"], rate = 2 ** ((ev.midi - PITCH.femaleNote) / 12), len = Math.min(dur * 0.97, 1.75 / rate);
      if (!b || len < 0.05) return;
      this.voiced(b, t, len, rate, lvl);
      return;
    }
    // Pink Trombone: a note a pitch, length (in sixteenths) and vowel; sung once, kept
    const steps = Math.max(1, Math.round(dur / (60 / this.style.bpm / 4))), vowel = VOWELS[(ev.step + ev.midi) % VOWELS.length];
    const key = `${ev.midi}:${steps}:${vowel}`, got = this.sung.get(key), len = Math.max(0.12, dur * 0.95);
    if (got && got !== "pending") { this.voiced(got, t, Math.min(len, got.duration), 1, lvl); return; }
    // not sung yet: asked for, and played late (its start cut) if it comes in time
    (this.waiting.get(key) ?? this.waiting.set(key, []).get(key)!).push({ at: t, dur: len });
    if (got === "pending") return;
    this.sung.set(key, "pending");
    this.worker ??= this.newWorker();
    this.worker.postMessage({ key, midi: ev.midi, dur: steps * (60 / this.style.bpm / 4) * 0.95, vowel, rate: this.ctx.sampleRate });
  }

  /** Ask for the notes the passage will sing before they're due (the form's 32 bars), so they're ready. */
  prewarm(notes: { midi: number; steps: number; step: number }[]): void {
    if (this.state().voice !== "pinkTrombone") return;
    this.worker ??= this.newWorker();
    for (const n of notes) {
      const vowel = VOWELS[(n.step + n.midi) % VOWELS.length], key = `${n.midi}:${n.steps}:${vowel}`;
      if (this.sung.has(key)) continue;
      this.sung.set(key, "pending");
      this.worker.postMessage({ key, midi: n.midi, dur: n.steps * (60 / this.style.bpm / 4) * 0.95, vowel, rate: this.ctx.sampleRate });
    }
  }

  /** Forget the sung notes (a new tempo makes new lengths). */
  forgetSung(): void { this.sung.clear(); this.waiting.clear(); }

  private newWorker(): Worker {
    const w = new Worker(new URL("./ptWorker.js", import.meta.url), { type: "module" });
    w.onmessage = (ev: MessageEvent<{ key: string; samples: Float32Array }>) => {
      const { key, samples } = ev.data, b = this.ctx.createBuffer(1, samples.length, this.ctx.sampleRate);
      let peak = 0; for (const x of samples) peak = Math.max(peak, Math.abs(x));
      const g = peak > 0 ? 0.9 / peak : 1, d = b.getChannelData(0);
      for (let i = 0; i < samples.length; i++) d[i] = samples[i] * g;
      this.sung.set(key, b);
      const now = this.ctx.currentTime, lvl = heard(this.state(), "vocalise", this.state().layers.vocalise) * VOCALISE_GAIN;
      for (const n of this.waiting.get(key) ?? []) if (n.at + n.dur > now + 0.1) this.voiced(b, Math.max(n.at, now), n.dur - Math.max(0, now - n.at), 1, lvl, Math.max(0, now - n.at));
      this.waiting.delete(key);
    };
    return w;
  }

  private voiced(b: AudioBuffer, at: number, len: number, rate: number, gain: number, offset = 0): void {
    const src = this.ctx.createBufferSource(), g = this.ctx.createGain();
    src.buffer = b; src.playbackRate.value = rate;
    g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(gain, at + 0.03);
    g.gain.setValueAtTime(gain, at + Math.max(0.03, len - 0.08)); g.gain.linearRampToValueAtTime(0, at + len);
    src.connect(g).connect(this.presence); src.start(at, offset, len * rate + 0.02);
  }

  private hit(id: string, at: number, gain: number, rate = 1, pan = 0): void {
    const b = this.samples[id]; if (!b || gain <= 0) return;
    const src = this.ctx.createBufferSource(), g = this.ctx.createGain(), p = this.ctx.createStereoPanner();
    src.buffer = b; src.playbackRate.value = rate; g.gain.value = gain; p.pan.value = pan;
    src.connect(g).connect(p).connect(this.bus); src.start(Math.max(this.ctx.currentTime, at));
  }

  private seg(id: string, at: number, offset: number, dur: number, rate: number, gain: number, pan = 0, fade = 0.3): void {
    const b = this.samples[id]; if (!b || dur <= 2 * fade) return;
    const src = this.ctx.createBufferSource(), g = this.ctx.createGain(), p = this.ctx.createStereoPanner();
    src.buffer = b; src.playbackRate.value = rate; p.pan.value = pan;
    g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(gain, at + fade); g.gain.setValueAtTime(gain, at + dur - fade); g.gain.linearRampToValueAtTime(0, at + dur);
    src.connect(g).connect(p).connect(this.bus); src.start(at, offset, dur * rate + 0.05);
  }
}
