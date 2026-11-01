// The whole game state, and one step of it. No drawing here: the Three.js layer reads this.
import { creaturesAshore, lakeKnobs, onLake, roundLakes } from "./lakes";
import { guestDeck } from "./guestDeck";
import { newMushrooms, potionPhase, stepMushrooms, type MushroomState } from "./mushrooms";
import { runawaySpot, runOff } from "./runaway";
import { stepWildWatch, type WildEntry } from "./wildWatch";
import { stepHunts } from "./hunt";
import { wakeOnInvites } from "./inviteWakes";
import { MOVEMENT, resetFight } from "./movement";
import { useData } from "./combat/hits";
import { nightFor, type NightSet } from "./musicSet";
import { bodyRadius, spaceOut } from "./spacing";
import { drawnRadius, spacingOn } from "./combatSpacing";
import { type QuestEvent } from "./quest";
import { beatAt, knockdownTempo, newBeatClock, tempoRate, timeAt, waveArrived, waveTempo, type BeatClock } from "./beat";
import { cameraPose, newCamera, stepCamera, type CameraPose, type CameraState, type CoastView } from "./camera";
import { legendCircleNear } from "./legendCircle";
import { MAX_STEP, newClock, type Clock } from "./clock";
import { healBy, heldByCombat, keepsToCircle, napping, spawnCreatures, stepCreaturesNear, stepNotice, wanderRange, type Creature, type NapRules } from "./creatures";
import { Forest } from "./forest";
import { inviteCreature, leashPoint, newLeash, type LeashControls, type LeashEvent, type LeashState } from "./leash";
import { stepTravel, updateModes } from "./travel";
import { leashView } from "./houseGuard";
import { cheer, LEGENDS, placeRelics, stepLegendStates, type Relic } from "./legends";
import { placeTrunk, type Trunk } from "./finds";
import { befriend, danceAt, huntsWitch, invitableNow, stateOf, STATES, type State } from "./creatureStates";
import { GUEST_DEPTH, guestGap, guestSlot, guestSpot, partySpots, ROW_OFFSETS, SLOT_RANGE, SPOT_RANGE } from "./partyGuests";
import type { Cell } from "./partition";
import { feedNearest, newBerries, stepBerries, type BerryState } from "./berries";
import { heldByRoutine } from "./djSet";
import { castPartySpell, cellKey, clearArea, heldBySpell, newParty, resetPulse, spreadWave, stepParty, type Partified, type PartyState } from "./party";
import { clearedAreas } from "./clear";
import { bootShare, stoneTurned } from "./bootRing";
import { AREA_TYPES, areaCellAt, generateMap, hydrateMap, type ForestMap, type MapPrep } from "./map";
import { areaOf, homeArea } from "./homeArea";
import { beachOf, exitPoint, isInside } from "./mapShape";
import { calmRingAt, keepEnragedOut, leavesCalmRing, stepTimeScale } from "./slowTime";
import { isHomeKey, nextSpeakerState, speakerIndex, speakerKey, speakerRadius, speakerStateOf, type SpeakerState } from "./speakers";
import { moonState } from "./moon";
import { floorEvent, floorLevel, islandKinds, islandSigilOf, neon, newFloor, stepFloor, switchOn, tileOf, type FloorInputs, type FloorState } from "./dancefloor";
import { SIGIL_NEON } from "../../art/sigils.js";
import { COMBAT, marchOn, marchSpeed, nearestHomeSpeaker, newCombat, startSiege, stepCombat, type CombatState } from "./combat";
import { friendlyLegendRoute } from "./combat/legend";
import { coarseTurn, fullRadius, inFull, newLodCounts, type LodCounts } from "./simLod";
import { dropHat, newHat, type HatState } from "./hat";
import { gatherFloorSigils, setFloorSigils } from "./sigilAvoid";
import { questsFromPlaced, sigilBarred, stepSigilButton } from "./sigilButton";
import { stepCauldronNight, type CauldronNight } from "./cauldronNight";
import type { CauldronInventory } from "./cauldron";
import type { CauldronTrip } from "./cauldronTrip";

/** Seconds of pushing on out against the zoo's edge before she leaves it (Game.zooPush). */
export const ZOO_EDGE_PUSH = 0.5;
import { keepInBedroom, stepWake, wakeOf, WAKE_DEFAULT, type WakeState } from "./wakeUp";
import { wearPiece } from "./clothesPile";
import { hatLetters, hatsDown, onHatPicked, onHatPut, stepHatSpells } from "./hatSpells";
import { loadOf, type LeashLoad, groundedBy } from "./leashWeight";
import { pinWitch, type Pinned } from "./partyLegend";
import { castOf, castOn, circleSpot, friendSigils, looseAt, scatterSpots, stoneOpen, tetherWitch, type LooseSigil } from "./stoneStacks";
import { liveRainbows, sendRainbow, stoneMetres, type RainbowWave } from "./rainbow";
import { runeOffset } from "./runeOffset";
import { hurt, knockOut, newHealth, nextStreak, repair, stepKnockout, stepWanderers, type Health, type Knockout, type KnockoutEvent } from "./knockout";
import { bagTuning } from "./bags";
import { newInvites, stepInvites, type Affection, type Decoy, type InviteControls, type Invites } from "./invites";
import { burstMirage } from "./combat/packs";
import { affection, blocksLetters, hit as hitAffection } from "./affection";
import { knockWitch, newKnock, stepWitchKnock, stunned, type Blow, type Knock } from "./knock";
import { applyDash, dashing, newDash, rechargeDash, startDash, type DashState } from "./dash";
import { coolReady, coolRoom, coolSpend, coolWait, newCool, stepCool, type CoolState } from "./cooldown";
import { castSpell, newSpells, pullOf, revealed, speedMultiplier, stepHealingRing, type SpellState } from "./spells";
import { broomTuning } from "./broomParts";
import { batter, canPound, groundPound, hiddenWitch, leyJump, leyJumpTarget } from "./brooms";
import type { HouseState } from "./houseRooms";
import { newPartyWitches, stepPartyWitches, type PartyWitches } from "./partyWitches";
import { newBeachWitches, stepBeachWitches, type BeachWitches } from "./beach";
import { newGrowth, type GrowthState } from "./growth";
import type { Tuning } from "./tuning";
import { newWitch, seaward, stepWitch, witchHeight, type Intent, type WitchState } from "./witch";
import { deckOf, onTreehouse } from "./treehouse";
import { homeDown, startPartyOver, stepPartyOver, stepWorldAsleep, worldAsleep, type PartyOver } from "./partyOver";
import { stepWin, winFlare, won, type WinState } from "./win";
import { hasBroom, hasInvites, type Kit } from "./kit";
import { pulseRouteMetres } from "./leypulse";

/** One player's witch (Stage 4: game.witches, one per player, the first this machine's): her
 *  body (where she is and how she flies), her leash, her spell. */
export interface Witch {
  id: number;
  /** Her hidden mushroom bag references the host's shared baskets/pot when the cauldron gate is enabled. */
  mushrooms?: CauldronInventory;
  cauldronTrip?: CauldronTrip;
  /** Her own clock, pause page and wake-up in a multiplayer night. Solo keeps its legacy clock/state. */
  time?: number;
  paused?: boolean;
  wake?: WakeState;
  pending?: Partial<Controls>;
  /** Her own outward-push hold in the zoo; the solo counter remains Game.zooPush. */
  zooPush?: number;
  body: WitchState;
  leash: LeashState;
  spells: SpellState;
  dash: DashState;
  /** The one cooldown her dodge and her take-off share (rules/cooldown.ts; Ed, 2026-10-15), with cooldown.shared. */
  cool: CoolState;
  /** Her 💌s (rules/invites.ts). */
  invites: Invites;
  /** Thrown and staggered by a blow (rules/knock.ts). */
  knock?: Knock;
  /** Her hits left and repair (rules/knockout.ts), and her knockout while it plays out. */
  health: Health;
  ko: Knockout | null;
  /** Her last knockdown and how many in a row before it (rules/knockout.ts nextStreak: the respawn wait grows with them). */
  koStreak?: { n: number; at: number };
  /** Her hat (rules/hat.ts): on her head, or lying where she was knocked out. */
  hat: HatState;
  /** Her aim confused till then, turning up to drift radians (pack combat: the stoat's war dance, rules/combat/packs.ts). */
  confused?: { until: number; drift: number; /** her movement turned, not her aim (the bat's screech) */ move?: boolean };
  /** Up against a party legend's leash (rules/partyLegend.ts, the Easter egg): which, and since when; for the view. */
  pinned?: Pinned | null;
  /** Slowed (a snail's slime, a flash) until then: her speeds times slowMult. */
  slowUntil?: number;
  slowMult?: number;
  /** Her time she last landed (from the treetops): she can't rise again till riseCooldown seconds after it. */
  landedAt?: number;
  /** Her business in the treehouse's rooms (rules/houseRooms.ts): the bed's hold, the hats on the hats' floor. */
  house?: HouseState;
  /** Her night's kit (rules/kit.ts): her invitations and a broom, taken in the house; none on a night that never waits for her
   *  spell (she has both). */
  kit?: Kit;
  /** Her soundsystem spell (rules/stoneStacks.ts; Ed, 2026-10-28: "a spell that you're choosing to cast on this stone"): her progress
   *  on each stone she's cast at (0 to 1) and when it last changed (it drains while she isn't casting it); the stone she's casting
   *  at now, since when; and, after a hit broke it, held off till she lets go of the button. */
  casts?: Record<string, import("./stoneStacks").CastRecord>;
  casting?: string | null;
  castFrom?: number;
  castBlocked?: boolean;
}

/** The simulation's fixed step (seconds): the rules advance only in these, driven only by the
 *  inputs and the seed, so the same inputs give the same game (Stage 4: deterministic sim). */
export const STEP = 1 / 60;

export interface Game {
  readonly seed: number;
  cauldron: CauldronNight | null;
  /** The world's speed (rules/slowTime.ts, Ed 2026-10-06): 1, or legendCircle.slow.scale while she stands in a sleeping or restless
   *  legend's circle, eased between. The world's clock (clock.time) runs at it; hers (herTime) at full speed. For the music too. */
  timeScale: number;
  /** Her clock (seconds): everything of hers (moving, blinking, her spells, 💌s, sigils, knocks, health, hat) runs on it, at full speed. */
  herTime: number;
  /** Every legend's circle (rules/slowTime.ts legendRings), found once. */
  rings?: import("./slowTime").Ring[];
  readonly tuning: Tuning;
  readonly map: ForestMap;
  readonly forest: Forest;
  /** Every creature made so far (ids are their places here); it grows as wild areas do (rules/growth.ts). */
  readonly creatures: Creature[];
  /** Wild areas growing wave by wave, as counts until a witch comes near (rules/growth.ts). */
  growth: GrowthState;
  readonly clock: Clock;
  /** Every player's witch; the first is this machine's (the camera follows her). */
  witches: Witch[];
  /** witches[0]'s body, leash and spell (the view and older code read these). */
  witch: WitchState;
  leash: LeashState;
  spells: SpellState;
  camera: CameraState;
  party: PartyState;
  berries: BerryState;
  /** Gathered mushrooms, the kitchen's baskets and active potions. */
  mushrooms: MushroomState;
  /** Real time not yet simulated (under one STEP), and its share of a step, for drawing between
   *  the last two steps (see interpolated). */
  acc: number;
  alpha: number;
  /** Fights, shots and soundsystems' health (rules/combat.ts). */
  combat: CombatState;
  /** What knockouts did in this frame's steps (for the view). */
  koEvents: KnockoutEvent[];
  /** Areas whose legend's quest is done (rules/quest.ts): friendly while wild. */
  friendly: Set<string>;
  /** The wild areas a witch has come down in lately (rules/wildWatch.ts): when, and when one was last on the ground there. */
  wildEntry: Map<string, WildEntry>;
  /** The creatures hunting a witch (rules/hunt.ts), by id. */
  hunts?: Set<number>;
  /** Quests done in this frame's steps (for the view). */
  questEvents: QuestEvent[];
  /** The islands found tonight (Ed, 2026-10-18): each legend's kind whose quest she did this night, in order. Saved to the sea
   *  chart only if the night is won (rules/win.ts found, app/chartSave.ts); lost, they're not kept. */
  islandsTonight: string[];
  /** The map's relics (rules/legends.ts): lying half buried, carried, or put down by a legend. */
  relics: Relic[];
  /** Tonight's travel trunk, a wearable to find in it (rules/finds.ts; Ed, 2026-10-21), or null: none on this map, or nothing
   *  she lacks (filled by the page from what she owns: fillTrunk). */
  trunk: Trunk | null;
  /** This frame's wave events (several steps' worth, or none): a soundsystem lost brings the next
   *  wave sooner (Ed, 2026-10-05), with the countdown it leaves, for the HUD and the music. */
  waveEvents: WaveEvent[];
  /** This frame's leash events (several steps' worth, or none), for the view: `leash.events` holds only the last step's. */
  leashEvents: LeashEvent[];
  /** Sigils lying loose on the ground for any witch to pick up (rules/stoneStacks.ts): scattered round a stone at its conversion. */
  loose: LooseSigil[];
  /** The rainbow waves on their way along the ley line (rules/rainbow.ts): when each set off from an early clear, and from where. */
  rainbows?: RainbowWave[];
  /** The night over and another on in its place (app/night.ts endNight, marked only under ?debug=sail): stepping it means a reader
   *  was left on the old night, and throws. */
  disposed?: boolean;
  /** The creatures by home area (rebuilt when one settles somewhere new). */
  byArea?: Map<string, Creature[]> | null;
  /** Game time of the last look for cleared areas (rules/clear.ts; game.ts stepClear). */
  clearedAt?: number;
  /** The areas' legends, by id (rules/creatures.ts: one an area), found once. */
  legendIds?: number[];
  /** This step's simulation level of detail (rules/simLod.ts): how many creatures in each, for the debug overlay. */
  lod?: LodCounts;
  /** The debug arena (?arena=, rules/arena.ts): its spec and the creatures it put down. */
  arena?: { spec: string; ids: number[] };
  /** The zoo's blocks' moods, as its block bar set them (rules/zooControls.ts; calm when not set). */
  zooMoods?: Map<string, import("./zooControls").ZooMood>;
  /** When she left the zoo (Ed, 2026-10-26): E at its little treehouse (rules/zoo.ts atZooExit), or pushing on out past its edge
   *  (over the waterfall, into space); the page then fades and takes her back (app/zooExit.ts). Unset while she's in it. */
  zooExit?: number;
  /** Seconds she's been pushing on out against the zoo's edge (ZOO_EDGE_PUSH takes her out). */
  zooPush?: number;
  /** The party's over (Ed, 2026-10-06: every soundsystem and the home ring's speakers destroyed): the afterparty, when it
   *  began and how far it has eased in (rules/partyOver.ts). Null while the party's on. */
  partyOver: PartyOver | null;
  /** The world put to bed while the night waits for her party spell (rules/partyOver.ts stepWorldAsleep): woken as it's cast. */
  asleepBeforeParty?: boolean;
  /** The end of the route (rules/win.ts): the stragglers, the victory lap, the night won. Null till the last wave lands. */
  win: WinState | null;
  /** One-shot presses (rise, sigil, spell...) waiting for the next step. */
  pending: Partial<Controls>;
  /** Where each witch and creature was before the latest step, for interpolation. */
  prev: { witches: { x: number; z: number; lift: number }[]; creatures: Float64Array; camera: CameraState | null };
  /** Each dancefloor speaker's state, in map.dancefloor.speakers' order. */
  speakers: SpeakerState[];
  /** When each home speaker was booted (Ed, 2026-10-06: they start as small runestones and the boot pulse turns them into
   *  speakers): the game time the pulse reached it, or null while it's still a stone. See bootSpeaker and speakerBoot. */
  speakerBoot: (number | null)[];
  /** The beat clock: beats by game time, its tempo rising wave by wave (rules/beat.ts). */
  beat: BeatClock;
  /** The night's set (rules/musicSet.ts; Ed, 2026-10-11): the music's arc for this night, a step a wave. */
  musicSet: NightSet | null;
  /** Every knockdown (any witch's), in order (Ed, 2026-10-09): `at` when she went down (the record scratched, the music
   *  stopped) and `back` when her wait behind the decks ends (a bar line: she's put a new record on, and its music starts
   *  from the top, re-seeded: "Being knocked down changes the music to a random new seed"), in game time. rules/musicPlan.ts
   *  musicCue and formClock, rules/djSet.ts (her scratching on the new record). */
  knockdowns: { at: number; back: number }[];
  /** The dancefloor's tile lights (rules/dancefloor.ts). */
  floor: FloorState;
  /** The party witches on the dancefloor, and the players idling into the party (rules/partyWitches.ts). */
  partyWitches: PartyWitches;
  /** The spots of witches round the beach (rules/beach.ts), or null (no beach). */
  beach: BeachWitches[] | null;
  /** Running totals for the playtest log (src/platform/playtestLog.ts): berries eaten, creatures invited, evolutions. */
  tally: { berries: number; invites: number; evolved: number; /** soundsystems a legend stamped on as it turned angry (legends.stomp) */ stomps?: number };
  /** Where the opening shot looks: her seat on the treehouse as drawn (the view sets it; the art knows where it is). */
  introFocus?: { x: number; y: number; z: number };
  /** The new opening's wake-up in her bedroom (rules/wakeUp.ts): set as the chart's dive lands, kept after (she's up, dressed). */
  wake?: WakeState;
  /** The island's built (the night's art drawn; main.ts sets it): the house's art swaps in its finished pieces then (nothing waits on it). */
  islandReady?: boolean;
}

