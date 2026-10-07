// The sounds of bodies and places: the witch knocked back (#108); a legend's long charge (its
// bellow, hoofbeats, the lane's rumble and the braking skid); home's meadow (a breeze, bees, birds,
// its balloons squeaking and a picnic's clinks and murmur).
// The lasting ones (the rumble and skid, the breeze and bees) are built once and only turned up and down.
import type { SfxKit } from "./sfxKit";
import { grit } from "./dsp";

/** Knocked back `metres` (a blow, a charge): a thump and a short airborne whoosh, both bigger the
 *  further she's thrown. */
export function knock(K: SfxKit, metres: number, pan = 0): void {
  const N = K.T.knock, c = K.ctx, at = c.currentTime + 0.005, m = Math.max(0.5, metres), k = Math.min(1, m / 8);
  if (!K.ready("knock", 0.15)) return;
  K.thump(at, N.volume * (0.6 + 0.6 * k), pan);
  const out = K.voice(pan), bp = c.createBiquadFilter(), g = c.createGain(), dur = 0.18 + 0.05 * Math.min(10, m);
  bp.type = "bandpass"; bp.Q.value = 1.2;
  bp.frequency.setValueAtTime(2600, at); bp.frequency.exponentialRampToValueAtTime(380, at + dur);
  g.connect(out); g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(N.volume * N.whoosh * (0.4 + 0.8 * k), at + dur * 0.3); g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  bp.connect(g); K.noiseBurst(at, dur + 0.02, bp, Math.random());
}

/** A lobbed shot landing (combat's "landed"): a soft thud and a spray of dirt; a legend's (`big`),
 *  a deep boom rolling out in the legends' big space, the ground shaking under it. */
export function impact(K: SfxKit, big: boolean, pan = 0, near = 1): void {
  const I = K.T.impact, c = K.ctx, at = c.currentTime + 0.005, vol = I.volume * near * (big ? 1 : I.small);
  if (!K.ready(big ? "impactBig" : "impact", big ? 0.3 : 0.08)) return;
  K.thump(at, vol, pan);
  const out = K.voice(pan), lp = c.createBiquadFilter(), g = c.createGain(), dur = big ? 1.4 : 0.25;
  lp.type = "lowpass"; lp.frequency.setValueAtTime(big ? 900 : 1600, at); lp.frequency.exponentialRampToValueAtTime(big ? 120 : 400, at + dur);
  g.connect(out); if (big) g.connect(K.space()); K.env(g, at, vol * (big ? 0.8 : 0.5), 0.004, dur);
  lp.connect(g); K.noiseBurst(at, dur + 0.05, lp, Math.random());
  if (big) { const sub = c.createGain(); sub.connect(out); K.env(sub, at, vol * 0.9, 0.01, 1.1); const o = K.osc("sine", 55, at, 1.2, sub); o.frequency.exponentialRampToValueAtTime(28, at + 1.1); }
}

/** A legend's long charge (the bug hunter's charge). */
export class Charge {
  private rumbleGain: GainNode | null = null;
  private skidGain: GainNode | null = null;
  private skidBand: BiquadFilterNode | null = null;
  private chargePan: StereoPannerNode | null = null;

  constructor(private k: SfxKit) {}

  /** The charge's windup: a deep bellow, a low gritty roar swelling and sinking, breath behind it. */
  bellow(pan = 0, near = 1): void {
    const K = this.k, C = K.T.charge, c = K.ctx, at = c.currentTime + 0.01, out = K.voice(pan), vol = C.volume * C.bellow * near, dur = 1.1;
    if (!K.ready("bellow", 0.5)) return;
    const lp = c.createBiquadFilter(), g = c.createGain(), sh = c.createWaveShaper();
    lp.type = "lowpass"; lp.Q.value = 5; lp.frequency.setValueAtTime(220, at); lp.frequency.exponentialRampToValueAtTime(650, at + dur * 0.35); lp.frequency.exponentialRampToValueAtTime(200, at + dur);
    sh.curve = grit(); sh.connect(lp); lp.connect(g); g.connect(out); g.connect(K.space());
    g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(vol, at + 0.2); g.gain.setValueAtTime(vol, at + dur * 0.6); g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    const f = 46;
    for (const det of [-9, 0, 8]) { const o = K.osc("sawtooth", f, at, dur, sh); o.detune.value = det; o.frequency.setValueAtTime(f, at); o.frequency.exponentialRampToValueAtTime(f * 1.35, at + dur * 0.35); o.frequency.exponentialRampToValueAtTime(f * 0.8, at + dur); }
    const nb = c.createBiquadFilter(), ng = c.createGain(); nb.type = "bandpass"; nb.frequency.value = 500; nb.Q.value = 0.8;
    ng.connect(out); K.env(ng, at, vol * 0.4, 0.15, dur * 0.8); nb.connect(ng); K.noiseBurst(at, dur, nb, Math.random());
  }

