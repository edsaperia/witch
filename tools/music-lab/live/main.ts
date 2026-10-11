// The live Music Lab (music-lab.html; Ed, 2026-10-11: "Can you make a music lab with sliders that lets me copy and paste my
// choices?"): the game's music engine playing live, a slider (with mute and solo) for every ingredient from the A/B ladder
// and every part of the music, the mode, witch house, the victory section's knobs, and "Copy my settings": only what Ed
// changed, as JSON, to paste back to the builders, who bake it into config/music-style.json. Nothing here changes the game.
import styleJson from "../../../config/music-style.json";
import { MusicEngine } from "../../../src/platform/audio/musicEngine";
import { newBeatClock } from "../../../src/rules/beat";
import type { MusicStyle, NoteEvent, PartUse } from "../../../src/rules/musicScore";
import { Player } from "./player";
import { defaultState, heard, LAYERS, LAYER_NAMES, MODES, parseSettings, settingsJson, VOICES, type Defaults, type LabState, type Layer, type Voice } from "./settings";

const BASE = styleJson as unknown as MusicStyle;
const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x));
const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const STORE = "witch.musicLab.live";

// ---- the music's parts, the victory's layers, the defaults ----
const legend = (p: string) => p.startsWith("lg") && !BASE.form?.instruments.includes(p);
const PARTS = Object.keys(BASE.parts).filter(p => !legend(p));
const ROLES: Record<string, string> = { drum: "Drums", bass: "Bass", chord: "Chords and pads", arp: "Arpeggios", motif: "Melodies and hooks" };
const roleOf = (p: string) => BASE.parts[p]?.role ?? "other";
const rank = (p: string) => { const i = Object.keys(ROLES).indexOf(roleOf(p)); return i < 0 ? 99 : i; };
PARTS.sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
/** The parts' names in words (the style's own name after it). */
const WORDS: Record<string, string> = {
  kick: "Kick", softkick: "Soft kick", hardkick: "Hard kick", boom: "Boom (sub hit)", hat: "Hi-hat", ohat: "Open hi-hat", clap: "Clap",
  snare: "Snare", snap: "Snap", shaker: "Shaker", clank: "Clank (metal)", bass: "Bass", sub: "Sub bass", reese: "Reese bass",
  darkbass: "Dark bass", chipbass: "Chip bass", tension: "Tension drone", pad: "Pad", gatepad: "Gated pad", stab: "Stabs",
  strings: "Strings", choir: "Choir (synth)", arp: "Arp", pluck: "Pluck", lead: "Lead", chiplead: "Chip lead", vox: "Vox",
  bell: "Bell", lgHorn: "Horn",
};
const useLevel = (u: PartUse) => (typeof u === "string" ? 1 : u.level ?? 1);
const VICTORY = BASE.victory ?? "victory";
const victoryDef = BASE.sections[VICTORY];
const DEFAULTS: Defaults = {
  bpm: BASE.bpm, mode: BASE.scale, parts: PARTS,
  victory: { transpose: victoryDef?.transpose ?? 0, layers: Object.fromEntries(Object.entries(victoryDef?.parts ?? {}).map(([k, u]) => [k, useLevel(u as PartUse)])) },
};
const SECTIONS = Object.keys(BASE.sections).sort();
const PICKS = ["build", "drop", "breakdown", VICTORY].filter(s => BASE.sections[s]);

let state: LabState = (() => {
  try { const t = localStorage.getItem(STORE); if (t) return parseSettings(t, DEFAULTS, SECTIONS).state; } catch { /* none, or unreadable */ }
  return defaultState(DEFAULTS);
})();
const save = () => { try { localStorage.setItem(STORE, settingsJson(state, DEFAULTS)); } catch { /* private window */ } };

/** The style the settings make: the tempo, the mode, witch house's dark reverb, the victory's key change and layers. */
function styleFor(s: LabState): MusicStyle {
  const st = clone(BASE);
  st.bpm = s.bpm; st.scale = s.mode;
  st.arc = st.arc.map(a => ({ ...a, bpm: undefined }));
  if (s.witchHouse) st.mix = { ...st.mix, reverb: Math.min(1, st.mix.reverb * 1.8), reverbTime: 6 };
  const v = st.sections[VICTORY];
  if (v) {
    v.transpose = s.victory.transpose;
    for (const [k, u] of Object.entries(v.parts ?? {})) {
      const level = s.victory.layers[k] ?? 1;
      if (typeof u === "string") v.parts![k] = { p: u, level }; else if (u) v.parts![k] = { ...u, level };
    }
  }
  return st;
}

