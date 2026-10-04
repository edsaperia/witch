// The whole game state, and one step of it. No drawing here: the Three.js layer reads this.
import { cameraPose, newCamera, stepCamera, type CameraPose, type CameraState } from "./camera";
import { MAX_STEP, newClock, type Clock } from "./clock";
import { heldByCombat, spawnCreatures, stepCreaturesNear, wanderRange, type Creature } from "./creatures";
import { Forest } from "./forest";
import { leashPoint, newLeash, stepLeash, type LeashControls, type LeashState } from "./leash";
import { feedNearest, newBerries, stepBerries, type BerryState } from "./berries";
import { cellKey, newParty, planAhead, spreadWave, stepParty, type PartyState } from "./party";
import { AREA_TYPES, generateMap, type ForestMap } from "./map";
import { nextSpeakerState, type SpeakerState } from "./speakers";
import { floorEvent, floorLevel, neon, newFloor, stepFloor, switchOn, tileOf, type FloorInputs, type FloorState } from "./dancefloor";
import { SIGIL_NEON } from "../../art/sigils.js";
import { newBuffs, stepBuffs, type BuffState } from "./buffs";
import { COMBAT, marchOn, newCombat, startSiege, stepCombat, type CombatState } from "./combat";
import { hurt, knockOut, newHealth, repair, stepKnockout, stepWanderers, type Health, type Knockout, type KnockoutEvent } from "./knockout";
import { applyDash, newDash, startDash, type DashState } from "./dash";
import { castSpell, newSpells, speedMultiplier, type SpellState } from "./spells";
import { newPartyWitches, stepPartyWitches, type PartyWitches } from "./partyWitches";
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
  /** Her hits left and repair (rules/knockout.ts), and her knockout while it plays out. */
  health: Health;
  ko: Knockout | null;
}

/** The simulation's fixed step (seconds): the rules advance only in these, driven only by the
 *  inputs and the seed, so the same inputs give the same game (Stage 4: deterministic sim). */
export const STEP = 1 / 60;

export interface Game {
  readonly seed: number;
  readonly tuning: Tuning;
  readonly map: ForestMap;
  readonly forest: Forest;
  readonly creatures: Creature[];
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
  /** The creatures by home area (rebuilt when one settles somewhere new). */
  byArea?: Map<string, Creature[]> | null;
  /** The run is over (every soundsystem destroyed): when. */
  over: { at: number } | null;
  /** One-shot presses (rise, sigil, spell...) waiting for the next step. */
  pending: Partial<Controls>;
  /** Where each witch and creature was before the latest step, for interpolation. */
  prev: { witches: { x: number; z: number; lift: number }[]; creatures: Float64Array; camera: CameraState | null };
  /** Each dancefloor speaker's state, in map.dancefloor.speakers' order. */
  speakers: SpeakerState[];
  /** The dancefloor's tile lights (rules/dancefloor.ts). */
  floor: FloorState;
  /** The legend buffs on now, and the tuning they make (rules/buffs.ts): the game plays by buffs.tuning. */
  buffs: BuffState;
  /** The party witches on the dancefloor, and the players idling into the party (rules/partyWitches.ts). */
  partyWitches: PartyWitches;
  /** Where the opening shot looks: her seat on the treehouse as drawn (the view sets it; the art knows where it is). */
  introFocus?: { x: number; y: number; z: number };
}

export interface Controls extends Intent, Partial<LeashControls> {
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
  return { id, body: { ...newWitch(x, z), seated: true }, leash: newLeash(), spells: newSpells(t), dash: newDash(), health: newHealth(t), ko: null };
}

export function newGame(seed: number, tuning: Tuning, players = 1): Game {
  const map = generateMap(seed, tuning);
  const witches = Array.from({ length: Math.max(1, players) }, (_, i) => newWitchPlayer(i, map.start.x + i * 2, map.start.z, tuning));
  const body = witches[0].body, creatures = spawnCreatures(map);
  const g = {
    seed, tuning, map, forest: new Forest(map), creatures, clock: newClock(), witches,
    get witch() { return this.witches[0].body; }, set witch(w: WitchState) { this.witches[0].body = w; },
    get leash() { return this.witches[0].leash; }, set leash(l: LeashState) { this.witches[0].leash = l; },
    get spells() { return this.witches[0].spells; }, set spells(s: SpellState) { this.witches[0].spells = s; },
    camera: newCamera(tuning, body.x, witchHeight(body, tuning), body.z), party: newParty(map), berries: newBerries(map, tuning),
    speakers: map.dancefloor.speakers.map(() => "playing" as SpeakerState),
    floor: newFloor(), buffs: newBuffs(tuning), partyWitches: newPartyWitches(seed),
    combat: newCombat(), koEvents: [] as KnockoutEvent[], over: null as { at: number } | null,
    acc: 0, alpha: 1, pending: {}, prev: { witches: [], creatures: new Float64Array(creatures.length * 2), camera: null },
  };
  const d = map.dancefloor, C = tuning.combat;
  g.combat.sounds.set("home", { hp: C.homeHealth, max: C.homeHealth, x: d.x, z: d.z, radius: C.homeRadius });
  return g as Game;
}

