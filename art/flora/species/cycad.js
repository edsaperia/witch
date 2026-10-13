// the volcano's cycad (Ed, 2026-10-12: "grow a real cycad species", for the stegosaurus's cinder slopes): a short, stout, scaly
// trunk under a stiff rosette of dark fronds, barely drooping, a cone at its heart
export const PLANT_CYCAD = { name: "cycad", form: "palm", generator: "blob", grow: "normal", crown: { envelope: "umbrella", clumps: "fronds" },
  params: { w: 150, wPad: 0, h: 125, trunk: { w: 11, len: .6, taper: .92, bend: .3, lean: .15, scars: 3, roots: .2 }, levels: [], crown: { blobs: [1, 1], r: [1, 1], fronds: { n: [16, 20], len: [44, 56], leaflet: 5, droop: .45, spread: 2.7, fruit: { n: [1, 1], r: 4.5 } } } },
  low: { sprigs: .1 }, colour: { hue: .03, sat: .8, val: .7, trunk: [.07, .3, .34] } };
