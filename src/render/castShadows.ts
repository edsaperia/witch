// Cast shadows on what stands in them (Ed, 2026-10-13: "shadows should darken the things that they land on - I think we did this for
// grass but it should be everything"): the trunks', palms' and scenery's shadows (render/trunkShadows.ts) lie flat on the ground,
// multiplied over it, but anything standing in one (a creature, the witch, a bush, a prop, a piece of scenery) hid them and stood
// there full bright. So once a frame they're drawn again, from straight above, into a small map of the ground round her (white where
// there's none, their colour multiplied where there is), and the sprites (render/sprites.ts) multiply each pixel by the map at its own
// ground spot: its foot, across its width, so a creature half in a tree's shadow is dark on that half. Only the cast shadows go in:
// the blobs under things (render/shadows.ts) would darken what stands on them.
import * as THREE from "three";
import { HEIGHT_UNIFORMS } from "./height";

/** The layer the cast shadows' meshes are drawn on for the map, besides the scene's own. */
export const CAST_LAYER = 3;
/** The map (white: no shadow) and its window: its west edge x, south edge z, metres across, on (1) or off (0). */
export const CAST_SHADOW_UNIFORMS = {
  uCastMap: { value: null as THREE.Texture | null },
  uCastWin: { value: new THREE.Vector4(0, 0, 1, 0) },
};
/** GLSL: castShadow(xz), the cast shadows' colour on the ground at xz (white where there are none, or past the map's edge, eased
 *  to white over its last tenth so nothing pops in or out at the edge). */
export const CAST_SHADOW_GLSL = /* glsl */ `
uniform sampler2D uCastMap;
uniform vec4 uCastWin;
vec3 castShadow(vec2 xz) {
  if (uCastWin.w <= 0.0) return vec3(1.0);
  vec2 uv = vec2(xz.x - uCastWin.x, uCastWin.y - xz.y) / uCastWin.z;
  vec2 e = min(uv, 1.0 - uv);
  float k = smoothstep(0.0, 0.1, min(e.x, e.y));
  if (k <= 0.0) return vec3(1.0);
  return mix(vec3(1.0), texture2D(uCastMap, uv).rgb, k);
}
`;

export class CastShadowMap {
  private rt: THREE.WebGLRenderTarget;
  private cam: THREE.OrthographicCamera;
  private clear = new THREE.Color();

  /** size: metres across; res: texels across. */
  constructor(private size = 160, private res = 1024) {
    this.rt = new THREE.WebGLRenderTarget(res, res, { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: false, stencilBuffer: false, generateMipmaps: false });
    const h = size / 2;
    this.cam = new THREE.OrthographicCamera(-h, h, h, -h, 1, 2000);
    this.cam.up.set(0, 0, -1); // (looking straight down: screen right is east, screen up is north)
    this.cam.layers.set(CAST_LAYER);
    CAST_SHADOW_UNIFORMS.uCastMap.value = this.rt.texture;
  }

  /** Draw the cast shadows round (x, z) into the map; off: the map unused (the sprites skip it). */
  render(renderer: THREE.WebGLRenderer, scene: THREE.Scene, x: number, z: number, on: boolean): void {
    const W = CAST_SHADOW_UNIFORMS.uCastWin.value;
    if (!on) { W.w = 0; return; }
    const texel = this.size / this.res, cx = Math.round(x / texel) * texel, cz = Math.round(z / texel) * texel; // (on the texel grid: no crawl)
    this.cam.position.set(cx, 1000, cz);
    this.cam.lookAt(cx, 0, cz);
    this.cam.updateMatrixWorld();
    const bend = HEIGHT_UNIFORMS.uBend.value.x, bg = scene.background, prev = renderer.getRenderTarget(), alpha = renderer.getClearAlpha();
    renderer.getClearColor(this.clear);
    HEIGHT_UNIFORMS.uBend.value.x = 0; // (flat: the bend is the view's, not the ground's)
    scene.background = null;
    renderer.setRenderTarget(this.rt);
    renderer.setClearColor(0xffffff, 1);
    renderer.clear(true, false, false);
    renderer.render(scene, this.cam);
    renderer.setRenderTarget(prev);
    renderer.setClearColor(this.clear, alpha);
    scene.background = bg;
    HEIGHT_UNIFORMS.uBend.value.x = bend;
    W.set(cx - this.size / 2, cz + this.size / 2, this.size, 1);
  }

  dispose(): void { this.rt.dispose(); }
}
