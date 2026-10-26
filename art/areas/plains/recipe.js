// The plains (a journey kind: unknown-24's, the hot south): open short grass running to the horizon, the odd whistling thorn and
// termite mounds to look out from, the cheetah its creature (the lion's savanna is the taller grass under acacias and baobabs).
export const PLAINS = {
  slot: 5, id: "plains", name: "Plains", creature: "cheetah", by: "recipe", leaf: .19, floor: ["grass", .15, .45, .58],
  text: { floor: "short gold-green grass", wall: "a line of whistling thorn", small: "grass tufts and small termite mounds", big: "small whistling thorns, scattered and in twos and threes", set: "a cluster of tall termite mounds" },
  wall: [["shrub", { spiky: true }]], small: [["grass", { h: .6 }], ["mound", { brown: true, small: true }]],
  big: [["tree", { type: "acacia", variant: "stunted", scale: .6 }], ["tree", { type: "acacia", minor: true, scale: .45 }]],
  pathKinds: ["track"],
  setPiece: ["heap", "a cluster of tall termite mounds", 1, { of: "termite", height: 5, width: 8, rock: "laterite" }],
  layout: {
    pattern: "lone", density: .14, clump: .25, glades: { count: 1, size: [40, 60] },
    heightMix: { sapling: .3, mature: .65, tall: .05, giant: 0 }, undergrowth: .4, lean: { dir: 0, amount: 0 },
    terrain: ["mounds"], decor: { rate: .1, ruins: 0, rocks: .6, freak: .15, lake: .25, modern: 0 },
    feel: "Open grass to the horizon with hardly a tree, room to run; termite mounds standing like lookouts, a lone thorn here and there; bright, wide and fast.",
  },
  flora: { species: [["acacia", .65], ["baobab", .25], ["acacia", .1, { variant: "windbent" }]] /* (the flora check: Ed, 2026-10-25, ring 4: no date palm out on the grass) */, palette: { sat: .85, val: 1 } },
  settings: { treeDensity: .14, groundCover: { density: .7, kinds: ["blades"] } },
};
