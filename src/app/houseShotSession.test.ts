import { afterEach, expect, it, vi } from "vitest";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
const { installClock, step, capture } = createRequire(import.meta.url)("../../tools/house/shot-session.cjs");
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
