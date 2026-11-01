// The Three.js view: reads the game state each frame and draws it. Rendered into a canvas of
// (window size / pixel size) and stretched with nearest-neighbour by the browser, so every art
// pixel stays a crisp square.
import { RigView } from "./rig/rigView";
import { CauldronView } from "./cauldronView";
import { FxMock } from "./fxMock";
import { fxFor } from "./fx/system";

const FX_MOCK_MODE = new URLSearchParams(globalThis.location?.search ?? "").get("fxmock");
import type { RigGear } from "./rig/rigBuild";
import type { Creature } from "../rules/creatures";
import { partyGearOf } from "./artBuild";

import * as THREE from "three";
import { type ReadyProgram } from "./programReadiness";
import { installShaderDrawGate, type ShaderDrawStatus } from "./shaderDrawGate";
import { LandingArtFade } from './landingReadiness';

import { deckOf } from "../rules/treehouse";

import { StationBackdrop } from "./stationBackdrop";
import type { MapTable } from "./mapTable";
import { islandArtSeed } from "./artCache";
import { biomeKey } from "../rules/lakeLooks";
import { HouseRoomsView } from "./houseRooms";
import { CrownView, type PlanMap } from "./crown";
import { CrownLandmark } from "./crownLandmark";

// (the house's outline for the crown: only what it reads, so the floor's traced rings stay out of the bundle)



import { Hiz } from "./hiz";
/** How near the treehouse (m, the camera) its occluders are built (render/hiz.ts). */
const HIZ_NEAR = 120;
/** Where the hard cut-away (the quality ladder) cuts on the hole's soft fade: crowns there drawn whole only once nearly whole, so the
 *  hole reads as big as the soft one (at half, the band's dark undersides came in solid). */
const HOLE_HARD_AT = 0.9;

import { sigilColour } from "../../art/generator.js";
import type { Game } from "../rules/game";



import { type Shot, type TreeExtent } from "../rules/arrive";
import { FALLBACK_LOOK, type FloorLook } from "./legendFloor";
import { AREA_TYPES, HOME_LOOK, type LegendClearing } from "../rules/map";


import { AssetLibrary } from "./assets";
import type { LightSource } from "../rules/forest";
import { discoJob, type Ground } from "./ground";
import { IslandLayers } from "./island";
import { Sky } from "./sky";

import { type MoonState } from "../rules/moon";
import { Clouds } from "./clouds";
import { Smoke } from "./smoke";

import { LakeShoreView } from "./lakeShore";

import type { ForestMap } from "../rules/map";
import { OcclusionProbes } from "./occlusion";
import { Ride } from "./ride";
import { HEIGHT_VERT_GLSL, type HeightField } from "./height";
import { applyStyleLight, LIGHT_UNIFORMS } from "./lighting";
import { AreaMoods, hsvInto, moodOf } from "./mood";
import { hsv2rgb } from "../../art/generator.js";
import { Post } from "./post";
import { GrassView } from "./grass";
import { SpellFx } from "./spellfx";
import { dodgeEchoesFor } from "./view/dodgeEchoes";
import { WitchTrail } from "./trail";
import { newPartyOverLook } from "./partyOver";
import { SwoopTrails } from "./swoopTrails";

import { InviteView, type HerOffset } from "./invites";
import { StateMarks } from "./looks";
import type { Dancefloor } from "./dancefloor";
import { PartyView } from "./party";
import { MarkerArt, MarkerFx, type Mote } from "./markers";
import { type SpawnMarker } from "../rules/party";
import { WaveNumbers } from "./waveNumbers";
import { StringLightsView } from "./strings";
import { LeashView } from "./leash";
import { CombatLight } from "./combatLight";
import { Lasers, type RingSpeaker } from "./lasers";
import { SigilHolograms } from "./hologram";

import { PartyWitchView } from "./partyWitches";
import { BeachView } from "./beach";
import { PartyObjectsView } from "./partyObjects";
import { BorderView } from "./borders";
import { StoneIndicator } from "./indicator";
import { Pin, type PinLook, type PinTarget } from "./pins";
import type { AlarmIndicators } from "./alarm";
import { newAlarms } from "../rules/alarms";

import type { Minimap } from "./minimap";
import { Rulers } from "./rulers";
import { Mist } from "./mist";
import { LightRings } from "./lightRings";
import { LoadingMist } from "./loadingMist";
import { typeReaches } from "./loadingFront";
import { SHADOW_DEBUG, ShadowBatch, type ShadowInstance } from "./shadows";
import { type TrunkShadowBatch } from "./trunkShadows";
import { CastShadowMap } from "./castShadows";
import { newBudget, type SceneryBudget } from "../rules/budget";

import { GpuLedger } from "./gpuLedger";
import { newGpuState } from "./view/gpuBudget";

import { type LeyLines } from "./leylines";


import { Glades } from "./glades";
import { Wisps } from "./wisps";
import { leyChain } from "../rules/leylines";
import { SPRITE_UNIFORMS, SpriteBatch, metresPerArtPixel } from "./sprites";
import type { Spin } from "./spin";
import { nextFrame, runSliced, runSync, type Steps } from "./slices";
import { holdDisposals } from "./retire";
import { Fireworks } from "./fireworks";
import type { Style } from "./style";
import type { Tuning } from "../rules/tuning";
import type { SleepTrack } from "./legendSleep";

// The view's parts, each in its own module under view/ (issue #122), as functions of the View:
// what the camera can see, the pop check, the scenery rebuild, creatures and berries, home's
// pieces (markers, speakers, treehouse), and the lights. Its fields they share aren't private.
import { overBulge } from "./view/culling";





import { entDeckDrawn } from "./view/home";
import { ZooExitTag } from "./zooExit";
import { CastTag } from "./castTag";



import { newReveal } from "./view/reveal";

import { MushroomView } from './mushrooms';
import { PotionObserversView } from './potionObservers';






/** Her shadow, lying on the rolling ground corner by corner. */
const SHADOW_VERT = `varying vec2 vUv;
${HEIGHT_VERT_GLSL}
void main(){ vUv = uv; gl_Position = clipOf(onGround((modelMatrix * vec4(position, 1.0)).xyz)); }`;

/** A point light: where, how far it reaches, its colour and strength. */
/** The zoo's plaza's own soft light over the World Tree (the legend circles' moonlit cyan). */
const PLAZA_RGB = new THREE.Vector3(0.55, 0.85, 0.9);
export interface ForestLight { x: number; y: number; z: number; reach: number; rgb: THREE.Vector3; strength: number;
  /** a light things cast shadows from (render/trunkShadows.ts), as a campfire's: where they're thrown from and how strongly (0 to 1);
   *  the soundsystems' and runestones' (Ed, 2026-10-13: "the light that soundsystems and runestones produce" casting shadows) */
  shadow?: { x: number; y: number; z: number; k: number } }

/** A frame's CPU budget (ms) for the view, drawing included, of which the work done ahead (the
 *  forest, the hills, ground tiles, art) gets whatever the frame's own work and its drawing (as
 *  the last frames' took) leave, each at least its floor. (It was 9 ms before the drawing: with
 *  the drawing's few ms on top, a frame with work ahead ran long. Ed, 2026-10-05: spiky late in a run.) */
export const FRAME_MS = 11;

export interface ViewStats { berries: number; forestMs: number; forestMissing: number; sceneryRadius: number; fps: number; gameplay: number; scenery: number; dropped: number; trees: number; bushes: number; creatures: number; batches: number; drawCalls: number; pendingArt: number; pendingGround: number; lights: number; heightMoves?: number }

/** Her dropped hat is drawn this far (m) to the side of where she went down, so it isn't under her as she sits slumped
 *  (well inside the pick-up radius of the spot itself). */
export const HAT_BESIDE = 0.9;
export const HAT_INK = new THREE.Vector3(232 / 255, 180 / 255, 106 / 255); // (the HUD's one accent)

/** Which treehouse an island's art draws: the house (art/ent.js HOUSE), the Ent holding the deck, or the old treehouse, "home". */
function treehouseArtId(game: Game): string {
  const t = game.tuning, deck = deckOf(game.map, t);
  return deck ? `${deck.house ? "house" : "ent"}:${deck.h}:${deck.r}` : "home";
}

/** The deck's one warm lantern (over the map table): its colour, made once. */
const DECK_LANTERN_RGB = new THREE.Vector3(1, 0.72, 0.42);
let DROPPED = 0;
const addDropped = (b: { dropped: number }): void => { DROPPED += b.dropped; };

/** The view's own record of one night (View.setGame; docs/plans/sail-without-reload.md A2): everything it eases, tracks, caches
 *  or has asked for of that night's game and island, made fresh as it's made and again for each night after. */
