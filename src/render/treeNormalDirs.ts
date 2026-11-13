// The Tree normal maps choice's reduced settings, live (Ed, 2026-11-07: "Normal maps do improve things, can we try a low number
// (16? 32? 64?)"): each loaded area type's atlas has its trees' normals (the big pieces' frames: trunks, crowns, far crowns; never
// its bushes, walls, set piece or rim kit) cut to a k-means palette of 64, 32 or 16 directions (render/treeQuant.ts, as a bake
// would ship them), its alpha (the wind's sway code) kept, and its normal texture uploaded again in place, so every batch drawing
// it changes at once. The original plane is kept beside it, so "full" puts the very bytes back; each atlas's palettes are kept by
// their count, so flipping between settings once they're made is an upload. Nothing happens, and nothing is held, until a reduced
// setting is first picked: the default ("full") costs a look at the tuning a frame.
//
// Where the original comes from: the atlas's own pixels if it has them still (it's not yet on the GPU, or ?pixels=keep), else
// read back from its texture (render/atlas.ts lets each plane's pixels go once uploaded), a band of rows at a time within the
// frame's budget. The palettes are worked out by a worker of their own (render/treeQuantWorker.ts; on the page, in slices, where
// there are no workers). An atlas that lands while a reduced setting is on is caught before its first upload, so it needs no
// read-back, and is cut as soon as its palette is made (a frame or two of full normals as it fades in).
//
// Never waited for (Ed, 2026-11-12, when the 32-direction default held up the CI proofs: "Don't wait for it"): the game's ready,
// the loading, the art's arrival and the proofs' settles take no notice of it. The trees are drawn with their full normals from
// the start and switch to the palette a moment after load, each atlas when its palette is in. The page's share is small: the
// worker sends back the cut plane itself (render/treeQuantWorker.ts), so the page only uploads it, one atlas a frame;
// treeDirsStatus.longestMs keeps the longest the page spent here in one frame, to check. A test or proof that needs the final
// look waits for treeDirsStatus.pending to be 0 (tools/smoke/paused-settle.cjs does, before it compares pictures).
import * as THREE from "three";
import type { TypeArt } from "./assets";
import { atlasPixelsKept } from "./atlas";
import { applyNormalPalette, quantiseNormals, type NormalPalette, type PixelRect } from "./treeQuant";
import type { TreeQuantAsk, TreeQuantReply } from "./treeQuantWorker";

/** One atlas's normals as held here: its size, its trees' boxes, the original plane (once had), its palettes by direction count,
 *  and what its texture shows now (0 the original). */
interface Held { tex: THREE.DataTexture; w: number; h: number; rects: PixelRect[]; orig: Uint8Array | null; read: { y: number; buf: Uint8Array } | null; readMs: number; cache: Map<number, NormalPalette>; ready: Map<number, Uint8Array>; asked: Set<number>; shown: number; gone: boolean }
const held = new WeakMap<THREE.DataTexture, Held>();

/** What's going on, for the shots and a builder's look (window.witch.view.treeDirs): atlases not yet at the setting, and each
 *  palette made (its atlas's size, its directions, how long it took and where: the worker or the page; and how long reading its
 *  plane back from the GPU took, if it had to be). */
export const treeDirsStatus = { pending: 0, longestMs: 0, made: [] as { w: number; h: number; k: number; ms: number; where: "worker" | "page"; readMs: number }[] };

/** A reduced setting has been picked this load: from then on atlases are caught as they land. */
let engaged = false;
/** Rows read back from a texture in one go (2048 x 128 x 4: a megabyte). */
const BAND = 128;
/** At most this many atlases uploaded again in a frame (each a few megabytes over to the GPU): one, to spread the hitch. */
const UPLOADS = 1;

