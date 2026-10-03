// String lights (Ed, 2026-10-03): in the party zone, colourful lights hang between trees. For
// each partified area, pairs of neighbouring trees round its clearing's edge (4 to 12 m apart)
// get a line strung between their trunks at about the crowns' base. Placement depends only on
// the seed, so it never changes as you fly about. No drawing here.
import type { Forest, Plant } from "./forest";
import type { ForestMap } from "./map";
import type { Cell } from "./partition";
import { hash2 } from "./random";

export interface StringLine { ax: number; az: number; bx: number; bz: number; seed: number }

export function stringsFor(map: ForestMap, forest: Forest, cell: Cell): StringLine[] {
  const t = map.tuning, L = t.stringLights, s = map.siteOf(cell[0], cell[1]);
  const inEdge = (p: Plant) => {
    const a = map.areaAt(p.x, p.z);
    return a.cell[0] === cell[0] && a.cell[1] === cell[1] && a.openness > t.clearingSize && a.openness < t.clearingSize + t.clearingFalloff * 0.8;
  };
  const trees = forest.treesNear(s.x, s.z, map.areaSize * 0.75).filter(inEdge)
    .sort((a, b) => hash2(Math.round(a.x * 10), Math.round(a.z * 10), map.seed + 501) - hash2(Math.round(b.x * 10), Math.round(b.z * 10), map.seed + 501));
  const used = new Set<Plant>(), out: StringLine[] = [];
  for (const a of trees) {
    if (out.length >= L.perArea) break;
    if (used.has(a)) continue;
    let best: Plant | null = null, bd = Infinity;
    for (const b of trees) {
      if (b === a || used.has(b)) continue;
      const d = Math.hypot(a.x - b.x, a.z - b.z);
      if (d >= 4 && d <= 12 && d < bd) { bd = d; best = b; }
    }
    if (!best) continue;
    used.add(a); used.add(best);
    out.push({ ax: a.x, az: a.z, bx: best.x, bz: best.z, seed: Math.floor(hash2(Math.round(a.x * 10), Math.round(best.z * 10), map.seed + 503) * 1e6) });
  }
  return out;
}
