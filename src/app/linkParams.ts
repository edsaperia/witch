import { slotStorage } from "./saveSlots";
// The link's switches (?px=, ?tilt=, ?music=, ?hills=, ?shape=, ...): the tuning for this load, made from the tuning file
// and the page's query parameters (and the world's knobs kept on this browser). Called once, before the game is made.
import { TUNING } from "../rules/tuning";
import { OLD_HEX } from "../render/leash/ranks";
import { playableIsland } from "../rules/rosters";
import { loadSave, worldSeed } from "./chartSave";
import { zooCoastsHeld } from "./zooCoasts";
import { applySet } from "./repro";
import { loadoutFrom } from "./loadout";
import { hatsFrom } from "./hatSave";
import { unlockAll } from "./debugUnlock";
import { loadBroom } from "./broomSave";
import { applyOwn } from "./finds";
import { fittedParts } from "../rules/broomParts";
import { bagOf } from "../rules/bags";
import type { MusicCue } from "../rules/musicPlan";
import type { MusicStyle } from "../rules/musicScore";
import musicStyleJson from "../../config/music-style.json";
import { applyKnobParams } from "../ui/decisions";
import { defaultGenome, newWitch } from "./defaultLook";

/** The browser keys that once remembered knobs which change the world or the balance: the world's shape and travel speed
 *  (witch.world: area size, map areas, treetop speed) and the fight's scale, speed and momentum (witch.fight). They're the
 *  link's alone now (2026-10-07: a 14 x 14 map left in Ed's browser gave every PR build 196 areas and threw off each
 *  playtest's balance), so a load forgets them. */
export const FORGOTTEN_KEYS = ["witch.world", "witch.fight", "witch.wave"]; // (and the waves' pace, 2026-10-08: Ed, "stop remembering it")
export function forgetRuleKnobs(storage: Pick<Storage, "removeItem"> | undefined = slotStorage): void {
  for (const k of FORGOTTEN_KEYS) try { storage?.removeItem(k); } catch { /* storage blocked */ }
}

/** ?island= (Ed, 2026-10-11): a number of areas (1 to 200), "home" (the home island's size, `home`), "off" (0: the radius map), or a kind (its island: rules/rosters.ts, handled by the caller);
 *  null when it's not given or not understood. */
export function islandFromLink(v: string | null, home: number): number | null {
  if (v === null) return null;
  if (v === "off" || v === "0") return 0;
  if (v === "home") return home > 0 ? home : 10;
  const n = Math.round(Number(v));
  return Number.isFinite(n) && n > 0 ? Math.min(200, n) : null;
}

/** The world's shape and travel speed for this load: the tuning's, unless the link says otherwise (?areaSize= or ?areaScale=,
 *  ?treetopSpeed=, ?mapAreas=), clamped. Never from what an earlier load saw. */
export function worldFromLink(params: URLSearchParams, defaults = { areaSize: TUNING.areaSize * TUNING.areaScale, treetopSpeed: TUNING.treetopSpeed, mapAreas: TUNING.mapAreas }) {
  const world = { ...defaults };
  const size = Number(params.get("areaSize")), scale = Number(params.get("areaScale")), speed = Number(params.get("treetopSpeed")), n = Number(params.get("mapAreas"));
  if (size > 0) world.areaSize = size; else if (scale > 0) world.areaSize = TUNING.areaSize * scale;
  if (speed > 0) world.treetopSpeed = speed;
  if (n > 0) world.mapAreas = n;
  world.areaSize = Math.round(Math.min(560, Math.max(56, world.areaSize)));
  world.treetopSpeed = Math.round(Math.min(300, Math.max(8, world.treetopSpeed)));
  world.mapAreas = Math.round(Math.min(30, Math.max(6, world.mapAreas)));
  return world;
}