/** The trees' boxes in an atlas: each big piece's frames (both halves of a tree, or its one frame), once each. */
export function treeRects(art: Pick<TypeArt, "atlas" | "layout">, w: number, h: number): PixelRect[] {
  const seen = new Set<number>(), out: PixelRect[] = [];
  for (const p of art.layout.big) for (const f of [p.bot, p.top]) {
    if (f === null || seen.has(f)) continue;
    seen.add(f);
    const fr = art.atlas.frames[f];
    if (fr) out.push({ x: Math.round(fr.uv[0] * w), y: Math.round(fr.uv[1] * h), w: fr.w, h: fr.h });
  }
  return out;
}

function hold(art: TypeArt): Held {
  const tex = art.atlas.normal, img = tex.image as { data: Uint8Array | null; width: number; height: number };
  const h: Held = { tex, w: img.width, h: img.height, rects: treeRects(art, img.width, img.height), orig: img.data ?? null, read: null, readMs: 0, cache: new Map(), ready: new Map(), asked: new Set(), shown: 0, gone: false };
  held.set(tex, h);
  tex.addEventListener("dispose", () => { h.gone = true; h.orig = null; h.read = null; h.cache.clear(); h.ready.clear(); if (job?.h === h) job = null; held.delete(tex); });
  return h;
}

/** Put a plane on the atlas's normal texture (uploaded at the next draw, into the same GPU texture), its pixels let go after as
 *  render/atlas.ts lets them (unless ?pixels=keep). The original stays held here. */
function upload(h: Held, plane: Uint8Array): void {
  const tex = h.tex, img = tex.image as { data: Uint8Array | null };
  img.data = plane;
  tex.needsUpdate = true;
  tex.onUpdate = atlasPixelsKept() ? null : () => { img.data = null; tex.onUpdate = null; };
}

/** Read the texture's plane back from the GPU, a band at a time until `deadline`; true once it's all in (h.orig). */
function readBack(renderer: THREE.WebGLRenderer, h: Held, deadline: number): boolean {
  const gl = renderer.getContext() as WebGL2RenderingContext, glTex = (renderer.properties.get(h.tex) as { __webglTexture?: WebGLTexture }).__webglTexture;
  if (!glTex) return false; // (not on the GPU, and its pixels gone: nothing to read; shouldn't happen)
  const t0 = performance.now(), r = (h.read ??= { y: 0, buf: new Uint8Array(h.w * h.h * 4) }), prev = renderer.getRenderTarget(), fb = gl.createFramebuffer();
  renderer.state.bindFramebuffer(gl.FRAMEBUFFER, fb);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, glTex, 0);
  do {
    const rows = Math.min(BAND, h.h - r.y);
    gl.readPixels(0, r.y, h.w, rows, gl.RGBA, gl.UNSIGNED_BYTE, r.buf.subarray(r.y * h.w * 4, (r.y + rows) * h.w * 4));
    r.y += rows;
  } while (r.y < h.h && performance.now() < deadline);
  renderer.state.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.deleteFramebuffer(fb);
  renderer.setRenderTarget(prev);
  h.readMs += performance.now() - t0;
  if (r.y < h.h) return false;
  h.orig = r.buf; h.read = null;
  return true;
}

// ---- the palettes: a worker's, or the page's in slices ----
let worker: Worker | null | undefined;
let nextId = 1;
const asks = new Map<number, { h: Held; k: number }>();
/** The page's own (no workers): one palette at a time, a slice a frame. */
let job: { h: Held; k: number; gen: Generator<void, NormalPalette, void>; ms: number } | null = null;

