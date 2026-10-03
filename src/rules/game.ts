// The whole game state, and one step of it. No drawing here: the Three.js layer reads this.
import { cameraPose, newCamera, stepCamera, type CameraPose, type CameraState } from "./camera";
import { newClock, tick, type Clock } from "./clock";
import { spawnCreatures, stepCreature, type Creature } from "./creatures";
import { Forest } from "./forest";
import { AREA_TYPES, generateMap, type ForestMap } from "./map";
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
}

export interface Controls extends Intent {
  /** +1 zoom out a step, -1 zoom in a step, 0 nothing, this frame. */
  zoom: number;
}

export function newGame(seed: number, tuning: Tuning): Game {
  const map = generateMap(seed, tuning);
  const witch = newWitch(map.start.x, map.start.z);
  return {
    seed, tuning, map, forest: new Forest(map), creatures: spawnCreatures(map), clock: newClock(),
    witch, camera: newCamera(tuning, witch.x, witchHeight(witch, tuning), witch.z),
  };
}

/** Advance the game by one real frame of `realDt` seconds. */
export function stepGame(g: Game, c: Controls, realDt: number): void {
  const dt = tick(g.clock, realDt);
  if (dt === 0) return;
  g.witch = stepWitch(g.witch, c, dt, g.tuning, g.map.bounds);
  g.camera = stepCamera(g.camera, c.zoom, { x: g.witch.x, y: witchHeight(g.witch, g.tuning), z: g.witch.z }, dt, g.tuning);
  for (const cr of g.creatures) stepCreature(cr, dt);
}

export const poseOf = (g: Game): CameraPose => cameraPose(g.camera, g.witch.lift, g.tuning);

/** The area type under the witch, by name, for the debug overlay. */
export function areaUnderWitch(g: Game): string {
  const a = g.map.areaAt(g.witch.x, g.witch.z);
  return AREA_TYPES[a.type].name;
}
