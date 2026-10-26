// The audio capacity test (Ed, 2026-10-26, from his web research on the game's audio: "link to the page from the pause
// menu"): run once on his laptop, about two minutes. The game's own music (its engine, as in a night: the drop at wave 3,
// the recorded singer loaded) plays while the load climbs a rung at a time: the other reverbs, then more and more sound
// effects and creature voices (the game's caps lifted, so the load really grows). Each rung reads what the browser says of
// its audio thread (Chrome's playbackStats and renderCapacity, where this Chrome has them), the audio clock against the
// page's (time lost), the music's own scheduling (late steps, gaps, re-anchors) and what the game's safety valve (shed.ts)
// would have done. Twice: with the AudioWorklets loaded (the FOF voice, the tract voice, the mic meter, one of them running),
// and with none, each on a fresh context (a worklet can't be unloaded), which answers whether loading any worklet moves the
// whole graph off its real-time thread on Windows. Then, offline: one bar of the music rendered (how many times faster than
// real time), and the night's reverbs against one shared. Ends with a summary and "Copy results" (JSON). It changes nothing
// in the game: the game's modules, used as they are.
import styleJson from "../../config/music-style.json";
import { TUNING } from "../../src/rules/tuning";
import { newBeatClock, type BeatClock } from "../../src/rules/beat";
import { barSeconds, type MusicCue } from "../../src/rules/musicPlan";
import type { MusicStyle } from "../../src/rules/musicScore";
import type { MusicMix } from "../../src/rules/music";
import { Music } from "../../src/platform/audio/music";
import { MusicEngine } from "../../src/platform/audio/musicEngine";
import { Sfx } from "../../src/platform/audio/sfx";
import { VoiceFx } from "../../src/platform/audio/voiceFx";
import { callOf, VOICES, type CreatureVoice, type Mood } from "../../src/platform/audio/voices";
import { voiceRecordings } from "../../src/platform/audio/voiceSamples";
import { fofReady } from "../../src/platform/audio/fof/fof";
import { tractReady } from "../../src/platform/audio/tract/tract";
import { MIC_WORKLET } from "../../src/platform/audio/outputMeter";
import { ShedValve, SHED_STEPS } from "../../src/platform/audio/shed";
import { bufferHint, learntBuffer } from "../../src/platform/audio/buffer";

declare const __BUILD__: string;
const STYLE = styleJson as unknown as MusicStyle;
const $ = (id: string) => document.getElementById(id)!;
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
const r1 = (x: number) => Math.round(x * 10) / 10, r2 = (x: number) => Math.round(x * 100) / 100;

/** The rungs: what's added, and how many voices (sound effects and creatures, half each) keep sounding. */
const RUNGS: { name: string; reverbs: boolean; voices: number }[] = [
  { name: "music alone", reverbs: false, voices: 0 },
  { name: "+ the other reverbs", reverbs: true, voices: 0 },
  ...[8, 16, 32, 48, 64, 96].map(n => ({ name: `+ ${n} voices`, reverbs: true, voices: n })),
];
const RUNG_S = 6, SETTLE_S = 1;
/** The music's place: the drop at wave 3, the busiest of a night's sections. */
const CUE: MusicCue = { waves: [0, 0, 0], nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0, forceWave: 3, forceSection: "drop" };
const MIX: MusicMix = { volume: 1, cutoff: 16000, distort: 0, distance: 0 };
const SEED = 7;

type PlaybackStats = { underrunEvents?: number; underrunDuration?: number; totalDuration?: number; averageLatency?: number; minimumLatency?: number; maximumLatency?: number };
type Capacity = { averageLoad: number; peakLoad: number; underrunRatio: number };
type Ctx = AudioContext & { playbackStats?: PlaybackStats; renderCapacity?: EventTarget & { start(o?: { updateInterval?: number }): void; stop(): void } };

