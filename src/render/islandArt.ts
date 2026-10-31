// Two of the island build's own drawings, as pure art (no Three.js, no page), so the art workers can draw them while the page goes on
// (render/slices.ts; Ed's laptop, 2026-10-20: the View's island build was one 10 s task): the dancefloor's looks (render/ground.ts)
// and an island's runestones (render/markers.ts). On the page (no workers, or a build run straight through) they're drawn the same way.
import * as Art from "./islandArt.primitives";
import type { Baked, MakeCanvas } from "./artBuild";
import type { Style } from "./style";

type AnyCanvas = HTMLCanvasElement | OffscreenCanvas;
type Ctx = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
const ctx = (c: AnyCanvas): Ctx => c.getContext("2d", { willReadFrequently: true }) as Ctx;

/** The dancefloor's looks: the unlit floor with its rim (the base) and the lit tile at its three intensities side by side (lit),
 *  white for the shader to tint; and the art's grid. */
export interface DiscoDrawn { base: AnyCanvas; lit: AnyCanvas; pitch: number; size: number; gridOrigin: number; rimOuter: number; radius: number }

/** The dancefloor's looks drawn (art/dancefloor.js): the base, then each lit tile. */
export function discoDrawn(st: Style, mk: MakeCanvas = Art.defaultCanvas as MakeCanvas): DiscoDrawn {
  const fb = Art.discoFloorBase() as { sp: unknown; size: number; pitch: number; gridOrigin: number; rimOuter: number };
  const base = (Art.bake(fb.sp, { ...Art.discoColours(3), ...Art.discoRimColours() }, st, "none", mk) as { A: AnyCanvas }).A;
  const lit = mk(42, 14), g = ctx(lit);
  for (let k = 1; k <= 3; k++) g.drawImage((Art.bake(Art.discoTileSprite("lit", { level: k }), Art.discoColours(k), st, "none", mk) as { A: AnyCanvas }).A as CanvasImageSource, (k - 1) * 14, 0);
  return { base, lit, pitch: fb.pitch, size: fb.size, gridOrigin: fb.gridOrigin, rimOuter: fb.rimOuter, radius: Art.DISCO_RADIUS as number };
}

/** A canvas's pixels and size (to send from a worker). */
export interface CanvasPixels { px: Uint8ClampedArray; w: number; h: number }
export const canvasPixels = (c: AnyCanvas): CanvasPixels => ({ px: ctx(c).getImageData(0, 0, c.width, c.height).data, w: c.width, h: c.height });
/** A canvas made from them (on the page). */
export function pixelCanvas(p: CanvasPixels, mk: MakeCanvas = Art.defaultCanvas as MakeCanvas): AnyCanvas {
  const c = mk(p.w, p.h), g = ctx(c), img = g.createImageData(p.w, p.h);
  img.data.set(p.px);
  g.putImageData(img, 0, 0);
  return c;
}

/** One runestone of an island's: its species' sigil on its form (art/areas.js runeStone). */
export interface StoneSpec { sigil: string; form?: number; flip?: boolean; /** Its rune baked in each of these colours (0-255) in turn, every glow level each (rank sigils: render/markers.ts); else its sigil's. */ colours?: number[][] }

/** An island's runestones (in order), each at every glow level (the rune's glowing pixels in its sigil's colour), and how many art
 *  pixels each stands above its frame's bottom. */
export function stoneSprites(st: Style, stones: StoneSpec[], levels: number[], scale: number, mk: MakeCanvas = Art.defaultCanvas as MakeCanvas): { sprites: Baked[]; heights: number[] } {
  const sprites: Baked[] = [], heights: number[] = [];
  for (const s of stones) {
    const base = (Art.runeStone as unknown as (st: Style, o: object) => Baked)(st, { glow: "cyan", sigil: s.sigil, scale, makeCanvas: mk, ...(s.form !== undefined ? { form: s.form, flip: s.flip } : {}) });
    heights.push(drawnHeight(base.A));
    for (const c of s.colours ?? [Art.sigilColour(s.sigil) as number[]]) for (const k of levels) sprites.push(recolour(base, c, k, mk));
  }
  return { sprites, heights };
}

// Rows from the topmost drawn pixel to the lowest (sprites stand on their lowest drawn pixel).
function drawnHeight(c: AnyCanvas): number {
  const d = ctx(c).getImageData(0, 0, c.width, c.height).data;
  let top = -1, bottom = -1;
  for (let i = 3; i < d.length; i += 4) if (d[i] > 0) { const y = Math.floor((i >> 2) / c.width); if (top < 0) top = y; bottom = y; }
  return top < 0 ? 0 : bottom - top + 1;
}

// The rune's glowing pixels (alpha 254) in the sigil's colour, by their brightness, times k; the brightest toward white, times rgb[3]
// where given (0: an unlit rune, render/leash/ranks.ts EMPTY_STONE_RGB).
function recolour(b: Baked, rgb: number[], k: number, mk: MakeCanvas): Baked {
  const c = mk(b.w, b.h), g = ctx(c);
  g.drawImage(b.A as CanvasImageSource, 0, 0);
  const img = g.getImageData(0, 0, b.w, b.h), d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] !== 254) continue;
    const lum = Math.max(d[i], d[i + 1], d[i + 2]) / 255, white = Math.max(0, lum - 0.75) * 2.4 * (rgb[3] ?? 1);
    for (let j = 0; j < 3; j++) d[i + j] = Math.min(255, (rgb[j] * (1 - white) + 255 * white) * lum * k);
  }
  g.putImageData(img, 0, 0);
  return { ...b, A: c };
}

/** The sea's creatures (render/kraken.ts, render/dolphins.ts): the kraken's tentacle frames then its head's, or the dolphin's leap
 *  frames then its splash's; each frame's origin (its foot on the water; none for a splash). */
export function seaSprites(kind: "kraken" | "dolphins", st: Style, mk: MakeCanvas = Art.defaultCanvas as MakeCanvas): { sprites: Baked[]; origins: { x: number; y: number }[] } {
  const sprites: Baked[] = [], origins: { x: number; y: number }[] = [], out = (st as { cOutline?: string }).cOutline;
  type Sp = { origin: { x: number; y: number } };
  if (kind === "kraken") {
    const D = Art.KRAKEN as { frames: number; headFrames: number }, col = Art.krakenColours() as Record<number, number[]>;
    const bakeOf = (sp: Sp) => { origins.push(sp.origin); sprites.push(Art.bake(sp as never, col, st as never, out, mk) as Baked); };
    for (let frame = 0; frame < D.frames; frame++) bakeOf((Art.krakenTentacle as unknown as (s: never, o: object) => Sp)(st as never, { frame }));
    for (let frame = 0; frame < D.headFrames; frame++) bakeOf((Art.krakenHead as unknown as (s: never, o: object) => Sp)(st as never, { frame }));
  } else {
    const D = Art.DOLPHIN as { frames: number; splashFrames: number }, col = Art.dolphinColours() as Record<number, number[]>;
    for (let frame = 0; frame < D.frames; frame++) { const sp = (Art.dolphinSprite as unknown as (s: never, o: object) => Sp)(st as never, { frame }); origins.push(sp.origin); sprites.push(Art.bake(sp as never, col, st as never, out, mk) as Baked); }
    for (let frame = 0; frame < D.splashFrames; frame++) sprites.push(Art.bake((Art.dolphinSplash as unknown as (s: never, o: object) => never)(st as never, { frame }), col, st as never, "none", mk) as Baked);
  }
  return { sprites, origins };
}
