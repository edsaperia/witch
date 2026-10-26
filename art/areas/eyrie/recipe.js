// The eyrie (a journey kind: unknown-18's, mountains and glaciers; Ed approved the mock, 2026-10-13): bare high peaks of warm scree, cedars and pines bent
// flat by the wind, and a griffin's great nest, the griffin its creature.
export const EYRIE = {
  slot: 9, id: "eyrie", name: "Eyrie", creature: "griffin", by: "recipe", leaf: .3, floor: ["scree", .09, .2, .55],
  text: { floor: "warm scree and thin grass", wall: "rock ledges", small: "stones, feathers and thin grass", big: "cedars and pines bent flat by the wind", set: "a griffin's great nest of branches" },
  wall: [["rockwall", {}]], small: [["grass", { h: .7 }], ["stones", {}]],
  big: [["tree", { type: "cedar", scale: .85 }], ["tree", { type: "pine", minor: true, scale: .7 }]],
  steep: true, pathKinds: ["animal", "dirt"],
  setPiece: ["heap", "a griffin's great nest of branches", 1.4, { of: "brush", top: "none", height: 2, width: 5.4 }],
  layout: {
    pattern: "lone", density: .22, clump: .35, glades: { count: 1, size: [24, 34] },
    heightMix: { sapling: .2, mature: .7, tall: .1, giant: 0 }, undergrowth: .4, lean: { dir: 1.6, amount: .7 },
    terrain: ["ridges", "rocky"], decor: { rate: .25, ruins: .2, rocks: .6, freak: .1, lake: .1, modern: 0 },
    feel: "High bare peaks in hard light and wind, cedars and pines all leaning one way, feathers caught in the scree; a great nest on the highest ledge.",
  },
  flora: { species: [["cedar", .6], ["pine", .3], ["larch", .1]], palette: { sat: .75, val: .9 } },
  settings: { treeDensity: .22, groundCover: { density: .4, kinds: ["blades"] } },
};
