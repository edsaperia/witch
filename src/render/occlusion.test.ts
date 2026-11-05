// The 💌s' smoke veil (render/occlusion.ts) on a pretend WebGL2 context and renderer: its pass is drawn and read back only while a
// probe holds a key (the frame-sync hunt, 2026-11-04: the read waits on the GPU, and with no 💌 nor ring about its answer went to
// no one), one read at a time, and its answer still lands on the probe that asked.
import { afterEach, describe, expect, it, vi } from "vitest";
import * as THREE from "three";
import { OcclusionProbes } from "./occlusion";
import type { Smoke } from "./smoke";

class FakeGL2 { getQueryParameter() { return false; } deleteQuery() {} createQuery() { return null; } beginQuery() {} endQuery() {} }

function rig() {
  vi.stubGlobal("WebGL2RenderingContext", FakeGL2);
  const gl = new FakeGL2();
  const reads: { buf: Uint8Array; done: () => void }[] = [];
  const renderer = {
    getContext: () => gl, getRenderTarget: () => null, setRenderTarget: () => {}, render: vi.fn(),
    readRenderTargetPixelsAsync: vi.fn((_rt: unknown, _x: number, _y: number, _w: number, _h: number, buf: Uint8Array) => new Promise<void>(done => { reads.push({ buf, done }); })),
  } as unknown as THREE.WebGLRenderer & { render: ReturnType<typeof vi.fn>; readRenderTargetPixelsAsync: ReturnType<typeof vi.fn> };
  const fire = new Float32Array(8); fire.set([1, 0, 2, 1]);
  const smoke = {
    mesh: { visible: true },
    drawnFires: () => ({ a: fire, n: 1, stride: 4 }),
    uniforms: { uSmoke: { value: new THREE.Vector4() }, uSmoke2: { value: new THREE.Vector4() }, uPuffs: { value: 4 }, uSmoke3: { value: new THREE.Vector2(1, 0) } },
  } as unknown as Smoke;
  const camera = new THREE.PerspectiveCamera();
  const O = new OcclusionProbes(new THREE.Scene(), renderer, camera, smoke);
  O.veilRead = 'three'; // The retained diagnostic route keeps the prototype's async-read contract.
  return { O, renderer, reads };
}
const tick = () => new Promise(r => setTimeout(r, 0));

describe("the smoke's veil over the 💌s", () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it("isn't drawn nor read back while no probe has a key", () => {
    const { O, renderer } = rig();
    for (let f = 0; f < 120; f++) { O.update(f / 60); O.veil(); }
    expect(renderer.render).not.toHaveBeenCalled();
    expect(renderer.readRenderTargetPixelsAsync).not.toHaveBeenCalled();
    expect(O.veilReads).toBe(0);
  });

  it("is read once a probe asks, one read at a time, and its answer lands on that probe", async () => {
    const { O, renderer, reads } = rig();
    O.update(0); O.probe("letter", 1, 1, 2, 1); O.veil();
    expect(renderer.readRenderTargetPixelsAsync).toHaveBeenCalledTimes(1);
    O.update(1 / 60); O.probe("letter", 1, 1, 2, 1); O.veil();
    expect(renderer.readRenderTargetPixelsAsync).toHaveBeenCalledTimes(1); // (the first not back yet: none piled up)
    reads[0].buf[0] = 255; reads[0].done(); await tick();
    expect(O.shown("letter")).toBeCloseTo(1 - 0.4, 6); // (eased in: 0.4 of the way, as before)
    O.update(2 / 60); O.probe("letter", 1, 1, 2, 1); O.veil();
    expect(renderer.readRenderTargetPixelsAsync).toHaveBeenCalledTimes(2);
    expect(O.veilReads).toBe(2);
  });

  it("stops reading once every probe has been let go", async () => {
    const { O, renderer, reads } = rig();
    O.update(0); O.probe("letter", 1, 1, 2, 1); O.veil();
    reads[0].done(); await tick();
    for (let f = 1; f < 200; f++) { O.update(f / 60); O.veil(); if (reads.length > 1) { reads.at(-1)!.done(); await tick(); } }
    const n = renderer.readRenderTargetPixelsAsync.mock.calls.length;
    for (let f = 200; f < 260; f++) { O.update(f / 60); O.veil(); }
    expect(renderer.readRenderTargetPixelsAsync.mock.calls.length).toBe(n); // (forgotten after FORGET seconds unasked: no more reads)
  });
});
