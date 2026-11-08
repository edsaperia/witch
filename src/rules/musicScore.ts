// The music's score (Ed, 2026-10-04: generative music, in code, like the art): what each part
// plays on each sixteenth, from the style file (config/music-style.json) and the section the
// conductor (rules/musicPlan.ts) has chosen. Numbers only, no sound: src/platform/audio/musicEngine.ts
// plays the notes. The same seed and section always give the same notes.
import { hash2 } from "./random";
import voices from "../../config/creature-voices.json";
import { sectionOf } from "./creatureConfig";
import type { CuratedStep, FamilyDef, SetDef } from "./musicSet";
import { bassBar, beatMotif, cellNotes, composeLine, contourAt, motifShape, pickContour, varyCell, type BassNote, type ComposeDef, type LineRules, type LineSlot } from "./musicCompose";

/** A synth patch: how one part sounds. Every field but kind and gain is optional. */
export interface Patch {
  /** kick: a falling sine; noise: filtered noise (hats, claps, shakers, snaps); snare: noise and a
   *  tone; synth: oscillators through a filter; bell: two square tones (a cowbell, pitched);
   *  riser: noise swept up over a build; impact: a noise burst and a falling sub; voice: a sung
   *  note, synthesised (a buzz through vowel formants, vibrato, breath). */
  kind: "kick" | "noise" | "snare" | "synth" | "voice" | "bell" | "riser" | "impact" | "fof" | "sample" | "tract";
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
  /** synth (the Music Studio's knobs, 2026-10-22; each optional, a patch without them as before): each wave's level (0-1) and
   *  semitones above the note; a "custom" wave's harmonics (each one's level, the fundamental first); a sine an octave down
   *  and white noise beside the oscillators (levels); FM, a sine at fmRatio times the note bending each oscillator by fmIndex
   *  times the note, falling to fmSustain of that over fmDecay seconds (none: steady). */
  levels?: number[];
  semis?: number[];
  harmonics?: number[];
  sub?: number;
  noise?: number;
  fmRatio?: number; fmIndex?: number; fmDecay?: number; fmSustain?: number;
  /** synth: the filter's own envelope (any of them set): up from cutoff to cutoff + envAmt over fAttack, down to fSustain (0-1)
   *  of the way over fDecay, back over fRelease once the note ends; and a second filter after it, fixed (filter2 at cutoff2, q2). */
  fAttack?: number; fDecay?: number; fSustain?: number; fRelease?: number;
  filter2?: BiquadFilterType; cutoff2?: number; q2?: number;
  /** synth: the filter wobble's wave (sine by default); a vibrato (vibDepth cents at vibRate Hz, in after vibDelay s); a
   *  tremolo (tremDepth 0-1 at tremRate Hz). */
  lfoWave?: OscillatorType;
  vibRate?: number; vibDepth?: number; vibDelay?: number;
  tremRate?: number; tremDepth?: number;
  /** voice: the vowels it sings in turn (ah, oh, oo, eh, ee), their formants scaled by formantShift,
   *  vibrato depth in cents, and how much breath (noise). */
  vowels?: string[];
  /** voice: sixteenths a vowel lasts before the next (4, a beat; 1: a new vowel each note, the soprano's). */
  vowelStep?: number;
  formantShift?: number;
  vibrato?: number;
  breath?: number;
  /** The FOF singing voice (kind "fof": Mike Olsen's pm.SFFormantModelFofSmooth, platform/audio/fof; Ed, 2026-10-11): its
   *  type (alto, bass, countertenor, soprano, tenor), its unison's detune (cents), its vibrato's depth (cents here; the
   *  formant voice's are its own), rate (Hz) and delay (s), and an octave-up double's level (formants kept). Its vowels morph
   *  note to note (and to the next within a long note); `vibrato`, `breath`, `attack` and `release` as above. */
  voiceType?: string;
  /** A recorded voice (kind "sample": Ed, 2026-10-11, the game's singer): the recording (samples/voices/<sample>.ogg, given to
   *  the engine as it loads), the MIDI note it sings (measured), retuned to each note like a sampler, and a presence lift (dB
   *  at 3 kHz). The formant voice sings its notes until it's loaded. */
  sample?: string;
  root?: number;
  /** A sample set (Ed's singer review, 2026-10-14: the alto's, every two semitones with the formants kept): each recording
   *  and the MIDI note it sings; a note plays the nearest, bent at most a semitone. With none, `sample` at `root` plays every note.
   *  A recording with a `vowel` sings it itself (Ed, 2026-11-08: Chimera's set, "ah" and "ooh" on every semitone): a note takes
   *  the nearest of its vowel's (the patch's `vowels` in turn), unfiltered; those without are filtered to the vowel. */
  notes?: { midi: number; sample: string; vowel?: string }[];
  presence?: number;
  /** A consonant opening each note ("l": Ed, 2026-10-11, "Can it go laa?"), shaped by a filter opening over its first moment. */
  onset?: string;
  /** A sampled note's swell (Ed, 2026-10-14: "more dynamic range"): the share of each note rising from nothing and the share
   *  fading to it (0 the old 30 ms ramp); `breath` on a sampled voice is breath noise under every note at this level. */
  swell?: number;
  /** A recording's first seconds skipped (its onset: the woman's note starts 20 cents under its pitch for a quarter second, so
   *  a short note read from its start sang flat). */
  skip?: number;
  /** The vocal-tract voice (kind "tract": Pink Trombone's physics in a worklet, platform/audio/tract; Ed, 2026-10-14): the tract's
   *  length (44 a man's, 36 a soprano's, 40 an alto's), tenseness from a note's start to its body (0 breathy to 1 clear), how
   *  long after a note's start the vibrato creeps in (s), the tongue's `glide` (the synth's knob, in seconds); `vibrato` here a
   *  share of the pitch, `vibratoRate` Hz, `breath` 0 to 1 lowering the tenseness (more aspiration). */
  tractLength?: number;
  tense?: [number, number];
  vibratoAfter?: number;
  /** The tract voice's share of the model's own slow pitch drift (1 as Pink Trombone has it; 0 none). */
  wander?: number;
  vibratoRate?: number;
  vibratoDelay?: number;
  octave?: number;
  /** The part's channel: a high-pass (Hz) to keep the low end clear, and its place left (-1) to right (1). */
  hp?: number;
  pan?: number;
  /** sends 0-1, and whether the kick ducks it (the house pump). */
  reverb?: number; delay?: number; duck?: boolean;
}

/** A part: a voice and its patterns. Patterns are 16 characters a bar (any whole number of bars):
 *  "." rest, "x" a hit, "X" an accent, "o" a ghost, "?" a hit as likely as the wave's energy, "r" a
 *  roll (two thirty-seconds), "-" holds the note before. Bass patterns name chord tones instead of
 *  x: "1" root, "2" the step above (a clash), "3", "5", "7", "8" the octave; "a" (the composer's, on a bar's last beat) steps
 *  into the next bar's chord from a step above or below or its fifth, the root when the chord stays (the old rules: the root). */
export interface PartDef {
  patch: string;
  /** drum: unpitched; bass: the pattern's chord tones; chord: the whole chord; arp: chord tones in
   *  turn up two octaves; motif: the run's seeded melody. */
  role: "drum" | "bass" | "chord" | "arp" | "motif";
  /** Octaves above the style's root. */
  octave?: number;
  /** bass: its chord tones counted from the key's own root, not the chord's (the haunted drop's sub, on the drone's root). */
  tonic?: boolean;
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
  /** Semitones above its stage's key (a lift: the victory's), still in the style's one scale. */
  transpose?: number;
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
  /** Semitones above the style's root: the stage's key (its scale is the style's one, dorian: Ed, 2026-10-09, "Keep it all
   *  in the dorian"; the key changes between stages stay). */
  transpose?: number;
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
  /** A night's set (rules/musicSet.ts; Ed, 2026-10-11: "Each night should be a full set"): the step's own mode (a breakdown
   *  dropping to a darker one; the style's scale if none), the instrument its melody's A plays on (the form's seeded pick if
   *  none), its singer for B and C (a voice patch, or "none": the A instrument plays them too), the patch its bass parts
   *  play on, a salt for its tune (new melodies and chords each wave), and what the planner made of it. */
  scale?: string;
  lead?: string;
  vocal?: string;
  bass?: string;
  tune?: number;
  family?: string;
  role?: string;
}

/** A part in a legend's clearing layer: its pattern (or patterns, one taken by the species) and level. */
export interface CircleUse { p: string | string[]; level?: number }

