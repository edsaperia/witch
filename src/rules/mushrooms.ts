// Mushroom collecting and the shared kitchen. World time measures trips; her time measures choreography.
import type { Game, Witch } from './game';
import { AREA_TYPES, stumpClearance, type ForestMap } from './map';
import { Forest, treeChance } from './forest';
import { KINDS } from './rosters';
import { rng, hash2 } from './random';
import { isInside } from './mapShape';
import { onLake } from './lakes';
import { HOUSE_ROOMS, fromPlan } from './houseRooms';
import { deckOf } from './treehouse';
import { kitchenPlacement } from './kitchenPlacement';
import { roomAt as planRoomAt } from '../../config/house/shape.js';
import { edLayoutRequested } from './housePlacement';
import { mushroomRow } from './mushroomTestRow';

export const MUSHROOM_COLOURS = ['blue', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'turquoise', 'white'] as const;
export type MushroomColour = typeof MUSHROOM_COLOURS[number];
export const BIOME_MUSHROOM: Record<string, MushroomColour> = { temperate: 'red', cold: 'blue', 'mountains and glaciers': 'white', volcanic: 'orange', badlands: 'purple', hot: 'yellow', 'mangrove swamp': 'turquoise', jungle: 'pink', 'cold rainforest': 'green' };
export const POTION_SECONDS = 600, MUSHROOM_REACH = 2.5, BASKET_REACH = 2.4;
/** A witch's spin in the smoke before she falls (s), from when it takes her: as long as the whole smoke lasted before it hung over the
 *  cauldron's reach (Ed, 2026-11-03), so the one at the pot falls when she always did. */
export const SMOKE_SPIN = 4;
/** The cauldron's reach (m) and how long its smoke hangs (s): the tuning's treehouse.house.cauldronReach and cauldronSmoke (Ed,
 *  2026-11-03: "10m cauldron reach is fine"; "The cauldron smoke effect should cover the 10m area for ten seconds or so, and if you
 *  walk into it you are affected by the potion"). */
export const cauldronReach = (t: Game['tuning']): number => t.treehouse?.house?.cauldronReach ?? 10;
export const cauldronSmoke = (t: Game['tuning']): number => t.treehouse?.house?.cauldronSmoke ?? 10;
export interface MushroomPatch { id: string; x: number; z: number; type: MushroomColour; seed: number; picked: boolean }
export interface MushroomFlight { id: number; type: MushroomColour; kind: 'unload' | 'brew'; witch: number; from: { x: number; z: number }; to: { x: number; z: number }; at: number; lands: number }
export interface PotionExposure { at: number; fallAt: number; landAt: number; wakeAt: number; freeAt: number; from: { x: number; z: number }; to: { x: number; z: number }; recipe: MushroomColour[]; woken?: boolean }
export interface PotionTrip { recipe: MushroomColour[]; key: string; at: number; until: number }
export interface MushroomState {
  patches: MushroomPatch[];
  baskets: Record<MushroomColour, number>;
  carried: Record<number, MushroomColour[]>;
  flights: MushroomFlight[];
  puffs: { id: number; x: number; z: number; type: MushroomColour; at: number }[];
  plops: { id: number; type: MushroomColour; at: number }[];
  ingredients: MushroomColour[];
  /** A brew's smoke over the cauldron's reach, from the third mushroom's plop till `until` (cauldronSmoke seconds); `taken`: the
   *  witches it has taken, each once (absent in an older save: none yet). */
  smoke: { at: number; until: number; recipe: MushroomColour[]; taken?: number[] } | null;
  affected: Record<number, PotionExposure>;
  trips: Record<number, PotionTrip>;
  nextUnload: Record<number, number>;
  serial: number;
}
export const emptyBaskets = (): Record<MushroomColour, number> => Object.fromEntries(MUSHROOM_COLOURS.map(c => [c, 0])) as Record<MushroomColour, number>;
export const recipeKey = (colours: readonly MushroomColour[]): string => [...colours].sort().join('+');
export const basketFill = (count: number): 'empty' | 'half' | 'full' | 'overflowing' => count <= 0 ? 'empty' : count <= 5 ? 'half' : count <= 15 ? 'full' : 'overflowing';

