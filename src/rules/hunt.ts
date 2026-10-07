// The hunt (Ed, 2026-10-07): "When I go to a wild area, after they are awoken all of the wild creatures from that area should
// fight with me until either I die or they are invited. When they are all invited, the runestone transforms into a
// soundsystem. The legend and the circle baby are the exceptions"; and "they should lose interest and go home if you leave
// their area, as they did before". Once a wild area's watch is over with her still on the ground in it (rules/wildWatch.ts;
// at once with the watch off), every one of its own awake young and adults hunts her (c.hunting): wherever it is in the area,
// it goes for her, never giving up or napping while she's in the area; with her over the treetops there it holds (it can't
// reach her) and comes on again as soon as she lands. Babies don't fight (they never attack), the legend and its circle's
// baby keep to their own rules. A hunt ends for one creature when it's invited (happy or leashed), enraged by a wave,
// knocked down and run off, or gone; for all of an area's hunters when she leaves the area (on the ground or over the
// treetops): they're ordinary wild creatures again, giving up combat.leaveArea metres past their edge and walking home, as
// before; and for all of a witch's hunters when she's knocked out: they give up, walk back into their own area and roam
// (and may nap) as before, and the area is forgotten, so her next visit starts with its watch again. Back in an area she
// left, it hunts her again at once while it's remembered (wildWatch.forget seconds after she was last on the ground in it),
// else its watch plays again. Hunters are stepped by combat wherever they are (its busy set). No drawing here.
import type { Game } from "./game";
import type { Tuning } from "./tuning";
import { LEGEND, type Creature } from "./creatures";
import { cellKey } from "./party";
import { clearableAt, holdsArea } from "./clear";

/** Whether c may hunt: one of its area's own wild young or adults, awake (not its legend, not its circle's baby). */
export const hunter = (c: Creature): boolean => holdsArea(c) && c.level > 0 && c.level !== LEGEND && !c.enraged && !c.siege && !c.dazed && !c.asleep && !c.friendly;

/** Each step, before the fights: start the hunt of the wild area a witch stands in once its watch is over, end the hunts
 *  that are over, and put every hunter in combat's busy set (stepped wherever it is). */
export function stepHunts(g: Game, t: Tuning): void {
  const time = g.clock.time, hunts = (g.hunts ??= new Set<number>()), W = t.wildWatch;
  if (t.hunt?.on === false) { for (const id of hunts) g.creatures[id].hunting = undefined; hunts.clear(); return; } // (off: the old rule)
  // A witch knocked out: her hunters give up and go home, and the areas they came from are forgotten.
  const at = hunts.size ? g.witches.map(w => g.map.cellSafe(w.body.x, w.body.z).cell) : [];
  for (const id of hunts) {
    const c = g.creatures[id], v = c.hunting === undefined ? undefined : g.witches[c.hunting];
    if (c.hunting !== undefined && v?.ko) {
      g.wildEntry.delete(cellKey(c.cell));
      c.hunting = undefined; c.retreat = true; c.retreatFrom = undefined; if (c.fight) c.fight.target = null;
      hunts.delete(id);
    } else if (c.hunting === undefined || !hunter(c) || c.fleeUntil !== undefined || c.gone || (v && (at[c.hunting][0] !== c.cell[0] || at[c.hunting][1] !== c.cell[1]))) {
      c.hunting = undefined; hunts.delete(id); // (she's left its area: it loses interest, as before)
    }
  }
  // A witch on the ground in a wild area whose watch is over: its own awake young and adults hunt her.
  for (let i = 0; i < g.witches.length; i++) {
    const w = g.witches[i];
    if (w.body.mode !== "ground" || w.body.seated || w.ko) continue;
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
