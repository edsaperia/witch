// The art iterations (see next.js): per group (an area type's id, or "new" for new creatures), its iterations in
// order, each a patch on the one before: { note, genomes, plants, areas }. Pictures of each are in
// docs/art-iterations/<group>/v<n>/, and what each tried is in docs/art-iterations/README.md.
export const ART_ITERATIONS = {
  // ---- Ancient: Ed's "mossy roots over rocks, sorrel, giant gnarly slanted trees"; the stag ----
  ancient: [
    { note: "a red deer's coat (deeper, redder, a cream belly and rump) instead of the flat orange; giant slanted oaks grown by the blob generator, mossy at the foot; greener leaves",
      genomes: { stag: { palette: { hue: .045, sat: .58, val: .58 }, coat: { belly: true, rump: true, spots: "young", spotsAt: [0] }, legend: ["antlersGlow", "moss"] } },
      plants: {
        ancientOak: { name: "ancient oak", form: "tree", generator: "blob", grow: "wide", crown: { envelope: "sphere", clumps: "6-8 broad blobs on slanting limbs" },
          params: { w: 230, h: 150, trunk: { w: 18, len: .42, taper: .55, bend: 1.8, lean: .9, roots: 1.4 }, levels: [{ n: [3, 4], at: [.55, 1], len: [.5, .7], angle: [.8, 1.25], up: .1, bend: 1.6, shape: "even" }, { n: [2, 3], at: [.4, 1], len: [.4, .55], angle: [.35, .7], up: .2, bend: 1.4 }],
            crown: { blobs: [6, 8], r: [16, 22], flat: .65, stamp: "leaf", stampSize: 3, back: .35, backDark: .4, holes: .1 } },
          low: { ivy: .7, moss: 1, sprigs: .6, boughs: .5 }, colour: { hue: .0, sat: .95, val: .82 } },
      },
      areas: { ancient: { leaf: .3, big: [["tree", { type: "ancientOak", scale: 1.35, gnarl: 1, lean: .35 }], ["tree", { type: "yew", minor: true, scale: 1.2, gnarl: 1 }]] } } },
  ],
  // ---- Wetland: "wet mud, puddles and reeds, reeds and rushes, willows"; the toad ----
  wetland: [
    { note: "a common toad's olive-brown, warty, pale-throated, with bigger eyes; willows a cooler green (the area's leaf hue was autumn yellow)",
      genomes: { toad: { palette: { hue: .13, sat: .45, val: .52 }, form: { warts: .3, throat: true, eyes: 1.2 } } },
      plants: { marshWillow: { ...{ name: "marsh willow", form: "tree", generator: "willow", grow: "willow", crown: { envelope: "weeping", clumps: [20, 28] } },
        params: { w: 200, wPad: 50, h: 130, tw: 13, trunk: .3, limbs: 5, limbSpread: [.55, 1.25], limbLen: [.3, .42], clumpR: [20, 28], clumpRy: [9, 12], strand: [.5, .9] },
        low: { moss: .7, sprigs: .3 }, colour: { hue: .02, sat: .85, val: .95 } } },
      areas: { wetland: { leaf: .27, big: [["tree", { type: "marshWillow" }], ["tree", { type: "alder", minor: true, scale: .9 }]] } } },
  ],
  // ---- Cave mouth: "stone and roots, rock walls, stalagmite stubs, dead trees, a cave mouth"; the bat ----
  "cave-mouth": [
    { note: "a long-eared bat: bigger ears and head, a darker plum membrane and pink ears; the dead trees twisted snags from the blob generator (no crown), glowcaps instead of the green yew",
      genomes: { bat: { palette: { hue: .06, sat: .35, val: .42, over: { BODY2: [.9, .35, .3], EAR: [.97, .35, .75] } }, form: { ear: 1.5, head: 1.15, body: 1.1 } } },
      plants: { caveSnag: { name: "cave snag", form: "tree", generator: "blob", grow: "narrow", crown: { envelope: "none", clumps: "bare" },
        params: { w: 140, h: 150, trunk: { w: 11, len: .55, taper: .45, bend: 2.6, lean: .8, roots: 1.2 }, levels: [{ n: [3, 4], at: [.45, 1], len: [.35, .55], angle: [.5, 1], up: .15, bend: 2.2, w: .5 }, { n: [2, 3], at: [.4, 1], len: [.3, .45], angle: [.4, .8], up: .1, bend: 2 }],
          crown: { blobs: [1, 1], r: [1, 1] } },
        low: { moss: .5, ivy: .3 }, colour: { val: .8 } } },
      areas: { "cave-mouth": { big: [["tree", { type: "caveSnag", bare: true, gnarl: 1 }], ["tree", { type: "glowcap", minor: true, scale: .55 }]] } } },
  ],
  // ---- Holly thicket: "dead leaves, holly hedges, cobwebs, hollies, a web-hung dead tree"; the spider ----
  "holly-thicket": [
    { note: "a garden spider: chestnut with a cream cross, longer hairy legs held high; hollies darker and glossier, fewer berries",
      genomes: { spider: { palette: { hue: .07, sat: .55, val: .45, over: { BELLY: [.12, .25, .95] } }, form: { legs: 1.15, knees: 1.2, hairy: true } } },
      plants: { darkHolly: { name: "dark holly", form: "tree", generator: "holly", grow: "narrow", crown: { envelope: "cone", clumps: [6, 11] },
        params: { w: 110, h: 130, tiers: 10, cone: .72, halfTop: 5, halfBottom: 28, crownLine: .85 },
        low: { skirt: .8 }, colour: { hue: .08, sat: .9, val: .48, trunk: [.1, .08, .5], dot: [196, 26, 34] } } },
      areas: { "holly-thicket": { big: [["tree", { type: "darkHolly", scale: .9 }], ["tree", { type: "yew", minor: true, scale: .7 }]] } } },
  ],
  // ---- Bluebell glade: "bluebells, ferns, beeches"; the glow-worm ----
  "bluebell-glade": [
    { note: "a glow-worm as the real larva: dark, banded, three glowing tail segments, a lower back; the beeches fresh spring green rather than autumn yellow",
      genomes: { glowworm: { palette: { hue: .08, sat: .3, val: .3, over: { BODY2: [.1, .25, .55] } }, form: { segments: 11, glow: 3, arch: .6 } } },
      plants: { gladeBeech: { name: "glade beech", form: "tree", generator: "broadleaf", grow: "normal", style: { gnarl: { mul: .4 } }, crown: { envelope: "sphere", clumps: [15, 21] },
        params: { trunk: .4, tw: 11, limbs: 2, leader: 1.3, spreadA: .6, limb: .22, depth: 3, clumpR: [15, 21], flat: .5, extra: 1, dome: 7, smooth: 1, layers: 3.5, trunkMat: "BARK2", limbMat: "BARK2", tall: 155, tex: { grain: 3.5, holes: 0, flecks: .1 } },
        low: { moss: .4, boughs: .3 }, colour: { hue: .05, sat: 1.1, val: 1.0, trunk: [.6, .06, .6] } } },
      areas: { "bluebell-glade": { leaf: .28, big: [["tree", { type: "gladeBeech", gnarl: .2, scale: 1.1 }], ["tree", { type: "holly", minor: true, scale: .7 }]] } } },
  ],
  // ---- New creatures (Ed plans about 80, fantasy and coloured or shaped variants among them) ----
  new: [
    { note: "three new species from the existing templates: a crystal stag (a shaped and coloured variant), a hearth drake (a fantasy four-legged), a puffball toad (a squat variant)",
      genomes: {
        crystalStag: { id: "crystalStag", name: "Crystal stag", template: "quadruped", builder: "quad", palette: { hue: .58, sat: .16, val: .92, belly: "white", over: { ACCENT: [.5, .55, 1] } }, body: { hgt: 1.25, len: .6, chest: .6, tuck: .7, neck: .6, neckAng: 1, neckW: .3, hr: .19, legW: .7 }, head: { snout: 1.1, snoutD: .55, snoutTaper: .65 }, parts: { ears: { kind: "point", size: 1.1 }, tail: "deer", feet: "hoof", antlers: "palm" }, coat: { belly: true, rump: true }, legend: ["antlersGlow", "crystals"] },
        hearthDrake: { id: "hearthDrake", name: "Hearth drake", template: "quadruped", builder: "quad", palette: { hue: .02, sat: .75, val: .6, belly: "yellow" }, body: { hgt: .6, len: .95, chest: .2, tuck: .22, neck: .4, neckAng: .45, neckW: .42, hr: .25, legW: 1.2 }, head: { snout: 1, snoutD: .55, snoutTaper: .6 }, parts: { ears: { kind: "none" }, tail: "otter", feet: "paw", horns: "curl" }, coat: { belly: true, ridge: true }, legend: ["wings", "flames"] },
        puffballToad: { id: "puffballToad", name: "Puffball toad", template: "squat", builder: "toad", palette: { hue: .1, sat: .2, val: .85, over: { ACCENT: [.06, .55, .75], BELLY: [.12, .15, 1] } }, form: { body: [.9, 1.25, .95], warts: .12, eyes: .9, cap: [.22, .3, .34, .38] }, legend: ["crown"] },
      } },
  ],
};
// ---- round 2 ----
ART_ITERATIONS.ancient.push({ note: "a grander stag (longer legs and neck, a smaller head, bigger antlers by level) whose legend carries only the forest on its back, bone antlers; the oaks taller and twice as gnarled, their leaves one green from tree to tree",
  genomes: { stag: { body: { hgt: 1.35, neck: .62, neckAng: 1, legW: .7, hr: .19 }, sizes: { antlers: [0, 1, 1.35, 1.5] }, legend: ["moss"] } },
  plants: { ancientOak: { params: { h: 175, trunk: { w: 20, bend: 2.2 } }, colour: { variety: .3 } }, yew: { colour: { variety: .3 } } },
  areas: { ancient: { big: [["tree", { type: "ancientOak", scale: 1.7, gnarl: 1, lean: .35, thick: 1.2 }], ["tree", { type: "yew", minor: true, scale: 1.3, gnarl: 1 }]] } } });
