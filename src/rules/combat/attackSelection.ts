// Resolve the selected weapon before planning movement. Grammar trees are not flattened into old bolts.
import type {Creature} from "../creatures";
import type {CombatData} from "./data";
import {packAttack, type Directive, type PackKind} from "./packs";
import {speciesSpell, asFightAttack} from "../attacks/combatWorld";
import {adultImpact} from "../attacks/species";
import {liftToFloor} from "../attacks/timeline";
import type {AttackSpec} from "../attacks/types";
import {fromLegacy} from "../attacks/legacy";

type Spell = NonNullable<ReturnType<typeof speciesSpell>>;
const MADE = new WeakMap<object, Map<string, Spell>>();
/** Any fallback ranged weapon also runs through the grammar and its effect renderer. */
function rangedWeapon(c: Creature, kind: PackKind, floor?: number): Spell | null {
  const packet = packAttack(c.species, c.level, "ranged");
  if (!packet) return null;
  let by = MADE.get(packet.attack); if (!by) MADE.set(packet.attack, by = new Map());
  const key = `${packet.name}/${floor ?? ""}`; const cached = by.get(key); if (cached) return cached;
  const a = packet.attack;
  let spec: AttackSpec = {
    ...fromLegacy(a),
    note: kind.ranged?.name,
    emit: {pattern: packet.shots > 1 ? "fan" : "single", n: packet.shots, angle: packet.spread * 180 / Math.PI},
    life: {range: a.range * 1.3},
  };
  if (c.level === 2) spec = adultImpact(spec);
  spec = liftToFloor(spec, {}, floor);
  const result = {name: packet.name, spec, attack: asFightAttack(spec), damage: packet.damage};
  by.set(key, result); return result;
}
export function resolveActionSpell(c: Creature, data: CombatData, kind: PackKind | null, directive?: Directive, floor?: number): Spell | null {
  const own = speciesSpell(c, data, floor);
  if (!directive || !kind) return own;
  if (directive.action?.delivery === "effect") return null;
  if (directive.action?.attack === "species") return own;
  if (directive.move === "ranged") {
    const close = own && (own.attack.delivery === "melee" || own.attack.delivery === "pulse");
    return own && !close ? own : rangedWeapon(c, kind, floor);
  }
  return own && (own.attack.delivery === "melee" || own.attack.delivery === "pulse") ? own : null;
}
