// The oak's rooms (Ed, 2026-10-24, the layout v4; rules/houseRooms.ts, config/house/): one floor, walked from her bed down the trunk to
// the Terrace and out along every branch, kept in by its edge, the locked rooms' doors, each object's E, the hats' floor, and the bed.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { deckOf, keepInHouse, onFloor, onTerrace } from "./treehouse";
import { HOUSE_ROOMS, floorHats, fromPlan, hatSlots, objectAt, objectFront, objectWorld, toPlan } from "./houseRooms";
import { field, inRoom } from "../../config/house/shape.js";
import { wearing } from "./hat";
import { endParty } from "./partyOver";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const deck = (g: Game) => deckOf(g.map, g.tuning)!;
const obj = (id: string) => HOUSE_ROOMS.objects.find(o => o.id === id)!;
const room = (id: string) => HOUSE_ROOMS.rooms.find(q => q.id === id)!;
const S = HOUSE_ROOMS.shape;

/** In the house mid-night: landed, off her decks, at (dx, dz) metres from the Terrace's middle. */
function inHouse(dx: number, dz: number): Game {
  const g = newGame(123, TUNING), W = g.witches[0], d = deck(g);
  g.clock.paused = false; g.party.paused = true;
  for (let i = 0; i < 0.3 / STEP; i++) stepGame(g, { ...idle, moveZ: -1 }, STEP); // (off her seat at the decks)
  W.body = { ...W.body, x: d.x + dx, z: d.z + dz, vx: 0, vz: 0, perch: true, mode: "ground", lift: 0 };
  for (let i = 0; i < 0.5 / STEP; i++) stepGame(g, idle, STEP);
  return g;
}
const put = (g: Game, dx: number, dz: number) => { const d = deck(g); g.witches[0].body = { ...g.witches[0].body, x: d.x + dx, z: d.z + dz, vx: 0, vz: 0 }; };
/** A point on the house's plan as metres from the Terrace's middle in the world. */
const plan = (x: number, z: number) => fromPlan({ x: 0, z: 0 }, x, z);
/** In front of an object (off its side facing into its room), as metres from the Terrace's middle in the world. */
const before = (o: ReturnType<typeof obj>, by = 0.4) => objectFront(o, { x: 0, z: 0 }, by);
/** Where she is on the plan. */
const onPlan = (g: Game) => { const d = deck(g), b = g.witches[0].body; return toPlan(d, b.x, b.z); };
const press = (g: Game) => { stepGame(g, { ...idle, place: true, sigilHeld: true }, STEP); return g.leashEvents.filter(e => e.kind === "house" || e.kind === "hatPicked" || e.kind === "hatPut" || e.kind === "chart"); };
/** A limb's middle line on the plan, from `a`'s end to `b`'s (the trunk's run bottom to top, a branch from its trunk room out). */
const limb = (a: string, b: string): [number, number][] => {
  const c = HOUSE_ROOMS.corridors.find(q => q.id === `${a}-${b}`) ?? HOUSE_ROOMS.corridors.find(q => q.id === `${b}-${a}`)!;
  return c.id === `${a}-${b}` ? c.pts! : [...c.pts!].reverse();
};
/** Walks her through the plan's points in turn (each a waypoint, steered at her walk) and gives back the seconds it took and whether
 *  she stayed on the floor the whole way; gives up after `limit` seconds. */
function follow(g: Game, pts: [number, number][], limit = 60): { secs: number; onFloorAll: boolean; got: boolean } {
  const d = deck(g), W = g.witches[0];
  let t = 0, i = 0, all = true;
  while (i < pts.length && t < limit) {
    const p = plan(pts[i][0], pts[i][1]), dx = d.x + p.x - W.body.x, dz = d.z + p.z - W.body.z, L = Math.hypot(dx, dz);
    if (L < (i === pts.length - 1 ? 0.4 : 1.2)) { i++; continue; }
    stepGame(g, { ...idle, moveX: dx / L, moveZ: dz / L }, STEP); t += STEP;
    if (!onFloor(d, W.body.x, W.body.z, 1e-6) || W.body.mode !== "ground") all = false;
  }
  return { secs: t, onFloorAll: all, got: i === pts.length };
}

