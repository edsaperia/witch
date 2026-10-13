// The icefall (the north-north-east's island of high glaciers, phase 4): an area type as a recipe (art/recipes.js says what each
// field is). High on a glacier: blue-white ice and old snow, its stones and moraine, cairns and standing stones the herders left,
// stunted pines, rowan and dwarf birch in the lee of the rocks (Ed: trees in every area), a ring of weathered posts round a stone
// where the prayer flags flew; the snow leopard its creature. (Kept apart from the crags' lichen and rock spires: ice and snow,
// no spires.)
export const ICEFALL = {
  id: "icefall", name: "Icefall", creature: "snowleopard", by: "recipe", leaf: .38, floor: ["ice", .56, .12, .8], snow: .8,
  text: { floor: "glacier ice and old snow", wall: "moraine", small: "stones and ice", big: "cairns, standing stones, stunted pines, rowan and dwarf birch", set: "a ring of weathered posts round a stone" },
  wall: [["stones", {}]], small: [["stones", {}]],
  big: [["cairn", { sparse: .12, tall: true }], ["standingstone", { sparse: .12 }], ["boulder", { big: true }], ["tree", { type: "rowan", variant: "stunted", scale: .6 }], ["tree", { type: "pine", minor: true, scale: .6 }], ["tree", { type: "birch", minor: true, scale: .5 }]],
  pathKinds: ["footpath"],
  setPiece: ["ring", "a ring of weathered posts round a stone", 1, { member: "post", centre: "stone", fallen: 1 }],
  layout: {
    pattern: "lone", density: .15, clump: .4, glades: { count: 1, size: [22, 32] },
    heightMix: { sapling: .4, mature: .5, tall: .1, giant: 0 }, undergrowth: .2, lean: { dir: .8, amount: .2 },
    terrain: ["rocky", "hollows"], decor: { rate: .25, ruins: .1, rocks: .7, freak: .05, lake: .1, modern: .05 },
    feel: "High on the ice: blue-white glacier ice and old snow, moraine stones, cairns and leaning standing stones, stunted wind-bent pines, rowan and dwarf birch in the lee of the rocks (Ed: trees in every area); bright, cold and still.",
  },
  flora: { species: [["rowan", .4], ["pine", .4], ["birch", .2]], palette: { sat: .6, val: .78 } },
  settings: { treeDensity: .2, groundCover: { density: .3, kinds: ["moss", "blades"] } },
};
