// The treehouse's plan from its pieces (housekeeping, Ed 2026-10-23: one file a room, so the Workshop's, the Studio's, the bedrooms' and
// the dressing's pull requests stop colliding in one config/house.json): config/house/base.json (the house's own numbers) and
// config/house/rooms/<id>.json (a room's place on the plan and its objects), put together as config/house.json was (rooms, branches,
// objects: rules/houseRooms.ts HouseConfig). Pure: the game reads the files through Vite (src/rules/houseConfig.ts), the tools from
// disk (config/house/load.mjs). This is tools/house/organic.mjs's arithmetic, as it wrote config/house.json before the split.
//
// A room file: its id and label; `order` (where it comes among the rooms: the Terrace 0, then tens, so a new one slots in between);
// its parent room, the `bearing` from the parent's middle (degrees clockwise from north), the `branch` (m, rim to rim), its `radius`
// (m) and the branch's `bend` (m to one side); `locked` (drawn, its branch ending at its door: Bedrooms 2 and 3) with its `door`
// (an object on the parent's side: label, foot, use); and its `objects`. The Terrace (the hub, radius base.hub) has no parent.
// An object: everything it carries in the game (id, label, use, ...) and where it stands: a `bearing` from its room's middle, `in`
// (m from the rim to its middle; else half its depth and a little, its back against the rail), its `foot` (m: along the wall it
// backs on, out from it, up; turned into the plan's box by the way it faces), or an `offset` from the room's middle; `box` sets the
// plan's box outright (w along x, d along z, h).

const f2 = v => +v.toFixed(2);

/** @param {any} base config/house/base.json @param {any[]} files config/house/rooms/*.json, in any order */
export function assemble(base, files) {
  const HUB = base.hub, BW = base.branchWidth;
  const byId = Object.fromEntries(files.map(f => [f.id, f]));
  const placed = files.filter(f => f.parent).sort((a, b) => a.order - b.order);
  // each room by its parent (a parent always comes first: its `order` lower)
  const P = { terrace: { id: "terrace", x: 0, z: 0, r: HUB } };
  for (const f of placed) {
    const q = P[f.parent];
    if (!q) throw new Error(`house: ${f.id}'s parent ${f.parent} isn't placed before it (its order)`);
    const d = q.r + f.branch + f.radius, a = (f.bearing * Math.PI) / 180;
    P[f.id] = { id: f.id, label: f.label, parent: f.parent, x: f2(q.x + d * Math.sin(a)), z: f2(q.z - d * Math.cos(a)), r: f.radius, bend: f.bend, locked: !!f.locked };
  }
  const L = placed.map(f => P[f.id]);
  const rooms = L.map(p => ({ id: p.id, label: p.label, x0: f2(p.x - p.r), x1: f2(p.x + p.r), z0: f2(p.z - p.r), z1: f2(p.z + p.r), r: p.r, ...(p.locked ? { locked: true } : {}) }));
  // a branch from its parent's floor into its room's (1.4 m in each end, so the walk runs on through), or, to a locked room, to its door
  // (its line ending its half-width short of the rim, so its walked end, round, stops at the door)
  const doors = {};
  const corridors = L.map(p => {
    const q = P[p.parent], dx = p.x - q.x, dz = p.z - q.z, len = Math.hypot(dx, dz), ux = dx / len, uz = dz / len;
    const a = [q.x + ux * (q.r - 1.4), q.z + uz * (q.r - 1.4)], b = p.locked ? [p.x - ux * (p.r + 1.45), p.z - uz * (p.r + 1.45)] : [p.x - ux * (p.r - 1.4), p.z - uz * (p.r - 1.4)];
    if (p.locked) doors[p.id] = { x: f2(p.x - ux * (p.r - 0.15)), z: f2(p.z - uz * (p.r - 0.15)) };
    const c = [(a[0] + b[0]) / 2 - uz * p.bend * 1.5, (a[1] + b[1]) / 2 + ux * p.bend * 1.5], pts = [];
    for (let i = 0; i <= 8; i++) { const t = i / 8, m = (1 - t) * (1 - t), n = 2 * t * (1 - t), o = t * t; pts.push([f2(m * a[0] + n * c[0] + o * b[0]), f2(m * a[1] + n * c[1] + o * b[1])]); }
    const xs = pts.map(v => v[0]), zs = pts.map(v => v[1]);
    return { id: `${p.parent}-${p.id}`, x0: f2(Math.min(...xs) - BW / 2), x1: f2(Math.max(...xs) + BW / 2), z0: f2(Math.min(...zs) - BW / 2), z1: f2(Math.max(...zs) + BW / 2), w: BW, pts };
  });
  // the objects, room by room (the Terrace's first), each placed as organic.mjs's `at` placed it
  const objects = [];
  for (const f of [byId.terrace, ...placed].filter(Boolean)) {
    const p = P[f.id];
    for (const o of f.objects ?? []) {
      const { bearing, in: inn, foot, offset, box, ...own } = o, [W, D, Hh] = foot, a = (bearing * Math.PI) / 180, side = Math.abs(Math.sin(a)) > Math.abs(Math.cos(a));
      const R = p.r - (inn ?? D / 2 + 0.35);
      const at = offset ? { x: f2(p.x + offset[0]), z: f2(p.z + offset[1]) } : { x: f2(p.x + R * Math.sin(a)), z: f2(p.z - R * Math.cos(a)) };
      objects.push({ ...own, room: f.id, ...at, w: side ? D : W, d: side ? W : D, h: Hh, ...(box ?? {}) });
    }
    if (f.locked && f.door) { const { foot: [w, d, h], ...door } = f.door; objects.push({ id: `${f.id}Door`, room: f.parent, ...door, ...doors[f.id], w, d, h }); }
  }
  const { hub: _h, branchWidth: _b, ...rest } = base;
  return { ...rest, rooms, corridors, objects };
}

/** The rooms' places (middles and radii, the Terrace's too), for the plan's checks (tools/house/organic.mjs). */
export function roomPlaces(base, files) {
  const H = assemble(base, files), P = { terrace: { id: "terrace", x: 0, z: 0, r: base.hub } };
  for (const r of H.rooms) P[r.id] = { id: r.id, parent: files.find(f => f.id === r.id).parent, x: (r.x0 + r.x1) / 2, z: (r.z0 + r.z1) / 2, r: r.r };
  return P;
}
