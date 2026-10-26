// Trunk shadows (Ed, 2026-10-12: "tree trunks casting shadows in ground mode from the witch's glow and from campfires"; soft,
// "but the darkest part as dark as the hard one"; the beach's palms by its campfires too): on
// the ground near a light, each tree's trunk (its bottom half's sprite) laid flat as its silhouette, stretching away from the
// light, longer the lower the light and the farther the trunk, fading with distance from the light and toward its tip. Two
// lights at most a trunk: her glow (slot 0: it moves with her, so the shadows swing as she walks) and the nearest campfire
// (slot 1). One batch per area type (its trees' atlas), each drawn twice, a mesh a slot; all the aiming is on the GPU, the
// trunks set only when the scenery's rebuilt. Multiplied over the ground, like render/shadows.ts. Each fades in from nothing at
// its trunk's foot over uTrunkFoot metres and narrows to its foot over uTrunkTaper metres, and fades to nothing as she comes within uTrunkNear metres of its trunk (Ed, 2026-10-12: "they
// should fade out at the bottom of the tree", "when you're close to the tree", "for both campfires and for the witch"); and it
// darkens the ground cover it falls on too, the grass, flowers and tufts (Ed: "a treetrunk casting a shadow on some red flowers.
// The ground is very dark but the red flowers are still full brightness"): drawn again just after the grass, over only the
// grass's own pixels (its stencil mark: render/grass.ts), before the scenery and mist go on.
import * as THREE from "three";
import { LIGHT_UNIFORMS } from "./lighting";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { CAST_LAYER } from "./castShadows";
import { atlasGlsl, atlasUniforms, type Atlas } from "./atlas";
import type { Frame } from "./artBuild";

/** The fires that throw them (up to MAX_FIRES nearest her, set each frame: xyz, reach; how far each has flared up; and its colour:
 *  the campfires, the soundsystems and the runestones, render/view.ts ForestLight.shadow), how
 *  strong, hard (1: on the art's pixels, two tones) or soft (0: a blurred silhouette, its penumbra widening toward its tip, as
 *  dark as hard where its fade passes uTrunkCore), and the longest a shadow gets (times its trunk's height). */
export const MAX_FIRES = 8;
export const TRUNK_SHADOW_UNIFORMS = {
  uFires: { value: Array.from({ length: MAX_FIRES }, () => new THREE.Vector4()) },
  uFireCount: { value: 0 },
  uFireFade: { value: Array.from({ length: MAX_FIRES }, () => 0) },
  uTrunkStrength: { value: 0.6 },
  uTrunkCore: { value: 0.3 },
  uTrunkHard: { value: 0 },
  uTrunkLong: { value: 2.5 },
  uGlowReach: { value: 20 },
  uGlowLift: { value: 2.5 },
  uTrunkAcross: { value: 0.5 },
  uTrunkFoot: { value: 1.5 },
  uTrunkTaper: { value: 2 },
  uTrunkNear: { value: 6 },
  uTrunkCover: { value: 1 },
  /** The fires' colours; how far a shadow takes the complement of its light's colour (0: black; scenery, trees);
   *  how light a glowing caster's shadow is, in its own colour (Ed, 2026-10-12: "they shouldn't be black"). */
  uFireRgb: { value: Array.from({ length: MAX_FIRES }, () => new THREE.Vector3(1, 0.6, 0.3)) },
  uTintScenery: { value: 0 },
  uTintTrees: { value: 0 },
  uCasterLight: { value: 0 },
  /** scenery's foot fade (Ed, 2026-10-12: "Runestones shadow should fade at the base"): metres past its own half-width, from its middle */
  uSceneryFoot: { value: 2 },
  /** scenery's taper (Ed, 2026-10-12: "What about tapering?"): over its half-width and this share of its width past it, so a wide ruin
   *  opens out over more ground than a narrow runestone (0: none) */
  uSceneryTaper: { value: 0.5 },
};

