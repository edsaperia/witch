// The zoo's inscriptions (Ed, 2026-10-26: "The information on each area should be inscribed on the flagstones in glowing text to the
// south of each area outside the fence"; for one not found yet, "it just says the name of the animal and the biome name underneath"):
// in place of the floating nameplates (render/zooPlates.ts), each island's words carved into the street just south of its fence,
// where she walks past (the camera looks north, so they read the right way up): its animal, its area's name and its biome, and its
// line (art/areas.js layout.feel); a lake, its animal and its biome. Tiny5 (ui/pixelUi.ts's pixel font) at whole texels, laid flat,
// in the plaza's weathered mint (render/ground.ts): thin grooves with a faint light in them, worn, chipped and mossed in places, the
// light uneven along a line. Each as wide as it needs, as deep as the street lets it (to the street's middle before the next island
// south). Made as she comes near (NEAR m), let go far off. Drawing only.
import * as THREE from "three";
import tiny5 from "../ui/fonts/Tiny5.woff2?url";
import { SPECIES_BY_ID } from "../../art/generator.js";
import { AREA_TYPES } from "../rules/map";
import { reachAt, type ZooIsland, type ZooLayout } from "../rules/zooMap";
import type { ZooBlock } from "../rules/zoo";
import { VALUE_NOISE_GLSL } from "./shaders";

/** How near (m) an inscription is made, and how far it's let go. */
const NEAR = 260, FAR = 340;
/** Metres a texel (the name's twice as tall), and how much longer north to south (the camera looks along the street: floor
 *  lettering stretched so it reads); the gap from the fence (m); the most it reaches south (m); the line's width in characters. */
export const INSCRIPTION = { texel: 0.32, stretch: 1.7, gap: 2.2, deepest: 26, feelChars: 40 };

const VERT = /* glsl */ `
varying vec2 vUv; varying vec2 vWorld;
void main() { vUv = uv; vec4 w = modelMatrix * vec4(position, 1.0); vWorld = w.xz; gl_Position = projectionMatrix * viewMatrix * w; }`;
const FRAG = /* glsl */ `
uniform sampler2D uText; uniform vec2 uSize; uniform float uTexel;
varying vec2 vUv; varying vec2 vWorld;
${VALUE_NOISE_GLSL}
void main() {
  vec2 px = floor(vec2(vUv.x, 1.0 - vUv.y) * uSize) + 0.5; // (the texture's first row, the text's top, to the north)
  float t = texture2D(uText, px / uSize).r;
  if (t < 0.5) discard;
  vec2 fp = t < 0.9 ? floor(px / 2.0) * 2.0 : px; // (the name, its pixels doubled: chipped by whole font pixels)
  // (weathered as the plaza's lines: worn gaps, chips, moss and dirt in the grooves, the light uneven along a line)
  vec2 cell = floor(vWorld / uTexel) * uTexel;
  float wear = vnoise(cell / 2.2 + 31.0), chip = hash(fp + 7.0), moss = vnoise(cell / 4.0 + 57.0);
  float name = step(t, 0.9);
  float keep = step(0.17 - 0.12 * name, wear) * step(0.05 * (1.0 - name), chip) * (1.0 - step(0.74 + 0.14 * name, moss) * step(0.5, hash(fp + 13.0))); // (lighter than the plaza's, the name lightest: words must still read)
  if (keep < 0.5) { gl_FragColor = moss > 0.62 ? vec4(0.16, 0.24, 0.14, 0.55) : vec4(0.03, 0.03, 0.04, 0.35); return; } // (the groove dark: moss or dirt)
  float b = 0.45 + 0.55 * vnoise(cell / 6.0 + 3.0);
  gl_FragColor = vec4(mix(vec3(0.12, 0.2, 0.17), vec3(0.42, 0.72, 0.6), b), 0.5 + 0.35 * b);
}`;

/** An inscription's lines: [text, scale] (2 the name). */
export function inscriptionLines(b: Pick<ZooBlock, "area" | "kind" | "row" | "found">): [string, number][] {
  const area = b.area ? AREA_TYPES.find(a => a.id === b.area) : undefined, sp = area?.creature ?? b.kind;
  const name = (SPECIES_BY_ID as Record<string, { name?: string }>)[sp]?.name ?? sp;
  if (b.found === false || !area) return [[name, 2], [b.row, 1]]; // (not found yet: the animal and its biome, Ed)
  const out: [string, number][] = [[name, 2], [`${area.name} · ${b.row}`, 1]];
  for (const l of wrap(area.layout.feel ?? "", INSCRIPTION.feelChars)) out.push([l, 1]);
  return out;
}

/** Words wrapped to lines of at most `n` characters. */
export function wrap(text: string, n: number): string[] {
  const out: string[] = [];
  let line = "";
  for (const w of text.split(/\s+/).filter(Boolean)) {
    if (line && line.length + 1 + w.length > n) { out.push(line); line = w; } else line = line ? `${line} ${w}` : w;
  }
  if (line) out.push(line);
  return out;
}

let font: Promise<void> | null = null;
const loadFont = (): Promise<void> => (font ??= new FontFace("Tiny5", `url(${tiny5})`).load().then(f => { document.fonts.add(f); }).catch(() => {}));

