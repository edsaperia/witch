// Sigil weight (Ed, 2026-10-06: "every sigil above your head pulls on you as well as attracting the animal; you find it
// slower to move in the opposite direction to where the leashes are, you are pulled off course, and rising to treetop
// is slower. And you're gradually pulled back down. This stops you just growing a giant army and pulling it around with
// you everywhere steamrolling everything."): each sigil in her stack (placed ones weigh nothing) pulls her toward its
// creature by how taut its leash is (the dotted tension thread's strain: nothing while it's near and slack, capped, so
// a far traveller can't pin her by distance alone) times its weight (its level's, times its species' strength). The
// summed pull, less a free allowance (the first few sigils weigh almost nothing), is her load: rules/witch.ts slows
// her moving away from it, drifts her a little toward it, slows her rise and, over the treetops, sinks her slowly (to
// a floor while she flies on; all the way down if she stops or the load is extreme). Knobs: tuning leash.weight.
// No drawing here; the view reads leashLoad (rules/game.ts).
import type { Creature } from "./creatures";
import type { Tuning } from "./tuning";
import { strengthOf } from "./combat";

export interface LeashLoad {
  /** The summed pull's size, in weight units (a young creature of normal strength on a fully taut leash is 1). */
  total: number;
  /** What drags: total less leash.weight.free, at least 0. */
  over: number;
  /** The pull's direction from her toward her creatures (a unit vector; 0, 0 with none). */
  x: number;
  z: number;
  /** Loaded past leash.weight.extreme: over the treetops she sinks all the way, flying or not. */
  extreme: boolean;
}

export const NO_LOAD: LeashLoad = { total: 0, over: 0, x: 0, z: 0, extreme: false };

/** A creature's weight on her leash: its level's (leash.weight.levels) times its species' strength (combat.json). */
export const creatureWeight = (c: Pick<Creature, "species" | "level">, t: Tuning) => (t.leash.weight.levels[c.level] ?? 1) * strengthOf(c.species, c.level);

/** How taut a leash is `d` metres long: 0 within 0.85 of leash.length (as the tension thread), rising by a leash
 *  length's worth to leash.weight.maxTension, and no further however far (a far traveller included). */
export const leashStrain = (d: number, t: Tuning) => Math.max(0, Math.min(t.leash.weight.maxTension, (d - t.leash.length * 0.85) / Math.max(1e-6, t.leash.length)));

/** Her load from the sigils in her stack (`stack`: creature ids), at (x, z). */
export function loadOf(stack: readonly number[], creatures: readonly Creature[], at: { x: number; z: number }, t: Tuning): LeashLoad {
  if (!stack.length) return NO_LOAD;
  let px = 0, pz = 0;
  for (const id of stack) {
    const c = creatures[id];
    if (!c || c.gone || c.partyLegend) continue; // (a party legend doesn't drag: it pins her, rules/partyLegend.ts)
    const dx = c.x - at.x, dz = c.z - at.z, d = Math.hypot(dx, dz), s = leashStrain(d, t);
    if (s <= 0 || d < 1e-6) continue;
    const k = (s * creatureWeight(c, t)) / d;
    px += dx * k; pz += dz * k;
  }
  const total = Math.hypot(px, pz), W = t.leash.weight;
  if (total < 1e-9) return NO_LOAD;
  const over = Math.max(0, total - W.free);
  return { total, over, x: px / total, z: pz / total, extreme: over >= W.extreme };
}
