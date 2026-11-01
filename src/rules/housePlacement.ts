import type { HouseConfig, HouseObject } from "./houseRooms";
import proposal from "../../config/house/layouts/ed-current.json";
import baseline from "../../config/house/layouts/editor-v1-baseline.json";
import { roomAt } from "../../config/house/shape.js";

export interface ObjectPlacement {
  rotation: number; baseRotation: number; foot: { w: number; d: number; h: number }; curve: number;
  anchor: { x: number; z: number }; sourceRoom: string;
}
export interface HouseArtLayout { identity: string; config: HouseConfig }
let artLayouts: WeakMap<HouseConfig, HouseArtLayout> | undefined;
export function houseArtLayout(H: HouseConfig): HouseArtLayout | undefined {
  if (!H.layout) return undefined;
  artLayouts ??= new WeakMap<HouseConfig, HouseArtLayout>();
  const previous = artLayouts.get(H); if (previous) return previous;
  let hash = 2166136261; for (const c of JSON.stringify(H)) hash = Math.imul(hash ^ c.charCodeAt(0), 16777619);
  const result = { identity: `ed-${(hash >>> 0).toString(16)}`, config: H }; artLayouts.set(H, result); return result;
}
let activeLayout = false;
export const setEdLayoutActive = (on: boolean): void => { activeLayout = on; };
export const edLayoutRequested = (): boolean => activeLayout;
export const rotatePlacement = (x: number, z: number, degrees: number) => {
  const a = degrees * Math.PI / 180; return { x: x * Math.cos(a) - z * Math.sin(a), z: x * Math.sin(a) + z * Math.cos(a) };
};
/** Explicit selected configuration. Geometry and the caller's classic source are never mutated. */
export function applyEdLayout(source: HouseConfig, on = edLayoutRequested()): HouseConfig {
  if (!on) return source;
  source = source.layout?.baseline ?? source;
  const H = structuredClone(source);
  for (const o of H.objects) {
    const p = proposal.objects.find(p => p.id === o.id), original = baseline.items.find(q => q.id === o.id);
    if (!p || !original) continue;
    if (o.id === "cauldron") {
      // Current large-pot data, never the held stale version-1 placeholder.
      o.placement = { rotation: p.rotation, baseRotation: 0, foot: { w: o.w, d: o.d, h: o.h }, curve: 0, anchor: { x: p.x, z: p.z }, sourceRoom: o.room };
      o.x = p.x; o.z = p.z; o.room = roomAt(H.shape, p.x, p.z)?.id ?? o.room; continue;
    }
    const anchor = "useAnchor" in p && p.useAnchor ? p.useAnchor : { x: p.x, z: p.z };
    o.placement = { rotation: p.rotation, baseRotation: original.facing.yaw * 180 / Math.PI, foot: { ...original.facing.foot }, curve: original.facing.curve, anchor, sourceRoom: o.room };
    o.x = p.x; o.z = p.z;
    const destination = roomAt(H.shape, p.x, p.z)?.id ?? [...H.rooms].sort((a, b) => Math.hypot(a.x - p.x, a.z - p.z) - Math.hypot(b.x - p.x, b.z - p.z))[0].id;
    o.room = destination;
  }
  for (const p of proposal.objects.filter(p => p.id.startsWith("mushroom-basket:"))) {
    const foot = { w: 1.4, d: 1.4, h: 1.5 };
    H.objects.push({ id: p.id, label: `${p.id.split(":")[1]} mushrooms`, room: roomAt(H.shape, p.x, p.z)?.id ?? "kitchen", x: p.x, z: p.z, ...foot, use: { kind: "scenery" },
      placement: { rotation: p.rotation, baseRotation: 0, foot, curve: 0, anchor: { x: p.x, z: p.z }, sourceRoom: "kitchen" } });
  }
  const decks = proposal.objects.find(p => p.id === "terrace:decks"), terrace = H.rooms.find(r => r.id === "terrace")!;
  if (decks) {
    H.terrace.decks.x = decks.x - terrace.x; H.terrace.decks.z = decks.z - terrace.z; H.terrace.decks.rotation = decks.rotation;
    if ("useAnchor" in decks && decks.useAnchor) H.terrace.seat = { x: decks.useAnchor.x - terrace.x, z: decks.useAnchor.z - terrace.z };
  }
  H.layout = { id: "ed", baseline: structuredClone(source), hatPoints: proposal.objects.filter(p => p.id.startsWith("hat-point:")).map(p => ({ id: Number(p.id.split(":")[1]), x: p.x, z: p.z })).sort((a, b) => a.id - b.id), decor: proposal.objects.filter(p => p.id.startsWith("clutter:")).map(p => ({ id: p.id, x: p.x, z: p.z, rotation: p.rotation })) };
  return H;
}
/** Local source-axis attachments (bed poses, UI keys) follow the same rigid placement. */
export function objectOffset(o: HouseObject, x: number, z: number): { x: number; z: number } {
  return o.placement ? rotatePlacement(x, z, o.placement.rotation - o.placement.baseRotation) : { x, z };
}
export function placementFacing(degrees: number): { facing: 1 | -1; away: boolean; heading: "side" | "up" | "down" } {
  const d = rotatePlacement(1, 0, degrees);
  return { facing: d.x < 0 ? -1 : 1, away: d.z < -Math.abs(d.x), heading: Math.abs(d.z) > Math.abs(d.x) ? d.z < 0 ? "up" : "down" : "side" };
}
