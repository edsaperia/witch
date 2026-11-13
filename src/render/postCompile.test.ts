// Post.compile makes the programs of everything it draws outside the scene ahead, the sharp mask's coverage materials among them
// (render/leash/glyphs.ts maskOf: her sigil stack kept out of the tilt-shift). Ed, 2026-11-12, live v7872: "Just had a very long
// freeze when taking off from the treehouse after a sail": the sail's dive path draws nothing ahead, so the night's mask program
// was made and linked on the page's thread when her stack was first shown, on the rise to the treetops (tools/stall/sail-takeoff.cjs).
// Checked on a stand-in renderer (no GL): what's compiled, and into which target (three keys a program by the target's colour space).
import { expect, it } from "vitest";
import * as THREE from "three";
import { Post, type PostTuning } from "./post";

const tuning = { bloom: { on: false, strength: 0, threshold: 0.5 }, tone: { black: 0, gamma: 1, ambient: 1 }, suspects: { effectsLayer: false, showBroken: false }, tiltShift: { on: true, strength: 1, band: 0.5, centre: 0.5, treetop: { strength: 1, band: 0.5 } } } satisfies PostTuning;

it("compiles the sharp mask's materials into the mask's own target, as drawSharp draws them, and leaves the target as it was", async () => {
  const compiled: { materials: THREE.Material[]; into: unknown }[] = [], before = { name: "the canvas's" };
  const renderer = {
    target: before as unknown,
    setRenderTarget(t: unknown) { this.target = t; }, getRenderTarget() { return this.target; },
    compileAsync(s: THREE.Object3D) { const materials: THREE.Material[] = []; s.traverse(o => { if ((o as THREE.Mesh).isMesh) materials.push((o as THREE.Mesh).material as THREE.Material); }); compiled.push({ materials, into: this.target }); return Promise.resolve(); },
  };
  const post = new Post(renderer as unknown as THREE.WebGLRenderer, tuning);
  const mask = new THREE.ShaderMaterial({ defines: { MASK: "" } }), stack = new THREE.Mesh(new THREE.InstancedBufferGeometry(), new THREE.ShaderMaterial());
  stack.visible = false; // (no stack shown yet: on the ground)
  post.sharp = [{ mesh: stack, mask }];
  await post.compile();
  const sharpMask = (post as unknown as { sharpMask: THREE.WebGLRenderTarget }).sharpMask;
  expect(compiled.find(c => c.materials.includes(mask))?.into).toBe(sharpMask);
  expect(renderer.target).toBe(before);
  expect(compiled.some(c => c.materials.length > 0 && c.into === before)).toBe(true); // (the passes, as before)
});
