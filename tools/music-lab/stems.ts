// The music drawn a bar at a time as stems (src/platform/audio/musicEngine.ts MusicSink; docs/notes/music.md "Music ahead"),
// against the same music drawn whole: each bar's notes rendered on an OfflineAudioContext of their own into nine channels (the
// parts the kick ducks, the rest, the reverb's send, the delay's: a stereo pair each; the voice line, mono, as it goes into its effects), with a tail for what
// rings past the bar, their bus automation kept, each bar's renderer carrying on from the one before (MusicEngine.carryFrom);
// then those buffers played through a live engine's own buses (its reverbs, delay, low-pass, limiter, voice effects) offline,
// the automation replayed, and the two compared: sample by sample (dB under the music), and by ear (the level in 50 ms windows,
// the bar lines' seams). Bundled into a page by tools/music-lab/stems.cjs, which says what each mode is for.
import styleJson from "../../config/music-style.json";
import { MusicEngine, type MusicSink } from "../../src/platform/audio/musicEngine";
import { newBeatClock } from "../../src/rules/beat";
import { barSeconds, type MusicCue } from "../../src/rules/musicPlan";
import { resolveSection, type MusicStyle } from "../../src/rules/musicScore";

type Engine = typeof MusicEngine;
const STYLE = styleJson as unknown as MusicStyle, RATE = 48000, SEED = 7;
/** What rings past a bar (s): a note's release, the longest 1.4 s, at -50 dB after twice that. */
const TAIL = 2.5;
const cueOf = (section: string): MusicCue => ({ waves: [0, 0, 0], nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0, forceWave: 3, forceSection: section });
const STEMS = ["duck", "dry", "reverb", "delay", "voice"] as const;
type Ev = { kind: "tone"; f0: number; f1: number; t: number; dur: number } | { kind: "duck"; t: number; depth: number; sps: number } | { kind: "gate"; open: boolean; t: number } | { kind: "fx"; part: string; fx: "pure" | "dark"; t: number }
  | { kind: "release"; part: string; t: number } | { kind: "swell"; part: string; rec: AudioBuffer; rate: number; t: number; swell: number; peak: number };
/** Only this part sounds (the engine's solo), to find which differs. */
let SOLO: string | null = null;

/** The section drawn whole by `E`, `bars` bars from bar 8 (as the Music Lab's checks draw it), `at` seconds into its context. */
async function whole(section: string, bars: number, E: Engine = MusicEngine, at = 0): Promise<Float32Array[]> {
  const spBar = barSeconds(STYLE.bpm), oc = new OfflineAudioContext(2, Math.ceil(RATE * (spBar * bars + at)), RATE);
  const e = new E(oc, oc.destination, STYLE, SEED);
  if (SOLO) e.solo = new Set([SOLO]);
  e.renderAhead(cueOf(section), 8 * spBar, bars * spBar, newBeatClock(STYLE.bpm), at);
  while (e.warmFx()) { /* the voice effects' impulses, at once (offline) */ }
  const b = await oc.startRendering(), n = Math.round(at * RATE);
  return [b.getChannelData(0).slice(n), b.getChannelData(1).slice(n)];
}

