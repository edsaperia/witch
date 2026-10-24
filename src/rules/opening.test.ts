// The new opening's wake-up spot (rules/opening.ts; Ed, 2026-10-20): the chart's dive ends in her bedroom, beside her bed, on the
// house's floor, the camera settled indoors on her; and from there she walks on as anywhere in the house.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame, stepGame, STEP, poseOf, type Controls } from "./game";
import { deckOf, onFloor, onTreehouse } from "./treehouse";
import { HOUSE_ROOMS, toPlan } from "./houseRooms";
import { bedside, wakeInBedroom } from "./opening";
import { inRoom } from "../../config/house/shape.js";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };

describe("waking in her bedroom", () => {
  it("is beside her bed, in the bedroom, on the house's floor", () => {
    const g = newGame(123, TUNING), at = bedside(g)!, p = toPlan(g.map.treehouse, at.x, at.z); // (on the house's turned plan)
    expect(at).not.toBeNull();
    expect(inRoom(HOUSE_ROOMS.shape, "bedroom", p.x, p.z)).toBeLessThan(0); // (on the bedroom's own floor)
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

  it("and she walks on from there, held in the house's walls", () => {
    const g = newGame(123, TUNING);
    wakeInBedroom(g);
    g.clock.paused = false; g.party.spellAt = undefined; // (play on: no spell to wait for)
    const x0 = g.witch.x;
    for (let i = 0; i < 1 / STEP; i++) stepGame(g, { ...idle, moveX: -1 }, STEP);
    expect(g.witch.x).toBeLessThan(x0 - 1);
    const d = deckOf(g.map, g.tuning)!;
    for (const [mx, mz] of [[0, -1], [-1, 0], [0, 1], [1, 0]]) { // (at the floor's edge each way, the limbs' too: held in)
      for (let i = 0; i < 4 / STEP; i++) stepGame(g, { ...idle, moveX: mx, moveZ: mz }, STEP);
      expect(onFloor(d, g.witch.x, g.witch.z, 1e-6), `${mx}, ${mz}`).toBe(true);
      expect(onTreehouse(g)).toBe(true);
    }
  });
});
