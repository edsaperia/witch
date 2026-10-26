// The oak's house as drawn (the layout v4 mock; Ed, 2026-10-24: "a large old oak tree with wide, thick, decumbent branches ... no
// planks"): the floor one seamless shape (config/house/shape.js), its wood the tree's own, growth rings round each room's heart and
// long grain along the limbs, flowing into each other; a mossy bark rim round its edge, worn pale and lipless at the Terrace's
// take-off; living-wood walls standing up off its far (north) edges and a low bark side under its near ones. The floor is painted
// once into one pixel-art texture, an art pixel a texel (`paintFloor`), seen top-down on the house's plan; what stands up off it is
// quads (`standing`), traced from the same shape's outline.
import type { HouseConfig } from "../rules/houseRooms";
import { fbm, field, outline } from "../../config/house/shape.js";
import { sigilHit } from "../../art/sigils.js";

type RGB = [number, number, number];

/** The floor's foreshortening as the game draws it (the house's plane, 24 degrees: render/houseRooms.ts), so the rings, stretched
 *  on the plan by its inverse, read round on screen (the mock's FORE). */
const FORE = Math.sin((24 * Math.PI) / 180);
/** The tree's wood (the mock's WOOD): four floor tones darkest first, a growth line, bark, moss, a locked room's dim boards. */
/** The Terrace's magic circle (Ed, 2026-10-26: "The magic circle should be larger and have the ent sigil on it"; config/house/base.json
 *  terrace.circle, where she comes back after a fall or a knockout): burnt into the boards, a double ring round the Ent's sigil, the
 *  World Tree (art/sigils.js), its lines the circle's red, the boards inside scorched. `mark(u, v)`: u, v -1 to 1 across it. */
export const CIRCLE = { line: [190, 40, 52] as RGB, glow: [226, 70, 74] as RGB, floor: [58, 30, 24] as RGB };
export const circleMark = (u: number, v: number): "line" | "glow" | "floor" | null => {
  const r = Math.hypot(u, v);
  if (r > 1) return null;
  if (r > 0.965 || (r > 0.855 && r < 0.88)) return "line"; // (the two rings, thin)
  if (r > 0.88) { // (between them, a band of runes: a glyph of ticks and bars every few degrees)
    const a = (Math.atan2(v, u) / (2 * Math.PI) + 1) * 56, k = Math.floor(a), f = a - k, t = (r - 0.88) / 0.085, h = Math.sin(k * 91.7) * 4375.85 - Math.floor(Math.sin(k * 91.7) * 4375.85);
    const stem = Math.abs(f - 0.5) < 0.09 && t > 0.15 && t < 0.85, bar = f > 0.25 && f < 0.75 && Math.abs(t - (h < 0.5 ? 0.3 : 0.7)) < 0.1, hook = h > 0.7 && Math.abs(f - 0.3) < 0.07 && t > 0.5 && t < 0.85;
    return stem || bar || hook ? "glow" : "floor";
  }
  return sigilHit("worldTree", 0.5 + u / 1.62, 0.5 + v / 1.62, 0.014) ? "glow" : "floor"; // (the tree filling the inner ring)
};
/** The Terrace's magic circle on the house's plan: its middle and radius, metres (null: none). */
export const terraceCircle = (H: HouseConfig): { x: number; z: number; r: number } | null => {
  const tr = H.rooms.find(r => r.id === "terrace");
  return tr && H.terrace?.circle ? { x: (tr.x0 + tr.x1) / 2 + H.terrace.circle.x, z: (tr.z0 + tr.z1) / 2 + H.terrace.circle.z, r: H.terrace.circle.r } : null;
};
const WOOD = { floor: [[78, 46, 28], [104, 64, 38], [132, 84, 48], [158, 106, 62]] as RGB[], ring: [62, 36, 22] as RGB, bark: [[38, 28, 22], [56, 40, 28], [78, 58, 40]] as RGB[], moss: [[46, 66, 38], [70, 96, 50]] as RGB[], locked: [[52, 40, 34], [64, 50, 40]] as RGB[] };
const DEG = Math.PI / 180;

