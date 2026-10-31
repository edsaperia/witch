import { HOUSE_ROOMS, type HouseConfig } from "../rules/houseRooms";
import { field } from "../../config/house/shape.js";
import { attachedPoint, corners, isHatZone, physicalRoom, rotate, zoneSlots, type Layout, type LayoutItem, type Placement } from "./houseLayout";

/** Advisory geometry audit, not a substitute for play/browser checks. No published data is mutated. */
export function auditLayout(layout: Layout, items: LayoutItem[], H: HouseConfig = HOUSE_ROOMS) {
  const byId = new Map(items.map(o => [o.id, o])), poses = new Map(layout.objects.map(p => [p.id, p]));
  const solid = layout.objects.filter(p => !byId.get(p.id)!.decor && !byId.get(p.id)!.hatPoint);
  const interactive = (o: LayoutItem) => !isHatZone(o) && (!!o.synthetic || !["scenery", "say"].includes(o.use.kind));
  const distance = (x: number, z: number) => field(H.shape, x, z, true);
  const inside = (o: LayoutItem, p: Placement, x: number, z: number, pad = 0) => {
    const d = rotate(x - p.x, z - p.z, -p.rotation);
    return Math.abs(d.x) < o.facing.foot.w / 2 + pad && Math.abs(d.z) < o.facing.foot.d / 2 + pad;
  };
  const rows = solid.map(p => {
    const o = byId.get(p.id)!, anchor = isHatZone(o) ? null : attachedPoint(o, p), room = physicalRoom(p, H), locked = !!H.rooms.find(r => r.id === room)?.locked;
    const footprintOutside = Math.max(...corners(o, p).map(c => distance(c.x, c.z)));
    const blockers = anchor ? solid.filter(q => q.id !== p.id && !isHatZone(byId.get(q.id)!) && inside(byId.get(q.id)!, q, anchor.x, anchor.z, .2)).map(q => q.id) : [];
    return { id: p.id, function: o.use.kind, sourceRoom: o.room, physicalRoom: room, crossesRooms: o.room !== room, locked, interactive: interactive(o),
      ...(isHatZone(o) ? { kind: "hat-spawn-zone", spawnSlots: zoneSlots(o, p, H) } : {}),
      anchor, centerOutside: +distance(p.x, p.z).toFixed(3), footprintOutside: +footprintOutside.toFixed(3), anchorOutside: anchor ? +distance(anchor.x, anchor.z).toFixed(3) : null, approachOverlaps: blockers };
  });
  const overlaps: [string, string][] = [];
  // Convex rectangle SAT; visual overlap is not automatically a rules collision (walking currently ignores furniture).
  for (let i = 0; i < solid.length; i++) for (let j = i + 1; j < solid.length; j++) {
    const a = corners(byId.get(solid[i].id)!, solid[i]), b = corners(byId.get(solid[j].id)!, solid[j]);
    const axes = [a, b].flatMap(q => [0, 1].map(k => ({ x: -(q[k + 1].z - q[k].z), z: q[k + 1].x - q[k].x })));
    if (axes.every(n => { const A = a.map(p => p.x * n.x + p.z * n.z), B = b.map(p => p.x * n.x + p.z * n.z); return Math.min(...A) < Math.max(...B) && Math.min(...B) < Math.max(...A); })) overlaps.push([solid[i].id, solid[j].id]);
  }
  const corridors = H.corridors.map(c => {
    const crossed = new Set<string>();
    for (let i = 1; i < (c.pts?.length ?? 0); i++) {
      const a = c.pts![i - 1], b = c.pts![i], steps = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / .5));
      for (let k = 0; k <= steps; k++) for (const p of solid) if (inside(byId.get(p.id)!, p, a[0] + (b[0] - a[0]) * k / steps, a[1] + (b[1] - a[1]) * k / steps, .3)) crossed.add(p.id);
    }
    return { corridor: c.id, footprintCrossings: [...crossed] };
  }).filter(c => c.footprintCrossings.length);
  const floorReachable = reachableAnchors(H, rows.map(r => r.anchor ?? poses.get(r.id)!), poses.get("terrace:decks") ? attachedPoint(byId.get("terrace:decks")!, poses.get("terrace:decks")!) : H.terrace.seat);
  return { version: 1, floorplan: layout.floorplan, objectCount: solid.length, clutterCount: items.filter(o => o.decor).length,
    hatSpawnPoints: layout.objects.filter(p => byId.get(p.id)!.hatPoint).map(p => ({ id: byId.get(p.id)!.hatPoint!, x: p.x, z: p.z, floorOutside: +distance(p.x, p.z).toFixed(3), footprintOverlaps: solid.filter(q => !isHatZone(byId.get(q.id)!) && inside(byId.get(q.id)!, q, p.x, p.z, .35)).map(q => q.id) })),
    migration: layout.migration ?? null, objects: rows.map((r, i) => ({ ...r, floorReachable: floorReachable[i] })), overlaps, corridors,
    limitations: ["Floor reachability is a 0.75m sampled walkable-shape check, not navigation/play acceptance.", "Furniture overlap/path crossings are advisory; runtime walking currently has no furniture collision solver.", "Current kitchen baskets/smoke are room-anchored, not moved by a cauldron object transform.", "Bed wake pose/UI and DJ desk/seat orientation need runtime integration before enabling rotated adoption.", "Room labels are display text; stable object use kinds keep station functions, physical membership controls destination lighting."] };
}
function reachableAnchors(H: HouseConfig, anchors: { x: number; z: number }[], start: { x: number; z: number }): boolean[] {
  const step = .75, x0 = Math.min(...H.rooms.map(r => r.x0)) - 4, z0 = Math.min(...H.rooms.map(r => r.z0)) - 4;
  const width = Math.ceil((Math.max(...H.rooms.map(r => r.x1)) + 4 - x0) / step), height = Math.ceil((Math.max(...H.rooms.map(r => r.z1)) + 4 - z0) / step);
  const walk = new Uint8Array(width * height), seen = new Uint8Array(walk.length);
  for (let z = 0; z < height; z++) for (let x = 0; x < width; x++) if (field(H.shape, x0 + x * step, z0 + z * step, true) <= -.3) walk[z * width + x] = 1;
  const near = (p: { x: number; z: number }) => {
    const x = Math.round((p.x - x0) / step), z = Math.round((p.z - z0) / step), out: number[] = [];
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) if (x + dx >= 0 && x + dx < width && z + dz >= 0 && z + dz < height) { const i = (z + dz) * width + x + dx; if (walk[i]) out.push(i); }
    return out;
  };
  const queue = near(start); for (const i of queue) seen[i] = 1;
  for (let at = 0; at < queue.length; at++) { const i = queue[at], x = i % width; for (const n of [x ? i - 1 : -1, x < width - 1 ? i + 1 : -1, i - width, i + width]) if (n >= 0 && n < walk.length && walk[n] && !seen[n]) { seen[n] = 1; queue.push(n); } }
  return anchors.map(p => near(p).some(i => seen[i]));
}