export function tuningFromLink(params: URLSearchParams) {
  // Variants as switches in the link: ?tilt=off, ?bloom=off, ?shadows=off,
  // ?canopy=off (the canopy shadow layer), ?mist=off.
  // A whole copy of the tuning file (2026-10-19): what this load's knobs, settings and sliders change is this load's alone, never
  // the file's own objects, so a night made after another in the same page starts from the file as a fresh page does (only what
  // is carried on purpose carries: app/settings.ts carryKnobs; docs/plans/sail-without-reload.md).
  const tuning = structuredClone(TUNING); // (styleFromLink's partyObjects.generated among them: the chart's landing bake and its map's worker each make one, app/mapPrep.ts)
  // ?px=3|4|5: the art pixel (screen pixels per art pixel; the tuning's pixelSize), per load, to compare the pixel-art
  // styles in play (docs/ART-GUIDE.md section 0: Ed picks between bold and ref at 4 or 5 in playtesting).
  { const px = Number(params.get("px")); if ([2, 3, 4, 5, 6].includes(px)) tuning.pixelSize = px; }
  if (params.get("shadows") === "off") tuning.shadows.on = false;
  if (params.get("canopy") === "off") tuning.canopyShadow.on = false;
  if (params.get("mist") === "off") tuning.mist.on = false;
  // The circle round her (Ed, 2026-10-13: switches to find which effect draws it): ?occ=off the see-through fade of tall things
  // in front of her; ?hole=off no cut-away in the canopy (crowns everywhere), ?hole=all every crown cut away;
  // ?seedepth=off the see-through pass writing no depth (render/sprites.ts, as before #896).
  // ?area=off scenery not averaged where it shrinks; ?cut=pixel the cut-away pixel by pixel, ?cut=whole by each crown whole (tuning suspects)
  tuning.suspects = { ...TUNING.suspects };
  if (params.get("area") === "off") tuning.suspects.areaAverage = false;
  const cutBy = params.get("cut");
  if (cutBy === "pixel") tuning.suspects.cutWhole = false;
  else if (cutBy === "whole") tuning.canopyCutout = { ...TUNING.canopyCutout, whole: 1 };
  if (params.get("occ") === "off") tuning.occlusion = { ...TUNING.occlusion, on: false };
  const reveal = params.get("reveal"); // ?reveal=legend,runestone,find,flask (all, none): which places she stands in are kept clear (render/view/reveal.ts)
  if (reveal !== null && TUNING.reveal) {
    const R = TUNING.reveal, on = new Set(reveal.split(",")), all = on.has("all");
    tuning.reveal = { ...R, legend: { ...R.legend, on: all || on.has("legend") }, runestone: { ...R.runestone, on: all || on.has("runestone") }, find: { ...R.find, on: all || on.has("find") }, flask: { ...R.flask, on: all || on.has("flask") } };
  }
  const hole = params.get("hole");
  if (hole === "off" || hole === "all") tuning.canopyCutout = { ...TUNING.canopyCutout, screenFraction: hole === "off" ? 0 : 8 };
  const tilt = params.get("tilt");
  if (tilt === "off") tuning.tiltShift.on = false;
  // ?tilt=<strength>,<band>: the treetops' tilt-shift, to try values live (e.g. ?tilt=6,0.28).
  else if (tilt && /^[\d.]+(,[\d.]+)?$/.test(tilt)) { const [st, bd] = tilt.split(",").map(Number); tuning.tiltShift.on = true; tuning.tiltShift.treetop.strength = st; if (bd > 0) tuning.tiltShift.treetop.band = bd; }
  if (params.get("bloom") === "off") tuning.bloom.on = false;
  // ?snap=0: the picture's pixels as the pixel size has them, not snapped to whole device pixels (render/view.ts resize), to compare.
  if (params.get("snap") === "0") tuning.pixels = { ...tuning.pixels, snap: false };
  if (params.get("moonbeams") === "on") tuning.moonbeams = 1;
  const witchesParam = Number(params.get("witches")); // debug: this many more party witches
  if (witchesParam > 0) tuning.partyWitches = { ...tuning.partyWitches, debugExtra: Math.min(500, Math.floor(witchesParam)) };
  // ?glow=<reach>,<falloff>,<near>: the witch's glow, to tune live (e.g. ?glow=50,2.5,0.7; 0 keeps a value).
  const glowParam = params.get("glow")?.split(",").map(Number);
  if (glowParam && glowParam[0] > 0) { tuning.glowReach = glowParam[0]; tuning.glowFixed = true; }
  if (glowParam && glowParam[1] > 0) tuning.glowFalloff = glowParam[1];
  if (glowParam && glowParam[2] > 0) tuning.glowNear = glowParam[2];
  // The music's style (config/music-style.json) sets the beat everything pulses to.
  const musicStyle = musicStyleJson as unknown as MusicStyle;
  // The beat's base tempo is the style's; each wave's tempo is its arc step's (Ed: 120 rising to about 140).
  tuning.beat = { ...tuning.beat, bpm: musicStyle.bpm, tempos: musicStyle.arc.map(a => a.bpm ?? musicStyle.bpm), blockBars: musicStyle.blockBars, rampBars: musicStyle.tempoRampBars ?? 8 };
  // ?music=off: no music; ?music=<section> plays that section of the style over and over (e.g.
  // ?music=drop); ?music=wave<N> plays wave N's music whatever the wave (e.g. ?music=wave7).
  const musicParam = params.get("music") ?? "";
  if (musicParam === "off") tuning.music = { ...tuning.music, on: false };
  let musicCueNow: MusicCue | undefined;
  {
    const m = /^wave(\d+)$/.exec(musicParam);
    if (m || musicStyle.sections[musicParam]) musicCueNow = { waves: [], nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0, forceWave: m ? +m[1] : undefined, forceSection: m ? undefined : musicParam };
    // a wave's music plays at that wave's tempo throughout
    if (m) tuning.beat = { ...tuning.beat, tempos: [tuning.beat.tempos![Math.min(+m[1], tuning.beat.tempos!.length - 1)]] };
  }
  // ?blend=off: neighbouring areas' floors meet on a plain edge (to compare); ?blend=<warp>,<fine>,<band> tunes it.
  const blendParam = params.get("blend");
  if (blendParam === "off") tuning.groundBlend = { ...tuning.groundBlend, on: false };
  else if (blendParam) { const [w, f, b] = blendParam.split(",").map(Number); tuning.groundBlend = { ...tuning.groundBlend, warp: w || 0, fine: f || 0, band: b || 0 }; }
  // ?border=<twinkle>,<swapRate>,<swapBeat>: the party border's sparkle.
  const borderParam = params.get("border")?.split(",").map(Number);
  if (borderParam) { const [tw, sr, sb] = borderParam; tuning.borders = { ...tuning.borders, ...(tw >= 0 ? { twinkle: tw } : {}), ...(sr >= 0 ? { swapRate: sr } : {}), ...(sb >= 0 ? { swapBeat: sb } : {}) }; }
  // ?grass=0..2: how thick the ground cover is (0 none).
  // ?lights=<n>: how many of the nearest point lights shade each pixel (the light budget; 0 none), to compare frame costs.
  const lightsParam = params.get("lights");
  if (lightsParam !== null && !isNaN(Number(lightsParam))) tuning.lightBudget = Math.max(0, Number(lightsParam));
  const grassParam = params.get("grass");
  if (grassParam !== null && !isNaN(Number(grassParam))) tuning.groundCover = { ...tuning.groundCover, density: Number(grassParam) };
  // ?wind=<strength>: the wind's sway (0 still).
  const windParam = params.get("wind");
  if (windParam !== null && !isNaN(Number(windParam))) tuning.wind = { ...tuning.wind, strength: Number(windParam) };
  // ?relief=<strength>: the ground's fake relief (0 flat).
  const reliefParam = params.get("relief");
  if (reliefParam !== null && !isNaN(Number(reliefParam))) tuning.ground = { ...tuning.ground, relief: { ...tuning.ground.relief, strength: Number(reliefParam) } };
  // ?hills=0: the ground flat again; ?hills=<amplitude>: the rolling ground's swells, in metres.
  const hillsParam = params.get("hills");
  if (hillsParam !== null && !isNaN(Number(hillsParam))) tuning.ground = { ...tuning.ground, hills: { ...tuning.ground.hills, on: Number(hillsParam) > 0, amplitude: Number(hillsParam) > 0 ? Number(hillsParam) : tuning.ground.hills.amplitude } };
  // ?trunks=soft|hard|off: the trunks' shadows from her glow and the campfires in ground mode (render/trunkShadows.ts).
  const trunksParam = params.get("trunks");
  if (trunksParam && tuning.shadows.trunks) tuning.shadows = { ...tuning.shadows, trunks: { ...tuning.shadows.trunks, mode: trunksParam } };
  // ?ley=0: no ley lines through the runestones.
  if (params.get("ley") === "0") tuning.leyLines = { ...tuning.leyLines, on: false };
  if (params.get("trail") === "0") tuning.trail = { ...tuning.trail, on: false };
  if (params.get("knock") === "0") tuning.witch = { ...tuning.witch, knock: { ...tuning.witch.knock, on: false } };
  // ?attacks=old: every species fights with its old attacks (config/combat.json), not its own in the grammar (rules/attacks/species.ts).
  if (params.get("attacks") === "old") tuning.attacks = { reactionFloor: tuning.attacks?.reactionFloor ?? 0.45, species: false };
  // ?dodge=a,b,c: which of the dodge changes are on (Ed, 2026-10-08; tuning dodge: a committed strikes, b predictive aim,
  // c packs cutting off her retreat), the rest off; ?dodge=0 none of them.
  const dodgeParam = params.get("dodge");
  if (dodgeParam !== null && tuning.dodge) {
    const on = new Set(dodgeParam.toLowerCase().split(",").map(k => k.trim()));
    tuning.dodge = { a: { ...tuning.dodge.a, on: on.has("a") }, b: { ...tuning.dodge.b, on: on.has("b") }, c: { ...tuning.dodge.c, on: on.has("c") } };
  }
  // ?bare=1: the terrain on its own, to judge the hills, the bumps and the bend (Ed, 2026-10-04): no
  // trees, undergrowth, grass, decor, scenes, relics, path props, string lights, mist or shadows; no
  // point lights, glow or haze, and a low raking moonlight. ?bare=2: a flat grey ground with contour
  // lines every 0.5 m and a 10 m grid, instead of its textures.
  const bare = Math.max(0, Math.min(2, Number(params.get("bare")) || 0));
  if (bare) {
    tuning.groundCover = { ...tuning.groundCover, on: false };
    tuning.mist = { ...tuning.mist, on: false };
    tuning.canopyShadow = { ...tuning.canopyShadow, on: false };
    tuning.shadows = { ...tuning.shadows, on: false };
    tuning.stringLights = { ...tuning.stringLights, on: false };
    tuning.bare = bare;
  }
  // ?clouds=<count>: how many clouds (0 none), to compare and to measure.
  const cloudsParam = params.get("clouds");
  if (cloudsParam !== null && !isNaN(Number(cloudsParam))) tuning.sky = { ...tuning.sky, clouds: { ...tuning.sky.clouds, count: Math.max(0, Number(cloudsParam)) } };
  // ?sky=off: no night sky over the bend (the plain dark background), to compare and to measure.
  if (params.get("sky") === "off") tuning.sky = { ...tuning.sky, on: false };
  // ?curve=<treetop>: the world's bend over the treetops (0 off), to try values live.
  const curveParam = params.get("curve");
  if (curveParam !== null && !isNaN(Number(curveParam))) tuning.camera = { ...tuning.camera, curve: { ...tuning.camera.curve, treetop: Number(curveParam) } };
  // ?light=spooky|plain: the lighting's mood (render/mood.ts), to compare.
  const lightParam = params.get("light");
  if ((lightParam === "spooky" || lightParam === "plain") && tuning.light) tuning.light = { ...tuning.light, mood: lightParam };
  // The map's shape (Ed, 2026-10-06: circular, with a buffer ring): ?shape=square brings back the old square map to compare.
  const shapeParam = params.get("shape");
  if ((shapeParam === "square" || shapeParam === "circle") && tuning.map) tuning.map = { ...tuning.map, shape: shapeParam };
  // The runestone stacks and the soundsystem spell (Ed, 2026-10-28; rules/stoneStacks.ts): off by default till their view lands
  // (areas clearing by themselves once their wild are gone); ?cast=1 turns them on, ?cast=0 off.
  { const v = params.get("cast"); if ((v === "1" || v === "0") && tuning.cast) tuning.cast = { ...tuning.cast, on: v === "1" }; }
  // Legend circles slow time (Ed, 2026-10-06; rules/slowTime.ts): ?slow=0 turns it off, ?slow=<scale> tries another speed.
  { const v = params.get("slow"); if (v !== null && tuning.legendCircle) { const k = Number(v); tuning.legendCircle = { slow: { ...tuning.legendCircle.slow, on: k > 0 && k < 1, scale: k > 0 && k < 1 ? k : tuning.legendCircle.slow.scale } }; } }

  // Area size and treetop speed, to play with (Ed, 2026-10-05: "compared to now, areas should be
  // fairly large, and treetop mode should be much faster than ground mode"): ?areaSize=<metres> (or
  // ?areaScale=), ?treetopSpeed=<m/s> and ?mapAreas=<n>, by the link alone, never remembered on this browser (the debug
  // overlay, ~, has a live treetop slider for this load). Every change goes in the playtest log.
  forgetRuleKnobs();
  const WORLD_DEFAULT = worldFromLink(new URLSearchParams());
  const world = worldFromLink(params, WORLD_DEFAULT);
  {
    tuning.areaScale = world.areaSize / tuning.areaSize; tuning.treetopSpeed = world.treetopSpeed; tuning.mapAreas = world.mapAreas;
    // (the circular map: about mapAreas x mapAreas areas in its circle, when that's been changed)
    if (tuning.map && world.mapAreas !== WORLD_DEFAULT.mapAreas) tuning.map = { ...tuning.map, radius: world.mapAreas / Math.sqrt(Math.PI), islandAreas: 0 };
  }
  // The island's size (Ed, 2026-10-11, the journey's first step): ?island=10|20|30|40|50 (any 1 to 200) areas the waves reach,
  // home (the home island's: map.islandAreas, 10 for now) or off (the radius map, about 100 areas, as before islands).
  // A kind's name plays that kind's island (Ed, 2026-10-11, rules/rosters.ts: ?island=fox); home, home's by roster; a number, that
  // many areas of random types.
  {
    const v = params.get("island");
    if (v && v !== "home" && playableIsland(v) && tuning.map) tuning.map = { ...tuning.map, island: v }; // (a placeholder's island isn't played)
    else { const n = islandFromLink(v, tuning.map?.islandAreas ?? 0); if (n !== null && tuning.map) tuning.map = { ...tuning.map, islandAreas: n, island: v === "home" ? "home" : "" }; }
    // ?phase=0 to 5 (Ed, 2026-10-11, the journey's irregular islands: rules/islandGrowth.ts): an island of that phase's shape, of
    // random types (10 areas a phase, home's 10 for 0) unless ?island= gives a number; a kind's island keeps its own.
    const ph = params.get("phase"), p = ph === null ? NaN : Math.round(Number(ph));
    if (Number.isFinite(p) && p >= 0 && p <= 5 && tuning.map && !(v && v !== "home" && playableIsland(v))) {
      const sized = v !== null && v !== "home" && islandFromLink(v, 0) !== null;
      tuning.map = { ...tuning.map, phase: p, island: "", islandAreas: sized ? tuning.map.islandAreas : p === 0 ? (tuning.map.islandAreas || 10) : 10 * p };
    }
  }

  // The zoo (?zoo; rules/zoo.ts, Ed 2026-10-13): every area a block of a square grid, a row per biome; no island, no roster.
  // (its islands in their real shapes where the chart has made them: app/zooCoasts.ts, read before its map is made)
  if (params.has("zoo") && tuning.map) { const coasts = zooCoastsHeld(); tuning.map = { ...tuning.map, shape: "zoo", island: "", islandAreas: 0, ...(coasts ? { coasts } : {}) }; }
  // (its edge, rules/zooMap.ts: the flagstones straight into the water, no sand to speak of, nothing on it, no one about)
  if (params.has("zoo") && tuning.beach) { const B = tuning.beach; tuning.beach = { ...B, width: 2, vary: B.vary && { ...B.vary, amp: 0, min: 2 }, decor: B.decor && { ...B.decor, on: false }, witchChance: 0 }; }
  // (flat: no hills, no rises under its runestones or dells under its legends; Ed, 2026-10-26: "The zoo is flat, no hills")
  // (no treehouse: Ed, 2026-10-26, "The zoo doesn't have a treehouse or a dancefloor; just an ent sigil legend circle at the centre")
  if (params.has("zoo")) tuning.treehouse = { ...tuning.treehouse, deck: tuning.treehouse.deck && { ...tuning.treehouse.deck, on: false }, house: tuning.treehouse.house && { ...tuning.treehouse.house, on: false } };
  if (params.has("zoo")) tuning.ground = { ...tuning.ground, hills: { ...tuning.ground.hills, on: false }, layout: tuning.ground.layout && { ...tuning.ground.layout, on: false } };
  // The prop generator's props (Ed's props decision; the hand-made ones retired with their ?props=hand, 2026-10-07): fingerposts
  // where footpaths come into a clearing (placed with the map, so set before it is made).
  tuning.paths = { ...tuning.paths, fingerposts: true };
  // Rank sigils (render/leash/ranks.ts; the default since Ed, 2026-10-27: "go ahead and push all the new sigil work"): every leash
  // sigil its bare glyph in its rank's colour with embers, the rune stones in their areas' top ranks', and the leash hex grid at
  // leash.ranks.hex metres (6). ?sigils=old brings back the old sigils and their 4 m grid (OLD_HEX); ?sigils=new, the default;
  // ?sigils=bold, rank sigils drawn bold (leash.ranks.bold, the default since every species has one: Ed, 2026-10-29); ?sigils=thin,
  // rank sigils in their monoline glyphs, to compare.
  { const v = params.get("sigils"), R = tuning.leash.ranks;
    if (R && (v === "new" || v === "old")) tuning.leash = { ...tuning.leash, ranks: { ...R, on: v === "new" } };
    if (R && v === "bold") tuning.leash = { ...tuning.leash, ranks: { ...R, on: true, bold: true } }; // (the bold sigils, where a species has one: art/sigils.js BOLD)
    if (R && v === "thin") tuning.leash = { ...tuning.leash, ranks: { ...R, on: true, bold: false } };
    if (R && tuning.leash.hex) tuning.leash = { ...tuning.leash, hex: { ...tuning.leash.hex, size: tuning.leash.ranks!.on ? R.hex : OLD_HEX } }; }
  applyKnobParams(tuning, params); // (Ed's decisions panel: its knobs' choices kept in the URL as d_<id>)
  // The sea chart's save (app/chartSave.ts): the islands she's found, so the night's legends favour the others (rules/rosters.ts).
  // and the campaign's world seed (every island's shape), unless ?world= names one for this load
  // (?found=a,b: those islands found for this load, whatever this browser's save says: the debug overlay's repro link, app/repro.ts;
  // the zoo's ?all every one, "*": the map's see-all, rules/zooMap.ts)
  if (tuning.map) { const save = loadSave(), w = params.get("world"), f = params.get("found"); tuning.map = { ...tuning.map, found: params.has("zoo") && params.has("all") ? ["*"] : f !== null ? f.split(",").filter(Boolean) : save.found, world: w ? worldSeed(w) : save.world }; }
  // ?own= (app/finds.ts; Ed, 2026-10-23, the dev control's switch): finds given or let go on this browser's saves, as the dev
  // control does (all, none, kind:item, kind:*), before the night reads them (her hats too: app/hatSave.ts, read just below).
  { const own = params.get("own"); if (own !== null) applyOwn(own); }
  // Her hat's spell (app/loadout.ts): the creator's, kept on this browser, or ?hat=; her hats (app/hatSave.ts; Ed, 2026-10-23: the
  // plain hat hers, the rest found): a saved hat she doesn't own is the plain one.
  { const L = loadoutFrom(params), hats = unlockAll() ? "*" : hatsFrom(params, L.hat), hat = hats === "*" || L.hat === "none" || hats.split(",").includes(L.hat) ? L.hat : "none"; tuning.spells = { ...tuning.spells, hat, hats }; }
  // Her broom's parts (app/broomSave.ts; the Workshop, Ed 2026-10-23): those fitted at the bay on this browser, or
  // ?parts=missile,ladder,nozzles for one load (any parts, found or not: for testing). Her broom's spell is the set they complete.
  { const P = params.get("parts"); tuning.spells = { ...tuning.spells, parts: P !== null ? P : fittedParts(loadBroom().fitted).map(p => p.id).join(",") }; }
  // Her bag (rules/bags.ts; Ed, 2026-10-29: a Bumbag and a Far bag to choose from): the one her saved look wears (localStorage
  // witch.genome, chosen at the bags station), or ?bag=starter, ?bag=quick, ?bag=far (or a bag item's id; ?bag=none for none) for one load.
  { const B = params.get("bag"), ids: Record<string, string> = { starter: "satchel", quick: "bumbag", far: "purse", none: "" };
    let look: Record<string, unknown> | null = null; try { look = newWitch() ? null : JSON.parse(slotStorage.getItem("witch.genome") ?? "null"); } catch { /* storage blocked or spoilt: none */ }
    look ??= defaultGenome(); // (a brand-new witch: the game's default look's bag, app/defaultLook.ts)
    tuning.spells = { ...tuning.spells, bag: B !== null ? ids[B] ?? B : bagOf(look) }; }
  // ?set=path=value;path=value (the repro link's: every setting changed from the build's, app/repro.ts), last, over the rest.
  applySet(tuning, params.get("set"));
  return { tuning, musicStyle, musicCue: musicCueNow, world, WORLD_DEFAULT };
}
