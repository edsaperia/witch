// The Music Studio (music-studio.html; Ed, 2026-10-22: "we will give them a patch designer, plus something where they can
// upload a midi and hear their patches played together"): the game's own music engine (src/platform/audio/musicEngine.ts)
// playing patches outside the score. A patch designer with every knob of the engine's synth, drum and bell patches
// (knobs.ts), a keyboard to play them, a phrase looping on the patch being edited, a MIDI player (midi.ts) giving each track
// of a file from Logic a patch, and "Copy for the builders": the new and changed patches, and the song's choices, as JSON
// to bake into config/music-style.json. Nothing here changes the game; the work is kept in this browser.
import styleJson from "../../config/music-style.json";
import { MusicEngine } from "../../src/platform/audio/musicEngine";
import type { MusicStyle, Patch } from "../../src/rules/musicScore";
import { CHANNEL_KEYS, EDITABLE, GM_DRUMS, GROUPS, INIT, type EditKind, type Knob } from "./knobs";
import { parseMidi, type MidiSong } from "./midi";

const BASE = styleJson as unknown as MusicStyle;
const STORE = "witch.musicStudio";
const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x));
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const isEditable = (p: Patch | undefined): p is Patch => !!p && (EDITABLE as readonly string[]).includes(p.kind);
/** Patches a track can play (risers and impacts need a build's progress). */
const playable = (p: Patch | undefined) => !!p && p.kind !== "riser" && p.kind !== "impact";
const KIT = "@kit";

// ---- the patches: the game's, with this browser's edits and new ones over them ----
interface Saved { patches: Record<string, Patch>; song?: { name: string; data: string; picks: Record<number, Pick> }; bpm?: number }
type Pick = { patch: string; level: number; mute: boolean; solo: boolean };
let saved: Saved = (() => { try { return JSON.parse(localStorage.getItem(STORE) ?? "") as Saved; } catch { return { patches: {} }; } })();
saved.patches ??= {};
const patches: Record<string, Patch> = { ...clone(BASE.patches), ...clone(saved.patches) };
const save = () => {
  const changed: Record<string, Patch> = {};
  for (const [k, p] of Object.entries(patches)) if (!same(p, BASE.patches[k])) changed[k] = p;
  saved.patches = changed;
  try { localStorage.setItem(STORE, JSON.stringify(saved)); } catch { /* full, or a private window */ }
};
let current = Object.keys(saved.patches)[0] ?? "pad";

// ---- sound: the engine on a context made at the first press ----
let ctx: AudioContext | null = null, engine: MusicEngine | null = null, meter: AnalyserNode | null = null;
const parts = new Set<string>();
function audio(): { ctx: AudioContext; engine: MusicEngine } {
  if (!ctx) {
    ctx = new AudioContext({ latencyHint: "interactive" });
    const master = ctx.createGain(); master.gain.value = 1; master.connect(ctx.destination);
    meter = ctx.createAnalyser(); meter.fftSize = 2048; master.connect(meter);
    engine = new MusicEngine(ctx, master, { ...BASE, patches }, 0);
    engine.tempo(bpm());
  }
  if (ctx.state === "suspended") void ctx.resume();
  return { ctx, engine: engine! };
}
/** The patches changed: the engine reads its notes' knobs fresh, but a channel's (its high-pass, pan, sends, wobble) are kept
 *  on the part, so those parts are remade. */
function patchesChanged(name: string, channel: boolean): void {
  if (!engine) return;
  engine.style = { ...engine.style, patches };
  if (channel) for (const p of parts) if (p.endsWith(`|${name}`)) { engine.resetPart(p); parts.delete(p); }
}
const partOf = (who: string, patch: string) => { const p = `${who}|${patch}`; parts.add(p); return p; };

