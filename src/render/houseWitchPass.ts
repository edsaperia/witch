import type { Material } from "three";
import type { Deck } from "../rules/treehouse";
import type { WitchState } from "../rules/witch";
export const HOUSE_FLOOR_OVERLAY_ORDER = 19.925;
export const HOUSE_WITCH_OVERLAY_ORDER = 19.95;
/** Whether her occluder depth (sprites.ts uWitchDepth: what stands nearer the camera than her fades or, in her own batch, which has
 *  no see-through pass, isn't drawn) is taken where she's drawn rather than at her flight's height: seated, in a room, and in the
 *  house's room pass on any floor, the Terrace and the walking inset's edge too. Ed, 2026-11-03, "witch is behind the floor": on the
 *  Terrace's north side, by the wardrobe, her depth from her flight's height lay metres behind her drawing (slid along the camera's
 *  ray onto the house's plane), so her own sprite counted as standing in front of her and her batch left her out: not drawn at all. */
export const depthWhereDrawn = (seated: boolean, inRoom: boolean, overFloor: boolean): boolean => seated || inRoom || overFloor;
/** A house prop standing in front of her (render/brewing.ts: the cauldron and its baskets): after her, before the smoke (19.956). */
export const HOUSE_OVER_HER_ORDER = HOUSE_WITCH_OVERLAY_ORDER + 0.0005;
/** The house draws with no depth, in renderOrder, and her overlay comes after all of it; a prop whose foot lies further south on
 *  the plan than hers (nearer the camera) is in front of her and is drawn after her instead, the painter's rule the furniture is
 *  sorted by (render/houseRooms.ts furnitureOrder). Ed, 2026-11-03: "the cauldron should be drawn on top of the witch". `propSouth`
 *  and `herSouth`: plan metres south of the hub (null: she isn't in the house). */
export const inFrontOfHer = (propSouth: number, herSouth: number | null): boolean => herSouth !== null && propSouth > herSouth;
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
