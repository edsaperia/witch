// The music's stall test (Ed, 2026-10-27, with the plan to render the music ahead: "give Ed a test like the audio page: the
// music's gaps and re-anchors during an artificial 1.5 s main-thread stall, old against new"): the game's own music (as the
// audio test plays it: the drop at wave 3, the singer loaded) runs for about 40 s while the page's thread is held busy for
// 1.5 s three times, as a long frame would hold it. Game time runs as the game's does (a frame over the rules' MAX_STEP loses
// the rest), so the music meets the same hitch it meets in a night. What leaves for the speakers is recorded (a MediaRecorder,
// off the page's thread) and searched for drop-outs: each stall's longest, against the music's own rests elsewhere; with
// the engine's own counts (re-anchors, late steps, gaps) and how far game time ended up from the audio clock. One mode a run
// ("live": today's engine; more to come), a summary and "Copy results".
import styleJson from "../../config/music-style.json";
import { TUNING } from "../../src/rules/tuning";
import { newBeatClock } from "../../src/rules/beat";
import { MAX_STEP } from "../../src/rules/clock";
import type { MusicCue } from "../../src/rules/musicPlan";
import type { MusicStyle } from "../../src/rules/musicScore";
import type { MusicMix } from "../../src/rules/music";
import { Music } from "../../src/platform/audio/music";
import { voiceRecordings } from "../../src/platform/audio/voiceSamples";
import { bufferHint, learntBuffer } from "../../src/platform/audio/buffer";

declare const __BUILD__: string;
const STYLE = styleJson as unknown as MusicStyle;
const $ = (id: string) => document.getElementById(id)!;
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
const r1 = (x: number) => Math.round(x * 10) / 10;

const CUE: MusicCue = { waves: [0, 0, 0], nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0, forceWave: 3, forceSection: "drop" };
const MIX: MusicMix = { volume: 1, cutoff: 16000, distort: 0, distance: 0 };
/** When the page's thread is held (s into the run), how long (ms), and the run's length (s). */
const STALLS = [8, 18, 28, 38], STALL_MS = 1500, RUN_S = 48;
/** The world slowed as in the treehouse (a tenth, eased in and out over half a second: tuning legendCircle.slow) from SLOW[0]
 *  to SLOW[1] s: the last stall comes while it's slowed (Ed, 2026-10-27: the music plays live while slowed, ahead again at full
 *  speed). Slowed, the music is a tape at a tenth, all but silent: its drop-outs there say nothing, its re-anchors do, and
 *  whether it comes back to its level after. */
const SLOW = [32, 44], SLOW_RATE = 0.1, SLOW_EASE = 0.5;
/** The recording's level is read in WIN_MS windows. A drop-out: at least GAP_MS of windows DROP_DB or more under the music's
 *  level in the REF_S before the stall (the reverb and delay tails carry on through a gap in the notes, so it's never silent:
 *  the first cloud run's 898 ms with no notes never fell under -60 dBFS). */
const WIN_MS = 50, GAP_MS = 100, DROP_DB = 12, REF_S = 3;

interface Gap { at: number; ms: number }
interface StallResult { at: number; slowed: boolean; heldMs: number; longestGapMs: number; gaps: Gap[]; levelDb: number; deepestDropDb: number; resyncs: number; late: number; engineGapMs: number; gameBehindMs: number }
interface ModeResult { mode: string; stalls: StallResult[]; levelBySecond?: number[]; levelBeforeSlowDb?: number; levelAfterSlowDb?: number; elsewhereLongestGapMs: number; recordedS: number; ahead?: Record<string, number>; error?: string }

const log = (s: string) => { $("status").textContent = s; };

