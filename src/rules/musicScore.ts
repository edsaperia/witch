// The music's score (Ed, 2026-10-04: generative music, in code, like the art): what each part
// plays on each sixteenth, from the style file (config/music-style.json) and the section the
// conductor (rules/musicPlan.ts) has chosen. Numbers only, no sound: src/platform/audio/musicEngine.ts
// plays the notes. The same seed and section always give the same notes.
import { hash2 } from "./random";
import voices from "../../config/creature-voices.json";

/** A synth patch: how one part sounds. Every field but kind and gain is optional. */
export interface Patch {
  /** kick: a falling sine; noise: filtered noise (hats, claps, shakers, snaps); snare: noise and a
   *  tone; synth: oscillators through a filter; bell: two square tones (a cowbell, pitched);
   *  riser: noise swept up over a build; impact: a noise burst and a falling sub; voice: a sung
   *  note, synthesised (a buzz through vowel formants, vibrato, breath). */
  kind: "kick" | "noise" | "snare" | "synth" | "voice" | "bell" | "riser" | "impact";
  gain: number;
  /** synth: oscillator shapes (one oscillator each, spread by detune cents). */
  waves?: OscillatorType[];
  detune?: number;
  /** kick: start and end pitch (Hz) and the fall's time; impact: the sub's fall. */
  pitch?: number; pitchEnd?: number; pitchTime?: number;
  attack?: number; decay?: number; sustain?: number; release?: number;
  /** filter: lowpass, highpass or bandpass at cutoff Hz with q; envAmt Hz more at the note's start. */
  filter?: BiquadFilterType; cutoff?: number; q?: number; envAmt?: number;
  /** glide seconds from the part's last note (an 808's slide). */
  glide?: number;
  /** saturation 0-1. */
  drive?: number;
  /** bell: the second tone's ratio to the first. */
  ratio?: number;
  /** noise: bursts (a clap's 3). */
  bursts?: number;
  /** kick: the beater's click (0-1). noise: "metal" for the 808's six square tones (hats, cymbals). */
  click?: number;
  source?: "noise" | "metal";
  /** synth: each wave as this many detuned voices (a supersaw: 7), spread across ±width of the stereo field. */
  unison?: number;
  width?: number;
  /** synth: each note starts this many semitones off and slides to its pitch over bendTime. */
  bend?: number;
  bendTime?: number;
  /** synth: a slow filter wobble, lfoRate Hz by lfoDepth Hz. */
  lfoRate?: number;
  lfoDepth?: number;
  /** voice: the vowels it sings in turn (ah, oh, oo, eh, ee), their formants scaled by formantShift,
   *  vibrato depth in cents, and how much breath (noise). */
  vowels?: string[];
  /** voice: sixteenths a vowel lasts before the next (4, a beat; 1: a new vowel each note, the soprano's). */
  vowelStep?: number;
  formantShift?: number;
  vibrato?: number;
  breath?: number;
  /** The part's channel: a high-pass (Hz) to keep the low end clear, and its place left (-1) to right (1). */
  hp?: number;
  pan?: number;
  /** sends 0-1, and whether the kick ducks it (the house pump). */
  reverb?: number; delay?: number; duck?: boolean;
}

/** A part: a voice and its patterns. Patterns are 16 characters a bar (any whole number of bars):
 *  "." rest, "x" a hit, "X" an accent, "o" a ghost, "?" a hit as likely as the wave's energy, "r" a
 *  roll (two thirty-seconds), "-" holds the note before. Bass patterns name chord tones instead of
 *  x: "1" root, "2" the step above (a clash), "3", "5", "7", "8" the octave. */
export interface PartDef {
  patch: string;
  /** drum: unpitched; bass: the pattern's chord tones; chord: the whole chord; arp: chord tones in
   *  turn up two octaves; motif: the run's seeded melody. */
  role: "drum" | "bass" | "chord" | "arp" | "motif";
  /** Octaves above the style's root. */
  octave?: number;
  patterns: Record<string, string>;
}

/** A part in a section: a pattern name, or the pattern with its level (0-1), the share of the
 *  section after which it comes in (from), and the wave energy it needs. */
export type PartUse = string | { p: string; level?: number; from?: number; energy?: number };

export interface SectionDef {
  /** Another section this one starts from. */
  base?: string;
  /** null takes a part of the base out. */
  parts?: Record<string, PartUse | null>;
  progression?: string;
  /** Bars each chord lasts. */
  chordBars?: number;
  /** The section's own low-pass (Hz), or [from, to] swept over the section. */
  cutoff?: number | [number, number];
  riser?: boolean;
  /** A crash and sub drop on its first beat. */
  impact?: boolean;
  sevenths?: boolean;
  /** Its last bar before a new section: the style's drum fill and mutes (fill, the default), the
   *  mutes only (mute), or nothing (none). */
  ending?: "fill" | "mute" | "none";
  /** One line for the Music Lab. */
  feel?: string;
}

