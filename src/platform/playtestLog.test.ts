import { afterEach, beforeAll, beforeEach, expect, it, vi } from "vitest";
import type { Game } from "../rules/game";

afterEach(() => { vi.unstubAllGlobals(); vi.resetModules(); });
// Reproduce CI's isolate:false order: another test can import the log before this
// fixture creates its window. The first test must not depend on being first in a worker.
beforeAll(async () => { await import("./playtestLog"); });
// Each fake browser needs a fresh module evaluation AFTER its window is installed.
// afterEach alone misses the first file run in a shared worker with a cached import.
beforeEach(() => { vi.resetModules(); });

it("keeps the latest 20 errors with their original night context and leaves browser reporting alone", async () => {
  const target = new EventTarget(), stored = new Map<string, string>();
  vi.stubGlobal("window", target);
  vi.stubGlobal("localStorage", { getItem: (k: string) => stored.get(k), setItem: (k: string, v: string) => stored.set(k, v) });
  const { PlaytestLog, logCaughtError } = await import("./playtestLog");
  const game = (island: string, time: number) => ({ seed: time, clock: { time }, tuning: { leyLines: { pulseSpeed: 1 }, map: { island } } }) as Game;
  const first = new PlaytestLog(game("fox", 12), "build-a");
  first.stalls = () => { throw Error("broken diagnostic"); };
  for (let i = 0; i < 21; i++) logCaughtError(new Error(`caught-${i}`), "fixture");
  let run = JSON.parse(stored.get("witch.playtest")!)[0];
  expect(run.errors).toHaveLength(20);
  expect(run.errors[0].message).toBe("caught-1");
  expect(run.errors[19]).toMatchObject({ kind: "caught", message: "caught-20", build: "build-a", t: 12, island: "fox", where: "fixture" });
  expect(run.errors[19].stack).toContain("playtestLog.test.ts");
  expect(run.errors[19].trail.at(-1)).toMatchObject({ kind: "error", build: "build-a", t: 12, island: "fox", message: "caught-20" });
  new PlaytestLog(game("bear", 3), "build-b");
  const rejection = Object.assign(new Event("unhandledrejection", { cancelable: true }), { reason: "rejected string" });
  expect(target.dispatchEvent(rejection)).toBe(true);
  const failure = Object.assign(new Event("error", { cancelable: true }), { error: new Error("global crash"), filename: "bundle.js", lineno: 7, colno: 2 });
  expect(target.dispatchEvent(failure)).toBe(true);
  run = JSON.parse(stored.get("witch.playtest")!).at(-1);
  expect(run.errors).toHaveLength(20);
  expect(run.errors.at(-2)).toMatchObject({ kind: "unhandledrejection", message: "rejected string", build: "build-b", t: 3, island: "bear" });
  expect(run.errors.at(-1)).toMatchObject({ kind: "error", message: "global crash", where: "bundle.js:7:2" });
  expect(run.errors[0].build).toBe("build-a");
});

it("does not turn blocked storage or an unprintable rejection into another crash", async () => {
  vi.stubGlobal("window", new EventTarget());
  vi.stubGlobal("localStorage", { getItem: () => { throw Error("blocked"); }, setItem: () => { throw Error("blocked"); } });
  const { PlaytestLog, logCaughtError } = await import("./playtestLog");
  new PlaytestLog({ seed: 1, clock: { time: 0 }, tuning: { leyLines: { pulseSpeed: 1 } } } as Game, "dev");
  expect(() => logCaughtError({ toJSON() { throw Error("bad"); } }, "fixture")).not.toThrow();
});
it("starts a new page with its own ring and records errors before the first night with unknown context", async () => {
  const target = new EventTarget(), stored = new Map<string, string>();
  vi.stubGlobal("window", target);
  vi.stubGlobal("localStorage", { getItem: (k: string) => stored.get(k), setItem: (k: string, v: string) => stored.set(k, v) });
  const { PlaytestLog } = await import("./playtestLog");
  target.dispatchEvent(Object.assign(new Event("unhandledrejection"), { reason: "before the night" }));
  new PlaytestLog({ seed: 2, clock: { time: 7 }, tuning: { leyLines: { pulseSpeed: 1 }, map: { island: "deer" } } } as Game, "new-page");
  target.dispatchEvent(Object.assign(new Event("error"), { error: Error("new page error"), filename: "new.js", lineno: 1, colno: 2 }));
  const errors = JSON.parse(stored.get("witch.playtest")!)[0].errors;
  expect(errors).toHaveLength(2);
  expect(errors[0]).toMatchObject({ kind: "unhandledrejection", message: "before the night", t: null, island: "unknown" });
  expect(errors[1]).toMatchObject({ kind: "error", message: "new page error", build: "new-page", t: 7, island: "deer" });
});
it("includes saved comments and their bundles in a readable text download", async () => {
  const { readablePlaytest } = await import("./playtestLog");
  const run = { seed: 1, build: "fixture", started: "2026-10-30", interval: 1, samples: [], comments: [{ text: "stuck", night: { fixtureState: 42 } }], journal: { text: "WARN fixture fox game=1 warning", dropped: { debug: 2 }, persistent: true } };
  const text = readablePlaytest([run]);
  expect(text).toContain("WITCH PLAYTEST — fixture — seed 1"); expect(text).toContain("WARN fixture fox");
  expect(text).toContain('"text": "stuck"'); expect(text).toContain('"fixtureState": 42');
  expect(text).toContain('"debug": 2');
});

it("downloads every written report when the full diagnostics envelope cannot be encoded", async () => {
  const { packPlaytestDownload } = await import("./playtestLog");
  const { unpackLog } = await import("./logCodec");
  const reports = [{ id: "first", text: "hat marker", context: { params: "seed=1" }, omission: "Saved moment omitted" }, { id: "second", text: "suggestion" }];
  // Deep diagnostic payload hits the real codec guard without a 128 MiB test allocation.
  let diagnostic: unknown = {};
  for (let i = 0; i < 70; i++) diagnostic = { child: diagnostic };
  const packed = await packPlaytestDownload([{ seed: 1, build: "fixture", started: "2026-10-31", interval: 1, samples: [], diagnostic } as import("./playtestLog").PlaytestRun], async () => reports);
  const decoded = await unpackLog(packed) as { comments: unknown[]; exportOmissions: string[] }[];
  expect(decoded[0].comments).toEqual(reports);
  expect(decoded[0].exportOmissions[0]).toContain("Log nesting exceeds its limit");
  expect(decoded[0].exportOmissions[1]).toContain("Reports-only download");
});
