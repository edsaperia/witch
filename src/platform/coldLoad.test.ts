// A cold load (?cold=1; Ed, 2026-11-05: test a cold first load every time; platform/storageScope.ts coldLoad): the derived caches
// (the art cache, the chart's islands and coasts, the map prep) neither read nor written for the page load, on the page and in the
// workers (told with their jobs); the switch carried by the page's own links; ?fresh=1&cold=1 together. (Headless: IndexedDB a spy.)
import { afterEach, describe, expect, it, vi } from "vitest";
import { coldLink, freshHref } from "./storageScope";

afterEach(() => { vi.unstubAllGlobals(); vi.resetModules(); });

/** An IndexedDB that counts its opens and never answers (a read that reached it would hang the test). */
function spyIdb() { const open = vi.fn(() => ({}) as IDBOpenDBRequest); vi.stubGlobal("indexedDB", { open, deleteDatabase: vi.fn(), databases: async () => [] }); return open; }
/** The modules as a page with this link loads them. */
async function pageWith(search: string) { vi.resetModules(); vi.stubGlobal("location", { search, href: `https://witch.invalid/${search}` }); return import("./storageScope"); }

describe("the cold load link", () => {
  it("is on for ?cold=1 (any value but 0), with or without ?fresh", () => {
    expect(coldLink("?cold=1")).toBe(true);
    expect(coldLink("?fresh=1&cold=1")).toBe(true);
    expect(coldLink("?cold=0")).toBe(false);
    expect(coldLink("?fresh=1")).toBe(false);
    expect(coldLink("")).toBe(false);
  });

  it("is read from the page's link, and carried by the links it goes to (with a fresh game's token too)", async () => {
    expect((await pageWith("?cold=1&seed=4")).coldLoad()).toBe(true);
    expect((await pageWith("?seed=4")).coldLoad()).toBe(false);
    expect(new URL(freshHref("https://witch.invalid/?island=fox", null, true)).searchParams.get("cold")).toBe("1");
    const both = new URL(freshHref("https://witch.invalid/?island=fox", "abcd1234", true)).searchParams;
    expect([both.get("fresh"), both.get("cold"), both.get("island")]).toEqual(["abcd1234", "1", "fox"]);
    expect(freshHref("https://witch.invalid/?island=fox", null, false)).toBe("https://witch.invalid/?island=fox");
  });

  it("reads and keeps none of the derived caches on the page", async () => {
    await pageWith("?cold=1");
    const open = spyIdb();
    const art = await import("../render/artCacheStorage"), chart = await import("../app/chartCache"), prep = await import("../app/mapPrepStore");
    expect(await art.cacheGet("k")).toBeNull();
    await art.cachePut("k", {} as never);
    expect(await chart.cacheGet("k")).toBeNull();
    await chart.cachePut("k", 1);
    expect(await prep.getPrep()).toBeNull();
    expect(await prep.putPrep({} as never)).toBe(false);
    expect(open).not.toHaveBeenCalled();
  });

  it("tells the workers: the art's jobs carry no cache key, the chart's worker keeps nothing once its ask says cold", async () => {
    await pageWith("?cold=1");
    const { AssetLibrary } = await import("../render/assets"), { loadStyle } = await import("../render/style");
    const a = new AssetLibrary(loadStyle(), 11, 4);
    a.prefetchType(3);
    const queue = (a as unknown as { queue: { kind: string; cacheKey?: string | null }[] }).queue;
    expect(queue.length).toBeGreaterThan(0);
    for (const j of queue) expect(j.cacheKey, j.kind).toBeNull();
    // (a worker: its own link has no ?cold; the ask's flag turns its cache off)
    await pageWith("");
    const open = spyIdb(), chart = await import("../app/chartCache");
    chart.coldCache();
    expect(await chart.cacheGet("k")).toBeNull();
    expect(open).not.toHaveBeenCalled();
  });

  it("leaves an ordinary load's caches as they were", async () => {
    await pageWith("?seed=4");
    const { AssetLibrary } = await import("../render/assets"), { loadStyle } = await import("../render/style");
    const a = new AssetLibrary(loadStyle(), 11, 4);
    a.prefetchType(3);
    const job = (a as unknown as { queue: { kind: string; cacheKey?: string | null }[] }).queue.find(j => j.kind === "type");
    expect(typeof job?.cacheKey).toBe("string");
  });
});
