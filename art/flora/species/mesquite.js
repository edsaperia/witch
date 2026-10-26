// the badlands' scrub tree (the flora check, Ed's OK of the mock, 2026-10-26): honey mesquite, low, several dark crooked stems, a wide
// airy drooping crown of fine leaves
export const PLANT_MESQUITE = { name: "mesquite", form: "tree", generator: "blob", grow: "wide", crown: { envelope: "umbrella", clumps: "airy drooping fine leaf" },
  params: { w: 250, h: 135, trunk: { w: 9, len: .32, taper: .55, bend: 2, lean: .6, stems: 3, fan: 1.2 }, levels: [{ n: [3, 4], at: [.5, 1], len: [.45, .6], angle: [.8, 1.25], up: .02, bend: 2, w: .5 }, { n: [2, 3], at: [.4, 1], len: [.3, .45], angle: [.5, .9], up: -.05 }],
    crown: { blobs: [11, 14], r: [10, 13], flat: .3, stamp: "needle", stampSize: 2, back: .25, holes: .35, lift: -2 } },
  low: { sprigs: .5, boughs: .3 }, colour: { hue: .01, sat: .7, val: .72, trunk: [.05, .3, .22] } };
