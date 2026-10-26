// The Three.js view: reads the game state each frame and draws it. Rendered into a canvas of
// (window size / pixel size) and stretched with nearest-neighbour by the browser, so every art
// pixel stays a crisp square.
import { RigView, rigOn } from "./rig/rigView";
import type { RigGear } from "./rig/rigBuild";
import type { Creature } from "../rules/creatures";
import { partyGearOf } from "./artBuild";
import { beatTime } from "../rules/beat";
import * as THREE from "three";
import { carrierOf, deckOf, indoorsAt } from "../rules/treehouse";
import { HOUSE_LAYER } from "./post";
import type { MapTable } from "./mapTable";
import { islandArtSeed } from "./artCache";
import { biomeKey } from "../rules/lakeLooks";
import { HouseRoomsView } from "./houseRooms";
import { CrownView, type PlanMap } from "./crown";
import { CrownLandmark } from "./crownLandmark";
import { makeCrown, type HouseOutline } from "../rules/crown";
// (the house's outline for the crown: only what it reads, so the floor's traced rings stay out of the bundle)
import { rooms as OUTLINE_ROOMS, branches as OUTLINE_BRANCHES, stubs as OUTLINE_STUBS, takeoff as OUTLINE_TAKEOFF } from "../../config/house/outline.json";
import { fromPlan, HOUSE_ROOMS, toPlan } from "../rules/houseRooms";
import { speakerRadius } from "../rules/speakers";
import { Hiz, HIZ_LAYER } from "./hiz";
/** How near the treehouse (m, the camera) its occluders are built (render/hiz.ts). */
const HIZ_NEAR = 120;
import { carvingMask, warmCarvings } from "./legendCarving";
import { sigilColour } from "../../art/generator.js";
import type { Game } from "../rules/game";
import { stepTiltShare, tiltShareShown } from "./overlayTilt";
import { blinkCharges, poseOf, witchTuning } from "../rules/game";
import { coolRoom, coolShare } from "../rules/cooldown";
import { shotCamera, type Shot, type TreeExtent } from "../rules/arrive";
import { FALLBACK_LOOK, floorLook, type FloorLook } from "./legendFloor";
import { AREA_TYPES, HOME_LOOK, nearestClearings, type LegendClearing } from "../rules/map";
import { ZOO_CONFIG } from "../rules/zoo";
import { canopyShown, witchHeight } from "../rules/witch";
import { AssetLibrary } from "./assets";
import type { LightSource } from "../rules/forest";
import { discoJob, type Ground } from "./ground";
import { IslandLayers } from "./island";
import { Sky } from "./sky";
import { slowAmount, slowest } from "./slowtime";
import { moonState, type MoonState } from "../rules/moon";
import { Clouds } from "./clouds";
import { Smoke } from "./smoke";
import { lakeLooksOf, steamVents } from "./lakeLooks";
import { LakeShoreView } from "./lakeShore";
import { lakeKnobs } from "../rules/lakes";
import type { ForestMap } from "../rules/map";
import { OcclusionProbes } from "./occlusion";
import { Ride } from "./ride";
import { bendPoint, groundHeight, HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL, type HeightField } from "./height";
import { applyStyleLight, LIGHT_UNIFORMS } from "./lighting";
import { AreaMoods, hsvInto, moodOf } from "./mood";
import { hsv2rgb } from "../../art/generator.js";
import { Post } from "./post";
import { GrassView } from "./grass";
import { SpellFx } from "./spellfx";
import { TRAIL_DEFAULT, WitchTrail } from "./trail";
import { newPartyOverLook, partyOff, partyOverEase, updatePartyOver } from "./partyOver";
import { SWOOP_TRAIL_DEFAULT, SwoopTrails } from "./swoopTrails";
import { LOAD_DEFAULT, loadView } from "./load";
import { HAND, InviteView, letterAt, type HerOffset } from "./invites";
import { StateMarks } from "./looks";
import { BuffHud } from "./buffhud";
import type { Dancefloor } from "./dancefloor";
import { PartyView } from "./party";
import { MarkerArt, MarkerFx, type Mote } from "./markers";
import { partyZones, type SpawnMarker } from "../rules/party";
import { WaveNumbers } from "./waveNumbers";
import { StringLightsView } from "./strings";
import { LeashView } from "./leash";
import { CombatLight } from "./combatLight";
import { Lasers, type RingSpeaker } from "./lasers";
import { SigilHolograms } from "./hologram";
import { SoundsystemGenView } from "./soundsystemGen";
import { PartyWitchView } from "./partyWitches";
import { BeachView } from "./beach";
import { PartyObjectsView } from "./partyObjects";
import { BorderView } from "./borders";
import { StoneIndicator } from "./indicator";
import { Pin, type PinLook, type PinTarget } from "./pins";
import type { AlarmIndicators } from "./alarm";
import { newAlarms } from "../rules/alarms";
import { hasRune } from "../rules/creatureStates";
import type { Minimap } from "./minimap";
import { Rulers } from "./rulers";
import { Mist } from "./mist";
import { LightRings } from "./lightRings";
import { LoadingMist } from "./loadingMist";
import { typeReaches } from "./loadingFront";
import { SHADOW_DEBUG, SHADOW_TINT, ShadowBatch, type ShadowInstance } from "./shadows";
import { MAX_FIRES, TRUNK_SHADOW_UNIFORMS, type TrunkShadowBatch } from "./trunkShadows";
import { CastShadowMap } from "./castShadows";
import { newBudget, stepBudget, type SceneryBudget } from "../rules/budget";
import { atlasBytes, packAtlas } from "./atlas";
import { berrySprite } from "./berries";
import { leyDrawnTo, shaderPulse, type LeyLines } from "./leylines";
import { routeSeen } from "../rules/hatSpells";
import { bootLineAt, bootPath, bootPulseAt } from "../rules/bootRing";
import { Glades } from "./glades";
import { Wisps } from "./wisps";
import { leyChain, leyKey } from "../rules/leylines";
import { SPRITE_UNIFORMS, SpriteBatch, metresPerArtPixel } from "./sprites";
import type { Spin } from "./spin";
import { nextFrame, runSliced, runSync, type Steps } from "./slices";
import { holdDisposals, releaseDisposals } from "./retire";
import { Fireworks } from "./fireworks";
import type { Style } from "./style";
import type { Tuning } from "../rules/tuning";
import type { SleepTrack } from "./legendSleep";

// The view's parts, each in its own module under view/ (issue #122), as functions of the View:
// what the camera can see, the pop check, the scenery rebuild, creatures and berries, home's
// pieces (markers, speakers, treehouse), and the lights. Its fields they share aren't private.
import { inView, overBulge, viewRect } from "./view/culling";
import { checkPops, drawGhosts } from "./view/pops";
import { cancelRefresh, refresh, refreshSteps } from "./view/scenery";
import { drawBerries, drawCreatures, resetCreatureCaches } from "./view/creatures";
import { drawHatArt } from "./view/hatArt";
import { drawFinds, findClear } from "./view/finds";
import { drawMarkers, drawSpeakers, forgetCandles, placeTreehouse, entDeckDrawn } from "./view/home";
import { miniTreehouse, ZooExitTag } from "./zooExit";
import { lanternLights, relicLights, setLights, sigilLights, updateSources } from "./view/lights";
import { placeCamera } from "./view/camera";
import { setFrameUniforms } from "./view/frameUniforms";
import { newReveal, setReveal } from "./view/reveal";
import { drawWitch, houseShiftOf } from "./view/witch";
import { drawPointers } from "./view/hud";
import { workAhead } from "./view/ahead";
import { winLit, winPulse, winPulseOut } from "../rules/win";
import { relicsOut } from "../rules/partyOver";

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

/** Which treehouse an island's art draws: the house (art/ent.js HOUSE), the Ent holding the deck (with the island's legend carrying
 *  it, art/carrier.js), or the old treehouse, "home". */
