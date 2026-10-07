// The wild watch (Ed, 2026-10-07): when a witch comes down in a dormant (wild) area, its animals stir and turn to look at
// her, hanging back, before they attack. Every creature does it the same way (no special art): it stands, faces her, and
// holds off for wildWatch.time seconds. One pass over the area on her coming down stamps each one (c.watchUntil), so the
// hot loops (acquire, the roaming step) test a number, never the area.
import { cellKey } from "./party";
import { LEGEND, type Creature } from "./creatures";
import type { Game } from "./game";
import type { Tuning } from "./tuning";

/** Who watches: the area's wild young and adults, not legends, the enraged or besiegers (babies have their own notice). */
export const watcher = (c: Creature): boolean => !c.leashed && !c.gone && !c.boss && c.level > 0 && c.level !== LEGEND && !c.enraged && !c.siege && c.state !== "happy" && !c.fight?.target;

/** Each step: a witch on the ground in a wild area not entered lately starts its watch; an area no witch has been on the
 *  ground in for wildWatch.forget seconds is forgotten. */
export function stepWildWatch(g: Game, t: Tuning): void {
  const W = t.wildWatch, time = g.clock.time;
  if (!W?.on) { if (g.wildEntry.size) g.wildEntry.clear(); return; }
  const home = cellKey(g.map.centreCell);
  for (const w of g.witches) {
    if (w.body.mode !== "ground" || w.body.seated || w.ko) continue;
    const k = cellKey(g.map.cellSafe(w.body.x, w.body.z).cell), e = g.wildEntry.get(k);
    if (e) { e.last = time; continue; }
    if (k === home || g.party.areas.has(k) || g.friendly.has(k)) continue;
    g.wildEntry.set(k, { at: time, last: time });
    for (const c of g.creatures) if (cellKey(c.cell) === k && watcher(c)) c.watchUntil = time + W.time;
  }
  for (const [k, e] of g.wildEntry) if (time - e.last > W.forget) g.wildEntry.delete(k);
}

/** A step of watching her from (its x, z): still, turned to her; backing off at its pace if she's within hangBack metres. */
export function watchStep(c: Creature, x: number, z: number, dt: number, hangBack: number): void {
  c.facing = x >= c.x ? 1 : -1; c.away = z < c.z - 1;
  const dx = c.x - x, dz = c.z - z, d = Math.hypot(dx, dz);
  if (d > 0.01 && d < hangBack) { const s = c.speed * dt / d; c.x += dx * s; c.z += dz * s; c.moving = true; }
  else c.moving = false;
}
