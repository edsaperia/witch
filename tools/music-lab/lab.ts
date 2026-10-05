// The Witch Music Lab: plays the game's music engine (src/platform/audio/musicEngine.ts) through the
// game's own mix (src/platform/audio/music.ts) from a style (config/music-style.json), with a pretend run
// (the boot, waves every so often, jump to any wave), any one section on a loop, the proximity mix,
// damage and the hooks (knocked out, siege), and knobs for the style. Built into one page by
// tools/music-lab/build.mjs; window.musicLabCheck() renders every section offline (tools/music-lab/check.mjs).
import styleJson from "../../config/music-style.json";
import { Music } from "../../src/platform/audio/music";
import { MusicEngine } from "../../src/platform/audio/musicEngine";
import { mixAt, nearness } from "../../src/rules/music";
import { beatAt, bpmAt, newBeatClock, rampTo, timeAt, waveArrived, waveTempo, type BeatClock } from "../../src/rules/beat";
import { barAt, barSeconds, planBlock, type MusicCue } from "../../src/rules/musicPlan";
import { arcStep, checkStyle, resolveSection, type MusicStyle, type Patch } from "../../src/rules/musicScore";
import { TUNING } from "../../src/rules/tuning";
import { analyse, type Analysis } from "./analyse";

const REPO_STYLE = styleJson as unknown as MusicStyle;
const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x));
let style = clone(REPO_STYLE);
const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;

// ---- the pretend run ----
const run = { time: 0, bootUntil: 30, waves: [] as number[], nextAt: 90, interval: 60, boot: 30, paused: false };
const hooks = { knockedOut: false, siege: 0, party: 0, distance: 0, damage: 0, volume: 0.6 };
let force: { section?: string; wave?: number } = {};
let seed = 1;
let ctx: AudioContext | null = null, music: Music | null = null, playing = false, lastAudio = 0;

// the beat clock, as the game's: each wave's tempo from the style's arc, eased in from its block line
const beatTuning = () => ({ beat: { bpm: style.bpm, tempos: style.arc.map(a => a.bpm ?? style.bpm), blockBars: style.blockBars, rampBars: style.tempoRampBars ?? 8 } });
let clock: BeatClock = newBeatClock(style.bpm, waveTempo(beatTuning(), 0));
const arrived = () => waveArrived(clock, beatTuning(), force.wave ?? run.waves.length, run.time);
const bar = (time: number) => barAt(clock, time);
const cue = (): MusicCue => ({ waves: run.waves.map(bar), nextAt: bar(run.nextAt), bootUntil: bar(run.bootUntil), knockedOut: hooks.knockedOut, siege: hooks.siege, party: hooks.party, forceSection: force.section, forceWave: force.wave });

function restart(): void {
  Object.assign(run, { time: 0, bootUntil: run.boot, waves: [], nextAt: run.boot + run.interval });
  clock = newBeatClock(style.bpm, waveTempo(beatTuning(), 0));
  music?.engine?.reset();
}

function jumpToWave(n: number): void {
  force = {};
  const t = run.time;
  run.bootUntil = Math.min(run.bootUntil, t);
  run.waves = Array.from({ length: n }, (_, i) => t - (n - 1 - i) * run.interval);
  run.nextAt = t + run.interval;
  arrived();
  renderButtons();
}

function nextWave(): void { run.waves = [...run.waves, run.time]; run.nextAt = run.time + run.interval; run.bootUntil = Math.min(run.bootUntil, run.time); arrived(); }

function step(): void {
  requestAnimationFrame(step);
  if (!ctx || !music) return;
  const now = ctx.currentTime, dt = playing ? Math.max(0, Math.min(0.25, now - lastAudio)) : 0;
  lastAudio = now;
  run.time += dt;
  if (run.paused) { run.nextAt += dt; if (run.time < run.bootUntil) run.bootUntil += dt; }
  while (run.time >= run.nextAt && run.time >= run.bootUntil) { run.waves = [...run.waves, run.time]; run.nextAt += run.interval; arrived(); }
  const M = TUNING.music, level = nearness(M, hooks.distance);
  const mix = mixAt(M, level, hooks.damage * level, hooks.distance);
  music.volume = hooks.volume;
  music.update(mix, cue(), run.time, clock, playing);
  $("mix-out").textContent = `heard at ${(mix.volume * 100).toFixed(0)}%, muffled above ${Math.round(mix.cutoff)} Hz, damage ${(mix.distort * 100).toFixed(0)}%`;
  showNow();
}

