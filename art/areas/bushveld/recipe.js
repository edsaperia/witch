// The bushveld (a journey kind: unknown-23's, phase 4, the hot south-south-east; the rhino's): dense thorn scrub on red earth,
// thorn trees in clumps round open patches, a mud wallow the rhinos have worn. Unlike the lion's open savanna and the cheetah's
// plains, it is close and thorny: you come on a rhino before you see it.
export const BUSHVELD = {
  slot: 15, id: "bushveld", name: "Bushveld", creature: "rhino", by: "recipe", leaf: .22, floor: ["sand", .05, .5, .45],
  text: { floor: "red earth and trampled dry grass", wall: "walls of thorn scrub", small: "thorn bushes and dry grass clumps", big: "old baobabs over clumps of umbrella acacias and thorn", set: "a ring of old boma posts round a cold hearth" },
  wall: [["bush", {}]], small: [["bush", { small: true }], ["grass", { h: 1.2 }]],
  big: [["tree", { type: "baobab", variant: "ancient", scale: 1.25 }], ["tree", { type: "acacia", minor: true, scale: 1.1 }]],
  ponds: true, pathKinds: ["track"],
  setPiece: ["ring", "a ring of old boma posts round a cold hearth", 1, { seed: 5, member: "post", centre: "fire", embers: 0 }],
  layout: {
    pattern: "rings", density: .55, clump: .75, glades: { count: 3, size: [14, 22] },
    heightMix: { sapling: .3, mature: .55, tall: .15, giant: 0 }, undergrowth: .75, lean: { dir: 0, amount: .05 },
    terrain: ["mounds", "hollows"], decor: { rate: .2, ruins: .15, rocks: .45, freak: .1, lake: .2, modern: .1 },
    feel: "Close, thorny bush on red earth, clumps of thorn trees round small open patches and a churned mud wallow; hot, dusty, and something heavy breathing just out of sight.",
  },
  flora: { species: [["baobab", .4], ["acacia", .45], ["acacia", .15, { variant: "stunted" }]] /* (the flora check: Ed, 2026-10-25, ring 5: baobab for the field maple) */, palette: { sat: .75, val: .85 } },
  settings: { treeDensity: .5, groundCover: { density: .7, kinds: ["blades", "grass"] } },
};
