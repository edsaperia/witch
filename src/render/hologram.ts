// The soundsystems' sky sigils (Ed, 2026-10-08: "soundsystems should project their animal sigil into the sky once
// they're activated, readable from the treetops but in a different character to how the leashing sigils look from
// treetop; maybe a hologram or peppers ghost or something, replacing the laser we have now"). Each standing
// soundsystem's projector throws a translucent cone of light up from the top of its stack to a large hologram of its
// area's animal sigil floating over the canopy: the glyph in the area's crystal colour, pixel-sharp at the art pixel,
// with scanlines, a drifting interference band and a slight colour fringe, turning gently and bobbing; added as light.
// It powers up with a flicker when the soundsystem has risen, glitches while it's damaged, and collapses to a line and
// goes out when it's destroyed. Two instanced draws (the glyphs, the cones) for every soundsystem at once.
import * as THREE from "three";
import { sigilColour, sigilGlyph } from "../../art/generator.js";
import { AREA_TYPES } from "../rules/map";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";

export interface HologramTuning {
  on: boolean;
  /** The glyph's size (m across) and how high its middle floats over the projector (m). */
  size: number;
  lift: number;
  /** How bright the glyph and the cone are (added light, 0 to 1). */
  glyph: number;
  cone: number;
  /** The power-up flicker and the collapse (seconds). */
  powerUp: number;
  collapse: number;
  /** How far it turns either way (degrees) and bobs (m). */
  turn: number;
  bob: number;
  /** Beyond this many metres from her it fades out (m). */
  fadeFar: number;
}

/** A soundsystem's projector, this frame: its area's key, where the top of its stack is (y: m over the ground there),
 *  its area type, when it finished rising, and how damaged it is (0 whole to 1 about to fall). */
export interface Projector { key: string; x: number; y: number; z: number; type: number; ready: number; damage: number }

/** The soundsystem's damage stages (art4's, 2026-10-08: below 75%, 50% and 25% of its health, art/soundsystemGen.js's
 *  DAMAGE_STAGES), and how much the glyph glitches at each: whole, then worse with each stage. */
const STAGES = [0.75, 0.5, 0.25], GLITCH = [0, 0.3, 0.6, 1];
export function damageStage(damage: number): number { const share = 1 - damage; let k = 0; for (const s of STAGES) if (share < s) k++; return k; }

const GLYPH = 20, CELL = 24, COLS = 8; // (the glyph's art pixels, its cell in the atlas with a margin, the atlas's columns)
const MAX = 64;

const GLYPH_VERT = /* glsl */ `
attribute vec4 aAt;    // projector x, y, z; the glyph's size (m)
attribute vec4 aLook;  // colour rgb; brightness (with power-up, collapse and distance)
attribute vec4 aFx;    // atlas cell (x, y); glitch 0 to 1; squash (1 whole, 0 collapsed to a line)
attribute vec2 aSway;  // turn (radians), height of its middle over the projector (m)
varying vec2 vUv;
varying vec4 vLook;
varying vec4 vFx;
${HEIGHT_VERT_GLSL}
void main() {
  vec3 c = onGround(vec3(aAt.x, aAt.y + aSway.y, aAt.z));
  // Facing the camera across the ground, turned a little either way.
  vec2 toCam = normalize(cameraPosition.xz - c.xz + vec2(1e-4, 0.0));
  float a = atan(toCam.y, toCam.x) + 1.5707963 + aSway.x;
  vec3 right = vec3(cos(a), 0.0, sin(a));
  vec3 w = c + right * position.x * aAt.w + vec3(0.0, position.y * aAt.w * aFx.w, 0.0);
  vUv = position.xy + 0.5; vLook = aLook; vFx = aFx;
  gl_Position = clipOf(w);
}`;

