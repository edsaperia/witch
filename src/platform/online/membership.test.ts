import { expect, it } from "vitest";
import { newGame, newWitchPlayer, stepGame } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import { attachGuest, detachGuest } from "./membership";
import { bedside } from "../../rules/opening";
import { HOUSE_ROOMS, objectFront } from "../../rules/houseRooms";
import { startWake, settleSleepingBed } from "../../rules/wakeUp";
import { stepSigilButton } from "../../rules/sigilButton";
import { restoreGame, snapshotGame } from "../../rules/nightSnapshot";
import type { Controls } from "../../rules/game";

it("lets a sleeping host get up and use her bed again after departure, including save/resume", () => {
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const game = newGame(123, tuning), host = game.witches[0];
  game.clock.paused = false; // The host was playing before the visit, not on the initial start screen.
  attachGuest(game, newWitchPlayer(1, 0, 0, tuning));
  startWake(game, 0, { yesterday: true });
  host.house = { slept: true, lastBed: "bed" }; settleSleepingBed(game, host, "bed", 1);
  detachGuest(game);
  expect(host.house?.slept).not.toBe(true);
  expect(game.wake?.beat).toBe("alarm");
  for (const solo of [game, restoreGame(snapshotGame(game))]) {
    solo.clock.paused = false; // Normal resume gesture releases restoreGame's intentional pause.
    const move = {moveX:1,moveZ:0,zoom:0,toggleMode:false} as Controls;
    for (let i = 0; i < 80; i++) stepGame(solo, move, .05);
    expect(solo.wake?.open).toBe(true);
    const witch = solo.witches[0], bed = HOUSE_ROOMS.objects.find(o => o.id === "bed")!;
    Object.assign(witch.body, objectFront(bed, solo.map.treehouse, .1), {perch:true,mode:"ground",seated:false});
    const controls = {moveX:0,moveZ:0,zoom:0,toggleMode:false,sigilHeld:true} as Controls;
    const use = (time: number) => stepSigilButton(solo, controls, witch, tuning, time, .05, [], () => false, 0);
    witch.leash.events = []; use(10); use(10 + HOUSE_ROOMS.bed.hold + .01);
    expect(witch.leash.events.some(e => e.kind === "house" && e.obj === "slept")).toBe(true);
  }
});

it("joins a running night in the approved bedroom without resetting world or host", () => {
  // Four-area home fixture: enough for bedroom joins and two creatures, independent of distant area count.
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const game = newGame(123, tuning), host = game.witches[0], body = host.body;
  game.herTime = 123; game.clock.time = 100; game.pending = { dash: true };
  const party = game.party, guest = newWitchPlayer(1, 0, 0, tuning);
  attachGuest(game, guest);
  expect(game.witches.map(w => w.id)).toEqual([0, 1]);
  expect(game.witch).toBe(body); expect(game.party).toBe(party); expect(game.clock.time).toBe(100);
  expect(host.pending).toEqual({ dash: true }); expect(host.time).toBe(123);
  expect(guest.wake?.beat).toBe("alarm");
  const bed = bedside(game)!;
  expect(Math.hypot(guest.body.x - bed.x, guest.body.z - bed.z)).toBeLessThan(6);
  expect(guest.time).toBe(123); expect(guest.paused).toBe(false);
  expect(() => attachGuest(game, newWitchPlayer(1, 0, 0, tuning))).toThrow();
  const c = game.creatures.find(c => !c.boss)!;
  guest.leash.stack.push(c.id); c.leashed = true;
  guest.leash.placed.push({ id: game.creatures.find(q => q !== c && !q.boss)!.id, x: 10, z: 20, at: 100 });
  detachGuest(game);
  expect(game.witches).toHaveLength(1); expect(game.witch).toBe(body);
  expect(c.leashed).toBe(false); expect(c.state).toBe("happy");
  expect(game.loose).toContainEqual({ id: c.id, x: c.x, z: c.z, at: 100 });
  expect(host.leash.placed).toContainEqual(guest.leash.placed[0]);
  expect(host.time).toBeUndefined(); expect(game.pending).toEqual({ dash: true });
  detachGuest(game); expect(game.loose.filter(p => p.id === c.id)).toHaveLength(1);
});