/** On the Terrace's take-off, its open rim (base.json terrace.takeoff, as rules/treehouse.ts atTakeoff): within its angles and 3 m past
 *  its size of its middle. */
export function onTakeoff(H: HouseConfig, x: number, z: number): boolean {
  const T = H.rooms.find(r => r.id === "terrace"), k = H.terrace?.takeoff;
  if (!T || !k) return false;
  const a = Math.atan2(z - T.z, x - T.x) / DEG, da = Math.abs((((a - k.angle) % 360) + 540) % 360 - 180);
  return Math.hypot(x - T.x, z - T.z) < T.r + 3 && da < k.half;
}

type Part = { kind: string; s: number; side?: number; t?: number; r?: { x: number; z: number; id?: string }; a?: { x: number; z: number } };
/** The grain's coordinate (the mock's `grain`): rings about the nearest rooms' hearts, long grain along the limbs, weighted by nearness
 *  so they flow into each other; (x, z) and the parts in the mock's own frame (config/house/shape.js field). */
function grain(x: number, z: number, parts: Part[]): number {
  let wsum = 0, g = 0;
  for (const p of parts) {
    const w = Math.exp(-Math.max(0, p.s + 2) * 0.45);
    if (w < 1e-4) continue;
    const v = p.kind === "ring" ? Math.hypot(x - p.r!.x, (z - p.r!.z) / FORE) * 1.1 + Math.sin(Math.atan2(z - p.r!.z, x - p.r!.x) * 3 + p.r!.x) : p.side! * 1.3 + Math.sin(p.t! * 9 + (p.r ? p.r.x : p.a!.x));
    g += v * w; wsum += w;
  }
  return wsum ? g / wsum : 0;
}
const hash = (x: number, y: number) => { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); };

/** The floor painted, an art pixel (`mpp` metres) a texel, top-down on the plan: the mock's floor, rim and take-off, as RGBA pixels (no
 *  DOM: render/houseFloor.worker.ts paints it off the page's thread). `rest` all but the Terrace's own floor (its room's outline),
 *  `terrace` only that (render/houseRooms.ts draws the two in different passes), from one pass (the boot freeze, 2026-10-25: two
 *  passes over the whole house, a `roomAt` a pixel, were 75 s on the page's thread at the start). Each pixel's room and the Terrace's
 *  test are read off the parts `field` measured there (the same blobs at the same point); blocks of it well clear of the floor (its
 *  middle further from it than the field could fall across the block) are left clear without a pixel's field. */
export function paintFloorPixels(H: HouseConfig, mpp: number): FloorPixels {
  const F = floorFrame(H, mpp), { rest, terrace } = paintFloorRows(H, mpp, 0, F.h);
  return { ...F, rest, terrace };
}
/** The floor's frame for texels `mpp` metres: its texels across and down, its corner and size on the plan, and the rows its blocks
 *  start on (`B` apart: a band of rows from one of them paints just as the whole does). */
