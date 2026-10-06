// What the camera can see (from render/view.ts, issue #122): its frustum now and the one it is easing
// toward, the ground rectangle in view, and whether a sprite may be on screen or shows over the bend.
import * as THREE from "three";
import { HEIGHT_UNIFORMS, groundHeight, placed, seenOverBend } from "../height";
import { cameraPose } from "../../rules/camera";
import { lerp } from "../../rules/random";
import type { View } from "../view";

export function poseCamera(cam: THREE.PerspectiveCamera, pose: { angle: number; distance: number; tx: number; ty: number; tz: number }): void {
  const a = (pose.angle * Math.PI) / 180;
  cam.position.set(pose.tx, pose.ty + Math.sin(a) * pose.distance, pose.tz + Math.cos(a) * pose.distance);
  cam.up.set(0, 1, 0);
  cam.lookAt(pose.tx, pose.ty, pose.tz);
  cam.updateMatrixWorld();
}

export function updateFrustum(v: View): void {
  const g = v.game, t = g.tuning, cam = v.camera;
  cam.updateMatrixWorld();
  v.m4.multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse);
  v.frustum.setFromProjectionMatrix(v.m4);
  // Where the camera is heading: the chosen zoom step, and the height she is rising or descending to.
  const steps = Math.max(1, t.camera.zoomSteps), lift = g.witch.mode === "rising" || g.witch.mode === "treetop" ? 1 : 0;
  const to = cameraPose({ ...g.camera, zoom: steps > 1 ? g.camera.zoomStep / (steps - 1) : 0 }, lift, t);
  const c = v.cullCam;
  c.fov = cam.fov; c.aspect = cam.aspect; c.near = cam.near; c.far = cam.far; c.updateProjectionMatrix();
  poseCamera(c, { ...to, ty: lerp(t.groundHeight, t.treetopHeight, lift) + groundHeight(to.tx, to.tz) });
  v.m4.multiplyMatrices(c.projectionMatrix, c.matrixWorldInverse);
  v.frustumTo.setFromProjectionMatrix(v.m4);
}

/** The ground rectangle the cameras can see, out to `far` metres from the witch, plus `margin`. */
export function viewRect(v: View, far: number, margin: number) {
  const w = v.game.witch, pts: [number, number][] = [];
  for (const cam of [v.camera, v.cullCam]) {
    const o = cam.position, reach = far + Math.hypot(o.x - w.x, o.z - w.z) + margin;
    for (const nx of [-1, 1]) for (const ny of [-1, 1]) {
      const d = v.v3.set(nx, ny, 1).unproject(cam).sub(o).normalize();
      const A = v.game.tuning.ground.hills.on ? v.game.tuning.ground.hills.amplitude : 0;
      for (const h of [-A, 25 + A]) { // (the ground in a valley is seen further off; a hilltop's trees nearer)
        let t = d.y < -1e-3 ? (h - o.y) / d.y : Infinity;
        // With the bend, the ground drops away under the top of the view: it sees on past where
        // the flat ground would meet it, out to the reach.
        if (!(t > 0) || (ny > 0 && (HEIGHT_UNIFORMS.uBend.value.x > 0 || v.bendTo > 0))) t = Infinity;
        t = Math.min(t, reach);
        pts.push([o.x + d.x * t, o.z + d.z * t]);
      }
    }
    pts.push([o.x, o.z]);
  }
  const xs = pts.map(p => p[0]), zs = pts.map(p => p[1]);
  return { minX: Math.min(...xs) - margin, maxX: Math.max(...xs) + margin, minZ: Math.min(...zs) - margin, maxZ: Math.max(...zs) + margin };
}

/** Whether a sprite standing at (x, z), w wide and h tall, may be on screen now or soon. Nothing
 *  is drawn beyond the haze's far edge, where the haze has already hidden it completely. */
export function inView(v: View, x: number, z: number, w: number, h: number, margin: number, reach = v.game.tuning.haze.far): boolean {
  const wx = v.game.witch.x, wz = v.game.witch.z, far = reach + margin;
  if ((x - wx) ** 2 + (z - wz) ** 2 > far * far) return false;
  // On the rolling ground, and dropped by the bend (things far ahead come down into view): by the
  // bend now and the bend it is easing to (as she rises), as the culling isn't redone as it grows.
  const B = HEIGHT_UNIFORMS.uBend.value, ahead = Math.max(0, -(z - B.z)), g = groundHeight(x, z);
  const d1 = B.x * ahead * ahead, d2 = v.bendTo * ahead * ahead;
  // Past the bent ground's horizon, only what stands tall enough to show over the bulge is seen:
  // everything else there is hidden behind the forest in front (and was the bend's cost).
  if (ahead > 0 && !overHorizon(v, ahead, g + h + 2, B.x) && !overHorizon(v, ahead, g + h + 2, v.bendTo)) return false; // (its own top, 2 m slack: not the view margin)
  v.box.min.set(x - w / 2 - margin, g - Math.max(d1, d2) - margin, z - h - margin);
  v.box.max.set(x + w / 2 + margin, g - Math.min(d1, d2) + h + margin, z + margin);
  return v.frustum.intersectsBox(v.box) || v.frustumTo.intersectsBox(v.box);
}

/** How much of a thing standing at (x, z), `top` metres tall, shows over the bent ground's
 *  horizon, 0 to 1: its whole height (1) down to none of it, its top hidden (0); by the same
 *  test as the culling (overHorizon). */
export function overBulge(v: View, x: number, z: number, top: number): number {
  const B = HEIGHT_UNIFORMS.uBend.value, ahead = Math.max(0, -(z - B.z));
  if (ahead <= 0 || B.x <= 0) return 1;
  const g = groundHeight(x, z);
  let n = 0;
  for (let i = 0; i < 4; i++) if (overHorizon(v, ahead, g + top * (1 - i / 4), B.x)) n++;
  return n / 4;
}

/** Whether something `ahead` metres ahead of the bend's focus, its top `top` metres up, shows
 *  over the horizon of ground bent by `k` (true without a bend, or before the horizon). */
export function overHorizon(v: View, ahead: number, top: number, k: number): boolean {
  return seenOverBend(ahead, top, k, v.camera.position, v.game.tuning.camera.curve.beyond); // (only a strip of distant treetops past the horizon: the bend's cost)
}

/** Whether a point is on screen and clear of the haze, so a change there would be seen. */
export function inInnerView(v: View, x: number, z: number, h: number): boolean {
  const w = v.game.witch, hz = v.game.tuning.haze;
  if (Math.hypot(x - w.x, z - w.z) > hz.near + (hz.far - hz.near) * 0.6) return false;
  // Past the bent horizon, where the culling counts it hidden behind the bulge and the forest in
  // front (inView), its coming and going isn't seen either.
  const B = HEIGHT_UNIFORMS.uBend.value, ahead = Math.max(0, -(z - B.z));
  if (ahead > 0 && !overHorizon(v, ahead, groundHeight(x, z) + h, B.x)) return false;
  for (const y of [0, h * 0.5, h]) {
    const p = placed(v.v3.set(x, y, z)).project(v.camera);
    if (Math.abs(p.x) < 1 && Math.abs(p.y) < 1 && p.z < 1) return true;
  }
  return false;
}
