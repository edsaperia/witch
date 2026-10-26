// The erg (a journey kind: unknown-07's, the hot south; Ed approved the mock, 2026-10-12): golden dunes and an oasis of date palms, the fennec fox its creature.
export const ERG = {
  slot: 2, id: "erg", name: "Erg", creature: "fennec", by: "recipe", leaf: .2, floor: ["sand", .11, .42, .64],
  text: { floor: "rippled dune sand", wall: "the oasis's edge", small: "dry grass tussocks and saltbush", big: "date palms in clumps, wild olives, a few thorn trees and junipers", set: "a ring of wind-worn stones round an old hearth" },
  wall: [["water", { w: 1.2 }], ["reeds", {}]], small: [["grass", { h: .8 }], ["shrub", { spiky: true }]],
  big: [["tree", { type: "datePalm", scale: 1 }], ["tree", { type: "acacia", minor: true, scale: .8 }]],
  ponds: true, pathKinds: ["track"],
  setPiece: ["ring", "a ring of wind-worn stones round an old hearth", 1, { centre: "fire", member: "stone", embers: 1, rock: "sandstone" }],
  layout: {
    pattern: "rings", density: .25, clump: .85, glades: { count: 3, size: [18, 30] },
    heightMix: { sapling: .2, mature: .675, tall: .125, giant: 0 }, undergrowth: .3, lean: { dir: .3, amount: .2 },
    terrain: ["ridges", "mounds"], decor: { rate: .2, ruins: .3, rocks: .4, freak: 0, lake: .3, modern: 0 },
    feel: "Long gold dunes rippled by the wind, date palms and wild olives clumped round a still oasis, wide open sand between; hot, bright and quiet, small ears listening.",
  },
  flora: { species: [["datePalm", .5], ["olive", .2], ["acacia", .2], ["juniper", .1]] /* (the flora check: Ed, 2026-10-25, ring 3: olive and juniper in with the palms, the ring half temperate) */, palette: { sat: .8, val: .95 } },
  settings: { treeDensity: .3, groundCover: { density: .35, kinds: ["blades"] } },
};
