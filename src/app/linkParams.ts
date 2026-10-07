// The link's switches (?px=, ?tilt=, ?music=, ?hills=, ?shape=, ...): the tuning for this load, made from the tuning file
// and the page's query parameters (and the world's knobs kept on this browser). Called once, before the game is made.
import { TUNING } from "../rules/tuning";
import type { MusicCue } from "../rules/musicPlan";
import type { MusicStyle } from "../rules/musicScore";
import musicStyleJson from "../../config/music-style.json";
import { applyKnobParams } from "../ui/decisions";

export function tuningFromLink(params: URLSearchParams) {
  // Variants as switches in the link: ?tilt=before|after|off, ?bloom=off, ?shadows=off,
  // ?canopy=off (the canopy shadow layer), ?mist=off.
  const tuning = {
    ...TUNING, bloom: { ...TUNING.bloom }, tiltShift: { ...TUNING.tiltShift, treetop: { ...TUNING.tiltShift.treetop } },
    shadows: { ...TUNING.shadows }, canopyShadow: { ...TUNING.canopyShadow }, mist: { ...TUNING.mist },
    party: { ...TUNING.party }, fight: { ...TUNING.fight }, // (the fight's scale and speed change live: its own copy)
  };
  // ?px=3|4|5: the art pixel (screen pixels per art pixel; the tuning's pixelSize), per load, to compare the pixel-art
  // styles in play (docs/ART-GUIDE.md section 0: Ed picks between bold and ref at 4 or 5 in playtesting).
  { const px = Number(params.get("px")); if ([2, 3, 4, 5, 6].includes(px)) tuning.pixelSize = px; }
  if (params.get("shadows") === "off") tuning.shadows.on = false;
  if (params.get("canopy") === "off") tuning.canopyShadow.on = false;
  if (params.get("mist") === "off") tuning.mist.on = false;
  const tilt = params.get("tilt");
  if (tilt === "off") tuning.tiltShift.on = false;
  // ?tiltsky=0: the sky over the bend left sharp by the tilt-shift, as it was before round 12.
  if (params.get("tiltsky") === "0") tuning.tiltShift.sky = false;
  else if (tilt === "before" || tilt === "after") { tuning.tiltShift.on = true; tuning.tiltShift.where = tilt; }
  // ?tilt=<strength>,<band>: the treetops' tilt-shift, to try values live (e.g. ?tilt=6,0.28).
  else if (tilt && /^[\d.]+(,[\d.]+)?$/.test(tilt)) { const [st, bd] = tilt.split(",").map(Number); tuning.tiltShift.on = true; tuning.tiltShift.treetop.strength = st; if (bd > 0) tuning.tiltShift.treetop.band = bd; }
  if (params.get("bloom") === "off") tuning.bloom.on = false;
  if (params.get("moonbeams") === "on") tuning.moonbeams = 1;
  const witchesParam = Number(params.get("witches")); // debug: this many more party witches
  if (witchesParam > 0) tuning.partyWitches = { ...tuning.partyWitches, debugExtra: Math.min(500, Math.floor(witchesParam)) };
  if (params.get("find") === "0") tuning.find = { ...tuning.find, on: false }; // Ed, v244: compare without the find-in-the-dark looks
  // ?rune=beam|column|both: how an awake rune stone shows above it.
  const runeParam = params.get("rune");
  if (runeParam && ["beam", "column", "both"].includes(runeParam)) tuning.runeMarkers = { ...tuning.runeMarkers, awakeStyle: runeParam };
  // ?picker=route|noisy|near3|near3touch|nearest: how the party picks the next area to wake (route, the default: the ley line's planned order; noisy the one before it).
  const pickerParam = params.get("picker");
  if (pickerParam && ["route", "noisy", "near3", "near3touch", "nearest"].includes(pickerParam)) tuning.party.picker = pickerParam;
  // ?route=spiral|varied: the route picker's planned order (spiral, the default, Ed 2026-10-06; varied the one before it).
  const routeParam = params.get("route");
  if (routeParam && ["spiral", "varied"].includes(routeParam)) tuning.party.route = routeParam;
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
  // ?ley=0: no ley lines through the runestones.
  if (params.get("ley") === "0") tuning.leyLines = { ...tuning.leyLines, on: false };
  if (params.get("trail") === "0") tuning.trail = { ...tuning.trail, on: false };
  if (params.get("knock") === "0") tuning.witch = { ...tuning.witch, knock: { ...tuning.witch.knock, on: false } };
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
  // Legend circles slow time (Ed, 2026-10-06; rules/slowTime.ts): ?slow=0 turns it off, ?slow=<scale> tries another speed.
  { const v = params.get("slow"); if (v !== null && tuning.legendCircle) { const k = Number(v); tuning.legendCircle = { slow: { ...tuning.legendCircle.slow, on: k > 0 && k < 1, scale: k > 0 && k < 1 ? k : tuning.legendCircle.slow.scale } }; } }
  const fx = params.get("fx");
  if (fx === "pixel" || fx === "smooth") tuning.fx = fx;

  // Area size and treetop speed, to play with (Ed, 2026-10-05: "compared to now, areas should be
  // fairly large, and treetop mode should be much faster than ground mode"): ?areaSize=<metres> (or
  // ?areaScale=), ?treetopSpeed=<m/s> and ?mapAreas=<n>, remembered on this browser till changed or
  // reset (in the debug overlay, ~, where treetop speed also has a live slider). Area size makes the
  // map, so it's set by the link alone. Every change goes in the playtest log.
  const WORLD_DEFAULT = { areaSize: TUNING.areaSize * TUNING.areaScale, treetopSpeed: TUNING.treetopSpeed, mapAreas: TUNING.mapAreas };
  const world = { ...WORLD_DEFAULT };
  {
    try { const v = localStorage.getItem("witch.world"); if (v) Object.assign(world, JSON.parse(v)); } catch { /* storage blocked */ }
    const size = Number(params.get("areaSize")), scale = Number(params.get("areaScale")), speed = Number(params.get("treetopSpeed")), n = Number(params.get("mapAreas"));
    if (size > 0) world.areaSize = size; else if (scale > 0) world.areaSize = TUNING.areaSize * scale;
    if (speed > 0) world.treetopSpeed = speed;
    if (n > 0) world.mapAreas = n;
    world.areaSize = Math.round(Math.min(560, Math.max(56, world.areaSize)));
    world.treetopSpeed = Math.round(Math.min(300, Math.max(8, world.treetopSpeed)));
    world.mapAreas = Math.round(Math.min(30, Math.max(6, world.mapAreas)));
    tuning.areaScale = world.areaSize / tuning.areaSize; tuning.treetopSpeed = world.treetopSpeed; tuning.mapAreas = world.mapAreas;
    // (the circular map: about mapAreas x mapAreas areas in its circle, when that's been changed)
    if (tuning.map && world.mapAreas !== WORLD_DEFAULT.mapAreas) tuning.map = { ...tuning.map, radius: world.mapAreas / Math.sqrt(Math.PI) };
    try { localStorage.setItem("witch.world", JSON.stringify(world)); } catch { /* fine */ }
  }

  // The prop generator is the default (DECISION FOR ED, previews/props-default/ on claude/prop-shots); ?props=hand brings back the hand-made props.
  const propsGen = params.get("props") !== "hand";
  if (propsGen) tuning.paths = { ...tuning.paths, fingerposts: true }; // ?props=gen: fingerposts where footpaths come into a clearing (placed with the map, so set before it is made)
  applyKnobParams(tuning, params); // (Ed's decisions panel: its knobs' choices kept in the URL as d_<id>)
  return { tuning, musicStyle, musicCue: musicCueNow, world, WORLD_DEFAULT, propsGen };
}
