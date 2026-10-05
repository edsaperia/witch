// The witch knocked back and stunned (Ed, 2026-10-05: "add a knockback and stun on the witch; make it
// large on chasing/ramming creatures"). A blow that lands on her throws her straight away from where
// it came from, easing off like a creature's knockback (combat.ts stepKnock), and stops her dead
// against a trunk, rock, speaker or the treehouse (the blink's clearances); and staggers her for a
// moment: no moving, blinking or throwing 💌s. Ordinary blows (bites, swipes, shots) are small; a
// blow with the knockback modifier is bigger by its own knockback value; a charge (or a leap landing
// on her) is big. Fair: a blink still dodges everything (hitWitch never gets here), she can't be
// stunned again for `immune` seconds after a stun (the blow still counts), and the blow that knocks
// her out throws nothing. Knobs: tuning witch.knock. No drawing here.
import type { Tuning } from "./tuning";
import type { WitchState } from "./witch";

export interface Knock {
  /** Her knockback velocity (m/s), easing off. */
  kx: number;
  kz: number;
  /** Staggered until then; can't be staggered again until immuneUntil. */
  stunUntil: number;
  immuneUntil: number;
  /** When the last knock began (the view's wobble). */
  at: number;
}

export const newKnock = (): Knock => ({ kx: 0, kz: 0, stunUntil: -Infinity, immuneUntil: -Infinity, at: -Infinity });

export const stunned = (k: Knock | undefined, time: number) => !!k && time < k.stunUntil;

/** What threw her: where the blow came from, the attack's knockback (0 if it has none), and whether
 *  it rams (a charge, or a leap landing on her). */
export interface Blow { x: number; z: number; knockback: number; rams: boolean }

/** How far a blow throws her (metres) and how long it staggers her (seconds). */
export function knockOf(b: Blow, t: Tuning): { metres: number; stun: number } {
  const K = t.witch.knock;
  if (!K || !K.on) return { metres: 0, stun: 0 };
  let metres = K.base + (b.knockback > 0 ? K.scale * b.knockback : 0);
  if (b.rams) metres = Math.max(metres, K.charge);
  metres = Math.min(K.max, metres);
  const stun = Math.min(K.stunMax, K.stunBase + K.stunScale * Math.max(0, metres - K.base));
  return { metres, stun };
}

/** A blow landed (and didn't knock her out): throw her away from it, and stagger her unless she's
 *  still immune from the last stagger. */
export function knockWitch(k: Knock, body: { x: number; z: number }, b: Blow, time: number, t: Tuning): void {
  const { metres, stun } = knockOf(b, t);
  if (metres <= 0) return;
  let dx = body.x - b.x, dz = body.z - b.z, d = Math.hypot(dx, dz);
  if (d < 1e-3) { dx = 1; dz = 0; d = 1; }
  // Thrown at ease metres a second for each metre: it eases off to the full distance (∫ v e^(-ease t) = v / ease).
  const v = metres * t.witch.knock.ease;
  k.kx = (dx / d) * v; k.kz = (dz / d) * v; k.at = time;
  if (time >= k.immuneUntil) { k.stunUntil = time + stun; k.immuneUntil = k.stunUntil + t.witch.knock.immune; }
}

/** One step of her knockback: she moves with it, easing off, unless the next spot isn't clear (a
 *  trunk, a rock, a speaker, the treehouse): there it stops. Kept inside the map. */
export function stepWitchKnock(k: Knock, body: WitchState, dt: number, t: Tuning, bounds: { minX: number; maxX: number; minZ: number; maxZ: number }, clear: (x: number, z: number) => boolean): WitchState {
  if (!k.kx && !k.kz) return body;
  // (the exact distance an easing velocity covers in dt, so the whole throw is its metres, whatever the step)
  const ease = t.witch.knock.ease, decay = Math.exp(-dt * ease), go = (1 - decay) / ease;
  const x = Math.min(bounds.maxX, Math.max(bounds.minX, body.x + k.kx * go)), z = Math.min(bounds.maxZ, Math.max(bounds.minZ, body.z + k.kz * go));
  if (!clear(x, z)) { k.kx = 0; k.kz = 0; return body; }
  k.kx *= decay; k.kz *= decay;
  if (Math.hypot(k.kx, k.kz) < 0.05) { k.kx = 0; k.kz = 0; }
  return { ...body, x, z };
}
