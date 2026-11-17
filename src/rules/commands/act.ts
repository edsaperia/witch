// Commands carried out (?commands=1; docs/plans/combat-skill-and-commands.md, section 3): in the fight's step (rules/combat.ts), each of
// her creatures she commanded this step (rules/commands/press.ts queued it on the creature) acts, with her party's own shots, lobs,
// slime and blows, so what they hit fills a wild creature's ring with hearts as any party blow does (rules/combat/hits.ts land).
// Strike and Daze: shots that home on the target; Snare: a lob onto it (stun, slow) or a slime patch round her; Guard: a taunt round
// her and the nearest thrown, or quills shot round her when a shield stops a blow. A letter is still one hit; commands add hearts
// and openings (stuns, slows). Pure: no drawing, no randomness.
import type { Creature } from "../creatures";
import type { StepBase } from "../combat/step";
import { combatProfile, type Attack, type Shot } from "../combat/data";
import { land } from "../combat/hits";
import { foes } from "../creatureStates";
import { sideOf, targetable } from "../combat/targeting";
import { commandOf, type Command } from "../skill/profile";

/** Every queued command in this step's fight carried out. */
export function stepCommandActs(b: StepBase): void {
  for (const c of b.w.active) if (c.command) { const C = c.command; c.command = undefined; if (!c.gone && c.leashed) act(b, c, C); }
}

const foeOf = (c: Creature) => (o: Creature | undefined): o is Creature => !!o && !o.gone && o.level >= 1 && targetable(o) && foes(sideOf(o), sideOf(c));

function act(b: StepBase, c: Creature, C: NonNullable<Creature["command"]>): void {
  const { s, w, time } = b, K = commandOf(c.species, c.level);
  if (!K) return;
  const dmg = combatProfile(c.species, Math.min(3, c.level) as 1 | 2 | 3).damagePerSecond * K.power, foe = foeOf(c);
  const shot = (x: number, z: number, a: number, speed: number, extra: Partial<Shot>) =>
    s.shots.push({ id: s.nextShot++, x, z, vx: Math.cos(a) * speed, vz: Math.sin(a) * speed, until: time + 3, from: c.id, side: sideOf(c), species: c.species, damage: dmg, radius: 0.6, attack: "spit", ...extra });
  if (C.quills) { // (a Guard's shield stopped a blow: quills round her)
    const n = K.quills ?? 6;
    for (let i = 0; i < n; i++) shot(C.hx, C.hz, (i / n) * Math.PI * 2, 24, { until: time + 0.6 });
    s.events.push({ kind: "shot", x: C.hx, z: C.hz, at: time, id: c.id });
    return;
  }
  const o = C.target !== null ? w.creatures[C.target] : undefined;
  if (K.shape === "shot" && foe(o)) {
    const n = Math.max(1, Math.round(K.count ?? 1)), a0 = Math.atan2(o.z - c.z, o.x - c.x);
    for (let i = 0; i < n; i++) shot(c.x, c.z, a0 + (i - (n - 1) / 2) * 0.35, K.speed ?? 30, { home: o.id, cmd: effects(K) });
    s.events.push({ kind: "shot", x: c.x, z: c.z, at: time, id: c.id });
  } else if (K.shape === "lob" && foe(o)) {
    s.shots.push({ id: s.nextShot++, x: c.x, z: c.z, vx: 0, vz: 0, until: time + 2, from: c.id, side: sideOf(c), species: c.species, damage: dmg, radius: K.radius ?? 2, attack: "lob",
      lob: { fx: c.x, fz: c.z, tx: o.x, tz: o.z, at: time, lands: time + 0.5 }, home: o.id, cmd: effects(K) }); // (it follows its target as it flies: rules/combat/flight.ts)
    s.events.push({ kind: "shot", x: c.x, z: c.z, at: time, id: c.id });
  } else if (K.shape === "patch") {
    s.trails.push({ x: C.hx, z: C.hz, r: K.radius ?? 6, until: time + (K.slowTime ?? 6), side: sideOf(c), slow: K.slowMult ?? 0.5, from: c.id });
  } else if (K.verb === "guard") guard(b, c, C, K, dmg);
}

/** A shot's or lob's effects on what it hits. */
const effects = (K: Command): Shot["cmd"] => ({ ...(K.stun ? { stun: K.stun } : {}), ...(K.slow || K.daze ? { slow: K.slow ?? K.daze } : {}) });

/** A Guard round her: every foe within its tauntRadius turns on it for its taunt seconds; the nearest is thrown its knock metres. */
function guard(b: StepBase, c: Creature, C: NonNullable<Creature["command"]>, K: Command, dmg: number): void {
  const { s, w, time } = b, foe = foeOf(c), R = K.tauntRadius ?? 10;
  let nearest: Creature | null = null, nd = Infinity;
  for (const o of w.active) {
    if (!foe(o) || o.boss) continue;
    const d = Math.hypot(o.x - C.hx, o.z - C.hz);
    if (d > R) continue;
    if (K.taunt) { o.taunt = { by: c.id, until: time + K.taunt }; if (o.fight && !o.fight.lunge) o.fight.target = { kind: "creature", id: c.id }; s.events.push({ kind: "taunted", x: o.x, z: o.z, at: time, id: o.id }); }
    if (d < nd) { nd = d; nearest = o; }
  }
  if (nearest && K.knock) {
    // (land's knockback eases off over a moment, travelling about 0.6 m for each point: rules/combat/hits.ts stepKnock)
    const a: Attack = { delivery: "melee", range: 3, windup: 0, cooldown: 0, modifier: "knockback", knockback: K.knock / 0.6 };
    land(w, s, c, { kind: "creature", id: nearest.id }, dmg, a, C.hx, C.hz);
  }
}

/** A command's shot in flight homes on its target (rules/combat/flight.ts stepShots), turning hard. */
export function homeShot(sh: Shot, o: Creature | undefined, dt: number): void {
  if (!o || o.gone) return;
  const v = Math.hypot(sh.vx, sh.vz) || 1, dx = o.x - sh.x, dz = o.z - sh.z, d = Math.hypot(dx, dz) || 1, k = Math.min(1, dt * 8);
  const nx = sh.vx / v + (dx / d - sh.vx / v) * k, nz = sh.vz / v + (dz / d - sh.vz / v) * k, n = Math.hypot(nx, nz) || 1;
  sh.vx = (nx / n) * v; sh.vz = (nz / n) * v;
}

/** A command's shot or lob landed on o (after its blow: rules/combat/flight.ts): stunned (its wind-up cancelled) or slowed so long. */
export function commandLanded(s: StepBase["s"], o: Creature, fx: NonNullable<Shot["cmd"]>, time: number): void {
  if (o.gone || o.leashed) return;
  if (fx.stun) { o.stunUntil = Math.max(o.stunUntil ?? 0, time + fx.stun); if (o.fight) o.fight.windupUntil = 0; s.events.push({ kind: "stunned", x: o.x, z: o.z, at: time, id: o.id }); }
  if (fx.slow) o.slowUntil = Math.max(o.slowUntil ?? 0, time + fx.slow);
}
