// The music (Ed, 2026-10-04): one shared track, played through the proximity mix from
// rules/music.ts: a master gain, a low-pass filter that muffles it in the deep forest, and damage
// (a waveshaper's crunch, a wobbling tremolo, and crackle). The track is generative
// (platform/musicEngine.ts, from config/music-style.json), its sections following the waves
// (rules/musicPlan.ts), on the game's beat; a recorded track (music.src) can stand in for it.
import { muffled, type MusicMix } from "../../rules/music";
import type { Tuning } from "../../rules/tuning";
import { shiftBeat, type BeatClock } from "../../rules/beat";
import type { MusicCue } from "../../rules/musicPlan";
import type { MusicStyle } from "../../rules/musicScore";
import { MusicEngine } from "./musicEngine";
import { MusicAhead } from "./musicAhead";

/** The least lost time (s) the game's beat is moved on by (Music.keepBeat): under it, a frame's jitter. */
const SHIFT_MIN = 0.04;

/** The notes' pitch with the music running at `rate` (a tape slowing: rate^pitch, never under floor). */
const smooth01 = (x: number) => { const t = Math.max(0, Math.min(1, x)); return t * t * (3 - 2 * t); };

export function tapePitch(rate: number, S?: { on: boolean; pitch: number; floor: number }): number {
  return !S?.on || rate >= 1 ? 1 : Math.max(S.floor, Math.pow(Math.max(1e-3, rate), S.pitch));
}

export class Music {
  private master: GainNode;
  private wobble: GainNode;
  private filter: BiquadFilterNode;
  private shaper: WaveShaperNode;
  private dry: GainNode;
  private wet: GainNode;
  private bus: GainNode;
  private noise: AudioBuffer;
  private duckUntil = 0;
  private duckBy = 0;
  /** A sleeping legend's clearing (Ed, 2026-10-06): its layer's gain, and how far in she is (eased). */
  private circleGain: GainNode;
  private circleAt = 0;
  private circleSpecies = "";
  private lastAt = -1;
  /** How far into a legend's clearing the music is now, 0-1 (eased). */
  get circle(): number { return this.circleAt; }
  /** The generative track (none with a recorded one). */
  readonly engine: MusicEngine | null = null;
  /** Its main notes drawn ahead (musicAhead.ts; docs/notes/music.md "Music ahead"): none live (`?music=live`), offline or recorded. */
  readonly ahead: MusicAhead | null = null;
  /** Whether it may draw ahead now (the pause page's Music Lab sets its levels on the live engine's parts: live while it's open). */
  aheadAllowed = true;
  /** The mix's spectrum, for the view (the soundsystem spell's analyser bars, render/leash/stones.ts): an analyser tapped off the
   *  mix before its master gain (so it moves at any volume), made on first use. */
  private analyser: AnalyserNode | null = null;
  private bins: Uint8Array<ArrayBuffer> | null = null;
  /** The mix's spectrum now, 64 bins 0-255 (one read); null on a context with no analyser (offline). */
  spectrum(): Uint8Array | null {
    if (!this.analyser) {
      if (!(this.ctx instanceof AudioContext)) return null;
      this.analyser = this.ctx.createAnalyser(); this.analyser.fftSize = 128; this.analyser.smoothingTimeConstant = 0.55;
      this.wobble.connect(this.analyser); this.bins = new Uint8Array(this.analyser.frequencyBinCount);
    }
    this.analyser.getByteFrequencyData(this.bins!);
    return this.bins;
  }

  constructor(private ctx: BaseAudioContext, public volume: number, style: MusicStyle, seed: number, src = "", drawAhead = false) {
    this.master = ctx.createGain(); this.master.gain.value = 0;
    this.wobble = ctx.createGain();
    this.filter = ctx.createBiquadFilter(); this.filter.type = "lowpass"; this.filter.frequency.value = 16000; this.filter.Q.value = 0.7;
    this.shaper = ctx.createWaveShaper(); this.shaper.curve = crunch(30) as Float32Array<ArrayBuffer>;
    this.dry = ctx.createGain(); this.wet = ctx.createGain(); this.wet.gain.value = 0;
    this.bus = ctx.createGain();
    // bus -> (dry | shaper -> wet) -> filter -> wobble -> master -> out
    this.bus.connect(this.dry); this.bus.connect(this.shaper); this.shaper.connect(this.wet);
    this.dry.connect(this.filter); this.wet.connect(this.filter);
    this.filter.connect(this.wobble); this.wobble.connect(this.master); this.master.connect(ctx.destination);
    this.circleGain = ctx.createGain(); this.circleGain.gain.value = 0; this.circleGain.connect(ctx.destination);
    this.noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    if (src && ctx instanceof AudioContext) {
      const el = new Audio(src);
      el.loop = true; el.crossOrigin = "anonymous";
      ctx.createMediaElementSource(el).connect(this.bus);
      void el.play().catch(() => { /* blocked until a press: the start screen is one */ });
    } else {
      this.engine = new MusicEngine(ctx, this.bus, style, seed, this.circleGain);
      if (drawAhead && typeof AudioContext !== "undefined" && typeof OfflineAudioContext !== "undefined" && ctx instanceof AudioContext) this.ahead = new MusicAhead(this.engine, ctx); // (a page's; offline or a stand-in context, as ever)
    }
  }

