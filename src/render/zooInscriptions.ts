// The zoo's inscriptions (Ed, 2026-10-26: "The information on each area should be inscribed on the flagstones in glowing text to the
// south of each area outside the fence"; for one not found yet, "it just says the name of the animal and the biome name underneath"):
// in place of the floating nameplates (render/zooPlates.ts), each island's words carved into the street just south of its fence,
// where she walks past (the camera looks north, so they read the right way up): its animal, its area's name and its biome, and its
// line (art/areas.js layout.feel); a lake, its animal and its biome. Tiny5 (ui/pixelUi.ts's pixel font), each font pixel two texels
// wide with a font pixel between letters and more between words (Ed: "it was just too condensed so the letters did not separate"),
// laid on the ground as the ground is drawn (bent and lifted with it: render/height.ts), in the plaza's mint (render/ground.ts),
// restrained (Ed, "it should still seem diegetic"): a faint light in the grooves, uneven along a line, an occasional chip, moss and
// dirt in the stone round the letters rather than through them. Each where the street south of its island has room for it whole
// (inscriptionSpot). Made as she comes near (NEAR m), let go far off. Drawing only.
import * as THREE from "three";
import tiny5 from "../ui/fonts/Tiny5.woff2?url";
import { SPECIES_BY_ID } from "../../art/generator.js";
import { AREA_TYPES } from "../rules/map";
import { coastDist, reachAt, type ZooIsland, type ZooLayout } from "../rules/zooMap";
import type { ZooBlock } from "../rules/zoo";
import { VALUE_NOISE_GLSL } from "./shaders";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";

/** How near (m) an inscription is made, and how far it's let go. */
const NEAR = 260, FAR = 340;
/** Metres a texel at most (and least: past that it's left out), a font pixel being `wide` texels across and `tall` down (the name
 *  `name` both ways), `track` font pixels between letters and `word` between words; the street kept clear of the coasts round it
 *  (m); the description's line in characters. */
export const INSCRIPTION = { texel: 0.22, least: 0.12, wide: 2, tall: 2, name: 3, track: 1, word: 2, clear: 2.5, feelChars: 32 };

const VERT = /* glsl */ `
varying vec2 vUv; varying vec2 vWorld;
${HEIGHT_VERT_GLSL}
void main() { vUv = uv; vec4 w = modelMatrix * vec4(position, 1.0); vWorld = w.xz; gl_Position = clipOf(onGround(vec3(w.x, 0.03, w.z))); }`;
const FRAG = /* glsl */ `
uniform sampler2D uText; uniform vec2 uSize; uniform float uTexel;
varying vec2 vUv; varying vec2 vWorld;
${VALUE_NOISE_GLSL}
void main() {
  vec2 px = floor(vec2(vUv.x, 1.0 - vUv.y) * uSize) + 0.5; // (the texture's first row, the text's top, to the north)
  float t = texture2D(uText, px / uSize).r;
  vec2 cell = floor(vWorld / uTexel) * uTexel;
  float moss = vnoise(cell / 4.0 + 57.0);
  if (t < 0.5) {
    // (round the letters, not through them: moss and dirt gathered in the stone at a groove's edge; Ed, "restrained, it should
    // still seem diegetic")
    vec2 o = 1.0 / uSize;
    float near = max(max(texture2D(uText, (px + vec2(1, 0)) * o).r, texture2D(uText, (px - vec2(1, 0)) * o).r), max(texture2D(uText, (px + vec2(0, 1)) * o).r, texture2D(uText, (px - vec2(0, 1)) * o).r));
    if (near < 0.5 || moss < 0.55 || hash(px + 21.0) < 0.35) discard;
    gl_FragColor = moss > 0.66 ? vec4(0.15, 0.23, 0.13, 0.5) : vec4(0.03, 0.03, 0.04, 0.3);
    return;
  }
  vec2 fp = t < 0.9 ? floor(px / 3.0) : floor(px / 2.0); // (chipped by whole font pixels: the name's 3 texels, the rest 2)
  // (an old carving: an occasional chip in a stroke, the faint light in the grooves uneven along a line)
  if (hash(fp + 7.0) < 0.03) { gl_FragColor = vec4(0.03, 0.03, 0.04, 0.35); return; }
  float b = 0.6 + 0.4 * vnoise(cell / 6.0 + 3.0);
  gl_FragColor = vec4(mix(vec3(0.14, 0.24, 0.2), vec3(0.47, 0.78, 0.65), b), 0.55 + 0.3 * b);
}`;

