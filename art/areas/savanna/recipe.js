// The savanna (a journey kind: unknown-08's, the hot south; Ed approved the mock, 2026-10-12): tall gold grass under flat-topped acacias and the odd baobab, a kopje of
// sun-warmed boulders, the lion its creature.
export const SAVANNA = {
  slot: 4, id: "savanna", name: "Savanna", creature: "lion", by: "recipe", leaf: .15, floor: ["tallgrass", .11, .55, .58],
  text: { floor: "tall gold grass", wall: "thorn scrub", small: "grass tussocks and thorn scrub", big: "flat-topped acacias, a few baobabs", set: "a kopje of sun-warmed boulders" },
  wall: [["shrub", { spiky: true }]], small: [["grass", { h: 1.4 }], ["shrub", { spiky: true }]],
  big: [["tree", { type: "acacia", scale: 1.1 }], ["tree", { type: "baobab", minor: true, scale: 1.2 }]],
  pathKinds: ["track"],
  setPiece: ["heap", "a kopje of sun-warmed boulders", 1.3, { of: "stones", top: "none", moss: -1, rock: "sandstone" }],
  layout: {
    pattern: "groves", density: .2, clump: .3, glades: { count: 2, size: [24, 36] },
    heightMix: { sapling: .15, mature: .7, tall: .125, giant: .025 }, undergrowth: .6, lean: { dir: 0, amount: 0 },
    terrain: ["mounds", "rocky"], decor: { rate: .2, ruins: .1, rocks: .6, freak: .1, lake: .2, modern: 0 },
    feel: "Wide gold grass to the horizon, flat-topped acacias standing apart, a baobab or two and a kopje of warm boulders to watch from; lazy, hot and proud.",
  },
  flora: { species: [["acacia", .6], ["baobab", .25], ["acacia", .15, { variant: "stunted" }]] /* (the flora check: Ed, 2026-10-25, ring 4: no date palm out on the grass) */, palette: { sat: .8, val: .95 } },
  settings: { treeDensity: .25, groundCover: { density: .9, kinds: ["blades"] } },
};
