// The playtest log (Ed, 2026-10-04: so his playtests give the real rate a player grows at): every
// logEvery seconds of game time, the wave, the party's fighting value (leashed and parked), its
// creatures by level, berries eaten, invites and evolutions so far, and each siege's fighting
// value. Kept on this browser (localStorage), the last few runs; the pause page's Download log saves them as JSON, and so
// does opening the game with ?playtest=download. Browser-side, outside the rules.
import { powerReport } from "../rules/power";
import { stackOrder } from "../rules/leash";
import type { Game } from "../rules/game";
import type { Stall } from "./stallLog";
import type { CompareKey } from "../app/compareKey";
import { setCaughtErrorSink } from "./caughtError";
import { beginBrowserJournal, currentJournal, journalEntry, notable, recentNotables, setLogContext, type NotableEvent } from "./playtestJournal";
import { packLog } from "./logCodec";
export { logCaughtError } from "./caughtError";

/** Ed, 2026-10-30: keep the last 20 crashes in the L log, including failures before play starts. */
export interface PlaytestError { kind: "error" | "unhandledrejection" | "caught"; message: string; stack: string; build: string; t: number | null; island: string; where?: string; trail?: NotableEvent[] }
const errors: PlaytestError[] = [];
declare const __BUILD__: string;
beginBrowserJournal(typeof __BUILD__ === "string" ? __BUILD__ : "dev");
// Keep the browser's warning output intact; storage failures themselves never use this path.
if (currentJournal()) {
  const warn = console.warn;
  console.warn = (...args: unknown[]) => {
    try { notable("warning", args.map(value => errorText(value).message).join(" ").slice(0, 1000)); } catch { /* Diagnostics cannot suppress a warning. */ }
    warn.apply(console, args);
  };
}
let errorSink: ((error: Omit<PlaytestError, "build" | "t" | "island">) => void) | undefined;
let errorObserver: ((error: Omit<PlaytestError, "build" | "t" | "island">) => void) | undefined;
export function observePlaytestErrors(observer: typeof errorObserver): void { errorObserver = observer; }
function errorText(value: unknown): { message: string; stack: string } {
  try {
    if (value instanceof Error) return { message: value.message, stack: value.stack ?? value.message };
    const message = typeof value === "string" ? value : JSON.stringify(value) ?? String(value);
    return { message, stack: message };
  } catch { return { message: "Unprintable error", stack: "Unprintable error" }; }
}
/** For recoverable failures that must remain visible without interrupting their existing fallback. */
setCaughtErrorSink((value, where) => captureError("caught", value, where));
function captureError(kind: PlaytestError["kind"], value: unknown, where?: string): void {
  const detail = errorText(value);
  notable("error", detail.message, { kind, where });
  const error = { kind, ...detail, ...(where ? { where } : {}), trail: recentNotables() };
  journalEntry("error", error);
  errorObserver?.(error);
  if (errorSink) errorSink(error);
  else {
    errors.push({ ...error, build: typeof __BUILD__ === "string" ? __BUILD__ : "dev", t: null, island: "unknown" });
    if (errors.length > 20) errors.shift();
  }
}
// Observe without cancelling the browser's normal reporting. One pair per page, never per night.
if (typeof window !== "undefined") {
  window.addEventListener("error", e => captureError("error", e.error ?? e.message, `${e.filename}:${e.lineno}:${e.colno}`));
  window.addEventListener("unhandledrejection", e => captureError("unhandledrejection", e.reason));
}

/** A measured silence (outputMeter.ts): game time, how long (s), where she was, the mix's intended volume and the master's
 *  gain, the context's state and clock, the level it came back at (dBFS), and the nearest stall (its page time's distance, s, and its length, ms). */
export interface OutputSilence { t: number; dur: number; x: number; z: number; area: string; mode: string; mix: number; gain: number; state: string; clock: number; back: number; stall?: { off: number; ms: number }; /** Why, as far as the clock can tell (outputMeter.ts ClockWatch): "game" (the clock ran true: the game stopped sending), or "clock" (the audio clock was slow then: the device or the browser under-ran). */ cause?: "game" | "clock" }
/** A mic check episode: its kind, game time, length (s), the output and mic levels (dBFS), the lag (ms), the nearest stall. */
export interface MicLogged { kind: string; t: number; dur: number; outDb: number; micDb: number; lag: number; stall?: { off: number; ms: number } }