function nightState(t: Tuning) {
  return {
    /** The canopy hole's lead ahead of her on screen (pixels, eased) and when it was last moved. */
    holeLead: { x: 0, y: 0 },
    holeAt: 0,
    /** The place of interest she stands in, kept clear of the scenery in front of it (render/view/reveal.ts), eased. */
    reveal: newReveal(),
    /** The bend the view is easing to (the treetops' when she's rising or up there), for culling. */
    bendTo: 0,
    /** How much each wave number shows over the bent horizon (eased), by its area, and when it was last eased. */
    numberSeen: new Map<string, number>(),
    numbersAt: 0,
    /** How far the camera is lifted to see her over a hill in between (metres, eased). */
    camLift: 0,
    /** The charcoal huts' smouldering mounds near her (looked up when she has moved far), for the smoke. */
    mounds: [] as number[],
    moundsAt: { x: Infinity, z: Infinity },
    /** The smoothed heights she and the camera ride over the hills (ride.ts), and how far hers is
     *  over the ground under her this frame (everything drawn at her adds it). */
    ride: new Ride(),
    camRide: new Ride(),
    rideOff: 0,
    rideTime: NaN,
    /** Arriving from the sea chart (rules/arrive.ts, app/arrive.ts): the flight's shot this frame, in place of the game's camera; null otherwise. */
    fly: null as Shot | null,
    /** Looking through the telescope in the crow's nest (rules/telescope.ts; main.ts sets it each frame): its bearing (degrees from
     *  north), its field of view and its pitch down (degrees); the view's own camera in place of hers (render/view/camera.ts). */
    telescope: null as { heading: number; fov: number; pitch: number } | null,
    /** Tonight's constellation through the telescope (render/view/camera.ts lookAtConstellation): how long (real seconds) she's held
     *  the view on it, its lines' fade (0 to 1), the last frame's real time (ms) and its stars, made once. */
    consHold: 0,
    consLines: 0,
    consAt: 0,
    consStars: null as { key: string; stars: { bearing: number; elevation: number; b: number }[] } | null,
    /** Tonight's loan's lit constellation's stars (render/view/camera.ts litConstellation), kept while it's the same. */
    litStars: null as { key: string; stars: { bearing: number; elevation: number; b: number }[] } | null,
    litLow: null as { key: string; stars: { bearing: number; elevation: number; b: number }[] } | null,
    markerCache: { wave: -1, n: -1, list: [] as SpawnMarker[] },
    /** 1 while she sits on the treehouse terrace, easing to 0 as she takes off. */
    seatK: 1,
    seatTime: 0,
    /** Her last take-off the leashes wouldn't allow (the "grounded" leash event, rules/game.ts), on her clock: the hop (render/view/witch.ts). */
    groundedAt: -9,
    /** The party spell's cast already burst into sparkles (its time). */
    castSeen: undefined as number | null | undefined,
    /** the height of her body's middle this frame (render/view/witch.ts; the claw slashes go over it) */
    witchBodyY: 0.8,
    /** Her feet's height and her frame's height in art pixels this frame (the slashes scale with her: render/leash/bubbles.ts). */
    witchFeetY: 0,
    witchFrameH: 0,
    /** Her trail's last time (her clock). */
    trailAt: -1,
    /** The crowns' reach now (metres; 0 on the ground): eased toward the tuning's scenery.canopyReach in the air (render/view/scenery.ts). */
    canopyNow: 0,
    lastBuild: { x: Infinity, y: Infinity, z: Infinity, version: -1, radius: -1, relics: -1 } as { x: number; y: number; z: number; version: number; radius: number; canopy?: number; relics: number; cap?: number },
    /** The scenery budget: how far round the witch scenery is drawn (rules/budget.ts). */
    budget: newBudget(t) as SceneryBudget,
    /** The last drawn frame's real time (ms), for the budget. */
    lastReal: 0,
    /** The last scale given the ley line (the party's over fades it). */
    leyScaled: -1,
    /** The party the ley line follows (without quests done when it moves on only by waves), its chain, and each stone's colour.
     *  (Read by the beacons too, render/view/home.ts, so a stone's column comes up as the line it's drawn on reaches it.) */
    leyParty: null as Game["party"] | null,
    /** The party's over (render/partyOver.ts): its look this frame. */
    over: newPartyOverLook(),
    /** Each hat of hers lying: the look (her genome) it went down in (render/view/hatLooks.ts). */
    hatLooks: new Map<string, unknown>(),
    /** The soundsystem alarm (render/alarm.ts): a 🔇 at the edge toward each soundsystem under attack off screen. */
    alarms: newAlarms(),
    /** The knockdowns' BPM bonus the wave pointer last pulsed for (render/view/hud.ts). */
    pointerBonus: 0,
    sources: [] as LightSource[],
    /** Lights in the forest besides the witch's glow, from the light sources (set by the view). */
    forestLights: [] as ForestLight[],
    /** Where she was a beat ago, for the trees watching her (render/view/frameUniforms.ts). */
    watch: { x: NaN, z: NaN, t: 0 },
    ghosts: [] as { x: number; z: number; h: number; until: number }[],
    now: 0,
    /** The area she's in for the moods, when it's next looked up, and when they were last eased. */
    moodArea: "",
    moodAt: -Infinity,
    moodTime: NaN,
    /** Types made again unseen (retype): their batches come back without the fade-in. */
    noFade: new Set<unknown>(),
    /** Sets fading in since they were drawn, and when they arrived (real ms). */
    appearing: new Map<SpriteBatch, number>(),
    /** The start's art made (prepare): sets drawn after it fade in. */
    prepared: false,
    /** The party's next areas whose art has been asked for ahead (prefetchWave). */
    prefetched: "",
    /** How far the camera moved since the last frame (m): the horizon cull judges things that much nearer (view/culling.ts inView). */
    camStep: 0,
    lastCamPos: new THREE.Vector3(NaN, NaN, NaN),
    /** What was drawn last time, for the fresh tint and the pop check: one record for what the
     *  rebuild places (trees, undergrowth, walls, set pieces), one for what moves every frame
     *  (creatures, light props). */
    kindIds: new Map<string, number>(),
    kindNames: [] as string[],
    /** What was drawn this frame and last, by key: each key's index into its list of x, z, height, kind. */
    tracks: {
      placed: { now: new Map<number, number>(), before: new Map<number, number>(), nowAt: [] as number[], beforeAt: [] as number[] },
      moving: { now: new Map<number, number>(), before: new Map<number, number>(), nowAt: [] as number[], beforeAt: [] as number[] },
    },
    pops: [] as string[],
    /** On foot: 0 flying, 1 landed (eased), and the sigil pose she's playing, if any. */
    foot: 0,
    footTime: 0,
    footAct: null as { pose: string; at: number } | null,
    /** Where the last rebuild looked: the middle and half-size of its square (for the prefetch). */
    lastView: null as { x: number; z: number; half: number } | null,
    lastPose: { distance: 0, angle: 0, zoomStep: -1, lift: -1, tele: 0 },
    /** When each berry last grew again (game time), so it grows in rather than appearing. */
    regrewAt: new Map<number, number>(),
    /** Berries just eaten: where, and when (game time), for the nibble's sparkle. */
    nibbles: [] as { x: number; z: number; at: number }[],
    /** When each party animal evolved (game time): the flash, the pop and the sparkles. */
    evolvedAt: new Map<number, number>(),
    /** Each area legend's lying down and getting up, as the view has seen its state change (render/legendSleep.ts). */
    legendSleeps: new Map<number, SleepTrack>(),
    /** Each watching creature's aggro red as last drawn and when (view/creatures.ts), so it eases out when the watch ends. */
    aggroLast: new Map<number, { a: number; at: number }>(),
    /** Each creature's distance walked as drawn, for its baked walk's frames (view/creatures.ts strideFrame). */
    strides: new Map<number, { x: number; z: number; d: number; at: number }>(),
    /** A party animal's gear for its rig page (as its party bake wears it), kept per creature and look. */
    rigGears: new Map<string, RigGear>(),
    /** Sparks from campfires lighting up as the party arrives (drawn with the markers' motes, next frame). */
    fireSparks: [] as Mote[],
    /** 💌s that left a slowed circle outward (Ed, 2026-10-06): where and when each vanished in a sparkle at its edge
     *  (edgeSparkle; drawn as motes with the markers' in view/home.ts). */
    edgeSparkles: [] as { x: number; z: number; at: number }[],
    /** The world's campfires showing this frame, for the party objects to draw. */
    worldFires: [] as { x: number; z: number; scale: number; flip: boolean }[],
    /** Where her fallen hat was on screen as the knockout's iris closed on it (render/koIris.ts), for the record to stay put across the cut. */
    irisHat: null as [number, number] | null,
    /** Each light source's area (a campfire's party), worked out once. */
    sourceCell: new WeakMap<object, string>(),
    speakerFlare: [] as (number | undefined)[],
    /** Her lean cycle's phase (frames) and the time it was last stepped. */
    leanPhase: 0,
    leanTime: 0,
    /** Showing a change off at a dressing station (main.ts, ui/stationPanel.ts; Ed, 2026-10-21: "a beat on each change"): till this
     *  time of hers, standing still, she turns to face us. */
    turnUntil: 0,
    /** Her twirl at a dressing station while her new look draws (render/spin.ts; main.ts starts it): her frames kept on the look she
     *  had till it's over (swapHomeArt). */
    spin: null as Spin | null,
    /** On foot in the house, her walk's phase (frames: render/view/witch.ts). */
    walkPhase: 0,
    /** Each ring speaker's top, state and power, for its laser (Ed: one each, none from the disco ball). */
    speakerTops: [] as RingSpeaker[],
    /** Each dormant area's wave (wavePlan), worked out again when the party changes. */
    plan: { key: "", waves: new Map<string, number>() },
    /** When the ley line's tip reaches each stone (rules/leypulse.ts leyReachTimes), worked out again when the line changes. */
    leyReach: { key: "", times: null } as { key: string; times: Map<string, number> | null },
    /** Whether the hills' next strip was all worked out last frame. */
    heightsReady: true,
    /** Each clearing's ring brightening: eased up while she stands in it, and its last cue (a flash when
     *  something meant for its legend was put down outside it). */
    ringGlow: new Map<LegendClearing, { k: number; flash: number }>(),
    lastRingTime: 0,
    /** Each clearing's legend (its creature id, -1 none), found once. */
    ringLegend: new Map<LegendClearing, number>(),
    ringCount: 0,
    /** The clearings' look's last time (her clock). */
    gladeTime: 0,
  };
}
type NightState = ReturnType<typeof nightState>;
// (the night's fields are the View's own, made by nightState: in the constructor, and again by setGame)
export interface View extends NightState {}

/** The area types on a map (its cells' types, by their look's index): the ones whose tufts take its biome (GrassView.tufts). */
const islandTypes = (map: ForestMap): Set<number> => { const s = new Set<number>([HOME_LOOK]); for (const c of map.cells) s.add(map.typeOf(c[0], c[1])); return s; }; // (and home's meadow)

/** A sail's dive's ground drawn before it (prepare's `track`): this many metres each side of its track, and this far along it in
 *  from the sea (where the island first comes into view). */
const TRACK_REACH = 140, TRACK_AHEAD = 320;

/** Seconds the tilt-shift takes to ease out as she comes onto the house, and back in as she leaves (View.houseTilt). */
const HOUSE_TILT_EASE = 0.6;

import { render as a4_render } from "./view/frame";
import { houseTilt as a4_houseTilt, behindHouse as a4_behindHouse, occluders as a4_occluders, ensureCrown as a4_ensureCrown, buildHome as a4_buildHome, swapHomeArt as a4_swapHomeArt } from "./view/houseFrame";
import { legendRings as a4_legendRings, pin as a4_pin, inviteStart as a4_inviteStart } from "./view/markers";
import { updateMoon as a4_updateMoon, updateSteam as a4_updateSteam, updateSmoke as a4_updateSmoke } from "./view/atmosphere";
import { readyPrograms as a4_readyPrograms, landingWakeReady as a4_landingWakeReady, beginLandingShaders as a4_beginLandingShaders, armLimitedLanding as a4_armLimitedLanding, limitedLandingReady as a4_limitedLandingReady, waitForLandingWitch as a4_waitForLandingWitch, startLandingShaderGrace as a4_startLandingShaderGrace, compileAll as a4_compileAll, gpuCaughtUp as a4_gpuCaughtUp, warmDraws as a4_warmDraws, warmSteps as a4_warmSteps, setReadiness as a4_setReadiness } from "./view/readiness";
import { build as a4_build, prepare as a4_prepare, treeExtent as a4_treeExtent, askIsland as a4_askIsland, setGameSteps as a4_setGameSteps, retype as a4_retype } from "./view/lifecycle";
import { scenePixelSize as a4_scenePixelSize, resize as a4_resize, screenOf as a4_screenOf, aimAt as a4_aimAt } from "./view/viewport";

