// Witch art generator: the entry point for everything that draws and bakes the game's
// code-drawn sprites. A style object (the Witch Art Lab's knobs) goes in; sprites come out
// as an albedo canvas plus a normal map, for the deferred lighting pass to light.
// No page or DOM dependencies beyond making canvases: pass `makeCanvas(w, h)` where there
// is no `document` (the default uses document, else OffscreenCanvas).
// Parts: core.js (sprites, shapes, bake), creatures.js + creatures3d.js + model3d.js (the bestiary),
// trees.js (trees and bushes), this file (the style's knobs, the witch, a whole asset set).

import { defaultCanvas, rng, uni, pick, gauss, hash2, vnoise, hsv2rgb, M, EMISSIVE, Sprite, spline, band, tufts, polyMask, edgeVectors, rot, lerp2, bake } from "./core.js";
import { TREE_TYPES, chooseType, treeColours, finishTree, splitTree, bush, broadTree, firTree, willowTree, birchTree, palmTree, flatTree, TREE_SPECIES, treeSpecies, crownStats, floraPick } from "./trees.js";
import { PLANT_GENOMES, BUSH_GENOMES } from "./flora/genomes.js";
export { PLANT_GENOMES, BUSH_GENOMES };
import { witchSprite, witchColours, witchModel, WITCH_PARTS, DEFAULT_OUTFIT, WITCH_POSES, WITCH_FOOT_POSES, WITCH_SEAT_HEIGHT, WITCH_HEADINGS, witchPixelsPerUnit , WITCH_FLIGHT_POSES, WITCH_PAIRS, WITCH_LOOKS, DEFAULT_LOOK, PARTY_OUTFITS, PARTY_OUTFIT_BY_ID, partyWitch, cleanFlecks, LIMBO_BAR } from "./witch.js";
import { treehouseSprite, treehouseColours, TREEHOUSE_STOREYS } from "./treehouse.js";
import { PARTY_RELICS, PARTY_RELIC_BY_ID, PARTY_RELIC_IDS, PARTY_RELIC_SIGILS, PARTY_RELIC_GLINT_FRAMES, partyRelicSprite, partyRelicColours, partyRelicGlint, partyRelicSigilId } from "./partyRelics.js";
export { PARTY_RELICS, PARTY_RELIC_BY_ID, PARTY_RELIC_IDS, PARTY_RELIC_SIGILS, PARTY_RELIC_GLINT_FRAMES, partyRelicSprite, partyRelicColours, partyRelicGlint, partyRelicSigilId };
import { swayMask, bakeSway, swayCode, swayRegions, windShift, SWAY_CELL } from "./sway.js";
import { tuftSprites, bakeTufts } from "./tufts.js";
export { swayMask, bakeSway, swayCode, swayRegions, windShift, SWAY_CELL, tuftSprites, bakeTufts };
import { TALL_KINDS, tallPiece } from "./tall.js";
export { TALL_KINDS, tallPiece };
import { EFFECTS, EFFECT_BY_ID, ATTACK_EFFECTS, STATE_EFFECTS, TRAIT_TINTS, SPECIES_PROJECTILE, EFFECT_PPM, EFFECT_TREETOP_SCALE, EFFECT_TREETOP_SHRINK, effectSprite, effectColours } from "./effects.js";
export { EFFECTS, EFFECT_BY_ID, ATTACK_EFFECTS, STATE_EFFECTS, TRAIT_TINTS, SPECIES_PROJECTILE, EFFECT_PPM, EFFECT_TREETOP_SCALE, EFFECT_TREETOP_SHRINK, effectSprite, effectColours };
import { NEW_SET_PIECES, SET_PIECE_KINDS } from "./setpieces.js";
import { RELICS, RELIC_BY_ID, relicSprite, relicColours, relicLayouts, groundOffset } from "./relics.js";
import { DECOR, DECOR_BY_ID, decorSprite, decorColours, lakeKit, rockTint } from "./decor.js";
import { COUNTRY, COUNTRY_BY_ID, countrySprite, countryColours } from "./country.js";
import { LANDMARKS, LANDMARK_BY_ID, LANDMARK_BUILDINGS, landmarkSprite, landmarkColours } from "./landmarks.js";
import { PARTY_OBJECTS, PARTY_BY_ID, PARTY_CLASSES, PARTY_LIGHT_NEONS, PARTY_WARM, PARTY_CLUSTERS, PARTY_CLUSTER_BY_ID, partySprite, partyColours, partyPatch, BALLOON_PALETTES } from "./party.js";
import { LEGEND_STATES, LEGEND_FRAMES, LEGEND_POSES, LEGEND_IDS, legendForm, legendColours, legendSprites } from "./legends.js";
export { LEGEND_STATES, LEGEND_FRAMES, LEGEND_POSES, LEGEND_IDS, legendForm, legendColours, legendSprites };
import { SCENES, SCENE_BY_ID, scenePiece, sceneLayout, scenePlacements, sceneRefExists } from "./scenes.js";
import { PATH_KINDS, PATH_IDS, PATH_PPM, pathTextures, sweepPath, railPoints, railBrokenEnd, railCrossing, PATH_PIECES, PATH_PIECE_BY_ID, pathColours, pathPieceSprite, areaPathKinds } from "./paths.js";
import { AREAS, AREA_BY_ID, SWAYING_PROPS, areaAssets, WALLS_BLOCK, SET_PIECE_CHANCE, lightProps, runeStone, areaTreeVariants, TREE_HEIGHT_CLASSES, ART_PIXELS_PER_METRE, AREA_LAYOUTS, layoutProblems, LAYOUT_PATTERNS, LAYOUT_TERRAIN, LAYOUT_DECOR } from "./areas.js";
import { SPECIES, SPECIES_BY_ID, FEATURE_NAMES, LEVELS, speciesColours, critter, levelHeight, partyGear, HAT_COLOURWAYS, SHOE_STYLES, GLASSES_STYLES } from "./creatures.js";
export { LIMBO_BAR, WITCH_FLIGHT_POSES, WITCH_PAIRS, WITCH_LOOKS, DEFAULT_LOOK, PARTY_OUTFITS, PARTY_OUTFIT_BY_ID, partyWitch, cleanFlecks };
export { witchSprite, witchColours, witchModel, WITCH_PARTS, DEFAULT_OUTFIT, WITCH_POSES, WITCH_FOOT_POSES, WITCH_SEAT_HEIGHT, WITCH_HEADINGS, treehouseSprite, treehouseColours, TREEHOUSE_STOREYS };
export { NEW_SET_PIECES, SET_PIECE_KINDS };
export { RELICS, RELIC_BY_ID, relicSprite, relicColours, relicLayouts, groundOffset };
export { DECOR, DECOR_BY_ID, decorSprite, decorColours, lakeKit, rockTint };
export { COUNTRY, COUNTRY_BY_ID, countrySprite, countryColours };
export { LANDMARKS, LANDMARK_BY_ID, LANDMARK_BUILDINGS, landmarkSprite, landmarkColours, witchPixelsPerUnit };
export { PARTY_OBJECTS, PARTY_BY_ID, PARTY_CLASSES, PARTY_LIGHT_NEONS, PARTY_WARM, PARTY_CLUSTERS, PARTY_CLUSTER_BY_ID, partySprite, partyColours, partyPatch, BALLOON_PALETTES };
export { SCENES, SCENE_BY_ID, scenePiece, sceneLayout, scenePlacements, sceneRefExists };
export { PATH_KINDS, PATH_IDS, PATH_PPM, pathTextures, sweepPath, railPoints, railBrokenEnd, railCrossing, PATH_PIECES, PATH_PIECE_BY_ID, pathColours, pathPieceSprite, areaPathKinds };
export { AREAS, AREA_BY_ID, SWAYING_PROPS, areaAssets, WALLS_BLOCK, SET_PIECE_CHANCE, lightProps, runeStone, areaTreeVariants, TREE_HEIGHT_CLASSES, ART_PIXELS_PER_METRE, AREA_LAYOUTS, layoutProblems, LAYOUT_PATTERNS, LAYOUT_TERRAIN, LAYOUT_DECOR };
import { SIGILS, SIGIL_IDS, SIGIL_STROKE, SIGIL_DOT, SIGIL_DRAW_TIME, GROUND_PITCH, NEON, SIGIL_NEON, SIGIL_LEVELS, sigilColour, sigilFrame, sigilStrokes, sigilMark, sigilSVG, drawSigil, sigilHit, sigilGlyph, sigilField, groundSigil, floatSigil, floatSize, paintSigilField, SigilStack, STACK_TUNING, SIGIL_TRANSITION_TIME, liftOff, setDown } from "./sigils.js";
export { SIGILS, SIGIL_IDS, SIGIL_STROKE, SIGIL_DOT, SIGIL_DRAW_TIME, GROUND_PITCH, NEON, SIGIL_NEON, SIGIL_LEVELS, sigilColour, sigilFrame, sigilStrokes, sigilMark, sigilSVG, drawSigil, sigilHit, sigilGlyph, sigilField, groundSigil, floatSigil, floatSize, paintSigilField, SigilStack, STACK_TUNING, SIGIL_TRANSITION_TIME, liftOff, setDown };
import { DISCO_GRID, DISCO_RADIUS, DISCO_TILE_METRES, DISCO_MASK, discoPatterns, discoPatternById, DISCO_TRANSITIONS, discoTransition, discoCompose, discoCells, discoPaint, discoTileSprite, discoGroutSprite, discoRimStrip, discoFloorBase, discoColours, discoRimColours, DISCO_PPM, DISCO_TILE_PX, DISCO_PITCH, DISCO_RIM, DISCO_LOOK } from "./dancefloor.js";
export { DISCO_GRID, DISCO_RADIUS, DISCO_TILE_METRES, DISCO_MASK, discoPatterns, discoPatternById, DISCO_TRANSITIONS, discoTransition, discoCompose, discoCells, discoPaint, discoTileSprite, discoGroutSprite, discoRimStrip, discoFloorBase, discoColours, discoRimColours, DISCO_PPM, DISCO_TILE_PX, DISCO_PITCH, DISCO_RIM, DISCO_LOOK };
import { SOUNDSYSTEMS, soundsystemColours, soundsystemSprite, soundsystemHeight, soundsystems, DANCEFLOOR_SPEAKER_ANGLES, DANCEFLOOR_SPEAKER_STATES, dancefloorSpeakerFacing, dancefloorSpeakerHeight, dancefloorSpeakerColours, dancefloorSpeakerSprite } from "./soundsystem.js";
export { SOUNDSYSTEMS, soundsystemColours, soundsystemSprite, soundsystemHeight, DANCEFLOOR_SPEAKER_ANGLES, DANCEFLOOR_SPEAKER_STATES, dancefloorSpeakerFacing, dancefloorSpeakerHeight, dancefloorSpeakerColours, dancefloorSpeakerSprite };
export { TREE_TYPES, chooseType, treeColours, finishTree, splitTree, bush, broadTree, firTree, willowTree, birchTree, palmTree, flatTree, TREE_SPECIES, treeSpecies, crownStats, floraPick };
export { defaultCanvas, rng, uni, pick, gauss, hash2, vnoise, hsv2rgb, M, EMISSIVE, Sprite, spline, band, tufts, polyMask, edgeVectors, rot, lerp2, bake, SPECIES, SPECIES_BY_ID, FEATURE_NAMES, LEVELS, speciesColours, critter, levelHeight, partyGear, HAT_COLOURWAYS, SHOE_STYLES, GLASSES_STYLES };

