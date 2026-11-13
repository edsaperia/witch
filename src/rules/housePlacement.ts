import type { HouseConfig, HouseObject } from "./houseRooms";
import proposal from "../../config/house/layouts/ed-current.json";
import baseline from "../../config/house/layouts/editor-v1-baseline.json";
import provisional from "../../config/house/layouts/provisional.json";
import { roomAt } from "../../config/house/shape.js";
import { publishedGuestFurnitureId } from "./guestFurnitureMigration";

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
  // Objects the layout removes outright are not in the house at all: the old Cloakroom hats' area (Ed, 2026-11-02: "we should
  // remove the old cloakroom hats area"); its hats lie on the numbered spawn points (hatPoints), each its own object.
  H.objects = H.objects.filter(o => !proposal.removedObjects.includes(o.id));
  for (const o of H.objects) {
    // The unused guest chest is replaced in place by Ed's requested dressing table.
    // (Ed's exports before 2026-11-12 name it by the chest's id; his 2026-11-12 export by its own.)
    const placedId = publishedGuestFurnitureId(o.id);
    const p = proposal.objects.find(p => p.id === o.id) ?? proposal.objects.find(p => p.id === placedId), original = baseline.items.find(q => q.id === placedId);
    // An object new since Ed's export, with a provisional pose in his arrangement (config/house/layouts/provisional.json: the broom rack
    // and the hydraulic lift, Ed 2026-11-07), placed so, its front (where she stands) to its rotation's south. (His 2026-11-12
    // export places both, below, so neither takes this path now: it waits for the next new object.)
    const prov = !p ? provisional.objects.find(q => q.id === o.id) : undefined;
    if (prov) {
      const front = rotatePlacement(0, o.d / 2 + 0.5, prov.rotation);
      o.placement = { rotation: prov.rotation, baseRotation: prov.rotation, foot: { w: o.w, d: o.d, h: o.h }, curve: 0, anchor: { x: prov.x + front.x, z: prov.z + front.z }, sourceRoom: o.room };
      o.x = prov.x; o.z = prov.z; o.room = roomAt(H.shape, prov.x, prov.z)?.id ?? o.room; continue;
    }
    if (!p) continue;
    if (!original) {
      // An object new since the recorded baseline that Ed's export places (the basins, the guests' shoe racks, the broom rack and the
      // hydraulic lift: Ed, 2026-11-12, "New treehouse layout"): it stands as the editor drew it, its resting facing turned to his rotation.
      const rest = restingFacing(o, H), anchor = "useAnchor" in p && p.useAnchor ? p.useAnchor : { x: p.x, z: p.z };
      o.placement = { rotation: p.rotation, baseRotation: rest.yaw * 180 / Math.PI, foot: rest.foot, curve: rest.curve, anchor, sourceRoom: o.room };
      o.x = p.x; o.z = p.z; o.room = roomAt(H.shape, p.x, p.z)?.id ?? o.room; continue;
    }
    if (o.id === "cauldron") {
      // Current large-pot data, never the held stale version-1 placeholder.
      o.placement = { rotation: p.rotation, baseRotation: 0, foot: { w: o.w, d: o.d, h: o.h }, curve: 0, anchor: { x: p.x, z: p.z }, sourceRoom: o.room };
      o.x = p.x; o.z = p.z; o.room = roomAt(H.shape, p.x, p.z)?.id ?? o.room; continue;
    }
    const anchor = "useAnchor" in p && p.useAnchor ? p.useAnchor : { x: p.x, z: p.z };
    o.placement = { rotation: p.rotation, baseRotation: original.facing.yaw * 180 / Math.PI, foot: { ...original.facing.foot, ...(placedId !== o.id ? { h: o.h } : {}) }, curve: original.facing.curve, anchor, sourceRoom: o.room };
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
/** Which way an object stands where its room file puts it, as the editor and render/housePieces.ts standing() take it (the same sums:
 *  its front to its room's middle, its footprint by the way it mostly faces, bent round a round room's wall). For an object Ed's export
 *  places that the recorded baseline doesn't know. */
export function restingFacing(o: HouseObject, H: HouseConfig): { yaw: number; foot: { w: number; d: number; h: number }; curve: number } {
  const r = H.rooms.find(q => q.id === o.room), dx = r ? (r.x0 + r.x1) / 2 - o.x : 0, dz = r ? (r.z0 + r.z1) / 2 - o.z : 0, L = Math.hypot(dx, dz);
  const alongX = Math.abs(dx) > Math.abs(dz), foot = alongX ? { w: o.d, d: o.w, h: o.h } : { w: o.w, d: o.d, h: o.h };
  if (L < 1.2) return { yaw: 0, foot, curve: 0 };
  const a = ((H.turn ?? 0) * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a), x = dx / L, z = dz / L;
  const p = { x: 0 + x * c + z * s, z: 0 - x * s + z * c }, f = p.z < 0 ? [p.x, -p.z] : [p.x, p.z];
  return { yaw: Math.atan2(-f[0], f[1]), foot, curve: r?.r ? L + foot.d / 2 : 0 };
}
/** Local source-axis attachments (bed poses, UI keys) follow the same rigid placement. */
export function objectOffset(o: HouseObject, x: number, z: number): { x: number; z: number } {
  return o.placement ? rotatePlacement(x, z, o.placement.rotation - o.placement.baseRotation) : { x, z };
}
export function placementFacing(degrees: number): { facing: 1 | -1; away: boolean; heading: "side" | "up" | "down" } {
  const d = rotatePlacement(1, 0, degrees);
  return { facing: d.x < 0 ? -1 : 1, away: d.z < -Math.abs(d.x), heading: Math.abs(d.z) > Math.abs(d.x) ? d.z < 0 ? "up" : "down" : "side" };
}