// ---- the patch list ----
const list = $<HTMLSelectElement>("patch-list");
function renderList(): void {
  list.innerHTML = "";
  const byKind = new Map<string, string[]>();
  for (const [k, p] of Object.entries(patches)) { const g = isEditable(p) ? p.kind : "other (play only)"; (byKind.get(g) ?? byKind.set(g, []).get(g)!).push(k); }
  for (const kind of [...EDITABLE, "other (play only)"]) {
    const names = byKind.get(kind);
    if (!names) continue;
    const og = document.createElement("optgroup"); og.label = kind;
    for (const n of names.sort((a, b) => a.localeCompare(b))) {
      const o = document.createElement("option"); o.value = n;
      o.textContent = n + (!BASE.patches[n] ? "  (new)" : !same(patches[n], BASE.patches[n]) ? "  (changed)" : "");
      og.append(o);
    }
    list.append(og);
  }
  list.value = current;
  $("revert").textContent = BASE.patches[current] ? "Revert" : "Delete";
  ($("revert") as HTMLButtonElement).disabled = !!BASE.patches[current] && same(patches[current], BASE.patches[current]);
  $("patch-note").textContent = BASE.patches[current] ? `"${current}" is the game's. Your edits stay in this browser until a builder bakes them in.` : `"${current}" is yours, new.`;
}
list.onchange = () => { current = list.value; renderList(); renderEditor(); };
const ask = (q: string, def: string) => { const n = prompt(q, def)?.trim(); return n && /^[\w-]+$/.test(n) ? n : n ? (alert("Letters, digits, - and _ only"), null) : null; };
const fresh = (base: string) => { let n = base, i = 2; while (patches[n]) n = `${base}${i++}`; return n; };
$("new").onclick = () => { const kind = $<HTMLSelectElement>("new-kind").value as EditKind, n = ask("Name the new patch", fresh(`my${kind[0].toUpperCase()}${kind.slice(1)}`)); if (!n) return; if (patches[n]) return alert("That name is taken"); patches[n] = clone(INIT[kind]); current = n; save(); refresh(); };
$("dup").onclick = () => { const n = ask("Name the copy", fresh(current)); if (!n) return; if (patches[n]) return alert("That name is taken"); patches[n] = clone(patches[current]); current = n; save(); refresh(); };
$("rename").onclick = () => {
  if (BASE.patches[current]) return alert("The game's patches keep their names: duplicate it to make your own.");
  const n = ask("New name", current); if (!n || n === current) return; if (patches[n]) return alert("That name is taken");
  patches[n] = patches[current]; delete patches[current];
  for (const pk of Object.values(picks)) if (pk.patch === current) pk.patch = n;
  current = n; save(); refresh();
};
$("revert").onclick = () => {
  if (BASE.patches[current]) { patches[current] = clone(BASE.patches[current]); }
  else { if (!confirm(`Delete "${current}"?`)) return; delete patches[current]; current = "pad"; }
  patchesChanged(current, true); save(); refresh();
};

