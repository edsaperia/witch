// The GPU ledger (render/gpuLedger.ts) on a pretend GL context: the bytes each upload makes by its own format (R8 one a texel,
// RGBA8 four, half floats two a channel), levels and mipmaps, cube faces, render buffers, what's freed, and the kinds found
// through the renderer's properties; and the budget's per-pixel rule.
import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { GpuLedger, gpuBudgetMB, gpuKind, texelBytes } from "./gpuLedger";

const GL = { TEXTURE_2D: 0x0de1, CUBE: 0x8513, CUBE_X: 0x8515, RGBA: 0x1908, RED: 0x1903, R8: 0x8229, RGBA8: 0x8058, R16F: 0x822d, UNSIGNED_BYTE: 0x1401, HALF_FLOAT: 0x140b, FLOAT: 0x1406, DEPTH24_STENCIL8: 0x88f0, TEXTURE0: 0x84c0, RENDERBUFFER: 0x8d41, FRAMEBUFFER: 0x8d40, COLOR0: 0x8ce0 };

/** A pretend context: every call a no-op, getError handing back what's queued. */
function fakeGL() {
  const errors: number[] = [];
  const gl: Record<string, unknown> = { errors, getError: () => errors.shift() ?? 0 };
  for (const k of ["activeTexture", "bindTexture", "texImage2D", "texImage3D", "texStorage2D", "texStorage3D", "generateMipmap", "deleteTexture", "copyTexImage2D", "compressedTexImage2D", "framebufferTexture2D", "framebufferTextureLayer", "bindRenderbuffer", "renderbufferStorage", "renderbufferStorageMultisample", "deleteRenderbuffer"]) gl[k] = () => {};
  return gl as unknown as WebGL2RenderingContext & { errors: number[] };
}
/** A pretend renderer whose properties map three.js textures to GL ones. */
const fakeRenderer = (map: Map<object, object>) => ({ properties: { get: (t: object) => (map.has(t) ? { __webglTexture: map.get(t) } : {}) } }) as unknown as THREE.WebGLRenderer;