interface RungResult {
  rung: string; voices: number; reverbs: boolean;
  /** Chrome's own: under-runs in the rung (events, ms), and renderCapacity's worst load and under-run ratio. */
  underruns: number | null; underrunMs: number | null; load: number | null; peakLoad: number | null; underrunRatio: number | null;
  /** The audio clock against the page's over the rung (ms; negative: audio lost), and by the output timestamp. */
  driftMs: number; outDriftMs: number | null;
  /** The music's own: steps scheduled late, seconds of gap, re-anchors; the page's worst timer lateness (ms). */
  late: number; gapMs: number; resyncs: number; timerLateMs: number;
  /** The game's safety valve, fed as the game feeds it: its level at the rung's end (0 none), and what it said. */
  shed: number; shedSaid: string[];
  /** Sounds the effects' kit had going at most (its own count). */
  kitPeak: number;
  glitch: boolean; why: string[];
}
interface RunResult {
  worklets: boolean; loaded: string[]; startMs: Record<string, number>; context: Record<string, unknown>;
  rungs: RungResult[]; glitchAt: string | null; glitchVoices: number | null; error?: string;
}

let stopAsked = false;
const log = (s: string) => { $("status").textContent = s; };

/** A rung's verdict: anything heard as a glitch. */
function judge(r: RungResult): string[] {
  const why: string[] = [];
  if (r.underruns) why.push(`${r.underruns} under-runs (${r.underrunMs} ms)`);
  if (r.underrunRatio && r.underrunRatio > 0) why.push(`renderCapacity under-run ratio ${r2(r.underrunRatio)}`);
  // (by the audio clock against the page's, as the game's safety valve reads it: the output timestamp's single readings jump
  // by hundreds of ms with nothing lost, so it's kept in the JSON only)
  const lost = -r.driftMs;
  if (lost >= 50) why.push(`audio fell ${Math.round(lost)} ms behind`);
  if (r.late) why.push(`${r.late} music steps late`);
  if (r.resyncs) why.push(`${r.resyncs} re-anchors`);
  return why;
}

/** The creature voices: a spread of the species' calls (families where there are no species). */
function creatureVoices(): CreatureVoice[] {
  const sp = Object.keys(VOICES.species), base = TUNING.sfx.voice.animals.pitch;
  const calls = sp.length ? sp.map(callOf) : Object.values(VOICES.families).map(f => ({ glide: 1, dur: 1, gap: 1, pitch: 1, formants: 1, ...f }));
  return calls.slice(0, 24).map((call, i) => ({ pitch: base * call.pitch * (0.8 + 0.05 * (i % 8)), formants: call.formants * (1.1 - 0.02 * (i % 6)), wave: call.wave ?? (["sawtooth", "square", "triangle"] as const)[i % 3], call }));
}

