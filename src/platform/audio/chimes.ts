// The short tuned sounds, all in the music's key (the style's root, a minor pentatonic) so a hose
// of 💌s or a run of chimes sits in the track rather than on it: a 💌's chime, the affection tick
// and the invite flourish; a creature turning enraged or happy; the stings (a soundsystem lost, a
// relic found, the boot-up over); the dizzy twinkle of a stun; a 💌 landing on the ground.
import type { SfxKit } from "./sfxKit";
import { degree, grit, mtof } from "./dsp";

/** A 💌 landing: a small glassy chime (a bell's partials); a spent one (inside the creature's
 *  gap: no affection) just a faint tick. */
export function hit(K: SfxKit, pan = 0, near = 1, spent = false): void {
  const H = K.T.hit;
  if (!K.ready(spent ? "hitSpent" : "hit", H.gap)) return;
  const c = K.ctx, at = c.currentTime + 0.005, out = K.voice(pan);
  const f = mtof(degree(K.root + 24, Math.floor(Math.random() * 5)));
  const vol = H.volume * near * (spent ? 0.3 : 1);
  for (const [ratio, lvl, dec] of [[1, 1, 0.35], [2.76, 0.45, 0.18], [5.4, 0.2, 0.08]] as const) {
    const g = c.createGain(); g.connect(out); K.env(g, at, vol * lvl, 0.002, spent ? dec * 0.4 : dec);
    K.osc("sine", f * ratio, at, dec + 0.05, g);
  }
}

/** The affection meter filling: a tick that climbs the key as it fills (0-1). */
export function fill(K: SfxKit, amount: number, pan = 0, near = 1): void {
  const F = K.T.fill;
  const c = K.ctx, at = c.currentTime + 0.03, out = K.voice(pan);
  const steps = Math.max(1, Math.round(5 * F.octaves)), k = Math.round(Math.max(0, Math.min(1, amount)) * steps);
  const f = mtof(degree(K.root + 36, k));
  const g = c.createGain(); g.connect(out); K.env(g, at, F.volume * near, 0.002, 0.05);
  K.osc("square", f, at, 0.06, g);
}

/** Invited (the meter full, or talked round): a rising flourish up the key's bright side, longer
 *  and fuller the bigger the creature (level 0 baby to 3 legend), with a sparkle on top. */
export function invited(K: SfxKit, level: number, pan = 0, near = 1): void {
  const I = K.T.invited, c = K.ctx, at = c.currentTime + 0.01, out = K.voice(pan);
  const n = 3 + Math.max(0, Math.min(3, level)), step = 0.07 - level * 0.006, vol = I.volume * near * (0.75 + level * 0.12);
  const base = K.root + 24 + 3; // (the relative major: brighter)
  for (let i = 0; i < n; i++) {
    const t = at + i * step, f = mtof(degree(base, i * 2 - (i > 2 ? 1 : 0)));
    const g = c.createGain(); g.connect(out); K.env(g, t, vol * (i === n - 1 ? 1 : 0.7), 0.004, i === n - 1 ? 0.5 + level * 0.15 : 0.16);
    K.osc("triangle", f, t, 0.7, g);
    if (level >= 2) { const g2 = c.createGain(); g2.connect(out); K.env(g2, t, vol * 0.25, 0.004, 0.2); K.osc("sine", f * 2, t, 0.3, g2); }
  }
  const end = at + n * step, hp = c.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 6000;
  const ng = c.createGain(); ng.connect(out); K.env(ng, end, vol * 0.3, 0.01, 0.35 + level * 0.1);
  hp.connect(ng); K.noiseBurst(end, 0.5, hp, 0.3);
}

/** Turned enraged: a short low growl with a snarl of grit; `many` together, one heavier growl. */
export function enraged(K: SfxKit, pan = 0, near = 1, many = 1): void {
  const E = K.T.enraged;
  if (!K.ready("enraged", E.gap)) return;
  const c = K.ctx, at = c.currentTime + 0.005, out = K.voice(pan), vol = E.volume * near * Math.min(1.6, 1 + 0.15 * (many - 1));
  const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.setValueAtTime(1400, at); lp.frequency.exponentialRampToValueAtTime(260, at + 0.35); lp.Q.value = 4;
  const sh = c.createWaveShaper(); sh.curve = grit(); sh.connect(lp);
  const g = c.createGain(); g.connect(out); K.env(g, at, vol, 0.01, 0.38);
  lp.connect(g);
  const f = mtof(K.root + (many > 1 ? 0 : 12));
  for (const det of [-14, 0, 11]) { const o = K.osc("sawtooth", f, at, 0.42, sh); o.detune.value = det; o.frequency.exponentialRampToValueAtTime(f * 0.78, at + 0.35); }
}

