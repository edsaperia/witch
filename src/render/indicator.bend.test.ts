// The edge cues with the world's bend (Ed, v256: "the bend confuses the direction markers, that see
// things past the bend as south instead of north"): a target far north, south, east or west of the
// witch gets its cue on the matching edge of the screen, with the bend at its default and doubled.
import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { edgeSpot } from "./indicator";
import { HEIGHT_UNIFORMS } from "./height";
import { TUNING } from "../rules/tuning";

const W = 1280, H = 720;
/** The treetop camera as the game poses it: over her, looking north and down. */
function camera(wx: number, wz: number): THREE.PerspectiveCamera {
  const c = new THREE.PerspectiveCamera(TUNING.camera.fov, W / H, 1, 900), T = TUNING.camera.treetop, a = (T.angleIn * Math.PI) / 180, y = TUNING.treetopHeight;
  c.position.set(wx, y + Math.sin(a) * T.distanceIn, wz + Math.cos(a) * T.distanceIn);
  c.lookAt(wx, y, wz);
  c.updateMatrixWorld();
  return c;
}

describe("edge cues point the right way with the bend", () => {
  for (const k of [TUNING.camera.curve.treetop, TUNING.camera.curve.treetop * 2]) {
    it(`bend ${k}: far north is up, south down, east right, west left`, () => {
      const wx = 1000, wz = 1000, cam = camera(wx, wz), v = new THREE.Vector3();
      HEIGHT_UNIFORMS.uBend.value.set(k, wx, wz, 0);
      for (const d of [400, 900]) {
        const n = edgeSpot(v, cam, W, H, wx, wz - d, wx, wz), s = edgeSpot(v, cam, W, H, wx, wz + d, wx, wz);
        const e = edgeSpot(v, cam, W, H, wx + d, wz, wx, wz), w = edgeSpot(v, cam, W, H, wx - d, wz, wx, wz);
        for (const c of [n, s, e, w]) expect(c.show).toBeGreaterThan(0.5); // off screen (past the bend's horizon too), so cued
        expect(n.ey).toBeLessThan(H * 0.2); expect(Math.abs(n.ex - W / 2)).toBeLessThan(2);
        expect(s.ey).toBeGreaterThan(H * 0.8); expect(Math.abs(s.ex - W / 2)).toBeLessThan(2);
        expect(e.ex).toBeGreaterThan(W * 0.8); expect(w.ex).toBeLessThan(W * 0.2);
        // The arrow's angle (screen, y down): north points up, east right.
        expect(Math.sin(n.angle)).toBeLessThan(-0.99); expect(Math.cos(e.angle)).toBeGreaterThan(0.99);
      }
      HEIGHT_UNIFORMS.uBend.value.set(0, 0, 0, 0);
    });
  }
  it("a target near her, in view, isn't cued at the edge", () => {
    const wx = 1000, wz = 1000, cam = camera(wx, wz), v = new THREE.Vector3();
    HEIGHT_UNIFORMS.uBend.value.set(TUNING.camera.curve.treetop, wx, wz, 0);
    const c = edgeSpot(v, cam, W, H, wx + 10, wz - 20, wx, wz);
    expect(c.seen).toBe(true);
    expect(c.show).toBeLessThan(0.01);
    HEIGHT_UNIFORMS.uBend.value.set(0, 0, 0, 0);
  });
});
