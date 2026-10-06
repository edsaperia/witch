// The music (Ed, 2026-10-04): one shared track, played through the proximity mix from
// rules/music.ts: a master gain, a low-pass filter that muffles it in the deep forest, and damage
// (a waveshaper's crunch, a wobbling tremolo, and crackle). The track is generative
// (platform/musicEngine.ts, from config/music-style.json), its sections following the waves
// (rules/musicPlan.ts), on the game's beat; a recorded track (music.src) can stand in for it.
import { muffled, type MusicMix } from "../../rules/music";
import type { Tuning } from "../../rules/tuning";
import type { BeatClock } from "../../rules/beat";
import type { MusicCue } from "../../rules/musicPlan";
import type { MusicStyle } from "../../rules/musicScore";
import { MusicEngine } from "./musicEngine";

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

  constructor(private ctx: BaseAudioContext, public volume: number, style: MusicStyle, seed: number, src = "") {
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
    } else this.engine = new MusicEngine(ctx, this.bus, style, seed, this.circleGain);
  }

  /** Each frame: the mix to hear, the music's cue (waves, boot), the game's time and beat. */
  /** `rate`: the game's time scale (game seconds a second: about a tenth in a legend's circle, Ed 2026-10-06), which the music follows, slowing like a tape. */
  update(mix0: MusicMix, cue: MusicCue, gameTime: number, clock: BeatClock, on: boolean, M?: Tuning["music"], rate = 1, over = 0): void {
    const c = this.ctx, now = c.currentTime, k = 0.08;
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
    const mix = M ? muffled(M, mix0, this.circleAt) : mix0;
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
    this.engine?.update(cue, gameTime, clock, on, 0.6, rate, stop > 0 ? Math.max(M?.over?.floor ?? 0.15, rate) : tapePitch(rate, M?.slow)); // (stopping: the pitch falls all the way with it)
  }

  /** The engine's continuity (tools/music-lab/flight.cjs). */
  get stats() { return this.engine?.stats ?? { resyncs: 0, late: 0, gap: 0 }; }

  /** What reaches the speakers (the audio watchdog taps it). */
  get output(): AudioNode { return this.master; }
  /** Whether it should be heard now: its volume turned up. */
  get audible(): boolean { return this.master.gain.value > 0.02; }
  /** Silenced for good and let go (the watchdog building afresh). */
  dispose(): void { try { this.master.disconnect(); this.circleGain.disconnect(); } catch { /* gone */ } }

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
