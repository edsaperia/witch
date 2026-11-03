// A fresh game (?fresh=1; Ed, 2026-11-03: "can you make a link that always starts a fresh game with the latest version?"): its own
// throwaway storage (platform/storageScope.ts), nothing of the real saves read or written, the ordinary game's storage as it was, and
// every storage use in the game routed through the scope.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { FRESH_PREFIX, freshHref, freshLink, makeStorageScope, MemoryStorage, type ScopeEnv } from "./storageScope";
import { SaveSlots, SLOT_INDEX, SLOT_KEYS, slotKey } from "../app/saveSlots";
import { fallbackStorage } from "../app/storageFallback";
import { opensInBedroom } from "../app/opening";
import { browserNightStore, clearSlotNights, savesEnabled } from "../app/nightSave";
import { browserTelephoneIdentityStore } from "./online/telephoneIdentity";
import { TUNING } from "../rules/tuning";

/** A browser Storage that notes every key read, written and removed. */
function spyStorage(seed: Record<string, string> = {}) {
  const real = new MemoryStorage();
  for (const [k, v] of Object.entries(seed)) real.setItem(k, v);
  const reads: string[] = [], writes: string[] = [], removes: string[] = [];
  const store = {
    get length() { return real.length; },
    key: (i: number) => real.key(i),
    getItem: (k: string) => { reads.push(k); return real.getItem(k); },
    setItem: (k: string, v: string) => { writes.push(k); real.setItem(k, v); },
    removeItem: (k: string) => { removes.push(k); real.removeItem(k); },
    clear: () => { throw new Error("never cleared whole"); },
  } as unknown as Storage;
  const snapshot = () => Object.fromEntries(Array.from({ length: real.length }, (_, i) => real.key(i)!).filter(k => !k.startsWith(FRESH_PREFIX)).map(k => [k, real.getItem(k)]));
  return { store, reads, writes, removes, snapshot, real };
}

/** IndexedDB that notes the databases opened and deleted (opening never completes: the names are what's checked). */
function spyIdb(existing: string[] = []) {
  const opened: string[] = [], deleted: string[] = [];
  const request = () => ({}) as IDBOpenDBRequest;
  const idb = {
    open: (name: string) => { opened.push(name); return request(); },
    deleteDatabase: (name: string) => { deleted.push(name); return request(); },
    cmp: () => 0,
    databases: async () => existing.map(name => ({ name, version: 1 })),
  } as unknown as IDBFactory;
  return { idb, opened, deleted };
}

/** A player well into her game: an index, two slots' progress and settings, the legacy keys, and device keys outside the slots. */
const FULL_SAVE: Record<string, string> = {
  [SLOT_INDEX]: JSON.stringify({ version: 1, active: "s1", slots: [{ id: "s1", name: "Save 1", created: 1, updated: 2, island: "fox", nights: 9 }, { id: "s2", name: "Save 2", created: 3, updated: 4 }] }),
  ...Object.fromEntries(SLOT_KEYS.map(k => [slotKey("s1", k), `"s1 ${k}"`])),
  ...Object.fromEntries(SLOT_KEYS.map(k => [slotKey("s2", k), `"s2 ${k}"`])),
  ...Object.fromEntries(SLOT_KEYS.map(k => [k, `"legacy ${k}"`])),
  "witch.woken": "1", "witch.mirrored": "1", "witch.world": "7", "witch.playtest": "[]", "witch.hint.anchor": "1", "witch.chart.sailAnywhere": "1",
};

const env = (search: string, local: Storage | null, session: Storage | null, idb?: IDBFactory, relinked: string[] = []): ScopeEnv =>
  ({ search, local: () => local, session: () => session, idb: () => idb, token: () => "abcd1234", relink: t => { relinked.push(t); } });

/** What a game does with its storage: the slot index and every slot key read, settings and progress written, the arrival handed
 *  on, a new slot made and switched to, and Reset everything. */
function play(local: Storage, session: Storage): SaveSlots {
  const saves = new SaveSlots(local, () => undefined);
  const slot = saves.storage();
  for (const k of SLOT_KEYS) slot.getItem(k);
  for (const k of ["witch.world", "witch.playtest", "witch.hint.anchor"]) slot.getItem(k);
  slot.setItem("witch.woken", "1"); slot.setItem("witch.settings", "{}"); slot.removeItem("witch.world");
  fallbackStorage(slot).setItem("witch.hats", "[]");
  session.setItem("witch.arrive", "{}"); session.getItem("witch.arrive");
  saves.summary("wolf", true);
  saves.select(saves.create().id);
  saves.resetAll();
  return saves;
}

