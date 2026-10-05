// The music's score (Ed, 2026-10-04: generative music, in code, like the art): what each part
// plays on each sixteenth, from the style file (config/music-style.json) and the section the
// conductor (rules/musicPlan.ts) has chosen. Numbers only, no sound: src/platform/musicEngine.ts
// plays the notes. The same seed and section always give the same notes.
import { hash2 } from "./random";

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
  scale?: string;
  progression?: string;
  /** Semitones above the style's root. */
  transpose?: number;
  /** Its tempo (bpm; the style's bpm if none): the beat clock eases to it as the wave lands. */
  bpm?: number;
  /** The sections played as the wave arrives, then the ones looped till the next wave: [name, bars]. */
  arrive: [string, number][];
  loop: [string, number][];
  /** The section leading into the next wave, and its bars. */
  build: string;
  buildBars?: number;
}

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
  arc: ArcStep[];
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
}

export interface NoteEvent {
  part: string;
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

/** The chord (scale degrees) a section plays in bar `barIn` of itself. */
export function chordAt(style: MusicStyle, sec: Resolved, step: ArcStep, barIn: number): { root: number; tones: number[] } {
  const prog = style.progressions[sec.progression || step.progression || ""] ?? style.progressions[Object.keys(style.progressions)[0]];
  const root = prog[Math.floor(barIn / Math.max(1, sec.chordBars)) % prog.length];
  const tones = [root, root + 2, root + 4];
  if (sec.sevenths) tones.push(root + 6);
  return { root, tones };
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
}

/** Every note starting on sixteenth `step` (absolute), in the block `plan`; `next` is the plan of
 *  the block after this bar (for the fill), when this bar is the block's last. */
export function notesAt(style: MusicStyle, plan: BlockPlan, next: BlockPlan | null, step: number, ctx: ScoreContext): NoteEvent[] {
  const bar = Math.floor(step / 16), s = step - bar * 16, barIn = bar - plan.start;
  const sec = resolveSection(style, plan.section), a = arcStep(style, plan.arc);
  const scale = style.scales[a.scale ?? style.scale] ?? style.scales[style.scale];
  const transpose = a.transpose ?? 0;
  const progress = (barIn + s / 16) / Math.max(1, plan.bars);
  const chord = chordAt(style, sec, a, barIn);
  const out: NoteEvent[] = [];
  // the last bar before a new section: a fill, and the last beat's mutes
  const ending = next !== null && (next.section !== plan.section || next.start !== plan.start) ? sec.ending ?? "fill" : "none";
  const fillBar = ending === "fill";
  const muted = ending !== "none" && s >= 12 ? style.fill.mute : [];
  const parts: [string, PartUse, number][] = Object.entries(sec.parts).map(([k, u]) => [k, u, 1]);
  if (ctx.siege > 0.01) for (const [k, u] of Object.entries(style.siege)) parts.push([k, u, ctx.siege]);
  if ((ctx.party ?? 0) > 0.01) for (const [k, u] of Object.entries(style.party ?? {})) if (!sec.parts[k]) parts.push([k, u, ctx.party!]);
  if (fillBar) parts.push([style.fill.part, { p: "__fill" }, 1]);
  for (const [name, u0, scaleLevel] of parts) {
    const def = style.parts[name];
    if (!def) continue;
    const u = use(u0);
    if (progress < u.from || a.energy < u.energy || muted.includes(name)) continue;
    // in a fill bar, the fill part plays the fill instead of its pattern
    if (fillBar && name === style.fill.part && u.p !== "__fill") continue;
    const pat = u.p === "__fill" ? style.fill.pattern : def.patterns[u.p];
    if (!pat) continue;
    const i = (barIn * 16 + s) % pat.length;
    const { ch, dur } = hitAt(pat, i);
    if (ch === "." || ch === "-") continue;
    const r = hash2(step, plan.arc * 131 + name.length * 17 + name.charCodeAt(0), ctx.seed);
    if (ch === "?" && r >= a.energy) continue;
    const level = u.level * scaleLevel * (0.94 + 0.06 * r);
    const base = { part: name, patch: def.patch, step, offset: 0, dur };
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
      for (let j = 0; j < s; j++) { const c = pat[(barIn * 16 + j) % pat.length]; if (c !== "." && c !== "-") k++; }
      const n = chord.tones.length, t = chord.tones[k % n] + 7 * (Math.floor(k / n) % 2);
      out.push({ ...base, midi: degreeToMidi(style, scale, t, oct, transpose), vel: (VEL[ch] ?? accent) * level });
    } else {
      const m = motifFor(ctx.seed, plan.arc, name), pos = ((barIn % 4) * 16 + s) % 32;
      const vary = barIn % 4 === 3 && s >= 8 ? (hash2(bar, plan.arc, ctx.seed + 5) < 0.5 ? 2 : -1) : 0; // every fourth bar ends differently
      out.push({ ...base, midi: degreeToMidi(style, scale, chord.root + m[pos] + vary, oct, transpose), vel: (VEL[ch] ?? accent) * level });
    }
  }
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
  if (style.fill.pattern.length !== 16) errs.push("fill: not one bar");
  if (!style.parts[style.fill.part]) errs.push(`fill: no part "${style.fill.part}"`);
  for (const n of [style.intro, style.knockout]) if (!style.sections[n]) errs.push(`no section "${n}"`);
  if (!style.scales[style.scale]) errs.push(`no scale "${style.scale}"`);
  style.arc.forEach((a, i) => {
    for (const [s, bars] of [...a.arrive, ...a.loop, [a.build, a.buildBars ?? style.buildBars] as [string, number]]) {
      if (!style.sections[s]) errs.push(`arc ${i} (${a.name}): no section "${s}"`);
      if (!(bars > 0) || bars % B !== 0) errs.push(`arc ${i} (${a.name}): ${s} is ${bars} bars, not a multiple of ${B}`);
    }
    if (!a.loop.length) errs.push(`arc ${i} (${a.name}): nothing to loop`);
    if (a.scale && !style.scales[a.scale]) errs.push(`arc ${i} (${a.name}): no scale "${a.scale}"`);
    if (a.progression && !style.progressions[a.progression]) errs.push(`arc ${i} (${a.name}): no progression "${a.progression}"`);
  });
  return errs;
}
