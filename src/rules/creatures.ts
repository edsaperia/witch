// Creatures: each area's own kind, more of them and older the further the area is from home
// (Ed, 2026-10-03), by the metres from the dancefloor to its rune stone (Ed, 2026-10-04: the
// tuning's population table). The home area holds none; the first ring a couple of babies and a
// couple of adults; areas near the map's edge about 20, mostly adults. Wild legends are rare, late threats (Ed,
// 2026-10-04): a few a map, only in remote areas, each a boss, asleep until the party reaches it. Idle creatures roam their whole area, never leaving it.
// Only those near the witch are simulated; the rest pick up where they would plausibly be.
import { hash2, lerp, rng } from "./random";
import { AREA_TYPES, type ForestMap } from "./map";
import { facingAway } from "./witch";
import type { PopulationRow, Tuning } from "./tuning";
import type { Fight } from "./combat";

export type Level = 0 | 1 | 2 | 3;
export const LEGEND = 3;

/** How fast a species moves, against the usual (Ed, 2026-10-04): the witch is much faster than
 *  almost all of them; a few species are fast (rare, and weaker when combat comes); legends are
 *  very slow. */
export function speedFactor(species: string, level: Level, t: Tuning): number {
  const S = t.creatureSpeeds;
  return level === LEGEND ? S.legend : S.fast.includes(species) ? S.fastMult : 1;
}

export interface Creature {
  id: number;
  /** Its species id in the art module's bestiary: the area type's creature. */
  species: string;
  /** The area it belongs to. */
  cell: [number, number];
  /** 0 baby, 1 young, 2 adult, 3 legend. */
  level: Level;
  /** Its area's centre. */
  homeX: number;
  homeZ: number;
  /** How far from the centre it looks for somewhere to go (the area's reach). */
  range: number;
  /** A point surely inside its own area (its centre can lie in a neighbour's ground). */
  anchorX: number;
  anchorZ: number;
  x: number;
  z: number;
  tx: number;
  tz: number;
  /** Seconds left pausing (sniffing, grazing, sitting) before it picks somewhere new. */
  rest: number;
  speed: number;
  facing: 1 | -1;
  /** Turned away from the viewer: only while walking up the screen (see facingAway). */
  away: boolean;
  moving: boolean;
  /** Walk cycle clock, for the two walking frames. */
  walk: number;
  /** Game time it was last simulated. */
  seen: number;
  /** Invited, so leashed: to the witch or a placed sigil (rules/leash.ts moves it, not its roam). */
  leashed: boolean;
  /** Combat (rules/combat.ts): its health (maxHp by level when unset), when it was last hurt,
   *  knockback still to ease off, slowed until, its fight. */
  hp?: number;
  hurtAt?: number;
  kx?: number;
  kz?: number;
  slowUntil?: number;
  fight?: Fight;
  /** Beaten in a fight (wild): fleeing from (fleeX, fleeZ) until fleeUntil, then gone. */
  fleeUntil?: number;
  fleeX?: number;
  fleeZ?: number;
  /** Gone for the run: a party animal defeated, or a wild one that fled. */
  gone?: boolean;
  /** Marching on a soundsystem (its area's key, "home" for the dancefloor): a siege. */
  siege?: string;
  /** Let go when its witch was knocked out (Ed, 2026-10-04): neutral, walking to this area of its
   *  own kind, where it becomes an ordinary wild creature of that area. */
  wanderTo?: { x: number; z: number; cell: [number, number] };
  /** When it was last healed to full (a berry, or being invited): the view's heal pop. */
  healedAt?: number;
  /** A wild legend: a mini-boss when combat comes (a hook: no fighting yet). */
  boss?: boolean;
  /** A disc (centre, radius in metres) found to lie wholly in its own area: see inOwnArea. */
  safeX?: number;
  safeZ?: number;
  safeR?: number;
  rand: () => number;
}

export interface AreaPopulation { babies: number; young: number; adults: number }

/** The table's numbers `metres` from the dancefloor, read between its rows (unrounded). */
export function populationAt(table: readonly PopulationRow[], metres: number): AreaPopulation {
  const rows = [...table].sort((a, b) => a.at - b.at), last = rows[rows.length - 1];
  if (!rows.length) return { babies: 0, young: 0, adults: 0 };
  if (metres <= rows[0].at) return { babies: rows[0].babies, young: rows[0].young, adults: rows[0].adults };
  if (metres >= last.at) return { babies: last.babies, young: last.young, adults: last.adults };
  let i = 0;
  while (rows[i + 1].at < metres) i++;
  const a = rows[i], b = rows[i + 1], k = (metres - a.at) / Math.max(1e-9, b.at - a.at);
  return { babies: lerp(a.babies, b.babies, k), young: lerp(a.young, b.young, k), adults: lerp(a.adults, b.adults, k) };
}