describe("a fresh game (?fresh=1)", () => {
  it("reads ?fresh: 1 (or anything but a token) begins one, a token carries one on, none or 0 is the ordinary game", () => {
    expect(freshLink("?fresh=1")).toBe("new");
    expect(freshLink("?fresh")).toBe("new");
    expect(freshLink("?seed=4&fresh=k3j2h1g0")).toBe("k3j2h1g0");
    expect(freshLink("?fresh=0")).toBeNull();
    expect(freshLink("?seed=4")).toBeNull();
  });

  it("reads none of the real keys and writes none: every key it touches is in its own namespace, his save byte for byte as it was", () => {
    const local = spyStorage(FULL_SAVE), session = spyStorage({ "witch.arrive": "{\"real\":1}", "witch.player": "fox" }), relinked: string[] = [];
    const before = local.snapshot(), beforeSession = session.snapshot();
    const scope = makeStorageScope(env("?fresh=1", local.store, session.store, undefined, relinked));
    expect(scope.fresh).toBe("abcd1234"); expect(scope.began).toBe(true); expect(relinked).toEqual(["abcd1234"]);
    play(scope.local()!, scope.session()!);
    for (const s of [local, session]) {
      expect([...s.reads, ...s.writes, ...s.removes].length).toBeGreaterThan(0);
      for (const k of [...s.reads, ...s.writes, ...s.removes]) expect(k.startsWith(`${FRESH_PREFIX}abcd1234.`)).toBe(true);
    }
    expect(local.snapshot()).toEqual(before);
    expect(session.snapshot()).toEqual(beforeSession);
  });

  it("starts at the first morning even with a full save: a brand-new slot, nothing of hers to read, no night to resume", async () => {
    const local = spyStorage(FULL_SAVE);
    const scope = makeStorageScope(env("?fresh=1", local.store, spyStorage().store));
    const saves = new SaveSlots(scope.local(), () => undefined), slot = saves.storage();
    expect(saves.list()).toEqual([expect.objectContaining({ id: "s1", name: "Save 1" })]);
    expect(saves.list()[0].island).toBeUndefined(); expect(saves.list()[0].nights).toBeUndefined();
    for (const k of SLOT_KEYS) expect(slot.getItem(k)).toBeNull(); // (her look, wardrobe, hats, chart, guidance, settings, controls...)
    expect(slot.getItem("witch.woken")).toBeNull(); // (her first-ever morning: the dressing table's "First night" banner)
    expect(slot.getItem("witch.mirrored")).toBeNull();
    // The boot's own say: a plain first load in the bedroom, its nights saved (into the fresh namespace) and read from there.
    const link = new URLSearchParams("fresh=abcd1234&seed=5");
    expect(opensInBedroom(link, TUNING)).toBe(true);
    expect(savesEnabled(link)).toBe(true);
    const idb = spyIdb(), fresh = makeStorageScope(env("?fresh=1", spyStorage().store, spyStorage().store, idb.idb));
    void browserNightStore("/witch/", fresh.idb()!).read().catch(() => undefined);
    void clearSlotNights(null, fresh.idb()!).catch(() => undefined);
    await new Promise(r => setTimeout(r, 0));
    expect(idb.opened).toEqual([`${FRESH_PREFIX}abcd1234.witch.nights`, `${FRESH_PREFIX}abcd1234.witch.nights`]);
  });

  it("gives the telephone a throwaway identity of its own (multiplayer: a fresh host or guest)", async () => {
    const idb = spyIdb(), scope = makeStorageScope(env("?fresh=1", spyStorage().store, spyStorage().store, idb.idb));
    void browserTelephoneIdentityStore(scope.idb()!).read().catch(() => undefined);
    await Promise.resolve();
    expect(idb.opened).toEqual([`${FRESH_PREFIX}abcd1234.witch.telephone.identity`]);
  });

  it("wipes the earlier fresh games as one begins, theirs only; a carried-on one keeps its own", async () => {
    const local = spyStorage({ ...FULL_SAVE, "witch.fresh.old00000.witch.woken": "1", "witch.fresh.old00000.witch.saves.v1": "{}" });
    const idb = spyIdb(["witch.nights", "witch.fresh.old00000.witch.nights", "witch.art-cache"]);
    const before = local.snapshot();
    makeStorageScope(env("?fresh=1", local.store, spyStorage().store, idb.idb));
    await new Promise(r => setTimeout(r, 0));
    expect(local.removes.sort()).toEqual(["witch.fresh.old00000.witch.saves.v1", "witch.fresh.old00000.witch.woken"]);
    expect(idb.deleted).toEqual(["witch.fresh.old00000.witch.nights"]);
    expect(local.snapshot()).toEqual(before);
    // Carried on (?fresh=<token>: a reload, a sail): its things are there, nothing wiped, the link left as it is.
    const again = spyStorage({ "witch.fresh.k3j2h1g0.witch.woken": "1" }), relinked: string[] = [];
    const scope = makeStorageScope(env("?fresh=k3j2h1g0", again.store, spyStorage().store, undefined, relinked));
    expect(scope.began).toBe(false); expect(relinked).toEqual([]); expect(again.removes).toEqual([]);
    expect(scope.local()!.getItem("witch.woken")).toBe("1");
  });

  it("keeps its things in memory where the browser refuses storage", () => {
    const scope = makeStorageScope(env("?fresh=1", null, null));
    scope.local()!.setItem("witch.woken", "1");
    expect(scope.local()!.getItem("witch.woken")).toBe("1");
    expect(scope.session()).not.toBeNull();
  });

  it("carries its ?fresh=<token> on the game's own links, and leaves the ordinary game's alone", () => {
    expect(freshHref("/witch/", "abcd1234")).toBe("https://witch.invalid/witch/?fresh=abcd1234");
    expect(new URL(freshHref("https://x.invalid/witch/?island=fox&seed=3", "abcd1234")).searchParams.get("fresh")).toBe("abcd1234");
    expect(freshHref("/witch/", null)).toBe("/witch/");
  });
});

