// Starts the prototype: the seed from the URL, the game rules, the view, input, and the loop.
import { LEGEND_BUFFS } from "./rules/buffs";
import { FrameStats } from "./platform/frameStats";
import { Shake } from "./render/shake";
import { Music } from "./platform/audio/music";
import { Sfx } from "./platform/audio/sfx";
import { SfxCues } from "./platform/audio/sfxCues";
import { AudioWatchdog } from "./platform/audio/watchdog";
import { musicMix } from "./rules/music";
import { musicCue, type MusicCue } from "./rules/musicPlan";
import type { MusicStyle } from "./rules/musicScore";
import musicStyleJson from "../config/music-style.json";
import { setupArena } from "./rules/arena";
import { endParty } from "./rules/partyOver";
import { newCamera } from "./rules/camera";
import { setupQuestDemo } from "./rules/quest";
import { witchHeight } from "./rules/witch";
import { cellKey } from "./rules/party";
import { areaUnderWitch, hitWitch, interpolated, joinParty, leashLoad, loseSoundsystem, newGame, STEP, stepGame, type WaveEvent } from "./rules/game";
import { AREA_TYPES } from "./rules/map";
import { waveCountdown } from "./rules/party";
import { awaitingSpell, clockSeconds, clockText } from "./rules/leypulse";
import { parseSeed } from "./rules/map";
import { TUNING } from "./rules/tuning";
import { Input } from "./platform/input";
import { View } from "./render/view";
import { bendPoint, groundHeight, placed } from "./render/height";
import { Vector3 } from "three";
import { SPRITE_UNIFORMS } from "./render/sprites";
import { LIGHT_UNIFORMS } from "./render/lighting";
import { loadStyle } from "./render/style";
import { setupTouch } from "./ui/touch";
import { CHANGELOG_VERSIONS } from "./changelog";
import { setupStartScreen, startOnGesture } from "./ui/startScreen";
import { AimHud } from "./render/aimhud";
import { UPCOMING } from "./ui/upcoming";
import { PlaytestLog } from "./platform/playtestLog";
import { StallLog } from "./platform/stallLog";
import { powerReport } from "./rules/power";
import { Freeze } from "./platform/freeze";
import { Creator, loadGenome } from "./ui/creator";
import { applyKnobParams, DecidePanel } from "./ui/decide";

const params = new URLSearchParams(location.search);
let seed = parseSeed(params.get("seed"));
if (seed === null) {
  seed = Math.floor(Math.random() * 1000000);
  params.set("seed", String(seed));
  history.replaceState(null, "", "?" + params.toString() + location.hash);
}

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
const game = newGame(seed, tuning);
// The party spell (Ed, 2026-10-06): she stands behind her decks until it's cast (the button, or Enter). ?creator=0 (the
// tools and smoke runs) starts at once, as before, unless ?spell=wait; ?spell=auto starts at once anywhere.
if (params.get("spell") !== "auto" && !(params.get("creator") === "0" && params.get("spell") !== "wait")) game.party.spellAt = null;
// ?buffs=fox,toad,stag (debug): these legends' buffs on from the start, whatever the legends do (a
// species twice stacks it). ?buffs=all: every one.
const buffsParam = params.get("buffs");
if (buffsParam) game.buffs.forced = buffsParam === "all" ? Object.keys(LEGEND_BUFFS.species) : buffsParam.split(",").map(s => s.trim().toLowerCase().replace(/[^a-z]/g, "")).filter(Boolean);
// ?quest=1 (the first quest, a demo): beside the nearest sleeping legend, with the creature it
// dreams of on her stack; put its sigil down there (E) to make it happy.
if (params.get("quest")) setupQuestDemo(game, (x, z) => {
  game.witch = { ...game.witch, x, z, mode: "ground", lift: 0, seated: false, vx: 0, vz: 0 };
  game.camera = newCamera(tuning, x, witchHeight(game.witch, tuning), z);
  game.introFocus = undefined;
});
// ?arena=wolf*4,beetle*3 (Stage 5, a debug arena): hers against the wild in the home clearing,
// no waves; J sets it up again.
// ?partyover=1 (a debug flag): the party's over from the start, the afterparty (rules/partyOver.ts).
if (params.get("partyover") === "1") endParty(game);
const arenaParam = params.get("arena");
if (arenaParam) {
  setupArena(game, arenaParam);
  window.addEventListener("keydown", e => { if (e.code === "KeyJ" && !e.repeat) setupArena(game, arenaParam); });
}

