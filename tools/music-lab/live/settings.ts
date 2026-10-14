// The live Music Lab's settings (Ed, 2026-10-11: "a music lab with sliders that lets me copy and paste my choices"): what
// every slider, switch and picker holds, its defaults (the game's music as it is), and the compact JSON Ed copies out (only
// what differs from the defaults) and pastes back in. Pure: no page, no audio (src/musicLabSettings.test.ts).

/** The research ingredients laid over the music (the A/B ladder): a level each, 0 off, 1 as the A/B renders had it (the
 *  vocalise 1: the melody's singer, whichever `voice` sings it, at the game's level). */
export const LAYERS = ["drone", "frames", "tape", "kit", "vocalise", "choir", "whispers", "throat"] as const;
export type Layer = typeof LAYERS[number];
export const LAYER_NAMES: Record<Layer, string> = {
  drone: "Drone (low fifth)", frames: "Frame drums", tape: "Tape wobble + crackle", kit: "CC0 kit (for the synth drums)",
  vocalise: "Vocalise (the B and C melodies)", choir: "Recorded choir", whispers: "Whispers (breakdowns)", throat: "Throat-sung drone",
};
/** Who sings the form's melody: the game's singer as it is, the FOF voice, Pink Trombone (5), the recorded woman's note (5b),
 *  and the singer's A/B (Ed, 2026-10-14, "build two and A/B them"): the alto's sample set (the woman's note shifted with its
 *  formants kept, every two semitones) or the vocal-tract voice (Pink Trombone in a worklet, an alto's tract). */
export const VOICES = ["synth", "fof", "pinkTrombone", "recorded", "sampled", "tract"] as const;
/** The voices the engine sings itself (the player's own are Pink Trombone's worker and the one retuned note). */
export const engineSings = (v: Voice): boolean => v === "synth" || v === "fof" || v === "sampled" || v === "tract";
/** Which effects chain the singer goes through: as the game plays it (pure, dark in the dark families), or one of them forced. */
export const CHAINS = ["auto", "pure", "dark"] as const;
export type Chain = typeof CHAINS[number];
/** The voice line's ethereal effects (src/platform/audio/voiceFx.ts; Ed, 2026-10-11), a level each, 0 off. */
export const FX = ["chorus", "saturation", "air", "delay", "hall", "shimmer", "duck", "swells", "freeze", "whisper", "octave"] as const;
export type Fx = typeof FX[number];
export const FX_NAMES: Record<Fx, string> = {
  chorus: "Chorus (ensemble)", saturation: "Saturation", air: "Air (high shelf)", delay: "Ping-pong delay (dotted eighths)", hall: "Dark hall",
  shimmer: "Shimmer (octave-up reverb)", duck: "Ducked by the kick", swells: "Reverse swells into phrases", freeze: "Freeze phrase ends",
  whisper: "Whisper vocoder", octave: "Octave double",
};
export type Voice = typeof VOICES[number];
export const MODES = ["dorian", "aeolian", "phrygian"] as const;

export interface LabState {
  /** The arc step (0 the first wave's) and a section to loop ("" the wave's own, as the game plays it). */
  wave: number; section: string;
  seed: number; bpm: number;
  mode: string; witchHouse: boolean;
  layers: Record<Layer, number>;
  /** Who sings the melody when the vocalise layer is up. */
  voice: Voice;
  /** The music's own parts: a level each (1 as the style has it). */
  parts: Record<string, number>;
  mute: string[]; solo: string[];
  /** The victory section's knobs: its key change (semitones over the night's) and its layers' levels. */
  victory: { transpose: number; layers: Record<string, number> };
  /** The set view's night (rules/musicSet.ts): its waves and island ("home": the first home night is the hand-picked one at
   *  10), or null. */
  night: { waves: number; island: string } | null;
  /** The voice line's effects (on the sung melody, whoever sings it): the chain in force's own values until moved. */
  voiceFx: Record<Fx, number>;
  /** The choir part's chords on the FOF voice (fofChoir) rather than the synth choir. */
  fofChoir: boolean;
  /** The singer's breath (its patch's `breath`, 0 none to 1): null, the voice's own (Ed, 2026-10-14: "let me hear both"). */
  breath: number | null;
  /** The effects chain the singer goes through (Ed: two chains by place). */
  chain: Chain;
  /** The voice test (Ed, 2026-10-14): the singer sings the chord as constant arpeggios in every section, not the form's
   *  melodies in the breakdowns and builds. */
  arpeggio: boolean;
}

