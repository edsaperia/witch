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
  const step = cam.position.distanceTo(v.lastCamPos);
  v.camStep = Number.isFinite(step) ? Math.min(step, 100) : 0;
  v.lastCamPos.copy(cam.position);
  v.m4.multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse);
  v.frustum.setFromProjectionMatrix(v.m4);
  // Where the camera is heading: the chosen zoom step, and the height she is rising or descending to.
  const steps = Math.max(1, t.camera.zoomSteps), lift = g.witch.mode === "rising" || g.witch.mode === "treetop" ? 1 : 0;
  const to = cameraPose({ ...g.camera, zoom: steps > 1 ? g.camera.zoomStep / (steps - 1) : 0 }, lift, t);
  const c = v.cullCam;
  c.fov = cam.fov; c.aspect = cam.aspect; c.near = cam.near; c.far = cam.far; c.updateProjectionMatrix();
  // (arriving from the sea chart, app/arrive.ts: the flight's own camera, not where hers is heading at her decks)
  if (v.fly || v.telescope) { c.position.copy(cam.position); c.quaternion.copy(cam.quaternion); c.updateMatrixWorld(); } // (the telescope: its own camera, still)
  else poseCamera(c, { ...to, ty: lerp(t.groundHeight, t.treetopHeight, lift) + groundHeight(to.tx, to.tz) });
  v.m4.multiplyMatrices(c.projectionMatrix, c.matrixWorldInverse);
  v.frustumTo.setFromProjectionMatrix(v.m4);
}

/** What the view is drawn round: her, or (arriving from the sea chart, app/arrive.ts) the flight's aim. */
export const focusOf = (v: View): { x: number; z: number } => (v.fly ? { x: v.fly.tx, z: v.fly.tz } : v.game.witch);

/** The ground rectangle the cameras can see, out to `far` metres from the witch, plus `margin`. */
export function viewRect(v: View, far: number, margin: number) {
  const w = focusOf(v), A = v.game.tuning.ground.hills.on ? v.game.tuning.ground.hills.amplitude : 0;
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity; // (the corners' least and most, no list a frame)
  for (let ci = 0; ci < 2; ci++) {
    const cam = ci === 0 ? v.camera : v.cullCam, o = cam.position, reach = far + Math.hypot(o.x - w.x, o.z - w.z) + margin;
    for (let nx = -1; nx <= 1; nx += 2) for (let ny = -1; ny <= 1; ny += 2) {
      const d = v.v3.set(nx, ny, 1).unproject(cam).sub(o).normalize();
      for (let hi = 0; hi < 2; hi++) { // (the ground in a valley is seen further off; a hilltop's trees nearer)
        const h = hi === 0 ? -A : 25 + A;
        let t = d.y < -1e-3 ? (h - o.y) / d.y : Infinity;
        // With the bend, the ground drops away under the top of the view: it sees on past where
        // the flat ground would meet it, out to the reach.
        if (!(t > 0) || (ny > 0 && (HEIGHT_UNIFORMS.uBend.value.x !== 0 || v.bendTo !== 0))) t = Infinity;
        t = Math.min(t, reach);
        const px = o.x + d.x * t, pz = o.z + d.z * t;
        if (px < minX) minX = px; if (px > maxX) maxX = px; if (pz < minZ) minZ = pz; if (pz > maxZ) maxZ = pz;
      }
    }
    if (o.x < minX) minX = o.x; if (o.x > maxX) maxX = o.x; if (o.z < minZ) minZ = o.z; if (o.z > maxZ) maxZ = o.z;
  }
  return { minX: minX - margin, maxX: maxX + margin, minZ: minZ - margin, maxZ: maxZ + margin };
}

/** Whether (x, z), w wide, lies within the telescope's wedge: its bearing, its view's half width and telescope.wedge degrees either
 *  side (or within a few metres of the eye, below its view). */
export function inWedge(v: View, x: number, z: number, w = 0): boolean {
  const T = v.telescope, W = v.game.tuning.telescope;
  if (!T || !W) return true;
  const e = v.camera.position, dx = x - e.x, dz = z - e.z, d = Math.hypot(dx, dz);
  if (d < 30 + w) return true;
  const half = telescopeHalfWidth(T.fov, v.width / v.height) + W.wedge + (Math.atan2(w, d) * 180) / Math.PI;
  const bearing = (Math.atan2(dx, -dz) * 180) / Math.PI, off = Math.abs(((bearing - T.heading + 540) % 360) - 180);
  return off <= half;
}

