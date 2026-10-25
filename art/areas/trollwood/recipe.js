// The trollwood (the frozen north's magical island, phase 4): an area type as a recipe (art/recipes.js says what each field is).
// A frozen forest of old spruce and larch in stands, an iced stream winding through, snow-capped boulders among the trees that
// might be sleeping trolls, frosted bracken; the frost troll its creature. (Kept apart from the snowfield's open snow and lone
// junipers and the icefall's bare glacier: a forest, frozen.)
export const TROLLWOOD = {
  slot: 29, id: "trollwood", name: "Trollwood", creature: "frosttroll", by: "recipe", leaf: .32, floor: ["snow", .6, .08, .78], snow: .9,
  text: { floor: "frozen snow and needles", wall: "an iced stream's edge", small: "frosted bracken and stones", big: "old frozen spruces and larch, snow-capped boulders", set: "a troll bridge over an iced stream" },
  wall: [["stones", {}]], small: [["fern", {}], ["stones", {}]],
  big: [["tree", { type: "fir", variant: "ancient", scale: 1.05 }], ["tree", { type: "larch", minor: true, scale: .95 }], ["boulder", { big: true, sparse: .18 }]],
  pathKinds: ["footpath"],
  setPiece: ["heap", "a troll bridge over an iced stream", 1, { of: "stones", moss: .3, top: "slab" }],
  layout: {
    pattern: "stands", density: .55, clump: .7, glades: { count: 1, size: [16, 24] },
    heightMix: { sapling: .2, mature: .5, tall: .25, giant: .05 }, undergrowth: .45, lean: { dir: 0, amount: 0 },
    terrain: ["stream", "mounds"], decor: { rate: .25, ruins: .15, rocks: .7, freak: .1, lake: 0, modern: .05 },
    feel: "A frozen forest, hushed: old spruces hung with frost and larches in stands, an iced stream winding through, snow-capped boulders among the trees that might be sleeping trolls.",
  },
  flora: { species: [["fir", .5], ["larch", .3], ["birch", .2]] /* (the flora check: Ed, 2026-10-25, ring 5: spruce and larch for the weeping birch and pine; the birch a boreal one) */, palette: { sat: .6, val: .8 } },
  settings: { treeDensity: .55, groundCover: { density: .5, kinds: ["fern", "moss", "blades"] } },
};
