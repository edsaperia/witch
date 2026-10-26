// The mossy creek (Ed, 2026-10-12: more animals for the later islands; unknown-30, the cold rainforest, bearing 305): an area type as
// a recipe (art/recipes.js says what each field is). Tall spruces and cedars dripping with moss over a cold creek, ferns everywhere,
// a mossy logjam where the creek pools and the raccoons wash their food; the raccoon its creature.
export const MOSSY_CREEK = {
  slot: 7, id: "mossy-creek", name: "Mossy creek", creature: "raccoon", by: "recipe", leaf: .33, floor: ["moss", .3, .5, .3],
  text: { floor: "deep moss and wet stones", wall: "the creek", small: "sword ferns", big: "tall mossy cedars and spruces", set: "a mossy logjam where the creek pools" },
  wall: [["water", { w: 1.6 }], ["fern", {}]], small: [["fern", {}]],
  big: [["tree", { type: "cedar", variant: "mossy", scale: 1.3 }], ["tree", { type: "fir", scale: 1.4 }], ["tree", { type: "alder", minor: true, scale: .9 }], ["log", { moss: true, sparse: .12 }]],
  ponds: true, wet: true, pathKinds: ["boardwalk"],
  setPiece: ["heap", "a mossy logjam where the creek pools", 1, { of: "logs", moss: .5 }],
  layout: {
    pattern: "rows", along: "stream", density: .7, clump: .6, glades: { count: 1, size: [12, 18] },
    heightMix: { sapling: .1, mature: .625, tall: .2, giant: .075 }, undergrowth: .9, lean: { dir: 0, amount: 0 },
    terrain: ["stream", "pools", "hollows"], decor: { rate: .2, ruins: .2, rocks: .4, freak: .1, lake: .3, modern: 0 },
    feel: "A cold green gloom under towering mossy spruces and cedars, a creek chattering over stones, ferns waist-deep; dripping, soft and old.",
  },
  flora: { species: [["cedar", .45], ["fir", .35], ["alder", .2]], palette: { sat: .85, val: .8 } },
  settings: { treeDensity: .7, groundCover: { density: .9, kinds: ["moss", "blades"] } },
};
