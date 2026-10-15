// The live Music Lab (music-lab.html; Ed, 2026-10-11: "Can you make a music lab with sliders that lets me copy and paste my
// choices?"): the game's music engine playing live, a slider (with mute and solo) for every ingredient from the A/B ladder
// and every part of the music, the mode, witch house, the victory section's knobs, and "Copy my settings": only what Ed
// changed, as JSON, to paste back to the builders, who bake it into config/music-style.json. Nothing here changes the game.
import styleJson from "../../../config/music-style.json";
import { MusicEngine } from "../../../src/platform/audio/musicEngine";
import { newBeatClock } from "../../../src/rules/beat";
import type { MusicStyle, NoteEvent, PartUse } from "../../../src/rules/musicScore";
import { Player } from "./player";
import { nightStyle, planNight, type NightSet } from "../../../src/rules/musicSet";
import { chainFx, CHAINS, defaultState, ETHEREAL, FX, FX_NAMES, heard, labParts, LAYERS, LAYER_NAMES, MODES, parseSettings, ROLES, settingsJson, SUNG_PATCH, VOICES, WORDS, type Chain, type Defaults, type Fx, type LabState, type Layer, type Voice } from "./settings";
import { fofReady } from "../../../src/platform/audio/fof/fof";
import { tractReady } from "../../../src/platform/audio/tract/tract";

const BASE = styleJson as unknown as MusicStyle;
const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x));
const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const STORE = "witch.musicLab.live";

// ---- the music's parts, the victory's layers, the defaults ----
const PARTS = labParts(BASE);
const roleOf = (p: string) => BASE.parts[p]?.role ?? "other";
const useLevel = (u: PartUse) => (typeof u === "string" ? 1 : u.level ?? 1);
const VICTORY = BASE.victory ?? "victory";
const victoryDef = BASE.sections[VICTORY];
/** A chain's levels from the style (its `_` note and the dark one's families left out). */
const fxOf = (c: object | undefined): Partial<Record<Fx, number>> => Object.fromEntries(Object.entries(c ?? {}).filter(([k, v]) => (FX as readonly string[]).includes(k) && typeof v === "number"));
const DEFAULTS: Defaults = {
  bpm: BASE.bpm, mode: BASE.scale, parts: PARTS,
  victory: { transpose: victoryDef?.transpose ?? 0, layers: Object.fromEntries(Object.entries(victoryDef?.parts ?? {}).map(([k, u]) => [k, useLevel(u as PartUse)])) },
  voiceFx: { pure: fxOf(BASE.voiceFx), dark: { ...fxOf(BASE.voiceFx), ...fxOf(BASE.voiceFxDark) } },
};
/** A voice's own breath (its patch's), the breath slider's rest. */
const ownBreath = (v: Voice): number => BASE.patches[SUNG_PATCH[v] ?? BASE.form?.sung.patch ?? ""]?.breath ?? 0;
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
  // the voice: the FOF singer for the melody (Ed, 2026-10-11), the alto's A/B (sampled or vocal tract: Ed, 2026-10-14), its
  // breath, the FOF choir on the choir part's chords, and the voice effects: the chain in force under the sliders
  const sp = SUNG_PATCH[s.voice];
  if (sp && st.form && st.patches[sp]) st.form = { ...st.form, sung: { ...st.form.sung, patch: sp } };
  const sungPatch = st.form?.sung.patch;
  if (s.breath !== null && sungPatch && st.patches[sungPatch]) st.patches = { ...st.patches, [sungPatch]: { ...st.patches[sungPatch], breath: s.breath } };
  if (s.fofChoir && st.parts.choir && st.patches.fofChoir) st.parts = { ...st.parts, choir: { ...st.parts.choir, patch: "fofChoir" } };
  if (s.arpeggio && st.form) st.form = { ...st.form, sung: { ...st.form.sung, arpeggio: true } }; // (the voice test: constant arpeggios, every section)
  st.voiceFx = { ...st.voiceFx, ...s.voiceFx };
  if (s.chain !== "auto") delete st.voiceFxDark; // (pure: the one chain; dark: its values are the sliders' rest, chainFx)
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
  await fofReady(ctx); // (the FOF voice's worklet: with none, the formant voice sings its notes)
  await tractReady(ctx); // (the vocal-tract voice's: likewise)
  restart();
}


/** The set view's night in miniature: this many bars a wave, at the tempo slider's bpm (the gameplay sets the game's). */
const NIGHT_BARS = 8;
/** Whether the night's playing (the set view's button), not the passage. */
let nightPlaying = false;
/** The night the set view shows (rules/musicSet.ts), from the settings' seed. */
const nightOf = (): NightSet | null => state.night ? planNight(BASE, { seed: state.seed, island: state.night.island, waves: state.night.waves }) : null;