export class View {
  /** A4 module bridge; also supports headless prototype stand-ins without constructor execution. */
  private get a4Internals(): ViewInternals {
    let bridge = a4PrivateBridges.get(this);
    if (!bridge) {
      const owner = this;
      bridge = {
      get aimRay(): View["aimRay"] { return owner.aimRay; },
      set aimRay(value: View["aimRay"]) { owner.aimRay = value; },
      get armLimitedLanding(): View["armLimitedLanding"] { return owner.armLimitedLanding.bind(owner); },
      get askIsland(): View["askIsland"] { return owner.askIsland.bind(owner); },
      get behindHouse(): View["behindHouse"] { return owner.behindHouse.bind(owner); },
      get borders(): View["borders"] { return owner.borders; },
      set borders(value: View["borders"]) { owner.borders = value; },
      get buildHome(): View["buildHome"] { return owner.buildHome.bind(owner); },
      get castMap(): View["castMap"] { return owner.castMap; },
      set castMap(value: View["castMap"]) { owner.castMap = value; },
      get castOn(): View["castOn"] { return owner.castOn; },
      set castOn(value: View["castOn"]) { owner.castOn = value; },
      get cauldronLook(): View["cauldronLook"] { return owner.cauldronLook; },
      set cauldronLook(value: View["cauldronLook"]) { owner.cauldronLook = value; },
      get compileAll(): View["compileAll"] { return owner.compileAll.bind(owner); },
      get crownAt(): View["crownAt"] { return owner.crownAt; },
      set crownAt(value: View["crownAt"]) { owner.crownAt = value; },
      get crownDrawn(): View["crownDrawn"] { return owner.crownDrawn; },
      set crownDrawn(value: View["crownDrawn"]) { owner.crownDrawn = value; },
      get crownFar(): View["crownFar"] { return owner.crownFar; },
      set crownFar(value: View["crownFar"]) { owner.crownFar = value; },
      get crownWorld(): View["crownWorld"] { return owner.crownWorld; },
      get dancefloor(): View["dancefloor"] { return owner.dancefloor; },
      get dark(): View["dark"] { return owner.dark; },
      set dark(value: View["dark"]) { owner.dark = value; },
      get easeAppearing(): View["easeAppearing"] { return owner.easeAppearing.bind(owner); },
      get ensureCrown(): View["ensureCrown"] { return owner.ensureCrown.bind(owner); },
      get floorItems(): View["floorItems"] { return owner.floorItems; },
      set floorItems(value: View["floorItems"]) { owner.floorItems = value; },
      get glades(): View["glades"] { return owner.glades; },
      set glades(value: View["glades"]) { owner.glades = value; },
      get gpuCaughtUp(): View["gpuCaughtUp"] { return owner.gpuCaughtUp.bind(owner); },
      get hazeBeforeTelescope(): View["hazeBeforeTelescope"] { return owner.hazeBeforeTelescope; },
      set hazeBeforeTelescope(value: View["hazeBeforeTelescope"]) { owner.hazeBeforeTelescope = value; },
      get hideForBare(): View["hideForBare"] { return owner.hideForBare.bind(owner); },
      get hiz(): View["hiz"] { return owner.hiz; },
      set hiz(value: View["hiz"]) { owner.hiz = value; },
      get hizOff(): View["hizOff"] { return owner.hizOff; },
      get holograms(): View["holograms"] { return owner.holograms; },
      set holograms(value: View["holograms"]) { owner.holograms = value; },
      get lakeShore(): View["lakeShore"] { return owner.lakeShore; },
      set lakeShore(value: View["lakeShore"]) { owner.lakeShore = value; },
      get lakeSigils(): View["lakeSigils"] { return owner.lakeSigils; },
      set lakeSigils(value: View["lakeSigils"]) { owner.lakeSigils = value; },
      get landingFades(): View["landingFades"] { return owner.landingFades; },
      set landingFades(value: View["landingFades"]) { owner.landingFades = value; },
      get lap(): View["lap"] { return owner.lap; },
      set lap(value: View["lap"]) { owner.lap = value; },
      get lasers(): View["lasers"] { return owner.lasers; },
      set lasers(value: View["lasers"]) { owner.lasers = value; },
      get legendRings(): View["legendRings"] { return owner.legendRings.bind(owner); },
      get leyBase(): View["leyBase"] { return owner.leyBase; },
      set leyBase(value: View["leyBase"]) { owner.leyBase = value; },
      get leyChainNow(): View["leyChainNow"] { return owner.leyChainNow; },
      get leyColour(): View["leyColour"] { return owner.leyColour; },
      get leyRgb(): View["leyRgb"] { return owner.leyRgb; },
      set leyRgb(value: View["leyRgb"]) { owner.leyRgb = value; },
      get magicBlink(): View["magicBlink"] { return owner.magicBlink; },
      set magicBlink(value: View["magicBlink"]) { owner.magicBlink = value; },
      get makeLoadingMist(): View["makeLoadingMist"] { return owner.makeLoadingMist.bind(owner); },
      get mistClock(): View["mistClock"] { return owner.mistClock; },
      set mistClock(value: View["mistClock"]) { owner.mistClock = value; },
      get mistLast(): View["mistLast"] { return owner.mistLast; },
      set mistLast(value: View["mistLast"]) { owner.mistLast = value; },
      get monitoredPrograms(): View["monitoredPrograms"] { return owner.monitoredPrograms; },
      get moonBase(): View["moonBase"] { return owner.moonBase; },
      set moonBase(value: View["moonBase"]) { owner.moonBase = value; },
      get moonUpBase(): View["moonUpBase"] { return owner.moonUpBase; },
      set moonUpBase(value: View["moonUpBase"]) { owner.moonUpBase = value; },
      get mushroomView(): View["mushroomView"] { return owner.mushroomView; },
      get nearRings(): View["nearRings"] { return owner.nearRings; },
      set nearRings(value: View["nearRings"]) { owner.nearRings = value; },
      get occluders(): View["occluders"] { return owner.occluders.bind(owner); },
      get overDebug(): View["overDebug"] { return owner.overDebug; },
      set overDebug(value: View["overDebug"]) { owner.overDebug = value; },
      get partyView(): View["partyView"] { return owner.partyView; },
      set partyView(value: View["partyView"]) { owner.partyView = value; },
      get pixelViewport(): View["pixelViewport"] { return owner.pixelViewport; },
      set pixelViewport(value: View["pixelViewport"]) { owner.pixelViewport = value; },
      get potionObservers(): View["potionObservers"] { return owner.potionObservers; },
      get prefetchWave(): View["prefetchWave"] { return owner.prefetchWave.bind(owner); },
      get readyPrograms(): View["readyPrograms"] { return owner.readyPrograms.bind(owner); },
      get ringItems(): View["ringItems"] { return owner.ringItems; },
      set ringItems(value: View["ringItems"]) { owner.ringItems = value; },
      get scenePixelSize(): View["scenePixelSize"] { return owner.scenePixelSize.bind(owner); },
      get setReadiness(): View["setReadiness"] { return owner.setReadiness.bind(owner); },
      get shaderChartLanding(): View["shaderChartLanding"] { return owner.shaderChartLanding; },
      set shaderChartLanding(value: View["shaderChartLanding"]) { owner.shaderChartLanding = value; },
      get shaderEpoch(): View["shaderEpoch"] { return owner.shaderEpoch; },
      set shaderEpoch(value: View["shaderEpoch"]) { owner.shaderEpoch = value; },
      get shaderLandingDeadline(): View["shaderLandingDeadline"] { return owner.shaderLandingDeadline; },
      set shaderLandingDeadline(value: View["shaderLandingDeadline"]) { owner.shaderLandingDeadline = value; },
      get shadowLights(): View["shadowLights"] { return owner.shadowLights; },
      set shadowLights(value: View["shadowLights"]) { owner.shadowLights = value; },
      get smoke(): View["smoke"] { return owner.smoke; },
      set smoke(value: View["smoke"]) { owner.smoke = value; },
      get soundBatch(): View["soundBatch"] { return owner.soundBatch; },
      set soundBatch(value: View["soundBatch"]) { owner.soundBatch = value; },
      get steam(): View["steam"] { return owner.steam; },
      set steam(value: View["steam"]) { owner.steam = value; },
      get steamFor(): View["steamFor"] { return owner.steamFor; },
      set steamFor(value: View["steamFor"]) { owner.steamFor = value; },
      get strings(): View["strings"] { return owner.strings; },
      set strings(value: View["strings"]) { owner.strings = value; },
      get swapHomeArt(): View["swapHomeArt"] { return owner.swapHomeArt.bind(owner); },
      get tiltAt(): View["tiltAt"] { return owner.tiltAt; },
      set tiltAt(value: View["tiltAt"]) { owner.tiltAt = value; },
      get trail(): View["trail"] { return owner.trail; },
      set trail(value: View["trail"]) { owner.trail = value; },
      get trailRgb(): View["trailRgb"] { return owner.trailRgb; },
      set trailRgb(value: View["trailRgb"]) { owner.trailRgb = value; },
      get tuftBiome(): View["tuftBiome"] { return owner.tuftBiome; },
      set tuftBiome(value: View["tuftBiome"]) { owner.tuftBiome = value; },
      get updateSmoke(): View["updateSmoke"] { return owner.updateSmoke.bind(owner); },
      get updateSteam(): View["updateSteam"] { return owner.updateSteam.bind(owner); },
      get warmDraws(): View["warmDraws"] { return owner.warmDraws.bind(owner); },
      get warmSteps(): View["warmSteps"] { return owner.warmSteps.bind(owner); },
      get wisps(): View["wisps"] { return owner.wisps; },
      set wisps(value: View["wisps"]) { owner.wisps = value; },
      };
      a4PrivateBridges.set(this, bridge);
    }
    return bridge;
  }