/** How far a mushroom keeps from every berry bush: beyond its patch's radius and MUSHROOM_BUSH_MARGIN metres more (Ed, 2026-11-06:
 *  "Mushrooms shouldn't grow on berry patches, paths, stump fight areas, etc."). */
export const MUSHROOM_BUSH_MARGIN = 3;
/** Ground a mushroom may grow on in its area (Ed, 2026-11-06: "Mushrooms shouldn't grow on berry patches, paths, stump fight areas,
 *  etc."): its own area, inside the map's edge and off the lakes; not on hardClear ground (the beach's sand, a lake's shore, the
 *  dancefloor's and treehouse's clearings, a sleeping legend's circle, the find's and the challenge circle's clearings, grounds,
 *  scenes, set pieces, a stump's roots clearing) nor near anything reserved; 2 m off every path; out of every stump's fighting arena
 *  (stumpClearance from the stump, the berries' own clearance: rules/map.ts); and beyond patch.radius + MUSHROOM_BUSH_MARGIN m of every
 *  berry bush. `onPath`: the paths allowed (the last resort: Ed, 2026-11-06, "If no valid spot, on a path is ok."). */
function mushroomGround(map: ForestMap, cell: readonly [number, number], x: number, z: number, clear: number, near: (x: number, z: number) => boolean, onPath = false): boolean {
  const at = map.cellSafe(x, z).cell;
  if (at[0] !== cell[0] || at[1] !== cell[1] || !isInside(map.bounds, x, z, 3) || onLake(map.bounds, x, z, 2)) return false;
  if (map.stoneGap(x, z) < clear || near(x, z)) return false;
  return !map.hardClear(x, z) && (onPath || !map.paths.at(x, z, 2)) && !map.reserved(x, z, 2);
}

/** Stable placement: score secluded candidates on mushroomGround, then reject a tree trunk over the actual mushroom. Placed after the
 *  berries (rules/game.ts), against their bushes. A cramped area searches its whole vicinity on the same ground; failing that, the same
 *  search with the paths allowed (Ed, 2026-11-06: "If no valid spot, on a path is ok.": still off the stumps' arenas, the bushes, the
 *  lakes and the clearings); failing even that, the area gets no mushroom, said in the console (never a throw: a night must start). */
