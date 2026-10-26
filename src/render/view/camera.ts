// The camera each frame (moved out of view.ts's render, unchanged): the hills' window and the ride under her and the camera,
// the world's bend, the camera snapped to the pixel grid along the screen's axes, lifted over hills and shaken by a legend's quake.
import * as THREE from "three";
import type { View } from "../view";
import { poseOf } from "../../rules/game";
import { coastView, gazeAt } from "../../rules/camera";
import { witchHeight } from "../../rules/witch";
import { deckOf } from "../../rules/treehouse";
import { moonInSky, skyDirection, skyOnScreen } from "../../rules/telescope";
import { moonKnobs, type ChartKnobs } from "../chart/moon";
import { constellationFor } from "../../rules/constellations";
import { loanFind, nightFind } from "../../rules/finds";
import { groundHeight, HEIGHT_UNIFORMS } from "../height";
import { SPRITE_UNIFORMS } from "../sprites";
import { updateFrustum } from "./culling";

/** Places the camera for this frame; returns the camera's up (tilted with its pitch), for the sprites' facing. */
export function placeCamera(v: View, time: number, pose: ReturnType<typeof poseOf>): THREE.Vector3 {
  const g = v.game, t = g.tuning;
  const a = (pose.angle * Math.PI) / 180;
  // Camera, snapped to the pixel grid along the screen's axes so the art does not shimmer.
  // Arriving from the sea chart (rules/arrive.ts, app/arrive.ts): the flight's shot in place of hers, its field of view
  // easing from the chart's to the game's, the ground and the heights following its aim (not her, at her decks).
  const F = v.fly, fov = F ? F.fov : t.camera.fov;
  if (v.camera.fov !== fov || v.camera.far !== 900) { v.camera.fov = fov; v.camera.far = 900; v.camera.updateProjectionMatrix(); } // (900: as made; the telescope's reaches further)
  const wpp = (2 * pose.distance * Math.tan((fov * Math.PI) / 360)) / v.height;
  const up = new THREE.Vector3(0, Math.cos(a), -Math.sin(a));
  // The rolling ground: its window follows her, and the camera rides over its height.
  v.time("start");
  const fx = F ? F.tx : g.witch.x, fz = F ? F.tz : g.witch.z;
  if (v.heights.follow(fx, fz)) v.stats.heightMoves = (v.stats.heightMoves ?? 0) + 1;
  v.time("heights");
  v.ground.follow(fx, fz);
  // Riding the hills smoothly (Ed, v289): she and the camera follow damped heights, not the bumps.
  {
    const W = g.witch, rdt = Number.isNaN(v.rideTime) ? 0 : time - v.rideTime, full = W.mode === "ground" ? t.groundSpeed : t.treetopSpeed;
    v.rideTime = time;
    v.ride.update(rdt, W.x, W.z, W.vx, W.vz, full, groundHeight, t.witch, witchHeight(W, t));
    // (no floor: just the smoothed ground. In the treehouse, the ground at its middle: the oak's rooms are drawn over that, on the Ent's
    // plane, wherever they lie (render/view/witch.ts, render/houseRooms.ts); under the rules' place a room far from the Terrace had the
    // ground of 60 m away, the camera metres above or below her: Ed's playtest, 2026-10-25, "it doesn't seem to accurately know where
    // the witch is")
    const D = v.herOffset.on ? deckOf(g.map, t) : null;
    v.camRide.update(rdt, D ? D.x : pose.tx, D ? D.z : pose.tz, W.vx, W.vz, full, groundHeight, t.witch, Infinity);
    v.rideOff = W.seated || W.perch ? 0 : v.ride.h - groundHeight(W.x, W.z); // (on the treehouse deck: its floor is flat)
  }
  const target = new THREE.Vector3(pose.tx, F ? F.ty : pose.ty + v.camRide.h, pose.tz); // (the flight's aim is in the world's heights)
  if (!F) target.add(v.houseCam as THREE.Vector3Like); // (off the treehouse's hub: where she's drawn, render/view/witch.ts)
  // At a station, aimed up her to the part being chosen (rules/camera.ts aim: a share of her height as drawn), along the way her
  // sprite stands (up the screen), so that part stays in the middle at any zoom.
  if (!F && pose.aim) target.addScaledVector(up, pose.aim * v.witchTall);
  // The world's bend: only over the treetops (Ed, 2026-10-04), eased in as she rises; from the
  // camera's focus, along its forward on the ground.
  let moonNow!: ReturnType<View["updateMoon"]>;
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
    const land = g.map.bounds.land, seaAhead = land ? Math.max(0, land.inward(g.witch.x, g.witch.z).z) : 0; // (the water to the north of her: the land's way in points south; no island, no coast: 0)
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
    moonNow = v.updateMoon(g);
    // (the game's sky: the stars as if looking north just over the horizon; tonight's constellation only through the telescope, but
    // once she's taken its find, lit in the game's own sky too, at its true bearing: Ed, 2026-10-24, finds on loan)
    v.sky.look(0, -12, fov, v.width, v.height);
    const lit = litConstellation(v, { fov, pitch: 12 });
    if (lit) v.sky.constellation(lit.stars, lit.lines, lit.lineStrength, 1);
    else v.sky.constellation(NO_STARS, NO_LINES, 0, 0);
    v.sky.update(Math.max(k, V.coast + V.gaze > 0.01 ? 1e-5 : 0), pose.tx, pose.tz, far, // (by the sea the sky shows over the flat water even unbent)
      2 * far * Math.tan((t.camera.fov * Math.PI) / 360) * (v.width / v.height), moonNow);
    v.ground.moonRoad(moonNow.x, v.width, moonNow.lit > 0.02);
  }
  v.time("sky");
  if (v.telescope && !F) return placeTelescope(v, v.telescope, moonNow);
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