// How often the party spreads: the tuning file's interval (5 minutes), or ?wave=<seconds> (0 or
// "off": no waves), or what this viewer last picked on the start screen.
const WAVE_CHOICES = [30, 60, 120, 300, 600, 0];
function setWaveInterval(sec: number): void {
  tuning.party.interval = sec > 0 ? sec : 1e9;
  game.party.paused = sec === 0;
  game.party.nextAt = Math.max(game.clock.time, game.party.bootUntil) + tuning.party.startDelay + tuning.party.interval; // after the boot-up
  document.querySelectorAll<HTMLButtonElement>("#waves button").forEach(b => b.classList.toggle("on", +b.dataset.s! === sec));
}
let waveChoice = tuning.party.interval;
try { const saved = localStorage.getItem("witch.wave"); if (saved !== null && WAVE_CHOICES.includes(+saved)) waveChoice = +saved; } catch { /* storage blocked */ }
const waveParam = params.get("wave");
if (waveParam !== null) waveChoice = waveParam === "off" ? 0 : Math.max(0, +waveParam || 0);
if (arenaParam) waveChoice = 0;
const canvas = document.getElementById("game") as HTMLCanvasElement;
// The art is drawn for the pixel size the game renders at (the tuning file's), not the Lab's.
const style = loadStyle();
{ const artStyle = params.get("style") ?? "bold"; if (artStyle === "bold" || artStyle === "ref") style.artStyle = artStyle; } // bold by default (Ed, 2026-10-06: "I think I prefer bold style"); ?style=now|bold|ref: a pixel-art style (art/stylise.js) baked into every sprite, carried to the art worker in the style
if (propsGen) { style.propGen = 1; tuning.partyObjects.generated = true; } // the prop generator (by default; ?props=hand turns it off): the prop generator (art/props/) stands in for the areas' stones, cairns, pools, stumps, logs, fungi and henges, several shapes of each, and the party's generated bunting, balloons and lanterns for the hand-made ones (carried to the art worker in the style, to the rules in the tuning)
if (params.get("texture") === "0") style.texture = 0; // ?texture=0: creatures as before their fur, feathers and scales (art/genome/texture.js), to compare
if (params.get("flora")) style.flora = params.get("flora"); // ?flora=new|fantasy|all|<ids>: every wooded area grows these tree species (art/flora), carried to the art worker in the style
/** Load timings (ms since the page started): the view built (the page's own sprites drawn), ready to play. */
const loadTimes = { viewStart: performance.now(), view: 0, ready: 0 };
// Her look (the character creator's, kept on this browser; else the classic witch).
const savedLook = loadGenome();
/** Whether her look has a hat to lose on a knockout (rules/hat.ts; Ed, 2026-10-06: "If she chooses no hat in character creation, then she simply doesn't have this mechanic"). */
const hasHat = (g: unknown) => (g as { hat?: { shape?: string } } | null)?.hat?.shape !== "none";
const wearHat = (g: unknown) => { const H = game.witches[0].hat; H.has = hasHat(g); if (!H.has) H.down = null; };
wearHat(savedLook);
const view = new View(canvas, game, {
  ...style, pixel: tuning.pixelSize,
  // Trees taller by treeHeight; crowns wider by crownWidth in all (treeHeight widens them too).
  treeSize: style.treeSize * tuning.treeHeight, crownWidth: style.crownWidth * tuning.crownWidth / tuning.treeHeight,
}, savedLook);
loadTimes.view = performance.now();
view.debugCull = params.get("debug") === "cull";
view.quick = params.get("quick") === "1";
// ?scenery=<metres>: a fixed scenery radius instead of the adaptive budget.
const sceneryAt = Number(params.get("scenery"));
if (params.has("scenery") && sceneryAt > 0) view.sceneryFixed = sceneryAt;
const input = new Input();
input.aimFrom = (x, y) => view.aimAt(x, y);
const aimHud = new AimHud(canvas); // the reticle where the mouse aims: 💌 range and the dodge's recharge
/** Where a dodge would put her now (toward the cursor, rules/dash.ts), in client pixels, for the reticle's mark. */
const landV = new Vector3();
function dashLanding(): { x: number; y: number } | null {
  const a = input.lastAim, D = game.buffs.tuning.dash, W = game.witch;
  if (!a || !D.toCursor || W.mode !== "ground") return null;
  const l = Math.hypot(a.x, a.z), dx = l >= D.aimDead ? a.x / l : W.facing, dz = l >= D.aimDead ? a.z / l : 0;
  placed(landV.set(W.x + dx * D.distance, 0, W.z + dz * D.distance)).project(view.camera);
  const r = canvas.getBoundingClientRect();
  return { x: r.left + (landV.x * 0.5 + 0.5) * r.width, y: r.top + (-landV.y * 0.5 + 0.5) * r.height };
}
document.getElementById("next-wave")!.addEventListener("pointerdown", e => { e.preventDefault(); input.touch.nextWave = true; });
document.getElementById("pause-waves")!.addEventListener("pointerdown", e => { e.preventDefault(); input.touch.pauseWaves = true; });
setupTouch(document.body, input.touch);

// Metre rulers and a ground grid: G, the debug button, or on with ?debug.
view.rulers.on = params.has("debug");
const toggleRulers = () => { view.rulers.on = !view.rulers.on; };
window.addEventListener("keydown", e => { if (e.code === "KeyG" && !e.repeat) toggleRulers(); });
// M: the debug minimap (the party's spread: woken areas, the next to wake, the candidates).
window.addEventListener("keydown", e => { if (e.code === "KeyM" && !e.repeat) view.minimap.on = !view.minimap.on; });
document.getElementById("rulers")!.addEventListener("pointerdown", e => { e.preventDefault(); toggleRulers(); });
// The playtest log (Ed, 2026-10-04): a sample every 10 s of play, kept on this browser; L, or
// opening the game with ?playtest=download, saves the last few runs as JSON.
const playtest = new PlaytestLog(game, typeof __BUILD__ === "string" ? __BUILD__ : "dev");
window.addEventListener("keydown", e => { if (e.code === "KeyL" && !e.repeat) playtest.download(); });
if (params.get("playtest") === "download") setTimeout(() => playtest.download(), 500);

