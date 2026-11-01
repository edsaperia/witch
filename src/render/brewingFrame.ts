import type { KitchenPropPosition } from "../rules/kitchenPlacement";
/** Texture coverage only: does not alter room membership or smoke radii/timing. Classic panel stays exact. */
export function brewingFrame(layout: { room: { x: number; z: number }; cauldron: KitchenPropPosition; baskets: KitchenPropPosition[] }, ppm: number, pitch: number, placed: boolean) {
  if (!placed) return { width: Math.ceil(24 * ppm), height: Math.ceil(25 * ppm), ox: Math.ceil(24 * ppm) / 2, oy: 17 * ppm };
  const dx = (p: KitchenPropPosition) => p.x - layout.room.x, dy = (p: KitchenPropPosition) => (p.z - layout.room.z) * pitch;
  const left = Math.min(-12, dx(layout.cauldron) - 12, ...layout.baskets.map(p => dx(p) - 3));
  const right = Math.max(12, dx(layout.cauldron) + 12, ...layout.baskets.map(p => dx(p) + 3));
  const top = Math.min(-17, dy(layout.cauldron) - 17, ...layout.baskets.map(p => dy(p) - 6));
  const bottom = Math.max(8, dy(layout.cauldron) + 8, ...layout.baskets.map(p => dy(p) + 2));
  return { width: Math.ceil((right - left) * ppm), height: Math.ceil((bottom - top) * ppm), ox: -left * ppm, oy: -top * ppm };
}
