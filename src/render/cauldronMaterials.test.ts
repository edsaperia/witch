import { describe, expect, it, vi } from "vitest";
import * as THREE from "three";
import { cauldronMaterial, mirrorGroundLight, mirrorSpriteMaterial } from "./cauldronMaterials";

describe("Mirror Floor material isolation", () => {
  it("keeps render-target textures bound without cloneUniforms warnings", () => {
    const target = new THREE.WebGLRenderTarget(4, 4);
    const source = new THREE.ShaderMaterial({ uniforms: {
      hiz: { value: target.texture }, time: { value: 0 }, up: { value: new THREE.Vector3(0, 1, 0) },
    }, fragmentShader: "void main(){gl_FragColor=vec4(1.);}" });
    const warning = vi.spyOn(console, "warn");
    try {
      const reflection = mirrorSpriteMaterial(source), ground = cauldronMaterial(source);
      expect(warning).not.toHaveBeenCalled();
      for (const material of [reflection, ground]) {
        expect(material.uniforms).not.toBe(source.uniforms);
        expect(material.uniforms.hiz).toBe(source.uniforms.hiz);
        expect(material.uniforms.hiz.value).toBe(target.texture);
        source.uniforms.time.value = 12;
        expect(material.uniforms.time.value).toBe(12);
        material.dispose();
      }
      // Material disposal must not dispose the borrowed source texture.
      expect(source.uniforms.hiz.value).toBe(target.texture);
    } finally { warning.mockRestore(); source.dispose(); target.dispose(); }
  });

  it("never lets a reflection write the scene's depth or stencil masks", () => {
    const source = new THREE.ShaderMaterial({ stencilWrite: true, depthWrite: true, depthTest: true });
    const reflection = mirrorSpriteMaterial(source);
    expect(reflection.stencilWrite).toBe(false);
    expect(reflection.depthWrite).toBe(false);
    expect(reflection.depthTest).toBe(false);
    expect(source.stencilWrite).toBe(true);
    expect(source.depthWrite).toBe(true);
    expect(source.fragmentShader).not.toContain("cauldronShade");
    reflection.dispose(); source.dispose();
  });

  it("bounds floor brightness at 38% and leaves invalid strengths at normal brightness", () => {
    expect(mirrorGroundLight(0)).toBe(1);
    expect(mirrorGroundLight(1)).toBe(.38);
    for (const strength of [-10, .25, .5, 10, NaN, Infinity, -Infinity]) {
      const multiplier = mirrorGroundLight(strength);
      expect(multiplier).toBeGreaterThanOrEqual(.38);
      expect(multiplier).toBeLessThanOrEqual(1);
    }
    expect(mirrorGroundLight(NaN)).toBe(1);
  });
});
