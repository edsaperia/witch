// Wave numbers over the rune stones (Ed, 2026-10-04: "for design purposes, let's just put a big
// glowing number above the stones"): each dormant stone shows the wave that will wake it
// (rules/party.ts wavePlan), in its area's neon, big and glowing, the same size on screen at any
// zoom (on the ground, a near stone's held inside the top of the screen when its top is above it); drawn last and without a depth test, so it reads over the canopy and the clouds from the
// treetops as well as on the ground. Areas the party has reached keep theirs, dimmed (spent).
// A design aid: tuning waveNumbers.on turns it off, and this file is all there is to remove.
import * as THREE from "three";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";

// The digits: a small pixel font drawn once (fill in red, a one-pixel dark outline in green).
const CW = 10, CH = 14;
function digitAtlas(): THREE.DataTexture {
  const c = document.createElement("canvas");
  c.width = CW * 10; c.height = CH;
  const x = c.getContext("2d")!;
  x.fillStyle = "#fff"; x.textAlign = "center"; x.textBaseline = "middle"; x.font = "bold 13px monospace";
  for (let d = 0; d < 10; d++) x.fillText(String(d), d * CW + CW / 2, CH / 2 + 1);
  const src = x.getImageData(0, 0, c.width, c.height).data, W = c.width, data = new Uint8Array(W * CH * 4);
  const on = (i: number, j: number) => i >= 0 && j >= 0 && i < W && j < CH && src[(j * W + i) * 4 + 3] > 110;
  for (let j = 0; j < CH; j++) for (let i = 0; i < W; i++) {
    const k = ((CH - 1 - j) * W + i) * 4, cell = Math.floor(i / CW);
    const same = (a: number, b: number) => Math.floor(a / CW) === cell && on(a, b);
    data[k] = on(i, j) ? 255 : 0;
    data[k + 1] = !on(i, j) && (same(i - 1, j) || same(i + 1, j) || same(i, j - 1) || same(i, j + 1) || same(i - 1, j - 1) || same(i + 1, j + 1) || same(i - 1, j + 1) || same(i + 1, j - 1)) ? 255 : 0;
    data[k + 3] = 255;
  }
  const t = new THREE.DataTexture(data, W, CH);
  t.magFilter = t.minFilter = THREE.NearestFilter; t.generateMipmaps = false; t.needsUpdate = true;
  return t;
}

const VERT = /* glsl */ `
attribute vec4 iAt;   // x, height above the ground, z, digit
attribute vec4 iCol;  // rgb, alpha
attribute vec3 iOff;  // the digit's place, in digit widths from the number's middle; how much it shows (0-1, past the bend); 1 to hold it inside the top of the screen
uniform float uSize, uAspect;
varying vec2 vUv;
varying vec4 vCol;
varying float vShow;
${HEIGHT_VERT_GLSL}
void main() {
  vUv = vec2((iAt.w + uv.x) / 10.0, uv.y);
  vec3 w = vec3(iAt.x, iAt.y, iAt.z);
  w.y += groundH(w.xz);
  vShow = iOff.y;
  vCol = iCol; // (over everything, the bend's horizon too: they're kept to the stones in range)
  vec4 c = clipOf(w);
  // Over its stone, but held inside the top of the screen (on the ground the camera looks down
  // steeply, and a stone's top is often above the picture while its foot is in it).
  vec2 n = c.xy / max(c.w, 1e-4);
  if (iOff.z > 0.5) n.y = min(n.y, 0.96 - uSize * 2.0);
  n += vec2((position.x + iOff.x) * ${(CW / CH).toFixed(3)} / uAspect, position.y + 0.5) * uSize * 2.0;
  gl_Position = vec4(n * c.w, c.z, c.w);
}`;
const FRAG = /* glsl */ `
uniform sampler2D uDigits;
varying vec2 vUv;
varying vec4 vCol;
varying float vShow;
void main() {
  vec4 d = texture2D(uDigits, vUv);
  if (vCol.a < 0.02 || vShow < 0.02 || d.r + d.g < 0.5) discard;
  // The digit glows (over 1, so the bloom takes it); the outline keeps it readable on anything.
  gl_FragColor = d.r > 0.5 ? vec4(vCol.rgb * (0.5 + 1.3 * vCol.a), vShow) : vec4(vec3(0.02, 0.01, 0.04), vShow);
}`;

export interface WaveNumber { x: number; z: number; /** metres above the ground */ y: number; wave: number; colour: THREE.Vector3; alpha: number; /** how much it shows (0-1): it fades past the bent horizon */ show?: number; /** its stone's height (metres), for the checks */ top?: number; /** held inside the top of the screen (near stones, on the ground) */ pin?: boolean }

export class WaveNumbers {
  readonly mesh: THREE.Mesh;
  private geo = new THREE.InstancedBufferGeometry();
  private at: THREE.InstancedBufferAttribute;
  private col: THREE.InstancedBufferAttribute;
  private off: THREE.InstancedBufferAttribute;
  private mat: THREE.ShaderMaterial;

  constructor(private readonly max = 1600) {
    const quad = new THREE.PlaneGeometry(1, 1);
    this.geo.index = quad.index; this.geo.setAttribute("position", quad.getAttribute("position")); this.geo.setAttribute("uv", quad.getAttribute("uv"));
    this.at = new THREE.InstancedBufferAttribute(new Float32Array(max * 4), 4); this.at.setUsage(THREE.DynamicDrawUsage);
    this.col = new THREE.InstancedBufferAttribute(new Float32Array(max * 4), 4); this.col.setUsage(THREE.DynamicDrawUsage);
    this.off = new THREE.InstancedBufferAttribute(new Float32Array(max * 3), 3); this.off.setUsage(THREE.DynamicDrawUsage);
    this.geo.setAttribute("iAt", this.at); this.geo.setAttribute("iCol", this.col); this.geo.setAttribute("iOff", this.off);
    this.geo.instanceCount = 0;
    this.mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: { ...HEIGHT_UNIFORMS, uDigits: { value: digitAtlas() }, uSize: { value: 0.05 }, uAspect: { value: 1 } }, depthTest: false, depthWrite: false, transparent: true });
    this.mesh = new THREE.Mesh(this.geo, this.mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 20; // after the clouds (9.5) and everything see-through
  }

  /** size: a digit's height as a share of the screen's height. */
  /** The numbers last drawn (the smoke check reads them). */
  last: WaveNumber[] = [];

  update(numbers: WaveNumber[], size: number, aspect: number): void {
    this.last = numbers;
    const A = this.at.array as Float32Array, C = this.col.array as Float32Array, O = this.off.array as Float32Array;
    let n = 0;
    for (const w of numbers) {
      const s = String(w.wave);
      if (n + s.length > this.max) break;
      for (let i = 0; i < s.length; i++, n++) {
        A.set([w.x, w.y, w.z, +s[i]], n * 4);
        C.set([w.colour.x, w.colour.y, w.colour.z, w.alpha], n * 4);
        O[n * 3] = i - (s.length - 1) / 2; O[n * 3 + 1] = w.show ?? 1; O[n * 3 + 2] = w.pin ? 1 : 0;
      }
    }
    this.geo.instanceCount = n;
    this.mesh.visible = n > 0;
    this.at.needsUpdate = this.col.needsUpdate = this.off.needsUpdate = true;
    this.mat.uniforms.uSize.value = size;
    this.mat.uniforms.uAspect.value = aspect;
  }
}
