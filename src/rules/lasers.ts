// The soundsystems' laser shows (Ed, 2026-10-03): each playing soundsystem now and then shoots a
// fan of thin beams into the sky, sweeping in time with the music. Not all the time: bursts of a
// few bars on, then off a while, the beam count stepping between 1 and maxCount on bar
// boundaries, seeded per soundsystem so neighbours aren't in lockstep. The show is a function of
// time, a seed and the music's energy: today a seeded pattern on the beat clock (tuning beat.bpm)
// with energy 1; later, real audio analysis can feed `energy` (and the clock). No drawing here.
import { clamp, hash2, smoothstep } from "./random";
import type { Tuning } from "./tuning";

export interface LaserShow {
  /** 0 off to 1 fully on: fades in fast and out a little slower, never pops. */
  on: number;
  /** How many beams, 1 to maxCount. */
  count: number;
  /** The fan's swing off vertical, radians, in time with the beat. */
  sweep: number;
  /** How far open the fan is, 0 to 1 of lasers.spread. */
  open: number;
  /** Colour along the party palette, 0 to 1 (wraps). */
  hue: number;
}

const COUNTS = [1, 3, 5, 7, 9];

/** The beat clock: seconds per beat and per bar (4 beats). */
export const beatClock = (t: Tuning) => { const beat = 60 / Math.max(1, t.beat.bpm); return { beat, bar: beat * 4 }; };

export function laserShow(time: number, seed: number, energy: number, t: Tuning): LaserShow {
  const L = t.lasers, { beat, bar } = beatClock(t), blockLen = bar * Math.max(1, L.blockBars);
  const block = Math.floor(time / blockLen), local = time - block * blockLen;
  // Each block of a few bars is on or off, by the seed: on about `duty` of the time (more with energy).
  const duty = clamp(L.duty * energy, 0, 1);
  const isOn = hash2(seed, block, 311) < duty;
  const on = isOn ? smoothstep(local / Math.max(1e-3, L.fadeIn)) * smoothstep((blockLen - local) / Math.max(1e-3, L.fadeOut)) : 0;
  // The count steps on bar boundaries.
  const barIdx = Math.floor(local / bar), choices = COUNTS.filter(c => c <= L.maxCount);
  const count = choices[Math.floor(hash2(seed, block * 64 + barIdx, 313) * choices.length) % choices.length] ?? 1;
  const ph = (seed % 97) * 0.37;
  const sweep = Math.sin((2 * Math.PI * time) / (beat * L.sweepBeats) + ph) * (L.sweep * Math.PI) / 180;
  const open = 0.55 + 0.45 * Math.sin((2 * Math.PI * time) / (bar * L.openBars) + ph * 2);
  const hue = (((seed % 1000) * 0.0137 + time / (bar * 8)) % 1 + 1) % 1;
  return { on, count, sweep, open, hue };
}