/** Half the telescope's view's width (degrees) at its field of view `fov` (vertical, degrees) and the screen's `aspect`. */
export const telescopeHalfWidth = (fov: number, aspect: number): number => (Math.atan(Math.tan((fov * Math.PI) / 360) * aspect) * 180) / Math.PI;

/** How far (m) a point lies ahead of the bend's focus along its forward (north, but for the telescope's own bearing), 0 behind. */
function aheadOf(x: number, z: number): number {
  const B = HEIGHT_UNIFORMS.uBend.value, F = HEIGHT_UNIFORMS.uBendFwd.value;
  return Math.max(0, (x - B.y) * F.x + (z - B.z) * F.y);
}

/** Whether a sprite standing at (x, z), w wide and h tall, may be on screen now or soon. Nothing
 *  is drawn beyond the haze's far edge, where the haze has already hidden it completely. */
export function inView(v: View, x: number, z: number, w: number, h: number, margin: number, reach = v.game.tuning.haze.far): boolean {
  const { x: wx, z: wz } = focusOf(v), far = reach + margin;
  if ((x - wx) ** 2 + (z - wz) ** 2 > far * far) return false;
  // On the rolling ground, and dropped by the bend (things far ahead come down into view): by the
  // bend now and the bend it is easing to (as she rises), as the culling isn't redone as it grows.
  const B = HEIGHT_UNIFORMS.uBend.value, ahead = aheadOf(x, z), g = groundHeight(x, z);
  const d1 = B.x * ahead * ahead, d2 = v.bendTo * ahead * ahead;
  // Past the bent ground's horizon, only what stands tall enough to show over the bulge is seen:
  // everything else there is hidden behind the forest in front (and was the bend's cost).
  // (Its own top, 2 m slack: not the view margin. And as if the camera were already a step or so
  // further on, so what the next frame's horizon shows is drawn already, behind the bulge till it
  // rises over it: judged where it stands, a long frame, the camera moving metres, let creatures
  // pop in at the horizon. #222's map: a baby wolf and a young fox 258 m ahead over the treetops.)
  const near = Math.max(0, ahead - horizonLead(v.camStep));
  if (ahead > 0 && !overHorizon(v, near, g + h + 2, B.x) && !overHorizon(v, near, g + h + 2, v.bendTo)) return false;
  // (through the telescope, what lies within its wedge: its view's width and telescope.wedge degrees either side, so it pans a
  // while before the scenery is listed again: render/view/scenery.ts)
  if (v.telescope) return inWedge(v, x, z, w);
  v.box.min.set(x - w / 2 - margin, g - Math.max(d1, d2) - margin, z - h - margin);
  v.box.max.set(x + w / 2 + margin, g - Math.min(d1, d2) + h + margin, z + margin);
  return v.frustum.intersectsBox(v.box) || v.frustumTo.intersectsBox(v.box);
}

/** How much nearer (m) the horizon cull judges a thing than it stands, for a camera that moved
 *  `camStep` metres last frame: a step and a half and a metre, so the next frame (if as long) can't
 *  bring anything over the horizon that this one left undrawn. */
export const horizonLead = (camStep: number): number => 1 + 1.5 * camStep;

/** How much of a thing standing at (x, z), `top` metres tall, shows over the bent ground's
 *  horizon, 0 to 1: its whole height (1) down to none of it, its top hidden (0); by the same
 *  test as the culling (overHorizon). */
export function overBulge(v: View, x: number, z: number, top: number): number {
  const B = HEIGHT_UNIFORMS.uBend.value, ahead = aheadOf(x, z);
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
  const B = HEIGHT_UNIFORMS.uBend.value, ahead = aheadOf(x, z);
  if (ahead > 0 && !overHorizon(v, ahead, groundHeight(x, z) + h, B.x)) return false;
  for (const y of [0, h * 0.5, h]) {
    const p = placed(v.v3.set(x, y, z)).project(v.camera);
    if (Math.abs(p.x) < 1 && Math.abs(p.y) < 1 && p.z < 1) return true;
  }
  return false;
}