/** The lines drawn into a texture: Tiny5 at its own 8 px (a crisp 1 px grid), each line thresholded to whole texels and the name's
 *  pixels doubled, centred. */
function textTexture(lines: [string, number][]): { tex: THREE.DataTexture; w: number; h: number } {
  const c = document.createElement("canvas"), x = c.getContext("2d", { willReadFrequently: true })!, LH = 9;
  x.font = "8px Tiny5";
  const ws = lines.map(([t]) => Math.ceil(x.measureText(t).width) + 2);
  const w = Math.max(...lines.map(([, s], k) => ws[k] * s)) + 4, h = lines.reduce((a, [, s]) => a + (LH + 1) * s, 0) + 2;
  c.width = Math.max(...ws); c.height = LH;
  const data = new Uint8Array(w * h * 4);
  for (let k = 3; k < data.length; k += 4) data[k] = 255;
  let y0 = 1;
  lines.forEach(([t, s], k) => {
    x.clearRect(0, 0, c.width, c.height); x.font = "8px Tiny5"; x.fillStyle = "#fff"; x.textBaseline = "top"; x.fillText(t, 1, 0);
    const src = x.getImageData(0, 0, c.width, LH).data, x0 = Math.floor((w - ws[k] * s) / 2);
    for (let j = 0; j < LH; j++) for (let i = 0; i < ws[k]; i++) if (src[(j * c.width + i) * 4 + 3] > 110)
      for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) { const q = ((y0 + j * s + b) * w + x0 + i * s + a) * 4; data[q] = data[q + 1] = data[q + 2] = s > 1 ? 180 : 255; } // (the name's a shade lower: the shader wears it by its own font pixels)
    y0 += (LH + 1) * s;
  });
  const tex = new THREE.DataTexture(data, w, h);
  tex.magFilter = tex.minFilter = THREE.NearestFilter; tex.generateMipmaps = false; tex.flipY = false; tex.needsUpdate = true;
  return { tex, w, h };
}

/** Where an island's inscription lies: its top middle (m), just south of its fence, and how deep the street lets it be (m). */
export function inscriptionSpot(I: ZooIsland, all: readonly ZooIsland[]): { x: number; z: number; room: number } {
  const x = I.x, z = I.z + reachAt(I.reach, Math.PI / 2) + INSCRIPTION.gap;
  // (to the street's middle: half the way to the nearest coast south of it, less the gap again)
  let free = Infinity;
  for (const J of all) {
    if (J === I) continue;
    for (let d = 0; d < 2 * INSCRIPTION.deepest + 8; d += 1) {
      const px = x, pz = z + d, a = Math.atan2(pz - J.z, px - J.x);
      if (Math.hypot(px - J.x, pz - J.z) <= reachAt(J.reach, a)) { free = Math.min(free, d); break; }
    }
  }
  return { x, z, room: Math.min(INSCRIPTION.deepest, Number.isFinite(free) ? free / 2 - 0.5 : INSCRIPTION.deepest) };
}

export class ZooInscriptions {
  readonly group = new THREE.Group();
  private readonly made = new Map<ZooIsland, THREE.Mesh>();
  private ready = false;
  constructor(private readonly layout: ZooLayout, private readonly blocks: readonly ZooBlock[]) {
    this.group.renderOrder = 1;
    void loadFont().then(() => { this.ready = true; });
  }

  /** Each frame: the islands' near her made, the far ones let go. */
  update(hx: number, hz: number): void {
    if (!this.ready) return;
    for (const I of this.layout.islands) {
      const d = Math.hypot(I.x - hx, I.z - hz) - I.most, m = this.made.get(I);
      if (!m && d < NEAR) this.make(I);
      else if (m && d > FAR) { this.group.remove(m); m.geometry.dispose(); const mat = m.material as THREE.ShaderMaterial; (mat.uniforms.uText.value as THREE.Texture).dispose(); mat.dispose(); this.made.delete(I); }
    }
  }

  private make(I: ZooIsland): void {
    const b = this.blocks.find(k => k.cell[0] === I.cell[0] && k.cell[1] === I.cell[1]);
    if (!b) return;
    const { tex, w, h } = textTexture(inscriptionLines({ ...b, found: I.found })), at = inscriptionSpot(I, this.layout.islands);
    const t = Math.min(INSCRIPTION.texel, at.room / (h * INSCRIPTION.stretch)), W = w * t, H = h * t * INSCRIPTION.stretch;
    const geo = new THREE.PlaneGeometry(W, H);
    geo.rotateX(-Math.PI / 2); // (flat, its top to the north)
    const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: { uText: { value: tex }, uSize: { value: new THREE.Vector2(w, h) }, uTexel: { value: t } }, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(at.x, 0.03, at.z + H / 2);
    mesh.renderOrder = 1;
    this.group.add(mesh);
    this.made.set(I, mesh);
  }

  dispose(): void { for (const I of [...this.made.keys()]) { const m = this.made.get(I)!; m.geometry.dispose(); const mat = m.material as THREE.ShaderMaterial; (mat.uniforms.uText.value as THREE.Texture).dispose(); mat.dispose(); } this.made.clear(); this.group.clear(); }
}
