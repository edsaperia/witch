// What lives in the sea off the beach (Ed, 2026-10-07), heard while she's by the water, far off and under the waves:
//   splash  a dolphin leaping off the east coast (art builder 4's): the blow as it breaks the surface, then its fall back in, a
//           sharp plop and a thump of water with a spray hissing away; `size` 0 a small one to 1 a big one;
//   groan   the kraken off the west coast (art builder 4's), rare and slow: a deep, distant moan, sliding down, its throat's
//           overtones shifting, in the sea's big space;
//   pour    water pouring off its tentacles as they rise, for `dur` seconds: a heavy sheet of it thinning to trickles, and
//           drips falling back into the sea.
// Knobs: the tuning's sfx.seaLife. Subtle: under the music and the waves (places.ts Sea).
import type { SfxKit } from "./sfxKit";

/** A dolphin's leap: its blow breaking the surface, and `fall` seconds later, its splash back in. */
export function splash(K: SfxKit, size = 0.5, pan = 0, near = 1, fall = 0.9): void {
  const S = K.T.seaLife, c = K.ctx, at = c.currentTime + 0.01, r = Math.random, vol = S.volume * S.splash * near * (0.6 + 0.6 * size);
  if (vol <= 0.0005) return;
  const out = K.voice(pan);
  // breaking the surface: a soft rush of water and the blow (a short breath out)
  const bp = c.createBiquadFilter(), g = c.createGain();
  bp.type = "bandpass"; bp.frequency.setValueAtTime(1800, at); bp.frequency.exponentialRampToValueAtTime(900, at + 0.35); bp.Q.value = 0.8;
  g.connect(out); K.env(g, at, vol * 0.35, 0.03, 0.35); bp.connect(g); K.noiseBurst(at, 0.4, bp, r());
  const hb = c.createBiquadFilter(), hg = c.createGain();
  hb.type = "highpass"; hb.frequency.value = 2500;
  hg.connect(out); K.env(hg, at + 0.05, vol * 0.2, 0.01, 0.18); hb.connect(hg); K.noiseBurst(at + 0.05, 0.2, hb, r());
  // falling back in: the plop (a quick bubble's pitch rising), the thump, the spray
  const t = at + fall, f = 260 - 120 * size, pg = c.createGain();
  pg.connect(out); K.env(pg, t, vol * 0.7, 0.002, 0.09);
  const o = K.osc("sine", f, t, 0.12, pg); o.frequency.exponentialRampToValueAtTime(f * 2.6, t + 0.08);
  const lg = c.createGain(), lp = c.createBiquadFilter();
  lp.type = "lowpass"; lp.frequency.value = 500;
  lg.connect(out); K.env(lg, t, vol, 0.004, 0.25 + 0.2 * size); lp.connect(lg); K.noiseBurst(t, 0.5, lp, r());
  const sb = c.createBiquadFilter(), sg = c.createGain();
  sb.type = "bandpass"; sb.frequency.setValueAtTime(4000, t); sb.frequency.exponentialRampToValueAtTime(1500, t + 0.8); sb.Q.value = 0.6;
  sg.gain.value = 0; sg.connect(out); sg.connect(K.space()); K.env(sg, t, vol * 0.55, 0.02, 0.6 + 0.4 * size); sb.connect(sg); K.noiseBurst(t, 1.2, sb, r()); // (silent till its envelope: a gain is 1 before its first event)
}

/** The kraken's groan: a deep moan far off, sliding down, its overtones shifting like a throat, in the sea's space. */
export function groan(K: SfxKit, pan = 0, near = 1): void {
  const S = K.T.seaLife, c = K.ctx, at = c.currentTime + 0.02, r = Math.random, vol = S.volume * S.groan * near;
  if (vol <= 0.0005) return;
  const dur = 4 + r() * 2, f = 38 + r() * 10, out = K.voice(pan), g = c.createGain(), lp = c.createBiquadFilter(), form = c.createBiquadFilter();
  lp.type = "lowpass"; lp.frequency.value = 420; lp.Q.value = 0.7;
  form.type = "bandpass"; form.Q.value = 3;
  form.frequency.setValueAtTime(140, at); form.frequency.linearRampToValueAtTime(260, at + dur * 0.4); form.frequency.linearRampToValueAtTime(110, at + dur);
  g.connect(out); g.connect(K.space());
  g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(vol, at + dur * 0.3); g.gain.setValueAtTime(vol * 0.85, at + dur * 0.7); g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  const body = c.createGain(); body.gain.value = 0.7; body.connect(lp); lp.connect(g);
  const throat = c.createGain(); throat.gain.value = 0.5; throat.connect(form); form.connect(g);
  for (const [m, type, v, det] of [[1, "sawtooth", 1, 0], [1, "sawtooth", 0.7, 9], [2, "triangle", 0.3, -5]] as [number, OscillatorType, number, number][]) {
    const o = c.createOscillator(), og = c.createGain();
    o.type = type; o.detune.value = det; og.gain.value = v;
    o.frequency.setValueAtTime(f * m * 1.12, at); o.frequency.exponentialRampToValueAtTime(f * m, at + dur * 0.35); o.frequency.exponentialRampToValueAtTime(f * m * 0.82, at + dur);
    o.connect(og); og.connect(body); og.connect(throat); o.start(at); o.stop(at + dur + 0.05);
  }
}

/** Water pouring off its tentacles as they rise, over `dur` seconds: a heavy sheet thinning to trickles, drips falling back. */
export function pour(K: SfxKit, dur = 4, pan = 0, near = 1): void {
  const S = K.T.seaLife, c = K.ctx, at = c.currentTime + 0.02, r = Math.random, vol = S.volume * S.pour * near;
  if (vol <= 0.0005) return;
  const out = K.voice(pan), bp = c.createBiquadFilter(), g = c.createGain();
  bp.type = "bandpass"; bp.Q.value = 0.7;
  bp.frequency.setValueAtTime(700, at); bp.frequency.exponentialRampToValueAtTime(2200, at + dur);
  g.connect(out); g.connect(K.space());
  g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(vol, at + 0.6); g.gain.exponentialRampToValueAtTime(vol * 0.15, at + dur * 0.8); g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  bp.connect(g); K.noiseBurst(at, dur, bp, r());
  // the drips and trickles as it thins: more of them, and higher, toward the end
  for (let i = 0, n = Math.round(dur * 5); i < n; i++) {
    const t = at + dur * (0.25 + 0.75 * Math.pow(r(), 0.7)), fq = 600 + r() * 900, dg = c.createGain();
    dg.connect(out); K.env(dg, t, vol * (0.3 + 0.4 * r()), 0.002, 0.08);
    const o = K.osc("sine", fq, t, 0.1, dg); o.frequency.exponentialRampToValueAtTime(fq * 1.9, t + 0.05);
  }
}