/** A soundsystem destroyed ("home" for the dancefloor's ring): the next wave `cut` seconds sooner,
 *  `left` seconds away now (0: it comes at once). */
/** The waves' events: a soundsystem lost (cut: seconds it took off the countdown; left: seconds then left); an area cleared
 *  of its wild creatures, its soundsystem rising (rules/clear.ts); a wave come to an area whose soundsystem stands already
 *  (cleared before it, Ed 2026-10-07: it changes nothing in the rules; the view's fireworks and lasers). */
export type WaveEvent =
  | { kind: "soundsystemLost"; key: string; x: number; z: number; at: number }
  | { kind: "areaCleared"; key: string; x: number; z: number; at: number }
  | { kind: "waveCelebrate"; key: string; x: number; z: number; at: number; wave: number };

export interface Controls extends Intent, Partial<LeashControls>, InviteControls {
  /** This player's pause page state, when supplied by a recorded input stream. Other panels omit it. */
  pausePage?: boolean;
  /** At a dressing station and choosing (ui/stationPanel.ts): the camera eases in on her (camera.station). */
  framing?: boolean;
  /** And the part of her the row being chosen is about (config/wardrobe.json frame): the camera zooms in on it
   *  (camera.station.parts; Ed, 2026-10-23: "zoom in on what's being chosen"). */
  framePart?: string | null;
  /** Debug (O): the nearest area legend turns happy (as if its quest were done). */
  happyNearest?: boolean;
  /** The party spell's button (or its key) pressed: the game starts (rules/party.ts castPartySpell). */
  castParty?: boolean;
  /** Auto-talk (the player's setting, on unless turned off), and Talk held (how she talks with it off). */
  autoTalk?: boolean;
  talkHeld?: boolean;
  /** +1 zoom out a step, -1 zoom in a step, 0 nothing, this frame. */
  zoom: number;
  /** Playtest keys: bring the next wave now; pause or resume the wave timer. */
  nextWave?: boolean;
  pauseWaves?: boolean;
  /** Debug: the nearest party animal eats a berry now. */
  feedNearest?: boolean;
  /** Debug: every dancefloor speaker on to its next state (playing, damaged, destroyed). */
  cycleSpeakers?: boolean;
  /** The spell button: cast the equipped spell. */
  spell?: boolean;
  /** The sigil button (E, the pad's square, touch's) is down this frame: since a press that picked up or put down, a run (rules/leash.ts, Ed 2026-10-15). */
  sigilHeld?: boolean;
  /** E or touch's sigil button is down this frame: held long enough with nothing to do, she puts her hat down (rules/hat.ts putHat; not the pad's square: its hat is triangle). */
  hatHold?: boolean;
  /** The hat button (the pad's triangle, Ed 2026-10-15): her hat put down at her feet, or a hat of hers near her picked up and put on (rules/sigilButton.ts). */
  hat?: boolean;
  /** The dash button (rules/dash.ts). */
  dash?: boolean;
}

export function newWitchPlayer(id: number, x: number, z: number, t: Tuning, seated = true): Witch {
  // (at her decks, on the treehouse deck: rules/treehouse.ts; in the zoo, standing on its plaza)
  return { id, body: { ...newWitch(x, z), seated, ...(t.treehouse.deck?.on ? { perch: true } : {}) }, leash: newLeash(), spells: newSpells(t), dash: newDash(), cool: newCool(t.dash.cooldown), invites: newInvites(), health: newHealth(t), ko: null, hat: newHat() };
}

export function newGame(seed: number, tuning: Tuning, players = 1, ready?: MapPrep | ForestMap): Game {
  resetFight(); useData(COMBAT); // (the last night's fight settings out: a night starts as a fresh page's)
  // (ready: the map made already for this seed and tuning (app/mapPrep.ts readyMap), or its heavy parts, made in a worker while the chart flew)
  const map = !ready ? generateMap(seed, tuning) : Array.isArray((ready as MapPrep).neighbours) ? hydrateMap(seed, tuning, ready as MapPrep) : (ready as ForestMap);
  const witches = Array.from({ length: Math.max(1, players) }, (_, i) => newWitchPlayer(i, map.start.x + i * 2, map.start.z, tuning, !map.zoo?.layout));
  if (witches.length > 1) for (const W of witches) { W.time = 0; W.paused = false; W.pending = {}; }
  const body = witches[0].body, creatures = spawnCreatures(map), forest = new Forest(map);
  // the night's set (Ed, 2026-10-11: "Each night should be a full set"; rules/musicSet.ts): its arc for the music (the tempo stays the
  // gameplay's: Ed, "tempo is set by the gameplay")
  const set = nightFor(map, seed);
  const g = {
    seed, tuning, map, forest, creatures, clock: newClock(), witches, cauldron: null as CauldronNight | null,
    get witch() { return this.witches[0].body; }, set witch(w: WitchState) { this.witches[0].body = w; },
    get leash() { return this.witches[0].leash; }, set leash(l: LeashState) { this.witches[0].leash = l; },
    get spells() { return this.witches[0].spells; }, set spells(s: SpellState) { this.witches[0].spells = s; },
    camera: newCamera(tuning, body.x, witchHeight(body, tuning), body.z), party: newParty(map), berries: newBerries(map, tuning), mushrooms: newMushrooms(map, forest),
    speakers: map.dancefloor.speakers.map(() => "playing" as SpeakerState),
    speakerBoot: map.dancefloor.speakers.map(() => null),
    beat: newBeatClock(tuning.beat.bpm, waveTempo(tuning, 0)), knockdowns: [] as { at: number; back: number }[], musicSet: set,
    floor: newFloor(), partyWitches: newPartyWitches(seed), beach: newBeachWitches(seed, map.bounds, tuning),
    combat: newCombat(), koEvents: [] as KnockoutEvent[], friendly: new Set<string>(), wildEntry: new Map(), questEvents: [] as QuestEvent[], islandsTonight: [] as string[], waveEvents: [] as WaveEvent[], leashEvents: [] as LeashEvent[], loose: [] as LooseSigil[], relics: placeRelics(map, forest), trunk: null as Trunk | null, tally: { berries: 0, invites: 0, evolved: 0 }, growth: newGrowth(), partyOver: null as PartyOver | null, win: null as WinState | null,
    acc: 0, alpha: 1, timeScale: 1, herTime: 0, pending: {}, prev: { witches: [], creatures: new Float64Array(creatures.length * 2), camera: null },
  };
  g.trunk = placeTrunk(map, forest, g.relics);
  // Home is its ring of speakers, each its own soundsystem in the fight (Ed, 2026-10-08; rules/speakers.ts).
  const C = tuning.combat;
  map.dancefloor.speakers.forEach((p, i) => g.combat.sounds.set(speakerKey(i), { hp: C.speakerHealth, max: C.speakerHealth, x: p.x, z: p.z, radius: C.speakerRadius }));
  // The zoo (rules/zoo.ts; Ed, 2026-10-13: "Default state: calm"): every block's creatures calm, as a friendly area's (a legend's
  // quest done): wild, to be invited, but leaving her and her party be (its block bar changes it: rules/zooControls.ts).
  if (map.zoo) for (const [cx, cy] of map.cells) { const k = `${cx},${cy}`; g.friendly.add(k); for (const c of g.creatures) if (!c.boss && c.cell[0] === cx && c.cell[1] === cy) c.friendly = true; }
  return g as Game;
}

/** The presses that happen once (not held): kept for the next step if a frame runs none. */
const ONE_SHOT = ["toggleMode", "sigil", "place", "hat", "cycle", "cycleBack", "spell", "castParty", "dash", "nextWave", "pauseWaves", "feedNearest", "inviteNearest", "happyNearest"] as const;
const NO_INPUT: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };

/** Her local pause page. Station panels never stop a multiplayer night. */
export function setWitchPaused(g: Game, id: number, paused: boolean): void {
  const W = g.witches[id];
  if (!W) throw new RangeError("Unknown witch");
  if (g.witches.length === 1) g.clock.paused = paused;
  else { W.paused = paused; g.clock.paused = g.witches.every(w => w.paused); }
}

/** Advance by realDt in fixed steps, consuming each one-shot once. Explicit input arrays must
 * contain one entry per stable witch ID. Legacy scalar callers control the host, with neutral guests. */
export function stepGame(g: Game, controls: Controls | readonly Controls[], realDt: number): void {
  if (g.disposed) throw new Error("stepGame: a night that has ended (a reader left on the old night)");
  const inputs: readonly Controls[] = Array.isArray(controls) ? controls : g.witches.map((_, i) => i === 0 ? controls as Controls : NO_INPUT);
  if (inputs.length !== g.witches.length) throw new RangeError("One input is required for each witch");
  const multi = g.witches.length > 1;
  const edges = ONE_SHOT;
  const queues = inputs.map((c, i) => {
    if (c.pausePage !== undefined) setWitchPaused(g, i, c.pausePage);
    if (c.cycleSpeakers) g.speakers = g.speakers.map(nextSpeakerState);
    const P = (multi ? (g.witches[i].pending ??= {}) : g.pending) as Record<string, unknown>;
    for (const k of edges) if (c[k]) P[k] = true;
    if (c.zoom) P.zoom = c.zoom;
    return P;
  });
  if (multi) g.clock.paused = g.witches.every(W => W.paused);
  if (g.clock.paused || !(realDt > 0)) return;
  g.combat.events = []; if (g.combat.spells) g.combat.spells.events.length = 0; g.koEvents = []; g.questEvents = []; g.waveEvents = []; g.leashEvents = [];
  for (const w of g.witches) { w.invites.events = []; if (w.wake) w.wake.events = []; }
  if (g.wake) g.wake.events = [];
  g.acc = Math.min(g.acc + Math.min(realDt, MAX_STEP), MAX_STEP + STEP);
  while (g.acc >= STEP - 1e-9) {
    g.acc -= STEP;
    const steps = inputs.map((c, i) => {
      const P = queues[i], step: Controls = { ...c, zoom: 0 };
      for (const k of edges) { step[k] = !!P[k]; delete P[k]; }
      step.zoom = (P.zoom as number) ?? 0; delete P.zoom;
      return multi && g.witches[i].paused ? { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 } : step;
    });
    remember(g);
    setFloorSigils(gatherFloorSigils(g));
    try { fixedStep(g, steps); } finally { setFloorSigils(null); }
  }
  g.alpha = Math.max(0, Math.min(1, g.acc / STEP));
}

