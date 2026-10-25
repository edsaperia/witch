// The oak's floor traced (tools/house/organic.mjs --outline writes config/house/outline.json for the crown's builder; the walk's length
// for its checks), from the assembled house (config/house/assemble.js) and its shape (config/house/shape.js). Pure.
import { field, inRoom, outline } from "./shape.js";

const f2 = v => +v.toFixed(2);
const DEG = Math.PI / 180;

/** The Terrace's take-off: its point on the rim and its angle span (degrees round from east, clockwise; base.json terrace.takeoff). */
export function takeoffOf(H) {
  const T = H.rooms.find(r => r.id === "terrace"), k = H.terrace.takeoff, a = k.angle * DEG;
  return { x: f2(T.x + Math.cos(a) * T.r), z: f2(T.z + Math.sin(a) * T.r), from: f2(k.angle - k.half), to: f2(k.angle + k.half) };
}

/** Her walk from the bed down the trunk (her Bedroom, the Boudoir, the Parlour, the Terrace): straight lines through their middles, as
 *  the mock measured it; to where it first comes onto the Terrace's own floor, to its middle and on to the take-off. */
export function houseWalk(H) {
  const at = id => H.rooms.find(r => r.id === id), bed = H.objects.find(o => o.use.kind === "bed");
  const pts = [[bed.x, bed.z], ...["bedroom", "boudoir", "parlour", "terrace"].map(id => [at(id).x, at(id).z])], T = takeoffOf(H);
  let toTerrace = 0, toMiddle = 0, found = false;
  for (let i = 1; i < pts.length; i++) {
    const [ax, az] = pts[i - 1], [bx, bz] = pts[i], L = Math.hypot(bx - ax, bz - az);
    for (let s = 0; s < L && !found; s += 0.1) { const x = ax + ((bx - ax) * s) / L, z = az + ((bz - az) * s) / L; if (inRoom(H.shape, "terrace", x, z) < 0) { toTerrace += s; found = true; } }
    if (!found) toTerrace += L;
    toMiddle += L;
  }
  return { toTerrace, toMiddle, toTakeoff: toMiddle + Math.hypot(T.x - at("terrace").x, T.z - at("terrace").z) };
}

/** Everything the crown's builder reads (tools/house/organic.mjs says what each is). */
export function houseOutline(H) {
  const S = H.shape, box = { x0: -100, x1: 100, z0: -100, z1: 100 }, ring = rs => rs.sort((a, b) => b.length - a.length);
  const rooms = H.rooms.map(r => ({ id: r.id, label: r.label, x: r.x, z: r.z, r: r.r, ...(r.trunk ? { trunk: true } : { from: r.from }), ...(r.locked ? { locked: true } : {}),
    outline: ring(outline(S, { x0: r.x - r.r * 1.4, x1: r.x + r.r * 1.4, z0: r.z - r.r * 1.4, z1: r.z + r.r * 1.4 }, 0.5, (x, z) => inRoom(S, r.id, x, z) < 0))[0] ?? [] }));
  return {
    _: "The oak treehouse's floor (tools/house/organic.mjs --outline; don't edit): metres on the house's plan, x east, z south, the Terrace's middle 0 at the map's treehouse, no turn; the floor at the tuning's treehouse.house.height. floor: the whole floor's outline (rings, the largest first; as drawn, the locked rooms in); walk: what she walks; rooms: each room's own outline; branches: each limb's middle line and width; stubs: where each branch room's limb carries on past its floor (bark: the crown's); takeoff: the Terrace's open rim (its point, its span in degrees round from east, clockwise).",
    floor: ring(outline(S, box, 0.5)),
    walk: ring(outline(S, box, 0.5, (x, z) => field(S, x, z, true) < 0)),
    rooms,
    branches: H.corridors.map(c => ({ id: c.id, w: c.w, pts: c.pts })),
    stubs: S.stubs.map(l => ({ room: l.room, from: [l.a.x, l.a.z], to: [l.b.x, l.b.z], w0: l.w0, w1: l.w1 })),
    takeoff: takeoffOf(H),
  };
}
