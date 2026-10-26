// The crags (the north-east's island of mountains and glaciers, phase 3): an area type as a recipe (art/recipes.js says what each
// field is). Lichened rock and glacier ice, scree, rock spires standing over it, wind-bent larch with snow on them and gnarled wild
// olives in the lee of the rocks, hardy scrub (broom, juniper, heather) among the stones (Ed, 2026-10-12: "even crags should have
// shrubs and maybe olive trees"), a heap of glacier rubble with a slab on top; the ibex its creature.
export const CRAGS = {
  slot: 26, id: "crags", name: "Crags", creature: "ibex", by: "recipe", leaf: .3, floor: ["lichen", .3, .22, .44], snow: .45,
  text: { floor: "lichen, scree and glacier ice", wall: "rock walls", small: "scree, broom and juniper scrub", big: "rock spires, wind-bent larch and juniper krummholz", set: "a heap of glacier rubble with a slab on top" },
  wall: [["rockwall", {}]], small: [["stones", {}], ["shrub", { flower: [250, 210, 50], spiky: true }], ["shrub", { spiky: true }]],
  big: [["spire", { sparse: .14 }], ["spire", { sparse: .08, twin: true }], ["boulder", { big: true }], ["tree", { type: "larch", variant: "windbent", scale: .75 }], ["tree", { type: "juniper", minor: true, scale: .95, gnarl: 1 }]],
  steep: true, pathKinds: ["footpath"],
  setPiece: ["heap", "a heap of glacier rubble with a slab on top", 1, { of: "stones", moss: 0, top: "slab", colour: { stone: [.74, .14, .62], dark: [.72, .16, .34], lichen: [.74, .08, .84] } }],
  layout: {
    pattern: "lone", density: .25, clump: .5, glades: { count: 1, size: [18, 26] },
    heightMix: { sapling: .3, mature: .6, tall: .1, giant: 0 }, undergrowth: .5, lean: { dir: .8, amount: .25 },
    terrain: ["rocky", "ridges"], decor: { rate: .3, ruins: .05, rocks: .75, freak: .05, lake: .1, modern: .05 },
    feel: "High, bare and bright: lichened rock and fingers of glacier ice, rock spires standing over the scree, larch bent by the wind and old wild olives in the lee of the rocks, broom and juniper scrub and heather among the stones.",
  },
  flora: { species: [["larch", .45], ["juniper", .35], ["pine", .2]] /* (juniper for the olive: the olive is a badlands tree, India 2026-10-23, biome forests) */, palette: { sat: .7, val: .85 } },
  settings: { treeDensity: .3, groundCover: { density: .5, kinds: ["heather", "moss", "blades"] } },
};
