// Light rings in the canopy (Ed, 2026-10-07, making the wild forest eerier: "a halo / circle optical illusion: faint
// concentric rings of moonlight in the canopy, visible from treetop view"). One pass over the screen in the half-size
// effects layer (post.ts), no geometry: each pixel's world point is rebuilt from the scene's depth, and only what stands
// at crown height (`above` metres or more over the rolling ground) catches the light, the rings laid on a level sheet
// `plane` metres up where the line of sight crosses it, so the rings lie on the leaves and
// never on the floor, the paths or a clearing. Their centres are seeded on a grid over the map (a `share` of its
// `spacing`-metre cells has one, jittered), each `count` faint bands of moonlight out to `radius` metres, slowly
// breathing outward, fading out with distance from her; and a glory round her own shadow on the leaves (the halo you see
// round your shadow on dewy foliage) that goes with her; added as light (alpha 0), so they brighten the crowns without hiding them. Treetops only: they fade
// in as she rises.
import * as THREE from "three";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";
import { HEIGHT_GLSL, HEIGHT_UNIFORMS, groundHeight } from "./height";

export interface LightRingsTuning {
  on: boolean;
  /** How bright a band at its brightest (0 to 1, in the moon's hue, paled). */
  strength: number;
  /** How far out a set of rings reaches (m), and how many bands it has. */
  radius: number;
  count: number;
  /** The grid the centres are seeded on (m), and the share of its cells with one. */
  spacing: number;
  share: number;
  /** How many metres over the ground a surface has to stand to catch them (crowns, not the floor). */
  above: number;
  /** How fast the bands breathe outward (bands a second). */
  speed: number;
  /** The level sheet they're laid on (m above the ground: about the crowns' tops). */
  plane: number;
  /** The glory round her shadow on the leaves: its radius (m) and strength. */
  glory: number;
  gloryStrength: number;
  /** The scattered rings fade out between these distances from her (m). */
  fadeNear: number;
  fadeFar: number;
}

