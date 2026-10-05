// The art pass (#92): every area type's set (its creature at every level, its plants, its props) developed afresh from Ed's
// briefs (art/areas.js's text, DESIGN.md's table) within the generators' limits, in iterations reviewed as a set. Each area's
// iterations are patches in order, as the art iterations' (next.js): { note, genomes, plants, areas }, and an area patch may
// carry its own `flora` (art/flora/areas.js's shape). Drawn only under an art set: "pass" (every area at its latest),
// "pass@<n>", "pass:<area>@<n>". Pictures and notes: docs/art-pass/.
export const PASS_ITERATIONS = {
  // ---- Moor (Ed): "moss; puddles, a lake; long grass; moss mounds; the sleeping giant"; the badger ----
  moor: [
    { note: "a European badger: a cool slate-grey back, black legs, the striped face; its legend carries a ridge of the moor's standing stones, glowing a pale moonlit green; the moor a deep olive moss with taller grass",
      genomes: { badger: { palette: { hue: .62, sat: .1, val: .48, over: { MAGIC: [.32, .2, .95], MAGIC2: [.36, .45, .8] } }, coat: { legMat: "BODY3" } } },
      areas: { moor: { leaf: .22, floor: ["moss", .22, .5, .36], small: [["grass", { h: 1.8 }]] } } },
    { note: "the art director's notes: the badger's white blaze back, wide and high-contrast, black bands through the eyes; its legend's standing stones grey slabs with a moonlit rune on each face; asleep it is dark peat and standing stones; dark heather and moss underfoot; low, wide cairns and one real pool",
      genomes: { badger: { palette: { over: { BELLY: [.1, .04, .97], BODY3: [.7, .2, .12], ACCENT: [.6, .06, .55], MAGIC: [.33, .35, 1] } }, head: { blaze: .34 }, coat: { crystalStone: { size: 1.1 } }, legend: ["crystals"],
        sleep: { over: { moss: .3, lichen: .06, ferns: 0, grass: 4, mushrooms: 0, roots: 0, stones: 7 }, colours: { WEB: [.3, .1, .6], BARK2: [.07, .45, .18], MOSS: [.2, .4, .3], LEAF: [.22, .35, .32], LEAF2: [.22, .3, .42] } } } },
      areas: { moor: { tone: { sat: .7, val: .75 }, tufts: { mix: [["heather", .35], ["moss", .35], ["longgrass", .2], ["rushes", .1]], sat: .7, val: .7, flower: [.85, .4, .55] },
        wall: [["water", { w: 3.2, d: 5 }]], big: [["mound", { moss: true }], ["cairn", { sparse: .12, squat: true }], ["standingstone", { sparse: .12 }]] } } },
  ],
  // ---- Fern forest (Ed): "pine needles, ferns, pine trees"; the boar ----
  "fern-forest": [
    { note: "a wild boar: darker, grey-brown and bristly, its piglets striped like humbugs; its legend's great tusks old ivory; a dark blue-green conifer forest (fir, Scots pine and larch, no broadleaves) over rusty needles, its ferns taller",
      genomes: { boar: { palette: { hue: .07, sat: .42, val: .4, over: { ACCENT: [.12, .2, .95] } }, coat: { ridge: true, stripes: { at: [0], n: 5, mat: "BELLY" } } } },
      areas: { "fern-forest": { leaf: .36, floor: ["needles", .06, .55, .3], small: [["fern", { h: 1.8 }]], flora: { species: [["fir", .45], ["pine", .3], ["larch", .25]], palette: { sat: .9, val: .88 } } } } },
    { note: "the art director's notes: three bold pale stripes on the piglet only; short hooked legend tusks; ferns knee- to waist-high on the witch; the pines and larches kept one dark green with the firs; needles and fern tufts, darker; asleep in needles and fronds",
      genomes: { boar: { coat: { stripes: { at: [0], n: 3, mat: "BELLY" } }, head: { tuskHook: true, tuskLegend: 1.15 }, palette: { over: { BELLY: [.1, .25, .9] } } } },
      plants: { fir: { colour: { variety: .3 } } },
      areas: { "fern-forest": { small: [["fern", { h: 1.2 }]], tone: { sat: .75, val: .75 }, tufts: { mix: [["needles", .45], ["fern", .35], ["moss", .15], ["mushrooms", .05]], sat: .75, val: .7 },
        flora: { species: [["fir", .45], ["pine", .3, { colour: { hue: .06, upper: [.06, .45, .42], variety: .3 } }], ["larch", .25, { colour: { hue: .04, val: .9, variety: .3 } }]], palette: { sat: .9, val: .88 } } } } },
  ],
  // ---- Muddy forest (Ed): "mud and leaves, short trunks with broken branches, trees with many trunks and branches"; the snail ----
  "muddy-forest": [
    { note: "a garden snail: a bigger amber shell with tight dark bands, a grey-brown body and longer stalks; its legend's shell glowing amber; the trees an ochre, muddy olive over wet dark mud",
      genomes: { snail: { palette: { hue: .08, sat: .6, val: .6, over: { SKIN: [.08, .28, .5], MAGIC: [.1, .8, 1], MAGIC2: [.05, .9, .7] } }, form: { shell: 1.15, whorl: .22, stripe: .07, stalks: 1.2, mantle: true } } },
      areas: { "muddy-forest": { leaf: .15, floor: ["mud", .07, .45, .24], flora: { species: [["sycamore", .4], ["alder", .25], ["elm", .2], ["crabApple", .15]], palette: { sat: .8, val: .82 } } } } },
    { note: "the art director's notes: the broken trunks about the witch's height; the many-trunked sycamore leading, denser, one colour; asleep it is caked in mud",
      genomes: { snail: { sleep: { over: { mud: .55, moss: .2, mushrooms: 1, ferns: 1, grass: 2 } } } },
      plants: { sycamore: { colour: { variety: .3 } } },
      areas: { "muddy-forest": { small: [["stump", { snag: true, scale: 2.2 }]], tufts: { mix: [["litter", .45], ["rushes", .2], ["moss", .2], ["grass", .15]], sat: .7, val: .75 },
        flora: { species: [["sycamore", .55, { trunks: 3 }], ["alder", .2, { trunks: 2 }], ["elm", .15], ["crabApple", .1]], palette: { sat: .8, val: .82 } } } } },
  ],
  // ---- Stone shrine (Ed): "grassy, stony; mossy henges; little stones; big stones; a shrine"; the fox ----
  "stone-shrine": [
    { note: "a red fox, deeper red with dark socks; its legend a kitsune whose many tails burn with pale fox-fire; the shrine's grass greyer, like old stone",
      genomes: { fox: { palette: { hue: .045, sat: .85, val: .85, over: { MAGIC: [.12, .3, 1], MAGIC2: [.08, .65, 1] } }, coat: { belly: true, socks: .38 } } },
      areas: { "stone-shrine": { floor: ["stony", .22, .25, .48] } } },
    { note: "the art director's notes: the kitsune's tails fanned apart with gaps, each curving, fox-fire at the tips; bigger ears on the legend; the shrine, henges and big stones bigger and grey; asleep it is grey stone and lichen",
      genomes: { fox: { coat: { kitsune: { n: 7, spread: 1.25, width: 1.5, thick: .11, curl: 1, len: 1.05 } }, sizes: { ear: [1.2, 1, 1, 1.45] },
        sleep: { over: { moss: .15, lichen: .35, ferns: 0, grass: 2, mushrooms: 0, stones: 7 }, colours: { MOSS: [.2, .25, .45], BARK2: [.1, .12, .35], WEB: [.2, .12, .78], BODY: [.1, .08, .58], BODY2: [.1, .08, .44], BODY3: [.1, .08, .3], BELLY: [.1, .06, .7], EAR: [.1, .08, .44] } } } },
      areas: { "stone-shrine": { set: ["shrine", { scale: 1.8 }], wall: [["henge", { scale: 1.6 }]], small: [["stones", { scale: 1.4 }]], tufts: { mix: [["pebbles", .4], ["grass", .3], ["moss", .25], ["flowers", .05]], sat: .6, val: .85 },
        big: [["boulder", { scale: 1.6 }], ["pillar", { sparse: .1 }], ["pillar", { sparse: .08, broken: true, lean: .14 }], ["cairn", { sparse: .08, tall: true }]] } } },
  ],
  // ---- Tangly forest (Ed): "nettles and earth, tangled branches, fairly short tangly trees"; the ram ----
  "tangly-forest": [
    { note: "a ram with a thick cream fleece and a dark face; its legend's horns glowing gold, not the style's mint; the hawthorn tangle a deep red-green",
      genomes: { ram: { palette: { hue: .11, sat: .16, val: .9, over: { MAGIC: [.13, .75, 1], MAGIC2: [.1, .85, .9], ACCENT: [.1, .3, .75] } } } },
      areas: { "tangly-forest": { leaf: .3, flora: { species: [["hawthorn", .45], ["elder", .25], ["crabApple", .2], ["hazel", .1]], palette: { sat: 1.1, val: .85 } } } } },
    { note: "the art director's notes: a white fleece of curls (cooler, whiter), a near-black face and legs, horns that spiral out from the head in their own dark horn colour and show from young; bronze legend horns on near-white; asleep in brambles and nettles; the hawthorn thicket denser and one colour, tangled branches thicker",
      genomes: { ram: { palette: { hue: .1, sat: .07, val: .95, over: { BODY2: [.08, .25, .16], BODY3: [.08, .3, .1], ACCENT: [.08, .3, .42], MAGIC: [.08, .7, .78], MAGIC2: [.07, .8, .58] } },
        coat: { legMat: "BODY3", hornTurns: 2.1, hornOut: .05, hornThick: .24, hornRidges: 9, hornLegend: 1.35, woolCurls: 46 }, sizes: { horns: [.45, 1.25, 1.6, 1.3] },
        sleep: { over: { moss: .25, roots: 7, grass: 6, ferns: 0, mushrooms: 0, flowers: 0 }, colours: { LEAF: [.28, .55, .3], LEAF2: [.3, .5, .4], MOSS: [.27, .45, .3], TRUNK: [.02, .45, .3] } } } },
      plants: { hawthorn: { colour: { variety: .3 } } },
      areas: { "tangly-forest": { small: [["bramble", { bare: true, scale: 1.6 }]], tone: { sat: .9, val: .8 }, tufts: { mix: [["longgrass", .45], ["grass", .25], ["litter", .25], ["flowers", .05]], sat: .85, val: .75 } } } },
  ],
  // ---- Wispy forest (Ed): "dry leaves, tall thin wispy trees, thick trees with several trunks"; the woodlouse ----
  "wispy-forest": [
    { note: "a common woodlouse: slate grey with pale flecks and pale plate edges, ten plates, longer feelers; its legend's crystals moonstone; the wispy forest pale gold",
      genomes: { woodlouse: { palette: { hue: .62, sat: .1, val: .5, over: { MAGIC: [.7, .18, 1], MAGIC2: [.55, .35, 1] } }, form: { plates: 10, rim: true, mottle: .12, antennae: 1.3 } } },
      areas: { "wispy-forest": { leaf: .17 } } },
    { note: "the art director's notes: half the flecks; moonstone legend crystals (pale blue-white); the birches green-yellow with white trunks; the limes one colour, a touch greener than v1's gold",
      genomes: { woodlouse: { form: { mottle: .06 }, palette: { over: { MAGIC: [.55, .12, 1], MAGIC2: [.58, .25, 1] } } } },
      plants: { lime: { colour: { variety: .3 } }, birch: { colour: { hueAbs: .22, variety: .3, trunk: [.1, .04, .9] } } },
      areas: { "wispy-forest": { leaf: .21, tufts: { mix: [["litter", .55], ["grass", .2], ["moss", .15], ["mushrooms", .05], ["fern", .05]], sat: .9, val: .9 } } } },
  ],
};
