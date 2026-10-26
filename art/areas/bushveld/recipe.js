// The bushveld (a journey kind: unknown-23's, phase 4, the hot south-south-east; the rhino's): dense thorn scrub on red earth,
// thorn trees in clumps round open patches, a mud wallow the rhinos have worn. Unlike the lion's open savanna and the cheetah's
// plains, it is close and thorny: you come on a rhino before you see it.
export const BUSHVELD = {
  slot: 15, id: "bushveld", name: "Bushveld", creature: "rhino", by: "recipe", leaf: .22, floor: ["sand", .05, .5, .45],
  text: { floor: "red earth and trampled dry grass", wall: "walls of thorn scrub", small: "thorn bushes and dry grass clumps", big: "mopane and marula among umbrella acacias and thorn, the odd old baobab", set: "a ring of old boma posts round a cold hearth" },
  wall: [["bush", {}]], small: [["bush", { small: true }], ["grass", { h: 1.2 }]],
  big: [["tree", { type: "mopane", scale: 1.1 }], ["tree", { type: "acacia", minor: true, scale: 1.1 }]],
  ponds: true, pathKinds: ["track"],
  setPiece: ["ring", "a ring of old boma posts round a cold hearth", 1, { seed: 5, member: "post", centre: "fire", embers: 0 }],
  layout: {
    pattern: "rings", density: .55, clump: .75, glades: { count: 3, size: [14, 22] },
    heightMix: { sapling: .3, mature: .55, tall: .15, giant: 0 }, undergrowth: .75, lean: { dir: 0, amount: .05 },
    terrain: ["mounds", "hollows"], decor: { rate: .2, ruins: .15, rocks: .45, freak: .1, lake: .2, modern: .1 },
    feel: "Close, thorny bush on red earth, clumps of thorn trees round small open patches and a churned mud wallow; hot, dusty, and something heavy breathing just out of sight.",
  },
  flora: { species: [["mopane", .4], ["acacia", .25], ["marula", .2], ["baobab", .15]] /* (the flora check's new trees: Ed's OK of the mock, 2026-10-26: mopane and marula, the odd baobab among the thorn) */, palette: { sat: .75, val: .85 } },
  settings: { treeDensity: .5, groundCover: { density: .7, kinds: ["blades", "grass"] } },
};