// ================= the style genome =================
export const KNOBS = [
  { k: "ambientHue", g: "Night light", label: "Twilight hue", min: 0, max: 1, step: 0.01, v: 0.68, hue: true },
  { k: "ambient", g: "Night light", label: "Twilight brightness", min: 0.05, max: 0.6, step: 0.01, v: 0.22 },
  { k: "moon", g: "Night light", label: "Moonlight", min: 0, max: 1, step: 0.01, v: 0.3 },
  { k: "moonHue", g: "Night light", label: "Moon hue", min: 0, max: 1, step: 0.01, v: 0.58, hue: true },
  { k: "glowHue", g: "Night light", label: "Witch glow hue", min: 0, max: 1, step: 0.01, v: 0.13, hue: true },
  { k: "glowSat", g: "Night light", label: "Witch glow colour", min: 0, max: 1, step: 0.01, v: 0.35 },
  { k: "glowRadius", g: "Night light", label: "Witch glow reach", min: 30, max: 200, step: 5, v: 110 },
  { k: "glowPower", g: "Night light", label: "Witch glow strength", min: 0.3, max: 2.5, step: 0.05, v: 1.4 },
  { k: "bands", g: "Shading", label: "Light steps", min: 2, max: 7, step: 1, v: 3 },
  { k: "dither", g: "Shading", label: "Dithering", min: 0, max: 1, step: 0.05, v: 0.35 },
  { k: "round", g: "Shading", label: "Roundness", min: 0.2, max: 1.5, step: 0.05, v: 0.9 },
  { k: "outline", g: "Shading", label: "Plant outline", options: ["none", "dark", "tinted"], v: "none" },
  { k: "cOutline", g: "Shading", label: "Creature outline", options: ["dark", "tinted", "none"], v: "dark" },
  { k: "shafts", g: "Night light", label: "Moonbeams", min: 0, max: 1, step: 0.05, v: 0.3 },
  { k: "areaContrast", g: "Colour", label: "Difference between areas", min: 0, max: 1, step: 0.05, v: 0.6 },
  { k: "sat", g: "Colour", label: "Saturation", min: 0.2, max: 1.3, step: 0.01, v: 0.9 },
  { k: "leafHue", g: "Colour", label: "Leaf hue", min: 0, max: 1, step: 0.01, v: 0.3, hue: true },
  { k: "leafVariety", g: "Colour", label: "Leaf colour variety", min: 0, max: 1, step: 0.05, v: 0.3 },
  { k: "trunkHue", g: "Colour", label: "Bark hue", min: 0, max: 1, step: 0.01, v: 0.07, hue: true },
  { k: "groundHue", g: "Colour", label: "Ground hue", min: 0, max: 1, step: 0.01, v: 0.27, hue: true },
  { k: "groundVal", g: "Colour", label: "Ground brightness", min: 0.15, max: 0.7, step: 0.01, v: 0.4 },
  { k: "pixel", g: "Shading", label: "Pixel size", min: 1, max: 5, step: 1, v: 3 },
  { k: "treeSize", g: "Trees", label: "Tree height", min: 0.5, max: 1.5, step: 0.05, v: 0.85 },
  { k: "crownWidth", g: "Trees", label: "Crown width", min: 1, max: 4, step: 0.1, v: 3 },
  { k: "clearing", g: "Trees", label: "Clearing size", min: 0, max: 1, step: 0.05, v: 0.55 },
  { k: "depth", g: "Map", label: "Border detail (fractal layers)", min: 0, max: 6, step: 1, v: 4 },
  { k: "areaScale", g: "Map", label: "Area size (screens)", min: 0.6, max: 2, step: 0.05, v: 1 },
  { k: "areaTypes", g: "Map", label: "Area types", min: 4, max: 30, step: 1, v: 30 },
  { k: "density", g: "Trees", label: "Foliage density", min: 0.2, max: 1, step: 0.05, v: 0.55 },
  { k: "clump", g: "Trees", label: "Clumpiness", min: 0, max: 1, step: 0.05, v: 0.6 },
  { k: "gnarl", g: "Trees", label: "Gnarliness", min: 0, max: 1, step: 0.05, v: 0.5 },
  { k: "roots", g: "Trees", label: "Roots", min: 0, max: 1, step: 0.05, v: 0.6 },
  { k: "bark", g: "Trees", label: "Bark texture", min: 0, max: 1, step: 0.05, v: 0.6 },
  { k: "trees", g: "Trees", label: "Tree density", min: 0.2, max: 2, step: 0.05, v: 1 },
  { k: "wBroad", g: "Tree mix", label: "Gnarled broadleaf", min: 0, max: 1, step: 0.05, v: 0.8 },
  { k: "wFir", g: "Tree mix", label: "Fir", min: 0, max: 1, step: 0.05, v: 0.6 },
  { k: "wWillow", g: "Tree mix", label: "Willow", min: 0, max: 1, step: 0.05, v: 0.5 },
  { k: "wBirch", g: "Tree mix", label: "Birch", min: 0, max: 1, step: 0.05, v: 0.5 },
  { k: "wPalm", g: "Tree mix", label: "Tree fern", min: 0, max: 1, step: 0.05, v: 0.3 },
  { k: "wFlat", g: "Tree mix", label: "Flat-crowned", min: 0, max: 1, step: 0.05, v: 0.5 },
  { k: "bushes", g: "Undergrowth", label: "Bushes and shrubs", min: 0, max: 120, step: 1, v: 55 },
  { k: "bushSize", g: "Undergrowth", label: "Bush size", min: 0.5, max: 1.8, step: 0.05, v: 1 },
  { k: "flowers", g: "Undergrowth", label: "Flowers", min: 0, max: 1, step: 0.05, v: 0.3 },
  { k: "cSat", g: "Creatures", label: "Creature saturation", min: 0.1, max: 1, step: 0.01, v: 0.6 },
  { k: "cVal", g: "Creatures", label: "Creature brightness", min: 0.4, max: 1, step: 0.01, v: 0.85 },
  { k: "head", g: "Creatures", label: "Baby head size", min: 0.3, max: 0.6, step: 0.01, v: 0.44 },
  { k: "eye", g: "Creatures", label: "Eye size", min: 0.5, max: 2, step: 0.05, v: 1 },
  { k: "legs", g: "Creatures", label: "Leg length", min: 0.5, max: 1.8, step: 0.05, v: 1 },
  { k: "long", g: "Creatures", label: "Body length", min: 0.7, max: 1.5, step: 0.05, v: 1 },
  { k: "size", g: "Creatures", label: "Baby size (px)", min: 5, max: 14, step: 1, v: 8 },
  { k: "growth", g: "Creatures", label: "Legend vs baby height", min: 5, max: 25, step: 1, v: 20 },
  { k: "magicHue", g: "Creatures", label: "Magic glow hue", min: 0, max: 1, step: 0.01, v: 0.5, hue: true },
  { k: "fur", g: "Creatures", label: "Stripes and spots", min: 0, max: 1, step: 0.05, v: 0.5 },
  { k: "cloakHue", g: "Witch", label: "Jacket hue", min: 0, max: 1, step: 0.01, v: 0.72, hue: true },
  { k: "hairHue", g: "Witch", label: "Hair hue", min: 0, max: 1, step: 0.01, v: 0.01, hue: true },
  { k: "hatHue", g: "Witch", label: "Hat hue", min: 0, max: 1, step: 0.01, v: 0.74, hue: true },
  { k: "topHue", g: "Witch", label: "Top hue", min: 0, max: 1, step: 0.01, v: 0.13, hue: true },
  { k: "jeansHue", g: "Witch", label: "Jeans hue", min: 0, max: 1, step: 0.01, v: 0.6, hue: true },
  { k: "shoeHue", g: "Witch", label: "Sneakers hue", min: 0, max: 1, step: 0.01, v: 0.0, hue: true },
  { k: "phonesHue", g: "Witch", label: "Headphones hue", min: 0, max: 1, step: 0.01, v: 0.92, hue: true },
];
export const GROUPS = ["Night light", "Shading", "Colour", "Trees", "Tree mix", "Undergrowth", "Map", "Creatures", "Witch"];
export function defaultStyle() { const s = {}; KNOBS.forEach(k => s[k.k] = k.v); return s; }
export function mutate(style, strength, groups, seed) {
  const r = rng(seed), s = { ...style };
  for (const k of KNOBS) {
    if (!groups.has(k.g) || k.k === "pixel") continue;
    if (k.options) { if (r() < strength * 0.35) s[k.k] = pick(r, k.options); continue; }
    if (r() > 0.35 + strength * 0.6) continue;
    let v = s[k.k] + gauss(r) * (k.max - k.min) * strength * 0.35;
    if (k.hue) v = ((v % 1) + 1) % 1;
    v = Math.min(k.max, Math.max(k.min, v));
    if (k.step >= 1) v = Math.round(v);
    s[k.k] = +v.toFixed(3);
  }
  return s;
}

