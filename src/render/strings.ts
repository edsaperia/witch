// String lights in the party zone: for each partified area, its lines (rules/strings.ts) drawn as a
// thin dark wire hanging in a sag between two trunks, with bulbs every bulbSpacing metres:
// single glowing pixels (two when near) cycling through a party palette, twinkling, now and then a
// chase running along, swaying with the wind. Each bulb switches on as the party's front passes.
// Also the party's motes: glowing specks drifting up round each partified area's soundsystem, twinkling in its neon.
import * as THREE from "three";
import type { Game } from "../rules/game";
import { stringsFor, type StringLine } from "../rules/strings";
import { garlandPoint } from "../rules/crown";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";
import { SPRITE_UNIFORMS } from "./sprites";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { areaNeons } from "../rules/partyDressing";
import { partyZones } from "../rules/party";
import { NEON } from "../../art/sigils.js";
import { CLEAR_GLSL, SHARED_GLSL, type CrownView } from "./crown";

const BULB_VERT = /* glsl */ `
attribute vec3 aColour;
attribute vec4 aBulb; // phase, index along the line, time it switches on, sway (0 at the ends)
uniform float uWind, uNear, uTime;
uniform vec2 uRes;
varying vec3 vColour;
varying vec3 vWorld;
varying float vOn;
varying vec2 vB;
${HEIGHT_VERT_GLSL}
void main() {
  vec3 p = position;
  p.x += sin(uTime * uWind + aBulb.x * 6.0) * 0.18 * aBulb.w;
  p.z += cos(uTime * uWind * 0.8 + aBulb.x * 4.0) * 0.1 * aBulb.w;
  p = onGround(p); // hung over the rolling ground
  vec4 mv = viewMatrix * vec4(bendW(p), 1.0);
  gl_Position = projectionMatrix * mv;
  vOn = uTime >= aBulb.z ? 1.0 : 0.0;
  float size = vOn > 0.5 ? (-mv.z < uNear ? 2.0 : 1.0) : 0.0;
  size *= overBend(p); // from the treetops they glimmer through the canopy, never through the earth
  gl_PointSize = size;
  // On the pixel grid, so each bulb is a whole square, never a broken fragment.
  vec2 px = (gl_Position.xy / gl_Position.w * 0.5 + 0.5) * uRes;
  px = size > 1.5 ? floor(px + 0.5) : floor(px) + 0.5;
  gl_Position.xy = (px / uRes * 2.0 - 1.0) * gl_Position.w;
  vColour = aColour; vWorld = p; vB = aBulb.xy;
}`;

const BULB_FRAG = /* glsl */ `
uniform float uTwinkle, uChase;
varying vec3 vColour;
varying vec3 vWorld;
varying float vOn;
varying vec2 vB;
${LIGHT_GLSL}
void main() {
  if (vOn < 0.5 || sceneryFade(vWorld) < 0.5) discard; // scenery: gone past the scenery budget's edge
  if (partyOff(vWorld) > fract(vB.x * 7.31 + vB.y * 0.37)) discard; // the party's over: bulb by bulb out as the front passes
  float b = 1.0 - uTwinkle * 0.5 * (1.0 + sin(uTime * (1.3 + vB.x) + vB.x * 40.0));
  if (fract((vB.y - uTime * uChase) / 60.0) < 0.06) b = 1.4;  // a chase running along now and then
  gl_FragColor = vec4(haze(vColour * b * 1.6, vWorld), 1.0); // bright enough to bloom
}`;

const WIRE_VERT = /* glsl */ `
attribute float aSway;
uniform float uWind, uTime;
varying vec3 vWorld;
${HEIGHT_VERT_GLSL}
void main() {
  vec3 p = position;
  p.x += sin(uTime * uWind + aSway * 6.0) * 0.18 * fract(aSway * 7.0);
  p = onGround(p);
  vWorld = p;
  gl_Position = clipOf(p);
}`;

