// A Guard's shield on her (?commands=1; rules/commands/press.ts): while it lasts, it stops whole blows, one each, giving her the
// usual moment's grace after (witchHealth.grace); a kind with quills (the hedgehog's Bristle) shoots them round her as it stops one
// (rules/commands/act.ts). Called first thing in hitWitch (rules/game.ts). Pure.
import type { Game, Witch } from "../game";
import { commandOf } from "../skill/profile";

/** Whether her shield takes this blow (`at` on her clock, the world's now `time`). */
export function shieldTakes(g: Pick<Game, "creatures">, w: Witch, at: number, time: number): boolean {
  const S = w.leash.cmd?.shield;
  if (!S || time >= S.until || S.blows <= 0) return false;
  S.blows -= 1;
  w.health.hurtAt = at;
  const c = g.creatures[S.by];
  if (c && !c.gone && commandOf(c.species, c.level)?.quills) c.command = { target: null, ax: 0, az: 0, at: time, hx: w.body.x, hz: w.body.z, quills: true };
  w.leash.events.push({ kind: "commanded", id: S.by, x: w.body.x, z: w.body.z, at: time });
  return true;
}
