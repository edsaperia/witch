// Roster review, Ed 2026-10-30: real-animal likeness before distinctness.
// Isolated data for the existing speciesOf/quad3d interface, not a second engine.
// No production import. Each species requires an explicit opt-in; defaults are off.
const ROSTER_SNOW_REGIONS = {
  torso: { kind: "rosettes", outerPx: 8, density: .55, inner: .22, outer: .43, sizeVariation: .15, closedFraction: .25, filledFraction: .2, gapRange: [0, .65], densityFalloff: [{ axis: "x", from: .2, to: 1, min: .2 }, { axis: "y", from: 0, to: -1, min: 0 }], xRange: [-1.2, .9], flankMin: .2, mat: "BODY3", centreMat: "BODYL" },
  head: { kind: "spots", k: 14, density: .5, radius: .43, mat: "BODY3" },
  legs: { kind: "spots", k: 14, density: .5, radius: .43, mat: "BODY3" },
};
// One staged white ramp shared by pale mammals; no production palette mutation.
const COOL_WHITE = { hue: .59, sat: .025, over: { BODY3: [113, 126, 143], BODY2: [168, 181, 196], BODY: [225, 231, 237], BODYL: [243, 246, 249], BELLY: [239, 243, 247] } };
export const ROSTER_PRESETS = {
  jaguar: {
    reason: "Retain the real melanistic jaguar: black-brown coat with sheened ghost rosettes and a readable muzzle.",
    patch: { palette: { hue: .075, sat: .2, val: .25, belly: [ .08, .18, .38 ], over: { BODY3: [27, 23, 21], BODY2: [43, 37, 33], BODYL: [90, 79, 67] } }, head: { muzzle: true }, coat: { belly: true } },
    text: "A stocky black-brown jaguar with ghost rosettes, a broad head and a thick tail.",
  },
  polarbear: {
    reason: "Cool white fur and blue-grey coat shadows; keep the existing long neck and small head.",
    patch: { palette: { over: { BODY3: [129, 138, 145], BODY2: [185, 190, 192], BODY: [244, 241, 233], BODYL: [250, 248, 242], BELLY: [244, 241, 233] } } },
    text: "A white bear with a long neck, narrow head and broad paws.",
  },
  unicorn: {
    reason: "White coat with cool shadows; retain its existing horn and legend features.",
    patch: { palette: { over: { BODY: [235, 238, 242], BODYL: [248, 249, 251] } } },
    text: "A white woodland unicorn with a spiralling horn.",
  },
  beetle: {
    reason: "Ordinary stag-beetle wing cases and jaws are dark natural materials; reserve ember fissures for the elder.",
    reference: "https://www.nhm.ac.uk/discover/stag-beetles.html",
    ordinaryOnly: true,
    modelCommit: "fd1a833ae69e1d5cf1d9353b89fbdda39cbab802",
    patch: {
      palette: { hue: .04, sat: .45, val: .36, over: { SHELL: [155, 81, 46], THORAX: [38, 27, 23], HEAD: [32, 23, 20], BODY3: [64, 35, 23] } },
      look: { embers: false, materials: { wingCases: "SHELL", thorax: "THORAX", head: "HEAD" }, mandibles: { length: .8, width: 1.3, curve: .28, teeth: 2, awayTipLift: .16 } },
    },
    ordinaryLevels: { 0: { palette: { over: { SHELL: [185, 102, 60] } }, look: { mandibles: { length: .65, width: 1.1, curve: .3, teeth: 1, awayTipLift: .16 } } }, 1: { look: { mandibles: { length: .75, width: 1.1, curve: .22, teeth: 1, awayTipLift: .16 } } } },
    // Explicit coordinator-approved exception to unchanged elder paint (6513867872).
    legendPatch: { palette: { over: { SHELL: [143, 69, 36], THORAX: null, HEAD: null, BODY3: null, BODY: [88, 53, 35] } }, look: { materials: { wingCases: "SHELL" } } },
    text: "A dark beetle with brown wing cases and antler-like jaws; its elder carries the fire.",
  },
  bear: {
    reason: "A black bear has no grizzly shoulder hump; retain its dark coat and bear body.",
    reference: "https://www.nps.gov/articles/bear-identification.htm",
    patch: { body: { humpK: 0, front: 1 }, head: { face: "dark", muzzle: true, jawCoat: false }, palette: { hue: .075, sat: .22, val: .28, over: { BODYL: [100, 85, 74], BODY2: [85, 70, 60], BELLY: [151, 119, 87] } } },
    legendPatch: { head: { face: "dark", muzzle: true, jawCoat: false } },
    ordinaryLevels: { 0: { body: { humpK: 0, front: 1 } }, 1: { body: { humpK: 0, front: 1 } }, 2: { body: { humpK: 0, front: 1 } } },
    text: "A dark forest bear with a straight back, prominent ears and a pale muzzle.",
  },
  arcticfox: {
    reason: "Short ears and a compact winter body distinguish this fox naturally; reduce the blue cast.",
    reference: "https://www.adfg.alaska.gov/index.cfm?adfg=arcticfox.main",
    patch: { palette: { ...COOL_WHITE, over: { ...COOL_WHITE.over, BODY3: [90, 105, 126], BODY2: [145, 157, 174], BELLY: [245, 241, 230] } }, parts: { ears: { kind: "round", size: .65 } } },
    ordinaryLevels: { 0: { parts: { ears: { kind: "round", size: .65 } } }, 1: { parts: { ears: { kind: "round", size: .65 } } }, 2: { parts: { ears: { kind: "round", size: .65 } } } },
    text: "A compact white winter fox with short rounded ears and a dense brush tail.",
  },
  snowleopard: {
    reason: "Replace generic spots with broken rosettes while keeping its existing long thick ringed tail.",
    reference: "https://zoo.sandiegozoo.org/animals/snow-leopard",
    ordinaryOnly: true,
    modelCommit: "84976b88a3ed48cf83ab3bebc981a17952464945",
    legendInheritsBase: true,
    legendPatch: { coat: { regions: { ...ROSTER_SNOW_REGIONS, torso: { ...ROSTER_SNOW_REGIONS.torso, outerPx: 14 } } } },
    // Iteration 4: native rings and the same grey/markings grown into its elder.
    patch: { palette: { hue: .59, sat: .03 }, coat: { spots: false, rosettes: false, regions: ROSTER_SNOW_REGIONS } },
    ordinaryLevels: { 0: { coat: { spots: false, rosettes: false, regions: { torso: { kind: "none" }, head: { kind: "none" }, legs: { kind: "none" } } } }, 1: { coat: { spots: false, rosettes: false, regions: { ...ROSTER_SNOW_REGIONS, torso: { ...ROSTER_SNOW_REGIONS.torso, outerPx: 7, density: .7 }, head: { kind: "spots", k: 12, density: .65, radius: .48, mat: "BODY3" }, legs: { kind: "spots", k: 12, density: .65, radius: .46, mat: "BODY3" } } } }, 2: { coat: { spots: false, rosettes: false, regions: ROSTER_SNOW_REGIONS } } },
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
      const elder = merge(restore, original);
      if (preset.legendInheritsBase) elder.coat = merge(merge(genome.coat || {}, original.coat || {}), preset.patch.coat || {});
      // Old production ignored level palettes. Its snow-leopard record carries
      // an unused level-3 .9/.07 palette; do not let that overwrite the actual
      // original base palette while restoring the selected review elder.
      if (preset.ordinaryOnly) elder.palette = expectedRosterLegendPalette(genome);
      return merge(elder, { ...preset.legendPatch, palette: elder.palette });
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

/** Exact declared elder palette: original unless an explicit review target says otherwise. */
export function expectedRosterLegendPalette(genome) {
  const preset = ROSTER_PRESETS[genome.id], base = preset?.legendInheritsBase ? merge(genome.palette, preset.patch.palette || {}) : genome.palette;
  return merge({ ...base, over: base.over || null }, preset?.legendPatch?.palette || {});
}
