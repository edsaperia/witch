// The penguin rookery (the penguin's area, unknown-14's cold island; Ed, 2026-10-12: more animals for later islands): a cold, rocky
// shore, written as a recipe (art/recipes.js says what each field is). Snow lying over dark wet shingle, the rocks showing through
// it, tussock grass in the lee of boulders, a few wind-stunted pines and birches bent flat by the gales, and in the clearing the
// rookery's ring of pebble nests, the penguin its creature. (Not the arctic fox's tundra nor the polar bear's pack ice: a shore.)
export const ROOKERY = {
  slot: 22, id: "rookery", name: "Penguin rookery", creature: "penguin", by: "recipe", leaf: .36, floor: ["snow", .58, .06, .86],
  ground: { patches: [{ mat: "STONE", n: 6, r: [4, 9] }] },
  text: { floor: "snow over dark wet shingle", wall: "black sea rocks", small: "tussock grass and pebbles", big: "wind-stunted firs, pines and birches", set: "the rookery's ring of pebble nests" },
  wall: [["boulder", { big: true }], ["stones", { big: true }]], small: [["stones", {}], ["grass", { h: 1.1 }]],
  big: [["tree", { type: "fir", variant: "stunted", scale: .6, gnarl: .8 }], ["tree", { type: "birch", minor: true, scale: .55, gnarl: .7 }]],
  pathKinds: ["animal"],
  setPiece: ["ring", "the rookery's ring of pebble nests", 1, { member: "stone", count: 12, height: 1.1, width: .6, centre: "stone", fallen: 0, gap: 1, lean: .05, embers: 0 }],
  layout: {
    pattern: "rings", density: .2, clump: .7, glades: { count: 3, size: [18, 26] },
    heightMix: { sapling: .5, mature: .5, tall: 0, giant: 0 }, undergrowth: .4, lean: { dir: .8, amount: .6 },
    terrain: ["rocky"], decor: { rate: .3, ruins: .1, rocks: .6, freak: .1, lake: .2, modern: 0 },
    feel: "A cold bright shore: snow drifted over black shingle and sea rocks, tussock grass in the lee of the boulders, a few stunted pines and birches crouched flat by the wind; loud, busy and huddled.",
  },
  flora: { species: [["fir", .5], ["birch", .3], ["pine", .2]], palette: { sat: .6, val: .75 } },
  settings: { treeDensity: .22, groundCover: { density: .5, kinds: ["blades", "pebbles"] } },
};
