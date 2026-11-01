// A4 mechanical extraction from src/render/view.ts; body identity is checked by tools/refactor/a4-split.mjs.
import type { View, ViewInternals, ViewShared } from "../view";
import * as THREE from "three";
import { bendPoint, groundHeight } from "../height";
import { SPRITE_UNIFORMS } from "../sprites";
import { chunkyPixelSize, potionStrength } from "../potionEffects";

export function scenePixelSize(a4ViewHost: View, _a4PrivateHost: ViewInternals, _a4SharedHost: ViewShared): number {
    const t = a4ViewHost.game.tuning, dpr = typeof devicePixelRatio === 'number' && devicePixelRatio > 0 ? devicePixelRatio : 1;
    const p0 = t.pixelSize * a4ViewHost.pixelScale;
    const base = t.pixels?.snap !== false && a4ViewHost.pixelScale === 1 ? Math.max(1, Math.round(p0 * dpr)) / dpr : p0;
    return chunkyPixelSize(base, dpr, potionStrength(a4ViewHost.game, 'chunky'));
  }

export function resize(a4ViewHost: View, a4PrivateHost: ViewInternals, _a4SharedHost: ViewShared, cssW: number, cssH: number): void {
    a4PrivateHost.pixelViewport = { w: cssW, h: cssH };
    // (to the nearest whole number of device pixels, Ed's pick: 4 at 1.25, 5 at 1.5; not through the telescope, finer by design)
    const p = a4PrivateHost.scenePixelSize();
    a4ViewHost.cssPixel = p;
    a4ViewHost.width = Math.max(1, Math.ceil(cssW / p));
    a4ViewHost.height = Math.max(1, Math.ceil(cssH / p));
    // The canvas holds the low-resolution picture, which the browser scales up with nearest-neighbour.
    a4ViewHost.renderer.setSize(a4ViewHost.width, a4ViewHost.height, false);
    a4ViewHost.post.resize(a4ViewHost.width, a4ViewHost.height, a4ViewHost.width, a4ViewHost.height);
    a4ViewHost.canvas.style.width = a4ViewHost.width * p + "px";
    a4ViewHost.canvas.style.height = a4ViewHost.height * p + "px";
    a4ViewHost.camera.aspect = a4ViewHost.width / a4ViewHost.height;
    a4ViewHost.camera.updateProjectionMatrix();
    SPRITE_UNIFORMS.uRes.value.set(a4ViewHost.width, a4ViewHost.height);
  }

export function screenOf(a4ViewHost: View, _a4PrivateHost: ViewInternals, _a4SharedHost: ViewShared, x: number, y: number, z: number, world: NonNullable<Parameters<View["screenOf"]>[3]>): [number, number] {
    const p = a4ViewHost.v3.set(x, world ? y : y + groundHeight(x, z), z);
    bendPoint(p).project(a4ViewHost.camera);
    return [p.x, p.y];
  }

export function aimAt(a4ViewHost: View, a4PrivateHost: ViewInternals, _a4SharedHost: ViewShared, clientX: number, clientY: number): { x: number; z: number } | null {
    const r = a4ViewHost.canvas.getBoundingClientRect(), w = a4ViewHost.game.witch;
    if (!r.width || !r.height) return null;
    a4PrivateHost.aimRay.setFromCamera(new THREE.Vector2(((clientX - r.left) / r.width) * 2 - 1, 1 - ((clientY - r.top) / r.height) * 2), a4ViewHost.camera);
    const at = a4PrivateHost.aimRay.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), -(groundHeight(w.x, w.z) + 1)), a4ViewHost.v3);
    return at ? { x: at.x - w.x, z: at.z - w.z } : null;
  }
