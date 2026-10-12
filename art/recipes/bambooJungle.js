// The bamboo jungle (the journey's west: unknown-11's island, the jungle biome): an area type as a recipe (art/recipes.js says what
// each field is). Dense groves of bamboo under tall kapoks, a jungle shrine in the clearing, the tiger its creature.
export const BAMBOO_JUNGLE = {
  id: "bamboo-jungle", name: "Bamboo jungle", creature: "tiger", by: "recipe", leaf: .26, floor: ["leaves", .11, .55, .32],
  text: { floor: "bamboo leaf litter", wall: "walls of bamboo", small: "ferns and long grass", big: "bamboo groves under kapok", set: "a jungle shrine with a stone tiger" },
  wall: [["fern", {}], ["shrub", {}]], small: [["fern", {}], ["grass", { h: 1.6 }]],
  big: [["tree", { type: "bamboo", scale: 1 }], ["tree", { type: "kapok", minor: true, scale: 1.25 }]],
  pathKinds: ["footpath"],
  setPiece: ["tiger-shrine", "a jungle shrine with a stone tiger", 1.1],
  layout: {
    pattern: "groves", density: .65, clump: .85, glades: { count: 2, size: [10, 16] },
    heightMix: { sapling: .15, mature: .5, tall: .25, giant: .1 }, undergrowth: .75, lean: { dir: 0, amount: .05 },
    terrain: [], decor: { rate: .2, ruins: .5, rocks: .2, freak: .1, lake: 0, modern: .05 },
    feel: "Tall bamboo in dense groves, its stems knocking in the wind, a few kapoks standing far above it; striped light and shadow, close and watchful.",
  },
  flora: { species: [["bamboo", .55], ["kapok", .25], ["strangler", .2]], palette: { sat: 1, val: .95 } },
  settings: { treeDensity: .7, groundCover: { density: .8, kinds: ["blades", "fern"] } },
};
