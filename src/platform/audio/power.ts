// A runestone crackling into life as a speaker or soundsystem (Ed, 2026-10-06: "a cool 'electronic
// item crackling into life' sound when a runestone becomes a speaker/soundsystem"): static crackle
// and pops, a capacitor's whine and the mains hum swelling up, a buzz settling into a clean
// powered-on tone in the music's key, and the speaker cone's thump with a little vinyl pop. About
// 1.2 s. Each stone a step up the pentatonic round the home ring, so the boot builds as a phrase,
// and the last (`full`) a fuller chord and a longer tail; every one a little different.
import type { SfxKit } from "./sfxKit";
import { degree, mtof } from "./dsp";

/** Stone `step` (0 the first; the home ring's 0 to 11, or a wave's soundsystem) powering on. */
export function powerUp(K: SfxKit, step: number, pan = 0, near = 1, full = false): void {
  const P = K.T.power, c = K.ctx, at = c.currentTime + 0.01, vol = P.volume * near;
  if (vol <= 0.002 || !K.ready("power", P.gap)) return;
  const out = K.voice(pan), r = () => Math.random();
  const tone = mtof(degree(K.root - 12, step)), hum = mtof(degree(K.root - 36, 0)); // (its note up the scale; the hum the key's low root)
  const settle = at + 0.55 + r() * 0.1, end = settle + (full ? 1.6 : 0.7);

  // static: a scatter of tiny high clicks, thickening then thinning, and two or three louder pops
  const n = 14 + Math.floor(r() * 10);
  for (let i = 0; i < n; i++) {
    const x = Math.pow(r(), 0.8), t = at + x * (settle - at) * 1.05, hp = c.createBiquadFilter(), g = c.createGain();
    hp.type = "highpass"; hp.frequency.value = 2200 + r() * 4500;
    g.connect(out); K.env(g, t, vol * P.crackle * (0.25 + 0.75 * r()) * (1 - 0.5 * x), 0.0008, 0.006 + r() * 0.012);
    hp.connect(g); K.noiseBurst(t, 0.02, hp, r());
  }
  for (let i = 0, pops = 2 + Math.floor(r() * 2); i < pops; i++) {
    const t = at + r() * (settle - at - 0.05), bp = c.createBiquadFilter(), g = c.createGain();
    bp.type = "bandpass"; bp.frequency.value = 900 + r() * 1400; bp.Q.value = 1.5;
    g.connect(out); K.env(g, t, vol * P.crackle * 1.6, 0.0005, 0.03);
    bp.connect(g); K.noiseBurst(t, 0.04, bp, r());
  }

  // the capacitor charging: a thin whine sliding up, faint
  const wg = c.createGain(); wg.connect(out);
  wg.gain.setValueAtTime(0.0001, at); wg.gain.exponentialRampToValueAtTime(vol * P.whine, settle - 0.05); wg.gain.exponentialRampToValueAtTime(0.0001, settle + 0.08);
  const w = K.osc("sine", 700 + r() * 200, at, settle - at + 0.1, wg); w.frequency.exponentialRampToValueAtTime(4200 + 1500 * r(), settle);

  // the hum and the buzz: the mains swelling up, rough and flickering, then gone as the tone comes clean
  const bp = c.createBiquadFilter(), bg = c.createGain(), flick = c.createGain(), lfo = c.createOscillator(), lg = c.createGain();
  bp.type = "bandpass"; bp.frequency.value = 420; bp.Q.value = 0.9;
  bg.connect(out); bp.connect(flick); flick.connect(bg);
  bg.gain.setValueAtTime(0.0001, at); bg.gain.exponentialRampToValueAtTime(vol * P.buzz, settle - 0.02); bg.gain.exponentialRampToValueAtTime(0.0001, settle + 0.15);
  lfo.type = "square"; lfo.frequency.value = 11 + r() * 9; lg.gain.value = 0.35; flick.gain.value = 0.65; lfo.connect(lg); lg.connect(flick.gain); lfo.start(at); lfo.stop(settle + 0.2);
  for (const [m, type] of [[1, "sawtooth"], [2, "square"]] as [number, OscillatorType][]) K.osc(type, hum * m, at, settle - at + 0.2, bp);

  // powered on: the cone's thump, a vinyl pop, and the clean tone (a chord on the last stone)
  const th = c.createGain(); th.connect(out); K.env(th, settle, vol * P.thump * (full ? 1.4 : 1), 0.002, 0.18);
  const o = K.osc("sine", 95, settle, 0.22, th); o.frequency.exponentialRampToValueAtTime(42, settle + 0.18);
  const pop = c.createBiquadFilter(), pg = c.createGain(); pop.type = "lowpass"; pop.frequency.value = 1800;
  pg.connect(out); K.env(pg, settle + 0.01, vol * P.crackle * 1.2, 0.0005, 0.02); pop.connect(pg); K.noiseBurst(settle + 0.01, 0.03, pop, r());
  const tg = c.createGain(); tg.connect(out); tg.connect(K.space());
  tg.gain.setValueAtTime(0.0001, settle); tg.gain.exponentialRampToValueAtTime(vol * P.tone, settle + 0.03); tg.gain.exponentialRampToValueAtTime(0.0001, end);
  const notes = full ? [0, 7, 12, 19] : [0, 12];
  for (const [i, m] of notes.entries()) { const t = K.osc(i % 2 ? "triangle" : "sine", tone * Math.pow(2, m / 12), settle, end - settle + 0.05, tg); t.detune.value = (r() - 0.5) * 8; }
}
