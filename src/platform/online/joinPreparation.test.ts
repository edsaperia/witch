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
  const result = prepareJoin({ restore: () => 1, prepare: async (_value, s) => { signal = s; await new Promise(() => {}); }, trace, fail, stallMs: 100 });
  await vi.advanceTimersByTimeAsync(101);
  expect(await result).toBe(false); expect(signal?.aborted).toBe(true);
  expect(fail.mock.calls[0][0].message).toContain("view-preparation");
  expect(trace).not.toHaveBeenCalledWith("prepare:resolved");
});

it("keeps advancing preparation alive past the old ceiling, but caps total time", async () => {
  vi.useFakeTimers(); let progress = 0;
  const fail = vi.fn();
  const result = prepareJoin({ restore: () => 1, prepare: async () => new Promise(() => {}), trace: vi.fn(), fail, progress: () => progress });
  for (let n = 0; n < 11; n++) { progress++; await vi.advanceTimersByTimeAsync(50000); expect(fail).not.toHaveBeenCalled(); }
  progress++; await vi.advanceTimersByTimeAsync(50000);
  expect(await result).toBe(false); expect(fail.mock.calls[0][0].message).toContain("maximum wait");
});

it("repeated progress and waiting messages cannot renew a stalled preparation", async () => {
  vi.useFakeTimers(); let progress = 1;
  const fail = vi.fn();
  const result = prepareJoin({ restore: () => 1, prepare: async () => new Promise(() => {}), trace: vi.fn(), fail, progress: () => progress });
  await vi.advanceTimersByTimeAsync(30000); progress = 0;
  await vi.advanceTimersByTimeAsync(30000);
  expect(await result).toBe(false); expect(fail.mock.calls[0][0].message).toContain("stalled");
});