/** One run on a fresh context: the music, then the rungs; `worklets`: the three loaded first (one running). */
async function run(worklets: boolean, recordings: Record<string, AudioBuffer> | null, onRung: (r: RungResult, i: number) => void): Promise<RunResult> {
  const M = TUNING.music, hint = bufferHint(M.buffer, M.latency, null, learntBuffer());
  const t0 = performance.now(), startMs: Record<string, number> = {};
  const ctx = new AudioContext({ latencyHint: hint }) as Ctx;
  await ctx.resume();
  while (ctx.currentTime === 0 && performance.now() - t0 < 5000) await sleep(5);
  startMs.context = r1(performance.now() - t0);
  const out: RunResult = { worklets, loaded: [], startMs, rungs: [], glitchAt: null, glitchVoices: null, context: {
    latencyHint: hint, sampleRate: ctx.sampleRate, baseLatency: ctx.baseLatency, outputLatency: (ctx as AudioContext & { outputLatency?: number }).outputLatency ?? null,
    playbackStats: "playbackStats" in ctx, renderCapacity: "renderCapacity" in ctx, audioWorklet: !!ctx.audioWorklet,
  } };
  try {
    let micNode: AudioWorkletNode | null = null;
    if (worklets) {
      const w0 = performance.now();
      if (await fofReady(ctx)) out.loaded.push("FOF voice");
      if (await tractReady(ctx)) out.loaded.push("tract voice");
      const url = URL.createObjectURL(new Blob([MIC_WORKLET], { type: "text/javascript" }));
      try { await ctx.audioWorklet.addModule(url); out.loaded.push("mic meter"); } finally { URL.revokeObjectURL(url); }
      micNode = new AudioWorkletNode(ctx, "witch-mic-levels", { numberOfInputs: 1, numberOfOutputs: 0, channelCount: 2, channelCountMode: "explicit", processorOptions: { size: 1024 } });
      micNode.port.onmessage = () => {};
      startMs.worklets = r1(performance.now() - w0);
    }
    // the music, as the game makes it (app/sound.ts), with the singer's recordings
    const m0 = performance.now(), music = new Music(ctx, M.volume * 0.8, STYLE, SEED, "");
    if (recordings) { music.engine?.setRecordings(recordings); if (recordings.whispers) music.engine?.setWhisper(recordings.whispers); }
    startMs.music = r1(performance.now() - m0);
    if (micNode) music.output.connect(micNode); // (the mic meter's worklet running on the music, as the mic check runs it)
    // the effects' kit, its caps lifted: the game's are 24 one-shots and 4 babbling voices (config/tuning.json sfx)
    const s0 = performance.now();
    const T = { ...TUNING.sfx, budget: { ...TUNING.sfx.budget, voices: 999 }, voice: { ...TUNING.sfx.voice, animals: { ...TUNING.sfx.voice.animals, maxVoices: 999 } } };
    const sfx = new Sfx(ctx, 0.4, T as typeof TUNING.sfx, STYLE.root + 24);
    startMs.effects = r1(performance.now() - s0);
    const kit = (sfx as unknown as { k: { live: unknown[]; budget: { peak: number }; space(): GainNode } }).k;
    const clock: BeatClock = newBeatClock(STYLE.bpm), page0 = performance.now();
    let lastTick = performance.now(), worstTick = 0;
    const gameTime = () => (performance.now() - page0) / 1000;
    // the music's frames: the game updates it each frame; here every 50 ms (a hidden tab's timers are slower: keep it in front)
    const tick = setInterval(() => {
      const now = performance.now(); worstTick = Math.max(worstTick, now - lastTick - 50); lastTick = now;
      music.update(MIX, CUE, gameTime(), clock, true, M, 1, 0, 0);
    }, 50);
    music.update(MIX, CUE, gameTime(), clock, true, M, 1, 0, 0);
    const valve = new ShedValve(null, 5, 6, 3, 150, 3, 2, 60); // (the game's, its start's grace 2 s here: the music is running already)
    valve.begin(performance.now() / 1000);
    // the reverbs the night has besides the music's own: the singer's effects (hall) and the legends' space, fed the music
    let reverbs: { fx: VoiceFx; send: GainNode; space: GainNode; warm: number } | null = null;
    const addReverbs = () => {
      const fx = new VoiceFx(ctx, { ...(STYLE.voiceFx ?? {}) }, () => STYLE.bpm), send = ctx.createGain(), space = kit.space();
      send.gain.value = 0.05; music.output.connect(send); send.connect(fx.input); send.connect(space); fx.output.connect(ctx.destination);
      const warm = window.setInterval(() => { if (!fx.warm()) clearInterval(warm); }, 30);
      reverbs = { fx, send, space, warm };
    };
    // the voices: each a slot firing a sound again every 0.25 to 0.6 s, half the effects', half the creatures'
    const voices = creatureVoices(), moods: Mood[] = ["happy", "grumpy", "enraged"];
    const effects: ((pan: number) => void)[] = [
      p => sfx.hit(p, 0.8), p => sfx.land(p, 0.8), p => sfx.invited(0.6, p, 0.8), p => sfx.cleared(p, 0.8), p => sfx.twinkle(2, p),
      p => sfx.impact(false, p, 0.7), p => sfx.power(2, p, 0.7), p => sfx.happy(p, 0.8), p => sfx.letter(p, 0.8), p => sfx.thud(p),
    ];
    let slots: number[] = [];
    let fired = 0;
    const play = setInterval(() => {
      const now = performance.now();
      for (let i = 0; i < slots.length; i++) if (now >= slots[i]) {
        const pan = ((i * 37) % 21) / 10 - 1;
        try {
          if (i % 2 === 0) effects[(i / 2 + fired) % effects.length](pan);
          else sfx.speak(voices[(i + fired) % voices.length], moods[i % 3], pan, 0.8, 1);
        } catch { /* one sound failing never stops the test */ }
        fired++;
        slots[i] = now + 250 + ((i * 97 + fired * 13) % 350);
      }
    }, 25);
    // a second's readings, as the game takes them (outputMeter.ts ClockWatch, shed.ts)
    let cap: Capacity | null = null;
    const capSeen: Capacity[] = [];
    if (ctx.renderCapacity) {
      try { ctx.renderCapacity.addEventListener("update", e => { const c = e as unknown as Capacity; cap = c; capSeen.push({ averageLoad: c.averageLoad, peakLoad: c.peakLoad, underrunRatio: c.underrunRatio }); }); ctx.renderCapacity.start({ updateInterval: 1 }); } catch { /* not this Chrome */ }
    }
    const read = () => {
      const st = ctx.playbackStats, ts = ctx.getOutputTimestamp?.();
      return { page: performance.now() / 1000, ctx: ctx.currentTime, out: ts && ts.performanceTime ? { ctx: ts.contextTime!, page: ts.performanceTime / 1000 } : null,
        u: st && typeof st.underrunEvents === "number" ? st.underrunEvents : null, uMs: st && typeof st.underrunDuration === "number" ? st.underrunDuration * 1000 : null, ...music.stats };
    };
    const first = read();
    for (let i = 0; i < RUNGS.length && !stopAsked; i++) {
      const R = RUNGS[i];
      if (R.reverbs && !reverbs) addReverbs();
      const now = performance.now();
      while (slots.length < R.voices) slots.push(now + Math.random() * 400);
      kit.budget.peak = 0;
      log(`${worklets ? "With worklets" : "No worklets"}: ${R.name} (${i + 1} of ${RUNGS.length})`);
      await sleep(SETTLE_S * 1000);
      const a = read(); worstTick = 0; capSeen.length = 0;
      const said: string[] = [];
      for (let s = 0; s < RUNG_S - SETTLE_S; s++) {
        await sleep(1000);
        const b = read(), drift = Math.round(((b.ctx - first.ctx) - (b.page - first.page)) * 1000);
        const w = valve.feed(b.page, b.u, drift, b.resyncs);
        if (w) said.push(w);
      }
      const b = read();
      const res: RungResult = {
        rung: R.name, voices: R.voices, reverbs: R.reverbs,
        underruns: a.u === null || b.u === null ? null : b.u - a.u, underrunMs: a.uMs === null || b.uMs === null ? null : Math.round(b.uMs - a.uMs),
        load: capSeen.length ? r2(Math.max(...capSeen.map(c => c.averageLoad))) : null, peakLoad: capSeen.length ? r2(Math.max(...capSeen.map(c => c.peakLoad))) : null,
        underrunRatio: capSeen.length ? r2(Math.max(...capSeen.map(c => c.underrunRatio))) : null,
        driftMs: Math.round(((b.ctx - a.ctx) - (b.page - a.page)) * 1000), outDriftMs: a.out && b.out ? Math.round(((b.out.ctx - a.out.ctx) - (b.out.page - a.out.page)) * 1000) : null,
        late: b.late - a.late, gapMs: Math.round((b.gap - a.gap) * 1000), resyncs: b.resyncs - a.resyncs, timerLateMs: Math.round(worstTick),
        shed: valve.level, shedSaid: said, kitPeak: kit.budget.peak, glitch: false, why: [],
      };
      res.why = judge(res); res.glitch = res.why.length > 0;
      out.rungs.push(res); onRung(res, i);
      if (res.glitch && out.glitchAt === null) { out.glitchAt = R.name; out.glitchVoices = R.voices; }
    }
    void cap;
    clearInterval(tick); clearInterval(play);
    if (reverbs) clearInterval((reverbs as { warm: number }).warm);
    try { ctx.renderCapacity?.stop(); } catch { /* fine */ }
  } catch (e) { out.error = String((e as Error)?.stack ?? e); }
  await ctx.close().catch(() => {});
  return out;
}

