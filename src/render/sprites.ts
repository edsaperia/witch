// A batch of camera-facing sprites sharing one atlas, drawn as one instanced draw call.
// Each sprite stands on the ground at its base, faces the camera (tilted back toward it by
// spriteTilt), and is lit per pixel from its normal map. Tree tops carry a flag so the canopy
// can dither in and out as the witch rises and descends.
import * as THREE from "three";
import { PIXEL_SNAP_GLSL, WIND_GUST_GLSL } from "./shaders";
import type { Atlas, Frame } from "./atlas";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";
import { WITCH_LIGHT_GLSL, witchLightUniform } from "./witchLight";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";

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
  // The party's canopy uplight: the nearest partified areas (centre x, z, reach, fade-in) and their
  // colours; uUplight: strength, pulse, edge (m), the beat's phase (radians).
  uParty: { value: Array.from({ length: 16 }, () => new THREE.Vector4()) },
  uPartyCol: { value: Array.from({ length: 16 }, () => new THREE.Vector3()) },
  uPartyCount: { value: 0 },
  uUplight: { value: new THREE.Vector4() },
  /** The trunk fade: metres covered (0 off), metres per art pixel. */
  uTrunkFade: { value: new THREE.Vector3(0, 0.125, 0.3) },
  /** Finding wild creatures in the dark (Ed, v244; tuning find, off with ?find=0), for wild
   *  creatures' batches only: their light floor (a share of their unlit look), a rim from her
   *  glow, their eyeshine's strength (0 off) and the share of the time they blink; uEyeRgb its colour, uEyeRange its reach (m). */
  uFindLook: { value: new THREE.Vector4() },
  uEyeRgb: { value: new THREE.Vector3(1, 0.8, 0.35) },
  uEyeRange: { value: 40 },
  /** Trees' trunks: their light floor (a share of their unlit look) and the rim from her glow (Ed, v271). */
  uTrunkLook: { value: new THREE.Vector2(0.8, 0.5) },
  /** The smoke test: trunks drawn flat magenta, to count where they are on screen. */
  uDebugTrunks: { value: 0 },
  /** The wind (Ed, v171): sway at the top of a crown (metres), the gusts' speed (m/s) and size (m), and the time. */
  uWind: { value: new THREE.Vector4(0, 0, 1, 0) },
  /** Pixel wind (stage 8 of #79): 1, a masked sprite's regions (a crown's blobs) each move whole, a whole art pixel at a time, with
   *  their own phase and stiffness; 0 (?wind=smooth), every pixel slides by its own sway, as before. */
  uPixelWind: { value: typeof location !== "undefined" && new URLSearchParams(location.search).get("wind") === "smooth" ? 0 : 1 },
};

