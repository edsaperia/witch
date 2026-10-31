// Paths, roads and railways on the ground: each line of the rules' network swept as a flat ribbon
// along its curve, textured with the Art's strip for its kind (u across, v along, repeating), on the
// art's pixel grid and lit like the floor. A path's kind follows the area it runs through (a dirt
// track, then mossy flagstones across a garden...), switching at area borders; roads are overgrown
// tarmac, railways old track, with gaps where the line is broken. Dead ends taper away, and every
// end of a drawn stretch frays out in a dithered fade (Ed, v149).
import * as THREE from "three";
import { freeObjects } from "./free";
import * as Art from "../../art/generator.js";
import type { ForestMap } from "../rules/map";
import { knownPathGeometry, pathGeometrySteps } from "../rules/pathGeometry";
import { hash2 } from "../rules/random";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { runSync, type Steps } from "./slices";
import type { Style } from "./style";

type Kind = { width: number; period: number };
const KINDS = Art.PATH_KINDS as Record<string, Kind>;

const VERT = /* glsl */ `
attribute vec3 uvw; // across (0-1), along (in periods), metres to the nearer end of its stretch
attribute vec2 centre; // the centreline's point across from this corner
varying vec3 vWorld;
varying vec2 vUv;
varying float vEnd;
${HEIGHT_VERT_GLSL}
void main() {
  // On the rolling ground, at its centreline's height: following the land along, level across
  // (height.ts levels the ground under it to the same height).
  vec3 w = position + vec3(0.0, groundH(centre), 0.0);
  vWorld = w;
  vUv = uvw.xy;
  vEnd = uvw.z;
  gl_Position = clipOf(w);
}
`;

const END_FADE = /* glsl */ `
uniform float uPathFade; // metres over which a path's end fades out
varying float vEnd;
float pbayer(vec2 p) {
  int x = int(mod(p.x, 4.0)), y = int(mod(p.y, 4.0));
  int m[16] = int[16](0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5);
  return (float(m[x + y * 4]) + 0.5) / 16.0;
}
float phash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
// Ends fray out (Ed, v149): over the last uPathFade metres pixels drop away in an ordered dither on
// the art's pixel grid, broken up by noise so the end crumbles into the grass, not in a line.
bool pathEndGone(vec2 px) {
  if (uPathFade <= 0.0) return false;
  float n = phash(floor(px / 3.0)) * 0.5 + phash(px) * 0.5;
  float e = clamp(vEnd / uPathFade + (n - 0.5) * 0.45, 0.0, 1.0);
  return pbayer(px) >= e;
}
`;

const FRAG = /* glsl */ `
uniform sampler2D uStrip;
uniform float uPixel;
varying vec3 vWorld;
varying vec2 vUv;
${LIGHT_GLSL}
${END_FADE}
void main() {
  // Sample at the centre of the art pixel this fragment is in, as the floor does, so the path's
  // pixels line up with the ground's.
  vec2 p = (floor(vWorld.xz / uPixel) + 0.5) * uPixel;
  mat2 dw = mat2(dFdx(vWorld.xz), dFdy(vWorld.xz)), du = mat2(dFdx(vUv), dFdy(vUv));
  vec2 uv = vUv;
  if (abs(determinant(dw)) > 1e-9) uv += du * inverse(dw) * (p - vWorld.xz);
  if (uv.x < 0.0 || uv.x > 1.0) discard;
  if (pathEndGone(floor(vWorld.xz / uPixel))) discard;
  vec4 c = texture2D(uStrip, vec2(uv.x, fract(uv.y)));
  if (c.a < 0.5) discard;
  if (c.a < 0.999) { gl_FragColor = vec4(haze(c.rgb, vWorld), sceneryFade(vWorld)); return; } // the magic trail glows
  vec3 light = nightLightShaded(vec3(0.0, 1.0, 0.0), vec3(p.x, 0.0, p.y), 1.0);
  gl_FragColor = vec4(haze(glowPool(min(vec3(1.0), c.rgb * light * 1.25), vec3(p.x, 0.0, p.y)), vWorld), sceneryFade(vWorld));
}
`;

