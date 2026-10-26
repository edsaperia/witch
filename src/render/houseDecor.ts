// The treehouse's rooms dressed (Ed, 2026-10-23; art/houseDecor.js): each room's rug and four to six pieces (Ed's pick: a middle
// density) placed by `decorPlan` and drawn as one picture a room (render/housePieces.ts `roomDecorPiece`, by the art workers: each piece baked and lit as the furniture is,
// render/houseFurniture.ts, then laid on one canvas, the far ones first), so a room's dressing is one draw and one bake, kept light on
// Ed's laptop's graphics. Only looked at: nothing in the rules knows of it. The pieces stand by the walls, clear of the doorways where
// the branches come in, of the way in from each door to the room's middle, and of every object's reach (the stations stay as easy to
// use as before); the rug lies a little south of the middle, under whatever stands there. `?decor=0` leaves the rooms bare.
import { HOUSE_ROOMS, type HouseConfig, type Rect } from "../rules/houseRooms";

/** Whether the rooms are dressed (`?decor=0`: bare, as before). */
export const decorOn = typeof location === "undefined" || new URLSearchParams(location.search).get("decor") !== "0";

/** Each room's dressing, in the order they're placed (the first the most wanted): a rug (where its floor hasn't one: Golf's bedroom
 *  has), then the pieces, the room's character in them. Rooms not named get DEFAULT. */
export const ROOM_DECOR: Record<string, string[]> = {
  bedroom: ["plant", "shelf", "candles", "neon", "books"],
  boudoir: ["rug", "candles", "neon", "plant", "lantern"],
  parlour: ["rug", "lamp", "plant", "books", "candles"],
  workshop: ["rug", "crates", "lantern", "mushrooms", "plant", "lamp"],
  studio: ["rug", "neon", "crates", "plant"],
  kitchen: ["rug", "shelf", "plant", "candles", "lantern", "mushrooms"],
  solarium: ["rug", "plant", "plant", "mushrooms", "lantern", "candles"],
  dining: ["rug", "lamp", "plant", "candles", "books", "neon"],
  cloakroom: ["rug", "plant", "candles", "lantern"],
  bestiary: ["rug", "mushrooms", "candles", "lantern", "books", "plant"],
  turret: ["lantern", "crates", "plant"],
};
const DEFAULT = ["rug", "plant", "lantern", "candles"];

/** One piece of a room's dressing: its kind, its place (metres on the plan from the room's middle), which way it faces (the art's
 *  yaw: 0 the camera), its seed, and a rug's radius (metres, house.json's). */
export interface DecorItem { kind: string; x: number; z: number; yaw: number; k: number; r?: number }

/** A rug's colours, times this: it lies flat to the light, and a pale one blooms into a glare (the solarium's cream). */
export const RUG_DIM = 0.6;
/** Clear of these (m): a doorway, the way in from it, an object's reach past its edge (on top of the house's own reach). */
const DOOR_CLEAR = 2.8, WAY_CLEAR = 1.8, REACH_CLEAR = 0.4, GAP = 2;

const hash = (a: number, b: number) => { let h = (a * 374761393 + b * 668265263) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
const idSeed = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7);
const toSeg = (px: number, pz: number, a: [number, number], b: [number, number]) => { const dx = b[0] - a[0], dz = b[1] - a[1], t = Math.max(0, Math.min(1, ((px - a[0]) * dx + (pz - a[1]) * dz) / Math.max(1e-9, dx * dx + dz * dz))); return Math.hypot(px - a[0] - dx * t, pz - a[1] - dz * t); };

/** Where a room's dressing goes (pure: the same every load): the rug, then each piece of its list by the wall, the first free place
 *  in a seeded order round its back and sides at least GAP from the last, clear of the doorways, the ways in and the objects' reach. */
export function decorPlan(room: Rect & { id: string; r?: number; locked?: boolean }, H: HouseConfig = HOUSE_ROOMS): DecorItem[] {
  if (!room.r || room.locked) return [];
  const R = room.r, cx = (room.x0 + room.x1) / 2, cz = (room.z0 + room.z1) / 2, seed = idSeed(room.id), kinds = ROOM_DECOR[room.id] ?? DEFAULT;
  // the doorways: each branch's end on this room's floor, and the way in from it to the room's middle
  const doors: [number, number][] = [];
  for (const c of H.corridors) if (c.pts && c.id.split("-").includes(room.id)) { const ends = [c.pts[0], c.pts[c.pts.length - 1]]; const e = ends.reduce((a, b) => (Math.hypot(a[0] - cx, a[1] - cz) < Math.hypot(b[0] - cx, b[1] - cz) ? a : b)); doors.push([e[0] - cx, e[1] - cz]); }
  const objects = H.objects.filter(o => Math.hypot(o.x - cx, o.z - cz) < R + 2);
  const clear = (x: number, z: number) => doors.every(d => Math.hypot(x - d[0], z - d[1]) > DOOR_CLEAR && toSeg(x, z, d, [0, 0]) > WAY_CLEAR)
    && objects.every(o => Math.hypot(Math.max(0, Math.abs(cx + x - o.x) - o.w / 2), Math.max(0, Math.abs(cz + z - o.z) - o.d / 2)) > H.reach + REACH_CLEAR);
  const face = (x: number, z: number) => { const L = Math.hypot(x, z) || 1, fx = -x / L, fz = Math.abs(-z / L); return Math.atan2(-fx, fz); }; // (towards the middle, turned to the camera's side)
  const out: DecorItem[] = [];
  // the rug, a little south of the middle (Golf's bedroom floor has its own)
  if (kinds[0] === "rug" && room.id !== "bedroom") out.push({ kind: "rug", x: 0, z: R * 0.15, yaw: 0, k: seed, r: Math.min(R * 0.42, 2.8) });
  // the places round the back and sides (bearings from north, clockwise; the front's the rail and the camera's view)
  const places: [number, number][] = [];
  for (const d of [R - 1.05, R - 1.5]) for (let b = -125; b <= 125; b += 6) { const a = (b * Math.PI) / 180; places.push([d * Math.sin(a), -d * Math.cos(a)]); }
  const order = places.map((p, i) => ({ p, s: hash(seed, i) })).sort((a, b) => a.s - b.s).map(q => q.p);
  kinds.filter(k => k !== "rug").forEach((kind, i) => {
    const at = order.find(([x, z]) => clear(x, z) && out.every(q => q.kind === "rug" || Math.hypot(q.x - x, q.z - z) > GAP));
    if (at) out.push({ kind, x: +at[0].toFixed(2), z: +at[1].toFixed(2), yaw: face(at[0], at[1]), k: seed + i * 101 });
  });
  return out;
}

/** The rooms dressed (those with any), for render/houseRooms.ts. */
export const DECOR_ROOMS = decorOn ? HOUSE_ROOMS.rooms.filter(r => decorPlan(r).length) : [];