const GLYPH_FRAG = /* glsl */ `
uniform sampler2D uAtlas;
uniform vec2 uAtlasSize;
uniform float uTime;
varying vec2 vUv;
varying vec4 vLook;
varying vec4 vFx;
float h1(float n) { return fract(sin(n * 91.345) * 47453.21); }
float ink(vec2 g) { // the glyph's art pixel g (0..GLYPH-1), 0 outside
  if (g.x < 0.0 || g.y < 0.0 || g.x > ${GLYPH - 1}.0 || g.y > ${GLYPH - 1}.0) return 0.0;
  return texture2D(uAtlas, (vFx.xy * ${CELL}.0 + ${(CELL - GLYPH) / 2}.0 + g + 0.5) / uAtlasSize).r;
}
void main() {
  vec2 uv = vec2(vUv.x, 1.0 - vUv.y) * ${GLYPH}.0;
  float row = floor(uv.y);
  // Glitch: rows jump sideways and drop out, more as it's damaged.
  float gk = h1(row * 7.1 + floor(uTime * 14.0));
  if (vFx.z > 0.0 && gk < vFx.z * 0.45) uv.x += (h1(row + floor(uTime * 20.0)) - 0.5) * 6.0 * vFx.z;
  if (vFx.z > 0.0 && h1(row * 3.3 + floor(uTime * 9.0)) < vFx.z * 0.25) discard;
  vec2 g = floor(uv);
  float m = ink(g), r = ink(g + vec2(1.0, 0.0)), b = ink(g - vec2(1.0, 0.0)); // (the colour fringe: red one pixel right, blue left)
  // A faint field behind the glyph, round, so it reads as a projection, not a sticker.
  float field = 0.05 * (1.0 - smoothstep(0.35, 0.5, length(vUv - 0.5)));
  // Scanlines (every other art-pixel row of the picture) and an interference band drifting up.
  float scan = mod(floor(gl_FragCoord.y), 2.0) < 1.0 ? 1.0 : 0.55;
  float band = 0.75 + 0.5 * smoothstep(0.0, 0.08, 0.08 - abs(fract(vUv.y * 0.8 - uTime * 0.35) - 0.5) + 0.04);
  vec3 col = vLook.rgb * (m * 1.0 + field) + vec3(1.0) * m * 0.25 + vec3(vLook.r * r * 0.6, 0.0, vLook.b * b * 0.6) * (1.0 - m);
  float k = vLook.a * scan * band;
  if (k * max(col.r, max(col.g, col.b)) <= 0.004) discard;
  gl_FragColor = vec4(col * k, 1.0);
  gl_FragDepth = 1.0; // (the sky's depth: see the material)
}`;

const CONE_VERT = /* glsl */ `
attribute vec4 aAt;
attribute vec4 aLook;
attribute vec4 aFx;
attribute vec2 aSway;
varying vec2 vUv;
varying vec4 vLook;
${HEIGHT_VERT_GLSL}
void main() {
  // From a point at the projector up to the glyph's lower edge, as wide as the glyph there: a flat fan facing the camera.
  float top = aSway.y - aAt.w * 0.5 * aFx.w, up = position.y + 0.5, spread = mix(0.06, aAt.w * 0.42, up);
  vec3 base = onGround(vec3(aAt.x, aAt.y, aAt.z));
  vec2 toCam = normalize(cameraPosition.xz - base.xz + vec2(1e-4, 0.0));
  float a = atan(toCam.y, toCam.x) + 1.5707963;
  vec3 w = base + vec3(cos(a), 0.0, sin(a)) * position.x * 2.0 * spread + vec3(0.0, up * max(0.0, top), 0.0);
  vUv = vec2(position.x + 0.5, up); vLook = aLook;
  gl_Position = clipOf(w);
}`;

