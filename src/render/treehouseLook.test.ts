import { expect, it } from "vitest";
import * as THREE from "three";
import { setApproachDepth, PROGRAM_TWINS, ROOMS_MATERIAL, FLOOR_MATERIAL, TERRACE_MATERIAL } from "./treehouseLook";
import { CROWN_BULB_FRAG, CROWN_WIRE_FRAG } from "./strings";
import { CrownView } from "./crown";
import { makeCrown, type HouseOutline } from "../rules/crown";
import { TUNING } from "../rules/tuning";
import OUTLINE from "../../config/house/outline.json";
const O = OUTLINE as unknown as HouseOutline, H = TUNING.treehouse.house!;
it("supplies full indoor clearing and faint bark at fade completion, then restores it on takeoff", () => {
  const c = new CrownView(makeCrown({ outline: O, floor: H.height, seed: 1 }), 2, O), camera = new THREE.PerspectiveCamera();
  const p = { o: new THREE.Vector3(), ex: new THREE.Vector3(1,0,0), ey: new THREE.Vector3(0,1,0), ez: new THREE.Vector3(0,0,1) };
  const look = { ...H.look!, indoor: true };
  c.update(camera,p,p,{x:0,z:0},look.fade,null,0,{x:0,y:0,z:0},look);
  expect(c.uniforms.uLook.value.x).toBe(1); expect(c.uniforms.uLook.value.z).toBe(look.bark); expect(c.uniforms.uLookShape.value.w).toBe(1);
  c.update(camera,p,null,null,look.fade,null,0,{x:0,y:0,z:0},look);
  expect(c.uniforms.uLook.value.x).toBe(0);
  c.update(camera,p,p,{x:0,z:0},look.fade,null,0,{x:0,y:0,z:0},{ ...H.look!, indoor: false, approach: false });
  expect(c.uniforms.uLook.value.x).toBe(0); expect(c.uniforms.uLookShape.value.w).toBe(0); expect(c.uniforms.uLook.value.w).toBe(0);
  c.dispose();
});

it("uses real floor depth and alpha clipping on approach, then restores the same indoor material", () => {
  const m = new THREE.MeshBasicMaterial({ transparent: true, depthTest: false, depthWrite: false });
  setApproachDepth(m, true, true);
  expect([m.transparent,m.depthTest,m.depthWrite,m.alphaTest]).toEqual([false,true,true,.5]);
  setApproachDepth(m, false, true);
  expect([m.transparent,m.depthTest,m.depthWrite,m.alphaTest]).toEqual([true,false,false,0]);
  m.dispose();
});

it.each([["bulbs", CROWN_BULB_FRAG], ["wire", CROWN_WIRE_FRAG]])("%s clearing calls match the shared shader interface", (_name, shader) => {
  const signature = shader.match(/bool cleared\(([^)]*)\)/)![1].split(",").length;
  const calls = [...shader.matchAll(/\bcleared\(([^()]*)\)/g)].map(m => m[1]).filter(args => !args.startsWith("vec2"));
  expect(calls.length).toBeGreaterThan(0);
  for (const args of calls) expect(args.split(",").length).toBe(signature);
});

// What of a basic material picks its program (three.js WebGLPrograms.getParameters): a state with no twin's shape is compiled and
// linked on the frame it's first drawn.
const programShape = (m: THREE.MeshBasicMaterial) => JSON.stringify({ map: !!m.map, vertexColors: m.vertexColors, alphaTest: m.alphaTest > 0, opaque: !m.transparent && m.blending === THREE.NormalBlending && !m.alphaToCoverage, side: m.side, premultipliedAlpha: m.premultipliedAlpha, dithering: m.dithering, fog: m.fog, toneMapped: m.toneMapped });
it("has a program twin for every state of the house's floors and rooms, the flight preview's too: none compiled as she flies off (Ed's playtest, 2026-11-03: a long freeze after leaving the balcony)", () => {
  // (compiled at the start: the twins, and the materials themselves as made, before any picture comes back for a map)
  const tex = new THREE.Texture(), twins = new Set([...PROGRAM_TWINS.map(({ params, textured }) => programShape(new THREE.MeshBasicMaterial({ ...params, ...(textured ? { map: tex } : {}) }))),
    ...[ROOMS_MATERIAL, FLOOR_MATERIAL, TERRACE_MATERIAL].map(params => programShape(new THREE.MeshBasicMaterial(params)))]);
  const states: [string, THREE.MeshBasicMaterialParameters, boolean, boolean | null][] = [
    ["rooms indoors", ROOMS_MATERIAL, false, false], ["rooms in the flight preview", ROOMS_MATERIAL, false, true],
    ["floor indoors", FLOOR_MATERIAL, true, false], ["floor in the flight preview", FLOOR_MATERIAL, true, true], ["Terrace", TERRACE_MATERIAL, true, null],
  ];
  for (const [name, params, textured, preview] of states) {
    const m = new THREE.MeshBasicMaterial({ ...params, ...(textured ? { map: tex } : {}) });
    if (preview !== null) { setApproachDepth(m, true, textured); if (!preview) setApproachDepth(m, false, textured); }
    expect(twins.has(programShape(m)), name).toBe(true);
  }
});
