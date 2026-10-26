// The frame's shared uniforms (moved out of view.ts's render, unchanged): the sprites' facing, the canopy's cut-out round her,
// the trunks' fade, finding creatures in the dark, the wind, her glow's reach and place, and the mood where she is.
import * as THREE from "three";
import type { View } from "../view";
import { AREA_TYPES } from "../../rules/map";
import { coastView } from "../../rules/camera";
import { canopyShown, witchHeight } from "../../rules/witch";

const smoothstep01 = (x: number) => x * x * (3 - 2 * x);
import { groundHeight, placed } from "../height";
import { focusOf } from "./culling";
import { LIGHT_UNIFORMS } from "../lighting";
import { hsvInto, moodOf } from "../mood";
import { biomeJitter } from "../../../art/flora/biomes.js";
import { FADE_MATERIALS, FADE_MESHES, SPRITE_UNIFORMS } from "../sprites";

/** Sets this frame's sprite and light uniforms, after the camera (`up`, its tilted up). */
export function setFrameUniforms(v: View, time: number, up: THREE.Vector3): void {
  const g = v.game, t = g.tuning;
  // Sprites face the camera, tilted back toward it by spriteTilt.
  const tilt = t.spriteTilt;
  // Across the screen: east, as the game's camera always looks north; the telescope's own way as it turns (render/view/camera.ts).
  const look = v.telescope, bearing = look ? (look.heading * Math.PI) / 180 : 0;
  SPRITE_UNIFORMS.uRight.value.set(Math.cos(bearing), 0, Math.sin(bearing));
  SPRITE_UNIFORMS.uUp.value.set(0, 1, 0).lerp(up, tilt).normalize();
  SPRITE_UNIFORMS.uFacing.value.crossVectors(SPRITE_UNIFORMS.uRight.value, SPRITE_UNIFORMS.uUp.value).normalize();
  // The canopy is always drawn; round the witch a hole is cut, sized to the view, which shrinks
  // to nothing as she rises (and opens as she descends).
  // In step with the camera, not her (Ed's playtest, 2026-10-13: "the canopy hider activates as soon as the transition happens,
  // when it should happen smoothly during the transition"): by the camera's eased lift, which trails hers, the hole held shut
  // over the first canopyCutout.hold of its way down (and shut again by the same share from the top on the way up), opening
  // from nothing over the rest; its soft edge growing with it (`open`), so the first frames of a descent don't send a wide ring
  // of crowns, a hair short of whole, into the see-through pass at once.
  const cut = t.canopyCutout, hold = Math.min(0.9, Math.max(0, cut.hold ?? 0)), camLift = Number.isFinite(g.camera.lift) ? g.camera.lift : g.witch.lift;
  const open = smoothstep01(Math.min(1, Math.max(0, (1 - camLift - hold) / (1 - hold))));
  const lifted = cut.hold === undefined ? canopyShown(g.witch) : 1 - open, edgeGrow = cut.hold === undefined ? 1 : smoothstep01(Math.min(1, open / 0.35));
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
  const S = t.suspects; // (the circle-bug suspects: tuning.json _suspects, the pause page's toggles)
  SPRITE_UNIFORMS.uCutout.value.set(hx, hy, 0.5 * cut.screenFraction * (S.holeCut ? 1 : 0) * v.width * (1 - lifted), Math.max(1, cut.edge * v.width * edgeGrow));
  SPRITE_UNIFORMS.uCutWhole.value = t.suspects.cutWhole ? cut.whole ?? 0 : 0;
  SPRITE_UNIFORMS.uCutShape.value.set(cut.wobble ?? 0, cut.outer ?? 0.35, cut.ragged ?? 0, cut.spread ?? 0.2);
  SPRITE_UNIFORMS.uTopFade.value = lifted;
  SPRITE_UNIFORMS.uTrunkFade.value.set(S.trunkFade ? t.trunkFade.metres : 0, v.mpp, t.trunkFade.share);
  SPRITE_UNIFORMS.uOcc.value.set(t.occlusion.fadeOpacity, t.occlusion.edge, t.occlusion.minHeight, t.occlusion.on && S.seeThrough ? 1 : 0); // (every frame: the pause page's sliders)
  { const M = moodOf(t); if (M && !t.bare) hsvInto(LIGHT_UNIFORMS.uGlowRgb.value, M.glowHue, M.glowSat, 1); } // (her glow's colour, every frame: the pause page's Hidden witch sliders)
  for (const b of [v.witchBatch, v.bareBatch]) if (b) { b.silhouetteOpacity = t.occlusion.silhouette; b.silhouetteColour = LIGHT_UNIFORMS.uGlowRgb.value; } // (her silhouette's strength and colour, live too)
  for (const m of FADE_MATERIALS) { m.depthWrite = S.seeWrite; if (m.stencilRef === 1) m.stencilWrite = S.seeStencil; m.blending = S.seeNoBlend ? THREE.NoBlending : THREE.NormalBlending; }
  for (const o of FADE_MESHES) o.renderOrder = S.seeEarly ? 0.6 : 11;
  SPRITE_UNIFORMS.uSeeSolid.value = ({ off: 0, all: 1, circle: 2, rest: 3 } as Record<string, number>)[S.seeSolid] ?? 0;
  SPRITE_UNIFORMS.uSeeShowA.value = S.seeShowAlpha ? 1 : 0;
  SPRITE_UNIFORMS.uSeeDither.value = S.seeDither ? 1 : 0;
  SPRITE_UNIFORMS.uSeeTwo.value = S.seeTwo ? 1 : 0;
  if (v.mist) v.mist.mesh.visible = S.mist;
  if (v.lightRings) v.lightRings.mesh.visible = S.lightRings;
  SPRITE_UNIFORMS.uSeeDbg.value.set(S.seeSplit ? 1 : 0, S.seeMark ? 1 : 0, S.seeCull ? 1 : 0, S.seeKeep ? 1 : 0);
  SPRITE_UNIFORMS.uAreaAvg.value = S.areaAverage ? 1 : 0;
  SPRITE_UNIFORMS.uSeeDepth.value = S.seeDepth ? 1 : 0;
  if (!t.bare) LIGHT_UNIFORMS.uGlowPower.value = S.glow ? t.glowPower : 0;
  { const H = LIGHT_UNIFORMS.uHazeRange.value; if (!S.haze && !v.hazeKept) { v.hazeKept = H.clone(); H.set(1e5, 2e5); } else if (S.haze && v.hazeKept) { H.copy(v.hazeKept); v.hazeKept = null; } }
  SPRITE_UNIFORMS.uTrunkLook.value.set(t.trunkFade.lightFloor, t.trunkFade.rim);
  SPRITE_UNIFORMS.uDebugTrunks.value = v.debugTrunks ? 1 : 0;
  const Fd = t.find; // finding wild creatures in the dark (Ed, v244)
  SPRITE_UNIFORMS.uFindLook.value.set(Fd.lightFloor, Fd.rim, Fd.eyeshine.strength, Fd.eyeshine.blink);
  SPRITE_UNIFORMS.uEyeRange.value = Fd.eyeshine.range;
  // Each tree's own leaf colour (Ed, 2026-10-16 and 2026-10-19; the tuning's leafJitter: the autumn share, the value share and the hue degrees; render/sprites.ts).
  // The island's biome keeps its share of the autumn and the hue turn (art/flora/biomes.js: none under snow, so it stays white).
  const LJ = t.leafJitter, bj = biomeJitter(v.assets.style.biome ?? v.assets.typeBiome);
  SPRITE_UNIFORMS.uLeafJitter.value.set(LJ ? LJ.autumn * bj : 0, LJ ? LJ.value : 0, LJ ? ((LJ.hue ?? 0) / 360) * bj : 0);
  // The wind: gentler over the treetops (Ed, v171: "gentle and lovely").
  const W = t.wind;
  SPRITE_UNIFORMS.uWind.value.set(W.on ? W.strength * (1 + (W.treetop - 1) * lifted) : 0, W.speed, W.gustScale, time);
  // The trees watching her (Ed, 2026-10-07; render/sprites.ts uWatch): where she was a beat ago, eased lag seconds behind.
  const Wt = t.watching, at = v.watch;
  if (Wt?.on) {
    if (Number.isNaN(at.x)) { at.x = g.witch.x; at.z = g.witch.z; }
    else { const k = 1 - Math.exp(-Math.min(0.5, Math.max(0, time - at.t)) / Math.max(0.05, Wt.lag)); at.x += (g.witch.x - at.x) * k; at.z += (g.witch.z - at.z) * k; }
    at.t = time;
    SPRITE_UNIFORMS.uWatch.value.set(at.x, at.z, Wt.radius, Wt.lean);
  } else SPRITE_UNIFORMS.uWatch.value.w = 0;
  // The witch's glow reaches as far as the ground-mode canopy hole round her (Ed, v149: "about
  // the width of the canopy hiding circle"): the hole's radius plus its soft edge, in metres at
  // her depth, times glowToCutout; beyond it the forest is dark. ?glow= fixes it instead.
  if (!t.glowFixed) {
    const wx = g.witch.x, wz = g.witch.z, R = SPRITE_UNIFORMS.uRight.value;
    const a = placed(v.v3.set(wx, 0, wz)).project(v.camera).x, b = placed(v.v3.set(wx + R.x * 10, 0, wz + R.z * 10)).project(v.camera).x;
    const pxPerM = Math.max(1e-3, (Math.abs(b - a) * 0.5 * v.width) / 10);
    LIGHT_UNIFORMS.uGlowR.value = ((0.5 * cut.screenFraction + cut.edge) * v.width / pxPerM) * t.glowToCutout;
  }
  // At night (Ed, 2026-10-06: "Seems very bright for nighttime"): the hole's share of the screen is many more metres from a far
  // camera, so her light is held to nightLight.maxReach metres anywhere (the ground camera's own, about), and over the treetops
  // to a lantern's few metres (treetopReach), dimmed (treetopGlow), eased in as she rises; the canopy stays moonlit, warm
  // only close round her.
  const NL = t.nightLight, rise = Math.max(0, Math.min(1, g.witch.lift));
  if (NL) {
    const R0 = Math.min(LIGHT_UNIFORMS.uGlowR.value, NL.maxReach); // (never more than a lantern's metres, however far the camera: stargazing, zoomed out)
    const R1 = R0 + (Math.min(R0, NL.treetopReach) - R0) * rise;
    LIGHT_UNIFORMS.uGlowR.value = R1 + (Math.min(R1, NL.gazeReach ?? R1) - R1) * coastView(g.camera).gaze; // (lying on the sand to stargaze, the camera low and far: her own small pool, eased with the bend)
    LIGHT_UNIFORMS.uGlowDim.value = 1 + (NL.treetopGlow - 1) * rise;
  }
  // In the wild, dimmer; in a fight, back up (render/combatLight.ts: eased over seconds, so it isn't seen to change).
  const CL = t.combatLight;
  if (CL) {
    v.combatLight.update(g, CL, g.clock.time);
    const f = v.combatLight.factors(CL);
    // (from a base each frame: a fixed reach, ?glow=, isn't worked out again each frame, and neither is the dimming without nightLight)
    const R = t.glowFixed ? (v.combatLight.fixedReach ??= LIGHT_UNIFORMS.uGlowR.value) : LIGHT_UNIFORMS.uGlowR.value;
    LIGHT_UNIFORMS.uGlowR.value = R * f.reach; LIGHT_UNIFORMS.uGlowDim.value = (NL ? LIGHT_UNIFORMS.uGlowDim.value : 1) * f.glow;
  }
  SPRITE_UNIFORMS.uDebugCull.value = v.debugCull ? 1 : 0;

  const w = g.witch, h = witchHeight(w, t);
  LIGHT_UNIFORMS.uGlowPos.value.set(w.x, groundHeight(w.x, w.z) + v.rideOff + h + t.glowHeight, w.z);
  { const fo = focusOf(v); LIGHT_UNIFORMS.uHazeCentre.value.set(fo.x, fo.z); } // (her, or the arrival's flight's aim: app/arrive.ts)
  // The mood where she is (render/mood.ts): each area's own fog, grade tint and mist, eased across;
  // which area, looked up four times a second.
  if (v.areaMoods) {
    if (!(time < v.moodAt) || time < v.moodAt - 1) {
      v.moodAt = time + 0.25;
      const d = g.map.dancefloor;
      v.moodArea = Math.hypot(w.x - d.x, w.z - d.z) < g.map.homeRadius ? "home" : AREA_TYPES[g.map.typeOf(...g.map.cellSafe(w.x, w.z).cell)]?.id ?? "";
    }
    v.areaMoods.update(v.moodArea, Number.isNaN(v.moodTime) ? 0 : time - v.moodTime, LIGHT_UNIFORMS.uHazeColour.value, v.post.gradeTint, v.mist && { setStrength: (k: number) => v.mist!.setStrength(k * (t.mist.gain ?? 1)) }); // (mist.gain: the pause page's Low mist slider, Ed 2026-10-14)
    v.moodTime = time;
  }
}