/** Looking through the telescope (rules/telescope.ts; Ed, 2026-10-21): a view of its own from the crow's nest, over the hub's roof,
 *  turned to its bearing and tilted down to its aim; the game's camera itself never turns. The sprites face it (uRight, set in
 *  setFrameUniforms), the world bends gently away along its bearing (telescope.bend, so the island's far side stays in view), the
 *  moon stands at its bearing round north and the stars pan with it. Returns the camera's up, as placeCamera does. */
function placeTelescope(v: View, look: { heading: number; fov: number; pitch: number }, moon: ReturnType<View["updateMoon"]>): THREE.Vector3 {
  const g = v.game, t = g.tuning, T = t.telescope!, D = deckOf(g.map, t) ?? g.witch;
  const h = (look.heading * Math.PI) / 180, p = (look.pitch * Math.PI) / 180, s = Math.sin(h), c = Math.cos(h);
  const ex = D.x, ez = D.z, ey = groundHeight(ex, ez) + T.eye, cam = v.camera, far = Math.max(900, T.hazeFar + 100);
  if (cam.fov !== look.fov || cam.far !== far) { cam.fov = look.fov; cam.far = far; cam.updateProjectionMatrix(); }
  cam.position.set(ex, ey, ez);
  cam.up.set(0, 1, 0);
  cam.lookAt(ex + s * Math.cos(p) * 100, ey - Math.sin(p) * 100, ez - c * Math.cos(p) * 100);
  HEIGHT_UNIFORMS.uBend.value.set(T.bend, ex, ez, t.ground.hills.on ? t.ground.hills.amplitude : 0);
  HEIGHT_UNIFORMS.uBendFwd.value.set(s, -c);
  v.bendTo = T.bend;
  // The moon at its bearing and elevation in the sky the stars are in (rules/telescope.ts moonInSky), projected through the same view
  // (sky.look), so it keeps its place in the sky as the view pans, tilts and zooms (Ed's playtest, v4522: it rose and fell with the tilt).
  const fovX = (2 * Math.atan(Math.tan((look.fov * Math.PI) / 360) * (v.width / v.height)) * 180) / Math.PI;
  const M = t.moon, sky = moonInSky(moon, T.moonSpread, M.low, M.high, moonKnobs(t as { chart?: ChartKnobs }).height);
  const at = skyOnScreen(skyDirection(sky.bearing, sky.elevation), look.heading, look.pitch, look.fov, v.width / v.height);
  const shown = at && at.x > -0.2 && at.x < 1.2 && at.y > -0.2 && at.y < 1.2 ? { ...moon, x: at.x, y: at.y } : { ...moon, x: -2 };
  v.sky.look(look.heading, look.pitch, look.fov, v.width, v.height);
  lookAtConstellation(v, look, fovX);
  v.sky.update(T.bend, ex + (look.heading / fovX) * v.width * 50, ez, T.hazeFar, 2 * T.hazeFar * Math.tan((look.fov * Math.PI) / 360) * (v.width / v.height), shown);
  v.ground.moonRoad(shown.x, v.width, shown.lit > 0.02 && shown.x > -1);
  v.subpixel.x = 0; v.subpixel.y = 0;
  updateFrustum(v);
  return new THREE.Vector3(s * Math.sin(p), Math.cos(p), -c * Math.sin(p));
}

