// The leash view's glyphs (render/leash.ts): the instanced quads it draws every sigil, rune, spark, thread bead and effect with,
// the glyph atlas's layout, and her magic's colours in the night.
import * as THREE from "three";
import type { Creature } from "../../rules/creatures";
import { PIXEL_SNAP_GLSL } from "../shaders";
import { LIGHT_GLSL } from "../lighting";
import { HEIGHT_VERT_GLSL } from "../height";

/** The join burst's colours (the art director, #188 and #200): the lanterns' amber, light and deep, with the creature's own
 *  neon; nothing white (white is a hit's). */
/** Her magic's colours in the night (the art director's palette, #188 and round 2): the lanterns' amber and the 💌s' rose. */
export const AMBER = [0.91, 0.71, 0.42], ROSE = [0.85, 0.47, 0.62];
export const JOIN_PALETTE = [[0.91, 0.71, 0.42], [0.82, 0.52, 0.28], [0.91, 0.71, 0.42]];

/** A soft dot bigger than this (metres) is light (a halo, an aura, a glow) and stays smooth; smaller, an object in art pixels. */
export const PIXEL_DOT_MAX = 1.4;
export const SLOT = 32, SLOTS = 16; // the glyph atlas: 16 x 16 slots of 32 px; slot 0 is a soft dot
export const SQ = SLOTS * SLOTS - 1; // and the last a solid square
export const LEGEND_LEVEL = 3, LEGEND_ROW = 10; // legendary sigils' 2 × 2 blocks fill rows 10 to 13 (16 of them); the rest from slot 1 up
/** Whether a creature's sigil in the stack, as a leash point and its ghost, is the legendary one (art/sigils.js `legendary`):
 *  every legend's (in the stack only once she can carry one: a party legend, or a legend let go and invited). */
export const legendarySigil = (c: Pick<Creature, "level">): boolean => c.level >= LEGEND_LEVEL;

// Ed, round 14: "Creature projectiles and the leyline and pulse are not pixelated. Lighting effects can be non-pixel but they
// should be lighting objects that are pixels." The soft dot (slot 0) drawn as an object (a shot, a spark, a thread's bead, a
// telegraph's ring) is a disc of the art's own pixels, a bright core and a dimmer rim, hard-edged, its middle on the screen's
// pixel grid; drawn as light (a halo, an aura, a glow: bigger than PIXEL_DOT_MAX metres, or marked glow), it stays smooth.
export const VERT = /* glsl */ `
uniform vec3 uRight, uUp;
uniform float uFlat;
uniform vec2 uRes;
uniform float uMpp, uDotMax;
attribute vec3 iPos;
attribute float iSize;
attribute vec4 iUv;
attribute vec4 iCol;
attribute float iDraw;
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw;
varying vec3 vWorld;
varying float vPix, vN;
${HEIGHT_VERT_GLSL}
${PIXEL_SNAP_GLSL}
void main() {
  vec2 p = position.xy;
  // On the rolling ground: a rune lying flat follows it corner by corner; the rest stand above it.
  vec3 w = uFlat > 0.5 ? onGround(iPos + vec3(p.x * iSize, 0.04, -p.y * iSize)) : onGround(iPos) + uRight * (p.x * iSize) + uUp * (p.y * iSize);
  vUv = vec2(mix(iUv.x, iUv.z, uv.x), mix(iUv.w, iUv.y, uv.y));
  bool glow = iDraw > 1.5;
  vP = p; vCol = iCol; vDraw = glow ? iDraw - 2.0 : iDraw; vWorld = w;
  vPix = !glow && iUv.z < 0.07 && iUv.y > 0.99 && iSize <= uDotMax ? 1.0 : 0.0; // (the soft dot, as an object)
  vN = max(1.0, floor(iSize / uMpp + 0.5)); // its art pixels across
  gl_Position = clipOf(w);
  if (vPix > 0.5) gl_Position.xy += pixelSnap(clipOf(onGround(iPos))) * gl_Position.w;
  if (overBend(onGround(iPos)) < 0.5) gl_Position = vec4(2.0, 2.0, 2.0, 1.0); // (the glows seen through the canopy: never through the earth)
}`;