  /** Diagnostic boundary for the renderer's opening camera anchor; no change when no recorder is attached. */
  setIntroFocus: (game: Game, focus: Game["introFocus"]) => void = (game, focus) => { game.introFocus = focus; };
  readonly renderer: THREE.WebGLRenderer;
  scene = new THREE.Scene();
  readonly magic = fxFor(this.scene);
  private magicBlink = -Infinity;
  /** Stage 0 art review only; absent in ordinary play. */
  fxMock: FxMock | null = null;
  camera: THREE.PerspectiveCamera;
  /** The far haze as it was, while the circle-bug suspects have it off (tuning suspects.haze; render/view/frameUniforms.ts). */
  hazeKept: THREE.Vector2 | null = null;
  /** The island's own layers (render/island.ts): the ground, the hills, the paths, the ley lines, the runestones, the
   *  dancefloor, the treehouse, the minimap and the map table; the View's names for them below are its. */
  island!: IslandLayers;
  get ground(): Ground { return this.island.ground; }
  readonly shaderDrawStatus: ShaderDrawStatus = { active: false, skipped: {}, fallback: {} };
  private readonly monitoredPrograms = new WeakSet<ReadyProgram>();
  private readyPrograms(): ReadyProgram[] { return a4_readyPrograms(this, this.a4Internals, a4Shared); }
  private shaderEpoch = 0;
  private shaderLandingDeadline = Infinity;
  private shaderChartLanding = false;
  shaderLandingLimited = false;
  private landingFades = new LandingArtFade();
  landingHouseShare = 1;
  landingSleeping = false;
  landingWakeReady(): boolean { return a4_landingWakeReady(this, this.a4Internals, a4Shared); }
  beginLandingShaders(chart: boolean): void { return a4_beginLandingShaders(this, this.a4Internals, a4Shared, chart); }
  private armLimitedLanding(): void { return a4_armLimitedLanding(this, this.a4Internals, a4Shared); }
  limitedLandingReady(now = performance.now()): boolean { return a4_limitedLandingReady(this, this.a4Internals, a4Shared, now); }
  waitForLandingWitch(): Promise<void> { return a4_waitForLandingWitch(this, this.a4Internals, a4Shared); }
  startLandingShaderGrace(at = performance.now()): void { return a4_startLandingShaderGrace(this, this.a4Internals, a4Shared, at); }
  /** The rolling ground (height.ts): drawn only, the rules stay flat. */
  get heights(): HeightField { return this.island.heights; }
  /** The night sky that shows over the bend, in treetop mode. */
  sky!: Sky;
  /** The moonlight as the style and mood set it, before the moon's colour tints it (rules/moon.ts). */
  private moonBase = new THREE.Vector3();
  private moonUpBase = new THREE.Vector3();
  /** Seconds added to game time for the moon only (previews: a time-lapse of its phases, way and colours). */
  moonShift = 0;
  /** Real clouds over the bend, with lightning. */
  clouds!: Clouds;
  /** Smoke rising from the fires (Ed, round 13). */
  private smoke!: Smoke;
  /** The dark behind the house till the forest has loaded (Ed, 2026-10-26: "When the forest has loaded, fade it in gradually behind
   *  the whole treehouse"; it was dark behind the enclosed rooms always, Ed 2026-10-23; the tuning's treehouse.house.dark;
   *  render/post.ts Post.behind): on foot in the house, any room or the Terrace, while the island isn't ready yet (g.islandReady:
   *  its own art drawn, main.ts), only the house's own meshes are drawn (its rooms, the Ent's art with its crowns, her), over black;
   *  the scenery is still listed and its art still asked for, only not drawn. As it's ready the forest fades in behind the whole
   *  house, the whole picture at once, over dark.reveal seconds, and stays behind every room after. Leaving the house before
   *  then (lifting off), it comes back from where she stands over dark.fade seconds; through the telescope, the whole picture over
   *  the same. Eased on her clock (g.herTime: full speed in the house's slowed time, and the same on any machine). */
  /** No tilt-shift in the treehouse (Ed, 2026-10-26: "No tilt shift while you're in the treehouse"): on the house (its rooms,
   *  branches and Terrace, the stations' close-ups; her perch) the blur eases out over HOUSE_TILT_EASE seconds of her clock, and back
   *  in as she leaves; through the telescope it stays as it was (its own view of the island). Once a frame (render/view/witch.ts), its
   *  share for the post pass (Post.tilt) and the overlays (render/overlayTilt.ts). */
  tiltK = 1;
  private tiltAt = NaN;
  houseTilt(g: Game): number { return a4_houseTilt(this, this.a4Internals, a4Shared, g); }
  private dark = { k: 1, at: NaN, door: null as { x: number; z: number } | null, enclosed: false, reveal: false, uv: new THREE.Vector2() };
  private behindHouse(g: Game): void { return a4_behindHouse(this, this.a4Internals, a4Shared, g); }

  /** What the treehouse hides of the forest, left undrawn (render/hiz.ts; the perf pass, 2026-10-23): the Ent's solid pass on its
   *  occluder layer, the chain built while the camera is within HIZ_NEAR metres of the treehouse (the decks, the balcony, the house,
   *  flying round it), off elsewhere. `?hiz=0` never builds it (to compare). */
  private hiz: Hiz | null = null;
  private readonly hizOff = new URLSearchParams(globalThis.location?.search ?? "").get("hiz") === "0";
  private occluders(): void { return a4_occluders(this, this.a4Internals, a4Shared); }

