// The mistwood (Ed, 2026-10-12: a new animal for a later island, unknown-12's, the cold rainforest at bearing 295): old-growth
// spruce and cedar dripping with moss, tree ferns in the understorey, nurse logs sprouting saplings; the flying squirrel its creature,
// gliding from trunk to trunk. Ed's columns as for the 30.
export const MISTWOOD = {
  slot: 28, id: "mistwood", name: "Mistwood", creature: "flyingsquirrel", by: "recipe", leaf: .31, floor: ["moss", .3, .45, .26],
  text: { floor: "deep wet moss", wall: "fallen nurse logs", small: "sword ferns and fungi", big: "giant spruce and cedar, tree ferns beneath", set: "a nurse log, a fallen giant with young spruce growing out of its back" },
  wall: [["log", { rot: true }], ["fern", {}]], small: [["fern", {}], ["fungi", {}]],
  big: [["tree", { type: "fir", variant: "mossy", scale: 1.35 }], ["tree", { type: "cedar", minor: true, scale: 1.2 }], ["tree", { type: "palm", minor: true, scale: .8 }]],
  wet: true, pathKinds: ["boardwalk"],
  setPiece: ["nurse-log", "a nurse log, a fallen giant with young spruce growing out of its back", .95],
  layout: {
    pattern: "groves", density: .7, clump: .4, glades: { count: 1, size: [10, 14] },
    heightMix: { sapling: .1, mature: .6, tall: .2, giant: .1 }, undergrowth: .95, lean: { dir: 0, amount: 0 },
    terrain: ["hollows"], decor: { rate: .2, ruins: .1, rocks: .2, freak: .2, lake: .4, modern: .1 },
    feel: "Dim and dripping: giant mossy spruce and cedar trunks rising out of sight, tree ferns and sword ferns beneath, nurse logs green with saplings, mist between the trunks.",
  },
  flora: { species: [["fir", .45], ["cedar", .25], ["alder", .2], ["yew", .1]], palette: { sat: .75, val: .75 } },
  settings: { treeDensity: .75, groundCover: { density: .95, kinds: ["moss", "fern"] } },
};