ART_ITERATIONS.wetland.push({ note: "a natterjack: flatter and wider, a pale stripe down its back, greener, thicker legs, big-eyed babies; an alder carr (several dark stems) beside the willows",
  genomes: { toad: { palette: { hue: .2, sat: .42, val: .5, over: { BELLY: [.14, .2, .92] } }, form: { body: [1.15, .85, 1.1], legs: 1.2, stripe: true, eyes: [1.6, 1.3, 1.1, 1] } } },
  plants: { marshWillow: { colour: { variety: .3 } },
    alderCarr: { name: "alder carr", form: "tree", generator: "blob", grow: "narrow", crown: { envelope: "column", clumps: "dark blobs on several stems" },
      params: { w: 130, h: 160, narrow: 1, trunk: { w: 6, len: .7, taper: .5, bend: 1.2, stems: 3, fan: .7, roots: 1.2 }, levels: [{ n: [4, 6], at: [.35, 1], len: [.2, .3], angle: [.5, .9], up: .3, shape: "flame" }],
        crown: { blobs: [6, 8], r: [10, 14], flat: .8, stamp: "leaf", stampSize: 2.5, back: .4, backDark: .45, holes: .1 } },
      low: { moss: .8, sprigs: .5 }, colour: { hue: .04, sat: .9, val: .62, variety: .3 } } },
  areas: { wetland: { big: [["tree", { type: "marshWillow" }], ["tree", { type: "alderCarr", minor: true }]] } } });
