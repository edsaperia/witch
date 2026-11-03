// Follower buffs (Ed, 2026-11-03; docs/plans/follower-buffs-and-challenge-areas.md): "Only adults, yes." Each adult following
// her (its sigil in her stack, "no. only when leashed") gives her its group's buff while it has berry pips; groups by how each
// kind retreats (art/creatures/<id>/creature.js `retreat`, read through rules/combat/packs.ts packKindOf), the table in tuning
// buffs.groups. One buff per group; its stack count is the number of distinct kinds of that group following her ("since we have
// one per animal type, different animal types STACK!"), duplicates counting once. A leashed legend counts triple and needs no
// berries ("When you're leashing a legend, this gives you the equivalent of 3x of that animal types' buff. (counts as that animal
// type so doesn't stack e.g. adult wolf and legend wolf just count once)"). Each buff is personal: her dashes, her movement or
// her invites. Berry pips: an adult eats berries as a youth does (rules/berries.ts) up to buffs.pips.max, each lasting
// buffs.pips.life seconds, draining one at a time while it follows her; the draining one twinkles in her stack in its last
// buffs.pips.warn seconds (render/leash/stack.ts). Every magnitude is a knob (tuning buffs). Pure: no drawing, no randomness,
// so lockstep play stays deterministic.
import { LEGEND, type Creature } from "./creatures";
import { packKindOf } from "./combat/packs";
import type { Tuning } from "./tuning";
import type { BerryState } from "./berries";
import { speedMultiplier, type SpellState } from "./spells";
import { stepInvites, type Affection, type InviteControls, type Invites } from "./invites";

export const BUFF_GROUPS = ["climbers", "darters", "stalkers", "heavies", "packHunters", "shells"] as const;
export type BuffGroup = (typeof BUFF_GROUPS)[number];
export type BuffStacks = Record<BuffGroup, number>;
export const NO_BUFFS: BuffStacks = Object.freeze({ climbers: 0, darters: 0, stalkers: 0, heavies: 0, packHunters: 0, shells: 0 });

export type BuffKnobs = NonNullable<Tuning["buffs"]>;

/** Her buffs' stack counts: none of each. */
export const noBuffs = (): BuffStacks => ({ climbers: 0, darters: 0, stalkers: 0, heavies: 0, packHunters: 0, shells: 0 });

/** The buffs' knobs, or null when the tuning has none (an old saved tuning): no buffs. */
export const buffKnobs = (t: Tuning): BuffKnobs | null => t.buffs ?? null;

/** A kind's buff group, by its retreat (art/creatures/<id>/creature.js `retreat`) and the table (buffs.groups); null for a kind
 *  with no pack data or a retreat the table doesn't list. */
export function groupOf(species: string, t: Tuning): BuffGroup | null {
  const B = buffKnobs(t), r = packKindOf(species)?.retreat;
  if (!B || !r) return null;
  for (const g of BUFF_GROUPS) if (B.groups[g]?.includes(r)) return g;
  return null;
}

// ---- berry pips ----

/** An adult's level (rules/creatureLevels.ts). */
const ADULT = 2;
/** Seconds of buff an adult has left (its pips: whole ones and the draining one), on the berries' state; none kept yet: buffs.pips.start, 1 (Ed, 2026-11-03, #1722: "a new adult starts with 1 pip"). */
export function pipFuel(s: Pick<BerryState, "pips">, id: number, t: Tuning): number {
  const P = buffKnobs(t)?.pips;
  if (!P) return 0;
  return s.pips?.get(id) ?? Math.max(0, Math.min(P.max, P.start)) * P.life;
}
/** Its pips shown: whole ones, the draining one counting (0 to buffs.pips.max). */
export function pipCount(fuel: number, t: Tuning): number {
  const P = buffKnobs(t)?.pips;
  return P && P.life > 0 ? Math.max(0, Math.min(P.max, Math.ceil(fuel / P.life - 1e-9))) : 0;
}
/** Whether its draining pip is in its last buffs.pips.warn seconds (it twinkles in her stack). */
export function pipFading(fuel: number, t: Tuning): boolean {
  const P = buffKnobs(t)?.pips, n = pipCount(fuel, t);
  return !!P && n > 0 && fuel - (n - 1) * P.life <= P.warn + 1e-9;
}
/** Whether an adult goes for a berry for its pips: a pip short of buffs.pips.max (rules/berries.ts canEat). */
export const wantsPip = (c: Pick<Creature, "id" | "level" | "boss">, s: Pick<BerryState, "pips">, t: Tuning): boolean =>
  c.level === ADULT && !c.boss && !!buffKnobs(t) && pipCount(pipFuel(s, c.id, t), t) < (buffKnobs(t)!.pips.max);
