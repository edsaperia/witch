// Fireworks over a soundsystem when a wave reaches an area she's already cleared (Hotel's waveCelebrate; art builder 2
// draws the shells): each shell's whoosh as it climbs (now and then a whistle), its burst (a boom, the night's echo of it
// and a crackle of stars falling), and the party under it cheering. Heard by distance like the rest, the bursts late by
// the time sound takes to reach her (they're far, and high). Knobs: the tuning's sfx.fireworks; cued by sfxCues.ts
// (fireworks).
import type { SfxKit } from "./sfxKit";
import { crackleBuffer } from "./sparkler";

/** A shell climbing for `dur` seconds: a rush of air rising in pitch and falling away, with a whistle if `whistle`. */
export function whoosh(K: SfxKit, dur: number, whistle: boolean, pan = 0, near = 1): void {
  const F = K.T.fireworks, c = K.ctx, at = c.currentTime + 0.005, vol = (F?.volume ?? 0) * (F?.whoosh ?? 0) * near;
  if (vol <= 0.0005) return;
  const out = K.voice(pan), g = c.createGain(), bp = c.createBiquadFilter();
  bp.type = "bandpass"; bp.Q.value = 2.2;
  bp.frequency.setValueAtTime(700, at); bp.frequency.exponentialRampToValueAtTime(3800, at + dur);
  g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(vol, at + 0.08);
  g.gain.exponentialRampToValueAtTime(vol * 0.35, at + dur * 0.8); g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  bp.connect(g); g.connect(out); K.noiseBurst(at, dur, bp, Math.random());
  if (!whistle) return;
  const wg = c.createGain(); wg.connect(out);
  wg.gain.setValueAtTime(0.0001, at); wg.gain.exponentialRampToValueAtTime(vol * 0.25, at + 0.15); wg.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  const o = K.osc("sine", 900 + Math.random() * 300, at, dur, wg); o.frequency.exponentialRampToValueAtTime(2600 + Math.random() * 800, at + dur);
}

/** A shell bursting: a boom (bigger with `size`, 0.5-1.5) rolling off into the night, and its stars crackling down
 *  (`glitter`: a crackle shell's, louder and on for a second longer). */
export function burst(K: SfxKit, size: number, pan = 0, near = 1, glitter = false): void {
  const F = K.T.fireworks, c = K.ctx, at = c.currentTime + 0.005, vol = (F?.volume ?? 0) * near;
  if (vol <= 0.0005) return;
  const out = K.voice(pan), boom = c.createGain();
  // the boom: a low knock and a thud of noise, the far ones duller
  boom.connect(out);
  const echo = c.createGain(); echo.gain.value = F!.echo; boom.connect(echo); echo.connect(K.space());
  K.env(boom, at, vol * F!.boom * size, 0.004, 0.5 + 0.3 * size);
  const o = K.osc("sine", 75 + 25 * Math.random(), at, 0.6, boom); o.frequency.exponentialRampToValueAtTime(34, at + 0.5);
  const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 300 + 1500 * near; lp.connect(boom);
  K.noiseBurst(at, 0.4, lp, Math.random());
  // its stars: a crackle falling away over a second or two
  const cg = c.createGain(), hp = c.createBiquadFilter(), len = 1.2 + Math.random() * 0.8 + (glitter ? 1 : 0);
  hp.type = "highpass"; hp.frequency.value = 1200; hp.connect(cg); cg.connect(out);
  cg.gain.setValueAtTime(0.0001, at + 0.08); cg.gain.exponentialRampToValueAtTime(vol * F!.crackle * (glitter ? 1.6 : 1), at + 0.2); cg.gain.exponentialRampToValueAtTime(0.0001, at + 0.2 + len);
  const s = c.createBufferSource();
  s.buffer = crackles(c); s.playbackRate.value = 0.8 + 0.4 * Math.random();
  s.connect(hp); s.start(at + 0.08, Math.random() * 2, len + 0.2);
}

/** The party under the fireworks cheering: a crowd's "yeah!" (breath through an open vowel, swelling and falling), a
 *  few whoops rising over it. */
export function cheer(K: SfxKit, pan = 0, near = 1): void {
  const F = K.T.fireworks, c = K.ctx, at = c.currentTime + 0.005, vol = (F?.volume ?? 0) * (F?.cheer ?? 0) * near * 4, dur = 3.2; // (a crowd through narrow vowel bands: quiet for its level)
  if (vol <= 0.0005) return;
  const out = K.voice(pan), g = c.createGain();
  g.connect(out);
  g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(vol, at + 0.35);
  g.gain.exponentialRampToValueAtTime(vol * 0.55, at + 1.4); g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  // many voices: noise through the formants of "ah" sliding to "eh", each band wobbling as voices come and go
  for (const [f0, f1, q, v] of [[750, 560, 4, 1], [1150, 1700, 5, 0.7], [2500, 2550, 6, 0.35]] as const) {
    const b = c.createBiquadFilter(), bg = c.createGain();
    b.type = "bandpass"; b.Q.value = q; b.frequency.setValueAtTime(f0, at); b.frequency.linearRampToValueAtTime(f1, at + dur);
    bg.gain.value = v; b.connect(bg); bg.connect(g);
    K.noiseBurst(at, dur, b, Math.random());
  }
  // and a few of them whooping
  for (let i = 0; i < 3; i++) {
    const t = at + 0.2 + Math.random() * 1.2, d = 0.5 + Math.random() * 0.4, wg = c.createGain(), f = 380 + Math.random() * 260;
    wg.connect(out); wg.gain.setValueAtTime(0.0001, t); wg.gain.exponentialRampToValueAtTime(vol * 0.12, t + 0.08); wg.gain.exponentialRampToValueAtTime(0.0001, t + d);
    const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = f * 3; bp.Q.value = 1.5; bp.connect(wg);
    const o = K.osc("sawtooth", f, t, d, bp); o.frequency.exponentialRampToValueAtTime(f * 1.6, t + d * 0.6);
  }
}

/** The stars' crackle, drawn once a context (sparkler.ts's loop, denser). */
const CRACKLES = new WeakMap<BaseAudioContext, AudioBuffer>();
function crackles(c: BaseAudioContext): AudioBuffer {
  let b = CRACKLES.get(c);
  if (!b) { b = crackleBuffer(c, 4, 120, 0.5, 97); CRACKLES.set(c, b); }
  return b;
}
