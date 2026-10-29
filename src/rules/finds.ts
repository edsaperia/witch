// Things to wear found in the forest (Ed, 2026-10-21, the station menus' part (b): "The items are found in the forest like other
// permanent upgrades. Hints are given by the crystal ball"; his answers on the proposal, the same day): each night the island
// she's on holds one wearable she hasn't found yet (the night's seed picks it from rules/wardrobe.ts's: never the brooms, which
// come from the Workshop's parts, docs/backlog/workshop.md), in an old travel trunk half-sunk in a wild area's woods, under the
// canopy (a ground-mode find, like the garage's wrecks: no glint). E at it while the party's on, and it's hers for the night (the
// "found" leash event): on loan from the stars till she sleeps (Ed, 2026-10-24, below). Its hint is written in the stars (Ed, 2026-10-22):
// the wearable's outline as a constellation, seen through the telescope at the trunk's bearing from the treehouse, never how far
// (rules/constellations.ts; the crystal ball's vision is gone, the ball a placeholder again). Where the trunk stands is the night's (map.seed); what's in it
// is the page's to say (what she owns is this browser's), so the rules place it empty and the page fills it (fillTrunk).
//
// The finds pool (Ed, 2026-10-23: "One draw over everything she hasn't found. Clothes, brooms, hats, records - everything that's a
// permanent upgrade."): every kind of permanent upgrade is a FindKind in FIND_KINDS (its items, the piece its find is drawn as,
// what claiming one does in the rules), and the night's one find is a single seeded draw over every item of every kind she hasn't
// found (nightPick): the kind drawn decides the find, a wearable in the trunk or a broom part in a wreck (an old witch's crashed
// broom, the Workshop's: docs/backlog/workshop.md), placed alike (placeTrunk), a ground-mode find, E taking it at once, only while
// the party's on. No forced early wreck, no biome weighting (Ed, 2026-10-23). A new kind (hats,
// records) joins by adding its FindKind: its items, its piece, its claim.
//
// Hats and bags (Ed, 2026-10-23, the mock previews/ed/hat-bag-finds: "Own objects each - all permanent upgrades will have their
// own look"): every spell hat is a find (only the plain hat is hers at first), lying where its spell would put it (art/country.js
// a pointed hat), taken onto the Parlour's hats' floor; the bum bag and the backpack each its own, no longer in the trunk.
// How every find looks (Ed, 2026-10-23, the finds style guide, docs/art-guide/FINDS.md): one flask-sized object, no setting
// round it, on a clear patch in its own pale gold-white light (render/view/finds.ts); clothes a folded bundle, a bag a little bag,
// a hat a pointed hat, a broom part the part itself (art/country.js's find pieces). Taken, it's gone, its patch and light too.
//
// On loan till dawn (Ed, 2026-10-24, previews/ed/finds-on-loan): taken, it's hers to wear or use at once, but kept only if the night
// is won. Its constellation lights up in full (loanFind: in the telescope and the game's own sky, at its true bearing), and the
// page holds the loan (app/loan.ts) till she sleeps, when her dream tells her: won, it's hers for good; not, it goes back to the
// sky, to be drawn again another night. Once the night is won, a find not yet taken is gone (goneAtWin, rules/win.ts).
import { RECORD_FINDS } from "./records";
import type { ForestMap } from "./map";
import { isInside } from "./mapShape";
import type { Plant } from "./forest";
import { canopyOver, type Relic } from "./legends";
import { hash2 } from "./random";
import { ITEMS, SHELVES, type WardrobeItem } from "./wardrobe";
import { PART_IDS } from "./broomParts";
import { HAT_SPELLS, type SpellState } from "./spells";
import { deckOf, onFloor } from "./treehouse";
import type { Game } from "./game";

/** The kinds of permanent upgrade found in the forest, one a night across them all. */
export type FindKindId = "wearable" | "part" | "hat" | "bag" | "record";
/** The night's find: where it stands, what kind it is and what's in it (item null: not yet filled, or nothing she lacks, so none
 *  tonight), and whether she's taken it. A wearable's is the travel trunk, a broom part's a wreck; kept as `g.trunk` either way. */
export interface Trunk { x: number; z: number; cell: [number, number]; kind: FindKindId; item: string | null; found: boolean }

/** How close she must stand to open it (m), how far from the relics it stands (m), and the rings round an area's middle it's looked for on. */
export const TRUNK_REACH = 2.2, TRUNK_CLEAR = 30;
const RINGS = [45, 60, 35, 75, 28];

