// The treehouse's furniture drawn as art (Ed, 2026-10-23; art/furniture.js) in place of render/houseRooms.ts's plain boxes: every
// object of the house baked by its id and its footprint (config/house/: w, d, h), never by where it stands, so the house's layout
// can move it; turned to face its room's middle (`standing`), drawn in its state (`furnitureState`: none now). Baked
// and lit once (the creator's room's way, ui/creator.ts roomSteps: art/core.js bake, then art/lighting.js shade with its own lights),
// a piece a frame, the nearest her first, then drawn as a flat picture in the house's plane (as the boxes were: render/houseRooms.ts
// toWorld), its floor's middle on the object's middle. `?furniture=0` draws the boxes as before, to compare.
import * as THREE from "three";
import * as Art from "../../art/generator.js";
import { furnitureSprite, furnitureColours, FURNITURE_IDS } from "../../art/furniture.js";
import type { Game } from "../rules/game";
import { shade } from "../../art/lighting.js";
import { HOUSE_ROOMS, fromPlan, type HouseObject } from "../rules/houseRooms";
import type { Style } from "./style";

type Light = { x: number; y: number; z: number; R: number; rgb: number[]; power: number };
type Piece = { w: number; h: number; m: Uint8Array; n: Float32Array | number[]; put: unknown };
export type Drawn = { sp: Piece; origin: { x: number; y: number }; lights: Light[]; marks?: Record<string, { x: number; y: number }> };

/** Whether the house's objects are drawn as art (`?furniture=0`: the boxes, as before). */
export const furnitureOn = typeof location === "undefined" || new URLSearchParams(location.search).get("furniture") !== "0";
/** House objects drawn by someone else's art, never as furniture nor as a box: the clothes pile by her bed (Golf's, from her outfit:
 *  art/witch.js clothesPileSprite). */
export const DRAWN_ELSEWHERE = new Set<string>(["clothesPile"]);
/** House objects still boxes until their art is drawn (a new object's placeholder: add its id here, take it off with its art). */
export const PENDING = new Set<string>([]);
/** The objects drawn as art. */
export const FURNITURE = new Set<string>(furnitureOn ? FURNITURE_IDS : []);

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

function canvas(w: number, h: number): HTMLCanvasElement { const c = document.createElement("canvas"); c.width = w; c.height = h; c.getContext("2d", { willReadFrequently: true }); return c; }

/** A drawn piece (art/furniture.js modelSprite's), baked in a room's colours (times `dim`: a rug, flat to the light, darker) and lit by
 *  its own lights: its canvas. `over`: colours by material over the room's (her broom's, render/workshopArt.ts). */
export function litCanvas(d: Drawn, room: string, st: Style, dim = 1, id = "", over: Record<string, number[]> = {}): HTMLCanvasElement {
  const colours = Object.fromEntries(Object.entries({ ...furnitureColours(st, room, id), ...over }).map(([k, c]) => [k, dim === 1 ? c : (c as number[]).map(v => Math.round(v * dim))]));
  const b = (Art.bake as (sp: unknown, c: object, st: Style, outline: unknown, mk: typeof canvas) => { A: HTMLCanvasElement; N: HTMLCanvasElement; w: number; h: number })(d.sp, colours, { ...st, styleInterior: false } as unknown as Style, (st as unknown as { cOutline: unknown }).cOutline, canvas);
  const lit = canvas(b.w, b.h);
  shade({ a: b.A.getContext("2d")!, n: b.N.getContext("2d")!, w: b.w, h: b.h }, lit, roomLight(st), d.lights, null);
  // (its alpha as the albedo's: shade leaves the empty pixels as it found them)
  const A = b.A.getContext("2d")!.getImageData(0, 0, b.w, b.h).data, img = lit.getContext("2d")!.getImageData(0, 0, b.w, b.h), L = img.data;
  for (let i = 3; i < L.length; i += 4) L[i] = A[i] ? 255 : 0;
  lit.getContext("2d")!.putImageData(img, 0, 0);
  return lit;
}
/** A canvas as the house's texture: an art pixel a texel, its colours as they are. */
export function pixelTexture(c: HTMLCanvasElement): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(c);
  tex.magFilter = tex.minFilter = THREE.NearestFilter; tex.generateMipmaps = false; tex.colorSpace = THREE.NoColorSpace; tex.flipY = false;
  return tex;
}

/** One object's picture, baked and lit: its texture, its size in art pixels, where its floor's middle is on it; marks: named points
 *  of the piece in its picture's pixels (art/furniture.js: the mic's spot lamp). */
export interface FurnitureArt { tex: THREE.CanvasTexture; w: number; h: number; ox: number; oy: number; marks: Record<string, { x: number; y: number }>;
  /** Its top as drawn: the highest row of its pixels, at the middle of its pixels' width (a pin over it clears it: render/pins.ts). */
  top: { x: number; y: number } }
export function bakeFurniture(o: HouseObject, st: Style, ppm: number, pitch: number, state?: string): FurnitureArt {
  const { yaw, foot, curve } = standing(o);
  const d = furnitureSprite(o.id, foot, st, { ppm, pitch, yaw, state, curve }) as Drawn, lit = litCanvas(d, o.room, st, 1, o.id);
  return { tex: pixelTexture(lit), w: lit.width, h: lit.height, ox: d.origin.x, oy: d.origin.y, marks: d.marks ?? {}, top: drawnTop(lit) };
}

/** A picture's top as drawn: its highest row with a pixel in it, at the middle of its pixels' width (its whole top, empty). */
function drawnTop(c: HTMLCanvasElement): { x: number; y: number } {
  const A = c.getContext("2d")!.getImageData(0, 0, c.width, c.height).data;
  let y0 = -1, x0 = c.width, x1 = -1;
  for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) if (A[(y * c.width + x) * 4 + 3]) { if (y0 < 0) y0 = y; x0 = Math.min(x0, x); x1 = Math.max(x1, x); }
  return y0 < 0 ? { x: c.width / 2, y: 0 } : { x: (x0 + x1 + 1) / 2, y: y0 };
}

/** The state an object is drawn in now (art/furniture.js FURNITURE_STATES): none in the oak's house (its bedroom's curtains, shut
 *  while she woke, are gone: Ed, 2026-10-24), each piece as it is. */
export function furnitureState(_id: string, _g: Pick<Game, "wake">): string | undefined {
  return undefined;
}
