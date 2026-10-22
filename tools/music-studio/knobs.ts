// The Music Studio's knobs (Ed, 2026-10-22: a patch designer for the musician): every knob of the engine's synth, drum and
// bell patches (src/rules/musicScore.ts Patch), grouped and named as a subtractive synth lays them out (Logic's Retro Synth,
// Surge, Vital), with each one's range, its engine default (what a patch without it plays) and its unit. Data only.
import type { Patch } from "../../src/rules/musicScore";

export type Knob =
  | { key: keyof Patch; label: string; kind: "range"; min: number; max: number; step?: number; log?: boolean; def: number; unit?: string; note?: string }
  | { key: keyof Patch; label: string; kind: "choice"; options: string[]; def: string; note?: string }
  | { key: keyof Patch; label: string; kind: "toggle"; def: boolean; note?: string }
  | { key: keyof Patch; label: string; kind: "list"; def: string; note?: string };
export interface Group { title: string; knobs: Knob[]; note?: string }

export const WAVES = ["sine", "triangle", "sawtooth", "square", "custom"];
export const FILTERS = ["lowpass", "highpass", "bandpass", "notch"];
export const EDITABLE = ["synth", "kick", "noise", "snare", "bell"] as const;
export type EditKind = (typeof EDITABLE)[number];

const r = (key: keyof Patch, label: string, min: number, max: number, def: number, o: { step?: number; log?: boolean; unit?: string; note?: string } = {}): Knob => ({ key, label, kind: "range", min, max, def, ...o });
const sec = (key: keyof Patch, label: string, max: number, def: number, note?: string): Knob => r(key, label, 0, max, def, { step: 0.001, log: true, unit: "s", note });
const hz = (key: keyof Patch, label: string, def: number, min = 20, max = 18000): Knob => r(key, label, min, max, def, { log: true, unit: "Hz", step: 1 });

/** The channel's knobs, on every kind: the part's high-pass, place in the stereo field, sends and the kick's pump. */
const CHANNEL: Group = { title: "Mix", knobs: [
  r("gain", "Level", 0, 3, 0.3, { step: 0.001 }),
  hz("hp", "High-pass", 20, 20, 2000),
  r("pan", "Pan", -1, 1, 0, { step: 0.01 }),
  r("reverb", "Reverb send", 0, 1, 0, { step: 0.01 }),
  r("delay", "Delay send", 0, 1, 0, { step: 0.01, note: "a dotted-eighth echo, the game's" }),
  { key: "duck", label: "Pumped by the kick", kind: "toggle", def: false },
] };

