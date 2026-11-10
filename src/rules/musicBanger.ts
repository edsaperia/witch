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
export interface BangerBass { patch: string[]; octave: number; sub?: boolean; glide?: number; level?: number; p: string[]; breaks?: string[];
  /** Under a house groove's ostinato: the bouncing figure (the root on the beat and a jump off it: "8" the octave where that fits under E2, else its fifth), and the busier one a later
   *  repeat takes (eighth-note pickups into the beat). */
  bounce?: string[] }
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
  /** The rolling bed's voice where it's the kit's own (a lead's name: the families with their own character), else the
   *  xylophone; `half`: a half-time kit, its bed in eighths and no busier tops. */
  bed?: string; half?: boolean;
  /** Four on the floor: its grooves' riff the ostinato. */
  four?: boolean;
  /** The share of its phrases the xylophone takes the chords in (the style's `banger.space.xylo`); none: never. */
  xylo?: number;
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
  mix: { duck?: number; duckHold?: number; air?: number; lowCut?: number; drive?: number; reverbTime?: number; reverbPre?: number };
  /** Space (Ed, 2026-11-11: "more space in general, more xylophone chords and arpeggios, and the rhythm section bigger in the
   *  mix"). `balance`: each group's level against the rest (the one limiter makes it relative: the drums and bass up, the pads,
   *  chords and the singer's parts down). `echo`: a ping-pong written into the notes, a chord hit or xylophone note again
   *  `steps` sixteenths later on the right and again on the left, at `levels` of it (on the patches named <patch>R and
   *  <patch>L, where the style has them). `riffRest`: the wave's riff rests in every fourth bar's place third (bars 3 and 7
   *  of eight), a gap the drums fill. `thin`: a groove's chord hits without their root (the bass has it). `xylo`: the
   *  xylophone as a chord instrument, in the share of phrases its kit says: its `voice` (of `leads`; `low` the darker one
   *  for the gentle waves), the lowest note of the octave its chords are voiced in (`window`; `lowWindow` the gentle one's), `level`, and its `figures`,
   *  a phrase taking one (16 characters a bar: "x" a block chord, "a" "b" "c" the chord's tones from the bottom, "1" its
   *  root an octave under, "t" a tremolo's stroke on two of them, "." a rest); `roll`: the figure a phrase's fourth bar
   *  takes half the time. */
  space?: {
    balance: { drums: number; bass: number; pad: number; chords: number; vocals: number };
    echo: { steps: number; levels: number[] };
    /** The lowest note of the octave the kits' chords and pads are voiced in (MIDI; a kit's own `window` over it): low, clear of
     *  the bass and under the lead (Ed, 2026-11-11: "Harmony parts lower"). */
    chordWindow?: number;
    riffRest: boolean; thin: boolean;
    /** The rolling bed under the tune (Ed, 2026-11-11): a broken chord in even sixteenths, a figure a phrase ("a" "b" "c" the
     *  chord's tones from the bottom, "d" the bottom one's octave), on `voice` (of `leads`; `low` a gentle wave's) in the octave
     *  from `window` (`lowWindow`), at `level`; `dream`: its level in the dreamy sections. */
    bed?: { voice: string; low: string; window: number; lowWindow: number; level: number; dream: number; figures: string[] };
    xylo: { voice: string; low: string; window: number; lowWindow: number; level: number; figures: Record<string, string>; roll: string };
  };
  /** The singer as the other main sound (Ed, 2026-11-10: "squares and vocals as the main sound"), after the second stump: she
   *  doubles the hook wherever it's whole (`double`, a chop of her notes, at `doubleLevel`), holds the chord's root and fifth on
   *  "ooh" under the grooves (`pad`, `padLevel`), and stabs the first note of the wave's riff each bar (`stabLevel`); every note
   *  folded into `range` (MIDI: her recorded notes). */
  vocals?: { /** a second voice a third under her doubling at the hook's key moments (parallel thirds and sixths), at this share of it */ thirds?: number; double: string; doubleLevel: number; pad: string; padLevel: number; stabLevel: number; range: [number, number];
    /** Her own line's notes (the breakdowns', the builds'): folded into these (MIDI), a woman's register. */
    line?: [number, number];
    /** The singer as the lead instrument (Ed, 2026-11-11: "More female vocal as the lead instrument, and the lead vocal to sound
     *  more 'ethereal'"): after the second stump, in every family but those that keep their own lead (a kit with a `bed` of its
     *  own), she carries the hook and the wave's riff herself on `patch` at `level`: their long notes, and their plain sixteenth
     *  runs at `runLevel` of that (`runs`; the thirty-seconds and triplets are the synth's alone), the whole line moved by
     *  octaves into `range` (MIDI), its shape kept. The kit's lead supports her: the same line at `support` of its level, an
     *  octave under where that stays over the register's floor; on the house ostinato she has its accents and held notes
     *  (`ostinato`: her level there) and the lead its `ostSupport`. Ethereal: each long note also on `stack` (her own voice left
     *  and right, a few cents off, softer in their attack: `stackLevel`) and an octave over on `shimmer` (a slow sheen into the
     *  reverb: `shimmerLevel`). `more`: her doubling's level in the families that keep their lead. */
    lead?: { patch: string; level: number; runs: boolean; runLevel: number; range: [number, number]; support: number; ostinato: number; ostSupport: number; stack: string[]; stackLevel: number; shimmer: string; shimmerLevel: number; more: number };
    /** Her harmony (Ed, 2026-11-11: "increase vocals in the harmony, which can stack with the xylophone"): the sung chord's
     *  voices (3: root, fifth and the third, or the seventh where the kit plays sevenths; before the second stump `gentleVoices`
     *  of them at `gentleLevel`), voiced in the octave from `window` (MIDI: under the xylophone's, so the two stack as one
     *  harmony layer, bars short on top, voices held beneath), and the share of the xylophone's block-chord phrases she sings
     *  its off-beat hits with it (`stabs`, at `chordStabLevel`). */
    harmony?: { voices: number; window: number; gentleVoices: number; gentleLevel: number; stabs: number; chordStabLevel: number } };
  /** The compressors (Ed, 2026-11-10: "Is it possible to add a compressor?"; platform/audio/musicEngine.ts), `on` false none:
   *  `drums`, the drum bus's (kick, snare, clap, hats, percussion, fills and crash: for punch): its threshold (dB), knee (dB),
   *  ratio, attack (s: slow enough that the hit's front comes through), release in beats (timed to the tempo), `mix` the share
   *  of the squashed drums blended under the dry ones (parallel, "New York": 1 all squashed, 0 none) and `makeup` its gain,
   *  `room` a short room on the drum bus's top (the snare, clap and hats: its length s, its send, the high-pass before it Hz);
   *  `glue`, the master's before the limiter (the mix breathing together): threshold, knee, a low ratio, a slow attack, release
   *  (s) and `makeup` (a gain after it: the node's own make-up taken back, and a little more into the limiter). */
  comp?: { on?: boolean; drums?: { threshold: number; knee: number; ratio: number; attack: number; releaseBeats: number; mix: number; makeup: number; room?: { time: number; send: number; hp: number } }; glue?: { threshold: number; knee: number; ratio: number; attack: number; release: number; makeup: number } };
  /** The house grooves' ostinato (`ostinato`): its banks (`heads`: the two accented hits' lengths in sixteenths; `threes`: how
   *  many three-sixteenth groups follow; `arts`: the chain's articulations in turn, "A" an accent, "s" staccato, "t" held;
   *  `shapes`: its contours, steps of the minor pentatonic), the unison stack on it (the xylophone an octave under at `xylo`
   *  of its level, the singer on its accents at `vocal`), and what each eight-bar repeat adds (`thirds`: a harmony line a
   *  third under it, at this share of its level). */
  ostinato?: { /** the tresillo riff (Ed, 2026-11-11, "Another great melody": the traits only): the `share` of waves whose house riff is a chant on three, three and two
     *  instead of the chain (`groups`: its notes' lengths in sixteenths over the two bars, a long one tied over the bar line; `shapes`: scale steps from its note, the same
     *  note struck two or three times and a stepwise answer); every note an accent the singer chants with the lead */
    tresillo?: { share: number; groups: number[][]; shapes: number[][] };
    /** the kit's chords under it: a stab on every off-beat (the bass on the beat: "oom-chk") */ stabs?: string; stabLevel?: number; heads: number[][]; threes: number[]; arts: string[]; shapes: number[][]; xylo: number; vocal: number; thirds: number };
  /** The drums drive (Ed, 2026-11-11: "The drums drive everything", "a hard, fast, breakbeat-driven section with heavy,
   *  distorted bass"): the tops added to a heavier groove (`groove`), the ghost snares and running hats added to a breakbeat
   *  phrase and the drum & bass (`breaks`), and the distorted mid bass over the sub (`bass.patch`, E2 to D#3: its level in a
   *  breakbeat phrase, the drum & bass, and under a landing's hook). */
  drive?: { groove: BangerVoice[]; breaks: BangerVoice[]; bass: { patch: string; breaks: number; dnb: number; landing: number }; /** a build's first bars: the bass's galloping figure (two bars or one) */ gallop?: string };
  /** The dreamy side (Ed, 2026-11-11: "Airy, high, stacked falsetto verses give way to a hard, fast, breakbeat-driven section
   *  with heavy, distorted bass. The contrast is the thrill."; "We still have breakdowns and 'house' sections as before, but
   *  integrate these ideas however you can"): in a breakdown's quiet half and a build's first
   *  half the singer's long notes stacked, the same note on `stack`'s patches (left and right) and its octave on `octave` (at
   *  `octaveLevel` of them), at `level`; `drums`: the tops' level in a build's second quarter. */
  dream?: { stack: string[]; octave: string; octaveLevel: number; level: number; drums: number;
    /** The dreamy sections under the drops (the contrast): her own line's level there, the pad's, and the breakdown's riser (a patch: the quieter one). */
    sung?: number; pad?: number; sub?: number; riser?: string; /** every part's level in a dreamy stretch against the drops */ down?: number };
  /** The minor feel (Ed, 2026-11-11: "More 'minor feel'"): a wave with no mode of its own plays in `scale` (natural minor),
   *  but `dorian` of them (the style's own scale, as a colour); in `scale` the last chord of a loop on the fifth step is made
   *  major, its third the raised seventh (harmonic minor's, at the cadence: `cadence`), and every part's seventh step raised
   *  with it for that bar. */
  minor?: { scale: string; dorian: number; cadence: boolean };
  /** The chord loops by mode, a bar a chord (scale steps, 0 the key's root): `a` the drop's, `b` the breakbeat phrase's. */
  progressions: Record<string, { a: number[][]; b: number[][] }>;
  /** The tunes' banks ("long, then run"): one-bar motif rhythms and question-and-answer rhythms ("L" a long note, "-" held,
   *  "r" a run's sixteenth by step into the next long note, "t~" a triplet into it, "g" a pair of thirty-seconds about it,
   *  "." a rest; an ornament always leads to a long note, this bar's or the next bar's first), the long notes' shapes (tones
   *  of the minor triad over the anchor, a long note each), the anchors (0 the root, 1 the third, 2 the fifth), the reply's
   *  shapes (the minor pentatonic). */
  hook: { motifs: string[]; answers: string[]; shapes: number[][]; anchors: number[]; replies: number[][];
    /** A chant's shapes (a motif of long notes alone, three, three and two: the same note struck again, then a step). */
    chants?: number[][];
    /** The chant as a template of its own (Ed, 2026-11-11, "Another great melody": the traits only): `chant` the share of tunes
     *  that are one, their rhythms `tresillos` (three long notes on three, three and two, no ornaments). Its note is struck
     *  again, and its varied ending answers a step away. */
    chant?: number; tresillos?: string[] };
  leads: Record<string, { patch: string; octave: number; level: number }>;
  /** Sprinkled in sometimes (Ed, 2026-11-10: "Some Xylophone and Finger snap snares help with the spooky vibe; sprinkle some of
   *  these in sometimes"), each dealt by the wave's seed an eight-bar phrase at a time: the xylophone (`xylo`, a voice of
   *  `leads`) answering in the tune's gaps (`answer`: the share of phrases), a four-note run into the next phrase over a fill's
   *  last beat (`flourish`), a figure in a breakdown's quiet half (`breakdown`). And the finger snaps (`snap`, a patch, at
   *  `snapLevel`; Ed, 2026-11-11: "Don't need claps and snaps at the same time - try them at different times, snaps during
   *  lighter periods"): the backbeat's in the lighter periods, in the clap's or snare's place, never with it: every gentle
   *  wave, a breakdown's quiet half, a build's first half, and `snaps` of the grooves' phrases between the hook's returns;
   *  the clap (the snare in breaks, jungle and hard) has the landings, the rest of the grooves, the breakbeat phrases, the
   *  drum & bass, a build's second half and the victory. A phrase is one or the other whole. */
  spice?: { xylo: string; answer: number; flourish: number; breakdown: number; snap: string; snaps: number; snapLevel: number };
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