// ---- the editor ----
const editor = $("editor");
/** A range knob's slider position (0-1000) from its value and back: log between positive ends, a cube from 0 for times. */
const toPos = (k: Extract<Knob, { kind: "range" }>, v: number) => {
  const x = k.log ? (k.min > 0 ? Math.log(v / k.min) / Math.log(k.max / k.min) : Math.cbrt(Math.max(0, (v - k.min) / (k.max - k.min)))) : (v - k.min) / (k.max - k.min);
  return Math.round(Math.max(0, Math.min(1, x)) * 1000);
};
const fromPos = (k: Extract<Knob, { kind: "range" }>, pos: number) => {
  const x = pos / 1000, v = k.log ? (k.min > 0 ? k.min * Math.pow(k.max / k.min, x) : k.min + (k.max - k.min) * x * x * x) : k.min + (k.max - k.min) * x;
  const step = k.step ?? 0.01;
  return Math.round(v / step) * step;
};
const tidy = (v: number) => Number(v.toPrecision(6));
function setKnob(key: string, value: unknown): void {
  const p = { ...patches[current] } as Record<string, unknown>;
  if (value === undefined) delete p[key]; else p[key] = value;
  patches[current] = p as unknown as Patch;
  patchesChanged(current, CHANNEL_KEYS.has(key));
  save(); renderList();
}
function renderEditor(): void {
  const p = patches[current];
  editor.innerHTML = "";
  const h = document.createElement("h2"); h.textContent = `${current} · ${p?.kind ?? "?"}`; editor.append(h);
  if (!isEditable(p)) {
    const n = document.createElement("p"); n.className = "note";
    n.textContent = `A ${(p as Patch | undefined)?.kind} patch (a voice, a sample or a build's riser) has no knobs here yet; tracks can still play it. Its settings:`;
    const pre = document.createElement("pre"); pre.className = "mono"; pre.style.whiteSpace = "pre-wrap"; pre.textContent = JSON.stringify(p, null, 1);
    editor.append(n, pre); return;
  }
  for (const g of GROUPS[p.kind as EditKind]) {
    const t = document.createElement("h3"); t.textContent = g.title; editor.append(t);
    if (g.note) { const n = document.createElement("p"); n.className = "note"; n.textContent = g.note; editor.append(n); }
    for (const k of g.knobs) editor.append(knobRow(p, k));
  }
}
function knobRow(p: Patch, k: Knob): HTMLElement {
  const row = document.createElement("div"), raw = (p as unknown as Record<string, unknown>)[k.key];
  row.className = "knob" + (raw === undefined ? " unset" : "");
  const name = document.createElement("div"); name.className = "name"; name.textContent = k.label;
  if (k.note || (k.kind === "range" && k.unit)) { const s = document.createElement("small"); s.textContent = [k.kind === "range" ? k.unit : "", k.note].filter(Boolean).join(" · "); name.append(s); }
  const reset = document.createElement("button"); reset.className = "reset"; reset.textContent = "↺"; reset.title = "Back to the engine's default (leave it out)";
  reset.onclick = () => { setKnob(k.key, undefined); renderEditor(); };
  row.append(name);
  if (k.kind === "range") {
    const v = typeof raw === "number" ? raw : k.def, range = document.createElement("input"), num = document.createElement("input");
    range.type = "range"; range.min = "0"; range.max = "1000"; range.value = String(toPos(k, v));
    num.type = "number"; num.step = String(k.step ?? 0.01); num.value = String(tidy(v));
    range.oninput = () => { const x = tidy(fromPos(k, +range.value)); num.value = String(x); row.classList.remove("unset"); setKnob(k.key, x); };
    num.onchange = () => { const x = Number(num.value); if (!Number.isFinite(x)) return; range.value = String(toPos(k, x)); row.classList.remove("unset"); setKnob(k.key, x); };
    row.append(range, num);
  } else if (k.kind === "choice") {
    const s = document.createElement("select"); s.className = "wide";
    for (const o of k.options) { const e = document.createElement("option"); e.value = o; e.textContent = o; s.append(e); }
    s.value = typeof raw === "string" ? raw : k.def;
    s.onchange = () => { setKnob(k.key, s.value === "none" ? undefined : s.value); renderEditor(); };
    row.append(s);
  } else if (k.kind === "toggle") {
    const c = document.createElement("input"); c.type = "checkbox"; c.checked = typeof raw === "boolean" ? raw : k.def;
    const w = document.createElement("label"); w.className = "wide"; w.append(c);
    c.onchange = () => { setKnob(k.key, c.checked); renderEditor(); };
    row.append(w);
  } else {
    // a list: waves by name, the rest numbers, comma-separated
    const i = document.createElement("input"); i.type = "text"; i.className = "wide";
    i.value = Array.isArray(raw) ? raw.join(", ") : k.def;
    i.onchange = () => {
      const items = i.value.split(/[\s,]+/).filter(Boolean);
      if (!items.length) { setKnob(k.key, undefined); return renderEditor(); }
      if (k.key === "waves") {
        const bad = items.find(w => !["sine", "triangle", "sawtooth", "square", "custom"].includes(w));
        if (bad) return alert(`"${bad}" isn't a wave: sine, triangle, sawtooth, square or custom`);
        setKnob(k.key, items);
      } else {
        const nums = items.map(Number);
        if (nums.some(x => !Number.isFinite(x))) return alert("Numbers only, comma-separated");
        setKnob(k.key, nums);
      }
      renderEditor();
    };
    row.append(i);
  }
  row.append(reset);
  return row;
}

