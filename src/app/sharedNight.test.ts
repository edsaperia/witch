import { expect, it } from "vitest";
import { newGame } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { startWakeFor, wakeOf } from "../rules/wakeUp";
import { continueSharedNight } from "./sharedNight";

it.each([false, true])("starts fresh rules with both witches at their last beds (shared=%s)", shared => {
  const t = structuredClone(TUNING); t.map!.island = "home"; t.map!.islandAreas = 4;
  const previous = newGame(123, t, 2), next = newGame(456, structuredClone(t));
  startWakeFor(previous, 0, { yesterday: true }, previous.witches[1], { player: 1, room: "bedroom2" });
  previous.witches.forEach((w, i) => { w.house = { slept: true, lastBed: shared || i === 0 ? "bed" : "bedroom2Bed" }; w.spells.activeUntil = 9999; });
  const before = JSON.stringify(previous.witches);
  continueSharedNight(previous, next, { hats: new Set(), parts: new Set() });
  expect(next.seed).toBe(456); expect(next.map).not.toBe(previous.map); expect(next.creatures).not.toBe(previous.creatures);
  expect(next.witches).toHaveLength(2);
  for (const [i, w] of next.witches.entries()) {
    expect(wakeOf(next, w)).toMatchObject({ open: false, bed: shared || i === 0 ? "bed" : "bedroom2Bed" });
    expect(w.house?.slept).not.toBe(true); expect(w.spells.activeUntil).not.toBe(9999);
  }
  expect(wakeOf(next, next.witches[1])?.room).toBe("bedroom2");
  expect(Math.hypot(next.witches[0].body.x - next.witches[1].body.x, next.witches[0].body.z - next.witches[1].body.z)).toBeGreaterThan(.1);
  expect(JSON.stringify(previous.witches)).toBe(before);
});