// ---- the audio ----
// (the samples beside the page, as tools/music-lab/live/build.mjs copied them, listed in their manifest)
const SAMPLES = new URL("./samples/", import.meta.url);
let ctx: AudioContext | null = null, player: Player | null = null;
const samples: Record<string, AudioBuffer> = {};
let loading: Promise<void> | null = null;

async function loadSamples(c: AudioContext): Promise<void> {
  const bad: string[] = [];
  let files: string[] = [];
  try { files = ((await (await fetch(new URL("manifest.json", SAMPLES))).json()) as { files: { file: string }[] }).files.map(f => f.file); }
  catch { $("samples").textContent = "The samples couldn't be loaded: only the synthesised layers will sound."; return; }
  await Promise.all(files.map(async file => {
    const id = file.split("/").pop()!.replace(/\.ogg$/, "");
    try { samples[id] = await c.decodeAudioData(await (await fetch(new URL(file, SAMPLES))).arrayBuffer()); } catch { bad.push(id); }
  }));
  $("samples").textContent = bad.length ? `${bad.length} of ${files.length} samples couldn't be read by this browser (${bad.join(", ")}): their layers stay silent.` : `${files.length} samples loaded.`;
}

async function play(): Promise<void> {
  if (!ctx) {
    // (iPhone: play through the silent switch)
    const nav = navigator as Navigator & { audioSession?: { type: string } };
    if (nav.audioSession) try { nav.audioSession.type = "playback"; } catch { /* older Safari */ }
    ctx = new AudioContext({ latencyHint: "playback" });
    player = new Player(() => state, samples, ctx);
    loading = loadSamples(ctx);
  }
  await ctx.resume();
  $("play").textContent = "Loading…";
  await loading;
  restart();
}

function restart(): void {
  if (!player) return;
  const st = styleFor(state);
  player.start(st);
  player.prewarm(sungNotes(st));
  showTransport();
}

function stop(): void { player?.stop(); showTransport(); }

/** The passage's sung notes over the form's 32 bars (a throwaway engine's schedule): for Pink Trombone to sing ahead. */
function sungNotes(st: MusicStyle): { midi: number; steps: number; step: number }[] {
  if (!st.form || !player) return [];
  const oc = new OfflineAudioContext(1, 128, 44100), e = new MusicEngine(oc, oc.destination, st, state.seed), out: { midi: number; steps: number; step: number }[] = [];
  (e as unknown as { play: (ev: NoteEvent) => void }).play = ev => { if (ev.part === st.form!.sung.part && ev.midi !== null) out.push({ midi: ev.midi, steps: Math.max(1, Math.round(ev.dur)), step: ev.step }); };
  const spb = 60 / st.bpm / 4;
  e.renderAhead(player.cue(), 0, 32 * 16 * spb, newBeatClock(st.bpm));
  return out;
}

// the music scheduled on a timer (animation frames stop when the page is hidden or the phone's screen dims), the labels
// on animation frames
setInterval(() => player?.update(), 50);
function frame(): void {
  requestAnimationFrame(frame);
  if (!player) return;
  const n = player.now;
  $("now").textContent = player.playing && n ? `${n.wave} · ${n.section} · bar ${n.bar}` : player.playing ? "starting…" : "stopped";
  $("feel").textContent = player.playing && n ? n.feel : "";
}
requestAnimationFrame(frame);

// ---- the page ----
const pct = (x: number) => `${Math.round(x * 100)}%`;
const el = <K extends keyof HTMLElementTagNameMap>(tag: K, props: Partial<HTMLElementTagNameMap[K]> & { cls?: string } = {}, ...kids: (Node | string)[]) => {
  const e = document.createElement(tag);
  const { cls, ...rest } = props;
  if (cls) e.className = cls;
  Object.assign(e, rest);
  e.append(...kids);
  return e;
};

