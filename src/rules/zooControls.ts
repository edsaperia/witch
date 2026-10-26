// The zoo's controls (?zoo; rules/zoo.ts; Ed, 2026-10-13: "I can press in-game buttons to add/remove/leash each kind"): what its
// block bar's buttons do to a block (src/zoo/panel.ts), on the game directly, as the debug arena's keys do. Add one of its kind at a
// level, take one away, set the block's mood (calm, as it starts: wild but leaving her be; wild, as in a run; happy, its runes
// at their feet to be picked up; angry, enraged) and put its creatures to sleep or wake them. Leashing is the game's own: invite a
// wild (or calm) one with 💌s, then pick up its sigil (E). No drawing here.
import { LEGEND, makeCreature, type Creature, type Level } from "./creatures";
import { befriend, enrage } from "./creatureStates";
import { befriendArea } from "./sigilButton";
import { rng } from "./random";
import type { Game } from "./game";
import type { ZooBlock } from "./zoo";

export type ZooMood = "calm" | "wild" | "happy" | "angry";
export const ZOO_MOODS: ZooMood[] = ["calm", "wild", "happy", "angry"];

const key = (cell: readonly [number, number]) => `${cell[0]},${cell[1]}`;

/** The zoo's block a point lies in (a "?" block too), or null (a path's middle is either side's; off the grid, none). */
export function zooBlockAt(g: Game, x: number, z: number): ZooBlock | null {
  const Z = g.map.zoo;
  if (!Z) return null;
  // (laid out like the chart, rules/zooMap.ts: the island it's on; else the old grid's block)
  if (Z.layout) { const c = g.map.areaAt(x, z).cell; return Z.blocks.find(b => b.cell[0] === c[0] && b.cell[1] === c[1]) ?? null; }
  const A = g.map.areaSize, cx = Math.floor(x / A), cy = Math.floor(z / A);
  return Z.blocks.find(b => b.cell[0] === cx && b.cell[1] === cy) ?? null;
}

/** Where a block's front is (m): its nameplate's place, and where the jump puts her. Laid out like the chart, by its runestone on
 *  the south shore; on the old grid, its square's south edge. */
export function blockFront(map: Pick<Game["map"], "areaSize" | "soundsystemSpot" | "zoo">, b: ZooBlock): { x: number; z: number } {
  if (map.zoo?.layout) { const q = map.soundsystemSpot(b.cell[0], b.cell[1]); return { x: q.x, z: q.z + 6 }; }
  const A = map.areaSize;
  return { x: (b.cell[0] + 0.5) * A, z: (b.cell[1] + 1) * A - 12 };
}

/** A block's creatures as they stand: not gone, not hers. */
export const blockCreatures = (g: Game, cell: readonly [number, number]): Creature[] =>
  g.creatures.filter(c => !c.gone && !c.leashed && c.cell[0] === cell[0] && c.cell[1] === cell[1]);

/** A block's mood, as last set (calm, as it starts). */
export const zooMood = (g: Game, cell: readonly [number, number]): ZooMood => g.zooMoods?.get(key(cell)) ?? "calm";

/** One creature in this mood (a legend keeps its own states: rules/legends.ts). */
function moodOn(g: Game, c: Creature, mood: ZooMood): void {
  if (c.boss) return;
  c.friendly = mood === "calm" ? true : undefined;
  if (mood !== "angry") { c.enraged = false; c.siege = undefined; }
  if (mood === "calm" || mood === "wild") { if (c.state === "happy" || c.state === "enraged") c.state = "wild"; c.fight = undefined; }
  if (mood === "happy") befriend(c, g.clock.time);
  if (mood === "angry") { c.state = "wild"; enrage(c); } // (never a baby: enrage refuses)
}

/** Sets a block's mood: every creature of it (but its legend, and hers) in it, and any added later. */
export function setZooMood(g: Game, cell: readonly [number, number], mood: ZooMood): void {
  (g.zooMoods ??= new Map()).set(key(cell), mood);
  if (mood === "calm") { g.friendly.add(key(cell)); befriendArea(g, key(cell)); } else g.friendly.delete(key(cell));
  for (const c of blockCreatures(g, cell)) moodOn(g, c, mood);
  g.byArea = null;
}

/** Adds one of a block's kind at a level, somewhere in its block, in the block's mood (a legend, as the map's: asleep). */
export function zooAdd(g: Game, cell: readonly [number, number], level: Level): Creature | null {
  if (!g.map.playable(cell[0], cell[1]) || (cell[0] === g.map.centreCell[0] && cell[1] === g.map.centreCell[1])) return null;
  const id = g.creatures.length, c = makeCreature(g.map, [cell[0], cell[1]], level, id, rng(g.map.seed * 7919 + id * 131 + 17));
  g.creatures.push(c);
  moodOn(g, c, zooMood(g, cell));
  if (level === LEGEND) g.legendIds = undefined;
  g.byArea = null;
  return c;
}

/** Takes the block's newest creature away (it runs off: gone), the legend last; false when none is left. */
export function zooRemove(g: Game, cell: readonly [number, number]): boolean {
  const here = blockCreatures(g, cell), c = [...here].reverse().find(k => !k.boss) ?? here[here.length - 1];
  if (!c) return false;
  c.gone = true; c.fight = undefined; c.moving = false;
  if (c.boss) g.legendIds = undefined;
  g.byArea = null;
  return true;
}

/** Puts every creature of the block to sleep for good (lying down, out of every fight, snoring), or wakes them all. */
export function zooSleep(g: Game, cell: readonly [number, number], asleep: boolean): void {
  const time = g.clock.time;
  for (const c of blockCreatures(g, cell)) {
    if (asleep) {
      c.asleep = true; c.asleepAt = time; c.napUntil = undefined; c.wakeUntil = undefined; c.moving = false; c.vx = 0; c.vz = 0; c.fight = undefined;
      if (c.boss) { c.legendState = "asleep"; c.stateAt = time; c.restlessness = 0; }
    } else { c.asleep = undefined; c.asleepAt = undefined; c.napUntil = undefined; }
  }
  g.byArea = null;
}

/** How many of each level the block holds now (babies, young, adults, legends). */
export function zooCount(g: Game, cell: readonly [number, number]): [number, number, number, number] {
  const n: [number, number, number, number] = [0, 0, 0, 0];
  for (const c of blockCreatures(g, cell)) n[c.level]++;
  return n;
}
