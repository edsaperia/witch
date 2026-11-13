// The house's program twins (render/houseRooms.ts programTwins) hold every variant its materials take in play, so the view compiles
// them all before play. Ed, 2026-11-12, live v7872: "Just had a very long freeze when taking off from the treehouse after a sail":
// on the rise off the house, the approach preview (render/treehouseLook.ts setApproachDepth) turned the walls' material opaque and
// depth-tested, a variant no twin held, so its program was made and linked on the page's thread in the first treetop frame
// (tools/stall/sail-takeoff.cjs: 1 program and 4.6 to 4.8 s of the link's wait on the cloud's software renderer, sail or no sail).
import { afterEach, expect, it, vi } from "vitest";
import * as THREE from "three";
import { HouseRoomsView } from "./houseRooms";
import { setApproachDepth } from "./treehouseLook";

afterEach(() => { vi.unstubAllGlobals(); });

function fakeEl(): unknown {
  const o: Record<string | symbol, unknown> = { style: {}, remove() {}, append() {}, addEventListener() {} };
  return new Proxy(o, { get: (t, k) => (k in t ? t[k] : k === "then" ? undefined : () => fakeEl()) });
}

/** What of a basic material picks its program (three's cache key: WebGLPrograms.getParameters), as far as these materials differ. */
const variant = (m: THREE.MeshBasicMaterial) => ({ type: m.type, map: !!m.map, vertexColors: m.vertexColors, side: m.side, alphaTest: m.alphaTest > 0, opaque: !m.transparent && m.blending === THREE.NormalBlending, alphaHash: m.alphaHash });

it("has a twin for each variant the house's own materials take, the approach preview's from the air included", () => {
  vi.stubGlobal("document", { createElement: () => fakeEl(), body: { append() {} } });
  const H = new HouseRoomsView() as unknown as { meshes: THREE.Object3D[]; mat: THREE.MeshBasicMaterial; floor: THREE.Mesh; terraceFloor: THREE.Mesh; parts: { mesh: THREE.Mesh }[] };
  const own = new Set<THREE.Object3D>([H.floor, H.terraceFloor, ...H.parts.map(p => p.mesh)]);
  const twins = H.meshes.filter(o => !own.has(o) && (o as THREE.Mesh).isMesh && (o as THREE.Mesh).material instanceof THREE.MeshBasicMaterial).map(o => variant((o as THREE.Mesh).material as THREE.MeshBasicMaterial));
  const tex = new THREE.Texture(); // (the floors' painted map, as it comes)
  const walls = H.mat.clone(), floor = (H.floor.material as THREE.MeshBasicMaterial).clone(), terrace = (H.terraceFloor.material as THREE.MeshBasicMaterial).clone();
  floor.map = tex; terrace.map = tex;
  // (the walls as built are compiled as themselves, hidden in the scene; their other variants and the floors' painted ones need twins)
  const wanted = [variant(floor), variant(terrace)];
  setApproachDepth(walls, true, false); setApproachDepth(floor, true, true);
  wanted.push(variant(walls), variant(floor));
  for (const w of wanted) expect(twins, JSON.stringify(w)).toContainEqual(w);
});
