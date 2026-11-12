// The music's load, as the game plays it (Ed, 2026-11-11: "We are hitting some music limit on my laptop since the last music
// update; the sound crunches and cuts out during gameplay"; tools/music-lab/load.mjs): Music with its bars drawn ahead
// (platform/audio/musicAhead.ts: each bar's notes on its own OfflineAudioContext, rendered off the page's thread, then played
// through the live engine's buses), where the "live" context is itself an OfflineAudioContext stepped a frame at a time, so
// the audio thread's work and each bar's are measured apart and repeatably: the CPU of the renderer process's audio threads
// (read from /proc by the runner, threadCpu), each bar's nodes and sources (sounding at once), the live graph's convolvers and
// compressors, the level before the master limiter, and the CPU against a reference convolver's (the machine's own speed,
// measured before and after).
// Lab-only: nothing here changes the game.
import styleJson from "../../config/music-style.json";
import { Music } from "../../src/platform/audio/music";
import { MusicAhead } from "../../src/platform/audio/musicAhead";
import { TUNING } from "../../src/rules/tuning";
import { mixAt } from "../../src/rules/music";
import { newBeatClock, timeAt, type BeatClock } from "../../src/rules/beat";
import type { MusicCue } from "../../src/rules/musicPlan";
import { nightStyle, planNight } from "../../src/rules/musicSet";
import { withHaunted, withMelody, withSinger, type MusicStyle } from "../../src/rules/musicScore";
import { withBanger } from "../../src/rules/musicBanger";

declare const threadCpu: () => Promise<{ audio: number }>;
const base = styleJson as unknown as MusicStyle, RATE = 48000, OAC = OfflineAudioContext;

// ---- what's made: nodes by kind on the live context and on the bars' renderers; every source's span ----
let live: BaseAudioContext | null = null;
let T = { live: { nodes: {} as Record<string, number>, spans: [] as [number, number][] }, bar: { nodes: {} as Record<string, number>, spans: [] as [number, number][] } };
const P = BaseAudioContext.prototype as unknown as Record<string, unknown>;
for (const k of Object.getOwnPropertyNames(BaseAudioContext.prototype)) {
  if (!k.startsWith("create") || typeof P[k] !== "function") continue;
  const f = P[k] as (...a: unknown[]) => unknown;
  P[k] = function (this: BaseAudioContext, ...a: unknown[]) { const t = this === live ? T.live : T.bar, kind = k.slice(6); t.nodes[kind] = (t.nodes[kind] ?? 0) + 1; return f.apply(this, a); };
}
const spanOf = new WeakMap<object, [number, number]>();
for (const proto of [AudioScheduledSourceNode.prototype, AudioBufferSourceNode.prototype] as unknown as { start: (...a: number[]) => void; stop: (...a: number[]) => void }[]) {
  const start0 = proto.start, stop0 = proto.stop;
  if (Object.prototype.hasOwnProperty.call(proto, "start")) proto.start = function (this: AudioScheduledSourceNode, when = 0, offset = 0, dur?: number) {
    if (!spanOf.has(this)) {
      const b = this instanceof AudioBufferSourceNode && !this.loop && this.buffer ? this.buffer.duration / Math.max(1e-3, this.playbackRate.value) : Infinity;
      const span: [number, number] = [when, when + Math.min(b - (offset || 0), dur ?? Infinity)];
      spanOf.set(this, span); (this.context === live ? T.live : T.bar).spans.push(span);
    }
    return dur === undefined ? start0.call(this, when, offset) : start0.call(this, when, offset, dur);
  };
  if (Object.prototype.hasOwnProperty.call(proto, "stop")) proto.stop = function (this: AudioScheduledSourceNode, when = 0) { const s = spanOf.get(this); if (s) s[1] = Math.min(s[1], when); return stop0.call(this, when); };
}
/** Sources sounding at once, every 10 ms from `a` to `b` (s). */
function concurrency(spans: [number, number][], a: number, b: number): { peak: number; mean: number } {
  const n = Math.max(1, Math.ceil((b - a) * 100)), on = new Int32Array(n + 1);
  for (const [s, e] of spans) { const i = Math.max(0, Math.floor((s - a) * 100)), j = Math.min(n, Math.ceil((Math.min(e, b) - a) * 100)); if (j > i) { on[i]++; on[j]--; } }
  let c = 0, peak = 0, sum = 0;
  for (let i = 0; i < n; i++) { c += on[i]; peak = Math.max(peak, c); sum += c; }
  return { peak, mean: sum / n };
}

