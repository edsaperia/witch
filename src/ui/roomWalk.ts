// Walking about her bedroom in the character creator (Ed, 2026-10-06: "you should be able to walk around in it using WASD
// during this phase"): the game's own keys move her across the floor as they would on screen (up the screen is into the
// room), she stops at the walls and the furniture's footprints (art/bedroom.js `blocks`) and slides along them, and the
// room's depth hides her behind whatever stands nearer the view. Pure: the creator feeds it keys and time.

/** The room's floor as art/bedroom.js gives it (`sprite.walk`). */
export interface RoomFloor {
  S: number; wall: number;
  /** Footprints she can't walk into: x0, z0, x1, z1 on the floor. */
  blocks: number[][];
  start: number[];
  /** Where a point of the room (x, y, z) lands on its sprite, in pixels. */
  project: (p: number[]) => number[];
}

/** Her size on the floor (a circle, in the room's units) and her walking speed (units a second). */
export const WALK = { r: .14, speed: 1.15 };

/** Her place on the floor and which way she's facing on screen. */
export interface Walker { x: number; z: number; flip: boolean; away: boolean; moving: boolean }
export const newWalker = (f: RoomFloor): Walker => ({ x: f.start[0], z: f.start[1], flip: false, away: false, moving: false });

/** The floor direction a screen direction means: the inverse of how the floor's axes land on screen. */
export function floorDir(f: RoomFloor, sx: number, sy: number): [number, number] {
  const o = f.project([0, 0, 0]), px = f.project([1, 0, 0]), pz = f.project([0, 0, 1]);
  const a = px[0] - o[0], b = pz[0] - o[0], c = px[1] - o[1], d = pz[1] - o[1], det = a * d - b * c;
  if (!det) return [0, 0];
  const x = (d * sx - b * sy) / det, z = (-c * sx + a * sy) / det, l = Math.hypot(x, z);
  return l ? [x / l, z / l] : [0, 0];
}

/** Whether a circle at (x, z) is clear of the walls and every footprint. */
export function clear(f: RoomFloor, x: number, z: number, r = WALK.r): boolean {
  if (x < f.wall + r || z < f.wall + r || x > f.S - r * .6 || z > f.S - r * .6) return false;
  for (const [x0, z0, x1, z1] of f.blocks) {
    const nx = Math.max(x0, Math.min(x1, x)), nz = Math.max(z0, Math.min(z1, z));
    if ((x - nx) ** 2 + (z - nz) ** 2 < r * r) return false;
  }
  return true;
}

/** One step: keys as a screen direction (sx right, sy down, each -1..1), dt seconds. Moves along x and z apart, so she
 *  slides along what she bumps into; faces the way she's going on screen. */
export function walk(w: Walker, f: RoomFloor, sx: number, sy: number, dt: number): Walker {
  const moving = !!(sx || sy);
  w.moving = moving;
  if (!moving) return w;
  const [dx, dz] = floorDir(f, sx, sy), step = WALK.speed * Math.min(dt, .1);
  if (clear(f, w.x + dx * step, w.z)) w.x += dx * step;
  if (clear(f, w.x, w.z + dz * step)) w.z += dz * step;
  if (sx) w.flip = sx < 0;
  if (sy) w.away = sy < 0;
  return w;
}

/** The screen direction the held keys make (WASD and the arrows, as in play). */
export function keysDir(held: Set<string>): [number, number] {
  const k = (...c: string[]) => c.some(x => held.has(x)) ? 1 : 0;
  return [k("KeyD", "ArrowRight") - k("KeyA", "ArrowLeft"), k("KeyS", "ArrowDown") - k("KeyW", "ArrowUp")];
}