// The fight's scale and speed (Ed's motion scale pass): live in the debug overlay (~), [ and ] for
// scale, ; and ' for speed, with sliders and a reset; remembered on this browser; ?fightScale= and
// ?fightSpeed= set where they start. Every change goes in the playtest log.
const FIGHT_DEFAULT = { ...TUNING.fight };
const knobs = document.getElementById("fight-knobs")!;
const setFight = (scale: number, speed: number, log = true, momentum = tuning.fight.momentum) => {
  const clamp = (x: number) => Math.round(Math.min(3, Math.max(0.25, x)) * 100) / 100;
  tuning.fight.scale = clamp(scale); tuning.fight.speed = clamp(speed); tuning.fight.momentum = clamp(momentum); // (shared with the buffed tuning: live mid-fight)
  try { localStorage.setItem("witch.fight", JSON.stringify(tuning.fight)); } catch { /* fine */ }
  for (const [k, v] of [["scale", tuning.fight.scale], ["speed", tuning.fight.speed], ["momentum", tuning.fight.momentum]] as const) {
    (knobs.querySelector(`input[name=${k}]`) as HTMLInputElement).value = String(v);
    knobs.querySelector(`.${k}`)!.textContent = v.toFixed(2);
  }
  if (log) playtest.fight(tuning.fight.scale, tuning.fight.speed, tuning.fight.momentum);
};
{
  let start = { ...FIGHT_DEFAULT };
  try { const v = localStorage.getItem("witch.fight"); if (v) start = { ...start, ...JSON.parse(v) }; } catch { /* storage blocked */ }
  const fs = Number(params.get("fightScale")), fv = Number(params.get("fightSpeed"));
  if (fs > 0) start.scale = fs;
  if (fv > 0) start.speed = fv;
  const fm = Number(params.get("fightMomentum"));
  if (fm > 0) start.momentum = fm;
  setFight(start.scale, start.speed, start.scale !== FIGHT_DEFAULT.scale || start.speed !== FIGHT_DEFAULT.speed || start.momentum !== FIGHT_DEFAULT.momentum, start.momentum ?? FIGHT_DEFAULT.momentum);
}
// Treetop speed, live (the world's knobs: see WORLD_DEFAULT above); area size and the map's are the link's.
const setTreetop = (speed: number, log = true) => {
  world.treetopSpeed = Math.round(Math.min(300, Math.max(8, speed)));
  tuning.treetopSpeed = world.treetopSpeed;
  (game.buffs as { base?: unknown }).base = undefined; // (a legend's buffed copy is made afresh with it)
  try { localStorage.setItem("witch.world", JSON.stringify(world)); } catch { /* fine */ }
  (knobs.querySelector("input[name=treetop]") as HTMLInputElement).value = String(world.treetopSpeed);
  knobs.querySelector(".treetop")!.textContent = String(world.treetopSpeed);
  knobs.querySelector(".area")!.textContent = `${world.areaSize} m, ${world.mapAreas} x ${world.mapAreas}`;
  if (log) playtest.world(world.areaSize, world.treetopSpeed, world.mapAreas);
};
setTreetop(world.treetopSpeed, world.areaSize !== WORLD_DEFAULT.areaSize || world.treetopSpeed !== WORLD_DEFAULT.treetopSpeed || world.mapAreas !== WORLD_DEFAULT.mapAreas);
knobs.querySelector(".world-reset")!.addEventListener("click", () => {
  try { localStorage.removeItem("witch.world"); } catch { /* fine */ }
  for (const k of ["areaSize", "areaScale", "treetopSpeed", "mapAreas"]) params.delete(k);
  location.search = params.toString(); // (a new map: area size and the map's are made with it)
});
knobs.addEventListener("input", e => { const el = e.target as HTMLInputElement; if (el.name === "treetop") { setTreetop(+el.value); return; } setFight(el.name === "scale" ? +el.value : tuning.fight.scale, el.name === "speed" ? +el.value : tuning.fight.speed, true, el.name === "momentum" ? +el.value : tuning.fight.momentum); });
knobs.querySelector(".fight-reset")!.addEventListener("click", () => setFight(FIGHT_DEFAULT.scale, FIGHT_DEFAULT.speed, true, FIGHT_DEFAULT.momentum));
for (const ev of ["pointerdown", "keydown"]) knobs.addEventListener(ev, e => e.stopPropagation()); // (its own presses don't fly her)
window.addEventListener("keydown", e => {
  const k = { BracketLeft: [1 / 1.1, 1, 1], BracketRight: [1.1, 1, 1], Semicolon: [1, 1 / 1.1, 1], Quote: [1, 1.1, 1], Comma: [1, 1, 1 / 1.1], Period: [1, 1, 1.1] }[e.code];
  if (k) setFight(tuning.fight.scale * k[0], tuning.fight.speed * k[1], true, tuning.fight.momentum * k[2]);
});

// The action bar (1 2 3 4 Q W E R, its keys and recharge) replaces the old line of controls (Ed,
// 2026-10-04); H shows or hides it (remembered on this browser).
let barOn = true;
try { if (localStorage.getItem("witch.bar") === "off") { barOn = false; view.actionBar.visible = false; } } catch { /* storage blocked: shown */ }
window.addEventListener("keydown", e => {
  if (e.code !== "KeyH" || e.repeat) return;
  barOn = !barOn; view.actionBar.visible = barOn;
  try { localStorage.setItem("witch.bar", barOn ? "on" : "off"); } catch { /* fine */ }
});

// Auto-talk (Ed's playtest, 2026-10-04: a new player wanted to turn it off): 1 or T, or a click
// on its slot, turns it on or off (remembered on this browser); off, she talks while Shift is held.
let autoTalk = true;
try { if (localStorage.getItem("witch.autotalk") === "off") autoTalk = false; } catch { /* storage blocked: on */ }
view.actionBar.autoTalk = autoTalk;
view.actionBar.onAutoTalk = () => { input.touch.autoTalk = true; };
const setAutoTalk = (on: boolean) => {
  autoTalk = on; view.actionBar.autoTalk = on;
  try { localStorage.setItem("witch.autotalk", on ? "on" : "off"); } catch { /* fine */ }
};

