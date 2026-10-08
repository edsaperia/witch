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

// The grid's buffers, kept from step to step (overnight phase 2: at a siege's thousands, a fresh Map and an array per cell
// every step was the rules' biggest cost): each creature's cell, the cells as an open-addressed hash of their (i, j), and
// the creatures sorted by cell (a counting sort, so each cell keeps the list's order, and every creature meets its
// neighbours in the same order as before: the same pushes, to the bit).
let cap = 0, slots = 0;
let radius = new Float64Array(0), cellI = new Int32Array(0), cellJ = new Int32Array(0), slotOf = new Int32Array(0), order = new Int32Array(0);
let keyI = new Int32Array(0), keyJ = new Int32Array(0), used = new Uint8Array(0), count = new Int32Array(0), start = new Int32Array(0), fill = new Int32Array(0);
let pushX = new Float64Array(0), pushZ = new Float64Array(0);
function grow(n: number): void {
  if (n <= cap) return;
  cap = Math.max(n, cap * 2, 64);
  radius = new Float64Array(cap); cellI = new Int32Array(cap); cellJ = new Int32Array(cap); slotOf = new Int32Array(cap); order = new Int32Array(cap);
  pushX = new Float64Array(cap); pushZ = new Float64Array(cap);
  slots = 1; while (slots < cap * 2) slots *= 2; // (at most one cell per creature: the table at most half full)
  keyI = new Int32Array(slots); keyJ = new Int32Array(slots); used = new Uint8Array(slots); count = new Int32Array(slots); start = new Int32Array(slots); fill = new Int32Array(slots);
}
const hashOf = (i: number, j: number) => (Math.imul(i, 73856093) ^ Math.imul(j, 19349663)) & (slots - 1);
/** The cell (i, j)'s slot, made if `make`, else -1 when it holds nobody. */
function slotAt(i: number, j: number, make: boolean): number {
  for (let h = hashOf(i, j); ; h = (h + 1) & (slots - 1)) {
    if (!used[h]) { if (!make) return -1; used[h] = 1; keyI[h] = i; keyJ[h] = j; count[h] = 0; return h; }
    if (keyI[h] === i && keyJ[h] === j) return h;
  }
}

/** Ease the creatures in `list` apart for one step. `still` ones (a sleeping legend, say) push but aren't moved. */
export function spaceOut(list: Creature[], dt: number, still: (c: Creature) => boolean, data: MovementData = MOVEMENT): void {
  const B = data.bodies, size = B.cell, n = list.length;
  if (!n) return;
  grow(n);
  used.fill(0);
  for (let a = 0; a < n; a++) {
    const c = list[a], i = Math.floor(c.x / size), j = Math.floor(c.z / size), h = slotAt(i, j, true);
    radius[a] = bodyRadius(c, data); cellI[a] = i; cellJ[a] = j; slotOf[a] = h; count[h]++;
  }
  // Each cell's run in `order`, in the list's order.
  let at = 0;
  for (let a = 0; a < n; a++) { const h = slotOf[a]; if (count[h] >= 0) { start[h] = at; fill[h] = at; at += count[h]; count[h] = -1; } }
  for (let a = 0; a < n; a++) order[fill[slotOf[a]]++] = a;
  let moved = 0;
  for (let a = 0; a < n; a++) {
    const c = list[a];
    if (still(c)) { pushX[a] = NaN; continue; }
    const r = radius[a], ci = cellI[a], cj = cellJ[a];
    let px = 0, pz = 0, k = 0;
    for (let di = -1; di <= 1 && k < B.neighbours; di++) for (let dj = -1; dj <= 1 && k < B.neighbours; dj++) {
      const h = slotAt(ci + di, cj + dj, false);
      if (h < 0) continue;
      for (let q = start[h], end = fill[h]; q < end; q++) {
        const b = order[q];
        if (b === a) continue;
        const o = list[b], want = (r + radius[b]) * B.factor + B.margin, dx = c.x - o.x, dz = c.z - o.z;
        if (Math.abs(dx) >= want || Math.abs(dz) >= want) continue;
        const d = Math.hypot(dx, dz);
        if (d >= want) continue;
        // Overlapping: away from it, harder the closer (exactly on top: a seeded way out).
        const f = (want - d) / want, ux = d > 1e-4 ? dx / d : Math.cos(c.id * 2.4), uz = d > 1e-4 ? dz / d : Math.sin(c.id * 2.4);
        px += ux * f; pz += uz * f;
        if (++k >= B.neighbours) break;
      }
    }
    const m = Math.hypot(px, pz);
    if (k && m > 1e-6) { // (pushes that cancel out leave it be)
      const capM = Math.min(1, m), v = B.push * FIGHT.speed * capM;
      pushX[a] = (px / m) * v * dt; pushZ[a] = (pz / m) * v * dt; moved++;
    } else pushX[a] = NaN;
  }
  if (moved) for (let a = 0; a < n; a++) if (pushX[a] === pushX[a]) { list[a].x += pushX[a]; list[a].z += pushZ[a]; }
}
