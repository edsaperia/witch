// The legends' voices (Ed, 2026-10-05: "the legends should sound like whale song; deep and slow"):
// long gliding moans in a big space, by mood; a sleeping legend's soft moan now and then, wavering
// into a nightmare when it's restless; a long-range attack's wind-up one building swell.
import type { SfxKit } from "./sfxKit";
import { grit } from "./dsp";
import type { Mood } from "./voices";

/** What a legend's whale song says: its mood, asleep (dreaming or a nightmare), or an attack's swell. */
export type WhaleKind = Mood | "sleep" | "nightmare" | "swell";

/** Its contour: [share of the moan, semitones]. */
const SHAPES: Record<WhaleKind, [number, number][]> = {
  happy: [[0, 0], [0.3, 5], [0.5, 3], [0.8, 8], [1, 10]],
  grumpy: [[0, 2], [0.6, 0], [1, -3]],
  enraged: [[0, 3], [0.25, 1], [1, -10]],
  sleep: [[0, 0], [0.45, 4], [1, -2]],
  nightmare: [[0, 0], [0.2, 3], [0.4, -2], [0.6, 4], [0.8, -3], [1, 1]],
  swell: [[0, -7], [0.7, 2], [1, 7]],
};

export class Whale {
  /** When the sleeper next moans. */
  private nextMoan = 0;

  constructor(private k: SfxKit) {}

  /** A legend's slow attack winding up (well telegraphed: hear it, then move): one long building
   *  swell of its whale song, `windup.length` seconds, landing when it fires. */
  windup(pan = 0, near = 1): void {
    const W = this.k.T.windup;
    if (!this.k.ready("windup", 0.25)) return;
    this.whale("swell", pan, Math.max(0.6, near), Math.max(0.3, W.length), W.volume * 0.5);
  }

  /** The nearest sleeping legend, each frame (`sleep` 0-1 by how near, `unease` its restlessness by
   *  nearness): now and then a slow, soft moan of whale song as it dreams; restless, the moans come
   *  more often, wavering, a nightmare. (`breath`, its breathing, swells each moan a little.) */
  legends(sleep: number, breath: number, unease: number, pan = 0): void {
    const T = this.k.T, now = this.k.ctx.currentTime, Wh = T.whale;
    if (sleep <= 0.01) { this.nextMoan = Math.min(this.nextMoan, now + 1.5); return; }
    if (now < this.nextMoan) return;
    const bad = unease > 0.25;
    this.nextMoan = now + Wh.sleepEvery * (1 - 0.55 * unease) * (0.75 + 0.5 * Math.random()) / Math.max(0.3, Wh.speed);
    this.whale(bad ? "nightmare" : "sleep", pan, sleep * (bad ? T.nightmare.volume / Math.max(0.01, T.snore.volume) * (0.6 + 0.4 * unease) : 1) * (0.9 + 0.2 * breath), 0, T.snore.volume);
  }