// ---- what's playing ----
function showNow(): void {
  const cur = music?.engine?.current;
  if (cur) {
    const a = arcStep(style, cur.plan.arc), sec = resolveSection(style, cur.plan.section);
    $("s-wave").textContent = `${cur.plan.wave} · ${a.name}`;
    $("s-section").textContent = cur.plan.section;
    $("s-bar").textContent = `${cur.bar - cur.plan.start + 1} / ${cur.plan.bars}`;
    $("s-feel").textContent = sec.feel ?? "";
    ($("s-progress") as HTMLElement).style.width = `${(100 * (cur.bar - cur.plan.start + 1)) / cur.plan.bars}%`;
  }
  const left = run.nextAt - run.time;
  $("s-next").textContent = run.time < run.bootUntil ? `booting ${Math.ceil(run.bootUntil - run.time)} s` : run.paused ? "paused" : `${Math.ceil(left)} s`;
  const beat = Math.floor(beatAt(clock, run.time)) % 4;
  $("s-tempo").textContent = `${bpmAt(clock, run.time).toFixed(1)} bpm`;
  $("beats").querySelectorAll("i").forEach((el, i) => el.classList.toggle("on", playing && i === beat));
  // the next blocks as planned now
  const B = style.blockBars, first = Math.floor(Math.floor(bar(run.time)) / B) * B, c = cue();
  const chips: string[] = [];
  let last = "";
  for (let b = first; b < first + 16 * B; b += B) {
    const p = b === first && cur ? cur.plan : planBlock(style, c, b);
    const key = `${p.section}|${p.start}|${p.wave}`;
    if (key === last) continue;
    const prev = last.split("|")[2];
    last = key;
    chips.push(`<div class="${b === first ? "cur" : ""}${prev !== undefined && prev !== String(p.wave) ? " wave" : ""}">bar ${Math.max(b, p.start)} · ${p.section}${b === first ? " ◀" : ""}</div>`);
  }
  const html = chips.join("");
  if ($("timeline").innerHTML !== html) $("timeline").innerHTML = html;
}

function renderButtons(): void {
  $("waves").innerHTML = style.arc.map((a, i) => `<button class="btn" data-wave="${i}">${i} ${a.name}</button>`).join("") + `<button class="btn" data-wave="${style.arc.length + 2}">${style.arc.length + 2} (later)</button>`;
  $("sections").innerHTML = `<button class="btn ${force.section ? "" : "on"}" data-section="">Follow the waves</button>` + Object.keys(style.sections).map(s => `<button class="btn ${force.section === s ? "on" : ""}" data-section="${s}" title="${(resolveSection(style, s).feel ?? "").replace(/"/g, "&quot;")}">${s}</button>`).join("");
}

// ---- knobs ----
function knob(parent: HTMLElement, label: string, value: number, min: number, max: number, stepSize: number, set: (v: number) => void, opts: { log?: boolean; unit?: string } = {}): void {
  const id = "k" + Math.random().toString(36).slice(2, 8), el = document.createElement("div");
  el.className = "knob";
  const toSlider = (v: number) => (opts.log ? (1000 * Math.log(Math.max(min, v) / min)) / Math.log(max / min) : v);
  const fromSlider = (s: number) => (opts.log ? min * Math.pow(max / min, s / 1000) : s);
  el.innerHTML = `<label for="${id}">${label}</label><output></output><input type="range" id="${id}" min="${opts.log ? 0 : min}" max="${opts.log ? 1000 : max}" step="${opts.log ? 1 : stepSize}" value="${toSlider(value)}">`;
  const out = el.querySelector("output")!, input = el.querySelector("input")!;
  const show = (v: number) => { out.textContent = (Math.abs(v) >= 100 ? Math.round(v) : +v.toFixed(3)) + (opts.unit ?? ""); };
  show(value);
  input.addEventListener("input", () => { const v = fromSlider(+input.value); show(v); set(opts.log ? Math.round(v) : v); });
  parent.appendChild(el);
}

