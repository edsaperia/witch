// The drowned wood (a journey kind: unknown-25's, phase 4, the south-west's swamps; the hydra's): a forest of tall bald cypresses drowned
// standing in black water, their roots knuckled up out of it, strangler figs among them, the tops of old walls and pillars breaking the
// surface. Unlike the crocodile's tidal mangrove (brown, tangled, warm), the dragonfly's pools and the crab's mudflat, it is still,
// deep and cold: black water under a high dark canopy, and something with many heads under it.
export const DROWNED_WOOD = {
  slot: 31, id: "drowned-wood", name: "Drowned wood", creature: "hydra", by: "recipe", leaf: .28, floor: ["mud", .3, .25, .17],
  text: { floor: "black water and drowned leaf litter", wall: "deep black channels", small: "reeds, knuckled roots and floating weed", big: "tall bald cypresses drowned standing, old mangroves, strangler figs", set: "the drowned stones of an old wall" },
  wall: [["water", { w: 2.4, dark: true }], ["reeds", { tall: true }]], small: [["reeds", {}], ["grass", { h: .9 }]],
  big: [["tree", { type: "baldCypress", variant: "drowned", scale: 1.25 }], ["tree", { type: "strangler", minor: true, scale: 1 }]],
  ponds: true, wet: true, pathKinds: ["boardwalk"],
  setPiece: ["heap", "the drowned stones of an old wall", 1, { seed: 11, of: "rubble", moss: .5, top: "none" }],
  layout: {
    pattern: "stands", density: .55, clump: .6, glades: { count: 2, size: [16, 24] },
    heightMix: { sapling: .05, mature: .35, tall: .45, giant: .15 }, undergrowth: .4, lean: { dir: 0, amount: .05 },
    terrain: ["pools", "hollows"], decor: { rate: .3, ruins: .6, rocks: .1, freak: .1, lake: .2, modern: 0 },
    feel: "Tall drowned bald cypresses standing in still black water, roots knuckled up out of it, strangler figs among them, the broken tops of old walls and pillars breaking the surface; silent, cold and deep, and the water moving where nothing should be.",
  },
  flora: { species: [["baldCypress", .6], ["mangrove", .2], ["strangler", .2]] /* (the flora check's new trees: Ed's OK of the mock, 2026-10-26: bald cypress drowned standing, the mangrove standing in before it) */, palette: { sat: .6, val: .7 } },
  settings: { treeDensity: .5, groundCover: { density: .5, kinds: ["reeds", "blades"] } },
};