/** One bar of the music rendered offline (as the Music Lab's cost tool does), best of three: how long, and how many times
 *  faster than it plays. */
async function offlineBar(rate: number, section: string, recordings: Record<string, AudioBuffer> | null): Promise<{ section: string; barMs: number; renderMs: number; times: number }> {
  const spBar = barSeconds(STYLE.bpm), clock = newBeatClock(STYLE.bpm);
  let best = Infinity;
  for (let k = 0; k < 3; k++) {
    const oc = new OfflineAudioContext(2, Math.ceil(rate * spBar), rate), e = new MusicEngine(oc, oc.destination, STYLE, SEED);
    if (recordings) e.setRecordings(recordings);
    e.renderAhead({ ...CUE, forceSection: section }, 8 * spBar, spBar, clock);
    const t0 = performance.now(); await oc.startRendering(); best = Math.min(best, performance.now() - t0);
  }
  return { section, barMs: Math.round(spBar * 1000), renderMs: r1(best), times: r1((spBar * 1000) / best) };
}

/** The night's reverbs (every convolver its graph builds: the music's and its clearing's, the singer's hall and shimmer, the
 *  legends' space), each fed the same noise for 4 s offline, against one shared reverb (the longest of them): best of three. */
async function reverbCost(rate: number): Promise<{ count: number; names: string[]; seconds: number[]; allMs: number; oneMs: number; ratio: number }> {
  const harvest = new OfflineAudioContext(2, rate, rate), made: ConvolverNode[] = [], make = harvest.createConvolver.bind(harvest);
  harvest.createConvolver = () => { const c = make(); made.push(c); return c; };
  const names: string[] = [];
  new MusicEngine(harvest, harvest.destination, STYLE, SEED); names.push("music", "clearing");
  const fx = new VoiceFx(harvest, { ...(STYLE.voiceFx ?? {}), hall: Math.max(0.5, STYLE.voiceFx?.hall ?? 0), shimmer: Math.max(0.3, STYLE.voiceFx?.shimmer ?? 0) }, () => STYLE.bpm);
  while (fx.warm()) { /* the impulses put off */ }
  names.push("singer's hall", "singer's shimmer");
  new Sfx(harvest, 0.4, TUNING.sfx, STYLE.root + 24).prewarm(); names.push("legends' space");
  const bufs = made.map(c => c.buffer).filter((b): b is AudioBuffer => !!b);
  const secs = 4, time = async (list: AudioBuffer[]) => {
    let best = Infinity;
    for (let k = 0; k < 3; k++) {
      const oc = new OfflineAudioContext(2, rate * secs, rate), n = oc.createBuffer(2, rate * secs, rate);
      for (let ch = 0; ch < 2; ch++) { const d = n.getChannelData(ch); let r = 99 + ch; for (let i = 0; i < d.length; i++) { r = (Math.imul(r, 1664525) + 1013904223) >>> 0; d[i] = (r / 4294967296 - 0.5) * 0.2; } }
      const src = oc.createBufferSource(); src.buffer = n;
      for (const b of list) { const c = oc.createConvolver(); c.buffer = b; src.connect(c).connect(oc.destination); }
      src.start();
      const t0 = performance.now(); await oc.startRendering(); best = Math.min(best, performance.now() - t0);
    }
    return best;
  };
  const longest = bufs.reduce((a, b) => (b.duration > a.duration ? b : a), bufs[0]);
  const allMs = await time(bufs), oneMs = await time([longest]);
  return { count: bufs.length, names: names.slice(0, bufs.length), seconds: bufs.map(b => r2(b.duration)), allMs: r1(allMs), oneMs: r1(oneMs), ratio: r1(allMs / oneMs) };
}

