// The tuning file, config/tuning.json, typed. Ed edits the JSON; nothing here holds a number.
import raw from "../../config/tuning.json";

export interface CameraModeTuning { angleIn: number; angleOut: number; distanceIn: number; distanceOut: number }

/** The lighting's spooky grade (render/mood.ts), drawing only. */
export interface Mood {
  /** The ambient (shadow) light's hue (0 to 1) and its brightness, times the tuning's. */
  ambientHue: number; ambient: number;
  /** The moonlight's hue, saturation and brightness (times the tuning's). */
  moonHue: number; moonSat: number; moon: number;
  /** The fog's colour (hue, saturation, brightness 0 to 1) and where it starts and is whole (m from the witch). */
  hazeHue: number; hazeSat: number; haze: number; hazeNear: number; hazeFar: number;
  /** The low ground mist's strength. */
  mist: number;
  /** The witch's glow's hue and saturation. */
  glowHue: number; glowSat: number;
  /** The grade over the finished picture (post.ts): its amount (0 off), the share of colour drained from the dark and middle tones, the brightness above which nothing is graded, and the tint's hue and saturation. */
  grade: number; gradeDesat: number; gradePivot: number; gradeHue: number; gradeSat: number;
  /** The party as the warm light in the wood: the soundsystems' light colours (rgb 0 to 1, one per variant, instead of their crystal colours), their reach and strength (times the tuning's); the party decor's lights, how many an area (instead of partyObjects.lightsPerArea), and their reach and strength (times their own). */
  partyWarm: number[][]; partyReach: number; partyStrength: number; decorLights: number; decorReach: number; decorStrength: number;
  /** Each area type's own fog, grade tint and mist (by area id; "home" for home), over the above; eased across at areaEase a second. */
  /** The characters' moonlight rim (the witch, creatures): its hue, saturation and strength (0 off); and how much of her own glow lights the witch (0: none). */
  rimHue?: number; rimSat?: number; rim?: number; witchGlow?: number;
  /** The moon's fill on upward faces (canopy tops, open ground), a share of the moon, in its own hue and saturation (left out: the moon's). */
  moonUp?: number; moonUpHue?: number; moonUpSat?: number;
  /** The share of the moon's fill every face gets whatever its normal (0: by its normal alone, 1: all alike). */
  moonUpWrap?: number;
  /** With a stylised art style (bold, ref): the rim's strength and her own glow on her, in place of rim and witchGlow. */
  styledRim?: number; styledGlow?: number;
  /** Her pool's light thrown up onto her, added (witchLift; styledLift with a stylised art style). */
  witchLift?: number; styledLift?: number;
  /** How far the party decor's lights go from their neon to the party's amber (partyWarm's first), 0 to 1. */
  decorWarm?: number;
  /** The ley line's colour ("#rrggbb"; left out, each area's own) and its brightness times this. */
  leyRgb?: string; leyBright?: number;
  /** A berry's halo: its size (m) and strength times this (left out: 2.8 m, 1). */
  berryHalo?: number; berryGlow?: number;
  areas?: Record<string, Partial<{ hazeHue: number; hazeSat: number; haze: number; gradeHue: number; gradeSat: number; mist: number }>>; areaEase?: number;
}

/** The sleeping legends' clearings' light (render/glades.ts). */
export interface GladeTuning {
  on: boolean;
  /** The clearing's radius (m) where the map gives none, and how far toward the top of the circle (-z, up the screen) its legend sits, as a share of it. */
  radius: number; top: number;
  /** Only clearings within this (m) of the witch are lit and drawn. */
  reach: number;
  /** The twilight: its hue and saturation, the pool's strength, the edge ring's at full edge, and how fast the edge eases (1/s). */
  hue: number; sat: number; light: number; edge: number; edgeEase: number;
  /** Inside one (Ed): how much the forest's light outside it dims (0 none, 1 all), how much of her glow goes (0 to 1), and over how many seconds both ease in and out. */
  dark: number; glowOff: number; fade: number;
  /** The motes: how many to a clearing, how fast they rise (m/s), how high they go (m), their size (art pixels), colour and brightness. */
  motes: { per: number; rise: number; height: number; size: number; hue: number; sat: number; bright: number };
}

