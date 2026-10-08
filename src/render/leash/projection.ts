// Sigils seen from the treetops (render/leash.ts): each placed sigil projected above the canopy over its rune, and each
// leashed or happy creature's near her, moving with it.
import { hasRune } from "../../rules/creatureStates";
import type { LeashView } from "../leash";
import type { PlacedSigil } from "../../rules/leash";

const STACKED = new Set<number>(), PLACED = new Map<number, PlacedSigil>(); // (filled each frame, never kept)

/** From the treetops, each placed sigil is projected up above the canopy over its spot, flat and glowing, joined to its rune by
 *  a faint pulsing column of light (Ed, 2026-10-03), fading in as she rises; and over every leashed or happy creature near her,
 *  its own sigil at the same height, moving with it. */
export function drawProjection(lv: LeashView, time: number, dot: number[]): void {
  const g = lv.game, s = g.leash, t = g.tuning, w = g.witch;
  const P = t.sigilProjection, up = w.lift * w.lift * (3 - 2 * w.lift);
  if (up > 0.01) for (const p of s.placed) {
    const c = g.creatures[p.id], col = lv.colours.get(c.species)!, top = t.treetopHeight - 4 + P.height;
    const pulse = 0.85 + 0.15 * Math.sin(time * 1.3 + p.id);
    const sg = lv.sigilOf(c);
    lv.flat.add(p.x, top, p.z, (3 + c.level * 0.8) * P.size * sg.scale, sg.uv, col.r, col.g, col.b, P.opacity * up * pulse);
    for (let y = 1; y < top; y += 1.5) lv.standing.add(p.x, y, p.z, 0.3, dot, col.r, col.g, col.b, P.beam * up * pulse * (0.6 + 0.4 * Math.sin(y * 0.8 - time * 3)));
  }
  // And over every leashed or happy creature near her, its own sigil at the same height, moving with it (Ed's playtest,
  // 2026-10-06: "I should be able to see sigils of leashed creatures and happy creatures from treetop mode"): smaller and
  // without a beam, the nearest few only, fading out toward the edge of their range; a happy one's dimmer, as on the ground.
  if (up > 0.01) {
    // (every creature a frame, a thousand and more late on: her stack and the placed sigils looked up once, not per creature,
    // a box test before the distance, and the list's records kept from frame to frame)
    const C = P.creatures, near = lv.projected, pool = lv.projectedPool, R = C.range;
    STACKED.clear(); for (const id of s.stack) STACKED.add(id);
    PLACED.clear(); for (const p of s.placed) PLACED.set(p.id, p);
    let n = 0;
    for (let i = 0; i < g.creatures.length; i++) {
      const c = g.creatures[i];
      if (c.gone || Math.abs(c.x - w.x) > R || Math.abs(c.z - w.z) > R || !(c.leashed || hasRune(c)) || STACKED.has(c.id)) continue;
      const p = PLACED.get(c.id);
      if (p && Math.hypot(p.x - c.x, p.z - c.z) < 6) continue;
      const d = Math.hypot(c.x - w.x, c.z - w.z);
      if (d > R) continue;
      const r = pool[n] ?? (pool[n] = { c, d }); r.c = c; r.d = d; n++;
    }
    near.length = 0; for (let i = 0; i < n; i++) near.push(pool[i]);
    near.sort((a, b) => a.d - b.d);
    const top = t.treetopHeight - 4 + P.height;
    for (let i = 0; i < Math.min(near.length, C.max); i++) {
      const { c, d } = near[i], col = lv.colours.get(c.species) ?? (lv.slotOf(c.species, 0), lv.colours.get(c.species)!), sg = lv.sigilOf(c);
      const edge = Math.min(1, Math.max(0, (C.range - d) / (C.range * C.fade))), a = C.opacity * up * edge * (c.leashed ? 1 : C.happy) * (0.88 + 0.12 * Math.sin(time * 1.3 + c.id));
      if (a > 0.01) lv.flat.add(c.x, top + 0.2 * Math.sin(time * 0.9 + c.id), c.z, (3 + c.level * 0.8) * C.size * sg.scale, sg.uv, col.r, col.g, col.b, a);
    }
  }
}