const CONE_FRAG = /* glsl */ `
uniform float uTime;
varying vec2 vUv;
varying vec4 vLook;
void main() {
  float across = 1.0 - abs(vUv.x * 2.0 - 1.0);
  float scan = mod(floor(gl_FragCoord.y), 2.0) < 1.0 ? 1.0 : 0.6;
  float shimmer = 0.8 + 0.2 * sin(vUv.y * 40.0 - uTime * 6.0);
  float k = vLook.a * across * across * (0.35 + 0.65 * vUv.y) * scan * shimmer; // (brighter towards the glyph, where the light spreads)
  if (k <= 0.004) discard;
  gl_FragColor = vec4(vLook.rgb * k, 1.0);
}`;

export class SigilHolograms {
  readonly group = new THREE.Group();
  private glyphs: THREE.Mesh;
  private cones: THREE.Mesh;
  private geos: THREE.InstancedBufferGeometry[] = [];
  private at = new Float32Array(MAX * 4);
  private look = new Float32Array(MAX * 4);
  private coneLook = new Float32Array(MAX * 4);
  private fx = new Float32Array(MAX * 4);
  private sway = new Float32Array(MAX * 2);
  private cellOf = new Map<string, number>();
  private colourOf = new Map<string, number[]>();
  /** Projectors seen last frame, so a destroyed one can collapse after its soundsystem is gone: key → it, and when it went. */
  private seen = new Map<string, { p: Projector; gone: number | null }>();
  private atlasUniform: { value: THREE.DataTexture };
  private time = { value: 0 };

  constructor(private T: HologramTuning) {
    // Every area type's creature's sigil, once, into one small atlas.
    const species = [...new Set(AREA_TYPES.map(a => a.creature))], rows = Math.ceil(species.length / COLS);
    const W = COLS * CELL, H = rows * CELL, data = new Uint8Array(W * H);
    species.forEach((s, i) => {
      const gm = sigilGlyph(s, GLYPH) as { w: number; m: Uint8Array }, cx = (i % COLS) * CELL + (CELL - GLYPH) / 2, cy = Math.floor(i / COLS) * CELL + (CELL - GLYPH) / 2;
      for (let y = 0; y < gm.w && y < GLYPH; y++) for (let x = 0; x < gm.w && x < GLYPH; x++) if (gm.m[y * gm.w + x]) data[(cy + y) * W + cx + x] = 255;
      this.cellOf.set(s, i);
      this.colourOf.set(s, (sigilColour(s) as number[]).map(v => v / 255));
    });
    const atlas = new THREE.DataTexture(data, W, H, THREE.RedFormat);
    atlas.magFilter = atlas.minFilter = THREE.NearestFilter; atlas.needsUpdate = true;
    this.atlasUniform = { value: atlas };
    const mk = (vert: string, frag: string, look: Float32Array, uniforms: Record<string, { value: unknown }>) => {
      const geo = new THREE.InstancedBufferGeometry();
      const plane = new THREE.PlaneGeometry(1, 1, vert === CONE_VERT ? 1 : 1, vert === CONE_VERT ? 4 : 1);
      geo.index = plane.index; geo.setAttribute("position", plane.getAttribute("position"));
      geo.setAttribute("aAt", new THREE.InstancedBufferAttribute(this.at, 4).setUsage(THREE.DynamicDrawUsage));
      geo.setAttribute("aLook", new THREE.InstancedBufferAttribute(look, 4).setUsage(THREE.DynamicDrawUsage));
      geo.setAttribute("aFx", new THREE.InstancedBufferAttribute(this.fx, 4).setUsage(THREE.DynamicDrawUsage));
      geo.setAttribute("aSway", new THREE.InstancedBufferAttribute(this.sway, 2).setUsage(THREE.DynamicDrawUsage));
      geo.instanceCount = 0;
      this.geos.push(geo);
      // The glyph writes the far depth (and so is drawn over whatever is behind it, without a depth test): the tilt-shift
      // takes it for sky and leaves it nearly sharp, as it does the stars, where over the leaves it smeared it into a ring.
      const glyph = vert === GLYPH_VERT;
      const mesh = new THREE.Mesh(geo, new THREE.ShaderMaterial({
        vertexShader: vert, fragmentShader: frag, uniforms: { ...HEIGHT_UNIFORMS, uTime: this.time, ...uniforms },
        transparent: true, depthWrite: glyph, depthFunc: glyph ? THREE.AlwaysDepth : THREE.LessEqualDepth, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
      }));
      mesh.frustumCulled = false;
      mesh.renderOrder = 9;
      return mesh;
    };
    this.cones = mk(CONE_VERT, CONE_FRAG, this.coneLook, {});
    this.glyphs = mk(GLYPH_VERT, GLYPH_FRAG, this.look, { uAtlas: this.atlasUniform, uAtlasSize: { value: new THREE.Vector2(W, H) } });
    this.group.add(this.cones, this.glyphs);
  }