/** The machine and the build, as far as the browser tells. */
async function machine(): Promise<Record<string, unknown>> {
  const n = navigator as Navigator & { deviceMemory?: number; userAgentData?: { getHighEntropyValues(k: string[]): Promise<Record<string, unknown>> } };
  let gpu: string | null = null;
  try { const gl = document.createElement("canvas").getContext("webgl"), ext = gl?.getExtension("WEBGL_debug_renderer_info"); gpu = gl ? String(gl.getParameter(ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER)) : null; } catch { /* none */ }
  let ua: Record<string, unknown> | null = null;
  try { ua = await n.userAgentData?.getHighEntropyValues(["platform", "platformVersion", "architecture", "model", "fullVersionList"]) ?? null; } catch { /* none */ }
  let built: unknown = null;
  try { built = await (await fetch("../version.json", { cache: "no-store" })).json(); } catch { /* a local build */ }
  return { build: typeof __BUILD__ === "string" ? __BUILD__ : "dev", deployed: built, userAgent: navigator.userAgent, uaData: ua, cores: navigator.hardwareConcurrency ?? null, memoryGB: n.deviceMemory ?? null, gpu, at: new Date().toISOString() };
}

function rungRow(r: RungResult): string {
  const cell = (v: unknown) => `<td>${v === null || v === undefined ? "–" : v}</td>`;
  return `<tr class="${r.glitch ? "bad" : "ok"}">${cell(r.rung)}${cell(r.underruns)}${cell(r.load === null ? null : `${r.load} / ${r.peakLoad}`)}${cell(r.driftMs)}${cell(r.late)}${cell(r.resyncs)}${cell(r.timerLateMs)}${cell(r.shed ? SHED_STEPS[r.shed] : "")}${cell(r.kitPeak)}${cell(r.glitch ? r.why.join("; ") : "clean")}</tr>`;
}

