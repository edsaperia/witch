// The misty terraces (Ed, 2026-10-12: "a few more animals"; the red panda's area, for an island to the east-north-east, its biome
// the mountains): stepped mossy ledges under fir, rowan and birch, mist in the hollows, a cairn of flat stones; the red panda its
// creature.
export const TERRACES = {
  slot: 13, id: "misty-terraces", name: "Misty terraces", creature: "redpanda", by: "recipe", leaf: .3, floor: ["moss", .25, .4, .4],
  text: { floor: "moss on stepped ledges", small: "ferns and rocks", big: "wild cherry, fir, rowan and birch", set: "a cairn of flat stones on a ledge" },
  small: [["fern", {}], ["grass", { h: 1 }]],
  big: [["tree", { type: "cherry", scale: 1.05 }], ["tree", { type: "fir", minor: true, scale: 1 }], ["tree", { type: "rowan", minor: true, scale: .9 }]],
  steep: true, pathKinds: ["animal"],
  setPiece: ["heap", "a cairn of flat stones on a ledge", 1],
  layout: {
    pattern: "rows", along: "paths", density: .5, clump: .7, glades: { count: 2, size: [12, 18] },
    heightMix: { sapling: .2, mature: .65, tall: .125, giant: .025 }, undergrowth: .6, lean: { dir: 0, amount: .05 },
    terrain: ["hollows"], decor: { rate: .25, ruins: .25, rocks: .45, freak: .1, lake: .15, modern: .05 },
    feel: "Stepped mossy ledges under fir, rowan and birch, mist lying in the hollows; high, cool and green, a red panda curled on a bough.",
  },
  flora: { species: [["cherry", .4], ["fir", .25], ["rowan", .2], ["birch", .15]], palette: { sat: .9, val: .9 } },
  settings: { treeDensity: .55, groundCover: { density: .75, kinds: ["moss", "blades"] } },
};
