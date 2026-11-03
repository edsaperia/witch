// Anchor chains (Ed, 2026-11-03; docs/plans/follower-buffs-and-challenge-areas.md): "adults are slow and heavy; you should be able
// to move within a reasonable distance from them (the size of a typical fight), but when the chain gets to its max length you can't
// move further until they move." Each adult whose sigil is in her stack (leashed and following her: not parked at a placed sigil,
// "no. only when leashed"; not a youth, a baby or a legend, whose party legend pins her its own way, rules/partyLegend.ts) holds her
// within leash.anchor.length metres of it (30 to start: "fine to start with"). At the chain's end her motion away from it is taken
// off (position and velocity, along the chain) while her motion round it stays, so she slides round the radius; nothing moves her
// toward it, so she's never snapped back: if she's already further (it was busy in a fight, or ran off after a berry), she can't go
// any further, only nearer. The adult runs after her as any follower does (rules/leash.ts stepLeashed), which frees her.
// She can't take off with an adult on her leash either (rules/leashWeight.ts groundedBy). 0 turns both off. Each witch by her own
// stack; pure arithmetic on the step's positions, so lockstep play stays deterministic. No drawing here.
import type { Creature } from "./creatures";
import type { Tuning } from "./tuning";
import type { WitchState } from "./witch";

/** An adult's level (rules/creatureLevels.ts: 0 baby, 1 young, 2 adult, 3 legend). */
export const ADULT = 2;

/** The anchor chain's length (m), leash.anchor.length; 0 (or absent): no anchoring and no grounding by adults. */
export const anchorLength = (t: Tuning): number => t.leash.anchor?.length ?? 0;

/** Whether this creature, its sigil in her stack, anchors her: an adult, there, not a party legend. */
export const anchors = (c: Creature | undefined): c is Creature => !!c && !c.gone && c.level === ADULT && !c.partyLegend;

/** The adults anchoring her: those of her stack's creatures that anchor (parked ones aren't in her stack). */
export function anchorsOf(stack: readonly number[], creatures: readonly Creature[]): Creature[] {
  const out: Creature[] = [];
  for (const id of stack) { const c = creatures[id]; if (anchors(c)) out.push(c); }
  return out;
}

/** How near the chain's end (m) still reads as at it, for the view's taut chain. */
export const AT_END = 0.25;

/** Keep her within `reach` of each adult anchoring her. `from`: where she stood before this step (each chain's limit is reach, or
 *  how far she already was if further, so she's never pulled in); `body`: where her step took her. Past a limit she's put back on
 *  it along the chain and her speed outward is taken away (her speed round it kept). Several chains: projected in turn a few times;
 *  if that still leaves one over, she stays where she was. Returns her body and the adults whose chains are at full length. */
export function anchorWitch(body: WitchState, from: { x: number; z: number }, stack: readonly number[], creatures: readonly Creature[], reach: number): { body: WitchState; taut: number[] } {
  if (!(reach > 0)) return { body, taut: [] };
  const adults = anchorsOf(stack, creatures);
  if (!adults.length) return { body, taut: [] };
  const lim = adults.map(a => Math.max(reach, Math.hypot(from.x - a.x, from.z - a.z)));
  let x = body.x, z = body.z, vx = body.vx, vz = body.vz, moved = false;
  for (let pass = 0; pass < 4; pass++) {
    let any = false;
    adults.forEach((a, i) => {
      const dx = x - a.x, dz = z - a.z, d = Math.hypot(dx, dz);
      if (d <= lim[i] + 1e-9) return;
      const nx = dx / d, nz = dz / d, out = vx * nx + vz * nz;
      x = a.x + nx * lim[i]; z = a.z + nz * lim[i];
      if (out > 0) { vx -= nx * out; vz -= nz * out; }
      any = moved = true;
    });
    if (!any) break;
  }
  if (adults.some((a, i) => Math.hypot(x - a.x, z - a.z) > lim[i] + 1e-6)) { x = from.x; z = from.z; vx = 0; vz = 0; moved = true; }
  const taut = adults.filter((a, i) => Math.hypot(x - a.x, z - a.z) >= lim[i] - AT_END).map(a => a.id);
  return { body: moved ? { ...body, x, z, vx, vz } : body, taut };
}

/** The adults whose chains are at full length now, her at (x, z): for the view (render/leash/stack.ts draws them taut and lit). */
export function tautAnchors(stack: readonly number[], creatures: readonly Creature[], x: number, z: number, t: Tuning): Set<number> {
  const reach = anchorLength(t), out = new Set<number>();
  if (!(reach > 0)) return out;
  for (const a of anchorsOf(stack, creatures)) if (Math.hypot(x - a.x, z - a.z) >= reach - AT_END) out.add(a.id);
  return out;
}
