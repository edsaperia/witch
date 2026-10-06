// The fen (#119): the first area type written as a recipe, data alone (art/recipes.js says what each field is). Ed's columns as
// for the 30: open peaty water and sedge under alder and willow carr, the newt its creature.
export const FEN = {
  id: "fen", name: "Fen", creature: "newt", by: "recipe", leaf: .23, floor: ["moss", .2, .5, .32],
  text: { floor: "peat moss and sedge", wall: "black pools", small: "sedge and reeds", big: "aspen and alder carr", set: "a punt sunk among the sedge" },
  wall: [["water", { w: 1.4 }], ["reeds", { tall: true }]], small: [["reeds", {}], ["grass", { h: 1.2 }]],
  big: [["tree", { type: "aspen", scale: .9 }], ["tree", { type: "alder", minor: true, scale: .85, gnarl: .6 }]],
  ponds: true, wet: true, pathKinds: ["stepping"],
  setPiece: ["sunken-boat", "a punt sunk among the sedge", 1],
  layout: {
    pattern: "edgeOnly", density: .45, clump: .6, glades: { count: 2, size: [12, 18] },
    heightMix: { sapling: .3, mature: .55, tall: .15, giant: 0 }, undergrowth: .85, lean: { dir: 0, amount: 0 },
    terrain: ["pools", "hollows"], decor: { rate: .25, ruins: .2, rocks: .1, freak: .1, lake: .5, modern: .1 },
    feel: "Black peaty pools between tussocks of sedge, alder and willow carr round the rim; still, low and full of small lives.",
  },
  flora: { species: [["aspen", .45], ["alder", .35], ["willow", .2]], palette: { sat: .85, val: .9 } },
  settings: { treeDensity: .55, groundCover: { density: .8, kinds: ["moss", "blades"] } },
};
