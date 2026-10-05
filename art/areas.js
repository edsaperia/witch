// Witch area types: the first 30 (Ed, 2026-10-03; DESIGN.md "The first 30 area types"),
// one per creature, in Ed's columns: floor texture, wall objects (edges and barriers),
// small objects, big objects, a set piece, and the creature. Each column's words are kept
// as Ed and the coordinator wrote them (`text`); `draw` says how the generator draws it.
// Placeholder standard: a small library of props, recoloured and resized per area.
//
// areaAssets(id, style, { K, makeCanvas }) bakes everything one area type needs:
//   { def, floor, walls, small, big, setPiece }  — each prop { sp: baked, kind, text },
//   floor a seamless-ish tile (64 x 48 art pixels) to repeat over the ground.
import { NEW_SET_PIECES, setPiece3d } from "./setpieces.js";
import { M, Sprite, rng, uni, pick, hash2, vnoise, hsv2rgb, tufts, lerp2, add, bake, defaultCanvas, runeGlyph } from "./core.js";
import { Model, render, masks, v3 } from "./model3d.js";
import { sigilHit } from "./sigils.js";
import { treeSpecies, treeColours, splitTree, bush } from "./trees.js";
import { bakeSway } from "./sway.js";
import { setArea, setPlant } from "./genome/next.js";
// the props that sway in the wind: they get a sway mask (sway.js) beside their albedo and normals
export const SWAYING_PROPS = new Set(["tree", "shrub", "grass", "reeds", "fern", "flowers", "flowerbed", "bramble", "hedge"]);
import { TALL_KINDS, tallPiece } from "./tall.js";

// [kind, params] shorthands for the prop library below
const tree = (type, o = {}) => ["tree", { type, ...o }];
const P = (kind, o = {}) => [kind, o];

// floor: [texture, hue, saturation, value]; leaf: leaf hue for this area's plants.
export const AREAS = [
  { id: "moor", name: "Moor", creature: "badger", by: "Ed", leaf: .24, floor: ["moss", .26, .45, .42], text: { floor: "moss", wall: "puddles, a lake", small: "long grass", big: "moss mounds" },
    wall: [P("water", { w: 1.6 })], small: [P("grass", { h: 1.4 })], big: [P("mound", { moss: true }), P("cairn", { sparse: .12 }), P("standingstone", { sparse: .12 })] },
  { id: "fern-forest", name: "Fern forest", creature: "boar", by: "Ed", leaf: .3, floor: ["needles", .08, .45, .32], text: { floor: "pine needles", small: "ferns", big: "pine trees" },
    small: [P("fern")], big: [tree("larch", { scale: 1.1 }), tree("fir", { minor: true })] },
  { id: "muddy-forest", name: "Muddy forest", creature: "snail", by: "Ed", leaf: .22, floor: ["mud", .07, .5, .28], text: { floor: "mud and leaves", small: "short trunks with broken branches", big: "trees with many trunks and branches" },
    small: [P("stump", { snag: true })], big: [tree("sycamore", { trunks: 3, gnarl: .9 }), tree("alder", { minor: true })] },
  { id: "stone-shrine", name: "Stone shrine", creature: "fox", by: "Ed", leaf: .28, floor: ["stony", .25, .3, .45], text: { floor: "grassy, stony", wall: "mossy henges", small: "little stones", big: "big stones", set: "a shrine" },
    wall: [P("henge")], small: [P("stones")], big: [P("boulder"), P("pillar", { sparse: .1 }), P("pillar", { sparse: .08, broken: true, lean: .14 }), P("cairn", { sparse: .08, tall: true })], set: P("shrine") },
  { id: "tangly-forest", name: "Tangly forest", creature: "ram", by: "Ed", leaf: .27, floor: ["nettles", .28, .5, .3], text: { floor: "nettles and earth", small: "tangled branches", big: "fairly short tangly trees" },
    small: [P("bramble", { bare: true })], big: [tree("hawthorn", { scale: .9, gnarl: 1 })] },
  { id: "wispy-forest", name: "Wispy forest", creature: "woodlouse", by: "Ed", leaf: .2, floor: ["leaves", .09, .55, .45], text: { floor: "dry leaves", small: "tall thin wispy trees", big: "thick trees with several trunks" },
    small: [tree("birch", { scale: .75 })], big: [tree("lime", { trunks: 3, thick: 1.4 }), tree("birch", { minor: true })] },
  { id: "hazel-forest", name: "Hazel forest", creature: "hedgehog", by: "Ed", leaf: .26, floor: ["grass", .24, .45, .45], text: { floor: "short grass", small: "brown lumps", big: "crooked trees with many branches" },
    small: [P("mound", { brown: true })], big: [tree("hazel", { gnarl: 1, scale: .95 }), tree("oak", { minor: true, scale: .9 })] },
  { id: "garden", name: "Garden", creature: "squirrel", by: "Ed", leaf: .3, floor: ["lawn", .27, .5, .5], text: { floor: "uniform grass", wall: "ornate stone wall", small: "manicured flower beds", big: "willows", set: "a stone pavilion" },
    wall: [P("wall")], small: [P("flowerbed")], big: [tree("willow")], set: P("pavilion") },
  { id: "twiggy-forest", name: "Twiggy forest", creature: "wolf", by: "Ed", leaf: .29, floor: ["plants", .3, .5, .38], text: { floor: "small leafy plants", small: "small trees with many thin trunks", big: "straight but slanted trees with many trunks" },
    small: [tree("broad", { trunks: 4, scale: .5, thin: true })], big: [tree("ash", { trunks: 3, lean: .3, gnarl: .1 })] },
  { id: "ancient", name: "Ancient", creature: "stag", by: "Ed", leaf: .31, floor: ["roots", .1, .25, .35], text: { floor: "mossy roots over rocks", small: "sorrel", big: "giant gnarly slanted trees" },
    small: [P("flowers", { hue: .98, leafy: true })], big: [tree("yew", { scale: 1.4, gnarl: 1, lean: .35 }), tree("oak", { minor: true, scale: 1.3, gnarl: 1 })] },
  { id: "norway", name: "Norway", creature: "stoat", by: "Ed", leaf: .36, floor: ["slate", .6, .15, .35], text: { floor: "pine needles and slate", small: "rocks", big: "straight pines" },
    small: [P("stones", { big: true })], big: [tree("fir", { scale: 1.2 }), tree("birch", { minor: true })] },
  { id: "alder-forest", name: "Alder forest", creature: "snake", by: "Ed", leaf: .23, floor: ["tallgrass", .22, .45, .42], text: { floor: "tall and short grass", small: "tree stumps with tall grass around", big: "tall slanted trees with thin leaves at different heights" },
    small: [P("stump", { grass: true })], big: [tree("alder", { lean: .3, scale: 1.2, dark: true })] },
  { id: "meadow", name: "Meadow", creature: "hare", by: "draft", leaf: .25, floor: ["flowers", .25, .5, .5], text: { floor: "grass and wildflowers", small: "scattered hawthorn", big: "lone oaks" },
    small: [P("shrub", { flower: [250, 245, 235] })], big: [tree("chestnut", { scale: 1.1 }), tree("hawthorn", { minor: true, scale: .8 })] },
  { id: "old-oaks", name: "Old oaks", creature: "owl", by: "draft", leaf: .22, floor: ["leaves", .07, .5, .35], text: { floor: "leaf litter", small: "acorns, fallen branches", big: "ancient gnarled oaks with hollow trunks", set: "a great hollow oak" },
    small: [P("cones", { acorn: true }), P("log", { branch: true })], big: [tree("oak", { gnarl: .9, hollow: true }), tree("holly", { minor: true, scale: .8 })], set: tree("broad", { scale: 1.6, gnarl: 1, hollow: true }) },
  { id: "berry-thicket", name: "Berry thicket", creature: "bear", by: "draft", leaf: .32, floor: ["needles", .08, .45, .3], text: { floor: "pine needles", wall: "bramble thickets", small: "berry bushes", big: "tall pines" },
    wall: [P("bramble")], small: [P("shrub", { flower: [200, 30, 60] })], big: [tree("pine", { scale: 1.2 }), tree("rowan", { minor: true })] },
  { id: "wetland", name: "Wetland", creature: "toad", by: "draft", leaf: .2, floor: ["mud", .15, .45, .3], text: { floor: "wet mud", wall: "puddles, reeds", small: "reeds and rushes", big: "willows" },
    wall: [P("water"), P("reeds", { tall: true })], small: [P("reeds")], big: [tree("willow"), tree("alder", { minor: true, scale: .9 })] },
  { id: "stream", name: "Stream", creature: "otter", by: "draft", leaf: .27, floor: ["pebbles", .25, .3, .45], text: { floor: "pebbles and grass", wall: "a stream or pond", small: "alder saplings", big: "alders", set: "a fallen-log bridge" },
    wall: [P("water", { w: 2 })], small: [tree("broad", { scale: .45 })], big: [tree("alder", { scale: .95, gnarl: .3 }), tree("willow", { minor: true, scale: .8 })], set: P("bridge") },
  { id: "rocky-slope", name: "Rocky slope", creature: "lynx", by: "draft", leaf: .34, floor: ["scree", .2, .2, .42], text: { floor: "scree and moss", wall: "boulders", small: "rocks", big: "pines", set: "a rocky outcrop" },
    wall: [P("boulder", { big: true })], small: [P("stones", { big: true })], big: [tree("rowan", { scale: 1.1 }), tree("pine", { minor: true })], set: P("outcrop") },
  { id: "bog", name: "Bog", creature: "elk", by: "draft", leaf: .38, floor: ["moss", .18, .55, .4], text: { floor: "sphagnum moss", wall: "bog pools", small: "cotton grass", big: "spruce" },
    wall: [P("water", { bog: true })], small: [P("reeds", { cotton: true })], big: [tree("birch", { scale: .8, dark: true }), tree("pine", { minor: true, scale: .7 })] },
  { id: "deadwood", name: "Deadwood", creature: "raven", by: "draft", leaf: .15, floor: ["earth", .07, .35, .3], text: { floor: "bare earth", small: "broken branches", big: "blasted dead trees" },
    small: [P("log", { branch: true })], big: [tree("broad", { bare: true, gnarl: 1 })] },
  { id: "cave-mouth", name: "Cave mouth", creature: "bat", by: "draft", leaf: .2, floor: ["stone", .08, .15, .35], text: { floor: "stone and roots", wall: "rock walls", small: "stalagmite stubs", big: "dead trees", set: "a cave mouth" },
    wall: [P("rockwall")], small: [P("stalagmite")], big: [tree("broad", { bare: true }), tree("yew", { minor: true, scale: .8 })], set: P("cave") },
  { id: "grassland", name: "Grassland", creature: "mole", by: "draft", leaf: .25, floor: ["grass", .26, .5, .48], text: { floor: "short turf", small: "molehills", big: "lone birches" },
    small: [P("mound", { brown: true, small: true })], big: [tree("flat", { scale: 1.1 }), tree("weepingBirch", { minor: true })] },
  { id: "beaver-pond", name: "Beaver pond", creature: "beaver", by: "draft", leaf: .17, floor: ["leaves", .13, .6, .5], text: { floor: "birch leaves", wall: "a pond", small: "stumps", big: "birch and aspen", set: "a beaver dam" },
    wall: [P("water", { w: 2 })], small: [P("stump", { gnawed: true })], big: [tree("weepingBirch"), tree("alder", { minor: true, scale: .8 })], set: P("dam") },
  { id: "log-pile", name: "Log pile", creature: "beetle", by: "draft", leaf: .22, floor: ["leaves", .06, .5, .3], text: { floor: "rotting leaves", small: "fungi", big: "rotting logs", set: "a fallen giant" },
    small: [P("fungi")], big: [P("log", { rot: true }), P("snag", { sparse: .12 }), P("snag", { sparse: .1, hollow: true, lean: .12 })], set: P("log", { rot: true, giant: true }) },
  { id: "heath", name: "Heath", creature: "moth", by: "draft", leaf: .27, floor: ["heather", .85, .35, .4], text: { floor: "heather", small: "gorse", big: "wind-bent birches" },
    small: [P("shrub", { flower: [250, 205, 40], spiky: true })], big: [tree("birch", { lean: .45, scale: .75 }), tree("hawthorn", { minor: true, scale: .7, lean: .45 })] },
  { id: "old-pinewood", name: "Old pinewood", creature: "marten", by: "draft", leaf: .35, floor: ["needles", .07, .4, .3], text: { floor: "pine needles", small: "pine cones", big: "tall old pines with knotholes" },
    small: [P("cones")], big: [tree("pine", { scale: 1.35 }), tree("rowan", { minor: true, scale: .8 })] },
  { id: "ravine", name: "Ravine", creature: "salamander", by: "draft", leaf: .3, floor: ["stone", .3, .3, .32], text: { floor: "wet moss and rock", wall: "rock walls", small: "ferns", big: "mossy boulders", set: "a waterfall" },
    wall: [P("rockwall", { moss: true })], small: [P("fern")], big: [P("boulder", { moss: true, big: true }), P("spire", { sparse: .1 }), P("spire", { sparse: .06, twin: true }), P("stalagmite", { sparse: .1 })], set: P("waterfall") },
  { id: "bluebell-glade", name: "Bluebell glade", creature: "glowworm", by: "draft", leaf: .26, floor: ["bluebells", .27, .45, .4], text: { floor: "bluebells", small: "ferns", big: "beeches" },
    small: [P("fern")], big: [tree("beech", { gnarl: .2, scale: 1.1 }), tree("holly", { minor: true, scale: .7 })] },
  { id: "holly-thicket", name: "Holly thicket", creature: "spider", by: "draft", leaf: .36, floor: ["leaves", .08, .35, .28], text: { floor: "dead leaves", wall: "holly hedges", small: "cobwebs", big: "hollies", set: "a web-hung dead tree" },
    wall: [P("hedge", { berries: true })], small: [P("web")], big: [tree("holly", { scale: .9 }), tree("yew", { minor: true, scale: .7 })], set: tree("broad", { bare: true, webs: true }) },
  { id: "honeysuckle-tangle", name: "Honeysuckle tangle", creature: "dormouse", by: "draft", leaf: .25, floor: ["clover", .27, .45, .45], text: { floor: "grass and clover", wall: "bramble", small: "honeysuckle", big: "hazel coppice" },
    wall: [P("bramble")], small: [P("shrub", { flower: [250, 230, 170] })], big: [tree("hazel", { trunks: 5, scale: .9, thin: true }), tree("rowan", { minor: true, scale: .8 })] }, // a taller coppice, so the area has something tall
];
// Set pieces for the areas that had none (Ed: "Make set pieces for the other areas too"), built in 3D: setpieces.js
for (const [id, [kind, text]] of Object.entries(NEW_SET_PIECES)) { const A = AREAS.find(x => x.id === id); if (A && !A.set) { A.set = P(kind, { three: true }); A.text = { ...A.text, set: text }; } }
export const AREA_BY_ID = Object.fromEntries(AREAS.map(a => [a.id, a]));