/** How many of each level live in an area whose rune stone (its soundsystem's spot) is `metres`
 *  from the dancefloor (Ed, 2026-10-04: populations stay tied to that distance). `roll` (0-1) is
 *  the area's own: it scales the young and adults by up to population.roll either way and moves
 *  the babies by one; `round` (0-1) rounds the fractions up or down (stochastic rounding, so the
 *  table's averages hold over many areas). Babies are always at least one, for inviting. (Wild
 *  legends are placed a map at a time: wildLegendCells.) */
export function population(map: ForestMap, metres: number, roll = 0.5, round = 0.5): AreaPopulation {
  const P = map.tuning.population, base = populationAt(P.table, metres), m = 1 + P.roll * (roll * 2 - 1);
  const n = (v: number) => Math.max(0, Math.floor(v + round));
  return { babies: Math.max(1, n(base.babies + (roll - 0.5) * 2)), young: n(base.young * m), adults: n(base.adults * m) };
}

/** How far an area's rune stone (where its soundsystem will stand) is from the dancefloor, in metres. */
export function runeDistance(map: ForestMap, cx: number, cy: number): number {
  const s = map.soundsystemSpot(cx, cy), d = map.dancefloor;
  return Math.hypot(s.x - d.x, s.z - d.z);
}

/** The areas a map's wild legends live in (Ed, 2026-10-04): wildLegends.perMap of them, chosen by
 *  the seed among the areas at least `from` remote, at least `spacing` areas apart. */
export function wildLegendCells(map: ForestMap): [number, number][] {
  const W = map.tuning.wildLegends, r = rng(map.seed * 4057 + 29);
  const pool: [number, number][] = [];
  for (let cy = 0; cy < map.n; cy++) for (let cx = 0; cx < map.n; cx++) if (map.remoteness(cx, cy) >= W.from) pool.push([cx, cy]);
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  const want = W.perMap[0] + Math.floor(r() * (W.perMap[1] - W.perMap[0] + 1)), out: [number, number][] = [];
  for (const c of pool) {
    if (out.length >= want) break;
    if (out.every(o => Math.hypot(o[0] - c[0], o[1] - c[1]) >= W.spacing)) out.push(c);
  }
  return out;
}

/** How far from its area's centre a creature looks for places to go: the whole area. */
export const wanderRange = (map: ForestMap) => map.areaSize * 0.75;

const inCell = (map: ForestMap, x: number, z: number, cell: [number, number]) => { const c = map.cellSafe(x, z).cell; return c[0] === cell[0] && c[1] === cell[1]; };

/** Whether (x, z) is in the creature's own area: asked of the map only once it leaves the disc
 *  last found to be surely inside (map.cellSafe), so a creature ambling about asks every metre
 *  or so, not every step (the area lookup was most of a frame's work with hundreds of them). */
function inOwnArea(map: ForestMap, c: Creature, x: number, z: number): boolean {
  if (c.safeR !== undefined && Math.hypot(x - c.safeX!, z - c.safeZ!) < c.safeR) return true;
  const r = map.cellSafe(x, z);
  if (r.cell[0] !== c.cell[0] || r.cell[1] !== c.cell[1]) return false;
  c.safeX = x; c.safeZ = z; c.safeR = r.safe;
  return true;
}

/** A point surely inside an area: its centre if that lies in its own ground, else the nearest
 *  such point found on rings round it. */
export function anchorOf(map: ForestMap, cell: [number, number], hx: number, hz: number, range: number): [number, number] {
  if (inCell(map, hx, hz, cell)) return [hx, hz];
  for (let d = 2; d < range * 1.5; d += 2) for (let k = 0; k < 16; k++) {
    const a = (k / 16) * Math.PI * 2, x = hx + Math.cos(a) * d, z = hz + Math.sin(a) * d;
    if (inCell(map, x, z, cell)) return [x, z];
  }
  return [hx, hz];
}

/** Somewhere inside the creature's own area, chosen by `r`; its anchor if none is found. */
export function pointInArea(map: ForestMap, c: Pick<Creature, "cell" | "homeX" | "homeZ" | "range" | "anchorX" | "anchorZ">, r: () => number): [number, number] {
  for (let i = 0; i < 12; i++) {
    const a = r() * Math.PI * 2, d = Math.sqrt(r()) * c.range, x = c.homeX + Math.cos(a) * d, z = c.homeZ + Math.sin(a) * d;
    if (inCell(map, x, z, c.cell)) return [x, z];
  }
  return [c.anchorX, c.anchorZ];
}

