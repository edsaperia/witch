// Wall objects as features, not a field (Ed, v147: "gardens have too many of these things"; "and
// these?" of the shrine's henge stones): each area lays its wall objects out as its kind suits —
// garden walls, hedges, brambles and rock walls as joined runs (along a path where there is one,
// with a gap for a gateway now and then), henge stones as stone circles (round the shrine, with now
// and then an avenue leading in, and a rare lone stone), water, reeds and boulders in clumps — with
// open ground between. A formal garden's flower beds go in rows along its walls. Seeded per area.
import { AREAS } from "../../art/areas.js";
import type { Plant } from "./forest";
import { AREA_TYPES, type ForestMap } from "./map";
import { hash2, rng } from "./random";

export type WallShape = "run" | "ring" | "clump";
const SHAPE: Record<string, WallShape> = { wall: "run", hedge: "run", bramble: "run", rockwall: "run", henge: "ring", water: "clump", reeds: "clump", boulder: "clump" };
/** Metres between the pieces of a run, by kind (they join end to end). */
const STEP: Record<string, number> = { wall: 2.4, hedge: 2.2, bramble: 2, rockwall: 2.8 };
const WALL_KIND = new Map((AREAS as unknown as { id: string; wall?: [string, unknown][]; small?: [string, unknown][] }[]).map(a => [a.id, { wall: a.wall?.[0]?.[0] ?? null, beds: a.small?.[0]?.[0] === "flowerbed" }]));

export interface WallFeatures { walls: Plant[]; beds: Plant[] }

/** The area's wall objects as features (and a formal garden's flower beds in rows). */
export function wallFeatures(map: ForestMap, cx: number, cy: number): WallFeatures {
  const type = map.typeOf(cx, cy), def = AREA_TYPES[type], W = map.tuning.walls, out: WallFeatures = { walls: [], beds: [] };
  const kind = WALL_KIND.get(def.id);
  if (!kind?.wall || (cx === map.centreCell[0] && cy === map.centreCell[1])) return out; // (home's a meadow: no walls)
  const shape = SHAPE[kind.wall] ?? "clump", r = rng(map.seed * 97 + cx * 7919 + cy * 104729 + 17), site = map.siteOf(cx, cy), A = map.areaSize;
  let n = 0;
  const own = (x: number, z: number) => { const c = map.areaAt(x, z).cell; return c[0] === cx && c[1] === cy; };
  const free = (x: number, z: number) => own(x, z) && !map.hardClear(x, z) && !map.reserved(x, z, 1.5) && map.paths.clearance(x, z).bushes !== 0;
  const put = (list: Plant[], x: number, z: number) => { if (!free(x, z)) return false; list.push({ x, z, type, variant: Math.floor(hash2(cx * 131 + n, cy * 37 + n++, map.seed + 311) * 1e6), flip: r() < 0.5 }); return true; };
  // A spot in the area, between its clearing and its edge.
  const spot = () => {
    let p = { x: site.x, z: site.z };
    for (let tries = 0; tries < 10; tries++) { const a = r() * Math.PI * 2, d = A * (0.12 + r() * 0.3); p = { x: site.x + Math.cos(a) * d, z: site.z + Math.sin(a) * d }; if (free(p.x, p.z)) break; }
    return p;
  };

  if (shape === "run") {
    const runs = W.runs[0] + Math.floor(r() * (W.runs[1] - W.runs[0] + 1)), step = STEP[kind.wall] ?? 2.4;
    for (let k = 0; k < runs; k++) {
      const s = spot();
      // Along a path if one passes near (a little to its side), else any way.
      const h = map.paths.at(s.x, s.z, 18);
      let dx = Math.cos(r() * Math.PI * 2), dz = 0;
      dz = Math.sqrt(1 - dx * dx) * (r() < 0.5 ? 1 : -1);
      let ox = s.x, oz = s.z;
      if (h) {
        const l = map.paths.lines[h.line], a = l.pts[h.seg], b = l.pts[h.seg + 1], len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
        dx = (b[0] - a[0]) / len; dz = (b[1] - a[1]) / len;
        const side = r() < 0.5 ? 1 : -1, off = l.half + 2.5;
        ox = a[0] - dz * off * side; oz = a[1] + dx * off * side;
      }
      const len = W.runLength[0] + Math.floor(r() * (W.runLength[1] - W.runLength[0] + 1)), gate = r() < W.gateChance ? Math.floor(len / 2) : -1;
      for (let i = 0; i < len; i++) {
        if (i === gate || i === gate + 1) continue; // a gateway
        const x = ox + dx * step * i, z = oz + dz * step * i;
        if (put(out.walls, x, z) && kind.beds && i % 2 === 0) put(out.beds, x - dz * 1.8, z + dx * 1.8); // a bed along the wall's lawn side
      }
    }
  } else if (shape === "ring") {
    const rings = W.rings[0] + Math.floor(r() * (W.rings[1] - W.rings[0] + 1));
    for (let k = 0; k < rings; k++) {
      // The first circle round the shrine (the set piece) if the area has one, else in a glade; a
      // circle that loses more than half its stones (a path, the area's edge) is tried elsewhere.
      let sp = k === 0 ? map.setPieceSpot(cx, cy) : null, c = sp ?? spot(), R = 0;
      for (let tries = 0; tries < 6; tries++) {
        const stones = W.ringStones[0] + Math.floor(r() * (W.ringStones[1] - W.ringStones[0] + 1)), a0 = r() * Math.PI * 2;
        R = sp ? map.tuning.setPieceFootprint * map.tuning.setPieceScale + 3 + r() * 3 : W.ringRadius[0] + r() * (W.ringRadius[1] - W.ringRadius[0]);
        const ring = Array.from({ length: stones }, (_, i) => { const a = a0 + (i / stones) * Math.PI * 2 + (r() - 0.5) * 0.15; return [c.x + Math.cos(a) * R, c.z + Math.sin(a) * R]; });
        if (ring.filter(([x, z]) => free(x, z)).length * 2 >= stones) { for (const [x, z] of ring) put(out.walls, x, z); break; }
        sp = null; c = spot();
      }
      if (r() < W.avenueChance) { // an avenue: two rows leading in
        const a = r() * Math.PI * 2, ux = Math.cos(a), uz = Math.sin(a);
        for (let i = 1; i <= 4; i++) for (const side of [-1, 1]) put(out.walls, c.x + ux * (R + i * 4) - uz * side * 2.5, c.z + uz * (R + i * 4) + ux * side * 2.5);
      }
    }
    if (r() < W.loneChance) { const s = spot(); put(out.walls, s.x, s.z); }
  } else {
    const clumps = W.clumps[0] + Math.floor(r() * (W.clumps[1] - W.clumps[0] + 1));
    for (let k = 0; k < clumps; k++) {
      const c = spot(), size = W.clumpSize[0] + Math.floor(r() * (W.clumpSize[1] - W.clumpSize[0] + 1));
      for (let i = 0; i < size; i++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * W.clumpRadius; put(out.walls, c.x + Math.cos(a) * d, c.z + Math.sin(a) * d); }
    }
  }
  return out;
}

/** Whether this area's small objects are laid out by its walls (a formal garden's flower beds). */
export function bedsInRows(_map: ForestMap, type: number): boolean {
  return !!WALL_KIND.get(AREA_TYPES[type].id)?.beds;
}
