// Mushroom collecting and the shared kitchen. World time measures trips; her time measures choreography.
import type { Game, Witch } from './game';
import { AREA_TYPES, type ForestMap } from './map';
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

/** Stable placement: score secluded candidates, then reject a tree trunk over the actual mushroom. */
export function placeMushrooms(map: ForestMap, forest: Forest): MushroomPatch[] {
  if (map.zoo) return [];
  const out: MushroomPatch[] = [];
  for (const cell of map.cells) {
    if (cell[0] === map.centreCell[0] && cell[1] === map.centreCell[1]) continue;
    const id = cell.join(','), seed = Math.floor(hash2(cell[0], cell[1], map.seed + 7731) * 0xffffffff), random = rng(seed);
    const own = BIOME_MUSHROOM[KINDS[AREA_TYPES[map.typeOf(...cell)].creature]?.biome ?? 'temperate'] ?? 'red';
    const others = MUSHROOM_COLOURS.filter(c => c !== own), type = random() < .9 ? own : others[Math.floor(random() * others.length)];
    const site = map.siteOf(...cell), candidates: { x: number; z: number; score: number }[] = [];
    for (let i = 0; i < 256; i++) {
      const x = site.x + (random() - .5) * map.areaSize * 2, z = site.z + (random() - .5) * map.areaSize * 2;
      const at = map.cellSafe(x, z).cell;
      if (at[0] !== cell[0] || at[1] !== cell[1] || !isInside(map.bounds, x, z, 3) || onLake(map.bounds, x, z, 2)) continue;
      if (map.reserved(x, z, 2) || map.paths.at(x, z, 2)) continue;
      candidates.push({ x, z, score: treeChance(map, x, z, map.typeOf(...cell)) * 3 + map.arenaOpen(x, z, cell) + random() * .15 });
    }
    candidates.sort((a, b) => b.score - a.score);
    const free = (p: { x: number; z: number }) => !forest.treesNear(p.x, p.z, 2).some(t => Math.hypot(t.x - p.x, t.z - p.z) < 1.8);
    let chosen: { x: number; z: number } | undefined = candidates.find(free);
    // Rare cramped cells: search their whole vicinity instead of silently placing under a trunk or in water.
    if (!chosen) outer: for (let z = site.z - map.areaSize * 3; z <= site.z + map.areaSize * 3; z += 2) {
      for (let x = site.x - map.areaSize * 3; x <= site.x + map.areaSize * 3; x += 2) {
        const c = map.cellSafe(x, z).cell;
        if (c[0] !== cell[0] || c[1] !== cell[1] || !isInside(map.bounds, x, z, 3) || onLake(map.bounds, x, z, 2) || map.reserved(x, z, 2) || map.paths.at(x, z, 2)) continue;
        if (free({ x, z })) { chosen = { x, z }; break outer; }
      }
    }
    if (!chosen) throw new Error(`No reachable mushroom location in area ${id}`);
    out.push({ id, x: chosen.x, z: chosen.z, type, seed, picked: false });
  }
  return out;
}
export function newMushrooms(map: ForestMap, forest: Forest): MushroomState {
  return { patches: placeMushrooms(map, forest), baskets: emptyBaskets(), carried: {}, flights: [], puffs: [], plops: [], ingredients: [], smoke: null, affected: {}, trips: {}, nextUnload: {}, serial: 0 };
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
