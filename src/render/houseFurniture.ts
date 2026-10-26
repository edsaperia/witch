// The treehouse's furniture drawn as art (Ed, 2026-10-23; art/furniture.js) in place of render/houseRooms.ts's plain boxes: every
// object of the house baked by its id and its footprint (config/house/: w, d, h), never by where it stands, so the house's layout
// can move it; turned to face its room's middle (`standing`), drawn in its state (`furnitureState`: none now). Baked
// and lit once (the creator's room's way, ui/creator.ts roomSteps: art/core.js bake, then art/lighting.js shade with its own lights)
// by the art workers (render/housePieces.ts, the "housePiece" job), all asked as the house first shows, the nearest her first, then
// drawn as a flat picture in the house's plane (as the boxes were: render/houseRooms.ts toWorld), its floor's middle on the object's
// middle. `?furniture=0` draws the boxes as before, to compare.
import * as THREE from "three";
import { FURNITURE_IDS } from "../../art/furniture.js";
import type { Game } from "../rules/game";
import type { Style } from "./style";
import { housePiece, litCanvas as piecesLit, type Drawn, type PiecePixels } from "./housePieces";
export { standing, type Drawn } from "./housePieces";

/** Whether the house's objects are drawn as art (`?furniture=0`: the boxes, as before). */
export const furnitureOn = typeof location === "undefined" || new URLSearchParams(location.search).get("furniture") !== "0";
/** House objects drawn by someone else's art, never as furniture nor as a box: the clothes pile by her bed (Golf's, from her outfit:
 *  art/witch.js clothesPileSprite). */
export const DRAWN_ELSEWHERE = new Set<string>(["clothesPile"]);
/** House objects still boxes until their art is drawn (a new object's placeholder: add its id here, take it off with its art). */
export const PENDING = new Set<string>([]);
/** The objects drawn as art. */
export const FURNITURE = new Set<string>(furnitureOn ? FURNITURE_IDS : []);

/** A drawn piece baked and lit on the page's own canvas (render/housePieces.ts litCanvas): the dream's and the Workshop's. */
export const litCanvas = (d: Drawn, room: string, st: Style, dim = 1, id = "", over: Record<string, number[]> = {}): HTMLCanvasElement =>
  piecesLit(d, room, st, pageCanvas, dim, id, over) as HTMLCanvasElement;
function pageCanvas(w: number, h: number): HTMLCanvasElement { const c = document.createElement("canvas"); c.width = w; c.height = h; c.getContext("2d", { willReadFrequently: true }); return c; }
/** A canvas as the house's texture: an art pixel a texel, its colours as they are. */
export function pixelTexture(c: HTMLCanvasElement): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(c);
  tex.magFilter = tex.minFilter = THREE.NearestFilter; tex.generateMipmaps = false; tex.colorSpace = THREE.NoColorSpace; tex.flipY = false;
  return tex;
}

/** One object's picture, baked and lit: its texture, its size in art pixels, where its floor's middle is on it; marks: named points
 *  of the piece in its picture's pixels (art/furniture.js: the mic's spot lamp). */
export interface FurnitureArt { tex: THREE.Texture; w: number; h: number; ox: number; oy: number; marks: Record<string, { x: number; y: number }>;
  /** Its top as drawn: the highest row of its pixels, at the middle of its pixels' width (a pin over it clears it: render/pins.ts). */
  top: { x: number; y: number } }
/** A picture's top as drawn (its RGBA pixels, w across): its highest row with a pixel in it, at the middle of its pixels' width
 *  (an empty one, its top's middle). */
export function drawnTop(px: ArrayLike<number>, w: number, h: number): { x: number; y: number } {
  let y0 = -1, x0 = w, x1 = -1;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (px[(y * w + x) * 4 + 3]) { if (y0 < 0) y0 = y; x0 = Math.min(x0, x); x1 = Math.max(x1, x); }
  return y0 < 0 ? { x: w / 2, y: 0 } : { x: (x0 + x1 + 1) / 2, y: y0 };
}
/** A piece's pixels (render/housePieces.ts, from the art workers) as the house's texture: an art pixel a texel, its colours as they are. */
export function pieceArt(p: PiecePixels): FurnitureArt {
  const tex = new THREE.DataTexture(p.px, p.w, p.h, THREE.RGBAFormat);
  tex.magFilter = tex.minFilter = THREE.NearestFilter; tex.generateMipmaps = false; tex.colorSpace = THREE.NoColorSpace; tex.flipY = false; tex.needsUpdate = true;
  return { tex, w: p.w, h: p.h, ox: p.ox, oy: p.oy, marks: p.marks, top: drawnTop(p.px, p.w, p.h) };
}
/** A piece (by its key: render/housePieces.ts housePiece) baked here on the page: without the art workers (the tests). */
export function bakePieceHere(key: string, st: Style, ppm: number, pitch: number): FurnitureArt | null {
  const p = housePiece(key, st, ppm, pitch, pageCanvas);
  return p ? pieceArt(p) : null;
}

/** The state an object is drawn in now (art/furniture.js FURNITURE_STATES): none in the oak's house (its bedroom's curtains, shut
 *  while she woke, are gone: Ed, 2026-10-24), each piece as it is. */
export function furnitureState(_id: string, _g: Pick<Game, "wake">): string | undefined {
  return undefined;
}