/** An inscription's lines: [text, scale] (2 the name). */
export function inscriptionLines(b: Pick<ZooBlock, "area" | "kind" | "row" | "found">, chars = INSCRIPTION.feelChars): [string, number][] {
  const area = b.area ? AREA_TYPES.find(a => a.id === b.area) : undefined, sp = area?.creature ?? b.kind;
  const name = (SPECIES_BY_ID as Record<string, { name?: string }>)[sp]?.name ?? sp;
  if (b.found === false || !area) return [[name, 2], [b.row, 1]]; // (not found yet: the animal and its biome, Ed)
  const out: [string, number][] = [[name, 2], [`${area.name} · ${b.row}`, 1]];
  if (chars > 0) for (const l of wrap(area.layout.feel ?? "", chars)) out.push([l, 1]);
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

/** The lines drawn into a texture: Tiny5 at its own 8 px (a crisp 1 px grid) with a font pixel between letters and `word` more
 *  between words, thresholded to whole font pixels, each font pixel `wide` by `tall` texels (the name's `name` by `name`), centred. */
function textTexture(lines: [string, number][]): { tex: THREE.DataTexture; w: number; h: number } {
  const c = document.createElement("canvas"), x = c.getContext("2d", { willReadFrequently: true })! as CanvasRenderingContext2D & { letterSpacing: string; wordSpacing: string }, LH = 9, K = INSCRIPTION;
  const font = () => { x.font = "8px Tiny5"; x.letterSpacing = `${K.track}px`; x.wordSpacing = `${K.word}px`; };
  font();
  const ws = lines.map(([t]) => Math.ceil(x.measureText(t).width) + 2);
  const sx = (s: number) => (s > 1 ? K.name : K.wide), sy = (s: number) => (s > 1 ? K.name : K.tall);
  const w = Math.max(...lines.map(([, s], k) => ws[k] * sx(s))) + 4, h = lines.reduce((a, [, s]) => a + (LH + 2) * sy(s), 0) + 2;
  c.width = Math.max(...ws); c.height = LH;
  font();
  const data = new Uint8Array(w * h * 4);
  for (let k = 3; k < data.length; k += 4) data[k] = 255;
  let y0 = 1;
  lines.forEach(([t, s], k) => {
    x.clearRect(0, 0, c.width, c.height); font(); x.fillStyle = "#fff"; x.textBaseline = "top"; x.fillText(t, 1, 0);
    const src = x.getImageData(0, 0, c.width, LH).data, X = sx(s), Y = sy(s), x0 = Math.floor((w - ws[k] * X) / 2);
    for (let j = 0; j < LH; j++) for (let i = 0; i < ws[k]; i++) if (src[(j * c.width + i) * 4 + 3] > 110)
      for (let a = 0; a < X; a++) for (let b = 0; b < Y; b++) { const q = ((y0 + j * Y + b) * w + x0 + i * X + a) * 4; data[q] = data[q + 1] = data[q + 2] = s > 1 ? 180 : 255; } // (the name's a shade lower: the shader chips it by its own font pixels)
    y0 += (LH + 2) * Y;
  });
  const tex = new THREE.DataTexture(data, w, h);
  tex.magFilter = tex.minFilter = THREE.NearestFilter; tex.generateMipmaps = false; tex.flipY = false; tex.needsUpdate = true;
  return { tex, w, h };
}

/** Where an island's inscription lies, `w` by `h` texels: its top middle (m) and its texel (m), the biggest (up to INSCRIPTION.texel)
 *  that fits whole in the street on the island's southern side (due south first, then either way round as far as east of south-east and
 *  west of south-west, then further out from the fence; only where none of that has room, round its other sides), clear of every
 *  coast by `clear` metres and inside `edge` metres of home; null if none fits even at INSCRIPTION.least. */
export function inscriptionSpot(I: ZooIsland, all: readonly ZooIsland[], w: number, h: number, home: { x: number; z: number }, edge: number): { x: number; z: number; t: number } | null {
  const K = INSCRIPTION, near = all.filter(J => Math.hypot(J.x - I.x, J.z - I.z) < I.most + J.most + 60);
  const wet = (x: number, z: number) => Math.hypot(x - home.x, z - home.z) > edge || near.some(J => coastDist(J, x, z) > -K.clear); // (in an island, or within `clear` of its coast)
  const fits = (cx: number, top: number, W: number, H: number) => {
    for (let i = 0; i <= 8; i++) for (let j = 0; j <= 4; j++) if (wet(cx - W / 2 + (W * i) / 8, top + (H * j) / 4)) return false;
    return true;
  };
  // (the island's southern side first; only where that has no room, round the rest of it: the camera looks north from anywhere)
  for (const sides of [[0, 0.2, -0.2, 0.4, -0.4, 0.6, -0.6, 0.8, -0.8, 1.0, -1.0], [1.3, -1.3, 1.6, -1.6, 1.9, -1.9, 2.2, -2.2, 2.6, -2.6, Math.PI]]) for (let t = K.texel; t >= K.least - 1e-6; t -= 0.01) {
    const W = w * t, H = h * t;
    for (const da of sides) {
      const a = Math.PI / 2 + da, r = reachAt(I.reach, a) + K.clear, cx = I.x + Math.cos(a) * r, cz = I.z + Math.sin(a) * r; // (past its coast's furthest that way)
      // (its top middle at the coast there, then pushed further out; north of the island, the inscription's bottom at the coast)
      const below = Math.sin(a) >= 0;
      for (const out of [0, 3, 6, 10, 16]) { const top = below ? cz + out : cz - out - H; if (fits(cx, top, W, H)) return { x: cx, z: top, t }; }
    }
  }
  return null;
}

export class ZooInscriptions {
  readonly group = new THREE.Group();
  private readonly made = new Map<ZooIsland, THREE.Mesh>();
  private ready = false;
  /** `edge`: how far from home's middle the streets reach (m). */
  constructor(private readonly layout: ZooLayout, private readonly blocks: readonly ZooBlock[], private readonly edge: number) {
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
    // (the description wrapped wider, so shallower, where the street's narrow)
    let made: { tex: THREE.DataTexture; w: number; h: number } | null = null, at: ReturnType<typeof inscriptionSpot> = null;
    // (and, hemmed in on every side, its name, place and biome without the description: 0)
    for (const chars of [INSCRIPTION.feelChars, Math.round(INSCRIPTION.feelChars * 1.4), INSCRIPTION.feelChars * 2, 0]) {
      made?.tex.dispose();
      made = textTexture(inscriptionLines({ ...b, found: I.found }, chars));
      at = inscriptionSpot(I, this.layout.islands, made.w, made.h, this.layout.home, this.edge);
      if (at || I.found === false) break;
    }
    if (!made || !at) { made?.tex.dispose(); return; }
    const { tex, w, h } = made;
    const t = at.t, W = w * t, H = h * t;
    const geo = new THREE.PlaneGeometry(W, H, Math.max(1, Math.ceil(W / 4)), Math.max(1, Math.ceil(H / 4))); // (vertices every 4 m or so: it bends with the ground)
    geo.rotateX(-Math.PI / 2); // (flat, its top to the north)
    const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: { ...HEIGHT_UNIFORMS, uText: { value: tex }, uSize: { value: new THREE.Vector2(w, h) }, uTexel: { value: t } }, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(at.x, 0, at.z + H / 2);
    mesh.frustumCulled = false; // (drawn where the ground's drawn, bent: render/height.ts)
    mesh.renderOrder = 1;
    this.group.add(mesh);
    this.made.set(I, mesh);
  }

  /** Where each inscription made lies (its island's kind, its top middle, its size in metres): for tools/zoo/shots.cjs. */
  get placed(): { kind: string; x: number; z: number; w: number; h: number }[] {
    return [...this.made].map(([I, m]) => { const p = (m.geometry as THREE.PlaneGeometry).parameters; return { kind: I.kind, x: m.position.x, z: m.position.z - p.height / 2, w: p.width, h: p.height }; });
  }

  dispose(): void { for (const I of [...this.made.keys()]) { const m = this.made.get(I)!; m.geometry.dispose(); const mat = m.material as THREE.ShaderMaterial; (mat.uniforms.uText.value as THREE.Texture).dispose(); mat.dispose(); } this.made.clear(); this.group.clear(); }
}
