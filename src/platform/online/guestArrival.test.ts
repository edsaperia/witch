import { expect, it, vi } from "vitest";
import { newGame, newWitchPlayer } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import { bareBroom } from "../../rules/broomParts";
import { setParts } from "../../rules/spells";
import { guestArrival, type GuestRoomHooks } from "./guestArrival";

it("requires the assigned room hooks, supplies separate equipment and leaves host identity/time intact", () => {
  // Four-area fixture: arrival ownership does not depend on distant map size; injected hooks supply all guest geometry.
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const game = newGame(123, tuning), host = game.witches[0], body = host.body, spells = host.spells;
  game.herTime = 45; game.clock.paused = true; game.pending = { dash: true };
  const guest = newWitchPlayer(1, 0, 0, tuning); setParts(guest.spells, bareBroom()); guest.spells.hat = "none";
  const rooms: GuestRoomHooks = {
    bedFor: vi.fn(() => null), doorFor: vi.fn(() => ({ id: "assigned-door" })),
    startWakeFor: vi.fn((_g, time, _options, witch, placement) => {
      expect(placement).toEqual({ player: 1, room: "assigned-guest-room" }); expect(time).toBe(45); expect(witch).toBe(guest);
      witch.body.x = 91; witch.body.z = 23; return true;
    }),
  };
  const equipment = vi.fn(() => guest), arrival = guestArrival({ room: "assigned-guest-room", rooms, equipment });
  expect(() => arrival.attach(game)).toThrow("isn't ready"); expect(equipment).not.toHaveBeenCalled(); expect(game.witches).toEqual([host]);
  rooms.bedFor = vi.fn(() => ({ id: "assigned-bed" })); rooms.doorFor = vi.fn(() => null);
  expect(() => arrival.attach(game)).toThrow("isn't ready"); expect(rooms.startWakeFor).not.toHaveBeenCalled();
  rooms.doorFor = vi.fn(() => ({ id: "assigned-door" })); arrival.attach(game);
  expect(game.witches).toEqual([host, guest]); expect(game.witch).toBe(body); expect(host.spells).toBe(spells); expect(guest.spells).not.toBe(spells);
  expect(guest.body).toMatchObject({ x: 91, z: 23 }); expect(host.time).toBe(45); expect(host.paused).toBe(true); expect(host.pending).toEqual({ dash: true });
  expect(() => arrival.attach(game)).toThrow("already"); arrival.detach(game); arrival.detach(game);
  expect(game.witches).toEqual([host]); expect(game.clock.paused).toBe(true); expect(game.pending).toEqual({ dash: true });
});

it("rolls back a refused or thrown room wake and can retry without a phantom guest", () => {
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const game = newGame(123, tuning), host = game.witches[0]; game.clock.paused = true;
  const rooms: GuestRoomHooks = { bedFor: () => ({}), doorFor: () => ({}), startWakeFor: () => false };
  const arrival = guestArrival({ room: "assigned-guest-room", rooms, equipment: () => newWitchPlayer(1, 0, 0, tuning) });
  expect(() => arrival.attach(game)).toThrow("wake geometry"); expect(game.witches).toEqual([host]); expect(host.time).toBeUndefined(); expect(game.clock.paused).toBe(true);
  rooms.startWakeFor = () => { throw new Error("room unavailable"); };
  expect(() => arrival.attach(game)).toThrow("room unavailable"); expect(game.witches).toEqual([host]); expect(host.pending).toBeUndefined();
  rooms.startWakeFor = () => true; arrival.attach(game); expect(game.witches).toHaveLength(2); arrival.detach(game);
  expect(game.witches).toEqual([host]);
});
