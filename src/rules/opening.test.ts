// The new opening's wake-up spot (rules/opening.ts; Ed, 2026-10-20): the chart's dive ends in her bedroom, beside her bed, on the
// house's floor, the camera settled indoors on her; and from there she walks on as anywhere in the house.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame, stepGame, STEP, poseOf, type Controls } from "./game";
import { deckOf, onFloor, onTreehouse } from "./treehouse";
import { HOUSE_ROOMS } from "./houseRooms";
import { bedside, wakeInBedroom } from "./opening";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const bedroom = HOUSE_ROOMS.rooms.find(r => r.id === "bedroom")!;

describe("waking in her bedroom", () => {
  it("is beside her bed, in the bedroom, on the house's floor", () => {
    const g = newGame(123, TUNING), at = bedside(g)!, th = g.map.treehouse;
    expect(at).not.toBeNull();
    expect(at.x - th.x).toBeGreaterThan(bedroom.x0); expect(at.x - th.x).toBeLessThan(bedroom.x1);
    expect(at.z - th.z).toBeGreaterThan(bedroom.z0); expect(at.z - th.z).toBeLessThan(bedroom.z1);
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
    for (let i = 0; i < 4 / STEP; i++) stepGame(g, { ...idle, moveZ: -1 }, STEP); // (into the bedroom's back wall)
    expect(g.witch.z - g.map.treehouse.z).toBeGreaterThan(bedroom.z0 - 0.01);
    expect(onTreehouse(g)).toBe(true);
  });
});
