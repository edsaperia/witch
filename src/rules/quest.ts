// The first quest (Ed, 2026-10-04; DESIGN.md, "The first quest"). Each sleeping legend dreams of a
// creature (a thought bubble over it): a species found on the map, not its own, at a level (baby,
// young or adult), chosen from the seed. Put that creature's sigil down in the legend's clearing, in its
// area while the area is still wild, and the legend is happy, its area friendly (its creatures
// leave her and her party be), and the creature placed joins the area. Since the legends redesign
// (DESIGN.md, "Legends, redesigned") a quest gives its legend's buff; no area's creatures become
// guards (Ed, 2026-10-06: "There are no more guards."). No drawing here.
import { AREA_TYPES, inLegendClearing, type ForestMap } from "./map";
import { LEGENDS } from "./legends";
import type { Creature, Level } from "./creatures";
import { cellKey } from "./party";
import { rng } from "./random";

export interface Quest { species: string; level: Level; /** game time it was done */ done?: number;
  /** How far its creature lives: its nearest area's distance over the cap (legends.questCap areas, else the map's
   *  farthest), 0 to 1. A far dream's buff is the stronger (legends.questFar). */
  far?: number }

/** A legend's quest: a species on the map that isn't its own, and a level (baby, young or adult), from the seed. */
export function questFor(map: ForestMap, cell: [number, number], own: string): Quest | undefined {
  // A gamble (Ed, 2026-10-06: "you don't know how hard the quest will be before you go off to try and find the
  // creature"): any other kind on the map, equally likely, near or far; only the truly far go (balance, 2026-10-06:
  // a kind whose nearest area lies over legends.questCap areas away, about the farthest tenth, could eat a run), unless
  // that leaves none. Its distance makes the buff stronger (Quest.far).
  const cap = (map.tuning.legends?.questCap ?? 0) * map.areaSize, site = map.siteOf(cell[0], cell[1]);
  const nearest = new Map<string, number>();
  for (const [cx, cy] of map.cells) {
    if (cx === map.centreCell[0] && cy === map.centreCell[1]) continue;
    const sp = AREA_TYPES[map.typeOf(cx, cy)].creature;
    if (sp === own) continue;
    const s = map.siteOf(cx, cy), d = Math.hypot(s.x - site.x, s.z - site.z);
    if (d < (nearest.get(sp) ?? Infinity)) nearest.set(sp, d);
  }
  const all = [...nearest.keys()].sort(), inReach = cap > 0 ? all.filter(sp => nearest.get(sp)! <= cap) : all;
  const kinds = inReach.length ? inReach : all;
  if (!kinds.length) return undefined;
  const r = rng(map.seed * 6151 + cell[0] * 389 + cell[1] * 1031 + 17);
  const species = kinds[Math.floor(r() * kinds.length)], level = Math.floor(r() * 3) as Level;
  const far = Math.min(1, nearest.get(species)! / (cap > 0 ? cap : Math.max(...all.map(sp => nearest.get(sp)!))));
  return { species, level, far };
}

export interface QuestEvent { kind: "done"; id: number; joined: number; /** the area's cell and key */ cell: [number, number]; key: string; x: number; z: number; at: number }

/** The legend of an area (by its key), if it has one. */
export const legendOf = (creatures: Creature[], ids: number[], key: string): Creature | null => {
  for (const id of ids) { const c = creatures[id]; if (cellKey(c.cell) === key) return c; }
  return null;
};

/** The legend whose open quest a sigil put down at (x, z) answers (its creature what it dreams of), in its area; or null.
 *  Open while the legend sleeps (Ed, 2026-10-06: "you should be able to get the buffs at any time the legend is sleeping,
 *  not just before the soundsystem is made"). */
function questFor_(map: ForestMap, creatures: Creature[], legendIds: number[], _partified: (key: string) => boolean, id: number, x: number, z: number): Creature | null {
  const c = creatures[id], cell = map.cellSafe(x, z).cell as [number, number], key = cellKey(cell);
  if (!c) return null;
  const L = legendOf(creatures, legendIds, key), q = L?.quest;
  if (!L || !q || q.done !== undefined || (L.legendState !== "asleep" && L.legendState !== "restless")) return null;
  return c.species === q.species && c.level === q.level ? L : null;
}

/** A sigil was put down at (x, z), outside its legend's clearing, that would have done its quest
 *  inside (for a gentle cue: the circle flashes); the legend, or null. */
export function questOutside(map: ForestMap, creatures: Creature[], legendIds: number[], partified: (key: string) => boolean, id: number, x: number, z: number): Creature | null {
  const L = questFor_(map, creatures, legendIds, partified, id, x, z);
  return L && !inLegendClearing(map, L.cell, x, z, L, LEGENDS.placeRadius) ? L : null;
}

/** A sigil was put down at (x, z): if its creature is what the legend of that area dreams of, it
 *  lies in the legend's clearing (Ed, 2026-10-06: "Quest sigils and relics need to be placed in the
 *  circle to have their effect"), and its quest is still open (while it sleeps), the quest is done: she gets the legend's
 *  buff, for good, and it sleeps on (#87). The creature stays hers, parked there. Done while the area is still wild,
 *  `done` (the set of areas whose quest is done: friendly while wild) gains it; once the party has reached the area it's
 *  the buff alone. Returns the legend, or null. */
export function questPlaced(map: ForestMap, creatures: Creature[], legendIds: number[], done: Set<string>, partified: (key: string) => boolean, id: number, x: number, z: number, time: number): Creature | null {
  const L = questFor_(map, creatures, legendIds, partified, id, x, z), q = L?.quest;
  if (!L || !q || !inLegendClearing(map, L.cell, x, z, L, LEGENDS.placeRadius)) return null;
  const key = cellKey(L.cell);
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
  // (in its clearing, on the open floor in front of it; where it has none, toward its area's middle)
  const site = g.map.siteOf(L.cell[0], L.cell[1]), d = Math.hypot(site.x - L.x, site.z - L.z) || 1, lc = g.map.legendClearing(L.cell[0], L.cell[1]);
  const x = lc ? lc.x : L.x + ((site.x - L.x) / d) * 8, z = lc ? lc.z + lc.r * 0.35 : L.z + ((site.z - L.z) / d) * 8;
  const spare = g.creatures.filter(c => !c.gone && !c.leashed && !c.boss && Math.hypot(c.x - x, c.z - z) > 250).sort((a, b) => b.id - a.id)[0];
  if (!spare) return null;
  Object.assign(spare, { circle: undefined, species: L.quest!.species, level: L.quest!.level, x: x - 1.5, z: z + 1, tx: x - 1.5, tz: z + 1, leashed: true, hp: undefined, siege: undefined, enraged: false, fight: undefined, fleeUntil: undefined, wanderTo: undefined });
  g.leash.stack.push(spare.id);
  g.byArea = null;
  place(x, z);
  return L;
}