// ---- the keyboard ----
let octave = 4;
const KEYS = "awsedftgyhujkolp;'";
const keysEl = $("keys"), held = new Map<string, (at: number) => void>();
function renderKeys(): void {
  keysEl.innerHTML = ""; $("oct").textContent = `C${octave - 1}`;
  const white = [0, 2, 4, 5, 7, 9, 11], whites = 15, w = 100 / whites;
  for (let i = 0, wi = 0; i < 25; i++) {
    const semi = i % 12, isWhite = white.includes(semi), midi = octave * 12 + i;
    const d = document.createElement("div"); d.className = isWhite ? "w" : "b"; d.dataset.midi = String(midi);
    d.style.left = `${isWhite ? wi * w : wi * w - w * 0.3}%`; d.style.width = `${isWhite ? w : w * 0.6}%`;
    if (isWhite) { const s = document.createElement("span"); s.textContent = semi === 0 ? `C${octave + Math.floor(i / 12) - 1}` : (KEYS[i] ?? "").toUpperCase(); d.append(s); wi++; }
    keysEl.append(d);
  }
}
function down(id: string, midi: number): void {
  if (held.has(id)) return;
  const { ctx, engine } = audio(), p = patches[current];
  if (!playable(p)) return;
  held.set(id, engine.hold(partOf("keys", current), current, midi, +$<HTMLInputElement>("vel").value, ctx.currentTime + 0.005));
  keysEl.querySelector(`[data-midi="${midi}"]`)?.classList.add("down");
}
function up(id: string, midi: number): void {
  const r = held.get(id); if (!r) return;
  held.delete(id); r(ctx!.currentTime);
  keysEl.querySelector(`[data-midi="${midi}"]`)?.classList.remove("down");
}
keysEl.onpointerdown = e => { const t = (e.target as HTMLElement).closest("[data-midi]") as HTMLElement | null; if (!t) return; keysEl.setPointerCapture(e.pointerId); const m = +t.dataset.midi!; down(`p${e.pointerId}`, m); keysEl.dataset[`p${e.pointerId}`] = String(m); };
const pointerUp = (e: PointerEvent) => { const m = keysEl.dataset[`p${e.pointerId}`]; if (m) { up(`p${e.pointerId}`, +m); delete keysEl.dataset[`p${e.pointerId}`]; } };
keysEl.onpointerup = pointerUp; keysEl.onpointercancel = pointerUp;
const typing = () => { const a = document.activeElement; return a instanceof HTMLInputElement && a.type !== "range" && a.type !== "checkbox" || a instanceof HTMLTextAreaElement; };
addEventListener("keydown", e => {
  if (typing() || e.metaKey || e.ctrlKey || e.repeat) return;
  const k = e.key.toLowerCase();
  if (k === "z") { octave = Math.max(1, octave - 1); renderKeys(); return; }
  if (k === "x") { octave = Math.min(8, octave + 1); renderKeys(); return; }
  if (k === " " && song) { e.preventDefault(); toggleSong(); return; }
  const i = KEYS.indexOf(k); if (i < 0) return;
  e.preventDefault(); down(`k${k}`, octave * 12 + i);
});
addEventListener("keyup", e => { const k = e.key.toLowerCase(), i = KEYS.indexOf(k); if (i >= 0) up(`k${k}`, octave * 12 + i); });
$("oct-down").onclick = () => { octave = Math.max(1, octave - 1); renderKeys(); };
$("oct-up").onclick = () => { octave = Math.min(8, octave + 1); renderKeys(); };

