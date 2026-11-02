// The oak's crown indoors (render/crown.ts; Ed, 2026-10-26, his playtest of the oak on v4522): "Room canopy cuts should fade in
// rather than be instant", and "The witch should have a canopy circle cut around her in the treehouse". The crown's shader needs a
// GL, so this checks what it's given: how far each floor's cut is open over time, and the hole round her.
import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { CrownView, type PlanMap } from "./crown";
import { makeCrown, type HouseOutline } from "../rules/crown";
import { TUNING } from "../rules/tuning";
import OUTLINE from "../../config/house/outline.json";

const O = OUTLINE as unknown as HouseOutline, H = TUNING.treehouse.house!;
const map = (): PlanMap => ({ o: new THREE.Vector3(0, 22, 0), ex: new THREE.Vector3(1, 0, 0), ey: new THREE.Vector3(0, 1, 0), ez: new THREE.Vector3(0, 0, 1) });
const rooms = O.rooms.filter(r => !r.locked && !r.from && r.id !== "terrace");
const HOLE = { x: 480, y: 270, r: 192, edge: 240 };

function setup(fade: number) {
  const crown = new CrownView(makeCrown({ outline: O, floor: H.height, seed: 1 }), 2, O), camera = new THREE.PerspectiveCamera();
  const W = map(), house = map();
  const frame = (here: { x: number; z: number } | null, dt: number, inside = true) => crown.update(camera, W, inside ? house : null, here, dt, HOLE, fade);
  // (in: the crown laid over the floors first, its own ease, before any cut)
  for (let i = 0; i < 20; i++) frame({ x: 0, z: 0 }, 0.1);
  return { crown, frame, U: crown.uniforms };
}

describe("the oak's crown indoors (Ed, 2026-10-26)", () => {
  it("has rooms to walk into", () => expect(rooms.length).toBeGreaterThan(1));

  it("opens a room's cut over cutFade seconds as she comes in, not at once, and closes it the same as she leaves", () => {
    const { crown, frame, U } = setup(0.4), a = rooms[0], key = `room:${a.id}`;
    frame({ x: a.x, z: a.z }, 0.1);
    expect(crown.cutOf(key)).toBeCloseTo(0.25, 5);
    expect((U.uClearW.value as THREE.Vector2).x).toBeCloseTo(0.25, 5);
    expect(U.uClearOn.value).toBe(1);
    frame({ x: a.x, z: a.z }, 0.1);
    expect(crown.cutOf(key)).toBeCloseTo(0.5, 5);
    for (let i = 0; i < 3; i++) frame({ x: a.x, z: a.z }, 0.1);
    expect(crown.cutOf(key)).toBe(1);
    // back out onto the Terrace (its own floor's cut, the notch apart): the room fills back in over the same time as the Terrace's
    // opens
    frame({ x: 0, z: 0 }, 0.1);
    expect(crown.cutOf(key)).toBeCloseTo(0.75, 5);
    expect(crown.cutOf("room:terrace")).toBeCloseTo(0.25, 5);
    for (let i = 0; i < 4; i++) frame({ x: 0, z: 0 }, 0.1);
    expect(crown.cutOf(key)).toBe(0);
    expect(crown.cutOf("room:terrace")).toBe(1);
  });

  it("clears nothing once she's out of the house", () => {
    const { crown, frame, U } = setup(0.4);
    for (let i = 0; i < 30; i++) frame(null, 0.1, false);
    expect(crown.indoors).toBe(false);
    expect(crown.cutOf("room:terrace")).toBe(0);
    expect(U.uClearOn.value).toBe(0);
  });

  it("crossfades from one room to the next, and back into the one just left from where its fade had got to", () => {
    const { crown, frame, U } = setup(0.4), [a, b] = rooms, ka = `room:${a.id}`, kb = `room:${b.id}`;
    for (let i = 0; i < 5; i++) frame({ x: a.x, z: a.z }, 0.1);
    frame({ x: b.x, z: b.z }, 0.1);
    expect(crown.cutOf(kb)).toBeCloseTo(0.25, 5);
    expect(crown.cutOf(ka)).toBeCloseTo(0.75, 5);
    // (the room she's in is the shader's first mask)
    expect((U.uClearW.value as THREE.Vector2).x).toBeCloseTo(0.25, 5);
    expect((U.uClearW.value as THREE.Vector2).y).toBeCloseTo(0.75, 5);
    frame({ x: a.x, z: a.z }, 0.1);
    expect(crown.cutOf(ka)).toBe(1);
    expect(crown.cutOf(kb)).toBe(0);
  });

  it("with cutFade 0, cuts at once as before", () => {
    const { crown, frame } = setup(0), a = rooms[0];
    frame({ x: a.x, z: a.z }, 0.016);
    expect(crown.cutOf(`room:${a.id}`)).toBe(1);
    frame({ x: 0, z: 0 }, 0.016);
    expect(crown.cutOf(`room:${a.id}`)).toBe(0);
  });

  it("cuts the forest's hole round her, where she's drawn, opening as she comes in and closing as she goes out", () => {
    const { crown, frame, U } = setup(0.4), H4 = U.uHerHole.value as THREE.Vector4;
    expect(crown.herHole).toBe(1);
    expect([H4.x, H4.y, H4.z, H4.w]).toEqual([HOLE.x, HOLE.y, HOLE.r, HOLE.edge]);
    frame(null, 0.1, false); // (out of the house: the crown back in the world, where the forest's own hole works)
    for (let i = 0; i < 20 && crown.indoors; i++) frame(null, 0.1, false);
    for (let i = 0; i < 5; i++) frame(null, 0.1, false);
    expect(crown.herHole).toBe(0);
    expect(H4.z).toBe(0);
  });
});