/** One step of the run's arc: the music for a wave (the last step repeats). */
export interface ArcStep {
  name: string;
  /** 0 calm to 1 frantic: "?" hits and parts that need energy. */
  energy: number;
  progression?: string;
  /** Its tempo (bpm; the style's bpm if none): the beat clock eases to it as the wave lands. Ed, 2026-10-09: none has
   *  one now (the tempo stays at the style's 120 but for her knockdowns, rules/beat.ts knockdownTempo). Every step plays
   *  in the style's one scale (dorian: Ed, the same day, "Keep it all in the dorian"). */
  bpm?: number;
  /** Its sections on the form (Ed, 2026-10-09: "ABAC; the first two sections should be 4 on the floor, the third sections
   *  breakbeats, and the fourth a breakdown"): A and B one four-on-the-floor block (`land` the first time round, as the
   *  wave lands), the second A a breakbeat one, C a breakdown; each list taken in turn on later passes. With these,
   *  `arrive`, `loop` and `variants` aren't used. */
  sections?: { land?: string; four: string[]; breaks: string[]; breakdown: string[] };
  /** The sections played as the wave arrives, then the ones looped till the next wave: [name, bars]. */
  arrive?: [string, number][];
  loop?: [string, number][];
  /** Other loops taken in turn on later passes (overnight, 2026-10-06: a 30-minute run shouldn't
   *  loop audibly): pass 0 plays `loop`, pass 1 `variants[0]`, and so on round. */
  variants?: [string, number][][];
  /** The section leading into the next wave, and its bars. */
  build: string;
  buildBars?: number;
}

/** A part in a legend's clearing layer: its pattern (or patterns, one taken by the species) and level. */
export interface CircleUse { p: string | string[]; level?: number }

export interface MusicStyle {
  name: string;
  notes?: string;
  /** The base tempo: the first wave's, unless its arc step has its own. */
  bpm: number;
  /** Bars a tempo change takes to ease in, from the block line the wave's music lands on. */
  tempoRampBars?: number;
  /** 0 straight, 0.5 the off sixteenths pushed half a sixteenth late. */
  swing: number;
  /** MIDI note of the style's root (the bass's lowest octave). */
  root: number;
  scale: string;
  scales: Record<string, number[]>;
  progressions: Record<string, number[]>;
  /** Sections change only on these bar lines (4: every 4 bars); every section's length is a multiple. */
  blockBars: number;
  buildBars: number;
  mix: { master: number; reverb: number; reverbTime: number; delay: number; delayBeats: number; feedback: number; duck: number };
  patches: Record<string, Patch>;
  parts: Record<string, PartDef>;
  sections: Record<string, SectionDef>;
  /** The section the home speakers' boot plays, and the one while she's knocked out. */
  intro: string;
  knockout: string;
  /** The drum fill in the last bar before a new section: its part, pattern, and parts muted in the bar's last beat. */
  fill: { part: string; pattern: string; mute: string[] };
  /** Parts added while a soundsystem nearby is under siege (their level times the siege, 0-1). */
  siege: Record<string, PartUse>;
  /** Parts added near a woken area that has joined the party: its soundsystem on, its happy animals
   *  dancing (their level times how near, 0-1); a part the section already plays isn't doubled. */
  party?: Record<string, PartUse>;
  /** Parts added while an angry legend is near (charging, or shooting from afar: their level times how near, 0-1). */
  legend?: Record<string, PartUse>;
  /** A sleeping legend's clearing, heard on the ground (Ed, 2026-10-06): the parts its layer plays
   *  over the muffled music, every legend's (`every`) and its voice family's (`families`, by
   *  config/creature-voices.json); a part's `p` one pattern, or several for its species to pick from. */
  circle?: { every: Record<string, CircleUse>; families: Record<string, Record<string, CircleUse>> };
  /** The melodies' form (Ed, 2026-10-09): every section's melodic parts give way to one line in 8-bar phrases, ABAC. */
  form?: FormDef;
  arc: ArcStep[];
}

/** The melodies' form (Ed, 2026-10-09: "Melodies should be 8 bars long, with a 32 bar ABAC structure, and include rests.
 *  The B and C melodies should be (simulated) female voice, with the A a random instrument from (pluck, lead, chip, voice,
 *  bell or horn)"). A section's melodic parts (role motif) no longer play their own walks: they say whether the melody
 *  plays there and how loud, and the form's line plays, its chords the form's too (bass, arps and pads follow them). */
