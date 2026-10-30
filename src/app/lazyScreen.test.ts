import { expect, it, vi } from "vitest";
import { LazyScreen, type LazyScreenHost } from "./lazyScreen";
function deferred<T>() { let resolve!: (value: T) => void, reject!: (error: unknown) => void; const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; }
function fixture(load: () => Promise<string>) {
  let night = 1; const claims = new Set<string>(), actions: string[] = [];
  const host: LazyScreenHost<string, number> = {
    valid: context => context === night,
    claim: context => { const token = `screen${context}`; claims.add(token); actions.push("gesture/held-input-release"); return () => { claims.delete(token); actions.push("restore-focus"); }; },
    loading: (_context, on) => { actions.push(`loading:${on}`); },
    show: module => { actions.push(`show:${module}`); }, hide: module => { actions.push(`hide:${module}`); }, failed: () => { actions.push("failed"); },
  };
  return { screen: new LazyScreen(load, host), host, claims, actions, nextNight: () => { night++; } };
}
it("claims input synchronously, coalesces duplicate opens, and caches only the loaded module", async () => {
  const importJob = deferred<string>(), load = vi.fn(() => importJob.promise), f = fixture(load);
  expect(load).not.toHaveBeenCalled();
  const first = f.screen.open(1), second = f.screen.open(1);
  expect(second).toBe(first); expect(f.claims.has("screen1")).toBe(true); expect(f.actions).toEqual(["gesture/held-input-release"]);
  importJob.resolve("panel"); expect(await first).toBe(true); expect(load).toHaveBeenCalledTimes(1);
  expect(f.screen.openNow).toBe(true); f.screen.close(); expect(f.claims.size).toBe(0);
  expect(await f.screen.open(1)).toBe(true); expect(load).toHaveBeenCalledTimes(1);
  expect(f.actions.filter(a => a === "show:panel")).toHaveLength(2); f.screen.close();
});
it("never constructs or shows a cancelled import and does not release a separate pause owner", async () => {
  const job = deferred<string>(), f = fixture(() => job.promise), result = f.screen.open(1);
  await Promise.resolve(); await Promise.resolve();
  f.claims.add("pause"); f.screen.close(); f.screen.close(); job.resolve("late");
  expect(await result).toBe(false); expect(f.claims).toEqual(new Set(["pause"]));
  expect(f.actions).not.toContain("show:late"); expect(f.actions.filter(a => a === "restore-focus")).toHaveLength(1);
});
it("rejects stale night completion while sharing the same import with the new night", async () => {
  const job = deferred<string>(), load = vi.fn(() => job.promise), f = fixture(load), old = f.screen.open(1);
  await Promise.resolve(); await Promise.resolve(); f.nextNight(); const current = f.screen.open(2);
  job.resolve("current"); expect(await old).toBe(false); expect(await current).toBe(true);
  expect(load).toHaveBeenCalledTimes(1); expect(f.claims).toEqual(new Set(["screen2"]));
  expect(f.actions.filter(a => a === "show:current")).toHaveLength(1); f.screen.close();
});
it("reports load failure, releases its input lease, and retries on a later explicit open", async () => {
  const load = vi.fn<() => Promise<string>>().mockRejectedValueOnce(Error("network")).mockResolvedValueOnce("retry"), f = fixture(load);
  expect(await f.screen.open(1)).toBe(false); expect(f.actions).toContain("failed"); expect(f.claims.size).toBe(0);
  expect(await f.screen.open(1)).toBe(true); expect(load).toHaveBeenCalledTimes(2); f.screen.close();
});
it("cleans up a failed stale-night request without displaying its error over the new night", async () => {
  const job = deferred<string>(), f = fixture(() => job.promise), pending = f.screen.open(1);
  await Promise.resolve(); await Promise.resolve(); f.nextNight(); job.reject(Error("old night"));
  expect(await pending).toBe(false); expect(f.claims.size).toBe(0); expect(f.actions).not.toContain("failed");
});
it("releases the lease after partial show failure and does not alter the game's pause owner", async () => {
  const f = fixture(async () => "loaded"); f.claims.add("pause"); f.host.show = () => { throw Error("mount"); };
  expect(await f.screen.open(1)).toBe(false); expect(f.actions).toContain("hide:loaded"); expect(f.actions).toContain("failed");
  expect(f.claims).toEqual(new Set(["pause"])); expect(f.screen.pending).toBe(false);
});
