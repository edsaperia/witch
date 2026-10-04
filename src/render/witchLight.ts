// The witch lit by the world's lights (Ed: "I can go near a coloured light source and not change
// colour"). Her sprite is shaded from her atlas normals by the ambient, the moon and the point
// lights (soundsystems, campfires, rune stones, the dancefloor), but not by her own glow, which
// would wash her out. A floor keeps her readable in the dark: never darker than lightFloor times
// her unlit look. Coloured lights tint her (lightTint) and rim the edge facing them (lightRim).
import * as THREE from "three";
import { MAX_LIGHTS } from "./lighting";

/** For a sprite batch's material: on (1), floor, tint, rim. Off (x = 0) for everything but her. */
export function witchLightUniform(w?: { lightFloor: number; lightTint: number; lightRim: number }): THREE.IUniform<THREE.Vector4> {
  return { value: w ? new THREE.Vector4(1, w.lightFloor, w.lightTint, w.lightRim) : new THREE.Vector4() };
}

/** GLSL, after LIGHT_GLSL: base is her unlit colour, N her world normal, F the sprite's facing. */
export const WITCH_LIGHT_GLSL = /* glsl */ `
uniform vec4 uWitchLight; // on, floor, tint, rim
vec3 witchShade(vec3 base, vec3 N, vec3 F, vec3 P) {
  vec3 env = uAmb + uMoon * lightStep(max(0.0, dot(N, uMoonDir)));
  vec3 col = base * max(vec3(uWitchLight.y), env * 1.25);
  vec3 tint = vec3(0.0), rim = vec3(0.0);
  float edge = 1.0 - clamp(dot(N, F), 0.0, 1.0); // her outline's pixels face sideways
  for (int i = 0; i < ${MAX_LIGHTS}; i++) {
    if (i >= uLightCount) break;
    vec3 lv = uLightPos[i].xyz - P;
    float ld = length(lv), reach = uLightPos[i].w;
    if (ld >= reach) continue;
    vec3 L = lv / max(ld, 1e-4);
    float ndl = max(0.0, dot(N, L)), fall = 1.0 - ld / reach, k = fall * fall * uLightCol[i].w;
    tint += uLightCol[i].rgb * min(1.0, (ndl * 0.7 + 0.3) * k);
    rim += uLightCol[i].rgb * min(1.0, ndl * edge * k);
  }
  col += base * tint * uWitchLight.z * 1.25 + mix(base, vec3(1.0), 0.5) * rim * uWitchLight.w;
  return min(vec3(1.0), col);
}
`;