// ---------------- layout: how each area's vegetation is arranged (data only) ----------------
// Ed (2026-10-03, via the coordinator): every forest should feel different; much of that comes
// from terrain and how trees are laid out. The prototype's layout engine reads these; each area
// gets a `layout`. Fields:
//   pattern     how the big objects are arranged: scatter (random, even) | groves (clumps with gaps)
//               | rows (lines or an avenue, along `along`) | rings (circles round a centre) | thicket
//               (packed close) | lone (single trees far apart) | stands (tight clumps of one kind
//               on open ground) | edgeOnly (open middle, dense rim)
//   along       for rows: what the rows follow (paths, stream)
//   density     0-1, how full of big objects the area is (1 = as close as they can stand)
//   clump       0-1, even (0) to clustered (1)
//   glades      clearings: count, and their size in metres [min, max]
//   heightMix   share of tree variants per height class (sums to 1); null where the big objects aren't trees
//   undergrowth 0-1, how thick the small objects are
//   lean        the trees' shared lean: dir in degrees (0 east, 90 up the screen), amount 0-1
//   terrain     ground features: stream, pools, rocky, mounds, paths, hollows, ridges
//   decor       world decorations: rate 0-1 (how often an area has one; about rate × 3 per area),
//               and weights over the families ruins, rocks, freak (freak trees), lake, modern (relics), summing to 1
//   feel        one sentence for the prototype builder
const LAYOUT_PATTERNS = ["scatter", "groves", "rows", "rings", "thicket", "lone", "stands", "edgeOnly"];
const LAYOUT_TERRAIN = ["stream", "pools", "rocky", "mounds", "paths", "hollows", "ridges"];
const LAYOUT_DECOR = ["ruins", "rocks", "freak", "lake", "modern"];
const LAY = (pattern, density, clump, glades, heightMix, undergrowth, lean, terrain, decor, feel, extra = {}) => ({
  pattern, ...extra, density, clump, glades: { count: glades[0], size: glades[1] || [0, 0] },
  heightMix: heightMix && { sapling: heightMix[0], mature: heightMix[1], tall: heightMix[2], giant: heightMix[3] },
  undergrowth, lean: { dir: lean[0], amount: lean[1] }, terrain,
  decor: { rate: decor[0], ...Object.fromEntries(LAYOUT_DECOR.map((k, i) => [k, decor[1][i]])) }, feel });