/** Each witch owns her timers; the legacy host clock remains the solo/view alias. */
export const witchTime = (g: Game, W: Witch): number => W.time ?? g.herTime;

/** The affection rules the 💌s and the view use (issue #87): the state machine's meter
 *  (rules/affection.ts). A full meter makes a wild one happy; she leashes it by picking up its rune (states.leash
 *  "pickup", rules/leash.ts), or by filling it again (the old "again"). How many letters fill it is the tuning's invites.hits;
 *  every 💌 that lands counts (no per-animal gap since 2026-10-06: her firing rate sets the pace); it drains at the
 *  tuning's invites.drain (states.json's affection.drain only when that's missing), after states.json's drainDelay. */
/** Napping (rules/creatures.ts stepNaps): asleep with a nap's end, so a letter can rouse it; not the party's over's sleep. */
const napper = (c: Creature): boolean => !!c.asleep && c.napUntil !== undefined;

export const affectionOf = (g: Game, W: Witch = g.witches[0]): Affection => {
  const t = g.tuning, s = W.invites, E = t.legends;
  const data = { ...STATES, partyEgg: E.partyEgg, affection: { ...STATES.affection, hits: meterHits(t), drain: t.invites.drain ?? STATES.affection.drain, gap: 0, legendDrain: E.partyDrain } };
  return {
    // A napper takes them (Ed, 2026-10-11: "Letters wake them"): the 💌 rouses it, wherever she is, and lands as any other (hit,
    // below). One asleep for good (the party's over: no napUntil) still lets them by.
    invitable: c => (napper(c) ? invitableNow({ ...c, asleep: false }, data) : invitableNow(c, data)), // (as if up: the letter wakes it)
    blocksLetters: c => !c.partyLegend && !c.asleep && !invitableNow(c, data) && blocksLetters(c), // (the egg: a happy legend takes them; a party legend lets them by)
    hit(c, amount, at) {
      if (c.level === 0) return; // Ed, 2026-10-31: no baby invitation, wake or meter.
      // (the creature's meter on the world's clock; her letters' events on hers: rules/slowTime.ts)
      if (napper(c)) Object.assign(c, { asleep: false, napUntil: undefined, lulled: undefined, wakeUntil: undefined, rest: 0 }); // (roused by it: up at once, as rules/inviteWakes.ts wakes its area)
      const was = stateOf(c), time = g.clock.time, party = !!c.partyLegend;
      hitAffection({ time, leash: k => inviteCreature(W.leash, k, k.x, k.z, time), stunFor: t.combat.daze, cheerFor: t.invites.cheer?.secs }, c, amount, time, data);
      if (was !== "happy" && castOn(t)) markAtStone(g, c); // (its sigil friend-coloured in its stone's stack: rules/stoneStacks.ts)
      if (stateOf(c) !== was || (c.partyLegend && !party)) s.events.push({ kind: "happy", x: c.x, z: c.z, at, id: c.id }); // (happy, or leashed; or a party legend)
    },
    affection: c => c.level === 0 ? null : affection({ time: g.clock.time }, c, data),
  };
};

/** A hit on witch `id` at game time `at`: it costs her a hit unless she's mid-blink (nowhere). */
/** The pull of the sigils witch `w` carries (Ed, 2026-10-06; rules/leashWeight.ts): its size, what drags beyond the free
 *  allowance, its direction and whether it's extreme. For the view and the debug overlay; the rules use the same. */
/** Hits to fill a meter, by level: the tuning's invites.hits, a legend's the party-legend egg's (legends.partyHits). */
export const meterHits = (t: Tuning): number[] => [...t.invites.hits.slice(0, 3), t.legends.partyHits];

export const leashLoad = (g: Game, w: Witch = g.witches[0]): LeashLoad => loadOf(w.leash.stack, g.creatures, w.body, g.tuning, pullOf(w.spells), !!w.leash.scatter); // (the Canoe hull's lighter: rules/broomParts.ts)

export function hitWitch(g: Game, id: number, worldAt: number, t: Tuning = g.tuning, blow?: Blow): void {
  // (her health, blinks, knocks and hat run on her clock, rules/slowTime.ts: the world's moment `worldAt` on hers, by how far it is from now)
  const w = g.witches[id];
  const at = (w ? witchTime(g, w) : g.herTime) + (worldAt - g.clock.time);
  if (!w || w.ko || potionPhase(g, w) || dashing(w.dash, at) || worldAsleep(g) || won(g)) return; // (the afterparty, the world before the party, or the night won: nothing hurts her)
  if (at < w.health.hurtAt + t.witchHealth.grace) return; // (just hit: a moment's grace, so a pack can't take all her hits at once)
  // The Helmet (rules/spells.ts; Ed, 2026-10-11: "The helmet gives you an extra hit and it's knocked off when hit"): worn, it
  // takes the blow, knocked off to lie beside her (her hat down: picked up and put back on as ever, rules/hat.ts).
  if (w.spells.hat === "helmet" && dropHat(w.hat, w.body.x + (w.body.facing ?? 1) * (t.spells.helmet?.drop ?? 1.2), w.body.z, at)) {
    w.health.hurtAt = at;
    g.koEvents.push({ kind: "helmetOff", at, x: w.body.x, z: w.body.z });
    if (blow) knockWitch((w.knock ??= newKnock()), w.body, blow, at, t);
    return;
  }
  if (hurt(w.health, at, t)) {
    const hatFloats = dropHat(w.hat, w.body.x, w.body.z, at, t.knockout.dropHat), streak = nextStreak(w.koStreak, at, t);
    w.koStreak = { n: streak, at };
    const house = deckOf(g.map, t)?.house; // (the house: back at the magic circle, up out of its floor, then the walk to her decks: rules/knockout.ts)
    const start = g.map.start, walk = house ? Math.hypot(start.x - house.circle.x, start.z - house.circle.z) / Math.max(1, t.groundSpeed * 0.5) : 0;
    // A legend's sigil she carried (rules/stoneStacks.ts) falls loose at the legend's feet, to pick up again.
    if (w.leash.tether) { const L = g.creatures[w.leash.tether.id]; g.loose.push({ id: L.id, x: L.x, z: L.z + runeOffset(L, t), at: g.clock.time, legend: true }); L.loose = true; w.leash.tether = null; }
    w.ko = knockOut(w.leash, g.creatures, at, t, { hatFloats, streak, ...(house ? { house: { rise: t.knockout.rise ?? 0, walk } } : {}) }); g.koEvents.push({ kind: "down", at, x: w.body.x, z: w.body.z });
    knockdownTempo(g.beat, t, g.clock.time); // (the beat speeds up: Ed, 2026-10-07, "the BPM goes up by 1 each time you die")
    // her wait ends on a bar line at the new tempo, the nearest to it (never under knockout.respawn.minScratch of scratching):
    // her scratching on the new record leads straight into its first downbeat (Ed, 2026-10-09; the wait a second or so off knockout.respawn
    // for it is fine: Ed, 2026-10-11)
    const off = g.clock.time - witchTime(g, w), ko = w.ko, min = ko.seatAt + (t.knockout.respawn?.minScratch ?? 0) + off;
    let bar = Math.round(beatAt(g.beat, ko.backAt + off) / 4);
    while (timeAt(g.beat, bar * 4) < min - 1e-6) bar++;
    ko.backAt = timeAt(g.beat, bar * 4) - off;
    g.knockdowns.push({ at: g.clock.time, back: ko.backAt + off });
    if (hatFloats) g.koEvents.push({ kind: "hatDropped", at, x: w.body.x, z: w.body.z });
    return;
  }
  // Thrown and staggered by it (rules/knock.ts); not by the blow that knocks her out.
  if (blow) knockWitch((w.knock ??= newKnock()), w.body, blow, at, t);
}

/** Where a blink may land: not in a tree's trunk, a rock or ruin, a soundsystem, a dancefloor
 *  speaker or the treehouse's tree (tuning dash.clear: each one's clearance in metres). */
export function blinkClear(g: Game, x: number, z: number, body: WitchState = g.witch): boolean {
  const C = g.tuning.dash.clear, near = (px: number, pz: number, r: number) => (px - x) ** 2 + (pz - z) ** 2 < r * r;
  if (g.forest.treesNear(x, z, C.tree).some(p => near(p.x, p.z, C.tree))) return false;
  if (g.forest.decorNear(x, z, C.decor).some(p => near(p.x, p.z, C.decor))) return false;
  for (const [k, s] of g.combat.sounds) if (!isHomeKey(k) && near(s.x, s.z, C.sound)) return false; // (home's speakers: below)
  if (g.map.zoo?.layout) return !(body.mode === "ground" && (onLake(g.map.bounds, x, z, lakeKnobs(g.tuning).pad) || g.map.bounds.fence?.stop(body.x, body.z, x, z))); // (the zoo: no speakers or treehouse, Ed 2026-10-26)
  if (g.map.dancefloor.speakers.some(p => near(p.x, p.z, C.speaker))) return false;
  if (body.mode === "ground" && onLake(g.map.bounds, x, z, lakeKnobs(g.tuning).pad)) return false; // (on foot, never onto a lake: rules/lakes.ts)
  if (body.mode === "ground" && g.map.bounds.fence?.stop(body.x, body.z, x, z)) return false; // (on foot, never over the zoo's fence)
  return !near(g.map.treehouse.x, g.map.treehouse.z, C.treehouse);
}

/** The tuning witch W moves by: the game's with her broom's parts' numbers (rules/broomParts.ts: the
 *  Workshop, Ed 2026-10-23); the bare broom's is the step's own. */
export const witchTuning = (g: Game, W: Witch): Tuning => bagTuning(broomTuning(g.tuning, W.spells.parts), W.spells.bag); // (and her bag's 💌 stats: rules/bags.ts)

/** Her blinks in hand before the cooldown: the tuning's two (Ed, 2026-10-08), Hare's Dash bursts' more, the Twig bristles' one more. */
export const blinkCharges = (g: Game, W: Witch): number => broomTuning(g.tuning, W.spells.parts).dash.charges ?? 1;

/** Note where everything was before a step, for drawing between steps. */
function remember(g: Game): void {
  g.prev.witches = g.witches.map(w => ({ x: w.body.x, z: w.body.z, lift: w.body.lift }));
  const C = g.creatures, A = g.prev.creatures.length === C.length * 2 ? g.prev.creatures : (g.prev.creatures = new Float64Array(C.length * 2));
  for (let i = 0; i < C.length; i++) { A[2 * i] = C[i].x; A[2 * i + 1] = C[i].z; }
  g.prev.camera = { ...g.camera };
}

/** Run `draw` with the witches, creatures and camera eased between the last two steps by alpha
 *  (so motion is smooth whatever the display's rate), then put the simulated state back. */
let held = new Float64Array(0); // (the simulated positions while drawing: one array kept, not one a frame)
const carried: { x: number; z: number; flown?: number }[] = []; // (the 💌s and shots carried back, and where they were)
let carriedAt = new Float64Array(64);
export function interpolated<T>(g: Game, draw: () => T): T {
  const k = g.alpha, pw = g.prev.witches, pc = g.prev.creatures, C = g.creatures;
  if (k >= 1 || !pw.length || pc.length !== C.length * 2) return draw();
  if (held.length < C.length * 2) held = new Float64Array(C.length * 4);
  const bodies = g.witches.map(w => w.body), camera = g.camera, cx = held;
  const mix = (a: number, b: number) => a + (b - a) * k;
  g.witches.forEach((w, i) => { const p = pw[i]; if (p) w.body = { ...w.body, x: mix(p.x, w.body.x), z: mix(p.z, w.body.z), lift: mix(p.lift, w.body.lift) }; });
  // (a jump further than a charge covers in a slow frame is a teleport: not blended)
  for (let i = 0; i < C.length; i++) { cx[2 * i] = C[i].x; cx[2 * i + 1] = C[i].z; const ex = pc[2 * i] - C[i].x, ez = pc[2 * i + 1] - C[i].z; if (ex * ex + ez * ez < 400) { C[i].x = mix(pc[2 * i], C[i].x); C[i].z = mix(pc[2 * i + 1], C[i].z); } }
  // 💌s and shots in flight: carried back along their velocity to the moment drawn (not stored a
  // step back: they come and go every step), so on a display faster than the steps they glide
  // rather than holding every other frame (Ed's playtest, 2026-10-06: "it feels low"). Kept in
  // arrays reused frame to frame (no garbage a frame).
  const back = (1 - k) * STEP;
  carried.length = 0; let nv = 0;
  const keep = (o: { x: number; z: number; flown?: number }) => {
    if (carriedAt.length < nv + 3) { const a = new Float64Array(Math.max(64, carriedAt.length * 2)); a.set(carriedAt); carriedAt = a; }
    carried.push(o); carriedAt[nv++] = o.x; carriedAt[nv++] = o.z; carriedAt[nv++] = o.flown ?? NaN;
  };
  if (back > 0) {
    for (const w of g.witches) for (const L of w.invites.letters) {
      if (L.kind) continue;
      keep(L);
      L.x -= L.vx * back; L.z -= L.vz * back; L.flown = Math.max(0, L.flown - Math.hypot(L.vx, L.vz) * back);
    }
    for (const sh of g.combat.shots) {
      keep(sh);
      if (!sh.lob) { sh.x -= sh.vx * back; sh.z -= sh.vz * back; continue; }
      // (A lob is where its arc puts it at the moment drawn.)
      const L = sh.lob, q = Math.max(0, Math.min(1, (g.clock.time - back - L.at) / Math.max(0.01, L.lands - L.at)));
      sh.x = L.fx + (L.tx - L.fx) * q; sh.z = L.fz + (L.tz - L.fz) * q;
    }
  }
  const pcam = g.prev.camera;
  if (pcam) g.camera = { ...camera, tx: mix(pcam.tx, camera.tx), ty: mix(pcam.ty, camera.ty), tz: mix(pcam.tz, camera.tz), lift: mix(pcam.lift, camera.lift), zoom: mix(pcam.zoom, camera.zoom), ax: mix(pcam.ax, camera.ax), az: mix(pcam.az, camera.az), pull: pcam.pull === undefined || camera.pull === undefined ? camera.pull : mix(pcam.pull, camera.pull), intro: pcam.intro === undefined || camera.intro === undefined ? camera.intro : mix(pcam.intro, camera.intro) };
  try { return draw(); }
  finally {
    g.witches.forEach((w, i) => { w.body = bodies[i]; });
    for (let i = 0; i < C.length; i++) { C[i].x = cx[2 * i]; C[i].z = cx[2 * i + 1]; }
    g.camera = camera;
    for (let j = 0; j < carried.length; j++) { const o = carried[j]; o.x = carriedAt[3 * j]; o.z = carriedAt[3 * j + 1]; if (!Number.isNaN(carriedAt[3 * j + 2])) o.flown = carriedAt[3 * j + 2]; }
  }
}

