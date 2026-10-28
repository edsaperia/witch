// The treehouse Studio's instruments (Ed, 2026-10-23: "The studio has a drumkit (top left), modular synth setup (top right),
// microphone (middle, spotlit). They open menus when you go near that let you 'play them'"; config/studio.json, the mock in
// previews/ed/studio-instruments on claude/ed-shots). Walking up to one lights it with E over it (Ed's playtest, 2026-10-26: "Menus
// should open when she presses E near an interactive object ... instead of them opening automatically just through proximity");
// E there and she's at it: its menu slides in (ui/studioPanel.ts) and every key plays it, the movement keys too (Ed: "it's a shame
// to lose all the movement keys for the instruments"), till E (the pad's ○ since Ed's layout of 2026-10-28), or Esc, steps her away (Ed, 2026-10-26: "instruments: leave with E; if not consistent it will be confusing"), she standing still at it meanwhile. The Studio has its own loop at its own tempo, never the
// night's music, shared by every player there, while each player's instrument is their own (Ed: three players jamming, one on
// each, when multiplayer comes). Her notes always sound exactly when pressed, never snapped to the loop (Ed, 2026-10-23). Numbers
// and names only: app/studio.ts plays them.
import STUDIO from "../../config/studio.json";
import type { Game } from "./game";
import { deckOf } from "./treehouse";
import { HOUSE_ROOMS, fromObject, hasRooms, type HouseObject } from "./houseRooms";
import type { Tuning } from "./tuning";

export type Instrument = "drums" | "synth" | "mic";
export type LoopStyle = "click" | "beat" | "bass" | "drone";
export const STUDIO_CONFIG = STUDIO as unknown as {
  loop: { bpm: number; min: number; max: number; step: number; styles: LoopStyle[]; level: number };
  root: number; scale: string; level: number;
  drums: { kits: { id: string; name: string; pads: Partial<Record<Pad, string>> }[]; start: string[] };
  synth: { patches: { id: string; name: string }[]; start: string[]; perf: { open: number; close: number; wobble: number; grit: number } };
  mic: { voices: { id: string; name: string }[]; start: string[]; vowels: Record<"up" | "down" | "left" | "right", Vowel>; formants: Record<Vowel, number> };
  patches: Record<string, Record<string, unknown>>;
};
export type Vowel = "laa" | "ooh" | "loo" | "mm";

/** The Studio as the players share it: the loop (on, its tempo and style), and each player's own instrument. */
export interface StudioState { loop: { on: boolean; bpm: number; style: LoopStyle }; players: StudioPlayer[] }
/** A player at the Studio: the instrument she's at (null: none) and its object, each instrument's sound (an index into its list), the synth's octave, its latch, and the mic's vowel. */
export interface StudioPlayer { at: Instrument | null; object: string | null; sound: Record<Instrument, number>; octave: number; latch: boolean; vowel: Vowel }

export function newStudio(players = 1, S = STUDIO_CONFIG): StudioState {
  return { loop: { on: false, bpm: S.loop.bpm, style: S.loop.styles[0] }, players: Array.from({ length: players }, newPlayer) };
}
export const newPlayer = (): StudioPlayer => ({ at: null, object: null, sound: { drums: 0, synth: 0, mic: 0 }, octave: 0, latch: false, vowel: "laa" });

// ---- the house's instruments, by nearness (as rules/stations.ts finds the dressing stations) ----

/** How much further than the house's reach she can step before an instrument lets her go (m). */
export const STUDIO_SLACK = 0.8;
export const instrumentOfObject = (o: HouseObject): Instrument | null => (o.use.kind === "instrument" ? o.use.instrument : null);

/** The instrument object she's at, standing at (x, z), `open` the one she's at now and `use` the one E was pressed at this step:
 *  `open` while she's within reach + slack of it; else `use` if it's the nearest within reach (`near`, lit with E over it). */
export function instrumentAt(at: { x: number; z: number }, x: number, z: number, open: string | null, use: string | null = null, H = HOUSE_ROOMS, slack = STUDIO_SLACK): { object: HouseObject | null; near: HouseObject | null } {
  let near: HouseObject | null = null, bd = H.reach;
  for (const o of H.objects) if (instrumentOfObject(o)) { const d = fromObject(o, at, x, z); if (d <= bd) { bd = d; near = o; } }
  const cur = open ? H.objects.find(o => o.id === open && instrumentOfObject(o)) : undefined;
  if (cur && fromObject(cur, at, x, z) <= H.reach + slack) return { object: cur, near };
  return { object: use && near?.id === use ? near : null, near };
}

