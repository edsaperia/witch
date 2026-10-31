// "A newer version is out" (app/newBuild.ts): the build's number read from its label, and version.json compared with this page's.
import { afterEach, describe, expect, it, vi } from "vitest";
import { buildNumber, isNewer, NewBuildNotice } from "./newBuild";

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