  /** Each frame: the mix to hear, the music's cue (waves, boot), the game's time and beat. `rate`: the game's time scale
   *  (game seconds a second: about a tenth in a legend's circle, Ed 2026-10-06), which the music follows, slowing like a tape;
   *  `over`: the party's-over ease (0 to 1), winding it down. */
  update(mix0: MusicMix, cue: MusicCue, gameTime: number, clock: BeatClock, on: boolean, M?: Tuning["music"], rate = 1, over = 0, house = 0): void {
    const c = this.ctx, now = c.currentTime, k = 0.08;
    if (now < this.fadeEnd) on = false; // (fading out for a sail: silent till it's done)
    // The party's over (Ed, 2026-10-06: "the dance music stops"): over the first `over.stop` of the ease the music winds down
    // like a tape stopping, its tempo and pitch falling together to nothing; its sound goes over the last of that; then nothing.
    const stop = over > 0 ? Math.min(1, over / Math.max(0.05, M?.over?.stop ?? 0.6)) : 0;
    if (stop > 0) { rate *= Math.max(0.02, 1 - stop); cue = { ...cue, circle: undefined }; if (stop >= 1) on = false; }
    // In a sleeping legend's clearing: in and out eased over about a second, the music muffled under
    // its layer (which plays while she's in, or still fading out)
    const dt = this.lastAt < 0 ? 0 : Math.max(0, now - this.lastAt);
    this.lastAt = now;
    const want = cue.circle && M ? 1 : 0, ease = M?.circle.ease ?? 0.35;
    this.circleAt += (want - this.circleAt) * (1 - Math.exp(-dt / Math.max(0.01, ease)));
    if (this.circleAt < 0.01 && !want) this.circleAt = 0;
    // and in the treehouse, by how slowed its world is (`house`: eased with the slowing itself), muffled more lightly (music.house)
    const mix = M ? muffled(M, muffled(M, mix0, this.circleAt), house, M.house?.muffle ?? M.circle.muffle, 1) : mix0;
    if (cue.circle) this.circleSpecies = cue.circle.species;
    const layer = this.circleAt > 0 && this.circleSpecies ? { species: this.circleSpecies, level: 1 } : undefined; // (its level is the layer's gain, not its notes')
    cue = { ...cue, circle: layer };
    this.circleGain.gain.setTargetAtTime(on ? this.circleAt * this.volume * (M?.circle.level ?? 1) : 0, now, k);
    // (No drop-outs any more, the sound cutting for a moment with damage close by: Ed's playtest, 2026-10-06, "The music
    // cuts in and out a lot ... It should play continuously". The damage is heard as the crunch, the wobble and the crackle.)
    const vol = (on ? mix.volume * this.volume : 0) * (now < this.duckUntil ? 1 - this.duckBy : 1) * (1 - smooth01((stop - 0.7) / 0.3));
    this.master.gain.setTargetAtTime(vol, now, k);
    this.filter.frequency.setTargetAtTime(mix.cutoff, now, k);
    this.wet.gain.setTargetAtTime(mix.distort * 0.8, now, k);
    this.dry.gain.setTargetAtTime(1 - mix.distort * 0.6, now, k);
    // The wobble: a tremolo that deepens with damage.
    this.wobble.gain.setTargetAtTime(1 - mix.distort * 0.45 * (0.5 + 0.5 * Math.sin(now * 7.3 + Math.sin(now * 2.1) * 2)), now, 0.02);
    // Crackle: little bursts of noise.
    if (on && mix.distort > 0.05 && Math.random() < mix.distort * 0.15) this.crackle(now + Math.random() * 0.05, mix.distort);
    // (drawn ahead only at full speed, the voice a recording, no lab: the slowed world, the tape stopping and the rest live)
    if (this.ahead && this.engine) { const S = this.engine.style, kind = S.form ? S.patches[S.form.sung.patch]?.kind : undefined; this.ahead.update(cue, clock, on, this.aheadAllowed && rate >= 0.999 && stop === 0 && kind !== "fof" && kind !== "tract"); }
    this.engine?.update(cue, gameTime, clock, on, 0.6, rate, stop > 0 ? Math.max(M?.over?.floor ?? 0.15, rate) : tapePitch(rate, M?.slow)); // (stopping: the pitch falls all the way with it)
  }

