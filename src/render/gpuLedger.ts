// What the GPU holds, counted where it's made (the coordinator's GPU memory budget, Ed-approved 2026-10-26): every texture and
// render buffer the game's WebGL context makes, its bytes worked out at the GL calls themselves (texImage2D/3D, texStorage2D/3D,
// generateMipmap, renderbufferStorage) from its own internal format and type, so a palette index page in R8 counts 1 byte a
// texel and an RGBA8 atlas 4 with nothing to keep in step; freed at deleteTexture and deleteRenderbuffer. Each three.js texture
// or render target labelled with its kind (`gpuKind`: tree atlases, creatures, ground, crown, effects, targets...) is found
// through the renderer's own properties, so the ledger's totals by kind come from what's really on the GPU; what no one labelled
// shows as "other", textures drawn into and render buffers as "targets" and the canvas's own buffers as "canvas". Only the page's own context: the
// art workers draw on the CPU, and another page (the zoo's overlay) keeps its own ledger.
import type * as THREE from "three";

/** What the bytes are for: the ledger's rows. */
export type GpuKind = "trees" | "creatures" | "props" | "witch" | "house" | "ground" | "crown" | "effects" | "fx" | "targets" | "ui" | "other" | "canvas";

// GL's numbers (WebGL 1 and 2), only those the counting needs.
const SIZED: Record<number, number> = {
  0x8229: 1, 0x822b: 2, 0x8051: 4, 0x8058: 4, 0x8c41: 4, 0x8c43: 4, // R8, RG8, RGB8 (padded, as GPUs keep it), RGBA8, SRGB8, SRGB8_ALPHA8
  0x822d: 2, 0x822f: 4, 0x881b: 8, 0x881a: 8, 0x822e: 4, 0x8230: 8, 0x8815: 16, 0x8814: 16, // R16F, RG16F, RGB16F, RGBA16F, R32F, RG32F, RGB32F, RGBA32F
  0x8231: 1, 0x8232: 1, 0x8233: 2, 0x8234: 2, 0x8235: 4, 0x8236: 4, 0x8237: 2, 0x8238: 2, 0x8239: 4, 0x823a: 4, 0x823b: 8, 0x823c: 8, // R/RG integer
  0x8d8e: 4, 0x8d7c: 4, 0x8d88: 8, 0x8d76: 8, 0x8d82: 16, 0x8d70: 16, // RGBA8I, RGBA8UI, RGBA16I, RGBA16UI, RGBA32I, RGBA32UI
  0x8059: 4, 0x8c3a: 4, 0x8c3d: 4, 0x8056: 2, 0x8057: 2, 0x8d62: 2, // RGB10_A2, R11F_G11F_B10F, RGB9_E5, RGBA4, RGB5_A1, RGB565
  0x81a5: 2, 0x81a6: 4, 0x8cac: 4, 0x88f0: 4, 0x8cad: 8, 0x8d48: 1, 0x84f9: 4, // DEPTH16, DEPTH24, DEPTH32F, DEPTH24_STENCIL8, DEPTH32F_STENCIL8, STENCIL8, DEPTH_STENCIL
};
const CHANNELS: Record<number, number> = { 0x1908: 4, 0x1907: 3, 0x1906: 1, 0x1909: 1, 0x190a: 2, 0x1903: 1, 0x8227: 2, 0x8d94: 1, 0x8228: 2, 0x8d98: 3, 0x8d99: 4, 0x1902: 1 };
const TYPE: Record<number, number> = { 0x1401: 1, 0x1400: 1, 0x1403: 2, 0x1402: 2, 0x1405: 4, 0x1404: 4, 0x1406: 4, 0x140b: 2, 0x8d61: 2 };
const PACKED: Record<number, number> = { 0x8033: 2, 0x8034: 2, 0x8363: 2, 0x84fa: 4, 0x8368: 4, 0x8c3b: 4, 0x8c3e: 4, 0x8dad: 8 }; // (a whole texel's bytes)
const TEXTURE0 = 0x84c0, CUBE = 0x8513, CUBE_FACE0 = 0x8515, TEX3D = 0x806f, OUT_OF_MEMORY = 0x0505;

/** Bytes a texel: a sized internal format's own, else its format's channels times its type's (packed types whole). */
export function texelBytes(internal: number, format?: number, type?: number): number {
  if (SIZED[internal]) return SIZED[internal];
  if (type !== undefined && PACKED[type]) return PACKED[type];
  const ch = CHANNELS[format ?? internal] ?? CHANNELS[internal] ?? 4;
  return ch * (type !== undefined ? TYPE[type] ?? 1 : 1);
}

/** The game-wide budget (Google Maps' rule: memory goes with the window): `mb` for the reference window's `pixels`, scaled by this
 *  window's, never under `floor` nor over `ceil` (MB). */
export function gpuBudgetMB(o: { mb: number; refWidth: number; refHeight: number; floor: number; ceil: number }, pixels: number): number {
  return Math.max(o.floor, Math.min(o.ceil, (o.mb * pixels) / (o.refWidth * o.refHeight)));
}