  /** The hot springs' steam (render/lakeLooks.ts steamVents): smoke's puffs, whiter, lower and slower; its vents the map's. */
  private steam!: Smoke;
  /** The biome lakes' shore dressing and the lava's light (render/lakeShore.ts). */
  private lakeShore!: LakeShoreView;
  private steamFor: { map: ForestMap; vents: Float32Array } | null = null;
  readonly assets: AssetLibrary;
  typeBatches = new Map<number, SpriteBatch>();
  private readonly mushroomView = new MushroomView();
  private readonly potionObservers = new PotionObserversView();
  decorBatches = new Map<string, SpriteBatch>();
  /** The biome the ground cover's tufts were drawn in (none: temperate): drawn again for a night on an island in another. */
  private tuftBiome: string | undefined;
  creatureBatches = new Map<string, SpriteBatch>();
  witchBatch!: SpriteBatch;
  /** Her with her hat knocked off, and the hat where it lies (rules/hat.ts): made once the game is up. */
  bareBatch: SpriteBatch | null = null;
  bareAsked = false;
  /** Drawn without her hat while a station for her head and face is open (main.ts, ui/stationPanel.ts bareHead). */
  hatOff = false;
  get treehouseBatch(): SpriteBatch { return this.island.treehouseBatch; }
  /** Where the Ent's deck middle is drawn this frame (render/view/home.ts entDeckDrawn; tools/house/terrace-lock.cjs). */
  entDeckDrawn(): { x: number; y: number; z: number } | null { return entDeckDrawn(this); }
  /** The treehouse's placeholder rooms (render/houseRooms.ts), with the house's rooms on. */
  houseRooms: HouseRoomsView | null = null;
  private cauldronLook: CauldronView | null = null;
  /** The zoo's little treehouse's "exit" prompt (render/zooExit.ts), made in the zoo. */
  zooExitTag: ZooExitTag | null = null;
  /** The spell's key prompt by its 🎶 (render/castTag.ts), made the first frame. */
  castTag: CastTag | null = null;
  /** The great oak's crown over the house (render/crown.ts), with the house's rooms and treehouse.house.crown on. */
  crown: CrownView | null = null;
  /** The crown seen over the horizon from far off (render/crownLandmark.ts). */
  private crownFar: CrownLandmark | null = null;
  private crownAt = Number.NaN;
  private crownDrawn = true;
  private readonly crownWorld: PlanMap = { o: new THREE.Vector3(), ex: new THREE.Vector3(), ey: new THREE.Vector3(0, 1, 0), ez: new THREE.Vector3() };
  /** The crown for a house with rooms (made once: the same oak over any island's treehouse), or none. */
  private ensureCrown(game: Game): void { return a4_ensureCrown(this, this.a4Internals, a4Shared, game); }
  /** The broom parts she's found (this browser's, app/broomSave.ts: main.ts keeps it): the Workshop's pegboard hangs them in colour
   *  (render/workshopArt.ts). */
  partsFound: ReadonlySet<string> = new Set();
  /** The treehouse deck's map table's miniature chart (render/mapTable.ts), with the deck on. */
  get mapTable(): MapTable | null { return this.island.mapTable; }
  set mapTable(m: MapTable | null) { this.island.mapTable = m; } // (the bench lets it go: tools/bench/frames.cjs)
  get markerArt(): MarkerArt { return this.island.markerArt; }
  get markerBatch(): SpriteBatch { return this.island.markerBatch; }
  markerFx = new MarkerFx();
  speakerBatch: SpriteBatch | null = null;
  grass!: GrassView;
  spellFx = new SpellFx();
  /** Opt-in world-pose echo preview, also exposed to the existing capture/debug tools. */
  get dodgeEchoes() { return dodgeEchoesFor(this); }
  /** Her flight trail: a ribbon of glow in the colour of the area she's over (render/trail.ts). */
  private trail!: WitchTrail;
  private trailRgb = new THREE.Vector3();
  shadow!: THREE.Mesh;
  mpp: number; // metres per art pixel
  /** ?scenery=<metres>: a fixed scenery radius instead of the adaptive one. */
  sceneryFixed: number | null = null;
  readonly post: Post;
  /** The cast shadows from above, for what stands in them (render/castShadows.ts). */
  private castMap: CastShadowMap;
  private castOn = false;
  private get dancefloor(): Dancefloor { return this.island.dancefloor; }
  propBatch!: SpriteBatch;
  private partyView!: PartyView;
  private strings!: StringLightsView;
  leashView!: LeashView;
  private lasers!: Lasers;
  /** The soundsystems' sky sigils (render/hologram.ts), in place of their laser shows (Ed, 2026-10-08). */
  private holograms!: SigilHolograms;
  /** The wave's celebrations: fireworks over a soundsystem already cleared (render/fireworks.ts). */
  fireworks!: Fireworks;
  /** The ley lines through the runestones in wave order (Ed, 2026-10-04). */
  get ley(): LeyLines { return this.island.ley; }
  /** The sleeping legends' clearings: their twilight and rising motes. */
  private glades!: Glades;
  /** Will-o'-the-wisps drifting through the wild areas (render/wisps.ts). */
  private wisps: Wisps | null = null;
  /** The ley line's colour by the mood (leyRgb), or null for each area's own. */
  private leyRgb!: THREE.Vector3 | null;
  /** The ley line's brightness (the decisions panel's), and the last scale given it (the party's over fades it). */
  private leyBase = 1;
  private overDebug: number | null = (() => { const v = new URLSearchParams(globalThis.location?.search ?? "").get("partyover"); return v === null ? null : Number(v) || 0; })();
  private readonly leyHome = new THREE.Vector3(0.8, 0.7, 1);
  private readonly leyChainNow = () => leyChain(this.leyParty ?? this.game.party, this.game.map);
  private readonly leyColour = (s: { cell: readonly [number, number] }) => {
    if (this.leyRgb) return this.leyRgb; // the mood's: a guide in the HUD's amber, not a light source (the art director's round 2)
    return this.markerArt.colour.get(AREA_TYPES[this.game.map.typeOf(s.cell[0], s.cell[1])].creature) ?? this.leyHome;
  };
  /** The party witches on the dancefloor, and our witch when she idles into the party. */
  partyWitchView!: PartyWitchView;
  /** The beach round the circular map: nothing made until she's near it. */
  beachView!: BeachView;
  /** The party witches' rainbow swoop trails (render/swoopTrails.ts). */
  swoopTrails!: SwoopTrails;
  /** The 💌s, their bubbles and rings (render/invites.ts). */
  inviteView!: InviteView;
  /** What hides the 💌s and invite rings (render/occlusion.ts). */
  occlusion!: OcclusionProbes;
  /** Angry brows and daze stars over the creatures (render/looks.ts). */
  stateMarks!: StateMarks;
  /** The smoke test sets this to draw trunks flat magenta for a frame, to count them on screen. */
  debugTrunks = false;
  /** The party objects strewn over partified areas (#38). */
  partyObjects!: PartyObjectsView;
  private borders!: BorderView;
  nextStones: StoneIndicator[] = [];
  /** The pointers to her hats lying in the world (rules/hat.ts: knocked off, put down, or left when she took a new one): 🎩 in a
   *  whole ring, one a hat, each 🎩 in that hat's colour from the character creator (render/view/hatLooks.ts). */
  hatPointers: StoneIndicator[] = [];
  /** The Dowsing hat's pointer toward the nearest relic (rules/hatSpells.ts). */
  dowsePointer: StoneIndicator | null = null;
  /** The end of the route's two pointers (render/view/pointers.ts): the straggler's and the victory lap's (the party's). */
  stragglerPointer: StoneIndicator | null = null;
  partyPointer: StoneIndicator | null = null;
  /** The awake legends' pointers. */
  legendPointers: StoneIndicator[] = [];
  /** Pins anyone has put up (render/pins.ts: view.pin(target, look)), drawn with the pointers. */
  readonly pins = new Set<Pin>();
  pinsAt = Number.NaN;
  /** A map pin toward `target` (a world point with a height, or a house object), looking `look`; shown at once, `hide()` and
   *  `show()` to fade it, `remove()` for good. */
  pin(target: PinTarget, look: PinLook): Pin & { remove(): void } { return a4_pin(this, this.a4Internals, a4Shared, target, look); }
  alarmCues: AlarmIndicators | null = null;
  get minimap(): Minimap { return this.island.minimap; }
  /** Metre rulers and a ground grid (G). */
  readonly rulers = new Rulers(document.body);
  /** Show debug readouts (the debug overlay is on). */
  debugReadouts = false;
  private soundBatch!: SpriteBatch;
  /** The lights the trunks' shadows are thrown from this frame (render/trunkShadows.ts uFires), the list kept. */
  private shadowLights: { x: number; y: number; z: number; reach: number; rgb: THREE.Vector3; k: number }[] = [];
  /** Her light dimmer in the wild, back up in a fight (render/combatLight.ts). */
  readonly combatLight = new CombatLight();
  shadows!: ShadowBatch;
  /** The live rig (#79 stage 5, ?rig=1): creatures put together from parts each frame. */
  rig!: RigView | null;
  /** The camera's snap this frame, in the picture's pixels (x right, y down): what main.ts shifts the canvas by. */
  readonly subpixel = { x: 0, y: 0 };
  /** Her sprite's base this frame (world, before the bend), for the frame-feel trace. */
  readonly witchBase = { x: 0, y: 0, z: 0 };
  /** Her hat's top on screen as last drawn (shares of the view, y up; on: drawn), for her dream's cloud (render/dream.ts). */
  readonly herHead = { x: 0.5, y: 0.5, on: false };
  /** The house object whose panel or close-up is open now (main.ts: a station, an instrument), or null: its use prompt is down and
   *  its light out while it's open (render/houseRooms.ts). */
  houseOpen: string | null = null;
  /** What she plays with, for the use prompts' button (platform/input.ts device): the use button as bound (E, the pad's ✕) or a tap on the prompt itself. */
  useDevice: "keys" | "pad" | "touch" = "keys";
  /** A tap on a use prompt (touch): down and up, as the touch sigil button's (main.ts sets it). */
  onUse: ((down: boolean) => void) | null = null;
  /** In the house's rooms, her head on the page (CSS px) as the house places it (render/houseRooms.ts) and when (ms). */
  readonly herHouseHead = { x: 0, y: 0, at: -Infinity };
  /** The use prompt's keycap over a house object as last drawn (render/houseRooms.ts): its object's id ("" with none shown, or
   *  the house not drawn) and its top on the page: a guidance pin over the same object keeps its tip above it (render/view/guidance.ts). */
  readonly usePrompt = { id: "", top: 0 };
  /** Off the treehouse's hub, how far the camera's aim moves to follow where she's drawn (render/view/witch.ts). */
  readonly houseCam = { x: 0, y: 0, z: 0 };
  /** Where she's drawn less where the rules have her, in the treehouse (render/view/witch.ts), her feet's world height as drawn: her
   *  letters drawn by it (render/invites.ts letterAt), so they leave her hand as drawn. */
  readonly herOffset: HerOffset = { on: false, x: 0, y: 0, z: 0 };
  /** Where a 💌 thrown now starts as drawn (the world's height), for the tools (tools/house/positions.cjs). */
  inviteStart(g: Game): { x: number; y: number; z: number; world: boolean } { return a4_inviteStart(this, this.a4Internals, a4Shared, g); }
  /** How far up the Ent's plane (its art's pixels, negative up) the oak's rooms are drawn this frame, so the room she's in sits at the
   *  Terrace's height (render/view/witch.ts sets it, render/houseRooms.ts draws by it). */
  houseShift = 0;
  /** Her height as drawn (metres: her frame's, times her scale on the treehouse's floor): what a station's aim is a share of. */
  witchTall = 0;
  /** Her height as drawn from her feet (her frame's ground) to its top (her hat's), last frame: a station frames her whole by it (render/view/camera.ts). */
  witchFeetTop = 0;
  /** The dark wash behind her at a station, her drawn again over it (render/stationBackdrop.ts). */
  backdrop!: StationBackdrop;
  shadowList: ShadowInstance[] = [];
  /** The trunks' shadows from her glow and the fires, a batch an area type (render/trunkShadows.ts); and the scenery's, a batch
   *  an atlas (decor, relics, scenes: render/view/scenery.ts; the runestones, the soundsystems: render/view/home.ts, render/party.ts). */
  trunkShadowBatches = new Map<number | string, TrunkShadowBatch>();
  /** The witches' shadows drawn by the party's and the beach's views, and her dropped hat's (set each frame, before the creatures). */
  witchShadows: ShadowInstance[] = [];
  mist: Mist | null = null;
  /** Faint rings of moonlight on the crowns, seen from the treetops (render/lightRings.ts). */
  lightRings: LightRings | null = null;
  /** The loading mist over the areas whose trees aren't drawn yet (render/loadingMist.ts), made each night by prepare; null once off. */
  loadingMist: LoadingMist | null = null;
  /** ?loadmist=1|0 (app/viewParams.ts): the loading mist on or off whatever the tuning and ?quick=1 say; null as they say. */
  loadingMistLink: boolean | null = null;
  private mistClock = 0;
  private mistLast = 0;
  width = 1;
  height = 1;
  /** ?debug=cull: tint anything that has just appeared bright red, and mark where anything has
   *  just vanished with a red frame for a second. */
  debugCull = false;
  /** ?quick=1, for the quick smoke test in CI: no drawing the rest of the map's art ahead of need. */
  quick = false;
  ghostLines: THREE.LineSegments | null = null;
  /** The area moods (render/mood.ts), if the mood is spooky; the area she's in, when it's next looked up, and when they were last eased. */
  areaMoods: AreaMoods | null = null;
  stats: ViewStats = { berries: 0, forestMs: 0, forestMissing: 0, sceneryRadius: 0, fps: 0, gameplay: 0, scenery: 0, dropped: 0, trees: 0, bushes: 0, creatures: 0, batches: 0, drawCalls: 0, pendingArt: 0, pendingGround: 0, lights: 0 };

