// String lights in the party zone: for each partified area, its lines (rules/strings.ts) drawn as a
// thin dark wire hanging in a sag between two trunks, with bulbs every bulbSpacing metres:
// single glowing pixels (two when near) cycling through a party palette, twinkling, now and then a
// chase running along, swaying with the wind. Each bulb switches on as the party's front passes.
import * as THREE from "three";
import type { Game } from "../rules/game";
import { stringsFor, type StringLine } from "../rules/strings";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";
import type { ForestLight } from "./view";

const BULB_VERT = /* glsl */ `
attribute vec3 aColour;
attribute vec4 aBulb; // phase, index along the line, time it switches on, sway (0 at the ends)
uniform float uWind, uNear, uTime;
varying vec3 vColour;
varying vec3 vWorld;
varying float vOn;
varying vec2 vB;
void main() {
  vec3 p = position;
  p.x += sin(uTime * uWind + aBulb.x * 6.0) * 0.18 * aBulb.w;
  p.z += cos(uTime * uWind * 0.8 + aBulb.x * 4.0) * 0.1 * aBulb.w;
  vec4 mv = viewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  vOn = uTime >= aBulb.z ? 1.0 : 0.0;
  gl_PointSize = vOn > 0.5 ? (-mv.z < uNear ? 2.0 : 1.0) : 0.0;
  vColour = aColour; vWorld = p; vB = aBulb.xy;
}`;

const BULB_FRAG = /* glsl */ `
uniform float uTwinkle, uChase;
varying vec3 vColour;
varying float vOn;
varying vec2 vB;
${LIGHT_GLSL}
void main() {
  if (vOn < 0.5) discard;
  float b = 1.0 - uTwinkle * 0.5 * (1.0 + sin(uTime * (1.3 + vB.x) + vB.x * 40.0));
  if (fract((vB.y - uTime * uChase) / 60.0) < 0.06) b = 1.4;  // a chase running along now and then
  gl_FragColor = vec4(haze(vColour * b, vWorld), 1.0);
}`;

const WIRE_VERT = /* glsl */ `
attribute float aSway;
uniform float uWind, uTime;
varying vec3 vWorld;
void main() {
  vec3 p = position;
  p.x += sin(uTime * uWind + aSway * 6.0) * 0.18 * fract(aSway * 7.0);
  vWorld = p;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`;

const WIRE_FRAG = /* glsl */ `
varying vec3 vWorld;
${LIGHT_GLSL}
void main() { gl_FragColor = vec4(haze(vec3(0.03, 0.025, 0.04), vWorld), 1.0); }`;

interface Built { lines: StringLine[]; group: THREE.Group; on: number }

export class StringLightsView {
  private built = new Map<string, Built>();
  private palette: THREE.Color[];
  private bulbMat: THREE.ShaderMaterial;
  private wireMat: THREE.ShaderMaterial;

  constructor(private scene: THREE.Scene, private game: Game) {
    const L = game.tuning.stringLights;
    this.palette = L.palette.map(h => new THREE.Color(h));
    const shared = { ...LIGHT_UNIFORMS, uWind: { value: game.tuning.canopyShadow.wind * 1.5 } };
    this.bulbMat = new THREE.ShaderMaterial({ vertexShader: BULB_VERT, fragmentShader: BULB_FRAG, uniforms: { ...shared, uNear: { value: 60 }, uTwinkle: { value: L.twinkle }, uChase: { value: L.chaseSpeed } } });
    this.wireMat = new THREE.ShaderMaterial({ vertexShader: WIRE_VERT, fragmentShader: WIRE_FRAG, uniforms: shared });
  }

  /** The lines of one area, and when each bulb switches on (as the party's front passes it). */
  private build(lines: StringLine[], on: (x: number, z: number) => number): THREE.Group {
    const L = this.game.tuning.stringLights, h = L.height, bulbs: number[] = [], cols: number[] = [], data: number[] = [], wire: number[] = [], sway: number[] = [];
    lines.forEach((l, li) => {
      const len = Math.hypot(l.bx - l.ax, l.bz - l.az), n = Math.max(2, Math.round(len / L.bulbSpacing));
      const at = (t: number): [number, number, number] => [l.ax + (l.bx - l.ax) * t, h - L.sag * 4 * t * (1 - t) * (len / 8), l.az + (l.bz - l.az) * t];
      for (let i = 0; i <= 16; i++) { // the wire, as segments of the sag
        const p0 = at(i / 16), p1 = at((i + 1) / 16);
        if (i < 16) { wire.push(...p0, ...p1); sway.push(li + i / 16, li + (i + 1) / 16); }
      }
      for (let i = 1; i < n; i++) {
        const t = i / n, p = at(t), c = this.palette[(l.seed + i) % this.palette.length];
        bulbs.push(...p); cols.push(c.r, c.g, c.b);
        data.push(((l.seed * 13 + i * 7) % 100) / 100, li * 40 + i, on(p[0], p[2]) + i * 0.03, 4 * t * (1 - t));
      }
    });
    const g = new THREE.Group();
    const bg = new THREE.BufferGeometry();
    bg.setAttribute("position", new THREE.Float32BufferAttribute(bulbs, 3));
    bg.setAttribute("aColour", new THREE.Float32BufferAttribute(cols, 3));
    bg.setAttribute("aBulb", new THREE.Float32BufferAttribute(data, 4));
    const wg = new THREE.BufferGeometry();
    wg.setAttribute("position", new THREE.Float32BufferAttribute(wire, 3));
    wg.setAttribute("aSway", new THREE.Float32BufferAttribute(sway, 1));
    g.add(new THREE.LineSegments(wg, this.wireMat), new THREE.Points(bg, this.bulbMat));
    return g;
  }

  /** Build the lights of newly partified areas; return each line's soft light for the light list. */
  update(time: number): ForestLight[] {
    const g = this.game, L = g.tuning.stringLights, lights: ForestLight[] = [];
    if (!L.on) return lights;
    for (const [k, a] of g.party.areas) {
      let b = this.built.get(k);
      if (!b) {
        const lines = stringsFor(g.map, g.forest, a.cell);
        const site = g.map.siteOf(a.cell[0], a.cell[1]), from = a.from ? g.map.siteOf(a.from[0], a.from[1]) : null;
        const ox = from ? (from.x + site.x) / 2 : site.x, oz = from ? (from.z + site.z) / 2 : site.z;
        const reach = from ? Math.hypot(site.x - ox, site.z - oz) * 1.6 : 1;
        const T = g.tuning.party.transition;
        const on = (x: number, z: number) => (a.wave === 0 ? -1 : a.at + Math.min(1, Math.hypot(x - ox, z - oz) / reach) * T);
        b = { lines, group: this.build(lines, on), on: a.wave === 0 ? -1 : a.at };
        this.scene.add(b.group);
        this.built.set(k, b);
      }
      b.lines.forEach((l, i) => {
        const c = this.palette[(l.seed + i) % this.palette.length];
        if (time > b!.on) lights.push({ x: (l.ax + l.bx) / 2, y: L.height - 1, z: (l.az + l.bz) / 2, reach: 10, rgb: new THREE.Vector3(c.r, c.g, c.b), strength: L.glow });
      });
    }
    return lights;
  }

  /** Forget everything (a new game). */
  clear(): void { for (const [, b] of this.built) this.scene.remove(b.group); this.built.clear(); }
}
