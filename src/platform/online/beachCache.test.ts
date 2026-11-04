import { expect, it } from "vitest";
import { newGame, STEP, type Controls } from "../../rules/game";
import { beachOf } from "../../rules/mapShape";
import { musicMix } from "../../rules/music";
import { TUNING } from "../../rules/tuning";
import { visitPreferences } from "../../app/visitPreferences";
import { replayGuest, replayHostStep, replayStart } from "./replay";

it("builds one guest beach across replay steps and personal music reads", () => {
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const host = newGame(123, tuning, 2);
  host.clock.paused = false; host.witches.forEach(w => { w.paused = false; });
  const guest = replayGuest(JSON.parse(JSON.stringify(replayStart(host, "beach-cache", 0))), "beach-cache");
  const personal = visitPreferences(() => {}).tuning(guest.game);
  expect(personal.beach).not.toBe(guest.game.tuning.beach);
  const presented = { ...guest.game, tuning: personal };
  const beach = beachOf(guest.game.map.bounds, guest.game.tuning);
  expect(beach).not.toBeNull();
  const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
  for (let tick = 1; tick <= 21; tick++) {
    expect(guest.apply(replayHostStep(host, [idle, idle], STEP, tick))).toBe(true);
    musicMix(presented, guest.game.witches[1].body);
    // The single cache entry must survive both actual callers: each rebuild produces a new Beach.
    expect(beachOf(guest.game.map.bounds, personal) === beach).toBe(true);
    expect(beachOf(guest.game.map.bounds, guest.game.tuning) === beach).toBe(true);
  }
});

it("invalidates changed beach values in place and a changed seed", () => {
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const game = newGame(123, tuning), bounds = game.map.bounds;
  let previous = beachOf(bounds, tuning);
  const changed = () => {
    const next = beachOf(bounds, tuning); expect(next).not.toBe(previous);
    expect(beachOf(bounds, structuredClone(tuning))).toBe(next); previous = next;
  };
  tuning.beach!.width++; changed(); tuning.beach!.shore++; changed();
  for (const key of ["amp", "harmonics", "rocky", "rockyWidth", "min"] as const) {
    tuning.beach!.vary![key] += .1; changed();
  }
  tuning.beach!.vary = undefined; changed();
  expect(beachOf({ ...bounds, seed: (bounds.seed ?? 0) + 1 }, tuning)).not.toBe(previous);
  tuning.beach!.on = false; expect(beachOf(bounds, tuning)).toBeNull();
});
