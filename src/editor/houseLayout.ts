import { HOUSE_ROOMS, objectFront, toPlan, type HouseConfig, type HouseObject } from "../rules/houseRooms";

export interface Placement { id: string; x: number; z: number; rotation: number }
export interface Layout { version: 1; floorplan: string; objects: Placement[] }
export interface LayoutItem extends HouseObject { anchor: { x: number; z: number }; synthetic?: boolean }
export const normalAngle = (angle: number): number => ((angle % 360) + 540) % 360 - 180;
export function rotate(x: number, z: number, angle: number): { x: number; z: number } {
  const a = angle * Math.PI / 180;
  return { x: x * Math.cos(a) - z * Math.sin(a), z: x * Math.sin(a) + z * Math.cos(a) };
}
/** Authoring data only. Never writes HOUSE_ROOMS or the player's saves. */
export function layoutItems(H = HOUSE_ROOMS): LayoutItem[] {
  const items: LayoutItem[] = H.objects.map(o => ({ ...structuredClone(o), anchor: toPlan({ x: 0, z: 0 }, ...point(objectFront(o, { x: 0, z: 0 }, .5, H)), H.turn ?? 0) }));
  const t = H.rooms.find(r => r.id === "terrace");
  if (t) items.push({ ...H.terrace.decks, id: "terrace:decks", label: "DJ decks + seat", room: t.id, x: t.x + H.terrace.decks.x, z: t.z + H.terrace.decks.z,
    h: 1.5, use: { kind: "say", line: "DJ decks" }, synthetic: true,
    anchor: { x: t.x + H.terrace.seat.x, z: t.z + H.terrace.seat.z } });
  return items;
}
const point = (p: { x: number; z: number }): [number, number] => [p.x, p.z];
/** Includes object identity/dimensions as well as fixed geometry: incompatible exports fail visibly. */
export const floorplanKey = (H: HouseConfig, items: LayoutItem[]): string => {
  const text = JSON.stringify([H.shape, H.wall, H.turn, items.map(o => [o.id, o.room, o.x, o.z, o.w, o.d, o.h, o.anchor])]);
  let hash = 2166136261; for (const c of text) hash = Math.imul(hash ^ c.charCodeAt(0), 16777619);
  return `oak-${(hash >>> 0).toString(16)}`;
};
export function defaultLayout(items: LayoutItem[], floorplan: string): Layout {
  return { version: 1, floorplan, objects: items.map(o => ({ id: o.id, x: o.x, z: o.z, rotation: 0 })) };
}
export function parseLayout(raw: unknown, items: LayoutItem[], floorplan: string): Layout {
  const l = raw as Layout;
  if (!l || l.version !== 1 || l.floorplan !== floorplan || !Array.isArray(l.objects) || l.objects.length !== items.length) throw Error("This layout does not match the current house. Export it again from the matching editor.");
  const seen = new Set<string>(), ids = new Set(items.map(o => o.id));
  const objects = l.objects.map(p => {
    if (!p || !ids.has(p.id) || seen.has(p.id) || ![p.x, p.z, p.rotation].every(v => typeof v === "number" && Number.isFinite(v)) || Math.abs(p.x) > 10000 || Math.abs(p.z) > 10000 || Math.abs(p.rotation) > 360000) throw Error("Each object must have one known ID and finite coordinates and angle.");
    const pose = { id: p.id, x: p.x, z: p.z, rotation: normalAngle(p.rotation) };
    const supplied = (p as Placement & { useAnchor?: { x: number; z: number } }).useAnchor;
    if (supplied !== undefined) {
      const expected = attachedPoint(items.find(o => o.id === p.id)!, pose);
      if (!supplied || ![supplied.x, supplied.z].every(v => typeof v === "number" && Number.isFinite(v)) || Math.hypot(supplied.x - expected.x, supplied.z - expected.z) > 1e-6) throw Error("Use positions must travel with their objects; this layout's anchor is inconsistent.");
    }
    seen.add(p.id); return pose;
  });
  return { version: 1, floorplan, objects: items.map(o => objects.find(p => p.id === o.id)!) };
}
export function exportLayout(layout: Layout, items: LayoutItem[]): object {
  return { ...layout, coordinates: "house-plan-metres", rotationMode: "degrees-relative-to-published-facing",
    objects: layout.objects.map(p => ({ ...p, useAnchor: attachedPoint(items.find(o => o.id === p.id)!, p) })) };
}
/** All attachments (including a station's standing point / decks' seat) use one rigid transform. */
export function attachedPoint(item: LayoutItem, pose: Placement, p = item.anchor): { x: number; z: number } {
  const d = rotate(p.x - item.x, p.z - item.z, pose.rotation);
  return { x: pose.x + d.x, z: pose.z + d.z };
}
export function corners(item: LayoutItem, p: Placement): { x: number; z: number }[] {
  return [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([x, z]) => attachedPoint(item, p, { x: item.x + x * item.w / 2, z: item.z + z * item.d / 2 }));
}
export function hitItem(items: LayoutItem[], layout: Layout, x: number, z: number): string | null {
  for (const p of [...layout.objects].reverse()) {
    const o = items.find(o => o.id === p.id)!, d = rotate(x - p.x, z - p.z, -p.rotation);
    if (Math.abs(d.x) <= Math.max(o.w / 2, .65) && Math.abs(d.z) <= Math.max(o.d / 2, .65)) return o.id;
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