function startWorker(): Worker | null {
  if (worker !== undefined) return worker;
  try {
    worker = typeof Worker === "undefined" ? null : new Worker(new URL("./treeQuantWorker.ts", import.meta.url), { type: "module" });
  } catch { worker = null; }
  if (worker) {
    worker.onmessage = (e: MessageEvent<TreeQuantReply>) => {
      const m = e.data, a = asks.get(m.id);
      asks.delete(m.id);
      if (!a) return;
      a.h.asked.delete(a.k);
      if (a.h.gone || !m.idx || !m.pal) { if (m.error) console.warn("tree normal palette failed:", m.error); return; }
      a.h.cache.set(a.k, { k: a.k, idx: m.idx, pal: m.pal, rects: a.h.rects, width: a.h.w });
      if (m.plane) a.h.ready.set(a.k, m.plane); // (the cut plane, made in the worker: uploaded as it is, once)
      treeDirsStatus.made.push({ w: a.h.w, h: a.h.h, k: a.k, ms: Math.round(m.ms), where: "worker", readMs: Math.round(a.h.readMs) });
    };
    worker.onerror = () => { worker?.terminate(); worker = null; for (const a of asks.values()) a.h.asked.delete(a.k); asks.clear(); }; // (on the page from here)
  }
  return worker;
}

/** Ask for atlas h's palette of k directions (from its original, held by now). */
function ask(h: Held, k: number, deadline: number): void {
  const w = startWorker();
  if (w) {
    if (h.asked.has(k)) return;
    const id = nextId++, m: TreeQuantAsk = { id, normal: h.orig!.slice(), width: h.w, rects: h.rects, k };
    asks.set(id, { h, k });
    h.asked.add(k);
    w.postMessage(m, [m.normal.buffer]);
    return;
  }
  if (!job || job.h !== h || job.k !== k) { job = { h, k, gen: quantiseNormals(h.orig!, h.w, h.rects, k), ms: 0 }; }
  while (performance.now() < deadline) {
    const t0 = performance.now(), r = job.gen.next();
    job.ms += performance.now() - t0;
    if (r.done) {
      h.cache.set(k, r.value);
      treeDirsStatus.made.push({ w: h.w, h: h.h, k, ms: Math.round(job.ms), where: "page", readMs: Math.round(h.readMs) });
      job = null;
      return;
    }
  }
}

/** Each frame (render/view.ts, before the draw): bring every loaded area type's atlas to the setting `dirs` (0 full, N directions,
 *  -1 off: the shader lights the trees flat, render/sprites.ts, and nothing here changes), within about `budget` ms of the page's
 *  time. */
export function stepTreeNormalDirs(renderer: THREE.WebGLRenderer | null, arts: Iterable<TypeArt>, dirs: number, budget = 3): void {
  if (dirs > 0) engaged = true;
  treeDirsStatus.pending = 0;
  if (!engaged || dirs < 0) return;
  const t0 = performance.now();
  step(renderer, arts, dirs, t0 + budget);
  treeDirsStatus.longestMs = Math.max(treeDirsStatus.longestMs, Math.round(performance.now() - t0));
}

function step(renderer: THREE.WebGLRenderer | null, arts: Iterable<TypeArt>, dirs: number, deadline: number): void {
  let uploads = 0;
  for (const art of arts) {
    const tex = art.atlas.normal;
    if (art.atlas.indexed.y > 0.5) continue; // (a plane of 256 values or fewer, held as indices: none of the trees' are)
    let h = held.get(tex);
    if (!h) { if (dirs === 0) continue; h = hold(art); } // (full, and never cut: as drawn)
    if (h.shown === dirs) continue;
    if (dirs === 0) { if (h.orig && uploads < UPLOADS) { upload(h, h.orig); uploads++; h.shown = 0; } else if (!h.orig) h.shown = 0; else treeDirsStatus.pending++; continue; }
    const q = h.cache.get(dirs);
    if (q && h.orig) {
      if (uploads < UPLOADS) { upload(h, h.ready.get(dirs) ?? applyNormalPalette(h.orig, q)); h.ready.delete(dirs); uploads++; h.shown = dirs; } else treeDirsStatus.pending++;
      continue;
    }
    treeDirsStatus.pending++;
    if (performance.now() >= deadline) continue;
    if (!h.orig && (!renderer || !readBack(renderer, h, deadline))) continue;
    ask(h, dirs, deadline);
  }
}
