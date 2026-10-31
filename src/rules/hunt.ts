// The hunt (Ed, 2026-10-07; clarified 2026-10-31): after the watch, awake wild youths and adults hunt her.
// On the ground they pursue beyond their area; airborne over it they hold and resume on landing. Airborne outside it,
// every hunter gives up and walks home, and the area watch plays on her next visit. Invite, enrage, knock-down/run-off,
// gone, knockout and Stealth endings remain. Babies and legends never hunt. No drawing here.
import type { Game } from "./game";
import { areaCellAt } from "./map";
import type { Tuning } from "./tuning";
import { LEGEND, type Creature } from "./creatures";
import { cellKey } from "./party";
import { clearableAt, holdsArea } from "./clear";
import { stealthed } from "./spells";

/** Whether c may hunt: one of its area's own wild young or adults, awake (not its legend, not its circle's baby). */
export const hunter = (c: Creature): boolean => holdsArea(c) && c.level > 0 && c.level !== LEGEND && !c.enraged && !c.siege && !c.dazed && !c.asleep && !c.friendly;

/** Each step, before the fights: start the hunt of the wild area a witch stands in once its watch is over, end the hunts
 *  that are over, and put every hunter in combat's busy set (stepped wherever it is). */
export function stepHunts(g: Game, t: Tuning): void {
  const time = g.clock.time, hunts = (g.hunts ??= new Set<number>()), W = t.wildWatch;
  if (t.hunt?.on === false) { for (const id of hunts) g.creatures[id].hunting = undefined; hunts.clear(); return; } // (off: the old rule)
  // A witch knocked out: her hunters give up and go home, and the areas they came from are forgotten.
  const at = hunts.size ? g.witches.map(w => areaCellAt(g.map, w.body.x, w.body.z)) : [];
  for (const id of hunts) {
    const c = g.creatures[id], v = c.hunting === undefined ? undefined : g.witches[c.hunting];
    if (c.hunting !== undefined && v?.ko) {
      g.wildEntry.delete(cellKey(c.cell));
      c.hunting = undefined; c.retreat = true; c.retreatFrom = undefined; if (c.fight) c.fight.target = null;
      hunts.delete(id);
    } else if (c.hunting === undefined || !hunter(c) || c.fleeUntil !== undefined || c.gone || (v && v.body.mode !== "ground" && (at[c.hunting][0] !== c.cell[0] || at[c.hunting][1] !== c.cell[1])) || (v && stealthed(v.spells, v.time ?? g.herTime) && Math.hypot(v.body.x - c.x, v.body.z - c.z) > (t.spells.stealth?.range ?? 25))) { // (hidden by Stealth and out of its range: it's lost her)
      if (v && v.body.mode !== "ground" && (at[c.hunting!][0] !== c.cell[0] || at[c.hunting!][1] !== c.cell[1])) {
        g.wildEntry.delete(cellKey(c.cell)); c.retreat = true; c.retreatFrom = undefined;
        if (c.fight) c.fight.target = null;
      }
      c.hunting = undefined; hunts.delete(id); // (she's left its area: it loses interest, as before)
    }
  }
  // A witch on the ground in a wild area whose watch is over: its own awake young and adults hunt her.
  for (let i = 0; i < g.witches.length; i++) {
    const w = g.witches[i];
    if (w.body.mode !== "ground" || w.body.seated || w.body.perch || w.ko) continue; // (up on the treehouse deck: out of reach)
    if (stealthed(w.spells, w.time ?? g.herTime)) continue; // (her Stealth broom: unseen, no hunt starts; rules/brooms.ts)
    const cell = clearableAt(g.party, g.map, w.body.x, w.body.z);
    if (!cell) continue;
    const key = `${cell[0]},${cell[1]}`;
    if (g.friendly.has(key)) continue;
    if (W?.on) { const e = g.wildEntry.get(key); if (!e || time < e.until) continue; }
    for (const c of (g.byArea?.get(key) ?? g.creatures)) {
      if (c.hunting !== undefined || c.cell[0] !== cell[0] || c.cell[1] !== cell[1] || !hunter(c)) continue;
      c.hunting = i; c.retreat = undefined; c.retreatFrom = undefined; c.watchUntil = undefined;
      hunts.add(c.id);
    }
  }
  for (const id of hunts) g.combat.busy.add(id);
}
