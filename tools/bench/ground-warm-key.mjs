import {createHash} from 'node:crypto';
/** CPU identity of shader-key inputs, not a renderer program-id/reuse proof. */
export function groundShaderKey(material){
  const raw=typeof material.customProgramCacheKey==='function'?material.customProgramCacheKey():material.customProgramCacheKey;
  // Node's unminified default method and the browser's minified one are the same hook.
  // Actual renderer cache keys are still compared byte-for-byte in the Intel reuse probe.
  const compact=raw?.replace(/\/\*[\s\S]*?\*\//g,'').replace(/\s+/g,'');
  const custom=compact==='onBeforeCompile(){}'?compact:raw;
  const defines=Object.entries(material.defines??{}).sort(([a],[b])=>a.localeCompare(b));
  return createHash('sha256').update(JSON.stringify({vertex:material.vertexShader,fragment:material.fragmentShader,defines,custom})).digest('hex');
}
