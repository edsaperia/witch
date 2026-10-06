// The party legend, an Easter egg (Ed, 2026-10-06: "It would be funny if you could leash an elder, but it's so heavy that it
// stops you moving at all outside the leash slack distance, and it doesn't move towards you at all. Maybe you should be
// able to turn a happy legend into a party legend with an absurd number of invites (100?) and then pick up its sigil but
// it's totally useless."): its meter, its flip and its rune are in rules/creatureStates.ts and rules/affection.ts; here,
// what leashing one does to her. It never comes to her; she can go anywhere within legends.partyReach of it, on the
// ground or over the treetops, and not a step further (a hard stop, not a drag). Putting its sigil down (E) lets it go
// where it stands, dancing, and she's free. No drawing here.
import type { Creature } from "./creatures";
import type { WitchState } from "./witch";

/** Where she's pinned (the party legend she's up against, for the view: the leash ruler-straight, the boing), or null. */
export interface Pinned { id: number; x: number; z: number; since: number }

/** Keep her within `reach` of every party legend in her stack: past it she's put back on its edge and her speed outward
 *  is taken away (her input still slides her round it). `was`: last step's pin, kept while she's still at the edge. */
export function pinWitch(body: WitchState, stack: readonly number[], creatures: readonly Creature[], reach: number, time: number, was: Pinned | null): { body: WitchState; pinned: Pinned | null } {
  let b = body, pinned: Pinned | null = null;
  for (const id of stack) {
    const c = creatures[id];
    if (!c?.partyLegend || c.gone) continue;
    const dx = b.x - c.x, dz = b.z - c.z, d = Math.hypot(dx, dz);
    if (d <= reach - 1e-6) continue;
    const nx = d > 1e-9 ? dx / d : 1, nz = d > 1e-9 ? dz / d : 0, out = b.vx * nx + b.vz * nz;
    b = { ...b, x: c.x + nx * reach, z: c.z + nz * reach, vx: out > 0 ? b.vx - nx * out : b.vx, vz: out > 0 ? b.vz - nz * out : b.vz };
    pinned = { id, x: c.x, z: c.z, since: was?.id === id ? was.since : time };
  }
  return { body: b, pinned };
}