export interface Defaults {
  bpm: number; mode: string; parts: string[]; victory: { transpose: number; layers: Record<string, number> };
  /** The game's voice-effects chains (the style's voiceFx and voiceFxDark over it): the sliders start at the chain in force's. */
  voiceFx?: { pure?: Partial<Record<Fx, number>>; dark?: Partial<Record<Fx, number>> };
}

/** The game's chain a choice hears: "auto" is the pure one (the lab's passages have no family; a dark night's steps do). */
export function chainFx(d: Defaults, chain: Chain): Record<Fx, number> {
  const c = (chain === "dark" ? d.voiceFx?.dark : d.voiceFx?.pure) ?? {};
  return Object.fromEntries(FX.map(f => [f, c[f] ?? 0])) as Record<Fx, number>;
}

export function defaultState(d: Defaults): LabState {
  return {
    wave: 2, section: "", seed: 7, bpm: d.bpm, mode: d.mode, witchHouse: false,
    layers: Object.fromEntries(LAYERS.map(l => [l, l === "vocalise" ? 1 : 0])) as Record<Layer, number>, voice: "synth",
    parts: Object.fromEntries(d.parts.map(p => [p, 1])), mute: [], solo: [],
    victory: { transpose: d.victory.transpose, layers: { ...d.victory.layers } }, night: null, voiceFx: chainFx(d, "auto"), fofChoir: false,
    breath: null, chain: "auto", arpeggio: false,
  };
}

const round = (x: number) => Math.round(x * 100) / 100;
const changed = (rec: Record<string, number>, base: Record<string, number>) => {
  const out: Record<string, number> = {};
  for (const [k, v] of Object.entries(rec)) if (Math.abs(v - (base[k] ?? 0)) > 0.004) out[k] = round(v);
  return out;
};
const some = (o: object) => Object.keys(o).length > 0;