/** One bar's notes as stems: its buffer (nine channels, the bar and its tail) and its bus automation (times from its start). */
async function stemBar(section: string, bar: number, prev: MusicEngine | null): Promise<{ buf: AudioBuffer; events: Ev[]; buildMs: number; renderMs: number; engine: MusicEngine }> {
  const spBar = barSeconds(STYLE.bpm), oc = new OfflineAudioContext(9, Math.ceil(RATE * (spBar + TAIL)), RATE), merge = oc.createChannelMerger(9);
  merge.connect(oc.destination);
  // (stereo pairs, and the voice line alone in the last: mono, as its effects take it, a stereo panner panning mono and stereo apart)
  const ins = STEMS.map((name, i) => {
    const g = oc.createGain(), mono = name === "voice";
    g.channelCount = mono ? 1 : 2; g.channelCountMode = "explicit";
    if (mono) { g.connect(merge, 0, 8); return g; }
    const sp = oc.createChannelSplitter(2); g.connect(sp); sp.connect(merge, 0, 2 * i); sp.connect(merge, 1, 2 * i + 1); return g;
  });
  const events: Ev[] = [];
  const sink: MusicSink = {
    duck: ins[0], dry: ins[1], reverb: ins[2], delay: ins[3], voice: () => ins[4],
    tone: (f0, f1, t, dur) => events.push({ kind: "tone", f0, f1, t, dur }),
    duckAt: (t, depth, sps) => events.push({ kind: "duck", t, depth, sps }),
    gate: (open, t) => events.push({ kind: "gate", open, t }),
    fxChain: (part, fx, t) => events.push({ kind: "fx", part, fx, t }),
    fxRelease: (part, t) => events.push({ kind: "release", part, t }),
    fxSwell: (part, rec, rate, t, swell, peak) => events.push({ kind: "swell", part, rec, rate, t, swell, peak }),
  };
  const t0 = performance.now();
  const engine = new MusicEngine(oc, oc.destination, STYLE, SEED, oc.destination, sink);
  if (SOLO) engine.solo = new Set([SOLO]);
  if (prev) engine.carryFrom(prev, spBar); // (the bar before's parts carried on: glides, the sung phrase, the wobbles' phase)
  engine.renderAhead(cueOf(section), (8 + bar) * spBar, spBar, newBeatClock(STYLE.bpm));
  const t1 = performance.now(), buf = await oc.startRendering();
  return { buf, events, buildMs: t1 - t0, renderMs: performance.now() - t1, engine };
}

/** The bars' stems played through a live engine's buses, offline, as the game will hear them. */
async function throughBus(bars: { buf: AudioBuffer; events: Ev[] }[], length: number): Promise<Float32Array[]> {
  const spBar = barSeconds(STYLE.bpm), oc = new OfflineAudioContext(2, length, RATE), live = new MusicEngine(oc, oc.destination, STYLE, SEED), bus = live.bus;
  const sung = STYLE.form?.sung.part, voice = sung ? live.voiceIn(sung) : null;
  const dests = [bus.duck, bus.dry, bus.reverb, bus.delay, voice];
  bars.forEach((b, k) => {
    const at = k * spBar, src = oc.createBufferSource(), sp = oc.createChannelSplitter(9);
    src.buffer = b.buf; src.connect(sp);
    dests.forEach((d, i) => {
      if (!d) return;
      if (i === 4) { sp.connect(d, 8); return; } // (the voice line, mono)
      const m = oc.createChannelMerger(2); sp.connect(m, 2 * i, 0); sp.connect(m, 2 * i + 1, 1); m.connect(d);
    });
    src.start(at);
    for (const e of b.events) {
      if (e.kind === "tone") bus.tone(e.f0, e.f1, at + e.t, e.dur);
      else if (e.kind === "duck") bus.duckAt(at + e.t, e.depth, e.sps);
      else if (e.kind === "gate") bus.gate(e.open, at + e.t);
      else if (e.kind === "fx") bus.fxChain?.(e.part, e.fx, at + e.t);
      else if (e.kind === "release") bus.fxRelease?.(e.part, at + e.t);
      else bus.fxSwell?.(e.part, e.rec, e.rate, at + e.t, e.swell, e.peak);
    }
  });
  while (live.warmFx()) { /* the voice effects' impulses, at once (offline) */ }
  const b = await oc.startRendering();
  return [b.getChannelData(0), b.getChannelData(1)];
}

const db = (x: number) => (x > 0 ? 20 * Math.log10(x) : -Infinity);
/** How far apart, sample by sample: the difference's level under the music's (dB). */
function diffDb(a: Float32Array[], b: Float32Array[]): number {
  let e = 0, d = 0;
  for (let c = 0; c < 2; c++) for (let i = 0; i < a[c].length; i++) { const x = a[c][i], y = b[c][i] ?? 0; e += x * x; d += (x - y) * (x - y); }
  return Math.round((db(Math.sqrt(d)) - db(Math.sqrt(e))) * 10) / 10;
}
/** How far apart by ear: the level in 50 ms windows (dB) at most and on average, where the music is above -50 dBFS. */
function levels(a: Float32Array[], b: Float32Array[]): { maxDb: number; meanDb: number } {
  const W = Math.round(0.05 * RATE), lv = (c: Float32Array[], i: number) => { let e = 0; for (const ch of c) for (let k = i * W; k < (i + 1) * W; k++) e += (ch[k] ?? 0) ** 2; return 10 * Math.log10(e / (W * c.length) + 1e-20); };
  let max = 0, sum = 0, n = 0;
  for (let i = 0; (i + 1) * W <= a[0].length; i++) { const x = lv(a, i); if (x < -50) continue; const d = Math.abs(x - lv(b, i)); max = Math.max(max, d); sum += d; n++; }
  return { maxDb: Math.round(max * 100) / 100, meanDb: Math.round((sum / Math.max(1, n)) * 100) / 100 };
}
/** The biggest step from one sample to the next in [a, b). */
const jump = (c: Float32Array[], a: number, b: number) => { let m = 0; for (const ch of c) for (let k = Math.max(1, a); k < Math.min(ch.length, b); k++) m = Math.max(m, Math.abs(ch[k] - ch[k - 1])); return Math.round(m * 1e4) / 1e4; };

