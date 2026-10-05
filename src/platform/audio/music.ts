// The music (Ed, 2026-10-04): one shared track, played through the proximity mix from
// rules/music.ts: a master gain, a low-pass filter that muffles it in the deep forest, and damage
// (a waveshaper's crunch, a wobbling tremolo, crackle and drop-outs). The track is generative
// (platform/musicEngine.ts, from config/music-style.json), its sections following the waves
// (rules/musicPlan.ts), on the game's beat; a recorded track (music.src) can stand in for it.
import type { MusicMix } from "../../rules/music";
import type { BeatClock } from "../../rules/beat";
import type { MusicCue } from "../../rules/musicPlan";
import type { MusicStyle } from "../../rules/musicScore";
import { MusicEngine } from "./musicEngine";

export class Music {
  private master: GainNode;
  private wobble: GainNode;
  private filter: BiquadFilterNode;
  private shaper: WaveShaperNode;
  private dry: GainNode;
  private wet: GainNode;
  private bus: GainNode;
  private noise: AudioBuffer;
  private dropUntil = 0;
  private duckUntil = 0;
  private duckBy = 0;
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
    this.noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    if (src && ctx instanceof AudioContext) {
      const el = new Audio(src);
      el.loop = true; el.crossOrigin = "anonymous";
      ctx.createMediaElementSource(el).connect(this.bus);
      void el.play().catch(() => { /* blocked until a press: the start screen is one */ });
    } else this.engine = new MusicEngine(ctx, this.bus, style, seed);
  }

  /** Each frame: the mix to hear, the music's cue (waves, boot), the game's time and beat. */
  update(mix: MusicMix, cue: MusicCue, gameTime: number, clock: BeatClock, on: boolean): void {
    const c = this.ctx, now = c.currentTime, k = 0.08;
    // Drop-outs: with damage close by, now and then the sound cuts for a moment.
    if (mix.distort > 0.05 && now > this.dropUntil && Math.random() < mix.distort * 0.01) this.dropUntil = now + 0.08 + Math.random() * 0.3 * mix.distort;
    const vol = (on && now >= this.dropUntil ? mix.volume * this.volume : 0) * (now < this.duckUntil ? 1 - this.duckBy : 1);
    this.master.gain.setTargetAtTime(vol, now, k);
    this.filter.frequency.setTargetAtTime(mix.cutoff, now, k);
    this.wet.gain.setTargetAtTime(mix.distort * 0.8, now, k);
    this.dry.gain.setTargetAtTime(1 - mix.distort * 0.6, now, k);
    // The wobble: a tremolo that deepens with damage.
    this.wobble.gain.setTargetAtTime(1 - mix.distort * 0.45 * (0.5 + 0.5 * Math.sin(now * 7.3 + Math.sin(now * 2.1) * 2)), now, 0.02);
    // Crackle: little bursts of noise.
    if (on && mix.distort > 0.05 && Math.random() < mix.distort * 0.15) this.crackle(now + Math.random() * 0.05, mix.distort);
    this.engine?.update(cue, gameTime, clock, on);
  }

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