// ---- the phrase loop: a bar on the patch being edited, in beats (start, length, notes from the octave's C) ----
const PHRASES: Record<string, { name: string; notes: [number, number, number[]][] }> = {
  off: { name: "Off", notes: [] },
  note: { name: "One long note", notes: [[0, 3.5, [9]]] },
  stabs: { name: "Chord stabs", notes: [[0, 0.4, [9, 12, 16]], [1.5, 0.4, [9, 12, 16]], [2.5, 0.4, [7, 12, 14]], [3.5, 0.3, [7, 12, 14]]] },
  pad: { name: "Pad chords (2 bars)", notes: [[0, 3.8, [9, 12, 16]], [4, 3.8, [5, 9, 12]]] },
  bass: { name: "Bass line", notes: [[0, 0.4, [-3]], [0.75, 0.2, [-3]], [1.5, 0.4, [9]], [2, 0.4, [-3]], [3, 0.3, [0]], [3.5, 0.4, [2]]] },
  arp: { name: "Arpeggio", notes: Array.from({ length: 16 }, (_, i) => [i / 4, 0.22, [[9, 12, 16, 21, 16, 12][i % 6]]] as [number, number, number[]]) },
  melody: { name: "Melody", notes: [[0, 1, [21]], [1, 0.5, [19]], [1.5, 0.5, [16]], [2, 1.5, [14]], [3.5, 0.5, [12]]] },
  hit: { name: "A hit a beat", notes: [[0, 0.2, [9]], [1, 0.2, [9]], [2, 0.2, [9]], [3, 0.2, [9]]] },
};
const phraseEl = $<HTMLSelectElement>("phrase");
for (const [k, v] of Object.entries(PHRASES)) { const o = document.createElement("option"); o.value = k; o.textContent = v.name; phraseEl.append(o); }
let phraseAt = 0, phraseNext = 0;
phraseEl.onchange = () => { const { ctx } = audio(); phraseAt = ctx.currentTime + 0.1; phraseNext = 0; };

// ---- the MIDI player ----
let song: MidiSong | null = null, songName = "", picks: Record<number, Pick> = {};
let playing = false, startAt = 0, cursor = 0;
const bpmIn = $<HTMLInputElement>("bpm");
const bpm = () => Math.max(40, Math.min(240, Number(bpmIn.value) || song?.bpm || 120));
bpmIn.value = String(saved.bpm ?? 120);
/** Song seconds a real second (the tempo against the file's). */
const rate = () => bpm() / (song?.bpm ?? 120);
const barSec = () => song ? (60 / song.bpm) * song.meter[0] * (4 / song.meter[1]) : 2;
const loopLen = () => song ? Math.max(barSec(), Math.ceil(song.length / barSec() - 1e-6) * barSec()) : 0;

