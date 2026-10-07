// Knocked down (Ed, 2026-10-07: her hat floats to the floor over a few seconds while the screen darkens, "and a sad trumpet
// sound"), funny rather than grim, in the music's key:
//   sadTrumpet  a muted trumpet's "wah-wah-wah-waaah": three short notes stepping down by semitones and a long last one,
//               each "wah" a plunger mute opening and closing (a lowpass swept up and back), the last one wobbling (the
//               mute and the pitch shaking) and sagging at its end. Played as her hat drops (hotel's knockout timeline,
//               "hatDropped"); with no hat to drop, a shorter "wah-waaah" (sfx.sadTrumpet.bare: DECISION FOR ED).
//   snuff       a candle guttering out on her DJ desk (art builder 4's candles), one after another through her wait behind
//               the decks (hotel's rules/knockout.ts candleMelt reaching 1): a tiny puff of breath, falling. Subtle.
// Knobs: the tuning's sfx.sadTrumpet and sfx.snuff. Cued by sfxCues.ts (hurt).
import type { SfxKit } from "./sfxKit";
import { mtof } from "./dsp";

/** The sad trumpet: `full`, the "wah-wah-wah-waaah" (about 3.3 s); else the shorter "wah-waaah" (about 1.8 s). */
export function sadTrumpet(K: SfxKit, full = true, pan = 0): void {
  const S = K.T.sadTrumpet, c = K.ctx, at0 = c.currentTime + 0.02, vol = S.volume;
  if (vol <= 0.0005) return;
  const out = K.voice(pan), base = K.root - 12; // (a trumpet's middle: the key's root an octave down from the sound effects')
  const notes: [number, number][] = full ? [[3, 0.42], [2, 0.42], [1, 0.42], [0, 1.6]] : [[1, 0.45], [0, 1.25]];
  const space = K.space(), wet = c.createGain(); wet.gain.value = 0.25; wet.connect(space);
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
    lp.connect(g); g.connect(out); g.connect(wet);
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
}

/** A candle guttering out: a tiny puff of breath, its pitch falling, and a wisp after. */
export function snuff(K: SfxKit, pan = 0): void {
  const S = K.T.snuff, c = K.ctx, at = c.currentTime + 0.005, vol = S.volume * (0.8 + 0.4 * Math.random());
  if (vol <= 0.0005 || !K.ready("snuff", S.gap)) return;
  const out = K.voice(pan), bp = c.createBiquadFilter(), g = c.createGain();
  bp.type = "bandpass"; bp.Q.value = 1.5;
  bp.frequency.setValueAtTime(2600 + Math.random() * 600, at); bp.frequency.exponentialRampToValueAtTime(700, at + 0.18);
  g.connect(out); g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(vol, at + 0.015); g.gain.exponentialRampToValueAtTime(vol * 0.25, at + 0.12); g.gain.exponentialRampToValueAtTime(0.0001, at + 0.45);
  bp.connect(g); K.noiseBurst(at, 0.45, bp, Math.random());
}
