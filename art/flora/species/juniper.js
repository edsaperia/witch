// the badlands' juniper (Ed, 2026-10-12: "trees are good, we should try and put them into areas"; olives and junipers on crags):
// low, wind-twisted, its trunk silvered and split in two, lumpy blue-green crowns of scale leaves, no moss in the dry
export const PLANT_JUNIPER = { name: "juniper", form: "tree", generator: "blob", grow: "small", crown: { envelope: "sphere", clumps: "lumpy tufts on twisted limbs" },
  params: { w: 170, wPad: 40, h: 110, trunk: { w: 9, len: .62, taper: .55, bend: 1.8, lean: .3, stems: 2, fan: .7 }, levels: [{ n: [3, 4], at: [.45, .95], len: [.32, .48], angle: [.8, 1.25], up: .15, tips: true }],
    crown: { blobs: [7, 10], r: [11, 15], flat: .55, stamp: "needle", stampSize: 2, back: .35, backDark: .45 } },
  low: { moss: .15, boughs: .25, skirt: .5 }, colour: { hue: .1, sat: .55, val: .75, trunk: [.08, .12, .62] } };
