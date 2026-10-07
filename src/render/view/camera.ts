// The camera each frame (moved out of view.ts's render, unchanged): the hills' window and the ride under her and the camera,
// the world's bend, the camera snapped to the pixel grid along the screen's axes, lifted over hills and shaken by a legend's quake.
import * as THREE from "three";
import type { View } from "../view";
import { poseOf } from "../../rules/game";
import { coastView, gazeAt } from "../../rules/camera";
import { witchHeight } from "../../rules/witch";
import { groundHeight, HEIGHT_UNIFORMS } from "../height";
import { SPRITE_UNIFORMS } from "../sprites";
import { updateFrustum } from "./culling";

/** Places the camera for this frame; returns the camera's up (tilted with its pitch), for the sprites' facing. */
export function placeCamera(v: View, time: number, pose: ReturnType<typeof poseOf>): THREE.Vector3 {
  const g = v.game, t = g.tuning;
  const a = (pose.angle * Math.PI) / 180;
  // Camera, snapped to the pixel grid along the screen's axes so the art does not shimmer.
  const wpp = (2 * pose.distance * Math.tan((t.camera.fov * Math.PI) / 360)) / v.height;
  const up = new THREE.Vector3(0, Math.cos(a), -Math.sin(a));
  // The rolling ground: its window follows her, and the camera rides over its height.
  v.time("start");
  if (v.heights.follow(g.witch.x, g.witch.z)) v.stats.heightMoves = (v.stats.heightMoves ?? 0) + 1;
  v.time("heights");
  v.ground.follow(g.witch.x, g.witch.z);
  // Riding the hills smoothly (Ed, v289): she and the camera follow damped heights, not the bumps.
  {
    const W = g.witch, rdt = Number.isNaN(v.rideTime) ? 0 : time - v.rideTime, full = W.mode === "ground" ? t.groundSpeed : t.treetopSpeed;
    v.rideTime = time;
    v.ride.update(rdt, W.x, W.z, W.vx, W.vz, full, groundHeight, t.witch, witchHeight(W, t));
    v.camRide.update(rdt, pose.tx, pose.tz, W.vx, W.vz, full, groundHeight, t.witch, Infinity); // (no floor: just the smoothed ground)
    v.rideOff = W.seated ? 0 : v.ride.h - groundHeight(W.x, W.z);
  }
  const target = new THREE.Vector3(pose.tx, pose.ty + v.camRide.h, pose.tz);
  // The world's bend: only over the treetops (Ed, 2026-10-04), eased in as she rises; from the
  // camera's focus, along its forward on the ground.
  {
    const C = t.camera.curve, m = Math.min(1, Math.max(0, g.witch.lift));
    // Lying on the beach to stargaze (Ed, 2026-10-06: "the bend shader applies so that you can see the sky"): the bend eased up
    // past the treetops' over beach.gazeEase seconds, the night sky opening over the sea, and back down as she gets up.
    // And nearing the sea, on the ground, it bends up toward beach.camera.curve times the treetops' (Ed, 2026-10-06: "gradual as
    // you approach the beach, over 200m"), the camera lowering with it (rules/camera.ts), both eased by the rules' camera.
    const B = t.beach, V = coastView(g.camera);
    // Facing out to sea (the north coast: the camera always looks north), the bend would drop the open water out of sight
    // below a horizon of sand, and the flat sea shows the sky anyway: there it keeps only beach.camera.seaward of itself
    // (Ed, 2026-10-07: the sea "on the horizon" must read from the stargazing pose), easing round the coast by bearing.
    const ring = g.map.bounds.circle, wx = ring ? g.witch.x - ring.x : 0, wz = ring ? g.witch.z - ring.z : 0, seaAhead = Math.max(0, -wz / (Math.hypot(wx, wz) || 1)); // (no circle, no coast: 0)
    // Lying down, the bend is the stargazing table's for her bearing round the coast (beach.camera.bearings.bend: rules/camera.ts
    // gazeAt), eased in with her lying down.
    const seaKeep0 = 1 - seaAhead * (1 - (B?.camera?.seaward ?? 1)), gazeBend = B?.camera?.bearings.bend ? gazeAt(B.camera, g.camera.bearing ?? 0).bend : seaKeep0;
    const seaKeep = seaKeep0 + (Math.max(0, gazeBend) - seaKeep0) * V.gaze;
    const gk = Math.max(V.gaze * (B?.stargazeCurve ?? 0), V.coast * (B?.camera?.curve ?? 0)) * C.treetop * seaKeep;
    SPRITE_UNIFORMS.uNearCut.value = V.gaze > 0.01 ? V.gaze * Math.max(0, pose.distance - 12) : 0; // (lying down, the camera low behind her: what's between it and her, from 12 m before her, dithers away)
    const k = Math.max(C.ground + (C.treetop - C.ground) * m * m * (3 - 2 * m), gk);
    HEIGHT_UNIFORMS.uBend.value.set(Math.max(0, k), pose.tx, pose.tz, t.ground.hills.on ? t.ground.hills.amplitude : 0); // (w: the hills' amplitude, for the horizon test)
    v.bendTo = Math.max(0, g.witch.mode === "rising" || g.witch.mode === "treetop" ? C.treetop : C.ground, gk, v.beachView.gazing ? C.treetop * (B?.stargazeCurve ?? 0) * seaKeep : 0);
    HEIGHT_UNIFORMS.uBendFwd.value.set(0, -1); // the camera always looks north (toward -z)
    const far = t.haze.far;
    const moonNow = v.updateMoon(g);
    v.sky.update(Math.max(k, V.coast + V.gaze > 0.01 ? 1e-5 : 0), pose.tx, pose.tz, far, // (by the sea the sky shows over the flat water even unbent)
      2 * far * Math.tan((t.camera.fov * Math.PI) / 360) * (v.width / v.height), moonNow);
    v.ground.moonRoad(moonNow.x, v.width, moonNow.lit > 0.02);
  }
  v.time("sky");
  const u = target.dot(up), r = target.x, eu = Math.round(u / wpp) * wpp - u, er = Math.round(r / wpp) * wpp - r;
  target.addScaledVector(up, eu);
  target.x += er;
  // What the snap took off (in the picture's pixels): main.ts moves the canvas back by it, in whole
  // screen pixels, so the art stays on its grid but the view glides (Ed, 2026-10-05: whole art-pixel
  // steps of the camera felt like a low framerate). Moved right, the picture moves left; up, down.
  v.subpixel.x = er / wpp; v.subpixel.y = -eu / wpp;
  const back = new THREE.Vector3(0, Math.sin(a), Math.cos(a)).multiplyScalar(pose.distance);
  v.camera.position.copy(target).add(back);
  // Over tall hills a rise between the camera and her could hide her: lift the camera (eased)
  // just enough that its line of sight to her clears the ground in between by 4 m.
  {
    let need = 0;
    for (let f = 0.08; f < 0.95; f += 0.08) {
      const px = target.x + back.x * f, pz = target.z + back.z * f, line = target.y + back.y * f;
      need = Math.max(need, (groundHeight(px, pz) + 4 - line) / f);
    }
    v.camLift += (Math.max(0, need) - v.camLift) * (need > v.camLift ? 0.35 : 0.06);
    v.camera.position.y += v.camLift;
  }
  v.camera.up.set(0, 1, 0);
  v.camera.lookAt(target);
  // A legend's quake nearby shakes the screen (only legends: Stage 4).
  const shake = v.leashView.shake(time);
  if (shake > 0) v.camera.position.add(v.v3.set(Math.sin(time * 61) * shake, Math.sin(time * 47 + 1) * shake * 0.6, 0));
  updateFrustum(v);
  return up;
}
