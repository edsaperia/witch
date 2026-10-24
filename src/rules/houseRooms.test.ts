// The treehouse's placeholder rooms (Ed, 2026-10-19; rules/houseRooms.ts, config/house/): walked into from the hub and out
// again by the balcony, each object's E, the hats' floor, and the bed's hold.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { deckOf, keepInHouse } from "./treehouse";
import { HOUSE_ROOMS, floorHats, fromPlan, hatSlots, objectAt, objectFront, objectWorld, toPlan } from "./houseRooms";
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
/** A point on the house's plan (config/house/: turned about the hub) as metres from the hub's centre in the world. */
const plan = (x: number, z: number) => fromPlan({ x: 0, z: 0 }, x, z);
/** In front of an object (its near side along the plan's z), as metres from the hub's centre in the world. */
const before = (o: ReturnType<typeof obj>, by = 0.4) => objectWorld(o, { x: 0, z: 0 }, 0, o.d / 2 + by);
/** Where she is on the plan. */
const onPlan = (g: Game) => { const d = deck(g), b = g.witches[0].body; return toPlan(d, b.x, b.z); };
const walk = (g: Game, mx: number, mz: number, s: number) => { for (let i = 0; i < s / STEP; i++) stepGame(g, { ...idle, moveX: mx, moveZ: mz }, STEP); };
/** A room's middle and radius on the plan. */
const room = (id: string) => { const r = HOUSE_ROOMS.rooms.find(q => q.id === id)!; return r ? { ...r, cx: (r.x0 + r.x1) / 2, cz: (r.z0 + r.z1) / 2, r: r.r! } : { id, cx: 0, cz: 0, r: 7, locked: false }; };
const unit = (x: number, z: number) => { const l = Math.hypot(x, z); return { x: x / l, z: z / l }; };
/** Every room but the locked ones is walked: keepInHouse leaves a point inside each where it is. */
const keepAll = (d: ReturnType<typeof deck>) => HOUSE_ROOMS.rooms.filter(r => !r.locked).every(r => { const R = room(r.id), k = keepInHouse(d, d.x + R.cx, d.z + R.cz); return Math.hypot(k.x - d.x - R.cx, k.z - d.z - R.cz) < 1e-6; });
const press = (g: Game) => { stepGame(g, { ...idle, place: true, sigilHeld: true }, STEP); return g.leashEvents.filter(e => e.kind === "house" || e.kind === "hatPicked" || e.kind === "hatPut" || e.kind === "chart"); };

