// The cinder slopes (Ed, 2026-10-12: "stegosaurus (good for volcano)", unknown-20's island, the rocky east at bearing 105, made
// volcanic): black basalt and ash with lava glowing in its cracks, tree ferns, cycad-like palms and stunted pines in the
// hollows, a smoking cinder cone; the stegosaurus its creature. Ed's columns as for the 30.
export const CINDER_SLOPES = {
  slot: 30, id: "cinder-slopes", name: "Cinder slopes", creature: "stegosaurus", by: "recipe", leaf: .27, floor: ["basalt", .62, .1, .2],
  text: { floor: "black basalt and ash, lava in its cracks", wall: "basalt boulders", small: "ferns and cinders", big: "cycads, tree ferns and stunted pines", set: "a cinder cone, its crater glowing, lava trickling down its side" },
  wall: [["boulder", {}], ["rockwall", {}]], small: [["fern", {}], ["stones", {}]],
  big: [["tree", { type: "cycad", scale: .9 }], ["tree", { type: "pine", minor: true, scale: .8, gnarl: .8 }], ["tree", { type: "palm", minor: true, scale: .8 }]],
  steep: true, pathKinds: ["stairs"],
  setPiece: ["cinder-cone", "a cinder cone, its crater glowing, lava trickling down its side", 1.3],
  layout: {
    pattern: "stands", density: .3, clump: .8, glades: { count: 2, size: [16, 24] },
    heightMix: { sapling: .3, mature: .5, tall: .2, giant: 0 }, undergrowth: .35, lean: { dir: 0, amount: 0 },
    terrain: ["hollows"], decor: { rate: .3, ruins: .1, rocks: .6, freak: .2, lake: 0, modern: .1 },
    feel: "Black ash slopes cracked with glowing lava, tree ferns and cycad palms gathered in the sheltered hollows, stunted pines on the ridges, a little cinder cone smoking in the clearing.",
  },
  flora: { species: [["cycad", .45], ["pine", .35], ["datePalm", .2]], palette: { sat: .7, val: .8 } },
  settings: { treeDensity: .35, groundCover: { density: .5, kinds: ["fern", "moss"] } },
};