/** One fixed step of the whole game. */
function fixedStep(g: Game, controls: readonly Controls[]): void {
  // Two clocks (rules/slowTime.ts): the world's runs at timeScale (slowed in a sleeping legend's circle), hers at full speed.
  stepTimeScale(g, STEP);
  const dt = STEP * g.timeScale, hdt = STEP;
  g.clock.time += dt;
  g.herTime += hdt;
  for (const W of g.witches) if (W.time !== undefined) W.time += hdt;
  // Explicit legacy cauldron preview owns its own inventory/inputs while enabled.
  if (!g.cauldron) stepMushrooms(g);
  const wave = g.party.wave;
  const legends = (g.legendIds ??= g.creatures.filter(k => k.boss).map(k => k.id));
  const t = g.tuning;
  const motions = g.witches.map((W, i) => {
    const ht = witchTime(g, W);
    let c = controls[i];
    if (potionPhase(g, W)) c = { moveX: 0, moveZ: 0, toggleMode: false, zoom: c.zoom };
    if (g.witches.length > 1 && W.house?.slept) {
      // Finished the existing bed hold: asleep until this shared night ends. No new wake gesture.
      W.body = { ...W.body, vx: 0, vz: 0 };
      return { W, c: NO_INPUT, ht, was: W.body, deck: deckOf(g.map, t), perchTurn: 0, firing: false, LV: null as ReturnType<typeof leashView> | null };
    }
    // The party spell (Ed, 2026-10-06): until it's cast, and while she casts it, she stands behind the decks: no moving,
    // rising, blinking, spells or 💌s (the camera's zoom still works). Its button, Enter, or her spell key (R, the pad's L3, touch
    // "spell") while the game waits casts it, rather than the boost (the hold drops that spell press).
    // Waking up in her bedroom (the new opening, rules/wakeUp.ts): the alarm, the snoozes, the stretch, then walking the bedroom
    // with the spell not yet cast (her decks cast it, once she's dressed and down the trunk).
    const waking = wakeOf(g, W);
    if (waking) c = stepWake(g, c, ht, t.opening?.wake ?? WAKE_DEFAULT, W);
    if (c.castParty || c.spell) castPartySpell(g.party, g.map, g.clock.time);
    // Then her needle-drop routine at the decks (Ed, 2026-10-07: held till it ends, the first music dropping then; rules/djSet.ts).
    // (Woken in her bedroom, waiting for her to reach her decks: neither holds her on the way, the house's slow time making them
    // minutes; seated there, E having cast it, both hold her as ever.)
    if ((g.witches.length > 1 ? W.body.seated : !waking || W.body.seated) && (heldBySpell(g.party, g.clock.time) || heldByRoutine(g, g.clock.time))) c = { moveX: 0, moveZ: 0, toggleMode: false, zoom: c.zoom };
    // Her own movement plays by her broom's parts (rules/broomParts.ts: speeds, turning, rise and fall, the cooldowns, blinks; the
    // bare broom's the tuning's own): `tw` for her steps, blinks and cooldowns below, `t` for the rest.
    const tw = broomTuning(t, W.spells.parts);
    // Her broom's spell (rules/spells.ts): Speed's boost, or at once Ley jump (to the ley line's pulse) or Ground pound (rules/brooms.ts).
    if (c.spell && !W.ko && castSpell(W.spells, ht, t, W.spells.broom === "leyjump" ? !!leyJumpTarget(g) : W.spells.broom === "pound" ? canPound(W.body) : true)) {
      if (W.spells.broom === "leyjump") leyJump(g, W, (x, z) => blinkClear(g, x, z, W.body));
      else if (W.spells.broom === "pound" && groundPound(g, W, t)) { W.landedAt = ht; if (tw.cooldown?.shared) coolSpend(W.cool, tw.riseCooldown ?? 0, coolRoom(tw, blinkCharges(g, W))); } // (a landing, for the shared cooldown too)
    }
    // The speed boost: her speeds times its multiplier while it's on.
    const charges = blinkCharges(g, W); // (two blinks before the cooldown, Ed 2026-10-08; the Twig bristles one more)
    // One cooldown for her dodge and her take-off (Ed, 2026-10-15; rules/cooldown.ts): a counter with room for her blinks, a dodge
    // adding dash.cooldown, a take-off cooldown.rise, a landing riseCooldown (the Jet nozzles halve the last two); it drains on her clock.
    const shared = !!tw.cooldown?.shared, room = coolRoom(tw, charges);
    if (shared) stepCool(W.cool, hdt);
    // Her speed: the boost spell, a slow, and firing.
    const firing = W.invites.burstLeft > 0 || (!!c.fire && t.invites.on && W.body.mode === "ground" && !W.body.seated);
    const boost = speedMultiplier(W.spells, ht, tw) * (W.slowUntil !== undefined && g.clock.time < W.slowUntil ? W.slowMult ?? 1 : 1)
      * (firing && W.body.mode === "ground" ? t.invites.fireSlow ?? 1 : 1);
    // Knocked out: no input but the camera's zoom while it plays out.
    if (W.ko) c = { moveX: 0, moveZ: 0, toggleMode: false, zoom: c.zoom };
    // Staggered by a blow (rules/knock.ts): no moving, rising, blinking or 💌s for a moment.
    else if (stunned(W.knock, ht)) c = { moveX: 0, moveZ: 0, toggleMode: false, zoom: c.zoom, sigil: c.sigil, place: c.place, cycle: c.cycle, cycleBack: c.cycleBack };
    // Her movement turned (pack combat: the bat's screech, rules/combat/packs.ts): her steering swung, wavering, as her aim is by the stoat's dance.
    else if (W.confused?.move && ht < W.confused.until && W.body.mode === "ground") { const a = W.confused.drift * Math.sin(ht * 2.3), cs = Math.cos(a), sn = Math.sin(a); c = { ...c, moveX: c.moveX * cs - c.moveZ * sn, moveZ: c.moveX * sn + c.moveZ * cs }; }
    // Grounded by who follows her (Ed, 2026-10-18: "One adult stops you taking off. Three young do.", by weight; "you try and fly
    // but get pulled down"; rules/leashWeight.ts groundedBy, leash.grounded): the press keeps her on the ground, dropped before the
    // cooldown's (so it spends none), and is said, the "grounded" leash event: the view draws her lifting off and yanked back down
    // by her taut, blazing leashes (render/view/witch.ts groundedHop, render/leash/stack.ts drawBond) and the landing's thud
    // (platform/audio/sfxCues.ts). Drawn only: she never leaves the ground, so it's no dodge. Only a take-off from the ground: up
    // in the treetops, or coming down, she flies on as before.
    if (c.toggleMode && W.body.mode === "ground" && !W.body.seated && !g.map.bounds.fence && groundedBy(W.leash.stack, g.creatures, t).grounded) { // (never in the zoo: flying is the only way over its fences, Ed 2026-10-26, so nothing holds her down)
      c = { ...c, toggleMode: false };
      g.leashEvents.push({ kind: "grounded", id: W.id, x: W.body.x, z: W.body.z, at: ht });
    }
    // No coming down over a lake (Ed, 2026-10-23: "At the moment you can press x to leave treetop mode while over a lake; you go
    // lower and move more slowly. I don't think you should be able to do that"): up in the treetops, or rising, over the water (the
    // lake test with its pad, as on foot: rules/lakes.ts), the press is dropped and she flies on at full height and speed; and is
    // said, the "lakeHold" leash event: the refusal's soft "nope", as for a sigil refused (platform/audio/sfxCues.ts).
    if (c.toggleMode && (W.body.mode === "treetop" || W.body.mode === "rising") && g.map.bounds.lakes && onLake(g.map.bounds, W.body.x, W.body.z, lakeKnobs(t).pad)) {
      c = { ...c, toggleMode: false };
      g.leashEvents.push({ kind: "lakeHold", id: W.id, x: W.body.x, z: W.body.z, at: ht });
    }
    // Just landed: no rising again till riseCooldown seconds after (Ed, 2026-10-11: "players rise to the treetops instead of
    // dodging"; rising takes her out of ground mode at once).
    if (c.toggleMode && W.body.mode === "ground" && !W.body.seated && (shared ? !coolReady(W.cool, tw.cooldown?.rise ?? 0, room) : ht < (W.landedAt ?? -Infinity) + (tw.riseCooldown ?? 0))) c = { ...c, toggleMode: false }; // (the Jet nozzles' shorter: rules/broomParts.ts; shared: the counter must have room for the take-off)
    const was = W.body;
    if (!shared) rechargeDash(W.dash, ht, charges, tw.dash.cooldown);
    // A blink (Decoy, Beaver: it leaves a waiting 💌 where she was).
    // (A press is held for dash.buffer seconds until it can go: pressed a moment early still blinks.)
    if (c.dash) W.dash.bufferUntil = ht + tw.dash.buffer;
    if (ht <= (W.dash.bufferUntil ?? -Infinity) && !potionPhase(g, W) && !W.ko && !stunned(W.knock, ht)
      && startDash(W.dash, was, c.moveX, c.moveZ, ht, tw, g.map.bounds, (x, z) => blinkClear(g, x, z, W.body), charges, tw.dash.chain, c.aimX ?? 0, c.aimZ ?? 0, shared ? coolReady(W.cool, tw.dash.cooldown, room) : undefined)) {
      W.dash.bufferUntil = undefined;
      if (shared) coolSpend(W.cool, tw.dash.cooldown, room); // (the dodge's share of the one cooldown)
      if (W.spells.broom === "battering") batter(g, W.dash.fromX, W.dash.fromZ, W.dash.toX, W.dash.toZ, t); // (Battering: what's in her path is stunned)
    }
    const deck = guestDeck(deckOf(g.map, t), g, W), fallsOff = deck?.house && !hasBroom(W) ? { ...deck, house: { ...deck.house, fall: { ...deck.house.fall, on: true } } } : deck; // Movement-only guest floor; no broom still falls off the Terrace.
    if (!potionPhase(g, W)) W.body = applyDash(W.dash, stepWitch(was, c, hdt, boost === 1 ? tw : { ...tw, groundSpeed: tw.groundSpeed * boost, treetopSpeed: tw.treetopSpeed * boost }, g.map.bounds, loadOf(W.leash.stack, g.creatures, was, t, pullOf(W.spells), !!W.leash.scatter), fallsOff)); // (her sigils' pull: rules/leashWeight.ts; the treehouse deck: rules/treehouse.ts)
    // (the zoo: flying or walking on out against its edge, over the waterfall, takes her out of it, Ed 2026-10-26: "If you fly off the
    // edge of the map in the zoo you exit as well"): pushing on outward where the edge's soft hold has her (its last map.push metres,
    // as the beach's stargazing reckons it: rules/witch.ts), for ZOO_EDGE_PUSH seconds, on foot or flying
    if (g.map.zoo?.layout) {
      const Ld = g.map.bounds.land, B = W.body;
      const held = !!Ld && !B.seated && Ld.distAt(B.x, B.z) < (t.map?.push ?? 0) * 0.6 && seaward(B, c, g.map.bounds) === true;
      const pushed = held ? ((g.witches.length > 1 ? W.zooPush : g.zooPush) ?? 0) + hdt : 0;
      if (g.witches.length > 1) W.zooPush = pushed; else g.zooPush = pushed;
      if (pushed >= ZOO_EDGE_PUSH) g.zooExit ??= ht;
    }
    if (waking) keepInBedroom(g, W); // (the bedroom's door shut till she's up: rules/wakeUp.ts)
    if (W.knock && !potionPhase(g, W)) W.body = stepWitchKnock(W.knock, W.body, hdt, t, g.map.bounds, (x, z) => blinkClear(g, x, z, W.body));
    if (was.mode !== "ground" && W.body.mode === "ground") { W.landedAt = ht; if (shared) coolSpend(W.cool, tw.riseCooldown ?? 0, room); } // (landed: the rise cooldown starts; shared, the landing's share of the one cooldown)
    if (shared && was.mode === "ground" && !was.seated && W.body.mode === "rising") coolSpend(W.cool, tw.cooldown?.rise ?? 0, room); // (taken off: its share; not her first step off the decks)
    if (shared) { const wait = coolWait(W.cool, tw.dash.cooldown, room); if (wait > 0) W.dash.readyAt = ht + wait; } // (the dash's readyAt kept true to the counter, for the reticle and the buffer)
    // On the treehouse deck or off it (rules/treehouse.ts): landed on it, or risen off it.
    const onDeck = (b: WitchState) => !!b.perch && b.mode === "ground", perchTurn = !was.seated && onDeck(was) !== onDeck(W.body) ? (onDeck(W.body) ? 1 : -1) : 0;
    // A party legend on her leash (the Easter egg): not a step past legends.partyReach of it, blinking, flying or thrown (rules/partyLegend.ts).
    if (t.legends.partyEgg && !potionPhase(g, W)) { const P = pinWitch(W.body, W.leash.stack, g.creatures, t.legends.partyReach, g.clock.time, W.pinned ?? null); W.body = P.body; W.pinned = P.pinned; }
    // A sleeping legend's sigil she carries (rules/stoneStacks.ts): not a step past its tether, blinking, flying or thrown.
    if (W.leash.tether && !potionPhase(g, W)) { const P = tetherWitch(W.body, W.leash.tether, g.creatures, g.clock.time, W.pinned ?? null); W.body = P.body; if (P.pinned) W.pinned = P.pinned; }
    return { W, c, ht, was, deck, perchTurn, firing, LV: null as ReturnType<typeof leashView> | null };
  });
  if (g.cauldron) {
    const routed = stepCauldronNight(g, motions.map(m => m.c), hdt);
    motions.forEach((m, i) => { m.c = routed[i]; });
  }
  const c = motions[0].c;
  g.camera = stepCamera(g.camera, c.zoom, { x: g.witch.x, y: witchHeight(g.witch, g.tuning), z: g.witch.z }, { x: g.witch.vx, z: g.witch.vz }, g.witch.lift, hdt, g.tuning, !!g.witch.seated, g.introFocus, coastOf(g), g.tuning.camera.circle?.on ? legendCircleNear(g, g.witch)?.legend ?? null : null, onTreehouse(g), !!c.framing && onTreehouse(g), c.framePart ?? null); // (in a legend's circle: the lower view, camera.circle; indoors, camera.house; choosing at a station, camera.station)
  // The afterparty (rules/partyOver.ts): the waves have stopped for good.
  // The world before the party is the afterparty's (Ed, 2026-10-26): asleep in bed, or got up as the spell's cast.
  stepWorldAsleep(g, g.clock.time);
  const over = !!g.partyOver, calm = over || won(g); // (calm: the afterparty, or the night won (rules/win.ts): no waves, no fights)
  const still = calm || worldAsleep(g); // (and the world before the party: no fights, the legends still, nothing grows; its waves wait as ever, stepParty)
  const lapping = g.win?.phase === "lap"; // (the victory lap: its pulses race along the line, the waves done with: rules/win.ts)
  if (c.pauseWaves && !calm) g.party.paused = !g.party.paused;
  const celebrate = (a: Partified, wave: number) => { if (a.soundsystem) g.waveEvents.push({ kind: "waveCelebrate", key: cellKey(a.cell), x: a.soundsystem.x, z: a.soundsystem.z, at: g.clock.time, wave }); };
  if (c.nextWave && !calm && !lapping) { spreadWave(g.party, g.map, g.clock.time, celebrate); resetPulse(g.party, g.map, g.clock.time); } // (the pulse on from the stone it brought on)
  if (!calm && !lapping) stepParty(g.party, g.map, g.clock.time, dt, g.witches.every(W => !!W.body.seated), celebrate, tempoRate(g.beat, t));
  // Each wave brings its tempo, eased in from the block line its music lands on.
  if (g.party.wave !== g.beat.wave) waveArrived(g.beat, g.tuning, g.party.wave, g.clock.time);
  if (!still) stepLegends(g, legends, !!c.happyNearest);
  for (const { W, ht } of motions) {
    if (W.ko) {
      const wasMoved = W.ko.moved, r = stepKnockout(W.ko, W.body, W.leash, g.creatures, g.map, ht, k => g.party.areas.has(k), g.koEvents);
      W.body = r.body;
      if (g.koEvents.some(e => e.kind === "released" && e.at === ht)) g.byArea = null; // (let go happy where they stand: indexed there now)
      // The cut to her decks (the "cut" event, render/koIris.ts): the camera's there at once, not gliding over the map.
      if (W.ko.moved && !wasMoved && W === g.witches[0]) g.camera = { ...g.camera, tx: W.body.x, ty: witchHeight(W.body, t), tz: W.body.z, vx: 0, vy: 0, vz: 0, ax: 0, az: 0 };
      if (r.done) { W.ko = null; W.health.hp = t.witchHealth.hits; W.health.repairAt = Infinity; }
    }
    repair(W.health, ht, t);
    // The Healing ring (rules/spells.ts): by her hat where it lies, on the ground, she heals a hit every few seconds.
    if (stepHealingRing(W.spells, W.health, W.body.mode === "ground" ? hatsDown(W) : [], W.body.x, W.body.z, ht, t)) g.koEvents.push({ kind: "healed", at: ht, x: W.body.x, z: W.body.z });
  }
  const B = g.berries, busy = (id: number) => B.feeding.has(id) || B.evolving.has(id);
  // (No growth on a clock: every area is peopled from the start by its place on the route, Ed 2026-10-07; rules/creatures.ts.)
  if (!still && !castOn(t)) stepClear(g); // (with the stacks on, a stone converts only by her spell or its wave: rules/stoneStacks.ts)
  // (in the treehouse her followers guard home as if their sigils were placed there, her stack unchanged: rules/houseGuard.ts)
  for (const motion of motions) {
    const { W } = motion;
    const LV = leashView(W, g.creatures, g.map, t);
    updateModes(LV.stack, LV.placed, g.creatures, W.body, W.body.mode === "ground" && !W.body.seated && !W.body.perch && !W.ko, g.map, g.clock.time); // (posse or travelling: rules/travel.ts)
    motion.LV = LV;
  }
  g.lod = newLodCounts();
  if (!still) stepWildWatch(g, t); // (before the fights: those just watching her hold off this very step)
  if (!still) stepHunts(g, t); // (then the woken areas' own hunt her: rules/hunt.ts)
  if (!still) stepFights(g, t, dt, busy);
  else if (over) stepPartyOver(g, dt); // (nothing fights: everyone walks home to bed, rules/partyOver.ts)
  // Noticing her (before they step, so a curious baby sets off this step).
  {
    const near: Creature[] = [], byArea = (g.byArea ??= indexByArea(g.creatures)), seen = new Set<string>();
    for (const w of g.witches) { if (w.body.mode !== "ground") continue; const k = cellKey(areaCellAt(g.map, w.body.x, w.body.z)); for (const a of [k, ...(g.map.neighbours.get(k) ?? [])]) if (!seen.has(a)) { seen.add(a); near.push(...(byArea.get(a) ?? [])); } }
    const T = COMBAT.temperament;
    stepNotice(near, g.witches.map(w => ({ x: w.body.x, z: w.body.z, onGround: w.body.mode === "ground" && !w.body.seated && !w.body.perch && !w.ko })), sp => (T.curious.includes(sp) ? "curious" : T.skittish.includes(sp) ? "skittish" : null), t);
  }
  stepCreaturesNear(g.creatures, g.witch.x, g.witch.z, simRadius(g), dt, g.clock.time, g.map, c => !!c.partyLegend || !!c.bed || c.finale !== undefined || dormant(g, c), { ...g.tuning.simLod, full: fullRadius(g.tuning, g.witch.mode) }, g.lod, napRules(g), t.wildWatch?.on ? t.wildWatch : undefined, g.witches.length > 1 ? g.witches.map(W => ({ x: W.body.x, z: W.body.z, radius: simRadius(g), full: fullRadius(t, W.body.mode) })) : undefined);
  if (stepWanderers([...g.combat.busy].map(id => g.creatures[id]), g.map, dt)) g.byArea = null; // (those walking home are among combat's busy)
  // (A party animal in a fight is moved by combat, not its leash.)
  // Far from her on the ground, or from its sigil, a party animal travels (rules/travel.ts): quiet, along area borders.
  for (const motion of motions) {
    const { W, c, ht, was, deck, perchTurn, firing } = motion;
    const LV = g.witches.length > 1 ? leashView(W, g.creatures, g.map, t) : motion.LV!;
    motion.LV = LV;
    stepTravel(LV.stack, LV.placed, g.creatures, W.body, g.map, dt, t, id => busy(id) || heldByCombat(g.creatures[id]));
    stepSigilButton(g, c, W, t, ht, hdt, legends, busy, STEP, LV.guards);
    if (perchTurn) W.leash.events.push({ kind: "perch", id: W.id, x: W.body.x, z: W.body.z, at: ht, on: perchTurn > 0 });
    const ground = deck?.house?.fall.time ?? Infinity; // (her fall hits the ground then, unseen below: a thud; Ed, 2026-10-26)
    if (was.falling !== undefined && was.falling < ground && (W.body.falling === undefined || W.body.falling >= ground)) W.leash.events.push({ kind: "thud", id: W.id, x: was.x, z: was.z, at: ht });
    if (was.falling !== undefined && W.body.falling === undefined) W.leash.events.push({ kind: "fell", id: W.id, x: W.body.x, z: W.body.z, at: ht }); // (off the balcony with no broom: back at the circle)
    // Her hat's spell on putting it down or picking it up (rules/hatSpells.ts: Harvest, Dowsing, Gathering).
    // Stealth (rules/brooms.ts): throwing 💌s, or putting down or picking up anything, gives her away for a moment.
    if (firing || W.leash.events.some(e => e.at === ht && (e.kind === "placed" || e.kind === "picked" || e.kind === "hatPut" || e.kind === "hatPicked" || e.kind === "relicPicked" || e.kind === "flaskDrunk" || e.kind === "relicPlaced" || e.kind === "relicDropped"))) revealed(W.spells, ht, t);
    for (const e of W.leash.events.slice()) if (e.at === ht && e.id === W.id) {
      if (e.kind === "hatPut" && W.hat.down) onHatPut(g, W, W.hat.down.x, W.hat.down.z, ht, t);
      else if (e.kind === "hatPicked") { onHatPicked(g, W, e.x, e.z, ht, t); const waking = wakeOf(g, W); if (waking) wearPiece(waking, "hat"); } // (a hat on her head: out of last night's pile, so she's drawn in it; rules/clothesPile.ts)
    }
    // The 💌s (issue #87): on the ground, off her seat, not knocked out.
    stepInvites(W.invites, W.ko ? {} : confusedAim(W, c, ht), { ...W.body }, t.invites.on && hasInvites(W) && W.body.mode === "ground" && !W.body.seated && !W.ko && !(g.witches.length > 1 && W.house?.slept), g.creatures, affectionOf(g, W), ht, hdt, bagTuning(t, W.spells.bag), g.tuning.legendCircle?.slow.on === false ? undefined : leavesCalmRing(g, W.body), hasInvites(W) ? hatLetters(hatsDown(W), t) : undefined, g.combat.mirages?.length || g.combat.decoys?.length ? mirageDecoys(g, g.clock.time) : undefined);
    if (!worldAsleep(g)) wakeOnInvites(g, W.invites.events, t); // (a 💌 landing on a wild one wakes its area: rules/inviteWakes.ts)
    questsFromPlaced(g, ht, W);
    if (c.feedNearest) feedNearest(B, g.creatures, W.body.x, W.body.z, g.clock.time, t, g.beat);
  }
  stepBerries(B, g.creatures, id => {
    for (const { W, LV } of motions) { const p = LV!.placed.find(q => q.id === id); if (p) return { x: p.x, z: p.z }; if (W.leash.stack.includes(id)) return leashPoint(W.leash, id, W.body.x, W.body.z); }
    return leashPoint(g.leash, id, g.witch.x, g.witch.z);
  }, g.clock.time, dt, t, g.beat, id => { for (const W of g.witches) { const p = W.leash.placed.find(q => q.id === id); if (p) return { x: p.x, z: p.z }; } return null; });
  for (const { W } of motions) {
    for (const e of W.leash.events) if (e.kind === "invited" || e.kind === "befriended") g.tally.invites++;
    // Made happy in an area whose stone still stands (rules/stoneStacks.ts; Ed, 2026-10-28): its sigil turns friend-coloured in the
    // stone's stack, no rune at its feet, till the stone converts.
    if (castOn(t)) for (const e of W.leash.events) if (e.kind === "befriended") markAtStone(g, g.creatures[e.id]); // (by talk; by 💌s: affectionOf)
    // Made happy in an area that already has its soundsystem: it joins the dancing there (#87).
    for (const e of W.leash.events) if (e.kind === "befriended") { const c = g.creatures[e.id], a = g.party.areas.get(cellKey(c.cell)); if (a?.soundsystem && g.combat.sounds.has(cellKey(c.cell))) joinParty(g, c, a.soundsystem, a.cell); }
    g.leashEvents.push(...W.leash.events);
  }
  for (const e of B.events) if (e.kind === "ate") g.tally.berries++; else if (e.kind === "evolved") g.tally.evolved++;
  stepSpeakerBoot(g);
  stepDancefloor(g, wave);
  stepWin(g, dt); // (the end of the route: last of all, so the finale's dancers keep their places, rules/win.ts)
  stepWitchParty(g, motions.map(m => m.c), dt);
  // Her hat's lasting spells where it lies (rules/hatSpells.ts: Bramble, Nursing, the Cyclone), after everything else has moved.
  for (const w of g.witches) stepHatSpells(g, w, hatsDown(w), dt, t);
  if (g.beach) for (const s of g.beach) stepBeachWitches(s, motions.map(({ W, c }) => { const w = W.body; return { x: w.x, z: w.z, onFoot: w.mode === "ground" && !w.seated, moving: !w.stargazing && (Math.hypot(c.moveX, c.moveZ) > 0.05 || Math.hypot(w.vx, w.vz) > 0.3) || !!c.toggleMode }; }), g.clock.time, dt, g.tuning);
  // Last, everyone in view eases apart from anyone closer than their sizes like (Ed, 2026-10-05).
  stepSpacing(g, dt);
  // Enraged creatures stay out of a sleeping or restless legend's circle (Ed, 2026-10-06).
  if (g.tuning.legendCircle?.slow.on !== false) keepEnragedOut(g);
  // And everyone on foot stays ashore of the lakes (rules/lakes.ts).
  if (g.map.bounds.lakes) creaturesAshore(g.creatures, g.map.bounds, lakeKnobs(t).pad);
  // And in the zoo every creature stays inside its island's fence, whatever moved it (rules/zooMap.ts); hers go where she goes.
  const F = g.map.bounds.fence;
  if (F) for (const c of g.creatures) {
    if (c.gone || c.leashed) continue;
    const I = F.ofCell(c.cell[0], c.cell[1]);
    if (I) { const p = F.keepIn(I, c.x, c.z); c.x = p.x; c.z = p.z; }
  }
  // Last boundary guard, including afterparty/knockback/lake corrections: the home legend never leaves home.
  const H = homeArea(g.map);
  for (const id of legends) {
    const c = g.creatures[id];
    if (!c.homeGuard || H.inside(c.x, c.z)) continue;
    c.x = c.lairX ?? c.homeX; c.z = c.lairZ ?? c.homeZ; c.run = undefined; c.moving = false; c.vx = 0; c.vz = 0;
  }
}

