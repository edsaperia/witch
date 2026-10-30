import { afterEach, expect, it, vi } from "vitest";
import { prepareJoin } from "./joinPreparation";
afterEach(() => vi.useRealTimers());

it("attributes a synchronous snapshot failure before any View is invoked", async () => {
  const trace = vi.fn(), fail = vi.fn(), prepare = vi.fn();
  expect(await prepareJoin({ restore: () => { throw new Error("bad snapshot"); }, prepare, trace, fail })).toBe(false);
  expect(prepare).not.toHaveBeenCalled(); expect(fail.mock.calls[0][0].message).toBe("bad snapshot");
  expect(trace).toHaveBeenCalledWith("replay-restore:failed", expect.objectContaining({ message: "bad snapshot" }));
});

it("handles prepare rejection without an unhandled void promise", async () => {
  const trace = vi.fn(), fail = vi.fn();
  expect(await prepareJoin({ restore: () => 1, prepare: async () => { throw new Error("view rejected"); }, trace, fail })).toBe(false);
  expect(trace).toHaveBeenCalledWith("prepare:invoke");
  expect(trace).toHaveBeenCalledWith("view-preparation:failed", expect.objectContaining({ message: "view rejected" }));
  expect(fail).toHaveBeenCalledOnce();
});

it("bounds a hanging prepare and cancels its later activation", async () => {
  vi.useFakeTimers(); let signal: AbortSignal | undefined;
  const trace = vi.fn(), fail = vi.fn();
  const result = prepareJoin({ restore: () => 1, prepare: async (_value, s) => { signal = s; await new Promise(() => {}); }, trace, fail, timeoutMs: 100 });
  await vi.advanceTimersByTimeAsync(101);
  expect(await result).toBe(false); expect(signal?.aborted).toBe(true);
  expect(fail.mock.calls[0][0].message).toContain("view-preparation");
  expect(trace).not.toHaveBeenCalledWith("prepare:resolved");
});