export function placeMushrooms(map: ForestMap, forest: Forest, bushes: readonly { x: number; z: number }[] = []): MushroomPatch[] {
  if (map.zoo) return [];
  const out: MushroomPatch[] = [], clear = stumpClearance(map.tuning), bushGap = (map.tuning.berries?.patch?.radius ?? 0) + MUSHROOM_BUSH_MARGIN;
  // (the bushes by 16 m squares: a mushroom asks only its own and the eight round it)
  const G = 16, grid = new Map<string, { x: number; z: number }[]>();
  for (const b of bushes) { const k = `${Math.floor(b.x / G)},${Math.floor(b.z / G)}`; const l = grid.get(k); if (l) l.push(b); else grid.set(k, [b]); }
  const nearBush = (x: number, z: number) => {
    const gx = Math.floor(x / G), gz = Math.floor(z / G);
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) for (const b of grid.get(`${gx + i},${gz + j}`) ?? []) if (Math.hypot(b.x - x, b.z - z) < bushGap) return true;
    return false;
  };
  for (const cell of map.cells) {
    if (cell[0] === map.centreCell[0] && cell[1] === map.centreCell[1]) continue;
    const id = cell.join(','), seed = Math.floor(hash2(cell[0], cell[1], map.seed + 7731) * 0xffffffff), random = rng(seed);
    const own = BIOME_MUSHROOM[KINDS[AREA_TYPES[map.typeOf(...cell)].creature]?.biome ?? 'temperate'] ?? 'red';
    const others = MUSHROOM_COLOURS.filter(c => c !== own), type = random() < .9 ? own : others[Math.floor(random() * others.length)];
    const site = map.siteOf(...cell), candidates: { x: number; z: number; score: number }[] = [];
    const ground = (x: number, z: number, onPath = false) => mushroomGround(map, cell, x, z, clear, nearBush, onPath);
    for (let i = 0; i < 256; i++) {
      const x = site.x + (random() - .5) * map.areaSize * 2, z = site.z + (random() - .5) * map.areaSize * 2;
      if (!ground(x, z)) continue;
      candidates.push({ x, z, score: treeChance(map, x, z, map.typeOf(...cell)) * 3 + map.arenaOpen(x, z, cell) + random() * .15 });
    }
    candidates.sort((a, b) => b.score - a.score);
    const free = (p: { x: number; z: number }) => !forest.treesNear(p.x, p.z, 2).some(t => Math.hypot(t.x - p.x, t.z - p.z) < 1.8);
    let chosen: { x: number; z: number } | undefined = candidates.find(free);
    // Rare cramped cells: search their whole vicinity, on the same ground, instead of silently placing under a trunk or in water; then
    // with the paths allowed (Ed, 2026-11-06: "If no valid spot, on a path is ok.").
    if (!chosen) {
      const spots: { x: number; z: number }[] = []; // (its own ground on a 2 m grid, found once for both searches)
      for (let z = site.z - map.areaSize * 3; z <= site.z + map.areaSize * 3; z += 2) for (let x = site.x - map.areaSize * 3; x <= site.x + map.areaSize * 3; x += 2) {
        const c = map.cellSafe(x, z).cell;
        if (c[0] === cell[0] && c[1] === cell[1]) spots.push({ x, z });
      }
      for (const onPath of [false, true]) {
        chosen = spots.find(p => ground(p.x, p.z, onPath) && free(p));
        if (chosen) { if (onPath) console.info(`mushrooms: seed ${map.seed}: area ${id}'s patch on or by a path (no other ground for it)`); break; }
      }
    }
    if (!chosen) { console.warn(`mushrooms: seed ${map.seed}: no ground for area ${id}'s patch, even on a path (off the bushes, clearings, lakes and stumps' arenas): none there`); continue; }
    out.push({ id, x: chosen.x, z: chosen.z, type, seed, picked: false });
  }
  return out;
}
export function newMushrooms(map: ForestMap, forest: Forest, bushes: readonly { x: number; z: number }[] = []): MushroomState {
  return { patches: placeMushrooms(map, forest, bushes), baskets: emptyBaskets(), carried: {}, flights: [], puffs: [], plops: [], ingredients: [], smoke: null, affected: {}, trips: {}, nextUnload: {}, serial: 0 };
}
const testRows = new WeakMap<MushroomState, MushroomPatch[]>();
/** Optional samples use the ordinary pickup/inventory path; disabling removes only their visible patches. */
export function syncMushroomTestRow(g: Pick<Game, 'mushrooms' | 'map' | 'forest' | 'tuning'>): void {
  const s = g.mushrooms, prefix = 'light-test:';
  if (!g.tuning.mushroomLight?.testRow) {
    const existing = s.patches.filter(p => p.id.startsWith(prefix));
    if (existing.length) testRows.set(s, existing); // Also retain picked state after a saved night is restored.
    if (s.patches.some(p => p.id.startsWith(prefix))) s.patches = s.patches.filter(p => !p.id.startsWith(prefix));
    return;
  }
  if (s.patches.some(p => p.id.startsWith(prefix))) return;
  let patches = testRows.get(s);
  if (!patches) {
    const map = g.map, f = g.forest;
    const near = (items: {x: number; z: number}[], x: number, z: number, r: number) => items.some(p => Math.hypot(p.x - x, p.z - z) < r);
    const row = mushroomRow(map.dancefloor, MUSHROOM_COLOURS.length, (x, z) =>
      isInside(map.bounds, x, z, 3) && !onLake(map.bounds, x, z, 2) && map.clearOfStones(x, z, 2) && !map.reserved(x, z, 2) &&
      !near(f.treesNear(x, z, 4), x, z, 3) && !near(f.bushesNear(x, z, 4), x, z, 3) && !near(f.decorNear(x, z, 5), x, z, 4) &&
      !near(f.wallsNear(x, z, 9), x, z, 8) && !near(f.bedsNear(x, z, 9), x, z, 8) &&
      !near(f.setPiecesNear(x, z, 13), x, z, 12) && !near(f.relicsNear(x, z, 13), x, z, 12));
    patches = row?.map((p, i) => ({...p, id: `${prefix}${MUSHROOM_COLOURS[i]}`, type: MUSHROOM_COLOURS[i], seed: Math.floor(hash2(i, 1643, map.seed) * 0xffffffff), picked: false})) ?? [];
    testRows.set(s, patches);
  }
  s.patches.push(...patches);
}
export function kitchenPlan(optIn = edLayoutRequested()) {
  const room = HOUSE_ROOMS.rooms.find(r => r.id === 'kitchen')!;
  const cauldron = { x: room.x, z: room.z - 1.5 };
  const baskets = MUSHROOM_COLOURS.map((type, i) => {
    const a = Math.PI - i * Math.PI / (MUSHROOM_COLOURS.length - 1), radius = room.r * .78;
    return { type, x: room.x + Math.cos(a) * radius, z: room.z + Math.sin(a) * radius };
  });
  const selected = kitchenPlacement({ room, cauldron, baskets }, optIn);
  // (`room`: the room under the pot, only where its picture is anchored, render/brewing.ts; who it reaches is cauldronReach's)
  const destination = planRoomAt(HOUSE_ROOMS.shape, selected.cauldron.x, selected.cauldron.z)?.id;
  return { ...selected, room: HOUSE_ROOMS.rooms.find(r => r.id === destination) ?? room };
}
export function kitchenLayout(g: Pick<Game, 'map' | 'tuning'>) {
  const plan = kitchenPlan(), at = deckOf(g.map, g.tuning) ?? g.map.treehouse;
  return { room: plan.room, cauldron: fromPlan(at, plan.cauldron.x, plan.cauldron.z), baskets: plan.baskets.map(b => ({ type: b.type, ...fromPlan(at, b.x, b.z) })) };
}
/** Within the cauldron's reach: on foot in the house (on its floor, not seated), at most cauldronReach metres from the pot's middle
 *  (Ed, 2026-11-03: "The cauldron it could affect all witches in a radius"; it was the room the pot stands in). The one rule for
 *  the potion's smoke and unloading what she carries, and for the legacy kitchen (rules/cauldronNight.ts). */