function select(parent: HTMLElement, label: string, options: [string, string][], value: string, set: (v: string) => void): void {
  const id = "s" + Math.random().toString(36).slice(2, 8), el = document.createElement("div");
  el.className = "knob";
  el.innerHTML = `<label for="${id}">${label}</label><output></output><select id="${id}">${options.map(([v, t]) => `<option value="${v}"${v === value ? " selected" : ""}>${t}</option>`).join("")}</select>`;
  el.querySelector("select")!.addEventListener("change", e => set((e.target as HTMLSelectElement).value));
  parent.appendChild(el);
}

const RANGES: Record<string, [number, number, number, boolean?]> = {
  gain: [0, 1.5, 0.005], cutoff: [40, 18000, 1, true], q: [0.1, 20, 0.1], envAmt: [0, 6000, 10], attack: [0.001, 2, 0.001], decay: [0.01, 3, 0.01],
  sustain: [0, 1, 0.01], release: [0.01, 3, 0.01], detune: [0, 50, 1], drive: [0, 1, 0.01], glide: [0, 0.3, 0.005], pitch: [20, 400, 1], pitchEnd: [20, 200, 1],
  pitchTime: [0.005, 1, 0.005], ratio: [1, 3, 0.01], bursts: [1, 5, 1], reverb: [0, 1, 0.01], delay: [0, 1, 0.01],
};
const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

let applyTimer = 0;
function changed(now = false): void {
  clearTimeout(applyTimer);
  const go = () => { music?.engine?.setStyle(style); showJson(); };
  if (now) go(); else applyTimer = window.setTimeout(go, 60);
}

function buildKnobs(): void {
  const fs = $("f-style"), fm = $("f-mix"), fp = $("f-patches");
  for (const f of [fs, fm, fp]) f.querySelectorAll(":scope > :not(legend)").forEach(n => n.remove());
  knob(fs, "Tempo (first wave; the rest keep their rise)", style.bpm, 70, 180, 1, v => {
    const d = v - style.bpm;
    style.bpm = v;
    for (const a of style.arc) if (a.bpm !== undefined) a.bpm += d;
    // from the next beat, straight to the shifted tempo: the beat carries on
    rampTo(clock, Math.ceil(beatAt(clock, run.time)) + 1, waveTempo(beatTuning(), force.wave ?? run.waves.length), 0);
    changed();
  }, { unit: " bpm" });
  knob(fs, "Tempo ramp (bars)", style.tempoRampBars ?? 8, 0, 32, 4, v => { style.tempoRampBars = v; changed(); });
  knob(fs, "Swing", style.swing, 0, 0.5, 0.01, v => { style.swing = v; changed(); });
  const roots: [string, string][] = [];
  for (let m = 28; m <= 39; m++) roots.push([String(m), NOTE_NAMES[m % 12]]);
  select(fs, "Key (root)", roots, String(style.root), v => { style.root = +v; changed(); });
  select(fs, "Scale", [["", "each wave's own"], ...Object.keys(style.scales).map(s => [s, s] as [string, string])], "", v => {
    style.arc.forEach((a, i) => { a.scale = v || REPO_STYLE.arc[i]?.scale; });
    if (v) style.scale = v; else style.scale = REPO_STYLE.scale;
    changed();
  });
  knob(fs, "Seed (the run's tunes)", seed, 1, 99, 1, v => { seed = v; if (music?.engine) music.engine.seed = v; });
  const m = style.mix;
  knob(fm, "Master", m.master, 0, 1.5, 0.01, v => { m.master = v; changed(); });
  knob(fm, "Reverb", m.reverb, 0, 1, 0.01, v => { m.reverb = v; changed(); });
  knob(fm, "Reverb time", m.reverbTime, 0.2, 6, 0.1, v => { m.reverbTime = v; changed(); }, { unit: " s" });
  knob(fm, "Delay", m.delay, 0, 1, 0.01, v => { m.delay = v; changed(); });
  knob(fm, "Delay (beats)", m.delayBeats, 0.25, 1.5, 0.25, v => { m.delayBeats = v; changed(); });
  knob(fm, "Delay feedback", m.feedback, 0, 0.85, 0.01, v => { m.feedback = v; changed(); });
  knob(fm, "Kick pump (duck)", m.duck, 0, 1, 0.01, v => { m.duck = v; changed(); });
  for (const [name, p] of Object.entries(style.patches)) {
    const d = document.createElement("details");
    d.innerHTML = `<summary>${name} <span class="small">${p.kind}${p.waves ? " · " + p.waves.join(", ") : ""}</span></summary>`;
    const box = document.createElement("div");
    box.style.display = "grid"; box.style.gap = "6px"; box.style.paddingTop = "6px";
    for (const [k, v] of Object.entries(p)) {
      const r = RANGES[k];
      if (!r || typeof v !== "number") continue;
      knob(box, k, v, r[0], Math.max(r[1], v), r[2], nv => { (p as unknown as Record<string, number>)[k] = nv; changed(); }, { log: r[3] });
    }
    if (p.kind === "synth") {
      const waves: OscillatorType[] = ["sine", "triangle", "sawtooth", "square"];
      select(box, "waves", [...waves.map(w => [w, w] as [string, string]), ["sawtooth,sawtooth", "2 saws"], ["sawtooth,sawtooth,sawtooth", "3 saws"], ["square,square", "2 squares"]], (p.waves ?? []).join(","), v => { (p as Patch).waves = v.split(",") as OscillatorType[]; changed(); });
    }
    d.appendChild(box);
    fp.appendChild(d);
  }
}