// Ed, 2 Nov (v7061): "The 'see through' effect on the treehouse tree canopy should work the same as the 'see through' effect in
// normal tree canopies". Outdoors the crown takes the forest's own cut-away round her (canopyCutout: uCutout, shut as she rises by
// uTopFade) and the hidden witch's see-through (occlusion: uOcc round uWitch, nearer than uWitchDepth), split as the forest's crowns
// are (render/sprites.ts): its whole pixels in its own pass writing depth (her silhouette shows where it hides her); after her (render
// order 10), what's see-through for her alone in a front pass writing depth, then what's half faded, blended. Indoors, one pass and
// its own look, as before.
describe("the oak's crown outdoors: the forest's see-through and cut-away (Ed, 2 Nov)", () => {
  it("reads the forest's own cut-away and hidden-witch uniforms, the very objects, in both its passes", async () => {
    const { SPRITE_UNIFORMS } = await import("./sprites");
    const { crown } = setup(0.4);
    for (const m of [crown.lobes, crown.bark, crown.frontLobes, crown.frontBark, crown.seeLobes, crown.seeBark]) {
      const u = (m.material as THREE.ShaderMaterial).uniforms;
      for (const k of ["uCutout", "uTopFade", "uCutShape", "uOcc", "uWitch", "uWitchDepth"] as const) expect(u[k]).toBe(SPRITE_UNIFORMS[k]);
    }
    expect((crown.lobes.material as THREE.ShaderMaterial).uniforms.uSeePass.value).toBe(0);
    expect((crown.frontLobes.material as THREE.ShaderMaterial).uniforms.uSeePass.value).toBe(2);
    expect((crown.seeLobes.material as THREE.ShaderMaterial).uniforms.uSeePass.value).toBe(1);
    expect(crown.uniforms.uSeePass.value).toBe(-1); // (its lights, render/strings.ts: one pass, dithered as before)
  });

  it("outdoors, draws its whole pixels writing depth and its see-through passes after her; indoors, one pass as before", () => {
    const { crown, frame } = setup(0.4);
    expect(crown.indoors).toBe(true);
    for (const m of [crown.frontLobes, crown.frontBark, crown.seeLobes, crown.seeBark]) expect((m.material as THREE.Material).visible).toBe(false);
    for (let i = 0; i < 30; i++) frame(null, 0.1, false);
    expect(crown.indoors).toBe(false);
    for (const m of [crown.lobes, crown.bark]) {
      const mt = m.material as THREE.ShaderMaterial;
      expect([mt.depthTest, mt.depthWrite, mt.transparent]).toEqual([true, true, false]);
    }
    for (const [m, depth] of [[crown.frontLobes, true], [crown.frontBark, true], [crown.seeLobes, false], [crown.seeBark, false]] as const) {
      const mt = m.material as THREE.ShaderMaterial;
      expect([mt.visible, mt.depthTest, mt.depthWrite, mt.transparent]).toEqual([true, true, depth, true]);
      expect(m.renderOrder).toBeGreaterThan(10); // (after her: the witch's batch is 10)
      expect(crown.meshes).toContain(m);
    }
    expect(crown.frontLobes.renderOrder).toBeLessThan(crown.seeBark.renderOrder); // (the front pass first, as the forest's: 10.9, then 11)
    // (the approach's fade, flying near the house, no longer turns the whole crown's depth off: its faded lobes go to the see-through pass)
    const camera = new THREE.PerspectiveCamera();
    crown.update(camera, map(), null, null, 0.1, HOLE, 0.4, { x: 0, y: 30, z: 0 }, H.look, 1);
    expect((crown.lobes.material as THREE.ShaderMaterial).depthWrite).toBe(true);
  });

  it("its leaves and bark both take the split (crownAlpha), and the cut-away outdoors by the forest's hole", () => {
    for (const m of (() => { const { crown } = setup(0.4); return [crown.lobes, crown.bark]; })()) {
      const fs = (m.material as THREE.ShaderMaterial).fragmentShader;
      expect(fs).toMatch(/keep = crownAlpha\(/);
      expect(fs).toMatch(/uIndoor < 0\.5 && uCutout\.z > 0\.0 && uTopFade < 0\.996/);
      expect(fs).toMatch(/mix\(1\.0, uOcc\.x, occl\)/); // (down to occlusion.fadeOpacity, as the forest's)
    }
  });
});
