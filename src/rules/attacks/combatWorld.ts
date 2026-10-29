// The composable attacks' engine (rules/attacks/engine.ts) inside today's fight (rules/combat.ts): a creature given an attack in the
// grammar (`Creature.spell`: the Fight Arena's, ?attack=; no species has one until Ed says which) winds up as any does, its telegraphs
// shown and its cast queued with the engine as its windup starts, and released by the engine at its end; what it hits lands as any blow
// does (rules/combat/hits.ts land: counters, knockback, slows, the witch's hits). Everything else fights exactly as before.
import type { Creature, Level } from "../creatures";
import { foes, huntsWitch } from "../creatureStates";
import { attackNamed, type Attack, type CombatData, type CombatState, type CombatWorld, type Delivery, type Target } from "../combat/data";
import { land } from "../combat/hits";
import { sideOf, targetable, type Grid } from "../combat/targeting";
import { strengthOf } from "../combat/data";
import { withBase, type Library } from "./parse";
import { speciesAttack } from "./species";
import { lifeRange, lifeTime, speedAt, type Hittable, type SpellWorld } from "./engine";
import type { AttackSpec, Effect } from "./types";

/** The flat record the fight's movement reads for an attack in the grammar (how near it wants to be, its windup and cooldown, how
 *  it's delivered, for its approach and kiting): not what it does, which is the engine's. */
export function asFightAttack(a: AttackSpec): Attack {
  const kind = a.body?.kind ?? "bolt";
  const delivery: Delivery = kind === "melee" ? "melee" : kind === "lob" || kind === "mine" || kind === "seed" ? "lob" : kind === "beam" ? "beam" : kind === "area" || kind === "zone" ? (a.area?.at === "target" ? "lob" : "pulse") : "shot";
  const out: Attack = { delivery, range: a.cast?.range ?? (kind === "melee" ? 2 : 20), windup: a.cast?.windup ?? 0.6, cooldown: a.cast?.cooldown ?? 2, modifier: "none", radius: a.area?.r ?? a.body?.radius, speed: a.speed?.v };
  // (a melee one is the fight's own lunge, landing as a blow does: its knockback or slow as the blow's modifier, the rest after it)
  if (kind === "melee") { out.lunge = a.body?.lunge ?? 12; Object.assign(out, blowOf(a.hit?.effect, "melee")); out.range = a.cast?.range ?? 2; out.windup = a.cast?.windup ?? 0.6; out.cooldown = a.cast?.cooldown ?? 2; }
  return out;
}

/** How far a thrown body (a bolt or a runner) really gets: its speed over its life, no further than its life's range (a slowing or
 *  stop-and-go one may run out of time first); anything else (a lob, a mine, an area, a beam) goes where it's aimed: Infinity. */
export function bodyReach(a: AttackSpec): number {
  const kind = a.body?.kind ?? "bolt";
  if (kind !== "bolt" && kind !== "runner") return Infinity;
  const R = lifeRange(a), T = lifeTime(a, speedAt(a, 0)), dt = 1 / 60;
  let d = 0;
  for (let t = 0; t < T && d < R; t += dt) d += speedAt(a, t) * dt;
  return Math.min(d, R);
}

/** A thrown attack at her reaching `k` times as far (tuning dodge.b.range; Ed, 2026-10-09: "I think shooters should have longer
 *  range"): its cast's range and its life's both, the rest as it is (its children, its speed). The fight already lets a shooter fire
 *  at her from k times its range; without this its bolt still ended at its own (Ed's playtest, 2026-10-29: "ranged weapons from
 *  creatures that I encountered seem to have a very short range"). */
export function reachingFurther(a: AttackSpec, k: number): AttackSpec {
  if (k === 1) return a;
  return { ...a, cast: { ...a.cast, range: (a.cast?.range ?? 20) * k }, life: { ...a.life, range: lifeRange(a) * k } };
}

/** A creature's attack in the grammar, if it has one: its name, the flat record for its movement, the damage of a cast (the level's
 *  budget for its cooldown, as attackOf's), and the attack itself. */
export function spellAttack(c: Creature, lib: Library, data: CombatData): { name: string; attack: Attack; damage: number; spec: AttackSpec } | null {
  if (!c.spell || c.level === 0) return null;
  const raw = lib[c.spell];
  if (!raw) return null;
  const spec = withBase(raw, lib), attack = asFightAttack(spec);
  return { name: c.spell, attack, damage: data.levels.dps[c.level as Level] * strengthOf(c.species, c.level as Level, data) * attack.cooldown, spec };
}

/** A species' own attack in the grammar (rules/attacks/species.ts), unless the tuning's attacks.species is off (?attacks=old): as
 *  spellAttack's, named "species:<kind>". */
