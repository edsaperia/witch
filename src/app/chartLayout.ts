// Where things sit on the sea chart (wave 2, part C; Ed: "the sea chart is the same circle": home in the middle, every island
// round it at its kind's planned biome direction, docs/backlog/journey.md): the disc's radius 1, north up; the islands packed
// over it by the archipelago (rules/archipelago.ts; Ed, 2026-10-12), each phase roughly further out (it was a ring a phase); an island's outline drawn in a box of BOX across, its size by phase kept by
// art/islands.js islandPath (its radii shares of the biggest island's).
import { bearingOf, islandOf, KINDS, worldOf } from "../rules/rosters";

/** The rings' radii by phase (0 home in the middle; 1 to 5 outward, the last just inside the rim). */
export const ringOf = (phase: number): number => (phase <= 0 ? 0 : 0.02 + phase * 0.165);

/** An island's outline box across (the disc's radius 1): every island's drawn at this scale, so sizes compare. */
export const BOX = 0.17;

/** Where an island ("home" or a kind) sits in the world: x east, y down (SVG), its home's middle (Ed, 2026-10-12, the journey's
 *  tessellation: "the rings can be very relaxed, a pleasing layout is much more important": rules/archipelago.ts, the disc used
 *  evenly, each island roughly at its bearing and its phase's distance, in its patch); null if it's neither. */
export function islandAt(island: string, world = 0): { x: number; y: number } | null {
  if (island !== "home" && !islandOf(island)) return null;
  const p = worldOf(world).islands.get(island);
  return p ? { x: p.x, y: p.y } : null;
}

/** Where an island sat before the archipelago: on its phase's ring at its bearing (tools/islands/chart.mjs's "before"). */
export function ringAt(island: string, world = 0): { x: number; y: number } | null {
  if (island === "home") return { x: 0, y: 0 };
  const i = islandOf(island);
  if (!i) return null;
  const r = ringOf(i.phase), a = (shown(world).get(island)! * Math.PI) / 180;
  return { x: Math.sin(a) * r, y: -Math.cos(a) * r };
}

/** Each island's bearing as drawn: its own, but nudged round its ring so neighbours don't overlap (a few degrees at most). */
const SHOWN = new Map<number, Map<string, number>>();
function shown(world: number): Map<string, number> {
  const hit = SHOWN.get(world);
  if (hit) return hit;
  const out = new Map<string, number>();
  SHOWN.set(world, out);
  const byPhase = new Map<number, string[]>();
  for (const k of Object.keys(KINDS)) { const p = KINDS[k].phase + 1; byPhase.set(p, [...(byPhase.get(p) ?? []), k]); }
  for (const [p, ks] of byPhase) {
    const ang = new Map(ks.map(k => [k, bearingOf(k, world)])), r = ringOf(p), size = Math.sqrt((10 * p) / 64) * 0.96 * BOX * 1.25; // (its coast strays up to a quarter past round)
    const gap = ((size + 0.012) / r) * (180 / Math.PI); // (degrees between neighbours' middles so they just clear)
    for (let it = 0; it < 60; it++) {
      const order = [...ang].sort((a, b) => a[1] - b[1]);
      for (let j = 0; j < order.length; j++) {
        const [ka, a] = order[j], [kb, b] = order[(j + 1) % order.length], d = ((b - a) % 360 + 360) % 360;
        if (order.length > 1 && d < gap) { const push = (gap - d) / 2; ang.set(ka, a - push); ang.set(kb, b + push); }
      }
    }
    for (const [k, a] of ang) out.set(k, ((a % 360) + 360) % 360);
  }
  return out;
}