declare const __BUILD__: string;
document.getElementById("version")!.textContent = typeof __BUILD__ === "string" ? __BUILD__ : "dev";
// The start screen, full screen: What's new in this build (config/changelog/) and what's coming up
// (the open pull requests, listed at deploy time), the controls below (src/ui/startScreen.ts).
declare const __BUILD_DATE__: string;
setupStartScreen({
  el: document.getElementById("start")!, build: typeof __BUILD__ === "string" ? __BUILD__.split(" ")[0] : "dev",
  builtOn: typeof __BUILD_DATE__ === "string" ? __BUILD_DATE__ : new Date().toISOString().slice(0, 10), versions: CHANGELOG_VERSIONS, upcoming: UPCOMING,
});
const seedEl = document.getElementById("seed")!;
seedEl.innerHTML = `seed <a href="?seed=${seed}">${seed}</a>`;
const debugEl = document.getElementById("debug")!, startEl = document.getElementById("start")!;
const debugButtons = document.getElementById("debug-buttons")!;
const clockEl = document.getElementById("clock")!, clockT = clockEl.querySelector<HTMLElement>(".t")!, clockLabel = clockEl.querySelector<HTMLElement>(".label")!;
/** The party spell's button (Ed, 2026-10-06: "a button on the screen that says "CAST THE PARTY SPELL""): a click or a tap,
 *  or Enter (once play has begun, so the start screen's Enter isn't it), casts it on the next step. */
const castBtn = document.getElementById("cast")!;
let castQueued = false;
const queueCast = () => { if (awaitingSpell(game.party) && !game.clock.paused) castQueued = true; };
for (const ev of ["pointerdown", "pointerup", "touchstart"]) castBtn.addEventListener(ev, e => e.stopPropagation()); // (not the game's input)
castBtn.addEventListener("click", e => { e.stopPropagation(); queueCast(); });
window.addEventListener("keydown", e => { if (e.code === "Enter" && game.clock.time > 0.3 && !creator.open) queueCast(); });
/** The game clock, top centre (Ed, 2026-10-06): the time played, mm:ss from 0, held while paused; under it, in debug, the
 *  wave's line. (The wave timer bar on the right is gone: the wave pointer's ring carries the countdown.) */
function waveHud(): void {
  const cd = waveCountdown(game.party, game.map, game.clock.time);
  clockEl.classList.toggle("on", game.clock.time > 0 || !game.clock.paused);
  const now = clockText(clockSeconds(game.party, game.clock.time));
  if (clockT.textContent !== now) clockT.textContent = now;
  // before the party spell (Ed, 2026-10-06: the game starts when she casts it), its button in the middle of the screen
  const ask = awaitingSpell(game.party) && !game.clock.paused && !creator.open;
  castBtn.classList.toggle("on", ask);
  clockEl.classList.toggle("paused", game.clock.paused);
  const clock = (s: number) => { const n = Math.ceil(s); return n >= 60 ? `${Math.floor(n / 60)}:${String(n % 60).padStart(2, "0")}` : `${n} s`; };
  const left = tuning.party.interval >= 1e9 ? "waves off" : cd.booting ? `booting · ${clock(cd.bootLeft)}` : clock(cd.left);
  clockLabel.textContent = debugOn ? `wave ${game.party.wave} · ${game.party.areas.size} areas · ${left}` : "";
  // The boot-up over (Ed, 2026-10-05: five quiet minutes from her first step): a quiet word under the clock.
  if (!bootShown && !cd.booting && game.party.bootUntil > 0 && game.clock.time >= game.party.bootUntil && tuning.party.interval < 1e9) {
    bootShown = true;
    const pop = document.createElement("div");
    pop.className = "boot-pop";
    pop.textContent = `speakers up · wave 1 in ${clock(cd.left)}`;
    clockEl.append(pop);
    setTimeout(() => pop.remove(), 4000);
  }
}
let bootShown = false;
// A soundsystem lost (Ed, 2026-10-05): the next wave comes sooner; the clock flashes and the seconds taken off pop out
// under it ("−60 s", "wave now!"), and the wave pointer's ring jumps on.
let lossShown = -1;
function showLoss(e: WaveEvent): void {
  lossShown = e.at;
  clockEl.classList.remove("lost"); void clockEl.offsetWidth; clockEl.classList.add("lost"); // (restart the animation)
  const pop = document.createElement("div");
  pop.className = "loss-pop";
  pop.textContent = e.left <= 0 ? "wave now!" : `\u2212${Math.round(e.cut)} s`;
  clockEl.append(pop);
  setTimeout(() => pop.remove(), 1800);
  setTimeout(() => { if (lossShown === e.at) clockEl.classList.remove("lost"); }, 900);
}
let debugOn = params.has("debug");
debugEl.classList.toggle("on", debugOn);
debugButtons.classList.toggle("on", debugOn); knobs.classList.toggle("on", debugOn);

const fit = () => view.resize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", fit);
fit();

// Make the art and ground round the start before the first frame, behind the start screen.
let ready = false;
// The start screen's progress bar: the sets of sprites drawn so far. Play can start once what the
// start needs is ready; the rest is drawn in the background (nearest areas first).
const progressEl = document.getElementById("progress")!, progressFill = progressEl.querySelector<HTMLElement>(".fill")!, progressLabel = progressEl.querySelector<HTMLElement>(".label")!;
const showProgress = setInterval(() => {
  const a = view.assets, done = a.done, total = done + a.pending;
  progressFill.style.width = `${total ? (100 * done) / total : 0}%`;
  progressLabel.textContent = ready ? `the rest of the forest, in the background: ${done} of ${total}` : `growing the forest: ${done} of ${total}`;
  if (ready && !a.pending) { progressEl.classList.add("done"); clearInterval(showProgress); }
}, 250);
requestAnimationFrame(() => setTimeout(async () => {
  await view.prepare();
  ready = true;
  loadTimes.ready = performance.now();
  startEl.classList.remove("loading");
}, 0));

