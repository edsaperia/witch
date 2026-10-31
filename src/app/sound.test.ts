import { afterEach, describe, expect, it, vi } from "vitest";
import styleJson from "../../config/music-style.json";
import { Sound } from "./sound";
import { Music } from "../platform/audio/music";
import { SfxCues } from "../platform/audio/sfxCues";
import type { Sfx } from "../platform/audio/sfx";
import { TUNING, type Tuning } from "../rules/tuning";
import type { MusicStyle } from "../rules/musicScore";
import type { PlaytestLog } from "../platform/playtestLog";
import { newGame } from "../rules/game";
import { shiftBeat } from "../rules/beat";
import { musicCue } from "../rules/musicPlan";

const style = styleJson as unknown as MusicStyle;

it("a guest follows the host beat without keepBeat changing it; the absent option retains solo behavior", () => {
  // The audio authority boundary needs one small island; no real audio output is claimed from this fake context.
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const game = newGame(123, tuning), { sound, ctx } = made(123); game.clock.paused = false;
  sound.sfx = null; sound.sfxCues = null; ctx.currentTime = 100;
  const update = vi.spyOn(sound.music!, "update").mockImplementation(() => {});
  const keep = vi.spyOn(sound.music!, "keepBeat").mockImplementation((time, clock) => { shiftBeat(clock, time, 1.5); return 1.5; });
  const before = structuredClone(game.beat), cue = musicCue(game);
  try {
    sound.update(game, cue, false, { shareBeat: true });
    expect(keep).not.toHaveBeenCalled(); expect(game.beat).toEqual(before);
    expect(update.mock.calls[0][3]).toBe(game.beat); // the music receives the current authoritative anchor
    sound.update(game, cue, false); expect(keep).toHaveBeenCalledOnce();
    const solo = structuredClone(game.beat); expect(solo).not.toEqual(before);
    game.beat = structuredClone(before); sound.update(game, cue, false, { shareBeat: false });
    expect(game.beat).toEqual(solo);
  } finally { vi.restoreAllMocks(); }
});

/** A stand-in audio context (as musicEngine.test.ts's): every node and param takes any call and does nothing. */
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
  return new Proxy(ctx, { get: (o, k) => (k in o ? o[k as string] : String(k).startsWith("create") ? () => node() : undefined) }) as unknown as AudioContext & { currentTime: number };
}

/** A sound with a context and music (as after the first press), and effects that only note what they're told. */
function made(seed: number) {
  const sound = new Sound(structuredClone(TUNING) as Tuning, style, seed), ctx = fakeContext();
  sound.audio = ctx;
  sound.music = new Music(ctx, 0.5, style, seed);
  const told: { retune: unknown[]; aggro: unknown[] } = { retune: [], aggro: [] };
  sound.sfx = { retune: (T: unknown) => told.retune.push(T), aggro: (k: unknown) => told.aggro.push(k) } as unknown as Sfx;
  sound.sfxCues = new SfxCues(sound.sfx);
  return { sound, ctx, told };
}

describe("Sound.setNight: a new night on the same page (docs/plans/sail-without-reload.md, A4)", () => {
  afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); });

  it("gives the live music the new seed, and the watchdog's rebuild uses it", () => {
    vi.useFakeTimers(); // (the watchdog's once-a-second check never runs: it's called by hand)
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const { sound } = made(11);
    sound.watch(() => true, () => true, { audio: () => {} } as unknown as PlaytestLog);
    sound.setNight(structuredClone(TUNING) as Tuning, 22);
    expect(sound.music!.engine!.seed).toBe(22);
    const old = sound.music;
    (sound.watchdog as unknown as { mend: (what: string) => void }).mend("music-silent");
    expect(sound.music).not.toBe(old);
    expect(sound.music!.engine!.seed).toBe(22);
  });

  it("anchors the music's timeline afresh", () => {
    const { sound } = made(11);
    const spy = vi.spyOn(sound.music!.engine!, "newTimeline");
    sound.setNight(structuredClone(TUNING) as Tuning, 22);
    expect(spy).toHaveBeenCalledOnce();
  });

  it("makes new cues for the new night, and re-points the effects at its tuning", () => {
    const { sound, told } = made(11), old = sound.sfxCues;
    const B = structuredClone(TUNING) as Tuning;
    sound.setNight(B, 22);
    expect(sound.sfxCues).toBeInstanceOf(SfxCues);
    expect(sound.sfxCues).not.toBe(old);
    expect(told.retune).toEqual([B.sfx]);
    expect(told.aggro).toEqual([]); // (no watch's warning was sounding to let fall)
  });

  it("lets the old cues' watch warning fall as it hands over", () => {
    const { sound, told } = made(11);
    (sound.sfxCues as unknown as { aggroK: number }).aggroK = 0.5;
    sound.setNight(structuredClone(TUNING) as Tuning, 22);
    expect(told.aggro).toEqual([null]);
  });

  it("re-arms the safety valve's grace once play has started", () => {
    const { sound } = made(11);
    sound.setNight(structuredClone(TUNING) as Tuning, 22);
    expect(sound.valve.graceUntil).toBe(-Infinity); // (not started: start() begins it)
    sound.start();
    sound.valve.graceUntil = 0; // (as though its grace had long passed)
    sound.setNight(structuredClone(TUNING) as Tuning, 33);
    expect(sound.valve.graceUntil).toBeGreaterThan(performance.now() / 1000);
  });
});