/** The presses that happen once (not held): kept for the next step if a frame runs none. */
const ONE_SHOT = ["toggleMode", "sigil", "spell", "cycle", "dash", "nextWave", "pauseWaves", "feedNearest", "inviteNearest"] as const;

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
  g.combat.events = []; g.koEvents = [];
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
  for (let i = 0; i < C.length; i++) { cx[2 * i] = C[i].x; cx[2 * i + 1] = C[i].z; if (Math.hypot(pc[2 * i] - C[i].x, pc[2 * i + 1] - C[i].z) < 5) { C[i].x = mix(pc[2 * i], C[i].x); C[i].z = mix(pc[2 * i + 1], C[i].z); } }
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
  // Legend buffs: the party legends alive now change the numbers the rest of the step plays by.
  stepBuffs(g.buffs, g.creatures, [...g.leash.stack, ...g.leash.placed.map(p => p.id)], g.tuning);
  const t = g.buffs.tuning;
  if ((g.party.seeAhead ?? 0) !== g.buffs.totals.forecastAhead) { g.party.seeAhead = g.buffs.totals.forecastAhead; planAhead(g.party, g.map); }
  if (c.spell) castSpell(g.spells, g.clock.time, t);
  // The speed boost: her speeds times its multiplier while it's on.
  const boost = speedMultiplier(g.spells, g.clock.time, t);
  const W = g.witches[0];
  // Knocked out: no input but the camera's zoom while it plays out.
  if (W.ko) c = { moveX: 0, moveZ: 0, toggleMode: false, zoom: c.zoom };
  const was = W.body;
  if (c.dash) startDash(W.dash, was, c.moveX, c.moveZ, g.clock.time, t);
  W.body = applyDash(W.dash, was, stepWitch(was, c, dt, boost === 1 ? t : { ...t, groundSpeed: t.groundSpeed * boost, treetopSpeed: t.treetopSpeed * boost }, g.map.bounds), g.clock.time, dt, t, g.map.bounds);
  g.camera = stepCamera(g.camera, c.zoom, { x: g.witch.x, y: witchHeight(g.witch, g.tuning), z: g.witch.z }, { x: g.witch.vx, z: g.witch.vz }, g.witch.lift, dt, g.tuning, !!g.witch.seated, g.introFocus);
  if (c.pauseWaves) g.party.paused = !g.party.paused;
  if (c.nextWave) { spreadWave(g.party, g.map, g.clock.time); g.party.nextAt = g.clock.time + t.party.interval; }
  const before = g.party.wave;
  stepParty(g.party, g.map, g.clock.time, dt);
  // A wave-countdown buff: each new countdown runs longer by its share of the interval.
  if (g.party.wave > before) g.party.nextAt += t.party.interval - g.tuning.party.interval;
  if (W.ko) {
    const r = stepKnockout(W.ko, W.body, W.leash, g.creatures, g.map, g.clock.time, k => g.party.areas.has(k), g.koEvents);
    W.body = r.body;
    for (const e of g.koEvents) if (e.kind === "released" && e.id !== undefined) g.combat.busy.add(e.id); // walking home from wherever it is
    if (r.done) { W.ko = null; W.health.hp = t.witchHealth.hits; W.health.repairAt = Infinity; }
  }
  repair(W.health, g.clock.time, t);
  const B = g.berries, busy = (id: number) => B.feeding.has(id) || B.evolving.has(id);
  stepFights(g, t, dt, busy);
  stepCreaturesNear(g.creatures, g.witch.x, g.witch.z, simRadius(g), dt, g.clock.time, g.map, c => dormant(g, c));
  if (stepWanderers([...g.combat.busy].map(id => g.creatures[id]), g.map, dt)) g.byArea = null; // (those walking home are among combat's busy)
  // (A party animal in a fight is moved by combat, not its leash.)
  stepLeash(g.leash, g.creatures, { sigil: !!c.sigil && !W.ko, inviteNearest: c.inviteNearest, cycle: !!c.cycle && !W.ko }, g.witch, g.witch.mode === "ground" && !W.ko, g.clock.time, dt, t, id => busy(id) || heldByCombat(g.creatures[id]));
  if (c.feedNearest) feedNearest(B, g.creatures, g.witch.x, g.witch.z, g.clock.time, t);
  stepBerries(B, g.creatures, id => leashPoint(g.leash, id, g.witch.x, g.witch.z), g.clock.time, dt, t);
  stepDancefloor(g, wave, seated);
  stepWitchParty(g, c, dt);
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
  for (const [key, a] of g.party.areas) if (a.soundsystem && !S.sounds.has(key) && !S.ruined.has(key)) startSiege(S, key, a.soundsystem, a.cell, g.creatures, t);
  // Only creatures with something to fight near them take part: wild ones in or next to the area
  // of a witch, a party animal or a standing soundsystem (wild never fights wild; areas are far
  // wider than any reach), and every party animal, besieger, and one fleeing or mid-fight.
  const byArea = (g.byArea ??= indexByArea(g.creatures)), hot = new Set<string>(), active: Creature[] = [];
  const near = (x: number, z: number) => { const k = cellKey(g.map.cellSafe(x, z).cell); if (hot.has(k)) return; hot.add(k); for (const n of g.map.neighbours.get(k) ?? []) hot.add(n); };
  for (const w of g.witches) near(w.body.x, w.body.z);
  for (const w of g.witches) for (const id of [...w.leash.stack, ...w.leash.placed.map(p => p.id)]) { const c = g.creatures[id]; if (!c.gone) { near(c.x, c.z); active.push(c); } }
  for (const h of S.sounds.values()) if (h.hp > 0) near(h.x, h.z);
  const seen = new Set<number>(active.map(c => c.id));
  for (const k of hot) for (const c of byArea.get(k) ?? []) if (!c.gone && !c.leashed && !seen.has(c.id)) { seen.add(c.id); active.push(c); }
  for (const id of S.busy) { const c = g.creatures[id]; if (!seen.has(id) && !c.gone && !c.leashed) { seen.add(id); active.push(c); } }
  S.busy = new Set();
  stepCombat(S, {
    creatures: g.creatures, active, time, dt, t, busy,
    witches: g.witches.map((w, i) => ({ id: i, x: w.body.x, z: w.body.z, onGround: w.body.mode === "ground" && !w.body.seated, down: !!w.ko })),
    leashPoint: id => { for (const w of g.witches) { const p = leashPoint(w.leash, id, w.body.x, w.body.z); if (p) return p; } return null; },
    asleep: c => dormant(g, c),
    hitWitch: (id, at) => {
      const w = g.witches[id];
      if (!w || w.ko) return;
      // Hit mid-chat: the chat loses invite.hitPenalty seconds (Ed: big groups are hard to invite without getting hit).
      const talk = w.leash.talk;
      if (talk && !talk.refused) { talk.t = Math.max(0, talk.t - t.invite.hitPenalty); w.leash.progress.set(talk.id, talk.t); }
      if (hurt(w.health, at, t)) { w.ko = knockOut(w.leash, g.creatures, at, t); g.koEvents.push({ kind: "down", at, x: w.body.x, z: w.body.z }); }
    },
    loseParty: id => {
      for (const w of g.witches) { w.leash.stack = w.leash.stack.filter(i => i !== id); w.leash.placed = w.leash.placed.filter(p => p.id !== id); }
      g.creatures[id].leashed = false;
    },
  }, COMBAT);
  for (const c of active) if (!c.gone && !c.leashed && (c.siege || c.fleeUntil || c.fight?.target || c.wanderTo)) S.busy.add(c.id); // carried on wherever she is
  for (const e of S.events) if (e.kind === "soundDestroyed" && e.key && e.at === time) {
    if (e.key === "home") g.speakers = g.speakers.map(() => "destroyed" as SpeakerState);
    else { g.party.areas.delete(e.key); S.ruined.add(e.key); (g.party.ruined ??= new Set()).add(e.key); }
    marchOn(S, e.key, g.creatures);
  }
  // The home ring shows its damage speaker by speaker.
  const home = S.sounds.get("home");
  if (home && home.hp < home.max) { const f = 1 - home.hp / home.max, n = g.speakers.length; g.speakers = g.speakers.map((_, i) => (f >= (i + 1) / n ? "destroyed" : f >= (i + 0.5) / n ? "damaged" : "playing")); }
  if (!g.over && [...S.sounds.values()].every(h => h.hp <= 0)) g.over = { at: time };
}

