// The party spell's scroll (ui/spellScroll.ts; Ed, 2026-10-06: "There are appropriate sound cues"), in the music's key:
//   hum      a soft magical hum rising as the cursor nears it (a bed: a low root and fifth with a shimmer an octave up,
//            breathing, its filter opening with the level; `update(level)` every frame);
//   rustle   paper stirring as the ripple picks up (a short band of noise, crisp, a little louder the nearer);
//   crackle  the grow: about a second of static and sparks thickening to the burst, a shimmer rising under it;
//   burst    the burst: a whoosh falling away, a soft low boom and a bright chord ringing out in the legends' space,
//            leading into the first home speaker's crackle (power.ts) as play begins.
// Knobs: the tuning's sfx.spell.
import type { SfxKit } from "./sfxKit";
import { degree, mtof } from "./dsp";

export class Spell {
  private bed: GainNode | null = null;
  private lp: BiquadFilterNode | null = null;
  constructor(private k: SfxKit) {}

  /** The hum, 0 silent to 1 on the scroll. */
  hum(level: number): void {
    const K = this.k, S = K.T.spell, c = K.ctx, now = c.currentTime;
    if (!this.bed && level <= 0.001) return;
    if (!this.bed) {
      this.bed = c.createGain(); this.bed.gain.value = 0;
      this.lp = c.createBiquadFilter(); this.lp.type = "lowpass"; this.lp.frequency.value = 400; this.lp.Q.value = 2;
      this.lp.connect(this.bed); this.bed.connect(K.out); this.bed.connect(K.space());
      const root = mtof(degree(K.root - 24, 0));
      for (const [m, type, v, det] of [[1, "sine", .5, 0], [1.5, "sine", .3, 4], [2, "triangle", .18, -6], [4, "sine", .08, 7]] as [number, OscillatorType, number, number][]) {
        const o = c.createOscillator(), g = c.createGain(), lfo = c.createOscillator(), lg = c.createGain();
        o.type = type; o.frequency.value = root * m; o.detune.value = det; g.gain.value = v;
        lfo.frequency.value = .3 + m * .17; lg.gain.value = v * .35; lfo.connect(lg); lg.connect(g.gain); // (breathing)
        o.connect(g); g.connect(this.lp); o.start(now); lfo.start(now);
      }
    }
    const L = Math.max(0, Math.min(1, level));
    this.bed.gain.setTargetAtTime(S.volume * S.hum * L * L, now, .12);
    this.lp!.frequency.setTargetAtTime(300 + 2600 * L, now, .15);
  }

  /** The paper stirring. */
  rustle(amount: number): void {
    const K = this.k, S = K.T.spell, c = K.ctx;
    if (!K.ready("spell-rustle", .12)) return;
    const at = c.currentTime + .005, vol = S.volume * S.rustle * (.4 + .6 * amount);
    for (let i = 0, n = 3 + Math.floor(Math.random() * 3); i < n; i++) {
      const t = at + i * (.025 + Math.random() * .035), bp = c.createBiquadFilter(), g = c.createGain(), out = K.voice(.4 + (Math.random() - .5) * .3);
      bp.type = "bandpass"; bp.frequency.value = 2500 + Math.random() * 3500; bp.Q.value = .8;
      g.connect(out); K.env(g, t, vol * (.5 + Math.random() * .5), .004, .04 + Math.random() * .05);
      bp.connect(g); K.noiseBurst(t, .1, bp, Math.random());
    }
  }

  /** The grow: crackling static and sparks thickening over `length` seconds, a shimmer rising under them. */
  crackle(length = .95): void {
    const K = this.k, S = K.T.spell, c = K.ctx, at = c.currentTime + .01, vol = S.volume * S.crackle;
    for (let i = 0, n = 60; i < n; i++) {
      const x = Math.pow(Math.random(), .6), t = at + x * length, hp = c.createBiquadFilter(), g = c.createGain(), out = K.voice((Math.random() - .5) * 1.2);
      hp.type = "highpass"; hp.frequency.value = 1800 + Math.random() * 5000;
      g.connect(out); K.env(g, t, vol * (.2 + .8 * x) * (Math.random() < .12 ? 2 : .6), .0006, .006 + Math.random() * .02);
      hp.connect(g); K.noiseBurst(t, .03, hp, Math.random());
    }
    // the shimmer: the scale's notes rising, quick, faint, ringing in the space
    const sg = c.createGain(); sg.connect(K.out); sg.connect(K.space());
    sg.gain.setValueAtTime(.0001, at); sg.gain.exponentialRampToValueAtTime(vol * .35, at + length); sg.gain.exponentialRampToValueAtTime(.0001, at + length + .15);
    for (let i = 0; i < 10; i++) { const t = at + i * length / 10, f = mtof(degree(K.root, i)); const o = K.osc("triangle", f, t, length / 10 + .05, sg); o.detune.value = (Math.random() - .5) * 10; }
  }

  /** The burst. */
  burst(): void {
    const K = this.k, S = K.T.spell, c = K.ctx, at = c.currentTime + .01, vol = S.volume * S.burst;
    // the whoosh: noise through a band sweeping down
    const bp = c.createBiquadFilter(), wg = c.createGain(); bp.type = "bandpass"; bp.Q.value = .7;
    bp.frequency.setValueAtTime(5000, at); bp.frequency.exponentialRampToValueAtTime(260, at + .8);
    wg.connect(K.out); K.env(wg, at, vol * .9, .015, .8); bp.connect(wg); K.noiseBurst(at, .85, bp, .3);
    // the boom
    const th = c.createGain(); th.connect(K.out); K.env(th, at, vol * .8, .004, .5);
    const o = K.osc("sine", 120, at, .55, th); o.frequency.exponentialRampToValueAtTime(38, at + .45);
    // the chord ringing out: root, fifth, octave, tenth, in the space
    const cg = c.createGain(); cg.connect(K.out); cg.connect(K.space());
    cg.gain.setValueAtTime(.0001, at); cg.gain.exponentialRampToValueAtTime(vol * .4, at + .02); cg.gain.exponentialRampToValueAtTime(.0001, at + 1.6);
    for (const [i, d] of [0, 4, 7, 9].entries()) { const t = K.osc(i % 2 ? "triangle" : "sine", mtof(degree(K.root, d)), at, 1.65, cg); t.detune.value = (Math.random() - .5) * 8; }
  }
}
