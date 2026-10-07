// Her decks in the treehouse (the DJ witch, #356): while she stands behind them, what her hands do is heard, quietly,
// in the music's key:
//   scratch  one stroke of the record under her hand on each half-beat of a scratch bar (forward on the beat, back off
//            it): a tone of the key's root and fifth and the record's hiss, their pitch rising and falling with her hand,
//            a "wicka" over the music rather than a part of it;
//   hype     her hand thrown up: a little "woo-hoo!" in her own babble voice (babble.ts whoop).
// Knobs: the tuning's sfx.deck. Cued by sfxCues.ts (decks) from the same set the picture plays (art/witch.js djGesture).
import type { SfxKit } from "./sfxKit";
import { degree, mtof } from "./dsp";

/** One stroke of the record: `forward` pushed (rising, brighter), else pulled back (lower, duller). */
export function scratch(K: SfxKit, forward: boolean, pan = 0, near = 1): void {
  const D = K.T.deck, c = K.ctx, at = c.currentTime + 0.005, dur = D.stroke * (0.9 + 0.2 * Math.random());
  const vol = D.volume * D.scratch * near;
  if (vol <= 0.0005) return;
  const out = K.voice(pan), g = c.createGain(), lp = c.createBiquadFilter();
  lp.type = "lowpass"; lp.frequency.value = forward ? 2600 : 1500; lp.Q.value = 3;
  lp.connect(g); g.connect(out);
  // her hand: the record's speed from still to past full and back to still, the level with it
  const up = forward ? 1.5 : 1.15, peakAt = at + dur * (forward ? 0.35 : 0.45);
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(vol, peakAt);
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  const root = mtof(degree(K.root - 12, 0));
  for (const [m, type, v] of [[1, "sawtooth", 0.55], [1.5, "square", 0.25], [2, "sawtooth", 0.2]] as [number, OscillatorType, number][]) {
    const o = c.createOscillator(), og = c.createGain();
    o.type = type; og.gain.value = v;
    o.frequency.setValueAtTime(root * m * 0.2, at);
    o.frequency.linearRampToValueAtTime(root * m * up, peakAt);
    o.frequency.linearRampToValueAtTime(root * m * 0.25, at + dur);
    o.connect(og); og.connect(lp); o.start(at); o.stop(at + dur + 0.02);
  }
  // the groove's hiss under the stylus, its band following the speed
  const bp = c.createBiquadFilter(), ng = c.createGain();
  bp.type = "bandpass"; bp.Q.value = 1.4; ng.gain.value = D.hiss;
  bp.frequency.setValueAtTime(500, at);
  bp.frequency.linearRampToValueAtTime(forward ? 3800 : 2400, peakAt);
  bp.frequency.linearRampToValueAtTime(600, at + dur);
  bp.connect(ng); ng.connect(g);
  K.noiseBurst(at, dur, bp, Math.random());
}
