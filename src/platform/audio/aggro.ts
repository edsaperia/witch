// The wild watch's warning (Ed, 2026-10-07; art builder 3's rules/wildWatch.ts `aggroOf`): while a wild area's young and
// adults stand watching her before they attack, a low swell rises under everything, in the music's key: two dark, beating
// saws opening up as the watch runs (k, 0 to 1), a throb quickening with it, and a gritty riser over it as loud as the
// area is dangerous (danger, 0 to 1). At k = 1 it lands as a short hit (they attack); called off before then (she rose or
// left, aggroOf gone null), it falls away, sagging in pitch, and nothing resolves. Built the first time a watch starts,
// kept quiet between. Knobs: the tuning's sfx.aggro; cued by sfxCues.ts (aggro).
import type { SfxKit } from "./sfxKit";
import { mtof } from "./dsp";

export class Aggro {
  private bed: {
    swell: GainNode; riser: GainNode; tone: BiquadFilterNode; band: BiquadFilterNode; throb: OscillatorNode;
    oscs: OscillatorNode[]; pan: StereoPannerNode;
  } | null = null;
  /** Whether a watch is sounding (from its first non-null k until it hits or falls away); `spent` once it has hit, until
   *  the watch is over (k null again). */
  private live = false;
  private spent = false;

  constructor(private k: SfxKit) {}

  /** Each frame: `k` the watch's share run (null: none, or called off), `danger` 0-1, `pan` where the watchers are. */
  update(k: number | null, danger = 0, pan = 0): void {
    const K = this.k, A = K.T.aggro, c = K.ctx, now = c.currentTime;
    if (!A) return;
    if (k === null) { if (this.live) this.fall(now); this.spent = false; return; }
    if (this.spent) return;
    const b = this.bed ?? this.build();
    if (!this.live) {
      // a new watch: the saws back at pitch
      this.live = true;
      for (const o of b.oscs) { o.detune.cancelScheduledValues(now); o.detune.setValueAtTime(o.detune.value, now); o.detune.linearRampToValueAtTime(0, now + 0.05); }
    }
    const u = Math.max(0, Math.min(1, k)), D = Math.max(0, Math.min(1, danger));
    if (u >= 1) { this.hit(now, D, pan); return; }
    const vol = A.volume * (0.75 + 0.25 * D);
    b.swell.gain.setTargetAtTime(vol * A.swell * (0.15 + 0.85 * u ** 1.5), now, 0.08);
    b.riser.gain.setTargetAtTime(vol * A.riser * D * u ** 2, now, 0.08);
    b.tone.frequency.setTargetAtTime(110 + 900 * u ** 2, now, 0.08);
    b.band.frequency.setTargetAtTime(400 + 3200 * u ** 2, now, 0.08);
    b.throb.frequency.setTargetAtTime(1.6 + 6 * u, now, 0.1);
    b.pan.pan.setTargetAtTime(Math.max(-1, Math.min(1, pan)), now, 0.2);
  }

  private build(): NonNullable<Aggro["bed"]> {
    const K = this.k, c = K.ctx, now = c.currentTime;
    const pan = c.createStereoPanner(), swell = c.createGain(), riser = c.createGain(), am = c.createGain();
    swell.gain.value = 0; riser.gain.value = 0; am.gain.value = 0.7;
    swell.connect(am); riser.connect(am); am.connect(pan); pan.connect(K.out);
    // the throb: the whole swell pulsing, faster as the watch runs
    const throb = c.createOscillator(), depth = c.createGain();
    throb.frequency.value = 1.6; depth.gain.value = 0.3; throb.connect(depth); depth.connect(am.gain); throb.start(now);
    // the swell: the key's root two octaves down and its fifth, saws beating against each other, through a low-pass
    const tone = c.createBiquadFilter(); tone.type = "lowpass"; tone.frequency.value = 110; tone.Q.value = 4; tone.connect(swell);
    const root = mtof(K.root - 36), oscs: OscillatorNode[] = [];
    for (const [m, det, v] of [[1, -7, 0.5], [1, 7, 0.5], [1.5, 0, 0.25], [2, 4, 0.15]] as const) {
      const o = c.createOscillator(), g = c.createGain();
      o.type = "sawtooth"; o.frequency.value = root * m; o.detune.value = det; g.gain.value = v;
      o.connect(g); g.connect(tone); o.start(now); oscs.push(o);
    }
    // the riser: noise in a band sweeping up, gritty with a little drive
    const band = c.createBiquadFilter(), drive = c.createWaveShaper(), n = K.loopNoise(1.1);
    band.type = "bandpass"; band.frequency.value = 400; band.Q.value = 3;
    const curve = new Float32Array(256);
    for (let i = 0; i < 256; i++) { const x = i / 127.5 - 1; curve[i] = Math.tanh(x * 3); }
    drive.curve = curve; n.connect(band); band.connect(drive); drive.connect(riser); n.start(now);
    return (this.bed = { swell, riser, tone, band, throb, oscs, pan });
  }

  /** Called off: it sags and falls away, unresolved. */
  private fall(now: number): void {
    const b = this.bed!, A = this.k.T.aggro!;
    this.live = false;
    for (const g of [b.swell, b.riser]) { g.gain.cancelScheduledValues(now); g.gain.setTargetAtTime(0, now, A.fall / 3); }
    for (const o of b.oscs) { o.detune.cancelScheduledValues(now); o.detune.setValueAtTime(o.detune.value, now); o.detune.linearRampToValueAtTime(-500, now + A.fall); }
    b.tone.frequency.cancelScheduledValues(now); b.tone.frequency.setTargetAtTime(90, now, A.fall / 3);
  }

  /** They attack: the swell cut by a hit (a low knock and a burst of the riser's grit). */
  private hit(now: number, danger: number, pan: number): void {
    const K = this.k, A = K.T.aggro!, b = this.bed!, c = K.ctx;
    this.live = false; this.spent = true;
    for (const g of [b.swell, b.riser]) { g.gain.cancelScheduledValues(now); g.gain.setValueAtTime(g.gain.value, now); g.gain.linearRampToValueAtTime(0, now + 0.04); }
    const vol = A.volume * A.hit * (0.6 + 0.4 * danger), out = K.voice(pan), at = now + 0.01;
    const kg = c.createGain(); kg.connect(out); K.env(kg, at, vol, 0.003, 0.35);
    const o = K.osc("sine", mtof(K.root - 24), at, 0.4, kg); o.frequency.exponentialRampToValueAtTime(mtof(K.root - 36), at + 0.3);
    const hp = c.createBiquadFilter(), ng = c.createGain(); hp.type = "highpass"; hp.frequency.value = 1500;
    ng.connect(out); K.env(ng, at, vol * 0.4 * (0.4 + 0.6 * danger), 0.002, 0.18); hp.connect(ng); K.noiseBurst(at, 0.2, hp, Math.random());
  }
}