/** The recording's level (dBFS), a WIN_MS window at a time. */
function levels(buf: AudioBuffer): number[] {
  const n = Math.floor((buf.sampleRate * WIN_MS) / 1000), chans = Array.from({ length: buf.numberOfChannels }, (_, c) => buf.getChannelData(c)), out: number[] = [];
  for (let w = 0; (w + 1) * n <= buf.length; w++) {
    let e = 0;
    for (const d of chans) for (let i = w * n; i < (w + 1) * n; i++) e += d[i] * d[i];
    out.push(10 * Math.log10(e / (n * chans.length) + 1e-20));
  }
  return out;
}
const median = (xs: number[]) => { const a = [...xs].sort((p, q) => p - q); return a.length ? a[a.length >> 1] : -Infinity; };
/** Runs of windows from `from` to `to` (s) under `floor` (dBFS), at least GAP_MS each: where (s) and how long (ms). */
function runsUnder(L: number[], from: number, to: number, floor: number): Gap[] {
  const out: Gap[] = [], a = Math.max(0, Math.floor((from * 1000) / WIN_MS)), b = Math.min(L.length, Math.ceil((to * 1000) / WIN_MS));
  let run = 0;
  for (let w = a; w <= b; w++) {
    if (w < b && L[w] < floor) { run++; continue; }
    if (run * WIN_MS >= GAP_MS) out.push({ at: r1(((w - run) * WIN_MS) / 1000), ms: run * WIN_MS });
    run = 0;
  }
  return out;
}

