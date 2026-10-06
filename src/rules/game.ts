// The whole game state, and one step of it. No drawing here: the Three.js layer reads this.
import { MOVEMENT } from "./movement";
import { bodyRadius, spaceOut } from "./spacing";
import { onAreaDone } from "./leylines";
import { questOutside, questPlaced, type QuestEvent } from "./quest";
import { beatAt, newBeatClock, waveArrived, waveTempo, type BeatClock } from "./beat";
import { cameraPose, newCamera, stepCamera, type CameraPose, type CameraState } from "./camera";
import { MAX_STEP, newClock, type Clock } from "./clock";
import { heldByCombat, spawnCreatures, stepCreaturesNear, stepNotice, wanderRange, type Creature } from "./creatures";
import { Forest } from "./forest";
import { inviteCreature, leashPoint, newLeash, stepLeash, type LeashControls, type LeashEvent, type LeashState } from "./leash";
import { stepTravel, updateModes } from "./travel";
import { buffing, cheer, LEGENDS, placeRelics, relicButton, stepLegendStates, type Relic } from "./legends";
import { befriend, danceAt, invitableNow, runeNear, stateOf, STATES } from "./creatureStates";
import { GUEST_DEPTH, guestGap, guestSlot, guestSpot, partySpots, ROW_OFFSETS, SLOT_RANGE, SPOT_RANGE } from "./partyGuests";
import type { Cell } from "./partition";
import { feedNearest, newBerries, stepBerries, type BerryState } from "./berries";
import { castPartySpell, cellKey, heldBySpell, hurryWave, newParty, speakersOn, spreadWave, stepParty, type PartyState } from "./party";
import { AREA_TYPES, generateMap, type ForestMap } from "./map";
import { exitPoint } from "./mapShape";
import { nextSpeakerState, type SpeakerState } from "./speakers";
import { moonState } from "./moon";
import { floorEvent, floorLevel, neon, newFloor, stepFloor, switchOn, tileOf, type FloorInputs, type FloorState } from "./dancefloor";
import { SIGIL_NEON } from "../../art/sigils.js";
import { LEGEND_BUFFS, newBuffs, stepBuffs, type BuffState } from "./buffs";
import { COMBAT, marchOn, maxHp, newCombat, startSiege, stepCombat, type CombatState } from "./combat";
import { coarseTurn, fullRadius, inFull, newLodCounts, type LodCounts } from "./simLod";
import { dropHat, hatButton, newHat, type HatState } from "./hat";
import { loadOf, type LeashLoad } from "./leashWeight";
import { pinWitch, type Pinned } from "./partyLegend";
import { hurt, knockOut, newHealth, repair, stepKnockout, stepWanderers, type Health, type Knockout, type KnockoutEvent } from "./knockout";
import { dropCache, newInvites, stepInvites, type Affection, type InviteControls, type Invites } from "./invites";
import { affection, blocksLetters, hit as hitAffection } from "./affection";
import { knockWitch, newKnock, stepWitchKnock, stunned, type Blow, type Knock } from "./knock";
import { applyDash, dashing, newDash, rechargeDash, refundDash, startDash, type DashState } from "./dash";
import { castSpell, newSpells, speedMultiplier, type SpellState } from "./spells";
import { newPartyWitches, stepPartyWitches, type PartyWitches } from "./partyWitches";
import { growWave, materialize, newGrowth, type GrowthState } from "./growth";
import type { Tuning } from "./tuning";
import { newWitch, stepWitch, witchHeight, type Intent, type WitchState } from "./witch";

/** One player's witch (Stage 4: game.witches, one per player, the first this machine's): her
 *  body (where she is and how she flies), her leash, her spell. */
export interface Witch {
  id: number;
  body: WitchState;
  leash: LeashState;
  spells: SpellState;
  dash: DashState;
  /** Her 💌s (rules/invites.ts). */
  invites: Invites;
  /** Thrown and staggered by a blow (rules/knock.ts). */
  knock?: Knock;
  /** Her hits left and repair (rules/knockout.ts), and her knockout while it plays out. */
  health: Health;
  ko: Knockout | null;
  /** Her hat (rules/hat.ts): on her head, or lying where she was knocked out. */
  hat: HatState;
  /** Up against a party legend's leash (rules/partyLegend.ts, the Easter egg): which, and since when; for the view. */
  pinned?: Pinned | null;
  /** Slowed (a snail's slime, a glow-worm's flash) until then: her speeds times slowMult. */
  slowUntil?: number;
  slowMult?: number;
}

/** The simulation's fixed step (seconds): the rules advance only in these, driven only by the
 *  inputs and the seed, so the same inputs give the same game (Stage 4: deterministic sim). */
export const STEP = 1 / 60;

