// The brooms' spells that reach into the game (Ed, 2026-10-11/12; rules/spells.ts has the loadout): Battering's blink stuns
// what's in her path; Ley jump puts her at the ley line's pulse; Ground pound rises or lands at once with a shockwave, its
// landing stunning; Stealth keeps her unseen unless she's inviting or putting down or picking up (combat's `hidden` witch,
// rules/combat/targeting.ts; the hunt and the watch, rules/hunt.ts, rules/wildWatch.ts). Spells may stun or push wild and
// enraged creatures but never hurt them, and never touch hers, happy ones or legends (rules/hatSpells.ts spellTarget). No
// drawing here.
import type { Game, Witch } from "./game";
import type { Tuning } from "./tuning";
import type { WitchState } from "./witch";
import { spellTarget } from "./hatSpells";
import { leyPulse } from "./leypulse";
import { stealthed } from "./spells";

/** The creatures a broom's spell may touch within r of (x, z). */
const near = (g: Game, x: number, z: number, r: number) =>
  g.creatures.filter(c => spellTarget(c) && Math.abs(c.x - x) <= r && Math.abs(c.z - z) <= r && Math.hypot(c.x - x, c.z - z) <= r);

/** Battering (Ed, 2026-10-12: "blinks stun creatures in her path"): every wild and enraged creature within battering.width of
 *  the blink's line from (fx, fz) to (tx, tz) is stunned battering.stun seconds. Returns their ids. */
export function batter(g: Game, fx: number, fz: number, tx: number, tz: number, t: Tuning): number[] {
  const B = t.spells.battering;
  if (!B) return [];
  const dx = tx - fx, dz = tz - fz, l2 = dx * dx + dz * dz, mx = (fx + tx) / 2, mz = (fz + tz) / 2, out: number[] = [];
  for (const c of near(g, mx, mz, Math.sqrt(l2) / 2 + B.width + 1)) {
    const k = l2 > 0 ? Math.max(0, Math.min(1, ((c.x - fx) * dx + (c.z - fz) * dz) / l2)) : 0;
    if (Math.hypot(fx + dx * k - c.x, fz + dz * k - c.z) > B.width) continue;
    c.stunUntil = Math.max(c.stunUntil ?? 0, g.clock.time + B.stun); c.vx = 0; c.vz = 0; c.moving = false;
    out.push(c.id);
  }
  return out;
}

/** Where Ley jump would put her: the ley line's pulse (null while home boots up, or with no wave to come). */
export const leyJumpTarget = (g: Game): { x: number; z: number } | null => leyPulse(g.party, g.map, g.clock.time);

/** Ley jump, cast: she's at the pulse (the nearest clear spot to it), as she was (ground or treetops). */
export function leyJump(g: Game, W: Witch, clear: (x: number, z: number) => boolean): boolean {
  const p = leyJumpTarget(g);
  if (!p) return false;
  let x = p.x, z = p.z;
  for (let r = 0; r < 30 && !clear(x, z); r += 1.5) { const a = r * 2.4; x = p.x + Math.cos(a) * r; z = p.z + Math.sin(a) * r; }
  W.body = { ...W.body, x, z, vx: 0, vz: 0, perch: undefined };
  return true;
}

/** Whether Ground pound can go now: she's on the ground (to rise) or above it (to land), not at her decks. */
export const canPound = (b: WitchState): boolean => !b.seated;

/** Ground pound (Ed, 2026-10-12; the Updraft renamed): up in the treetops at once if she's on the ground, down at once if she's
 *  above it; either way a shockwave knocks the wild and enraged creatures within pound.radius back pound.push metres, and the
 *  landing stuns them pound.stun seconds ("its landing should also briefly stun"). Returns whether she landed. */
export function groundPound(g: Game, W: Witch, t: Tuning): boolean {
  const P = t.spells.pound, b = W.body;
  if (!P) return false;
  const land = b.mode !== "ground";
  W.body = land ? { ...b, mode: "ground", lift: 0, perch: undefined } : { ...b, mode: "treetop", lift: 1, perch: undefined };
  for (const c of near(g, b.x, b.z, P.radius)) {
    const dx = c.x - b.x, dz = c.z - b.z, d = Math.hypot(dx, dz) || 1, push = P.push * (1 - 0.5 * Math.min(1, d / P.radius));
    // (knocked back as combat's knockback does, easing off: rules/combat/hits.ts stepKnock, metres = speed / 10)
    c.kx = (dx / d) * push * 10; c.kz = (dz / d) * push * 10;
    if (land) { c.stunUntil = Math.max(c.stunUntil ?? 0, g.clock.time + P.stun); c.vx = 0; c.vz = 0; }
  }
  return land;
}

/** Stealth: whether witch i is hidden from the wild now (her Stealth broom, and nothing she did lately has given her away). */
export const hiddenWitch = (g: Game, i: number): boolean => { const W = g.witches[i]; return !!W && stealthed(W.spells, W.time ?? g.herTime); };
