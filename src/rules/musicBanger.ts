// Banger mode (Ed, 2026-11-10: "I'm open to substantial redesigns, as long as we get music that fits with the game; catchy
// spooky cute dancey witchy ravey bangers"): what is played, written anew over the same conductor (rules/musicPlan.ts: when
// things happen) and the same engine (how it sounds). A small band of specialists that share one hook a night:
//   the hook      one 4-bar tune a night (a one-bar motif with a rhythm of its own, three times with a changed ending, then an
//                 answer that comes home), at its own pitch while the chords move under it, back in every wave in that wave's
//                 key and on its lead; sung slowly in the breakdown, stuttered in the build, whole in the drop, hummed by a
//                 sleeping legend's clearing; a small high reply in its gaps;
//   the chords    four-chord loops that suit each mode (dorian's without its diminished chord), voiced to move by the least;
//   the drums     a kit and groove by genre family: accents and ghost notes, its own swing, eight-bar phrases (a turn in the
//                 fourth bar, a fill dealt from a bank in the eighth, the kick out for the last beat, a crash on the one);
//   the bass      a two-bar figure between the kicks, a clean sub under a mid bass;
//   the build     things taken away (the bass, then the kick), the snare roll doubling, the hook's first notes faster and
//                 faster, a beat of near silence; then the drop.
// Numbers only, no sound, no state: the same style, plan, step and seed always give the same notes. Its data is the style's
// `banger` block (config/music-style.json); docs/notes/music.md **Banger mode**. Off (tuning music.banger, ?banger=0): the
// music as before, to the note.
import { hash2 } from "./random";
import { degreeToMidi, hauntedDrop, hauntedOn, tuneSeed, type ArcStep, type BlockPlan, type MusicStyle, type NoteEvent, type Resolved, type ScoreContext } from "./musicScore";

/** A drum voice of a kit: its patch (its channel is the patch's own), its pattern (16 characters a bar, any whole bars: "X" an
 *  accent, "x" a hit, "o" a ghost, "g" a quieter ghost, "r" a roll of two thirty-seconds, "." a rest), its level, the wave
 *  energies it plays between, and the bar of a section it comes in on (a later pass round the form: from the top). */
export interface BangerVoice { patch: string; p: string; level?: number; e?: [number, number]; from?: number }
/** A bass: the patches a wave takes one of, its octave over the lowest (0: E1 to D#2, a sub alone; 1: E2 to D#3, the sub under
 *  it unless `sub` is false), a slide into each new pitch (s), its level (1), and its two-bar figures (a wave takes one a phrase: "1" the
 *  chord's root, "3", "5", "7", "8" the octave, "-" held, "." a rest), the breakbeat phrase's own. */
export interface BangerBass { patch: string[]; octave: number; sub?: boolean; glide?: number; level?: number; p: string[]; breaks?: string[] }
/** The chords: their patch, their rhythms (a phrase takes one: "x" a stab, "-" held), their level, sevenths, `arp` one tone a
 *  hit in turn, and the lowest note of the octave they're voiced in (MIDI; 57). */
export interface BangerChords { patch: string; p: string[]; level?: number; sevenths?: boolean; arp?: boolean; window?: number }
/** A genre family's kit and groove; `base` another kit it starts from (each field given replaces the base's). */
export interface BangerKit {
  base?: string;
  /** The off sixteenths late by this share of a sixteenth (its own swing: 0 straight, 0.2 a garage shuffle). */
  swing?: number;
  drums?: BangerVoice[];
  /** Added in the fourth bar of every eight: a small turn. */
  turn?: BangerVoice[];
  /** The breakbeat phrase's drums. */
  breaks?: BangerVoice[];
  /** The fills it takes one of (the style's `banger.fills`). */
  fills?: string[];
  bass?: BangerBass;
  chords?: BangerChords;
  pad?: { patch: string; level: number; e?: [number, number] };
  /** The lead voices its hook plays on (the style's `banger.leads`): the calmer waves' and the rest's; and the reply's. */
  leads?: { soft: string[]; hard: string[] };
  reply?: string[];
}
export interface BangerDef {
  on?: boolean;
  /** No wave calmer than this (0-1): every wave has a beat to dance to. */
  energyFloor: number;
  /** Under this energy a kit's soft leads play. */
  softBelow: number;
  /** Gentle till the second stump (Ed, 2026-11-10: "keep things gentle before the second stump"): till the night's second
   *  great stump has its soundsystem (the cue's `stumps`), no wave over `energy`, its kit one of `keep` (else `kit`), no
   *  impacts, rolls or stutters, and the hook only slow. */
  gentle: { stumps: number; energy: number; kit: string; keep: string[] };
  /** The mix's own: the kick's duck (the pump) and how long it holds before easing back (s: the kick's body), a high shelf (dB at 6.5 kHz), a low cut (Hz), the drive into the limiter. */
  mix: { duck?: number; duckHold?: number; air?: number; lowCut?: number; drive?: number };
  /** The singer as the other main sound (Ed, 2026-11-10: "squares and vocals as the main sound"), after the second stump: she
   *  doubles the hook wherever it's whole (`double`, a chop of her notes, at `doubleLevel`), holds the chord's root and fifth on
   *  "ooh" under the grooves (`pad`, `padLevel`), and stabs the first note of the wave's riff each bar (`stabLevel`); every note
   *  folded into `range` (MIDI: her recorded notes). */
  vocals?: { double: string; doubleLevel: number; pad: string; padLevel: number; stabLevel: number; range: [number, number] };
  /** The compressors (Ed, 2026-11-10: "Is it possible to add a compressor?"; platform/audio/musicEngine.ts), `on` false none:
   *  `drums`, the drum bus's (kick, snare, clap, hats, percussion, fills and crash: for punch): its threshold (dB), knee (dB),
   *  ratio, attack (s: slow enough that the hit's front comes through), release in beats (timed to the tempo), `mix` the share
   *  of the squashed drums blended under the dry ones (parallel, "New York": 1 all squashed, 0 none) and `makeup` its gain;
   *  `glue`, the master's before the limiter (the mix breathing together): threshold, knee, a low ratio, a slow attack, release
   *  (s) and `makeup` (a gain after it: the node's own make-up taken back, and a little more into the limiter). */
  comp?: { on?: boolean; drums?: { threshold: number; knee: number; ratio: number; attack: number; releaseBeats: number; mix: number; makeup: number }; glue?: { threshold: number; knee: number; ratio: number; attack: number; release: number; makeup: number } };
  /** The chord loops by mode, a bar a chord (scale steps, 0 the key's root): `a` the drop's, `b` the breakbeat phrase's. */
  progressions: Record<string, { a: number[][]; b: number[][] }>;
  /** The hook's banks: one-bar motif rhythms and answer rhythms ("x" a note, "-" held, "." a rest), pitch shapes (steps of
   *  the minor pentatonic over the anchor, a note each), the anchors (0 the root, 1 the third, 3 the fifth), the reply's shapes. */
  hook: { motifs: string[]; answers: string[]; shapes: number[][]; anchors: number[]; replies: number[][] };
  leads: Record<string, { patch: string; octave: number; level: number }>;
  /** Sprinkled in sometimes (Ed, 2026-11-10: "Some Xylophone and Finger snap snares help with the spooky vibe; sprinkle some of
   *  these in sometimes"), each dealt by the wave's seed an eight-bar phrase at a time: the xylophone (`xylo`, a voice of
   *  `leads`) answering in the tune's gaps (`answer`: the share of phrases), a four-note run into the next phrase over a fill's
   *  last beat (`flourish`), a figure in a breakdown's quiet half (`breakdown`); finger snaps (`snap`, a patch, at `snapLevel`)
   *  on the kit's backbeat (`snaps`: the share of phrases; `gentleSnaps` before the second stump), in place of its snare and
   *  clap (`replace`: the share of those) or over them at under half their level, and on the third beat of a breakdown's quiet
   *  half (`breakdownSnaps`). */
  spice?: { xylo: string; answer: number; flourish: number; breakdown: number; snap: string; snaps: number; gentleSnaps: number; replace: number; breakdownSnaps: number; snapLevel: number };
  /** The tunes' register and level (Ed, 2026-11-10: "Lead melody gets very high, and it's loud vs the drums"): the highest
   *  note (MIDI) a lead's line and the reply voice's may reach (a line that would pass it is played an octave down, whole, its
   *  shape kept), the lowest a lead's line may fall to, and every tune's level against the drums (`level`). */
  register?: { lead: number; reply: number; floor: number; level: number };
  fills: Record<string, BangerVoice[]>;
  /** The breakdown's drum & bass. */
  dnb: { drums: BangerVoice[]; bass: BangerBass };
  /** Added in the victory. */
  victory: BangerVoice[];
  kits: Record<string, BangerKit>;
  /** Each night family's kit. */
  families: Record<string, string>;
}

