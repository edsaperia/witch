// Scenes (Ed, 2026-10-04: "Feel free to think of decorations that might be in 'scenes', and scatter a few
// of them together"): vignettes of related pieces arranged together, each counting as ONE piece. Ed's rule:
// every relic, decoration or scene appears at most once per map, facing a random direction. Groups of
// fences and of hay bales count as one piece, so they are scenes here too.
// A scene never bakes into one big sprite: it lists its pieces, each a sprite drawn once and reused (one
// headstone drawn once, placed twenty times), since baking costs by pixel area and drawing is cheap.
//   { id, size: "small" | "large", desc, suits: [area ids], pieces: [{ sprite, dx, dz, facing? }], footprint }
// sprite names a piece: a country piece's or a landmark piece's id (country.js, landmarks.js), "relic:<id>" (relics.js) or "decor:<id>[/<variant>]"
// (decor.js) or "party:<id>[@<neon>]" (party.js, baked in that neon); dx, dz in metres from the scene's middle on the ground (x right, z towards the viewer, before
// the camera's turn: put a piece's origin at groundOffset(dx, dz)); facing "left" draws it mirrored (its NF
// normals); footprint, the scene's radius on the ground in metres. The pieces are turned towards the viewer,
// so a scene can face two ways, as authored or mirrored (sceneLayout's `mirror`): the game picks one at random.
import { witchPixelsPerUnit } from "./witch.js";
import { YAW } from "./model3d.js";
import { COUNTRY_BY_ID, countrySprite, countryColours } from "./country.js";
import { RELIC_BY_ID, relicSprite, relicColours, groundOffset } from "./relics.js";
import { DECOR_BY_ID, decorSprite, decorColours } from "./decor.js";
import { PARTY_BY_ID, PARTY_CLUSTER_BY_ID, partySprite, partyColours } from "./party.js";
import { LANDMARK_BY_ID, LANDMARK_BUILDINGS, landmarkSprite, landmarkColours } from "./landmarks.js";

