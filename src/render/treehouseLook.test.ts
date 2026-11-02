import { expect, it } from "vitest";
import * as THREE from "three";
import { setApproachDepth } from "./treehouseLook";
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
  c.update(camera,p,p,{x:0,z:0},look.fade,null,0,{x:0,y:0,z:0},H.look);
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