export interface Game {
  readonly seed: number;
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
  /** Real time not yet simulated (under one STEP), and its share of a step, for drawing between
   *  the last two steps (see interpolated). */
  acc: number;
  alpha: number;
  /** Fights, shots and soundsystems' health (rules/combat.ts). */
  combat: CombatState;
  /** What knockouts did in this frame's steps (for the view). */
  koEvents: KnockoutEvent[];
  /** Areas whose legend's quest is done (rules/quest.ts): friendly while wild, guarded once partified. */
  friendly: Set<string>;
  /** Quests done in this frame's steps (for the view). */
  questEvents: QuestEvent[];
  /** The map's relics (rules/legends.ts): lying half buried, carried, or put down by a legend. */
  relics: Relic[];
  /** This frame's wave events (several steps' worth, or none): a soundsystem lost brings the next
   *  wave sooner (Ed, 2026-10-05), with the countdown it leaves, for the HUD and the music. */
  waveEvents: WaveEvent[];
  /** This frame's leash events (several steps' worth, or none), for the view: `leash.events` holds only the last step's. */
  leashEvents: LeashEvent[];
  /** The creatures by home area (rebuilt when one settles somewhere new). */
  byArea?: Map<string, Creature[]> | null;
  /** The areas' legends, by id (rules/creatures.ts: one an area), found once. */
  legendIds?: number[];
  /** This step's simulation level of detail (rules/simLod.ts): how many creatures in each, for the debug overlay. */
  lod?: LodCounts;
  /** The debug arena (?arena=, rules/arena.ts): its spec and the creatures it put down. */
  arena?: { spec: string; ids: number[] };
  /** The run is over (every soundsystem destroyed): when. */
  over: { at: number } | null;
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
  /** The dancefloor's tile lights (rules/dancefloor.ts). */
  floor: FloorState;
  /** The legend buffs on now, and the tuning they make (rules/buffs.ts): the game plays by buffs.tuning. */
  buffs: BuffState;
  /** The party witches on the dancefloor, and the players idling into the party (rules/partyWitches.ts). */
  partyWitches: PartyWitches;
  /** Running totals for the playtest log (src/platform/playtestLog.ts): berries eaten, creatures invited, evolutions. */
  tally: { berries: number; invites: number; evolved: number };
  /** Where the opening shot looks: her seat on the treehouse as drawn (the view sets it; the art knows where it is). */
  introFocus?: { x: number; y: number; z: number };
}

/** A soundsystem destroyed ("home" for the dancefloor's ring): the next wave `cut` seconds sooner,
 *  `left` seconds away now (0: it comes at once). */
export interface WaveEvent { kind: "soundsystemLost"; key: string; x: number; z: number; at: number; cut: number; left: number }

export interface Controls extends Intent, Partial<LeashControls>, InviteControls {
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
  /** The dash button (rules/dash.ts). */
  dash?: boolean;
}

export function newWitchPlayer(id: number, x: number, z: number, t: Tuning): Witch {
  return { id, body: { ...newWitch(x, z), seated: true }, leash: newLeash(), spells: newSpells(t), dash: newDash(), invites: newInvites(), health: newHealth(t), ko: null, hat: newHat() };
}

export function newGame(seed: number, tuning: Tuning, players = 1): Game {
  const map = generateMap(seed, tuning);
  const witches = Array.from({ length: Math.max(1, players) }, (_, i) => newWitchPlayer(i, map.start.x + i * 2, map.start.z, tuning));
  const body = witches[0].body, creatures = spawnCreatures(map), forest = new Forest(map);
  const g = {
    seed, tuning, map, forest, creatures, clock: newClock(), witches,
    get witch() { return this.witches[0].body; }, set witch(w: WitchState) { this.witches[0].body = w; },
    get leash() { return this.witches[0].leash; }, set leash(l: LeashState) { this.witches[0].leash = l; },
    get spells() { return this.witches[0].spells; }, set spells(s: SpellState) { this.witches[0].spells = s; },
    camera: newCamera(tuning, body.x, witchHeight(body, tuning), body.z), party: newParty(map), berries: newBerries(map, tuning),
    speakers: map.dancefloor.speakers.map(() => "playing" as SpeakerState),
    speakerBoot: map.dancefloor.speakers.map(() => null),
    beat: newBeatClock(tuning.beat.bpm, waveTempo(tuning, 0)),
    floor: newFloor(), buffs: newBuffs(tuning), partyWitches: newPartyWitches(seed),
    combat: newCombat(), koEvents: [] as KnockoutEvent[], friendly: new Set<string>(), questEvents: [] as QuestEvent[], waveEvents: [] as WaveEvent[], leashEvents: [] as LeashEvent[], relics: placeRelics(map, forest), tally: { berries: 0, invites: 0, evolved: 0 }, growth: newGrowth(), over: null as { at: number } | null,
    acc: 0, alpha: 1, pending: {}, prev: { witches: [], creatures: new Float64Array(creatures.length * 2), camera: null },
  };
  const d = map.dancefloor, C = tuning.combat;
  g.combat.sounds.set("home", { hp: C.homeHealth, max: C.homeHealth, x: d.x, z: d.z, radius: C.homeRadius });
  return g as Game;
}

/** The presses that happen once (not held): kept for the next step if a frame runs none. */
const ONE_SHOT = ["toggleMode", "sigil", "place", "cycle", "spell", "dash", "nextWave", "pauseWaves", "feedNearest", "inviteNearest", "happyNearest"] as const;

/** Advance the game by one real frame of `realDt` seconds: as many fixed STEPs as that makes up
 *  (at most a few, so a hitch doesn't run away), with the held controls each step and each
 *  one-shot press on the first step that comes. */
