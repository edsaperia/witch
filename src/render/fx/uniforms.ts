import * as THREE from "three";
import { gpuKind } from "../gpuLedger";
import { settings } from "./model";
const texture = () => {
  const t=gpuKind(new THREE.DataTexture(new Uint8Array(settings.fieldSize**2*4),settings.fieldSize,settings.fieldSize),"fx");
  t.minFilter=t.magFilter=THREE.NearestFilter;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.generateMipmaps=false;t.needsUpdate=true;return t;
};
export const FX_UNIFORMS = {
  uFxField: {value:texture()}, uFxExtra: {value:texture()},
  uFxBox:{value:new THREE.Vector4(0,0,settings.fieldMetres,settings.fieldSize)},
  uFxOn:{value:0}, uFxTime:{value:0}, uFxCalm:{value:0},
};
export const FX_FIELD_GLSL = /* glsl */ `
uniform sampler2D uFxField, uFxExtra;
uniform vec4 uFxBox;
uniform float uFxOn, uFxTime, uFxCalm;
vec4 fxField(vec2 p) {
  if(uFxOn<0.5 || any(lessThan(p,uFxBox.xy)) || any(greaterThanEqual(p,uFxBox.xy+uFxBox.z)))return vec4(0.0);
  return texture2D(uFxField,(floor(p/(uFxBox.z/uFxBox.w))+0.5)/uFxBox.w);
}
vec4 fxExtra(vec2 p) {
  if(uFxOn<0.5 || any(lessThan(p,uFxBox.xy)) || any(greaterThanEqual(p,uFxBox.xy+uFxBox.z)))return vec4(0.0);
  return texture2D(uFxExtra,(floor(p/(uFxBox.z/uFxBox.w))+0.5)/uFxBox.w);
}
vec3 fxTint(vec3 rgb,vec4 f) {
  float l=dot(rgb,vec3(0.3,0.55,0.15));
  rgb=mix(rgb,vec3(0.35,0.57,0.71)+l*vec3(0.59,0.41,0.29),f.r);
  rgb=mix(rgb,rgb*vec3(0.32,0.25,0.3),f.g*0.8);
  rgb*=1.0-f.b*0.25;
  return mix(rgb,rgb*vec3(0.8,1.25,0.85)+vec3(0.07,0.08,0.04),f.a*0.55);
}
`;