// Each scene: [piece, x, z, facing] in model units at the witch's scale (x right, z towards the viewer); sceneLayout gives metres.
const SMALL = {
  "farmyard-corner": { desc: "an abandoned farmyard corner: the tractor sunk in moss, bales gone to mould, a broken fence, a trough, churns and a barrow", suits: ["meadow", "grassland", "honeysuckle-tangle", "muddy-forest"], pieces: [
    ["tractor", 0, 0], ["hay-round", 2.8, -1.3], ["hay-round-mouldy", 3.7, .1], ["fence", -1.3, -2.5], ["fence-broken", 1.0, -2.6], ["trough", -2.5, 1.2],
    ["milk-churn", 1.9, 1.8], ["milk-churn", 2.25, 2.1], ["milk-churn", 1.7, 2.35, "left"], ["wheelbarrow", -.7, 2.3, "left"]] },
  "bus-stop": { desc: "a bus stop on a road long gone: the shelter, its stop sign, a bench, a lamppost still flickering warm, a heap of bin bags", suits: ["grassland", "meadow", "twiggy-forest", "wispy-forest"], pieces: [
    ["bus-shelter", 0, 0], ["bus-stop-sign", 1.9, .6], ["bench", -2.4, .8], ["lamppost-lit", -1.9, -.4], ["bin-bags", 2.5, -.7], ["litter-bin", 1.3, 1.3]] },
  "picnic-gone-wild": { desc: "a picnic left behind and gone wild: a rotting table, the blanket with mushrooms through it, a hamper, a clump of glowing fungi", suits: ["bluebell-glade", "old-oaks", "log-pile", "meadow"], pieces: [
    ["picnic-table", 0, -.7], ["picnic-blanket", .5, .9], ["hamper", -1.2, .8], ["fungi-glow", 1.5, .2], ["camp-chair", -1.5, -.4, "left"]] },
  "allotment-feral": { desc: "an allotment gone feral: a shed with its door hanging, beds bolted to seed, a bean wigwam, a compost bay, a scarecrow", suits: ["garden", "honeysuckle-tangle", "meadow"], pieces: [
    ["garden-shed", -1.7, -1.7], ["raised-bed", .6, -.9], ["raised-bed", .8, .6, "left"], ["bean-wigwam", 2.5, -.6], ["compost-heap", -1.9, 1.0], ["watering-can", -.4, 1.9], ["scarecrow", 2.7, 1.5]] },
  "lay-by": { desc: "a lay-by: a car still parked, a snack trailer shuttered, a litter bin, a picnic table, cones and a sign", suits: ["grassland", "twiggy-forest", "norway", "wispy-forest"], pieces: [
    ["car-parked", 0, 0], ["snack-van", -3.3, -1.4], ["litter-bin", 2.2, -.9], ["picnic-table", 2.7, 1.0], ["relic:cones", -1.3, 1.7], ["sign-round", -3.0, 1.4]] },
  "festival-remnants": { desc: "festival remnants: tent frames with rags of fabric, faded bunting, a cold fire pit, crates, a camp chair, glow sticks still glowing", suits: ["meadow", "heath", "grassland", "bluebell-glade"], pieces: [
    ["bunting", 0, -2.3], ["tent-frame", -1.6, -.7], ["tent-frame", .9, -1.3, "left"], ["fire-pit", .4, .6], ["crates", -1.9, 1.2], ["camp-chair", 1.7, .1, "left"], ["glow-sticks", 1.2, 1.5]] },
  "woodcutters-clearing": { desc: "a woodcutter's clearing: a woodpile, a chopping block with the axe left in it, a sawhorse, sawn stumps, a barrow", suits: ["log-pile", "old-oaks", "alder-forest", "norway", "old-pinewood"], pieces: [
    ["log-pile", -1.4, -1.1], ["chopping-block", .4, .2], ["sawhorse", 1.9, -.9], ["stumps", -.9, 1.4], ["stumps", 2.1, 1.2, "left"], ["wheelbarrow", -2.5, .5]] },
  "fly-tip": { desc: "a fly-tip in the bracken: a sofa, a washing machine, a mattress, bin bags, a pile of tyres", suits: ["fern-forest", "muddy-forest", "tangly-forest", "berry-thicket"], pieces: [
    ["relic:sofa", 0, -.6], ["relic:washing-machine", 1.7, -.7], ["mattress", -1.5, .6], ["bin-bags", .6, .9], ["tyre-pile", 2.3, .7]] },
  "apiary": { desc: "an abandoned apiary: hives askew, one roof slid off, a bench and a water butt", suits: ["meadow", "heath", "honeysuckle-tangle", "garden"], pieces: [
    ["beehive", -1.1, -.5], ["beehive", .2, -.9, "left"], ["beehive", 1.3, -.2], ["bench", -.4, 1.2], ["water-butt", 2.2, 1.0]] },
  "hay-bales": { desc: "bales left in a field: round bales, one gone black, a slumping stack of square ones", suits: ["meadow", "grassland", "heath", "moor"], pieces: [
    ["hay-round", -1.3, 0], ["hay-round-side", .2, -.9], ["hay-round", 1.5, .2, "left"], ["hay-stack", -.2, 1.3], ["hay-round-mouldy", 2.6, -1.1], ["hay-square-mouldy", 1.6, 1.6]] },
  "fence-line": { desc: "a run of field fence: whole sections, a broken one, a gate hanging open, one leaning over", suits: ["meadow", "grassland", "moor", "heath", "honeysuckle-tangle"], pieces: [
    ["fence", -4.3, 0], ["fence", -2.2, 0], ["fence-broken", -.1, 0], ["gate", 1.05, 0], ["fence-leaning", 4.3, .05]] },
  "road-signs": { desc: "where a road forked: signs leaning every way, a dark lamppost, a cone", suits: ["grassland", "twiggy-forest", "wispy-forest", "rocky-slope"], pieces: [
    ["sign-triangle", -.8, -.4], ["sign-round", .6, -.7], ["sign-blank", 1.5, .4], ["lamppost", -1.7, .3], ["relic:cone", .3, .9]] },
  "scarecrow-field": { desc: "a field going back to forest: a scarecrow still standing guard, a plough in the grass, a mouldy bale, a broken fence", suits: ["meadow", "grassland", "heath"], pieces: [
    ["scarecrow", 0, 0], ["plough", -2.1, .8], ["hay-round-mouldy", 2.1, -.8], ["fence-broken", -.6, -2.1], ["trailer", 2.8, 1.6, "left"]] },
};