  /** A legend sings: a long, slow, deep moan gliding over seconds, its overtones through a resonant
   *  throat, a slow vibrato, low clicks, in a big space. Happy rises, melodic and calm; enraged
   *  groans lower and longer, falling, with grit; a nightmare wavers; an attack's swell builds for
   *  `length` seconds. */
  whale(kind: WhaleKind, pan = 0, near = 1, length = 0, volume = this.k.T.whale.volume): void {
    const K = this.k, Wh = K.T.whale, c = K.ctx, sp = Math.max(0.3, Wh.speed);
    if (kind !== "swell" && kind !== "sleep" && kind !== "nightmare" && !K.ready("whale", 1.2 / sp)) return;
    const at = c.currentTime + 0.01, base = Wh.depth * (kind === "enraged" ? 0.8 : kind === "happy" ? 1.15 : 1);
    const dur = kind === "swell" ? Math.max(0.3, length) : ({ happy: 2.4, grumpy: 2, enraged: 3.2, sleep: 3, nightmare: 2.6 } as Record<string, number>)[kind] / sp;
    const vol = volume * near, pts = SHAPES[kind];
    const out = K.voice(pan), g = c.createGain();
    g.connect(out); g.connect(K.space());
    // swell: builds to the end; the rest breathe in and out slowly
    g.gain.setValueAtTime(0.0001, at);
    if (kind === "swell") { g.gain.exponentialRampToValueAtTime(vol * 0.15, at + dur * 0.3); g.gain.exponentialRampToValueAtTime(vol, at + dur); g.gain.exponentialRampToValueAtTime(0.0001, at + dur + 0.5); }
    else { g.gain.exponentialRampToValueAtTime(vol, at + dur * 0.3); g.gain.setValueAtTime(vol, at + dur * 0.65); g.gain.exponentialRampToValueAtTime(0.0001, at + dur); }
    // the throat: a resonant low-pass riding with the pitch
    const throat = c.createBiquadFilter(); throat.type = "lowpass"; throat.Q.value = 7;
    let into: AudioNode = throat;
    if (kind === "enraged") { const sh = c.createWaveShaper(); sh.curve = grit(); const pre = c.createGain(); pre.gain.value = 1.6; pre.connect(sh); sh.connect(throat); into = pre; }
    throat.connect(g);
    const lfo = c.createOscillator(), depth = c.createGain();
    lfo.frequency.value = kind === "nightmare" ? 3.1 + Math.random() : 4.5;
    depth.gain.value = kind === "nightmare" ? 45 : kind === "swell" ? 20 : 9; // (cents)
    lfo.connect(depth); lfo.start(at); lfo.stop(at + dur + 0.6);
    for (const [ratio, lvl, type] of [[1, 1, "sine"], [2, 0.35, "triangle"], [3, 0.14, "sine"]] as [number, number, OscillatorType][]) {
      const o = c.createOscillator(), og = c.createGain();
      o.type = type; og.gain.value = lvl;
      o.frequency.setValueAtTime(base * ratio * Math.pow(2, pts[0][1] / 12), at);
      for (const [x, st] of pts.slice(1)) o.frequency.exponentialRampToValueAtTime(base * ratio * Math.pow(2, st / 12), at + x * dur);
      depth.connect(o.detune);
      o.connect(og); og.connect(into); o.start(at); o.stop(at + dur + 0.6);
    }
    throat.frequency.setValueAtTime(base * 3, at);
    for (const [x, st] of pts.slice(1)) throat.frequency.exponentialRampToValueAtTime(base * (kind === "swell" ? 3 + 5 * x : 4) * Math.pow(2, st / 12), at + x * dur);
    // a soft upsweep near the end of a happy song
    if (kind === "happy" || kind === "sleep") {
      const t0 = at + dur * 0.7, ug = c.createGain(); ug.connect(g);
      ug.gain.setValueAtTime(0.0001, t0); ug.gain.exponentialRampToValueAtTime(0.12, t0 + 0.25); ug.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.6);
      const u = K.osc("sine", base * 4, t0, 0.65, ug); u.frequency.exponentialRampToValueAtTime(base * 7, t0 + 0.55);
    }
    // low clicks and groans now and then (not in the swell: it stays one clear sound)
    if (kind !== "swell") for (let k = 0, n = 1 + Math.floor(Math.random() * 3); k < n; k++) {
      const t0 = at + dur * (0.15 + 0.7 * Math.random()), bp = c.createBiquadFilter(), cg = c.createGain();
      bp.type = "bandpass"; bp.frequency.value = 250 + Math.random() * 350; bp.Q.value = 3;
      cg.connect(out); cg.connect(K.space()); K.env(cg, t0, vol * 0.5, 0.001, 0.025);
      bp.connect(cg); K.noiseBurst(t0, 0.03, bp, Math.random());
    }
  }
}
