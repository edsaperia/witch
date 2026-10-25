// The mudflat (Ed, 2026-10-12: more animals for the later islands; unknown-26, the mangrove swamp, bearing 225): an area type as a
// recipe (art/recipes.js says what each field is). Grey shining mud between the mangroves' roots, crab holes and pebbles, the young
// mangroves' breathing roots poking up through it, an old canoe stranded with crab pots in it; the crab its creature, scuttling sideways.
export const MUDFLAT = {
  slot: 12, id: "mudflat", name: "Mudflat", creature: "crab", by: "recipe", leaf: .25, floor: ["mud", .1, .18, .42],
  text: { floor: "grey shining mud and crab holes", wall: "tide channels", small: "breathing roots and pebbles", big: "mangroves on arching roots", set: "an old canoe stranded on the mud, crab pots in it" },
  wall: [["water", { w: 1.4 }]], small: [["reeds", { h: .5 }], ["grass", { h: .7, leafHue: .22, leafSat: .3 }]],
  big: [["tree", { type: "mangrove", variant: "stunted", scale: .95 }], ["boulder", { sparse: .15 }]],
  wet: true, pathKinds: ["boardwalk"],
  setPiece: ["punt", "an old canoe stranded on the mud, crab pots in it", 1, { state: "broken", cargo: "trap", pole: 1 }],
  layout: {
    pattern: "edgeOnly", treeShare: .9, density: .35, clump: .6, glades: { count: 2, size: [18, 26] },
    heightMix: { sapling: .35, mature: .5, tall: .15, giant: 0 }, undergrowth: .4, lean: { dir: 0, amount: .15 },
    terrain: ["stream", "pools"], decor: { rate: .25, ruins: .1, rocks: .4, freak: .05, lake: .35, modern: .1 },
    feel: "Open shining mud between mangroves standing on their roots, crab holes everywhere, the tide's channels glinting; wide, wet and clicking with crabs.",
  },
  flora: { species: [["mangrove", .7], ["mangrove", .2, { variant: "windbent" }], ["mangrove", .1, { variant: "ancient" }]] /* (the flora check: Ed, 2026-10-25, ring 5: mangroves only, for the date palm and willow) */, palette: { sat: .7, val: .85 } },
  settings: { treeDensity: .35, groundCover: { density: .5, kinds: ["pebbles", "blades"] } },
};
