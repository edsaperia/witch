// The dancefloor's show: the magic circle's pulse and turning runes (drawn by the ground), its
// coloured light, and a magic disco ball floating above the centre, turning, glinting, hanging
// from a thin beam of moonlight, and throwing specks of light round the circle (in the lighting).
import * as THREE from "three";
import { hsv2rgb } from "../../art/generator.js";
import type { ForestMap } from "../rules/map";
import type { Tuning } from "../rules/tuning";
import { LIGHT_UNIFORMS } from "./lighting";
import type { Ground } from "./ground";

const BALL_VERT = /* glsl */ `
uniform vec3 uRight, uUp;
uniform float uSize;
varying vec2 vUv;
void main() {
  vUv = uv * 2.0 - 1.0;
  vec3 w = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz + (uRight * position.x + uUp * position.y) * uSize;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
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

export class Dancefloor {
  readonly ball: THREE.Mesh;
  readonly beam: THREE.Mesh;
  private ballMat: THREE.ShaderMaterial;
  private lightRgb: THREE.Vector3;
  readonly centre: THREE.Vector3;

  constructor(map: ForestMap, private tuning: Tuning, sprite: { uRight: THREE.IUniform; uUp: THREE.IUniform }, metresPerPixel: number) {
    const d = tuning.dancefloor, f = map.dancefloor;
    this.centre = new THREE.Vector3(f.x, 0, f.z);
    const tint = new THREE.Vector3(...hsv2rgb(d.circleHue2, 0.4, 1).map((v: number) => v / 255));
    this.ballMat = new THREE.ShaderMaterial({
      vertexShader: BALL_VERT, fragmentShader: BALL_FRAG,
      uniforms: { ...sprite, uSize: { value: d.discoSize / 2 }, uTime: LIGHT_UNIFORMS.uTime, uSpin: { value: (d.spin / 60) * Math.PI * 2 }, uPixels: { value: Math.max(6, Math.round(d.discoSize / metresPerPixel)) }, uTint: { value: tint } },
    });
    this.ball = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.ballMat);
    this.ball.frustumCulled = false;
    const beamH = 60;
    this.beam = new THREE.Mesh(new THREE.PlaneGeometry(metresPerPixel, beamH).translate(0, beamH / 2, 0), new THREE.ShaderMaterial({ fragmentShader: BEAM_FRAG, uniforms: { uTint: { value: tint.clone().multiplyScalar(0.5) } } }));
    this.beam.frustumCulled = false;
    const c = hsv2rgb(d.circleHue, 0.7, 1);
    this.lightRgb = new THREE.Vector3(c[0] / 255, c[1] / 255, c[2] / 255);
    const s = LIGHT_UNIFORMS;
    s.uDiscoParams.value.set((d.spin / 60) * Math.PI * 2, d.specks, d.speckBrightness, d.speckReach);
    s.uDiscoColour.value.copy(tint);
  }

  /** Bring the show to `time` seconds; returns the circle's light for the light list. */
  update(time: number, ground: Ground): { x: number; y: number; z: number; reach: number; rgb: THREE.Vector3; strength: number } {
    const d = this.tuning.dancefloor, pulse = 0.75 + 0.25 * Math.sin(time * d.pulse * Math.PI * 2);
    ground.setCircle(d.circleHue, d.circleHue2, 0.7 + 0.3 * pulse, (time * d.runeSpeed / 60) * Math.PI * 2);
    const y = d.discoHeight + Math.sin(time * 0.8) * 0.3;
    this.ball.position.set(this.centre.x, y, this.centre.z);
    this.beam.position.set(this.centre.x, y + d.discoSize / 2, this.centre.z);
    LIGHT_UNIFORMS.uDisco.value.set(this.centre.x, y, this.centre.z, 1);
    return { x: this.centre.x, y: 2.5, z: this.centre.z, reach: d.lightReach, rgb: this.lightRgb, strength: d.lightStrength * pulse };
  }
}