export interface FormDef {
  /** The phrases in turn (A comes back the same) and each phrase's bars. */
  order: string;
  phraseBars: number;
  /** Bars each chord lasts. */
  chordBars: number;
  /** The progressions A takes one of (by the seed), and B's; B ends on the question chord, C (A's opening, then the
   *  question) on the answer. */
  a: string[];
  b: string[];
  question: number;
  answer: number;
  /** The parts A may play on (one taken by the seed), and the part and patch B and C sing on, and its octave. */
  instruments: string[];
  sung: { part: string; patch: string; octave: number };
  /** The melody's range in scale steps above the root (in its part's octave). */
  range: [number, number];
  /** Rhythm cells, a bar each (x a note, - held, . a rest, T a quarter-note triplet: three notes over the 8 sixteenths
   *  it and its 7 _ fill, t an eighth-note triplet over 4), "slow" (whole and half notes, quarter triplets: Ed, 2026-10-09,
   *  "keep the melodies relatively slow, but not always. Use whole notes and triplets quite often") and "mid";
   *  `cadence` cells end a half-phrase (its 4th and 8th bars) on rests, so every phrase breathes. */
  cells: { slow: string[]; mid: string[] };
  cadence: { slow: string[]; mid: string[] };
  /** The share of each part's bars taken from the "mid" cells (the rest "slow"); `default` for any not listed. */
  pace: Record<string, number>;
}

/** What the conductor has chosen for a block of bars. */
export interface BlockPlan {
  /** The section, the bar it started on and its length in bars. */
  section: string;
  start: number;
  bars: number;
  /** The wave the music is at, and its arc step's index. */
  wave: number;
  arc: number;
  /** How many times the wave's loop has come round (0 the first time, and the arrival): each pass
   *  its melodies are seeded anew, its chords start a step on and its "?" hits fall differently. */
  pass?: number;
}

export interface NoteEvent {
  part: string;
  /** "circle": a legend's clearing layer, played over the muffle rather than under it. */
  layer?: "circle";
  patch: string;
  /** Absolute sixteenth (step 0 is game time 0), and a fraction of a step after it (swing, rolls). */
  step: number;
  offset: number;
  /** Length in steps. */
  dur: number;
  /** MIDI note, or null for drums. */
  midi: number | null;
  /** 0-1, the part's level in it. */
  vel: number;
  /** Played straight, without the swing (a triplet's notes). */
  straight?: boolean;
  /** Risers: the build's progress from and to over this note (0-1). */
  from?: number;
  to?: number;
}

export type Resolved = Required<Pick<SectionDef, "progression" | "chordBars">> & SectionDef & { parts: Record<string, PartUse> };

const resolvedCache = new WeakMap<MusicStyle, Map<string, Resolved>>();

/** A section with its base's parts and settings merged in. */
export function resolveSection(style: MusicStyle, name: string): Resolved {
  let cache = resolvedCache.get(style);
  if (!cache) resolvedCache.set(style, cache = new Map());
  const hit = cache.get(name);
  if (hit) return hit;
  const chain: SectionDef[] = [];
  for (let n: string | undefined = name, i = 0; n && i < 8; i++) {
    const s: SectionDef | undefined = style.sections[n];
    if (!s) throw new Error(`music style: no section "${n}"`);
    chain.unshift(s);
    n = s.base;
  }
  const out: Resolved = { progression: "", chordBars: 2, parts: {} };
  for (const s of chain) {
    const { parts, ...rest } = s;
    Object.assign(out, rest);
    for (const [k, v] of Object.entries(parts ?? {})) { if (v === null) delete out.parts[k]; else out.parts[k] = v; }
  }
  delete out.base;
  cache.set(name, out);
  return out;
}

export const arcStep = (style: MusicStyle, arc: number): ArcStep => style.arc[Math.max(0, Math.min(style.arc.length - 1, arc))];

const use = (u: PartUse) => (typeof u === "string" ? { p: u, level: 1, from: 0, energy: 0 } : { p: u.p, level: u.level ?? 1, from: u.from ?? 0, energy: u.energy ?? 0 });

/** The scale degree (0 the root) of a chord tone or a melody's step, as a MIDI note. */
export function degreeToMidi(style: MusicStyle, scale: number[], degree: number, octave: number, transpose: number): number {
  const n = scale.length, o = Math.floor(degree / n), d = degree - o * n;
  let m = style.root + transpose + 12 * (octave + o) + scale[d];
  while (m > 96) m -= 12; // nothing shrill: the top folds down an octave
  return m;
}

/** The run's melody for an arc step and part: one value per sixteenth over two bars, scale steps
 *  above the chord's root, a seeded walk that leans on chord tones on the strong steps. */
export function motif(seed: number, arc: number, part: string): number[] {
  let salt = 0;
  for (let i = 0; i < part.length; i++) salt = (salt * 31 + part.charCodeAt(i)) | 0;
  const out: number[] = [];
  let v = [0, 2, 4][Math.floor(hash2(seed, arc, salt) * 3)];
  for (let i = 0; i < 32; i++) {
    const r = hash2(seed + i * 7919, arc, salt);
    if (i % 4 === 0) v = [0, 2, 4, 7, 4, 2][Math.floor(r * 6)] + (v > 6 && r < 0.5 ? -7 : 0); // strong: a chord tone
    else v += [-2, -1, -1, 1, 1, 2, 0, 3][Math.floor(r * 8)];
    v = Math.max(-2, Math.min(9, v));
    out.push(v);
  }
  // a phrase answers itself: the second bar echoes the first, its end a step changed
  for (let i = 16; i < 28; i++) if (hash2(seed + i, arc, salt + 1) < 0.6) out[i] = out[i - 16];
  return out;
}

