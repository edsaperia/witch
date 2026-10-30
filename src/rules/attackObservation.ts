// Optional headless diagnostics. No references to live state escape through the callback.
import type { CombatState, CombatWorld, Target } from "./combat/data";
import { drainOf, fillOf } from "./orbit";
import { sheltered } from "./combat/targeting";

export interface WitchHitState {
  hp: number; hurtAt: number; down: boolean; dashing: boolean; damageEnabled: boolean; stunUntil: number; slowUntil: number; slowMult: number;
  x: number; z: number; kx: number; kz: number;
}
export interface AttackContext {
  source: number | null; attack: string | null; delivery: string;
  phase: "contact" | "damage" | "effect" | "self-miss";
  definition?: string;
  cast?: number; body?: number; zone?: number; beam?: number;
}
export interface AttackOutcome extends AttackContext {
  time: number; targetKind: Target["kind"]; targetId: number | string; damageRequested: number;
  damageAccepted: boolean | null; healthLost: number | null; orbitAdded: number | null;
  stunApplied: boolean | null; damageDodged: boolean | null; slowApplied: boolean | null;
  movementChanged: boolean | null; sheltered: boolean;
}
type Observer = (outcome: Readonly<AttackOutcome>) => void;
const observers = new WeakMap<CombatState, { callback: Observer; errors: number }>();

/** Returns a disposer that cannot remove a newer registration. Neither hook nor errors enter game state. */
export function observeAttacks(state: CombatState, callback: Observer): () => void {
  const entry = { callback, errors: 0 };
  observers.set(state, entry);
  return () => { if (observers.get(state) === entry) observers.delete(state); };
}
export const attackObserverErrors = (state: CombatState): number => observers.get(state)?.errors ?? 0;
export const observingAttacks = (state: CombatState): boolean => observers.has(state);

function snapshot(w: CombatWorld, tg: Target) {
  if (tg.kind === "witch") {
    const value = w.witchHitState?.(tg.id);
    return value ? { ...value, fill: null, gone: value.down, dazed: false, legend: "" } : null;
  }
  if (tg.kind === "sound") return null; // sound health is read from CombatState below
  const c = w.creatures[tg.id];
  return c ? { hp: null, hurtAt: null, down: false, dashing: false, damageEnabled: true,
    fill: fillOf(c, w.time, drainOf(w.t)).fill, gone: !!c.gone || !!c.ranOff, dazed: !!c.dazed, legend: c.legendState ?? "",
    stunUntil: c.stunUntil ?? 0, slowUntil: c.slowUntil ?? 0, slowMult: 1,
    x: c.x, z: c.z, kx: c.kx ?? 0, kz: c.kz ?? 0 } : null;
}

/** Observes the actual mutation, not the engine's geometric contact. Unknown ports remain null. */
export function observeAttack(w: CombatWorld, state: CombatState, target: Target, context: AttackContext, damage: number, apply: () => void): void {
  const entry = observers.get(state);
  if (!entry) { apply(); return; }
  const read = () => {
    try { return target.kind === "sound" ? state.sounds.get(target.key)?.hp ?? null : snapshot(w, target); }
    catch { entry.errors++; return null; }
  };
  const before = read();
  const witch = target.kind === "witch" ? w.witches.find(v => v.id === target.id) : undefined;
  const protectedByShelter = !!witch && sheltered(witch, context.source === null ? null : w.creatures[context.source] ?? null);
  apply();
  const after = read();
  let healthLost: number | null = null, orbitAdded: number | null = null;
  let damageAccepted: boolean | null = damage <= 0 || protectedByShelter ? false : null;
  let stunApplied: boolean | null = null, damageDodged: boolean | null = null;
  let slowApplied: boolean | null = null, movementChanged: boolean | null = null;
  if (typeof before === "number" && typeof after === "number") {
    healthLost = Math.max(0, before - after); damageAccepted = damage > 0 && healthLost > 0;
    stunApplied = damageDodged = slowApplied = movementChanged = false;
  } else if (before && after && typeof before === "object" && typeof after === "object") {
    healthLost = before.hp === null || after.hp === null ? null : Math.max(0, before.hp - after.hp);
    orbitAdded = before.fill === null || after.fill === null ? null : Math.max(0, after.fill - before.fill);
    damageAccepted = damage > 0 && ((healthLost ?? 0) > 0 || (orbitAdded ?? 0) > 1e-12 || after.hurtAt !== before.hurtAt || after.gone !== before.gone || after.dazed !== before.dazed || after.legend !== before.legend);
    stunApplied = after.stunUntil > 0 && after.stunUntil !== before.stunUntil || !before.dazed && after.dazed;
    damageDodged = damage > 0 && before.damageEnabled && !before.down && before.dashing && !protectedByShelter && !damageAccepted;
    slowApplied = after.slowUntil > 0 && after.slowUntil !== before.slowUntil || after.slowMult < before.slowMult;
    movementChanged = after.x !== before.x || after.z !== before.z || after.kx !== before.kx || after.kz !== before.kz;
  }
  const outcome: Readonly<AttackOutcome> = Object.freeze({ source: context.source, attack: context.attack,
    delivery: context.delivery, phase: context.phase, definition: context.definition, cast: context.cast, body: context.body, zone: context.zone, beam: context.beam,
    time: w.time, targetKind: target.kind,
    targetId: target.kind === "sound" ? target.key : target.id, damageRequested: damage,
    damageAccepted, healthLost, orbitAdded, stunApplied, damageDodged, slowApplied, movementChanged, sheltered: protectedByShelter });
  try { entry.callback(outcome); } catch { entry.errors++; } // a failed diagnostic must not change the fight
}