const NO_LEAN = [0, 0];
// decor weights in the order ruins, rocks, freak, lake, modern
export const AREA_LAYOUTS = {
  "moor": LAY("scatter", .2, .6, [2, [14, 24]], null, .7, [30, .2], ["pools", "mounds", "hollows"], [.5, [.3, .4, 0, .3, 0]],
    "Open rolling moss, low mounds and dark pools, long grass combed one way by the wind; you can see a long way."),
  "fern-forest": LAY("groves", .65, .6, [2, [8, 12]], [.2, .5, .25, .05], .9, NO_LEAN, ["hollows", "paths"], [.25, [.4, .3, .3, 0, 0]],
    "Pine groves standing waist-deep in ferns, with green sunken hollows between them."),
  "muddy-forest": LAY("scatter", .7, .3, [1, [6, 9]], [.25, .55, .17, .03], .4, NO_LEAN, ["pools", "paths"], [.3, [.3, .1, .2, .1, .3]],
    "Squelching mud between many-trunked trees, puddled ruts winding through, broken stumps everywhere."),
  "stone-shrine": LAY("rings", .35, .8, [1, [10, 14]], null, .3, NO_LEAN, ["rocky", "mounds"], [.5, [.6, .4, 0, 0, 0]],
    "Big stones stand in rings round the shrine on stony grass; it feels deliberate and old."),
  "tangly-forest": LAY("thicket", .9, .2, [1, [5, 8]], [.35, .55, .1, 0], .9, NO_LEAN, ["hollows"], [.2, [.2, 0, .6, 0, .2]],
    "Short tangled trees packed close over nettles, low and claustrophobic, with one small clearing."),
  "wispy-forest": LAY("stands", .55, .7, [2, [6, 10]], [.15, .45, .3, .1], .5, NO_LEAN, ["ridges"], [.3, [.4, .2, .3, 0, .1]],
    "Stands of thick many-trunked trees, thin wispy saplings drifting between them over dry leaves."),
  "hazel-forest": LAY("rings", .6, .6, [2, [6, 9]], [.3, .55, .12, .03], .5, NO_LEAN, ["mounds", "paths"], [.3, [.4, .3, .3, 0, 0]],
    "Crooked hazels grown in loose fairy rings on short grass, lumpy little mounds in the middle of each."),
  "garden": LAY("rows", .45, 0, [3, [6, 10]], [.1, .7, .2, 0], .6, NO_LEAN, ["paths", "pools"], [.4, [.7, 0, 0, .2, .1]],
    "A lost formal garden: willows in avenues along straight paths, lawns and flower beds, a pavilion at the heart.", { along: "paths" }),
  "twiggy-forest": LAY("scatter", .75, .3, [1, [6, 10]], [.25, .5, .2, .05], .6, [60, .5], ["paths"], [.25, [.3, .2, .3, 0, .2]],
    "Straight many-trunked trees all slanting the same way, like a wood frozen in a gale."),
  "ancient": LAY("lone", .4, .2, [1, [12, 18]], [.05, .35, .4, .2], .4, [150, .25], ["rocky", "mounds", "hollows"], [.45, [.5, .2, .3, 0, 0]],
    "Giant gnarled trees far apart, roots heaving over mossy rocks; every tree is a landmark."),
  "norway": LAY("stands", .8, .5, [1, [8, 12]], [.15, .45, .35, .05], .2, NO_LEAN, ["rocky", "ridges"], [.3, [.2, .6, 0, .2, 0]],
    "Dense stands of straight pines on slate ridges, bare rock between; dark, vertical and cold."),
  "alder-forest": LAY("scatter", .55, .4, [2, [6, 10]], [.2, .4, .35, .05], .6, [120, .35], ["stream", "hollows"], [.3, [.3, .1, .2, .3, .1]],
    "Tall slanted alders at every height over long grass and stumps, a little stream wandering through."),
  "meadow": LAY("lone", .12, .1, [0], [.2, .5, .25, .05], .3, NO_LEAN, ["mounds", "paths"], [.35, [.3, .3, 0, .2, .2]],
    "Wide-open wildflower grass with a lone oak here and there and scattered hawthorn; the sky does the work."),
  "old-oaks": LAY("groves", .5, .5, [2, [10, 16]], [.1, .35, .4, .15], .5, NO_LEAN, ["mounds", "hollows"], [.4, [.5, .1, .4, 0, 0]],
    "Groves of huge hollow oaks with broad clearings of leaf litter between; slow and grand."),
  "berry-thicket": LAY("thicket", .85, .5, [2, [4, 7]], [.2, .4, .35, .05], 1, NO_LEAN, ["paths"], [.15, [.3, 0, .4, 0, .3]],
    "Tall pines over solid berry bushes and brambles, only narrow animal paths and a couple of pockets of space."),
  "wetland": LAY("edgeOnly", .5, .5, [1, [16, 24]], [.25, .55, .15, .05], .8, NO_LEAN, ["pools", "stream"], [.35, [.2, 0, 0, .6, .2]],
    "Open reedy water and mud in the middle, willows crowding the rim; wet and echoing."),
  "stream": LAY("rows", .5, .2, [1, [6, 10]], [.3, .45, .2, .05], .5, NO_LEAN, ["stream", "pools"], [.3, [.3, .3, 0, .3, .1]],
    "Alders lining both banks of a pebbly stream, saplings at the water's edge, open grass away from it.", { along: "stream" }),
  "rocky-slope": LAY("scatter", .35, .6, [1, [8, 12]], [.3, .5, .18, .02], .2, [90, .15], ["rocky", "ridges"], [.5, [.3, .7, 0, 0, 0]],
    "Scree and boulders with pines clinging in clumps, everything leaning slightly uphill."),
  "bog": LAY("stands", .25, .85, [3, [10, 20]], [.4, .5, .1, 0], .6, NO_LEAN, ["pools", "mounds"], [.35, [.2, 0, 0, .5, .3]],
    "Sphagnum and bog pools, stunted spruce in tight dark stands, cotton grass pale between them."),
  "deadwood": LAY("scatter", .25, .2, [2, [8, 14]], [.05, .3, .45, .2], .15, NO_LEAN, ["ridges", "hollows"], [.45, [.3, .1, .3, 0, .3]],
    "Sparse tall blasted snags on bare ridges; bleak, quiet, with long sightlines."),
  "cave-mouth": LAY("edgeOnly", .4, .5, [1, [10, 14]], [.2, .5, .3, 0], .2, NO_LEAN, ["rocky", "ridges"], [.4, [.3, .6, 0, 0, .1]],
    "Rock walls and dead trees ring an open stone floor that leads to the cave's dark mouth."),
  "grassland": LAY("lone", .1, .5, [0], [.3, .5, .2, 0], .2, NO_LEAN, ["mounds"], [.35, [.3, .2, 0, .1, .4]],
    "Short turf to the horizon, molehills, birches alone or in twos and threes."),
  "beaver-pond": LAY("edgeOnly", .55, .4, [1, [14, 20]], [.4, .45, .15, 0], .4, NO_LEAN, ["pools", "stream"], [.4, [.1, 0, 0, .7, .2]],
    "A pond in the middle, young birch and aspen round it, gnawed stumps where the big ones were felled."),
  "log-pile": LAY("groves", .5, .7, [2, [6, 10]], null, .7, NO_LEAN, ["hollows", "mounds"], [.3, [.3, 0, .4, 0, .3]],
    "Rotting logs heaped in piles, fungi everywhere, damp hollows between the heaps."),
  "heath": LAY("scatter", .2, .3, [1, [12, 18]], [.5, .45, .05, 0], .8, [30, .6], ["ridges", "paths"], [.4, [.4, .4, 0, 0, .2]],
    "Purple heather and gorse, small birches bent hard by the wind, all the same way."),
  "old-pinewood": LAY("scatter", .5, .3, [2, [8, 14]], [.1, .35, .4, .15], .15, NO_LEAN, ["mounds", "paths"], [.35, [.4, .3, .3, 0, 0]],
    "Cathedral-tall old pines on a clear floor of needles; you can see between the trunks a long way."),
  "ravine": LAY("edgeOnly", .55, .6, [1, [6, 9]], null, .8, NO_LEAN, ["stream", "ridges", "rocky"], [.4, [.3, .5, 0, .2, 0]],
    "A deep wet cleft: rock walls and mossy boulders either side, ferns, a stream down the middle."),
  "bluebell-glade": LAY("groves", .45, .5, [3, [8, 14]], [.1, .5, .35, .05], .3, NO_LEAN, ["hollows"], [.35, [.4, 0, .3, .3, 0]],
    "Beech groves round open glades carpeted in bluebells; soft, bright and airy."),
  "holly-thicket": LAY("thicket", .9, .3, [1, [6, 9]], [.3, .6, .1, 0], .7, NO_LEAN, ["hollows"], [.25, [.3, 0, .5, 0, .2]],
    "Dark hollies packed close, cobwebs strung between, one clearing round the web-hung tree."),
  "honeysuckle-tangle": LAY("stands", .6, .7, [2, [5, 8]], [.45, .5, .05, 0], .8, NO_LEAN, ["paths", "mounds"], [.3, [.3, 0, .3, 0, .4]],
    "Hazel coppice stools in clumps, honeysuckle and bramble between, clover paths winding through."),
};
for (const a of AREAS) a.layout = AREA_LAYOUTS[a.id];
// Checks a layout's shape; returns a list of problems (empty when it's sound).
export function layoutProblems(a) {
  const y = a.layout, bad = [], in01 = v => typeof v === "number" && v >= 0 && v <= 1, sum1 = o => Math.abs(Object.values(o).reduce((s, v) => s + v, 0) - 1) < 1e-6;
  if (!y) return ["no layout"];
  if (!LAYOUT_PATTERNS.includes(y.pattern)) bad.push("pattern " + y.pattern);
  if (y.pattern === "rows" && !y.along) bad.push("rows without along");
  for (const k of ["density", "clump", "undergrowth"]) if (!in01(y[k])) bad.push(k);
  if (!(y.glades.count >= 0 && y.glades.size[0] <= y.glades.size[1])) bad.push("glades");
  const wooded = (a.big || []).some(([k]) => k === "tree");
  if (wooded !== !!y.heightMix) bad.push(wooded ? "no heightMix" : "heightMix without trees");
  if (y.heightMix && (!sum1(y.heightMix) || !Object.values(y.heightMix).every(in01))) bad.push("heightMix doesn't sum to 1");
  if (!in01(y.lean.amount) || !(y.lean.dir >= 0 && y.lean.dir < 360)) bad.push("lean");
  if (!y.terrain.length || !y.terrain.every(t => LAYOUT_TERRAIN.includes(t))) bad.push("terrain");
  const { rate, ...w } = y.decor; if (!in01(rate) || !sum1(w)) bad.push("decor");
  if (!y.feel || y.feel.length < 20) bad.push("feel");
  return bad;
}
export { LAYOUT_PATTERNS, LAYOUT_TERRAIN, LAYOUT_DECOR };
// Placement rules (Ed, 2026-10-03, via the coordinator): wall objects are drawn only, they do
// not block movement for now; a set piece is rare scenery, shown in only some of an area
// type's areas, for variety. The chance is a starting value for playtesting.
export const WALLS_BLOCK = false;
export const SET_PIECE_CHANCE = .25;

