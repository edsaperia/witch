// The moonpool glade (Ed, 2026-10-13: magical creatures for the last outer islands; the unicorn's, unknown-31, the cold
// rainforest): old cedars, spruces and alders round a still, moonlit pool, a ring of white stones in the clearing; the unicorn its
// creature. Not the Mistwood, the Mossy creek, the Misty terraces or the Mossy dell: pale bark, dark yew and bright water.
export const MOONPOOL = {
  slot: 23, id: "moonpool-glade", name: "Moonpool glade", creature: "unicorn", by: "recipe", leaf: .28, floor: ["grass", .3, .3, .58],
  text: { floor: "short pale grass and moss", wall: "a still pool", small: "ferns and white flowers", big: "old cedars, spruces and alders", set: "a ring of white stones by the pool" },
  wall: [["water", { w: 1.6 }]], small: [["fern", {}], ["flowers", {}]],
  big: [["tree", { type: "cedar", variant: "ancient", scale: 1.1 }], ["tree", { type: "fir", minor: true, scale: 1 }]],
  ponds: true, pathKinds: ["magic"],
  setPiece: ["ring", "a ring of white stones by the pool", 1, { seed: 3 }],
  layout: {
    pattern: "stands", density: .45, clump: .7, glades: { count: 2, size: [16, 24] },
    heightMix: { sapling: .15, mature: .45, tall: .3, giant: .1 }, undergrowth: .45, lean: { dir: 0, amount: 0 },
    terrain: ["pools"], decor: { rate: .2, ruins: .15, rocks: .15, freak: .1, lake: .6, modern: 0 },
    feel: "Old mossy cedars, spruces and alders round a still pool that holds the moon; a ring of white stones in the glade, hushed and bright.",
  },
  flora: { species: [["cedar", .5], ["fir", .3], ["alder", .2]] /* (the flora check: Ed, 2026-10-25, ring 5: cedar, spruce and alder for the birches and yew) */, palette: { sat: .75, val: 1 } },
  settings: { treeDensity: .5, groundCover: { density: .7, kinds: ["blades", "clover"] } },
};
