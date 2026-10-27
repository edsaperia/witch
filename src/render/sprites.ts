// A batch of camera-facing sprites sharing one atlas, drawn as one instanced draw call.
// Each sprite stands on the ground at its base, faces the camera (tilted back toward it by
// spriteTilt), and is lit per pixel from its normal map. Tree tops carry a flag so the canopy
// can dither in and out as the witch rises and descends.
import { HIZ_GLSL, HIZ_UNIFORMS } from "./hiz";
import * as THREE from "three";
import { PIXEL_SNAP_GLSL, WIND_GUST_GLSL } from "./shaders";
import type { Atlas, Frame } from "./atlas";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";
import { WITCH_LIGHT_GLSL, witchLightUniform } from "./witchLight";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { CAST_SHADOW_GLSL, CAST_SHADOW_UNIFORMS } from "./castShadows";
import { Dirty } from "./dirty";

/** One art pixel's size in the world (metres): the sprites' scale at the tuning's pixel size. */
export function metresPerArtPixel(t: { artPixelsPerMetre: number; pixelSize: number }): number {
  return 1 / (t.artPixelsPerMetre * (2 / t.pixelSize));
}

/** Shared by every sprite batch: the camera's right and (tilted) up, and the canopy fade. */
export const SPRITE_UNIFORMS = {
  /** The mood's moonlight rim on characters (render/mood.ts): colour, strength (0 off). */
  uMoodRim: { value: new THREE.Vector4() },
  /** 1 when the sprites are stylised (?style=bold|ref): their outermost pixel is the style's dark outline, so the rim goes just inside it. */
  uRimInset: { value: 0 },
  /** How much of her own glow lights the witch (render/mood.ts; 0 none, as she was). */
  uWitchGlow: { value: 0 },
  /** Her pool's light thrown up onto her, added (the mood's witchLift, or styledLift with ?style=bold|ref). */
  uWitchLift: { value: 0 },
  uRight: { value: new THREE.Vector3(1, 0, 0) },
  uUp: { value: new THREE.Vector3(0, 1, 0) },
  uFacing: { value: new THREE.Vector3(0, 0, 1) },
  uTopFade: { value: 0 },
  // The hole in the canopy round the witch: her place on screen (pixels), radius and edge (pixels).
  uCutout: { value: new THREE.Vector4(0, 0, 0, 1) },
  /** How much the hole goes by each crown's middle rather than each pixel (canopyCutout.whole): 1, whole crowns fade. */
  uCutWhole: { value: 0 },
  /** The hole's edge (canopyCutout): how far its line wobbles (a share of the edge), how far past its radius the fade reaches (a
   *  share of the edge), how ragged its outline is round her (a share of the radius) and how far each tree's own radius spreads. */
  uCutShape: { value: new THREE.Vector4(0, 0.35, 0, 0.2) },
  // ?debug=cull: anything that has just appeared is tinted bright red.
  uDebugCull: { value: 0 },
  // The low-resolution picture's size in pixels: each sprite's base is snapped to its pixel grid.
  uRes: { value: new THREE.Vector2(1, 1) },
  // The witch on screen (pixels: centre x, y, half width, half height) and her distance from the
  // camera, so whatever stands in front of her can fade; uOcc: fade opacity, soft edge (share of her size),
  // the height (m) above which a thing counts as tall, on (1) or off (0).
  uWitch: { value: new THREE.Vector4(0, 0, 0, 0) },
  uWitchDepth: { value: 0 },
  uOcc: { value: new THREE.Vector4(0.38, 6, 2.5, 1) },
  // Lying on the beach to stargaze the camera sits low behind her (rules/camera.ts beach.camera): anything nearer it than this
  // (metres, by its base's depth) dithers away, so trees behind her don't fill the picture (0: off).
  uNearCut: { value: 0 },
  /** The place she stands in kept clear (Ed, 2026-10-26: "When the witch stands in a legend circle, scenery in front of it should
   *  fade away"; render/view/reveal.ts): its box on screen (pixels: x0, y0, x1, y1; a legend's circle and its legend, a runestone,
   *  the find, a flask), and its centre's depth from the camera (m), how far it's faded in (0 to 1), the soft edge (pixels) and the
   *  depth (m) it eases over. */
  uCircleBox: { value: new THREE.Vector4(0, 0, 0, 0) },
  uCircleFade: { value: new THREE.Vector4(0, 0, 1, 1) },
  /** And what stands at its centre, never faded: anything standing within z metres of (x, y) on the ground (a relic, the trunk and a
   *  runestone are stood toward the camera by part of their height, nearer than the centre they mark); and nothing standing more than
   *  w metres from it fades (0: no limit), easing back over the last uCircleFade.w metres. */
  /** The forest's far edge dithered in the solid pass, not faded in the see-through passes (1: the quality ladder's rung,
   *  app/ladder.ts; scenery.edgeDither). Its pixels drawn or not by a 4×4 ordered dither on the art's own pixels. */
  uEdgeDither: { value: 0 },
  /** The cut-away round her with a hard edge: each crown in the hole's band cut or drawn whole, never half see-through (the
   *  quality ladder's rung, app/ladder.ts; canopyCutout.hard): where on the soft fade it cuts (0 < it ≤ 1; 0 off, the fade as ever). */
  uHoleHard: { value: 0 },
  uCircleKeep: { value: new THREE.Vector4(0, 0, 0, 0) },
  /** Quads faded whole left out of the solid and front passes (1; 0 draws them there too, as before, to compare: ?wholecull=0). */
  uWholeCull: { value: typeof location !== "undefined" && new URLSearchParams(location.search).get("wholecull") === "0" ? 0 : 1 },
  // The party's canopy uplight: the nearest partified areas (centre x, z, reach, fade-in) and their
  // colours; uUplight: strength, pulse, edge (m), the beat's phase (radians).
  uParty: { value: Array.from({ length: 16 }, () => new THREE.Vector4()) },
  uPartyCol: { value: Array.from({ length: 16 }, () => new THREE.Vector3()) },
  uPartyCount: { value: 0 },
  uUplight: { value: new THREE.Vector4() },
  /** The trunk fade: metres covered (0 off), metres per art pixel. */
  uTrunkFade: { value: new THREE.Vector3(0, 0.125, 0.3) },
  /** Finding wild creatures in the dark (Ed, v244; tuning find), for wild
   *  creatures' batches only: their light floor (a share of their unlit look), a rim from her
   *  glow, their eyeshine's strength (0 off) and the share of the time they blink; uEyeRgb its colour, uEyeRange its reach (m). */
  uFindLook: { value: new THREE.Vector4() },
  uEyeRgb: { value: new THREE.Vector3(1, 0.8, 0.35) },
  uEyeRange: { value: 40 },
  /** Trees' trunks: their light floor (a share of their unlit look) and the rim from her glow (Ed, v271). */
  uTrunkLook: { value: new THREE.Vector2(0.8, 0.5) },
  /** The circle-bug suspects' switches (tuning suspects: render/view/frameUniforms.ts): scenery averaged where it shrinks; the see-through pass's depth. */
  uAreaAvg: { value: 1 },
  uSeeDepth: { value: 1 },
  uSeeDbg: { value: new THREE.Vector4(1, 0, 1, 0) },
  uCullByPass: { value: new URLSearchParams(globalThis.location?.search ?? "").get("cullpass") === "0" ? 0 : 1 }, // (the perf pass's A2: each see-through pass culled by the kind of pixel it keeps; 0 as before, for the checks)
  uCullDbg: { value: 7 }, // (the perf pass: which of the see-through cull's keep-rules are live, 1 her circle, 2 the hole's band, 4 the budget's edge; 7 as the game)
  /** The see-through passes ask passOf first (1; 0: where they always did, to compare: tools/bench/early-diff.cjs). */
  uSeeEarly: { value: 1 },
  uSeeTwo: { value: 1 }, // (her see-through in a pass of its own, before the half-faded things: suspects.seeTwo)
  uSeeDither: { value: 0 }, // (the circle hunt: the see-through as a dither in the solid pass, no second pass)
  uSeeShowA: { value: 0 }, // (the circle hunt: the see-through pass shows its own opacity, grey, white solid)
  uSeeSolid: { value: 0 }, // (the circle hunt: the see-through pass drawn solid, alpha 1, no blending) // (the circle hunt: x, occlusion splits the passes; y, the see-through pass's pixels marked magenta)
  /** The smoke test: trunks drawn flat magenta, to count where they are on screen. */
  uDebugTrunks: { value: 0 },
  /** The wind (Ed, v171): sway at the top of a crown (metres), the gusts' speed (m/s) and size (m), and the time. */
  uWind: { value: new THREE.Vector4(0, 0, 1, 0) },
  /** Per-tree leaf-colour jitter (Ed, 2026-10-16 and 2026-10-19; the tuning's leafJitter): the autumn share, the value share and the hue turn in turns at a seed of 1 (render/view/frameUniforms.ts). */
  uLeafJitter: { value: new THREE.Vector3(0, 0, 0) },
  /** The trees watching her (Ed, 2026-10-07): where she was a beat ago (x, z), how near (m) a leafy thing must stand to lean
   *  her way, and how far its tip leans (m). */
  uWatch: { value: new THREE.Vector4(0, 0, 9, 0) },
};

