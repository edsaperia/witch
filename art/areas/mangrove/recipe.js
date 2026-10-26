// The mangrove swamp (Ed's later islands, phase 3): the crocodile's. A drowned forest of mangroves on their stilt roots over
// brown tidal water and mud, coconut palms on the higher ground, nipa palms in the creeks; the crocodile lurks at the water's edge.
export const MANGROVE = {
  slot: 14, id: "mangrove", name: "Mangrove swamp", creature: "crocodile", by: "recipe", leaf: .3, floor: ["mud", .1, .45, .28],
  text: { floor: "tidal mud and brackish pools", wall: "brown channels", small: "reeds and mangrove seedlings", big: "mangroves on stilt roots, coconut palms leaning out, nipa palms in the creeks", set: "a dugout sunk among the roots" },
  wall: [["water", { w: 2 }], ["reeds", { tall: true }]], small: [["reeds", {}], ["grass", { h: 1.3 }]],
  big: [["tree", { type: "mangrove", variant: "ancient", scale: 1.1 }], ["tree", { type: "coconut", minor: true, scale: .95 }]],
  ponds: true, wet: true, pathKinds: ["boardwalk"],
  setPiece: ["punt", "a dugout sunk among the mangrove roots", 1, { seed: 3 }],
  layout: {
    pattern: "stands", density: .5, clump: .7, glades: { count: 2, size: [14, 20] },
    heightMix: { sapling: .2, mature: .65, tall: .125, giant: .025 }, undergrowth: .6, lean: { dir: 0, amount: .1 },
    terrain: ["pools", "hollows"], decor: { rate: .2, ruins: .15, rocks: .05, freak: .15, lake: .6, modern: .05 },
    feel: "Brown tidal channels threading between mangroves on their stilt roots, mud banks and still pools; warm, close and watchful, something long lying at the water's edge.",
  },
  flora: { species: [["mangrove", .55], ["coconut", .2], ["nipa", .15], ["strangler", .1]] /* (the flora check's new trees: Ed's OK of the mock, 2026-10-26: coconut and nipa palms by the water) */, palette: { sat: .9, val: .85 } },
  settings: { treeDensity: .55, groundCover: { density: .7, kinds: ["reeds", "blades"] } },
};
