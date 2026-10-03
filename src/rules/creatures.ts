// Creatures: each area's own kind, more of them and older the further the area is from home
// (Ed, 2026-10-03). The home area holds none and the areas round it a couple of babies; areas near the map's
// edge hold about 20, young ones and a couple of legends among them. They wander round their
// area's centre; only those near the witch are simulated.
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
  /** The centre it wanders round. */
  homeX: number;
  homeZ: number;
  range: number;
  x: number;
  z: number;
  tx: number;
  tz: number;
  /** Seconds left standing still before it picks somewhere new. */
  rest: number;
  speed: number;
  facing: 1 | -1;
  moving: boolean;
  /** Walk cycle clock, for the two walking frames. */
  walk: number;
  rand: () => number;
}

export interface AreaPopulation { babies: number; young: number; legends: number }

/** How many of each level live in an area `remoteness` (0 home, 1 edge) from the dancefloor. */
export function population(map: ForestMap, remoteness: number, roll = 0.5): AreaPopulation {
  const t = map.tuning, r = clamp(remoteness, 0, 1);
  const total = Math.round(lerp(t.creaturesNear, t.creaturesFar, Math.pow(r, t.creatureCurve)) + (roll - 0.5) * 2);
  const legends = Math.min(Math.max(0, total), Math.round(t.legendsFar * smoothstep((r - t.legendsFrom) / Math.max(0.01, 1 - t.legendsFrom)) + (roll - 0.5) * 0.8));
  const young = Math.round(Math.max(0, total - legends) * t.youngShareFar * r);
  return { babies: Math.max(0, total - legends - young), young, legends };
}

/** How far a creature strays from its area's centre: the clearing, wider in crowded far areas. */
export const wanderRange = (map: ForestMap, level: number, remoteness = 0) =>
  (map.tuning.clearingSize + map.tuning.clearingFalloff * 0.3) * map.areaSize * 0.5 * (level === 2 ? 0.55 : 0.8) * (1 + remoteness);

export function spawnCreatures(map: ForestMap): Creature[] {
  const out: Creature[] = [], t = map.tuning;
  let id = 0;
  // The home area holds none (Ed, 2026-10-03); one legend lives next door, so there is one to find.
  const [hx, hy] = map.centreCell;
  for (let cy = 0; cy < map.n; cy++) for (let cx = 0; cx < map.n; cx++) {
    if (cx === hx && cy === hy) continue;
    const r = rng(map.seed * 7919 + cx * 131 + cy * 977 + 3), type = AREA_TYPES[map.typeOf(cx, cy)], home = map.siteOf(cx, cy);
    const far = map.remoteness(cx, cy), pop = population(map, far, hash2(cx, cy, map.seed + 43));
    const make = (level: 0 | 1 | 2): Creature => {
      const range = wanderRange(map, level, far), a = r() * Math.PI * 2, d = Math.sqrt(r()) * range;
      const x = home.x + Math.cos(a) * d, z = home.z + Math.sin(a) * d;
      return {
        id: id++, species: type.creature, cell: [cx, cy], level, homeX: home.x, homeZ: home.z, range, x, z, tx: x, tz: z,
        rest: r() * 3, speed: (level === 2 ? t.legendSpeed : t.creatureSpeed) * (0.7 + r() * 0.6),
        facing: r() < 0.5 ? 1 : -1, moving: false, walk: r(), rand: rng(map.seed * 31 + id * 7 + 11),
      };
    };
    for (let i = 0; i < pop.babies; i++) out.push(make(0));
    for (let i = 0; i < pop.young; i++) out.push(make(1));
    const legends = cx === hx + 1 && cy === hy ? Math.max(1, pop.legends) : pop.legends;
    for (let i = 0; i < legends; i++) out.push(make(2));
  }
  return out;
}

/** Wander: walk to a random spot round home, rest a while, pick another. */
export function stepCreature(c: Creature, dt: number): void {
  if (c.rest > 0) { c.rest -= dt; c.moving = false; return; }
  const dx = c.tx - c.x, dz = c.tz - c.z, d = Math.hypot(dx, dz);
  if (d < 0.05) {
    const a = c.rand() * Math.PI * 2, r = Math.sqrt(c.rand()) * c.range;
    c.tx = c.homeX + Math.cos(a) * r; c.tz = c.homeZ + Math.sin(a) * r;
    c.rest = 0.8 + c.rand() * 3.5; c.moving = false;
    return;
  }
  const step = Math.min(d, c.speed * dt);
  c.x += (dx / d) * step; c.z += (dz / d) * step;
  if (Math.abs(dx) > 0.02) c.facing = dx > 0 ? 1 : -1;
  c.moving = true;
  c.walk += dt * (c.level === 2 ? 1.5 : 4);
}

/** Step only the creatures within `radius` metres of (x, z): the rest wait, unseen. */
export function stepCreaturesNear(all: Creature[], x: number, z: number, radius: number, dt: number): void {
  for (const c of all) if (Math.abs(c.homeX - x) < radius && Math.abs(c.homeZ - z) < radius) stepCreature(c, dt);
}
