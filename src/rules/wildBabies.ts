// Wild babies keep out of fights, as her leashed ones do (Ed, 2026-11-13: "wild babies should avoid combat in the way that
// friendly babies do"; "just change it so that wild babies avoid combat like leashed babies"). Hers scatter leash.babies.scatter
// metres off her from the moment something goes for her or hers, and come back leash.babies.calm seconds after the last thing
// did (rules/babies.ts, rules/leash.ts). A wild one mirrors that from its own side: from the moment a fight (a creature of
// either side going for something within combat.defendRadius of it, or what it's going for) is within combat.defendRadius of
// it, it runs, at the same run, to a spot of its own area the same scatter off the fight (babies.ts scatterSpot, the way from
// the fight to it; the farthest of a few spots of its area if that one's outside it: it never leaves its area), follows the
// fight as it moves, and goes back to its roam when nothing has fought there for the same calm seconds. Meanwhile neither its
// roam nor its notice of her moves it (a curious one doesn't come up to her mid-fight). A legend's circle baby keeps to its
// circle as ever, and one asleep sleeps on (nothing can hurt a baby). It stays wild throughout: not invitable (Ed, 2026-10-31:
// "No, no baby is invitable"), never holding its area (rules/clear.ts), happy when its stone turns. No drawing here.
import type { Game } from "./game";
import { babiesOf, BABIES_DEFAULT, queueHalf, scatterSpot, stepBaby } from "./babies";
import { inOwnArea, napping, pointInArea, type Creature } from "./creatures";
import { stateOf } from "./creatureStates";

/** Whether c is a wild baby free to run from a fight: wild, on its feet, roaming its own area (not the circle's, not hers, not
 *  a statue, in bed, let go at her knockout or running off). */
export const shyBaby = (c: Creature, time: number): boolean =>
  c.level === 0 && !c.leashed && !c.gone && !c.circle && !c.boss && !c.partyLegend && !c.statue && !c.bed && !c.dropped && !c.loose && !c.atStone
  && c.fleeUntil === undefined && c.finale === undefined && !napping(c, time) && stateOf(c) === "wild";

type Point = { x: number; z: number };

/** Where the fights are: every creature going for something (closing in or winding up) within `r` m of it, and what it's
 *  going for (a witch on the ground, a creature, a soundsystem). One after her from across its area isn't in a fight yet, nor
 *  one waiting under her while she's up over the trees. */
function fightPoints(g: Game, r: number): Point[] {
  const out: Point[] = [];
  for (const c of g.creatures) {
    const tg = c.gone ? null : c.fight?.target;
    if (!tg) continue;
    let p: Point | null = null;
    if (tg.kind === "witch") { const b = g.witches[tg.id]?.body; if (b && b.mode === "ground" && !b.seated && !b.perch && !g.witches[tg.id].ko) p = b; }
    else if (tg.kind === "creature") { const o = g.creatures[tg.id]; if (o && !o.gone) p = o; }
    else { const h = g.combat.sounds.get(tg.key); if (h && h.hp > 0) p = h; }
    if (!p || Math.abs(p.x - c.x) > r || Math.abs(p.z - c.z) > r || Math.hypot(p.x - c.x, p.z - c.z) > r) continue;
    out.push({ x: c.x, z: c.z }, { x: p.x, z: p.z });
  }
  return out;
}

/** The fights' points by grid square (`r` m), to look up near a point. */
class Near {
  private cells = new Map<number, Point[]>();
  constructor(list: Point[], private r: number) { for (const c of list) { const k = this.key(Math.floor(c.x / r), Math.floor(c.z / r)); const a = this.cells.get(k); if (a) a.push(c); else this.cells.set(k, [c]); } }
  private key(i: number, j: number): number { return (i + 32768) * 65536 + (j + 32768); }
  /** The nearest within r of (x, z), else null. */
  nearest(x: number, z: number): Point | null {
    const i0 = Math.floor(x / this.r), j0 = Math.floor(z / this.r);
    let best: Point | null = null, bd = this.r;
    for (let i = i0 - 1; i <= i0 + 1; i++) for (let j = j0 - 1; j <= j0 + 1; j++) for (const f of this.cells.get(this.key(i, j)) ?? []) { const d = Math.hypot(f.x - x, f.z - z); if (d < bd) { bd = d; best = f; } }
    return best;
  }
}

