// The whole game state, and one step of it. No drawing here: the Three.js layer reads this.
import { cameraPose, newCamera, stepCamera, type CameraPose, type CameraState } from "./camera";
import { newClock, tick, type Clock } from "./clock";
import { spawnCreatures, stepCreaturesNear, wanderRange, type Creature } from "./creatures";
import { Forest } from "./forest";
import { leashPoint, newLeash, stepLeash, type LeashControls, type LeashState } from "./leash";
import { feedNearest, newBerries, stepBerries, type BerryState } from "./berries";
import { newParty, spreadWave, stepParty, type PartyState } from "./party";
import { AREA_TYPES, generateMap, type ForestMap } from "./map";
import { nextSpeakerState, type SpeakerState } from "./speakers";
import { floorEvent, floorLevel, neon, newFloor, stepFloor, switchOn, tileOf, type FloorInputs, type FloorState } from "./dancefloor";
import { SIGIL_NEON } from "../../art/sigils.js";
import { castSpell, newSpells, speedMultiplier, type SpellState } from "./spells";
import type { Tuning } from "./tuning";
import { newWitch, stepWitch, witchHeight, type Intent, type WitchState } from "./witch";

export interface Game {
  readonly seed: number;
  readonly tuning: Tuning;
  readonly map: ForestMap;
  readonly forest: Forest;
  readonly creatures: Creature[];
  readonly clock: Clock;
  witch: WitchState;
  camera: CameraState;
  party: PartyState;
  leash: LeashState;
  berries: BerryState;
  /** Each dancefloor speaker's state, in map.dancefloor.speakers' order. */
  speakers: SpeakerState[];
  /** The dancefloor's tile lights (rules/dancefloor.ts). */
  floor: FloorState;
  /** The equipped spell and its recharge (rules/spells.ts). */
  spells: SpellState;
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
}

export function newGame(seed: number, tuning: Tuning): Game {
  const map = generateMap(seed, tuning);
  const witch = { ...newWitch(map.start.x, map.start.z), seated: true };
  return {
    seed, tuning, map, forest: new Forest(map), creatures: spawnCreatures(map), clock: newClock(),
    witch, camera: newCamera(tuning, witch.x, witchHeight(witch, tuning), witch.z), party: newParty(map), leash: newLeash(), berries: newBerries(map, tuning),
    speakers: map.dancefloor.speakers.map(() => "playing" as SpeakerState),
    floor: newFloor(), spells: newSpells(tuning),
  };
}

/** Advance the game by one real frame of `realDt` seconds. */
export function stepGame(g: Game, c: Controls, realDt: number): void {
  if (c.cycleSpeakers) g.speakers = g.speakers.map(nextSpeakerState); // a debug key: even while paused
  const dt = tick(g.clock, realDt);
  if (dt === 0) return;
  const wave = g.party.wave, seated = g.witch.seated;
  if (c.spell) castSpell(g.spells, g.clock.time, g.tuning);
  // The speed boost: her speeds times its multiplier while it's on.
  const boost = speedMultiplier(g.spells, g.clock.time, g.tuning);
  g.witch = stepWitch(g.witch, c, dt, boost === 1 ? g.tuning : { ...g.tuning, groundSpeed: g.tuning.groundSpeed * boost, treetopSpeed: g.tuning.treetopSpeed * boost }, g.map.bounds);
  g.camera = stepCamera(g.camera, c.zoom, { x: g.witch.x, y: witchHeight(g.witch, g.tuning), z: g.witch.z }, { x: g.witch.vx, z: g.witch.vz }, g.witch.lift, dt, g.tuning, !!g.witch.seated, g.introFocus);
  if (c.pauseWaves) g.party.paused = !g.party.paused;
  if (c.nextWave) { spreadWave(g.party, g.map, g.clock.time); g.party.nextAt = g.clock.time + g.tuning.party.interval; }
  stepParty(g.party, g.map, g.clock.time, dt);
  stepCreaturesNear(g.creatures, g.witch.x, g.witch.z, simRadius(g), dt, g.clock.time, g.map);
  const B = g.berries, busy = (id: number) => B.feeding.has(id) || B.evolving.has(id);
  stepLeash(g.leash, g.creatures, { talk: !!c.talk, sigil: !!c.sigil, inviteNearest: c.inviteNearest, cycle: !!c.cycle }, g.witch, g.witch.mode === "ground", g.clock.time, dt, g.tuning, busy);
  if (c.feedNearest) feedNearest(B, g.creatures, g.witch.x, g.witch.z, g.clock.time, g.tuning);
  stepBerries(B, g.creatures, id => leashPoint(g.leash, id, g.witch.x, g.witch.z), g.clock.time, dt, g.tuning);
  stepDancefloor(g, wave, seated);
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
  if (g.party.wave > waveBefore && g.party.last) {
    const s = g.map.soundsystemSpot(g.party.last[0], g.party.last[1]), sp = AREA_TYPES[g.map.typeOf(g.party.last[0], g.party.last[1])].creature;
    floorEvent(f, { kind: "wave", at: time, dir: Math.atan2(s.z - d.z, s.x - d.x), rgb: neonOf((SIGIL_NEON as Record<string, string>)[sp]) });
  }
  for (const e of g.leash.events) if (e.kind === "placed") floorEvent(f, { kind: "sigil", at: time, dir: 0, rgb: neonOf(g.tuning.dancefloor.tiles.witchColour) });
  // A party animal evolving: a burst out from the floor's centre in its sigil's neon.
  for (const e of g.berries.events) if (e.kind === "evolved") floorEvent(f, { kind: "sigil", at: time, dir: 0, rgb: neonOf((SIGIL_NEON as Record<string, string>)[g.creatures[e.id].species]) });
  stepFloor(f, floorInputs(g), g.tuning);
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
