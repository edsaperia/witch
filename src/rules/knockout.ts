// The witch's health and knockout (Ed, 2026-10-04). She takes knockout hits (one point each,
// whatever hits her); one comes back every repairTime seconds, the timer starting over at every
// hit. At none she's knocked out: she collapses where she is (no more hits, no input), her sigil
// stack comes down from the bottom up, one every releaseEach seconds, each sigil put down where
// its animal stands (#87, Ed 2026-10-05: leashed is for good, so they stay hers as a parked
// group). One timeline (Ed, 2026-10-07), the whole wait counted from her going down (knockout.respawn: short, longer for
// knockdowns close together, back to base after a cooldown): her hat floats to the ground (knockout.hatFloat, the screen
// dimmed, a sad trumpet; if she had one to drop), she sparkles out and back in behind her decks, and scratches there for the
// rest of the wait ("Every time she respawns she could do a bit of scratching to increase the respawn time"), her army
// fighting on without her; then she can move. No drawing here.
import type { ForestMap } from "./map";
import { anchorOf, LEGEND, wanderRange, type Creature } from "./creatures";
import { letPartyLegendGo, type LeashState } from "./leash";
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
  /** Game time her hat has floated to the ground (Ed, 2026-10-07: the screen dimmed, a sad trumpet; knockout.hatFloat), or `at`
   *  if she had no hat to drop. */
  floatUntil: number;
  /** Game time the teleport starts (after the hat's float and the last sigil), and ends (she's in at the treehouse). */
  teleportAt: number;
  inAt: number;
  /** Game time she can move again: after her scratching behind her decks, the whole wait (knockout.respawn: base, a step
   *  more for each knockdown within cooldown of the last, to max) counted from `at`, and at least minScratch of scratching. */
  backAt: number;
  /** Knockdowns in a row, each within knockout.respawn.cooldown of the last (0 the first). */
  streak: number;
  /** She's sparkled out, and been moved to the treehouse, behind her decks (halfway through the teleport). */
  out: boolean;
  moved: boolean;
  /** Her scratching has started (the "scratch" event: the respawn wait, inAt to backAt). */
  scratching?: boolean;
}

export type KnockoutEventKind = "down" | "released" | "sparkleOut" | "sparkleIn" | /** her scratching starts behind her decks (the respawn wait: knockout.respawn); "back" ends it */ "scratch" | "back" | /** her hat fell off where she went down (rules/hat.ts) */ "hatDropped";
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

/** The respawn wait's knobs (knockout.respawn), none: no wait. */
const RESPAWN_NONE = { base: 0, step: 0, max: 0, cooldown: 0, minScratch: 0 };

/** Knockdowns in a row at `time`: one more than the last if it was within the cooldown, else 0. */
export const nextStreak = (last: { n: number; at: number } | null | undefined, time: number, t: Tuning): number =>
  last && time - last.at < (t.knockout.respawn ?? RESPAWN_NONE).cooldown ? last.n + 1 : 0;

/** The whole wait (s) from going down to moving again, for a knockdown with `streak` before it (Ed, 2026-10-07: "any more than
 *  about six seconds to wait will be frustrating. We could alternatively make each successive death a bit longer, with a
 *  cooldown, to punish rapid dying"). */
export function respawnWait(streak: number, t: Tuning): number {
  const R = t.knockout.respawn ?? RESPAWN_NONE;
  return Math.min(Math.max(R.base, R.max), R.base + R.step * streak);
}

/** She goes down: her hat floats down if it dropped (hatFloats), then her stack is let go, bottom first (legends kept if
 *  they're loyal), then the teleport home and her scratching behind her decks for the rest of the wait. */
