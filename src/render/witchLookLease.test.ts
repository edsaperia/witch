import { afterEach, expect, it, vi } from "vitest";
import { Texture } from "three";
import { AssetLibrary } from "./assets";
import { loadStyle } from "./style";
import type { ArtJob, ArtResult } from "./artBuild";
import type { WitchArt } from "./homeArt";
import { witchLookLeases } from "./witchLookLease";
import { atlasFromPixels, type Atlas } from "./atlas";
afterEach(() => vi.restoreAllMocks());
const textures = (atlas: Atlas) => new Set([atlas.albedo, atlas.normal, atlas.albedoPal, atlas.normalPal]);
const heading = () => ({ hover: [0], lean: 0, leanCycle: [0], fast: [0], brake: [0], idle: [0], walk: [0], idleBroom: [0], walkBroom: [0] });
const result = (value = 7): ArtResult => ({
  px: { width: 1, height: 1, albedo: new Uint8Array([value]), normal: new Uint8Array([1]), albedoPal: new Uint8Array(1024), normalPal: new Uint8Array(1024), frames: [] },
  ours: { foot: { idle: { towards: [0], away: [0], fps: 1 } }, fly: { hover: { towards: [0], away: [0], fps: 1 } }, heading: { up: heading(), down: heading() }, lean: { towards: [0], away: [0] }, dj: { full: [0], upper: [0] }, hat: -1, grounds: [null] } satisfies WitchArt,
});
type Inner = { useWorkers: boolean; queue: ArtJob[]; receive(reply: { job: ArtJob; result: ArtResult }): void };

it("shares one existing oneOff bake and leaves local atlas/tables/pixel bytes identical", async () => {
  const assets = new AssetLibrary(loadStyle(), 123, 4), inner = assets as unknown as Inner;
  const localJob = inner.queue.find(job => job.kind === "witch")!;
  inner.receive({ job: localJob, result: result(11) }); inner.queue.length = 0; inner.useWorkers = true;
  const local = assets.witch, bytes = [...(local.albedo.image.data as Uint8Array)];
  const tables = JSON.stringify([assets.witchFoot, assets.witchFly, assets.witchHeading, assets.witchLean, assets.witchDj]);
  const live = textures(local), baseline = live.size, first = assets.leaseWitchLook({ hat: { shape: "plain" } }), second = assets.leaseWitchLook({ hat: { shape: "plain" } });
  await Promise.resolve();
  const jobs = inner.queue.filter(job => job.kind === "witch"); expect(jobs).toHaveLength(1); expect(jobs[0].id).toMatch(/^remote-/);
  assets.rebakeWitch({ hat: { shape: "different local outfit" } });
  expect(inner.queue).toContain(jobs[0]); // Registered oneOff survives a local outfit change.
  inner.receive({ job: jobs[0], result: result(99) });
  const a = await first, b = await second;
  for (const texture of textures(a.atlas)) { live.add(texture); texture.addEventListener("dispose", () => live.delete(texture)); }
  expect(a.atlas).toBe(b.atlas); expect(a.atlas).not.toBe(local); expect(live.size - baseline).toBe(4);
  expect(assets.witch).toBe(local); expect([...(local.albedo.image.data as Uint8Array)]).toEqual(bytes);
  expect(JSON.stringify([assets.witchFoot, assets.witchFly, assets.witchHeading, assets.witchLean, assets.witchDj])).toBe(tables);
  a.release(); a.release(); expect(live.size - baseline).toBe(4);
  b.release(); expect(live.size).toBe(baseline); expect(assets.witch).toBe(local);
});
it("keeps an in-flight remote job during local rebake and drops its cancelled late result", async () => {
  const assets = new AssetLibrary(loadStyle(), 123, 4), inner = assets as unknown as Inner & { workers: { w: { terminate(): void }; busy: boolean; job: ArtJob }[] };
  inner.queue.length = 0; inner.useWorkers = true;
  const controller = new AbortController(), local = assets.witch, disposed = vi.spyOn(Texture.prototype, "dispose");
  const pending = assets.leaseWitchLook({ hat: "remote" }, controller.signal), rejected = expect(pending).rejects.toThrow("cancelled");
  await Promise.resolve(); const job = inner.queue.find(j => j.kind === "witch")!; inner.queue.length = 0;
  const terminate = vi.fn(); inner.workers = [{ w: { terminate }, busy: true, job }];
  controller.abort(); await rejected;
  assets.rebakeWitch({ hat: "new local" }); expect(terminate).not.toHaveBeenCalled();
  inner.receive({ job, result: result() });
  await vi.waitFor(() => expect(disposed).toHaveBeenCalledTimes(4)); expect(assets.witch).toBe(local);
  for (const texture of textures(local)) expect(disposed.mock.contexts).not.toContain(texture);
});
it("bounds pending looks and frees cancelled late textures without touching local art", async () => {
  let finish!: (result: ArtResult) => void;
  const live = new Set<Texture>(), draw = vi.fn(() => new Promise<ArtResult>(resolve => { finish = resolve; }));
  const pool = witchLookLeases(draw, 1, pixels => { const atlas = atlasFromPixels(pixels, "witch"); for (const texture of textures(atlas)) { live.add(texture); texture.addEventListener("dispose", () => live.delete(texture)); } return atlas; }), controller = new AbortController();
  const baseline = live.size, cancelled = pool.lease({ hair: "a" }, controller.signal); const rejection = expect(cancelled).rejects.toThrow("cancelled");
  await Promise.resolve(); await expect(pool.lease({ hair: "b" })).rejects.toThrow("Too many");
  controller.abort(); await rejection; finish(result());
  await vi.waitFor(() => expect(pool.size).toBe(0)); expect(live.size).toBe(baseline); expect(draw).toHaveBeenCalledTimes(1);
});
