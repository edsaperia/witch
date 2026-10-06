// The dancefloor's show: its glass tiles, lit by the engine (rules/dancefloor.ts) and drawn by the
// ground; its light, coloured and brightened by the lit tiles; a magic disco ball floating above the
// centre, turning, glinting, hanging from a thin beam of moonlight, and throwing specks of light
// round the floor (in the lighting); and magic particles drifting up off it, high into the sky,
// wobbling as they fade, more of them as the party grows. Dark until the floor switches on.
import * as THREE from "three";
import { hsv2rgb } from "../../art/generator.js";
import type { ForestMap } from "../rules/map";
import { composeFloor, GRID } from "../rules/dancefloor";
import { floorInputs, type Game } from "../rules/game";
import type { Tuning } from "../rules/tuning";
import { LIGHT_UNIFORMS } from "./lighting";
import { groundHeight, HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import type { Ground } from "./ground";

const BALL_VERT = /* glsl */ `
uniform vec3 uRight, uUp;
uniform float uSize;
varying vec2 vUv;
${HEIGHT_VERT_GLSL}
void main() {
  vUv = uv * 2.0 - 1.0;
  vec3 w = onGround((modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz) + (uRight * position.x + uUp * position.y) * uSize;
  gl_Position = clipOf(w);
}`;

// The beam: a thin plane standing on the floor (on its plateau of the rolling ground).
const BEAM_VERT = /* glsl */ `
${HEIGHT_VERT_GLSL}
void main() {
  vec3 w = (modelMatrix * vec4(position, 1.0)).xyz;
  w.y += groundH((modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xz);
  gl_Position = clipOf(w);
}`;

const BALL_FRAG = /* glsl */ `
uniform float uTime, uSpin, uPixels;
uniform vec3 uTint;
varying vec2 vUv;
float h(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main() {
  vec2 q = (floor((vUv * 0.5 + 0.5) * uPixels) + 0.5) / uPixels * 2.0 - 1.0; // on the art's pixel grid
  float r2 = dot(q, q);
  if (r2 > 1.0) discard;
  vec3 n = vec3(q.x, q.y, sqrt(1.0 - r2));
  float lon = atan(n.x, n.z) + uTime * uSpin, lat = asin(n.y);
  vec2 g = vec2(lon * 3.0, lat * 4.0), cell = floor(g), f = fract(g);
  float base = 0.3 + 0.35 * h(cell) + 0.25 * n.z;
  if (f.x < 0.14 || f.y < 0.14) base *= 0.45;                         // the mirror tiles' grout
  if (h(cell + floor(uTime * 3.0) * 7.0) > 0.9) base = 1.4;           // a glinting facet
  gl_FragColor = vec4(mix(vec3(base), uTint * base, 0.35), 1.0);
}`;

const BEAM_FRAG = /* glsl */ `
uniform vec3 uTint;
void main() {
  if (mod(floor(gl_FragCoord.y), 3.0) > 0.5) discard; // faint: a dotted thread of light
  gl_FragColor = vec4(uTint, 1.0);
}`;

const MOTE_VERT = /* glsl */ `
attribute vec4 aMote; // phase, speed, wobble, ring
uniform float uTime, uRise;
varying float vA;
${HEIGHT_VERT_GLSL}
void main() {
  float y = mod(uTime * aMote.y + aMote.x * uRise, uRise), k = y / uRise;
  vec3 p = onGround(position);
  p.x += sin(uTime * 0.9 + aMote.x * 31.0) * aMote.z * (0.3 + k);
  p.z += cos(uTime * 0.7 + aMote.x * 17.0) * aMote.z * (0.3 + k);
  p.y += y;
  vA = smoothstep(0.0, 0.05, k) * (1.0 - smoothstep(0.4, 1.0, k));
  gl_Position = clipOf(p);
  gl_PointSize = vA > 0.15 ? (k < 0.15 ? 2.0 : 1.0) : 0.0;
}`;
const MOTE_FRAG = /* glsl */ `
uniform vec3 uTint;
varying float vA;
void main() { if (vA < 0.15) discard; gl_FragColor = vec4(uTint * (0.5 + vA), 1.0); }`;

export class Dancefloor {
  readonly ball: THREE.Mesh;
  readonly beam: THREE.Mesh;
  readonly motes: THREE.Points;
  private ballMat: THREE.ShaderMaterial;
  private lightRgb: THREE.Vector3;
  private tiles = new Uint8Array(GRID * GRID * 4);
  private moteCount: number;
  readonly centre: THREE.Vector3;

  constructor(map: ForestMap, private tuning: Tuning, sprite: { uRight: THREE.IUniform; uUp: THREE.IUniform }, metresPerPixel: number) {
    const d = tuning.dancefloor, f = map.dancefloor;
    this.centre = new THREE.Vector3(f.x, 0, f.z);
    const tint = new THREE.Vector3(...hsv2rgb(d.circleHue2, 0.4, 1).map((v: number) => v / 255));
    this.ballMat = new THREE.ShaderMaterial({
      vertexShader: BALL_VERT, fragmentShader: BALL_FRAG,
      uniforms: { ...sprite, ...HEIGHT_UNIFORMS, uSize: { value: d.discoSize / 2 }, uTime: LIGHT_UNIFORMS.uTime, uSpin: { value: (d.spin / 60) * Math.PI * 2 }, uPixels: { value: Math.max(6, Math.round(d.discoSize / metresPerPixel)) }, uTint: { value: tint } },
    });
    this.ball = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.ballMat);
    this.ball.frustumCulled = false;
    const beamH = 60;
    this.beam = new THREE.Mesh(new THREE.PlaneGeometry(metresPerPixel, beamH).translate(0, beamH / 2, 0), new THREE.ShaderMaterial({ vertexShader: BEAM_VERT, fragmentShader: BEAM_FRAG, uniforms: { ...HEIGHT_UNIFORMS, uTint: { value: tint.clone().multiplyScalar(0.5) } } }));
    this.beam.frustumCulled = false;
    // Magic particles: a tight column over the circle, rising very high.
    const M = d.motes, mp: number[] = [], md: number[] = [];
    for (let i = 0; i < M.count; i++) {
      const h = (k: number) => { const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return v - Math.floor(v); };
      const a = h(1) * Math.PI * 2, r = Math.sqrt(h(2)) * f.radius * M.column;
      mp.push(f.x + Math.cos(a) * r, 0.3, f.z + Math.sin(a) * r);
      md.push(h(3), M.speed * (0.6 + h(4) * 0.8), 0.4 + h(5) * 1.2, 0);
    }
    const mg = new THREE.BufferGeometry();
    mg.setAttribute("position", new THREE.Float32BufferAttribute(mp, 3));
    mg.setAttribute("aMote", new THREE.Float32BufferAttribute(md, 4));
    const mc = hsv2rgb(d.circleHue, 0.55, 1);
    this.motes = new THREE.Points(mg, new THREE.ShaderMaterial({ vertexShader: MOTE_VERT, fragmentShader: MOTE_FRAG, uniforms: { ...HEIGHT_UNIFORMS, uTime: LIGHT_UNIFORMS.uTime, uRise: { value: M.rise }, uTint: { value: new THREE.Vector3(mc[0] / 255, mc[1] / 255, mc[2] / 255) } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    this.motes.frustumCulled = false;
    this.moteCount = M.count;
    const c = hsv2rgb(d.circleHue, 0.7, 1);
    this.lightRgb = new THREE.Vector3(c[0] / 255, c[1] / 255, c[2] / 255);
    const s = LIGHT_UNIFORMS;
    s.uDiscoParams.value.set((d.spin / 60) * Math.PI * 2, d.specks, d.speckBrightness, d.speckReach);
    s.uDiscoColour.value.copy(tint);
  }

  /** Bring the show to `time` seconds; returns the floor's light for the light list. */
  /** off: the party's over (render/partyOver.ts), 0 playing to 1 switched off: its tiles go dark one by one (each at its
   *  own moment, as if the power's been cut), the ball, its specks, the motes and its light with them. */
  update(time: number, ground: Ground, g: Game, off = 0): { x: number; y: number; z: number; reach: number; rgb: THREE.Vector3; strength: number } {
    const d = this.tuning.dancefloor, inp = floorInputs(g), tiles = composeFloor(g.floor, inp, this.tuning, this.tiles), on = g.floor.on !== null && off < 0.999;
    if (off > 0) { const T = tiles.rgbi; for (let i = 0, n = 0; i < T.length; i += 4, n++) if (((n * 0.6180339887) % 1) * 0.85 < off - 0.1) T[i + 3] = 0; }
    ground.setFloorTiles(tiles.rgbi);
    const pulse = 0.75 + 0.25 * Math.sin(time * d.pulse * Math.PI * 2);
    ground.setCircle(d.circleHue, d.circleHue2, 0.7 + 0.3 * pulse, (time * d.runeSpeed / 60) * Math.PI * 2); // the party's sweeps still use its hues
    const y = d.discoHeight + Math.sin(time * 0.8) * 0.3;
    this.ball.position.set(this.centre.x, y, this.centre.z);
    this.beam.position.set(this.centre.x, y + d.discoSize / 2, this.centre.z);
    // The ball lights and the motes rise once the floor is on; more motes at higher levels.
    this.ball.visible = this.beam.visible = on;
    LIGHT_UNIFORMS.uDisco.value.set(this.centre.x, y + groundHeight(this.centre.x, this.centre.z), this.centre.z, on ? 1 : 0); // over the floor's plateau
    LIGHT_UNIFORMS.uDiscoParams.value.z = d.speckBrightness * (1 - off);
    this.motes.geometry.setDrawRange(0, on ? Math.round(this.moteCount * (0.25 + 0.25 * inp.level) * (1 - off)) : 0);
    // The light takes the lit tiles' colour, brighter the more of the floor is lit and the higher the level.
    if (tiles.lit > 0) this.lightRgb.set(...tiles.average).multiplyScalar(1 / Math.max(0.3, ...tiles.average));
    const strength = on ? d.lightStrength * (0.35 + 0.65 * Math.min(1, tiles.lit * 3)) * (0.6 + 0.15 * inp.level)
      : d.lightStrength * 0.25 * Math.min(1, tiles.lit * 3); // before the first wave: the moon's faint light (rules/dancefloor.ts moonTiles)
    return { x: this.centre.x, y: 2.5, z: this.centre.z, reach: d.lightReach, rgb: this.lightRgb, strength: strength * (1 - off) };
  }
}