ART_ITERATIONS["cave-mouth"].push({ note: "a bigger-winged bat with four fingers and drooping tips, a tawny ruff, big-headed, big-eared babies; taller hollow snags, bigger glowcaps, a cold blue-grey stone floor",
  genomes: { bat: { palette: { over: { BELLY: [.09, .5, .72] } }, form: { span: 1.2, fingers: 4, droop: .1, ruff: true, head: [1.45, 1.2, 1.15, 1.1], ear: [1.3, 1.5, 1.5, 1.6] } } },
  plants: { caveSnag: { params: { h: 175 } } },
  areas: { "cave-mouth": { floor: ["stone", .62, .12, .3], big: [["tree", { type: "caveSnag", bare: true, gnarl: 1, hollow: true, scale: 1.15 }], ["tree", { type: "glowcap", minor: true, scale: .75 }]] } } });
ART_ITERATIONS["holly-thicket"].push({ note: "a rounder, darker spider: banded abdomen (a big round one on the babies), thicker baby legs; hollies grown by the blob generator as glossy cones with red berries",
  genomes: { spider: { palette: { hue: .08, sat: .6, val: .38 }, form: { abdomen: [1.3, 1.1, 1.15, 1.25], legW: [1.35, 1, 1.05, 1.15], mark: "bands" } } },
  plants: { blobHolly: { name: "blob holly", form: "tree", generator: "blob", grow: "narrow", crown: { envelope: "cone", clumps: "a stack of glossy blobs" },
    params: { w: 110, h: 140, narrow: 1, trunk: { w: 7, len: .85, taper: .5, bend: .5, smooth: 1, mat: "BARK2" }, levels: [{ n: [6, 8], at: [.15, .95], len: [.15, .3], angle: [1.1, 1.4], up: .1, shape: "cone", tips: true }],
      crown: { blobs: [7, 9], r: [11, 15], flat: .8, stamp: "round", stampSize: 2, back: .3, backDark: .45, tones: [.2, .62], stampShade: .5, dots: { mat: "FLOWER", share: .02, size: 2 } } },
    low: { skirt: .8 }, colour: { hue: .08, sat: .9, val: .5, trunk: [.1, .08, .5], dot: [196, 26, 34], variety: .3 } } },
  areas: { "holly-thicket": { big: [["tree", { type: "blobHolly" }], ["tree", { type: "darkHolly", minor: true, scale: .8 }]] } } });