const VERT = /* glsl */ `
attribute vec4 iTrunk; // x, z (its foot), width, height (metres)
attribute vec4 iUv;    // its frame in the atlas (u0, v0 top, u1, v1 bottom; u0 > u1 mirrored)
attribute vec3 iPad;   // its empty rows at the bottom, a share of its height; (unused); scenery (1) or a tree (0)
attribute vec4 iShade; // a glowing caster's own colour (0..1) and how much it glows (0: not at all)
uniform float uSlot, uTrunkLong, uGlowReach, uGlowLift, uTrunkAcross, uTrunkNear, uTintScenery, uTintTrees, uCasterLight, uTrunkFoot, uSceneryFoot, uTrunkTaper, uSceneryTaper;
uniform vec3 uGlowPos, uGlowRgb;
uniform vec3 uFireRgb[${MAX_FIRES}];
varying vec3 vShade;
uniform vec4 uFires[${MAX_FIRES}];
uniform float uFireFade[${MAX_FIRES}];
uniform int uFireCount;
varying vec2 vTex, vUx;
varying float vFade, vAlong, vLen, vU, vTaper, vFoot;
varying vec4 vFrame;
${HEIGHT_VERT_GLSL}
void main() {
  vec2 foot = iTrunk.xy;
  vec3 L, lc = uGlowRgb; float reach, lit = 1.0; // (lit: a fire's share of itself, as it flares up or dies down; lc: its light's colour)
  if (uSlot < 0.5) { L = vec3(uGlowPos.x, uGlowLift, uGlowPos.z); reach = uGlowReach; } // (her glow, as from uGlowLift metres up: lower than it shines from, for shadows that read)
  else { // the nearest fire whose reach it's in
    float best = 1e9; L = vec3(0.0); reach = 0.0;
    for (int i = 0; i < ${MAX_FIRES}; i++) { if (i >= uFireCount) break; vec4 F = uFires[i]; float d = length(foot - F.xz); if (d < F.w && d < best) { best = d; L = vec3(F.x, F.y - groundH(F.xz), F.z); reach = F.w; lit = uFireFade[i]; lc = uFireRgb[i]; } }
  }
  vec2 off = foot - L.xz; float d = length(off);
  if (reach <= 0.0 || d > reach || d < 0.4) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; } // (out of its light, or the light's own source (a soundsystem, a runestone, cast from where it stands): nothing)
  vec2 dir = off / d, side = vec2(dir.y, -dir.x); // (so across, along turn as x, z do: facing up, not culled)
  float pad = iPad.x, h = iTrunk.w * (1.0 - pad), len = clamp(d * h / max(0.6, L.y), 0.6 * h, uTrunkLong * h);
  float t = position.z + 0.5, u = position.x; // (along from its foot, across)
  vec2 p = foot + dir * t * len + side * u * iTrunk.z * uTrunkAcross;
  vTex = vec2(mix(iUv.x, iUv.z, 0.5 + u * uTrunkAcross), mix(iUv.w, iUv.y, pad + t * (1.0 - pad)));
  vUx = vec2(iUv.x, iUv.z); vU = u * uTrunkAcross;
  vTaper = iPad.z > 0.5 ? (uSceneryTaper > 0.0 ? min((0.5 + uSceneryTaper) * iTrunk.z, 0.6 * len) : 0.0) : uTrunkTaper; // (its taper's length: a trunk's, or scenery's by its width, at most 0.6 of its shadow: a wide ruin's isn't all pinch)
  vFrame = vec4(min(iUv.x, iUv.z), iUv.y, max(iUv.x, iUv.z), iUv.w);
  float k = 1.0 - d / reach;
  float near = uTrunkNear > 0.0 ? smoothstep(0.25 * uTrunkNear, uTrunkNear, length(foot - uGlowPos.xz)) : 1.0; // (to nothing as she comes up to its trunk)
  // (its foot fade: a trunk's from its foot; scenery's, cast from its middle, over its half-width and uSceneryFoot metres past it)
  vFoot = iPad.z > 0.5 ? (uSceneryFoot > 0.0 ? uSceneryFoot + 0.5 * iTrunk.z : 0.0) : uTrunkFoot;
  vFade = k * k * lit * near; vAlong = t; vLen = len; // (to nothing at its reach's edge: none pops in or out)
  // Its colour at its darkest (Ed, 2026-10-12: "Can we have complementary colours in shadows cheaply?"): black, toward the
  // complement of its light's colour by the tint (a fire's orange throws blue-violet), and a glowing caster's toward a soft shade of
  // its own colour (a runestone's, a soundsystem's: lit with coloured light, never black)
  float mx = max(max(lc.r, lc.g), lc.b), mn = min(min(lc.r, lc.g), lc.b);
  vec3 comp = vec3(mx + mn) - lc; comp /= max(1e-3, max(max(comp.r, comp.g), comp.b));
  vShade = comp * 0.45 * mix(uTintTrees, uTintScenery, iPad.z);
  vec3 own = iShade.rgb / max(1e-3, max(max(iShade.r, iShade.g), iShade.b));
  vShade = mix(vShade, mix(vec3(0.55), own, 0.6), clamp(iShade.w * uCasterLight, 0.0, 1.0));
  gl_Position = clipOf(onGround(vec3(p.x, 0.06, p.y)));

}`;

