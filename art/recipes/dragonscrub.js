// The dragon scrub (the Komodo dragon's area, unknown-04's rocky island; Ed, 2026-10-12: more animals for later islands): a dry,
// rocky savannah, written as a recipe (art/recipes.js says what each field is). Pale dry grass and dust between rock outcrops, flat-
// topped acacias and fan palms standing apart, thorn scrub at their feet, the Komodo dragon its creature.
export const DRAGON_SCRUB = {
  id: "dragon-scrub", name: "Dragon scrub", creature: "komodo", by: "recipe", leaf: .2, floor: ["tallgrass", .12, .42, .5],
  text: { floor: "dry savannah grass and dust", wall: "rock outcrops", small: "thorn scrub and dry grass", big: "flat-topped acacias and fan palms", set: "a great sun-warmed basking rock" },
  wall: [["outcrop", {}], ["boulder", {}]], small: [["shrub", {}], ["grass", { h: 1.4 }]],
  big: [["tree", { type: "acacia", scale: 1.35 }], ["tree", { type: "datePalm", minor: true, scale: .9 }]],
  steep: true, pathKinds: ["animal", "dirt"],
  setPiece: ["heap", "a great sun-warmed basking rock", 1.2, { of: "stones", moss: .02, top: "slab", height: 2.6 }],
  layout: {
    pattern: "scattered", density: .22, clump: .3, glades: { count: 3, size: [16, 24] },
    heightMix: { sapling: .2, mature: .6, tall: .2, giant: 0 }, undergrowth: .45, lean: { dir: .3, amount: .15 },
    terrain: ["rocks", "hollows"], decor: { rate: .3, ruins: .15, rocks: .5, freak: .05, lake: 0, modern: .1 },
    feel: "Hot dry savannah grass between rocky outcrops, flat-topped acacias and fan palms standing well apart, thorn scrub at their feet; open, bright and baking, a big lizard asleep on every warm rock.",
  },
  flora: { species: [["acacia", .65], ["datePalm", .35]], palette: { sat: .75, val: .95 } },
  settings: { treeDensity: .3, groundCover: { density: .7, kinds: ["tallgrass", "blades"] } },
};
