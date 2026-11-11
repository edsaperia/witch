import { describe, expect, it } from "vitest";
import styleJson from "../../../config/music-style.json";
import { MusicEngine } from "./musicEngine";
import { Music, tapePitch } from "./music";
import { TUNING } from "../../rules/tuning";
import { mixAt } from "../../rules/music";
import { newBeatClock } from "../../rules/beat";
import type { MusicCue } from "../../rules/musicPlan";
import { withHaunted, type MusicStyle } from "../../rules/musicScore";
import { withBanger, withoutComp } from "../../rules/musicBanger";

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

describe("the music plays on through the frames' hitches (Ed's playtest, 2026-10-06: \"The music cuts in and out a lot\")", () => {
  const cue: MusicCue = { waves: [], nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0 };
  /** `seconds` of audio at 60 frames a second, a frame of `hitch` seconds every `every` s, the game clock losing what passes
   *  the rules' MAX_STEP (0.1 s) as it does; the engine's continuity, and how far out of step it ends (s). */
  function fly(seconds: number, hitch: number, every: number) {
    const ctx = fakeContext(), e = new MusicEngine(ctx, (ctx as unknown as { destination: AudioNode }).destination, style, 7), clock = newBeatClock(style.bpm);
    let game = 0;
    for (let f = 0; f < seconds * 60; f++) {
      const dt = f > 0 && f % (every * 60) === 0 ? hitch : 1 / 60;
      ctx.currentTime += dt; game += Math.min(dt, 0.1);
      e.update(cue, game, clock, true);
    }
    const E = e as unknown as { g0: number; a0: number; rate: number };
    return { ...e.stats, behind: E.g0 + (ctx.currentTime - E.a0) * E.rate - game };
  }

  it("a hitch shorter than what's scheduled ahead leaves no gap, and the music eases back into step", () => {
    for (const hitch of [0.15, 0.3, 0.5]) {
      const s = fly(40, hitch, 8);
      expect(s.gap, `${hitch} s hitches`).toBeLessThan(0.01);
      expect(s.resyncs).toBe(0);
      expect(Math.abs(s.behind), `${hitch} s hitches: back in step`).toBeLessThan(0.1);
    }
  });

  it("after one long stall it schedules further ahead, so the next like it leaves no gap (Ed, round 16: \"Music is still starting and stopping\")", () => {
    const s = fly(60, 1.2, 10); // (five stalls of 1.2 s, 10 s apart)
    expect(s.gap).toBeLessThan(1.2 - 0.6 + 0.05); // (only the first's excess over the 0.6 s scheduled ahead)
    expect(s.resyncs).toBe(0);
    expect(Math.abs(s.behind)).toBeLessThan(6); // (each stall loses the game ~1.1 s; the 5% slew wins back ~0.5 s in 10 s: never past the 6 s cap)
  });

  it("a longer stall only holds the music for the stall, then it plays on from where it was", () => {
    const s = fly(40, 1.2, 15);
    expect(s.gap).toBeLessThan(2 * (1.2 - 0.6) + 0.05); // (two stalls, each past the 0.6 s scheduled ahead)
    expect(s.resyncs).toBe(0);
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

describe("a new night on the same page (docs/plans/sail-without-reload.md, A4)", () => {
  const cue: MusicCue = { waves: [], nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0 };
  /** Night A from game time 300 for 5 s, a 2 s sail with nothing scheduled, then night B from game time 0 (`fresh`: with
   *  newTimeline between); how far ahead of B's game time the music runs, and the first sixteenth scheduled for B. */
  function sail(fresh: boolean) {
    const ctx = fakeContext(), e = new MusicEngine(ctx, (ctx as unknown as { destination: AudioNode }).destination, style, 7), clock = newBeatClock(style.bpm);
    const steps: number[] = [];
    const E = e as unknown as { step: (...a: unknown[]) => void; g0: number; a0: number; rate: number };
    const inner = E.step.bind(e);
    E.step = (c, s, ...rest) => { steps.push(s as number); inner(c, s, ...rest); };
    let game = 300;
    for (let f = 0; f < 5 * 60; f++) { ctx.currentTime += 1 / 60; game += 1 / 60; e.update(cue, game, clock, true); }
    for (let f = 0; f < 2 * 60; f++) { ctx.currentTime += 1 / 60; e.update(cue, game, clock, false); }
    if (fresh) e.newTimeline();
    steps.length = 0; game = 0;
    for (let f = 0; f < 3 * 60; f++) { ctx.currentTime += 1 / 60; game += 1 / 60; e.update(cue, game, clock, true); }
    return { ahead: E.g0 + (ctx.currentTime - E.a0) * E.rate - game, first: steps[0], resyncs: e.stats.resyncs };
  }

  it("re-anchors the timeline at the new night's game time 0, not 6 s ahead of it", () => {
    const stale = sail(false);
    expect(stale.ahead).toBeGreaterThan(5); // (what newTimeline is for: game time jumping back is read as a slow game)
    const s = sail(true);
    expect(Math.abs(s.ahead)).toBeLessThan(0.01);
    expect(s.first).toBeLessThanOrEqual(1);
  });

  it("opens the knockdown's gate and counts knockdowns from none", () => {
    const ctx = fakeContext(), e = new MusicEngine(ctx, (ctx as unknown as { destination: AudioNode }).destination, style, 7), clock = newBeatClock(style.bpm);
    // knocked down in bar 1, back on bar 40: the gate shut
    const down: MusicCue = { ...cue, knockdowns: [{ at: 1, back: 40 }] };
    for (let f = 0; f < 4 * 60; f++) { ctx.currentTime += 1 / 60; e.update(down, ctx.currentTime, clock, true); }
    expect(e.gated).toBe(true);
    e.newTimeline();
    expect(e.gated).toBe(false);
    expect((e as unknown as { knocksHeard: number }).knocksHeard).toBe(0);
  });

  it("sings each note from Chimera's own note on its vowel, untuned, the vowels in turn through a phrase (Ed, 2026-11-08: the swap)", () => {
    const ctx = fakeContext(), e = new MusicEngine(ctx, (ctx as unknown as { destination: AudioNode }).destination, style, 7);
    const sources: { buffer: unknown; playbackRate: { value: number } }[] = [];
    (ctx as unknown as Record<string, unknown>).createBufferSource = () => { const n = { buffer: null as unknown, playbackRate: { value: 1 }, connect: () => n, disconnect() {}, start() {}, stop() {}, loop: false }; sources.push(n); return n; };
    const recs = Object.fromEntries([...style.patches.chimeraVoice.notes!.map(n => n.sample), "female-note"].map(id => [id, { id, duration: 2.7 } as unknown as AudioBuffer]));
    e.setRecordings(recs);
    const play = (e as unknown as { play: (ev: object, t: number, dur: number, sps: number) => void }).play.bind(e), sung = (src: { buffer: unknown }) => Object.values(recs).includes(src.buffer as AudioBuffer);
    for (const [i, midi] of [60, 62, 64].entries()) play({ part: "sung", patch: "chimeraVoice", step: i * 4, offset: 0, dur: 4, midi, vel: 0.8 }, 1 + i * 0.5, 0.5, 0.125);
    const new3 = sources.filter(sung);
    expect(new3.map(s => (s.buffer as { id: string }).id)).toEqual(["chimera-ah-60", "chimera-ah-62", "chimera-ooh-64"]);
    for (const s of new3) expect(s.playbackRate.value).toBeCloseTo(1, 9);
    // (the old singer, kept to A/B: the one recording retuned)
    sources.length = 0;
    play({ part: "sung", patch: "recordedVoice", step: 0, offset: 0, dur: 4, midi: 60, vel: 0.8 }, 10, 0.5, 0.125);
    const old = sources.filter(sung);
    expect(new Set(old.map(s => (s.buffer as { id: string }).id))).toEqual(new Set(["female-note"])); // (and its phrase's swell into the hall)
    expect(old.at(-1)!.playbackRate.value).toBeCloseTo(2 ** ((60 - 67.2) / 12), 6);
  });

  it("builds the sung part's channel again after a new style (its first note no stall)", () => {
    const ctx = fakeContext(), e = new MusicEngine(ctx, (ctx as unknown as { destination: AudioNode }).destination, style, 7);
    const channels = () => (e as unknown as { channels: Map<string, unknown> }).channels;
    const sung = style.form!.sung.part;
    expect(channels().has(sung)).toBe(true);
    e.setStyle({ ...style });
    expect([...channels().keys()]).toEqual([sung]);
  });
});

describe("the haunted treatment in the engine (Ed, 2026-11-08: \"B, 1-6\")", () => {
  const cue: MusicCue = { waves: [0, 0], nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0, forceWave: 2, forceSection: "breakdown" };
  /** 16 bars of a breakdown scheduled on a fake context; what was made, and the haunted automation asked for. */
  function render(st: MusicStyle) {
    const ctx = fakeContext(), made: Record<string, number> = {};
    for (const k of ["createConvolver", "createOscillator"]) { const f = (ctx as unknown as Record<string, () => unknown>)[k]; (ctx as unknown as Record<string, unknown>)[k] = () => { made[k] = (made[k] ?? 0) + 1; return f(); }; }
    const e = new MusicEngine(ctx, (ctx as unknown as { destination: AudioNode }).destination, st, 7), haunts: [boolean, number, number][] = [], ghosts: number[] = [];
    const bus = e.bus, haunt = bus.haunt!;
    bus.haunt = (on, root, t) => { haunts.push([on, root, t]); haunt(on, root, t); };
    const ghostCh = (e as unknown as { ghostChannel: (p: string, c: boolean) => unknown }).ghostChannel.bind(e);
    (e as unknown as { ghostChannel: unknown }).ghostChannel = (p: string, c: boolean) => { ghosts.push(ctx.currentTime); return ghostCh(p, c); };
    e.renderAhead(cue, 0, 16 * 2, newBeatClock(st.bpm));
    return { made, haunts, ghosts };
  }

  it("asks for the voice's reverb, its lift and the drone each bar of a haunted section, in the key, at most one convolver more", () => {
    const on = render(style), off = render(withHaunted(style, false));
    expect(on.haunts.length).toBe(16);
    expect(on.haunts.every(([h, root]) => h && root === style.root + (style.arc[2].transpose ?? 0) + 12 * style.haunted!.drone.octave)).toBe(true);
    expect(off.haunts).toEqual([]); // (off: nothing asked, nothing made)
    expect((on.made.createConvolver ?? 0) - (off.made.createConvolver ?? 0)).toBeLessThanOrEqual(1);
    expect(on.made.createConvolver ?? 0).toBeGreaterThan(off.made.createConvolver ?? 0);
    expect(on.ghosts.length).toBeGreaterThan(0);
    expect(off.ghosts.length).toBe(0);
  });

  it("makes the drone cheaply: six sines and three swells, once", () => {
    const ctx = fakeContext(), e = new MusicEngine(ctx, (ctx as unknown as { destination: AudioNode }).destination, style, 7);
    let oscs = 0;
    const f = (ctx as unknown as Record<string, () => unknown>).createOscillator;
    (ctx as unknown as Record<string, unknown>).createOscillator = () => { oscs++; return f(); };
    e.bus.haunt!(true, 45, 0); e.bus.haunt!(true, 45, 2); e.bus.haunt!(false, 45, 4); e.bus.haunt!(true, 47, 6);
    expect(oscs).toBe(9);
  });

  it("plays a ghost note late by the style's delay, on a channel of its own", () => {
    const ctx = fakeContext(), e = new MusicEngine(ctx, (ctx as unknown as { destination: AudioNode }).destination, style, 7), starts: number[] = [];
    (ctx as unknown as Record<string, unknown>).createBufferSource = () => { const n = { buffer: null as unknown, playbackRate: { value: 1 }, connect: () => n, disconnect() {}, start(t: number) { starts.push(t); }, stop() {}, loop: false }; return n; };
    e.setRecordings(Object.fromEntries(style.patches.chimeraVoice.notes!.map(n => [n.sample, { duration: 2.7 } as unknown as AudioBuffer])));
    const play = (e as unknown as { play: (ev: object, t: number, dur: number, sps: number) => void }).play.bind(e);
    play({ part: "sung", patch: "chimeraVoice", step: 0, offset: 0, dur: 16, midi: 55, vel: 0.3, ghost: true }, 1, 2, 0.125);
    expect(starts[0]).toBeCloseTo(1 + style.haunted!.ghost.delay, 9);
    expect((e as unknown as { channels: Map<string, unknown> }).channels.has("ghost:sung")).toBe(true);
  });
});

describe("banger mode's compressors in the graph (Ed, 2026-11-10: \"Is it possible to add a compressor?\")", () => {
  /** The compressors and master filters an engine makes for a style. */
  function made(s: MusicStyle, stems = false) {
    const ctx = fakeContext(), n = { comp: 0, filter: 0, verb: 0, delay: 0 }, c = ctx as unknown as Record<string, () => unknown>;
    const comp = c.createDynamicsCompressor, filt = c.createBiquadFilter, verb = c.createConvolver, del = c.createDelay;
    const counted = new Proxy(ctx, { get: (o, k) => k === "createDynamicsCompressor" ? () => { n.comp++; return comp(); } : k === "createBiquadFilter" ? () => { n.filter++; return filt(); } : k === "createConvolver" ? () => { n.verb++; return verb(); } : k === "createDelay" ? () => { n.delay++; return del(); } : (o as unknown as Record<string | symbol, unknown>)[k] });
    const sink = stems ? new Proxy({}, { get: () => () => ({}) }) : undefined;
    new MusicEngine(counted, (ctx as unknown as { destination: AudioNode }).destination, s, 7, undefined, sink as never);
    return n;
  }
  it("adds none with banger mode off (its graph as it was: the limiter and the clearing's), two with it on, none with its compressors off", () => {
    const off = made(withBanger(style, false)), bare = made({ ...style, banger: undefined } as MusicStyle);
    expect(off).toEqual(bare);
    expect(off.comp).toBe(2);
    expect(made(style).comp).toBe(4); // (the drum bus's and the master's glue)
    expect(made(withoutComp(style)).comp).toBe(2);
    // (banger mode's room: the reverb's pre-delay and the drum bus's short room, neither made without it)
    expect(made(style).verb).toBe(off.verb + 1); expect(made(style).delay).toBe(off.delay + 1);
    expect(made(style).filter).toBe(off.filter + 3); // (its master's low cut and shelf, the drum room's high-pass)
  });
});

describe("a renderer's own graph (the music drawn ahead; Ed, 2026-11-11: \"the sound crunches and cuts out\")", () => {
  it("is left unconnected: its notes go to the stems, so its context never works its limiter, reverbs and the rest", () => {
    const ctx = fakeContext(), dest = (ctx as unknown as { destination: AudioNode }).destination, hits: unknown[] = [];
    const wrap = (n: object) => new Proxy(n, { get: (o, k) => k === "connect" ? (t: unknown) => { if (t === dest) hits.push(t); return t; } : (o as Record<string | symbol, unknown>)[k] });
    const rec = new Proxy(ctx, { get: (o, k) => { const v = (o as unknown as Record<string | symbol, unknown>)[k]; return typeof v === "function" && String(k).startsWith("create") && k !== "createBuffer" ? (...a: unknown[]) => wrap((v as (...a: unknown[]) => object)(...a)) : v; } });
    const sink = new Proxy({}, { get: () => () => ({ connect: () => {} }) });
    new MusicEngine(rec, dest, style, 7, dest, sink as never);
    expect(hits).toHaveLength(0);
    new MusicEngine(rec, dest, style, 7, dest); // (live: its output and the clearing's reach the speakers, as ever)
    expect(hits).toHaveLength(2);
  });
});
