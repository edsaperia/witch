// The house's furniture and its rooms' dressing as pixels (render/houseFurniture.ts, render/houseDecor.ts): each piece drawn by its
// id and footprint (art/furniture.js) or each room's dressing laid as one picture (art/houseDecor.js), baked in its room's colours and
// lit by its own lights, on whatever canvas `mk` makes. No three.js and no page here, so the art workers run it (render/artBuild.ts,
// the "housePiece" job), not the page's thread: Ed's playtest of v4515 ("stuck_walking_down") had each piece baked on the page as she
// came within 30 m of it, a frame of 120 to 220 ms each on his laptop, every second or so as she walked the house.
import * as Art from "../../art/generator.js";
import { furnitureSprite, furnitureColours } from "../../art/furniture.js";
import { decorSprite } from "../../art/houseDecor.js";
import { SIZE } from "../../art/furniture.js";
import { shade } from "../../art/lighting.js";
import { HOUSE_ROOMS, fromPlan, type HouseObject } from "../rules/houseRooms";
import { decorPlan, RUG_DIM } from "./houseDecor";
import type { Style } from "./style";

type AnyCanvas = HTMLCanvasElement | OffscreenCanvas;
export type MakeCanvas = (w: number, h: number) => AnyCanvas;
type Light = { x: number; y: number; z: number; R: number; rgb: number[]; power: number };
type Piece = { w: number; h: number; m: Uint8Array; n: Float32Array | number[]; put: unknown };
export type Drawn = { sp: Piece; origin: { x: number; y: number }; lights: Light[]; marks?: Record<string, { x: number; y: number }> };
/** A piece's picture as pixels: its size in art pixels, where its floor's middle is on it, and its named points (art/furniture.js:
 *  the mic's spot lamp). */
export interface PiecePixels { px: Uint8ClampedArray; w: number; h: number; ox: number; oy: number; marks: Record<string, { x: number; y: number }> }

const ctx2d = (c: AnyCanvas) => c.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D;

/** Which way an object stands: its front towards its room's middle (as rules/houseRooms.ts objectFront has her stand to use it), as
 *  the art's yaw (art/furniture.js: 0 facing the camera, south), and its footprint as the art takes it: w along the wall it backs on,
 *  taken from house.json's box by the way it mostly faces (its box's w runs along the plan's x). One in its room's middle, or in no
 *  room (the Terrace), faces the camera. A piece never shows its back: one facing away from the camera is turned to face it. */
export function standing(o: HouseObject): { yaw: number; foot: { w: number; d: number; h: number }; curve: number } {
  const r = HOUSE_ROOMS.rooms.find(q => q.id === o.room), dx = r ? (r.x0 + r.x1) / 2 - o.x : 0, dz = r ? (r.z0 + r.z1) / 2 - o.z : 0, L = Math.hypot(dx, dz);
  const alongX = Math.abs(dx) > Math.abs(dz), foot = alongX ? { w: o.d, d: o.w, h: o.h } : { w: o.w, d: o.d, h: o.h };
  if (L < 1.2) return { yaw: 0, foot, curve: 0 };
  // (its facing on the plan into the world, east and south, turned to the camera's side; then the yaw that turns the model's front,
  // +z, that way: render's +z goes to (-sin yaw, cos yaw))
  const p = fromPlan({ x: 0, z: 0 }, dx / L, dz / L), f = p.z < 0 ? [p.x, -p.z] : [p.x, p.z];
  // (in a round room, the wall it backs on is an arc: its back that far from the middle; art/furniture.js bends the long pieces round it)
  return { yaw: Math.atan2(-f[0], f[1]), foot, curve: r?.r ? L + foot.d / 2 : 0 };
}

/** The room's own light for its furniture (the creator's room's: a dim cool night, the warm things in it). */
const roomLight = (st: Style): Style => ({ ...st, ambient: .85, ambientHue: .09, moon: .4, shafts: 0, dither: 0 } as Style);

/** A drawn piece (art/furniture.js modelSprite's), baked in a room's colours (times `dim`: a rug, flat to the light, darker) and lit by
 *  its own lights: its canvas. `over`: colours by material over the room's (her broom's, render/workshopArt.ts). */