function showJson(): void {
  const ta = $<HTMLTextAreaElement>("json");
  if (document.activeElement !== ta) ta.value = JSON.stringify(style, null, 2);
  const bpms = style.arc.map(a => a.bpm ?? style.bpm);
  $("style-name").textContent = `${style.name} · ${bpms[0]} to ${bpms[bpms.length - 1]} bpm · ${style.arc.length} waves of music`;
}

// ---- the offline check ----
/** Render every section (and the run through a build into a drop, and the mix with damage far away)
 *  offline, measuring each: the check fails on a script error, silence, NaN or clipping. */
async function musicLabCheck(bars = 2): Promise<{ ok: boolean; errors: string[]; results: { name: string; rms: number; peak: number }[] }> {
  const errors = checkStyle(style), results: { name: string; rms: number; peak: number }[] = [];
  const rate = 22050, spBar = barSeconds(style.bpm), steady = newBeatClock(style.bpm);
  const measure = (name: string, buf: AudioBuffer) => {
    let sum = 0, peak = 0, n = 0;
    for (let ch = 0; ch < buf.numberOfChannels; ch++) for (const v of buf.getChannelData(ch)) { sum += v * v; n++; if (!(Math.abs(v) <= peak)) peak = Math.abs(v); }
    const rms = Math.sqrt(sum / Math.max(1, n));
    results.push({ name, rms, peak });
    if (!(rms > 0.003)) errors.push(`${name}: silent (rms ${rms.toFixed(5)})`);
    if (!Number.isFinite(peak) || Number.isNaN(rms)) errors.push(`${name}: NaN`);
    else if (peak > 1.2) errors.push(`${name}: clips (peak ${peak.toFixed(2)})`);
  };
  const quiet: MusicCue = { waves: [], nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0 };
  for (const name of Object.keys(style.sections)) {
    const oc = new OfflineAudioContext(2, Math.ceil(rate * bars * spBar), rate);
    const e = new MusicEngine(oc, oc.destination, style, 7);
    // the intro and builds start part-way, so their later parts sound too
    const from = name === style.intro || resolveSection(style, name).riser ? 8 * spBar : 0;
    e.renderAhead({ ...quiet, forceSection: name, forceWave: 3 }, from, bars * spBar, steady);
    measure(name, await oc.startRendering());
  }
  {
    // a run: wave 7 due at bar 20, its tempo easing in from there; render bars 8 to 32 (the build,
    // the drop and the ramp), under siege
    const oc = new OfflineAudioContext(2, Math.ceil(rate * 24 * spBar), rate);
    const e = new MusicEngine(oc, oc.destination, style, 7), c = newBeatClock(style.bpm, waveTempo(beatTuning(), 6));
    c.wave = 6;
    waveArrived(c, beatTuning(), 7, 20 * spBar);
    if (!(bpmAt(c, timeAt(c, 4 * 32)) > bpmAt(c, 0))) errors.push("the tempo doesn't rise with a wave");
    e.renderAhead({ waves: [], nextAt: 20, bootUntil: 0, knockedOut: false, siege: 0.5 }, 8 * spBar, 24 * spBar, c);
    measure("run: into wave 7, tempo rising, siege", await oc.startRendering());
  }
  {
    // a woken area that has joined the party, close by: the style's party parts over a quiet section
    const oc = new OfflineAudioContext(2, Math.ceil(rate * bars * spBar), rate);
    const e = new MusicEngine(oc, oc.destination, style, 7);
    e.renderAhead({ ...quiet, forceSection: "whisper", forceWave: 3, party: 1 }, 0, bars * spBar, steady);
    measure("whisper, a party area nearby", await oc.startRendering());
  }
  {
    // the game's mix: far off and damaged (muffled, crunched, wobbling)
    const oc = new OfflineAudioContext(2, Math.ceil(rate * 2 * spBar), rate);
    const m = new Music(oc, 1, style, 7), M = TUNING.music;
    m.update(mixAt(M, nearness(M, 120), 0.8, 120), { ...quiet, forceSection: "drop" }, 0, steady, true);
    m.engine!.renderAhead({ ...quiet, forceSection: "drop" }, 0, 2 * spBar, steady);
    measure("mix: 120 m away, damaged", await oc.startRendering());
  }
  return { ok: errors.length === 0, errors, results };
}
(window as unknown as { musicLabCheck: typeof musicLabCheck }).musicLabCheck = musicLabCheck;

