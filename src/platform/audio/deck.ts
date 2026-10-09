// Her decks in the treehouse (the DJ witch, #356): while she stands behind them, what her hands do is heard, quietly,
// in the music's key:
//   scratch  one stroke of the record under her hand on each half-beat of a scratch bar (forward on the beat, back off
//            it): a tone of the key's root and fifth and the record's hiss, their pitch rising and falling with her hand,
//            a "wicka" over the music rather than a part of it;
//   hype     her hand thrown up: a little "woo-hoo!" in her own babble voice (babble.ts whoop);
//   and her routine (art/witch.js DJ_ROUTINE; Ed, 2026-10-07: "drop the needle and do a little scratching performance"):
//   the tonearm lifted (a soft tick), the needle dropped (a thunk through the platter and a crackle as it finds the groove),
//   chirps (a stroke the fader cuts short) and a spin-back (the record wound back, falling away).
// Knobs: the tuning's sfx.deck. Cued by sfxCues.ts (decks) from the same set the picture plays (art/witch.js djGesture).
import type { SfxKit } from "./sfxKit";
import { degree, mtof } from "./dsp";

/** One stroke of the record: `forward` pushed (rising, brighter), else pulled back (lower, duller); `len` times a stroke's
 *  length, `up` how fast her hand takes it at its fastest (times the record's own speed). */
