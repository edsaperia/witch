// The treehouse's placeholder rooms (Ed, 2026-10-19; rules/houseRooms.ts, config/house.json): walked into from the hub and out
// again by the balcony, each object's E, the hats' floor, and the bed's hold.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { deckOf, keepInHouse } from "./treehouse";
import { HOUSE_ROOMS, floorHats, fromPlan, hatSlots, objectAt, objectWorld, toPlan } from "./houseRooms";
import { wearing } from "./hat";
import { endParty } from "./partyOver";

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
/** A point on the house's plan (config/house.json: turned about the hub) as metres from the hub's centre in the world. */
const plan = (x: number, z: number) => fromPlan({ x: 0, z: 0 }, x, z);
/** In front of an object (its near side along the plan's z), as metres from the hub's centre in the world. */
const before = (o: ReturnType<typeof obj>, by = 0.4) => objectWorld(o, { x: 0, z: 0 }, 0, o.d / 2 + by);
/** Where she is on the plan. */
const onPlan = (g: Game) => { const d = deck(g), b = g.witches[0].body; return toPlan(d, b.x, b.z); };
const walk = (g: Game, mx: number, mz: number, s: number) => { for (let i = 0; i < s / STEP; i++) stepGame(g, { ...idle, moveX: mx, moveZ: mz }, STEP); };
const press = (g: Game) => { stepGame(g, { ...idle, place: true, sigilHeld: true }, STEP); return g.leashEvents.filter(e => e.kind === "house" || e.kind === "hatPicked" || e.kind === "hatPut" || e.kind === "chart"); };

