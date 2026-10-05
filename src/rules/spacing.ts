// Spacing (Ed, 2026-10-05: "It would be good if animals attempted not to bunch up while moving; the
// distance they want to keep can depend on their size"). Once a step, after everything has moved
// (roaming, following her, marching, fleeing, going home, fighting), creatures near a witch ease
// apart from any closer than they like: each has a body radius (movement.json bodies: its kind's,
// times its level's scale), and two keep (r1 + r2) times bodies.factor plus bodies.margin apart.
// Soft: a push that grows as they overlap, at most bodies.push m/s, never a hard collision, so a
// pack still closes on its target. Cheap: a grid of the creatures in view, and at most
// bodies.neighbours looked at for each. No drawing here.
import { FIGHT, MOVEMENT, type MovementData } from "./movement";
import type { Creature } from "./creatures";

export interface Bodies { radius: Record<string, number>; level: number[]; factor: number; margin: number; push: number; neighbours: number; cell: number; range: number }

/** A creature's body radius (m): its kind's (an adult's), times its level's scale. */
export function bodyRadius(c: Pick<Creature, "species" | "level">, data: MovementData = MOVEMENT): number {
  const B = data.bodies;
  return (B.radius[c.species] ?? 0.6) * (B.level[c.level] ?? 1);
}

/** Ease the creatures in `list` apart for one step. `still` ones (a sleeping legend, say) push but aren't moved. */
export function spaceOut(list: Creature[], dt: number, still: (c: Creature) => boolean, data: MovementData = MOVEMENT): void {
  const B = data.bodies, size = B.cell, grid = new Map<number, Creature[]>(), key = (i: number, j: number) => (i + 32768) * 65536 + (j + 32768);
  for (const c of list) {
    const k = key(Math.floor(c.x / size), Math.floor(c.z / size));
    let l = grid.get(k);
    if (!l) grid.set(k, (l = []));
    l.push(c);
  }
  const moves: [Creature, number, number][] = [];
  for (const c of list) {
    if (still(c)) continue;
    const r = bodyRadius(c, data), ci = Math.floor(c.x / size), cj = Math.floor(c.z / size);
    let px = 0, pz = 0, n = 0;
    for (let di = -1; di <= 1 && n < B.neighbours; di++) for (let dj = -1; dj <= 1 && n < B.neighbours; dj++) {
      for (const o of grid.get(key(ci + di, cj + dj)) ?? []) {
        if (o === c) continue;
        const want = (r + bodyRadius(o, data)) * B.factor + B.margin, dx = c.x - o.x, dz = c.z - o.z;
        if (Math.abs(dx) >= want || Math.abs(dz) >= want) continue;
        const d = Math.hypot(dx, dz);
        if (d >= want) continue;
        // Overlapping: away from it, harder the closer (exactly on top: a seeded way out).
        const k = (want - d) / want, ux = d > 1e-4 ? dx / d : Math.cos(c.id * 2.4), uz = d > 1e-4 ? dz / d : Math.sin(c.id * 2.4);
        px += ux * k; pz += uz * k;
        if (++n >= B.neighbours) break;
      }
    }
    const m = Math.hypot(px, pz);
    if (n && m > 1e-6) { // (pushes that cancel out leave it be)
      const cap = Math.min(1, m), v = B.push * FIGHT.speed * cap;
      moves.push([c, (px / m) * v * dt, (pz / m) * v * dt]);
    }
  }
  for (const [c, dx, dz] of moves) { c.x += dx; c.z += dz; }
}
