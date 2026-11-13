// The taut chain (Ed, 2026-11-12), one sequence under one switch (leash.chain.taut, ?tautchain=0 turns all of it off):
//   "When you are in treetop mode and you are pulling a creature on its chain, when the chain gets taut you should be pulled back to
//   ground mode. This shouldn't be a sudden transition, but as you pull outside of the length you are progressively pulled down; if
//   you stop pulling, you rise up again, only if you keep pulling do you actually fully switch back to ground mode."
//   "Treetop pulldown is somewhat gradual - you have to tug for a while before you're pulled down. pop-out should also be gradual -
//   you pull against a chain, the chain goes taut and you can see the sigil in your stack being pulled out, and only if you keep
//   pulling it plops onto the ground as if placed. So the whole treetop-ground-pop is several seconds and neither part can be
//   accidental. Also pulling on the ground should slow you down less than pulling in the air ... so it should feel possible to 'pull
//   your creatures on the ground' without accidentally dropping them everywhere." "legend chains yank you back instead of popping out"
// 1. The tug (treetops): each metre her step tries to take her past a chain's end (rules/chains.ts dragWitch's strain, before the drag
//    cuts it; the tautest chain, not their sum, as the drag: "They don't stack") pulls her down tug.perMetre of the way to the ground
//    (`tug`, 0 to 1: her lift held at 1 - tug, so her height, her speed's blend, the canopy and the camera all follow the one eased
//    curve an ordinary descent draws, only slower); not pulling she rises again at tug.rise a second, from however low; pulled all the
//    way (tug 1) she's at the ground and her mode turns to ground there. Ed's playtest, 2026-11-13: "the transition from treetop to
//    ground isn't smooth; she is pulled down some of the way, and then falls to the ground": till then the tug stopped 0.4 of the way
//    down (tug.commit) and the ordinary descent dropped her the last 14 m in a third of a second. Her pull's pace is eased over
//    tug.ease seconds (`rate`), so it comes on gently and one step's hitch in the chain (its creature a few cm late) doesn't show.
// 2. The pop (on foot): pulling a youth's or an adult's taut chain (its drag cutting her motion away) fills a meter for the chain
//    pulled hardest, one at a time, over pop.fill seconds of steady pulling (on past its end faster than it follows, PULL_FROM m/s or
//    more); easing off drains it in pop.drain; the view slides that sigil out of her stack by it (render/leash/stack.ts); full, the sigil is put down
//    where she stands by the ordinary put-down (rules/sigilButton.ts popSigil, rules/leash.ts), so the creature guards there.
// 3. The yank: past a legend's chain, pulling on, she's jerked back toward it (yank.metres, the knock's easing throw, no stagger), at
//    most once every yank.every seconds; its chain rattles (the "yanked" leash event). A legend's sigil never pops.
// The lighter ground drag and the hurry are in rules/chains.ts. Pure arithmetic on the step's positions (lockstep-safe); no drawing.
import { clamp } from "./random";
import type { Tuning } from "./tuning";
import type { WitchState } from "./witch";
import { LEGEND, type Creature } from "./creatures";

export type TautKnobs = NonNullable<NonNullable<Tuning["leash"]["chain"]>["taut"]>;

/** The taut chain's knobs (leash.chain.taut), or null when it's off or absent (?tautchain=0: everything as before). */
export function tautKnobs(t: Tuning): TautKnobs | null {
  const K = t.leash.chain?.taut;
  return K && K.on ? K : null;
}
/** The tug's knobs, or null when off. */
export function tugKnobs(t: Tuning): TautKnobs["tug"] | null {
  const K = tautKnobs(t)?.tug;
  return K && K.perMetre > 0 ? K : null;
}

/** Her pull past the chain's end under this speed (m/s) is her coasting round it, not pulling (a circle's curve at treetop speed
 *  adds a few cm a step). */
export const PULL_FROM = 2;
/** The most metres a second of pull the tug counts (m/s): straining against a creature that can't be dragged her step's whole motion
 *  is past the end, near treetop speed; capped, the tug never comes on much faster than a dragged youth's (about 12 m/s): never sudden. */
export const PULL_MOST = 16;

/** What else this step means: `hold`, the tug mustn't bring her down now (over a lake's water or a treehouse floor: she's pulled no
 *  lower than tug.hold of the way, and eases back up to it if she came over it lower, till she's past it or lets off); `free`,
 *  nothing she does counts as pulling (thrown by a blow, or yanked). */
export interface TugWhere { hold?: boolean; free?: boolean }

