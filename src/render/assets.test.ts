// The art across islands (render/assets.ts reseat; docs/plans/sail-without-reload.md B 3-5, decision 6): another island takes the
// page, so the last one's sets waiting are dropped, those being drawn land to nothing, and its sets held are let go; the rest (by
// species, the page's own) stay. Headless: no workers here, so the jobs wait in the queue, and "a worker's result" is handed in.
import { describe, expect, it } from "vitest";
import { AssetLibrary, islandBound } from "./assets";
import { loadStyle } from "./style";
import type { ArtJob, ArtResult } from "./artBuild";
import { partyGearOf } from "./creatureArt";
import { partySheetKey } from "./partySheet";

type Lib = { queue: (ArtJob & { gen?: number })[]; inFlight: Set<string>; receive(r: { job: ArtJob; result?: ArtResult }): void };
const inner = (a: AssetLibrary) => a as unknown as Lib;
/** A type set's result, as an art worker hands it back: one transparent pixel, no trees. */
const typeResult = (): ArtResult => ({ px: { width: 1, height: 1, albedo: new Uint8ClampedArray(4), normal: new Uint8ClampedArray(4), frames: [] }, layout: { big: [] } } as unknown as ArtResult);
const typeJob = (a: AssetLibrary, id: number) => inner(a).queue.find(j => j.kind === "type" && j.id === id)!;

describe("shared party sheets", () => {
  it("queues one sheet for matching outfits, receives its age-local frames, and requests a new sheet on growth", () => {
    const colour = [1, 0, 1], seen = new Map<string, number>();
    let pair: [number, number] | undefined;
    for (let id = 0; id < 512 && !pair; id++) {
      const key = partySheetKey("fox", 2, partyGearOf(id, colour)), before = seen.get(key);
      if (before !== undefined) pair = [before, id]; else seen.set(key, id);
    }
    expect(pair).toBeDefined();
    const [aId, bId] = pair!, a = new AssetLibrary(loadStyle(), 11, 4);
    expect(a.partyArt("fox", aId, colour, 2)).toBeUndefined();
    expect(a.partyArt("fox", bId, colour, 2)).toBeUndefined();
    const jobs = inner(a).queue.filter(j => j.kind === "party"); expect(jobs).toHaveLength(1);
    const job = jobs[0];
    if (job.kind !== "party") throw Error("party job missing");
    expect(job.level).toBe(2); expect(job.gear).toEqual(partyGearOf(aId, colour));
    inner(a).receive({ job, result: typeResult() });
    const first = a.partyArt("fox", aId, colour, 2), second = a.partyArt("fox", bId, colour, 2);
    expect(first).toBeDefined(); expect(second).toBe(first); expect(first!.key).toBe(job.id);
    const n = first!.walk!.frames;
    expect(first!.frame(2, 0)).toBe(0); expect(first!.frame(2, 0, true)).toBe(n);
    expect(a.partyArt("fox", aId, colour, 1)).toBeUndefined();
    expect(inner(a).queue.some(j => j.kind === "party" && j.level === 1 && j.id !== job.id)).toBe(true);
    a.happyArt("fox", aId, 2);
    expect(inner(a).queue.some(j => j.kind === "party" && j.gear.collar === null && j.id !== job.id)).toBe(true);
    first!.atlas.albedo.dispose(); first!.atlas.normal.dispose();
  });
});

