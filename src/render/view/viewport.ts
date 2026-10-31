// A4 mechanical extraction from src/render/view.ts; body identity is checked by tools/refactor/a4-split.mjs.
import type { View, ViewInternals, ViewShared } from "../view";
import * as THREE from "three";
import { bendPoint, groundHeight } from "../height";
import { SPRITE_UNIFORMS } from "../sprites";
import { chunkyPixelSize, potionStrength } from "../potionEffects";

export function scenePixelSize(view: View, _internals: ViewInternals, _shared: ViewShared): number {
    const t = view.game.tuning, dpr = typeof devicePixelRatio === 'number' && devicePixelRatio > 0 ? devicePixelRatio : 1;
    const p0 = t.pixelSize * view.pixelScale;
    const base = t.pixels?.snap !== false && view.pixelScale === 1 ? Math.max(1, Math.round(p0 * dpr)) / dpr : p0;
    return chunkyPixelSize(base, dpr, potionStrength(view.game, 'chunky'));
  }

export function resize(view: View, internals: ViewInternals, _shared: ViewShared, cssW: number, cssH: number): void {
    internals.pixelViewport = { w: cssW, h: cssH };
    // (to the nearest whole number of device pixels, Ed's pick: 4 at 1.25, 5 at 1.5; not through the telescope, finer by design)
    const p = internals.scenePixelSize();
    view.cssPixel = p;
    view.width = Math.max(1, Math.ceil(cssW / p));
    view.height = Math.max(1, Math.ceil(cssH / p));
    // The canvas holds the low-resolution picture, which the browser scales up with nearest-neighbour.
    view.renderer.setSize(view.width, view.height, false);
    view.post.resize(view.width, view.height, view.width, view.height);
    view.canvas.style.width = view.width * p + "px";
    view.canvas.style.height = view.height * p + "px";
    view.camera.aspect = view.width / view.height;
    view.camera.updateProjectionMatrix();
    SPRITE_UNIFORMS.uRes.value.set(view.width, view.height);
  }

export function screenOf(view: View, _internals: ViewInternals, _shared: ViewShared, x: number, y: number, z: number, world: NonNullable<Parameters<View["screenOf"]>[3]>): [number, number] {
    const p = view.v3.set(x, world ? y : y + groundHeight(x, z), z);
    bendPoint(p).project(view.camera);
    return [p.x, p.y];
  }

export function aimAt(view: View, internals: ViewInternals, _shared: ViewShared, clientX: number, clientY: number): { x: number; z: number } | null {
    const r = view.canvas.getBoundingClientRect(), w = view.game.witch;
    if (!r.width || !r.height) return null;
    internals.aimRay.setFromCamera(new THREE.Vector2(((clientX - r.left) / r.width) * 2 - 1, 1 - ((clientY - r.top) / r.height) * 2), view.camera);
    const at = internals.aimRay.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), -(groundHeight(w.x, w.z) + 1)), view.v3);
    return at ? { x: at.x - w.x, z: at.z - w.z } : null;
  }
