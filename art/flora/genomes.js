import { FLORA_GENOMES } from "./species/index.js";
// Plant genomes (stage 8 of issue #79, "Plant species genome schema"): every tree and bush the flora draws, as data. One record per
// species: its form, the generator that grows it and that generator's numbers (params), how it bends the style it's drawn in (style:
// gnarl scaled, raised or set, a default trunk count), the life on its trunk below the crown (low: ivy, moss, epicormic sprigs, low
// boughs, a skirt), its colours (as shifts on the area's leaf colour, and its own bark, upper trunk and berry colours), how it grows
// across the height classes (grow), and a few words on its crown (crown: envelope and clump size, for reading; the generator's params
// are what draw it). The trees in art/trees.js are grown from these records and nothing else, so a new species is a new record.
//
// Generators: broadleaf (a trunk forking `depth` times into limbs, clumps at the tips; most broadleaves), and blob (art/flora/blob.js),
// the genome generator, which grows any tree from levels of branches and a crown of lit blobs: at the branch tips, or through an
// envelope (crown.fill: tiers, cone, column, dome), with curtains (a willow's or weeping birch's strands), trunk bands (a birch's),
// an orange upper trunk (a pine's) or frond scars, or fronds instead of blobs (a tree fern). The twelve bespoke generators that
// predated the records (broad, fir, willow, birch, palm, flat, alder, pine, yew, holly, weepingBirch, larch) are grown by it now
// (#119); three of its species are fantasy (fantasy: true).
// Colours: hue shifts the area's leaf hue, hueAbs sets it outright (a violet mushroom anywhere); glow and glint colour the glowing
// parts. Bushes: round, shrub, fern and grass.

export const PLANT_GENOMES = {
  ...FLORA_GENOMES,
};
// The bushes a kind is picked from (round twice as often), and each kind's numbers.
export const BUSH_KINDS = ["round", "round", "fern", "grass", "shrub"];
export const BUSH_GENOMES = { // grown by the blob generator's undergrowth (blobBush in art/flora/blob.js), in the trees' stamps
  round: { name: "leafy mound", form: "shrub", generator: "blob", params: { kind: "mound", w: 40, h: 28, clumps: [2, 3], r: [8, 10.5], spread: 6 } },
  shrub: { name: "flowering shrub", form: "shrub", generator: "blob", params: { kind: "mound", w: 40, h: 28, clumps: [3, 4], r: [7, 9.5], spread: 8, flowering: true, bloom: .08 } },
  fern: { name: "fern", form: "fern", generator: "blob", params: { kind: "fronds", w: 40, h: 28, fronds: 7, len: 17, spread: 1.7, droop: .7, leaflet: 3 } },
  grass: { name: "grass tuft", form: "grass", generator: "blob", params: { kind: "blades", w: 40, h: 28, blades: 18, clumps: 4, spread: 10 } },
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
