import { afterEach, expect, it, vi } from "vitest";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
const { installClock, step, capture } = createRequire(import.meta.url)("../../tools/house/shot-session.cjs");
const { installDrawCensus } = createRequire(import.meta.url)("../../tools/house/draw-census.cjs");
afterEach(() => vi.unstubAllGlobals());

it("holds visual time without freezing the diagnostic clock", () => {
  let time = 10;
  const context = { window: {} as { __houseShotClock?: (t: number | null) => void; __houseShotRealNow?: () => number }, performance: { now: () => time } };
  runInNewContext(`(${installClock.toString()})();`, context);
  context.window.__houseShotClock!(1000); time = 20;
  expect(context.performance.now()).toBe(1000);
  expect(context.window.__houseShotRealNow!()).toBe(20);
  context.window.__houseShotClock!(null);
  expect(context.performance.now()).toBe(20);
});

it("completes every full draw before the next frame and retains controls/dt", async () => {
  const calls: unknown[] = [], gl = { isContextLost: () => false, finish: () => calls.push("finish") };
  vi.stubGlobal("window", { __houseShotClock: () => {}, __houseShotRealNow: () => 0,
    witch: { frame: (c: unknown, dt: number) => calls.push([c, dt]), view: { renderer: { getContext: () => gl }, assets: { whenIdle: async () => calls.push("idle") } } } });
  const page = { evaluate: async (fn: (arg?: unknown) => unknown, arg?: unknown) => fn(arg) };
  await step(page, { zoom: 1 }, 2);
  expect(calls).toEqual([
    [{ moveX: 0, moveZ: 0, toggleMode: false, zoom: 1 }, 1 / 60], "finish", "idle",
    [{ moveX: 0, moveZ: 0, toggleMode: false, zoom: 1 }, 1 / 60], "finish", "idle",
  ]);
});

it("rejects drifting held captures instead of accepting a pixel comparison", async () => {
  const screenshot = vi.fn().mockResolvedValueOnce(Buffer.from("a")).mockResolvedValueOnce(Buffer.from("b"));
  await expect(capture({ screenshot }, { timeout: 300000 })).rejects.toThrow("parity precondition failed");
  expect(screenshot).toHaveBeenCalledTimes(2);
});

it("distinguishes real submitted geometry from zero-call visits and reconciles totals", () => {
  const render = { calls: 0, triangles: 0, lines: 0, points: 0 };
  const original = vi.fn((_camera, _scene, _geometry, _material, object) => { if (object.count) { render.calls++; render.triangles += 2; } });
  const renderer = { info: { render }, renderBufferDirect: original, getRenderTarget: () => null };
  const state = { witch: { view: { renderer, budget: { radius: 100 }, sceneryFixed: null, stats: { sceneryRadius: 100 } } }, __houseDrawCensus: undefined as undefined | (() => { rows: { calls: number; triangles: number }[]; actual: number }) };
  vi.stubGlobal("window", state);
  installDrawCensus();
  const geometry = { attributes: { position: { count: 4 } }, index: { count: 6 }, drawRange: { start: 0, count: Infinity } };
  renderer.renderBufferDirect(null, null, geometry, { type: "MeshBasicMaterial", name: "" }, { type: "Mesh", name: "real", count: 1 });
  renderer.renderBufferDirect(null, null, geometry, { type: "MeshBasicMaterial", name: "" }, { type: "Mesh", name: "empty", count: 0 });
  const census = state.__houseDrawCensus!();
  expect(census.rows.map(r => [r.calls, r.triangles])).toEqual([[1, 2], [0, 0]]);
  expect(census.actual).toBe(1);
  expect(renderer.renderBufferDirect).toBe(original);
});
