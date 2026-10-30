import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { bridgeNativeObject, native, nativeFxUniforms, NATIVE_ON, type NativeFx } from "./native";
import { elements, forms } from "./model";
describe("native magic forms",()=>{
  it("every adapter names a real family/form and a bounded intensity",()=>{
    for(const d of Object.values(native)){
      expect(elements).toHaveProperty(d.element);expect(forms).toHaveProperty(d.form);
      expect(d.intensity).toBeGreaterThan(0);expect(d.intensity).toBeLessThanOrEqual(1);
      expect(d.light).toBeLessThanOrEqual(0.2);expect(d.anchor).toBeLessThanOrEqual(0.1);
      expect(d.preserveHue).toBe(true);
    }
  });
  it("supports early-return native shaders without inserting statements into if/else",()=>{
    const shader="void main(){if(true){gl_FragColor=vec4(1.0);return;}else{gl_FragColor=vec4(0.0);}}";
    const mat=new THREE.ShaderMaterial({fragmentShader:shader}),mesh=new THREE.Mesh(new THREE.PlaneGeometry(),mat);
    bridgeNativeObject(mesh,"flightTrail");
    expect(mat.fragmentShader).toContain("void nativeMain(){if(true){gl_FragColor=vec4(1.0);return;}else{gl_FragColor=vec4(0.0);}}");
    expect(mat.fragmentShader).toContain("void main(){nativeMain();");
    const once=mat.fragmentShader;bridgeNativeObject(mesh,"flightTrail");expect(mat.fragmentShader).toBe(once);
    expect(mat.uniforms.uNativeOn).toBe(NATIVE_ON);
  });
  it("binds each family's four-tone ramp without touching native geometry",()=>{
    for(const key of Object.keys(native) as NativeFx[]){const u=nativeFxUniforms(key);expect(u.uNativeRamp.value).toHaveLength(4);}
    const geometry=new THREE.PlaneGeometry(),mesh=new THREE.Mesh(geometry,new THREE.ShaderMaterial({fragmentShader:"void main(){gl_FragColor=vec4(1.0);}"}));
    bridgeNativeObject(mesh,"hologram");expect(mesh.geometry).toBe(geometry);
  });
});
