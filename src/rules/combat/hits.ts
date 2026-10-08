// Combat's hits (split from rules/combat.ts, no change in behaviour): a blow, shot or area landing on the witch, a
// soundsystem or a creature (its traits, guard, knockback, stun and slow), and what follows a knockdown: a legend lulled
// to sleep, a wild one dazed, anything else running off the map.
import { LEGEND, type Creature } from "../creatures";
import { foes, huntsWitch, stateOf, type State } from "../creatureStates";
import { lull } from "../legends";
import { bodyRadius } from "../spacing";
import { FIGHT } from "../movement";
import { type Attack, type CombatData, COMBAT, counterOf, type Target, type CombatState, creatureMaxHp, type CombatWorld } from "./data";
import { targetable, sideOf, truce, guardOf, sheltered, inviting, Grid } from "./targeting";

let D: CombatData = COMBAT; // (the data stepCombat was given, for land)
/** stepCombat hands land the data it was given. */
export function useData(d: CombatData): void { D = d; }

/** A blow lands on a target: damage, knockback and slow for creatures; one point for a witch; the
 *  soundsystem's health for a siege. */
/** Whether a charge's or pounce's touches (`hit`: creatures by id, witches as -1 - id) already took
 *  in this target; `drop` takes the one just pushed for it off the end first (the charge's own strike). */
export function contacted(tg: Target, hit: number[], drop: boolean): boolean {
  const key = tg.kind === "witch" ? -1 - tg.id : tg.kind === "creature" ? tg.id : NaN;
  const seen = drop ? hit.slice(0, -1) : hit;
  return seen.includes(key);
}

/** A charging or pouncing creature's touch: every foe it's in contact with (its blow's reach plus their
 *  bodies) takes the blow, once each (`hit` keeps who), the witch too when its side goes for her, her
 *  grace after a hit making a charge one hit (#197). */
export function touch(w: CombatWorld, s: CombatState, c: Creature, damage: number, a: Attack, grid: Grid, hit: number[]): void {
  const reach = Math.min(a.range, 2.5 * FIGHT.scale), me = bodyRadius(c);
  for (const o of grid.near(c.x, c.z, reach + me + 4)) {
    if (o === c || hit.includes(o.id) || !targetable(o) || !foes(sideOf(o), sideOf(c)) || truce(c, o) || w.asleep(o) || inviting(w, c, o)) continue;
    if (Math.hypot(o.x - c.x, o.z - c.z) > reach + me + bodyRadius(o)) continue;
    hit.push(o.id);
    land(w, s, c, { kind: "creature", id: o.id }, damage, a, c.x, c.z);
  }
  if (huntsWitch(sideOf(c))) for (const v of w.witches) {
    if (!v.onGround || v.down || sheltered(v, c) || hit.includes(-1 - v.id) || w.talkingTo(c.id) === v.id || Math.hypot(v.x - c.x, v.z - c.z) > reach + me + 0.4) continue;
    hit.push(-1 - v.id);
    land(w, s, c, { kind: "witch", id: v.id }, damage, a, c.x, c.z);
  }
}