export function speciesSpell(c: Creature, data: CombatData, floor?: number): { name: string; attack: Attack; damage: number; spec: AttackSpec } | null {
  const spec = speciesAttack(c.species, c.level, floor);
  if (!spec) return null;
  const attack = asFightAttack(spec);
  return { name: `species:${c.species}`, attack, damage: data.levels.dps[c.level as Level] * strengthOf(c.species, c.level as Level, data) * attack.cooldown, spec };
}

/** A melee attack's blow landed (the fight's lunge): the rest of its effect (a stun, a root, a pull, a burn) on what it hit. */
export function meleeExtras(w: CombatWorld, s: CombatState, tg: Target, spec: AttackSpec, fx: number, fz: number): void {
  const e = spec.hit?.effect, t = hittableOf(w, s, tg);
  if (!e || !t) return;
  const { knockback: _k, slow: _s, ...rest } = e;
  if (Object.keys(rest).length) effects(w, s, t, rest, null, fx, fz);
}

/** How a body's hit counts against the fight's counters (a flier dodging melee, armour turning shots, lobs and beams, a swarm
 *  taking area hits double). */
const deliveryOf = (body: string | undefined): Delivery => body === "melee" ? "melee" : body === "area" || body === "zone" ? "pulse" : body === "lob" || body === "mine" || body === "seed" ? "lob" : body === "beam" ? "beam" : "shot";

/** The flat record a hit lands with (rules/combat/hits.ts reads its delivery for counters, and its modifier). Stun, pull, root and
 *  burn aren't landed yet (the plan's step 3). */
function blowOf(effect: Effect | undefined, delivery: Delivery): Attack {
  const A: Attack = { delivery, range: 0, windup: 0, cooldown: 0, modifier: "none" };
  if (effect?.knockback !== undefined) { A.modifier = "knockback"; A.knockback = effect.knockback; }
  else if (effect?.slow) { A.modifier = "slow"; A.slowMult = effect.slow.mult; A.slowTime = effect.slow.time; }
  return A;
}

/** An effect's parts on what it touched, all but `done` (the one its blow landed already): a creature knocked, slowed, stunned (rooted
 *  too, for now: DECISION FOR ED), pulled toward (fx, fz); her thrown, slowed, staggered, rooted (all but stopped) or pulled, none of it
 *  costing her a hit. */
function effects(w: CombatWorld, s: CombatState, t: Hittable, e: Effect, done: keyof Effect | null, fx: number, fz: number): void {
  const time = w.time, dx = t.x - fx, dz = t.z - fz, d = Math.hypot(dx, dz) || 1;
  if (t.kind === "creature") {
    const o = w.creatures[t.id as number];
    if (!o || o.gone) return;
    if (e.knockback !== undefined && done !== "knockback" && !o.boss) { o.kx = (dx / d) * e.knockback * 6; o.kz = (dz / d) * e.knockback * 6; }
    if (e.pull !== undefined && !o.boss) { const m = Math.min(e.pull, d - 1); o.kx = (-dx / d) * m * 6; o.kz = (-dz / d) * m * 6; }
    if (e.slow && done !== "slow") o.slowUntil = Math.max(o.slowUntil ?? 0, time + e.slow.time);
    const still = Math.max(e.stun ?? 0, e.root ?? 0);
    if (still > 0 && !o.boss) { o.stunUntil = Math.max(o.stunUntil ?? 0, time + still); if (e.stun && o.fight) o.fight.windupUntil = 0; s.events.push({ kind: "stunned", x: o.x, z: o.z, at: time, id: o.id }); }
  } else if (t.kind === "witch") {
    const id = t.id as number;
    if (e.knockback !== undefined && done !== "knockback") w.throwWitch?.(id, fx, fz, e.knockback);
    if (e.pull !== undefined) w.packWorld?.pull?.(id, fx, fz, e.pull);
    if (e.slow && done !== "slow") w.slowWitch?.(id, time + e.slow.time, e.slow.mult);
    if (e.stun) w.stunWitch?.(id, time + e.stun);
    if (e.root) w.slowWitch?.(id, time + e.root, 0.05);
  }
}

