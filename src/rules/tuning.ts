// The tuning file, config/tuning.json, typed. Ed edits the JSON; nothing here holds a number.
import raw from "../../config/tuning.json";

export interface CameraModeTuning { angleIn: number; angleOut: number; distanceIn: number; distanceOut: number }

export interface Tuning {
  mapAreas: number;
  areaSize: number;
  areaScale: number;
  areaSizeVariance: number;
  borderLayers: number;
  treeDensity: number;
  clearingSize: number;
  clearingFalloff: number;
  /** Random glades in the woods: how much ground they take (0-1) and their size in metres. */
  gladeAmount: number;
  gladeScale: number;
  /** The density field: a patch noise patchScale metres across ranging patchMin to patchMax times an area's density, and a floor of lone trees. */
  density: { patchScale: number; patchMin: number; patchMax: number; lone: number };
  /** Ragged area edges: plants take their look from up to width metres away (noise scale metres, plus a per-plant stray share). */
  areaEdgeBlend: { width: number; scale: number; stray: number };
  /** How neighbouring areas' floor textures meet: a two-octave warp of warp and fine metres, and a dithered band metres wide. */
  groundBlend: { on: boolean; warp: number; fine: number; band: number; dither: boolean };
  /** The ground's fake relief: rises and hollows from noise (scale metres across) tilting the ground's normal by strength, so lights pick out the bumps, and shading hollows darker by shade. */
  ground: { relief: { strength: number; scale: number; shade: number } };
  /** Wind sway on leafy things: metres at the top of a crown, gusts' speed (m/s) and size (m), and a share for the treetop view. */
  wind: { on: boolean; strength: number; speed: number; gustScale: number; treetop: number };
  /** Tufts on the ground round the witch, in ground mode: overall density (times each area's), within radius metres, at most cap; one chance every spacing metres, worked out cell metres at a time within budgetMs a frame; sway (share of a tuft's height) and part (how far they part round her). */
  /** Spells (Ed, 2026-10-04): the one equipped this run, and each spell's numbers. speed: her speed times mult for duration seconds, then cooldown seconds to recharge. */
  spells: { equipped: string; speed: { mult: number; duration: number; cooldown: number } };
  /** The home speaker ring's boot-up at the start (Ed, 2026-10-04): seconds before the first wave's countdown begins. */
  boot: { time: number };
  groundCover: { on: boolean; density: number; radius: number; cap: number; spacing: number; cell: number; budgetMs: number; sway: number; part: number };
  /** Set pieces drawn this much bigger than the art, with a clearing of setPieceClear metres (times the scale) round them. */
  setPieceScale: number;
  setPieceClear: number;
  /** Placement: a set piece's footprint radius (metres, before setPieceScale) and a soundsystem's;
   *  set pieces keep reserveMargin more from soundsystems and the dancefloor, trees
   *  treeMarginFromSoundsystem from a soundsystem's footprint. */
  setPieceFootprint: number;
  soundsystemFootprint: number;
  reserveMargin: number;
  treeMarginFromSoundsystem: number;
  bushDensity: number;
  /** How much bushes gather in clumps with open floor between (0 even, 1 strongly clumped). */
  bushClump: number;
  treeHeight: number;
  crownWidth: number;
  treeSpacingX: number;
  treeSpacingZ: number;
  crownHalfWidth: number;
  crownHeight: number;
  bushSpacing: number;
  groundSpeed: number;
  treetopSpeed: number;
  acceleration: number;
  /** Acceleration on the ground (snappier than the treetops' acceleration). */
  groundAcceleration: number;
  leanAt: number;
  /** The away cone round straight up the screen, degrees: enter under awayEnter, leave over awayLeave. */
  facing: { awayEnter: number; awayLeave: number; /** degrees from straight up or down the screen for her up/down heading sprites, entering and leaving */ headingEnter: number; headingLeave: number };
  riseTime: number;
  descendTime: number;
  groundHeight: number;
  treetopHeight: number;
  camera: { fov: number; ground: CameraModeTuning; treetop: CameraModeTuning; zoomSteps: number; startZoom: number; follow: number; lookAhead: number; lookAheadMax: number; lookAheadEase: number; zoomEase: number; liftEase: number; /** The opening shot: distance (metres) and angle (degrees) close in on her seat, and how many seconds it takes to ease out. */ intro: { distance: number; angle: number; ease: number } };
  pixelSize: number;
  glowReach: number;
  glowFalloff: number;
  /** The glow reaches the canopy hole's edge times this (Ed, v149); off when ?glow= fixes the reach. */
  glowToCutout: number;
  /** Set by ?glow=: use glowReach as it is. */
  glowFixed?: boolean;
  glowHeight: number;
  /** The witch lit by the world's lights (not her own glow): never darker than lightFloor times her unlit look; coloured lights tint her (lightTint) and rim her edge facing them (lightRim). */
  witch: { lightFloor: number; lightTint: number; lightRim: number };
  spriteTilt: number;
  artPixelsPerMetre: number;
  viewMargin: number;
  lightBudget: number;
  lightSources: { spacing: number; campfire: number; magicStone: number; pond: number; wetPond: number };
  haze: { near: number; far: number };
  /** The scenery budget: scenery is drawn out to an adaptive radius round the witch (view.ts). */
  scenery: { adaptive: boolean; fps: number; hysteresis: number; sustain: number; minRadius: number; shrink: number; grow: number; fade: number };
  stringLights: { on: boolean; runsPerArea: number[]; spansPerRun: number[]; coneAngle: number; junctionChance: number; spanMin: number; spanMax: number; spread: number; height: number; sag: number; bulbSpacing: number; palette: string[]; twinkle: number; chaseSpeed: number };
  party: {
    motes: { perPatch: number; from: number; to: number; speed: number };
    uplight: { strength: number; pulse: number; edge: number }; interval: number; startDelay: number; maxPerWave: number; picker: string; noisy: { wobble: number; lobeSize: number; candidates: number; spreadFromLast: boolean }; transition: number; lightReach: number; lightStrength: number };
  dancefloor: {
    motes: { count: number; rise: number; speed: number; column: number };
    radius: number; clearing: number;
    /** The ring of speakers: how many, the first's ring angle (degrees), their distance as a multiple of radius, and each one's footprint radius (metres). */
    speakers: { count: number; start: number; radiusFactor: number; footprint: number };
    /** The tile-lighting engine: partified areas for each level up from 1; the witch's tiles (below witchLift, in her neon), ripples, trail and event times (seconds), and the share of lit tiles shown at level 1. */
    levels: number[];
    tiles: { witchLift: number; witchColour: string; rippleTime: number; trailTime: number; eventTime: number; lowLevelShare: number };
    circleHue: number; circleHue2: number; pulse: number; runeSpeed: number;
    lightReach: number; lightStrength: number;
    discoHeight: number; discoSize: number; spin: number;
    specks: number; speckBrightness: number; speckReach: number;
  };
  canopyCutout: { screenFraction: number; edge: number };
  shadows: { on: boolean; strength: number; trees: boolean };
  canopyShadow: { on: boolean; strength: number; height: number; cover: number; wind: number };
  mist: { on: boolean; strength: number; height: number; wind: number };
  /** How mist, far haze and canopy dapple are drawn: smooth gradients, or dithered pixel steps. */
  fx: "smooth" | "pixel";
  moonbeams: number;
  trunkFade: { metres: number; dither: boolean };
  pathFade: { metres: number; dither: boolean };
  runeMarkers: { awakeStyle: string; laser: { opacity: number; width: number; length: number }; scale: number; beamHeight: number; lightRange: number; dormant: { glow: number; light: number; reach: number; beam: number }; awake: { glow: number[]; light: number; lightBuild: number; reach: number; beam: number; motes: number; moteBuild: number }; flare: { time: number; light: number } };
  walls: { runs: number[]; runLength: number[]; gateChance: number; rings: number[]; ringStones: number[]; ringRadius: number[]; avenueChance: number; loneChance: number; clumps: number[]; clumpSize: number[]; clumpRadius: number };
  grounds: { chance: number; kinds: string[]; radius: Record<string, number> };
  relics: { spacing: number; chance: number; nearRoad: number; minGap: number };
  treeCap: { from: number; keep: number };
  treetop: { boost: number; boostTime: number; boostAngle: number; turnRate: number; turnRateSlow: number; sharpTurnSpeed: number; brakeAt: number; glideTime: number; sharpTurnBleed: number; cameraPull: number };
  bubbles: { emojiPixels: number; scale: number };
  treehouse: { distance: number; angle: number; clear: number; lightReach: number; lightStrength: number };
  decor: { spacing: number; ruins: number; rocks: number; freak: number; minGap: number; clearing: number; pathGap: number; /** A decoration's footprint radius (metres): kept clear of the gameplay (map.reserved). */ footprint: number };
  paths: { rails: number[]; roads: number[]; linkChance: number; deadEndChance: number; pathHalf: number; roadHalf: number; railHalf: number; railBroken: number; streams: number[]; streamHalf: number; landmarkSpacing: number; landmarkChance: number; vergeSpacing: number; pieceGap: number; treesOnBroken: number; edgeBushes: number; bushBoost: number };
  lights: { campfire: { reach: number; strength: number }; stone: { reach: number; strength: number } };
  glowPower: number;
  beat: { bpm: number };
  sigilProjection: { height: number; opacity: number; beam: number; size: number };
  occlusion: { on: boolean; fadeOpacity: number; edge: number; minHeight: number; silhouette: number };
  stack: { offset: number; scale: number; gap: number; stiffness: number; damping: number; trail: number; idleSway: number };
  lasers: { on: boolean; maxCount: number; length: number; spread: number; maxTilt: number; sweep: number; sweepBeats: number; openBars: number; opacity: number; duty: number; blockBars: number; fadeIn: number; fadeOut: number; fadeNear: number; fadeFar: number };
  borders: { on: boolean; width: number; brightness: number; sparkle: number; step: number; /** 0 a gentle breathing, 1 star-like flashes and dropouts */ twinkle: number; /** colour swaps a second */ swapRate: number; /** the share of sparks that swap on the beat */ swapBeat: number };
  invite: { talkRange: number; cancelDistance: number; talkTime: number[]; turn: number[]; decayRate: number };
  leash: { length: number; runSpeed: number; pickRadius: number; spacing: number };
  bond: { rim: boolean; sparks: boolean; thread: boolean; sparkEvery: number; /** The thread's upward bow: metres per metre of length, up to threadArcMax. */ threadArc: number; threadArcMax: number };
  tone: { black: number; gamma: number; ambient: number; moon: number };
  bloom: { on: boolean; strength: number; threshold: number };
  tiltShift: { on: boolean; where: "before" | "after"; strength: number; band: number; centre: number; /** Over the treetops (Ed, v160: stronger there), blended in by lift. */ treetop: { strength: number; band: number } };
  creaturesNear: number;
  creaturesFar: number;
  creatureCurve: number;
  youngShareFar: number;
  adultsFrom: number;
  adultShareFar: number;
  legendChanceFar: number;
  legendNextToHome: boolean;
  legendsFrom: number;
  creatureSimRadius: number;
  creatureSpeed: number;
  setPieceChance: number;
  legendSpeed: number;
  /** Species speeds (Ed, 2026-10-04): the fast few move fastMult times the usual; legends legend times (when leashed and running to catch up). */
  creatureSpeeds: { fast: string[]; fastMult: number; legend: number };
}

export const TUNING: Tuning = raw as Tuning;

/** The tuning file with some values replaced, for tests and experiments. */
export function withTuning(over: Partial<Tuning>): Tuning {
  return { ...TUNING, ...over, camera: { ...TUNING.camera, ...(over.camera ?? {}) } };
}
