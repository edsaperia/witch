import { afterEach, expect, it } from "vitest";
import type { Game, Witch } from "./game";
import { HOUSE_ROOMS, fromPlan, installEdLayout } from "./houseRooms";
import { basketNear, emptyBaskets, inCauldronReach, kitchenLayout, kitchenPlan, mushroomButton, SMOKE_SPIN, stepMushrooms } from "./mushrooms";
import { TUNING } from "./tuning";
import { brewingFrame } from "../render/brewingFrame";
afterEach(() => installEdLayout(false));
function game() {
  const witches = Array.from({ length: 6 }, (_, id) => ({ id, ko: null, dash: { until: 0 }, body: { x: 0, z: 0, vx: 0, vz: 0, mode: "ground", perch: true, seated: false, lift: 0 } } as unknown as Witch));
  return { witches, map: { treehouse: { x: 10, z: 20 } }, tuning: TUNING, clock: { time: 0 }, herTime: 0,
    mushrooms: { patches: [], baskets: emptyBaskets(), carried: {}, flights: [], puffs: [], plops: [], ingredients: [], smoke: null, affected: {}, trips: {}, nextUnload: {}, serial: 0 } } as unknown as Game;
}
function atRoom(g: Game, id: number, room: string) { const r = HOUSE_ROOMS.rooms.find(r => r.id === room)!; Object.assign(g.witches[id].body, fromPlan(g.map.treehouse, r.x, r.z)); }
/** Witch `id` `m` metres from the pot, along a bearing (degrees from east). */
function fromPot(g: Game, id: number, m: number, deg = 30) { const c = kitchenLayout(g).cauldron, a = deg * Math.PI / 180; Object.assign(g.witches[id].body, { x: c.x + Math.cos(a) * m, z: c.z + Math.sin(a) * m }); }
// Ed, 2026-11-03: "The cauldron it could affect all witches in a radius"; "10m cauldron reach is fine"; "The cauldron smoke effect
// should cover the 10m area for ten seconds or so, and if you walk into it you are affected by the potion".
it("reaches 10 m round the moved pot, whatever room: unloading and the smoke, a walk-in taken once while it hangs; each basket by its own nearness", () => {
  installEdLayout(true); const g = game(), plan = kitchenPlan(), basket = kitchenLayout(g).baskets.find(b => b.type === "red")!;
  expect(plan.cauldron).toMatchObject({ x: -16.73, z: 28.9 }); expect(g.tuning.treehouse.house!.cauldronReach).toBe(10);
  // (Ed's baskets stand 9 to 11 m from the pot: each works wherever it stands)
  for (const b of kitchenLayout(g).baskets) { Object.assign(g.witches[0].body, b); expect(basketNear(g)?.type, b.type).toBe(b.type); }
  g.witches[0].body.seated = true; expect(basketNear(g)).toBeNull(); g.witches[0].body.seated = false;
  Object.assign(g.witches[0].body, basket);
  fromPot(g, 1, 9.9); fromPot(g, 5, 10.1, 200);
  expect(inCauldronReach(g, g.witches[1])).toBe(true); expect(inCauldronReach(g, g.witches[5])).toBe(false);
  for (const id of [2, 3, 4]) fromPot(g, id, 3, id * 60);
  g.witches[2].ko = { inAt: 0 } as NonNullable<Witch["ko"]>; g.witches[3].body.mode = "treetop"; g.witches[4].body.seated = true;
  g.mushrooms.baskets.red = 3; for (let n = 0; n < 3; n++) expect(mushroomButton(g, g.witches[0], false, true)).toBe(true);
  expect(g.mushrooms.flights.every(f => f.lands === .7)).toBe(true); expect(g.mushrooms.smoke).toBeNull();
  g.herTime = .7; stepMushrooms(g); expect(g.mushrooms.smoke?.until).toBeCloseTo(10.7, 12);
  // (9.9 m off: taken; 10.1 m off: not; knocked out, flying or seated: not)
  expect(Object.keys(g.mushrooms.affected).sort()).toEqual(["0", "1"]);
  expect(g.mushrooms.affected[0]).toMatchObject({ at: .7, fallAt: .7 + SMOKE_SPIN });
  // a witch who walks in 5 s into the smoke is taken then
  fromPot(g, 5, 4, 200); g.herTime = 5.7; stepMushrooms(g);
  const late = g.mushrooms.affected[5]; expect(late).toMatchObject({ at: 5.7, fallAt: 5.7 + SMOKE_SPIN });
  expect(late.landAt - late.fallAt).toBeCloseTo(1.1, 12); expect(late.wakeAt - late.landAt).toBeCloseTo(2, 12); expect(late.freeAt - late.wakeAt).toBeCloseTo(3, 12);
  // nobody twice: the first witch, freed, back in the smoke before it clears, isn't taken again
  g.herTime = 10.6; delete g.mushrooms.affected[0]; Object.assign(g.witches[0].body, basket, { perch: true, mode: "ground" }); stepMushrooms(g);
  expect(g.mushrooms.affected[0]).toBeUndefined(); expect(g.mushrooms.smoke?.taken).toEqual([0, 1, 5]);
  // the smoke clears at 10.7 s: one who arrives at 11.2 s (10.5 s after it began) stays normal
  g.herTime = 10.7; stepMushrooms(g); expect(g.mushrooms.smoke).toBeNull();
  g.witches[2].ko = null; g.herTime = 11.2; stepMushrooms(g); expect(g.mushrooms.affected[2]).toBeUndefined();
  const h = game(); fromPot(h, 0, 9.9, 100); h.mushrooms.carried[0] = ["red", "blue"]; stepMushrooms(h);
  const red = kitchenLayout(h).baskets.find(b => b.type === "red")!;
  expect(h.mushrooms.flights[0]).toMatchObject({ kind: "unload", lands: .7, to: { x: red.x, z: red.z } }); expect(h.mushrooms.nextUnload[0]).toBe(.5);
  const far = game(); fromPot(far, 0, 10.1, 100); far.mushrooms.carried[0] = ["red"]; stepMushrooms(far); expect(far.mushrooms.flights).toEqual([]);
});
it("reaches round the classic Kitchen's pot too, keeps its panel exact and covers the moved pot, baskets and the smoke's reach", () => {
  installEdLayout(false); const g = game(); atRoom(g, 0, "kitchen"); expect(inCauldronReach(g, g.witches[0])).toBe(true); atRoom(g, 0, "dining"); expect(inCauldronReach(g, g.witches[0])).toBe(false);
  expect(brewingFrame(kitchenPlan(false), 6, .4, false)).toEqual({ width: 144, height: 150, ox: 72, oy: 102 });
  installEdLayout(true); const layout = kitchenPlan(), F = brewingFrame(layout, 6, .4, true);
  for (const [p, xpad, top, bottom] of [[layout.cauldron, 12, 17, 8], ...layout.baskets.map(b => [b, 3, 6, 2])] as [typeof layout.cauldron, number, number, number][]) {
    const x = F.ox + (p.x - layout.room.x) * 6, y = F.oy + (p.z - layout.room.z) * .4 * 6;
    expect(x - xpad * 6).toBeGreaterThanOrEqual(-1e-9); expect(x + xpad * 6).toBeLessThanOrEqual(F.width + 1e-9); expect(y - top * 6).toBeGreaterThanOrEqual(-1e-9); expect(y + bottom * 6).toBeLessThanOrEqual(F.height + 1e-9);
  }
});
