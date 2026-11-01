import { HOUSE_ROOMS, hatSlots, objectFront, toPlan, type HouseConfig, type HouseObject } from "../rules/houseRooms";
import { roomAt as shapeRoomAt } from "../../config/house/shape.js";
import { decorPlan, type DecorItem } from "../render/houseDecor";
import { standing } from "../render/housePieces";
import { FURNITURE_IDS } from "../../art/furniture.js";
import legacy from "../../config/house/layouts/editor-v1-baseline.json";
import identities from "../../config/house/layouts/editor-v2-identities.json";
import current from "../../config/house/layouts/ed-current.json";
import { kitchenPlan, type MushroomColour } from "../rules/mushrooms";
import { HOUSE_CONFIG } from "../rules/houseConfig";
import { migratedGuestFurnitureId } from "../rules/guestFurnitureMigration";
export const EDITOR_HOUSE = HOUSE_CONFIG as HouseConfig;

export interface Placement { id: string; x: number; z: number; rotation: number }
export interface Layout { version: 2; floorplan: string; objects: Placement[]; removed?: string[]; migration?: { from: 1; cameraPreserved: true; held: Placement[] } }
export interface LayoutItem extends HouseObject {
  anchor: { x: number; z: number }; synthetic?: boolean;
  facing: { yaw: number; foot: { w: number; d: number; h: number }; curve: number };
  decor?: DecorItem;
  hatPoint?: number;
  kitchen?: { kind: "cauldron" } | { kind: "basket"; colour: MushroomColour; index: number };
}
export const isHatZone = (o: LayoutItem): boolean => o.use.kind === "hats";
export const itemKind = (o: LayoutItem): string => o.kitchen ? o.kitchen.kind === "basket" ? "Mushroom basket" : "Potion cauldron" : o.hatPoint ? "Hat spawn point" : isHatZone(o) ? "Hat spawn zone" : o.decor ? "Room clutter" : o.use.kind === "creator" ? "Dressing station" : "Furniture";
export const normalAngle = (angle: number): number => ((angle % 360) + 540) % 360 - 180;
export function rotate(x: number, z: number, angle: number): { x: number; z: number } {
  const a = angle * Math.PI / 180;
  return { x: x * Math.cos(a) - z * Math.sin(a), z: x * Math.sin(a) + z * Math.cos(a) };
}
/** Authoring data only. Never writes HOUSE_ROOMS or the player's saves. */
export function layoutItems(H = EDITOR_HOUSE): LayoutItem[] {
  const items: LayoutItem[] = H.objects.map(o => ({ ...structuredClone(o), ...(o.use.kind === "hats" ? { label: "Hat spawn zone" } : {}), facing: standing(o), anchor: toPlan({ x: 0, z: 0 }, ...point(objectFront(o, { x: 0, z: 0 }, .5, H)), H.turn ?? 0) }));
  const kitchen = kitchenPlan(false), pot = items.find(o => o.id === "cauldron");
  if (pot) { Object.assign(pot, kitchen.cauldron); pot.kitchen = { kind: "cauldron" }; pot.anchor = { ...kitchen.cauldron }; pot.facing = { yaw: 0, foot: { w: pot.w, d: pot.d, h: pot.h }, curve: 0 }; }
  kitchen.baskets.forEach((p, index) => {
    // Current runtime basket tag footprint/height, not the removed small-pot furniture art.
    const foot = { w: 1.4, d: 1.4, h: 1.5 };
    items.push({ id: `mushroom-basket:${p.type}`, room: "kitchen", label: `${p.type} mushroom basket`, ...foot, x: p.x, z: p.z,
      synthetic: true, use: { kind: "scenery" }, anchor: { x: p.x, z: p.z }, facing: { yaw: 0, foot, curve: 0 }, kitchen: { kind: "basket", colour: p.type, index } });
  });
  hatSlots({ x: 0, z: 0 }, H).forEach((p, i) => {
    const at = toPlan({ x: 0, z: 0 }, p.x, p.z, H.turn ?? 0), foot = { w: .4, d: .4, h: 0 };
    items.push({ id: `hat-point:${i + 1}`, label: `Hat spawn point ${i + 1}`, hatPoint: i + 1, room: "cloakroom", ...at, ...foot,
      use: { kind: "scenery" }, anchor: at, facing: { yaw: 0, foot, curve: 0 } });
  });
  if (!H.layout) {
    const zone = items.find(isHatZone);
    if (zone) { const n = items.filter(o => o.hatPoint).length + 1, foot = { w: .4, d: .4, h: 0 }; items.push({ ...zone, id: `hat-point:${n}`, label: `Hat spawn point ${n}`, use: { kind: "scenery" }, hatPoint: n, ...foot, anchor: { x: zone.x, z: zone.z }, facing: { yaw: 0, foot, curve: 0 } }); }
  }
  const t = H.rooms.find(r => r.id === "terrace");
  if (t) items.push({ ...H.terrace.decks, id: "terrace:decks", label: "DJ decks + seat", room: t.id, x: t.x + H.terrace.decks.x, z: t.z + H.terrace.decks.z,
    h: 1.5, use: { kind: "say", line: "DJ decks" }, synthetic: true, facing: { yaw: 0, foot: { ...H.terrace.decks, h: 1.5 }, curve: 0 },
    anchor: { x: t.x + H.terrace.seat.x, z: t.z + H.terrace.seat.z } });
  for (const room of H.rooms) for (const it of decorPlan(room, H)) {
    const foot = it.foot ? { ...it.foot, h: .12 } : { w: it.r ? 2 * it.r : 1.8, d: it.r ? 2 * it.r : 1.8, h: it.kind === "rug" ? .03 : 2 };
    const x = room.x + it.x, z = room.z + it.z;
    items.push({ id: `clutter:${room.id}:${it.kind}:${it.of ?? it.k}`, room: room.id, label: `${room.label} · ${it.kind}${it.of ? ` (${it.of})` : ""}`, x, z, ...foot,
      use: { kind: "scenery" }, anchor: { x, z }, decor: it, facing: { yaw: it.yaw, foot, curve: 0 } });
  }
  return items;
}
const point = (p: { x: number; z: number }): [number, number] => [p.x, p.z];
/** Geometry and source catalogue identity: a changed baseline requires an explicit conversion. */
export const floorplanKey = (H: HouseConfig, items: LayoutItem[]): string => {
  // Transcendental results can differ by an ulp across JS engines. Cache warmth and
  // sub-nanometre arithmetic noise are not changes to the authored source geometry.
  const { m: _cache, ...shape } = H.shape as HouseConfig["shape"] & { m?: unknown };
  const text = JSON.stringify([shape, H.wall, H.turn, items.map(o => [o.id, o.room, o.x, o.z, o.facing, o.anchor, o.decor])],
    (_key, value: unknown) => typeof value === "number" && Number.isFinite(value) ? +value.toFixed(9) : value);
  let hash = 2166136261; for (const c of text) hash = Math.imul(hash ^ c.charCodeAt(0), 16777619);
  return `oak-v3-${(hash >>> 0).toString(16)}`;
};
export function defaultLayout(items: LayoutItem[], floorplan: string): Layout {
  return { version: 2, floorplan, objects: items.map(o => ({ id: o.id, x: o.x, z: o.z, rotation: normalAngle(o.facing.yaw * 180 / Math.PI) })) };
}
/** Model yaw and plan rotation have the same clockwise convention (art/model3d.ts toWorld). */
export const cameraYaw = (p: Placement): number => p.rotation * Math.PI / 180;
export const physicalRoom = (p: Pick<Placement, "x" | "z">, H = HOUSE_ROOMS): string | null => shapeRoomAt(H.shape, p.x, p.z)?.id ?? null;
export const lightingRoom = (p: Pick<Placement, "x" | "z">, H = HOUSE_ROOMS): string => physicalRoom(p, H) ?? [...H.rooms].sort((a, b) => Math.hypot(a.x - p.x, a.z - p.z) - Math.hypot(b.x - p.x, b.z - p.z))[0].id;
export const artKey = (o: LayoutItem, p: Placement, H = HOUSE_ROOMS): string => `${o.id}:${p.rotation}:${lightingRoom(p, H)}`;
export function parseLayout(raw: unknown, items: LayoutItem[], floorplan: string): Layout {
  if ((raw as { version?: unknown } | null)?.version === 1) return migrateCameraV1(raw, items, floorplan);
  let l = raw as Layout;
  // Explicit source-catalogue upgrade: Ed replaced the two unused guest chests in place.
  if (floorplan === identities.canonical && identities.legacy.includes(l?.floorplan) && Array.isArray(l.objects))
    l = { ...l, objects: l.objects.map(p => ({ ...p, id: migratedGuestFurnitureId(p.id) })) };
  const matchingSource = l?.floorplan === floorplan || (floorplan === identities.canonical && identities.legacy.includes(l?.floorplan));
  const removed = l?.removed ?? [];
  if (!Array.isArray(removed) || removed.some(id => typeof id !== "string" || !id.startsWith("clutter:") || !items.some(o => o.id === id)) || new Set(removed).size !== removed.length) throw Error("Only known clutter may be explicitly removed.");
  if (!l || l.version !== 2 || !matchingSource || !Array.isArray(l.objects) || l.objects.length + removed.length !== items.length) throw Error("This layout does not match the current house. Export it again from the matching editor.");
  const seen = new Set<string>(), ids = new Set(items.map(o => o.id));
  const objects = l.objects.map(p => {
    if (!p || !ids.has(p.id) || removed.includes(p.id) || seen.has(p.id) || ![p.x, p.z, p.rotation].every(v => typeof v === "number" && Number.isFinite(v)) || Math.abs(p.x) > 10000 || Math.abs(p.z) > 10000 || Math.abs(p.rotation) > 360000) throw Error("Each object must have one known ID and finite coordinates and angle.");
    const pose = { id: p.id, x: p.x, z: p.z, rotation: normalAngle(p.rotation) };
    const supplied = (p as Placement & { useAnchor?: { x: number; z: number } }).useAnchor;
    if (supplied !== undefined) {
      const expected = attachedPoint(items.find(o => o.id === p.id)!, pose);
      if (!supplied || ![supplied.x, supplied.z].every(v => typeof v === "number" && Number.isFinite(v)) || Math.hypot(supplied.x - expected.x, supplied.z - expected.z) > 1e-6) throw Error("Use positions must travel with their objects; this layout's anchor is inconsistent.");
    }
    seen.add(p.id); return pose;
  });
  const result: Layout = { version: 2, floorplan, objects: items.filter(o => !removed.includes(o.id)).map(o => objects.find(p => p.id === o.id)!), ...(removed.length ? { removed: [...removed] } : {}) };
  if (l.migration !== undefined) {
    const m = l.migration;
    if (!m || m.from !== 1 || m.cameraPreserved !== true || !Array.isArray(m.held) || m.held.some(p => !legacy.items.some(o => o.id === p?.id) || ![p.x, p.z, p.rotation].every(Number.isFinite))) throw Error("Invalid version-1 conversion record.");
    result.migration = { from: 1, cameraPreserved: true, held: m.held.map(p => ({ id: p.id, x: p.x, z: p.z, rotation: p.rotation })) };
  }
  return result;
}
/** Explicit compatibility: legacy CAMERA yaw = base yaw - v1 angle. Never silently treat v1 angles as v2. */
export function migrateCameraV1(raw: unknown, items: LayoutItem[], floorplan: string): Layout {
  const l = raw as { version: number; floorplan: string; objects: Placement[] };
  if (!l || l.version !== 1 || l.floorplan !== legacy.floorplan || !Array.isArray(l.objects) || l.objects.length !== legacy.items.length) throw Error("Only the recorded version-1 house can be converted. Its camera appearance is preserved explicitly.");
  const result = defaultLayout(items, floorplan), seen = new Set<string>(), held: Placement[] = [];
  for (const p of l.objects) {
    const id = migratedGuestFurnitureId(p?.id);
    const old = legacy.items.find(o => o.id === p?.id), current = items.find(o => o.id === id);
    if (!old || seen.has(p.id) || ![p.x, p.z, p.rotation].every(v => typeof v === "number" && Number.isFinite(v)) || Math.abs(p.x) > 10000 || Math.abs(p.z) > 10000 || Math.abs(p.rotation) > 360000) throw Error("Invalid version-1 object ID, coordinate or angle.");
    seen.add(p.id);
    // A changed object (notably the working mushroom kitchen) is not overwritten by its stale placeholder.
    // The named chest→table upgrade keeps horizontal footprint/placement; its new mirror height is authored.
    if (!current || (id === p.id ? ["w", "d", "h"] : ["w", "d"]).some(k => old[k as "w" | "d" | "h"] !== current[k as "w" | "d" | "h"])) { held.push({ id: p.id, x: p.x, z: p.z, rotation: p.rotation }); continue; }
    const target = result.objects.find(q => q.id === id)!;
    // Legacy proxies (decks/clothes pile) already used the plan's +angle in the camera canvas.
    const angle = FURNITURE_IDS.includes(old.id) ? old.facing.yaw * 180 / Math.PI - p.rotation : p.rotation;
    Object.assign(target, { x: p.x, z: p.z, rotation: normalAngle(angle) });
  }
  // Newly exposed floor spills initially follow their parent to Ed's intended position. They are then independently editable.
  for (const item of items.filter(o => o.decor?.kind === "mess")) {
    const parent = result.objects.find(p => p.id === item.decor!.of), p = result.objects.find(p => p.id === item.id);
    if (parent && p) Object.assign(p, { x: parent.x, z: parent.z, rotation: parent.rotation });
  }
  const zone = items.find(isHatZone), zonePose = result.objects.find(p => p.id === zone?.id);
  if (zone && zonePose) for (const point of zoneSlots(zone, zonePose)) {
    const target = result.objects.find(p => p.id === `hat-point:${point.slot + 1}`);
    if (target) Object.assign(target, { x: point.x, z: point.z });
  }
  result.migration = { from: 1, cameraPreserved: true, held };
  // New defaults must not silently restore the clutter Ed explicitly deleted on 2026-11-01.
  result.removed = current.removed.filter(id => items.some(o => o.id === id));
  result.objects = result.objects.filter(p => !result.removed!.includes(p.id));
  return result;
}
export function exportLayout(layout: Layout, items: LayoutItem[]): object {
  return { ...layout, coordinates: "house-plan-metres", rotationMode: "absolute-clockwise-degrees-south-zero",
    kitchenPlacements: items.filter(o => o.kitchen).map(o => { const p = layout.objects.find(p => p.id === o.id)!; return { ...p, ...o.kitchen, footprint: o.facing.foot, interactionAnchor: { x: p.x, z: p.z } }; }),
    hatSpawnPoints: items.filter(o => o.hatPoint).map(o => { const p = layout.objects.find(p => p.id === o.id)!; return { id: o.hatPoint!, x: p.x, z: p.z }; }).sort((a, b) => a.id - b.id),
    objects: layout.objects.map(p => {
      const item = items.find(o => o.id === p.id)!;
      return { ...p, physicalRoom: physicalRoom(p), lightingRoom: lightingRoom(p), ...(item.hatPoint ? { kind: "hat-spawn-point", order: item.hatPoint } : isHatZone(item) ? { kind: "hat-spawn-zone" } : { useAnchor: attachedPoint(item, p) }) };
    }) };
}
/** Future spawn positions, not hats or interaction points. Keep runtime's slot identities/order. */
export function zoneSlots(item: LayoutItem, pose: Placement, H = HOUSE_ROOMS): { slot: number; x: number; z: number }[] {
  if (!isHatZone(item)) return [];
  const slots = hatSlots({ x: 0, z: 0 }, H).map((p, slot) => ({ slot, ...attachedPoint(item, pose, toPlan({ x: 0, z: 0 }, p.x, p.z, H.turn ?? 0)) }));
  if (!H.layout) slots.push({ slot: slots.length, x: pose.x, z: pose.z });
  return slots;
}
/** All attachments (including a station's standing point / decks' seat) use one rigid transform. */
export function attachedPoint(item: LayoutItem, pose: Placement, p = item.anchor): { x: number; z: number } {
  const d = rotate(p.x - item.x, p.z - item.z, pose.rotation - item.facing.yaw * 180 / Math.PI);
  return { x: pose.x + d.x, z: pose.z + d.z };
}
export function corners(item: LayoutItem, p: Placement): { x: number; z: number }[] {
  return [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([x, z]) => { const d = rotate(x * item.facing.foot.w / 2, z * item.facing.foot.d / 2, p.rotation); return { x: p.x + d.x, z: p.z + d.z }; });
}
export function hitItem(items: LayoutItem[], layout: Layout, x: number, z: number): string | null {
  const floor = (id: string) => isHatZone(items.find(o => o.id === id)!) || ["rug", "mess"].includes(items.find(o => o.id === id)?.decor?.kind ?? "");
  // Match drawing order: floor spills/rugs must not steal a station's drag target.
  for (const p of [...layout.objects].filter(p => !isHatZone(items.find(o => o.id === p.id)!)).sort((a, b) => Number(!!items.find(o => o.id === a.id)!.hatPoint) - Number(!!items.find(o => o.id === b.id)!.hatPoint) || Number(floor(b.id)) - Number(floor(a.id)) || a.z - b.z).reverse()) {
    const o = items.find(o => o.id === p.id)!, d = rotate(x - p.x, z - p.z, -p.rotation);
    if (Math.abs(d.x) <= Math.max(o.facing.foot.w / 2, .65) && Math.abs(d.z) <= Math.max(o.facing.foot.d / 2, .65)) return o.id;
  }
  return null;
}
/** One undo entry per gesture; redo is discarded when a new edit starts. */
export class LayoutHistory {
  private past: string[] = []; private future: string[] = [];
  constructor(public value: Layout) {}
  save(): void { this.past.push(JSON.stringify(this.value)); if (this.past.length > 100) this.past.shift(); this.future = []; }
  undo(): void { const v = this.past.pop(); if (v) { this.future.push(JSON.stringify(this.value)); this.value = JSON.parse(v); } }
  redo(): void { const v = this.future.pop(); if (v) { this.past.push(JSON.stringify(this.value)); this.value = JSON.parse(v); } }
}