export function scratch(K: SfxKit, forward: boolean, pan = 0, near = 1, len = 1, up = forward ? 1.5 : 1.15, wait = 0, cuts = 0): void {
  const D = K.T.deck, c = K.ctx, at = c.currentTime + 0.005 + wait, dur = D.stroke * len * (0.9 + 0.2 * Math.random());
  const vol = D.volume * D.scratch * near;
  if (vol <= 0.0005) return;
  const out = K.voice(pan), g = c.createGain(), lp = c.createBiquadFilter();
  lp.type = "lowpass"; lp.frequency.value = forward ? 2600 : 1500; lp.Q.value = 3;
  lp.connect(g); g.connect(out);
  // her hand: the record's speed from still to past full and back to still, the level with it
  const peakAt = at + dur * (forward ? 0.35 : 0.45);
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(vol, peakAt);
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  // the crossfader: `cuts` clicks off through the stroke (a transformer's pulses, a flare's one click)
  if (cuts > 0) {
    const fader = c.createGain(); lp.disconnect(); lp.connect(fader); fader.connect(g);
    for (let k = 0; k < cuts; k++) { const t0 = at + ((k + 0.5) / (cuts + 0.5)) * dur; fader.gain.setValueAtTime(1, t0 - 0.004); fader.gain.linearRampToValueAtTime(0, t0); fader.gain.setValueAtTime(0, t0 + dur / (cuts * 4 + 2)); fader.gain.linearRampToValueAtTime(1, t0 + dur / (cuts * 4 + 2) + 0.004); }
  }
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

/** A chirp: a forward stroke the crossfader cuts off near its top (short, bright, clipped). */
export function chirp(K: SfxKit, pan = 0, near = 1): void { scratch(K, true, pan, near, 0.45, 1.6); }

/** The respawn routine's techniques (rules/djSet.ts scratchRoutine; Ed, 2026-10-09): a transformer (a long forward stroke
 *  the fader chops into pulses), a flare (a stroke clicked off once in its middle), a tear (a forward stroke in two pushes),
 *  a stab (a short, hard push). */
export function technique(K: SfxKit, kind: "trans" | "flare" | "tear" | "stab", pan = 0, near = 1): void {
  if (kind === "trans") scratch(K, true, pan, near, 1.6, 1.4, 0, 3);
  else if (kind === "flare") scratch(K, true, pan, near, 1.1, 1.55, 0, 1);
  else if (kind === "tear") { scratch(K, true, pan, near, 0.55, 1.2); scratch(K, true, pan, near * 0.9, 0.6, 1.6, D_TEAR); }
  else scratch(K, true, pan, near * 1.15, 0.3, 1.9);
}
const D_TEAR = 0.07;

/** The record scratched as she's knocked down (Ed, 2026-10-09: "there should be a record scratch on being knocked down"):
 *  the old record dragged back and forth under a hand, louder than her routine (sfx.deck.knock times it), and dragged to a
 *  stop; about 0.8 s. The music stops under it (musicEngine.ts, its gate). */
export function recordScratch(K: SfxKit, pan = 0): void {
  const k = K.T.deck.knock ?? 3;
  const strokes: [boolean, number, number, number][] = [[true, 0, 1.3, 1.9], [false, 0.16, 1.2, 1.3], [true, 0.3, 1.0, 1.7], [false, 0.42, 1.6, 1.1], [false, 0.6, 2.2, 0.7]];
  for (const [fwd, wait, len, up] of strokes) scratch(K, fwd, pan, k, len, up, wait);
}

/** The spin-back: the record wound back by hand, its sound rushing down from past full speed to nothing. */
export function spinBack(K: SfxKit, pan = 0, near = 1): void {
  const D = K.T.deck, c = K.ctx, at = c.currentTime + 0.005, dur = D.stroke * 4, vol = D.volume * D.scratch * near * 0.9;
  if (vol <= 0.0005) return;
  const out = K.voice(pan), g = c.createGain(), lp = c.createBiquadFilter(), root = mtof(degree(K.root - 12, 0));
  lp.type = "lowpass"; lp.Q.value = 2; lp.frequency.setValueAtTime(3200, at); lp.frequency.exponentialRampToValueAtTime(300, at + dur);
  lp.connect(g); g.connect(out);
  g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(vol, at + 0.03); g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  for (const [m, type, v] of [[1, "sawtooth", 0.55], [1.5, "square", 0.25], [2, "sawtooth", 0.2]] as [number, OscillatorType, number][]) {
    const o = c.createOscillator(), og = c.createGain();
    o.type = type; og.gain.value = v;
    o.frequency.setValueAtTime(root * m * 2.2, at); o.frequency.exponentialRampToValueAtTime(root * m * 0.08, at + dur);
    o.connect(og); og.connect(lp); o.start(at); o.stop(at + dur + 0.02);
  }
  const bp = c.createBiquadFilter(), ng = c.createGain();
  bp.type = "bandpass"; bp.Q.value = 1.2; ng.gain.value = D.hiss;
  bp.frequency.setValueAtTime(4500, at); bp.frequency.exponentialRampToValueAtTime(400, at + dur);
  bp.connect(ng); ng.connect(g); K.noiseBurst(at, dur, bp, Math.random());
}

/** The tonearm: `lift`, a soft tick as it comes off its rest; `drop`, the needle meeting the record: a thunk through the
 *  platter, the stylus's click and a swell of crackle as it finds the groove. */
export function needle(K: SfxKit, kind: "lift" | "drop", pan = 0, near = 1): void {
  const D = K.T.deck, c = K.ctx, at = c.currentTime + 0.005, vol = D.volume * D.needle * near;
  if (vol <= 0.0005) return;
  const out = K.voice(pan);
  // the click: a short, bright tick
  const hp = c.createBiquadFilter(), cg = c.createGain();
  hp.type = "highpass"; hp.frequency.value = kind === "lift" ? 3000 : 2200;
  cg.connect(out); K.env(cg, at, vol * (kind === "lift" ? 0.35 : 0.6), 0.0008, kind === "lift" ? 0.02 : 0.03);
  hp.connect(cg); K.noiseBurst(at, 0.04, hp, Math.random());
  if (kind === "lift") return;
  // the thunk: a low knock through the platter, falling
  const tg = c.createGain(); tg.connect(out); K.env(tg, at, vol * 0.9, 0.003, 0.16);
  const o = K.osc("sine", 95, at, 0.2, tg); o.frequency.exponentialRampToValueAtTime(48, at + 0.16);
  // the groove found: a swell of crackle and hiss, settling into the room's record (places.ts Room)
  const bp = c.createBiquadFilter(), ng = c.createGain();
  bp.type = "bandpass"; bp.frequency.value = 2600; bp.Q.value = 0.7;
  ng.connect(out); ng.gain.setValueAtTime(0.0001, at + 0.02); ng.gain.exponentialRampToValueAtTime(vol * 0.25, at + 0.12); ng.gain.exponentialRampToValueAtTime(0.0001, at + 0.9);
  bp.connect(ng); K.noiseBurst(at + 0.02, 0.9, bp, Math.random());
  for (let i = 0; i < 7; i++) {
    const t = at + 0.05 + Math.random() * 0.7, pg = c.createGain(), pb = c.createBiquadFilter();
    pb.type = "bandpass"; pb.frequency.value = 1500 + Math.random() * 3000; pb.Q.value = 2;
    pg.connect(out); K.env(pg, t, vol * 0.3 * (0.3 + 0.7 * Math.random()), 0.0005, 0.006);
    pb.connect(pg); K.noiseBurst(t, 0.01, pb, Math.random());
  }
}