/** A slider row: its name, level, mute and solo. `get`/`set` its level; `key` its name in mute and solo. */
function row(name: string, key: string, get: () => number, set: (v: number) => void, max: number, dflt: number, extra?: HTMLElement, toggles = true): HTMLElement {
  const val = el("output", { cls: "val" }), range = el("input", { type: "range", min: "0", max: String(max), step: "0.05" });
  const mute = el("button", { cls: "tog m", textContent: "M", title: "Mute" }), solo = el("button", { cls: "tog s", textContent: "S", title: "Solo" });
  const show = () => {
    range.value = String(get()); val.textContent = pct(get());
    mute.classList.toggle("on", state.mute.includes(key)); solo.classList.toggle("on", state.solo.includes(key));
    r.classList.toggle("quiet", heard(state, key, get()) === 0);
  };
  range.oninput = () => { set(Number(range.value)); changed(); show(); };
  const flip = (list: "mute" | "solo") => { state[list] = state[list].includes(key) ? state[list].filter(x => x !== key) : [...state[list], key]; changed(); showAll(); };
  mute.onclick = () => flip("mute"); solo.onclick = () => flip("solo");
  val.ondblclick = () => { set(dflt); changed(); show(); };
  const r = el("div", { cls: "slider" }, el("div", { cls: "name" }, name), range, val, ...(toggles ? [mute, solo] : []));
  if (extra) r.append(extra);
  shows.push(show);
  return r;
}

/** Buttons for one choice of several. */
function choice<T extends string>(opts: readonly T[], label: (o: T) => string, get: () => T, set: (o: T) => void): HTMLElement {
  const box = el("div", { cls: "seg" });
  const btns = opts.map(o => { const b = el("button", { textContent: label(o) }); b.onclick = () => { set(o); changed(); showAll(); }; box.append(b); return b; });
  shows.push(() => btns.forEach((b, i) => b.classList.toggle("on", opts[i] === get())));
  return box;
}

const shows: (() => void)[] = [];
function showAll(): void { for (const f of shows) f(); showSettings(); }

let lastStyleKey = "";
/** After any change: saved, the settings shown, the style rebuilt if what makes it changed. */
function changed(): void {
  save();
  showSettings();
  const key = JSON.stringify([state.mode, state.witchHouse, state.victory]);
  if (key !== lastStyleKey) { lastStyleKey = key; if (player?.playing) player.setStyle(styleFor(state)); }
}

function showSettings(): void { ($("out") as HTMLTextAreaElement).value = settingsJson(state, DEFAULTS); }

function showTransport(): void {
  const b = $("play");
  b.textContent = player?.playing ? "■ Stop" : "▶ Play";
  b.classList.toggle("on", !!player?.playing);
}