const FRAG = /* glsl */ `
${atlasGlsl()}
uniform float uTrunkStrength, uTrunkHard, uTrunkCore, uTrunkCover, uCover;
varying vec2 vTex, vUx;
varying float vFade, vAlong, vLen, vU, vTaper, vFoot;
varying vec4 vFrame;
varying vec3 vShade;
float solid(vec2 q) { return q.x < vFrame.x || q.x > vFrame.z || q.y < vFrame.y || q.y > vFrame.w ? 0.0 : step(0.5, albedoAt(q).a); }
void main() {
  float a;
  // Tapered at its foot (Ed, 2026-10-12: roots and decorations "get wide at the base, that look strange when they're rotated"): its
  // width pinched to a third at the foot, opening smoothly to full over uTrunkTaper metres, the sprite's whole width squeezed in. Done
  // here, a pixel at a time (in the vertices, between the quad's few rows along, it showed as a kink: Ed, v3052).
  vec2 tex = vTex;
  if (vTaper > 0.0) { // (vTaper: over how many metres, a trunk's or scenery's)
    float pinch = mix(0.35, 1.0, smoothstep(0.0, 1.0, vAlong * vLen / vTaper));
    tex.x = mix(vUx.x, vUx.y, 0.5 + vU / pinch);
  }
  if (uTrunkHard > 1.5) { gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0); return; } // (?trunks=debug: where they lie, magenta)
  if (uTrunkHard > 0.5) {
    a = solid(tex) * (vFade * (1.0 - vAlong) > 0.12 ? 1.0 : 0.55) * step(0.03, vFade * (1.0 - vAlong)); // two tones, on the art's pixels
  } else {
    float px = 1.0 / float(textureSize(uAlbedo, 0).x), s = (1.0 + 4.0 * vAlong) * px; // (its penumbra widening toward the tip)
    a = (solid(tex) * 2.0 + solid(tex + vec2(s, 0.0)) + solid(tex - vec2(s, 0.0)) + solid(tex + vec2(2.0 * s, 0.0)) * 0.5 + solid(tex - vec2(2.0 * s, 0.0)) * 0.5) / 5.0;
    a *= min(1.0, vFade * (1.0 - vAlong * vAlong) / uTrunkCore); // (Ed: "soft, but the darkest part as dark as the hard one": full strength near its foot and the light, soft only at its edges and toward its tip)
  }
  if (vFoot > 0.0) a *= smoothstep(0.0, vFoot, vAlong * vLen); // (from nothing at its foot)
  a *= uTrunkStrength * (uCover > 0.5 ? uTrunkCover : 1.0);
  if (a < 0.004) discard;
  gl_FragColor = vec4(mix(vec3(1.0), vShade, a), 1.0); // multiplied over the ground (toward its shade: black, or a colour)
}`;

/** A trunk: its foot (metres), width and height (metres), its frame and whether it's mirrored; scenery (cast from its middle: its foot
 *  fade and taper by its own width, render/view/scenery.ts) or a tree. */
export interface TrunkShadow { x: number; z: number; w: number; h: number; frame: Frame; flip: boolean; scenery?: boolean; /** a glowing caster's colour (0..1) and how much it glows (0 to 1) */ glow?: { rgb: ArrayLike<number>; k: number } }

