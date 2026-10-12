// The pack ice (Ed's later islands, phase 4, cold): the polar bear's. Broken sea ice and drifted snow with dark leads of open
// water between the floes; stunted, wind-bent pines and birch hug the shore. Unlike the arctic fox's snowfield (inland,
// soft and white), this is the frozen sea: ice slabs, black water, pressure ridges.
export const PACKICE = {
  id: "packice", name: "Pack ice", creature: "polarbear", by: "recipe", leaf: .45, floor: ["ice", .6, .38, .86],
  text: { floor: "sea ice and drifted snow", wall: "dark leads of open water", small: "snow drifts and ice blocks", big: "stunted wind-bent pines and birch along the shore", set: "a pressure ridge of broken ice" },
  wall: [["water", { w: 2.2, dark: true }]], small: [["rock", { small: true, ice: true }], ["grass", { h: .8 }]],
  big: [["tree", { type: "pine", scale: .65, gnarl: .7 }], ["tree", { type: "birch", minor: true, scale: .6, gnarl: .6 }]],
  ponds: true, pathKinds: ["track"],
  setPiece: ["heap", "a pressure ridge of broken ice", 1, { seed: 7, of: "stones", moss: 0, top: "slab", colour: { stone: [.55, .18, .9], dark: [.58, .35, .62], moss: [.55, .1, .95] } }],
  layout: {
    pattern: "edgeOnly", density: .2, clump: .7, glades: { count: 2, size: [24, 32] },
    heightMix: { sapling: .45, mature: .5, tall: .05, giant: 0 }, undergrowth: .2, lean: { dir: 0, amount: .35 },
    terrain: ["pools"], decor: { rate: .15, ruins: .1, rocks: .5, freak: .2, lake: .7, modern: .05 },
    feel: "White floes and slabs of sea ice split by black leads of open water, a pressure ridge heaved up in the middle, a few wind-bent pines and birch crouched along the shore; bitter, bright and silent.",
  },
  flora: { species: [["pine", .65], ["birch", .35]], palette: { sat: .55, val: .8 } },
  settings: { treeDensity: .2, groundCover: { density: .4, kinds: ["blades"] } },
};