// ---------------- the floor: a tile of the area's ground ----------------
// Materials: BODY ground, BODY2 dark, BELLY light, ACCENT stones, FLOWER flowers, LEAF/LEAF2 green bits.
function floorTile(def, st, W = 64, H = 48) {
  const [kind, hue, sat, val] = def.floor, sp = new Sprite(W, H), seed = def.id.length * 131;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    // noise that wraps at the tile's edges, so tiles repeat without a seam
    const n = (vnoise(x / 7, y / 5, seed) * (W - x) * (H - y) + vnoise((x - W) / 7, y / 5, seed) * x * (H - y) + vnoise(x / 7, (y - H) / 5, seed) * (W - x) * y + vnoise((x - W) / 7, (y - H) / 5, seed) * x * y) / (W * H);
    const m = n < .38 ? M.BODY2 : n > .64 ? M.BELLY : M.BODY;
    sp.px(x, y, m, 0, -.42, .91);
  }
  const r = rng(seed), dot = (x, y, m) => sp.px(((x % W) + W) % W, ((y % H) + H) % H, m, 0, -.42, .91);
  const n = { moss: 0, needles: 70, mud: 25, stony: 30, nettles: 60, leaves: 80, grass: 70, lawn: 30, plants: 60, roots: 30, slate: 40, tallgrass: 90, flowers: 70, pebbles: 60, scree: 70, earth: 15, stone: 40, heather: 90, bluebells: 90, clover: 60 }[kind] ?? 40;
  for (let i = 0; i < n; i++) {
    const x = Math.floor(r() * W), y = Math.floor(r() * H);
    if (kind === "needles") { const d = r() < .5 ? 1 : -1; for (let k = 0; k < 3; k++) dot(x + k * d, y + (k >> 1), r() < .5 ? M.BODY2 : M.ACCENT); }
    else if (["grass", "lawn", "tallgrass", "plants", "nettles", "clover", "flowers", "bluebells", "heather"].includes(kind)) {
      const h = kind === "tallgrass" ? 4 : kind === "lawn" ? 1 : 2;
      for (let k = 0; k < h; k++) dot(x, y - k, k === h - 1 ? M.LEAF2 : M.LEAF);
      if ((kind === "flowers" || kind === "bluebells" || kind === "heather" || kind === "clover") && r() < .5) dot(x + 1, y - h, M.FLOWER);
    }
    else if (["stony", "pebbles", "scree", "slate", "stone", "roots"].includes(kind)) { dot(x, y, M.ACCENT); if (r() < .6) dot(x + 1, y, M.ACCENT); if (r() < .4) dot(x, y + 1, M.BODY2); if (kind === "roots" && r() < .5) for (let k = 0; k < 5; k++) dot(x + k, y + (k > 2 ? 1 : 0), M.TRUNK); }
    else if (kind === "leaves") { dot(x, y, M.FLOWER); dot(x + 1, y, M.FLOWER); if (r() < .5) dot(x, y + 1, M.ACCENT); }
    else if (kind === "mud" || kind === "earth") { for (let k = 0; k < 3; k++) dot(x + k, y, M.BODY2); }
  }
  const flower = { flowers: hsv2rgb(.13, .6, .95), bluebells: [90, 110, 230], heather: [180, 90, 170], clover: [240, 235, 240], leaves: hsv2rgb(hue + .02, .65, .6) }[kind] || hsv2rgb(hue, .3, .6);
  const colours = {
    [M.BODY]: hsv2rgb(hue, sat * st.sat, val), [M.BODY2]: hsv2rgb(hue + .02, sat * st.sat * 1.1, val * .78), [M.BELLY]: hsv2rgb(hue - .02, sat * st.sat * .9, Math.min(1, val * 1.15)),
    [M.ACCENT]: kind === "needles" ? hsv2rgb(.07, .5, .5) : hsv2rgb(.1, .08, .62), [M.FLOWER]: flower, [M.LEAF]: hsv2rgb(def.leaf, .55 * st.sat, .45), [M.LEAF2]: hsv2rgb(def.leaf - .03, .5 * st.sat, .62), [M.TRUNK]: hsv2rgb(st.trunkHue, .4, .3),
  };
  return { sp, colours };
}

