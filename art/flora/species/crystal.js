export const PLANT_CRYSTAL = { name: "crystal-leaf tree", form: "tree", generator: "blob", grow: "narrow", fantasy: true, crown: { envelope: "sphere", clumps: "faceted crystal blobs, glints" },
  params: { w: 140, h: 150, trunk: { w: 8, len: .5, taper: .5, bend: 1.3, mat: "BARKD", limbMat: "BARKD" }, levels: [{ n: [3, 4], at: [.5, 1], len: [.45, .6], angle: [.45, .8], up: .3, shape: "sphere" }, { n: [2, 2], at: [.5, 1], len: [.4, .55], angle: [.35, .6], up: .2 }],
    crown: { blobs: [5, 7], r: [12, 16], flat: .95, stamp: "crystal", stampSize: 3.5, packing: 1.5, back: .35, backDark: .4, stampShade: .5, holes: .1, glints: { mat: "GLINT", share: .012, on: ["LEAF2"] } } },
  low: { moss: .3, sprigs: .4 }, colour: { hueAbs: .5, sat: 1.25, val: 1.05, glint: [230, 255, 255] } };
