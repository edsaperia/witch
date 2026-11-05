import { ITEMS } from "../../rules/wardrobe";
import { PART_IDS } from "../../rules/broomParts";
import { HAT_SPELLS } from "../../rules/spells";
import { RECORDS } from "../../rules/records";

export interface SharedCatalogue { wardrobe: string[]; parts: string[]; hats: string[]; records: string[] }
const registry: Record<keyof SharedCatalogue, ReadonlySet<string>> = { wardrobe: new Set(ITEMS.map(i => i.id)), parts: new Set(PART_IDS), hats: new Set(HAT_SPELLS.filter(h => h.built).map(h => h.id)), records: new Set(RECORDS.map(r => r.id)) };
/** Bounded display metadata from the host. It never grants authority or writes a visitor's inventory. */
export function sharedCatalogue(value: unknown): SharedCatalogue | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const v = value as Record<string, unknown>, keys = Object.keys(registry) as (keyof SharedCatalogue)[];
  if (Object.keys(v).length !== keys.length || keys.some(k => !Object.hasOwn(v, k))) return null;
  const out = {} as SharedCatalogue;
  for (const key of keys) {
    const list = v[key];
    if (!Array.isArray(list) || list.length > registry[key].size || list.some(id => typeof id !== "string" || !registry[key].has(id)) || new Set(list).size !== list.length) return null;
    out[key] = [...list].sort();
  }
  return out;
}