describe("the GPU ledger", () => {
  it("knows each format's bytes a texel", () => {
    expect(texelBytes(GL.R8)).toBe(1);
    expect(texelBytes(GL.RGBA8)).toBe(4);
    expect(texelBytes(GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE)).toBe(4);
    expect(texelBytes(GL.RGBA, GL.RGBA, GL.FLOAT)).toBe(16);
    expect(texelBytes(GL.RED, GL.RED, GL.HALF_FLOAT)).toBe(2);
    expect(texelBytes(GL.R16F, GL.RED, GL.HALF_FLOAT)).toBe(2);
    expect(texelBytes(GL.DEPTH24_STENCIL8)).toBe(4);
  });

  it("counts uploads by their own format, re-uploads in place, mipmaps and frees", () => {
    const gl = fakeGL(), L = new GpuLedger(gl), a = {}, b = {};
    gl.bindTexture(GL.TEXTURE_2D, a as WebGLTexture);
    gl.texImage2D(GL.TEXTURE_2D, 0, GL.R8, 1024, 512, 0, GL.RED, GL.UNSIGNED_BYTE, null);
    expect(L.total).toBe(1024 * 512); // (an index page: a byte a texel)
    gl.texImage2D(GL.TEXTURE_2D, 0, GL.R8, 1024, 512, 0, GL.RED, GL.UNSIGNED_BYTE, null);
    expect(L.total).toBe(1024 * 512); // (uploaded again: the same bytes, not twice)
    gl.activeTexture(GL.TEXTURE0 + 3);
    gl.bindTexture(GL.TEXTURE_2D, b as WebGLTexture);
    gl.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA8, 256, 256, 0, GL.RGBA, GL.UNSIGNED_BYTE, null);
    gl.generateMipmap(GL.TEXTURE_2D);
    expect(L.total).toBe(1024 * 512 + Math.round((256 * 256 * 4 * 4) / 3));
    gl.deleteTexture(a as WebGLTexture);
    expect(L.total).toBe(Math.round((256 * 256 * 4 * 4) / 3));
    gl.deleteTexture(b as WebGLTexture);
    expect(L.total).toBe(0);
  });

  it("counts storage's levels, a cube's six faces, an image source and render buffers", () => {
    const gl = fakeGL(), L = new GpuLedger(gl), t = {}, c = {}, rb = {};
    gl.bindTexture(GL.TEXTURE_2D, t as WebGLTexture);
    gl.texStorage2D(GL.TEXTURE_2D, 3, GL.RGBA8, 64, 32);
    expect(L.total).toBe((64 * 32 + 32 * 16 + 16 * 8) * 4);
    gl.bindTexture(GL.CUBE, c as WebGLTexture);
    for (let f = 0; f < 6; f++) gl.texImage2D(GL.CUBE_X + f, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, { width: 16, height: 16 } as unknown as ImageData);
    expect(L.total).toBe((64 * 32 + 32 * 16 + 16 * 8) * 4 + 6 * 16 * 16 * 4);
    gl.bindRenderbuffer(GL.RENDERBUFFER, rb as WebGLRenderbuffer);
    gl.renderbufferStorageMultisample(GL.RENDERBUFFER, 4, GL.DEPTH24_STENCIL8, 100, 50);
    const before = L.total;
    gl.deleteRenderbuffer(rb as WebGLRenderbuffer);
    expect(before - L.total).toBe(100 * 50 * 4 * 4);
  });

  it("reports by kind: labelled textures, drawn-into ones as targets, the rest other, the canvas apart", () => {
    const gl = fakeGL(), L = new GpuLedger(gl, () => 1000), map = new Map<object, object>(), r = fakeRenderer(map);
    const tree = gpuKind(new THREE.Texture(), "trees"), ground = gpuKind(new THREE.Texture(), "ground"), plain = new THREE.Texture(), target = new THREE.Texture();
    const up = (t: THREE.Texture, w: number, h: number, internal: number) => { const g = {}; map.set(t, g); gl.bindTexture(GL.TEXTURE_2D, g as WebGLTexture); gl.texImage2D(GL.TEXTURE_2D, 0, internal, w, h, 0, GL.RGBA, GL.UNSIGNED_BYTE, null); return g; };
    up(tree, 512, 512, GL.RGBA8); up(ground, 256, 256, GL.R8); up(plain, 10, 10, GL.RGBA8);
    gl.framebufferTexture2D(GL.FRAMEBUFFER, GL.COLOR0, GL.TEXTURE_2D, up(target, 64, 64, GL.RGBA8) as WebGLTexture, 0);
    const rep = L.report(r);
    expect(rep.byKind.trees).toBe(512 * 512 * 4);
    expect(rep.byKind.ground).toBe(256 * 256);
    expect(rep.byKind.other).toBe(400);
    expect(rep.byKind.targets).toBe(64 * 64 * 4);
    expect(rep.byKind.canvas).toBe(1000);
    expect(rep.total).toBe(512 * 512 * 4 + 256 * 256 + 400 + 64 * 64 * 4 + 1000);
    expect(L.bytesOf(r, tree)).toBe(512 * 512 * 4);
    tree.dispose(); // (its label let go with it)
    expect(L.report(r).byKind.trees ?? 0).toBe(0);
  });

  it("reads GL's out-of-memory error, and forgets everything when the context is lost", () => {
    const gl = fakeGL(), L = new GpuLedger(gl), t = {};
    expect(L.check()).toBe(false);
    gl.errors.push(0x0500, 0x0505);
    expect(L.check()).toBe(true);
    expect(L.ooms).toBe(1);
    gl.bindTexture(GL.TEXTURE_2D, t as WebGLTexture);
    gl.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA8, 8, 8, 0, GL.RGBA, GL.UNSIGNED_BYTE, null);
    L.reset();
    expect(L.total).toBe(0);
  });
});

describe("the GPU budget", () => {
  const T = { mb: 1024, refWidth: 1920, refHeight: 1080, floor: 512, ceil: 2048 };
  it("goes with the window's pixels, between its floor and ceiling", () => {
    expect(gpuBudgetMB(T, 1920 * 1080)).toBe(1024);
    expect(gpuBudgetMB(T, 1900 * 1240)).toBeCloseTo((1024 * 1900 * 1240) / (1920 * 1080), 6);
    expect(gpuBudgetMB(T, 800 * 600)).toBe(512);
    expect(gpuBudgetMB(T, 4000 * 2152)).toBe(2048);
  });
});