export interface PlaytestSample {
  /** Game time (s), the wave, and the soundsystems standing (home included). */
  t: number;
  wave: number;
  standing: number;
  /** The party's fighting value on her leash and parked at sigils; its creatures by level (baby, young, adult, legend). */
  leashed: number;
  parked: number;
  counts: [number, number, number, number];
  berries: number;
  invites: number;
  evolved: number;
  /** Each siege still going: its soundsystem, its besiegers' fighting value and number, the soundsystem's health. */
  sieges: { key: string; value: number; count: number; hp: number }[];
  marching: number;
  /** The witch's hits left. */
  hits: number;
  /** Her stack as drawn, top first (Ed's playtest of v5399: "one of them seemed pinned to the bottom of the stack"): each creature's
   *  sigil as `#id species level`, a carried relic's as `relic #id`, and last a sleeping legend's sigil she carries, which never
   *  cycles (rules/stoneStacks.ts), as `tether #id species`. */
  stack?: string[];
  /** The frames of the last two seconds (platform/frameStats.ts; Ed's overlay, 2026-10-13: "gpu 21.4 ms median", so a log shows
   *  where a slow frame's time goes): their length and the page's own work (ms, median and p95), the GPU's own time where the
   *  browser can time it, the share over 20 ms, and what was drawn (draw calls, trees, bushes, creatures, the mode and zoom). */
  frames?: { ms: number; p95: number; cpu: number; cpu95: number; gpu: number | null; gpu95: number | null; over20: number; draws: number; trees: number; bushes: number; creatures: number; mode: string; zoom: number; /** the quality ladder's rung and mode (app/ladder.ts) */ rung?: number; ladder?: string };
  /** The sound (round 13: the music stopping): the context's state, the music's volume now, the damage heard, metres to the music. */
  /** Where she was and how it was seen (Ed's circle bug, 2026-10-13: the log couldn't say where a picture went wrong): her place,
   *  mode and area, the camera's zoom step, the world's time scale (under 1 in a sleeping legend's circle, where the world beyond
   *  greys), and whether L took this sample (the moment Ed saw something). */
  view?: { x: number; z: number; mode: string; area: string; zoom: number; timeScale: number; pressed?: boolean };
  /** The repro link at this sample (app/repro.ts): the world as it was and her place, for a builder to open. */
  link?: string;
  /** What the GPU holds (render/gpuLedger.ts): MB in all and by kind, the budget (MB), the art sets let go so far and GL's
   *  out-of-memory errors (render/view/gpuBudget.ts). */
  gpu?: { mb: number; budget: number; kinds: Record<string, number>; evicted: number; ooms: number };
  /** Her mode as a scene (ground, treetops, house, zoo: app/compareKey.ts sceneMode), so the log's medians go by scene
   *  (tools/bench/comparable.cjs segments: island, wave and mode). */
  scene?: string;
  audio?: { state: string; volume: number; distort: number; distance: number; mends: number; /** The safety valve's step (platform/audio/shed.ts: 0 all the sound, up to 3). */ shed?: number; /** The music's continuity so far (musicEngine.stats; Ed, round 16: "Music is still starting and stopping"): seconds left unscheduled, re-anchorings, sixteenths held for a stall, and how far ahead it schedules now. */ gap?: number; resyncs?: number; late?: number; ahead?: number; /** The music drawn ahead (platform/audio/musicAhead.ts; ?music=live none): whether it's drawing now, and its bars so far: rendered, arrived late, dropped (the music changed). */ drawn?: boolean; bars?: number; barsLate?: number; barsDropped?: number; /** Times the game's beat was moved on to the music's after a stall, and by how many seconds in all (rules/beat.ts shiftBeat). */ beatShifts?: number; beatShifted?: number; /** The audio clock against the page's (outputMeter.ts ClockWatch; Ed, 2026-10-07: "the music is still cutting out"): one-second windows slow and fast, the drift (ms, negative: audio behind) by the context's clock and by what the device played, under-runs the browser counted, and the verdict in words. */ clock?: { slow: number; fast: number; drift: number; played: number | null; underruns: number | null; underrunMs: number | null; verdict: string } };
}

