// The temple jungle (the journey's west: unknown-28's island, the jungle biome): an area type as a recipe (art/recipes.js says what
// each field is). Strangler figs and kapoks over red earth and old stones, a mud wallow, temple steps in the clearing, the elephant
// its creature.
export const TEMPLE_JUNGLE = {
  id: "temple-jungle", name: "Temple jungle", creature: "elephant", by: "recipe", leaf: .28, floor: ["earth", .05, .5, .32],
  text: { floor: "red earth and roots", wall: "tumbled temple walls", small: "ferns and fallen stones", big: "strangler figs and kapok", set: "temple steps flanked by stone elephants" },
  wall: [["stones", {}], ["fern", {}]], small: [["fern", {}], ["stones", {}]],
  big: [["tree", { type: "strangler", scale: 1.3 }], ["tree", { type: "kapok", minor: true, scale: 1.3 }]],
  ponds: true, wet: true, pathKinds: ["footpath"],
  setPiece: ["temple-steps", "temple steps flanked by stone elephants", 1.4],
  layout: {
    pattern: "stands", density: .45, clump: .6, glades: { count: 2, size: [16, 24] },
    heightMix: { sapling: .1, mature: .35, tall: .35, giant: .2 }, undergrowth: .6, lean: { dir: 0, amount: 0 },
    terrain: ["pools"], decor: { rate: .35, ruins: .8, rocks: .2, freak: .1, lake: .3, modern: 0 },
    feel: "Huge strangler figs and kapoks standing apart over red earth, their roots swallowing tumbled temple stones; mud wallows in the open, wide and slow.",
  },
  flora: { species: [["strangler", .45], ["kapok", .3], ["datePalm", .15], ["bamboo", .1]], palette: { sat: .95, val: .9 } },
  settings: { treeDensity: .5, groundCover: { density: .7, kinds: ["blades", "fern"] } },
};