/** What Ed copies: only what differs from the defaults, readable. */
export function settingsJson(s: LabState, d: Defaults): string {
  const base = defaultState(d), out: Record<string, unknown> = { lab: "witch-music-lab/1" };
  if (s.wave !== base.wave || s.section) out.passage = { wave: s.wave, ...(s.section ? { section: s.section } : {}) };
  if (s.seed !== base.seed) out.seed = s.seed;
  if (s.bpm !== base.bpm) out.bpm = s.bpm;
  if (s.mode !== base.mode) out.mode = s.mode;
  if (s.witchHouse) out.witchHouse = true;
  const layers = changed(s.layers, base.layers);
  if (some(layers)) out.layers = layers;
  if (s.voice !== base.voice) out.voice = s.voice;
  const parts = changed(s.parts, base.parts);
  if (some(parts)) out.parts = parts;
  if (s.mute.length) out.mute = [...s.mute].sort();
  if (s.solo.length) out.solo = [...s.solo].sort();
  const vl = changed(s.victory.layers, base.victory.layers);
  if (s.victory.transpose !== base.victory.transpose || some(vl)) out.victory = { ...(s.victory.transpose !== base.victory.transpose ? { transpose: s.victory.transpose } : {}), ...(some(vl) ? { layers: vl } : {}) };
  if (s.night) out.night = { ...s.night };
  if (s.chain !== base.chain) out.chain = s.chain;
  const fx = changed(s.voiceFx, chainFx(d, s.chain)); // (against the chain in force's own values)
  if (some(fx)) out.voiceFx = fx;
  if (s.breath !== null) out.breath = round(s.breath);
  if (s.arpeggio) out.arpeggio = true;
  if (s.fofChoir) out.fofChoir = true;
  // one key a line, what's under it on the same line: short enough to paste in a message, easy to read
  return `{\n${Object.entries(out).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v).replace(/([,:])(?=["{\[\d-])/g, "$1 ")}`).join(",\n")}\n}`;
}

const num = (x: unknown, lo: number, hi: number, dflt: number) => (typeof x === "number" && Number.isFinite(x) ? Math.max(lo, Math.min(hi, x)) : dflt);
const levels = (x: unknown, into: Record<string, number>, known: (k: string) => boolean, hi = 2) => {
  if (!x || typeof x !== "object") return;
  for (const [k, v] of Object.entries(x)) if (known(k) && typeof v === "number") into[k] = num(v, 0, hi, into[k] ?? 0);
};

/** Settings pasted back (whole or a part; unknown keys ignored, numbers clamped): the state, and what was ignored. */
export function parseSettings(text: string, d: Defaults, sections: string[]): { state: LabState; ignored: string[] } {
  const raw = JSON.parse(text.trim().replace(/^```(json)?|```$/g, "")) as Record<string, unknown>;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("not a settings object");
  const s = defaultState(d), ignored: string[] = [];
  if ((CHAINS as readonly unknown[]).includes(raw.chain)) { s.chain = raw.chain as Chain; s.voiceFx = chainFx(d, s.chain); } // (first: the effects are over its values)
  for (const [k, v] of Object.entries(raw)) {
    switch (k) {
      case "lab": break;
      case "passage": { const p = v as { wave?: unknown; section?: unknown }; s.wave = Math.round(num(p?.wave, 0, 99, s.wave)); if (typeof p?.section === "string" && sections.includes(p.section)) s.section = p.section; break; }
      case "seed": s.seed = Math.round(num(v, 0, 1e9, s.seed)); break;
      case "bpm": s.bpm = Math.round(num(v, 60, 200, s.bpm)); break;
      case "mode": if (typeof v === "string" && (MODES as readonly string[]).includes(v)) s.mode = v; else ignored.push(k); break;
      case "witchHouse": s.witchHouse = v === true; break;
      case "layers": levels(v, s.layers, l => (LAYERS as readonly string[]).includes(l)); break;
      case "voice": if ((VOICES as readonly unknown[]).includes(v)) s.voice = v as Voice; else ignored.push(k); break;
      case "parts": levels(v, s.parts, p => p in s.parts); break;
      case "mute": case "solo": if (Array.isArray(v)) s[k] = v.filter(x => typeof x === "string" && (x in s.parts || (LAYERS as readonly string[]).includes(x))); break;
      case "victory": {
        const vic = v as { transpose?: unknown; layers?: unknown };
        s.victory.transpose = Math.round(num(vic?.transpose, -12, 12, s.victory.transpose));
        levels(vic?.layers, s.victory.layers, l => l in s.victory.layers);
        break;
      }
      case "voiceFx": levels(v, s.voiceFx, f => (FX as readonly string[]).includes(f), 1); break;
      case "fofChoir": s.fofChoir = v === true; break;
      case "chain": if (!(CHAINS as readonly unknown[]).includes(v)) ignored.push(k); break;
      case "breath": if (typeof v === "number") s.breath = num(v, 0, 1, 0); else if (v !== null) ignored.push(k); break;
      case "arpeggio": s.arpeggio = v === true; break;
      case "night": {
        const n = v as { waves?: unknown; island?: unknown } | null;
        s.night = n && typeof n === "object" ? { waves: Math.round(num(n.waves, 1, 64, 10)), island: typeof n.island === "string" ? n.island.slice(0, 24) : "home" } : null;
        break;
      }
      default: ignored.push(k);
    }
  }
  return { state: s, ignored };
}

/** The level a part or layer sounds at now: its slider, 0 muted, 0 when something else is soloed. */
export function heard(s: LabState, name: string, level: number): number {
  if (s.mute.includes(name)) return 0;
  if (s.solo.length && !s.solo.includes(name)) return 0;
  return level;
}