// Water: dark, mirroring the moon as the ponds do, with a ragged bank and ripples drifting downstream.
const WATER = /* glsl */ `
uniform float uPixel;
varying vec3 vWorld;
varying vec2 vUv;
${LIGHT_GLSL}
${END_FADE}
float h21(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
float vn(vec2 p) { vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f); return mix(mix(h21(i), h21(i + vec2(1, 0)), u.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), u.x), u.y); }
void main() {
  vec2 px = floor(vWorld.xz / uPixel), p = (px + 0.5) * uPixel;
  float across = abs(vUv.x * 2.0 - 1.0), bank = 1.0 - 0.35 * vn(vec2(vUv.y * 3.0, vUv.x > 0.5 ? 3.0 : 9.0));
  if (across > bank || pathEndGone(px)) discard;
  vec3 V = normalize(cameraPosition - vec3(p.x, 0.0, p.y));
  vec3 R = reflect(-V, vec3(0.0, 1.0, 0.0));
  vec3 moon = normalize(vec3(uMoonDir.x, uMoonDir.y, -abs(uMoonDir.z)));
  float spec = dot(R, moon) + (vn(px * vec2(0.6, 2.5) + vec2(0.0, uTime * 1.5)) - 0.5) * 0.06;
  vec3 water = vec3(0.015, 0.03, 0.055) * nightLight(vec3(0.0, 1.0, 0.0), vec3(p.x, 0.0, p.y)) * 4.0;
  if (across > bank - 0.12) water = mix(water, vec3(0.05, 0.06, 0.05), 0.6); // the muddy margin
  else if (spec > 0.985) water = vec3(0.92, 0.95, 1.0);
  else if (spec > 0.965) water = vec3(0.45, 0.55, 0.7);
  else if (vn(vec2(vUv.y * 4.0 - uTime * 0.8, vUv.x * 6.0)) > 0.72) water += vec3(0.05, 0.07, 0.1); // ripples
  gl_FragColor = vec4(haze(water, vWorld), sceneryFade(vWorld));
}
`;

/** A map's paths worked out ahead of their meshes (PathView.prep): each strip texture's quads (by kind and variant), the railway
 *  points' patches and each strip's texture, baked. */
export interface PathPrep { quads: Map<string, { pos: number[]; uv: number[]; c: number[] }>; junctions: { pos: number[]; x: number; z: number; canvas: HTMLCanvasElement }[]; strips: Map<string, HTMLCanvasElement> }

export class PathView {
  readonly group = new THREE.Group();

  /** What a map's paths are drawn from, worked out a step at a time (render/slices.ts, View.build's paths): each strip texture's
   *  quads, and the bakes (the railway points' patches, each strip's texture), in the order they were always made. */
  static *prep(map: ForestMap, style: Style): Steps<PathPrep> {
    const net = map.paths, seed = map.seed;
    const { quads } = knownPathGeometry(map) ?? (yield* pathGeometrySteps(map, { kinds: KINDS, byArea: Art.areaPathKinds() as unknown as Record<string, string[]> }));
    const colours = Art.pathColours(style), junctions: PathPrep["junctions"] = [], strips = new Map<string, HTMLCanvasElement>();
    for (const j of net.junctions) {
      yield;
      const sp = Art.railPoints({ variant: Math.floor(hash2(j.line, 1, seed + 835) * 3) }) as { w: number; h: number }, ppm = Art.PATH_PPM as number;
      const W = sp.w / ppm, H = sp.h / ppm, o = KINDS.railway.width / 2; // the straight's start and centreline, metres into the patch
      const nx = j.side > 0 ? -j.dz : j.dz, nz = j.side > 0 ? j.dx : -j.dx;
      const at = (u: number, v: number) => [j.x + j.dx * (u - o) + nx * (v - o), 0.03, j.z + j.dz * (u - o) + nz * (v - o)];
      const pos = [at(0, 0), at(W, 0), at(W, H), at(0, 0), at(W, H), at(0, H)].flat();
      junctions.push({ pos, x: j.x, z: j.z, canvas: (Art.bake(sp, colours, style, "none") as { A: HTMLCanvasElement }).A });
    }
    for (const key of quads.keys()) {
      const [kind, variant] = key.split(":");
      if (kind === "stream") continue;
      yield;
      strips.set(key, (Art.bake(Art.pathTextures(kind, { variant: +variant }).strip, colours, style, "none") as { A: HTMLCanvasElement }).A);
    }
    return { quads, junctions, strips };
  }

