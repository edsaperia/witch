// The treehouse's furniture drawn as art (Ed, 2026-10-23; art/furniture.js) in place of render/houseRooms.ts's plain boxes: every
// object of the house baked by its id and its footprint (config/house.json: w, d, h), never by where it stands, so the house's layout
// can move it; turned to face its room's middle (`standing`), drawn in its state (`furnitureState`: the curtains open or shut). Baked
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
type Drawn = { sp: Piece; origin: { x: number; y: number }; lights: Light[] };

/** Whether the house's objects are drawn as art (`?furniture=0`: the boxes, as before). */
export const furnitureOn = typeof location === "undefined" || new URLSearchParams(location.search).get("furniture") !== "0";
/** House objects drawn by someone else's art, never as furniture nor as a box: the clothes pile by her bed (Golf's, from her outfit:
 *  art/witch.js clothesPileSprite). */
export const DRAWN_ELSEWHERE = new Set<string>(["clothesPile"]);
/** House objects still boxes until their art is drawn (a new object's placeholder: add its id here, take it off with its art). */
export const PENDING = new Set<string>(["drumKit", "synthRack", "microphone"]); // (the Studio's instruments: Alpha's art in #1025)
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

/** One object's picture, baked and lit: its canvas, its size in art pixels, where its floor's middle is on it. */
export interface FurnitureArt { tex: THREE.CanvasTexture; w: number; h: number; ox: number; oy: number }
export function bakeFurniture(o: HouseObject, st: Style, ppm: number, pitch: number, state?: string): FurnitureArt {
  const { yaw, foot, curve } = standing(o);
  const d = furnitureSprite(o.id, foot, st, { ppm, pitch, yaw, state, curve }) as Drawn;
  const b = (Art.bake as (sp: unknown, c: object, st: Style, outline: unknown, mk: typeof canvas) => { A: HTMLCanvasElement; N: HTMLCanvasElement; w: number; h: number })(d.sp, furnitureColours(st, o.room), { ...st, styleInterior: false } as unknown as Style, (st as unknown as { cOutline: unknown }).cOutline, canvas);
  const lit = canvas(b.w, b.h);
  shade({ a: b.A.getContext("2d")!, n: b.N.getContext("2d")!, w: b.w, h: b.h }, lit, roomLight(st), d.lights, null);
  // (its alpha as the albedo's: shade leaves the empty pixels as it found them)
  const A = b.A.getContext("2d")!.getImageData(0, 0, b.w, b.h).data, img = lit.getContext("2d")!.getImageData(0, 0, b.w, b.h), L = img.data;
  for (let i = 3; i < L.length; i += 4) L[i] = A[i] ? 255 : 0;
  lit.getContext("2d")!.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(lit);
  tex.magFilter = tex.minFilter = THREE.NearestFilter; tex.generateMipmaps = false; tex.colorSpace = THREE.NoColorSpace; tex.flipY = false;
  return { tex, w: b.w, h: b.h, ox: d.origin.x, oy: d.origin.y };
}

/** The state an object is drawn in now (art/furniture.js FURNITURE_STATES): the bedroom's curtains shut while she wakes (rules/wakeUp.ts:
 *  until they've opened), open after. */
export function furnitureState(id: string, g: Pick<Game, "wake">): string | undefined {
  if (id === "curtains") return g.wake && !g.wake.open ? "shut" : "open";
  return undefined;
}
