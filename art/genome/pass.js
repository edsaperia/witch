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
  ],
  // ---- Fern forest (Ed): "pine needles, ferns, pine trees"; the boar ----
  "fern-forest": [
    { note: "a wild boar: darker, grey-brown and bristly, its piglets striped like humbugs; its legend's great tusks old ivory; a dark blue-green conifer forest (fir, Scots pine and larch, no broadleaves) over rusty needles, its ferns taller",
      genomes: { boar: { palette: { hue: .07, sat: .42, val: .4, over: { ACCENT: [.12, .2, .95] } }, coat: { ridge: true, stripes: { at: [0], n: 5, mat: "BELLY" } } } },
      areas: { "fern-forest": { leaf: .36, floor: ["needles", .06, .55, .3], small: [["fern", { h: 1.8 }]], flora: { species: [["fir", .45], ["pine", .3], ["larch", .25]], palette: { sat: .9, val: .88 } } } } },
  ],
  // ---- Muddy forest (Ed): "mud and leaves, short trunks with broken branches, trees with many trunks and branches"; the snail ----
  "muddy-forest": [
    { note: "a garden snail: a bigger amber shell with tight dark bands, a grey-brown body and longer stalks; its legend's shell glowing amber; the trees an ochre, muddy olive over wet dark mud",
      genomes: { snail: { palette: { hue: .08, sat: .6, val: .6, over: { SKIN: [.08, .28, .5], MAGIC: [.1, .8, 1], MAGIC2: [.05, .9, .7] } }, form: { shell: 1.15, whorl: .22, stripe: .07, stalks: 1.2, mantle: true } } },
      areas: { "muddy-forest": { leaf: .15, floor: ["mud", .07, .45, .24], flora: { species: [["sycamore", .4], ["alder", .25], ["elm", .2], ["crabApple", .15]], palette: { sat: .8, val: .82 } } } } },
  ],
  // ---- Stone shrine (Ed): "grassy, stony; mossy henges; little stones; big stones; a shrine"; the fox ----
  "stone-shrine": [
    { note: "a red fox, deeper red with dark socks; its legend a kitsune whose many tails burn with pale fox-fire; the shrine's grass greyer, like old stone",
      genomes: { fox: { palette: { hue: .045, sat: .85, val: .85, over: { MAGIC: [.12, .3, 1], MAGIC2: [.08, .65, 1] } }, coat: { belly: true, socks: .38 } } },
      areas: { "stone-shrine": { floor: ["stony", .22, .25, .48] } } },
  ],
  // ---- Tangly forest (Ed): "nettles and earth, tangled branches, fairly short tangly trees"; the ram ----
  "tangly-forest": [
    { note: "a ram with a thick cream fleece and a dark face; its legend's horns glowing gold, not the style's mint; the hawthorn tangle a deep red-green",
      genomes: { ram: { palette: { hue: .11, sat: .16, val: .9, over: { MAGIC: [.13, .75, 1], MAGIC2: [.1, .85, .9], ACCENT: [.1, .3, .75] } } } },
      areas: { "tangly-forest": { leaf: .3, flora: { species: [["hawthorn", .45], ["elder", .25], ["crabApple", .2], ["hazel", .1]], palette: { sat: 1.1, val: .85 } } } } },
  ],
  // ---- Wispy forest (Ed): "dry leaves, tall thin wispy trees, thick trees with several trunks"; the woodlouse ----
  "wispy-forest": [
    { note: "a common woodlouse: slate grey with pale flecks and pale plate edges, ten plates, longer feelers; its legend's crystals moonstone; the wispy forest pale gold",
      genomes: { woodlouse: { palette: { hue: .62, sat: .1, val: .5, over: { MAGIC: [.7, .18, 1], MAGIC2: [.55, .35, 1] } }, form: { plates: 10, rim: true, mottle: .12, antennae: 1.3 } } },
      areas: { "wispy-forest": { leaf: .17 } } },
  ],
};
