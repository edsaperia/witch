import * as THREE from "three";

/** Keep borrowed render-target textures and live uniforms by reference. ShaderMaterial.clone()
 * calls cloneUniforms(), which cannot copy render-target textures (X-ray, PR #1472). */
export function cauldronMaterial(source: THREE.ShaderMaterial): THREE.ShaderMaterial {
  const material = new THREE.ShaderMaterial({
    vertexShader: source.vertexShader, fragmentShader: source.fragmentShader,
    uniforms: { ...source.uniforms }, defines: { ...source.defines },
    glslVersion: source.glslVersion, lights: source.lights, clipping: source.clipping,
    extensions: { ...source.extensions }, uniformsGroups: source.uniformsGroups,
  });
  // Copy common render state only. Calling ShaderMaterial.copy would clone uniforms again.
  THREE.Material.prototype.copy.call(material, source);
  return material;
}

export function mirrorGroundLight(strength: number): number {
  const k = Number.isFinite(strength) ? Math.max(0, Math.min(1, strength)) : 0;
  return 1 - .62 * k;
}

export function mirrorSpriteMaterial(source: THREE.ShaderMaterial): THREE.ShaderMaterial {
  const material = cauldronMaterial(source);
  material.fragmentShader = "uniform float cauldronStrength;\n" + source.fragmentShader.replace("void main()", "void cauldronShade()")
    + "\nvoid main(){cauldronShade();gl_FragColor.rgb*=.48;gl_FragColor.a*=.55*cauldronStrength;}";
  material.depthTest = false; material.depthWrite = false; material.stencilWrite = false;
  material.transparent = true; material.side = THREE.DoubleSide;
  return material;
}
