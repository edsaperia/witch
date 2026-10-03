// Drawing the sprite sets with art/generator.js and packing them into atlas pixels. No Three.js
// and no page needed, so it runs in a Web Worker (with OffscreenCanvas) as well as on the page.
import * as Art from "../../art/generator.js";
import { AREA_TYPES } from "../rules/map";
import { BUSH_VARIANTS, TREE_VARIANTS } from "../rules/forest";
import { rng } from "../rules/random";
import type { Style } from "./style";

type AnyCanvas = HTMLCanvasElement | OffscreenCanvas;
export interface Baked { A: AnyCanvas; N: AnyCanvas; w: number; h: number }
/** Where a sprite sits in its atlas: u0, vTop, u1, vBottom, and its size in art pixels. */
export interface Frame { uv: [number, number, number, number]; w: number; h: number }
export interface AtlasPixels { albedo: Uint8Array; normal: Uint8Array; width: number; height: number; frames: Frame[] }

export type MakeCanvas = (w: number, h: number) => AnyCanvas;

const TREE_KEYS = ["wBroad", "wFir", "wWillow", "wBirch", "wPalm", "wFlat"];

/** The style for one area type: its leaf colour, and its favourite tree shapes weighted up. */
export function typeStyle(st: Style, typeIndex: number): Style {
  const type = AREA_TYPES[typeIndex], d = st.areaContrast;
  const s: Style = { ...st, leafHue: st.leafHue + type.leafHue * (d / 0.6), leafVariety: st.leafVariety * 0.5 };
  for (const k of TREE_KEYS) s[k] = type.trees.includes(k) ? st[k] + d * 2 : st[k] * (1 - d * 0.8);
  return s;
}

/** An area type's trees (bottom then top half, per variant) and then its bushes. */
export function typeSprites(st: Style, seed: number, t: number, K: number, mk: MakeCanvas): Baked[] {
  const ast = typeStyle(st, t), bk = (sp: unknown, col: unknown) => Art.bake(sp, col, st, st.outline, mk) as Baked;
  const out: Baked[] = [];
  for (let v = 0; v < TREE_VARIANTS; v++) {
    const tr = rng(seed * 13 + t * 101 + v * 7 + 1);
    const f = Art.chooseType(tr, ast) as (r: () => number, st: Style, s: number) => { sp: unknown; crownY: number };
    const tree = Art.finishTree(f(tr, ast, st.treeSize * K * Art.uni(tr, 0.85, 1.15)), ast, tr);
    const col = Art.treeColours(tr, ast, f), parts = Art.splitTree(tree);
    out.push(bk(parts.bot, col), bk(parts.top, col));
  }
  for (let v = 0; v < BUSH_VARIANTS; v++) {
    const b = Art.bush(rng(seed * 7 + t * 31 + v * 3), { ...ast, bushSize: st.bushSize * K });
    out.push(bk(b.sp, b.colours));
  }
  return out;
}
export const treeFrame = (variant: number, top: boolean) => variant * 2 + (top ? 1 : 0);
export const bushFrame = (variant: number) => TREE_VARIANTS * 2 + variant;

/** A kind of creature at each level (baby, young, legend), two walking frames each. */
export function creatureSprites(st: Style, species: string, mk: MakeCanvas): Baked[] {
  const out: Baked[] = [];
  for (let level = 0; level < 3; level++) for (let f = 0; f < 2; f++)
    out.push(Art.bake(Art.critter(species, level, f, st), Art.speciesColours(species, st), st, st.cOutline, mk) as Baked);
  return out;
}
export const creatureFrame = (level: number, f: number) => level * 2 + f;

function pixels(c: AnyCanvas, w: number, h: number): Uint8ClampedArray {
  const ctx = c.getContext("2d") as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  return ctx.getImageData(0, 0, w, h).data;
}

/** Shelf-pack the sprites; row 0 is the top of the image. */
export function packPixels(sprites: Baked[], width = 2048): AtlasPixels {
  const pad = 1, place: { x: number; y: number }[] = [];
  let x = 0, y = 0, rowH = 0, W = 1;
  for (const s of sprites) {
    if (x + s.w + pad > width) { x = 0; y += rowH + pad; rowH = 0; }
    place.push({ x, y });
    x += s.w + pad; rowH = Math.max(rowH, s.h); W = Math.max(W, x);
  }
  const H = Math.max(1, y + rowH);
  const albedo = new Uint8Array(W * H * 4), normal = new Uint8Array(W * H * 4);
  const frames: Frame[] = sprites.map((s, i) => {
    const p = place[i], pa = pixels(s.A, s.w, s.h), pn = pixels(s.N, s.w, s.h);
    for (let row = 0; row < s.h; row++) {
      const src = row * s.w * 4, dst = ((p.y + row) * W + p.x) * 4;
      albedo.set(pa.subarray(src, src + s.w * 4), dst);
      normal.set(pn.subarray(src, src + s.w * 4), dst);
    }
    return { uv: [p.x / W, p.y / H, (p.x + s.w) / W, (p.y + s.h) / H], w: s.w, h: s.h };
  });
  return { albedo, normal, width: W, height: H, frames };
}

export type ArtJob = { kind: "type"; id: number; style: Style; seed: number; K: number } | { kind: "creature"; id: string; style: Style };

export function runJob(job: ArtJob, mk: MakeCanvas): AtlasPixels {
  return job.kind === "type" ? packPixels(typeSprites(job.style, job.seed, job.id, job.K, mk)) : packPixels(creatureSprites(job.style, job.id, mk), 1024);
}