  /** One heavy hoofbeat (or, `light`, a trot's): a low thud and a spray of dirt. */
  hoof(pan = 0, near = 1, light = false): void {
    const K = this.k, C = K.T.charge, c = K.ctx, at = c.currentTime + 0.005, out = K.voice(pan), vol = C.volume * (light ? C.trot : C.hooves) * near;
    const g = c.createGain(); g.connect(out); K.env(g, at, vol, 0.002, light ? 0.09 : 0.16);
    const o = K.osc("sine", light ? 120 : 80, at, 0.2, g); o.frequency.exponentialRampToValueAtTime(light ? 60 : 34, at + (light ? 0.08 : 0.14));
    const lp = c.createBiquadFilter(), ng = c.createGain(); lp.type = "lowpass"; lp.frequency.value = light ? 1400 : 700;
    ng.connect(out); K.env(ng, at, vol * 0.45, 0.002, light ? 0.05 : 0.09); lp.connect(ng); K.noiseBurst(at, 0.12, lp, Math.random());
  }

  /** The charge's lasting sounds, each frame: the ground's rumble along its lane (0-1, by its speed
   *  and nearness) and the skid of its braking arc (0-1). */
  update(rumble: number, skid: number, pan = 0): void {
    const K = this.k, C = K.T.charge, c = K.ctx, now = c.currentTime;
    if (!this.rumbleGain && rumble <= 0.001 && skid <= 0.001) return;
    if (!this.rumbleGain) {
      this.chargePan = c.createStereoPanner(); this.chargePan.connect(K.out);
      const rs = K.loopNoise(), rl = c.createBiquadFilter(); rl.type = "lowpass"; rl.frequency.value = 110; rl.Q.value = 0.7;
      this.rumbleGain = c.createGain(); this.rumbleGain.gain.value = 0; rs.connect(rl); rl.connect(this.rumbleGain); this.rumbleGain.connect(this.chargePan); rs.start(now);
      const ks = K.loopNoise(0.7);
      this.skidBand = c.createBiquadFilter(); this.skidBand.type = "bandpass"; this.skidBand.Q.value = 1.5; this.skidBand.frequency.value = 900;
      this.skidGain = c.createGain(); this.skidGain.gain.value = 0; ks.connect(this.skidBand); this.skidBand.connect(this.skidGain); this.skidGain.connect(this.chargePan); ks.start(now);
    }
    this.rumbleGain.gain.setTargetAtTime(C.volume * C.rumble * rumble * 3, now, 0.15);
    this.skidGain!.gain.setTargetAtTime(C.volume * C.skid * skid, now, 0.06);
    this.skidBand!.frequency.setTargetAtTime(350 + 900 * skid, now, 0.1);
    this.chargePan!.pan.setTargetAtTime(Math.max(-1, Math.min(1, pan)), now, 0.1);
  }
}

/** Home's meadow. */
export class Meadow {
  private breezeGain: GainNode | null = null;
  private breezeLp: BiquadFilterNode | null = null;
  private beeGain: GainNode | null = null;
  private beePan: StereoPannerNode | null = null;
  private nextBird = 0;
  private murmurGain: GainNode | null = null;
  private nextClink = 0;
  private nextSqueak = 0;

  constructor(private k: SfxKit) {}

