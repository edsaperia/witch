// The whole game state, and one step of it. No drawing here: the Three.js layer reads this.
import { MOVEMENT } from "./movement";
import { spaceOut } from "./spacing";
import { onAreaDone } from "./leylines";
import { questPlaced, type QuestEvent } from "./quest";
import { beatAt, newBeatClock, waveArrived, waveTempo, type BeatClock } from "./beat";
import { cameraPose, newCamera, stepCamera, type CameraPose, type CameraState } from "./camera";
import { MAX_STEP, newClock, type Clock } from "./clock";
import { heldByCombat, spawnCreatures, stepCreaturesNear, stepNotice, wanderRange, type Creature } from "./creatures";
import { Forest } from "./forest";
import { inviteCreature, leashPoint, newLeash, stepLeash, type LeashControls, type LeashState } from "./leash";
import { stepTravel, updateModes } from "./travel";
import { buffing, cheer, LEGENDS, placeRelics, relicButton, stepLegendStates, type Relic } from "./legends";
import { danceAt, invitableNow, stateOf, STATES } from "./creatureStates";
import { feedNearest, newBerries, stepBerries, type BerryState } from "./berries";
import { cellKey, hurryWave, newParty, spreadWave, stepParty, type PartyState } from "./party";
import { AREA_TYPES, generateMap, type ForestMap } from "./map";
import { nextSpeakerState, type SpeakerState } from "./speakers";
import { floorEvent, floorLevel, neon, newFloor, stepFloor, switchOn, tileOf, type FloorInputs, type FloorState } from "./dancefloor";
import { SIGIL_NEON } from "../../art/sigils.js";
import { LEGEND_BUFFS, newBuffs, stepBuffs, type BuffState } from "./buffs";
import { COMBAT, marchOn, maxHp, newCombat, startSiege, stepCombat, type CombatState } from "./combat";
import { hurt, knockOut, newHealth, repair, stepKnockout, stepWanderers, type Health, type Knockout, type KnockoutEvent } from "./knockout";
import { dropCache, newInvites, stepInvites, type Affection, type InviteControls, type Invites } from "./invites";
import { affection, blocksLetters, hit as hitAffection } from "./affection";
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
  /** Her hits left and repair (rules/knockout.ts), and her knockout while it plays out. */
  health: Health;
  ko: Knockout | null;
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
  /** The creatures by home area (rebuilt when one settles somewhere new). */
  byArea?: Map<string, Creature[]> | null;
  /** The areas' legends, by id (rules/creatures.ts: one an area), found once. */
  legendIds?: number[];
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
  return { id, body: { ...newWitch(x, z), seated: true }, leash: newLeash(), spells: newSpells(t), dash: newDash(), invites: newInvites(), health: newHealth(t), ko: null };
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
    beat: newBeatClock(tuning.beat.bpm, waveTempo(tuning, 0)),
    floor: newFloor(), buffs: newBuffs(tuning), partyWitches: newPartyWitches(seed),
    combat: newCombat(), koEvents: [] as KnockoutEvent[], friendly: new Set<string>(), questEvents: [] as QuestEvent[], waveEvents: [] as WaveEvent[], relics: placeRelics(map, forest), tally: { berries: 0, invites: 0, evolved: 0 }, growth: newGrowth(), over: null as { at: number } | null,
    acc: 0, alpha: 1, pending: {}, prev: { witches: [], creatures: new Float64Array(creatures.length * 2), camera: null },
  };
  const d = map.dancefloor, C = tuning.combat;
  g.combat.sounds.set("home", { hp: C.homeHealth, max: C.homeHealth, x: d.x, z: d.z, radius: C.homeRadius });
  return g as Game;
}

/** The presses that happen once (not held): kept for the next step if a frame runs none. */
const ONE_SHOT = ["toggleMode", "sigil", "spell", "dash", "nextWave", "pauseWaves", "feedNearest", "inviteNearest", "happyNearest"] as const;

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
  g.combat.events = []; g.koEvents = []; g.questEvents = []; g.waveEvents = [];
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
 *  (rules/affection.ts). A full meter makes a wild one happy; filled again (states.leash "again"),
 *  a happy one is leashed. How many letters fill it is the tuning's invites.hits (buffs change it);
 *  the per-animal hit gap is rules/invites.ts's (invites.perAnimalHitGap). */
