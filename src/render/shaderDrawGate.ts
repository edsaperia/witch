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
export function installShaderDrawGate(renderer: THREE.WebGLRenderer, status: ShaderDrawStatus, fallbackFor: (object: THREE.Object3D) => THREE.Material | null): void {
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
    draw(camera, scene, geometry, material, object, group);
  };
}
