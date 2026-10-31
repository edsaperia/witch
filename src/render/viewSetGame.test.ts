// The view taking another night (render/view.ts setGame; docs/plans/sail-without-reload.md B 3-5, PR 4b): the new island built
// off the scene, swapped in, and only then the old let go; the art reseated; every part that keeps something of a night reset; and
// the string lights' clear letting go of what it made. (Headless: no WebGL, so the View is a stand-in round its own setGame, and the
// island's layers that bake on a canvas stand-ins too.)
import { afterEach, describe, expect, it, vi } from "vitest";
import * as THREE from "three";
import { newGame as fullGame, type Game } from "../rules/game";
import { smallWorld } from "../test/worlds";
const newGame = smallWorld(fullGame, "Headless view reset tests mock island layers and assert disposal/order, independent of area diversity.");
import { TUNING } from "../rules/tuning";
import { islandArtSeed } from "./artCache";
import { groundHeight } from "./height";
import { IslandLayers } from "./island";
import { StringLightsView } from "./strings";
import { View } from "./view";
import { creatureCacheSizes } from "./view/creatures";

afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

/** A stand-in element: any property a function that hands back another, style taking anything. */
function fakeEl(): unknown {
  const o: Record<string | symbol, unknown> = { style: {}, remove() {}, append() {} };
  return new Proxy(o, { get: (t, k) => (k in t ? t[k] : k === "then" ? undefined : () => fakeEl()) });
}

/** Something that records each call made on it (by its name), and answers nothing. */
function recorder(name: string, log: string[]): Record<string, (...a: unknown[]) => void> {
  return new Proxy({}, { get: (_t, k) => (k === "then" ? undefined : (...a: unknown[]) => { log.push(`${name}.${String(k)}${a[0] && typeof a[0] === "object" && "seed" in (a[0] as object) ? `(${(a[0] as Game).seed})` : ""}`); }) });
}

/** The island's layers' builds as stand-ins (each its own stand-in parts, every let-go logged with the island's name). */
function standInBuilds(log: string[]): void {
  const P = IslandLayers.prototype, name = (i: IslandLayers) => (i as unknown as { tag: string }).tag;
  const part = (i: IslandLayers, what: string) => ({ dispose: () => log.push(`${name(i)}.${what}.dispose`), release: () => log.push(`${name(i)}.${what}.release`) });
  vi.spyOn(P, "groundSteps").mockImplementation(function* (this: IslandLayers) { // (buildGround runs it straight through)
    const own = (this as unknown as { tag: string }).tag = `island${log.filter(l => l === "built").length}`;
    log.push("built");
    const h = Number(own.slice(6)) + 1;
    this.heights = { heightAt: () => h, dispose: () => log.push(`${own}.heights.dispose`) } as never;
    const mesh = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.ShaderMaterial({ uniforms: { uCanopy: { value: own } } }));
    this.ground = { mesh, setCanopyShadow: () => {}, dispose: () => log.push(`${own}.ground.dispose`) } as never;
    this.root.add(mesh);
  });
  vi.spyOn(P, "pathSteps").mockImplementation(function* (this: IslandLayers) { this.paths = part(this, "paths") as never; });
  vi.spyOn(P, "buildTreehouse").mockImplementation(function (this: IslandLayers) { this.treehouseBatch = part(this, "treehouse") as never; });
  vi.spyOn(P, "markerSteps").mockImplementation(function* (this: IslandLayers) { this.minimap = { on: true, ...part(this, "minimap") } as never; this.markerArt = part(this, "markerArt") as never; this.markerBatch = part(this, "markers") as never; });
  vi.spyOn(P, "buildLey").mockImplementation(function (this: IslandLayers) { this.ley = { scale: () => {}, ...part(this, "ley") } as never; });
  vi.spyOn(P, "buildDancefloor").mockImplementation(function (this: IslandLayers) { this.dancefloor = part(this, "dancefloor") as never; });
}

/** A View round its own setGame: its scene, its old island and every part it keeps, stand-ins that log what's done to them. */
function standInView(g: Game, log: string[]): View {
  const v = Object.create(View.prototype) as View & Record<string, unknown>, scene = new THREE.Scene();
  const island = new IslandLayers(scene, { game: g, style: {}, mpp: 0.1, maxTexture: 4096, assets: {} as never, deck: null });
  island.buildGround(); island.buildPaths(); island.buildTreehouse(); island.buildMarkers(); island.buildLey(); island.buildDancefloor();
  const batch = (what: string) => ({ meshes: [new THREE.Mesh()], release: () => log.push(`${what}.release`), dispose: () => log.push(`${what}.dispose`), appearU: { value: 0.3 } });
  const decor = batch("decorShadows");
  Object.assign(v, {
    game: g, scene, island, style: {}, mpp: 0.1, leyBase: 1, renderer: { capabilities: { maxTextureSize: 4096 } },
    typeBatches: new Map([[4, batch("type4")]]),
    trunkShadowBatches: new Map<number | string, unknown>([[4, batch("type4Shadows")], ["markers", batch("markersShadows")], ["decor", decor]]),
    appearing: new Map([[decor, 0]]),
    markerCache: { wave: 3, n: 9, list: [] }, plan: { key: "old", waves: new Map() }, prepared: true,
    assets: { reseat: (o: { seed: number; typeSeed: number }) => log.push(`assets.reseat(${o.seed},${o.typeSeed})`), prefetchType: () => {} },
    partyView: { gen: recorder("soundsystemGen", log) }, houseRooms: null, potionObservers: recorder("potionObservers", log),
  });
  for (const k of ["beachView", "grass", "strings", "leashView", "lasers", "borders", "inviteView", "partyObjects", "rig", "holograms", "glades", "wisps", "clouds", "lightRings", "fireworks", "swoopTrails", "spellFx", "trail", "combatLight", "occlusion"])
    v[k] = recorder(k, log);
  // (when the old island is let go, and what's in the scene then)
  const dispose = island.dispose.bind(island);
  island.dispose = () => { log.push(`old.dispose(new in the scene: ${scene.children.includes(v.island.root)}, field: ${groundHeight(0, 0)})`); dispose(); };
  const attach = IslandLayers.prototype.attach;
  vi.spyOn(IslandLayers.prototype, "attach").mockImplementation(function (this: IslandLayers) { attach.call(this); log.push(`attach(${(this as unknown as { tag: string }).tag})`); });
  return v;
}