/** Turned happy: a bubbly pop rising, and a tiny chime after it. */
export function happy(K: SfxKit, pan = 0, near = 1): void {
  const H = K.T.happy;
  if (!K.ready("happy", H.gap)) return;
  const c = K.ctx, at = c.currentTime + 0.005, out = K.voice(pan), vol = H.volume * near;
  const g = c.createGain(); g.connect(out); K.env(g, at, vol, 0.003, 0.09);
  const o = K.osc("sine", 380, at, 0.12, g); o.frequency.exponentialRampToValueAtTime(980, at + 0.07);
  const f = mtof(degree(K.root + 36 + 3, 2 + Math.floor(Math.random() * 3)));
  const g2 = c.createGain(); g2.connect(out); K.env(g2, at + 0.06, vol * 0.45, 0.002, 0.22);
  K.osc("triangle", f, at + 0.06, 0.3, g2);
}

/** A soundsystem lost (the next wave coming sooner): a sad sting, a party gone quiet rather than
 *  a death. A record scratch, the party's chord running down like a tape stopping, then a little
 *  clock ticking faster as the countdown jumps forward, and a soft chime. Heard anywhere.
 *  `urgent` (the wave comes at once): the clock runs quicker and longer, the chime a step higher. */
export function lost(K: SfxKit, urgent = false): void {
  const c = K.ctx, at = c.currentTime + 0.01, vol = K.T.lost.volume, out = K.voice(0);
  // the scratch: band-passed noise swept fast down and up
  const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = 2.5;
  bp.frequency.setValueAtTime(3200, at); bp.frequency.exponentialRampToValueAtTime(700, at + 0.09); bp.frequency.exponentialRampToValueAtTime(2200, at + 0.16);
  const sg = c.createGain(); sg.connect(out); K.env(sg, at, vol * 0.7, 0.005, 0.17);
  bp.connect(sg); K.noiseBurst(at, 0.2, bp, 0.4);
  // the tape stop: the party's chord (the key's minor seventh) sagging an octave as the filter closes
  const t0 = at + 0.12, run = 0.9, lp = c.createBiquadFilter(), cg = c.createGain();
  lp.type = "lowpass"; lp.Q.value = 1; lp.frequency.setValueAtTime(5000, t0); lp.frequency.exponentialRampToValueAtTime(180, t0 + run);
  cg.gain.setValueAtTime(vol * 0.5, t0); cg.gain.setValueAtTime(vol * 0.5, t0 + run * 0.5); cg.gain.exponentialRampToValueAtTime(0.0001, t0 + run);
  lp.connect(cg); cg.connect(out);
  for (const m of [0, 3, 7, 10]) {
    const o = K.osc("sawtooth", mtof(K.root + 12 + m), t0, run, lp);
    o.frequency.exponentialRampToValueAtTime(mtof(K.root + m), t0 + run);
  }
  // the clock: ticks quickening (tick, tock), then a soft chime as it lands
  let t = t0 + run + 0.15;
  for (let i = 0, n = urgent ? 10 : 7; i < n; i++) {
    const k = c.createBiquadFilter(), kg = c.createGain();
    k.type = "bandpass"; k.frequency.value = i % 2 ? 1500 : 2100; k.Q.value = 12;
    kg.connect(out); K.env(kg, t, vol * 0.9, 0.001, 0.035);
    k.connect(kg); K.noiseBurst(t, 0.04, k, i * 0.1);
    t += (urgent ? 0.13 : 0.2) * Math.pow(urgent ? 0.86 : 0.82, i);
  }
  const f = mtof(degree(K.root + 24, urgent ? 4 : 2));
  for (const [r, l] of [[1, 1], [2.76, 0.35]]) { const g = c.createGain(); g.connect(out); K.env(g, t + 0.05, vol * 0.4 * l, 0.003, 0.6); K.osc("sine", f * r, t + 0.05, 0.7, g); }
}

/** A relic bottle spotted (or reached): a rare, magical chime, glass partials rising through a
 *  bright scale over a shimmer, in the legends' big space: a lucky find. */
