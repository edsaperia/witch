// A 💌 wakes the area (Ed, 2026-10-08: "an invitation hitting a wild creature wakes the area"): a letter landing on one of a
// wild area's creatures (its "hit" event, rules/invites.ts) ends that area's watch at once (rules/wildWatch.ts), or starts it
// already over, and its own hostiles, the young and adults, awake or napping, are up at once: no watch, no getting up from a
// nap. They then go for her by the hunt's rules (rules/hunt.ts: while she's on the ground in their area; leaving it, they lose
// interest as before). Its babies, its legend and its circle's baby keep to their own rules. Home, the partified areas and
// friendly areas are left be. Tuning: wildWatch.inviteWakes. No drawing here.
import type { Game } from "./game";
import type { InviteEvent } from "./invites";
import type { Tuning } from "./tuning";
import { cellKey } from "./party";
import { LEGEND } from "./creatures";
import { holdsArea } from "./clear";
import { creatureValue } from "./power";

/** Wakes the areas this step's 💌 hits landed in; returns their keys. */
export function wakeOnInvites(g: Game, events: readonly InviteEvent[], t: Tuning): string[] {
  const W = t.wildWatch;
  if (W?.inviteWakes === false) return [];
  const time = g.clock.time, home = cellKey(g.map.centreCell), out: string[] = [];
  for (const e of events) {
    if (e.kind !== "hit") continue;
    const hit = g.creatures[e.id];
    if (!hit || hit.leashed || hit.enraged || hit.state === "happy") continue;
    const key = cellKey(hit.cell);
    if (out.includes(key) || key === home || g.party.areas.has(key) || g.friendly.has(key)) continue;
    const prev = g.wildEntry.get(key);
    if (prev && time >= prev.until) continue; // (already awake)
    let F = 0;
    for (const c of g.byArea?.get(key) ?? g.creatures) {
      if (cellKey(c.cell) !== key || !holdsArea(c) || c.level === 0 || c.level === LEGEND || c.enraged || c.siege) continue;
      c.watchUntil = undefined;
      if (c.napUntil !== undefined || c.wakeUntil !== undefined) { c.asleep = false; c.napUntil = undefined; c.wakeUntil = undefined; c.rest = 0; } // (up at once; the party's over's sleep has no napUntil, and isn't touched)
      F += creatureValue(c);
    }
    // Its watch over: the hunt takes it from here (rules/hunt.ts), at once while she's on the ground in it.
    g.wildEntry.set(key, { at: time, until: time, last: time, danger: prev?.danger ?? Math.min(1, F / Math.max(1, W?.dangerF ?? 90)) });
    out.push(key);
  }
  return out;
}