const VERT = /* glsl */ `
uniform vec4 uSeeDbg;
uniform vec3 uRight, uUp;
uniform vec2 uRes;
uniform float uWitchDepth;
uniform vec4 uOcc;
uniform float uNearCut;
varying float vNear;
uniform vec4 uCircleBox, uCircleFade;
uniform vec4 uCircleKeep;
uniform float uHasFade, uEdgeDither, uHoleHard;
uniform float uWholeCull;
varying float vCircle; // how much of it shows, the place she stands in kept clear (1 all of it)
uniform float uAbsolute; // its y is a world height, not a height over the ground
uniform vec4 uLean; // the witch under a load (render/load.ts): sheared forward (m per m up), tilted nose-up (m per m across), her broom bowed (art pixels)
uniform vec4 uCutout, uWitch;
varying float vHole;   // crowns and cut trunks: the radius of the hole round her (pixels) for this tree
varying float vCrownD; // and how far the nearest of its crown is from the hole's middle on screen (pixels)
uniform vec4 uCutShape;
varying float vOverHer; // over her on screen and nearer the camera: it could hide her
uniform float uCutWhole, uTopFade, uFadePass, uIsScenery, uAppear, uFlat;
uniform vec4 uSilhouette;
uniform vec2 uScenery, uHazeCentre;
uniform float uCullDbg, uCullByPass, uSeeTwo, uSeeDither;
uniform float uCanopyReach;
attribute vec3 iPos;
attribute vec3 iSize; // its width and height (metres), and how far its foot reaches either side of its base
attribute vec4 iUv;
attribute vec4 iFlags; // flip, top (or a trunk's cut, negative), fresh, sway
attribute float iGlow; // glowing white, 0 to 1 (a party animal evolving); -1: a wild creature blinking (no eyeshine); -0.5: switched off (its glowing pixels unlit)
attribute vec2 iJitter; // a tree's own leaf-colour jitter seeds, -1 to 1 (hue, value); 0 for everything else (render/view/scenery.ts; Ed, 2026-10-16)
varying float vGlow;
varying vec2 vJitter;
varying float vSwayM; // metres its leafiest pixels move this frame (masked sprites)
varying vec4 vFrame;  // its frame in the atlas (u0, v0, u1, v1), to keep the sway inside it
uniform vec4 uWind;
uniform vec4 uWatch;
varying vec2 vUv;
varying vec3 vWorld;
varying vec3 vFlags;
varying float vFront;
varying vec2 vLocal;
varying float vSizeY;
varying vec2 vGround; // its ground spot under this pixel: its foot, across its width (the cast shadows: render/castShadows.ts)
${HEIGHT_VERT_GLSL}
${WIND_GUST_GLSL}${PIXEL_SNAP_GLSL}${HIZ_GLSL}
void main() {
  // Every sprite stands upright on the rolling ground (height.ts), at the lowest ground under its
  // foot (most of its width, up to 5 m either side of its base, at five points): on a slope its uphill side is planted in the
  // hillside and nothing floats (Ed, v276: 50 m hills, too steep to skew sprites to). A foot drawn wider than that (a kapok's
  // buttresses, a strangler fig's roots, 30 m across) reaches as far as it's drawn, so its tips don't hang over the downhill side.
  // (Or, for her, at the height given: she rides a smoothed height over the hills, ride.ts.)
  float fw = max(min(iSize.x * 0.45, 5.0), iSize.z);
  float gl = min(min(groundH(iPos.xz), min(groundH((iPos - uRight * fw).xz), groundH((iPos + uRight * fw).xz))), min(groundH((iPos - uRight * fw * 0.5).xz), groundH((iPos + uRight * fw * 0.5).xz)));
  vec3 base = iPos + vec3(0.0, uAbsolute > 0.5 ? 0.0 : gl, 0.0);
  // Tall and nearer the camera than the witch: it may stand in front of her.
  // Eased over a few metres of depth and of height, so nothing snaps into the fade as she moves.
  vFront = smoothstep(0.0, 3.0, uWitchDepth - 0.5 + (viewMatrix * vec4(base, 1.0)).z) * smoothstep(uOcc.z * 0.7, uOcc.z * 1.3, iSize.y);
  vec3 w = base + uRight * (position.x * iSize.x) + uUp * (position.y * iSize.y);
  w += uRight * (uLean.x * position.y * iSize.y) + uUp * (uLean.y * position.x * iSize.x);
  // Wind (Ed, v171): leafy things lean with gusts travelling across the forest, anchored at their
  // base (a crown at its foot, a trunk barely), so the trunks stay put and the foliage moves.
  if (iFlags.w > 0.0 && uWind.x > 0.0) {
    vec2 q = iPos.xz / uWind.z - vec2(0.8, 0.35) * uWind.w * uWind.y / uWind.z;
    float gust = windGust(q);
    float flutter = sin(uWind.w * 1.7 + dot(iPos.xz, vec2(0.31, 0.17))) * 0.35;
    w += uRight * (uWind.x * iFlags.w * uv.y * uv.y * (gust * 0.9 + flutter)) * min(1.0, iSize.y / 8.0);
  }
  // With a sway mask (#34; negative sway), the quad stays put and the fragment shader moves its leaves.
  vSwayM = 0.0;
  if (iFlags.w < 0.0 && uWind.x > 0.0) {
    vec2 q = iPos.xz / uWind.z - vec2(0.8, 0.35) * uWind.w * uWind.y / uWind.z;
    float gust = windGust(q);
    float flutter = sin(uWind.w * 1.7 + dot(iPos.xz, vec2(0.31, 0.17))) * 0.35;
    vSwayM = uWind.x * -iFlags.w * (gust * 0.9 + flutter) * min(1.0, iSize.y / 8.0);
  }
  // The trees watching her (Ed, 2026-10-07, the wild forest eerier: \"canopy tips within a few metres of her sway a beat late
  // and slightly towards her, as if the trees lean in to watch\"): a leafy thing near where she was a moment ago (uWatch,
  // eased behind her) leans its tip that way, across the screen, none at its foot; a nudge, no new objects.
  if (uWatch.w > 0.0 && iFlags.w != 0.0) {
    vec2 d = uWatch.xy - iPos.xz;
    float r = length(d), k = (1.0 - smoothstep(uWatch.z * 0.4, uWatch.z, r)) * smoothstep(0.3, 1.2, r);
    float lean = uWatch.w * k * dot(d / max(r, 1e-3), normalize(uRight.xz + vec2(1e-6, 0.0))) * abs(iFlags.w) * min(1.0, iSize.y / 8.0);
    if (iFlags.w > 0.0) w += uRight * (lean * uv.y * uv.y);
    else vSwayM += lean;
  }
  vFrame = vec4(min(iUv.x, iUv.z), min(iUv.y, iUv.w), max(iUv.x, iUv.z), max(iUv.y, iUv.w));
  float u = iFlags.x > 0.5 ? 1.0 - uv.x : uv.x;
  vUv = vec2(mix(iUv.x, iUv.z, u), mix(iUv.w, iUv.y, uv.y));
  vFlags = iFlags.xyz;
  vGlow = iGlow;
  vJitter = iJitter;
  vLocal = uv;
  vSizeY = iSize.y;
  vWorld = w;
  vGround = (iPos + uRight * (position.x * iSize.x)).xz;
  gl_Position = clipOf(w);
  vNear = uNearCut > 0.0 ? smoothstep(uNearCut * 0.75, uNearCut, -(viewMatrix * vec4(base, 1.0)).z) : 1.0;
  // Snap the whole sprite by its base to the pixel grid, so it moves a whole pixel at a time and
  // its small bright details (flowers, eyes) don't shimmer in and out as the camera glides.
  gl_Position.xy += pixelSnap(clipOf(base)) * gl_Position.w;
  // The hole cut in the canopy round her (Ed, round 7: "the crown-hiding circle still has a very
  // sharp edge"): each tree's crown (and its cut trunk with it) has its own radius for it, a little
  // nearer or further than the next, so no line runs across the canopy, and fades over a wide band.
  vHole = 1.0; vOverHer = 0.0; vCrownD = 0.0;
  // Its rectangle on screen (pixels): its middle and half-widths, from its foot and its top.
  vec4 c0 = clipOf(base), c1 = clipOf(base + uUp * iSize.y);
  vec2 s0 = (c0.xy / c0.w * 0.5 + 0.5) * uRes, s1 = (c1.xy / c1.w * 0.5 + 0.5) * uRes;
  float hh = abs(s1.y - s0.y) * 0.5 + 1.0, hw = hh * iSize.x / max(iSize.y, 0.01);
  vec2 cc = (s0 + s1) * 0.5;
  float wob = 0.5 * uCutout.w * uCutShape.x; // (the hole's edge wobbles this far either way)
  // The place she stands in (uCircleFade.y, eased in and out: a legend's circle, a runestone, the find, a flask): anything standing
  // nearer the camera than its centre whose rectangle covers its box on screen (the grove's south trees, the rim's stones, crowns) fades out
  // whole, easing over a few pixels of the boxes' gap and a few metres of depth, so nothing snaps at the line.
  vCircle = 1.0;
  float keepD = length(iPos.xz - uCircleKeep.xy);
  if (uCircleFade.y > 0.0 && uHasFade > 0.5 && uFlat < 0.5 && keepD >= uCircleKeep.z) {
    vec2 bc = (uCircleBox.xy + uCircleBox.zw) * 0.5, bh = (uCircleBox.zw - uCircleBox.xy) * 0.5;
    float gap = length(max(abs(cc - bc) - bh - vec2(hw, hh), 0.0));
    float within = uCircleKeep.w > 0.0 ? 1.0 - smoothstep(uCircleKeep.w - uCircleFade.w, uCircleKeep.w, keepD) : 1.0; // (only so far from it)
    vCircle = 1.0 - uCircleFade.y * within * (1.0 - smoothstep(0.0, uCircleFade.z, gap)) * smoothstep(0.0, uCircleFade.w, uCircleFade.x + (viewMatrix * vec4(base, 1.0)).z);
    if (vCircle < 0.004) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; } // (wholly gone: in no pass)
  }
  if (abs(iFlags.y) > 0.001) {
    // Its own radius for the hole (vHole here: in pixels): each tree's own, spread round the hole's (uCutShape.w), and the
    // outline ragged round her, its bays and points drifting slowly round (uCutShape.z: Ed, 2026-10-06, "circle": no round line).
    vec2 off = cc - uCutout.xy;
    float j = fract(sin(dot(floor(iPos.xz * 2.0), vec2(12.9898, 78.233))) * 43758.5453), ang = atan(off.y, off.x), tw = uWind.w;
    float rag = 0.5 * sin(ang * 3.0 + tw * 0.07 + 1.3) + 0.3 * sin(ang * 5.0 - tw * 0.05 + 4.1) + 0.2 * sin(ang * 7.0 + tw * 0.11 + 2.2);
    vHole = uCutout.z * (1.0 + uCutShape.w * (j - 0.5) * 2.0) * (1.0 + uCutShape.z * rag);
    // How far it is: from its middle less half its half-size (its rectangle on screen shrunk by half), so a big crown over her
    // goes as a whole, not stood whole by its far middle, while the canopy's big crowns at the screen's edges stay its roof.
    vCrownD = length(max(abs(off) - vec2(hw, hh) * 0.5, 0.0));
    // Whether it could hide her: over her sprite on screen and nearer the camera than her.
    vOverHer = abs(cc.x - uWitch.x) < hw + uWitch.z && abs(cc.y - uWitch.y) < hh + uWitch.w && uWitchDepth + (viewMatrix * vec4(base, 1.0)).z > 0.0 ? 1.0 : 0.0;
  }
  // A quad faded whole (every pixel of it half see-through: a crown in the hole's band, faded by its middle as uCutWhole has it; a
  // place kept clear; a batch still appearing) has no pixel of the solid pass's or the front pass's (passOf: see, and not occlusion
  // alone), so it's left out of both (the quality-ladder study, 2026-10-26: the solid pass shaded every such crown whole and threw
  // it all away; 12 to 19% of the frame's GPU time on foot in a thick wood, the picture the same to the pixel). uWholeCull 0: as before.
  if (uWholeCull > 0.5 && uHasFade > 0.5 && uSilhouette.a <= 0.0 && (uFadePass < 0.5 || uFadePass > 2.5)) {
    bool whole = vCircle < 0.996 || (uIsScenery > 0.5 && uAppear < 0.996);
    if (!whole && iFlags.y > 0.5 && uCutWhole >= 0.999) whole = max(smoothstep(vHole - uCutout.w, vHole + uCutout.w * uCutShape.y, vCrownD), uTopFade) < (uHoleHard > 0.0 ? uHoleHard : 0.996); // (the hard cut-away: drawn whole from its threshold, so only those under it are gone)
    if (whole) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  }
  // What the pixels could never show, left undrawn whole (the ground-mode GPU cost, the coordinator's ask from Ed's overlay,
  // 2026-10-13: the scenery's quads rasterised twice over, the see-through pass discarding nearly every pixel after its taps). Its
  // rectangle with a margin for the wind, the lean, the watch and the snap, in pixels. Conservative: a quad kept whenever any of
  // its pixels might be drawn, so the picture is the same to the pixel (tools/bench).
  float pxm = 2.0 * hh / max(iSize.y, 0.01); // (screen pixels a metre, up the sprite)
  vec2 halfPx = vec2(hw, hh) + 4.0 + pxm * (abs(uWind.x) * abs(iFlags.w) * 1.3 * min(1.0, iSize.y / 8.0) + abs(uLean.x) * iSize.y + abs(uLean.y) * iSize.x + abs(uWatch.w) * abs(iFlags.w));
  // Behind the treehouse's own solid pixels, every pixel of it (render/hiz.ts: the perf pass, 2026-10-23): its nearest point (its
  // foot or its top: across, it's square to the camera) farther than the farthest occluder pixel its rectangle could touch.
  if (uIsScenery > 0.5 && uHizOn > 0.5 && hizHidden(cc - halfPx, cc + halfPx, min(c0.z / c0.w, c1.z / c1.w) * 0.5 + 0.5)) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  // A crown wholly inside the hole (every pixel of it cut away, in either pass): its farthest corner still within the hole's inner edge.
  if (iFlags.y > 0.5 && uTopFade < 0.004) {
    vec2 far = abs(uCutout.xy - cc) + halfPx;
    if (mix(length(far) + wob, vCrownD, uCutWhole) + 1.0 < vHole - uCutout.w) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  }
  // The see-through pass: only what could have a see-through pixel (the fragment shader's \`see\`): a tall thing over her circle
  // and nearer than her; a crown or a cut trunk whose fade reaches into the hole's band; scenery at its budget's edge (or its
  // batch still appearing). Anything else is wholly the opaque pass's.
  if (uFadePass > 0.5 && uSilhouette.a <= 0.0 && uSeeDbg.z > 0.5) { // (uSeeDbg.z: the circle hunt's switch for this cull)
    // Two kinds of see-through pixel (the fragment shader's \`passOf\`): \`occl\`, over her circle in front of her, and \`seePart\`,
    // anything half faded (a crown in the hole's band, a cut trunk's top, scenery at its budget's edge or appearing).
    bool occ = false, part = (uIsScenery > 0.5 && uAppear < 0.996) || vCircle < 0.996;
    float dbg = uCullDbg;
    if (uFlat < 0.5 && uOcc.w > 0.0 && vFront > 0.0) {
      float R = (1.0 + uOcc.y) * max(max(uWitch.z, uWitch.w) * 1.2, 1.0);
      vec2 d = max(abs(uWitch.xy - cc) - halfPx, 0.0);
      if (dot(d, d) < R * R && mod(floor(dbg), 2.0) > 0.5) occ = true;
    }
    if (abs(iFlags.y) > 0.001 && uTopFade < 0.996 && (uHoleHard <= 0.0 || uTopFade > 0.004)) { // (hard: no crown half see-through in the band, but while the crowns fade in or out as she rises or comes down)
      vec2 d = max(abs(uCutout.xy - cc) - halfPx, 0.0);
      if (mix(length(d) - wob, vCrownD, uCutWhole) < vHole + uCutout.w * uCutShape.y + 1.0 && mod(floor(dbg / 2.0), 2.0) > 0.5) part = true;
    }
    if (uIsScenery > 0.5 && uEdgeDither < 0.5) { // (dithered in the solid pass instead: not kept for these passes)
      float r = max(uScenery.x, iFlags.y > 0.5 ? uCanopyReach : 0.0);
      if (length(iPos.xz - uHazeCentre) + iSize.x * 0.5 + 2.0 > r - uScenery.y && mod(floor(dbg / 4.0), 2.0) > 0.5) part = true;
    }
    // Each pass by the kind it keeps (the perf pass's A2, 2026-10-24: in a dense wood most of these passes' cost was the big trees
    // over her circle, drawn again in the half-faded pass that never keeps their pixels): with her see-through in a pass of its
    // own (uSeeTwo, no dither), the front pass (3) keeps only \`occl\` pixels that aren't half faded and the half-faded pass (1) only
    // \`seePart\`; the depth pass (2) both. Otherwise every pass keeps either, as before. (uCullByPass 0: as before, for the checks.)
    bool byPass = uCullByPass > 0.5 && uSeeTwo > 0.5 && uSeeDither < 0.5;
    bool need = !byPass ? occ || part : uFadePass > 2.5 ? occ : uFadePass > 1.5 ? occ || part : part;
    if (!need) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  }
}
`;

