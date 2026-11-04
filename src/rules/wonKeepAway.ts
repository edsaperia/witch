// Won over, out of the fight's way (Ed, 2026-11-04, on #1804: "they should roam the whole area, and avoid creatures that are fighting.
// Do this in a simple way - we just want them out of the way of the fight"; "Newly won creatures can't be grabbed until the spell is
// cast, so they don't need to be near"; the tuning's `invites.wonAway`): a creature she's won over whose sigil waits in its stone's
// stack (happy, c.atStone: not yet cast, nor leashed) roams its area with its own happy roam (rules/creatures.ts), and keeps `radius`
// m from any creature in her fights: a wild one hunting a witch (rules/hunt.ts) or one of her followers with a fight's target. One
// that close walks straight away from the nearest, and a roam target that close is drawn again in its area by its own seeded draws
// (c.rand, so the same in lockstep). Happy ones defending their area against enraged attackers are left be (in a fight themselves,
// moved by combat; enraged besiegers aren't her fights). The challenge circle's won ones do the same, and keep off its circle too
// (rules/challengeStatues.ts). Their sigils stay in the stack wherever they roam, so the cast scatters them round the stone as ever.
// No drawing here.
import type { Game } from "./game";
import { heldByCombat, pointInArea, type Creature } from "./creatures";
import { stateOf } from "./creatureStates";
import type { Tuning } from "./tuning";

/** The knobs (invites.wonAway): on, and how far (m) a won one keeps from the fight. */
export const wonAwayOf = (t: Tuning): { on: boolean; radius: number } => ({ on: true, radius: 6, ...t.invites.wonAway });

/** Whether c is won over and waiting for its stone's spell: happy, its sigil in the stack, free (not leashed, gone, loose, a legend, a
 *  statue, running off, or itself in a fight). */
export const waitingWon = (c: Creature): boolean => !!c.atStone && !c.leashed && !c.gone && !c.loose && !c.boss && !c.statue && c.fleeUntil === undefined && !heldByCombat(c) && stateOf(c) === "happy";

/** Whether c is in her fights: hunting a witch, or one of her followers with a target. */
const inHerFight = (c: Creature): boolean => !c.gone && (c.hunting !== undefined || (c.leashed && !!c.fight?.target));

/** The fighters by grid square (`radius` m), to look up near a point. */
class Near {
  private cells = new Map<number, Creature[]>();
  constructor(list: Creature[], private r: number) { for (const c of list) { const k = this.key(Math.floor(c.x / r), Math.floor(c.z / r)); const a = this.cells.get(k); if (a) a.push(c); else this.cells.set(k, [c]); } }
  private key(i: number, j: number): number { return (i + 32768) * 65536 + (j + 32768); }
  /** The nearest within r of (x, z), else null. */
  nearest(x: number, z: number): Creature | null {
    const i0 = Math.floor(x / this.r), j0 = Math.floor(z / this.r);
    let best: Creature | null = null, bd = this.r;
    for (let i = i0 - 1; i <= i0 + 1; i++) for (let j = j0 - 1; j <= j0 + 1; j++) for (const f of this.cells.get(this.key(i, j)) ?? []) { const d = Math.hypot(f.x - x, f.z - z); if (d < bd) { bd = d; best = f; } }
    return best;
  }
}

/** Each step, after the roam (rules/game.ts): every waiting won one out of the fight's way, backing off at `pace` times its own pace.
 *  Nothing while no one's fighting her. Returns how many it moved. */
export function stepWonAway(g: Game, dt: number, pace = 1.5): number {
  const W = wonAwayOf(g.tuning);
  if (!W.on || W.radius <= 0) return 0;
  const fighters: Creature[] = [];
  let any = false;
  for (const c of g.creatures) { if (inHerFight(c)) fighters.push(c); else if (!any && waitingWon(c)) any = true; }
  if (!fighters.length || !any) return 0;
  const near = new Near(fighters, W.radius);
  let moved = 0;
  for (const c of g.creatures) {
    if (!waitingWon(c)) continue;
    // Its roam's target away from the fight, else drawn again in its area.
    if (near.nearest(c.tx, c.tz)) for (let i = 0; i < 8; i++) { const [x, z] = pointInArea(g.map, c, c.rand); c.tx = x; c.tz = z; if (!near.nearest(x, z)) break; }
    const f = near.nearest(c.x, c.z);
    if (!f) continue;
    const ex = c.x - f.x, ez = c.z - f.z, e = Math.hypot(ex, ez), ux = e > 1e-6 ? ex / e : 0, uz = e > 1e-6 ? ez / e : 1, step = Math.min(W.radius - e + 0.05, c.speed * Math.max(1, pace) * dt);
    if (step <= 0) continue;
    c.x += ux * step; c.z += uz * step;
    if (Math.abs(ux) > 0.02) c.facing = ux > 0 ? 1 : -1;
    c.away = uz < -Math.abs(ux); c.moving = true; c.walk += dt * 4; c.rest = 0;
    moved++;
  }
  return moved;
}
