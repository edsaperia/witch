// The desert ruin (Ed, 2026-10-23: the hot south's fantastic kind, unknown-19's slot, ring 5; "a desert ruin"): a city the sand took,
// its streets still laid out in lines under the dunes, broken columns and fallen drums along them, date palms, acacias and old olives
// growing in its squares; the sphinx its creature. Ed's columns as for the 30.
export const DESERT_RUIN = {
  slot: 32, id: "desert-ruin", name: "Desert ruin", creature: "sphinx", by: "recipe", leaf: .2, floor: ["sand", .1, .36, .7],
  text: { floor: "drifted sand over old paving", wall: "tumbled walls of sandstone blocks", small: "dry tussocks and fallen stones", big: "broken columns, old date palms and acacias in the old streets", set: "a fallen colossus's head half buried in the sand" },
  wall: [["stones", {}], ["rockwall", {}]], small: [["grass", { h: .7, leafHue: .13, leafSat: .3 }], ["stones", {}]],
  big: [["tree", { type: "datePalm", variant: "ancient", scale: 1.05 }], ["tree", { type: "acacia", minor: true, scale: .9 }], ["pillar", { sparse: .22 }], ["pillar", { sparse: .14, broken: true, lean: .12 }], ["boulder", { sparse: .1 }]],
  pathKinds: ["track", "stairs"],
  setPiece: ["heap", "a heap of fallen sandstone blocks", 1.2, { of: "rubble", top: "post", moss: 0, rock: "sandstone" }], // (a generated stand-in: set pieces are switched off for now, Ed 2026-10-13)
  layout: {
    pattern: "grid", along: .4, density: .22, clump: .5, glades: { count: 3, size: [16, 26] },
    heightMix: { sapling: .2, mature: .675, tall: .125, giant: 0 }, undergrowth: .25, lean: { dir: .4, amount: .1 },
    terrain: ["mounds", "ridges"], decor: { rate: .45, ruins: .75, rocks: .2, freak: 0, lake: .05, modern: 0 },
    feel: "A buried city's streets running straight under drifted sand, columns standing and fallen along them, palms in its old squares; still, golden and watched.",
  },
  flora: { species: [["datePalm", .5], ["acacia", .3], ["baobab", .2]] /* (the flora check: Ed, 2026-10-25, ring 5: baobab for the olive) */, palette: { sat: .75, val: .92 } },
  settings: { treeDensity: .25, groundCover: { density: .3, kinds: ["pebbles", "blades"] } },
};