type GL = WebGL2RenderingContext | WebGLRenderingContext;
type Rec = { levels: Map<number, number>; bytes: number };
/** Each labelled three.js texture or render target and its kind; let go when it's disposed. */
const labels = new Map<object, GpuKind>();

/** Label a three.js texture or render target with what it's for (the ledger's rows): kept till it's disposed. */
export function gpuKind<T extends THREE.Texture | THREE.RenderTarget>(t: T, kind: GpuKind): T {
  if (!labels.has(t)) (t as unknown as THREE.EventDispatcher<{ dispose: object }>).addEventListener("dispose", () => labels.delete(t));
  labels.set(t, kind);
  return t;
}

export interface LedgerReport { total: number; byKind: Partial<Record<GpuKind, number>>; textures: number; buffers: number }

export class GpuLedger {
  private tex = new Map<WebGLTexture, Rec>();
  private rbs = new Map<WebGLRenderbuffer, number>();
  private bound = new Map<number, WebGLTexture | null>(); // (unit << 16 | target slot: what each unit holds)
  private unit = 0;
  private rb: WebGLRenderbuffer | null = null;
  /** Textures drawn into (a render target's): "targets" unless labelled otherwise. */
  private attached = new WeakSet<WebGLTexture>();
  private texBytes = 0;
  private rbBytes = 0;
  /** Out-of-memory errors seen (GL's own, read now and then: `check`). */
  ooms = 0;

  constructor(private readonly gl: GL, private readonly canvasBytes: () => number = () => 0) {
    const g = gl as unknown as Record<string, (...a: unknown[]) => unknown>, self = this;
    const wrap = (name: string, after: (a: unknown[]) => void, before = false) => {
      const f = g[name];
      if (typeof f !== "function") return;
      g[name] = function (this: unknown, ...a: unknown[]) {
        if (before) after(a);
        const r = f.apply(gl, a);
        if (!before) after(a);
        return r;
      };
    };
    const slot = (target: number) => (target >= CUBE_FACE0 && target < CUBE_FACE0 + 6 ? CUBE : target);
    const current = (target: number) => self.bound.get((self.unit << 16) | slot(target)) ?? null;
    const set = (target: number, level: number, bytes: number) => {
      const t = current(target);
      if (!t) return;
      let r = self.tex.get(t);
      if (!r) self.tex.set(t, (r = { levels: new Map(), bytes: 0 }));
      const key = (target - (slot(target) === CUBE ? CUBE_FACE0 : 0)) * 64 + level, was = r.levels.get(key) ?? 0; // (each face's levels its own)
      r.levels.set(key, bytes); r.bytes += bytes - was; self.texBytes += bytes - was;
    };
    wrap("activeTexture", a => { self.unit = (a[0] as number) - TEXTURE0; });
    wrap("bindTexture", a => { self.bound.set((self.unit << 16) | (a[0] as number), (a[1] as WebGLTexture | null) ?? null); });
    wrap("texImage2D", a => {
      const [target, level, internal] = a as number[];
      if (a.length >= 8) { const [, , , w, h, , format, type] = a as number[]; set(target, level, w * h * texelBytes(internal, format, type)); }
      else if (a.length === 6) { const s = a[5] as { width?: number; height?: number; videoWidth?: number; videoHeight?: number; displayWidth?: number; displayHeight?: number }; const w = s?.videoWidth || s?.displayWidth || s?.width || 0, h = s?.videoHeight || s?.displayHeight || s?.height || 0; set(target, level, w * h * texelBytes(internal, a[3] as number, a[4] as number)); }
    });
    wrap("texImage3D", a => { const [target, level, internal, w, h, d, , format, type] = a as number[]; set(target, level, w * h * d * texelBytes(internal, format, type)); });
    wrap("compressedTexImage2D", a => { const [target, level] = a as number[], data = a[a.length - 1] as ArrayBufferView | number; set(target, level, typeof data === "number" ? data : data?.byteLength ?? 0); });
    wrap("texStorage2D", a => {
      const [target, levels, internal, w, h] = a as number[], b = texelBytes(internal), faces = target === CUBE ? 6 : 1;
      for (let f = 0; f < faces; f++) for (let l = 0; l < levels; l++) set(faces > 1 ? CUBE_FACE0 + f : target, l, Math.max(1, w >> l) * Math.max(1, h >> l) * b);
    });
    wrap("texStorage3D", a => {
      const [target, levels, internal, w, h, d] = a as number[], b = texelBytes(internal);
      for (let l = 0; l < levels; l++) set(target, l, Math.max(1, w >> l) * Math.max(1, h >> l) * (target === TEX3D ? Math.max(1, d >> l) : d) * b);
    });
    wrap("generateMipmap", a => { // (the levels under the first: about a third more, each face's)
      const target = a[0] as number, faces = target === CUBE ? 6 : 1, t = current(target), r = t && self.tex.get(t);
      if (!r) return;
      for (let f = 0; f < faces; f++) { const ft = faces > 1 ? CUBE_FACE0 + f : target, base = r.levels.get((ft - (faces > 1 ? CUBE_FACE0 : 0)) * 64) ?? 0; set(ft, 63, Math.round(base / 3)); }
    });
    wrap("deleteTexture", a => { const r = self.tex.get(a[0] as WebGLTexture); if (r) { self.texBytes -= r.bytes; self.tex.delete(a[0] as WebGLTexture); } }, true);
    wrap("copyTexImage2D", a => { const [target, level, internal, , , w, h] = a as number[]; set(target, level, w * h * texelBytes(internal)); });
    wrap("framebufferTexture2D", a => { if (a[3]) self.attached.add(a[3] as WebGLTexture); });
    wrap("framebufferTextureLayer", a => { if (a[2]) self.attached.add(a[2] as WebGLTexture); });
    wrap("bindRenderbuffer", a => { self.rb = (a[1] as WebGLRenderbuffer | null) ?? null; });
    const storage = (internal: number, w: number, h: number, samples: number) => {
      if (!self.rb) return;
      const was = self.rbs.get(self.rb) ?? 0, b = w * h * texelBytes(internal) * Math.max(1, samples);
      self.rbs.set(self.rb, b); self.rbBytes += b - was;
    };
    wrap("renderbufferStorage", a => { const [, internal, w, h] = a as number[]; storage(internal, w, h, 1); });
    wrap("renderbufferStorageMultisample", a => { const [, samples, internal, w, h] = a as number[]; storage(internal, w, h, samples); });
    wrap("deleteRenderbuffer", a => { const b = self.rbs.get(a[0] as WebGLRenderbuffer); if (b !== undefined) { self.rbBytes -= b; self.rbs.delete(a[0] as WebGLRenderbuffer); } }, true);
  }

