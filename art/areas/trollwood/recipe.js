// The trollwood (the frozen north's magical island, phase 4): an area type as a recipe (art/recipes.js says what each field is).
// A frozen forest of weeping birch and pine in stands, an iced stream winding through, snow-capped boulders among the trees that
// might be sleeping trolls, frosted bracken; the frost troll its creature. (Kept apart from the snowfield's open snow and lone
// junipers and the icefall's bare glacier: a forest, frozen.)
export const TROLLWOOD = {
  slot: 29, id: "trollwood", name: "Trollwood", creature: "frosttroll", by: "recipe", leaf: .32, floor: ["snow", .6, .08, .78], snow: .9,
  text: { floor: "frozen snow and needles", wall: "an iced stream's edge", small: "frosted bracken and stones", big: "frozen weeping birch and pine, snow-capped boulders", set: "a troll bridge over an iced stream" },
  wall: [["stones", {}]], small: [["fern", {}], ["stones", {}]],
  big: [["tree", { type: "weepingBirch", variant: "ancient", scale: 1.05 }], ["tree", { type: "pine", minor: true, scale: .95 }], ["boulder", { big: true, sparse: .18 }]],
  pathKinds: ["footpath"],
  setPiece: ["heap", "a troll bridge over an iced stream", 1, { of: "stones", moss: .3, top: "slab" }],
  layout: {
    pattern: "stands", density: .55, clump: .7, glades: { count: 1, size: [16, 24] },
    heightMix: { sapling: .2, mature: .5, tall: .25, giant: .05 }, undergrowth: .45, lean: { dir: 0, amount: 0 },
    terrain: ["stream", "mounds"], decor: { rate: .25, ruins: .15, rocks: .7, freak: .1, lake: 0, modern: .05 },
    feel: "A frozen forest, hushed: weeping birch hung with frost and dark pines in stands, an iced stream winding through, snow-capped boulders among the trees that might be sleeping trolls.",
  },
  flora: { species: [["weepingBirch", .5], ["pine", .3], ["birch", .2]], palette: { sat: .6, val: .8 } },
  settings: { treeDensity: .55, groundCover: { density: .5, kinds: ["fern", "moss", "blades"] } },
};
