// The ground's area texture (render/ground.ts: which area each spot of ground is, its openness and its ponds) as a window round her
// that wraps (Ed, 2026-10-26: "Surely there must be a much more efficient way to do the ground that looks nearly the same"; the
// coordinator: a wrapping window sized to what's drawn, only the bytes the shader reads, single-digit MB). It was the whole map's,
// at 2 texels a metre: up to 8192 a side, 256 MB of GPU memory (the zoo's 254 MB, tools/zoo/perf.cjs), of which only the tiles near
// the cameras were ever filled. Now S tiles a side of the map's 32-texel tiles, each of the map's tiles held in the one its index
// wraps to (the texture repeats, so the shader's lookup needs no wrapping of its own), the window kept round her a step at a time:
// the tiles it leaves cleared as it goes, so nothing stale is ever read. Two bytes a texel (RG8): the area's look + 1 (0, not filled
// yet: the shader's old "a < 0.5"), and its openness in seven bits with the pond's in the eighth. The shader reads it through
// AREA_GLSL's areaAt, which hands back the old four channels. No three.js scene here, only the texture: tested without a GPU.
import * as THREE from "three";

export const AREA_TILE = 32; // texels

/** The GLSL that reads the windows: `areaAt(p)` at world (x, z) `p`, as the old texture's texel (r: the look / 255, g: openness,
 *  b: 1 in a pond, a: 1 filled; all 0 where neither window holds it). The near window first, then the far one (the telescope's). */
export const AREA_GLSL = /* glsl */ `
uniform sampler2D uAreas, uAreasFar;
uniform vec4 uExtent, uExtentFar;   // each texture's corner (x, z) and span (metres): it repeats
uniform vec4 uAreaWin, uAreaWinFar; // each window's held box: min x, min z, max x, max z (metres)
vec4 areaDecode(vec4 a) {
  float t = floor(a.r * 255.0 + 0.5), g = floor(a.g * 255.0 + 0.5);
  return t < 0.5 ? vec4(0.0) : vec4((t - 1.0) / 255.0, mod(g, 128.0) / 127.0, g >= 128.0 ? 1.0 : 0.0, 1.0);
}
vec4 areaAt(vec2 p) {
  if (p.x >= uAreaWin.x && p.y >= uAreaWin.y && p.x < uAreaWin.z && p.y < uAreaWin.w) return areaDecode(texture2D(uAreas, (p - uExtent.xy) / uExtent.zw));
  if (p.x >= uAreaWinFar.x && p.y >= uAreaWinFar.y && p.x < uAreaWinFar.z && p.y < uAreaWinFar.w) return areaDecode(texture2D(uAreasFar, (p - uExtentFar.xy) / uExtentFar.zw));
  return vec4(0.0);
}
`;

/** One texel's two bytes: the area's look + 1 and its openness (0 to 1) in seven bits, the pond's flag the eighth. */
export const areaTexel = (look: number, openness: number, pond: boolean): [number, number] =>
  [look + 1, (pond ? 128 : 0) + Math.max(0, Math.min(127, Math.round(openness * 127)))];

/** Where the map's tile (i, j) lives in a window `s` tiles a side: its slot (column, row). */
export const slotOf = (i: number, j: number, s: number): [number, number] => [((i % s) + s) % s, ((j % s) + s) % s];

/** The window's corner (in the map's tiles) to hold tile (cx, cz) (fractional) at its middle, moved only when she's more than
 *  `step` tiles off it, and then to a multiple of `step` (so it moves in strips). */
export function windowCorner(at: { i0: number; j0: number } | null, cx: number, cz: number, s: number, step: number): { i0: number; j0: number } {
  const snap = (c: number) => Math.round((c - s / 2) / step) * step;
  if (!at) return { i0: snap(cx), j0: snap(cz) };
  return { i0: Math.abs(cx - (at.i0 + s / 2)) > step ? snap(cx) : at.i0, j0: Math.abs(cz - (at.j0 + s / 2)) > step ? snap(cz) : at.j0 };
}

/** The columns (or rows) of slots a window's move from corner `from` to `to` hands to new tiles: every one if it jumped a whole
 *  window or more. */
export function enteringSlots(from: number, to: number, s: number): number[] {
  if (Math.abs(to - from) >= s) return Array.from({ length: s }, (_, k) => k);
  const out: number[] = [];
  if (to > from) for (let i = from + s; i < to + s; i++) out.push(((i % s) + s) % s);
  else for (let i = to; i < from; i++) out.push(((i % s) + s) % s);
  return out;
}

/** A tile's texels (TILE x TILE x 2 bytes) for map tile (i, j): filled by the ground (render/ground.ts), from the map's areas. */
export type FillTile = (out: Uint8Array, i: number, j: number, tpm: number) => void;

/** One window: `s` tiles a side at `tpm` texels a metre over a map `tilesX` x `tilesZ` tiles from (minX, minZ), its texture's
 *  uniforms, and its filling, nearest first. */
export class AreaWindow {
  readonly texture: THREE.DataTexture;
  /** The texture's corner and span (metres): the shader's (p - xy) / zw, the texture repeating. */
  readonly extent: THREE.Vector4;
  /** The box it holds now (metres): min x, min z, max x, max z. */
  readonly box = new THREE.Vector4(1e9, 1e9, -1e9, -1e9);
  /** Each slot's map tile (its index + 1), 0 none. */
  private owner: Int32Array;
  private at: { i0: number; j0: number } | null = null;
  private tile: Uint8Array;
  private zeroCol: Uint8Array;
  private initialised = false;
  readonly tm: number;