/** Spacing (rules/spacing.ts) for the creatures within movement.json bodies.range of a witch (about the view on the ground): every kind of movement at
 *  once, after it's done. A sleeping legend (and one waking) holds its ground; one burrowed or in the air is out of it. */
const spacingList: Creature[] = []; // (kept from step to step: a siege's thousands)
function stepSpacing(g: Game, dt: number): void {
  const R = MOVEMENT.bodies.range, ws = g.witches.map(w => w.body), list = spacingList;
  list.length = 0;
  for (const c of g.creatures) {
    if (c.gone || c.burrow || c.leap || c.swoop) continue; // (a flyer swooping: rules/movement.ts stepSwoop)
    for (const w of ws) if (Math.abs(c.x - w.x) < R && Math.abs(c.z - w.z) < R) { list.push(c); break; }
  }
  spaceOut(list, dt, c => !!c.homeGuard || !!c.partyLegend || dormant(g, c) || !!c.asleep || (c.stunUntil !== undefined && g.clock.time < c.stunUntil), MOVEMENT,
    spacingOn(g.tuning) ? { radius: c => drawnRadius(c, g.tuning), steered: c => !!c.fight?.target } : undefined);
  list.length = 0; // (let them go)
}

/** The naps' rules this step (rules/creatures.ts NapRules; tuning naps): an area is rousing while a witch is on the ground
 *  in it (not on the decks, not knocked out); undefined with naps off. */