// The volume (Ed's playtest, 2026-10-04): a slider in the corner, 0 mutes; remembered on this browser.
// (The music is the only sound for now; sound effects will follow the same level.)
let level = 0.8;
try { const v = localStorage.getItem("witch.volume"); if (v !== null && !isNaN(+v)) level = Math.min(1, Math.max(0, +v)); } catch { /* storage blocked */ }
const volumeEl = document.createElement("label");
volumeEl.id = "volume";
volumeEl.title = "volume (0 mutes)";
Object.assign(volumeEl.style, { position: "fixed", right: "10px", bottom: "12px", zIndex: "3", display: "flex", alignItems: "center", gap: "4px", padding: "2px 6px", borderRadius: "6px", background: "rgba(14,11,28,.55)", color: "#e8e2f4", font: "12px ui-monospace, Menlo, Consolas, monospace", pointerEvents: "auto" });
const volumeIcon = document.createElement("span"), volumeRange = document.createElement("input");
volumeRange.type = "range"; volumeRange.min = "0"; volumeRange.max = "100"; volumeRange.value = String(Math.round(level * 100));
volumeRange.style.width = "80px";
const showVolume = () => { volumeIcon.textContent = level === 0 ? "🔇" : level < 0.4 ? "🔈" : "🔊"; };
volumeRange.addEventListener("input", () => {
  level = +volumeRange.value / 100; showVolume();
  if (music) music.volume = tuning.music.volume * level;
  sfx?.setVolume(tuning.music.volume * level);
  try { localStorage.setItem("witch.volume", String(level)); } catch { /* fine */ }
});
for (const ev of ["pointerdown", "keydown"]) volumeRange.addEventListener(ev, e => e.stopPropagation()); // its own presses and arrow keys don't fly her
volumeEl.append(volumeIcon, volumeRange); showVolume();
document.body.append(volumeEl);
// The freeze (Esc, gamepad Start, the ❚❚ button): a true still for screenshots, . steps (platform/freeze.ts).
const freeze = new Freeze(game, seed!, typeof __BUILD__ === "string" ? __BUILD__ : "dev");
freeze.started = () => startEl.style.display === "none";

