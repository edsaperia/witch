// Paths, roads and railways on the ground: each line of the rules' network swept as a flat ribbon
// along its curve, textured with the Art's strip for its kind (u across, v along, repeating), on the
// art's pixel grid and lit like the floor. A path's kind follows the area it runs through (a dirt
// track, then mossy flagstones across a garden...), switching at area borders; roads are overgrown
// tarmac, railways old track, with gaps where the line is broken. Dead ends taper away.
import * as THREE from "three";
import * as Art from "../../art/generator.js";
import type { ForestMap } from "../rules/map";
import { AREA_TYPES } from "../rules/map";
import { hash2 } from "../rules/random";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";
import type { Style } from "./style";

type Kind = { width: number; period: number };
const KINDS = Art.PATH_KINDS as Record<string, Kind>;
const NOT_PATHS = new Set(["tarmac", "railway", "stairs", "bridges"]);

const VERT = /* glsl */ `
attribute vec2 uvw;
varying vec3 vWorld;
varying vec2 vUv;
void main() {
  vWorld = position;
  vUv = uvw;
  gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0);
}
`;

const FRAG = /* glsl */ `
uniform sampler2D uStrip;
uniform float uPixel;
varying vec3 vWorld;
varying vec2 vUv;
${LIGHT_GLSL}
void main() {
  // Sample at the centre of the art pixel this fragment is in, as the floor does, so the path's
  // pixels line up with the ground's.
  vec2 p = (floor(vWorld.xz / uPixel) + 0.5) * uPixel;
  mat2 dw = mat2(dFdx(vWorld.xz), dFdy(vWorld.xz)), du = mat2(dFdx(vUv), dFdy(vUv));
  vec2 uv = vUv;
  if (abs(determinant(dw)) > 1e-9) uv += du * inverse(dw) * (p - vWorld.xz);
  if (uv.x < 0.0 || uv.x > 1.0) discard;
  vec4 c = texture2D(uStrip, vec2(uv.x, fract(uv.y)));
  if (c.a < 0.5) discard;
  if (c.a < 0.999) { gl_FragColor = vec4(haze(c.rgb, vWorld), sceneryFade(vWorld)); return; } // the magic trail glows
  vec3 light = nightLightShaded(vec3(0.0, 1.0, 0.0), vec3(p.x, 0.0, p.y), 1.0);
  gl_FragColor = vec4(haze(min(vec3(1.0), c.rgb * light * 1.25), vWorld), sceneryFade(vWorld));
}
`;

export class PathView {
  readonly group = new THREE.Group();

  constructor(map: ForestMap, style: Style, mpp: number) {
    const net = map.paths, seed = map.seed;
    const byArea = Art.areaPathKinds() as unknown as Record<string, string[]>;
    // A path's kind in each area: one of the kinds that area suits, seeded per area; dirt where none.
    const areaKind = new Map<string, string>();
    const pathKind = (x: number, z: number) => {
      const a = map.areaAt(x, z), key = a.cell.join(",");
      let k = areaKind.get(key);
      if (!k) {
        const ok = (byArea[AREA_TYPES[a.type].id] ?? []).filter(k => !NOT_PATHS.has(k) && KINDS[k] && (k !== "magic" || hash2(a.cell[0], a.cell[1], seed + 831) < 0.15));
        k = ok.length ? ok[Math.floor(hash2(a.cell[0], a.cell[1], seed + 833) * ok.length)] : "dirt";
        areaKind.set(key, k);
      }
      return k;
    };
    // One geometry per strip texture (kind and variant), each quad its own so a kind can switch mid-line.
    const quads = new Map<string, { pos: number[]; uv: number[] }>();
    net.lines.forEach((l, li) => {
      const variant = l.kind === "rail" ? Math.floor(hash2(li, 1, seed + 835) * 3) : 0;
      const pts = l.pts, n = pts.length;
      // Distance along the line, and a mitred normal at each point (so neighbouring quads meet).
      const along = [0];
      for (let i = 1; i < n; i++) along.push(along[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
      const nrm = pts.map((_, i) => {
        const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)], dx = b[0] - a[0], dz = b[1] - a[1], d = Math.hypot(dx, dz) || 1;
        return [-dz / d, dx / d];
      });
      const total = along[n - 1];
      for (let i = 0; i < n - 1; i++) {
        const mx = (pts[i][0] + pts[i + 1][0]) / 2, mz = (pts[i][1] + pts[i + 1][1]) / 2;
        if (l.kind === "rail" && net.railBroken(mx, mz)) continue; // the track's gone here
        if (map.hardClear(mx, mz)) continue;
        const kind = l.kind === "rail" ? "railway" : l.kind === "road" ? "tarmac" : pathKind(mx, mz), K = KINDS[kind];
        const key = kind + ":" + variant;
        let q = quads.get(key);
        if (!q) quads.set(key, (q = { pos: [], uv: [] }));
        const half = (j: number) => (K.width / 2) * (l.deadEnd ? Math.min(1, (total - along[j]) / 6) : 1);
        const corner = (j: number, side: number) => {
          const h = half(j) * side;
          q!.pos.push(pts[j][0] + nrm[j][0] * h, 0.02, pts[j][1] + nrm[j][1] * h);
          q!.uv.push(side > 0 ? 1 : 0, along[j] / K.period);
        };
        // Two triangles: (i-, i+, j+) and (i-, j+, j-).
        corner(i, -1); corner(i, 1); corner(i + 1, 1);
        corner(i, -1); corner(i + 1, 1); corner(i + 1, -1);
      }
    });
    const colours = Art.pathColours(style);
    for (const [key, q] of quads) {
      const [kind, variant] = key.split(":");
      const tex = Art.pathTextures(kind, { variant: +variant }).strip;
      const baked = Art.bake(tex, colours, style, "none") as { A: HTMLCanvasElement };
      const t = new THREE.CanvasTexture(baked.A);
      t.magFilter = t.minFilter = THREE.NearestFilter; t.generateMipmaps = false; t.flipY = false;
      t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.NoColorSpace;
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(q.pos, 3));
      g.setAttribute("uvw", new THREE.Float32BufferAttribute(q.uv, 2));
      const m = new THREE.ShaderMaterial({
        vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false,
        polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -4,
        uniforms: { ...LIGHT_UNIFORMS, uStrip: { value: t }, uPixel: { value: mpp } },
      });
      const mesh = new THREE.Mesh(g, m);
      mesh.frustumCulled = false; // one mesh spans the map; the haze and the scenery fade see to distance
      mesh.renderOrder = 0.5;     // on the floor, under the contact shadows
      this.group.add(mesh);
    }
  }
}