function napRules(g: Game): NapRules | undefined {
  const N = g.tuning.naps;
  if (!N?.on) return undefined;
  const roused = new Set<string>(), down = g.witches.filter(w => w.body.mode === "ground" && !w.body.seated && !w.body.perch && !w.ko).map(w => w.body);
  for (const b of down) roused.add(cellKey(areaCellAt(g.map, b.x, b.z)));
  // A legend circle's baby (naps.circle) wakes for a witch at its circle; it joins only when its area is soundsystemed.
  const C = N.circle, atCircle = (c: Creature) => down.some(b => Math.hypot(b.x - c.circle!.x, b.z - c.circle!.z) <= c.circle!.r + C!.reach);
  return { chance: N.chance, length: N.length, wake: N.wake, circle: C, wild: c => !g.party.areas.has(cellKey(c.cell)), roused: c => C && keepsToCircle(c) ? atCircle(c) : roused.size > 0 && roused.has(cellKey(c.cell)) };
}

/** Areas cleared (Ed, 2026-10-07; rules/clear.ts): a few times a second (game time), any area none of whose own wild
 *  creatures is left is partified at once, as its wave would; stepFights then raises its soundsystem, turns its babies
 *  happy and sets its besiegers (none) on it, this same step. */
function stepClear(g: Game): void {
  const time = g.clock.time;
  if (g.clearedAt !== undefined && time < g.clearedAt + 0.25) return;
  g.clearedAt = time;
  for (const cell of clearedAreas(g.party, g.map, g.creatures)) {
    const a = clearArea(g.party, g.map, cell, time);
    if (a?.soundsystem) g.waveEvents.push({ kind: "areaCleared", key: cellKey(cell), x: a.soundsystem.x, z: a.soundsystem.z, at: time });
  }
}

/** The wild creatures by the area they live in (its key). */
function indexByArea(creatures: Creature[]): Map<string, Creature[]> {
  const m = new Map<string, Creature[]>();
  // (one let go at a knockout: in the area it was dropped in)
  for (const c of creatures) { const k = cellKey(c.dropped?.cell ?? c.cell); let l = m.get(k); if (!l) m.set(k, (l = [])); l.push(c); }
  return m;
}

/** The raven's mirage images and the raccoons' decoys (rules/combat/packs.ts) her 💌s can meet: an image takes one and bursts; a decoy catches them. */
export function mirageDecoys(g: Game, time: number): Decoy[] {
  const images = (g.combat.mirages ?? []).filter(m => time < m.until && huntsWitch(m.side as State)).map(m => ({ x: m.x, z: m.z, r: 0.9, hit: () => burstMirage(g.combat, m.id, time) }));
  // The raccoons' decoy (rules/combat/packs.ts): the one waving catches her 💌s in its way, its meter untouched.
  const waving = (g.combat.decoys ?? []).filter(q => time < q.until && huntsWitch(q.side as State) && g.creatures[q.id] && !g.creatures[q.id].gone).map(q => ({ x: g.creatures[q.id].x, z: g.creatures[q.id].z, r: q.r, hit: () => {} }));
  return waving.length ? [...images, ...waving] : images;
}

/** Her aim, turned while she's confused (pack combat: the stoat's war dance, its drift wavering; rules/combat/packs.ts). */
function confusedAim(W: Witch, c: Controls, ht: number): Controls {
  const C = W.confused;
  if (!C || C.move || ht >= C.until || c.aimX === undefined || c.aimZ === undefined) return c;
  const a = C.drift * Math.sin(ht * 2.3), cs = Math.cos(a), sn = Math.sin(a);
  return { ...c, aimX: c.aimX * cs - c.aimZ * sn, aimZ: c.aimX * sn + c.aimZ * cs };
}

/** Fights and sieges (rules/combat.ts): new soundsystems come under siege, every creature near a
 *  witch or busy with a siege fights, blows land on creatures, witches and soundsystems; a fallen
 *  soundsystem ends its party and its besiegers march on; the run ends when none stands. */
/** Whether (x, z) is in a creature's area, for its fights (combat's world.inArea: its edge, chases past it, defending): a legend
 *  area and its pair as one (Ed, 2026-10-26: "for legends getting enraged, and also for animals attacking and defending, the
 *  adjacent areas should count as one"; map.sameArea). */
export const creatureInArea = (map: ForestMap) => (c: { cell: readonly [number, number] }, x: number, z: number): boolean => {
  const k = map.cellSafe(x, z).cell;
  return (k[0] === c.cell[0] && k[1] === c.cell[1]) || (!!map.sameArea && map.sameArea(k, c.cell as [number, number]));
};

function stepFights(g: Game, t: Tuning, dt: number, busy: (id: number) => boolean): void {
  const S = g.combat, time = g.clock.time;
  // A new soundsystem: its area's wild creatures are enraged and march on it (#87: its quest done or not).
  for (const [key, a] of g.party.areas) if (a.soundsystem && !S.sounds.has(key) && !S.ruined.has(key)) {
    // A friendly area (its legend's quest done before its wave: Ed, 2026-10-28): at its conversion every one of its creatures turns
    // friendly, young and adults too, and every sigil scatters; no siege.
    if (castOn(t) && g.friendly.has(key)) for (const c of g.creatures) if (!c.gone && !c.leashed && !c.boss && c.fleeUntil !== Infinity && stateOf(c) === "wild" && c.cell[0] === a.cell[0] && c.cell[1] === a.cell[1]) befriend(c, time);
    startSiege(S, key, a.soundsystem, a.cell, g.creatures, t);
    // Its besiegers march wherever she is (stepped from now on as busy, not only once she comes near).
    for (const c of g.creatures) if (c.siege === key && !c.gone) S.busy.add(c.id);
    // Its wild babies turn happy at once (Ed, 2026-10-06), its legend's circle's too; then its happy ones (#87) come and
    // dance: round it, or at the area's party places (rules/partyGuests.ts).
    for (const c of g.creatures) if (!c.gone && !c.leashed && c.level === 0 && !c.fleeUntil && stateOf(c) === "wild" && c.cell[0] === a.cell[0] && c.cell[1] === a.cell[1]) befriend(c, time);
    if (castOn(t)) scatterFriends(g, key, a.soundsystem, time); // (its stack falls: every friend sigil scattered round it, rules/stoneStacks.ts)
    // (cleared before its wave: a rainbow wave down the ley line, Ed 2026-10-29, rules/rainbow.ts)
    if (a.early) { g.rainbows = liveRainbows(g.party, g.map, g.rainbows ?? [], time); sendRainbow(g.rainbows, t, time, stoneMetres(g.party, g.map, a.cell) ?? pulseRouteMetres(g.party, g.map, time)); } // (from its own stone: Ed, 2026-10-29)
    for (const c of g.creatures) if (!c.gone && !c.leashed && !c.dropped && c.state === "happy" && c.cell[0] === a.cell[0] && c.cell[1] === a.cell[1]) joinParty(g, c, a.soundsystem, a.cell);
    // (one let go here at her knockout stays where it was dropped, dancing now: rules/knockout.ts letGoHappy)
    for (const c of g.creatures) if (c.dropped && !c.gone && !c.leashed && cellKey(c.dropped.cell) === key) c.dancing = true;
  }
  // Only creatures with something to fight near them take part: wild ones in or next to the area
  // of a witch or a party animal (wild never fights wild, and only besiegers go for soundsystems;
  // areas are far wider than any reach), and every party animal, besieger, and one fleeing or
  // mid-fight. (Not every wild one round a standing soundsystem: with the areas growing, Ed
  // 2026-10-04, that was thousands of idle creatures stepped for nothing.)
  const byArea = (g.byArea ??= indexByArea(g.creatures)), hot = new Set<string>(), active: Creature[] = [];
  const near = (x: number, z: number) => { const k = cellKey(areaCellAt(g.map, x, z)); if (hot.has(k)) return; hot.add(k); for (const n of g.map.neighbours.get(k) ?? []) hot.add(n); };
  for (const w of g.witches) near(w.body.x, w.body.z);
  for (const w of g.witches) for (const id of [...w.leash.stack, ...w.leash.placed.map(p => p.id)]) { const c = g.creatures[id]; if (!c.gone) { near(c.x, c.z); active.push(c); } }
  const seen = new Set<number>(active.map(c => c.id));
  for (const k of hot) for (const c of byArea.get(k) ?? []) if (!c.gone && !c.leashed && !seen.has(c.id)) { seen.add(c.id); active.push(c); }
  for (const id of S.busy) { const c = g.creatures[id]; if (!seen.has(id) && !c.gone && !c.leashed) { seen.add(id); active.push(c); } }
  // Angry and happy legends shoot from afar (#87): stepped wherever she is.
  for (const id of g.legendIds ?? []) { const c = g.creatures[id]; if (!seen.has(id) && !c.gone && (c.legendState === "angry" || c.legendState === "happy")) { seen.add(id); active.push(c); } }
  S.busy = new Set();
  // Besiegers marching far from her and from the action go coarsely (rules/simLod.ts).
  const coarse = coarseMarchers(g, active, t, dt);
  const stepped = coarse.size ? active.filter(c => !coarse.has(c)) : active;
  const views = g.witches.map(w => leashView(w, g.creatures, g.map, t)); // (each witch's: in the treehouse, her followers guard home)
  stepCombat(S, {
    friendlyRoute: () => friendlyLegendRoute(g),
    creatures: g.creatures, active: stepped, time, dt, t, busy,
    witches: g.witches.map((w, i) => {
      const onGround = w.body.mode === "ground" && !w.body.seated && !w.body.perch; // (up on the treehouse deck: out of every fight)
      return { id: i, x: w.body.x, z: w.body.z, onGround, down: !!w.ko, vx: w.body.vx, vz: w.body.vz, shelter: onGround ? calmRingAt(g, w.body.x, w.body.z)?.id : undefined, ...(hiddenWitch(g, i) ? { hidden: t.spells.stealth?.range ?? 25 } : {}) }; // (her Stealth broom: unseen, rules/brooms.ts) // (in a calm legend's circle, safe from outside: Ed, round 14)
    }),
    leashPoint: id => { for (let i = 0; i < g.witches.length; i++) { const v = views[i], q = v.placed.find(p => p.id === id); if (q) return { x: q.x, z: q.z }; if (v.stack.includes(id)) return { x: g.witches[i].body.x, z: g.witches[i].body.z }; } return null; },
    asleep: c => !!c.partyLegend || dormant(g, c) || napping(c, time) || (!!c.friendly && !c.leashed), // (a friendly area's creatures leave her party be, and are left be; a sleeper, or one getting up, is out of it)
    parked: id => views.some(v => v.placed.some(p => p.id === id)),
    talkingTo: id => g.witches.findIndex(w => !!w.leash.talk && w.leash.talk.id === id && !w.leash.talk.refused),
    exit: (x, z) => mapExit(g.map, x, z),
    runaway: c => runawaySpot(g, c), // (beaten: to sleep on the beach, Ed 2026-10-28)
    round: g.map.bounds.lakes ? (x, z, tx, tz) => roundLakes(g.map.bounds, x, z, tx, tz, lakeKnobs(t).shore + 4) : undefined,
    centre: g.map.dancefloor,
    home: homeArea(g.map),
    areaAt: (x, z) => areaOf(g.map, g.map.cellSafe(x, z).cell), // (a parked animal guards its sigil's whole area: Ed, 2026-10-15)
    unseen: (x, z) => g.witches.every(w => Math.hypot(w.body.x - x, w.body.z - z) > t.haze.far + 60),
    inArea: creatureInArea(g.map),
    packWorld: {
      dash: id => { const W = g.witches[id]; return W && W.dash.at > -Infinity ? { at: W.dash.at, x: W.dash.toX, z: W.dash.toZ } : null; },
      lettered: id => g.witches.some(W => W.invites.events.some(e => e.kind === "hit" && e.id === id && time - e.at < 0.25)),
      confuse: (id, until, drift, move) => { const W = g.witches[id]; if (W) W.confused = { until, drift, ...(move ? { move: true } : {}) }; },
      pull: (id, x, z, metres) => { // (thrown toward the puller: a blow from behind her, exactly so far and never past it; a blink dodges it, as a blow)
        const W = g.witches[id], at = W ? witchTime(g, W) : g.herTime; if (!W || W.ko || potionPhase(g, W) || dashing(W.dash, at) || g.partyOver) return;
        const dx = W.body.x - x, dz = W.body.z - z, d = Math.hypot(dx, dz); if (d < 2) return;
        knockWitch((W.knock ??= newKnock()), W.body, { x: W.body.x + dx / d, z: W.body.z + dz / d, knockback: 0, rams: false, metres: Math.min(metres, d - 1.5) }, at, t);
      },
    },
    slowWitch: (id, until, mult) => { const w = g.witches[id]; if (w) { w.slowUntil = Math.max(w.slowUntil ?? 0, until); w.slowMult = Math.min(mult, w.slowUntil > until ? w.slowMult ?? 1 : 1); } },
    hitWitch: (id, at, blow) => hitWitch(g, id, at, t, blow),
    witchHitState: id => { const W = g.witches[id]; return W ? { hp: W.health.hp, hurtAt: W.health.hurtAt,
      down: !!W.ko, dashing: dashing(W.dash, witchTime(g, W)), damageEnabled: !worldAsleep(g) && !won(g), stunUntil: W.knock?.stunUntil ?? 0,
      slowUntil: W.slowUntil ?? 0, slowMult: W.slowMult ?? 1, x: W.body.x, z: W.body.z, kx: W.knock?.kx ?? 0, kz: W.knock?.kz ?? 0 } : null; },
    // (an attack in the grammar's effects on her, without a hit: a blink dodges them, as a blow; rules/attacks/combatWorld.ts)
    throwWitch: (id, x, z, metres) => { const W = g.witches[id], at = W ? witchTime(g, W) : g.herTime; if (!W || W.ko || potionPhase(g, W) || dashing(W.dash, at) || g.partyOver) return; knockWitch((W.knock ??= newKnock()), W.body, { x, z, knockback: 0, rams: false, metres }, at, t); },
    stunWitch: (id, until) => { const W = g.witches[id]; if (!W || W.ko || potionPhase(g, W) || dashing(W.dash, witchTime(g, W)) || g.partyOver) return; const k = (W.knock ??= newKnock()); k.stunUntil = Math.max(k.stunUntil, witchTime(g, W) + (until - g.clock.time)); },
    nudgeWitch: (id, dx, dz) => { const W = g.witches[id]; if (!W || W.ko || potionPhase(g, W) || dashing(W.dash, witchTime(g, W)) || g.partyOver || W.body.mode !== "ground") return; W.body = { ...W.body, x: W.body.x + dx, z: W.body.z + dz }; },
    loseParty: id => {
      for (const w of g.witches) { w.leash.stack = w.leash.stack.filter(i => i !== id); w.leash.placed = w.leash.placed.filter(p => p.id !== id); }
      g.creatures[id].leashed = false;
    },
  }, COMBAT);
  for (const c of active) if (!c.gone && !c.leashed && (c.siege || c.fleeUntil || c.fight?.target || c.wanderTo || c.dazed || c.retreat)) S.busy.add(c.id); // carried on wherever she is
  for (const e of S.events) if (e.kind === "soundDestroyed" && e.key && e.at === time) loseSoundsystem(g, e.key, e.x, e.z);
  // The home ring shows each speaker's own damage (an unhurt one keeps what the debug key gave it).
  g.speakers.forEach((_, i) => { const h = S.sounds.get(speakerKey(i)); if (h && h.hp < h.max) g.speakers[i] = speakerStateOf(h.hp, h.max); });
  // The home ring's last speaker down: the party's over (rules/partyOver.ts), the afterparty from now on, whatever soundsystems
  // still stand (Ed, 2026-10-10: "The party should end when all your home speakers are destroyed"; they switch off).
  if (!g.partyOver && homeDown(S)) startPartyOver(g, time);
}

