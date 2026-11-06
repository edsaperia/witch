// The loading mist holds till its area's contents are drawn, then fades (Ed, 2026-11-06: "Make sure things load and render before
// the mist disappears, and mist should fade away smoothly over a few seconds not vanish"): render/loadingMist.ts, held by
// render/view/mistReady.ts (an area type's trees, stumps, campfires and creatures' plain look loaded and drawn with their own linked
// program, not just arrived). Headless: the mist's material is made, never drawn; its uniforms are read.
import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { LoadingMist } from "./loadingMist";
import { goneAt, typeReaches } from "./loadingFront";
import { areaParts, areaReady, seaReady, type MistSource, type Shown } from "./view/mistReady";
import { AREA_TYPES } from "../rules/map";
import tuning from "../../config/tuning.json";

const T = tuning.loadingMist;
const house = { x: 0, z: 0 }, cells = [{ type: 1, x: 200, z: 0 }, { type: 2, x: 0, z: 400 }];
const mist = (K = T) => new LoadingMist(K, typeReaches(cells, house, 160), house, { minX: -500, minZ: -500, maxX: 500, maxZ: 500 }, {}, null, new THREE.Vector2(1, 1), 8);
const sinces = (m: LoadingMist) => (m as unknown as { sinces: Float32Array }).sinces;

describe("the loading mist waits for its areas to be drawn", () => {
  it("holds a type's mist while it isn't ready, however long, and starts it going only the frame it is", () => {
    const m = mist(), ready = new Set<number>();
    for (let f = 0; f < 600; f++) m.update(f / 10, t => ready.has(t), () => false); // (a minute of frames: art in or not, never drawn)
    expect(sinces(m)[1]).toBe(-1); expect(sinces(m)[2]).toBe(-1);
    expect(m.beganAt(1)).toBeUndefined();
    ready.add(1);
    m.update(60.1, t => ready.has(t), () => false);
    expect(m.beganAt(1)).toBeCloseTo(60.1, 6); expect(m.beganAt(2)).toBeUndefined();
    m.update(61.1, t => ready.has(t), () => false);
    expect(sinces(m)[1]).toBeCloseTo(1, 6); expect(sinces(m)[2]).toBe(-1);
  });
  it("on a sail, a type whose art was in before the first frame waits to be drawn all the same (not cleared from the start)", () => {
    const m = mist();
    m.update(0, () => false, () => false, () => false); // (a sail's: nothing counts as there before it's drawn)
    expect(m.beganAt(1)).toBeUndefined();
    const load = mist();
    load.update(0, () => false, () => false, () => true); // (a load's: made and drawn under the loading screen, clear from the start)
    expect(load.beganAt(1)).toBe(-1e9);
  });
  it("takes the fade knob's seconds (after its front) to go, and only then is gone", () => {
    for (const fade of [1, T.fade, 6]) {
      const K = { ...T, fade }, m = mist(K), reach = typeReaches(cells, house, 160).get(1)!;
      m.update(0, () => true, () => true);
      const gone = goneAt(reach, K);
      m.update(gone - 0.05, () => true, () => true);
      expect(sinces(m)[1]).toBeCloseTo(gone - 0.05, 4); // (still going)
      m.update(gone + 0.01, () => true, () => true);
      expect(sinces(m)[1]).toBe(1e6); // (gone)
      expect(gone).toBeGreaterThanOrEqual(fade);
    }
  });
  it("holds the sea's mist till the ground's own program is drawn and the ground in view filled", () => {
    const m = mist();
    m.update(0, () => true, () => false);
    expect(m.seaBeganAt).toBeUndefined();
    m.update(1, () => true, () => seaReady(true, 3)); // (drawn, but tiles in view still to fill)
    expect(m.seaBeganAt).toBeUndefined();
    m.update(2, () => true, () => seaReady(false, 0)); // (filled, but only the loading stand-in drawn)
    expect(m.seaBeganAt).toBeUndefined();
    m.update(3, () => true, () => seaReady(true, 0));
    expect(m.seaBeganAt).toBe(3);
  });
});

describe("an area's contents: loaded is not enough, they must be drawn", () => {
  const batch = (count: number, drawn?: number): Shown => ({ count, meshes: [{ userData: drawn === undefined ? {} : { drawn } } as unknown as THREE.Object3D] });
  const t = AREA_TYPES.findIndex(a => a.creature), sp = AREA_TYPES[t].creature!;
  const source = (o: Partial<{ trees: boolean; treesDrawn: boolean; listed: number; creature: boolean; creatureDrawn: boolean; stump: boolean; stumpDrawn: boolean; props: boolean; fireDrawn: boolean; partyFires: boolean }>): MistSource => ({
    assets: { hasType: () => !!o.trees, hasCreature: () => !!o.creature, hasStump: () => !!o.stump, version: 5, home: { props: o.props ?? true } },
    typeBatches: new Map([[t, batch(10, o.treesDrawn ? 1 : undefined)]]), creatureBatches: new Map([[sp, batch(3, o.creatureDrawn ? 1 : undefined)]]),
    propBatch: batch(2, o.fireDrawn ?? true ? 1 : undefined), markerBatch: batch(0), stumpBatches: new Map([["s", batch(1, o.stumpDrawn ? 1 : undefined)]]),
    sceneryListed: o.listed ?? 9, stumpsOf: () => [{} as never], stumps: true, partyFires: o.partyFires ?? true,
  });
  const all = { trees: true, treesDrawn: true, creature: true, creatureDrawn: true, stump: true, stumpDrawn: true, props: true, fireDrawn: true, partyFires: true };
  it("is ready only with every part loaded and drawn", () => {
    expect(areaReady(areaParts(source(all), t))).toBe(true);
    for (const k of Object.keys(all) as (keyof typeof all)[]) expect(areaReady(areaParts(source({ ...all, [k]: false }), t)), k).toBe(false);
  });
  it("its trees: the art in and drawn, not just arrived; nor before the scenery has listed them", () => {
    expect(areaParts(source({ ...all, treesDrawn: false }), t).trees).toBe(false);
    expect(areaParts(source({ ...all, listed: 1 }), t).trees).toBe(false); // (listed before the art came: not on screen yet)
  });
  it("its creatures: their plain look in and drawn where any are in view", () => {
    expect(areaParts(source({ ...all, creatureDrawn: false }), t).creatures).toBe(false);
    expect(areaParts(source({ ...all, creature: false }), t).creatures).toBe(false);
  });
});
