// The beat clock (Ed, 2026-10-04: the tempo rises from 120 to about 140 bpm through the run, and
// everything on the beat follows the music): how many beats have gone by at any game time. The
// tempo eases from one wave's to the next (the music style's arc, as beat.tempos in the tuning),
// starting on the block line the wave's music lands on (every 4 bars) and ramping smoothly over
// beat.rampBars, so the beat never skips: a ramp starts exactly where the old tempo has got to.
// Beat-time is game time as it would be at the base tempo (beat.bpm): anything that reckons beats
// as time × bpm / 60 stays on the beat by being given beat-time instead of time.
import type { Tuning } from "./tuning";

/** From `time` (seconds) at `beat`, the tempo goes linearly from bpm to bpmTo over dur seconds, then holds. */
export interface TempoSegment { time: number; beat: number; bpm: number; bpmTo: number; dur: number }

export interface BeatClock {
  /** The base tempo beat-time is reckoned at (tuning beat.bpm). */
  base: number;
  segs: TempoSegment[];
  /** The wave whose tempo it is heading for. */
  wave: number;
}

export function newBeatClock(base: number, bpm = base): BeatClock {
  return { base, segs: [{ time: 0, beat: 0, bpm, bpmTo: bpm, dur: 0 }], wave: 0 };
}

function segAtTime(c: BeatClock, time: number): TempoSegment {
  let s = c.segs[0];
  for (const x of c.segs) { if (x.time <= time) s = x; else break; }
  return s;
}

function segAtBeat(c: BeatClock, beat: number): TempoSegment {
  let s = c.segs[0];
  for (const x of c.segs) { if (x.beat <= beat) s = x; else break; }
  return s;
}

/** Beats at the end of a segment's ramp. */
const rampBeats = (s: TempoSegment) => ((s.bpm + s.bpmTo) / 2) * s.dur / 60;

/** Beats gone by at game time `time` (negative times run back at the first tempo). */
export function beatAt(c: BeatClock, time: number): number {
  const s = segAtTime(c, time), dt = time - s.time;
  if (dt <= 0) return s.beat + (s.bpm * dt) / 60;
  if (dt < s.dur) return s.beat + (s.bpm * dt + ((s.bpmTo - s.bpm) * dt * dt) / (2 * s.dur)) / 60;
  return s.beat + rampBeats(s) + (s.bpmTo * (dt - s.dur)) / 60;
}

/** The tempo at game time `time`. */
export function bpmAt(c: BeatClock, time: number): number {
  const s = segAtTime(c, time), dt = time - s.time;
  return dt <= 0 ? s.bpm : dt < s.dur ? s.bpm + ((s.bpmTo - s.bpm) * dt) / s.dur : s.bpmTo;
}

/** The game time of beat `beat`. */
export function timeAt(c: BeatClock, beat: number): number {
  const s = segAtBeat(c, beat), db = beat - s.beat;
  if (db <= 0) return s.time + (db * 60) / s.bpm;
  const rb = rampBeats(s);
  if (s.dur > 0 && db < rb) {
    // bpm·dt + (Δ/2dur)·dt² = 60·db
    const a = (s.bpmTo - s.bpm) / (2 * s.dur), b = s.bpm, k = 60 * db;
    return s.time + (Math.abs(a) < 1e-9 ? k / b : (-b + Math.sqrt(b * b + 4 * a * k)) / (2 * a));
  }
  return s.time + s.dur + ((db - rb) * 60) / s.bpmTo;
}

/** Game time as it would be at the base tempo: give this where beats are reckoned as time × bpm / 60. */
export const beatTime = (c: BeatClock, time: number) => (beatAt(c, time) * 60) / c.base;

/** From beat `atBeat` (now or later), ease to `bpm` over `beats` beats; any change planned after it is dropped. */
export function rampTo(c: BeatClock, atBeat: number, bpm: number, beats: number): void {
  const time = timeAt(c, atBeat), from = bpmAt(c, time);
  c.segs = c.segs.filter(s => s.time < time);
  if (!c.segs.length) c.segs.push({ time: 0, beat: 0, bpm: from, bpmTo: from, dur: 0 });
  // the segment it starts in now ends where the ramp starts: cut it short there
  const last = c.segs[c.segs.length - 1];
  if (last.time + last.dur > time) { const k = (time - last.time) / Math.max(1e-9, last.dur); last.bpmTo = last.bpm + (last.bpmTo - last.bpm) * k; last.dur = time - last.time; }
  const dur = beats > 0 && bpm !== from ? (beats * 60) / ((from + bpm) / 2) : 0;
  c.segs.push({ time, beat: atBeat, bpm: from, bpmTo: bpm, dur });
}

/** The tempo for a wave: its step of the music's arc (beat.tempos), the last one holding on. */
export function waveTempo(t: Pick<Tuning, "beat">, wave: number): number {
  const T = t.beat.tempos;
  return T && T.length ? T[Math.max(0, Math.min(T.length - 1, wave))] : t.beat.bpm;
}

/** The block line (every blockBars bars, in beats) on or just after beat `beat`: a wave within a
 *  quarter bar after a line lands on it, as the music's sections do (rules/musicPlan.ts). */
export function blockLineAfter(beat: number, blockBars: number): number {
  const B = 4 * Math.max(1, blockBars), b = Math.floor(beat / B) * B;
  return beat - b <= 1 ? b : b + B;
}

/** A wave came at `time`: ease to its tempo from the block line its music lands on. */
export function waveArrived(c: BeatClock, t: Pick<Tuning, "beat">, wave: number, time: number): void {
  if (wave === c.wave) return;
  c.wave = wave;
  const target = waveTempo(t, wave), line = blockLineAfter(beatAt(c, time), t.beat.blockBars ?? 4);
  if (Math.abs(target - bpmAt(c, timeAt(c, line))) < 1e-6) return;
  rampTo(c, line, target, 4 * (t.beat.rampBars ?? 8));
}
