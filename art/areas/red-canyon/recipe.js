// The red canyon (Ed, 2026-10-13: more animals for the later islands; unknown-22, the badlands, bearing 145): an area type as a recipe
// (art/recipes.js says what each field is). Red rock ledges and scree under palo verde and desert ironwood, ocotillo whips flaring red
// at their tips; the scorpion its creature, out on the rocks under the moon. Distinct from the cactus flats and Golf's warren.
export const RED_CANYON = {
  slot: 18, id: "red-canyon", name: "Red canyon", creature: "scorpion", by: "recipe", leaf: .2, floor: ["scree", .03, .5, .5],
  text: { floor: "red scree and slabs", wall: "red rock ledges", small: "ocotillo and dry grass", big: "palo verde and desert ironwood among the rocks", set: "a heap of red stones" },
  wall: [["rockwall", {}]], small: [["grass", { h: .8, leafHue: .12, leafSat: .3 }], ["bush", { small: true }]],
  big: [["tree", { type: "paloVerde", scale: 1.05 }], ["tree", { type: "desertIronwood", minor: true, scale: 1 }], ["boulder", { sparse: .3 }]],
  steep: true, pathKinds: ["track"],
  setPiece: ["heap", "a heap of red stones", 1, { of: "stones", moss: 0 }], // (a generated stand-in: set pieces are switched off for now, Ed 2026-10-13)
  layout: {
    pattern: "groves", density: .3, clump: .7, glades: { count: 2, size: [14, 22] },
    heightMix: { sapling: .25, mature: .65, tall: .1, giant: 0 }, undergrowth: .45, lean: { dir: 0, amount: .15 },
    terrain: ["rocky", "ridges"], decor: { rate: .35, ruins: .2, rocks: .7, freak: .05, lake: 0, modern: .05 },
    feel: "Red rock ledges and scree, palo verde and desert ironwood in the clefts, ocotillo flaring red; hot stone giving back the day's heat, things clicking in the dark.",
  },
  flora: { species: [["paloVerde", .45], ["desertIronwood", .35], ["ocotillo", .2]] /* (the flora check's new trees: Ed's OK of the mock, 2026-10-26: desert ironwood, at last, for the juniper standing in) */, palette: { sat: .75, val: .85 } },
  settings: { treeDensity: .35, groundCover: { density: .3, kinds: ["pebbles", "blades"] } },
};
