import { describe, expect, it } from "vitest";
import styleJson from "../../../config/music-style.json";
import { MusicEngine } from "./musicEngine";
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
