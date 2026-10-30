// Roster review, Ed 2026-10-30: real-animal likeness before distinctness.
// Isolated data for the existing speciesOf/quad3d interface, not a second engine.
// No production import. Each species requires an explicit opt-in; defaults are off.
export const ROSTER_PRESETS = {
  beetle: {
    reason: "Ordinary stag-beetle wing cases and jaws are dark natural materials; reserve ember fissures for the elder.",
    reference: "https://www.nhm.ac.uk/discover/stag-beetles.html",
    ordinaryOnly: true,
    modelCommit: "fd1a833ae69e1d5cf1d9353b89fbdda39cbab802",
    patch: {
      palette: { hue: .04, sat: .45, val: .36, over: { SHELL: [125, 58, 30], THORAX: [38, 27, 23], HEAD: [32, 23, 20] } },
      look: { embers: false, materials: { wingCases: "SHELL", thorax: "THORAX", head: "HEAD" }, mandibles: { length: .8, width: 1.8, curve: .65, teeth: 2, awayTipLift: .16 } },
    },
    ordinaryLevels: { 0: { look: { mandibles: { length: .65, width: 1.5, curve: .55, teeth: 1, awayTipLift: .16 } } }, 1: { look: { mandibles: { length: .75, width: 1.7, curve: .6, teeth: 1, awayTipLift: .16 } } } },
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
    // Iteration 2 after f822dee2 actual native-size review: eight cells per
    // model unit collapsed into fine speckle. Fewer rings, still natural marks.
    patch: { coat: { spots: false, rosettes: { k: 5, density: .55 } } },
    ordinaryLevels: { 0: { coat: { spots: false, rosettes: { k: 5, density: .55 } } }, 1: { coat: { spots: false, rosettes: { k: 5, density: .55 } } }, 2: { coat: { spots: false, rosettes: { k: 5, density: .55 } } } },
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
  return rosterVariant(genome);
}

/** Complete data record for #1470's creatureVariants[id].roster contract.
 * This builds data only. It neither parses switches nor selects a model.
 * levels[3].palette needs the shared per-level palette contract (6513273814).
 */
export function rosterVariant(genome) {
  const preset = ROSTER_PRESETS[genome.id];
  if (!preset) return genome;
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
      if (preset.ordinaryOnly) {
        restore.look = { ...Object.fromEntries(Object.keys(preset.patch.look || {}).map(key => [key, genome.look?.[key] ?? null])), ...genome.look };
        // Null clears newly added material overrides in the shared merge contract.
        restore.palette = { ...genome.palette, over: genome.palette.over || null };
      }
      return merge(restore, original);
    }
    return merge(original, preset.ordinaryLevels?.[level] || {});
  });
  return result;
}

/** Caller transports this pack with the same plain context to page/worker/tools.
 * Shared selectedCreatureGenome/speciesOf/genomeHash own selection and hashing.
 */
export function createRosterVariants(genomes) {
  return Object.fromEntries(genomes.filter(g => ROSTER_PRESETS[g.id]).map(g => [g.id, { roster: rosterVariant(g) }]));
}