export function litCanvas(d: Drawn, room: string, st: Style, mk: MakeCanvas, dim = 1, id = "", over: Record<string, number[]> = {}): AnyCanvas {
  const colours = Object.fromEntries(Object.entries({ ...furnitureColours(st, room, id), ...over }).map(([k, c]) => [k, dim === 1 ? c : (c as number[]).map(v => Math.round(v * dim))]));
  const b = (Art.bake as (sp: unknown, c: object, st: Style, outline: unknown, mk: MakeCanvas) => { A: AnyCanvas; N: AnyCanvas; w: number; h: number })(d.sp, colours, { ...st, styleInterior: false } as unknown as Style, (st as unknown as { cOutline: unknown }).cOutline, mk);
  const lit = mk(b.w, b.h);
  shade({ a: ctx2d(b.A), n: ctx2d(b.N), w: b.w, h: b.h }, lit, roomLight(st), d.lights, null);
  // (its alpha as the albedo's: shade leaves the empty pixels as it found them)
  const A = ctx2d(b.A).getImageData(0, 0, b.w, b.h).data, img = ctx2d(lit).getImageData(0, 0, b.w, b.h), L = img.data;
  for (let i = 3; i < L.length; i += 4) L[i] = A[i] ? 255 : 0;
  ctx2d(lit).putImageData(img, 0, 0);
  return lit;
}

const pixelsOf = (c: AnyCanvas) => ctx2d(c).getImageData(0, 0, c.width, c.height).data;

/** One object's picture (by its id), baked and lit, at the house's pixel (`ppm`, art pixels a metre) and view (`pitch`), in `state`
 *  (art/furniture.js FURNITURE_STATES); null for an id the house hasn't. */
export function furniturePiece(id: string, st: Style, ppm: number, pitch: number, mk: MakeCanvas, state?: string): PiecePixels | null {
  const o = HOUSE_ROOMS.objects.find(q => q.id === id);
  if (!o) return null;
  const { yaw, foot, curve } = standing(o);
  const d = furnitureSprite(o.id, foot, st, { ppm, pitch, yaw, state, curve }) as Drawn, lit = litCanvas(d, o.room, st, mk, 1, o.id);
  return { px: pixelsOf(lit), w: lit.width, h: lit.height, ox: d.origin.x, oy: d.origin.y, marks: d.marks ?? {} };
}

/** A room's dressing (by its id) as one picture: each piece drawn (art/houseDecor.js, at the house's pixel and view), baked in the
 *  room's colours and lit by its own lights, then laid on one canvas at its place (the rug first, then far to near); its origin the
 *  room's middle on the floor. Null for a room with none. */
export function roomDecorPiece(roomId: string, st: Style, ppm: number, pitch: number, mk: MakeCanvas): PiecePixels | null {
  const room = HOUSE_ROOMS.rooms.find(r => r.id === roomId);
  const items = room ? decorPlan(room) : [];
  if (!room || !items.length) return null;
  const ky = Math.sin(pitch) * ppm, drawn = items.map(it => {
    const d = decorSprite(it.kind, it.k, st, { ppm, pitch, yaw: it.yaw, ...(it.r ? { r: it.r / SIZE } : {}) }) as Drawn, c = litCanvas(d, room.id, st, mk, it.kind === "rug" ? RUG_DIM : 1);
    return { it, c, left: it.x * ppm - d.origin.x, top: it.z * ky - d.origin.y };
  });
  const x0 = Math.floor(Math.min(...drawn.map(q => q.left))), y0 = Math.floor(Math.min(...drawn.map(q => q.top)));
  const w = Math.ceil(Math.max(...drawn.map(q => q.left + q.c.width))) - x0, h = Math.ceil(Math.max(...drawn.map(q => q.top + q.c.height))) - y0;
  const out = mk(w, h), g = ctx2d(out);
  g.imageSmoothingEnabled = false;
  for (const q of [...drawn].sort((a, b) => (a.it.kind === "rug" ? -1 : b.it.kind === "rug" ? 1 : a.it.z - b.it.z))) g.drawImage(q.c as CanvasImageSource, Math.round(q.left - x0), Math.round(q.top - y0));
  return { px: pixelsOf(out), w, h, ox: -x0, oy: -y0, marks: {} };
}

/** A piece by its key in render/houseRooms.ts: "decor:<room>" a room's dressing, else "<object id>|<state>". */
export function housePiece(key: string, st: Style, ppm: number, pitch: number, mk: MakeCanvas): PiecePixels | null {
  if (key.startsWith("decor:")) return roomDecorPiece(key.slice(6), st, ppm, pitch, mk);
  const [id, state] = key.split("|");
  return furniturePiece(id, st, ppm, pitch, mk, state || undefined);
}