/** Banger mode, when it's on. */
export const bangerOn = (style: MusicStyle): BangerDef | null => (style.banger && style.banger.on !== false ? style.banger : null);
const AS = new WeakMap<MusicStyle, MusicStyle>();
/** The style with banger mode on or off (tuning music.banger, ?banger=0); the style itself when it already is, or has none. */
export function withBanger(style: MusicStyle, on: boolean | undefined): MusicStyle {
  if (on === undefined || !style.banger || (style.banger.on !== false) === on) return style;
  let out = AS.get(style);
  if (!out) AS.set(style, (out = { ...style, banger: { ...style.banger, on } }));
  return out;
}
/** Banger mode's compressors, when they're on. */
export const compOf = (style: MusicStyle): NonNullable<BangerDef["comp"]> | null => { const B = bangerOn(style); return B?.comp && B.comp.on !== false ? B.comp : null; };
const COMP_AS = new WeakMap<MusicStyle, MusicStyle>();
/** The style with banger mode's compressors off (the renders' A/B); the style itself when they already are. */
export function withoutComp(style: MusicStyle): MusicStyle {
  if (!compOf(style)) return style;
  let out = COMP_AS.get(style);
  if (!out) COMP_AS.set(style, (out = { ...style, banger: { ...style.banger!, comp: { ...style.banger!.comp, on: false } } }));
  return out;
}
/** Whether a patch is a drum of the drum bus (a kick, a snare, a noise hit: not the riser or the impact). */
export const drumPatch = (style: MusicStyle, patch: string): boolean => { const k = style.patches[patch]?.kind; return k === "kick" || k === "snare" || k === "noise"; };

/** The mix as it's heard: the style's, banger mode's own over it. */
export const mixOf = (style: MusicStyle): MusicStyle["mix"] & BangerDef["mix"] => { const B = bangerOn(style); return B ? { ...style.mix, ...B.mix } : style.mix; };

const mod = (a: number, n: number) => ((a % n) + n) % n;
const pick = <T>(xs: readonly T[], r: number): T => xs[Math.min(xs.length - 1, Math.floor(r * xs.length))];
const VEL: Record<string, number> = { X: 1, x: 0.8, o: 0.45, g: 0.28, r: 0.7 };
/** The minor pentatonic in scale steps (1, ♭3, 4, 5, ♭7: the same steps in dorian, aeolian and phrygian). */
const PENT = [0, 2, 3, 4, 6];
export const pentDeg = (i: number) => PENT[mod(i, 5)] + 7 * Math.floor(i / 5);

export interface HookNote { deg: number; dur: number }
/** A night's hook: eight bars a period (the motif, its varied ending, the motif, the question; the motif, its varied ending,
 *  the motif, the answer home), a note a sixteenth where one starts (scale steps over the key's root, in its lead's octave);
 *  the reply in its gaps the same way; and its pitches in turn (a clearing's). */
export interface Hook { period: (HookNote | null)[]; reply: (HookNote | null)[]; seq: number[]; motif: string; anchor: number; /** its highest and lowest steps, its line's and its reply's */ top: number; low: number; replyTop: number }