/** A section as stems through the bus against whole: apart sample by sample, bar by bar, and by ear; the seams at the bar
 *  lines (the biggest sample step within 5 ms of each, against the biggest in the whole); the cost a bar (ms: the notes
 *  queued on the page's thread, and rendered off it). */
async function stems(section: string, bars = 4) {
  const ref = await whole(section, bars), got: Awaited<ReturnType<typeof stemBar>>[] = [];
  let prev: MusicEngine | null = null;
  for (let k = 0; k < bars; k++) { const s = await stemBar(section, k, prev); got.push(s); prev = s.engine; }
  const heard = await throughBus(got, ref[0].length), n = Math.round(barSeconds(STYLE.bpm) * RATE);
  return {
    section, bars, diffDb: diffDb(ref, heard),
    perBarDb: Array.from({ length: bars }, (_, k) => diffDb(ref.map(c => c.subarray(k * n, (k + 1) * n)), heard.map(c => c.subarray(k * n, (k + 1) * n)))),
    level: levels(ref, heard),
    seams: { atBarLines: Math.max(0, ...Array.from({ length: bars - 1 }, (_, k) => jump(heard, (k + 1) * n - 240, (k + 1) * n + 240))), anywhere: jump(ref, 0, ref[0].length) },
    msPerBar: { queue: Math.round(got.reduce((a, s) => a + s.buildMs, 0) / bars), render: Math.round(got.reduce((a, s) => a + s.renderMs, 0) / bars), bar: Math.round(barSeconds(STYLE.bpm) * 1000) },
  };
}

/** Each of a section's parts alone, as stems against whole. */
async function byPart(section: string, bars = 2) {
  const out: Record<string, { diffDb: number; levelMaxDb: number }> = {};
  for (const part of Object.keys(resolveSection(STYLE, section).parts)) { SOLO = part; const r = await stems(section, bars); out[part] = { diffDb: r.diffDb, levelMaxDb: r.level.maxDb }; }
  SOLO = null;
  return { section, byPart: out };
}

/** The live engine's own music drawn `shift` seconds later on its context, each part alone, against drawn at 0: what isn't the
 *  same sample by sample from where it sits in time (its parts' free-running wobbles and vibratos, the noise each hit takes,
 *  Chromium's own rounding), and so how close the stems can come after their first bar. */
async function shiftTest(section: string, bars = 1, shift = 2) {
  const out: Record<string, { diffDb: number; levelMaxDb: number }> = {};
  for (const part of Object.keys(resolveSection(STYLE, section).parts)) {
    SOLO = part;
    const a = await whole(section, bars), b = await whole(section, bars, MusicEngine, shift);
    out[part] = { diffDb: diffDb(a, b), levelMaxDb: levels(a, b).maxDb };
  }
  SOLO = null;
  return { section, shift, byPart: out };
}

/** The live engine before a change (`window.OldEngine`, stems.cjs ab) against after it, drawn whole: apart by no more than
 *  Chromium's own rounding (the after drawn twice: that rounding). */
async function ab(section: string, bars = 4) {
  const Old = (window as unknown as { OldEngine: Engine }).OldEngine, o = await whole(section, bars, Old), a = await whole(section, bars), b = await whole(section, bars);
  return { section, oldVsNewDb: diffDb(o, a), newVsNewDb: diffDb(a, b) };
}

Object.assign(window, { stems, byPart, shiftTest, ab });