function restart(): void {
  if (!player) return;
  // (in miniature each wave lands on its own section, its build cut to a block: the game's 8-bar builds would fill its 8 bars)
  const n = nightPlaying ? nightOf() : null, night = n ? nightStyle(styleFor(state), n) : null;
  const st = night ? { ...night, arc: night.arc.map(a => ({ ...a, buildBars: BASE.blockBars })) } : styleFor(state);
  player.start(st, n ? { bars: NIGHT_BARS, waves: n.waves } : null);
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
  const on = nightPlaying && player.playing && n ? n.arc : -1;
  if (on !== shownWave) { shownWave = on; showNight(); }
}
let shownWave = -1;

// ---- the set view: the night's waves, its energy curve, each wave's genre, key, lead, bass and voice ----
const NOTE = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];
const ROLE_COLOUR: Record<string, string> = { warm: "#4fe0ff", build: "#9b93ab", peak: "#ff5fc8", breakdown: "#7d8aff", climax: "#ffd35f" };
function showNight(): void {
  const n = nightOf(), box = $("steps"), svg = $("curve");
  box.textContent = ""; svg.innerHTML = "";
  $("play-night").toggleAttribute("disabled", !n);
  if (!n) return;
  const W = 320, H = 120, x = (u: number) => 8 + u * (W - 16), y = (e: number) => H - 10 - e * (H - 24);
  const pts = n.steps.map(s => `${x(s.at).toFixed(1)},${y(s.energy).toFixed(1)}`).join(" ");
  svg.innerHTML = `<line x1="8" y1="${y(0)}" x2="${W - 8}" y2="${y(0)}" stroke="#2b2636"/><polyline points="${pts}" fill="none" stroke="#e6e1ee" stroke-width="1.5" stroke-linejoin="round"/>`
    + n.steps.map(s => `<circle cx="${x(s.at).toFixed(1)}" cy="${y(s.energy).toFixed(1)}" r="${s.wave === shownWave ? 5 : 3}" fill="${ROLE_COLOUR[s.role]}"><title>wave ${s.wave}: ${s.role}, ${s.family}</title></circle>`).join("");
  $("night-note").textContent = `${n.curated ? "The hand-picked first home night." : `Planned from seed ${n.seed}.`} ${n.waves} waves, ${n.cycles} cycle${n.cycles > 1 ? "s" : ""}; ${NIGHT_BARS} bars a wave in miniature.`;
  for (const st of n.steps) {
    const f = BASE.families![st.family], key = `${NOTE[(((BASE.root + st.transpose) % 12) + 12) % 12]} ${st.scale}`;
    const row = el("div", { cls: `step${st.wave === shownWave ? " now" : ""}` },
      el("b", { textContent: st.wave ? `w${st.wave}` : "start" }),
      el("span", { cls: "role", textContent: st.role }),
      el("span", { textContent: `${f?.name ?? st.family} · ${key} · ${st.lead} / ${st.bass} / ${st.vocal}` }));
    (row.firstChild as HTMLElement).style.color = ROLE_COLOUR[st.role];
    box.append(row);
  }
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
function row(name: string, key: string, get: () => number, set: (v: number) => void, max: number, dflt: number | (() => number), extra?: HTMLElement, toggles = true): HTMLElement {
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
  val.ondblclick = () => { set(typeof dflt === "function" ? dflt() : dflt); changed(); show(); };
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
  const key = JSON.stringify([state.mode, state.witchHouse, state.victory, state.voice, state.fofChoir, state.breath, state.chain, state.arpeggio, FX.map(f => state.voiceFx[f] > 0)]); // (a voice effect's level is set live; one turned on or off rebuilds the voice's chain)
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
  // (a new seed or tempo while the night plays: the night again from the top)
  // the passage
  const wave = $("wave") as HTMLSelectElement;
  BASE.arc.forEach((a, i) => wave.append(el("option", { value: String(i), textContent: `Wave ${i + 1} · ${a.name}` })));
  wave.onchange = () => { nightPlaying = false; state.wave = Number(wave.value); changed(); if (player?.playing) player.setStyle(styleFor(state)); };
  const sec = $("section") as HTMLSelectElement;
  sec.append(el("option", { value: "", textContent: "The wave's own (as the game plays it)" }));
  const picks = el("optgroup", { label: "Passages" }), all = el("optgroup", { label: "Every section" });
  for (const s of PICKS) picks.append(el("option", { value: s, textContent: s[0].toUpperCase() + s.slice(1) }));
  for (const s of SECTIONS) if (!PICKS.includes(s)) all.append(el("option", { value: s, textContent: s }));
  sec.append(picks, all);
  sec.onchange = () => { nightPlaying = false; state.section = sec.value; changed(); if (player?.playing) player.setStyle(styleFor(state)); };
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
    const voice = l === "vocalise" ? choice(VOICES, (v: Voice) => ({ synth: "The game's singer", sampled: "Alto, sampled", tract: "Alto, vocal tract", fof: "FOF voice", pinkTrombone: "Pink Trombone (5)", recorded: "Recorded voice (5b)" })[v], () => state.voice, v => { state.voice = v; if (player?.playing) player.prewarm(sungNotes(styleFor(state))); }) : undefined;
    $("layers").append(row(LAYER_NAMES[l], l, () => state.layers[l as Layer], v => { state.layers[l as Layer] = v; }, 1.5, l === "vocalise" ? 1 : 0, voice));
  }
  // the voice test (Ed, 2026-10-14: "the voice and its effects singing constant arpeggios"), the singer's breath (its voice's
  // own until moved; double-click the value for its own again) and the chain it goes through
  $("fx").append(el("label", { cls: "f", textContent: "Sings" }), choice(["form", "arpeggio"] as const, o => (o === "arpeggio" ? "Constant arpeggios (every section)" : "The form's melodies (breakdowns, builds)"), () => (state.arpeggio ? "arpeggio" : "form"), o => { state.arpeggio = o === "arpeggio"; }));
  $("fx").append(row("Breath", "breath", () => state.breath ?? ownBreath(state.voice), v => { state.breath = Number.isNaN(v) ? null : v; }, 1, NaN, undefined, false));
  $("fx").append(el("label", { cls: "f", textContent: "Chain (the sliders start at its own values)" }), choice(CHAINS, (c: Chain) => ({ auto: "As the game plays it", pure: "Pure (breakdowns, builds)", dark: "Dark (the dark families)" })[c], () => state.chain, c => { state.chain = c; state.voiceFx = chainFx(DEFAULTS, c); }));
  $("fx").append(el("label", { cls: "f", textContent: "Choir chords" }), choice(["synth", "fof"] as const, o => (o === "fof" ? "FOF choir" : "Synth choir"), () => (state.fofChoir ? "fof" : "synth"), o => { state.fofChoir = o === "fof"; }));
  for (const f of FX) $("fx").append(row(FX_NAMES[f], `fx:${f}`, () => state.voiceFx[f as Fx], v => { state.voiceFx[f as Fx] = v; }, 1, () => chainFx(DEFAULTS, state.chain)[f as Fx], undefined, false));
  $("fx-game").onclick = () => { state.voiceFx = chainFx(DEFAULTS, state.chain); changed(); showAll(); };
  $("fx-ethereal").onclick = () => { Object.assign(state.voiceFx, ETHEREAL); changed(); showAll(); };
  $("fx-off").onclick = () => { for (const f of FX) state.voiceFx[f] = 0; changed(); showAll(); };
  // the victory
  const vt = $("vt") as HTMLInputElement;
  vt.oninput = () => { state.victory.transpose = Number(vt.value); $("vt-val").textContent = `${state.victory.transpose >= 0 ? "+" : ""}${state.victory.transpose}`; changed(); };
  shows.push(() => { vt.value = String(state.victory.transpose); $("vt-val").textContent = `${state.victory.transpose >= 0 ? "+" : ""}${state.victory.transpose}`; });
  for (const k of Object.keys(DEFAULTS.victory.layers)) $("victory").append(row(k, `victory:${k}`, () => state.victory.layers[k], v => { state.victory.layers[k] = v; }, 1.5, DEFAULTS.victory.layers[k], undefined, false));
  // the set view
  const night = $("night") as HTMLSelectElement;
  for (const [v, t] of [["", "None"], ["home:10", "Home, 10 waves (the first night, hand-picked)"], ["island:10", "An island, 10 waves"], ["island:20", "An island, 20 waves"], ["island:30", "An island, 30 waves"], ["island:40", "An island, 40 waves"], ["island:50", "An island, 50 waves"], ["home:64", "Home grown, 64 waves"]]) night.append(el("option", { value: v, textContent: t }));
  night.onchange = () => { const [island, waves] = night.value.split(":"); state.night = night.value ? { island, waves: +waves } : null; changed(); showNight(); if (nightPlaying && player?.playing) restart(); };
  shows.push(() => { night.value = state.night ? `${state.night.island}:${state.night.waves}` : ""; showNight(); });
  $("play-night").onclick = () => { nightPlaying = true; if (player?.playing) restart(); else void play(); };
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
  lastStyleKey = JSON.stringify([state.mode, state.witchHouse, state.victory, state.voice, state.fofChoir, state.breath, state.chain, state.arpeggio, FX.map(f => state.voiceFx[f] > 0)]);
}

build();
Object.assign(window as unknown as Record<string, unknown>, { musicLabLive: { get state() { return state; }, get player() { return player; }, play, stop } });