const onsets = (p: string): { pos: number; dur: number }[] => {
  const out: { pos: number; dur: number }[] = [];
  for (let i = 0; i < p.length; i++) if (p[i] !== "." && p[i] !== "-") { let d = 1; while (i + d < p.length && p[i + d] === "-") d++; out.push({ pos: i, dur: d }); }
  return out;
};
const HOOKS = new WeakMap<BangerDef, Map<number, Hook>>();
/** The hook of a seed (a night's; a knockdown's new record has a new one). */
export function nightHook(B: BangerDef, seed: number): Hook {
  let m = HOOKS.get(B);
  if (!m) HOOKS.set(B, (m = new Map()));
  const had = m.get(seed);
  if (had) return had;
  const r = (k: number) => hash2(seed, 811 + k, 3), H = B.hook;
  const motif = pick(H.motifs, r(1)), shape = pick(H.shapes, r(2)), anchor = pick(H.anchors, r(3));
  const ai = Math.floor(r(4) * H.answers.length), question = H.answers[ai], answer = H.answers[(ai + 1 + Math.floor(r(5) * (H.answers.length - 1))) % H.answers.length];
  const M = onsets(motif).map((o, j) => ({ ...o, i: anchor + shape[j % shape.length] }));
  // (its varied ending: the last note a step or two up, or a step down)
  const M2 = M.map((n, j) => (j === M.length - 1 ? { ...n, i: n.i + pick([1, -1, 2], r(6)) } : n));
  // (the question and the answer: down by step into the fifth or seventh, and into the root)
  const top = Math.max(...M.map(n => n.i)), into = (p: string, end: number) => { const os = onsets(p); return os.map((o, j) => ({ ...o, i: Math.min(top + 1, end + (os.length - 1 - j)) })); };
  const qEnd = anchor >= 3 ? pick([3, 4], r(7)) : pick([3, 1], r(7)), home = anchor >= 3 ? 5 : 0;
  const bars = [M, M2, M, into(question, qEnd), M, M2, M, into(answer, home)];
  const period: (HookNote | null)[] = Array(128).fill(null), reply: (HookNote | null)[] = Array(128).fill(null), seq: number[] = [];
  const rs = pick(H.replies, r(8));
  bars.forEach((bar, b) => {
    const busy = Array(16).fill(false);
    for (const n of bar) { period[b * 16 + n.pos] = { deg: pentDeg(n.i), dur: n.dur }; for (let k = 0; k < n.dur; k++) busy[n.pos + k] = true; if (b < 2 || b === 7) seq.push(pentDeg(n.i)); }
    // (the reply: in the bar's longest gap, on its eighths, up to three notes)
    let best = 0, at = -1;
    for (let i = 0; i < 16; i++) { if (busy[i]) continue; let n = 0; while (i + n < 16 && !busy[i + n]) n++; if (n > best) { best = n; at = i; } i += n; }
    if (best >= 4) { const s0 = at + (at % 2), n = Math.min(3, Math.floor((at + best - s0) / 2)); for (let j = 0; j < n; j++) reply[b * 16 + s0 + 2 * j] = { deg: pentDeg(anchor + rs[j % rs.length] - 5), dur: 2 }; }
  });
  const degs = period.filter(x => x).map(x => x!.deg), rdegs = reply.filter(x => x).map(x => x!.deg);
  const hook: Hook = { period, reply, seq, motif, anchor, top: Math.max(...degs), low: Math.min(...degs), replyTop: rdegs.length ? Math.max(...rdegs) : 0 };
  m.set(seed, hook);
  return hook;
}

/** A kit with its base's fields under its own. */
const KITS = new WeakMap<BangerDef, Map<string, Required<Omit<BangerKit, "base" | "pad" | "turn">> & Pick<BangerKit, "pad" | "turn">>>();
export function kitOf(B: BangerDef, name: string) {
  let m = KITS.get(B);
  if (!m) KITS.set(B, (m = new Map()));
  let k = m.get(name);
  if (!k) {
    const chain: BangerKit[] = [];
    for (let n: string | undefined = name, i = 0; n && i < 6; i++) { const K: BangerKit | undefined = B.kits[n]; if (!K) break; chain.unshift(K); n = K.base; }
    const all = Object.assign({}, ...chain) as BangerKit;
    k = { swing: all.swing ?? 0, drums: all.drums ?? [], breaks: all.breaks ?? all.drums ?? [], fills: all.fills ?? [], bass: all.bass ?? { patch: [], octave: 1, p: [] }, chords: all.chords ?? { patch: "", p: [] }, leads: all.leads ?? { soft: [], hard: [] }, reply: all.reply ?? [], pad: all.pad, turn: all.turn };
    m.set(name, k);
  }
  return k;
}
const BY_SECTION = new WeakMap<MusicStyle, Map<string, string>>();
/** The kit a wave plays: its night family's, else (the labs' arc, a section forced) the first family's that plays the section. */
export function kitName(style: MusicStyle, a: ArcStep, section: string): string {
  const B = style.banger!;
  if (a.family && B.families[a.family] && B.kits[B.families[a.family]]) return B.families[a.family];
  let m = BY_SECTION.get(style);
  if (!m) {
    BY_SECTION.set(style, (m = new Map()));
    for (const [f, F] of Object.entries(style.families ?? {})) for (const s of [F.land, ...F.four, ...F.breaks]) if (s && !m.has(s) && B.families[f]) m.set(s, B.families[f]);
  }
  return m.get(section) ?? (B.kits.house ? "house" : Object.keys(B.kits)[0]);
}

export type BangerRole = "drop" | "breaks" | "breakdown" | "build" | "victory";
/** Where the night's hook is heard (Ed, 2026-11-10: "one hook is good, but bring it back at key moments"), in bar `barIn` of a
 *  block: "whole" (a wave landing's first eight bars; the breakdown's drum & bass drop; the victory), "slow" (at half speed: the
 *  breakdown's quiet half, sung; a build's first half; a gentle wave's landing), "tease" (its first notes, faster and faster: a
 *  build's second half), or null: the wave's own riff, the reply voice and the chords carry the rest, so its return is a payoff. */
export function hookUse(role: BangerRole, barIn: number, bars: number, pass: number, dropAt: number, gentle: boolean): "whole" | "slow" | "tease" | null {
  if (role === "victory") return "whole";
  if (role === "drop") return pass === 0 && barIn < 8 ? (gentle ? "slow" : "whole") : null;
  if (role === "breakdown") return barIn < dropAt ? "slow" : gentle ? null : "whole";
  if (role === "build") return barIn * 2 < bars ? "slow" : gentle ? null : "tease";
  return null;
}

