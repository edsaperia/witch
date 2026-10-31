import { expect, it, vi } from "vitest";
import * as THREE from "three";
import type { Atlas } from "./atlas";
import { DodgeEchoView, type DodgePose } from "./dodgeEcho";
import { newDash, startDash, applyDash } from "../rules/dash";
import { newWitch } from "../rules/witch";
import { TUNING } from "../rules/tuning";

function fixture() {
  const atlas: Atlas = { albedo: new THREE.DataTexture(), normal: new THREE.DataTexture(), albedoPal: new THREE.DataTexture(), normalPal: new THREE.DataTexture(), indexed: new THREE.Vector2(), frames: [] };
  const scene = new THREE.Scene(), echoes = new DodgeEchoView(scene, 0.1), world = {}, up = new THREE.Vector3(0, 1, 0);
  echoes.enabled = true;
  const pose = (x: number): DodgePose => ({ sprite: { x, y: 2, z: 0, frame: { uv: [0, 0, 1, 1], w: 10, h: 20 }, flip: true }, lean: [0.1, 0.2, 0.3, 0], sink: 0.5 });
  return { atlas, scene, echoes, world, up, pose };
}
it("creates only bounded silhouette batches from borrowed atlas textures and preserves snapshot pose/lean", () => {
  const p = fixture(), original = p.pose(1), none = { at: -Infinity, until: -Infinity };
  p.echoes.update(p.world, p.atlas, 0, none, original, p.up, true);
  expect(p.scene.children).toHaveLength(0);
  original.sprite.frame.uv[0] = 0.8; original.lean[0] = 9;
  p.echoes.update(p.world, p.atlas, 0.1, { at: 0.1, until: 0.2 }, null, p.up, true);
  expect(p.scene.children).toHaveLength(3);
  const mesh = p.scene.children[0] as THREE.Mesh, material = mesh.material as THREE.ShaderMaterial;
  expect(material.uniforms.uAlbedo.value).toBe(p.atlas.albedo);
  expect(material.uniforms.uLean.value.x).toBe(0.1);
  expect(mesh.geometry.getAttribute('iUv').getX(0)).toBe(0);
  expect(material.transparent).toBe(true); expect(material.depthWrite).toBe(false); expect(material.depthTest).toBe(true);
});
it("keeps world feet fixed while the camera's billboard up changes", () => {
  const p = fixture(), none = { at: -Infinity, until: -Infinity }, dash = { at: 0.1, until: 0.2 };
  p.echoes.update(p.world, p.atlas, 0, none, p.pose(1), p.up, true);
  p.echoes.update(p.world, p.atlas, 0.11, dash, null, p.up, true);
  p.up.set(0, 0.8, -0.6);
  p.echoes.update(p.world, p.atlas, 0.11, dash, null, p.up, true);
  const geo = (p.scene.children[0] as THREE.Mesh).geometry;
  const position = geo.getAttribute('iPos');
  expect(position.getX(0)).toBeCloseTo(1); expect(position.getY(0) + p.up.y * 0.5).toBeCloseTo(2.5); expect(position.getZ(0) + p.up.z * 0.5).toBeCloseTo(0);
});
it("releases owned resources on reset/appearance change without disposing a shared texture", () => {
  const p = fixture(), dispose = vi.spyOn(p.atlas.albedo, "dispose");
  p.echoes.update(p.world, p.atlas, 0, { at: -Infinity, until: -Infinity }, p.pose(0), p.up, true);
  p.echoes.update(p.world, p.atlas, 0.1, { at: 0.1, until: 0.2 }, null, p.up, true);
  const material = (p.scene.children[0] as THREE.Mesh).material as THREE.Material, release = vi.spyOn(material, 'dispose');
  p.echoes.reset(); expect(release).toHaveBeenCalledOnce(); expect(dispose).not.toHaveBeenCalled(); expect(p.scene.children).toHaveLength(0);
});
it("reproduces the invalid mesh-hide OFF capture and provides a history-preserving capture toggle", () => {
  const p = fixture(), none = { at: -Infinity, until: -Infinity }, dash = { at: 0.1, until: 0.3 };
  p.echoes.update(p.world, p.atlas, 0, none, p.pose(0), p.up, true);
  p.echoes.update(p.world, p.atlas, 0.11, dash, null, p.up, true);
  const mesh = p.scene.children[0] as THREE.Mesh;
  const alpha = (mesh.material as THREE.ShaderMaterial).uniforms.uSilhouette.value.w;
  mesh.visible = false;
  p.echoes.update(p.world, p.atlas, 0.11, dash, null, p.up, true);
  expect(mesh.visible).toBe(true); // Review qa.hide(true) + rerender did not remove the echo.
  p.echoes.captureVisible = false;
  expect(mesh.visible).toBe(false); // Also supports prepared-scene Post-only redraw captures.
  p.echoes.update(p.world, p.atlas, 0.11, dash, null, p.up, true);
  expect(mesh.visible).toBe(false);
  p.echoes.captureVisible = true;
  p.echoes.update(p.world, p.atlas, 0.11, dash, null, p.up, true);
  expect(mesh.visible).toBe(true);
  expect((mesh.material as THREE.ShaderMaterial).uniforms.uSilhouette.value.w).toBe(alpha);
});
it("records each real blink source when the default charge chain starts before any arrival was drawn", () => {
  const p = fixture(), dash = newDash(), bounds = { minX: -100, maxX: 100, minZ: -100, maxZ: 100 };
  let witch = { ...newWitch(0, 0), seated: false, mode: "ground" as const };
  dash.charges = TUNING.dash.charges!;
  p.echoes.update(p.world, p.atlas, 0, dash, p.pose(0), p.up, true);
  expect(startDash(dash, witch, 1, 0, 0.1, TUNING, bounds, () => true, TUNING.dash.charges, TUNING.dash.chain)).toBe(true);
  witch = { ...applyDash(dash, witch), mode: "ground" };
  const secondAt = dash.readyAt;
  expect(secondAt).toBeCloseTo(dash.until); // .2s chain and .2s disappearance: no visible frame is required between them.
  p.echoes.update(p.world, p.atlas, 0.11, dash, null, p.up, true);
  expect(startDash(dash, witch, 1, 0, secondAt, TUNING, bounds, () => true, TUNING.dash.charges, TUNING.dash.chain)).toBe(true);
  expect(dash.fromX).toBe(TUNING.dash.distance);
  p.echoes.update(p.world, p.atlas, secondAt, dash, null, p.up, true);
  const sources = p.scene.children.map(m => ((m as THREE.Mesh).geometry as THREE.InstancedBufferGeometry)).filter(g => g.instanceCount > 0).map(g => g.getAttribute('iPos').getX(0));
  expect(sources).toContain(TUNING.dash.distance);
  expect(sources.filter(x => x === 0)).toHaveLength(1);
});
