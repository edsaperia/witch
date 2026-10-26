// Babies behave differently (Ed, 2026-10-11; docs/backlog/gameplay.md "Babies"): leashed and following her on the ground they
// walk in single file along where she's been, in stack order (the stack's bottom baby first, leash.babies.gap metres apart);
// while she's in a fight they scatter, leash.babies.scatter metres or a quarter more off to the side away from the first attacker
// (Ed, 2026-10-26: "they should scatter further, e.g. outside of my camera view": past the view's edge; on the island's land,
// rules/leash.ts; pulling on her not at all meanwhile, rules/leashWeight.ts), from the moment
// something goes for her or hers (closing in or winding up, not on the hit) until nothing has for leash.babies.calm seconds; and one
// more than leash.babies.farAt metres from her (about off the screen) moves at leash.babies.farSpeed, so it's always with
// her in seconds. Berries, evolving and weight: rules/berries.ts and rules/leashWeight.ts. No drawing here.
import type { Creature } from "./creatures";
import { hash2 } from "./random";
import type { Tuning } from "./tuning";

export const BABIES_DEFAULT = { gap: 1.6, scatter: 55, calm: 3, farAt: 35, farSpeed: 40 };
export const babiesOf = (t: Tuning) => t.leash.babies ?? BABIES_DEFAULT;

/** A baby on her leash: level 0, and not a party legend. */
export const isBaby = (c: Creature | undefined): boolean => !!c && c.level === 0 && !c.partyLegend;

/** Breadcrumbs of where she's walked, newest first, as flat [x0, z0, x1, z1, ...], one every TRAIL_STEP metres. */
export const TRAIL_STEP = 0.5;

/** Her trail with her at (x, z) added (a crumb once she's TRAIL_STEP from the last), kept to `keep` metres long. */
export function updateTrail(trail: number[] | undefined, x: number, z: number, keep: number): number[] {
  const tr = trail ?? [];
  if (!tr.length || Math.hypot(tr[0] - x, tr[1] - z) >= TRAIL_STEP) tr.unshift(x, z);
  // (cut what's past `keep` metres along it)
  let len = Math.hypot(tr[0] - x, tr[1] - z);
  for (let i = 2; i < tr.length; i += 2) {
    len += Math.hypot(tr[i] - tr[i - 2], tr[i + 1] - tr[i - 1]);
    if (len > keep) { tr.length = i + 2; break; }
  }
  return tr;
}

/** The point `dist` metres back along her trail from her at (x, z) (its far end if the trail's shorter). */
export function trailPoint(trail: readonly number[] | undefined, x: number, z: number, dist: number): { x: number; z: number } {
  let px = x, pz = z, left = dist;
  for (let i = 0; trail && i < trail.length; i += 2) {
    const qx = trail[i], qz = trail[i + 1], seg = Math.hypot(qx - px, qz - pz);
    if (seg >= left && seg > 1e-9) { const k = left / seg; return { x: px + (qx - px) * k, z: pz + (qz - pz) * k }; }
    left -= seg; px = qx; pz = qz;
  }
  return { x: px, z: pz };
}

/** The wild creature nearest her, within `r` metres, that's after her or one of hers: she's in a fight. */
export function attackerNear(creatures: readonly Creature[], wx: number, wz: number, r: number): Creature | null {
  let best: Creature | null = null, bd = r;
  for (const c of creatures) {
    if (c.gone || c.leashed || !c.fight?.target || Math.abs(c.x - wx) > r || Math.abs(c.z - wz) > r) continue;
    const tg = c.fight.target;
    if (tg.kind !== "witch" && !(tg.kind === "creature" && creatures[tg.id]?.leashed)) continue;
    const d = Math.hypot(c.x - wx, c.z - wz);
    if (d < bd) { bd = d; best = c; }
  }
  return best;
}

/** Where a baby scatters to in a fight: `scatter` metres from her or up to a quarter more (its own, seeded: never nearer, so off
 *  the screen whichever way it runs), along `away` (the way from the attacker to her when the fight began, kept so a charge
 *  through her doesn't send them back across her) and off to one side (its own, seeded). */
export function scatterSpot(c: Creature, wx: number, wz: number, away: { x: number; z: number }, scatter: number): { x: number; z: number } {
  const a = Math.atan2(away.z, away.x);
  const side = hash2(c.id, 0, 7717) < 0.5 ? -1 : 1, turn = side * (0.6 + 0.9 * hash2(c.id, 1, 7717)); // (35° to 85° off the line away from it)
  const r = scatter * (1 + 0.25 * hash2(c.id, 2, 7717));
  return { x: wx + Math.cos(a + turn) * r, z: wz + Math.sin(a + turn) * r };
}

/** Step a baby toward (tx, tz): keeping its place in the line at her pace (`herSpeed`) plus a closing speed, its own pace at
 *  the least, and at farSpeed when far from her. */
export function stepBaby(c: Creature, tx: number, tz: number, wx: number, wz: number, own: number, herSpeed: number, dt: number, t: Tuning): void {
  const B = babiesOf(t), dx = tx - c.x, dz = tz - c.z, d = Math.hypot(dx, dz);
  if (d < 0.08) { c.moving = false; c.away = false; c.tx = c.x; c.tz = c.z; return; }
  const far = Math.hypot(c.x - wx, c.z - wz) > B.farAt;
  const speed = far ? B.farSpeed : Math.min(B.farSpeed, Math.max(own, herSpeed + d * 6)); // (her pace and a little more, so the line keeps with her)
  const step = Math.min(d, speed * dt);
  c.x += (dx / d) * step; c.z += (dz / d) * step; c.tx = tx; c.tz = tz; c.rest = 0;
  if (Math.abs(dx) > 0.02) c.facing = dx > 0 ? 1 : -1;
  c.away = dz < -Math.abs(dx) * 0.5;
  c.moving = true;
  c.walk += dt * Math.max(4, Math.min(speed, 12) * 1.75);
}
