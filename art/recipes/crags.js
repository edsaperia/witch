// The crags (the north-east's island of mountains and glaciers, phase 3): an area type as a recipe (art/recipes.js says what each
// field is). Lichened rock and glacier ice, scree, rock spires standing over it, a few wind-bent larch with snow on them, a heap of
// glacier rubble with a cairn on top; the ibex its creature.
export const CRAGS = {
  id: "crags", name: "Crags", creature: "ibex", by: "recipe", leaf: .3, floor: ["lichen", .3, .22, .44], snow: .45,
  text: { floor: "lichen, scree and glacier ice", wall: "rock walls", small: "scree and stones", big: "rock spires and wind-bent larch", set: "a heap of glacier rubble with a cairn on top" },
  wall: [["rockwall", {}]], small: [["stones", {}]],
  big: [["spire", { sparse: .14 }], ["spire", { sparse: .08, twin: true }], ["boulder", { big: true }], ["tree", { type: "larch", minor: true, scale: .75 }]],
  steep: true, pathKinds: ["footpath"],
  setPiece: ["heap", "a heap of glacier rubble with a cairn on top", 1, { of: "stones", moss: 0, top: "slab" }],
  layout: {
    pattern: "scatter", density: .25, clump: .5, glades: { count: 1, size: [18, 26] },
    heightMix: { sapling: .3, mature: .5, tall: .2, giant: 0 }, undergrowth: .3, lean: { dir: .8, amount: .25 },
    terrain: ["rocky", "ridges"], decor: { rate: .3, ruins: .05, rocks: .75, freak: .05, lake: .1, modern: .05 },
    feel: "High, bare and bright: lichened rock and fingers of glacier ice, rock spires standing over the scree, a few larch bent by the wind.",
  },
  flora: { species: [["larch", .6], ["pine", .4]], palette: { sat: .7, val: .85 } },
  settings: { treeDensity: .25, groundCover: { density: .4, kinds: ["moss", "pebbles"] } },
};
