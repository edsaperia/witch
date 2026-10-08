// The simulation's level of detail (Ed, 2026-10-05: "a lot of creatures are far away from the
// action and can probably be frozen until the player gets closer"). Each creature is simulated
// in full (every step), coarsely (one step in `every`, by that many steps' time at once, taking
// turns by id), or frozen (not at all), by how far it is from the witch and from the action:
//
// - roaming wild creatures: in full within `full` metres of her (the most the view can show at
//   that height: `full.ground`, `full.treetop`), coarse beyond, frozen beyond the creature
//   simulation radius (creatureSimRadius, as before: their areas wait as counts there);
// - marching besiegers: in full near her (the same `full`), near a soundsystem, a party animal
//   or a happy legend's guard (within `action` metres), coarse anywhere else, marching on
//   their soundsystem by `every` steps at a time.
//
// A creature crossing in comes to full at the line; going out, only once `band` metres past it,
// so none flickers between the two.

import type { Creature } from "./creatures";
import type { Tuning } from "./tuning";

export interface SimLod {
  /** Full within this of the witch (m): on the ground; over the treetops (and rising, and coming down). */
  full: { ground: number; treetop: number };
  /** Marchers in full within this of a soundsystem, a party animal or a guarding legend's reach (m). */
  action: number;
  /** Out of full only this far past the line (m). */
  band: number;
  /** A coarse creature steps once in this many steps (60 a second), by that many steps' time. */
  every: number;
}

/** Counts for the debug overlay: roaming and marching, by level of detail (frozen: roamers only). */
export interface LodCounts { full: number; coarse: number; frozen: number; marchFull: number; marchCoarse: number }
export const newLodCounts = (): LodCounts => ({ full: 0, coarse: 0, frozen: 0, marchFull: 0, marchCoarse: 0 });

/** How far from the witch everything is simulated in full, for her mode. */
export function fullRadius(t: Tuning, mode: string): number {
  return mode === "ground" ? t.simLod.full.ground : t.simLod.full.treetop;
}

/** Is it in full, given the distance in from its line (`d` < `line` is inside)? Hysteresis on `c.lod`. */
export function inFull(c: Creature, d: number, line: number, band: number): boolean {
  const full = c.lod === "full" ? d < line + band : d < line;
  c.lod = full ? "full" : "coarse";
  return full;
}

/** A coarse step this step? Each takes its turn by id, one step in `every`. */
export const coarseTurn = (tick: number, id: number, every: number) => (tick + id) % every === 0;
