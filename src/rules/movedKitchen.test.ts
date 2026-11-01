import { afterEach, expect, it } from "vitest";
import type { Game, Witch } from "./game";
import { HOUSE_ROOMS, fromPlan, installEdLayout } from "./houseRooms";
import { basketNear, emptyBaskets, inKitchen, kitchenLayout, kitchenPlan, mushroomButton, stepMushrooms } from "./mushrooms";
import { TUNING } from "./tuning";
import { brewingFrame } from "../render/brewingFrame";
afterEach(() => installEdLayout(false));
function game() {
  const witches = Array.from({ length: 6 }, (_, id) => ({ id, ko: null, dash: { until: 0 }, body: { x: 0, z: 0, vx: 0, vz: 0, mode: "ground", perch: true, seated: false, lift: 0 } } as unknown as Witch));
  return { witches, map: { treehouse: { x: 10, z: 20 } }, tuning: TUNING, clock: { time: 0 }, herTime: 0,
    mushrooms: { patches: [], baskets: emptyBaskets(), carried: {}, flights: [], puffs: [], plops: [], ingredients: [], smoke: null, affected: {}, trips: {}, nextUnload: {}, serial: 0 } } as unknown as Game;
}
function atRoom(g: Game, id: number, room: string) { const r = HOUSE_ROOMS.rooms.find(r => r.id === room)!; Object.assign(g.witches[id].body, fromPlan(g.map.treehouse, r.x, r.z)); }
it("uses Dining for basket use/unload and spatial smoke entrants, retaining timing and exclusions", () => {
  installEdLayout(true); const g = game(), plan = kitchenPlan(), basket = kitchenLayout(g).baskets.find(b => b.type === "red")!;
  expect(plan.room.id).toBe("dining"); expect(plan.cauldron).toMatchObject({ x: -16.73, z: 28.9 });
  for (const b of kitchenLayout(g).baskets) { Object.assign(g.witches[0].body, b); expect(inKitchen(g, g.witches[0]), b.type).toBe(true); expect(basketNear(g)?.type).toBe(b.type); }
  Object.assign(g.witches[0].body, basket); atRoom(g, 1, "kitchen");
  for (const id of [2, 3, 4]) atRoom(g, id, "dining"); atRoom(g, 5, "kitchen");
  g.witches[2].ko = { inAt: 0 } as NonNullable<Witch["ko"]>; g.witches[3].body.mode = "treetop"; g.witches[4].body.seated = true;
  expect(basketNear(g)?.type).toBe("red"); expect(inKitchen(g, g.witches[1])).toBe(false);
  g.mushrooms.baskets.red = 3; for (let n = 0; n < 3; n++) expect(mushroomButton(g, g.witches[0], false, true)).toBe(true);
  expect(g.mushrooms.flights.every(f => f.lands === .7)).toBe(true); expect(g.mushrooms.smoke).toBeNull();
  g.herTime = .7; stepMushrooms(g); expect(g.mushrooms.smoke?.until).toBe(4.7);
  expect(Object.keys(g.mushrooms.affected)).toEqual(["0"]);
  atRoom(g, 1, "dining"); g.herTime = 3; stepMushrooms(g);
  const affected = g.mushrooms.affected[1]; expect(affected).toMatchObject({ at: 3, fallAt: 4.7 });
  expect(affected.landAt - affected.fallAt).toBeCloseTo(1.1, 12); expect(affected.wakeAt - affected.landAt).toBeCloseTo(2, 12); expect(affected.freeAt - affected.wakeAt).toBeCloseTo(3, 12);
  g.herTime = 4.7; atRoom(g, 5, "dining"); stepMushrooms(g); expect(g.mushrooms.affected[5]).toBeUndefined(); expect(g.mushrooms.smoke).toBeNull();
  const h = game(); atRoom(h, 0, "dining"); h.mushrooms.carried[0] = ["red", "blue"]; stepMushrooms(h);
  const red = kitchenLayout(h).baskets.find(b => b.type === "red")!;
  expect(h.mushrooms.flights[0]).toMatchObject({ kind: "unload", lands: .7, to: { x: red.x, z: red.z } }); expect(h.mushrooms.nextUnload[0]).toBe(.5);
});
it("keeps classic Kitchen membership/panel exact and covers moved pot, baskets and smoke without a new radius", () => {
  installEdLayout(false); const g = game(); atRoom(g, 0, "kitchen"); expect(inKitchen(g, g.witches[0])).toBe(true); atRoom(g, 0, "dining"); expect(inKitchen(g, g.witches[0])).toBe(false);
  expect(brewingFrame(kitchenPlan(false), 6, .4, false)).toEqual({ width: 144, height: 150, ox: 72, oy: 102 });
  installEdLayout(true); const layout = kitchenPlan(), F = brewingFrame(layout, 6, .4, true);
  for (const [p, xpad, top, bottom] of [[layout.cauldron, 12, 17, 8], ...layout.baskets.map(b => [b, 3, 6, 2])] as [typeof layout.cauldron, number, number, number][]) {
    const x = F.ox + (p.x - layout.room.x) * 6, y = F.oy + (p.z - layout.room.z) * .4 * 6;
    expect(x - xpad * 6).toBeGreaterThanOrEqual(-1e-9); expect(x + xpad * 6).toBeLessThanOrEqual(F.width + 1e-9); expect(y - top * 6).toBeGreaterThanOrEqual(-1e-9); expect(y + bottom * 6).toBeLessThanOrEqual(F.height + 1e-9);
  }
});
