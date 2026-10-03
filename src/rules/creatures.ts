// Creatures: each area's own kind, more of them and older the further the area is from home
// (Ed, 2026-10-03). The home area holds none and the areas round it a couple of babies; areas near
// the map's edge hold about 20, young ones among them. Legends are rare: at most one in any area,
// by a chance that rises toward the edge. Idle creatures roam their whole area, never leaving it.
// Only those near the witch are simulated; the rest pick up where they would plausibly be.
import { clamp, hash2, lerp, rng, smoothstep } from "./random";
import { AREA_TYPES, type ForestMap } from "./map";

export interface Creature {
  id: number;
  /** Its species id in the art module's bestiary: the area type's creature. */
  species: string;
  /** The area it belongs to. */
  cell: [number, number];
  /** 0 baby, 1 young, 2 legend. */
  level: 0 | 1 | 2;
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
  /** Turned away from the viewer (walking up the screen), with a little hysteresis. */
  away: boolean;
  moving: boolean;
  /** Walk cycle clock, for the two walking frames. */
  walk: number;
  /** Game time it was last simulated. */
  seen: number;
  /** Invited, so leashed: to the witch or a placed sigil (rules/leash.ts moves it, not its roam). */
  leashed: boolean;
  rand: () => number;
}

export interface AreaPopulation { babies: number; young: number; legends: number }

/** How many of each level live in an area `remoteness` (0 home, 1 edge) from the dancefloor.
 *  `roll` varies the count; `legendRoll` decides the area's one legend, if any. */
export function population(map: ForestMap, remoteness: number, roll = 0.5, legendRoll = 1): AreaPopulation {
  const t = map.tuning, r = clamp(remoteness, 0, 1);
  const total = Math.max(0, Math.round(lerp(t.creaturesNear, t.creaturesFar, Math.pow(r, t.creatureCurve)) + (roll - 0.5) * 2));
  const legends = total > 0 && legendRoll < legendChance(map, r) ? 1 : 0;
  const young = Math.round(Math.max(0, total - legends) * t.youngShareFar * r);
  return { babies: Math.max(0, total - legends - young), young, legends };
}

/** The chance an area has a legend: 0 inside legendsFrom, rising to legendChanceFar at the edge. */
export const legendChance = (map: ForestMap, remoteness: number) =>
  map.tuning.legendChanceFar * smoothstep((remoteness - map.tuning.legendsFrom) / Math.max(0.01, 1 - map.tuning.legendsFrom));

/** How far from its area's centre a creature looks for places to go: the whole area. */
export const wanderRange = (map: ForestMap) => map.areaSize * 0.75;

const inCell = (map: ForestMap, x: number, z: number, cell: [number, number]) => { const c = map.areaAt(x, z).cell; return c[0] === cell[0] && c[1] === cell[1]; };

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
  const [hx, hy] = map.centreCell;
  for (let cy = 0; cy < map.n; cy++) for (let cx = 0; cx < map.n; cx++) {
    if (cx === hx && cy === hy) continue;
    const r = rng(map.seed * 7919 + cx * 131 + cy * 977 + 3), type = AREA_TYPES[map.typeOf(cx, cy)], home = map.siteOf(cx, cy);
    const far = map.remoteness(cx, cy), pop = population(map, far, hash2(cx, cy, map.seed + 43), hash2(cx, cy, map.seed + 47));
    const make = (level: 0 | 1 | 2): Creature => {
      const cell: [number, number] = [cx, cy], range = wanderRange(map), [anchorX, anchorZ] = anchorOf(map, cell, home.x, home.z, range);
      const base = { cell, homeX: home.x, homeZ: home.z, range, anchorX, anchorZ };
      const [x, z] = pointInArea(map, base, r);
      return {
        id: id++, species: type.creature, level, ...base, x, z, tx: x, tz: z,
        rest: r() * 3, speed: (level === 2 ? t.legendSpeed : t.creatureSpeed) * (0.7 + r() * 0.6),
        facing: r() < 0.5 ? 1 : -1, away: false, moving: false, walk: r(), seen: 0, leashed: false,
        rand: rng(map.seed * 31 + id * 7 + 11),
      };
    };
    for (let i = 0; i < pop.babies; i++) out.push(make(0));
    for (let i = 0; i < pop.young; i++) out.push(make(1));
    const nextToHome = t.legendNextToHome && cx === hx + 1 && cy === hy;
    if (pop.legends || nextToHome) out.push(make(2));
  }
  return out;
}

/** Roam: walk to a random spot in its own area, pause a while, pick another. It never crosses
 *  its area's border: a step that would cross it is not taken, and it chooses again. */
export function stepCreature(c: Creature, dt: number, map: ForestMap): void {
  if (c.rest > 0) { c.rest -= dt; c.moving = false; return; }
  const dx = c.tx - c.x, dz = c.tz - c.z, d = Math.hypot(dx, dz);
  if (d < 0.05) {
    [c.tx, c.tz] = pointInArea(map, c, c.rand);
    c.rest = 0.8 + c.rand() * 3.5; c.moving = false;
    return;
  }
  const step = Math.min(d, c.speed * dt), nx = c.x + (dx / d) * step, nz = c.z + (dz / d) * step;
  // Every step checks where it would stand: still its own area? If not, it stops and chooses again.
  if (!inCell(map, nx, nz, c.cell)) { c.tx = c.x; c.tz = c.z; c.moving = false; return; }
  c.x = nx; c.z = nz;
  if (Math.abs(dx) > 0.02) c.facing = dx > 0 ? 1 : -1;
  if (dz < -0.3 * d) c.away = true; else if (dz > 0.3 * d) c.away = false; // up the screen is away
  c.moving = true;
  c.walk += dt * (c.level === 2 ? 1.5 : 4);
}

/** Step only the creatures within `radius` metres of (x, z). One coming back into range after a
 *  while is put where it would plausibly be by now (a point in its area chosen from its id and
 *  the time), rather than where it was left. */
export function stepCreaturesNear(all: Creature[], x: number, z: number, radius: number, dt: number, time: number, map: ForestMap): void {
  for (const c of all) {
    if (c.leashed) continue;
    if (Math.abs(c.homeX - x) > radius || Math.abs(c.homeZ - z) > radius) continue;
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
