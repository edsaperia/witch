// The frost cave (a journey kind: unknown-17's, mountains and glaciers; mock for Ed): blue glacier ice, frozen falls and the mouth of
// an ice cave, stunted wind-killed pines and crystal-leaf trees, the frost wyrm its creature.
export const FROSTCAVE = {
  id: "frostcave", name: "Frost cave", creature: "frostwyrm", by: "recipe", leaf: .45, floor: ["ice", .6, .45, .85],
  text: { floor: "blue glacier ice, swept clean", wall: "frozen falls", small: "ice blocks and frosted stones", big: "stunted pines and crystal-leaf trees", set: "a ring of ice spires where the falls froze" },
  wall: [["waterfall", {}], ["rockwall", {}]], small: [["stones", {}], ["mound", { small: true }]],
  big: [["tree", { type: "pine", scale: .5 }], ["tree", { type: "crystal", minor: true, scale: .8 }]],
  steep: true,
  setPiece: ["ring", "a ring of ice spires where the falls froze", 1.2, { member: "stone", centre: "stone", fallen: 1, height: 2, rock: "ice" }],
  layout: {
    pattern: "groves", density: .25, clump: .7, glades: { count: 2, size: [16, 24] },
    heightMix: { sapling: .4, mature: .5, tall: .1, giant: 0 }, undergrowth: .3, lean: { dir: .8, amount: .35 },
    terrain: ["ridges", "rocky"], decor: { rate: .25, ruins: .1, rocks: .6, freak: .2, lake: .3, modern: 0 },
    feel: "Blue ice underfoot and frozen falls hanging off the rock, a cave mouth breathing cold; a few twisted pines and crystal trees, silent and glittering.",
  },
  flora: { species: [["pine", .7], ["crystal", .3]], palette: { sat: .55, val: .85 } },
  settings: { treeDensity: .25, groundCover: { density: .3, kinds: ["blades"] } },
};