const WIRE_FRAG = /* glsl */ `
varying vec3 vWorld;
${LIGHT_GLSL}
void main() {
  if (sceneryFade(vWorld) < 0.5) discard;
  gl_FragColor = vec4(haze(vec3(0.03, 0.025, 0.04), vWorld), 1.0);
}`;

// The great oak's crown's lights (render/crown.ts; Ed, 2026-10-24: "strewn with colourful string lights, which switch on when the
// party starts and switch off when it finishes"): the same bulbs and wire, from a second source of lines, the crown's (rules/crown.ts
// strings: swags under its limbs, strings draped from clump to clump, garlands round them, a ring round the Terrace's gap), laid by
// the crown's own map (in the world, or over the floors indoors) and cut away with it where it clears. Each string switches on
// running along from its start when the party starts at the decks (uOnAt: the party spell's time, aBulb.z each bulb's delay).
const CROWN_BULB_VERT = /* glsl */ `
attribute vec3 aColour;
attribute vec4 aBulb; // phase, index along the line, its delay after the party starts, sway (0 at the ends)
uniform float uWind, uNear, uTime, uOnAt;
uniform vec2 uRes;
uniform vec3 uRight, uUp;
varying vec3 vColour;
varying vec3 vWorld;
varying float vOn, vDepth;
varying vec2 vB, vFloor;
${SHARED_GLSL}
${HEIGHT_VERT_GLSL}
void main() {
  vec3 p = mapPlan(position);
  p.x += sin(uTime * uWind + aBulb.x * 6.0) * 0.18 * aBulb.w;
  vec3 q = p - uMapO;
  vFloor = vec2(dot(q, uRight) / max(1e-4, dot(uMapX, uRight)), dot(q, uUp) / min(-1e-4, dot(uMapZ, uUp)));
  vec4 mv = viewMatrix * vec4(uBendOn > 0.5 ? bendW(p) : p, 1.0);
  vDepth = -mv.z;
  gl_Position = projectionMatrix * mv;
  vOn = uTime >= uOnAt + aBulb.z ? 1.0 : 0.0;
  float size = vOn > 0.5 ? (-mv.z < uNear ? 2.0 : 1.0) : 0.0;
  if (uBendOn > 0.5) size *= overBend(p);
  gl_PointSize = size;
  vec2 px = (gl_Position.xy / gl_Position.w * 0.5 + 0.5) * uRes;
  px = size > 1.5 ? floor(px + 0.5) : floor(px) + 0.5;
  gl_Position.xy = (px / uRes * 2.0 - 1.0) * gl_Position.w;
  vColour = aColour; vWorld = p; vB = aBulb.xy;
}`;
const CROWN_BULB_FRAG = /* glsl */ `
uniform float uTwinkle, uChase;
varying vec3 vColour;
varying vec3 vWorld;
varying float vOn, vDepth;
varying vec2 vB, vFloor;
${LIGHT_GLSL}
${CLEAR_GLSL}
void main() {
  if (vOn < 0.5 || cleared(vFloor, vDepth)) discard;
  if (partyOff(vWorld) > fract(vB.x * 7.31 + vB.y * 0.37)) discard; // the party's over: bulb by bulb out as the front passes
  float b = 1.0 - uTwinkle * 0.5 * (1.0 + sin(uTime * (1.3 + vB.x) + vB.x * 40.0));
  if (fract((vB.y - uTime * uChase) / 60.0) < 0.06) b = 1.4;
  gl_FragColor = vec4(crownHaze(vColour * b * 1.6, vWorld), 1.0);
}`;
const CROWN_WIRE_VERT = /* glsl */ `
varying vec3 vWorld;
varying vec2 vFloor;
varying float vDepth;
uniform vec3 uRight, uUp;
${SHARED_GLSL}
${HEIGHT_VERT_GLSL}
void main() {
  vec3 p = mapPlan(position);
  vWorld = p;
  vec3 q = p - uMapO;
  vFloor = vec2(dot(q, uRight) / max(1e-4, dot(uMapX, uRight)), dot(q, uUp) / min(-1e-4, dot(uMapZ, uUp)));
  vec4 mv = viewMatrix * vec4(uBendOn > 0.5 ? bendW(p) : p, 1.0);
  vDepth = -mv.z;
  gl_Position = projectionMatrix * mv;
}`;
const CROWN_WIRE_FRAG = /* glsl */ `
varying vec3 vWorld;
varying vec2 vFloor;
varying float vDepth;
${LIGHT_GLSL}
${CLEAR_GLSL}
void main() {
  if (cleared(vFloor, vDepth)) discard;
  gl_FragColor = vec4(crownHaze(vec3(0.03, 0.025, 0.04), vWorld), 1.0);
}`;

