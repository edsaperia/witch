// The treehouse's rooms (Ed, 2026-10-19: "we should start working on building this into the island so you can enter and exit
// during the party"; the oak since 2026-10-24, the layout v4: config/house/): the trunk's rooms in a soft S and a pair of branch rooms
// off each of the first four, one floor smooth-unioned from them all (config/house/shape.js: she walks exactly the drawn shape), each
// room holding objects she walks up to and uses: the dressing stations, the bags and the Workshop's bay, lathe and pegboard slide in their panels as she nears them
// (rules/stations.ts), and with E (the sigil button) the hats' floor holds her hats as objects, the bed (E held) ends the night, the bestiary's book opens the zoo over the night,
// and the rest are placeholders that say a line. The rules know where the floor is and which object she's at; what an object's E
// opens is main.ts's (the "house" leash event). No drawing here (render/houseRooms.ts).
import { HOUSE_CONFIG as HOUSE } from "./houseConfig";
import { HAT_SPELLS, ownsHat, setLoadout } from "./spells";
import { hatButton, leaveHat, wearing } from "./hat";
import type { Witch } from "./game";
import type { LeashEvent } from "./leash";
import { field, inRoom, nearestFloor, nearestInRoom, roomAt as shapeRoomAt } from "../../config/house/shape.js";

/** A rectangle of floor on the house's plan (config/house/): metres from the hub's centre along the plan's axes (x, z: east and
 *  south, turned by the plan's `turn`: fromPlan). */
export interface Rect { x0: number; x1: number; z0: number; z1: number; /** a round room (Ed, 2026-10-23: "the rooms are probably round"): its radius about the rectangle's middle */ r?: number; /** a branch (Ed: "the corridors are tree branches"): its middle line on the plan and its width, the rectangle its bounds */ pts?: [number, number][]; w?: number; /** a room drawn but not walked yet (Bedrooms 2 and 3: Ed, 2026-10-23, "locked. The branch stops at the door") */ locked?: boolean }
/** What E does at an object (config/house/ `use`). */
export type HouseUse =
  | { kind: "creator"; axes: string[]; wear: string[]; parts: string[]; spell?: "hat" | "broom" }
  /** Only to look at (Ed, 2026-10-29: the Workshop's bay and pegboard, since the broom is one station at the lathe): no prompt, E does nothing. */
  | { kind: "scenery" }
  | { kind: "hats" } | { kind: "bed" } | { kind: "zoo" } | { kind: "telescope" } | { kind: "say"; line: string } | /** the invitations desk (rules/kit.ts) */ { kind: "invites" }
  /** The map table (Ed, 2026-10-24: the Solarium's): E opens the sea chart (rules/treehouse.ts atMapTable). */
  | { kind: "chart" }
  /** A treehouse Studio instrument (Ed, 2026-10-23): she's at it by nearness, its menu in and every key playing it (rules/studio.ts). */
  | { kind: "instrument"; instrument: "drums" | "synth" | "mic" }
  /** Last night's clothes, in a pile by her bed (rules/clothesPile.ts): E puts on all that's still in it, on a wake-up. */
  | { kind: "pile" };
export interface HouseObject { id: string; room: string; label: string; x: number; z: number; w: number; d: number; h: number; use: HouseUse }
/** A room of the oak (config/house/rooms/): its middle and size, a trunk room or the trunk room its branch leaves, its bounds. */
export type HouseRoom = Rect & { id: string; label: string; x: number; z: number; r: number; trunk?: boolean; from?: string; locked?: boolean };
/** The floor's one shape (config/house/shape.js; assemble.js makes it): the trunk's rooms, the branch rooms, the stubs, and where the
 *  plan's 0 lay on the mock's own plan (its noise seeded there). */
export interface HouseShape { noiseAt: [number, number]; trunk: { id: string; x: number; z: number; r: number }[]; branches: { id: string; from: string; x: number; z: number; r: number; bend: number; locked?: boolean }[]; stubs: { room: string; a: { x: number; z: number }; b: { x: number; z: number }; w0: number; w1: number }[] }
/** The Terrace's own layout (config/house/base.json terrace), metres from its middle: the open rim's angle and half-span (degrees round
 *  from east, clockwise), the decks' desk, her seat behind it, the magic circle. */
export interface TerraceLayout { takeoff: { angle: number; half: number }; decks: { x: number; z: number; w: number; d: number }; seat: { x: number; z: number }; circle: { x: number; z: number; r: number } }
export interface HouseConfig {
  on: boolean; wall: number; reach: number; /** the plan's turn about the Terrace's middle (degrees; fromPlan) */ turn?: number;
  /** the Ent's own (Ed, 2026-10-23): rooms on its limbs, the map table an object */ organic?: boolean;
  rooms: HouseRoom[]; corridors: (Rect & { id: string })[]; shape: HouseShape; terrace: TerraceLayout;
  objects: HouseObject[]; bed: { hold: number };
  /** Rooms to come, their floor and their door kept clear on the plan (the guests' bedrooms: Ed, 2026-10-21, docs/backlog/treehouse.md); not walked or drawn yet. */
  reserved?: (Rect & { id: string; label: string; door: Rect })[];
}
export const HOUSE_ROOMS = HOUSE as unknown as HouseConfig;

