// ?timing=1 (app/timing.ts): the chart page's steps carried across the sail's reload and merged with the new page's.
import { afterEach, describe, expect, it } from "vitest";
import { carryTiming, clearCarried, mark, sinceSail, timingOn, transitionTiming } from "./timing";

const memory = () => { const m = new Map<string, string>(); return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), removeItem: (k: string) => void m.delete(k) }; };
const G = globalThis as unknown as { sessionStorage?: unknown };

describe("?timing=1, the transition's steps in the L log", () => {
  afterEach(() => { delete G.sessionStorage; performance.clearMarks(); });
  it("is kept for the tab once asked for, and stopped by ?timing=0", () => {
    G.sessionStorage = memory();
    expect(timingOn(new URLSearchParams(""))).toBe(false);
    expect(timingOn(new URLSearchParams("timing=1"))).toBe(true);
    expect(timingOn(new URLSearchParams("island=fox&arrive=1"))).toBe(true); // (the sail's new page: no ?timing, still on)
    expect(timingOn(new URLSearchParams("timing=0"))).toBe(false);
  });
  it("carries the chart page's steps to the next page and gives each step its own time, in order", () => {
    G.sessionStorage = memory();
    timingOn(new URLSearchParams("timing=1"));
    mark("chart:open"); mark("chart:go");
    carryTiming();
    performance.clearMarks(); // (the new page: its own marks)
    mark("witch:main"); mark("game:arrived");
    const t = transitionTiming();
    expect(t.steps.map(s => s.name)).toEqual(["chart:open", "chart:go", "witch:main", "game:arrived"]);
    expect(t.steps[0]).toMatchObject({ at: 0, ms: 0, page: 0 });
    expect(t.steps[2].page).toBe(1);
    for (let i = 1; i < t.steps.length; i++) expect(t.steps[i].ms).toBe(t.steps[i].at - t.steps[i - 1].at);
    clearCarried();
    expect(transitionTiming().steps.map(s => s.name)).toEqual(["witch:main", "game:arrived"]);
  });
  it("carries nothing without it, and copes with no storage", () => {
    G.sessionStorage = memory();
    mark("chart:go"); carryTiming();
    performance.clearMarks();
    expect(transitionTiming().steps).toEqual([]);
    delete G.sessionStorage;
    expect(timingOn(new URLSearchParams("timing=1"))).toBe(false);
  });
  it("keeps the last sail's steps alone, timed from it (every log: Ed's v4821 sail)", () => {
    const t = { steps: [{ name: "game:arrived", at: 0, page: 1, ms: 0 }, { name: "chart:sail", at: 100, page: 1, ms: 100 }, { name: "witch:prep", at: 150, page: 1, ms: 50 }, { name: "chart:sail", at: 1000, page: 1, ms: 850 }, { name: "game:arrived", at: 1400, page: 1, ms: 400 }], longTasks: [{ at: 120, ms: 60 }, { at: 1100, ms: 80 }] };
    const s = sinceSail(t);
    expect(s.steps.map(x => [x.name, x.at, x.ms])).toEqual([["chart:sail", 0, 0], ["game:arrived", 400, 400]]);
    expect(s.longTasks).toEqual([{ at: 100, ms: 80 }]);
    const none = { steps: [{ name: "witch:main", at: 0, page: 1, ms: 0 }], longTasks: [] };
    expect(sinceSail(none)).toBe(none);
  });
});