function table(id: string, title: string): HTMLTableSectionElement {
  const box = document.createElement("section");
  box.className = "card";
  box.innerHTML = `<h2>${title}</h2><div class="scroll"><table><thead><tr><th>rung</th><th>under-runs</th><th>load / peak</th><th>clock ms (− lost)</th><th>late steps</th><th>re-anchors</th><th>timer late ms</th><th>valve would shed</th><th>kit sounds</th><th>verdict</th></tr></thead><tbody id="${id}"></tbody></table></div>`;
  $("runs").append(box);
  return box.querySelector("tbody")!;
}

function summary(R: { a: RunResult; b: RunResult; bar: Awaited<ReturnType<typeof offlineBar>>[]; reverbs: Awaited<ReturnType<typeof reverbCost>> | null; startMs: number }): string {
  const at = (r: RunResult) => r.error ? `failed (${r.error.split("\n")[0]})` : r.glitchAt === null ? `none up to ${RUNGS[RUNGS.length - 1].voices} voices` : r.glitchVoices ? `${r.glitchVoices} voices` : `"${r.glitchAt}"`;
  const lines = [
    `Glitches start at ${at(R.a)} with worklets (${R.a.loaded.join(", ") || "none loaded"}), ${at(R.b)} without.`,
    ...R.bar.map(b => `One bar of the ${b.section} (${b.barMs} ms) renders offline in ${b.renderMs} ms: ${b.times}× faster than real time.`),
    R.reverbs ? `The night's ${R.reverbs.count} reverbs cost ${R.reverbs.allMs} ms for 4 s of sound; one shared reverb ${R.reverbs.oneMs} ms (${R.reverbs.ratio}× cheaper).` : "Reverb cost: not measured.",
    `Audio start: the context running in ${R.startMs} ms; music built in ${R.a.startMs.music ?? "?"} ms${R.a.startMs.worklets !== undefined ? `; the worklets loaded in ${R.a.startMs.worklets} ms` : ""}.`,
    `This Chrome reports its under-runs (playbackStats): ${R.a.context.playbackStats ? "yes" : "no"}; its render capacity: ${R.a.context.renderCapacity ? "yes" : "no"}${R.a.context.playbackStats || R.a.context.renderCapacity ? "" : " (glitches judged by the audio clock falling behind and the music re-anchoring)"}.`,
    `The game itself caps the effects at ${TUNING.sfx.budget?.voices ?? "?"} sounds and the creatures at ${TUNING.sfx.voice.animals.maxVoices} voices; here both were lifted.`,
  ];
  return lines.join("\n");
}