  /** The context was lost: everything on the GPU with it. */
  reset(): void { this.tex.clear(); this.rbs.clear(); this.bound.clear(); this.texBytes = this.rbBytes = 0; this.unit = 0; this.rb = null; }

  /** Everything held now (bytes), the canvas's own buffers too. */
  get total(): number { return this.texBytes + this.rbBytes + this.canvasBytes(); }

  /** A three.js texture's bytes on the GPU (0 if it isn't there yet). */
  bytesOf(renderer: THREE.WebGLRenderer, t: THREE.Texture | null | undefined): number {
    const w = t && (renderer.properties.get(t) as { __webglTexture?: WebGLTexture }).__webglTexture;
    return (w && this.tex.get(w)?.bytes) || 0;
  }

  /** The totals, by kind (bytes): the labelled textures found through the renderer, the render buffers as targets, the rest other. */
  report(renderer: THREE.WebGLRenderer): LedgerReport {
    const byKind: Partial<Record<GpuKind, number>> = {}, seen = new Set<WebGLTexture>();
    const add = (k: GpuKind, t: THREE.Texture | null | undefined) => {
      const w = t && (renderer.properties.get(t) as { __webglTexture?: WebGLTexture }).__webglTexture, r = w && !seen.has(w) && this.tex.get(w);
      if (r) { seen.add(w!); byKind[k] = (byKind[k] ?? 0) + r.bytes; }
    };
    for (const [o, k] of labels) {
      if ((o as THREE.RenderTarget).isRenderTarget) { const rt = o as THREE.RenderTarget; for (const t of rt.textures) add(k, t); add(k, rt.depthTexture); }
      else add(k, o as THREE.Texture);
    }
    let other = 0, targets = 0;
    for (const [w, r] of this.tex) if (!seen.has(w)) { if (this.attached.has(w)) targets += r.bytes; else other += r.bytes; }
    byKind.other = other;
    byKind.targets = (byKind.targets ?? 0) + targets + this.rbBytes;
    byKind.canvas = this.canvasBytes();
    return { total: this.total, byKind, textures: this.tex.size, buffers: this.rbs.size };
  }

  /** GL's own error now (read only now and then: each read waits on the GPU): out of memory counted and said. */
  check(): boolean {
    let oom = false;
    for (let i = 0, e = this.gl.getError(); e && i < 8; i++, e = this.gl.getError()) if (e === OUT_OF_MEMORY) oom = true;
    if (oom) this.ooms++;
    return oom;
  }
}

/** A ledger's line (MB), the biggest kinds first. */
export function ledgerLine(r: LedgerReport, budgetMB: number, evicted: number): string {
  const mb = (b: number) => (b / 1048576).toFixed(0);
  const kinds = Object.entries(r.byKind).filter(([, b]) => b >= 0.5 * 1048576).sort((a, b) => b[1] - a[1]).map(([k, b]) => `${k} ${mb(b)}`);
  return `gpu    ${mb(r.total)} of ${budgetMB.toFixed(0)} MB  ${kinds.join("  ")}${evicted ? `  · ${evicted} let go` : ""}`;
}
