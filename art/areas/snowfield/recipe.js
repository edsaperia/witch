// The snowfield (the north's cold island, phase 3): an area type as a recipe (art/recipes.js says what each field is). Deep snow
// with grass and needles poking through, lone snow-laden firs and dwarf birch, a ring of old stones half buried in a
// drift; the arctic fox its creature.
export const SNOWFIELD = {
  slot: 25, id: "snowfield", name: "Snowfield", creature: "arcticfox", by: "recipe", leaf: .36, floor: ["snow", .58, .06, .86], snow: 1,
  text: { floor: "deep snow, grass and needles poking through", wall: "drifts and frozen stones", small: "snowy tussocks", big: "snow-laden junipers and firs, dwarf birch", set: "a ring of old stones half buried in a drift" },
  wall: [["stones", {}]], small: [["grass", { h: .9 }]],
  big: [["tree", { type: "juniper", variant: "windbent", scale: .9 }], ["tree", { type: "fir", minor: true, scale: .95 }], ["tree", { type: "birch", minor: true, scale: .6 }], ["boulder", { sparse: .1 }]],
  pathKinds: ["footpath"],
  setPiece: ["ring", "a ring of old stones half buried in a drift", 1, { member: "stone", centre: "stone", fallen: 2 }],
  layout: {
    pattern: "lone", density: .3, clump: .6, glades: { count: 2, size: [20, 30] },
    heightMix: { sapling: .25, mature: .625, tall: .125, giant: 0 }, undergrowth: .35, lean: { dir: 0, amount: 0 },
    terrain: ["mounds", "hollows"], decor: { rate: .2, ruins: .1, rocks: .55, freak: .05, lake: .25, modern: .05 },
    feel: "A wide white quiet: deep snow and lone snow-laden firs standing out of it, dwarf birch bent low, old stones showing through the drifts.",
  },
  flora: { species: [["juniper", .45], ["fir", .35], ["birch", .2]], palette: { sat: .6, val: .8 } },
  settings: { treeDensity: .35, groundCover: { density: .45, kinds: ["blades", "moss"] } },
};
