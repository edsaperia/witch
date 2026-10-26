// The warren (Ed, 2026-10-12: more animals for the later islands; unknown-05, the badlands, bearing 115): an area type as a recipe
// (art/recipes.js says what each field is). Red sand and pebbles between eroded hoodoos, dry tussocks, a heap of red stones over
// the burrows where the sentinels stand watch; the meerkat its creature.
export const WARREN = {
  slot: 3, id: "warren", name: "Warren", creature: "meerkat", by: "recipe", leaf: .3, floor: ["stony", .05, .45, .52],
  text: { floor: "red sand and pebbles", wall: "low rock ledges", small: "dry tussocks", big: "twisted junipers and mesquite among red rock hoodoos", set: "a heap of red stones over the warren" },
  wall: [["rockwall", {}]], small: [["grass", { h: 1.1, leafHue: .12, leafSat: .35 }]],
  big: [["tree", { type: "juniper", scale: 1.15, lean: .2 }], ["spire", { sparse: .25, rock: [.04, .55, .62], dry: true }], ["spire", { twin: true, sparse: .2, rock: [.05, .5, .66], dry: true }], ["boulder", { sparse: .25 }], ["snag", { sparse: .12, bleached: true }]],
  setPiece: ["heap", "a heap of red stones over the warren", 1, { of: "stones", moss: 0, top: "slab", stone: [.04, .5, .6] }],
  pathKinds: ["animal", "dirt"],
  layout: {
    pattern: "groves", density: .25, clump: .5, glades: { count: 2, size: [14, 22] },
    heightMix: { sapling: .3, mature: .625, tall: .075, giant: 0 }, undergrowth: .4, lean: { dir: 0, amount: 0 },
    terrain: ["rocky", "ridges", "mounds"], decor: { rate: .35, ruins: .2, rocks: .7, freak: 0, lake: 0, modern: .1 },
    feel: "Red sand flats under eroded hoodoos, twisted junipers, dry tussocks, burrow mouths everywhere; hot, open and watched from every rock.",
  },
  flora: { species: [["juniper", .5], ["mesquite", .25], ["paloVerde", .15], ["pine", .1]] /* (the flora check's new trees: Ed's OK of the mock, 2026-10-26: mesquite with the juniper; the pine a pinyon) */, palette: { sat: .6, val: .8 } },
  settings: { treeDensity: .25, groundCover: { density: .4, kinds: ["pebbles", "blades"] } },
};
