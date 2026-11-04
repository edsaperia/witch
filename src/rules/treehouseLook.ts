/** Ed, 2 Nov: four independent trials, all off until reviewed. No frame allocations. */
export interface TreehouseLook {
  indoor: boolean; noNotch: boolean; approach: boolean; noWalls: boolean;
  fade: number; bark: number; radius: number; softness: number; ragged: number;
}
export const advanceCrownFade = (value: number, inside: boolean, dt: number, seconds: number): number => {
  const step = seconds > 0 ? Math.max(0, dt) / seconds : 1;
  return inside ? Math.min(1, value + step) : Math.max(0, value - step);
};
/** Distance from the actual house floor, rather than its hub: the branches extend well beyond 40m. */
export const approachStrength = (on: boolean, flying: boolean, floorDistance: number, radius: number): number => {
  if (!on || !flying || radius <= 0 || floorDistance >= radius) return 0;
  const k = Math.max(0, Math.min(1, 1 - Math.max(0, floorDistance) / radius));
  return k * k * (3 - 2 * k);
};
/** Only upright walls go; the painted floor and its low bark edge remain. */
export const showHouseLayer = (layer: number, noWalls: boolean): boolean => !noWalls || layer !== 1;

/** Signed distance to authored floors, allocation-free for the render loop. */
export function houseApproachDistance(x: number, z: number, hx: number, hz: number, turn: number,
  rooms: readonly { outline: readonly (readonly number[])[] }[], branches: readonly { pts: readonly (readonly number[])[]; w: number }[]): number {
  const a = turn * Math.PI / 180, c = Math.cos(a), s = Math.sin(a), dx = x - hx, dz = z - hz;
  x = dx * c - dz * s; z = dx * s + dz * c;
  let best = Infinity;
  for (const room of rooms) {
    const p = room.outline; let d = Infinity, inside = false;
    for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
      const ax = p[j][0], az = p[j][1], bx = p[i][0], bz = p[i][1], ex = bx - ax, ez = bz - az;
      const u = Math.max(0, Math.min(1, ((x - ax) * ex + (z - az) * ez) / Math.max(1e-9, ex * ex + ez * ez)));
      d = Math.min(d, Math.hypot(x - ax - u * ex, z - az - u * ez));
      if ((az > z) !== (bz > z) && x < ex * (z - az) / (bz - az) + ax) inside = !inside;
    }
    best = Math.min(best, inside ? -d : d);
  }
  for (const b of branches) for (let i = 1; i < b.pts.length; i++) {
    const ax = b.pts[i - 1][0], az = b.pts[i - 1][1], dx = b.pts[i][0] - ax, dz = b.pts[i][1] - az;
    const u = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / Math.max(1e-9, dx * dx + dz * dz)));
    best = Math.min(best, Math.hypot(x - ax - u * dx, z - az - u * dz) - b.w / 2);
  }
  return best;
}

/** Geometry rebuilt only on a switch change. The original input remains the horizon source. */
export function crownLookInput<T extends { open?: { x: number; z: number; r: number }[]; gap?: boolean }>(original: T, noNotch: boolean): T {
  return noNotch ? { ...original, open: [], gap: false } : original;
}
