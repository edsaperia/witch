import { describe, expect, it } from "vitest";
import { nightHasStarted, NightAutosave, savedNight, savesEnabled, type NightStore, type SavedNight } from "./nightSave";
import { newGame, stepGame, STEP } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { wakeInBedroom } from "../rules/opening";
import { startWake, WAKE_DEFAULT } from "../rules/wakeUp";

const saved = (): SavedNight => ({ version: 1, build: "test", at: 123, params: "seed=123&island=wolf&world=42", look: null, loan: null,
  flags: { chartRecorded: false, overRecorded: false }, settingsBase: { voices: {}, shake: 1, legendFlash: 1 }, game: { version: 1, seed: 123, tuning: {} as never, state: { root: null, nodes: [] } } });
it("treats a build-counter jump as the same exact-build boundary as any update", () => {
  const old = { ...saved(), build: "v5955 · old" };
  expect(savedNight(old, "v5955 · old", new URLSearchParams())).toBe(old);
  expect(savedNight(old, "v6322 · new", new URLSearchParams())).toBeNull();
  const next = { ...old, build: "v6322 · new" };
  expect(savedNight(next, "v6322 · new", new URLSearchParams())).toBe(next);
});
const memory = () => {
  let value: unknown;
  const store: NightStore = { read: async () => value, write: async n => { value = n; }, clear: async () => { value = undefined; } };
  return store;
};

describe("resumable night storage", () => {
  it("doesn't offer a new night until she gets out of bed, even with the loading card hidden", async () => {
    const tuning = structuredClone(TUNING); tuning.map!.islandAreas = 10;
    const game = newGame(123, tuning), store = memory();
    expect(wakeInBedroom(game)).toBe(true);
    expect(startWake(game, game.herTime, {})).toBe(true);
    game.clock.paused = false;
    const a = new NightAutosave(store, () => nightHasStarted(game, true) ? saved() : null, () => {});
    const idle = { moveX: 0, moveZ: 0, zoom: 0, toggleMode: false };
    for (let i = 0; i < Math.ceil(6 / STEP); i++) stepGame(game, idle, STEP);
    expect(game.wake!.beat).toBe("alarm");
    expect(await a.save(6000, true)).toBe(false);
    expect(await store.read()).toBeUndefined();
    stepGame(game, { ...idle, moveX: 1 }, STEP);
    expect(game.wake!.beat).toBe("stretch");
    expect(await a.save(6001, true)).toBe(false);
    for (let i = 0; i < Math.ceil((WAKE_DEFAULT.stretch + 0.1) / STEP); i++) stepGame(game, idle, STEP);
    expect(game.wake!.open).toBe(true);
    expect(await a.save(10000, true)).toBe(true);
    expect(await store.read()).toBeDefined();
    expect(nightHasStarted({}, false)).toBe(false); // the old start card still gates its night
    expect(nightHasStarted({}, true)).toBe(true); // the old opening has no wake-up
    await a.clear(); expect(await store.read()).toBeUndefined();
  });
  it("keeps build and explicit night identity; a plain game link can resume a later island", () => {
    const n = saved();
    expect(savedNight(n, "test", new URLSearchParams())).toBe(n);
    expect(savedNight(n, "test", new URLSearchParams(n.params))).toBe(n);
    for (const p of ["seed=124", "island=home", "world=43"]) expect(savedNight(n, "test", new URLSearchParams(p))).toBeNull();
    expect(savedNight(n, "new-build", new URLSearchParams())).toBeNull();
    for (const bad of [null, {}, { ...n, version: 2 }, { ...n, at: NaN }, { ...n, flags: {} }, { ...n, loan: { id: "x" } }]) expect(savedNight(bad, "test", new URLSearchParams())).toBeNull();
  });

  it("leaves bots, debug links and automation isolated unless resume is explicitly enabled", () => {
    expect(savesEnabled(new URLSearchParams())).toBe(true);
    for (const p of ["bot=skilled", "creator=0", "shot=room:bedroom", "zoo=1", "arena=wolf", "set=x", "debug=sail", "resume=0"]) expect(savesEnabled(new URLSearchParams(p))).toBe(false);
    expect(savesEnabled(new URLSearchParams(), true)).toBe(false);
    expect(savesEnabled(new URLSearchParams("creator=0&resume=1"), true)).toBe(true);
  });

  it("throttles periodic saves, forces a final checkpoint, and clears an ended night", async () => {
    const store = memory(), n = saved(), errors: unknown[] = [], a = new NightAutosave(store, () => n, e => errors.push(e));
    expect(await a.save(0)).toBe(true);
    expect(await a.save(4999)).toBe(false);
    expect(await a.save(4999, true)).toBe(true);
    expect(await store.read()).toBe(n);
    await a.clear(); expect(await store.read()).toBeUndefined(); expect(errors).toEqual([]);
  });

  it("doesn't overlap writes and reports a failed write without throwing into play", async () => {
    let release!: () => void, calls = 0;
    const store = memory(); store.write = () => { calls++; return new Promise<void>(r => { release = r; }); };
    const a = new NightAutosave(store, saved, () => {}), pending = a.save(0);
    expect(await a.save(6000, true)).toBe(false); expect(calls).toBe(1); release(); expect(await pending).toBe(true);
    const errors: unknown[] = []; store.write = async () => { throw new Error("quota"); };
    const b = new NightAutosave(store, saved, e => errors.push(e));
    expect(await b.save(0)).toBe(false); expect(errors).toHaveLength(1);
  });

  it("doesn't create a checkpoint while no playable night is active", async () => {
    const store = memory(), a = new NightAutosave(store, () => null, () => {});
    expect(await a.save(0)).toBe(false); expect(await store.read()).toBeUndefined();
  });
});