export const GROUPS: Record<EditKind, Group[]> = {
  synth: [
    { title: "Oscillators", note: "Up to three waves, each its own level and pitch; every wave as Unison voices, detuned and spread.", knobs: [
      { key: "waves", label: "Waves", kind: "list", def: "sawtooth", note: "the oscillators" },
      { key: "levels", label: "Levels", kind: "list", def: "", note: "0-1 each" },
      { key: "semis", label: "Semitones", kind: "list", def: "", note: "each wave's pitch above the note" },
      { key: "harmonics", label: "Custom wave's harmonics", kind: "list", def: "1", note: "levels, the fundamental first (for a \"custom\" wave)" },
      r("unison", "Unison voices", 1, 9, 1, { step: 1 }),
      r("detune", "Detune", 0, 60, 0, { step: 0.5, unit: "ct" }),
      r("width", "Stereo width", 0, 1, 0, { step: 0.01 }),
      r("sub", "Sub (an octave down)", 0, 1.5, 0, { step: 0.01 }),
      r("noise", "Noise", 0, 1, 0, { step: 0.01 }),
    ] },
    { title: "FM", note: "A sine at Ratio × the note bending each oscillator: Index is how far (×the note); with a Decay it falls to Sustain.", knobs: [
      r("fmRatio", "Ratio", 0, 16, 0, { step: 0.01 }),
      r("fmIndex", "Index", 0, 10, 0, { step: 0.01 }),
      sec("fmDecay", "Decay", 4, 0, "0: steady"),
      r("fmSustain", "Sustain", 0, 1, 0, { step: 0.01 }),
    ] },
    { title: "Pitch", knobs: [
      r("bend", "Bend from", -24, 24, 0, { step: 0.1, unit: "st" }),
      sec("bendTime", "Bend time", 2, 0.08),
      sec("glide", "Glide", 2, 0, "from the part's last note (an 808's slide)"),
    ] },
    { title: "Amp envelope", knobs: [
      sec("attack", "Attack", 8, 0.005), sec("decay", "Decay", 8, 0.2), r("sustain", "Sustain", 0, 1, 0.5, { step: 0.01 }), sec("release", "Release", 10, 0.1),
    ] },
    { title: "Filter", note: "Env amount opens the filter above its cutoff at a note's start. Without its own envelope it closes over the amp's attack and decay.", knobs: [
      { key: "filter", label: "Type", kind: "choice", options: ["none", ...FILTERS], def: "none" },
      hz("cutoff", "Cutoff", 2000), r("q", "Resonance (Q)", 0.1, 30, 0.7, { step: 0.01, log: true }), r("envAmt", "Env amount", 0, 16000, 0, { step: 1, unit: "Hz" }),
      sec("fAttack", "Filter attack", 8, 0, "any of these: the filter's own envelope"), sec("fDecay", "Filter decay", 8, 0.2), r("fSustain", "Filter sustain", 0, 1, 0, { step: 0.01 }), sec("fRelease", "Filter release", 10, 0.1),
      { key: "filter2", label: "Second filter", kind: "choice", options: ["none", ...FILTERS], def: "none" },
      hz("cutoff2", "Its cutoff", 400), r("q2", "Its Q", 0.1, 30, 0.7, { step: 0.01, log: true }),
    ] },
    { title: "Modulation", knobs: [
      r("lfoRate", "Filter LFO rate", 0, 20, 0, { step: 0.01, unit: "Hz" }), r("lfoDepth", "Filter LFO depth", 0, 6000, 0, { step: 1, unit: "Hz" }),
      { key: "lfoWave", label: "Filter LFO wave", kind: "choice", options: ["sine", "triangle", "sawtooth", "square"], def: "sine" },
      r("vibRate", "Vibrato rate", 0, 12, 0, { step: 0.01, unit: "Hz" }), r("vibDepth", "Vibrato depth", 0, 100, 0, { step: 0.5, unit: "ct" }), sec("vibDelay", "Vibrato delay", 3, 0),
      r("tremRate", "Tremolo rate", 0, 20, 0, { step: 0.01, unit: "Hz" }), r("tremDepth", "Tremolo depth", 0, 1, 0, { step: 0.01 }),
    ] },
    { title: "Drive", knobs: [r("drive", "Saturation", 0, 1, 0, { step: 0.01 })] },
    CHANNEL,
  ],
  kick: [
    { title: "Kick", note: "A sine falling from its punch to its body; a click for the beater.", knobs: [
      hz("pitch", "Punch pitch", 150, 30, 1000), hz("pitchEnd", "Body pitch", 45, 20, 300), sec("pitchTime", "Fall time", 1, 0.08), sec("decay", "Decay", 3, 0.35),
      r("drive", "Drive", 0, 1, 0, { step: 0.01 }), r("click", "Click", 0, 1, 0, { step: 0.01 }),
    ] },
    CHANNEL,
  ],
  noise: [
    { title: "Noise", note: "Hats, claps, shakers, snaps: noise (or the 808's six metal tones) through a filter.", knobs: [
      { key: "source", label: "Source", kind: "choice", options: ["noise", "metal"], def: "noise" },
      { key: "filter", label: "Filter", kind: "choice", options: FILTERS, def: "highpass" },
      hz("cutoff", "Cutoff", 8000), r("q", "Q", 0.1, 30, 0.7, { step: 0.01, log: true }),
      sec("attack", "Attack", 1, 0.001), sec("decay", "Decay", 3, 0.05), r("bursts", "Bursts (a clap's)", 1, 8, 1, { step: 1 }),
    ] },
    CHANNEL,
  ],
  snare: [
    { title: "Snare", note: "Noise through a high-pass, and the shell's two tones.", knobs: [
      hz("pitch", "Shell pitch", 190, 60, 800), hz("cutoff", "Noise high-pass", 1800), r("q", "Q", 0.1, 30, 0.7, { step: 0.01, log: true }), sec("decay", "Decay", 2, 0.14),
    ] },
    CHANNEL,
  ],
  bell: [
    { title: "Bell", note: "Two square tones through a band-pass (a cowbell, pitched).", knobs: [
      r("ratio", "Second tone's ratio", 1, 4, 1.48, { step: 0.001 }), hz("cutoff", "Band-pass", 2400), r("q", "Q", 0.1, 30, 1.5, { step: 0.01, log: true }), sec("decay", "Decay", 4, 0.3),
    ] },
    CHANNEL,
  ],
};

/** Knobs that live on the part's channel: changing one remakes the channel (the engine caches it). */
export const CHANNEL_KEYS = new Set<string>(["hp", "pan", "reverb", "delay", "duck", "lfoRate", "lfoDepth", "lfoWave"]);

/** A new patch to start from, by kind. */
export const INIT: Record<EditKind, Patch> = {
  synth: { kind: "synth", gain: 0.3, waves: ["sawtooth"], attack: 0.01, decay: 0.3, sustain: 0.6, release: 0.3, filter: "lowpass", cutoff: 2000, q: 1, envAmt: 2000, reverb: 0.2 },
  kick: { kind: "kick", gain: 1, pitch: 150, pitchEnd: 45, pitchTime: 0.07, decay: 0.4, click: 0.2 },
  noise: { kind: "noise", gain: 3, filter: "highpass", cutoff: 7000, q: 0.7, decay: 0.05 },
  snare: { kind: "snare", gain: 1.2, pitch: 190, cutoff: 1600, q: 0.8, decay: 0.16, reverb: 0.2 },
  bell: { kind: "bell", gain: 0.4, cutoff: 2400, q: 1.5, decay: 0.3, ratio: 1.48 },
};

/** General MIDI's drum notes to the game's drum patches (a drum track, channel 10, or "Drum kit" picked). */
export const GM_DRUMS: Record<number, string> = {
  35: "kick", 36: "kick", 37: "snap", 38: "snare", 39: "clap", 40: "snare", 41: "tom", 42: "hat", 43: "tom", 44: "hat", 45: "tom", 46: "openHat",
  47: "tom", 48: "tom", 50: "tom", 51: "openHat", 53: "cowbell", 54: "shaker", 56: "cowbell", 69: "shaker", 70: "shaker", 82: "shaker",
};
