// The treehouse's placeholder rooms (Ed, 2026-10-19; rules/houseRooms.ts, config/house.json): walked into from the hub and out
// again by the balcony, each object's E, the hats' floor, and the bed's hold.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { deckOf, keepInHouse } from "./treehouse";
import { HOUSE_ROOMS, floorHats, hatSlots, objectAt } from "./houseRooms";
import { wearing } from "./hat";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const deck = (g: Game) => deckOf(g.map, g.tuning)!;
const obj = (id: string) => HOUSE_ROOMS.objects.find(o => o.id === id)!;

/** In the house mid-night: landed, off her decks, at (dx, dz) metres from the hub's centre. */
function inHouse(dx: number, dz: number): Game {
  const g = newGame(123, TUNING), W = g.witches[0], d = deck(g);
  g.clock.paused = false; g.party.paused = true;
  for (let i = 0; i < 0.3 / STEP; i++) stepGame(g, { ...idle, moveZ: -1 }, STEP); // (off her seat at the decks, into the hub)
  W.body = { ...W.body, x: d.x + dx, z: d.z + dz, vx: 0, vz: 0, perch: true, mode: "ground", lift: 0 };
  for (let i = 0; i < 0.5 / STEP; i++) stepGame(g, idle, STEP);
  return g;
}
const put = (g: Game, dx: number, dz: number) => { const d = deck(g); g.witches[0].body = { ...g.witches[0].body, x: d.x + dx, z: d.z + dz, vx: 0, vz: 0 }; };
const walk = (g: Game, mx: number, mz: number, s: number) => { for (let i = 0; i < s / STEP; i++) stepGame(g, { ...idle, moveX: mx, moveZ: mz }, STEP); };
const press = (g: Game) => { stepGame(g, { ...idle, place: true, sigilHeld: true }, STEP); return g.leashEvents.filter(e => e.kind === "house" || e.kind === "hatPicked" || e.kind === "hatPut" || e.kind === "chart"); };