  /** The audio clock the master (docs/notes/music.md "Music ahead"): while the music's drawn ahead, a stall the game's clock cut
   *  short (MAX_STEP) while the music played on moves the game's beat on to the music's (rules/beat.ts shiftBeat) and the
   *  music's timeline with it, nothing heard moved, so what's on the beat stays on what's heard. Each frame before update();
   *  returns the seconds moved on (0 under SHIFT_MIN, a frame's jitter). */
  keepBeat(gameTime: number, clock: BeatClock): number {
    const E = this.engine, lost = this.ahead?.drawing && E?.anchored ? E.musicTime() - gameTime : 0;
    if (!(lost > SHIFT_MIN && lost < 30)) return 0;
    shiftBeat(clock, gameTime, lost); E!.shiftTime(lost); this.ahead!.shiftTime(lost);
    return lost;
  }

  /** Sound shed to spare the audio thread (shed.ts): the engine's own (unison, tails, reverb, delay). */
  set shed(level: number) { if (this.engine) this.engine.shed = level; }

  /** The engine's continuity (tools/music-lab/flight.cjs). */
  get stats() { return this.engine?.stats ?? { resyncs: 0, late: 0, gap: 0, ahead: 0 }; }

  /** Faded out over `sec` seconds from now (a sail in place: the old night's music going as the sea comes in; app/sound.ts sailing),
   *  scheduling nothing meanwhile if it's updated; after that, the next update brings it back as its mix says. */
  fadeOut(sec: number): void {
    const now = this.ctx.currentTime;
    for (const g of [this.master.gain, this.circleGain.gain]) { g.cancelScheduledValues(now); g.setValueAtTime(g.value, now); g.linearRampToValueAtTime(0, now + sec); }
    this.fadeEnd = now + sec;
  }
  private fadeEnd = -1;

  /** What reaches the speakers (the audio watchdog and the output meter tap it). */
  get output(): AudioNode { return this.master; }
  /** The legend circle's layer, which reaches the speakers on its own (the measured output taps it too). */
  get circleOutput(): AudioNode { return this.circleGain; }
  /** Whether it should be heard now: its volume turned up. */
  /** Not shut by a knockdown (the engine's gate: her silence till the new record, Ed 2026-10-09) and turned up. */
  get audible(): boolean { return this.master.gain.value > 0.02 && !this.engine?.gated; }
  /** Silenced for good and let go (the watchdog building afresh). */
  dispose(): void { this.ahead?.stopAll(); try { this.master.disconnect(); this.circleGain.disconnect(); this.analyser?.disconnect(); } catch { /* gone */ } }

  /** Dip the music by `by` (0-1) for `seconds`: her "ouch!" heard over it. */
  duck(by: number, seconds: number): void { this.duckBy = Math.max(0, Math.min(1, by)); this.duckUntil = this.ctx.currentTime + seconds; }

  private crackle(at: number, amount: number): void {
    const c = this.ctx, s = c.createBufferSource(), g = c.createGain();
    s.buffer = this.noise;
    g.gain.setValueAtTime(0.25 * amount, at); g.gain.exponentialRampToValueAtTime(0.001, at + 0.02);
    s.connect(g); g.connect(this.master); s.start(at, Math.random() * 0.9, 0.025);
  }
}

// A soft-clipping curve: the crunch of a damaged speaker.
function crunch(k: number): Float32Array {
  const n = 1024, out = new Float32Array(n);
  for (let i = 0; i < n; i++) { const x = (i / (n - 1)) * 2 - 1; out[i] = ((1 + k) * x) / (1 + k * Math.abs(x)); }
  return out;
}
