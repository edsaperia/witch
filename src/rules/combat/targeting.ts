// Combat's targeting (split from rules/combat.ts, no change in behaviour): who's in a fight and who may be hit, who's
// whose foe, finding the nearest it may attack (the grid), whether a target's still worth chasing, and closing in on it.
import { type Creature } from "../creatures";
import { foes, huntsWitch, stateOf, type State } from "../creatureStates";
import { LEGENDS } from "../legends";
import { bodyRadius } from "../spacing";
import { FIGHT, profileOf } from "../movement";
import { type Delivery, type Target, type CombatState, attackOf, type CombatWorld } from "./data";

/** Whether a creature takes part in fights now: alive, not wandering home neutral, not asleep. */
export const fighting = (c: Creature) => !c.gone && !c.asleep && !c.bed && !c.fleeUntil && !c.wanderTo && !c.dazed && !(c.leashed && c.travelling); // (a dazed one lies still: rules/creatureStates.ts) // (a travelling party animal is quiet both ways: rules/travel.ts)

/** Whether anything may attack it: fighting, and not a baby (Ed, 2026-10-04: "No animals should
 *  attack babies"; shots and quakes pass them by, and they can't be beaten in a fight). */
export const targetable = (c: Creature) => fighting(c) && c.level > 0 && !c.burrow && !c.partyLegend && !c.asleep; // (a party legend's out of it all: the Easter egg) // (a burrower underground can't be hit)

/** Whose side: hers (on her leash, at a sigil, or a happy area legend: Ed, 2026-10-04) or the wild's. */
export const sideOf = (c: Creature): State => stateOf(c); // (its state: who fights whom is foes(), rules/creatureStates.ts)

/** Same kind never fights same kind (Ed, 2026-10-04), on any side. */
export const truce = (a: Creature, b: Creature) => a.species === b.species;

/** How much of a blow a creature takes for how it's holding itself (Ed's species pass): curled up
 *  rolling, dug in or braced behind its tail; and whether it's rooted (no knockback). */
export function guardOf(o: Creature, delivery: Delivery, time: number): { damage: number; rooted: boolean } {
  if (o.charge?.curl) return { damage: o.charge.curl, rooted: false };
  const P = profileOf(o.species)?.move;
  if (o.dug !== undefined && time < o.dug) return { damage: P?.armour ?? 0.5, rooted: true };
  if (o.brace !== undefined && time < o.brace) return { damage: delivery === "melee" ? 0.5 : P?.armour ?? 0.15, rooted: true };
  return { damage: 1, rooted: false };
}

export function targetPos(w: CombatWorld, s: CombatState, tg: Target): { x: number; z: number; r: number } | null {
  if (tg.kind === "creature") { const c = w.creatures[tg.id]; return c && !c.gone ? { x: c.x, z: c.z, r: Math.max(0.6 + c.level * 0.25, bodyRadius(c) + 0.3) } : null; } // (its body, so a blow reaches a big one that spacing keeps at arm's length)
  if (tg.kind === "witch") { const v = w.witches[tg.id]; return v && v.onGround && !v.down ? { x: v.x, z: v.z, r: 0.5 } : null; }
  const h = s.sounds.get(tg.key);
  return h && h.hp > 0 ? { x: h.x, z: h.z, r: h.radius } : null;
}

/** Which way a target is heading (a unit vector), or null if it's about still. */
export function headingOf(w: CombatWorld, tg: Target): { x: number; z: number } | null {
  const v = tg.kind === "witch" ? w.witches[tg.id] : tg.kind === "creature" ? w.creatures[tg.id] : null;
  const vx = v?.vx ?? 0, vz = v?.vz ?? 0, m = Math.hypot(vx, vz);
  return m > 1.5 ? { x: vx / m, z: vz / m } : null;
}

/** Lights within R of a creature: glow-worms and soundsystems (moths are drawn to them). */
export function lightsNear(w: CombatWorld, s: CombatState, c: Creature, R: number): { x: number; z: number }[] {
  const out: { x: number; z: number }[] = [];
  for (const o of w.active) if (o !== c && o.species === "glowworm" && !o.gone && Math.abs(o.x - c.x) < R && Math.abs(o.z - c.z) < R) out.push(o);
  for (const h of s.sounds.values()) if (h.hp > 0 && Math.hypot(h.x - c.x, h.z - c.z) < R) out.push(h);
  return out;
}

/** Whether a target is still worth fighting for this creature. */
/** Whether (x, z) is more than combat.leaveArea metres past the creature's area's edge (Ed,
 *  2026-10-05): outside its area, and still outside it that far back toward its home. */
