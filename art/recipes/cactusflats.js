// The cactus flats (Ed, 2026-10-13: more animals for the later islands; unknown-21, the badlands, bearing 125): an area type as a
// recipe (art/recipes.js says what each field is). Pale gravelly sand under saguaros and Joshua trees, prickly pear in clumps, dry
// tussocks; the rattlesnake its creature, sidewinding between the cacti. Distinct from Golf's warren (red sand and hoodoos, junipers)
// and scrub wash.
export const CACTUS_FLATS = {
  id: "cactus-flats", name: "Cactus flats", creature: "rattlesnake", by: "recipe", leaf: .22, floor: ["sand", .09, .3, .66],
  text: { floor: "pale gravelly sand", wall: "low rocky banks", small: "dry tussocks and prickly pear", big: "saguaros and Joshua trees", set: "a heap of pale stones" },
  wall: [["rockwall", {}]], small: [["grass", { h: .9, leafHue: .14, leafSat: .3 }], ["bush", { small: true }]],
  big: [["tree", { type: "saguaro", scale: 1.1 }], ["tree", { type: "joshua", minor: true, scale: 1 }], ["boulder", { sparse: .15 }]],
  pathKinds: ["track"],
  setPiece: ["heap", "a heap of pale stones", 1, { of: "stones", moss: 0 }], // (a generated stand-in: set pieces are switched off for now, Ed 2026-10-13)
  layout: {
    pattern: "scatter", density: .3, clump: .35, glades: { count: 2, size: [16, 26] },
    heightMix: { sapling: .25, mature: .5, tall: .25, giant: 0 }, undergrowth: .35, lean: { dir: 0, amount: 0 },
    terrain: ["rocky", "mounds"], decor: { rate: .25, ruins: .2, rocks: .6, freak: .1, lake: 0, modern: .1 },
    feel: "Pale flats of gravelly sand, saguaros standing alone with their arms raised, Joshua trees and prickly pear between; open, dry and rattling.",
  },
  flora: { species: [["saguaro", .5], ["joshua", .3], ["pricklyPear", .2]], palette: { sat: .7, val: .85 } },
  settings: { treeDensity: .3, groundCover: { density: .35, kinds: ["pebbles", "blades"] } },
};
