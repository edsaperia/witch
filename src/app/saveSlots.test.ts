import { describe, expect, it } from "vitest";
import { SaveSlots, SLOT_INDEX, SLOT_KEYS, slotKey } from "./saveSlots";
const memory = () => { const data = new Map<string, string>(); return { data, getItem: (k: string) => data.get(k) ?? null, setItem: (k: string, v: string) => { data.set(k, v); }, removeItem: (k: string) => { data.delete(k); } }; };
describe("save slots", () => {
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
    saves.storage().setItem("witch.hats", '["new"]'); expect(saves.storage().getItem("witch.hats")).toBe('["new"]');
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
});
