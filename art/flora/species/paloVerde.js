// the badlands' red rock canyon (Ed, 2026-10-13: "ocotillo, palo verde or desert ironwood as the trees")
export const PLANT_PALOVERDE = { name: "palo verde", form: "tree", generator: "blob", grow: "wide", crown: { envelope: "umbrella", clumps: "airy small blobs, green bark, yellow flowers" },
  params: { w: 200, h: 120, trunk: { w: 8, len: .3, taper: .6, bend: 1.4, lean: .5, stems: 3, fan: 1, smooth: 1, mat: "BARK2" }, levels: [{ n: [3, 4], at: [.6, 1], len: [.45, .6], angle: [.7, 1.1], up: .1, bend: 1.4 }, { n: [2, 3], at: [.4, 1], len: [.35, .5], angle: [.4, .8], up: .15 }],
    crown: { blobs: [10, 13], r: [7, 10], flat: .35, stamp: "round", stampSize: 1.5, back: .2, holes: .4, dots: { mat: "FLOWER", share: .08, size: 2 } } },
  low: { sprigs: .7, boughs: .2 }, colour: { hue: .03, sat: .75, val: .95, trunk: [.25, .4, .55], dot: [240, 214, 72] } };
