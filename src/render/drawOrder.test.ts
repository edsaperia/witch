// What's on top of what by the world, never the camera (render/drawOrder.ts; Ed, 2026-11-11, from blendi's "Oil paint": "Which of
// two overlapping strokes is on top must never depend on where the camera is").
import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { DEPTH_PITCH, worldDepth, worldOpaqueSort, worldTransparentSort } from "./drawOrder";

/** A render item as three makes one, its `z` the camera depth three would give it from `cam`. */
function item(id: number, mesh: THREE.Mesh, cam: THREE.PerspectiveCamera, renderOrder = 0.5) {
  mesh.updateMatrixWorld(true);
  const g = mesh.geometry; g.computeBoundingSphere();
  const m = new THREE.Matrix4().multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse);
  const z = g.boundingSphere!.center.clone().applyMatrix4(mesh.matrixWorld).applyMatrix4(m).z;
  return { id, groupOrder: 0, renderOrder, z, object: mesh, geometry: g, material: mesh.material as unknown as { id: number } };
}
/** The game's camera: looking north and down at `pitch` degrees, `d` metres back from (x, 0, z). */
function camera(x: number, z: number, pitch = 34, d = 60): THREE.PerspectiveCamera {
  const c = new THREE.PerspectiveCamera(20, 16 / 9, 1, 900), a = (pitch * Math.PI) / 180;
  c.position.set(x, Math.sin(a) * d, z + Math.cos(a) * d); c.lookAt(x, 0, z); c.updateMatrixWorld(true);
  return c;
}
/** A flat strip on the ground from (x0, z0) to (x1, z1), as a path kind's mesh is (its vertices in the world, the mesh at the origin). */
function strip(x0: number, z0: number, x1: number, z1: number): THREE.Mesh {
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute([x0, 0, z0, x1, 0, z1, x1, 0.1, z1], 3));
  return new THREE.Mesh(g, new THREE.MeshBasicMaterial({ transparent: true }));
}
/** three's own sort for blended things (WebGLRenderLists reversePainterSortStable). */
const threeTransparent = (a: { renderOrder: number; z: number; id: number }, b: typeof a) => a.renderOrder - b.renderOrder || b.z - a.z || a.id - b.id;
const order = <T extends { id: number }>(xs: T[], f: (a: T, b: T) => number) => [...xs].sort(f).map(x => x.id);

describe("the draw order (render/drawOrder.ts)", () => {
  // Two paths of different kinds meeting: one running east-west, one north-south (each kind is one mesh across the map, its
  // middle wherever its strips' box puts it: here 20 m north of the crossing and 40 m south of it).
  const ew = strip(-200, -20, 200, -20), ns = strip(30, -160, 30, 240);

  it("three's own put the blended strips one way or the other by where the camera stood: ours never", () => {
    const seen = new Set<string>(), ours = new Set<string>();
    // (once a middle is behind the camera, three counts it farthest of all: walking north past the north-south path's middle
    // swaps the two, where the paths cross in front of her)
    for (const [x, z, p] of [[0, 0, 34], [0, 30, 26], [0, -60, 34], [20, -90, 46], [-40, -30, 30]] as const) {
      const c = camera(x, z, p), items = [item(1, ew, c), item(2, ns, c)];
      seen.add(order(items, threeTransparent).join());
      ours.add(order(items, worldTransparentSort).join());
    }
    expect(seen.size).toBe(2); // (the same two strips swapped as the camera moved)
    expect(ours.size).toBe(1);
  });

  it("lays blended things far to near along the game camera's way of looking, and opaque ones near to far after their material", () => {
    const c = camera(0, 0), far = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ transparent: true })), near = far.clone();
    far.position.set(0, 0, -30); near.position.set(3, 0, 10);
    expect(order([item(1, near, c), item(2, far, c)], worldTransparentSort)).toEqual([2, 1]);
    const m = new THREE.MeshBasicMaterial(), a = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), m), b = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), m);
    a.position.set(0, 0, -30); b.position.set(0, 0, 10);
    expect(order([item(1, a, c), item(2, b, c)], worldOpaqueSort)).toEqual([2, 1]);
    // renderOrder first, as ever
    expect(order([item(1, near, c, 0.4), item(2, far, c, 0.5)], worldTransparentSort)).toEqual([1, 2]);
  });

  it("takes depth along a fixed forward (north and down at DEPTH_PITCH): the same for any camera, a thing's own place alone", () => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1)); m.position.set(5, 2, -7); m.updateMatrixWorld(true); m.geometry.computeBoundingSphere();
    const a = (DEPTH_PITCH * Math.PI) / 180;
    expect(worldDepth(m, m.geometry)).toBeCloseTo(-Math.sin(a) * 2 + Math.cos(a) * 7, 9);
    // ties: the order met in
    const c = camera(0, 0), t1 = m.clone(), t2 = m.clone();
    expect(order([item(7, t1, c), item(3, t2, c)], worldTransparentSort)).toEqual([3, 7]);
  });
});
