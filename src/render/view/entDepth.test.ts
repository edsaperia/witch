// The treehouse Ent's halves (render/view/home.ts ENT_DEPTH, alongRay): moved along the camera's rays and scaled, every pixel of
// them lands where it would have in the plane through the deck's middle.
import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { alongRay, ENT_DEPTH } from "./home";
import type { View } from "../view";

describe("the treehouse Ent's halves either side of her", () => {
  it("land on their own pixels, moved back or forward along the camera's rays", () => {
    const camera = new THREE.PerspectiveCamera(20, 16 / 9, 1, 900);
    camera.position.set(1460, 60, 1400); camera.lookAt(1460, 22, 1320); camera.updateMatrixWorld();
    const v = { camera } as unknown as View, P = { x: 1460, y: 22, z: 1320 };
    for (const d of [-ENT_DEPTH.far, ENT_DEPTH.near, 5.47]) {
      const q = alongRay(v, P, d);
      for (const off of [[0, 0, 0], [6, -2, 0], [-4, 3, 0.5], [0, -22, 1]]) {
        const a = new THREE.Vector3(P.x + off[0], P.y + off[1], P.z + off[2]).project(camera);
        const b = new THREE.Vector3(q.x + off[0] * q.scale, q.y + off[1] * q.scale, q.z + off[2] * q.scale).project(camera);
        expect(Math.hypot(a.x - b.x, a.y - b.y) * 720 / 2).toBeLessThan(0.75); // (under a screen pixel at 720 high)
      }
      expect(Math.hypot(q.x - camera.position.x, q.y - camera.position.y, q.z - camera.position.z)).toBeCloseTo(Math.hypot(P.x - camera.position.x, P.y - camera.position.y, P.z - camera.position.z) - d, 6);
    }
  });
});