export interface PlaytestRun { seed: number; build: string; started: string; /** What this run was, where, on what and with what (app/compareKey.ts; Ed, 2026-10-26: "only compare like with like"), as last sampled: tools/playtest/compare.mjs refuses two runs whose keys differ in more than what's tested. */ key?: CompareKey; /** ?timing=1: the transition's steps, wall ms from the first, and the long tasks (app/timing.ts). */ timing?: unknown; /** The machine (app/repro.ts machineLines): GPU, WebGL, browser, OS, screen, canvas. */ machine?: string[]; /** Every setting changed from the build's (tuning path: value), as last sampled. */ changed?: Record<string, unknown>; /** The overlay's "copy debug info" text as the log was saved. */ debug?: string; /** The waves' pace: the ley pulse's speed (m/s, 0 off) since 2026-10-09; seconds between waves before. */ interval: number; samples: PlaytestSample[]; /** The fight's scale and speed whenever they were set (Ed's live knobs). */ fight?: { t: number; scale: number; speed: number; momentum?: number }[]; /** Area size (metres), treetop speed (m/s) and the map's areas a side whenever they were set (Ed, 2026-10-05). */ world?: { t: number; areaSize: number; treetopSpeed: number; mapAreas: number }[]; /** The audio watchdog's mends (round 13: the music stopping): what, at what game time. */ audio?: { t: number; what: string }[]; /** The last frames of 100 ms or more (platform/stallLog.ts), with what they spent it on. */ stalls?: Stall[]; /** The measured output silent while the music should be heard (platform/audio/outputMeter.ts), over 0.3 s each. */ silences?: OutputSilence[]; /** The mic check's episodes (?micCheck=1): dropouts after the game, and the mic hearing what the output didn't send. */ mic?: MicLogged[]; /** A sail in place that went wrong (app/sail.ts: the page loaded anew instead), what was thrown. */ sails?: { t: number; what: string }[]; /** The GPU's own trouble (render/view/gpuBudget.ts): an out-of-memory error, the GL context lost, the night reloaded after it. */ gpu?: { t: number; what: string; mb?: number }[] }

const KEY = "witch.playtest", KEEP = 8, EVERY = 10;
export interface PlaytestRun { errors?: PlaytestError[] }
const round = (x: number) => Math.round(x * 10) / 10;

function readRuns(): PlaytestRun[] {
  try { const v = localStorage.getItem(KEY); return v ? (JSON.parse(v) as PlaytestRun[]) : []; } catch { return []; }
}