const FRAG = /* glsl */ `
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
uniform vec4 uCutout;
uniform float uDebugCull, uIsScenery, uAppear;
uniform vec4 uLean;
uniform vec4 uWitch, uOcc, uSilhouette;
varying float vNear;
uniform float uFadePass, uHasFade;
varying float vCircle;
uniform float uLies; // lies flat on the ground (no cast shadow taken: it's drawn over it already)
uniform float uFlat; // lies flat on the ground (a court's decal), or gameplay that stays solid: never cut away round her
uniform vec4 uParty[16];
uniform vec3 uPartyCol[16];
uniform int uPartyCount;
uniform vec4 uUplight;
varying vec2 vUv;
varying vec3 vWorld;
varying vec3 vFlags;
varying float vGlow;
varying float vSwayM; // metres its leafiest pixels move this frame (masked sprites)
varying vec4 vFrame;  // its frame in the atlas (u0, v0, u1, v1), to keep the sway inside it
varying float vFront;
varying vec2 vJitter;
uniform vec3 uLeafJitter; // per-tree leaf-colour jitter (Ed, 2026-10-16 and 2026-10-19; the tuning's leafJitter): the autumn share, the value share and the hue turn in turns
// A hue rotation about the grey axis (Rodrigues), a in radians: cheap, and the pixel's value and saturation kept.
vec3 hueRotate(vec3 c, float a) { const vec3 k = vec3(0.57735027); float ca = cos(a), sa = sin(a); return c * ca + cross(k, c) * sa + k * dot(k, c) * (1.0 - ca); }
varying float vHole, vOverHer, vCrownD;
uniform float uCutWhole;
uniform vec4 uCutShape;
varying vec2 vLocal;
varying float vSizeY;
varying vec2 vGround;
uniform float uFind; // this batch: 1 for wild creatures (eyeshine, light floor, rim)
uniform float uRimOn; // this batch: 1 for characters (the witch, creatures): the mood's moonlight rim
uniform vec4 uMoodRim; // the rim's colour and strength (0: none; render/mood.ts)
uniform float uRimInset; // 1: stylised sprites, the rim one pixel in from the edge (inside the style's outline)
float rimAlpha(vec2 q) { return q.x < vFrame.x || q.x > vFrame.z || q.y < vFrame.y || q.y > vFrame.w ? 0.0 : texture2D(uAlbedo, q).a; }
uniform vec4 uTint; // this batch's tint: colour and how much (enraged creatures' red, Ed 2026-10-05)
uniform float uSteps; // a legend's batch: its light in this many steps of brightness (0: smooth; Ed's round 14 playtest: "same pixel density and palette discipline")
uniform vec4 uLegend; // a sleeping legend's batch: its sigil's neon and the rim's strength (0: none; Ed's round 14 playtest)
uniform float uLegendFloor; // and the share of its own (mossed) look it never drops below
uniform float uGlowGain; // its glowing pixels (alpha 254) brighter by this, keeping their hue (the rune stones' runes, rank sigils: render/view/home.ts; 1 the rest)
uniform float uLegendAwake; // a dark-coated legend awake: the share of its own colour it never drops below at night (0 none; render/legendLight.ts)
uniform vec4 uFindLook;
uniform float uAreaAvg, uSeeDepth, uSeeSolid, uSeeShowA, uSeeDither, uSeeTwo;
uniform float uEdgeDither, uHoleHard;
uniform vec4 uSeeDbg;
uniform float uSeeEarly;
uniform vec2 uTrunkLook;   // trunks: light floor, rim
uniform float uDebugTrunks; // smoke: trunks drawn flat magenta
uniform vec3 uEyeRgb;
uniform float uEyeRange;
uniform vec3 uTrunkFade; // metres of trunk the fade covers at most, metres per art pixel, its most share of the visible trunk
uniform vec4 uWind;      // the wind: its time (w) sets the regions' flutter
${LIGHT_GLSL}
${CAST_SHADOW_GLSL}
${WITCH_LIGHT_GLSL}
// 4x4 ordered dither, for fading the canopy in pixel-art style.
float bayer(vec2 p) {
  int x = int(mod(p.x, 4.0)), y = int(mod(p.y, 4.0));
  int i = x + y * 4;
  int m[16] = int[16](0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5);
  return (float(m[i]) + 0.5) / 16.0;
}
// A slow value noise (0-1) for the hole's wobbly edge.
float cutHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float cutNoise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(cutHash(i), cutHash(i + vec2(1.0, 0.0)), f.x), mix(cutHash(i + vec2(0.0, 1.0)), cutHash(i + 1.0), f.x), f.y); }
// One screen pixel's step in the sprite's uv (main takes them, in uniform flow), and, where a sprite is drawn smaller than its
// art (far crowns, the bend squashing the far forest), the texels each pixel covers (Ed, 2026-10-06: "Trees with horizontal
// lines"): nearest sampling dropped whole rows of the leaf clusters' lit tops and shaded undersides, and what was left read as
// scanlines. There a pixel takes the average colour (and normal) of the opaque texels it covers; its alpha and its flags stay
// the texel's own, so outlines stay crisp. Scenery only.
vec2 uvDx, uvDy, areaH;
bool areaOn = false;
float leafAutumn = 0.0, leafTurn = 0.0; vec3 leafTone = vec3(0.0); // a tree's own drift toward its autumn colour (0 to 1) and that colour (the tuning's leafJitter.autumn)
// The autumn colours a tree drifts toward (Ed, 2026-10-19: "Why don't I see reds and oranges and purples from the jitter, only blue?"
// and, of the two ways offered, the second: each tree toward a warm palette rather than a plain hue turn): gold, orange, red,
// crimson, purple, by its seed.
vec3 autumnTone(float t) {
  t = clamp(t, 0.0, 1.0) * 4.0;
  vec3 g = vec3(0.95, 0.74, 0.18), o = vec3(0.96, 0.44, 0.1), r = vec3(0.86, 0.16, 0.1), c = vec3(0.7, 0.1, 0.32), p = vec3(0.52, 0.2, 0.68);
  return t < 1.0 ? mix(g, o, t) : t < 2.0 ? mix(o, r, t - 1.0) : t < 3.0 ? mix(r, c, t - 2.0) : mix(c, p, t - 3.0);
}
vec4 areaAvg(sampler2D t, vec2 uv, vec4 c) {
  vec3 sum = c.rgb; float w = 1.0;
  for (int i = 0; i < 4; i++) {
    vec2 o = vec2(i == 0 || i == 2 ? -areaH.x : areaH.x, i < 2 ? -areaH.y : areaH.y);
    vec2 q = clamp(uv + o, vFrame.xy, vFrame.zw);
    if (texture2D(uAlbedo, q).a > 0.5) { sum += texture2D(t, q).rgb; w += 1.0; }
  }
  return vec4(sum / w, c.a);
}
// The distance in screen pixels between two points, safe at mediump: scaled down before it's squared (a 16-bit float tops out
// near 65504, so length() of a difference over about 256 pixels overflowed) and clamped, so nothing far off can overflow either.
float screenDist(vec2 a, vec2 b) { return length(clamp((a - b) / 256.0, -100.0, 100.0)) * 256.0; }
// Which pass draws this pixel, and how see-through (Ed, 2026-10-06 on: the cut-away, the see-through circle, the two see-through
// passes): false where it's another pass's or cut away. Nothing here reads the art, so the see-through passes ask it first, before
// the sway's and the art's taps (the perf pass, 2026-10-23: in a dense wood those passes kept most quads, and each pixel paid every
// tap before it was thrown away); the solid pass asks it where it always has.
float occl, shown, trunkA;
bool passOf() {
  float e = screenDist(gl_FragCoord.xy, uWitch.xy) / max(max(uWitch.z, uWitch.w) * 1.2, 1.0);
  occl = uFlat > 0.5 ? 0.0 : uOcc.w * uSeeDbg.x * vFront * (1.0 - smoothstep(0.3, 1.0 + uOcc.y, e));
  // Crowns: hidden in a hole round the witch, which closes as she rises; its edge a smooth fade
  // (Ed: no dithering). A crown partly shown in the hole
  // is drawn see-through in the second pass where it's over her, after her, like whatever stands
  // in front of her: in the opaque pass it hid her (Ed, v289: she showed only as her silhouette inside a crisp disc).
  // The hole: a wide soft band at this tree's own radius (vHole); the pass by the whole crown (vOverHer).
  // Ed, 2026-10-06: "I still see concentric circles while moving through dense forests in ground mode": a fade by
  // each pixel's distance drew the same circular gradient across every crown, lining up into rings; by each crown's
  // middle (uCutWhole of the way), a crown fades much as a whole.
  // Ed, round 14: "canopy cut-out circle is still very sharp": by the crown's middle, a big crown near the camera (its
  // middle far off) stood whole right up to her and its edge read as a hard ring. So mostly by each pixel again, the
  // line wobbled by a slow noise on the ground (world space: it doesn't crawl as she moves) so the fade's lines aren't
  // circles, and fading over a wide band past the radius too (uCutShape: the wobble, and how far out the fade reaches).
  float wob = (cutNoise(vWorld.xz * 0.11 + vWorld.y * 0.07) - 0.5) * uCutout.w * uCutShape.x;
  float cutD = uCutWhole >= 0.999 ? vCrownD : mix(screenDist(gl_FragCoord.xy, uCutout.xy) + wob, vCrownD, uCutWhole); // (by the crown whole: its middle alone, never 0 × an overflow)
  float hole = smoothstep(vHole - uCutout.w, vHole + uCutout.w * uCutShape.y, cutD);
  if (uHoleHard > 0.0) hole = step(uHoleHard, hole); // (the quality ladder's hard cut-away: cut or whole)
  shown = 1.0;
  if (vFlags.y > 0.5) {
    shown = max(hole, uTopFade);
    if (shown < 0.004) return false;
  }
  // A trunk cut from its crown (Ed, v149: "fade out instead of just stop"): where the crowns are
  // hidden, its top fades out over uTrunkFade.x metres in a clustered ordered dither on the art's own
  // pixel grid; where the crowns show, it stays whole under them. The fade covers at most
  // uTrunkFade.z of the trunk's visible height (Ed, v233: short tangly trees kept no trunk at
  // all), so every trunk keeps a solid base. Smooth (Ed: no dithering), its top fades out in alpha (trunkA).
  trunkA = 1.0;
  if (vFlags.y < -0.001 && uTrunkFade.x > 0.0) {
    float crown = max(hole, uTopFade);
    float topY = 1.0 + vFlags.y, band = min(uTrunkFade.x / max(vSizeY, 0.01), topY * uTrunkFade.z);
    float t = clamp((topY - vLocal.y) / band, 0.0, 1.0);
    float keep = max(t, crown);
    if (keep < 0.004) return false;
    trunkA = uHoleHard > 0.0 ? step(uHoleHard, keep) : keep * keep * (3.0 - 2.0 * keep); // (hard: the cut trunk's top there or not)
  }
  // Which pass draws it. Anything partly see-through (a crown fading in the hole, a trunk's top fading, scenery fading at the
  // budget's edge) goes in the see-through pass, after everything solid and writing no depth (Ed, 2026-10-06: "no tree
  // trunks", "trees cut off at the top"): drawn in the opaque pass, nearest first for the early depth test, a half-faded
  // crown near the camera wrote its depth and hid every trunk and crown behind it, a teal carpet where the forest should be.
  // A batch with no see-through pass (uHasFade 0) keeps them in its one pass, as before.
  float edgeK = (uIsScenery > 0.5 ? (uEdgeDither > 0.5 ? 1.0 : vFlags.y > 0.5 ? canopyFade(vWorld) : sceneryFade(vWorld)) * uAppear : 1.0) * vCircle; // (dithered at the edge: not half faded there) // (a crown: out to the canopy's reach; and the place she stands in kept clear)
  bool part = shown * trunkA * edgeK < 0.996;
  bool seePart = part && (uHasFade > 0.5 || vOverHer > 0.5), see = occl > 0.001 || seePart;
  if (uSeeDither > 0.5) { see = seePart; if (uFadePass < 0.5 && occl > 0.001 && bayer(gl_FragCoord.xy) < occl * (1.0 - uOcc.x)) return false; } // (the circle hunt)
  // Two see-through passes (Ed, 2026-10-14, the circle bug, measured by the pause page's Circle report): what's in front of her
  // alone (uFadePass 3) first, writing its depth, so where it overlaps itself or what's half faded behind it the nearer wins as in
  // the solid pass; then whatever is half faded anyway (crowns at the cut-away's edge, trunk tops: uFadePass 1), blended over it.
  // In one pass, unsorted, a half-faded crown drawn before the trunk behind it lost or covered that trunk, but only inside her
  // circle, where the trunks were in that pass too: a hard round edge with the drawing jumbled inside it. (uSeeTwo 0: one pass, as before.)
  bool occOnly = see && !seePart, two = uSeeTwo > 0.5;
  bool mine = uFadePass < 0.5 ? !(uSeeDbg.w > 0.5 ? seePart : see) : uFadePass > 2.5 ? two && occOnly : uFadePass > 1.5 ? see : (two ? seePart : see); // (uSeeDbg.w, the circle hunt: the solid pass keeps what's in front of her too)
  return mine;
}
void shade() {
  // (the see-through passes: whether this pixel is theirs at all, first: passOf)
  bool early = uFadePass > 0.5 && uSilhouette.a <= 0.0 && uSeeEarly > 0.5;
  if (early && !passOf()) discard;
  // Swaying by its mask (#34): each pixel samples from where the wind has pushed the leaves; a
  // second tap lets leaf edges move out over empty pixels. Trunks and rocks (mask 0) stay still.
  // The mask is the art's pixel-wind code (art/sway.js swayCode): 0 rigid, else a region's phase (top 3 bits) and how far it moves
  // (low 5 bits, of 31). Pixel wind: each region moves whole, a whole art pixel at a time, out of step with the others; a pixel
  // shows whichever region's shift lands on it (moving ones first), or nothing where its own region has moved away.
  vec2 uvS = vUv;
  // Her broom bowing under a load (render/load.ts): the band it rides in sags in the middle, in whole art pixels.
  if (uLean.z > 0.0) {
    float bx = 2.0 * vLocal.x - 1.0, band = smoothstep(0.06, 0.16, vLocal.y) * (1.0 - smoothstep(0.42, 0.52, vLocal.y));
    uvS.y = clamp(uvS.y + floor(uLean.z * (1.0 - bx * bx) * band + 0.5) / float(textureSize(uAlbedo, 0).y), vFrame.y, vFrame.w);
  }
  if (vSwayM != 0.0) {
    float tw = float(textureSize(uAlbedo, 0).x), dir = vFlags.x > 0.5 ? -1.0 : 1.0, px = vSwayM / uTrunkFade.y;
    bool hit = false;
    for (int i = 1; i <= 5; i++) {
      float d = i == 5 ? 0.0 : (i == 1 ? 1.0 : i == 2 ? -1.0 : i == 3 ? 2.0 : -2.0);
      vec2 q = vUv - vec2(d * dir / tw, 0.0);
      if (q.x < vFrame.x || q.x > vFrame.z) continue;
      float c = floor(texture2D(uNormal, q).a * 255.0 + 0.5);
      float off = c < 0.5 ? 0.0 : clamp(floor((mod(c, 32.0) / 31.0) * px * (0.8 + 0.35 * sin(uWind.w * 2.3 + floor(c / 32.0) * 0.785)) + 0.5), -2.0, 2.0);
      if (off == d) { uvS = q; hit = true; break; }
    }
    if (!hit) discard;
  }
  vec4 a = texture2D(uAlbedo, uvS);
  if (a.a < 0.5) discard;
  if (vNear < 1.0 && bayer(gl_FragCoord.xy) >= vNear) discard; // (near the low stargazing camera: dithered away)
  if (uIsScenery > 0.5) {
    vec2 ts = vec2(textureSize(uAlbedo, 0)), fp = vec2(length(vec2(uvDx.x, uvDy.x)), length(vec2(uvDx.y, uvDy.y))) * ts;
    if (uAreaAvg > 0.5 && max(fp.x, fp.y) > 1.25) { areaOn = true; areaH = min(fp, vec2(3.0)) * 0.25 / ts; a = areaAvg(uAlbedo, uvS, a); }
    // Each tree's own leaf colour (Ed, 2026-10-16: "a small amount of per-tree colour jitter", docs/ART-GUIDE.md section 3): its
    // leaves' value scaled by its seed times the tuning's leafJitter here, and once lit (below) drifted toward its own autumn colour; its
    // wood (sway code 0) untouched.
    if ((vJitter.x != 0.0 || vJitter.y != 0.0) && (uLeafJitter.x != 0.0 || uLeafJitter.y != 0.0 || uLeafJitter.z != 0.0) && texture2D(uNormal, uvS).a * 255.0 >= 0.5) {
      a.rgb = clamp(a.rgb * (1.0 + vJitter.y * uLeafJitter.y), 0.0, 1.0);
      // (its colour by its hue seed; how far it goes, its own share of the knob, a second number from the same seeds: some trees barely turn)
      leafTone = autumnTone(0.5 + 0.5 * vJitter.x);
      leafAutumn = uLeafJitter.x * fract(abs(vJitter.x) * 7.31 + abs(vJitter.y) * 3.17);
      leafTurn = vJitter.x * uLeafJitter.z * 6.2831853; // (and its hue turned either way by up to leafJitter.hue: Ed, 2026-10-19, "stretch the slider")
    }
  }
  // The witch's see-through silhouette: where she is hidden, a flat tint in her glow colour.
  if (uSilhouette.a > 0.0) { gl_FragColor = vec4(uSilhouette.rgb, uSilhouette.a); return; }
  // Things standing in front of the witch fade (smoothly) where they cover her: left out of the
  // opaque pass there and drawn in a second, see-through pass after her.
  // A soft circle round her body, a little bigger than her sprite: fully see-through at the
  // centre, easing smoothly to opaque at the edge (uOcc.y: how far the edge reaches, a share of it).
  // (screenDist, not length(a - b): at mediump, the 16-bit floats some GPUs run this shader at, the square of a distance over about 256
  // screen pixels overflows, and everything further from her than that came out wrong: the circle bug, Ed, 2026-10-14, isolated to this fade)
  if (!early && !passOf()) discard;
  if (uFadePass > 1.5 && uSeeDepth < 0.5) discard; // (the depth pass, switched off: tuning suspects.seeDepth)
  float alpha = (uFadePass > 0.5 ? mix(1.0, uOcc.x, occl) : 1.0) * shown * trunkA;
  if (uFadePass > 0.5 && (uSeeSolid > 2.5 ? occl <= 0.001 : uSeeSolid > 1.5 ? occl > 0.001 : uSeeSolid > 0.5)) alpha = 1.0; // (the circle hunt: 1 all, 2 only her circle's, 3 only the rest)
  // Eye glints, flowers and magic glow: the generator marks them with alpha 254.
  if (uSeeDbg.y > 0.5 && uFadePass > 0.5 && (uFadePass < 1.5 || uFadePass > 2.5)) { gl_FragColor = vec4(mix(a.rgb, vec3(1.0, 0.0, 1.0), 0.6), alpha); return; } // (the circle hunt: what the see-through pass draws)
  if (uDebugCull > 0.5 && vFlags.z > 0.5) { gl_FragColor = vec4(1.0, 0.0, 0.0, alpha); return; }
  if (uUnlit > 0.5) { gl_FragColor = vec4(a.rgb, alpha); return; }
  // A wild creature's eye pixels are marked with alpha 253 (artBuild.ts markEyes); glowing ones 254.
  bool eyePx = a.a < 0.994;
  if (eyePx && uFind > 0.5 && uFindLook.z > 0.0 && vGlow > -0.5) {
    // Eyeshine (Ed, v244): a wild creature's eyes catch the light, pale gold, well beyond her
    // glow, blinking now and then (the view sets each one's blinks; a woken creature's red eyes
    // are glowing pixels, and stay red).
    float far = 1.0 - smoothstep(uEyeRange * 0.75, uEyeRange, length(vWorld.xz - uHazeCentre));
    float luma = dot(a.rgb, vec3(0.3, 0.55, 0.15));
    vec3 eye = uEyeRgb * (0.7 + 0.3 * luma) * (1.0 + uFindLook.z * 0.4);
    eye /= max(1.0, max(eye.r, max(eye.g, eye.b))); // brighter, but keeping its gold (not clipping to white)
    gl_FragColor = vec4(mix(haze(a.rgb * 0.3, vWorld), eye, far), alpha); return;
  }
  // (glow -0.5: switched off, a soundsystem standing when the party's over (render/party.ts): its glowing pixels lit as paint)
  if (a.a < 0.999 && !eyePx && abs(vGlow + 0.5) > 0.25) { vec3 g = a.rgb * uGlowGain; g /= max(1.0, max(g.r, max(g.g, g.b))); gl_FragColor = vec4(haze(g, vWorld), alpha); return; }
  vec4 n = texture2D(uNormal, uvS);
  if (areaOn) n = areaAvg(uNormal, uvS, n);
  float nx = (n.r * 255.0 - 128.0) / 127.0, ny = (n.g * 255.0 - 128.0) / 127.0, nz = n.b;
  if (vFlags.x > 0.5) nx = -nx;
  vec3 N = normalize(uRight * nx - uUp * ny + uFacing * nz);
  // Standing in a cast shadow (a trunk's, a palm's, scenery's: render/castShadows.ts), darkened and tinted by it where it falls on
  // this pixel's ground spot; not a crown up in the canopy, nor what lies flat on the ground (the shadow's drawn over that already).
  vec3 castK = uLies > 0.5 || vFlags.y > 0.5 ? vec3(1.0) : castShadow(vGround);
  if (uWitchLight.x > 0.5) { gl_FragColor = vec4(witchShade(a.rgb, N, uFacing, vWorld) * castK, alpha); return; }
  vec3 col = min(vec3(1.0), a.rgb * nightLight(N, vWorld) * 1.25);
  // The leaf jitter's colour, on the lit colour, not the albedo (Ed's v3893 playtest: "leafJitter.hue has no visible effect": the night's
  // coloured moonlight had squeezed a hue turn on the albedo to about a third on screen, 20 degrees moving the crowns 4.9 on average):
  // toward its autumn colour at the brightness the moonlight gave it, so a gold or red tree stays as dark as the night makes it.
  // Its hue turned too (up to 180 degrees either way, so any hue: Ed, "stretch the slider"), here on the lit colour so the degrees are the screen's.
  if (leafTurn != 0.0) col = clamp(hueRotate(col, leafTurn), 0.0, 1.0);
  if (leafAutumn > 0.0) { float l = dot(col, vec3(0.3, 0.55, 0.15)), lt = dot(leafTone, vec3(0.3, 0.55, 0.15)); col = clamp(mix(col, leafTone * (l / lt), leafAutumn), 0.0, 1.0); }
  // Scenery in her pool takes her light's own colour as the ground does (lighting.ts glowPool), so her light on green
  // crowns from the treetops reads amber, not lime (the art director via golf, #237). Characters keep their colours.
  if (uIsScenery > 0.5) col = glowPool(col, vWorld);
  // Trees' trunks (bottom halves cut from their crowns) stand in the canopy's shadow, where the
  // ambient and the moon barely reach: lit only by that they went black on black (Ed, v271: "We
  // have really lost our treetrunks"). Like wild creatures, they never drop below a share of
  // their unlit look and catch a rim from her glow.
  bool trunk = vFlags.y < -0.001;
  if (uDebugTrunks > 0.5 && trunk) { gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0); return; } // smoke: where trunks are drawn
  if (uFind > 0.5 || trunk) {
    // Wild creatures never drop below a share of their unlit look, and catch a faint rim from her
    // glow on the edge facing her, so they read against the dark ground (Ed, v244).
    vec2 look = uFind > 0.5 ? uFindLook.xy : uTrunkLook;
    // A trunk's floor keeps its roundness: lit from the moon's side (the upper left), shaded on
    // the other, so a smooth pale beech doesn't flatten into a featureless slab (Ed, 2026-10-04).
    float side = trunk && uFind < 0.5 ? 0.5 + 0.5 * clamp(dot(N, normalize(-uRight * 0.75 + uFacing * 0.65)), 0.0, 1.0) : 1.0;
    col = max(col, a.rgb * look.x * side);
    vec3 lv = uGlowPos - vWorld;
    float d = length(lv), k = 1.0 - smoothstep(uGlowR * 0.5, uGlowR * 1.8, d);
    float edge = 1.0 - clamp(dot(N, uFacing), 0.0, 1.0);
    col = min(vec3(1.0), col + mix(a.rgb, vec3(1.0), 0.5) * uGlowRgb * edge * max(0.0, dot(N, lv / max(d, 1e-3))) * k * look.y);
  }
  if (vFlags.y > 0.5 && uPartyCount > 0) {
    // Crowns over a party catch a faint glow from below, on their undersides and lower edges.
    vec3 up = vec3(0.0);
    for (int i = 0; i < 16; i++) {
      if (i >= uPartyCount) break;
      float d = length(vWorld.xz - uParty[i].xy), r = uParty[i].z;
      if (d > r) continue;
      float k = (0.35 + 0.65 * (1.0 - smoothstep(0.0, r * 0.5, d))) * (1.0 - smoothstep(r - uUplight.z, r, d)) * uParty[i].w;
      up = max(up, uPartyCol[i] * k);
    }
    float under = clamp(0.45 - N.y * 0.75, 0.0, 1.0);
    col += up * uUplight.x * (1.0 + uUplight.y * sin(uUplight.w)) * under;
  }
  // A legend's light in a few steps (Ed's round 14 playtest: a legend at its size read airbrushed, "smooth gradients, glossy
  // highlights", beside the pixel art round it): banded by brightness, its hue kept, so its shading is a short ramp of tones.
  if (uSteps > 0.5) { float l = max(1e-3, dot(col, vec3(0.3, 0.55, 0.15))), q = (floor(l * uSteps) + 0.6) / uSteps; col *= min(q / l, 3.0); }
  gl_FragColor = vec4(haze(min(vec3(1.0), col) * castK, vWorld), alpha);
}
void main() {
  vec2 rdx = dFdx(vUv), rdy = dFdy(vUv); // (taken here, in uniform flow: one screen pixel, one art pixel, along the sprite)
  uvDx = rdx; uvDy = rdy;
  shade();
  // Glowing white (a party animal evolving).
  if (vGlow > 0.0 && uSilhouette.a <= 0.0) gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(1.0), vGlow);
  // Tinted (enraged creatures, red): toward the tint by the pixel's own lightness, so its shading and shape still read.
  if (uTint.a > 0.0 && uSilhouette.a <= 0.0) { float l = dot(gl_FragColor.rgb, vec3(0.3, 0.55, 0.15)); gl_FragColor.rgb = mix(gl_FragColor.rgb, uTint.rgb * (0.55 + 1.1 * l), uTint.a); } // (a floor: red even in the dark, from the treetops)
  // A wild area's rising aggro (glow -1.05 to -1.45, render/aggro.ts; Ed, 2026-10-07): reddening by its own lightness, so its
  // shape still reads, and (on its body, not its legs' discs) a red outline pulsing faster as it nears the attack.
  if (vGlow < -1.02 && vGlow > -1.5 && gl_FragColor.a > 0.5) {
    float ag = clamp((-1.05 - vGlow) / 0.4, 0.0, 1.0), l = dot(gl_FragColor.rgb, vec3(0.3, 0.55, 0.15)), pulse = 0.85 + 0.15 * sin(uTime * (3.0 + 12.0 * ag));
    gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(1.0, 0.16, 0.12) * (0.45 + 1.2 * l), ag * 0.7);
    if (uRimOn > 0.5) { float e = min(min(rimAlpha(vUv + rdx), rimAlpha(vUv - rdx)), min(rimAlpha(vUv + rdy), rimAlpha(vUv - rdy))); if (e < 0.5) gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(1.0, 0.22, 0.15), min(1.0, ag * 1.5) * pulse); }
  }
  // A sleeping legend (glow -2 - moss): grown over, its colours gone toward moss and earth, so it
  // reads as a mound of the ground (no eyeshine: below -0.5).
  if (vGlow < -1.5) {
    // (its glow: -2 - (moss + 2 k), k its outline's steps off, render/legendOutline.ts: shown only while she's in its circle)
    float gv = -(vGlow + 2.0), gk = floor(gv * 0.5 + 0.0001), m = clamp(gv - 2.0 * gk, 0.0, 1.0), ring = 1.0 - gk / 16.0, l = dot(gl_FragColor.rgb, vec3(0.3, 0.55, 0.15));
    gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2, 0.26, 0.14) * (0.45 + 1.1 * l), m);
    // In its circle it must read (Ed's round 14 playtest: "Legends in the circle are not very distinct"): it never sinks into
    // the dark below a share of its own mossed look, and its outline glows in its sigil's neon, breathing slowly (only while she's
    // in its circle: ring, Ed 2026-10-07; outside it, a mossy boulder).
    if (uLegend.w > 0.0 && gl_FragColor.a > 0.5) {
      vec3 own = texture2D(uAlbedo, vUv).rgb, mossed = mix(own, vec3(0.2, 0.26, 0.14) * (0.45 + 1.1 * dot(own, vec3(0.3, 0.55, 0.15))), m);
      gl_FragColor.rgb = max(gl_FragColor.rgb, mossed * uLegendFloor);
      float e = min(min(rimAlpha(vUv + rdx), rimAlpha(vUv - rdx)), min(rimAlpha(vUv + rdy), rimAlpha(vUv - rdy)));
      float e2 = min(min(rimAlpha(vUv + rdx * 2.0), rimAlpha(vUv - rdx * 2.0)), min(rimAlpha(vUv + rdy * 2.0), rimAlpha(vUv - rdy * 2.0)));
      float top = min(rimAlpha(vUv + rdy * 3.0), rimAlpha(vUv - rdy * 3.0)) < 0.5 ? 1.0 : 0.0; // (near its edge, up or down: its foot is in the ground, so this is its back)
      float breath = 0.75 + 0.25 * sin(uTime * 1.4 + vWorld.x * 0.3);
      vec3 neon = min(vec3(1.0), uLegend.rgb * 1.3); // (bright enough for the bloom to take it: it glows)
      if (e < 0.5) gl_FragColor.rgb = mix(gl_FragColor.rgb, neon, uLegend.w * ring * breath); // its outline, a pixel
      else if (e2 < 0.5) gl_FragColor.rgb = mix(gl_FragColor.rgb, neon, uLegend.w * ring * 0.55 * breath); // and a softer one inside it
      else if (top > 0.5) gl_FragColor.rgb = mix(gl_FragColor.rgb, uLegend.rgb, uLegend.w * ring * 0.25 * breath); // its back catching the glow
    }
  }
  // A dark-coated legend awake (Ed, 2026-10-07: lifted only for those dark enough to vanish at night): never below a share of its own colour.
  if (uLegendAwake > 0.0 && vGlow > -1.5 && gl_FragColor.a > 0.5) gl_FragColor.rgb = max(gl_FragColor.rgb, texture2D(uAlbedo, vUv).rgb * uLegendAwake);
  // The moonlight rim (render/mood.ts; the art director's round 1: "characters must read against the
  // night"): a character's pixels whose neighbour on the side away from the moon is empty catch a light
  // edge in the night sky's colour, one art pixel wide, so the witch and the creatures stand out of the dark.
  if (uRimOn > 0.5 && uMoodRim.w > 0.0 && gl_FragColor.a > 0.5 && uSilhouette.a <= 0.0 && vGlow > -1.5) {
    vec2 s = -vec2(dot(uMoonDir, uRight), dot(uMoonDir, uUp));
    // Taken from the silhouette (its alpha), never the normals, so it shows in every style; on a
    // stylised sprite (art/stylise.js) the edge pixel is the style's own dark outline, so the rim
    // lights the pixel just inside it instead (the art director's round 2).
    vec2 dx = rdx * sign(s.x), dy = rdy * sign(s.y);
    float ox = rimAlpha(vUv + dx * (1.0 + uRimInset)), oy = rimAlpha(vUv + dy * (1.0 + uRimInset));
    float ix = uRimInset > 0.5 ? rimAlpha(vUv + dx) : 1.0, iy = uRimInset > 0.5 ? rimAlpha(vUv + dy) : 1.0;
    // Only where the sprite is thick (Ed's playtest, 2026-10-06: "Animal legs have outlines on them; they'd look better without"): a leg,
    // a foot, a tail tip, two pixels wide or less, is all edge, so lit it read as a glowing wireframe. The side rim needs the sprite
    // three pixels deep behind the edge; the lower rim needs that and a pixel solid either side (so a leg's foot stays dark too).
    bool thickX = rimAlpha(vUv - dx) > 0.5 && rimAlpha(vUv - dx * 2.0) > 0.5;
    bool thickY = rimAlpha(vUv - dy) > 0.5 && rimAlpha(vUv - dy * 2.0) > 0.5 && rimAlpha(vUv + rdx) > 0.5 && rimAlpha(vUv - rdx) > 0.5;
    if ((ox < 0.5 && ix > 0.5 && thickX) || (oy < 0.5 && iy > 0.5 && thickY)) gl_FragColor.rgb = min(vec3(1.0), gl_FragColor.rgb + uMoodRim.rgb * uMoodRim.w);
  }
  // Scenery past the budget's radius fades out smoothly (alpha), from the far edge inward.
  if (uIsScenery > 0.5) {
    float edge = vFlags.y > 0.5 ? canopyFade(vWorld) : sceneryFade(vWorld), k = edge * uAppear; // and a set just drawn fades in (a crown: out to the canopy's reach)
    if (uEdgeDither > 0.5) { if (bayer(gl_FragCoord.xy) >= edge) discard; k = uAppear; } // (the quality ladder's dithered edge: each art pixel there or not)
    if (k < 0.004) discard;
    gl_FragColor.a *= k;
  }
  gl_FragColor.a *= vCircle; // (the place she stands in kept clear)
  if (uSeeShowA > 0.5 && uFadePass > 0.5 && (uFadePass < 1.5 || uFadePass > 2.5)) gl_FragColor = vec4(vec3(gl_FragColor.a), 1.0); // (the circle hunt: its opacity, white solid)
}
`;

