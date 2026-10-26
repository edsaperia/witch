// The scrub wash (Ed, 2026-10-12: more animals for the later islands; unknown-06, the badlands, bearing 141): an area type as a
// recipe (art/recipes.js says what each field is). Cracked dry clay along a sandy wash, thorny scrub and stunted thorn trees,
// sun-split stones; the armadillo its creature.
export const SCRUB_WASH = {
  slot: 6, id: "scrub-wash", name: "Scrub wash", creature: "armadillo", by: "recipe", leaf: .24, floor: ["mud", .08, .32, .52],
  text: { floor: "cracked dry clay", wall: "the wash's sandy banks", small: "thorny scrub", big: "stunted junipers, mesquite and sun-split boulders", set: "a ring of sun-split stones round a dry hollow" },
  wall: [["rockwall", {}]], small: [["shrub", { spiky: true, flower: [214, 190, 120] }]],
  big: [["tree", { type: "juniper", variant: "stunted", scale: .75, gnarl: 1, lean: .25 }], ["tree", { type: "mesquite", minor: true, scale: .7, lean: .25 }], ["boulder", { sparse: .2 }], ["snag", { sparse: .15, bleached: true }]],
  setPiece: ["ring", "a ring of sun-split stones round a dry hollow", 1, { member: "stone", height: 1.1, width: .8, stone: [.07, .3, .62] }],
  pathKinds: ["animal", "dirt"],
  layout: {
    pattern: "edgeOnly", density: .35, clump: .55, glades: { count: 2, size: [12, 18] },
    heightMix: { sapling: .3, mature: .6, tall: .1, giant: 0 }, undergrowth: .7, lean: { dir: 0, amount: 0 },
    terrain: ["rocky", "hollows"], decor: { rate: .3, ruins: .3, rocks: .5, freak: .1, lake: 0, modern: .1 },
    feel: "Cracked clay and sand in a dry wash, thorny scrub and stunted thorn trees bent by the heat; dusty, low and prickly.",
  },
  flora: { species: [["juniper", .4], ["mesquite", .3], ["paloVerde", .15], ["pine", .15]] /* (the flora check's new trees: Ed's OK of the mock, 2026-10-26: mesquite in the wash; the pine a pinyon) */, palette: { sat: .6, val: .75 } },
  settings: { treeDensity: .35, groundCover: { density: .5, kinds: ["pebbles", "blades"] } },
};
