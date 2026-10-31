import { expect, it } from 'vitest';
import * as THREE from 'three';
import { installShaderDrawGate, materialProgramsReady, type ShaderDrawStatus } from './shaderDrawGate';

it('uses the warmed ground fallback and skips effects before any unfinished uniform read or draw', () => {
  let ready = false, unsafeReads = 0;
  const ground = new THREE.ShaderMaterial(), fallback = new THREE.ShaderMaterial(), effect = new THREE.ShaderMaterial();
  const object = new THREE.Mesh(), decor = new THREE.Mesh();
  const properties = new Map([[ground, { currentProgram: { id: 1, isReady: () => ready } }], [fallback, { currentProgram: { id: 2, isReady: () => true } }]]);
  const calls: THREE.Material[] = [];
  const renderer = { properties: { get: (m: THREE.ShaderMaterial) => properties.get(m) ?? {} }, renderBufferDirect: (_c: unknown, _s: unknown, _g: unknown, material: THREE.Material) => {
    if (material === ground && !ready) { unsafeReads++; throw Error('would force getUniforms'); } calls.push(material);
  } } as unknown as THREE.WebGLRenderer;
  const status: ShaderDrawStatus = { active: true, skipped: {}, fallback: {} };
  installShaderDrawGate(renderer, status, o => o === object ? fallback : null);
  const draw = (material: THREE.Material, o = object) => renderer.renderBufferDirect(new THREE.Camera(), new THREE.Scene(), new THREE.BufferGeometry(), material, o, { start: 0, count: 3, materialIndex: 0 });
  draw(ground); draw(effect, decor);
  expect(calls).toEqual([fallback]); expect(unsafeReads).toBe(0);
  expect(Object.keys(status.fallback)).toHaveLength(1); expect(Object.keys(status.skipped)).toHaveLength(1);
  ready = true; draw(ground); expect(calls).toEqual([fallback, ground]);
  status.active = false; draw(effect, decor); expect(calls.at(-1)).toBe(effect);
});

it('requires every compiled variant to be ready and never treats missing program metadata as ready', () => {
  expect(materialProgramsReady({})).toBe(false);
  expect(materialProgramsReady({ programs: new Map([['plain', { id: 1, isReady: () => true }], ['beach', { id: 2, isReady: () => false }]]) })).toBe(false);
});
