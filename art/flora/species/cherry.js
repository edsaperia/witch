// ---- grown by the genome generator (art/flora/blob.js): levels of branches under a crown of lit blobs of leaf stamps ----
export const PLANT_CHERRY = { name: "wild cherry", form: "tree", generator: "blob", grow: "normal", crown: { envelope: "sphere", clumps: "5-7 blobs, blossom" },
  params: { w: 170, h: 145, trunk: { w: 10, len: .45, taper: .6, bend: .8, smooth: 1, mat: "BARK2" }, levels: [{ n: [3, 4], at: [.55, 1], len: [.45, .6], angle: [.5, .9], up: .25, shape: "sphere" }, { n: [2, 3], at: [.4, 1], len: [.45, .6], angle: [.3, .6], up: .2 }],
    crown: { blobs: [5, 7], r: [14, 19], flat: .75, stamp: "leaf", stampSize: 3, back: .3, holes: .08, dots: { mat: "FLOWER", share: .2, size: 2 } } },
  low: { moss: .3, sprigs: .5, boughs: .2 }, colour: { hue: -.02, sat: .9, val: 1.02, trunk: [.98, .45, .42], dot: [248, 196, 214] } };