export const FRAG = /* glsl */ `
uniform sampler2D uGlyphs;
uniform float uSolid;
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw;
varying vec3 vWorld;
varying float vPix, vN;
${LIGHT_GLSL}
void main() {
  float a = texture2D(uGlyphs, vUv).a * vCol.a;
  if (vPix > 0.5) {
    // A disc of art pixels: each fragment takes its art pixel's middle; a full core, a half rim, nothing past it (one or two
    // pixels across: solid).
    vec2 q = (floor((vP + 0.5) * vN) + 0.5) / vN - 0.5;
    float r = length(q) * 2.0;
    a = (vN < 2.5 ? 1.0 : r < 0.55 ? 1.0 : r < 0.95 ? 0.5 : 0.0) * vCol.a;
  }
  // Written on: revealed clockwise from the top as vDraw goes 0 to 1.
  float ang = fract(atan(vP.x, vP.y) / 6.2831853 + 1.0);
  if (ang > vDraw || a < 0.02) discard;
  gl_FragColor = uSolid > 0.5 ? vec4(haze(vCol.rgb, vWorld), a) : vec4(haze(vCol.rgb * a, vWorld), 1.0); // (solid: dust and bits, blended, not glowing)
}`;

export class Instances {
  readonly mesh: THREE.Mesh;
  private geo = new THREE.InstancedBufferGeometry();
  private cap = 0;
  private n = 0;
  private pos!: Float32Array; private size!: Float32Array; private uv!: Float32Array; private col!: Float32Array; private draw!: Float32Array;

  constructor(mat: THREE.ShaderMaterial) {
    const q = new THREE.PlaneGeometry(1, 1);
    this.geo.index = q.index;
    this.geo.setAttribute("position", q.getAttribute("position"));
    this.geo.setAttribute("uv", q.getAttribute("uv"));
    this.grow(256);
    this.mesh = new THREE.Mesh(this.geo, mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 3;
  }

  private grow(cap: number): void {
    const keep = (a: Float32Array | undefined, k: number) => { const b = new Float32Array(cap * k); if (a) b.set(a); return b; };
    this.pos = keep(this.pos, 3); this.size = keep(this.size, 1); this.uv = keep(this.uv, 4); this.col = keep(this.col, 4); this.draw = keep(this.draw, 1);
    this.cap = cap;
    this.geo.dispose(); // or three.js keeps drawing only the old capacity (see SpriteBatch.grow)
    const at = (name: string, a: Float32Array, k: number) => this.geo.setAttribute(name, new THREE.InstancedBufferAttribute(a, k).setUsage(THREE.DynamicDrawUsage));
    at("iPos", this.pos, 3); at("iSize", this.size, 1); at("iUv", this.uv, 4); at("iCol", this.col, 4); at("iDraw", this.draw, 1);
  }

  begin(): void { this.n = 0; }
  /** glow: drawn as light, smooth (a soft dot otherwise draws as an object, in art pixels, up to PIXEL_DOT_MAX metres). */
  add(x: number, y: number, z: number, size: number, uv: number[], r: number, g: number, b: number, a: number, draw = 1, glow = false): void {
    if (this.n >= this.cap) this.grow(this.cap * 2);
    const i = this.n++;
    this.pos.set([x, y, z], i * 3); this.size[i] = size; this.uv.set(uv, i * 4); this.col.set([r, g, b, a], i * 4); this.draw[i] = draw + (glow ? 2 : 0);
  }
  end(): void {
    this.geo.instanceCount = this.n;
    for (const k of ["iPos", "iSize", "iUv", "iCol", "iDraw"]) (this.geo.getAttribute(k) as THREE.InstancedBufferAttribute).needsUpdate = true;
  }
}