/** Step the first player's place at the Studio from where she is in the game: only on foot in the house (landed, off her decks,
 *  not knocked out); `use`, the object E was pressed at this step (the rules' "house" event), if any. Returns whether she's at an
 *  instrument now. */
export function stepStudio(S: StudioState, g: Game, tuning: Tuning = g.tuning, i = 0, use: string | null = null): boolean {
  const P = S.players[i] ?? (S.players[i] = newPlayer()), w = g.witches[i] ?? g.witches[0], b = w.body;
  const d = deckOf(g.map, tuning);
  if (!b.perch || b.mode !== "ground" || b.seated || w.ko || !d || !hasRooms(d)) { P.at = null; P.object = null; return false; }
  const r = instrumentAt(d, b.x, b.z, P.object, use);
  P.object = r.object?.id ?? null;
  P.at = r.object ? instrumentOfObject(r.object) : null;
  return !!P.at;
}

/** Esc at an instrument (a gamepad's B): she steps away; E there plays it again. */
export function leaveInstrument(S: StudioState, i = 0): void {
  const P = S.players[i]; if (!P?.object) return;
  P.object = null; P.at = null; P.latch = false;
}

// ---- the keys (by position, KeyboardEvent.code: any layout plays the same places) ----

export type Pad = "kick" | "kick808" | "kickSoft" | "kickHard" | "snare" | "rim" | "clap" | "snap" | "hat" | "openHat" | "shaker" | "cowbell" | "tomHigh" | "tomMid" | "tomLow" | "tomFloor" | "crash";
/** The drum kit, played with two hands like finger drumming: Space the kick; the home row's snare, hats and claps mirrored for
 *  either hand, G and H toms; the top row's hats, toms and percussion; the bottom row's other kicks and accents; the arrows four
 *  toms for fills. */
