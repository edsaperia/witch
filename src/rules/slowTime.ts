// Legend circles slow time (Ed, 2026-10-06: "the music and countdown get ~10x slower, things still
// move on the outside but very slowly, the music audibly slows down ... freeze only if the legend is
// asleep or restless. Enraged creatures outside the circle don't enter it. Your invitations disappear
// if they go outside the circle from inside"). While she stands on the ground in the circle of a
// legend that sleeps or is restless, the world runs at legendCircle.slow.scale of its speed (eased
// over slow.ease seconds both ways); she runs on her own clock at full speed. The game's two clocks:
// g.clock.time, the world's (by dt x timeScale), and g.herTime, hers (by dt).
import type { Creature } from "./creatures";
import type { Game } from "./game";
import { bodyRadius } from "./spacing";

/** A legend's circle: its clearing (map.legendClearings) and the legend lying in it. */
export interface Ring { id: number; x: number; z: number; r: number }

/** Every legend's circle, found once a game (the map's clearings, each with the legend lying in it). */
export function legendRings(g: Game): Ring[] {
  if (g.rings) return g.rings;
  const out: Ring[] = [], clearings = g.map.legendClearings ?? [];
  for (const c of g.creatures) {
    if (!c.boss) continue;
    let best = null as (typeof clearings)[number] | null, bd = Infinity;
    for (const k of clearings) { const d = Math.hypot(k.legend.x - c.x, k.legend.z - c.z); if (d < bd) { bd = d; best = k; } }
    if (best && bd <= best.r) out.push({ id: c.id, x: best.x, z: best.z, r: best.r });
  }
  return (g.rings = out);
}

/** Does its circle slow time and keep the enraged out: its legend there, asleep or restless (not angry, not happy). */
export const calm = (L: Creature | undefined) => !!L && !L.gone && !L.leashed && (L.legendState === "asleep" || L.legendState === "restless");

/** The calm circle (x, z) stands in, if any. */
export function calmRingAt(g: Game, x: number, z: number): Ring | null {
  for (const r of legendRings(g)) if (Math.abs(x - r.x) < r.r && Math.abs(z - r.z) < r.r && Math.hypot(x - r.x, z - r.z) < r.r && calm(g.creatures[r.id])) return r;
  return null;
}

/** The world's speed she asks for now: slow.scale on the ground in a calm circle (not on her seat, nor knocked out), else 1. */
export function slowTarget(g: Game): number {
  const S = g.tuning.legendCircle?.slow, w = g.witch;
  if (!S || S.on === false || S.scale >= 1) return 1;
  if (w.mode !== "ground" || w.seated || g.witches[0].ko) return 1;
  return calmRingAt(g, w.x, w.z) ? S.scale : 1;
}

/** Ease the world's speed toward what she asks for, over slow.ease seconds from full to slow (or back), by her dt. */
export function stepTimeScale(g: Game, dt: number): void {
  const S = g.tuning.legendCircle?.slow, want = slowTarget(g);
  if (!S) { g.timeScale = 1; return; }
  const rate = ((1 - Math.min(1, S.scale)) * dt) / Math.max(1e-3, S.ease);
  g.timeScale = want > g.timeScale ? Math.min(want, g.timeScale + rate) : Math.max(want, g.timeScale - rate);
}

/** Enraged creatures don't enter a calm circle (Ed): one inside it is put back out at its edge (its body clear of it), so a march
 *  across slides round it, and one whose target lies inside waits at the edge. Whether or not she's there, so a circle is always the same. */
export function keepEnragedOut(g: Game): void {
  const rings = legendRings(g).filter(r => calm(g.creatures[r.id]));
  if (!rings.length) return;
  const cs = g.creatures, n = rings.length;
  for (let i = 0; i < cs.length; i++) {
    const c = cs[i];
    if (!c.enraged || c.gone || c.boss) continue;
    const body = bodyRadius(c); // (once a creature, not once a ring: phase 2's GC audit)
    for (let j = 0; j < n; j++) {
      const r = rings[j], dx = c.x - r.x, dz = c.z - r.z, R = r.r + body;
      if (Math.abs(dx) >= R || Math.abs(dz) >= R) continue;
      const d = Math.hypot(dx, dz);
      if (d >= R) continue;
      const ux = d > 1e-6 ? dx / d : 1, uz = d > 1e-6 ? dz / d : 0;
      c.x = r.x + ux * R; c.z = r.z + uz * R;
    }
  }
}

/** A 💌 going from (x0, z0) to (x1, z1) leaves a calm circle it was in (Ed: "Your invitations disappear if they go outside the circle from inside"). */
export function leavesCalmRing(g: Game): (x0: number, z0: number, x1: number, z1: number) => boolean {
  return (x0, z0, x1, z1) => {
    const r = calmRingAt(g, x0, z0);
    return !!r && Math.hypot(x1 - r.x, z1 - r.z) >= r.r;
  };
}