export function floorFrame(H: HouseConfig, mpp: number) {
  const pad = 2, x0 = Math.min(...H.rooms.map(r => r.x0)) - pad, x1 = Math.max(...H.rooms.map(r => r.x1)) + pad, z0 = Math.min(...H.rooms.map(r => r.z0)) - pad, z1 = Math.max(...H.rooms.map(r => r.z1)) + pad;
  return { w: Math.ceil((x1 - x0) / mpp), h: Math.ceil((z1 - z0) / mpp), x0, z0, ww: x1 - x0, hh: z1 - z0, B: Math.max(1, Math.round(2 / mpp)) };
}
/** Rows `j0` (a multiple of floorFrame's B) to `j1` of the floor's two pictures (paintFloorPixels), `w` × (j1 - j0) texels each. */
export function paintFloorRows(H: HouseConfig, mpp: number, j0: number, j1: number): { rest: Uint8ClampedArray; terrace: Uint8ClampedArray } {
  const S = H.shape, [ox, oz] = S.noiseAt, { w: W, h: Hh, x0, z0, B } = floorFrame(H, mpp);
  j1 = Math.min(j1, Hh);
  const rest = new Uint8ClampedArray(W * Math.max(0, j1 - j0) * 4), terrace = new Uint8ClampedArray(rest.length);
  const locked = new Set(H.rooms.filter(r => r.locked).map(r => r.id));
  const circ = terraceCircle(H);
  const set = (px: Uint8ClampedArray, o: number, c: RGB) => { px[o] = c[0]; px[o + 1] = c[1]; px[o + 2] = c[2]; px[o + 3] = 255; };
  // (blocks about 2 m across; the field falls at most about 1.3 m a metre (a room's wobble), so 2 a metre and half a metre to spare)
  const reach = 2 * Math.SQRT1_2 * B * mpp + 0.5;
  const parts: Part[] = [];
  for (let bj = j0; bj < j1; bj += B) for (let bi = 0; bi < W; bi += B) {
    const cx = x0 + (bi + Math.min(B, W - bi) / 2) * mpp, cz = z0 + (bj + Math.min(B, Hh - bj) / 2) * mpp;
    if (field(S, cx, cz) > reach) continue; // (clear of the floor: transparent, as the arrays start)
    for (let j = bj; j < Math.min(j1, bj + B); j++) for (let i = bi; i < Math.min(W, bi + B); i++) {
      const x = x0 + (i + 0.5) * mpp, z = z0 + (j + 0.5) * mpp, o = ((j - j0) * W + i) * 4;
      parts.length = 0;
      const d = field(S, x, z, false, parts);
      if (d >= 0) continue;
      // (the room it's on, as shape.js roomAt: the first blob, in its order, nearest inside; the Terrace's own floor, inRoom)
      let room: string | null = null, bd = 0, onTerrace = false;
      for (const p of parts) if (p.kind === "ring") { if (p.s < bd) { bd = p.s; room = p.r!.id!; } if (p.r!.id === "terrace" && p.s <= 0) onTerrace = true; }
      const px = onTerrace ? terrace : rest, mx = x + ox, mz = z + oz;
      if (d > -0.45 && onTakeoff(H, x, z)) { set(px, o, WOOD.floor[3]); continue; } // (the open rim where she steps off: worn pale, no lip)
      if (d > -0.45) { const n = hash(i * 3 + 1, j * 7); set(px, o, fbm(mx * 0.8, mz * 0.8) > 0.6 ? WOOD.moss[n > 0.5 ? 1 : 0] : WOOD.bark[n > 0.66 ? 2 : n > 0.33 ? 1 : 0]); continue; }
      if (room && locked.has(room)) { set(px, o, WOOD.locked[hash(i, j) < 0.5 ? 0 : 1]); continue; }
      if (onTerrace && circ) { const m = circleMark((x - circ.x) / circ.r, (z - circ.z) / circ.r); if (m) { set(px, o, CIRCLE[m]); continue; } } // (the magic circle)
      const gr = grain(mx, mz, parts) + (fbm(mx * 0.9, (mz / FORE) * 0.9) - 0.5) * 1.1, f = gr - Math.floor(gr);
      if (f < 0.09) { set(px, o, WOOD.ring); continue; } // (a growth line)
      const lit = fbm(mx * 0.12 + 7, (mz / FORE) * 0.12) * 0.9 + (1 - f) * 0.25;
      set(px, o, WOOD.floor[lit > 0.66 ? 3 : lit > 0.5 ? 2 : lit > 0.36 ? 1 : 0]);
    }
  }
  return { rest, terrace };
}
/** The floor's two pictures: `w` × `h` texels from (x0, z0) on the plan, `ww` × `hh` metres. */
export interface FloorPixels { w: number; h: number; x0: number; z0: number; ww: number; hh: number; rest: Uint8ClampedArray; terrace: Uint8ClampedArray }