const motifCache = new Map<string, number[]>();
function motifFor(seed: number, arc: number, part: string): number[] {
  const k = `${seed}|${arc}|${part}`;
  let m = motifCache.get(k);
  if (!m) { if (motifCache.size > 256) motifCache.clear(); motifCache.set(k, m = motif(seed, arc, part)); }
  return m;
}

/** The chord (scale degrees) a section plays in bar `barIn` of itself (its own progression: the music
 *  without a form, the Music Lab's older styles). */
export function chordAt(style: MusicStyle, sec: Resolved, step: ArcStep, barIn: number): { root: number; tones: number[] } {
  const prog = style.progressions[sec.progression || step.progression || ""] ?? style.progressions[Object.keys(style.progressions)[0]];
  const root = prog[Math.floor(barIn / Math.max(1, sec.chordBars)) % prog.length];
  const tones = [root, root + 2, root + 4];
  if (sec.sevenths) tones.push(root + 6);
  return { root, tones };
}

const pick = <T>(xs: readonly T[], r: number): T => xs[Math.min(xs.length - 1, Math.floor(r * xs.length))];
const mod = (a: number, n: number) => ((a % n) + n) % n;

/** The form's length in bars (32). */
export const formBars = (F: FormDef) => F.order.length * F.phraseBars;

/** The part A plays on for a seed. */
export const formInstrument = (F: FormDef, seed: number): string => pick(F.instruments, hash2(seed, 401, 7));

/** The form's chord in bar `formBar` (bars since the seed's form began): A's progression, B's ending on the question, C
 *  taking A's opening then the question and answer. */
export function formChord(style: MusicStyle, seed: number, formBar: number, sevenths = false): { root: number; tones: number[] } {
  const F = style.form!, fb = mod(formBar, formBars(F)), letter = F.order[Math.floor(fb / F.phraseBars)];
  const progOf = (names: string[], salt: number) => style.progressions[pick(names, hash2(seed, 409, salt))] ?? [0];
  const A = progOf(F.a, 1), B = progOf(F.b, 2), cb = Math.max(1, F.chordBars), n = Math.ceil(F.phraseBars / cb);
  const k = Math.floor((fb % F.phraseBars) / cb);
  const root = letter === "B" ? (k === n - 1 ? F.question : B[k % B.length])
    : letter === "C" ? (k === n - 1 ? F.answer : k === n - 2 ? F.question : A[k % A.length])
    : A[k % A.length];
  const tones = [root, root + 2, root + 4];
  if (sevenths) tones.push(root + 6);
  return { root, tones };
}

/** A note of a phrase: scale steps above the root, its length in sixteenths, and how far after its sixteenth it starts
 *  (a triplet's: a fraction of a sixteenth). */
export interface PhraseNote { deg: number; dur: number; off: number }

/** One phrase of the form for a seed: a note or null (a rest or a held note) on each of its sixteenths. A seeded walk
 *  over the form's chords, landing on chord tones on the beats, in bar-long rhythm cells (mostly slow: whole notes, halves and triplets; its part's `pace` of them busier)
 *  (the 2nd half-phrase's echoing the 1st's now and then), each half-phrase ending on rests; A ends open (a chord tone
 *  not the root), B on a question (the 2nd or 5th), C answering it on the root. */
export function formPhrase(style: MusicStyle, seed: number, letter: string): (PhraseNote | null)[] {
  const F = style.form!, P = F.phraseBars, salt = letter.charCodeAt(0) * 13;
  const part = letter === "A" ? formInstrument(F, seed) : F.sung.part, pace = F.pace[part] ?? F.pace.default ?? 0.25;
  const at = F.order.indexOf(letter) * P; // (its chords: its first place in the form)
  const rhythm: string[] = [];
  for (let b = 0; b < P; b++) {
    const r = hash2(seed + b * 31, 419, salt), half = Math.floor(P / 2), kind = hash2(seed + b * 17, 423, salt) < pace ? "mid" : "slow";
    if (b % half === half - 1) rhythm.push(pick(F.cadence[kind], r));
    else if (b >= half && hash2(seed + b, 421, salt) < 0.5) rhythm.push(rhythm[b - half]); // (the answer echoing the call)
    else rhythm.push(pick(F.cells[kind], r));
  }
  const [lo, hi] = F.range, out: (PhraseNote | null)[] = new Array(P * 16).fill(null), onsets: number[] = [];
  let v = 2 + Math.floor(hash2(seed, 431, salt) * 3);
  const nearest = (want: number, ok: (d: number) => boolean) => {
    let best = want, bd = Infinity;
    for (let d = lo; d <= hi; d++) if (ok(d) && Math.abs(d - want) < bd) { bd = Math.abs(d - want); best = d; }
    return best;
  };
  for (let b = 0; b < P; b++) {
    const tones = formChord(style, seed, at + b).tones.map(t => mod(t, 7)), cell = rhythm[b];
    const note = (pos: number, dur: number, strong: boolean) => {
      const i = b * 16 + Math.floor(pos), r = hash2(seed + i * 7919, 433, salt);
      if (strong) v = nearest(v + pick([-2, -1, 0, 1, 2, 3], r), d => tones.includes(mod(d, 7))); // (the beats: a chord tone)
      else v = Math.max(lo, Math.min(hi, v + pick([-2, -1, -1, 1, 1, 2], r)));
      out[i] = { deg: v, dur, off: pos - Math.floor(pos) };
      onsets.push(i);
    };
    for (let s = 0; s < 16; s++) {
      const c = cell[s];
      if (c === "x") {
        let dur = 1;
        while (s + dur < 16 && cell[s + dur] === "-") dur++;
        note(s, dur, s % 4 === 0);
      } else if (c === "T" || c === "t") {
        const span = c === "T" ? 8 : 4; // (three notes in the time of two)
        for (let k = 0; k < 3; k++) note(s + (k * span) / 3, span / 3, k === 0 && s % 4 === 0);
      }
    }
  }
  const last = onsets[onsets.length - 1];
  if (last !== undefined) {
    const n = out[last]!, chordEnd = formChord(style, seed, at + P - 1).tones.map(t => mod(t, 7));
    const ends = letter === "B" ? [1, 4] : letter === "C" ? [0] : chordEnd.filter(t => t !== 0);
    n.deg = nearest(n.deg, d => ends.includes(mod(d, 7)));
  }
  return out;
}

