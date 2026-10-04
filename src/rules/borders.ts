// Where an area's border runs (for the sparkling line round the party zone, Ed, 2026-10-03):
// points along the edge of an area's own ground, each knowing which area lies across it. Found by
// sampling: a coarse grid round the area, refined only in the squares the border crosses, so it
// stays cheap. No drawing here.
import type { ForestMap } from "./map";
import type { Cell } from "./partition";

export interface BorderPoint {
  x: number;
  z: number;
  /** The area across the border ("x,y"; off the map is "edge"). */
  other: string;
}

/** All of an area's border at once. */
export function borderOf(map: ForestMap, cell: Cell, step: number): BorderPoint[] {
  const out: BorderPoint[] = [];
  for (const _ of borderSteps(map, cell, step, out)) void _;
  return out;
}

/** The same, a row at a time: the view runs it a few milliseconds a frame, so a big wave of
 *  newly partified areas never stalls a frame. Points are pushed into `out`. */
export function* borderSteps(map: ForestMap, cell: Cell, step: number, out: BorderPoint[]): Generator<void> {
  const s = map.siteOf(cell[0], cell[1]), R = map.areaSize * 1.5, C = Math.max(step * 2, 8);
  const b = map.bounds, key = (x: number, z: number) => {
    if (x < b.minX || x > b.maxX || z < b.minZ || z > b.maxZ) return "edge";
    const c = map.areaAt(x, z).cell;
    return `${c[0]},${c[1]}`;
  };
  const me = `${cell[0]},${cell[1]}`, n = Math.ceil((2 * R) / C), x0 = s.x - R, z0 = s.z - R;
  const coarse: string[] = [];
  for (let j = 0; j <= n; j++) { for (let i = 0; i <= n; i++) coarse.push(key(x0 + i * C, z0 + j * C)); yield; }
  const seen = new Set<string>();
  const k = Math.max(1, Math.round(C / step)), f = C / k;
  for (let j = 0; j < n; j++, yield) for (let i = 0; i < n; i++) {
    const c = [coarse[j * (n + 1) + i], coarse[j * (n + 1) + i + 1], coarse[(j + 1) * (n + 1) + i], coarse[(j + 1) * (n + 1) + i + 1]];
    if (!c.includes(me) || c.every(v => v === me)) continue;
    // Refine: a point on our side whose neighbour (right or down) is across the border.
    const fine: string[] = [];
    for (let v = 0; v <= k; v++) for (let u = 0; u <= k; u++) fine.push(key(x0 + i * C + u * f, z0 + j * C + v * f));
    for (let v = 0; v <= k; v++) for (let u = 0; u <= k; u++) {
      const here = fine[v * (k + 1) + u], x = x0 + i * C + u * f, z = z0 + j * C + v * f;
      for (const [du, dv] of [[1, 0], [0, 1]]) {
        if (u + du > k || v + dv > k) continue;
        const there = fine[(v + dv) * (k + 1) + u + du];
        if (here === there || (here !== me && there !== me)) continue;
        const px = x + du * f * 0.5, pz = z + dv * f * 0.5, id = `${Math.round(px * 4)},${Math.round(pz * 4)}`;
        if (seen.has(id)) continue;
        seen.add(id);
        out.push({ x: px, z: pz, other: here === me ? there : here });
      }
    }
  }
}