/** One run in a mode: the music, its output recorded, the page's thread held at each stall. */
async function run(mode: string, recordings: Record<string, AudioBuffer> | null): Promise<ModeResult> {
  const M = TUNING.music, ctx = new AudioContext({ latencyHint: bufferHint(M.buffer, M.latency, null, learntBuffer()) });
  await ctx.resume();
  const out: ModeResult = { mode, stalls: [], elsewhereLongestGapMs: 0, recordedS: 0 };
  try {
    const music = new Music(ctx, M.volume * 0.8, STYLE, 7, "", mode === "ahead");
    if (recordings) { music.engine?.setRecordings(recordings); if (recordings.whispers) music.engine?.setWhisper(recordings.whispers); }
    const tap = ctx.createMediaStreamDestination(); music.output.connect(tap);
    const rec = new MediaRecorder(tap.stream), chunks: Blob[] = [];
    rec.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
    const started = new Promise<number>(res => { rec.onstart = () => res(performance.now()); });
    rec.start(1000);
    const recAt = await started;
    // game time as the game keeps it: a frame's time, never more than the rules' MAX_STEP (the rest lost)
    const clock = newBeatClock(STYLE.bpm), page0 = performance.now(), audio0 = ctx.currentTime;
    let game = 0, last = performance.now();
    const rateAt = (s: number) => { const a = Math.max(0, Math.min(1, (s - SLOW[0]) / SLOW_EASE)), b = Math.max(0, Math.min(1, (SLOW[1] - s) / SLOW_EASE)); return 1 - (1 - SLOW_RATE) * Math.min(a, b); };
    const frame = () => { const now = performance.now(), rate = rateAt((now - page0) / 1000); game += Math.min((now - last) / 1000, MAX_STEP) * rate; last = now; music.update(MIX, CUE, game, clock, true, M, rate, 0, 0); };
    const tick = setInterval(frame, 16);
    frame();
    for (const at of STALLS) {
      await sleep(Math.max(0, page0 + at * 1000 - performance.now()));
      log(`${mode}: holding the page's thread ${STALL_MS / 1000} s at ${at} s`);
      const s0 = { ...music.stats }, h0 = performance.now();
      while (performance.now() - h0 < STALL_MS) { /* the hitch */ }
      const held = performance.now() - h0;
      await sleep(2500); // (its aftermath: the music catching up, or not)
      const s1 = music.stats, behind = (ctx.currentTime - audio0) - game;
      out.stalls.push({ at: r1((h0 - recAt) / 1000), slowed: at > SLOW[0] && at < SLOW[1], heldMs: Math.round(held), longestGapMs: 0, gaps: [], levelDb: 0, deepestDropDb: 0, resyncs: s1.resyncs - s0.resyncs, late: s1.late - s0.late, engineGapMs: Math.round((s1.gap - s0.gap) * 1000), gameBehindMs: Math.round(behind * 1000) });
      log(`${mode}: running on`);
    }
    await sleep(Math.max(0, page0 + RUN_S * 1000 - performance.now()));
    clearInterval(tick);
    if (music.ahead) out.ahead = { ...music.ahead.stats, renderMs: Math.round(music.ahead.stats.renderMs), queuedAhead: Math.round(music.ahead.stats.queuedAhead * 10) / 10 };
    const stopped = new Promise<void>(res => { rec.onstop = () => res(); });
    rec.stop(); await stopped;
    const buf = await ctx.decodeAudioData(await new Blob(chunks, { type: rec.mimeType }).arrayBuffer());
    out.recordedS = r1(buf.duration);
    // each stall: the music's level over the REF_S before it, and its drop-outs from the hold to 3 s after; elsewhere (past its
    // first REF_S), the drop-outs against the level before each, the music's own rests and breaks
    const L = levels(buf), win = (t: number) => Math.round((t * 1000) / WIN_MS), span = STALL_MS / 1000 + 3;
    out.levelBySecond = Array.from({ length: Math.floor(buf.duration) }, (_, i) => r1(median(L.slice(win(i), win(i + 1)))));
    const slow0 = SLOW[0] - (page0 - recAt) / 1000, slow1 = SLOW[1] - (page0 - recAt) / 1000; // (the recording's times)
    out.levelBeforeSlowDb = r1(median(L.slice(win(slow0 - 3), win(slow0)))); out.levelAfterSlowDb = r1(median(L.slice(win(slow1 + 1), win(slow1 + 3))));
    for (const st of out.stalls) {
      const ref = median(L.slice(Math.max(0, win(st.at - REF_S)), win(st.at)));
      st.levelDb = r1(ref); st.gaps = runsUnder(L, st.at - 0.2, st.at + span, ref - DROP_DB); st.longestGapMs = Math.max(0, ...st.gaps.map(g => g.ms));
      st.deepestDropDb = r1(ref - Math.min(...L.slice(win(st.at), win(st.at + span))));
    }
    for (let t = REF_S; t + 1 < buf.duration; t += 1) {
      if (out.stalls.some(st => t + 1 > st.at - 0.2 && t < st.at + span)) continue;
      const ref = median(L.slice(win(t - REF_S), win(t)));
      for (const g of runsUnder(L, t, t + 1, ref - DROP_DB)) out.elsewhereLongestGapMs = Math.max(out.elsewhereLongestGapMs, g.ms);
    }
  } catch (e) { out.error = String((e as Error)?.stack ?? e); }
  await ctx.close().catch(() => {});
  return out;
}

function show(r: ModeResult): void {
  const box = document.createElement("section");
  box.className = "card";
  const rows = r.stalls.map((s, i) => `<tr class="${s.longestGapMs >= GAP_MS || s.engineGapMs > 0 || s.resyncs ? "bad" : "ok"}"><td>${s.at} s${i === 0 ? " (cold)" : ""}${s.slowed ? " (slowed)" : ""}</td><td>${s.heldMs}</td><td>${s.longestGapMs || "none"}</td><td>${s.deepestDropDb}</td><td>${s.resyncs}</td><td>${s.late}</td><td>${r.mode === "live" ? s.engineGapMs : "–"}</td><td>${s.gameBehindMs}</td></tr>`).join("");
  box.innerHTML = `<h2>${r.mode}</h2>${r.error ? `<p>failed: ${r.error.split("\n")[0]}</p>` : ""}<div class="scroll"><table><thead><tr><th>stall at</th><th>held ms</th><th>longest drop-out ms</th><th>deepest drop dB</th><th>re-anchors</th><th>late steps</th><th>notes missing ms (the live engine's count)</th><th>game behind audio ms</th></tr></thead><tbody>${rows}</tbody></table></div>${r.ahead ? `<p>Drawn ahead: ${r.ahead.rendered} bars rendered, ${r.ahead.late} late, ${r.ahead.dropped} dropped (the music changed), ${Math.round(r.ahead.renderMs / Math.max(1, r.ahead.rendered))} ms a bar to render.</p>` : ""}<p>Coming back from the slowed world: its level ${r.levelBeforeSlowDb} dB before, ${r.levelAfterSlowDb} dB after. Drop-outs elsewhere (the music's own rests and breaks): ${r.elsewhereLongestGapMs || "none"} ms at most (${r.recordedS} s recorded).</p>`;
  $("runs").append(box);
}