async function main(): Promise<void> {
  const btn = $("go") as HTMLButtonElement;
  btn.disabled = true; stopAsked = false;
  $("runs").innerHTML = ""; $("summary").textContent = ""; ($("copy") as HTMLButtonElement).disabled = true;
  const info = await machine();
  $("machine").textContent = `${info.build} · ${info.gpu ?? "GPU unknown"} · ${info.cores ?? "?"} cores`;
  // the singer's recordings, decoded once (as the game loads them after the music starts)
  log("loading the singer's recordings…");
  const c0 = performance.now(), probe = new AudioContext();
  await probe.resume();
  let recordings: Record<string, AudioBuffer> | null = null, recMs = 0;
  try { const r0 = performance.now(); recordings = await voiceRecordings(probe) as unknown as Record<string, AudioBuffer>; recMs = r1(performance.now() - r0); } catch { recordings = null; }
  const startMs = r1(performance.now() - c0), rate = probe.sampleRate;
  await probe.close().catch(() => {});
  const tA = table("rungsA", "(a) with the AudioWorklets loaded"), a = await run(true, recordings, r => tA.insertAdjacentHTML("beforeend", rungRow(r)));
  await sleep(1000);
  const tB = table("rungsB", "(b) with no AudioWorklet"), b = await run(false, recordings, r => tB.insertAdjacentHTML("beforeend", rungRow(r)));
  log("rendering a bar of the music offline…");
  const bar = [await offlineBar(rate, "drop", recordings), await offlineBar(rate, "build", recordings)];
  log("timing the reverbs…");
  let reverbs: Awaited<ReturnType<typeof reverbCost>> | null = null;
  try { reverbs = await reverbCost(rate); } catch (e) { console.warn(e); }
  const text = summary({ a, b, bar, reverbs, startMs });
  const results = { test: "witch audio capacity", version: 1, summary: text, machine: info, recordingsMs: recMs, rungSeconds: RUNG_S, music: { section: CUE.forceSection, wave: CUE.forceWave, bpm: STYLE.bpm }, withWorklets: a, withoutWorklets: b, offlineBar: bar, reverbs };
  $("summary").textContent = text;
  ($("json") as HTMLTextAreaElement).value = JSON.stringify(results, null, 1);
  ($("copy") as HTMLButtonElement).disabled = false;
  (window as unknown as { audioTest: unknown }).audioTest = results;
  log("done: copy the results and paste them to the builders");
  btn.disabled = false; btn.textContent = "Run again";
}

$("go").addEventListener("click", () => { void main().catch(e => { log(`failed: ${e}`); ($("go") as HTMLButtonElement).disabled = false; }); });
$("copy").addEventListener("click", () => {
  const t = ($("json") as HTMLTextAreaElement).value;
  void navigator.clipboard.writeText(t).then(() => { $("copy").textContent = "Copied ✓"; setTimeout(() => { $("copy").textContent = "Copy results"; }, 2000); }, () => { ($("json") as HTMLTextAreaElement).select(); document.execCommand("copy"); });
});
(window as unknown as { audioTestStart: () => Promise<void> }).audioTestStart = main;
