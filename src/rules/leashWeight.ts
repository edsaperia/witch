// Sigil weight (Ed, 2026-10-06: "every sigil above your head pulls on you as well as attracting the animal; you find it
// slower to move in the opposite direction to where the leashes are, you are pulled off course, and rising to treetop
// is slower. And you're gradually pulled back down. This stops you just growing a giant army and pulling it around with
// you everywhere steamrolling everything."): each sigil in her stack (placed ones weigh nothing) pulls her toward its
// creature by how taut its leash is (the dotted tension thread's strain: nothing while it's near and slack, capped, so
// a far traveller can't pin her by distance alone) times its weight (its level's, times its species' strength). The
// summed pull, less a free allowance (the first few sigils weigh almost nothing), is her load: rules/witch.ts slows
// her moving away from it, drifts her a little toward it, slows her rise and, over the treetops, sinks her slowly (to
// a floor while she flies on; all the way down if she stops or the load is extreme). On the ground she's stronger (Ed,
// 2026-10-09: "extra free allowance on the ground should be the equivalent of one adult"): the free allowance there
// gains one adult's weight (leash.weight.levels' adult, at normal strength). Knobs: tuning leash.weight.
// No drawing here; the view reads leashLoad (rules/game.ts).
import type { Creature } from "./creatures";
import type { Tuning } from "./tuning";
import { strengthOf } from "./combat";
import { babiesOf, isBaby } from "./babies";

export interface LeashLoad {
  /** The summed pull's size, in weight units (a young creature of normal strength on a fully taut leash is 1). */
  total: number;
  /** What drags: total less leash.weight.free (plus an adult's weight on the ground), at least 0. */
  over: number;
  /** The pull's direction from her toward her creatures (a unit vector; 0, 0 with none). */
  x: number;
  z: number;
  /** Loaded past leash.weight.extreme: over the treetops she sinks all the way, flying or not. */
  extreme: boolean;
}

export const NO_LOAD: LeashLoad = { total: 0, over: 0, x: 0, z: 0, extreme: false };

/** A creature's weight on her leash: its level's (leash.weight.levels) times its species' strength (combat.json). A baby's
 *  strength doesn't count, and on the ground it weighs leash.weight.babyGround (Ed, 2026-10-11: so 8 fill either allowance). */
export const creatureWeight = (c: Pick<Creature, "species" | "level">, t: Tuning, ground = false) =>
  c.level === 0 ? (ground ? t.leash.weight.babyGround ?? t.leash.weight.levels[0] : t.leash.weight.levels[0]) ?? 1 : (t.leash.weight.levels[c.level] ?? 1) * strengthOf(c.species, c.level);

/** How taut a leash is `d` metres long: 0 within 0.85 of leash.length (as the tension thread), rising by a leash
 *  length's worth to leash.weight.maxTension, and no further however far (a far traveller included). */
export const leashStrain = (d: number, t: Tuning) => Math.max(0, Math.min(t.leash.weight.maxTension, (d - t.leash.length * 0.85) / Math.max(1e-6, t.leash.length)));

/** Her free allowance: leash.weight.free, plus one adult's weight (at normal strength) when she's on the ground. */
export const freeOf = (t: Tuning, ground: boolean) => t.leash.weight.free + (ground ? t.leash.weight.levels[2] ?? 0 : 0);

/** Her load from the sigils in her stack (`stack`: creature ids), at (x, z); `at.mode` "ground" gives the ground's allowance. */
/** `pull`: how hard they pull on her (the Haul broom's half: rules/spells.ts pullOf); `scattering`: her babies scattered in a fight
 *  (rules/babies.ts), where they're meant to be however far, so pulling on nothing. */
export function loadOf(stack: readonly number[], creatures: readonly Creature[], at: { x: number; z: number; mode?: string }, t: Tuning, pull = 1, scattering = false): LeashLoad {
  if (!stack.length) return NO_LOAD;
  let px = 0, pz = 0, babies = 0;
  const ground = at.mode === "ground", gap = babiesOf(t).gap;
  for (let i = stack.length - 1; i >= 0; i--) { // (from the bottom: babies in their line's order)
    const c = creatures[stack[i]];
    if (!c || c.gone || c.partyLegend) continue; // (a party legend doesn't drag: it pins her, rules/partyLegend.ts)
    if (scattering && ground && isBaby(c)) continue; // (scattered off the screen in a fight: where it's meant to be)
    // (a baby in single file on the ground: its leash's slack measured from its place in the line, so a tidy line costs nothing)
    const slack = ground && isBaby(c) ? ++babies * gap : 0;
    const dx = c.x - at.x, dz = c.z - at.z, d = Math.hypot(dx, dz), s = leashStrain(d - slack, t);
    if (s <= 0 || d < 1e-6) continue;
    const k = (s * creatureWeight(c, t, ground)) / d;
    px += dx * k; pz += dz * k;
  }
  const raw = Math.hypot(px, pz), total = raw * pull, W = t.leash.weight;
  if (total < 1e-9) return NO_LOAD;
  const over = Math.max(0, total - freeOf(t, at.mode === "ground"));
  return { total, over, x: px / raw, z: pz / raw, extreme: over >= W.extreme };
}

/** Who grounds her (Ed, 2026-10-18: "One adult stops you taking off. Three young do." and "one and three are indicative
 *  numbers; if creatures are light or heavy you can extrapolate"): the weight of the creatures following her, their sigils in
 *  her stack (parked ones at a sigil on the ground don't count, nor babies), each at creatureWeight (its level's weight times its
 *  species' strength), however near they stand. At leash.grounded.weight or more (2: one adult of normal strength; three young
 *  are 2.4, two are 1.6) she can't take off from the ground: she tries and the leashes pull her straight back down (rules/game.ts
 *  keeps her on the ground and says so, the "grounded" leash event; the view draws the hop and the taut leashes). Apart from
 *  the pull (loadOf), which still slows a take-off it allows; once she's up it doesn't bring her down. 0 turns it off. */
export interface Grounding { weight: number; grounded: boolean }
export function groundedBy(stack: readonly number[], creatures: readonly Creature[], t: Tuning): Grounding {
  let weight = 0;
  for (const id of stack) {
    const c = creatures[id];
    if (!c || c.gone || c.level === 0) continue;
    weight += creatureWeight(c, t);
  }
  const at = t.leash.grounded?.weight ?? 0;
  return { weight, grounded: at > 0 && weight >= at - 1e-9 };
}
