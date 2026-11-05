// A sail's island made while the chart flies down to the water (render/view.ts prepare's `dive`; Ed, 2026-11-03: "The zoom into
// the sea chart can be quite a few seconds long, the idea is to build the island during this time"): the house, the forest round
// it and the legends' carvings (buildHome) start with the shaders' linking, not after it (his v7295 sail: begun only after the
// hand-off, 14.5 s of the dive for 0.6 s of work). And (Ed, 2026-11-03: "zoom in over the map, switch to the island's sea, fly over
// the island, and show whatever is built, with mist over it if it's not built") the chart doesn't wait for any of it: main.ts
// makeSailNight hands over once the night is made, the shaders linking under the dive (compileAll's `underDive`).
// (Headless: the View a stand-in round its own prepare, its compile and its house's build stand-ins that log.)
import { afterEach, expect, it, vi } from "vitest";
import { View } from "./view";
import { newGame as fullGame } from "../rules/game";
import { smallWorld } from "../test/worlds";
import { TUNING } from "../rules/tuning";
const newGame = smallWorld(fullGame, "Only the order of the sail's preparation matters.");

afterEach(() => { vi.restoreAllMocks(); });

it("a sail's dive: the house and forest are built while the shaders link, all of it under the dive", async () => {
  const log: string[] = [];
  let linked!: () => void;
  const v: View = Object.assign(Object.create(View.prototype) as object, {
    game: newGame(456, TUNING), shaderDrawStatus: { active: false, skipped: {}, fallback: {} }, shaderChartLanding: true, shaderEpoch: 0, shaderLandingLimited: false,
    assets: { tonight: () => {}, whenAsked: () => { log.push("the rest of the island's art asked"); return new Promise<void>(() => {}); } },
    island: { ground: { fill: () => 0, coastAhead: () => log.push("coast program made") } },
  }) as unknown as View;
  const V = v as unknown as Record<string, unknown>;
  V.makeLoadingMist = () => {};
  V.askIsland = () => log.push("island art asked");
  V.compileAll = (_partial: boolean, underDive: boolean) => { log.push(`shaders linking${underDive ? " under the dive" : ""}`); (V.shaderEpoch as number)++; return new Promise<void>(res => { linked = () => { log.push("shaders linked"); res(); }; }); };
  V.buildHome = (epoch: number) => { log.push(`house and forest building (epoch ${epoch === V.shaderEpoch ? "current" : "stale"})`); return new Promise<void>(() => {}); };
  const prepared = v.prepare({ sail: true, dive: () => 0, track: [], underDive: true }); // (main.ts makeSailNight: not waited for)
  await Promise.resolve(); await Promise.resolve();
  // (the coast's program made with the rest, and the island's own art asked too, not waited for: Ed, 2026-11-05)
  expect(log).toEqual(["coast program made", "island art asked", "the rest of the island's art asked", "shaders linking under the dive", "house and forest building (epoch current)"]); // (before the shaders are linked)
  expect(v.homeDone).toBe(false);
  let done = false; void prepared.then(() => { done = true; });
  await Promise.resolve();
  expect(done).toBe(false); // (compileAll's own: under the dive it returns at once, linking on in the background, no deadline)
  linked();
  await prepared;
  expect(log.at(-1)).toBe("shaders linked");
  expect(v.homeDone).toBe(false); // (whatever's left goes on through the dive, under the loading mist)
});
