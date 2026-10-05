// Area memory (Ed, 2026-10-05). An area a witch has landed in remembers what she saw there: which
// species live there, and roughly how many are wild, happy or enraged. It's a snapshot of her last
// visit, refreshed while she's on the ground there and frozen once she leaves; areas she hasn't
// landed in stay unknown. From the treetops a remembered area shows faintly (render/areaMemory.ts).
// Each witch keeps her own (co-op: what she's seen is hers). No drawing here. (A dream's direction
// doesn't use it: rules/dream.ts.)
import type { Creature } from "./creatures";
import type { ForestMap } from "./map";

export type Mood = "wild" | "happy" | "enraged";

/** A creature's mood as she'd see it. (One place to read it from, for the creature-state rework.) */
export function moodOf(c: Creature): Mood {
  if (c.enraged || c.siege) return "enraged";
  if (c.friendly || c.guard) return "happy";
  return "wild";
}

/** A sleeping legend's restlessness, 0 calm to 1 about to wake angry (Ed, #87: restless while its
 *  area has none of its kind). One place to read it from; the rules' own value lands with #87,
 *  till then whatever is set on the creature (0 if nothing is). */
export const restlessness = (c: Creature): number => Math.max(0, Math.min(1, (c as Creature & { restlessness?: number }).restlessness ?? 0));

export interface SeenSpecies { species: string; wild: number; happy: number; enraged: number }

export interface AreaMemory {
  key: string;
  cell: [number, number];
  /** Game time of the snapshot. */
  at: number;
  /** What she saw, most numerous first. */
  seen: SeenSpecies[];
}

export interface MemoryState {
  areas: Map<string, AreaMemory>;
  /** Game time of the last snapshot (one a second at most while she's on the ground). */
  last: number;
}

export const newMemory = (): MemoryState => ({ areas: new Map(), last: -Infinity });

/** Seconds between snapshots while she's on the ground in an area. */
const EVERY = 1;

/** Remember the area she's standing in: its creatures (not the legend, not anyone's party animals),
 *  by species and mood. Only on the ground: from the treetops she sees the canopy, not who's under it. */
export function stepMemory(mem: MemoryState, onGround: boolean, x: number, z: number, map: ForestMap, inArea: (key: string) => Creature[], time: number): void {
  if (!onGround || time - mem.last < EVERY) return;
  mem.last = time;
  const cell = map.cellSafe(x, z).cell as [number, number], key = `${cell[0]},${cell[1]}`;
  const by = new Map<string, SeenSpecies>();
  for (const c of inArea(key)) {
    if (c.gone || c.leashed || c.boss) continue;
    const s = by.get(c.species) ?? { species: c.species, wild: 0, happy: 0, enraged: 0 };
    s[moodOf(c)]++;
    by.set(c.species, s);
  }
  const seen = [...by.values()].sort((a, b) => b.wild + b.happy + b.enraged - (a.wild + a.happy + a.enraged) || (a.species < b.species ? -1 : 1));
  mem.areas.set(key, { key, cell, at: time, seen });
}