/** A berry eaten by an adult: one more pip, up to buffs.pips.max (rules/berries.ts feed). */
export function addPip(s: Pick<BerryState, "pips">, id: number, t: Tuning): void {
  const P = buffKnobs(t)?.pips;
  if (!P) return;
  (s.pips ??= new Map()).set(id, Math.min(P.max * P.life, pipFuel(s, id, t) + P.life));
}
/** Her following adults' pips drain, one at a time, while they follow her (parked ones keep theirs). */
export function drainPips(s: Pick<BerryState, "pips">, stack: readonly number[], creatures: readonly Creature[], dt: number, t: Tuning): void {
  if (!buffKnobs(t)) return;
  for (const id of stack) {
    const c = creatures[id];
    if (!c || c.gone || c.level !== ADULT) continue;
    const f = pipFuel(s, id, t);
    if (f > 0) (s.pips ??= new Map()).set(id, Math.max(0, f - dt));
  }
}

// ---- her buffs ----

export interface Buffs {
  /** Each group's stack count. */
  stacks: BuffStacks;
  /** The creatures buffing her now (an adult with pips, a legend), with their group: their chains glow (render/leash/stack.ts). */
  givers: Map<number, BuffGroup>;
  /** One of them per kind, the one whose sigil shows its group's icon in her stack (a legend first, then the topmost). */
  icons: Set<number>;
}

/** Her buffs from her stack (`stack`: creature ids, top first): each adult with pips gives its group one stack for its kind, a legend
 *  buffs.legend (3) with no berries needed; per kind the most of those, so two of a kind, or a legend and an adult of its kind, count
 *  once; each group's count the sum over its kinds. */
export function buffsOf(stack: readonly number[], creatures: readonly Creature[], berries: Pick<BerryState, "pips">, t: Tuning): Buffs {
  const B = buffKnobs(t), stacks = noBuffs(), givers = new Map<number, BuffGroup>(), icons = new Set<number>();
  if (!B) return { stacks, givers, icons };
  const kinds = new Map<string, { group: BuffGroup; n: number; id: number }>();
  for (const id of stack) {
    const c = creatures[id];
    if (!c || c.gone) continue;
    const legend = c.level === LEGEND, n = legend ? B.legend : c.level === ADULT && pipFuel(berries, id, t) > 0 ? 1 : 0;
    if (n <= 0) continue;
    const group = groupOf(c.species, t);
    if (!group) continue;
    givers.set(id, group);
    const had = kinds.get(c.species);
    if (!had || n > had.n) kinds.set(c.species, { group, n, id });
  }
  for (const k of kinds.values()) { stacks[k.group] += k.n; icons.add(k.id); }
  return { stacks, givers, icons };
}

/** Her dashes: buffs.climbers.dash more charges a Climbers stack. */
export const dashBuff = (b: BuffStacks, t: Tuning): number => Math.round(b.climbers * (buffKnobs(t)?.climbers.dash ?? 0));
/** Her speed: times 1 + buffs.darters.speed a Darters stack. */
export const speedBuff = (b: BuffStacks, t: Tuning): number => 1 + b.darters * (buffKnobs(t)?.darters.speed ?? 0);
/** Ways her shots go round her (Heavies: 1 + buffs.heavies.shots a stack), each at that times her rate of fire. */
export const heavyWays = (b: BuffStacks, t: Tuning): number => Math.max(1, 1 + Math.round(b.heavies * (buffKnobs(t)?.heavies.shots ?? 0)));

