// The lit outline round the house object she can use (Ed's playtest, 2026-10-26: "When she's in range they should light up and
// there's a prompt showing the button to press to open it"): one quad over the piece's own picture, `thick` art pixels bigger all
// round, drawing a warm line on the clear pixels within `thick` of its ink, so the piece is ringed in light in the art's own pixels;
// breathing gently. One at a time (the nearest: rules/houseRooms.ts objectAt). Drawing only.
import * as THREE from "three";

type V3 = { x: number; y: number; z: number };

const VERT = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const FRAG = /* glsl */ `
uniform sampler2D map;
uniform vec2 size;
uniform vec3 colour;
uniform float alpha;
varying vec2 vUv;
float ink(vec2 uv) { return uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0 ? 0.0 : step(0.5, texture2D(map, uv).a); }
void main() {
  // (the art pixel this fragment is in, and its middle: the line keeps to whole art pixels)
  vec2 px = floor(vUv * size) + 0.5, d = 1.0 / size;
  if (ink(px * d) > 0.5) discard;
  float n = 0.0;
  for (int i = -2; i <= 2; i++) for (int j = -2; j <= 2; j++) if (abs(float(i)) + abs(float(j)) <= THICK) n = max(n, ink((px + vec2(float(i), float(j))) * d));
  if (n < 0.5) discard;
  gl_FragColor = vec4(colour, alpha);
}`;

/** The outline's colour (the tags' gold), its thickness in art pixels, and its breath: alpha between `low` and 1 over `period` s. */
export const USE_GLOW = { colour: [1, 0.84, 0.55] as [number, number, number], thick: 1, low: 0.6, period: 1.4 };

export class UseGlow {
  readonly mesh: THREE.Mesh;
  private readonly pos = new Float32Array(12);
  private readonly uv = new Float32Array(8);
  private readonly mat: THREE.ShaderMaterial;

  constructor(G = USE_GLOW) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(this.pos, 3));
    geo.setAttribute("uv", new THREE.BufferAttribute(this.uv, 2));
    geo.setIndex([0, 1, 2, 0, 2, 3]);
    this.mat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG.replace("THICK", `${G.thick.toFixed(1)}`),
      uniforms: { map: { value: null }, size: { value: new THREE.Vector2(1, 1) }, colour: { value: new THREE.Color(...G.colour) }, alpha: { value: 1 } },
      transparent: true, depthWrite: false, depthTest: false, side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(geo, this.mat);
    this.mesh.frustumCulled = false; this.mesh.visible = false;
  }

  /** Rings the picture `tex`, w × h art pixels, its top-left corner (x0, y0) in the picture offsets `at` takes to the world, drawn just
   *  after `order` (the piece's own); at time t (s). Null `tex` hides it. */
  set(tex: THREE.Texture | null, w = 0, h = 0, x0 = 0, y0 = 0, at: ((dx: number, dy: number) => V3) | null = null, order = 0, t = 0, G = USE_GLOW): void {
    if (!tex || !at || w <= 0 || h <= 0) { this.mesh.visible = false; return; }
    const k = G.thick;
    [[x0 - k, y0 - k], [x0 + w + k, y0 - k], [x0 + w + k, y0 + h + k], [x0 - k, y0 + h + k]].forEach(([dx, dy], i) => { const p = at(dx, dy); this.pos[i * 3] = p.x; this.pos[i * 3 + 1] = p.y; this.pos[i * 3 + 2] = p.z; });
    const u0 = -k / w, u1 = 1 + k / w, v0 = -k / h, v1 = 1 + k / h;
    this.uv.set([u0, v0, u1, v0, u1, v1, u0, v1]);
    const geo = this.mesh.geometry;
    (geo.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true; (geo.getAttribute("uv") as THREE.BufferAttribute).needsUpdate = true;
    const U = this.mat.uniforms;
    U.map.value = tex; (U.size.value as THREE.Vector2).set(w, h);
    U.alpha.value = G.low + (1 - G.low) * (0.5 + 0.5 * Math.cos((2 * Math.PI * t) / G.period));
    this.mesh.renderOrder = order + 1e-7; this.mesh.visible = true;
  }
}
