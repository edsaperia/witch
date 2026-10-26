// The mangrove heronry (the heronry, #119, the second area type written as a recipe, art/recipes.js, till the roster moved the heron to
// the mangrove swamp: Ed, 2026-10-23/25). A ring 3 area, so semi-temperate: the herons' still mere, its nests now in tall mangroves
// from the swamp's list (art/flora/biomes.js) and drowned larches (the bald cypress's stand-in), with the old elms and ashes, a third;
// a softer, muddier ground; the heron its creature (art builder 2's heron builder, #181).
export const MANGROVE_HERONRY = {
  slot: 1, id: "mangrove-heronry", name: "Mangrove heronry", creature: "heron", by: "recipe", leaf: .28, floor: ["mud", .2, .35, .32],
  text: { floor: "mud and reed litter", wall: "the mere's edge", small: "reeds and rushes", big: "tall mangroves and elms with herons' nests", set: "an old jetty out over the mere" },
  wall: [["water", { w: 1.8 }], ["reeds", { tall: true }]], small: [["reeds", {}], ["grass", { h: 1.5 }]],
  big: [["tree", { type: "mangrove", variant: "tall", scale: 1.3 }], ["tree", { type: "elm", minor: true, scale: 1.2 }]],
  ponds: true, wet: true, pathKinds: ["boardwalk"],
  setPiece: ["jetty", "an old jetty out over the mere", 1],
  layout: {
    pattern: "stands", density: .45, clump: .75, glades: { count: 1, size: [18, 26] },
    heightMix: { sapling: .1, mature: .35, tall: .35, giant: .2 }, undergrowth: .5, lean: { dir: 0, amount: 0 },
    terrain: ["pools"], decor: { rate: .2, ruins: .2, rocks: .1, freak: .1, lake: .5, modern: .1 },
    feel: "A wide still mere ringed with reeds, tall mangroves and old elms standing round it in stands, their crowns heaped with herons' nests; open, grey-green and watchful.",
  },
  flora: { species: [["mangrove", .45, { variant: "tall" }], ["larch", .2, { variant: "drowned" }], ["elm", .2], ["ash", .15]], palette: { sat: .85, val: .9 } },
  settings: { treeDensity: .5, groundCover: { density: .7, kinds: ["reeds", "blades"] } },
};
