import { describe, expect, it } from "vitest";
import { BORROWED_GAME_KEYS, deleteSave, SaveSlots, SLOT_INDEX, SLOT_KEYS, slotKey, switchSave } from "./saveSlots";
import { fallbackStorage } from "./storageFallback";
import { Bindings } from "../platform/bindings";
// (localStorage's enumeration too, so delete finds keys beyond SLOT_KEYS)
const listed = () => { const m = memory(); return Object.defineProperty(Object.assign(m, { key: (i: number) => [...m.data.keys()][i] ?? null }), "length", { get: () => m.data.size }) as typeof m & { key(i: number): string | null; readonly length: number }; };
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
  // (Ed, 2026-11-02: "a way to delete saves in the settings menu ... hold to delete")
  it("delete drops a slot's index entry and every witch.save.<id>.* key, leaving the others and device keys", () => {
    let t = 100;
    const store = listed(), saves = new SaveSlots(store, () => {}, () => t++), other = saves.create(), third = saves.create();
    for (const id of ["s1", other.id, third.id]) { saves.storage(id).setItem("witch.chart", `chart ${id}`); saves.storage(id).setItem("witch.player", `player ${id}`); }
    store.setItem(slotKey(other.id, "witch.future"), "a key added later"); saves.storage().setItem("witch.playtest", "device log");
    expect(saves.delete(other.id)).toBe(true);
    expect(saves.list().map(s => s.id)).toEqual(["s1", third.id]);
    expect([...store.data.keys()].filter(k => k.includes(other.id))).toEqual([]);
    expect(JSON.parse(store.getItem(SLOT_INDEX)!).slots.map((s: { id: string }) => s.id)).toEqual(["s1", third.id]);
    expect(store.getItem(slotKey(third.id, "witch.chart"))).toBe(`chart ${third.id}`); expect(store.getItem("witch.playtest")).toBe("device log");
    expect(saves.active()).toBe("s1"); expect(saves.delete(other.id)).toBe(false); expect(saves.delete("s999")).toBe(false);
  });
  it("deleting the last-used slot picks the most recent left; the last one left becomes a fresh slot", () => {
    let t = 100;
    const store = listed(), saves = new SaveSlots(store, () => {}, () => t++), older = saves.create(), newer = saves.create();
    saves.touch(older.id); saves.touch(newer.id); saves.touch("s1"); saves.touch(newer.id);
    expect(saves.delete("s1")).toBe(true);
    expect(new SaveSlots(store).active()).toBe(newer.id);
    expect(saves.delete(newer.id)).toBe(true); expect(new SaveSlots(store).active()).toBe(older.id);
    saves.storage(older.id).setItem("witch.hats", "found hats");
    expect(saves.delete(older.id)).toBe(true);
    const fresh = new SaveSlots(store), [only] = fresh.list();
    expect(fresh.list()).toHaveLength(1); expect(fresh.active()).toBe(only.id); expect(only.id).not.toBe(older.id); expect(only.name).toBe("Save 1");
    expect(fresh.storage().getItem("witch.hats")).toBeNull();
  });
  it("a deleted slot stays deleted: its legacy originals go, its pinned adapter writes nothing, an older tab can't bring it back", () => {
    const store = listed();
    store.setItem("witch.genome", "legacy look");
    const saves = new SaveSlots(store), pinned = saves.storage(), olderTab = new SaveSlots(store), other = saves.create();
    olderTab.list();
    expect(saves.delete("s1")).toBe(true);
    expect(store.getItem("witch.genome")).toBeNull();
    pinned.setItem("witch.chart", "pagehide save of the deleted slot"); pinned.setItem("witch.playtest", "device log");
    expect(store.getItem(slotKey("s1", "witch.chart"))).toBeNull(); expect(store.getItem("witch.playtest")).toBe("device log");
    saves.touch(other.id);
    expect(new SaveSlots(store).list().map(s => s.id)).toEqual([other.id]);
    expect(new SaveSlots(store).active()).toBe(other.id);
  });
  it("delete and reset refuse during a borrowed visit and leave the bytes alone", async () => {
    const store = listed(), saves = new SaveSlots(store), other = saves.create();
    saves.storage().setItem("witch.chart", "own world");
    const before = new Map(store.data), release = saves.beginBorrowedVisit(), calls: string[] = [];
    expect(saves.delete(other.id)).toBe(false); expect(saves.resetAll()).toBe(false);
    const nights = { stop: async () => { calls.push("stop"); }, resume: () => calls.push("resume"), clear: async () => { calls.push("clear"); } };
    expect(await deleteSave(saves, null, "s1", nights, () => calls.push("reload"))).toContain("Finish visiting");
    expect(calls).toEqual([]); expect(store.data).toEqual(before);
    release(); expect(saves.delete(other.id)).toBe(true);
  });
  it("Reset everything deletes every slot, its keys and its nights, then reloads into one fresh slot; device keys survive", async () => {
    const store = listed();
    store.setItem("witch.owned", "legacy wardrobe");
    const saves = new SaveSlots(store), other = saves.create(), calls: string[] = [];
    for (const id of ["s1", other.id]) for (const key of SLOT_KEYS) saves.storage(id).setItem(key, `${id} ${key}`);
    for (const key of ["witch.playtest", "witch.ladder", "witch.telephone.v1", "witch.fightArena.library"]) store.setItem(key, "device");
    const nights = { stop: async () => { calls.push("stop"); }, resume: () => calls.push("resume"), clear: async (id: string | null) => { calls.push(`clear:${id}`); } };
    expect(await deleteSave(saves, null, "s1", nights, () => calls.push(`reload:${new SaveSlots(store).active()}`))).toBeNull();
    const fresh = new SaveSlots(store), [only] = fresh.list();
    expect(fresh.list()).toHaveLength(1);
    expect(calls).toEqual(["stop", "clear:null", `reload:${only.id}`]);
    expect([...store.data.keys()].sort()).toEqual([SLOT_INDEX, "witch.fightArena.library", "witch.ladder", "witch.playtest", "witch.telephone.v1"].sort());
    for (const key of SLOT_KEYS) expect(fresh.storage().getItem(key)).toBeNull();
  });
  it("deleting another slot keeps this page open; a refused delete of its own resumes its autosave", async () => {
    const store = listed(), saves = new SaveSlots(store), other = saves.create(), calls: string[] = [];
    const nights = { stop: async () => { calls.push("stop"); }, resume: () => calls.push("resume"), clear: async (id: string | null) => { calls.push(`clear:${id}`); } };
    expect(await deleteSave(saves, other.id, "s1", nights, () => calls.push("reload"))).toBeNull();
    expect(calls).toEqual([`clear:${other.id}`]);
    const blocked = new SaveSlots({ getItem: store.getItem, setItem: () => { throw new Error("quota"); }, removeItem: store.removeItem }, () => {});
    calls.length = 0;
    expect(await deleteSave(blocked, "s1", "s1", nights, () => calls.push("reload"))).toContain("could not delete");
    expect(calls).toEqual(["stop", "resume"]); expect(new SaveSlots(store).list().map(s => s.id)).toEqual(["s1"]);
  });
});