export function stepGame(g: Game, c: Controls, realDt: number): void {
  if (c.cycleSpeakers) g.speakers = g.speakers.map(nextSpeakerState); // a debug key: even while paused
  const P = g.pending as Record<string, unknown>;
  for (const k of ONE_SHOT) if (c[k]) P[k] = true;
  if (c.zoom) P.zoom = c.zoom;
  if (g.clock.paused || !(realDt > 0)) return;
  // This frame's combat and knockout events (several steps' worth, or none), for the view.
  g.combat.events = []; g.koEvents = []; g.questEvents = []; g.waveEvents = []; g.leashEvents = [];
  for (const w of g.witches) w.invites.events = [];
  g.acc = Math.min(g.acc + Math.min(realDt, MAX_STEP), MAX_STEP + STEP);
  while (g.acc >= STEP - 1e-9) {
    g.acc -= STEP;
    const step: Controls = { ...c, zoom: 0 };
    for (const k of ONE_SHOT) { step[k] = !!P[k]; delete P[k]; } // each press on one step only
    step.zoom = (P.zoom as number) ?? 0;
    delete P.zoom;
    remember(g);
    fixedStep(g, step);
  }
  g.alpha = Math.max(0, Math.min(1, g.acc / STEP));
}

/** The affection rules the 💌s and the view use (issue #87): the state machine's meter
 *  (rules/affection.ts). A full meter makes a wild one happy; she leashes it by picking up its rune (states.leash
 *  "pickup", rules/leash.ts), or by filling it again (the old "again"). How many letters fill it is the tuning's invites.hits (buffs change it);
 *  every 💌 that lands counts (no per-animal gap since 2026-10-06: her firing rate sets the pace). */
export const affectionOf = (g: Game): Affection => {
  const t = g.buffs?.tuning ?? g.tuning, s = g.witches[0].invites, E = t.legends;
  const data = { ...STATES, partyEgg: E.partyEgg, affection: { ...STATES.affection, hits: meterHits(t), gap: 0, legendDrain: E.partyDrain } };
  return {
    invitable: c => invitableNow(c, data),
    blocksLetters: c => !c.partyLegend && !invitableNow(c, data) && blocksLetters(c), // (the egg: a happy legend takes them; a party legend lets them by)
    hit(c, amount, time) {
      const was = stateOf(c), party = !!c.partyLegend;
      hitAffection({ time, leash: k => inviteCreature(g.leash, k, k.x, k.z, time) }, c, amount, time, data);
      if (stateOf(c) !== was || (c.partyLegend && !party)) s.events.push({ kind: "happy", x: c.x, z: c.z, at: time, id: c.id }); // (happy, or leashed; or a party legend)
    },
    affection: c => affection({ time: g.clock.time }, c, data),
  };
};

/** A hit on witch `id` at game time `at`: it costs her a hit unless she's mid-blink (nowhere). */
/** The pull of the sigils witch `w` carries (Ed, 2026-10-06; rules/leashWeight.ts): its size, what drags beyond the free
 *  allowance, its direction and whether it's extreme. For the view and the debug overlay; the rules use the same. */
/** Hits to fill a meter, by level: the tuning's invites.hits, a legend's the party-legend egg's (legends.partyHits). */
export const meterHits = (t: Tuning): number[] => [...t.invites.hits.slice(0, 3), t.legends.partyHits];

export const leashLoad = (g: Game, w: Witch = g.witches[0]): LeashLoad => loadOf(w.leash.stack, g.creatures, w.body, g.buffs?.tuning ?? g.tuning);

export function hitWitch(g: Game, id: number, at: number, t: Tuning = g.tuning, blow?: Blow): void {
  const w = g.witches[id];
  if (!w || w.ko || dashing(w.dash, at)) return;
  if (at < w.health.hurtAt + t.witchHealth.grace) return; // (just hit: a moment's grace, so a pack can't take all her hits at once)
  if (hurt(w.health, at, t)) {
    w.ko = knockOut(w.leash, g.creatures, at, t); g.koEvents.push({ kind: "down", at, x: w.body.x, z: w.body.z });
    if (dropHat(w.hat, w.body.x, w.body.z, at, t.knockout.dropHat)) g.koEvents.push({ kind: "hatDropped", at, x: w.body.x, z: w.body.z });
    return;
  }
  // Thrown and staggered by it (rules/knock.ts); not by the blow that knocks her out.
  if (blow) knockWitch((w.knock ??= newKnock()), w.body, blow, at, t);
}

/** Where a blink may land: not in a tree's trunk, a rock or ruin, a soundsystem, a dancefloor
 *  speaker or the treehouse's tree (tuning dash.clear: each one's clearance in metres). */
