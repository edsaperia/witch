import { afterEach, beforeEach, expect, it, vi } from "vitest";

let marks: { name: string; startTime: number }[];
let deliver: (entries: { startTime: number; duration: number }[]) => void;
let observed: number;
beforeEach(() => {
  vi.resetModules(); marks = []; observed = 0;
  const saved = new Map<string, string>();
  vi.stubGlobal("sessionStorage", { getItem: (k: string) => saved.get(k) ?? null, setItem: (k: string, v: string) => saved.set(k, v), removeItem: (k: string) => saved.delete(k) });
  vi.stubGlobal("performance", { timeOrigin: 10000, getEntriesByType: () => marks });
  vi.stubGlobal("PerformanceObserver", class {
    constructor(callback: (list: { getEntries(): { startTime: number; duration: number }[] }) => void) { deliver = entries => callback({ getEntries: () => entries }); }
    observe() { observed++; }
  });
});
afterEach(() => { vi.unstubAllGlobals(); });

it("records ordinary sail stalls and arrival holds without a timing link", async () => {
  const timing = await import("./timing");
  marks.push({ name: "witch:boot", startTime: 0 }, { name: "chart:sail", startTime: 100 }, { name: "sail:ready", startTime: 800 }, { name: "dive:eased", startTime: 900 }, { name: "dive:on", startTime: 1200 }, { name: "unrelated:mark", startTime: 1300 });
  timing.carryTiming(); timing.carryTiming();
  expect(observed).toBe(1);
  deliver([{ startTime: 150, duration: 640 }]);
  const result = timing.sinceSail(timing.transitionTiming());
  expect(result.steps.map(s => s.name)).toEqual(["chart:sail", "sail:ready", "dive:eased", "dive:on"]);
  expect(result.longTasks).toEqual([{ at: 50, ms: 640 }]);
});

it("bounds long-lived diagnostic memory and declares clipped history", async () => {
  const timing = await import("./timing");
  timing.carryTiming();
  deliver(Array.from({ length: 2100 }, (_, i) => ({ startTime: i, duration: 51 })));
  const result = timing.transitionTiming();
  expect(result.longTasks).toHaveLength(2048);
  expect(result.longTasks[0].at).toBe(10052);
  expect(result.longTasksLimited).toBe(true);
});

it("does not require long-task support in the browser", async () => {
  vi.stubGlobal("PerformanceObserver", undefined);
  const timing = await import("./timing");
  expect(() => timing.carryTiming()).not.toThrow();
  expect(timing.transitionTiming().longTasks).toEqual([]);
});
