import type { KitchenPropPosition } from "../rules/kitchenPlacement";
/** Texture coverage only: the pot, the baskets and the smoke over the cauldron's `reach` (m: its disc and its puffs, render/brewing.ts
 *  smokePuffs). Classic panel exact at a reach of 10 m or less. */
export function brewingFrame(layout: { room: { x: number; z: number }; cauldron: KitchenPropPosition; baskets: KitchenPropPosition[] }, ppm: number, pitch: number, placed: boolean, reach = 10) {
  const across = Math.max(12, reach + 1.5), up = Math.max(17, reach * pitch + 6), down = Math.max(8, reach * pitch + 2);
  if (!placed && across === 12 && up === 17 && down === 8) return { width: Math.ceil(24 * ppm), height: Math.ceil(25 * ppm), ox: Math.ceil(24 * ppm) / 2, oy: 17 * ppm };
  const dx = (p: KitchenPropPosition) => p.x - layout.room.x, dy = (p: KitchenPropPosition) => (p.z - layout.room.z) * pitch;
  const left = Math.min(-12, dx(layout.cauldron) - across, ...layout.baskets.map(p => dx(p) - 3));
  const right = Math.max(12, dx(layout.cauldron) + across, ...layout.baskets.map(p => dx(p) + 3));
  const top = Math.min(-17, dy(layout.cauldron) - up, ...layout.baskets.map(p => dy(p) - 6));
  const bottom = Math.max(8, dy(layout.cauldron) + down, ...layout.baskets.map(p => dy(p) + 2));
  return { width: Math.ceil((right - left) * ppm), height: Math.ceil((bottom - top) * ppm), ox: -left * ppm, oy: -top * ppm };
}
