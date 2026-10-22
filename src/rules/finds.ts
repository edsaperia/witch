// Things to wear found in the forest (Ed, 2026-10-21, the station menus' part (b): "The items are found in the forest like other
// permanent upgrades. Hints are given by the crystal ball"; his answers on the proposal, the same day): each night the island
// she's on holds one wearable she hasn't found yet (the night's seed picks it from rules/wardrobe.ts's: never the brooms, which
// come from the garage's parts, docs/backlog/unlocks.md), in an old travel trunk half-sunk in a wild area's woods, under the
// canopy (a ground-mode find, like the garage's wrecks: no glint). E at it while the party's on, and it's hers at once (the
// "found" leash event; app/owned.ts keeps it, even if the night's then lost). Its hint is written in the stars (Ed, 2026-10-22):
// the wearable's outline as a constellation, seen through the telescope at the trunk's bearing from the treehouse, never how far
// (rules/constellations.ts; the crystal ball's vision is gone, the ball a placeholder again). Where the trunk stands is the night's (map.seed); what's in it
// is the page's to say (what she owns is this browser's), so the rules place it empty and the page fills it (fillTrunk).
import type { ForestMap } from "./map";
import { isInside } from "./mapShape";
import type { Plant } from "./forest";
import { canopyOver, type Relic } from "./legends";
import { hash2 } from "./random";
import { ITEMS, SHELVES, type WardrobeItem } from "./wardrobe";

/** The night's trunk: where it stands, what's in it (null: nothing she lacks, so none tonight), and whether she's taken it. */
export interface Trunk { x: number; z: number; cell: [number, number]; item: string | null; found: boolean }

/** How close she must stand to open it (m), how far from the relics it stands (m), and the rings round an area's middle it's looked for on. */
export const TRUNK_REACH = 2.2, TRUNK_CLEAR = 30;
const RINGS = [45, 60, 35, 75, 28];

/** The wearables a trunk can hold: everything not hers from the start, but the brooms (Ed, 2026-10-21: "Brooms are made of
 *  three parts ... We have designed this before": the garage's). */
export const FINDABLE: readonly WardrobeItem[] = ITEMS.filter(i => !i.start && !SHELVES.broom.items.includes(i));

/** Where tonight's trunk stands (map.seed): in a seeded wild area (not home), in its woods round its middle, under the canopy
 *  if it can be (so the treetops hide it), off its clearings and its legend's circle, clear of the relics. Null on a map with
 *  nowhere for it (the zoo). */
export function placeTrunk(map: ForestMap, forest: { treesNear(x: number, z: number, r: number): Plant[] }, relics: readonly Relic[]): Trunk | null {
  if (map.zoo) return null;
  const b = map.bounds, home = map.centreCell, s = map.seed + 8117;
  const cells = map.cells.filter(([cx, cy]) => !(cx === home[0] && cy === home[1]) && map.playable(cx, cy)).sort((a, c) => hash2(a[0], a[1], s) - hash2(c[0], c[1], s));
  const woods = (x: number, z: number) => forest.treesNear(x, z, 14).filter(t => Math.hypot(t.x - x, t.z - z) < 14).length >= 3;
  for (const cell of cells) {
    const site = map.siteOf(cell[0], cell[1]), a0 = hash2(cell[0], cell[1], s + 1) * Math.PI * 2, lc = map.legendClearing(cell[0], cell[1]);
    let best: { x: number; z: number; score: number } | null = null;
    for (const r of RINGS) for (let k = 0; k < 12; k++) {
      const a = a0 + (k / 12) * Math.PI * 2, x = site.x + Math.cos(a) * r, z = site.z + Math.sin(a) * r, kc = map.cellSafe(x, z).cell;
      if (kc[0] !== cell[0] || kc[1] !== cell[1] || !isInside(b, x, z, 60) || map.hardClear(x, z)) continue;
      if (lc && Math.hypot(x - lc.x, z - lc.z) < lc.r + 6) continue;
      if (relics.some(q => Math.hypot(q.x - x, q.z - z) < TRUNK_CLEAR)) continue;
      const score = (woods(x, z) ? 1 : 0) + (canopyOver(forest, map, x, z) ? 2 : 0);
      if (!best || score > best.score) best = { x, z, score };
      if (best.score === 3) break;
    }
    if (best) return { x: best.x, z: best.z, cell: [cell[0], cell[1]], item: null, found: false };
  }
  return null;
}

/** What tonight's trunk holds (the night's seed, out of the findable ones she doesn't own): null once she has them all. */
export function trunkItem(seed: number, owned: ReadonlySet<string>): string | null {
  const left = FINDABLE.filter(i => !owned.has(i.id));
  if (!left.length) return null;
  return left[Math.floor(hash2(seed, left.length, 8123) * left.length) % left.length].id;
}

/** Puts what it holds in tonight's trunk (main.ts, from what this browser says she owns); nothing to hold, no trunk. */
export function fillTrunk(g: { trunk: Trunk | null; map: ForestMap }, owned: ReadonlySet<string>): void {
  if (!g.trunk) return;
  const item = trunkItem(g.map.seed, owned);
  if (item) g.trunk.item = item; else g.trunk = null;
}

/** The trunk she stands at to open (on the ground, within its reach, still full), else null. */
export function trunkAt(trunk: Trunk | null, x: number, z: number): Trunk | null {
  return trunk && trunk.item && !trunk.found && Math.hypot(trunk.x - x, trunk.z - z) <= TRUNK_REACH ? trunk : null;
}

/** The eight compass points' names, from north clockwise. */
const POINTS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
/** Which way (x, z) lies from (fromX, fromZ), as a compass point (north is -z: up the screen), and its bearing in radians
 *  clockwise from north: the constellation's way (rules/constellations.ts), never a distance (Ed). */
export function wayTo(fromX: number, fromZ: number, x: number, z: number): { point: string; bearing: number } {
  const bearing = (Math.atan2(x - fromX, -(z - fromZ)) + Math.PI * 2) % (Math.PI * 2);
  return { point: POINTS[Math.round(bearing / (Math.PI / 4)) % 8], bearing };
}
