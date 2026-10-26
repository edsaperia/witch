// the bushveld's commonest tree (the flora check, Ed's OK of the mock, 2026-10-26): mopane, a straight dark rough trunk, an upright narrow
// crown of butterfly leaves, coppery
export const PLANT_MOPANE = { name: "mopane", form: "tree", generator: "blob", grow: "normal", crown: { envelope: "column", clumps: "upright, butterfly leaves" },
  params: { w: 130, wPad: 20, h: 180, trunk: { w: 8, len: .7, taper: .55, bend: .5, lean: .1, roots: .3 }, levels: [{ n: [4, 5], at: [.5, 1], len: [.3, .42], angle: [.35, .7], up: .35, bend: .6, w: .5 }],
    crown: { blobs: [7, 9], r: [12, 16], flat: .9, lift: 2, stamp: "leaf", stampSize: 3, back: .3, holes: .15 } },
  low: { sprigs: .3 }, colour: { hue: .09, sat: .85, val: .88, trunk: [.05, .35, .28] } };
