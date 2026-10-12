// Tests' helper: a point of the island's sea coast (rules/land.ts) facing a given way.
import { coastFacing, type LandMap } from "../rules/land";

/** The point of the sea's coast facing `bearing` (radians, atan2 of z and x: 0 east): rules/land.ts coastFacing, which must find one. */
export function facing(L: LandMap, bearing: number): { x: number; z: number; nx: number; nz: number } {
  const p = coastFacing(L, bearing);
  if (!p) throw new Error(`no coast facing ${bearing}`);
  return p;
}
