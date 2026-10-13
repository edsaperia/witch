// The savannah (a journey kind: unknown-23's, phase 4, the hot south-south-east; Ed approved the mock, 2026-10-12): the rhino's. Dry gold grass and red earth, flat-topped acacias standing
// far apart, an old thorn boma's ring of posts at its heart.
export const SAVANNAH = {
  id: "savannah", name: "Savannah", creature: "rhino", by: "recipe", leaf: .2, floor: ["sand", .09, .45, .55],
  text: { floor: "red earth and dry gold grass", wall: "thorn scrub", small: "dry grass clumps and thorn bushes", big: "flat-topped acacias, far apart", set: "a ring of old boma posts round a cold hearth" },
  wall: [["bush", { dry: true }]], small: [["grass", { h: 1.4, dry: true }], ["bush", { small: true }]],
  big: [["tree", { type: "flat", scale: 1.6 }], ["tree", { type: "datePalm", minor: true, scale: .9 }]],
  pathKinds: ["track"],
  setPiece: ["ring", "a ring of old boma posts round a cold hearth", 1, { seed: 5, member: "post", centre: "fire", embers: 0 }],
  layout: {
    pattern: "groves", density: .22, clump: .55, glades: { count: 1, size: [24, 34] },
    heightMix: { sapling: .1, mature: .5, tall: .35, giant: .05 }, undergrowth: .35, lean: { dir: 0, amount: 0 },
    terrain: ["rises"], decor: { rate: .2, ruins: .2, rocks: .4, freak: .1, lake: .2, modern: .1 },
    feel: "Wide open gold grassland under a hot sky, flat-topped acacias standing far apart, red earth showing through; still, bright and heavy.",
  },
  flora: { species: [["flat", .7], ["datePalm", .15], ["hawthorn", .15]], palette: { sat: .7, val: .9 } },
  settings: { treeDensity: .25, groundCover: { density: .75, kinds: ["blades", "grass"] } },
};
