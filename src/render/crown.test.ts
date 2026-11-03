// The oak's crown indoors (render/crown.ts). Ed, 2026-11-03 (the house one room): it clears only round her, the forest's own cut-away
// (canopyCutout's radius and soft ragged edge, where she's drawn), no longer over the whole room she's in; it opens over cutFade
// seconds as she comes in (Ed, 2026-10-26: "Room canopy cuts should fade in rather than be instant", "The witch should have a canopy
// circle cut around her in the treehouse"). The crown's shader needs a GL, so this checks what it's given.
import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { CrownView, cutawayRadius, type PlanMap } from "./crown";
import { makeCrown, type HouseOutline } from "../rules/crown";
import { TUNING } from "../rules/tuning";
import OUTLINE from "../../config/house/outline.json";

const O = OUTLINE as unknown as HouseOutline, H = TUNING.treehouse.house!;
const map = (): PlanMap => ({ o: new THREE.Vector3(0, 22, 0), ex: new THREE.Vector3(1, 0, 0), ey: new THREE.Vector3(0, 1, 0), ez: new THREE.Vector3(0, 0, 1) });
const HOLE = { x: 480, y: 270, r: cutawayRadius(TUNING.canopyCutout, 960), edge: TUNING.canopyCutout.edge * 960 };

function setup(fade: number) {
  const crown = new CrownView(makeCrown({ outline: O, floor: H.height, seed: 1 }), 2, O), camera = new THREE.PerspectiveCamera();
  const W = map(), house = map();
  const frame = (dt: number, inside = true) => crown.update(camera, W, inside ? house : null, dt, HOLE, fade);
  // (in: the crown laid over the floors first, its own ease, before any cut)
  for (let i = 0; i < 20; i++) frame(0.1);
  return { crown, frame, U: crown.uniforms };
}

describe("the oak's crown indoors (Ed, 2026-11-03: a radius round her, not her room)", () => {
  it("cuts round her the outdoor cut-away's radius: half canopyCutout's screenFraction of the screen's width (0.2 of it)", () => {
    expect(cutawayRadius({ screenFraction: 0.4 }, 960)).toBeCloseTo(192, 9);
    expect(HOLE.r).toBeCloseTo(0.5 * TUNING.canopyCutout.screenFraction * 960, 9);
    const { U } = setup(0.4), H4 = U.uHerHole.value as THREE.Vector4;
    expect([H4.x, H4.y, H4.z, H4.w]).toEqual([HOLE.x, HOLE.y, HOLE.r, HOLE.edge]);
  });

  it("has no room-wide clearing left: no floor masks in its uniforms or shaders", () => {
    const { crown, U } = setup(0.4);
    for (const k of ["uClear", "uClearB", "uClearW", "uClearBox", "uClearOn"]) expect(k in U, k).toBe(false);
    for (const m of [crown.lobes, crown.bark]) expect((m.material as THREE.ShaderMaterial).fragmentShader).not.toMatch(/uClear\b|inClear/);
  });

  it("opens the hole round her over cutFade seconds as she comes in, and closes it the same as she goes out", () => {
    const { crown, frame, U } = setup(0.4), H4 = U.uHerHole.value as THREE.Vector4;
    expect(crown.herHole).toBe(1);
    for (let i = 0; i < 30 && crown.indoors; i++) frame(0.1, false); // (out of the house: the crown back in the world, where the forest's own hole works)
    for (let i = 0; i < 5; i++) frame(0.1, false);
    expect(crown.herHole).toBe(0); expect(H4.z).toBe(0);
    for (let i = 0; i < 30 && !crown.indoors; i++) frame(0.1);
    const opened = crown.herHole;
    expect(opened).toBeGreaterThan(0); expect(opened).toBeLessThan(1);
    frame(0.1); expect(crown.herHole).toBeCloseTo(Math.min(1, opened + 0.25), 9);
    for (let i = 0; i < 5; i++) frame(0.1);
    expect(crown.herHole).toBe(1); expect(H4.z).toBeCloseTo(HOLE.r, 9);
  });

  it("with cutFade 0, cuts at once", () => {
    const { crown, frame } = setup(0);
    expect(crown.herHole).toBe(1);
    for (let i = 0; i < 30 && crown.indoors; i++) frame(0.016, false);
    frame(0.016, false); expect(crown.herHole).toBe(0);
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
    for (let i = 0; i < 30; i++) frame(0.1, false);
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
    crown.update(camera, map(), null, 0.1, HOLE, 0.4, { x: 0, y: 30, z: 0 }, H.look, 1);
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
