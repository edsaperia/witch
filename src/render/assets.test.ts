// The art across islands (render/assets.ts reseat; docs/plans/sail-without-reload.md B 3-5, decision 6): another island takes the
// page, so the last one's sets waiting are dropped, those being drawn land to nothing, and its sets held are let go; the rest (by
// species, the page's own) stay. Headless: no workers here, so the jobs wait in the queue, and "a worker's result" is handed in.
import { describe, expect, it } from "vitest";
import { AssetLibrary, islandBound } from "./assets";
import { loadStyle } from "./style";
import type { ArtJob, ArtResult } from "./artBuild";
import { partyGearOf } from "./creatureArt";
import { partySheetKey } from "./partySheet";
import { PILE_SLOTS, wornGenome } from "../rules/clothesPile";

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

// Ed, 2026-11-05: "Scrap animal expressions for now." (tuning looks.expressions, off): no face set asked for by anyone (the view's
// creatures, an island's asks ahead), rig pages without expression heads, party sheets with their plain face; on, as before.
// (asked of the hydra, in the meshes' last batch: the fox, then the wolf, are drawn as meshes now, art/mesh, and have no rig page
// to ask for; Ed, 2026-11-12)
describe("creatures' faces off (looks.expressions)", () => {
  it("asks for no face set, no rig expression heads and no smiling party sheet while off", () => {
    const a = new AssetLibrary(loadStyle(), 11, 4);
    expect(a.expressions).toBe(false);
    for (const face of ["angry", "happy", "dazed", "bite", "yawn"]) expect(a.faceArt("hydra", face)).toBeUndefined();
    expect(inner(a).queue.some(j => j.kind === "face")).toBe(false);
    a.rigArt("hydra", 2); a.partyArt("hydra", 7, [1, 0, 1], 2); a.happyArt("hydra", 7, 2); a.wokenArt("hydra");
    const rig = inner(a).queue.find(j => j.kind === "rig"), party = inner(a).queue.filter(j => j.kind === "party"), woken = inner(a).queue.find(j => j.kind === "woken");
    expect(rig && "faces" in rig).toBe(false);
    expect(woken?.id).toBe("woken-hydra"); expect(woken && "faces" in woken).toBe(false);
    expect(party).toHaveLength(2); expect(party.some(j => "faces" in j)).toBe(false);
  });
  it("asks for them, under keys of their own, while on", () => {
    const a = new AssetLibrary(loadStyle(), 11, 4); a.expressions = true;
    expect(a.faceArt("hydra", "dazed")).toBeUndefined();
    expect(inner(a).queue.filter(j => j.kind === "face").map(j => j.id)).toEqual(["face-dazed-hydra"]);
    a.rigArt("hydra", 2); a.partyArt("hydra", 7, [1, 0, 1], 2); a.wokenArt("hydra");
    const rig = inner(a).queue.find(j => j.kind === "rig")!, party = inner(a).queue.find(j => j.kind === "party")!, woken = inner(a).queue.find(j => j.kind === "woken")!;
    expect(woken.id).toBe("woken-hydra-faces"); expect(woken.kind === "woken" && woken.faces).toBe(true);
    expect(rig.kind === "rig" && rig.faces).toBe(true); expect(rig.id.endsWith("-faces")).toBe(true);
    expect(party.kind === "party" && party.faces).toBe(true); expect(party.id).toBe(partySheetKey("hydra", 2, partyGearOf(7, [1, 0, 1]), true));
  });
});