ART_ITERATIONS["bluebell-glade"].push({ note: "the glow-worm's light grows with it (one glowing segment on a baby to four on a legend) in its own yellow-green; the beeches all one spring green; bluebells and ferns underfoot",
  genomes: { glowworm: { palette: { over: { MAGIC: [.2, .85, 1], MAGIC2: [.22, .45, 1] } }, form: { glow: [1, 2, 3, 4], width: [1.15, 1, 1.05, 1.1] } } },
  plants: { gladeBeech: { colour: { variety: .25 } } },
  areas: { "bluebell-glade": { small: [["fern", {}], ["flowers", { hue: .68, leafy: true }]] } } });
ART_ITERATIONS.new.push({ note: "the puffball becomes a toadstool toad (a domed red cap with white spots); the crystal stag cooler and greyer, its legend crystal antlers only; the drake's glow in fire colours, a longer snout",
  genomes: {
    puffballToad: { name: "Toadstool toad", palette: { hue: .12, sat: .3, val: .7, over: { ACCENT: [.99, .8, .8], BELLY: [.1, .08, 1] } }, form: { capH: .7, cap: [.24, .32, .36, .4] } },
    crystalStag: { palette: { hue: .6, sat: .25, val: .8 }, legend: ["antlersGlow"] },
    hearthDrake: { palette: { over: { MAGIC: [.05, .9, 1], MAGIC2: [.12, .5, 1] } }, head: { snout: 1.3 } },
  } });