/** hookUse for bar `bar` of a block as the game plays it (the renders' notes of where the hook returns), or null where banger
 *  mode doesn't play. */
export function hookHeard(style: MusicStyle, plan: BlockPlan, sec: Resolved, bar: number, formStart: number, stumps?: number): ReturnType<typeof hookUse> {
  const B = bangerOn(style), a = style.arc[Math.max(0, Math.min(style.arc.length - 1, plan.arc))], role = B && bangerRole(style, plan, a, sec, formStart);
  if (!B || !role) return null;
  const H = hauntedOn(style), haunt = role === "breakdown" && !!H && H.sections.includes(plan.section);
  return hookUse(role, bar - plan.start, plan.bars, plan.pass ?? 0, role === "breakdown" ? (haunt ? hauntedDrop(style, plan.bars) : Infinity) : 0, stumps !== undefined && stumps < B.gentle.stumps);
}

/** What a block is in banger mode, or null where the music is as before (the boot's intro, layer by layer; the knockout): by
 *  its place in the form as the conductor deals it (two phrases of the groove, one of breakbeat, one of breakdown), else (a
 *  section forced) by its name. */
export function bangerRole(style: MusicStyle, plan: BlockPlan, a: ArcStep, sec: Resolved, formStart = 0): BangerRole | null {
  if (plan.section === style.intro || plan.section === style.knockout) return null;
  if (style.victory && plan.section === style.victory) return "victory";
  if (plan.section === a.build || sec.riser) return "build";
  const S = a.sections, F = style.form;
  if (S && F) {
    const P = F.phraseBars, pos = mod(plan.start - formStart, F.order.length * P);
    if (pos < 2 * P && (S.land === plan.section || S.four.includes(plan.section))) return "drop";
    if (pos >= 2 * P && pos < 3 * P && S.breaks.includes(plan.section)) return "breaks";
    if (pos >= 3 * P && S.breakdown.includes(plan.section)) return "breakdown";
  }
  if (hauntedOn(style)?.sections.includes(plan.section) || plan.section === "breakdown") return "breakdown";
  if (/breaks?$/i.test(plan.section) && plan.section !== "breaks") return "breaks";
  return "drop";
}

/** Banger mode's chord in bar `formBar` (bars since the seed's form began): the wave's loop for its mode, a bar a chord (the
 *  breakbeat phrase its other loop; the breakdown, and `slow`, two bars a chord), its tones. */
export function bangerChord(style: MusicStyle, a: Pick<ArcStep, "scale">, seed: number, formBar: number, sevenths = false, slow = false): { root: number; tones: number[] } {
  const B = style.banger!, F = style.form, P8 = F?.phraseBars ?? 8, L = (F?.order.length ?? 4) * P8;
  const P = B.progressions[a.scale ?? style.scale] ?? B.progressions[style.scale] ?? Object.values(B.progressions)[0];
  const fb = mod(formBar, L), ph = Math.floor(fb / P8), k = fb % P8;
  const loop = ph === 2 ? pick(P.b, hash2(seed, 823, 2)) : pick(P.a, hash2(seed, 821, 1));
  const root = loop[(ph === 3 || slow ? Math.floor(k / 2) : k) % loop.length];
  return { root, tones: sevenths ? [root, root + 2, root + 4, root + 6] : [root, root + 2, root + 4] };
}

/** The hook's note (if one starts) on the form's sixteenth `formStep`, for the music as before where banger mode leaves it
 *  (the boot's intro): the night's hook on `octave`. */
export function hookNoteAt(style: MusicStyle, seed: number, formStep: number): HookNote | null {
  if (formStep % 2) return null;
  const n = nightHook(style.banger!, seed).period[mod(formStep / 2, 128)]; // (at half speed: the boot is gentle)
  return n && { deg: n.deg, dur: n.dur * 2 };
}

const charAt = (p: string, i: number): { ch: string; dur: number } => {
  const ch = p[i];
  let dur = 1;
  if (ch !== "." && ch !== "-") while (dur < 64 && dur < p.length && p[(i + dur) % p.length] === "-") dur++;
  return { ch, dur };
};
const within = (v: BangerVoice, e: number, barIn: number, pass: number) => (!v.e || (e >= v.e[0] && e <= v.e[1])) && (!v.from || barIn >= v.from || pass > 0);

/** Every note starting on sixteenth `step` in banger mode (`role`: bangerRole), but the game's hooks' parts (a siege, a party
 *  area, an angry legend) and a clearing's layer, which the caller adds as before. */