export const affectionOf = (g: Game): Affection => {
  const t = g.buffs?.tuning ?? g.tuning, s = g.witches[0].invites, data = { ...STATES, affection: { ...STATES.affection, hits: t.invites.hits, gap: 0 } };
  return {
    invitable: c => invitableNow(c, data),
    blocksLetters: c => blocksLetters(c),
    hit(c, amount, time) {
      const was = stateOf(c);
      hitAffection({ time, leash: k => inviteCreature(g.leash, k, k.x, k.z, time) }, c, amount, time, data);
      if (stateOf(c) !== was) s.events.push({ kind: "happy", x: c.x, z: c.z, at: time, id: c.id }); // (happy, or leashed)
    },
    affection: c => affection({ time: g.clock.time }, c, data),
  };
};

/** A hit on witch `id` at game time `at`: it costs her a hit unless she's mid-blink (nowhere). */
export function hitWitch(g: Game, id: number, at: number, t: Tuning = g.tuning): void {
  const w = g.witches[id];
  if (!w || w.ko || dashing(w.dash, at)) return;
  if (hurt(w.health, at, t)) { w.ko = knockOut(w.leash, g.creatures, at, t); g.koEvents.push({ kind: "down", at, x: w.body.x, z: w.body.z }); }
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
export function interpolated<T>(g: Game, draw: () => T): T {
  const k = g.alpha, pw = g.prev.witches, pc = g.prev.creatures, C = g.creatures;
  if (k >= 1 || !pw.length || pc.length !== C.length * 2) return draw();
  const bodies = g.witches.map(w => w.body), camera = g.camera, cx = new Float64Array(C.length * 2);
  const mix = (a: number, b: number) => a + (b - a) * k;
  g.witches.forEach((w, i) => { const p = pw[i]; if (p) w.body = { ...w.body, x: mix(p.x, w.body.x), z: mix(p.z, w.body.z), lift: mix(p.lift, w.body.lift) }; });
  // (a jump further than a charge covers in a slow frame is a teleport: not blended)
  for (let i = 0; i < C.length; i++) { cx[2 * i] = C[i].x; cx[2 * i + 1] = C[i].z; if (Math.hypot(pc[2 * i] - C[i].x, pc[2 * i + 1] - C[i].z) < 20) { C[i].x = mix(pc[2 * i], C[i].x); C[i].z = mix(pc[2 * i + 1], C[i].z); } }
  const pcam = g.prev.camera;
  if (pcam) g.camera = { ...camera, tx: mix(pcam.tx, camera.tx), ty: mix(pcam.ty, camera.ty), tz: mix(pcam.tz, camera.tz), lift: mix(pcam.lift, camera.lift), zoom: mix(pcam.zoom, camera.zoom), ax: mix(pcam.ax, camera.ax), az: mix(pcam.az, camera.az), pull: pcam.pull === undefined || camera.pull === undefined ? camera.pull : mix(pcam.pull, camera.pull), intro: pcam.intro === undefined || camera.intro === undefined ? camera.intro : mix(pcam.intro, camera.intro) };
  try { return draw(); }
  finally {
    g.witches.forEach((w, i) => { w.body = bodies[i]; });
    for (let i = 0; i < C.length; i++) { C[i].x = cx[2 * i]; C[i].z = cx[2 * i + 1]; }
    g.camera = camera;
  }
}

/** One fixed step of the whole game. */
function fixedStep(g: Game, controls: Controls): void {
  let c = controls;
  const dt = STEP;
  g.clock.time += dt;
  const wave = g.party.wave, seated = g.witch.seated;
  // Legend buffs: the happy legends (and any party legend) change the numbers the rest of the step plays by.
  const legends = (g.legendIds ??= g.creatures.filter(k => k.boss).map(k => k.id));
  stepBuffs(g.buffs, g.creatures, [...g.leash.stack, ...g.leash.placed.map(p => p.id), ...legends.filter(id => buffing(g.creatures[id]))], g.tuning);
  const t = g.buffs.tuning;
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
  const was = W.body;
  rechargeDash(W.dash, g.clock.time, charges, t.dash.cooldown);
  // A blink (Decoy, Beaver: it leaves a waiting 💌 where she was).
  if (c.dash && startDash(W.dash, was, c.moveX, c.moveZ, g.clock.time, t, g.map.bounds, (x, z) => blinkClear(g, x, z), charges, H.charges.chain) && M.decoy > 0) dropCache(W.invites, was.x, was.z, g.clock.time, t, M);
  W.body = applyDash(W.dash, stepWitch(was, c, dt, boost === 1 ? t : { ...t, groundSpeed: t.groundSpeed * boost, treetopSpeed: t.treetopSpeed * boost }, g.map.bounds));
  g.camera = stepCamera(g.camera, c.zoom, { x: g.witch.x, y: witchHeight(g.witch, g.tuning), z: g.witch.z }, { x: g.witch.vx, z: g.witch.vz }, g.witch.lift, dt, g.tuning, !!g.witch.seated, g.introFocus);
  if (c.pauseWaves) g.party.paused = !g.party.paused;
  if (c.nextWave) { spreadWave(g.party, g.map, g.clock.time); g.party.nextAt = g.clock.time + t.party.interval; }
  stepParty(g.party, g.map, g.clock.time, dt);
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
  stepFights(g, t, dt, busy);
  // Noticing her (before they step, so a curious baby sets off this step).
  {
    const near: Creature[] = [], byArea = (g.byArea ??= indexByArea(g.creatures)), seen = new Set<string>();
    for (const w of g.witches) { if (w.body.mode !== "ground") continue; const k = cellKey(g.map.cellSafe(w.body.x, w.body.z).cell); for (const a of [k, ...(g.map.neighbours.get(k) ?? [])]) if (!seen.has(a)) { seen.add(a); near.push(...(byArea.get(a) ?? [])); } }
    const T = COMBAT.temperament;
    stepNotice(near, g.witches.map(w => ({ x: w.body.x, z: w.body.z, onGround: w.body.mode === "ground" && !w.body.seated && !w.ko })), sp => (T.curious.includes(sp) ? "curious" : T.skittish.includes(sp) ? "skittish" : null), t);
  }
  stepCreaturesNear(g.creatures, g.witch.x, g.witch.z, simRadius(g), dt, g.clock.time, g.map, c => dormant(g, c), g.tuning.haze.far + 20 + wanderRange(g.map) * 1.5);
  if (stepWanderers([...g.combat.busy].map(id => g.creatures[id]), g.map, dt)) g.byArea = null; // (those walking home are among combat's busy)
  // (A party animal in a fight is moved by combat, not its leash.)
  const placedBefore = g.leash.events.length;
  // Far from her on the ground, or from its sigil, a party animal travels (rules/travel.ts): quiet, along area borders.
  stepTravel(g.leash.stack, g.leash.placed, g.creatures, g.witch, g.map, dt, t, id => busy(id) || heldByCombat(g.creatures[id]), t.leash.pace ?? 1);
  // The sigil button by a lying relic picks it up; carrying one, by a sleeping legend, puts it down there (rules/legends.ts).
  let sigil = !!c.sigil && !W.ko;
  if (sigil && g.witch.mode === "ground") {
    const r = relicButton(g.relics, g.leash.relics, g.creatures, legends, g.witch.x, g.witch.z, g.clock.time);
    if (r) {
      sigil = false;
      if ("picked" in r) g.leash.events.push({ kind: "relicPicked", id: r.picked.id, x: r.picked.x, z: r.picked.z, at: g.clock.time });
      else g.leash.events.push({ kind: "relicPlaced", id: r.placed.id, x: r.legend.x, z: r.legend.z, at: g.clock.time });
    }
  }
  stepLeash(g.leash, g.creatures, { sigil, inviteNearest: c.inviteNearest, talk: !t.invites.on && (c.autoTalk !== false || !!c.talkHeld) }, g.witch, g.witch.mode === "ground" && !W.ko, g.clock.time, dt, t, id => busy(id) || heldByCombat(g.creatures[id]) || !!g.creatures[id].travelling);
  // The 💌s (issue #87): on the ground, off her seat, not knocked out.
  stepInvites(W.invites, W.ko ? {} : c, { ...g.witch }, t.invites.on && g.witch.mode === "ground" && !g.witch.seated && !W.ko, g.creatures, affectionOf(g), g.clock.time, dt, t, M);
  // Frenzy (Stoat): an animal won over gives back a blink.
  if (M.frenzy > 0) for (const e of W.invites.events) if (e.kind === "happy") refundDash(W.dash, g.clock.time, charges);
  // A sigil put down in a wild area whose legend dreams of that creature: the quest is done.
  for (const e of g.leash.events.slice(placedBefore)) if (e.kind === "placed" && e.at === g.clock.time) {
    const L = questPlaced(g.map, g.creatures, (g.legendIds ??= g.creatures.filter(k => k.boss).map(k => k.id)), g.friendly, k => g.party.areas.has(k), e.id, e.x, e.z, g.clock.time);
    if (L) {
      g.questEvents.push({ kind: "done", id: L.id, joined: e.id, cell: [L.cell[0], L.cell[1]], key: cellKey(L.cell), x: L.x, z: L.z, at: g.clock.time });
      onAreaDone(g.party, L.cell, g.clock.time); // (the ley line moves on: its quest done before its wave)
      g.byArea = null;
    }
  }
  if (c.feedNearest) feedNearest(B, g.creatures, g.witch.x, g.witch.z, g.clock.time, t, g.beat);
  stepBerries(B, g.creatures, id => leashPoint(g.leash, id, g.witch.x, g.witch.z), g.clock.time, dt, t, g.beat);
  for (const e of g.leash.events) if (e.kind === "invited" || e.kind === "befriended") g.tally.invites++;
  // Made happy in an area that already has its soundsystem: it joins the dancing there (#87).
  for (const e of g.leash.events) if (e.kind === "befriended") { const c = g.creatures[e.id], a = g.party.areas.get(cellKey(c.cell)); if (a?.soundsystem && g.combat.sounds.has(cellKey(c.cell))) danceAt(c, a.soundsystem); }
  for (const e of B.events) if (e.kind === "ate") g.tally.berries++; else if (e.kind === "evolved") g.tally.evolved++;
  stepDancefloor(g, wave, seated);
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
  spaceOut(list, dt, c => dormant(g, c) || (c.stunUntil !== undefined && g.clock.time < c.stunUntil));
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
    // Its happy ones (#87) come and dance round it.
    for (const c of g.creatures) if (!c.gone && !c.leashed && c.state === "happy" && c.cell[0] === a.cell[0] && c.cell[1] === a.cell[1]) danceAt(c, a.soundsystem);
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
  stepCombat(S, {
    creatures: g.creatures, active, time, dt, t, busy,
    witches: g.witches.map((w, i) => ({ id: i, x: w.body.x, z: w.body.z, onGround: w.body.mode === "ground" && !w.body.seated, down: !!w.ko, vx: w.body.vx, vz: w.body.vz })),
    leashPoint: id => { for (const w of g.witches) { const p = leashPoint(w.leash, id, w.body.x, w.body.z); if (p) return p; } return null; },
    asleep: c => dormant(g, c) || (!!c.friendly && !c.leashed), // (a friendly area's creatures leave her party be, and are left be)
    parked: id => g.witches.some(w => w.leash.placed.some(p => p.id === id)),
    talkingTo: id => g.witches.findIndex(w => !!w.leash.talk && w.leash.talk.id === id && !w.leash.talk.refused),
    exit: (x, z) => {
      const b = g.map.bounds, edges = [[b.minX - 30, z, x - b.minX], [b.maxX + 30, z, b.maxX - x], [x, b.minZ - 30, z - b.minZ], [x, b.maxZ + 30, b.maxZ - z]];
      const e = edges.reduce((m, q) => (q[2] < m[2] ? q : m));
      return { x: e[0], z: e[1] };
    },
    unseen: (x, z) => g.witches.every(w => Math.hypot(w.body.x - x, w.body.z - z) > t.haze.far + 60),
    inArea: (c, x, z) => { const k = g.map.cellSafe(x, z).cell; return k[0] === c.cell[0] && k[1] === c.cell[1]; },
    slowWitch: (id, until, mult) => { const w = g.witches[id]; if (w) { w.slowUntil = Math.max(w.slowUntil ?? 0, until); w.slowMult = Math.min(mult, w.slowUntil > until ? w.slowMult ?? 1 : 1); } },
    hitWitch: (id, at) => hitWitch(g, id, at, t),
    loseParty: id => {
      for (const w of g.witches) { w.leash.stack = w.leash.stack.filter(i => i !== id); w.leash.placed = w.leash.placed.filter(p => p.id !== id); }
      g.creatures[id].leashed = false;
    },
  }, COMBAT);
  for (const c of active) if (!c.gone && !c.leashed && (c.siege || c.fleeUntil || c.fight?.target || c.wanderTo || c.dazed)) S.busy.add(c.id); // carried on wherever she is
  for (const e of S.events) if (e.kind === "soundDestroyed" && e.key && e.at === time) loseSoundsystem(g, e.key, e.x, e.z, t);
  // The home ring shows its damage speaker by speaker.
  const home = S.sounds.get("home");
  if (home && home.hp < home.max) { const f = 1 - home.hp / home.max, n = g.speakers.length; g.speakers = g.speakers.map((_, i) => (f >= (i + 1) / n ? "destroyed" : f >= (i + 0.5) / n ? "damaged" : "playing")); }
  if (!g.over && [...S.sounds.values()].every(h => h.hp <= 0)) g.over = { at: time };
}

/** A soundsystem destroyed: its party over (the home ring's speakers all destroyed), its besiegers
 *  marching on, and the next wave sooner (Ed, 2026-10-05: a loss takes party.lossPenalty seconds
 *  off the countdown, "all waves sooner is the wrong kind of penalty"). */
export function loseSoundsystem(g: Game, key: string, x: number, z: number, t: Tuning = g.tuning): void {
  const S = g.combat, time = g.clock.time;
  if (key === "home") g.speakers = g.speakers.map(() => "destroyed" as SpeakerState);
  else { g.party.areas.delete(key); S.ruined.add(key); (g.party.ruined ??= new Set()).add(key); }
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
  const w = g.witch, moving = Math.hypot(c.moveX, c.moveZ) > 0.05 || Math.hypot(w.vx, w.vz) > 0.3 || !!(c.toggleMode || c.sigil || c.spell);
  stepPartyWitches(g.partyWitches, areas, { x: d.x, z: d.z, radius: d.radius }, [{ x: w.x, z: w.z, onFoot: w.mode === "ground" && !w.seated, moving }], g.clock.time, dt, t);
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
  };
}

