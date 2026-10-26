// The mangrove pools (Ed, 2026-10-12: more animals for the later islands; unknown-10, the mangrove swamp, bearing 243): an area type as
// a recipe (art/recipes.js says what each field is). Dark tea-brown pools between mangroves standing on their arching roots, reeds
// and lilies at the edges, a sagging boardwalk out over the water; the dragonfly its creature, hawking over the pools.
export const MANGROVE_POOLS = {
  slot: 11, id: "mangrove-pools", name: "Mangrove pools", creature: "dragonfly", by: "recipe", leaf: .27, floor: ["mud", .09, .4, .28],
  text: { floor: "black mud and leaf litter", wall: "the pools' edges", small: "reeds and lilies", big: "mangroves on arching roots", set: "a sagging boardwalk out over the pools" },
  wall: [["water", { w: 2 }], ["reeds", { tall: true }]], small: [["reeds", {}], ["grass", { h: 1.3, leafHue: .26 }]],
  big: [["tree", { type: "mangrove", scale: 1.1 }], ["tree", { type: "mangrove", minor: true, scale: .8 }]],
  ponds: true, wet: true, pathKinds: ["boardwalk"],
  setPiece: ["jetty", "a sagging boardwalk out over the pools", 1, { end: "lantern", rail: "one", missing: 2 }],
  layout: {
    pattern: "edgeOnly", density: .5, clump: .7, glades: { count: 2, size: [14, 22] },
    heightMix: { sapling: .2, mature: .55, tall: .25, giant: 0 }, undergrowth: .6, lean: { dir: 0, amount: .1 },
    terrain: ["pools", "hollows"], decor: { rate: .2, ruins: .1, rocks: .1, freak: .1, lake: .65, modern: .05 },
    feel: "Still dark pools between mangroves on their stilts of roots, reeds at the edges, dragonflies hawking low over the water; warm, close and humming.",
  },
  flora: { species: [["mangrove", .65], ["strangler", .2], ["mangrove", .15, { variant: "stunted" }]] /* (the flora check: Ed, 2026-10-25, ring 4: young mangroves for the willow) */, palette: { sat: .85, val: .8 } },
  settings: { treeDensity: .5, groundCover: { density: .7, kinds: ["reeds", "blades"] } },
};