const phraseCache = new Map<string, (PhraseNote | null)[]>();
function phraseFor(style: MusicStyle, seed: number, letter: string): (PhraseNote | null)[] {
  const k = `${seed}|${letter}`;
  let p = phraseCache.get(k);
  if (!p) { if (phraseCache.size > 64) phraseCache.clear(); phraseCache.set(k, p = formPhrase(style, seed, letter)); }
  return p;
}

/** The music's seed for knockdown `n` of a run (0: the run's own seed). */
export const musicSeed = (base: number, n: number): number => n <= 0 ? base : Math.floor(hash2(base, 433 + n, n * 7919) * 0x7fffffff);

/** The form's note (if one starts) on the form's sixteenth `formStep`: its part, patch and MIDI note, and its length. */
export function formNoteAt(style: MusicStyle, seed: number, formStep: number): { part: string; patch: string; midi: number; dur: number; off: number; letter: string } | null {
  const F = style.form!, fs = mod(formStep, formBars(F) * 16), letter = F.order[Math.floor(fs / (F.phraseBars * 16))];
  const n = phraseFor(style, seed, letter)[fs % (F.phraseBars * 16)];
  if (!n) return null;
  const sung = letter !== "A", part = sung ? F.sung.part : formInstrument(F, seed), def = style.parts[part];
  const oct = sung ? F.sung.octave : Math.max(2, def?.octave ?? 3);
  return { part, patch: sung ? F.sung.patch : def?.patch ?? "", midi: degreeToMidi(style, style.scales[style.scale], n.deg, oct, 0), dur: n.dur, off: n.off, letter };
}

/** The section's low-pass now (Hz), at `progress` (0-1) through it. */
export function sectionCutoff(sec: SectionDef, progress: number): number {
  const c = sec.cutoff ?? 18000;
  if (typeof c === "number") return c;
  return c[0] * Math.pow(c[1] / c[0], Math.max(0, Math.min(1, progress)));
}

function hitAt(pat: string, i: number): { ch: string; dur: number } {
  const n = pat.length, ch = pat[i % n];
  let dur = 1;
  while (dur < n && pat[(i + dur) % n] === "-" && (i % n) + dur < n) dur++;
  return { ch, dur };
}

const VEL: Record<string, number> = { X: 1, x: 0.8, o: 0.45, r: 0.7, "?": 0.75 };
const BASS: Record<string, number> = { "1": 0, "2": 1, "3": 2, "5": 4, "7": 6, "8": 7 };

export interface ScoreContext {
  seed: number;
  /** 0-1: how much a soundsystem nearby is under siege (adds the style's siege parts). */
  siege: number;
  /** 0-1: how near a woken area that has joined the party is (adds the style's party parts). */
  party?: number;
  /** 0-1: how near an angry legend is (adds the style's legend parts). */
  legend?: number;
  /** In a sleeping legend's clearing (Ed, 2026-10-06): its species' layer, at `level` (0-1). */
  circle?: { species: string; level: number };
  /** The home speakers' boot (rules/musicPlan.ts bootLayers): how much has booted, 0 silent to 1 whole;
   *  in the intro, a part plays once the boot is past its `from` (its layers, one a speaker). */
  build?: number;
  /** Only the music ("main": no legend's layer) or only a legend's circle's layer ("circle"), which
   *  plays on its own clock (the music slowed in the circle, its layer not): `circleStep` its
   *  sixteenths, the music's `step` giving only the chords. Left out: both, on the music's steps. */
  only?: "main" | "circle";
  circleStep?: number;
  /** The bar the seed's form began on (0; a knockdown's new seed starts its form on a phrase line: Ed, 2026-10-09). */
  formStart?: number;
}

