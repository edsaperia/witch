// The music (Ed, 2026-10-04): one shared track, played through the proximity mix from
// rules/music.ts: a master gain, a low-pass filter that muffles it in the deep forest, and damage
// (a waveshaper's crunch, a wobbling tremolo, crackle and drop-outs). Until there's a real track
// (music.src), a small built-in loop plays at beat.bpm on the game's beat: a kick on every beat,
// an offbeat hat, a bass line and a soft pad, so the visuals and the sound pulse together.
import type { MusicMix } from "../rules/music";

const NOTES = [0, 0, 3, 5, 0, 0, 7, 5]; // the bass line, semitones above its root, one per beat
const ROOT = 55; // A1

export class Music {
  private master: GainNode;
  private wobble: GainNode;
  private filter: BiquadFilterNode;
  private shaper: WaveShaperNode;
  private dry: GainNode;
  private wet: GainNode;
  private bus: GainNode;
  private noise: AudioBuffer;
  private nextBeat = -1; // the next beat (game beats) to schedule
  private dropUntil = 0;

  constructor(private ctx: AudioContext, private volume: number, src = "") {
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
    if (src) {
      const el = new Audio(src);
      el.loop = true; el.crossOrigin = "anonymous";
      ctx.createMediaElementSource(el).connect(this.bus);
      void el.play().catch(() => { /* blocked until a press: the start screen is one */ });
      this.nextBeat = Infinity; // no built-in loop
    }
  }

  /** Each frame: the mix to hear, the game's time and beat. */
  update(mix: MusicMix, gameTime: number, bpm: number, on: boolean): void {
    const c = this.ctx, now = c.currentTime, k = 0.08;
    // Drop-outs: with damage close by, now and then the sound cuts for a moment.
    if (mix.distort > 0.05 && now > this.dropUntil && Math.random() < mix.distort * 0.01) this.dropUntil = now + 0.08 + Math.random() * 0.3 * mix.distort;
    const vol = on && now >= this.dropUntil ? mix.volume * this.volume : 0;
    this.master.gain.setTargetAtTime(vol, now, k);
    this.filter.frequency.setTargetAtTime(mix.cutoff, now, k);
    this.wet.gain.setTargetAtTime(mix.distort * 0.8, now, k);
    this.dry.gain.setTargetAtTime(1 - mix.distort * 0.6, now, k);
    // The wobble: a tremolo that deepens with damage.
    this.wobble.gain.setTargetAtTime(1 - mix.distort * 0.45 * (0.5 + 0.5 * Math.sin(now * 7.3 + Math.sin(now * 2.1) * 2)), now, 0.02);
    // Crackle: little bursts of noise.
    if (on && mix.distort > 0.05 && Math.random() < mix.distort * 0.15) this.crackle(now + Math.random() * 0.05, mix.distort);
    // The built-in loop: schedule the beats in the next 0.25 s of game time, on the game's beat.
    if (this.nextBeat === Infinity) return;
    const spb = 60 / bpm, beatNow = gameTime / spb;
    if (this.nextBeat < beatNow || this.nextBeat > beatNow + 8) this.nextBeat = Math.ceil(beatNow);
    while (this.nextBeat < beatNow + 0.25 / spb) {
      const at = now + (this.nextBeat - beatNow) * spb;
      if (at >= now) this.beat(this.nextBeat, at, spb);
      this.nextBeat++;
    }
  }

  private beat(n: number, at: number, spb: number): void {
    const c = this.ctx;
    // Kick: a falling sine thump.
    const ko = c.createOscillator(), kg = c.createGain();
    ko.frequency.setValueAtTime(140, at); ko.frequency.exponentialRampToValueAtTime(42, at + 0.12);
    kg.gain.setValueAtTime(0.9, at); kg.gain.exponentialRampToValueAtTime(0.001, at + 0.28);
    ko.connect(kg); kg.connect(this.bus); ko.start(at); ko.stop(at + 0.3);
    // Offbeat hat: a short burst of high noise.
    const h = c.createBufferSource(), hf = c.createBiquadFilter(), hg = c.createGain();
    h.buffer = this.noise; hf.type = "highpass"; hf.frequency.value = 7000;
    hg.gain.setValueAtTime(0.18, at + spb / 2); hg.gain.exponentialRampToValueAtTime(0.001, at + spb / 2 + 0.05);
    h.connect(hf); hf.connect(hg); hg.connect(this.bus); h.start(at + spb / 2, Math.random() * 0.5, 0.06);
    // Bass: a plucked saw, one note a beat.
    const b = c.createOscillator(), bf = c.createBiquadFilter(), bg = c.createGain();
    b.type = "sawtooth"; b.frequency.value = ROOT * Math.pow(2, NOTES[n % NOTES.length] / 12);
    bf.type = "lowpass"; bf.frequency.setValueAtTime(900, at); bf.frequency.exponentialRampToValueAtTime(160, at + spb * 0.8);
    bg.gain.setValueAtTime(0.0001, at); bg.gain.linearRampToValueAtTime(0.22, at + 0.01); bg.gain.exponentialRampToValueAtTime(0.001, at + spb * 0.9);
    b.connect(bf); bf.connect(bg); bg.connect(this.bus); b.start(at); b.stop(at + spb);
    // Pad: a soft chord every bar.
    if (n % 4 === 0) for (const semi of [12, 15, 19]) {
      const p = c.createOscillator(), pg = c.createGain();
      p.type = "triangle"; p.frequency.value = ROOT * 2 * Math.pow(2, (semi + (n % 16 >= 8 ? -2 : 0)) / 12);
      pg.gain.setValueAtTime(0.0001, at); pg.gain.linearRampToValueAtTime(0.035, at + spb); pg.gain.linearRampToValueAtTime(0.0001, at + spb * 4);
      p.connect(pg); pg.connect(this.bus); p.start(at); p.stop(at + spb * 4 + 0.05);
    }
  }

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