/** The besiegers to march coarsely this step (rules/simLod.ts): marching on a soundsystem (nothing
 *  else to do: no fight, lunge, charge, leap, burrow, knock or daze under way) further than
 *  simLod.full from every witch and simLod.action from every standing soundsystem, party animal
 *  and happy legend's guard. On its turn each marches on by simLod.every steps at once; the rest
 *  of the time it waits. All of them are left out of the combat step (and kept busy). */
function coarseMarchers(g: Game, active: Creature[], t: Tuning, dt: number): Set<Creature> {
  const L = t.simLod, out = new Set<Creature>(), S = g.combat, time = g.clock.time, tick = Math.round(time / dt);
  if (L.every <= 1) return out;
  // The action: each a point and how near counts.
  const near: { x: number; z: number; r: number }[] = [];
  for (const w of g.witches) near.push({ x: w.body.x, z: w.body.z, r: fullRadius(t, w.body.mode) });
  for (const h of S.sounds.values()) if (h.hp > 0) near.push({ x: h.x, z: h.z, r: L.action });
  for (const w of g.witches) for (const id of [...w.leash.stack, ...w.leash.placed.map(p => p.id)]) { const c = g.creatures[id]; if (c && !c.gone) near.push({ x: c.x, z: c.z, r: L.action }); }
  for (const id of g.legendIds ?? []) { const c = g.creatures[id]; if (c && !c.gone && c.legendState === "happy" && !c.partyLegend) near.push({ x: c.x, z: c.z, r: L.action + t.wildLegends.guard }); }
  const counts = g.lod;
  for (const c of active) {
    const f = c.fight, tg = f?.target;
    const marching = !!c.siege && !c.leashed && !c.boss && !c.fleeUntil && !c.dazed && !c.wanderTo && !c.kx && !c.kz && !c.charge && !c.leap && !c.burrow
      && (!tg || tg.kind === "sound") && (!f || (f.windupUntil === 0 && !f.lunge));
    if (!marching) continue;
    // Its distance in from the nearest line (negative: inside one).
    let d = Infinity;
    for (const p of near) d = Math.min(d, Math.max(Math.abs(c.x - p.x), Math.abs(c.z - p.z)) - p.r);
    if (inFull(c, d, 0, L.band)) { if (counts) counts.marchFull++; continue; }
    if (counts) counts.marchCoarse++;
    out.add(c);
    if (!coarseTurn(tick, c.id, L.every)) continue;
    const key0 = tg?.kind === "sound" ? tg.key : c.siege!, key = key0 === "home" ? nearestHomeSpeaker(S, c.x, c.z) ?? key0 : key0, h = S.sounds.get(key) ?? null;
    if (!h || h.hp <= 0) { c.lod = "full"; out.delete(c); continue; } // (its soundsystem fell: combat finds it the next)
    const dx = h.x - c.x, dz = h.z - c.z, dist = Math.hypot(dx, dz), step = Math.min(Math.max(0, dist - 10), marchSpeed(c, t) * dt * L.every); // (over the line it's in full next step)
    if (dist > 1e-6) { c.x += (dx / dist) * step; c.z += (dz / dist) * step; }
    if (Math.abs(dx) > 0.02) c.facing = dx > 0 ? 1 : -1;
    c.away = dz < -Math.abs(dx); c.moving = step > 0; c.walk += dt * L.every * 5;
  }
  return out;
}

/** Where something running off the map heads: just past its nearest edge. */
function mapExit(map: ForestMap, x: number, z: number): { x: number; z: number } {
  return exitPoint(map.bounds, x, z, 30);
}

/** A soundsystem destroyed: its party over (the home ring's speakers all destroyed), its besiegers marching on. Nothing
 *  else (Ed, 2026-10-08: "Losing a soundsystem no longer touches the wave countdown", "doesn't affect the bpm"). */
export function loseSoundsystem(g: Game, key: string, x: number, z: number): void {
  const S = g.combat, time = g.clock.time;
  if (isHomeKey(key)) {
    // One of home's speakers (or, "home", the whole ring at once: the debug hook): its besiegers on to the nearest standing;
    // home is lost only with the last of them.
    const i = speakerIndex(key), all = i < 0;
    g.speakers.forEach((_, j) => { if (all || j === i) g.speakers[j] = "destroyed"; });
    for (let j = 0; j < g.speakers.length; j++) if (all || j === i) marchOn(S, speakerKey(j), g.creatures, g.map.dancefloor);
    if (!all && g.speakers.some((_, j) => (S.sounds.get(speakerKey(j))?.hp ?? 0) > 0)) return;
    key = "home"; x = g.map.dancefloor.x; z = g.map.dancefloor.z;
  } else {
    g.party.areas.delete(key); S.ruined.add(key); (g.party.ruined ??= new Set()).add(key);
    // Its happy babies run off, for good (Ed, 2026-10-06), to sleep on the beach (Ed, 2026-10-28: nobody vanishes mid-night; rules/runaway.ts);
    // leashed ones (and parked ones, and ones let go at a knockout) stay hers.
    for (const c of g.creatures) if (!c.gone && !c.leashed && !c.dropped && !c.loose && c.level === 0 && c.state === "happy" && !c.fleeUntil && cellKey(c.cell) === key) { // (not one whose sigil lies loose: still hers to pick up, Ed 2026-10-28)
      runOff(c, runawaySpot(g, c), () => mapExit(g.map, c.x, c.z));
      Object.assign(c, { dancing: false, fight: undefined });
      S.events.push({ kind: "fled", x: c.x, z: c.z, at: time, id: c.id }); S.busy.add(c.id);
    }
  }
  if (key !== "home") marchOn(S, key, g.creatures, g.map.dancefloor); // (inward only)
  g.waveEvents.push({ kind: "soundsystemLost", key, x, z, at: time });
}

/** The party witches: one for each soundsystem playing (oldest first), and the player idling in. */
function stepWitchParty(g: Game, controls: readonly Controls[], dt: number): void {
  const d = g.map.dancefloor, t = g.tuning, areas: { key: string; x: number; z: number; at: number }[] = [];
  for (const [key, a] of g.party.areas) if (a.soundsystem) areas.push({ key, x: a.soundsystem.x, z: a.soundsystem.z, at: a.at });
  areas.sort((a, b) => a.at - b.at);
  // Debug (?witches=N): N more, as if from soundsystems round the floor.
  for (let i = 0; i < t.partyWitches.debugExtra; i++) areas.push({ key: `debug-${i}`, x: d.x + Math.cos(i * 2.4) * 100, z: d.z + Math.sin(i * 2.4) * 100, at: 0 });
  const players = g.witches.map((W, i) => {
    const w = W.body, c = controls[i], moving = Math.hypot(c.moveX, c.moveZ) > 0.05 || Math.hypot(w.vx, w.vz) > 0.3 || !!(c.toggleMode || c.sigil || c.place || c.cycle || c.cycleBack || c.spell) || g.leashEvents.some(e => e.kind === "grounded"); // (a take-off pulled back down is input too: its press was taken off c above)
    return { x: w.x, z: w.z, onFoot: w.mode === "ground" && !w.seated && !w.perch && !potionPhase(g, W), moving, treetop: w.mode === "treetop" };
  });
  // Round the floor they keep clear of trees, rocks, the speakers and the treehouse and its clearing (Ed, 2026-10-06).
  const th = g.map.treehouse, clear = (x: number, z: number) => blinkClear(g, x, z) && Math.hypot(x - th.x, z - th.z) > t.treehouse.clear;
  // Her soundsystem ruined, or the party over, she lies down to stargaze out past the speakers (Ed, 2026-10-11). Up in the treehouse
  // (perched: its rooms, rules/houseRooms.ts) she's not by the floor, so never idles into the party from there.
  stepPartyWitches(g.partyWitches, areas, { x: d.x, z: d.z, radius: d.radius, clear, ring: speakerRadius(t) + t.dancefloor.speakers.footprint }, players, g.clock.time, dt, t,
    { ruined: g.party.ruined, over: !!g.partyOver });
}

const neonOf = neon;

/** What the dancefloor's engine reads from the game this frame. */
export function floorInputs(g: Game): FloorInputs {
  const d = g.map.dancefloor, at = (x: number, z: number) => tileOf(x, z, d.x, d.z, d.radius), w = at(g.witch.x, g.witch.z);
  const areas = new Set<string>(), dancers: FloorInputs["dancers"] = [];
  for (const a of g.party.areas.values()) areas.add(AREA_TYPES[g.map.typeOf(a.cell[0], a.cell[1])].id);
  for (const c of g.creatures) {
    if (!c.leashed || Math.hypot(c.x - d.x, c.z - d.z) > d.radius) continue;
    const p = at(c.x, c.z);
    dancers.push({ x: p.x, y: p.y, rgb: neonOf((SIGIL_NEON as Record<string, string>)[c.species]) });
  }
  return {
    time: g.clock.time, beatAt: tm => beatAt(g.beat, tm), seed: g.seed, level: floorLevel(g.party.areas.size, g.tuning), partifiedAreas: areas, kinds: islandKinds(g.map, t => AREA_TYPES[t].creature),
    witch: { x: w.x, y: w.y, lift: g.witch.lift, rgb: neonOf(g.tuning.dancefloor.tiles.witchColour) }, dancers,
    moon: { phase: moonState(g.clock.time, g.seed, g.tuning).phase },
    island: { sigil: islandSigilOf(g.map), drawn: bootShare(g.party, g.map, g.clock.time) },
    flare: winFlare(g) ?? undefined,
  };
}

