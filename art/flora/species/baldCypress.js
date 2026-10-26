// the drowned wood's tree (the flora check, Ed's OK of the mock, 2026-10-26): bald cypress, a swollen fluted base standing in the water,
// a tall straight bole, a narrow crown flattening with age, feathery russet-green needles
export const PLANT_BALDCYPRESS = { name: "bald cypress", form: "tree", generator: "blob", grow: "narrow", crown: { envelope: "cone", clumps: "feathery tiers, a flat top" },
  params: { w: 120, h: 190, narrow: 1, trunk: { w: 12, len: .9, taper: .22, bend: .4, lean: .05, roots: 2.4 }, levels: [], crown: { blobs: [1, 1], r: [6, 9], fill: { shape: "tiers", tiers: [6, 8], top: 26, bottom: 36, droop: 5, base: .3, per: 1.6 }, crownLine: .75, under: .5, flat: .6, stamp: "needle", stampSize: 2, back: .25, holes: .25, lift: 1 } },
  low: { moss: .6, boughs: .2 }, colour: { hue: .05, sat: .75, val: .82, trunk: [.06, .3, .4] } };