export function blinkClear(g: Game, x: number, z: number): boolean {
  const C = g.tuning.dash.clear, near = (px: number, pz: number, r: number) => (px - x) ** 2 + (pz - z) ** 2 < r * r;
  if (g.forest.treesNear(x, z, C.tree).some(p => near(p.x, p.z, C.tree))) return false;
  if (g.forest.decorNear(x, z, C.decor).some(p => near(p.x, p.z, C.decor))) return false;
  for (const [k, s] of g.combat.sounds) if (k !== "home" && near(s.x, s.z, C.sound)) return false;
  if (g.map.dancefloor.speakers.some(p => near(p.x, p.z, C.speaker))) return false;
  return !near(g.map.treehouse.x, g.map.treehouse.z, C.treehouse);
}

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
function fixedStep(g: Game, controls: Controls): void {
  let c = controls;
  const dt = STEP;
  g.clock.time += dt;
  const wave = g.party.wave;
  // Legend buffs: the happy legends (and any party legend) change the numbers the rest of the step plays by.
  const legends = (g.legendIds ??= g.creatures.filter(k => k.boss).map(k => k.id));
  stepBuffs(g.buffs, g.creatures, [...g.leash.stack, ...g.leash.placed.map(p => p.id), ...legends.filter(id => buffing(g.creatures[id]))], g.tuning);
  const t = g.buffs.tuning;
  // The party spell (Ed, 2026-10-06): until it's cast, and while she casts it, she stands behind the decks: no moving,
  // rising, blinking, spells or 💌s (the camera's zoom still works). Its button, Enter, or her spell key (R, gamepad B, touch
  // "spell") while the game waits casts it, rather than the boost (the hold drops that spell press).
  if (c.castParty || c.spell) castPartySpell(g.party, g.map, g.clock.time);
  if (heldBySpell(g.party, g.clock.time)) c = { moveX: 0, moveZ: 0, toggleMode: false, zoom: c.zoom };
  if (c.spell) castSpell(g.spells, g.clock.time, t);
  // The speed boost: her speeds times its multiplier while it's on.
  const W = g.witches[0];
  const M = g.buffs.mods, H = LEGEND_BUFFS.how, charges = 1 + M.charges;
  // Her speed: the boost spell, a slow, Momentum (Boar) after a blink, and firing (no slowing: Ram's Steady).
  const firing = W.invites.burstLeft > 0 || (!!c.fire && t.invites.on && g.witch.mode === "ground" && !g.witch.seated);
  const boost = speedMultiplier(g.spells, g.clock.time, t) * (W.slowUntil !== undefined && g.clock.time < W.slowUntil ? W.slowMult ?? 1 : 1)
    * (M.momentum > 0 && g.clock.time < W.dash.at + H.momentum.time ? 1 + (H.momentum.speed - 1) * M.momentum : 1)
    * (firing && !M.steady && g.witch.mode === "ground" ? t.invites.fireSlow ?? 1 : 1);
  // Knocked out: no input but the camera's zoom while it plays out.
  if (W.ko) c = { moveX: 0, moveZ: 0, toggleMode: false, zoom: c.zoom };
  // Staggered by a blow (rules/knock.ts): no moving, rising, blinking or 💌s for a moment.
  else if (stunned(W.knock, g.clock.time)) c = { moveX: 0, moveZ: 0, toggleMode: false, zoom: c.zoom, sigil: c.sigil, place: c.place, cycle: c.cycle };
  const was = W.body;
  rechargeDash(W.dash, g.clock.time, charges, t.dash.cooldown);
  // A blink (Decoy, Beaver: it leaves a waiting 💌 where she was).
  // (A press is held for dash.buffer seconds until it can go: pressed a moment early still blinks.)
  if (c.dash) W.dash.bufferUntil = g.clock.time + t.dash.buffer;
  if (g.clock.time <= (W.dash.bufferUntil ?? -Infinity) && !W.ko && !stunned(W.knock, g.clock.time)
    && startDash(W.dash, was, c.moveX, c.moveZ, g.clock.time, t, g.map.bounds, (x, z) => blinkClear(g, x, z), charges, H.charges.chain, c.aimX ?? 0, c.aimZ ?? 0)) {
    W.dash.bufferUntil = undefined;
    if (M.decoy > 0) dropCache(W.invites, was.x, was.z, g.clock.time, t, M);
  }
  W.body = applyDash(W.dash, stepWitch(was, c, dt, boost === 1 ? t : { ...t, groundSpeed: t.groundSpeed * boost, treetopSpeed: t.treetopSpeed * boost }, g.map.bounds, loadOf(W.leash.stack, g.creatures, was, t))); // (her sigils' pull: rules/leashWeight.ts)
  if (W.knock) W.body = stepWitchKnock(W.knock, W.body, dt, t, g.map.bounds, (x, z) => blinkClear(g, x, z));
  // A party legend on her leash (the Easter egg): not a step past legends.partyReach of it, blinking, flying or thrown (rules/partyLegend.ts).
  if (t.legends.partyEgg) { const P = pinWitch(W.body, W.leash.stack, g.creatures, t.legends.partyReach, g.clock.time, W.pinned ?? null); W.body = P.body; W.pinned = P.pinned; }
  g.camera = stepCamera(g.camera, c.zoom, { x: g.witch.x, y: witchHeight(g.witch, g.tuning), z: g.witch.z }, { x: g.witch.vx, z: g.witch.vz }, g.witch.lift, dt, g.tuning, !!g.witch.seated, g.introFocus);
  if (c.pauseWaves) g.party.paused = !g.party.paused;
  if (c.nextWave) { spreadWave(g.party, g.map, g.clock.time); g.party.nextAt = g.clock.time + t.party.interval; }
  stepParty(g.party, g.map, g.clock.time, dt, !!g.witch.seated);
  // Each wave brings its tempo, eased in from the block line its music lands on.
  if (g.party.wave !== g.beat.wave) waveArrived(g.beat, g.tuning, g.party.wave, g.clock.time);
  stepLegends(g, legends, !!c.happyNearest);
  if (W.ko) {
    const r = stepKnockout(W.ko, W.body, W.leash, g.creatures, g.map, g.clock.time, k => g.party.areas.has(k), g.koEvents);
    W.body = r.body;
    if (r.done) { W.ko = null; W.health.hp = t.witchHealth.hits; W.health.repairAt = Infinity; }
  }
  repair(W.health, g.clock.time, t);
  const B = g.berries, busy = (id: number) => B.feeding.has(id) || B.evolving.has(id);
  const grown = g.creatures.length;
  stepGrowth(g, wave);
  for (let i = grown; i < g.creatures.length; i++) { const c = g.creatures[i]; if (g.friendly.has(cellKey(c.cell)) && !g.party.areas.has(cellKey(c.cell))) c.friendly = true; } // (a friendly area's newcomers are friendly too)
  updateModes(g.leash.stack, g.leash.placed, g.creatures, g.witch, g.witch.mode === "ground" && !g.witch.seated && !W.ko, g.map, g.clock.time); // (posse or travelling: rules/travel.ts)
  g.lod = newLodCounts();
  stepFights(g, t, dt, busy);
  // Noticing her (before they step, so a curious baby sets off this step).
  {
    const near: Creature[] = [], byArea = (g.byArea ??= indexByArea(g.creatures)), seen = new Set<string>();
    for (const w of g.witches) { if (w.body.mode !== "ground") continue; const k = cellKey(g.map.cellSafe(w.body.x, w.body.z).cell); for (const a of [k, ...(g.map.neighbours.get(k) ?? [])]) if (!seen.has(a)) { seen.add(a); near.push(...(byArea.get(a) ?? [])); } }
    const T = COMBAT.temperament;
    stepNotice(near, g.witches.map(w => ({ x: w.body.x, z: w.body.z, onGround: w.body.mode === "ground" && !w.body.seated && !w.ko })), sp => (T.curious.includes(sp) ? "curious" : T.skittish.includes(sp) ? "skittish" : null), t);
  }
  stepCreaturesNear(g.creatures, g.witch.x, g.witch.z, simRadius(g), dt, g.clock.time, g.map, c => !!c.partyLegend || dormant(g, c), { ...g.tuning.simLod, full: fullRadius(g.tuning, g.witch.mode) }, g.lod);
  if (stepWanderers([...g.combat.busy].map(id => g.creatures[id]), g.map, dt)) g.byArea = null; // (those walking home are among combat's busy)
  // (A party animal in a fight is moved by combat, not its leash.)
  // (the relic button's events: added after the leash's step, which starts its events afresh)
  const relicEvents: LeashEvent[] = [];
  // Far from her on the ground, or from its sigil, a party animal travels (rules/travel.ts): quiet, along area borders.
  stepTravel(g.leash.stack, g.leash.placed, g.creatures, g.witch, g.map, dt, t, id => busy(id) || heldByCombat(g.creatures[id]), t.leash.pace ?? 1);
  // The sigil button by a lying relic picks it up; carrying one, by a sleeping legend, puts it down there (rules/legends.ts).
  let sigil = !!c.sigil && !W.ko, place = !!c.place && !W.ko;
  // Her hat first (rules/hat.ts): lying on a sigil or a relic's, the press picks up the hat, and the next the sigil.
  if ((sigil || place) && g.witch.mode === "ground" && hatButton(W.hat, g.witch.x, g.witch.z, t.leash.pickRadius)) {
    sigil = false; place = false;
    relicEvents.push({ kind: "hatPicked", id: W.id, x: g.witch.x, z: g.witch.z, at: g.clock.time }); // (after the leash's step, which starts its events afresh)
  }
  if ((sigil || place) && g.witch.mode === "ground") {
    const r = relicButton(g.relics, g.leash.relics, g.creatures, legends, g.witch.x, g.witch.z, g.clock.time, t.leash.pickRadius, g.map);
    if (r) {
      sigil = false; place = false;
      if ("picked" in r) relicEvents.push({ kind: "relicPicked", id: r.picked.id, x: r.picked.x, z: r.picked.z, at: g.clock.time });
      else if ("placed" in r) relicEvents.push({ kind: "relicPlaced", id: r.placed.id, x: r.legend.x, z: r.legend.z, at: g.clock.time });
      else relicEvents.push(outsideCircle(g, r.outside));
    }
  }
  stepLeash(g.leash, g.creatures, { sigil, place, cycle: !!c.cycle && !W.ko, rune: (x, z, r) => runeNear(g.creatures, x, z, r, g.clock.time), inviteNearest: c.inviteNearest, talk: !t.invites.on && (c.autoTalk !== false || !!c.talkHeld) }, g.witch, g.witch.mode === "ground" && !W.ko, g.clock.time, dt, t, id => busy(id) || heldByCombat(g.creatures[id]) || !!g.creatures[id].travelling);
  g.leash.events.push(...relicEvents);
  // The 💌s (issue #87): on the ground, off her seat, not knocked out.
  stepInvites(W.invites, W.ko ? {} : c, { ...g.witch }, t.invites.on && g.witch.mode === "ground" && !g.witch.seated && !W.ko, g.creatures, affectionOf(g), g.clock.time, dt, t, M);
  // Frenzy (Stoat): an animal won over gives back a blink.
  if (M.frenzy > 0) for (const e of W.invites.events) if (e.kind === "happy") refundDash(W.dash, g.clock.time, charges);
  // A sigil put down in a wild area whose legend dreams of that creature: the quest is done.
  for (const e of g.leash.events.slice()) if (e.kind === "placed" && e.at === g.clock.time) {
    const ids = (g.legendIds ??= g.creatures.filter(k => k.boss).map(k => k.id)), L = questPlaced(g.map, g.creatures, ids, g.friendly, k => g.party.areas.has(k), e.id, e.x, e.z, g.clock.time);
    // (the right creature, but outside its legend's clearing: a gentle cue, and nothing happens)
    if (!L) { const O = questOutside(g.map, g.creatures, ids, k => g.party.areas.has(k), e.id, e.x, e.z); if (O) g.leash.events.push(outsideCircle(g, O)); }
    if (L) {
      g.questEvents.push({ kind: "done", id: L.id, joined: e.id, cell: [L.cell[0], L.cell[1]], key: cellKey(L.cell), x: L.x, z: L.z, at: g.clock.time });
      if (!g.party.areas.has(cellKey(L.cell))) onAreaDone(g.party, L.cell, g.clock.time); // (the ley line moves on: its quest done before its wave; after it, the line has moved on already)
      g.byArea = null;
    }
  }
  if (c.feedNearest) feedNearest(B, g.creatures, g.witch.x, g.witch.z, g.clock.time, t, g.beat);
  stepBerries(B, g.creatures, id => leashPoint(g.leash, id, g.witch.x, g.witch.z), g.clock.time, dt, t, g.beat);
  for (const e of g.leash.events) if (e.kind === "invited" || e.kind === "befriended") g.tally.invites++;
  // Made happy in an area that already has its soundsystem: it joins the dancing there (#87).
  for (const e of g.leash.events) if (e.kind === "befriended") { const c = g.creatures[e.id], a = g.party.areas.get(cellKey(c.cell)); if (a?.soundsystem && g.combat.sounds.has(cellKey(c.cell))) joinParty(g, c, a.soundsystem, a.cell); }
  g.leashEvents.push(...g.leash.events);
  for (const e of B.events) if (e.kind === "ate") g.tally.berries++; else if (e.kind === "evolved") g.tally.evolved++;
  stepSpeakerBoot(g);
  stepDancefloor(g, wave);
  stepWitchParty(g, c, dt);
  // Last, everyone in view eases apart from anyone closer than their sizes like (Ed, 2026-10-05).
  stepSpacing(g, dt);
}