// ================= the witch =================
// Built in 3D (witch.js): named outfit parts, towards and away, three hover frames, a lean, rise and descend,
// fast and brake, the lean cycle (WITCH_FLIGHT_POSES), and on foot (WITCH_FOOT_POSES: stand, land, takeoff, talk, placeSigil, liftSigil, sit,
// and the party's poses; each sprite's .anchors has her hand and hat tip, and a pair pose's meeting points, WITCH_PAIRS). Party witches:
// PARTY_OUTFITS (a look and a palette each) and partyWitch(seed); witchSprite(style, { look }) draws any pose in a look.
// ================= per-style assets =================
// Each area has its own leaf colour and its own kind of tree; "Difference between areas" sets how far apart.
export function areaStyle(st, world, area) {
  const r = rng(world.forestSeed * 31 + area * 977 + 5), d = st.areaContrast;
  const s = { ...st, leafHue: st.leafHue + [0, 1, -1][area] * d * uni(r, .12, .3) };
  const weights = TREE_TYPES.map(([k]) => k), fav = pick(r, weights);
  for (const k of weights) s[k] = k === fav ? st[k] + d * 2 : st[k] * (1 - d * .8);
  return s;
}
// K scales world sizes (trees, bushes) to the pixel size: 2 / pixel in the lab.
export function buildAssets(st, world, { K = 2 / (st.pixel || 2), makeCanvas = defaultCanvas } = {}) {
  const bk = (sp, col, outline) => bake(sp, col, st, outline, makeCanvas);
  const r = rng(world.forestSeed), trees = [];
  for (let i = 0; i < 12; i++) {
    const area = Math.floor(i / 4), ar = rng(world.forestSeed * 31 + area), ast = areaStyle(st, world, area);
    const tr = rng(world.forestSeed * 13 + i), f = chooseType(ar, ast), t = finishTree(f(tr, ast, st.treeSize * K * uni(tr, .85, 1.15)), ast, tr), col = treeColours(tr, ast, f), parts = splitTree(t);
    trees.push({ whole: bk(t.sp, col), top: bk(parts.top, col), bot: bk(parts.bot, col) });
  }
  const bushes = [];
  for (let i = 0; i < 12; i++) { const b = bush(rng(world.forestSeed * 7 + i * 3), { ...areaStyle(st, world, Math.floor(i / 4)), bushSize: st.bushSize * K }); bushes.push(bk(b.sp, b.colours)); }
  // each creature sprite is the "towards" view; its .away is the same frame turned away
  const creatures = world.kinds.map(kind => [0, 1, 2, 3].map(level => [0, 1].map(frame => {
    const col = speciesColours(kind, st), towards = bk(critter(kind, level, frame, st, "towards"), col, st.cOutline);
    let away = null; // drawn the first time it is asked for
    Object.defineProperty(towards, "away", { enumerable: true, get: () => away || (away = bk(critter(kind, level, frame, st, "away"), col, st.cOutline)) });
    return towards;
  })));
  // the witch: frame 0 turned towards; .frames the three hover frames, .away the same turned
  // away, .lean the fast-flight pose ({ towards, away }); .rise and .descend the flights up to the
  // treetops and down to the ground, two flutter frames each ({ towards: [2], away: [2] }); .fast
  // her treetop top speed, barely hanging on, three flapping frames ({ towards: [3], away: [3] }); .brake
  // a skidding stop, two wobble frames ({ towards: [2], away: [2] }); .leanCycle her lean as a 4-frame loop ({ towards: [4], away: [4] });
  // each on-foot pose, the party's too ({ towards: [n], away: [n] })
  const wc = witchColours(st), wb = o => bk(witchSprite(st, o), wc, st.cOutline);
  const witch = wb({ frame: 0 });
  witch.frames = [witch, wb({ frame: 1 }), wb({ frame: 2 })];
  let away = null, lean = null;
  Object.defineProperty(witch, "away", { enumerable: true, get: () => away || (away = [0, 1, 2].map(frame => wb({ frame, facing: "away" }))) });
  Object.defineProperty(witch, "lean", { enumerable: true, get: () => lean || (lean = { towards: wb({ lean: true }), away: wb({ lean: true, facing: "away" }) }) });
  let leanCycle = null; // the lean cycle (WITCH_FLIGHT_POSES.lean): four frames ({ towards: [4], away: [4] })
  Object.defineProperty(witch, "leanCycle", { enumerable: true, get: () => leanCycle || (leanCycle = { towards: [0, 1, 2, 3].map(frame => wb({ pose: "lean", frame })), away: [0, 1, 2, 3].map(frame => wb({ pose: "lean", frame, facing: "away" })) }) });
  for (const [pose, n] of [["rise", 2], ["descend", 2], ["fast", 3], ["brake", 2], ...Object.entries(WITCH_FOOT_POSES).map(([k, v]) => [k, v.frames])]) { let v = null; const fr = [...Array(n).keys()]; Object.defineProperty(witch, pose, { enumerable: true, get: () => v || (v = { towards: fr.map(frame => wb({ pose, frame })), away: fr.map(frame => wb({ pose, frame, facing: "away" })) }) }); }
  // soundsystems: drawn the first time they are asked for (they are big)
  let ss = null;
  const out = { trees, bushes, creatures, witch, lights: lightProps(st, { makeCanvas }) };
  Object.defineProperty(out, "soundsystems", { enumerable: true, get: () => ss || (ss = soundsystems(st, (sp, col) => bk(sp, col, "none"))) });
  return out;
}