export interface MusicStyle {
  name: string;
  notes?: string;
  /** The night's tempo (beat.bpm), the same every wave (Ed, 2026-11-03): no step of the arc has its own. */
  bpm: number;
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
  /** The section an island's victory plays (the prototype builder's "victory" cue: the lap and the win). */
  victory?: string;
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
  /** A night's set (rules/musicSet.ts; Ed, 2026-10-11): the genre families a night's arc is dealt from, the set's rules, and
   *  the first home night, hand-picked. The `arc` below plays without them (the labs, a style without a set). */
  families?: Record<string, FamilyDef>;
  /** The voice line's ethereal effects (platform/audio/voiceFx.ts; Ed, 2026-10-11): each a level 0 (off) to 1, on the form's
   *  sung part and the parts listed in `parts`. None: the voice dry, as before. */
  voiceFx?: { parts?: string[]; chorus?: number; saturation?: number; air?: number; delay?: number; hall?: number; shimmer?: number; duck?: number; swells?: number; freeze?: number; whisper?: number; octave?: number };
  /** The processed chain (Ed, 2026-10-14: "two chains by place"): the sung part's effects while the night's family is one of
   *  `families` (the dark ones: witch house, phonk, industrial...), over `voiceFx` for the rest. */
  voiceFxDark?: MusicStyle["voiceFx"] & { families?: string[] };
  set?: SetDef;
  curated?: { island: string; waves: number; steps: CuratedStep[] };
  arc: ArcStep[];
  /** The haunted treatment (Ed, 2026-11-08: "B, 1-6"): the quiet sections and the legends' clearings made more like the
   *  vocalise demo he liked. */
  haunted?: HauntedDef;
  /** The composer's rules for the melodies and basslines (Ed, 2026-11-08: "smarter rules"; rules/musicCompose.ts). None, or
   *  off: the melodies' seeded walk and the basslines' one bar as before. */
  compose?: ComposeDef;
}

/** The haunted treatment (Ed, 2026-11-08, choosing "B, 1-6": all six of the ways to bring the music closer to the haunting
 *  vocalise demo, in the quiet sections and a sleeping legend's clearing layer; docs/notes/music.md **Haunted**). */
