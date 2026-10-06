// The first quest (Ed, 2026-10-04; DESIGN.md, "The first quest"). Each sleeping legend dreams of a
// creature (a thought bubble over it): a species found on the map, not its own, at a level (baby,
// young or adult), chosen from the seed. Put that creature's sigil down anywhere in the legend's
// area while the area is still wild, and the legend is happy, its area friendly (its creatures
// leave her and her party be), and the creature placed joins the area. When a friendly area's wave
// comes, all its creatures become party animals guarding it (not on her leash or stack). An area
// whose wave comes first wakes angry: its creatures go for the nearest party animal or soundsystem,
// and its legend guards it against her. No drawing here.
import { AREA_TYPES, type ForestMap } from "./map";
import type { Creature, Level } from "./creatures";
import { cellKey } from "./party";
import { rng } from "./random";

export interface Quest { species: string; level: Level; /** game time it was done */ done?: number }

/** A legend's quest: a species on the map that isn't its own, and a level (baby, young or adult), from the seed. */
export function questFor(map: ForestMap, cell: [number, number], own: string): Quest | undefined {
  const kinds = [...new Set(map.cells.map(([cx, cy]) => AREA_TYPES[map.typeOf(cx, cy)].creature))].filter(s => s !== own).sort();
  if (!kinds.length) return undefined;
  const r = rng(map.seed * 6151 + cell[0] * 389 + cell[1] * 1031 + 17);
  return { species: kinds[Math.floor(r() * kinds.length)], level: Math.floor(r() * 3) as Level };
}

export interface QuestEvent { kind: "done"; id: number; joined: number; /** the area's cell and key */ cell: [number, number]; key: string; x: number; z: number; at: number }

/** The legend of an area (by its key), if it has one. */
export const legendOf = (creatures: Creature[], ids: number[], key: string): Creature | null => {
  for (const id of ids) { const c = creatures[id]; if (cellKey(c.cell) === key) return c; }
  return null;
};

/** A sigil was put down at (x, z): if its creature is what the legend of that area dreams of, and
 *  its quest is still open (while the legend sleeps, Ed 2026-10-06: "you should be able to get the
 *  buffs at any time the legend is sleeping, not just before the soundsystem is made"), the quest is
 *  done: she gets the legend's buff, for good, and it sleeps on (#87). The creature stays hers, parked
 *  there. Done while the area is still wild, `done` (the set of areas whose quest is done: friendly
 *  while wild) gains it; once the party has reached the area it's the buff alone. Returns the legend, or null. */
export function questPlaced(map: ForestMap, creatures: Creature[], legendIds: number[], done: Set<string>, partified: (key: string) => boolean, id: number, x: number, z: number, time: number): Creature | null {
  const c = creatures[id], cell = map.cellSafe(x, z).cell as [number, number], key = cellKey(cell);
  if (!c) return null;
  const L = legendOf(creatures, legendIds, key), q = L?.quest;
  if (!L || !q || q.done !== undefined || (L.legendState !== "asleep" && L.legendState !== "restless")) return null;
  if (c.species !== q.species || c.level !== q.level) return null;
  q.done = time;
  L.buffed = true; L.questOpen = false;
  if (!partified(key)) done.add(key); // (friendly while wild; after its wave, the buff alone)
  return L;
}

/** Debug (?quest=1): beside the nearest sleeping legend with a quest, on its area's side, with the
 *  creature it dreams of (borrowed from the map's edge) on her stack: press E there to do it. */
export function setupQuestDemo(g: { creatures: Creature[]; map: ForestMap; witch: { x: number; z: number }; leash: { stack: number[] }; byArea?: unknown }, place: (x: number, z: number) => void): Creature | null {
  let L: Creature | null = null, bd = Infinity;
  for (const c of g.creatures) if (c.boss && c.legendState === "asleep" && c.quest && c.quest.done === undefined) { const d = Math.hypot(c.x - g.witch.x, c.z - g.witch.z); if (d < bd) { bd = d; L = c; } }
  if (!L) return null;
  const site = g.map.siteOf(L.cell[0], L.cell[1]), d = Math.hypot(site.x - L.x, site.z - L.z) || 1, x = L.x + ((site.x - L.x) / d) * 8, z = L.z + ((site.z - L.z) / d) * 8;
  const spare = g.creatures.filter(c => !c.gone && !c.leashed && !c.boss && Math.hypot(c.x - x, c.z - z) > 250).sort((a, b) => b.id - a.id)[0];
  if (!spare) return null;
  Object.assign(spare, { species: L.quest!.species, level: L.quest!.level, x: x - 1.5, z: z + 1, tx: x - 1.5, tz: z + 1, leashed: true, hp: undefined, siege: undefined, enraged: false, fight: undefined, fleeUntil: undefined, wanderTo: undefined });
  g.leash.stack.push(spare.id);
  g.byArea = null;
  place(x, z);
  return L;
}