// The floor switches on when the witch first leaves the terrace; a wave sends a pulse towards the
// area it reached; a sigil placed flashes out from the centre.
function stepDancefloor(g: Game, waveBefore: number, wasSeated: boolean | undefined): void {
  const f = g.floor, time = g.clock.time, d = g.map.dancefloor;
  if (wasSeated !== false && !g.witch.seated) switchOn(f, time);
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
export const dormant = (_g: Game, c: Creature): boolean => !!c.boss && !c.leashed && (c.legendState === "asleep" || c.legendState === "restless" || c.legendState === "waking" || c.legendState === "slept"); // (asleep or restless: scenery, untouchable)

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
export const simRadius = (g: Game) => Math.max(g.tuning.creatureSimRadius, g.tuning.haze.far + 20 + wanderRange(g.map) * 2.5);

export const poseOf = (g: Game): CameraPose => cameraPose(g.camera, g.camera.lift, g.tuning);

/** The area type under the witch, by name (and its set piece, if it shows one), for the debug overlay. */
export function areaUnderWitch(g: Game): string {
  const a = g.map.areaAt(g.witch.x, g.witch.z), piece = g.map.setPieceOf(a.cell[0], a.cell[1]);
  return AREA_TYPES[a.type].name + (piece ? ` (set piece: ${piece})` : "");
}