// ---- the bars: rendered one at a time (each one's cost clean), timed, their nodes and sources counted ----
interface BarCost { bar: number; scheduleMs: number; cpuMs: number; seconds: number; nodes: number; sources: number; voices: number }
const bars: BarCost[] = [], barOf = new WeakMap<object, BarCost>(), pending = new Set<Promise<unknown>>();
let chain: Promise<unknown> = Promise.resolve(), barCpu = 0, lastBar: OfflineAudioContext | null = null;
const startR = OAC.prototype.startRendering;
OAC.prototype.startRendering = function (this: OfflineAudioContext) {
  if (this === live) return startR.call(this);
  const me = this, p = chain.then(async () => { const c0 = await threadCpu(), buf = await startR.call(me), c1 = await threadCpu(), r = barOf.get(me); if (r) r.cpuMs = c1.audio - c0.audio; barCpu += c1.audio - c0.audio; return buf; });
  chain = p.catch(() => {}); pending.add(p); void p.finally(() => pending.delete(p));
  return p as Promise<AudioBuffer>;
};
const Real = window.OfflineAudioContext;
(window as unknown as Record<string, unknown>).OfflineAudioContext = Object.assign(function (...a: ConstructorParameters<typeof OfflineAudioContext>) { return (lastBar = new Real(...a)); }, { prototype: Real.prototype });
const MA = MusicAhead.prototype as unknown as Record<string, (...a: unknown[]) => unknown>, render0 = MA.render;
MA.render = function (this: unknown, b: unknown, cue: unknown, clock: unknown) {
  const sum = () => Object.values(T.bar.nodes).reduce((p, q) => p + q, 0), n0 = sum(), s0 = T.bar.spans.length, t0 = performance.now();
  const r = render0.call(this, b, cue, clock);
  const scheduleMs = performance.now() - t0, k = b as number, C = clock as BeatClock, seconds = timeAt(C, (k + 1) * 4) - timeAt(C, k * 4), spans = T.bar.spans.slice(s0);
  const rec: BarCost = { bar: k, scheduleMs, cpuMs: 0, seconds, nodes: sum() - n0, sources: spans.length, voices: concurrency(spans, 0, seconds).peak };
  if (lastBar) barOf.set(lastBar, rec);
  bars.push(rec);
  return r;
};

const b64 = (s: string) => { const bin = atob(s), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u.buffer; };
const stat = (xs: number[]) => { const s = [...xs].sort((p, q) => p - q); return { mean: xs.reduce((p, q) => p + q, 0) / Math.max(1, xs.length), p95: s[Math.floor(s.length * 0.95)] ?? 0, max: s[s.length - 1] ?? 0 }; };

/** The reference: a 3 s stereo convolver fed a tone, CPU ms a second of audio (best of three). */
async function reference(): Promise<number> {
  let best = Infinity;
  for (let r = 0; r < 3; r++) {
    const oc = new Real(2, 8 * RATE, RATE), o = oc.createOscillator(), c = oc.createConvolver(), ir = oc.createBuffer(2, 3 * RATE, RATE);
    for (let ch = 0; ch < 2; ch++) { const d = ir.getChannelData(ch); let x = 7 + ch; for (let i = 0; i < d.length; i++) { x = (Math.imul(x, 1664525) + 1013904223) >>> 0; d[i] = (x / 4294967296 - 0.5) * Math.exp(-i / RATE); } }
    c.buffer = ir; o.connect(c).connect(oc.destination); o.start();
    const c0 = await threadCpu(); await oc.startRendering(); const c1 = await threadCpu();
    best = Math.min(best, (c1.audio - c0.audio) / 8);
  }
  return best;
}

export interface LoadJob { seed: number; island: string; banger: boolean; from: number; to: number; landings: number[]; victory?: number; siege?: number; party?: number; samples: Record<string, string>; pcm?: boolean }