describe("the treehouse's rooms", () => {
  it("are floor: from the hub along the corridor into the dressing room and back, still in the house", () => {
    const g = inHouse(2, -1), d = deck(g), W = g.witches[0];
    walk(g, 1, 0, 6);
    expect(W.body.perch).toBe(true);
    expect(W.body.mode).toBe("ground");
    expect(W.body.x - d.x).toBeGreaterThan(12); // (in the dressing room, past the corridor)
    walk(g, -1, 0, 6);
    expect(W.body.x - d.x).toBeLessThan(6.5); // (back in the hub)
    expect(W.body.perch).toBe(true);
  });

  it("their walls keep her in, but not the hub's where a corridor meets it", () => {
    const d = (() => { const g = newGame(7, TUNING); return deck(g); })();
    const r = HOUSE_ROOMS.rooms.find(q => q.id === "bedroom")!;
    const k = keepInHouse(d, d.x + (r.x0 + r.x1) / 2, d.z + r.z0 - 3); // (north of the bedroom's back wall)
    expect(k.off).toBe(false);
    expect(k.z - d.z).toBeGreaterThanOrEqual(r.z0);
    const c = HOUSE_ROOMS.corridors.find(q => q.id === "hub-kitchen")!, m = keepInHouse(d, d.x, d.z + (c.z0 + c.z1) / 2);
    expect(m.x).toBeCloseTo(d.x, 6); expect(m.z - d.z).toBeCloseTo((c.z0 + c.z1) / 2, 6); // (on the corridor, unmoved)
  });

  it("leaving is by the balcony as before: walked off its open rim, she rises", () => {
    const g = inHouse(0, 4), W = g.witches[0], d = deck(g), b = d.house!.balcony;
    put(g, -b.r * 0.6, b.z - d.z + b.r * 0.6);
    walk(g, -1, 1, 3);
    expect(W.body.mode === "rising" || W.body.mode === "treetop").toBe(true);
  });

  it("E at each working object says which (main.ts opens its station, the creator at its choices, or the zoo)", () => {
    for (const id of ["mirror", "wardrobe", "cloakPegs", "shoeRack", "bags", "broomStand", "book"]) {
      const o = obj(id), g = inHouse(0, 0), d = deck(g);
      put(g, o.x, o.z + o.d / 2 + 0.4);
      expect(objectAt(d, g.witches[0].body.x, g.witches[0].body.z)?.id, id).toBe(id);
      const ev = press(g).find(e => e.kind === "house");
      expect(ev?.obj, id).toBe(id);
    }
  });

  it("each placeholder's E says so too (main.ts shows its line)", () => {
    for (const o of HOUSE_ROOMS.objects.filter(q => q.use.kind === "say")) {
      const g = inHouse(0, 0);
      put(g, o.x, o.z + o.d / 2 + 0.4);
      expect(press(g).find(e => e.kind === "house")?.obj, o.id).toBe(o.id);
    }
  });

  it("the map table's E still opens the chart", () => {
    const g = inHouse(0, -2.4);
    expect(press(g).some(e => e.kind === "chart")).toBe(true);
  });

  it("the hats' floor: E by a hat takes it and leaves hers in its place; with none near, E puts hers down at her feet and picks it up again", () => {
    const g = inHouse(15, -1), W = g.witches[0], d = deck(g);
    const worn = W.spells.hat, hats = floorHats(W), slots = hatSlots(d), i = hats.findIndex(s => s !== "");
    expect(hats).not.toContain(worn === "none" ? "?" : worn);
    W.body = { ...W.body, x: slots[i].x, z: slots[i].z };
    const took = hats[i];
    expect(press(g).some(e => e.kind === "hatPicked")).toBe(true);
    expect(W.spells.hat).toBe(took);
    expect(floorHats(W)[i]).toBe(worn === "none" ? "" : worn);
    // away from the slots, still on the hats' floor's reach: hers goes down at her feet, and back on
    const o = obj("hats");
    put(g, o.x, o.z + o.d / 2 + 0.9);
    stepGame(g, idle, STEP);
    expect(press(g).some(e => e.kind === "hatPut")).toBe(true);
    expect(wearing(W.hat)).toBe(false);
    stepGame(g, idle, STEP);
    expect(press(g).some(e => e.kind === "hatPicked")).toBe(true);
    expect(wearing(W.hat)).toBe(true);
    expect(W.spells.hat).toBe(took);
  });

  it("the bed: E held for its hold sleeps, once (the night's over); let go early, it starts again", () => {
    const o = obj("bed"), g = inHouse(0, 0), W = g.witches[0];
    put(g, o.x, o.z + o.d / 2 + 0.4);
    const held = { ...idle, sigilHeld: true };
    stepGame(g, { ...held, place: true }, STEP);
    for (let i = 0; i < (HOUSE_ROOMS.bed.hold * 0.6) / STEP; i++) stepGame(g, held, STEP);
    expect(W.house?.bedFrom).toBeDefined();
    stepGame(g, idle, STEP); // (let go: cancelled)
    expect(W.house?.bedFrom).toBeUndefined();
    let slept = 0;
    for (let i = 0; i < (HOUSE_ROOMS.bed.hold * 0.9) / STEP; i++) { stepGame(g, held, STEP); slept += g.leashEvents.filter(e => e.obj === "slept").length; }
    expect(slept).toBe(0); // (started again: not yet)
    for (let i = 0; i < (HOUSE_ROOMS.bed.hold * 0.5) / STEP; i++) { stepGame(g, held, STEP); slept += g.leashEvents.filter(e => e.obj === "slept").length; }
    expect(slept).toBe(1);
  });

  it("standing still in a room, she stays in the house: she never idles into the party on the floor below", () => {
    const g = inHouse(-3, -16); // (the kitchen)
    for (let i = 0; i < (g.tuning.partyWitches.idleAfter + 4) / STEP; i++) stepGame(g, idle, STEP);
    expect(g.witches[0].body.perch).toBe(true);
    expect(g.partyWitches.players?.[0]?.activity ?? null).toBeNull();
  });

  it("every object stands on its room's floor, and every room is reached by a corridor", () => {
    const g = newGame(7, TUNING), d = deck(g);
    for (const o of HOUSE_ROOMS.objects) {
      if (o.room === "hub") { expect(Math.hypot(o.x, o.z), o.id).toBeLessThan(d.r); continue; }
      const r = HOUSE_ROOMS.rooms.find(q => q.id === o.room)!;
      expect(r, o.id).toBeDefined();
      expect(o.x >= r.x0 && o.x <= r.x1 && o.z >= r.z0 && o.z <= r.z1, o.id).toBe(true);
    }
    for (const r of HOUSE_ROOMS.rooms) {
      const touches = HOUSE_ROOMS.corridors.some(c => c.x0 < r.x1 && c.x1 > r.x0 && c.z0 < r.z1 && c.z1 > r.z0);
      expect(touches, r.id).toBe(true);
    }
  });
});