export const DRUM_KEYS: Record<string, Pad> = {
  Space: "kick",
  KeyA: "clap", KeyS: "openHat", KeyD: "hat", KeyF: "snare", KeyG: "tomLow", KeyH: "tomHigh", KeyJ: "snare", KeyK: "hat", KeyL: "openHat", Semicolon: "clap", Quote: "crash",
  KeyQ: "hat", KeyW: "openHat", KeyR: "tomHigh", KeyT: "tomMid", KeyY: "shaker", KeyU: "cowbell", KeyI: "snap", KeyO: "rim", KeyP: "crash", BracketLeft: "crash", BracketRight: "crash",
  KeyZ: "kick808", KeyX: "kickSoft", KeyC: "kickHard", KeyV: "clap", KeyB: "snap", KeyN: "clap", KeyM: "snap", Comma: "shaker", Period: "cowbell", Slash: "crash",
  ArrowUp: "tomHigh", ArrowLeft: "tomMid", ArrowRight: "tomLow", ArrowDown: "tomFloor",
};
/** The synth's and the mic's notes: three rows, three octaves from the key's root, every key a step of the scale. */
export const NOTE_ROWS: string[][] = [
  ["KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash"],
  ["KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote"],
  ["KeyQ", "KeyW", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash"], // (no E: it leaves)
];
const SCALES: Record<string, number[]> = { dorian: [0, 2, 3, 5, 7, 9, 10], aeolian: [0, 2, 3, 5, 7, 8, 10], phrygian: [0, 1, 3, 5, 7, 8, 10], ionian: [0, 2, 4, 5, 7, 9, 11], mixolydian: [0, 2, 4, 5, 7, 9, 10] };
/** A scale step's MIDI note: the root, `deg` steps up the scale (any number, octaves and all). */
export function scaleNote(root: number, deg: number, scale = STUDIO_CONFIG.scale): number {
  const s = SCALES[scale] ?? SCALES.dorian, o = Math.floor(deg / s.length);
  return root + 12 * o + s[deg - o * s.length];
}
/** The note a key plays on the synth or the mic (null: not a note key): its row's octave from the root, its place along it a step
 *  of the scale; `shift` an octave up, `octave` the player's octaves. */
export function noteFor(code: string, shift = false, octave = 0, S = STUDIO_CONFIG): number | null {
  for (let r = 0; r < NOTE_ROWS.length; r++) {
    const i = NOTE_ROWS[r].indexOf(code);
    if (i >= 0) return scaleNote(S.root + 12 * (r - 1 + octave + (shift ? 1 : 0)), i, S.scale);
  }
  return null;
}
/** The number row, the same on every instrument: the loop's switch, its tempo down and up, its style, and the sounds (5 to 9). */
export type Control = { kind: "loop" } | { kind: "slower" } | { kind: "faster" } | { kind: "style" } | { kind: "sound"; n: number };
export function controlFor(code: string): Control | null {
  const m = /^Digit(\d)$/.exec(code); if (!m) return null;
  const d = +m[1];
  return d === 1 ? { kind: "loop" } : d === 2 ? { kind: "slower" } : d === 3 ? { kind: "faster" } : d === 4 ? { kind: "style" } : d >= 5 ? { kind: "sound", n: d - 5 } : null;
}
/** A number-row control on the shared loop or the player's sound. */
export function applyControl(S: StudioState, c: Control, i = 0, cfg = STUDIO_CONFIG): void {
  const L = S.loop, P = S.players[i];
  if (c.kind === "loop") L.on = !L.on;
  else if (c.kind === "slower" || c.kind === "faster") L.bpm = Math.max(cfg.loop.min, Math.min(cfg.loop.max, L.bpm + (c.kind === "faster" ? 1 : -1) * cfg.loop.step));
  else if (c.kind === "style") L.style = cfg.loop.styles[(cfg.loop.styles.indexOf(L.style) + 1) % cfg.loop.styles.length];
  else if (P?.at && c.n < soundsOf(P.at, cfg).length) P.sound[P.at] = c.n;
}
/** An instrument's sounds: the kits, the synth's patches, the mic's voices (id and name). */
export const soundsOf = (inst: Instrument, S = STUDIO_CONFIG): { id: string; name: string }[] => (inst === "drums" ? S.drums.kits : inst === "synth" ? S.synth.patches : S.mic.voices);
/** A drum pad's patch in a kit (the house kit's where the kit leaves it out). */
export const padPatch = (pad: Pad, kit: number, S = STUDIO_CONFIG): string => S.drums.kits[kit]?.pads[pad] ?? S.drums.kits[0].pads[pad] ?? "kick";

/** The gamepad (the standard mapping's button numbers): the menu's back (circle: platform/bindings.ts, app/studio.ts) steps away, as
 *  E does (Ed, 2026-10-26: "instruments: leave with E; if not consistent it will be confusing"); the drum kit's pads; the synth's and
 *  the mic's eight notes (the d-pad and the face buttons, a scale's steps from the middle row's root), the bumpers and the left
 *  trigger an octave down and up (a button bound to back or the pause plays nothing). */
export const PAD_DRUMS: Record<number, Pad> = { 0: "kick", 4: "snare", 3: "hat", 5: "openHat", 6: "clap", 7: "crash", 12: "tomHigh", 14: "tomMid", 15: "tomLow", 13: "tomFloor" };
export const PAD_NOTES: Record<number, number> = { 13: 0, 14: 1, 12: 2, 15: 3, 0: 4, 7: 5, 3: 6, 5: 7 };
export const PAD_OCTAVE: Record<number, number> = { 4: -1, 6: 1 };

// ---- the loop: a bar of sixteenths in a style, four bars round (i, IV, VII, i in the scale) ----

export interface LoopHit { patch: string; midi: number | null; vel: number; steps: number }
const CHORDS = [0, 3, 6, 0];
/** What the loop plays on sixteenth `step` (from its start) in `style`. */
export function loopHits(style: LoopStyle, step: number, S = STUDIO_CONFIG): LoopHit[] {
  const s = step % 16, bar = Math.floor(step / 16) % 4, root = S.root - 12 + (scaleNote(0, CHORDS[bar], S.scale)), out: LoopHit[] = [];
  if (style === "click") { if (s % 4 === 0) out.push({ patch: "studioClick", midi: s === 0 ? 96 : 84, vel: s === 0 ? 1 : 0.6, steps: 1 }); return out; }
  if (style === "drone") { if (s === 0) out.push({ patch: "studioDrone", midi: root - 12, vel: 0.9, steps: 16 }); if (s % 4 === 0) out.push({ patch: "studioClick", midi: 84, vel: s === 0 ? 0.5 : 0.3, steps: 1 }); return out; }
  if (s % 4 === 0) out.push({ patch: "softKick", midi: null, vel: 0.9, steps: 2 });
  if (s === 4 || s === 12) out.push({ patch: "clap", midi: null, vel: 0.55, steps: 2 });
  if (s % 2 === 0) out.push({ patch: "hat", midi: null, vel: s % 4 === 2 ? 0.55 : 0.3, steps: 1 });
  if (style === "bass" && [0, 3, 6, 10, 14].includes(s)) out.push({ patch: "studioBass", midi: root - 12 + (s === 10 ? 12 : 0), vel: s === 0 ? 0.9 : 0.7, steps: 2 });
  return out;
}
