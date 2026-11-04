import { expect, it } from "vitest";
import * as THREE from "three";
import { Refraction } from "./refraction";
import { refractable } from "./refractionMath";

const place = (p: THREE.Vector3) => p;
function fixture() {
  const camera = new THREE.PerspectiveCamera(60, 16 / 9, 0.1, 100); camera.updateMatrixWorld();
  const fx = new Refraction(), world = {}, near = { x: 0, z: -10 };
  const fire = [{ x: 0, z: -10, scale: 1 }], cast = { at: 1, x: 0, y: 1, z: -10 };
  const update = (time: number, enabled = true, nextWorld = world) => fx.update(nextWorld, time, enabled, fire, cast, camera, place, near);
  return { fx, camera, world, fire, cast, update, near };
}
it("projects a continuous fire and one pressure wave from world anchors, including camera motion", () => {
  const p = fixture(); p.update(1.1);
  expect(p.fx.count).toBe(2);
  const before = p.fx.shapes[0].clone();
  p.camera.position.x = 2; p.camera.updateMatrixWorld(); p.update(1.1);
  expect(p.fx.shapes[0].x).toBeLessThan(before.x);
  expect(p.fx.states[1].z).toBeCloseTo(0.1 / 0.65);
});
it("does not duplicate a held cast and keeps motion frozen on a paused clock", () => {
  const p = fixture(); p.update(1.1);
  const shape = p.fx.shapes.map(v => v.toArray()), state = p.fx.states.map(v => v.toArray());
  for (let i = 0; i < 10; i++) p.update(1.1);
  expect(p.fx.count).toBe(2); expect(p.fx.shapes.map(v => v.toArray())).toEqual(shape); expect(p.fx.states.map(v => v.toArray())).toEqual(state);
  p.update(1.2); expect(p.fx.states[1].z).toBeGreaterThan(state[1][2]);
});
it("expires waves while off and never resurrects them on quality re-enable", () => {
  const p = fixture(); p.update(1.1, false); expect(p.fx.count).toBe(0);
  p.update(2, false); p.update(2, true); expect(p.fx.count).toBe(1);
});
it("does not consume a cast before interpolation reaches its timestamp, and resets on island/time replacement", () => {
  const p = fixture(); p.update(0.99); expect(p.fx.count).toBe(1);
  p.update(1); expect(p.fx.count).toBe(2);
  p.update(0.5); expect(p.fx.count).toBe(1);
  p.fx.update({}, 0.5, true, [], null, p.camera, place, p.near); expect(p.fx.count).toBe(0);
});
it("culls behind-camera and distant fires without allocating any render targets", () => {
  const p = fixture();
  p.fx.update(p.world, 1, true, [{ x: 0, z: 10, scale: 1 }, { x: 1000, z: -10, scale: 1 }], null, p.camera, place, p.near);
  expect(p.fx.count).toBe(0); expect(p.fx.shapes).toHaveLength(4); expect(p.fx.states).toHaveLength(4);
});
it("chooses one nearest visible fire rather than allowing an offscreen fire to hide it", () => {
  const p = fixture();
  p.fx.update(p.world, 1, true, [{ x: 0, z: -10, scale: 1 }, { x: 0, z: 1, scale: 1 }], null, p.camera, place, { x: 0, z: 1 });
  expect(p.fx.count).toBe(1); expect(p.fx.shapes[0].x).toBeCloseTo(0.5);
});
it("protects foreground surfaces against the fire's base depth, not merely its nearer raised plume", () => {
  const p = fixture();
  p.camera.position.set(0, 10, 10); p.camera.lookAt(0, 0, -10); p.camera.updateMatrixWorld(); p.update(1.1);
  const base = new THREE.Vector3(0, 0, -10).project(p.camera).z * 0.5 + 0.5;
  const top = new THREE.Vector3(0, 4.5, -10).project(p.camera).z * 0.5 + 0.5;
  expect(p.fx.states[0].x).toBeGreaterThanOrEqual(base);
  expect(refractable((base + top) / 2, p.fx.states[0].x)).toBe(false);
});
