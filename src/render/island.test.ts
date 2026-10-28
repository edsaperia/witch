// The island's layers (render/island.ts; docs/plans/sail-without-reload.md, PR 4a): each layer's dispose lets go of what it
// made, and the island's lets go of all of them and leaves nothing of its in the scene. (Headless: the layers that bake art on
// a canvas, the ground, the paths and the runestones, stand in where they must.)
import { afterEach, describe, expect, it, vi } from "vitest";
import * as THREE from "three";
import { newGame } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { Dancefloor } from "./dancefloor";
import { groundHeight, HEIGHT_UNIFORMS, HeightField, useHeightField } from "./height";
import { IslandLayers, type IslandSource } from "./island";
import { LeyLines } from "./leylines";
import { MapTable } from "./mapTable";
import { Minimap } from "./minimap";
import { PathView } from "./paths";
import { SPRITE_UNIFORMS, SpriteBatch } from "./sprites";
import type { Atlas } from "./atlas";
import type { Ground } from "./ground";
import type { MarkerArt } from "./markers";

const g = newGame(123, TUNING), map = g.map, H = { on: true, amplitude: 2, scale: 48, octaves: 3 };

/** Every geometry, material and texture under the objects, each once. */
function parts(objects: THREE.Object3D[]): THREE.EventDispatcher<{ dispose: object }>[] {
  const out = new Set<THREE.EventDispatcher<{ dispose: object }>>();
  for (const o of objects) o.traverse(c => {
    const m = c as THREE.Mesh;
    if (m.geometry) out.add(m.geometry);
    if (m.material) for (const x of [m.material].flat()) out.add(x);
  });
  return [...out];
}
/** Counts each one's dispose events. */
function watch<T extends THREE.EventDispatcher<{ dispose: object }>>(list: T[]): Map<T, number> {
  const n = new Map<T, number>();
  for (const x of list) { n.set(x, 0); x.addEventListener("dispose", () => n.set(x, n.get(x)! + 1)); }
  return n;
}
const allOnce = (n: Map<unknown, number>) => [...n.values()].every(k => k === 1);
const atlas = (): Atlas => ({ albedo: new THREE.DataTexture(new Uint8Array(4), 1, 1), normal: new THREE.DataTexture(new Uint8Array(4), 1, 1), albedoPal: new THREE.DataTexture(new Uint8Array(4), 1, 1), normalPal: new THREE.DataTexture(new Uint8Array(4), 1, 1), indexed: new THREE.Vector2(), frames: [] });

/** A page with just enough of a document for the minimap's canvas. */
function fakeDocument() {
  const removed: unknown[] = [];
  const canvas = { width: 0, height: 0, style: {}, getContext: () => ({}), remove() { removed.push(canvas); } };
  const body = { children: [] as unknown[], appendChild(c: unknown) { body.children.push(c); } };
  vi.stubGlobal("document", { createElement: () => canvas, body });
  return { canvas, body, removed };
}
afterEach(() => { vi.unstubAllGlobals(); });

describe("the island layers' disposes", () => {
  it("the height field lets go of its texture only, leaving the shaders' uniform to the next field", () => {
    const f = new HeightField(map, g.forest, H), spy = vi.fn();
    f.texture.addEventListener("dispose", spy);
    f.dispose();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(HEIGHT_UNIFORMS.uHeight.value).toBe(f.texture); // (left alone: a later field replaces it)
  });

  it("the ley lines let go of every geometry and material of their lines and sparklers", () => {
    const ley = new LeyLines(TUNING.leyLines, () => 0, map), n = watch(parts(ley.meshes));
    expect(n.size).toBeGreaterThan(4);
    ley.dispose();
    expect(allOnce(n)).toBe(true);
  });

  it("the dancefloor lets go of its ball's, beam's and motes' geometries and materials", () => {
    const d = new Dancefloor(map, TUNING, SPRITE_UNIFORMS, 0.1), n = watch(parts([d.ball, d.beam, d.motes]));
    expect(n.size).toBe(6);
    d.dispose();
    expect(allOnce(n)).toBe(true);
  });

  it("the paths let go of their meshes' geometries and materials and their strips' textures", () => {
    // (Made by hand: its strips bake on a canvas. Two strips, one stream with no texture.)
    const p = Object.create(PathView.prototype) as PathView;
    (p as { group: THREE.Group }).group = new THREE.Group();
    const strips = [new THREE.Texture(), new THREE.Texture()];
    for (const t of [...strips, null]) p.group.add(new THREE.Mesh(new THREE.BufferGeometry(), new THREE.ShaderMaterial({ uniforms: { ...HEIGHT_UNIFORMS, ...(t ? { uStrip: { value: t } } : {}) } })));
    const shared = watch([HEIGHT_UNIFORMS.uHeight.value as THREE.Texture].filter(Boolean)), n = watch([...parts([p.group]), ...strips]);
    p.dispose();
    expect(n.size).toBe(8);
    expect(allOnce(n)).toBe(true);
    expect([...shared.values()].every(k => k === 0)).toBe(true); // (the page's shared uniforms' textures left alone)
  });

  it("the minimap takes its canvas off the page", () => {
    const d = fakeDocument(), m = new Minimap(d.body as unknown as HTMLElement, map);
    expect(d.body.children).toContain(d.canvas);
    m.dispose();
    expect(d.removed).toContain(d.canvas);
  });

  it("the map table lets go of its disc's geometry and material", () => {
    const t = new MapTable(2), n = watch(parts([t.mesh]));
    t.dispose();
    expect(n.size).toBe(2);
    expect(allOnce(n)).toBe(true);
  });
});

