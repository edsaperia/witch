// One explicit per-species selection, shared by page, worker and capture tools.
// No window/location/global registry: transport the same plain style data.
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
  if (!context?.creatureModels) return base;
  const mode = parseCreatureModels(context.creatureModels)[base.id];
  if (!mode || mode === "current") return base;
  const variants = context.creatureVariants;
  if (!variants || !Object.hasOwn(variants, base.id)) return base;
  const family = variants[base.id];
  if (!family || typeof family !== "object" || !Object.hasOwn(family, mode)) return base;
  const selected = family[mode];
  if (!selected || selected.id !== base.id || !selected.template || !selected.builder || !selected.palette) throw new Error(`Invalid selected creature genome: ${base.id}:${mode}`);
  const look = level === null ? null : selected.levels?.[level]?.look;
  return look ? { ...selected, look: { ...selected.look, ...look } } : selected;
}
