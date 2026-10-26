// The step pyramid (Ed, 2026-10-23: the jungle west's fantastic kind, unknown-27's slot, ring 5; "its own stepped-pyramid clearing,
// not the elephant's temple-jungle"): rainforest of kapoks and strangler figs opening into round clearings of mossed paving, a stepped
// pyramid in one of them, its stair between feathered-serpent balustrades; bright birds' feathers caught in the ferns; the feathered
// serpent its creature. Ed's columns as for the 30.
export const STEP_PYRAMID = {
  slot: 33, id: "step-pyramid", name: "Step pyramid", creature: "featheredserpent", by: "recipe", leaf: .31, floor: ["moss", .3, .45, .3],
  text: { floor: "moss over old paving stones", wall: "carved stone walls under creepers", small: "ferns, bromeliads and fallen carved stones", big: "kapoks and strangler figs, buttressed and hung with lianas", set: "a stepped pyramid, its stair between feathered serpents" },
  wall: [["stones", {}], ["fern", {}]], small: [["fern", {}], ["stones", {}], ["shrub", {}]],
  big: [["tree", { type: "kapok", scale: 1.35 }], ["tree", { type: "strangler", minor: true, scale: 1.2 }], ["pillar", { sparse: .08, broken: true, lean: .1 }]],
  ponds: true, wet: true, steep: true, pathKinds: ["stairs", "footpath"],
  setPiece: ["heap", "a heap of carved stones under the figs", 1.2, { of: "rubble", top: "post", moss: .6, rock: "sandstone" }], // (a generated stand-in: set pieces are switched off for now, Ed 2026-10-13; the pyramid is its scene, art/scenes.js step-pyramid)
  layout: {
    pattern: "glades", density: .6, clump: .55, glades: { count: 3, size: [18, 30] },
    heightMix: { sapling: .1, mature: .6, tall: .2, giant: .1 }, undergrowth: .75, lean: { dir: 0, amount: 0 },
    terrain: ["mounds", "pools"], decor: { rate: .3, ruins: .6, rocks: .15, freak: .15, lake: .1, modern: 0 },
    feel: "Tall rainforest, kapoks and figs on great buttresses, broken by round clearings of mossy paving; a stepped pyramid in one, green-gold light, bright feathers in the ferns.",
  },
  flora: { species: [["kapok", .45], ["strangler", .3], ["bamboo", .15], ["vinewood", .1]], palette: { sat: 1, val: .9 } },
  settings: { treeDensity: .55, groundCover: { density: .75, kinds: ["fern", "moss"] } },
};
