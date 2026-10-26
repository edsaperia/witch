// The ground's area texture as a window round her (render/areaWindow.ts): its slots, its moves, its two bytes a texel, and a fake
// renderer holding the texture's bytes on the CPU, so what the shader would read is checked: every texel in the window its own
// tile's, as she flies about, nothing stale.
import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { AREA_TILE, AreaWindow, areaTexel, enteringSlots, slotOf, windowCorner } from "./areaWindow";

/** The GLSL's areaDecode, in JavaScript: the old texel (look / 255, openness, pond, filled). */
const decode = (r: number, g: number) => (r === 0 ? [0, 0, 0, 0] : [(r - 1) / 255, (g % 128) / 127, g >= 128 ? 1 : 0, 1]);

/** A renderer that copies into a CPU copy of the window's texture. */
function fakeRenderer(n: number) {
  const tex = new Uint8Array(n * n * 2);
  let uploads = 0;
  const r = {
    initTexture() {},
    copyTextureToTexture(src: THREE.DataTexture, _dst: unknown, _region: unknown, at: THREE.Vector2) {
      const { data, width, height } = src.image as { data: Uint8Array; width: number; height: number };
      for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) for (let c = 0; c < 2; c++) tex[((at.y + y) * n + at.x + x) * 2 + c] = data[(y * width + x) * 2 + c];
      uploads++;
    },
  };
  return { r: r as unknown as THREE.WebGLRenderer, tex, uploads: () => uploads };
}

describe("the ground's area window", () => {
  it("packs each texel's look, openness and pond in two bytes, read back as the old four channels", () => {
    for (const [look, open, pond] of [[0, 0, false], [5, 1, true], [71, 0.37, false], [200, 0.5, true]] as const) {
      const [r, g] = areaTexel(look, open, pond), d = decode(r, g);
      expect(d[0] * 255).toBeCloseTo(look, 6); expect(d[1]).toBeCloseTo(open, 1); expect(d[2]).toBe(pond ? 1 : 0); expect(d[3]).toBe(1);
    }
    expect(decode(0, 0)[3]).toBe(0); // (not filled yet)
  });

  it("keeps her within a step of its middle, moving a whole step at a time, and hands on only the slots it leaves", () => {
    const s = 64, step = 4;
    let at = windowCorner(null, 100.5, 40.5, s, step);
    expect(Math.abs(100.5 - (at.i0 + s / 2))).toBeLessThanOrEqual(step);
    for (const cx of [101, 103, 103.9]) expect(windowCorner(at, cx, 40.5, s, step)).toEqual(at); // (under a step off: stays)
    const moved = windowCorner(at, 106, 40.5, s, step);
    expect(moved.i0 % step).toBe(0); expect(moved.i0).toBeGreaterThan(at.i0); expect(moved.j0).toBe(at.j0);
    const cols = enteringSlots(at.i0, moved.i0, s);
    expect(cols.length).toBe(moved.i0 - at.i0);
    for (let i = moved.i0; i < moved.i0 + s; i++) if (i >= at.i0 + s) expect(cols).toContain(slotOf(i, 0, s)[0]); // (each new column's slot cleared)
    expect(enteringSlots(0, 1000, s).length).toBe(s); // (a jump: every slot)
    at = moved;
  });

  it("holds what the shader reads: every texel in its box its own tile's, flown about and teleported, nothing stale", () => {
    const s = 16, step = 2, map = { minX: -500, minZ: -300, tilesX: 90, tilesZ: 70 };
    // (each tile's texels its own: look = its index's low bits, openness its row)
    const fill = (out: Uint8Array, i: number, j: number) => { for (let k = 0; k < AREA_TILE * AREA_TILE; k++) { const [r, g] = areaTexel((i * 7 + j * 13) % 200, (j % 10) / 10, (i + j) % 2 === 0); out[k * 2] = r; out[k * 2 + 1] = g; } };
    const W = new AreaWindow(s, 2, step, map, fill), n = s * AREA_TILE, R = fakeRenderer(n), tm = AREA_TILE / 2;
    const check = () => {
      // what the shader would read at each tile's middle inside the box: its own tile's, or nothing (not filled yet)
      for (let z = W.box.y + tm / 2; z < W.box.w; z += tm) for (let x = W.box.x + tm / 2; x < W.box.z; x += tm) {
        const i = Math.floor((x - map.minX) / tm), j = Math.floor((z - map.minZ) / tm);
        const u = ((((x - W.extent.x) / W.extent.z) % 1) + 1) % 1, v = ((((z - W.extent.y) / W.extent.w) % 1) + 1) % 1; // (the texture repeating)
        const px = Math.floor(u * n), py = Math.floor(v * n), r = R.tex[(py * n + px) * 2], g = R.tex[(py * n + px) * 2 + 1];
        if (r === 0) continue;
        expect([r, g], `tile ${i},${j}`).toEqual(areaTexel((i * 7 + j * 13) % 200, (j % 10) / 10, (i + j) % 2 === 0));
      }
    };
    let x = 0, z = 0;
    for (let k = 0; k < 120; k++) {
      x += 37 * Math.cos(k / 7); z += 29 * Math.sin(k / 5);
      const rect = { minX: x - 60, maxX: x + 60, minZ: z - 60, maxZ: z + 60 };
      while (W.fill(R.r, rect, x, z, 1e9) > 0);
      check();
      // all of her rect inside the map and the box is filled
      expect(W.fill(R.r, rect, x, z, 1e9)).toBe(0);
      if (k === 60) { x += 900; z -= 400; } // (a teleport: a sail, a knockout home)
    }
    expect(W.bytes).toBe(n * n * 2);
  });
});
