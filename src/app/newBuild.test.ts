// "A newer version is out" (app/newBuild.ts): the build's number read from its label, and version.json compared with this page's.
import { afterEach, describe, expect, it, vi } from "vitest";
import { buildNumber, isNewer, latestBuildLink, NewBuildNotice } from "./newBuild";

describe("a newer build", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); });
  it("reads the build's number from its label, none from a local build", () => {
    expect(buildNumber("v3712 · 0c668fd")).toBe(3712);
    expect(buildNumber("v3712")).toBe(3712);
    expect(buildNumber("dev")).toBeNull();
  });
  it("is newer only by a higher number, and never for a local build", () => {
    expect(isNewer("v3700 · abc", "v3712 · def")).toBe(true);
    expect(isNewer("v3712", "v3712 · def")).toBe(false);
    expect(isNewer("v3720", "v3712")).toBe(false);
    expect(isNewer("dev", "v3712")).toBe(false);
  });
  it("detects a workflow-counter jump without assuming consecutive builds", () => {
    expect(isNewer("v5955 · old", "v6322 · newer")).toBe(true);
    expect(isNewer("v6322 · newer", "v5956 · offset-backwards")).toBe(false);
    expect(isNewer("v6322 · first", "v6323 · next")).toBe(true);
  });
  it("reads version.json without the cache and remembers a newer build", async () => {
    vi.useFakeTimers();
    const fetch = vi.fn(async (url: string, init: RequestInit) => ({ ok: true, json: async () => ({ version: url && init.cache === "no-store" ? "v3712 · def" : "" }) }));
    vi.stubGlobal("fetch", fetch);
    const n = new NewBuildNotice("v3700 · abc", null);
    await n.check();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(String(fetch.mock.calls[0][0])).toMatch(/^version\.json\?t=\d+/);
    expect(n.latest).toBe("v3712 · def");
  });
  it("says nothing when the page is the latest, or version.json can't be read", async () => {
    vi.useFakeTimers();
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, json: async () => ({ version: "v3700 · abc" }) })));
    const same = new NewBuildNotice("v3700 · abc", null); await same.check(); expect(same.latest).toBeNull();
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("offline"); }));
    const off = new NewBuildNotice("v3700 · abc", null); await off.check(); expect(off.latest).toBeNull();
  });
});

// A fresh game's boot (?fresh=1; Ed, 2026-11-03: "a link that always starts a fresh game with the latest version").
describe("the fresh game's latest version", () => {
  const serving = (version: string) => { const calls: { url: string; init: RequestInit }[] = []; return { calls, fetcher: async (url: string, init: RequestInit) => { calls.push({ url, init }); return { ok: true, json: async () => ({ version }) }; } }; };
  it("reloads to a newer build past the cache: version.json read with no-store, the link with ?latest and ?fresh=1 again", async () => {
    const v = serving("v3712 · def");
    const to = await latestBuildLink("v3700 · abc", "https://x.invalid/witch/?fresh=abcd1234&seed=5", { restart: true, fetcher: v.fetcher });
    expect(v.calls).toHaveLength(1); expect(v.calls[0].init.cache).toBe("no-store"); expect(v.calls[0].url).toMatch(/^version\.json\?t=\d+$/);
    const u = new URL(to!);
    expect(u.searchParams.get("latest")).toBe("3712"); expect(u.searchParams.get("fresh")).toBe("1"); expect(u.searchParams.get("seed")).toBe("5");
    // a fresh game carried on (a reload in it): its own token kept
    expect(new URL((await latestBuildLink("v3700", "https://x.invalid/witch/?fresh=abcd1234", { fetcher: v.fetcher }))!).searchParams.get("fresh")).toBe("abcd1234");
  });
  it("reloads once at most: a link with ?latest never again, even with an older page served still", async () => {
    const v = serving("v3712 · def");
    let href = "https://x.invalid/witch/?fresh=1", reloads = 0;
    for (let load = 0; load < 5; load++) { const to = await latestBuildLink("v3700 · abc", href, { restart: true, fetcher: v.fetcher }); if (!to) break; reloads++; href = to; }
    expect(reloads).toBe(1);
    expect(await latestBuildLink("v3700", "https://x.invalid/?fresh=1&latest=3712", { fetcher: v.fetcher })).toBeNull();
  });
  it("stays put when it's the latest, a local build, offline, or no answer in time", async () => {
    expect(await latestBuildLink("v3712", "https://x.invalid/?fresh=1", { fetcher: serving("v3712 · def").fetcher })).toBeNull();
    expect(await latestBuildLink("v3720", "https://x.invalid/?fresh=1", { fetcher: serving("v3712").fetcher })).toBeNull();
    const local = serving("v3712"); expect(await latestBuildLink("dev", "https://x.invalid/?fresh=1", { fetcher: local.fetcher })).toBeNull(); expect(local.calls).toHaveLength(0);
    expect(await latestBuildLink("v3700", "https://x.invalid/?fresh=1", { fetcher: async () => { throw new Error("offline"); } })).toBeNull();
    expect(await latestBuildLink("v3700", "https://x.invalid/?fresh=1", { fetcher: async () => ({ ok: false, json: async () => null }) })).toBeNull();
    expect(await latestBuildLink("v3700", "https://x.invalid/?fresh=1", { wait: 20, fetcher: () => new Promise(() => undefined) })).toBeNull();
  });
});
