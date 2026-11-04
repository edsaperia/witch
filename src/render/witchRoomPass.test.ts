import { expect, it } from "vitest";
import type { Game, Witch } from "../rules/game";
import { HOUSE_ROOMS, floorRects, fromPlan, onRoomFloor } from "../rules/houseRooms";
import { TUNING } from "../rules/tuning";
import { remoteRoomPass } from "./remoteWitch";
import { witchRoomPass, witchRoomDepth } from "./witchRoomPass";
import { houseWitchOverlay, setHouseWitchPass, HOUSE_FLOOR_OVERLAY_ORDER } from "./houseWitchPass";
import { deckOf } from "../rules/treehouse";
import * as THREE from "three";

it("puts the recorded T4 local guest in the home-bedroom depth pass despite the canonical lock", () => {
  const at = { x: 3166.43871836629, z: 2786.926777190793 };
  const game = { map: { treehouse: at }, tuning: TUNING } as unknown as Game;
  const guest = { body: { x: 3191.9412858783257, z: 2726.613175427364, perch: true } } as Witch;
  const before = JSON.stringify(HOUSE_ROOMS.shape);
  expect(onRoomFloor(floorRects(at), guest.body.x, guest.body.z)).toBe(false); // The old local predicate failed here.
  expect(witchRoomPass(game, guest)).toBe(true); expect(remoteRoomPass(game, guest)).toBe(true);
  const bedroom = HOUSE_ROOMS.rooms.find(r => r.id === "bedroom")!;
  const host = { body: { ...fromPlan(at, bedroom.x, bedroom.z), perch: true } } as Witch;
  expect(witchRoomDepth(witchRoomPass(game, guest))).toEqual(witchRoomDepth(witchRoomPass(game, host)));
  expect(witchRoomDepth(witchRoomPass(game, guest))).toEqual({ transparent: true, depthTest: false, renderOrder: 19.95 });
  guest.body.perch = false; expect(witchRoomPass(game, guest)).toBe(false);
  expect(witchRoomDepth(false)).toEqual({ transparent: false, depthTest: true, renderOrder: 10 });
  expect(JSON.stringify(HOUSE_ROOMS.shape)).toBe(before);
});

it("keeps guest bedroom membership while applying the later floor pass through landing and flight", () => {
  const at = { x: 3166.43871836629, z: 2786.926777190793 };
  const game = { map: { treehouse: at }, tuning: TUNING } as unknown as Game;
  const guest = { body: { x: 3191.9412858783257, z: 2726.613175427364, perch: true, mode: "ground" } } as Witch;
  const mesh = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.ShaderMaterial());
  const apply = () => setHouseWitchPass(mesh, houseWitchOverlay(deckOf(game.map, game.tuning), guest.body, true, witchRoomPass(game, guest)));
  for (const mode of ["ground", "descending"] as const) {
    guest.body.mode = mode;
    apply();
    expect(witchRoomPass(game, guest)).toBe(true);
    expect(mesh.renderOrder).toBeGreaterThan(HOUSE_FLOOR_OVERLAY_ORDER);
    expect(mesh.material.depthTest).toBe(false);
  }
  guest.body.perch = false; guest.body.mode = "treetop";
  apply();
  expect([mesh.material.transparent, mesh.material.depthTest, mesh.renderOrder]).toEqual([false, true, 10]);
  mesh.geometry.dispose(); mesh.material.dispose();
});
