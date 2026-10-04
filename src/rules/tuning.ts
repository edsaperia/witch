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
  /** Set pieces drawn this much bigger than the art, with a clearing of setPieceClear metres (times the scale) round them. */
  setPieceScale: number;
  setPieceClear: number;
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
  wallSpacing: number;
  wallDensity: number;
  groundSpeed: number;
  treetopSpeed: number;
  acceleration: number;
  /** Acceleration on the ground (snappier than the treetops' acceleration). */
  groundAcceleration: number;
  leanAt: number;
  /** The away cone round straight up the screen, degrees: enter under awayEnter, leave over awayLeave. */
  facing: { awayEnter: number; awayLeave: number };
  riseTime: number;
  descendTime: number;
  groundHeight: number;
  treetopHeight: number;
  camera: { fov: number; ground: CameraModeTuning; treetop: CameraModeTuning; zoomSteps: number; startZoom: number; follow: number; lookAhead: number; lookAheadMax: number; lookAheadEase: number; zoomEase: number; liftEase: number };
  pixelSize: number;
  glowReach: number;
  glowHeight: number;
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
    uplight: { strength: number; pulse: number; edge: number }; interval: number; startDelay: number; maxPerWave: number; transition: number; lightReach: number; lightStrength: number };
  dancefloor: {
    motes: { count: number; rise: number; speed: number; column: number };
    radius: number; stones: number; clearing: number;
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
  grounds: { chance: number; kinds: string[]; radius: Record<string, number> };
  relics: { spacing: number; chance: number; nearRoad: number };
  treeCap: { from: number; keep: number };
  treetop: { boost: number; boostTime: number; boostAngle: number; turnRate: number; glideTime: number; sharpTurnBleed: number; cameraPull: number };
  bubbles: { emojiPixels: number; scale: number };
  treehouse: { distance: number; angle: number; clear: number; lightReach: number; lightStrength: number };
  decor: { spacing: number; ruins: number; rocks: number; freak: number; clearing: number; pathGap: number };
  paths: { rails: number[]; roads: number[]; linkChance: number; deadEndChance: number; pathHalf: number; roadHalf: number; railHalf: number; railBroken: number; streams: number[]; streamHalf: number; landmarkSpacing: number; landmarkChance: number; vergeSpacing: number; treesOnBroken: number; edgeBushes: number; bushBoost: number };
  lights: { campfire: { reach: number; strength: number }; stone: { reach: number; strength: number } };
  glowPower: number;
  beat: { bpm: number };
  sigilProjection: { height: number; opacity: number; beam: number; size: number };
  occlusion: { on: boolean; fadeOpacity: number; edge: number; minHeight: number; silhouette: number };
  stack: { offset: number; scale: number; gap: number; stiffness: number; damping: number; trail: number; idleSway: number };
  lasers: { on: boolean; maxCount: number; length: number; spread: number; maxTilt: number; sweep: number; sweepBeats: number; openBars: number; opacity: number; duty: number; blockBars: number; fadeIn: number; fadeOut: number; fadeNear: number; fadeFar: number };
  borders: { on: boolean; width: number; brightness: number; sparkle: number; step: number };
  invite: { talkRange: number; cancelDistance: number; talkTime: number[]; turn: number[]; decayRate: number };
  leash: { length: number; runSpeed: number; pickRadius: number; spacing: number };
  bond: { rim: boolean; sparks: boolean; thread: boolean; sparkEvery: number };
  tone: { black: number; gamma: number; ambient: number };
  bloom: { on: boolean; strength: number; threshold: number };
  tiltShift: { on: boolean; where: "before" | "after"; strength: number; band: number; centre: number };
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
}

export const TUNING: Tuning = raw as Tuning;

/** The tuning file with some values replaced, for tests and experiments. */
export function withTuning(over: Partial<Tuning>): Tuning {
  return { ...TUNING, ...over, camera: { ...TUNING.camera, ...(over.camera ?? {}) } };
}
