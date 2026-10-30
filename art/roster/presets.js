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
const JAGUAR_REGIONS = {
  tail: { kind: "spots", k: 14, density: .65, radius: .4, mat: "BODY3" },
  torso: { kind: "rosettes", outerPx: 7, density: .6, inner: .23, outer: .43, sizeVariation: .28, closedFraction: .65, gapRange: [0, .45], filledFraction: .08, centreDotRadius: .4, centreDotMat: "BODY3", mat: "BODY3", xRange: [-1.2, .9], densityFalloff: [{ axis: "y", from: 0, to: -1, min: .15 }, { axis: "x", from: .1, to: 1, min: .45 }] },
  head: { kind: "spots", k: 12, density: .45, radius: .4, mat: "BODY3" },
  legs: { kind: "spots", k: 12, density: .5, radius: .4, mat: "BODY3" },
};
export const ROSTER_PRESETS = {
  mole: {
    reason: "A deeper velvet barrel, projecting snout and broad forward digging paws using the existing mole parts.",
    modelCommit: "e4b77ac10557c73b19828efe7c0b98e99b6123d7",
    patch: { look: { mole: { bodyDepth: 1.65, bodyLength: 1.7, snoutProjection: 1.8, forepawSpread: 1.55, forepawSize: 1.65 } }, palette: { hue: .64, sat: .06, val: .38, over: { BODY: [65, 66, 69], BODY2: [47, 49, 53], BODYL: [89, 92, 96], SKIN: [228, 166, 157], NOSE: [220, 145, 139] } } },
    text: "A velvet-grey mole with a pointed snout and broad spade-like digging paws.",
  },
  meerkat: {
    reason: "Keep the existing sentinel idle and strengthen natural dark eye patches and back bands.",
    patch: { head: { eyeK: 1.2, eyePatchPx: 2 }, look: { sentinel: { belly: { mat: "BELLY", extent: { along: [0, .8], width: .6, depth: 1 } }, tailTip: { length: .25, mat: "BODY3" } } }, palette: { over: { BODY3: [28, 23, 20], BODY2: [126, 102, 74], BELLY: [241, 229, 202] } } },
    modelCommit: "e4b77ac10557c73b19828efe7c0b98e99b6123d7",
    legendPatch: { head: { eyePatchPx: 2 }, look: { sentinel: { belly: { mat: "BELLY", extent: { along: [0, .8], width: .6, depth: 1 } }, tailTip: { length: .25, mat: "BODY3" } } } },
    ordinaryLevels: { 0: { head: { eyeK: 1.25 }, coat: { regions: { tail: { tip: { length: .25, mat: "BODY3" } } } } }, 1: { head: { eyeK: 1.25 }, coat: { regions: { tail: { tip: { length: .25, mat: "BODY3" } } } } }, 2: { coat: { regions: { tail: { tip: { length: .25, mat: "BODY3" } } } } } },
    text: "A sandy meerkat with dark eye patches, back bands and an upright lookout pose.",
  },
  flyingsquirrel: {
    reason: "Make the existing ground-level patagium read as a folded membrane on a grey-brown squirrel.",
    patch: { palette: { hue: .07, sat: .16, val: .46, over: { BELLY: [246, 244, 237] } } },
    modelCommit: "e4b77ac10557c73b19828efe7c0b98e99b6123d7",
    ordinaryLevels: { 0: { head: { eyeK: 1.7 }, features: [{ kind: "patagium", spread: .55 }] }, 1: { head: { eyeK: 1.7 }, features: [{ kind: "patagium", spread: .6 }] }, 2: { head: { eyeK: 1.7 }, features: [{ kind: "patagium", spread: .9, groundSkirt: .65, mat: "BODYL", rim: "BELLY" }] } },
    legendPatch: { features: [{ kind: "patagium", spread: 1.25, groundSkirt: .65, mat: "BODYL", rim: "MAGIC2", stars: true }, { kind: "moss", count: 6, size: .09 }] },
    text: "A grey-brown flying squirrel with a pale belly and a folded skin membrane along its flanks.",
  },
  marten: {
    reason: "A localized cream throat bib and dark legs on the existing brown pine-marten body.",
    ordinaryOnly: true,
    modelCommit: "10c8c9bd910c917c52001e07eb688c73ebd3417e",
    patch: { coat: { belly: false, bib: { mat: "BELLY", extent: { along: [-.8, .95], width: 1, depth: 1.5 } }, legMat: "BODY3" }, palette: { over: { BELLY: [239, 219, 174], BODY3: [45, 31, 25] } } },
    legendPatch: { coat: { bib: null } },
    text: "A brown pine marten with a cream throat bib, rounded ears and a bushy tail.",
  },
  raccoon: {
    reason: "Strengthen the existing eye mask and tail rings against neutral grizzled-grey fur.",
    patch: { palette: { hue: .6, sat: .025, val: .56, over: { BODY: [142, 145, 148], BODY2: [96, 99, 102], BODY3: [28, 27, 29], BODYL: [180, 181, 183], BELLY: [241, 240, 233] } } },
    modelCommit: "629e4c45d72e14508541d6ae780f50931b7d7c80",
    ordinaryLevels: { 0: { palette: { over: { BODY3: [10, 10, 12], BELLY: [253, 252, 246], BODY: [165, 167, 169] } } }, 1: { palette: { over: { BODY3: [10, 10, 12], BELLY: [253, 252, 246], BODY: [165, 167, 169] } }, coat: { regions: { tail: { kind: "rings", count: 4, width: .5, mat: "BODY3", tip: { length: .15, mat: "BODY3" } } } } }, 2: { coat: { regions: { tail: { kind: "rings", count: 4, width: .5, mat: "BODY3", tip: { length: .15, mat: "BODY3" } } } } } },
    text: "A grizzled-grey raccoon with a black eye mask, pale muzzle and ringed tail.",
  },
  badger: {
    reason: "Make the existing badger face stripes and black legs read against silver-grey fur.",
    patch: { head: { blaze: 1 }, palette: { hue: .61, sat: .035, val: .55, over: { BODY: [140, 142, 145], BODY2: [25, 26, 28], BODY3: [18, 18, 19], BELLY: [245, 244, 238], BODYL: [180, 183, 186] } } },
    ordinaryLevels: { 2: { head: { blaze: .85 } } },
    legendPatch: { head: { blaze: .6 } },
    text: "A low silver-grey badger with a striped white face, dark legs and a short tail.",
  },
  stoat: {
    reason: "Chestnut back, cream underside and the existing black-tipped stoat tail.",
    omitLegendFeatures: ["darken"],
    modelCommit: "629e4c45d72e14508541d6ae780f50931b7d7c80",
    ordinaryLevels: { 0: { coat: { regions: { tail: { tip: { length: .25, mat: "BODY3" } } } } }, 1: { coat: { regions: { tail: { tip: { length: .25, mat: "BODY3" } } } } }, 2: { coat: { regions: { tail: { tip: { length: .25, mat: "BODY3" } } } } } },
    patch: { head: { muzzle: true, jawCoat: false }, palette: { hue: .065, sat: .4, val: .78, belly: [.11, .12, .98], over: { BODY3: [36, 27, 23], BODYL: [222, 170, 120], BELLY: [250, 242, 222] } } },
    legendPatch: { head: { muzzle: true, jawCoat: false } },
    text: "A long chestnut stoat with a cream underside and a black-tipped tail.",
  },
  otter: {
    reason: "Chocolate coat and pale chin distinguish its existing low body and broad tapering tail naturally.",
    patch: { palette: { hue: .065, sat: .4, val: .35, belly: [.10, .18, .72], over: { BELLY: [180, 162, 135], BODYL: [123, 96, 75] } } },
    text: "A low chocolate-brown otter with a pale chin and a thick tapering tail.",
  },
  jaguar: {
    reason: "Retain the real melanistic jaguar: black-brown coat with sheened ghost rosettes and a readable muzzle.",
    ordinaryOnly: true,
    modelCommit: "629e4c45d72e14508541d6ae780f50931b7d7c80",
    legendInheritsBase: true,
    legendPatch: { coat: { regions: { ...JAGUAR_REGIONS, torso: { ...JAGUAR_REGIONS.torso, outerPx: 14 } } } },
    patch: { palette: { hue: .075, sat: .2, val: .29, belly: [ .08, .18, .46 ], over: { BODY3: [27, 23, 21], BODY2: [75, 65, 54], BODYL: [116, 101, 84] } }, head: { face: "dark", muzzle: true, jawCoat: false }, coat: { belly: true, rosettes: false, regions: JAGUAR_REGIONS } },
    ordinaryLevels: { 0: { coat: { rosettes: false, regions: { ...JAGUAR_REGIONS, torso: { ...JAGUAR_REGIONS.torso, outerPx: 4 } } } }, 1: { coat: { rosettes: false } }, 2: { coat: { rosettes: false } } },
    text: "A stocky black-brown jaguar with ghost rosettes, a broad head and a thick tail.",
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
      const selectedElder = merge(elder, { ...preset.legendPatch, palette: elder.palette });
      if (preset.omitLegendFeatures) selectedElder.features = (selectedElder.features || []).filter(f => !preset.omitLegendFeatures.includes(f.kind));
      return selectedElder;
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