export function land(w: CombatWorld, s: CombatState, from: Creature | null, tg: Target, damage: number, a: Attack, fx: number, fz: number): void {
  const time = w.time;
  if (tg.kind === "witch") {
    if (sheltered(w.witches[tg.id], from)) return; // (in a legend's circle: a shot or blow already on its way doesn't land)
    // Thrown from the attacker (or where its shot or area hit landed); harder by the attack's
    // knockback, and hard if it rams her (charging, or landing a leap on her).
    const ox = from && a.delivery !== "shot" && a.delivery !== "lob" ? from.x : fx, oz = from && a.delivery !== "shot" && a.delivery !== "lob" ? from.z : fz;
    w.hitWitch(tg.id, time, { x: ox, z: oz, knockback: a.modifier === "knockback" ? a.knockback ?? 0 : 0, rams: !!from && (!!from.charge || !!from.leap || !!from.run) }); // (a legend's long charge rams too)
    const v = w.witches[tg.id]; s.events.push({ kind: "witchHit", x: v.x, z: v.z, at: time, id: tg.id }); return;
  }
  if (tg.kind === "sound") {
    const h = s.sounds.get(tg.key);
    if (!h || h.hp <= 0) return;
    h.hp = Math.max(0, h.hp - damage);
    s.events.push({ kind: "soundHit", x: h.x, z: h.z, at: time, key: tg.key });
    if (h.hp === 0) s.events.push({ kind: "soundDestroyed", x: h.x, z: h.z, at: time, key: tg.key });
    return;
  }
  const o = w.creatures[tg.id];
  if (!o || o.gone || o.level === 0) return; // babies can't be hurt
  if (from && inviting(w, from, o)) return; // (her party's shots and area hits pass the one she's inviting by)
  // Its traits against this kind of blow (Stage 5): shown as strong or resisted.
  const k = counterOf(o.species, a.delivery, D), gd = guardOf(o, a.delivery, time), mult = k.damage * gd.damage;
  o.hp = (o.hp ?? creatureMaxHp(o)) - damage * mult;
  o.hurtAt = time;
  s.events.push({ kind: "hit", x: o.x, z: o.z, at: time, id: o.id, big: from?.level === LEGEND, counter: mult > 1 ? 1 : mult < 1 ? -1 : 0 });
  if (gd.damage < 1 && !o.charge?.curl) s.events.push({ kind: "blocked", x: o.x, z: o.z, at: time, id: o.id });
  if (a.modifier === "knockback" && a.knockback && k.knockback > 0 && !gd.rooted && !o.boss) { // (an area legend is too huge and heavy to knock about)
    const dx = o.x - fx, dz = o.z - fz, d = Math.hypot(dx, dz) || 1, kb = a.knockback * k.knockback;
    o.kx = (dx / d) * kb * 6; o.kz = (dz / d) * kb * 6; // eased off over a moment (stepKnock)
    if (k.stun > 0) { o.stunUntil = time + k.stun; if (o.fight) o.fight.windupUntil = 0; s.events.push({ kind: "stunned", x: o.x, z: o.z, at: time, id: o.id }); }
  }
  if (a.modifier === "slow") o.slowUntil = time + (a.slowTime ?? 2) * k.slow; // a new slow renews, never stacks
  // It turns on whoever hit it, if it isn't busy with another.
  if (from && o.fight && !o.fight.target) o.fight.target = { kind: "creature", id: from.id };
  if (o.hp <= 0 && o.boss && !o.leashed) {
    // An area legend beaten (Ed, 2026-10-04): it sinks back into the ground where it stands,
    // asleep for good; its area's soundsystem is safe from it.
    lull(o, time); // (#87: worn down, angry or happy, it goes back to sleep; a buff she has from it is kept)
    s.events.push({ kind: "slept", x: o.x, z: o.z, at: time, id: o.id });
    return;
  }
  if (o.hp <= 0 && stateOf(o) === "wild" && !o.dazed) {
    // Knocked down while wild (Ed, 2026-10-05, #87): dazed a while (nothing attacks it, and she
    // can still invite it), then it runs off (stepCombat).
    o.dazed = true; o.dazedUntil = time + w.t.combat.daze; o.fight = undefined; o.moving = false; o.vx = 0; o.vz = 0;
    s.events.push({ kind: "dazed", x: o.x, z: o.z, at: time, id: o.id });
    return;
  }
  if (o.hp <= 0) {
    // Knocked down (Ed, 2026-10-04: "it's sad when animals die"; #87: "knocked down", "ran off"):
    // it runs off the map, visibly, and is gone for good. A party animal is lost for the run: off
    // its leash as it goes.
    const party = o.leashed;
    if (party) { w.loseParty(o.id); o.leashed = false; }
    const out = w.exit(o.x, o.z);
    o.fleeUntil = Infinity; o.fleeX = out.x; o.fleeZ = out.z; o.fight = undefined; o.siege = undefined; o.enraged = false;
    s.events.push({ kind: party ? "lost" : "fled", x: o.x, z: o.z, at: time, id: o.id });
  }
}

/** Everything of the other side (not its own kind, never babies) within `r` of (x, z) is hit: a lob landing. */
export function area(w: CombatWorld, s: CombatState, from: Creature | null, side: State, species: string, x: number, z: number, r: number, damage: number, a: Attack, grid: Grid): void {
  for (const o of grid.near(x, z, r + 1)) if (targetable(o) && foes(sideOf(o), side) && o.species !== species && !w.asleep(o) && Math.hypot(o.x - x, o.z - z) <= r + 0.3 + o.level * 0.2) land(w, s, from, { kind: "creature", id: o.id }, damage, a, x, z);
  if (huntsWitch(side)) {
    for (const v of w.witches) if (v.onGround && !v.down && Math.hypot(v.x - x, v.z - z) <= r + 0.3) land(w, s, from, { kind: "witch", id: v.id }, damage, a, x, z);
    if (side === "enraged") for (const [key, h] of s.sounds) if (h.hp > 0 && Math.hypot(h.x - x, h.z - z) <= r + h.radius) land(w, s, from, { kind: "sound", key }, damage, a, x, z);
  }
}

/** Knockback eases off over a moment. */
export function stepKnock(c: Creature, dt: number): void {
  if (!c.kx && !c.kz) return;
  c.x += (c.kx ?? 0) * dt; c.z += (c.kz ?? 0) * dt;
  const k = Math.exp(-dt * 10);
  c.kx = (c.kx ?? 0) * k; c.kz = (c.kz ?? 0) * k;
  if (Math.hypot(c.kx, c.kz) < 0.05) { c.kx = 0; c.kz = 0; }
}