const NO_STARS: { bearing: number; elevation: number; b: number }[] = [], NO_LINES: [number, number][] = [];

/** Tonight's find's constellation once she's taken it (on loan till she sleeps: rules/finds.ts loanFind; Ed, 2026-10-24): lit in
 *  full, its stars brighter than through the telescope before, its lines drawn whole, at its true bearing; null with no loan. */
function litConstellation(v: View, low?: { fov: number; pitch: number }): { stars: { bearing: number; elevation: number; b: number }[]; lines: [number, number][]; lineStrength: number } | null {
  const g = v.game, T = g.tuning.telescope, C = T ? constellationFor(loanFind(g, g.map.treehouse.x, g.map.treehouse.z)) : null;
  if (!C || !T) return null;
  // (in the game's own sky, a strip just over the horizon looking north, it stands at its true bearing but low and smaller, near
  // the strip's top, so it's seen there at all: the telescope shows it at its true height; Ed's round-1 mock, "low in the sky")
  const key = `${C.item}${C.bearing}${low ? `:${low.fov}` : ""}`, k = low ? LOW_SCALE : 1, up = low ? low.pitch + low.fov * 0.38 : C.elevation;
  const cache = low ? "litLow" : "litStars";
  if (v[cache]?.key !== key) v[cache] = { key, stars: C.stars.map(q => ({ bearing: C.bearing + (((q.bearing - C.bearing + 540) % 360) - 180) * k, elevation: up + (q.elevation - C.elevation) * k, b: T.consBright * 1.25 })) };
  return { stars: v[cache]!.stars, lines: C.lines, lineStrength: Math.min(1, T.consLines * 1.4) };
}
/** How much smaller the lit constellation is drawn low in the game's own sky than its true size (through the telescope). */
const LOW_SCALE = 0.4;

/** Tonight's constellation through the telescope (rules/constellations.ts; Ed, 2026-10-22): its stars a little brighter than their
 *  neighbours, its faint dotted lines fading in once she's held the view on it telescope.consHold seconds (real time: the house's
 *  tenth would make it ten), out again as she looks away. None tonight, or found: no stars. */
function lookAtConstellation(v: View, look: { heading: number; fov: number; pitch: number }, fovX: number): void {
  const lit = litConstellation(v);
  if (lit) { v.sky.constellation(lit.stars, lit.lines, lit.lineStrength, 1); return; } // (taken: lit in full, no holding the view on it)
  const g = v.game, T = g.tuning.telescope!, C = constellationFor(nightFind(g, g.map.treehouse.x, g.map.treehouse.z));
  const now = performance.now(), dt = v.consAt ? Math.min(0.1, (now - v.consAt) / 1000) : 0;
  v.consAt = now;
  if (!C) { v.consHold = 0; v.consLines = 0; v.sky.constellation(NO_STARS, NO_LINES, 0, 0); return; }
  const off = Math.abs(((C.bearing - look.heading + 540) % 360) - 180) * Math.cos((C.elevation * Math.PI) / 180), up = Math.abs(C.elevation + look.pitch);
  const inView = off < fovX * 0.4 && up < look.fov * 0.4;
  v.consHold = inView ? v.consHold + dt : 0;
  v.consLines += ((v.consHold >= T.consHold ? 1 : 0) - v.consLines) * Math.min(1, dt * 2.5);
  if (v.consStars?.key !== C.item + C.bearing) v.consStars = { key: C.item + C.bearing, stars: C.stars.map(s => ({ ...s, b: T.consBright })) };
  v.sky.constellation(v.consStars.stars, C.lines, T.consLines * v.consLines, 1);
}
