import { afterEach, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { readFileSync } from 'node:fs';
import { OcclusionProbes } from './occlusion';

class Context {
  QUERY_RESULT_AVAILABLE=1; QUERY_RESULT=2;
  available=false; visible=false;
  getQueryParameter(_q: unknown, key: number) { return key===1 ? this.available : this.visible; }
  deleteQuery=vi.fn();
  getBufferSubData=vi.fn(); readPixels=vi.fn();
}
function rig() {
  vi.stubGlobal('WebGL2RenderingContext',Context);
  const gl=new Context(), scene=new THREE.Scene();
  const renderer={getContext:()=>gl,render:vi.fn(),readRenderTargetPixelsAsync:vi.fn()} as unknown as THREE.WebGLRenderer;
  const probes=new OcclusionProbes(scene,renderer,new THREE.PerspectiveCamera());
  const state=probes as unknown as {pool:Array<{pending:unknown[];answer:number;mesh:THREE.Mesh}>};
  return {gl,scene,renderer,probes,state};
}
afterEach(()=>vi.unstubAllGlobals());
it('retains scenery depth answers and eases a hidden marker away',()=>{
  const {gl,probes,state}=rig();
  probes.update(0); probes.probe('letter',1,2,3,1);
  state.pool[0].pending.push({}); gl.available=true;
  probes.update(.1);
  expect(probes.shown('letter')).toBe(0);
  expect(gl.deleteQuery).toHaveBeenCalledTimes(1);
  expect((state.pool[0].mesh.material as THREE.ShaderMaterial).depthTest).toBe(true);
  probes.on=false; expect(probes.shown('letter')).toBe(1);
});
it('never asks for an unavailable scenery answer',()=>{
  const {gl,probes,state}=rig();
  probes.probe('ring',0,0,0,1);state.pool[0].pending.push({});probes.update(0);
  expect(probes.shown('ring')).toBe(1);expect(gl.deleteQuery).not.toHaveBeenCalled();
});
it('smoke does not dim markers or cause a separate pass or pixel readback',()=>{
  const {gl,scene,renderer,probes}=rig();
  const smoke=new THREE.Mesh();scene.add(smoke);
  for(let f=0;f<120;f++) {
    smoke.visible=f%2===0;probes.update(f/60);probes.probe('letter',0,0,0,1);
    expect(probes.shown('letter')).toBe(1);
  }
  expect(renderer.render).not.toHaveBeenCalled();expect(renderer.readRenderTargetPixelsAsync).not.toHaveBeenCalled();
  expect(gl.getBufferSubData).not.toHaveBeenCalled();expect(gl.readPixels).not.toHaveBeenCalled();
  const source=readFileSync(new URL('./occlusion.ts',import.meta.url),'utf8');
  expect(source).not.toMatch(/getBufferSubData|readPixels|readRenderTargetPixels|WebGLRenderTarget|SMOKE_PUFF_GLSL/);
});
it('resets and reuses indicators without inheriting a hidden answer',()=>{
  const {probes,state}=rig();probes.probe('old',0,0,0,1);state.pool[0].answer=0;
  probes.reset();probes.probe('new',0,0,0,1);
  expect(probes.shown('new')).toBe(1);expect(probes.shown('old')).toBe(1);
});
