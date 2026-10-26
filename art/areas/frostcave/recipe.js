// The frost cave (a journey kind: unknown-17's, mountains and glaciers; Ed approved the mock, 2026-10-13): blue glacier ice, frozen falls and the mouth of
// an ice cave, stunted snowy spruces, junipers and crystal-leaf trees, the frost wyrm its creature.
export const FROSTCAVE = {
  slot: 8, id: "frostcave", name: "Frost cave", creature: "frostwyrm", by: "recipe", leaf: .45, floor: ["ice", .6, .45, .85],
  text: { floor: "blue glacier ice, swept clean", wall: "frozen falls", small: "ice blocks and frosted stones", big: "stunted snowy spruces, junipers and crystal-leaf trees", set: "a ring of ice spires where the falls froze" },
  wall: [["waterfall", {}], ["rockwall", {}]], small: [["stones", {}], ["mound", { small: true }]],
  big: [["tree", { type: "fir", variant: "snowy", scale: .55 }], ["tree", { type: "juniper", minor: true, scale: .5 }], ["tree", { type: "crystal", minor: true, scale: .8 }]],
  steep: true, pathKinds: ["animal"],
  setPiece: ["ring", "a ring of ice spires where the falls froze", 1.2, { member: "stone", centre: "stone", fallen: 1, height: 2, rock: "ice" }],
  layout: {
    pattern: "lone", density: .25, clump: .7, glades: { count: 2, size: [16, 24] },
    heightMix: { sapling: .4, mature: .55, tall: .05, giant: 0 }, undergrowth: .3, lean: { dir: .8, amount: .35 },
    terrain: ["ridges", "rocky"], decor: { rate: .25, ruins: .05, rocks: .55, freak: .15, lake: .25, modern: 0 },
    feel: "Blue ice underfoot and frozen falls hanging off the rock, a cave mouth breathing cold; a few stunted snowy spruces, junipers and crystal trees, silent and glittering.",
  },
  flora: { species: [["fir", .5], ["juniper", .25], ["crystal", .25]] /* (the flora check: Ed, 2026-10-25, ring 5: spruce and juniper for the whitebeam) */, palette: { sat: .6, val: .85 } },
  settings: { treeDensity: .25, groundCover: { density: .3, kinds: ["blades"] } },
};