describe("the oak's rooms", () => {
  it("are one floor: every unlocked room's middle and every limb's middle line is somewhere she stands (keepInHouse leaves it be)", () => {
    const d = deck(newGame(7, TUNING));
    for (const r of HOUSE_ROOMS.rooms.filter(q => !q.locked)) { const k = keepInHouse(d, d.x + r.x, d.z + r.z); expect(Math.hypot(k.x - d.x - r.x, k.z - d.z - r.z), r.id).toBeLessThan(1e-6); }
    for (const c of HOUSE_ROOMS.corridors) {
      const to = c.id.split("-")[1], pts = room(to).locked ? c.pts!.slice(0, -1) : c.pts!; // (a locked room's limb ends on its door, at its rim)
      for (const [x, z] of pts) { const k = keepInHouse(d, d.x + x, d.z + z); expect(Math.hypot(k.x - d.x - x, k.z - d.z - z), `${c.id} at ${x}, ${z}`).toBeLessThan(1e-6); }
    }
  });

  it("are walked from her bed down the trunk to the Terrace's take-off, on the floor all the way (and how long it takes: Ed, 2026-10-24)", () => {
    const b = before(obj("bed"), 0.6), g = inHouse(b.x, b.z), T = room("terrace"), W = g.witches[0], d = deck(g);
    const R = room("bedroom");
    const down: [number, number][] = [[R.x, R.z], ...limb("bedroom", "boudoir"), ...limb("boudoir", "parlour"), ...limb("parlour", "terrace")];
    const walked = follow(g, down);
    expect(walked.got).toBe(true);
    expect(walked.onFloorAll).toBe(true);
    expect(onTerrace(d, W.body.x, W.body.z)).toBe(true);
    // on to the take-off, out over its rim: she flies
    // (round the decks' desk, which stands in the way on the open rim, by its east end)
    const a = (40 * Math.PI) / 180, ways: [number, number][] = [[10, 4], [T.x + Math.cos(a) * (T.r + 5), T.z + Math.sin(a) * (T.r + 5)]];
    let t = walked.secs;
    for (let i = 0, w = 0; i < 20 / STEP && W.body.mode === "ground"; i++) {
      const p = plan(ways[w][0], ways[w][1]), dx = d.x + p.x - W.body.x, dz = d.z + p.z - W.body.z, L = Math.hypot(dx, dz) || 1;
      if (L < 1 && w === 0) w = 1;
      stepGame(g, { ...idle, moveX: dx / L, moveZ: dz / L }, STEP); t += STEP;
    }
    expect(["rising", "treetop"]).toContain(W.body.mode);
    console.log(`bed to the Terrace's middle ${walked.secs.toFixed(1)} s, to the take-off ${t.toFixed(1)} s, at ${g.tuning.treehouse.house!.walk} m/s`);
    expect(t).toBeLessThan(26); // (the mock's 93 m at 5 m/s, 18.6 s, give or take her steering)
  });

  it("are walked out along every branch, from its trunk room into its room and back (the locked ones to their doors)", () => {
    const g = inHouse(0, 0), W = g.witches[0];
    for (const r of HOUSE_ROOMS.rooms.filter(q => q.from && !q.locked)) {
      const P = room(r.from!), p = plan(P.x, P.z);
      put(g, p.x, p.z);
      const out = follow(g, [...limb(r.from!, r.id), [r.x, r.z]]);
      expect(out.got, `${r.id}: reached`).toBe(true);
      expect(out.onFloorAll, `${r.id}: on the floor`).toBe(true);
      expect(inRoom(S, r.id, onPlan(g).x, onPlan(g).z), `${r.id}: in it`).toBeLessThan(0);
      const back = follow(g, limb(r.id, r.from!));
      expect(back.got && back.onFloorAll, `${r.id}: back`).toBe(true);
      expect(W.body.perch).toBe(true);
    }
  });

  it("on foot in the house she walks, at its walk, not her broom's ground speed", () => {
    const g = inHouse(0, -3), W = g.witches[0];
    for (let i = 0; i < 0.5 / STEP; i++) stepGame(g, { ...idle, moveX: 1 }, STEP);
    expect(Math.hypot(W.body.vx, W.body.vz)).toBeCloseTo(g.tuning.treehouse.house!.walk, 1);
    expect(g.tuning.treehouse.house!.walk).toBeLessThan(g.tuning.groundSpeed / 2);
  });

  it("walks half again as fast as she did (Ed, 2026-10-25: 5 to 7.5 m/s), her broom's ground speed apart and unchanged, her walk cycle drawn for 5 m/s so her steps quicken with her", () => {
    const H = TUNING.treehouse.house!;
    expect(H.walk).toBe(7.5);
    expect(H.stride).toBe(5);
    expect(H.walk / H.stride!).toBeCloseTo(1.5, 6);
    expect(TUNING.groundSpeed).toBe(19.25);
    const g = inHouse(0, -3), W = g.witches[0];
    for (let i = 0; i < 0.5 / STEP; i++) stepGame(g, { ...idle, moveX: 1 }, STEP);
    expect(Math.hypot(W.body.vx, W.body.vz)).toBeCloseTo(7.5, 1);
  });

  it("leave her room to move: limbs 3 m wide or more, rooms 12 m across or more, her bedroom 16 m", () => {
    for (const c of HOUSE_ROOMS.corridors) expect(c.w, c.id).toBeGreaterThanOrEqual(3);
    for (const r of HOUSE_ROOMS.rooms) expect(2 * r.r, r.id).toBeGreaterThanOrEqual(r.id === "bedroom" ? 16 : 12);
  });

  it("their edge keeps her in, wherever she walks at it but the take-off", () => {
    const d = deck(newGame(7, TUNING));
    for (const id of ["turret", "kitchen", "studio", "bestiary", "dining"]) {
      const r = room(id), P = r.from ? room(r.from) : room("terrace"), ux = (r.x - P.x) / Math.hypot(r.x - P.x, r.z - P.z), uz = (r.z - P.z) / Math.hypot(r.x - P.x, r.z - P.z);
      const k = keepInHouse(d, d.x + r.x + ux * (r.r + 4), d.z + r.z + uz * (r.r + 4)); // (past its far side)
      expect(k.off, id).toBe(false);
      expect(onFloor(d, k.x, k.z, 1e-6), id).toBe(true);
      expect(inRoom(S, id, k.x - d.x, k.z - d.z), `${id}: at its own floor (or its limb's stub, bulging past it)`).toBeLessThan(5);
    }
  });

  it("with a broom she takes off from any room or limb (Ed, 2026-10-26: \"maybe you can take off from anywhere on the treehouse\"); with none, only rising on the Terrace, as before", () => {
    const g = inHouse(0, 0), W = g.witches[0], d = deck(g);
    for (let i = 0; i < 3 / STEP; i++) stepGame(g, idle, STEP); // (the night's first dodge's worth of cooldown over)
    const cool = structuredClone(W.cool);
    const rise = (x: number, z: number) => {
      W.body = { ...W.body, x: d.x + x, z: d.z + z, vx: 0, vz: 0, perch: true, mode: "ground", lift: 0 };
      W.cool = structuredClone(cool); W.landedAt = undefined; // (no rise cooldown between tries)
      stepGame(g, { ...idle, toggleMode: true }, STEP); for (let i = 0; i < 0.2 / STEP; i++) stepGame(g, idle, STEP);
      return W.body.mode;
    };
    const spots = [...HOUSE_ROOMS.rooms.filter(q => !q.locked && q.id !== "terrace").map(r => [r.id, r.x, r.z] as const),
      ...HOUSE_ROOMS.corridors.map(c => [c.id, c.pts![4][0], c.pts![4][1]] as const).filter(([, x, z]) => !onTerrace(d, d.x + x, d.z + z))];
    W.kit = { invites: true, broom: true }; // (her broom taken: rules/kit.ts)
    for (const [id, x, z] of spots) expect(["rising", "treetop"], id).toContain(rise(x, z));
    W.kit = { invites: true, broom: false };
    for (const [id, x, z] of spots) expect(rise(x, z), `${id}, no broom`).toBe("ground");
    expect(["rising", "treetop"]).toContain(rise(0, 0)); // (the Terrace's middle, as before)
  });

  it("E at each working object says which (main.ts opens its station, the creator at its choices, or the zoo)", () => {
    for (const id of ["mirror", "wardrobe", "cloakPegs", "shoeRack", "bags", "broomBay", "lathe", "pegboard", "book"]) {
      const o = obj(id), g = inHouse(0, 0), d = deck(g), at = before(o);
      put(g, at.x, at.z);
      expect(objectAt(d, g.witches[0].body.x, g.witches[0].body.z)?.id, id).toBe(id);
      expect(press(g).find(e => e.kind === "house")?.obj, id).toBe(id);
    }
  });

  it("each placeholder's E says so too (main.ts shows its line)", () => {
    for (const o of HOUSE_ROOMS.objects.filter(q => q.use.kind === "say" && !room(q.room).locked)) {
      const g = inHouse(0, 0), at = before(o);
      put(g, at.x, at.z);
      expect(press(g).find(e => e.kind === "house")?.obj, o.id).toBe(o.id);
    }
  });

  it("the map table, in the Solarium, opens the chart; the Terrace's middle doesn't", () => {
    const t = obj("mapTable");
    expect(t.use.kind).toBe("chart"); expect(t.room).toBe("solarium");
    const f = before(t), g = inHouse(f.x, f.z);
    expect(press(g).some(e => e.kind === "chart")).toBe(true);
    expect(press(inHouse(0, -2.4)).some(e => e.kind === "chart")).toBe(false);
  });

  it("the hats' floor, in the Cloakroom: E by a hat takes it and leaves hers in its place; with none near, E puts hers down at her feet and picks it up again", () => {
    const H = obj("hats");
    expect(H.room).toBe("cloakroom");
    const s = before(H, 0.9), g = inHouse(s.x, s.z), W = g.witches[0], d = deck(g);
    const worn = W.spells.hat, hats = floorHats(W), slots = hatSlots(d), i = hats.findIndex(s => s !== "");
    W.body = { ...W.body, x: slots[i].x, z: slots[i].z };
    const took = hats[i];
    expect(press(g).some(e => e.kind === "hatPicked")).toBe(true);
    expect(W.spells.hat).toBe(took);
    expect(floorHats(W)[i]).toBe(worn === "none" ? "" : worn);
    put(g, s.x, s.z);
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
    expect(slept).toBe(0);
    for (let i = 0; i < (HOUSE_ROOMS.bed.hold * 0.5) / STEP; i++) { stepGame(g, held, STEP); slept += g.leashEvents.filter(e => e.obj === "slept").length; }
    expect(slept).toBe(1);
  });

  it("the party's over: she still flies onto the Terrace, and the bed still sleeps (the afterparty's 💤 pin leads her there)", () => {
    const g = newGame(123, TUNING), W = g.witches[0], d = deck(g), a = (HOUSE_ROOMS.terrace.takeoff.angle * Math.PI) / 180;
    g.clock.paused = false;
    for (let i = 0; i < 0.3 / STEP; i++) stepGame(g, { ...idle, moveZ: -1 }, STEP); // (off her seat)
    endParty(g);
    for (let i = 0; i < 0.5 / STEP; i++) stepGame(g, idle, STEP);
    expect(g.partyOver).not.toBeNull();
    W.body = { ...W.body, x: d.x + Math.cos(a) * 24, z: d.z + Math.sin(a) * 24, vx: 0, vz: 0, perch: undefined, mode: "treetop", lift: 1, seated: false };
    for (let i = 0; i < 8 / STEP && !(W.body.perch && W.body.mode === "ground"); i++) stepGame(g, { ...idle, moveX: -Math.cos(a), moveZ: -Math.sin(a) }, STEP); // (flying in from the dancefloor's side)
    for (let i = 0; i < 2 / STEP && W.body.mode !== "ground"; i++) stepGame(g, idle, STEP);
    expect(W.body.perch).toBe(true);
    expect(W.body.mode).toBe("ground");
    const at = before(obj("bed"));
    put(g, at.x, at.z);
    stepGame(g, idle, STEP);
    const held = { ...idle, sigilHeld: true };
    let slept = 0;
    stepGame(g, { ...held, place: true }, STEP);
    for (let i = 0; i < (HOUSE_ROOMS.bed.hold * 1.3) / STEP; i++) { stepGame(g, held, STEP); slept += g.leashEvents.filter(e => e.obj === "slept").length; }
    expect(slept).toBe(1);
  });

  it("standing still in a room, she stays in the house: she never idles into the party on the floor below", () => {
    const K = room("kitchen"), k = plan(K.x, K.z), g = inHouse(k.x, k.z);
    for (let i = 0; i < (g.tuning.partyWitches.idleAfter + 4) / STEP; i++) stepGame(g, idle, STEP);
    expect(g.witches[0].body.perch).toBe(true);
    expect(g.partyWitches.players?.[0]?.activity ?? null).toBeNull();
  });

  it("Bedrooms 2 and 3 are locked (Ed, 2026-10-23: \"The branch stops at the door, and a bubble says it's a friend's room\"): drawn, the branch to the door, E there says so, and she can't go in", () => {
    const locked = HOUSE_ROOMS.rooms.filter(r => r.locked);
    expect(locked.map(r => r.id).sort()).toEqual(["bedroom2", "bedroom3"]);
    for (const r of locked) {
      const door = obj(`${r.id}Door`), P = room(r.from!);
      expect(door.use).toEqual({ kind: "say", line: "A friend's room. Locked for now." });
      expect(door.room).toBe(r.from);
      expect(Math.abs(inRoom(S, r.id, door.x, door.z)), `${r.id}: its door at its rim`).toBeLessThan(0.6);
      const ux = door.x - r.x, uz = door.z - r.z, L = Math.hypot(ux, uz), g = inHouse(door.x + (ux / L) * 1.2, door.z + (uz / L) * 1.2), W = g.witches[0], d = deck(g);
      expect(press(g).some(e => e.kind === "house" && e.obj === door.id), r.id).toBe(true);
      for (let i = 0; i < 2 / STEP; i++) stepGame(g, { ...idle, moveX: -ux / L, moveZ: -uz / L }, STEP); // (walking at the door, into the room)
      expect(inRoom(S, r.id, W.body.x - d.x, W.body.z - d.z), `${r.id}: kept out`).toBeGreaterThan(-0.3);
      expect(W.body.perch).toBe(true);
      expect(Math.hypot(P.x - r.x, P.z - r.z)).toBeGreaterThan(P.r + r.r); // (off the Boudoir on its own branch)
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

  it("every object stands on its room's floor and every station reaches: E in front of each finds it, on the floor", () => {
    const d = deck(newGame(7, TUNING));
    for (const o of HOUSE_ROOMS.objects) {
      if (o.id.endsWith("Door")) continue; // (a locked room's door: at its rim, above)
      // (her bed in the corridor up to the Turret, Ed 2026-10-26: "it can go in the corridor": on the house's floor, not a room's)
      for (const [dx, dz] of [[0, 0], [-1, -1], [1, -1], [1, 1], [-1, 1]]) expect(o.use.kind === "bed" ? field(S, o.x + (dx * o.w) / 2, o.z + (dz * o.d) / 2, true) : inRoom(S, o.room, o.x + (dx * o.w) / 2, o.z + (dz * o.d) / 2), `${o.id}: on ${o.room}'s floor`).toBeLessThan(0.6);
      if (room(o.room).locked) continue;
      const f = before(o), k = keepInHouse(d, d.x + f.x, d.z + f.z);
      expect(Math.hypot(k.x - d.x - f.x, k.z - d.z - f.z), `${o.id}: in front of it is floor`).toBeLessThan(0.05);
      expect(objectAt(d, d.x + f.x, d.z + f.z)?.id, `${o.id}: in reach from in front`).toBe(o.id);
    }
    const w = objectWorld(obj("bed"), { x: 0, z: 0 });
    expect(field(S, w.x, w.z, true)).toBeLessThan(0); // (her bed, in the corridor up to the Turret: Ed, 2026-10-26)
  });
});