// Browsers keep sound off until the player presses something: the start screen is that press.
let audio: AudioContext | null = null, music: Music | null = null, sfx: Sfx | null = null, sfxCues: SfxCues | null = null;
// The character creator (Ed, 2026-10-05): at every load (and from the start screen's button);
// ?creator=0 skips it (tests, the smoke run), and loading is the start screen's as before.
// It's also the loading screen (Ed, 2026-10-05): it opens at once and the forest grows behind it;
// Start waits ("getting ready") until play can begin.
const creator = new Creator(style, savedLook, tuning.pixelSize);
(window as unknown as { __creator: Creator }).__creator = creator; // (the creator's smoke scripts read her place in the room)
let lookNow = JSON.stringify(savedLook);
creator.progress = () => { const a = view.assets; return { done: a.done, total: a.done + a.pending, ready }; };
/** The sound effects, once there's an AudioContext (the creator's first click, or the start). */
function ensureSfx(): void { if (audio && !sfx && tuning.sfx.on) { sfx = new Sfx(audio, tuning.music.volume * level, tuning.sfx, musicStyle.root + 24); sfxCues = new SfxCues(sfx, (by, sec) => music?.duck(by, sec)); } }
// (its room's ambience plays while it's open: overnight, 2026-10-06)
creator.onGesture = () => { try { audio ??= new AudioContext(); void audio.resume(); ensureSfx(); } catch { /* no sound yet */ } };
creator.onStart = g => { if (JSON.stringify(g) !== lookNow) { lookNow = JSON.stringify(g); view.setWitch(g); wearHat(g); } start(); };
if (params.get("creator") !== "0") creator.show();
const lookBtn = document.getElementById("look-btn");
if (lookBtn) {
  for (const ev of ["pointerdown", "pointerup", "click", "touchstart"]) lookBtn.addEventListener(ev, e => e.stopPropagation()); // (not a start)
  lookBtn.addEventListener("click", () => { if (ready && game.clock.paused) creator.show(); });
}
function start(): boolean {
  if (!ready || !game.clock.paused || freeze.frozen) return false;
  if (creator.open) return true;
  try { audio ??= new AudioContext(); void audio.resume(); if (!music && tuning.music.on) music = new Music(audio, tuning.music.volume * level, musicStyle, seed!, tuning.music.src); ensureSfx(); } catch { /* no sound yet anyway */ }
  game.clock.paused = false;
  startEl.style.display = "none";
  input.clearPresses();
  return true;
}
input.onAny = start;
// The audio watchdog (Ed, round 13: "the music stops after about two minutes"): once a second,
// a context suspended is resumed, and music gone silent (or anything non-finite in the music or the
// sound effects) is rebuilt afresh; each mend goes in the playtest log (L). (Before the first home speaker
// boots, the music is silent on purpose: not expected.)
const watchdog = new AudioWatchdog(
  () => ({ ctx: audio, music, sfx, wanted: !!audio && !game.clock.paused && !freeze.frozen && !document.hidden, musicExpected: !!music && level > 0 && music.audible && !game.clock.paused && !freeze.frozen && !document.hidden && game.speakerBoot.some(t => t !== null) }),
  what => {
    playtest.audio(what);
    console.warn(`audio watchdog: ${what}`);
    if (!audio) return;
    if ((what === "music-silent" || what === "music-nonfinite") && music) { music.dispose(); music = new Music(audio, tuning.music.volume * level, musicStyle, seed!, tuning.music.src); }
    if (what === "sfx-nonfinite" && sfx) { sfx.dispose(); sfx = null; sfxCues = null; ensureSfx(); }
  },
);
setInterval(() => { try { watchdog.check(); } catch { /* never let the watchdog itself stop anything */ } }, 1000);
let lastMix: ReturnType<typeof musicMix> | null = null;
const r2 = (x: number) => Math.round(x * 100) / 100;
playtest.audioState = () => ({ state: audio?.state ?? "none", volume: music ? r2((music.output as GainNode).gain.value) : 0, distort: r2(lastMix?.distort ?? 0), distance: Math.round(Math.min(9999, lastMix?.distance ?? 9999)), mends: watchdog.mends.length });
freeze.onToggle = on => { try { void (on ? audio?.suspend() : audio?.resume()); } catch { /* no sound */ } };
startOnGesture(startEl, start); // a click or a tap starts; a touch that drags scrolls the text
// The wave selector on the start screen: picking one doesn't start the game.
const wavesEl = document.getElementById("waves")!;
wavesEl.innerHTML = "waves every " + WAVE_CHOICES.map(s => `<button type="button" data-s="${s}">${s === 0 ? "off" : s < 60 ? s + " s" : s / 60 + " min"}</button>`).join("");
wavesEl.addEventListener("pointerdown", e => {
  e.stopPropagation();
  const b = (e.target as HTMLElement).closest("button");
  if (!b) return;
  const sec = +b.dataset.s!;
  setWaveInterval(sec);
  try { localStorage.setItem("witch.wave", String(sec)); } catch { /* fine */ }
});
setWaveInterval(waveChoice);
// Screen shake when she's hit (Ed, 2026-10-05; render/shake.ts), laid on the canvas as a transform.
// For comfort it can be turned off: ?shake=0, or the start screen's toggle (remembered here).
let shakeOn = params.get("shake") !== "0";
try { if (params.get("shake") === null && localStorage.getItem("witch.shake") === "0") shakeOn = false; } catch { /* fine */ }
const shake = new Shake(tuning.camera.shake, shakeOn), shakeEl = document.getElementById("shake-opt");
const showShakeOpt = () => { if (shakeEl) shakeEl.innerHTML = `screen shake <button type="button" data-v="1" class="${shake.on ? "on" : ""}">on</button><button type="button" data-v="0" class="${shake.on ? "" : "on"}">off</button>`; };
showShakeOpt();
shakeEl?.addEventListener("pointerdown", e => {
  e.stopPropagation();
  const b = (e.target as HTMLElement).closest("button");
  if (!b) return;
  shake.on = b.dataset.v === "1";
  try { localStorage.setItem("witch.shake", shake.on ? "1" : "0"); } catch { /* fine */ }
  showShakeOpt();
});
let shaken = false;
// ?subpixel=0: the camera's old whole-art-pixel steps, to compare (on by default: Ed, 2026-10-05, "it feels low").
const subpixelOn = params.get("subpixel") !== "0";
if (params.get("glide") === "camera") view.glide = "camera"; // (?glide=camera: the glide by the camera's snap, as before 2026-10-06)
// Ed's decisions panel (src/ui/decide.ts, config/decisions.json): ?decide opens it, F2 opens and closes it.
let decide: DecidePanel | null = null;
const decidePanel = (open: boolean) => decide ??= new DecidePanel({ tuning: game.tuning, seed: game.seed, version: typeof __BUILD__ === "string" ? __BUILD__ : "dev", live: { glide: v => { view.glide = v === "camera" ? "camera" : "witch"; } } }, open);
if (params.has("decide")) decidePanel(true);
window.addEventListener("keydown", e => { if (e.code !== "F2") return; e.preventDefault(); if (decide) decide.toggle(); else decidePanel(true); });
function applyShake(): void {
  const W = game.witches[0];
  shake.watch(W.health, !!W.ko, tuning.witchHealth.hits, game.clock.time);
  const o = shake.offset(game.clock.time, tuning.pixelSize);
  // The camera's sub-pixel glide (view.subpixel): the snap it took off, given back in whole screen pixels.
  const p = tuning.pixelSize, gx = subpixelOn ? Math.round(view.subpixel.x * p) : 0, gy = subpixelOn ? Math.round(view.subpixel.y * p) : 0;
  if (o.amount <= 0) {
    if (gx || gy) { canvas.style.transform = `translate(${gx}px, ${gy}px)`; shaken = true; }
    else if (shaken) { canvas.style.transform = ""; shaken = false; }
    return;
  }
  // Zoomed in just enough that no edge shows while it's off centre and turned.
  const w = window.innerWidth, h = window.innerHeight, turn = Math.abs((o.rot * Math.PI) / 180) * 0.5 * Math.hypot(w, h);
  const zoom = 1 + (2 * (Math.max(Math.abs(o.x), Math.abs(o.y)) + turn)) / Math.min(w, h);
  canvas.style.transform = `translate(${o.x + gx}px, ${o.y + gy}px) rotate(${o.rot.toFixed(3)}deg) scale(${zoom.toFixed(4)})`;
  shaken = true;
}
document.addEventListener("visibilitychange", () => { if (document.hidden) last = 0; });

let lastDraw = 0;
let last = 0;
const frameStats = new FrameStats(view.renderer.getContext());
// Frames of 100 ms or more, with what they spent it on (Ed, 2026-10-06: occasional half-second freezes): the overlay and the playtest log.
const stallLog = new StallLog();
playtest.stalls = () => stallLog.stalls;
/** Driven from outside (the perf check, tools/smoke): the loop below stands still, and
 *  window.witch.frame steps and draws one frame of a fixed length instead. */