const MOTE_VERT = /* glsl */ `
attribute vec4 aMote; // phase, rise speed, drift, time it appears
attribute vec3 aColour; // its area's neon
uniform float uTime, uRise;
varying vec3 vWorld, vColour;
varying float vA, vTw;
${HEIGHT_VERT_GLSL}
void main() {
  float t = uTime + aMote.x * 20.0, y = mod(t * aMote.y + aMote.x * uRise, uRise), k = y / uRise;
  vec3 p = onGround(position) + vec3(sin(t * 0.7 + aMote.x * 9.0) * aMote.z, y, cos(t * 0.5 + aMote.x * 5.0) * aMote.z);
  vWorld = p;
  vA = (uTime >= aMote.w ? 1.0 : 0.0) * smoothstep(0.0, 0.15, k) * (1.0 - smoothstep(0.7, 1.0, k));
  // Twinkling (Ed, 2026-10-10): each its own rate, mostly dim with a sharp sparkle now and then.
  vTw = 0.25 + 1.5 * pow(0.5 + 0.5 * sin(uTime * (2.0 + 5.0 * fract(aMote.x * 7.31)) + aMote.x * 40.0), 6.0);
  vColour = aColour;
  vec4 mv = viewMatrix * vec4(bendW(p), 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = vA > 0.3 ? 1.0 : 0.0;
}`;

const MOTE_FRAG = /* glsl */ `
varying float vA, vTw;
varying vec3 vWorld, vColour;
${LIGHT_GLSL}
void main() {
  float po = partyOff(vWorld); // (the party's over: they fade as the front passes)
  if (vA < 0.3 || po > 0.95) discard;
  gl_FragColor = vec4(haze(vColour * (0.6 + 0.6 * vA) * vTw * (1.0 - po), vWorld), 1.0);
}`;

interface Built { lines: StringLine[]; group: THREE.Group; on: number }

export class StringLightsView {
  private built = new Map<string, Built>();
  /** The next waves' areas whose forest is made ahead (update). */
  private warmed = new Set<string>();
  private palette: THREE.Color[];
  private bulbMat: THREE.ShaderMaterial;
  private wireMat: THREE.ShaderMaterial;
  private moteMat: THREE.ShaderMaterial;

  /** The crown's lights (setCrown), and how long each string takes to light from its start to its end (s). */
  private crown: { view: CrownView; bulbs: THREE.Points; wire: THREE.LineSegments } | null = null;
  private static readonly CROWN_RUN = 3;