function autoPick(t: MidiSong["tracks"][number]): string {
  const key = t.name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const names = Object.keys(patches).filter(n => playable(patches[n]));
  const exact = names.find(n => n.toLowerCase() === key) ?? names.find(n => key && key.includes(n.toLowerCase()) && n.length > 2);
  if (exact) return exact;
  if (t.channel === 9 || /drum|kit|beat|perc/.test(key)) return KIT;
  const pitches = t.notes.map(n => n.midi).sort((a, b) => a - b), median = pitches[pitches.length >> 1];
  const long = t.notes.reduce((a, n) => a + n.dur, 0) / t.notes.length > 0.6 * (60 / (song?.bpm ?? 120));
  const want = median < 48 ? "houseBass" : long ? "pad" : "keys";
  return patches[want] ? want : names.find(n => patches[n].kind === "synth") ?? names[0];
}
function loadSong(s: MidiSong, name: string, data?: Uint8Array, keep?: Record<number, Pick>): void {
  stopSong(); song = s; songName = name;
  picks = {};
  s.tracks.forEach((t, i) => { picks[i] = keep?.[i] && (keep[i].patch === KIT || patches[keep[i].patch]) ? keep[i] : { patch: autoPick(t), level: 1, mute: false, solo: false }; });
  bpmIn.value = String(Math.round(s.bpm));
  if (data && data.length < 300_000) { let bin = ""; for (const x of data) bin += String.fromCharCode(x); saved.song = { name, data: btoa(bin), picks }; }
  else if (!data) delete saved.song;
  saved.bpm = bpm(); save();
  $("song").textContent = `${name} · ${s.tracks.length} tracks · ${Math.round(s.bpm * 10) / 10} bpm · ${s.meter.join("/")} · ${fmt(s.length)}`;
  renderTracks();
}
const fmt = (sec: number) => `${Math.floor(sec / 60)}:${(sec % 60).toFixed(1).padStart(4, "0")}`;
function patchOptions(sel: HTMLSelectElement, value: string): void {
  const kit = document.createElement("option"); kit.value = KIT; kit.textContent = "Drum kit (General MIDI notes)"; sel.append(kit);
  for (const kind of [...EDITABLE, "other"]) {
    const og = document.createElement("optgroup"); og.label = kind;
    for (const n of Object.keys(patches).filter(n => playable(patches[n]) && (kind === "other" ? !isEditable(patches[n]) : patches[n].kind === kind)).sort((a, b) => a.localeCompare(b))) {
      const o = document.createElement("option"); o.value = n; o.textContent = n; og.append(o);
    }
    if (og.children.length) sel.append(og);
  }
  sel.value = value;
}
function renderTracks(): void {
  const tb = $("tracks"); tb.innerHTML = "";
  if (!song) return;
  tb.innerHTML = "<tr><th>Track</th><th>Notes</th><th>Patch</th><th>Level</th><th></th></tr>";
  song.tracks.forEach((t, i) => {
    const pk = picks[i], tr = document.createElement("tr");
    const lo = Math.min(...t.notes.map(n => n.midi)), hi = Math.max(...t.notes.map(n => n.midi));
    tr.innerHTML = `<td>${t.name.replace(/</g, "&lt;")}<div class="note">ch ${t.channel + 1}</div></td><td class="mono">${t.notes.length}<div class="note">${lo}–${hi}</div></td>`;
    const ps = document.createElement("td"), sel = document.createElement("select"); patchOptions(sel, pk.patch);
    sel.onchange = () => { pk.patch = sel.value; persistPicks(); };
    const edit = document.createElement("button"); edit.textContent = "Edit"; edit.title = "Edit this patch";
    edit.onclick = () => { if (pk.patch !== KIT) { current = pk.patch; refresh(); scrollTo({ top: 0, behavior: "smooth" }); } };
    ps.append(sel, edit);
    const lv = document.createElement("td"), r = document.createElement("input"); r.type = "range"; r.min = "0"; r.max = "1.5"; r.step = "0.01"; r.value = String(pk.level);
    r.oninput = () => { pk.level = +r.value; persistPicks(); }; lv.append(r);
    const ms = document.createElement("td"), m = document.createElement("button"), s = document.createElement("button");
    m.className = "m" + (pk.mute ? " on" : ""); m.textContent = "M"; s.className = "s" + (pk.solo ? " on" : ""); s.textContent = "S";
    m.onclick = () => { pk.mute = !pk.mute; m.classList.toggle("on", pk.mute); persistPicks(); };
    s.onclick = () => { pk.solo = !pk.solo; s.classList.toggle("on", pk.solo); persistPicks(); };
    ms.append(m, s);
    tr.append(ps, lv, ms); tb.append(tr);
  });
}
const persistPicks = () => { if (saved.song) saved.song.picks = picks; save(); };
function toggleSong(): void { if (playing) stopSong(); else startSong(); }
function startSong(from = cursor): void {
  if (!song) return;
  const { ctx, engine } = audio();
  engine.tempo(bpm());
  playing = true; cursor = from; startAt = ctx.currentTime + 0.08 - from / rate();
  $("play").textContent = "■ Stop"; $("play").classList.add("on");
}
function stopSong(): void { playing = false; $("play").textContent = "▶ Play"; $("play").classList.remove("on"); }
$("play").onclick = () => { if (!song) loadDemo(); toggleSong(); };
const tempoChanged = () => { const was = playing; if (was) { const pos = songPos(); stopSong(); startSong(pos); } saved.bpm = bpm(); save(); engine?.tempo(bpm()); };
bpmIn.onchange = tempoChanged;
$("bpm-file").onclick = () => { if (song) { bpmIn.value = String(Math.round(song.bpm * 100) / 100); tempoChanged(); } };
const pos = $<HTMLInputElement>("pos");
const songPos = () => (ctx && playing ? (ctx.currentTime - startAt) * rate() : cursor);
pos.oninput = () => { if (!song) return; const at = (+pos.value / 1000) * loopLen(); if (playing) { stopSong(); startSong(at); } else cursor = at; };

