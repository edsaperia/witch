// The witch's health and knockout (Ed, 2026-10-04). She takes knockout hits (one point each,
// whatever hits her); one comes back every repairTime seconds, the timer starting over at every
// hit. At none she's knocked out: she collapses where she is (no more hits, no input), her sigil
// stack lets go from the bottom up, one every releaseEach seconds, each creature turning neutral
// as its sigil goes and walking to the nearest area of its own kind (else the nearest dormant
// one), where it turns wild again, keeping its level; then she sparkles out and back in at the
// treehouse. Creatures at sigils on the ground aren't on her leash, so they stay hers: park your
// army before you scout. Leashed legends go back to the wild too ("they're too old for this"),
// unless knockout.legendsLoyal. No drawing here.
import { AREA_TYPES, type ForestMap } from "./map";
import { anchorOf, LEGEND, wanderRange, type Creature } from "./creatures";
import type { LeashState } from "./leash";
import type { Tuning } from "./tuning";
import type { WitchState } from "./witch";

export interface Health {
  hp: number;
  /** Game time of the next point back (Infinity while whole). */
  repairAt: number;
  /** Game time she was last hit. */
  hurtAt: number;
}

export interface Knockout {
  /** Game time she went down. */
  at: number;
  /** The creatures to let go, bottom of the stack first, and when each goes. */
  order: number[];
  times: number[];
  released: number;
  /** Game time the teleport starts (after the last sigil), and ends. */
  teleportAt: number;
  backAt: number;
  /** She's sparkled out, and been moved to the treehouse (halfway through the teleport). */
  out: boolean;
  moved: boolean;
}

export type KnockoutEventKind = "down" | "released" | "sparkleOut" | "sparkleIn" | "back";
export interface KnockoutEvent { kind: KnockoutEventKind; at: number; x: number; z: number; id?: number }

export const newHealth = (t: Tuning): Health => ({ hp: t.witchHealth.hits, repairAt: Infinity, hurtAt: -Infinity });

/** A hit: one point, and the repair timer starts over. Returns whether it knocked her out. */
export function hurt(h: Health, time: number, t: Tuning): boolean {
  if (h.hp <= 0) return false;
  h.hp -= 1; h.hurtAt = time; h.repairAt = time + t.witchHealth.repairTime;
  return h.hp <= 0;
}

/** A point back every repairTime seconds out of the fight. */
export function repair(h: Health, time: number, t: Tuning): void {
  if (h.hp <= 0 || h.hp >= t.witchHealth.hits) { if (h.hp >= t.witchHealth.hits) h.repairAt = Infinity; return; }
  if (time >= h.repairAt) { h.hp += 1; h.repairAt = h.hp >= t.witchHealth.hits ? Infinity : time + t.witchHealth.repairTime; }
}

/** She goes down: plan the release of her stack, bottom first (legends kept if they're loyal). */
export function knockOut(leash: LeashState, creatures: Creature[], time: number, t: Tuning): Knockout {
  const K = t.knockout, order = [...leash.stack].reverse().filter(id => !(K.legendsLoyal && creatures[id].level === LEGEND));
  const each = K.releaseMax > 0 && order.length * K.releaseEach > K.releaseMax ? K.releaseMax / order.length : K.releaseEach;
  const times = order.map((_, i) => time + (i + 1) * each);
  const teleportAt = order.length ? times[times.length - 1] + each * 0.5 : time + K.emptyBeat;
  return { at: time, order, times, released: 0, teleportAt, backAt: teleportAt + K.teleport, out: false, moved: false };
}

/** Where a creature let go walks to: the nearest area whose wild kind is its own, else the nearest
 *  area the party hasn't reached. */
