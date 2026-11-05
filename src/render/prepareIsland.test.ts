// The whole island made under the loading screen (Ed, 2026-11-05: "Load the trees, creature art, and coast and lakes, during the
// loading screen."; render/view.ts prepare, render/islandNeeds.ts): prepare asks for every area type's trees, every look the island's
// creatures can wear and the coast's and lakes' dressing, makes the coast's program with the rest, and doesn't finish (the screen
// doesn't fade) till they've landed; only this island's kinds, never another island's or every species'. Not the faces (Ed,
// 2026-11-05: "Skip the animal faces"): asked for as prepare ends, not waited for, and only while the faces are on at all (tuning
// looks.expressions, off since Ed's 2026-11-05 "Scrap animal expressions for now."). The game is only read.
// (Headless: the View a stand-in round its own prepare, with the real art library, its workers stand-ins: results handed in.)
import { afterEach, describe, expect, it, vi } from "vitest";
import { View } from "./view";
import { AssetLibrary } from "./assets";
import { loadStyle } from "./style";
import { hasOverride } from "./overrides";
import { ISLAND_FACES, askIslandArt, askIslandFaces, islandNeeds, type IslandArtAsks } from "./islandNeeds";
import { newGame } from "../rules/game";
import { AREA_TYPES } from "../rules/map";
import { islandOf } from "../rules/rosters";
import { beachOf } from "../rules/mapShape";
import { snapshotGame } from "../rules/nightSnapshot";
import { tuningFromLink } from "../app/linkParams";
import type { ArtJob, ArtResult } from "./artBuild";

vi.mock("./view/creatures", async orig => ({ ...(await orig<typeof import("./view/creatures")>()), drawCreatures: () => {} }));
vi.mock("./view/culling", async orig => ({ ...(await orig<typeof import("./view/culling")>()), viewRect: () => ({ minX: 0, maxX: 0, minZ: 0, maxZ: 0 }) }));
vi.mock("./view/scenery", async orig => ({ ...(await orig<typeof import("./view/scenery")>()), refreshSteps: function* () { /* nothing */ } }));
afterEach(() => { vi.restoreAllMocks(); });

const fox = () => newGame(123, tuningFromLink(new URLSearchParams({ island: "fox" })).tuning);
/** prepare's `near`: each area type by its nearest area to the house. */
function nearOf(g: ReturnType<typeof newGame>): Map<number, number> {
  const m = g.map, near = new Map<number, number>();
  for (let y = m.first; y < m.first + m.n; y++) for (let x = m.first; x < m.first + m.n; x++) {
    if (x === m.centreCell[0] && y === m.centreCell[1]) continue;
    const s = m.siteOf(x, y), t = m.typeOf(x, y), d = Math.hypot(s.x - m.treehouse.x, s.z - m.treehouse.z);
    if (!(near.get(t)! <= d)) near.set(t, d);
  }
  return near;
}

type Lib = { queue: ArtJob[]; inFlight: Set<string>; receive(r: { job: ArtJob; result?: ArtResult }): void; work(ms: number): void };
const inner = (a: AssetLibrary) => a as unknown as Lib;
/** A set as a worker hands it back: one transparent pixel, no trees, no rig parts. */
const pixel = (): ArtResult => ({ px: { width: 1, height: 1, albedo: new Uint8ClampedArray(4), normal: new Uint8ClampedArray(4), frames: [{ uv: [0, 0, 1, 1], w: 1, h: 1 }] }, layout: { big: [] } } as unknown as ArtResult);
const speciesOf = (j: ArtJob): string | null => j.kind === "creature" ? String(j.id) : "species" in j ? (j as { species: string }).species : null;

