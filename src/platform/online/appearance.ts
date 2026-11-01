import { WITCH_GENOME, upgradeGenome, witchGenomeProblems } from "../../../art/witchGenome.js";
import { DEFAULT_OUTFIT } from "../../../art/witch.js";

export type Appearance = Record<string, unknown>;
const record = (value: unknown): value is Appearance => !!value && typeof value === "object" && !Array.isArray(value) && [Object.prototype, null].includes(Object.getPrototypeOf(value));
/** Explicit data-only shape before artwork reaches a worker. No inventory, player IDs or rules knobs. */
export function appearance(value: unknown): Appearance | null {
  if (!record(value)) return null;
  const known = WITCH_GENOME as unknown as Appearance;
  for (const [key, part] of Object.entries(value)) {
    if (!Object.hasOwn(known, key)) return null;
    if (key === "palette") {
      if (part === null) continue;
      if (!record(part) || Object.entries(part).some(([name, colour]) => !Object.hasOwn(DEFAULT_OUTFIT, name) || !Array.isArray(colour) || colour.length !== 3 || colour.some(n => typeof n !== "number" || !Number.isFinite(n) || n < 0 || n > 1))) return null;
    } else if (record(known[key])) {
      if (!record(part)) return null;
      const defaults = known[key] as Appearance;
      for (const [field, item] of Object.entries(part)) {
        if (!Object.hasOwn(defaults, field)) return null;
        if (key === "accessories" && field === "shades" && item === "round") continue;
        if (typeof item !== typeof defaults[field] || typeof item === "number" && !Number.isFinite(item)) return null;
      }
    } else if (typeof part !== typeof known[key] || typeof part === "number" && !Number.isFinite(part)) return null;
  }
  try {
    const json = JSON.stringify(value); if (json.length > 16384) return null;
    const upgraded = upgradeGenome(JSON.parse(json));
    return witchGenomeProblems(upgraded).length ? null : upgraded as Appearance;
  } catch { return null; }
}
