// The treehouse's plan from its pieces (housekeeping, Ed 2026-10-23: one file a room, so pull requests on different rooms stop
// colliding): config/house/base.json (the house's own numbers) and config/house/rooms/<id>.json (a room's place on the plan and its
// objects), put together into what the game reads (rooms, branches, objects and the floor's shape: rules/houseRooms.ts HouseConfig).
// Pure: the game reads the files by name (src/rules/houseConfig.ts, which imports each room), the tools from disk
// (config/house/load.mjs).
//
// The oak (Ed, 2026-10-24, the layout v4: previews/ed/treehouse-layout-v4 on claude/treehouse-trunk-mock). A room file: its id and
// label; `order` (the trunk's rooms bottom to top by it, the Terrace among them; then the branch rooms); `trunk` (a room of the
// trunk) or `from` (the trunk room its branch leaves) and the branch's `bend` (m: its curve's bow); its middle `x`, `z` and its size
// `r` (m, about its radius: its outline wobbles round it); and its `objects`, each everything it carries in the game (id, label,
// use, ...) and where it stands: an `offset` from its room's middle (m on the plan) and its `box` (w along x, d along z, h). No room is
// locked (Ed, 2026-11-03: "can we join it all into one room? ... it's ok if they're open before being occupied"): Bedrooms 2 and 3,
// locked behind doors till then, are walked like the rest.

import { branchLimb, curveAt, limbCurve, spineLimb } from "./shape.js";

const f2 = v => +v.toFixed(2);

/** The floor's shape (config/house/shape.js): the trunk's rooms, the branch rooms, and each branch room's stub (where its limb leaves
 *  its far side, the floor bulging 2.5 m past the room: the mock's revision 4). */
export function houseShape(base, files) {
  const sorted = [...files].sort((a, b) => a.order - b.order), room = f => ({ id: f.id, x: f.x, z: f.z, r: f.r });
  const trunk = sorted.filter(f => f.trunk).map(room), byId = Object.fromEntries(trunk.map(r => [r.id, r]));
  const branches = sorted.filter(f => f.from).map(f => {
    if (!byId[f.from]) throw new Error(`house: ${f.id}'s branch leaves ${f.from}, which isn't a trunk room`);
    return { ...room(f), from: f.from, bend: f.bend ?? 0 };
  });
  const stubs = branches.map(r => {
    const q = limbCurve(byId[r.from], r, r.bend), a = Math.atan2(r.z - q.c.z, r.x - q.c.x), w = Math.max(2.8, r.r * 0.42), L = r.r + 2.5;
    return { room: r.id, a: { x: r.x, z: r.z }, b: { x: f2(r.x + Math.cos(a) * L), z: f2(r.z + Math.sin(a) * L) }, w0: f2(w * 0.9), w1: 1.4 };
  });
  return { noiseAt: base.noiseAt ?? [0, 0], trunk, branches, stubs };
}

/** @param {any} base config/house/base.json @param {any[]} files config/house/rooms/*.json, in any order */
export function assemble(base, files) {
  const S = houseShape(base, files), byId = Object.fromEntries([...S.trunk, ...S.branches].map(r => [r.id, r]));
  const sorted = [...files].sort((a, b) => a.order - b.order);
  const rooms = sorted.map(f => ({ id: f.id, label: f.label, x: f.x, z: f.z, x0: f2(f.x - f.r), x1: f2(f.x + f.r), z0: f2(f.z - f.r), z1: f2(f.z + f.r), r: f.r,
    ...(f.trunk ? { trunk: true } : { from: f.from }) }));
  // the limbs as branch stretches (their middle lines, nine points, and their width: for the tools and the crown's builder; the floor
  // itself is the shape's): the trunk's, and each branch's from its trunk room into its room
  const corridors = [];
  const stretch = (id, l) => {
    const q = limbCurve(l.a, l.b, l.bend), pts = [];
    for (let i = 0; i <= 8; i++) { const p = curveAt(q, i / 8); pts.push([f2(p.x), f2(p.z)]); }
    const xs = pts.map(v => v[0]), zs = pts.map(v => v[1]), w = f2(l.w0 + l.w1);
    corridors.push({ id, x0: f2(Math.min(...xs) - w / 2), x1: f2(Math.max(...xs) + w / 2), z0: f2(Math.min(...zs) - w / 2), z1: f2(Math.max(...zs) + w / 2), w, pts });
  };
  for (let i = 1; i < S.trunk.length; i++) stretch(`${S.trunk[i - 1].id}-${S.trunk[i].id}`, spineLimb(S.trunk[i - 1], S.trunk[i], i));
  for (const r of S.branches) stretch(`${r.from}-${r.id}`, branchLimb(byId[r.from], r));
  // the objects, room by room, each at its offset from its room's middle
  const objects = [];
  for (const f of sorted) {
    const p = byId[f.id];
    for (const o of f.objects ?? []) { const { offset, box, ...own } = o; objects.push({ ...own, room: f.id, x: f2(p.x + offset[0]), z: f2(p.z + offset[1]), w: box.w, d: box.d, h: box.h }); }
  }
  const { _: _note, noiseAt: _n, ...rest } = base;
  return { ...rest, rooms, corridors, objects, shape: S };
}

/** The rooms' places (middles and sizes, and the trunk room each branch room leaves), for the plan's checks (tools/house/organic.mjs). */
export function roomPlaces(base, files) {
  const P = {};
  for (const f of files) P[f.id] = { id: f.id, parent: f.from, trunk: !!f.trunk, x: f.x, z: f.z, r: f.r };
  return P;
}