/** Spacing (rules/spacing.ts) for the creatures within movement.json bodies.range of a witch (about the view on the ground): every kind of movement at
 *  once, after it's done. A sleeping legend (and one waking) holds its ground; one burrowed or in the air is out of it. */
function stepSpacing(g: Game, dt: number): void {
  const R = MOVEMENT.bodies.range, ws = g.witches.map(w => w.body), list: Creature[] = [];
  for (const c of g.creatures) {
    if (c.gone || c.burrow || c.leap) continue;
    for (const w of ws) if (Math.abs(c.x - w.x) < R && Math.abs(c.z - w.z) < R) { list.push(c); break; }
  }
  spaceOut(list, dt, c => !!c.partyLegend || dormant(g, c) || (c.stunUntil !== undefined && g.clock.time < c.stunUntil));
}

/** Wild areas grow (Ed, 2026-10-04): every wave each area still wild (and each one this wave
 *  woke) gains its creatures, as counts; those near a witch are made where she can't see them
 *  come, and a woken area's at once, to march on its new soundsystem. */
function stepGrowth(g: Game, waveBefore: number): void {
  const p = g.party, woken = new Set<string>();
  for (let w = waveBefore + 1; w <= p.wave; w++) {
    growWave(g.growth, g.map, w, key => { const a = p.areas.get(key); return (!a || a.wave >= w) && !p.ruined?.has(key); });
    for (const [key, a] of p.areas) if (a.wave >= w) woken.add(key);
  }
  if (materialize(g.growth, g.creatures, g.map, g.witches.map(w => w.body), simRadius(g), g.clock.time, woken)) g.byArea = null;
}