describe("the island made under the loading screen", () => {
  it("asks only for this island's kinds and types, every look they can wear", () => {
    const g = fox(), near = nearOf(g), n = islandNeeds(g.map, near), roster = new Set(islandOf("fox", 0)!.roster.map(r => r.kind));
    expect(new Set(n.types)).toEqual(new Set(near.keys()));
    for (const sp of n.kinds) expect(roster.has(sp), sp).toBe(true); // (no other island's)
    for (const t of near.keys()) if (AREA_TYPES[t].creature) expect(n.kinds).toContain(AREA_TYPES[t].creature);
    for (const sp of g.map.legendKinds) expect(n.kinds).toContain(sp);
    expect(n.kinds.length).toBeLessThan(roster.size + 1);
    const asked: string[] = [], rec = new Proxy({}, { get: (_t, k) => (...a: unknown[]) => { asked.push(`${String(k)}:${a.join(",")}`); } }) as IslandArtAsks;
    askIslandArt(rec, n, { legendNap: false, coast: true, beachDecor: true, lakes: true });
    for (const sp of n.kinds) {
      for (const want of [`creatureArt:${sp}`, `wokenArt:${sp}`, `napArt:${sp}`]) expect(asked).toContain(want);
      for (const l of [0, 1, 2]) if (!hasOverride(sp, l)) expect(asked).toContain(`rigArt:${sp},${l}`); // (rigArt itself asks only for the kinds with rig parts)
    }
    for (const sp of n.legends) { expect(asked).toContain(`sleepArt:${sp}`); if (!hasOverride(sp, 3)) expect(asked).toContain(`rigArt:${sp},3`); }
    for (const a of asked) { const sp = /^(?:creature|woken|nap|face|idle|glide|sleep|rig)Art:([^,]+)/.exec(a)?.[1]; if (sp) expect(n.kinds, a).toContain(sp); }
    for (const want of ["beachEdgeArt:", "beachArt:", "lakeShoreArt:", "partyWitchArt:"]) expect(asked).toContain(want);
    expect(asked.some(a => a.startsWith("faceArt:"))).toBe(false); // (the faces: askIslandFaces, not waited for)
    const faces: string[] = []; askIslandFaces({ faceArt: (sp, f) => { faces.push(`${sp},${f}`); } }, n);
    expect(faces.sort()).toEqual(n.kinds.flatMap(sp => ISLAND_FACES.map(f => `${sp},${f}`)).sort());
    const plain: string[] = []; askIslandArt(new Proxy({}, { get: (_t, k) => (...a: unknown[]) => { plain.push(`${String(k)}:${a.join(",")}`); } }) as IslandArtAsks, n, { legendNap: true, coast: false, beachDecor: true, lakes: false });
    expect(plain.some(a => /^(sleepArt|beachEdgeArt|beachArt|lakeShoreArt)/.test(a))).toBe(false);
  });

  it("prepare waits for every one of them, with the coast's program made before the shaders compile, and changes nothing in the game", async () => {
    const g = fox(), before = JSON.stringify(snapshotGame(g)), log: string[] = [];
    expect(beachOf(g.map.bounds, g.tuning)).toBeTruthy(); // (fox has a coast)
    const assets = new AssetLibrary(loadStyle(), g.seed, g.tuning.pixelSize);
    inner(assets).work = () => {}; // (no workers here: the sets wait in the queue till a "worker's" result is handed in)
    Object.assign(assets, { homeArt: () => Promise.resolve(), whenIdle: () => Promise.resolve() });
    const v: View = Object.assign(Object.create(View.prototype) as object, {
      game: g, quick: false, assets, shaderDrawStatus: { active: false, skipped: {}, fallback: {} }, shaderEpoch: 0, shaderLandingLimited: false,
      island: { ground: { fill: () => 0, coastAhead: () => log.push("coast program made") } },
    }) as unknown as View;
    const V = v as unknown as Record<string, unknown>;
    V.makeLoadingMist = () => {}; V.render = () => {}; V.warmSteps = function* () { /* nothing */ };
    V.askIsland = () => {};
    V.compileAll = () => { log.push("shaders compiled"); return Promise.resolve(); };
    let done = false;
    const prepared = v.prepare().then(() => { done = true; });
    for (let i = 0; i < 40; i++) await new Promise(r => setTimeout(r, 0));
    const near = nearOf(g), n = islandNeeds(g.map, near);
    const island = inner(assets).queue.filter(j => j.kind !== "treehouse" && j.kind !== "witch" && j.kind !== "soundsystems" && j.kind !== "props");
    expect(new Set(island.filter(j => j.kind === "type").map(j => j.id))).toEqual(new Set(n.types));
    for (const sp of n.kinds) for (const kind of ["creature", "woken", "nap"]) expect(island.some(j => j.kind === kind && speciesOf(j) === sp), `${kind} ${sp}`).toBe(true);
    for (const j of island) { const sp = speciesOf(j); if (sp) expect(n.kinds, `${j.kind}:${j.id}`).toContain(sp); } // (only this island's kinds)
    expect(island.some(j => j.kind === "beachEdge")).toBe(true);
    if (g.map.bounds.lakes) expect(island.some(j => j.kind === "lakeShore")).toBe(true);
    expect(island.some(j => j.kind === "face")).toBe(false); // (not waited for: asked as it ends)
    expect(log).toEqual(["coast program made"]); // (made first; the shaders not compiled while the island's art is out)
    expect(done).toBe(false);
    // All but one landed: still waiting.
    const [last, ...rest] = island;
    for (const job of rest) inner(assets).receive({ job, result: pixel() });
    for (let i = 0; i < 20; i++) await new Promise(r => setTimeout(r, 35));
    expect(done).toBe(false); expect(log).toEqual(["coast program made"]);
    inner(assets).receive({ job: last, result: pixel() });
    await prepared;
    expect(log).toEqual(["coast program made", "shaders compiled"]);
    // The faces off (tuning looks.expressions; Ed, 2026-11-05: "Scrap animal expressions for now."): nothing more asked for as it ends.
    expect(assets.expressions).toBe(false);
    expect(inner(assets).queue.some(j => j.kind === "face")).toBe(false);
    expect(performance.getEntriesByName("witch:prep-island").length).toBeGreaterThan(0);
    expect(JSON.stringify(snapshotGame(g))).toBe(before); // (the rules' state untouched: determinism)
  }, 60000);

  it("with the faces on, asks for every kind's five as it ends (not waited for); with them off, none", () => {
    const g = fox(), near = nearOf(g), n = islandNeeds(g.map, near);
    for (const on of [true, false]) {
      const assets = new AssetLibrary(loadStyle(), g.seed, g.tuning.pixelSize);
      assets.expressions = on;
      const v = Object.assign(Object.create(View.prototype) as object, { game: g, quick: false, assets }) as unknown as Record<string, (near: Map<number, number>) => void>;
      v.islandFaces(near);
      const faces = inner(assets).queue.filter(j => j.kind === "face").map(j => j.id);
      expect(new Set(faces)).toEqual(new Set(on ? n.kinds.flatMap(sp => ISLAND_FACES.map(f => `face-${f}-${sp}`)) : []));
    }
  });

  it("under ?quick=1 asks for none of it ahead and waits for nothing", async () => {
    const g = fox(), assets = new AssetLibrary(loadStyle(), g.seed, g.tuning.pixelSize), n0 = inner(assets).queue.length;
    const v = Object.assign(Object.create(View.prototype) as object, { game: g, quick: true, assets }) as unknown as Record<string, (near: Map<number, number>) => Promise<void>>;
    await v.islandAhead(nearOf(g));
    expect(inner(assets).queue.length).toBe(n0);
  });
});
