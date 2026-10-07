// Knocked down (Ed, 2026-10-07: her hat floats to the floor over a few seconds while the screen darkens, "and a sad trumpet
// sound"), funny rather than grim, in the music's key:
//   sadTrumpet  a muted trumpet's "wah-wah-wah-waaah": three short notes stepping down by semitones and a long last one,
//               each "wah" a plunger mute opening and closing (a lowpass swept up and back), the last one wobbling (the
//               mute and the pitch shaking) and sagging at its end. Played as her hat drops (hotel's knockout timeline,
//               "hatDropped"); with no hat to drop, a shorter "wah-waaah" (sfx.sadTrumpet.bare; Ed: keep it).
//   rewind      (Ed, 2026-10-07: the hat's scene turns into her decks, its brim a spinning record, a rewind smear, then her
//               at the turntable mid-scratch, art builder 3's) a sharp backwards record scratch cutting the trumpet's last
//               long note off, as she's whisked away (the knockout's "sparkleOut"), her scratching at the decks carrying on.
// Knobs: the tuning's sfx.sadTrumpet. Cued by sfxCues.ts (hurt).
import type { SfxKit } from "./sfxKit";
import { mtof } from "./dsp";

/** The sad trumpet: `full`, the "wah-wah-wah-waaah" (about 3.3 s); else the shorter "wah-waaah" (about 1.8 s). Returns its
 *  master gain (to cut it off: rewind) and when its last long note begins, or null when silent. */
export function sadTrumpet(K: SfxKit, full = true, pan = 0): { gain: GainNode; lastAt: number } | null {
  const S = K.T.sadTrumpet, c = K.ctx, at0 = c.currentTime + 0.02, vol = S.volume;
  if (vol <= 0.0005) return null;
  const out = c.createGain(), base = K.root - 12; // (a trumpet's middle: the key's root an octave down from the sound effects')
  out.connect(K.voice(pan));
  let lastAt = at0;
  const notes: [number, number][] = full ? [[3, 0.42], [2, 0.42], [1, 0.42], [0, 1.6]] : [[1, 0.45], [0, 1.25]];
  const space = K.space(), wet = c.createGain(); wet.gain.value = 0.25; out.connect(wet); wet.connect(space);
  let at = at0;
  notes.forEach(([semi, dur], i) => {
    const last = i === notes.length - 1, f = mtof(base + semi), g = c.createGain(), lp = c.createBiquadFilter();
    lp.type = "lowpass"; lp.Q.value = 6;
    // the plunger: closed, opened ("wah"), half closed again; the last note's mute shaking open and shut
    lp.frequency.setValueAtTime(380, at);
    lp.frequency.exponentialRampToValueAtTime(1900, at + 0.12);
    lp.frequency.exponentialRampToValueAtTime(last ? 1300 : 700, at + Math.min(dur, 0.35));
    if (last) {
      const wob = c.createOscillator(), wg = c.createGain();
      wob.frequency.setValueAtTime(4.2, at); wob.frequency.linearRampToValueAtTime(6.5, at + dur);
      wg.gain.setValueAtTime(0, at + 0.3); wg.gain.linearRampToValueAtTime(650, at + dur * 0.8);
      wob.connect(wg); wg.connect(lp.frequency); wob.start(at); wob.stop(at + dur + 0.1);
    }
    if (last) lastAt = at;
    lp.connect(g); g.connect(out);
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(vol, at + 0.035);
    g.gain.setValueAtTime(vol * (last ? 0.95 : 0.85), at + dur - 0.09);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    for (const [type, mul, v, det] of [["sawtooth", 1, 0.6, 0], ["square", 1, 0.25, 6], ["sawtooth", 2, 0.12, -4]] as [OscillatorType, number, number, number][]) {
      const o = c.createOscillator(), og = c.createGain();
      o.type = type; o.detune.value = det; og.gain.value = v;
      o.frequency.setValueAtTime(f * mul * 0.97, at); o.frequency.exponentialRampToValueAtTime(f * mul, at + 0.05); // (a lip's scoop up to the note)
      if (last) {
        // its vibrato widening, and the sag at the end ("waaah..."), a semitone and a bit down
        const vib = c.createOscillator(), vg = c.createGain();
        vib.frequency.value = 5.5; vg.gain.setValueAtTime(0, at + 0.25); vg.gain.linearRampToValueAtTime(f * mul * 0.025, at + dur * 0.85);
        vib.connect(vg); vg.connect(o.frequency); vib.start(at); vib.stop(at + dur + 0.1);
        o.frequency.setValueAtTime(f * mul, at + dur * 0.62); o.frequency.exponentialRampToValueAtTime(f * mul * 0.9, at + dur);
      }
      o.connect(og); og.connect(lp); o.start(at); o.stop(at + dur + 0.05);
    }
    // the breath through the horn
    const bp = c.createBiquadFilter(), ng = c.createGain();
    bp.type = "bandpass"; bp.frequency.value = 1400; bp.Q.value = 1.2;
    ng.connect(out); K.env(ng, at, vol * 0.08, 0.02, dur * 0.8);
    bp.connect(ng); K.noiseBurst(at, dur, bp, Math.random());
    at += dur + 0.06;
  });
  return { gain: out, lastAt };
}

/** The rewind: the trumpet (if one's sounding) cut off at `at` (audio time) by a sharp backwards record scratch, its pitch
 *  whipping up as the record's dragged back and dropping away, a hiss of vinyl with it. */
export function rewind(K: SfxKit, at: number, trumpet: GainNode | null, pan = 0): void {
  const S = K.T.sadTrumpet, c = K.ctx, vol = S.volume * S.rewind, dur = 0.42;
  if (trumpet) { trumpet.gain.cancelScheduledValues(at); trumpet.gain.setValueAtTime(trumpet.gain.value, at); trumpet.gain.setTargetAtTime(0, at, 0.015); }
  if (vol <= 0.0005) return;
  const out = K.voice(pan), g = c.createGain(), lp = c.createBiquadFilter(), f = mtof(K.root - 12);
  lp.type = "lowpass"; lp.Q.value = 4; lp.frequency.setValueAtTime(900, at); lp.frequency.exponentialRampToValueAtTime(5200, at + dur * 0.4); lp.frequency.exponentialRampToValueAtTime(500, at + dur);
  g.gain.value = 0; lp.connect(g); g.connect(out); g.connect(K.space());
  g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(vol, at + 0.03); g.gain.setValueAtTime(vol, at + dur * 0.55); g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  for (const [m, type, v] of [[1, "sawtooth", 0.6], [1.5, "square", 0.25], [2, "sawtooth", 0.25]] as [number, OscillatorType, number][]) {
    const o = c.createOscillator(), og = c.createGain();
    o.type = type; og.gain.value = v;
    o.frequency.setValueAtTime(f * m * 0.4, at); o.frequency.exponentialRampToValueAtTime(f * m * 4.5, at + dur * 0.4); o.frequency.exponentialRampToValueAtTime(f * m * 0.15, at + dur);
    o.connect(og); og.connect(lp); o.start(at); o.stop(at + dur + 0.02);
  }
  const bp = c.createBiquadFilter(), ng = c.createGain();
  bp.type = "bandpass"; bp.Q.value = 1.2; ng.gain.value = 0.7;
  bp.frequency.setValueAtTime(800, at); bp.frequency.exponentialRampToValueAtTime(6000, at + dur * 0.4); bp.frequency.exponentialRampToValueAtTime(700, at + dur);
  bp.connect(ng); ng.connect(g); K.noiseBurst(at, dur, bp, Math.random());
}
