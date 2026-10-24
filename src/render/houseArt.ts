// The oak's house as drawn (the layout v4 mock; Ed, 2026-10-24: "a large old oak tree with wide, thick, decumbent branches ... no
// planks"): the floor one seamless shape (config/house/shape.js), its wood the tree's own, growth rings round each room's heart and
// long grain along the limbs, flowing into each other; a mossy bark rim round its edge, worn pale and lipless at the Terrace's
// take-off; living-wood walls standing up off its far (north) edges and a low bark side under its near ones. The floor is painted
// once into one pixel-art texture, an art pixel a texel (`paintFloor`), seen top-down on the house's plan; what stands up off it is
// quads (`standing`), traced from the same shape's outline.
import type { HouseConfig } from "../rules/houseRooms";
import { fbm, field, roomAt, outline } from "../../config/house/shape.js";

type RGB = [number, number, number];
export interface FloorArt { canvas: HTMLCanvasElement; x0: number; z0: number; w: number; h: number }

const hex = (s: string): RGB => [parseInt(s.slice(1, 3), 16), parseInt(s.slice(3, 5), 16), parseInt(s.slice(5, 7), 16)];
const LEAF = ["#26402a", "#335533", "#43703d", "#5a8c48"].map(hex);

/** A small hash of integers to 0..1 (the art's own noise: seeded by place, the same every load). */
const ihash = (a: number, b: number, c = 0) => { let h = (a * 374761393 + b * 668265263 + c * 2147483647) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
/** Smooth value noise at (x, z) metres, `s` metres a cell. */
function noise(x: number, z: number, s: number, k = 0): number {
  const fx = x / s, fz = z / s, ix = Math.floor(fx), iz = Math.floor(fz), u = fx - ix, v = fz - iz, a = ihash(ix, iz, k), b = ihash(ix + 1, iz, k), c = ihash(ix, iz + 1, k), d = ihash(ix + 1, iz + 1, k);
  const su = u * u * (3 - 2 * u), sv = v * v * (3 - 2 * v);
  return a + (b - a) * su + (c - a) * sv + (a - b - c + d) * su * sv;
}

/** The floor's foreshortening as the game draws it (the house's plane, 24 degrees: render/houseRooms.ts), so the rings, stretched
 *  on the plan by its inverse, read round on screen (the mock's FORE). */
const FORE = Math.sin((24 * Math.PI) / 180);
/** The tree's wood (the mock's WOOD): four floor tones darkest first, a growth line, bark, moss, a locked room's dim boards. */
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

type Part = { kind: string; s: number; side?: number; t?: number; r?: { x: number; z: number }; a?: { x: number; z: number } };
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

/** The floor painted, an art pixel (`mpp` metres) a texel, top-down on the plan: the mock's floor, rim and take-off. */
export function paintFloor(H: HouseConfig, mpp: number): FloorArt {
  const S = H.shape, [ox, oz] = S.noiseAt, pad = 2;
  const x0 = Math.min(...H.rooms.map(r => r.x0)) - pad, x1 = Math.max(...H.rooms.map(r => r.x1)) + pad, z0 = Math.min(...H.rooms.map(r => r.z0)) - pad, z1 = Math.max(...H.rooms.map(r => r.z1)) + pad;
  const W = Math.ceil((x1 - x0) / mpp), Hh = Math.ceil((z1 - z0) / mpp), canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = Hh;
  const g = canvas.getContext("2d")!, img = g.createImageData(W, Hh), px = img.data;
  const set = (o: number, c: RGB) => { px[o] = c[0]; px[o + 1] = c[1]; px[o + 2] = c[2]; px[o + 3] = 255; };
  for (let j = 0; j < Hh; j++) for (let i = 0; i < W; i++) {
    const x = x0 + (i + 0.5) * mpp, z = z0 + (j + 0.5) * mpp, o = (j * W + i) * 4, parts: Part[] = [], d = field(S, x, z, false, parts);
    if (d >= 0) { px[o + 3] = 0; continue; }
    const mx = x + ox, mz = z + oz;
    if (d > -0.45 && onTakeoff(H, x, z)) { set(o, WOOD.floor[3]); continue; } // (the open rim where she steps off: worn pale, no lip)
    if (d > -0.45) { const n = hash(i * 3 + 1, j * 7); set(o, fbm(mx * 0.8, mz * 0.8) > 0.6 ? WOOD.moss[n > 0.5 ? 1 : 0] : WOOD.bark[n > 0.66 ? 2 : n > 0.33 ? 1 : 0]); continue; }
    if (H.rooms.find(r => r.id === roomAt(S, x, z)?.id)?.locked) { set(o, WOOD.locked[hash(i, j) < 0.5 ? 0 : 1]); continue; }
    const gr = grain(mx, mz, parts) + (fbm(mx * 0.9, (mz / FORE) * 0.9) - 0.5) * 1.1, f = gr - Math.floor(gr);
    if (f < 0.09) { set(o, WOOD.ring); continue; } // (a growth line)
    const lit = fbm(mx * 0.12 + 7, (mz / FORE) * 0.12) * 0.9 + (1 - f) * 0.25;
    set(o, WOOD.floor[lit > 0.66 ? 3 : lit > 0.5 ? 2 : lit > 0.36 ? 1 : 0]);
  }
  g.putImageData(img, 0, 0);
  return { canvas, x0, z0, w: x1 - x0, h: z1 - z0 };
}

/** A quad of what stands up off the floors: corners in metres on the plan (h up off the floor), its colour (0..1). */
export interface Upright { p: [number, number, number][]; rgb: RGB; layer: number }
const c01 = (c: RGB): RGB => c.map(v => v / 255) as RGB;
const BARK0 = c01(WOOD.bark[0]), BARK1 = c01(WOOD.bark[1]), BARK2 = c01(WOOD.bark[2]), MOSS1 = c01(WOOD.moss[1]);

/** The uprights, along the floor's outline (half-metre steps): where the floor's edge faces north (away from the camera), a wall of
 *  living wood (H.wall metres; furrowed bark, moss along its top), layer 1, drawn before her; where it faces south, the bark side
 *  under the rim, layer 3, in front; none at the take-off. */
export function standing(H: HouseConfig): Upright[] {
  const q: Upright[] = [], box = { x0: Math.min(...H.rooms.map(r => r.x0)) - 3, x1: Math.max(...H.rooms.map(r => r.x1)) + 3, z0: Math.min(...H.rooms.map(r => r.z0)) - 3, z1: Math.max(...H.rooms.map(r => r.z1)) + 3 };
  for (const ring of outline(H.shape, box, 0.5) as [number, number][][]) {
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
