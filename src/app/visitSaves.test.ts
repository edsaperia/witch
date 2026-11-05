import { expect, it } from "vitest";
import { borrowedNightSaves, type NightStore, type SavedNight } from "./nightSave";
import { SaveSlots } from "./saveSlots";
import { visitSaves } from "./visitSaves";

function fixture() {
  const bytes = new Map<string, string>(), store = { getItem: (k: string) => bytes.get(k) ?? null, setItem: (k: string, v: string) => { bytes.set(k, v); }, removeItem: (k: string) => { bytes.delete(k); } };
  const slots = new SaveSlots(store), storage = slots.storage(); storage.setItem("witch.owned", "own collection");
  let checkpoint: unknown = "own interrupted night", clears = 0;
  const original: NightStore = { read: async () => checkpoint, write: async value => { checkpoint = value; }, clear: async () => { clears++; checkpoint = undefined; } };
  const nights = borrowedNightSaves(original);
  return { slots, storage, nights, visit: visitSaves(slots, nights), checkpoint: () => checkpoint, clears: () => clears };
}
it("holds confirmed borrowed writes, drops them on return and enables checkpoints only after own adoption", async () => {
  const f = fixture(); await f.visit.prepare(); expect(f.slots.visiting).toBe(false); expect(f.clears()).toBe(0);
  await f.visit.confirm(); expect(f.slots.visiting).toBe(true); expect(f.clears()).toBe(1);
  f.storage.setItem("witch.owned", "borrowed collection"); f.storage.setItem("witch.settings", "own volume");
  let finish!: () => void, fresh: boolean | undefined;
  const returned = f.visit.returnOwn(async confirmed => { fresh = confirmed; await new Promise<void>(r => { finish = r; }); });
  expect(f.storage.getItem("witch.owned")).toBe("own collection"); expect(f.storage.getItem("witch.settings")).toBe("own volume");
  expect(f.nights.suspended).toBe(true); await f.nights.store.write({ build: "borrowed" } as SavedNight); expect(f.checkpoint()).toBeUndefined();
  expect(f.visit.returnOwn(async () => { throw Error("duplicate return"); })).toBe(returned);
  finish(); await returned; expect(fresh).toBe(true); expect(f.nights.suspended).toBe(false);
  await f.nights.store.write({ build: "fresh own" } as SavedNight); expect(f.checkpoint()).toEqual({ build: "fresh own" });
});
it("keeps an aborted preparation checkpoint and holds failed return until an own adoption succeeds", async () => {
  const f = fixture(); await f.visit.prepare();
  await expect(f.visit.returnOwn(async confirmed => { expect(confirmed).toBe(false); throw Error("own view not ready"); })).rejects.toThrow("own view not ready");
  expect(f.visit.phase).toBe("returning"); expect(f.nights.suspended).toBe(true); expect(f.checkpoint()).toBe("own interrupted night");
  await expect(f.visit.confirm()).rejects.toThrow("Prepare own saves");
  await f.visit.returnOwn(async confirmed => { expect(confirmed).toBe(false); });
  expect(f.clears()).toBe(0); expect(f.visit.phase).toBe("solo"); expect(f.nights.suspended).toBe(false);
});