// ---------------- the prop library ----------------
const stoneCol = (moss) => ({ [M.ACCENT]: hsv2rgb(.1, .06, .6), [M.BODY2]: hsv2rgb(.62, .08, .4), [M.BELLY]: hsv2rgb(.1, .05, .78), [M.LEAF]: hsv2rgb(.27, .5, .45), [M.LEAF2]: hsv2rgb(.25, .45, .62), [M.NOSE]: [20, 16, 24], ...(moss ? {} : {}) });
function rock(sp, c, rx, ry, st, r, moss) { // a lumpy stone, lit above, mossy on top if asked
  const pts = []; for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2, k = 1 + (r() - .5) * .3; pts.push([c[0] + Math.cos(a) * rx * k, c[1] + Math.sin(a) * ry * k * (Math.sin(a) > 0 ? .5 : 1)]); }
  sp.shape(pts, M.ACCENT, { group: 5, line: true, round: st.round });
  sp.mark([add(c, [-rx, ry * .1]), add(c, [rx, ry * .1]), add(c, [rx, ry]), add(c, [-rx, ry])], M.BODY2, [M.ACCENT]);
  sp.mark([add(c, [-rx * .6, -ry * .8]), add(c, [rx * .1, -ry * 1.1]), add(c, [rx * .3, -ry * .5]), add(c, [-rx * .3, -ry * .3])], M.BELLY, [M.ACCENT]);
  if (moss) sp.mark(tufts([add(c, [-rx * 1.1, -ry * .55]), add(c, [0, -ry * 1.3]), add(c, [rx * 1.1, -ry * .5]), add(c, [rx * .6, -ry * .2]), add(c, [-rx * .6, -ry * .2])], 0, 3, 3, ry * .15, 1), M.LEAF, [M.ACCENT, M.BELLY, M.BODY2]);
}
// Each returns { sp, colours }; s scales to the pixel size.
function prop(kind, o, def, st, r, s) {
  if (TALL_KINDS.includes(kind)) return tallPiece(kind, o, def, st, r); // the tall pieces (tall.js): 3D, at the witch's scale
  const leafCol = { [M.LEAF]: hsv2rgb(def.leaf, .6 * st.sat, .55), [M.LEAF2]: hsv2rgb(def.leaf - .05, .55 * st.sat, .78), [M.LEAF3]: hsv2rgb(def.leaf + .03, .66 * st.sat, .36) };
  const wood = { [M.TRUNK]: hsv2rgb(st.trunkHue, .45 * st.sat, .34), [M.BARKD]: hsv2rgb(st.trunkHue + .03, .5 * st.sat, .17), [M.BARKL]: hsv2rgb(st.trunkHue - .01, .38 * st.sat, .5), [M.BELLY]: hsv2rgb(st.trunkHue + .02, .3, .7) };
  const water = { [M.MAGIC]: [60, 110, 150], [M.MAGIC2]: [150, 200, 220], [M.BODY2]: [35, 70, 100] };
  if (kind === "tree") {
    const f = (setPlant(o.type, st) || treeSpecies(o.type)).fn;
    const ts = { ...st, leafHue: def.leaf + (o.dark ? .05 : 0), gnarl: o.gnarl ?? st.gnarl, treeBare: o.bare, treeTrunks: o.trunks, treeLean: o.lean, treeThick: o.thick, treeThin: o.thin, treeHollow: o.hollow, treeWebs: o.webs };
    const t = f(r, ts, st.treeSize * s * (o.scale || 1) * uni(r, .9, 1.1));
    const c = treeColours(r, ts, f); if (o.dark) { c[M.LEAF] = c[M.LEAF3]; c[M.LEAF3] = hsv2rgb(def.leaf + .05, .7, .22); }
    c[M.NOSE] = [20, 16, 24]; c[M.WEB] = [225, 225, 232];
    return { sp: t.sp, colours: c };
  }
  if (kind === "shrub") { // a leafy bush, flowering or berried
    const b = bush(r, { ...st, leafHue: def.leaf, bushSize: st.bushSize * s, flowers: 1 });
    for (let i = 0; i < b.sp.m.length; i++) if (b.sp.m[i] && hash2(i, 1, 3) < (o.spiky ? .18 : .1) && b.sp.m[i] !== M.TRUNK) b.sp.m[i] = M.FLOWER;
    b.colours[M.FLOWER] = o.flower; return b;
  }
  const W = Math.round(48 * s * (o.w || 1)), H = Math.round(32 * s), sp = new Sprite(W, H), cx = W / 2, gy = H;
  let colours = {};
  if (kind === "grass" || kind === "reeds" || kind === "fern" || kind === "flowers" || kind === "flowerbed") {
    const n = kind === "flowerbed" ? 40 : 24, hgt = (kind === "reeds" ? (o.tall ? 26 : 20) : kind === "fern" ? 14 : 10 * (o.h || 1)) * s;
    if (kind === "flowerbed") sp.shape([[cx - 20 * s, gy - 2], [cx - 18 * s, gy - 6 * s], [cx + 18 * s, gy - 6 * s], [cx + 20 * s, gy - 2], [cx + 20 * s, gy], [cx - 20 * s, gy]], M.ACCENT, { group: 2, line: true });
    for (let k = 0; k < n; k++) {
      const x0 = cx + uni(r, -16, 16) * s, h = hgt * uni(r, .5, 1), lean = kind === "fern" ? uni(r, -6, 6) * s : uni(r, -2, 2) * s, y0 = gy - 1 - (kind === "flowerbed" ? 5 * s : 0);
      for (let j = 0; j < h; j++) { const t = j / h; sp.px(x0 + lean * t * t, y0 - j, t > .7 ? M.LEAF2 : t < .3 ? M.LEAF3 : M.LEAF, lean * .05, -.3, .9); if (kind === "fern" && j % 2) sp.px(x0 + lean * t * t + (lean > 0 ? 1 : -1), y0 - j + 1, M.LEAF2, 0, -.3, .9); }
      if (kind === "reeds" && (o.cotton ? true : r() < .5)) for (let j = 0; j < (o.cotton ? 2 : 3); j++) sp.px(x0 + lean, y0 - h - j, o.cotton ? M.WEB : M.TRUNK, 0, -.5, .85);
      if ((kind === "flowers" || kind === "flowerbed") && r() < .7) { sp.px(x0 + lean, y0 - h, M.FLOWER, 0, -.5, .85); sp.px(x0 + lean + 1, y0 - h, M.FLOWER, 0, -.5, .85); }
    }
    colours = { ...leafCol, [M.FLOWER]: kind === "flowerbed" ? pick(r, [[230, 80, 120], [250, 210, 60], [150, 110, 230]]) : hsv2rgb(o.hue ?? .95, .6, .85), [M.TRUNK]: hsv2rgb(.07, .5, .35), [M.WEB]: [240, 240, 235], [M.ACCENT]: hsv2rgb(.08, .1, .55) };
    if (kind === "flowerbed") { for (let i = 0; i < sp.m.length; i++) if (sp.m[i] === M.FLOWER && hash2(i, 2, 7) < .5) sp.m[i] = M.BELLY; colours[M.BELLY] = [250, 245, 240]; } // some white flowers among the coloured (lit: flowers never glow)
  } else if (kind === "stones") {
    for (let k = 0; k < (o.big ? 3 : 6); k++) rock(sp, [cx + uni(r, -14, 14) * s, gy - (o.big ? 5 : 2.5) * s], (o.big ? 6 : 3) * s * uni(r, .7, 1.2), (o.big ? 5 : 2.5) * s, st, r);
    colours = stoneCol();
  } else if (kind === "boulder") {
    rock(sp, [cx, gy - (o.big ? 11 : 8) * s], (o.big ? 18 : 13) * s, (o.big ? 12 : 9) * s, st, r, o.moss);
    colours = { ...stoneCol(), ...leafCol, [M.ACCENT]: hsv2rgb(.1, .06, .6) };
  } else if (kind === "henge") { // a standing stone, mossy
    sp.shape([[cx - 7 * s, gy], [cx - 8 * s, gy - 18 * s], [cx - 4 * s, gy - 28 * s], [cx + 5 * s, gy - 27 * s], [cx + 8 * s, gy - 14 * s], [cx + 7 * s, gy]], M.ACCENT, { group: 5, line: true, round: st.round });
    sp.mark([[cx - 9 * s, gy - 30 * s], [cx + 9 * s, gy - 30 * s], [cx + 9 * s, gy - 22 * s], [cx - 9 * s, gy - 18 * s]], M.LEAF, [M.ACCENT]);
    colours = { ...stoneCol(), ...leafCol };
  } else if (kind === "mound") { // moss mounds, molehills, brown lumps
    const w = (o.small ? 8 : 14) * s, h = (o.small ? 5 : 8) * s;
    sp.shape(tufts([[cx - w, gy], [cx - w * .6, gy - h * .8], [cx, gy - h], [cx + w * .6, gy - h * .8], [cx + w, gy]], 0, 4, o.moss ? 3 : 1, (o.moss ? 1.5 : .8) * s, 1), o.moss ? M.LEAF : M.TRUNK, { group: 5, round: st.round });
    sp.mark([[cx - w, gy - h * .45], [cx + w, gy - h * .45], [cx + w, gy], [cx - w, gy]], o.moss ? M.LEAF3 : M.BARKD, [o.moss ? M.LEAF : M.TRUNK]);
    colours = { ...leafCol, ...wood, [M.TRUNK]: hsv2rgb(.07, .45, o.brown ? .35 : .3) };
  } else if (kind === "stump") {
    const w = 6 * s;
    sp.limb([[cx, gy, w * 2.2], [cx, gy - 8 * s, w * 1.6]], M.TRUNK, { group: 5, round: st.round, cap: 0, capEnd: 0 });
    sp.shape([[cx - w * .8, gy - 8 * s], [cx, gy - 10 * s - (o.gnawed ? 4 * s : 0)], [cx + w * .8, gy - 8 * s], [cx, gy - 7 * s]], M.BELLY, { group: 6, round: st.round });
    if (o.snag) sp.limb([[cx + w * .4, gy - 8 * s, 2.5 * s], [cx + w * 1.6, gy - 15 * s, 1.5 * s]], M.TRUNK, { group: 7, round: st.round });
    if (o.grass) for (let k = 0; k < 20; k++) { const x0 = cx + uni(r, -14, 14) * s, h = uni(r, 6, 13) * s; for (let j = 0; j < h; j++) sp.px(x0, gy - 1 - j, j > h * .6 ? M.LEAF2 : M.LEAF, 0, -.3, .9); }
    colours = { ...leafCol, ...wood };
  } else if (kind === "log") { // fallen branches, rotting logs, a fallen giant
    const L = (o.giant ? 46 : o.branch ? 18 : 30) * s, th = (o.giant ? 14 : o.branch ? 3 : 8) * s;
    sp.limb([[cx - L / 2, gy - th / 2, th], [cx + L / 2, gy - th / 2 - (o.branch ? 2 * s : 0), th * .9]], M.TRUNK, { group: 5, round: st.round, cap: .3, capEnd: .3 });
    if (!o.branch) sp.shape([[cx + L / 2 - th * .1, gy - th], [cx + L / 2 + th * .2, gy - th / 2], [cx + L / 2 - th * .1, gy], [cx + L / 2 - th * .3, gy - th / 2]], M.BELLY, { group: 6, round: st.round });
    if (o.rot) for (let k = 0; k < (o.giant ? 6 : 3); k++) { const x = cx + uni(r, -L / 2, L / 3); sp.shape([[x - 3 * s, gy - th * .9], [x, gy - th - 3 * s], [x + 3 * s, gy - th * .9]], M.FLOWER, { group: 7, line: true, round: st.round }); }
    if (o.branch) sp.limb([[cx, gy - th, th * .7], [cx + 5 * s, gy - th - 6 * s, th * .4]], M.TRUNK, { group: 6, round: st.round });
    colours = { ...wood, [M.FLOWER]: [230, 190, 120] };
  } else if (kind === "fungi") {
    for (let k = 0; k < 5; k++) { const x = cx + uni(r, -12, 12) * s, h = uni(r, 3, 7) * s, w = uni(r, 3, 5) * s; sp.limb([[x, gy, 1.6 * s], [x, gy - h, 1.4 * s]], M.BELLY, { group: 5 }); sp.shape([[x - w, gy - h], [x, gy - h - w * .8], [x + w, gy - h]], k % 2 ? M.FLOWER : M.MAGIC, { group: 6 + k % 2, line: true, round: st.round }); }
    colours = { [M.BELLY]: [225, 215, 195], [M.FLOWER]: [190, 80, 50], [M.MAGIC]: [120, 230, 200] };
  } else if (kind === "cones") {
    for (let k = 0; k < 6; k++) { const x = cx + uni(r, -14, 14) * s, y = gy - 2 * s; sp.ellipse(x, y, (o.acorn ? 1.6 : 2) * s, (o.acorn ? 2 : 2.8) * s, M.TRUNK, { round: st.round }); if (o.acorn) sp.ellipse(x, y - 1.6 * s, 1.8 * s, 1 * s, M.BARKD, { round: st.round }); else sp.px(x, y - 1, M.BARKL); }
    colours = wood;
  } else if (kind === "water") { // a puddle, pond, bog pool or stream, flat on the ground
    const w = 22 * s * (o.w || 1), h = 6 * s;
    sp.shape([[cx - w, gy - h], [cx - w * .3, gy - h * 1.5], [cx + w * .6, gy - h * 1.2], [cx + w, gy - h * .5], [cx + w * .4, gy], [cx - w * .7, gy - h * .2]], M.MAGIC, { group: 5, round: .2 });
    for (let k = 0; k < 6; k++) { const x = cx + uni(r, -w * .6, w * .6), y = gy - h * uni(r, .4, 1.1); for (let j = 0; j < 3 * s; j++) sp.recolour(x + j, y, M.MAGIC2); }
    colours = o.bog ? { [M.MAGIC]: [60, 70, 50], [M.MAGIC2]: [120, 130, 90] } : water;
    // water reflects rather than glows: bake marks MAGIC as glowing, so use plain materials
    for (let i = 0; i < sp.m.length; i++) if (sp.m[i] === M.MAGIC) sp.m[i] = M.BODY; else if (sp.m[i] === M.MAGIC2) sp.m[i] = M.BELLY;
    colours = { [M.BODY]: colours[M.MAGIC], [M.BELLY]: colours[M.MAGIC2] };
  } else if (kind === "bramble" || kind === "hedge") {
    const w = 22 * s, h = (kind === "hedge" ? 18 : 12) * s;
    for (let k = 0; k < (kind === "hedge" ? 6 : 4); k++) { const x = cx + uni(r, -w * .8, w * .8), y = gy - h * uni(r, .4, .7); sp.ellipse(x, y, uni(r, 6, 9) * s, h * .45, kind === "hedge" ? M.LEAF3 : M.LEAF, { round: st.round, density: o.bare ? .5 : .95, noise: .5, seed: k }); }
    for (let k = 0; k < 8; k++) { const x0 = cx + uni(r, -w, w); let x = x0, y = gy; for (let j = 0; j < h * 1.2; j++) { x += Math.sin(j * .3 + k) * .8; y -= .8; sp.px(x, y, M.TRUNK, 0, -.3, .9); } }
    if (kind === "hedge" || o.berries || kind === "bramble") for (let i = 0; i < sp.m.length; i++) if (sp.m[i] && sp.m[i] !== M.TRUNK && hash2(i, 5, 9) < .05) sp.m[i] = M.FLOWER;
    colours = { ...leafCol, ...wood, [M.FLOWER]: kind === "hedge" ? [210, 30, 40] : [70, 30, 70] };
  } else if (kind === "wall") { // an ornate stone wall: coped, with a ball on a pier
    const w = 22 * s, h = 12 * s;
    sp.shape([[cx - w, gy], [cx - w, gy - h], [cx + w, gy - h], [cx + w, gy]], M.ACCENT, { group: 5, line: true, depth: 2 });
    sp.shape([[cx - w - 1, gy - h], [cx - w - 1, gy - h - 2 * s], [cx + w + 1, gy - h - 2 * s], [cx + w + 1, gy - h]], M.BELLY, { group: 6, line: true, depth: 2 });
    sp.shape([[cx + w - 6 * s, gy - h - 2 * s], [cx + w - 6 * s, gy - h - 7 * s], [cx + w, gy - h - 7 * s], [cx + w, gy - h - 2 * s]], M.ACCENT, { group: 7, line: true, depth: 2 });
    sp.ellipse((cx + w - 3 * s), gy - h - 9 * s, 3 * s, 2.5 * s, M.BELLY, { round: st.round });
    for (let y = gy - h + 3 * s; y < gy; y += 4 * s) for (let x = cx - w; x < cx + w; x++) sp.recolour(x, y, M.BODY2);
    colours = stoneCol();
  } else if (kind === "rockwall") {
    for (let k = 0; k < 5; k++) rock(sp, [cx + (k - 2) * 9 * s, gy - uni(r, 8, 14) * s], 8 * s, 10 * s, st, r, o.moss);
    colours = { ...stoneCol(), ...leafCol };
  } else if (kind === "stalagmite") {
    for (let k = 0; k < 4; k++) { const x = cx + uni(r, -14, 14) * s, h = uni(r, 5, 11) * s; sp.shape([[x - 3 * s, gy], [x - 1 * s, gy - h], [x + 1 * s, gy - h], [x + 3 * s, gy]], M.ACCENT, { group: 5, line: true, round: st.round }); }
    colours = stoneCol();
  } else if (kind === "web") {
    const c = [cx, gy - 14 * s], R = 11 * s;
    for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; for (let j = 0; j < R; j++) sp.px(c[0] + Math.cos(a) * j, c[1] + Math.sin(a) * j, M.WEB, 0, 0, 1); }
    for (let ring = 3 * s; ring < R; ring += 3 * s) for (let a = 0; a < Math.PI * 2; a += .05) sp.px(c[0] + Math.cos(a) * ring, c[1] + Math.sin(a) * ring, M.WEB, 0, 0, 1);
    colours = { [M.WEB]: [225, 230, 240] };
  }
  return { sp, colours };
}