/** The wild creatures by the area they live in (its key). */
function indexByArea(creatures: Creature[]): Map<string, Creature[]> {
  const m = new Map<string, Creature[]>();
  for (const c of creatures) { const k = cellKey(c.cell); let l = m.get(k); if (!l) m.set(k, (l = [])); l.push(c); }
  return m;
}

/** Fights and sieges (rules/combat.ts): new soundsystems come under siege, every creature near a
 *  witch or busy with a siege fights, blows land on creatures, witches and soundsystems; a fallen
 *  soundsystem ends its party and its besiegers march on; the run ends when none stands. */
function stepFights(g: Game, t: Tuning, dt: number, busy: (id: number) => boolean): void {
  const S = g.combat, time = g.clock.time;
  // A new soundsystem: its area's wild creatures are enraged and march on it (#87: its quest done or not).
  for (const [key, a] of g.party.areas) if (a.soundsystem && !S.sounds.has(key) && !S.ruined.has(key)) {
    startSiege(S, key, a.soundsystem, a.cell, g.creatures, t);
    // Its besiegers march wherever she is (stepped from now on as busy, not only once she comes near).
    for (const c of g.creatures) if (c.siege === key && !c.gone) S.busy.add(c.id);
    // Its wild babies turn happy at once (Ed, 2026-10-06), its legend's circle's too; then its happy ones (#87) come and
    // dance: round it, or at the area's party places (rules/partyGuests.ts).
    for (const c of g.creatures) if (!c.gone && !c.leashed && c.level === 0 && !c.fleeUntil && stateOf(c) === "wild" && c.cell[0] === a.cell[0] && c.cell[1] === a.cell[1]) befriend(c, time);
    for (const c of g.creatures) if (!c.gone && !c.leashed && c.state === "happy" && c.cell[0] === a.cell[0] && c.cell[1] === a.cell[1]) joinParty(g, c, a.soundsystem, a.cell);
  }
  // Only creatures with something to fight near them take part: wild ones in or next to the area
  // of a witch or a party animal (wild never fights wild, and only besiegers go for soundsystems;
  // areas are far wider than any reach), and every party animal, besieger, and one fleeing or
  // mid-fight. (Not every wild one round a standing soundsystem: with the areas growing, Ed
  // 2026-10-04, that was thousands of idle creatures stepped for nothing.)
  const byArea = (g.byArea ??= indexByArea(g.creatures)), hot = new Set<string>(), active: Creature[] = [];
  const near = (x: number, z: number) => { const k = cellKey(g.map.cellSafe(x, z).cell); if (hot.has(k)) return; hot.add(k); for (const n of g.map.neighbours.get(k) ?? []) hot.add(n); };
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
  stepCombat(S, {
    creatures: g.creatures, active: stepped, time, dt, t, busy,
    witches: g.witches.map((w, i) => ({ id: i, x: w.body.x, z: w.body.z, onGround: w.body.mode === "ground" && !w.body.seated, down: !!w.ko, vx: w.body.vx, vz: w.body.vz })),
    leashPoint: id => { for (const w of g.witches) { const p = leashPoint(w.leash, id, w.body.x, w.body.z); if (p) return p; } return null; },
    asleep: c => !!c.partyLegend || dormant(g, c) || (!!c.friendly && !c.leashed), // (a friendly area's creatures leave her party be, and are left be)
    parked: id => g.witches.some(w => w.leash.placed.some(p => p.id === id)),
    talkingTo: id => g.witches.findIndex(w => !!w.leash.talk && w.leash.talk.id === id && !w.leash.talk.refused),
    exit: (x, z) => mapExit(g.map, x, z),
    unseen: (x, z) => g.witches.every(w => Math.hypot(w.body.x - x, w.body.z - z) > t.haze.far + 60),
    inArea: (c, x, z) => { const k = g.map.cellSafe(x, z).cell; return k[0] === c.cell[0] && k[1] === c.cell[1]; },
    slowWitch: (id, until, mult) => { const w = g.witches[id]; if (w) { w.slowUntil = Math.max(w.slowUntil ?? 0, until); w.slowMult = Math.min(mult, w.slowUntil > until ? w.slowMult ?? 1 : 1); } },
    hitWitch: (id, at, blow) => hitWitch(g, id, at, t, blow),
    loseParty: id => {
      for (const w of g.witches) { w.leash.stack = w.leash.stack.filter(i => i !== id); w.leash.placed = w.leash.placed.filter(p => p.id !== id); }
      g.creatures[id].leashed = false;
    },
  }, COMBAT);
  for (const c of active) if (!c.gone && !c.leashed && (c.siege || c.fleeUntil || c.fight?.target || c.wanderTo || c.dazed || c.retreat)) S.busy.add(c.id); // carried on wherever she is
  for (const e of S.events) if (e.kind === "soundDestroyed" && e.key && e.at === time) loseSoundsystem(g, e.key, e.x, e.z, t);
  // The home ring shows its damage speaker by speaker.
  const home = S.sounds.get("home");
  if (home && home.hp < home.max) { const f = 1 - home.hp / home.max, n = g.speakers.length; g.speakers = g.speakers.map((_, i) => (f >= (i + 1) / n ? "destroyed" : f >= (i + 0.5) / n ? "damaged" : "playing")); }
  if (!g.over && [...S.sounds.values()].every(h => h.hp <= 0)) g.over = { at: time };
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
    const key = tg?.kind === "sound" ? tg.key : c.siege!, h = S.sounds.get(key) ?? null;
    if (!h || h.hp <= 0) { c.lod = "full"; out.delete(c); continue; } // (its soundsystem fell: combat finds it the next)
    const dx = h.x - c.x, dz = h.z - c.z, dist = Math.hypot(dx, dz), step = Math.min(Math.max(0, dist - 10), c.speed * t.combat.marchMult * dt * L.every); // (over the line it's in full next step)
    if (dist > 1e-6) { c.x += (dx / dist) * step; c.z += (dz / dist) * step; }
    if (Math.abs(dx) > 0.02) c.facing = dx > 0 ? 1 : -1;
    c.away = dz < -Math.abs(dx); c.moving = step > 0; c.walk += dt * L.every * 5;
  }
  return out;
}