/** Measure every section (or those named): loudness, peak, bands, centroid and a spectrogram, and
 *  each part's own loudness soloed (tools/music-lab/analyse.cjs). */
async function musicLabAnalyse(opts: { sections?: string[]; bars?: number; parts?: boolean; wave?: number } = {}): Promise<Record<string, { all: Analysis; parts: Record<string, number> }>> {
  const rate = 44100, bars = opts.bars ?? 4, spBar = barSeconds(style.bpm), steady = newBeatClock(style.bpm), out: Record<string, { all: Analysis; parts: Record<string, number> }> = {};
  const quiet: MusicCue = { waves: [], nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0 };
  const render = async (name: string, solo: string | null) => {
    const oc = new OfflineAudioContext(2, Math.ceil(rate * bars * spBar), rate);
    const e = new MusicEngine(oc, oc.destination, style, 7);
    if (solo) e.solo = new Set([solo]);
    const from = name === style.intro || resolveSection(style, name).riser ? Math.max(0, (resolveSection(style, name).riser ? 8 : 24) - bars) * spBar : 0;
    e.renderAhead({ ...quiet, forceSection: name, forceWave: opts.wave ?? 3 }, from, bars * spBar, steady);
    return oc.startRendering();
  };
  for (const name of opts.sections ?? Object.keys(style.sections)) {
    const all = analyse(await render(name, null), true), parts: Record<string, number> = {};
    if (opts.parts !== false) for (const p of Object.keys(resolveSection(style, name).parts)) parts[p] = analyse(await render(name, p)).short;
    out[name] = { all, parts };
  }
  return out;
}
(window as unknown as { musicLabAnalyse: typeof musicLabAnalyse }).musicLabAnalyse = musicLabAnalyse;