export class PlaytestLog {
  comments?: (moments?: boolean) => Promise<unknown[]>;
  commentStorage?: () => unknown;
  inputRecording?: () => unknown;
  private run: PlaytestRun;
  private next = EVERY;
  /** The sound as it is now, for each sample (main.ts sets it). */
  audioState?: () => PlaytestSample["audio"]; // (nothing before the first 10 s: a page opened and never played keeps no run)
  /** The frames' stats (main.ts sets it: the overlay's own numbers). */
  frameState?: () => PlaytestSample["frames"];
  /** What the GPU holds, for each sample (main.ts sets it: render/view/gpuBudget.ts gpuSample). */
  gpuState?: () => PlaytestSample["gpu"];
  /** Where she is and how it's seen, for each sample (main.ts sets it). */
  viewState?: () => PlaytestSample["view"]; // (nothing before the first 10 s: a page opened and never played keeps no run)
  /** The run's comparability key, and her mode as a scene, for each sample (main.ts sets them: app/compareKey.ts). */
  keyState?: () => CompareKey;
  sceneState?: () => string;
  /** What a builder needs to reproduce what she saw (app/repro.ts): the repro link, the machine and the settings changed. */
  debugInfo?: () => { link: string; machine: string[]; changed: Record<string, unknown> };
  /** All of the debug info as text (the overlay's "copy debug info"), kept with the run when the log is saved (L). */
  debugText?: () => string;
  constructor(private game: Game, build: string) {
    this.run = { seed: game.seed, build, started: new Date().toISOString(), interval: game.tuning.leyLines.pulseSpeed, samples: [] };
    setLogContext(() => ({ build, t: game.clock.time, island: game.tuning.map?.island || "home" }));
    notable("arrival", "Night opened", { seed: game.seed });
    journalEntry("run:start", this.run);
    errorSink = error => {
      const entry: PlaytestError = { ...error, build, t: game.clock.time, island: game.tuning.map?.island || "home" };
      errors.push(entry);
      if (errors.length > 20) errors.shift();
      this.save(false); // A failing diagnostic callback must not recursively fail the error handler.
    };
  }
  /** Call once a frame: takes a sample whenever another logEvery seconds of game time have gone. */
  update(pressed = false): void {
    const g = this.game;
    if (!pressed && g.clock.time < this.next) return;
    this.next = Math.floor(g.clock.time / EVERY) * EVERY + EVERY;
    const p = powerReport(g.creatures, g.witches, g.combat.sounds);
    this.run.interval = g.party.paused ? 0 : g.tuning.leyLines.pulseSpeed; // (the start screen's choice: the ley pulse's speed, m/s, 0 off; Ed 2026-10-09)
    this.run.samples.push({
      t: Math.round(g.clock.time), wave: g.party.wave, standing: [...g.combat.sounds.values()].filter(h => h.hp > 0).length,
      leashed: round(p.leashed), parked: round(p.parked), counts: p.counts,
      berries: g.tally.berries, invites: g.tally.invites, evolved: g.tally.evolved,
      sieges: p.sieges.map(s => ({ key: s.key, value: round(s.value), count: s.count, hp: Math.round(s.hp) })), marching: round(p.marching),
      hits: g.witches[0].health.hp,
      stack: stackShown(g),
      audio: this.audioState?.(),
      frames: this.frameState?.(),
      gpu: this.gpuState?.(),
      view: (v => (v && pressed ? { ...v, pressed: true } : v))(this.viewState?.()),
      scene: this.sceneState?.(),
    });
    try { const k = this.keyState?.(); if (k) this.run.key = k; } catch (e) { captureError("caught", e, "playtest comparability key"); }
    const D = this.debugInfo?.();
    if (D) { this.run.machine = D.machine; this.run.changed = D.changed; this.run.samples[this.run.samples.length - 1].link = D.link; } // (each sample's link: where she was then)
    this.save();
  }
  /** The transition's steps and long tasks (?timing=1: app/timing.ts), kept with the run. */
  timing(t: unknown): void { this.run.timing = t; this.save(); }
  /** The stall log's stalls, kept with the run (main.ts sets it). */
  stalls: (() => Stall[]) | null = null;
  private save(includeStalls = true): void {
    // Snapshot: a later night's errors must not mutate an already saved run.
    this.run.errors = errors.map(e => ({ ...e }));
    journalEntry("run:update", { seed: this.run.seed, started: this.run.started, sample: this.run.samples.at(-1), errors: this.run.errors });
    if (includeStalls && this.stalls) this.run.stalls = this.stalls().slice();
    try {
      const runs = readRuns().filter(r => r.started !== this.run.started);
      runs.push(this.run);
      localStorage.setItem(KEY, JSON.stringify(runs.slice(-KEEP)));
    } catch { /* storage full or blocked: the log is a convenience */ }
  }
  /** The fight's scale or speed changed (the debug overlay's knobs): noted, with the game time. */
  fight(scale: number, speed: number, momentum = 1): void {
    (this.run.fight ??= []).push({ t: Math.round(this.game.clock.time * 10) / 10, scale, speed, momentum });
    this.save();
  }
  /** Area size, treetop speed or the map's size set (the link, or the debug overlay's slider): noted, with the game time. */
  world(areaSize: number, treetopSpeed: number, mapAreas: number): void {
    (this.run.world ??= []).push({ t: Math.round(this.game.clock.time * 10) / 10, areaSize, treetopSpeed, mapAreas });
    this.save();
  }
  /** The audio watchdog mended something (a context resumed, the music or sound effects rebuilt): noted, with the game time. */
  audio(what: string): void {
    const a = (this.run.audio ??= []);
    if (a.length < 200) a.push({ t: Math.round(this.game.clock.time * 10) / 10, what });
    this.save();
  }
  /** The GPU's own trouble (an out-of-memory error, the context lost: render/view/gpuBudget.ts, main.ts): noted, with the game
   *  time and what was held then, and saved at once (a lost context reloads the night). */
  gpuEvent(what: string, mb?: number): void {
    const a = (this.run.gpu ??= []);
    if (a.length < 50) a.push({ t: Math.round(this.game.clock.time * 10) / 10, what, ...(mb !== undefined ? { mb } : {}) });
    this.save();
  }
  /** A sail in place went wrong (app/sail.ts) and the page loads anew: what was thrown, kept before it goes. */
  sail(what: string): void {
    const a = (this.run.sails ??= []);
    if (a.length < 20) a.push({ t: Math.round(this.game.clock.time * 10) / 10, what });
    this.save();
  }
  /** A measured silence while the music should be heard (main.ts fills it in). */
  silence(e: OutputSilence): void {
    const a = (this.run.silences ??= []);
    if (a.length < 300) a.push(e);
    this.save();
  }
  /** A mic check episode. */
  mic(e: MicLogged): void {
    const a = (this.run.mic ??= []);
    if (a.length < 300) a.push(e);
    this.save();
  }
  /** Every run kept on this browser (this one included), as a JSON file to save. */
  async download(format: "json" | "text" = "json"): Promise<void> {
    this.update(true); // (a sample of this moment: what Ed saw when he pressed L)
    try { const t = this.debugText?.(); if (t) { this.run.debug = t; this.save(); } } catch (e) { captureError("caught", e, "playtest debug text"); }
    const runs = readRuns(), all = runs.some(r => r.started === this.run.started) ? runs : [...runs, this.run];
    if (this.inputRecording) Object.assign(all[all.length - 1], { inputRecording: this.inputRecording() });
    if (this.comments) Object.assign(all[all.length - 1], { comments: await this.comments() });
    if (this.commentStorage) Object.assign(all[all.length - 1], { commentStorage: this.commentStorage() });
    if (currentJournal()) Object.assign(all[all.length - 1], { journal: await currentJournal()!.download() });
    const content = format === "text" ? readablePlaytest(all) : JSON.stringify(await packPlaytestDownload(all, this.comments ? () => this.comments!(false) : undefined));
    const blob = new Blob([content], { type: format === "text" ? "text/plain;charset=utf-8" : "application/json" }), a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `witch-playtest-${this.run.seed}-${this.run.started.slice(0, 16).replace(/[:T]/g, "-")}.${format === "text" ? "txt" : "json"}`;
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
}

/** A diagnostics envelope limit must not prevent downloading the written reports. */
export async function packPlaytestDownload(runs: PlaytestRun[], reports?: () => Promise<unknown[]>) {
  try { return await packLog(runs); }
  catch (e) {
    if (!reports) throw e;
    const comments = await reports();
    if (!comments.length) throw e;
    const latest = runs.at(-1)!;
    return packLog([{ seed: latest.seed, build: latest.build, started: latest.started, interval: latest.interval, samples: [], comments,
      sourceRuns: runs.map(({ seed, build, started }) => ({ seed, build, started })),
      exportOmissions: [`Full diagnostics could not be downloaded: ${e instanceof Error ? `${e.name}: ${e.message}` : String(e)}`,
        "Reports-only download: all written comments and their context kept; saved moments, input recordings, samples and journal omitted."] }]);
  }
}

/** Text is for reading; the JSON download remains the builder's validated restore format. */
export function readablePlaytest(runs: readonly PlaytestRun[]): string {
  return runs.map(run => {
    const value = run as PlaytestRun & { journal?: { text?: string; dropped?: unknown; persistent?: boolean; previous?: unknown; previousMarker?: unknown }; comments?: unknown; inputRecording?: unknown };
    const { journal, inputRecording, ...details } = value;
    return [`WITCH PLAYTEST — ${run.build} — seed ${run.seed} — ${run.started}`,
      "RUN DETAILS, ERRORS, SAMPLES AND SAVED COMMENTS", JSON.stringify(details, null, 2),
      "STRUCTURED RECORDS", journal?.text ?? "No structured records in this older run.",
      "RETENTION / PREVIOUS PAGES", JSON.stringify(journal && { persistent: journal.persistent, dropped: journal.dropped, previous: journal.previous, previousMarker: journal.previousMarker }, null, 2),
      "INPUT RECORDING (use JSON download to restore)", JSON.stringify(inputRecording ?? null, null, 2)].join("\n\n");
  }).join("\n\n============================================================\n\n");
}

/** Her stack as drawn (render/leash/stack.ts), top first, for the log. */
export function stackShown(g: Game): string[] {
  const s = g.witches[0].leash, out = stackOrder(s).map(it => (it.kind === "relic" ? `relic #${it.id}` : `#${it.id} ${g.creatures[it.id]?.species} ${g.creatures[it.id]?.level}`));
  const L = s.tether ? g.creatures[s.tether.id] : undefined;
  if (L) out.push(`tether #${L.id} ${L.species}`);
  return out;
}