const VERT = /* glsl */ `
uniform vec3 uRight, uUp;
uniform vec2 uRes;
uniform float uWitchDepth;
uniform vec4 uOcc;
uniform float uAbsolute; // its y is a world height, not a height over the ground
uniform vec4 uLean; // the witch under a load (render/load.ts): sheared forward (m per m up), tilted nose-up (m per m across), her broom bowed (art pixels)
uniform vec4 uCutout, uWitch;
varying float vHole;   // crowns and cut trunks: the radius of the hole round her (pixels) for this tree
varying float vCrownD; // and how far the nearest of its crown is from the hole's middle on screen (pixels)
uniform vec4 uCutShape;
varying float vOverHer; // over her on screen and nearer the camera: it could hide her
attribute vec3 iPos;
attribute vec2 iSize;
attribute vec4 iUv;
attribute vec4 iFlags; // flip, top (or a trunk's cut, negative), fresh, sway
attribute float iGlow; // glowing white, 0 to 1 (a party animal evolving); -1: a wild creature blinking (no eyeshine)
varying float vGlow;
varying float vSwayM; // metres its leafiest pixels move this frame (masked sprites)
varying vec4 vFrame;  // its frame in the atlas (u0, v0, u1, v1), to keep the sway inside it
uniform vec4 uWind;
varying vec2 vUv;
varying vec3 vWorld;
varying vec3 vFlags;
varying float vFront;
varying vec2 vLocal;
varying float vSizeY;
${HEIGHT_VERT_GLSL}
${WIND_GUST_GLSL}${PIXEL_SNAP_GLSL}
void main() {
  // Every sprite stands upright on the rolling ground (height.ts), at the lowest ground under its
  // foot (most of its width, up to 5 m either side of its base, at five points): on a slope its uphill side is planted in the
  // hillside and nothing floats (Ed, v276: 50 m hills, too steep to skew sprites to).
  // (Or, for her, at the height given: she rides a smoothed height over the hills, ride.ts.)
  float fw = min(iSize.x * 0.45, 5.0);
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
  vFrame = vec4(min(iUv.x, iUv.z), min(iUv.y, iUv.w), max(iUv.x, iUv.z), max(iUv.y, iUv.w));
  float u = iFlags.x > 0.5 ? 1.0 - uv.x : uv.x;
  vUv = vec2(mix(iUv.x, iUv.z, u), mix(iUv.w, iUv.y, uv.y));
  vFlags = iFlags.xyz;
  vGlow = iGlow;
  vLocal = uv;
  vSizeY = iSize.y;
  vWorld = w;
  gl_Position = clipOf(w);
  // Snap the whole sprite by its base to the pixel grid, so it moves a whole pixel at a time and
  // its small bright details (flowers, eyes) don't shimmer in and out as the camera glides.
  gl_Position.xy += pixelSnap(clipOf(base)) * gl_Position.w;
  // The hole cut in the canopy round her (Ed, round 7: "the crown-hiding circle still has a very
  // sharp edge"): each tree's crown (and its cut trunk with it) has its own radius for it, a little
  // nearer or further than the next, so no line runs across the canopy, and fades over a wide band.
  vHole = 1.0; vOverHer = 0.0; vCrownD = 0.0;
  if (abs(iFlags.y) > 0.001) {
    vec4 c0 = clipOf(base), c1 = clipOf(base + uUp * iSize.y);
    vec2 s0 = (c0.xy / c0.w * 0.5 + 0.5) * uRes, s1 = (c1.xy / c1.w * 0.5 + 0.5) * uRes;
    // Its own radius for the hole (vHole here: in pixels): each tree's own, spread round the hole's (uCutShape.w), and the
    // outline ragged round her, its bays and points drifting slowly round (uCutShape.z: Ed, 2026-10-06, "circle": no round line).
    float hh = abs(s1.y - s0.y) * 0.5 + 1.0, hw = hh * iSize.x / max(iSize.y, 0.01);
    vec2 cc = (s0 + s1) * 0.5, off = cc - uCutout.xy;
    float j = fract(sin(dot(floor(iPos.xz * 2.0), vec2(12.9898, 78.233))) * 43758.5453), ang = atan(off.y, off.x), tw = uWind.w;
    float rag = 0.5 * sin(ang * 3.0 + tw * 0.07 + 1.3) + 0.3 * sin(ang * 5.0 - tw * 0.05 + 4.1) + 0.2 * sin(ang * 7.0 + tw * 0.11 + 2.2);
    vHole = uCutout.z * (1.0 + uCutShape.w * (j - 0.5) * 2.0) * (1.0 + uCutShape.z * rag);
    // How far it is: from its middle less half its half-size (its rectangle on screen shrunk by half), so a big crown over her
    // goes as a whole, not stood whole by its far middle, while the canopy's big crowns at the screen's edges stay its roof.
    vCrownD = length(max(abs(off) - vec2(hw, hh) * 0.5, 0.0));
    // Whether it could hide her: over her sprite on screen and nearer the camera than her.
    vOverHer = abs(cc.x - uWitch.x) < hw + uWitch.z && abs(cc.y - uWitch.y) < hh + uWitch.w && uWitchDepth + (viewMatrix * vec4(base, 1.0)).z > 0.0 ? 1.0 : 0.0;
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
uniform float uFadePass;
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
varying float vHole, vOverHer, vCrownD;
uniform float uCutWhole;
uniform vec4 uCutShape;
varying vec2 vLocal;
varying float vSizeY;
uniform float uFind; // this batch: 1 for wild creatures (eyeshine, light floor, rim)
uniform float uRimOn; // this batch: 1 for characters (the witch, creatures): the mood's moonlight rim
uniform vec4 uMoodRim; // the rim's colour and strength (0: none; render/mood.ts)
uniform float uRimInset; // 1: stylised sprites, the rim one pixel in from the edge (inside the style's outline)
float rimAlpha(vec2 q) { return q.x < vFrame.x || q.x > vFrame.z || q.y < vFrame.y || q.y > vFrame.w ? 0.0 : texture2D(uAlbedo, q).a; }
uniform vec4 uTint; // this batch's tint: colour and how much (enraged creatures' red, Ed 2026-10-05)
uniform vec4 uLegend; // a sleeping legend's batch: its sigil's neon and the rim's strength (0: none; Ed's round 14 playtest)
uniform float uLegendFloor; // and the share of its own (mossed) look it never drops below
uniform vec4 uFindLook;
uniform vec2 uTrunkLook;   // trunks: light floor, rim
uniform float uDebugTrunks; // smoke: trunks drawn flat magenta
uniform vec3 uEyeRgb;
uniform float uEyeRange;
uniform vec3 uTrunkFade; // metres of trunk the fade covers at most, metres per art pixel, its most share of the visible trunk
uniform vec4 uWind;      // the wind: its time (w) sets the regions' flutter
uniform float uPixelWind; // 1: pixel wind (regions move whole, by whole pixels); 0: the smooth sway
${LIGHT_GLSL}
${WITCH_LIGHT_GLSL}
// 4x4 ordered dither, for fading the canopy in pixel-art style.
float bayer(vec2 p) {
  int x = int(mod(p.x, 4.0)), y = int(mod(p.y, 4.0));
  int i = x + y * 4;
  int m[16] = int[16](0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5);
  return (float(m[i]) + 0.5) / 16.0;
}
// 4x4 clustered-dot ordered dither: as it fills, its pixels gather into dots round each cell's middle instead of
// spreading out, so a half-faded trunk reads as clusters, not a one-pixel checker (the art director's round 3:
// "a screen door at 1280x720").
float cluster4(vec2 p) {
  int x = int(mod(p.x, 4.0)), y = int(mod(p.y, 4.0));
  int m[16] = int[16](12, 5, 6, 13, 4, 0, 1, 7, 11, 3, 2, 8, 15, 10, 9, 14);
  return (float(m[x + y * 4]) + 0.5) / 16.0;
}
// A slow value noise (0-1) for the hole's wobbly edge.
float cutHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float cutNoise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(cutHash(i), cutHash(i + vec2(1.0, 0.0)), f.x), mix(cutHash(i + vec2(0.0, 1.0)), cutHash(i + 1.0), f.x), f.y); }
void shade() {
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
    if (uPixelWind > 0.5) {
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
    } else {
      float k = px / tw * dir, m0 = mod(floor(texture2D(uNormal, vUv).a * 255.0 + 0.5), 32.0) / 31.0;
      float m1 = mod(floor(texture2D(uNormal, clamp(vUv - vec2(k * max(m0, 0.5), 0.0), vFrame.xy, vFrame.zw)).a * 255.0 + 0.5), 32.0) / 31.0;
      uvS = clamp(vUv - vec2(k * max(m0, m1), 0.0), vFrame.xy, vFrame.zw);
    }
  }
  vec4 a = texture2D(uAlbedo, uvS);
  if (a.a < 0.5) discard;
  // The witch's see-through silhouette: where she is hidden, a flat tint in her glow colour.
  if (uSilhouette.a > 0.0) { gl_FragColor = vec4(uSilhouette.rgb, uSilhouette.a); return; }
  // Things standing in front of the witch fade (smoothly) where they cover her: left out of the
  // opaque pass there and drawn in a second, see-through pass after her.
  // A soft circle round her body, a little bigger than her sprite: fully see-through at the
  // centre, easing smoothly to opaque at the edge (uOcc.y: how far the edge reaches, a share of it).
  float e = length(gl_FragCoord.xy - uWitch.xy) / max(max(uWitch.z, uWitch.w) * 1.2, 1.0);
  float occl = uFlat > 0.5 ? 0.0 : uOcc.w * vFront * (1.0 - smoothstep(0.3, 1.0 + uOcc.y, e));
  // Crowns: hidden in a hole round the witch, which closes as she rises; its edge a smooth fade
  // (Ed: no dithering), or dithered steps with ?fx=pixel. Smooth, a crown partly shown in the hole
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
  float hole = smoothstep(vHole - uCutout.w, vHole + uCutout.w * uCutShape.y, mix(length(gl_FragCoord.xy - uCutout.xy) + wob, vCrownD, uCutWhole));
  float shown = 1.0;
  if (vFlags.y > 0.5) {
    shown = max(hole, uTopFade);
    if (uSmooth < 0.5) { if (bayer(gl_FragCoord.xy) >= shown) discard; shown = 1.0; }
    else if (shown < 0.004) discard;
  }
  bool see = occl > 0.001 || (shown < 0.996 && vOverHer > 0.5); // (only crowns that could hide her: the rest keep their depth)
  if (uFadePass > 0.5 ? !see : see) discard;
  float alpha = (uFadePass > 0.5 ? mix(1.0, uOcc.x, occl) : 1.0) * shown;
  if (vFlags.y < -0.001 && uTrunkFade.x > 0.0) {
    // A trunk cut from its crown (Ed, v149: "fade out instead of just stop"): where the crowns are
    // hidden, its top fades out over uTrunkFade.x metres in a clustered ordered dither on the art's own
    // pixel grid; where the crowns show, it stays whole under them. The fade covers at most
    // uTrunkFade.z of the trunk's visible height (Ed, v233: short tangly trees kept no trunk at
    // all), so every trunk keeps a solid base.
    float crown = max(hole, uTopFade);
    float topY = 1.0 + vFlags.y, band = min(uTrunkFade.x / max(vSizeY, 0.01), topY * uTrunkFade.z);
    float t = clamp((topY - vLocal.y) / band, 0.0, 1.0);
    vec2 artPx = vec2(floor(vUv.x * float(textureSize(uAlbedo, 0).x)), floor(vLocal.y * vSizeY / uTrunkFade.y));
    // Smooth (Ed: no dithering), its top fades out in alpha; ?fx=pixel, in the clustered dither as before.
    float keep = max(t, crown);
    if (uSmooth > 0.5) { if (keep < 0.004) discard; alpha *= keep * keep * (3.0 - 2.0 * keep); }
    else if (cluster4(artPx) >= keep) discard;
  }
  // Eye glints, flowers and magic glow: the generator marks them with alpha 254.
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
  if (a.a < 0.999 && !eyePx) { gl_FragColor = vec4(haze(a.rgb, vWorld), alpha); return; }
  vec4 n = texture2D(uNormal, uvS);
  float nx = (n.r * 255.0 - 128.0) / 127.0, ny = (n.g * 255.0 - 128.0) / 127.0, nz = n.b;
  if (vFlags.x > 0.5) nx = -nx;
  vec3 N = normalize(uRight * nx - uUp * ny + uFacing * nz);
  if (uWitchLight.x > 0.5) { gl_FragColor = vec4(witchShade(a.rgb, N, uFacing, vWorld), alpha); return; }
  vec3 col = min(vec3(1.0), a.rgb * nightLight(N, vWorld) * 1.25);
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
  gl_FragColor = vec4(haze(min(vec3(1.0), col), vWorld), alpha);
}
void main() {
  vec2 rdx = dFdx(vUv), rdy = dFdy(vUv); // (taken here, in uniform flow: one screen pixel, one art pixel, along the sprite)
  shade();
  // Glowing white (a party animal evolving).
  if (vGlow > 0.0 && uSilhouette.a <= 0.0) gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(1.0), vGlow);
  // Tinted (enraged creatures, red): toward the tint by the pixel's own lightness, so its shading and shape still read.
  if (uTint.a > 0.0 && uSilhouette.a <= 0.0) { float l = dot(gl_FragColor.rgb, vec3(0.3, 0.55, 0.15)); gl_FragColor.rgb = mix(gl_FragColor.rgb, uTint.rgb * (0.55 + 1.1 * l), uTint.a); } // (a floor: red even in the dark, from the treetops)
  // A sleeping legend (glow -2 - moss): grown over, its colours gone toward moss and earth, so it
  // reads as a mound of the ground (no eyeshine: below -0.5).
  if (vGlow < -1.5) {
    float m = clamp(-(vGlow + 2.0), 0.0, 1.0), l = dot(gl_FragColor.rgb, vec3(0.3, 0.55, 0.15));
    gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2, 0.26, 0.14) * (0.45 + 1.1 * l), m);
    // In its circle it must read (Ed's round 14 playtest: "Legends in the circle are not very distinct"): it never sinks into
    // the dark below a share of its own mossed look, and its outline glows in its sigil's neon, breathing slowly.
    if (uLegend.w > 0.0 && gl_FragColor.a > 0.5) {
      vec3 own = texture2D(uAlbedo, vUv).rgb, mossed = mix(own, vec3(0.2, 0.26, 0.14) * (0.45 + 1.1 * dot(own, vec3(0.3, 0.55, 0.15))), m);
      gl_FragColor.rgb = max(gl_FragColor.rgb, mossed * uLegendFloor);
      float e = min(min(rimAlpha(vUv + rdx), rimAlpha(vUv - rdx)), min(rimAlpha(vUv + rdy), rimAlpha(vUv - rdy)));
      float e2 = min(min(rimAlpha(vUv + rdx * 2.0), rimAlpha(vUv - rdx * 2.0)), min(rimAlpha(vUv + rdy * 2.0), rimAlpha(vUv - rdy * 2.0)));
      float top = min(rimAlpha(vUv + rdy * 3.0), rimAlpha(vUv - rdy * 3.0)) < 0.5 ? 1.0 : 0.0; // (near its edge, up or down: its foot is in the ground, so this is its back)
      float breath = 0.75 + 0.25 * sin(uTime * 1.4 + vWorld.x * 0.3);
      vec3 neon = min(vec3(1.0), uLegend.rgb * 1.3); // (bright enough for the bloom to take it: it glows)
      if (e < 0.5) gl_FragColor.rgb = mix(gl_FragColor.rgb, neon, uLegend.w * breath); // its outline, a pixel
      else if (e2 < 0.5) gl_FragColor.rgb = mix(gl_FragColor.rgb, neon, uLegend.w * 0.55 * breath); // and a softer one inside it
      else if (top > 0.5) gl_FragColor.rgb = mix(gl_FragColor.rgb, uLegend.rgb, uLegend.w * 0.25 * breath); // its back catching the glow
    }
  }
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
    float k = sceneryFade(vWorld) * uAppear; // and a set just drawn fades in
    if (k < 0.004) discard;
    gl_FragColor.a *= k;
  }
}
`;