export interface Tuning {
  /** A legend's circle (Ed, 2026-10-06): slow, the world slowed to scale of its speed (eased over ease seconds) while she stands on the ground in the circle of a legend asleep or restless; on false (?slow=0) for none. */
  legendCircle?: { slow: { on?: boolean; scale: number; ease: number } };
  mapAreas: number;
  /** The map's shape (Ed, 2026-10-06: "circular rather than square, with a buffer zone with no runestones around the edge"): circle: the playable areas those within radius areas of home, a buffer ring buffer areas deep past them (forest she can fly over, nothing in it), her flight's edge soft over its last push metres (her outward speed easing to nothing, a drift of drift m/s back in), and the forest going on edge areas past it; square: mapAreas x mapAreas as before (?shape=square). */
  map?: { shape: "circle" | "square"; radius: number; buffer: number; push: number; drift: number; edge?: number; /** the coast's wobble (Ed, 2026-10-06: "slightly irregular"): rules/mapShape.ts makeCoast */ coast?: { amp: number; harmonics: number; detail: number } };
  /** The beach round the circular map (Ed, 2026-10-06: an Easter egg): sand the last width metres inside her flight's edge, the sea from shore metres past it; the hills eased over ease metres to sand metres high at the sand, down to sea at the water. Flying on out over the beach for restAfter seconds she lands and lies down to stargaze. witchChance of runs (every run) have spots[0] to spots[1] spots of witches (witches[0] to [1] each) spread round the beach; landing within meet metres of them and keeping still idleAfter seconds she chats, holds hands, hugs and stargazes with one, turn seconds each. Nothing of it is drawn, heard or stepped unless she's within shown metres of the sand (simRange of the witches). */
  beach?: { on: boolean; width: number; shore: number; /** Its width round the coast (rules/mapShape.ts BeachVary). */ vary?: import("./mapShape").BeachVary; /** Its decorations (rules/beachDecor.ts). */ decor?: import("./beachDecor").BeachDecorKnobs; ease: number; sand: number; sea: number; restAfter: number; shown: number; /** lying down to stargaze, the world bends stargazeCurve times the treetops' curve (stronger: the sky fills more of the screen), eased in over gazeEase seconds */ stargazeCurve?: number; gazeEase?: number; /** a 💌 come down on the sand or the sea rests letterLinger seconds (not invites.linger), fading over the last letterFade, bobbing on the water */ letterLinger?: number; letterFade?: number; /** stargazing with a beach witch: little hearts rising off them both, after `after` seconds, one every every[0] to every[1] seconds, each rising for life seconds */ hearts?: { after: number; every: number[]; life: number }; witchChance: number; /** how many spots of witches round the coast (from, to), spread evenly with a seeded jitter */ spots?: number[]; witches: number[]; meet: number; idleAfter: number; turn: number; simRange: number };
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
  smoke: { on: boolean; rate: number; life: number; rise: number; speed: number; size: number; grow: number; drift: number; opacity: number; warm: number; pixel: boolean; perFire: number; maxFires: number; range: number };
  sky: { on: boolean; stars: number; moon: number;
    /** Real clouds over the forest (render/clouds.ts): how many (about, per screenful of sky), altitude (m over the ground), speed (m/s drift), opacity, partyGlow (their undersides in the party's colours). */
    clouds: { count: number; altitude: number; speed: number; opacity: number; partyGlow: number };
    /** Lightning in them: about every so many seconds, flashes per strike, ground (the faint flash on the forest, 0 none). */
    lightning: { every: number; flashes: number; ground: number } };
  /** The moon (rules/moon.ts; Ed, 2026-10-06): its phases (phasePeriod seconds new to new, starting at phaseStart: 0 new, 0.5 full), its way
   *  across the sky (orbit seconds, from arcStart; between left and right and up from low to high, fractions of the screen), its rare
   *  coloured moons (in windows of colourEvery seconds, a colourChance of one for colourTime, easing over colourFade; colours red, blue,
   *  gold as 0-1 rgb), tint (how much of its colour the moonlight takes, 0-1), and the dancefloor's moon before the first wave (floor). */
  moon: { phasePeriod: number; phaseStart: number; orbit: number; arcStart: number; left: number; right: number; low: number; high: number;
    colourEvery: number; colourChance: number; colourTime: number; colourFade: number; colours: { red: number[]; blue: number[]; gold: number[] }; tint: number; /** The blood moon's own tint (it must read through the night grade's blue-violet pull: the rendering builder, #252). */ bloodTint: number; /** The sky moon's size, times its old one. */ disc: number;
    /** The floor's moon: palette (dusky violet, slate blue, soft silver, 0-255 rgb), size (its radius, a share of the floor's), stars (a share of the
     *  sky around it twinkling), flare (seconds the full moon flares out into the party at the first wave). */
    floor: { palette: number[][]; size: number; stars: number; flare: number } };
  /** Wind sway on leafy things: metres at the top of a crown, gusts' speed (m/s) and size (m), and a share for the treetop view. */
  wind: { on: boolean; strength: number; speed: number; gustScale: number; treetop: number };
  /** Tufts on the ground round the witch, in ground mode: overall density (times each area's), within radius metres, at most cap; one chance every spacing metres, worked out cell metres at a time within budgetMs a frame; sway (share of a tuft's height) and part (how far they part round her). */
  /** Spells (Ed, 2026-10-04): the one equipped this run, and each spell's numbers. speed: her speed times mult for duration seconds, then cooldown seconds to recharge. */
  /** Combat (Stage 4; the attacks are data in config/combat.json): see config/tuning.json's _combat. */
  /** The fight's scale and speed (Ed's motion scale pass): lengths and speeds in a fight times these. */
  fight: { scale: number; speed: number; momentum: number;
    /** Every charge scaled (Ed, 2026-10-06): its run's time and overshoot, its turn rate, its braking; contact: it hurts whoever it touches on the way, once each. */
    charge: { reach: number; turn: number; brake: number; contact: boolean };
    /** Every leap: from how far off (times its `to`), landing through metres past its target; contact: a low pounce hurts whoever it touches in the air. */
    leap: { reach: number; through: number; contact: boolean } };
  /** How attacks feel on screen (render/attackFeel.ts): the wind-up's crouch, the lunge's stretch, a hit's squash and bounce, a knock-back's tumble. */
  attackFx: { windupSquash: number; windupMax: number; lungeStretch: number; squash: number; squashSecs: number; tumbleKnock: number; tumbleHeight: number; tumbleSecs: number; turnFrom: number; turnTo: number; legendFlash: number };
  combat: { aggro: number; witchLose: number; leaveArea: number; engage: number; pursuit: number; pursuitRun: number; fightRun: number; legendRun: number; reaction: number; chaseMult: number; partyChaseMult: number; marchMult: number; fleeMult: number; soundsystemHealth: number; soundsystemRadius: number; homeHealth: number; homeRadius: number; shake: number; /** a retreating wild creature roams again once it's back in its area within this many metres of home */ retreatHome: number; /** seconds a knocked-down wild creature lies stunned before it runs off (Ed, 2026-10-06: 20) */ daze: number };
  /** Parked party animals (at a sigil) guard within radius metres of it (Ed, 2026-10-04). */
  guard: { radius: number };
  /** Creatures noticing the witch on the ground (Ed's playtest): within radius metres resting ones look at her; curious babies come to about curious metres, skittish ones keep skittish off. */
  notice: { radius: number; curious: number; skittish: number };
  /** Wild idlers' naps (rules/creatures.ts NapRules). */
  naps?: { on: boolean; chance: number; length: number[]; wake: number };
  /** The witch's health (Ed, 2026-10-04): hits she takes before she's knocked out; one comes back every repairTime seconds out of the fight. */
  witchHealth: { hits: number; repairTime: number; /** seconds after a hit in which no other blow lands (0: none) */ grace: number };
  /** Knocked out (Ed, 2026-10-04): her stack lets go one sigil every releaseEach seconds (releaseMax caps the whole release, 0 no cap), then she sparkles out and back in at the treehouse over teleport seconds; legendsLoyal keeps leashed legends with her. */
  knockout: { releaseEach: number; releaseMax: number; emptyBeat: number; teleport: number; legendsLoyal: boolean; dropHat: boolean };
  /** The dash, a blink (Ed, 2026-10-05): on the ground, gone and distance metres on at once, not
   *  drawn or hittable for gone seconds, then cooldown seconds; it lands clear of each obstacle by its `clear` metres. */
  dash: { distance: number; gone: number; cooldown: number; buffer: number; toCursor: boolean; aimDead: number; clear: { tree: number; decor: number; sound: number; speaker: number; treehouse: number } };
  spells: { equipped: string; speed: { mult: number; duration: number; cooldown: number } };
  trail: { on: boolean; ground: number; treetops: number; from: number; curve: number; width: number[]; bright: number; fade: number; grow: number; shrink: number; colourEase: number; sparks: boolean };
  /** The party witches' rainbow swoop trails (render/swoopTrails.ts). */
  /** Sigil weight, made visible (render/load.ts). */
  load?: { on: boolean; full: number; stackSag: number; stackLean: number; threadFrom: number; threadBright: number; witchLean: number; broomTilt: number; broomBow: number; sparks: number };
  swoopTrail?: { on: boolean; life: number; width: number; near: number; bright: number; hueSpeed: number; hueSpread: number; liftFade: number; slots: number };
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
    roar: { volume: number };
    power: { volume: number; crackle: number; whine: number; buzz: number; thump: number; tone: number; gap: number; range: number };
    lament: { volume: number; pitch: number; slow: number; every: number; urgent: number; range: number; gap: number; max: number };
    shoes: { volume: number; range: number; max: number };
    pond: { volume: number; lap: number; frogs: number; frogEvery: number; drips: number; dripEvery: number; range: number };
    /** The sea on the beach (Ed, 2026-10-06: "You can hear the sound of the waves"): a wave breaking every `every` seconds or so and the wash between, up within `range` metres of the water. */
    waves?: { volume: number; every: number; wash: number; range: number };
    /** The afterparty's night (Ed, 2026-10-06: "nice environmental music and sounds that match each area"; platform/audio/night.ts): its volume, the bed's (pad and bells), the noise bed's and the night sounds' shares, when it comes in (from `from` of the party-over ease), and the sleeping animals' snores (volume, the gap between them, heard within range metres, at most max at once). */
    night?: { volume: number; bed: number; noise: number; sounds: number; from: number; snore: { volume: number; gap: number; range: number; max: number } };
    picnic: { volume: number; murmur: number; clinks: number; clinkEvery: number; range: number };
    room: { volume: number; hum: number; crackle: number; creak: number; creakEvery: number };
    /** The party spell's scroll (platform/audio/spell.ts): its hum as she nears it, the paper's rustle, the grow's crackle and the burst. */
    spell: { volume: number; hum: number; rustle: number; crackle: number; burst: number };
    land: { volume: number; gap: number };
    stir: { volume: number };
    knock: { volume: number; whoosh: number; twinkle: number; twinkleEvery: number };
    charge: { volume: number; bellow: number; hooves: number; rumble: number; skid: number; trot: number; range: number };
    relic: { volume: number; spot: number; spotTreetop: number; reach: number };
    meadow: { volume: number; breeze: number; bees: number; birds: number; birdEvery: number; fade: number; murmur: number; clinks: number; clinkEvery: number; balloons: number; squeakEvery: number };
    whale: { volume: number; speed: number; depth: number; reverb: number; sleepEvery: number };
  };
  music: { on: boolean; volume: number; nearDist: number; farDist: number; floor: number; muffle: number; /** The most (dB, as a laptop plays it) the music may fall from by a soundsystem to anywhere far off: checked by tools/music-lab/check.cjs. */ audible: number; /** A sleeping legend's clearing on the ground (Ed, 2026-10-06): the muffle (Hz), quiet (its share of the volume), ease (seconds), the layer's level, and the clearing's radius where the map has none. */ circle: { muffle: number; quiet: number; ease: number; level: number; radius: number }; /** The world slowed in a legend's circle (Ed, 2026-10-06: "the music audibly slows down"): the music follows the game's time scale, its notes' pitch dropping with it as a tape slows (the time scale to the power pitch, never under floor of it); on false, the tempo still follows (it must, to keep in step with the waves) but the pitch doesn't drop. */ slow?: { on: boolean; pitch: number; floor: number }; /** The party's over (Ed, 2026-10-06: "the dance music stops"): the music winds down like a tape stopping over the first `stop` of the party-over ease, its pitch falling with it to `floor`, then is silent. */ over?: { stop: number; floor: number }; clear: number; distort: number; src: string };
  /** The home speaker ring's boot-up at the start (Ed, 2026-10-04): seconds before the first wave's countdown begins. */
  boot: { time: number; /** Seconds from her leaving the decks to the first home speaker turning (Ed, 2026-10-06: "about three seconds"); the boot's `time` runs from then. */ firstAfter: number; /** Seconds a home speaker takes to turn from its runestone into the speaker when the boot pulse reaches it. */ transform: number };
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
  /** The share of the glow's reach where it has fallen to dark (Ed, round 11: "it should fall off closer"); 1 out to the reach. */
  glowNear: number;
  /** The glow reaches the canopy hole's edge times this (Ed, v149); off when ?glow= fixes the reach. */
  glowToCutout: number;
  /** Set by ?glow=: use glowReach as it is. */
  glowFixed?: boolean;
  glowHeight: number;
  /** The witch lit by the world's lights (not her own glow): never darker than lightFloor times her unlit look; coloured lights tint her (lightTint) and rim her edge facing them (lightRim). */
  /** The ley lines through the runestones in wave order (render/leylines.ts). */
  glades: GladeTuning;
  leyLines: { on: boolean; /** From the end of home's boot the line grows out from the treehouse along the route at this many links a wave (Ed, 2026-10-06: three times the pulse), so it reaches this stone as the first wave lands, and goes on at that pace. */ reveal?: number; /** The whole route always shows (Ed, 2026-10-06): the faintest a section gets, ahead and behind the last stone reached. */ far: number[]; /** The section just left behind, as bright as the next one ahead times this. */ behindBright: number; advance: string; fade: number; brightness: number; width: number[]; height: number[]; valley: number; flow: number[]; /** The first line's way out (Ed, 2026-10-06): from the treehouse's front round the ring of speakers, avoid metres outside it, never over the dancefloor, then off and looping round to the first objective (rules/departure.ts). */ depart: { avoid: number } };
  witch: { /** Knocked back and staggered by a blow (rules/knock.ts): base metres for any blow, plus scale times the attack's knockback; at least charge metres for a charge or leap; at most max; eased off at ease a second; staggered stunBase plus stunScale a metre past base seconds, at most stunMax, then immune seconds before the next stagger. */ knock: { on: boolean; base: number; scale: number; charge: number; max: number; ease: number; stunBase: number; stunScale: number; stunMax: number; immune: number }; lightFloor: number; lightTint: number; lightRim: number; /** Riding the hills smoothly (render/ride.ts): seconds to settle at full speed, seconds looked ahead, metres kept over the ground. */ heightSmooth: number; heightLookAhead: number; heightClearance: number };
  spriteTilt: number;
  artPixelsPerMetre: number;
  viewMargin: number;
  lightBudget: number;
  lightSources: { spacing: number; campfire: number; magicStone: number; pond: number; wetPond: number };
  haze: { near: number; far: number };
  /** The scenery budget: scenery is drawn out to an adaptive radius round the witch (view.ts). */
  scenery: { adaptive: boolean; fps: number; hysteresis: number; sustain: number; minRadius: number; shrink: number; grow: number; fade: number };
  stringLights: { on: boolean; runsPerArea: number[]; spansPerRun: number[]; coneAngle: number; junctionChance: number; spanMin: number; spanMax: number; spread: number; height: number; sag: number; bulbSpacing: number; palette: string[]; areaNeon: boolean; twinkle: number; chaseSpeed: number };
  party: {
    motes: { perPatch: number; from: number; to: number; speed: number };
    uplight: { strength: number; pulse: number; edge: number }; interval: number; /** seconds a destroyed soundsystem takes off the next wave's countdown (Ed, 2026-10-05) */ lossPenalty: number; startDelay: number; maxPerWave: number; /** areas each wave wakes: one per witch present (1 until multiplayer) */ areasPerWave: number; /** the route picker's planned order: "spiral" (default) or "varied" (?route=) */ route?: string; picker: string; noisy: { wobble: number; lobeSize: number; candidates: number; spreadFromLast: boolean }; transition: number; lightReach: number; lightStrength: number };
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
  canopyCutout: { screenFraction: number; edge: number; /** How much the fade goes by each crown's middle rather than each pixel (1: whole crowns fade; Ed, 2026-10-06: concentric circles). */ whole?: number; /** How far the hole's line wobbles, a share of its edge (Ed, round 14: still sharp). */ wobble?: number; /** How far past its radius the fade reaches, a share of the edge. */ outer?: number };
  shadows: { on: boolean; strength: number; trees: boolean };
  canopyShadow: { on: boolean; strength: number; height: number; cover: number; wind: number };
  mist: { on: boolean; strength: number; height: number; wind: number };
  /** How mist, far haze and canopy dapple are drawn: smooth gradients, or dithered pixel steps. */
  fx: "smooth" | "pixel";
  moonbeams: number;
  partyObjects: { on: boolean; clusters: number[]; loose: number[]; setChance: number; caughtChance: number; hanging: number[]; lightsPerArea: number; lanternReach: number; arch: string; /** Home's meadow, strewn all over (rules/partyDressing.ts homeDressing). */ home: { clusters: number[]; loose: number[]; weights: Record<string, number>; gap: number; reach: number; lights: number }; exclude: string[]; /** The prop generator's party pieces (art/party.js gen-*) in place of the hand-made ones they replace (?props=gen). */ generated: boolean };
  partyWitches: { /** metres round the dancefloor's middle they wander, and how much they keep nearer it (distance roam × u^centreBias) */ roam: number; centreBias: number; /** a swoop over the treetops: how long, how high, and its weight times this while a player is up there */ swoopTime: number; swoopHeight: number; /** each swoop's peak, swoopHeight times a random share between these */ swoopMin: number; swoopMax: number; treetopBoost: number; /** the party is stepped only while a player is within this of the floor (simRangeTreetop over the treetops) */ simRange: number; simRangeTreetop: number; idleAfter: number; idleReach: number; activityMin: number; activityMax: number; weights: Record<string, number>; arriveTime: number; flyFrom: number; flyHeight: number; runSpeed: number; walkSpeed: number; lapSpeed: number; pairRange: number; pairGap: number; limboPass: number; floorShare: number; debugExtra: number };
  speakerLasers: { on: boolean; tilt: number; sweep: number; sweepBeats: number; length: number; opacity: number };
  find: { on: boolean; eyeshine: { range: number; strength: number; blink: number }; lightFloor: number; rim: number; ambient: number; moonHue: number; moonSat: number };
  trunkFade: { metres: number; share: number; dither: boolean; lightFloor: number; rim: number; crownShare: number };
  pathFade: { metres: number; dither: boolean };
  runeMarkers: { awakeStyle: string; laser: { opacity: number; width: number; length: number }; scale: number; beamHeight: number; lightRange: number; dormant: { glow: number; light: number; reach: number; beam: number }; awake: { glow: number[]; light: number; lightBuild: number; reach: number; beam: number; motes: number; moteBuild: number }; flare: { time: number; light: number } };
  walls: { runs: number[]; runLength: number[]; gateChance: number; rings: number[]; ringStones: number[]; ringRadius: number[]; avenueChance: number; loneChance: number; clumps: number[]; clumpSize: number[]; clumpRadius: number };
  grounds: { chance: number; kinds: string[]; radius: Record<string, number> };
  /** Each area's sleeping legend lies in a small circular clearing of its own (Ed, 2026-10-06): radius metres (or its species' own,
   *  sized to the legend), a soft edge ring edge metres wide, the legend lying top of the radius toward its far (north) side. */
  legendClearing: { radius: number; edge: number; top: number; minFromStone: number; floor: { on: boolean; overgrowth: number; slab: number; glint: number }; rim: { spacing: number; chance: number; out: number; spread: number; gap: number }; grove: { reach: number; density: number; tallest: number; scale: number; gap: number; soft: number; jitter: number }; species: Record<string, number> };
  /** Scenes (art/scenes.js): the share of areas that get one (if an unused scene suits them); footprint = farthest piece's authored offset times scale, plus pad metres. */
  scenes: { chance: number; scale: number; pad: number };
  relics: { spacing: number; chance: number; nearRoad: number; minGap: number };
  treeCap: { from: number; keep: number };
  treetop: { boost: number; boostTime: number; boostAngle: number; turnRate: number; turnRateSlow: number; sharpTurnSpeed: number; brakeAt: number; glideTime: number; sharpTurnBleed: number; cameraPull: number };
  /** The creature states' looks (render/looks.ts): enraged ones tinted toward colour by amount (0 none, 1 all). */
  /** The live rig (#79, render/rig/): on by default (?rig=0 off); creatures in the treetops, or drawn smaller than minPx art pixels, keep their baked frames, except the levels in alwaysLevels ("baby", "young", "adult", "legend"), rigged at any size (Ed, 2026-10-05: legends always). */
  rig?: { minPx: number; alwaysLevels: string[]; /** a sleeping legend's drowsy wake (s), an angry one's share of it, its settling back to sleep (s), and how far it sinks on the rig (share of its height) */ wakeSecs?: number; angryWake?: number; settleSecs?: number; sink?: number };
  looks?: { enragedTint: { colour: string; amount: number }; /** the 💢 beside an enraged creature's head: on, and its size (times its level's bubble size) */ anger: { on: boolean; size: number }; /** party animals' twinkle: how many, how often (a second), how big, how bright */ partyGlow: { on: boolean; sparkles: number; rate: number; size: number; strength: number } };
  bubbles: { emojiPixels: number; scale: number; /** a creature's bubble size by level (baby, young, adult, legend) */ levelScale: number[] };
  /** Home's area, settled first: its circle reaches margin metres past the treehouse's footprint; other areas' centres stay gap (areas) beyond it. */
  home: { margin: number; gap: number };
  treehouse: { /** metres from the speaker ring's outer edge to its footprint's nearest edge */ gap: number; angle: number; clear: number; lightReach: number; lightStrength: number };
  decor: { spacing: number; ruins: number; rocks: number; freak: number; minGap: number; clearing: number; pathGap: number; /** A decoration's footprint radius (metres): kept clear of the gameplay (map.reserved). */ footprint: number };
  paths: { rails: number[]; roads: number[]; linkChance: number; deadEndChance: number; pathHalf: number; roadHalf: number; railHalf: number; railBroken: number; streams: number[]; streamHalf: number; landmarkSpacing: number; landmarkChance: number; vergeSpacing: number; pieceGap: number; fingerposts: boolean; treesOnBroken: number; edgeBushes: number; bushBoost: number };
  lights: { campfire: { reach: number; strength: number }; stone: { reach: number; strength: number } };
  glowPower: number;
  /** The lighting's mood (render/mood.ts): spooky (the grade below) or plain (the light as it was). */
  light?: { mood: "spooky" | "plain"; spooky: Mood };
  /** The beat clock (rules/beat.ts): the base tempo; each wave's tempo (from the music style's arc),
   *  eased over rampBars from the block line (blockBars) its music lands on. */
  beat: { bpm: number; tempos?: number[]; rampBars?: number; blockBars?: number };
  /** Berries and evolving (rules/berries.ts): berries per area at the start [min, max], berry bushes
   *  per area, how far a party animal looks for one (m), how long it eats (s), berries to evolve
   *  (babies, young, adults), the berry's colour and glow. */
  berries: { perArea: number[]; bushesPerArea: number; patch: { bushes: number[]; radius: number }; detour: number; seekRadius: number; eatTime: number; /** Berries to evolve (Ed, 2026-10-05): the strength a level gains (by: "power", hp × dps, or "value", √ of it) over per, rounded, at least 1; scale, the legends' buff. */ cost: { by: "power" | "value"; per: number; scale?: number }; colour: string; glow: number };
  sigilProjection: { height: number; opacity: number; beam: number; size: number; /** Leashed and happy creatures' sigils over them from the treetops (Ed's playtest, 2026-10-06): the nearest `max` within `range` metres, `size` times their ground rune, `opacity` (happy ones dimmer by `happy`), fading out over the last `fade` of the range. */ creatures: { range: number; max: number; size: number; opacity: number; happy: number; fade: number } };
  occlusion: { on: boolean; fadeOpacity: number; edge: number; minHeight: number; silhouette: number };
  stack: { offset: number; scale: number; gap: number; stiffness: number; damping: number; trail: number; idleSway: number };
  lasers: { on: boolean; maxCount: number; length: number; spread: number; maxTilt: number; sweep: number; sweepBeats: number; openBars: number; opacity: number; duty: number; blockBars: number; fadeIn: number; fadeOut: number; fadeNear: number; fadeFar: number };
  borders: { on: boolean; width: number; brightness: number; sparkle: number; step: number; /** 0 a gentle breathing, 1 star-like flashes and dropouts */ twinkle: number; /** colour swaps a second */ swapRate: number; /** the share of sparks that swap on the beat */ swapBeat: number };
  /** The 💌 invite (issue #87): rules/invites.ts. on: 💌s instead of the proximity chat. */
  invites: { on: boolean; burst: number; burstGap: number; cooldown: number; range: number; speed: number; /** The lob's rise (m) over the line from her hand down to the ground at the range (drawn only). */ arc?: number; homing: number; homingCone: number; homingRange: number; multiShot: number; spread: number; radius: number; amount: number; hits: number[]; drain: number; /** Her ground speed while firing, times (Ram's Steady takes it away). */ fireSlow?: number; /** A 💌 that met no one rests on the ground this many seconds (drawn only), fading over the last lingerFade; at most lingerMax at once. */ linger: number; lingerFade: number; lingerMax: number; /** Turns a second a 💌 spins in flight, flat like a frisbee (drawn only). */ spin: number };
  invite: { talkRange: number; cancelDistance: number; snubTime: number; talkTime: number[]; turn: number[]; decayRate: number };
  /** pace: party animals following her move this much faster (a legend buff; 1 in the file). */
  leash: { length: number; runSpeed: number; pickRadius: number; spacing: number; pace?: number;
    /** Sigil weight (rules/leashWeight.ts): free allowance, levels' weights, drag, drift, rise, sink, sinkMax, floor, extreme, maxTension. */
    weight: { free: number; levels: number[]; drag: number; drift: number; rise: number; sink: number; sinkMax: number; floor: number; extreme: number; maxTension: number } };
  bond: { rim: boolean; sparks: boolean; thread: boolean; sparkEvery: number; /** The thread's upward bow: metres per metre of length, from threadArcSlack when slack to threadArcTaut at full strain, up to threadArcMax. */ threadArcSlack: number; threadArcTaut: number; threadArcMax: number };
  tone: { black: number; gamma: number; ambient: number; moon: number };
  bloom: { on: boolean; strength: number; threshold: number };
  tiltShift: { on: boolean; where: "before" | "after"; /** Whether the sky over the bend is blurred too (Ed, round 12); false leaves it sharp. */ sky?: boolean; /** The share of the blur the sky takes, so the stars stay perceptible (Ed, 2026-10-06); 1 as the ground. */ skyBlur?: number; strength: number; band: number; centre: number; /** Over the treetops (Ed, v160: stronger there), blended in by lift. */ treetop: { strength: number; band: number } };
  /** Wild creatures (Ed, 2026-10-04): every area starts with `start`; while wild it gains
   *  growth.perWave a wave at a random level by growth.weights (baby, young, adult); new ones
   *  appear beyond the haze's far edge plus growth.hide metres from every witch (rules/growth.ts). */
  population: { start: { babies: number; young: number; adults: number }; growth: { on: boolean; perWave: number; weights: number[]; hide: number } };
  /** Area legends (Ed, 2026-10-04): one an area, asleep till its area's wave, then a mini-boss guarding it. */
  /** A sleeping legend's dream bubble (Ed, 2026-10-05): shown only to a witch on the ground within range metres of it. */
  dreams: { range: number; nightmare: { at: number[]; faces: string[] }; /** a sleeping legend's face while its dream is open: mostly face, now and then one of faces for a turn of every seconds */ sleepy?: { face: string; weight: number; every: number; faces: string[]; fallback: string } };
  /** Which areas have a legend (Ed, 2026-10-06: "only in about half of areas (we can test this ratio)"): share of them, seeded per map and spread out (rules/map.ts chooseLegendCells); the map's, so a change needs a new map. */
  legends: { share: number; /** The party-legend Easter egg (rules/partyLegend.ts): on, 💌s to fill a happy legend's meter, its drain (share a second), how far (m) she can go from it leashed. */ partyEgg: boolean; partyHits: number; partyDrain: number; partyReach: number };
  /** The party's over (rules/partyOver.ts): seconds it eases in over, the ley line's brightness at its end, the creatures' pace home (times their roaming speed). */
  partyOver: { ease: number; leyFloor: number; walk: number };
  wildLegends: { wake: number; sink: number; moss: number; guard: number; heal: number; scale: number; breathe: number; breathEvery: number; aura: number; glow: number };
  creatureSimRadius: number;
  /** The simulation's level of detail (rules/simLod.ts): creatures in full near her and the action, coarse beyond, frozen past creatureSimRadius. */
  simLod: import("./simLod").SimLod;
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