  /** A frame: the standing soundsystems' projectors, the game time, and where she is (they fade out far from her). */
  update(projectors: readonly Projector[], time: number, wx: number, wz: number): void {
    const T = this.T;
    this.time.value = time;
    this.group.visible = T.on;
    if (!T.on) return;
    // Who's here, who's gone (collapsing) and who's finished collapsing.
    const now = new Set<string>();
    for (const p of projectors) { now.add(p.key); this.seen.set(p.key, { p, gone: null }); }
    for (const [k, s] of this.seen) if (!now.has(k)) { if (s.gone === null) s.gone = time; else if (time - s.gone > T.collapse) this.seen.delete(k); }
    let n = 0;
    for (const { p, gone } of this.seen.values()) {
      if (n >= MAX) break;
      const since = time - p.ready;
      if (since < 0) continue;
      const fade = 1 - Math.min(1, Math.max(0, (Math.hypot(p.x - wx, p.z - wz) - T.fadeFar * 0.7) / Math.max(1, T.fadeFar * 0.3)));
      if (fade <= 0) continue;
      const species = AREA_TYPES[p.type]?.creature, cell = species !== undefined ? this.cellOf.get(species) : undefined;
      if (cell === undefined) continue;
      const col = this.colourOf.get(species)!, seed = (p.x * 0.731 + p.z * 0.377) % 6.283;
      // Power-up: it stutters on over powerUp seconds, flashes frames on and off, then holds.
      const up = Math.min(1, since / Math.max(0.05, T.powerUp)), stutter = up >= 1 ? 1 : (frac(Math.sin(Math.floor(time * 24) * 12.9898 + seed) * 43758.5) < up ? 1 : 0.15);
      // Collapse: squashed to a line, flaring, then out.
      const c = gone === null ? 0 : Math.min(1, (time - gone) / Math.max(0.05, T.collapse)), squash = 1 - c * c, flare = 1 + 1.5 * Math.sin(Math.PI * c);
      const glitch = Math.max(GLITCH[damageStage(p.damage)], gone === null ? 0 : 0.8);
      const bright = fade * stutter * flare * (c >= 1 ? 0 : 1);
      this.at.set([p.x, p.y, p.z, T.size], n * 4);
      this.look.set([col[0], col[1], col[2], T.glyph * bright], n * 4);
      this.coneLook.set([col[0], col[1], col[2], T.cone * bright * (1 - c)], n * 4);
      this.fx.set([cell % COLS, Math.floor(cell / COLS), glitch, Math.max(0.02, squash)], n * 4);
      this.sway.set([Math.sin(time * 0.6 + seed) * (T.turn * Math.PI) / 180, T.lift + Math.sin(time * 1.1 + seed * 2) * T.bob], n * 2);
      n++;
    }
    for (const geo of this.geos) {
      geo.instanceCount = n;
      for (const k of ["aAt", "aLook", "aFx", "aSway"]) (geo.getAttribute(k) as THREE.InstancedBufferAttribute).needsUpdate = true;
    }
  }
}

const frac = (x: number) => x - Math.floor(x);
