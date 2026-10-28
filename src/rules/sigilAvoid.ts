// Creatures keep off the sigils lying on the floor (Ed, 2026-10-28: "When idling or dancing, creatures should try and avoid standing
// on floor sigils"): every sigil on the ground (her placed sigils, happy creatures' runes, relics' sigils, her hats lying down, and
// loose sigils once they come: `g.loose`) gathered once a step into a coarse grid, which a roaming or dancing creature asks when it
// picks where to stand next (rules/creatures.ts pointInArea, rules/leash.ts stepLeashed) and while it rests (on one, it moves on).
// Only a nudge: a creature that finds nowhere clear stands where it would have, and moving, chasing, fighting and marching never ask.
// The grid is set only while the rules step (game.ts stepGame), so a call from outside a step (a map's spawning) sees none.
import type { Game } from "./game";
import { hasRune } from "./creatureStates";
import { RUNE_SCALE, runeOffset, sigilSize } from "./runeOffset";

/** A sigil on the floor: its middle, its radius (half its width with its backing), and the creature it travels with (a happy one's rune). */
export interface FloorSigil { x: number; z: number; r: number; owner?: number }

const CELL = 8; // (metres: wider than any sigil's radius plus a creature's pad, so a look at the 3×3 cells round a point finds all)
const key = (ix: number, iz: number) => (ix + 32768) * 65536 + (iz + 32768);

export interface FloorGrid { cells: Map<number, FloorSigil[]>; minX: number; minZ: number; maxX: number; maxZ: number; pad: number }

/** A grid of floor sigils; null when there are none. `pad`: how far past a sigil's edge a creature's middle counts as on it. */
export function floorGrid(list: readonly FloorSigil[], pad = 0.5): FloorGrid | null {
  if (!list.length) return null;
  const g: FloorGrid = { cells: new Map(), minX: Infinity, minZ: Infinity, maxX: -Infinity, maxZ: -Infinity, pad };
  for (const s of list) {
    const k = key(Math.floor(s.x / CELL), Math.floor(s.z / CELL)), at = g.cells.get(k);
    if (at) at.push(s); else g.cells.set(k, [s]);
    g.minX = Math.min(g.minX, s.x); g.maxX = Math.max(g.maxX, s.x); g.minZ = Math.min(g.minZ, s.z); g.maxZ = Math.max(g.maxZ, s.z);
  }
  return g;
}

let current: FloorGrid | null = null;
/** This step's floor sigils (game.ts sets them for its step, then clears them). */
export const setFloorSigils = (g: FloorGrid | null): void => { current = g; };

/** Whether (x, z) stands on a floor sigil (not `self`'s own rune). */
export function onFloorSigil(x: number, z: number, self?: number, grid: FloorGrid | null = current): boolean {
  if (!grid || x < grid.minX - CELL || x > grid.maxX + CELL || z < grid.minZ - CELL || z > grid.maxZ + CELL) return false;
  const ix = Math.floor(x / CELL), iz = Math.floor(z / CELL);
  for (let i = ix - 1; i <= ix + 1; i++) for (let j = iz - 1; j <= iz + 1; j++) {
    const at = grid.cells.get(key(i, j));
    if (at) for (const s of at) if ((self === undefined || s.owner !== self) && (s.x - x) ** 2 + (s.z - z) ** 2 < (s.r + grid.pad) ** 2) return true;
  }
  return false;
}

/** Up to `tries` spots from `pick`, the first off every floor sigil; if none is, the first (a nudge, never a wall). */
export function offSigils(pick: () => [number, number] | null, self?: number, tries = 12): [number, number] | null {
  let first: [number, number] | null = null;
  for (let i = 0; i < tries; i++) {
    const p = pick(); if (!p) continue;
    if (!current || !onFloorSigil(p[0], p[1], self)) return p;
    first ??= p;
  }
  return first;
}

/** Gather every sigil on the floor this step (null when the tuning's sigilAvoid is off, or there are none). */
export function gatherFloorSigils(g: Game): FloorGrid | null {
  const t = g.tuning, A = t.sigilAvoid;
  if (A && !A.on) return null;
  const out: FloorSigil[] = [], backing = Math.max(1, t.leash.sigilBacking?.size ?? 1), byId = g.creatures;
  for (const w of g.witches) {
    for (const p of w.leash.placed) out.push({ x: p.x, z: p.z, r: (sigilSize(byId[p.id]?.level ?? 1) * backing) / 2 });
    const h = w.hat;
    if (h?.down) out.push({ x: h.down.x, z: h.down.z, r: HAT_R });
    if (h?.left) for (const l of h.left) out.push({ x: l.x, z: l.z, r: HAT_R });
  }
  for (const r of g.relics) if (r.state === "lying" || r.state === "dropped") out.push({ x: r.sx, z: r.sz, r: (sigilSize(RELIC_LEVEL) * backing) / 2 });
  for (const c of g.creatures) if ((c.state === "happy" || c.partyLegend) && hasRune(c)) out.push({ x: c.x, z: c.z + runeOffset(c, t), r: (sigilSize(c.level, RUNE_SCALE) * backing) / 2, owner: c.id });
  // (loose sigils, when they come: anything lying with an x and z, a level if it has one)
  const loose = (g as { loose?: readonly { x: number; z: number; level?: number }[] }).loose;
  if (loose) for (const s of loose) out.push({ x: s.x, z: s.z, r: (sigilSize(s.level ?? 1) * backing) / 2 });
  return floorGrid(out, A?.pad ?? 0.5);
}

const HAT_R = 1;
const RELIC_LEVEL = 2;