// Set pieces: one per area that has one, bigger than the props.
function setPiece(kind, o, def, st, r, s) {
  if (o.three) return setPiece3d(kind, def, st);
  if (kind === "tree" || kind === "log") return prop(kind, o, def, st, r, s);
  const W = Math.round(90 * s), H = Math.round(70 * s), sp = new Sprite(W, H), cx = W / 2, gy = H;
  let colours = { ...stoneCol(), [M.LEAF]: hsv2rgb(def.leaf, .55, .5), [M.LEAF2]: hsv2rgb(def.leaf - .04, .5, .7), [M.TRUNK]: hsv2rgb(st.trunkHue, .45, .34), [M.BARKD]: hsv2rgb(st.trunkHue + .03, .5, .17), [M.MAGIC]: hsv2rgb(st.magicHue, .6, 1), [M.MAGIC2]: hsv2rgb(st.magicHue, .2, 1) };
  if (kind === "shrine") { // a stone plinth with a little roofed niche and a glowing offering
    sp.shape([[cx - 16 * s, gy], [cx - 14 * s, gy - 6 * s], [cx + 14 * s, gy - 6 * s], [cx + 16 * s, gy]], M.ACCENT, { group: 5, line: true, depth: 2 });
    sp.shape([[cx - 9 * s, gy - 6 * s], [cx - 9 * s, gy - 26 * s], [cx + 9 * s, gy - 26 * s], [cx + 9 * s, gy - 6 * s]], M.ACCENT, { group: 6, line: true, depth: 2 });
    sp.shape([[cx - 5 * s, gy - 10 * s], [cx - 5 * s, gy - 20 * s], [cx, gy - 23 * s], [cx + 5 * s, gy - 20 * s], [cx + 5 * s, gy - 10 * s]], M.NOSE, { group: 7 });
    sp.shape([[cx - 13 * s, gy - 26 * s], [cx, gy - 34 * s], [cx + 13 * s, gy - 26 * s]], M.BODY2, { group: 8, line: true, depth: 2 });
    sp.ellipse(cx, gy - 13 * s, 2.5 * s, 2.5 * s, M.MAGIC2, { round: .5 });
    sp.mark([[cx - 14 * s, gy - 36 * s], [cx + 2 * s, gy - 36 * s], [cx - 4 * s, gy - 24 * s], [cx - 14 * s, gy - 24 * s]], M.LEAF, [M.BODY2, M.ACCENT]);
  } else if (kind === "pavilion") { // columns under a domed roof
    sp.shape([[cx - 26 * s, gy], [cx - 26 * s, gy - 4 * s], [cx + 26 * s, gy - 4 * s], [cx + 26 * s, gy]], M.ACCENT, { group: 5, line: true, depth: 2 });
    for (const x of [-20, -7, 7, 20]) sp.limb([[cx + x * s, gy - 4 * s, 4 * s], [cx + x * s, gy - 34 * s, 4 * s]], x === -7 || x === 7 ? M.BODY2 : M.BELLY, { group: 6 + (x > 0 ? 1 : 0), line: true, cap: 0, capEnd: 0 });
    sp.shape([[cx - 28 * s, gy - 34 * s], [cx - 28 * s, gy - 38 * s], [cx + 28 * s, gy - 38 * s], [cx + 28 * s, gy - 34 * s]], M.ACCENT, { group: 8, line: true, depth: 2 });
    sp.shape([[cx - 24 * s, gy - 38 * s], [cx - 16 * s, gy - 54 * s], [cx, gy - 60 * s], [cx + 16 * s, gy - 54 * s], [cx + 24 * s, gy - 38 * s]], M.BELLY, { group: 9, line: true });
  } else if (kind === "bridge") { // a fallen log over a stream
    const w = prop("water", { w: 1.8 }, def, st, r, s);
    for (let i = 0; i < w.sp.m.length; i++) { const x = i % w.sp.w, y = (i / w.sp.w) | 0, X = Math.round(cx - w.sp.w / 2 + x), Y = gy - w.sp.h + y; if (w.sp.m[i] && sp.inb(X, Y)) sp.px(X, Y, w.sp.m[i] === M.BODY ? M.IRIS : M.PUPIL, 0, -.42, .91); }
    sp.limb([[cx - 34 * s, gy - 6 * s, 9 * s], [cx + 34 * s, gy - 10 * s, 8 * s]], M.TRUNK, { group: 6, line: true, cap: .3, capEnd: .3 });
    colours[M.IRIS] = [60, 110, 150]; colours[M.PUPIL] = [150, 200, 220];
  } else if (kind === "outcrop") {
    for (const [x, y, rx, ry] of [[-18, 14, 16, 13], [12, 12, 18, 12], [-2, 28, 15, 13], [16, 34, 9, 9]]) rock(sp, [cx + x * s, gy - y * s], rx * s, ry * s, st, r, true);
  } else if (kind === "cave") { // a mound of rock with a dark mouth
    for (const [x, y, rx, ry] of [[-26, 16, 16, 15], [26, 16, 16, 15], [0, 40, 30, 18], [-12, 30, 14, 12], [12, 30, 14, 12]]) rock(sp, [cx + x * s, gy - y * s], rx * s, ry * s, st, r, y > 30);
    sp.shape([[cx - 15 * s, gy], [cx - 14 * s, gy - 18 * s], [cx - 4 * s, gy - 28 * s], [cx + 6 * s, gy - 27 * s], [cx + 14 * s, gy - 16 * s], [cx + 15 * s, gy]], M.NOSE, { group: 9, line: true });
  } else if (kind === "dam") { // a heap of gnawed sticks holding back the water
    const w = prop("water", { w: 1.9 }, def, st, r, s);
    for (let i = 0; i < w.sp.m.length; i++) { const x = i % w.sp.w, y = (i / w.sp.w) | 0, X = Math.round(cx - w.sp.w / 2 + x), Y = gy - w.sp.h + y - 10 * s; if (w.sp.m[i] && sp.inb(X, Y)) sp.px(X, Y, w.sp.m[i] === M.BODY ? M.IRIS : M.PUPIL, 0, -.42, .91); }
    for (let k = 0; k < 26; k++) { const x = cx + uni(r, -32, 32) * s, y = gy - uni(r, 2, 14) * s, a = uni(r, -.5, .5), L = uni(r, 8, 16) * s; sp.limb([[x - Math.cos(a) * L / 2, y - Math.sin(a) * L / 2, 2.6 * s], [x + Math.cos(a) * L / 2, y + Math.sin(a) * L / 2, 2 * s]], k % 3 ? M.TRUNK : M.BARKD, { group: 6 + k % 2, line: true }); }
    colours[M.IRIS] = [60, 110, 150]; colours[M.PUPIL] = [150, 200, 220];
  } else if (kind === "waterfall") { // a rock face with water falling into a pool
    for (const [x, y, rx, ry] of [[-22, 30, 18, 30], [22, 30, 18, 30], [0, 56, 20, 12]]) rock(sp, [cx + x * s, gy - y * s], rx * s, ry * s, st, r, true);
    for (let x = cx - 6 * s; x < cx + 6 * s; x++) for (let y = gy - 50 * s; y < gy - 4 * s; y++) sp.px(x, y, hash2(x | 0, (y / 3) | 0, 4) < .3 ? M.PUPIL : M.IRIS, 0, -.2, .98);
    sp.shape([[cx - 18 * s, gy], [cx - 14 * s, gy - 6 * s], [cx + 14 * s, gy - 6 * s], [cx + 18 * s, gy]], M.IRIS, { group: 10, round: .2 });
    colours[M.IRIS] = [90, 150, 190]; colours[M.PUPIL] = [210, 235, 245];
  }
  return { sp, colours };
}