/** Where it runs to from a fight at (fx, fz): its scatter spot off the fight if that's in its own area and clear of every
 *  fight, else the first clear one of a few spots of its area (its own seeded draws, c.rand: the same in lockstep), else the
 *  farthest of them from the fight. */
function spotFor(g: Game, c: Creature, fx: number, fz: number, near: Near): Point {
  const B = babiesOf(g.tuning), dx = c.x - fx, dz = c.z - fz, d = Math.hypot(dx, dz);
  const to = scatterSpot(c, fx, fz, d > 1e-6 ? { x: dx / d, z: dz / d } : { x: 0, z: 1 }, B.scatter, queueHalf(c, g.tuning));
  if (inOwnArea(g.map, c, to.x, to.z) && !near.nearest(to.x, to.z)) return to;
  let best = { x: c.x, z: c.z }, bd = d;
  for (let i = 0; i < 8; i++) {
    const [x, z] = pointInArea(g.map, c, c.rand), k = Math.hypot(x - fx, z - fz);
    if (!near.nearest(x, z)) return { x, z };
    if (k > bd) { bd = k; best = { x, z }; }
  }
  return best;
}

/** How often (s) one with no clear spot looks for another. */
const AGAIN = 0.5;

/** Each step, after the roam (rules/game.ts): every wild baby near a fight runs from it, and one that ran goes back to its
 *  roam once the fight's been over for leash.babies.calm seconds. Returns how many are keeping away. */
export function stepWildBabies(g: Game, dt: number): number {
  const t = g.tuning, B = babiesOf(t), time = g.clock.time, R = (t.combat.defendRadius ?? 30) * (t.fight?.scale ?? 1);
  let any = false;
  for (const c of g.creatures) if (c.level === 0 && (c.shy || shyBaby(c, time))) { any = true; break; }
  if (!any) return 0;
  const points = fightPoints(g, R), near = points.length ? new Near(points, R) : null;
  let n = 0;
  for (const c of g.creatures) {
    if (c.level !== 0 || (!c.shy && !near)) continue;
    if (!shyBaby(c, time)) { c.shy = undefined; continue; } // (leashed, turned happy, asleep...: its other rules have it)
    // The fight: come up to it where it stands, else still going on where it ran from (followed as it moves).
    const f = near && (near.nearest(c.x, c.z) ?? (c.shy ? near.nearest(c.shy.x, c.shy.z) : null));
    if (f) {
      const s = (c.shy ??= { x: f.x, z: f.z, tx: c.x, tz: c.z, until: 0, pickAt: time });
      s.x = f.x; s.z = f.z; s.until = time + (B.calm ?? BABIES_DEFAULT.calm);
      // (a spot when it first runs, when a step was barred, and when a fight's come within reach of the one it has)
      if (s.pickAt !== undefined && time >= s.pickAt) { const to = spotFor(g, c, f.x, f.z, near!); s.tx = to.x; s.tz = to.z; s.pickAt = undefined; }
      if (s.pickAt === undefined && near!.nearest(s.tx, s.tz)) s.pickAt = time + AGAIN;
    } else if (c.shy && time >= c.shy.until) { c.shy = undefined; c.tx = c.x; c.tz = c.z; c.rest = 0.5; c.moving = false; continue; } // (calm again: its roam picks its next spot)
    const s = c.shy;
    if (!s) continue;
    n++;
    const x = c.x, z = c.z;
    stepBaby(c, s.tx, s.tz, x, z, c.speed, 0, dt, t); // (a baby's run: as hers scatter, babies.ts)
    // (never out of its own area: a step that would leave it isn't taken, and it picks a spot again)
    if (!inOwnArea(g.map, c, c.x, c.z)) { c.x = x; c.z = z; c.moving = false; s.tx = x; s.tz = z; s.pickAt ??= time + AGAIN; }
    c.seen = time;
  }
  return n;
}