// ---- wiring ----
async function togglePlay(): Promise<void> {
  if (!ctx) {
    ctx = new AudioContext();
    music = new Music(ctx, hooks.volume, style, seed);
    lastAudio = ctx.currentTime;
  }
  playing = !playing;
  if (playing) { await ctx.resume(); lastAudio = ctx.currentTime; }
  $("play").textContent = playing ? "Stop" : "Play";
}

$("play").addEventListener("click", () => void togglePlay());
$("restart").addEventListener("click", () => { force = {}; restart(); renderButtons(); });
$("next-wave").addEventListener("click", nextWave);
$("pause-waves").addEventListener("click", e => { run.paused = !run.paused; (e.target as HTMLElement).classList.toggle("on", run.paused); });
$("waves").addEventListener("click", e => { const b = (e.target as HTMLElement).closest("button"); if (b) jumpToWave(+b.dataset.wave!); });
$("sections").addEventListener("click", e => { const b = (e.target as HTMLElement).closest("button"); if (!b) return; force = b.dataset.section ? { section: b.dataset.section } : {}; renderButtons(); });
const bindRange = (id: string, set: (v: number) => void, fmt: (v: number) => string) => {
  const el = $<HTMLInputElement>(id), out = $(id + "-out");
  const go = () => { set(+el.value); out.textContent = fmt(+el.value); };
  el.addEventListener("input", go); go();
};
bindRange("dist", v => (hooks.distance = v), v => `${v} m`);
bindRange("damage", v => (hooks.damage = v), v => `${Math.round(v * 100)}%`);
bindRange("siege", v => (hooks.siege = v), v => `${Math.round(v * 100)}%`);
bindRange("party", v => (hooks.party = v), v => `${Math.round(v * 100)}%`);
bindRange("volume", v => (hooks.volume = v), v => `${Math.round(v * 100)}%`);
$<HTMLInputElement>("ko").addEventListener("change", e => (hooks.knockedOut = (e.target as HTMLInputElement).checked));
$<HTMLSelectElement>("interval").addEventListener("change", e => { run.interval = +(e.target as HTMLSelectElement).value; run.nextAt = Math.max(run.bootUntil, run.time) + run.interval; });
$<HTMLSelectElement>("boot").addEventListener("change", e => { run.boot = +(e.target as HTMLSelectElement).value; });
$("check").addEventListener("click", async () => {
  $("check-out").textContent = "rendering…";
  try {
    const r = await musicLabCheck();
    $("check-out").textContent = (r.ok ? "All good.\n" : "Problems:\n" + r.errors.join("\n") + "\n") + r.results.map(x => `${x.name.padEnd(40)} rms ${x.rms.toFixed(3)}  peak ${x.peak.toFixed(2)}`).join("\n");
  } catch (e) { $("check-out").textContent = String(e); }
});
$("apply").addEventListener("click", () => {
  try {
    const next = JSON.parse($<HTMLTextAreaElement>("json").value) as MusicStyle, errs = checkStyle(next);
    if (errs.length) { $("json-msg").textContent = "Not applied: " + errs.slice(0, 4).join("; "); return; }
    style = next; buildKnobs(); renderButtons(); changed(true);
    $("json-msg").textContent = "Applied.";
  } catch (e) { $("json-msg").textContent = "Not applied: " + (e as Error).message; }
});
$("copy").addEventListener("click", () => { void navigator.clipboard?.writeText(JSON.stringify(style, null, 2)).then(() => ($("json-msg").textContent = "Copied: paste it over config/music-style.json.")); });
// downloads don't work inside a hosted page's frame (an artifact): there, Copy is the way out
let framed = true;
try { framed = window.self !== window.top; } catch { /* a cross-origin parent: framed */ }
if (framed) $("download").remove();
else $("download").addEventListener("click", () => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(style, null, 2) + "\n"], { type: "application/json" }));
  a.download = "music-style.json"; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
});
$("reset").addEventListener("click", () => { style = clone(REPO_STYLE); buildKnobs(); renderButtons(); changed(true); $("json-msg").textContent = "Back to the repo's style."; });

restart();
buildKnobs();
renderButtons();
showJson();
requestAnimationFrame(step);
