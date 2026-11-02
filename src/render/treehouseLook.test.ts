import { expect, it } from "vitest";
import * as THREE from "three";
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
