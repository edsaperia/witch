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
import { type Hittable, type SpellWorld } from "./engine";
import type { AttackSpec, Effect } from "./types";

/** The flat record the fight's movement reads for an attack in the grammar (how near it wants to be, its windup and cooldown, how
 *  it's delivered, for its approach and kiting): not what it does, which is the engine's. */
export function asFightAttack(a: AttackSpec): Attack {
  const kind = a.body?.kind ?? "bolt";
  const delivery: Delivery = kind === "melee" ? "melee" : kind === "lob" || kind === "mine" || kind === "seed" ? "lob" : kind === "beam" ? "beam" : kind === "area" || kind === "zone" ? (a.area?.at === "target" ? "lob" : "pulse") : "shot";
  return { delivery, range: a.cast?.range ?? 20, windup: a.cast?.windup ?? 0.6, cooldown: a.cast?.cooldown ?? 2, modifier: "none", radius: a.area?.r ?? a.body?.radius, speed: a.speed?.v };
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
    harm(t, damage, effect, fx, fz, source, attack) {
      const from = w.creatures[source] ?? null, tg: Target = t.kind === "creature" ? { kind: "creature", id: t.id as number } : t.kind === "witch" ? { kind: "witch", id: t.id as number } : { kind: "sound", key: t.id as string };
      // (a blow lands as any does, a named attack today's runtime knows as itself, any other by its knockback or slow; whatever else its
      // effect does (and all of it, on a touch with no damage: a slowing puddle on her doesn't cost her a hit) after it)
      let done: keyof Effect | null = null;
      if (damage > 0) {
        const own = attackNamed(attack, data) as Attack | undefined, blow = own ?? blowOf(effect, "shot");
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
    stillCasting(source, cast) { const c = w.creatures[source]; return !!c && !c.gone && !(c.stunUntil !== undefined && w.time < c.stunUntil) && c.fight?.spellCast === cast && !!c.fight.target; },
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
