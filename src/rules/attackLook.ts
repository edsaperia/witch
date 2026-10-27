// The attack look's data (config/attack-look.json; the gallery mock, previews/ed/spell-gallery): which element dresses a creature's
// spells, how big its level draws them, and the danger frame every wild spell wears. No drawing here: art/attackLook.js bakes the
// elements' parts, render/leash/attackLook.ts draws them.
import raw from "../../config/attack-look.json";
import { KINDS_TABLE } from "./kinds";

export const CORES = ["orb", "shard", "droplet", "crescent", "spark", "rock", "void", "petal"] as const;
export const TRAILS = ["embers", "sparkles", "drips", "wisps", "sparks", "dust", "smoke", "petals"] as const;
export const IMPACTS = ["burst", "shatter", "splash", "ring", "crackle", "rubble", "poof", "blossom"] as const;
export const BITS = ["flame", "shard", "droplet", "wisp", "fork", "chunk", "puff", "petal"] as const;
export const MARKS = ["scorch", "rime", "puddle", "halo", "char", "cracks", "pool", "flowers"] as const;
export const BEAMS = ["flame", "crystal", "drip", "ripple", "fork", "stone", "smoke", "petal"] as const;
export const MOTIFS = ["chains", "stars", "shockwave", "spiral"] as const;

export interface SpellElement {
  /** dark, mid, bright, hot ("#rrggbb") */
  palette: string[];
  accent?: string;
  core: (typeof CORES)[number]; trail: (typeof TRAILS)[number]; impact: (typeof IMPACTS)[number]; bits: (typeof BITS)[number];
  mark: (typeof MARKS)[number]; beam: (typeof BEAMS)[number]; area: (typeof MARKS)[number];
  /** its core and bits painted, not glowing (earth's rock, shadow's dark) */
  solid?: boolean;
}
export interface SpellsConfig {
  elements: Record<string, SpellElement>;
  effects: Record<string, (typeof MOTIFS)[number]>;
  power: Record<string, number>;
  particles: { trail: number; impact: number };
  danger: { warn: string; edge: string; dash: number; gap: number; march: number; flash: number; hatch: number };
  default: string;
  byBiome: Record<string, string>;
  bySpecies: Record<string, string>;
}

export const SPELLS = raw as unknown as SpellsConfig;
export const ELEMENTS: string[] = Object.keys(SPELLS.elements);

/** A creature's element: its own (bySpecies), else its kind's biome's, else the default. */
export function elementOf(species: string, cfg: SpellsConfig = SPELLS, kinds: Record<string, { biome?: string }> = KINDS_TABLE): string {
  const own = cfg.bySpecies[species];
  if (own && cfg.elements[own]) return own;
  const biome = kinds[species]?.biome, by = biome ? cfg.byBiome[biome] : undefined;
  return by && cfg.elements[by] ? by : cfg.default;
}

/** How big a level draws its spells (1 young, 2 adult, 3 legend; a baby's, if it ever casts, as a young's). */
export const spellPower = (level: number, cfg: SpellsConfig = SPELLS): number => cfg.power[String(Math.max(1, Math.min(3, level)))] ?? 1;

/** "#rrggbb" to 0..1 channels. */
export function rgbOf(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

/** What's wrong with a spells config (none: []): every element whole, its parts known, its palette four colours; every motif
 *  known; the default, byBiome and bySpecies naming elements that exist. */
export function spellsProblems(cfg: SpellsConfig, species: readonly string[], biomes: readonly string[]): string[] {
  const bad: string[] = [], hex = (s: unknown) => typeof s === "string" && /^#[0-9a-f]{6}$/i.test(s);
  const parts: [keyof SpellElement, readonly string[]][] = [["core", CORES], ["trail", TRAILS], ["impact", IMPACTS], ["bits", BITS], ["mark", MARKS], ["beam", BEAMS], ["area", MARKS]];
  for (const [id, e] of Object.entries(cfg.elements)) {
    if (!Array.isArray(e.palette) || e.palette.length !== 4 || !e.palette.every(hex)) bad.push(`${id}: its palette isn't four "#rrggbb" colours`);
    if (e.accent !== undefined && !hex(e.accent)) bad.push(`${id}: its accent isn't a "#rrggbb" colour`);
    for (const [k, known] of parts) if (!known.includes(e[k] as string)) bad.push(`${id}: no ${k} called ${String(e[k])}`);
  }
  for (const [mod, m] of Object.entries(cfg.effects)) if (!MOTIFS.includes(m)) bad.push(`effect ${mod}: no motif called ${m}`);
  for (const lv of ["1", "2", "3"]) if (!(cfg.power[lv] > 0)) bad.push(`power: level ${lv} missing`);
  if (!cfg.elements[cfg.default]) bad.push(`default: no element ${cfg.default}`);
  for (const [b, e] of Object.entries(cfg.byBiome)) { if (!cfg.elements[e]) bad.push(`byBiome ${b}: no element ${e}`); if (!biomes.includes(b)) bad.push(`byBiome: no biome called ${b}`); }
  for (const [s, e] of Object.entries(cfg.bySpecies)) { if (!cfg.elements[e]) bad.push(`bySpecies ${s}: no element ${e}`); if (!species.includes(s)) bad.push(`bySpecies: no species called ${s}`); }
  const d = cfg.danger;
  if (!hex(d.warn) || !hex(d.edge) || !(d.dash > 0) || !(d.gap > 0) || !(d.flash >= 0) || !(d.hatch >= 0 && d.hatch <= 1)) bad.push("danger: a value missing or out of range");
  return bad;
}