  /** `sliced` (View.create): the island's build left to its caller, a frame's budget at a time; else it's built here, as ever. */
  constructor(readonly canvas: HTMLCanvasElement, public game: Game, readonly style: Style, witchGenome: unknown = null, sliced = false) {
    const t = game.tuning;
    Object.assign(this, nightState(t));
    this.castMap = new CastShadowMap(160, t.shadows.castRes ?? 1024);
    const prec = typeof location !== "undefined" ? new URLSearchParams(location.search).get("precision") : null; // (?precision=high|medium|low: every shader's float precision, for the circle bug; three.js takes high where the GPU has it)
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance", preserveDrawingBuffer: true, ...(prec === "high" || prec === "medium" || prec === "low" ? { precision: prec === "high" ? "highp" : prec === "medium" ? "mediump" : "lowp" } as const : {}) });
    // Three's first-use diagnostics read driver logs synchronously (498ms in proof64c95a287).
    // Keep diagnostics in development; production keeps KHR gating without the blocking log queries.
    this.renderer.debug.checkShaderErrors = import.meta.env.DEV;
    // A lost and restored GL context (a GPU reset, a tab long in the background on a phone): three.js would upload every texture
    // again from its pixels, which the atlases let go once uploaded (render/atlas.ts), so the art would come back black. The
    // page reloads instead (DECISION FOR ED: a run is lost either way; nothing handled it before, and the ground's own GPU-side
    // tiles wouldn't have come back either).
    // (main.ts reloads the night itself, from its repro link: the island, the wave and her place, and keeps it in the playtest log)
    canvas.addEventListener("webglcontextrestored", () => { console.warn("view: the GL context was lost and restored: reloading"); (this.onContextRestored ?? (() => location.reload()))(); });
    this.ledger = new GpuLedger(this.renderer.getContext(), () => canvas.width * canvas.height * 12); // (the canvas's back and front buffers and its depth: preserveDrawingBuffer)
    canvas.addEventListener("webglcontextlost", () => { this.ledger.reset(); this.onGpuEvent?.("context lost"); });
    this.renderer.setPixelRatio(1);
    installShaderDrawGate(this.renderer, this.shaderDrawStatus, object => object === this.island?.ground.mesh ? this.ground.loadingFallback : null);
    this.renderer.info.autoReset = false; // count every pass of a frame, reset in render()
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace; // colours are the art's own sRGB values, untouched
    this.mpp = metresPerArtPixel(t);
    this.camera = new THREE.PerspectiveCamera(t.camera.fov, 1, 1, 900);
    this.post = new Post(this.renderer, t);
    this.scene.background = new THREE.Color(0x0b0a16);
    // With find on (Ed, v244), a touch more ambient and a cooler, more coloured moonlight.
    const moonLook: Record<string, number> = { moonHue: t.find.moonHue, moonSat: t.find.moonSat };
    // The mood (render/mood.ts): the spooky grade over the style's light, or the plain light.
    const M = moodOf(t), moodLook: Record<string, number> = M ? { ambientHue: M.ambientHue, moonHue: M.moonHue, moonSat: M.moonSat, glowHue: M.glowHue, glowSat: M.glowSat } : {};
    applyStyleLight({ ...style, shafts: style.shafts * t.moonbeams, ...moonLook, ...moodLook }, t.glowReach, this.mpp, t.find.ambient * (M?.ambient ?? 1), t.glowFalloff, t.tone.moon * (M?.moon ?? 1));
    this.areaMoods = M ? new AreaMoods(M) : null;
    // The characters' moonlight rim and her own glow on her (the art director's round 1), the mood's.
    // A stylised art style (?style=bold|ref) bakes its light into dark tones with flat normals, so it takes its own,
    // stronger rim and glow on her (the art director's round 3: she vanished in her own pool on the dark moor).
    const styled = (style as { artStyle?: string }).artStyle === "bold" || (style as { artStyle?: string }).artStyle === "ref";
    { const rgb = new THREE.Vector3(); hsvInto(rgb, M?.rimHue ?? 0.66, M?.rimSat ?? 0.4, 1); SPRITE_UNIFORMS.uMoodRim.value.set(rgb.x, rgb.y, rgb.z, (styled ? M?.styledRim : undefined) ?? M?.rim ?? 0); }
    SPRITE_UNIFORMS.uWitchGlow.value = (styled ? M?.styledGlow : undefined) ?? M?.witchGlow ?? 0;
    SPRITE_UNIFORMS.uWitchLift.value = (styled ? M?.styledLift : undefined) ?? M?.witchLift ?? 0;
    SPRITE_UNIFORMS.uRimInset.value = styled ? 1 : 0;
    // The moon's fill on upward faces (the art director's round 2), in its own hue (round 3: green-cyan, not periwinkle);
    // its strength a share of the moon's.
    { const U = LIGHT_UNIFORMS.uMoon.value, c = new THREE.Vector3(); hsvInto(c, M?.moonUpHue ?? M?.moonHue ?? 0, M?.moonUpSat ?? M?.moonSat ?? 0, 1, Math.max(U.x, U.y, U.z) * (M?.moonUp ?? 0)); LIGHT_UNIFORMS.uMoonUp.value.set(c.x, c.y, c.z, M?.moonUpWrap ?? 0); }
    if (M) LIGHT_UNIFORMS.uHazeColour.value.fromArray(hsv2rgb(M.hazeHue, M.hazeSat, 1).map((c: number) => (c / 255) * M.haze));
    LIGHT_UNIFORMS.uGlowPower.value = t.glowPower;
    LIGHT_UNIFORMS.uGlowNear.value = Math.max(0.05, Math.min(1, t.glowNear ?? 1));
    if (t.bare) {
      // The bare view: a low moon raking across the ground so the slopes read; no glow, no haze.
      LIGHT_UNIFORMS.uMoonDir.value.set(-0.85, 0.28, 0.42).normalize();
      LIGHT_UNIFORMS.uMoon.value.multiplyScalar(4);
      LIGHT_UNIFORMS.uAmb.value.multiplyScalar(2);
      LIGHT_UNIFORMS.uGlowPower.value = 0;
    }
    this.moonBase.copy(LIGHT_UNIFORMS.uMoon.value); { const U = LIGHT_UNIFORMS.uMoonUp.value; this.moonUpBase.set(U.x, U.y, U.z); } // (the moonlight before the moon's own colour: updateMoon)
    // (sliced: the island build's own art workers' drawings asked ahead of the start's own, so the build doesn't wait behind them)
    this.assets = new AssetLibrary(style, game.seed, t.pixelSize, witchGenome, treehouseArtId(game), sliced ? [discoJob(style), MarkerArt.stoneJob(style, t, game.map).job] : []);
    this.assets.typeSeed = islandArtSeed(t.map?.world ?? 0, t.map?.island ?? "home");
    this.assets.typeBiome = biomeKey(t.map?.island ?? "home", t.map?.world ?? 0, t.biomeLooks); // (the island's biome: its forests' look, art/flora/biomes.js) // (the island's own trees: kept, so a revisit draws them at once; tonight's swapped in unseen, revealArt)
    this.assets.crownShare = t.trunkFade.crownShare;
    this.assets.stoneScale = t.runeMarkers.scale;
    if (!sliced) runSync(this.build());
  }

  /** A View whose island is built a frame's budget at a time (render/slices.ts; Ed's laptop, 2026-10-20: the build was one 10 s
   *  task, the bedroom's alarm, its music and every animation stopped): the same steps in the same order as `new View`, the page
   *  given its frames between them. Nothing is drawn until it's whole (the caller waits for it). */
  static async create(canvas: HTMLCanvasElement, game: Game, style: Style, witchGenome: unknown = null, budgetMs = 8): Promise<View> {
    await nextFrame(); // (a turn of its own: the renderer and the light made apart from whatever came before, the night's map)
    const v = new View(canvas, game, style, witchGenome, true);
    await runSliced(v.build(), "view", budgetMs);
    return v;
  }

  /** Everything of the View's from the island on, in steps (render/slices.ts): each `yield` a point where the page may have a
   *  frame, each named one a stage (a ?timing=1 mark, witch:build-<stage>). Made in the order the constructor always made them
   *  (three.js breaks draw-order ties by creation order). */
  private *build(): Steps { yield* a4_build(this, this.a4Internals, a4Shared); }

  /** ?debug=shadows (render/shadows.ts SHADOW_DEBUG): every shadow drawn flat magenta over the ground, not multiplied (on dark
   *  ground a multiplied tint is lost), so each shows plainly against what casts it. */
  debugShadows(): void {
    SHADOW_DEBUG.value = 1;
    for (const m of [this.shadow.material, this.shadows.mesh.material] as THREE.Material[]) { m.blending = THREE.NormalBlending; m.transparent = true; m.needsUpdate = true; }
  }

  /** The haze's range before the telescope widened it (restored as she looks away). */
  private hazeBeforeTelescope: THREE.Vector2 | null = null;
  /** The picture's pixels this many times the pixel size (the telescope: 1 over its resolution, finer below 1; main.ts resizes). */
  pixelScale = 1;
  /** A picture's pixel on the page, css pixels: the pixel size, snapped (pixels.snap) so it's a whole number of the screen's own
   *  pixels (Ed, 2026-10-29: "the pixels are just hard to read"; at a DPR of 1.25 a pixel size of 3 was 3.75 device pixels, its
   *  pixels drawn 3 and 4 wide by turns: 3.2 css, 4 device pixels, now). Set by resize. */
  cssPixel = 1;
  private pixelViewport = { w: 0, h: 0 };
  private scenePixelSize(): number { return a4_scenePixelSize(this, this.a4Internals, a4Shared); }
  /** Fit the canvas to the window: the scene at low resolution, shown scaled up by the pixel size. */
  resize(cssW: number, cssH: number): void { return a4_resize(this, this.a4Internals, a4Shared, cssW, cssH); }

  /** Make the art and ground round the start before the first frame (each night's: run again after setGame). */
  /** `o.dive` (a sail's, Ed 2026-10-24: "Don't wait for the trees"; "we only really need the scenery south of the treehouse for the
   *  dive"; "the treehouse doesn't have to be ready at the start of the dive - only once it's in view"): metres from the dive's view
   *  (rules/arrive.ts diveReach): the area types drawn in that order, nearest first, under the loading mist; and the start waits only
   *  for the shaders (the hand-off's own ground is drawn by its first frames, main.ts warmAt): the house's art, the ground and the
   *  forest round it are made on through the dive (`homeDone`; app/arrive.ts eases the dive if they're due in view before then). */
  prepare(o: { sail?: boolean; dive?: (x: number, z: number) => number; track?: [number, number, number, number][] } = {}): Promise<void> { return a4_prepare(this, this.a4Internals, a4Shared, o); }

  /** The treehouse tree as the dive's whole-tree shot frames it (rules/arrive.ts TreeExtent; the coordinator, 2026-10-24: the one
   *  measure of it): the great oak's crown, from its lobes, where there is one (render/crown.ts; its middle, its top from the ground
   *  and its width east to west), else the Ent's art at the treehouse once it's come; null till then. */
  treeExtent(): TreeExtent | null { return a4_treeExtent(this, this.a4Internals, a4Shared); }

  /** Whether the start's house is made: its art (her, home, the soundsystems, the treehouse), the ground and the forest round it.
   *  Before a sail's dive it may not be yet (prepare's `dive`): made on through it, by buildHome. */
  homeDone = true;

  /** A sail's house made through the dive (prepare's `dive`): the forest round it, its art (drawn by the art workers, not on the
   *  page: the dive's frames go on), the ground round it, a few tiles a frame, and the view's batches made again with it. */
  private buildHome(epoch = this.shaderEpoch): Promise<void> { return a4_buildHome(this, this.a4Internals, a4Shared, epoch); }

  /** The loading mist for this night (render/loadingMist.ts): over every area of the grid but home's, each type's reach from the
   *  treehouse; on by the tuning, off under ?quick=1 (it draws only what's in view, so the rest would stay misted) and in the bare
   *  view, ?loadmist= over both. */
  private makeLoadingMist(): void {
    if (this.loadingMist) { this.post.fxScene?.remove(this.loadingMist.mesh); this.loadingMist.dispose(); this.loadingMist = null; }
    const g = this.game, t = g.tuning, T = t.loadingMist;
    if (!T || !(this.loadingMistLink ?? (T.on && !this.quick && !t.bare))) return;
    const m = g.map, cells: { type: number; x: number; z: number }[] = [];
    for (let y = m.first; y < m.first + m.n; y++) for (let x = m.first; x < m.first + m.n; x++) {
      if (x === m.centreCell[0] && y === m.centreCell[1]) continue;
      const s = m.siteOf(x, y); cells.push({ type: m.typeOf(x, y), x: s.x, z: s.z });
    }
    const A = this.ground.areaUniforms;
    this.loadingMist = new LoadingMist(T, typeReaches(cells, m.treehouse, m.areaSize), m.treehouse, m.extent, A.uniforms, this.post.scene.depthTexture, this.post.fxSize, A.slots);
    (this.post.fxScene ??= new THREE.Scene()).add(this.loadingMist.mesh);
  }