export function pastEdge(w: CombatWorld, c: Creature, x: number, z: number): boolean {
  if (w.inArea(c, x, z)) return false;
  const hx = c.anchorX - x, hz = c.anchorZ - z, hd = Math.hypot(hx, hz) || 1, L = Math.min(hd, w.t.combat.leaveArea * FIGHT.scale);
  return !w.inArea(c, x + (hx / hd) * L, z + (hz / hd) * L);
}

/** She's in a calm legend's circle and c isn't its legend (Ed, round 14: "I got attacked by a wild creature when in a legend
 *  circle; I think they shouldn't attack you from outside when you're in there"): c can't go for her, and nothing of its lands. */
export const sheltered = (v: CombatWorld["witches"][number], c: Creature | null) => v.shelter !== undefined && c?.id !== v.shelter;

/** The creature she's inviting (Ed, 2026-10-04): her party leaves it be while they chat. */
export const inviting = (w: CombatWorld, c: Creature, o: Creature) => !huntsWitch(sideOf(c)) && w.talkingTo(o.id) >= 0;

/** Why a wild one lost its target, if it's a chase it gives up (not one she's inviting, a fall, a knockout):
 *  she's risen to the treetops, or it (her or a party animal) is past its band beyond its area's edge. */
export function gaveUp(w: CombatWorld, c: Creature, tg: Target): boolean {
  if (tg.kind === "witch" && c.hunting === tg.id) return false; // (a hunter never gives her up: rules/hunt.ts)
  if (tg.kind === "witch") { const v = w.witches[tg.id]; return !!v && !v.down && (!v.onGround || sheltered(v, c) || pastEdge(w, c, v.x, v.z)); }
  if (tg.kind === "creature") { const o = w.creatures[tg.id]; return !!o && !o.gone && pastEdge(w, c, o.x, o.z); }
  return false;
}

export function valid(w: CombatWorld, s: CombatState, c: Creature, tg: Target): boolean {
  if (tg.kind === "creature") {
    const o = w.creatures[tg.id];
    if (o && sideOf(c) === "wild" && !c.siege && !c.leashed && pastEdge(w, c, o.x, o.z)) return false; // (her party past the band too: it gives up, Ed 2026-10-06)
    return !!o && targetable(o) && foes(sideOf(o), sideOf(c)) && !truce(c, o) && !w.asleep(o) && !inviting(w, c, o);
  }
  if (tg.kind === "witch") {
    // A wild one loses her when she rises, or (Ed, 2026-10-05: "wild creatures shouldn't pursue you
    // very far outside of their area") once she's combat.leaveArea metres past its area's edge
    // (Ed, 2026-10-06: 30 m); then it gives up and retreats into its area (c.retreat, stepCombat). A besieger keeps the old rule: out of its area, out of its
    // attack range and at least combat.witchLose away. (Only wild ones go for her at all.)
    const v = w.witches[tg.id];
    if (!huntsWitch(sideOf(c)) || !v || !v.onGround || v.down || w.talkingTo(c.id) === tg.id || sheltered(v, c)) return false;
    if (c.hunting === tg.id) return true; // (hunting her: however far past its area's edge, rules/hunt.ts)
    if (!c.siege) return !pastEdge(w, c, v.x, v.z);
    const d = Math.hypot(v.x - c.x, v.z - c.z), range = attackOf(c.species, c.level)?.attack.range ?? 0;
    return !(d > range && d >= w.t.combat.witchLose * FIGHT.scale && !w.inArea(c, v.x, v.z));
  }
  return !c.leashed && (s.sounds.get(tg.key)?.hp ?? 0) > 0;
}

/** What a creature goes for: the nearest enemy within `range` of (x, z), of the other side and
 *  another kind, never a baby. A wild one goes for a witch on the ground once she's within its
 *  attack range or she's on the ground in its area (Ed's playtest, 2026-10-04). A party animal following her takes on only
 *  what attacks her or her party (Ed: they engage anything that attacks the witch or them); a
 *  parked one, anything within guard.radius of its sigil. */
