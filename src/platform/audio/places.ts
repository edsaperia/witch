// The sounds of places beyond home's meadow (overnight, 2026-10-06), each a bed built once and only
// turned up and down by how near she is, with its odd event now and then: a pond (water lapping at
// its edge, a frog now and then, a drip), a picnic in a partified area (party-goers' murmur and
// their cups clinking), and the creator's room in the treehouse (a record's crackle, the room's
// low hum, the timber creaking in the wind).
import type { SfxKit } from "./sfxKit";
import { clink } from "./ambience";

/** A pond she's by (`level` 0-1 by how near, `pan` where). */
export class Pond {
  private lapGain: GainNode | null = null;
  private lapBand: BiquadFilterNode | null = null;
  private pan: StereoPannerNode | null = null;
  private nextFrog = 0;
  private nextDrip = 0;

  constructor(private k: SfxKit) {}

  update(level: number, pan = 0): void {
    const K = this.k, P = K.T.pond, c = K.ctx, now = c.currentTime;
    if (!this.lapGain && level <= 0.001) return;
    if (!this.lapGain) {
      this.pan = c.createStereoPanner(); this.pan.connect(K.out);
      const s = c.createBufferSource(); s.buffer = K.noise; s.loop = true; s.playbackRate.value = 0.6;
      this.lapBand = c.createBiquadFilter(); this.lapBand.type = "bandpass"; this.lapBand.Q.value = 1.2; this.lapBand.frequency.value = 500;
      this.lapGain = c.createGain(); this.lapGain.gain.value = 0;
      s.connect(this.lapBand); this.lapBand.connect(this.lapGain); this.lapGain.connect(this.pan); s.start(now);
    }
    const L = Math.max(0, Math.min(1, level));
    // the lapping: small waves against the edge, coming and going
    const wave = Math.max(0, Math.sin(now * 1.9) * 0.6 + Math.sin(now * 0.7 + 1) * 0.4);
    this.lapGain.gain.setTargetAtTime(P.volume * P.lap * L * (0.35 + 0.65 * wave), now, 0.12);
    this.lapBand!.frequency.setTargetAtTime(380 + 320 * wave, now, 0.15);
    this.pan!.pan.setTargetAtTime(Math.max(-1, Math.min(1, pan)), now, 0.2);
    if (L > 0.05 && now >= this.nextFrog) {
      this.nextFrog = now + P.frogEvery * (0.5 + Math.random());
      this.frog(P.volume * P.frogs * L, pan + (Math.random() - 0.5) * 0.6);
    }
    if (L > 0.05 && now >= this.nextDrip) {
      this.nextDrip = now + P.dripEvery * (0.4 + Math.random());
      this.drip(P.volume * P.drips * L, pan + (Math.random() - 0.5) * 0.8);
    }
  }

  /** A frog: two or three low croaks, a rattle in each (a buzz through a low throat). */
  private frog(vol: number, pan: number): void {
    const K = this.k, c = K.ctx, out = K.voice(pan), n = 2 + Math.floor(Math.random() * 2), f = 110 + Math.random() * 60;
    let t = c.currentTime + 0.01;
    for (let i = 0; i < n; i++) {
      const dur = 0.11 + Math.random() * 0.06, lp = c.createBiquadFilter(), g = c.createGain(), am = c.createGain(), lfo = c.createOscillator(), d = c.createGain();
      lp.type = "bandpass"; lp.frequency.value = f * 3.2; lp.Q.value = 4;
      am.gain.value = 0.5; d.gain.value = 0.5; lfo.type = "square"; lfo.frequency.value = 38 + Math.random() * 10; lfo.connect(d); d.connect(am.gain);
      g.connect(out); K.env(g, t, vol, 0.008, dur);
      lp.connect(am); am.connect(g);
      const o = K.osc("sawtooth", f, t, dur, lp); o.frequency.exponentialRampToValueAtTime(f * 1.15, t + dur);
      lfo.start(t); lfo.stop(t + dur + 0.05);
      t += dur + 0.08 + Math.random() * 0.06;
    }
  }

  /** A drip into the water: a quick falling plink. */
  private drip(vol: number, pan: number): void {
    const K = this.k, c = K.ctx, out = K.voice(pan), at = c.currentTime + 0.01, f = 1100 + Math.random() * 900, g = c.createGain();
    g.connect(out); K.env(g, at, vol, 0.002, 0.09);
    const o = K.osc("sine", f, at, 0.1, g); o.frequency.exponentialRampToValueAtTime(f * 1.9, at + 0.05);
  }
}

/** A picnic in a partified area she's near (`level` 0-1): its party-goers' murmur and their cups. */
export class Picnic {
  private gain: GainNode | null = null;
  private pan: StereoPannerNode | null = null;
  private nextClink = 0;

  constructor(private k: SfxKit) {}

