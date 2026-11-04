// Chains (Ed, 2026-11-03, reworking the anchor chains: "I don't think adults should be much faster; adult speed is a key balance
// factor. Instead, I agree that we should make chains longer and fixed length. Dragging youths slows you down a bit (e.g. 30%).
// Dragging adults slows you down a lot (e.g. 70%). Dragging legends slows you down completely (100%). ... Maybe they should all be
// the same length, about the size of a fight (80m?), so it mostly affects you when moving, not when fighting."). Every creature on
// her leash, its sigil in her stack (a youth, an adult, a legend; never a baby, which has no chain, nor a party legend, which pins
// her its own way: rules/partyLegend.ts), is on a chain leash.chain.length (80) m long. Inside it, nothing. At full length, moving
// away from it, she drags it: her motion away is slowed by its level's drag (leash.chain.drag: youth 0.3, adult 0.7, legend 1, the
// whole of it, so she can't go further), and it's pulled along after her at that pace, never faster than its own top speed (rules/
// leash.ts leashSpeed; its own running after her that step takes the pull off, so it never goes faster than that). Several taut
// chains don't stack: the heaviest decides ("They don't stack, you are just affected by the heaviest one"). Her motion round it
// stays, so she slides round the radius; she's never pulled in (each chain's limit is its length, or how far she already was).
// A sleeping legend's sigil she carries holds her as hard at the same length (rules/stoneStacks.ts tetherWitch; its length set as
// she picks it up: rules/sigilButton.ts). She can't take off with an adult or legend on her leash (rules/leashWeight.ts groundedBy). Each
// witch by her own stack; plain arithmetic on the step's positions, so lockstep play stays deterministic. No drawing here.
import { LEGEND, type Creature } from "./creatures";
import type { Tuning } from "./tuning";
import type { WitchState } from "./witch";
import { leashSpeed } from "./leash";
import { smoothstep } from "./random";

/** An adult's level (rules/creatureLevels.ts: 0 baby, 1 young, 2 adult, 3 legend). */
export const ADULT = 2;

/** The chain's length (m), leash.chain.length; 0 (or absent): no chains, and no grounding by adults. */
export const chainLength = (t: Tuning): number => t.leash.chain?.length ?? 0;

/** Whether this creature, its sigil in her stack, is on a chain: alive, not a baby, not a party legend. */
export const chained = (c: Creature | undefined): c is Creature => !!c && !c.gone && c.level > 0 && !c.partyLegend;

/** How much of her motion away a taut chain takes off, by its creature's level (leash.chain.drag), 0 to 1. */
export function chainDrag(c: Pick<Creature, "level">, t: Tuning): number {
  const D = t.leash.chain?.drag;
  if (!D) return 0;
  return Math.max(0, Math.min(1, c.level >= LEGEND ? D.legend : c.level === ADULT ? D.adult : c.level === 1 ? D.youth : 0));
}

/** The adults on her leash. */
export function adultsOf(stack: readonly number[], creatures: readonly Creature[]): Creature[] {
  const out: Creature[] = [];
  for (const id of stack) { const c = creatures[id]; if (chained(c) && c.level === ADULT) out.push(c); }
  return out;
}

/** How near the chain's end (m) still reads as taut. */
export const AT_END = 0.25;

/** Metres each creature was pulled along this step (dragWitch), taken off its own run after her (rules/leash.ts stepLeashed), so it
 *  never goes faster than its top speed. Cleared each step (beginChains). */
const pulled = new Map<Creature, number>();
export const beginChains = (): void => pulled.clear();
export function takePulled(c: Creature): number { const m = pulled.get(c) ?? 0; pulled.delete(c); return m; }

/** Her step through her chains. `from`: where she stood before it; `body`: where it took her; `dt` its length (s). For each chain
 *  she's past (its limit: its length, or how far she already was if further), her motion away is cut to (1 - the heaviest taut
 *  chain's drag) of it, and to what each creature can be pulled this step (its top speed); her speed away the same; her motion round
 *  it kept. Then each taut creature is pulled toward her back to its chain's length. Returns her body and the taut chains' ids. */
/** `pull`: her broom's (rules/spells.ts pullOf; the Canoe hull's 0.65, "Her sigils pull on her less"): a youth's and an adult's drag
 *  times it; a legend's always whole. */
