// the red canyon's tree (the flora check, Ed's OK of the mock, 2026-10-26): desert ironwood, several dark stems, a dense rounded
// grey-green crown, lavender flowers
export const PLANT_DESERTIRONWOOD = { name: "desert ironwood", form: "tree", generator: "blob", grow: "wide", crown: { envelope: "dome", clumps: "dense small grey-green blobs, lavender flowers" },
  params: { w: 200, h: 140, trunk: { w: 9, len: .3, taper: .6, bend: 1.3, lean: .35, stems: 3, fan: .8 }, levels: [{ n: [3, 4], at: [.6, 1], len: [.4, .55], angle: [.6, 1], up: .15, bend: 1.3 }, { n: [2, 3], at: [.4, 1], len: [.3, .45], angle: [.4, .8], up: .15 }],
    crown: { blobs: [12, 15], r: [10, 13], flat: .55, stamp: "round", stampSize: 1.5, back: .3, holes: .12, dots: { mat: "FLOWER", share: .035, size: 2 } } },
  low: { sprigs: .5, boughs: .2 }, colour: { hue: -.01, sat: .5, val: .75, trunk: [.05, .25, .3], dot: [178, 140, 214] } };
