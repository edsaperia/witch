// The heronry (#119): the second area type written as a recipe (art/recipes.js says what each field is). Ed's columns as for the
// 30: a still mere under tall elms where the herons nest, the heron its creature (art builder 2's heron builder, #181).
export const HERONRY = {
  id: "heronry", name: "Heronry", creature: "heron", by: "recipe", leaf: .27, floor: ["tallgrass", .3, .35, .34],
  text: { floor: "rough grass and reed litter", wall: "the mere's edge", small: "reeds and rushes", big: "tall elms with herons' nests", set: "an old jetty out over the mere" },
  wall: [["water", { w: 1.8 }], ["reeds", { tall: true }]], small: [["reeds", {}], ["grass", { h: 1.5 }]],
  big: [["tree", { type: "elm", scale: 1.2 }], ["tree", { type: "ash", minor: true, scale: 1.05 }]],
  ponds: true, wet: true, pathKinds: ["boardwalk"],
  setPiece: ["jetty", "an old jetty out over the mere", 1],
  layout: {
    pattern: "stands", density: .4, clump: .75, glades: { count: 1, size: [18, 26] },
    heightMix: { sapling: .1, mature: .4, tall: .4, giant: .1 }, undergrowth: .5, lean: { dir: 0, amount: 0 },
    terrain: ["pools"], decor: { rate: .2, ruins: .2, rocks: .1, freak: .1, lake: .5, modern: .1 },
    feel: "A wide still mere ringed with reeds, tall elms standing round it in stands, their crowns heaped with herons' nests; open, grey and watchful.",
  },
  flora: { species: [["elm", .55], ["ash", .3], ["willow", .15]], palette: { sat: .8, val: .9 } },
  settings: { treeDensity: .5, groundCover: { density: .7, kinds: ["reeds", "blades"] } },
};
