import * as THREE from 'three';
import { GroundWarm, type GroundWarmLocation } from '../app/groundWarm';
import { startGroundPrep } from '../app/mapPrep';
import { offerTravelSeed } from '../app/travelSeeds';
import { groundProgramMaterial } from './ground';
import { materialProgramsReady } from './shaderDrawGate';
import type { View } from './view';
const note = (stage: string, detail: object = {}) => { try { performance.mark(`ground:warm-${stage}`, {detail}); } catch { /* diagnostics unavailable */ } };
/** No compileAsync: its private timer would poll after the eligibility gate closed. */
export function warmGroundPrograms(view: View, eligible: () => boolean, world: () => number) {
  const renderer = view.renderer, gl = renderer.getContext();
  let lost = false;
  const supported = !!gl.getExtension('KHR_parallel_shader_compile');
  const allowed = () => supported && !lost && !gl.isContextLost() && eligible();
  const controller = new GroundWarm(allowed, (id: string) => {
    const seed = offerTravelSeed(world(), id); note('prepare', {id,seed,world:world()});
    return startGroundPrep(id, world(), seed);
  }, (defines: Record<string, string>) => {
    if (!allowed() || !('GROUND_SPECIALIZED' in defines) || !Object.keys(defines).every(k => k.startsWith('GROUND_') && defines[k] === '')) return null;
    const material = groundProgramMaterial(defines, view.ground.programMaterial.uniforms), source = view.ground.programMaterial;
    for (const key of ['vertexShader','fragmentShader','precision','side','shadowSide','transparent','alphaTest','alphaHash','toneMapped','fog','lights','glslVersion','vertexColors'] as const) {
      // This shared factory also builds the real coast material, whose fragment is intentionally different.
      if(key==='fragmentShader'&&'GROUND_BEACH' in defines)continue;
      if (material[key] !== source[key]) { material.dispose(); note('skip', {reason:key}); return null; }
    }
    if (material.customProgramCacheKey() !== source.customProgramCacheKey()) { material.dispose(); return null; }
    const scene = new THREE.Scene(), mesh = new THREE.Mesh(view.ground.mesh.geometry, material);
    mesh.frustumCulled = false; scene.add(mesh);
    if (!allowed()) { material.dispose(); return null; }
    try {
      renderer.compile(scene, view.camera, view.scene);
      const properties = renderer.properties.get(material) as {programs?: Map<string, {id:number}>};
      const keys = [...(properties.programs?.keys() ?? [])];
      if (keys.length !== 1) { material.dispose(); note('skip', {reason:'ambiguous-program-key'}); return null; }
      note('submit', {keys,defines,programs:[...(properties.programs?.values() ?? [])].map(p => p.id)});
    } catch { material.dispose(); note('skip', {reason:'compile-failed'}); return null; }
    return { ready() { if (!allowed()) return false; note('poll'); return materialProgramsReady(renderer.properties.get(material)); }, dispose() { material.dispose(); } };
  });
  const onLost = () => { lost = true; controller.dispose(); note('context-lost'); };
  renderer.domElement.addEventListener('webglcontextlost', onLost);
  return {
    get status() { return controller.status; },
    tick(context: string, targets: readonly string[], location?: GroundWarmLocation) { controller.tick(context, targets, location); },
    pause() { controller.pause(); },
    dispose() { renderer.domElement.removeEventListener('webglcontextlost', onLost); controller.dispose(); },
  };
}
