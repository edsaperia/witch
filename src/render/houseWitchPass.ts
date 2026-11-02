import type { Material } from "three";
import type { Deck } from "../rules/treehouse";
import type { WitchState } from "../rules/witch";
export const HOUSE_FLOOR_OVERLAY_ORDER = 19.925;
export const HOUSE_WITCH_OVERLAY_ORDER = 19.95;
/** Floors are shown for perched walking/landing, including Terrace joins and floor edges.
 *  Use that same authoritative state instead of a second, stricter floor-inset query.
 *  Keep the former room pass for its other existing poses; art projection stays separate. */
export function houseWitchOverlay(deck: Deck | null, w: WitchState, entReady: boolean, legacyRoom: boolean): boolean {
  return legacyRoom || !!(entReady && deck?.house?.rooms && w.perch && !w.seated && w.falling === undefined
    && (w.mode === "ground" || w.mode === "descending"));
}
function setMaterialPass(m: Material, overlay: boolean): void {
  if (m.transparent !== overlay) { m.transparent = overlay; m.needsUpdate = true; }
  m.depthTest = !overlay;
}
/** Apply the existing sprite pass without creating another mesh or changing its depth writes. */
export function setHouseWitchPass(mesh: { material: Material | Material[]; renderOrder: number }, overlay: boolean): void {
  const material = mesh.material;
  if (Array.isArray(material)) { for (const m of material) setMaterialPass(m, overlay); }
  else setMaterialPass(material, overlay);
  mesh.renderOrder = overlay ? HOUSE_WITCH_OVERLAY_ORDER : 10;
}
