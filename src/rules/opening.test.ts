// The new opening's wake-up spot (rules/opening.ts; Ed, 2026-10-20): the chart's dive ends in her bedroom, beside her bed, on the
// house's floor, the camera settled indoors on her; and from there she walks on as anywhere in the house.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame as fullGame, stepGame, STEP, poseOf, type Controls } from "./game";
import { smallWorld } from "../test/worlds";
const newGame = smallWorld(fullGame, "Bedroom placement, indoor camera and open edges use one treehouse, independent of distant areas.");
import { deckOf, onFloor, onTreehouse } from "./treehouse";
import { HOUSE_ROOMS, toPlan } from "./houseRooms";
import { bedside, wakeInBedroom } from "./opening";
import { inRoom } from "../../config/house/shape.js";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };

describe("waking in her bedroom", () => {
  it("is beside her bed, in its room (the Turret: Ed, 2026-10-26, \"Move the bed to the turret\"), on the house's floor", () => {
    const g = newGame(123, TUNING), at = bedside(g)!, p = toPlan(g.map.treehouse, at.x, at.z); // (on the house's turned plan)
    expect(at).not.toBeNull();
    expect(inRoom(HOUSE_ROOMS.shape, HOUSE_ROOMS.objects.find(o => o.use.kind === "bed")!.room, p.x, p.z)).toBeLessThan(0); // (on its room's own floor)
    expect(onFloor(deckOf(g.map, g.tuning)!, at.x, at.z)).toBe(true);
  });

  it("puts her there standing, off her decks, the camera indoors on her", () => {
    const g = newGame(123, TUNING), at = bedside(g)!;
    expect(g.witch.seated).toBe(true);
    expect(wakeInBedroom(g)).toBe(true);
    expect(g.witch).toMatchObject({ x: at.x, z: at.z, mode: "ground", seated: false, perch: true });
    expect(onTreehouse(g)).toBe(true);
    expect(g.camera.house).toBeGreaterThan(0.99);
    const p = poseOf(g);
    expect(Math.hypot(p.tx - at.x, p.tz - at.z)).toBeLessThan(2); // (the shot the dive lands on: her)
  });

  it("and she can walk from there off an open edge and fly with her broom", () => {
    const g = newGame(123, TUNING);
    wakeInBedroom(g);
    g.clock.paused = false; g.party.spellAt = undefined; // (play on: no spell to wait for)
    const x0 = g.witch.x;
    let tookOff = false;
    for (let i = 0; i < 4 / STEP && !tookOff; i++) {
      stepGame(g, { ...idle, moveX: -1 }, STEP);
      tookOff = g.witch.mode === 'rising' || g.witch.mode === 'treetop';
    }
    expect(g.witch.x).toBeLessThan(x0 - 1);
    expect(tookOff).toBe(true);
    for (let i = 0; i < 2 / STEP; i++) stepGame(g, idle, STEP);
    expect(g.witch.mode).toBe('treetop'); expect(onTreehouse(g)).toBe(false);
    expect(g.witch.falling).toBeUndefined();
  });
});
