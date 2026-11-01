import proposal from "../../config/house/layouts/ed-current.json";
import { edLayoutRequested } from "./housePlacement";

export interface KitchenPropPosition { x: number; z: number; rotation?: number }
/** Potion-owner hook: pass the existing kitchenPlan result through this before world conversion/drawing.
 * Identity, colour, recipe state and behaviour remain with its caller. The default result is unchanged.
 * Pot-centred ingredients/smoke and basket-centred unload/use read the returned positions together. */
export function kitchenPlacement<T extends { cauldron: KitchenPropPosition; baskets: (KitchenPropPosition & { type: string })[] }>(base: T, on = edLayoutRequested()): T {
  if (!on) return base;
  const pose = (id: string, fallback: KitchenPropPosition): KitchenPropPosition => {
    const p = proposal.objects.find(p => p.id === id);
    return p ? { x: p.x, z: p.z, rotation: p.rotation } : fallback;
  };
  return { ...base, cauldron: pose("cauldron", base.cauldron), baskets: base.baskets.map(b => ({ ...b, ...pose(`mushroom-basket:${b.type}`, b) })) };
}