/** Her business in the house's rooms: the bed's hold (since when E has been held at it) and the hats lying on the hats' floor
 *  (their spells, by slot: "" an empty one), laid out the first time she comes in. */
export interface HouseState { bedFrom?: number; hats?: string[]; /** she's slept: the night's over (once) */ slept?: boolean }

/** The hub's centre in the world, for the rooms' metres. */
interface At { x: number; z: number }

/** The house's plan turned (Ed, 2026-10-21: "more of an isometric view"): the rooms, corridors and objects are laid out square on
 *  a plan turned `turn` degrees about the hub's centre (house.json; 45: each room's floor a diamond on the screen, two of its walls
 *  behind it, as the creator's bedroom), while the hub and balcony, and her place and her keys, stay the world's. Plan to world:
 *  the plan's x runs north-east and its z south-east at 45. */
export function fromPlan(at: At, x: number, z: number, turn = HOUSE_ROOMS.turn ?? 0): { x: number; z: number } {
  const a = (turn * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a);
  return { x: at.x + x * c + z * s, z: at.z - x * s + z * c };
}
/** World to plan: (x, z) in the world as metres on the house's plan from the hub's centre. */
export function toPlan(at: At, x: number, z: number, turn = HOUSE_ROOMS.turn ?? 0): { x: number; z: number } {
  const a = (turn * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a), dx = x - at.x, dz = z - at.z;
  return { x: dx * c - dz * s, z: dx * s + dz * c };
}

/** The house's floor in the world: the Terrace's middle (the plan's 0), the plan's turn, the shape, and how far in from its edge she's
 *  kept (her rail's keep-in, m). */
export interface RoomFloor { at: At; turn: number; shape: HouseShape; inset: number }
/** The house's floor at the Terrace's middle `at`, kept `inset` metres in from its edge. */
export function floorRects(at: At, inset = 0, H = HOUSE_ROOMS): RoomFloor {
  return { at: { x: at.x, z: at.z }, turn: H.turn ?? 0, shape: H.shape, inset };
}
/** The nearest point of a floor shape to (x, z) on the plan, and how far (0 inside). */
export function nearestIn(r: Rect, x: number, z: number): { x: number; z: number; d: number } {
  if (r.r) { const cx = (r.x0 + r.x1) / 2, cz = (r.z0 + r.z1) / 2, d = Math.hypot(x - cx, z - cz); return d <= r.r ? { x, z, d: 0 } : { x: cx + ((x - cx) * r.r) / d, z: cz + ((z - cz) * r.r) / d, d: d - r.r }; }
  if (r.pts) {
    let best = { x, z, d: Infinity }; const h = (r.w ?? 3) / 2;
    for (let i = 1; i < r.pts.length; i++) {
      const [ax, az] = r.pts[i - 1], [bx, bz] = r.pts[i], dx = bx - ax, dz = bz - az, t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / Math.max(1e-9, dx * dx + dz * dz)));
      const px = ax + dx * t, pz = az + dz * t, d = Math.hypot(x - px, z - pz);
      if (d - h < best.d) best = d <= h ? { x, z, d: 0 } : { x: px + ((x - px) * h) / d, z: pz + ((z - pz) * h) / d, d: d - h };
    }
    return best;
  }
  const px = Math.min(r.x1, Math.max(r.x0, x)), pz = Math.min(r.z1, Math.max(r.z0, z));
  return { x: px, z: pz, d: Math.hypot(px - x, pz - z) };
}
/** How far (x, z) in the world is past the edge of what she walks (negative: inside, by that much), on the shape (config/house/shape.js). */
export const floorDistance = (f: RoomFloor, x: number, z: number): number => { const p = toPlan(f.at, x, z, f.turn); return field(f.shape, p.x, p.z, true); };
/** On the house's floor (`pad` metres past its keep-in), standing at (x, z) in the world. */
export const onRoomFloor = (f: RoomFloor, x: number, z: number, pad = 0): boolean => floorDistance(f, x, z) <= pad - f.inset;
/** The nearest point to (x, z) on the house's floor, inside its keep-in (in the world), and how far it is. */
export function nearestRoomFloor(f: RoomFloor, x: number, z: number): { x: number; z: number; d: number } | null {
  const p = toPlan(f.at, x, z, f.turn), n = nearestFloor(f.shape, p.x, p.z, f.inset);
  return { ...fromPlan(f.at, n.x, n.z, f.turn), d: n.d };
}
/** The room (x, z) in the world stands in (its own outline), or null on a limb between rooms. */
export function roomAt(at: At, x: number, z: number, H = HOUSE_ROOMS): HouseRoom | null {
  const p = toPlan(at, x, z, H.turn ?? 0), r = shapeRoomAt(H.shape, p.x, p.z) as { id: string } | null;
  return r ? H.rooms.find(q => q.id === r.id) ?? null : null;
}
/** A room's own floor (its outline alone), kept to it: (x, z) in the world, put back inside it `inset` metres in; null without it. */
export function keepInRoom(at: At, room: string, x: number, z: number, inset = 0, H = HOUSE_ROOMS): { x: number; z: number; inside: boolean } | null {
  if (!H.rooms.some(q => q.id === room)) return null;
  const p = toPlan(at, x, z, H.turn ?? 0);
  if (inRoom(H.shape, room, p.x, p.z) <= -inset) return { x, z, inside: true };
  const n = nearestInRoom(H.shape, room, p.x, p.z, inset);
  return { ...fromPlan(at, n.x, n.z, H.turn ?? 0), inside: false };
}
/** Where on the plan's (x, z) an object's middle is, in the world (or any point given on the plan relative to it: dx along its w, dz along its d). */
export const objectWorld = (o: HouseObject, at: At, dx = 0, dz = 0, H = HOUSE_ROOMS): { x: number; z: number } => fromPlan(at, o.x + dx, o.z + dz, H.turn ?? 0);