type Spot = { x: number; z: number; cell: [number, number] };
export function kindHome(map: ForestMap, species: string, x: number, z: number, partified: (key: string) => boolean): Spot | null {
  let best: Spot | null = null, fallback: Spot | null = null, bd = Infinity, fd = Infinity;
  for (let cy = 0; cy < map.n; cy++) for (let cx = 0; cx < map.n; cx++) {
    const s = map.siteOf(cx, cy), d = Math.hypot(s.x - x, s.z - z), here: Spot = { x: s.x, z: s.z, cell: [cx, cy] };
    if (AREA_TYPES[map.typeOf(cx, cy)].creature === species && d < bd) { bd = d; best = here; }
    if (!partified(`${cx},${cy}`) && d < fd) { fd = d; fallback = here; }
  }
  return best ?? fallback;
}

/** Let one creature go: off the leash, neutral, heading for its kind's home. */
export function letGo(c: Creature, leash: LeashState, map: ForestMap, partified: (key: string) => boolean): void {
  leash.stack = leash.stack.filter(id => id !== c.id);
  c.leashed = false; c.fight = undefined; c.siege = undefined; c.rest = 0;
  c.wanderTo = kindHome(map, c.species, c.x, c.z, partified) ?? undefined;
}

/** One step of a knockout: sigils let go on time, then the teleport. Returns true once she's back. */
export function stepKnockout(k: Knockout, body: WitchState, leash: LeashState, creatures: Creature[], map: ForestMap, time: number, partified: (key: string) => boolean, events: KnockoutEvent[]): { body: WitchState; done: boolean } {
  while (k.released < k.order.length && time >= k.times[k.released]) {
    const c = creatures[k.order[k.released++]];
    if (c && c.leashed && leash.stack.includes(c.id)) { letGo(c, leash, map, partified); events.push({ kind: "released", at: time, x: c.x, z: c.z, id: c.id }); }
  }
  if (time >= k.teleportAt && !k.out) { k.out = true; events.push({ kind: "sparkleOut", at: time, x: body.x, z: body.z }); }
  const mid = (k.teleportAt + k.backAt) / 2;
  if (!k.moved && time >= mid) {
    k.moved = true;
    body = { ...body, x: map.start.x, z: map.start.z, vx: 0, vz: 0, mode: "ground", lift: 0, boost: 0, seated: false };
    events.push({ kind: "sparkleIn", at: time, x: body.x, z: body.z });
    // Loyal legends come home with her.
    for (const id of leash.stack) { const c = creatures[id]; c.x = body.x + (c.rand() - 0.5) * 3; c.z = body.z + 2 + c.rand() * 2; c.tx = c.x; c.tz = c.z; }
  }
  if (time >= k.backAt) { events.push({ kind: "back", at: time, x: body.x, z: body.z }); return { body, done: true }; }
  return { body: { ...body, vx: 0, vz: 0 }, done: false };
}

/** Creatures let go walk home at their own pace; there they become ordinary wild creatures of that
 *  area, keeping their level (a legend: a home-made boss). Returns whether any settled. */
export function stepWanderers(creatures: Creature[], map: ForestMap, dt: number): boolean {
  let settled = false;
  for (const c of creatures) {
    const to = c.wanderTo;
    if (!to || c.gone || c.leashed) continue;
    const dx = to.x - c.x, dz = to.z - c.z, d = Math.hypot(dx, dz);
    if (d < 3) {
      const range = wanderRange(map), [ax, az] = anchorOf(map, to.cell, to.x, to.z, range);
      Object.assign(c, { cell: to.cell, homeX: to.x, homeZ: to.z, range, anchorX: ax, anchorZ: az, tx: c.x, tz: c.z, rest: 1, safeR: undefined });
      if (c.level === LEGEND) c.boss = true;
      c.wanderTo = undefined; settled = true;
      continue;
    }
    const step = Math.min(d, c.speed * dt);
    c.x += (dx / d) * step; c.z += (dz / d) * step;
    if (Math.abs(dx) > 0.02) c.facing = dx > 0 ? 1 : -1;
    c.away = dz < -Math.abs(dx);
    c.moving = true; c.walk += dt * 4;
  }
  return settled;
}
