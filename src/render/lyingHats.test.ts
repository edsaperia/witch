// Her hats lying on the treehouse's floor are drawn on it (Ed's report, 2026-11-03: "First night hat spawn is hidden in the floor"):
// the first morning's hat on hat spawn point 1 was drawn in her own sprite batch, slid by her own place in the house, and that batch
// drops whatever of it stands nearer the camera than she does (render/sprites.ts passOf), so coming from her bedroom the hat in front
// of her wasn't drawn. Now the house draws a hat lying on its floor (render/houseRooms.ts hatsOnHouseFloor, lyingHatQuad), as the
// clothes pile: on the floor's own map (its foot at the floor's height there), in the house's order with no depth, over the floors.
import { afterEach, describe, expect, it } from "vitest";
import { newGame as fullGame } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { smallWorld } from "../test/worlds";
import { hatSlots, installEdLayout, toPlan } from "../rules/houseRooms";
import { deckOf } from "../rules/treehouse";
import { startWake } from "../rules/wakeUp";
import { wakeInBedroom } from "../rules/opening";
import { ROOMS_ORDER, hatsOnHouseFloor, hatsOrder, lyingHatMaterial, lyingHatQuad } from "./houseRooms";
import { HOUSE_FLOOR_OVERLAY_ORDER } from "./houseWitchPass";

const newGame = smallWorld(fullGame, "The treehouse's floor needs one real house, not distant islands.");

/** A stand-in for the house's floor map (render/houseRooms.ts pxWorld: plan metres, then picture pixels across and up), tilted as the
 *  house's plane is, its floor higher the farther north: a point of the plan's floor and a picture's pixels from it. */
const FLOOR_Y = 22, TILT = 0.31, MPP = 1 / 24;
const floorAt = (px: number, pz: number) => ({ x: px, y: FLOOR_Y - pz * TILT, z: pz * 0.9 });
const pxWorld = (px: number, pz: number, dx: number, dy: number) => { const f = floorAt(px, pz); return { x: f.x + dx * MPP, y: f.y - dy * MPP, z: f.z }; };

describe.each([["Ed's arrangement", true], ["the classic house", false]] as const)("a hat lying on the house's floor, in %s", (_, ed) => {
  afterEach(() => installEdLayout(false));
  const fresh = () => { installEdLayout(ed); const t = structuredClone(TUNING); t.spells.hats = ""; const g = newGame(503187, t); return { g, d: deckOf(g.map, g.tuning)! }; };

  it("on every hat spawn point, is the house's to draw, on the floor's height there and over its floors, in its order", () => {
    const { g, d } = fresh(), W = g.witches[0], slots = hatSlots(d);
    expect(slots.length).toBeGreaterThan(0);
    slots.forEach((p, i) => {
      W.hat.down = { x: p.x, z: p.z, at: 1 };
      const lying = hatsOnHouseFloor(W, d.house!.rooms, 2);
      expect(lying, `spawn point ${i + 1}`).toEqual([{ x: p.x, z: p.z, at: 1, own: true }]); // (her own batch leaves it out: render/view/witch.ts)
      const q = toPlan(d, p.x, p.z), L = lyingHatQuad(q.x, q.z, 23, 21, pxWorld), foot = { x: (L.corners[2].x + L.corners[3].x) / 2, y: (L.corners[2].y + L.corners[3].y) / 2, z: (L.corners[2].z + L.corners[3].z) / 2 };
      const f = floorAt(q.x, q.z);
      expect(foot.x).toBeCloseTo(f.x, 9); expect(foot.y).toBeCloseTo(f.y, 9); expect(foot.z).toBeCloseTo(f.z, 9); // (its foot on the floor, at its height)
      expect(L.corners[0].y).toBeGreaterThan(foot.y); // (standing up off it)
      const back = L.order < ROOMS_ORDER.front;
      expect(L.order, `spawn point ${i + 1}`).toBeGreaterThan(HOUSE_FLOOR_OVERLAY_ORDER); // (after the floors' late layer)
      expect(L.order).toBeGreaterThan(back ? ROOMS_ORDER.back : ROOMS_ORDER.front); // (after its half's floors and walls)
      expect(L.order).toBeLessThan(back ? ROOMS_ORDER.backNear : ROOMS_ORDER.frontNear); // (before its half's near rails)
      expect([hatsOrder(-10, null), hatsOrder(10, null)]).toContain(L.order); // (with the hats lying on the spawn points)
    });
  });

  it("the first morning's, on hat spawn point 1 in Ed's arrangement, is the house's to draw, wherever she stands", () => {
    const { g, d } = fresh(), W = g.witches[0];
    expect(wakeInBedroom(g) && startWake(g, g.herTime)).toBe(true);
    if (ed) expect(W.hat.down).toMatchObject(hatSlots(d)[0]);
    expect(hatsOnHouseFloor(W, d.house!.rooms, g.herTime)).toEqual([{ ...W.hat.down!, own: true }]);
  });

  it("left there for another (rules/hat.ts leaveHat) is the house's too; one in the world, or still floating down, isn't", () => {
    const { g, d } = fresh(), W = g.witches[0], p = hatSlots(d)[0], rooms = d.house!.rooms;
    W.hat.down = null; W.hat.left = [{ x: p.x, z: p.z, at: 3, spell: "" }, { x: d.x + 400, z: d.z, at: 4, spell: "" }];
    expect(hatsOnHouseFloor(W, rooms, 5)).toEqual([{ x: p.x, z: p.z, at: 3, own: false }]);
    W.hat.left = []; W.hat.down = { x: d.x + 400, z: d.z, at: 6 };
    expect(hatsOnHouseFloor(W, rooms, 7)).toEqual([]);
    W.hat.down = { x: p.x, z: p.z, at: 8 }; W.ko = { at: 8, floatUntil: 12 } as unknown as typeof W.ko;
    expect(hatsOnHouseFloor(W, rooms, 10)).toEqual([]); // (drawn in its flight till it's down)
    expect(hatsOnHouseFloor(W, rooms, 12)).toHaveLength(1);
    W.ko = null; W.hat.has = false;
    expect(hatsOnHouseFloor(W, rooms, 13)).toEqual([]); // (no hat at all: the creator's "none")
    expect(hatsOnHouseFloor(W, null, 13)).toEqual([]);
  });
});

describe("a lying hat's picture", () => {
  it("is drawn as the house's furniture and clothes pile are: no depth, after the floors' late layer", () => {
    const m = lyingHatMaterial(null);
    expect(m.depthTest).toBe(false); expect(m.depthWrite).toBe(false); expect(m.transparent).toBe(true);
    m.dispose();
  });
});
