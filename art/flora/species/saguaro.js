// the badlands' cactus flats (Ed, 2026-10-13: "saguaro and prickly pear count as the trees, plus mesquite or Joshua trees")
export const PLANT_SAGUARO = { name: "saguaro", form: "tree", generator: "blob", grow: "narrow", crown: { envelope: "column", clumps: "arms, white blossoms on their tips" },
  params: { w: 120, h: 205, narrow: 1, trunk: { w: 22, len: 1, taper: .2, bend: .15, lean: .04, smooth: 1, mat: "BARK2", roots: 0 }, levels: [{ n: [2, 3], at: [.38, .62], len: [.26, .34], angle: [1.2, 1.45], up: .45, bend: .4, w: .7, tips: true }],
    crown: { blobs: [3, 4], r: [3, 4], flat: 1, stamp: "round", stampSize: 1, back: 0, dots: { mat: "FLOWER", share: .35, size: 2 } } },
  low: { sprigs: .5 }, colour: { hue: .06, sat: .7, val: .85, trunk: [.3, .42, .42], dot: [240, 236, 214] } };
