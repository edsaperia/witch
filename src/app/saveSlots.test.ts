import { describe, expect, it } from "vitest";
import { BORROWED_GAME_KEYS, SaveSlots, SLOT_INDEX, SLOT_KEYS, slotKey, switchSave } from "./saveSlots";
import { fallbackStorage } from "./storageFallback";
import { Bindings } from "../platform/bindings";
const memory = () => { const data = new Map<string, string>(); return { data, getItem: (k: string) => data.get(k) ?? null, setItem: (k: string, v: string) => { data.set(k, v); }, removeItem: (k: string) => { data.delete(k); } }; };
describe("save slots", () => {
  it("keeps borrowed progress transient and slot bytes unchanged while personal volume still saves", async () => {
    const store = memory(), saves = new SaveSlots(store, () => {}, () => 123), own = saves.storage(), other = saves.create();
    const gameKeys = BORROWED_GAME_KEYS.filter(key => key !== SLOT_INDEX);
    for (const key of gameKeys) own.setItem(key, `own ${key} 🧙`);
    own.setItem("witch.player", '{"music":0.5}'); saves.summary("home");
    const before = new Map(store.data), release = saves.beginBorrowedVisit(), fallback = fallbackStorage(own);
    for (const [i, key] of gameKeys.entries()) {
      fallback.setItem(key, `borrowed ${key}`); expect(own.getItem(key)).toBe(`borrowed ${key}`);
      if (i % 2) own.removeItem(key);
    }
    own.setItem("witch.player", '{"music":0.2}'); own.setItem("witch.bindings", '{"game.use":{"keys":["KeyQ"]}}');
    saves.summary("host island", true); saves.touch(); expect(saves.select(other.id)).toBe(false);
    const count = saves.list().length, flush = () => { throw new Error("Do not flush a borrowed world for slot switching"); };
    expect(await switchSave(saves, flush, () => { throw new Error("Do not reload"); }, null)).toContain("Finish visiting");
    expect(() => saves.create()).toThrow("Finish visiting"); expect(saves.list()).toHaveLength(count);
    expect(store.getItem(SLOT_INDEX)).toBe(before.get(SLOT_INDEX));
    for (const key of gameKeys) expect(store.getItem(SLOT_KEYS.includes(key as typeof SLOT_KEYS[number]) ? slotKey("s1", key) : key)).toBe(before.get(SLOT_KEYS.includes(key as typeof SLOT_KEYS[number]) ? slotKey("s1", key) : key));
    release(); release(); expect(saves.visiting).toBe(false);
    for (const key of gameKeys) expect(fallback.getItem(key)).toBe(`own ${key} 🧙`);
    expect(new SaveSlots(store).storage().getItem("witch.player")).toBe('{"music":0.2}');
    expect(new SaveSlots(store).storage().getItem("witch.bindings")).toContain("KeyQ");
    own.setItem("witch.owned", "own fresh progress"); expect(new SaveSlots(store).storage().getItem("witch.owned")).toBe("own fresh progress");
  });
  it("preserves all legacy progress/settings bytes in the first slot and never deletes originals", () => {
    const store = memory();
    for (const key of SLOT_KEYS) store.setItem(key, `original ${key} 🧙`);
    const saves = new SaveSlots(store);
    expect(saves.active()).toBe("s1");
    for (const key of SLOT_KEYS) { expect(saves.storage().getItem(key)).toBe(`original ${key} 🧙`); expect(store.getItem(key)).toBe(`original ${key} 🧙`); }
    expect(saves.nightKey("/witch/")).toBe("/witch/");
    saves.storage().setItem("witch.hats", "changed");
    expect(new SaveSlots(store).storage().getItem("witch.hats")).toBe("changed");
  });
  it("isolates new slots, persists last-used selection, and keeps night paths separate", () => {
    const store = memory(), saves = new SaveSlots(store);
    saves.storage().setItem("witch.chart", "world one");
    const other = saves.create(); expect(saves.select(other.id)).toBe(true);
    expect(saves.storage().getItem("witch.chart")).toBeNull();
    saves.storage().setItem("witch.chart", "world two");
    const reopened = new SaveSlots(store);
    expect(reopened.active()).toBe(other.id); expect(reopened.storage().getItem("witch.chart")).toBe("world two");
    expect(reopened.nightKey("/witch/")).toBe(`/witch/#save=${other.id}`);
    expect(reopened.storage("s1").getItem("witch.chart")).toBe("world one");
    reopened.storage(other.id).removeItem("witch.chart");
    expect(reopened.storage(other.id).getItem("witch.chart")).toBeNull();
    expect(reopened.storage("s1").getItem("witch.chart")).toBe("world one");
    expect(reopened.select("unknown")).toBe(false);
  });
  it("a corrupt slot's bytes cannot block another slot", () => {
    const store = memory(), saves = new SaveSlots(store), other = saves.create();
    store.setItem(slotKey("s1", "witch.player"), "{broken");
    saves.storage(other.id).setItem("witch.player", '{"music":0.2}');
    expect(saves.select(other.id)).toBe(true);
    expect(new SaveSlots(store).storage().getItem("witch.player")).toBe('{"music":0.2}');
  });
  it("does not mark incomplete migration complete and retains failed writes for this page", () => {
    const store = memory(); store.setItem("witch.hats", '["legacy"]');
    const errors: string[] = [], blocked = { getItem: store.getItem, setItem: (k: string, v: string) => { if (k.includes(".s1.")) throw new Error("quota"); store.setItem(k, v); } };
    const saves = new SaveSlots(blocked, key => errors.push(key));
    expect(saves.storage().getItem("witch.hats")).toBe('["legacy"]');
    expect(store.getItem(SLOT_INDEX)).toBeNull();
    expect(() => saves.storage().setItem("witch.hats", '["new"]')).toThrow(); expect(saves.storage().getItem("witch.hats")).toBe('["new"]');
    expect(errors).toHaveLength(1);
    const other = saves.create(); expect(saves.select(other.id)).toBe(false);
    expect(store.getItem(SLOT_INDEX)).toBeNull();
    expect(new SaveSlots(store).storage().getItem("witch.hats")).toBe('["legacy"]');
  });
  it("does not complete migration after a failed legacy read", () => {
    const store = memory(); store.setItem("witch.chart", "legacy world");
    const saves = new SaveSlots({ getItem: k => { if (k === "witch.chart") throw new Error("unavailable"); return store.getItem(k); }, setItem: store.setItem }, () => {});
    saves.active(); saves.create();
    expect(store.getItem(SLOT_INDEX)).toBeNull();
    expect(new SaveSlots(store).storage().getItem("witch.chart")).toBe("legacy world");
  });
  it("refuses a reload selection when persistence fails", () => {
    const store = memory(), saves = new SaveSlots(store), other = saves.create();
    const failed = new SaveSlots({ getItem: store.getItem, setItem: () => { throw new Error("blocked"); } }, () => {});
    expect(failed.select(other.id)).toBe(false); expect(failed.active()).toBe("s1");
  });
  it("leaves device diagnostics shared and exposes only copies of slot metadata", () => {
    const store = memory(), saves = new SaveSlots(store, () => {}, () => 123);
    saves.storage().setItem("witch.playtest", "log");
    const other = saves.create();
    expect(saves.storage(other.id).getItem("witch.playtest")).toBe("log");
    expect(store.getItem("witch.playtest")).toBe("log");
    saves.list()[0].name = "changed outside";
    expect(saves.list()[0].name).toBe("Save 1");
  });
  it("reloads controls from the selected slot without changing the first slot's remap", () => {
    const store = memory(), saves = new SaveSlots(store), first = new Bindings(saves.storage());
    first.set("game.talk", { keys: ["KeyZ"] });
    const other = saves.create(); saves.select(other.id);
    const reloaded = new SaveSlots(store), second = new Bindings(reloaded.storage());
    expect(second.get("game.talk").keys).not.toEqual(["KeyZ"]);
    second.set("game.talk", { keys: ["KeyX"] });
    reloaded.select("s1");
    expect(new Bindings(new SaveSlots(store).storage()).get("game.talk").keys).toEqual(["KeyZ"]);
  });
  it("waits for the outgoing night before selection/reload and leaves a failed write open", async () => {
    const store = memory(), saves = new SaveSlots(store), other = saves.create(), order: string[] = [];
    let finish!: (ok: boolean) => void;
    const switching = switchSave(saves, () => new Promise<boolean>(r => { finish = r; }), () => order.push(`reload:${new SaveSlots(store).active()}`), other.id);
    expect(saves.active()).toBe("s1"); expect(order).toEqual([]);
    finish(true); expect(await switching).toBeNull(); expect(order).toEqual([`reload:${other.id}`]);
    const count = saves.list().length;
    expect(await switchSave(saves, async () => false, () => order.push("unexpected"), null)).toContain("could not be saved");
    expect(saves.list()).toHaveLength(count); expect(order).toHaveLength(1);
  });
  it("pins the outgoing storage adapter even after the last-used choice changes", () => {
    const store = memory(), saves = new SaveSlots(store), outgoing = saves.storage(), other = saves.create();
    saves.select(other.id); outgoing.setItem("witch.hats", '["outgoing"]');
    expect(saves.storage("s1").getItem("witch.hats")).toBe('["outgoing"]');
    expect(saves.storage(other.id).getItem("witch.hats")).toBeNull();
  });
  it("keeps newer slot bytes and a damaged index instead of rolling back to legacy data", () => {
    const store = memory();
    store.setItem(SLOT_INDEX, "{damaged");
    store.setItem("witch.chart", "old legacy world"); store.setItem(slotKey("s1", "witch.chart"), "current world");
    store.setItem(slotKey("s2", "witch.hats"), "other save");
    const saves = new SaveSlots(store, () => {});
    expect(saves.storage().getItem("witch.chart")).toBe("current world");
    expect(saves.select(saves.create().id)).toBe(false);
    expect(store.getItem(SLOT_INDEX)).toBe("{damaged");
    expect(store.getItem(slotKey("s2", "witch.hats"))).toBe("other save");
  });
  it("keeps other tabs' slots and last-used selection when an older tab saves metadata", () => {
    const store = memory(), older = new SaveSlots(store), boot = older.active();
    const otherTab = new SaveSlots(store), other = otherTab.create(); otherTab.select(other.id);
    older.summary("home", false, boot);
    const reopened = new SaveSlots(store);
    expect(reopened.active()).toBe(other.id);
    expect(reopened.list().map(s => s.id)).toContain(other.id);
    const third = older.create();
    expect(third.id).not.toBe(other.id);
    expect(new SaveSlots(store).list()).toHaveLength(3);
  });
});
