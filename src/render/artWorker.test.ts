import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ArtResult } from "./artBuild";

const mocks = vi.hoisted(() => ({ get: vi.fn(), put: vi.fn(), load: vi.fn(), run: vi.fn(), post: vi.fn() }));
vi.mock("./artCacheStorage", () => ({ cacheGet: mocks.get, cachePut: mocks.put }));
vi.mock("./artBuild", () => { mocks.load(); return { runJob: mocks.run }; });
const result = () => ({ px: { albedo: new Uint8Array(4), normal: new Uint8Array(4) } }) as ArtResult;
let worker: { postMessage: typeof mocks.post; onmessage: (event: MessageEvent) => Promise<void> };
const send = (extra = {}) => worker.onmessage(new MessageEvent("message", { data: { kind: "type", id: 0, cacheKey: "key", ...extra } }));

beforeEach(async () => {
  vi.resetModules(); vi.clearAllMocks();
  mocks.get.mockResolvedValue(null); mocks.put.mockResolvedValue(undefined); mocks.run.mockImplementation(result);
  worker = { postMessage: mocks.post, onmessage: async () => {} };
  vi.stubGlobal("self", worker);
  await import("./artWorker");
});
afterEach(() => vi.unstubAllGlobals());

describe("cache-first art worker", () => {
  it("returns a hit with its buffers before loading any drawing code", async () => {
    const hit = result(); mocks.get.mockResolvedValue(hit);
    await send();
    expect(mocks.load).not.toHaveBeenCalled(); expect(mocks.run).not.toHaveBeenCalled();
    expect(mocks.post).toHaveBeenCalledWith(expect.objectContaining({ result: hit, cached: true, ms: 0 }), [hit.px.albedo.buffer, hit.px.normal.buffer]);
    expect(mocks.put).not.toHaveBeenCalled();
  });
  it("keeps cache-only misses, including unkeyed probes, free of drawing imports", async () => {
    await send({ cacheOnly: true }); await send({ cacheOnly: true, cacheKey: null });
    expect(mocks.load).not.toHaveBeenCalled(); expect(mocks.run).not.toHaveBeenCalled();
    expect(mocks.get).toHaveBeenCalledTimes(1);
    expect(mocks.post.mock.calls.every(([reply]) => reply.miss === true)).toBe(true);
  });
  it("waits for the cache, loads once across concurrent misses, and writes before replying", async () => {
    let resolve!: (value: null) => void;
    mocks.get.mockReturnValueOnce(new Promise<null>(r => { resolve = r; }));
    const first = send(); await Promise.resolve();
    expect(mocks.load).not.toHaveBeenCalled(); resolve(null);
    await Promise.all([first, send()]); await send({ cacheKey: null });
    expect(mocks.load).toHaveBeenCalledTimes(1); expect(mocks.run).toHaveBeenCalledTimes(3);
    expect(mocks.put).toHaveBeenCalledTimes(2);
    expect(mocks.put.mock.invocationCallOrder[0]).toBeLessThan(mocks.post.mock.invocationCallOrder[0]);
  });
  it("keeps the existing error reply when drawing fails", async () => {
    mocks.run.mockImplementation(() => { throw new Error("draw failed"); });
    await send();
    expect(mocks.post).toHaveBeenCalledWith(expect.objectContaining({ error: "Error: draw failed" }), []);
    expect(mocks.put).not.toHaveBeenCalled();
  });
});
