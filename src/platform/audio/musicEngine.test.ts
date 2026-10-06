import { describe, expect, it } from "vitest";
import styleJson from "../../../config/music-style.json";
import { MusicEngine } from "./musicEngine";
import { Music, tapePitch } from "./music";
import { TUNING } from "../../rules/tuning";
import { mixAt } from "../../rules/music";
import { newBeatClock } from "../../rules/beat";
import type { MusicCue } from "../../rules/musicPlan";
import type { MusicStyle } from "../../rules/musicScore";

const style = styleJson as unknown as MusicStyle;

/** A stand-in audio context: every node and param takes any call and does nothing; its clock is ours to move. */
function fakeContext() {
  const param = () => new Proxy({ value: 0 }, { get: (o, k) => (k in o ? (o as Record<string | symbol, unknown>)[k] : () => {}), set: (o, k, v) => { (o as Record<string | symbol, unknown>)[k] = v; return true; } });
  const node = (): unknown => new Proxy({}, { get: (o, k) => {
    const r = o as Record<string | symbol, unknown>;
    if (k in r) return r[k];
    if (["frequency", "gain", "Q", "detune", "pan", "delayTime", "threshold", "knee", "ratio", "attack", "release", "playbackRate", "offset"].includes(String(k))) return (r[k] = param());
    if (k === "then") return undefined;
    return () => node();
  }, set: (o, k, v) => { (o as Record<string | symbol, unknown>)[k] = v; return true; } });
  const ctx = { currentTime: 0, sampleRate: 32000, destination: node(), createBuffer: (ch: number, n: number) => ({ getChannelData: () => new Float32Array(n), numberOfChannels: ch, length: n }) } as Record<string, unknown>;
  return new Proxy(ctx, { get: (o, k) => (k in o ? o[k as string] : String(k).startsWith("create") ? () => node() : undefined) }) as unknown as BaseAudioContext & { currentTime: number };
}

describe("the music engine's scheduler", () => {
  const cue: MusicCue = { waves: [], nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0 };
  /** Run `seconds` of audio at 60 frames a second, the game clock moving at `speed` of it (with a hitch every `hitchEvery` s); the steps scheduled, in order. */
  function run(speed: number, seconds: number, hitchEvery = 0) {
    const ctx = fakeContext(), e = new MusicEngine(ctx, (ctx as unknown as { destination: AudioNode }).destination, style, 7), clock = newBeatClock(style.bpm);
    const steps: number[] = [];
    const inner = (e as unknown as { step: (...a: unknown[]) => void }).step.bind(e);
    (e as unknown as { step: (...a: unknown[]) => void }).step = (c, s, ...rest) => { steps.push(s as number); inner(c, s, ...rest); };
    let game = 0;
    for (let f = 0; f < seconds * 60; f++) {
      const dt = hitchEvery && f % (hitchEvery * 60) === 0 && f > 0 ? 0.25 : 1 / 60;
      ctx.currentTime += dt; game += Math.min(dt, 0.1) * speed;
      e.update(cue, game, clock, true);
    }
    return steps;
  }

  it("schedules every sixteenth once, in order, at full speed", () => {
    const steps = run(1, 20);
    expect(new Set(steps).size).toBe(steps.length);
    for (let i = 1; i < steps.length; i++) expect(steps[i]).toBe(steps[i - 1] + 1);
    expect(steps.length).toBeGreaterThan(20 * (style.bpm / 60) * 4 * 0.9);
  });

  it("never schedules a sixteenth twice when the game runs slower than the audio or hitches (round 13: the music crackling, then quiet)", () => {
    for (const [speed, hitch] of [[0.5, 0], [0.8, 0], [1, 2], [0.9, 3]] as [number, number][]) {
      const steps = run(speed, 30, hitch);
      expect(new Set(steps).size, `at ${speed}x, a hitch every ${hitch} s`).toBe(steps.length);
      expect(steps.length).toBeGreaterThan(0);
    }
  });
});

describe("a sleeping legend's clearing in the music (Ed, 2026-10-06)", () => {
  it("eases the muffle and the legend's layer in over about a second as she enters, and out as she leaves", () => {
    const ctx = fakeContext(), M = TUNING.music, m = new Music(ctx, 0.4, style, 7), clock = newBeatClock(style.bpm), mix = mixAt(M, 1, 0, 10);
    const cue: MusicCue = { waves: [], nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0 };
    const run = (seconds: number, circle?: MusicCue["circle"]) => { for (let f = 0; f < seconds * 60; f++) { ctx.currentTime += 1 / 60; m.update(mix, { ...cue, circle }, ctx.currentTime, clock, true, M); } return m.circle; };
    run(1);
    expect(m.circle).toBe(0);
    const elk = { species: "elk", level: 1 };
    const quick = run(0.1, elk);
    expect(quick).toBeGreaterThan(0.05);
    expect(quick).toBeLessThan(0.5); // (eased, not cut)
    expect(run(1, elk)).toBeGreaterThan(0.9);
    const leaving = run(0.1);
    expect(leaving).toBeLessThan(0.9);
    expect(leaving).toBeGreaterThan(0.4);
    expect(run(2)).toBe(0);
  });
});

