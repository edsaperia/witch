// The wild watch (Ed, 2026-10-07): when a witch comes down in a dormant (wild) area, its animals stir and turn to look at
// her, hanging back, before they attack. Every creature does it the same way (no special art): it stands, faces her, and
// holds off for wildWatch.time seconds. One pass over the area on her coming down stamps each one (c.watchUntil), so the
// hot loops (acquire, the roaming step) test a number, never the area.
// Slower, with a warning (Ed, 2026-10-07: "make the dormant-to-attacking choreography slower, with a visible sign of aggro
// (e.g. red tint) rising that lets a player who wanders into a dangerous area understand what's happening and have time to
// run away"): the watch is long enough to leave in (wildWatch.time), and leaving (or rising) before it's up calls it off:
// they settle back down and don't chase, and the next visit starts it over. Its rising aggro (aggroOf, for the view's red
// and the music's sting) is the area's, scaled by its danger: what its watchers are worth in a fight (wildWatch.dangerF).
// The chase (Ed, 2026-10-13: "Animals should chase outside, and relatively far ... stop people just sitting near the edge of a
// territory and sniping/kiting. However if you leave the area before the warning ends then they don't attack"): walked out of in
// time, none comes after her (rules/combat/targeting.ts acquire); once they've attacked they follow her out to combat.leaveArea
// past their edge; and a 💌 of hers provokes a wild one for wildWatch.provoked seconds, so it comes out after her across its edge.
import { cellKey } from "./party";
import { areaCellAt } from "./map";
import { LEGEND, type Creature } from "./creatures";
import type { Game } from "./game";
import type { Tuning } from "./tuning";
import { creatureValue } from "./power";
import { stealthed } from "./spells";

/** An area's watch: when it started and ends (her first attack), when a witch was last on the ground in it, and its danger (0 to 1). */
export interface WildEntry { at: number; until: number; last: number; danger: number }

/** Who watches: the area's wild young and adults, not legends, the enraged or besiegers (babies have their own notice). */
export const watcher = (c: Creature): boolean => !c.leashed && !c.gone && !c.boss && c.level > 0 && c.level !== LEGEND && !c.enraged && !c.siege && c.state !== "happy" && !c.fight?.target;

/** Each step: a witch on the ground in a wild area not entered lately starts its watch; one left (no witch on the ground in it)
 *  before its watch is up calls it off; an area no witch has been on the ground in for wildWatch.forget seconds is forgotten. */
export function stepWildWatch(g: Game, t: Tuning): void {
  const W = t.wildWatch, time = g.clock.time;
  if (!W?.on) { if (g.wildEntry.size) g.wildEntry.clear(); return; }
  const home = cellKey(g.map.centreCell);
  let here: string | null = null, here2: string | null = null; // (the areas a witch is on the ground in this step: one or two players)
  for (const w of g.witches) {
    if (w.body.mode !== "ground" || w.body.seated || w.body.perch || w.ko) continue; // (up on the treehouse deck: not in any area)
    if (stealthed(w.spells, g.herTime)) continue; // (her Stealth broom: unseen, nothing notices her; rules/brooms.ts)
    const k = cellKey(areaCellAt(g.map, w.body.x, w.body.z)), e = g.wildEntry.get(k);
    if (here === null) here = k; else here2 = k;
    if (e) { e.last = time; continue; }
    if (k === home || g.party.areas.has(k) || g.friendly.has(k)) continue;
    let F = 0;
    for (const c of g.creatures) if (cellKey(c.cell) === k && watcher(c)) { c.watchUntil = time + W.time; F += creatureValue(c); }
    g.wildEntry.set(k, { at: time, until: time + W.time, last: time, danger: Math.min(1, F / Math.max(1, W.dangerF ?? 90)) });
  }
  for (const [k, e] of g.wildEntry) {
    // Left before they've made up their minds: they settle back down (Ed: "have time to run away").
    if (time < e.until && k !== here && k !== here2) {
      for (const c of g.creatures) if (c.watchUntil !== undefined && c.watchUntil > time && cellKey(c.cell) === k) c.watchUntil = undefined;
      g.wildEntry.delete(k);
    } else if (time - e.last > W.forget) g.wildEntry.delete(k);
  }
}

/** The aggro rising in the wild area a witch is on the ground in (the first, by default), while its watch runs: how far
 *  through (0 they've noticed her, 1 they attack) and the area's danger (0 to 1); null when no watch is running there. */
export function aggroOf(g: Game, i = 0): { k: number; danger: number } | null {
  const w = g.witches[i];
  if (!w || w.body.mode !== "ground" || w.ko || !g.wildEntry.size) return null;
  const e = g.wildEntry.get(cellKey(areaCellAt(g.map, w.body.x, w.body.z))), time = g.clock.time;
  return e && time < e.until ? { k: Math.max(0, (time - e.at) / Math.max(1e-6, e.until - e.at)), danger: e.danger } : null;
}

/** A step of watching her from (its x, z): still, turned to her; backing off at its pace if she's within hangBack metres. */
export function watchStep(c: Creature, x: number, z: number, dt: number, hangBack: number): void {
  c.facing = x >= c.x ? 1 : -1; c.away = z < c.z - 1;
  const dx = c.x - x, dz = c.z - z, d = Math.hypot(dx, dz);
  if (d > 0.01 && d < hangBack) { const s = c.speed * dt / d; c.x += dx * s; c.z += dz * s; c.moving = true; }
  else c.moving = false;
}