export interface SpriteInstance { x: number; y: number; z: number; frame: Frame; flip: boolean; top?: boolean; fresh?: boolean; /** A trunk cut from its crown this share of the frame's height from its top: its top fades out where crowns are hidden. */ cut?: number; /** Drawn this much bigger (1 if left out). */ scale?: number; /** Squashed or stretched: its width and height times these, about its feet, rounded to whole art pixels (an attack's feel: render/attackFeel.ts). */ sx?: number; sy?: number; /** How much it sways in the wind (0 still, 1 a crown): leafy things only. */ sway?: number; /** Glowing white, 0 to 1 (an evolving party animal); -1, a wild creature blinking (its eyeshine off); -0.5, switched off (its glowing pixels lit as paint: a soundsystem standing when the party's over); -2 - m, a sleeping legend gone m of the way to moss. */ glow?: number; /** Part of another sprite drawn over it (the treehouse's DJ table), not standing on the ground itself (the smoke's floating checks skip it). */ overlay?: boolean; /** A tree's own leaf-colour jitter seeds, -1 to 1 (hue, value), times the tuning's leafJitter in the shader; left out, none (Ed, 2026-10-16). */ jitter?: [number, number]; /** How far its foot reaches either side, in art pixels, over its frame's own (Frame.foot): a crown takes its trunk's, so the two stand on one height (a crown's own lowest row is its underside, not a foot; left out, a top half has none). */ foot?: number }