export function inCauldronReach(g: Pick<Game, 'map' | 'tuning'>, W: Witch): boolean {
  const d = deckOf(g.map, g.tuning), w = W.body;
  if (!d?.house?.rooms || !w.perch || w.mode !== 'ground' || w.seated) return false;
  const pot = kitchenLayout(g).cauldron;
  return Math.hypot(w.x - pot.x, w.z - pot.z) <= cauldronReach(g.tuning);
}
/** The basket she's at: on foot in the house (on its floor, not seated), within BASKET_REACH of it, wherever Ed's layout puts it (the
 *  baskets work by their own nearness, not the cauldron's reach: some of his stand 11 m from the pot). */
export function basketNear(g: Game, W = g.witches[0]) {
  const d = deckOf(g.map, g.tuning), w = W.body;
  if (!d?.house?.rooms || !w.perch || w.mode !== 'ground' || w.seated) return null;
  return kitchenLayout(g).baskets.map(b => ({ ...b, distance: Math.hypot(b.x - W.body.x, b.z - W.body.z) })).filter(b => b.distance <= BASKET_REACH).sort((a, b) => a.distance - b.distance)[0] ?? null;
}
export function mushroomNear(g: Game, W = g.witches[0]): MushroomPatch | null {
  if (W.ko || W.body.perch || W.body.seated || W.body.mode !== 'ground') return null;
  return g.mushrooms.patches.filter(p => !p.picked && Math.hypot(p.x - W.body.x, p.z - W.body.z) <= MUSHROOM_REACH).sort((a, b) => Math.hypot(a.x - W.body.x, a.z - W.body.z) - Math.hypot(b.x - W.body.x, b.z - W.body.z))[0] ?? null;
}
/** Return true when this interaction owns the press (even an empty/busy basket). */
export function mushroomButton(g: Game, W: Witch, place: boolean, use: boolean): boolean {
  if (W.ko || potionPhase(g, W)) return false;
  const s = g.mushrooms, basket = use ? basketNear(g, W) : null, at = g.herTime;
  if (basket) {
    const reserved = s.ingredients.length + s.flights.filter(f => f.kind === 'brew').length;
    if (s.baskets[basket.type] > 0 && !s.smoke && reserved < 3) {
      s.baskets[basket.type]--;
      s.flights.push({ id: s.serial++, type: basket.type, kind: 'brew', witch: W.id, from: { x: basket.x, z: basket.z }, to: kitchenLayout(g).cauldron, at, lands: at + .7 });
    }
    return true;
  }
  const patch = place ? mushroomNear(g, W) : null;
  if (!patch) return false;
  patch.picked = true;
  (s.carried[W.id] ??= []).push(patch.type);
  s.puffs.push({ id: s.serial++, x: patch.x, z: patch.z, type: patch.type, at });
  return true;
}
export function potionPhase(g: Game, W = g.witches[0]): 'spin' | 'fall' | 'sleep' | 'recover' | null {
  if (g.cauldron) return null; // The explicit legacy preview owns its own choreography.
  const p = g.mushrooms?.affected[W.id], at = g.herTime;
  return !p || at >= p.freeAt ? null : at < p.fallAt ? 'spin' : at < p.landAt ? 'fall' : at < p.wakeAt ? 'sleep' : 'recover';
}
/** Smoke membership is spatial, including entrants after the third mushroom landed. */
export function stepMushrooms(g: Game): void {
  syncMushroomTestRow(g);
  const s = g.mushrooms, at = g.herTime;
  s.puffs = s.puffs.filter(p => at - p.at < 1.2); s.plops = s.plops.filter(p => at - p.at < 1.2);
  const flights = s.flights; s.flights = [];
  for (const f of flights) {
    if (at < f.lands) { s.flights.push(f); continue; }
    if (f.kind === 'unload') s.baskets[f.type]++;
    else {
      s.ingredients.push(f.type); s.plops.push({ id: f.id, type: f.type, at });
      if (s.ingredients.length === 3) s.smoke = { at, until: at + cauldronSmoke(g.tuning), recipe: [...s.ingredients], taken: [] };
    }
  }
  // (anyone on foot in the house who is within the reach at any moment while the smoke lasts, walking in after the brew too: once each)
  if (s.smoke && at < s.smoke.until) for (const W of g.witches) {
    const taken = s.smoke.taken ??= [];
    if (W.ko || s.affected[W.id] || taken.includes(W.id) || !inCauldronReach(g, W)) continue;
    taken.push(W.id);
    const fallAt = at + SMOKE_SPIN, landAt = fallAt + 1.1, wakeAt = landAt + 2;
    s.affected[W.id] = { at, fallAt, landAt, wakeAt, freeAt: wakeAt + 3, from: { x: W.body.x, z: W.body.z }, to: { x: W.body.x, z: W.body.z + 2 }, recipe: [...s.smoke.recipe] };
    W.dash.until = at; W.dash.bufferUntil = undefined;
  }
  if (s.smoke && at >= s.smoke.until) { s.smoke = null; s.ingredients = []; }
  for (const W of g.witches) {
    const p = s.affected[W.id];
    if (p) {
      W.body.vx = W.body.vz = 0; W.body.seated = false; W.body.mode = 'ground'; W.body.lift = 0;
      delete W.body.falling;
      if (at >= p.landAt) { W.body.x = p.to.x; W.body.z = p.to.z; W.body.perch = false; W.body.stargazing = true; }
      if (!p.woken && at >= p.wakeAt) {
        p.woken = true;
        s.trips[W.id] = { recipe: [...p.recipe], key: recipeKey(p.recipe), at: g.clock.time, until: g.clock.time + POTION_SECONDS };
      }
      if (at >= p.freeAt) delete s.affected[W.id];
    }
    if (s.trips[W.id] && g.clock.time >= s.trips[W.id].until) delete s.trips[W.id];
    const bag = s.carried[W.id];
    if (!p && bag?.length && inCauldronReach(g, W) && at >= (s.nextUnload[W.id] ?? 0)) {
      const type = bag.shift()!, to = kitchenLayout(g).baskets.find(b => b.type === type)!;
      s.flights.push({ id: s.serial++, type, kind: 'unload', witch: W.id, from: { x: W.body.x, z: W.body.z }, to: { x: to.x, z: to.z }, at, lands: at + .7 });
      s.nextUnload[W.id] = at + .5;
    }
  }
}