// The large scenes, at set-piece scale. "@<building>" puts a building's two halves (landmarks.js) at its spot, the far one behind and
// the near one in front, so the witch can fly in between. Headstones and the like are one sprite placed many times.
const rows = (piece, x0, x1, dx, zs, skip = () => false, kinds = [piece]) => zs.flatMap((z, j) => { const out = []; for (let x = x0, i = 0; x <= x1 + 1e-6; x += dx, i++) if (!skip(x, z)) out.push([kinds[(i * 7 + j * 3) % kinds.length], +(x + ((i * 37 + j * 11) % 5 - 2) * .04).toFixed(2), +(z + ((i * 13 + j * 7) % 5 - 2) * .05).toFixed(2), (i + j) % 3 ? undefined : "left"]); return out; });
const GRAVES = ["headstone", "headstone", "headstone-lean", "grave-cross", "headstone-sunk", "headstone"];
const LARGE = {
  "cemetery": { desc: "a cemetery gone back to the wood: rows of leaning headstones and crosses, a stone angel, a mausoleum, iron railings round an old plot, a lychgate, a yew, a lantern or two still flickering", suits: ["old-oaks", "holly-thicket", "ancient", "deadwood", "wispy-forest"], pieces: [
    ["lychgate", 0, 4.4], ["mausoleum", -3.4, -3.4], ["yew", 3.6, -3.2], ["stone-angel", .2, -.7], ["obelisk", 2.6, 1.0],
    ...rows("headstone", -3.6, 3.6, .9, [-1.9, .5, 2.4], (x, z) => (Math.abs(x - .2) < .9 && Math.abs(z + .7) < 1.5) || (Math.abs(x - 2.6) < .6 && Math.abs(z - 1.0) < .8) || (x < -2.3 && z > 1.5), GRAVES),
    ["iron-railing", -3.4, 1.4], ["iron-railing", -3.4, 3.3], ["grave-lantern", -1.7, .7], ["grave-lantern", 1.0, 2.6]] },
  "car-park": { desc: "a car park lost in the trees: cracked tarmac and faded bays, cars where they were left (one with a tree through it), a ticket machine, a snapped barrier, lampposts, trolleys", suits: ["grassland", "twiggy-forest", "norway", "wispy-forest"], pieces: [
    ["carpark-tarmac", 0, 0], ["car-parked", -2.7, -1.8], ["car-parked", 1.7, 1.9, "left"], ["car-bonnet-up", 3.6, -1.8], ["relic:van-tree", -1.0, 2.0],
    ["ticket-machine", 5.0, .3], ["barrier", -6.2, .4], ["lamppost", -4.8, -3.1], ["lamppost", 4.6, -3.2, "left"], ["relic:trolley-tipped", .6, -1.3], ["relic:trolley-nest", 4.4, 2.5]] },
  "scrap-yard": { desc: "a scrap yard: stacks of crushed cars, tyre piles, a grab crane with its arm still up, oil drums, a chain-link fence torn open, a corrugated shack", suits: ["muddy-forest", "deadwood", "rocky-slope", "tangly-forest"], pieces: [
    ["crushed-cars", -2.8, -2.1], ["crushed-cars", -1.0, -2.8, "left"], ["grab-crane", 1.4, -1.6], ["shack", 3.8, -.4], ["tyre-pile", -3.2, .8], ["tyre-pile", 2.2, 1.8, "left"],
    ["oil-drums", .2, .9], ["relic:car-on-side", -1.0, 2.1], ["relic:court-fence", -3.0, 3.6], ["relic:court-fence", .2, 3.7, "left"]] },
  "stave-church": { desc: "a ruined wooden stave church in a clearing, its nave open to the sky and its spire still up, a few sunken graves round it", suits: ["norway", "old-pinewood", "fern-forest", "rocky-slope"], pieces: [
    ["@stave-church", 0, 0], ["headstone-sunk", -2.8, 1.8], ["grave-cross", -2.0, 2.6, "left"], ["headstone-lean", 2.9, 2.0], ["yew", 3.8, -2.6]] },
  "parish-church": { desc: "a roofless stone parish church with its square tower, a churchyard of leaning stones, a yew by the gate", suits: ["old-oaks", "bluebell-glade", "meadow", "ancient"], pieces: [
    ["@parish-church", 0, 0], ["yew", 3.6, 2.4], ...rows("headstone", -2.6, 1.6, 1.05, [2.6], () => false, GRAVES), ["grave-cross", 2.6, -2.2], ["headstone-sunk", -.8, -2.4]] },
  "baroque-church": { desc: "a baroque church with its dome cracked open, its fallen lantern in the grass, a stone angel and rubble before its facade", suits: ["garden", "old-oaks", "ancient"], pieces: [
    ["@baroque-church", 0, 0], ["stone-angel", -2.6, 2.6, "left"], ["rubble", 2.4, 2.8], ["column-broken", 3.3, .6]] },
  "coptic-basilica": { desc: "a domed Coptic basilica, one dome fallen in, its bell tower standing, rubble round it", suits: ["rocky-slope", "heath", "grassland", "cave-mouth"], pieces: [
    ["@coptic-basilica", 0, 0], ["rubble", -1.0, 2.4], ["rubble", 3.4, 1.6, "left"], ["decor:split", -3.4, 1.8]] },
  "pagoda-temple": { desc: "a tiered wooden temple on its plinth, its top tier leaning and its spire fallen, mossed rocks round it", suits: ["bluebell-glade", "fern-forest", "ravine", "stream"], pieces: [
    ["pagoda-temple", 0, 0], ["decor:pair", -2.8, 1.6], ["decor:rock", 2.9, -1.4], ["rubble", -2.4, -1.8, "left"]] },
  "stupa": { desc: "a stupa on its terraces with a tree rooted in its dome, its spire's rings fallen at its foot, standing stones near", suits: ["heath", "moor", "rocky-slope", "grassland"], pieces: [
    ["stupa", 0, 0], ["decor:standing-rock", -3.2, -1.0], ["decor:pair", 3.0, 1.8, "left"]] },
  "greek-temple": { desc: "a Greek temple on its stepped base, a peristyle of columns half fallen, drums in the grass, a headless statue", suits: ["meadow", "grassland", "garden", "heath"], pieces: [
    ["@greek-temple", 0, 0], ["column-drums", 1.6, 2.9], ["statue-headless", -3.4, 2.3], ["pediment-fragment", 3.8, -1.6, "left"]] },
  "castle-ruins": { desc: "castle ruins: curtain walls (one breached), a round tower open to the sky, a gatehouse with its portcullis fallen, steps to nowhere, rubble", suits: ["rocky-slope", "moor", "norway", "deadwood", "cave-mouth"], pieces: [
    ["curtain-wall", -4.2, -1.2], ["round-tower", -1.7, -2.6], ["gatehouse", 1.6, -2.3], ["curtain-wall-breach", 4.7, -1.4, "left"], ["steps-to-nowhere", -3.4, 2.0], ["rubble", 2.6, 1.7], ["rubble", -.4, 1.2, "left"]] },
  "classical-ruins": { desc: "classical ruins: a row of columns, some fallen in drums, a pediment fragment, a cracked mosaic floor, a headless statue, a broken arch, and the statue's toppled head, its eyes still faintly lit", suits: ["meadow", "garden", "grassland", "ancient"], pieces: [
    ["mosaic-floor", 0, 0], ["column", -2.2, -2.3], ["column", -.8, -2.4], ["column-broken", .6, -2.3], ["column", 2.0, -2.4], ["column-drums", 1.8, 2.4], ["pediment-fragment", -2.8, 2.1],
    ["statue-headless", 3.2, -.6], ["arch-ruin", -4.4, -.6], ["decor:statue-head", 4.0, 1.6, "left"]] },
};
const expand = list => list.flatMap(([ref, x, z, f]) => ref[0] === "@" ? [[`${ref.slice(1)}-far`, x, z - LANDMARK_BUILDINGS[ref.slice(1)], f], [`${ref.slice(1)}-near`, x, z + LANDMARK_BUILDINGS[ref.slice(1)], f]] : [[ref, x, z, f]]);
export const SCENES = [...Object.entries(SMALL).map(([id, d]) => ({ id, size: "small", ...d })), ...Object.entries(LARGE).map(([id, d]) => ({ id, size: "large", ...d, pieces: expand(d.pieces) }))];
export const SCENE_BY_ID = Object.fromEntries(SCENES.map(d => [d.id, d]));

