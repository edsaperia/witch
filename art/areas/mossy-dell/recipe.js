// The mossy dell (Ed, 2026-10-12: "Why don't we make a few more animals": a roe deer, its area for the later islands), the third
// area type written as a recipe (art/recipes.js says what each field is): a damp, mossy hollow under rowan, birch and oak,
// ferny glades where the roe browse at dusk; the roe deer its creature. Its island lies to the north-west (config/kinds.json).
export const DELL = {
  slot: 10, id: "mossy-dell", name: "Mossy dell", creature: "roe", by: "recipe", leaf: .27, floor: ["moss", .27, .45, .36],
  text: { floor: "deep moss and leaf litter", small: "ferns and foxgloves", big: "rowan, birch and yew", set: "an old ring in a glade, where the roe gather at dusk" },
  small: [["fern", {}], ["grass", { h: 1.1 }]],
  big: [["tree", { type: "rowan", variant: "mossy", scale: 1.05 }], ["tree", { type: "birch", minor: true, scale: 1 }]],
  pathKinds: ["animal", "roots"],
  setPiece: ["ring", "an old ring in a glade, where the roe gather at dusk", 1],
  layout: {
    pattern: "groves", density: .55, clump: .7, glades: { count: 3, size: [12, 20] },
    heightMix: { sapling: .2, mature: .65, tall: .125, giant: .025 }, undergrowth: .7, lean: { dir: 0, amount: 0 },
    terrain: ["hollows"], decor: { rate: .2, ruins: .2, rocks: .4, freak: .15, lake: .15, modern: .1 },
    feel: "A damp, mossy hollow under rowan, birch and oak, its glades deep in fern; soft, green and quiet, roe slipping between the trunks.",
  },
  flora: { species: [["rowan", .4], ["birch", .35], ["yew", .25]] /* (yew for the lowland oak: India 2026-10-23, biome forests) */, palette: { sat: .95, val: .95 } },
  settings: { treeDensity: .6, groundCover: { density: .85, kinds: ["moss", "blades"] } },
};
