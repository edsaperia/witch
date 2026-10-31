import { expect, it } from 'vitest';
import * as THREE from 'three';
import { captureProgramUses, mapProgramUses, shaderSignature } from './programInventory';

it('retains original hidden ancestry and stable sources after compilation reveals objects', () => {
  const root = new THREE.Group(), hidden = new THREE.Group(); hidden.visible = false; root.add(hidden);
  const material = new THREE.ShaderMaterial({ fragmentShader: 'void main() {}', uniforms: { z: { value: 1 }, a: { value: 2 } } });
  const mesh = new THREE.Mesh(undefined, material); hidden.add(mesh);
  const uses = captureProgramUses([{ label: 'scene', root }]); hidden.visible = true;
  const mapped = mapProgramUses(uses, () => 83);
  expect(mapped[83].visibleUses).toBe(0);
  expect(mapped[83].uses[0].path).toBe('scene/0:Group/0:Mesh');
  expect(mapped[83].uses[0].uniforms).toEqual(['a', 'z']);
  expect(mapped[83].uses[0].fragment).toBe(shaderSignature('void main() {}'));
  expect(material.fragmentShader).toBe('void main() {}');
});

it('bounds listed uses while retaining complete visibility counts and ignores unmapped materials', () => {
  const root = new THREE.Group(), material = new THREE.ShaderMaterial();
  for (let i = 0; i < 20; i++) root.add(new THREE.Mesh(undefined, material));
  const uses = captureProgramUses([{ label: 'scene', root }]);
  expect(mapProgramUses(uses, () => undefined)).toEqual({});
  const row = mapProgramUses(uses, () => 4)[4];
  expect(row.totalUses).toBe(20); expect(row.visibleUses).toBe(20); expect(row.uses).toHaveLength(12);
});
