// The treehouse's furniture drawn as art (Ed, 2026-10-23; art/furniture.js) in place of render/houseRooms.ts's plain boxes: each piece
// baked by its id and its footprint (config/house.json: w, d, h), never by where it stands, so the house's layout can move it. Its
// back goes to the nearest of its room's walls, its front turned away from it (the hub's free-standing crystal ball, to the camera),
// drawn at that turn. Baked and lit once (the creator's room's way, ui/creator.ts roomSteps: art/core.js bake, then art/lighting.js
// shade with its own lights), a piece a frame as she first comes in, then drawn as a flat picture in the house's plane (as the boxes are: render/houseRooms.ts toWorld), its
// floor's middle on the object's middle. The mock (Ed's four: the bed, the wardrobe, the dressing table, the crystal ball); `?furniture=0`
// draws the boxes as before, to compare.
import * as THREE from "three";
import * as Art from "../../art/generator.js";
import { furnitureSprite, furnitureColours, FURNITURE_IDS } from "../../art/furniture.js";
import { shade } from "../../art/lighting.js";
import { HOUSE_ROOMS, fromPlan, type HouseObject } from "../rules/houseRooms";
import type { Style } from "./style";

type Light = { x: number; y: number; z: number; R: number; rgb: number[]; power: number };
type Piece = { w: number; h: number; m: Uint8Array; n: Float32Array | number[]; put: unknown };
type Drawn = { sp: Piece; origin: { x: number; y: number }; lights: Light[] };

/** Whether the house's objects are drawn as art (`?furniture=0`: the boxes, as before). */
export const furnitureOn = typeof location === "undefined" || new URLSearchParams(location.search).get("furniture") !== "0";
/** How much bigger than its footprint a piece is drawn (`?furnitureScale=1.6`: to try them nearer her size; 1, house.json's). */
const furnitureScale = typeof location === "undefined" ? 1 : Number(new URLSearchParams(location.search).get("furnitureScale")) || 1;
/** The objects drawn as art. */
export const FURNITURE = new Set<string>(furnitureOn ? FURNITURE_IDS : []);

/** Which way an object stands: its front away from the wall of its room it backs on (the nearest; a free-standing one, in no room
 *  of the plan's, the hub's, towards the camera), as the art's yaw (art/furniture.js: 0 facing the camera, south), and its footprint as
 *  the art takes it, w along that wall. A piece never shows its back: against a near wall (x0 or z1 at the plan's 45°, cut down to its
 *  skirting) it's drawn as against the far wall opposite, for now. */
export function standing(o: HouseObject): { yaw: number; foot: { w: number; d: number; h: number } } {
  const r = HOUSE_ROOMS.rooms.find(q => q.id === o.room);
  if (!r) return { yaw: 0, foot: { w: o.w, d: o.d, h: o.h } };
  const gaps = { x1: r.x1 - (o.x + o.w / 2), z0: o.z - o.d / 2 - r.z0, x0: o.x - o.w / 2 - r.x0, z1: r.z1 - (o.z + o.d / 2) };
  const wall = (Object.keys(gaps) as (keyof typeof gaps)[]).reduce((a, b) => (gaps[b] < gaps[a] ? b : a));
  const alongX = wall === "x1" || wall === "x0", face = alongX ? (wall === "x1" ? [-1, 0] : [1, 0]) : wall === "z0" ? [0, 1] : [0, -1];
  // (its facing on the plan into the world, east and south, turned to the camera's side; then the yaw that turns the model's front,
  // +z, that way: render's +z goes to (-sin yaw, cos yaw))
  const p = fromPlan({ x: 0, z: 0 }, face[0], face[1]), f = p.z < -1e-6 ? [-p.x, -p.z] : [p.x, p.z];
  return { yaw: Math.atan2(-f[0], f[1]), foot: alongX ? { w: o.d, d: o.w, h: o.h } : { w: o.w, d: o.d, h: o.h } };
}

/** The room's own light for its furniture (the creator's room's: a dim cool night, the warm things in it). */
const roomLight = (st: Style): Style => ({ ...st, ambient: .85, ambientHue: .09, moon: .4, shafts: 0, dither: 0 } as Style);

function canvas(w: number, h: number): HTMLCanvasElement { const c = document.createElement("canvas"); c.width = w; c.height = h; c.getContext("2d", { willReadFrequently: true }); return c; }

/** One object's picture, baked and lit: its canvas, its size in art pixels, where its floor's middle is on it. */
export interface FurnitureArt { tex: THREE.CanvasTexture; w: number; h: number; ox: number; oy: number }
export function bakeFurniture(o: HouseObject, st: Style, ppm: number, pitch: number): FurnitureArt {
  const { yaw, foot: f } = standing(o), k = furnitureScale, foot = { w: f.w * k, d: f.d * k, h: f.h * k };
  const d = furnitureSprite(o.id, foot, st, { ppm, pitch, yaw }) as Drawn;
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