// A piece by name: { ref, def, sprite: { whole, top, bot, crownY, origin, metres }, colours, glow, decal }. Drawn once per style.
const sceneCache = new WeakMap();
export function scenePiece(ref, st = {}) {
  let c = sceneCache.get(st); if (!c) sceneCache.set(st, c = new Map());
  if (c.has(ref)) return c.get(ref);
  const [ns, rest] = ref.includes(":") ? ref.split(":") : ["country", ref];
  let out;
  if (ns === "country" && COUNTRY_BY_ID[rest]) { const d = COUNTRY_BY_ID[rest]; out = { def: d, sprite: countrySprite(rest, st), colours: countryColours(st) }; }
  else if (ns === "country" && LANDMARK_BY_ID[rest]) { const d = LANDMARK_BY_ID[rest]; out = { def: d, sprite: landmarkSprite(rest, st), colours: landmarkColours(st) }; }
  else if (ns === "relic" && RELIC_BY_ID[rest]) { const d = RELIC_BY_ID[rest]; out = { def: d, sprite: relicSprite(rest, st), colours: relicColours(st) }; }
  else if (ns === "party") { const [id, neon] = rest.split("@"), d = PARTY_BY_ID[id]; if (d) out = { def: d, sprite: partySprite(id, st), colours: partyColours(st, neon || "pink"), neon: d.light === "neon" ? neon || "pink" : undefined }; }
  else if (ns === "decor") { const [id, v = "0"] = rest.split("/"), d = DECOR_BY_ID[id]; if (d) out = { def: d, sprite: decorSprite(id, st, { variant: +v }), colours: decorColours(st) }; }
  if (!out) throw new Error(`no scene piece "${ref}"`);
  out = { ref, ...out, glow: !!out.def.glow, decal: !!out.def.decal };
  c.set(ref, out); return out;
}
export const sceneRefExists = ref => { const [ns, rest] = ref.includes(":") ? ref.split(":") : ["country", ref]; return ns === "country" ? !!(COUNTRY_BY_ID[rest] || LANDMARK_BY_ID[rest]) : ns === "relic" ? !!RELIC_BY_ID[rest] : ns === "party" ? !!PARTY_BY_ID[rest.split("@")[0]] : ns === "decor" ? !!DECOR_BY_ID[rest.split("/")[0]] : false; };