export function knockOut(leash: LeashState, creatures: Creature[], time: number, t: Tuning, o: { hatFloats?: boolean; streak?: number } = {}): Knockout {
  const K = t.knockout, R = K.respawn ?? RESPAWN_NONE, streak = o.streak ?? 0, order = [...leash.stack].reverse().filter(id => !(K.legendsLoyal && creatures[id].level === LEGEND && !creatures[id].partyLegend)); // (a party legend is always let go: it doesn't move)
  const each = K.releaseMax > 0 && order.length * K.releaseEach > K.releaseMax ? K.releaseMax / order.length : K.releaseEach;
  const times = order.map((_, i) => time + (i + 1) * each);
  const floatUntil = time + (o.hatFloats ? K.hatFloat ?? 0 : 0);
  const teleportAt = Math.max(floatUntil, order.length ? times[times.length - 1] + each * 0.5 : time + K.emptyBeat);
  const inAt = teleportAt + K.teleport;
  const backAt = Math.max(inAt + R.minScratch, time + respawnWait(streak, t));
  return { at: time, order, times, released: 0, floatUntil, teleportAt, inAt, backAt, streak, out: false, moved: false };
}

/** Put a carried sigil down where its animal stands (a little aside if another sigil is there): it stays hers, parked. */
export function parkWhere(c: Creature, leash: LeashState, time: number, spacing = 4): void {
  leash.stack = leash.stack.filter(id => id !== c.id);
  let x = c.x, z = c.z;
  for (let k = 0; k < 24 && leash.placed.some(p => Math.hypot(p.x - x, p.z - z) < spacing); k++) { const a = k * 2.4, r = spacing * (1 + k / 8); x = c.x + Math.cos(a) * r; z = c.z + Math.sin(a) * r; }
  leash.placed.push({ id: c.id, x, z, at: time });
}

/** One step of a knockout: sigils put down on time, then the teleport. Returns true once she's back. */
export function stepKnockout(k: Knockout, body: WitchState, leash: LeashState, creatures: Creature[], map: ForestMap, time: number, _partified: (key: string) => boolean, events: KnockoutEvent[]): { body: WitchState; done: boolean } {
  while (k.released < k.order.length && time >= k.times[k.released]) {
    const c = creatures[k.order[k.released++]];
    // (#87: leashed is for good; each carried sigil is put down where its animal stands, so they stay a parked group)
    if (c?.partyLegend && leash.stack.includes(c.id)) { leash.stack = leash.stack.filter(id => id !== c.id); letPartyLegendGo(c); events.push({ kind: "released", at: time, x: c.x, z: c.z, id: c.id }); }
    else if (c && c.leashed && leash.stack.includes(c.id)) { parkWhere(c, leash, time); events.push({ kind: "released", at: time, x: c.x, z: c.z, id: c.id }); }
  }
  if (time >= k.teleportAt && !k.out) { k.out = true; events.push({ kind: "sparkleOut", at: time, x: body.x, z: body.z }); }
  const mid = (k.teleportAt + k.inAt) / 2;
  if (!k.moved && time >= mid) {
    k.moved = true;
    // Back behind her decks in the treehouse, as at the start (Ed, 2026-10-06: "When you die and respawn, you should appear
    // behind the decks in your treehouse, as when the game begins (but not zoomed in)"): seated till she first moves. (The
    // opening close-up doesn't come back: the camera's intro only ever eases out, rules/camera.ts; nor the boot, which runs
    // from the first time she left.)
    body = { ...body, x: map.start.x, z: map.start.z, vx: 0, vz: 0, mode: "ground", lift: 0, boost: 0, seated: true };
    events.push({ kind: "sparkleIn", at: time, x: body.x, z: body.z });
    // Loyal legends come home with her.
    for (const id of leash.stack) { const c = creatures[id]; c.x = body.x + (c.rand() - 0.5) * 3; c.z = body.z + 2 + c.rand() * 2; c.tx = c.x; c.tz = c.z; }
  }
  if (!k.scratching && k.backAt > k.inAt && time >= k.inAt) { k.scratching = true; events.push({ kind: "scratch", at: time, x: body.x, z: body.z }); }
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
      Object.assign(c, { circle: undefined, cell: to.cell, homeX: to.x, homeZ: to.z, range, anchorX: ax, anchorZ: az, tx: c.x, tz: c.z, rest: 1, safeR: undefined });
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

/** Seconds left of her wait behind her decks after a knockout (knockout.respawn), or null when she isn't waiting: for the
 *  countdown at the decks (render/leash/respawn.ts). */
export const respawnLeft = (k: Knockout | null | undefined, time: number): number | null => (k && time >= k.inAt && time < k.backAt ? k.backAt - time : null);
