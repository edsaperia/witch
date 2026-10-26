import { describe, expect, it } from "vitest";
import { floorFrame, onFloor, onTakeoff, paintFloorPixels, paintFloorRows } from "./houseArt";
import { HOUSE_ROOMS, type HouseConfig } from "../rules/houseRooms";
import { fbm, field, inRoom, outline, roomAt } from "../../config/house/shape.js";

// The floor as it was painted before the boot freeze's fix (2026-10-25): a whole pass over the house for each part, the field with its
// parts and roomAt at every pixel. The one-pass painter must give the same pixels.
const FORE = Math.sin((24 * Math.PI) / 180);
const WOOD = { floor: [[78, 46, 28], [104, 64, 38], [132, 84, 48], [158, 106, 62]], ring: [62, 36, 22], bark: [[38, 28, 22], [56, 40, 28], [78, 58, 40]], moss: [[46, 66, 38], [70, 96, 50]], locked: [[52, 40, 34], [64, 50, 40]] };
const hash = (x: number, y: number) => { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); };
type P = { kind: string; s: number; side?: number; t?: number; r?: { x: number; z: number }; a?: { x: number; z: number } };
function grain(x: number, z: number, parts: P[]): number {
  let wsum = 0, g = 0;
  for (const p of parts) {
    const w = Math.exp(-Math.max(0, p.s + 2) * 0.45);
    if (w < 1e-4) continue;
    const v = p.kind === "ring" ? Math.hypot(x - p.r!.x, (z - p.r!.z) / FORE) * 1.1 + Math.sin(Math.atan2(z - p.r!.z, x - p.r!.x) * 3 + p.r!.x) : p.side! * 1.3 + Math.sin(p.t! * 9 + (p.r ? p.r.x : p.a!.x));
    g += v * w; wsum += w;
  }
  return wsum ? g / wsum : 0;
}
function paintBefore(H: HouseConfig, mpp: number, part: "terrace" | "rest"): Uint8ClampedArray {
  const S = H.shape, [ox, oz] = S.noiseAt, pad = 2;
  const x0 = Math.min(...H.rooms.map(r => r.x0)) - pad, x1 = Math.max(...H.rooms.map(r => r.x1)) + pad, z0 = Math.min(...H.rooms.map(r => r.z0)) - pad, z1 = Math.max(...H.rooms.map(r => r.z1)) + pad;
  const W = Math.ceil((x1 - x0) / mpp), Hh = Math.ceil((z1 - z0) / mpp), px = new Uint8ClampedArray(W * Hh * 4);
  const set = (o: number, c: number[]) => { px[o] = c[0]; px[o + 1] = c[1]; px[o + 2] = c[2]; px[o + 3] = 255; };
  for (let j = 0; j < Hh; j++) for (let i = 0; i < W; i++) {
    const x = x0 + (i + 0.5) * mpp, z = z0 + (j + 0.5) * mpp, o = (j * W + i) * 4, parts: P[] = [], d = field(S, x, z, false, parts);
    if (d >= 0 || (inRoom(S, "terrace", x, z) <= 0) !== (part === "terrace")) { px[o + 3] = 0; continue; }
    const mx = x + ox, mz = z + oz;
    if (d > -0.45 && onTakeoff(H, x, z)) { set(o, WOOD.floor[3]); continue; }
    if (d > -0.45) { const n = hash(i * 3 + 1, j * 7); set(o, fbm(mx * 0.8, mz * 0.8) > 0.6 ? WOOD.moss[n > 0.5 ? 1 : 0] : WOOD.bark[n > 0.66 ? 2 : n > 0.33 ? 1 : 0]); continue; }
    if (H.rooms.find(r => r.id === roomAt(S, x, z)?.id)?.locked) { set(o, WOOD.locked[hash(i, j) < 0.5 ? 0 : 1]); continue; }
    const gr = grain(mx, mz, parts) + (fbm(mx * 0.9, (mz / FORE) * 0.9) - 0.5) * 1.1, f = gr - Math.floor(gr);
    if (f < 0.09) { set(o, WOOD.ring); continue; }
    const lit = fbm(mx * 0.12 + 7, (mz / FORE) * 0.12) * 0.9 + (1 - f) * 0.25;
    set(o, WOOD.floor[lit > 0.66 ? 3 : lit > 0.5 ? 2 : lit > 0.36 ? 1 : 0]);
  }
  return px;
}
const differ = (a: Uint8ClampedArray, b: Uint8ClampedArray) => { let n = 0; for (let k = 0; k < a.length; k++) if (a[k] !== b[k]) n++; return n; };

describe("the house's floor, painted", () => {
  // (half-metre texels: the game's are 0.094 m, 30 times the pixels; the blocks it skips are 2 m whatever the texel)
  for (const mpp of [0.5, 0.35]) it(`gives the same pixels as the two whole passes did (${mpp} m texels)`, () => {
    const A = paintFloorPixels(HOUSE_ROOMS, mpp);
    expect(A.rest.length).toBe(A.w * A.h * 4);
    expect(differ(A.rest, paintBefore(HOUSE_ROOMS, mpp, "rest"))).toBe(0);
    expect(differ(A.terrace, paintBefore(HOUSE_ROOMS, mpp, "terrace"))).toBe(0);
    let n = 0; for (let k = 3; k < A.terrace.length; k += 4) n += A.terrace[k] ? 1 : 0;
    expect(n).toBeGreaterThan(100); // (the Terrace is there)
    // (and in bands of whole blocks, as the workers paint it: render/houseFloor.ts)
    const F = floorFrame(HOUSE_ROOMS, mpp), cut = 3 * F.B, a = paintFloorRows(HOUSE_ROOMS, mpp, 0, cut), b = paintFloorRows(HOUSE_ROOMS, mpp, cut, F.h);
    expect(differ(new Uint8ClampedArray([...a.rest, ...b.rest]), A.rest)).toBe(0);
    expect(differ(new Uint8ClampedArray([...a.terrace, ...b.terrace]), A.terrace)).toBe(0);
  });
  it("traces the same outline for the walls with the blocks clear of the floor left out", () => {
    const H = HOUSE_ROOMS, box = { x0: Math.min(...H.rooms.map(r => r.x0)) - 3, x1: Math.max(...H.rooms.map(r => r.x1)) + 3, z0: Math.min(...H.rooms.map(r => r.z0)) - 3, z1: Math.max(...H.rooms.map(r => r.z1)) + 3 };
    expect(JSON.stringify(outline(H.shape, box, 0.5, onFloor(H, box)))).toBe(JSON.stringify(outline(H.shape, box, 0.5)));
  });
});