/** Every 25 ms: what's due in the next quarter second, on the engine (the song's notes, the phrase). */
function tick(): void {
  if (!ctx || !engine) return;
  const eng = engine, now = ctx.currentTime, until = now + 0.25, transpose = Math.round(Number($<HTMLInputElement>("transpose").value) || 0);
  if (playing && song) {
    const len = loopLen(), r = rate(), anySolo = Object.values(picks).some(p => p.solo);
    // song seconds [cursor, end) are due
    let end = (until - startAt) * r;
    while (cursor < end) {
      const stop = Math.min(end, len);
      song.tracks.forEach((t, i) => {
        const pk = picks[i]; if (!pk || pk.mute || (anySolo && !pk.solo) || pk.level <= 0) return;
        for (const n of t.notes) {
          if (n.start < cursor || n.start >= stop) continue;
          const at = startAt + n.start / r, dur = n.dur / r;
          const drum = pk.patch === KIT ? GM_DRUMS[n.midi] : null;
          if (pk.patch === KIT) { if (drum && patches[drum]) eng.note(partOf(`t${i}`, drum), drum, null, n.vel * pk.level, at, dur); continue; }
          const p = patches[pk.patch]; if (!playable(p)) continue;
          eng.note(partOf(`t${i}`, pk.patch), pk.patch, n.midi + transpose, n.vel * pk.level, at, dur);
        }
      });
      cursor = stop;
      if (cursor >= len - 1e-9) {
        if (!$<HTMLInputElement>("loop").checked) { stopSong(); cursor = 0; break; }
        startAt += len / r; cursor = 0; end = (until - startAt) * r;
      }
    }
    const p = Math.max(0, songPos() % len);
    pos.value = String(Math.round((p / len) * 1000));
    $("clock").textContent = fmt(p);
    $("marker").textContent = song.markers.filter(m => m.at <= p + 1e-6).pop()?.text ?? "";
  }
  // the phrase, on the patch being edited, at the tempo
  const ph = PHRASES[phraseEl.value];
  if (ph?.notes.length && playable(patches[current])) {
    const beat = 60 / bpm(), bars = Math.max(1, Math.ceil(Math.max(...ph.notes.map(n => n[0] + n[1])) / 4)), len = bars * 4 * beat;
    if (phraseAt < now - len) phraseAt = now + 0.05;
    while (phraseAt + phraseNext * beat < until) {
      const at = phraseAt;
      for (const [b, d, ns] of ph.notes) {
        const t = at + b * beat; if (t < now - 0.01) continue;
        for (const s of ns) engine.note(partOf("phrase", current), current, octave * 12 + s + transpose, +$<HTMLInputElement>("vel").value, t, d * beat);
      }
      phraseAt += len; phraseNext = 0;
    }
  }
}
setInterval(tick, 25);

// a file: chosen or dropped
async function readFile(f: File): Promise<void> {
  $("midi-err").textContent = "";
  try { const data = new Uint8Array(await f.arrayBuffer()); loadSong(parseMidi(data), f.name, data); }
  catch (e) { $("midi-err").textContent = `Couldn't read ${f.name}: ${(e as Error).message}`; }
}
$<HTMLInputElement>("file").onchange = e => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) void readFile(f); };
const drop = $("drop");
addEventListener("dragover", e => { e.preventDefault(); drop.classList.add("over"); });
addEventListener("dragleave", () => drop.classList.remove("over"));
addEventListener("drop", e => { e.preventDefault(); drop.classList.remove("over"); const f = e.dataTransfer?.files[0]; if (f) void readFile(f); });

