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
import { tautKnobs } from "./tautChain";

/** An adult's level (rules/creatureLevels.ts: 0 baby, 1 young, 2 adult, 3 legend). */
export const ADULT = 2;

/** The chain's length (m), leash.chain.length; 0 (or absent): no chains, and no grounding by adults. */
export const chainLength = (t: Tuning): number => t.leash.chain?.length ?? 0;

/** Whether this creature, its sigil in her stack, is on a chain: alive, not a baby, not a party legend. */
export const chained = (c: Creature | undefined): c is Creature => !!c && !c.gone && c.level > 0 && !c.partyLegend;

/** How much of her motion away a taut chain takes off, by its creature's level (leash.chain.drag), 0 to 1; `ground`, on foot with the
 *  taut chain on (Ed, 2026-11-12: "pulling on the ground should slow you down less than pulling in the air"), its groundDrag. */
export function chainDrag(c: Pick<Creature, "level">, t: Tuning, ground = false): number {
  const T = ground ? tautKnobs(t) : null, D = T ? T.groundDrag : t.leash.chain?.drag;
  if (!D) return 0;
  return Math.max(0, Math.min(1, c.level >= LEGEND ? D.legend : c.level === ADULT ? D.adult : c.level === 1 ? D.youth : 0));
}

/** How near the chain's end (m) still reads as taut. */
export const AT_END = 0.25;

/** Metres each creature was pulled along this step (dragWitch), taken off its own run after her (rules/leash.ts stepLeashed), so it
 *  never goes faster than its top speed. Cleared each step (beginChains). */
const pulled = new Map<Creature, number>();
/** Each creature whose chain is taut this step, hurrying after her (leash.chain.taut.hurry): its own run's pace times this. */
const hurried = new Map<Creature, number>();
export const beginChains = (): void => { pulled.clear(); hurried.clear(); };
export function takePulled(c: Creature): number { const m = pulled.get(c) ?? 0; pulled.delete(c); return m; }
/** How much faster than its leash pace this creature runs after her this step (1: not at all): its chain's taut (rules/leash.ts
 *  stepLeashed, rules/travel.ts; Ed, 2026-11-12, the taut chain: "so pulling the army along on the ground feels like leading them"). */
export const hurryOf = (c: Creature): number => hurried.get(c) ?? 1;

/** A chain her step pulled past its limit: its creature, the metres past (`over`, before the drag) and the metres of her motion its
 *  drag took off (`cut`, over times its drag). */
export interface ChainPull { c: Creature; over: number; cut: number }

/** Her step through her chains. `from`: where she stood before it; `body`: where it took her; `dt` its length (s). For each chain
 *  she's past (its limit: its length, or how far she already was if further), her motion away is cut to (1 - the heaviest taut
 *  chain's drag) of it, and to what each creature can be pulled this step (its top speed); her speed away the same; her motion round
 *  it kept. Then each taut creature is pulled toward her back to its chain's length. Returns her body, the taut chains' ids and her
 *  `strain`: the most metres her step went past any chain's limit, before the drag cut it (the tautest pull: rules/tautChain.ts). */
/** `pull`: her broom's (rules/spells.ts pullOf; the Canoe hull's 0.65, "Her sigils pull on her less"): a youth's and an adult's drag
 *  times it; a legend's always whole. */
/** With the taut chain on (rules/tautChain.ts, leash.chain.taut): on foot, the lighter groundDrag, and each taut creature pulled along at
 *  her pace less it, not held to its top speed (which, at leash.runSpeed's 4 m/s for most, held her to a crawl); every taut creature
 *  hurries (hurryOf); and `pulls`, every chain past its limit, for the tug, the pop and the legends' yank. */
export function dragWitch(body: WitchState, from: { x: number; z: number }, stack: readonly number[], creatures: readonly Creature[], t: Tuning, dt: number, pull = 1): { body: WitchState; taut: number[]; strain: number; pulls: ChainPull[] } {
  const L = chainLength(t);
  if (!(L > 0)) return { body, taut: [], strain: 0, pulls: [] };
  const cs: Creature[] = [];
  for (const id of stack) { const c = creatures[id]; if (chained(c)) cs.push(c); }
  if (!cs.length) return { body, taut: [], strain: 0, pulls: [] };
  const T = tautKnobs(t), ground = !!T && body.mode === "ground";
  const lim = cs.map(c => Math.max(L, Math.hypot(from.x - c.x, from.z - c.z)));
  const over = cs.map((c, i) => Math.hypot(body.x - c.x, body.z - c.z) - lim[i]);
  const drag = cs.map(c => { const d = chainDrag(c, t, ground); return d >= 1 ? 1 : d * pull; });
  let k = 0;
  cs.forEach((_, i) => { if (over[i] > 1e-9) k = Math.max(k, drag[i]); });
  const taut = cs.filter((_, i) => over[i] >= -AT_END).map(c => c.id);
  if (T && T.hurry !== 1) cs.forEach((c, i) => { if (over[i] >= -AT_END) hurried.set(c, Math.max(0, T.hurry)); });
  const strain = Math.max(0, ...over);
  const pulls: ChainPull[] = [];
  cs.forEach((c, i) => { if (over[i] > 1e-9) pulls.push({ c, over: over[i], cut: over[i] * drag[i] }); });
  if (!(strain > 1e-9)) return { body, taut, strain: 0, pulls };
  const cap = (c: Creature) => ground ? Infinity : leashSpeed(c, t) * hurryOf(c) * dt;
  const keep = 1 - k, reach = cs.map((c, i) => lim[i] + Math.max(0, Math.min(keep * over[i], cap(c))));
  let x = body.x, z = body.z, vx = body.vx, vz = body.vz;
  // (with the taut chain on, more passes, her speed cut once a step (the heaviest's drag, as her motion is), not once a chain and
  // again each pass, and a looser check below: several chains a few metres apart left her a hair over one after four passes, so the
  // check stopped her dead, speed and all; and four youths cut her speed four times over, so she neither moved nor, her speed
  // gone, pulled: rules/tautChain.ts)
  let cutOnce = false;
  for (let pass = 0; pass < (T ? 12 : 4); pass++) {
    let any = false;
    cs.forEach((c, i) => {
      const dx = x - c.x, dz = z - c.z, d = Math.hypot(dx, dz);
      if (d <= reach[i] + 1e-9) return;
      const nx = dx / d, nz = dz / d, out = vx * nx + vz * nz;
      x = c.x + nx * reach[i]; z = c.z + nz * reach[i];
      if (out > 0 && !cutOnce) { vx -= nx * out * k; vz -= nz * out * k; if (T) cutOnce = true; }
      any = true;
    });
    if (!any) break;
  }
  // (each taut one pulled along after her, back to its chain's length, at most its top speed)
  cs.forEach((c, i) => {
    const dx = x - c.x, dz = z - c.z, d = Math.hypot(dx, dz), m = Math.min(d - lim[i], cap(c));
    if (m <= 1e-9 || d < 1e-9) return;
    c.x += (dx / d) * m; c.z += (dz / d) * m; c.moving = true;
    if (Math.abs(dx) > 0.02) c.facing = dx > 0 ? 1 : -1;
    pulled.set(c, (pulled.get(c) ?? 0) + m);
  });
  // (still over one, the projections fighting: she stays where she was)
  if (cs.some((c, i) => Math.hypot(x - c.x, z - c.z) > lim[i] + (T ? 1e-3 : 1e-6))) { x = from.x; z = from.z; if (!T) { vx = 0; vz = 0; } }
  return { body: { ...body, x, z, vx, vz }, taut, strain, pulls };
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
