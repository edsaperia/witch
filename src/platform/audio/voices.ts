// Who sounds like what: a creature's voice for its babble (platform/audio/babble.ts), higher the
// smaller and younger, each species its own, its call blended in (config/creature-voices.json: a
// family's call style and the species' tweaks), and the mood it speaks in.
import type { Creature } from "../../rules/creatures";
import { strengthOf } from "../../rules/combat";
import { hash2 } from "../../rules/random";
import type { Tuning } from "../../rules/tuning";
import voices from "../../../config/creature-voices.json";

/** A voice's mood: happy rises and bounces, enraged falls clipped and gritty, grumpy sits low and flat. */
export type Mood = "happy" | "grumpy" | "enraged";
/** A creature's call blended into its babble (config/creature-voices.json: a family's, a species' tweaks):
 *  `pitch` and `formants` are already in its voice; the rest shape each syllable. */
export interface CallStyle {
  pitch: number; formants: number; wave?: OscillatorType; pure?: boolean; glide: number;
  trill?: number[]; am?: number[]; noise?: number; dur: number; gap: number; extra?: number; consonant?: number; vowel?: number; turn?: string; volume?: number;
}
/** One creature's voice: its pitch (Hz), how far its formants sit above an adult's (small: higher), its source. */
export interface CreatureVoice { pitch: number; formants: number; wave: OscillatorType; /** a legend: whale song, not babble */ legend?: boolean; call?: CallStyle }

const VOICES = voices as unknown as { families: Record<string, Partial<CallStyle>>; species: Record<string, Partial<CallStyle> & { family?: string }> };
/** A species' call: its family's style with its own tweaks over it (config/creature-voices.json). */
export function callOf(species: string): CallStyle {
  const sp = VOICES.species[species] ?? {}, fam = VOICES.families[sp.family ?? ""] ?? {};
  return { glide: 1, dur: 1, gap: 1, ...fam, ...sp, pitch: (fam.pitch ?? 1) * (sp.pitch ?? 1), formants: (fam.formants ?? 1) * (sp.formants ?? 1) } as CallStyle; // (pitch and formants multiply; the rest the species overrides)
}

/** A creature's voice: higher the smaller and younger (its level, its strength class: a swarm's
 *  small, a loner's big), each species its own pitch, formants and source. */
export function voiceOf(c: Creature, t: Tuning): CreatureVoice {
  let h = 0;
  for (let i = 0; i < c.species.length; i++) h = (h * 31 + c.species.charCodeAt(i)) >>> 0;
  const a = hash2(h, 1, 851), b = hash2(h, 2, 853), k = strengthOf(c.species, c.level as 0 | 1 | 2 | 3), size = k < 1 ? 1.35 : k > 1 ? 0.78 : 1;
  const call = callOf(c.species);
  return {
    pitch: t.sfx.voice.animals.pitch * Math.pow(2, -0.65 * (c.level - 1)) * size * (0.92 + 0.16 * a) * call.pitch,
    formants: (1.3 - 0.13 * c.level) * (k < 1 ? 1.12 : k > 1 ? 0.9 : 1) * (0.95 + 0.1 * b) * call.formants,
    wave: call.wave ?? (a < 0.5 ? "sawtooth" : a < 0.8 ? "square" : "triangle"),
    legend: !!c.boss, call,
  };
}

/** How it speaks: happy (on her side, guarding, at peace), enraged, or a wild one's grumble. */
export const speechMood = (c: Creature): Mood => (c.leashed || c.guard || c.friendly || c.legendState === "happy" ? "happy" : c.enraged || c.siege ? "enraged" : "grumpy");