const VOICE_FAMILIES = (voices as unknown as { species: Record<string, { family?: string }> }).species;
/** A name's hash (a species' own pick of patterns and its melody's seed). */
const nameHash = (name: string) => { let h = 0; for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0; return h; };

/** A species' layer in its legend's clearing: every legend's parts and its voice family's, each
 *  with the pattern this species takes (so two of a family differ), as [part, use]. */
export function circleParts(style: MusicStyle, species: string): [string, { p: string; level: number }][] {
  const C = style.circle;
  if (!C) return [];
  const fam = VOICE_FAMILIES[species]?.family ?? "big", h = nameHash(species), out: [string, { p: string; level: number }][] = [];
  for (const [name, u] of [...Object.entries(C.every), ...Object.entries(C.families[fam] ?? C.families.big ?? {})]) {
    const ps = Array.isArray(u.p) ? u.p : [u.p];
    out.push([name, { p: ps[(h + nameHash(name)) % ps.length], level: u.level ?? 1 }]);
  }
  return out;
}

/** Every note starting on sixteenth `step` (absolute), in the block `plan`; `next` is the plan of
 *  the block after this bar (for the fill), when this bar is the block's last. */
export function notesAt(style: MusicStyle, plan: BlockPlan, next: BlockPlan | null, step: number, ctx: ScoreContext): NoteEvent[] {
  const bar = Math.floor(step / 16), s = step - bar * 16, barIn = bar - plan.start;
  const sec = resolveSection(style, plan.section), a = arcStep(style, plan.arc);
  const scale = style.scales[style.scale], transpose = 0; // (one scale for the whole run: Ed, 2026-10-09)
  const progress = (barIn + s / 16) / Math.max(1, plan.bars), pass = plan.pass ?? 0;
  // the form's chords (Ed, 2026-10-09: the 32-bar ABAC form), or, with none, the section's own, a step on each pass round the loop
  const formBar = bar - (ctx.formStart ?? 0), form = style.form;
  const chord = form ? formChord(style, ctx.seed, formBar, !!sec.sevenths) : chordAt(style, sec, a, barIn + pass * Math.max(1, sec.chordBars));
  let melody = 0; // (the form's melody: the loudest of the melodic parts playing here)
  // a long block (the boot's intro, up to five minutes) turns a new phrase every 16 bars: new melodies, its ? hits falling anew
  const phrase = pass + (plan.bars > 32 ? Math.floor(barIn / 16) : 0);
  const out: NoteEvent[] = [];
  // the last bar before a new section: a fill, and the last beat's mutes
  const ending = next !== null && (next.section !== plan.section || next.start !== plan.start) ? sec.ending ?? "fill" : "none";
  const fillBar = ending === "fill";
  const muted = ending !== "none" && s >= 12 ? style.fill.mute : [];
  const onlyCircle = ctx.only === "circle";
  const parts: [string, PartUse, number][] = onlyCircle ? [] : Object.entries(sec.parts).map(([k, u]) => [k, u, 1]);
  if (onlyCircle) { /* (the layer alone) */ } else if (ctx.siege > 0.01) for (const [k, u] of Object.entries(style.siege)) parts.push([k, u, ctx.siege]);
  if ((ctx.party ?? 0) > 0.01) for (const [k, u] of Object.entries(style.party ?? {})) if (!sec.parts[k]) parts.push([k, u, ctx.party!]);
  if ((ctx.legend ?? 0) > 0.01) for (const [k, u] of Object.entries(style.legend ?? {})) if (!sec.parts[k]) parts.push([k, u, ctx.legend!]);
  // the boot's intro: nothing before the first speaker, then a layer a speaker (other sections build as they always did)
  const build = ctx.build ?? 1, building = ctx.build !== undefined && plan.section === style.intro;
  const circle = ctx.circle && ctx.circle.level > 0.01 && ctx.only !== "main" ? ctx.circle : null, layer = new Set<string>();
  if (circle) for (const [k, u] of circleParts(style, circle.species)) if (!sec.parts[k]) { parts.push([k, u, circle.level]); layer.add(k); }
  if (fillBar && !onlyCircle) parts.push([style.fill.part, { p: "__fill" }, 1]);
  for (const [name, u0, scaleLevel] of parts) {
    const def = style.parts[name];
    if (!def) continue;
    const u = use(u0);
    const own = layer.has(name);
    if (!own && (building ? build <= 0 || build < u.from : progress < u.from)) continue;
    if (!own && (a.energy < u.energy || muted.includes(name))) continue;
    if (form && !own && def.role === "motif") { melody = Math.max(melody, u.level * scaleLevel * (building ? 0.45 + 0.55 * build : 1)); continue; }
    // in a fill bar, the fill part plays the fill instead of its pattern
    if (fillBar && name === style.fill.part && u.p !== "__fill") continue;
    const pat = u.p === "__fill" ? style.fill.pattern : def.patterns[u.p];
    if (!pat) continue;
    // a legend's layer, its species' own: its rhythm placed its own way, its melody from its own
    // chord tone and in its own octave (still the music's chords, so it sits in with them)
    const sh = own ? nameHash(circle!.species) : 0, phase = own ? (sh % 8) * 2 : 0;
    const at = own && ctx.circleStep !== undefined ? ctx.circleStep : barIn * 16 + s; // (the layer on its own clock, or the music's)
    const i = (at + phase) % pat.length;
    const { ch, dur } = hitAt(pat, i);
    if (ch === "." || ch === "-") continue;
    const seed = own ? ctx.seed + nameHash(circle!.species) : ctx.seed; // (a legend's layer its species' own melody)
    const r = hash2(own && ctx.circleStep !== undefined ? ctx.circleStep : step, plan.arc * 131 + name.length * 17 + name.charCodeAt(0), seed + phrase * 7919);
    if (ch === "?" && r >= a.energy) continue;
    const level = u.level * scaleLevel * (0.94 + 0.06 * r) * (building && !own ? 0.45 + 0.55 * build : 1); // (the boot's few speakers quieter, filling out to the twelfth)
    const base = { part: name, patch: def.patch, step: own && ctx.circleStep !== undefined ? ctx.circleStep : step, offset: 0, dur, ...(own ? { layer: "circle" as const } : {}) };
    if (def.role === "drum") {
      if (ch === "r") { out.push({ ...base, dur: 0.5, midi: null, vel: 0.6 * level }, { ...base, offset: 0.5, dur: 0.5, midi: null, vel: 0.75 * level }); continue; }
      out.push({ ...base, midi: null, vel: (VEL[ch] ?? 0.8) * level });
      continue;
    }
    const oct = def.octave ?? 0, accent = ch === ch.toUpperCase() && ch !== ch.toLowerCase() ? 1 : s % 4 === 0 ? 0.9 : 0.78;
    if (def.role === "bass") {
      const k = BASS[ch] ?? (ch.toLowerCase() === "x" ? 0 : BASS[ch.toLowerCase()] ?? 0);
      out.push({ ...base, midi: degreeToMidi(style, scale, chord.root + k, oct, transpose), vel: (ch in BASS ? 0.85 : VEL[ch] ?? 0.85) * level });
    } else if (def.role === "chord") {
      for (const t of chord.tones) out.push({ ...base, midi: degreeToMidi(style, scale, t, oct, transpose), vel: (VEL[ch] ?? accent) * level });
    } else if (def.role === "arp") {
      let k = 0; // the hits so far this bar
      const b0 = at - (at % 16);
      for (let j = b0; j < at; j++) { const c = pat[(j + (own ? phase : 0)) % pat.length]; if (c !== "." && c !== "-") k++; }
      const n = chord.tones.length, t = chord.tones[k % n] + 7 * (Math.floor(k / n) % 2);
      out.push({ ...base, midi: degreeToMidi(style, scale, t, oct, transpose), vel: (VEL[ch] ?? accent) * level });
    } else {
      const m = motifFor(seed + phrase * 104729, plan.arc, name), pos = ((at % 64) + (own ? sh % 29 : 0)) % 32; // (a new melody each pass or phrase)
      const vary = barIn % 4 === 3 && s >= 8 ? (hash2(bar, plan.arc, ctx.seed + 5) < 0.5 ? 2 : -1) : 0; // every fourth bar ends differently
      const lift = own ? [0, 2, 4][(sh >>> 3) % 3] : 0, octOwn = own ? oct + ((sh >>> 5) % 2) - (oct > 2 ? 1 : 0) : oct;
      out.push({ ...base, midi: degreeToMidi(style, scale, chord.root + m[pos] + vary + lift, octOwn, transpose), vel: (VEL[ch] ?? accent) * level });
    }
  }
  if (onlyCircle) return out;
  // the form's melody: A on its instrument, B and C sung
  const fn = melody > 0 ? formNoteAt(style, ctx.seed, formBar * 16 + s) : null;
  if (fn) out.push({ part: fn.part, patch: fn.patch, step, offset: fn.off, dur: fn.dur, midi: fn.midi, vel: (s % 4 === 0 && !fn.off ? 0.9 : 0.78) * melody, ...(fn.dur % 1 ? { straight: true } : {}) });
  // the section's own events: a crash on its first beat, a riser over a build (one note a bar)
  if (s === 0 && barIn === 0 && sec.impact && style.patches.impact) out.push({ part: "impact", patch: "impact", step, offset: 0, dur: 16, midi: null, vel: 1 });
  if (s === 0 && sec.riser && style.patches.riser) out.push({ part: "riser", patch: "riser", step, offset: 0, dur: 16, midi: null, vel: 1, from: barIn / plan.bars, to: (barIn + 1) / plan.bars });
  return out;
}

