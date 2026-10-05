// Plant genomes (stage 8 of issue #79, "Plant species genome schema"): every tree and bush the flora draws, as data. One record per
// species: its form, the generator that grows it and that generator's numbers (params), how it bends the style it's drawn in (style:
// gnarl scaled, raised or set, a default trunk count), the life on its trunk below the crown (low: ivy, moss, epicormic sprigs, low
// boughs, a skirt), its colours (as shifts on the area's leaf colour, and its own bark, upper trunk and berry colours), how it grows
// across the height classes (grow), and a few words on its crown (crown: envelope and clump size, for reading; the generator's params
// are what draw it). The trees in art/trees.js are grown from these records and nothing else, so a new species is a new record.
//
// Generators: broadleaf (a trunk forking `depth` times into limbs, clumps at the tips; most broadleaves), and the bespoke ones that
// predate the records, each reading its own params: broad (the gnarled broadleaf), fir (tiered skirts), willow (arching limbs and a
// curtain of strands), birch (a banded white trunk and airy clumps), palm (a tree fern), flat (flat layered maple), alder (a stem with
// short side branches), pine (a bare trunk and flat needle plates), yew (a fluted squat trunk and a dark dome), holly (a dark cone),
// weepingBirch (a birch hung with curtains) and larch (tufted tiers). Bushes: round, shrub, fern and grass.