describe("the world slowed in a legend's circle (Ed, 2026-10-06: \"the music and countdown get ~10x slower ... the music audibly slows down\")", () => {
  /** Audio at 60 frames a second, the game's time scale easing to `scale(t)` (seconds of audio in), the game clock moving at it and the engine told; what was scheduled. */
  function run(seconds: number, scale: (t: number) => number, circle?: MusicCue["circle"]) {
    const ctx = fakeContext(), e = new MusicEngine(ctx, (ctx as unknown as { destination: AudioNode }).destination, style, 7), clock = newBeatClock(style.bpm);
    const steps: { s: number; t: number; game: number }[] = [], notes: { t: number; layer?: string; pitch: number }[] = [];
    const E = e as unknown as { step: (...a: unknown[]) => void; play: (...a: unknown[]) => void; pitch: number; notePitch: number };
    const step = E.step.bind(e), play = E.play.bind(e);
    let game = 0;
    E.step = (c, s, t, ...rest) => { steps.push({ s: s as number, t: t as number, game }); step(c, s, t, ...rest); };
    E.play = (n, t, ...rest) => { play(n, t, ...rest); notes.push({ t: t as number, layer: (n as { layer?: string }).layer, pitch: E.notePitch }); };
    const cue: MusicCue = { waves: [], nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0, circle };
    for (let f = 0; f < seconds * 60; f++) {
      const k = scale(ctx.currentTime);
      ctx.currentTime += 1 / 60; game += k / 60;
      e.update(cue, game, clock, true, 0.3, k, tapePitch(k, TUNING.music.slow));
    }
    return { steps, notes };
  }
  const ease = (from: number, to: number, at: number, over = 0.5) => (t: number) => from + (to - from) * Math.min(1, Math.max(0, (t - at) / over));

  it("slows the music with the world: a tenth as many sixteenths, each in order once, on the game clock (so the waves and bars stay in step)", () => {
    const full = run(20, () => 1).steps, slow = run(20, () => 0.1).steps;
    expect(slow.length).toBeGreaterThan(full.length * 0.07);
    expect(slow.length).toBeLessThan(full.length * 0.13);
    for (let i = 1; i < slow.length; i++) expect(slow[i].s).toBe(slow[i - 1].s + 1);
    // slowing, slow, and back up: never a sixteenth twice, never out of order, none skipped once it settles
    const back = run(30, t => (t < 5 ? 1 : t < 15 ? ease(1, 0.1, 5)(t) : ease(0.1, 1, 15)(t)), undefined).steps;
    for (let i = 1; i < back.length; i++) expect(back[i].s, `step ${i}`).toBeGreaterThan(back[i - 1].s);
    expect(new Set(back.map(s => s.s)).size).toBe(back.length);
    // back at full speed, each sixteenth is scheduled just ahead of the game clock reaching it (the scheduler's 0.3 s look-ahead)
    const late = back.filter(x => x.t > 20), beat = (g: number) => g * style.bpm / 60 * 4;
    for (const s of late) expect(Math.abs(beat(s.game) - s.s), `step ${s.s}`).toBeLessThan(0.3 * style.bpm / 60 * 4 + 1);
  });

  it("drops the notes' pitch like a slowing tape (down to its floor), but never the legend's own layer", () => {
    const { notes } = run(12, ease(1, 0.1, 4), { species: "elk", level: 1 });
    const main = notes.filter(n => n.layer !== "circle"), own = notes.filter(n => n.layer === "circle");
    expect(main.filter(n => n.t < 3).every(n => n.pitch === 1)).toBe(true);
    const slowed = main.filter(n => n.t > 5);
    expect(slowed.length).toBeGreaterThan(0);
    for (const n of slowed) { expect(n.pitch).toBeLessThan(0.75); expect(n.pitch).toBeGreaterThanOrEqual(TUNING.music.slow!.floor - 1e-9); }
    expect(own.length).toBeGreaterThan(0);
    expect(own.every(n => n.pitch === 1)).toBe(true);
  });

  it("plays the legend's layer at full speed over the slowed music", () => {
    const sixteenths = (notes: { t: number; layer?: string }[], layer: boolean) => notes.filter(n => (n.layer === "circle") === layer && n.t > 6).length;
    const elk = { species: "elk", level: 1 };
    const atFull = run(20, () => 1, elk).notes, slowed = run(20, ease(1, 0.1, 1), elk).notes;
    // its notes come as often slowed as not; the music's a good deal fewer
    expect(sixteenths(slowed, true)).toBeGreaterThan(sixteenths(atFull, true) * 0.8);
    expect(sixteenths(slowed, false)).toBeLessThan(sixteenths(atFull, false) * 0.3);
  });
});