export class TrunkShadowBatch {
  readonly meshes: THREE.Mesh[] = [];
  private geo = new THREE.InstancedBufferGeometry();
  private capacity = 0;
  private trunk!: THREE.InstancedBufferAttribute;
  private uv!: THREE.InstancedBufferAttribute;
  private pad!: THREE.InstancedBufferAttribute;
  private shade!: THREE.InstancedBufferAttribute;

  constructor(readonly atlas: Atlas) {
    const quad = new THREE.PlaneGeometry(1, 1, 1, 8).rotateX(-Math.PI / 2); // (divided along, to lie on the slopes)
    this.geo.index = quad.index;
    this.geo.setAttribute("position", quad.getAttribute("position"));
    this.grow(256);
    for (const slot of [0, 1]) for (const cover of [false, true]) {
      // (cover: again over the ground cover's pixels only, just after it's drawn (renderOrder 0.25) and before the scenery (0.5)
      // goes over it; in the opaque pass so it keeps that place, multiplying all the same, with no depth test: the tufts stand
      // above the shadow, which lies on the ground)
      const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG,
        uniforms: { ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS, ...TRUNK_SHADOW_UNIFORMS, ...atlasUniforms(atlas), uSlot: { value: slot }, uCover: { value: cover ? 1 : 0 } },
        depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
        blending: THREE.CustomBlending, blendSrc: THREE.ZeroFactor, blendDst: THREE.SrcColorFactor,
        ...(cover ? { transparent: false, depthTest: false, stencilWrite: true, stencilRef: 2, stencilFuncMask: 2, stencilWriteMask: 0, stencilFunc: THREE.EqualStencilFunc, stencilFail: THREE.KeepStencilOp, stencilZFail: THREE.KeepStencilOp, stencilZPass: THREE.KeepStencilOp } : { transparent: true }) });
      const m = new THREE.Mesh(this.geo, mat);
      m.frustumCulled = false; m.renderOrder = cover ? 0.3 : 1;
      if (!cover) m.layers.enable(CAST_LAYER); // (drawn again from above into the cast-shadow map: render/castShadows.ts)
      this.meshes.push(m);
    }
  }

  private grow(n: number): void {
    this.capacity = Math.max(n, this.capacity * 2);
    this.geo.dispose(); // (or three.js keeps drawing only the old capacity: SpriteBatch.grow)
    const mk = (k: number) => { const a = new THREE.InstancedBufferAttribute(new Float32Array(this.capacity * k), k); a.setUsage(THREE.DynamicDrawUsage); return a; };
    this.trunk = mk(4); this.uv = mk(4); this.pad = mk(3); this.shade = mk(4);
    this.geo.setAttribute("iTrunk", this.trunk); this.geo.setAttribute("iUv", this.uv); this.geo.setAttribute("iPad", this.pad); this.geo.setAttribute("iShade", this.shade);
  }

  set(list: TrunkShadow[]): void {
    if (list.length > this.capacity) this.grow(list.length);
    const T = this.trunk.array as Float32Array, U = this.uv.array as Float32Array, P = this.pad.array as Float32Array, S = this.shade.array as Float32Array;
    list.forEach((s, i) => {
      const uv = s.frame.uv;
      T.set([s.x, s.z, s.w, s.h], i * 4);
      U.set(s.flip ? [uv[2], uv[1], uv[0], uv[3]] : [uv[0], uv[1], uv[2], uv[3]], i * 4);
      P[i * 3] = (s.frame.pad ?? 0) / s.frame.h; P[i * 3 + 1] = 0; P[i * 3 + 2] = s.scenery ? 1 : 0;
      const gl = s.glow; S[i * 4] = gl ? gl.rgb[0] : 0; S[i * 4 + 1] = gl ? gl.rgb[1] : 0; S[i * 4 + 2] = gl ? gl.rgb[2] : 0; S[i * 4 + 3] = gl ? gl.k : 0;
    });
    for (const a of [this.trunk, this.uv, this.pad, this.shade]) a.needsUpdate = true;
    this.geo.instanceCount = list.length;
  }

  set visible(on: boolean) { for (const m of this.meshes) m.visible = on; }

  dispose(): void { this.geo.dispose(); for (const m of this.meshes) (m.material as THREE.Material).dispose(); }
}