describe("the treehouse's rooms", () => {
  it("are floor: from the hub along the corridor into the dressing room and back, still in the house", () => {
    const s = plan(2, 0), g = inHouse(s.x, s.z), W = g.witches[0], ne = plan(1, 0); // (along the plan's x: north-east on the screen)
    walk(g, ne.x, ne.z, 4);
    expect(W.body.perch).toBe(true);
    expect(W.body.mode).toBe("ground");
    expect(onPlan(g).x).toBeGreaterThan(12); // (in the dressing room, past the corridor)
    walk(g, -ne.x, -ne.z, 4);
    expect(onPlan(g).x).toBeLessThan(6.5); // (back in the hub)
    expect(W.body.perch).toBe(true);
  });

  it("are laid out on a plan turned 45 degrees (Ed, 2026-10-21: \"more of an isometric view\"): its x north-east, its z south-east, there and back", () => {
    expect(HOUSE_ROOMS.turn).toBe(45);
    const a = plan(1, 0), b = plan(0, 1);
    expect(a.x).toBeCloseTo(Math.SQRT1_2, 6); expect(a.z).toBeCloseTo(-Math.SQRT1_2, 6);
    expect(b.x).toBeCloseTo(Math.SQRT1_2, 6); expect(b.z).toBeCloseTo(Math.SQRT1_2, 6);
    const p = toPlan({ x: 3, z: -2 }, 3 + a.x * 5 + b.x * 2, -2 + a.z * 5 + b.z * 2);
    expect(p.x).toBeCloseTo(5, 6); expect(p.z).toBeCloseTo(2, 6);
  });

  it("on foot in the house she walks, at its walk, not her broom's ground speed", () => {
    const g = inHouse(0, -3), W = g.witches[0];
    walk(g, 1, 0, 0.5);
    expect(Math.hypot(W.body.vx, W.body.vz)).toBeCloseTo(g.tuning.treehouse.house!.walk, 1);
    expect(g.tuning.treehouse.house!.walk).toBeLessThan(g.tuning.groundSpeed / 2);
  });

  it("its rooms leave her room to move: corridors 4 m wide or more, rooms 8 m or more each way", () => {
    for (const c of HOUSE_ROOMS.corridors) expect(Math.min(c.x1 - c.x0, c.z1 - c.z0), c.id).toBeGreaterThanOrEqual(4);
    for (const r of HOUSE_ROOMS.rooms) expect(Math.min(r.x1 - r.x0, r.z1 - r.z0), r.id).toBeGreaterThanOrEqual(8);
  });

  it("their walls keep her in, but not the hub's where a corridor meets it", () => {
    const d = (() => { const g = newGame(7, TUNING); return deck(g); })();
    const r = HOUSE_ROOMS.rooms.find(q => q.id === "bedroom")!, out = plan((r.x0 + r.x1) / 2, r.z0 - 3); // (beyond the bedroom's back wall)
    const k = keepInHouse(d, d.x + out.x, d.z + out.z);
    expect(k.off).toBe(false);
    expect(toPlan(d, k.x, k.z).z).toBeGreaterThanOrEqual(r.z0 - 1e-6);
    const c = HOUSE_ROOMS.corridors.find(q => q.id === "hub-kitchen")!, on = plan(0, (c.z0 + c.z1) / 2), m = keepInHouse(d, d.x + on.x, d.z + on.z);
    expect(m.x - d.x).toBeCloseTo(on.x, 6); expect(m.z - d.z).toBeCloseTo(on.z, 6); // (on the corridor, unmoved)
  });

  it("leaving is by the balcony as before: walked off its open rim, she rises", () => {
    const g = inHouse(0, 4), W = g.witches[0], d = deck(g), b = d.house!.balcony;
    put(g, -b.r * 0.6, b.z - d.z + b.r * 0.6);
    walk(g, -1, 1, 3);
    expect(W.body.mode === "rising" || W.body.mode === "treetop").toBe(true);
  });

  it("E at each working object says which (main.ts opens its station, the creator at its choices, or the zoo)", () => {
    for (const id of ["mirror", "wardrobe", "cloakPegs", "shoeRack", "bags", "broomStand", "book"]) {
      const o = obj(id), g = inHouse(0, 0), d = deck(g), at = before(o);
      put(g, at.x, at.z);
      expect(objectAt(d, g.witches[0].body.x, g.witches[0].body.z)?.id, id).toBe(id);
      const ev = press(g).find(e => e.kind === "house");
      expect(ev?.obj, id).toBe(id);
    }
  });

  it("each placeholder's E says so too (main.ts shows its line)", () => {
    for (const o of HOUSE_ROOMS.objects.filter(q => q.use.kind === "say")) {
      const g = inHouse(0, 0), at = before(o);
      put(g, at.x, at.z);
      expect(press(g).find(e => e.kind === "house")?.obj, o.id).toBe(o.id);
    }
  });

  it("the map table's E still opens the chart", () => {
    const g = inHouse(0, -2.4);
    expect(press(g).some(e => e.kind === "chart")).toBe(true);
  });

  it("the hats' floor: E by a hat takes it and leaves hers in its place; with none near, E puts hers down at her feet and picks it up again", () => {
    const s = plan(17.5, 4), g = inHouse(s.x, s.z), W = g.witches[0], d = deck(g);
    const worn = W.spells.hat, hats = floorHats(W), slots = hatSlots(d), i = hats.findIndex(s => s !== "");
    expect(hats).not.toContain(worn === "none" ? "?" : worn);
    W.body = { ...W.body, x: slots[i].x, z: slots[i].z };
    const took = hats[i];
    expect(press(g).some(e => e.kind === "hatPicked")).toBe(true);
    expect(W.spells.hat).toBe(took);
    expect(floorHats(W)[i]).toBe(worn === "none" ? "" : worn);
    // away from the slots, still on the hats' floor's reach: hers goes down at her feet, and back on
    const at = before(obj("hats"), 0.9);
    put(g, at.x, at.z);
    stepGame(g, idle, STEP);
    expect(press(g).some(e => e.kind === "hatPut")).toBe(true);
    expect(wearing(W.hat)).toBe(false);
    stepGame(g, idle, STEP);
    expect(press(g).some(e => e.kind === "hatPicked")).toBe(true);
    expect(wearing(W.hat)).toBe(true);
    expect(W.spells.hat).toBe(took);
  });

  it("the bed: E held for its hold sleeps, once (the night's over); let go early, it starts again", () => {
    const g = inHouse(0, 0), W = g.witches[0], at = before(obj("bed"));
    put(g, at.x, at.z);
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

  it("the party's over: she still flies onto the balcony, and the bed still sleeps (the over card points her there: Ed, 2026-10-21)", () => {
    const g = newGame(123, TUNING), W = g.witches[0], d = deck(g), b = d.house!.balcony;
    g.clock.paused = false;
    for (let i = 0; i < 0.3 / STEP; i++) stepGame(g, { ...idle, moveZ: -1 }, STEP); // (off her seat)
    endParty(g);
    for (let i = 0; i < 0.5 / STEP; i++) stepGame(g, idle, STEP);
    expect(g.partyOver).not.toBeNull();
    W.body = { ...W.body, x: b.x, z: b.z + b.r + 8, vx: 0, vz: 0, perch: undefined, mode: "treetop", lift: 1, seated: false };
    for (let i = 0; i < 6 / STEP && !(W.body.perch && W.body.mode === "ground"); i++) stepGame(g, { ...idle, moveZ: -1 }, STEP); // (flying north onto it)
    for (let i = 0; i < 2 / STEP && W.body.mode !== "ground"; i++) stepGame(g, idle, STEP);
    expect(W.body.perch).toBe(true);
    expect(W.body.mode).toBe("ground");
    const at = before(obj("bed")); // (on the house's turned plan)
    put(g, at.x, at.z);
    stepGame(g, idle, STEP);
    const held = { ...idle, sigilHeld: true };
    let slept = 0;
    stepGame(g, { ...held, place: true }, STEP);
    for (let i = 0; i < (HOUSE_ROOMS.bed.hold * 1.3) / STEP; i++) { stepGame(g, held, STEP); slept += g.leashEvents.filter(e => e.obj === "slept").length; }
    expect(slept).toBe(1);
  });

  it("standing still in a room, she stays in the house: she never idles into the party on the floor below", () => {
    const k = plan(-3, -18), g = inHouse(k.x, k.z); // (the kitchen)
    for (let i = 0; i < (g.tuning.partyWitches.idleAfter + 4) / STEP; i++) stepGame(g, idle, STEP);
    expect(g.witches[0].body.perch).toBe(true);
    expect(g.partyWitches.players?.[0]?.activity ?? null).toBeNull();
  });

  it("every doorway is open: where a corridor meets a room, their floors (inside their walls) overlap by half a metre or more", () => {
    const g = newGame(7, TUNING), rail = deck(g).rail;
    for (const c of HOUSE_ROOMS.corridors) for (const r of HOUSE_ROOMS.rooms) {
      if (!(c.x0 < r.x1 && c.x1 > r.x0 && c.z0 < r.z1 && c.z1 > r.z0)) continue;
      const w = Math.min(c.x1, r.x1) - Math.max(c.x0, r.x0) - 2 * rail, d = Math.min(c.z1, r.z1) - Math.max(c.z0, r.z0) - 2 * rail;
      expect(Math.min(w, d), `${c.id} into ${r.id}`).toBeGreaterThanOrEqual(0.5);
    }
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
