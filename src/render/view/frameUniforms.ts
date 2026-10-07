// The frame's shared uniforms (moved out of view.ts's render, unchanged): the sprites' facing, the canopy's cut-out round her,
// the trunks' fade, finding creatures in the dark, the wind, her glow's reach and place, and the mood where she is.
import * as THREE from "three";
import type { View } from "../view";
import { AREA_TYPES } from "../../rules/map";
import { canopyShown, witchHeight } from "../../rules/witch";
import { groundHeight, placed } from "../height";
import { LIGHT_UNIFORMS } from "../lighting";
import { SPRITE_UNIFORMS } from "../sprites";

/** Sets this frame's sprite and light uniforms, after the camera (`up`, its tilted up). */
export function setFrameUniforms(v: View, time: number, up: THREE.Vector3): void {
  const g = v.game, t = g.tuning;
  // Sprites face the camera, tilted back toward it by spriteTilt.
  const tilt = t.spriteTilt;
  SPRITE_UNIFORMS.uUp.value.set(0, 1, 0).lerp(up, tilt).normalize();
  SPRITE_UNIFORMS.uFacing.value.crossVectors(SPRITE_UNIFORMS.uRight.value, SPRITE_UNIFORMS.uUp.value).normalize();
  // The canopy is always drawn; round the witch a hole is cut, sized to the view, which shrinks
  // to nothing as she rises (and opens as she descends).
  const lifted = canopyShown(g.witch), cut = t.canopyCutout;
  v.camera.updateMatrixWorld();
  const ws = placed(v.v3.set(g.witch.x, witchHeight(g.witch, t) * 0.5 + v.rideOff, g.witch.z)).project(v.camera);
  // (The edge stays its full softness as the hole closes: shrunk with it, a small hole's edge was crisp, Ed v289.)
  // (its middle a little ahead of her the way she's going, canopyCutout.lead seconds, eased: the opening leans into her path)
  const lead = cut.lead ?? 0, lx = (ws.x * 0.5 + 0.5) * v.width, ly = (ws.y * 0.5 + 0.5) * v.height;
  let hx = lx, hy = ly;
  if (lead > 0) {
    const ah = placed(v.v3.set(g.witch.x + g.witch.vx * lead, witchHeight(g.witch, t) * 0.5 + v.rideOff, g.witch.z + g.witch.vz * lead)).project(v.camera);
    const tx = (ah.x * 0.5 + 0.5) * v.width, ty = (ah.y * 0.5 + 0.5) * v.height, k = 1 - Math.exp(-Math.min(0.1, Math.max(0, time - v.holeAt)) / 0.6);
    v.holeLead.x += (tx - lx - v.holeLead.x) * k; v.holeLead.y += (ty - ly - v.holeLead.y) * k;
    hx += v.holeLead.x; hy += v.holeLead.y;
  }
  v.holeAt = time;
  SPRITE_UNIFORMS.uCutout.value.set(hx, hy, 0.5 * cut.screenFraction * v.width * (1 - lifted), Math.max(1, cut.edge * v.width));
  SPRITE_UNIFORMS.uCutWhole.value = cut.whole ?? 0;
  SPRITE_UNIFORMS.uCutShape.value.set(cut.wobble ?? 0, cut.outer ?? 0.35, cut.ragged ?? 0, cut.spread ?? 0.2);
  SPRITE_UNIFORMS.uTopFade.value = lifted;
  SPRITE_UNIFORMS.uTrunkFade.value.set(t.trunkFade.metres, v.mpp, t.trunkFade.share);
  SPRITE_UNIFORMS.uTrunkLook.value.set(t.trunkFade.lightFloor, t.trunkFade.rim);
  SPRITE_UNIFORMS.uDebugTrunks.value = v.debugTrunks ? 1 : 0;
  const Fd = t.find; // finding wild creatures in the dark (Ed, v244; ?find=0 turns it off)
  SPRITE_UNIFORMS.uFindLook.value.set(Fd.on ? Fd.lightFloor : 0, Fd.on ? Fd.rim : 0, Fd.on ? Fd.eyeshine.strength : 0, Fd.eyeshine.blink);
  SPRITE_UNIFORMS.uEyeRange.value = Fd.eyeshine.range;
  // The wind: gentler over the treetops (Ed, v171: "gentle and lovely").
  const W = t.wind;
  SPRITE_UNIFORMS.uWind.value.set(W.on ? W.strength * (1 + (W.treetop - 1) * lifted) : 0, W.speed, W.gustScale, time);
  // The witch's glow reaches as far as the ground-mode canopy hole round her (Ed, v149: "about
  // the width of the canopy hiding circle"): the hole's radius plus its soft edge, in metres at
  // her depth, times glowToCutout; beyond it the forest is dark. ?glow= fixes it instead.
  if (!t.glowFixed) {
    const wx = g.witch.x, wz = g.witch.z, R = SPRITE_UNIFORMS.uRight.value;
    const a = placed(v.v3.set(wx, 0, wz)).project(v.camera).x, b = placed(v.v3.set(wx + R.x * 10, 0, wz + R.z * 10)).project(v.camera).x;
    const pxPerM = Math.max(1e-3, (Math.abs(b - a) * 0.5 * v.width) / 10);
    LIGHT_UNIFORMS.uGlowR.value = ((0.5 * cut.screenFraction + cut.edge) * v.width / pxPerM) * t.glowToCutout;
  }
  SPRITE_UNIFORMS.uDebugCull.value = v.debugCull ? 1 : 0;

  const w = g.witch, h = witchHeight(w, t);
  LIGHT_UNIFORMS.uGlowPos.value.set(w.x, groundHeight(w.x, w.z) + v.rideOff + h + t.glowHeight, w.z);
  LIGHT_UNIFORMS.uHazeCentre.value.set(w.x, w.z);
  // The mood where she is (render/mood.ts): each area's own fog, grade tint and mist, eased across;
  // which area, looked up four times a second.
  if (v.areaMoods) {
    if (!(time < v.moodAt) || time < v.moodAt - 1) {
      v.moodAt = time + 0.25;
      const d = g.map.dancefloor;
      v.moodArea = Math.hypot(w.x - d.x, w.z - d.z) < g.map.homeRadius ? "home" : AREA_TYPES[g.map.typeOf(...g.map.cellSafe(w.x, w.z).cell)]?.id ?? "";
    }
    v.areaMoods.update(v.moodArea, Number.isNaN(v.moodTime) ? 0 : time - v.moodTime, LIGHT_UNIFORMS.uHazeColour.value, v.post.gradeTint, v.mist);
    v.moodTime = time;
  }
}
