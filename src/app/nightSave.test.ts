import { describe, expect, it } from "vitest";
import { captureNight, nightHasStarted, NightAutosave, savedNight, savesEnabled, type NightStore, type SavedNight } from "./nightSave";
import { applySettings, DEFAULTS } from "./playerSettings";
import { restoreGame, snapshotGame } from "../rules/nightSnapshot";
import { newGame as fullGame, stepGame, STEP } from "../rules/game";
import { smallWorld } from "../test/worlds";
const newGame = smallWorld(fullGame, "Autosave eligibility depends on leaving one bed, independent of distant areas or creature diversity.");
import { TUNING } from "../rules/tuning";
import { wakeInBedroom } from "../rules/opening";
import { startWake, WAKE_DEFAULT } from "../rules/wakeUp";

const saved = (): SavedNight => ({ version: 1, build: "test", at: 123, params: "seed=123&island=wolf&world=42", look: null, loan: null,
  flags: { chartRecorded: false, overRecorded: false }, settingsBase: { voices: {}, shake: 1, legendFlash: 1 }, game: { version: 1, seed: 123, tuning: {} as never, state: { root: null, nodes: [] } } });
it("accepts a build-counter jump under the cross-build save contract", () => {
  const old = { ...saved(), build: "v5955 · old" };
  expect(savedNight(old, "v5955 · old", new URLSearchParams())).toBe(old);
  expect(savedNight(old, "v6322 · new", new URLSearchParams())).toBe(old);
  const next = { ...old, build: "v6322 · new" };
  expect(savedNight(next, "v6322 · new", new URLSearchParams())).toBe(next);
});
const memory = () => {
  let value: unknown;
  const store: NightStore = { read: async () => value, write: async n => { value = n; }, clear: async () => { value = undefined; } };
  return store;
};

describe("resumable night storage", () => {
  it("restores an actual captured game across build numbers while rejecting unknown formats", () => {
    const tuning = structuredClone(TUNING); tuning.map!.islandAreas = 10;
    applySettings(DEFAULTS, tuning);
    // Capture needs the exact tuning object registered by applySettings; the small-world helper clones it.
    const game = fullGame(123, tuning); game.clock.paused = true;
    const n = captureNight(game, { build: "old build", params: "seed=123", look: null, loan: null, flags: { chartRecorded: false, overRecorded: false } });
    const accepted = savedNight(n, "new build", new URLSearchParams());
    expect(accepted).toBe(n);
    expect(snapshotGame(restoreGame(accepted!.game))).toEqual(n.game);
    expect(savedNight({ ...n, game: { ...n.game, version: 2 } }, "new build", new URLSearchParams())).toBeNull();
  });
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
  it("keeps format and explicit night identity across builds; a plain game link can resume a later island", () => {
    const n = saved();
    expect(savedNight(n, "test", new URLSearchParams())).toBe(n);
    expect(savedNight(n, "test", new URLSearchParams(n.params))).toBe(n);
    for (const p of ["seed=124", "island=home", "world=43", "layout=classic"]) expect(savedNight(n, "test", new URLSearchParams(p))).toBeNull();
    expect(savedNight(n, "test", new URLSearchParams("layout=ed"))).toBe(n); // Default and alias are one identity.
    const classic = { ...n, params: n.params + "&layout=classic" };
    expect(savedNight(classic, "test", new URLSearchParams("layout=classic"))).toBe(classic);
    expect(savedNight(classic, "test", new URLSearchParams("layout=ed"))).toBeNull();
    const ed = { ...n, params: n.params + "&layout=ed" };
    expect(savedNight(ed, "test", new URLSearchParams("layout=ed"))).toBe(ed);
    expect(savedNight(ed, "test", new URLSearchParams("layout=default"))).toBeNull();
    expect(savedNight(n, "new-build", new URLSearchParams())).toBe(n);
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
  it("flush waits for an active checkpoint then writes the latest state before a slot exit", async () => {
    let finish!: () => void, writes = 0;
    const store = memory();
    store.write = async () => { writes++; if (writes === 1) await new Promise<void>(r => { finish = r; }); };
    const a = new NightAutosave(store, saved, () => {});
    const active = a.save(0), flushed = a.flush(1);
    expect(writes).toBe(1); finish();
    expect(await active).toBe(true); expect(await flushed).toBe(true); expect(writes).toBe(2);
    const empty = new NightAutosave(memory(), () => null, () => {});
    expect(await empty.flush(0)).toBe(true);
  });
});