export interface HauntedDef {
  /** The whole treatment on (the default) or off (the music as before: tuning music.haunted, ?haunted=0, the Music Lab). */
  on?: boolean;
  /** The quiet sections it plays in (wherever they fall: a breakdown, or a calm family's breaks or four). */
  sections: string[];
  /** 1. Space: the voice's own long dark reverb (the demo's: a pink-noise impulse `time` s long decaying as exp(-decay t),
   *  band-passed `low` to `high` Hz), `wet` its send in these sections; a clearing's layer takes the same impulse. */
  verb: { time: number; decay: number; low: number; high: number; wet: number };
  /** 2. Room to breathe: the sung line's half-phrase rhythms here (whole notes and ties, rests at their ends: each half a
   *  phrase long, 16 sixteenths a bar, x a note, - held, . a rest), and the drop: no drums for `afterBars` (at most half the
   *  section, on a 4-bar line), then drum & bass (Ed, 2026-11-08: "make it a drop - no drums, and then drum and bass kicks
   *  in"): `parts` over the section's (null takes one out), a riser over the last `riserBars` before it and an impact on it. */
  rhythms: string[];
  drop: { afterBars: number; riserBars: number; impact: boolean; /** the section's low-pass opened to this (Hz) from the drop */ cutoff?: number; parts: Record<string, PartUse | null> };
  /** 3. The ghost voice: each sung note again `interval` scale steps away (-5 a sixth below, -2 a third), `delay` s late, at
   *  `gain` of its level, low-passed at `lowpass` Hz, panned to `pan`, on `vowel`; in place of the breakdown's wash. A clearing's
   *  lead part is ghosted the same way at `circle.ghost` of its level. */
  ghost: { interval: number; delay: number; gain: number; lowpass: number; pan: number; vowel?: string };
  /** 4. The drone: the key's root, its fifth (`fifth` of the root's level) and the octave (`octaveUp`), `octave` octaves over the
   *  style's root, each a sine a side `detune` cents apart, each swelling at its own `swell` Hz by `swellDepth`, fading in over
   *  `attack` s, at `gain`; under a clearing's layer at `circle` of that. */
  drone: { gain: number; octave: number; fifth: number; octaveUp: number; detune: number; swell: number[]; swellDepth: number; attack: number; circle: number };
  /** 5. The scale's colour (Ed, 2026-11-08: notes outside dorian here only): the sung line's 2nd flattened (Phrygian) or its
   *  7th raised (harmonic minor's leading tone), a cadence's notes with this chance, any other note with `colourElse`. */
  colour: number;
  colourElse: number;
  /** 6. The voice in front: its level lifted by `lift` dB and its presence (3 kHz) by `presence` dB in these sections. */
  voice: { lift: number; presence: number };
  /** A clearing's layer: its reverb's send (×) and its ghost's level. */
  circle: { wet: number; ghost: number };
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
  sung: {
    part: string; patch: string; octave: number;
    /** Where the voice sings (Ed, 2026-10-14: in breakdowns and builds, not the drops; the A instrument plays the rest):
     *  "breakdown" (the arc step's breakdown sections), "build" (its build). None: B and C sung wherever they fall, as before. */
    where?: ("breakdown" | "build")[];
    /** The returning hook (Ed, 2026-10-14): the sung phrase's first bars dealt from the night's own seed, so every wave's
     *  breakdown opens on the same motif while the rest is the wave's own. */
    hookBars?: number;
    /** The breakdown's wash (Ed, 2026-10-14: three voices, Julianna Barwick's layers): each sung note doubled at these
     *  scale steps up (4 a fifth, 7 an octave: always in the key), at this share of its level, this many steps late. */
    wash?: { intervals: number[]; level: number; late: number };
    /** The Music Lab's voice test (Ed, 2026-10-14: "the voice and its effects singing constant arpeggios"): the voice sings
     *  the chord's tones up and down within the range, a note every `rate` sixteenths (2, eighths), in every section, in
     *  place of the form's melodies and the hold; no wash. Never set in the game's style. */
    arpeggio?: boolean | { rate?: number };
  };
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
  /** A hook's (ctx.siege, ctx.party, ctx.legend): a part added by how near the game's goings-on are, played live while the rest
   *  is drawn ahead (docs/notes/music.md "Music ahead"). */
  hook?: "siege" | "party" | "legend";
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
  /** A sung note's effects chain (the style's voiceFx or voiceFxDark), by the night's family. */
  fx?: "pure" | "dark";
  /** A wash voice: this note doubles a sung note a fifth or an octave up (the breakdown's three voices). */
  double?: true;
  /** The haunted ghost voice (HauntedDef.ghost): a sung note again, below, late, quieter, low-passed and panned away. */
  ghost?: true;
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

/** The haunted treatment, when it's on (Ed, 2026-11-08: "B, 1-6"). */
export const hauntedOn = (style: MusicStyle): HauntedDef | null => (style.haunted && style.haunted.on !== false ? style.haunted : null);
/** Whether a section is one of the haunted quiet ones (with the treatment on). */
export const isHaunted = (style: MusicStyle, section: string): boolean => !!hauntedOn(style)?.sections.includes(section);
/** The bar (into a haunted section) its drum & bass drops on: `afterBars`, at most half the section, on a block line; Infinity
 *  for none (a section too short to have a quiet half and a drop). */
export function hauntedDrop(style: MusicStyle, bars: number): number {
  const H = style.haunted, B = Math.max(1, style.blockBars);
  if (!H) return Infinity;
  const at = Math.floor(Math.min(H.drop.afterBars, bars / 2) / B) * B;
  return at >= B && at < bars ? at : Infinity;
}
/** The form's bar whose chord a haunted section plays in form bar `formBar` (slower chords: a phrase's opening chord through its
 *  first half, its cadence chord, the question or the answer, through its second), so the phrases still land on their lines. */
export function hauntedBar(F: FormDef, formBar: number): number {
  const P = F.phraseBars, cb = Math.max(1, F.chordBars), inP = ((formBar % P) + P) % P;
  return formBar - inP + (inP < P / 2 ? 0 : Math.max(0, P - cb));
}
/** The semitones a haunted note's scale step is coloured by (Ed, 2026-11-08, notes outside dorian in the haunted places only):
 *  -1 its 2nd flattened (Phrygian ♭2), +1 its minor 7th raised (the leading tone), 0 as it is; `r` a seeded 0-1, a cadence's
 *  note at the style's `colour` chance, another at `colourElse`. */
export function hauntedColour(style: MusicStyle, scale: number[], deg: number, cadence: boolean, r: number): number {
  const H = style.haunted;
  if (!H || r >= (cadence ? H.colour : H.colourElse)) return 0;
  const d = ((deg % scale.length) + scale.length) % scale.length;
  return d === 1 && scale[1] === 2 ? -1 : d === 6 && scale[6] === 10 ? 1 : 0;
}
const HAUNT_AS = new WeakMap<MusicStyle, MusicStyle>();
/** The style with the haunted treatment on or off (tuning music.haunted, ?haunted=0, the Music Lab's A/B); the style itself when
 *  it already is, or has none. */
export function withHaunted(style: MusicStyle, on: boolean | undefined): MusicStyle {
  if (on === undefined || !style.haunted || (style.haunted.on !== false) === on) return style;
  let out = HAUNT_AS.get(style);
  if (!out) HAUNT_AS.set(style, (out = { ...style, haunted: { ...style.haunted, on } }));
  return out;
}

/** The composer, when it's on (Ed, 2026-11-08: "smarter rules"). */
export const composeOn = (style: MusicStyle): ComposeDef | null => (style.compose && style.compose.on !== false ? style.compose : null);
const MEL_AS = new WeakMap<MusicStyle, MusicStyle>();
/** The style with the composer's melodies and basslines ("new") or the old ones ("old": tuning music.melody, ?melody=old), to
 *  A/B; the style itself when it already is, or has no composer. */
export function withMelody(style: MusicStyle, mode: string | undefined): MusicStyle {
  if ((mode !== "old" && mode !== "new") || !style.compose || (style.compose.on !== false) === (mode === "new")) return style;
  let out = MEL_AS.get(style);
  if (!out) MEL_AS.set(style, (out = { ...style, compose: { ...style.compose, on: mode === "new" } }));
  return out;
}

const use = (u: PartUse) => (typeof u === "string" ? { p: u, level: 1, from: 0, energy: 0 } : { p: u.p, level: u.level ?? 1, from: u.from ?? 0, energy: u.energy ?? 0 });

/** The singers a link can pick instead of the style's (`?singer=`, tuning music.singer; Ed, 2026-11-08: Chimera sings, the old
 *  voices kept to A/B): a link value to its sung patch. */
export const SINGERS: Record<string, string> = { recorded: "recordedVoice", sampled: "altoSampled" };
const SUNG_AS = new WeakMap<MusicStyle, Map<string, MusicStyle>>();
/** The style with `patch` singing wherever its own singer (the form's sung patch) does: the form, the set's and the families'
 *  voices, the hand-picked night's steps and the arc (a night's, made from the set). The same object for the same pair; the style
 *  itself for no patch, an unknown one or its own. */
export function withSinger(style: MusicStyle, patch: string | undefined): MusicStyle {
  const own = style.form?.sung.patch;
  if (!patch || !own || patch === own || !style.patches[patch]) return style;
  let m = SUNG_AS.get(style);
  if (!m) SUNG_AS.set(style, (m = new Map()));
  let out = m.get(patch);
  if (out) return out;
  const swap = <T extends string | undefined>(v: T): T => (v === own ? patch : v) as T;
  out = {
    ...style, form: { ...style.form!, sung: { ...style.form!.sung, patch } },
    arc: style.arc.map(a => (a.vocal === own ? { ...a, vocal: patch } : a)),
    ...(style.set ? { set: { ...style.set, vocals: style.set.vocals.map(swap) } } : {}),
    ...(style.families ? { families: Object.fromEntries(Object.entries(style.families).map(([k, f]) => [k, f.vocals ? { ...f, vocals: f.vocals.map(swap) } : f])) } : {}),
    ...(style.curated ? { curated: { ...style.curated, steps: style.curated.steps.map(c => ({ ...c, vocal: swap(c.vocal) })) } } : {}),
  };
  m.set(patch, out);
  return out;
}

/** The scale degree (0 the root) of a chord tone or a melody's step, as a MIDI note. */
export function degreeToMidi(style: MusicStyle, scale: number[], degree: number, octave: number, transpose: number): number {
  const n = scale.length, o = Math.floor(degree / n), d = degree - o * n;
  let m = style.root + transpose + 12 * (octave + o) + scale[d];
  while (m > 96) m -= 12; // nothing shrill: the top folds down an octave
  return m;
}

/** The run's melody for an arc step and part: one value per sixteenth over two bars, scale steps
 *  above the chord's root, a seeded walk that leans on chord tones on the strong steps (the old rules: composedMotif is the
 *  composer's). */
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

/** The composer's motif for an arc step and part (Ed, 2026-11-08: "smarter rules"): as `motif`, one value a sixteenth over two
 *  bars above the chord's root, but planned: the beats chord tones on a contour with one peak, the second bar the first moved or
 *  turned over, passing and neighbour notes between (musicCompose.ts beatMotif). */
export function composedMotif(C: ComposeDef, seed: number, arc: number, part: string): number[] {
  let salt = 0;
  for (let i = 0; i < part.length; i++) salt = (salt * 31 + part.charCodeAt(i)) | 0;
  return beatMotif(C, k => hash2(seed + k * 7919, arc, salt + 3));
}

const motifCache = new Map<string, number[]>();
function motifFor(style: MusicStyle, seed: number, arc: number, part: string): number[] {
  const C = composeOn(style), k = `${seed}|${arc}|${part}|${C ? "c" : ""}`;
  let m = motifCache.get(k);
  if (!m) { if (motifCache.size > 256) motifCache.clear(); motifCache.set(k, m = C ? composedMotif(C, seed, arc, part) : motif(seed, arc, part)); }
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
export interface PhraseNote { deg: number; dur: number; off: number; /** a half-phrase's last two notes (the haunted colour's cadences) */ cad?: true }

/** One phrase of the form for a seed: a note or null (a rest or a held note) on each of its sixteenths. A seeded walk
 *  over the form's chords, landing on chord tones on the beats, in bar-long rhythm cells (mostly slow: whole notes, halves and triplets; its part's `pace` of them busier)
 *  (the 2nd half-phrase's echoing the 1st's now and then), each half-phrase ending on rests; A ends open (a chord tone
 *  not the root), B on a question (the 2nd or 5th), C answering it on the root. With the composer on (the style's `compose`,
 *  the default since Ed's "smarter rules", 2026-11-08), composedPhrase's planned phrase in the walk's place; off, the walk. */
export function formPhrase(style: MusicStyle, seed: number, letter: string, hookSeed?: number): (PhraseNote | null)[] {
  const C = composeOn(style);
  return C ? composedPhrase(style, C, seed, letter, hookSeed) : walkedPhrase(style, seed, letter, hookSeed);
}

/** The old phrase (the composer off: ?melody=old): a seeded walk over the chords, as formPhrase describes. */
function walkedPhrase(style: MusicStyle, seed: number, letter: string, hookSeed?: number): (PhraseNote | null)[] {
  const F = style.form!, P = F.phraseBars, salt = letter.charCodeAt(0) * 13;
  const sungLetter = letter !== "A", part = sungLetter ? F.sung.part : formInstrument(F, seed), pace = F.pace[part] ?? F.pace.default ?? 0.25;
  const at = F.order.indexOf(letter) * P; // (its chords: its first place in the form)
  // the returning hook (Ed, 2026-10-14): a sung phrase's first `hookBars` bars dealt from the night's own seed, so every
  // wave's breakdown opens on the same motif while the rest of the phrase is the wave's own
  const hookBars = sungLetter && hookSeed !== undefined && hookSeed !== seed ? F.sung.hookBars ?? 0 : 0;
  const sd = (b: number) => b < hookBars ? hookSeed! : seed;
  const rhythm: string[] = [];
  for (let b = 0; b < P; b++) {
    const r = hash2(sd(b) + b * 31, 419, salt), half = Math.floor(P / 2), kind = hash2(sd(b) + b * 17, 423, salt) < pace ? "mid" : "slow";
    if (b % half === half - 1) rhythm.push(pick(F.cadence[kind], r));
    else if (b >= half && hash2(sd(b) + b, 421, salt) < 0.5) rhythm.push(rhythm[b - half]); // (the answer echoing the call)
    else rhythm.push(pick(F.cells[kind], r));
  }
  const [lo, hi] = F.range, out: (PhraseNote | null)[] = new Array(P * 16).fill(null), onsets: number[] = [];
  // the sung line (Ed, 2026-10-14: "narrow and stepwise"): within a fifth, a window of SPAN scale steps set by the seed inside
  // the range (always holding a root, so C can answer on it), steps and thirds only; the instrument's A walks the whole range
  const SPAN = 4, mod7 = (d: number) => mod(d, 7);
  const windows: number[] = [];
  for (let w = lo; w + SPAN <= hi; w++) if (Array.from({ length: SPAN + 1 }, (_, k) => w + k).some(d => mod7(d) === 0)) windows.push(w);
  const wlo = sungLetter && windows.length ? windows[Math.floor(hash2(sd(0), 437, salt) * windows.length)] : lo, whi = sungLetter && windows.length ? wlo + SPAN : hi;
  const maxLeap = sungLetter ? 2 : Infinity;
  let v = sungLetter ? wlo + Math.floor(hash2(sd(0), 431, salt) * (whi - wlo + 1)) : 2 + Math.floor(hash2(seed, 431, salt) * 3);
  const nearest = (want: number, ok: (d: number) => boolean, near = maxLeap): number => {
    let best: number | null = null, bd = Infinity;
    for (let d = wlo; d <= whi; d++) if (ok(d) && Math.abs(d - v) <= near && Math.abs(d - want) < bd) { bd = Math.abs(d - want); best = d; }
    return best ?? (near === Infinity ? want : nearest(want, ok, Infinity));
  };
  for (let b = 0; b < P; b++) {
    const tones = formChord(style, seed, at + b).tones.map(t => mod(t, 7)), cell = rhythm[b];
    const note = (pos: number, dur: number, strong: boolean) => {
      const i = b * 16 + Math.floor(pos), r = hash2(sd(b) + i * 7919, 433, salt);
      if (strong) v = nearest(v + pick(sungLetter ? [-2, -1, 0, 0, 1, 2] : [-2, -1, 0, 1, 2, 3], r), d => tones.includes(mod7(d))); // (the beats: a chord tone)
      else v = Math.max(wlo, Math.min(whi, v + pick(sungLetter ? [-1, -1, 0, 1, 1] : [-2, -1, -1, 1, 1, 2], r)));
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
    v = n.deg; n.deg = nearest(n.deg, d => ends.includes(mod7(d)));
    // (a sung line reaches its ending in steps: the notes before it bend toward it till every leap is within maxLeap)
    for (let k = onsets.length - 2; k >= 0 && sungLetter; k--) {
      const cur = out[onsets[k]]!, nxt = out[onsets[k + 1]]!;
      if (Math.abs(nxt.deg - cur.deg) <= maxLeap) break;
      cur.deg = nxt.deg + Math.sign(cur.deg - nxt.deg) * maxLeap;
    }
  }
  return out;
}

/** A phrase of the form in a haunted section (Ed, 2026-11-08, "room to breathe"): the sung line's narrow stepwise walk, as
 *  formPhrase's, on the haunted half-phrase rhythms (whole notes and ties, a rest at each half's end) and the slower chords
 *  (hauntedBar), its endings the form's (B on a question, C answering on the root), each half's last two notes its cadence.
 *  With the composer on, composedHaunted's planned line on the same rhythms in the walk's place. */
export function hauntedPhrase(style: MusicStyle, seed: number, letter: string, hookSeed?: number): (PhraseNote | null)[] {
  const C = composeOn(style);
  return C ? composedHaunted(style, C, seed, letter, hookSeed) : walkedHaunted(style, seed, letter, hookSeed);
}

/** The old haunted phrase (the composer off): the narrow walk on the held rhythms, as hauntedPhrase describes. */
function walkedHaunted(style: MusicStyle, seed: number, letter: string, hookSeed?: number): (PhraseNote | null)[] {
  const F = style.form!, H = style.haunted!, P = F.phraseBars, half = Math.floor(P / 2), salt = letter.charCodeAt(0) * 13 + 5;
  const at = F.order.indexOf(letter) * P, hookBars = letter !== "A" && hookSeed !== undefined && hookSeed !== seed ? F.sung.hookBars ?? 0 : 0;
  const sd = (b: number) => b < hookBars ? hookSeed! : seed;
  const out: (PhraseNote | null)[] = new Array(P * 16).fill(null), onsets: number[] = [];
  const [lo, hi] = F.range, SPAN = 4, mod7 = (d: number) => mod(d, 7), windows: number[] = [];
  for (let w = lo; w + SPAN <= hi; w++) if (Array.from({ length: SPAN + 1 }, (_, k) => w + k).some(d => mod7(d) === 0)) windows.push(w);
  const wlo = windows.length ? windows[Math.floor(hash2(sd(0), 437, salt) * windows.length)] : lo, whi = windows.length ? wlo + SPAN : hi;
  let v = wlo + Math.floor(hash2(sd(0), 431, salt) * (whi - wlo + 1));
  const nearest = (want: number, ok: (d: number) => boolean, near = 2): number => {
    let best: number | null = null, bd = Infinity;
    for (let d = wlo; d <= whi; d++) if (ok(d) && Math.abs(d - v) <= near && Math.abs(d - want) < bd) { bd = Math.abs(d - want); best = d; }
    return best ?? (near === Infinity ? want : nearest(want, ok, Infinity));
  };
  for (let h = 0; h * half < P; h++) {
    const b0 = h * half, rhythm = pick(H.rhythms, hash2(sd(b0) + h * 53, 471, salt)), mine: number[] = [];
    for (let i = 0; i < rhythm.length && b0 * 16 + i < P * 16; i++) {
      if (rhythm[i] !== "x") continue;
      let dur = 1;
      while (i + dur < rhythm.length && rhythm[i + dur] === "-") dur++;
      const pos = b0 * 16 + i, b = Math.floor(pos / 16), r = hash2(sd(b) + pos * 7919, 433, salt);
      const tones = formChord(style, seed, hauntedBar(F, at + b)).tones.map(t => mod(t, 7));
      v = i % 8 === 0 ? nearest(v + pick([-2, -1, 0, 0, 1, 2], r), d => tones.includes(mod7(d))) : Math.max(wlo, Math.min(whi, v + pick([-1, -1, 0, 1, 1], r)));
      out[pos] = { deg: v, dur, off: 0 };
      onsets.push(pos); mine.push(pos);
    }
    for (const p of mine.slice(-2)) out[p]!.cad = true;
  }
  const last = onsets[onsets.length - 1];
  if (last !== undefined) {
    const n = out[last]!, chordEnd = formChord(style, seed, hauntedBar(F, at + P - 1)).tones.map(t => mod(t, 7));
    const ends = letter === "B" ? [1, 4] : letter === "C" ? [0] : chordEnd.filter(t => t !== 0);
    v = n.deg; n.deg = nearest(n.deg, d => ends.includes(mod7(d)));
    for (let k = onsets.length - 2; k >= 0; k--) {
      const cur = out[onsets[k]]!, nxt = out[onsets[k + 1]]!;
      if (Math.abs(nxt.deg - cur.deg) <= 2) break;
      cur.deg = nxt.deg + Math.sign(cur.deg - nxt.deg) * 2;
    }
  }
  return out;
}

/** The sung line's window (Ed, 2026-10-14: "narrow and stepwise"): SPAN+1 scale steps inside the range holding a root (so C can
 *  answer on it), set by `r` (a seeded 0-1); the instrument's whole range otherwise. */
function sungWindow(F: FormDef, sung: boolean, r: number): [number, number] {
  const [lo, hi] = F.range, SPAN = 4, windows: number[] = [];
  for (let w = lo; w + SPAN <= hi; w++) if (Array.from({ length: SPAN + 1 }, (_, k) => w + k).some(d => mod(d, 7) === 0)) windows.push(w);
  if (!sung || !windows.length) return [lo, hi];
  const w = windows[Math.floor(r * windows.length)];
  return [w, w + SPAN];
}

/** The highest the returning hook's bars may go (they're composed before the peak is placed, so they must stay under any peak
 *  the rest can reach): the window's top when the question chord (in B's last bars and C's second half) can take the step above
 *  it, else a step under. */
function hookCeiling(F: FormDef, C: ComposeDef, wlo: number, whi: number, top: number): number {
  const q = [F.question, F.question + 2, F.question + 4, ...(C.sevenths ? [F.question + 6] : [])].map(t => mod(t, 7));
  return top > whi && q.includes(mod(whi + 1, 7)) ? whi : Math.max(wlo + 2, whi - 1);
}

/** A phrase's notes with its peak (its one highest note, ComposeDef.peak through it): the slots nearest `tp` (a share of the
 *  phrase) and the chord tones they can take up to `top` tried in turn, preferring the higher, one reaching `want`, a strong beat
 *  and a long note, at or after slot `from` and a note at least before the end, every other note under it, until the line
 *  keeps all the rules (musicCompose.ts composeLine). The hook's slots (`b` under `seg`) stay under `ceil` and as `fixed`. */
function peakedLine(slots: (LineSlot & { b: number })[], len: number, tp: number, top: number, from: number, want: number, seg: number, ceil: number, rules: Omit<LineRules, "peak" | "fixed" | "ends">, ends: number[], fixed: (number | undefined)[]): { degs: number[]; peak: number } {
  const cands: { i: number; pk: number; sc: number }[] = [];
  for (const [a, z, pen] of [[0.55, 0.82, 0], [0.4, 0.92, 50], [0, 1, 100]]) for (let i = pen > 50 ? fixed.length : from; i < slots.length - 1; i++) {
    const S = slots[i], t = S.pos / len;
    if (t < a || t > z || cands.some(c => c.i === i)) continue;
    for (let h = top; h >= top - 3; h--) {
      if (!S.tones.includes(mod(h, 7)) || fixed.some(f => f !== undefined && f >= h)) continue; // (a chord tone, over the hook: else it isn't the one peak)
      cands.push({ i, pk: h, sc: (h >= want ? 4 : 0) + 2 * h - Math.abs(t - tp) * 10 + (S.strong ? 1 : 0) + (S.dur >= 4 ? 0.5 : 0) - pen });
    }
  }
  cands.sort((x, y) => y.sc - x.sc || x.i - y.i);
  const tgt = slots.map(S => S.target), los = slots.map(S => S.lo);
  const bound = (pi: number, pk: number) => slots.forEach((S, i) => {
    if (i === pi) { S.lo = S.hi = S.target = pk; return; }
    S.lo = los[i];
    S.hi = Math.min(pi >= 0 ? pk - 1 : top, S.b < seg ? ceil : Infinity);
    S.target = Math.max(S.lo, Math.min(S.hi, tgt[i]));
  });
  for (const most of [2, 3, Infinity]) for (const c of cands.slice(0, 16)) { // (a peak that leaves the line moving, before one that doesn't)
    bound(c.i, c.pk);
    const degs = composeLine(slots, { ...rules, peak: c.i, ends, fixed, most }, true);
    if (degs) return { degs, peak: c.i };
  }
  const c = cands[0] ?? { i: -1, pk: top };
  bound(c.i, c.pk);
  return { degs: composeLine(slots, { ...rules, peak: c.i, ends, fixed }), peak: c.i };
}

/** The composer's phrase (Ed, 2026-11-08: "smarter rules"; docs/notes/music.md **The composer**): planned, then filled. A motif
 *  (a bar's rhythm, two for a slow part, and a shape of steps, thirds and, on an instrument, a leap filled in after) is stated,
 *  repeated, moved to fit the next chord (a sequence), turned over (inverted) and its rhythm a little changed, each half-phrase
 *  opening on it; a contour (arch, rise, fall or wave) sets where each statement sits and puts the phrase's one highest note
 *  60-75% through; the strong beats chord tones, passing and neighbour notes between them; the cadence bars ending each half on
 *  rests, A open, B on a question, C answering on the root. The sung letters (B and C) keep to the singer's narrow window (one
 *  step more for the peak only, a fourth into it at most), their first `hookBars` bars composed on their own from the night's
 *  seed (the returning hook). */
function composedPhrase(style: MusicStyle, C: ComposeDef, seed: number, letter: string, hookSeed?: number): (PhraseNote | null)[] {
  const F = style.form!, P = F.phraseBars, half = Math.max(1, Math.floor(P / 2)), salt = letter.charCodeAt(0) * 13, len = P * 16;
  const sung = letter !== "A", part = sung ? F.sung.part : formInstrument(F, seed), pace = F.pace[part] ?? F.pace.default ?? 0.25;
  const at = F.order.indexOf(letter) * P;
  const seg = sung ? Math.min(P - 1, F.sung.hookBars ?? 0) : 0, hooked = seg > 0 && hookSeed !== undefined && hookSeed !== seed;
  const sd = (b: number) => (hooked && b < seg ? hookSeed! : seed), ms = sd(0); // (the motif's, contour's and window's: the hook's)
  const kindOf = (s: number, b: number) => (hash2(s + b * 17, 423, salt) < pace ? "mid" : "slow");
  // the motif: its rhythm (a bar, or two when the first says little) and its shape
  const mCells = [pick(F.cells[kindOf(ms, 0)], hash2(ms, 419, salt))];
  if (cellNotes(mCells[0]).length < 3 && P >= 4) mCells.push(pick(F.cells[kindOf(ms, 1)], hash2(ms + 31, 419, salt)));
  const mNotes = mCells.map(cellNotes), mFirst = mNotes.map((_, j) => mNotes.slice(0, j).reduce((n, x) => n + x.length, 0));
  const shape = motifShape(mNotes.flat().length, k => hash2(ms + k * 7919, 441, salt), sung ? 0 : C.leap, sung ? 3 : 5);
  // the plan, bar by bar: the cadences, the climax bar (free, on the contour), and the motif's statements and their changes
  type Bar = { cell: string; mbar: number; tf: "M" | "R" | "S" | "I" | "free" | "cad"; start: boolean };
  const plan: Bar[] = [];
  for (let b = 0; b < P; b++) {
    const r = hash2(sd(b) + b * 31, 419, salt), r2 = hash2(sd(b) + b * 7, 421, salt), r3 = hash2(sd(b) + b * 13, 425, salt), kind = kindOf(sd(b), b);
    const prev = plan[b - 1];
    if (b % half === half - 1) plan.push({ cell: pick(F.cadence[kind], r), mbar: 0, tf: "cad", start: false });
    else if (P >= 6 && b === P - 2) plan.push({ cell: pick(F.cells[kind], r), mbar: 0, tf: "free", start: false });
    else if (mCells.length > 1 && prev && prev.start && prev.mbar === 0 && prev.tf !== "free" && prev.tf !== "cad") plan.push({ cell: r3 < 0.35 && b >= half ? varyCell(mCells[1], r) : mCells[1], mbar: 1, tf: prev.tf, start: false });
    else {
      const tf = b === 0 ? "M" : b % half === 0 ? pick(["M", "S", "I"] as const, r2) : b % half === 1 ? pick(["R", "S"] as const, r2) : pick(["S", "I", "R"] as const, r2);
      plan.push({ cell: b > 0 && r3 < 0.4 ? varyCell(mCells[0], r) : mCells[0], mbar: 0, tf, start: true });
    }
  }
  // the range: the singer's window (the peak may be a step over it), the instrument's whole range
  const [wlo, whi] = sungWindow(F, sung, hash2(ms, 437, salt)), top = sung ? Math.min(whi + 1, F.range[1]) : F.range[1];
  const kind = pickContour(C.contours, hash2(ms, 445, salt)), tp = C.peak[0] + (C.peak[1] - C.peak[0]) * hash2(seed, 443, salt);
  const span = (sung ? whi : top - 1) - wlo, map = (h: number) => Math.round(wlo + Math.max(0, Math.min(1, h)) * span);
  const tpAt = (b: number) => (b < seg ? (C.peak[0] + C.peak[1]) / 2 : tp); // (the hook's bars not on this wave's peak)
  // the slots and their targets: each statement anchored on the contour (repeated, moved by a step or two toward it, or turned over)
  const slots: (LineSlot & { b: number })[] = [];
  let anchor = map(contourAt(kind, 0, tp));
  for (let b = 0; b < P; b++) {
    const B = plan[b], tones = formChord(style, seed, at + b, !!C.sevenths).tones.map(t => mod(t, 7)), notes = cellNotes(B.cell);
    if (!notes.length) continue;
    const t0 = (b * 16 + notes[0].pos) / len, hc = map(contourAt(kind, t0, tpAt(b)));
    if (B.start) {
      const r = hash2(sd(b) + b * 59, 447, salt), dir = Math.sign(hc - anchor) || (r < 0.5 ? 1 : -1);
      if (B.tf === "M" || B.tf === "I") anchor = hc;
      else if (B.tf === "S") anchor += dir * (r < 0.6 ? 1 : 2);
      // (a statement starting on the beat starts on a chord tone: the sequence moved to fit its chord)
      if (notes[0].strong && !tones.includes(mod(anchor, 7))) anchor += tones.includes(mod(anchor + dir, 7)) ? dir : -dir;
    }
    const mn = mNotes[B.mbar] ?? [], sg = B.tf === "I" ? -1 : 1;
    for (const n of notes) {
      let target = map(contourAt(kind, (b * 16 + n.pos) / len, tpAt(b)));
      if (B.tf !== "free" && B.tf !== "cad" && mn.length) {
        let k = 0;
        while (k + 1 < mn.length && mn[k + 1].pos <= n.pos) k++;
        const g = mFirst[B.mbar] + k, off = mn[k].pos === n.pos || k + 1 >= mn.length ? shape[g] : (shape[g] + shape[g + 1]) / 2;
        target = Math.round(anchor + sg * off);
      }
      slots.push({ pos: b * 16 + n.pos, dur: n.dur, strong: n.strong, tones, lo: wlo, hi: top, target, b });
    }
  }
  // the peak, and every other note under it; the hook's bars under its ceiling (so the hook can't reach the peak)
  const ceil = hookCeiling(F, C, wlo, whi, top), nSeg = slots.filter(S => S.b < seg).length;
  const ends = letter === "B" ? [1, 4] : letter === "C" ? [0] : formChord(style, seed, at + P - 1).tones.map(t => mod(t, 7)).filter(t => t !== 0);
  const rules = { maxStep: sung ? 2 : 5, peakStep: sung ? 3 : 5, maxLeaps: sung ? 1 : 2 };
  slots.forEach((S, i) => { if (i < nSeg) S.hi = Math.min(S.hi, ceil); });
  const fixed: (number | undefined)[] = nSeg ? composeLine(slots.slice(0, nSeg), { ...rules, peak: -1 })! : [];
  const { degs } = peakedLine(slots, len, tp, top, nSeg, sung ? ceil + 1 : top - 1, seg, ceil, rules, ends, fixed);
  const out: (PhraseNote | null)[] = new Array(len).fill(null);
  slots.forEach((S, i) => { out[Math.floor(S.pos)] = { deg: degs[i], dur: S.dur, off: S.pos - Math.floor(S.pos) }; });
  return out;
}

/** The composer's haunted phrase: hauntedPhrase's held rhythms, slower chords, window and endings, planned as composedPhrase's
 *  are (a contour with one peak in the second half, chord tones on the half-bars, a passing or neighbour note between, the
 *  second half the first's shape moved toward the peak). */
function composedHaunted(style: MusicStyle, C: ComposeDef, seed: number, letter: string, hookSeed?: number): (PhraseNote | null)[] {
  const F = style.form!, H = style.haunted!, P = F.phraseBars, half = Math.max(1, Math.floor(P / 2)), salt = letter.charCodeAt(0) * 13 + 5, len = P * 16;
  const at = F.order.indexOf(letter) * P, seg = letter !== "A" ? Math.min(half, F.sung.hookBars ?? 0) : 0;
  const hooked = seg > 0 && hookSeed !== undefined && hookSeed !== seed, sd = (b: number) => (hooked && b < seg ? hookSeed! : seed), ms = sd(0);
  const [wlo, whi] = sungWindow(F, true, hash2(ms, 437, salt)), top = Math.min(whi + 1, F.range[1]);
  const kind = pickContour(C.contours, hash2(ms, 445, salt)), tp = C.peak[0] + (C.peak[1] - C.peak[0]) * hash2(seed, 443, salt);
  const map = (h: number) => Math.round(wlo + Math.max(0, Math.min(1, h)) * (whi - wlo));
  const slots: (LineSlot & { b: number; h: number; k: number })[] = [], cads = new Set<number>();
  for (let h = 0; h * half < P; h++) {
    const b0 = h * half, rhythm = pick(H.rhythms, hash2(sd(b0) + h * 53, 471, salt)), mine: number[] = [];
    for (let i = 0; i < rhythm.length && b0 * 16 + i < len; i++) {
      if (rhythm[i] !== "x") continue;
      let dur = 1;
      while (i + dur < rhythm.length && rhythm[i + dur] === "-") dur++;
      const pos = b0 * 16 + i, b = Math.floor(pos / 16), tones = formChord(style, seed, hauntedBar(F, at + b), !!C.sevenths).tones.map(t => mod(t, 7));
      mine.push(slots.length);
      slots.push({ pos, dur, strong: i % 8 === 0, tones, lo: wlo, hi: top, target: 0, b, h, k: mine.length - 1 });
    }
    for (const i of mine.slice(-2)) cads.add(i);
  }
  // the targets: the first half a shape from the contour's start, the second the same shape moved toward the peak
  const n0 = slots.filter(S => S.h === 0).length, shape = motifShape(Math.max(1, n0), k => hash2(ms + k * 7919, 441, salt), 0, 3);
  const a0 = map(contourAt(kind, 0, tp)), a1 = a0 + (hash2(seed, 449, salt) < 0.5 ? 1 : 2);
  for (const S of slots) {
    const c = map(contourAt(kind, S.pos / len, S.b < seg ? (C.peak[0] + C.peak[1]) / 2 : tp));
    S.target = S.h === 0 ? Math.round((a0 + shape[S.k] + c) / 2) : S.k < n0 ? Math.round((a1 + shape[S.k] + c) / 2) : c;
  }
  const ceil = hookCeiling(F, C, wlo, whi, top), nSeg = slots.filter(S => S.b < seg).length;
  const ends = letter === "B" ? [1, 4] : letter === "C" ? [0] : formChord(style, seed, hauntedBar(F, at + P - 1)).tones.map(t => mod(t, 7)).filter(t => t !== 0);
  const rules = { maxStep: 2, peakStep: 3, maxLeaps: 1 };
  slots.forEach((S, i) => { if (i < nSeg) S.hi = Math.min(S.hi, ceil); });
  const fixed: (number | undefined)[] = nSeg ? composeLine(slots.slice(0, nSeg), { ...rules, peak: -1 })! : [];
  const { degs } = peakedLine(slots, len, tp, top, Math.max(nSeg, n0), ceil + 1, seg, ceil, rules, ends, fixed);
  const out: (PhraseNote | null)[] = new Array(len).fill(null);
  slots.forEach((S, i) => { out[S.pos] = { deg: degs[i], dur: S.dur, off: 0, ...(cads.has(i) ? { cad: true as const } : {}) }; });
  return out;
}

const phraseCache = new Map<string, (PhraseNote | null)[]>();
function phraseFor(style: MusicStyle, seed: number, letter: string, hookSeed?: number, haunted = false): (PhraseNote | null)[] {
  const k = `${seed}|${letter}|${hookSeed ?? ""}|${haunted ? "h" : ""}|${composeOn(style) ? "c" : ""}`;
  let p = phraseCache.get(k);
  if (!p) { if (phraseCache.size > 64) phraseCache.clear(); phraseCache.set(k, p = haunted ? hauntedPhrase(style, seed, letter, hookSeed) : formPhrase(style, seed, letter, hookSeed)); }
  return p;
}

/** The music's seed for knockdown `n` of a run (0: the run's own seed). */
export const musicSeed = (base: number, n: number): number => n <= 0 ? base : Math.floor(hash2(base, 433 + n, n * 7919) * 0x7fffffff);

/** The form's note (if one starts) on the form's sixteenth `formStep`: its part, patch and MIDI note, and its length. */
export function formNoteAt(style: MusicStyle, seed: number, formStep: number, transpose = 0, step?: Pick<ArcStep, "lead" | "vocal" | "scale">, opts?: { voice?: boolean; hookSeed?: number; haunted?: boolean }): { part: string; patch: string; midi: number; deg: number; dur: number; off: number; letter: string; cad?: true } | null {
  const F = style.form!, fs = mod(formStep, formBars(F) * 16), letter = F.order[Math.floor(fs / (F.phraseBars * 16))];
  const n = phraseFor(style, seed, letter, letter !== "A" ? opts?.hookSeed : undefined, !!opts?.haunted && !!style.haunted)[fs % (F.phraseBars * 16)];
  if (!n) return null;
  // (a night's set: the step's own instrument for A, its own singer, or none, the A instrument playing them too; since Ed's
  // singer review, 2026-10-14, the voice sings only where `opts.voice` says (the breakdowns and the build: sungHere), and in
  // the build it sings A too; the instrument plays the rest)
  const lead = step?.lead && style.parts[step.lead] ? step.lead : formInstrument(F, seed), voice = step?.vocal ?? F.sung.patch;
  const sung = (opts?.voice ?? letter !== "A") && voice !== "none" && !!style.patches[voice], part = sung ? F.sung.part : lead, def = style.parts[part];
  const oct = sung ? F.sung.octave : Math.max(2, def?.octave ?? 3);
  const scale = style.scales[step?.scale ?? style.scale] ?? style.scales[style.scale];
  return { part, patch: sung ? voice : def?.patch ?? "", midi: degreeToMidi(style, scale, n.deg, oct, transpose), deg: n.deg, dur: n.dur, off: n.off, letter, ...(n.cad ? { cad: true as const } : {}) };
}

/** A wave's own tune in a night's set (ArcStep.tune): the music's seed salted, so each wave has its own melodies and chords. */
export const tuneSeed = (seed: number, tune: number): number => tune ? Math.floor(hash2(seed, 449 + tune, tune * 104729) * 0x7fffffff) : seed;

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

/** The composed bass bar each part last played (asked for sixteen times a bar, worked out once): what it was worked out from. */
const bassMemo = new Map<string, { style: MusicStyle; seed: number; bar: number; section: string; start: number; pat: string; from: number; root: number; line: (BassNote | null)[] }>();

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

// (each species' voice from its folder, art/creatures/<id>/creature.js, over anything the file still holds: rules/creatureConfig.ts)
const VOICE_FAMILIES: Record<string, { family?: string }> = { ...(voices as unknown as { species: Record<string, { family?: string }> }).species, ...(sectionOf("voice") as Record<string, { family?: string }>) };
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
/** Where the voice sings (Ed, 2026-10-14: in breakdowns and builds, never the drops): "breakdown" in the arc step's breakdown
 *  sections, "build" in its build, null elsewhere (the A instrument plays the melody). With no `where` on the form's sung part,
 *  the old rule: everywhere but A ("sung" here stands for that). */
export function sungHere(style: MusicStyle, plan: BlockPlan, a: ArcStep, sec: Resolved): "breakdown" | "build" | "sung" | null {
  const F = style.form;
  if (!F) return null;
  if (!F.sung.where) return "sung";
  const S = a.sections;
  if (F.sung.where.includes("breakdown") && (S ? S.breakdown.includes(plan.section) : plan.section === "breakdown")) return "breakdown";
  if (F.sung.where.includes("build") && (plan.section === a.build || !!sec.riser)) return "build";
  return null;
}

export function notesAt(style: MusicStyle, plan: BlockPlan, next: BlockPlan | null, step: number, ctx: ScoreContext): NoteEvent[] {
  const bar = Math.floor(step / 16), s = step - bar * 16, barIn = bar - plan.start;
  const sec = resolveSection(style, plan.section), a = arcStep(style, plan.arc);
  const scale = style.scales[a.scale ?? style.scale] ?? style.scales[style.scale], transpose = (a.transpose ?? 0) + (sec.transpose ?? 0); // (one scale, dorian, in each stage's key: Ed, 2026-10-09; a section's own lift on top, the victory's; a night's set may darken a step's: rules/musicSet.ts)
  const nightSeed = ctx.seed; // (the returning hook's: the night's, before each wave's own tune)
  ctx = a.tune ? { ...ctx, seed: tuneSeed(ctx.seed, a.tune) } : ctx; // (a night's set: each wave its own tune)
  const progress = (barIn + s / 16) / Math.max(1, plan.bars), pass = plan.pass ?? 0;
  // the form's chords (Ed, 2026-10-09: the 32-bar ABAC form), or, with none, the section's own, a step on each pass round the loop
  const formBar = bar - (ctx.formStart ?? 0), form = style.form;
  // the haunted treatment (Ed, 2026-11-08: "B, 1-6"): in its quiet sections the chords slower (a phrase's opening chord, then its
  // cadence's), the drums out till the drum & bass drops, the melody held and coloured, the voice ghosted; a legend's clearing
  // layer on the slower chords too, its lead ghosted, its melody coloured (rules here; its reverb, drone and voice lift the engine's)
  const H = hauntedOn(style), haunt = !!H && H.sections.includes(plan.section) && ctx.only !== "circle", comp = composeOn(style);
  const chordOf = (slow: boolean) => form ? formChord(style, ctx.seed, slow ? hauntedBar(form, formBar) : formBar, !!sec.sevenths) : chordAt(style, sec, a, barIn + pass * Math.max(1, sec.chordBars));
  const chordMain = chordOf(haunt), circleChord = H && form ? chordOf(true) : chordMain;
  const dropAt = haunt ? hauntedDrop(style, plan.bars) : Infinity, dropped = barIn >= dropAt;
  let secParts = sec.parts;
  if (haunt) { // (no drums; from the drop on, the drum & bass)
    secParts = Object.fromEntries(Object.entries(sec.parts).filter(([k]) => style.parts[k]?.role !== "drum"));
    if (dropped) for (const [k, u] of Object.entries(H!.drop.parts)) { if (u === null) delete secParts[k]; else secParts[k] = u; }
  }
  let melody = 0; // (the form's melody: the loudest of the melodic parts playing here)
  // a long block (the boot's intro, up to five minutes) turns a new phrase every 16 bars: new melodies, its ? hits falling anew
  const phrase = pass + (plan.bars > 32 ? Math.floor(barIn / 16) : 0);
  const out: NoteEvent[] = [];
  // the last bar before a new section: a fill, and the last beat's mutes
  const ending = next !== null && (next.section !== plan.section || next.start !== plan.start) ? sec.ending ?? "fill" : "none";
  const fillBar = ending === "fill";
  const muted = ending !== "none" && s >= 12 ? style.fill.mute : [];
  const onlyCircle = ctx.only === "circle";
  const parts: [string, PartUse, number, NoteEvent["hook"]?][] = onlyCircle ? [] : Object.entries(secParts).map(([k, u]) => [k, u, 1]);
  if (onlyCircle) { /* (the layer alone) */ } else if (ctx.siege > 0.01) for (const [k, u] of Object.entries(style.siege)) parts.push([k, u, ctx.siege, "siege"]);
  if ((ctx.party ?? 0) > 0.01) for (const [k, u] of Object.entries(style.party ?? {})) if (!secParts[k]) parts.push([k, u, ctx.party!, "party"]);
  if ((ctx.legend ?? 0) > 0.01) for (const [k, u] of Object.entries(style.legend ?? {})) if (!secParts[k]) parts.push([k, u, ctx.legend!, "legend"]);
  // the boot's intro: nothing before the first speaker, then a layer a speaker (other sections build as they always did)
  const build = ctx.build ?? 1, building = ctx.build !== undefined && plan.section === style.intro;
  const circle = ctx.circle && ctx.circle.level > 0.01 && ctx.only !== "main" ? ctx.circle : null, layer = new Set<string>();
  if (circle) for (const [k, u] of circleParts(style, circle.species)) if (!secParts[k]) { parts.push([k, u, circle.level]); layer.add(k); }
  // (the clearing's lead, ghosted when haunted: its first melodic part)
  const ghostLead = circle && H ? [...layer].find(k => style.parts[k]?.role === "motif") : undefined;
  if (fillBar && !onlyCircle) parts.push([style.fill.part, { p: "__fill" }, 1]);
  for (const [name, u0, scaleLevel, hook] of parts) {
    const def = style.parts[name];
    if (!def) continue;
    const u = use(u0);
    const own = layer.has(name), chord = own ? circleChord : chordMain;
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
    // the composer's bassline (Ed, 2026-11-08: "smarter rules"): the part's pattern bar varied over a four-bar phrase, stepping
    // into the next chord, sitting with the kick (musicCompose.ts bassBar); its notes may fall on the pattern's rests
    const brule = comp && def.role === "bass" && !own && !def.tonic && u.p !== "__fill" ? comp.bass.parts[name] : undefined;
    if (brule) {
      const from = i - (i % 16);
      let m = bassMemo.get(name);
      if (!m || m.style !== style || m.seed !== ctx.seed || m.bar !== bar || m.section !== plan.section || m.start !== plan.start || m.pat !== pat || m.from !== from || m.root !== chord.root) {
        // (the next bar's chord, and the section's kick this bar)
        const next = form ? formChord(style, ctx.seed, haunt ? hauntedBar(form, formBar + 1) : formBar + 1).root : chordAt(style, sec, a, barIn + 1 + pass * Math.max(1, sec.chordBars)).root;
        const k = Object.entries(secParts).find(([n]) => style.patches[style.parts[n]?.patch ?? ""]?.kind === "kick"), kp = k && style.parts[k[0]].patterns[use(k[1]).p];
        const kick = kp ? kp.slice((barIn * 16) % kp.length, ((barIn * 16) % kp.length) + 16) : null, q = form ? mod(formBar, 4) : mod(barIn, 4), salt = name.length * 131 + name.charCodeAt(0) * 7 + q;
        const line = bassBar(pat.slice(from, from + 16), brule, comp!.bass.approach, chord.root, next === chord.root ? null : next, kick, q, x => hash2(bar * 64 + x, salt, ctx.seed + 977));
        bassMemo.set(name, (m = { style, seed: ctx.seed, bar, section: plan.section, start: plan.start, pat, from, root: chord.root, line }));
      }
      const n = m.line[i % 16];
      if (!n) continue;
      const r = hash2(step, plan.arc * 131 + name.length * 17 + name.charCodeAt(0), ctx.seed + phrase * 7919);
      const level = u.level * scaleLevel * (0.94 + 0.06 * r) * (building ? 0.45 + 0.55 * build : 1);
      const patch = a.bass && sec.parts[name] && style.patches[a.bass] ? a.bass : def.patch;
      out.push({ part: name, patch, step, offset: 0, dur: n.dur, ...(hook ? { hook } : {}), midi: degreeToMidi(style, scale, (n.abs ? 0 : chord.root) + n.k, def.octave ?? 0, transpose), vel: 0.85 * n.vel * level });
      continue;
    }
    const { ch, dur } = hitAt(pat, i);
    if (ch === "." || ch === "-") continue;
    const seed = own ? ctx.seed + nameHash(circle!.species) : ctx.seed; // (a legend's layer its species' own melody)
    const r = hash2(own && ctx.circleStep !== undefined ? ctx.circleStep : step, plan.arc * 131 + name.length * 17 + name.charCodeAt(0), seed + phrase * 7919);
    if (ch === "?" && r >= a.energy) continue;
    const level = u.level * scaleLevel * (0.94 + 0.06 * r) * (building && !own ? 0.45 + 0.55 * build : 1); // (the boot's few speakers quieter, filling out to the twelfth)
    const patch = a.bass && def.role === "bass" && sec.parts[name] && !own && style.patches[a.bass] ? a.bass : def.patch; // (a night's set: the step's bass patch on the section's own bass parts)
    const base = { part: name, patch, step: own && ctx.circleStep !== undefined ? ctx.circleStep : step, offset: 0, dur, ...(own ? { layer: "circle" as const } : {}), ...(hook ? { hook } : {}) };
    if (def.role === "drum") {
      if (ch === "r") { out.push({ ...base, dur: 0.5, midi: null, vel: 0.6 * level }, { ...base, offset: 0.5, dur: 0.5, midi: null, vel: 0.75 * level }); continue; }
      out.push({ ...base, midi: null, vel: (VEL[ch] ?? 0.8) * level });
      continue;
    }
    const oct = def.octave ?? 0, accent = ch === ch.toUpperCase() && ch !== ch.toLowerCase() ? 1 : s % 4 === 0 ? 0.9 : 0.78;
    if (def.role === "bass") {
      const k = BASS[ch] ?? (ch.toLowerCase() === "x" ? 0 : BASS[ch.toLowerCase()] ?? 0);
      out.push({ ...base, midi: degreeToMidi(style, scale, (def.tonic ? 0 : chord.root) + k, oct, transpose), vel: (ch in BASS ? 0.85 : VEL[ch] ?? 0.85) * level });
    } else if (def.role === "chord") {
      for (const t of chord.tones) out.push({ ...base, midi: degreeToMidi(style, scale, t, oct, transpose), vel: (VEL[ch] ?? accent) * level });
    } else if (def.role === "arp") {
      let k = 0; // the hits so far this bar
      const b0 = at - (at % 16);
      for (let j = b0; j < at; j++) { const c = pat[(j + (own ? phase : 0)) % pat.length]; if (c !== "." && c !== "-") k++; }
      const n = chord.tones.length, t = chord.tones[k % n] + 7 * (Math.floor(k / n) % 2);
      out.push({ ...base, midi: degreeToMidi(style, scale, t, oct, transpose), vel: (VEL[ch] ?? accent) * level });
    } else {
      const m = motifFor(style, seed + phrase * 104729, plan.arc, name), pos = ((at % 64) + (own ? sh % 29 : 0)) % 32; // (a new melody each pass or phrase)
      const vary = !comp && barIn % 4 === 3 && s >= 8 ? (hash2(bar, plan.arc, ctx.seed + 5) < 0.5 ? 2 : -1) : 0; // every fourth bar ends differently (the composer's motif changes in itself)
      const lift = own ? [0, 2, 4][(sh >>> 3) % 3] : 0, octOwn = own ? oct + ((sh >>> 5) % 2) - (oct > 2 ? 1 : 0) : oct;
      const deg = chord.root + m[pos] + vary + lift, vel = (VEL[ch] ?? accent) * level;
      // (a haunted clearing: its melody now and then coloured, its lead ghosted below, late and quieter)
      const tint = own && H ? hauntedColour(style, scale, deg, false, hash2(at, 467, seed)) : 0;
      out.push({ ...base, midi: degreeToMidi(style, scale, deg, octOwn, transpose) + tint, vel });
      if (name === ghostLead && H!.circle.ghost > 0) out.push({ ...base, midi: degreeToMidi(style, scale, deg + H!.ghost.interval, octOwn, transpose), vel: vel * H!.circle.ghost, ghost: true });
    }
  }
  if (onlyCircle) return out;
  // the form's melody: A on its instrument; the voice in the breakdowns and the build (Ed, 2026-10-14; sungHere), the
  // instrument everywhere else; in a breakdown the voice sometimes holds the chord instead of a tune ("sometimes just the
  // chord"), and every sung note there is washed (doubled a fifth and an octave up, late and quieter: three voices)
  if (form?.sung.arpeggio && (a.vocal ?? form.sung.patch) !== "none") {
    const chord = chordMain;
    // the lab's voice test: the chord's tones folded into the range, sorted, sung up and then down, a note every `rate`
    // sixteenths through every section, so a voice and its effects are heard without waiting for a breakdown
    const A = form.sung.arpeggio, rate = Math.max(1, Math.round((typeof A === "object" ? A.rate : undefined) ?? 2));
    const fx: NoteEvent["fx"] = style.voiceFxDark?.families?.includes(a.family ?? "") ? "dark" : "pure";
    const patch = a.vocal && style.patches[a.vocal] ? a.vocal : form.sung.patch, [lo, hi] = form.range, n = scale.length;
    const degs = [...new Set([...chord.tones, chord.root + 6].map(t => { let d = lo + mod(t - lo, n); while (d > hi) d -= n; return d; }))].filter(d => d >= lo && d <= hi).sort((x, y) => x - y);
    const cycle = degs.length > 2 ? [...degs, ...degs.slice(1, -1).reverse()] : degs;
    const k = Math.floor((formBar * 16 + s) / rate);
    if (cycle.length && mod(formBar * 16 + s, rate) === 0) {
      const deg = cycle[mod(k, cycle.length)], level = melody > 0 ? melody : 0.8;
      out.push({ part: form.sung.part, patch, step, offset: 0, dur: rate, midi: degreeToMidi(style, scale, deg, form.sung.octave, transpose), vel: (s % 4 === 0 ? 0.88 : 0.74) * level, fx });
    }
  } else if (melody > 0 && form) {
    const chord = chordMain;
    const place = sungHere(style, plan, a, sec), W = form.sung.wash, oct = form.sung.octave, ghost = haunt && place !== null && H!.ghost.gain > 0 ? H!.ghost : null;
    const vel = (s % 4 === 0 ? 0.9 : 0.78) * melody, hold = place === "breakdown" && !haunt && hash2(ctx.seed, 457, pass) < 0.5; // (haunted: always the held melody, its rests)
    const fx: NoteEvent["fx"] = style.voiceFxDark?.families?.includes(a.family ?? "") ? "dark" : "pure";
    const patch = a.vocal && style.patches[a.vocal] ? a.vocal : form.sung.patch;
    const sing = (deg: number, dur: number, off: number, v: number, tint = 0) => { // (deg: a scale step over the root, in the sung octave)
      out.push({ part: form.sung.part, patch, step, offset: off, dur, midi: degreeToMidi(style, scale, deg, oct, transpose) + tint, vel: v, fx, ...(dur % 1 ? { straight: true } : {}) });
      // (haunted: the ghost in the wash's place, diatonic, below)
      if (ghost) out.push({ part: form.sung.part, patch, step, offset: off, dur, midi: degreeToMidi(style, scale, deg + ghost.interval, oct, transpose), vel: v * ghost.gain, fx, ghost: true, ...(dur % 1 ? { straight: true } : {}) });
      else if (place === "breakdown" && W) for (const iv of W.intervals) out.push({ part: form.sung.part, patch, step, offset: off + W.late, dur: Math.max(1, dur - W.late), midi: degreeToMidi(style, scale, deg + iv, oct, transpose), vel: v * W.level, fx, double: true, ...(dur % 1 ? { straight: true } : {}) });
    };
    const voiceOk = (a.vocal ?? form.sung.patch) !== "none";
    if (hold && voiceOk) {
      if (s === 0 && mod(formBar, form.chordBars) === 0) sing(chord.root, form.chordBars * 16 - 1, 0, 0.8 * melody);
    } else {
      const fn = formNoteAt(style, ctx.seed, formBar * 16 + s, transpose, a, { voice: place !== null, hookSeed: nightSeed, haunted: haunt });
      const tint = fn && haunt ? hauntedColour(style, scale, fn.deg, !!fn.cad, hash2(ctx.seed, formBar * 16 + s, 467)) : 0; // (the scale's colour: Ed, 2026-11-08)
      if (fn && fn.part === form.sung.part) sing(fn.deg, fn.dur, fn.off, fn.off ? 0.78 * melody : vel, tint);
      else if (fn) out.push({ part: fn.part, patch: fn.patch, step, offset: fn.off, dur: fn.dur, midi: fn.midi + tint, vel: fn.off ? 0.78 * melody : vel, ...(fn.dur % 1 ? { straight: true } : {}) });
    }
  }
  // the section's own events: a crash on its first beat, a riser over a build (one note a bar)
  if (s === 0 && barIn === 0 && sec.impact && style.patches.impact) out.push({ part: "impact", patch: "impact", step, offset: 0, dur: 16, midi: null, vel: 1 });
  if (s === 0 && sec.riser && style.patches.riser) out.push({ part: "riser", patch: "riser", step, offset: 0, dur: 16, midi: null, vel: 1, from: barIn / plan.bars, to: (barIn + 1) / plan.bars });
  // the haunted drop (Ed, 2026-11-08: "no drums, and then drum and bass kicks in"): a riser over the bars before it, an impact on it
  if (s === 0 && Number.isFinite(dropAt)) {
    const rb = Math.max(0, Math.min(H!.drop.riserBars, dropAt)), k = barIn - (dropAt - rb);
    if (k >= 0 && k < rb && style.patches.riser) out.push({ part: "riser", patch: "riser", step, offset: 0, dur: 16, midi: null, vel: 1, from: k / rb, to: (k + 1) / rb });
    if (barIn === dropAt && H!.drop.impact && style.patches.impact) out.push({ part: "impact", patch: "impact", step, offset: 0, dur: 16, midi: null, vel: 1 });
  }
  return out;
}

/** The style's problems (empty when it's sound): every section, part, pattern and patch named exists,
 *  patterns run whole bars, and every section's length in the arc is a whole number of blocks. */
export function checkStyle(style: MusicStyle): string[] {
  const errs: string[] = [], B = style.blockBars;
  for (const f of style.voiceFxDark?.families ?? []) if (!style.families?.[f]) errs.push(`voiceFxDark: no family "${f}"`);
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
  for (const n of [style.intro, style.knockout, ...(style.victory ? [style.victory] : [])]) if (!style.sections[n]) errs.push(`no section "${n}"`);
  if (!style.scales[style.scale]) errs.push(`no scale "${style.scale}"`);
  const F = style.form;
  if (F) {
    for (const n of [...F.a, ...F.b]) if (!style.progressions[n]) errs.push(`form: no progression "${n}"`);
    for (const n of F.instruments) if (!style.parts[n]) errs.push(`form: no part "${n}"`);
    if (!style.patches[F.sung.patch]) errs.push(`form: no patch "${F.sung.patch}"`);
    for (const w of F.sung.where ?? []) if (w !== "breakdown" && w !== "build") errs.push(`form: sung.where "${w}" (breakdown or build)`);
    if (F.sung.wash && !(F.sung.wash.intervals.length && F.sung.wash.level > 0 && F.sung.wash.level <= 1)) errs.push("form: sung.wash wants intervals and a level in (0, 1]");
    const tripletsWhole = (c: string) => [...c].every((ch, i) => ch !== "T" && ch !== "t" || c.slice(i + 1, i + (ch === "T" ? 8 : 4)) === "_".repeat(ch === "T" ? 7 : 3))
      && [...c].filter(ch => ch === "_").length === [...c].reduce((n, ch) => n + (ch === "T" ? 7 : ch === "t" ? 3 : 0), 0);
    for (const [k, cs] of [...Object.entries(F.cells), ...Object.entries(F.cadence)]) for (const c of cs) {
      if (c.length !== 16 || c[0] === "-" || c[0] === "_" || /[^x\-._Tt]/.test(c)) errs.push(`form: cell ${k} "${c}" not one bar`);
      else if (!tripletsWhole(c)) errs.push(`form: cell ${k} "${c}": a triplet without its _s`);
    }
    for (const c of Object.values(F.cadence).flat()) if (!c.endsWith(".")) errs.push(`form: cadence "${c}" doesn't end on a rest`);
  }
  const H = style.haunted;
  if (H) {
    for (const n of H.sections) if (!style.sections[n]) errs.push(`haunted: no section "${n}"`);
    const len = Math.floor((F?.phraseBars ?? 8) / 2) * 16;
    if (!H.rhythms.length) errs.push("haunted: no rhythms");
    for (const r of H.rhythms) if (r.length !== len || /[^x.\-]/.test(r) || r[0] === "-" || !r.endsWith("....")) errs.push(`haunted: rhythm "${r}" wants ${len} sixteenths of x - ., a beat's rest at its end`);
    for (const [pn, u] of Object.entries(H.drop.parts)) if (u !== null) checkUse("haunted.drop", pn, u);
    if (!(H.verb.time > 0 && H.verb.low > 0 && H.verb.high > H.verb.low)) errs.push("haunted.verb: wants a time and low < high");
    if (!Number.isInteger(H.ghost.interval) || H.ghost.interval === 0) errs.push("haunted.ghost: interval wants whole scale steps, not 0");
    if (H.drone.swell.length < 3) errs.push("haunted.drone: a swell rate for the root, fifth and octave");
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