/** The style's problems (empty when it's sound): every section, part, pattern and patch named exists,
 *  patterns run whole bars, and every section's length in the arc is a whole number of blocks. */
export function checkStyle(style: MusicStyle): string[] {
  const errs: string[] = [], B = style.blockBars;
  const checkUse = (where: string, name: string, u: PartUse) => {
    const def = style.parts[name];
    if (!def) { errs.push(`${where}: no part "${name}"`); return; }
    const p = use(u).p;
    if (!def.patterns[p]) errs.push(`${where}: part "${name}" has no pattern "${p}"`);
  };
  for (const [n, d] of Object.entries(style.parts)) {
    if (!style.patches[d.patch]) errs.push(`part ${n}: no patch "${d.patch}"`);
    for (const [pn, p] of Object.entries(d.patterns)) if (p.length % 16 !== 0) errs.push(`part ${n}, pattern ${pn}: ${p.length} steps, not whole bars`);
  }
  for (const n of Object.keys(style.sections)) {
    try {
      const r = resolveSection(style, n);
      for (const [pn, u] of Object.entries(r.parts)) checkUse(`section ${n}`, pn, u);
      const prog = r.progression;
      if (prog && !style.progressions[prog]) errs.push(`section ${n}: no progression "${prog}"`);
    } catch (e) { errs.push(String((e as Error).message)); }
  }
  for (const [pn, u] of Object.entries(style.siege)) checkUse("siege", pn, u);
  for (const [pn, u] of Object.entries(style.party ?? {})) checkUse("party", pn, u);
  for (const [pn, u] of Object.entries(style.legend ?? {})) checkUse("legend", pn, u);
  const circleUses = [...Object.entries(style.circle?.every ?? {}), ...Object.values(style.circle?.families ?? {}).flatMap(f => Object.entries(f))];
  for (const [pn, u] of circleUses) for (const p of Array.isArray(u.p) ? u.p : [u.p]) checkUse("circle", pn, { p });
  if (style.fill.pattern.length !== 16) errs.push("fill: not one bar");
  if (!style.parts[style.fill.part]) errs.push(`fill: no part "${style.fill.part}"`);
  for (const n of [style.intro, style.knockout]) if (!style.sections[n]) errs.push(`no section "${n}"`);
  if (!style.scales[style.scale]) errs.push(`no scale "${style.scale}"`);
  const F = style.form;
  if (F) {
    for (const n of [...F.a, ...F.b]) if (!style.progressions[n]) errs.push(`form: no progression "${n}"`);
    for (const n of F.instruments) if (!style.parts[n]) errs.push(`form: no part "${n}"`);
    if (!style.patches[F.sung.patch]) errs.push(`form: no patch "${F.sung.patch}"`);
    const tripletsWhole = (c: string) => [...c].every((ch, i) => ch !== "T" && ch !== "t" || c.slice(i + 1, i + (ch === "T" ? 8 : 4)) === "_".repeat(ch === "T" ? 7 : 3))
      && [...c].filter(ch => ch === "_").length === [...c].reduce((n, ch) => n + (ch === "T" ? 7 : ch === "t" ? 3 : 0), 0);
    for (const [k, cs] of [...Object.entries(F.cells), ...Object.entries(F.cadence)]) for (const c of cs) {
      if (c.length !== 16 || c[0] === "-" || c[0] === "_" || /[^x\-._Tt]/.test(c)) errs.push(`form: cell ${k} "${c}" not one bar`);
      else if (!tripletsWhole(c)) errs.push(`form: cell ${k} "${c}": a triplet without its _s`);
    }
    for (const c of Object.values(F.cadence).flat()) if (!c.endsWith(".")) errs.push(`form: cadence "${c}" doesn't end on a rest`);
  }
  style.arc.forEach((a, i) => {
    for (const [s, bars] of [...(a.arrive ?? []), ...(a.loop ?? []), ...(a.variants ?? []).flat(), [a.build, a.buildBars ?? style.buildBars] as [string, number]]) {
      if (!style.sections[s]) errs.push(`arc ${i} (${a.name}): no section "${s}"`);
      if (!(bars > 0) || bars % B !== 0) errs.push(`arc ${i} (${a.name}): ${s} is ${bars} bars, not a multiple of ${B}`);
    }
    const S = a.sections;
    if (S) {
      if (!F) errs.push(`arc ${i} (${a.name}): sections without a form`);
      if (!S.four.length || !S.breaks.length || !S.breakdown.length) errs.push(`arc ${i} (${a.name}): a kind of section missing`);
      for (const s of [S.land, ...S.four, ...S.breaks, ...S.breakdown]) if (s !== undefined && !style.sections[s]) errs.push(`arc ${i} (${a.name}): no section "${s}"`);
    } else if (!a.loop?.length || (a.variants ?? []).some(v => !v.length)) errs.push(`arc ${i} (${a.name}): nothing to loop`);
    if (a.progression && !style.progressions[a.progression]) errs.push(`arc ${i} (${a.name}): no progression "${a.progression}"`);
  });
  return errs;
}