function treehouseArtId(game: Game): string {
  const t = game.tuning, deck = deckOf(game.map, t), carrier = deck ? carrierOf(game.map, t) : null;
  return deck ? `${deck.house ? "house" : "ent"}:${deck.h}:${deck.r}${carrier ? `:${carrier}` : ""}` : "home";
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

export class View {
  readonly renderer: THREE.WebGLRenderer;
  scene = new THREE.Scene();
  camera: THREE.PerspectiveCamera;
  /** The far haze as it was, while the circle-bug suspects have it off (tuning suspects.haze; render/view/frameUniforms.ts). */
  hazeKept: THREE.Vector2 | null = null;
  /** The island's own layers (render/island.ts): the ground, the hills, the paths, the ley lines, the runestones, the
   *  dancefloor, the treehouse, the minimap and the map table; the View's names for them below are its. */
  island!: IslandLayers;
  get ground(): Ground { return this.island.ground; }
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
  /** The dark behind the house's enclosed rooms (Ed, 2026-10-23: "when you're inside the treehouse in an enclosed room (i.e. not
   *  the terrace) the forest behind the tree should be black"; the tuning's treehouse.house.dark; render/post.ts Post.behind): in a
   *  room or on a branch off the Terrace (rules/treehouse.ts indoorsAt), on foot, only the house's own meshes are drawn (its rooms, the Ent's
   *  art with its crowns, her), over black; the scenery is still listed and its art still asked for, only not drawn. Stepping
   *  onto the Terrace the forest comes back from the doorway she came through over dark.fade seconds, and goes again as she goes
   *  back in; through the telescope it fades in over the same, the whole picture at once. Eased on her clock (g.herTime: full
   *  speed in the house's slowed time, and the same on any machine). */
  /** No tilt-shift in the treehouse (Ed, 2026-10-26: "No tilt shift while you're in the treehouse"): on the house (its rooms,
   *  branches and Terrace, the stations' close-ups; her perch) the blur eases out over HOUSE_TILT_EASE seconds of her clock, and back
   *  in as she leaves; through the telescope it stays as it was (its own view of the island). Once a frame (render/view/witch.ts), its
   *  share for the post pass (Post.tilt) and the overlays (render/overlayTilt.ts). */
  tiltK = 1;
  private tiltAt = NaN;
  houseTilt(g: Game): number {
    const want = g.witch.perch && !this.telescope ? 0 : 1, dt = Number.isFinite(this.tiltAt) ? Math.max(0, Math.min(0.1, g.herTime - this.tiltAt)) : 1e9;
    this.tiltAt = g.herTime;
    this.tiltK = stepTiltShare(this.tiltK, want, dt, HOUSE_TILT_EASE);
    return tiltShareShown(this.tiltK);
  }
  private dark = { k: 1, at: NaN, door: null as { x: number; z: number } | null, enclosed: false, uv: new THREE.Vector2() };
  private behindHouse(g: Game): void {
    const D = this.dark, T = g.tuning.treehouse.house?.dark, deck = deckOf(g.map, g.tuning), w = g.witch;
    const enclosed = !!T?.on && !!deck?.house?.rooms && !!w.perch && w.mode === "ground" && indoorsAt(deck, w.x, w.z) && !this.telescope; // (on foot: rising out of a room, the forest comes back as she lifts off)
    // (the doorway: where she crossed between a room's branch and the Terrace, either way; none for the telescope's fade)
    if (enclosed !== D.enclosed) { D.door = this.telescope && !enclosed ? null : { x: w.x, z: w.z }; D.enclosed = enclosed; }
    const dt = Number.isFinite(D.at) ? Math.max(0, Math.min(0.1, g.herTime - D.at)) : 1e9;
    D.at = g.herTime;
    const fade = Math.max(1e-3, T?.fade ?? 0.6);
    D.k = enclosed ? Math.max(0, D.k - dt / fade) : Math.min(1, D.k + dt / fade);
    if (!T?.on) D.k = 1;
    const P = this.post;
    P.behind = D.k < 1 ? D.k * D.k * (3 - 2 * D.k) : 1; // (eased in and out)
    if (D.k >= 1) return;
    // The house's own meshes on its layer as well as the scene's (they come and go: each frame).
    for (const o of [...(this.houseRooms?.meshes ?? []), ...(this.crown?.meshes ?? []), ...(this.strings?.crownMeshes ?? []), ...this.treehouseBatch.meshes, ...this.witchBatch.meshes, ...(this.bareBatch?.meshes ?? [])]) o.traverse(c => c.layers.enable(HOUSE_LAYER));
    if (D.door) {
      const p = this.v3.set(D.door.x, this.witchFeetY, D.door.z).project(this.camera);
      P.behindAt = D.uv.set(p.x * 0.5 + 0.5, p.y * 0.5 + 0.5);
    } else P.behindAt = null;
  }

  /** What the treehouse hides of the forest, left undrawn (render/hiz.ts; the perf pass, 2026-10-23): the Ent's solid pass on its
   *  occluder layer, the chain built while the camera is within HIZ_NEAR metres of the treehouse (the decks, the balcony, the house,
   *  flying round it), off elsewhere. `?hiz=0` never builds it (to compare). */
  private hiz: Hiz | null = null;
  private readonly hizOff = new URLSearchParams(globalThis.location?.search ?? "").get("hiz") === "0";
  private occluders(): void {
    const T = this.game.map.treehouse, cp = this.camera.position, m = this.treehouseBatch.meshes[0];
    const on = !this.hizOff && !!m && (cp.x - T.x) ** 2 + (cp.z - T.z) ** 2 < HIZ_NEAR * HIZ_NEAR;
    if (on && !this.hiz) this.hiz = new Hiz(this.renderer);
    if (m) m.layers.enable(HIZ_LAYER);
    this.hiz?.render(this.renderer, this.scene, this.camera, this.width, this.height, on);
  }

  /** The hot springs' steam (render/lakeLooks.ts steamVents): smoke's puffs, whiter, lower and slower; its vents the map's. */
  private steam!: Smoke;
  /** The biome lakes' shore dressing and the lava's light (render/lakeShore.ts). */
  private lakeShore!: LakeShoreView;
  private steamFor: { map: ForestMap; vents: Float32Array } | null = null;
  readonly assets: AssetLibrary;
  typeBatches = new Map<number, SpriteBatch>();
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
  /** The zoo's little treehouse's "exit" prompt (render/zooExit.ts), made in the zoo. */
  zooExitTag: ZooExitTag | null = null;
  /** The great oak's crown over the house (render/crown.ts), with the house's rooms and treehouse.house.crown on. */
  crown: CrownView | null = null;
  /** The crown seen over the horizon from far off (render/crownLandmark.ts). */
  private crownFar: CrownLandmark | null = null;
  private crownAt = Number.NaN;
  private crownDrawn = true;
  private readonly crownWorld: PlanMap = { o: new THREE.Vector3(), ex: new THREE.Vector3(), ey: new THREE.Vector3(0, 1, 0), ez: new THREE.Vector3() };
  /** The crown for a house with rooms (made once: the same oak over any island's treehouse), or none. */
  private ensureCrown(game: Game): void {
    const t = game.tuning, H = t.treehouse.house, want = !!(H?.on && H.crown?.on && deckOf(game.map, t)?.house?.rooms);
    // (the crown whole over the Terrace or with its gap, the pause page's switch: Ed, 2026-10-26, grown again when it's flipped)
    const gap = H?.crown?.whole !== true;
    if (this.crown && want && this.crown.crown.gap !== gap) { this.scene.remove(...this.crown.meshes); this.strings?.setCrown(null); this.crown.dispose(); this.crown = null; if (this.crownFar) { this.scene.remove(...this.crownFar.meshes); this.crownFar.dispose(); this.crownFar = null; } }
    if (want && !this.crown && H) {
      const outline = { rooms: OUTLINE_ROOMS, branches: OUTLINE_BRANCHES, stubs: OUTLINE_STUBS, takeoff: OUTLINE_TAKEOFF } as unknown as HouseOutline;
      // (the dancefloor and its speakers stay open to the sky as the Terrace does: it stands south-east of the house, under the crown's edge)
      const deck = deckOf(game.map, t)!, df = game.map.dancefloor, dp = toPlan({ x: deck.x, z: deck.z }, df.x, df.z);
      const open = [{ x: dp.x, z: dp.z, r: speakerRadius(t) + t.dancefloor.speakers.footprint + 4 }];
      this.crown = new CrownView(makeCrown({ outline, floor: H.height, seed: H.crown!.seed, open, gap }), t.stringLights.bulbSpacing, outline);
      this.crown.drawMask = (key, box) => { const p = this.assets.oneOff({ kind: "crownMask", id: `${key}@${box.map(v => v.toFixed(4)).join(",")}`, style: this.assets.style, box: [...box] }).then(r => r.mask ?? Promise.reject(new Error("no mask"))); this.assets.track(`crownMask:${key}`, p); return p; };
      this.scene.add(...this.crown.meshes);
      this.strings?.setCrown(this.crown); // (its string lights: render/strings.ts)
      this.crownFar = new CrownLandmark(this.crown, t.stringLights.palette.map(h => new THREE.Color(h))); this.scene.add(...this.crownFar.meshes);
    } else if (!want && this.crown) {
      this.scene.remove(...this.crown.meshes); this.strings?.setCrown(null); this.crown.dispose(); this.crown = null;
      if (this.crownFar) { this.scene.remove(...this.crownFar.meshes); this.crownFar.dispose(); this.crownFar = null; }
    }
  }
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
  /** Her flight trail: a ribbon of glow in the colour of the area she's over (render/trail.ts). */
  private trail!: WitchTrail;
  private trailRgb = new THREE.Vector3();
  private buffHud = new BuffHud(document.body);
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
  /** The end of the route's pointer (rules/win.ts): toward the straggler nearest the centre, then the victory lap's pulse. */
  winPointer: StoneIndicator | null = null;
  /** Pins anyone has put up (render/pins.ts: view.pin(target, look)), drawn with the pointers. */
  readonly pins = new Set<Pin>();
  pinsAt = Number.NaN;
  /** A map pin toward `target` (a world point with a height, or a house object), looking `look`; shown at once, `hide()` and
   *  `show()` to fade it, `remove()` for good. */
  pin(target: PinTarget, look: PinLook): Pin & { remove(): void } {
    const p = Object.assign(new Pin(target, look), { remove: () => { this.pins.delete(p); p.dispose(); } });
    this.pins.add(p);
    return p;
  }
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
  /** What she plays with, for the use prompts' button (platform/input.ts device): E, the pad's □ or a tap on the prompt itself. */
  useDevice: "keys" | "pad" | "touch" = "keys";
  /** A tap on a use prompt (touch): down and up, as the touch sigil button's (main.ts sets it). */
  onUse: ((down: boolean) => void) | null = null;
  /** In the house's rooms, her head on the page (CSS px) as the house places it (render/houseRooms.ts) and when (ms). */
  readonly herHouseHead = { x: 0, y: 0, at: -Infinity };
  /** Off the treehouse's hub, how far the camera's aim moves to follow where she's drawn (render/view/witch.ts). */
  readonly houseCam = { x: 0, y: 0, z: 0 };
  /** Where she's drawn less where the rules have her, in the treehouse (render/view/witch.ts), her feet's world height as drawn: her
   *  letters drawn by it (render/invites.ts letterAt), so they leave her hand as drawn. */
  readonly herOffset: HerOffset = { on: false, x: 0, y: 0, z: 0 };
  /** Where a 💌 thrown now starts as drawn (the world's height), for the tools (tools/house/positions.cjs). */
  inviteStart(g: Game): { x: number; y: number; z: number; world: boolean } {
    const [x, y, z] = letterAt(this.herOffset, g.witch.x, HAND, g.witch.z);
    return { x, y: y + groundHeight(x, z), z, world: true };
  }
  /** How far up the Ent's plane (its art's pixels, negative up) the oak's rooms are drawn this frame, so the room she's in sits at the
   *  Terrace's height (render/view/witch.ts sets it, render/houseRooms.ts draws by it). */
  houseShift = 0;
  /** Her height as drawn (metres: her frame's, times her scale on the treehouse's floor): what a station's aim is a share of. */
  witchTall = 0;
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
    // A lost and restored GL context (a GPU reset, a tab long in the background on a phone): three.js would upload every texture
    // again from its pixels, which the atlases let go once uploaded (render/atlas.ts), so the art would come back black. The
    // page reloads instead (DECISION FOR ED: a run is lost either way; nothing handled it before, and the ground's own GPU-side
    // tiles wouldn't have come back either).
    canvas.addEventListener("webglcontextrestored", () => { console.warn("view: the GL context was lost and restored: reloading"); location.reload(); });
    this.renderer.setPixelRatio(1);
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
  private *build(): Steps {
    const game = this.game, t = game.tuning, style = this.style, M = moodOf(t), deckOn = deckOf(game.map, t); // (the treehouse Ent holding the deck, rules/treehouse.ts; else the old treehouse)
    yield "island";
    // (Each island layer made at its old place among the View's own: three.js breaks draw-order ties by creation order.)
    this.island = new IslandLayers(this.scene, { game, style, mpp: this.mpp, maxTexture: this.renderer.capabilities.maxTextureSize, assets: this.assets, deck: deckOn });
    yield* this.island.groundSteps();
    yield "sky";
    this.sky = new Sky(t.sky, t.moon.disc);
    this.scene.add(this.sky.mesh);
    this.clouds = new Clouds(t.sky.clouds, t.sky.lightning, game.seed);
    this.scene.add(this.clouds.mesh, this.clouds.bolt);
    this.smoke = new Smoke(t.smoke);
    { const S = lakeKnobs(t).steam; this.steam = new Smoke({ ...t.smoke, on: S.on, rate: 1.2, life: S.life, rise: S.rise, speed: (S.rise / S.life) * 1.6, size: S.size, grow: 2, opacity: S.opacity, warm: 0, perFire: 8, maxFires: 12 }); }
    this.scene.add(this.smoke.mesh, this.steam.mesh);
    this.assets.onFloor = (type, tile) => this.ground.setFloor(type, tile);
    this.assets.prefetchType(HOME_LOOK); // home's meadow floor (no trees ask for it)
    const cs = t.canopyShadow;
    this.ground.setCanopyShadow(cs.on ? cs.strength : 0, cs.height, cs.cover, cs.wind);
    this.shadows = new ShadowBatch(t.shadows.strength);
    this.shadows.mesh.visible = t.shadows.on;
    this.scene.add(this.shadows.mesh);
    if (t.mist.on && t.mist.strength > 0) {
      this.mist = new Mist(M?.mist ?? t.mist.strength, t.mist.height, t.mist.wind, this.post.scene.depthTexture, this.post.fxSize); // (the effects layer is half the scene's size: post.ts)
      this.post.fxScene = new THREE.Scene(); this.post.fxScene.add(this.mist.mesh);
    }
    if (t.lightRings?.on && (t.lightRings.strength > 0 || t.lightRings.gloryStrength > 0) && !t.bare) {
      this.lightRings = new LightRings(t.lightRings, this.post.scene.depthTexture, game.map.seed);
      (this.post.fxScene ??= new THREE.Scene()).add(this.lightRings.mesh);
    }
    // (no haze in the bare view; the mood's fog comes nearer than the culling's far edge, which stays t.haze.far)
    LIGHT_UNIFORMS.uHazeRange.value.set(t.bare ? 1e5 : M?.hazeNear ?? t.haze.near, t.bare ? 2e5 : M?.hazeFar ?? t.haze.far);
    yield "paths";
    yield* this.island.pathSteps();
    yield "witch";

    // The witch is depth-tested like everything else, drawn after it; where something still hides
    // her, a silhouette in her glow colour shows through, and tall things in front of her fade.
    const O = t.occlusion;
    this.witchBatch = this.makeWitchBatch();
    SPRITE_UNIFORMS.uOcc.value.set(O.fadeOpacity, O.edge, O.minHeight, O.on ? 1 : 0);
    // The treehouse, home: its base and its crown (the crown only from the treetops), its trunk's
    // foot on its spot. It fades like other tall things when she's behind it.
    {
      // (Placed each frame by placeTreehouse: where it stands depends on the camera's angle.)
      // With the deck's map table (rules/treehouse.ts): the sea chart's live miniature on its top (render/mapTable.ts).
      this.island.buildTreehouse();
      // The house's placeholder rooms off the hub (render/houseRooms.ts; Ed, 2026-10-19).
      if (deckOn?.house?.rooms) { this.houseRooms = new HouseRoomsView(); this.scene.add(...this.houseRooms.meshes); }
      this.ensureCrown(game); // (the great oak's crown over it: render/crown.ts)
    }
    // Spawn markers: gameplay (always drawn in range, never budget-culled).
    yield* this.island.markerSteps();
    yield "grass";
    this.scene.add(this.markerFx.group, this.waveNumbers.mesh);
    // The ground cover: tufts round the witch, in ground mode.
    this.tuftBiome = style.biome ?? this.assets.typeBiome; // (in the island's biome: art/flora/biomes.js; ?biome= over it)
    const tufts = yield* GrassView.tufts(this.tuftBiome ? { ...style, biome: this.tuftBiome } : style, islandTypes(game.map));
    yield;
    this.grass = new GrassView(game.map, t, this.mpp, style, game.forest, (this.ground.mesh.material as THREE.ShaderMaterial).uniforms, tufts);
    yield "parts";
    this.scene.add(this.grass.mesh);
    this.scene.add(this.spellFx.trail);
    this.trail = new WitchTrail(game.tuning.trail ?? TRAIL_DEFAULT);
    this.scene.add(this.trail.mesh);
    // The dancefloor's speakers: their batch comes with their art (drawSpeakers).
    this.assets.speakerArt();
    this.propBatch = new SpriteBatch(this.assets.props, this.mpp, { fade: true }).name("props");
    // Berries: a small shiny dark-red berry, drawn here (a highlight upper left, a darker side),
    // always drawn (gameplay), unlit so it reads at night; its halo and glints are in leash.ts.
    this.berryBatch = new SpriteBatch(packAtlas([berrySprite(t.berries.colour)], 64), this.mpp, { unlit: true });
    this.scene.add(...this.berryBatch.meshes);
    this.scene.add(...this.propBatch.meshes);
    yield "party";
    this.partyView = new PartyView(this.assets.soundsystems, this.mpp, new SoundsystemGenView(this.scene, this.assets, this.mpp, this.renderer, this.camera, this.trunkShadowBatches));
    this.strings = new StringLightsView(this.scene, game);
    this.strings.setCrown(this.crown); // (the crown's lights, made before the strings were)
    this.leashView = new LeashView(this.scene, game);
    this.leashView.herOffset = this.herOffset;
    this.rig = rigOn() ? new RigView(this.scene, this.assets, this.mpp) : null; // the live rig (#79): on unless ?rig=0
    this.lasers = new Lasers(this.scene, game);
    yield "holograms";
    const glyphs = yield* SigilHolograms.glyphs();
    yield;
    this.holograms = new SigilHolograms(t.holograms, glyphs);
    this.scene.add(this.holograms.group);
    yield "fireworks";
    this.fireworks = new Fireworks(SPRITE_UNIFORMS.uRes, this.mpp);
    this.scene.add(this.fireworks.mesh);
    yield "ley";
    this.island.buildLey();
    this.leyBase = M?.leyBright ?? 1;
    this.ley.scale(this.leyBase);
    this.leyRgb = M?.leyRgb ? new THREE.Vector3(...[1, 3, 5].map(i => parseInt(M.leyRgb!.slice(i, i + 2), 16) / 255)) : null;
    this.glades = new Glades(t.glades);
    this.scene.add(this.glades.points);
    if (t.wisps?.on) { this.wisps = new Wisps(t.wisps); this.scene.add(this.wisps.points); }
    yield "partyObjects";
    this.partyObjects = new PartyObjectsView(this.scene, this.assets, this.mpp);
    this.partyWitchView = new PartyWitchView(this.scene, this.assets, this.mpp, t.witch);
    this.beachView = new BeachView(this.scene, this.assets, this.ground, this.mpp, t.witch);
    this.lakeShore = new LakeShoreView(this.scene, this.mpp);
    this.swoopTrails = new SwoopTrails(game.tuning.swoopTrail ?? SWOOP_TRAIL_DEFAULT);
    this.scene.add(this.swoopTrails.mesh);
    this.inviteView = new InviteView(game);
    this.inviteView.herOffset = this.herOffset;
    // The 💌s and the invite rings hidden as the animals are, by what stands in front of them and the smoke (render/occlusion.ts;
    // Ed, 2026-10-19). ?occlusion=off: drawn over everything, as before, to compare.
    yield "occlusion";
    this.occlusion = new OcclusionProbes(this.scene, this.renderer, this.camera, this.smoke);
    this.occlusion.on = typeof location === "undefined" || new URLSearchParams(location.search).get("occlusion") !== "off";
    this.inviteView.probes = this.occlusion;
    this.inviteView.onVanished = (x, z) => this.edgeSparkle(x, z);
    yield "stateMarks";
    this.stateMarks = new StateMarks(this.scene, this.mpp);
    yield "borders";
    this.borders = new BorderView(this.scene, game);
    yield;
    this.soundBatch = new SpriteBatch(this.assets.soundsystems, this.mpp, { solid: true }).name("soundsystems");
    this.scene.add(...this.soundBatch.meshes);
    yield "dancefloor";
    this.island.buildDancefloor();
    yield* this.island.finishSteps();

    // A shadow under the witch, so her height reads: soft (multiplied over the ground).
    const sm = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.CustomBlending, blendSrc: THREE.ZeroFactor, blendDst: THREE.SrcColorFactor,
      vertexShader: SHADOW_VERT, uniforms: { ...HEIGHT_UNIFORMS, uShadowDebug: SHADOW_DEBUG },
      fragmentShader: "uniform float uShadowDebug; varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; float r = dot(p, p); if (r > 1.0) discard; gl_FragColor = uShadowDebug > 0.5 ? vec4(1.0, 0.0, 1.0, 1.0) : vec4(vec3(1.0 - 0.75 * (1.0 - r) * (1.0 - r)), 1.0); }",
    });
    // Finely divided, each point laid on the rolling ground, and drawn a little toward the camera: one
    // flat quad on a slope (Ed, v289) sank into the ground's coarser grid in places, a ragged blob.
    sm.polygonOffset = true; sm.polygonOffsetFactor = -2; sm.polygonOffsetUnits = -4;
    this.shadow = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.7, 6, 3).rotateX(-Math.PI / 2), sm);
    this.shadow.renderOrder = 1;
    this.scene.add(this.shadow);
  }

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
  /** Fit the canvas to the window: the scene at low resolution, shown scaled up by the pixel size. */
  resize(cssW: number, cssH: number): void {
    const p = this.game.tuning.pixelSize * this.pixelScale;
    this.width = Math.max(1, Math.ceil(cssW / p));
    this.height = Math.max(1, Math.ceil(cssH / p));
    // The canvas holds the low-resolution picture, which the browser scales up with nearest-neighbour.
    this.renderer.setSize(this.width, this.height, false);
    this.post.resize(this.width, this.height, this.width, this.height);
    this.canvas.style.width = this.width * p + "px";
    this.canvas.style.height = this.height * p + "px";
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    SPRITE_UNIFORMS.uRes.value.set(this.width, this.height);
  }

  /** Make the art and ground round the start before the first frame (each night's: run again after setGame). */
  /** `o.dive` (a sail's, Ed 2026-10-24: "Don't wait for the trees"; "we only really need the scenery south of the treehouse for the
   *  dive"; "the treehouse doesn't have to be ready at the start of the dive - only once it's in view"): metres from the dive's view
   *  (rules/arrive.ts diveReach): the area types drawn in that order, nearest first, under the loading mist; and the start waits only
   *  for the shaders (the hand-off's own ground is drawn by its first frames, main.ts warmAt): the house's art, the ground and the
   *  forest round it are made on through the dive (`homeDone`; app/arrive.ts eases the dive if they're due in view before then). */
  async prepare(o: { dive?: (x: number, z: number) => number; track?: [number, number, number, number][] } = {}): Promise<void> {
    performance.mark("witch:prep-start");
    this.makeLoadingMist();
    { // tonight's own trees, if drawn ahead and kept (app/landingBake.ts), for the swap before she sees the island (retype)
      const m = this.game.map, types = new Set<number>();
      for (let y = m.first; y < m.first + m.n; y++) for (let x = m.first; x < m.first + m.n; x++) types.add(m.typeOf(x, y));
      this.assets.tonight(types);
    }
    // Every area type the map has, drawn in the background so the forest ahead is ready however fast she flies; the
    // nearest her first. Only the map's own (Ed, 2026-10-12: an island grows only its roster's species, rules/map.ts): a type
    // it hasn't is never drawn, and home's area is its meadow (HOME_LOOK, asked for by the house), not its type's trees.
    // By the treehouse, where she wakes and sits at her decks (Ed, 2026-10-24, the loading mist: "If loading starts with areas
    // closer to the treehouse, this will look fine"): each type by its nearest area to the house; a sail's, to the dive's view.
    const m = this.game.map, h = m.treehouse, near = new Map<number, number>();
    for (let y = m.first; y < m.first + m.n; y++) for (let x = m.first; x < m.first + m.n; x++) {
      if (x === m.centreCell[0] && y === m.centreCell[1]) continue;
      const s = m.siteOf(x, y), t = m.typeOf(x, y), d = o.dive ? o.dive(s.x, s.z) : Math.hypot(s.x - h.x, s.z - h.z);
      if (!(near.get(t)! <= d)) near.set(t, d);
    }
    if (o.dive) {
      this.homeDone = false;
      this.prepared = true;
      this.askIsland(near); // (the workers drawing the dive's areas while the shaders link)
      await this.compileAll();
      // The ground where the dive first sees the island (Ed, 2026-10-24: the dive's view needs the ground; Echo's island black through
      // the descent, its tiles not drawn yet): the first TRACK_AHEAD metres of its track in from the sea, TRACK_REACH each side, a few
      // tiles a frame under the chart; the rest of it as the dive goes, the view's own each frame (render/view/ahead.ts).
      const leg = o.track?.[0];
      if (leg) {
        const [x0, z0] = leg, r = { minX: x0 - TRACK_REACH, maxX: x0 + TRACK_REACH, minZ: z0 - TRACK_AHEAD, maxZ: z0 + TRACK_REACH };
        while (this.ground.fill(this.renderer, r, x0, z0, 6) > 0) await nextFrame();
      }
      performance.mark("witch:prep-track");
      void this.buildHome().catch(e => { console.error("the house's start after a sail went wrong", e); }).finally(() => { this.homeDone = true; });
      return;
    }
    await runSliced(this.warmSteps(), "warm"); // (the first frame's own lazy work made ahead, a slice at a time)
    performance.mark("witch:prep-warm");
    this.render(0, false);
    drawCreatures(this);
    { const rect = viewRect(this, this.game.tuning.haze.near, 20), w = this.game.witch; // (the ground round the start, a few tiles a frame: render/slices.ts)
      while (this.ground.fill(this.renderer, rect, w.x, w.z, 6) > 0) await nextFrame(); }
    performance.mark("witch:prep-ground");
    await this.assets.homeArt(); // (the start's own art, drawn by the art workers: play never starts without her, home or the soundsystems)
    performance.mark("witch:prep-home");
    await this.assets.whenIdle(true); // (what the view asked for as needed now; the scenery kits and creatures draw on and fade in: the first-load hunt, 2026-10-20, half the cold load)
    performance.mark("witch:prep-idle");
    this.render(0, false);
    await runSliced(refreshSteps(this), "refresh"); // (refresh(this, true), a slice at a time)
    this.prepared = true;
    await this.compileAll();
    this.askIsland(near);
    this.homeDone = true;
  }

  /** The treehouse tree as the dive's whole-tree shot frames it (rules/arrive.ts TreeExtent; the coordinator, 2026-10-24: the one
   *  measure of it): the great oak's crown, from its lobes, where there is one (render/crown.ts; its middle, its top from the ground
   *  and its width east to west), else the Ent's art at the treehouse once it's come; null till then. */
  treeExtent(): TreeExtent | null {
    const g = this.game, deck = deckOf(g.map, g.tuning);
    if (this.crown && deck) {
      let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity, top = 0;
      for (const l of this.crown.crown.lobes) {
        const p = fromPlan({ x: deck.x, z: deck.z }, l.x, l.z);
        x0 = Math.min(x0, p.x - l.r); x1 = Math.max(x1, p.x + l.r); z0 = Math.min(z0, p.z - l.r); z1 = Math.max(z1, p.z + l.r); top = Math.max(top, l.y + l.r);
      }
      if (Number.isFinite(x0)) return { x: (x0 + x1) / 2, z: (z0 + z1) / 2, height: deck.h + top, width: x1 - x0 };
    }
    const a = this.assets, th = g.map.treehouse;
    return a.home.treehouse ? { x: th.x, z: th.z, height: a.treehouse.base.y * this.mpp, width: (a.treehouse.atlas.frames[0]?.w ?? 0) * this.mpp } : null;
  }

  /** Whether the start's house is made: its art (her, home, the soundsystems, the treehouse), the ground and the forest round it.
   *  Before a sail's dive it may not be yet (prepare's `dive`): made on through it, by buildHome. */
  homeDone = true;

  /** A sail's house made through the dive (prepare's `dive`): the forest round it, its art (drawn by the art workers, not on the
   *  page: the dive's frames go on), the ground round it, a few tiles a frame, and the view's batches made again with it. */
  private async buildHome(): Promise<void> {
    await runSliced(this.warmSteps(), "warm");
    performance.mark("witch:prep-warm");
    while (!this.assets.homeReady) { this.assets.work(4); await nextFrame(); } // (its jobs sent to the workers a little a frame, under the chart too)
    performance.mark("witch:prep-home");
    { const w = this.game.witch, R = this.game.tuning.haze.near + 20, r = { minX: w.x - R, maxX: w.x + R, minZ: w.z - R, maxZ: w.z + R }; // (round her, not the dive's view)
      while (this.ground.fill(this.renderer, r, w.x, w.z, 3) > 0) await nextFrame(); }
    performance.mark("witch:prep-ground");
    await runSliced(refreshSteps(this), "refresh");
    performance.mark("witch:prep-house");
  }

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
    this.loadingMist = new LoadingMist(T, typeReaches(cells, m.treehouse, m.areaSize), m.treehouse, m.extent, A.uAreas, A.uExtent, this.post.scene.depthTexture, this.post.fxSize, A.slots);
    (this.post.fxScene ??= new THREE.Scene()).add(this.loadingMist.mesh);
  }

  /** What the start's first frame would make the first time it's asked for, made ahead in steps (render/slices.ts; Ed's laptop,
   *  2026-10-20): the forest round her (the scenery's rebuild) and round the party's areas (their string lights), and the legends'
   *  carvings (their floors). The same things, made the same way, only sooner (each is kept: the forest's chunks, the carvings). */
  private *warmSteps(): Steps {
    const g = this.game, w = g.witch, far = g.tuning.haze.far + 64;
    yield "forest";
    while (g.forest.prefetch(w.x, w.z, far, 4) > 0) yield;
    for (const [, a] of g.party.areas) { const s = g.map.siteOf(a.cell[0], a.cell[1]); while (g.forest.prefetch(s.x, s.z, g.map.areaSize * 1.3, 4) > 0) yield; }
    yield "carvings";
    for (const c of g.map.legendClearings) { carvingMask(AREA_TYPES[g.map.typeOf(c.cell[0], c.cell[1])].creature); yield; }
  }

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
  private setReadiness(stage: View["readiness"]["stage"], done: number, total: number): void {
    const order = ["compile", "programs", "textures", "draws", "gpu", "ready"], i = order.indexOf(stage), r = this.readiness;
    r.stage = stage; r.done = done; r.total = Math.max(1, total);
    r.share = stage === "ready" ? 1 : Math.min(0.999, (i + Math.min(1, done / r.total)) / (order.length - 1));
  }

  /** Every shader the scene holds compiled, and their programs' logs read, ahead of their first draw (prepare). */
  private async compileAll(): Promise<void> {
    this.setReadiness("compile", 0, 1);
    // Every shader the scene holds compiled now, in the Bedroom, not on the first frame each is drawn (overnight phase 2: ten
    // programs compiled mid-run before, a hitch each: on the first steps, the first rise and the first waves; after, one).
    // In the background where the browser can (KHR_parallel_shader_compile); nothing it draws changes.
    // The hidden too (Ed's playtest, 2026-10-07: stalls of 100 ms and more in play): three compiles only what's visible, so
    // the treetops' crowns, hidden on the ground, and everything not yet showing compiled on its first frame, the driver's
    // wait inside it (getProgramInfoLog, 0.7-2.6 s a frame in the cloud's renderer, 50-200 ms on a real GPU). Everything is
    // shown for the call (its programs are made at once, as it's called) and hidden again before anything is drawn; then
    // play waits for them a few seconds at most, so on a GPU that compiles in parallel they're done in the Bedroom.
    const hidden: THREE.Object3D[] = [];
    const fx = this.post.fxScene; // (the smooth effects layer's own scene, and the post passes' quad: neither in the scene)
    for (const sc of fx ? [this.scene, fx] : [this.scene]) sc.traverse(o => { if (!o.visible) { hidden.push(o); o.visible = true; } });
    // (and the occlusion pyramid's passes, which aren't in the scene: render/hiz.ts, built by the treehouse, where she starts)
    if (!this.hizOff && !this.hiz) this.hiz = new Hiz(this.renderer);
    const compiled = Promise.all([this.renderer.compileAsync(this.scene, this.camera), fx && this.renderer.compileAsync(fx, this.camera), this.post.compile(), this.hiz?.ok && this.hiz.compile(this.renderer)]).catch(() => { /* (drawn as before: compiled on first use) */ });
    for (const o of hidden) o.visible = false;
    performance.mark("witch:prep-compile0");
    // Waited for till every program is ready (three asks the driver without waiting, KHR_parallel_shader_compile, every 10 ms):
    // a cap of 4 s (Ed's laptop, 2026-10-21: reached every time) left the rest compiling, and the program logs read next waited on
    // them, one task, 5 s with the chart frozen. A program the driver never finishes mustn't hold the start for good: 60 s.
    // (the programs linked so far out of all of them, a loading screen's count: three's isReady, KHR_parallel_shader_compile's status)
    const linked = () => { const all = (this.renderer.info.programs ?? []) as unknown as { isReady(): boolean }[]; this.setReadiness("compile", all.filter(p => p.isReady()).length, all.length); };
    linked();
    const counting = setInterval(linked, 50);
    const t0 = performance.now(), capped = await Promise.race([compiled.then(() => false), new Promise<boolean>(r => setTimeout(() => r(true), 60000))]);
    clearInterval(counting);
    if (capped) console.warn(`view: the shaders weren't ready in ${Math.round(performance.now() - t0)} ms; play starts anyway`);
    performance.mark("witch:prep-compiled");
    releaseDisposals(); // (the last night's materials, kept till now: render/retire.ts)
    // three reads a program's link and compile logs on its first draw (onFirstUse), a call that waits on the GPU: 0.1 to 2 s
    // in play the first time she rises, lands or comes near something new. Read them now, at load, for every program.
    const programs = [...(this.renderer.info.programs ?? [])], v = this; // (a program's log read a step at a time: render/slices.ts)
    await runSliced((function* () { let i = 0; for (const p of programs) { v.setReadiness("programs", i++, programs.length); p.getUniforms(); yield; } })(), "programs");
    performance.mark("witch:prep-programs");
    // And every texture the scene's materials hold uploaded now, a texture a step (three uploads each on its first draw: on Ed's
    // laptop, 2026-10-21, most of the 2 s first frame after a sail; the cloud's first frame's 5 to 7 s), so the first frame
    // finds them on the GPU. The hidden too, as above.
    const textures = new Set<THREE.Texture>();
    this.scene.traverse(o => { for (const m of ([] as THREE.Material[]).concat((o as THREE.Mesh).material ?? [])) for (const u of Object.values((m as THREE.ShaderMaterial).uniforms ?? {})) for (const t of ([] as unknown[]).concat(u?.value)) if ((t as THREE.Texture)?.isTexture && !(t as THREE.Texture).isRenderTargetTexture) textures.add(t as THREE.Texture); });
    const R = this.renderer;
    await runSliced((function* () { let i = 0; for (const t of textures) { v.setReadiness("textures", i++, textures.size); if ((t as THREE.Texture & { image?: unknown }).image) R.initTexture(t); yield; } })(), "textures");
    performance.mark("witch:prep-textures");
    this.setReadiness("draws", 0, 1);
    await this.warmDraws();
    performance.mark("witch:prep-draws");
    this.setReadiness("gpu", 0, 1);
    await this.gpuCaughtUp();
    performance.mark("witch:prep-gpu");
    this.setReadiness("ready", 1, 1);
  }

  /** Waited for, without blocking the page, till the GPU has done everything asked of it so far (a fence, polled): the links, the
   *  uploads and the warm draws above are only queued, and the first frame after them waited on the lot, a frozen frame just as play
   *  began (the coordinator, 2026-10-26, Hotel's profile: 2 to 7 s held in some cold starts, at the first draw after the start key;
   *  here the fence took 2.5 to 11 s after ready). So the loading screen (or the chart) stays up for it instead. A GL without fences
   *  (WebGL 1) goes on as before; one that never signals mustn't hold the start for good: 30 s. */
  private async gpuCaughtUp(): Promise<void> {
    const gl = this.renderer.getContext();
    if (!(typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext)) return;
    const fence = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    if (!fence) return;
    gl.flush();
    const t0 = performance.now();
    while (gl.clientWaitSync(fence, 0, 0) === gl.TIMEOUT_EXPIRED && performance.now() - t0 < 30000) await new Promise(r => setTimeout(r, 25));
    gl.deleteSync(fence);
  }

  /** The first frame drawn ahead, a pass a step, its targets a few pixels across (render/post.ts renderSteps): a GL's first draw
   *  of each program and target does the driver's own work then (Ed's laptop, 2026-10-21: 5 s on the first load's first frame
   *  and 2 s after a sail; the cloud's software renderer, 6 s of it in the first post pass), so play's first frame finds it done.
   *  Its last pass goes into a target, not the canvas; the targets are their own size again after. */
  private async warmDraws(): Promise<void> {
    const w = this.width, h = this.height, k = Math.max(w, h) / 16, ww = Math.max(1, Math.round(w / k)), hh = Math.max(1, Math.round(h / k)), v = this;
    this.post.resize(ww, hh, ww, hh);
    await runSliced((function* () {
      v.castMap.render(v.renderer, v.scene, v.game.witch.x, v.game.witch.z, v.castOn);
      yield;
      // The scene's things one at a time, one for each program and way of drawing it (a pipeline the driver makes on its first
      // draw), everything else hidden, the hidden among them too (as compileAll compiles them); then as they were.
      const R = v.renderer, seen = new Set<string>(), one: THREE.Object3D[] = [], was = new Map<THREE.Object3D, boolean>();
      v.scene.traverse(o => {
        was.set(o, o.visible);
        const mats = ([] as THREE.Material[]).concat((o as THREE.Mesh).material ?? []);
        for (const m of mats) {
          const pr = (R.properties.get(m) as { currentProgram?: { id: number } }).currentProgram;
          const key = `${pr?.id ?? m.uuid}|${(o as THREE.InstancedMesh).isInstancedMesh ? 1 : 0}|${m.blending}|${m.transparent}|${m.depthTest}|${m.depthWrite}|${m.side}|${m.stencilWrite}|${m.colorWrite}`;
          if (!seen.has(key)) { seen.add(key); one.push(o); break; }
        }
      });
      const show = (on: THREE.Object3D | null) => { for (const o of was.keys()) o.visible = !(o as THREE.Mesh).isMesh && !(o as THREE.Points).isPoints && !(o as THREE.Line).isLine && !(o as THREE.Sprite).isSprite; if (on) on.visible = true; };
      for (const [i, o] of one.entries()) { v.setReadiness("draws", i, one.length); show(o); R.setRenderTarget(v.post.sceneTarget); R.render(v.scene, v.camera); yield; }
      for (const [o, vis] of was) o.visible = vis;
      yield* v.post.renderSteps(v.scene, v.camera, false);
    })(), "draws");
    this.post.resize(this.width, this.height, this.width, this.height); // (its size now: the window may have changed meanwhile)
    this.renderer.setRenderTarget(null);
  }

  /** The island's own asked for ahead of need (prepare: each island's): its legends' carvings, its area types by `near` (the
   *  nearest her first) and its creatures. */
  private askIsland(near: Map<number, number>): void {
    // Each legend's carving (render/legendCarving.ts: 10-80 ms a kind) made in idle time now, not the first time she comes near one.
    warmCarvings(this.game.map.legendClearings.map(c => AREA_TYPES[this.game.map.typeOf(c.cell[0], c.cell[1])].creature));
    if (this.quick) return; // ?quick=1 (the CI smoke test): only what's needed, as it's needed
    // (the zoo, every island its own type and kind, dozens of them: each island's creatures and sleeping legend with its trees,
    // nearest first, not every type's trees ahead of any creature, or the island she's on waits behind the whole zoo's)
    // (only its islands found: one not found yet is a lake, and the streets are bare, so their cells' types grow nothing; a typical
    // player's zoo is home's ten and a few, not all 64: tools/zoo/perf.cjs)
    if (this.game.map.zoo?.layout) { const m = this.game.map, shown = new Set(m.cells.map(([cx, cy]) => m.typeOf(cx, cy))); for (const [t] of [...near].filter(([t]) => shown.has(t)).sort((a, b) => a[1] - b[1])) { this.assets.prefetchType(t); const sp = AREA_TYPES[t]?.creature; if (sp) { this.assets.creatureArt(sp); this.assets.sleepArt(sp); } } return; }
    for (const [t] of [...near].sort((a, b) => a[1] - b[1])) this.assets.prefetchType(t);
    // The island's own creatures' art ahead (the map's area types' and the night's legends'), not every species' (Ed's log,
    // 2026-10-14: the audio under-ran in bursts through the first ten minutes of every night; the workers were baking all sixty
    // species, 1 to 14 s each, on every core but the page's, with the audio thread starved among them: a wave landing's own art,
    // the woken looks and the party witches, then queued behind them).
    const own = new Set<string>(this.game.map.legendKinds);
    for (const [t] of near) { const sp = AREA_TYPES[t]?.creature; if (sp) own.add(sp); }
    for (const sp of own) this.assets.creatureArt(sp);
  }

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
  private *setGameSteps(game: Game): Steps {
    const t = game.tuning, old = this.island;
    // The last night's: the scenery's rebuild under way, the creatures' caches, the candles; its area types' batches and their
    // shadows, and its soundsystems' (their atlases the art's: freed once, by reseat).
    cancelRefresh(this); resetCreatureCaches(); forgetCandles(this);
    for (const b of this.typeBatches.values()) { this.scene.remove(...b.meshes); b.release(); }
    this.typeBatches.clear();
    for (const [k, b] of this.trunkShadowBatches) if (typeof k === "number") { this.scene.remove(...b.meshes); b.dispose(); this.trunkShadowBatches.delete(k); }
    this.trunkShadowBatches.delete("markers"); // (the old island's runestones': let go with it)
    this.partyView.gen?.reset();
    for (const b of this.appearing.keys()) b.appearU.value = 1; // (a kept batch caught fading in shows whole)
    this.assets.reseat({ seed: game.seed, typeSeed: islandArtSeed(t.map?.world ?? 0, t.map?.island ?? "home"), typeBiome: biomeKey(t.map?.island ?? "home", t.map?.world ?? 0, t.biomeLooks), treehouse: treehouseArtId(game) });
    this.game = game;
    Object.assign(this, nightState(t));
    const M = moodOf(t);
    this.areaMoods = M ? new AreaMoods(M) : null;
    // The new island, off the scene.
    const island = new IslandLayers(this.scene, { game, style: this.style, mpp: this.mpp, maxTexture: this.renderer.capabilities.maxTextureSize, assets: this.assets, deck: deckOf(game.map, t) }, false);
    yield* island.groundSteps(); yield "paths"; yield* island.pathSteps(); yield; island.buildTreehouse(); yield* island.markerSteps(); yield "ley"; island.buildLey(); yield; island.buildDancefloor();
    yield* island.finishSteps();
    const tb = this.style.biome ?? this.assets.typeBiome, tufts = tb !== this.tuftBiome ? yield* GrassView.tufts(tb ? { ...this.style, biome: tb } : this.style, islandTypes(game.map)) : null; // (another biome's: drawn again, a step an area type)
    yield "swap";
    island.minimap.on = old.minimap.on;
    { const cs = t.canopyShadow; island.ground.setCanopyShadow(cs.on ? cs.strength : 0, cs.height, cs.cover, cs.wind); }
    island.ley.scale(this.leyBase);
    // What draws on the ground re-pointed at the new one before the old is let go.
    this.beachView.setGround(island.ground);
    if (tufts) { this.grass.setArt(tufts); this.tuftBiome = tb; }
    this.grass.setMap(game.map, game.forest, (island.ground.mesh.material as THREE.ShaderMaterial).uniforms);
    // The swap: the new island in (its hills the field in use), then the old let go.
    this.island = island;
    island.attach();
    old.dispose();
    // The house's rooms with this island's treehouse's (render/houseRooms.ts: the same rooms on any island, placed by its treehouse).
    const rooms = !!deckOf(game.map, t)?.house?.rooms;
    if (rooms && this.houseRooms) this.houseRooms.reset();
    else if (rooms) { this.houseRooms = new HouseRoomsView(); this.scene.add(...this.houseRooms.meshes); }
    else if (this.houseRooms) { this.scene.remove(...this.houseRooms.meshes); this.houseRooms.dispose(); this.houseRooms = null; }
    if (!game.map.zoo?.layout && this.zooExitTag) { this.zooExitTag.dispose(); this.zooExitTag = null; }
    this.ensureCrown(game);
    // Every other part that keeps something of a night.
    this.strings.setGame(game); this.leashView.setGame(game); this.lasers.setGame(game); this.borders.setGame(game); this.inviteView.setGame(game);
    this.partyObjects.reset(); this.rig?.reset(); this.holograms.reset(); this.glades.reset(); this.wisps?.reset();
    this.clouds.reseed(game.seed); this.lightRings?.reseed(game.map.seed);
    this.fireworks.reset(); this.swoopTrails.reset(); this.spellFx.reset(); this.trail.newNight(); this.buffHud.reset(); this.combatLight.reset(); this.occlusion.reset();
    this.assets.prefetchType(HOME_LOOK); // home's meadow floor (no trees ask for it)
  }

  /** Area types whose art was swapped (tonight's trees for the island's: AssetLibrary.swapTonight, main.ts revealArt): their
   *  batches let go, made again from the new art on the next frame, with no fade (she can't see it happen). */
  retype(types: number[]): void {
    for (const t of types) {
      const b = this.typeBatches.get(t);
      if (b) { this.scene.remove(...b.meshes); b.release(); b.atlas.albedo.dispose(); b.atlas.normal.dispose(); this.typeBatches.delete(t); } // (the island's art let go: tonight's is the type's now)
      const s = this.trunkShadowBatches.get(t);
      if (s) { this.scene.remove(...s.meshes); s.dispose(); this.trunkShadowBatches.delete(t); }
      this.noFade.add(t);
    }
  }

  /** Each area type's trees last listed (performance.now), for letting the zoo's go (keepTypesUnder). */
  private typeUsed = new Map<number, number>();
  /** The zoo (rules/zooMap.ts), dozens of islands each its own type: the area types' tree atlases on the GPU kept under `mb` (the
   *  types listed now, `listed`, always kept), the longest unlisted let go first: their batches and their art (AssetLibrary.forgetType: asked
   *  for again from the art cache if she comes back, fading in as any set does). Flown over every island they came to 887 MB (tools/zoo/perf.cjs,
   *  2026-10-26); a typical zoo's few stay under it and nothing goes. */
  keepTypesUnder(listed: ReadonlySet<number>, mb: number): void {
    const now = performance.now(), bytes = (b: SpriteBatch) => atlasBytes(b.atlas); // (as stored: an indexed plane a byte a pixel, render/atlas.ts)
    for (const t of listed) this.typeUsed.set(t, now);
    let total = 0;
    for (const b of this.typeBatches.values()) total += bytes(b);
    if (total <= mb * 1048576) return;
    const idle = [...this.typeBatches.keys()].filter(t => !listed.has(t)).sort((a, b) => (this.typeUsed.get(a) ?? 0) - (this.typeUsed.get(b) ?? 0));
    for (const t of idle) {
      if (total <= mb * 1048576) break;
      const b = this.typeBatches.get(t)!;
      total -= bytes(b);
      this.scene.remove(...b.meshes); b.release(); this.typeBatches.delete(t);
      const sh = this.trunkShadowBatches.get(t);
      if (sh) { this.scene.remove(...sh.meshes); sh.dispose(); this.trunkShadowBatches.delete(t); } // (its own buffers: the atlas is the type's)
      this.assets.forgetType(t); // (its atlas off the GPU; asked for again, from the art cache, when she comes back)
    }
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
  screenOf(x: number, y: number, z: number, world = false): [number, number] {
    const p = this.v3.set(x, world ? y : y + groundHeight(x, z), z);
    bendPoint(p).project(this.camera);
    return [p.x, p.y];
  }
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
  updateMoon(g: Game): MoonState {
    const m = moonState(g.clock.time + this.moonShift, g.seed, g.tuning), k = m.kind === "red" ? g.tuning.moon.bloodTint : g.tuning.moon.tint, P = [0.92, 0.94, 0.86];
    const r = 1 + (m.rgb[0] / P[0] - 1) * k, gr = 1 + (m.rgb[1] / P[1] - 1) * k, b = 1 + (m.rgb[2] / P[2] - 1) * k, n = 3 / (r + gr + b); // its hue, not its brightness
    LIGHT_UNIFORMS.uMoon.value.set(this.moonBase.x * r * n, this.moonBase.y * gr * n, this.moonBase.z * b * n);
    const U = LIGHT_UNIFORMS.uMoonUp.value;
    U.set(this.moonUpBase.x * r * n, this.moonUpBase.y * gr * n, this.moonUpBase.z * b * n, U.w);
    return m;
  }

  /** The hot springs' steam (render/lakeLooks.ts): a vent every so often over their deep water, the nearest puffing. */
  private updateSteam(g: Game, time: number): void {
    const S = this.steam, w = g.witch;
    if (this.steamFor?.map !== g.map) { const k = lakeLooksOf(g.map); this.steamFor = { map: g.map, vents: k ? steamVents(k, lakeKnobs(g.tuning).steam.spacing) : new Float32Array(0) }; }
    const v = this.steamFor.vents;
    S.begin();
    for (let i = 0; i < v.length; i += 2) S.add(v[i], groundHeight(v[i], v[i + 1]), v[i + 1], 1, w.x, w.z);
    S.end(time);
  }

  /** The smoke (render/smoke.ts): the world's campfires burning now, the party's fires, and the charcoal huts' mounds, nearest first. */
  private updateSmoke(g: Game, time: number): void {
    const S = this.smoke, t = g.tuning, w = g.witch, R = t.smoke.range;
    S.begin();
    for (const f of this.worldFires) S.add(f.x, groundHeight(f.x, f.z), f.z, f.scale, w.x, w.z);
    this.partyObjects.fires(g, time, w.x, w.z, R, (x, z, size) => S.add(x, groundHeight(x, z), z, size, w.x, w.z));
    if (Math.hypot(w.x - this.moundsAt.x, w.z - this.moundsAt.z) > R * 0.25) { // the charcoal burner's mound smoulders by its hut (art/setpieces.js charcoal-hut: the mound to its right, a little nearer)
      this.moundsAt = { x: w.x, z: w.z }; this.mounds = [];
      const k = t.setPieceScale;
      for (const p of g.forest.setPiecesNear(w.x, w.z, R * 1.3)) if (AREA_TYPES[p.type]?.id === "twiggy-forest") this.mounds.push(p.x + 2.3 * k, p.z + 1.0 * k);
    }
    for (let i = 0; i < this.mounds.length; i += 2) S.add(this.mounds[i], groundHeight(this.mounds[i], this.mounds[i + 1]), this.mounds[i + 1], 1.2, w.x, w.z);
    S.end(time);
  }

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
  private swapHomeArt(): void {
    const A = this.assets;
    if (!this.spin) { // (a twirl's in the clothes she had: render/spin.ts)
      if (this.witchBatch.atlas !== A.witch) this.witchBatch.setAtlas(A.witch);
      if (this.bareBatch && this.bareBatch.atlas !== A.witchBare()) this.bareBatch.setAtlas(A.witchBare());
      A.letGo([this.witchBatch.atlas, ...(this.bareBatch ? [this.bareBatch.atlas] : [])]);
    }
    if (this.treehouseBatch.atlas !== A.treehouse.atlas) this.treehouseBatch.setAtlas(A.treehouse.atlas);
    if (this.propBatch.atlas !== A.props) this.propBatch.setAtlas(A.props);
    if (this.soundBatch.atlas !== A.soundsystems) { this.soundBatch.setAtlas(A.soundsystems); this.partyView.atlas = A.soundsystems; }
  }

  /** How much of a thing shows over the bent horizon (culling.ts overBulge): the smoke check reads it. */
  overBulge(x: number, z: number, top: number): number { return overBulge(this, x, z, top); }

  /** The 💌's aim (issue #87): the world direction from the witch to the ground under a point on the page. */
  aimAt(clientX: number, clientY: number): { x: number; z: number } | null {
    const r = this.canvas.getBoundingClientRect(), w = this.game.witch;
    if (!r.width || !r.height) return null;
    this.aimRay.setFromCamera(new THREE.Vector2(((clientX - r.left) / r.width) * 2 - 1, 1 - ((clientY - r.top) / r.height) * 2), this.camera);
    const at = this.aimRay.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), -(groundHeight(w.x, w.z) + 1)), this.v3);
    return at ? { x: at.x - w.x, z: at.z - w.z } : null;
  }
  private aimRay = new THREE.Raycaster();
  /** The drawing's CPU time (ms), eased over the last frames: the work ahead leaves room for it. */
  drawEst = 0;

  /** The legends' clearings nearest her this frame (reused: no garbage a frame). */
  private nearRings: LegendClearing[] = [];
  private ringItems: { x: number; z: number; r: number; edge: number; glow: number }[] = Array.from({ length: 6 }, () => ({ x: 0, z: 0, r: 0, edge: 0, glow: 0 }));
  /** The legends' clearings nearest her, each with its ring's brightening (Ed, 2026-10-06: quest sigils and relics count
   *  only in the circle): up while she stands on the ground inside it, and a flash (dying over a second and a half) when a
   *  sigil or a relic meant for its legend was put down outside it. No garbage a frame. */
  private legendRings(g: Game, time: number): { x: number; z: number; r: number; edge: number; glow: number }[] {
    // (the zoo's plaza, Ed 2026-10-26: "Home appears as a stone plaza with the ent's sigil on it (drawn like the floor of a legend
    // circle)": a floor of its own round the dancefloor, the World Tree carved in, drawn after the legends' nearest five)
    const plaza = null as { x: number; z: number } | null; // (the zoo's plaza draws its own sigil now: render/ground.ts uZooPlaza)
    const w = g.witch, dt = Math.min(0.1, Math.max(0, time - this.lastRingTime)), near = nearestClearings(g.map.legendClearings, w.x, w.z, this.nearRings, plaza ? 5 : 6);
    this.lastRingTime = time;
    for (const e of g.leashEvents) if (e.kind === "outsideCircle") {
      const L = g.creatures[e.id], c = L && g.map.legendClearing(L.cell[0], L.cell[1]);
      if (c) { const s = this.ringGlow.get(c) ?? { k: 0, flash: -9 }; s.flash = time; this.ringGlow.set(c, s); }
    }
    const out = this.ringItems;
    for (let i = 0; i < near.length; i++) {
      const c = near[i], s = this.ringGlow.get(c) ?? { k: 0, flash: -9 };
      const inside = w.mode === "ground" && Math.hypot(w.x - c.x, w.z - c.z) <= c.r ? 1 : 0;
      s.k += (inside - s.k) * Math.min(1, dt * 4);
      if (!this.ringGlow.has(c)) this.ringGlow.set(c, s);
      const f = time - s.flash, flash = f >= 0 && f < 1.5 ? (1 - f / 1.5) * (0.6 + 0.4 * Math.cos(f * 12)) : 0;
      Object.assign(out[i], { x: c.x, z: c.z, r: c.r, edge: c.edge, glow: Math.min(1, Math.max(s.k, flash)) });
    }
    this.ringCount = near.length;
    if (plaza) { Object.assign(out[near.length], { x: plaza.x, z: plaza.z, r: ZOO_CONFIG.plaza ?? 60, edge: g.tuning.legendClearing.edge, glow: 0.7 }); this.ringCount++; } // (lit always: the coordinator, 2026-10-26, "as clear as a legend circle's floor")
    // Their floors (render/ground.ts): each carving its legend's kind; its grooves' glint (the tuning's knob, 0 off) while it sleeps.
    const glint = g.tuning.legendClearing.floor?.glint ?? 0;
    for (let i = 0; i < near.length; i++) {
      const c = near[i], f = this.floorItems[i];
      const A = AREA_TYPES[g.map.typeOf(c.cell[0], c.cell[1])];
      f.species = A.creature; f.look = floorLook(A.id);
      let id = this.ringLegend.get(c);
      if (id === undefined) { id = (g.legendIds ?? []).find(k => { const L = g.creatures[k]; return L && L.cell[0] === c.cell[0] && L.cell[1] === c.cell[1]; }) ?? -1; this.ringLegend.set(c, id); }
      const L = id >= 0 ? g.creatures[id] : undefined;
      f.glint = glint > 0 && L && !L.gone && (L.legendState === "asleep" || L.legendState === "restless") ? glint : 0;
    }
    if (plaza) { const f = this.floorItems[near.length]; f.species = "worldTree"; f.look = FALLBACK_LOOK; f.glint = 4; } // (its grooves glinting, so the World Tree reads)
    return out;
  }
  private lakeSigils: { x: number; z: number; r: number; species: string; d: number }[] = [];
  private floorItems: { species: string; glint: number; look: FloorLook }[] = Array.from({ length: 6 }, () => ({ species: "", glint: 0, look: FALLBACK_LOOK }));

  render(time: number, draw = true): void {
    this.assets.playing = this.game.party.spellAt !== null; // (the night playing: the art ahead of need shares the workers, render/assets.ts dispatch)
    this.ms = {}; this.lap = this.frameStart = performance.now();
    const g = this.game, t = g.tuning, P0 = poseOf(g), F = this.fly;
    // (arriving from the sea chart: the flight's shot, app/arrive.ts)
    const pose = F ? { ...P0, tx: F.tx, ty: F.ty, tz: F.tz, angle: F.angle, distance: F.distance, ...shotCamera(F) } : P0;
    this.prefetchWave();
    // Her clock (rules/slowTime.ts): she and everything of hers (her frames, blinks, trail, 💌s, sigils, the action bar) at full
    // speed, while the world (time) may run slow in a sleeping legend's circle; eased between steps as the world's is.
    const ht = Math.max(0, g.herTime - Math.max(0, g.clock.time - time) / Math.max(1e-3, g.timeScale));
    // The scenery budget follows the real frame rate (only frames that are drawn count).
    if (draw) {
      const now = performance.now();
      if (this.lastReal) this.budget = stepBudget(this.budget, (now - this.lastReal) / 1000, t);
      this.lastReal = now;
    }
    if (this.sceneryFixed !== null) this.budget.radius = Math.min(t.haze.far, Math.max(1, this.sceneryFixed));
    LIGHT_UNIFORMS.uScenery.value.set(this.budget.radius, Math.max(1, t.scenery.fade));
    // In the air, the crowns' reach (render/view/scenery.ts), eased in and out over half a second or so (no far crowns popping as she lands).
    // Through the telescope (rules/telescope.ts), crowns out to the island's far side, and its own, further haze; back as it was after.
    const TL = this.telescope && t.telescope, haze = LIGHT_UNIFORMS.uHazeRange.value;
    if (TL) { this.hazeBeforeTelescope ??= haze.clone(); haze.set(TL.hazeNear, TL.hazeFar); } else if (this.hazeBeforeTelescope) { haze.copy(this.hazeBeforeTelescope); this.hazeBeforeTelescope = null; }
    const canopyTo = TL ? TL.reach : g.witch.mode !== "ground" ? Math.min(t.haze.far, t.scenery.canopyReach ?? 0) : 0;
    this.canopyNow += (canopyTo - this.canopyNow) * (Math.abs(canopyTo - this.canopyNow) < 1 ? 1 : 0.08);
    LIGHT_UNIFORMS.uCanopyReach.value = this.canopyNow;
    const up = placeCamera(this, time, pose);

    this.swapHomeArt();
    setFrameUniforms(this, time, up);
    setReveal(this, time);
    const w = g.witch;
    this.time("uniforms");
    updateSources(this, time);
    this.time("sources");
    // The party: soundsystems rising in partifying areas, and their lights.
    // The party's over (render/partyOver.ts): its lights go out in a ripple from home.
    const over = updatePartyOver(g, partyOverEase(g, this.overDebug), this.over), offAt = (x: number, z: number) => partyOff(over, x, z);
    this.leashView.partyOverEase = over.ease;
    this.fireworks.update(g.waveEvents, time, t, key => { const [cx, cy] = key.split(",").map(Number); return sigilColour(AREA_TYPES[g.map.typeOf(cx, cy)].creature) as number[]; }, at => !!g.win && g.win.lapAt !== undefined && at >= g.win.lapAt); // (the win's, from its victory lap on: the finale's palette; before the soundsystems: a celebrated one's lasers come on as its show starts)
    const party = this.partyView.update(g, time, (x, z, ww, hh) => inView(this, x, z, ww, hh, 4), () => false, this.fireworks.celebrated, offAt);
    if (over.front > 0) { for (const l of party.lights) l.strength *= 1 - offAt(l.x, l.z); party.playing = party.playing.filter(p => offAt(p.x, p.z) < 0.98); party.projectors = party.projectors.filter(p => offAt(p.x, p.z) < 0.98); }
    this.soundBatch.set(party.items);
    this.ground.setLegendRings(this.legendRings(g, time), this.ringCount);
    this.ground.setLegendFloors(this.floorItems, this.ringCount);
    // (the zoo's undiscovered islands, rules/zooMap.ts: the nearest four lakes' sigils, faint on the water)
    if (g.map.zoo?.layout) {
      const L = g.map.zoo.layout, w = g.witch, items = this.lakeSigils;
      items.length = 0;
      for (const I of L.islands) if (!I.found && Math.abs(I.x - w.x) < 500 && Math.abs(I.z - w.z) < 500) items.push({ x: I.x, z: I.z, r: I.most * 0.62, species: I.kind, d: Math.hypot(I.x - w.x, I.z - w.z) });
      items.sort((a, b) => a.d - b.d);
      this.ground.setLakeSigils(items.slice(0, 4));
    }
    this.lasers.update(time, w.x, w.z, this.speakerTops, g.map.dancefloor); // (the dancefloor ring's: the soundsystems project their sigils instead)
    this.holograms.update(party.projectors, time, w.x, w.z);
    {
      // The ley lines: fading from the colour of the area each starts in to that of the area it ends
      // in (Ed, 2026-10-05), the colour partified areas and soundsystems use: its creature's sigil's.
      // (Nothing allocated a frame but on a change: the key's a number, the callbacks are the view's own.)
      this.leyParty = g.party; // (leyLines.advance is the rules' own now: rules/leylines.ts questsMove)
      this.ley.update(leyKey(this.leyParty), this.leyChainNow, this.leyColour, time, canopyShown(w));
      // The party's over (rules/partyOver.ts): the line fades to partyOver.leyFloor of itself, its pulse gone.
      const po = g.partyOver?.ease ?? 0, leyK = this.leyBase * (1 - (1 - t.partyOver.leyFloor) * po);
      if (leyK !== this.leyScaled) { this.leyScaled = leyK; this.ley.scale(leyK); }
      // the wave's pulse along the current link, by the party's clock (as the HUD's pointer); while home boots, none drawn, but the
      // line the boot branches off unlit ahead of where it will set off (as it is once the boot ends: no change as it does)
      const bootPulse = g.party.spellAt !== null && time < g.party.bootUntil;
      this.ley.pulse(g.partyOver ? null : bootPulse ? 0 : shaderPulse(g.party, g.map, time), !bootPulse);
      this.ley.lap(winPulse(g)?.links ?? null, winPulseOut(g)?.links ?? null, winLit(g)); // (the victory lap: its sparklers racing home and on to the route's end from where the wave's pulse was, rules/win.ts)
      // None till the party spell, nor before the boot's pulse reaches where the first link leaves the home ring (Ed, v2001 and
      // 2026-10-07): there it branches off, an extension of the boot's line, out to the first stone as the boot goes on round
      // (leyReveal, by the boot pulse's own progress), then on along the route.
      this.ley.near(w.x, w.z);
      // (the Route-seer hat worn, rules/hatSpells.ts: the whole route, however far the reveal has grown)
      this.ley.grow(leyDrawnTo(g.party, g.map, time, t.leyLines.reveal ?? 3, this.ley.branch(), routeSeen(g))); // (none before the party, the hat's too)
      { // The boot's ring (rules/bootRing.ts): the line round the home ring at reveal x the pulse, the pulse turning the stones; faint after.
        // (Its sparkler runs the whole lap, past the last stone to where it came on to the ring, at the pulse's speed, the boot
        // ending as it gets there, and hands over to the wave's: Ed, 2026-10-07, "The two pulses or tips don't join correctly at
        // the top of the speaker circle"; 2026-10-09, "Pure constant speed", boot included.)
        const B = bootPath(g.map), live = g.party.spellAt !== null && (g.party.bootFrom === undefined || time < g.party.bootUntil);
        this.ley.ring(live ? bootPulseAt(g.party, g.map, time) / B.length : null, bootLineAt(g.party, g.map, time, t.leyLines.reveal ?? 3) / B.length, (g.party.spellAt === null ? 0 : live ? 1 : 0.35) * (1 - (g.partyOver?.ease ?? 0)), this.leyRgb ?? undefined); // (the boot ring fades out too once the party's over)
        this.ley.front(time, (beatTime(g.beat, time) * t.beat.bpm) / 60, 1 - (g.partyOver?.ease ?? 0)); // its front and pulses: pixel sparks, small lights, embers (render/leyHead.ts)
      }
    }
    // The sleeping legends' clearings: their twilight and motes, the nearest few (render/glades.ts).
    { const gdt = Math.min(0.1, Math.max(0, ht - this.gladeTime)); this.gladeTime = ht; // (eased on her clock, so the slowing doesn't slow its own look)
      // (none on the house, its rooms, Terrace and telescope: its own slowing greyed all the view there as outside a circle it isn't
      // in, washing the island out through the telescope; Ed, 2026-10-26: "I think it should not be grey": indoors the slowed time
      // shows only in how things move. A sleeping legend's circle outdoors keeps its grey.)
      this.glades.update(g, w.x, w.z, gdt, w.mode === "ground", undefined, w.perch || this.telescope ? 0 : slowAmount(g.timeScale, slowest(t))); }
    this.wisps?.update(g, w.x, w.z, ht); // (the wild areas' wisps round her, render/wisps.ts)
    this.time("party");
    // The canopy uplight over the nearest partified areas, fading in with each one's transition.
    {
      const U = SPRITE_UNIFORMS, P = t.party, list = partyZones(g.party, g.map).map(([, a]) => ({ a, s: g.map.siteOf(a.cell[0], a.cell[1]) })) // (a legend area lit with its pair)
        .sort((p, q) => Math.hypot(p.s.x - w.x, p.s.z - w.z) - Math.hypot(q.s.x - w.x, q.s.z - w.z)).slice(0, 16);
      list.forEach(({ a, s }, i) => {
        const fade = (a.wave === 0 ? 1 : Math.min(1, Math.max(0, (time - a.at) / Math.max(0.01, P.transition)))) * (1 - offAt(s.x, s.z));
        U.uParty.value[i].set(s.x, s.z, g.map.areaSize * 0.85, fade);
        const c = sigilColour(AREA_TYPES[g.map.typeOf(a.cell[0], a.cell[1])].creature);
        U.uPartyCol.value[i].set(c[0] / 255, c[1] / 255, c[2] / 255);
      });
      U.uPartyCount.value = list.length;
      U.uUplight.value.set(P.uplight.strength, P.uplight.pulse, P.uplight.edge, (beatTime(g.beat, time) * t.beat.bpm / 60) * Math.PI * 2);
    }
    this.strings.update();
    this.borders.update();
    // A point on the treehouse's sprite (its pixels) in the world, standing on its spot.
    this.houseShift = houseShiftOf(this); // (before the Ent and the house are placed: render/view/witch.ts)
    const T = this.assets.treehouse, thf = T.atlas.frames[0], at = placeTreehouse(this, pose.angle, time), U2 = SPRITE_UNIFORMS;
    const onTreehouse = (px: number, py: number) => {
      const r = U2.uRight.value, u = U2.uUp.value, dx = (px - thf.w / 2) * this.mpp, dy = (thf.h - py) * this.mpp;
      return { x: at.x + r.x * dx + u.x * dy, y: at.y + r.y * dx + u.y * dy, z: at.z + r.z * dx + u.z * dy };
    };
    const deck = T.ent ? deckOf(g.map, t) : null;
    if (this.mapTable) { // (its top's middle on the Ent's painted table, in the world's heights)
      const tp = deck && T.ent ? onTreehouse(T.ent.table.x, T.ent.table.y) : null;
      this.mapTable.update(tp && deck ? { x: tp.x, y: tp.y + groundHeight(deck.x, deck.z) + 0.02, z: tp.z } : null, deck ? Math.hypot(w.x - deck.x, w.z - deck.z) : Infinity, canopyShown(w) < 0.05, ht);
    }
    const thLights: ForestLight[] = deck?.house && T.ent // (the house: the clockwork moon over the map, the lantern posts by the decks: the art's own lights, art/ent.js)
      ? T.lights.filter(l => l.kind === "moon" || l.kind === "lantern").slice(0, 3).map(l => { const p = onTreehouse(l.x, l.y); return { x: p.x, y: p.y + groundHeight(deck.x, deck.z), z: p.z, reach: t.treehouse.lightReach, rgb: new THREE.Vector3(l.rgb[0] / 255, l.rgb[1] / 255, l.rgb[2] / 255), strength: t.treehouse.lightStrength * (l.kind === "moon" ? 0.8 : 0.92 + 0.08 * Math.sin(time * 3 + l.x)) }; })
      : deck // (the deck: one warm lantern over it, at the map table)
      ? [{ x: deck.x, y: groundHeight(deck.x, deck.z) + deck.h + 3, z: deck.z, reach: t.treehouse.lightReach, rgb: DECK_LANTERN_RGB, strength: t.treehouse.lightStrength * (0.92 + 0.08 * Math.sin(time * 3)) }]
      : T.lights.filter(l => l.kind === "lantern" || l.kind === "window").slice(0, 2).map(l => ({
        ...onTreehouse(l.x, l.y), reach: t.treehouse.lightReach, rgb: new THREE.Vector3(l.rgb[0] / 255, l.rgb[1] / 255, l.rgb[2] / 255), strength: t.treehouse.lightStrength * (0.92 + 0.08 * Math.sin(time * 3 + l.x)),
      }));
    const markerLights = drawMarkers(this, time);
    const speakerLights = drawSpeakers(this, time, pose.angle);
    this.spellFx.update(g, ht, witchHeight(w, t) + 0.6 + this.rideOff);
    {
      // her trail: behind her broom, as long as she's fast, in the colour of the area under her (its creature's neon, as the
      // ley lines and runestones; home's own lavender)
      const lift = canopyShown(w), A = g.map.areaAt(w.x, w.z), sp = Math.hypot(w.vx, w.vz), top = t.groundSpeed + (t.treetopSpeed - t.groundSpeed) * lift;
      const c = A.look === HOME_LOOK ? this.trailRgb.set(0.8, 0.7, 1) : this.trailRgb.copy(this.markerArt.colour.get(AREA_TYPES[A.type].creature) ?? this.trailRgb.set(0.8, 0.7, 1));
      const dt = this.trailAt < 0 ? 0 : Math.min(0.1, Math.max(0, ht - this.trailAt)); this.trailAt = ht;
      const back = sp > 0.1 ? 0.6 / sp : 0, W0 = g.witches[0], D = W0.dash;
      // (and its length at least the shared cooldown's share: rules/cooldown.ts, Ed 2026-10-15; the ribbon along her blink's line)
      const tw = witchTuning(g, W0), cool = tw.cooldown?.shared ? coolShare(W0.cool, coolRoom(tw, blinkCharges(g, W0))) : 0; // (her broom's parts: rules/broomParts.ts)
      this.trail.update(w.x - w.vx * back, witchHeight(w, t) + 0.25 + this.rideOff, w.z - w.vz * back, sp, top, lift, c, ht, dt, D.at, D, cool);
      // the load she carries (render/load.ts): read once a frame, for the stack, the threads, her lean and her broom
      loadView(g, t.load ?? LOAD_DEFAULT, dt, this.leashView.load);
      const Bp = this.leashView.bristle; Bp.x = w.x - w.vx * back; Bp.y = witchHeight(w, t) + 0.25 + this.rideOff; Bp.z = w.z - w.vz * back;
    }
    this.buffHud.update(g, time);
    // Tufts part round her and the three nearest creatures.
    // (only those within reach made into objects: mapping every creature, a thousand late in a run, every frame was much of the frame's garbage)
    const near: { x: number; z: number; r: number; d: number }[] = [], GR = t.groundCover.radius;
    const cs = g.creatures; // (by index: render is too big for the engine to optimise, and for...of made an object a creature)
    for (let i = 0; i < cs.length; i++) {
      const c = cs[i], dx = c.x - w.x, dz = c.z - w.z;
      if (Math.abs(dx) >= GR || Math.abs(dz) >= GR) continue;
      const d = Math.sqrt(dx * dx + dz * dz);
      if (d < GR) near.push({ x: c.x, z: c.z, r: Math.max(0.8, (this.leashView.tops.get(c.id) ?? 1.6) * 0.75), d }); // parting by its drawn size (#47)
    }
    const parts = [{ x: w.x, z: w.z, r: 1.6 * (1 - canopyShown(w)) }, ...near.sort((a, b) => a.d - b.d).slice(0, 3)];
    // No tufts over a placed sigil's rune (Ed, v233): trampled out to groundCover.sigilClear, or the rune's own size.
    const clear = g.leash.placed.map(p => ({ x: p.x, z: p.z, r: Math.max(t.groundCover.sigilClear, (3 + g.creatures[p.id].level * 0.8) * 0.45) }));
    { const W0 = g.witches[0].hat, H = W0.down; if (H && W0.has) clear.push({ x: H.x + HAT_BESIDE, z: H.z, r: t.groundCover.sigilClear }); for (const q of W0.left) clear.push({ x: q.x + HAT_BESIDE, z: q.z, r: t.groundCover.sigilClear }); } // (her hats where they lie)
    for (let i = 0; i < cs.length; i++) { const c = cs[i]; if (Math.abs(c.x - w.x) < GR && Math.abs(c.z - w.z) < GR && hasRune(c)) clear.push({ x: c.x, z: c.z, r: t.groundCover.sigilClear }); } // (a happy one's rune at its feet)
    for (const r of relicsOut(g)) if ((r.state === "lying" || r.state === "dropped") && Math.abs(r.sx - w.x) < GR && Math.abs(r.sz - w.z) < GR) clear.push({ x: r.sx, z: r.sz, r: Math.max(t.groundCover.sigilClear, 3.4 * 0.45) }); // (and a relic's sigil, south of it)
    { const F = findClear(this); if (F) clear.unshift(F); } // (tonight's find's patch, first: render/view/finds.ts)
    this.time("markers");
    this.grass.update(w.x, w.z, 1 - canopyShown(w), parts, t.suspects.groundCover ? LIGHT_UNIFORMS.uGlowR.value * 1.05 : t.groundCover.radius, clear); // out to the canopy hole's edge
    const partyObjectLights = this.partyObjects.update(g, time, this.camera, (x, z, ww, hh) => inView(this, x, z, ww, hh, 4), this.worldFires, this.lastView);
    this.updateSteam(g, time);
    this.lakeShore.update(g, this.assets, w.x, w.z);
    this.updateSmoke(g, time); // (time is the world's: what moves on its own slows with it, rules/slowTime.ts)
    const floorOff = offAt(g.map.dancefloor.x, g.map.dancefloor.z);
    if (over.front > 0) for (const L of [markerLights, speakerLights, partyObjectLights]) for (const l of L) l.strength *= 1 - offAt(l.x, l.z);
    // (the zoo: no treehouse, dancefloor or speakers, only the Ent's circle on its plaza; Ed, 2026-10-26)
    const noHome = !!g.map.zoo?.layout, discoLight = this.dancefloor.update(time, this.ground, g, floorOff);
    if (noHome) { // (the treehouse's art only as the little one by the plaza, its way out: render/zooExit.ts)
      for (const m of [...(this.speakerBatch?.meshes ?? []), this.dancefloor.ball, this.dancefloor.beam, this.dancefloor.motes]) m.visible = false;
      this.treehouseBatch.set(miniTreehouse(this, pose.angle)); thLights.length = 0; speakerLights.length = 0;
      (this.zooExitTag ??= new ZooExitTag()).update(this);
    }
    const zooF = this.island.zooFences; // (the zoo's railings: clear round her line of sight; the nearest lamps light the street, render/zooFences.ts)
    zooF?.update(w.x, witchHeight(w, t) + this.rideOff + 1, w.z);
    this.island.zooWords?.update(w.x, w.z);
    if (t.bare) setLights(this, [], w.x, w.z); else setLights(this, [...(noHome ? [] : [discoLight]), ...(zooF ? zooF.lights(w.x, w.z, time) : []), ...(zooF && g.map.zoo?.layout && Math.hypot(w.x - g.map.zoo.layout.home.x, w.z - g.map.zoo.layout.home.z) < 160 ? [{ x: g.map.zoo.layout.home.x, y: 7, z: g.map.zoo.layout.home.z, reach: 75, rgb: PLAZA_RGB, strength: 1.0 }] : []), ...party.lights, ...this.fireworks.lights(time), ...thLights, ...markerLights, ...speakerLights, ...partyObjectLights, ...lanternLights(this, time), ...this.lakeShore.lavaLights(g, time, w.x, w.z), ...sigilLights(this, time, witchHeight(w, t) + this.rideOff + t.sigilSpill.stackHeight), ...relicLights(this, time), ...this.forestLights], w.x, w.z);
    SHADOW_TINT.value = t.shadows.tint ?? 0; // (every shadow's colour: render/shadows.ts, trunkShadows.ts)
    { // the trunks' and palms' shadows (render/trunkShadows.ts): on foot (fading out as she rises), from her glow and the nearest lit fires
      const TS = t.shadows.trunks, lift = Math.min(1, Math.max(0, w.lift ?? 0)), on = !!TS && TS.mode !== "off" && lift < 1 && !t.bare, U = TRUNK_SHADOW_UNIFORMS;
      for (const b of this.trunkShadowBatches.values()) b.visible = on;
      this.castOn = on && TS.mode !== "debug" && (t.shadows.cast ?? true);
      if (this.beachView.palmShadows) this.beachView.palmShadows.visible = on;
      if (on) {
        // (the lit campfires, and the soundsystems' and runestones' lights: those tagged with a shadow, Ed 2026-10-13)
        const base = t.lights.campfire.strength, fires = this.shadowLights;
        fires.length = 0;
        for (const l of this.forestLights) if (l.rgb === this.fire) fires.push({ x: l.x, y: l.y, z: l.z, reach: l.reach, rgb: l.rgb, k: Math.min(1, l.strength / (base * 0.8)) });
        // (their shadows reach past their glow, to the trees round their clearings: shadows.trunks.lightReach)
        const LR = TS.lightReach ?? 0;
        if (LR > 0) for (const L of [party.lights, markerLights]) for (const l of L) if (l.shadow && l.shadow.k > 0) fires.push({ x: l.shadow.x, y: l.shadow.y, z: l.shadow.z, reach: Math.max(l.reach, LR), rgb: l.rgb, k: l.shadow.k * (1 - offAt(l.x, l.z)) });
        fires.sort((a, b) => Math.hypot(a.x - w.x, a.z - w.z) - Math.hypot(b.x - w.x, b.z - w.z)); if (fires.length > MAX_FIRES) fires.length = MAX_FIRES;
        fires.forEach((l, i) => { U.uFires.value[i].set(l.x, l.y + groundHeight(l.x, l.z), l.z, l.reach); U.uFireFade.value[i] = l.k; U.uFireRgb.value[i].copy(l.rgb); });
        U.uFireCount.value = fires.length; U.uTrunkHard.value = TS.mode === "debug" ? 2 : TS.mode === "hard" ? 1 : 0; U.uTrunkStrength.value = TS.strength * (1 - lift); U.uTrunkLong.value = TS.long;
        U.uGlowReach.value = TS.glowReach; U.uGlowLift.value = TS.glowHeight; U.uTrunkAcross.value = TS.across; U.uTrunkCore.value = TS.core; U.uTrunkFoot.value = TS.foot ?? 0; U.uTrunkTaper.value = TS.taper ?? 0; U.uTrunkNear.value = TS.near ?? 0; U.uTrunkCover.value = TS.cover ?? 0;
        U.uTintScenery.value = U.uTintTrees.value = SHADOW_TINT.value; U.uCasterLight.value = TS.glowLight ?? 0; U.uSceneryFoot.value = TS.sceneryFoot ?? 0; U.uSceneryTaper.value = TS.sceneryTaper ?? 0;
      }
    }
    this.time("grass+lights");
    LIGHT_UNIFORMS.uTime.value = time; LIGHT_UNIFORMS.uRealTime.value = ht; // (the circle's motes and edge keep her clock)
    this.mist?.follow(pose.tx, pose.tz);
    if (this.loadingMist && draw) { // (on the page's own clock, a frame counting at most a tenth of a second: not the house's slowed time)
      const now = performance.now(); this.mistClock += this.mistLast ? Math.min(0.1, (now - this.mistLast) / 1000) : 0; this.mistLast = now;
      this.loadingMist.update(this.mistClock, ty => this.assets.hasType(ty));
    }
    this.lightRings?.update(this.camera, w.x, witchHeight(w, t) + this.rideOff, w.z, canopyShown(w), time);
    const hatTop = drawWitch(this, time, ht, onTreehouse);
    this.houseRooms?.update(this, onTreehouse, ht);
    if (this.crown && deck) { // (the crown: in the world, or laid over the floors with her indoors: render/crown.ts)
      const W = this.crownWorld, a = ((HOUSE_ROOMS.turn ?? 0) * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a);
      W.o.set(deck.x, groundHeight(deck.x, deck.z) + deck.h, deck.z); W.ex.set(c, 0, -s); W.ez.set(s, 0, c);
      const plan = this.houseRooms?.plan ?? null, here = plan ? toPlan({ x: deck.x, z: deck.z }, w.x, w.z) : null;
      const dt = Number.isFinite(this.crownAt) ? Math.min(0.1, Math.max(0, ht - this.crownAt)) : 0; this.crownAt = ht;
      // (indoors, the forest's hole round her as it would be outdoors, its middle where she's drawn: render/view/witch.ts set uWitch
      // this frame, her house's slide in it; Ed, 2026-10-26: "The witch should have a canopy circle cut around her in the treehouse")
      const cut = t.canopyCutout, hw = SPRITE_UNIFORMS.uWitch.value, CR = t.treehouse.house?.crown;
      const hole = { x: hw.x, y: hw.y, r: 0.5 * cut.screenFraction * (t.suspects.holeCut ? 1 : 0) * this.width, edge: cut.edge * this.width };
      this.crown.update(this.camera, W, plan, here, dt, hole, CR?.cutFade ?? 0, { x: w.x, y: groundHeight(w.x, w.z) + witchHeight(w, t), z: w.z }); // (her: the oak hidden when she's behind it)
      if (this.crownFar) { // (and over the horizon from far off: its picture baked the first frame there is one)
        this.crownFar.bake(this.renderer);
        const at = g.party.spellAt;
        this.crownFar.update(this.camera, W.o, W.ex, W.ez, at === null ? 1e9 : at === undefined ? -1e9 : at, this.crown.indoors);
      }
      // (wholly behind the bend from far off, the real crown and its lights aren't drawn: the landmark stands in for them)
      // (set as it changes only, so tools/bench/crown-cost.cjs can hide its parts)
      const drawn = !this.crownFar?.realHidden;
      if (drawn !== this.crownDrawn) { this.crownDrawn = drawn; for (const m of [...this.crown.meshes, ...(this.strings?.crownMeshes ?? [])]) m.visible = drawn; }
    }
    this.time("witch");
    refresh(this);
    this.time("refresh");
    this.easeAppearing();
    drawCreatures(this, time);
    drawBerries(this, time);
    drawHatArt(this); // (the Harvest hat's sprouts, the Cyclone's whirlwind: render/view/hatArt.ts)
    drawFinds(this); // (tonight's travel trunk: render/view/finds.ts)
    checkPops(this, "moving");
    this.time("creatures");
    this.rulers.update(this.camera, this.canvas.clientWidth || window.innerWidth, this.canvas.clientHeight || window.innerHeight, w.x, w.z);
    // (no cue toward the dancefloor any more: Ed, 2026-10-06, "You can remove the UI icon that points towards the dancefloor")
    this.minimap.update(g.party, w.x, w.z);
    drawPointers(this, time);
    this.time("hud");
    this.leashView.update(ht, this.camera, this.canvas.clientWidth || window.innerWidth, this.canvas.clientHeight || window.innerHeight, hatTop, this.witchBodyY, this.witchFeetY, this.witchFrameH);
    this.time("leash");
    workAhead(this);
    if (this.debugCull) drawGhosts(this, time);
    if (!draw) return;
    this.renderer.info.reset();
    this.post.lift = this.game.witch.lift;
    this.post.tilt = tiltShareShown(this.tiltK); // (as houseTilt gives the overlays)
    if (t.bare) this.hideForBare();
    this.behindHouse(this.game);
    // (the cast-shadow map is the forest's: none while only the house is drawn)
    if (this.post.behind > 0) this.castMap.render(this.renderer, this.scene, this.game.witch.x, this.game.witch.z, this.castOn);
    this.occluders();
    this.post.render(this.scene, this.camera);
    this.occlusion.veil(); // (the smoke over the 💌s, once the frame's smoke is drawn)
    this.time("draw");
    this.drawEst += (Math.min(8, this.ms.draw) - this.drawEst) * 0.1; // (eased; a stalled frame counts for at most 8 ms)
    // Anything set but not drawn (three.js capping a batch's instances) is a bug: count and log it.
    DROPPED = this.propBatch.dropped + this.soundBatch.dropped + (this.speakerBatch?.dropped ?? 0);
    this.typeBatches.forEach(addDropped); this.creatureBatches.forEach(addDropped); // (no list of every batch a frame)
    const dropped = DROPPED;
    if (dropped && !this.stats.dropped) console.warn(`view: ${dropped} sprite instances set but not drawn`);
    this.stats.dropped = dropped;
    this.stats.drawCalls = this.renderer.info.render.calls;
    this.stats.batches = this.typeBatches.size + this.creatureBatches.size;
    this.stats.sceneryRadius = this.budget.radius; this.stats.fps = this.budget.fps;
    this.stats.scenery = this.stats.trees + this.stats.bushes;
    this.stats.gameplay = this.stats.creatures + this.propBatch.count + this.soundBatch.count + (this.partyView.gen?.count ?? 0);
  }
}

