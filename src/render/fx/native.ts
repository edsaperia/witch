// Native forms keep their geometry and identity hues; the common family controls their ramp/intensity.
import * as THREE from "three";
import native from "../../../config/fx/native.json";
import { elements, type FxElement } from "./model";
export { native };
export type NativeFx = keyof typeof native;
export const NATIVE_ON={value:1};
export function nativeFxUniforms(feature:NativeFx):Record<string,THREE.IUniform>{
  const d=native[feature],el=elements[d.element as FxElement];
  return {uNativeOn:NATIVE_ON,uNativeRamp:{value:el.ramp.map(c=>new THREE.Vector3((parseInt(c.slice(1),16)>>16)/255,((parseInt(c.slice(1),16)>>8)&255)/255,(parseInt(c.slice(1),16)&255)/255))},
    uNativeStyle:{value:new THREE.Vector2(d.intensity,d.preserveHue?1:0)}};
}
export const NATIVE_GLSL=/* glsl */ `
uniform float uNativeOn;uniform vec3 uNativeRamp[4];uniform vec2 uNativeStyle;
vec3 nativeFxColour(vec3 c){
  if(uNativeOn<0.5)return c;
  float l=max(c.r,max(c.g,c.b));if(l<0.00001)return c;
  vec3 band=l<0.2?uNativeRamp[0]:l<0.45?uNativeRamp[1]:l<0.75?uNativeRamp[2]:uNativeRamp[3];
  if(uNativeStyle.y>0.5)band=c/l*max(band.r,max(band.g,band.b));
  // Retain the native form's falloff and authored hue; quantise its light toward the family's ramp.
  return mix(c,band*min(1.0,l*1.2),0.18*uNativeStyle.x);
}`;
export function bridgeNativeObject(object:THREE.Object3D,feature:NativeFx):void{
  object.traverse(o=>{
    const material=(o as THREE.Mesh).material;
    for(const mat of Array.isArray(material)?material:[material]){
      if(!(mat instanceof THREE.ShaderMaterial)||mat.userData.nativeFx)return;
      if(!/void\s+main\s*\(/.test(mat.fragmentShader))continue;
      mat.fragmentShader=NATIVE_GLSL+mat.fragmentShader.replace(/void\s+main\s*\(/,"void nativeMain(")+"\nvoid main(){nativeMain();gl_FragColor.rgb=nativeFxColour(gl_FragColor.rgb);}\n";
      Object.assign(mat.uniforms,nativeFxUniforms(feature));mat.userData.nativeFx=feature;mat.needsUpdate=true;
    }
  });
}