// ---- round 3 ----
ART_ITERATIONS.ancient.push({ note: "the legend's glow in old gold and lichen green (antlers and the forest on its back glowing together, not mint and violet); the oaks holier, more blobs; ferns and sorrel underfoot",
  genomes: { stag: { palette: { over: { MAGIC: [.2, .7, .95], MAGIC2: [.15, .35, 1] } }, legend: ["antlersGlow", "moss"] } },
  plants: { ancientOak: { params: { crown: { blobs: [7, 9], holes: .15 } } } },
  areas: { ancient: { leaf: .29, small: [["flowers", { hue: .98, leafy: true }], ["fern", {}]] } } });
ART_ITERATIONS.wetland.push({ note: "the legend wears a lily pad (the toadstool cap, flat and green, by level: only the legend); the alder carr thicker, two stems; longer willow curtains",
  genomes: { toad: { palette: { over: { ACCENT: [.3, .6, .5] } }, form: { cap: [0, 0, 0, .42], capH: .18 } } },
  plants: { marshWillow: { params: { strand: [.8, 1.25] } }, alderCarr: { params: { trunk: { w: 9, stems: 2 }, crown: { r: [12, 16] } } } } });
ART_ITERATIONS["cave-mouth"].push({ note: "a darker bat that reads against the stone at night, its wings growing faster than its body by level; dark-barked snags; the glowcaps a cold cave cyan instead of violet",
  genomes: { bat: { palette: { val: .32 }, form: { span: [.9, 1.05, 1.2, 1.3] } } },
  plants: { caveSnag: { params: { trunk: { mat: "BARKD" } } }, glowcap: { colour: { hueAbs: .5, glow: [140, 255, 236] } } },
  areas: { "cave-mouth": { big: [["tree", { type: "caveSnag", bare: true, gnarl: 1, scale: 1.15 }], ["tree", { type: "glowcap", minor: true, scale: .75 }]] } } }); // no hollow: on a bare tree its knothole lands in the top half and floats in the canopy (see the notes)
ART_ITERATIONS["holly-thicket"].push({ note: "back to the bespoke holly for the main tree (the blob generator can't fill a cone; see the notes), the blob holly a minor sapling; the garden cross back on a dark spider with near-black hairy legs",
  genomes: { spider: { palette: { over: { BODY3: [.05, .4, .14] } }, form: { mark: "cross", hairy: true } } },
  plants: { blobHolly: { params: { crown: { dots: { share: .008 } } } } },
  areas: { "holly-thicket": { big: [["tree", { type: "darkHolly", scale: .95 }], ["tree", { type: "blobHolly", minor: true, scale: .75 }]] } } });
ART_ITERATIONS["bluebell-glade"].push({ note: "taller beeches over a hazel understorey (instead of holly), a bluer floor",
  plants: {},
  areas: { "bluebell-glade": { floor: ["bluebells", .32, .42, .38], big: [["tree", { type: "gladeBeech", gnarl: .2, scale: 1.25 }], ["tree", { type: "hazel", minor: true, scale: .8 }]] } } });
ART_ITERATIONS.new.push({ note: "the crystal stag's glow its own ice cyan, crystals back on its legend; the drake's legend a flame mane rather than green wings",
  genomes: {
    crystalStag: { palette: { over: { MAGIC: [.5, .6, 1], MAGIC2: [.52, .22, 1] } }, legend: ["antlersGlow", "crystals"] },
    hearthDrake: { legend: ["flames", "crystals"] },
  } });

// Which iteration of each group the "next" art set (?art=next) uses.
export const NEXT_CHOICE = { ancient: 3, wetland: 2, "cave-mouth": 3, "holly-thicket": 3, "bluebell-glade": 3, new: 3 };
