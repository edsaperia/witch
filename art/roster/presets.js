// Roster review, Ed 2026-10-30: real-animal likeness before distinctness.
// Isolated data for the existing speciesOf/quad3d interface, not a second engine.
// No production import. Each species requires an explicit opt-in; defaults are off.
export const ROSTER_PRESETS = {
  beetle: {
    reason: "Ordinary stag-beetle wing cases and jaws are dark natural materials; reserve ember fissures for the elder.",
    reference: "https://www.nhm.ac.uk/discover/stag-beetles.html",
    ordinaryOnly: true,
    patch: { palette: { hue: .06, sat: .35, val: .28, accent: [.06, .35, .3] }, look: { embers: false } },
    text: "A dark beetle with brown wing cases and antler-like jaws; its elder carries the fire.",
  },
  bear: {
    reason: "A black bear has no grizzly shoulder hump; retain its dark coat and bear body.",
    reference: "https://www.nps.gov/articles/bear-identification.htm",
    patch: { body: { humpK: 0, front: 1 } },
    ordinaryLevels: { 0: { body: { humpK: 0, front: 1 } }, 1: { body: { humpK: 0, front: 1 } }, 2: { body: { humpK: 0, front: 1 } } },
    text: "A dark forest bear with a straight back, prominent ears and a pale muzzle.",
  },
  arcticfox: {
    reason: "Short ears and a compact winter body distinguish this fox naturally; reduce the blue cast.",
    reference: "https://www.adfg.alaska.gov/index.cfm?adfg=arcticfox.main",
    patch: { palette: { sat: .04 }, parts: { ears: { kind: "round", size: .65 } } },
    ordinaryLevels: { 0: { parts: { ears: { kind: "round", size: .65 } } }, 1: { parts: { ears: { kind: "round", size: .65 } } }, 2: { parts: { ears: { kind: "round", size: .65 } } } },
    text: "A compact white winter fox with short rounded ears and a dense brush tail.",
  },
  snowleopard: {
    reason: "Replace generic spots with broken rosettes while keeping its existing long thick ringed tail.",
    reference: "https://zoo.sandiegozoo.org/animals/snow-leopard",
    patch: { coat: { spots: false, rosettes: { k: 8, density: .7 } } },
    ordinaryLevels: { 0: { coat: { spots: false, rosettes: { k: 7, density: .7 } } }, 1: { coat: { spots: false, rosettes: { k: 8, density: .7 } } }, 2: { coat: { spots: false, rosettes: { k: 8, density: .7 } } } },
    text: "A smoky pale mountain cat with dark rosettes, broad paws and a long thick tail.",
  },
};

function merge(a, b) {
  const out = { ...a };
  for (const [key, value] of Object.entries(b)) out[key] = value && typeof value === "object" && !Array.isArray(value) ? merge(a?.[key] || {}, value) : value;
  return out;
}

/** The switch is deliberately per species. Unknown selections fail closed.
 * Legends keep original anatomy/features. Palette is species-wide in this interface;
 * arctic fox's neutral white also applies to its elder (still a white fox).
 */
export function rosterGenome(genome, selected = [], level) {
  const preset = selected.includes(genome.id) && ROSTER_PRESETS[genome.id];
  if (!preset) return genome;
  // The old beetle builder reads a species-wide look, so require explicit level.
  // Fail closed for callers that cannot yet supply #1470's level-aware contract.
  if (preset.ordinaryOnly && ![0, 1, 2].includes(level)) return genome;
  const result = merge(genome, preset.patch);
  result.levels = Array.from({ length: 4 }, (_, level) => {
    const original = genome.levels?.[level] || {};
    if (level === 3) {
      // speciesOf does not support per-level palette; ordinary coat/body/parts changes
      // are restored for legends using the existing level interface.
      const restore = {};
      for (const [section, patch] of Object.entries(preset.patch)) {
        if (section === "palette") continue;
        restore[section] = Object.fromEntries(Object.keys(patch).map(key => [key, genome[section]?.[key] ?? false]));
      }
      return merge(restore, original);
    }
    return merge(original, preset.ordinaryLevels?.[level] || {});
  });
  return result;
}