/** A spot `by` metres in front of an object, in the world: off the side of it that faces into its room (towards the room's middle,
 *  along the plan's nearer axis: a wall's piece faces out from its wall), where she stands to use it. */
export function objectFront(o: HouseObject, at: At, by = 0.5, H = HOUSE_ROOMS): { x: number; z: number } {
  const r = H.rooms.find(q => q.id === o.room), dx = r ? (r.x0 + r.x1) / 2 - o.x : -o.x, dz = r ? (r.z0 + r.z1) / 2 - o.z : -o.z;
  return Math.abs(dx) > Math.abs(dz) ? objectWorld(o, at, Math.sign(dx) * (o.w / 2 + by), 0, H) : objectWorld(o, at, 0, Math.sign(dz || 1) * (o.d / 2 + by), H);
}

/** How far (x, z) in the world is from an object's footprint (0 on it), the hub's centre at `at`, measured on the house's plan
 *  (rules/stations.ts reads it too: the one place an object's place in the world is worked out for nearness). */
export const fromObject = (o: HouseObject, at: At, x: number, z: number, H = HOUSE_ROOMS) => {
  const p = toPlan(at, x, z, H.turn ?? 0), dx = Math.max(0, Math.abs(p.x - o.x) - o.w / 2), dz = Math.max(0, Math.abs(p.z - o.z) - o.d / 2);
  return Math.hypot(dx, dz);
};
/** A spot `gap` metres in front of an object, the hub's centre at `at`: where she'd stand to use it (tests, tools; objectFront). */
export const objectFrontAt = (o: HouseObject, at: At, gap: number): { x: number; z: number } => objectFront(o, at, gap);
/** Whether the deck is the house with its rooms (a floor to walk, objects to be at). */
export const hasRooms = (d: { house?: { rooms: RoomFloor | null } } | null | undefined): boolean => !!d?.house?.rooms?.shape;
/** The object she's at, standing at (x, z) in the world: the nearest within reach of its edge, or null. */
export function objectAt(at: At, x: number, z: number, H = HOUSE_ROOMS): HouseObject | null {
  let best: HouseObject | null = null, bd = H.reach;
  for (const o of H.objects) { const d = fromObject(o, at, x, z, H); if (d <= bd) { bd = d; best = o; } }
  return best;
}

/** The hats' floor's spells, in slot order: every built hat but "none" (rules/spells.ts). */
export const HAT_FLOOR = HAT_SPELLS.filter(s => s.built && s.id !== "none").map(s => s.id as string);
/** The hats' floor's slots in the world: its spells laid in two rows across it (on the plan). */
export function hatSlots(at: At, H = HOUSE_ROOMS): { x: number; z: number }[] {
  const o = H.objects.find(q => q.use.kind === "hats");
  if (!o) return [];
  const n = HAT_FLOOR.length, per = Math.ceil(n / 2), out: { x: number; z: number }[] = [];
  for (let i = 0; i < n; i++) { const row = i < per ? 0 : 1, col = row ? i - per : i, cols = row ? n - per : per; out.push(fromPlan(at, o.x - o.w / 2 + (o.w * (col + 0.5)) / cols, o.z + (row ? 0.45 : -0.45) * o.d, H.turn ?? 0)); }
  return out;
}
/** The hats lying on the hats' floor (each slot's spell, "" when empty), laid out the first time: every one of hers but the one
 *  she wears and any lying elsewhere. A hat she hasn't found leaves its slot empty (Ed, 2026-10-23: "the floor fills as she finds
 *  them"). */
