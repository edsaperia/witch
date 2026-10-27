import { afterEach, describe, expect, it } from "vitest";
import styleJson from "../../../config/music-style.json";
import { Music } from "./music";
import { TUNING } from "../../rules/tuning";
import { mixAt } from "../../rules/music";
import { newBeatClock } from "../../rules/beat";
import type { MusicCue } from "../../rules/musicPlan";
import type { MusicStyle } from "../../rules/musicScore";

const style = styleJson as unknown as MusicStyle;

/** A stand-in node: takes any call, its params any value. */
function node(): unknown {
  const param = () => new Proxy({ value: 0 }, { get: (o, k) => (k in o ? (o as Record<string | symbol, unknown>)[k] : () => {}), set: (o, k, v) => { (o as Record<string | symbol, unknown>)[k] = v; return true; } });
  return new Proxy({}, { get: (o, k) => {
    const r = o as Record<string | symbol, unknown>;
    if (k in r) return r[k];
    if (["frequency", "gain", "Q", "detune", "pan", "delayTime", "threshold", "knee", "ratio", "attack", "release", "playbackRate", "offset"].includes(String(k))) return (r[k] = param());
    if (k === "then") return undefined;
    return () => node();
  }, set: (o, k, v) => { (o as Record<string | symbol, unknown>)[k] = v; return true; } });
}

/** A stand-in context, its clock ours to move; `extra` its own createX functions over the stand-in nodes. */
function context(extra: Record<string, unknown> = {}) {
  const ctx = { currentTime: 0, sampleRate: 8000, destination: node(), createBuffer: (ch: number, n: number) => ({ getChannelData: () => new Float32Array(n), numberOfChannels: ch, length: n }), ...extra } as Record<string, unknown>;
  return new Proxy(ctx, { get: (o, k) => (k in o ? o[k as string] : String(k).startsWith("create") ? () => node() : undefined) }) as unknown as AudioContext & { currentTime: number };
}

const g = globalThis as unknown as Record<string, unknown>;
const was = { AudioContext: g.AudioContext, OfflineAudioContext: g.OfflineAudioContext };
afterEach(() => { g.AudioContext = was.AudioContext; g.OfflineAudioContext = was.OfflineAudioContext; });

/** The page's music drawn ahead on a stand-in context: each bar's render held till `finish` lets it go; every buffer started
 *  and the time it was started at. */
function setup() {
  class AC {}
  g.AudioContext = AC;
  const renders: (() => void)[] = [], starts: { t: number; night: number; drawnFor: number }[] = [], bad: number[][] = [];
  let night = 0;
  g.OfflineAudioContext = function (ch: number, length: number) {
    const drawnFor = night; // (the night the bar was drawn for)
    return context({ startRendering: () => new Promise(res => renders.push(() => res({ numberOfChannels: ch, length, duration: length / 8000, drawnFor, getChannelData: () => new Float32Array(length) }))) });
  };
  const ctx = context({
    createBufferSource: () => {
      const src = node() as Record<string, unknown>;
      src.start = (t: number, ...rest: number[]) => {
        if (![t, ...rest].every(Number.isFinite)) { bad.push([t, ...rest]); return; } // (Chromium throws: "Failed to execute 'start' on 'AudioBufferSourceNode': The provided double value is non-finite.")
        starts.push({ t, night, drawnFor: (src.buffer as { drawnFor?: number } | undefined)?.drawnFor ?? night });
      };
      src.stop = () => {};
      return src;
    },
  });
  Object.setPrototypeOf(ctx, AC.prototype);
  const music = new Music(ctx, 0.4, style, 7, "", true), clock = newBeatClock(style.bpm), mix = mixAt(TUNING.music, 1, 0, 10);
  const cue: MusicCue = { waves: [], nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0 };
  let game = 0;
  const play = (seconds: number) => { for (let f = 0; f < seconds * 60; f++) { ctx.currentTime += 1 / 60; game += 1 / 60; music.update(mix, cue, game, clock, true, TUNING.music); } };
  const finish = () => { for (const r of renders.splice(0)) r(); return new Promise(res => setTimeout(res, 0)); };
  return { music, ctx, renders, starts, bad, play, finish, nextNight: () => { night++; game = 0; }, get night() { return night; } };
}

describe("the music drawn ahead across a new night (the sail or the bed: a live bug in v5076, start() given NaN)", () => {
  it("draws bars ahead and starts each at a real time", async () => {
    const s = setup();
    s.play(4);
    expect(s.music.ahead?.drawing).toBe(true);
    expect(s.renders.length).toBeGreaterThan(0);
    await s.finish();
    expect(s.starts.length).toBeGreaterThan(0);
    for (const x of s.starts) expect(Number.isFinite(x.t)).toBe(true);
  });

  it("a bar rendered for the old night that arrives after the next night's timeline begins is dropped, not started at NaN", async () => {
    for (const how of ["first frame", "frames"] as const) {
      const s = setup();
      s.play(4);
      expect(s.renders.length).toBeGreaterThan(0); // (bars still rendering for the old night)
      // the next night (app/sound.ts setNight): its timeline anchored afresh, no frame played yet (a sail plays none till it lands)
      s.nextNight();
      s.music.engine!.newTimeline();
      if (how === "frames") s.play(0.5); // (or the bed's: the next night's frames already playing when the old bars arrive)
      await s.finish(); // (threw "The provided double value is non-finite" before the fix, the bar's time NaN)
      expect(s.bad, `${how}: started with a time that isn't a number`).toEqual([]);
      expect(s.starts.filter(x => x.drawnFor < x.night), how).toEqual([]); // (none of the old night's bars started in the new)
      // and the new night draws ahead afresh, at real times
      s.play(4);
      await s.finish();
      const fresh = s.starts.filter(x => x.drawnFor > 0);
      expect(fresh.length, how).toBeGreaterThan(0);
      for (const x of fresh) expect(Number.isFinite(x.t)).toBe(true);
    }
  });
});
