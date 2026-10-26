// The river jungle (the journey's west: unknown-29's island, the jungle biome): an area type as a recipe (art/recipes.js says what
// each field is). A dark river under a closed canopy of rainforest giants hung with lianas, glowing vinewood in the gloom, a giant
// fallen across the water, the black jaguar its creature.
export const RIVER_JUNGLE = {
  slot: 21, id: "river-jungle", name: "River jungle", creature: "jaguar", by: "recipe", leaf: .3, floor: ["mud", .1, .4, .22],
  text: { floor: "dark wet loam", wall: "the river's banks", small: "ferns and reeds", big: "rainforest giants hung with lianas", set: "a heap of fallen giants, mossed over" },
  wall: [["water", { w: 1.6 }], ["reeds", { tall: true }]], small: [["fern", {}], ["reeds", {}]],
  big: [["tree", { type: "ironwood", scale: 1.3 }], ["tree", { type: "vinewood", minor: true, scale: 1.1 }]],
  ponds: true, wet: true, pathKinds: ["stepping"],
  setPiece: ["heap", "a heap of fallen giants by the river, mossed over", 1.1, { of: "logs", top: "none", moss: .5 }],
  layout: {
    pattern: "thicket", density: .8, clump: .5, glades: { count: 1, size: [14, 20] },
    heightMix: { sapling: .15, mature: .6, tall: .175, giant: .075 }, undergrowth: .9, lean: { dir: 0, amount: .05 },
    terrain: ["stream", "pools"], decor: { rate: .15, ruins: .2, rocks: .3, freak: .2, lake: .3, modern: 0 },
    feel: "A dark river under a closed canopy of rainforest giants hung with lianas, vinewood glowing in the gloom; still, deep and watched from above.",
  },
  flora: { species: [["ironwood", .55], ["vinewood", .2], ["strangler", .15], ["bamboo", .1]], palette: { sat: .9, val: .75 } },
  settings: { treeDensity: .75, groundCover: { density: .85, kinds: ["moss", "fern"] } },
};
