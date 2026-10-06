// The prop generator's genomes (#119, "a prop generator"; the art director's notes on #112's iteration 3): each prop kind as data,
// like the plants' (art/flora/genomes.js). A genome gives each of its numbers a range [lo, hi] (a variant picks within it from its
// seed), its choices a list of weighted options, and its colours as [h, s, v] (each with a small seeded spread). Sizes are in metres.
// The generator (art/props/generator.js) builds a variant from its record alone, so changing a prop is editing its record.
//   standingStone: the moor's: a grey slab, wider than deep, plain (few, big lichen patches, moss at its foot), leaning or broken
//   cairn:         a low heap of irregular grey stones, sometimes a slab leaning on it
//   pool:          a pool with an irregular shore (a few overlapping waves round its rim), a mud or moss rim, reeds and stones
//   brokenTrunk:   a short broken trunk, its snapped branch growing out of it (joined, never laid beside it), jagged pale wood at the breaks
//   fallenLog:     a fallen trunk or bough lying on the ground, bowed, mossed along its top, its ends broken to splinters or sawn to rings
//   mushroomRing:  a fairy ring of toadstools round darker grass (or an arc, or a clump), red, brown, ochre or glowing
//   stoneCircle:   a ring of small standing stones round short grass, one or two leaning or fallen, sometimes a stone or slab in the middle
export const PROP_GENOMES = {
  standingStone: {
    height: [3.4, 5], width: [.9, 1.4], depth: [.35, .55], taper: [.55, .85], // its top's width, times its foot's
    lean: [-.2, .2], tilt: [-.08, .08], // radians: sideways (in the picture) and towards us
    top: [["slant", 3], ["round", 1], ["notch", 2], ["flat", 2], ["broken", 2]], // its top: cut on a slant (a third of its width or more), rounded, a deep V notch, flat (a square slab), or snapped off (a piece lying beside it)
    shape: [["tall", 3], ["squat", 1]], // a squat slab: about .7 as tall, 1.45 times as wide (up to about 1.8 m wide at 3 m tall), so a ring of them has rhythm
    lichen: [0, 2], lichenSize: [.1, .18], moss: [.06, .16], // big lichen patches, not speckle; moss up its foot (a share of its height)
    rough: 0, // smooth faces: Ed's notes said "much less textured"
    colour: { stone: [.61, .16, .66], dark: [.65, .18, .4], lichen: [[.2, .08, .78, 4], [.1, .35, .7, 1]], moss: [.24, .45, .38], spread: .06 }, // a touch of blue against the warm key light (the art director, #142)
  },
  cairn: {
    stones: [7, 11], spread: [1.2, 1.7], height: [.85, 1.3], size: [.3, .44], flat: [.5, .7], // stacked as a cone (spread under twice its height); stone radius (m), how flat each is
    slab: [["none", 2], ["one", 3], ["two", 1]], // leaning slabs against it
    rubble: [3, 7], moss: [.15, .4], // loose stones round its foot; the share of stones mossed on top
    rough: .03,
    colour: { stone: [.61, .16, .64], dark: [.65, .18, .4], lichen: [[.2, .08, .78, 1]], moss: [.24, .45, .38], spread: .07 },
  },
  pool: {
    radius: [.7, 1.35], aspect: [.5, .85], // across (m); how deep it reaches into the picture, times across
    waves: [2, 4], wobble: [.08, .2], // how many waves round its shore, and how deep they bite
    rim: [.12, .3], rimKind: [["mud", 2], ["moss", 2]], // its shore's band (m) and what it is
    reeds: [0, 3], reedsPer: [3, 7], reedHeight: [.45, .95], cattails: [0, 1], // reed clumps on its shore, cattail heads (a share)
    stones: [0, 4], pads: [0, 0], // shore stones; lily pads
    colour: { water: [.6, .45, .38], deep: [.62, .55, .16], glint: [.55, .2, .95], mud: [.08, .35, .3], moss: [.24, .4, .52], reed: [.22, .45, .45], reed2: [.18, .4, .62], cattail: [.06, .55, .3], stone: [.6, .05, .55], pad: [.3, .5, .45], spread: .04 },
    bog: { water: [.17, .35, .26], deep: [.2, .4, .18], glint: [.18, .25, .5] }, // a bog's brown-green water
  },
  brokenTrunk: {
    height: [.8, 2.1], girth: [.32, .5], // its height (m) and radius at the foot (m)
    branch: [["up", 3], ["out", 2], ["hanging", 2], ["none", 1]], // its snapped branch: rising, reaching out level, hanging down to the ground still attached, or none
    branchAt: [.45, .8], branchLen: [.8, 1.6], branchSide: [-1, 1], // where up the trunk (a share), how long (m), which way (sign)
    splinters: [4, 7], roots: [3, 5], moss: [0, .5], fungi: [0, 3], // jagged pale wood at the break; root flares; moss up its shady side; bracket fungi
    colour: { wood: [.07, .4, .32], dark: [.06, .45, .17], light: [.08, .3, .48], pale: [.1, .18, .68], moss: [.24, .45, .36], fungus: [.08, .45, .62], spread: .04 },
  },
  fallenLog: { // a fallen trunk or bough lying on the ground (the areas' logs): a gentle bend, bark grooves, its ends broken to splinters or sawn to rings
    length: [1.8, 3.6], girth: [.18, .34], bend: [-.15, .15], sink: [.15, .35], // its length (m), radius (m), how it bows, how far it sinks into the ground (a share of its radius)
    ends: [["broken", 3], ["sawn", 1], ["mixed", 2]], stubs: [0, 3], // its two ends; snapped branch stubs along it
    moss: [.2, .7], fungi: [0, 3], // moss along its top; bracket fungi on its sides
    colour: { wood: [.07, .38, .3], dark: [.06, .45, .16], light: [.08, .28, .46], pale: [.1, .18, .68], rings: [.09, .3, .55], moss: [.24, .45, .36], fungus: [.08, .45, .62], spread: .04 },
  },
  mushroomRing: { // a fairy ring: toadstools round a circle of darker grass, a few out of line, or a clump
    form: [["ring", 3], ["arc", 2], ["clump", 1]], radius: [.5, 1.2], count: [7, 14], // its shape; its radius (m); how many
    size: [.12, .26], spread: [.6, 1.4], // a cap's radius (m; bigger than life, so a ring reads at game size), and how much they vary
    cap: [["red", 3], ["brown", 3], ["ochre", 2], ["glow", 1]], spots: [0, .9], // their caps' kind (glow: pale caps with glowing gills, only some areas); white spots (a share)
    colour: { red: [.0, .7, .7], brown: [.07, .5, .45], ochre: [.11, .55, .7], glow: [.5, .15, .85], stem: [.12, .12, .86], spot: [.1, .05, .96], gill: [.48, .5, 1], ring: [.26, .5, .3], spread: .04 },
  },
  stoneCircle: { // a ring of small standing stones round a patch of short grass, one or two leaning or fallen
    radius: [1.6, 2.8], count: [5, 9], height: [.8, 1.6], width: [.4, .7], // its radius (m); how many stones; their height and width (m)
    lean: [0, .25], fallen: [0, 2], centre: [["none", 3], ["stone", 1], ["slab", 1]], // how far they lean; how many lie fallen; what stands in the middle
    colour: { stone: [.61, .16, .64], dark: [.65, .18, .4], lichen: [[.2, .08, .78, 1]], moss: [.24, .45, .38], grass: [.26, .45, .38], spread: .07 },
  },
};
export const PROP_KINDS = Object.keys(PROP_GENOMES);