/** The bags found each on its own (Ed, 2026-10-23): the bag shelf's not hers from the start (Ed, 2026-10-29: the Satchel, Bumbag and Purse are; Tote, Duffel, Briefcase, Backpack are found, each its own way to throw: rules/bags.ts). */
export const BAG_ITEMS: readonly string[] = SHELVES.bag.items.filter(i => !i.start).map(i => i.id);
/** The hats found (Ed, 2026-10-23): every built spell hat; the plain one is hers from the start. */
export const HAT_FINDS: readonly string[] = HAT_SPELLS.filter(s => s.built && s.id !== "none").map(s => s.id);
/** The wearables a trunk can hold: everything not hers from the start, but the brooms (Ed, 2026-10-21: "Brooms are made of
 *  three parts ... We have designed this before": the garage's). */
export const FINDABLE: readonly WardrobeItem[] = ITEMS.filter(i => !i.start && !i.set["broom.kind"] && !BAG_ITEMS.includes(i.id));

/** A kind of permanent upgrade in the finds pool: its items (in a fixed order: the draw's tickets), the art piece its find is
 *  drawn as (render/view/finds.ts, the "find" art job: art/country.js), and what claiming one does to her in the rules (the page
 *  keeps it for good, app/owned.ts and app/broomSave.ts, from the "found" event). */
export interface FindKind { id: FindKindId; /** what the find is, in a word */ name: string; items: readonly string[]; piece(item: string): string; claim?(s: SpellState, item: string): void }
export const FIND_KINDS: readonly FindKind[] = [
  { id: "wearable", name: "bundle", items: FINDABLE.map(i => i.id), piece: () => "find-bundle" },
  // (a hat found is hers: onto the hats' floor, rules/houseRooms.ts addFloorHat)
  { id: "hat", name: "hat", items: HAT_FINDS, piece: () => "find-hat", claim(s, id) { if (s.hats && !s.hats.includes(id)) s.hats.push(id); } },
  { id: "bag", name: "bag", items: BAG_ITEMS, piece: () => "find-bag" },
  // (a part found is hers, not fitted: it waits at the Workshop, the bay to fit it, the pegboard to show it; docs/backlog/workshop.md)
  { id: "part", name: "broom part", items: PART_IDS, piece: id => `find-part-${id}` },
  // (a record found is hers to play at her DJ booth: app/recordSave.ts; Ed, 2026-10-29)
  { id: "record", name: "record", items: RECORD_FINDS, piece: () => "find-record" },
];
export const findKind = (id: FindKindId): FindKind => FIND_KINDS.find(k => k.id === id)!;
/** What she has found (or owns) of each kind; a kind left out counts as none found. */
export type Found = Partial<Record<FindKindId, ReadonlySet<string>>>;

/** The night's one find (Ed, 2026-10-23: "One draw over everything she hasn't found"): one seeded draw (the night's seed) over
 *  every item of every kind she lacks, a ticket each; the kind drawn decides the find. Null once she has everything. */
export function nightPick(seed: number, found: Found): { kind: FindKindId; item: string } | null {
  const left: { kind: FindKindId; item: string }[] = [];
  for (const k of FIND_KINDS) for (const item of k.items) if (!found[k.id]?.has(item)) left.push({ kind: k.id, item });
  if (!left.length) return null;
  return left[Math.floor(hash2(seed, left.length, 8123) * left.length) % left.length];
}

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
      if (kc[0] !== cell[0] || kc[1] !== cell[1] || !isInside(b, x, z, 60) || map.hardClear(x, z) || !map.clearOfStones(x, z, TRUNK_REACH)) continue; // (out of every stone's keep-clear zone: Ed, 2026-10-29)
      if (lc && Math.hypot(x - lc.x, z - lc.z) < lc.r + 6) continue;
      if (relics.some(q => Math.hypot(q.x - x, q.z - z) < TRUNK_CLEAR)) continue;
      const score = (woods(x, z) ? 1 : 0) + (canopyOver(forest, map, x, z) ? 2 : 0);
      if (!best || score > best.score) best = { x, z, score };
      if (best.score === 3) break;
    }
    if (best) return { x: best.x, z: best.z, cell: [cell[0], cell[1]], kind: "wearable", item: null, found: false };
  }
  return null;
}

/** Makes tonight's find what the night's draw says (main.ts, from what this browser says she has: nightPick), a trunk or a wreck
 *  where placeTrunk put it; nothing left to find, none. */