export function dragWitch(body: WitchState, from: { x: number; z: number }, stack: readonly number[], creatures: readonly Creature[], t: Tuning, dt: number, pull = 1): { body: WitchState; taut: number[] } {
  const L = chainLength(t);
  if (!(L > 0)) return { body, taut: [] };
  const cs: Creature[] = [];
  for (const id of stack) { const c = creatures[id]; if (chained(c)) cs.push(c); }
  if (!cs.length) return { body, taut: [] };
  const lim = cs.map(c => Math.max(L, Math.hypot(from.x - c.x, from.z - c.z)));
  const over = cs.map((c, i) => Math.hypot(body.x - c.x, body.z - c.z) - lim[i]);
  let k = 0;
  cs.forEach((c, i) => { if (over[i] > 1e-9) { const d = chainDrag(c, t); k = Math.max(k, d >= 1 ? 1 : d * pull); } });
  const taut = cs.filter((_, i) => over[i] >= -AT_END).map(c => c.id);
  if (!over.some(e => e > 1e-9)) return { body, taut };
  const keep = 1 - k, reach = cs.map((c, i) => lim[i] + Math.max(0, Math.min(keep * over[i], leashSpeed(c, t) * dt)));
  let x = body.x, z = body.z, vx = body.vx, vz = body.vz;
  for (let pass = 0; pass < 4; pass++) {
    let any = false;
    cs.forEach((c, i) => {
      const dx = x - c.x, dz = z - c.z, d = Math.hypot(dx, dz);
      if (d <= reach[i] + 1e-9) return;
      const nx = dx / d, nz = dz / d, out = vx * nx + vz * nz;
      x = c.x + nx * reach[i]; z = c.z + nz * reach[i];
      if (out > 0) { vx -= nx * out * k; vz -= nz * out * k; }
      any = true;
    });
    if (!any) break;
  }
  // (each taut one pulled along after her, back to its chain's length, at most its top speed)
  cs.forEach((c, i) => {
    const dx = x - c.x, dz = z - c.z, d = Math.hypot(dx, dz), m = Math.min(d - lim[i], leashSpeed(c, t) * dt);
    if (m <= 1e-9 || d < 1e-9) return;
    c.x += (dx / d) * m; c.z += (dz / d) * m; c.moving = true;
    if (Math.abs(dx) > 0.02) c.facing = dx > 0 ? 1 : -1;
    pulled.set(c, (pulled.get(c) ?? 0) + m);
  });
  // (still over one, the projections fighting: she stays where she was)
  if (cs.some((c, i) => Math.hypot(x - c.x, z - c.z) > lim[i] + 1e-6)) { x = from.x; z = from.z; vx = 0; vz = 0; }
  return { body: { ...body, x, z, vx, vz }, taut };
}

/** How much of a chain shows, by how far its creature is from her end over its length (Ed, 2026-11-03: invisible close, fully opaque
 *  and glowing taut): a smoothstep from leash.chain.fadeFrom to 1 of distance / length. */
export function chainShown(d: number, t: Tuning): number {
  const L = chainLength(t), C = t.leash.chain;
  if (!(L > 0) || !C) return 1;
  const f = Math.min(0.999, Math.max(0, C.fadeFrom));
  return smoothstep((d / L - f) / (1 - f));
}

/** Whether a creature on her leash holds her down (Ed, 2026-11-03: "only adults and legends do"; rules/leashWeight.ts groundedBy):
 *  an adult or a legend (a party legend too), alive. */
export const holdsDown = (c: Creature | undefined): boolean => !!c && !c.gone && c.level >= ADULT;

/** The chains that hold her down (holdsDown): her stack's adults and legends. A refused take-off rattles exactly these (Ed: "only the
 *  adult and legend chains rattle, to make it clear it's those ones that are pulling you down"; render/leash/stack.ts, the sound:
 *  platform/audio/sfxCues.ts); youths' and babies' chains stay still. */
export function weighingChains(stack: readonly number[], creatures: readonly Creature[]): number[] {
  return stack.filter(id => holdsDown(creatures[id]));
}

/** Whether her rise is drawn slower (leash.chain.youthRise < 1, render/view/witch.ts): rising off the ground with a youth on her leash.
 *  Drawn only: the rules' lift, and so when she counts as up, is untouched. */
export function youthRising(g: { witch: WitchState; leash: { stack: readonly number[] }; creatures: readonly Creature[]; tuning: Tuning }): boolean {
  const k = g.tuning.leash.chain?.youthRise ?? 1;
  return k < 1 && g.witch.mode === "rising" && g.leash.stack.some(id => { const c = g.creatures[id]; return chained(c) && c.level === 1; });
}