// The home speakers' boot (Ed, 2026-10-06): each starts as a small runestone, and the boot pulse turns it into its speaker.
// Until the pulse drives it (the rendering builder's: bootSpeaker), they turn one by one round the ring over the boot, as
// speakersOn always counted; a run that starts after the boot has them all speakers.
function stepSpeakerBoot(g: Game): void {
  // The boot's pulse round the ring (rules/bootRing.ts): each speaker turns as the pulse reaches its stone, clockwise
  // from the top, from the party spell on.
  for (let i = 0; i < g.speakerBoot.length; i++) if (g.speakerBoot[i] === null && stoneTurned(g.party, g.map, g.clock.time, i)) bootSpeaker(g, i);
}
/** The boot pulse reaches home speaker i now: it starts turning from a runestone into its speaker (once). */
export function bootSpeaker(g: Game, i: number): void {
  if (g.speakerBoot[i] === null) g.speakerBoot[i] = g.clock.time;
}
/** How far home speaker i has turned from a runestone into its speaker at `time`: 0 a stone, 1 a speaker (over boot.transform seconds). */
export function speakerBoot(g: Game, i: number, time = g.clock.time): number {
  const at = g.speakerBoot[i];
  if (at === null || at === undefined) return 0;
  return Math.max(0, Math.min(1, (time - at) / Math.max(1e-3, g.tuning.boot.transform)));
}

// Before the first wave the floor shows only the moon (Ed, 2026-10-06), and through the boot the island's sigil (Ed, 2026-10-11:
// rules/dancefloor.ts islandTiles); it switches on, the full moon
// flaring into the party, when the first wave comes (or at once, off the decks, in a run started later);
// a wave sends a pulse towards the area it reached; a sigil placed flashes out from the centre.
function stepDancefloor(g: Game, waveBefore: number): void {
  const f = g.floor, time = g.clock.time, d = g.map.dancefloor;
  if (!g.witch.seated && g.party.wave > 0) switchOn(f, time);
  if (g.party.wave > waveBefore) for (const a of g.party.areas.values()) {
    if (a.wave !== g.party.wave) continue; // a pulse towards each area this wave woke
    const s = g.map.soundsystemSpot(a.cell[0], a.cell[1]), sp = AREA_TYPES[g.map.typeOf(a.cell[0], a.cell[1])].creature;
    floorEvent(f, { kind: "wave", at: time, dir: Math.atan2(s.z - d.z, s.x - d.x), rgb: neonOf((SIGIL_NEON as Record<string, string>)[sp]) });
  }
  for (const e of g.leash.events) if (e.kind === "placed") floorEvent(f, { kind: "sigil", at: time, dir: 0, rgb: neonOf(g.tuning.dancefloor.tiles.witchColour) });
  // A party animal evolving: a burst out from the floor's centre in its sigil's neon.
  for (const e of g.berries.events) if (e.kind === "evolved") floorEvent(f, { kind: "sigil", at: time, dir: 0, rgb: neonOf((SIGIL_NEON as Record<string, string>)[g.creatures[e.id].species]) });
  stepFloor(f, floorInputs(g), g.tuning);
}

/** An area legend that isn't up and about (asleep, waking, or asleep for good): no roaming, no
 *  fighting, nothing to invite (DESIGN.md, "Sleeping legends"). */
/** The cue for something put down by a sleeping legend but outside its clearing: at its clearing's middle (or the legend). */

export const dormant = (_g: Game, c: Creature): boolean => !!c.boss && !c.leashed && (c.legendState === "asleep" || c.legendState === "restless"); // (asleep or restless: scenery, untouchable)

/** The legends' states (Ed, 2026-10-05, #87; rules/legends.ts): asleep, dreaming; restless while
 *  its area has none of its kind, angry once that's run its course; happy by a relic. Angry and
 *  happy ones shoot from afar (combat: stepLegendAttack); worn down, they go back to sleep. Debug
 *  (O): the nearest made happy. A happy one heals while no enemy is near. */
function stepLegends(g: Game, ids: number[], happyNearest: boolean): void {
  const time = g.clock.time;
  // Asleep, restless (no kin in its area), angry; happy by a relic (rules/legends.ts, #87).
  const stomp = g.tuning.legends?.stomp, was = stomp?.on ? ids.map(id => g.creatures[id].legendState) : null;
  const placed = g.witches.flatMap(W => leashView(W, g.creatures, g.map, g.tuning).placed); // (in the treehouse, her followers count as home's: rules/houseGuard.ts)
  stepLegendStates({
    creatures: g.creatures, map: g.map, time, dt: STEP, partified: k => g.party.areas.has(k), angryAfter: stomp?.on ? stomp.angryAfter : undefined, questsClosed: !!g.partyOver || !!g.map.zoo, // (nor in the zoo: its legends sleep for show, Ed 2026-10-26)
    areaOf: c => { if (c.leashed) { const p = placed.find(q => q.id === c.id); return p ? cellKey(areaCellAt(g.map, p.x, p.z)) : ""; } if (c.dropped) return cellKey(c.dropped.cell); return cellKey(c.cell); }, // (let go at a knockout: where it was dropped, as a parked one's sigil)
  }, ids);
  // The stomp (Ed, 2026-10-06: "perhaps an angry legend simply stamps on the soundsystem in its area,
  // destroying immediately. The angry legend waking timer may have to be longer"): a legend turning
  // angry with its own area's soundsystem standing destroys it at once (lost as any fallen one is).
  if (was) ids.forEach((id, i) => {
    const c = g.creatures[id];
    if (was[i] === "angry" || c.legendState !== "angry") return;
    const key = cellKey(c.cell), h = g.combat.sounds.get(key);
    if (!g.party.areas.has(key) || !h || h.hp <= 0) return;
    h.hp = 0;
    g.combat.events.push({ kind: "soundDestroyed", x: h.x, z: h.z, at: time, key }); // (lost with the rest this step: stepGame's fallen soundsystems)
    g.tally.stomps = (g.tally.stomps ?? 0) + 1;
  });
  // A happy legend heals to whole over legends.healTime while no enemy is near (balance builder, #80).
  for (const id of ids) { const c = g.creatures[id]; if (c.legendState === "happy" && c.drops && !c.fight?.target) healBy(c, STEP / LEGENDS.healTime, 1, g.clock.time); } // (its 💧s, a full set in healTime: rules/orbit.ts)
  if (happyNearest) {
    // Debug (O): the nearest sleeping legend made happy, as if a relic were put down by it.
    let best: Creature | null = null, bd = Infinity;
    for (const id of ids) { const c = g.creatures[id], d = Math.hypot(c.x - g.witch.x, c.z - g.witch.z); if (c.legendState !== "happy" && d < bd) { bd = d; best = c; } }
    if (best) cheer(best, time);
  }
}

/** How far from the witch creatures are simulated (by their home): at least far enough that one
 *  resuming anywhere in its area does so beyond the draw distance (the haze), so none ever jumps
 *  in view. */
/** A happy creature joins its area's party: it goes to its spot (by the soundsystem, or one of the area's party places) and
 *  dances there, at a party place in the first free slot round it (guestSlot, guestGap: by the guests already there). */
/** A creature just made happy whose stone still stands: its sigil stays in the stack (no rune at its feet). */
function markAtStone(g: Game, c: Creature | undefined): void {
  if (!c || c.boss || c.leashed || c.gone || c.dropped || stateOf(c) !== "happy") return;
  if (stoneOpen(g, cellKey(c.cell))) c.atStone = true;
}

/** A stone converted (by her spell or its wave: Ed, 2026-10-28): its stack falls, every friend sigil (its happy natives', the babies'
 *  just befriended, its legend's) scattered on the ground round it (rules/stoneStacks.ts scatterSpots), loose for any witch to pick
 *  up; the creatures themselves go to the party as ever. */
function scatterFriends(g: Game, key: string, at: { x: number; z: number }, time: number): void {
  const t = g.tuning, friends = friendSigils(g, key);
  if (!friends.length) return;
  const placed = g.witches.flatMap(w => w.leash.placed), S = castOf(t).scatter;
  const free = (x: number, z: number) => !sigilBarred(g, x, z, t) && !looseAt(g.loose, x, z, t) && !looseAt(placed, x, z, t) && isInside(g.map.bounds, x, z, 2);
  // (its clearing: open ground, in its own area, where the trees thin out)
  const open = (x: number, z: number) => g.map.treeWeight(x, z) <= S.open * t.treeDensity && cellKey(g.map.areaOf(g.map.cellSafe(x, z).cell)) === key;
  // A legend circle's baby's sigil lands in its circle (Ed, 2026-10-28), the rest scatter over the stone's clearing.
  const inCircle = friends.filter(f => f.c.circle && !f.c.boss), round = friends.filter(f => !inCircle.includes(f));
  const spots = scatterSpots(key, at.x, at.z, round.length, t, free, open);
  const drop = ({ c, slot }: { c: Creature; slot: number }, x: number, z: number, circle: boolean) => {
    g.loose.push({ id: c.id, x, z, at: time, from: { x: at.x, y: slot, z: at.z }, ...(c.boss ? { legend: true } : {}), ...(circle ? { to: "circle" as const } : {}) });
    c.loose = true; c.atStone = undefined;
  };
  round.forEach((f, i) => drop(f, spots[i].x, spots[i].z, false));
  for (const f of inCircle) {
    const k = f.c.circle!, L = g.creatures.find(o => o.boss && !o.gone && Math.abs(o.x - k.legendX) < 1 && Math.abs(o.z - k.legendZ) < 1);
    const near = (x: number, z: number) => [...g.loose, ...placed].some(p => Math.hypot(p.x - x, p.z - z) < t.leash.spacing);
    const s = circleSpot(k, (L ? bodyRadius(L) : 3) + 1, f.c.id, (x, z) => !sigilBarred(g, x, z, t) && !near(x, z));
    drop(f, s.x, s.z, true);
  }
  g.leashEvents.push({ kind: "converted", id: -1, key, x: at.x, z: at.z, at: time });
}

export function joinParty(g: Game, c: Creature, soundsystem: { x: number; z: number }, cell: Cell): void {
  // A legend's circle's baby dances in its circle, on its open floor (Ed, 2026-10-06: "Happy Circle baby should stay in its
  // circle, though it can dance there").
  if (c.circle) { const k = c.circle; danceAt(c, { x: k.x, z: k.z + k.r * 0.3 }, k.r * 0.45); return; }
  const spot = guestSpot(c, soundsystem, partySpots(g.map, cell, g.tuning));
  if (spot.kind === "soundsystem") { danceAt(c, spot, spot.r); return; }
  // the guests already round this place, and their slots
  const taken: Creature[] = [], body = bodyRadius(c);
  for (const o of g.creatures) if (o !== c && o.dancing && !o.gone && o.range <= SLOT_RANGE && o.cell[0] === cell[0] && o.cell[1] === cell[1]) taken.push(o); // every guest's slot in its area, not only this place's: two places close together share their rows' ends
  // the first free slot in its area (the far row's, a second row, then the near row's, for a place by its area's edge);
  // else (the place full) by the soundsystem, never piled up
  const free = (p: { x: number; z: number }) => { const cl = g.map.cellSafe(p.x, p.z).cell; return cl[0] === cell[0] && cl[1] === cell[1] && taken.every(o => Math.abs(o.anchorX - p.x) > guestGap(bodyRadius(o), body) || Math.abs(o.anchorZ - p.z) > GUEST_DEPTH); };
  for (const front of [false, true]) for (let row = 0; row < 2; row++) for (const u of ROW_OFFSETS) {
    const at = guestSlot(spot, u, body, row, front);
    if (free(at)) { danceAt(c, at, at.r); return; }
  }
  danceAt(c, soundsystem, SPOT_RANGE.soundsystem);
}

export const simRadius = (g: Game) => Math.max(g.tuning.creatureSimRadius, g.tuning.haze.far + 20 + wanderRange(g.map) * 2.5);

export const poseOf = (g: Game): CameraPose => cameraPose(g.camera, g.camera.lift, g.tuning);
/** How near the sea she is for the camera (Ed, 2026-10-06: lower and more bent "over 200m until you're at stargazing at the edge
 *  of the sea"): 0 from beach.camera.approach metres off the water's edge, 1 at it; and whether she's lying stargazing (alone, or
 *  with a beach witch). Null on a map without a beach. */
export function coastOf(g: Game): CoastView | null {
  const BC = g.tuning.beach?.camera, b = BC ? beachOf(g.map.bounds, g.tuning) : null, w = g.witch;
  if (!BC || !b) return null;
  // (metres from where the edge's soft hold starts, where she lies down at the water's edge: rules/witch.ts `held`)
  const off = b.land.distAt(w.x, w.z) - (g.tuning.map?.push ?? 0) * 0.6;
  const near = Math.max(0, Math.min(1, 1 - off / Math.max(1, BC.approach)));
  // A potion leaves her lying inland too; only the coast uses the low sea-and-sky camera.
  const gazing = near > 0 && w.mode === "ground" && (!!w.stargazing || !!g.beach?.some(s => s.players[0]?.pose === "stargaze"));
  // (her bearing round the coast only by the sea, where the stargazing camera reads it: the way out to the water from her
  // (0 north, clockwise); inland the camera's state is as ever)
  const n = b.land.inward(w.x, w.z), ox = -n.x, oz = -n.z;
  return { near, gazing, seaBehind: Math.max(0, oz), bearing: near > 0 || gazing ? Math.atan2(ox, -oz) : undefined }; // (the water to the south: behind a camera looking north)
}

/** The area type under the witch, by name (and its set piece, if it shows one), for the debug overlay. */
export function areaUnderWitch(g: Game): string {
  const a = g.map.areaAt(g.witch.x, g.witch.z), piece = g.map.setPieceOf(a.cell[0], a.cell[1]), name = AREA_TYPES[a.type].name;
  // (on the sand or past it, the beach, the area it borders after it: the map's areas run to the edge under the sand)
  const b = beachOf(g.map.bounds, g.tuning), where = !b ? "" : b.intoSea(g.witch.x, g.witch.z) > 0 ? "Sea" : b.intoSand(g.witch.x, g.witch.z) > 0 ? "Beach" : "";
  if (where) return `${where} (by the ${name})`;
  return name + (piece ? ` (set piece: ${piece})` : "");
}