export function acquire(w: CombatWorld, c: Creature, x: number, z: number, range: number, attackRange: number, grid: Grid, guarding: boolean, keep?: (o: Creature) => boolean): Target | null {
  // A hunter goes for her and nothing else, wherever she is (rules/hunt.ts): none while she's out of its reach (over the
  // treetops, knocked out, sheltered in a calm circle) or inviting it.
  if (c.hunting !== undefined && huntsWitch(sideOf(c))) {
    const v = w.witches[c.hunting];
    return v && v.onGround && !v.down && !sheltered(v, c) && w.talkingTo(c.id) !== v.id ? { kind: "witch", id: v.id } : null;
  }
  // (an enraged one goes for a happy legend within legends.attack.wornReach: it wears it down)
  const legReach = sideOf(c) === "enraged" ? LEGENDS.attack.wornReach * FIGHT.scale : 0;
  let best: Target | null = null, bd = Math.max(range, legReach);
  for (const o of grid.near(x, z, Math.max(range, legReach))) {
    if (o === c || !targetable(o) || !foes(sideOf(o), sideOf(c)) || truce(c, o) || w.asleep(o) || inviting(w, c, o) || (keep && !keep(o))) continue;
    if (Math.hypot(o.x - x, o.z - z) > range && !(o.boss && o.legendState === "happy")) continue;
    if (c.leashed && !guarding) {
      const tg = o.fight?.target;
      if (!tg || (tg.kind !== "witch" && !(tg.kind === "creature" && w.creatures[tg.id]?.leashed))) continue;
    }
    const d = Math.hypot(o.x - x, o.z - z);
    if (d < bd) { bd = d; best = { kind: "creature", id: o.id }; }
  }
  if (huntsWitch(sideOf(c)) && !(c.watchUntil !== undefined && w.time < c.watchUntil)) for (const v of w.witches) { // (not while it's still watching her: rules/wildWatch.ts)
    if (!v.onGround || v.down || w.talkingTo(c.id) === v.id || sheltered(v, c)) continue; // (the one she's inviting holds its fire on her; in a legend's circle she's safe)
    const d = Math.hypot(v.x - c.x, v.z - c.z);
    if ((w.inArea(c, v.x, v.z) || (d < attackRange && (c.siege || !pastEdge(w, c, v.x, v.z)))) && (!best || d < bd)) { bd = d; best = { kind: "witch", id: v.id }; }
  }
  return best;
}

/** A coarse grid of the fighting creatures, rebuilt each step, so finding enemies near one is cheap. */
export class Grid {
  private cells = new Map<number, Creature[]>();
  constructor(list: Creature[], private size = 16) {
    for (const c of list) { const k = this.key(Math.floor(c.x / size), Math.floor(c.z / size)); let l = this.cells.get(k); if (!l) this.cells.set(k, (l = [])); l.push(c); }
  }
  // (small-integer keys: a cell's i, j stay well inside ±16384 of a 16 m grid, so the key fits V8's Smi range and Map
  // lookups don't box it; the old (i + 65536) * 131072 + ... made a heap number a lookup; phase 2's GC audit)
  private key(i: number, j: number) { return (i + 16384) * 32768 + (j + 16384); }
  /** Those in the cells round (x, z), in the same order as ever. (An array, not a generator: yielding
   *  each one made an object for every creature looked at, a third of the rules' garbage late in a run.) */
  near(x: number, z: number, r: number): Creature[] {
    const s = this.size, out: Creature[] = [];
    for (let j = Math.floor((z - r) / s); j <= Math.floor((z + r) / s); j++)
      for (let i = Math.floor((x - r) / s); i <= Math.floor((x + r) / s); i++) { const l = this.cells.get(this.key(i, j)); if (l) for (let k = 0; k < l.length; k++) out.push(l[k]); }
    return out;
  }
}

/** Move a creature toward (x, z) at `speed`, by up to `dt`; returns how far it still is. */
export function moveToward(c: Creature, x: number, z: number, stopAt: number, speed: number, dt: number): number {
  const dx = x - c.x, dz = z - c.z, d = Math.hypot(dx, dz);
  if (d <= stopAt) { c.moving = false; return d; }
  const step = Math.min(d - stopAt, speed * dt);
  c.x += (dx / d) * step; c.z += (dz / d) * step;
  if (Math.abs(dx) > 0.02) c.facing = dx > 0 ? 1 : -1;
  c.away = dz < -Math.abs(dx);
  c.moving = true;
  c.walk += dt * 5;
  return d - step;
}

/** The soundsystem a siege goes for next: the nearest still standing, from (x, z). */
export function nearestSound(s: CombatState, x: number, z: number): string | null {
  let best: string | null = null, bd = Infinity;
  for (const [key, h] of s.sounds) { if (h.hp <= 0) continue; const d = Math.hypot(h.x - x, h.z - z); if (d < bd) { bd = d; best = key; } }
  return best;
}
