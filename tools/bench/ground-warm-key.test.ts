import {expect,it} from 'vitest';
import {ShaderMaterial} from 'three';
import {groundShaderKey} from './ground-warm-key.mjs';
it('keeps the recipe key stable across Node and minified browser default hooks',()=>{
  const material=new ShaderMaterial({vertexShader:'v',fragmentShader:'f',defines:{GROUND_SPECIALIZED:''}});
  const browser={vertexShader:'v',fragmentShader:'f',defines:{GROUND_SPECIALIZED:''},customProgramCacheKey:'onBeforeCompile(){}'};
  expect(groundShaderKey(material)).toBe(groundShaderKey(browser));material.dispose();
});
it('distinguishes coast defines and the actual coast shader source',()=>{
  const plain={vertexShader:'v',fragmentShader:'plain',defines:{GROUND_SPECIALIZED:''}};
  expect(groundShaderKey(plain)).not.toBe(groundShaderKey({...plain,defines:{...plain.defines,GROUND_BEACH:''}}));
  expect(groundShaderKey(plain)).not.toBe(groundShaderKey({...plain,fragmentShader:'coast'}));
});