function build(): void {
  $("play").onclick = () => (player?.playing ? stop() : void play());
  // the passage
  const wave = $("wave") as HTMLSelectElement;
  BASE.arc.forEach((a, i) => wave.append(el("option", { value: String(i), textContent: `Wave ${i + 1} · ${a.name}` })));
  wave.onchange = () => { state.wave = Number(wave.value); changed(); if (player?.playing) player.setStyle(styleFor(state)); };
  const sec = $("section") as HTMLSelectElement;
  sec.append(el("option", { value: "", textContent: "The wave's own (as the game plays it)" }));
  const picks = el("optgroup", { label: "Passages" }), all = el("optgroup", { label: "Every section" });
  for (const s of PICKS) picks.append(el("option", { value: s, textContent: s[0].toUpperCase() + s.slice(1) }));
  for (const s of SECTIONS) if (!PICKS.includes(s)) all.append(el("option", { value: s, textContent: s }));
  sec.append(picks, all);
  sec.onchange = () => { state.section = sec.value; changed(); if (player?.playing) player.setStyle(styleFor(state)); };
  const seed = $("seed") as HTMLInputElement;
  seed.onchange = () => { state.seed = Math.max(0, Math.round(Number(seed.value) || 0)); changed(); if (player?.playing) restart(); };
  $("dice").onclick = () => { state.seed = Math.floor(Math.random() * 10000); seed.value = String(state.seed); changed(); if (player?.playing) restart(); };
  const bpm = $("bpm") as HTMLInputElement;
  bpm.oninput = () => { $("bpm-val").textContent = bpm.value; };
  bpm.onchange = () => { state.bpm = Number(bpm.value); player?.forgetSung(); changed(); if (player?.playing) restart(); };
  shows.push(() => { wave.value = String(state.wave); sec.value = state.section; seed.value = String(state.seed); bpm.value = String(state.bpm); $("bpm-val").textContent = String(state.bpm); });
  // the mood
  $("mode").append(choice(MODES, m => m, () => state.mode as typeof MODES[number], m => { state.mode = m; }));
  $("witch").append(choice(["off", "on"] as const, o => (o === "on" ? "On" : "Off"), () => (state.witchHouse ? "on" : "off"), o => { state.witchHouse = o === "on"; if (o === "on" && state.mode === BASE.scale) state.mode = "phrygian"; }));
  // the ingredients
  for (const l of LAYERS) {
    const voice = l === "vocalise" ? choice(VOICES, (v: Voice) => ({ synth: "Synth soprano", pinkTrombone: "Pink Trombone (5)", recorded: "Recorded voice (5b)" })[v], () => state.voice, v => { state.voice = v; if (player?.playing) player.prewarm(sungNotes(styleFor(state))); }) : undefined;
    $("layers").append(row(LAYER_NAMES[l], l, () => state.layers[l as Layer], v => { state.layers[l as Layer] = v; }, 1.5, l === "vocalise" ? 1 : 0, voice));
  }
  // the victory
  const vt = $("vt") as HTMLInputElement;
  vt.oninput = () => { state.victory.transpose = Number(vt.value); $("vt-val").textContent = `${state.victory.transpose >= 0 ? "+" : ""}${state.victory.transpose}`; changed(); };
  shows.push(() => { vt.value = String(state.victory.transpose); $("vt-val").textContent = `${state.victory.transpose >= 0 ? "+" : ""}${state.victory.transpose}`; });
  for (const k of Object.keys(DEFAULTS.victory.layers)) $("victory").append(row(k, `victory:${k}`, () => state.victory.layers[k], v => { state.victory.layers[k] = v; }, 1.5, DEFAULTS.victory.layers[k], undefined, false));
  $("play-victory").onclick = () => { state.section = VICTORY; changed(); if (player?.playing) player.setStyle(styleFor(state)); else void play(); showAll(); };
  // the parts
  let role = "";
  for (const p of PARTS) {
    if (roleOf(p) !== role) { role = roleOf(p); $("parts").append(el("h3", { textContent: ROLES[role] ?? "Other" })); }
    $("parts").append(row(WORDS[p] ? `${WORDS[p]} · ${p}` : p, p, () => state.parts[p] ?? 1, v => { state.parts[p] = v; }, 2, 1));
  }
  // the settings
  $("copy").onclick = async () => {
    const text = settingsJson(state, DEFAULTS), out = $("out") as HTMLTextAreaElement;
    try { await navigator.clipboard.writeText(text); $("copied").textContent = "Copied. Paste it in a message."; }
    catch { out.focus(); out.select(); $("copied").textContent = "Couldn't reach the clipboard: it's selected below, copy it from there."; }
  };
  $("load").onclick = () => {
    try {
      const { state: s, ignored } = parseSettings(($("paste") as HTMLTextAreaElement).value, DEFAULTS, SECTIONS);
      state = s; changed(); showAll(); if (player?.playing) restart();
      $("loaded").textContent = `Loaded.${ignored.length ? ` Ignored: ${ignored.join(", ")}.` : ""}`;
    } catch (e) { $("loaded").textContent = `That isn't settings JSON (${(e as Error).message}).`; }
  };
  $("reset").onclick = () => { if (!confirm("Put every slider back as the game has it?")) return; state = defaultState(DEFAULTS); changed(); showAll(); if (player?.playing) restart(); };
  $("unsolo").onclick = () => { state.solo = []; state.mute = []; changed(); showAll(); };
  showAll();
  lastStyleKey = JSON.stringify([state.mode, state.witchHouse, state.victory]);
}

build();
Object.assign(window as unknown as Record<string, unknown>, { musicLabLive: { get state() { return state; }, get player() { return player; }, play, stop } });