describe("the treehouse's rooms", () => {
  it("are floor: from the Terrace along the branch into the Atrium and back, still in the house", () => {
    const A = room("atrium"), u = unit(A.cx, A.cz), s0 = { x: u.x * 2, z: u.z * 2 }, g = inHouse(s0.x, s0.z), W = g.witches[0];
    walk(g, u.x, u.z, 2.6);
    expect(W.body.perch).toBe(true);
    expect(W.body.mode).toBe("ground");
    expect(Math.hypot(onPlan(g).x - A.cx, onPlan(g).z - A.cz)).toBeLessThan(A.r); // (in the Atrium, past the branch)
    walk(g, -u.x, -u.z, 2.6);
    expect(Math.hypot(onPlan(g).x, onPlan(g).z)).toBeLessThan(deck(g).r); // (back on the Terrace)
    expect(W.body.perch).toBe(true);
  });

  it("are the Ent's own (Ed, 2026-10-23: \"the corridors are tree branches, the rooms are probably round\"): round rooms on branches, the plan unturned", () => {
    expect(HOUSE_ROOMS.organic).toBe(true);
    expect(HOUSE_ROOMS.turn).toBe(0);
    for (const r of HOUSE_ROOMS.rooms) { expect(r.r, r.id).toBeGreaterThan(0); expect(r.x1 - r.x0, r.id).toBeCloseTo(2 * r.r!, 1); expect(r.z1 - r.z0, r.id).toBeCloseTo(2 * r.r!, 1); }
    for (const c of HOUSE_ROOMS.corridors) { expect(c.pts!.length, c.id).toBeGreaterThan(2); expect(c.w, c.id).toBeGreaterThanOrEqual(3); }
    const p = toPlan({ x: 3, z: -2 }, 8, 1); expect(p.x).toBeCloseTo(5, 6); expect(p.z).toBeCloseTo(3, 6); // (unturned: the plan is the world's, from the hub)
  });

  it("on foot in the house she walks, at its walk, not her broom's ground speed", () => {
    const g = inHouse(0, -3), W = g.witches[0];
    walk(g, 1, 0, 0.5);
    expect(Math.hypot(W.body.vx, W.body.vz)).toBeCloseTo(g.tuning.treehouse.house!.walk, 1);
    expect(g.tuning.treehouse.house!.walk).toBeLessThan(g.tuning.groundSpeed / 2);
  });

  it("its rooms leave her room to move: branches 3 m wide or more, rooms 9 m across or more, the bedrooms 16 m", () => {
    for (const c of HOUSE_ROOMS.corridors) expect(c.w, c.id).toBeGreaterThanOrEqual(3);
    for (const r of HOUSE_ROOMS.rooms) expect(2 * r.r!, r.id).toBeGreaterThanOrEqual(r.id.startsWith("bedroom") ? 16 : 9);
  });

  it("their walls keep her in, round as they are, but not where a branch comes in", () => {
    const d = (() => { const g = newGame(7, TUNING); return deck(g); })();
    const B = room("bedroom"), k = keepInHouse(d, d.x + B.cx, d.z + B.cz - B.r - 3); // (beyond the bedroom's far wall)
    expect(k.off).toBe(false);
    expect(Math.hypot(k.x - d.x - B.cx, k.z - d.z - B.cz)).toBeLessThanOrEqual(B.r + 1e-6);
    const c = HOUSE_ROOMS.corridors.find(q => q.id === "terrace-atrium")!, [mx, mz] = c.pts![4], m = keepInHouse(d, d.x + mx, d.z + mz);
    expect(m.x - d.x).toBeCloseTo(mx, 6); expect(m.z - d.z).toBeCloseTo(mz, 6); // (on the branch, unmoved)
  });

  it("she can't rise in the rooms or on the branches, only on the Terrace (Ed, 2026-10-23: \"She shouldn't be able to rise while in the treehouse, except on the terrace\")", () => {
    const g = inHouse(0, 0), W = g.witches[0], d = deck(g); // (one night, she's put at each spot in turn)
    const rise = (dx: number, dz: number) => {
      W.body = { ...W.body, x: d.x + dx, z: d.z + dz, vx: 0, vz: 0, perch: true, mode: "ground", lift: 0 };
      stepGame(g, { ...idle, toggleMode: true }, STEP); for (let i = 0; i < 0.2 / STEP; i++) stepGame(g, idle, STEP);
      return W.body.mode;
    };
    for (const r of HOUSE_ROOMS.rooms.filter(q => !q.locked)) { const R = room(r.id), p = plan(R.cx, R.cz); expect(rise(p.x, p.z), r.id).toBe("ground"); }
    for (const c of HOUSE_ROOMS.corridors.filter(q => q.pts && q.pts.length >= 2)) { // (each branch halfway along, off the Terrace)
      const pts = c.pts!, [ax, az] = pts[0], [bx, bz] = pts[pts.length - 1], p = plan((ax + bx) / 2, (az + bz) / 2);
      if (Math.hypot(p.x, p.z) <= d.r + 1) continue;
      expect(rise(p.x, p.z), c.id).toBe("ground");
    }
    expect(["rising", "treetop"]).toContain(rise(0, 0)); // (the Terrace's middle)
  });

  it("leaving is by the balcony as before: walked off its open rim, she rises", () => {
    const g = inHouse(0, 4), W = g.witches[0], d = deck(g), b = d.house!.balcony;
    put(g, -b.r * 0.6, b.z - d.z + b.r * 0.6);
    walk(g, -1, 1, 3);
    expect(W.body.mode === "rising" || W.body.mode === "treetop").toBe(true);
  });

  it("E at each working object says which (main.ts opens its station, the creator at its choices, or the zoo)", () => {
    for (const id of ["mirror", "wardrobe", "cloakPegs", "shoeRack", "bags", "broomBay", "lathe", "pegboard", "book"]) {
      const o = obj(id), g = inHouse(0, 0), d = deck(g), at = before(o);
      put(g, at.x, at.z);
      expect(objectAt(d, g.witches[0].body.x, g.witches[0].body.z)?.id, id).toBe(id);
      const ev = press(g).find(e => e.kind === "house");
      expect(ev?.obj, id).toBe(id);
    }
  });

  it("each placeholder's E says so too (main.ts shows its line)", () => {
    for (const o of HOUSE_ROOMS.objects.filter(q => q.use.kind === "say" && !room(q.room).locked)) { // (a locked room's placeholders: out of reach, below)
      const g = inHouse(0, 0), at = before(o);
      put(g, at.x, at.z);
      expect(press(g).find(e => e.kind === "house")?.obj, o.id).toBe(o.id);
    }
  });

  it("the map table, in the middle of the Atrium (Ed, 2026-10-23), opens the chart; the Terrace's middle no longer does", () => {
    const t = obj("mapTable"), A = room("atrium");
    expect(t.use.kind).toBe("chart");
    expect(Math.hypot(t.x - A.cx, t.z - A.cz)).toBeLessThan(0.5);
    const f = objectFront(t, { x: 0, z: 0 }, 0.4), g = inHouse(f.x, f.z);
    expect(press(g).some(e => e.kind === "chart")).toBe(true);
    expect(press(inHouse(0, -2.4)).some(e => e.kind === "chart")).toBe(false);
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

  it("every doorway is open: each branch runs half a metre or more into the floors it joins (inside their rails)", () => {
    const g = newGame(7, TUNING), d = deck(g), rail = d.rail;
    for (const c of HOUSE_ROOMS.corridors) {
      const [from, to] = c.id.split("-"), ends = [c.pts![0], c.pts![c.pts!.length - 1]];
      const into = (id: string, [x, z]: [number, number]) => id === "terrace" ? d.r - rail - Math.hypot(x, z) : room(id).r - rail - Math.hypot(x - room(id).cx, z - room(id).cz);
      expect(into(from, ends[0]), `${c.id} from ${from}`).toBeGreaterThanOrEqual(0.5);
      if (!room(to).locked) expect(into(to, ends[1]), `${c.id} into ${to}`).toBeGreaterThanOrEqual(0.5);
    }
  });

  it("Bedrooms 2 and 3 are locked (Ed, 2026-10-23: \"The branch stops at the door, and a bubble says it's a friend's room\"): drawn, the branch to the door, E there says so, and she can't go in", () => {
    const locked = HOUSE_ROOMS.rooms.filter(r => r.locked), host = room("bedroom");
    expect(locked.map(r => r.id).sort()).toEqual(["bedroom2", "bedroom3"]);
    for (const r of locked) {
      const R = room(r.id), door = HOUSE_ROOMS.objects.find(o => o.id === `${r.id}Door`)!;
      expect(R.r, `${r.id}: her room's size`).toBe(host.r);
      expect(door.use).toEqual({ kind: "say", line: "A friend's room. Locked for now." });
      expect(Math.abs(Math.hypot(door.x - R.cx, door.z - R.cz) - R.r)).toBeLessThan(0.5); // (at its rim, where the branch ends)
      const g = inHouse(door.x + (door.x - R.cx) / R.r * 1.2, door.z + (door.z - R.cz) / R.r * 1.2), W = g.witches[0];
      expect(press(g).some(e => e.kind === "house" && e.obj === door.id), r.id).toBe(true);
      walk(g, (R.cx - door.x) / R.r, (R.cz - door.z) / R.r, 2); // (walking at the door, into the room)
      expect(Math.hypot(W.body.x - deck(g).x - R.cx, W.body.z - deck(g).z - R.cz), r.id).toBeGreaterThan(R.r - 0.3); // (kept out)
      expect(W.body.perch).toBe(true);
    }
  });

  it("the other bedrooms hold their placeholders (Ed, 2026-10-23: \"fill the other two with placeholders for now\"): a bare bed, a sheeted wardrobe and chest, crates; out of her reach, the way in from their door clear", () => {
    for (const r of HOUSE_ROOMS.rooms.filter(q => q.locked)) {
      const door = obj(`${r.id}Door`), mine = HOUSE_ROOMS.objects.filter(o => o.room === r.id);
      expect(mine.map(o => o.id).sort(), r.id).toEqual(["Bed", "Chest", "Crates", "Wardrobe"].map(k => r.id + k));
      for (const o of mine) {
        expect(Math.hypot(o.x - door.x, o.z - door.z) - Math.hypot(o.w, o.d) / 2, `${o.id}: clear of the door`).toBeGreaterThan(2.5);
        const g = inHouse(0, 0), at = before(o); put(g, at.x, at.z);
        expect(press(g).some(e => e.kind === "house" && e.obj === o.id), `${o.id}: out of reach`).toBe(false);
      }
    }
  });

  it("every object stands on its room's floor, every station reaches: E in front of each finds it, on the floor; and every room is reached by a branch", () => {
    const g = newGame(7, TUNING), d = deck(g), all = keepAll(d);
    for (const o of HOUSE_ROOMS.objects) {
      const R = room(o.room);
      if (o.id.endsWith("Door")) continue; // (a locked room's door: at its rim, the previous test)
      expect(Math.hypot(o.x - R.cx, o.z - R.cz) + Math.min(o.w, o.d) / 2, o.id).toBeLessThanOrEqual(R.r + 0.6);
      if (R.locked) continue;
      const f = objectFront(o, { x: 0, z: 0 }, 0.4), k = keepInHouse(d, d.x + f.x, d.z + f.z);
      expect(Math.hypot(k.x - d.x - f.x, k.z - d.z - f.z), `${o.id}: in front of it is floor`).toBeLessThan(0.05);
      expect(objectAt(d, d.x + f.x, d.z + f.z)?.id, `${o.id}: in reach from in front`).toBe(o.id);
    }
    for (const r of HOUSE_ROOMS.rooms) expect(HOUSE_ROOMS.corridors.some(c => c.id.endsWith(`-${r.id}`)), r.id).toBe(true);
    expect(all).toBe(true);
  });
});
