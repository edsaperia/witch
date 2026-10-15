// An area as combat sees it (Ed, 2026-10-11: "Animals leashed inside the home area should aggro enemy creatures within that
// area"; 2026-10-15: "Placing a sigil in any area should work as home does: the creatures defend the whole area, plus a radius
// round the sigil"): whether a point is in it, and a circle round the whole of it, worked out once an area a map.
import type { ForestMap } from "./map";

export interface HomeArea { inside: (x: number, z: number) => boolean; x: number; z: number; r: number }

const CACHE = new WeakMap<ForestMap, Map<string, HomeArea>>();

/** An area by its cell: in it is in that cell; the circle is round its site, out past the farthest of it (sampled every few
 *  metres, out to three areas' size: the fractal borders wander, so an area reaches well past its square). */
export function areaOf(map: ForestMap, cell: readonly [number, number]): HomeArea {
  let areas = CACHE.get(map);
  if (!areas) CACHE.set(map, areas = new Map());
  const key = `${cell[0]},${cell[1]}`, hit = areas.get(key);
  if (hit) return hit;
  const [cx, cy] = cell, site = map.siteOf(cx, cy);
  const inside = (x: number, z: number) => { const k = map.cellSafe(x, z).cell; return k[0] === cx && k[1] === cy; };
  const step = 4, out = map.areaSize * 3;
  let r = 0;
  for (let dz = -out; dz <= out; dz += step) for (let dx = -out; dx <= out; dx += step) {
    const d = Math.hypot(dx, dz);
    if (d > r && d <= out && inside(site.x + dx, site.z + dz)) r = d;
  }
  const area: HomeArea = { inside, x: site.x, z: site.z, r: r + step };
  areas.set(key, area);
  return area;
}

/** The home area (the dancefloor's). */
export const homeArea = (map: ForestMap): HomeArea => areaOf(map, map.centreCell);