/** A soundsystem destroyed: its party over (the home ring's speakers all destroyed), its besiegers
 *  marching on, and the next wave sooner (Ed, 2026-10-05: a loss takes party.lossPenalty seconds
 *  off the countdown, "all waves sooner is the wrong kind of penalty"). */
/** Where something running off the map heads: just past its nearest edge. */
function mapExit(map: ForestMap, x: number, z: number): { x: number; z: number } {
  return exitPoint(map.bounds, x, z, 30);
}

export function loseSoundsystem(g: Game, key: string, x: number, z: number, t: Tuning = g.tuning): void {
  const S = g.combat, time = g.clock.time;
  if (key === "home") g.speakers = g.speakers.map(() => "destroyed" as SpeakerState);
  else {
    g.party.areas.delete(key); S.ruined.add(key); (g.party.ruined ??= new Set()).add(key);
    // Its happy babies run off home, for good (Ed, 2026-10-06); leashed ones (and parked ones) stay hers.
    for (const c of g.creatures) if (!c.gone && !c.leashed && c.level === 0 && c.state === "happy" && !c.fleeUntil && cellKey(c.cell) === key) {
      const out = mapExit(g.map, c.x, c.z);
      Object.assign(c, { fleeUntil: Infinity, fleeX: out.x, fleeZ: out.z, dancing: false, fight: undefined });
      S.events.push({ kind: "fled", x: c.x, z: c.z, at: time, id: c.id }); S.busy.add(c.id);
    }
  }
  marchOn(S, key, g.creatures);
  const cut = hurryWave(g.party, time, t.party.lossPenalty ?? 0);
  g.waveEvents.push({ kind: "soundsystemLost", key, x, z, at: time, cut, left: Math.max(0, g.party.nextAt - time) });
}