describe("the island layers", () => {
  it("built off the scene, go in only as they're attached, their hills then the field in use", () => {
    const scene = new THREE.Scene(), src = { game: g, style: {}, mpp: 0.1, maxTexture: 4096, assets: { treehouse: { atlas: atlas() } }, deck: null } as unknown as IslandSource;
    const island = new IslandLayers(scene, src, false);
    island.heights = { heightAt: () => 3 } as unknown as HeightField;
    useHeightField(null);
    expect(scene.children).not.toContain(island.root);
    island.attach();
    expect(scene.children).toContain(island.root);
    expect(groundHeight(1, 1)).toBe(3);
    useHeightField(null);
  });

  it("are built under one root in the scene, and its dispose takes them all out and lets go of all of them", () => {
    const d = fakeDocument();
    const scene = new THREE.Scene(), house = atlas();
    const src = { game: g, style: {}, mpp: 0.1, maxTexture: 4096, assets: { treehouse: { atlas: house } }, deck: null } as unknown as IslandSource;
    const island = new IslandLayers(scene, src);
    expect(scene.children).toContain(island.root);
    // (The ground, the paths and the runestones' art bake on a canvas: stand-ins for them, the rest real.)
    island.heights = new HeightField(map, g.forest, H);
    const groundMesh = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial());
    const ground = { mesh: groundMesh, dispose: vi.fn() }; island.ground = ground as unknown as Ground; island.root.add(groundMesh);
    const paths = Object.create(PathView.prototype) as PathView; (paths as { group: THREE.Group }).group = new THREE.Group();
    paths.group.add(new THREE.Mesh(new THREE.BufferGeometry(), new THREE.ShaderMaterial())); island.paths = paths; island.root.add(paths.group);
    island.buildTreehouse();
    island.minimap = new Minimap(d.body as unknown as HTMLElement, map);
    const stones = atlas(), markerArt = { atlas: stones, dispose: vi.fn() }; island.markerArt = markerArt as unknown as MarkerArt;
    island.markerBatch = new SpriteBatch(stones, 0.1, { solid: true }); island.root.add(...island.markerBatch.meshes);
    island.markerShadowBatch();
    island.buildLey();
    island.buildDancefloor();
    const mine = [...island.root.children];
    expect(mine.length).toBeGreaterThan(10);
    const n = watch([...parts(mine).filter(x => x !== groundMesh.geometry && x !== groundMesh.material), island.heights.texture]);
    const art = watch([house.albedo, house.normal]);
    island.dispose();
    expect(scene.children).not.toContain(island.root);
    let left = 0; scene.traverse(o => { if (mine.includes(o)) left++; });
    expect(left).toBe(0);
    expect(island.root.children.length).toBe(0);
    expect(allOnce(n)).toBe(true);
    expect(ground.dispose).toHaveBeenCalledTimes(1);
    expect(markerArt.dispose).toHaveBeenCalledTimes(1);
    expect(d.removed).toContain(d.canvas);
    expect([...art.values()].every(k => k === 0)).toBe(true); // (the treehouse's atlas is the AssetLibrary's)
  });
});
