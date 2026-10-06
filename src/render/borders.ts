// The sparkling line round the party zone (Ed, 2026-10-03): along the outside edge of the
// partified region (where two partified areas meet, nothing: only the outer perimeter is drawn,
// which reads cleaner than two colours side by side), a thin glowing line of sparks in each area's
// own colour (its creature's sigil neon, which no neighbour shares). Each spark also carries the
// colour of the area across the edge and flickers between the two on its own phase, some of them
// snapping on the beat (Ed, v183), so the line shimmers in both; they twinkle like stars, brief
// flashes and dips, now and then going out for a moment, and a shimmer runs along them; on partify the line draws itself in from the side the party came
// from. Glow only (bloom): no light, nothing from the light budget. Where the borders run comes
// from rules/borders.ts, worked out a few milliseconds a frame as areas partify.
import { beatTime } from "../rules/beat";
import * as THREE from "three";
import { sigilColour } from "../../art/generator.js";
import { borderSteps, type BorderPoint } from "../rules/borders";
import type { Game } from "../rules/game";
import { AREA_TYPES } from "../rules/map";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";

const VERT = /* glsl */ `
attribute vec3 aColour;
attribute vec3 aColour2; // the area across the edge
attribute vec2 aSpark; // phase, time it switches on
uniform float uTime, uWidth, uSparkle, uBeat;
uniform vec3 uTwinkle; // twinkle (0 steady to 1 star-like), swapRate (swaps a second), swapBeat (share that snap on the beat)
varying vec3 vColour;
varying vec3 vWorld;
varying float vB;
float h1(float x) { return fract(sin(x * 91.3458) * 47453.5453); }
${HEIGHT_VERT_GLSL}
void main() {
  vec3 w = onGround(position); // along the rolling ground
  vWorld = w;
  float ph = aSpark.x;
  // Twinkle: a soft breathing, sharp brief flashes, and now and then a moment out altogether.
  float soft = 0.5 + 0.5 * sin(uTime * (2.0 + ph * 3.0) + ph * 40.0);
  float slot = floor(uTime * (1.5 + ph * 2.5) + ph * 17.0), k = fract(uTime * (1.5 + ph * 2.5) + ph * 17.0);
  float flash = h1(slot + ph * 13.0) > 0.72 ? pow(1.0 - k, 6.0) * 2.2 : 0.0;
  float out_ = h1(slot * 1.7 + ph * 29.0) < 0.12 * uTwinkle.x ? 0.0 : 1.0;
  float run = pow(0.5 + 0.5 * sin((position.x + position.z) * 0.12 - uTime * 2.5), 8.0);
  float tw = mix(0.45 + 0.55 * soft, (0.35 + 0.4 * soft + flash) * out_, uTwinkle.x);
  vB = mix(1.0, tw + run, uSparkle);
  // Its colour: its own area's or the one across, flickering between them on its own phase; some snap on the beat.
  float swap = h1(ph * 7.0) < uTwinkle.z ? mod(floor(uBeat + ph * 4.0), 2.0) : step(0.5, fract(uTime * uTwinkle.y * (0.6 + ph * 0.8) + ph * 3.0));
  vColour = mix(aColour, aColour2, swap);
  gl_Position = clipOf(w);
  gl_PointSize = uTime >= aSpark.y ? uWidth : 0.0;
}`;

const FRAG = /* glsl */ `
uniform float uBright;
varying vec3 vColour;
varying vec3 vWorld;
varying float vB;
${LIGHT_GLSL}
void main() { float po = partyOff(vWorld); if (po > 0.98) discard; gl_FragColor = vec4(haze(vColour * vB * uBright * (1.0 - po), vWorld), 1.0); } // (the party's over: out as the front passes)`;

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
      uniforms: { ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS, uWidth: { value: B.width }, uSparkle: { value: B.sparkle }, uBright: { value: B.brightness }, uBeat: { value: 0 }, uTwinkle: { value: new THREE.Vector3(B.twinkle, B.swapRate, B.swapBeat) } },
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }));
    this.mesh.frustumCulled = false;
    scene.add(this.mesh);
  }

  update(): void {
    const g = this.game, B = g.tuning.borders;
    if (!B.on) { this.mesh.visible = false; return; }
    (this.mesh.material as THREE.ShaderMaterial).uniforms.uBeat.value = (beatTime(g.beat, g.clock.time) * g.tuning.beat.bpm) / 60;
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
    const pos: number[] = [], col: number[] = [], col2: number[] = [], spark: number[] = [];
    const across = new Map<string, number[]>(), colourOf = (k: string) => {
      let c = across.get(k);
      if (!c) { const [cx, cy] = k.split(",").map(Number); c = (sigilColour(AREA_TYPES[g.map.typeOf(cx, cy)].creature) as number[]).map(v => v / 255); across.set(k, c); }
      return c;
    };
    for (const [, a] of this.areas) {
      if (!a.done) continue;
      for (const p of a.points) {
        if (p.other !== "edge" && g.party.areas.has(p.other)) continue; // inside the zone: no line
        pos.push(p.x, 0.15, p.z);
        col.push(a.colour.r, a.colour.g, a.colour.b);
        col2.push(...(p.other === "edge" ? [a.colour.r, a.colour.g, a.colour.b] : colourOf(p.other)));
        spark.push(((p.x * 12.9898 + p.z * 78.233) % 1 + 1) % 1, a.on(p.x, p.z));
      }
    }
    this.geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    this.geo.setAttribute("aColour", new THREE.Float32BufferAttribute(col, 3));
    this.geo.setAttribute("aColour2", new THREE.Float32BufferAttribute(col2, 3));
    this.geo.setAttribute("aSpark", new THREE.Float32BufferAttribute(spark, 2));
  }
}
