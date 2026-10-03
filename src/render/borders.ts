// The sparkling line round the party zone (Ed, 2026-10-03): along the outside edge of the
// partified region (where two partified areas meet, nothing: only the outer perimeter is drawn,
// which reads cleaner than two colours side by side), a thin glowing line of sparks in each area's
// own colour (its creature's sigil neon, which no neighbour shares). The sparks twinkle and a
// shimmer runs along them; on partify the line draws itself in from the side the party came
// from. Glow only (bloom): no light, nothing from the light budget. Where the borders run comes
// from rules/borders.ts, worked out a few milliseconds a frame as areas partify.
import * as THREE from "three";
import { sigilColour } from "../../art/generator.js";
import { borderSteps, type BorderPoint } from "../rules/borders";
import type { Game } from "../rules/game";
import { AREA_TYPES } from "../rules/map";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";

const VERT = /* glsl */ `
attribute vec3 aColour;
attribute vec2 aSpark; // phase, time it switches on
uniform float uTime, uWidth, uSparkle;
varying vec3 vColour;
varying vec3 vWorld;
varying float vB;
void main() {
  vWorld = position;
  float tw = 0.5 + 0.5 * sin(uTime * (2.0 + aSpark.x * 3.0) + aSpark.x * 40.0);
  float run = pow(0.5 + 0.5 * sin((position.x + position.z) * 0.12 - uTime * 2.5), 8.0);
  vB = mix(1.0, 0.45 + 0.55 * tw + run, uSparkle);
  vColour = aColour;
  gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0);
  gl_PointSize = uTime >= aSpark.y ? uWidth : 0.0;
}`;

const FRAG = /* glsl */ `
uniform float uBright;
varying vec3 vColour;
varying vec3 vWorld;
varying float vB;
${LIGHT_GLSL}
void main() { gl_FragColor = vec4(haze(vColour * vB * uBright, vWorld), 1.0); }`;

interface AreaBorder { points: BorderPoint[]; colour: THREE.Color; on: (x: number, z: number) => number; done: boolean }

export class BorderView {
  private areas = new Map<string, AreaBorder>();
  private jobs: { key: string; gen: Generator<void> }[] = [];
  private geo = new THREE.BufferGeometry();
  private stamp = "";
  readonly mesh: THREE.Points;

  constructor(scene: THREE.Scene, private game: Game) {
    const B = game.tuning.borders;
    this.mesh = new THREE.Points(this.geo, new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG,
      uniforms: { ...LIGHT_UNIFORMS, uWidth: { value: B.width }, uSparkle: { value: B.sparkle }, uBright: { value: B.brightness } },
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }));
    this.mesh.frustumCulled = false;
    scene.add(this.mesh);
  }

  update(): void {
    const g = this.game, B = g.tuning.borders;
    if (!B.on) { this.mesh.visible = false; return; }
    // New areas: start working out their borders.
    for (const [k, a] of g.party.areas) {
      if (this.areas.has(k)) continue;
      const site = g.map.siteOf(a.cell[0], a.cell[1]), from = a.from ? g.map.siteOf(a.from[0], a.from[1]) : null;
      const ox = from ? (from.x + site.x) / 2 : site.x, oz = from ? (from.z + site.z) / 2 : site.z, reach = g.map.areaSize * 1.6, T = g.tuning.party.transition;
      const rgb = sigilColour(AREA_TYPES[g.map.typeOf(a.cell[0], a.cell[1])].creature);
      const ab: AreaBorder = { points: [], colour: new THREE.Color(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255), on: (x, z) => (a.wave === 0 ? -1 : a.at + Math.min(1, Math.hypot(x - ox, z - oz) / reach) * T), done: false };
      this.areas.set(k, ab);
      this.jobs.push({ key: k, gen: borderSteps(g.map, a.cell, B.step, ab.points) });
    }
    // A few milliseconds of border-finding a frame.
    const until = performance.now() + 3;
    while (this.jobs.length && performance.now() < until) {
      const j = this.jobs[0];
      if (j.gen.next().done) { this.areas.get(j.key)!.done = true; this.jobs.shift(); }
    }
    // Rebuild the line when an area's border is finished or the zone has grown.
    const stamp = `${g.party.areas.size}|${[...this.areas.values()].filter(a => a.done).length}`;
    if (stamp === this.stamp) return;
    this.stamp = stamp;
    const pos: number[] = [], col: number[] = [], spark: number[] = [];
    for (const [, a] of this.areas) {
      if (!a.done) continue;
      for (const p of a.points) {
        if (p.other !== "edge" && g.party.areas.has(p.other)) continue; // inside the zone: no line
        pos.push(p.x, 0.15, p.z);
        col.push(a.colour.r, a.colour.g, a.colour.b);
        spark.push(((p.x * 12.9898 + p.z * 78.233) % 1 + 1) % 1, a.on(p.x, p.z));
      }
    }
    this.geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    this.geo.setAttribute("aColour", new THREE.Float32BufferAttribute(col, 3));
    this.geo.setAttribute("aSpark", new THREE.Float32BufferAttribute(spark, 2));
  }
}
