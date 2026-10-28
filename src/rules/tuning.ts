// The tuning file, config/tuning.json, typed. Ed edits the JSON; nothing here holds a number.
import raw from "../../config/tuning.json";
import type { ByRoute } from "./growth";
import type { SwarmTuning } from "./swarm";

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

/** Will-o'-the-wisps: faint slow lights drifting between the trees of the wild areas (render/wisps.ts, Ed 2026-10-07). */
export interface WispTuning {
  on: boolean;
  /** The ground is split into squares this wide (m); each may hold a wisp, by a seeded chance. */
  cell: number;
  /** Only squares within this (m) of her hold wisps. */
  reach: number;
  /** A wild square's chance of a wisp, far from the party. */
  chance: number;
  /** None within partyNear (m) of a partified area's middle, the full chance from partyFar (m) on. */
  partyNear: number; partyFar: number;
  /** How high a wisp floats (m, its lowest and highest), how far it wanders from its spot (m), and its cycle: seconds to
   *  fade in, linger and fade out. */
  height: number[]; drift: number; period: number;
  /** Its core's and halo's size (art pixels), colour and brightness. */
  size: number; halo: number; hue: number; sat: number; bright: number;
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

/** A kind of place kept clear (Tuning.reveal). */
export interface RevealKind { on: boolean; radius: number; ring?: number; width?: number; height?: number; /** metres round the thing itself never faded */ keep?: number; /** only the scenery within radius metres of it fades (the runestone's: Ed, 2026-10-26) */ bounded?: boolean }

export interface Tuning {
  /** Will-o'-the-wisps in the wild areas (render/wisps.ts, Ed 2026-10-07); off (or absent) for none. */
  wisps?: WispTuning;
  /** A legend's circle (Ed, 2026-10-06): slow, the world slowed to scale of its speed (eased over ease seconds) while she stands on the ground in the circle of a legend asleep or restless; on false (?slow=0) for none. */
  legendCircle?: { slow: { on?: boolean; scale: number; ease: number } };
  mapAreas: number;
  /** The map's shape (Ed, 2026-10-06: "circular rather than square, with a buffer zone with no runestones around the edge"): circle: the playable areas those within radius areas of home, a buffer ring buffer areas deep past them (forest she can fly over, nothing in it), her flight's edge soft over its last push metres (her outward speed easing to nothing, a drift of drift m/s back in), and the forest going on edge areas past it; square: mapAreas x mapAreas as before (?shape=square). */
  map?: { /** "zoo": the zoo (?zoo, rules/zoo.ts) */ shape: "circle" | "square" | "zoo"; radius: number; /** an island of home and this many areas, the nearest home's (Ed, 2026-10-11: the journey's islands); 0, the radius map */ islandAreas?: number; /** an island by roster (Ed, 2026-10-11; rules/rosters.ts): a kind (that kind's island, its own seed and size) or "home" (one area per kind she knows, islandAreas of them); empty, areas of random types */ island?: string; /** the kinds whose islands she's found (the night's legends favour the others) */ found?: string[]; /** the campaign's world seed (rules/rosters.ts: every island's shape; 0 the first world) */ world?: number; /** an island's phase when not by roster (?phase=; 0 home's near-round shape) */ phase?: number; /** each phase's shape (rules/islandGrowth.ts; index 0 home) */ shapes?: import("./islandGrowth").ShapeKnobs[]; buffer: number; push: number; drift: number; edge?: number; /** the coast's wobble (Ed, 2026-10-06: "slightly irregular"): rules/mapShape.ts makeCoast */ coast?: { amp: number; harmonics: number; detail: number }; /** the zoo's islands' real coasts by kind, from the chart's cache (app/zooCoasts.ts; rules/zooMap.ts ZooLayoutKnobs.coasts): never in the tuning file, set by the zoo's page */ coasts?: Record<string, number[]> };
  /** The beach round the circular map (Ed, 2026-10-06: an Easter egg): sand the last width metres inside her flight's edge, the sea from shore metres past it; the hills eased over ease metres to sand metres high at the sand, down to sea at the water. Flying on out over the beach for restAfter seconds she lands and lies down to stargaze. witchChance of runs (every run) have spots[0] to spots[1] spots of witches (witches[0] to [1] each) spread round the beach; landing within meet metres of them and keeping still idleAfter seconds she chats, holds hands, hugs and stargazes with one, turn seconds each. Nothing of it is drawn, heard or stepped unless she's within shown metres of the sand (simRange of the witches). */
  /** Islands other than home (rules/islandShape.ts): their coastline's knobs, as map.coast's. */
  islands: { coast: import("./mapShape").CoastKnobs };
  /** Lakes (Ed, 2026-10-11; rules/lakes.ts LakeKnobs). */
  lakes?: Partial<import("./lakes").LakeKnobs>;
  beach?: { on: boolean; /** How far each of the sand's art pixels is lightened or darkened at random (0.14: ±7%; render/ground.ts). */ grain?: number; width: number; shore: number; /** Its width round the coast (rules/mapShape.ts BeachVary). */ vary?: import("./mapShape").BeachVary; /** Its decorations (rules/beachDecor.ts). */ decor?: import("./beachDecor").BeachDecorKnobs; ease: number; sand: number; sea: number; restAfter: number; shown: number; /** lying down to stargaze, the world bends stargazeCurve times the treetops' curve (stronger: the sky fills more of the screen), eased in over gazeEase seconds */ stargazeCurve?: number; gazeEase?: number; /** the camera by the sea (Ed, 2026-10-06): from approach metres off the water to its edge, on the ground, the camera lowers to `angle` degrees and the world bends `curve` times the treetops' curve; lying down to stargaze, to the angle, distance and look in `bearings` for her bearing round the coast (and stargazeCurve's bend) */ camera?: { approach: number; angle: number; curve: number; /** facing out to sea, the share of the beach's bend kept (the north coast's open water stays in view) */ seaward?: number; /** lying down to stargaze, by her bearing round the coast (12 entries, every 30 degrees from the north, clockwise; rules/camera.ts gazeAt): degrees below the horizon, metres back, metres over her it looks at, metres east it stands and aims (out over the water on the east and west coasts), the share of the stargazing bend kept */ bearings: { angle: number[]; distance: number[]; look: number[]; side?: number[]; bend?: number[] } }; /** a 💌 come down on the sand or the sea rests letterLinger seconds (not invites.linger), fading over the last letterFade, bobbing on the water */ letterLinger?: number; letterFade?: number; /** stargazing with a beach witch: little hearts rising off them both, after `after` seconds, one every every[0] to every[1] seconds, each rising for life seconds */ hearts?: { after: number; every: number[]; life: number }; witchChance: number; /** how many spots of witches round the coast (from, to), spread evenly with a seeded jitter */ spots?: number[]; witches: number[]; meet: number; idleAfter: number; turn: number; simRange: number };
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
  areaEdgeBlend: { width: number; scale: number; stray: number; /** the band's own wander (m) and its noise's size (m) */ warp?: number; warpScale?: number; /** the share of the band the tufts blend over */ tufts?: number };
  /** How neighbouring areas' floor textures meet: a two-octave warp of warp and fine metres, and a dithered band metres wide. */
  groundBlend: { on: boolean; warp: number; fine: number; band: number; dither: boolean };
  /** The ground's fake relief: rises and hollows from noise (scale metres across) tilting the ground's normal by strength, so lights pick out the bumps, and shading hollows darker by shade. */
  /** relief: the fake bumps in the ground's shading; hills: the rolling ground, drawn only (render/height.ts): amplitude (m), scale (m across a swell), octaves. */
  ground: { relief: { strength: number; scale: number; shade: number }; hills: { on: boolean; amplitude: number; scale: number; octaves: number; /** The light reads the hills' slopes this many times steeper (relief shading). */ shade: number };
    /** The lie of the land in the layout (rules/terrain.ts; Ed's idea, relayed 2026-10-07): every runestone on a rise and every legend clearing in a hollow, rise and dip times the hills' amplitude, easing out over reach metres; trees thicker in low ground and sparser on high by up to trees (a share). */
    layout?: { on: boolean; rise: number; dip: number; reach: number; trees: number } };
  /** The night sky over the bend (treetop mode): stars, the moon, and clouds (count, speed m/s, how much the party lights their undersides). */
  /** ?bare=1 or 2 (not in the file): the terrain on its own (render/view.ts). */
  bare?: number;
  smoke: { on: boolean; rate: number; life: number; rise: number; speed: number; size: number; grow: number; drift: number; opacity: number; warm: number; pixel: boolean; perFire: number; maxFires: number; range: number };
  /** The telescope in the crow's nest (rules/telescope.ts, render/view/camera.ts; Ed, 2026-10-21). */
  telescope?: { eye: number; fovWide: number; fovClose: number; aimWide: number; pan: number; tilt: number; tiltMax: number; zoomStep: number; bend: number; reach: number; hazeNear: number; hazeFar: number; thinFrom: number; thin: number; thinGrow: number; wedge: number; moonSpread: number; consHold: number; consLines: number; consBright: number; resolution: number; lowGpuResolution: number; vignette: number };
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
  /** Spells (Ed, 2026-10-11; rules/spells.ts): her hat's and broom's spells this run (none: the plain ones), and each spell's numbers. */
  /** Combat (Stage 4; the attacks are data in config/combat.json): see config/tuning.json's _combat. */
  /** The fight's scale and speed (Ed's motion scale pass): lengths and speeds in a fight times these. */
  fight: { scale: number; speed: number; momentum: number;
    /** Every charge scaled (Ed, 2026-10-06): its run's time and overshoot, its turn rate, its braking; contact: it hurts whoever it touches on the way, once each. */
    charge: { reach: number; turn: number; brake: number; contact: boolean; /** Walking away is no escape (Ed, 2026-10-06): a charge runs at least chase times her ground speed, on till it's caught up with her walking down its lane (0: off). */ chase: number; /** A charge that missed (nothing struck): seconds it stands winded after, an opening for her 💌s (Ed, 2026-10-06: "reward skilful use of blink and accurate invitation aiming"). */ miss: number };
    /** Every leap: from how far off (times its `to`), landing through metres past its target; contact: a low pounce hurts whoever it touches in the air. */
    leap: { reach: number; through: number; contact: boolean; /** Leading her (Ed, 2026-10-06): a leap comes down where she'll be when it lands, as she's going at take-off, this share of it (0: where she was). */ lead: number } };
  /** Creature momentum chasing the witch (Ed, 2026-10-27; rules/momentum.ts): global multipliers (turn, delay, strikeLead) and added chase lead over each class's and species' values; see config/tuning.json's _creatureMomentum. */
  creatureMomentum?: { on: boolean; turn: number; delay: number; chaseLead: number; strikeLead: number; classes: Record<"heavy" | "normal" | "light", import("./momentum").Momentum> };
  /** How attacks feel on screen (render/attackFeel.ts): the wind-up's crouch, the lunge's stretch, a hit's squash and bounce, a knock-back's tumble. */
  attackFx: { windupSquash: number; windupMax: number; lungeStretch: number; squash: number; squashSecs: number; tumbleKnock: number; tumbleHeight: number; tumbleSecs: number; turnFrom: number; turnTo: number; legendFlash: number };
  combat: { /** pack combat (rules/combat/packs.ts; Ed, 2026-10-19): on, packs of config/packs.json's kinds combo, lull and retreat */ packs?: { on: boolean }; /** her posse within this many metres of her defends her first (Ed, 2026-10-09) */ defendRadius?: number; /** a creature after her, hit by one of her posse, turns on it for time seconds, with chance chance (Ed, 2026-10-09) */ taunt?: { time: number; chance: number }; aggro: number; witchLose: number; leaveArea: number; pursuit: number; pursuitRun: number; fightRun: number; legendRun: number; reaction: number; /** a besieger marches at this share of its top (fight) speed, its own siege or marching on (Ed, 2026-10-11) */ marchShare: number; fleeMult: number; soundsystemHealth: number; soundsystemRadius: number; speakerHealth: number; speakerRadius: number; shake: number; /** a retreating wild creature roams again once it's back in its area within this many metres of home */ retreatHome: number; /** seconds a knocked-down wild creature lies stunned before it runs off (Ed, 2026-10-06: 20) */ daze: number };
  /** Parked party animals (at a sigil) guard within radius metres of it (Ed, 2026-10-04). */
  guard: { radius: number };
  /** Creatures noticing the witch on the ground (Ed's playtest): within radius metres resting ones look at her; curious babies come to about curious metres, skittish ones keep skittish off. */
  notice: { radius: number; curious: number; skittish: number };
  /** Dodging matters (Ed, 2026-10-08: "almost all animals are easily evaded simply by walking backwards ... good play should
   *  require effective use of dodge"): against the witch, a: committed strikes (closing while winding up, a lead at release,
   *  a longer lunge, a longer untouchable blink, at most `tokens` winding up on her at once); b: predictive aim (shots, lobs and
   *  charges aimed at release where she'll be, shots living longer, ranged windups shorter); c: packs cutting off her retreat
   *  (rules/combat.ts, rules/movement.ts). ?dodge=a,b,c picks which. */
  dodge?: {
    a: { on: boolean; lead: number; commit: number; chase: number; lunge: number; surge: number; width: number; gone: number; tokens: number; swarm: number; swarmTokens: number; gap: number; heavy: { species: string[]; speed: number; accel: number; home: number } };
    b: { on: boolean; lead: number; lobLead: number; chargeLead: number; life: number; windup: number; range: number; speed: number };
    c: { on: boolean; species: string[]; moving: number; share: number; angle: number; reach: number; ahead: number; sprint: number };
  };
  /** Hostile wild creatures idle round their area's runestone (rules/creatures.ts idlesAtStone): within radius metres of it, clear metres off it. */
  stoneIdle?: { on: boolean; radius: number; clear: number };
  /** Idling and dancing creatures keep off the sigils on the floor (rules/sigilAvoid.ts). */
  sigilAvoid?: { on: boolean; pad: number };
  /** Wild idlers' naps (rules/creatures.ts NapRules). */
  /** The wild watch (Ed, 2026-10-07: a dormant area's animals "stir, evade and hang back, turning to LOOK at her", then attack):
   *  on her first coming down in a wild area, its wild young and adults hold off for `time` seconds, standing and staring at her
   *  (any within hangBack metres backing off), then fight as ever; an area is forgotten `forget` seconds after the last witch was
   *  on the ground in it, so a later visit plays it again (rules/wildWatch.ts). */
  /** The hunt (Ed, 2026-10-07; rules/hunt.ts): a woken wild area's own young and adults go for her while she's in the area, till she's knocked out or they're invited; she leaves, they lose interest as before. */
  hunt?: { on: boolean };
  wildWatch?: { on: boolean; /** a 💌 landing on a wild creature wakes its area at once (rules/inviteWakes.ts) */ inviteWakes?: boolean; /** seconds a 💌 of hers landing on a wild creature provokes it to come out after her, across its edge to combat.leaveArea past it (Ed, 2026-10-13) */ provoked?: number; time: number; forget: number; hangBack: number; /** an area with watchers worth this much in a fight (F) or more is fully dangerous: its red at its fullest */ dangerF?: number; /** the red on a watching creature at full aggro in the most dangerous area (render/view/creatures.ts) */ tint?: number; /** seconds its red takes to ease out when the watch ends (render/aggro.ts aggroFadeOut) */ fade?: number };
  naps?: { on: boolean; chance: number; length: number[]; wake: number; /** A legend circle's baby (Ed, 2026-10-07: "the legend circle baby should spend most of its time napping when in the circle"): its own chance and length, roused only by a witch on the ground within reach metres of its circle's edge. */ circle?: { chance: number; length: number[]; reach: number } };
  /** The soundsystem alarm (rules/alarms.ts, render/alarm.ts). */
  alarms?: { linger: number; fall: number; most: number };
  /** The witch's health (Ed, 2026-10-04): hits she takes before she's knocked out; one comes back every repairTime seconds out of the fight. */
  witchHealth: { hits: number; repairTime: number; /** seconds after a hit in which no other blow lands (0: none) */ grace: number; /** her claw slashes' size relative to her (drawing only; 1 if unset) */ slashScale?: number; /** their glow, berry-like light in the scene (drawing only; 1 if unset, 0 none) */ slashGlow?: number };
  /** Knocked out (Ed, 2026-10-04): her stack lets go one sigil every releaseEach seconds (releaseMax caps the whole release, 0 no cap), then she sparkles out and back in at the treehouse over teleport seconds; legendsLoyal keeps leashed legends with her. */
  knockout: { releaseEach: number; releaseMax: number; emptyBeat: number; teleport: number; legendsLoyal: boolean; dropHat: boolean; /** Her hat's float to the ground (s), the knockout's first phase. */ hatFloat?: number; /** The wait from going down to moving again (rules/knockout.ts respawnWait). */ /** The house (rules/treehouse.ts): back at the magic circle, she rises out of its floor over this many seconds before walking to her decks. */ rise?: number; respawn?: { base: number; step: number; max: number; cooldown: number; minScratch: number }; /** Drawing only (Ed, 2026-10-07): how much the screen dims round her from the knockdown to her sparkle away, her hat floating off (0 none; no hat, no dim). */ dim?: number; /** Seconds of the wait a candle on her desk (rules/knockout.ts candleCount), 1 by default. */ candleStep?: number; /** BPM each knockdown adds to the party's tempo (Ed, 2026-10-07: "the BPM goes up by 1 each time you die"; 2026-10-08: "Knockdowns increase the bpm by 5"; rules/beat.ts knockdownTempo); 0 or absent: none. */ bpmStep?: number; /** The most BPM knockdowns can add in a run (absent: no cap). */ bpmCap?: number; /** Let go at her knockout, each of her carried ones idles within this many metres of where it was dropped (Ed, 2026-10-26; rules/knockout.ts letGoHappy), 6 by default. */ dropRadius?: number };
  /** The dash, a blink (Ed, 2026-10-05): on the ground, gone and distance metres on at once, not
   *  drawn or hittable for gone seconds, then cooldown seconds; it lands clear of each obstacle by its `clear` metres. */
  dash: { distance: number; gone: number; cooldown: number; buffer: number; /** blinks before the cooldown (Ed, 2026-10-08: two), each back one at a time, cooldown seconds apart */ charges?: number; /** seconds a blink keeps the next from going, with a charge left (her two blinks a burst apart) */ chain: number; toCursor: boolean; aimDead: number; clear: { tree: number; decor: number; sound: number; speaker: number; treehouse: number } };
  spells: { hat: string; /** the spell hats she owns, a comma list, or "*" every one (rules/spells.ts SpellState.hats; the page sets it from her save, app/hatSave.ts) */ hats?: string; /** her broom's parts, a comma list of part ids (rules/broomParts.ts; the page sets it from her save, ?parts= for one load) */ parts?: string; speed: { mult: number; duration: number; cooldown: number }; /** the Healing ring: within radius m of it she heals a hit every `every` s */ healing?: { radius: number; every: number }; /** the Helmet: knocked off, it lands drop m beside her */ helmet?: { drop: number }; battering?: { width: number; stun: number }; leyjump?: { cooldown: number }; pound?: { cooldown: number; radius: number; push: number; stun: number }; stealth?: { reveal: number; range: number }; harvest?: { berries: number; radius: number; every: number }; dowsing?: { time: number }; sentry?: { range: number; every: number }; slingshot?: { catch: number; fire: number; hold: number; radius: number; max: number }; gathering?: { range: number }; bramble?: { range: number }; mine?: { range: number; stun: number; every: number }; lullaby?: { range: number; time: number; every: number }; cyclone?: { radius: number; time: number; every: number; spin: number; lift: number; fling: number; flingTime: number; stun: number }; nursing?: { range: number; rate: number } };
  trail: { on: boolean; ground: number; treetops: number; from: number; curve: number; width: number[]; bright: number; fade: number; grow: number; shrink: number; colourEase: number; sparks: boolean; /** One trail, one cooldown (Ed, 2026-10-15): at least cooldown metres times the shared cooldown counter's share in use; bySpeed off, only that. */ cooldown?: number; bySpeed?: boolean };
  /** The party witches' rainbow swoop trails (render/swoopTrails.ts). */
  /** Sigil weight, made visible (render/load.ts). */
  load?: { on: boolean; full: number; stackSag: number; stackLean: number; threadFrom: number; threadBright: number; witchLean: number; broomTilt: number; broomBow: number; sparks: number };
  swoopTrail?: { on: boolean; life: number; width: number; near: number; bright: number; hueSpeed: number; hueSpread: number; liftFade: number; slots: number };
  /** Music by proximity (Ed, 2026-10-04): full and clear within nearDist metres of a playing soundsystem, down to floor volume and a muffle Hz low-pass by farDist; clear: the cutoff when near; distort: how much a damaged one nearby is heard; volume: the master; src: an audio file to play, or empty for the built-in loop. */
  /** The sound effects (platform/audio/sfx.ts, platform/audio/sfxCues.ts): their volumes and rates. */
  sfx: {
    on: boolean; volume: number; hear: number;
    /** The most one-shot sounds at once (0: no limit); the least needed over it aren't played (platform/audio/sfxKit.ts voice). */
    budget?: { voices: number };
    voice: {
      witch: { volume: number; pitch: number; range: number; pace: number; timbre: number; phraseGap: number };
      animals: { volume: number; pitch: number; maxVoices: number; duck: number; syllables: number[]; gap: number; reply: number; /** a voice gives way only to one this much nearer (prio, 0 to 1.5) */ swapBy?: number; /** and at most one gives way every swapGap seconds */ swapGap?: number };
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
    /** Sailing between islands in place (app/sail.ts; places.ts Sailing): the sea's hush and waves and a soft wind while the next
     *  island is made, at volume, the sea's and the wind's shares, fading in and out over about fade seconds; and the old night's
     *  music fading out over fade seconds as it comes in. */
    sail?: { volume: number; sea: number; wind: number; fade: number };
    /** The afterparty's night (Ed, 2026-10-06: "nice environmental music and sounds that match each area"; platform/audio/night.ts): its volume, the bed's (pad and bells), the noise bed's and the night sounds' shares, when it comes in (from `from` of the party-over ease), and the sleeping animals' snores (volume, the gap between them, heard within range metres, at most max at once). */
    night?: { volume: number; bed: number; noise: number; sounds: number; from: number; snore: { volume: number; gap: number; range: number; max: number } };
    ambience?: { volume: number; bed: number; noise: number; sounds: number; quiet: number };
    picnic: { volume: number; murmur: number; clinks: number; clinkEvery: number; range: number };
    /** By the ley line's pulse, its tip a burning sparkler (#491): its fizz. */
    /** The wild watch's warning (aggro.ts, on rules/wildWatch.ts aggroOf). */
    aggro?: { volume: number; swell: number; riser: number; hit: number; fall: number };
    sparkler?: { volume: number; hiss: number; pops: number; rate: number; fork: number; range: number };
    /** Fireworks over a soundsystem when a wave reaches an area she'd cleared (waveCelebrate). */
    fireworks?: { volume: number; whoosh: number; boom: number; echo: number; crackle: number; cheer: number; range: number; cheerRange: number; speed: number };
    room: { volume: number; hum: number; crackle: number; creak: number; creakEvery: number; decks: number };
    seaLife: { volume: number; splash: number; groan: number; pour: number; range: number };
    sadTrumpet: { volume: number; duck: number; bare: number; rewind: number; cutAfter: number };
    deck: { volume: number; scratch: number; hiss: number; stroke: number; hype: number; needle: number; /** The record scratched as she goes down: its level, times a stroke's (Ed, 2026-10-09). */ knock?: number; /** Her needle and scratching on the new record in her wait after a knockdown, the music silent: times her strokes' level. */ respawn?: number };
    /** The party spell's scroll (platform/audio/spell.ts): its hum as she nears it, the paper's rustle, the grow's crackle and the burst. */
    spell: { volume: number; hum: number; rustle: number; crackle: number; burst: number };
    land: { volume: number; gap: number };
    /** A sigil refused (put down too near another): a soft two-note "nope" (chimes.ts nope). */
    nope: { volume: number; gap: number };
    /** Her fall off the Terrace with no broom hitting the ground, unseen below (rules/kit.ts): a soft, comic thud (chimes.ts thud). */
    thud?: { volume: number; gap: number };
    /** Her phone's alarm in the new opening's wake-up (chimes.ts alarm): a ring at most every gap seconds. */
    alarm?: { volume: number; gap: number };
    /** A 💌 refused by an enraged animal (Ed, 2026-10-12): its angry whine (chimes.ts refused). */
    refused: { volume: number; gap: number };
    /** An area cleared early (chimes.ts cleared, sfxCues.ts cleared): its sting's level, heard within range metres (at least floor of it). */
    cleared?: { volume: number; range: number; floor: number };
    /** The crowd cheering as her knockdown speeds the party up (sfxCues.ts tempoUp): its share of the fireworks' cheer. */
    tempoUp?: { volume: number };
    stir: { volume: number };
    knock: { volume: number; whoosh: number; twinkle: number; twinkleEvery: number };
    charge: { volume: number; bellow: number; hooves: number; rumble: number; skid: number; trot: number; range: number };
    relic: { volume: number; spot: number; spotTreetop: number; reach: number };
    meadow: { volume: number; breeze: number; bees: number; birds: number; birdEvery: number; fade: number; murmur: number; clinks: number; clinkEvery: number; balloons: number; squeakEvery: number };
    whale: { volume: number; speed: number; depth: number; reverb: number; sleepEvery: number };
  };
  music: { on: boolean; volume: number; /** The audio context's latencyHint (Ed, 2026-10-07: "the music is still cutting out"): "interactive" the smallest output buffer, "balanced" more room for the audio thread, "playback" the most (under-runs least likely, sound effects latest); ?latency= tries one for a load. */ latency?: "interactive" | "balanced" | "playback"; /** The output buffer to ask for, in seconds (Ed's v3167 playtest: "music is still cutting out", 474 device under-runs on a 10 ms buffer; "balanced" gives Chrome the same 10 ms as "interactive"); 0: the latency category instead. A browser that under-runs anyway asks for twice as much next load (platform/audio/buffer.ts). */ buffer?: number; /** the intro's layers that drop as her needle-drop routine ends (Ed, 2026-10-07), before any speaker: rules/musicPlan.ts bootLayers */ dropLayers?: number; nearDist: number; farDist: number; floor: number; muffle: number; /** The most (dB, as a laptop plays it) the music may fall from by a soundsystem to anywhere far off: checked by tools/music-lab/check.cjs. */ audible: number; /** A sleeping legend's clearing on the ground (Ed, 2026-10-06): the muffle (Hz), quiet (its share of the volume), ease (seconds), the layer's level, and the clearing's radius where the map has none. */ circle: { muffle: number; quiet: number; ease: number; level: number; radius: number }; /** The world slowed in a legend's circle (Ed, 2026-10-06: "the music audibly slows down"): the music follows the game's time scale, its notes' pitch dropping with it as a tape slows (the time scale to the power pitch, never under floor of it); on false, the tempo still follows (it must, to keep in step with the waves) but the pitch doesn't drop. */ slow?: { on: boolean; pitch: number; floor: number }; /** In the treehouse (Ed, 2026-10-26: "the house music slows and muffles. Other sounds stay the same"): its low-pass (Hz) as its world slows, eased with the slowing; lighter than a circle's. */ house?: { muffle: number }; /** The party's over (Ed, 2026-10-06: "the dance music stops"): the music winds down like a tape stopping over the first `stop` of the party-over ease, its pitch falling with it to `floor`, then is silent. */ over?: { stop: number; floor: number }; /** by the sea the party gives way to the waves: within `fade` metres of the water, down to `quiet` of its volume at the water's edge */ beach?: { fade: number; quiet: number }; clear: number; distort: number; src: string };
  /** The home speaker ring's boot-up at the start (Ed, 2026-10-04): its pulse runs at `speed` m/s (rules/bootRing.ts bootSeconds). */
  boot: { /** The boot's pulse speed (m/s; 4, the ley pulse's before Ed set the waves' to 1 on 2026-10-18). */ speed?: number; /** Seconds a home speaker takes to turn from its runestone into the speaker when the boot pulse reaches it. */ transform: number };
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
  /** Each tree's own leaf colour (Ed, 2026-10-16; render/sprites.ts): its leaves' hue turned up to hue degrees and value scaled up to value either way, by its own seeds. */
  leafJitter?: { /** how far each tree's leaves drift toward its own autumn colour, 0 to 1 (Ed, 2026-10-19) */ autumn: number; value: number; /** each tree's leaves' hue turned either way by up to this many degrees (0 to 180), on the lit colour */ hue?: number };
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
  /** Seconds after she lands before she can rise again (Ed, 2026-10-11). */
  riseCooldown?: number;
  /** One shared cooldown for her dodge and her take-off (Ed, 2026-10-15; rules/cooldown.ts): shared on, a take-off adds rise seconds (a dodge dash.cooldown, a landing riseCooldown). */
  cooldown?: { shared: boolean; rise: number };
  descendTime: number;
  groundHeight: number;
  treetopHeight: number;
  camera: { fov: number; ground: CameraModeTuning; treetop: CameraModeTuning; zoomSteps: number; startZoom: number; /** The world's bend (render/height.ts): curve per metre ahead of the focus, on the ground and over the treetops (eased in with lift). */ curve: { ground: number; treetop: number; /** Metres past the bent ground's horizon that scenery is still drawn (the distant treetops over it). */ beyond: number }; /** Screen shake when the witch is hit (render/shake.ts). */ shake: { base: number; perMissingHit: number; knockdown: number; decay: number; maxOffsetPx: number; maxRotDeg: number; speed: number }; follow: number; lookAhead: number; lookAheadMax: number; lookAheadEase: number; zoomEase: number; liftEase: number; /** The opening shot: distance (metres) and angle (degrees) close in on her seat, and how many seconds it takes to ease out. */ intro: { distance: number; angle: number; ease: number }; /** In a legend's circle (Ed, 2026-10-08, "considering" it): on the ground in its clearing, the camera eases (over ease seconds) to angle degrees, its distance times distance, aimed frame of the way to the legend and look metres higher. */ circle?: { on: boolean; angle: number; distance: number; ease: number; frame: number; look: number }; /** Indoors (the treehouse's house, rules/treehouse.ts; Ed, 2026-10-14: "the camera zooms in so you can see the detail"): landed on its floor, the camera eases (over ease seconds) to angle degrees and its distance times distance. */ house?: { on: boolean; angle: number; distance: number; ease: number }; /** At a dressing station, choosing (ui/stationPanel.ts; Ed, 2026-10-21: "eases in once she's choosing ... and back as soon as she moves"): the camera eases (over ease seconds) to its distance times distance, moved side times that distance east (negative: west, so she stands right of the panel). */ station?: { on: boolean; distance: number; side: number; ease: number; /** with no part, aimed this share of her height (as drawn) up her */ aim?: number; /** The part of her the row being chosen is about (config/wardrobe.json frame: Ed, 2026-10-23, "zoom in on what's being chosen"): the camera aimed aim of her height (as drawn) up her, and look metres higher (a thing by her: the pegboard), its distance times distance (in place of the station's own), eased from part to part. */ parts?: Record<string, { look?: number; aim?: number; distance: number }> }; /** The treetop camera zooms out as treetopSpeed rises past base (m/s), its distance times (treetopSpeed / base) to the power power, so the screen holds about as many seconds of flight (Ed, 2026-10-05); 0 off. */ speedZoom?: { base: number; power: number } };
  pixelSize: number;
  glowReach: number;
  glowFalloff: number;
  /** The share of the glow's reach where it has fallen to dark (Ed, round 11: "it should fall off closer"); 1 out to the reach. */
  glowNear: number;
  /** The glow reaches the canopy hole's edge times this (Ed, v149); off when ?glow= fixes the reach. */
  glowToCutout: number;
  /** Set by ?glow=: use glowReach as it is. */
  glowFixed?: boolean;
  /** Night's brightness (Ed, 2026-10-06: "The beach is very bright for nighttime", "Seems very bright for nighttime"): over the
   *  treetops her light reaches at most treetopReach metres (its reach to dark: times glowNear) at treetopGlow of its strength,
   *  eased in by her lift, and never more than maxReach anywhere (a far camera: stargazing, zoomed out). The beach's sand is lit as the forest floor is (render/ground.ts). */
  /** The sigils' neon on the world (render/view/lights.ts sigilLights): each placed sigil a light at height metres over its rune, reaching reach metres (more by level) at strength (0 off); the bottom of her stack one at stack strength, stackReach metres, stackHeight over her. */
  sigilSpill: { strength: number; reach: number; height: number; stack: number; stackReach: number; stackHeight: number };
  /** Her light in the wild and in a fight (render/combatLight.ts): exploring an area the party hasn't reached, its reach and strength times wildReach and wildGlow; with a fight within range metres in the last hold seconds, times fightReach and fightGlow instead; eased up over rise seconds and back over fall. Drawing only. */
  /** The wave's celebration at an area already cleared (rules/fireworks.ts, render/fireworks.ts; Ed, 2026-10-07): shells[0] to shells[1] shells over `over` seconds from the soundsystem (the last `finale` together at the end), each rising for rise[0] to rise[1] seconds to height[0] to height[1] metres and bursting radius[0] to radius[1] metres across, drifting up to `drift` metres off its top; then its lasers stay fully on. Drawing (and sound) only. */
  fireworks?: { on: boolean; shells: number[]; over: number; rise: number[]; height: number[]; radius: number[]; drift: number; finale: number };
  combatLight?: { wildReach: number; wildGlow: number; fightReach: number; fightGlow: number; range: number; hold: number; rise: number; fall: number };
  nightLight?: { maxReach: number; treetopReach: number; treetopGlow: number; /** lying on the beach stargazing, at most gazeReach metres */ gazeReach?: number };
  glowHeight: number;
  /** The witch lit by the world's lights (not her own glow): never darker than lightFloor times her unlit look; coloured lights tint her (lightTint) and rim her edge facing them (lightRim). */
  /** The ley lines through the runestones in wave order (render/leylines.ts). */
  glades: GladeTuning;
  leyLines: { on: boolean; /** The pulse's speed along the route (m/s, Ed 2026-10-09: "Pure constant speed"; 1 since Ed, 2026-10-18; 0 holds it), times the party's tempo (the boot has its own, boot.speed): a wave lands as it reaches its stone (rules/pulseRoute.ts). */ pulseSpeed: number; /** From the end of home's boot the line grows out from the treehouse along the route at this many links a wave (Ed, 2026-10-06: three times the pulse), so it reaches this stone as the first wave lands, and goes on at that pace. */ reveal?: number; /** The whole route always shows (Ed, 2026-10-06): the faintest a section gets, ahead and behind the last stone reached. */ far: number[]; /** The section just left behind, as bright as the next one ahead times this. */ behindBright: number; advance: string; fade: number; brightness: number; width: number[]; /** Its pixel core (Ed, round 14: "not pixelated", "too faint"): half-width on the ground and over the treetops, then its half-bright rim on each (metres). */ core?: number[]; height: number[]; valley: number; flow: number[]; /** The first line's way out (Ed, 2026-10-06): from the treehouse's front round the ring of speakers, avoid metres outside it, never over the dancefloor, then off and looping round to the first objective (rules/departure.ts). */ depart: { avoid: number }; /** The tightest it turns, metres (Ed, 2026-10-06: "can we give leylines a maximum curvature so they don't kink like this?"): it sweeps through each stone and loops round wide rather than doubling back (rules/leycurve.ts). */ minRadius?: number };
  witch: { /** Knocked back and staggered by a blow (rules/knock.ts): base metres for any blow, plus scale times the attack's knockback; at least charge metres for a charge or leap; at most max; eased off at ease a second; staggered stunBase plus stunScale a metre past base seconds, at most stunMax, then immune seconds before the next stagger. */ knock: { on: boolean; base: number; scale: number; charge: number; max: number; ease: number; stunBase: number; stunScale: number; stunMax: number; immune: number }; lightFloor: number; lightTint: number; lightRim: number; /** Riding the hills smoothly (render/ride.ts): seconds to settle at full speed, seconds looked ahead, metres kept over the ground. */ heightSmooth: number; heightLookAhead: number; heightClearance: number };
  spriteTilt: number;
  artPixelsPerMetre: number;
  viewMargin: number;
  lightBudget: number;
  lightSources: { spacing: number; campfire: number; magicStone: number; pond: number; wetPond: number };
  haze: { near: number; far: number };
  /** The scenery budget: scenery is drawn out to an adaptive radius round the witch (view.ts). */
  scenery: { adaptive: boolean; fps: number; hysteresis: number; sustain: number; minRadius: number; shrink: number; grow: number; fade: number; /** in the treetops, tree crowns alone are drawn out to this many metres (at most the haze's far edge) even where the budget's radius is closer: the canopy stays whole to the horizon on a slow machine (Ed's playtest, 2026-10-13); 0 off */ canopyReach?: number; /** the far edge dithered in the solid pass, not faded in the see-through passes (the quality ladder's rung: app/ladder.ts) */ edgeDither?: boolean };
  stringLights: { on: boolean; runsPerArea: number[]; spansPerRun: number[]; coneAngle: number; junctionChance: number; spanMin: number; spanMax: number; spread: number; height: number; sag: number; bulbSpacing: number; palette: string[]; /** palette: every colour in turn; areaNeon: warm white and the area's own neon */ mode: "palette" | "areaNeon"; twinkle: number; chaseSpeed: number; /** times as many runs an area (their spread apart shrunk to fit; 1 as tuned) */ more?: number };
  /** The generated soundsystems (render/soundsystemGen.ts, art/soundsystemGen.js): sizes near to far by distance, the most they turn from facing us, ahead waves baked early. */
  /** Blood trails (render/leash/blood.ts): prints and drops, their colour, fade, rate, pool cap and range. */
  blood?: { on: boolean; style: "prints" | "prints+drops" | "drops"; colour: "red" | "neon"; fade: number; rate: number; cap: number; range: number };
  soundsystemGen?: { on: boolean; near: number; far: number; from: number; to: number; maxYaw: number; toward: boolean; ahead: number };
  party: {
    motes: { perPatch: number; from: number; to: number; speed: number };
    uplight: { strength: number; pulse: number; edge: number }; /** seconds after the boot before the ley pulse sets off */ startDelay: number; /** areas each wave wakes: one per witch present (1 until multiplayer) */ areasPerWave: number; picker: string; noisy: { wobble: number; lobeSize: number; candidates: number; spreadFromLast: boolean }; transition: number; lightReach: number; lightStrength: number };
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
    /** The island's sigil on the floor through the boot (rules/dancefloor.ts islandTiles): on, and the bars between the sap rising up it once written. */
    island: { on: boolean; sapBars: number };
    circleHue: number; circleHue2: number; pulse: number; runeSpeed: number;
    lightReach: number; lightStrength: number;
    discoHeight: number; discoSize: number; spin: number;
    specks: number; speckBrightness: number; speckReach: number;
  };
  /** Wave numbers over the rune stones (Ed, 2026-10-04, a design aid): on, a digit's height as a share of the screen's, metres above the stone (or the canopy), and how bright the reached areas' are (0-1). */
  waveNumbers: { on: boolean; size: number; lift: number; spent: number; pinRange: number };
  canopyCutout: { screenFraction: number; edge: number; /** the cut-away's edge hard: each crown in its band cut or drawn whole, a cut trunk's top there or not (the quality ladder's rung: app/ladder.ts) */ hard?: boolean; /** where it cuts, on the soft fade's 0 to 1 (unset: HOLE_HARD_AT, render/view.ts) */ hardAt?: number; /** How much the fade goes by each crown's middle rather than each pixel (1: whole crowns fade; Ed, 2026-10-06: concentric circles). */ whole?: number; /** How far the hole's line wobbles, a share of its edge (Ed, round 14: still sharp). */ wobble?: number; /** How far past its radius the fade reaches, a share of the edge. */ outer?: number; /** How ragged its outline is round her, a share of the radius (Ed, 2026-10-06: "circle"). */ ragged?: number; /** How far each tree's own radius for it spreads, a share of the radius. */ spread?: number; /** Seconds ahead of her, the way she's going, its middle leans. */ lead?: number; /** The share of the camera's way down (by its eased lift) the hole stays shut, and of its way up it has shut by (Ed's playtest, 2026-10-13: "smoothly during the transition"); unset: by her lift, as before. */ hold?: number };
  /** The composable attacks (rules/attacks/): the least warning (s) from an attack's first telegraph to its first harm; species: each
   *  species fights with its own attack in the grammar (config/species-attacks.json; false, ?attacks=old: the old ones). */
  attacks?: { reactionFloor: number; species?: boolean };
  /** The GPU memory budget (render/view/gpuBudget.ts): MB for the reference window, its floor and ceiling, the share kept clear,
   *  seconds unused before a set can go, and how often it's checked and GL's errors read. */
  gpu?: { mb: number; refWidth: number; refHeight: number; floor: number; ceil: number; headroom: number; keep: number; every: number; errorEvery: number };
  shadows: { on: boolean; strength: number; trees: boolean; /** how far every shadow takes the complement of the light it lies in (0: black): scenery's, the trees', the blobs under creatures, the witch and small things (render/shadows.ts, trunkShadows.ts) */ tint?: number; /** what stands in the trunks', palms' and scenery's shadows is darkened by them too (render/castShadows.ts) */ cast?: boolean; /** that map's texels across (1024; 512 a quarter of the texels each frame, for a weaker GPU) */ castRes?: number; /** Trunks' shadows from her glow and the campfires in ground mode (render/trunkShadows.ts): "off", "soft" or "hard"; how dark; the longest (times the trunk's height). */ trunks?: { mode: string; strength: number; long: number; /** her glow's shadows: out to this many metres, as if from this high */ glowReach: number; glowHeight: number; /** the share of its sprite's width that casts (its trunk, not its low boughs) */ across: number; /** soft: as dark as hard where its fade passes this (near its foot and the light) */ core: number; /** metres from its trunk's foot over which it fades in from nothing (Ed, 2026-10-12; 0: none) */ foot?: number; /** metres from its trunk's foot over which it opens out from a third of its width, so wide roots don't splay (0: none) */ taper?: number; /** it fades to nothing as she comes within this many metres of its trunk (0: never) */ near?: number; /** how much it darkens the ground cover it falls on (grass, flowers, tufts), times its strength (0: not at all) */ cover?: number; /** scenery casts them too (set pieces, decor, relics, scenes, runestones, soundsystems: Ed, 2026-10-12), each at least sceneryMin metres tall */ scenery?: boolean; sceneryMin?: number; /** how light a glowing caster's shadow is, in its own colour (runestones, soundsystems; 0: as dark as any) */ glowLight?: number; /** scenery's shadow fades in from nothing over its half-width and this many metres past it, from its middle (0: none) */ sceneryFoot?: number; /** scenery's shadow narrows to its foot over its half-width and this share of its width past it (0: none) */ sceneryTaper?: number; /** how far a soundsystem's or a runestone's light throws shadows, metres (0: none; Ed, 2026-10-13) */ lightReach?: number } };
  canopyShadow: { on: boolean; strength: number; height: number; cover: number; wind: number };
  mist: { on: boolean; strength: number; height: number; wind: number; gain: number };
  /** Faint rings of moonlight on the crowns, seen from the treetops (render/lightRings.ts; Ed, 2026-10-07). */
  /** The loading mist over the areas whose trees aren't drawn yet, rolling back out from the treehouse as each type lands
   *  (render/loadingMist.ts, render/loadingFront.ts; Ed, 2026-10-24). */
  loadingMist?: import("../render/loadingFront").LoadingMistTuning;
  lightRings?: { on: boolean; strength: number; radius: number; count: number; spacing: number; share: number; above: number; speed: number; plane: number; glory: number; gloryStrength: number; fadeNear: number; fadeFar: number };
  /** The soundsystems' sky sigils (render/hologram.ts; Ed, 2026-10-08): in place of their laser shows. */
  holograms: { on: boolean; size: number; lift: number; glyph: number; cone: number; powerUp: number; collapse: number; turn: number; bob: number; fadeFar: number };
  /** The trees watching her (render/sprites.ts uWatch; Ed, 2026-10-07). */
  watching?: { on: boolean; radius: number; lean: number; lag: number };
  /** How mist, far haze and canopy dapple are drawn: smooth gradients, or dithered pixel steps. */
  moonbeams: number;
  partyObjects: { on: boolean; clusters: number[]; loose: number[]; setChance: number; caughtChance: number; hanging: number[]; lightsPerArea: number; lanternReach: number; arch: string; /** Home's meadow, strewn all over (rules/partyDressing.ts homeDressing). */ home: { clusters: number[]; loose: number[]; weights: Record<string, number>; gap: number; reach: number; lights: number }; exclude: string[]; /** The prop generator's party pieces (art/party.js gen-*) in place of the hand-made ones they replace (?props=gen). */ generated: boolean };
  partyWitches: { /** metres round the dancefloor's middle they wander, and how much they keep nearer it (distance roam × u^centreBias) */ roam: number; centreBias: number; /** a swoop over the treetops: how long, how high, and its weight times this while a player is up there */ swoopTime: number; swoopHeight: number; /** each swoop's peak, swoopHeight times a random share between these */ swoopMin: number; swoopMax: number; treetopBoost: number; /** the party is stepped only while a player is within this of the floor (simRangeTreetop over the treetops) */ simRange: number; simRangeTreetop: number; idleAfter: number; idleReach: number; activityMin: number; activityMax: number; weights: Record<string, number>; arriveTime: number; flyFrom: number; flyHeight: number; runSpeed: number; walkSpeed: number; lapSpeed: number; pairRange: number; pairGap: number; limboPass: number; floorShare: number; debugExtra: number; /** stargazing, her soundsystem ruined or the party over (rules/partyWitches.ts): beds out past the speakers' ring by from to to metres, their places one behind another gap metres apart (lying along x, a witch length metres long) and each stagger metres along from the last, threes this share of beds (the rest pairs), beds apart metres clear of each other; a player still within meet metres of one, turn seconds each of the beach's sequence */ gaze?: { from: number; to: number; gap: number; stagger: number; length: number; threes: number; apart: number; meet: number; turn: number } };
  speakerLasers: { on: boolean; tilt: number; sweep: number; sweepBeats: number; length: number; opacity: number };
  find: { eyeshine: { range: number; strength: number; blink: number }; lightFloor: number; rim: number; ambient: number; moonHue: number; moonSat: number };
  trunkFade: { metres: number; share: number; dither: boolean; lightFloor: number; rim: number; crownShare: number };
  pathFade: { metres: number; dither: boolean };
  runeMarkers: { variants: boolean; laser: { opacity: number; width: number; length: number }; scale: number; beamHeight: number; lightRange: number; dormant: { glow: number; light: number; reach: number; beam: number }; awake: { glow: number[]; light: number; lightBuild: number; reach: number; beam: number; motes: number; moteBuild: number }; flare: { time: number; light: number } };
  walls: { runs: number[]; runLength: number[]; gateChance: number; rings: number[]; ringStones: number[]; ringRadius: number[]; avenueChance: number; loneChance: number; clumps: number[]; clumpSize: number[]; clumpRadius: number };
  grounds: { chance: number; kinds: string[]; radius: Record<string, number> };
  /** Each area's sleeping legend lies in a small circular clearing of its own (Ed, 2026-10-06): radius metres (or its species' own,
   *  sized to the legend), a soft edge ring edge metres wide, the legend lying top of the radius toward its far (north) side. */
  legendClearing: { radius: number; edge: number; top: number; minFromStone: number; minFromOtherStones?: number; floor: { on: boolean; overgrowth: number; slab: number; glint: number }; rim: { spacing: number; chance: number; out: number; spread: number; gap: number }; grove: { reach: number; density: number; tallest: number; scale: number; gap: number; soft: number; jitter: number }; species: Record<string, number>; /** Sized to fit its legend (rules/legendFit.ts): metres to spare round its sleeping body, and the most a radius may be. */ fit?: { margin: number; max: number; /** the most in a legend area of its own (Ed, 2026-10-26; rules/map.ts) */ areaMax?: number } };
  /** Scenes (art/scenes.js): the share of areas that get one (if an unused scene suits them); footprint = farthest piece's authored offset times scale, plus pad metres. */
  scenes: { chance: number; scale: number; pad: number; /** one scene placed on most maps (Ed, 2026-10-11: the temple ruins), at this chance a map, suited areas first, then any */ featured?: { ids: string[]; chance: number } };
  relics: { spacing: number; chance: number; nearRoad: number; minGap: number };
  treeCap: { from: number; keep: number };
  /** The HUD's pointers as map pins (render/indicator.ts): gap screen pixels between the arrow's tip and its subject's drawn top. */
  pins?: { gap: number };
  treetop: { boost: number; boostTime: number; boostAngle: number; turnRate: number; turnRateSlow: number; sharpTurnSpeed: number; brakeAt: number; glideTime: number; sharpTurnBleed: number; cameraPull: number };
  /** The creature states' looks (render/looks.ts): enraged ones tinted toward colour by amount (0 none, 1 all). */
  /** The live rig (#79, render/rig/): on by default (?rig=0 off); creatures in the treetops, or drawn smaller than minPx art pixels, keep their baked frames, except the levels in alwaysLevels ("baby", "young", "adult", "legend"), rigged at any size (Ed, 2026-10-05: legends always). */
  rig?: { minPx: number; alwaysLevels: string[]; /** a sleeping legend's drowsy wake (s), an angry one's share of it, its settling back to sleep (s), and how far it sinks on the rig (share of its height) */ wakeSecs?: number; angryWake?: number; settleSecs?: number; sink?: number };
  looks?: { enragedTint: { colour: string; amount: number }; /** the 💢 beside an enraged creature's head: on, and its size (times its level's bubble size) */ anger: { on: boolean; size: number }; /** party animals' twinkle: how many, how often (a second), how big, how bright */ partyGlow: { on: boolean; sparkles: number; rate: number; size: number; strength: number } };
  bubbles: { emojiPixels: number; scale: number; /** a creature's bubble size by level (baby, young, adult, legend) */ levelScale: number[]; /** a creature's bubble shows to her within this many metres, on the ground only (render/bubbleSight.ts) */ near: number; /** ...fading out over its last this many metres */ fade: number; /** ...and in and out over this many seconds (rising, landing, going indoors) */ ease: number };
  /** Home's area, settled first: its circle reaches margin metres past the treehouse's footprint; other areas' centres stay gap (areas) beyond it. */
  home: { margin: number; gap: number };
  /** Arriving on an island from the sea chart (rules/arrive.ts): the still's push-in and cross-fade, and the flight's legs. */
  /** Sailing from the map table's sea chart (app/sail.ts): the next night started on the same page (inPlace, and so every other
   *  way to a new night), or the page loaded anew on the island's link as before; ?sail=inplace or ?sail=reload for one page. */
  sail?: { inPlace: boolean };
  /** The opening (app/opening.ts): bedroom, a plain first load waking in her bedroom on home's night; ?opening=bedroom|old for one load. */
  opening?: { bedroom: boolean; wake?: { snooze: number; stretch: number; alarmMin: number } };
  /** The forests' biome looks by ring (rules/lakeLooks.ts biomeStrength): strength[0] for phase from, the next ring the next, the last further out. */
  biomeLooks?: { from: number; strength: number[] };
  arrive?: { warm: { frames: number; ms: number; max: number }; maxStep: number; fade: number; speed: number; minLeg: number; low: { angle: number; distance: number; offshore: number }; frame: { angle: number; distance: number; lift: number }; rise: number; settle: number;
    /** the sea chart's flight waiting for a sail's night (app/chartView.ts, render/chart/seaChart.ts FlyOptions): its pace down to rate, eased over ease seconds, for at most cap seconds */
    hold?: { rate: number; ease: number; cap: number };
    /** where the chart's flight hands over: sea metres out to sea off the south coast, its camera dist metres back, pitchDeg down */
    handoff?: { sea: number; dist: number; pitchDeg: number };
    /** the whole treehouse tree before her bedroom (rules/arrive.ts treeShot): height metres (till its art says), angle up, fill of the frame, time seconds to it */
    tree?: { height: number; angle: number; fill: number; time: number } };
  treehouse: { /** metres from the speaker ring's outer edge to its footprint's nearest edge */ gap: number; angle: number; clear: number; lightReach: number; lightStrength: number;
    /** The deck on the Ent (rules/treehouse.ts): its radius and floor height (m), the landing grace, the rail's keep-in, the map table's radius and reach, the decks' arc (inner, outer m; from, to degrees, 90 south) and her seat behind them (m south). */
    deck?: { on: boolean; radius: number; height: number; grace: number; rail: number; table: number; tableUse: number; decks: { inner: number; outer: number; from: number; to: number }; seat: number };
    /** The house on the Ent (rules/treehouse.ts, docs/backlog/treehouse.md step 1; on: in place of the deck; the oak since 2026-10-24, its floor and the Terrace's layout config/house/'s): its floor height (m), the landing grace, the edge's keep-in; landTime: seconds to come down onto the Terrace flying onto it; fall: with no broom she falls off the Terrace's open rim (on: for now a switch, the brooms as objects to come; time: seconds till she's back at the circle). */
    house?: { on: boolean; height: number; grace: number; rail: number; landTime: number; /** on foot in the house: her walking speed (m/s; Ed, 2026-10-25: half again as fast, 5 to 7.5, her broom's ground speed apart) */ walk: number; /** the walking speed (m/s) her walk cycle is drawn for (render/view/witch.ts): faster than this, her steps quicken with her pace, so her feet don't slide */ stride?: number; fall: { on: boolean; time: number; /** seconds after the thud before she is back at the circle */ beat?: number }; /** the forest behind the house black till the island's ready (render/view.ts behindHouse), then fading in behind it over `reveal` seconds (Ed, 2026-10-26: "When the forest has loaded, fade it in gradually behind the whole treehouse"); back over `fade` seconds as she leaves the house before then */ dark?: { on: boolean; fade: number; reveal?: number }; /** the Terrace one of the house's rooms, not drawn on its own (Ed, 2026-10-26: "I also want to try not having the terrace drawn separately"; the pause page's switch): its art from outside (its round of wood, the decks) drawn only while the house is, as the rooms are */ terraceRoom?: boolean; /** the great oak's crown over the house (rules/crown.ts, render/crown.ts), grown from `seed`; indoors a room's cut, and the hole round her, open and close over `cutFade` seconds (0 at once) */ crown?: { on: boolean; seed: number; cutFade?: number; /** the crown whole over the Terrace, no gap nor notch (Ed, 2026-10-26: "I'd like to try the treehouse canopy not being cut-through"; the pause page's switch; false, the gap as before) */ whole?: boolean; /** how many of its strings of lights are hung (0 to 1, whole strings kept by a hash; 1 every one) */ lights?: number; /** the house's warm light spilling up onto the lobes' and limbs' undersides over its rooms (0 none, 1 as Ed chose, 2026-10-27) */ warm?: number; /** its lights wound round it in this many long strands spiralling out over its top, in place of its drapes and garlands (Ed, 2026-10-27: "Maybe think of the lights wrapped around the crown in a spiral (if seen top down)"; 0, as before) */ wrap?: number } };
    /** Who carries the Ent (drawing only; art/carrier.js): "island" the island's own kind's legend (none at home), a kind's id that kind's, "none" no one. */
    carrier?: string };
  decor: { spacing: number; ruins: number; rocks: number; freak: number; /** each family's share times this (1 as authored; 0 none) */ mix?: { ruins?: number; rocks?: number; freak?: number }; minGap: number; clearing: number; pathGap: number; /** A decoration's footprint radius (metres): kept clear of the gameplay (map.reserved). */ footprint: number };
  paths: { rails: number[]; roads: number[]; linkChance: number; deadEndChance: number; pathHalf: number; roadHalf: number; railHalf: number; railBroken: number; streams: number[]; streamHalf: number; landmarkSpacing: number; landmarkChance: number; vergeSpacing: number; pieceGap: number; /** the path pieces at all (railway landmarks and signals, buffer stops, verge posts, stairs, bridges, level crossings, fingerposts) */ pieces?: boolean; fingerposts: boolean; treesOnBroken: number; edgeBushes: number; bushBoost: number };
  lights: { /** tonight's find's own pale gold-white light (render/view/finds.ts; docs/art-guide/FINDS.md) */ find: { reach: number; strength: number }; campfire: { reach: number; strength: number }; stone: { reach: number; strength: number }; /** The light's soft knee (render/lighting.ts softKnee): the light on a pixel passes unchanged up to knee of brightness, then eases toward ceiling and never past it; ceiling <= knee: off. */ knee?: number; ceiling?: number };
  glowPower: number;
  /** The lighting's mood (render/mood.ts): spooky (the grade below) or plain (the light as it was). */
  light?: { mood: "spooky" | "plain"; spooky: Mood };
  /** The beat clock (rules/beat.ts): the base tempo; each wave's tempo (from the music style's arc),
   *  eased over rampBars from the block line (blockBars) its music lands on. */
  beat: { bpm: number; tempos?: number[]; rampBars?: number; blockBars?: number; /** Beats a knockdown's tempo rise eases in over (rules/beat.ts knockdownTempo), 4 by default. */ knockBeats?: number };
  /** Berries and evolving (rules/berries.ts): berries per area at the start [min, max], berry bushes
   *  per area, how far a party animal looks for one (m), how long it eats (s), berries to evolve
   *  (babies, young, adults), the berry's colour and glow. */
  berries: { /** a baby eats only at its placed sigil, a berry within babyReach m of it; babyCost berries evolve it (Ed, 2026-10-11) */ babyReach?: number; babyCost?: number; perArea: number[]; bushesPerArea: number; patch: { bushes: number[]; radius: number }; detour: number; eatTime: number; /** Berries to evolve (Ed, 2026-10-05): the strength a level gains (by: "power", hp × dps, or "value", √ of it) over per, rounded, at least 1. */ cost: { by: "power" | "value"; per: number }; colour: string; glow: number };
  sigilProjection: { height: number; opacity: number; beam: number; size: number; /** Leashed and happy creatures' sigils over them from the treetops (Ed's playtest, 2026-10-06): the nearest `max` within `range` metres, `size` times their ground rune, `opacity` (happy ones dimmer by `happy`), fading out over the last `fade` of the range. */ creatures: { range: number; max: number; size: number; opacity: number; happy: number; fade: number } };
  /** The circle-bug suspects (Ed, 2026-10-14): each effect centred on her with a round edge, on as ever or off (the pause page's toggles). */
  suspects: { seeThrough: boolean; holeCut: boolean; trunkFade: boolean; groundCover: boolean; glow: boolean; effectsLayer: boolean; haze: boolean; areaAverage: boolean; seeDepth: boolean; cutWhole: boolean; seeSplit: boolean; seeMark: boolean; mist: boolean; lightRings: boolean; seeWrite: boolean; seeCull: boolean; seeKeep: boolean; seeStencil: boolean; seeEarly: boolean; seeSolid: "off" | "all" | "circle" | "rest"; seeNoBlend: boolean; seeShowAlpha: boolean; showBroken: boolean; seeDither: boolean; seeTwo: boolean };
  occlusion: { on: boolean; fadeOpacity: number; edge: number; minHeight: number; silhouette: number };
  /** The places she stands in kept clear of the scenery in front of them (Ed, 2026-10-26; render/view/reveal.ts): the seconds each fades over in
   *  and out, the soft edge (a share of the screen's width) and the depth (m) the fade eases over; and each kind on or off, the radius
   *  (m) she stands within, the ring (m) boxed with it, and the width and height (m) of what stands at its centre (a legend's circle:
   *  its own radius and legend, its ring pad m wider). */
  reveal?: { seconds: number; edge: number; depth: number; legend: { on: boolean; pad?: number }; runestone: RevealKind; find: RevealKind; flask: RevealKind };
  stack: { offset: number; scale: number; gap: number; stiffness: number; damping: number; trail: number; idleSway: number; /** Its sigils more visible (Ed, 2026-10-15): each drawn at bright times leash.sigilGlyph, over a near-black disc at backing (0 none) backSize times its width, and with over drawn over the scenery (no depth test), so no crown hides the stack. */ bright?: number; backing?: number; backSize?: number; over?: boolean };
  lasers: { on: boolean; maxCount: number; length: number; spread: number; maxTilt: number; sweep: number; sweepBeats: number; openBars: number; opacity: number; duty: number; blockBars: number; fadeIn: number; fadeOut: number; fadeNear: number; fadeFar: number };
  borders: { on: boolean; width: number; brightness: number; sparkle: number; step: number; /** 0 a gentle breathing, 1 star-like flashes and dropouts */ twinkle: number; /** colour swaps a second */ swapRate: number; /** the share of sparks that swap on the beat */ swapBeat: number };
  /** The 💌 invite (issue #87): rules/invites.ts. on: 💌s instead of the proximity chat. */
  invites: { on: boolean; burst: number; burstGap: number; cooldown: number; range: number; speed: number; /** The lob's rise (m) over the line from her hand down to the ground at the range (drawn only). */ arc?: number; homing: number; homingCone: number; homingRange: number; multiShot: number; spread: number; radius: number; amount: number; hits: number[]; drain: number; /** Seconds a creature's slots hold before draining once they hold hearts (combat as orbit slots, rules/orbit.ts). */ heartHold?: number; /** Her ground speed while firing, times. */ fireSlow?: number; /** A 💌 that met no one rests on the ground this many seconds (drawn only), fading over the last lingerFade; at most lingerMax at once. */ linger: number; lingerFade: number; lingerMax: number; /** Turns a second a 💌 spins in flight, flat like a frisbee (drawn only). */ spin: number; /** The 💌 ring round a creature (drawn only): scale x its body radius + gap metres, at least min, and at least height x its drawn height + gap (so it rings what you see). */ orbit: { scale: number; gap: number; min: number; height?: number }; /** A hat's 💌, thrown or flung (the Sentry's, the Slingshot's): homing hard, at homing degrees a second within cone degrees of its way and range metres. */ hard: { homing: number; cone: number; range: number } };
  /** The runestone stacks and the soundsystem spell (rules/stoneStacks.ts; Ed, 2026-10-28). */
  cast: import("./stoneStacks").CastTuning;
  invite: { talkRange: number; cancelDistance: number; snubTime: number; talkTime: number[]; turn: number[]; decayRate: number };
  /** The end of the route (rules/win.ts WinTuning): the lap's speed, the conga, the legends' ring, the card. */
  win?: Partial<import("./win").WinTuning>;
  leash: { /** her babies (Ed, 2026-10-11): single file gap m apart on the ground, scatter m off in a fight (till calm s after the last thing went for her or hers), farSpeed m/s past farAt m from her */ babies?: { gap: number; scatter: number; calm?: number; farAt: number; farSpeed: number }; length: number; runSpeed: number; pickRadius: number; spacing: number; /** How near (m) she picks up a happy creature's rune, a relic's sigil or her hat. */ runeRadius: number; /** Seconds she holds the sigil button on the ground, with nothing it picks up or puts down, to put her hat down (rules/hat.ts; absent: never). */ hatHold?: number; /** How bright a placed sigil shows where scenery or grass hides it (render/leash.ts; 0 or absent: hidden). */ placedThrough?: number; /** Every sigil glyph's brightness, times its colour (render/leash/glyphs.ts; Ed's pick B, 2026-10-12: 0.5, under the bloom's threshold; absent: 1). */ sigilGlyph?: number; /** The soft halos under placed sigils, ready runes and relic sigils, times their old strength (0: none, Ed's pick B; absent: 1). */ sigilHalo?: number; /** Under every sigil on the ground (Ed, 2026-10-12, Bravo's o3): a near-black backing disc as wide as the glyph times size, at dark (0: none, and no opaque glyph either), then the glyph painted opaque at ink times how much it shows (render/leash.ts groundSigil). */ sigilBacking?: { dark: number; size: number; ink?: number }; /** Metres between a creature's body and its sigil's backing: its happy rune south of it, its placed sigil south of where it rests (rules/runeOffset.ts). */ runeGap?: number; /** Rank sigils (Ed, 2026-10-27; render/leash/ranks.ts): on, every leash sigil is its bare glyph in its rank's colour with embers by rank, a youth's berries as two rows of dots in her stack, and the hex grid hex metres (?sigils=new turns it on). */ ranks?: { on: boolean; hex: number; glyph: number; colours: number[][]; enemy?: number[][]; sizes?: number[]; embers: { count: number[]; size: number[]; rise: number[]; stack: number }; dotsPerRow: number; /** a rune stone's rune's glow, times its baked colour (Ed, 2026-10-27) */ stoneGlow?: number; /** the sigils over each rune stone, the spell's spot, its ring and the conversion (Ed, 2026-10-28; render/leash/stones.ts) */ stones?: { range: number; fade: number; south: number; size: number; near: number; far: number; bars: number; radius: number; cell: number; convert: number }; /** the leashes as chains: a link's length (m) by rank, youth to legend (babies have none), a legend's tether's times tether, a slack one slack longer than its span, and their motion: damping (0.9 calm to 0.99 lively), gravity (m/s²), arcPull (the spring to their bow, 1/s²), iterations, jump (m: laid afresh) (render/leash/chain.ts) */ chain?: { link: number[]; tether: number; slack: number; damping: number; gravity: number; arcPull: number; iterations: number; jump: number } };
    /** Sigils snap to a world-fixed hex grid (Ed, 2026-10-11; rules/leash.ts hexCell): size metres between neighbouring cells (0: put down
     *  freely, as before); no cell within stone metres of a runestone or soundsystem, or speaker metres of a home speaker, plus half a cell. */
    hex?: { size: number; stone: number; speaker: number }; /** Runs (Ed, 2026-10-15): the sigil button held on since a press that picked up keeps picking up any sigil she runs over, since one that put down puts one down in each empty hex she enters (false: a press does one thing; absent: on). */ runs?: boolean; /** On the ground the nearest rune within radius (m) comes to her: its creature trots over at speed (m/s), stopping stop (m) away. */ runePull: { radius: number; speed: number; stop: number };
    /** Sigil weight (rules/leashWeight.ts): free allowance, levels' weights, drag, drift, rise, sink, sinkMax, floor, extreme, maxTension. */
    /** Who grounds her (Ed, 2026-10-18: "One adult stops you taking off. Three young do.", the numbers indicative, by weight; rules/leashWeight.ts groundedBy): the weight following her (their sigils in her stack, each at creatureWeight; babies not counted) at or over this and she can't take off; 2 is one adult of normal strength (three young 2.4, two 1.6); 0 turns it off. */
    grounded?: { weight: number };
    weight: { /** a baby's weight on the ground (the treetops': levels[0]) */ babyGround?: number; free: number; levels: number[]; drag: number; drift: number; rise: number; sink: number; sinkMax: number; floor: number; extreme: number; maxTension: number } };
  bond: { rim: boolean; sparks: boolean; thread: boolean; sparkEvery: number; /** The thread's upward bow: metres per metre of length, from threadArcSlack when slack to threadArcTaut at full strain, up to threadArcMax. */ threadArcSlack: number; threadArcTaut: number; threadArcMax: number };
  tone: { black: number; gamma: number; ambient: number; moon: number };
  bloom: { on: boolean; strength: number; threshold: number };
  tiltShift: { on: boolean; /** The share of the blur the sky takes, so the stars stay perceptible (Ed, 2026-10-06); 1 as the ground. */ skyBlur?: number; /** Her sigil stack kept out of the blur, sharp at any height (Ed, 2026-10-27); default on. */ stackSharp?: boolean; strength: number; band: number; centre: number; /** Over the treetops (Ed, v160: stronger there), blended in by lift. */ treetop: { strength: number; band: number } };
  /** Wild creatures: every area starts with `start` and, from the first frame (Ed, 2026-10-07: no growth on a clock),
   *  byRoute's extra by its place on the waves' route (rules/growth.ts routePopulation: a threat curve spent by each
   *  kind's profile, and a fixed number of babies). `growth` is the old per-wave growth: the game no longer reads it (the balance simulators do). */
  population: { start: { babies: number; young: number; adults: number }; byRoute: ByRoute; /** The hostile swarms by the runestone order (Ed, 2026-10-08; rules/swarm.ts). */ swarm: SwarmTuning; growth: { on: boolean; perWave: number; weights: number[]; hide: number } };
  /** Area legends (Ed, 2026-10-04): one an area, asleep till its area's wave, then a mini-boss guarding it. */
  /** A sleeping legend's dream bubble (Ed, 2026-10-05): shown only to a witch on the ground within range metres of it. */
  dreams: { range: number; nightmare: { at: number[]; faces: string[] }; /** a sleeping legend's face while its dream is open: mostly face, now and then one of faces for a turn of every seconds */ sleepy?: { face: string; weight: number; every: number; faces: string[]; fallback: string }; /** Its thought bubble's one symbol at a time (Ed, 2026-10-08): turns of hold seconds, the emoji then the quest sigil (the flask's relic sigil instead, a flask share of those turns), each fading over fade seconds at its ends (render/thoughtCloud.ts dreamSymbol). */ cycle?: { hold: number; fade: number; flask: number } };
  /** Which areas have a legend (Ed, 2026-10-06: "only in about half of areas (we can test this ratio)"): share of them, seeded per map and spread out (rules/map.ts chooseLegendCells); the map's, so a change needs a new map. */
  legends: { share: number;
    /** A happy legend's reach, metres (Ed, 2026-10-06, on relic allies: "They stay home, but if they're not useful enough right now, make their range longer"); an angry one's is legends.json attack.range. */
    happyRange: number;
    /** A legend dreams of any other kind on the map, equally likely, but none whose nearest area lies over questCap areas away (about the farthest tenth at 5; 0: no cap). */
    questCap: number;
    /** A legend dreams only of a kind living in an area later on the route than its own (else the nearest later area's, else any). */
    questLater?: boolean;
    /** The early easy quest (Ed, 2026-10-07; rules/quest.ts earlyQuest): one of the first three areas the waves wake, with a legend, dreams of the baby of another of those three's kind. */
    earlyQuest: boolean;
    /** Legend areas (Ed, 2026-10-26: all legends in "additional areas that have legend circles where runestones usually are", each
     *  grown beside an area of its kind, counting as one area with it; rules/map.ts): on (the default), or false for legends in their
     *  own kind's areas as before. */
    areas?: boolean;
    /** An angry legend bombarding soundsystems (Ed, 2026-10-06: "Legend bombards, but prioritises you"): with no witch in its reach, the first lob or beam of its volley goes at the nearest standing soundsystem within range metres, doing damage to it (of combat.soundsystemHealth). */
    bombard: { on: boolean; range: number; damage: number };
    /** The stomp (Ed, 2026-10-06, a "perhaps"): a legend turning angry with its own area's soundsystem standing destroys it at once; with it on, legends stay restless angryAfter seconds (not legends.json's) before they anger. */
    stomp: { on: boolean; angryAfter: number };
    /** The party-legend Easter egg (rules/partyLegend.ts): on, 💌s to fill a happy legend's meter, its drain (share a second), how far (m) she can go from it leashed. */ partyEgg: boolean; partyHits: number; partyDrain: number; partyReach: number };
  /** The party's over (rules/partyOver.ts): seconds it eases in over, the ley line's brightness at its end, the creatures' pace home (times their roaming speed). */
  partyOver: { ease: number; leyFloor: number; walk: number };
  wildLegends: { wake: number; sink: number; moss: number; guard: number; heal: number; scale: number; breathe: number; breathEvery: number; aura: number; glow: number; /** How a legend reads in its circle (Ed's round 14 playtest: "Legends in the circle are not very distinct"): its sigil neon's glow on the ground under it asleep or happy (alpha), the neon rim round a sleeping form (0 none to 1), and its light floor (a share of its unlit look it never drops below). */ seen?: { aura: number; rim: number; floor: number; /** asleep, its nap (art/naps.js: the animal itself lying asleep) for its mound (art/legends.js) */ nap?: boolean; /** its light in this many steps of brightness (0 smooth) */ steps?: number; /** Dark coats (Ed, 2026-10-07: lift only the legends dark enough to vanish at night): a legend whose floored look (floor times its coat's luminance) is under dark has its floor raised to dark over its coat's luminance, at most liftMax; lighter legends as they are. */ dark?: number; liftMax?: number } };
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