let manual = false;
let overShown = false;
document.getElementById("again")?.addEventListener("click", () => location.reload());
document.getElementById("fresh")?.addEventListener("click", () => { const u = new URL(location.href); u.searchParams.set("seed", String(Math.floor(Math.random() * 1e6))); location.href = u.toString(); });
function frame(now: number): void {
  requestAnimationFrame(frame);
  if (manual) return;
  const dt = last ? (now - last) / 1000 : 0;
  last = now;
  const work0 = performance.now();
  frameStats.frame(dt * 1000);
  freeze.pollPad();
  const c = input.read();
  if (castQueued) { c.castParty = true; castQueued = false; }
  if (c.toggleAutoTalk) setAutoTalk(!autoTalk);
  c.autoTalk = autoTalk;
  if (c.debug) { debugOn = !debugOn; debugEl.classList.toggle("on", debugOn); debugButtons.classList.toggle("on", debugOn); knobs.classList.toggle("on", debugOn); }
  view.debugReadouts = debugOn;
  const step0 = performance.now();
  stepGame(game, c, dt);
  const stepMs = performance.now() - step0;
  // The party's over (rules/partyOver.ts; Ed, 2026-10-06): no end screen and no pause, the afterparty. Once it has eased
  // in, a small card under the clock says so, with the time she lasted, and a way to play again.
  if (game.partyOver && game.partyOver.ease >= 1 && !overShown) {
    overShown = true;
    document.getElementById("over-stats")!.textContent = `You lasted ${Math.floor(game.partyOver.at / 60)} min ${Math.floor(game.partyOver.at % 60)} s and ${game.party.wave} waves.`;
    document.getElementById("over")!.classList.add("on");
  }
  const log0 = performance.now();
  playtest.update();
  const audio0 = performance.now();
  // The music: one track, mixed by how near the witch is to a playing soundsystem.
  musicCueNow = musicCue(game, musicCueNow);
  lastMix = musicMix(game, game.witch);
  music?.update(lastMix, musicCueNow, game.clock.time, game.beat, !game.clock.paused, tuning.music, (game as { timeScale?: number }).timeScale ?? 1); // (the world slowed in a legend's circle: the music with it)
  if (!game.clock.paused) sfxCues?.update(game, game.clock.time);
  sfx?.room(creator.open ? 1 : 0); // the creator's room in the treehouse
  const outside = { playtest: audio0 - log0, audio: performance.now() - audio0 }; // (for the stall log: not the view's own parts)
  if (!ready) return;
  for (const e of game.waveEvents) if (e.at > lossShown) showLoss(e);
  waveHud();
  // Behind the start screen, a frame every 0.3 s is plenty: the CPU goes to drawing the forest's
  // art in the background instead (and so slow a frame doesn't count against the scenery budget).
  if (game.clock.paused && !freeze.frozen && now - lastDraw < 300) return;
  lastDraw = now;
  // Drawn between the last two fixed steps (game time: party transitions, sigils and waves are stamped in it).
  frameStats.beginGpu();
  interpolated(game, () => view.render(Math.max(0, game.clock.time - (1 - game.alpha) * STEP * game.timeScale))); // (the world's step is STEP x timeScale: rules/slowTime.ts)
  frameStats.endGpu();
  aimHud.update(game, game.herTime, input.cursor, input.lastAim, startEl.style.display === "none", dashLanding());
  frameStats.work(performance.now() - work0);
  if (!game.clock.paused) stallLog.frame({ t: game.clock.time, gap: dt * 1000, work: performance.now() - work0, step: stepMs, parts: { ...view.ms, ...outside }, mode: game.witch.mode, x: game.witch.x, z: game.witch.z, wave: game.party.wave, creatures: game.creatures.length });
  applyShake();
  freeze.update();
  // The overlay, four times a second (a new text every frame was a page layout every frame), with
  // its buttons kept just below it however many lines it has.
  if (debugOn && now - lastDebug > 250) {
    lastDebug = now;
    const w = game.witch, s = view.stats;
    debugEl.textContent = [
      ...frameStats.lines(),
      stallLog.line(),
      `seed   ${seed}`,
      `area   ${areaUnderWitch(game)}`,
      `mode   ${w.mode}`,
      `at     ${w.x.toFixed(0)}, ${w.z.toFixed(0)} m   zoom ${game.camera.zoomStep}`,
      `trees  ${s.trees}  bushes ${s.bushes}  creatures ${s.creatures}`,
      `budget scenery to ${s.sceneryRadius.toFixed(0)} m (${s.scenery})  gameplay ${s.gameplay}  dropped ${s.dropped}`,
      `draws  ${s.drawCalls}  art queued ${s.pendingArt}  ground tiles ${s.pendingGround}`,
      ...(game.lod ? [`sim    full ${game.lod.full}  coarse ${game.lod.coarse}  frozen ${game.lod.frozen}   marching full ${game.lod.marchFull}  coarse ${game.lod.marchCoarse}`] : []),
      ...powerLines(),
    ].join("\n");
    debugButtons.style.top = `${debugEl.offsetTop + debugEl.offsetHeight + 6}px`;
  }
}
let lastDebug = -Infinity;
requestAnimationFrame(frame);

/** The power meter (Ed, 2026-10-04): fighting value, Σ √(hp × dps) (rules/power.ts), of the party
 *  (leashed and parked) against each siege and every besieger together. */