/** Where a floor draws: right after the ground (-1) and before anything standing (creatures 0, scenery 0.5, shadows 1), and
 *  writing no depth, so it can never hide an actor, a prop or a shadow on it or at its edge (Ed's playtest, 2026-10-06: "the sports
 *  field isn't sitting flat on the ground properly"; a pitch's decal is an upright sprite at its near edge, nearer the camera than
 *  anything on the pitch). */
export const FLOOR_ORDER = -0.5;

/** A floor's batch (a court, a pitch, the beach's and the party's decals): drawn as FLOOR_ORDER says, under everything. */
export function asFloor<B extends { meshes: THREE.Mesh[] }>(b: B): B {
  for (const m of b.meshes) { m.renderOrder = FLOOR_ORDER; (m.material as THREE.Material).depthWrite = false; }
  return b;
}

/** Every see-through pass's material (the circle hunt: the pause page's switch for its depth). */
export const FADE_MATERIALS: THREE.ShaderMaterial[] = [];
export const FADE_MESHES: THREE.Mesh[] = [];

export class SpriteBatch {
  readonly mesh: THREE.Mesh;
  /** Every mesh to add to the scene: the batch itself, plus its see-through pass (things in
   *  front of the witch, faded) or, for the witch, her silhouette where she's hidden. */
  readonly meshes: THREE.Mesh[];
  private geo: THREE.InstancedBufferGeometry;
  private pos: THREE.InstancedBufferAttribute;
  private size: THREE.InstancedBufferAttribute;
  private uvs: THREE.InstancedBufferAttribute;
  private flags: THREE.InstancedBufferAttribute;
  private glow: THREE.InstancedBufferAttribute;
  private jitter!: THREE.InstancedBufferAttribute;
  private capacity = 0;
  /** What changed this set, per attribute: pos, size, uvs, flags, glow (dirty.ts). */
  private dirty = [new Dirty(), new Dirty(), new Dirty(), new Dirty(), new Dirty(), new Dirty()];
  count = 0;

