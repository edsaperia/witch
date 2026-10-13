// the crags' wild olive (an area recipe's, the north-east's mountains): a low gnarled tree, its grey trunk twisted and split into
// two leaning stems, a wide open crown of small silvery grey-green tufts, a few dark olives
export const PLANT_OLIVE = { name: "wild olive", form: "tree", generator: "blob", grow: "small", crown: { envelope: "sphere", clumps: "4-6 small silvery tufts, open" },
  params: { w: 175, h: 100, trunk: { w: 11, len: .4, taper: .55, bend: 2.6, lean: .8, stems: 2, fan: .7, mat: "BARK2" }, levels: [{ n: [3, 4], at: [.55, 1], len: [.5, .7], angle: [.75, 1.2], up: .05, bend: 2.2, shape: "even" }, { n: [2, 3], at: [.45, 1], len: [.35, .5], angle: [.4, .8], bend: 1.8 }],
    crown: { blobs: [4, 6], r: [11, 15], flat: .65, stamp: "leaf", stampSize: 2, tones: [0, .3], back: .3, holes: .16, stampShade: .4, dots: { mat: "FLOWER", share: .02, size: 2 } } },
  low: { moss: .1, sprigs: .3 }, colour: { hue: .06, sat: .42, val: 1.12, trunk: [.1, .1, .58], dot: [58, 52, 72] } };
