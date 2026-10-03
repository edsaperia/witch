// String lights (Ed, 2026-10-03): in the party zone, colourful lights hang between trees, as long
// garlands draped from tree to tree. For each partified area, a few runs sweep across it, each
// from tree to tree inside a forward cone (so a run carries on in roughly one direction rather
// than zig-zagging), spanMin to spanMax metres a span. No span crosses another; each tree holds
// at most two span ends (one run passing through), except now and then a junction tree where a
// branch run starts, so three ends meet there (never more). Placement depends only on the seed,
// so it never changes as you fly about. No drawing here.
import type { Forest, Plant } from "./forest";
import type { ForestMap } from "./map";
import type { Cell } from "./partition";
import { hash2, rng } from "./random";

export interface StringLine { ax: number; az: number; bx: number; bz: number; seed: number }

/** Whether segments ab and cd cross (sharing an end doesn't count). */
export function segmentsCross(a: [number, number], b: [number, number], c: [number, number], d: [number, number]): boolean {
  const same = (p: [number, number], q: [number, number]) => Math.abs(p[0] - q[0]) < 1e-6 && Math.abs(p[1] - q[1]) < 1e-6;
  if (same(a, c) || same(a, d) || same(b, c) || same(b, d)) return false;
  const o = (p: [number, number], q: [number, number], r: [number, number]) => Math.sign((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]));
  return o(a, b, c) * o(a, b, d) < 0 && o(c, d, a) * o(c, d, b) < 0;
}

export function stringsFor(map: ForestMap, forest: Forest, cell: Cell): StringLine[] {
  const L = map.tuning.stringLights, s = map.siteOf(cell[0], cell[1]), r = rng(map.seed * 53 + cell[0] * 1031 + cell[1] * 7 + 509);
  const own = (p: Plant) => { const c = map.areaAt(p.x, p.z).cell; return c[0] === cell[0] && c[1] === cell[1]; };
  const key = (p: Plant) => hash2(Math.round(p.x * 10), Math.round(p.z * 10), map.seed + 501);
  const trees = forest.treesNear(s.x, s.z, map.areaSize * 1.3).filter(own).sort((a, b) => key(a) - key(b));
  const ends = new Map<Plant, number>(), junction = new Set<Plant>(), out: StringLine[] = [], starts: Plant[] = [];
  const cone = Math.cos((L.coneAngle * Math.PI) / 180);
  const free = (p: Plant, extra = 0) => (ends.get(p) ?? 0) + 1 <= (junction.has(p) ? 3 : 2) - extra;
  const crosses = (a: Plant, b: Plant) => out.some(l => segmentsCross([a.x, a.z], [b.x, b.z], [l.ax, l.az], [l.bx, l.bz]));
  const link = (a: Plant, b: Plant) => {
    out.push({ ax: a.x, az: a.z, bx: b.x, bz: b.z, seed: Math.floor(hash2(Math.round(a.x * 10), Math.round(b.z * 10), map.seed + 503) * 1e6) });
    ends.set(a, (ends.get(a) ?? 0) + 1); ends.set(b, (ends.get(b) ?? 0) + 1);
  };

  // One run: from `start`, tree to tree inside the forward cone (any direction for the first span).
  const run = (start: Plant, heading: [number, number] | null, spans: number) => {
    let at = start, dir = heading;
    const path: Plant[] = [start];
    for (let k = 0; k < spans; k++) {
      const ok: { b: Plant; d: number }[] = [];
      for (const b of trees) {
        if (b === at || !free(b)) continue;
        const ex = b.x - at.x, ez = b.z - at.z, d = Math.hypot(ex, ez);
        if (d < L.spanMin || d > L.spanMax) continue;
        if (dir && (ex * dir[0] + ez * dir[1]) / d < cone) continue;
        if (crosses(at, b)) continue;
        ok.push({ b, d });
        if (ok.length >= 16) break;
      }
      if (!ok.length) break;
      // Prefer the longer spans: garlands, not zig-zags.
      ok.sort((p, q) => q.d - p.d);
      const { b, d } = ok[Math.floor(r() * Math.min(4, ok.length))];
      link(at, b);
      dir = [(b.x - at.x) / d, (b.z - at.z) / d];
      path.push(b);
      at = b;
    }
    return path;
  };

  const runs = L.runsPerArea[0] + Math.floor(r() * (L.runsPerArea[1] - L.runsPerArea[0] + 1));
  const branches: { from: Plant; heading: [number, number] }[] = [];
  for (const start of trees) {
    if (starts.length >= runs) break;
    if (ends.has(start) || starts.some(q => Math.hypot(q.x - start.x, q.z - start.z) < L.spread)) continue;
    starts.push(start);
    const spans = L.spansPerRun[0] + Math.floor(r() * (L.spansPerRun[1] - L.spansPerRun[0] + 1));
    const path = run(start, null, spans);
    // Now and then a tree on the run is a junction: a branch run leaves it sideways.
    for (let k = 1; k < path.length - 1; k++) {
      if (r() >= L.junctionChance) continue;
      const p = path[k], n = path[k + 1], dx = n.x - p.x, dz = n.z - p.z, d = Math.hypot(dx, dz), side = r() < 0.5 ? 1 : -1;
      junction.add(p);
      branches.push({ from: p, heading: [(-dz / d) * side, (dx / d) * side] });
    }
  }
  for (const b of branches) run(b.from, b.heading, L.spansPerRun[0] + Math.floor(r() * 3));
  return out;
}