// Bakes everything one area type needs, at the style's pixel size.
export function areaAssets(id, st, { K = 2 / (st.pixel || 2), makeCanvas = defaultCanvas } = {}) {
  const def = setArea(AREA_BY_ID[id], st); if (!def) throw new Error(`no area type "${id}"`); // with its art set's changes (art/genome/next.js), if any
  const r = rng(id.split("").reduce((a, c) => a * 31 + c.charCodeAt(0), 7) >>> 0);
  const bk = (p, kind, text) => ({ sp: bake(p.sp, p.colours, st, "none", makeCanvas), kind, text });
  const ft = floorTile(def, st);
  const col = list => (list || []).map(([kind, o]) => { const p = prop(kind, o, def, st, r, K), b = bk(p, kind, ""); if (SWAYING_PROPS.has(kind)) b.sway = bakeSway(p.sp, makeCanvas); if (p.metres) b.metres = p.metres; if (o.sparse) b.sparse = o.sparse; return b; }); // leafy props carry their sway mask; tall pieces their size and how sparse they stand
  const out = { def, floor: { sp: bake(ft.sp, ft.colours, st, "none", makeCanvas), kind: def.floor[0], text: def.text.floor }, walls: col(def.wall), small: col(def.small), big: col(def.big), setPiece: null };
  out.walls.forEach(a => a.text = def.text.wall); out.small.forEach(a => a.text = def.text.small); out.big.forEach(a => a.text = def.text.big);
  if (def.set) { const sp0 = setPiece(def.set[0], def.set[1], def, st, r, K); out.setPiece = { ...bk(sp0, def.set[0], def.text.set), metres: sp0.metres, origin: sp0.origin }; } // the new 3D ones: their size, and where their middle on the ground lands
  return out;
}

// ================= tree variants across a range of heights =================
// Ed: "more tree variants that are different heights", so the canopy is not a flat lid. Each area
// whose big objects are trees gets about ten variants of its own recipe, across four height
// classes (scale is relative to the area's ordinary tree): saplings (slimmer, sparser), mature
// trees, tall trees (taller trunks, crowns higher and a bit larger) and a rare emergent giant that
// pokes above the canopy. Each keeps its area's character: firs grow tall and narrow, willows wider
// rather than taller, dead trees into tall snags.
export const TREE_HEIGHT_CLASSES = [
  { id: "sapling", range: [.45, .7], weight: .25, count: 3 },
  { id: "mature", range: [.85, 1.15], weight: .5, count: 4 },
  { id: "tall", range: [1.3, 1.6], weight: .2, count: 2 },
  { id: "giant", range: [1.8, 2.2], weight: .05, count: 1 },
];
export const ART_PIXELS_PER_METRE = 16; // the prototype's (config/tuning.json, artPixelsPerMetre)
// An area's tree variants, baked: [{ heightClass, scale, weight (a share of the area's trees),
// whole, top, bot (the crown and the trunk below it, for the cut-out), crownY (px from the top),
// metres: { height, crownBase, crownHeight, crownRadius } }]. Empty when its big objects are not
// trees (mounds, boulders). ppm: art pixels per metre, for the metres.
export function areaTreeVariants(id, st, { K = 2 / (st.pixel || 2), makeCanvas = defaultCanvas, ppm = ART_PIXELS_PER_METRE, flora = null } = {}) {
  const def = setArea(AREA_BY_ID[id], st); if (!def) throw new Error(`no area type "${id}"`); // with its art set's changes (art/genome/next.js), if any
  const recipes = (def.big || []).filter(([kind]) => kind === "tree").map(([, o]) => o);
  let mains = recipes.filter(o => !o.minor), minors = recipes.filter(o => o.minor);
  if (flora?.length && recipes.length) { mains = flora.map(type => ({ type })); minors = []; } // a flora preview (?flora=): these species instead of the area's own
  if (!recipes.length) return [];
  const seed = id.split("").reduce((a, c) => a * 31 + c.charCodeAt(0), 11) >>> 0, out = [];
  let n = 0;
  for (const cls of TREE_HEIGHT_CLASSES) for (let i = 0; i < cls.count; i++, n++) {
    const o = minors.length && (n === 2 || n === 6) ? minors[(n === 6 ? 1 : 0) % minors.length] : mains[n % mains.length], /* a minor species: one sapling and one mature tree of the ten */ S = setPlant(o.type, st) || treeSpecies(o.type), f = S.fn, r = rng(seed * 7 + n * 131 + 3);
    const h = cls.count > 1 ? cls.range[0] + (cls.range[1] - cls.range[0]) * i / (cls.count - 1) : (cls.range[0] + cls.range[1]) / 2;
    const sapling = cls.id === "sapling", big = cls.id === "tall" || cls.id === "giant";
    // its character (the species' grow): willows widen rather than grow; narrow kinds (firs, pines, birches, alders,
    // larches) stay narrow as they grow; wide kinds (oak, yew, sycamore, chestnut) spread more than they rise; small
    // kinds (hawthorn, rowan, hazel) stay small; dead trees grow into tall snags; saplings are slim
    const g = S.grow, willow = g === "willow", narrow = g === "narrow" || o.bare, wide = g === "wide", small = g === "small";
    const scale = willow ? 1 + (h - 1) * .45 : small ? 1 + (h - 1) * .5 : wide ? 1 + (h - 1) * .75 : h;
    const width = (sapling ? .78 : 1) * (willow ? 1 + Math.max(0, h - 1) * .55 : wide ? 1 + Math.max(0, h - 1) * .45 : narrow && big ? (o.bare ? .6 : .85) : big ? 1.06 : 1);
    const ts = { ...st, crownWidth: (st.crownWidth || 3) * width, leafHue: def.leaf + (o.dark ? .05 : 0), gnarl: Math.min(1, (o.gnarl ?? st.gnarl) + (cls.id === "giant" ? .2 : 0)),
      treeBare: o.bare, treeTrunks: sapling ? 1 : o.trunks, treeLean: o.lean, treeThick: sapling ? undefined : big && o.thick ? o.thick * 1.1 : o.thick, treeThin: sapling || o.thin, treeHollow: big && o.hollow, treeWebs: o.webs };
    const t = f(r, ts, st.treeSize * K * (o.scale || 1) * scale * uni(r, .95, 1.05));
    const c = treeColours(r, ts, f); if (o.dark) { c[M.LEAF] = c[M.LEAF3]; c[M.LEAF3] = hsv2rgb(def.leaf + .05, .7, .22); }
    c[M.NOSE] = [20, 16, 24]; c[M.WEB] = [225, 225, 232];
    const parts = splitTree(t), bk = sp => bake(sp, c, st, "none", makeCanvas), sw = sp => bakeSway(sp, makeCanvas), m = px => +(px / ppm).toFixed(2);
    out.push({ heightClass: cls.id, species: o.type, scale: +scale.toFixed(2), weight: +(cls.weight / cls.count).toFixed(4), whole: bk(t.sp), top: bk(parts.top), bot: bk(parts.bot), sway: { whole: sw(t.sp), top: sw(parts.top), bot: sw(parts.bot) }, crownY: t.crownY,
      metres: { height: m(t.sp.h), crownBase: m(t.sp.h - t.crownY), crownHeight: m(t.crownY), crownRadius: m(t.sp.w / 2) } });
  }
  return out;
}