/** The party witches: one for each soundsystem playing (oldest first), and the player idling in. */
function stepWitchParty(g: Game, c: Controls, dt: number): void {
  const d = g.map.dancefloor, t = g.tuning, areas: { key: string; x: number; z: number; at: number }[] = [];
  for (const [key, a] of g.party.areas) if (a.soundsystem) areas.push({ key, x: a.soundsystem.x, z: a.soundsystem.z, at: a.at });
  areas.sort((a, b) => a.at - b.at);
  // Debug (?witches=N): N more, as if from soundsystems round the floor.
  for (let i = 0; i < t.partyWitches.debugExtra; i++) areas.push({ key: `debug-${i}`, x: d.x + Math.cos(i * 2.4) * 100, z: d.z + Math.sin(i * 2.4) * 100, at: 0 });
  const w = g.witch, moving = Math.hypot(c.moveX, c.moveZ) > 0.05 || Math.hypot(w.vx, w.vz) > 0.3 || !!(c.toggleMode || c.sigil || c.spell || c.cycle);
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
    time: g.clock.time, seed: g.seed, level: floorLevel(g.party.areas.size, g.tuning), partifiedAreas: areas,
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

/** A wild legend still asleep: it wakes when the party reaches its area (Ed, 2026-10-04). */
export const dormant = (g: Game, c: Creature): boolean => !!c.boss && !c.leashed && !g.party.areas.has(cellKey(c.cell));

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
