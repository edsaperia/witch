// Creatures in the clearings: babies and young of each area's kind, wandering slowly round
// their area's centre, and here and there a legend, taller than the trees.
import { rng, hash2 } from "./random";
import { AREA_TYPES, type ForestMap } from "./map";

export interface Creature {
  id: number;
  species: string;
  /** The area it belongs to. */
  cell: [number, number];
  /** 0 baby, 1 young, 2 legend. */
  level: 0 | 1 | 2;
  /** The clearing it wanders round. */
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

/** How far a creature strays from its area's centre: most of the clearing. */
export const wanderRange = (map: ForestMap, level: number) => map.tuning.clearingSize * 0.75 * map.areaSize * 0.5 * (level === 2 ? 0.55 : 0.8);

export function spawnCreatures(map: ForestMap): Creature[] {
  const out: Creature[] = [], t = map.tuning;
  let id = 0;
  // One legend always lives next door to the dancefloor, so there is one to find at once.
  const [mx, my] = map.centreCell, legendNextDoor = `${mx + 1},${my}`;
  for (let cy = 0; cy < map.n; cy++) for (let cx = 0; cx < map.n; cx++) {
    const r = rng(map.seed * 7919 + cx * 131 + cy * 977 + 3), type = AREA_TYPES[map.typeOf(cx, cy)], home = map.siteOf(cx, cy);
    const make = (level: 0 | 1 | 2): Creature => {
      const range = wanderRange(map, level), a = r() * Math.PI * 2, d = Math.sqrt(r()) * range;
      const x = home.x + Math.cos(a) * d, z = home.z + Math.sin(a) * d;
      return {
        id: id++, species: type.creature, cell: [cx, cy], level, homeX: home.x, homeZ: home.z, range, x, z, tx: x, tz: z,
        rest: r() * 3, speed: (level === 2 ? t.legendSpeed : t.creatureSpeed) * (0.7 + r() * 0.6),
        facing: r() < 0.5 ? 1 : -1, moving: false, walk: r(), rand: rng(map.seed * 31 + id * 7 + 11),
      };
    };
    const count = Math.max(0, t.creaturesPerClearing + Math.floor(r() * 3) - 1);
    for (let i = 0; i < count; i++) out.push(make(r() < 0.6 ? 0 : 1));
    if (`${cx},${cy}` === legendNextDoor || hash2(cx, cy, map.seed + 41) < t.legendChance) out.push(make(2));
  }
  return out;
}

/** Wander: walk to a random spot in the clearing, rest a while, pick another. */
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