/** A quad of what stands up off the floors: corners in metres on the plan (h up off the floor), its colour (0..1). */
export interface Upright { p: [number, number, number][]; rgb: RGB; layer: number }
const c01 = (c: RGB): RGB => c.map(v => v / 255) as RGB;
const BARK0 = c01(WOOD.bark[0]), BARK1 = c01(WOOD.bark[1]), BARK2 = c01(WOOD.bark[2]), MOSS1 = c01(WOOD.moss[1]);

/** Whether a point is on the floor (outline's own test, the field below 0), each 2 m block of the box well clear of the floor's edge
 *  (its middle further from it, outside or in, than the field could change across the block) answered without a point's field: the
 *  outline's points over the whole house were a second at the start (the boot freeze, 2026-10-25). */
export function onFloor(H: HouseConfig, box: { x0: number; z0: number }): (x: number, z: number) => boolean {
  const blocks = new Map<number, number>(), reach = 2 * Math.SQRT1_2 + 0.5; // (each block: 1 all on, 0 all off, -1 its points asked)
  return (x, z) => {
    const bi = Math.floor((x - box.x0) / 2), bj = Math.floor((z - box.z0) / 2), k = bj * 4096 + bi;
    let b = blocks.get(k);
    if (b === undefined) { const d = field(H.shape, box.x0 + bi * 2 + 1, box.z0 + bj * 2 + 1); blocks.set(k, (b = d > reach ? 0 : d < -reach ? 1 : -1)); }
    return b === -1 ? field(H.shape, x, z) < 0 : b === 1;
  };
}

/** The uprights, along the floor's outline (half-metre steps): where the floor's edge faces north (away from the camera), a wall of
 *  living wood (H.wall metres; furrowed bark, moss along its top), layer 1, drawn before her; where it faces south, the bark side
 *  under the rim, layer 3, in front; none at the take-off. */
export function standing(H: HouseConfig): Upright[] {
  const q: Upright[] = [], box = { x0: Math.min(...H.rooms.map(r => r.x0)) - 3, x1: Math.max(...H.rooms.map(r => r.x1)) + 3, z0: Math.min(...H.rooms.map(r => r.z0)) - 3, z1: Math.max(...H.rooms.map(r => r.z1)) + 3 };
  for (const ring of outline(H.shape, box, 0.5, onFloor(H, box)) as [number, number][][]) {
    // (the ring's winding: its signed area tells which side of each edge is inside)
    let A = 0;
    for (let k = 0; k < ring.length; k++) { const [ax, az] = ring[k], [bx, bz] = ring[(k + 1) % ring.length]; A += ax * bz - bx * az; }
    for (let k = 0; k < ring.length; k++) {
      const [ax, az] = ring[k], [bx, bz] = ring[(k + 1) % ring.length], L = Math.hypot(bx - ax, bz - az) || 1;
      const nz = ((A > 0 ? -1 : 1) * (bx - ax)) / L; // (the outward normal's z: negative facing north)
      const mx = (ax + bx) / 2, mz = (az + bz) / 2;
      if (onTakeoff(H, mx, mz)) continue;
      if (nz < -0.2) {
        const top = H.wall, furrow = Math.sin(k * 1.7 + Math.floor(k / 3) * 2.1) > 0.3;
        q.push({ p: [[ax, az, 0], [bx, bz, 0], [bx, bz, top - 0.15], [ax, az, top - 0.15]], rgb: furrow ? BARK0 : k % 7 === 3 ? BARK2 : BARK1, layer: 1 });
        q.push({ p: [[ax, az, top - 0.15], [bx, bz, top - 0.15], [bx, bz, top], [ax, az, top]], rgb: MOSS1, layer: 1 });
      } else if (nz > 0.2) q.push({ p: [[ax, az, 0], [bx, bz, 0], [bx, bz, -0.85], [ax, az, -0.85]], rgb: k % 3 ? BARK1 : BARK0, layer: 3 });
    }
  }
  return q;
}