export function spawnCreatures(map: ForestMap): Creature[] {
  const out: Creature[] = [], t = map.tuning;
  let id = 0;
  // The home area holds none (Ed, 2026-10-03); with legendNextToHome, one legend lives next door.
  const [hx, hy] = map.centreCell, bosses = new Set(wildLegendCells(map).map(c => c.join()));
  for (let cy = 0; cy < map.n; cy++) for (let cx = 0; cx < map.n; cx++) {
    if (cx === hx && cy === hy) continue;
    const r = rng(map.seed * 7919 + cx * 131 + cy * 977 + 3), type = AREA_TYPES[map.typeOf(cx, cy)], home = map.siteOf(cx, cy);
    const pop = population(map, runeDistance(map, cx, cy), hash2(cx, cy, map.seed + 43), hash2(cx, cy, map.seed + 47));
    const make = (level: Level): Creature => {
      const cell: [number, number] = [cx, cy], range = wanderRange(map), [anchorX, anchorZ] = anchorOf(map, cell, home.x, home.z, range);
      const base = { cell, homeX: home.x, homeZ: home.z, range, anchorX, anchorZ };
      const [x, z] = pointInArea(map, base, r);
      return {
        id: id++, species: type.creature, level, ...base, x, z, tx: x, tz: z,
        rest: r() * 3, speed: (level === LEGEND ? t.legendSpeed : t.creatureSpeed * speedFactor(type.creature, level, t)) * (0.7 + r() * 0.6),
        facing: r() < 0.5 ? 1 : -1, away: false, moving: false, walk: r(), seen: 0, leashed: false, ...(level === LEGEND ? { boss: true } : {}),
        rand: rng(map.seed * 31 + id * 7 + 11),
      };
    };
    for (let i = 0; i < pop.babies; i++) out.push(make(0));
    for (let i = 0; i < pop.young; i++) out.push(make(1));
    for (let i = 0; i < pop.adults; i++) out.push(make(2));
    const nextToHome = t.legendNextToHome && cx === hx + 1 && cy === hy;
    if (bosses.has(`${cx},${cy}`) || nextToHome) out.push(make(3));
  }
  return out;
}

/** Roam: walk to a random spot in its own area, pause a while, pick another. It never crosses
 *  its area's border: a step that would cross it is not taken, and it chooses again. */
export function stepCreature(c: Creature, dt: number, map: ForestMap): void {
  // Out of its own area (it chased the witch, Ed 2026-10-04): it walks back to its spot first.
  if (!inOwnArea(map, c, c.x, c.z)) {
    const dx = c.anchorX - c.x, dz = c.anchorZ - c.z, d = Math.hypot(dx, dz) || 1, step = Math.min(d, c.speed * 2 * dt);
    c.x += (dx / d) * step; c.z += (dz / d) * step; c.tx = c.anchorX; c.tz = c.anchorZ; c.rest = 0;
    if (Math.abs(dx) > 0.02) c.facing = dx > 0 ? 1 : -1;
    c.moving = true; c.walk += dt * 4;
    return;
  }
  if (c.rest > 0) { c.rest -= dt; c.moving = false; c.away = false; return; }
  const dx = c.tx - c.x, dz = c.tz - c.z, d = Math.hypot(dx, dz);
  if (d < 0.05) {
    [c.tx, c.tz] = pointInArea(map, c, c.rand);
    c.rest = 0.8 + c.rand() * 3.5; c.moving = false;
    return;
  }
  const step = Math.min(d, c.speed * dt), nx = c.x + (dx / d) * step, nz = c.z + (dz / d) * step;
  // Every step checks where it would stand: still its own area? If not, it stops and chooses again.
  if (!inOwnArea(map, c, nx, nz)) { c.tx = c.x; c.tz = c.z; c.moving = false; return; }
  c.x = nx; c.z = nz;
  if (Math.abs(dx) > 0.02) c.facing = dx > 0 ? 1 : -1;
  c.away = facingAway(dx, dz, c.away, 0, map.tuning); // away only while heading up the screen
  c.moving = true;
  c.walk += dt * (c.level === LEGEND ? 1.5 : 4);
}

/** A creature moved by combat (rules/combat.ts) or a knockout (rules/knockout.ts) this step,
 *  not by its roam or its leash. */
export const heldByCombat = (c: Creature) => !!(c.gone || c.fleeUntil || c.wanderTo || c.fight?.target || (c.siege && !c.leashed));

/** Step only the creatures within `radius` metres of (x, z). One coming back into range after a
 *  while is put where it would plausibly be by now (a point in its area chosen from its id and
 *  the time), rather than where it was left. A `dormant` one (a wild legend still asleep) stays
 *  where it lies. */
export function stepCreaturesNear(all: Creature[], x: number, z: number, radius: number, dt: number, time: number, map: ForestMap, dormant: (c: Creature) => boolean = () => false): void {
  for (const c of all) {
    if (c.leashed || c.gone) continue;
    if (Math.abs(c.homeX - x) > radius || Math.abs(c.homeZ - z) > radius) continue;
    if (dormant(c)) { c.seen = time; c.moving = false; c.away = false; continue; }
    if (heldByCombat(c)) { c.seen = time; continue; } // fighting, fleeing, marching or walking home: moved by combat and knockout
    if (time - c.seen > 3) {
      const r = rng(c.id * 7919 + Math.floor(time / 20) * 131 + 5);
      [c.x, c.z] = pointInArea(map, c, r);
      [c.tx, c.tz] = pointInArea(map, c, r);
      c.rest = r() * 2;
    }
    c.seen = time;
    stepCreature(c, dt, map);
  }
}