  /** What the start's first frame would make the first time it's asked for, made ahead in steps (render/slices.ts; Ed's laptop,
   *  2026-10-20): the forest round her (the scenery's rebuild) and round the party's areas (their string lights), and the legends'
   *  carvings (their floors). The same things, made the same way, only sooner (each is kept: the forest's chunks, the carvings). */
  private *warmSteps(): Steps { yield* a4_warmSteps(this, this.a4Internals, a4Shared); }

  /** The island built (main.ts marks it for ?timing=1; nothing waits on it since the oak, rules/wakeUp.ts): the start's art made and every area type the map
   *  has drawn (askIsland's; home's own area is its meadow); under ?quick=1, which draws only what's needed as it's needed, the
   *  start's alone. Not the art still in flight: creatures and rigs coming into view keep that from ever emptying. */
  islandDrawn(): boolean {
    if (!this.prepared) return false;
    if (this.quick) return true;
    const m = this.game.map;
    for (let y = m.first; y < m.first + m.n; y++) for (let x = m.first; x < m.first + m.n; x++) {
      if (x === m.centreCell[0] && y === m.centreCell[1]) continue;
      if (!this.assets.hasType(m.typeOf(x, y))) return false;
    }
    return true;
  }

  /** How far the shaders' readiness has got (compileAll), for a loading screen's bar (the coordinator, 2026-10-26: Foxtrot's
   *  loading screen fills from real progress): its stage, and that stage's steps done out of its total (the programs linked, the
   *  textures uploaded, the warm draws; the GPU's catching up has no count, 0 of 1 till it has). "ready" once all are done. Read it
   *  as `window.witch.view.readiness`; `share` is the whole of it, 0 to 1. */
  readonly readiness: { stage: "compile" | "programs" | "textures" | "draws" | "gpu" | "ready"; done: number; total: number; share: number } = { stage: "compile", done: 0, total: 1, share: 0 };
  private setReadiness(stage: View["readiness"]["stage"], done: number, total: number): void { return a4_setReadiness(this, this.a4Internals, a4Shared, stage, done, total); }

  /** Every shader the scene holds compiled, and their programs' logs read, ahead of their first draw (prepare). */
  private compileAll(allowPartial = false): Promise<void> { return a4_compileAll(this, this.a4Internals, a4Shared, allowPartial); }

  /** Waited for, without blocking the page, till the GPU has done everything asked of it so far (a fence, polled): the links, the
   *  uploads and the warm draws above are only queued, and the first frame after them waited on the lot, a frozen frame just as play
   *  began (the coordinator, 2026-10-26, Hotel's profile: 2 to 7 s held in some cold starts, at the first draw after the start key;
   *  here the fence took 2.5 to 11 s after ready). So the loading screen (or the chart) stays up for it instead. A GL without fences
   *  (WebGL 1) goes on as before; one that never signals mustn't hold the start for good: 30 s. */
  private gpuCaughtUp(): Promise<void> { return a4_gpuCaughtUp(this, this.a4Internals, a4Shared); }

  /** The first frame drawn ahead, a pass a step, its targets a few pixels across (render/post.ts renderSteps): a GL's first draw
   *  of each program and target does the driver's own work then (Ed's laptop, 2026-10-21: 5 s on the first load's first frame
   *  and 2 s after a sail; the cloud's software renderer, 6 s of it in the first post pass), so play's first frame finds it done.
   *  Its last pass goes into a target, not the canvas; the targets are their own size again after. */
  private warmDraws(): Promise<void> { return a4_warmDraws(this, this.a4Internals, a4Shared); }

  /** The island's own asked for ahead of need (prepare: each island's): its legends' carvings, its area types by `near` (the
   *  nearest her first) and its creatures. */
  private askIsland(near: Map<number, number>): void { return a4_askIsland(this, this.a4Internals, a4Shared, near); }

  /** Another night's game and island on this page (docs/plans/sail-without-reload.md B 3-5, PR 4b): nothing of the last one's
   *  left. Its own records made afresh (nightState), its rebuild, caches and batches let go, the art reseated (render/assets.ts:
   *  a new generation, the last island's sets dropped and freed), the new island's layers built off the scene, then swapped in
   *  and only then the old ones let go (built before freed: the shader programs both use are never freed and compiled again),
   *  and every part of the view that keeps something of a night re-pointed or reset. The caller runs prepare() for its start. */
  setGame(game: Game): void { runSync(this.setGameSteps(game)); }
  /** setGame a frame's budget at a time (render/slices.ts): the new island built off the scene in steps, the page's frames between
   *  (the frame loop draws nothing meanwhile: main.ts, sailing), then swapped in at once. */
  setGameSliced(game: Game, budgetMs = 8): Promise<void> {
    holdDisposals(); // (the last night's materials kept till the new night's have their programs: render/retire.ts, compileAll)
    this.assets.early(MarkerArt.stoneJob(this.style, game.tuning, game.map).job); // (the new island's stones asked first, from the art workers)
    return runSliced(this.setGameSteps(game), "setGame", budgetMs);
  }
  private *setGameSteps(game: Game): Steps { yield* a4_setGameSteps(this, this.a4Internals, a4Shared, game); }

  /** Area types whose art was swapped (tonight's trees for the island's: AssetLibrary.swapTonight, main.ts revealArt): their
   *  batches let go, made again from the new art on the next frame, with no fade (she can't see it happen). */
  retype(types: number[]): void { return a4_retype(this, this.a4Internals, a4Shared, types); }

  /** Each area type's trees last listed (performance.now), and each creature batch last drawn: the GPU budget lets the longest
   *  unused go first (view/gpuBudget.ts). */
  typeUsed = new Map<number, number>();
  creatureUsed = new Map<string, number>();
  /** What the GPU holds (render/gpuLedger.ts), and the budget kept over it (view/gpuBudget.ts). */
  readonly ledger: GpuLedger;
  readonly gpu = newGpuState();
  /** The GL context back after it was lost: the night is loaded anew (main.ts), the page reloaded if no one says how. */
  onContextRestored?: () => void;
  /** Told of the GPU's own trouble (an out-of-memory error, the context lost): main.ts keeps it in the playtest log. */
  onGpuEvent?: (what: string) => void;
  /** Area type `t`'s trees let go (the GPU budget): its batches and its art (AssetLibrary.forgetType: asked for again from the art
   *  cache if she comes back, fading in as any set does). */
  forgetType(t: number): void {
    const b = this.typeBatches.get(t);
    if (b) { this.scene.remove(...b.meshes); b.release(); this.typeBatches.delete(t); }
    const sh = this.trunkShadowBatches.get(t);
    if (sh) { this.scene.remove(...sh.meshes); sh.dispose(); this.trunkShadowBatches.delete(t); } // (its own buffers: the atlas is the type's)
    this.typeUsed.delete(t);
    this.assets.forgetType(t); // (its atlas off the GPU; asked for again, from the art cache, when she comes back)
  }
  /** Creature batches `keys`, all on `atlas`, let go (the GPU budget), and their art (asked for again when a creature wears it). */
  forgetCreatures(keys: string[], atlas: SpriteBatch["atlas"]): void {
    for (const k of keys) { const b = this.creatureBatches.get(k); if (b) { this.scene.remove(...b.meshes); b.release(); this.creatureBatches.delete(k); } this.creatureUsed.delete(k); }
    this.assets.forgetCreatureAtlas(atlas);
  }

  batchFor<K>(map: Map<K, SpriteBatch>, key: K, atlas: () => SpriteBatch | undefined): SpriteBatch | undefined {
    let b = map.get(key);
    if (!b) {
      b = atlas();
      if (b) {
        map.set(key, b); this.scene.add(...b.meshes);
        b.name(`${map === this.typeBatches ? "type" : map === this.creatureBatches ? "creature" : "decor"} ${String(key)}`); // (the probes' draw-call names: tools/bench/gpu.cjs)
        // A set drawn after the start (flying toward an area whose art was still being drawn)
        // fades in rather than popping in.
        if (this.prepared && !(map === this.typeBatches && this.noFade.delete(key))) { b.appearU.value = 0; this.appearing.set(b, performance.now()); }
      }
    }
    return b;
  }
  /** The next wave's art, asked for as soon as its areas are chosen (a whole countdown ahead), so a woken area's
   *  creatures and legend are drawn enraged the moment it wakes rather than seconds later (overnight phase 2: the
   *  woken looks arrived 2 to 7 s after their wave on a fresh browser). The workers draw them between the scenery. */
  private prefetchWave(): void {
    const g = this.game, key = g.party.next.map(c => c.join(",")).join(";");
    if (!this.prepared || this.quick || key === this.prefetched) return;
    this.prefetched = key;
    for (const c of g.party.next) { const sp = AREA_TYPES[g.map.typeOf(c[0], c[1])]?.creature; if (sp) { this.assets.creatureArt(sp); this.assets.wokenArt(sp); } }
  }
  private easeAppearing(): void {
    const now = performance.now();
    for (const [b, at] of this.appearing) {
      const k = Math.min(1, (now - at) / 800);
      b.appearU.value = k * k * (3 - 2 * k);
      if (k >= 1) this.appearing.delete(b);
    }
  }

  // What the camera can see: its frustum now, and the frustum it is easing toward (a zoom step
  // or a rise or descent changes the view faster than any margin), plus a margin round both.
  // Everything drawn goes through this one test, so nothing is added or dropped on screen.
  frustum = new THREE.Frustum();
  frustumTo = new THREE.Frustum();
  cullCam = new THREE.PerspectiveCamera();
  box = new THREE.Box3();
  m4 = new THREE.Matrix4();
  v3 = new THREE.Vector3();
  /** A world point on screen (normalised device coordinates: x right, y up, -1 to 1), as the sprites are placed (the bend): `y`
   *  over the ground there, or the world's own height with `world`. For the tools (tools/house/positions.cjs). */
  screenOf(x: number, y: number, z: number, world = false): [number, number] { return a4_screenOf(this, this.a4Internals, a4Shared, x, y, z, world); }
  v3b = new THREE.Vector3();
  v3c = new THREE.Vector3();
  /** Keep track of what appears and vanishes (into pops): the smoke check turns it on (and
   *  ?debug=cull); off, a rebuild skips the bookkeeping. */
  trackPops = false;