/** The engine's world, as the fight sees it this step. */
export function spellWorld(w: CombatWorld, s: CombatState, grid: Grid, seed: number, data: CombatData): SpellWorld {
  const out: Hittable[] = [];
  return {
    seed,
    near(x, z, r) {
      out.length = 0;
      for (const o of grid.near(x, z, r)) if (targetable(o) && !w.asleep(o)) out.push({ kind: "creature", id: o.id, x: o.x, z: o.z, r: 0.4 + o.level * 0.2, side: sideOf(o), species: o.species, vx: o.vx, vz: o.vz });
      for (const v of w.witches) if (v.onGround && !v.down && Math.hypot(v.x - x, v.z - z) <= r + 1) out.push({ kind: "witch", id: v.id, x: v.x, z: v.z, r: 0.3, side: "party", vx: v.vx, vz: v.vz });
      for (const [key, h] of s.sounds) if (h.hp > 0 && Math.hypot(h.x - x, h.z - z) <= r + h.radius) out.push({ kind: "sound", id: key, x: h.x, z: h.z, r: h.radius, side: "sound" });
      return out;
    },
    hostile(side, t, species, caster) {
      if (t.kind === "witch") return huntsWitch(side as never);
      if (t.kind === "sound") return side === "enraged";
      if (t.id === caster) return false;
      return foes(t.side as never, side as never) && t.species !== species;
    },
    harm(t, damage, effect, fx, fz, source, attack, body) {
      const from = w.creatures[source] ?? null, tg: Target = t.kind === "creature" ? { kind: "creature", id: t.id as number } : t.kind === "witch" ? { kind: "witch", id: t.id as number } : { kind: "sound", key: t.id as string };
      // (a blow lands as any does, a named attack today's runtime knows as itself, any other by its knockback or slow; whatever else its
      // effect does (and all of it, on a touch with no damage: a slowing puddle on her doesn't cost her a hit) after it)
      let done: keyof Effect | null = null;
      if (damage > 0) {
        const own = attackNamed(attack, data) as Attack | undefined, blow = own ?? blowOf(effect, deliveryOf(body));
        land(w, s, from, tg, damage, blow, fx, fz);
        done = blow.modifier === "knockback" ? "knockback" : blow.modifier === "slow" ? "slow" : null;
      }
      if (effect) effects(w, s, t, effect, done, fx, fz);
    },
    force(t, fx, fz, push, dt) {
      const dx = t.x - fx, dz = t.z - fz, d = Math.hypot(dx, dz) || 1, step = push * dt, k = push < 0 ? Math.max(step, -(d - 0.5)) / d : step / d; // (a pull stops short of its middle)
      if (t.kind === "creature") { const c = w.creatures[t.id as number]; if (c && !c.gone && !c.boss) { c.x += dx * k; c.z += dz * k; } }
      else if (t.kind === "witch") w.nudgeWitch?.(t.id as number, dx * k, dz * k);
    },
    where(kind, id) {
      if (kind === "creature") { const c = w.creatures[id as number]; return c && !c.gone ? c : null; }
      if (kind === "witch") return w.witches.find(v => v.id === id) ?? null;
      return s.sounds.get(id as string) ?? null;
    },
    packmates(source, x, z, r) {
      // (its own kind on its own side, awake and able to fight, nearest first)
      const c = w.creatures[source];
      if (!c) return [];
      const side = sideOf(c), mates: Creature[] = [];
      for (const o of grid.near(x, z, r)) if (o.id !== source && o.species === c.species && targetable(o) && !w.asleep(o) && sideOf(o) === side && Math.hypot(o.x - x, o.z - z) <= r) mates.push(o);
      return mates.sort((p, q) => Math.hypot(p.x - x, p.z - z) - Math.hypot(q.x - x, q.z - z) || p.id - q.id);
    },
    stillCasting(source, cast) { const c = w.creatures[source]; return !!c && !c.gone && !(c.stunUntil !== undefined && w.time < c.stunUntil) && (c.fight?.spellCast === cast || !!c.fight?.spellCasts?.includes(cast)) && !!c.fight?.target && !c.charge && !c.leap && !c.burrow && !(c.swoop && (c.swoop.phase === "tele" || c.swoop.phase === "dive")); }, // (off on its own move instead: dropped)
    beat: 60 / w.t.beat.bpm,
  };
}

/** What a creature's cast aims at: its fight's target, as the engine sees it. */
export function hittableOf(w: CombatWorld, s: CombatState, tg: Target | null): Hittable | null {
  if (!tg) return null;
  if (tg.kind === "creature") { const c = w.creatures[tg.id]; return c ? { kind: "creature", id: c.id, x: c.x, z: c.z, r: 0.4 + c.level * 0.2, side: sideOf(c), species: c.species } : null; }
  if (tg.kind === "witch") { const v = w.witches.find(q => q.id === tg.id); return v ? { kind: "witch", id: v.id, x: v.x, z: v.z, r: 0.3, side: "party" } : null; }
  const h = s.sounds.get(tg.key);
  return h ? { kind: "sound", id: tg.key, x: h.x, z: h.z, r: h.radius, side: "sound" } : null;
}
