// The bamboo jungle (the journey's west: unknown-11's island, the jungle biome): an area type as a recipe (art/recipes.js says what
// each field is). Dense groves of bamboo under tall kapoks, a heap of old temple rubble in the clearing, the tiger its creature.
export const BAMBOO_JUNGLE = {
  slot: 19, id: "bamboo-jungle", name: "Bamboo jungle", creature: "tiger", by: "recipe", leaf: .26, floor: ["leaves", .11, .55, .32],
  text: { floor: "bamboo leaf litter", wall: "walls of bamboo", small: "ferns and long grass", big: "bamboo groves under kapok", set: "a heap of mossed temple rubble" },
  wall: [["fern", {}], ["shrub", {}]], small: [["fern", {}], ["grass", { h: 1.6 }]],
  big: [["tree", { type: "bamboo", scale: 1 }], ["tree", { type: "kapok", minor: true, scale: 1.25 }]],
  pathKinds: ["footpath"],
  setPiece: ["heap", "a heap of mossed temple rubble", 1, { of: "rubble", top: "slab", moss: .5 }],
  layout: {
    pattern: "thicket", density: .65, clump: .85, glades: { count: 2, size: [10, 16] },
    heightMix: { sapling: .15, mature: .675, tall: .125, giant: .05 }, undergrowth: .75, lean: { dir: 0, amount: .05 },
    terrain: ["paths", "hollows"], decor: { rate: .2, ruins: .5, rocks: .25, freak: .15, lake: 0, modern: .1 },
    feel: "Tall bamboo in dense groves, its stems knocking in the wind, a few kapoks standing far above it; striped light and shadow, close and watchful.",
  },
  flora: { species: [["bamboo", .55], ["kapok", .25], ["strangler", .2]], palette: { sat: 1, val: .95 } },
  settings: { treeDensity: .7, groundCover: { density: .8, kinds: ["blades", "fern"] } },
};
