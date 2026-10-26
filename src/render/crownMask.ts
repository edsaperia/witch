// The great oak's crown's clearing indoors (render/crown.ts): the floor she's on, her room's own outline or the branch she walks, as a
// distance field over the crown's dome, so the leaves laid over the floors keep clear of it. No three.js and no page here: each room's
// and branch's field is drawn once by the art workers (render/artBuild.ts, the "crownMask" job) and kept, since drawn on the page as
// she stepped into each one it held the frame 190 to 360 ms under the cloud's software renderer (Ed's playtest of v4515: one long
// frame at every doorway).
import { rooms as OUTLINE_ROOMS, branches as OUTLINE_BRANCHES } from "../../config/house/outline.json";
import type { HouseOutline } from "../rules/crown";

/** The mask's side (texels) over the crown's dome: about a metre a texel. */
export const MASK = 128;

/** Whether (x, z) is inside a closed outline. */
export function inPoly(p: [number, number][], x: number, z: number): boolean {
  let c = false;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) if ((p[i][1] > z) !== (p[j][1] > z) && x < ((p[j][0] - p[i][0]) * (z - p[i][1])) / (p[j][1] - p[i][1]) + p[i][0]) c = !c;
  return c;
}
/** How far (x, z) is from a line through points (closed: back to its first). */
export function polyDist(p: [number, number][], x: number, z: number, closed = false): number {
  let d = Infinity;
  for (let i = 1; i < p.length + (closed ? 1 : 0); i++) {
    const [ax, az] = p[i - 1], [bx, bz] = p[i % p.length], dx = bx - ax, dz = bz - az, t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / Math.max(1e-9, dx * dx + dz * dz)));
    d = Math.min(d, Math.hypot(x - ax - dx * t, z - az - dz * t));
  }
  return d;
}

/** The house's outline (config/house/outline.json), its rooms and branches. */
export const HOUSE_OUTLINE = { rooms: OUTLINE_ROOMS, branches: OUTLINE_BRANCHES } as unknown as Pick<HouseOutline, "rooms" | "branches">;

/** Every floor the crown keeps clear of, by its key: "room:<id>" an unlocked room, "branch:<id>" a branch. */
export const maskKeys = (O: Pick<HouseOutline, "rooms" | "branches"> = HOUSE_OUTLINE): string[] =>
  [...O.rooms.filter(r => !r.locked).map(r => `room:${r.id}`), ...O.branches.map(b => `branch:${b.id}`)];

/** One floor's distance field (its key's), over `box` (the dome's corner x, z and 1 / its width, 1 / its depth, as the crown's
 *  uClearBox): 0 on it, 255 at 16 m off and beyond. Null for a key the outline hasn't. */
export function clearMask(key: string, box: readonly number[], O: Pick<HouseOutline, "rooms" | "branches"> = HOUSE_OUTLINE): Uint8Array | null {
  const [kind, id] = key.split(":"), room = kind === "room" ? O.rooms.find(r => r.id === id) : undefined, branch = kind === "branch" ? O.branches.find(b => b.id === id) : undefined;
  if (!room && !branch) return null;
  const dist = room ? (x: number, z: number) => (inPoly(room.outline, x, z) ? 0 : polyDist(room.outline, x, z, true)) : (x: number, z: number) => Math.max(0, polyDist(branch!.pts, x, z) - branch!.w / 2);
  const w = 1 / box[2], d = 1 / box[3], mask = new Uint8Array(MASK * MASK);
  for (let j = 0; j < MASK; j++) for (let i = 0; i < MASK; i++) {
    const x = box[0] + ((i + 0.5) / MASK) * w, z = box[1] + ((j + 0.5) / MASK) * d;
    mask[j * MASK + i] = Math.min(255, Math.round((dist(x, z) / 16) * 255));
  }
  return mask;
}