  constructor(private scene: THREE.Scene, private game: Game) {
    const L = game.tuning.stringLights;
    this.palette = L.palette.map(h => new THREE.Color(h));
    const shared = { ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS, uWind: { value: game.tuning.canopyShadow.wind * 1.5 } };
    this.bulbMat = new THREE.ShaderMaterial({ vertexShader: BULB_VERT, fragmentShader: BULB_FRAG, uniforms: { ...shared, uRes: SPRITE_UNIFORMS.uRes, uNear: { value: 240 }, uTwinkle: { value: L.twinkle }, uChase: { value: L.chaseSpeed } } });
    this.wireMat = new THREE.ShaderMaterial({ vertexShader: WIRE_VERT, fragmentShader: WIRE_FRAG, uniforms: shared });
    this.moteMat = new THREE.ShaderMaterial({ vertexShader: MOTE_VERT, fragmentShader: MOTE_FRAG, uniforms: { ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS, uRise: { value: game.tuning.party.motes.to - game.tuning.party.motes.from } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  }

  /** The lines of one area, and when each bulb switches on (as the party's front passes it). */
  private build(lines: StringLine[], on: (x: number, z: number) => number, centre: { x: number; z: number }, seed: number, cell: readonly [number, number]): THREE.Group {
    const L = this.game.tuning.stringLights, h = L.height, own = L.mode === "areaNeon" ? new THREE.Color(`rgb(${(NEON as Record<string, number[]>)[areaNeons(this.game.map, cell as [number, number])[0]].join(",")})`) : null, bulbs: number[] = [], cols: number[] = [], data: number[] = [], wire: number[] = [], sway: number[] = [];
    // (each line hung its own way, from its seed: its two ends at their own heights, its own sag and bulb spacing, and now and then a
    // strand let hang off its end; Ed, 2026-10-27, of the crown's: "String lights on the treehouse seem to all have the same shape")
    const rnd = (sd: number, k: number) => { const x = Math.sin(sd * 12.9898 + k * 78.233) * 43758.5453; return x - Math.floor(x); };
    lines.forEach((l, li) => {
      const ha = h + (rnd(l.seed, 1) - 0.5) * 2.4, hb = h + (rnd(l.seed, 2) - 0.5) * 2.4, sag = L.sag * (0.5 + 1.2 * rnd(l.seed, 3)), gap = L.bulbSpacing * (0.75 + 0.6 * rnd(l.seed, 4));
      const len = Math.hypot(l.bx - l.ax, l.bz - l.az), n = Math.max(2, Math.round(len / gap));
      const at = (t: number): [number, number, number] => [l.ax + (l.bx - l.ax) * t, ha + (hb - ha) * t - sag * 4 * t * (1 - t) * (len / 8), l.az + (l.bz - l.az) * t];
      for (let i = 0; i <= 16; i++) { // the wire, as segments of the sag
        const p0 = at(i / 16), p1 = at((i + 1) / 16);
        if (i < 16) { wire.push(...p0, ...p1); sway.push(li + i / 16, li + (i + 1) / 16); }
      }
      const bulb = (p: [number, number, number], i: number, t: number) => {
        const c = own ? ((l.seed + i) % 3 === 2 ? own : this.palette[0]) : this.palette[(l.seed + i) % this.palette.length];
        bulbs.push(...p); cols.push(c.r, c.g, c.b);
        data.push(((l.seed * 13 + i * 7) % 100) / 100, li * 40 + i, on(p[0], p[2]) + i * 0.03, 4 * t * (1 - t));
      };
      for (let i = 1; i < n; i++) bulb(at(i / n), i, i / n);
      if (rnd(l.seed, 5) < 0.2) { // (a tail: 1.5 to 4 m let hang off its far end)
        const e = at(1), T = 1.5 + 2.5 * rnd(l.seed, 6), k = Math.max(2, Math.round(T / gap));
        wire.push(...e, e[0], e[1] - T, e[2]); sway.push(li + 1, li + 1);
        for (let j = 1; j <= k; j++) bulb([e[0], e[1] - (T * j) / k, e[2]], n + j, 0.5);
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
    // Party motes, sparse over the whole area (Ed, 2026-10-03), rising from just under the crowns
    // to above them: from the treetops a partified area isn't plain dark forest. They come on as
    // the party's front passes.
    // In the area's own neon, twinkling (Ed, 2026-10-10: "Make the rising motes in party areas twinkle and be the area colour").
    const M = this.game.tuning.party.motes, map = this.game.map, mp: number[] = [], md: number[] = [], mc: number[] = [];
    const neon = (NEON as Record<string, number[]>)[areaNeons(map, cell as [number, number])[0]] ?? [255, 217, 255];
    const R = map.areaSize * 1.1, n = Math.round(((Math.PI * R * R) / 400) * M.perPatch);
    for (let i = 0; i < n; i++) {
      const h = (k: number) => { const v = Math.sin(seed * 12.9898 + i * 78.233 + k * 37.719) * 43758.5453; return v - Math.floor(v); };
      const a = h(1) * Math.PI * 2, d = Math.sqrt(h(2)) * R, x = centre.x + Math.cos(a) * d, z = centre.z + Math.sin(a) * d;
      const c = map.areaAt(x, z).cell;
      if (c[0] !== cell[0] || c[1] !== cell[1]) continue;
      mp.push(x, M.from, z); md.push(h(3), M.speed * (0.6 + h(4) * 0.8), 0.3 + h(5) * 0.8, on(x, z)); mc.push(neon[0] / 255, neon[1] / 255, neon[2] / 255);
    }
    const mg = new THREE.BufferGeometry();
    mg.setAttribute("position", new THREE.Float32BufferAttribute(mp, 3));
    mg.setAttribute("aMote", new THREE.Float32BufferAttribute(md, 4));
    mg.setAttribute("aColour", new THREE.Float32BufferAttribute(mc, 3));
    const motes = new THREE.Points(mg, this.moteMat);
    motes.frustumCulled = false;
    g.add(motes);
    g.traverse(o => { o.frustumCulled = false; });
    return g;
  }

  /** Build the lights of newly partified areas, a couple per frame so a big wave doesn't stall. */
  update(): void {
    const g = this.game, L = g.tuning.stringLights;
    this.updateCrown();
    if (!L.on) return;
    // From the treetops the bulbs hang under the canopy: let them glimmer through it as specks.
    this.bulbMat.depthTest = g.witch.lift < 0.5;
    let builds = 0;
    for (const [k, a] of partyZones(g.party, g.map)) { // (a legend area's lights with its pair's: they partify together)
      let b = this.built.get(k);
      if (!b) {
        if (builds++ >= 2) break;
        const lines = stringsFor(g.map, g.forest, a.cell);
        const site = g.map.siteOf(a.cell[0], a.cell[1]), from = a.from ? g.map.siteOf(a.from[0], a.from[1]) : null;
        const ox = from ? (from.x + site.x) / 2 : site.x, oz = from ? (from.z + site.z) / 2 : site.z;
        const reach = from ? Math.hypot(site.x - ox, site.z - oz) * 1.6 : 1;
        const T = g.tuning.party.transition;
        const on = (x: number, z: number) => (a.wave === 0 ? -1 : a.at + Math.min(1, Math.hypot(x - ox, z - oz) / reach) * T);
        b = { lines, group: this.build(lines, on, site, a.cell[0] * 131 + a.cell[1] * 17 + g.seed, a.cell), on: a.wave === 0 ? -1 : a.at };
        this.scene.add(b.group);
        this.built.set(k, b);
      }
    }
    // The next wave's areas' forest made ahead, about a millisecond a frame while nothing's being built: their lines need
    // its trees, and making them on the wave's own frame was most of a 65 ms stall there (the wave 4 hitch bench).
    // (Each area once: asking again would undo the forest's note that the window round her is done.)
    if (!builds) for (const c of g.party.next) {
      const k = `${c[0]},${c[1]}`;
      if (this.built.has(k) || this.warmed.has(k)) continue;
      const s = g.map.siteOf(c[0], c[1]);
      if (g.forest.prefetch(s.x, s.z, g.map.areaSize * 1.3, 1) > 0) break;
      this.warmed.add(k);
    }
  }

  /** The great oak's crown's lights, a second source of lines (render/crown.ts), or none. */
  setCrown(view: CrownView | null): void {
    if (this.crown) { this.scene.remove(this.crown.bulbs, this.crown.wire); for (const o of [this.crown.bulbs, this.crown.wire]) { o.geometry.dispose(); (o.material as THREE.Material).dispose(); } this.crown = null; }
    if (!view) return;
    const L = this.game.tuning.stringLights, pos: number[] = [], cols: number[] = [], data: number[] = [], wire: number[] = [];
    for (const b of view.bulbs) {
      const c = this.palette[b.colour % this.palette.length];
      pos.push(b.x, b.y, b.z); cols.push(c.r, c.g, c.b); data.push(b.phase, b.string * 40 + b.u * 60, b.u * StringLightsView.CROWN_RUN, 4 * b.u * (1 - b.u));
    }
    // (the wires: each span's sag in eight pieces, each garland round its clump)
    const hung = new Set(view.bulbs.map(b => b.string));
    for (const [si, s] of view.crown.strings.entries()) {
      if (!hung.has(si)) continue;
      if (s.kind === "garland") { const n = Math.max(8, Math.round(24 * (s.arc ?? 1))); for (let i = 0; i < n; i++) wire.push(...garlandPoint(s, i / n), ...garlandPoint(s, (i + 1) / n)); continue; }
      for (const p of s.spans) { const at = (u: number) => [p.a[0] + (p.b[0] - p.a[0]) * u, p.a[1] + (p.b[1] - p.a[1]) * u - p.sag * 4 * u * (1 - u), p.a[2] + (p.b[2] - p.a[2]) * u]; for (let i = 0; i < 8; i++) wire.push(...at(i / 8), ...at((i + 1) / 8)); }
    }
    const U = view.uniforms, shared = { ...U, uWind: { value: this.game.tuning.canopyShadow.wind * 1.5 }, uRes: SPRITE_UNIFORMS.uRes };
    const bulbMat = new THREE.ShaderMaterial({ vertexShader: CROWN_BULB_VERT, fragmentShader: CROWN_BULB_FRAG, uniforms: { ...shared, uNear: { value: 240 }, uTwinkle: { value: L.twinkle }, uChase: { value: L.chaseSpeed }, uOnAt: { value: 1e9 } } });
    const wireMat = new THREE.ShaderMaterial({ vertexShader: CROWN_WIRE_VERT, fragmentShader: CROWN_WIRE_FRAG, uniforms: shared });
    const bg = new THREE.BufferGeometry();
    bg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); bg.setAttribute("aColour", new THREE.Float32BufferAttribute(cols, 3)); bg.setAttribute("aBulb", new THREE.Float32BufferAttribute(data, 4));
    const wg = new THREE.BufferGeometry(); wg.setAttribute("position", new THREE.Float32BufferAttribute(wire, 3));
    const bulbs = new THREE.Points(bg, bulbMat), wireL = new THREE.LineSegments(wg, wireMat);
    for (const o of [bulbs, wireL]) { o.frustumCulled = false; o.name = "crown"; }
    this.scene.add(wireL, bulbs);
    this.crown = { view, bulbs, wire: wireL };
  }
  /** The crown's lights' meshes (for the house's layer indoors: render/view.ts). */
  get crownMeshes(): THREE.Object3D[] { return this.crown ? [this.crown.wire, this.crown.bulbs] : []; }
  /** A frame of the crown's lights: lit from the party spell's time (before it, off; a game without the spell, from the start),
   *  drawn as the crown is, in the world or over the floors. */
  private updateCrown(): void {
    const C = this.crown; if (!C) return;
    const at = this.game.party.spellAt, indoors = C.view.indoors;
    (C.bulbs.material as THREE.ShaderMaterial).uniforms.uOnAt.value = at === null ? 1e9 : at === undefined ? -1e9 : at;
    for (const o of [C.bulbs, C.wire]) { const m = o.material as THREE.ShaderMaterial; m.depthTest = !indoors; m.transparent = indoors; o.renderOrder = indoors ? 19.98 : 0.6; }
  }

  /** Forget everything (a new game): each area's lines taken out and their geometry let go (the materials are shared, kept). */
  clear(): void {
    for (const [, b] of this.built) { this.scene.remove(b.group); b.group.traverse(o => (o as THREE.Mesh).geometry?.dispose()); }
    this.built.clear(); this.warmed.clear();
  }

  /** Another night's game (View.setGame): the last one's lines gone. */
  setGame(game: Game): void { this.clear(); this.game = game; }
}
