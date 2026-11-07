import { expect, it } from "vitest";
import { DECISION_LIST, applyKnobParams, currentValue, setKnob } from "../ui/decisions";
import { withTuning, TUNING } from "../rules/tuning";
import { SPRITE_UNIFORMS, SpriteBatch, treeNormalsUniform } from "./sprites";
import * as THREE from "three";

// Ed, 2026-11-07: "Make the normal maps switch." The pause toggle and its link reach the tuning, the tuning the trees' shader uniform.
it("wires the pause toggle and its link to the tree-normals uniform", () => {
  expect(TUNING.treeNormals).toBe(true); // the default look: normal maps on
  const d = DECISION_LIST.find(x => x.id === "treeNormals")!;
  expect(d.apply).toEqual({ knob: "treeNormals" });
  expect(d.control).toEqual({ type: "toggle" });
  expect(d.default).toBe(true);
  const t = withTuning({});
  expect(treeNormalsUniform(t)).toBe(1);
  setKnob(t, d.apply.knob!, false);
  expect(currentValue(d, t, new URLSearchParams())).toBe(false);
  expect(treeNormalsUniform(t)).toBe(0);
  applyKnobParams(t, new URLSearchParams("d_treeNormals=1"));
  expect(treeNormalsUniform(t)).toBe(1);
  applyKnobParams(t, new URLSearchParams("d_treeNormals=0"));
  expect(t.treeNormals).toBe(false);
  expect(treeNormalsUniform(t)).toBe(0);
  expect(treeNormalsUniform({})).toBe(1); // absent: on, as ever
});

it("lights only tree instances flat, from the shared uniform, and keeps reading the sway code", () => {
  expect(SPRITE_UNIFORMS.uTreeNormals.value).toBe(1);
  const atlas = { albedo: new THREE.Texture(), normal: new THREE.Texture(), frames: [{ x: 0, y: 0, w: 4, h: 4 }], width: 4, height: 4 } as never;
  const b = new SpriteBatch(atlas, 0.1, { scenery: true, fade: true });
  for (const m of b.meshes) {
    const mat = m.material as THREE.ShaderMaterial;
    expect(mat.uniforms.uTreeNormals).toBe(SPRITE_UNIFORMS.uTreeNormals); // shared: one value flips every batch live
    expect(mat.vertexShader).toContain("vTree = step(3.5, iFlags.z)"); // the instance's tree bit (SpriteInstance.tree: 4)
    expect(mat.fragmentShader).toMatch(/bool flatN = vTree > 0\.5 && uTreeNormals < 0\.5;\s*vec4 n = flatN \? vec4\(128\.0 \/ 255\.0, 128\.0 \/ 255\.0, 1\.0, 1\.0\) : normalAt\(uvS\);/);
  }
});
