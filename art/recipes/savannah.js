// The savannah (Ed's later islands, phase 4, hot): the rhino's. Dry gold grass and red earth, flat-topped acacias standing
// far apart, a ring of sun-baked stones at its heart.
export const SAVANNAH = {
  id: "savannah", name: "Savannah", creature: "rhino", by: "recipe", leaf: .2, floor: ["sand", .09, .45, .55],
  text: { floor: "red earth and dry gold grass", wall: "thorn scrub", small: "dry grass clumps and thorn bushes", big: "flat-topped acacias, far apart", set: "a ring of sun-baked standing stones" },
  wall: [["bush", { dry: true }]], small: [["grass", { h: 1.4, dry: true }], ["bush", { small: true }]],
  big: [["tree", { type: "flat", scale: 1.6 }], ["tree", { type: "datePalm", minor: true, scale: .9 }]],
  pathKinds: ["track"],
  setPiece: ["ring", "a ring of sun-baked standing stones", 1, { seed: 5, member: "stone", centre: "stone", colour: { stone: [.07, .3, .66], dark: [.05, .35, .4] } }],
  layout: {
    pattern: "scatter", density: .22, clump: .3, glades: { count: 1, size: [24, 34] },
    heightMix: { sapling: .1, mature: .5, tall: .35, giant: .05 }, undergrowth: .35, lean: { dir: 0, amount: 0 },
    terrain: ["rises"], decor: { rate: .2, ruins: .2, rocks: .4, freak: .1, lake: .1, modern: .1 },
    feel: "Wide open gold grassland under a hot sky, flat-topped acacias standing far apart, red earth showing through; still, bright and heavy.",
  },
  flora: { species: [["flat", .8], ["datePalm", .2]], palette: { sat: .7, val: .9 } },
  settings: { treeDensity: .25, groundCover: { density: .75, kinds: ["blades", "grass"] } },
};
