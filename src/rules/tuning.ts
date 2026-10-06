// The tuning file, config/tuning.json, typed. Ed edits the JSON; nothing here holds a number.
import raw from "../../config/tuning.json";

export interface CameraModeTuning { angleIn: number; angleOut: number; distanceIn: number; distanceOut: number }

export interface Tuning {
  mapAreas: number;
  areaSize: number;
  areaScale: number;
  /** Each area's fighting arena: mostly open within radius metres of its centre and soundsystem, the woods thickening smoothly over a band band metres wide (both times fight.scale), its edge wobbled by noise (a share of the band); bushes and tufts: the share of the undergrowth and ground cover left in its open middle. */
  arena?: { radius: number; band: number; noise: number; bushes: number; tufts: number; /** how the woods thicken across the band: linear (default: from right past the middle) or smooth (a slow start) */ curve?: "linear" | "smooth" };
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
  /** relief: the fake bumps in the ground's shading; hills: the rolling ground, drawn only (render/height.ts): amplitude (m), scale (m across a swell), octaves. */
  ground: { relief: { strength: number; scale: number; shade: number }; hills: { on: boolean; amplitude: number; scale: number; octaves: number; /** The light reads the hills' slopes this many times steeper (relief shading). */ shade: number } };
  /** The night sky over the bend (treetop mode): stars, the moon, and clouds (count, speed m/s, how much the party lights their undersides). */
  /** ?bare=1 or 2 (not in the file): the terrain on its own (render/view.ts). */
  bare?: number;
  sky: { on: boolean; stars: number; moon: number;
    /** Real clouds over the forest (render/clouds.ts): how many (about, per screenful of sky), altitude (m over the ground), speed (m/s drift), opacity, partyGlow (their undersides in the party's colours). */
    clouds: { count: number; altitude: number; speed: number; opacity: number; partyGlow: number };
    /** Lightning in them: about every so many seconds, flashes per strike, ground (the faint flash on the forest, 0 none). */
    lightning: { every: number; flashes: number; ground: number } };
  /** Wind sway on leafy things: metres at the top of a crown, gusts' speed (m/s) and size (m), and a share for the treetop view. */
  wind: { on: boolean; strength: number; speed: number; gustScale: number; treetop: number };
  /** Tufts on the ground round the witch, in ground mode: overall density (times each area's), within radius metres, at most cap; one chance every spacing metres, worked out cell metres at a time within budgetMs a frame; sway (share of a tuft's height) and part (how far they part round her). */
  /** Spells (Ed, 2026-10-04): the one equipped this run, and each spell's numbers. speed: her speed times mult for duration seconds, then cooldown seconds to recharge. */
  /** Combat (Stage 4; the attacks are data in config/combat.json): see config/tuning.json's _combat. */
  /** The fight's scale and speed (Ed's motion scale pass): lengths and speeds in a fight times these. */
  fight: { scale: number; speed: number; momentum: number };
  combat: { aggro: number; witchLose: number; leaveArea: number; engage: number; pursuit: number; pursuitRun: number; fightRun: number; legendRun: number; reaction: number; chaseMult: number; partyChaseMult: number; marchMult: number; fleeMult: number; soundsystemHealth: number; soundsystemRadius: number; homeHealth: number; homeRadius: number; shake: number };
  /** Parked party animals (at a sigil) guard within radius metres of it (Ed, 2026-10-04). */
  guard: { radius: number };
  /** Creatures noticing the witch on the ground (Ed's playtest): within radius metres resting ones look at her; curious babies come to about curious metres, skittish ones keep skittish off. */
  notice: { radius: number; curious: number; skittish: number };
  /** The witch's health (Ed, 2026-10-04): hits she takes before she's knocked out; one comes back every repairTime seconds out of the fight. */
  witchHealth: { hits: number; repairTime: number };
  /** Knocked out (Ed, 2026-10-04): her stack lets go one sigil every releaseEach seconds (releaseMax caps the whole release, 0 no cap), then she sparkles out and back in at the treehouse over teleport seconds; legendsLoyal keeps leashed legends with her. */
  knockout: { releaseEach: number; releaseMax: number; emptyBeat: number; teleport: number; legendsLoyal: boolean };
  /** The dash, a blink (Ed, 2026-10-05): on the ground, gone and distance metres on at once, not
   *  drawn or hittable for gone seconds, then cooldown seconds; it lands clear of each obstacle by its `clear` metres. */
  dash: { distance: number; gone: number; cooldown: number; buffer: number; clear: { tree: number; decor: number; sound: number; speaker: number; treehouse: number } };
  spells: { equipped: string; speed: { mult: number; duration: number; cooldown: number } };
  /** Forecasting (Ed, 2026-10-04): symbols round each stone (12 = next; the after-next stone fills afterNext[0]..[1] over the countdown; probable ones flicker 1..probableMax); probable: how many probable stones; radius (m), size (m) of each symbol, height above the canopy in treetop mode. */
  forecast: { symbols: number; probable: number; probableMax: number; afterNext: number[]; radius: number; size: number; flare: number };
  /** Music by proximity (Ed, 2026-10-04): full and clear within nearDist metres of a playing soundsystem, down to floor volume and a muffle Hz low-pass by farDist; clear: the cutoff when near; distort: how much a damaged one nearby is heard; volume: the master; src: an audio file to play, or empty for the built-in loop. */
  /** The sound effects (platform/audio/sfx.ts, platform/audio/sfxCues.ts): their volumes and rates. */
  sfx: {
    on: boolean; volume: number; hear: number;
    voice: {
      witch: { volume: number; pitch: number; range: number; pace: number; timbre: number; phraseGap: number };
      animals: { volume: number; pitch: number; maxVoices: number; duck: number; syllables: number[]; gap: number; reply: number };
    };
    hit: { volume: number; gap: number }; fill: { volume: number; octaves: number }; invited: { volume: number };
    enraged: { volume: number; gap: number }; happy: { volume: number; gap: number };
    snore: { volume: number; range: number }; nightmare: { volume: number }; windup: { volume: number; length: number };
    lost: { volume: number };
    ouch: { volume: number; knockdown: number; duck: number; duckTime: number };
    impact: { volume: number; small: number };
    land: { volume: number; gap: number };
    stir: { volume: number };
    knock: { volume: number; whoosh: number; twinkle: number; twinkleEvery: number };
    charge: { volume: number; bellow: number; hooves: number; rumble: number; skid: number; trot: number; range: number };
    relic: { volume: number; spot: number; spotTreetop: number; reach: number };
    meadow: { volume: number; breeze: number; bees: number; birds: number; birdEvery: number; fade: number; murmur: number; clinks: number; clinkEvery: number; balloons: number; squeakEvery: number };
    whale: { volume: number; speed: number; depth: number; reverb: number; sleepEvery: number };
  };
  music: { on: boolean; volume: number; nearDist: number; farDist: number; floor: number; muffle: number; /** The most (dB, as a laptop plays it) the music may fall from by a soundsystem to anywhere far off: checked by tools/music-lab/check.cjs. */ audible: number; clear: number; distort: number; src: string };
  /** The home speaker ring's boot-up at the start (Ed, 2026-10-04): seconds before the first wave's countdown begins. */
  boot: { time: number };
  groundCover: { on: boolean; density: number; radius: number; cap: number; spacing: number; cell: number; budgetMs: number; sway: number; part: number; sigilClear: number };
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
  camera: { fov: number; ground: CameraModeTuning; treetop: CameraModeTuning; zoomSteps: number; startZoom: number; /** The world's bend (render/height.ts): curve per metre ahead of the focus, on the ground and over the treetops (eased in with lift). */ curve: { ground: number; treetop: number; /** Metres past the bent ground's horizon that scenery is still drawn (the distant treetops over it). */ beyond: number }; /** Screen shake when the witch is hit (render/shake.ts). */ shake: { base: number; perMissingHit: number; knockdown: number; decay: number; maxOffsetPx: number; maxRotDeg: number; speed: number }; follow: number; lookAhead: number; lookAheadMax: number; lookAheadEase: number; zoomEase: number; liftEase: number; /** The opening shot: distance (metres) and angle (degrees) close in on her seat, and how many seconds it takes to ease out. */ intro: { distance: number; angle: number; ease: number }; /** The treetop camera zooms out as treetopSpeed rises past base (m/s), its distance times (treetopSpeed / base) to the power power, so the screen holds about as many seconds of flight (Ed, 2026-10-05); 0 off. */ speedZoom?: { base: number; power: number } };
  pixelSize: number;
  glowReach: number;
  glowFalloff: number;
  /** The glow reaches the canopy hole's edge times this (Ed, v149); off when ?glow= fixes the reach. */
  glowToCutout: number;
  /** Set by ?glow=: use glowReach as it is. */
  glowFixed?: boolean;
  glowHeight: number;
  /** The witch lit by the world's lights (not her own glow): never darker than lightFloor times her unlit look; coloured lights tint her (lightTint) and rim her edge facing them (lightRim). */
  /** The ley lines through the runestones in wave order (render/leylines.ts). */
  leyLines: { on: boolean; /** Sections shown on from the last stone reached, and back through the ones reached before it (Ed, 2026-10-05: 3 and 3); the ones behind behindBright times as bright. */ ahead: number; behind: number; behindBright: number; advance: string; fade: number; brightness: number; width: number[]; height: number[]; valley: number; flow: number[]; /** The first line's way out (Ed, 2026-10-05): due south from the treehouse's front straight across the dancefloor, on past metres beyond its ring of speakers (avoid metres outside it), then round to the first objective outside the ring. */ depart: { past: number; avoid: number } };
  witch: { /** Knocked back and staggered by a blow (rules/knock.ts): base metres for any blow, plus scale times the attack's knockback; at least charge metres for a charge or leap; at most max; eased off at ease a second; staggered stunBase plus stunScale a metre past base seconds, at most stunMax, then immune seconds before the next stagger. */ knock: { on: boolean; base: number; scale: number; charge: number; max: number; ease: number; stunBase: number; stunScale: number; stunMax: number; immune: number }; lightFloor: number; lightTint: number; lightRim: number; /** Riding the hills smoothly (render/ride.ts): seconds to settle at full speed, seconds looked ahead, metres kept over the ground. */ heightSmooth: number; heightLookAhead: number; heightClearance: number };
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
    uplight: { strength: number; pulse: number; edge: number }; interval: number; /** seconds a destroyed soundsystem takes off the next wave's countdown (Ed, 2026-10-05) */ lossPenalty: number; startDelay: number; maxPerWave: number; /** areas each wave wakes: one per witch present (1 until multiplayer) */ areasPerWave: number; picker: string; noisy: { wobble: number; lobeSize: number; candidates: number; spreadFromLast: boolean }; transition: number; lightReach: number; lightStrength: number };
  dancefloor: {
    motes: { count: number; rise: number; speed: number; column: number };
    radius: number; clearing: number;
    /** The ring of speakers: how many, the first's ring angle (degrees), their distance as a multiple of radius, and each one's footprint radius (metres). */
    speakers: { count: number; start: number; radiusFactor: number; footprint: number };
    /** The plaza round the floor (Ed, 2026-10-04): flagstones in rings from the rim out to `beyond` metres past the speakers' feet, each course `course` metres deep and its stones about `stone` long; the outer edge breaks up over `ragged` metres, `missing` of the outermost stones gone to grass; `moss` the share of mossy stones. */
    paving: { on: boolean; beyond: number; course: number; stone: number; ragged: number; missing: number; moss: number };
    /** The tile-lighting engine: partified areas for each level up from 1; the witch's tiles (below witchLift, in her neon), ripples, trail and event times (seconds), and the share of lit tiles shown at level 1. */
    levels: number[];
    tiles: { witchLift: number; witchColour: string; rippleTime: number; trailTime: number; eventTime: number; lowLevelShare: number };
    circleHue: number; circleHue2: number; pulse: number; runeSpeed: number;
    lightReach: number; lightStrength: number;
    discoHeight: number; discoSize: number; spin: number;
    specks: number; speckBrightness: number; speckReach: number;
  };
  /** Wave numbers over the rune stones (Ed, 2026-10-04, a design aid): on, a digit's height as a share of the screen's, metres above the stone (or the canopy), and how bright the reached areas' are (0-1). */
  waveNumbers: { on: boolean; size: number; lift: number; spent: number; pinRange: number };
  canopyCutout: { screenFraction: number; edge: number };
  shadows: { on: boolean; strength: number; trees: boolean };
  canopyShadow: { on: boolean; strength: number; height: number; cover: number; wind: number };
  mist: { on: boolean; strength: number; height: number; wind: number };
  /** How mist, far haze and canopy dapple are drawn: smooth gradients, or dithered pixel steps. */
  fx: "smooth" | "pixel";
  moonbeams: number;
  partyObjects: { on: boolean; clusters: number[]; loose: number[]; setChance: number; caughtChance: number; hanging: number[]; lightsPerArea: number; lanternReach: number; arch: string; /** Home's meadow, strewn all over (rules/partyDressing.ts homeDressing). */ home: { clusters: number[]; loose: number[]; weights: Record<string, number>; gap: number; reach: number; lights: number }; exclude: string[] };
  partyWitches: { max: number; idleAfter: number; idleReach: number; activityMin: number; activityMax: number; weights: Record<string, number>; arriveTime: number; flyFrom: number; flyHeight: number; runSpeed: number; walkSpeed: number; lapSpeed: number; pairRange: number; pairGap: number; limboPass: number; floorShare: number; debugExtra: number };
  speakerLasers: { on: boolean; tilt: number; sweep: number; sweepBeats: number; length: number; opacity: number };
  find: { on: boolean; eyeshine: { range: number; strength: number; blink: number }; lightFloor: number; rim: number; ambient: number; moonHue: number; moonSat: number };
  trunkFade: { metres: number; share: number; dither: boolean; lightFloor: number; rim: number; crownShare: number };
  pathFade: { metres: number; dither: boolean };
  runeMarkers: { awakeStyle: string; laser: { opacity: number; width: number; length: number }; scale: number; beamHeight: number; lightRange: number; dormant: { glow: number; light: number; reach: number; beam: number }; awake: { glow: number[]; light: number; lightBuild: number; reach: number; beam: number; motes: number; moteBuild: number }; flare: { time: number; light: number } };
  walls: { runs: number[]; runLength: number[]; gateChance: number; rings: number[]; ringStones: number[]; ringRadius: number[]; avenueChance: number; loneChance: number; clumps: number[]; clumpSize: number[]; clumpRadius: number };
  grounds: { chance: number; kinds: string[]; radius: Record<string, number> };
  /** Scenes (art/scenes.js): the share of areas that get one (if an unused scene suits them); footprint = farthest piece's authored offset times scale, plus pad metres. */
  scenes: { chance: number; scale: number; pad: number };
  relics: { spacing: number; chance: number; nearRoad: number; minGap: number };
  treeCap: { from: number; keep: number };
  treetop: { boost: number; boostTime: number; boostAngle: number; turnRate: number; turnRateSlow: number; sharpTurnSpeed: number; brakeAt: number; glideTime: number; sharpTurnBleed: number; cameraPull: number };
  /** The creature states' looks (render/looks.ts): enraged ones tinted toward colour by amount (0 none, 1 all). */
  /** The live rig (#79, render/rig/): on by default (?rig=0 off); creatures in the treetops, or drawn smaller than minPx art pixels, keep their baked frames, except the levels in alwaysLevels ("baby", "young", "adult", "legend"), rigged at any size (Ed, 2026-10-05: legends always). */
  rig?: { minPx: number; alwaysLevels: string[] };
  looks?: { enragedTint: { colour: string; amount: number }; /** the 💢 beside an enraged creature's head: on, and its size (times its level's bubble size) */ anger: { on: boolean; size: number }; /** party animals' twinkle: how many, how often (a second), how big, how bright */ partyGlow: { on: boolean; sparkles: number; rate: number; size: number; strength: number } };
  bubbles: { emojiPixels: number; scale: number; /** a creature's bubble size by level (baby, young, adult, legend) */ levelScale: number[] };
  /** Home's area, settled first: its circle reaches margin metres past the treehouse's footprint; other areas' centres stay gap (areas) beyond it. */
  home: { margin: number; gap: number };
  treehouse: { /** metres from the speaker ring's outer edge to its footprint's nearest edge */ gap: number; angle: number; clear: number; lightReach: number; lightStrength: number };
  decor: { spacing: number; ruins: number; rocks: number; freak: number; minGap: number; clearing: number; pathGap: number; /** A decoration's footprint radius (metres): kept clear of the gameplay (map.reserved). */ footprint: number };
  paths: { rails: number[]; roads: number[]; linkChance: number; deadEndChance: number; pathHalf: number; roadHalf: number; railHalf: number; railBroken: number; streams: number[]; streamHalf: number; landmarkSpacing: number; landmarkChance: number; vergeSpacing: number; pieceGap: number; treesOnBroken: number; edgeBushes: number; bushBoost: number };
  lights: { campfire: { reach: number; strength: number }; stone: { reach: number; strength: number } };
  glowPower: number;
  /** The beat clock (rules/beat.ts): the base tempo; each wave's tempo (from the music style's arc),
   *  eased over rampBars from the block line (blockBars) its music lands on. */
  beat: { bpm: number; tempos?: number[]; rampBars?: number; blockBars?: number };
  /** Berries and evolving (rules/berries.ts): berries per area at the start [min, max], berry bushes
   *  per area, how far a party animal looks for one (m), how long it eats (s), berries to evolve
   *  (babies, young, adults), the berry's colour and glow. */
  berries: { perArea: number[]; bushesPerArea: number; patch: { bushes: number[]; radius: number }; detour: number; seekRadius: number; eatTime: number; /** Berries to evolve (Ed, 2026-10-05): the strength a level gains (by: "power", hp × dps, or "value", √ of it) over per, rounded, at least 1; scale, the legends' buff. */ cost: { by: "power" | "value"; per: number; scale?: number }; colour: string; glow: number };
  sigilProjection: { height: number; opacity: number; beam: number; size: number };
  occlusion: { on: boolean; fadeOpacity: number; edge: number; minHeight: number; silhouette: number };
  stack: { offset: number; scale: number; gap: number; stiffness: number; damping: number; trail: number; idleSway: number };
  lasers: { on: boolean; maxCount: number; length: number; spread: number; maxTilt: number; sweep: number; sweepBeats: number; openBars: number; opacity: number; duty: number; blockBars: number; fadeIn: number; fadeOut: number; fadeNear: number; fadeFar: number };
  borders: { on: boolean; width: number; brightness: number; sparkle: number; step: number; /** 0 a gentle breathing, 1 star-like flashes and dropouts */ twinkle: number; /** colour swaps a second */ swapRate: number; /** the share of sparks that swap on the beat */ swapBeat: number };
  /** The 💌 invite (issue #87): rules/invites.ts. on: 💌s instead of the proximity chat. */
  invites: { on: boolean; burst: number; burstGap: number; cooldown: number; range: number; speed: number; homing: number; homingCone: number; homingRange: number; multiShot: number; spread: number; radius: number; amount: number; hits: number[]; drain: number; perAnimalHitGap: number; /** Her ground speed while firing, times (Ram's Steady takes it away). */ fireSlow?: number };
  invite: { talkRange: number; cancelDistance: number; snubTime: number; talkTime: number[]; turn: number[]; decayRate: number };
  /** pace: party animals following her move this much faster (a legend buff; 1 in the file). */
  leash: { length: number; runSpeed: number; pickRadius: number; spacing: number; pace?: number };
  bond: { rim: boolean; sparks: boolean; thread: boolean; sparkEvery: number; /** The thread's upward bow: metres per metre of length, up to threadArcMax. */ threadArc: number; threadArcMax: number };
  tone: { black: number; gamma: number; ambient: number; moon: number };
  bloom: { on: boolean; strength: number; threshold: number };
  tiltShift: { on: boolean; where: "before" | "after"; strength: number; band: number; centre: number; /** Over the treetops (Ed, v160: stronger there), blended in by lift. */ treetop: { strength: number; band: number } };
  /** Wild creatures (Ed, 2026-10-04): every area starts with `start`; while wild it gains
   *  growth.perWave a wave at a random level by growth.weights (baby, young, adult); new ones
   *  appear beyond the haze's far edge plus growth.hide metres from every witch (rules/growth.ts). */
  population: { start: { babies: number; young: number; adults: number }; growth: { on: boolean; perWave: number; weights: number[]; hide: number } };
  /** Area legends (Ed, 2026-10-04): one an area, asleep till its area's wave, then a mini-boss guarding it. */
  /** A sleeping legend's dream bubble (Ed, 2026-10-05): shown only to a witch on the ground within range metres of it. */
  dreams: { range: number; nightmare: { at: number[]; faces: string[] } };
  wildLegends: { wake: number; sink: number; moss: number; guard: number; heal: number; scale: number; breathe: number; breathEvery: number; aura: number; glow: number };
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
