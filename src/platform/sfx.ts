// The sound effects (2026-10-05): every one synthesised, like the music (no samples), each a few
// short-lived nodes; the two that last (a sleeping legend's snore and dream tone, and a nightmare's
// unease) are built once and only turned up and down. Pitches keep to the music's key (the style's
// root, a minor pentatonic) so a hose of 💌s or a run of chimes sits in the track rather than on it.
// Volumes and rates are the tuning's sfx (config/tuning.json). platform/sfxCues.ts decides when.
import type { Tuning } from "../rules/tuning";

export type SfxTuning = Tuning["sfx"];

const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12);
/** The minor pentatonic's steps (semitones above the root). */
const PENTA = [0, 3, 5, 7, 10];
/** Scale degree `k` (0 the root, 5 the octave above) as a MIDI note above `root`. */
const degree = (root: number, k: number) => root + 12 * Math.floor(k / 5) + PENTA[((k % 5) + 5) % 5];

export class Sfx {
  private out: GainNode;
  private noise: AudioBuffer;
  private lastLetter = -1;
  private lastAt = new Map<string, number>();
  // the lasting voices
  private snoreGain: GainNode | null = null;
  private snoreBand: BiquadFilterNode | null = null;
  private dreamGain: GainNode | null = null;
  private nightGain: GainNode | null = null;
  private nightTrem: GainNode | null = null;

  constructor(private ctx: AudioContext | OfflineAudioContext, public volume: number, private T: SfxTuning, private root = 57, dest?: AudioNode) {
    const c = ctx;
    this.out = c.createGain(); this.out.gain.value = volume * T.volume;
    const limit = c.createDynamicsCompressor();
    limit.threshold.value = -10; limit.knee.value = 6; limit.ratio.value = 8; limit.attack.value = 0.003; limit.release.value = 0.12;
    this.out.connect(limit); limit.connect(dest ?? c.destination);
    this.noise = c.createBuffer(1, c.sampleRate, c.sampleRate);
    const d = this.noise.getChannelData(0);
    let r = 777;
    for (let i = 0; i < d.length; i++) { r = (Math.imul(r, 1103515245) + 12345) >>> 0; d[i] = (r / 4294967296) * 2 - 1; }
  }

  setVolume(v: number): void { this.volume = v; this.out.gain.setTargetAtTime(v * this.T.volume, this.ctx.currentTime, 0.05); }

  /** Rate limiting: true (and remembered) if `key` last sounded at least `gap` seconds ago. */
  private ready(key: string, gap: number): boolean {
    const now = this.ctx.currentTime, last = this.lastAt.get(key) ?? -Infinity;
    if (now - last < gap) return false;
    this.lastAt.set(key, now);
    return true;
  }

