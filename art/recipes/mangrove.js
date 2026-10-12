// The mangrove swamp (Ed's later islands, phase 3): the crocodile's. A drowned forest of mangroves on their stilt roots over
// brown tidal water and mud, a few date palms on the higher ground; the crocodile lurks at the water's edge.
export const MANGROVE = {
  id: "mangrove", name: "Mangrove swamp", creature: "crocodile", by: "recipe", leaf: .3, floor: ["mud", .1, .45, .28],
  text: { floor: "tidal mud and brackish pools", wall: "brown channels", small: "reeds and mangrove seedlings", big: "mangroves on stilt roots, a few date palms", set: "a dugout sunk among the roots" },
  wall: [["water", { w: 2 }], ["reeds", { tall: true }]], small: [["reeds", {}], ["grass", { h: 1.3 }]],
  big: [["tree", { type: "mangrove", scale: 1.1 }], ["tree", { type: "datePalm", minor: true, scale: .95 }]],
  ponds: true, wet: true, pathKinds: ["boardwalk"],
  setPiece: ["punt", "a dugout sunk among the mangrove roots", 1, { seed: 3 }],
  layout: {
    pattern: "stands", density: .5, clump: .7, glades: { count: 2, size: [14, 20] },
    heightMix: { sapling: .2, mature: .5, tall: .25, giant: .05 }, undergrowth: .6, lean: { dir: 0, amount: .1 },
    terrain: ["pools", "hollows"], decor: { rate: .2, ruins: .2, rocks: .05, freak: .15, lake: .6, modern: .05 },
    feel: "Brown tidal channels threading between mangroves on their stilt roots, mud banks and still pools; warm, close and watchful, something long lying at the water's edge.",
  },
  flora: { species: [["mangrove", .75], ["datePalm", .25]], palette: { sat: .9, val: .85 } },
  settings: { treeDensity: .55, groundCover: { density: .7, kinds: ["reeds", "blades"] } },
};