/** The party witches: one for each soundsystem playing (oldest first), and the player idling in. */
function stepWitchParty(g: Game, c: Controls, dt: number): void {
  const d = g.map.dancefloor, t = g.tuning, areas: { key: string; x: number; z: number; at: number }[] = [];
  for (const [key, a] of g.party.areas) if (a.soundsystem) areas.push({ key, x: a.soundsystem.x, z: a.soundsystem.z, at: a.at });
  areas.sort((a, b) => a.at - b.at);
  // Debug (?witches=N): N more, as if from soundsystems round the floor.
  for (let i = 0; i < t.partyWitches.debugExtra; i++) areas.push({ key: `debug-${i}`, x: d.x + Math.cos(i * 2.4) * 100, z: d.z + Math.sin(i * 2.4) * 100, at: 0 });
  const w = g.witch, moving = Math.hypot(c.moveX, c.moveZ) > 0.05 || Math.hypot(w.vx, w.vz) > 0.3 || !!(c.toggleMode || c.sigil || c.place || c.cycle || c.spell);
  // Round the floor they keep clear of trees, rocks, the speakers and the treehouse and its clearing (Ed, 2026-10-06).
  const th = g.map.treehouse, clear = (x: number, z: number) => blinkClear(g, x, z) && Math.hypot(x - th.x, z - th.z) > t.treehouse.clear;
  stepPartyWitches(g.partyWitches, areas, { x: d.x, z: d.z, radius: d.radius, clear }, [{ x: w.x, z: w.z, onFoot: w.mode === "ground" && !w.seated, moving, treetop: w.mode === "treetop" }], g.clock.time, dt, t);
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
    time: g.clock.time, beatAt: tm => beatAt(g.beat, tm), seed: g.seed, level: floorLevel(g.party.areas.size, g.tuning), partifiedAreas: areas,
    witch: { x: w.x, y: w.y, lift: g.witch.lift, rgb: neonOf(g.tuning.dancefloor.tiles.witchColour) }, dancers,
    moon: { phase: moonState(g.clock.time, g.seed, g.tuning).phase },
  };
}

// The home speakers' boot (Ed, 2026-10-06): each starts as a small runestone, and the boot pulse turns it into its speaker.
// Until the pulse drives it (the rendering builder's: bootSpeaker), they turn one by one round the ring over the boot, as
// speakersOn always counted; a run that starts after the boot has them all speakers.
function stepSpeakerBoot(g: Game): void {
  const n = g.speakerBoot.length, on = speakersOn(g.party, g.map, g.clock.time, n);
  for (let i = 0; i < on; i++) if (g.speakerBoot[i] === null) bootSpeaker(g, i);
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

// Before the first wave the floor shows only the moon (Ed, 2026-10-06); it switches on, the full moon
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
const outsideCircle = (g: Game, L: Creature) => { const c = g.map.legendClearing(L.cell[0], L.cell[1]); return { kind: "outsideCircle" as const, id: L.id, x: c?.x ?? L.x, z: c?.z ?? L.z, at: g.clock.time }; };

export const dormant = (_g: Game, c: Creature): boolean => !!c.boss && !c.leashed && (c.legendState === "asleep" || c.legendState === "restless"); // (asleep or restless: scenery, untouchable)

/** The legends' states (Ed, 2026-10-05, #87; rules/legends.ts): asleep, dreaming; restless while
 *  its area has none of its kind, angry once that's run its course; happy by a relic. Angry and
 *  happy ones shoot from afar (combat: stepLegendAttack); worn down, they go back to sleep. Debug
 *  (O): the nearest made happy. A happy one heals while no enemy is near. */
function stepLegends(g: Game, ids: number[], happyNearest: boolean): void {
  const time = g.clock.time;
  // Asleep, restless (no kin in its area), angry; happy by a relic (rules/legends.ts, #87).
  stepLegendStates({
    creatures: g.creatures, map: g.map, time, dt: STEP, partified: k => g.party.areas.has(k),
    areaOf: c => { if (c.leashed) { const p = g.leash.placed.find(q => q.id === c.id); return p ? cellKey(g.map.cellSafe(p.x, p.z).cell) : ""; } return cellKey(c.cell); },
  }, ids);
  // A happy legend heals to whole over legends.healTime while no enemy is near (balance builder, #80).
  for (const id of ids) { const c = g.creatures[id]; if (c.legendState === "happy" && c.hp !== undefined && !c.fight?.target) { c.hp += (maxHp(c.level) / LEGENDS.healTime) * STEP; if (c.hp >= maxHp(c.level)) c.hp = undefined; } }
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

/** The area type under the witch, by name (and its set piece, if it shows one), for the debug overlay. */
export function areaUnderWitch(g: Game): string {
  const a = g.map.areaAt(g.witch.x, g.witch.z), piece = g.map.setPieceOf(a.cell[0], a.cell[1]);
  return AREA_TYPES[a.type].name + (piece ? ` (set piece: ${piece})` : "");
}