const VERT = /* glsl */ `
varying vec2 vUv;
void main() { vUv = position.xy * 0.5 + 0.5; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

const FRAG = /* glsl */ `
uniform sampler2D uDepth;
uniform mat4 uInvProj, uCamWorld;
uniform vec4 uRings; // strength x lift, radius (m), count, phase (bands)
uniform vec4 uRings2; // spacing (m), share, above (m), seed
uniform float uPlane; // the level sheet the rings lie on (m above the ground)
uniform vec4 uGlory; // her shadow on that sheet (x, z), the glory's radius (m), its strength
uniform vec2 uFade; // the scattered rings fade out between these distances from her (m)
varying vec2 vUv;
${LIGHT_GLSL}
${HEIGHT_GLSL}
float ringHash(vec2 c) { return fract(sin(dot(c, vec2(127.1, 311.7)) + uRings2.w) * 43758.5453); }
void main() {
  float d = texture2D(uDepth, vUv).r;
  if (d >= 1.0) discard; // the sky
  vec4 v = uInvProj * vec4(vUv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
  vec3 w = (uCamWorld * vec4(v.xyz / v.w, 1.0)).xyz;
  if (uBend.x > 0.0) { float a = max(0.0, dot(w.xz - uBend.yz, uBendFwd)); w.y += uBend.x * a * a; } // (unbent: height.ts)
  float g = groundH(w.xz), up = smoothstep(uRings2.z, uRings2.z + 4.0, w.y - g);
  if (up <= 0.0) discard;
  // The crowns are upright sprites, so their pixels share a ground point; the rings are laid instead on a level sheet
  // at crown height (uPlane above the ground here), where this pixel's line of sight crosses it: smooth ellipses over the leaves.
  vec3 dir = normalize(w - cameraPosition);
  if (dir.y > -0.05) discard; // (nearly level lines of sight would crowd the rings into a streak on the horizon)
  vec2 q = (cameraPosition + dir * ((g + uPlane - cameraPosition.y) / dir.y)).xz;
  float b = 0.0;
  vec2 cell = floor(q / uRings2.x);
  for (int i = -1; i <= 1; i++) for (int j = -1; j <= 1; j++) {
    vec2 c = cell + vec2(float(i), float(j));
    if (ringHash(c) > uRings2.y) continue;
    vec2 o = (c + 0.25 + 0.5 * vec2(ringHash(c + 17.0), ringHash(c + 41.0))) * uRings2.x; // its centre, jittered in the cell
    float r = length(q - o) / uRings.y;
    if (r >= 1.0) continue;
    float band = 0.5 + 0.5 * cos((r * uRings.z - uRings.w - ringHash(c + 3.0)) * 6.2831853);
    b = max(b, pow(band, 4.0) * (1.0 - r) * smoothstep(0.0, 0.15, r)); // (thin bands, fading out, none at the very middle)
  }
  b *= uRings.x * (1.0 - smoothstep(uFade.x, uFade.y, length(q - uGlory.xy)));
  // The glory: rings of moonlight round her own shadow on the leaves (the heiligenschein: the halo round your shadow on
  // dewy foliage), faintly prismatic, so wherever she flies over the crowns the halo goes with her.
  vec3 tint = mix(normalize(uMoon + 1e-3), vec3(0.577), 0.4); // (the moon's hue, paled, at a set brightness: the knobs read the same whatever the mood's moon)
  vec3 col = tint * b;
  float rg = length(q - uGlory.xy) / uGlory.z;
  if (rg < 1.0) {
    float gb = pow(0.5 + 0.5 * cos((rg * 3.0 - uRings.w) * 6.2831853), 3.0) * pow(1.0 - rg, 1.5) * smoothstep(0.05, 0.3, rg) * uGlory.w;
    col += tint * gb * vec3(1.0 + 0.2 * sin(rg * 14.0), 1.0, 1.0 + 0.2 * cos(rg * 14.0));
  }
  col *= up;
  if (max(col.r, max(col.g, col.b)) <= 0.002) discard;
  gl_FragColor = vec4(col, 0.0); // light added (premultiplied, alpha 0)
}`;

export class LightRings {
  readonly mesh: THREE.Mesh;
  private mat: THREE.ShaderMaterial;

  constructor(private T: LightRingsTuning, depth: THREE.Texture | null, seed: number) {
    this.mat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG,
      uniforms: {
        ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS, uDepth: { value: depth },
        uInvProj: { value: new THREE.Matrix4() }, uCamWorld: { value: new THREE.Matrix4() },
        uRings: { value: new THREE.Vector4() }, uRings2: { value: new THREE.Vector4(1, 0, 0, (seed % 997) * 0.731) }, uPlane: { value: 18 }, uGlory: { value: new THREE.Vector4() }, uFade: { value: new THREE.Vector2() },
      },
      depthWrite: false, depthTest: false, transparent: true,
      blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor, blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
    });
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 4;
  }

  /** A frame: the camera that draws the scene, where she is (y: her height, absolute), how far she's risen (0 ground,
   *  1 treetops: they show only up there), and the world's time. */
  update(camera: THREE.Camera, x: number, y: number, z: number, lift: number, time: number): void {
    const T = this.T, u = this.mat.uniforms, k = Math.min(1, Math.max(0, (lift - 0.5) / 0.5)); // (from halfway up)
    this.mesh.visible = k > 0;
    if (!this.mesh.visible) return;
    camera.updateMatrixWorld(); // (this frame's, not the last's)
    u.uInvProj.value.copy((camera as THREE.PerspectiveCamera).projectionMatrixInverse);
    u.uCamWorld.value.copy(camera.matrixWorld);
    u.uRings.value.set(T.strength * k, Math.max(1, T.radius), Math.max(1, T.count), time * T.speed);
    u.uRings2.value.x = Math.max(2 * T.radius, T.spacing);
    u.uRings2.value.y = T.share; u.uRings2.value.z = T.above; u.uPlane.value = T.plane;
    // Her shadow on the sheet: down the moon's direction from her to the crowns' height.
    const m = LIGHT_UNIFORMS.uMoonDir.value, drop = Math.max(0, y - groundHeight(x, z) - T.plane) / Math.max(0.2, m.y); // (the sheet is over the ground, which rolls)
    u.uGlory.value.set(x - m.x * drop, z - m.z * drop, Math.max(1, T.glory), T.gloryStrength * k);
    u.uFade.value.set(T.fadeNear, Math.max(T.fadeNear + 1, T.fadeFar));
  }
}
