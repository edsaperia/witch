import { afterEach, expect, it, vi } from "vitest";
import { setupKnobs, type KnobNight } from "./knobs";
import { TUNING } from "../rules/tuning";

afterEach(() => vi.unstubAllGlobals());
function fixture(enabled?: () => boolean) {
  let key!: (e: { code: string }) => void;
  const replaceState = vi.fn(), fight = vi.fn(), world = vi.fn();
  vi.stubGlobal("window", { addEventListener: (_: string, callback: typeof key) => { key = callback; } });
  vi.stubGlobal("location", { href: "https://example.test/witch/?seed=123" });
  vi.stubGlobal("history", { replaceState });
  const night = { tuning: structuredClone(TUNING), world: { areaSize: 1, treetopSpeed: 20, mapAreas: 1 }, playtest: { fight, world } } as unknown as KnobNight;
  const mutate = vi.fn((_label: string, action: () => void) => action());
  const live = setupKnobs(() => night, mutate, enabled);
  return { night, live, mutate, replaceState, key: (code: string) => key({ code }) };
}
it("keeps the default solo keyboard and live setters working", () => {
  const f = fixture(), before = f.night.tuning.fight.scale;
  f.key("BracketRight");
  expect(f.night.tuning.fight.scale).toBe(Math.round(Math.min(3, Math.max(.25, before * 1.1)) * 100) / 100);
  expect(f.replaceState).toHaveBeenCalledTimes(3);
  f.live.fightScale("2"); f.live.fightSpeed("1.5"); f.live.fightMomentum(".75"); f.live.treetopSpeed("40");
  expect(f.night.tuning.fight).toMatchObject({ scale: 2, speed: 1.5, momentum: .75 });
  expect(f.night.world.treetopSpeed).toBe(40);
});
it("blocks both keyboard and live mutations and URL writes while disabled, then resumes", () => {
  let enabled = false;
  const f = fixture(() => enabled), before = structuredClone(f.night.tuning), beforeWorld = { ...f.night.world };
  for (const code of ["BracketLeft", "BracketRight", "Semicolon", "Quote", "Comma", "Period"]) f.key(code);
  for (const set of Object.values(f.live)) set("2");
  expect(f.night.tuning).toEqual(before); expect(f.night.world).toEqual(beforeWorld);
  expect(f.mutate).not.toHaveBeenCalled(); expect(f.replaceState).not.toHaveBeenCalled();
  enabled = true; f.live.fightScale("2"); expect(f.night.tuning.fight.scale).toBe(2);
});