export function bangerNotes(style: MusicStyle, plan: BlockPlan, sec: Resolved, step: number, ctx: ScoreContext, role: BangerRole): NoteEvent[] {
  const B = style.banger!, bar = Math.floor(step / 16), s = step - bar * 16, barIn = bar - plan.start, pass = plan.pass ?? 0;
  const a = style.arc[Math.max(0, Math.min(style.arc.length - 1, plan.arc))];
  const scale = style.scales[a.scale ?? style.scale] ?? style.scales[style.scale], transpose = (a.transpose ?? 0) + (sec.transpose ?? 0);
  const night = ctx.seed, seed = a.tune ? tuneSeed(ctx.seed, a.tune) : ctx.seed; // (the hook the night's; the chords, sounds and figures the wave's)
  // gentle till the night's second stump has its soundsystem (Ed, 2026-11-10); with no word of the stumps (the labs), never
  const gentle = ctx.stumps !== undefined && ctx.stumps < B.gentle.stumps;
  const formBar = bar - (ctx.formStart ?? 0), E = gentle ? Math.min(B.gentle.energy, a.energy) : Math.max(B.energyFloor, a.energy);
  const kn0 = kitName(style, a, plan.section), kit = kitOf(B, gentle && !B.gentle.keep.includes(kn0) ? B.gentle.kit : kn0);
  // (the night's hook, and the wave's own riff: another tune from the same banks, for between the hook's returns)
  const hook = nightHook(B, night), riff = nightHook(B, (seed ^ 0x5bd1e995) >>> 0);
  const H = hauntedOn(style), haunt = role === "breakdown" && !!H && H.sections.includes(plan.section);
  const dropAt = role === "breakdown" ? (haunt ? hauntedDrop(style, plan.bars) : Infinity) : 0, dropped = role === "breakdown" && barIn >= dropAt;
  const use = hookUse(role, barIn, plan.bars, pass, dropAt, gentle);
  const chord = bangerChord(style, a, seed, formBar, !!kit.chords.sevenths);
  const pb = barIn % 8, last = barIn === plan.bars - 1, sw = s % 2 === 1 ? kit.swing : 0;
  const out: NoteEvent[] = [], quiet = gentle ? 0.72 : 1; // (a gentle wave: everything softer)
  const r = (salt: number) => hash2(step, salt, seed + pass * 7919);
  const ev = (patch: string, midi: number | null, vel: number, dur: number, extra: Partial<NoteEvent> = {}) => {
    if (style.patches[patch]) out.push({ part: "b:" + patch, patch, step, offset: sw, dur, midi, vel: vel * quiet, straight: true, ...extra });
  };
  const kindOf = (patch: string) => { const p = style.patches[patch]; return !p ? "" : p.kind === "kick" && !p.noDuck ? "kick" : p.kind === "snare" || p.bursts ? "snare" : "top"; };
  // the sprinkles, dealt a phrase at a time (Ed, 2026-11-10: "sprinkle some of these in sometimes")
  const SP = B.spice, phraseNo = Math.floor(formBar / 8), deal = (salt: number) => hash2(seed, salt, phraseNo + pass * 131);
  const snapsOn = !!SP && !!style.patches[SP.snap] && deal(851) < (gentle ? SP.gentleSnaps : SP.snaps), snapsAlone = snapsOn && deal(853) < SP!.replace;
  const xylo = SP ? B.leads[SP.xylo] : undefined, xyAnswer = !!xylo && deal(857) < SP!.answer, xyRun = !!xylo && hash2(seed, 859, bar) < SP!.flourish;
  const drums = (voices: BangerVoice[], level = 1, keep?: (kind: string) => boolean, backbeat = false) => {
    let snapped = false;
    for (const v of voices) {
      if (!within(v, E, barIn, pass) || (keep && !keep(kindOf(v.patch)))) continue;
      const snare = backbeat && snapsOn && kindOf(v.patch) === "snare";
      const ch = v.p[(barIn * 16 + s) % v.p.length], lv = (v.level ?? 1) * level * (snare ? (snapsAlone ? 0 : 0.45) : 1) * (0.94 + 0.06 * r(v.patch.length * 31 + v.p.length));
      // (finger snaps on the kit's backbeat: where its snare or clap hits squarely)
      if (snare && !snapped && (ch === "X" || ch === "x")) { snapped = true; ev(SP!.snap, null, SP!.snapLevel * level, 1); }
      if (lv <= 0) continue;
      if (ch === "." || ch === "-" || VEL[ch] === undefined) continue;
      if (ch === "r") { ev(v.patch, null, 0.6 * lv, 0.5); out.push({ part: "b:" + v.patch, patch: v.patch, step, offset: sw + 0.5, dur: 0.5, midi: null, vel: 0.75 * lv, straight: true }); continue; }
      ev(v.patch, null, VEL[ch] * lv, 1);
    }
  };
  /** A bass figure's note here: a mid bass in its register, the sub under it. */
  const bass = (D: BangerBass, figures: string[], level: number, until = 16) => {
    if (!figures.length || !D.patch.length || s >= until) return;
    const p = pick(figures, hash2(seed, 829, Math.floor(formBar / 8))), i = (barIn * 16 + s) % p.length, { ch, dur: d0 } = charAt(p, i);
    const k = ({ "1": 0, "3": 2, "5": 4, "7": 6, "8": 7 } as Record<string, number>)[ch];
    if (k === undefined) return;
    const dur = until >= 16 ? d0 : Math.min(d0, until - s), lo = 28 + 12 * D.octave;
    let rootM = degreeToMidi(style, scale, chord.root, 0, transpose);
    while (rootM >= lo + 12) rootM -= 12;
    while (rootM < lo) rootM += 12;
    let m = rootM + degreeToMidi(style, scale, chord.root + k, 0, 0) - degreeToMidi(style, scale, chord.root, 0, 0);
    if (m > lo + 19) m -= 12;
    const patch = pick(D.patch, hash2(seed, 831, 3)), vel = 0.7 * (D.level ?? 1) * level * (0.95 + 0.05 * r(977));
    ev(patch, m, vel, dur, D.glide ? { glide: D.glide } : {});
    if (D.sub !== false && D.octave > 0 && style.patches.bgSub) { let sm = m - 12; while (sm >= 40) sm -= 12; ev("bgSub", sm, 0.9 * level, dur); }
  };
  /** The chords: stabs voiced into one octave (each tone where it's nearest), or a tone a hit in turn. */
  const chords = (level: number, until = 16) => {
    const C = kit.chords;
    if (!C.patch || !C.p.length || s >= until) return;
    const p = pick(C.p, hash2(seed, 833, Math.floor(formBar / 8))), i = (barIn * 16 + s) % p.length, { ch, dur } = charAt(p, i);
    if (VEL[ch] === undefined) return;
    const lo = (C.window ?? 57) + mod(transpose + 6, 12) - 6, fold = (t: number) => { let m = degreeToMidi(style, scale, t, 0, transpose); while (m < lo) m += 12; while (m >= lo + 12) m -= 12; return m; };
    const vel = VEL[ch] * (C.level ?? 1) * level;
    if (C.arp) {
      let n = 0;
      for (let j = i - (i % 16); j < i; j++) if (VEL[p[j]] !== undefined) n++;
      const T = chord.tones.length;
      ev(C.patch, fold(chord.tones[n % T]) + 12 * (Math.floor(n / T) % 2), vel, Math.min(dur, until - s));
    } else for (const t of chord.tones) ev(C.patch, fold(t), vel, Math.min(dur, until - s));
  };
  const pad = (level: number) => {
    const P = kit.pad;
    if (!P || s !== 0 || P.level <= 0 || (P.e && (E < P.e[0] || E > P.e[1]))) return;
    const lo = 57 + mod(transpose + 6, 12) - 6;
    for (const t of chord.tones.slice(0, 3)) { let m = degreeToMidi(style, scale, t, 0, transpose); while (m < lo) m += 12; while (m >= lo + 12) m -= 12; out.push({ part: "b:" + P.patch, patch: P.patch, step, offset: 0, dur: 16, midi: m, vel: 0.85 * P.level * level, straight: true }); }
  };
  const tier = E < B.softBelow ? kit.leads.soft : kit.leads.hard;
  const lead = B.leads[pick(tier.length ? tier : Object.keys(B.leads), hash2(seed, 839, 5))], reply = B.leads[pick(kit.reply.length ? kit.reply : Object.keys(B.leads), hash2(seed, 841, 7))];
  /** A note of a tune (`T`: the hook or the wave's riff; `part`: its line or its reply) on a voice, the whole line an octave or
   *  two down where its top would pass the register's ceiling (its shape kept), back up where that leaves it under the floor. */
  const R = B.register;
  /** A step as a MIDI note, never folded (degreeToMidi folds its top an octave down, which would break a line's shape). */
  const raw = (deg: number, octave: number) => { const n = scale.length, o = Math.floor(deg / n); return style.root + transpose + 12 * (octave + o) + scale[deg - o * n]; };
  const shiftOf = (L: { octave: number }, T: Hook, part: "period" | "reply", ceil: number | undefined) => {
    if (!R || ceil === undefined) return 0;
    const top = raw(part === "reply" ? T.replyTop : T.top, L.octave), low = raw(part === "reply" ? T.replyTop : T.low, L.octave);
    let sh = 0;
    while (top + sh > ceil) sh -= 12;
    while (low + sh < R.floor && top + sh + 12 <= ceil) sh += 12;
    return sh;
  };
  const tune = (L: { patch: string; octave: number; level: number } | undefined, n: HookNote | null, level: number, extra: Partial<NoteEvent> = {}, until = 16, T: Hook = hook, part: "period" | "reply" = "period") => {
    if (!L || !n || s >= until) return;
    const sh = shiftOf(L, T, part, L === reply ? R?.reply : R?.lead);
    ev(L.patch, (R ? raw(n.deg, L.octave) : degreeToMidi(style, scale, n.deg, L.octave, transpose)) + sh, (s % 4 === 0 ? 0.9 : 0.8) * L.level * level * (R?.level ?? 1), Math.min(n.dur, until - s), extra);
  };
  // the singer (the form's sung part, its effects by the night's family; haunted: her ghost below, else her wash above)
  const F = style.form, vocal = a.vocal && a.vocal !== "none" && style.patches[a.vocal] ? a.vocal : F?.sung.patch;
  const sing = (n: HookNote | null, dur: number, level: number) => {
    if (!n || !F || !vocal || !style.patches[vocal]) return false;
    let deg = n.deg;
    while (deg > F.range[1]) deg -= 7;
    while (deg < F.range[0]) deg += 7;
    const fx: NoteEvent["fx"] = style.voiceFxDark?.families?.includes(a.family ?? "") ? "dark" : "pure", base = { part: F.sung.part, patch: vocal, step, offset: 0, dur, fx };
    out.push({ ...base, midi: degreeToMidi(style, scale, deg, F.sung.octave, transpose), vel: 0.8 * level });
    if (haunt && H!.ghost.gain > 0) out.push({ ...base, midi: degreeToMidi(style, scale, deg + H!.ghost.interval, F.sung.octave, transpose), vel: 0.8 * level * H!.ghost.gain, ghost: true });
    else if (F.sung.wash) for (const iv of F.sung.wash.intervals) out.push({ ...base, offset: F.sung.wash.late, dur: Math.max(1, dur - F.sung.wash.late), midi: degreeToMidi(style, scale, deg + iv, F.sung.octave, transpose), vel: 0.8 * level * F.sung.wash.level, double: true });
    return true;
  };
  /** The hook at half speed from the section's top: a note of its first bars, twice as long. */
  const slow = (): HookNote | null => { const t = barIn * 16 + s; if (t % 2) return null; const n = hook.period[(t / 2) % 128]; return n && { deg: n.deg, dur: n.dur * 2 }; };
  const soft = gentle ? 0.6 : 1;
  // the singer's notes as a second main voice: a tune's note folded into her range; the chord's root and fifth on "ooh"
  const V = gentle ? undefined : B.vocals;
  const voxAt = (deg: number) => { let m = degreeToMidi(style, scale, deg, 2, transpose); while (m > V!.range[1]) m -= 12; while (m < V!.range[0]) m += 12; return m; };
  const vox = (n: HookNote | null, level: number, until = 16) => { if (V && n && s < until && style.patches[V.double]) out.push({ part: "b:" + V.double, patch: V.double, step, offset: sw, dur: Math.min(Math.max(2, n.dur), Math.max(1, until - s)), midi: voxAt(n.deg), vel: 0.85 * level, straight: true }); };
  const ooh = (level: number) => { if (V && s === 0 && style.patches[V.pad]) for (const t of [chord.root, chord.root + 4]) out.push({ part: "b:" + V.pad, patch: V.pad, step, offset: 0, dur: 16, midi: voxAt(t), vel: 0.8 * V.padLevel * level, straight: true }); };
  const crash = (vel: number) => { if (s === 0) ev("bgCrash", null, vel, 16, { offset: 0 }); };
  const impact = () => { if (s === 0 && style.patches.impact) out.push({ part: "impact", patch: "impact", step, offset: 0, dur: 16, midi: null, vel: 1 }); };
  const riser = (from: number, to: number, dur = 16, patch = "riser") => { if (s === 0 && style.patches[patch]) out.push({ part: patch, patch, step, offset: 0, dur, midi: null, vel: 1, from, to }); };
  /** A phrase's last bar: the fill dealt, the kick, snare and bass out from its middle, the tops from its last beat. */
  const fillBar = (voices: BangerVoice[], level = 1) => {
    drums(voices, level, k => (s < 8 ? true : s < 12 ? k === "top" : false), true);
    // (now and then the xylophone runs up into the next phrase over the last beat)
    if (xyRun && s >= 12) tune(xylo, { deg: pentDeg(hook.anchor + s - 15), dur: 1 }, 0.8);
    const f = B.fills[pick(kit.fills.length ? kit.fills : Object.keys(B.fills), hash2(seed, 843, bar))];
    if (f) drums(f, level);
  };

  if (role === "drop" || role === "victory" || role === "breaks") {
    const voices = role === "breaks" ? kit.breaks : kit.drums, fill = pb === 7 || last, half = barIn >= 8 || pass > 0;
    if (fill) fillBar(voices); else { drums(voices, 1, undefined, true); if (pb === 3 && kit.turn) drums(kit.turn); }
    if (role === "victory") drums(B.victory);
    if (barIn === 0) { crash(0.9 * soft * soft); if (role !== "breaks" && pass === 0 && !gentle) impact(); } else if (pb === 0 && !gentle) crash(0.6);
    if (pb === 7 && !last && !gentle) riser(0.35, 0.85, 12, "bgSweep");
    const until = fill ? 12 : 16;
    bass(kit.bass, role === "breaks" && kit.bass.breaks ? kit.bass.breaks : kit.bass.p, 1, until);
    chords(1, until); pad(1);
    // the tune: the night's hook at its key moments (hookUse: a wave landing's first eight bars, the victory), whole on the lead
    // (a gentle wave: at half speed); between them the wave's own riff, on the reply voice where the lead rests (the breakbeat
    // phrase's first half, a later pass's first phrase), the reply answering in the gaps
    const slot = (pb * 16 + s) % 128;
    ooh(1);
    if (use === "whole") { tune(lead, hook.period[slot], 1); vox(hook.period[slot], V?.doubleLevel ?? 0); if (role === "victory") tune(reply, hook.reply[slot], 0.7, {}, 16, hook, "reply"); if (xyAnswer) tune(xylo, hook.reply[slot], 0.8, {}, 16, hook, "reply"); }
    else if (use === "slow") tune(lead, slow(), 0.9);
    else {
      const rests = role === "breaks" ? barIn < 4 : pass % 2 === 1 && barIn < 8;
      tune(rests ? reply : lead, riff.period[slot], rests ? 0.9 : 0.9 * (gentle ? 0.85 : 1), {}, 16, riff);
      if (!rests && (half || role === "breaks")) tune(reply, riff.reply[slot], 0.7, {}, 16, riff, "reply");
      if (xyAnswer) tune(xylo, riff.reply[slot], 0.8, {}, 16, riff, "reply"); // (now and then the xylophone answers in the gaps)
      if (!rests && V) { const first = riff.period.slice(pb * 16, pb * 16 + 16).findIndex(x => x); if (first === s) vox(riff.period[slot], V.stabLevel, until); } // (a sung stab on the riff's first note)
    }
  } else if (role === "breakdown") {
    if (!dropped) {
      // the quiet half: no drums; the pad and a long sub, the singer on the hook at half speed
      pad(0.9);
      if (s === 0 && barIn % 2 === 0) bass({ patch: ["bgSub"], octave: 0, sub: false, p: ["1-------------------------------"] }, ["1-------------------------------"], 0.7);
      const n = slow();
      if (n && !sing(n, n.dur, 1)) tune(reply, n, 0.9);
      // (now and then: the xylophone's figure in the hook's gaps, a finger snap on the third beat)
      if (SP && xylo && hash2(seed, 861, phraseNo) < SP.breakdown) tune(xylo, hook.reply[((barIn % 8) * 16 + s) % 128], 0.7, {}, 16, hook, "reply");
      if (SP && s === 8 && style.patches[SP.snap] && hash2(seed, 863, phraseNo) < SP.breakdownSnaps) ev(SP.snap, null, 0.7 * SP.snapLevel, 1);
      if (Number.isFinite(dropAt)) {
        const rb = Math.max(0, Math.min(H!.drop.riserBars, dropAt)), k = barIn - (dropAt - rb);
        if (k >= 0 && k < rb) riser(k / rb, (k + 1) / rb);
      } else if (last) drums(B.fills[pick(kit.fills.length ? kit.fills : Object.keys(B.fills), hash2(seed, 843, bar))] ?? []);
    } else {
      // the drop: drum & bass, the hook whole on the lead
      const k = barIn - dropAt;
      if (k === 0) { crash(0.9 * soft); if (H!.drop.impact && !gentle) impact(); }
      if (last) fillBar(B.dnb.drums, soft); else drums(B.dnb.drums, soft);
      bass(B.dnb.bass, B.dnb.bass.p, 0.95 * soft, last ? 12 : 16);
      pad(0.7);
      const slot = ((k % 8) * 16 + s) % 128, T = use === "whole" ? hook : riff;
      tune(lead, T.period[slot], 1, {}, last ? 12 : 16, T);
      if (use === "whole") vox(T.period[slot], V?.doubleLevel ?? 0, last ? 12 : 16);
      tune(reply, T.reply[slot], 0.7, {}, last ? 12 : 16, T, "reply");
    }
  } else {
    // the build: things taken away. The bass leaves at the half, the kick thins and leaves for the last quarter, the snare roll
    // doubles, the hook's first notes come faster and faster, the last beat all but silent
    const n = plan.bars, q = Math.floor((barIn * 4) / n), p = (barIn + s / 16) / n, gap = last && s >= 12;
    riser(barIn / n, (barIn + 1) / n, last ? 12 : 16, "bgRiser"); // (its own, quieter: the build's end stays under the drop)
    pad(q < 2 ? 0.8 : 0.5);
    if (gentle) {
      // (a gentle build: the groove on, its kick out for the last bar, a shaker in sixteenths rising, the hook slow, then the riff)
      if (!last) { drums(kit.drums); bass(kit.bass, kit.bass.p, 0.9); } else if (!gap) drums(kit.drums, 0.9, k => k === "top");
      if (!gap) ev("shaker", null, (0.25 + 0.5 * p) * (s % 2 ? 0.7 : 1), 1);
      const sl = use === "slow" ? slow() : null;
      if (use === "slow") { if (sl && !(a.vocal !== "none" && sing(sl, sl.dur, 0.9))) tune(lead, sl, 0.8); } else if (!gap) tune(lead, riff.period[(pb * 16 + s) % 128], 0.8, {}, 16, riff);
    } else if (!gap) {
      const kickV = kit.drums.find(v => kindOf(v.patch) === "kick");
      if (q < 2) { drums(kit.drums, 1, k => k !== "snare"); bass(kit.bass, kit.bass.p, 0.9); }
      else if (q === 2) { drums(kit.drums, 0.9, k => k === "top"); if (kickV && s % 8 === 0) ev(kickV.patch, null, 0.9, 1); }
      const roll = q === 0 ? s % 4 === 0 : q === 1 ? s % 2 === 0 : true, lv = 0.15 + 0.3 * p;
      if (roll) { ev("snare", null, lv * (s % 4 === 0 ? 1 : 0.8), 1); if (q === 3 && barIn >= n - 1) out.push({ part: "b:snare", patch: "snare", step, offset: sw + 0.5, dur: 0.5, midi: null, vel: lv * 0.8, straight: true }); }
      // the hook: its first bar at half speed sung (a wave with a singer) or its first half-bar played, then its opening
      // beat, then its first note, on every beat, eighth and sixteenth
      const first = hook.period.find(x => x) ?? null;
      if (q < 2) { const sl = slow(); if (sl && !(a.vocal !== "none" && sing(sl, sl.dur, 0.9))) tune(lead, sl, 0.7); }
      else if (q === 2) tune(lead, hook.period[s % 4], 0.2 + 0.2 * p);
      else if (first && (barIn >= n - 1 || s % 2 === 0)) tune(lead, { deg: first.deg, dur: 1 }, 0.2 + 0.2 * p);
    }
  }
  // the party's sparkle (a woken area near: the game's hook, live): the reply voice has the hook, by how near
  if ((ctx.party ?? 0) > 0.01 && role !== "build" && !(role === "breakdown" && !dropped)) tune(reply, riff.reply[(pb * 16 + s) % 128], 0.7 * ctx.party!, { hook: "party" }, 16, riff, "reply");
  return out;
}