  update(level: number, pan = 0): void {
    const K = this.k, P = K.T.picnic, c = K.ctx, now = c.currentTime;
    if (!this.gain && level <= 0.001) return;
    if (!this.gain) {
      // voices too far to make out: breath through a talker's two formant bands, rising and falling
      this.pan = c.createStereoPanner(); this.pan.connect(K.out);
      const s = c.createBufferSource(); s.buffer = K.noise; s.loop = true; s.playbackRate.value = 0.91;
      this.gain = c.createGain(); this.gain.gain.value = 0; this.gain.connect(this.pan);
      for (const [f, q] of [[520, 3], [1450, 4], [2400, 5]]) { const b = c.createBiquadFilter(); b.type = "bandpass"; b.frequency.value = f; b.Q.value = q; s.connect(b); b.connect(this.gain); }
      s.start(now);
    }
    const L = Math.max(0, Math.min(1, level));
    this.gain.gain.setTargetAtTime(P.volume * P.murmur * L * (0.5 + 0.5 * Math.sin(now * 2.3) * Math.sin(now * 0.61 + 1)), now, 0.2);
    this.pan!.pan.setTargetAtTime(Math.max(-1, Math.min(1, pan)), now, 0.2);
    if (L > 0.05 && now >= this.nextClink) {
      this.nextClink = now + P.clinkEvery * (0.5 + Math.random());
      clink(K, P.volume * P.clinks * L, pan + (Math.random() - 0.5) * 0.5);
    }
  }
}

/** The creator's room in the treehouse, while it's open (`level` 0-1): a record's soft crackle, the
 *  room's low hum, now and then the timber creaking in the wind. */
export class Room {
  private hum: GainNode | null = null;
  private crackle: GainNode | null = null;
  private nextPop = 0;
  private nextCreak = 0;

  constructor(private k: SfxKit) {}

  update(level: number): void {
    const K = this.k, R = K.T.room, c = K.ctx, now = c.currentTime;
    if (!this.hum && level <= 0.001) return;
    if (!this.hum) {
      this.hum = c.createGain(); this.hum.gain.value = 0; this.hum.connect(K.out);
      const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 220; lp.connect(this.hum);
      const s = c.createBufferSource(); s.buffer = K.noise; s.loop = true; s.playbackRate.value = 0.5; s.connect(lp); s.start(now);
      for (const f of [55, 110]) { const o = c.createOscillator(), g = c.createGain(); o.frequency.value = f; g.gain.value = f === 55 ? 0.08 : 0.03; o.connect(g); g.connect(this.hum); o.start(now); }
      // the record's surface: hiss high up
      this.crackle = c.createGain(); this.crackle.gain.value = 0; this.crackle.connect(K.out);
      const hp = c.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 3500; hp.connect(this.crackle);
      const h = c.createBufferSource(); h.buffer = K.noise; h.loop = true; h.connect(hp); h.start(now);
    }
    const L = Math.max(0, Math.min(1, level));
    this.hum.gain.setTargetAtTime(R.volume * R.hum * L, now, 0.3);
    this.crackle!.gain.setTargetAtTime(R.volume * R.crackle * 0.15 * L, now, 0.3);
    // the record's pops and ticks
    if (L > 0.05 && now >= this.nextPop) {
      this.nextPop = now + 0.05 + Math.random() * 0.35;
      const at = now + 0.01, bp = c.createBiquadFilter(), g = c.createGain(), out = K.voice((Math.random() - 0.5) * 0.4);
      bp.type = "bandpass"; bp.frequency.value = 1500 + Math.random() * 3000; bp.Q.value = 2;
      g.connect(out); K.env(g, at, R.volume * R.crackle * L * (0.3 + 0.7 * Math.random() ** 3), 0.0005, 0.006);
      bp.connect(g); K.noiseBurst(at, 0.01, bp, Math.random());
    }
    if (L > 0.05 && now >= this.nextCreak) {
      this.nextCreak = now + R.creakEvery * (0.5 + Math.random());
      this.creak(R.volume * R.creak * L, (Math.random() - 0.5) * 1.2);
    }
  }

  /** The treehouse's timber creaking: a slow, rough, low glide. */
  private creak(vol: number, pan: number): void {
    const K = this.k, c = K.ctx, out = K.voice(pan), at = c.currentTime + 0.01, dur = 0.5 + Math.random() * 0.5, f = 90 + Math.random() * 60;
    const bp = c.createBiquadFilter(), g = c.createGain(), am = c.createGain(), lfo = c.createOscillator(), d = c.createGain();
    bp.type = "bandpass"; bp.frequency.value = f * 6; bp.Q.value = 5;
    am.gain.value = 0.6; d.gain.value = 0.4; lfo.type = "square"; lfo.frequency.value = 22 + Math.random() * 14; lfo.connect(d); d.connect(am.gain);
    g.connect(out); g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(vol, at + dur * 0.4); g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    bp.connect(am); am.connect(g);
    const o = K.osc("sawtooth", f, at, dur, bp); o.frequency.linearRampToValueAtTime(f * (Math.random() < 0.5 ? 1.25 : 0.8), at + dur);
    lfo.start(at); lfo.stop(at + dur + 0.05);
  }
}
