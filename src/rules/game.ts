// The whole game state, and one step of it. No drawing here: the Three.js layer reads this.
import { cameraPose, newCamera, stepCamera, type CameraPose, type CameraState } from "./camera";
import { newClock, tick, type Clock } from "./clock";
import { spawnCreatures, stepCreaturesNear, wanderRange, type Creature } from "./creatures";
import { Forest } from "./forest";
import { newLeash, stepLeash, type LeashControls, type LeashState } from "./leash";
import { newParty, spreadWave, stepParty, type PartyState } from "./party";
import { AREA_TYPES, generateMap, type ForestMap } from "./map";
import { nextSpeakerState, type SpeakerState } from "./speakers";
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
  /** Each dancefloor speaker's state, in map.dancefloor.speakers' order. */
  speakers: SpeakerState[];
}

export interface Controls extends Intent, Partial<LeashControls> {
  /** +1 zoom out a step, -1 zoom in a step, 0 nothing, this frame. */
  zoom: number;
  /** Playtest keys: bring the next wave now; pause or resume the wave timer. */
  nextWave?: boolean;
  pauseWaves?: boolean;
  /** Debug: every dancefloor speaker on to its next state (playing, damaged, destroyed). */
  cycleSpeakers?: boolean;
}

export function newGame(seed: number, tuning: Tuning): Game {
  const map = generateMap(seed, tuning);
  const witch = { ...newWitch(map.start.x, map.start.z), seated: true };
  return {
    seed, tuning, map, forest: new Forest(map), creatures: spawnCreatures(map), clock: newClock(),
    witch, camera: newCamera(tuning, witch.x, witchHeight(witch, tuning), witch.z), party: newParty(map), leash: newLeash(),
    speakers: map.dancefloor.speakers.map(() => "playing" as SpeakerState),
  };
}

/** Advance the game by one real frame of `realDt` seconds. */
export function stepGame(g: Game, c: Controls, realDt: number): void {
  if (c.cycleSpeakers) g.speakers = g.speakers.map(nextSpeakerState); // a debug key: even while paused
  const dt = tick(g.clock, realDt);
  if (dt === 0) return;
  g.witch = stepWitch(g.witch, c, dt, g.tuning, g.map.bounds);
  g.camera = stepCamera(g.camera, c.zoom, { x: g.witch.x, y: witchHeight(g.witch, g.tuning), z: g.witch.z }, { x: g.witch.vx, z: g.witch.vz }, g.witch.lift, dt, g.tuning);
  if (c.pauseWaves) g.party.paused = !g.party.paused;
  if (c.nextWave) { spreadWave(g.party, g.map, g.clock.time); g.party.nextAt = g.clock.time + g.tuning.party.interval; }
  stepParty(g.party, g.map, g.clock.time, dt);
  stepCreaturesNear(g.creatures, g.witch.x, g.witch.z, simRadius(g), dt, g.clock.time, g.map);
  stepLeash(g.leash, g.creatures, { talk: !!c.talk, sigil: !!c.sigil, inviteNearest: c.inviteNearest }, g.witch, g.witch.mode === "ground", g.clock.time, dt, g.tuning);
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
