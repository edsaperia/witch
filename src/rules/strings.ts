// String lights (Ed, 2026-10-03): in the party zone, colourful lights hang between trees. For
// each partified area, chains of lines are strung from trunk to trunk at about the crowns' base:
// spread across the whole area, some draped through several trees in a row, some crossing a
// clearing, each span stringLights.spanMin to spanMax metres. Placement depends only on the seed,
// so it never changes as you fly about. No drawing here.
import type { Forest, Plant } from "./forest";
import type { ForestMap } from "./map";
import type { Cell } from "./partition";
import { hash2, rng } from "./random";

export interface StringLine { ax: number; az: number; bx: number; bz: number; seed: number }

export function stringsFor(map: ForestMap, forest: Forest, cell: Cell): StringLine[] {
  const L = map.tuning.stringLights, s = map.siteOf(cell[0], cell[1]), r = rng(map.seed * 53 + cell[0] * 1031 + cell[1] * 7 + 509);
  const own = (p: Plant) => { const c = map.areaAt(p.x, p.z).cell; return c[0] === cell[0] && c[1] === cell[1]; };
  const key = (p: Plant) => hash2(Math.round(p.x * 10), Math.round(p.z * 10), map.seed + 501);
  const trees = forest.treesNear(s.x, s.z, map.areaSize * 1.3).filter(own).sort((a, b) => key(a) - key(b));
  const used = new Set<Plant>(), starts: Plant[] = [], out: StringLine[] = [];
  for (const start of trees) {
    if (out.length >= L.perArea) break;
    if (used.has(start) || starts.some(q => Math.hypot(q.x - start.x, q.z - start.z) < L.spread)) continue;
    starts.push(start);
    // A chain: from tree to tree, carrying on in roughly the same direction.
    let at = start, dx = 0, dz = 0;
    const spans = 1 + Math.floor(r() * L.chainMax);
    used.add(start);
    for (let k = 0; k < spans && out.length < L.perArea; k++) {
      const ok: Plant[] = [];
      for (const b of trees) {
        if (used.has(b)) continue;
        const ex = b.x - at.x, ez = b.z - at.z, d = Math.hypot(ex, ez);
        if (d < L.spanMin || d > L.spanMax) continue;
        if (k > 0 && (ex * dx + ez * dz) / d < 0.5) continue;
        ok.push(b);
        if (ok.length > 24) break;
      }
      if (!ok.length) break;
      const b = ok[Math.floor(r() * ok.length)], d = Math.hypot(b.x - at.x, b.z - at.z);
      out.push({ ax: at.x, az: at.z, bx: b.x, bz: b.z, seed: Math.floor(hash2(Math.round(at.x * 10), Math.round(b.z * 10), map.seed + 503) * 1e6) });
      used.add(b);
      dx = (b.x - at.x) / d; dz = (b.z - at.z) / d; at = b;
    }
  }
  return out;
}