/** The demo: four bars in A, its tracks named after the game's patches (how naming picks a patch), drums on channel 10. */
function demoSong(): MidiSong {
  const b = 0.5, chords = [[57, 60, 64], [53, 57, 60], [55, 59, 62], [52, 55, 59]], roots = [45, 41, 43, 40];
  const tracks: MidiSong["tracks"] = [
    { name: "pad", channel: 0, notes: chords.flatMap((c, i) => c.map(m => ({ midi: m, vel: 0.7, start: i * 4 * b, dur: 4 * b - 0.05, channel: 0 }))) },
    { name: "houseBass", channel: 1, notes: roots.flatMap((r, i) => [0, 1.5, 2, 3, 3.5].map((x, j) => ({ midi: r + (j === 2 ? 12 : 0), vel: 0.8, start: (i * 4 + x) * b, dur: 0.4 * b, channel: 1 }))) },
    { name: "arp", channel: 2, notes: chords.flatMap((c, i) => Array.from({ length: 16 }, (_, k) => ({ midi: [...c, c[0] + 12][k % 4] + 12, vel: k % 4 === 0 ? 0.8 : 0.55, start: (i * 4 + k / 4) * b, dur: 0.2 * b, channel: 2 }))) },
    { name: "Drums", channel: 9, notes: Array.from({ length: 16 }, (_, k) => [
      { midi: 36, vel: 1, start: k * b, dur: 0.1, channel: 9 },
      { midi: 42, vel: 0.7, start: (k + 0.5) * b, dur: 0.05, channel: 9 },
      ...(k % 2 === 1 ? [{ midi: 39, vel: 0.9, start: k * b, dur: 0.1, channel: 9 }] : []),
    ]).flat().sort((x, y) => x.start - y.start) },
  ];
  return { tracks, bpm: 120, tempos: [{ at: 0, bpm: 120 }], markers: [{ at: 0, text: "demo" }], meter: [4, 4], length: 16 * b };
}
function loadDemo(): void { loadSong(demoSong(), "the demo"); }
$("demo").onclick = loadDemo;

// ---- copy, paste, reset ----
function builders(): string {
  const changed: Record<string, Patch> = {};
  for (const [k, p] of Object.entries(patches)) if (!same(p, BASE.patches[k])) changed[k] = p;
  const out: Record<string, unknown> = { patches: changed };
  if (song) out.song = { file: songName, bpm: bpm(), transpose: Number($<HTMLInputElement>("transpose").value) || 0, tracks: song.tracks.map((t, i) => ({ name: t.name, patch: picks[i].patch === KIT ? "drum kit (GM)" : picks[i].patch, level: picks[i].level, ...(picks[i].mute ? { mute: true } : {}) })) };
  return JSON.stringify(out, null, 1);
}
$("copy").onclick = async () => {
  const text = builders(); $<HTMLTextAreaElement>("out").value = text;
  try { await navigator.clipboard.writeText(text); $("copied").textContent = "Copied: paste it in a message to the builders."; }
  catch { $("copied").textContent = "Select the text below and copy it."; }
};
$("apply").onclick = () => {
  $("paste-err").textContent = "";
  try {
    const j = JSON.parse($<HTMLTextAreaElement>("paste").value) as Record<string, unknown>;
    const got = (j.patches ?? (typeof j.kind === "string" ? { [fresh("pasted")]: j } : j)) as Record<string, Patch>;
    const names = Object.keys(got).filter(n => got[n] && typeof got[n].kind === "string" && typeof got[n].gain === "number");
    if (!names.length) throw new Error("no patches found (each needs a kind and a gain)");
    for (const n of names) { patches[n] = got[n]; patchesChanged(n, true); }
    current = names[0]; save(); refresh(); $("paste-err").textContent = `Added ${names.join(", ")}.`;
  } catch (e) { $("paste-err").textContent = `Couldn't read that: ${(e as Error).message}`; }
};
$("reset-all").onclick = () => {
  if (!confirm("Forget every edit and new patch, and the song?")) return;
  try { localStorage.removeItem(STORE); } catch { /* none */ }
  location.reload();
};

function refresh(): void { renderList(); renderEditor(); if (song) renderTracks(); }
renderKeys(); refresh();
if (saved.song) {
  try { const bin = atob(saved.song.data), data = Uint8Array.from(bin, c => c.charCodeAt(0)); loadSong(parseMidi(data), saved.song.name, data, saved.song.picks); }
  catch { delete saved.song; }
}
// (for the smoke check: tools/music-studio/check.cjs)
(window as unknown as { studio: object }).studio = { audio, meter: () => meter, select: (n: string) => { current = n; refresh(); }, phrase: (k: string) => { phraseEl.value = k; phraseEl.dispatchEvent(new Event("change")); }, loadDemo, startSong, stopSong, patches, setCurrent: (n: string) => { current = n; refresh(); }, setKnob };