  /** metresPerPixel: world size of one art pixel. */
  constructor(public atlas: Atlas, readonly metresPerPixel: number, opts: { /** clears the stencil where it draws: nothing shows through it (the witch: render/leash.ts) */ unmark?: boolean; unlit?: boolean; onTop?: boolean; scenery?: boolean; fade?: boolean; flat?: boolean; /** Gameplay (creatures, soundsystems, markers...): never faded or cut away round the witch (Ed, v149). */ solid?: boolean; silhouette?: { colour: THREE.Vector3; opacity: number }; /** The witch: lit by the world's lights but not her own glow (witchLight.ts). */ witchLight?: { lightFloor: number; lightTint: number; lightRim: number }; /** Wild creatures: eyeshine, a light floor and a rim, so they can be found in the dark (Ed, v244). */ find?: boolean; /** Characters (the witch, creatures): the mood's moonlight rim. */ rim?: boolean; /** Each instance's y is a world height, not a height over the ground (her: ride.ts). */ absolute?: boolean; /** Tint the whole batch: a uniform of r, g, b (0-1) and how much (enraged creatures; shared, so a knob changes it live). */ tint?: { value: THREE.Vector4 }; /** A sleeping legend's batch: its sigil's neon and its rim's strength, and its light floor (Ed's round 14 playtest). */ legend?: THREE.Vector4; legendFloor?: number; /** a dark-coated legend awake: the share of its own colour it keeps at night (render/legendLight.ts) */ legendAwake?: number; /** A legend's batch: its light banded into this many steps of brightness (0 smooth). */ steps?: number; /** Its glowing pixels brighter by this, hue kept (shared, so a knob changes it live: the rune stones, render/view/home.ts). */ glowGain?: { value: number } } = {}) {
    const quad = new THREE.PlaneGeometry(1, 1);
    quad.translate(0, 0.5, 0); // stand on the base
    this.geo = new THREE.InstancedBufferGeometry();
    this.geo.index = quad.index;
    this.geo.setAttribute("position", quad.getAttribute("position"));
    this.geo.setAttribute("uv", quad.getAttribute("uv"));
    this.pos = this.size = this.uvs = this.flags = this.glow = undefined as never;
    this.grow(64);
    const uniforms = (extra: Record<string, THREE.IUniform>) => ({ ...LIGHT_UNIFORMS, ...SPRITE_UNIFORMS, ...HEIGHT_UNIFORMS, ...HIZ_UNIFORMS, uAlbedo: { value: atlas.albedo }, uNormal: { value: atlas.normal }, uUnlit: { value: opts.unlit ? 1 : 0 }, uIsScenery: { value: opts.scenery ? 1 : 0 }, uAppear: this.appearU, uFadePass: { value: 0 }, uHasFade: { value: opts.fade ? 1 : 0 }, uFlat: { value: opts.flat || opts.solid ? 1 : 0 }, uLies: { value: opts.flat ? 1 : 0 }, ...CAST_SHADOW_UNIFORMS, uSilhouette: { value: new THREE.Vector4(0, 0, 0, 0) }, uWitchLight: witchLightUniform(opts.witchLight), uFind: { value: opts.find ? 1 : 0 }, uRimOn: { value: opts.rim ? 1 : 0 }, uTint: opts.tint ?? { value: new THREE.Vector4(0, 0, 0, 0) }, uLegend: { value: opts.legend ?? new THREE.Vector4(0, 0, 0, 0) }, uSteps: { value: opts.steps ?? 0 }, uLegendFloor: { value: opts.legendFloor ?? 0 }, uLegendAwake: { value: opts.legendAwake ?? 0 }, uGlowGain: opts.glowGain ?? { value: 1 }, uAbsolute: { value: opts.absolute ? 1 : 0 }, uLean: this.leanU, ...extra });
    // Scenery blends where it fades out at the budget's edge. Custom blending, as three.js turns
    // normal blending off for opaque materials; it stays in the opaque pass, in its old order.
    const blend = opts.scenery ? { blending: THREE.CustomBlending, blendSrc: THREE.SrcAlphaFactor, blendDst: THREE.OneMinusSrcAlphaFactor } : {};
    // Scenery marks its pixels in the stencil (1), so the ley line can show through the trees and nothing else (leylines.ts).
    const mark = opts.scenery ? { stencilWrite: true, stencilRef: 1, stencilFunc: THREE.AlwaysStencilFunc, stencilZPass: THREE.ReplaceStencilOp }
      : opts.unmark ? { stencilWrite: true, stencilRef: 0, stencilFunc: THREE.AlwaysStencilFunc, stencilZPass: THREE.ReplaceStencilOp } : {}; // (she clears it: nothing shows through her)
    const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: uniforms({}), depthTest: !opts.onTop, depthWrite: !opts.onTop, ...blend, ...mark });
    this.mesh = new THREE.Mesh(this.geo, mat);
    this.mesh.frustumCulled = false;
    if (opts.onTop) this.mesh.renderOrder = 10;
    if (opts.scenery) this.mesh.renderOrder = 0.5; // after the ground it fades over, before the shadows and mist
    this.meshes = [this.mesh];
    if (opts.fade) {
      // Drawn after the witch (render order 10): the parts of tall things covering her, see-through.
      const fade = new THREE.Mesh(this.geo, new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: uniforms({ uFadePass: { value: 1 } }), transparent: true, depthWrite: false }));
      // Before it, what stands in front of her alone, writing its depth (uFadePass 3: see the fragment shader's \`mine\`).
      const front = new THREE.Mesh(this.geo, new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: uniforms({ uFadePass: { value: 3 } }), transparent: true, depthWrite: true }));
      front.frustumCulled = false; front.renderOrder = 10.9;
      fade.frustumCulled = false; fade.renderOrder = 11;
      if (opts.scenery) Object.assign(fade.material, mark, { stencilWrite: false }); // (its marks off as ever; the circle hunt's switch puts them on)
      FADE_MATERIALS.push(fade.material as THREE.ShaderMaterial); FADE_MESHES.push(fade);
      // Its depth, once every colour is down (Ed, 2026-10-13, "Clear example of the circle bug"): the see-through pass writes
      // none, so the smooth effects layer (mist, dapple: post.ts, laid by the scene's depth) lay over its pixels as if they weren't
      // there, and everything the fade so much as touched round her came out milkier than the same trees just beyond: a ring. The
      // same pixels' depth, written last (no colour), hides that layer behind them as behind anything solid.
      const depth = new THREE.Mesh(this.geo, new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: uniforms({ uFadePass: { value: 2 } }), transparent: true, colorWrite: false, depthWrite: true })); // (uFadePass 2: the see-through pass's pixels, its depth only)
      depth.frustumCulled = false; depth.renderOrder = 19.9;
      if (typeof location !== "undefined" && new URLSearchParams(location.search).get("seedepth") === "off") (depth.material as THREE.ShaderMaterial).depthWrite = false; // (?seedepth=off: as before, to compare) // (after the see-through pass and the effects over it; before the HUD's numbers)
      this.meshes.push(fade, depth, front);
    }
    if (opts.silhouette) {
      // Where she is hidden (behind something already drawn), a flat tint, so she's never lost.
      const c = opts.silhouette.colour, sil = new THREE.Mesh(this.geo, new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: uniforms({ uSilhouette: { value: new THREE.Vector4(c.x, c.y, c.z, opts.silhouette.opacity) } }), transparent: true, depthWrite: false, depthFunc: THREE.GreaterDepth }));
      sil.frustumCulled = false; sil.renderOrder = 12;
      this.meshes.push(sil); this.sil = sil;
    }
  }

  /** Named, for the probes' draw-call lists (tools/bench/gpu.cjs): its meshes carry the name, the see-through one marked. */
  name(n: string): this { this.meshes.forEach((m, i) => { m.name = i === 0 ? n : `${n} (${i === 1 && this.meshes.length > 1 && m !== this.sil ? "see-through" : "silhouette"})`; }); return this; }

  /** Its art swapped for another set's (the same frames: a stand-in replaced by the art workers' set when it arrives). */
  setAtlas(atlas: Atlas): void {
    this.atlas = atlas;
    for (const m of this.meshes) { const u = (m.material as THREE.ShaderMaterial).uniforms; u.uAlbedo.value = atlas.albedo; u.uNormal.value = atlas.normal; }
  }

  private sil: THREE.Mesh | null = null;
  /** Her silhouette through what hides her shown or not (off behind the DJ table, which hides her legs on purpose). */
  set silhouette(on: boolean) { if (this.sil) this.sil.visible = on; }
  /** Her silhouette's strength (0 to 1; tuning occlusion.silhouette), set every frame so the pause page's slider shows at once. */
  /** Her silhouette's colour (her glow's, LIGHT_UNIFORMS.uGlowRgb), set every frame too, so it follows the pause page's glow colour. */
  set silhouetteColour(c: THREE.Vector3) { const u = this.sil && ((this.sil.material as THREE.ShaderMaterial).uniforms.uSilhouette.value as THREE.Vector4); if (u) u.set(c.x, c.y, c.z, u.w); }
  set silhouetteOpacity(o: number) { const u = this.sil && ((this.sil.material as THREE.ShaderMaterial).uniforms.uSilhouette.value as THREE.Vector4); if (u) u.w = o; }

  private grow(n: number): void {
    const cap = Math.max(n, this.capacity * 2);
    // Three.js caps an instanced draw at the instance count it saw the first time the geometry
    // was drawn; disposing it (which also frees the old buffers) makes it count again, or every
    // instance past the old capacity is silently not drawn.
    this.geo.dispose();
    const make = (k: number, old?: THREE.InstancedBufferAttribute) => {
      const a = new THREE.InstancedBufferAttribute(new Float32Array(cap * k), k);
      a.setUsage(THREE.DynamicDrawUsage);
      if (old) (a.array as Float32Array).set(old.array as Float32Array);
      return a;
    };
    this.pos = make(3, this.pos); this.size = make(3, this.size); this.uvs = make(4, this.uvs); this.flags = make(4, this.flags); this.glow = make(1, this.glow); this.jitter = make(2, this.jitter);
    this.geo.setAttribute("iPos", this.pos); this.geo.setAttribute("iSize", this.size);
    this.geo.setAttribute("iUv", this.uvs); this.geo.setAttribute("iFlags", this.flags); this.geo.setAttribute("iGlow", this.glow); this.geo.setAttribute("iJitter", this.jitter);
    this.capacity = cap;
  }

  /** The witch under a load (render/load.ts): shear, tilt, bow; zero for everything else. */
  readonly leanU = { value: new THREE.Vector4() };

  /** Replace every instance. */
  /** Scenery batches: how far a set just drawn has faded in (0 to 1; the view eases it). */
  readonly appearU = { value: 1 };
  /** What was last set (for checks: the smoke test's floating-sprite check reads it). */
  items: SpriteInstance[] = [];

  set(items: SpriteInstance[]): void {
    this.items = items;
    if (items.length > this.capacity) this.grow(items.length);
    const P = this.pos.array as Float32Array, S = this.size.array as Float32Array, U = this.uvs.array as Float32Array, F = this.flags.array as Float32Array, G = this.glow.array as Float32Array, J = this.jitter.array as Float32Array;
    const dP = this.dirty[0], dS = this.dirty[1], dU = this.dirty[2], dF = this.dirty[3], dG = this.dirty[4], dJ = this.dirty[5];
    // (a plain loop, the numbers written straight in: thousands of instances a frame, every batch, every frame; each
    // attribute written, and sent, only where it changed: dirty.ts)
    const mpp = this.metresPerPixel;
    for (let i = 0, n = items.length; i < n; i++) {
      const it = items[i], fr = it.frame, uv = fr.uv, k = it.scale ?? 1;
      let j = i * 3;
      if (P[j] !== it.x || P[j + 1] !== it.y || P[j + 2] !== it.z) { P[j] = it.x; P[j + 1] = it.y; P[j + 2] = it.z; dP.touch(i); }
      const w = (it.sx === undefined ? fr.w : Math.max(1, Math.round(fr.w * it.sx))) * mpp * k, h = (it.sy === undefined ? fr.h : Math.max(1, Math.round(fr.h * it.sy))) * mpp * k; // (a squash in whole art pixels: one pixel scale on screen)
      const ft = (it.foot ?? (it.top ? 0 : fr.foot ?? 0)) * mpp * k * (it.sx ?? 1);
      j = i * 3;
      if (S[j] !== w || S[j + 1] !== h || S[j + 2] !== ft) { S[j] = w; S[j + 1] = h; S[j + 2] = ft; dS.touch(i); }
      j = i * 4;
      if (U[j] !== uv[0] || U[j + 1] !== uv[1] || U[j + 2] !== uv[2] || U[j + 3] !== uv[3]) { U[j] = uv[0]; U[j + 1] = uv[1]; U[j + 2] = uv[2]; U[j + 3] = uv[3]; dU.touch(i); }
      const f0 = it.flip ? 1 : 0, f1 = it.top ? 1 : it.cut ? -it.cut : 0, f2 = it.fresh ? 1 : 0, f3 = (fr.masked ? -1 : 1) * (it.sway ?? 0);
      if (F[j] !== f0 || F[j + 1] !== f1 || F[j + 2] !== f2 || F[j + 3] !== f3) { F[j] = f0; F[j + 1] = f1; F[j + 2] = f2; F[j + 3] = f3; dF.touch(i); }
      const gl = it.glow ?? 0;
      if (G[i] !== gl) { G[i] = gl; dG.touch(i); }
      const jt = it.jitter, jx = jt ? jt[0] : 0, jy = jt ? jt[1] : 0;
      j = i * 2;
      if (J[j] !== jx || J[j + 1] !== jy) { J[j] = jx; J[j + 1] = jy; dJ.touch(i); }
    }
    // Only the instances in use that changed go to the GPU (the buffers keep their largest size, often twice what's
    // drawn, and most instances are as they were last frame). Nothing changed, nothing sent.
    dP.flush(this.pos); dS.flush(this.size); dU.flush(this.uvs); dF.flush(this.flags); dG.flush(this.glow); dJ.flush(this.jitter);
    this.count = items.length;
    this.geo.instanceCount = items.length;
    const ms = this.meshes, on = items.length > 0;
    for (let i = 0; i < ms.length; i++) ms[i].visible = on; // (by index: an iterator a batch a frame otherwise, this function being too big to optimise)
  }

  /** Instances set but not drawn: three.js draws at most the count it last saw the buffers hold.
   *  Always 0 unless something is wrong; the view logs and counts it (stats.dropped). */
  get dropped(): number {
    const max = (this.geo as unknown as { _maxInstanceCount?: number })._maxInstanceCount;
    return max === undefined || !this.mesh.visible ? 0 : Math.max(0, this.count - max);
  }

  /** Let go of its own buffers and materials (the see-through pass's off the frame's list too), leaving its atlas (shared) alone. */
  release(): void {
    this.geo.dispose();
    for (const m of this.meshes) {
      (m.material as THREE.Material).dispose();
      const i = FADE_MESHES.indexOf(m);
      if (i >= 0) { FADE_MESHES.splice(i, 1); FADE_MATERIALS.splice(FADE_MATERIALS.indexOf(m.material as THREE.ShaderMaterial), 1); }
    }
  }

  /** Let go of it all, its atlas too. */
  dispose(): void {
    this.release();
    this.atlas.albedo.dispose();
    this.atlas.normal.dispose();
  }
}