describe("View.setGame (another night in the same view)", () => {
  const a = newGame(123, TUNING), b = newGame(456, TUNING);

  it("builds the new island off the scene, swaps it in, then lets the old go; reseats the art; resets every part", () => {
    const log: string[] = [];
    vi.stubGlobal("document", { createElement: () => fakeEl(), body: fakeEl() }); // (the house's rooms' labels)
    standInBuilds(log);
    const v = standInView(a, log), old = v.island;
    v.setGame(b);
    const at = (s: string) => log.findIndex(l => l.startsWith(s));
    // the order: the art reseated, the new island built (not yet in the scene), swapped in, then the old let go
    expect(at("assets.reseat")).toBeLessThan(log.lastIndexOf("built"));
    expect(log.filter(l => l === "built").length).toBe(2); // (the old one's, made by the stand-in view, and the new)
    expect(at("attach(island1)")).toBeGreaterThan(log.lastIndexOf("built"));
    expect(at("old.dispose")).toBeGreaterThan(at("attach(island1)"));
    expect(log).toContain("old.dispose(new in the scene: true, field: 2)"); // (the new hills the field in use already)
    expect(at("island0.ground.dispose")).toBeGreaterThan(at("old.dispose"));
    expect(log.some(l => l.startsWith("island1.") && l.endsWith(".dispose"))).toBe(false);
    expect(v.scene.children).toContain(v.island.root);
    expect(v.scene.children).not.toContain(old.root);
    expect(v.island).not.toBe(old);
    expect(v.island.minimap.on).toBe(true); // (carried: M's toggle is the page's)
    // the art: the new night's seed, the island's own seed for its trees
    expect(log).toContain(`assets.reseat(456,${islandArtSeed(b.tuning.map?.world ?? 0, b.tuning.map?.island ?? "home")})`);
    // the last island's batches let go (their atlases are the art's), its runestones' shadows dropped, the page's kept
    expect(log).toContain("type4.release");
    expect(log).toContain("type4Shadows.dispose");
    expect(v.typeBatches.size).toBe(0);
    expect([...v.trunkShadowBatches.keys()]).toEqual(["decor"]);
    expect(log).toContain("soundsystemGen.reset");
    expect(log).toContain("potionObservers.dispose");
    // its own records afresh, and the game re-pointed everywhere
    expect(v.game).toBe(b);
    expect(v.markerCache.wave).toBe(-1);
    expect(v.plan.key).toBe("");
    expect(v.appearing.size).toBe(0);
    expect(creatureCacheSizes()).toEqual([0, 0, 0, 0]);
    for (const k of ["strings", "leashView", "lasers", "borders", "inviteView"]) expect(log).toContain(`${k}.setGame(456)`);
    for (const k of ["partyObjects", "rig", "holograms", "glades", "wisps", "fireworks", "swoopTrails", "spellFx", "combatLight", "occlusion"]) expect(log).toContain(`${k}.reset`);
    for (const k of ["beachView.setGround", "grass.setMap", "clouds.reseed", "lightRings.reseed", "trail.newNight"]) expect(at(k)).toBeGreaterThan(-1);
    expect(at("beachView.setGround")).toBeLessThan(at("old.dispose")); // (off the old ground before it's let go)
    // this island's treehouse has the house's rooms: made, in the scene
    if (v.houseRooms) for (const m of v.houseRooms.meshes) expect(v.scene.children).toContain(m);
  });
});

describe("StringLightsView.clear", () => {
  it("takes every area's lines out and lets go of their geometry, and a new game starts with none", () => {
    const scene = new THREE.Scene(), s = new StringLightsView(scene, game());
    s.update();
    const groups = scene.children.slice();
    expect(groups.length).toBeGreaterThan(0);
    const geos = new Set<THREE.BufferGeometry>();
    for (const o of groups) o.traverse(c => { const g = (c as THREE.Mesh).geometry; if (g) geos.add(g); });
    let freed = 0;
    for (const g of geos) g.addEventListener("dispose", () => freed++);
    s.setGame(game(456));
    expect(scene.children.length).toBe(0);
    expect(freed).toBe(geos.size);
  });
});

function game(seed = 123): Game { return newGame(seed, TUNING); }
