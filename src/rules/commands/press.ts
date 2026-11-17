// The command button (?commands=1; docs/plans/combat-skill-and-commands.md, section 3). Ed, 2026-11-17: "maybe the latter is actually
// 'command', and each creature has a specific action that you can use tactically during fights"; who acts: "The bottom of the stack";
// "For the controller, we can have square as command, and circle as pickup/place. When you're near a berry, square becomes eat";
// "different creatures have different cooldowns depending on the ability (some are machine guns, some are powerful spells), cycling
// between animals and using abilities during fights is the skill"; no gap between commands ("zero gap gives a higher skill ceiling").
// A press, on foot on the ground: a berry the bottom creature can eat in reach, it eats (the sigil button's feeding, passed in);
// else the bottom creature acts if it's ready and has a charge (rules/commands/charges.ts). Actions on her (a Guard's shield, a
// Surge's buff) happen here; actions on creatures are queued on the creature and carried out in the fight's step (act.ts), where the
// blows land as her party's do. Up in the treetops it does nothing (her followers travel quietly then). Pure: no drawing.
import type { Game, Witch } from "../game";
import type { Tuning } from "../tuning";
import type { Creature } from "../creatures";
import { stackBottom } from "../leash";
import { foes } from "../creatureStates";
import { sideOf, targetable } from "../combat/targeting";
import { LEGEND } from "../creatureLevels";
import { commandNow, commandsOn, spendCharge } from "./charges";
import type { Command } from "../skill/profile";
import type { CommandState } from "./state";

/** What the sigil button lends the command button: whether a press would feed the bottom creature now, and the feeding itself. */
export interface FeedHooks { offer(): boolean; feed(): void }

/** Verbs that need a creature to act on. */
const TARGETED = (K: Command) => K.verb === "strike" || K.verb === "daze" || (K.verb === "snare" && K.shape !== "patch");

/** One step of her commands: her last letter's target noted, a shield or buff run out, and a press of the button. */
export function stepCommands(g: Game, c: { command?: boolean; aimX?: number; aimZ?: number }, W: Witch, t: Tuning, feed: FeedHooks): void {
  if (!commandsOn(t)) return;
  const time = g.clock.time;
  for (const e of W.invites.events) if (e.kind === "hit") (W.leash.cmd ??= { ready: {} }).lastHit = { id: e.id, at: time };
  const S = W.leash.cmd;
  if (S?.shield && (time >= S.shield.until || S.shield.blows <= 0)) delete S.shield;
  if (S?.buffs) { S.buffs = S.buffs.filter(b => time < b.until); if (!S.buffs.length) delete S.buffs; }
  if (!c.command || W.ko) return;
  const b = W.body;
  if (b.mode !== "ground" || b.seated || b.perch) return;
  if (feed.offer()) { feed.feed(); return; } // (Ed: "When you're near a berry, square becomes eat")
  const bt = stackBottom(W.leash), cr = bt ? g.creatures[bt.id] : undefined, K = commandNow(cr, t);
  const fizzle = () => W.leash.events.push({ kind: "fizzled", id: cr?.id ?? W.id, x: b.x, z: b.z, at: time });
  if (!cr || !K || cr.gone) { fizzle(); return; }
  const St = (W.leash.cmd ??= { ready: {} });
  if ((St.ready[cr.id] ?? -Infinity) > time) { fizzle(); return; } // (cooling down: its next pip blinks, render/leash/charges.ts)
  const target = TARGETED(K) ? chooseTarget(g, W, cr, K, c.aimX ?? 0, c.aimZ ?? 0, St, time) : null;
  if (TARGETED(K) && !target) { fizzle(); return; }
  if (!spendCharge(g.berries, cr, t)) { fizzle(); return; }
  St.ready[cr.id] = time + K.cooldown * (cr.level >= LEGEND ? K.legendCooldown : 1);
  if (K.verb === "surge" && K.buff) (St.buffs ??= []).push({ group: K.buff, stacks: K.buffStacks ?? 1, until: time + (K.buffTime ?? 4) });
  else if (K.verb === "guard" && K.shield) St.shield = { blows: K.shield, until: time + (K.shieldTime ?? 6), by: cr.id };
  else cr.command = { target: target?.id ?? null, ax: c.aimX ?? 0, az: c.aimZ ?? 0, at: time, hx: b.x, hz: b.z };
  W.leash.events.push({ kind: "commanded", id: cr.id, x: target?.x ?? cr.x, z: target?.z ?? cr.z, at: time });
}

/** What an attack or control command acts on (docs/plans/combat-skill-and-commands.md, Targeting): the foe nearest her aim line within
 *  its cone and reach; else the one her last letter landed on, within its lastHit seconds; else the nearest foe going for her, else the
 *  nearest. (Single-stick aiming, when it lands, aims where she moves: the same order.) */
export function chooseTarget(g: Game, W: Witch, cr: Creature, K: Command, ax: number, az: number, S: CommandState | undefined, time: number): Creature | null {
  const x = W.body.x, z = W.body.z, side = sideOf(cr);
  const ok = (o: Creature | undefined): o is Creature => !!o && !o.gone && !o.leashed && o.level >= 1 && targetable(o) && foes(sideOf(o), side) && Math.hypot(o.x - x, o.z - z) <= K.reach;
  const near = g.creatures.filter(ok);
  if (!near.length) return null;
  const al = Math.hypot(ax, az);
  if (al > 0.01) {
    const cone = Math.cos((K.cone * Math.PI) / 180);
    let best: Creature | null = null, bc = -2;
    for (const o of near) { const dx = o.x - x, dz = o.z - z, d = Math.hypot(dx, dz) || 1, cos = (dx * ax + dz * az) / (d * al); if (cos >= cone && cos > bc) { bc = cos; best = o; } }
    if (best) return best;
  }
  const L = S?.lastHit;
  if (L && time - L.at <= K.lastHit && ok(g.creatures[L.id])) return g.creatures[L.id];
  const dist = (o: Creature) => Math.hypot(o.x - x, o.z - z);
  const onHer = near.filter(o => o.fight?.target?.kind === "witch" && o.fight.target.id === W.id);
  return (onHer.length ? onHer : near).reduce((a, o) => (dist(o) < dist(a) ? o : a));
}