export function relic(K: SfxKit, pan = 0): void {
  const R = K.T.relic, c = K.ctx, at = c.currentTime + 0.01, out = K.voice(pan), vol = R.volume;
  const notes = [0, 4, 7, 11, 14, 18]; // (a lydian sparkle over the key's relative major)
  notes.forEach((m, i) => {
    const t = at + i * 0.085, f = mtof(K.root + 39 + m);
    for (const [r, l, d] of [[1, 1, 1.4], [2.32, 0.4, 0.8], [4.25, 0.22, 0.5], [6.63, 0.12, 0.3]]) {
      const g = c.createGain(); g.connect(out); g.connect(K.space()); K.env(g, t, vol * l * (i === notes.length - 1 ? 1.2 : 0.8), 0.003, d);
      K.osc("sine", f * r, t, d + 0.1, g);
    }
  });
  const hp = c.createBiquadFilter(), ng = c.createGain(); hp.type = "highpass"; hp.frequency.value = 7000;
  ng.connect(out); ng.connect(K.space()); ng.gain.setValueAtTime(0.0001, at); ng.gain.exponentialRampToValueAtTime(vol * 0.25, at + 0.4); ng.gain.exponentialRampToValueAtTime(0.0001, at + 1.4);
  hp.connect(ng); K.noiseBurst(at, 1.5, hp, 0.2);
}

/** Stunned: one soft twinkle of the dizzy loop (the cue plays them round and round while it lasts). */
export function twinkle(K: SfxKit, i: number, pan = 0): void {
  const N = K.T.knock, c = K.ctx, at = c.currentTime + 0.005, out = K.voice(pan + 0.4 * Math.sin(i * 1.3));
  const f = mtof(degree(K.root + 48, [0, 2, 4, 2, 1, 3][i % 6]));
  for (const [r, l] of [[1, 1], [2.76, 0.3]]) { const g = c.createGain(); g.connect(out); K.env(g, at, N.volume * N.twinkle * l, 0.002, 0.16); K.osc("sine", f * r, at, 0.2, g); }
}

/** A 💌 that met no one coming down on the ground (invites' "fizzled": thrown its full range): a
 *  soft papery puff, a flutter of air and the faintest pat. */
export function land(K: SfxKit, pan = 0, near = 1): void {
  const L = K.T.land;
  if (!K.ready("land", L.gap)) return;
  const c = K.ctx, at = c.currentTime + 0.005, out = K.voice(pan), vol = L.volume * near;
  const bp = c.createBiquadFilter(), g = c.createGain(); bp.type = "bandpass"; bp.Q.value = 0.9;
  bp.frequency.setValueAtTime(2400, at); bp.frequency.exponentialRampToValueAtTime(900, at + 0.09);
  g.connect(out); K.env(g, at, vol, 0.006, 0.09);
  bp.connect(g); K.noiseBurst(at, 0.12, bp, Math.random());
  const p = c.createGain(); p.connect(out); K.env(p, at + 0.01, vol * 0.5, 0.002, 0.05);
  const o = K.osc("sine", 240, at + 0.01, 0.07, p); o.frequency.exponentialRampToValueAtTime(140, at + 0.06);
}

/** The boot-up over (home's speakers all on, the first wave's countdown begun): things stirring. A
 *  low drone breathing in under the music, the key's chord opening above it, and a few far bells
 *  waking one by one, rising, in the legends' big space: the forest waking up, gently. */
export function stir(K: SfxKit): void {
  const S = K.T.stir, c = K.ctx, at = c.currentTime + 0.05, vol = S.volume, len = 4.5, out = K.voice(0);
  // the drone and the chord: a low root swelling in, the chord's notes opening through a filter
  const lp = c.createBiquadFilter(), g = c.createGain(); lp.type = "lowpass"; lp.Q.value = 2;
  lp.frequency.setValueAtTime(250, at); lp.frequency.exponentialRampToValueAtTime(2600, at + len * 0.7); lp.frequency.exponentialRampToValueAtTime(600, at + len);
  g.connect(out); g.connect(K.space());
  g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(vol * 0.5, at + len * 0.6); g.gain.exponentialRampToValueAtTime(0.0001, at + len);
  lp.connect(g);
  for (const [m, det] of [[0, -6], [7, 5], [12, -4], [15, 7], [19, -3]]) { const o = K.osc("sawtooth", mtof(K.root + m), at, len, lp); o.detune.value = det; }
  const sub = c.createGain(); sub.connect(out); sub.gain.setValueAtTime(0.0001, at); sub.gain.exponentialRampToValueAtTime(vol * 0.4, at + len * 0.5); sub.gain.exponentialRampToValueAtTime(0.0001, at + len);
  K.osc("sine", mtof(K.root - 12), at, len, sub);
  // the bells waking: up the pentatonic, slowing, each fainter and further off
  [0, 2, 4, 5, 7].forEach((k, i) => {
    const t = at + 0.9 + i * (0.35 + i * 0.08), f = mtof(degree(K.root + 24, k));
    for (const [r, l, d] of [[1, 1, 1.6], [2.76, 0.3, 0.7]]) { const b = c.createGain(); b.connect(out); b.connect(K.space()); K.env(b, t, vol * 0.35 * l * (1 - i * 0.12), 0.004, d); K.osc("sine", f * r, t, d + 0.1, b); }
  });
}