  /** Each frame (`level` 0-1: in home's circle, fading out to its edge): a breeze breathing in the
   *  grass, bees drifting past, now and then a bird's little song; and the party things strewn over
   *  it: a balloon squeaking as it rubs on its neighbour in the breeze, a picnic's cups clinking and
   *  the far murmur of party-goers. */
  update(level: number): void {
    const K = this.k, M = K.T.meadow, c = K.ctx, now = c.currentTime;
    if (!this.breezeGain && level <= 0.001) return;
    if (!this.breezeGain) {
      const bs = K.loopNoise();
      this.breezeLp = c.createBiquadFilter(); this.breezeLp.type = "lowpass"; this.breezeLp.frequency.value = 700;
      this.breezeGain = c.createGain(); this.breezeGain.gain.value = 0; bs.connect(this.breezeLp); this.breezeLp.connect(this.breezeGain); this.breezeGain.connect(K.out); bs.start(now);
      this.beePan = c.createStereoPanner(); this.beePan.connect(K.out);
      this.beeGain = c.createGain(); this.beeGain.gain.value = 0; this.beeGain.connect(this.beePan);
      const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 600; bp.Q.value = 1.5; bp.connect(this.beeGain);
      for (const [f, d] of [[196, 0], [203, 7]]) { const o = c.createOscillator(); o.type = "sawtooth"; o.frequency.value = f; o.detune.value = d; o.connect(bp); o.start(now); }
      // the picnic's murmur: far-off voices, breath through a talker's two formant bands, rising and falling
      const ms = K.loopNoise(0.83);
      this.murmurGain = c.createGain(); this.murmurGain.gain.value = 0; this.murmurGain.connect(K.voice(-0.3));
      for (const [f, q] of [[480, 3], [1350, 4]]) { const b = c.createBiquadFilter(); b.type = "bandpass"; b.frequency.value = f; b.Q.value = q; ms.connect(b); b.connect(this.murmurGain); }
      ms.start(now);
    }
    const L = Math.max(0, Math.min(1, level));
    this.breezeGain.gain.setTargetAtTime(M.volume * M.breeze * L * (0.6 + 0.4 * Math.sin(now * 0.31) * Math.sin(now * 0.17 + 1)), now, 0.4);
    this.breezeLp!.frequency.setTargetAtTime(500 + 400 * (0.5 + 0.5 * Math.sin(now * 0.23)), now, 0.5);
    // a bee drifting by: louder as it passes, panning across
    const pass = Math.max(0, Math.sin(now * 0.21) * Math.sin(now * 0.07 + 2));
    this.beeGain!.gain.setTargetAtTime(M.volume * M.bees * L * pass * (0.8 + 0.2 * Math.sin(now * 23)), now, 0.08);
    this.beePan!.pan.setTargetAtTime(Math.sin(now * 0.35), now, 0.2);
    if (L > 0.05 && now >= this.nextBird) {
      this.nextBird = now + M.birdEvery * (0.5 + Math.random());
      this.bird(M.volume * M.birds * L, Math.random() * 1.6 - 0.8);
    }
    this.murmurGain!.gain.setTargetAtTime(M.volume * M.murmur * L * (0.55 + 0.45 * Math.sin(now * 1.7) * Math.sin(now * 0.43 + 2)), now, 0.25);
    if (L > 0.05 && now >= this.nextClink) {
      this.nextClink = now + M.clinkEvery * (0.5 + Math.random());
      this.clink(M.volume * M.clinks * L, Math.random() * 1.2 - 0.6);
    }
    if (L > 0.05 && now >= this.nextSqueak) {
      this.nextSqueak = now + M.squeakEvery * (0.5 + Math.random());
      this.squeak(M.volume * M.balloons * L, Math.random() * 1.6 - 0.8);
    }
  }

  /** Two cups touching at the picnic. */
  private clink(vol: number, pan: number): void { clink(this.k, vol, pan); }

  /** A balloon squeaking as it rubs on another: a rubbery tone wobbling up and down, quick and thin. */
  private squeak(vol: number, pan: number): void {
    const K = this.k, c = K.ctx, out = K.voice(pan), at = c.currentTime + 0.01, dur = 0.12 + Math.random() * 0.18, f = 650 + Math.random() * 500;
    const bp = c.createBiquadFilter(), g = c.createGain(); bp.type = "bandpass"; bp.frequency.value = f * 2; bp.Q.value = 2;
    g.connect(out); g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(vol, at + 0.02); g.gain.setValueAtTime(vol * 0.8, at + dur * 0.7); g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    bp.connect(g);
    const o = c.createOscillator(), wob = c.createOscillator(), wd = c.createGain();
    o.type = "sawtooth"; o.frequency.setValueAtTime(f, at); o.frequency.linearRampToValueAtTime(f * (1.2 + 0.3 * Math.random()), at + dur);
    wob.frequency.value = 28 + Math.random() * 20; wd.gain.value = f * 0.06; wob.connect(wd); wd.connect(o.frequency);
    o.connect(bp); o.start(at); o.stop(at + dur + 0.05); wob.start(at); wob.stop(at + dur + 0.05);
  }