const tuned = new WeakMap<Tuning, Map<string, Tuning>>();
/** Her 💌s' numbers with her buffs on (over her bag's: rules/bags.ts): Stalkers fly faster (speed) and further (range); Pack hunters
 *  fire faster (cooldown and burstGap over 1 + rate a stack) with more spread (inaccuracy, spread degrees more a stack); Heavies fire
 *  ways times as fast (their extra shots go round her: stepInvitesBuffed); Shells chain, chain more hops a stack, on top of the bag's. */
export function invitesBuffed(t: Tuning, b: BuffStacks): Tuning {
  const B = buffKnobs(t);
  if (!B || (!b.stalkers && !b.packHunters && !b.heavies && !b.shells)) return t;
  const key = `${b.stalkers},${b.packHunters},${b.heavies},${b.shells}`;
  let by = tuned.get(t);
  if (!by) tuned.set(t, (by = new Map()));
  const hit = by.get(key);
  if (hit) return hit;
  const I = t.invites, fast = (1 + b.packHunters * B.packHunters.rate) * heavyWays(b, t), far = 1 + b.stalkers * B.stalkers.range;
  const out = { ...t, invites: {
    ...I,
    speed: I.speed * (1 + b.stalkers * B.stalkers.speed), range: I.range * far,
    cooldown: I.cooldown / fast, burstGap: I.burstGap / fast,
    inaccuracy: (I.inaccuracy ?? 0) + b.packHunters * B.packHunters.spread,
    chain: (I.chain ?? 0) + Math.round(b.shells * B.shells.chain),
  } } as Tuning;
  by.set(key, out);
  return out;
}

/** Each witch's buffs this step, by her spells' and her invites' state (set by rules/game.ts before her step: setBuffs), for the
 *  two wrappers below, which game.ts calls in place of spells.ts speedMultiplier and invites.ts stepInvites. Recomputed every step
 *  from the game's state, so nothing here needs saving. */
const now = new WeakMap<object, BuffStacks>();
export function setBuffs(W: { spells: object; invites: object }, b: BuffStacks): void { now.set(W.spells, b); now.set(W.invites, b); }
export const buffsNow = (state: object): BuffStacks => now.get(state) ?? NO_BUFFS;

/** Her speed boost (rules/spells.ts speedMultiplier) times the Darters buff. */
export function speedMultiplierBuffed(s: SpellState, time: number, t: Tuning): number {
  return speedMultiplier(s, time, t) * speedBuff(buffsNow(s), t);
}

/** Her 💌s (rules/invites.ts stepInvites) with her buffs: their numbers (invitesBuffed), and with Heavies each new burst's aim turned
 *  a further 1/ways of a turn clockwise on the screen from her aim (Ed, 2026-11-03: "between each shot, a second shot in the opposite
 *  direction. Stacked: 3 shots go out clockwise at 120° at 3× rate of fire, 4 at 90° at 4×"), back to her aim when she lets go. */
export function stepInvitesBuffed(s: Invites, c: InviteControls, witch: { x: number; z: number; facing: number; vx?: number; vz?: number }, canFire: boolean, creatures: Creature[], A: Affection, time: number, dt: number, t: Tuning, ...rest: StepInvitesRest): void {
  const b = buffsNow(s), tb = invitesBuffed(t, b), ways = heavyWays(b, t);
  if (!c.fire || ways <= 1) s.turn = undefined;
  else if (canFire && s.queue.length === 0 && time >= s.readyAt) {
    // (the aim this burst takes, as stepInvites reckons it: her aim, else the way she's going, else facing)
    let ax = c.aimX ?? 0, az = c.aimZ ?? 0;
    if (Math.hypot(ax, az) <= 1e-3) { const vx = witch.vx ?? 0, vz = witch.vz ?? 0, v = Math.hypot(vx, vz); [ax, az] = v > 0.5 ? [vx, vz] : [witch.facing, 0]; }
    const k = (s.turn ?? 0) % ways, a = Math.atan2(az, ax) + (k / ways) * Math.PI * 2; // (+angle: clockwise on the screen, z down it)
    c = { ...c, aimX: Math.cos(a), aimZ: Math.sin(a) };
    s.turn = k + 1;
  }
  stepInvites(s, c, witch, canFire, creatures, A, time, dt, tb, ...rest);
}
type StepInvitesRest = Parameters<typeof stepInvites> extends [unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, ...infer R] ? R : never;
