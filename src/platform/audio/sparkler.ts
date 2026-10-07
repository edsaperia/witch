// The ley line's pulse as a sparkler's burning tip (art builder 2's #491; Ed, 2026-10-07): near it, its fizz: a thin,
// bright hiss flickering as it burns and a crackle of tiny pops (the sparks, about 60 a second, some forking into a
// double tick), quiet and under the music. The crackle is drawn once into two loops of different lengths (so they never
// line up into a pattern) and played from there: no nodes a pop. Made the first time she comes near the tip, let go a
// few seconds after she leaves. Knobs: the tuning's sfx.sparkler; cued by sfxCues.ts (sparkler).
import type { SfxKit } from "./sfxKit";

/** A loop of sparse crackle, `secs` long: `rate` pops a second at random, each a click ringing a few milliseconds in a
 *  high band, a share `fork` of them followed by a second, softer one a moment later (a spark forking). */
export function crackleBuffer(ctx: BaseAudioContext, secs: number, rate: number, fork: number, seed: number): AudioBuffer {
  const sr = ctx.sampleRate, n = Math.max(1, Math.round(secs * sr)), buf = ctx.createBuffer(1, n, sr), d = buf.getChannelData(0);
  let s = seed >>> 0 || 1;
  const rnd = () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return (s >>> 0) / 4294967296; };
  const pop = (at: number, amp: number) => {
    // a click: a decaying ring at a few kHz, its phase and pitch each its own
    const f = 2500 + rnd() * 5500, decay = 0.0008 + rnd() * 0.0025, len = Math.min(n, Math.ceil(decay * 6 * sr)), ph = rnd() * 6.283;
    for (let i = 0; i < len; i++) {
      const j = (at + i) % n, t = i / sr;
      d[j] += amp * Math.exp(-t / decay) * Math.sin(ph + 6.283 * f * t) * (i < 3 ? i / 3 : 1);
    }
  };
  const count = Math.round(secs * rate);
  for (let k = 0; k < count; k++) {
    const at = Math.floor(rnd() * n), amp = 0.25 + 0.75 * rnd() ** 2;
    pop(at, amp);
    if (rnd() < fork) pop(at + Math.floor((0.004 + rnd() * 0.02) * sr), amp * (0.4 + 0.4 * rnd()));
  }
  let peak = 0;
  for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(d[i]));
  if (peak > 0) for (let i = 0; i < n; i++) d[i] /= peak;
  return buf;
}

export class Sparkler {
  private bed: { hiss: GainNode; pops: GainNode; pan: StereoPannerNode; srcs: AudioBufferSourceNode[] } | null = null;
  private quietSince = -1;

  constructor(private k: SfxKit) {}

  /** Whether its nodes are built (none until she first comes near the tip). */
  get built(): boolean { return !!this.bed; }

  /** Each frame: `level` 0-1 by how near the tip is, `pan` where it is. */
  update(level: number, pan = 0): void {
    const K = this.k, P = K.T.sparkler, c = K.ctx, now = c.currentTime;
    if (!P) return;
    const L = Math.max(0, Math.min(1, level));
    if (L <= 0.001) {
      if (!this.bed) return;
      if (this.quietSince < 0) { this.quietSince = now; this.bed.hiss.gain.setTargetAtTime(0, now, 0.3); this.bed.pops.gain.setTargetAtTime(0, now, 0.3); }
      else if (now - this.quietSince > 4) { const b = this.bed; this.bed = null; for (const s of b.srcs) try { s.stop(); } catch { /* stopped */ } b.pan.disconnect(); }
      return;
    }
    this.quietSince = -1;
    if (!this.bed) {
      const pn = c.createStereoPanner(), hiss = c.createGain(), pops = c.createGain();
      hiss.gain.value = 0; pops.gain.value = 0; hiss.connect(pn); pops.connect(pn); pn.connect(K.out);
      // the hiss: high, narrow-ish, the burning powder
      const n = K.loopNoise(1.3), hp = c.createBiquadFilter(), bp = c.createBiquadFilter();
      hp.type = "highpass"; hp.frequency.value = 4200; bp.type = "peaking"; bp.frequency.value = 7500; bp.Q.value = 1.2; bp.gain.value = 6;
      n.connect(hp); hp.connect(bp); bp.connect(hiss); n.start(now);
      // the sparks: two crackle loops, their lengths unrelated, their rates a touch apart
      const srcs = [n];
      for (const [secs, sd, rate] of [[3.1, 11, 1], [4.7, 29, 1.07]] as const) {
        const s = c.createBufferSource();
        s.buffer = crackleBuffer(c, secs, P.rate / 2, P.fork, sd); s.loop = true; s.playbackRate.value = rate;
        s.connect(pops); s.start(now, Math.random() * secs);
        srcs.push(s);
      }
      this.bed = { hiss, pops, pan: pn, srcs };
    }
    const b = this.bed;
    // it flickers as it burns: the hiss swelling and catching
    const flicker = 0.75 + 0.15 * Math.sin(now * 7.3) * Math.sin(now * 2.9 + 1) + 0.1 * Math.sin(now * 17.1);
    b.hiss.gain.setTargetAtTime(P.volume * P.hiss * L * flicker, now, 0.08);
    b.pops.gain.setTargetAtTime(P.volume * P.pops * L, now, 0.15);
    b.pan.pan.setTargetAtTime(Math.max(-1, Math.min(1, pan)), now, 0.2);
  }
}
