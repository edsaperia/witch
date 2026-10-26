// The dragon scrub (the Komodo dragon's area, unknown-04's rocky island; Ed, 2026-10-12: more animals for later islands): a dry,
// rocky savannah, written as a recipe (art/recipes.js says what each field is). Pale dry grass and dust between rock outcrops, flat-
// topped acacias and fan palms standing apart, thorn scrub at their feet, the Komodo dragon its creature.
export const DRAGON_SCRUB = {
  slot: 24, id: "dragon-scrub", name: "Dragon scrub", creature: "komodo", by: "recipe", leaf: .2, floor: ["tallgrass", .12, .42, .5],
  text: { floor: "dry savannah grass and dust", wall: "rock outcrops", small: "thorn scrub and dry grass", big: "fan palms and flat-topped acacias", set: "a great sun-warmed basking rock" },
  wall: [["outcrop", {}], ["boulder", {}]], small: [["shrub", {}], ["grass", { h: 1.4 }]],
  big: [["tree", { type: "datePalm", variant: "burnt", scale: 1 }], ["tree", { type: "acacia", minor: true, scale: 1.35 }]],
  pathKinds: ["animal", "dirt"],
  setPiece: ["heap", "a great sun-warmed basking rock", 1.2, { of: "stones", moss: .02, top: "slab", height: 2.6 }],
  layout: {
    pattern: "lone", density: .22, clump: .3, glades: { count: 3, size: [16, 24] },
    heightMix: { sapling: .2, mature: .7, tall: .1, giant: 0 }, undergrowth: .45, lean: { dir: .3, amount: .15 },
    terrain: ["rocky", "hollows"], decor: { rate: .3, ruins: .15, rocks: .7, freak: .05, lake: 0, modern: .1 },
    feel: "Hot dry savannah grass between rocky outcrops, flat-topped acacias and fan palms standing well apart, thorn scrub at their feet; open, bright and baking, a big lizard asleep on every warm rock.",
  },
  flora: { species: [["datePalm", .5], ["acacia", .35], ["cycad", .15]] /* (cycad for the hawthorn: the volcanic east, India 2026-10-23, biome forests) */, palette: { sat: .75, val: .95 } },
  settings: { treeDensity: .3, groundCover: { density: .7, kinds: ["tallgrass", "blades"] } },
};
