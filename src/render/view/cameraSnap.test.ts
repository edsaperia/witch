// The camera's pixel snap taken along the ground (render/view/camera.ts snapAim; Ed, 2026-11-11, after blendi's "Oil paint": "Which
// of two overlapping strokes is on top must never depend on where the camera is, or the paint crawls as you breathe"). Walking north
// or south, every sprite's pixel (its foot snapped to the grid, as render/sprites.ts does) moves one way only: never back and forth.
import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { snapAim } from "./camera";

const H = 180, FOV = 20; // (the picture's rows at 960×540 and pixel size 3; the game's field of view)

/** Each sprite foot's pixel row, frame by frame, as the camera's aim walks `metres` north (or south, negative) in `step`s. */
function rows(pitchDeg: number, distance: number, metres: number, step: number, old: boolean, feet: THREE.Vector3[]): number[][] {
  const a = (pitchDeg * Math.PI) / 180, wpp = (2 * distance * Math.tan((FOV * Math.PI) / 360)) / H;
  const cam = new THREE.PerspectiveCamera(FOV, 16 / 9, 1, 900), up = new THREE.Vector3(0, Math.cos(a), -Math.sin(a));
  const back = new THREE.Vector3(0, Math.sin(a), Math.cos(a)).multiplyScalar(distance), out: number[][] = feet.map(() => []);
  for (let d = 0; Math.abs(d) <= Math.abs(metres); d += step) {
    const target = new THREE.Vector3(0.37, 1.3, 10.21 - d);
    snapAim(target, up, a, wpp, old);
    cam.position.copy(target).add(back); cam.lookAt(target); cam.updateMatrixWorld(true);
    feet.forEach((p, i) => { const s = p.clone().project(cam); out[i].push(Math.floor((s.y * 0.5 + 0.5) * H)); });
  }
  return out;
}
/** How many times a row's run turns back (down then up, or up then down). */
const turns = (r: number[]) => { let n = 0, last = 0; for (let i = 1; i < r.length; i++) { const d = Math.sign(r[i] - r[i - 1]); if (d && last && d !== last) n++; if (d) last = d; } return n; };

describe("the camera's pixel snap (render/view/camera.ts snapAim)", () => {
  // feet over the picture: behind the focus and in front, across, a little up a hill
  const feet: THREE.Vector3[] = [];
  for (let z = -40; z <= 25; z += 6.5) for (const x of [-30, -7, 4, 22]) feet.push(new THREE.Vector3(x + z * 0.13, (z % 3) * 0.4, 10 + z));

  it("walking north or south, no sprite's pixel ever turns back (with the snap up the screen, many did)", () => {
    for (const [pitch, dist] of [[26, 40], [34, 100], [42, 200]] as const) for (const dir of [1, -1]) {
      const now = rows(pitch, dist, dir * 6, dir * 0.004, false, feet).map(turns), was = rows(pitch, dist, dir * 6, dir * 0.004, true, feet).map(turns);
      expect(now.reduce((a, b) => a + b, 0), `${pitch}° ${dist} m ${dir > 0 ? "north" : "south"}`).toBe(0);
      expect(was.reduce((a, b) => a + b, 0), `${pitch}° ${dist} m, as before`).toBeGreaterThan(0);
    }
  });

  it("near level (the beach's camera) takes at most five times the step along the view, so the aim never runs far", () => {
    const a = (5 * Math.PI) / 180, wpp = 0.14, up = new THREE.Vector3(0, Math.cos(a), -Math.sin(a)), t = new THREE.Vector3(1, 2, 3.33), t0 = t.clone();
    const { eu } = snapAim(t, up, a, wpp);
    expect(t.dot(up) / wpp).toBeCloseTo(Math.round(t.dot(up) / wpp), 6);
    expect(t.distanceTo(t0)).toBeLessThanOrEqual(Math.hypot(eu, eu * 5, wpp / 2) + 1e-9);
  });

  it("still puts the aim's height up the screen on the grid, and across it, as before", () => {
    const a = (34 * Math.PI) / 180, wpp = 0.14, up = new THREE.Vector3(0, Math.cos(a), -Math.sin(a));
    for (const [x, y, z] of [[3.21, 0.7, -5.03], [-12.9, 4.4, 88.31], [0, 0, 0]]) {
      const t = new THREE.Vector3(x, y, z), u0 = t.dot(up), { eu, er } = snapAim(t, up, a, wpp);
      expect(t.dot(up) / wpp).toBeCloseTo(Math.round(t.dot(up) / wpp), 6);
      expect(t.x / wpp).toBeCloseTo(Math.round(t.x / wpp), 6);
      expect(t.dot(up) - u0).toBeCloseTo(eu, 9); // (what the canvas's glide gives back: the same as before)
      expect(t.x - x).toBeCloseTo(er, 9);
      expect(t.y).toBeCloseTo(y, 9); // (moved along the ground: its height kept)
    }
  });
});