export interface SpriteInstance { x: number; y: number; z: number; frame: Frame; flip: boolean; top?: boolean; fresh?: boolean; /** A trunk cut from its crown this share of the frame's height from its top: its top fades out where crowns are hidden. */ cut?: number; /** Drawn this much bigger (1 if left out). */ scale?: number; /** Squashed or stretched: its width and height times these, about its feet, rounded to whole art pixels (an attack's feel: render/attackFeel.ts). */ sx?: number; sy?: number; /** How much it sways in the wind (0 still, 1 a crown): leafy things only. */ sway?: number; /** Glowing white, 0 to 1 (an evolving party animal); -1, a wild creature blinking (its eyeshine off); -2 - m, a sleeping legend gone m of the way to moss. */ glow?: number; /** Part of another sprite drawn over it (the treehouse's DJ table), not standing on the ground itself (the smoke's floating checks skip it). */ overlay?: boolean }

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
  private capacity = 0;
  count = 0;

  /** metresPerPixel: world size of one art pixel. */
  constructor(readonly atlas: Atlas, readonly metresPerPixel: number, opts: { unlit?: boolean; onTop?: boolean; scenery?: boolean; fade?: boolean; flat?: boolean; /** Gameplay (creatures, soundsystems, markers...): never faded or cut away round the witch (Ed, v149). */ solid?: boolean; silhouette?: { colour: THREE.Vector3; opacity: number }; /** The witch: lit by the world's lights but not her own glow (witchLight.ts). */ witchLight?: { lightFloor: number; lightTint: number; lightRim: number }; /** Wild creatures: eyeshine, a light floor and a rim, so they can be found in the dark (Ed, v244). */ find?: boolean; /** Characters (the witch, creatures): the mood's moonlight rim. */ rim?: boolean; /** Each instance's y is a world height, not a height over the ground (her: ride.ts). */ absolute?: boolean; /** Tint the whole batch: a uniform of r, g, b (0-1) and how much (enraged creatures; shared, so a knob changes it live). */ tint?: { value: THREE.Vector4 }; /** A sleeping legend's batch: its sigil's neon and its rim's strength, and its light floor (Ed's round 14 playtest). */ legend?: THREE.Vector4; legendFloor?: number } = {}) {
    const quad = new THREE.PlaneGeometry(1, 1);
    quad.translate(0, 0.5, 0); // stand on the base
    this.geo = new THREE.InstancedBufferGeometry();
    this.geo.index = quad.index;
    this.geo.setAttribute("position", quad.getAttribute("position"));
    this.geo.setAttribute("uv", quad.getAttribute("uv"));
    this.pos = this.size = this.uvs = this.flags = this.glow = undefined as never;
    this.grow(64);
    const uniforms = (extra: Record<string, THREE.IUniform>) => ({ ...LIGHT_UNIFORMS, ...SPRITE_UNIFORMS, ...HEIGHT_UNIFORMS, uAlbedo: { value: atlas.albedo }, uNormal: { value: atlas.normal }, uUnlit: { value: opts.unlit ? 1 : 0 }, uIsScenery: { value: opts.scenery ? 1 : 0 }, uAppear: this.appearU, uFadePass: { value: 0 }, uFlat: { value: opts.flat || opts.solid ? 1 : 0 }, uSilhouette: { value: new THREE.Vector4(0, 0, 0, 0) }, uWitchLight: witchLightUniform(opts.witchLight), uFind: { value: opts.find ? 1 : 0 }, uRimOn: { value: opts.rim ? 1 : 0 }, uTint: opts.tint ?? { value: new THREE.Vector4(0, 0, 0, 0) }, uLegend: { value: opts.legend ?? new THREE.Vector4(0, 0, 0, 0) }, uLegendFloor: { value: opts.legendFloor ?? 0 }, uAbsolute: { value: opts.absolute ? 1 : 0 }, uLean: this.leanU, ...extra });
    // Scenery blends where it fades out at the budget's edge. Custom blending, as three.js turns
    // normal blending off for opaque materials; it stays in the opaque pass, in its old order.
    const blend = opts.scenery ? { blending: THREE.CustomBlending, blendSrc: THREE.SrcAlphaFactor, blendDst: THREE.OneMinusSrcAlphaFactor } : {};
    // Scenery marks its pixels in the stencil (1), so the ley line can show through the trees and nothing else (leylines.ts).
    const mark = opts.scenery ? { stencilWrite: true, stencilRef: 1, stencilFunc: THREE.AlwaysStencilFunc, stencilZPass: THREE.ReplaceStencilOp } : {};
    const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: uniforms({}), depthTest: !opts.onTop, depthWrite: !opts.onTop, ...blend, ...mark });
    this.mesh = new THREE.Mesh(this.geo, mat);
    this.mesh.frustumCulled = false;
    if (opts.onTop) this.mesh.renderOrder = 10;
    if (opts.scenery) this.mesh.renderOrder = 0.5; // after the ground it fades over, before the shadows and mist
    this.meshes = [this.mesh];
    if (opts.fade) {
      // Drawn after the witch (render order 10): the parts of tall things covering her, see-through.
      const fade = new THREE.Mesh(this.geo, new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: uniforms({ uFadePass: { value: 1 } }), transparent: true, depthWrite: false }));
      fade.frustumCulled = false; fade.renderOrder = 11;
      this.meshes.push(fade);
    }
    if (opts.silhouette) {
      // Where she is hidden (behind something already drawn), a flat tint, so she's never lost.
      const c = opts.silhouette.colour, sil = new THREE.Mesh(this.geo, new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: uniforms({ uSilhouette: { value: new THREE.Vector4(c.x, c.y, c.z, opts.silhouette.opacity) } }), transparent: true, depthWrite: false, depthFunc: THREE.GreaterDepth }));
      sil.frustumCulled = false; sil.renderOrder = 12;
      this.meshes.push(sil);
    }
  }

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
    this.pos = make(3, this.pos); this.size = make(2, this.size); this.uvs = make(4, this.uvs); this.flags = make(4, this.flags); this.glow = make(1, this.glow);
    this.geo.setAttribute("iPos", this.pos); this.geo.setAttribute("iSize", this.size);
    this.geo.setAttribute("iUv", this.uvs); this.geo.setAttribute("iFlags", this.flags); this.geo.setAttribute("iGlow", this.glow);
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
    const P = this.pos.array as Float32Array, S = this.size.array as Float32Array, U = this.uvs.array as Float32Array, F = this.flags.array as Float32Array, G = this.glow.array as Float32Array;
    items.forEach((it, i) => {
      P[i * 3] = it.x; P[i * 3 + 1] = it.y; P[i * 3 + 2] = it.z;
      const k = it.scale ?? 1;
      S[i * 2] = (it.sx === undefined ? it.frame.w : Math.max(1, Math.round(it.frame.w * it.sx))) * this.metresPerPixel * k; S[i * 2 + 1] = (it.sy === undefined ? it.frame.h : Math.max(1, Math.round(it.frame.h * it.sy))) * this.metresPerPixel * k; // (a squash in whole art pixels: one pixel scale on screen)
      U.set(it.frame.uv, i * 4);
      F[i * 4] = it.flip ? 1 : 0; F[i * 4 + 1] = it.top ? 1 : it.cut ? -it.cut : 0; F[i * 4 + 2] = it.fresh ? 1 : 0; F[i * 4 + 3] = (it.frame.masked ? -1 : 1) * (it.sway ?? 0);
      G[i] = it.glow ?? 0;
    });
    // Only the instances in use go to the GPU (the buffers keep their largest size, often twice
    // what's drawn: a whole one every frame was much of the frame's uploading). Nothing set, nothing sent.
    if (items.length) for (const a of [this.pos, this.size, this.uvs, this.flags, this.glow]) { a.clearUpdateRanges(); a.addUpdateRange(0, items.length * a.itemSize); a.needsUpdate = true; }
    this.count = items.length;
    this.geo.instanceCount = items.length;
    for (const m of this.meshes) m.visible = items.length > 0;
  }

  /** Instances set but not drawn: three.js draws at most the count it last saw the buffers hold.
   *  Always 0 unless something is wrong; the view logs and counts it (stats.dropped). */
  get dropped(): number {
    const max = (this.geo as unknown as { _maxInstanceCount?: number })._maxInstanceCount;
    return max === undefined || !this.mesh.visible ? 0 : Math.max(0, this.count - max);
  }

  /** Let go of its own buffers and material, leaving its atlas (shared) alone. */
  release(): void {
    this.geo.dispose();
    for (const m of this.meshes) (m.material as THREE.Material).dispose();
  }

  dispose(): void {
    this.geo.dispose();
    (this.mesh.material as THREE.Material).dispose();
    this.atlas.albedo.dispose();
    this.atlas.normal.dispose();
  }
}
