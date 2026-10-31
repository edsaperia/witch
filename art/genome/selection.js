// One explicit per-species selection, shared by page, worker and capture tools.
// No window/location/global registry: transport the same plain style data.
import { GENOMES } from "./species.js";
import { rosterVariant } from "../roster/presets.js";
// Ed's 6520690688 release set; parked candidates are intentionally absent.
export const DEFAULT_ROSTER_IDS = ["fennec","dragonfly","wolf","dormouse","bat","woodlouse","frosttroll","hydra","crocodile","crab","meerkat","flyingsquirrel","marten","raccoon","badger","stoat","otter","jaguar","bear","arcticfox"];
const canonicalGenomes = new WeakSet(GENOMES), defaults = new WeakMap();
function defaultGenome(base, level) {
  if (!canonicalGenomes.has(base) || !DEFAULT_ROSTER_IDS.includes(base.id)) return base;
  if (!defaults.has(base)) defaults.set(base,rosterVariant(base)); // exact level-aware pack used by the final review
  return defaults.get(base);
}
export function parseCreatureModels(raw) {
  const out = Object.create(null);
  if (typeof raw !== "string") return out;
  for (const token of raw.split(",")) {
    const match = /^([a-z][a-z0-9_-]*):([a-z][a-z0-9_-]*)$/.exec(token.trim());
    if (match) out[match[1]] = match[2];
  }
  return out;
}

// creatureVariants[id][mode] is a COMPLETE genome, not a partial patch.
// Unavailable modes keep today's record and cache identity; invalid selected
// records fail clearly rather than silently drawing a different animal.
/** @param {number|null} [level] */
export function selectedCreatureGenome(base, context = {}, level = null) {
  if (level !== null && (!Number.isInteger(level) || level < 0 || level > 3)) throw new Error("Creature selection level must be 0..3");
  const mode = parseCreatureModels(context?.creatureModels)[base.id];
  if (mode === "current") return base;
  let selected;
  if (!mode) selected = defaultGenome(base,level);
  else {
    const variants = context.creatureVariants;
    if (!variants || !Object.hasOwn(variants, base.id)) return base;
    const family = variants[base.id];
    if (!family || typeof family !== "object" || !Object.hasOwn(family, mode)) return base;
    selected = family[mode];
  }
  if (!mode && selected === base) return base; // untouched Current keeps its historical level-palette behaviour
  if (!selected || selected.id !== base.id || !selected.template || !selected.builder || !selected.palette) throw new Error(`Invalid selected creature genome: ${base.id}:${mode}`);
  const look = level === null ? null : selected.levels?.[level]?.look;
  const palette = level === null ? null : selected.levels?.[level]?.palette;
  return look || palette ? { ...selected, ...(look ? { look: { ...selected.look, ...look } } : {}), ...(palette ? { palette: { ...selected.palette, ...palette, ...(palette.over ? { over: { ...selected.palette.over, ...palette.over } } : {}) } } : {}) } : selected;
}
