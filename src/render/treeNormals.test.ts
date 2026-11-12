import { expect, it } from "vitest";
import { DECISION_LIST, applyKnobParams, currentValue, setKnob } from "../ui/decisions";
import { withTuning, TUNING } from "../rules/tuning";
import { SPRITE_UNIFORMS, SpriteBatch, treeNormalDirections, treeNormalsUniform } from "./sprites";
import * as THREE from "three";

// Ed, 2026-11-07: "Make the normal maps switch.", then "Normal maps do improve things, can we try a low number (16? 32? 64?)". The
// pause choice and its link reach the tuning, the tuning the trees' shader uniform and their palette's size (render/treeNormalDirs.ts).
it("wires the pause choice and its link to the tree-normals uniform and directions", () => {
  expect(TUNING.treeNormals).toBe("32"); // the default look since Ed, 2026-11-12: "we can see 32 tree normal maps as the default"
  const d = DECISION_LIST.find(x => x.id === "treeNormals")!;
  expect(d.apply).toEqual({ knob: "treeNormals" });
  expect(d.control).toEqual({ type: "choice", options: [{ value: "full", label: "Full" }, { value: "64", label: "64" }, { value: "32", label: "32" }, { value: "16", label: "16" }, { value: "0", label: "Off" }] });
  expect(d.default).toBe("32");
  const t = withTuning({});
  expect([treeNormalsUniform(t), treeNormalDirections(t)]).toEqual([1, 32]);
  for (const [v, dirs, u] of [["64", 64, 1], ["32", 32, 1], ["16", 16, 1], ["0", -1, 0], ["full", 0, 1]] as const) {
    setKnob(t, d.apply.knob!, v);
    expect(currentValue(d, t, new URLSearchParams())).toBe(v);
    expect([treeNormalDirections(t), treeNormalsUniform(t)]).toEqual([dirs, u]);
  }
  applyKnobParams(t, new URLSearchParams("d_treeNormals=0")); // (the switch's old link: still off)
  expect(t.treeNormals).toBe("0");
  expect(treeNormalsUniform(t)).toBe(0);
  applyKnobParams(t, new URLSearchParams("d_treeNormals=32"));
  expect(treeNormalDirections(t)).toBe(32);
  applyKnobParams(t, new URLSearchParams("d_treeNormals=1")); // (the old link's on: not a choice, so the default)
  expect(t.treeNormals).toBe("32");
  expect([treeNormalDirections(t), treeNormalsUniform(t)]).toEqual([32, 1]);
  expect([treeNormalDirections({}), treeNormalsUniform({})]).toEqual([0, 1]); // absent: full, as ever
  expect(treeNormalDirections({ treeNormals: false as never })).toBe(-1); // (the switch's old value)
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
