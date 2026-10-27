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
    hostile(side, t, friendly, species, caster) {
      if (t.kind === "witch") return huntsWitch(side as never);
      if (t.kind === "sound") return side === "enraged";
      if (t.id === caster) return false;
      return friendly || (foes(t.side as never, side as never) && t.species !== species);
    },
    harm(t, damage, effect, fx, fz, source, attack) {
      const from = w.creatures[source] ?? null, tg: Target = t.kind === "creature" ? { kind: "creature", id: t.id as number } : t.kind === "witch" ? { kind: "witch", id: t.id as number } : { kind: "sound", key: t.id as string };
      const own = attackNamed(attack, data) as Attack | undefined; // (a named attack today's runtime knows lands as itself; any other by its effect)
      land(w, s, from, tg, damage, own ?? blowOf(effect, "shot"), fx, fz);
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
