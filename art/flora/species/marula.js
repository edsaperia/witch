// the bushveld's big fruit tree (the flora check, Ed's OK of the mock, 2026-10-26): marula, a stout pale grey trunk, a few heavy limbs,
// a broad rounded crown
export const PLANT_MARULA = { name: "marula", form: "tree", generator: "blob", grow: "wide", crown: { envelope: "dome", clumps: "rounded heads of leaf" },
  params: { w: 230, wPad: 30, h: 170, trunk: { w: 14, len: .5, taper: .6, bend: .6, lean: .1, roots: .6 }, levels: [{ n: [3, 4], at: [.75, 1], len: [.35, .5], angle: [.6, 1.1], up: .2, bend: .9, w: .55 }, { n: [2, 3], at: [.5, 1], len: [.3, .4], angle: [.4, .8], up: .2 }],
    crown: { blobs: [8, 10], r: [16, 22], flat: .6, lift: 2, stamp: "leaf", stampSize: 3, back: .35, holes: .1 } },
  low: { sprigs: .3 }, colour: { hue: .04, sat: .8, val: .9, trunk: [.08, .12, .62] } };