/** The banger block's problems (empty when it's sound): every patch, lead, fill and kit named exists, every pattern runs whole
 *  bars, every family has a kit. */
export function checkBanger(style: MusicStyle): string[] {
  const B = style.banger, errs: string[] = [];
  if (!B) return errs;
  const patch = (where: string, p: string) => { if (!style.patches[p]) errs.push(`banger ${where}: no patch "${p}"`); };
  const pat = (where: string, p: string) => { if (!p || p.length % 16) errs.push(`banger ${where}: pattern "${p}" isn't whole bars`); };
  const voices = (where: string, vs: BangerVoice[] | undefined) => { for (const v of vs ?? []) { patch(where, v.patch); pat(`${where} ${v.patch}`, v.p); } };
  const bassOf = (where: string, D: BangerBass) => { for (const p of D.patch) patch(where, p); for (const p of [...D.p, ...(D.breaks ?? [])]) pat(where, p); };
  for (const [k, L] of Object.entries(B.leads)) patch(`lead ${k}`, L.patch);
  for (const [k, f] of Object.entries(B.fills)) voices(`fill ${k}`, f);
  voices("dnb", B.dnb.drums); bassOf("dnb bass", B.dnb.bass); voices("victory", B.victory);
  for (const p of [...B.hook.motifs, ...B.hook.answers]) { pat("hook", p); if (p.length !== 16) errs.push(`banger hook: "${p}" isn't one bar`); }
  for (const name of Object.keys(B.kits)) {
    const K = kitOf(B, name);
    if (B.kits[name].base && !B.kits[B.kits[name].base!]) errs.push(`banger kit ${name}: no base "${B.kits[name].base}"`);
    voices(`kit ${name}`, K.drums); voices(`kit ${name} turn`, K.turn); voices(`kit ${name} breaks`, K.breaks);
    if (!K.drums.length) errs.push(`banger kit ${name}: no drums`);
    bassOf(`kit ${name} bass`, K.bass);
    if (K.chords.patch) patch(`kit ${name} chords`, K.chords.patch);
    for (const p of K.chords.p) pat(`kit ${name} chords`, p);
    if (K.pad) patch(`kit ${name} pad`, K.pad.patch);
    for (const l of [...K.leads.soft, ...K.leads.hard, ...K.reply]) if (!B.leads[l]) errs.push(`banger kit ${name}: no lead "${l}"`);
    if (!K.leads.soft.length || !K.leads.hard.length || !K.reply.length) errs.push(`banger kit ${name}: no leads`);
    for (const f of K.fills) if (!B.fills[f]) errs.push(`banger kit ${name}: no fill "${f}"`);
  }
  if (!B.kits[B.gentle.kit]) errs.push(`banger gentle: no kit "${B.gentle.kit}"`);
  for (const k of B.gentle.keep) if (!B.kits[k]) errs.push(`banger gentle: no kit "${k}"`);
  for (const [f, k] of Object.entries(B.families)) { if (!B.kits[k]) errs.push(`banger family ${f}: no kit "${k}"`); if (style.families && !style.families[f]) errs.push(`banger families: no family "${f}"`); }
  for (const f of Object.keys(style.families ?? {})) if (!B.families[f]) errs.push(`banger: family "${f}" has no kit`);
  for (const [m, P] of Object.entries(B.progressions)) { if (!style.scales[m]) errs.push(`banger progressions: no scale "${m}"`); if (!P.a.length || !P.b.length) errs.push(`banger progressions ${m}: empty`); }
  for (const p of ["bgCrash", "bgSweep", "bgRiser", "bgSub", "snare"]) patch("fixed", p);
  if (B.vocals) { patch("vocals", B.vocals.double); patch("vocals", B.vocals.pad); }
  if (B.spice) { patch("spice", B.spice.snap); if (!B.leads[B.spice.xylo]) errs.push(`banger spice: no lead "${B.spice.xylo}"`); }
  return errs;
}