  /** A gain into a panner into the bus: one sound's output. */
  private voice(pan: number): GainNode {
    const c = this.ctx, g = c.createGain(), p = c.createStereoPanner();
    p.pan.value = Math.max(-1, Math.min(1, pan));
    g.connect(p); p.connect(this.out);
    return g;
  }
  private env(g: GainNode, at: number, peak: number, attack: number, decay: number): void {
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), at + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, at + attack + decay);
  }
  private osc(type: OscillatorType, freq: number, at: number, dur: number, dest: AudioNode): OscillatorNode {
    const o = this.ctx.createOscillator();
    o.type = type; o.frequency.setValueAtTime(freq, at);
    o.connect(dest); o.start(at); o.stop(at + dur + 0.05);
    return o;
  }
  private noiseBurst(at: number, dur: number, dest: AudioNode, offset = 0): AudioBufferSourceNode {
    const s = this.ctx.createBufferSource();
    s.buffer = this.noise; s.connect(dest); s.start(at, offset % 0.9, dur + 0.02);
    return s;
  }

  // ——— 💌 ———

  /** A 💌 sent: a soft breathy "fwip" sliding down onto a note of the key, never the same note
   *  twice running, so a hose of them sparkles rather than grates. */
  letter(pan = 0, near = 1): void {
    const L = this.T.letter;
    if (!this.ready("letter", L.gap)) return;
    const c = this.ctx, at = c.currentTime + 0.005, spread = Math.max(2, L.spread | 0);
    let k = Math.floor(Math.random() * spread);
    if (k === this.lastLetter) k = (k + 1 + Math.floor(Math.random() * (spread - 1))) % spread;
    this.lastLetter = k;
    const f = mtof(degree(this.root + 12, k + 5)), out = this.voice(pan);
    const g = c.createGain(); g.connect(out); this.env(g, at, L.volume * near, 0.006, 0.11);
    const o = this.osc("triangle", f * 1.5, at, 0.14, g);
    o.frequency.exponentialRampToValueAtTime(f, at + 0.06);
    // the breath: a whisper of band-passed noise
    const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 2400 + k * 180; bp.Q.value = 1.4;
    const ng = c.createGain(); ng.connect(out); this.env(ng, at, L.volume * 0.35 * near, 0.004, 0.06);
    bp.connect(ng); this.noiseBurst(at, 0.08, bp, Math.random());
  }

  /** A 💌 landing: a small glassy chime (a bell's partials); a spent one (inside the creature's
   *  gap: no affection) just a faint tick. */
  hit(pan = 0, near = 1, spent = false): void {
    const H = this.T.hit;
    if (!this.ready(spent ? "hitSpent" : "hit", H.gap)) return;
    const c = this.ctx, at = c.currentTime + 0.005, out = this.voice(pan);
    const f = mtof(degree(this.root + 24, Math.floor(Math.random() * 5)));
    const vol = H.volume * near * (spent ? 0.3 : 1);
    for (const [ratio, lvl, dec] of [[1, 1, 0.35], [2.76, 0.45, 0.18], [5.4, 0.2, 0.08]] as const) {
      const g = c.createGain(); g.connect(out); this.env(g, at, vol * lvl, 0.002, spent ? dec * 0.4 : dec);
      this.osc("sine", f * ratio, at, dec + 0.05, g);
    }
  }

  /** The affection meter filling: a tick that climbs the key as it fills (0-1). */
  fill(amount: number, pan = 0, near = 1): void {
    const F = this.T.fill;
    const c = this.ctx, at = c.currentTime + 0.03, out = this.voice(pan);
    const steps = Math.max(1, Math.round(5 * F.octaves)), k = Math.round(Math.max(0, Math.min(1, amount)) * steps);
    const f = mtof(degree(this.root + 36, k));
    const g = c.createGain(); g.connect(out); this.env(g, at, F.volume * near, 0.002, 0.05);
    this.osc("square", f, at, 0.06, g);
  }

  /** Invited (the meter full, or talked round): a rising flourish up the key's bright side, longer
   *  and fuller the bigger the creature (level 0 baby to 3 legend), with a sparkle on top. */
  invited(level: number, pan = 0, near = 1): void {
    const I = this.T.invited, c = this.ctx, at = c.currentTime + 0.01, out = this.voice(pan);
    const n = 3 + Math.max(0, Math.min(3, level)), step = 0.07 - level * 0.006, vol = I.volume * near * (0.75 + level * 0.12);
    const base = this.root + 24 + 3; // (the relative major: brighter)
    for (let i = 0; i < n; i++) {
      const t = at + i * step, f = mtof(degree(base, i * 2 - (i > 2 ? 1 : 0)));
      const g = c.createGain(); g.connect(out); this.env(g, t, vol * (i === n - 1 ? 1 : 0.7), 0.004, i === n - 1 ? 0.5 + level * 0.15 : 0.16);
      this.osc("triangle", f, t, 0.7, g);
      if (level >= 2) { const g2 = c.createGain(); g2.connect(out); this.env(g2, t, vol * 0.25, 0.004, 0.2); this.osc("sine", f * 2, t, 0.3, g2); }
    }
    const end = at + n * step, hp = c.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 6000;
    const ng = c.createGain(); ng.connect(out); this.env(ng, end, vol * 0.3, 0.01, 0.35 + level * 0.1);
    hp.connect(ng); this.noiseBurst(end, 0.5, hp, 0.3);
  }

  // ——— states ———

  /** Turned enraged: a short low growl with a snarl of grit; `many` together, one heavier growl. */
  enraged(pan = 0, near = 1, many = 1): void {
    const E = this.T.enraged;
    if (!this.ready("enraged", E.gap)) return;
    const c = this.ctx, at = c.currentTime + 0.005, out = this.voice(pan), vol = E.volume * near * Math.min(1.6, 1 + 0.15 * (many - 1));
    const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.setValueAtTime(1400, at); lp.frequency.exponentialRampToValueAtTime(260, at + 0.35); lp.Q.value = 4;
    const sh = c.createWaveShaper(); sh.curve = grit(); sh.connect(lp);
    const g = c.createGain(); g.connect(out); this.env(g, at, vol, 0.01, 0.38);
    lp.connect(g);
    const f = mtof(this.root + (many > 1 ? 0 : 12));
    for (const det of [-14, 0, 11]) { const o = this.osc("sawtooth", f, at, 0.42, sh); o.detune.value = det; o.frequency.exponentialRampToValueAtTime(f * 0.78, at + 0.35); }
  }

  /** Turned happy: a bubbly pop rising, and a tiny chime after it. */
  happy(pan = 0, near = 1): void {
    const H = this.T.happy;
    if (!this.ready("happy", H.gap)) return;
    const c = this.ctx, at = c.currentTime + 0.005, out = this.voice(pan), vol = H.volume * near;
    const g = c.createGain(); g.connect(out); this.env(g, at, vol, 0.003, 0.09);
    const o = this.osc("sine", 380, at, 0.12, g); o.frequency.exponentialRampToValueAtTime(980, at + 0.07);
    const f = mtof(degree(this.root + 36 + 3, 2 + Math.floor(Math.random() * 3)));
    const g2 = c.createGain(); g2.connect(out); this.env(g2, at + 0.06, vol * 0.45, 0.002, 0.22);
    this.osc("triangle", f, at + 0.06, 0.3, g2);
  }

  // ——— legends ———

  /** A legend's slow attack winding up: a rising, quickening pulse and a swelling hum that land
   *  `length` seconds on, when it fires (well telegraphed: hear it, then move). */
  windup(pan = 0, near = 1): void {
    const W = this.T.windup;
    if (!this.ready("windup", 0.25)) return;
    const c = this.ctx, at = c.currentTime + 0.005, len = Math.max(0.3, W.length), out = this.voice(pan), vol = W.volume * near;
    const g = c.createGain(); g.connect(out);
    g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(vol, at + len * 0.95); g.gain.exponentialRampToValueAtTime(0.0001, at + len + 0.12);
    const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.Q.value = 6;
    lp.frequency.setValueAtTime(300, at); lp.frequency.exponentialRampToValueAtTime(3200, at + len);
    // a tremolo speeding up (the pulse): an LFO on a gain
    const trem = c.createGain(); trem.gain.value = 0.5; trem.connect(g); lp.connect(trem);
    const lfo = c.createOscillator(), depth = c.createGain(); depth.gain.value = 0.5;
    lfo.frequency.setValueAtTime(4, at); lfo.frequency.exponentialRampToValueAtTime(18, at + len);
    lfo.connect(depth); depth.connect(trem.gain); lfo.start(at); lfo.stop(at + len + 0.2);
    const f0 = mtof(this.root + 12), f1 = mtof(this.root + 24);
    for (const det of [-7, 7]) { const o = this.osc("sawtooth", f0, at, len + 0.15, lp); o.detune.value = det; o.frequency.exponentialRampToValueAtTime(f1, at + len); }
    const sub = c.createGain(); sub.connect(out); sub.gain.setValueAtTime(0.0001, at); sub.gain.exponentialRampToValueAtTime(vol * 0.6, at + len); sub.gain.exponentialRampToValueAtTime(0.0001, at + len + 0.15);
    this.osc("sine", mtof(this.root), at, len + 0.2, sub);
  }

  /** The lasting legend voices, each frame: a sleeping legend's snore and dream tone (`sleep`, 0-1
   *  by how near; `breath` 0 out to 1 in) and a nightmare's unease (`unease`, 0-1: restlessness by nearness). */
  legends(sleep: number, breath: number, unease: number, pan = 0): void {
    const c = this.ctx, now = c.currentTime, S = this.T.snore, N = this.T.nightmare;
    if (!this.snoreGain && sleep <= 0.001 && unease <= 0.001) return;
    if (!this.snoreGain) this.buildLegendVoices();
    const calm = sleep * (1 - 0.7 * unease);
    this.snoreGain!.gain.setTargetAtTime(S.volume * calm * (0.15 + 0.85 * breath * breath), now, 0.08);
    this.snoreBand!.frequency.setTargetAtTime(260 + 380 * breath, now, 0.1);
    this.dreamGain!.gain.setTargetAtTime(S.volume * 0.35 * calm * (0.6 + 0.4 * Math.sin(now * 0.7)), now, 0.2);
    this.nightGain!.gain.setTargetAtTime(N.volume * Math.pow(unease, 1.4), now, 0.25);
    this.nightTrem!.gain.setTargetAtTime(0.6 + 0.4 * Math.sin(now * (2 + 5 * unease)), now, 0.03);
    (this.snoreGain as GainNode & { pan?: StereoPannerNode }).pan!.pan.setTargetAtTime(Math.max(-1, Math.min(1, pan)), now, 0.1);
  }

  private buildLegendVoices(): void {
    const c = this.ctx, at = c.currentTime;
    const pan = c.createStereoPanner(); pan.connect(this.out);
    // the snore: breathy band-passed noise, swelling on each breath in
    this.snoreGain = c.createGain(); this.snoreGain.gain.value = 0; this.snoreGain.connect(pan);
    (this.snoreGain as GainNode & { pan?: StereoPannerNode }).pan = pan;
    this.snoreBand = c.createBiquadFilter(); this.snoreBand.type = "bandpass"; this.snoreBand.Q.value = 2.5; this.snoreBand.connect(this.snoreGain);
    const ns = c.createBufferSource(); ns.buffer = this.noise; ns.loop = true; ns.connect(this.snoreBand); ns.start(at);
    // the dream tone: a soft fifth, slowly shimmering
    this.dreamGain = c.createGain(); this.dreamGain.gain.value = 0; this.dreamGain.connect(pan);
    for (const [m, det] of [[this.root + 36, -4], [this.root + 43, 5]] as const) { const o = c.createOscillator(); o.type = "sine"; o.frequency.value = mtof(m); o.detune.value = det; o.connect(this.dreamGain); o.start(at); }
    // the nightmare's unease: a low minor second and a tritone, beating, under a trembling gain
    this.nightGain = c.createGain(); this.nightGain.gain.value = 0;
    this.nightTrem = c.createGain(); this.nightTrem.gain.value = 1; this.nightTrem.connect(this.nightGain); this.nightGain.connect(pan);
    const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 700; lp.Q.value = 1.5; lp.connect(this.nightTrem);
    for (const m of [this.root + 12, this.root + 13, this.root + 18]) { const o = c.createOscillator(); o.type = "triangle"; o.frequency.value = mtof(m); o.connect(lp); o.start(at); }
  }
}

let gritCurve: Float32Array<ArrayBuffer> | null = null;
/** A hard-ish clip: the growl's snarl. */
function grit(): Float32Array<ArrayBuffer> {
  if (gritCurve) return gritCurve;
  const n = 512, out = new Float32Array(n);
  for (let i = 0; i < n; i++) { const x = (i / (n - 1)) * 2 - 1; out[i] = Math.tanh(x * 4); }
  return (gritCurve = out);
}