  /** A little birdsong phrase: three to six quick whistled chirps gliding up or down. */
  private bird(vol: number, pan: number): void {
    const K = this.k, c = K.ctx, out = K.voice(pan), n = 3 + Math.floor(Math.random() * 4), base = 2600 + Math.random() * 1400, up = Math.random() < 0.5;
    let t = c.currentTime + 0.01;
    for (let i = 0; i < n; i++) {
      const f = base * (1 + 0.08 * Math.sin(i * 2.1)), dur = 0.05 + Math.random() * 0.05, g = c.createGain();
      g.connect(out); K.env(g, t, vol * (0.7 + 0.3 * Math.random()), 0.004, dur);
      const o = K.osc("sine", f, t, dur + 0.02, g); o.frequency.exponentialRampToValueAtTime(f * (up ? 1.35 : 0.72), t + dur);
      t += dur + 0.03 + Math.random() * 0.05;
    }
  }
}

/** Two cups touching (a picnic's): glass partials, the second a hair later and a little lower. */
export function clink(K: SfxKit, vol: number, pan: number): void {
  const c = K.ctx, out = K.voice(pan), at = c.currentTime + 0.01, f = 2200 + Math.random() * 900;
  for (const [dt, k] of [[0, 1], [0.045 + Math.random() * 0.03, 0.93]]) for (const [r, l, d] of [[1, 1, 0.25], [2.4, 0.45, 0.12], [4.1, 0.2, 0.06]]) {
    const g = c.createGain(); g.connect(out); K.env(g, at + dt, vol * l * (dt ? 0.7 : 1), 0.001, d);
    K.osc("sine", f * k * r, at + dt, d + 0.05, g);
  }
}

/** A legend turning angry (its restlessness run out): a roar, a deep gritty bellow rising and
 *  breaking, the ground's rumble under it, in the legends' big space. Heard from far off. */
export function roar(K: SfxKit, pan = 0, near = 1): void {
  const R = K.T.roar, c = K.ctx, at = c.currentTime + 0.01, out = K.voice(pan), vol = R.volume * near, dur = 2.2;
  if (!K.ready("roar", 1)) return;
  const lp = c.createBiquadFilter(), g = c.createGain(), sh = c.createWaveShaper();
  lp.type = "lowpass"; lp.Q.value = 6; lp.frequency.setValueAtTime(300, at); lp.frequency.exponentialRampToValueAtTime(1400, at + dur * 0.3); lp.frequency.exponentialRampToValueAtTime(260, at + dur);
  sh.curve = grit(); sh.connect(lp); lp.connect(g); g.connect(out); g.connect(K.space());
  g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(vol, at + 0.25); g.gain.setValueAtTime(vol, at + dur * 0.5); g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  const f = 58;
  for (const det of [-12, -4, 5, 13]) { const o = K.osc("sawtooth", f, at, dur, sh); o.detune.value = det; o.frequency.exponentialRampToValueAtTime(f * 1.6, at + dur * 0.3); o.frequency.exponentialRampToValueAtTime(f * 0.7, at + dur); }
  const nb = c.createBiquadFilter(), ng = c.createGain(); nb.type = "bandpass"; nb.frequency.value = 700; nb.Q.value = 0.7;
  ng.connect(out); ng.connect(K.space()); K.env(ng, at, vol * 0.5, 0.2, dur * 0.8); nb.connect(ng); K.noiseBurst(at, dur, nb, Math.random());
  const sub = c.createGain(); sub.connect(out); K.env(sub, at, vol * 0.7, 0.15, dur); const o = K.osc("sine", 41, at, dur, sub); o.frequency.exponentialRampToValueAtTime(30, at + dur);
}

/** Dancers' party shoes on the beat: `n` little heel taps, a hair apart, by how near (0-1). */
export function taps(K: SfxKit, n: number, pan = 0, near = 1): void {
  const S = K.T.shoes, c = K.ctx, at = c.currentTime + 0.005, vol = S.volume * near;
  for (let i = 0; i < Math.min(n, S.max); i++) {
    const t = at + i * 0.018 + Math.random() * 0.012, out = K.voice(pan + (i - n / 2) * 0.12);
    const hp = c.createBiquadFilter(), g = c.createGain(); hp.type = "bandpass"; hp.frequency.value = 2800 + Math.random() * 1600; hp.Q.value = 3;
    g.connect(out); K.env(g, t, vol * (0.7 + 0.3 * Math.random()), 0.001, 0.025);
    hp.connect(g); K.noiseBurst(t, 0.035, hp, Math.random());
    const k = c.createGain(); k.connect(out); K.env(k, t, vol * 0.4, 0.001, 0.03); K.osc("sine", 900 + Math.random() * 300, t, 0.04, k);
  }
}