async function load(o: LoadJob) {
  bars.length = 0; T = { live: { nodes: {}, spans: [] }, bar: { nodes: {}, spans: [] } };
  const ref0 = await reference(); // (and again after, the two averaged: the machine's speed while the music rendered)
  const M = TUNING.music, plan = planNight(base, { seed: o.seed, island: o.island, waves: 10 });
  const style = withBanger(withMelody(withHaunted(withSinger(nightStyle(base, plan), M.singer), M.haunted), M.melody), o.banger); // (as app/sound.ts plays it)
  const clock = newBeatClock(style.bpm), t0 = timeAt(clock, o.from * 4), seconds = timeAt(clock, o.to * 4) - t0 + 3;
  const oc = new OAC(4, Math.ceil(seconds * RATE), RATE);
  live = oc;
  const recs: Record<string, AudioBuffer> = {};
  for (const [id, data] of Object.entries(o.samples)) recs[id] = await oc.decodeAudioData(b64(data));
  const music = new Music(oc, M.volume, style, o.seed), E = music.engine!;
  E.setRecordings(recs); if (recs.whispers) E.setWhisper(recs.whispers);
  await new Promise(r => setTimeout(r, 300)); // (the whisper's envelopes, made a band a task)
  (music as unknown as { ahead: MusicAhead }).ahead = new MusicAhead(E, oc as unknown as AudioContext); // (a page's own, drawn ahead)
  while (E.warmFx()) { /* the voice effects' impulses, all made now */ }
  // the level before the master limiter (the node feeding it) on channels 2 and 3; the music's own output on 0 and 1
  const X = E as unknown as { limit: DynamicsCompressorNode; tone: AudioNode; master: { on: boolean; drive: AudioNode; glue?: { on: boolean; makeup: AudioNode } } | null };
  const pre = X.master?.on ? (X.master.glue?.on ? X.master.glue.makeup : X.master.drive) : X.tone;
  const merge = oc.createChannelMerger(4); merge.connect(oc.destination);
  const tap = (n: AudioNode, ch: number) => { const sp = oc.createChannelSplitter(2); n.connect(sp); sp.connect(merge, 0, ch); sp.connect(merge, 1, ch + 1); };
  tap(music.output, 0); tap(pre, 2);
  const cueAt = (bar: number): MusicCue => { const landed = o.landings.filter(b => b <= bar), due = o.landings.find(b => b > bar); return { waves: landed, nextAt: due ?? Infinity, bootUntil: 0, knockedOut: false, siege: o.siege ?? 0, party: o.party ?? 0, stumps: landed, ...(o.victory !== undefined ? { victory: o.victory } : {}) }; };
  // a frame every 0.1 s (the bars are queued seconds ahead; the live engine schedules 0.6 s ahead), each waiting for the bars
  // it asked for, as if they rendered at once
  const FRAME = 0.1, near = mixAt(M, 1, 0, 10), gr: number[] = [];
  let updMax = 0;
  for (let f = 0; f * FRAME < seconds - 0.2; f++) {
    const t = f * FRAME;
    void oc.suspend(Math.round((t * RATE) / 128) * 128 / RATE).then(async () => {
      const g = t0 + t, u0 = performance.now();
      music.update(near, cueAt(g / (240 / style.bpm) + 1e-6), g, clock, true, M, 1);
      updMax = Math.max(updMax, performance.now() - u0);
      gr.push(-X.limit.reduction);
      while (pending.size) await Promise.all([...pending]);
      return oc.resume();
    });
  }
  barCpu = 0;
  const k0 = await threadCpu(), buf = await oc.startRendering(), k1 = await threadCpu();
  const refMs = (ref0 + await reference()) / 2;
  const liveCpu = k1.audio - k0.audio - barCpu, steady = 6; // (the live engine plays the first bars itself, till the bars drawn ahead take over)
  let prePeak = 0, outPeak = 0;
  for (const ch of [0, 1]) { const d = buf.getChannelData(ch); for (let i = 0; i < d.length; i++) outPeak = Math.max(outPeak, Math.abs(d[i])); }
  for (const ch of [2, 3]) { const d = buf.getChannelData(ch); for (let i = 0; i < d.length; i++) prePeak = Math.max(prePeak, Math.abs(d[i])); }
  const db = (x: number) => 20 * Math.log10(x + 1e-12), grs = [...gr].sort((p, q) => p - q);
  let pcm = "";
  if (o.pcm) {
    const L = buf.getChannelData(0), R = buf.getChannelData(1), q = new Int16Array(L.length * 2);
    for (let i = 0; i < L.length; i++) { q[2 * i] = Math.max(-32767, Math.min(32767, Math.round(L[i] * 32767))); q[2 * i + 1] = Math.max(-32767, Math.min(32767, Math.round(R[i] * 32767))); }
    const bytes = new Uint8Array(q.buffer); let s = ""; for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    pcm = btoa(s);
  }
  const barSec = bars.reduce((p, b) => p + b.seconds, 0);
  return {
    seconds, refMs,
    live: { cpuPerSec: liveCpu / seconds, ref: liveCpu / seconds / refMs, convolvers: T.live.nodes.Convolver ?? 0, compressors: T.live.nodes.DynamicsCompressor ?? 0, nodesMade: Object.values(T.live.nodes).reduce((p, q) => p + q, 0), voices: concurrency(T.live.spans, steady, seconds), updateMaxMs: updMax },
    bars: { n: bars.length, cpuPerSec: barCpu / Math.max(1e-9, barSec), ref: barCpu / Math.max(1e-9, barSec) / refMs, cpuMs: stat(bars.map(b => b.cpuMs)), scheduleMs: stat(bars.map(b => b.scheduleMs)), nodes: stat(bars.map(b => b.nodes)), sources: stat(bars.map(b => b.sources)), voices: stat(bars.map(b => b.voices)), each: bars.map(b => [b.bar, b.cpuMs, Math.round(b.scheduleMs * 10) / 10, b.nodes, b.voices]) },
    ahead: (music as unknown as { ahead: MusicAhead }).ahead.stats,
    levels: { preLimiterPeakDb: db(prePeak), outputPeakDb: db(outPeak), limiterReductionDb: { median: grs[grs.length >> 1] ?? 0, p95: grs[Math.floor(grs.length * 0.95)] ?? 0, max: grs[grs.length - 1] ?? 0 } },
    pcm, rate: RATE,
  };
}

Object.assign(window, { musicLoad: load });
