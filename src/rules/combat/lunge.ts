// A creature's lunge under way (rules/combat/turn.ts), its blow landing as it meets its target or at its lunge's end; and the
// moment it turns to look on first noticing its target. Split from stepCombat's loop (rules/combat.ts): the same sums in the
// same order.
import { FIGHT } from "../movement";
import { land } from "./hits";
import { meleeExtras } from "../attacks/combatWorld";
import { turnHeading } from "../momentum";
import { waitingProfile } from "../combatSpacing";
import { advanceMotion } from "../locomotion";
import { lungeAdvance } from "../lungeMotion";
import { widthOf } from "./strikes";
import type { Turn } from "./fighter";
import { sitAfter } from "../skill/openings"; // (?skill=1: it sits after its lunge)

/** Its lunge under way: bounded course correction, with the original travel budget. */
export function stepLunge(T: Turn): void {
  const { k, c, f, p, A, spell, atk } = T, { s, w, time, dt } = k;
  // Ed, 2026-11-02: tracking is a balance parameter, not a prohibition against tracking the witch.
  // (with momentum, Ed 2026-10-05: it builds up to 60 m/s and eases out at the end, carrying some speed on)
  const L = f.lunge!, travel = lungeAdvance(L.left, L.v ?? 0, dt), v = travel.speed, step = travel.step;
  L.v = v;
  // (the long lunge, carrying through: once its blow has landed or it has passed its target it keeps its line, never turning back)
  if (!L.through || !(L.landed || (p.x - c.x) * L.dx + (p.z - c.z) * L.dz < 0)) [L.dx, L.dz] = turnHeading(L.dx, L.dz, p.x - c.x, p.z - c.z, waitingProfile(c).strikeTurn / FIGHT.momentum, dt);
  advanceMotion(c, { vx: L.dx * step / dt, vz: L.dz * step / dt }, time, dt); L.left -= step; c.moving = true; c.walk += dt * 12; c.facing = L.dx >= 0 ? 1 : -1;
  c.vx = L.dx * v; c.vz = L.dz * v;
  // Its blow: at its lunge's end if its target's in reach; the long lunge's as it meets its target on its way (once: a blink
  // through it then, and it has missed), and it carries on past to the end of its line.
  const meets = L.through ? !L.landed : L.left <= 1e-6;
  if (meets && Math.hypot(p.x - c.x, p.z - c.z) <= A.range * widthOf(k, f.target) + p.r) { L.landed = true; const observation = { source: c.id, attack: spell?.name ?? null, delivery: "melee", phase: "damage" as const }; land(w, s, c, f.target, atk.damage, A, c.x, c.z, observation); if (spell) meleeExtras(w, s, f.target, spell.spec, c.x, c.z, c, observation); }
  if (L.left <= 1e-6) { f.lunge = undefined; sitAfter(c, true, time, w.t); if (c.taunt && time < c.taunt.until && w.creatures[c.taunt.by]) f.target = { kind: "creature", id: c.taunt.by }; } // (taunted mid-lunge: its lunge done, it turns on the taunter)
}

/** Just noticed: it turns to look a moment before it goes (combat.reaction). True if it's looking this step. */
export function reacting(T: Turn): boolean {
  const { c, f, p } = T, { C, time } = T.k;
  if (f.windupUntil === 0 && time - (f.seenAt ?? -1e9) < C.reaction) { c.moving = false; c.facing = p.x >= c.x ? 1 : -1; return true; }
  return false;
}