// ================= light sources (campfires, magic stones, ponds) =================
// Drawn in 3D at the creatures' three-quarter angle. Glowing pixels are emissive (alpha 254).
const fireCol = { [M.ACCENT]: [150, 145, 140], [M.BODY2]: [95, 92, 100], [M.TRUNK]: [110, 70, 40], [M.BARKD]: [60, 38, 24], [M.MAGIC]: [255, 130, 40], [M.MAGIC2]: [255, 228, 120], [M.NOSE]: [30, 24, 26] };
function campfire(frame) {
  const m = new Model({ blend: .02 });
  for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2; m.ell([Math.cos(a) * .32, .05, Math.sin(a) * .32], [.09, .06, .08], i % 3 ? M.ACCENT : M.BODY2, { dir: [-Math.sin(a), 0, Math.cos(a)], group: 1 + i }); }
  m.seg([-.22, .06, -.12], [.22, .1, .12], .05, .045, M.TRUNK, { group: 20, paint: p => p[0] > .12 ? M.BARKD : undefined });
  m.seg([-.2, .1, .14], [.2, .06, -.14], .05, .045, M.TRUNK, { group: 21, paint: p => p[0] < -.12 ? M.BARKD : undefined });
  const h = [[.42, .3, .34], [.36, .4, .28], [.46, .32, .38]][frame % 3];
  [[-.05, 0, h[0]], [.08, .06, h[1]], [-.02, -.08, h[2]]].forEach(([x, z, hh], i) => m.flat([x, .1 + hh * .5, z], [1, 0, .3], [((frame + i) % 3 - 1) * .1, 1, 0], hh * .38, hh * .5, masks.flame(M.MAGIC, M.MAGIC2), { group: 30 + i, bend: .1 }));
  const sp = render(m, { height: 34 }).sp;
  for (let i = 0; i < 4; i++) { const x = Math.floor(sp.w / 2 + Math.sin(i * 2.3 + frame) * sp.w * .25), y = Math.floor(sp.h * (.12 + i * .08)); if (!sp.get(x, y)) sp.px(x, y, M.MAGIC2); } // embers
  return sp;
}
const STONE_GLOW = { cyan: [[70, 230, 255], [200, 250, 255]], violet: [[190, 100, 255], [235, 210, 255]], green: [[90, 255, 140], [215, 255, 220]] };
// A rune stone: a grey standing slab, taller than wide, its flatter face turned to the viewer,
// cracked and weathered, with moss and grass at its foot and one bold glowing rune carved into
// its face (the same glyphs as the soundsystem's runes), and a few motes drifting round it.
// sigil: a creature's id, to carve its sigil (sigils.js) instead of a generic rune.
function magicStone(variant, sigil) {
  const m = new Model({ blend: .04 }), k = Object.keys(STONE_GLOW).indexOf(variant), fz = .08, A = .4; // A: turned so its face is nearly square to the viewer
  // its own axes: across, up (leaning back a little, so the face catches the moon), out of the face
  const ax = [Math.cos(A), 0, -Math.sin(A)], az = v3.norm([Math.sin(A), .22, Math.cos(A)]), ay = v3.norm(v3.cross(az, ax)), C = [0, .46, 0];
  // two jagged cracks: one down from the worn top, one up from the foot
  const cracks = [[[.2 - k * .05, .92], [.14, .8], [.19, .7], [.12, .58]], [[-.22 + k * .03, .05], [-.17, .16], [-.21, .25]]];
  const crack = (x, y) => cracks.some(c => c.some((a, i) => { const b = c[i + 1]; if (!b) return false;
    const dx = b[0] - a[0], dy = b[1] - a[1], t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (y - a[1]) * dy) / (dx * dx + dy * dy)));
    return Math.hypot(x - a[0] - dx * t, y - a[1] - dy * t) < .014; }));
  const face = q => {
    const d = v3.sub(q, C), p = [v3.dot(d, ax), v3.dot(d, ay) + .46, v3.dot(d, az)]; // in the slab's own axes
    if (p[2] > fz - .02) { // the rune, carved into the face
      const u = (p[0] + .17) / .34, v = (.8 - p[1]) / .5;
      if (sigil) { const su = (p[0] + .27) / .54, sv = (.8 - p[1]) / .58; if (su >= 0 && su <= 1 && sv >= 0 && sv <= 1 && sigilHit(sigil, su, sv, .055)) return M.RUNE; }
      else if (u >= 0 && u <= 1 && v >= 0 && v <= 1 && runeGlyph(u, v, k + 1, .1)) return M.RUNE;
    }
    if (crack(p[0], p[1])) return M.STONED; // cracks
    if (p[1] > .86 && hash2(Math.floor(p[0] * 30), Math.floor(p[2] * 30), 3) < .3) return M.MOSS;   // lichen on the weathered top
    if (p[1] < .12 && hash2(Math.floor(p[0] * 35), Math.floor(p[1] * 35) + Math.floor(p[2] * 35) * 7, 5) < .55) return M.MOSS;
    return undefined;
  };
  m.box(C, [.28, .46, fz], M.STONE, { group: 1, axes: [ax, ay, az], round: .06, paint: face });
  // the weathered top: worn down to one side
  m.box(v3.add(v3.add(C, v3.mul(ay, .53)), v3.mul(ax, .2)), [.3, .12, .2], M.STONE, { group: 1, dir: v3.add(ax, v3.mul(ay, .35)), up: ay, cut: true, paint: face });
  // moss and grass at its foot
  for (const [x, z, r] of [[-.24, .14, .08], [.2, .02, .07], [.0, .12, .07]]) m.ell([x, .015, z], [r, r * .4, r], M.MOSS, { group: 2 });
  for (let i = 0; i < 9; i++) { const x = -.3 + i * .07, z = .12 + (i % 3) * .025 - i * .02, h = .07 + (i * 37 % 5) / 60; m.seg([x, 0, z], [x + (i % 3 - 1) * .02, h, z + .01], .012, .004, i % 3 ? M.LEAF : M.LEAF2, { group: 10 + i }); }
  const col = { [M.STONE]: [132, 134, 142], [M.STONED]: [70, 70, 80], [M.MOSS]: [86, 120, 62], [M.LEAF]: [80, 125, 60], [M.LEAF2]: [130, 160, 80], [M.RUNE]: STONE_GLOW[variant][0], [M.MAGIC2]: STONE_GLOW[variant][1], [M.LINE]: [40, 40, 50] };
  const sp = render(m, { height: 44 }).sp;
  // a few motes drifting round it
  let n = 0;
  for (let i = 0; i < 600 && n < 5; i++) {
    const x = Math.floor(hash2(i, k, 9) * sp.w), y = Math.floor(hash2(i, k, 10) * sp.h * .8);
    if (sp.get(x, y) || sp.get(x + 1, y) || sp.get(x - 1, y) || sp.get(x, y + 1) || sp.get(x, y - 1)) continue;
    sp.px(x, y, n % 2 ? M.RUNE : M.MAGIC2); n++;
  }
  return { sp, colours: col };
}
function pond() {
  const m = new Model({ blend: .03 });
  m.ell([0, .0, 0], [.62, .025, .38], M.WATER, { group: 1, paint: p => Math.hypot(p[0] / .62, p[2] / .38) > .88 ? M.BODY2 : undefined }); // the muddy rim
  for (let i = 0; i < 16; i++) { const a = Math.PI * (.85 + i / 15 * .9), x = Math.cos(a) * .6, z = Math.sin(a) * .36, h = .18 + (i * 37 % 10) / 40; m.seg([x, 0, z], [x + (i % 3 - 1) * .02, h, z], .012, .006, i % 4 ? M.LEAF : M.LEAF2, { group: 10 + i }); }
  for (const [x, z, r] of [[.5, .2, .07], [.45, -.25, .05], [-.2, .35, .06]]) m.ell([x, .02, z], [r, r * .5, r], M.ACCENT, { group: 30 });
  const sp = render(m, { height: 22 }).sp;
  return { sp, colours: { [M.WATER]: [40, 70, 95], [M.BODY2]: [70, 60, 45], [M.LEAF]: [80, 125, 60], [M.LEAF2]: [130, 160, 80], [M.ACCENT]: [130, 128, 125] } };
}
// Bakes the light sources: { campfire: [3 frames], stones: { cyan, violet, green }, pond: { sp, mask } }.
// The pond's mask is a canvas, white where its pixels are water.
// A rune stone in one glow ("cyan", "violet" or "green"), carved with a creature's sigil (an
// area's stones can carry the area creature's sigil) or, without one, a generic rune. Baked.
export function runeStone(st, { glow = "cyan", sigil, makeCanvas = defaultCanvas } = {}) { const s = magicStone(glow, sigil); return bake(s.sp, s.colours, st, "none", makeCanvas); }
export function lightProps(st, { makeCanvas = defaultCanvas } = {}) {
  const bk = (sp, col) => bake(sp, col, st, "none", makeCanvas);
  const out = { campfire: [0, 1, 2].map(f => bk(campfire(f), fireCol)), stones: {}, pond: null };
  for (const v of Object.keys(STONE_GLOW)) { const s = magicStone(v); out.stones[v] = bk(s.sp, s.colours); }
  const p = pond(), baked = bk(p.sp, p.colours), mask = makeCanvas(p.sp.w, p.sp.h), g = mask.getContext("2d"), img = g.createImageData(p.sp.w, p.sp.h);
  for (let i = 0; i < p.sp.m.length; i++) if (p.sp.m[i] === M.WATER) img.data.set([255, 255, 255, 255], i * 4);
  g.putImageData(img, 0, 0); baked.mask = mask; out.pond = baked;
  return out;
}
