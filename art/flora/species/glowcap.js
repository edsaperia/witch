export const PLANT_GLOWCAP = { name: "glowcap", form: "fungus", generator: "blob", grow: "normal", fantasy: true, crown: { envelope: "caps", clumps: "mushroom caps, glowing gills and spots" },
  params: { w: 150, h: 130, trunk: { w: 15, len: .62, taper: .85, bend: .7, smooth: 1, mat: "BARK2", roots: .6 }, levels: [{ n: [2, 3], at: [.3, .65], len: [.32, .42], angle: [.8, 1.1], up: .5, w: .5, tips: true }],
    crown: { blobs: [3, 4], r: [17, 21], topBig: 1.7, flat: .5, stamp: "round", stampSize: 3, back: 0, lift: -2, cap: { gill: "GLOW", depth: .4 }, spreadK: false, dots: { mat: "GLOW", share: .03, size: 2, on: ["LEAF2", "LEAF"] } } },
  low: { moss: .7 }, colour: { hueAbs: .72, sat: 1.1, val: .95, trunk: [.12, .12, .82], glow: [120, 255, 214] } };