  constructor(readonly s: number, readonly tpm: number, readonly step: number, private readonly map: { minX: number; minZ: number; tilesX: number; tilesZ: number }, private readonly fillTile: FillTile) {
    const n = s * AREA_TILE;
    this.tm = AREA_TILE / tpm;
    this.texture = new THREE.DataTexture(null, n, n, THREE.RGFormat, THREE.UnsignedByteType);
    const t = this.texture;
    t.magFilter = t.minFilter = THREE.NearestFilter; t.generateMipmaps = false; t.colorSpace = THREE.NoColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.unpackAlignment = 1;
    t.needsUpdate = true; t.source.dataReady = false; // (made on the GPU only, never as one array here; WebGL starts it at zero)
    this.extent = new THREE.Vector4(map.minX, map.minZ, n / tpm, n / tpm);
    this.owner = new Int32Array(s * s);
    this.tile = new Uint8Array(AREA_TILE * AREA_TILE * 2);
    this.zeroCol = new Uint8Array(AREA_TILE * n * 2);
  }

  /** Its GPU memory (bytes). */
  get bytes(): number { return (this.s * AREA_TILE) ** 2 * 2; }

  /** Hold (x, z) (metres) within it, the window moved if need be (the slots it hands on cleared), then fill what's unfilled of
   *  `rect` in it, nearest (x, z) first, for at most `budgetMs` (one tile at least): how many are left. */
  fill(renderer: THREE.WebGLRenderer, rect: { minX: number; maxX: number; minZ: number; maxZ: number }, x: number, z: number, budgetMs: number): number {
    if (!this.initialised) { renderer.initTexture(this.texture); this.initialised = true; }
    const m = this.map, tm = this.tm, cx = (x - m.minX) / tm, cz = (z - m.minZ) / tm;
    this.place(renderer, windowCorner(this.at, cx, cz, this.s, this.step));
    const W = this.at!;
    const i0 = Math.max(0, W.i0, Math.floor((rect.minX - m.minX) / tm)), i1 = Math.min(m.tilesX - 1, W.i0 + this.s - 1, Math.floor((rect.maxX - m.minX) / tm));
    const j0 = Math.max(0, W.j0, Math.floor((rect.minZ - m.minZ) / tm)), j1 = Math.min(m.tilesZ - 1, W.j0 + this.s - 1, Math.floor((rect.maxZ - m.minZ) / tm));
    const todo: [number, number, number][] = [];
    for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) {
      const [sx, sz] = slotOf(i, j, this.s);
      if (this.owner[sz * this.s + sx] !== j * m.tilesX + i + 1) todo.push([i, j, (i + 0.5 - cx) ** 2 + (j + 0.5 - cz) ** 2]);
    }
    todo.sort((a, b) => a[2] - b[2]);
    const t0 = performance.now();
    let done = 0;
    for (const [i, j] of todo) {
      if (done > 0 && performance.now() - t0 > budgetMs) break;
      this.fillTile(this.tile, i, j, this.tpm);
      const [sx, sz] = slotOf(i, j, this.s);
      // (from a texture three.js has never seen: a plain texSubImage2D from these bytes, render/ground.ts)
      renderer.copyTextureToTexture(this.texData(this.tile, AREA_TILE, AREA_TILE), this.texture, null, new THREE.Vector2(sx * AREA_TILE, sz * AREA_TILE));
      this.owner[sz * this.s + sx] = j * m.tilesX + i + 1;
      done++;
    }
    return todo.length - done;
  }

  /** The window at corner `to`: the slots it hands to new tiles cleared (one upload a column or row of slots), its box set. */
  private place(renderer: THREE.WebGLRenderer, to: { i0: number; j0: number }): void {
    const from = this.at, s = this.s, n = s * AREA_TILE;
    if (from && from.i0 === to.i0 && from.j0 === to.j0) return;
    const cols = from ? enteringSlots(from.i0, to.i0, s) : [], rows = from ? enteringSlots(from.j0, to.j0, s) : [];
    for (const c of cols) { renderer.copyTextureToTexture(this.texData(this.zeroCol, AREA_TILE, n), this.texture, null, new THREE.Vector2(c * AREA_TILE, 0)); for (let r = 0; r < s; r++) this.owner[r * s + c] = 0; }
    for (const r of rows) { renderer.copyTextureToTexture(this.texData(this.zeroCol, n, AREA_TILE), this.texture, null, new THREE.Vector2(0, r * AREA_TILE)); this.owner.fill(0, r * s, r * s + s); }
    this.at = to;
    const m = this.map, tm = this.tm;
    this.box.set(m.minX + to.i0 * tm, m.minZ + to.j0 * tm, m.minX + (to.i0 + s) * tm, m.minZ + (to.j0 + s) * tm);
  }

  private texData(data: Uint8Array, w: number, h: number): THREE.DataTexture {
    const t = new THREE.DataTexture(data, w, h, THREE.RGFormat, THREE.UnsignedByteType);
    t.unpackAlignment = 1;
    return t;
  }

  dispose(): void { this.texture.dispose(); }
}