  berryBatch!: SpriteBatch;
  rigGear(c: Creature, leashed: boolean): RigGear {
    const k = `${c.species}|${c.id}|${leashed ? 1 : 0}`; // (its species too: an id is a creature only within one map)
    let g = this.rigGears.get(k);
    if (!g) { if (this.rigGears.size > 2000) this.rigGears.clear(); this.rigGears.set(k, (g = partyGearOf(c.id, leashed ? sigilColour(c.species) : null))); }
    return g;
  }
  // Campfires flicker, magic stones pulse; their props are drawn (ponds are in the ground).
  fire = new THREE.Vector3(1, 0.5, 0.16);
  runeCyan = new THREE.Vector3(0.3, 0.9, 1);
  runeViolet = new THREE.Vector3(0.75, 0.45, 1);
  runeGreen = new THREE.Vector3(0.45, 1, 0.5);
  /** A 💌 vanishes at a slowed circle's edge: a small sparkle there (its `vanished` invite event calls this, render/invites.ts). */
  edgeSparkle(x: number, z: number): void { if (this.edgeSparkles.length < 64) this.edgeSparkles.push({ x, z, at: LIGHT_UNIFORMS.uRealTime.value }); }
  /** ?bare: hide everything but the ground, the witch, soundsystems, the dancefloor and its
   *  speakers, the bend and the sky (set each frame, as the batches show themselves when set). */
  private hideForBare(): void {
    for (const b of [...this.typeBatches.values(), ...this.decorBatches.values(), ...this.creatureBatches.values(), this.treehouseBatch, this.propBatch, this.markerBatch])
      for (const m of b.meshes) m.visible = false;
    for (const o of [this.grass.mesh, this.markerFx.group, this.borders.mesh, this.lasers.mesh, this.holograms.group, this.spellFx.trail, this.trail.mesh, this.swoopTrails.mesh]) o.visible = false;
  }

  readonly waveNumbers = new WaveNumbers();
  /** Draw a frame; with draw false, only bring the camera, batches and art requests up to date. */
  /** Milliseconds each part of the latest frame took (for the perf check: tools/smoke). */
  ms: Record<string, number> = {};
  private lap = 0;
  frameStart = 0;
  /** The moon now (one moon: rules/moon.ts), and the moonlight tinted a little with its colour (moon.tint). */
  updateMoon(g: Game): MoonState { return a4_updateMoon(this, this.a4Internals, a4Shared, g); }

  /** The hot springs' steam (render/lakeLooks.ts): a vent every so often over their deep water, the nearest puffing. */
  private updateSteam(g: Game, time: number): void { return a4_updateSteam(this, this.a4Internals, a4Shared, g, time); }

  /** The smoke (render/smoke.ts): the world's campfires burning now, the party's fires, and the charcoal huts' mounds, nearest first. */
  private updateSmoke(g: Game, time: number): void { return a4_updateSmoke(this, this.a4Internals, a4Shared, g, time); }

  time(part: string): void { const now = performance.now(); this.ms[part] = (this.ms[part] ?? 0) + now - this.lap; this.lap = now; }

  /** Her sprite batch, from the assets' witch frames (bare: her hat knocked off, and the hat on the ground). */
  makeWitchBatch(bare = false): SpriteBatch {
    const t = this.game.tuning, b = new SpriteBatch(bare ? this.assets.witchBare() : this.assets.witch, this.mpp, { absolute: true, rim: true, unmark: true, witchLight: t.witch, silhouette: { colour: LIGHT_UNIFORMS.uGlowRgb.value.clone(), opacity: t.occlusion.silhouette } });
    b.mesh.renderOrder = 10;
    this.scene.add(...b.meshes);
    return b;
  }
  /** The character creator changed her look (her genome, art/witchGenome.js): her frames re-baked and her batch swapped. */
  setWitch(genome: unknown): void {
    this.assets.rebakeWitch(genome); // (drawn by an art worker: her batch takes the new frames when they arrive, swapHomeArt below)
    if (this.bareBatch) { this.scene.remove(...this.bareBatch.meshes); this.bareBatch = null; this.bareAsked = false; }
  }
  /** The start's own art, drawn by the art workers (fast start (b)): each batch built on a stand-in takes its set once it arrives. */
  private swapHomeArt(): void { return a4_swapHomeArt(this, this.a4Internals, a4Shared); }

  /** How much of a thing shows over the bent horizon (culling.ts overBulge): the smoke check reads it. */
  overBulge(x: number, z: number, top: number): number { return overBulge(this, x, z, top); }

  /** The 💌's aim (issue #87): the world direction from the witch to the ground under a point on the page. */
  aimAt(clientX: number, clientY: number): { x: number; z: number } | null { return a4_aimAt(this, this.a4Internals, a4Shared, clientX, clientY); }
  private aimRay = new THREE.Raycaster();
  /** The drawing's CPU time (ms), eased over the last frames: the work ahead leaves room for it. */
  drawEst = 0;

  /** The legends' clearings nearest her this frame (reused: no garbage a frame). */
  private nearRings: LegendClearing[] = [];
  private ringItems: { x: number; z: number; r: number; edge: number; glow: number }[] = Array.from({ length: 6 }, () => ({ x: 0, z: 0, r: 0, edge: 0, glow: 0 }));
  /** The legends' clearings nearest her, each with its ring's brightening (Ed, 2026-10-06: quest sigils and relics count
   *  only in the circle): up while she stands on the ground inside it, and a flash (dying over a second and a half) when a
   *  sigil or a relic meant for its legend was put down outside it. No garbage a frame. */
  private legendRings(g: Game, time: number): { x: number; z: number; r: number; edge: number; glow: number }[] { return a4_legendRings(this, this.a4Internals, a4Shared, g, time); }
  private lakeSigils: { x: number; z: number; r: number; species: string; d: number }[] = [];
  private floorItems: { species: string; glint: number; look: FloorLook }[] = Array.from({ length: 6 }, () => ({ species: "", glint: 0, look: FALLBACK_LOOK }));

  render(time: number, draw = true): void { return a4_render(this, this.a4Internals, a4Shared, time, draw); }
}


export type ViewInternals = {
  aimRay: View["aimRay"];
  armLimitedLanding: View["armLimitedLanding"];
  askIsland: View["askIsland"];
  behindHouse: View["behindHouse"];
  borders: View["borders"];
  buildHome: View["buildHome"];
  castMap: View["castMap"];
  castOn: View["castOn"];
  cauldronLook: View["cauldronLook"];
  compileAll: View["compileAll"];
  crownAt: View["crownAt"];
  crownDrawn: View["crownDrawn"];
  crownFar: View["crownFar"];
  crownWorld: View["crownWorld"];
  dancefloor: View["dancefloor"];
  dark: View["dark"];
  easeAppearing: View["easeAppearing"];
  ensureCrown: View["ensureCrown"];
  floorItems: View["floorItems"];
  glades: View["glades"];
  gpuCaughtUp: View["gpuCaughtUp"];
  hazeBeforeTelescope: View["hazeBeforeTelescope"];
  hideForBare: View["hideForBare"];
  hiz: View["hiz"];
  hizOff: View["hizOff"];
  holograms: View["holograms"];
  lakeShore: View["lakeShore"];
  lakeSigils: View["lakeSigils"];
  landingFades: View["landingFades"];
  lap: View["lap"];
  lasers: View["lasers"];
  legendRings: View["legendRings"];
  leyBase: View["leyBase"];
  leyChainNow: View["leyChainNow"];
  leyColour: View["leyColour"];
  leyRgb: View["leyRgb"];
  magicBlink: View["magicBlink"];
  makeLoadingMist: View["makeLoadingMist"];
  mistClock: View["mistClock"];
  mistLast: View["mistLast"];
  monitoredPrograms: View["monitoredPrograms"];
  moonBase: View["moonBase"];
  moonUpBase: View["moonUpBase"];
  mushroomView: View["mushroomView"];
  nearRings: View["nearRings"];
  occluders: View["occluders"];
  overDebug: View["overDebug"];
  partyView: View["partyView"];
  pixelViewport: View["pixelViewport"];
  potionObservers: View["potionObservers"];
  prefetchWave: View["prefetchWave"];
  readyPrograms: View["readyPrograms"];
  ringItems: View["ringItems"];
  scenePixelSize: View["scenePixelSize"];
  setReadiness: View["setReadiness"];
  shaderChartLanding: View["shaderChartLanding"];
  shaderEpoch: View["shaderEpoch"];
  shaderLandingDeadline: View["shaderLandingDeadline"];
  shadowLights: View["shadowLights"];
  smoke: View["smoke"];
  soundBatch: View["soundBatch"];
  steam: View["steam"];
  steamFor: View["steamFor"];
  strings: View["strings"];
  swapHomeArt: View["swapHomeArt"];
  tiltAt: View["tiltAt"];
  trail: View["trail"];
  trailRgb: View["trailRgb"];
  tuftBiome: View["tuftBiome"];
  updateSmoke: View["updateSmoke"];
  updateSteam: View["updateSteam"];
  warmDraws: View["warmDraws"];
  warmSteps: View["warmSteps"];
  wisps: View["wisps"];
};
const a4PrivateBridges = new WeakMap<View, ViewInternals>();
const a4Shared = {
  get DECK_LANTERN_RGB(): typeof DECK_LANTERN_RGB { return DECK_LANTERN_RGB; },
  get DROPPED(): typeof DROPPED { return DROPPED; },
  set DROPPED(value: number) { DROPPED = value; },
  get FX_MOCK_MODE(): typeof FX_MOCK_MODE { return FX_MOCK_MODE; },
  get HAT_BESIDE(): typeof HAT_BESIDE { return HAT_BESIDE; },
  get HIZ_NEAR(): typeof HIZ_NEAR { return HIZ_NEAR; },
  get HOLE_HARD_AT(): typeof HOLE_HARD_AT { return HOLE_HARD_AT; },
  get HOUSE_TILT_EASE(): typeof HOUSE_TILT_EASE { return HOUSE_TILT_EASE; },
  get PLAZA_RGB(): typeof PLAZA_RGB { return PLAZA_RGB; },
  get SHADOW_VERT(): typeof SHADOW_VERT { return SHADOW_VERT; },
  get TRACK_AHEAD(): typeof TRACK_AHEAD { return TRACK_AHEAD; },
  get TRACK_REACH(): typeof TRACK_REACH { return TRACK_REACH; },
  get addDropped(): typeof addDropped { return addDropped; },
  get islandTypes(): typeof islandTypes { return islandTypes; },
  get nightState(): typeof nightState { return nightState; },
  get treehouseArtId(): typeof treehouseArtId { return treehouseArtId; },
};
export type ViewShared = typeof a4Shared;
