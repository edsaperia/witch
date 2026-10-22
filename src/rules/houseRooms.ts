// The treehouse's placeholder rooms (Ed, 2026-10-19: "we should start working on building this into the island so you can enter
// and exit during the party ... stick with placeholder rooms for now"; config/house.json, the mock previews/ed/big-room-mock): plank
// rooms joined by corridors off the hub (rules/treehouse.ts), walked as one floor with it, each holding objects she walks up to and
// uses with E (the sigil button): the dressing stations, the bags and the broom stand open the creator at only their own choices,
// the hats' floor holds her hats as objects, the bed (E held) ends the night, the bestiary's book opens the zoo over the night,
// and the rest are placeholders that say a line. The rules know where the floor is and which object she's at; what an object's E
// opens is main.ts's (the "house" leash event). No drawing here (render/houseRooms.ts).
import HOUSE from "../../config/house.json";
import { HAT_SPELLS, setLoadout } from "./spells";
import { hatButton, leaveHat, wearing } from "./hat";
import type { Witch } from "./game";
import type { LeashEvent } from "./leash";

/** A rectangle of floor on the house's plan (config/house.json): metres from the hub's centre along the plan's axes (x, z: east and
 *  south, turned by the plan's `turn`: fromPlan). */
export interface Rect { x0: number; x1: number; z0: number; z1: number }
/** What E does at an object (config/house.json `use`). */
export type HouseUse =
  | { kind: "creator"; axes: string[]; wear: string[]; parts: string[]; spell?: "hat" | "broom" }
  | { kind: "hats" } | { kind: "bed" } | { kind: "curtains" } | { kind: "zoo" } | { kind: "say"; line: string }
  /** The crystal ball (Ed, 2026-10-21): what tonight's trunk holds and which way it lies (rules/finds.ts, ui/crystalBall.ts). */
  | { kind: "ball" };
export interface HouseObject { id: string; room: string; label: string; x: number; z: number; w: number; d: number; h: number; use: HouseUse }
export interface HouseConfig {
  on: boolean; wall: number; reach: number; /** the plan's turn about the hub (degrees; fromPlan) */ turn?: number;
  rooms: (Rect & { id: string; label: string })[]; corridors: (Rect & { id: string })[];
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

/** The rooms' and corridors' floor: the hub's centre in the world, the plan's turn, and each rectangle on the plan. */
export interface RoomFloor { at: At; turn: number; rects: Rect[] }
/** The rooms' and corridors' floor at a hub, each rectangle pulled in by `inset` metres (her rail's keep-in). */
export function floorRects(at: At, inset = 0, H = HOUSE_ROOMS): RoomFloor {
  return { at: { x: at.x, z: at.z }, turn: H.turn ?? 0, rects: [...H.rooms, ...H.corridors].map(r => ({ x0: r.x0 + inset, x1: r.x1 - inset, z0: r.z0 + inset, z1: r.z1 - inset })) };
}
const inRect = (r: Rect, x: number, z: number, pad = 0) => x >= r.x0 - pad && x <= r.x1 + pad && z >= r.z0 - pad && z <= r.z1 + pad;
/** On a room's or a corridor's floor (`pad` metres past its edges), standing at (x, z) in the world. */
export const onRoomFloor = (f: RoomFloor, x: number, z: number, pad = 0): boolean => { const p = toPlan(f.at, x, z, f.turn); return f.rects.some(r => inRect(r, p.x, p.z, pad)); };
/** The nearest point to (x, z) on any of the rooms' and corridors' floors (in the world), and how far it is. */
export function nearestRoomFloor(f: RoomFloor, x: number, z: number): { x: number; z: number; d: number } | null {
  const p = toPlan(f.at, x, z, f.turn);
  let best: { x: number; z: number; d: number } | null = null;
  for (const r of f.rects) {
    const px = Math.min(r.x1, Math.max(r.x0, p.x)), pz = Math.min(r.z1, Math.max(r.z0, p.z)), d = Math.hypot(px - p.x, pz - p.z);
    if (!best || d < best.d) best = { x: px, z: pz, d };
  }
  return best && { ...fromPlan(f.at, best.x, best.z, f.turn), d: best.d };
}
/** A room's floor (house.json's room by id), kept to it: (x, z) in the world, put back inside its walls `inset` metres in; null without it. */
export function keepInRoom(at: At, room: string, x: number, z: number, inset = 0, H = HOUSE_ROOMS): { x: number; z: number; inside: boolean } | null {
  const r = H.rooms.find(q => q.id === room);
  if (!r) return null;
  const p = toPlan(at, x, z, H.turn ?? 0), px = Math.min(r.x1 - inset, Math.max(r.x0 + inset, p.x)), pz = Math.min(r.z1 - inset, Math.max(r.z0 + inset, p.z));
  return px === p.x && pz === p.z ? { x, z, inside: true } : { ...fromPlan(at, px, pz, H.turn ?? 0), inside: false };
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
export const hasRooms = (d: { house?: { rooms: RoomFloor | null } } | null | undefined): boolean => !!d?.house?.rooms?.rects.length;
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
 *  she wears and any lying elsewhere. */
export function floorHats(W: Witch): string[] {
  const H = (W.house ??= {});
  return (H.hats ??= hatsOnFloor(W));
}
/** The hats on the hats' floor as they are, or as they'd be laid out, without laying them (for the view). */
export function hatsOnFloor(W: Witch): string[] {
  if (W.house?.hats) return W.house.hats;
  const out = new Set([W.spells.hat, ...W.hat.left.map(q => q.spell)]);
  return HAT_FLOOR.map(s => (out.has(s) ? "" : s));
}

/** E at the hats' floor (Ed, 2026-10-19: "there's no hat rack per se - just an area to put down hats, which are just game objects
 *  that can be picked up and put down"). By a hat lying in its slot, she takes it: the one she wore goes down in its place, and
 *  bare-headed, her own lying elsewhere stays where it lies (rules/hat.ts leaveHat). Otherwise it's her own hat's pick-up and
 *  put-down as anywhere (rules/hat.ts, as the pad's hat button): her own (or a left one) in reach picked up, bare-headed; else,
 *  wearing it, hers goes down at her feet. Returns the leash event, or null when the press did nothing. */
export function useHats(W: Witch, at: At, x: number, z: number, time: number, radius: number, reach = 0.9): LeashEvent | null {
  if (!W.hat.has) return null;
  const hats = floorHats(W), slots = hatSlots(at);
  let pick = -1, bd = reach;
  hats.forEach((s, i) => { const d = Math.hypot(slots[i].x - x, slots[i].z - z); if (s && d <= bd) { bd = d; pick = i; } });
  if (pick >= 0) {
    const took = hats[pick], worn = wearing(W.hat);
    if (!worn) leaveHat(W.hat, W.spells.hat);
    hats[pick] = worn && W.spells.hat !== "none" ? W.spells.hat : "";
    setLoadout(W.spells, took, W.spells.broom);
    return { kind: "hatPicked", id: W.id, x: slots[pick].x, z: slots[pick].z, at: time };
  }
  const own = hatButton(W.hat, x, z, radius, W.spells.hat);
  if (own !== null) { if (own !== W.spells.hat) setLoadout(W.spells, own, W.spells.broom); return { kind: "hatPicked", id: W.id, x, z, at: time }; }
  if (!wearing(W.hat)) return null;
  W.hat.down = { x, z, at: time }; delete W.hat.hold;
  return { kind: "hatPut", id: W.id, x, z, at: time };
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