function summary(rs: ModeResult[]): string {
  return rs.map(r => {
    if (r.error) return `${r.mode}: failed (${r.error.split("\n")[0]}).`;
    const full = r.stalls.filter(s => !s.slowed), worst = Math.max(0, ...full.map(s => s.longestGapMs)), re = full.reduce((a, s) => a + s.resyncs, 0), slowRe = r.stalls.filter(s => s.slowed).reduce((a, s) => a + s.resyncs, 0);
    return `${r.mode}: through ${full.length} stalls of ${STALL_MS / 1000} s at full speed (the first cold), the longest drop-out (${DROP_DB} dB under its level) ${worst || "none"}${worst ? " ms" : ""} (its own rests elsewhere ${r.elsewhereLongestGapMs || "none"}${r.elsewhereLongestGapMs ? " ms" : ""}), ${re} re-anchors; one in the slowed world: ${slowRe} re-anchors, the music back to ${r.levelAfterSlowDb} dB after it (${r.levelBeforeSlowDb} dB before); game time ended ${r.stalls.at(-1)?.gameBehindMs ?? 0} ms behind the audio clock.`;
  }).join("\n");
}

async function main(): Promise<void> {
  const btn = $("go") as HTMLButtonElement;
  btn.disabled = true; $("runs").innerHTML = ""; ($("copy") as HTMLButtonElement).disabled = true;
  log("loading the singer's recordings…");
  const probe = new AudioContext();
  await probe.resume();
  let recordings: Record<string, AudioBuffer> | null = null;
  try { recordings = await voiceRecordings(probe) as unknown as Record<string, AudioBuffer>; } catch { recordings = null; }
  await probe.close().catch(() => {});
  const results: ModeResult[] = [];
  for (const mode of ["live", "ahead"]) { const r = await run(mode, recordings); results.push(r); show(r); await sleep(800); }
  const text = summary(results);
  const all = { test: "witch music stall", version: 1, summary: text, build: typeof __BUILD__ === "string" ? __BUILD__ : "dev", userAgent: navigator.userAgent, cores: navigator.hardwareConcurrency ?? null, stallMs: STALL_MS, stalls: STALLS, dropDb: DROP_DB, gapMs: GAP_MS, windowMs: WIN_MS, modes: results };
  $("summary").textContent = text;
  ($("json") as HTMLTextAreaElement).value = JSON.stringify(all, null, 1);
  ($("copy") as HTMLButtonElement).disabled = false;
  (window as unknown as { audioTest: unknown }).audioTest = all;
  log("done: copy the results and paste them to the builders");
  btn.disabled = false; btn.textContent = "Run again";
}

$("go").addEventListener("click", () => { void main().catch(e => { log(`failed: ${e}`); ($("go") as HTMLButtonElement).disabled = false; }); });
$("copy").addEventListener("click", () => {
  const t = ($("json") as HTMLTextAreaElement).value;
  void navigator.clipboard.writeText(t).then(() => { $("copy").textContent = "Copied ✓"; setTimeout(() => { $("copy").textContent = "Copy results"; }, 2000); }, () => { ($("json") as HTMLTextAreaElement).select(); document.execCommand("copy"); });
});