export const PLANT_GENOMES = {
  // ---- the original six kinds ----
  broad: { name: "gnarled broadleaf", form: "tree", generator: "broad", grow: "normal", crown: { envelope: "sphere", clumps: [14, 21] },
    params: { w: 220, wPad: 60, h: 140, tw: 12, leanGnarl: .5, fork: .35, splay: [.5, .85], splay3: 1.4, trunk: .36, trunkVar: [.75, 1.15], trunkBend: 1.4, limbSpread: [.55, .95], limb: .22, leader: .7, leaderLen: .18, clumpR: [14, 21], clumpRy: [10, 14], darkBack: .35, extra: .75, extraR: [10, 15], extraRy: [7, 10] },
    low: { ivy: .4, moss: .6, sprigs: .5, boughs: .3 }, colour: {} },
  fir: { name: "spruce", form: "tree", generator: "fir", grow: "narrow", crown: { envelope: "cone", clumps: "tiers" },
    params: { w: 90, h: 160, tw: 6, tw1: 4, tiers: [9, 12], half: [5, 36], droop: [5, 13], reach: .7, crownLine: .82 },
    low: { moss: .3, skirt: 1 }, colour: { hue: .06 } },
  willow: { name: "willow", form: "tree", generator: "willow", grow: "willow", crown: { envelope: "weeping", clumps: [20, 28] },
    params: { w: 200, wPad: 50, h: 130, tw: 13, trunk: .3, limbs: 5, limbSpread: [.55, 1.25], limbLen: [.3, .42], clumpR: [20, 28], clumpRy: [9, 12], strand: [.5, .9] },
    low: { moss: .5, sprigs: .3 }, colour: { hue: -.02, val: 1.05 } },
  birch: { name: "silver birch", form: "tree", generator: "birch", grow: "narrow", crown: { envelope: "column", clumps: [9, 13] },
    params: { w: 110, h: 155, trunk: .85, tw: 5, tw1: 2, branches: 7, branchAt: [.35, .9], branchSpread: [.5, 1], branchLen: [.12, .2], clumpR: [9, 13], clumpRy: [7, 10], crownLine: .55 },
    low: { sprigs: .3, boughs: .2 }, colour: { hue: -.02, val: 1.08 } },
  palm: { name: "tree fern", form: "fern", generator: "palm", grow: "normal", species: false, // only one of the original TREE_TYPES kinds
    crown: { envelope: "umbrella", clumps: "fronds" },
    params: { w: 150, h: 140, top: .3, bend: 14, fronds: [9, 12], frondLen: [36, 50], leaflet: 6 },
    low: {}, colour: {} },
  flat: { name: "field maple", form: "tree", generator: "flat", grow: "normal", crown: { envelope: "umbrella", clumps: "layers" },
    params: { w: 220, wPad: 50, h: 120, tw: 10, trunk: .4, limbSpread: [.7, 1.15], limbLen: [.3, .42], layers: [2, 3], layerW: 95, layerShrink: 12 },
    low: { ivy: .3, sprigs: .4, boughs: .3 }, colour: { hue: .01 } },
  // ---- the UK species ----
  oak: { name: "oak", form: "tree", generator: "broadleaf", grow: "wide", style: { gnarl: { min: .8 } }, crown: { envelope: "sphere", clumps: [10, 15] },
    params: { trunk: .26, tw: 15, limbs: 3, spreadA: 1.05, limb: .26, depth: 3, wide: 1.15, clumpR: [10, 15], flat: .75, extra: .9, dome: 5, bend: 1.4, tex: { grain: 1.6, holes: .12, flecks: .18 } },
    low: { ivy: .5, moss: .5, sprigs: .9, boughs: .4 }, colour: { hue: .01, val: .92 } },
  beech: { name: "beech", form: "tree", generator: "broadleaf", grow: "normal", style: { gnarl: { mul: .4 } }, crown: { envelope: "sphere", clumps: [15, 21] },
    params: { trunk: .4, tw: 11, limbs: 2, leader: 1.3, spreadA: .6, limb: .22, depth: 3, clumpR: [15, 21], flat: .5, extra: 1, dome: 7, smooth: 1, layers: 3.5, trunkMat: "BARK2", limbMat: "BARK2", tall: 155, tex: { grain: 3.5, holes: 0, flecks: .1 } },
    low: { moss: .3, boughs: .3 }, colour: { hue: -.03, sat: 1.05, val: 1.02, trunk: [.62, .08, .62] } },
  ash: { name: "ash", form: "tree", generator: "broadleaf", grow: "narrow", style: { gnarl: { mul: .6 } }, crown: { envelope: "sphere", clumps: [7, 10] },
    params: { trunk: .4, tw: 9, limbs: 3, spreadA: .45, limb: .26, depth: 3, splay: .6, clumpR: [7, 10], flat: .8, extra: .35, ragged: 1.8, tall: 160, wide: .8, darkBack: .1, tex: { grain: 1.2, holes: .3, flecks: .26 } },
    low: { ivy: .6, sprigs: .3, boughs: .2 }, colour: { hue: -.04, sat: .85, val: 1.12 } },
  lime: { name: "lime", form: "tree", generator: "broadleaf", grow: "narrow", style: { gnarl: { mul: .4 } }, crown: { envelope: "column", clumps: [9, 12] },
    params: { trunk: .38, tw: 11, limbs: 2, spreadA: .55, limb: .24, depth: 3, leader: 1.1, clumpR: [9, 12], flat: .85, extra: 1, dome: 5, tall: 170, wide: .75, darkBack: .15, tex: { grain: 1.4, holes: .05, flecks: .22 } },
    low: { moss: .3, sprigs: 1 }, colour: { hue: -.05, sat: 1.1, val: 1.12 } },
  sycamore: { name: "sycamore", form: "tree", generator: "broadleaf", grow: "wide", crown: { envelope: "sphere", clumps: [20, 27] },
    params: { trunk: .34, tw: 12, limbs: 2, spreadA: .8, limb: .24, depth: 2, clumpR: [20, 27], flat: .7, extra: .8, dome: 2, darkBack: .5, tex: { grain: 4, holes: .16, flecks: .12 } },
    low: { ivy: .4, moss: .4, boughs: .4 }, colour: { hue: .03, sat: 1.1, val: .72 } },
  chestnut: { name: "horse chestnut", form: "tree", generator: "broadleaf", grow: "wide", crown: { envelope: "sphere", clumps: [22, 30] },
    params: { trunk: .32, tw: 14, limbs: 2, spreadA: .85, limb: .25, depth: 2, clumpR: [22, 30], flat: .78, extra: .9, dome: 3, darkBack: .25, tall: 150, tex: { grain: 6, holes: .04, flecks: .16, dots: .025, dotTall: true } },
    low: { sprigs: .3, boughs: .5 }, colour: { hue: -.01, val: 1.0, dot: [244, 238, 226] } },
  rowan: { name: "rowan", form: "tree", generator: "broadleaf", grow: "small", style: { gnarl: { mul: .7 } }, crown: { envelope: "sphere", clumps: [8, 11] },
    params: { trunk: .45, tw: 7, limbs: 3, spreadA: .55, limb: .2, depth: 2, clumpR: [8, 11], flat: .7, extra: .5, ragged: 1.7, wide: .6, tall: 120, smooth: 1, trunkMat: "BARK2", limbMat: "BARK2", darkBack: .1, tex: { grain: 1.1, holes: .26, flecks: .22, dots: .05 } },
    low: { sprigs: .3, boughs: .3 }, colour: { hue: -.01, val: 1.05, trunk: [.08, .12, .52], dot: [210, 40, 34] } },
  alder: { name: "alder", form: "tree", generator: "alder", grow: "narrow", crown: { envelope: "column", clumps: [7, 14] },
    params: { w: 110, h: 165, trunk: .92, tw: 6, branches: 16, branchAt: [.3, .97], branchLen: .12 },
    low: { moss: .6, sprigs: .4 }, colour: { hue: .04, sat: .9, val: .72 } },
  pine: { name: "Scots pine", form: "tree", generator: "pine", grow: "narrow", crown: { envelope: "umbrella", clumps: [13, 19] },
    params: { w: 150, h: 175, trunk: .78, tw: 8, tw1: 3, pads: 6, padAt: [.55, 1], padLen: [.12, .22], padR: [13, 19], padRy: [4, 6], orange: .55 },
    low: { ivy: .3, moss: .3, boughs: .15 }, colour: { hue: .1, sat: .7, val: .78, upper: [.06, .6, .72] } },
  yew: { name: "yew", form: "tree", generator: "yew", grow: "wide", crown: { envelope: "sphere", clumps: [16, 26] },
    params: { w: 200, wPad: 50, h: 120, trunks: 3, tw: 9, thick: 1.2, trunk: .3, ring: 9, ringR: [16, 22], fill: 7, fillR: [20, 26], topR: 26 },
    low: { moss: .4, skirt: 1 }, colour: { hue: .07, sat: .8, val: .55, upper: [.02, .55, .45] } },
  hawthorn: { name: "hawthorn", form: "tree", generator: "broadleaf", grow: "small", style: { gnarl: { set: 1 } }, crown: { envelope: "sphere", clumps: [7, 10] },
    params: { trunk: .3, tw: 8, limbs: 3, spreadA: .9, limb: .3, depth: 3, fork: .6, bend: 2, lean: .45, clumpR: [7, 10], flat: .65, extra: .8, wide: .7, tall: 90, ragged: 1.4, darkBack: .3, tex: { grain: 1, holes: .1, flecks: .14, dots: .035 } },
    low: { moss: .5, sprigs: .6, boughs: .5 }, colour: { hue: .025, val: .8, dot: [176, 30, 40] } },
  holly: { name: "holly", form: "tree", generator: "holly", grow: "narrow", crown: { envelope: "cone", clumps: [6, 11] },
    params: { w: 110, h: 130, tiers: 10, cone: .72, halfTop: 5, halfBottom: 28, crownLine: .85 },
    low: { skirt: .7 }, colour: { hue: .06, sat: .85, val: .6, trunk: [.1, .08, .55], dot: [214, 28, 36] } },
  hazel: { name: "hazel coppice", form: "shrub", generator: "broadleaf", grow: "small", style: { gnarl: { mul: .5 }, treeTrunks: { default: 6 } }, crown: { envelope: "sphere", clumps: [11, 15] },
    params: { trunk: .5, tw: 9, limbs: 1, spreadA: .5, limb: .18, depth: 1, fan: 1.3, trunkBend: .8, clumpR: [11, 15], flat: .8, extra: 1, wide: .8, tall: 110, noRoots: false, rootK: .4, smooth: 1, trunkMat: "BARK2", limbMat: "BARK2", darkBack: .2, tex: { grain: 3.6, holes: .14, flecks: .2 } },
    low: { moss: .4, sprigs: .8 }, colour: { hue: .0, val: .94, trunk: [.07, .3, .45] } },
  weepingBirch: { name: "weeping birch", form: "tree", generator: "weepingBirch", grow: "narrow", crown: { envelope: "weeping", clumps: [9, 13] },
    params: { curtain: [.25, .5], gaps: .35 },
    low: { sprigs: .3 }, colour: { hue: -.04, val: 1.12 } },
  larch: { name: "larch", form: "tree", generator: "larch", grow: "narrow", crown: { envelope: "cone", clumps: "tufts" },
    params: { w: 100, h: 170, tiers: 14, cone: .68, halfTop: 4, halfBottom: 30, crownLine: .8 },
    low: { skirt: .5, boughs: .2 }, colour: { hue: -.07, sat: .8, val: 1.15 } },
};
// The bushes a kind is picked from (round twice as often), and each kind's numbers.
export const BUSH_KINDS = ["round", "round", "fern", "grass", "shrub"];
export const BUSH_GENOMES = {
  round: { name: "leafy mound", form: "shrub", generator: "mound", params: { w: 40, h: 28, clumps: 3 } },
  shrub: { name: "flowering shrub", form: "shrub", generator: "mound", params: { w: 40, h: 28, clumps: 5, flowering: true } },
  fern: { name: "fern", form: "fern", generator: "fern", params: { w: 40, h: 28, fronds: 7, len: 15 } },
  grass: { name: "grass tuft", form: "grass", generator: "grass", params: { w: 40, h: 28, blades: 18 } },
};
// The style a species draws in: gnarl scaled (mul), raised to at least (min) or set; a default for treeTrunks.
export function genomeStyle(st, style) {
  if (!style) return st;
  const out = { ...st };
  for (const [k, rule] of Object.entries(style)) {
    if (rule.mul !== undefined) out[k] = st[k] * rule.mul;
    else if (rule.min !== undefined) out[k] = Math.max(st[k], rule.min);
    else if (rule.set !== undefined) out[k] = rule.set;
    else if (rule.default !== undefined) out[k] = st[k] || rule.default;
  }
  return out;
}