export function floorHats(W: Witch): string[] {
  const H = (W.house ??= {});
  return (H.hats ??= hatsOnFloor(W));
}
/** The hats on the hats' floor as they are, or as they'd be laid out, without laying them (for the view). */
export function hatsOnFloor(W: Witch): string[] {
  if (W.house?.hats) return W.house.hats;
  const out = new Set([W.spells.hat, ...W.hat.left.map(q => q.spell)]);
  return HAT_FLOOR.map(s => (out.has(s) || !ownsHat(W.spells, s) ? "" : s));
}
/** A hat she's just found (rules/finds.ts) laid in its slot, if the floor's laid out already (else it's laid with the rest). */
export function addFloorHat(W: Witch, id: string): void {
  const hats = W.house?.hats, i = HAT_FLOOR.indexOf(id);
  if (hats && i >= 0 && !hats[i] && W.spells.hat !== id) hats[i] = id;
}

/** The hat E would take, standing at (x, z) on the hats' floor (Ed, 2026-10-29: "The floor hats are not a separate station; it's
 *  just an area where normal hat objects are placed when they spawn"): the nearest hat lying in its slot within `reach` (`slot`), or
 *  else her own lying within `radius` (her first morning's, in the floor's middle); null by none (the floor itself does nothing).
 *  Where it lies, in the world. */
export function hatToTake(W: Witch, at: At, x: number, z: number, radius: number, reach = 0.9): { x: number; z: number; slot?: number } | null {
  if (!W.hat.has) return null;
  const hats = hatsOnFloor(W), slots = hatSlots(at);
  let pick = -1, bd = reach;
  hats.forEach((s, i) => { const d = Math.hypot(slots[i].x - x, slots[i].z - z); if (s && d <= bd) { bd = d; pick = i; } });
  if (pick >= 0) return { ...slots[pick], slot: pick };
  const d = W.hat.down;
  return d && Math.hypot(d.x - x, d.z - z) <= radius ? { x: d.x, z: d.z } : null;
}

/** E by a hat on the hats' floor (Ed, 2026-10-19: "there's no hat rack per se - just an area to put down hats, which are just game
 *  objects that can be picked up and put down"; 2026-10-29, each an object of its own: hatToTake). By a hat lying in its slot, she
 *  takes it: the one she wore goes down in its place, and bare-headed, her own lying elsewhere stays where it lies (rules/hat.ts
 *  leaveHat). By her own lying there, she picks it up. Nowhere near a hat, nothing. Returns the leash event, or null when the press
 *  did nothing. */
export function useHats(W: Witch, at: At, x: number, z: number, time: number, radius: number, reach = 0.9): LeashEvent | null {
  const h = hatToTake(W, at, x, z, radius, reach);
  if (!h) return null;
  if (h.slot !== undefined) {
    const hats = floorHats(W), took = hats[h.slot], worn = wearing(W.hat);
    if (!worn) leaveHat(W.hat, W.spells.hat);
    hats[h.slot] = worn && W.spells.hat !== "none" ? W.spells.hat : "";
    setLoadout(W.spells, took);
    return { kind: "hatPicked", id: W.id, x: h.x, z: h.z, at: time };
  }
  const own = hatButton(W.hat, x, z, radius, W.spells.hat);
  if (own === null) return null;
  if (own !== W.spells.hat) setLoadout(W.spells, own);
  return { kind: "hatPicked", id: W.id, x, z, at: time };
}

/** The bed's hold (Ed, 2026-10-19: "hold E with a filling ring ... releasing early cancels"): E held at the bed since `bedFrom`;
 *  `hold` seconds of it and she sleeps, ending the night (the "house" event with obj "slept", once: `slept`). Let go, or away from the bed,
 *  and it starts again. Returns how full the ring is (0 to 1), for the view. */
export function stepBed(W: Witch, atBed: boolean, held: boolean, time: number, hold = HOUSE_ROOMS.bed.hold): { fill: number; slept: boolean } {
  if (W.house?.slept) return { fill: 1, slept: false };
  if (!atBed || !held) { if (W.house?.bedFrom !== undefined) delete W.house.bedFrom; return { fill: 0, slept: false }; } // (her state untouched away from the bed)
  const H = (W.house ??= {});
  H.bedFrom ??= time;
  const fill = Math.min(1, (time - H.bedFrom) / Math.max(1e-6, hold));
  if (fill >= 1) H.slept = true;
  return { fill, slept: fill >= 1 };
}
