// The forest behind the house part way through its reveal (render/post.ts Post.behind; render/forestReveal.ts). Ed, 2026-11-02:
// after waking the forest was black, then all there at once. The scene's colour background made three.js clear the picture on
// every render, autoClear or not, so the second pass (the house alone, over the veiled forest) wiped the forest and its veil, and
// any share short of 1 drew as none. Now the house alone is kept and mixed over the whole picture by what isn't yet shown. The passes are checked here on a
// stand-in renderer (no GL): what each render sees, and where it draws.
import { expect, it } from "vitest";
import * as THREE from "three";
import { HOUSE_LAYER, Post, type PostTuning } from "./post";

const tuning = { bloom: { on: false, strength: 0, threshold: 0.5 }, tone: { black: 0, gamma: 1, ambient: 1 }, suspects: { effectsLayer: false, showBroken: false }, tiltShift: { on: false, strength: 0, band: 0.5, centre: 0.5, treetop: { strength: 0, band: 0.5 } } } satisfies PostTuning;

function renders(behind: number) {
  const seen: { what: "scene" | "quad"; houseOnly: boolean; background: unknown; autoClear: boolean; clear: number; into: unknown; src?: unknown }[] = [];
  const clear = new THREE.Color(0x123456);
  const renderer = {
    autoClear: true, target: null as unknown,
    setRenderTarget(t: unknown) { this.target = t; }, getRenderTarget() { return this.target; },
    getClearColor(c: THREE.Color) { return c.copy(clear); }, getClearAlpha() { return 1; }, setClearColor(c: THREE.ColorRepresentation) { clear.set(c); },
    clearDepth() {},
    render(s: THREE.Object3D, cam: THREE.Camera) {
      const isScene = s instanceof THREE.Scene;
      const src = isScene ? undefined : ((s as THREE.Mesh).material as THREE.ShaderMaterial).uniforms.uSrc?.value;
      seen.push({ what: isScene ? "scene" : "quad", houseOnly: cam.layers.mask === 1 << HOUSE_LAYER, background: isScene ? s.background : undefined, autoClear: this.autoClear, clear: clear.getHex(), into: this.target, src });
    },
  };
  const post = new Post(renderer as unknown as THREE.WebGLRenderer, tuning);
  const scene = new THREE.Scene(), bg = new THREE.Color(0x0b0a16), camera = new THREE.PerspectiveCamera();
  scene.background = bg;
  post.behind = behind;
  post.renderSteps(scene, camera).next(); // (the first step: the scene drawn)
  return { seen, scene, bg, camera, renderer, post };
}

it("part way, keeps the house alone over black (no background to clear it), draws the whole picture, then mixes the house over it", () => {
  const { seen, scene, bg, camera, renderer, post } = renders(0.5);
  const target = post.sceneTarget, kept = (post as unknown as { a: THREE.WebGLRenderTarget }).a;
  expect(seen.map(s => s.what)).toEqual(["scene", "quad", "scene", "quad"]);
  expect(seen[0]).toMatchObject({ houseOnly: true, background: null, autoClear: true, clear: 0x000000, into: target }); // (the house alone)
  expect(seen[1]).toMatchObject({ into: kept, src: target.texture }); // (kept)
  expect(seen[2]).toMatchObject({ houseOnly: false, background: bg, into: target }); // (the whole picture, its depth left for the effects)
  expect(seen[3]).toMatchObject({ autoClear: false, into: target, src: kept.texture }); // (the house alone over it, half of it)
  expect(scene.background).toBe(bg); expect(renderer.autoClear).toBe(true); expect(camera.layers.mask).toBe(1); // (put back)
  const veil = (post as unknown as { mats: Record<string, THREE.ShaderMaterial> }).mats.veil;
  expect(veil.uniforms.uK.value).toBe(0.5); expect(veil.uniforms.uAll.value).toBe(1); expect(veil.transparent).toBe(true);
});

it("with none of the forest shown, the house alone over black (not the background's near-black)", () => {
  const { seen, scene, bg, renderer } = renders(0);
  const scenes = seen.filter(s => s.what === "scene");
  expect(scenes).toHaveLength(1);
  expect(scenes[0]).toMatchObject({ houseOnly: true, background: null, autoClear: true, clear: 0x000000 });
  expect(scene.background).toBe(bg); expect(renderer.autoClear).toBe(true);
});

it("all shown: the scene as ever, its background and all", () => {
  const { seen, bg } = renders(1);
  expect(seen.filter(s => s.what === "scene")).toEqual([expect.objectContaining({ houseOnly: false, background: bg })]);
});