/** The stable tones a tune's long notes sit on (the minor triad: 1, ♭3, 5), by index. */
const STAB = [0, 2, 4];
export const stabDeg = (i: number) => STAB[mod(i, 3)] + 7 * Math.floor(i / 3);

/** A note of a tune: its scale step and length (sixteenths; a thirty-second 0.5, a triplet's 2/3). `off`: it starts this
 *  fraction of a sixteenth after its step (a thirty-second pair's second, a triplet's second and third: exact rhythms, never
 *  slides). `long`: one of the held notes the tune hangs on (the singer doubles these alone). `sharp`: the seventh step as a
 *  leading note, raised where the bar's chord has no natural seventh of its own (harmonic minor's colour: after the flat
 *  sixth, an augmented second). `into`: a run's note that lands on the next bar's first note. */
export interface HookNote { deg: number; dur: number; off?: number; long?: true; sharp?: true; into?: true; /** an ostinato's: its own level (0-1), and an accent (the singer's with it) */ vel?: number; acc?: true }
/** A night's hook, "long, then run" (Ed, 2026-11-11): eight bars a period (the motif, its varied ending, the motif, the
 *  question; the motif, its varied ending, the motif, the answer home). A bar is a held note or two with rests between, and
 *  between them the ornaments, written out as exact notes: a run of sixteenths by step into the next long note (a pickup after
 *  a rest), a triplet turn, a pair of thirty-seconds around it. `period`: the note starting on each sixteenth; `orn`: the
 *  notes starting inside it (`off`); the reply in its gaps; its pitches in turn (a clearing's). */
export interface Hook { period: (HookNote | null)[]; orn: HookNote[][]; reply: (HookNote | null)[]; seq: number[]; motif: string; anchor: number; /** its highest and lowest steps, its line's and its reply's */ top: number; low: number; replyTop: number }

interface Tok { pos: number; kind: "L" | "r" | "t" | "g"; dur: number }
/** A bar's rhythm as its parts: "L" a long note ("-" held), "r" a run's sixteenth, "t~" a triplet over two sixteenths, "g" a
 *  pair of thirty-seconds, "." a rest. */
const toks = (p: string): Tok[] => {
  const out: Tok[] = [];
  for (let i = 0; i < p.length; i++) {
    const c = p[i];
    if (c === "L") { let d = 1; while (i + d < p.length && p[i + d] === "-") d++; out.push({ pos: i, kind: "L", dur: d }); }
    else if (c === "r" || c === "g") out.push({ pos: i, kind: c, dur: 1 });
    else if (c === "t") out.push({ pos: i, kind: "t", dur: 2 });
  }
  return out;
};
const HOOKS = new WeakMap<BangerDef, Map<number, Hook>>();
/** The hook of a seed (a night's; a wave's own riff; a knockdown's new record has a new one). */
export function nightHook(B: BangerDef, seed: number): Hook {
  let m = HOOKS.get(B);
  if (!m) HOOKS.set(B, (m = new Map()));
  const had = m.get(seed);
  if (had) return had;
  const r = (k: number) => hash2(seed, 811 + k, 3), H = B.hook;
  // (a motif with no ornaments is a chant: the same note struck again on three, three and two, its shape one of the chants')
  const motif = H.tresillos?.length && r(10) < (H.chant ?? 0) ? pick(H.tresillos, r(11)) : pick(H.motifs, r(1)), chant = !/[rgt]/.test(motif) && !!H.chants?.length;
  const shape = pick(chant ? H.chants! : H.shapes, r(2)), anchor = pick(H.anchors, r(3));
  const ai = Math.floor(r(4) * H.answers.length), question = H.answers[ai], answer = H.answers[(ai + 1 + Math.floor(r(5) * (H.answers.length - 1))) % H.answers.length];
  const longsOf = (p: string) => toks(p).filter(t => t.kind === "L").length;
  // the long notes' pitches, a bar at a time: the motif's on the minor triad about its anchor; its varied ending a tone of
  // the triad up or down, or the flat sixth; the question down into the fifth (from the flat sixth), the leading note or the
  // second; the answer down into the root
  const M = Array.from({ length: longsOf(motif) }, (_, j) => stabDeg(anchor + shape[j % shape.length]));
  const lastM = anchor + shape[(M.length - 1) % shape.length], vary = chant ? stabDeg(lastM) + (r(6) < 0.5 ? 1 : -1) /* (a chant's answer: a step away) */ : pick([stabDeg(lastM + 1), stabDeg(lastM - 1), 5 + 7 * Math.floor(stabDeg(lastM) / 7)], r(6));
  const M2 = M.map((d, j) => (j === M.length - 1 ? (vary === d ? stabDeg(lastM + 1) : vary) : d));
  const high = anchor >= 2, home = high ? 7 : 0, qEnd = high ? pick([4, 6, 4], r(7)) : pick([4, -1, 1], r(7));
  const above = (d: number) => { let i = -6; while (stabDeg(i) <= d) i++; return i; };
  const down = (n: number, end: number) => Array.from({ length: n }, (_, j) => (j === n - 1 ? end : stabDeg(Math.min(anchor + 3, above(end) + n - 2 - j))));
  const Q = down(longsOf(question), qEnd), A = down(longsOf(answer), home);
  if (mod(qEnd, 7) === 4 && Q.length > 1) Q[Q.length - 2] = qEnd + 1; // (the flat sixth falling to the fifth: the minor's own sigh)
  const bars: { p: string; longs: number[] }[] = [motif, motif, motif, question, motif, motif, motif, answer].map((p, b) => ({ p, longs: b === 3 ? Q : b === 7 ? A : b % 2 ? M2 : M }));
  const period: (HookNote | null)[] = Array(128).fill(null), orn: HookNote[][] = Array.from({ length: 128 }, () => []), reply: (HookNote | null)[] = Array(128).fill(null), seq: number[] = [];
  const line: HookNote[] = []; // (every note in order, for the leading notes)
  let prev: number | null = null;
  bars.forEach((bar, b) => {
    const ts = toks(bar.p), next = bars[(b + 1) % 8], nextFirst = toks(next.p)[0];
    let li = 0;
    if (b % 2 === 0) prev = M2[M2.length - 1]; // (the motif the same each time: its first run as if from its varied ending)
    for (let i = 0; i < ts.length; i++) {
      const t = ts[i], at = b * 16 + t.pos;
      if (t.kind === "L") { const n: HookNote = { deg: bar.longs[li++], dur: t.dur, ...(t.dur >= 3 ? { long: true as const } : {}) }; period[at] = n; line.push(n); prev = n.deg; continue; }
      // (an ornament: the group it's in runs to the next long note, this bar's or the next bar's first)
      let j = i, k = 0; // k: the ornament's place in its group counted from the long note back
      while (j < ts.length && ts[j].kind !== "L") j++;
      const inBar = j < ts.length, T = inBar ? bar.longs[li] : nextFirst?.kind === "L" && nextFirst.pos === 0 ? next.longs[0] : null;
      if (T === null) continue; // (nowhere to land: a rest)
      for (let q = i + 1; q < j; q++) k += ts[q].kind === "t" ? 3 : ts[q].kind === "g" ? 2 : 1;
      const up = prev === null || prev < T || (prev === T && hash2(seed, 815, (b === 3 || b === 7 ? b : b % 2) * 16 + (inBar ? ts[j].pos : 16)) < 0.5), into = inBar ? {} : { into: true as const };
      const put = (slot: number, n: HookNote) => { if (n.off) orn[slot].push(n); else period[slot] = n; line.push(n); };
      if (t.kind === "r") put(at, { deg: up ? T - k - 1 : T + k + 1, dur: 1, ...into });
      else if (t.kind === "g") { put(at, { deg: T + 1, dur: 0.5, ...into }); put(at, { deg: T - 1, dur: 0.5, off: 0.5, ...into }); } // (a pair about the note: over it, under it)
      else { const ds = up ? [T - k - 3, T - k - 2, T - k - 1] : [T + 1 + k, T + k, T - 1 + k]; put(at, { deg: ds[0], dur: 2 / 3, ...into }); put(at, { deg: ds[1], dur: 2 / 3, off: 2 / 3, ...into }); put(at + 1, { deg: ds[2], dur: 2 / 3, off: 1 / 3, ...into }); } // (a triplet: a run up, or a turn over the note)
    }
  });
  // (the leading note: a seventh step that rises to the root next, and the question's last where it hangs on one)
  const qLast = period[3 * 16 + toks(question).filter(t => t.kind === "L").slice(-1)[0].pos];
  line.forEach((n, i) => { if (mod(n.deg, 7) === 6 && (line[(i + 1) % line.length].deg === n.deg + 1 || n === qLast)) n.sharp = true; });
  // the reply: in each bar's longest gap, on its eighths, up to three notes of the minor pentatonic
  const rs = pick(H.replies, r(8)), pa = [0, 1, 3][mod(anchor, 3)] + 5 * Math.floor(anchor / 3);
  for (let b = 0; b < 8; b++) {
    const busy = Array(16).fill(false);
    for (let i = 0; i < 16; i++) { const n = period[b * 16 + i]; if (n) for (let k = 0; k < Math.ceil(n.dur); k++) if (i + k < 16) busy[i + k] = true; if (orn[b * 16 + i].length) busy[i] = true; }
    let best = 0, at = -1;
    for (let i = 0; i < 16; i++) { if (busy[i]) continue; let n = 0; while (i + n < 16 && !busy[i + n]) n++; if (n > best) { best = n; at = i; } i += n; }
    if (best >= 4) { const s0 = at + (at % 2), n = Math.min(3, Math.floor((at + best - s0) / 2)); for (let j = 0; j < n; j++) reply[b * 16 + s0 + 2 * j] = { deg: pentDeg(pa + rs[j % rs.length] - 5), dur: 2 }; }
  }
  for (const b of [0, 1, 7]) for (let i = 0; i < 16; i++) { const n = period[b * 16 + i]; if (n) seq.push(n.deg); }
  const degs = line.map(x => x.deg), rdegs = reply.filter(x => x).map(x => x!.deg);
  const hook: Hook = { period, orn, reply, seq, motif, anchor, top: Math.max(...degs), low: Math.min(...degs), replyTop: rdegs.length ? Math.max(...rdegs) : 0 };
  m.set(seed, hook);
  return hook;
}