  constructor(map: ForestMap, style: Style, mpp: number, fade = 6, made: PathPrep = runSync(PathView.prep(map, style))) {
    const { quads, junctions, strips } = made;
    // The points where a branch line leaves a railway: the art's ground patch (a straight track
    // and one curving off it), laid along the main line, curving to the branch's side.
    for (const j of junctions) {
      const pos = j.pos;
      const uv = [0, 0, 1e3, 1, 0, 1e3, 1, 1, 1e3, 0, 0, 1e3, 1, 1, 1e3, 0, 1, 1e3];
      const t = new THREE.CanvasTexture(j.canvas);
      t.magFilter = t.minFilter = THREE.NearestFilter; t.generateMipmaps = false; t.flipY = false; t.colorSpace = THREE.NoColorSpace;
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
      g.setAttribute("uvw", new THREE.Float32BufferAttribute(uv, 3));
      g.setAttribute("centre", new THREE.Float32BufferAttribute(Array.from({ length: 6 }, () => [j.x, j.z]).flat(), 2)); // the points' patch: level, at the junction
      const mesh = new THREE.Mesh(g, new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -6, uniforms: { ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS, uStrip: { value: t }, uPixel: { value: mpp }, uPathFade: { value: fade } } }));
      mesh.renderOrder = 0.55; // over the track's own strip
      this.group.add(mesh);
    }
    for (const [key, q] of quads) {
      const [kind] = key.split(":");
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(q.pos, 3));
      g.setAttribute("uvw", new THREE.Float32BufferAttribute(q.uv, 3));
      g.setAttribute("centre", new THREE.Float32BufferAttribute(q.c, 2));
      if (kind === "stream") {
        const m = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: WATER, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2, uniforms: { ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS, uPixel: { value: mpp }, uPathFade: { value: fade } } });
        const mesh = new THREE.Mesh(g, m);
        mesh.frustumCulled = false; mesh.renderOrder = 0.4; // under the paths that ford it
        this.group.add(mesh);
        continue;
      }
      const t = new THREE.CanvasTexture(strips.get(key)!);
      t.magFilter = t.minFilter = THREE.NearestFilter; t.generateMipmaps = false; t.flipY = false;
      t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.NoColorSpace;
      const m = new THREE.ShaderMaterial({
        vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false,
        polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -4,
        uniforms: { ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS, uStrip: { value: t }, uPixel: { value: mpp }, uPathFade: { value: fade } },
      });
      const mesh = new THREE.Mesh(g, m);
      mesh.frustumCulled = false; // one mesh spans the map; the haze and the scenery fade see to distance
      mesh.renderOrder = 0.5;     // on the floor, under the contact shadows
      this.group.add(mesh);
    }
  }

  /** Let go of its meshes' geometries and materials and the strips' textures. */
  dispose(): void {
    for (const o of this.group.children) ((o as THREE.Mesh).material as THREE.ShaderMaterial).uniforms.uStrip?.value?.dispose();
    freeObjects([this.group]);
  }
}
