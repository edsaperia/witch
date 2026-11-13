// The sounds of the effects on her (render/herEffects.ts; Ed, 2026-11-13: "Mark + tint + sound"): short and distinct for each, under
// the music (the tuning's sfx.effects). Slowed: a low sagging "bwomm", again and again while it lasts. Confused: a thin tone that
// wobbles, again and again while it lasts. Thrown hard: one scrape of grit along the ground, longer the further she slides.
import type { SfxKit } from "./sfxKit";

/** Slowed: a low note sagging, as if through treacle; i: which repeat (every other one a step lower). */
export function slowed(K: SfxKit, i: number, pan = 0): void {
  const E = K.T.effects, c = K.ctx, at = c.currentTime + 0.005, out = K.voice(pan, 0.3, 0.5), vol = E.volume * E.slow, f = i % 2 ? 147 : 165;
  for (const [r, l] of [[1, 1], [1.5, 0.35]]) {
    const g = c.createGain(); g.connect(out); K.env(g, at, vol * l, 0.03, 0.3);
    const o = K.osc("triangle", f * r, at, 0.4, g); o.frequency.setValueAtTime(f * r, at); o.frequency.exponentialRampToValueAtTime(f * r * 0.7, at + 0.3);
  }
}

/** Confused: a thin tone wobbling in pitch, a little higher each other repeat. */
export function confused(K: SfxKit, i: number, pan = 0): void {
  const E = K.T.effects, c = K.ctx, at = c.currentTime + 0.005, out = K.voice(pan + 0.3 * Math.sin(i * 1.7), 0.3, 0.5), f = i % 2 ? 740 : 622;
  const g = c.createGain(); g.connect(out); K.env(g, at, E.volume * E.confuse * 0.5, 0.02, 0.32);
  const o = K.osc("sine", f, at, 0.4, g), lfo = c.createOscillator(), depth = c.createGain();
  lfo.frequency.value = 11; depth.gain.value = f * 0.06; lfo.connect(depth); depth.connect(o.frequency); lfo.start(at); lfo.stop(at + 0.45);
}

/** Thrown hard: grit scraping along the ground, falling in pitch as she slows; metres, how far she's thrown. */
export function skid(K: SfxKit, metres: number, pan = 0): void {
  const E = K.T.effects, c = K.ctx, at = c.currentTime + 0.005, k = Math.min(1, Math.max(0.2, metres / 12)), dur = 0.25 + 0.35 * k, out = K.voice(pan, 0.4, dur + 0.2);
  const bp = c.createBiquadFilter(), g = c.createGain(); bp.type = "bandpass"; bp.Q.value = 1.4;
  bp.frequency.setValueAtTime(2600, at); bp.frequency.exponentialRampToValueAtTime(600, at + dur);
  bp.connect(g); g.connect(out); K.env(g, at, E.volume * E.skid * (0.5 + 0.5 * k), 0.02, dur);
  K.noiseBurst(at, dur + 0.1, bp, 0.3);
}