const OSTS = new WeakMap<BangerDef, Map<string, Hook>>();
/** A house groove's riff (Ed, 2026-11-11: "a great ostinato riff that we should learn from for house sections"; the traits
 *  only): a two-bar ostinato over four on the floor. Two accented hits, then a chain of three-sixteenth groups running across
 *  the bar line and a tail of eighths, dealt from the banks by the wave's seed; each note accented and short, staccato, or
 *  held (its own level and length: the bounce); on the minor pentatonic at its own pitch while the chords move, its last note
 *  the leading note where it turns back to the root. Its first bar is the same every time; its second bar's contour changes
 *  with the repeat (`rep`: odd ones). `reply`: the answering voice over its second bar, two long falling notes, or (`hits`)
 *  repeated accented ones. */
export function ostinato(B: BangerDef, seed: number, rep: number, hits = false): Hook {
  const O = B.ostinato!, key = `${seed}:${rep % 2 ? rep : 0}:${hits}`;
  let m = OSTS.get(B);
  if (!m) OSTS.set(B, (m = new Map()));
  const had = m.get(key);
  if (had) return had;
  const r = (k: number) => hash2(seed, 883 + k, 5);
  const TR = O.tresillo;
  if (TR && TR.groups.length && TR.shapes.length && hash2(seed, 893, 1) < TR.share) {
    // the tresillo riff: a narrow chant on three, three and two, the same note struck again and a step's answer; its first
    // bar the same every time, its second bar's steps changing on every other repeat
    const groups = pick(TR.groups, r(1)), si = Math.floor(r(4) * TR.shapes.length), shape = TR.shapes[si];
    const shape2 = rep % 2 ? TR.shapes[(si + 1 + Math.floor(hash2(seed, 889, rep) * (TR.shapes.length - 1))) % TR.shapes.length] : shape;
    const base = stabDeg(pick([0, 0, 1, 2], r(5))), period: (HookNote | null)[] = Array(32).fill(null), reply: (HookNote | null)[] = Array(32).fill(null);
    let pos = 0;
    groups.forEach((g, i) => { if (pos < 32) period[pos] = { deg: base + (pos < 16 ? shape : shape2)[i % shape.length], dur: Math.min(g - 1, 4), vel: pos % 16 === 0 ? 1 : 0.84, acc: true }; pos += g; });
    const d0 = pick([12, 9, 11, 7], r(9));
    if (hits) for (const at of [20, 22, 26, 28]) reply[at] = { deg: d0 - (at >= 26 ? 1 : 0), dur: 1, vel: 0.9, acc: true };
    else { reply[20] = { deg: d0, dur: 6, long: true }; reply[26] = { deg: d0 - 1, dur: 6, long: true }; }
    const all = TR.shapes.flat(), hook: Hook = { period, orn: Array.from({ length: 32 }, () => []), reply, seq: [], motif: "tresillo:" + groups.join("+"), anchor: base, top: base + Math.max(...all), low: base + Math.min(...all), replyTop: d0 };
    m.set(key, hook);
    return hook;
  }
  const head = pick(O.heads, r(1)), n3 = pick(O.threes, r(2)), used = head.reduce((x, y) => x + y, 0) + 3 * n3;
  const groups = [...head, ...Array(n3).fill(3), ...Array(Math.max(0, Math.floor((32 - used) / 2))).fill(2)] as number[];
  const arts = pick(O.arts, r(3)), si = Math.floor(r(4) * O.shapes.length), shape = O.shapes[si];
  const shape2 = rep % 2 ? O.shapes[(si + 1 + Math.floor(hash2(seed, 889, rep) * (O.shapes.length - 1))) % O.shapes.length] : shape;
  const base = pick([0, 0, 1, 3], r(5)), restAt = r(6) < 0.6 ? head.length + 1 + Math.floor(r(7) * (n3 - 1)) : -1;
  const period: (HookNote | null)[] = Array(32).fill(null), reply: (HookNote | null)[] = Array(32).fill(null);
  let pos = 0, lastAt = -1;
  groups.forEach((g, i) => {
    if (i !== restAt && pos < 32) {
      const isHead = i < head.length, art = isHead ? "A" : arts[(i - head.length) % arts.length], sh = pos < 16 ? shape : shape2;
      period[pos] = { deg: pentDeg(base + sh[isHead ? 0 : (i - head.length + 1) % sh.length]), dur: art === "t" ? g : art === "A" ? Math.min(g, 2) : 1, vel: art === "A" ? 1 : art === "t" ? 0.82 : 0.7, ...(art === "A" ? { acc: true as const } : {}) };
      lastAt = pos;
    }
    pos += g;
  });
  const first = period[0]!;
  if (lastAt > 16 && mod(first.deg, 7) === 0 && r(8) < 0.6) period[lastAt] = { ...period[lastAt]!, deg: first.deg - 1, sharp: true }; // (the leading note back into the root)
  const d0 = pick([12, 9, 11, 7], r(9));
  if (hits) for (const at of [20, 22, 26, 28]) reply[at] = { deg: d0 - (at >= 26 ? 1 : 0), dur: 1, vel: 0.9, acc: true };
  else { reply[20] = { deg: d0, dur: 6, long: true }; reply[26] = { deg: d0 - 1, dur: 6, long: true }; }
  const all = O.shapes.flat(), hook: Hook = { period, orn: Array.from({ length: 32 }, () => []), reply, seq: [], motif: groups.join("+"), anchor: base, top: pentDeg(base + Math.max(...all)), low: Math.min(pentDeg(base + Math.min(...all)), first.deg - 1), replyTop: d0 };
  m.set(key, hook);
  return hook;
}

/** The mode a wave plays in under banger mode: its own where the night's set gives one (a breakdown's darker one, the coven's
 *  phrygian), else natural minor, but the style's dorian for a share of the waves, dealt by the night's seed. */
export function bangerScaleName(style: MusicStyle, a: Pick<ArcStep, "scale" | "tune" | "name">, nightSeed: number): string {
  const M = bangerOn(style)?.minor;
  if (a.scale || !M || !style.scales[M.scale]) return a.scale ?? style.scale;
  return hash2(nightSeed, 877, (a.tune ?? 0) * 31 + (a.name?.length ?? 0)) < M.dorian ? style.scale : M.scale;
}

/** A kit with its base's fields under its own. */
const KITS = new WeakMap<BangerDef, Map<string, Required<Omit<BangerKit, "base" | "pad" | "turn" | "bed" | "half" | "four">> & Pick<BangerKit, "pad" | "turn" | "bed" | "half" | "four">>>();
/** The xylophone's figure in a phrase (its name in the style's `space.xylo.figures`), or null where the kit's own chords play:
 *  dealt by the wave's seed a phrase at a time, in the kit's share of them; a phrase's fourth bar the roll half the time. */
