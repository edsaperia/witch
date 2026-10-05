// The prop generator's genomes (#119, "a prop generator"; the art director's notes on #112's iteration 3): each prop kind as data,
// like the plants' (art/flora/genomes.js). A genome gives each of its numbers a range [lo, hi] (a variant picks within it from its
// seed), its choices a list of weighted options, and its colours as [h, s, v] (each with a small seeded spread). Sizes are in metres.
// The generator (art/props/generator.js) builds a variant from its record alone, so changing a prop is editing its record.
//   standingStone: the moor's: a grey slab, wider than deep, plain (few, big lichen patches, moss at its foot), leaning or broken
//   cairn:         a low heap of irregular grey stones, sometimes a slab leaning on it
//   pool:          a pool with an irregular shore (a few overlapping waves round its rim), a mud or moss rim, reeds and stones
//   brokenTrunk:   a short broken trunk, its snapped branch growing out of it (joined, never laid beside it), jagged pale wood at the breaks
export const PROP_GENOMES = {
  standingStone: {
    height: [3.4, 5], width: [.9, 1.4], depth: [.35, .55], taper: [.55, .85], // its top's width, times its foot's
    lean: [-.2, .2], tilt: [-.08, .08], // radians: sideways (in the picture) and towards us
    top: [["slant", 3], ["round", 2], ["notch", 1], ["broken", 2]], // its top: cut on a slant, rounded, notched, or snapped off (a piece lying beside it)
    lichen: [0, 3], lichenSize: [.1, .2], moss: [.06, .16], // big lichen patches, not speckle; moss up its foot (a share of its height)
    rough: 0, // smooth faces: Ed's notes said "much less textured"
    colour: { stone: [.6, .07, .6], dark: [.64, .1, .38], lichen: [[.22, .14, .74, 4], [.1, .4, .7, 1]], moss: [.24, .45, .38], spread: .06 },
  },
  cairn: {
    stones: [6, 10], spread: [1.4, 2.2], height: [.6, 1.1], size: [.32, .5], flat: [.45, .7], // stone radius (m), how flat each is (height over width)
    slab: [["none", 2], ["one", 3], ["two", 1]], // leaning slabs against it
    rubble: [3, 7], moss: [.15, .4], // loose stones round its foot; the share of stones mossed on top
    rough: .03,
    colour: { stone: [.6, .07, .58], dark: [.64, .1, .36], lichen: [[.22, .14, .74, 1]], moss: [.24, .45, .38], spread: .07 },
  },
  pool: {
    radius: [.7, 1.35], aspect: [.5, .85], // across (m); how deep it reaches into the picture, times across
    waves: [2, 4], wobble: [.08, .2], // how many waves round its shore, and how deep they bite
    rim: [.12, .3], rimKind: [["mud", 2], ["moss", 2]], // its shore's band (m) and what it is
    reeds: [0, 3], reedsPer: [3, 7], reedHeight: [.45, .95], cattails: [0, 1], // reed clumps on its shore, cattail heads (a share)
    stones: [0, 4], pads: [0, 0], // shore stones; lily pads
    colour: { water: [.56, .4, .44], deep: [.58, .48, .28], glint: [.55, .18, .8], mud: [.08, .35, .26], moss: [.24, .45, .36], reed: [.22, .45, .45], reed2: [.18, .4, .62], cattail: [.06, .55, .3], stone: [.6, .05, .55], pad: [.3, .5, .45], spread: .04 },
    bog: { water: [.17, .35, .26], deep: [.2, .4, .18], glint: [.18, .25, .5] }, // a bog's brown-green water
  },
  brokenTrunk: {
    height: [.8, 2.1], girth: [.32, .5], // its height (m) and radius at the foot (m)
    branch: [["up", 3], ["out", 2], ["hanging", 2], ["none", 1]], // its snapped branch: rising, reaching out level, hanging down to the ground still attached, or none
    branchAt: [.45, .8], branchLen: [.8, 1.6], branchSide: [-1, 1], // where up the trunk (a share), how long (m), which way (sign)
    splinters: [4, 7], roots: [3, 5], moss: [0, .5], fungi: [0, 3], // jagged pale wood at the break; root flares; moss up its shady side; bracket fungi
    colour: { wood: [.07, .4, .32], dark: [.06, .45, .17], light: [.08, .3, .48], pale: [.1, .28, .74], moss: [.24, .45, .36], fungus: [.08, .45, .62], spread: .04 },
  },
};
export const PROP_KINDS = Object.keys(PROP_GENOMES);
