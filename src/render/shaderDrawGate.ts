import type * as THREE from 'three';
import type { ReadyProgram } from './programReadiness';

/** No uniform/log query: KHR readiness alone decides whether submission is safe. Unknown variants stay hidden. */
export function materialProgramsReady(value: unknown): boolean {
  const properties = value as { currentProgram?: ReadyProgram; programs?: Map<string, ReadyProgram> } | null;
  if (!properties) return false;
  const programs = properties.programs ? [...properties.programs.values()] : properties.currentProgram ? [properties.currentProgram] : [];
  return programs.length > 0 && programs.every(p => p.isReady());
}

export interface ShaderDrawStatus { active: boolean; skipped: Record<string, number>; fallback: Record<string, number>; submitted?: Record<string, number> }
/** `drawn`: told of every draw that goes through with its own material (a linked program, or the gate off), not a stand-in's: what
 *  the loading mist waits for (render/view/mistReady.ts; Ed, 2026-11-06: "Make sure things load and render before the mist
 *  disappears"). */
export function installShaderDrawGate(renderer: THREE.WebGLRenderer, status: ShaderDrawStatus, fallbackFor: (object: THREE.Object3D) => THREE.Material | null, drawn?: (object: THREE.Object3D, material: THREE.Material, geometry: THREE.BufferGeometry) => void): void {
  const draw = renderer.renderBufferDirect.bind(renderer);
  renderer.renderBufferDirect = (camera, scene, geometry, material, object, group) => {
    if (status.active && !materialProgramsReady(renderer.properties.get(material))) {
      const fallback = fallbackFor(object), label = `${object.name || object.type}#${object.id}:${material.name || material.type}`;
      if (fallback && materialProgramsReady(renderer.properties.get(fallback))) {
        status.fallback[label] = (status.fallback[label] ?? 0) + 1;
        draw(camera, scene, geometry, fallback, object, group);
      } else status.skipped[label] = (status.skipped[label] ?? 0) + 1;
      return;
    }
    if (status.active) {
      const label = `${object.name || object.type}#${object.id}:${material.name || material.type}`;
      const submitted = status.submitted ??= {}; submitted[label] = (submitted[label] ?? 0) + 1;
    }
    drawn?.(object, material, geometry);
    draw(camera, scene, geometry, material, object, group);
  };
}

/** How many of a draw's instances there are (1 for a plain mesh; an instanced mesh's count, or its geometry's). */
export function instancesOf(object: THREE.Object3D, geometry: THREE.BufferGeometry): number {
  const o = object as THREE.Object3D & { isInstancedMesh?: boolean; count?: number }, g = geometry as THREE.BufferGeometry & { isInstancedBufferGeometry?: boolean; instanceCount?: number };
  if (o.isInstancedMesh) return o.count ?? 0;
  if (g.isInstancedBufferGeometry) return Number.isFinite(g.instanceCount) ? g.instanceCount ?? 0 : 1;
  return 1;
}