export function fillTrunk(g: { trunk: Trunk | null; map: ForestMap }, found: Found): void {
  if (!g.trunk) return;
  const pick = nightPick(g.map.seed, found);
  if (pick) { g.trunk.kind = pick.kind; g.trunk.item = pick.item; } else g.trunk = null;
}
/** The art piece tonight's find is drawn as (the trunk, or the part's wreck). */
export const findPiece = (t: Trunk): string => findKind(t.kind).piece(t.item ?? "");

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

/** The night's one permanent upgrade to find (Ed, 2026-10-22: "With all permanent upgrades, there's one per night, and it's
 *  hinted through the telescope"): what kind it is, its item id and its bearing (degrees clockwise from north) from (fromX, fromZ),
 *  the treehouse. Never two at once. A wearable in the trunk or a broom part in a wreck (hats and records to come, each its own
 *  kind in FIND_KINDS); null with none to find tonight, or once it's found. The constellation's one source (rules/constellations.ts). */
export interface NightFind { kind: FindKindId; item: string; bearing: number }
export function nightFind(g: { trunk: Trunk | null }, fromX: number, fromZ: number): NightFind | null {
  const t = g.trunk;
  if (!t || !t.item || t.found) return null;
  return { kind: t.kind, item: t.item, bearing: (wayTo(fromX, fromZ, t.x, t.z).bearing * 180) / Math.PI };
}

/** Tonight's find once she's taken it (on loan till she sleeps; Ed, 2026-10-24): what it is and its bearing from (fromX, fromZ), the
 *  treehouse, for its lit constellation (rules/constellations.ts) and the page's on-loan icon; null before she's taken it, or none. */
export function loanFind(g: { trunk: Trunk | null }, fromX: number, fromZ: number): NightFind | null {
  const t = g.trunk;
  if (!t || !t.item || !t.found) return null;
  return { kind: t.kind, item: t.item, bearing: (wayTo(fromX, fromZ, t.x, t.z).bearing * 180) / Math.PI };
}

/** The night won (rules/win.ts): a find not yet taken is gone from the map, its constellation with it (Ed, 2026-10-24: "once the
 *  night is won, finds disappear"); one she's taken stays on loan, its constellation lit, till she sleeps. */
export function goneAtWin(g: { trunk: Trunk | null }): void {
  if (g.trunk && !g.trunk.found) g.trunk = null;
}

/** Where a find spawned by her stands (the dev spawn, Ed 2026-10-23: "a way to spawn the collectible near the player"): a few
 *  metres in front of her (the way she faces, a little toward the camera), else round her, on clear ground: on the island,
 *  not in a lake, the treehouse or a tree, rock or ruin. Null with nowhere within 12 m. */
export function spawnSpot(g: Pick<Game, "map" | "forest" | "tuning" | "witches">, i = 0): { x: number; z: number } | null {
  const w = g.witches[i].body, map = g.map, deck = deckOf(map, g.tuning);
  const a0 = Math.atan2(0.6, w.facing >= 0 ? 1 : -1);
  for (const r of [4, 5, 6, 8, 10, 12]) for (const k of [0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5, 6]) {
    const a = a0 + (k * Math.PI) / 6, x = w.x + Math.cos(a) * r, z = w.z + Math.sin(a) * r, cell = map.cellSafe(x, z).cell;
    if (!isInside(map.bounds, x, z, 10) || map.isLake(cell[0], cell[1]) || (deck && onFloor(deck, x, z, 3))) continue;
    if (g.forest.treesNear(x, z, 3).some(t => Math.hypot(t.x - x, t.z - z) < 2.5)) continue;
    if (g.forest.decorNear(x, z, 4).some(p => Math.hypot(p.x - x, p.z - z) < 3)) continue;
    return { x, z };
  }
  return null;
}

/** Tonight's find replaced by `kind`'s `item` at (x, z) (the dev spawn): the night's one find, so the constellation, the
 *  telescope and E at it all go by it, and taking it is the real claim (sigilButton.ts). Its kind must list the item. */
export function spawnFind(g: { trunk: Trunk | null; map: ForestMap }, kind: FindKindId, item: string, at: { x: number; z: number }): Trunk | null {
  if (!findKind(kind)?.items.includes(item)) return null;
  const c = g.map.cellSafe(at.x, at.z).cell;
  return (g.trunk = { x: at.x, z: at.z, cell: [c[0], c[1]], kind, item, found: false });
}