describe("the ordinary game", () => {
  it("is unchanged: the browser's own stores, read live, nothing wiped or relinked", () => {
    const local = spyStorage(FULL_SAVE), session = spyStorage(), idb = spyIdb(["witch.fresh.old00000.witch.nights"]), relinked: string[] = [];
    let store: Storage = local.store;
    const scope = makeStorageScope({ ...env("?seed=4", null, session.store, idb.idb, relinked), local: () => store });
    expect(scope.fresh).toBeNull(); expect(scope.began).toBe(false);
    expect(scope.local()).toBe(local.store); expect(scope.session()).toBe(session.store); expect(scope.idb()).toBe(idb.idb);
    expect(relinked).toEqual([]); expect(local.removes).toEqual([]); expect(idb.deleted).toEqual([]);
    const other = spyStorage().store; store = other;
    expect(scope.local()).toBe(other); // (each call the browser's own: a test's stand-in swaps it)
    // His save plays as it always did: the slot's own keys.
    const saves = new SaveSlots(local.store, () => undefined);
    expect(saves.list().map(s => s.id)).toEqual(["s1", "s2"]);
    expect(saves.storage().getItem("witch.genome")).toBe('"s1 witch.genome"');
    expect(makeStorageScope(env("?fresh=0", local.store, null)).local()).toBe(local.store);
  });
  it("a browser refusing storage: none, as before", () => {
    const scope = makeStorageScope({ search: "", local: () => { throw new Error("denied"); }, session: () => { throw new Error("denied"); }, idb: () => undefined });
    expect(scope.local()).toBeNull(); expect(scope.session()).toBeNull(); expect(scope.idb()).toBeUndefined();
  });
});

// Every storage use goes through platform/storageScope.ts, so a fresh game can't miss one. The derived caches are the exception (they
// hold only what a build and seed make, and the art and map workers write them: storageScope.ts's note).
const DERIVED_CACHES = ["src/render/artCacheStorage.ts", "src/app/chartCache.ts", "src/app/mapPrepStore.ts", "src/app/mapPrep.ts"];
describe("every storage use", () => {
  it("is through the storage scope (no direct localStorage, sessionStorage, indexedDB, Cache API, service worker or cookie)", () => {
    const root = join(__dirname, "../.."), files: string[] = [];
    const walk = (d: string) => { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) walk(p); else if (/\.ts$/.test(f) && !/\.test\.ts$/.test(f)) files.push(p); } };
    walk(join(root, "src"));
    const bad: string[] = [];
    for (const f of files) {
      const rel = relative(root, f).replace(/\\/g, "/");
      if (rel === "src/platform/storageScope.ts" || DERIVED_CACHES.includes(rel)) continue;
      const code = readFileSync(f, "utf8").replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g, "")).replace(/(^|[^:\\"'`])\/\/.*$/gm, "$1");
      code.split("\n").forEach((line, i) => {
        if (/\b(localStorage|sessionStorage|indexedDB)\b|\bcaches\.(open|match|keys)\(|serviceWorker|document\.cookie/.test(line)) bad.push(`${rel}:${i + 1}: ${line.trim().slice(0, 120)}`);
      });
    }
    expect(bad).toEqual([]);
  });
});