export function xyloFigure(B: BangerDef, xyloShare: number, seed: number, formBar: number, pass: number): string | null {
  const X = B.space?.xylo, ph = Math.floor(formBar / 8) + pass * 131;
  if (!X || !B.leads[X.voice] || hash2(seed, 865, ph) >= xyloShare) return null;
  const names = Object.keys(X.figures).filter(n => n !== X.roll);
  if (formBar % 4 === 3 && X.figures[X.roll] && hash2(seed, 869, formBar) < 0.5) return X.roll;
  return names.length ? pick(names, hash2(seed, 867, ph)) : null;
}
/** xyloFigure for bar `bar` of a block as the game plays it (the renders' notes), or null. */
export function xyloHeard(style: MusicStyle, plan: BlockPlan, sec: Resolved, bar: number, seed0: number, formStart: number, stumps?: number): string | null {
  const B = bangerOn(style), a = style.arc[Math.max(0, Math.min(style.arc.length - 1, plan.arc))], role = B && bangerRole(style, plan, a, sec, formStart);
  if (!B || (role !== "drop" && role !== "breaks" && role !== "victory")) return null;
  const gentle = stumps !== undefined && stumps < B.gentle.stumps, kn0 = kitName(style, a, plan.section), kit = kitOf(B, gentle && !B.gentle.keep.includes(kn0) ? B.gentle.kit : kn0);
  return xyloFigure(B, kit.xylo, a.tune ? tuneSeed(seed0, a.tune) : seed0, bar - formStart, plan.pass ?? 0);
}
export function kitOf(B: BangerDef, name: string) {
  let m = KITS.get(B);
  if (!m) KITS.set(B, (m = new Map()));
  let k = m.get(name);
  if (!k) {
    const chain: BangerKit[] = [];
    for (let n: string | undefined = name, i = 0; n && i < 6; i++) { const K: BangerKit | undefined = B.kits[n]; if (!K) break; chain.unshift(K); n = K.base; }
    const all = Object.assign({}, ...chain) as BangerKit;
    k = { swing: all.swing ?? 0, drums: all.drums ?? [], breaks: all.breaks ?? all.drums ?? [], fills: all.fills ?? [], bass: all.bass ?? { patch: [], octave: 1, p: [] }, chords: all.chords ?? { patch: "", p: [] }, leads: all.leads ?? { soft: [], hard: [] }, reply: all.reply ?? [], pad: all.pad, turn: all.turn, xylo: all.xylo ?? 0, bed: all.bed, half: all.half, four: all.four };
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

/** Whether bar `bar` of a block has the house ostinato as the game plays it, and which repeat of it in the wave (1 the first:
 *  each adds a layer), else 0 (the renders' notes). */
export function ostinatoHeard(style: MusicStyle, plan: BlockPlan, sec: Resolved, bar: number, formStart: number, stumps?: number): number {
  const B = bangerOn(style), a = style.arc[Math.max(0, Math.min(style.arc.length - 1, plan.arc))], role = B && bangerRole(style, plan, a, sec, formStart);
  if (!B?.ostinato || role !== "drop" || (stumps !== undefined && stumps < B.gentle.stumps)) return 0;
  const kit = kitOf(B, kitName(style, a, plan.section)), pass = plan.pass ?? 0, barIn = bar - plan.start;
  if (!kit.four || kit.half || hookUse(role, barIn, plan.bars, pass, 0, false) !== null) return 0;
  return 1 + (pass === 0 ? 0 : Math.min(3, 2 * pass - 1 + Math.floor(barIn / 8)));
}

/** The tunes of a block's wave as the game plays it (the renders' notes): its own riff, and its house ostinato's kind. */
export function riffHeard(style: MusicStyle, plan: BlockPlan, seed0: number): { riff: Hook; chant: boolean; ostinato: "tresillo" | "chain" | null } | null {
  const B = bangerOn(style), a = style.arc[Math.max(0, Math.min(style.arc.length - 1, plan.arc))];
  if (!B) return null;
  const seed = a.tune ? tuneSeed(seed0, a.tune) : seed0, riff = nightHook(B, (seed ^ 0x5bd1e995) >>> 0);
  return { riff, chant: !/[rgt]/.test(riff.motif), ostinato: B.ostinato ? (ostinato(B, seed, 0).motif.startsWith("tresillo") ? "tresillo" : "chain") : null };
}

/** Whether the singer leads in a block as the game plays it (the renders' notes): after the second stump, in a family without a lead of its own. */
export function singerLeads(style: MusicStyle, plan: BlockPlan, stumps?: number): boolean {
  const B = bangerOn(style), a = style.arc[Math.max(0, Math.min(style.arc.length - 1, plan.arc))], L = B?.vocals?.lead;
  if (!B || !L || !style.patches[L.patch] || (stumps !== undefined && stumps < B.gentle.stumps)) return false;
  return !kitOf(B, kitName(style, a, plan.section)).bed;
}

/** Whether a phrase is a lighter one (its backbeat finger snaps, never with a clap or snare): a gentle wave's, or, of the
 *  grooves between the hook's returns, the share dealt by the wave's seed (`spice.snaps`), a phrase whole. */
export function lightPhrase(B: BangerDef, style: MusicStyle, role: BangerRole, use: ReturnType<typeof hookUse>, gentle: boolean, seed: number, formBar: number, pass: number): boolean {
  const SP = B.spice;
  if (!SP || !style.patches[SP.snap]) return false;
  if (role === "victory") return false; // (the victory's claps, always)
  return gentle || (role === "drop" && use !== "whole" && hash2(seed, 851, Math.floor(formBar / 8) + pass * 131) < SP.snaps);
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
export function bangerChord(style: MusicStyle, a: Pick<ArcStep, "scale">, seed: number, formBar: number, sevenths = false, slow = false, scaleName = a.scale ?? style.scale): { root: number; tones: number[]; raise?: true } {
  const B = style.banger!, F = style.form, P8 = F?.phraseBars ?? 8, L = (F?.order.length ?? 4) * P8;
  const P = B.progressions[scaleName] ?? B.progressions[style.scale] ?? Object.values(B.progressions)[0];
  const fb = mod(formBar, L), ph = Math.floor(fb / P8), k = fb % P8;
  const loop = ph === 2 ? pick(P.b, hash2(seed, 823, 2)) : pick(P.a, hash2(seed, 821, 1));
  const at = (ph === 3 || slow ? Math.floor(k / 2) : k) % loop.length, root = loop[at];
  // (the cadence: natural minor's last chord on the fifth step a major one, the seventh step raised for its bar)
  const raise = !!B.minor?.cadence && scaleName === B.minor.scale && root === 4 && at === loop.length - 1;
  return { root, tones: sevenths ? [root, root + 2, root + 4, root + 6] : [root, root + 2, root + 4], ...(raise ? { raise: true as const } : {}) };
}

/** The hook's note (if one starts) on the form's sixteenth `formStep`, for the music as before where banger mode leaves it
 *  (the boot's intro): the night's hook on `octave`. */
export function hookNoteAt(style: MusicStyle, seed: number, formStep: number): HookNote | null {
  if (formStep % 2) return null;
  const n = nightHook(style.banger!, seed).period[mod(formStep / 2, 128)]; // (at half speed: the boot is gentle)
  return n && n.dur >= 1 ? { ...n, dur: n.dur * 2 } : null;
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
  const scaleName = bangerScaleName(style, a, ctx.seed), scale = style.scales[scaleName] ?? style.scales[style.scale], transpose = (a.transpose ?? 0) + (sec.transpose ?? 0);
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
  const chord = bangerChord(style, a, seed, formBar, !!kit.chords.sevenths, false, scaleName);
  /** The semitone a step is raised by in this bar (the cadence's major chord: the seventh step its leading note). */
  const up = (deg: number, c: { raise?: true } = chord) => (c.raise && mod(deg, 7) === 6 ? 1 : 0);
  /** A tune's note's own: its leading note raised too where the bar's chord has no natural seventh (and the mode's is one). */
  const sharpOk = scale[6] - scale[5] <= 2 && scale[6] === 10 && !chord.tones.slice(0, 3).some(t => mod(t, 7) === 6);
  const semi = (n: HookNote) => (mod(n.deg, 7) === 6 && (chord.raise || (n.sharp && sharpOk)) ? 1 : 0);
  /** A note's place after its step: the kit's swing, and a fraction of a sixteenth along the swung grid (a thirty-second, a triplet). */
  const offOf = (n: HookNote) => (n.off ? (s % 2 ? kit.swing + n.off * (1 - kit.swing) : n.off * (1 + kit.swing)) : sw);
  const pb = barIn % 8, last = barIn === plan.bars - 1, sw = s % 2 === 1 ? kit.swing : 0;
  // (a gentle wave: everything softer; a dreamy stretch, a breakdown's quiet half and a build's first half, well under the drops: the contrast)
  const dreamy = !gentle && ((role === "breakdown" && !dropped) || (role === "build" && barIn * 2 < plan.bars)), down = dreamy ? B.dream?.down ?? 1 : 1;
  const out: NoteEvent[] = [], quiet = gentle ? 0.72 : down;
  const SPC = B.space, BAL = SPC?.balance ?? { drums: 1, bass: 1, pad: 1, chords: 1, vocals: 1 };
  const r = (salt: number) => hash2(step, salt, seed + pass * 7919);
  const ev = (patch: string, midi: number | null, vel: number, dur: number, extra: Partial<NoteEvent> = {}) => {
    if (style.patches[patch]) out.push({ part: "b:" + patch, patch, step, offset: sw, dur, midi, vel: vel * quiet, straight: true, ...extra });
  };
  const kindOf = (patch: string) => { const p = style.patches[patch]; return !p ? "" : p.kind === "kick" && !p.noDuck ? "kick" : p.kind === "snare" || p.bursts || patch === "snap" ? "snare" : "top"; }; // (a finger snap a backbeat's drum, as a clap is)
  // the sprinkles, dealt a phrase at a time (Ed, 2026-11-10: "sprinkle some of these in sometimes")
  const SP = B.spice, phraseNo = Math.floor(formBar / 8), deal = (salt: number) => hash2(seed, salt, phraseNo + pass * 131);
  // (a lighter phrase: its backbeat the finger snaps', the clap or snare resting; a heavier one: the kit's own, no snaps)
  const light = lightPhrase(B, style, role, use, gentle, seed, formBar, pass);
  const BED = SPC?.bed, DR = B.drive, DM = B.dream;
  const bedName = BED ? (kit.bed && B.leads[kit.bed] ? kit.bed : gentle ? BED.low : BED.voice) : "", bedXylo = !!BED && !!SP && (bedName === BED.voice || bedName === BED.low);
  const xylo = SP ? B.leads[SP.xylo] : undefined, xyAnswer = !!xylo && !bedXylo && deal(857) < SP!.answer /* (the xylophone answers only where the bed isn't its own) */, xyRun = !!xylo && hash2(seed, 859, bar) < SP!.flourish;
  // (a house groove between the hook's returns: its riff the ostinato; each eight-bar repeat of it in the wave adds a layer)
  const OS = B.ostinato, ost = !!OS && role === "drop" && use === null && !gentle && !!kit.four && !kit.half, ostLevel = !ost ? 0 : pass === 0 ? 0 : Math.min(3, 2 * pass - 1 + Math.floor(barIn / 8));
  const drums = (voices: BangerVoice[], level = 1, keep?: (kind: string) => boolean, backbeat = false) => {
    let snapped = false;
    for (const v of voices) {
      if (!within(v, E, barIn, pass) || (keep && !keep(kindOf(v.patch)))) continue;
      if (role === "victory" && (v.patch === SP?.snap || v.patch === "snap")) continue; // (the victory's backbeat its claps: a kit's own snaps rest)
      const snare = backbeat && light && kindOf(v.patch) === "snare";
      const ch = v.p[(barIn * 16 + s) % v.p.length], lv = BAL.drums * (v.level ?? 1) * level * (0.94 + 0.06 * r(v.patch.length * 31 + v.p.length));
      // (a lighter phrase: a finger snap where the kit's snare or clap would hit squarely, in its place)
      if (snare) { if (!snapped && (ch === "X" || ch === "x")) { snapped = true; ev(SP!.snap, null, SP!.snapLevel * BAL.drums * level, 1); } continue; }
      if (ch === "." || ch === "-" || VEL[ch] === undefined) continue;
      if (ch === "r") { ev(v.patch, null, 0.6 * lv, 0.5); out.push({ part: "b:" + v.patch, patch: v.patch, step, offset: sw + 0.5, dur: 0.5, midi: null, vel: 0.75 * lv, straight: true }); continue; }
      ev(v.patch, null, VEL[ch] * lv, 1);
    }
  };
  /** A bass figure's note here: a mid bass in its register, the sub under it. */
  const bass = (D: BangerBass, figures: string[], level: number, until = 16, grit = 0, gliss = false, bnc = false) => {
    if (!figures.length || !D.patch.length || s >= until) return;
    if (gliss && s >= 8 && s !== 8 && s !== 10) return;
    const p = gliss && s >= 8 ? (s === 8 ? "8-" : "1-").padStart(s + 2, ".").padEnd(16, ".") : pick(figures, hash2(seed, 829, Math.floor(formBar / 8))), i = (barIn * 16 + s) % p.length, { ch, dur: d0 } = charAt(p, i);
    const k = ({ "1": 0, "3": 2, "5": 4, "7": 6, "8": 7 } as Record<string, number>)[ch];
    if (k === undefined) return;
    const dur = until >= 16 ? d0 : Math.min(d0, until - s), lo = 28 + 12 * D.octave;
    let rootM = degreeToMidi(style, scale, chord.root, 0, transpose);
    while (rootM >= lo + 12) rootM -= 12;
    while (rootM < lo) rootM += 12;
    let m = rootM + degreeToMidi(style, scale, chord.root + k, 0, 0) - degreeToMidi(style, scale, chord.root, 0, 0) + up(chord.root + k);
    if (m > lo + 19) m -= 12;
    // (the bounce stays low: its upper note the octave where that fits under E2, else the fifth, over or under the root)
    if (bnc && ch === "8") m = rootM + 12 <= 40 ? rootM + 12 : rootM <= 33 ? rootM + 7 : rootM - 5;
    else if (bnc && m > 40) m = m - 12 >= 28 ? m - 12 : rootM;
    const patch = pick(D.patch, hash2(seed, 831, 3)), vel = 0.7 * BAL.bass * (D.level ?? 1) * level * (0.95 + 0.05 * r(977));
    ev(patch, m, vel, dur, gliss && s === 10 ? { glide: 0.12 } : D.glide ? { glide: D.glide } : {}); // (a phrase's end under the ostinato: a short slide down, the octave to the root)
    // (the distorted mid bass: the same figure an octave or so over the sub, E2 to D#3, the sub itself as it was)
    if (grit > 0 && DR && style.patches[DR.bass.patch]) { let gm = m; while (gm < 40) gm += 12; while (gm >= 52) gm -= 12; ev(DR.bass.patch, gm, 0.7 * BAL.bass * grit * level, dur); }
    // (the sub: an octave under a mid bass; under a low one (Ed, 2026-11-11: "The Bassline is best when it's lower") at its own pitch, lighter)
    if (D.sub !== false && style.patches.bgSub) { let sm = D.octave > 0 ? m - 12 : m; while (sm >= 40) sm -= 12; ev("bgSub", sm, (D.octave > 0 ? 0.9 : 0.35) * BAL.bass * level, dur); }
  };
  // the rolling bed (Ed, 2026-11-11: the leads' new style): a broken chord in even sixteenths (eighths in a gentle wave or a
  // half-time kit), the same figure for a whole phrase, on the xylophone or the kit's own pluck, under the tune
  const bed = (level: number, eighths: boolean, until = 16) => {
    const L = BED && B.leads[bedName];
    if (!BED || !L || level <= 0 || s >= until || (eighths && s % 2) || figBar(barIn)) return;
    const fig = pick(BED.figures, hash2(seed, 881, phraseNo + pass * 131)), c = fig[(eighths ? s / 2 : (barIn % 2) * 16 + s) % fig.length], k = "abcd".indexOf(c);
    if (k < 0) return;
    const lo = gentle ? BED.lowWindow : BED.window, ts = chord.tones.slice(0, 3).map(t => { let m = degreeToMidi(style, scale, t, 0, transpose) + up(t); while (m < lo) m += 12; while (m >= lo + 12) m -= 12; return m; }).sort((x, y) => x - y);
    ev(L.patch, k === 3 ? ts[0] + 12 : ts[k % ts.length], 0.8 * BED.level * L.level * (R?.level ?? 1) * BAL.chords * level * (s % 4 === 0 ? 1 : 0.9), 1);
  };
  /** Whether the kit's chords play in bar `b` of the section: at the hook's landing, in the victory, and in the bars a groove's
   *  tune rests; the bed has the rest. */
  /** Whether the xylophone leaves its bed for its chord figure in bar `b` (in the phrases dealt to it: xyloFigure): where the
   *  lead rests, a breakbeat phrase's first half and the bars a groove's riff rests. */
  const figBar = (b: number) => bedXylo && (role === "breaks" ? b < 4 : role === "drop" && !ost && !!SPC?.riffRest && (b % 8) % 4 === 2 && hookUse(role, b, plan.bars, pass, dropAt, gentle) === null) && !!xyloFigure(B, kit.xylo, seed, formBar - barIn + b, pass);
  const chordsOn = (b: number) => { if (!BED || role === "victory" || figBar(b)) return true; const u = hookUse(role, b, plan.bars, pass, dropAt, gentle); return u === "whole" || u === "slow" || (u === null && (ost ? !!OS!.stabs : !!SPC?.riffRest && (b % 8) % 4 === 2)); };
  /** The chords' hit (if one starts) on the section's sixteenth `at` (this one, or an earlier one's for its echo): the kit's
   *  stabs voiced into one octave (each tone where it's nearest; a groove's without their root: `thin`), or a tone a hit in
   *  turn; or, in the phrases dealt to it, the xylophone's figure (block chords, broken chords, the skeleton dance's low note
   *  and two above, a tremolo). */
  const chordHit = (at: number, thin: boolean): { patch: string; midis: number[]; vel: number; dur: number } | null => {
    if (at < 0) return null;
    const b = Math.floor(at / 16), fb = formBar - barIn + b, cs = at - b * 16, ch0 = b === barIn ? chord : bangerChord(style, a, seed, fb, !!kit.chords.sevenths, false, scaleName);
    if (!chordsOn(b)) return null;
    const X = SPC?.xylo, fig = X && (!bedXylo || figBar(b)) ? xyloFigure(B, kit.xylo, seed, fb, pass) : null;
    const foldTo = (lo0: number, fixed = false) => { const lo = fixed ? lo0 : lo0 + mod(transpose + 6, 12) - 6; return (t: number) => { let m = degreeToMidi(style, scale, t, 0, transpose) + up(t, ch0); while (m < lo) m += 12; while (m >= lo + 12) m -= 12; return m; }; };
    if (fig && X) {
      const V0 = B.leads[gentle ? X.low : X.voice] ?? B.leads[X.voice], p = X.figures[fig], c = p[at % p.length], fold = foldTo(gentle ? X.lowWindow : X.window, true) /* (a fixed octave, over the singer's harmony: no clash) */, tones = ch0.tones.slice(0, 3).map(fold).sort((x, y) => x - y);
      const vel = 0.8 * X.level * V0.level * (R?.level ?? 1) * BAL.chords * (cs % 4 === 0 ? 1 : 0.88);
      if (c === "x") return { patch: V0.patch, midis: tones, vel, dur: 1 };
      if (c === "a" || c === "b" || c === "c") return { patch: V0.patch, midis: [tones["abc".indexOf(c) % tones.length]], vel, dur: 1 };
      if (c === "1") return { patch: V0.patch, midis: [fold(ch0.root) - 12 < 52 ? fold(ch0.root) : fold(ch0.root) - 12], vel, dur: 1 };
      if (c === "t") return { patch: V0.patch, midis: [tones[0], tones[tones.length - 1]], vel: vel * (0.45 + 0.04 * (cs % 8)), dur: 1 };
      return null;
    }
    const C = kit.chords;
    if (!C.patch || !C.p.length) return null;
    const p = ost && OS!.stabs ? OS!.stabs : pick(C.p, hash2(seed, 833, Math.floor(fb / 8))), i = at % p.length, { ch, dur } = charAt(p, i);
    if (VEL[ch] === undefined) return null;
    const fold = foldTo(C.window ?? SPC?.chordWindow ?? 57), vel = VEL[ch] * (C.level ?? 1) * BAL.chords * (ost ? OS!.stabLevel ?? 1 : 1);
    if (C.arp && !ost) {
      let n = 0;
      for (let k = i - (i % 16); k < i; k++) if (VEL[p[k]] !== undefined) n++;
      const T = ch0.tones.length;
      return { patch: C.patch, midis: [fold(ch0.tones[n % T]) + 12 * (Math.floor(n / T) % 2)], vel, dur };
    }
    const tones = ch0.tones.slice(0, 4), thinned = thin && SPC?.thin && tones.length > 2 ? tones.slice(1, 3) : tones.slice(0, 3);
    return { patch: C.patch, midis: thinned.map(fold), vel, dur };
  };
  /** The chords here, and their ping-pong: each hit again `echo.steps` sixteenths on, to the right, and again, to the left
   *  (the notes' own: no delay line), where the style has the patch's R and L. */
  const chords = (level: number, until = 16, thin = false) => {
    const at = barIn * 16 + s, h = s < until ? chordHit(at, thin) : null;
    if (h) for (const m of h.midis) ev(h.patch, m, h.vel * level, Math.min(h.dur, until - s));
    const EC = SPC?.echo;
    if (EC && s < until && !ost) EC.levels.forEach((lv, k) => {
      const e = chordHit(at - EC.steps * (k + 1), thin), side = e && e.patch + (k % 2 ? "L" : "R");
      if (e && side && style.patches[side] && (at - EC.steps * (k + 1)) % 16 < (pb === 7 || last ? 12 : 16)) for (const m of e.midis) ev(side, m, e.vel * level * lv, 1);
    });
  };
  const pad = (level: number) => {
    const P = kit.pad;
    if (!P || s !== 0 || P.level <= 0 || (P.e && (E < P.e[0] || E > P.e[1]))) return;
    const lo = (SPC?.chordWindow ?? 57) + mod(transpose + 6, 12) - 6;
    for (const t of chord.tones.slice(0, 3)) { let m = degreeToMidi(style, scale, t, 0, transpose) + up(t); while (m < lo) m += 12; while (m >= lo + 12) m -= 12; out.push({ part: "b:" + P.patch, patch: P.patch, step, offset: 0, dur: 16, midi: m, vel: 0.85 * P.level * BAL.pad * level * down, straight: true }); }
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
  const tune = (L: { patch: string; octave: number; level: number } | undefined, n: HookNote | null, level: number, extra: Partial<NoteEvent> = {}, until = 16, T: Hook = hook, part: "period" | "reply" = "period", under = false) => {
    if (!L || !n || s >= until) return null;
    const ceil = L === reply ? R?.reply : R?.lead, sh0 = shiftOf(L, T, part, ceil);
    // (under the singer where she leads: the whole line an octave down where that stays over the floor)
    const sh = sh0 - (under && R && raw(T.low, L.octave) + sh0 - 12 >= R.floor ? 12 : 0), m0 = (R ? raw(n.deg, L.octave) : degreeToMidi(style, scale, n.deg, L.octave, transpose)) + sh + semi(n);
    // (the long notes full, the runs and turns between them lighter: "long, then run"; no slide into any of them)
    const m1 = ceil !== undefined && m0 > ceil ? m0 - 12 : m0;
    ev(L.patch, m1, (n.vel ?? (n.long ? 0.92 : part === "reply" ? 0.8 : 0.72)) * L.level * level * (R?.level ?? 1), Math.min(n.dur, until - s), { offset: offOf(n), ...extra });
    return m1;
  };
  /** A tune's notes starting in this sixteenth: the one on it and the ornaments inside it (but a run into the next bar where the tune rests there). */
  const play = (L: { patch: string; octave: number; level: number } | undefined, T: Hook, slot: number, level: number, until = 16, noInto = false, under = false) => {
    const n = T.period[slot];
    if (n && !(noInto && n.into)) tune(L, n, level, {}, until, T, "period", under);
    for (const o of T.orn[slot]) if (!(noInto && o.into)) tune(L, o, level, {}, until, T, "period", under);
  };
  // the singer (the form's sung part, its effects by the night's family; haunted: her ghost below, else her wash above)
  const F = style.form, vocal = a.vocal && a.vocal !== "none" && style.patches[a.vocal] ? a.vocal : F?.sung.patch;
  let sungAt: number | null = null;
  const singer = !!F && !!vocal && !!style.patches[vocal];
  const sing = (n: HookNote | null, dur: number, level: number) => {
    if (!n || !F || !vocal || !style.patches[vocal]) return false;
    let deg = n.deg;
    while (deg > F.range[1]) deg -= 7;
    while (deg < F.range[0]) deg += 7;
    const fx: NoteEvent["fx"] = style.voiceFxDark?.families?.includes(a.family ?? "") ? "dark" : "pure", base = { part: F.sung.part, patch: vocal, step, offset: 0, dur, fx };
    // (her line where a woman sings it: Ed, 2026-11-11, "Is it possible to make the vocal more 'female'?"; her ghost under it)
    const lift = (m: number) => { const VR = B.vocals?.line; if (VR) { while (m < VR[0]) m += 12; while (m > VR[1]) m -= 12; } return m; };
    const mine = lift(degreeToMidi(style, scale, deg, F.sung.octave, transpose) + semi(n));
    level *= down;
    out.push({ ...base, midi: mine, vel: 0.8 * level });
    if (haunt && H!.ghost.gain > 0) { let g = degreeToMidi(style, scale, deg + H!.ghost.interval, F.sung.octave, transpose); while (g < mine - 12) g += 12; out.push({ ...base, midi: g, vel: 0.8 * level * H!.ghost.gain, ghost: true }); }
    else if (F.sung.wash) for (const iv of F.sung.wash.intervals) out.push({ ...base, offset: F.sung.wash.late, dur: Math.max(1, dur - F.sung.wash.late), midi: degreeToMidi(style, scale, deg + iv, F.sung.octave, transpose), vel: 0.8 * level * F.sung.wash.level, double: true });
    sungAt = mine;
    return true;
  };
  /** The hook at half speed from the section's top: a note of its first bars, twice as long (its runs eighths; its thirty-seconds and triplets left out). */
  const slow = (): HookNote | null => { const t = barIn * 16 + s; if (t % 2) return null; const n = hook.period[(t / 2) % 128]; return n && n.dur >= 1 ? { ...n, dur: n.dur * 2 } : null; };
  const soft = gentle ? 0.6 : 1;
  // the singer's notes as a second main voice: a tune's note folded into her range; the chord's root and fifth on "ooh"
  const V = gentle ? undefined : B.vocals, HV = B.vocals?.harmony;
  /** The sung chord's notes: the root, the fifth, then the third (the seventh where the kit plays sevenths), each where it's
   *  nearest in her harmony's octave, inside her recorded notes. */
  const sungChord = (n: number): number[] => {
    const VV = B.vocals!, lo = HV?.window ?? VV.range[0], ts = [chord.root, chord.root + 4, chord.tones.length > 3 ? chord.root + 6 : chord.root + 2].slice(0, n);
    return ts.map(t => { let m = degreeToMidi(style, scale, t, 0, transpose) + up(t); while (m < lo) m += 12; while (m >= lo + 12) m -= 12; return m; }); // (its octave inside her recorded notes: the style's to keep so)
  };
  const voxAt = (n: HookNote) => { let m = degreeToMidi(style, scale, n.deg, 2, transpose) + semi(n); while (m > V!.range[1]) m -= 12; while (m < V!.range[0]) m += 12; return m; };
  /** The singer on a tune's long note, with the lead to the sixteenth (its runs and turns the lead's alone). */
  const vox = (n: HookNote | null, level: number, until = 16, third = 0) => {
    if (!V || !(n?.long || n?.acc) || s >= until || !style.patches[V.double]) return;
    const note = (m: number, lv: number) => out.push({ part: "b:" + V.double, patch: V.double, step, offset: sw, dur: Math.min(Math.max(2, n.dur), Math.max(1, until - s)), midi: m, vel: 0.85 * BAL.vocals * level * lv, straight: true });
    note(voxAt(n), 1);
    // (at the key moments a second voice a third under her, in the scale: a sixth over where that's under her notes)
    if (third > 0) note(voxAt({ deg: n.deg - 2, dur: n.dur }), third);
  };
  // the singer as the lead instrument (Ed, 2026-11-11): she carries the tune herself in the families without a lead of their own
  const LV = V?.lead && style.patches[V.lead.patch] ? V.lead : undefined, she = !!LV && !kit.bed;
  /** Her note of a line: the whole line moved by octaves into her range (its shape kept; a note still outside it folded). */
  const herAt = (T: Hook, n: HookNote) => {
    const [lo, hi] = LV!.range, top = raw(T.top, 2) + 1, low = raw(T.low, 2);
    let sh = 0;
    while (top + sh > hi) sh -= 12;
    while (low + sh < lo && top + sh + 12 <= hi) sh += 12;
    let m = raw(n.deg, 2) + semi(n) + sh;
    while (m < V!.range[0] - 7) m += 12; while (m > V!.range[1]) m -= 12;
    return m;
  };
  /** Her line's note here: a long note (an ostinato's accent or held note) full, stacked wide with a sheen an octave over; a
   *  plain sixteenth of a run lighter, alone; the quicker ornaments left to the synth under her. All on the lead's sixteenth. */
  const her = (T: Hook, n: HookNote | null, level: number, until = 16, third = 0) => {
    if (!LV || !n || n.off || s >= until) return;
    const big = !!n.long || !!n.acc || (T.period.length === 32 && n.dur >= 2), run = !big && LV.runs && n.dur === 1 && T.period.length !== 32;
    if (!big && !run) return;
    const m = herAt(T, n), dur = Math.min(big ? Math.max(2, n.dur) : n.dur, Math.max(1, until - s)), lv = 0.85 * BAL.vocals * LV.level * level;
    const note = (patch: string, midi: number, vel: number) => { if (style.patches[patch]) out.push({ part: "b:" + patch, patch, step, offset: sw, dur, midi, vel, straight: true }); };
    note(LV.patch, m, lv * (big ? 1 : LV.runLevel));
    if (!big || n.dur < 3) return;
    for (const patch of LV.stack) note(patch, m, lv * LV.stackLevel);
    note(LV.shimmer, m + 12, lv * LV.shimmerLevel);
    // (at the key moments a second voice a third under her, in the scale)
    if (third > 0) { let t = herAt(T, { deg: n.deg - 2, dur: n.dur }); if (t > m) t -= 12; if (t < V!.range[0] - 7) t += 12; note(V!.double, t, lv * third); }
  };
  /** Her line in this sixteenth (but a run into the next bar where the tune rests there). */
  const herLine = (T: Hook, slot: number, level: number, until = 16, noInto = false, third = 0) => { const n = T.period[slot]; if (n && !(noInto && n.into)) her(T, n, level, until, third); };
  // (her harmony under the grooves: three voices after the second stump, fewer and softer before it)
  const ooh = (level: number) => {
    const VV = B.vocals;
    if (!VV || s !== 0 || !style.patches[VV.pad] || (gentle && !HV)) return;
    const n = gentle ? HV!.gentleVoices : HV?.voices ?? 2, lv = gentle ? HV!.gentleLevel : 1;
    // (its root in the middle, the others left and right where the style has the pad's L and R: a wide harmony)
    sungChord(n).forEach((m, k) => { const side = VV.pad + ["", "L", "R"][k % 3], patch = style.patches[side] ? side : VV.pad; out.push({ part: "b:" + patch, patch, step, offset: 0, dur: 16, midi: m, vel: 0.8 * VV.padLevel * level * lv * quiet, straight: true }); });
  };
  /** The dreamy stack on a long note of her line: the same note left and right (her two vowels) and its octave, on her sixteenth. */
  const stack = (n: HookNote, sung: number | null) => {
    const VV = B.vocals;
    if (!DM || !VV || !n.long) return;
    let m = sung ?? degreeToMidi(style, scale, n.deg, 2, transpose) + semi(n);
    const [lo, hi] = VV.line ?? VV.range;
    while (m < lo) m += 12; while (m > hi) m -= 12;
    const lv = DM.level * BAL.vocals * (gentle ? 0.5 : 1) * quiet, oct = m + 12 <= VV.range[1] ? m + 12 : m - 12;
    for (const patch of DM.stack) if (style.patches[patch]) out.push({ part: "b:" + patch, patch, step, offset: 0, dur: n.dur, midi: m, vel: lv, straight: true });
    if (style.patches[DM.octave] && oct >= 55) out.push({ part: "b:" + DM.octave, patch: DM.octave, step, offset: 0, dur: n.dur, midi: oct, vel: lv * DM.octaveLevel, straight: true });
  };
  const crash = (vel: number) => { if (s === 0) ev("bgCrash", null, vel, 16, { offset: 0 }); };
  const impact = () => { if (s === 0 && style.patches.impact) out.push({ part: "impact", patch: "impact", step, offset: 0, dur: 16, midi: null, vel: 1 }); };
  const riser = (from: number, to: number, dur = 16, patch = "riser") => { if (s === 0 && style.patches[patch]) out.push({ part: patch, patch, step, offset: 0, dur, midi: null, vel: 1, from, to }); };
  /** A phrase's last bar: the fill dealt, the kick, snare and bass out from its middle, the tops from its last beat. */
  const fillBar = (voices: BangerVoice[], level = 1) => {
    drums(voices, level, k => (s < 8 ? true : s < 12 ? k === "top" : false), true);
    // (now and then the xylophone runs up into the next phrase over the last beat)
    if (xyRun && s >= 12) { const A = stabDeg(hook.anchor), deg = A + s - 16; tune(xylo, { deg, dur: 1, ...(mod(deg, 7) === 6 ? { sharp: true as const } : {}) }, 0.8); } // (by step up to the hook's own note: the leading note raised)
    // (the ostinato's fills tom sweeps; from its fourth repeat two sweeps and a rim shot closing the bar)
    const f = (ost && (ostLevel >= 3 ? B.fills.sweep2 : hash2(seed, 845, bar) < 0.5 ? B.fills.sweep : undefined)) || B.fills[pick(kit.fills.length ? kit.fills : Object.keys(B.fills), hash2(seed, 843, bar))];
    if (f) drums(f, level);
  };

  if (role === "drop" || role === "victory" || role === "breaks") {
    const voices = role === "breaks" ? kit.breaks : kit.drums, fill = pb === 7 || last, half = barIn >= 8 || pass > 0;
    if (fill) fillBar(voices); else { drums(voices, 1, undefined, true); if (pb === 3 && kit.turn) drums(kit.turn); }
    // (the drums drive: a heavier phrase's grooves busier on top, the breakbeat phrase's ghost snares and running hats)
    if (DR && !gentle && !light && role !== "victory") drums(role === "breaks" ? DR.breaks : kit.half ? [] : DR.groove, 1, fill ? () => s < 8 : undefined);
    if (role === "victory") drums(B.victory);
    if (barIn === 0) { crash(0.9 * soft * soft); if (role !== "breaks" && pass === 0 && !gentle) impact(); } else if (pb === 0 && !gentle) crash(0.6);
    if (pb === 7 && !last && !gentle) riser(0.35, 0.85, 12, "bgSweep");
    const until = fill ? 12 : 16;
    // (the distorted mid bass over the sub: the breakbeat phrase's whole, a touch of it under a landing's hook)
    const bounce = ost && kit.bass.bounce?.length ? [kit.bass.bounce[Math.min(kit.bass.bounce.length - 1, ostLevel >= 2 ? 1 : 0)]] : null;
    bass(kit.bass, bounce ?? (role === "breaks" && kit.bass.breaks ? kit.bass.breaks : kit.bass.p), 1, until, !DR || gentle ? 0 : role === "breaks" ? DR.bass.breaks : use === "whole" && role === "drop" ? DR.bass.landing : 0, !!bounce && fill, !!bounce);
    // space (Ed, 2026-11-11): in a groove between the hook's returns no more than three melodic parts at once: the tune (the
    // lead and the reply taking turns), the rolling bed under it and the singer's ooh in the pad's place; the kit's chords
    // at the landing's hook, in the victory and in the bars the tune rests (chordsOn)
    const groove = !gentle && use !== "whole" && role !== "victory", xyChords = (!bedXylo || figBar(barIn)) && !!xyloFigure(B, kit.xylo, seed, formBar, pass);
    chords(1, until, groove);
    if (!ost) bed(1, gentle || !!kit.half, until); // (under the ostinato the xylophone is on the riff itself)
    if (!groove || !SPC) pad(1);
    // (the one stack allowed, as one harmony layer: where the xylophone has block chords she sometimes sings its hits with it)
    if (V && HV && xyChords && s < until && deal(871) < HV.stabs) { const h = chordHit(barIn * 16 + s, false); if (h && h.midis.length > 2) for (const m of sungChord(2)) out.push({ part: "b:" + V.double, patch: V.double, step, offset: sw, dur: 2, midi: m, vel: HV.chordStabLevel * BAL.vocals, straight: true }); }
    // the tune: the night's hook at its key moments (hookUse: a wave landing's first eight bars, the victory), whole on the lead
    // (a gentle wave: at half speed), the singer on its long notes; between them the wave's own riff, on the reply voice where
    // the lead rests (the breakbeat phrase's first half, a later pass's first phrase), the reply answering in the gaps
    const slot = (pb * 16 + s) % 128;
    ooh(1);
    if (use === "whole") {
      // (she leads, the kit's lead under her; a family with its own lead keeps it, her doubling up)
      if (she) { play(lead, hook, slot, LV!.support, 16, false, true); herLine(hook, slot, 1, 16, false, V?.thirds ?? 0); }
      else { play(lead, hook, slot, 1); vox(hook.period[slot], (V?.doubleLevel ?? 0) * (LV?.more ?? 1), 16, V?.thirds ?? 0); } if (role === "victory") tune(reply, hook.reply[slot], 0.7, {}, 16, hook, "reply"); else if (xyAnswer && !xyChords) tune(xylo, hook.reply[slot], 0.8, {}, 16, hook, "reply");
    }
    else if (use === "slow") tune(lead, slow(), 0.9);
    else if (ost) {
      // the ostinato, stacked: the lead, the xylophone an octave under it and (a heavier phrase) the singer on its accents,
      // all on the same sixteenth; the reply voice answering over its second bar; from the second repeat a line a third under
      const O = ostinato(B, seed, Math.floor(barIn / 2) + pass * 64, ostLevel >= 2), oslot = (pb % 2) * 16 + s, n = O.period[oslot];
      if (n && s < until) {
        const m = tune(lead, n, 1.15 * (she ? LV!.ostSupport : 1), {}, until, O);
        if (m !== null && xylo) ev(xylo.patch, m - 12 >= 55 ? m - 12 : m, 0.8 * OS!.xylo * xylo.level * (R?.level ?? 1) * (n.vel ?? 0.8), 1);
        if (she) her(O, n, LV!.ostinato, until); else if (n.acc && !light) vox(n, OS!.vocal * (LV?.more ?? 1), until);
        if (ostLevel >= 1) tune(lead, { deg: n.deg - 2, dur: n.dur, vel: (n.vel ?? 0.8) * OS!.thirds }, 1.15 * (she ? LV!.ostSupport : 1), {}, until, O);
      }
      tune(reply, O.reply[oslot], 0.7, {}, until, O, "reply");
    } else {
      const rests = role === "breaks" ? barIn < 4 : pass % 2 === 1 && barIn < 8;
      // (the riff rests in its third bar of four: a gap the drums and the chords fill; no run into it)
      const gapBar = !!SPC?.riffRest && pb % 4 === 2, answer = xyAnswer && !xyChords;
      const noInto = !!SPC?.riffRest && pb % 4 === 1, hers = she && !rests;
      if (!gapBar) { play(rests ? reply : lead, riff, slot, rests ? 0.9 : 0.9 * (gentle ? 0.85 : 1) * (hers ? LV!.support : 1), 16, noInto, hers); if (hers) herLine(riff, slot, 0.9, 16, noInto); }
      // (the gaps answered by the xylophone in the phrases dealt to it, else by the reply voice: one or the other)
      if (!gapBar && answer) tune(xylo, riff.reply[slot], 0.8, {}, 16, riff, "reply");
      else if (!gapBar && !rests && (half || role === "breaks")) tune(reply, riff.reply[slot], 0.7, {}, 16, riff, "reply");
      if (!rests && !gapBar && V && !she) { const first = riff.period.slice(pb * 16, pb * 16 + 16).findIndex(x => x?.long); if (first === s) vox(riff.period[slot], V.stabLevel, until); } // (a sung stab on the riff's first long note)
    }
  } else if (role === "breakdown") {
    if (!dropped) {
      // the quiet half, dreamy: no drums but finger snaps; the pad and a long sub, the rolling bed soft, the singer on the hook
      // at half speed, her long notes stacked (the same note left and right, and its octave), all on the same sixteenth
      pad(0.9 * (DM?.pad ?? 1));
      if (s === 0 && barIn % 2 === 0) bass({ patch: ["bgSub"], octave: 0, sub: false, p: ["1-------------------------------"] }, ["1-------------------------------"], 0.7 * (DM?.sub ?? 1));
      const n = slow();
      // (she sings its long notes alone: the runs between them are the bed's to fill; with no singer the reply voice has it all)
      if (n) { if (!singer) tune(reply, n, 0.9); else if (n.long) sing(n, n.dur, DM?.sung ?? 1); stack(n, singer ? sungAt : null); }
      bed(BED?.dream ?? 0, false);
      // (now and then: the xylophone's figure in the hook's gaps, where the bed isn't its own)
      if (SP && xylo && !bedXylo && hash2(seed, 861, phraseNo) < SP.breakdown) tune(xylo, hook.reply[((barIn % 8) * 16 + s) % 128], 0.7, {}, 16, hook, "reply");
      if (SP && (s === 4 || s === 12) && style.patches[SP.snap]) ev(SP.snap, null, 0.6 * SP.snapLevel * BAL.drums, 1); // (the quiet half's backbeat: finger snaps, soft)
      if (Number.isFinite(dropAt)) {
        const rb = Math.max(0, Math.min(H!.drop.riserBars, dropAt)), k = barIn - (dropAt - rb);
        if (k >= 0 && k < rb) riser(k / rb, (k + 1) / rb, 16, DM?.riser && style.patches[DM.riser] ? DM.riser : "riser"); // (the dreamy half stays under the drop: the quieter riser)
      } else if (last) drums(B.fills[pick(kit.fills.length ? kit.fills : Object.keys(B.fills), hash2(seed, 843, bar))] ?? []);
    } else {
      // the drop, aggressive: drum & bass, its ghost snares and running hats, the distorted mid bass over the sub, the hook
      // whole on the lead over the bed
      const k = barIn - dropAt, until = last ? 12 : 16;
      if (k === 0) { crash(0.9 * soft); if (H!.drop.impact && !gentle) impact(); }
      if (last) fillBar(B.dnb.drums, soft); else drums(B.dnb.drums, soft);
      if (DR && !gentle) drums(DR.breaks, 1, last ? () => s < 8 : undefined);
      bass(B.dnb.bass, B.dnb.bass.p, 0.95 * soft, until, !DR || gentle ? 0 : DR.bass.dnb);
      pad(0.7);
      bed(1, gentle, until);
      const slot = ((k % 8) * 16 + s) % 128, T = use === "whole" ? hook : riff;
      if (she) { play(lead, T, slot, LV!.support, until, false, true); herLine(T, slot, 1, until, false, use === "whole" ? V?.thirds ?? 0 : 0); }
      else { play(lead, T, slot, 1, until); if (use === "whole") vox(T.period[slot], (V?.doubleLevel ?? 0) * (LV?.more ?? 1), until, V?.thirds ?? 0); }
      tune(reply, T.reply[slot], 0.7, {}, until, T, "reply");
    }
  } else {
    // the build: things taken away. Its first half dreamy (the snare out for finger snaps, then the kick and the bass too: the
    // bed, the singer's stacked long notes); then the snare roll doubling, the hook's first note faster and faster, the last
    // beat all but silent
    const n = plan.bars, q = Math.floor((barIn * 4) / n), p = (barIn + s / 16) / n, gap = last && s >= 12;
    riser(barIn / n, (barIn + 1) / n, last ? 12 : 16, "bgRiser"); // (its own, quieter: the build's end stays under the drop)
    pad(q < 2 ? 0.8 * (gentle ? 1 : DM?.pad ?? 1) : 0.5);
    if (gentle) {
      // (a gentle build: the groove on, its kick out for the last bar, a shaker rising, the hook slow, then the riff)
      if (!last) { drums(kit.drums, 1, undefined, true); bass(kit.bass, kit.bass.p, 0.9); } else if (!gap) drums(kit.drums, 0.9, k => k === "top");
      if (!gap && s % 2 === 0) ev("shaker", null, 0.12 + 0.25 * p, 1); // (in eighths, soft: Ed, 2026-11-11, "Too much shaker")
      const sl = use === "slow" ? slow() : null;
      if (use === "slow") { if (sl && !(a.vocal !== "none" && sing(sl, sl.dur, 0.9))) tune(lead, sl, 0.8); } else if (!gap) play(lead, riff, (pb * 16 + s) % 128, 0.8);
      if (!gap) bed(BED?.dream ?? 0, true);
    } else if (!gap) {
      const kickV = kit.drums.find(v => kindOf(v.patch) === "kick");
      // (its first half light: finger snaps on two and four; the snare roll from the half)
      if (q === 0) { drums(kit.drums, DM ? 0.25 + 0.75 * DM.drums : 1, k => k !== "snare"); bass(kit.bass, DR?.gallop && !kit.half ? [DR.gallop] : kit.bass.p, 0.9 * (DM?.drums ?? 1)); } // (the bass galloping: an off-beat eighth and a sixteenth into the beat)
      else if (q === 1) { drums(kit.drums, DM?.drums ?? 1, k => k === "top"); if (s === 0 && barIn % 2 === 0) bass({ patch: ["bgSub"], octave: 0, sub: false, p: ["1-------------------------------"] }, ["1-------------------------------"], 0.7 * (DM?.sub ?? 1)); }
      else if (q === 2) { drums(kit.drums, 0.9, k => k === "top"); if (kickV && s % 8 === 0) ev(kickV.patch, null, 0.9, 1); }
      if (q < 2 && SP && (s === 4 || s === 12) && style.patches[SP.snap]) ev(SP.snap, null, SP.snapLevel * BAL.drums, 1);
      if (q < 2) bed(BED?.dream ?? 0, false);
      const roll = q >= 2, lv = 0.15 + 0.3 * p;
      if (roll) { ev("snare", null, lv * (s % 4 === 0 ? 1 : 0.8), 1); if (q === 3 && barIn >= n - 1) out.push({ part: "b:snare", patch: "snare", step, offset: sw + 0.5, dur: 0.5, midi: null, vel: lv * 0.8, straight: true }); }
      // the hook: at half speed, sung (a wave with a singer) and stacked, or played; then its first long note on every beat,
      // every eighth, every sixteenth
      const first = hook.period.find(x => x?.long) ?? null;
      if (q < 2) { const sl = slow(), sg = singer && a.vocal !== "none"; if (sl) { if (!sg) tune(lead, sl, 0.7); else if (sl.long) sing(sl, sl.dur, 0.9 * (DM?.sung ?? 1)); stack(sl, sg ? sungAt : null); } }
      else if (first && (q === 2 ? s % 4 === 0 : barIn >= n - 1 || s % 2 === 0)) tune(lead, { deg: first.deg, dur: q === 2 ? 2 : 1 }, 0.2 + 0.2 * p);
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
  const bassOf = (where: string, D: BangerBass) => { for (const p of D.patch) patch(where, p); for (const p of [...D.p, ...(D.breaks ?? []), ...(D.bounce ?? [])]) pat(where, p); };
  for (const [k, L] of Object.entries(B.leads)) patch(`lead ${k}`, L.patch);
  for (const [k, f] of Object.entries(B.fills)) voices(`fill ${k}`, f);
  voices("dnb", B.dnb.drums); bassOf("dnb bass", B.dnb.bass); voices("victory", B.victory);
  for (const p of [...B.hook.motifs, ...B.hook.answers, ...(B.hook.tresillos ?? [])]) {
    if (p.length !== 16 || /[^L\-.rgt~]/.test(p) || /t(?!~)|(?<!t)~|[rg~]\.|g[^L]|^-|\.-|[rg~]-/.test(p) || !/L-{3}/.test(p)) errs.push(`banger hook: rhythm "${p}"`);
  }
  if (B.space?.bed) { const D = B.space.bed; for (const l of [D.voice, D.low]) if (!B.leads[l]) errs.push(`banger bed: no lead "${l}"`); for (const f of D.figures) if (f.length % 16 || /[^abcd.]/.test(f)) errs.push(`banger bed: figure "${f}"`); }
  if (B.drive?.gallop) pat("drive gallop", B.drive.gallop);
  if (B.ostinato?.stabs) pat("ostinato stabs", B.ostinato.stabs);
  if (B.drive) { voices("drive groove", B.drive.groove); voices("drive breaks", B.drive.breaks); patch("drive bass", B.drive.bass.patch); }
  if (B.ostinato?.tresillo) for (const g of B.ostinato.tresillo.groups) if (g.reduce((x, y) => x + y, 0) !== 32 || g.some(x => x < 3)) errs.push(`banger ostinato: tresillo ${g.join("+")} isn't two bars`);
  for (const p of B.hook.tresillos ?? []) if (/[rgt]/.test(p) || [...p].map((c, i) => (c === "L" ? i : -1)).filter(i => i >= 0).join() !== "0,6,12") errs.push(`banger hook: tresillo "${p}"`);
  if (B.ostinato) { const O = B.ostinato; for (const h of O.heads) for (const n of O.threes) { const left = 32 - h.reduce((x, y) => x + y, 0) - 3 * n; if (left < 0 || left % 2) errs.push(`banger ostinato: ${h.join("+")} and ${n} threes don't fill two bars`); } for (const a of O.arts) if (/[^Ast]/.test(a)) errs.push(`banger ostinato: articulations "${a}"`); if (!O.shapes.length) errs.push("banger ostinato: no shapes"); }
  if (B.dream) for (const p of [...B.dream.stack, B.dream.octave]) patch("dream", p);
  for (const [n, L] of Object.entries(B.leads)) { const P = style.patches[L.patch], Q = P?.from ? { ...style.patches[P.from], ...P } : P; if (Q?.glide || Q?.bend) errs.push(`banger lead ${n}: its patch slides (glide or bend)`); }
  for (const name of Object.keys(B.kits)) {
    const K = kitOf(B, name);
    if (B.kits[name].base && !B.kits[B.kits[name].base!]) errs.push(`banger kit ${name}: no base "${B.kits[name].base}"`);
    if (K.bed && !B.leads[K.bed]) errs.push(`banger kit ${name}: no bed lead "${K.bed}"`);
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
  if (B.vocals?.lead) { const L = B.vocals.lead; for (const p of [L.patch, ...L.stack, L.shimmer]) patch("vocals lead", p); if (L.range[1] - L.range[0] < 12) errs.push("banger vocals lead: its range is under an octave"); }
  if (B.space) {
    const X = B.space.xylo;
    for (const l of [X.voice, X.low]) if (!B.leads[l]) errs.push(`banger space: no lead "${l}"`);
    for (const [n, p] of Object.entries(X.figures)) if (p.length % 16 || /[^xabc1t.]/.test(p)) errs.push(`banger space: figure ${n} "${p}"`);
    if (!X.figures[X.roll]) errs.push(`banger space: no roll figure "${X.roll}"`);
  }
  if (B.spice) { patch("spice", B.spice.snap); if (!B.leads[B.spice.xylo]) errs.push(`banger spice: no lead "${B.spice.xylo}"`); }
  return errs;
}
