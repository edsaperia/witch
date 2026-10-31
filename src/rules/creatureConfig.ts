// Each creature's config sections (art/creatures/<id>/creature.js, assembled by art/creatures/index.js; Ed, 2026-10-13: the
// config files' per-species entries collided in merges, so each species keeps its own in its folder): its movement profile,
// legend moves and body radius (config/movement.json's), its attacks, strength, ranged and kite flags, temperament and traits
// (config/combat.json's), its voice (config/creature-voices.json's) and character
// (config/character.json's) and its pack (config/packs.json's kinds: rules/combat/packs.ts). The config readers (rules/movement.ts, rules/combat/data.ts, platform/audio/voices.ts,
// render/character.ts) spread these over what their file still holds, so the tables they export are as they
// were. tools/creatures.mjs lists, checks and shows them; the schema is config/schema/creature.schema.json.
import { CREATURE_CONFIGS } from "../../art/creatures/index.js";

export interface CreatureConfig {
  movement?: unknown; legendMoves?: unknown; radius?: number;
  attacks?: (string | null)[]; strength?: number; ranged?: boolean; kite?: boolean; temperament?: string; traits?: string[];
  voice?: unknown; character?: unknown; pack?: unknown;
}
export const CREATURES: Record<string, CreatureConfig> = CREATURE_CONFIGS as unknown as Record<string, CreatureConfig>;
export const CREATURE_IDS: readonly string[] = Object.keys(CREATURES);

/** One section by species, for the species that have it. */
export function sectionOf<K extends keyof CreatureConfig>(key: K): Record<string, NonNullable<CreatureConfig[K]>> {
  const out: Record<string, NonNullable<CreatureConfig[K]>> = {};
  for (const id of CREATURE_IDS) { const v = CREATURES[id][key]; if (v !== undefined) out[id] = v as NonNullable<CreatureConfig[K]>; }
  return out;
}
/** The species whose section is true (no `value`), equals `value`, or (a list) holds it. */
export function speciesWith(key: keyof CreatureConfig, value?: string): string[] {
  return CREATURE_IDS.filter(id => { const v = CREATURES[id][key]; return value === undefined ? v === true : Array.isArray(v) ? v.includes(value) : v === value; });
}
