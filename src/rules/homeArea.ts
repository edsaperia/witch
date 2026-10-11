// The home area (the dancefloor's) as combat sees it (Ed, 2026-10-11: "Animals leashed inside the home area should aggro enemy
// creatures within that area"): whether a point is in it, and a circle round the whole of it, worked out once a map.
import type { ForestMap } from "./map";

export interface HomeArea { inside: (x: number, z: number) => boolean; x: number; z: number; r: number }

const CACHE = new WeakMap<ForestMap, HomeArea>();

/** The home area: in it is in its cell; the circle is round its site, out past the farthest of it (sampled every few metres). */
export function homeArea(map: ForestMap): HomeArea {
  const hit = CACHE.get(map);
  if (hit) return hit;
  const [hx, hy] = map.centreCell, site = map.siteOf(hx, hy);
  const inside = (x: number, z: number) => { const k = map.cellSafe(x, z).cell; return k[0] === hx && k[1] === hy; };
  const step = 4, out = map.areaSize * 3;
  let r = 0;
  for (let dz = -out; dz <= out; dz += step) for (let dx = -out; dx <= out; dx += step) {
    const d = Math.hypot(dx, dz);
    if (d > r && d <= out && inside(site.x + dx, site.z + dz)) r = d;
  }
  const home: HomeArea = { inside, x: site.x, z: site.z, r: r + step };
  CACHE.set(map, home);
  return home;
}