describe("AssetLibrary.reseat (another island on the page)", () => {
  const style = loadStyle();

  it("drops the last island's waiting sets (its trees, its soundsystems) and keeps the rest", () => {
    const a = new AssetLibrary(style, 11, 4);
    a.prefetchType(3);
    a.soundsystemGenArt("ss-1", {}, 0, 1, false);
    a.creatureArt("wolf");
    const before = a.pending;
    expect(inner(a).inFlight.has("type:3")).toBe(true);
    a.reseat({ seed: 22, typeSeed: 77, treehouse: "home" });
    const kinds = inner(a).queue.map(j => j.kind);
    expect(kinds).not.toContain("type");
    expect(kinds).not.toContain("soundsystem");
    expect(kinds).toContain("creature"); // (by species: right on any island)
    expect(kinds).toContain("treehouse"); // (not drawn yet: asked again, the last ask dropped)
    expect(inner(a).inFlight.has("type:3")).toBe(false);
    expect(a.pending).toBe(before - 2);
    expect(a.seed).toBe(22);
    expect(a.typeSeed).toBe(77);
  });

  it("lets an old island's set that lands after the swap come to nothing, and the new island's land", () => {
    const a = new AssetLibrary(style, 11, 4), floors: number[] = [];
    a.onFloor = t => floors.push(t);
    a.typeArt(5);
    const old = typeJob(a, 5);
    expect(old.gen).toBe(0);
    a.reseat({ seed: 22, typeSeed: 77, treehouse: "home" });
    a.typeArt(5); // (the new island's own, asked afresh: not swallowed by the old one still being drawn)
    const mine = typeJob(a, 5);
    expect(mine.gen).toBe(1);
    expect((mine as { seed?: number }).seed).toBe(77);
    const v = a.version, done = a.done;
    inner(a).receive({ job: old, result: { ...typeResult(), floor: {} } as ArtResult });
    expect(a.typeArt(5)).toBeUndefined();
    expect(a.version).toBe(v);
    expect(a.done).toBe(done);
    expect(floors).toEqual([]);
    expect(inner(a).inFlight.has("type:5")).toBe(true); // (the new ask still waits)
    inner(a).receive({ job: mine, result: { ...typeResult(), floor: {} } as ArtResult });
    expect(a.typeArt(5)).toBeDefined();
    expect(floors).toEqual([5]);
    expect(a.pending).toBe(inner(a).inFlight.size);
  });

  it("frees the last island's sets once each, and its treehouse if this island's is another", () => {
    const a = new AssetLibrary(style, 11, 4);
    a.typeArt(6);
    inner(a).receive({ job: typeJob(a, 6), result: typeResult() });
    const set = a.typeArt(6)!;
    let freed = 0;
    for (const t of [set.atlas.albedo, set.atlas.normal]) t.addEventListener("dispose", () => freed++);
    a.reseat({ seed: 22, typeSeed: 77, treehouse: "ent:6:9" });
    expect(freed).toBe(2);
    expect(a.sets().types).toBe(0);
    expect(a.home.treehouse).toBe(false);
    expect(inner(a).queue.some(j => j.kind === "treehouse" && j.id === "ent:6:9")).toBe(true);
    a.reseat({ seed: 33, typeSeed: 78, treehouse: "ent:6:9" });
    expect(freed).toBe(2); // (never twice)
    expect(inner(a).queue.filter(j => j.kind === "treehouse").length).toBe(1);
  });

  it("knows which sets are an island's", () => {
    expect(islandBound({ kind: "type" } as ArtJob)).toBe(true);
    expect(islandBound("soundsystem:ss-1-2")).toBe(true);
    expect(islandBound("treehouse:home")).toBe(true);
    expect(islandBound("creature:wolf")).toBe(false);
    expect(islandBound({ kind: "party" } as ArtJob)).toBe(false);
  });
});

// While the night plays, the art asked ahead of need keeps to half the workers, and past that only an urgent job is handed out
// (render/assets.ts dispatch). An area's set asked ahead and then wanted on screen (typeArt) must go as urgent: the zoo's area
// types are all asked ahead at its start, and with one worker on a long job none of its trees ever came (Lima, 2026-10-25).
describe("AssetLibrary: a set asked ahead, then wanted on screen", () => {
  const style = loadStyle();
  type Slot = { w: { postMessage(j: ArtJob): void }; busy: boolean; job?: ArtJob };
  type Pool = { useWorkers: boolean; workers: Slot[]; playing: boolean };
  /** A library with `n` fake workers, the first busy on a long job, the night playing; what each worker was handed. */
  function pool(n: number): { a: AssetLibrary; sent: ArtJob[] } {
    const a = new AssetLibrary(style, 11, 4), sent: ArtJob[] = [], p = a as unknown as Pool;
    inner(a).queue.length = 0;
    p.useWorkers = true; p.playing = true;
    p.workers = Array.from({ length: n }, (_, i) => ({ w: { postMessage: (j: ArtJob) => void sent.push(j) }, busy: i === 0, job: i === 0 ? ({ kind: "witch", id: "long" } as unknown as ArtJob) : undefined }));
    return { a, sent };
  }

  it("goes to a free worker at once, though the art ahead's share is full", () => {
    const { a, sent } = pool(3); // (3 workers: the art ahead's share is 1, and the long job has it)
    for (const t of [20, 28, 27, 59]) a.prefetchType(t);
    expect(sent).toEqual([]); // (asked ahead: waiting while the share is full)
    expect(a.typeArt(59)).toBeUndefined();
    expect(sent.map(j => `${j.kind}:${j.id}`)).toEqual(["type:59"]);
    expect(a.typeArt(27)).toBeUndefined();
    expect(sent.map(j => `${j.kind}:${j.id}`)).toEqual(["type:59", "type:27"]);
  });

  it("and the others asked ahead still wait their turn", () => {
    const { a, sent } = pool(3);
    for (const t of [20, 28]) a.prefetchType(t);
    a.typeArt(28);
    expect(sent.map(j => `${j.kind}:${j.id}`)).toEqual(["type:28"]);
    expect(inner(a).queue.map(j => `${j.kind}:${j.id}`)).toEqual(["type:20"]);
  });
});
