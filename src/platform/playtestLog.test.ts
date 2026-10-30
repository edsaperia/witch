import { afterEach, expect, it, vi } from "vitest";
import type { Game } from "../rules/game";

afterEach(() => { vi.unstubAllGlobals(); vi.resetModules(); });

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
