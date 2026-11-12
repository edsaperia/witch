// The draw order from the world, never from the camera (Ed, 2026-11-11, from blendi's "Oil paint" on Patch: "Which of two
// overlapping strokes is on top must never depend on where the camera is, or the paint crawls as you breathe").
//
// three.js orders the things it draws by their renderOrder and then by how far the camera is from the middle of each one's
// bounding sphere (the blended ones far to near, the rest near to far, after their material). That last key moves with the
// camera: two blended things of the same renderOrder that overlap on screen (path strips of two kinds where the paths meet,
// the see-through passes of two batches, two floor decals) swapped which was on top as the camera glided past the point where
// their middles were equally far, and on the hills its lift tipped the pitch and swapped them back.
//
// Here the last key is a fixed depth along one direction of the world instead: how far the middle lies along a forward that
// looks north and down at DEPTH_PITCH, the game camera's own way of looking (it always looks north; render/view/camera.ts),
// so the order is far to near as the camera sees it, but it is the same from wherever the camera stands, and a thing's place
// in it changes only when the thing itself moves. Ties go to the order they're met in the scene, as three's own do.
// `?crawl=old`: three's own sorts, to compare.
import type * as THREE from "three";

/** The pitch (degrees below the horizon) of the fixed forward the order is taken along: the ground camera's middle zoom's. */
export const DEPTH_PITCH = 34;
const A = (DEPTH_PITCH * Math.PI) / 180, FY = -Math.sin(A), FZ = -Math.cos(A);

/** What three passes its sort functions (a render item: WebGLRenderLists). */
export interface Item { id: number; groupOrder: number; renderOrder: number; z: number; materialVariant?: number; object: THREE.Object3D; geometry: THREE.BufferGeometry | null; material: { id: number } }

/** The depth of an item along the world's fixed forward (metres; larger is farther): the middle of its bounding sphere (its own,
 *  an instanced mesh's, or its geometry's, as three takes it), placed in the world. */
export function worldDepth(object: THREE.Object3D, geometry: THREE.BufferGeometry | null): number {
  const s = (object as { boundingSphere?: THREE.Sphere | null }).boundingSphere ?? geometry?.boundingSphere ?? null;
  const c = s?.center, e = object.matrixWorld.elements;
  const x = c?.x ?? 0, y = c?.y ?? 0, z = c?.z ?? 0;
  const wy = e[1] * x + e[5] * y + e[9] * z + e[13], wz = e[2] * x + e[6] * y + e[10] * z + e[14];
  return wy * FY + wz * FZ;
}

/** Opaque things: their material (as three), then near to far along the world's forward (for the early depth test, as three's
 *  camera depth was), then the order they're met in. */
export function worldOpaqueSort(a: Item, b: Item): number {
  if (a.groupOrder !== b.groupOrder) return a.groupOrder - b.groupOrder;
  if (a.renderOrder !== b.renderOrder) return a.renderOrder - b.renderOrder;
  if (a.material.id !== b.material.id) return a.material.id - b.material.id;
  if (a.materialVariant !== b.materialVariant) return (a.materialVariant ?? 0) - (b.materialVariant ?? 0);
  const da = worldDepth(a.object, a.geometry), db = worldDepth(b.object, b.geometry);
  if (da !== db) return da - db;
  return a.id - b.id;
}

/** Blended things: far to near along the world's forward, then the order they're met in. */
export function worldTransparentSort(a: Item, b: Item): number {
  if (a.groupOrder !== b.groupOrder) return a.groupOrder - b.groupOrder;
  if (a.renderOrder !== b.renderOrder) return a.renderOrder - b.renderOrder;
  const da = worldDepth(a.object, a.geometry), db = worldDepth(b.object, b.geometry);
  if (da !== db) return db - da;
  return a.id - b.id;
}

/** Whether the link asks for the crawl as it was (`?crawl=old`, to compare): three's own camera-depth sorts, and the camera's
 *  pixel snap taken up the screen (render/view/camera.ts placeCamera). Read once. */
const CRAWL_OLD = typeof location !== "undefined" && new URLSearchParams(location.search).get("crawl") === "old";
export const crawlOld = (): boolean => CRAWL_OLD;

/** The renderer's sorts set to the world's (none of it under `?crawl=old`). */
export function useWorldOrder(renderer: THREE.WebGLRenderer, old = crawlOld()): void {
  if (old) return;
  renderer.setOpaqueSort(worldOpaqueSort as unknown as (a: unknown, b: unknown) => number);
  renderer.setTransparentSort(worldTransparentSort as unknown as (a: unknown, b: unknown) => number);
}