function powerLines(): string[] {
  const p = powerReport(game.creatures, game.witches, game.combat.sounds), n = p.counts, f = (x: number) => x.toFixed(0);
  const sieges = p.sieges.slice(0, 4).map(s => `${s.key} ${f(s.value)} (${s.count}, ${f(s.hp)} hp)`).join("  ");
  return [
    `power  party ${f(p.leashed + p.parked)} = leashed ${f(p.leashed)} + parked ${f(p.parked)}   ${n[0]}b ${n[1]}y ${n[2]}a ${n[3]}L   berries ${game.tally.berries} invites ${game.tally.invites}`,
    `wild   grown ${game.growth.grown} a wave at a time, ${game.growth.made} come out, ${game.growth.grown - game.growth.made} waiting as counts   creatures ${game.creatures.length}`,
    (() => { const L = leashLoad(game), W = game.tuning.leash.weight; return `load   ${L.total.toFixed(2)} pull, ${L.over.toFixed(2)} over the free ${W.free}${L.extreme ? " EXTREME" : ""}${L.total ? `  toward ${Math.round((Math.atan2(L.x, -L.z) * 180) / Math.PI + 360) % 360}°` : ""}   stack ${game.leash.stack.length}   lift ${game.witch.lift.toFixed(2)}`; })(),
    `enemy  marching ${f(p.marching)}${p.sieges.length ? `   ${sieges}${p.sieges.length > 4 ? ` +${p.sieges.length - 4} more` : ""}` : ""}   (L saves the playtest log)`,
  ];
}

// For the smoke test and for poking at in the console.
(window as unknown as { witch: unknown }).witch = { game, view, arena: (spec: string) => setupArena(game, spec), // (a debug hook: another arena without reloading)
  /** A debug hook (screenshots of the party's life): creature `id` joins its area's party, happy, at its spot (rules/partyGuests.ts); home's round the dancefloor. */
  guest: (id: number) => { const c = game.creatures[id], a = game.party.areas.get(cellKey(c.cell)); if (!c || !a) return false; c.state = "happy"; c.enraged = false; c.siege = undefined; joinParty(game, c, a.soundsystem ?? game.map.dancefloor, a.cell); return true; },
  /** A debug hook: lose a soundsystem now (its key, "home" the dancefloor's ring), as if destroyed. */
  lose: (key = "home") => { const s = game.combat.sounds.get(key); if (s) s.hp = 0; loseSoundsystem(game, key, s?.x ?? 0, s?.z ?? 0); const e = game.waveEvents[game.waveEvents.length - 1]; if (e) showLoss(e); return e; },
  /** A debug hook (the dropped hat's previews): a hit on her now, as a creature's would be (her last one knocks her out). */
  hit: () => { hitWitch(game, 0, game.clock.time); return !!game.witches[0].ko; },
  get manual() { return manual; }, set manual(on: boolean) { manual = on; },
  /** A debug hook (tools/sfx/live.cjs): the audio context, the music and the sound effects. */
  get audio() { return { ctx: audio, music, sfx, mends: watchdog.mends }; },
  /** A debug hook for frame feel (tools/feel/trace.cjs): one frame as the real loop runs it (the
   *  fixed steps, the render eased between the last two, the camera's sub-pixel glide), then where
   *  things landed on screen, in screen pixels as drawn (the art-pixel snap and the canvas's shift):
   *  the witch, ground points (probes, metres) and creatures (ids). */
  frameLive: (c: Parameters<typeof stepGame>[1], dt: number, probes: { x: number; z: number }[] = [], ids: number[] = []) => {
    const t0 = game.clock.time;
    stepGame(game, c, dt);
    const steps = Math.round((game.clock.time - t0) / STEP), alpha = game.alpha, P = tuning.pixelSize;
    const v = new Vector3(), ndc = (x: number, y: number, z: number) => { placed(v.set(x, y, z)).project(view.camera); return v; };
    const snap = (n: Vector3) => [(Math.floor((n.x * 0.5 + 0.5) * view.width) + 0.5) * P, (Math.floor((-n.y * 0.5 + 0.5) * view.height) + 0.5) * P];
    let at: { witch: number[]; probes: number[][]; creatures: (number[] | null)[]; witchWorld: number[] } = { witch: [], probes: [], creatures: [], witchWorld: [] };
    interpolated(game, () => {
      view.render(Math.max(0, game.clock.time - (1 - game.alpha) * STEP * game.timeScale));
      const W = game.witch, B = view.witchBase;
      bendPoint(v.set(B.x, B.y, B.z)).project(view.camera);
      at = { witch: snap(v), witchWorld: [W.x, W.z], probes: probes.map(p => snap(ndc(p.x, 0, p.z))), creatures: ids.map(id => { const k = game.creatures[id]; return k ? snap(ndc(k.x, 0, k.z)) : null; }) };
    });
    applyShake();
    const P2 = tuning.pixelSize, gx = subpixelOn ? Math.round(view.subpixel.x * P2) : 0, gy = subpixelOn ? Math.round(view.subpixel.y * P2) : 0;
    const add = (q: number[] | null) => (q ? [q[0] + gx, q[1] + gy] : null);
    return { steps, alpha, gx, gy, time: game.clock.time, witch: add(at.witch), witchWorld: at.witchWorld, probes: at.probes.map(add), creatures: at.creatures.map(add) };
  },
  frame: (c: Parameters<typeof stepGame>[1], dt: number, draw = true) => { const t0 = performance.now(); stepGame(game, c, dt); const t1 = performance.now(); view.render(game.clock.time, draw); applyShake(); return { step: t1 - t0, render: performance.now() - t1, ms: view.ms }; }, areaUnderWitch: () => areaUnderWitch(game), areaTypeId: (i: number) => AREA_TYPES[i].id, lightUniforms: LIGHT_UNIFORMS, spriteUp: () => SPRITE_UNIFORMS.uUp.value, spriteRight: () => SPRITE_UNIFORMS.uRight.value, groundHeight, loadTimes, get ready() { return ready; } };
