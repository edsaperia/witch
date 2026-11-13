// The creatures' spell glow (Ed, 2026-11-09: "The animal magic effects need to glow"): what the creature attacks add on top of the
// magic layers (render/fx/system.ts) so they glow, in the brief's words (docs/backlog/magic-effects.md §5, Ed 2026-10-28: "Pixel
// cores and dithered pixel halos, with a small smooth bloom over the top"; real light allowed but capped): a glowing core bright
// enough in the added light to cross the bloom's threshold, a dithered halo in art-pixel steps, a pool of its light on the ground at
// its foot, and a short-lived real light for the brightest few nearest her. Drawing only: nothing here touches the rules.
// The tuning's attackFx.glow holds the knobs; ?spellglow=0 draws the spells as before, to compare.
// Since Ed, 2026-11-13 ("extend"): her own magic glows with the same pieces (MagicGlowTuning below; attackFx.magicGlow, ?magicglow=0).

/** The tuning's attackFx.glow: core, how bright the glowing cores are (0 none); halo, the dithered halo's strength; pool, the
 *  light's pool on the ground; lights, at most this many spells with a real light at once; light, those lights' strength. */
export interface GlowTuning { core: number; halo: number; pool: number; lights: number; light: number }
/** One frame's glow, as drawn: the knobs after the comfort setting (each 0 or more). */
export interface GlowLook { core: number; halo: number; pool: number; lights: number; light: number }

/** The look before the glow (the knobs' off values): the spells drawn exactly as they were. */
export const NO_GLOW: Readonly<GlowTuning> = { core: 0, halo: 0, pool: 0, lights: 0, light: 0 };
/** The share of the glow kept with Reduce flashing on (the Settings page): about half, and nothing in it strobes. */
export const CALM_GLOW = 0.5;
/** The most effect lights there are at once (config/fx/intensity.json lightCap; Ed, 2026-10-28: "about 6 effect lights at once"). */
export const MAX_SPELL_LIGHTS = 6;

/** ?spellglow=0: the creatures' spells without the glow (as before 9 November), to compare. Read once, from the link. */
export const SPELL_GLOW = { on: new URLSearchParams(globalThis.location?.search ?? "").get("spellglow") !== "0" };

const clamp = (v: number, lo: number, hi: number) => (Number.isFinite(v) ? Math.max(lo, Math.min(hi, v)) : lo);

/** This frame's glow from the knobs, the link switch and the comfort setting; null when there's none to draw (switched off, or every
 *  knob at 0), so the spells draw exactly as before. */
export function glowLook(t: GlowTuning | undefined, on: boolean, reduceFlashing: boolean): GlowLook | null {
  if (!on || !t) return null;
  const k = reduceFlashing ? CALM_GLOW : 1;
  const look = { core: clamp(t.core, 0, 4) * k, halo: clamp(t.halo, 0, 4) * k, pool: clamp(t.pool, 0, 4) * k, lights: Math.round(clamp(t.lights, 0, MAX_SPELL_LIGHTS)), light: clamp(t.light, 0, 4) * k };
  return look.core + look.halo + look.pool + look.light > 0 ? look : null;
}

/** Her own magic's glow (Ed, 2026-11-13, asked whether to extend the creatures' glow to her magic: "extend"): the same pieces (a
 *  glowing core, a dithered halo, a pool on the ground, a real light where it earns one) for the party start's analyser ring at her
 *  decks, her blink, the ley line's spark and the other native adapters (config/fx/native.json `glow`), each in its own colour. The
 *  tuning's attackFx.magicGlow: core, halo and pool as the creatures'; light, her magic's lights' strength. */
export interface MagicGlowTuning { core: number; halo: number; pool: number; light: number }
/** ?magicglow=0: her magic without the glow (as before 13 November), to compare. Read once, from the link. */
export const MAGIC_GLOW = { on: new URLSearchParams(globalThis.location?.search ?? "").get("magicglow") !== "0" };
/** The effect lights her cast magic (her blink, the party start, the ley line's spark) takes first when the effects want more than
 *  there are (pickLights): hers being the player's, a fair first claim; the creatures' spells keep the other four or more. */
export const HER_LIGHTS = 2;
/** This frame's glow for her magic, as glowLook: null when there's none to draw (switched off, or every knob at 0), so her magic
 *  draws exactly as before. (Its lights aren't counted against the creatures' cap: `lights` the effects' whole six.) */
export function magicGlowLook(t: MagicGlowTuning | undefined, on: boolean, reduceFlashing: boolean): GlowLook | null {
  return glowLook(t ? { ...t, lights: MAX_SPELL_LIGHTS } : undefined, on, reduceFlashing);
}

/** A light asking for a slot: how strong (eased), whether it's a creature's spell's, whether it had a slot last frame, and whether
 *  it's her own cast magic's (first claim, HER_LIGHTS). */
export interface LightAsk { score: number; spell: boolean; held: boolean; hers?: boolean }
/** Which of the effect lights get a slot this frame: her own cast magic's first (the strongest `herCap` of them: hers is the
 *  player's), then strongest and nearest her first (score: lightScore), a light that held its slot last frame kept unless clearly
 *  beaten (so two near-equal ones don't swap slots and pop), at most `cap` in all and at most `spellCap` creatures' spells among
 *  them. Returns the chosen ones' indices, best first. */
export function pickLights(asks: readonly LightAsk[], cap: number, spellCap: number, herCap = 0): number[] {
  const order = asks.map((_, i) => i).sort((a, b) => rank(asks[b]) - rank(asks[a]) || a - b), out: number[] = [];
  for (const i of order) if (asks[i].hers && out.length < Math.min(cap, herCap)) out.push(i);
  let spells = 0;
  for (const i of order) {
    if (out.length >= cap) break;
    if (out.includes(i)) continue;
    if (asks[i].spell) { if (spells >= spellCap) continue; spells++; }
    out.push(i);
  }
  return out;
}
const rank = (a: LightAsk) => a.score * (a.held ? 1.35 : 1);

/** How many of the world's own lights (the nearest, render/view/lights.ts setLights) make room for the effects' this frame, eased so
 *  none pops off: `from` last frame's share, `want` the slots the effects need past the free ones, `step` the frame's time over the
 *  lights' ease (config/fx/intensity.json lightEase). Returns the new share: its whole part the world lights dropped, its fraction
 *  how far the next one has faded. */
export function easeRoom(from: number, want: number, step: number): number {
  const d = want - from;
  if (Math.abs(d) <= 1e-6) return want;
  // (every slot in the same ease: several at once take as long as one)
  const move = Math.max(1, Math.abs(d)) * Math.max(0, step);
  return Math.abs(d) <= move ? want : from + Math.sign(d) * move;
}