// A scene in metres: { id, size, desc, suits, pieces: [{ sprite, dx, dz, facing? }], footprint }. mirror: the scene
// turned the other way (reflected across the line up the screen through its middle, every piece mirrored).
export function sceneLayout(id, st = {}, { mirror = false, ppm = 16 } = {}) {
  const S = SCENE_BY_ID[id] || PARTY_CLUSTER_BY_ID[id]; if (!S) throw new Error(`no scene or party cluster "${id}"`);
  const k = witchPixelsPerUnit(st) / ppm, ny = Math.sin(YAW.towards), nz = Math.cos(YAW.towards); // n: the ground direction straight up the screen
  let footprint = 0;
  const pieces = S.pieces.map(([sprite, x, z, facing]) => {
    let dx = x * k, dz = z * k, left = facing === "left";
    if (mirror) { const t = 2 * (dx * ny + dz * nz); dx = t * ny - dx; dz = t * nz - dz; left = !left; }
    footprint = Math.max(footprint, Math.hypot(dx, dz) + scenePiece(sprite, st).sprite.metres.footprint);
    return { sprite, dx: +dx.toFixed(2), dz: +dz.toFixed(2), ...(left ? { facing: "left" } : {}) };
  });
  return { id, size: S.size, desc: S.desc, suits: S.suits, pieces, footprint: +footprint.toFixed(1) };
}
// Where each piece's sprite goes on screen, for composing a scene (the lab, previews): [{ ref, piece, x, y, ox, oy, flip, depth }],
// x, y the sprite's top-left in pixels from the scene's middle; draw decals first, then by depth (further first).
export function scenePlacements(id, st = {}, { mirror = false, ppm = 16 } = {}) {
  return sceneLayout(id, st, { mirror, ppm }).pieces.map(p => {
    const piece = scenePiece(p.sprite, st), sp = piece.sprite, [sx, sy] = groundOffset(p.dx, p.dz, ppm), flip = p.facing === "left";
    return { ref: p.sprite, piece, flip, depth: sy, ox: sx, oy: sy, x: sx - (flip ? sp.whole.w - sp.origin.x : sp.origin.x), y: sy - sp.origin.y }; // ox, oy: where its origin goes
  });
}