/** Her tug after a step: `tug` before it, `strain` the metres her step pulled past the tautest chain (dragWitch), `pull` her broom's
 *  (the Canoe hull). Returns her body (lift held at 1 - tug; at tug 1 she has arrived: lift 0, mode "descending", which the next
 *  step's stepWitch turns to "ground" with no height left to lose, so the landing's own rules run: the rise cooldown, rules/game.ts)
 *  and the tug left (0: none), with `rate`, her pull's eased pace (m/s past the chain's end; in: the last step's; 0 the moment she
 *  lets off). Only in treetop mode: rising, descending or on foot it's 0. */
export function stepTug(body: WitchState, tug: number, strain: number, dt: number, t: Tuning, pull = 1, where: TugWhere = {}, rate = 0): { body: WitchState; tug: number; rate: number } {
  const K = tugKnobs(t);
  if (!K || body.mode !== "treetop" || body.perch) return { body, tug: 0, rate: 0 };
  const pulling = !where.free && strain > PULL_FROM * dt;
  const up = tug - K.rise * dt, now = Math.min(strain, PULL_MOST * dt) / Math.max(dt, 1e-6);
  rate = pulling ? rate + (now - rate) * (K.ease > 0 ? 1 - Math.exp(-dt / K.ease) : 1) : 0;
  let next = pulling ? tug + K.perMetre * rate * dt * Math.max(0, pull) : up;
  if (where.hold) { const most = clamp(K.hold, 0, 0.999); next = tug > most ? Math.max(most, up) : Math.min(next, most); } // (no lower than hold; lower already, back up to it)
  next = clamp(next, 0, 1);
  if (next >= 1) return { body: { ...body, mode: "descending", lift: 0 }, tug: 0, rate: 0 }; // (arrived: on the ground, no drop left)
  if (next <= 0) return { body, tug: 0, rate };
  // (stepWitch's own climb back in treetop mode is faster than tug.rise, so not pulling her lift follows 1 - tug up too)
  return { body: { ...body, lift: Math.min(body.lift, 1 - next), ...(pulling ? { braking: true } : {}) }, tug: next, rate }; // (pulling: her brake pose, the strain)
}

/** The pop meter: which chain's sigil is sliding out of her stack, and how far (0 to 1). */
export interface PopMeter { id: number; k: number }

/** A pull on one of her chains this step (rules/chains.ts ChainPull, its creature by id). */
export interface Pull { id: number; level: number; over: number; cut: number }

/** Her pop meter after a step on foot (`pulls`, her chains past their limits; `onFoot`, on the ground, not perched, seated or knocked
 *  out). The meter follows the youth's or adult's chain pulled hardest (the most motion cut), keeping the one it has while that's
 *  still pulled; fills over pop.fill seconds of steady pulling (times her broom's pull); drains over pop.drain when she eases off
 *  (or turns to another: it drains to empty before it moves on). Returns the meter (null: empty) and `pop`, the creature whose
 *  sigil goes down now. */
export function stepPop(meter: PopMeter | null, pulls: readonly Pull[], dt: number, t: Tuning, onFoot: boolean, pull = 1, free = false): { meter: PopMeter | null; pop: number | null } {
  const K = tautKnobs(t)?.pop;
  if (!K || !(K.fill > 0)) return { meter: null, pop: null };
  const can = onFoot && !free ? pulls.filter(p => p.level >= 1 && p.level < LEGEND && p.over > PULL_FROM * dt) : [];
  const mine = meter ? can.find(p => p.id === meter.id) : undefined;
  let best = mine;
  if (!best) for (const p of can) if (!best || p.cut > best.cut) best = p;
  if (meter && !mine) { // (eased off, or another pulled: it drains first)
    const k = meter.k - dt / Math.max(1e-3, K.drain);
    return { meter: k > 0 ? { id: meter.id, k } : null, pop: null };
  }
  if (!best) return { meter: null, pop: null };
  const k = (meter?.k ?? 0) + (Math.max(0, pull) * dt) / K.fill;
  if (k >= 1) return { meter: null, pop: best.id };
  return { meter: k > 0 ? { id: best.id, k } : null, pop: null };
}

/** The legend's yank: pulling past a legend's chain (`pulls`), once yank.every seconds have passed since the last (`last`, on her
 *  clock `now`), the legend she's pulled hardest from, else null. */
export function yankFrom(pulls: readonly Pull[], dt: number, t: Tuning, now: number, last: number | undefined, free = false): number | null {
  const K = tautKnobs(t)?.yank;
  if (!K || !(K.metres > 0) || free || now < (last ?? -Infinity) + K.every) return null;
  let best: Pull | null = null;
  for (const p of pulls) if (p.level >= LEGEND && p.over > PULL_FROM * dt && (!best || p.over > best.over)) best = p;
  return best ? best.id : null;
}

/** Pulls by creature id, from rules/chains.ts's. */
export const pullsOf = (ps: readonly { c: Creature; over: number; cut: number }[]): Pull[] => ps.map(p => ({ id: p.c.id, level: p.c.level, over: p.over, cut: p.cut }));
