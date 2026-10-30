// Whole helpers moved from artBuild; drawing bodies are unchanged.
import { runSync, type Steps } from "./slices";
import { indexPlane } from "./palette";
import type { AnyCanvas, AtlasPixels, Baked, Frame } from "./artBuild";

export function pixels(c: AnyCanvas, w: number, h: number): Uint8ClampedArray {
  const ctx = c.getContext("2d") as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  return ctx.getImageData(0, 0, w, h).data;
}

/** Shelf-pack the sprites; row 0 is the top of the image. */
export const packPixels = (sprites: Baked[], width = 2048): AtlasPixels => runSync(packSteps(sprites, width));

/** packPixels as steps (render/slices.ts): a step every few sprites. */
export function* packSteps(sprites: Baked[], width = 2048): Steps<AtlasPixels> {
  const pad = 1, place: { x: number; y: number }[] = [], first = new Map<Baked, number>(); // (a sprite given twice is packed once: her preview's frames, render/homeArt.ts)
  let x = 0, y = 0, rowH = 0, W = 1;
  for (const [i, s] of sprites.entries()) {
    const was = first.get(s);
    if (was !== undefined) { place.push(place[was]); continue; }
    first.set(s, i);
    if (x + s.w + pad > width) { x = 0; y += rowH + pad; rowH = 0; }
    place.push({ x, y });
    x += s.w + pad; rowH = Math.max(rowH, s.h); W = Math.max(W, x);
  }
  const H = Math.max(1, y + rowH);
  const albedo = new Uint8Array(W * H * 4), normal = new Uint8Array(W * H * 4);
  const frames: Frame[] = [];
  for (let i = 0; i < sprites.length; i++) {
    if (i && i % 4 === 0) yield;
    const s = sprites[i], was = first.get(s)!;
    if (was !== i) { frames.push(frames[was]); continue; }
    const p = place[i], pa = pixels(s.A, s.w, s.h), pn = pixels(s.N, s.w, s.h);
    const sd = s.S ? pixels(s.S, s.w, s.h) : null, sway = sd ? Array.from({ length: s.h }, (_, row) => Array.from({ length: s.w }, (_, x) => sd[(row * s.w + x) * 4 + 1])) : null; // G: the pixel-wind code (art/sway.js swayCode)
    for (let row = 0; row < s.h; row++) {
      const src = row * s.w * 4, dst = ((p.y + row) * W + p.x) * 4;
      albedo.set(pa.subarray(src, src + s.w * 4), dst);
      if (s.eyes) for (let x = 0; x < s.w; x++) if (s.eyes[row * s.w + x] && albedo[dst + x * 4 + 3] === 255) albedo[dst + x * 4 + 3] = 253;
      normal.set(pn.subarray(src, src + s.w * 4), dst);
      if (s.S) { const ps = sway![row]; for (let x = 0; x < s.w; x++) if (normal[dst + x * 4 + 3]) normal[dst + x * 4 + 3] = ps[x]; } // after the normals: the mask in their alpha
    }
    // Its lowest drawn row (the sprite shader drops alpha under a half).
    let pad = 0;
    bottom: for (let row = s.h - 1; row >= 0; row--, pad++) for (let x = 0; x < s.w; x++) if (pa[(row * s.w + x) * 4 + 3] >= 128) break bottom;
    // And how far that row reaches from the middle, either way.
    let foot = 0;
    if (pad < s.h) { const row = s.h - 1 - pad; for (let x = 0; x < s.w; x++) if (pa[(row * s.w + x) * 4 + 3] >= 128) foot = Math.max(foot, Math.abs(x + 0.5 - s.w / 2) + 0.5); }
    frames.push({ uv: [p.x / W, p.y / H, (p.x + s.w) / W, (p.y + s.h) / H], w: s.w, h: s.h, pad: Math.min(pad, s.h), ...(foot ? { foot } : {}), ...(s.S ? { masked: true } : {}), ...(s.head ? { head: s.head } : {}) });
  }
  // Each plane as palette indices where it can be (render/palette.ts: a quarter of the bytes, the colours exact).
  yield;
  const a = indexPlane(albedo);
  yield;
  const n = indexPlane(normal);
  return { albedo: a?.idx ?? albedo, normal: n?.idx ?? normal, albedoPal: a?.pal ?? null, normalPal: n?.pal ?? null, width: W, height: H, frames };
}