it('requires the complete current witch atlas, not a quick preview or an old outfit, for limited landing', () => {
  const a = Object.assign(Object.create(AssetLibrary.prototype), { home: { witch: true }, preview: {}, witchGenome: null, witchLooks: new Map([['null', {}]]) }) as AssetLibrary;
  expect(a.fullWitchReady).toBe(false);
  (a as unknown as { preview: unknown }).preview = null;
  expect(a.fullWitchReady).toBe(true);
  (a as unknown as { witchLooks: Map<string, unknown> }).witchLooks.clear();
  expect(a.fullWitchReady).toBe(false);
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

// Ed, 2026-11-03: "after the loading screen I look at the bed and see the witch in her default clothes instead of in her nightie":
// on a game's first morning her art is made in her nightie with the start's own (main.ts firstAhead), her hat-off frames too, the
// loading screen waiting for them (prepare's whenIdle: the urgent sets), so nothing older is drawn on her meanwhile.
describe("AssetLibrary: a first morning's nightie, made with the start's own art", () => {
  const style = loadStyle(), nightie = wornGenome(null, PILE_SLOTS, true); // (the classic witch's, her hat lying on the hats' floor)
  type Witchy = { urgentKeys: Set<string> };
  const witchJobs = (a: AssetLibrary) => inner(a).queue.filter((j): j is Extract<ArtJob, { kind: "witch" }> => j.kind === "witch");
  it("asks her nightie's whole set first, and her hat-off frames in it, urgent, ahead of everything but the start's own", () => {
    const a = new AssetLibrary(style, 11, 4, nightie);
    a.prefetchType(3); // (the island's trees, asked ahead)
    a.askHatOff();
    const jobs = witchJobs(a);
    expect(jobs.map(j => ({ genome: j.genome, bare: j.bare, quick: !!j.quick }))).toEqual([{ genome: nightie, bare: false, quick: false }, { genome: nightie, bare: true, quick: false }]);
    const q = inner(a).queue, bare = q.indexOf(jobs[1]);
    expect(q.slice(0, bare).every(j => (j as { home?: boolean }).home)).toBe(true); // (behind the start's own sets only)
    expect(q.findIndex(j => j.kind === "type")).toBeGreaterThan(bare);
    expect((a as unknown as Witchy).urgentKeys.size).toBeGreaterThan(0);
    expect([...(a as unknown as Witchy).urgentKeys].some(k => k.includes("-bare"))).toBe(true); // (the loading screen waits for it)
    a.askHatOff(); expect(witchJobs(a)).toHaveLength(2); // (once)
  });
});

// A sail's morning and the bed's next one (main.ts aheadMorning, View.setWitch's `morning`): her nightie read ahead as she sails or
// sleeps, its whole set asked at once, urgent, ahead of everything but the start's own (no preview first: its standing frames are no
// way to be seen asleep in bed); the sleep's dark waits for it (view.prepare's wait for the urgent sets), the dive doesn't (she's under
// her covers till it's on her); her hat-off frames with it when the morning has her hat lying on the floor.
describe("AssetLibrary: a morning read ahead, before the landing", () => {
  const style = loadStyle(), dressed = null; // (the classic witch, dressed)
  type Witchy = { urgentKeys: Set<string>; bare: unknown; bareStale: boolean };
  const witchJobs = (a: AssetLibrary) => inner(a).queue.filter((j): j is Extract<ArtJob, { kind: "witch" }> => j.kind === "witch");
  const urgent = (a: AssetLibrary, j: ArtJob) => (a as unknown as Witchy).urgentKeys.has(`${j.kind}:${j.id}`);
  it("asks her nightie's whole set, urgent, ahead of the island's sets asked ahead, and she isn't dressed in it till it lands", () => {
    const a = new AssetLibrary(style, 11, 4, dressed); // (the night she's leaving, in her clothes)
    a.prefetchType(3);
    const night = wornGenome(dressed, PILE_SLOTS, false); // (rules/wakeUp.ts morningAfter: her hat in the pile)
    a.rebakeWitch(night, true);
    const jobs = witchJobs(a);
    expect(jobs.map(j => ({ genome: j.genome, bare: j.bare, quick: !!j.quick }))).toEqual([{ genome: night, bare: false, quick: false }]); // (last night's look let go)
    expect(urgent(a, jobs[0])).toBe(true);
    expect((jobs[0] as { home?: boolean }).home).toBe(true);
    const q = inner(a).queue;
    expect(q.indexOf(jobs[0])).toBeLessThan(q.findIndex(j => j.kind === "type"));
    expect(a.fullWitchReady).toBe(false); // (in bed she's under her covers till it is: render/view/witch.ts inCovers)
  });
  it("and her hat-off frames too, urgent, when the morning has her hat lying, though last night's look had its own", () => {
    const a = new AssetLibrary(style, 11, 4, dressed);
    (a as unknown as Witchy).bare = {}; // (last night's hat-off frames, drawn)
    a.prefetchType(3);
    const lying = wornGenome(dressed, PILE_SLOTS, true);
    a.rebakeWitch(lying, true); a.askHatOff(); // (View.setWitch with { hatOff: true })
    const jobs = witchJobs(a);
    expect(jobs.map(j => ({ genome: j.genome, bare: j.bare, quick: !!j.quick }))).toEqual([{ genome: lying, bare: false, quick: false }, { genome: lying, bare: true, quick: false }]);
    expect(jobs.every(j => urgent(a, j))).toBe(true);
    const q = inner(a).queue;
    expect(q.indexOf(jobs[1])).toBeLessThan(q.findIndex(j => j.kind === "type"));
    expect(a.bareFresh).toBe(false);
  });
});

// Ed, 2026-11-03: "it's the same nightie on every island every morning. Why do we need to keep re-drawing it?" Her nightie after a
// night played (main.ts keepNightie) is drawn once in the background and kept: never let go from her last few looks, nor dropped from
// the queue when she changes look before it's drawn, so every sail and every bed after puts it on at once.
describe("AssetLibrary: her nightie kept for good", () => {
  const style = loadStyle();
  const night = wornGenome(null, PILE_SLOTS, false) as unknown as Record<string, unknown>;
  const looks = [1, 2, 3, 4, 5, 6].map(n => ({ ...night, accessories: {}, n })); // (her day looks, a station's choices)
  const result = (): ArtResult => ({ ...typeResult(), ours: { grounds: [] } } as unknown as ArtResult);
  const witchJob = (a: AssetLibrary, g: unknown) => inner(a).queue.find((j): j is Extract<ArtJob, { kind: "witch" }> => j.kind === "witch" && !j.bare && !j.quick && JSON.stringify(j.genome) === JSON.stringify(g));
  it("asks for it in the background, behind what's asked already, and keeps it through any number of other looks and nights", () => {
    const a = new AssetLibrary(style, 11, 4, null);
    a.prefetchType(3);
    a.keepLook(night);
    const job = witchJob(a, night)!;
    expect(job).toBeDefined();
    expect(inner(a).queue.indexOf(job)).toBeGreaterThan(inner(a).queue.findIndex(j => j.kind === "type")); // (not ahead of the island)
    a.rebakeWitch({ ...looks[0], n: 99 }); // (she changes her look before it's drawn: still asked)
    expect(witchJob(a, night)).toBe(job);
    inner(a).receive({ job, result: result() });
    expect(a.hasLook(night)).toBe(true);
    for (const g of looks) inner(a).receive({ job: { kind: "witch", id: `look-${(g as { n: number }).n}`, style, genome: g, bare: false } as ArtJob, result: result() });
    expect(a.hasLook(night)).toBe(true); // (six looks since: four kept, and the nightie)
    expect(a.hasLook(looks[0])).toBe(false);
    a.reseat({ seed: 12, typeSeed: 12, treehouse: "home" }); // (a sail: another island)
    expect(a.hasLook(night)).toBe(true);
    const n = inner(a).queue.length; a.keepLook(night); a.keepLook(JSON.parse(JSON.stringify(night))); expect(inner(a).queue.length).toBe(n); // (kept: never asked again)
  });
  // Ed, 2026-11-11: "When I go to the wardrobe and put top/jacket on, trousers are put on too": her top and her trousers each their own
  // piece, so her nightie half on is a look of its own, drawn and kept apart from the whole nightie's.
  it("her nightie half on (her top on, or her trousers) is a look of its own, never the whole nightie's frames", () => {
    const a = new AssetLibrary(style, 11, 4, null);
    const skirt = wornGenome(null, PILE_SLOTS.filter(s => s !== "top"), false), bodice = wornGenome(null, PILE_SLOTS.filter(s => s !== "trousers"), false);
    expect(new Set([night, skirt, bodice].map(g => JSON.stringify(g))).size).toBe(3);
    inner(a).receive({ job: { kind: "witch", id: "skirt", style, genome: skirt, bare: false } as ArtJob, result: result() });
    expect(a.hasLook(skirt)).toBe(true); expect(a.hasLook(night)).toBe(false); expect(a.hasLook(bodice)).toBe(false);
  });
});
